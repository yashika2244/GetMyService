import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AppContext";
import uploadImageToClodinary from "../../../utils/uploadCloudinary";

// Subcomponents
import UpdateServiceHeader from "./updateComponents/UpdateServiceHeader";
import ServiceImageUploader from "./updateComponents/ServiceImageUploader";
import ServiceGeneralInfoForm from "./updateComponents/ServiceGeneralInfoForm";
import ServiceDescriptionForm from "./updateComponents/ServiceDescriptionForm";
import ServiceExperienceForm from "./updateComponents/ServiceExperienceForm";
import ServiceLivePreview from "./updateComponents/ServiceLivePreview";
import ServiceFormActions from "./updateComponents/ServiceFormActions";
import UpdateServiceSkeleton from "./updateComponents/UpdateServiceSkeleton";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

function UpdateServicerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser, token: authToken, dispatch } = useContext(authContext);
  const token = authToken || localStorage.getItem("token");

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const effectiveId = id || storedUser?._id || authUser?._id;
  const isOwnProfile =
    Boolean(effectiveId) &&
    (effectiveId === storedUser?._id || effectiveId === authUser?._id);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    TicketPrice: "",
    specialization: [],
    gender: "",
    age: "",
    bio: "",
    about: "",
    photo: "",
    isApproved: "approved",
    experience: [],
    timeSlots: [],
    expDateStart: "",
    expDateEnd: "",
  });

  // Image Upload State
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  /* ---------------- 1. BACK NAVIGATION ---------------- */
  const handleBack = useCallback(() => {
    if (effectiveId) {
      navigate(`/servicer-account/${effectiveId}`);
    } else {
      navigate(-1);
    }
  }, [effectiveId, navigate]);

  /* ---------------- 2. FETCH EXISTING SERVICE DATA ---------------- */
  useEffect(() => {
    let isMounted = true;

    const fetchServiceData = async () => {
      setLoading(true);
      setFetchError(null);

      // Instant local population if matching ID
      if (storedUser && storedUser._id === effectiveId) {
        setFormData({
          name: storedUser.name || "",
          email: storedUser.email || "",
          phone: storedUser.phone !== undefined ? String(storedUser.phone) : "",
          location: storedUser.location || "",
          TicketPrice: storedUser.TicketPrice !== undefined ? String(storedUser.TicketPrice) : "50",
          specialization: storedUser.specialization || [],
          gender: storedUser.gender || "",
          age: storedUser.age !== undefined ? String(storedUser.age) : "",
          bio: storedUser.bio || "",
          about: storedUser.about || "",
          photo: storedUser.photo || "",
          isApproved: storedUser.isApproved || "approved",
          experience: storedUser.experience || [],
          timeSlots: storedUser.timeSlots || [],
          expDateStart: "",
          expDateEnd: "",
        });
        setImagePreview(storedUser.photo || "");
      }

      // Fetch fresh data from backend API
      if (effectiveId) {
        try {
          const res = await fetch(`${BASE_URL}/api/services/${effectiveId}`, {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });

          if (!res.ok) {
            throw new Error("Unable to locate service listing information.");
          }

          const data = await res.json();
          const service = data.service || data.user || data;

          if (isMounted && service) {
            setFormData({
              name: service.name || "",
              email: service.email || "",
              phone: service.phone !== undefined && service.phone !== null ? String(service.phone) : "",
              location: service.location || "",
              TicketPrice: service.TicketPrice !== undefined ? String(service.TicketPrice) : "50",
              specialization: service.specialization || [],
              gender: service.gender || "",
              age: service.age !== undefined && service.age !== null ? String(service.age) : "",
              bio: service.bio || "",
              about: service.about || "",
              photo: service.photo || "",
              isApproved: service.isApproved || "approved",
              experience: service.experience || [],
              timeSlots: service.timeSlots || [],
              expDateStart: "",
              expDateEnd: "",
            });
            setImagePreview(service.photo || "");
          }
        } catch (err) {
          console.error("Error fetching service for edit:", err);
          if (!storedUser && isMounted) {
            setFetchError(err.message || "Failed to load service details.");
          }
        }
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    fetchServiceData();

    return () => {
      isMounted = false;
    };
  }, [effectiveId, token]);

  /* ---------------- 3. IMAGE HANDLERS ---------------- */
  const handleImageSelect = (file, previewUrl) => {
    setSelectedImageFile(file);
    setImagePreview(previewUrl);
  };

  const handleRemovePhoto = () => {
    setSelectedImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, photo: "" }));
    toast.info("Service image removed.");
  };

  /* ---------------- 4. INPUT CHANGE HANDLER ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  /* ---------------- 5. VALIDATION ---------------- */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Service / Provider Name is required (min 2 characters).";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "A valid contact email is required.";
    }

    if (!formData.location || formData.location.trim().length < 2) {
      newErrors.location = "Service location is required.";
    }

    if (
      formData.TicketPrice === "" ||
      isNaN(Number(formData.TicketPrice)) ||
      Number(formData.TicketPrice) < 0
    ) {
      newErrors.TicketPrice = "Please enter a valid price (0 or higher).";
    }

    if (formData.bio && formData.bio.length > 50) {
      newErrors.bio = "Catchphrase/Bio cannot exceed 50 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- 6. SUBMIT FORM ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix form errors before saving.");
      return;
    }

    setIsSaving(true);
    let finalPhotoUrl = formData.photo || "";

    // Step A: Upload image to Cloudinary if new file selected
    if (selectedImageFile) {
      setIsUploading(true);
      try {
        const uploadData = await uploadImageToClodinary(selectedImageFile);
        if (uploadData && (uploadData.secure_url || uploadData.url)) {
          finalPhotoUrl = uploadData.secure_url || uploadData.url;
        } else {
          throw new Error(uploadData?.error?.message || "Cloud storage upload failed");
        }
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
        toast.error("Image upload failed: " + (uploadErr.message || "Please check network."));
        setIsSaving(false);
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    // Step B: Normalize specialization array
    let normalizedSpecs = [];
    if (Array.isArray(formData.specialization)) {
      normalizedSpecs = formData.specialization;
    } else if (typeof formData.specialization === "string") {
      normalizedSpecs = formData.specialization
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Step C: Send PUT request to backend
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone ? Number(formData.phone) : undefined,
        location: formData.location.trim(),
        TicketPrice: Number(formData.TicketPrice) || 0,
        specialization: normalizedSpecs,
        photo: finalPhotoUrl,
        gender: formData.gender || undefined,
        age: formData.age ? Number(formData.age) : undefined,
        bio: formData.bio ? formData.bio.trim() : "",
        about: formData.about ? formData.about.trim() : "",
        isApproved: formData.isApproved || "approved",
        expDateStart: formData.expDateStart || undefined,
        expDateEnd: formData.expDateEnd || undefined,
      };

      const res = await fetch(`${BASE_URL}/api/services/${effectiveId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update service listing.");
      }

      const updatedService = data.service || { ...storedUser, ...payload };

      if (isOwnProfile && dispatch) {
        dispatch({ type: "UPDATE_USER", payload: updatedService });
        localStorage.setItem("user", JSON.stringify(updatedService));
      }

      toast.success("Service listing updated successfully!");
      navigate(`/servicer-account/${effectiveId}`);
    } catch (err) {
      console.error("Update service error:", err);
      toast.error(err.message || "An error occurred while updating the service.");
    } finally {
      setIsSaving(false);
    }
  };

  /* ---------------- 7. RENDER LOADING ---------------- */
  if (loading && !formData.name) {
    return <UpdateServiceSkeleton />;
  }

  /* ---------------- 8. RENDER ERROR ---------------- */
  if (fetchError && !formData.name) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#0F172A] mb-2">
            Unable to Load Service
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            {fetchError}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- 9. MAIN FORM RENDER ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#F8FAFC] pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          {/* Top Header with Back & Action buttons */}
          <UpdateServiceHeader
            onCancel={handleBack}
            isSaving={isSaving}
            isUploading={isUploading}
          />

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT / MAIN COLUMN (Form Cards) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Photo Uploader */}
              <ServiceImageUploader
                photoUrl={imagePreview || formData.photo}
                onImageSelect={handleImageSelect}
                onRemovePhoto={handleRemovePhoto}
                isUploading={isUploading}
                hasNewFile={Boolean(selectedImageFile)}
              />

              {/* Core Information Form */}
              <ServiceGeneralInfoForm
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />

              {/* Bio & Description */}
              <ServiceDescriptionForm
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />

              {/* Work Experience */}
              <ServiceExperienceForm
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />

              {/* Bottom Actions */}
              <ServiceFormActions
                onCancel={handleBack}
                isSaving={isSaving}
                isUploading={isUploading}
              />
            </div>

            {/* RIGHT COLUMN (Live Preview & Checklist) */}
            <div>
              <ServiceLivePreview
                formData={formData}
                photoUrl={imagePreview || formData.photo}
              />
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default UpdateServicerProfile;
