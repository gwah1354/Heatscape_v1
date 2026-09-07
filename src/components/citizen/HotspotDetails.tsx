import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  ArrowLeft, 
  Trees, 
  Building2, 
  Footprints, 
  SunMedium, 
  ArrowRight, 
  ChevronDown,
  AlertTriangle 
} from 'lucide-react';

export const HotspotDetails: React.FC = () => {
  const { 
    selectedHotspot, 
    projects, 
    openProject, 
    setActiveScreen, 
    language 
  } = useApp();

  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  // Find linked cooling project for this hotspot
  const linkedProject = projects.find(p => p.hotspotId === selectedHotspot.id) || projects[0];

  const getRiskLabel = (score: number) => {
    if (score >= 85) return language === 'ta' ? 'அதிக வெப்ப அபாயம்' : 'High heat risk';
    if (score >= 70) return language === 'ta' ? 'மிதமான-அதிக வெப்பம்' : 'Elevated heat risk';
    return language === 'ta' ? 'மிதமான வெப்பம்' : 'Moderate heat risk';
  };

  const getProjectTitle = () => {
    if (selectedHotspot.id === 'hs-annanagar' || linkedProject.id === 'proj-031') {
      return language === 'ta' ? 'மரம் நடுதல் + நிழற்குடைகள்' : 'Tree planting + shade';
    }
    if (linkedProject.id === 'proj-047') {
      return language === 'ta' ? 'மரம் நடுதல் + நிழற்குடைகள்' : 'Tree planting + shade';
    }
    return language === 'ta' ? 'குளிர் கூரை திட்டம்' : 'Cool roof project';
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* Header with Back button */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setActiveScreen('citizen_home')}
          id="btn-back-from-hotspot-to-home"
          className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-all active:scale-95"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-mono text-stone-400">
            {language === 'ta' ? selectedHotspot.zoneTa : selectedHotspot.zone} · Ward {selectedHotspot.wardNumber}
          </span>
          <h1 className="text-lg font-extrabold text-white tracking-tight">
            {language === 'ta' ? selectedHotspot.nameTa.split('(')[0] : selectedHotspot.name.split('(')[0]}
          </h1>
        </div>
      </div>

      {/* Primary Question: Why does this area have high heat risk? */}
      <div>
        <h2 className="text-base font-extrabold text-white tracking-tight">
          {language === 'ta' ? 'ஏன் இங்கு வெப்ப அபாயம் அதிகம்?' : 'Why is heat risk high here?'}
        </h2>
      </div>

      {/* Prominent Score Card */}
      <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black text-rose-400">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>{getRiskLabel(selectedHotspot.riskScore)}</span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            {language === 'ta' ? selectedHotspot.nameTa.split('(')[0] : selectedHotspot.name.split('(')[0]}
          </p>
        </div>

        <div className="text-right">
          <span className="text-3xl font-black text-white font-mono">
            {selectedHotspot.riskScore}
          </span>
          <span className="text-xs text-stone-400 font-mono"> / 100</span>
        </div>
      </section>

      {/* Main Causes (Plain Language) */}
      <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-3">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          {language === 'ta' ? 'காரணங்கள்' : 'Main Causes'}
        </h3>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center gap-2.5">
              <Trees className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-stone-200">
                {language === 'ta' ? 'குறைந்த நிழல்' : 'Low shade'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-rose-400">
              {language === 'ta' ? 'மரங்கள் குறைவு' : 'Very few trees'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center gap-2.5">
              <SunMedium className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-bold text-stone-200">
                {language === 'ta' ? 'அதிக தார் சாலைகள்' : 'Lots of paved surfaces'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-amber-400">
              {language === 'ta' ? 'வெப்ப ஈர்ப்பு அதிகம்' : 'Traps sun heat'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-xs font-bold text-stone-200">
                {language === 'ta' ? 'அடர்ந்த கட்டிடங்கள்' : 'Dense buildings'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-stone-400">
              {language === 'ta' ? 'காற்று தடைபடுகிறது' : 'Blocks breeze'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center gap-2.5">
              <Footprints className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="text-xs font-bold text-stone-200">
                {language === 'ta' ? 'அதிக மக்கள் புழக்கம்' : 'High pedestrian activity'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-sky-400">
              {language === 'ta' ? 'பொதுமக்கள் பாதிப்பு' : 'Many walkers exposed'}
            </span>
          </div>
        </div>
      </section>

      {/* What is being done? */}
      <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-3">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          {language === 'ta' ? 'என்ன செய்யப்படுகிறது?' : "What's being done?"}
        </h3>

        <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trees className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">{getProjectTitle()}</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-400">
              {language === 'ta' ? 'நடைபெறுகிறது' : 'In progress'}
            </span>
          </div>

          <button
            onClick={() => openProject(linkedProject)}
            id="btn-hotspot-view-project"
            className="w-full pt-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-end gap-1 transition-colors"
          >
            <span>{language === 'ta' ? 'திட்டத்தைப் பார்க்க →' : 'See project →'}</span>
          </button>
        </div>
      </section>

      {/* Something wrong? Report a problem */}
      <button
        onClick={() => setActiveScreen('citizen_report')}
        id="btn-hotspot-report-problem"
        className="w-full py-3 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
      >
        <AlertTriangle className="w-4 h-4 text-amber-400" />
        <span>{language === 'ta' ? 'பிரச்சினையைப் பதிவு செய்' : 'Report a problem'}</span>
      </button>

      {/* Optional Technical Information behind accordion */}
      <div className="pt-1">
        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          id="btn-toggle-hotspot-tech"
          className="w-full py-2.5 px-4 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800 text-xs text-stone-400 hover:text-stone-200 flex items-center justify-between transition-all"
        >
          <span>{language === 'ta' ? 'தொழில்நுட்ப விவரங்களைக் காண்க' : 'Technical information'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showTechnicalDetails ? 'rotate-180' : ''}`} />
        </button>

        {showTechnicalDetails && (
          <div className="mt-2 p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-2 text-xs text-stone-300">
            <div className="flex justify-between">
              <span className="text-stone-400">Daytime Ambient Temp:</span>
              <span className="font-mono text-white">{selectedHotspot.ambientTempC}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Canopy Cover:</span>
              <span className="font-mono text-white">{selectedHotspot.diagnosis.canopyCoverPercent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Paved / Impervious Ratio:</span>
              <span className="font-mono text-white">{selectedHotspot.diagnosis.imperviousSurfacePercent}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
