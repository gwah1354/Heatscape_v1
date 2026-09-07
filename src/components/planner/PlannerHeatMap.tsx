import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hotspot } from '../../types';
import { 
  ArrowRight, 
  MapPin, 
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';

export const PlannerHeatMap: React.FC = () => {
  const { 
    hotspots, 
    openHotspot, 
    language 
  } = useApp();

  const [selectedWardFilter, setSelectedWardFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sort ranked by risk score
  const sortedHotspots = [...hotspots].sort((a, b) => b.riskScore - a.riskScore);

  const filteredHotspots = sortedHotspots.filter(h => {
    const matchesFilter = selectedWardFilter === 'all' || h.zone.toLowerCase().includes(selectedWardFilter.toLowerCase());
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          h.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          h.wardNumber.toString().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const getPriorityLabel = (score: number) => {
    if (score >= 85) return { label: language === 'ta' ? 'அதிமுக்கிய முன்னுரிமை' : 'High priority', color: 'text-rose-400' };
    if (score >= 75) return { label: language === 'ta' ? 'முன்னுரிமை 2' : 'Elevated priority', color: 'text-amber-400' };
    return { label: language === 'ta' ? 'மிதமான முன்னுரிமை' : 'Moderate priority', color: 'text-emerald-400' };
  };

  const getPlainFactors = (hotspot: Hotspot, lang: string) => {
    if (hotspot.id === 'hs-annanagar') {
      return lang === 'ta' ? 'குறைந்த நிழல் · அதிக தார் தளம்' : 'Low shade · High paved surface';
    }
    if (hotspot.id === 'hs-tnagar') {
      return lang === 'ta' ? 'அடர்ந்த கட்டிடங்கள் · அதிக மக்கள் புழக்கம்' : 'Dense buildings · High pedestrian exposure';
    }
    if (hotspot.id === 'hs-georgetown') {
      return lang === 'ta' ? 'குறைந்த மரப்பரப்பு · குறுகிய வீதிகள்' : 'Low shade · Extreme heat absorption';
    }
    if (hotspot.id === 'hs-saidapet') {
      return lang === 'ta' ? 'அதிக தார் சாலைகள் · போக்குவரத்து நெரிசல்' : 'High paved surface · Transit heat trapping';
    }
    return lang === 'ta' ? 'குறைந்த நிழல் · அதிக கான்கிரீட் தளம்' : 'Low shade · High paved surface';
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* ONE QUESTION: Which areas should we prioritize? */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight">
          {language === 'ta' ? 'எந்தப் பகுதிகளுக்கு முன்னுரிமை அளிக்க வேண்டும்?' : 'Which areas should we prioritize?'}
        </h1>
        <p className="text-xs text-stone-400 mt-0.5">
          {language === 'ta' 
            ? 'அதிக வெப்ப அபாயம் கொண்ட பகுதிகள் தரவரிசைப்படுத்தப்பட்டுள்ளன' 
            : 'Ranked heat-risk list for municipal mitigation'}
        </p>
      </div>

      {/* Useful, Minimal Filter (Area / Ward) */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'ta' ? 'பகுதி அல்லது வார்டு தேட...' : 'Filter by area name or ward...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-stone-900/90 border border-stone-800 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-stone-700"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <button
            onClick={() => setSelectedWardFilter('all')}
            className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
              selectedWardFilter === 'all'
                ? 'bg-stone-800 text-white font-bold'
                : 'bg-stone-900/70 text-stone-400 hover:text-stone-200'
            }`}
          >
            {language === 'ta' ? 'அனைத்து வார்டுகள்' : 'All Wards'}
          </button>
          <button
            onClick={() => setSelectedWardFilter('Central')}
            className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
              selectedWardFilter === 'Central'
                ? 'bg-stone-800 text-white font-bold'
                : 'bg-stone-900/70 text-stone-400 hover:text-stone-200'
            }`}
          >
            {language === 'ta' ? 'மத்திய மண்டலம்' : 'Central Wards'}
          </button>
          <button
            onClick={() => setSelectedWardFilter('North')}
            className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
              selectedWardFilter === 'North'
                ? 'bg-stone-800 text-white font-bold'
                : 'bg-stone-900/70 text-stone-400 hover:text-stone-200'
            }`}
          >
            {language === 'ta' ? 'வட மண்டலம்' : 'North Wards'}
          </button>
          <button
            onClick={() => setSelectedWardFilter('South')}
            className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
              selectedWardFilter === 'South'
                ? 'bg-stone-800 text-white font-bold'
                : 'bg-stone-900/70 text-stone-400 hover:text-stone-200'
            }`}
          >
            {language === 'ta' ? 'தென் மண்டலம்' : 'South Wards'}
          </button>
        </div>
      </div>

      {/* Clean Ranked List */}
      <div className="space-y-2.5">
        {filteredHotspots.map((hotspot) => {
          const priority = getPriorityLabel(hotspot.riskScore);
          return (
            <div
              key={hotspot.id}
              id={`planner-hotspot-item-${hotspot.id}`}
              className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-md space-y-2 hover:border-stone-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-white tracking-tight">
                    {language === 'ta' ? hotspot.nameTa.split('(')[0] : hotspot.name.split('(')[0]}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs font-bold ${priority.color}`}>
                      {priority.label}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      Ward {hotspot.wardNumber}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 mt-1">
                    {getPlainFactors(hotspot, language)}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-2xl font-black text-white font-mono">
                    {hotspot.riskScore}
                  </span>
                  <span className="text-xs text-stone-400 font-mono"> / 100</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800/80 flex justify-end">
                <button
                  onClick={() => openHotspot(hotspot, 'planner')}
                  id={`btn-open-planner-hotspot-${hotspot.id}`}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-stone-800 active:scale-98"
                >
                  <span>{language === 'ta' ? 'ஆய்வு செய் →' : 'View →'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
