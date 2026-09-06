import { useState, useMemo, useEffect } from 'react';
import { INVENTED_CAFES } from './data/cafeData';
import { Header } from './components/Header';
import { OutletListScreen } from './components/OutletListScreen';
import { OutletDetailScreen } from './components/OutletDetailScreen';

export default function App() {
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cafe_tracker_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cafe_tracker_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cafe_tracker_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const getFormattedTimestamp = () => {
    return new Date().toLocaleTimeString('en-SG', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  // Timestamp simulating when reservation data was last checked
  const [lastUpdated, setLastUpdated] = useState<string>(getFormattedTimestamp);

  // Automatically update timestamp when user switches views or when page loads/refreshes
  useEffect(() => {
    setLastUpdated(getFormattedTimestamp());
  }, [selectedOutletId]);

  const handleManualRefresh = () => {
    setLastUpdated(getFormattedTimestamp());
  };

  // Derive counts for summary in header
  const outletsWithSlotsCount = useMemo(() => {
    return INVENTED_CAFES.filter((c) => c.todayStatus !== 'Sold Out').length;
  }, []);

  const selectedOutlet = useMemo(() => {
    if (!selectedOutletId) return null;
    return INVENTED_CAFES.find((c) => c.id === selectedOutletId) || null;
  }, [selectedOutletId]);

  const handleSelectOutlet = (id: string) => {
    setSelectedOutletId(id);
    // Smooth scroll to top when moving between screens on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOutlets = () => {
    setSelectedOutletId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden ${isDark ? 'dark bg-stone-950 text-stone-100' : 'bg-stone-100 text-stone-900'} flex flex-col font-sans antialiased selection:bg-amber-200 transition-colors duration-200`}>
      {/* Top Header Bar */}
      <Header
        outletsWithSlotsCount={outletsWithSlotsCount}
        totalOutletsCount={INVENTED_CAFES.length}
        onHomeClick={handleBackToOutlets}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        lastUpdated={lastUpdated}
        onRefresh={handleManualRefresh}
      />

      {/* Main Content Container (Mobile-first, comfortable at arm's length on phone) */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 min-w-0">
        {selectedOutlet ? (
          /* SCREEN 2: Specific Outlet Reservation Availability */
          <OutletDetailScreen
            outlet={selectedOutlet}
            onBack={handleBackToOutlets}
          />
        ) : (
          /* SCREEN 1: Homepage showing all outlets */
          <OutletListScreen
            outlets={INVENTED_CAFES}
            onSelectOutlet={handleSelectOutlet}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 dark:bg-stone-950 border-t border-stone-800 dark:border-stone-800/80 text-stone-400 py-6 px-4 text-center text-xs sm:text-sm w-full max-w-full overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-1">
          <p className="font-semibold text-stone-300">Cafe Reservation Tracker</p>
          <p className="text-stone-400">
            Problem Set 1 • MGMT 6110 Human-AI Collaboration
          </p>
          <p className="text-stone-500 text-[11px] pt-1">
            All cafe names, locations, and reservation data are fictional simulations.
          </p>
        </div>
      </footer>
    </div>
  );
}
