import React from 'react';
import { Coffee, Calendar, Sun, Moon, RotateCw } from 'lucide-react';

interface HeaderProps {
  outletsWithSlotsCount: number;
  totalOutletsCount: number;
  onHomeClick: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  lastUpdated: string;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  outletsWithSlotsCount,
  totalOutletsCount,
  onHomeClick,
  isDark,
  onToggleTheme,
  lastUpdated,
  onRefresh,
}) => {
  const todayFormatted = new Date().toLocaleDateString('en-SG', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <header className="bg-amber-50/95 dark:bg-stone-950 text-stone-900 dark:text-stone-100 border-b border-amber-200/80 dark:border-stone-800 sticky top-0 z-30 shadow-xs transition-colors backdrop-blur-xs w-full max-w-full">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 min-w-0">
        <button
          onClick={onHomeClick}
          id="app-header-logo-button"
          className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1 -ml-1 min-w-0 flex-1 sm:flex-initial"
          aria-label="Cafe Reservation Tracker home"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Coffee className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm xs:text-base sm:text-xl font-bold tracking-tight text-amber-950 dark:text-white leading-tight truncate sm:whitespace-normal">
              Cafe Reservation Tracker
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium hidden sm:block truncate">
              Daily table availability for specialty coffee
            </p>
          </div>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <div className="flex flex-col items-end text-right">
            <div className="flex items-center gap-1 text-[11px] sm:text-sm font-medium text-stone-700 dark:text-stone-300">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span className="whitespace-nowrap">{todayFormatted}</span>
            </div>
            <div className="mt-0.5 inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-100/90 dark:bg-stone-800 border border-amber-300 dark:border-stone-700 text-[10px] sm:text-xs text-amber-950 dark:text-amber-300 font-semibold whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse flex-shrink-0"></span>
              <span>{outletsWithSlotsCount}/{totalOutletsCount} open</span>
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-[9px] sm:text-[11px] text-stone-500 dark:text-stone-400 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-500 flex-shrink-0"></span>
              <span className="hidden xs:inline">Updated:</span>
              <span className="font-semibold text-stone-800 dark:text-stone-300">{lastUpdated}</span>
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  id="header-refresh-timestamp-button"
                  title="Refresh status"
                  aria-label="Refresh reservation check timestamp"
                  className="p-0.5 hover:text-amber-700 dark:hover:text-amber-300 text-stone-500 dark:text-stone-400 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <RotateCw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            id="header-theme-toggle-button"
            className="p-1.5 sm:p-2.5 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 dark:bg-stone-800 dark:hover:bg-stone-700 text-amber-900 hover:text-amber-950 dark:text-stone-200 dark:hover:text-white border border-amber-300/80 dark:border-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 flex items-center justify-center flex-shrink-0"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-800" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
