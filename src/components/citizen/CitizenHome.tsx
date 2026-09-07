import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  Trees, 
  ArrowRight, 
  MapPin, 
  ChevronDown, 
  AlertTriangle 
} from 'lucide-react';

export const CitizenHome: React.FC = () => {
  const { 
    hotspots, 
    projects, 
    openHotspot, 
    openProject, 
    setActiveScreen, 
    language 
  } = useApp();

  // Default to Anna Nagar as specified in the mental model
  const [selectedAreaId, setSelectedAreaId] = useState('hs-annanagar');
  const [showAreaPicker, setShowAreaPicker] = useState(false);

  const currentHotspot = hotspots.find(h => h.id === selectedAreaId) || hotspots[0];
  
  // Find project in this area or nearby
  const nearbyProject = projects.find(p => p.hotspotId === currentHotspot.id) || projects[0];

  const getRiskLabel = (score: number) => {
    if (score >= 85) return language === 'ta' ? 'அதிக வெப்ப அபாயம்' : 'HIGH HEAT RISK';
    if (score >= 70) return language === 'ta' ? 'மிதமான-அதிக வெப்ப அபாயம்' : 'MODERATE-HIGH HEAT RISK';
    return language === 'ta' ? 'மிதமான வெப்ப அபாயம்' : 'MODERATE HEAT RISK';
  };

  const getExplanation = (hotspotId: string) => {
    if (language === 'ta') {
      return 'குறைந்த நிழல் மற்றும் அதிக தார் சாலைகள் இங்கு வெப்பத்தை அதிகரிக்கின்றன.';
    }
    return 'Low shade and lots of paved surfaces are increasing heat risk here.';
  };

  const getSimplifiedProjectTitle = (projId: string) => {
    if (projId === 'proj-031' || projId === 'hs-annanagar') {
      return language === 'ta' ? 'மரம் நடுதல் + நிழற்குடைகள்' : 'Tree planting + shade';
    }
    if (projId === 'proj-047') {
      return language === 'ta' ? 'மரம் நடுதல் + நிழற்குடைகள்' : 'Tree planting + shade';
    }
    return language === 'ta' ? 'குளிர் கூரை திட்டம்' : 'Cool roof project';
  };

  return (
    <div className="space-y-6 pb-28 pt-2 max-w-md mx-auto">
      {/* HEADER: HeatScape / Chennai, Tamil Nadu */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            HeatScape
          </h1>
          <div className="flex items-center gap-1 text-xs text-stone-400 font-medium mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <span>{language === 'ta' ? 'சென்னை, தமிழ்நாடு' : 'Chennai, Tamil Nadu'}</span>
          </div>
        </div>

        {/* Locality Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowAreaPicker(!showAreaPicker)}
            id="btn-switch-locality"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs font-semibold text-stone-300 hover:text-white transition-all active:scale-95"
            aria-label="Change Area"
          >
            <span className="text-emerald-400">●</span>
            <span>{language === 'ta' ? currentHotspot.nameTa.split('(')[0] : currentHotspot.name.split('(')[0]}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${showAreaPicker ? 'rotate-180' : ''}`} />
          </button>

          {showAreaPicker && (
            <div className="absolute right-0 top-9 z-30 w-52 p-2 rounded-2xl bg-stone-900 border border-stone-700 shadow-2xl space-y-1">
              <span className="text-[10px] font-mono uppercase text-stone-400 px-2 py-1 block">
                {language === 'ta' ? 'பகுதியைத் தேர்வு செய்க' : 'Select locality'}
              </span>
              {hotspots.map(h => (
                <button
                  key={h.id}
                  onClick={() => {
                    setSelectedAreaId(h.id);
                    setShowAreaPicker(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                    h.id === currentHotspot.id 
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold' 
                      : 'text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <span>{language === 'ta' ? h.nameTa.split('(')[0] : h.name.split('(')[0]}</span>
                  <span className="font-mono text-[10px] text-stone-400">{h.riskScore}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 1. PRIMARY QUESTION: How is your area? */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
          {language === 'ta' ? 'உங்கள் பகுதி எப்படி இருக்கிறது?' : 'How is your area?'}
        </h2>

        <div className="p-5 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-rose-400 tracking-wider">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>{getRiskLabel(currentHotspot.riskScore)}</span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1 font-mono">
                <span className="text-4xl font-black text-white tracking-tight">
                  {currentHotspot.riskScore}
                </span>
                <span className="text-sm font-semibold text-stone-400">/ 100</span>
              </div>
              <p className="text-base font-extrabold text-white mt-1">
                {language === 'ta' ? currentHotspot.nameTa.split('(')[0] : currentHotspot.name.split('(')[0]}
              </p>
            </div>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            {getExplanation(currentHotspot.id)}
          </p>

          <div className="pt-2 border-t border-stone-800/80 flex justify-end">
            <button
              onClick={() => openHotspot(currentHotspot, 'citizen')}
              id="btn-home-why-hotspot"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-stone-800 active:scale-95"
            >
              <span>{language === 'ta' ? 'ஏன்? →' : 'Why? →'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. SECOND QUESTION: What's being done? */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
          {language === 'ta' ? 'என்ன செய்யப்படுகிறது?' : "What's being done?"}
        </h2>

        <div className="p-4 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Trees className="w-4 h-4 text-emerald-400 shrink-0" />
                <h3 className="text-sm font-extrabold text-white">
                  {getSimplifiedProjectTitle(nearbyProject.id)}
                </h3>
              </div>
              <p className="text-xs text-stone-400 pl-6">
                {language === 'ta' ? currentHotspot.nameTa.split('(')[0] : currentHotspot.name.split('(')[0]}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === 'ta' ? 'நடைபெறுகிறது' : 'In progress'}</span>
            </span>
          </div>

          <div className="pt-2 border-t border-stone-800/80 flex justify-end">
            <button
              onClick={() => openProject(nearbyProject)}
              id="btn-home-see-project"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-stone-800 active:scale-95"
            >
              <span>{language === 'ta' ? 'திட்டத்தைப் பார்க்க →' : 'See project →'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. THIRD QUESTION: Need to report something? */}
      <section className="space-y-2 pt-1">
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
          {language === 'ta' ? 'ஏதேனும் பிரச்சினையா?' : 'Something wrong?'}
        </h2>

        <button
          onClick={() => setActiveScreen('citizen_report')}
          id="btn-home-report-problem"
          className="w-full py-4 px-5 rounded-2xl bg-stone-900 hover:bg-stone-800/90 border border-stone-800 hover:border-stone-700 text-stone-100 font-extrabold text-sm tracking-tight flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-98"
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>{language === 'ta' ? 'பிரச்சினையைப் பதிவு செய்' : 'Report a problem'}</span>
        </button>
      </section>
    </div>
  );
};
