import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth, useAccounts } from "../../../context/AppContext";
import { BASE_URL } from "../../../config";

// Modular Subcomponents
import ServicerHeader from "./ServicerHeader";
import ServicerStats from "./ServicerStats";
import RecentBookings from "./RecentBookings";
import ServiceSection from "./ServiceSection";
import AvailabilitySchedule from "./AvailabilitySchedule";
import ProfileSummary from "./ProfileSummary";
import ServicerSidebar from "./ServicerSidebar";
import AddServiceModal from "./AddServiceModal";
import AddTimeSlotModal from "./AddTimeSlotModal";
import ServicerSkeleton from "./ServicerSkeleton";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

const ServicerDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser, token, dispatch } = useAuth();
  const { accounts = [] } = useAccounts();

  const [servicer, setServicer] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Modals state
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stored user and own profile check
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const effectiveId = id || storedUser?._id || authUser?._id;
  const isOwnProfile =
    Boolean(effectiveId) &&
    (effectiveId === storedUser?._id || effectiveId === authUser?._id);

  /* ---------------- 1. FETCH SERVICER PROFILE ---------------- */
  const fetchServicerProfile = useCallback(async () => {
    if (!effectiveId) {
      setError("No servicer ID provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Immediate local fallback for seamless UX if matching ID
      if (storedUser && storedUser._id === effectiveId) {
        setServicer(storedUser);
      }

      const res = await fetch(`${BASE_URL}/api/services/${effectiveId}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        throw new Error("Unable to locate servicer details");
      }

      const data = await res.json();
      const profileData = data.service || data.user || data;

      setServicer(profileData);

      // Keep local storage in sync if own profile
      if (isOwnProfile && storedUser) {
        const merged = { ...storedUser, ...profileData };
        localStorage.setItem("user", JSON.stringify(merged));
        if (dispatch) {
          dispatch({ type: "UPDATE_USER", payload: merged });
        }
      }
    } catch (err) {
      console.error("Error fetching servicer:", err);
      if (!servicer && !storedUser) {
        setError(err.message || "Failed to load servicer profile");
      }
    } finally {
      setLoading(false);
    }
  }, [effectiveId, token, isOwnProfile, dispatch]);

  /* ---------------- 2. FETCH REAL CLIENT CONVERSATIONS ---------------- */
  const fetchClientInquiries = useCallback(async () => {
    if (!effectiveId) return;

    try {
      const activeToken = token || localStorage.getItem("token");
      if (!activeToken) return;

      const res = await fetch(
        `${BASE_URL}/api/chat/chat-users/${effectiveId}/service-provider`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${activeToken}`,
          },
        },
      );

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setConversations(data);
        }
      }
    } catch (err) {
      console.warn("Could not fetch inquiries:", err);
    }
  }, [effectiveId, token]);

  useEffect(() => {
    fetchServicerProfile();
  }, [fetchServicerProfile]);

  useEffect(() => {
    if (servicer?._id) {
      fetchClientInquiries();
    }
  }, [servicer?._id, fetchClientInquiries]);

  /* ---------------- 3. LOGOUT HANDLER ---------------- */
  const handleLogout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        if (dispatch) dispatch({ type: "LOGOUT" });
        localStorage.clear();
        toast.success("Signed out successfully");
        navigate("/");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch {
      toast.error("Error during logout");
    }
  };

  /* ---------------- 4. ADD SERVICE / SPECIALIZATION ---------------- */
  const handleAddService = async (newServiceName) => {
    setIsSubmitting(true);
    try {
      const activeToken = token || localStorage.getItem("token");
      const currentSpecs = Array.isArray(servicer.specialization)
        ? [...servicer.specialization]
        : [];

      if (
        currentSpecs.some(
          (s) => s.toLowerCase() === newServiceName.toLowerCase(),
        )
      ) {
        toast.info("This service is already in your list.");
        setIsAddServiceOpen(false);
        return;
      }

      const updatedSpecs = [...currentSpecs, newServiceName];

      const res = await fetch(`${BASE_URL}/api/services/${servicer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ specialization: updatedSpecs }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add service");

      const updatedProfile = { ...servicer, specialization: updatedSpecs };
      setServicer(updatedProfile);

      if (isOwnProfile && dispatch) {
        dispatch({ type: "UPDATE_USER", payload: updatedProfile });
        localStorage.setItem("user", JSON.stringify(updatedProfile));
      }

      toast.success(`Added "${newServiceName}" to your services`);
      setIsAddServiceOpen(false);
    } catch (err) {
      toast.error(err.message || "Could not add service");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- 5. REMOVE SERVICE ---------------- */
  const handleRemoveService = async (serviceNameToRemove) => {
    setIsSubmitting(true);
    try {
      const activeToken = token || localStorage.getItem("token");
      const updatedSpecs = (servicer.specialization || []).filter(
        (s) => s !== serviceNameToRemove,
      );

      const res = await fetch(`${BASE_URL}/api/services/${servicer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ specialization: updatedSpecs }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to remove service");

      const updatedProfile = { ...servicer, specialization: updatedSpecs };
      setServicer(updatedProfile);

      if (isOwnProfile && dispatch) {
        dispatch({ type: "UPDATE_USER", payload: updatedProfile });
        localStorage.setItem("user", JSON.stringify(updatedProfile));
      }

      toast.success(`Removed "${serviceNameToRemove}"`);
    } catch (err) {
      toast.error(err.message || "Could not remove service");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- 6. ADD TIME SLOT ---------------- */
  const handleAddTimeSlot = async (newSlot) => {
    setIsSubmitting(true);
    try {
      const activeToken = token || localStorage.getItem("token");
      const currentSlots = Array.isArray(servicer.timeSlots)
        ? [...servicer.timeSlots]
        : [];

      const updatedSlots = [...currentSlots, newSlot];

      const res = await fetch(`${BASE_URL}/api/services/${servicer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ timeSlots: updatedSlots }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add time slot");

      const updatedProfile = { ...servicer, timeSlots: updatedSlots };
      setServicer(updatedProfile);

      if (isOwnProfile && dispatch) {
        dispatch({ type: "UPDATE_USER", payload: updatedProfile });
        localStorage.setItem("user", JSON.stringify(updatedProfile));
      }

      toast.success("Time slot added successfully");
      setIsAddSlotOpen(false);
    } catch (err) {
      toast.error(err.message || "Could not add time slot");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- 7. REMOVE TIME SLOT ---------------- */
  const handleRemoveTimeSlot = async (slotIdOrIdx) => {
    setIsSubmitting(true);
    try {
      const activeToken = token || localStorage.getItem("token");
      const updatedSlots = (servicer.timeSlots || []).filter(
        (slot, idx) => slot._id !== slotIdOrIdx && idx !== slotIdOrIdx,
      );

      const res = await fetch(`${BASE_URL}/api/services/${servicer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ timeSlots: updatedSlots }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to remove time slot");

      const updatedProfile = { ...servicer, timeSlots: updatedSlots };
      setServicer(updatedProfile);

      if (isOwnProfile && dispatch) {
        dispatch({ type: "UPDATE_USER", payload: updatedProfile });
        localStorage.setItem("user", JSON.stringify(updatedProfile));
      }

      toast.success("Time slot removed");
    } catch (err) {
      toast.error(err.message || "Could not remove time slot");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- RENDER LOADING ---------------- */
  if (loading && !servicer) {
    return <ServicerSkeleton />;
  }

  /* ---------------- RENDER ERROR ---------------- */
  if (error && !servicer) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#0F172A] mb-2">
            Dashboard Unavailable
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            {error || "Unable to locate this servicer account."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={fetchServicerProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN DASHBOARD VIEW ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#F8FAFC] pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <ServicerHeader
          servicer={servicer}
          isOwnProfile={isOwnProfile}
          onLogout={handleLogout}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          conversationsCount={conversations.length}
        />

        {/* Real KPI Statistics */}
        <ServicerStats
          servicer={servicer}
          conversations={conversations}
        />

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RecentBookings
                conversations={conversations}
                servicerRate={servicer?.TicketPrice || servicer?.consultationFee || 0}
                specialization={servicer?.specialization || []}
                compact={true}
              />
              <ServiceSection
                specialization={servicer?.specialization || []}
                rate={servicer?.TicketPrice || servicer?.consultationFee || 0}
                onOpenAddModal={() => setIsAddServiceOpen(true)}
                onRemoveService={handleRemoveService}
                canEdit={isOwnProfile}
                isRemoving={isSubmitting}
              />
            </div>
            <div>
              <ServicerSidebar
                servicer={servicer}
                accounts={accounts}
                onOpenAddService={() => setIsAddServiceOpen(true)}
                onOpenAddSlot={() => setIsAddSlotOpen(true)}
                isOwnProfile={isOwnProfile}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Services */}
        {activeTab === "services" && (
          <ServiceSection
            specialization={servicer?.specialization || []}
            rate={servicer?.TicketPrice || servicer?.consultationFee || 0}
            onOpenAddModal={() => setIsAddServiceOpen(true)}
            onRemoveService={handleRemoveService}
            canEdit={isOwnProfile}
            isRemoving={isSubmitting}
          />
        )}

        {/* Tab 3: Client Inquiries / Bookings */}
        {activeTab === "bookings" && (
          <RecentBookings
            conversations={conversations}
            servicerRate={servicer?.TicketPrice || servicer?.consultationFee || 0}
            specialization={servicer?.specialization || []}
            compact={false}
          />
        )}

        {/* Tab 4: Schedule & Availability */}
        {activeTab === "schedule" && (
          <AvailabilitySchedule
            timeSlots={servicer?.timeSlots || []}
            onOpenAddSlotModal={() => setIsAddSlotOpen(true)}
            onRemoveSlot={handleRemoveTimeSlot}
            canEdit={isOwnProfile}
            isRemoving={isSubmitting}
          />
        )}

        {/* Tab 5: Profile Details */}
        {activeTab === "profile" && (
          <ProfileSummary
            servicer={servicer}
            isOwnProfile={isOwnProfile}
          />
        )}
      </div>

      {/* Add Service Modal */}
      <AddServiceModal
        isOpen={isAddServiceOpen}
        onClose={() => setIsAddServiceOpen(false)}
        onAdd={handleAddService}
        isSubmitting={isSubmitting}
      />

      {/* Add Time Slot Modal */}
      <AddTimeSlotModal
        isOpen={isAddSlotOpen}
        onClose={() => setIsAddSlotOpen(false)}
        onAdd={handleAddTimeSlot}
        isSubmitting={isSubmitting}
      />
    </motion.div>
  );
};

export default ServicerDashboard;
