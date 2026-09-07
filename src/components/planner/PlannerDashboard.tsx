import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  ArrowRight, 
  Building2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const PlannerDashboard: React.FC = () => {
  const { 
    hotspots, 
    openHotspot, 
    setActiveScreen, 
    language 
  } = useApp();

  // Top 3 priority hotspots sorted by risk score
  const topPriorityHotspots = [...hotspots]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 3);

  const getRiskLabel = (score: number) => {
    if (score >= 85) return language === 'ta' ? 'அதிக வெப்ப அபாயம்' : 'High heat risk';
    if (score >= 75) return language === 'ta' ? 'மிதமான-அதிக வெப்ப அபாயம்' : 'Moderate-high heat risk';
    return language === 'ta' ? 'மிதமான வெப்ப அபாயம்' : 'Moderate heat risk';
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
          HeatScape
        </span>
        <h1 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
          {language === 'ta' ? 'நகராட்சி திட்டமிடுபவர்' : 'Municipal Planner'}
        </h1>
      </div>

      {/* ONE QUESTION: What needs attention? */}
      <section className="space-y-3 pt-1">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-bold text-stone-300 uppercase tracking-wider">
            {language === 'ta' ? 'எந்தப் பகுதிக்கு உடனடி கவனம் தேவை?' : 'What needs attention?'}
          </h2>
          <span className="text-[10px] text-stone-400 font-mono">
            {language === 'ta' ? 'முன்னுரிமை 1' : 'Top 3 Priorities'}
          </span>
        </div>

        {/* 3 Hotspot Cards */}
        <div className="space-y-2.5">
          {topPriorityHotspots.map((hotspot, idx) => {
            const numPrefix = `0${idx + 1}`;
            return (
              <div
                key={hotspot.id}
                id={`hotspot-priority-card-${hotspot.id}`}
                className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-md space-y-2.5 hover:border-stone-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-stone-400 block mb-0.5">
                      {numPrefix} — {language === 'ta' ? hotspot.zoneTa.split('(')[0] : hotspot.zone.split('(')[0]}
                    </span>
                    <h3 className="text-base font-extrabold text-white tracking-tight">
                      {numPrefix} — {language === 'ta' ? hotspot.nameTa.split('(')[0] : hotspot.name.split('(')[0]}
                    </h3>
                    <p className="text-xs text-rose-400 font-semibold mt-0.5">
                      {getRiskLabel(hotspot.riskScore)}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-black text-white font-mono">
                      {hotspot.riskScore}
                    </span>
                    <span className="text-xs text-stone-400 font-mono"> / 100</span>
                  </div>
                </div>

                {/* Primary Action for each: View hotspot → */}
                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-end">
                  <button
                    onClick={() => openHotspot(hotspot, 'planner')}
                    id={`btn-view-hotspot-${hotspot.id}`}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-stone-800 active:scale-98"
                  >
                    <span>{language === 'ta' ? 'மையத்தை ஆய்வு செய் →' : 'View hotspot →'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Secondary Action: View all ranked hotspots */}
      <div className="pt-2 text-center">
        <button
          onClick={() => setActiveScreen('planner_map')}
          id="btn-view-all-hotspots"
          className="text-xs font-medium text-stone-400 hover:text-stone-200 transition-colors inline-flex items-center gap-1"
        >
          <span>{language === 'ta' ? 'அனைத்து வெப்ப மையங்களையும் காண்க (8)' : 'View all ranked hotspots in Chennai'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
