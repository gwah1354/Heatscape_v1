export type UserRole = 'citizen' | 'planner';

export type Language = 'en' | 'ta';

export type HeatRiskLevel = 'very_high' | 'high' | 'moderate' | 'low';

export type ProjectStage = 'planned' | 'assigned' | 'in_progress' | 'completed' | 'verified';

export interface PlainVulnerabilityCause {
  label: string;
  labelTa: string;
  description: string;
  descriptionTa: string;
  iconType: 'shade' | 'pavement' | 'buildings' | 'pedestrians';
}

export interface HotspotDiagnosis {
  vegetationDeficit: number; // e.g. -42%
  builtUpDensity: number; // e.g. 89%
  pavedSurface: number; // e.g. 84%
  humanExposureIndex: number; // 0-100
  albedo: number; // e.g. 0.12
  canopyCoverPercent: number; // e.g. 6%
}

export interface SensitiveFacility {
  name: string;
  nameTa: string;
  type: 'school' | 'hospital' | 'transit' | 'market';
  distanceMeters: number;
}

export interface Hotspot {
  id: string;
  name: string;
  nameTa: string;
  zone: string; // e.g. "Zone 10 (Kodambakkam / T. Nagar)"
  zoneTa: string;
  wardNumber: number;
  riskScore: number; // 0 - 100
  riskLevel: HeatRiskLevel;
  ambientTempC: number;
  feelsLikeC: number;
  summaryReason: string;
  summaryReasonTa: string;
  coordinates: {
    lat: number;
    lng: number;
    svgX: number; // 0 - 500 for illustrative Chennai map
    svgY: number; // 0 - 600
  };
  plainCauses?: PlainVulnerabilityCause[];
  diagnosis: HotspotDiagnosis;
  sensitiveFacilities: SensitiveFacility[];
  recommendedInterventions: string[];
  recommendedInterventionsTa: string[];
  nearestProjectId?: string;
  populationDensityPerSqKm: number;
}

export interface ProjectStageStep {
  stage: ProjectStage;
  label: string;
  labelTa: string;
  date: string;
  completed: boolean;
  active: boolean;
  notes?: string;
}

export interface CoolingProject {
  id: string;
  code: string; // e.g. "Project #047"
  title: string;
  titleTa: string;
  hotspotId: string;
  location: string;
  locationTa: string;
  targetDescription: string;
  targetDescriptionTa: string;
  interventions: string[];
  interventionsTa: string[];
  budgetLakhs: number; // in Lakhs INR (e.g. 14.6)
  timelineDays: number;
  elapsedDays: number;
  status: ProjectStage;
  responsibleAuthority: string;
  responsibleAuthorityTa: string;
  contractor: string;
  stages: ProjectStageStep[];
  quantities: {
    treesCount: number;
    coolRoofSqFt: number;
    shadeCanopiesCount: number;
  };
  impactEstimate: {
    surfaceTempDropC: string;
    canopyGrowthPct: string;
  };
}

export interface ObservationReport {
  id: string;
  timestamp: string;
  type: string;
  typeTa: string;
  description: string;
  locationName: string;
  projectId?: string;
  status: 'Received' | 'Assigned to Ward' | 'Resolved';
  photoName?: string;
  reporterContact?: string;
}

export interface InterventionOption {
  id: 'option-a' | 'option-b' | 'option-c';
  code: string;
  title: string;
  titleTa: string;
  tagline: string;
  taglineTa: string;
  focus: string;
  costLakhs: number;
  relativeBenefit: 'High' | 'Highest' | 'Moderate-High';
  benefitScore: number; // 1-100
  modelRankDescription: string;
  modelRankDescriptionTa: string;
  timelineDays: number;
  treeCount: number;
  coolRoofSqFt: number;
  shadeCanopiesCount: number;
  coBenefits: string[];
  coBenefitsTa: string[];
  maintenanceRequirement: string;
  maintenanceRequirementTa: string;
}

export interface ImplementationBriefData {
  hotspot: Hotspot;
  selectedOption: InterventionOption;
  customBudgetLakhs: number;
  candidateLocations: string[];
  candidateLocationsTa: string[];
  quantities: {
    trees: number;
    coolRoofSqFt: number;
    shadeStructures: number;
  };
  totalCostLakhs: number;
  timelineDays: number;
  responsibleAuthority: string;
  maintenanceProtocol: string[];
  expectedImpact: string;
  generatedDate: string;
}
