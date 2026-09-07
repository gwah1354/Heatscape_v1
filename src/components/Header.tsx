import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Trees, Sparkles, Building2, User, Globe2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, toggleRole, language, toggleLanguage, t } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/85 backdrop-blur-xl border-b border-stone-800/80 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Brand & Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-emerald-500/20 border border-orange-500/30 flex items-center justify-center shadow-inner">
            <div className="relative flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-400" />
              <Trees className="w-3.5 h-3.5 text-emerald-400 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-white">
                {t.appTitle}
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                TN Civic
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-medium">
              Chennai Metro · Tamil Nadu
            </p>
          </div>
        </div>

        {/* Right Actions: Language + Role Switcher */}
        <div className="flex items-center gap-1.5">
          {/* Language Toggle (EN / TA) */}
          <button
            onClick={toggleLanguage}
            id="lang-toggle-btn"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs font-medium text-stone-300 hover:text-white hover:border-stone-700 transition-all active:scale-95"
            title="Switch Language / மொழியை மாற்றுக"
          >
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">{language === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          {/* Role Switcher Button */}
          <button
            onClick={toggleRole}
            id="role-toggle-btn"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 shadow-sm ${
              role === 'citizen'
                ? 'bg-gradient-to-r from-stone-900 to-stone-800 border-stone-700 text-stone-200 hover:border-emerald-500/40'
                : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
            }`}
          >
            {role === 'citizen' ? (
              <>
                <Building2 className="w-3.5 h-3.5 text-orange-400" />
                <span>{language === 'ta' ? 'திட்டமிடுபவர்' : 'Planner View'}</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'ta' ? 'பொதுமக்கள்' : 'Citizen View'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Illustrative Chennai Data Subtle Sub-Banner */}
      <div className="max-w-md mx-auto mt-1 flex items-center justify-between text-[10px] text-stone-400 border-t border-stone-800/40 pt-1">
        <span className="flex items-center gap-1 text-amber-400/90 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          {t.civicBanner}
        </span>
        <span className="text-stone-400 font-mono text-[9.5px]">
          {t.aiPrinciple}
        </span>
      </div>
    </header>
  );
};
