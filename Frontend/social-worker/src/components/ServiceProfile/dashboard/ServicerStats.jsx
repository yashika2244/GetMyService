import React from "react";
import StatCard from "./StatCard";
import {
  Briefcase,
  DollarSign,
  Users,
  Star,
  Clock,
  Award,
} from "lucide-react";

const ServicerStats = ({ servicer, conversations = [] }) => {
  // Calculate total experience in years
  const totalExperience = servicer?.experience
    ?.reduce((sum, exp) => {
      if (!exp.startdate || !exp.enddate) return sum;
      const start = new Date(exp.startdate);
      const end = new Date(exp.enddate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return sum;
      return sum + Math.abs(end - start) / (1000 * 60 * 60 * 24 * 365);
    }, 0)
    ?.toFixed(1) || "0.0";

  const servicesCount = Array.isArray(servicer?.specialization)
    ? servicer.specialization.length
    : 0;

  const rate = servicer?.TicketPrice || servicer?.consultationFee || 0;
  const timeSlotsCount = Array.isArray(servicer?.timeSlots)
    ? servicer.timeSlots.length
    : 0;

  const rating = Number(servicer?.averageRating || 0).toFixed(1);
  const reviewsCount = servicer?.totalRating || (servicer?.reviews ? servicer.reviews.length : 0);
  const clientsCount = conversations.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {/* 1. Services */}
      <StatCard
        icon={Briefcase}
        label="Active Services"
        value={servicesCount}
        subtext="Specializations listed"
        badgeText={servicesCount > 0 ? "Published" : "Needs setup"}
        badgeType={servicesCount > 0 ? "success" : "warning"}
        iconBg="bg-blue-50 text-blue-600"
      />

      {/* 2. Consultation Rate */}
      <StatCard
        icon={DollarSign}
        label="Base Fee"
        value={`$${rate}`}
        subtext="Per service session"
        badgeText="Current Rate"
        badgeType="info"
        iconBg="bg-emerald-50 text-emerald-600"
      />

      {/* 3. Client Inquiries */}
      <StatCard
        icon={Users}
        label="Client Inquiries"
        value={clientsCount}
        subtext="Active conversations"
        badgeText={clientsCount > 0 ? `${clientsCount} Active` : "No requests"}
        badgeType={clientsCount > 0 ? "success" : "neutral"}
        iconBg="bg-indigo-50 text-indigo-600"
      />

      {/* 4. Rating */}
      <StatCard
        icon={Star}
        label="Average Rating"
        value={`${rating} ★`}
        subtext={`From ${reviewsCount} ${reviewsCount === 1 ? "review" : "reviews"}`}
        badgeText={rating >= 4.5 ? "Top Rated" : "Verified"}
        badgeType={rating >= 4.5 ? "success" : "info"}
        iconBg="bg-amber-50 text-amber-600"
      />

      {/* 5. Schedule Slots */}
      <StatCard
        icon={Clock}
        label="Weekly Slots"
        value={timeSlotsCount}
        subtext="Scheduled time slots"
        badgeText={timeSlotsCount > 0 ? "Available" : "Set Hours"}
        badgeType={timeSlotsCount > 0 ? "success" : "warning"}
        iconBg="bg-purple-50 text-purple-600"
      />

      {/* 6. Experience */}
      <StatCard
        icon={Award}
        label="Experience"
        value={`${totalExperience} yrs`}
        subtext={servicer?.location || "Field experience"}
        badgeText="Verified Pro"
        badgeType="neutral"
        iconBg="bg-cyan-50 text-cyan-600"
      />
    </div>
  );
};

export default ServicerStats;
