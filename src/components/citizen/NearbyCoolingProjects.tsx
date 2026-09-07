import React from 'react';
import { useApp } from '../../context/AppContext';
import { CoolingProject } from '../../types';
import { ArrowRight } from 'lucide-react';

export const NearbyCoolingProjects: React.FC = () => {
  const { projects, openProject, language } = useApp();

  const getSimplifiedTitle = (project: CoolingProject, lang: string) => {
    if (project.id === 'proj-031' || project.id === 'proj-047') {
      return lang === 'ta' ? 'மரம் நடுதல் + நிழற்குடைகள்' : 'Tree planting + shade';
    }
    if (project.id === 'proj-052') {
      return lang === 'ta' ? 'நிழல் அமைப்பு' : 'Shade structure';
    }
    if (project.id === 'proj-019') {
      return lang === 'ta' ? 'குளிர் கூரை திட்டம்' : 'Cool roof project';
    }
    return lang === 'ta' ? project.titleTa : project.title;
  };

  const getAreaName = (project: CoolingProject, lang: string) => {
    if (project.id === 'proj-031') return lang === 'ta' ? 'அண்ணா நகர்' : 'Anna Nagar';
    if (project.id === 'proj-047') return lang === 'ta' ? 'தி. நகர்' : 'T. Nagar';
    if (project.id === 'proj-052') return lang === 'ta' ? 'சைதாப்பேட்டை' : 'Saidapet';
    if (project.id === 'proj-019') return lang === 'ta' ? 'கிண்டி' : 'Guindy';
    return lang === 'ta' ? project.locationTa.split(',')[0] : project.location.split(',')[0];
  };

  const getStatusBadge = (status: string) => {
    if (status === 'in_progress') {
      return (
        <span className="text-xs font-bold text-emerald-400">
          {language === 'ta' ? 'நடைபெறுகிறது' : 'In progress'}
        </span>
      );
    }
    if (status === 'completed' || status === 'verified') {
      return (
        <span className="text-xs font-bold text-sky-400">
          {language === 'ta' ? 'நிறைவடைந்தது' : 'Completed'}
        </span>
      );
    }
    return (
      <span className="text-xs font-bold text-amber-400">
        {language === 'ta' ? 'திட்டமிடப்பட்டது' : 'Planned'}
      </span>
    );
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight">
          {language === 'ta' ? 'அருகிலுள்ள குளிர்ச்சித் திட்டங்கள்' : 'Cooling projects near you'}
        </h1>
        <p className="text-xs text-stone-400 mt-0.5">
          {language === 'ta' 
            ? 'பொதுப்பணி மற்றும் மாநகராட்சி வெப்ப தணிப்பு திட்டங்கள்' 
            : 'Public works addressing neighborhood heat'}
        </p>
      </div>

      {/* Clean Project Cards List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className="p-4 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-md space-y-2.5 hover:border-stone-700 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  {getSimplifiedTitle(project, language)}
                </h2>
                <p className="text-xs text-stone-300 mt-0.5 font-medium">
                  {getAreaName(project, language)}
                </p>
              </div>

              {getStatusBadge(project.status)}
            </div>

            <div className="pt-2 border-t border-stone-800/80 flex justify-end">
              <button
                onClick={() => openProject(project)}
                id={`btn-view-project-${project.id}`}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-stone-800 active:scale-95"
              >
                <span>{language === 'ta' ? 'பார்க்க →' : 'View →'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
