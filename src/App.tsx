/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Smartphone, Monitor } from 'lucide-react';

// Citizen Screens
import { CitizenHome } from './components/citizen/CitizenHome';
import { NearbyHeatRiskMap } from './components/citizen/NearbyHeatRiskMap';
import { HotspotDetails } from './components/citizen/HotspotDetails';
import { NearbyCoolingProjects } from './components/citizen/NearbyCoolingProjects';
import { ProjectDetails } from './components/citizen/ProjectDetails';
import { SubmitObservation } from './components/citizen/SubmitObservation';

// Municipal Planner Screens
import { PlannerDashboard } from './components/planner/PlannerDashboard';
import { PlannerHeatMap } from './components/planner/PlannerHeatMap';
import { PlannerHotspotDetails } from './components/planner/PlannerHotspotDetails';
import { ActionPlanner } from './components/planner/ActionPlanner';
import { BudgetOptimizer } from './components/planner/BudgetOptimizer';
import { ImplementationBrief } from './components/planner/ImplementationBrief';

const MainContent: React.FC = () => {
  const { activeScreen } = useApp();

  const renderScreen = () => {
    switch (activeScreen) {
      case 'citizen_home':
        return <CitizenHome />;
      case 'citizen_map':
        return <NearbyHeatRiskMap />;
      case 'citizen_hotspot':
        return <HotspotDetails />;
      case 'citizen_projects':
        return <NearbyCoolingProjects />;
      case 'citizen_project_detail':
        return <ProjectDetails />;
      case 'citizen_report':
        return <SubmitObservation />;
      case 'planner_dashboard':
        return <PlannerDashboard />;
      case 'planner_map':
        return <PlannerHeatMap />;
      case 'planner_hotspot':
        return <PlannerHotspotDetails />;
      case 'planner_action':
        return <ActionPlanner />;
      case 'planner_budget':
        return <BudgetOptimizer />;
      case 'planner_brief':
        return <ImplementationBrief />;
      default:
        return <CitizenHome />;
    }
  };

  return (
    <main className="px-4 py-4 min-h-[calc(100vh-140px)]">
      {renderScreen()}
    </main>
  );
};

function AppInner() {
  const [deviceView, setDeviceView] = useState<'mobile' | 'fluid'>('mobile');

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-start antialiased selection:bg-emerald-500 selection:text-white">
      {/* Viewport Width Mode Switcher (For testing 390px mobile-first Dribbble view vs full responsive) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-4xl px-4 py-1.5 text-[11px] text-stone-400 border-b border-stone-900 bg-stone-950/90 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-stone-300">HeatScape Mobile-First Prototype</span>
          <span className="text-stone-400">· Tamil Nadu Civic Tech (Chennai)</span>
        </div>

        <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => setDeviceView('mobile')}
            id="btn-view-mobile-frame"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
              deviceView === 'mobile'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Frame (390px)</span>
          </button>
          <button
            onClick={() => setDeviceView('fluid')}
            id="btn-view-fluid"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
              deviceView === 'fluid'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Fluid View</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceView === 'mobile'
            ? 'max-w-[420px] my-0 sm:my-4 sm:rounded-[36px] sm:border sm:border-stone-800 sm:shadow-2xl sm:shadow-black/90 relative overflow-hidden bg-stone-950'
            : 'max-w-md w-full relative bg-stone-950'
        }`}
      >
        <Header />
        <MainContent />
        <BottomNav />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
