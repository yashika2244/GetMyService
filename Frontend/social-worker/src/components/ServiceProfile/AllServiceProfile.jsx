import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAccounts, useAuth } from "../../context/AppContext";
import useConversation from "../../stateManage/useConversation";
import { BASE_URL } from "../../config";

// Modular Subcomponents
import ServiceBreadcrumb from "./serviceDetails/ServiceBreadcrumb";
import ServiceHero from "./serviceDetails/ServiceHero";
import ServiceInfoDetails from "./serviceDetails/ServiceInfoDetails";
import ServiceDescription from "./serviceDetails/ServiceDescription";
import ServicerProfileCard from "./serviceDetails/ServicerProfileCard";
import ServiceReviewsSection from "./serviceDetails/ServiceReviewsSection";
import RelatedServicesSection from "./serviceDetails/RelatedServicesSection";
import ServiceDetailsSkeleton from "./serviceDetails/ServiceDetailsSkeleton";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

const AllServiceProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accounts = [] } = useAccounts();
  const { user: authUser } = useAuth();
  const { setSelcetedConversation } = useConversation();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isOwnProfile = Boolean(authUser?._id && authUser._id === id);

  /* ---------------- 1. FETCH SERVICE DATA (API + CACHE) ---------------- */
  const fetchServiceProfile = useCallback(async () => {
    if (!id) {
      setError("No service identifier provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Check local accounts context for instant presentation
      const cached = accounts.find((acc) => acc._id === id);
      if (cached) {
        setProfile(cached);
      }

      // 2. Fetch fresh service data directly from backend
      const res = await fetch(`${BASE_URL}/api/services/${id}`);

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Service Not Found. This listing may have been moved or removed.");
        }
        throw new Error("Failed to load service profile.");
      }

      const data = await res.json();
      const serviceData = data.service || data.user || data;

      if (serviceData) {
        setProfile(serviceData);
      } else if (!cached) {
        throw new Error("Service data unavailable.");
      }
    } catch (err) {
      console.error("Error loading service details:", err);
      if (!profile) {
        setError(err.message || "Failed to load service listing.");
      }
    } finally {
      setLoading(false);
    }
  }, [id, accounts]);

  useEffect(() => {
    fetchServiceProfile();
  }, [fetchServiceProfile]);

  /* ---------------- 2. PRIMARY ACTION: BOOK & MESSAGE ---------------- */
  const handleMessage = () => {
    if (!profile) return;
    setSelcetedConversation(profile);
    navigate("/msg");
  };

  /* ---------------- 3. CALCULATE REAL EXPERIENCE ---------------- */
  const totalExperience = profile?.experience
    ?.reduce((sum, exp) => {
      if (!exp.startdate || !exp.enddate) return sum;
      const start = new Date(exp.startdate);
      const end = new Date(exp.enddate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return sum;
      return sum + Math.abs(end - start) / (1000 * 60 * 60 * 24 * 365);
    }, 0)
    ?.toFixed(1) || "0.0";

  /* ---------------- 4. RENDER LOADING ---------------- */
  if (loading && !profile) {
    return <ServiceDetailsSkeleton />;
  }

  /* ---------------- 5. RENDER ERROR / NOT FOUND ---------------- */
  if (error && !profile) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#0F172A] mb-2">
            Service Unavailable
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            {error || "Unable to locate this service listing."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={fetchServiceProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
            <button
              onClick={() => navigate("/services")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Browse Services</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const primaryCategory = profile?.specialization?.[0] || "Services";

  /* ---------------- 6. MAIN SERVICE PROFILE RENDER ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#F8FAFC] pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Breadcrumb Navigation */}
        <ServiceBreadcrumb
          category={primaryCategory}
          serviceName={profile.name}
        />

        {/* 2. Main Service Hero (2-Column Hero: Left Gallery, Right Details & CTA) */}
        <ServiceHero
          profile={profile}
          onMessage={handleMessage}
          isOwnProfile={isOwnProfile}
        />

        {/* 3. Service Information & Specifications */}
        <ServiceInfoDetails
          profile={profile}
          totalExperience={totalExperience}
        />

        {/* 4. Service Description & Guarantees */}
        <ServiceDescription
          about={profile.about || profile.bio}
          serviceName={profile.name}
        />

        {/* 5. Servicer Card */}
        <ServicerProfileCard
          profile={profile}
          totalExperience={totalExperience}
          onMessage={handleMessage}
        />

        {/* 6. Ratings & Reviews Section */}
        <ServiceReviewsSection profile={profile} />

        {/* 7. Related Verified Professionals */}
        <RelatedServicesSection
          accounts={accounts}
          currentServiceId={id}
        />
      </div>
    </motion.div>
  );
};

export default AllServiceProfile;
