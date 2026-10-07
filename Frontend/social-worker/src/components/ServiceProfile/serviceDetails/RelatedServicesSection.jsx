import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import useConversation from "../../../stateManage/useConversation";

const RelatedServicesSection = ({ accounts = [], currentServiceId }) => {
  const navigate = useNavigate();
  const { setSelcetedConversation } = useConversation();

  const otherSpecialists = accounts
    .filter((acc) => acc._id !== currentServiceId)
    .slice(0, 6);

  if (otherSpecialists.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Similar Verified Professionals
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore other qualified specialists offering relevant services
          </p>
        </div>

        <button
          onClick={() => navigate("/services")}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          <span>View All Services</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {otherSpecialists.map((specialist) => {
          const rate = specialist.TicketPrice || specialist.consultationFee || 50;
          const rating = Number(specialist.averageRating || 0).toFixed(1);
          const category = specialist.specialization?.[0] || "Specialist";

          return (
            <div
              key={specialist._id}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3.5">
                  <img
                    src={specialist.photo || "https://via.placeholder.com/100"}
                    alt={specialist.name}
                    className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shrink-0 group-hover:scale-105 transition"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/100";
                    }}
                  />

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                      {category}
                    </span>
                    <h4
                      onClick={() => navigate(`/Service-profile/${specialist._id}`)}
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer truncate transition"
                    >
                      {specialist.name}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {specialist.location || "Citywide"}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {specialist.about || specialist.bio || "Verified professional offering top-tier services."}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Starting from
                  </span>
                  <span className="text-sm font-extrabold text-[#0F172A]">
                    ${rate}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setSelcetedConversation(specialist);
                      navigate("/msg");
                    }}
                    className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer"
                    title="Message Specialist"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigate(`/Service-profile/${specialist._id}`)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold shadow-2xs transition cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedServicesSection;
