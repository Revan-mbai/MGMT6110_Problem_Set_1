import React, { useState } from 'react';
import { CafeOutlet, SlotStatus } from '../types';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Users,
  Armchair,
  Info,
  CalendarCheck,
} from 'lucide-react';

interface OutletDetailScreenProps {
  outlet: CafeOutlet;
  onBack: () => void;
}

type PeriodFilter = 'ALL' | 'Morning' | 'Afternoon' | 'Evening';

export const OutletDetailScreen: React.FC<OutletDetailScreenProps> = ({
  outlet,
  onBack,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>('ALL');

  const filteredSlots = outlet.slots.filter((slot) => {
    if (selectedPeriod === 'ALL') return true;
    return slot.period === selectedPeriod;
  });

  const getSlotBadge = (status: SlotStatus, tablesRemaining: number) => {
    if (status === 'Available') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
          <span>Available ({tablesRemaining} {tablesRemaining === 1 ? 'table' : 'tables'} left)</span>
        </span>
      );
    }
    if (status === 'Filling Fast') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 text-xs sm:text-sm font-bold">
          <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0" />
          <span>Filling Fast (Only 1 table left)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm font-semibold">
        <XCircle className="w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0" />
        <span>Sold Out</span>
      </span>
    );
  };

  return (
    <div className="space-y-5 pb-16">
      {/* Top Back Navigation Bar */}
      <button
        onClick={onBack}
        id="back-to-outlets-button"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 font-bold text-sm sm:text-base hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors shadow-xs active:bg-stone-100 dark:active:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-300" />
        <span>Back to all cafes</span>
      </button>

      {/* Outlet Summary Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight break-words">
                {outlet.name}
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 flex-shrink-0">
                {outlet.priceLevel}
              </span>
            </div>
            <p className="text-xs sm:text-base text-amber-800 dark:text-amber-400 font-medium mt-1 break-words">
              {outlet.specialty}
            </p>
          </div>

          <div className="self-start sm:self-auto flex-shrink-0">
            {outlet.todayStatus === 'Available' ? (
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold text-xs sm:text-base">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                <span>Reservations Available Today</span>
              </div>
            ) : outlet.todayStatus === 'Limited' ? (
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-base">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 dark:text-amber-400 flex-shrink-0" />
                <span>Limited Availability Today</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs sm:text-base">
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-stone-500 dark:text-stone-400 flex-shrink-0" />
                <span>Fully Booked for Today</span>
              </div>
            )}
          </div>
        </div>

        {/* Cafe Details List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
          <div className="flex items-start gap-2 min-w-0">
            <MapPin className="w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0 mt-0.5" />
            <span className="break-words min-w-0">{outlet.address} ({outlet.neighborhood})</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <Clock className="w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0" />
            <span className="break-words min-w-0">Open today: {outlet.operatingHours}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <Phone className="w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0" />
            <span className="break-words min-w-0">Phone: {outlet.phone}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <CalendarCheck className="w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0" />
            <span className="break-words min-w-0">Slots open today: {outlet.availableSlotsCount} of {outlet.totalSlotsCount}</span>
          </div>
        </div>

        {/* Advisory Note */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <span className="break-words min-w-0"><strong>Notice:</strong> {outlet.reservationNote}</span>
        </div>
      </div>

      {/* Slots Section Header & Time Filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
              Today's Reservation Slots
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Check availability by service window before heading down
            </p>
          </div>

          {/* Period selector */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200 dark:border-stone-700 self-start sm:self-auto text-xs sm:text-sm max-w-full overflow-x-auto no-scrollbar">
            {(['ALL', 'Morning', 'Afternoon', 'Evening'] as PeriodFilter[]).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                id={`period-filter-${period.toLowerCase()}`}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                  selectedPeriod === period
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {period === 'ALL' ? 'All Day' : period}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Cards */}
        {filteredSlots.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 text-center text-stone-500 dark:text-stone-400 text-sm">
            No reservation slots scheduled for the {selectedPeriod} period.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSlots.map((slot) => {
              const isAvailable = slot.status !== 'Sold Out';

              return (
                <div
                  key={slot.id}
                  id={`reservation-slot-${slot.id}`}
                  className={`border rounded-2xl p-3.5 sm:p-5 transition-all shadow-xs min-w-0 ${
                    isAvailable
                      ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500'
                      : 'bg-stone-50/80 dark:bg-stone-900/50 border-stone-200/80 dark:border-stone-800/80 opacity-75'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 min-w-0">
                    {/* Left: Time and period */}
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <div
                        className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-center font-extrabold text-sm sm:text-lg min-w-[76px] sm:min-w-[100px] flex-shrink-0 border ${
                          isAvailable
                            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                            : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700'
                        }`}
                      >
                        {slot.time}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
                            {slot.period} Service
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium mt-0.5 flex-wrap">
                          <span className="inline-flex items-center gap-1 min-w-0">
                            <Armchair className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 flex-shrink-0" />
                            <span className="truncate">{slot.seatingArea}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 flex-shrink-0">
                            <Users className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 flex-shrink-0" />
                            Up to {slot.maxPartySize} pax
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Availability Badge */}
                    <div className="self-start sm:self-center flex-shrink-0">
                      {getSlotBadge(slot.status, slot.tablesRemaining)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Arm's length readable phone card with helpful guidance */}
      <div className="bg-stone-900 dark:bg-stone-900/90 text-stone-200 rounded-2xl p-5 text-sm space-y-2 border border-stone-800">
        <h4 className="font-bold text-white text-base">
          Reservation Tracker Guide
        </h4>
        <p className="text-stone-300 leading-relaxed text-sm">
          If a slot is marked <strong>Available</strong>, reservations can be held at the counter or confirmed via phone. If a slot is marked <strong>Sold Out</strong>, walk-in counter queues and takeaway cups are still serviced according to capacity.
        </p>
      </div>
    </div>
  );
};
