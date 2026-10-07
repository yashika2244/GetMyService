import React from "react";
import { Clock, Plus, Trash2, Calendar, CheckCircle2 } from "lucide-react";

const AvailabilitySchedule = ({
  timeSlots = [],
  onOpenAddSlotModal,
  onRemoveSlot,
  canEdit = false,
  isRemoving = false,
}) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Group slots by day
  const slotsByDay = daysOfWeek.map((day) => ({
    day,
    slots: timeSlots.filter((slot) => slot.day === day),
  }));

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[#0F172A]">
              Weekly Availability & Working Hours
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">
              {timeSlots.length} Slots
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Specify your availability so clients know when you can take appointments
          </p>
        </div>

        {canEdit && (
          <button
            onClick={onOpenAddSlotModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slot</span>
          </button>
        )}
      </div>

      {timeSlots.length === 0 ? (
        <div className="py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-800">
            No availability configured yet
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Set up your regular weekly working schedule to let customers know when you are open for service.
          </p>
          {canEdit && (
            <button
              onClick={onOpenAddSlotModal}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Configure Schedule</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {slotsByDay.map(({ day, slots }) => {
            const hasSlots = slots.length > 0;
            return (
              <div
                key={day}
                className={`p-4 rounded-xl border transition ${
                  hasSlots
                    ? "bg-white border-slate-200 shadow-xs"
                    : "bg-slate-50/60 border-slate-100 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-slate-800">
                      {day}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      hasSlots
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {hasSlots ? `${slots.length} Active` : "Off"}
                  </span>
                </div>

                {hasSlots ? (
                  <div className="space-y-2">
                    {slots.map((slot, idx) => (
                      <div
                        key={slot._id || idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs font-medium text-slate-700"
                      >
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          <span>
                            {slot.startTime || "09:00"} -{" "}
                            {slot.endTime || "17:00"}
                          </span>
                        </div>
                        {canEdit && onRemoveSlot && (
                          <button
                            onClick={() => onRemoveSlot(slot._id || idx)}
                            disabled={isRemoving}
                            className="text-slate-400 hover:text-red-600 transition p-1 cursor-pointer disabled:opacity-50"
                            title="Delete time slot"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No hours set</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AvailabilitySchedule;
