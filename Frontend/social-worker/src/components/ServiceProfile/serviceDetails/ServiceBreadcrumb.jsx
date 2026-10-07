import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const ServiceBreadcrumb = ({ category = "Services", serviceName = "Service Details" }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-medium">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        <li className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/services" className="hover:text-blue-600 transition">
            Services
          </Link>
        </li>

        {category && (
          <li className="flex items-center gap-1">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600 truncate max-w-[150px] capitalize">
              {category}
            </span>
          </li>
        )}

        <li className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-[200px]">
            {serviceName}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default ServiceBreadcrumb;
