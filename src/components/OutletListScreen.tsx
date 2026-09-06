import React, { useState, useMemo } from 'react';
import { CafeOutlet, ReservationStatus } from '../types';
import { Search, MapPin, Clock, ChevronRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface OutletListScreenProps {
  outlets: CafeOutlet[];
  onSelectOutlet: (outletId: string) => void;
}

type FilterTab = 'ALL' | 'AVAILABLE' | 'LIMITED' | 'SOLD_OUT';

export const OutletListScreen: React.FC<OutletListScreenProps> = ({
  outlets,
  onSelectOutlet,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>('ALL');

  const counts = useMemo(() => {
    return {
      all: outlets.length,
      available: outlets.filter((c) => c.todayStatus === 'Available').length,
      limited: outlets.filter((c) => c.todayStatus === 'Limited').length,
      soldOut: outlets.filter((c) => c.todayStatus === 'Sold Out').length,
    };
  }, [outlets]);

  const filteredOutlets = useMemo(() => {
    return outlets.filter((outlet) => {
      const matchesSearch =
        outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.specialty.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === 'AVAILABLE') return outlet.todayStatus === 'Available';
      if (selectedFilter === 'LIMITED') return outlet.todayStatus === 'Limited';
      if (selectedFilter === 'SOLD_OUT') return outlet.todayStatus === 'Sold Out';

      return true;
    });
  }, [outlets, searchQuery, selectedFilter]);

  const getStatusBadge = (status: ReservationStatus, availableCount: number) => {
    if (status === 'Available') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap">
          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
          <span>{availableCount} Slots Left</span>
        </span>
      );
    }
    if (status === 'Limited') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap">
          <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 dark:text-amber-400 flex-shrink-0" />
          <span>{availableCount} Slot Left • Limited</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm font-bold whitespace-nowrap">
        <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-500 dark:text-stone-400 flex-shrink-0" />
        <span>Fully Booked Today</span>
      </span>
    );
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Search & Quick Filters */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-amber-700/60 dark:text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="cafe-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cafe name or area (e.g. Amber Quarter)..."
            className="w-full pl-11 pr-4 py-3.5 bg-amber-50/60 dark:bg-stone-900 border border-amber-200/90 dark:border-stone-700 rounded-xl text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white dark:focus:bg-stone-900 shadow-xs transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              id="clear-search-button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-900 dark:text-stone-500 dark:hover:text-stone-300 px-2 py-1 text-sm font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Badges / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-sm">
          <button
            onClick={() => setSelectedFilter('ALL')}
            id="filter-all-button"
            className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedFilter === 'ALL'
                ? 'bg-amber-950 dark:bg-stone-100 text-amber-50 dark:text-stone-900 shadow-xs border border-amber-950 dark:border-stone-100'
                : 'bg-amber-100/60 dark:bg-stone-900 text-amber-950 dark:text-stone-300 border border-amber-200 dark:border-stone-700 hover:bg-amber-200/60 dark:hover:bg-stone-800'
            }`}
          >
            All Outlets ({counts.all})
          </button>
          <button
            onClick={() => setSelectedFilter('AVAILABLE')}
            id="filter-available-button"
            className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedFilter === 'AVAILABLE'
                ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-xs border border-emerald-700 dark:border-emerald-600'
                : 'bg-emerald-50 dark:bg-stone-900 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-900/60 hover:bg-emerald-100/80 dark:hover:bg-stone-800'
            }`}
          >
            Has Slots ({counts.available})
          </button>
          <button
            onClick={() => setSelectedFilter('LIMITED')}
            id="filter-limited-button"
            className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedFilter === 'LIMITED'
                ? 'bg-amber-600 dark:bg-amber-600 text-white shadow-xs border border-amber-600 dark:border-amber-600'
                : 'bg-amber-100/80 dark:bg-stone-900 text-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-900/60 hover:bg-amber-200/80 dark:hover:bg-stone-800'
            }`}
          >
            Limited ({counts.limited})
          </button>
          <button
            onClick={() => setSelectedFilter('SOLD_OUT')}
            id="filter-sold-out-button"
            className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedFilter === 'SOLD_OUT'
                ? 'bg-stone-700 dark:bg-stone-600 text-white shadow-xs border border-stone-700 dark:border-stone-600'
                : 'bg-stone-200/70 dark:bg-stone-900 text-stone-700 dark:text-stone-400 border border-stone-300 dark:border-stone-700 hover:bg-stone-300/70 dark:hover:bg-stone-800'
            }`}
          >
            Sold Out ({counts.soldOut})
          </button>
        </div>
      </div>

      {/* List Header */}
      <div className="flex items-center justify-between pt-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Showing {filteredOutlets.length} {filteredOutlets.length === 1 ? 'Cafe' : 'Cafes'}
        </h3>
        <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Tap to check slot times</span>
      </div>

      {/* Outlet Cards Grid/List */}
      {filteredOutlets.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-stone-800 dark:text-stone-200">No cafes match your filter</h4>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
            Try resetting your search query or switching to "All Outlets" to view available cafes.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('ALL');
            }}
            id="reset-filter-button"
            className="mt-2 px-4 py-2 bg-amber-600 text-white font-medium rounded-xl text-sm hover:bg-amber-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredOutlets.map((outlet) => {
            const availableSlots = outlet.slots.filter((s) => s.status !== 'Sold Out');

            return (
              <button
                key={outlet.id}
                id={`outlet-card-${outlet.id}`}
                onClick={() => onSelectOutlet(outlet.id)}
                className="w-full text-left bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 rounded-2xl p-4 sm:p-5 shadow-xs transition-all duration-150 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 group flex flex-col gap-3"
              >
                {/* Top Row: Name & Status Badge */}
                <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-2 sm:gap-3 min-w-0">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <h4 className="text-base sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-400 transition-colors break-words">
                        {outlet.name}
                      </h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 flex-shrink-0">
                        {outlet.priceLevel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 flex-wrap">
                      <span className="inline-flex items-center gap-1 font-medium min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 flex-shrink-0" />
                        <span className="truncate">{outlet.neighborhood}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium min-w-0">
                        <Clock className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 flex-shrink-0" />
                        <span className="truncate">{outlet.operatingHours}</span>
                      </span>
                    </div>
                  </div>

                  <div className="self-start xs:self-auto flex-shrink-0">
                    {getStatusBadge(outlet.todayStatus, outlet.availableSlotsCount)}
                  </div>
                </div>

                {/* Specialty description */}
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-1 italic break-words">
                  {outlet.specialty}
                </p>

                {/* Bottom Row: Preview of open slots or status message */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm min-w-0">
                  {outlet.availableSlotsCount > 0 ? (
                    <div className="flex items-center gap-1.5 flex-wrap min-w-0 flex-1">
                      <span className="text-stone-500 dark:text-stone-400 font-medium whitespace-nowrap">Open times:</span>
                      {availableSlots.slice(0, 3).map((slot) => (
                        <span
                          key={slot.id}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold whitespace-nowrap text-xs"
                        >
                          {slot.time}
                        </span>
                      ))}
                      {availableSlots.length > 3 && (
                        <span className="text-stone-500 dark:text-stone-400 font-medium whitespace-nowrap text-xs">
                          +{availableSlots.length - 3} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-stone-500 dark:text-stone-400 font-medium break-words text-xs sm:text-sm flex-1">
                      Walk-in line only • No reservation slots remain
                    </div>
                  )}

                  <div className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400 group-hover:text-amber-800 dark:group-hover:text-amber-300 flex-shrink-0 ml-auto">
                    <span>View Slots</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
