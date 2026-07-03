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
    relevanceToVideo: 'Directly illustrates why some cannabis users develop hallucinations while others do not—showing how THC interacts with prefrontal COMT dopamine degradation enzymes.'
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
    relevanceToVideo: 'Provides empirical support for how daily high-THC cannabis interacts with the AKT1 gene to disinhibit striatal dopamine signaling.'
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
    relevanceToVideo: 'Supplements video coverage on how adolescent brain development is disrupted by THC, altering brain architecture before full maturation.'
  },
  {
    id: 'mcgee-2000',
    authors: 'McGee et al.',
    year: 2000,
    fullTitle: 'Longitudinal Association Between Adolescent Cannabis Use and Mental Health Outcomes in Young Adulthood',
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
    relevanceToVideo: 'Complements the video’s emphasis on the adolescent brain being particularly susceptible to neurochemical disruption by exogenous cannabinoids.'
  },
  {
    id: 'murray-2004',
    authors: 'Murray et al.',
    year: 2004,
    fullTitle: 'Cannabis, Psychosis and High-Potency "Skunk": The South London First-Episode Psychosis Cohort Studies',
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
    relevanceToVideo: 'Directly mirrors the video content explaining why high THC without CBD protection floods CB1 receptors and triggers hyper-dopaminergia.'
  },
  {
    id: 'stirling-2005',
    authors: 'Stirling et al.',
    year: 2005,
    fullTitle: 'Neuropsychological Deficits in First-Episode Schizophrenia Patients With and Without Cannabis Use',
    aim: 'To compare the cognitive profile and executive function performance of schizophrenia patients with a history of cannabis misuse against non-cannabis using schizophrenia controls.',
    sampleAndMethod: 'Neuropsychological assessment battery (Stroop test, Wisconsin Card Sorting Test, verbal fluency) administered to 19 first-episode schizophrenia patients with cannabis misuse history vs 20 non-using schizophrenia patients.',
    keyFindings: 'Schizophrenia patients with cannabis misuse exhibited earlier age of illness onset (on average 4–5 years earlier) and significantly greater executive function deficits, working memory impairments, and processing speed slowness.',
    strengths: [
      'Detailed neuropsychological test battery measuring specific prefrontal cortex cognitive domains.',
      'Matched patient controls on psychiatric medication dosage.'
    ],
    criticisms: [
      'Small clinical sample size (39 participants total).',
      'Cross-sectional design: Unable to definitively determine if cognitive deficits predated cannabis initiation.'
    ],
    eduqasExamTip: 'Use in AO3 to demonstrate that cannabis worsens the long-term prognosis, cognitive decline, and negative/cognitive symptoms in schizophrenia.',
    relevanceToVideo: 'Shows how prefrontal cortex impairment (mesocortical hypo-dopaminergia) manifests practically as cognitive deficits in patients.'
  },
  {
    id: 'mccleary-2006',
    authors: 'McCleary et al.',
    year: 2006,
    fullTitle: 'Impact of Substance Misuse on Relapse and Psychiatric Hospital Re-admission Rates in Schizophrenia',
    aim: 'To examine how continued cannabis use post-diagnosis influences medication compliance, relapse frequency, and psychiatric re-admission.',
    sampleAndMethod: 'Follow-up clinical study tracking 112 patients diagnosed with schizophrenia over a 24-month post-discharge period, monitoring urine toxicology, antipsychotic compliance, and hospital admission logs.',
    keyFindings: 'Patients who continued using cannabis had double the relapse rate and significantly higher psychiatric re-admission rates compared to abstinent patients. Cannabis users were also significantly less compliant with their prescribed antipsychotic medication.',
    strengths: [
      'Objective urine toxicology screening corroborated self-reported cannabis use.',
      'Real-world clinical utility for psychiatric management and relapse prevention.'
    ],
    criticisms: [
      'Confounding factor of antipsychotic side-effects (e.g. extrapyramidal symptoms or sedation) which may drive patients to smoke cannabis for relief.',
      'Did not control for social support networks and living conditions.'
    ],
    eduqasExamTip: 'Excellent for evaluative discussion on Schizophrenia Management and Prognosis: Cannabis interferes with D2-receptor antagonist antipsychotics, exacerbating positive symptoms.',
    relevanceToVideo: 'Illustrates how ongoing THC exposure counteracts prescribed antipsychotic medications that try to block dopamine D2 receptors.'
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
    relevanceToVideo: 'Provides key scientific backing for the video thesis that early adolescent THC exposure actively triggers biological pathways leading to psychosis.'
  }
];
