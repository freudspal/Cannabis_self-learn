import { StrainProduct, IngestionMethod } from '../types';

export const STRAINS_DATA: StrainProduct[] = [
  {
    id: 'skunk-high-thc',
    name: 'High-THC "Skunk" / Sinsemilla',
    category: 'flower',
    thcPercent: 22,
    cbdPercent: 0.1,
    thcMinMax: [10, 35],
    cbdMinMax: [0, 2],
    compatibleMethods: ['smoking-joint', 'vaping-flower'],
    description: 'Bred specifically for high psychoactive potency with near-zero CBD content.',
    commonStreetNames: 'Skunk, Amnesia Haze, Stardawg, Gorilla Glue',
    psychosisRiskScore: 9.2,
    anxietyRiskScore: 8.5,
    cbdProtectionScore: 1.0,
    details: 'Lacks CBD buffering. High THC over-stimulates pre-synaptic CB1 receptors on GABA interneurons in the Ventral Tegmental Area (VTA), disinhibiting dopamine neurons and leading to hyper-dopaminergia in the mesolimbic pathway.'
  },
  {
    id: 'balanced-strain',
    name: 'Balanced 1:1 Hybrid Strain',
    category: 'flower',
    thcPercent: 10,
    cbdPercent: 10,
    thcMinMax: [1, 18],
    cbdMinMax: [1, 20],
    compatibleMethods: ['smoking-joint', 'vaping-flower'],
    description: 'Equal concentrations of THC and CBD. CBD acts as a negative allosteric modulator on CB1 receptors.',
    commonStreetNames: 'Harlequin, Cannatonic, Pennywise',
    psychosisRiskScore: 3.2,
    anxietyRiskScore: 2.8,
    cbdProtectionScore: 8.5,
    details: 'CBD binds to an allosteric site on CB1 receptors, changing their shape so THC cannot bind as effectively. This dampens the psychotogenic and paranoia-inducing effects of THC.'
  },
  {
    id: 'medical-cbd-hemp',
    name: 'High-CBD Medical Hemp',
    category: 'hemp',
    thcPercent: 0.2,
    cbdPercent: 18,
    thcMinMax: [0.0, 1.0],
    cbdMinMax: [5, 30],
    compatibleMethods: ['smoking-joint', 'vaping-flower', 'oral-edible'],
    description: 'High CBD with legal threshold THC (<0.2%). Investigated as an antipsychotic therapeutic agent.',
    commonStreetNames: 'CBD Flower, Charlotte’s Web',
    psychosisRiskScore: 1.0,
    anxietyRiskScore: 1.2,
    cbdProtectionScore: 9.8,
    details: 'Non-intoxicating. Research (e.g., Leweke et al., 2012) shows CBD elevates serum anandamide levels by inhibiting the FAAH enzyme, showing efficacy comparable to atypical antipsychotics with fewer side effects.'
  },
  {
    id: 'traditional-hash-resin',
    name: 'Traditional Hashish / Resin',
    category: 'hash',
    thcPercent: 8,
    cbdPercent: 5,
    thcMinMax: [3, 40],
    cbdMinMax: [0.5, 15],
    compatibleMethods: ['smoking-joint', 'vaping-flower', 'dabbing-vape'],
    description: 'Pressed plant resin containing mixed trichomes with moderate THC and natural CBD levels.',
    commonStreetNames: 'Moroccan Hash, Slate, Pollen',
    psychosisRiskScore: 4.1,
    anxietyRiskScore: 3.5,
    cbdProtectionScore: 6.2,
    details: 'Traditional hash resin historically contained balanced ratios of THC to CBD (~2:1 or 1:1), resulting in lower population-level first-episode psychosis rates compared to modern hydroponic Skunk.'
  },
  {
    id: 'dabs-shatter',
    name: 'Cannabis Concentrates (Dabs / Shatter / Wax)',
    category: 'concentrate',
    thcPercent: 80,
    cbdPercent: 0.5,
    thcMinMax: [40, 98],
    cbdMinMax: [0, 10],
    compatibleMethods: ['dabbing-vape', 'vaping-flower'],
    description: 'Extracted cannabis resin oils boasting extreme concentrations of pure THC.',
    commonStreetNames: 'Shatter, Wax, Live Resin, Concentrates',
    psychosisRiskScore: 9.8,
    anxietyRiskScore: 9.6,
    cbdProtectionScore: 0.5,
    details: 'Delivers massive acute THC boluses directly to the central nervous system. Induces rapid down-regulation of CB1 receptors and acute transient psychotic phenomena (hallucinations, persecutory delusions).'
  },
  {
    id: 'edible-gummies',
    name: 'THC Infused Edibles',
    category: 'edible',
    thcPercent: 25,
    cbdPercent: 0.2,
    thcMinMax: [5, 60],
    cbdMinMax: [0, 30],
    compatibleMethods: ['oral-edible'],
    description: 'Ingested cannabis processed by liver enzymes into 11-Hydroxy-THC.',
    commonStreetNames: 'Gummies, Brownies, THC Chocolates',
    psychosisRiskScore: 8.4,
    anxietyRiskScore: 9.0,
    cbdProtectionScore: 1.5,
    details: 'Hepatic first-pass metabolism converts Delta-9-THC into 11-Hydroxy-THC, a compound with significantly higher blood-brain barrier permeability and potently longer CB1 receptor binding duration.'
  }
];

