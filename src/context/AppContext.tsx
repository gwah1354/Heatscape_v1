import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  UserRole, 
  Language, 
  Hotspot, 
  CoolingProject, 
  InterventionOption, 
  ObservationReport,
  ImplementationBriefData
} from '../types';
import { 
  MOCK_HOTSPOTS, 
  MOCK_PROJECTS, 
  MOCK_INTERVENTION_OPTIONS, 
  MOCK_OBSERVATIONS,
  TRANSLATIONS 
} from '../data/mockData';

export type ScreenName = 
  | 'citizen_home'
  | 'citizen_map'
  | 'citizen_hotspot'
  | 'citizen_projects'
  | 'citizen_project_detail'
  | 'citizen_report'
  | 'planner_dashboard'
  | 'planner_map'
  | 'planner_hotspot'
  | 'planner_action'
  | 'planner_budget'
  | 'planner_brief';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  activeScreen: ScreenName;
  setActiveScreen: (screen: ScreenName) => void;
  
  hotspots: Hotspot[];
  selectedHotspot: Hotspot;
  setSelectedHotspot: (hotspot: Hotspot) => void;
  selectHotspotById: (id: string) => void;

  projects: CoolingProject[];
  selectedProject: CoolingProject;
  setSelectedProject: (project: CoolingProject) => void;
  selectProjectById: (id: string) => void;

  interventionOptions: InterventionOption[];
  selectedOption: InterventionOption;
  setSelectedOption: (option: InterventionOption) => void;

  budgetLakhs: number;
  setBudgetLakhs: (val: number) => void;

  observations: ObservationReport[];
  addObservation: (obs: Omit<ObservationReport, 'id' | 'timestamp' | 'status'>) => string;

  implementationBrief: ImplementationBriefData;
  t: typeof TRANSLATIONS['en'];

  // Quick navigation shortcuts
  openHotspot: (hotspot: Hotspot, fromRole?: UserRole) => void;
  openProject: (project: CoolingProject) => void;
  openReportForm: (prefillProject?: CoolingProject) => void;
  generateBriefForPlan: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('citizen');
  const [language, setLanguage] = useState<Language>('en');
  const [activeScreen, setActiveScreen] = useState<ScreenName>('citizen_home');

  const [hotspots] = useState<Hotspot[]>(MOCK_HOTSPOTS);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(MOCK_HOTSPOTS[0]); // T. Nagar

  const [projects] = useState<CoolingProject[]>(MOCK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<CoolingProject>(MOCK_PROJECTS[0]); // Project #047

  const [interventionOptions] = useState<InterventionOption[]>(MOCK_INTERVENTION_OPTIONS);
  const [selectedOption, setSelectedOption] = useState<InterventionOption>(MOCK_INTERVENTION_OPTIONS[1]); // Option B (Balanced - Model Pick)

  const [budgetLakhs, setBudgetLakhs] = useState<number>(15.0);
  const [observations, setObservations] = useState<ObservationReport[]>(MOCK_OBSERVATIONS);

  const toggleRole = () => {
    if (role === 'citizen') {
      setRole('planner');
      setActiveScreen('planner_dashboard');
    } else {
      setRole('citizen');
      setActiveScreen('citizen_home');
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const selectHotspotById = (id: string) => {
    const found = hotspots.find(h => h.id === id);
    if (found) setSelectedHotspot(found);
  };

  const selectProjectById = (id: string) => {
    const found = projects.find(p => p.id === id);
    if (found) setSelectedProject(found);
  };

  const openHotspot = (hotspot: Hotspot, fromRole?: UserRole) => {
    setSelectedHotspot(hotspot);
    const targetRole = fromRole || role;
    if (targetRole === 'citizen') {
      setActiveScreen('citizen_hotspot');
    } else {
      setActiveScreen('planner_hotspot');
    }
  };

  const openProject = (project: CoolingProject) => {
    setSelectedProject(project);
    // Find associated hotspot if any
    const associatedHotspot = hotspots.find(h => h.id === project.hotspotId);
    if (associatedHotspot) {
      setSelectedHotspot(associatedHotspot);
    }
    setActiveScreen('citizen_project_detail');
  };

  const openReportForm = (prefillProject?: CoolingProject) => {
    if (prefillProject) {
      setSelectedProject(prefillProject);
    }
    setActiveScreen('citizen_report');
  };

  const addObservation = (newObs: Omit<ObservationReport, 'id' | 'timestamp' | 'status'>) => {
    const newId = `GCC-OBS-${Math.floor(1000 + Math.random() * 9000)}`;
    const created: ObservationReport = {
      ...newObs,
      id: newId,
      timestamp: 'Just now',
      status: 'Received',
    };
    setObservations(prev => [created, ...prev]);
    return newId;
  };

  // Helper calculation for dynamic brief
  const calculateDynamicQuantities = (budget: number, option: InterventionOption) => {
    const scaleFactor = budget / 15.0;
    return {
      trees: Math.round(option.treeCount * scaleFactor),
      coolRoofSqFt: Math.round(option.coolRoofSqFt * scaleFactor),
      shadeStructures: Math.max(1, Math.round(option.shadeCanopiesCount * (budget >= 10 ? scaleFactor : 0.5))),
    };
  };

  const implementationBrief: ImplementationBriefData = {
    hotspot: selectedHotspot,
    selectedOption: selectedOption,
    customBudgetLakhs: budgetLakhs,
    candidateLocations: [
      `${selectedHotspot.name} - Pedestrian walk zones and commercial fringes`,
      `${selectedHotspot.zone} - Corporation school rooftop cluster`,
      `${selectedHotspot.name} - High-heat public transit interchange`
    ],
    candidateLocationsTa: [
      `${selectedHotspot.nameTa} - நடைபாதை பகுதிகள் மற்றும் சந்தை ஓரங்கள்`,
      `${selectedHotspot.zoneTa} - மாநகராட்சி பள்ளி கூரை வளாகம்`,
      `${selectedHotspot.nameTa} - அதிக வெப்பம் உள்ள பேருந்து பரிமாற்ற மையம்`
    ],
    quantities: calculateDynamicQuantities(budgetLakhs, selectedOption),
    totalCostLakhs: budgetLakhs,
    timelineDays: selectedOption.timelineDays,
    responsibleAuthority: 'Greater Chennai Corporation (GCC) Climate Resilience Cell & Ward Officers',
    maintenanceProtocol: [
      'Bi-weekly drip tanker watering for newly planted native saplings (24 months)',
      'Solar Reflectance Index (SRI) surface audit every 6 months',
      'Automated misting nozzle descaling prior to peak summer (March-May)',
      'Citizen observation validation workflow via HeatScape portal'
    ],
    expectedImpact: `Projected localized surface temperature drop of 2.1°C to 3.4°C within 300m radius; estimated 24,000+ daily pedestrians and residents protected from extreme daytime radiant heat.`,
    generatedDate: '07 September 2026',
  };

  const generateBriefForPlan = () => {
    setActiveScreen('planner_brief');
  };

  const t = TRANSLATIONS[language];

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        toggleRole,
        language,
        setLanguage,
        toggleLanguage,
        activeScreen,
        setActiveScreen,
        hotspots,
        selectedHotspot,
        setSelectedHotspot,
        selectHotspotById,
        projects,
        selectedProject,
        setSelectedProject,
        selectProjectById,
        interventionOptions,
        selectedOption,
        setSelectedOption,
        budgetLakhs,
        setBudgetLakhs,
        observations,
        addObservation,
        implementationBrief,
        t,
        openHotspot,
        openProject,
        openReportForm,
        generateBriefForPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
