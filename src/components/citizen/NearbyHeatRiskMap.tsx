import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hotspot } from '../../types';
import { ChennaiVectorMap } from '../map/ChennaiVectorMap';
import { 
  Flame, 
  Trees, 
  ArrowRight, 
  MapPin 
} from 'lucide-react';

export const NearbyHeatRiskMap: React.FC = () => {
  const { 
    hotspots, 
    projects,
    selectedHotspot, 
    setSelectedHotspot, 
    openHotspot, 
    openProject,
    language 
  } = useApp();

  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(selectedHotspot);

  const handleSelectHotspot = (hotspot: Hotspot) => {
    setActiveHotspot(hotspot);
    setSelectedHotspot(hotspot);
  };

  // Find linked cooling project for this hotspot
  const nearbyProject = projects.find(p => p.hotspotId === activeHotspot.id) || projects[0];

  const getRiskLabel = (score: number) => {
    if (score >= 85) return language === 'ta' ? 'அதிக வெப்ப அபாயம்' : 'High heat risk';
    if (score >= 70) return language === 'ta' ? 'மிதமான-அதிக வெப்பம்' : 'Elevated heat risk';
    return language === 'ta' ? 'மிதமான வெப்பம்' : 'Moderate heat risk';
  };

  const getPlainFactors = (hotspot: Hotspot) => {
    if (hotspot.id === 'hs-annanagar') {
      return language === 'ta' ? 'குறைந்த நிழல் · அதிக தார் தளம்' : 'Low shade · Lots of paved surfaces';
    }
    if (hotspot.id === 'hs-tnagar') {
      return language === 'ta' ? 'அடர்ந்த கட்டிடங்கள் · அதிக மக்கள் புழக்கம்' : 'Dense buildings · Lots of paved surfaces';
    }
    if (hotspot.id === 'hs-saidapet') {
      return language === 'ta' ? 'குறைந்த மரப்பரப்பு · அதிக போக்குவரத்து' : 'Low shade · High traffic corridor';
    }
    return language === 'ta' ? 'குறைந்த நிழல் · அதிக தார் தளம்' : 'Low shade · Lots of paved surfaces';
  };

  const getProjectName = () => {
    if (activeHotspot.id === 'hs-annanagar' || nearbyProject.id === 'proj-031') {
      return language === 'ta' ? 'மரம் நடுதல் + நிழற்குடைகள்' : 'Tree planting + shade';
    }
    if (nearbyProject.id === 'proj-047') {
      return language === 'ta' ? 'மரம் நடுதல் + நிழற்குடைகள்' : 'Tree planting + shade';
    }
    return language === 'ta' ? 'குளிர் கூரை திட்டம்' : 'Cool roof project';
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight">
          {language === 'ta' ? 'அருகில் என்ன நடக்கிறது?' : "What's happening around me?"}
        </h1>
        <p className="text-xs text-stone-400 mt-0.5">
          {language === 'ta' 
            ? 'வெப்ப அபாய பகுதிகள் மற்றும் குளிர்ச்சித் திட்டங்கள்' 
            : 'Heat-risk areas and cooling projects across Chennai'}
        </p>
      </div>

      {/* Clean Interactive Map */}
      <ChennaiVectorMap
        hotspots={hotspots}
        selectedHotspotId={activeHotspot.id}
        onSelectHotspot={handleSelectHotspot}
        showFilters={false}
        heightClass="h-[340px]"
      />

      {/* Minimal Legend */}
      <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-stone-900/80 border border-stone-800 text-[11px] text-stone-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span>{language === 'ta' ? 'வெப்ப பகுதி' : 'Heat area'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>{language === 'ta' ? 'குளிர்ச்சி திட்டம்' : 'Cooling project'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span>{language === 'ta' ? 'உங்கள் இடம்' : 'Your location'}</span>
        </div>
      </div>

      {/* Simple Bottom Sheet for Tapped Area */}
      <div 
        id="map-selected-hotspot-card"
        className="p-4 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-3"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight">
              {language === 'ta' ? activeHotspot.nameTa.split('(')[0] : activeHotspot.name.split('(')[0]}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-bold text-rose-400">
                {getRiskLabel(activeHotspot.riskScore)}
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1">
              {getPlainFactors(activeHotspot)}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xl font-black text-white font-mono">
              {activeHotspot.riskScore}
            </span>
            <span className="text-xs text-stone-400 font-mono"> / 100</span>
          </div>
        </div>

        {/* Linked Cooling Project summary */}
        <div className="pt-2 border-t border-stone-800/80 space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
            {language === 'ta' ? 'குளிர்ச்சித் திட்டம்' : 'Cooling project'}
          </span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-white">{getProjectName()}</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400">
              {language === 'ta' ? 'நடைபெறுகிறது' : 'In progress'}
            </span>
          </div>
        </div>

        {/* See details action */}
        <div className="pt-2 border-t border-stone-800/80 flex justify-end">
          <button
            onClick={() => openHotspot(activeHotspot, 'citizen')}
            id="btn-map-see-details"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg hover:bg-stone-800 active:scale-95"
          >
            <span>{language === 'ta' ? 'விவரங்களைப் பார்க்க →' : 'See details →'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
