import React from "react";
import { Save, X, Check } from "lucide-react";

const ServiceFormActions = ({
  onCancel,
  isSaving = false,
  isUploading = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-slate-500 text-center sm:text-left">
        Changes will be saved and reflected on your live service listing immediately.
      </p>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving || isUploading}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSaving || isUploading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition cursor-pointer disabled:opacity-60"
        >
          {isSaving || isUploading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{isUploading ? "Uploading Photo..." : "Saving Changes..."}</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ServiceFormActions;
