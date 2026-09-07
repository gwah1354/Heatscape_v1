import React from 'react';
import { useApp, ScreenName } from '../context/AppContext';
import { 
  Home, 
  MapPin, 
  Layers, 
  AlertTriangle, 
  LayoutDashboard, 
  GitCompare, 
  IndianRupee, 
  FileText,
  Map
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { role, activeScreen, setActiveScreen, language, t } = useApp();

  const citizenNavItems: { id: ScreenName; label: string; labelTa: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'citizen_home', label: 'Home', labelTa: 'முகப்பு', icon: Home },
    { id: 'citizen_map', label: 'Map', labelTa: 'வரைபடம்', icon: MapPin },
    { id: 'citizen_projects', label: 'Projects', labelTa: 'திட்டங்கள்', icon: Layers },
    { id: 'citizen_report', label: 'Report', labelTa: 'புகார்', icon: AlertTriangle },
  ];

  const plannerNavItems: { id: ScreenName; label: string; labelTa: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'planner_dashboard', label: 'Hotspots', labelTa: 'மையங்கள்', icon: LayoutDashboard },
    { id: 'planner_map', label: 'Diagnose', labelTa: 'ஆய்வு', icon: Map },
    { id: 'planner_action', label: 'Plan', labelTa: 'திட்டம்', icon: GitCompare },
    { id: 'planner_budget', label: 'Budget', labelTa: 'பட்ஜெட்', icon: IndianRupee },
    { id: 'planner_brief', label: 'Project', labelTa: 'அறிக்கை', icon: FileText },
  ];

  const currentItems = role === 'citizen' ? citizenNavItems : plannerNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <nav 
          aria-label="Bottom Navigation"
          className="bg-stone-900/95 backdrop-blur-xl border border-stone-800/90 rounded-2xl p-1.5 shadow-2xl shadow-black/90 flex items-center justify-around gap-1"
        >
          {currentItems.map((item) => {
            const Icon = item.icon;
            // Check if active (or if on subscreen)
            const isActive = activeScreen === item.id || 
              (item.id === 'citizen_map' && activeScreen === 'citizen_hotspot') ||
              (item.id === 'citizen_projects' && activeScreen === 'citizen_project_detail') ||
              (item.id === 'planner_map' && activeScreen === 'planner_hotspot');

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveScreen(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all relative ${
                  isActive
                    ? 'bg-stone-800/90 text-emerald-400 font-semibold shadow-inner'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-emerald-400' : 'text-stone-400'}`} />
                <span className="text-[10px] mt-1 tracking-tight truncate max-w-[60px]">
                  {language === 'ta' ? item.labelTa : item.label}
                </span>

                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
