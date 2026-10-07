import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AppContext";
import uploadImageToClodinary from "../../../utils/uploadCloudinary";
import UpdateSkeleton from "./components/UpdateSkeleton";
import ProfileImageEditor from "./components/ProfileImageEditor";
import PersonalInformationForm from "./components/PersonalInformationForm";
import AboutYouSection from "./components/AboutYouSection";
import LiveProfilePreview from "./components/LiveProfilePreview";
import AccountSecurityCard from "./components/AccountSecurityCard";
import FormActionsBar from "./components/FormActionsBar";
import { ArrowLeft, AlertCircle, RefreshCw, Home } from "lucide-react";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser, token: authToken, dispatch } = useContext(authContext);
  const token = authToken || localStorage.getItem("token");

  // Resolve user identifier from URL param first, then stored user, then auth context
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const effectiveUserId = id || storedUser?._id || authUser?._id;

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    gender: "",
    role: "customer",
    age: "",
    location: "",
    phone: "",
    bio: "",
  });

  // Image Upload & Preview State
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  /* ---------------- BACK NAVIGATION HANDLER ---------------- */
  const handleBack = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const targetId = id || effectiveUserId;
      if (targetId) {
        navigate(`/user-profile/${targetId}`);
      } else {
        navigate(-1);
      }
    },
    [id, effectiveUserId, navigate]
  );

  /* ---------------- LOAD INITIAL DATA (RUNS ONCE ON MOUNT) ---------------- */
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setFetchError(null);

      // 1. Initial instant population from localStorage or authContext if matching ID
      let localUser = null;
      try {
        const localUserStr = localStorage.getItem("user");
        localUser = localUserStr ? JSON.parse(localUserStr) : null;
      } catch (e) {
        console.error("Error reading localStorage user:", e);
      }

      const activeUserId = id || localUser?._id || authUser?._id;

      if (localUser && (!activeUserId || localUser._id === activeUserId)) {
        setFormData({
          name: localUser.name || "",
          email: localUser.email || "",
          photo: localUser.photo || "",
          gender: localUser.gender || "",
          role: localUser.role || "customer",
          age: localUser.age !== undefined && localUser.age !== null ? String(localUser.age) : "",
          location: localUser.location || "",
          phone: localUser.phone !== undefined && localUser.phone !== null ? String(localUser.phone) : "",
          bio: localUser.bio || "",
        });
        setImagePreview(localUser.photo || "");
      }

      // 2. Fetch fresh user data from API
      if (activeUserId) {
        try {
          const res = await fetch(
            `${BASE_URL || "http://localhost:5000"}/api/users/${activeUserId}`,
            {
              headers: {
                "Content-Type": "application/json",
                ...(token && token !== "null" && token !== "undefined"
                  ? { Authorization: `Bearer ${token}` }
                  : {}),
              },
            }
          );

          if (res.ok) {
            const data = await res.json();
            const fetchedUser = data.user || data;
            if (isMounted && fetchedUser) {
              setFormData({
                name: fetchedUser.name || "",
                email: fetchedUser.email || "",
                photo: fetchedUser.photo || "",
                gender: fetchedUser.gender || "",
                role: fetchedUser.role || "customer",
                age: fetchedUser.age !== undefined && fetchedUser.age !== null ? String(fetchedUser.age) : "",
                location: fetchedUser.location || "",
                phone: fetchedUser.phone !== undefined && fetchedUser.phone !== null ? String(fetchedUser.phone) : "",
                bio: fetchedUser.bio || "",
              });
              setImagePreview(fetchedUser.photo || "");
            }
          } else if (!localUser && !authUser) {
            throw new Error("Unable to retrieve user account information.");
          }
        } catch (err) {
          console.error("Error fetching user for edit:", err);
          if (!localUser && !authUser && isMounted) {
            setFetchError(err.message || "Failed to load profile.");
          }
        }
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id]); // Only re-fetch if URL param id changes!

  /* ---------------- IMAGE SELECTION & REMOVAL ---------------- */
  const handleImageSelect = (file, previewUrl) => {
    setSelectedImageFile(file);
    setImagePreview(previewUrl);
  };

  const handleRemovePhoto = () => {
    setSelectedImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, photo: "" }));
    toast.info("Profile photo removed. Default initials will be used.");
  };

  /* ---------------- INPUT CHANGE HANDLER ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error on field edit
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Full Name is required (minimum 2 characters).";
    }

    if (!formData.location || formData.location.trim().length < 2) {
      newErrors.location = "Primary location is required.";
    }

    if (formData.age) {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = "Please provide a valid age between 1 and 120.";
      }
    }

    if (formData.phone) {
      const cleanPhone = String(formData.phone).trim();
      if (!/^\+?[0-9]{7,15}$/.test(cleanPhone)) {
        newErrors.phone = "Phone number should be between 7 and 15 digits.";
      }
    }

    if (formData.bio && formData.bio.length > 300) {
      newErrors.bio = "Bio cannot exceed 300 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- FORM SUBMIT HANDLER ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please resolve form validation errors before saving.");
      return;
    }

    setIsSaving(true);
    let finalPhotoUrl = formData.photo || "";

    // Step 1: Upload image to Cloudinary if user selected a new file
    if (selectedImageFile) {
      setIsUploading(true);
      try {
        const uploadData = await uploadImageToClodinary(selectedImageFile);
        if (uploadData && (uploadData.secure_url || uploadData.url)) {
          finalPhotoUrl = uploadData.secure_url || uploadData.url;
        } else {
          throw new Error(uploadData?.error?.message || "Cloud storage did not return a valid URL");
        }
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
        toast.error("Image upload failed: " + (uploadErr.message || "Please check your network and try again."));
        setIsSaving(false);
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    // Step 2: Send updated data to backend API
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        photo: finalPhotoUrl,
        gender: formData.gender,
        age: formData.age ? parseInt(formData.age, 10) : undefined,
        location: formData.location.trim(),
        phone: formData.phone ? parseInt(formData.phone, 10) : undefined,
        bio: formData.bio ? formData.bio.trim() : "",
      };

      const res = await fetch(`${BASE_URL || "http://localhost:5000"}/api/users/${effectiveUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && token !== "null" && token !== "undefined"
            ? { Authorization: `Bearer ${token}` }
            : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      const updatedUser = data.updatedUser || { ...storedUser, ...payload };

      // Step 3: Update local auth context and localStorage for immediate synchronization
      if (dispatch) {
        dispatch({ type: "UPDATE_USER", payload: updatedUser });
      }
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully!");

      // Step 4: Navigate to /user-profile/:id
      const targetId = id || effectiveUserId || updatedUser._id;
      navigate(`/user-profile/${targetId}`);
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error(err.message || "An error occurred while updating profile.");
    } finally {
      setIsSaving(false);
    }
  };

  /* ---------------- LOADING STATE ---------------- */
  if (loading && !formData.name) {
    return <UpdateSkeleton />;
  }

  /* ---------------- ERROR STATE ---------------- */
  if (fetchError && !formData.name) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#071A33] mb-2">
            Unable to Load Profile
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            {fetchError}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-sm font-semibold transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 text-sm font-semibold transition cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN FORM RENDER ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#F8FAFC] pt-28 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#1769FF] transition mb-3 cursor-pointer relative z-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Profile Dashboard</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold text-[#1769FF] uppercase tracking-wider mb-1">
                Account Settings
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#071A33] tracking-tight">
                Edit Profile
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Update your personal information and profile details.
              </p>
            </div>
          </div>
        </div>

        {/* DASHBOARD 2-COLUMN GRID */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT / MAIN COLUMN (Form Fields) */}
            <div className="lg:col-span-2 space-y-2">
              {/* Profile Photo Editor */}
              <ProfileImageEditor
                photoUrl={imagePreview || formData.photo}
                userName={formData.name}
                onImageSelect={handleImageSelect}
                onRemovePhoto={handleRemovePhoto}
                isUploading={isUploading}
                hasNewFile={Boolean(selectedImageFile)}
              />

              {/* Personal Information Form */}
              <PersonalInformationForm
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />

              {/* About You / Bio Section */}
              <AboutYouSection
                bio={formData.bio}
                onChange={handleInputChange}
              />

              {/* Form Action Controls (Bottom) */}
              <FormActionsBar
                isSaving={isSaving}
                onCancel={handleBack}
              />
            </div>

            {/* RIGHT COLUMN / SIDEBAR (Live Preview & Security) */}
            <div className="space-y-6">
              {/* Live Real-time Profile Preview */}
              <LiveProfilePreview
                formData={formData}
                photoUrl={imagePreview || formData.photo}
              />

              {/* Security & Access Card */}
              <AccountSecurityCard
                userId={effectiveUserId}
                role={formData.role}
              />
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default UpdateUser;