export const INGESTION_METHODS: IngestionMethod[] = [
  {
    id: 'smoking-joint',
    name: 'Smoking (Joint / Pipe)',
    onset: '2 - 5 Minutes',
    duration: '2 - 4 Hours',
    bioavailability: '10% - 25%',
    potencyMultiplier: 1.0,
    metabolite: 'Delta-9-THC',
    description: 'Combustion releases vaporized Delta-9-THC directly into pulmonary circulation, rapidly crossing the blood-brain barrier to hit CB1 receptors in seconds.',
    compatibleProducts: ['skunk-high-thc', 'balanced-strain', 'medical-cbd-hemp', 'traditional-hash-resin']
  },
  {
    id: 'vaping-flower',
    name: 'Dry Herb / Vape Chamber',
    onset: '1 - 3 Minutes',
    duration: '2 - 3 Hours',
    bioavailability: '30% - 55%',
    potencyMultiplier: 1.25,
    metabolite: 'Delta-9-THC',
    description: 'Conduction or convection heating vaporizes cannabinoids without combustion. Higher bioavailability leads to higher peak brain THC levels per milligram.',
    compatibleProducts: ['skunk-high-thc', 'balanced-strain', 'medical-cbd-hemp', 'traditional-hash-resin', 'dabs-shatter']
  },
  {
    id: 'oral-edible',
    name: 'Oral Ingestion (Edibles)',
    onset: '45 - 120 Minutes',
    duration: '6 - 12 Hours',
    bioavailability: '4% - 12%',
    potencyMultiplier: 2.1,
    metabolite: '11-Hydroxy-THC',
    description: 'Absorbed via gastrointestinal tract and processed by hepatic CYP2C9 liver enzymes into 11-hydroxy-THC, which is far more potent and longer-lasting in the brain.',
    compatibleProducts: ['edible-gummies', 'medical-cbd-hemp']
  },
  {
    id: 'dabbing-vape',
    name: 'Dabbing / Concentrate Rig',
    onset: 'Immediate (<30s)',
    duration: '3 - 6 Hours',
    bioavailability: '60% - 80%',
    potencyMultiplier: 3.2,
    metabolite: 'Delta-9-THC (Extreme Spike)',
    description: 'Extreme acute THC flood. Leads to rapid CB1 receptor saturation and intense transient psychotogenic effects.',
    compatibleProducts: ['dabs-shatter', 'traditional-hash-resin']
  }
];
