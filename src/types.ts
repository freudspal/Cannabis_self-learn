export type TabType = 
  | 'comparator' 
  | 'synapse' 
  | 'pathways' 
  | 'receptors' 
  | 'studies' 
  | 'generator' 
  | 'glossary' 
  | 'quiz';

export interface StrainProduct {
  id: string;
  name: string;
  category: 'flower' | 'concentrate' | 'hash' | 'edible' | 'hemp';
  thcPercent: number; // default e.g. 22
  cbdPercent: number; // default e.g. 0.1
  thcMinMax: [number, number]; // [min, max] achievable for this product
  cbdMinMax: [number, number]; // [min, max] achievable for this product
  compatibleMethods: string[]; // method IDs that can be used with this product
  description: string;
  commonStreetNames: string;
  psychosisRiskScore: number; // 1-10
  anxietyRiskScore: number; // 1-10
  cbdProtectionScore: number; // 1-10
  details: string;
}

export interface IngestionMethod {
  id: string;
  name: string;
  onset: string;
  duration: string;
  bioavailability: string;
  potencyMultiplier: number; // multiplier on peak effect
  metabolite: string; // e.g. "Delta-9-THC" vs "11-Hydroxy-THC"
  description: string;
  compatibleProducts: string[]; // product IDs compatible with this ingestion method
}

export interface ResearchStudy {
  id: string;
  authors: string;
  year: number;
  fullTitle: string;
  aim: string;
  sampleAndMethod: string;
  keyFindings: string;
  strengths: string[];
  criticisms: string[]; // AO3
  eduqasExamTip: string;
  relevanceToVideo: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  category: 'Neurotransmitter' | 'Cannabinoid' | 'Brain Region' | 'Clinical Term' | 'Methodology';
  definition: string;
  roleInSchizophrenia: string;
  pronunciation?: string;
  memoryHook?: string;
}

export interface ReceptorLocation {
  id: string;
  type: 'CB1' | 'CB2';
  name: string;
  region: string;
  primaryFunction: string;
  schizophreniaRelevance: string;
  coordinates: { x: number; y: number }; // Percentage for diagram placing
}

export interface RiskFactorsScenario {
  ageOfFirstUse: 'under15' | 'age15to18' | 'over18' | 'never';
  cannabisPotency: 'highThcSkunk' | 'moderateBalanced' | 'lowThcCbd' | 'none';
  frequency: 'dailyHeavy' | 'weekly' | 'occasional' | 'never';
  geneticHistory: 'firstDegree' | 'secondDegree' | 'noHistory';
  geneVariant: 'AKT1_CC' | 'AKT1_CT' | 'AKT1_TT';
}

export interface RiskAnalysisResult {
  oddsRatio: number;
  riskCategory: 'Low Baseline' | 'Moderate Risk' | 'High Risk' | 'Very High Risk' | 'Extreme Risk';
  percentageIncrease: number;
  keyContributingFactors: string[];
  caspiReference: string;
  vanWinkelReference?: string;
  murrayReference: string;
  examEvaluationNote: string;
}
