import React, { useState } from "react";
import { X, Plus, Sparkles, Check } from "lucide-react";

const SUGGESTED_SERVICES = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "HVAC & AC Repair",
  "Home Painting",
  "Deep Cleaning",
  "Appliance Repair",
  "Pest Control",
  "Web Developer",
];

const AddServiceModal = ({ isOpen, onClose, onAdd, isSubmitting = false }) => {
  const [serviceName, setServiceName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = serviceName.trim();
    if (!trimmed) {
      setError("Please enter a service or specialty name");
      return;
    }
    if (trimmed.length < 3) {
      setError("Service name must be at least 3 characters");
      return;
    }

    setError("");
    onAdd(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Add New Service
            </h3>
            <p className="text-xs text-slate-500">
              List a new specialization on your servicer profile
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Service / Specialty Title
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => {
                setServiceName(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Master Electrician"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              autoFocus
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          {/* Quick suggestions */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Popular Specializations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_SERVICES.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    setServiceName(item);
                    if (error) setError("");
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                    serviceName.toLowerCase() === item.toLowerCase()
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Add Specialty</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
