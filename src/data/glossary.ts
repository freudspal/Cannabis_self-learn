import { GlossaryItem } from '../types';

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'thc',
    term: 'THC (Delta-9-Tetrahydrocannabinol)',
    category: 'Cannabinoid',
    definition: 'The primary psychoactive phytocannabinoid compound in cannabis. Acts as a partial agonist at CB1 and CB2 receptors.',
    roleInSchizophrenia: 'Binds to pre-synaptic CB1 receptors on GABA interneurons, suppressing GABA release. This disinhibits dopamine neurons, leading to excess dopamine in the mesolimbic pathway (hyper-dopaminergia) and triggering hallucinations and delusions.',
    pronunciation: 'TH-C (Tetra-hydro-can-na-bi-nol)',
    memoryHook: 'THC = Trigger Hallucinations & Confusion'
  },
  {
    id: 'cbd',
    term: 'CBD (Cannabidiol)',
    category: 'Cannabinoid',
    definition: 'A non-intoxicating phytocannabinoid compound found in cannabis. Functions as a negative allosteric modulator at CB1 receptors.',
    roleInSchizophrenia: 'Changes the shape of CB1 receptors so THC cannot bind as effectively. It also elevates natural anandamide levels by inhibiting the FAAH enzyme, exerting protective, anxiolytic, and antipsychotic effects.',
    pronunciation: 'C-B-D (Can-na-bi-di-ol)',
    memoryHook: 'CBD = Calms Brain & Defends against psychosis'
  },
  {
    id: 'dopamine',
    term: 'Dopamine (DA)',
    category: 'Neurotransmitter',
    definition: 'A catecholamine neurotransmitter involved in reward, motivation, motor control, and cognitive executive function.',
    roleInSchizophrenia: 'Dopamine Hypothesis: Hyper-dopaminergia in the mesolimbic pathway causes positive symptoms (hallucinations/delusions), while hypo-dopaminergia in the mesocortical pathway causes negative and cognitive symptoms.',
    pronunciation: 'Doh-pa-meen',
    memoryHook: 'Dopamine: Too much in Limbic = Hallucinations!'
  },
  {
    id: 'anandamide',
    term: 'Anandamide (AEA)',
    category: 'Neurotransmitter',
    definition: 'An endogenous cannabinoid ("bliss molecule") synthesized on demand from lipids. Acts as a retrograde messenger across synapses.',
    roleInSchizophrenia: 'Binds to CB1 receptors to regulate neurotransmitter release. Schizophrenia patients often display dysregulated endogenous anandamide levels.',
    pronunciation: 'Ah-nan-da-mide',
    memoryHook: 'Anandamide = "Bliss" Endocannabinoid'
  },
  {
    id: 'gaba',
    term: 'GABA (Gamma-Aminobutyric Acid)',
    category: 'Neurotransmitter',
    definition: 'The primary inhibitory neurotransmitter in the central nervous system. Acts as the brain’s "brakes".',
    roleInSchizophrenia: 'CB1 receptors are located on GABAergic interneurons. When THC overactivates CB1, it shuts off GABA release ("cuts the brakes"), allowing dopamine neurons to fire continuously.',
    pronunciation: 'Gah-bah',
    memoryHook: 'GABA = The Brain’s Brakes'
  },
  {
    id: 'glutamate',
    term: 'Glutamate',
    category: 'Neurotransmitter',
    definition: 'The primary excitatory neurotransmitter in the brain, essential for synaptic plasticity and learning.',
    roleInSchizophrenia: 'Glutamate Hypothesis: NMDA receptor hypofunction on cortical interneurons reduces GABA inhibition, further contributing to downstream dopamine dysregulation.',
    pronunciation: 'Gloo-tah-mate',
    memoryHook: 'Glutamate = Excitement & NMDA connection'
  },
  {
    id: 'cb1-receptor',
    term: 'CB1 Receptor',
    category: 'Cannabinoid',
    definition: 'G-protein coupled cannabinoid receptor abundant in the Central Nervous System (cortex, basal ganglia, hippocampus, VTA).',
    roleInSchizophrenia: 'Target for THC and anandamide. Over-activation during adolescence alters synaptic pruning, disrupts white matter development (Ashtari 2009), and triggers hyper-dopaminergia.',
    pronunciation: 'C-B-1 Receptor',
    memoryHook: 'CB1 = Central Brain 1'
  },
  {
    id: 'cb2-receptor',
    term: 'CB2 Receptor',
    category: 'Cannabinoid',
    definition: 'Cannabinoid receptor predominantly located in peripheral tissues, immune cells, spleen, and microglial cells in the brain.',
    roleInSchizophrenia: 'Involved in anti-inflammatory responses and neuroprotection without producing psychoactive or psychotogenic effects.',
    pronunciation: 'C-B-2 Receptor',
    memoryHook: 'CB2 = Body & Immunity 2'
  },
  {
    id: 'mesolimbic-pathway',
    term: 'Mesolimbic Pathway',
    category: 'Brain Region',
    definition: 'Dopaminergic pathway running from the Ventral Tegmental Area (VTA) to the Nucleus Accumbens and limbic system.',
    roleInSchizophrenia: 'Hyperactivity (excess dopamine release) in this pathway is directly responsible for POSITIVE symptoms like hallucinations, delusions, and persecutory paranoia.',
    pronunciation: 'Me-zo-lim-bik Pathway',
    memoryHook: 'Mesolimbic = Hallucinations & Delusions'
  },
  {
    id: 'mesocortical-pathway',
    term: 'Mesocortical Pathway',
    category: 'Brain Region',
    definition: 'Dopaminergic pathway running from the Ventral Tegmental Area (VTA) to the Prefrontal Cortex (PFC).',
    roleInSchizophrenia: 'Hypoactivity (dopamine deficit) in this pathway causes NEGATIVE symptoms (avolition, alogia, flattened affect) and cognitive executive dysfunction.',
    pronunciation: 'Me-zo-kor-ti-kal Pathway',
    memoryHook: 'Mesocortical = Executive Cortex & Negative symptoms'
  },
  {
    id: 'retrograde-signaling',
    term: 'Retrograde Signaling',
    category: 'Neurotransmitter',
    definition: 'Synaptic communication where chemical signals travel backward from the post-synaptic neuron to pre-synaptic CB1 receptors.',
    roleInSchizophrenia: 'Endocannabinoids (Anandamide) act retrogradely to tell the pre-synaptic terminal to slow down neurotransmitter release. THC mimics this but locks CB1 receptors open unnaturally.',
    pronunciation: 'Re-tro-grade',
    memoryHook: 'Retrograde = Backward Feedback Loop'
  },
  {
    id: 'diathesis-stress',
    term: 'Diathesis-Stress Model',
    category: 'Clinical Term',
    definition: 'Psychological model stating a vulnerability (diathesis) combined with an environmental stressor triggers a mental disorder.',
    roleInSchizophrenia: 'Genetic vulnerability (e.g. AKT1 C/C allele in Caspi 2005) + Environmental stressor (adolescent high-THC cannabis) = Schizophrenia onset.',
    pronunciation: 'Die-ath-e-sis Stress',
    memoryHook: 'Genetics (Diathesis) + Cannabis (Stress) = Psychosis'
  },
  {
    id: 'akt1-gene',
    term: 'AKT1 Gene',
    category: 'Methodology',
    definition: 'A gene coding for an enzyme involved in dopamine signaling cascades in the striatum and prefrontal cortex.',
    roleInSchizophrenia: 'Caspi et al. (2005) proved that individuals with the C/C genotype on the AKT1 gene have a 7x risk of psychosis if using adolescent cannabis.',
    pronunciation: 'A-K-T-1 Gene',
    memoryHook: 'AKT1 C/C = 7x Risk with Skunk'
  },
  {
    id: 'positive-symptoms',
    term: 'Positive Symptoms',
    category: 'Clinical Term',
    definition: 'Atypical behaviors or experiences added to normal functioning (e.g. hallucinations, delusions, disordered speech).',
    roleInSchizophrenia: 'Caused by mesolimbic hyper-dopaminergia, heavily exacerbated by high-THC cannabis exposure.',
    pronunciation: 'Poz-i-tive Symptoms',
    memoryHook: 'Added experiences (Voices, Delusions)'
  },
  {
    id: 'negative-symptoms',
    term: 'Negative Symptoms',
    category: 'Clinical Term',
    definition: 'Deficits or loss of normal functioning (e.g. avolition, alogia, emotional flattening, social withdrawal).',
    roleInSchizophrenia: 'Caused by mesocortical hypo-dopaminergia, made worse by chronic cannabis-induced amotivational syndrome and cognitive decline.',
    pronunciation: 'Neg-a-tive Symptoms',
    memoryHook: 'Loss of normal function (No motivation)'
  }
];
