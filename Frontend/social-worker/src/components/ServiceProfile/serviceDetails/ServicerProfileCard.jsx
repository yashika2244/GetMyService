import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  Award,
  Calendar,
} from "lucide-react";

const ServicerProfileCard = ({
  profile,
  totalExperience = "0.0",
  onMessage,
}) => {
  const navigate = useNavigate();

  const rating = Number(profile.averageRating || 0).toFixed(1);
  const reviewsCount = profile.totalRating || (profile.reviews ? profile.reviews.length : 0);

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-7 mb-8">
      <div className="pb-4 border-b border-slate-100 mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A]">
            Service Provider Profile
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified provider identity and credentials
          </p>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Verified Professional</span>
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-sm">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xl">
              {profile.name ? profile.name.slice(0, 2).toUpperCase() : "SP"}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-bold text-[#0F172A]">
              {profile.name}
            </h4>
            {profile.isApproved === "approved" && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Approved
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile.location || "Location on file"}</span>
            </span>

            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
              <span className="text-slate-400 font-normal">
                ({reviewsCount} reviews)
              </span>
            </span>

            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-purple-500" />
              <span>{totalExperience} Years Experience</span>
            </span>
          </div>

          {profile.about && (
            <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
              {profile.about}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={onMessage}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Message {profile.name?.split(" ")[0] || "Specialist"}</span>
          </button>

          <button
            onClick={() => navigate(`/servicer-account/${profile._id}`)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Servicer Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicerProfileCard;
