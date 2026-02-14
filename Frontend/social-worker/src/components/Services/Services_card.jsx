import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAccounts } from "../../context/AppContext";

const ServiceCard = () => {
  const { accounts, loading, error } = useAccounts();

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading services...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load services.
      </div>
    );
  }

  const colors = [
    "from-pink-500 to-rose-500",
    "from-green-500 to-emerald-500",
    "from-yellow-400 to-orange-400",
    "from-purple-500 to-indigo-500",
    "from-red-500 to-pink-500",
    "from-blue-500 to-cyan-500",
  ];

  return (
    <section className="py-10 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-[1200px] mx-auto px-3 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {accounts.slice(0, 6).map((service, index) => (
            <div
              key={service._id}
              className="group relative bg-white rounded-2xl border border-gray-200
                         overflow-hidden
                         transition-all duration-500 ease-out
                         hover:-translate-y-3 hover:scale-[1.03]
                         hover:shadow-[0_25px_45px_rgba(0,0,0,0.12)]"
            >
              {/* Gradient Hover Overlay */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10
                            transition-opacity duration-500
                            bg-gradient-to-br ${colors[index % colors.length]}`}
              />

              {/* Top Gradient Strip */}
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${colors[index % colors.length]}`}
              />

              {/* Card Content */}
              <div className="relative p-3 md:p-6 transition-transform duration-500 group-hover:scale-[1.02]">
                <h2
                  className="text-[15px] md:text-lg font-semibold text-gray-800
                             transition-colors duration-300
                             group-hover:text-blue-600"
                >
                  {service.name || "No Title"}
                </h2>

                <p
                  className="text-gray-600 text-[12px] md:text-sm mt-2 line-clamp-3
                             transition-colors duration-300
                             group-hover:text-gray-700"
                >
                  {service.description ||
                    "World-class care for everyone. Our health system offers unmatched expert health care."}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <Link
                    to={`/Service-profile/${service._id}`}
                    className="flex items-center gap-2 text-gray-700
                               transition-all duration-300
                               group-hover:text-blue-600"
                  >
                    <BsArrowRightCircle
                      className="text-2xl md:text-3xl
                                 transition-transform duration-300
                                 group-hover:translate-x-1"
                    />
                    <span className="hidden md:block text-sm font-medium">
                      View Details
                    </span>
                  </Link>

                  {/* Number Badge */}
                  <div
                    className={`w-7 h-7 md:w-10 md:h-10 rounded-full
                                bg-gradient-to-r ${colors[index % colors.length]}
                                flex items-center justify-center text-white
                                font-semibold text-sm md:text-base shadow-md
                                transition-transform duration-500
                                group-hover:scale-110`}
                  >
                    {index + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCard;
