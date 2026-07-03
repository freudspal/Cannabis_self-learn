import { ReceptorLocation } from '../types';

export const RECEPTOR_LOCATIONS: ReceptorLocation[] = [
  {
    id: 'cb1-cortex',
    type: 'CB1',
    name: 'Cerebral Cortex (Frontal & Temporal)',
    region: 'Brain - Prefrontal & Association Cortex',
    primaryFunction: 'Higher cognition, decision making, abstract thinking, working memory, sensory integration.',
    schizophreniaRelevance: 'THC disrupts cortical oscillatory rhythms and white matter tract myelination (Ashtari 2009), contributing to cognitive deficits, executive dysfunction, and disorganized thought.',
    coordinates: { x: 42, y: 14 }
  },
  {
    id: 'cb1-vta-accumbens',
    type: 'CB1',
    name: 'Ventral Tegmental Area (VTA) & Nucleus Accumbens',
    region: 'Limbic System / Midbrain (Mesolimbic Pathway)',
    primaryFunction: 'Dopamine synthesis, reward prediction, salience processing, emotional arousal.',
    schizophreniaRelevance: 'CB1 receptors on GABAergic interneurons in VTA are suppressed by THC. This disinhibits dopamine neurons, leading to massive hyper-dopaminergia in Nucleus Accumbens, causing auditory hallucinations and persecutory delusions.',
    coordinates: { x: 48, y: 19 }
  },
  {
    id: 'cb1-hippocampus',
    type: 'CB1',
    name: 'Hippocampus',
    region: 'Limbic System - Temporal Lobe',
    primaryFunction: 'Consolidation of short-term memory into long-term memory, spatial navigation, contextual learning.',
    schizophreniaRelevance: 'Dense CB1 expression. THC impairs long-term potentiation (LTP), explaining memory deficits and context-inappropriate paranoia in schizophrenia patients.',
    coordinates: { x: 52, y: 20 }
  },
  {
    id: 'cb1-basal-ganglia',
    type: 'CB1',
    name: 'Basal Ganglia & Striatum',
    region: 'Subcortical Brain Structure',
    primaryFunction: 'Motor control, procedural learning, habit formation, routine execution.',
    schizophreniaRelevance: 'Striatal CB1 activation modulates dopamine release. High THC exposure disrupts motor coordination and contributes to catatonic or psychomotor agitation symptoms.',
    coordinates: { x: 45, y: 18 }
  },
  {
    id: 'cb1-cerebellum',
    type: 'CB1',
    name: 'Cerebellum',
    region: 'Hindbrain',
    primaryFunction: 'Fine motor balance, sensorimotor timing, cognitive processing speed.',
    schizophreniaRelevance: 'Highest CB1 receptor density in the brain. THC impairs temporal estimation ("time distortion") and sensorimotor gating (Prepulse Inhibition deficit).',
    coordinates: { x: 56, y: 23 }
  },
  {
    id: 'cb1-amygdala',
    type: 'CB1',
    name: 'Amygdala',
    region: 'Limbic System',
    primaryFunction: 'Emotional processing, fear conditioning, threat perception, paranoia response.',
    schizophreniaRelevance: 'THC over-stimulation triggers acute anxiety, panic, and persecutory delusional beliefs ("Everyone is watching me").',
    coordinates: { x: 50, y: 21 }
  },
  {
    id: 'cb2-immune-microglia',
    type: 'CB2',
    name: 'Brain Microglia & Neuro-immune System',
    region: 'Central Nervous System Glial Cells',
    primaryFunction: 'Microglial activation, neuro-inflammation response, cytokine regulation, tissue repair.',
    schizophreniaRelevance: 'CB2 agonists suppress microglial pro-inflammatory cytokines (IL-6, TNF-alpha) without causing psychoactive high, serving as a novel neuroprotective research target.',
    coordinates: { x: 40, y: 16 }
  },
  {
    id: 'cb2-spleen-lymph',
    type: 'CB2',
    name: 'Spleen & Lymphatic Nodes',
    region: 'Peripheral Immune System',
    primaryFunction: 'Leukocyte modulation, immune defense, anti-inflammatory antibody regulation.',
    schizophreniaRelevance: 'Demonstrates clear separation between CB1 (central nervous system psychoactive risk) and CB2 (peripheral immune anti-inflammatory).',
    coordinates: { x: 50, y: 52 }
  }
];
