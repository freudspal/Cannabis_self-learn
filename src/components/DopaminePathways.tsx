import React, { useState } from 'react';
import { Brain, Flame, AlertTriangle, Shield, CheckCircle2, Info, ArrowRight, Zap, Navigation, Award } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';
import brainPathwaysImg from '../assets/images/sagittal_brain_map_1783068073611.jpg';

interface BrainHotspot {
  id: string;
  name: string;
  simpleExplanation: string;
  technicalTerm: string;
  top: string;
  left: string;
  color: string;
  pathway: 'Mesolimbic' | 'Mesocortical' | 'Limbic';
  impactWithThc: string;
}

interface DopaminePathwaysProps {
  onOpenGlossary?: () => void;
  onOpenStudies?: (studyId?: string) => void;
}

export const DopaminePathways: React.FC<DopaminePathwaysProps> = ({ onOpenGlossary, onOpenStudies }) => {
  const [cannabisDose, setCannabisDose] = useState<'none' | 'moderate' | 'heavy'>('none');
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('pfc');

  // Calculates dopamine activity percentage
  const mesolimbicLevel = cannabisDose === 'heavy' ? 280 : cannabisDose === 'moderate' ? 180 : 100;
  const mesocorticalLevel = cannabisDose === 'heavy' ? 45 : cannabisDose === 'moderate' ? 70 : 100;

  // Corrected anatomical coordinates for Left-Facing Sagittal Brain View:
  // Forehead/Anterior pole = Left side (PFC ~ 18% left, 25% top)
  // Midbrain VTA = Lower center midbrain (~ 52% left, 64% top)
  // NAcc = Ventral anterior striatum (~ 38% left, 48% top - anterior to VTA)
  // Amygdala = Temporal limbic lobe (~ 46% left, 56% top)
  const brainHotspots: BrainHotspot[] = [
    {
      id: 'pfc',
      name: 'Prefrontal Cortex (PFC)',
      simpleExplanation: 'Located directly behind the forehead (anterior frontal pole). Controls executive thinking, decision making, logic, and motivation.',
      technicalTerm: 'Prefrontal Cortex (Anterior Frontal Pole)',
      top: '25%',
      left: '18%',
      color: '#eab308',
      pathway: 'Mesocortical',
      impactWithThc: 'Long-term heavy THC causes HYPO-DOPAMINERGIA here: starves the PFC of dopamine, producing brain fog, loss of drive (avolition), and cognitive deficits.'
    },
    {
      id: 'vta',
      name: 'Ventral Tegmental Area (VTA)',
      simpleExplanation: 'The midbrain dopamine factory where dopamine neurons originate and branch into mesolimbic and mesocortical pathways.',
      technicalTerm: 'Ventral Tegmental Area (VTA Midbrain)',
      top: '64%',
      left: '52%',
      color: '#10b981',
      pathway: 'Mesolimbic',
      impactWithThc: 'THC binds to pre-synaptic CB1 receptors on GABA interneurons in VTA, turning off GABA brakes and causing uncontrolled dopamine discharge.'
    },
    {
      id: 'nacc',
      name: 'Nucleus Accumbens (NAcc)',
      simpleExplanation: 'The primary limbic reward center located in the ventral striatum (anterior to VTA). Over-stimulation here produces salience dysregulation (voices & paranoid delusions).',
      technicalTerm: 'Nucleus Accumbens & Ventral Striatum',
      top: '48%',
      left: '38%',
      color: '#38bdf8',
      pathway: 'Mesolimbic',
      impactWithThc: 'Massive HYPER-DOPAMINERGIC surges flood the NAcc under THC, driving positive schizophrenia symptoms.'
    },
    {
      id: 'amygdala',
      name: 'Limbic Amygdala & Hippocampus',
      simpleExplanation: 'Deep limbic structures governing fear, emotional threat detection, and memory consolidation.',
      technicalTerm: 'Limbic System & Amygdala Circuit',
      top: '56%',
      left: '46%',
      color: '#ef4444',
      pathway: 'Limbic',
      impactWithThc: 'High THC over-stimulates amygdala CB1 receptors, producing acute paranoia, panic, and persecutory ideas.'
    }
  ];

  const activeHotspot = brainHotspots.find(h => h.id === selectedHotspotId) || brainHotspots[0];

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/80 border border-emerald-800/50 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Mesolimbic <span className="text-amber-400">&</span> Mesocortical Brain Pathways
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Observe dynamic neurotransmitter flow routes across brain regions. Watch how cannabis triggers 
              <InfoTooltip 
                term="Hyper-dopaminergia" 
                simpleExplanation="Too much dopamine firing in the mesolimbic system, causing voices, visions, and paranoid delusions."
                technicalTerm="Mesolimbic Dopamine Excess"
                onOpenGlossary={onOpenGlossary}
              /> in the mesolimbic pathway while causing 
              <InfoTooltip 
                term="Hypo-dopaminergia" 
                simpleExplanation="Too little dopamine in the prefrontal cortex, causing brain fog, emotional flattening, and loss of drive."
                technicalTerm="Mesocortical Dopamine Deficit"
                onOpenGlossary={onOpenGlossary}
              /> in the prefrontal cortex.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Research Link Button */}
            {onOpenStudies && (
              <button
                onClick={() => onOpenStudies('ashtari-2009')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Research Support: Ashtari et al. (2009)</span>
              </button>
            )}

            {/* Dose Toggle */}
            <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setCannabisDose('none')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  cannabisDose === 'none' ? 'bg-emerald-500 text-black font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                0% Baseline
              </button>
              <button
                onClick={() => setCannabisDose('moderate')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  cannabisDose === 'moderate' ? 'bg-amber-500 text-black font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                + Mod THC
              </button>
              <button
                onClick={() => setCannabisDose('heavy')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  cannabisDose === 'heavy' ? 'bg-red-500 text-white font-black reggae-glow-red' : 'text-slate-400 hover:text-white'
                }`}
              >
                + Heavy Skunk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 border border-slate-800 rounded-2xl p-6">
        
        {/* Left Section: Anatomical Photo with Flow Routes */}
        <div className="lg:col-span-7 bg-[#080a0f] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden space-y-4">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
                Anatomical Brain Map & Interactive Regions:
              </span>
              <span className="text-slate-400">Human Sagittal Brain Cross-Section</span>
            </div>

            {/* Photo Container */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-black">
              <img
                src={brainPathwaysImg}
                alt="Anatomical Cross Section of Human Brain showing Dopamine Pathways"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover filter brightness-90 contrast-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* SVG Overlay for Animated Flow Routes & Directional Arrows */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                  </marker>
                  <marker id="arrowBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                  </marker>
                  <marker id="arrowGold" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#eab308" />
                  </marker>
                </defs>

                {/* 1. MESOLIMBIC ROUTE: VTA (52, 64) -> NAcc (38, 48) */}
                <path
                  id="mesolimbicPathPhoto"
                  d="M 52 64 Q 44 55, 38 48"
                  fill="none"
                  stroke={mesolimbicLevel > 150 ? '#ef4444' : '#38bdf8'}
                  strokeWidth={mesolimbicLevel > 200 ? '2.5' : mesolimbicLevel > 120 ? '1.8' : '1.2'}
                  markerEnd={mesolimbicLevel > 150 ? 'url(#arrowRed)' : 'url(#arrowBlue)'}
                  className="transition-all duration-500"
                />

                {/* Flowing Dopamine Particles along Mesolimbic Route */}
                <circle r={mesolimbicLevel > 200 ? '1.5' : '1.0'} fill={mesolimbicLevel > 150 ? '#fca5a5' : '#7dd3fc'}>
                  <animateMotion
                    path="M 52 64 Q 44 55, 38 48"
                    dur={mesolimbicLevel > 200 ? '0.6s' : mesolimbicLevel > 120 ? '1.0s' : '2.0s'}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r={mesolimbicLevel > 200 ? '1.5' : '1.0'} fill={mesolimbicLevel > 150 ? '#ef4444' : '#38bdf8'}>
                  <animateMotion
                    path="M 52 64 Q 44 55, 38 48"
                    dur={mesolimbicLevel > 200 ? '0.6s' : mesolimbicLevel > 120 ? '1.0s' : '2.0s'}
                    begin="0.3s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 2. MESOCORTICAL ROUTE: VTA (52, 64) -> Prefrontal Cortex (18, 25) */}
                <path
                  id="mesocorticalPathPhoto"
                  d="M 52 64 Q 32 42, 18 25"
                  fill="none"
                  stroke={mesocorticalLevel < 60 ? '#ef4444' : '#eab308'}
                  strokeWidth={mesocorticalLevel < 60 ? '0.8' : '1.5'}
                  strokeDasharray={mesocorticalLevel < 60 ? '1.5 1.5' : 'none'}
                  markerEnd="url(#arrowGold)"
                  className="transition-all duration-500"
                />

                {/* Flowing Dopamine Particles along Mesocortical Route */}
                {mesocorticalLevel >= 60 && (
                  <circle r="1.0" fill="#fde047">
                    <animateMotion
                      path="M 52 64 Q 32 42, 18 25"
                      dur={mesocorticalLevel < 60 ? '4s' : '1.8s'}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </svg>

              {/* Overlaid Location Pins (30% Smaller Flashing Dots) */}
              {brainHotspots.map((hs) => {
                const isSelected = selectedHotspotId === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setSelectedHotspotId(hs.id)}
                    style={{ top: hs.top, left: hs.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all cursor-pointer ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                    title={hs.name}
                  >
                    <div className="relative flex items-center justify-center">
                      <span 
                        className="absolute w-5 h-5 rounded-full opacity-75 animate-ping"
                        style={{ backgroundColor: hs.color }}
                      />
                      <div 
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-black font-extrabold text-[9px] shadow-lg border-2 border-white transition-all ${
                          isSelected ? 'ring-2 ring-amber-400' : ''
                        }`}
                        style={{ backgroundColor: hs.color }}
                      >
                        ●
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hotspot Info Panel */}
            <div className="bg-slate-900 border-2 border-amber-400/80 rounded-xl p-3.5 text-xs space-y-1.5 text-slate-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeHotspot.color }} />
                  Selected: {activeHotspot.name}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {activeHotspot.pathway} Circuit
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed font-sans text-xs">
                {activeHotspot.simpleExplanation}
              </p>
              <div className="pt-1 text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800 font-mono text-[10px]">
                <strong className="text-red-400">THC Impact on Signaling: </strong>
                {activeHotspot.impactWithThc}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="w-full flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs font-mono">
            <div>Current Cannabis Dose: <span className="font-extrabold text-emerald-400">{cannabisDose.toUpperCase()}</span></div>
            <div className="flex items-center gap-3">
              <span className="text-sky-400 font-bold">Mesolimbic: {mesolimbicLevel}%</span>
              <span className="text-amber-400 font-bold">Mesocortical: {mesocorticalLevel}%</span>
            </div>
          </div>
        </div>

        {/* Right Details & Symptom Breakdown */}
        <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
          
          {/* Mesolimbic Pathway Card */}
          <div className={`p-4 rounded-xl border transition-all ${
            mesolimbicLevel > 150 ? 'bg-red-950/40 border-red-500/60 reggae-glow-red' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-sky-400 flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-400" />
                1. Mesolimbic Pathway (VTA → NAcc & Amygdala)
              </h3>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                mesolimbicLevel > 150 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-sky-950 text-sky-400'
              }`}>
                Dopamine: {mesolimbicLevel}%
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              <strong>THC Impact:</strong> Over-activates VTA CB1 receptors, shutting down GABA braking interneurons. Uncontrolled dopamine floods the Nucleus Accumbens & Amygdala.
            </p>

            <div className="mt-3 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <span className="text-red-400 font-bold block mb-1">Resulting POSITIVE Symptoms:</span>
              <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5 font-mono">
                <li>Auditory & Visual Hallucinations ("Hearing voices")</li>
                <li>Persecutory Delusions ("People are spying on me")</li>
                <li>Paranoia & Salience Dysregulation</li>
              </ul>
            </div>
          </div>

          {/* Mesocortical Pathway Card */}
          <div className={`p-4 rounded-xl border transition-all ${
            mesocorticalLevel < 60 ? 'bg-amber-950/40 border-amber-500/60 reggae-glow-gold' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-amber-400 flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-400" />
                2. Mesocortical Pathway (VTA → Prefrontal Cortex)
              </h3>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                mesocorticalLevel < 60 ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400'
              }`}>
                Dopamine: {mesocorticalLevel}%
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              <strong>THC Impact:</strong> Chronic adolescent THC use impairs white matter tracts (Ashtari 2009) and causes dopamine receptor down-regulation in the Prefrontal Cortex.
            </p>

            <div className="mt-3 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <span className="text-amber-400 font-bold block mb-1">Resulting NEGATIVE & COGNITIVE Symptoms:</span>
              <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5 font-mono">
                <li>Avolition (Loss of motivation / goal-directed drive)</li>
                <li>Alogia (Poverty of speech) & Emotional Flattening</li>
                <li>Executive Function & Working Memory Deficits</li>
              </ul>
            </div>
          </div>

          {/* Key Formula Footer */}
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-200">
            <strong>Key Memory Rule:</strong> Hyper-dopaminergia in Mesolimbic = Positive Symptoms; Hypo-dopaminergia in Mesocortical (Prefrontal Cortex) = Negative Symptoms.
          </div>
        </div>
      </div>
    </div>
  );
};
