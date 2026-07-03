import React, { useState } from 'react';
import { RECEPTOR_LOCATIONS } from '../data/receptors';
import { ReceptorLocation } from '../types';
import { Dna, Shield, AlertCircle, Info, Zap, CheckCircle2, Eye, Sparkles, Award, ChevronDown } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';
import nervousSystemImg from '../assets/images/nervous_system_1783065285581.jpg';

interface NervousSystemMapProps {
  onOpenGlossary?: () => void;
  onOpenStudies?: (studyId?: string) => void;
}

export const NervousSystemMap: React.FC<NervousSystemMapProps> = ({ onOpenGlossary, onOpenStudies }) => {
  // Toggle switches
  const [cb1Active, setCb1Active] = useState<boolean>(true);
  const [cb2Active, setCb2Active] = useState<boolean>(true);

  // Selected region for deeper breakdown
  const [selectedRegionId, setSelectedRegionId] = useState<string>('cb1-vta-accumbens');

  const selectedReceptor = RECEPTOR_LOCATIONS.find(r => r.id === selectedRegionId) || RECEPTOR_LOCATIONS[0];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/80 border border-emerald-800/50 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold mb-2">
              <Dna className="w-3.5 h-3.5" />
              The Endocannabinoid System (ECS) Anatomy
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Human Nervous System: CB1 <span className="text-amber-400">&</span> CB2 Receptor Map
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Use the switches on the diagram to highlight 
              <InfoTooltip 
                term="CB1 Receptors" 
                simpleExplanation="Central Nervous System receptors concentrated in the brain that control neurotransmitter release. Overstimulated by THC, triggering dopamine surges and psychosis."
                technicalTerm="Cannabinoid Type 1 Receptor"
                onOpenGlossary={onOpenGlossary}
              /> in <strong className="text-emerald-400">Green</strong> and 
              <InfoTooltip 
                term="CB2 Receptors" 
                simpleExplanation="Receptors primarily in microglial brain cells and immune tissue that regulate inflammation without causing psychoactive highs."
                technicalTerm="Cannabinoid Type 2 Receptor"
                onOpenGlossary={onOpenGlossary}
              /> in <strong className="text-amber-400">Yellow</strong>.
            </p>
          </div>

          {onOpenStudies && (
            <button
              onClick={() => onOpenStudies('murray-2004')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Research Support: Murray et al. (2004)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Picture Stage + Active Region Highlight Info directly under picture */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Picture Stage Container with Integrated Switches */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 relative overflow-hidden flex flex-col items-center shadow-xl">
            
            {/* Body / Brain Visual Stage */}
            <div className="relative w-full h-[460px] sm:h-[500px] bg-[#07090f] border-2 border-emerald-500/40 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)] group">
              
              {/* Full Body Human Nervous System Picture */}
              <img
                src={nervousSystemImg}
                alt="Anatomical Picture of Human Nervous System and Brain"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95 contrast-110"
              />

              {/* Dark vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* INTEGRATED FLOATING HIGHLIGHT SWITCHES IN UPPER LEFT CORNER (STACKED & REDUCED SIZE) */}
              <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-20">
                {/* CB1 Switch (Green) */}
                <button
                  onClick={() => setCb1Active(!cb1Active)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-mono font-bold backdrop-blur-md transition-all cursor-pointer shadow-md ${
                    cb1Active 
                      ? 'bg-emerald-500/90 text-black border border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                      : 'bg-slate-950/80 text-slate-400 border border-slate-700 hover:text-white'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${cb1Active ? 'bg-black animate-pulse' : 'bg-emerald-500'}`} />
                  <span>CB1 Receptors</span>
                </button>

                {/* CB2 Switch (Yellow) */}
                <button
                  onClick={() => setCb2Active(!cb2Active)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-mono font-bold backdrop-blur-md transition-all cursor-pointer shadow-md ${
                    cb2Active 
                      ? 'bg-amber-400/90 text-black border border-amber-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]' 
                      : 'bg-slate-950/80 text-slate-400 border border-slate-700 hover:text-white'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${cb2Active ? 'bg-black animate-pulse' : 'bg-amber-400'}`} />
                  <span>CB2 Receptors</span>
                </button>
              </div>

              {/* Highlight Overlay Zone 1: CB1 Brain & Spinal Cord (GREEN) - MOVED UP TO BRAIN */}
              {cb1Active && (
                <div className="absolute top-[3%] left-[30%] w-[40%] h-[32%] rounded-full border-2 border-emerald-400 bg-emerald-500/20 backdrop-blur-[1px] shadow-[0_0_30px_rgba(16,185,129,0.6)] animate-pulse pointer-events-none flex flex-col items-center justify-center">
                  <span className="bg-black/80 text-emerald-300 border border-emerald-500 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg">
                    CB1 Dense Area (CNS & Brain)
                  </span>
                </div>
              )}

              {/* Highlight Overlay Zone 2: CB2 Microglia & Immune System (YELLOW) */}
              {cb2Active && (
                <>
                  {/* Brain Microglia */}
                  <div className="absolute top-[18%] left-[36%] w-[28%] h-[18%] rounded-full border-2 border-amber-400 bg-amber-400/20 shadow-[0_0_25px_rgba(234,179,8,0.6)] pointer-events-none flex items-center justify-center">
                    <span className="bg-black/80 text-amber-300 border border-amber-500 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                      CB2 Microglia
                    </span>
                  </div>
                  {/* Spleen & Peripheral Lymphatics */}
                  <div className="absolute top-[48%] left-[38%] w-[24%] h-[16%] rounded-full border-2 border-amber-400 bg-amber-400/20 shadow-[0_0_25px_rgba(234,179,8,0.6)] pointer-events-none flex items-center justify-center">
                    <span className="bg-black/80 text-amber-300 border border-amber-500 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                      CB2 Immune Nodes
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ACTIVE REGION HIGHLIGHT INFO - RESTRUCTURED UNDER THE PICTURE */}
          <div className="bg-slate-900 border border-emerald-500/60 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
            
            {/* Header with Icon and Dropdown (Text Removed as Requested) */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>

              {/* DROPDOWN SELECTOR FOR INSPECTION ELEMENTS */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedRegionId}
                  onChange={(e) => setSelectedRegionId(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-slate-950 text-emerald-300 border border-emerald-500/40 rounded-xl px-3 py-1.5 pr-8 text-xs font-mono font-bold cursor-pointer focus:outline-none focus:border-emerald-400 hover:bg-slate-900 transition-all shadow-inner"
                >
                  {RECEPTOR_LOCATIONS.map((r) => {
                    const isCB1 = r.type === 'CB1';
                    if (isCB1 && !cb1Active) return null;
                    if (!isCB1 && !cb2Active) return null;

                    return (
                      <option key={r.id} value={r.id} className="bg-slate-950 text-white">
                        [{r.type}] {r.name}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Region Details Display Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3.5">
              
              {/* Title & Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
                <div className="flex items-center gap-2">
                  <Dna className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h4 className="text-sm font-bold text-white font-mono">
                    {selectedReceptor.name}
                  </h4>
                </div>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  selectedReceptor.type === 'CB1' 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                    : 'bg-amber-950 text-amber-300 border border-amber-700/60 shadow-[0_0_8px_rgba(234,179,8,0.2)]'
                }`}>
                  {selectedReceptor.type} Receptor Site
                </span>
              </div>

              {/* Block 1: Physiological Role */}
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Physiological Role
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {selectedReceptor.primaryFunction}
                </p>
              </div>

              {/* Block 2: Schizophrenia Mechanism */}
              <div className="bg-slate-900/90 p-3.5 rounded-lg border border-amber-500/30 space-y-1.5">
                <div className="text-[11px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  Schizophrenia Pathophysiology Mechanism
                </div>
                <p className="text-xs text-amber-100/90 leading-relaxed font-sans">
                  {selectedReceptor.schizophreniaRelevance}
                </p>
              </div>

              {/* Research Link Button */}
              {onOpenStudies && (
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => onOpenStudies(selectedReceptor.type === 'CB1' ? 'ashtari-2009' : 'murray-2004')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 shadow-md"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Primary Scientific Literature</span>
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Right Explanations Panel */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* CB1 Receptors Explanation Card (Green Theme) */}
          {cb1Active && (
            <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                  <h3 className="text-base font-display font-bold text-emerald-400 uppercase tracking-wide">
                    CB1 Receptors — Main Function & Schizophrenia Link
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  Central Nervous System
                </span>
              </div>

              {/* CB1 Main Function */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Main Physiological Function:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950 p-3 rounded-xl border border-slate-800">
                  CB1 receptors are densely expressed in the brain (Prefrontal Cortex, VTA, Hippocampus, Amygdala, Basal Ganglia, Cerebellum). Located presynaptically, they act as retrograde modulators that inhibit neurotransmitter release (GABA and Glutamate). They regulate executive decision making, mood, short-term memory consolidation, and motor coordination.
                </p>
              </div>

              {/* CB1 Schizophrenia Link */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                    Potential Cause of Schizophrenia Link:
                  </span>
                  {onOpenStudies && (
                    <button
                      onClick={() => onOpenStudies('caspi-2005')}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-[10px] font-mono font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                    >
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>Research Support: Caspi (2005)</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950 p-3 rounded-xl border border-slate-800">
                  High-potency THC acts as an agonist at CB1 receptors on <strong>GABAergic interneurons</strong> in the Ventral Tegmental Area (VTA). Over-activation of CB1 turns off GABA release (removing the brain's natural inhibitory brake). This <strong>disinhibits dopamine neurons</strong>, causing a massive surge of excess dopamine flooding into the Nucleus Accumbens and Limbic System. This hyper-dopaminergia directly causes <strong>positive schizophrenia symptoms</strong> (auditory hallucinations, persecutory delusions). Furthermore, CB1 over-stimulation in the Prefrontal Cortex and Hippocampus causes cognitive deficits and white-matter disruption.
                </p>
              </div>
            </div>
          )}

          {/* CB2 Receptors Explanation Card (Yellow Theme) */}
          {cb2Active && (
            <div className="bg-slate-900 border-2 border-amber-400/80 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(234,179,8,1)]" />
                  <h3 className="text-base font-display font-bold text-amber-400 uppercase tracking-wide">
                    CB2 Receptors — Main Function & Schizophrenia Link
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                  Immune & Microglial System
                </span>
              </div>

              {/* CB2 Main Function */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Main Physiological Function:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950 p-3 rounded-xl border border-slate-800">
                  CB2 receptors are primarily located on microglial cells (the resident immune cells of the brain) and peripheral lymphatic organs (spleen, tonsils, leukocytes). They regulate neuro-inflammatory cascades, cytokine production (IL-6, TNF-alpha), and tissue repair without producing mind-altering psychoactive highs.
                </p>
              </div>

              {/* CB2 Schizophrenia Link */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    Schizophrenia Neuro-protection & Therapeutic Research Link:
                  </span>
                  {onOpenStudies && (
                    <button
                      onClick={() => onOpenStudies('murray-2004')}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-[10px] font-mono font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                    >
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>Research Support</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950 p-3 rounded-xl border border-slate-800">
                  Unlike CB1, CB2 receptors do <strong>NOT</strong> induce intoxication or dopamine-driven psychosis. Neuro-inflammation and microglial hyper-activation contribute to gray-matter loss and synaptic pruning in schizophrenia. Selective CB2 activation (or non-intoxicating CBD) suppresses microglial pro-inflammatory cytokines, offering a promising <strong>neuroprotective therapeutic target</strong> to reduce neuro-developmental brain damage without triggering psychotic symptoms.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

