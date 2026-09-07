import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  AlertTriangle 
} from 'lucide-react';

export const ProjectDetails: React.FC = () => {
  const { 
    selectedProject, 
    setActiveScreen, 
    openReportForm, 
    language 
  } = useApp();

  const getSimplifiedTitle = (id: string, lang: string) => {
    if (id === 'proj-031' || id === 'proj-047') return lang === 'ta' ? 'மரம் நடுதல் + நிழற்குடைகள்' : 'Tree planting + shade';
    if (id === 'proj-052') return lang === 'ta' ? 'நிழல் அமைப்பு' : 'Shade structure';
    if (id === 'proj-019') return lang === 'ta' ? 'குளிர் கூரை திட்டம்' : 'Cool roof project';
    return lang === 'ta' ? selectedProject.titleTa : selectedProject.title;
  };

  const getAreaName = (id: string, lang: string) => {
    if (id === 'proj-031') return lang === 'ta' ? 'அண்ணா நகர்' : 'Anna Nagar';
    if (id === 'proj-047') return lang === 'ta' ? 'தி. நகர்' : 'T. Nagar';
    if (id === 'proj-052') return lang === 'ta' ? 'சைதாப்பேட்டை' : 'Saidapet';
    if (id === 'proj-019') return lang === 'ta' ? 'கிண்டி' : 'Guindy';
    return lang === 'ta' ? selectedProject.locationTa.split(',')[0] : selectedProject.location.split(',')[0];
  };

  const stages = [
    { key: 'planned', label: language === 'ta' ? 'திட்டமிடப்பட்டது' : 'Planned' },
    { key: 'assigned', label: language === 'ta' ? 'ஒதுக்கப்பட்டது' : 'Assigned' },
    { key: 'in_progress', label: language === 'ta' ? 'நடைபெறுகிறது' : 'In progress' },
    { key: 'completed', label: language === 'ta' ? 'நிறைவடைந்தது' : 'Completed' },
    { key: 'verified', label: language === 'ta' ? 'உறுதிசெய்யப்பட்டது' : 'Verified' },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === selectedProject.status);
  const activeIndex = currentStageIndex >= 0 ? currentStageIndex : 2; // Default in_progress

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* Header with Back button */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setActiveScreen('citizen_projects')}
          id="btn-back-to-projects-list"
          className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-all active:scale-95"
          aria-label="Back to Projects"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-mono text-stone-400">
            {language === 'ta' ? 'திட்ட விவரம்' : 'Project Details'}
          </span>
          <h1 className="text-lg font-extrabold text-white tracking-tight">
            {getSimplifiedTitle(selectedProject.id, language)}
          </h1>
        </div>
      </div>

      {/* Structured Card: What? Where? Why? Status? Progress? Who? Budget? */}
      <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-4">
        {/* What? */}
        <div>
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
            {language === 'ta' ? 'என்ன?' : 'What?'}
          </span>
          <h2 className="text-base font-extrabold text-white mt-0.5">
            {getSimplifiedTitle(selectedProject.id, language)}
          </h2>
        </div>

        {/* Where? */}
        <div className="pt-2 border-t border-stone-800/80">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
            {language === 'ta' ? 'எங்கே?' : 'Where?'}
          </span>
          <p className="text-sm font-bold text-stone-200 mt-0.5">
            {getAreaName(selectedProject.id, language)}
          </p>
        </div>

        {/* Why? */}
        <div className="pt-2 border-t border-stone-800/80">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
            {language === 'ta' ? 'ஏன்?' : 'Why?'}
          </span>
          <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
            {language === 'ta'
              ? 'நிழலை அதிகரிக்கவும், நேரடி வெப்பத் தாக்கத்தைக் குறைக்கவும்.'
              : 'To increase shade and reduce heat exposure.'}
          </p>
        </div>

        {/* Status */}
        <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
            {language === 'ta' ? 'நிலை' : 'Status'}
          </span>
          <span className="text-xs font-extrabold text-emerald-400">
            {language === 'ta' ? 'நடைபெறுகிறது' : 'In progress'}
          </span>
        </div>

        {/* Progress Tracker */}
        <div className="pt-2 border-t border-stone-800/80 space-y-2">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
            {language === 'ta' ? 'முன்னேற்றம்' : 'Progress'}
          </span>

          <div className="space-y-2 pt-1 pl-1">
            {stages.map((stage, idx) => {
              const isDone = idx < activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <div key={stage.key} className="flex items-center gap-2.5 text-xs">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 rounded-full border-2 border-emerald-400 bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                  ) : (
                    <Circle className="w-4 h-4 text-stone-600 shrink-0" />
                  )}

                  <span className={`font-medium ${
                    isCurrent ? 'text-emerald-400 font-bold' : isDone ? 'text-stone-300' : 'text-stone-500'
                  }`}>
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Who is responsible? */}
        <div className="pt-2 border-t border-stone-800/80">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
            {language === 'ta' ? 'பொறுப்பு யார்?' : 'Who is responsible?'}
          </span>
          <p className="text-xs font-bold text-stone-200 mt-0.5">
            {language === 'ta' ? 'நகராட்சி பொறியியல் துறை (Greater Chennai Corporation)' : 'Municipal Department'}
          </p>
        </div>

        {/* Budget */}
        <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
            {language === 'ta' ? 'பட்ஜெட்' : 'Budget'}
          </span>
          <span className="text-sm font-black text-white font-mono">
            ₹{selectedProject.budgetLakhs}L
          </span>
        </div>
      </section>

      {/* Something doesn't look right? Report a problem */}
      <section className="p-4 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-2">
        <span className="text-xs font-bold text-stone-300 block">
          {language === 'ta' ? 'ஏதேனும் சரியாகத் தெரியவில்லையா?' : "Something doesn't look right?"}
        </span>
        <button
          onClick={() => openReportForm(selectedProject)}
          id="btn-report-from-project"
          className="w-full py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>{language === 'ta' ? 'பிரச்சினையைப் பதிவு செய்' : 'Report a problem'}</span>
        </button>
      </section>
    </div>
  );
};
