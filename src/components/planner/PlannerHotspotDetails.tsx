import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  Trees, 
  SunMedium, 
  Building2, 
  Users, 
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const PlannerHotspotDetails: React.FC = () => {
  const { 
    selectedHotspot, 
    setActiveScreen, 
    language 
  } = useApp();

  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const getRiskLabel = (score: number) => {
    if (score >= 85) return language === 'ta' ? 'அதிக வெப்ப அபாயம்' : 'High heat risk';
    if (score >= 75) return language === 'ta' ? 'மிதமான-அதிக வெப்பம்' : 'Moderate-high heat risk';
    return language === 'ta' ? 'மிதமான வெப்பம்' : 'Moderate heat risk';
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* Header with Back button */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setActiveScreen('planner_dashboard')}
          id="btn-back-to-hotspots-dash"
          className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-all active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-mono text-stone-400">
            {language === 'ta' ? selectedHotspot.zoneTa : selectedHotspot.zone} · Ward {selectedHotspot.wardNumber}
          </span>
          <h1 className="text-lg font-extrabold text-white tracking-tight">
            {language === 'ta' ? selectedHotspot.nameTa : selectedHotspot.name}
          </h1>
        </div>
      </div>

      {/* ONE QUESTION: Why does this area need attention? */}
      <div>
        <h2 className="text-base font-extrabold text-white tracking-tight">
          {language === 'ta' ? 'ஏன் இந்த பகுதிக்கு உடனடி கவனம் தேவை?' : 'Why does this area need attention?'}
        </h2>
      </div>

      {/* Prominent Heat-Risk Score */}
      <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl flex items-center justify-between">
        <div>
          <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 mb-2">
            {getRiskLabel(selectedHotspot.riskScore)}
          </span>
          <p className="text-xs text-stone-400">
            {language === 'ta' ? 'நகர்ப்புற வெப்ப அபாய மதிப்பீடு' : 'Urban Heat-Risk Score'}
          </p>
        </div>

        <div className="text-right">
          <span className="text-4xl font-black text-white font-mono tracking-tight">
            {selectedHotspot.riskScore}
          </span>
          <span className="text-xs text-stone-400 font-mono"> / 100</span>
        </div>
      </section>

      {/* Most Important Causes (Simple Visual Indicators) */}
      <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-3">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          {language === 'ta' ? 'முக்கிய காரணங்கள்' : 'Key Causes'}
        </h3>

        <div className="space-y-2.5">
          {/* 1. Low shade */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center gap-2.5">
              <Trees className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-stone-200">
                {language === 'ta' ? 'குறைந்த நிழல்' : 'Low shade'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-rose-400">
              {language === 'ta' ? 'கடுமையான குறைபாடு' : 'Severe deficit'}
            </span>
          </div>

          {/* 2. High paved surface */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center gap-2.5">
              <SunMedium className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-bold text-stone-200">
                {language === 'ta' ? 'அதிக தார் மற்றும் கான்கிரீட் தளம்' : 'High paved surface'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-amber-400">
              {language === 'ta' ? 'வெப்ப ஈர்ப்பு அதிகம்' : 'High radiation'}
            </span>
          </div>

          {/* 3. Dense buildings */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-xs font-bold text-stone-200">
                {language === 'ta' ? 'அடர்ந்த கட்டிடங்கள்' : 'Dense buildings'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-stone-400">
              {language === 'ta' ? 'வெப்பம் தேக்கம்' : 'Heat trapped'}
            </span>
          </div>

          {/* 4. High human exposure */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="text-xs font-bold text-stone-200">
                {language === 'ta' ? 'அதிக மக்கள் புழக்கம்' : 'High human exposure'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-sky-400">
              {language === 'ta' ? 'பொதுமக்கள் அதிகம்' : 'Pedestrian hub'}
            </span>
          </div>
        </div>
      </section>

      {/* What could help? */}
      <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-3">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          {language === 'ta' ? 'என்ன தீர்வுகள் உதவக்கூடும்?' : 'What could help?'}
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-stone-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{language === 'ta' ? 'மரம் நடுதல்' : 'Tree planting'}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{language === 'ta' ? 'குளிர் கூரைகள்' : 'Cool roofs'}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{language === 'ta' ? 'நிழல் அமைப்புகள்' : 'Shade infrastructure'}</span>
          </div>
        </div>
      </section>

      {/* PRIMARY ACTION: Plan intervention → */}
      <div className="pt-1">
        <button
          onClick={() => setActiveScreen('planner_action')}
          id="btn-plan-intervention-primary"
          className="w-full py-4 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-sm tracking-tight flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50 active:scale-98 transition-all"
        >
          <span>{language === 'ta' ? 'செயல் திட்டத்தை வகுக்க →' : 'Plan intervention →'}</span>
          <ArrowRight className="w-4 h-4 text-stone-950" />
        </button>
      </div>

      {/* Technical GIS info behind expandable disclosure */}
      <div className="pt-1">
        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          id="btn-toggle-tech-details"
          className="w-full py-2.5 px-4 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800 text-xs text-stone-400 hover:text-stone-200 flex items-center justify-between transition-all"
        >
          <span>{language === 'ta' ? 'தொழில்நுட்ப விவரங்களைக் காண்க' : 'View technical details'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showTechnicalDetails ? 'rotate-180' : ''}`} />
        </button>

        {showTechnicalDetails && (
          <div className="mt-2 p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-2 text-xs text-stone-300">
            <div className="flex justify-between">
              <span className="text-stone-400">Ambient Temperature:</span>
              <span className="font-mono text-white">{selectedHotspot.ambientTempC}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Vegetation Canopy Cover:</span>
              <span className="font-mono text-white">{selectedHotspot.diagnosis.canopyCoverPercent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Impervious Surface Ratio:</span>
              <span className="font-mono text-white">{selectedHotspot.diagnosis.imperviousSurfacePercent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Population Density:</span>
              <span className="font-mono text-white">{selectedHotspot.populationDensityPerSqKm.toLocaleString()} / km²</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
