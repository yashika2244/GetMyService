import React from "react";
import { Loader2, Check, ArrowLeft } from "lucide-react";

const FormActionsBar = ({
  isSaving,
  onCancel,
  hasChanges = true,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 transition-all">
      <div className="text-xs text-slate-500 text-center sm:text-left">
        Make sure all required fields are filled correctly before submitting.
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          type="button"
          disabled={isSaving}
          onClick={onCancel}
          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-sm font-semibold shadow-sm hover:shadow transition disabled:opacity-60"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
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

export default FormActionsBar;
