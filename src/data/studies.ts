import { ResearchStudy } from '../types';

export const CORE_STUDIES: ResearchStudy[] = [
  {
    id: 'caspi-2005',
    authors: 'Caspi et al.',
    year: 2005,
    fullTitle: 'Moderation of the Effect of Adolescent-Onset Cannabis Use on Adult Psychosis by a Functional Polymorphism in the Catechol-O-Methyltransferase (COMT) Gene',
    aim: 'To investigate whether a functional polymorphism in the COMT gene (Val158Met: Val/Val, Val/Met, Met/Met) interacts with adolescent cannabis use to increase the risk of developing adult psychotic symptoms and schizophreniform disorder (Gene-Environment Interaction $G \\times E$).',
    sampleAndMethod: 'Longitudinal prospective birth cohort study tracking 803 individuals from New Zealand (Dunedin Multidisciplinary Health and Development Study). Genetic testing identified COMT Val158Met genotypes, and self-reported cannabis use was measured across adolescence (ages 13–18).',
    keyFindings: 'Adolescent cannabis users carrying the COMT Val/Val (homozygous Valine) genotype were significantly more likely to develop schizophreniform disorder and psychotic symptoms by age 26 compared to Met/Met carriers. Met/Met carriers showed no increased risk of psychosis regardless of adolescent cannabis use, proving a strong $G \\times E$ interaction.',
    strengths: [
      'Longitudinal design established temporal sequence (adolescent cannabis use preceded psychosis onset).',
      'Provides empirical support for the Diathesis-Stress Model (genetic diathesis + environmental cannabis stressor).',
      'Controlled for pre-existing childhood psychiatric symptoms prior to cannabis initiation.'
    ],
    criticisms: [
      'Self-report measures of adolescent cannabis use may suffer from memory bias or under-reporting due to illegality.',
      'Correlational nature: Cannot ethically assign participants to smoke cannabis in a double-blind experiment.',
      'Sample was predominantly white New Zealander cohort, limiting cross-cultural generalisability.'
    ],
    eduqasExamTip: 'Use Caspi (2005) in AO3 evaluation to show why cannabis affects people differently: cannabis is NOT a simple direct cause, but an environmental trigger for genetically vulnerable individuals carrying the COMT Val/Val allele (Gene-Environment Interaction).',
    relevanceToVideo: 'Directly illustrates why some cannabis users develop hallucinations while others do not—showing how THC interacts with prefrontal COMT dopamine degradation enzymes.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15866551/'
  },
  {
    id: 'van-winkel-2011',
    authors: 'van Winkel et al.',
    year: 2011,
    fullTitle: 'Family-Based Analysis of AKT1 x Cannabis Interaction on Psychosis Proneness',
    aim: 'To examine whether single nucleotide polymorphisms in the AKT1 gene (rs2494732 SNP: C/C, C/T, T/T) interact with cannabis consumption frequency to predict psychosis proneness and psychotic disorders.',
    sampleAndMethod: 'Family-based and case-control genetic study assessing AKT1 genotypes (C/C, C/T, T/T) and cannabis consumption frequency across clinical psychosis patients, unaffected siblings, and healthy controls.',
    keyFindings: 'Daily cannabis users carrying the C/C homozygous variant of the AKT1 gene faced a 7-fold increase in the odds of developing psychosis (Odds Ratio = 7.0) compared to non-users or T/T carriers. T/T carriers showed no increased risk despite daily cannabis use.',
    strengths: [
      'Replicated in independent multi-center cohorts (e.g. Di Forti et al., 2012).',
      'Directly linked to downstream striatal dopamine D2 receptor signaling cascades regulated by AKT1 kinase.',
      'Demonstrated a strong statistical interaction between daily cannabis frequency and C/C genotype.'
    ],
    criticisms: [
      'Focuses on a single genetic locus (rs2494732), whereas schizophrenia risk is polygenic.',
      'Relies on self-reported cannabis frequency and strain type.'
    ],
    eduqasExamTip: 'Use van Winkel et al. (2011) to explain the 7x psychosis risk in AKT1 C/C homozygotes who smoke daily cannabis, demonstrating how AKT1 kinase variants in striatal dopamine pathways regulate genetic susceptibility.',
    relevanceToVideo: 'Provides empirical support for how daily high-THC cannabis interacts with the AKT1 gene to disinhibit striatal dopamine signaling.',
    url: 'https://www.nature.com/articles/npp2011141'
  },
  {
    id: 'ashtari-2009',
    authors: 'Ashtari et al.',
    year: 2009,
    fullTitle: 'Diffusion Tensor Imaging (DTI) Study of White Matter Tracts in Heavy Adolescent Cannabis Users',
    aim: 'To examine whether heavy, early-onset cannabis use during adolescence causes structural brain abnormalities in white matter axonal pathways.',
    sampleAndMethod: 'Brain imaging study comparing 14 young males with a history of heavy adolescent cannabis use against 14 age-matched healthy non-using controls using Diffusion Tensor Imaging (DTI) magnetic resonance scans.',
    keyFindings: 'Heavy adolescent cannabis users displayed significant structural abnormalities and reduced Fractional Anisotropy (FA) in fronto-temporal white matter tracts (including the arcuate fasciculus and corpus callosum). This indicates impaired myelination and disrupted neural connectivity between the prefrontal cortex and limbic system.',
    strengths: [
      'Objective, quantitative neuroimaging measure (DTI scans) eliminates subjective bias.',
      'Focuses specifically on the adolescent developmental window when brain pruning and myelination are vulnerable.'
    ],
    criticisms: [
      'Very small sample size (n = 14 per group), reducing statistical power.',
      'Cause and effect ambiguity: Did cannabis disrupt white matter development, or did pre-existing brain tract abnormalities incline participants to substance use?'
    ],
    eduqasExamTip: 'Crucial biological evidence for AO1/AO3: Shows physical brain damage caused by cannabis in fronto-temporal tracts, linking impaired prefrontal executive control to schizophrenia symptoms.',
    relevanceToVideo: 'Supplements video coverage on how adolescent brain development is disrupted by THC, altering brain architecture before full maturation.',
    url: 'https://www.sciencedirect.com/science/article/abs/pii/S0022395608002653'
  },
  {
    id: 'mcgee-2000',
    authors: 'McGee et al.',
    year: 2000,
    fullTitle: 'A longitudinal study of cannabis use and mental health from adolescence to early adulthood',
    aim: 'To evaluate whether early adolescent cannabis use predicts subsequent psychiatric disorders, particularly psychotic symptoms, in young adulthood.',
    sampleAndMethod: 'Prospective birth cohort study tracking over 1,000 children born in Dunedin, NZ, assessed at ages 15, 18, 21, and 26 for substance use, social background, and psychiatric symptoms using DSM clinical criteria.',
    keyFindings: 'Participants who initiated heavy cannabis use before age 15 had a 3-fold higher risk of experiencing schizophrenia symptoms by age 26. The association persisted even after controlling for baseline socio-economic status and prior mental health issues.',
    strengths: [
      'Large prospective sample (n > 1000) with exceptionally high retention rates over 20+ years.',
      'Controlled for confounding variables such as pre-existing childhood conduct problems and other drug use.'
    ],
    criticisms: [
      'Relies on self-reported drug frequency, which can under-represent actual dosage and cannabinoid strain potency.',
      'Polysubstance use (alcohol, nicotine, amphetamines) was common among early cannabis users, making isolation of pure cannabis effects challenging.'
    ],
    eduqasExamTip: 'Great AO1 evidence for the "Age Factor": Using cannabis before age 15 dramatically amplifies risk compared to starting after age 18, when brain pruning is largely complete.',
    relevanceToVideo: 'Complements the video’s emphasis on the adolescent brain being particularly susceptible to neurochemical disruption by exogenous cannabinoids.',
    url: 'https://onlinelibrary.wiley.com/doi/abs/10.1046/j.1360-0443.2000.9544912.x'
  },
  {
    id: 'murray-2004',
    authors: 'Murray et al.',
    year: 2004,
    fullTitle: 'Cannabis and psychosis',
    aim: 'To investigate the impact of modern high-potency cannabis strains ("Skunk", high THC / zero CBD) on the incidence of first-episode psychosis.',
    sampleAndMethod: 'Case-control epidemiological study in South London comparing 780 patients presenting with first-episode psychosis against 1,241 healthy community controls. Recorded cannabis strain type, frequency, and duration of use.',
    keyFindings: 'Daily use of high-potency "Skunk" (THC >15%, CBD ~0%) was associated with a 5-fold increase in the odds of developing psychosis (OR = 5.4). Murray estimated that 24% of all new cases of psychosis in South London were attributable to high-potency cannabis use.',
    strengths: [
      'Large, representative urban clinical sample from high-incidence psychiatric settings.',
      'Differentiated between low-potency traditional hash (which contained CBD) and high-potency Skunk (zero CBD).'
    ],
    criticisms: [
      'Retrospective self-reports of cannabis strain types may lack precision.',
      'Potential reverse causality: Individuals experiencing early prodromal symptoms of schizophrenia may use high-THC cannabis as a form of self-medication.'
    ],
    eduqasExamTip: 'Essential AO3 application point: Highlights that it is not just "cannabis" as a generic term, but the THC:CBD ratio that determines psychotogenic risk.',
    relevanceToVideo: 'Directly mirrors the video content explaining why high THC without CBD protection floods CB1 receptors and triggers hyper-dopaminergia.',
    url: 'https://www.cambridge.org/core/journals/european-psychiatry/article/cannabis-and-psychosis/4EBD1758D50D314C546543E4A2835FC4'
  },
  {
    id: 'stirling-2005',
    authors: 'Stirling et al.',
    year: 2005,
    fullTitle: 'Cannabis use prior to first onset psychosis predicts spared neurocognition at 10-year follow-up',
    aim: 'To compare long-term (10–12 year) clinical, behavioural, and neurocognitive outcomes in schizophrenia patients with vs. without a history of cannabis use prior to first-episode psychosis.',
    sampleAndMethod: 'Longitudinal 10–12 year follow-up study tracking 69 surviving schizophrenia/psychosis patients from the original Manchester first-episode cohort of 112 participants, assessing clinical, behavioural, and neurocognitive performance.',
    keyFindings: 'Non-cannabis users and prior cannabis users were largely indistinguishable on clinical measures at follow-up, EXCEPT that patients who used cannabis prior to first-episode onset evidenced a marked "sparing" of neurocognitive functions (better preserved cognitive performance).',
    strengths: [
      'Long-term prospective 10–12 year follow-up of a well-characterised first-episode cohort.',
      'Comprehensive neuropsychological test battery measuring multiple cognitive domains.'
    ],
    criticisms: [
      'Sample attrition over 10–12 years (69 of 100 surviving patients assessed at follow-up).',
      'Historical recording of a priori cannabis use at index admission.'
    ],
    eduqasExamTip: 'Use Stirling et al. (2005) in AO3 evaluation to show a subtle nuance: cannabis-induced psychosis may occur in individuals with lower intrinsic neurodevelopmental vulnerability, explaining why their neurocognition is "spared" relative to non-user controls.',
    relevanceToVideo: 'Highlights that THC can trigger psychotic symptoms even in individuals who lack the severe baseline cognitive deficits typical of genetic schizophrenia.',
    url: 'https://www.sciencedirect.com/science/article/abs/pii/S0920996404003986'
  },
  {
    id: 'mccleary-2006',
    authors: 'McCleery et al.',
    year: 2006,
    fullTitle: 'Substance misuse and cognitive functioning in early psychosis: A 2 year follow-up',
    aim: 'To examine the relationship between substance misuse and cognitive functioning in a first-episode psychosis sample across a 2-year follow-up following admission to a specialized early psychosis program.',
    sampleAndMethod: 'Prospective 2-year longitudinal study evaluating 183 first-episode psychosis patients at baseline, 147 at 1 year, and 116 at 2 years using the Case Manager Rating Scale (CMRS) for substance use and a comprehensive cognitive test battery.',
    keyFindings: 'Approximately 50% of subjects engaged in substance misuse at baseline. Patients with mild substance use or misuse demonstrated significantly BETTER baseline cognitive performance and maintained better performance at 2-year follow-up compared to non-substance users, providing no evidence that substance misuse negatively impacts cognitive functioning in early psychosis.',
    strengths: [
      'Prospective 2-year longitudinal follow-up in a well-defined first-episode psychosis cohort.',
      'Comprehensive neuropsychological testing battery combined with validated Case Manager Rating Scale for substance use.'
    ],
    criticisms: [
      'Participant attrition over 2 years (183 patients at baseline down to 116 at 2-year follow-up).',
      'Did not differentiate detailed neurochemical strain potencies (e.g. THC:CBD ratios) or polysubstance sub-categories.'
    ],
    eduqasExamTip: 'Use McCleery et al. (2006) alongside Stirling et al. (2005) in AO3 evaluation to challenge simplistic assumptions: first-episode psychosis patients with substance use history frequently demonstrate superior/spared baseline cognitive functioning compared to non-using schizophrenia controls.',
    relevanceToVideo: 'Complements findings that individuals who develop psychosis following cannabis exposure may represent a neurodevelopmentally distinct subgroup with better baseline cognitive reserve.',
    url: 'https://www.sciencedirect.com/science/article/abs/pii/S0920996406003100'
  },
  {
    id: 'arseneault-2002',
    authors: 'Arseneault et al.',
    year: 2002,
    fullTitle: 'Cannabis Use in Adolescence and Risk for Adult Psychosis: Longitudinal Evidence From the Dunedin Study',
    aim: 'To test whether adolescent cannabis use is a specific risk factor for adult schizophrenia, controlling for pre-existing psychotic symptoms.',
    sampleAndMethod: 'Prospective longitudinal study of 1,037 participants in the Dunedin cohort. Psychotic symptoms assessed at age 11 (prior to cannabis initiation), cannabis use assessed at ages 15 and 18, and psychiatric outcome assessed at age 26.',
    keyFindings: 'Adolescent cannabis use at age 15 conferred a 4.5-fold increased risk of adult schizophreniform disorder by age 26, even after controlling for psychotic symptoms present at age 11. Clear dose-response relationship identified.',
    strengths: [
      'Established baseline mental health at age 11 BEFORE any cannabis exposure, effectively ruling out pre-existing psychosis causing early drug use.',
      'Dose-response relationship strongly fulfills epidemiological criteria for causality.'
    ],
    criticisms: [
      'Sample drawn from a single geographic region (New Zealand cohort born 1972-73).',
      'Cannabis potency in the 1980s/1990s was much lower (~3-5% THC) than modern street Skunk (>20% THC), potentially UNDERESTIMATING current population risks.'
    ],
    eduqasExamTip: 'Top-tier AO3 study! Use Arseneault (2002) to refute the "Self-Medication" argument because controlling for age 11 psychotic symptoms STILL yielded a 4.5x risk increase.',
    relevanceToVideo: 'Provides key scientific backing for the video thesis that early adolescent THC exposure actively triggers biological pathways leading to psychosis.',
    url: 'https://www.bmj.com/content/325/7374/1212'
  }
];
