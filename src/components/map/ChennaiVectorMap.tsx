import React, { useState } from 'react';
import { Hotspot, HeatRiskLevel } from '../../types';
import { Flame, Info, Compass, ShieldCheck, MapPin, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ChennaiVectorMapProps {
  hotspots: Hotspot[];
  selectedHotspotId?: string;
  onSelectHotspot: (hotspot: Hotspot) => void;
  showFilters?: boolean;
  interactive?: boolean;
  heightClass?: string;
  compact?: boolean;
}

export const ChennaiVectorMap: React.FC<ChennaiVectorMapProps> = ({
  hotspots,
  selectedHotspotId,
  onSelectHotspot,
  showFilters = true,
  interactive = true,
  heightClass = 'h-[360px]',
  compact = false,
}) => {
  const { language } = useApp();
  const [filter, setFilter] = useState<HeatRiskLevel | 'all'>('all');
  const [activeLayer, setActiveLayer] = useState<'heat' | 'canopy'>('heat');

  const filteredHotspots = hotspots.filter(h => {
    if (filter === 'all') return true;
    return h.riskLevel === filter;
  });

  const getMarkerColor = (level: HeatRiskLevel) => {
    switch (level) {
      case 'very_high':
        return { bg: '#dc2626', stroke: '#ef4444', ring: 'rgba(239, 68, 68, 0.35)', badge: 'bg-red-500/20 text-red-400 border-red-500/30' };
      case 'high':
        return { bg: '#ea580c', stroke: '#f97316', ring: 'rgba(249, 115, 22, 0.35)', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30' };
      case 'moderate':
        return { bg: '#d97706', stroke: '#f59e0b', ring: 'rgba(245, 158, 11, 0.35)', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
      case 'low':
        return { bg: '#059669', stroke: '#10b981', ring: 'rgba(16, 185, 129, 0.35)', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-stone-800 bg-stone-900/90 shadow-lg">
      {/* Map Header / Layer Toggles */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-stone-800 text-xs font-medium text-stone-300 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
          <span>{language === 'ta' ? 'சென்னை மண்டலம்' : 'Chennai Metro Urban Core'}</span>
        </div>

        {showFilters && (
          <div className="pointer-events-auto flex items-center gap-1 bg-stone-950/80 backdrop-blur-md p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => setActiveLayer('heat')}
              className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-all ${
                activeLayer === 'heat'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {language === 'ta' ? 'வெப்ப அடுக்கு' : 'Surface Heat'}
            </button>
            <button
              onClick={() => setActiveLayer('canopy')}
              className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-all ${
                activeLayer === 'canopy'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {language === 'ta' ? 'மர அடுக்கு' : 'Tree Canopy'}
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas Map */}
      <div className={`relative w-full ${heightClass} select-none overflow-hidden`}>
        <svg
          viewBox="0 0 500 580"
          className="w-full h-full object-cover"
          style={{ background: 'linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)' }}
        >
          <defs>
            {/* Heat Gradient Grids */}
            <radialGradient id="oceanShimmer" cx="70%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.1" />
            </radialGradient>

            {/* Thermal zone glows */}
            <radialGradient id="heatGlowRed" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#f97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="heatGlowOrange" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#eab308" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="coolGlowGreen" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#059669" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>

            {/* Dot grid pattern for civic engineering feel */}
            <pattern id="gridDots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#44403c" opacity="0.4" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="500" height="580" fill="url(#gridDots)" />

          {/* Bay of Bengal Coastline on East (Right) */}
          <path
            d="M 400 0 
               C 385 80, 410 160, 395 240 
               C 380 320, 385 400, 390 480 
               C 395 520, 405 560, 415 580 
               L 500 580 L 500 0 Z"
            fill="url(#oceanShimmer)"
            stroke="#0284c7"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />

          {/* Ocean waves text */}
          <text x="440" y="180" fill="#38bdf8" opacity="0.3" fontSize="9" letterSpacing="3" transform="rotate(85 440 180)">
            BAY OF BENGAL
          </text>
          <text x="445" y="380" fill="#38bdf8" opacity="0.25" fontSize="8" letterSpacing="2" transform="rotate(85 445 380)">
            வங்காள விரிகுடா
          </text>

          {/* Waterways: Cooum River & Adyar River */}
          {/* Cooum River running across North-Central */}
          <path
            d="M 0 160 C 80 170, 140 150, 210 175 C 280 200, 340 185, 395 190"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.2"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          <text x="110" y="160" fill="#38bdf8" opacity="0.35" fontSize="8">Cooum River / கூவம்</text>

          {/* Adyar River running across South-Central */}
          <path
            d="M 0 390 C 70 385, 160 410, 230 405 C 300 400, 340 435, 388 445"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.8"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          <text x="90" y="415" fill="#38bdf8" opacity="0.35" fontSize="8">Adyar River / அடையாறு</text>

          {/* Buckingham Canal North-South Axis */}
          <path
            d="M 365 0 C 355 140, 370 280, 360 420 C 355 490, 370 540, 375 580"
            fill="none"
            stroke="#0369a1"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            strokeOpacity="0.3"
          />

          {/* Thermal / Canopy Overlay Layers */}
          {activeLayer === 'heat' ? (
            <g id="thermalRiskBlobs">
              {/* George Town (extreme heat) */}
              <ellipse cx="370" cy="140" rx="55" ry="45" fill="url(#heatGlowRed)" />
              {/* T. Nagar (high heat) */}
              <ellipse cx="250" cy="310" rx="65" ry="50" fill="url(#heatGlowRed)" />
              {/* Anna Nagar (high heat) */}
              <ellipse cx="180" cy="190" rx="55" ry="45" fill="url(#heatGlowOrange)" />
              {/* Guindy (high heat) */}
              <ellipse cx="200" cy="420" rx="50" ry="40" fill="url(#heatGlowOrange)" />
              {/* Kodambakkam */}
              <ellipse cx="195" cy="280" rx="42" ry="36" fill="url(#heatGlowOrange)" />
              {/* Velachery */}
              <ellipse cx="240" cy="480" rx="45" ry="38" fill="url(#heatGlowOrange)" />
              {/* Besant Nagar coastal cool zone */}
              <ellipse cx="350" cy="460" rx="40" ry="35" fill="url(#coolGlowGreen)" />
            </g>
          ) : (
            <g id="canopyCoverBlobs">
              {/* Besant Nagar coastal canopy */}
              <ellipse cx="350" cy="460" rx="50" ry="45" fill="url(#coolGlowGreen)" />
              {/* Guindy National Park green island */}
              <ellipse cx="225" cy="400" rx="35" ry="30" fill="url(#coolGlowGreen)" />
              {/* Semmozhi Poonga / Agri-Horti */}
              <ellipse cx="290" cy="300" rx="25" ry="20" fill="url(#coolGlowGreen)" />
            </g>
          )}

          {/* Major Transit Corridor Lines (Road arterial network) */}
          {/* Anna Salai (Mount Road) */}
          <path
            d="M 380 150 L 320 250 L 260 330 L 205 415"
            fill="none"
            stroke="#57534e"
            strokeWidth="1.8"
            strokeDasharray="6 3"
            opacity="0.45"
          />
          {/* Inner Ring Road */}
          <path
            d="M 160 140 L 170 270 L 195 430 L 245 490"
            fill="none"
            stroke="#57534e"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            opacity="0.35"
          />

          {/* Hotspot Markers */}
          {filteredHotspots.map((hotspot) => {
            const isSelected = selectedHotspotId === hotspot.id;
            const colors = getMarkerColor(hotspot.riskLevel);

            return (
              <g
                key={hotspot.id}
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => onSelectHotspot(hotspot)}
                tabIndex={0}
                role="button"
                aria-label={`Hotspot ${hotspot.name}`}
              >
                {/* Pulsing ring for high risk */}
                {(hotspot.riskLevel === 'very_high' || hotspot.riskLevel === 'high') && (
                  <circle
                    cx={hotspot.coordinates.svgX}
                    cy={hotspot.coordinates.svgY}
                    r={isSelected ? 26 : 20}
                    fill={colors.ring}
                    className="animate-pulse"
                  />
                )}

                {/* Outer halo if selected */}
                {isSelected && (
                  <circle
                    cx={hotspot.coordinates.svgX}
                    cy={hotspot.coordinates.svgY}
                    r="18"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                  />
                )}

                {/* Base Marker Circle */}
                <circle
                  cx={hotspot.coordinates.svgX}
                  cy={hotspot.coordinates.svgY}
                  r={isSelected ? 13 : 10}
                  fill={colors.bg}
                  stroke="#1c1917"
                  strokeWidth="2.5"
                  className="transition-all"
                />

                {/* Heat Score inside circle */}
                <text
                  x={hotspot.coordinates.svgX}
                  y={hotspot.coordinates.svgY + 3.5}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={isSelected ? '9' : '8'}
                  fontWeight="bold"
                >
                  {hotspot.riskScore}
                </text>

                {/* Label Pill */}
                <g transform={`translate(${hotspot.coordinates.svgX}, ${hotspot.coordinates.svgY - (isSelected ? 20 : 16)})`}>
                  <rect
                    x="-42"
                    y="-11"
                    width="84"
                    height="14"
                    rx="7"
                    fill="#18181b"
                    stroke={isSelected ? '#f97316' : '#3f3f46'}
                    strokeWidth={isSelected ? '1.5' : '0.8'}
                    opacity="0.95"
                  />
                  <text
                    x="0"
                    y="-1"
                    textAnchor="middle"
                    fill={isSelected ? '#fed7aa' : '#e4e4e7'}
                    fontSize="7.5"
                    fontWeight={isSelected ? '700' : '500'}
                  >
                    {language === 'ta' ? hotspot.nameTa.split('(')[0] : hotspot.name.split('(')[0]}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Current Citizen Location Indicator (GPS Pin in T. Nagar) */}
          <g transform="translate(265, 335)" className="pointer-events-none">
            <circle cx="0" cy="0" r="14" fill="rgba(59, 130, 246, 0.25)" className="animate-ping" />
            <circle cx="0" cy="0" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
            <rect x="-35" y="8" width="70" height="13" rx="6" fill="#1e3a8a" opacity="0.9" />
            <text x="0" y="17" textAnchor="middle" fill="#93c5fd" fontSize="7" fontWeight="bold">
              {language === 'ta' ? 'உங்கள் இருப்பிடம்' : 'Your Location'}
            </text>
          </g>
        </svg>

        {/* Floating Mini Compass & Scale badge */}
        <div className="absolute bottom-3 right-3 pointer-events-none bg-stone-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-stone-800 text-[10px] text-stone-400 font-mono">
          N ↑ · 1:25,000 Chennai
        </div>
      </div>

      {/* Filter Chips Bar (Below Map) */}
      {showFilters && !compact && (
        <div className="p-2.5 bg-stone-950/70 border-t border-stone-800 flex items-center justify-between gap-1 overflow-x-auto text-xs">
          <span className="text-stone-400 text-[11px] font-medium shrink-0 ml-1">
            {language === 'ta' ? 'அபாய நிலை:' : 'Filter Risk:'}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-stone-700 text-white'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              {language === 'ta' ? 'அனைத்தும்' : 'All (8)'}
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                filter === 'high'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              {language === 'ta' ? 'அதிகம்' : 'High (80+)'}
            </button>
            <button
              onClick={() => setFilter('moderate')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                filter === 'moderate'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              {language === 'ta' ? 'மிதமானது' : 'Moderate'}
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                filter === 'low'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {language === 'ta' ? 'குறைவு' : 'Low'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
