import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Shield, Flame, AlertCircle, Info, Sparkles, Check, Activity, Zap, Award } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'dopamine' | 'gaba' | 'thc' | 'cbd';
  size: number;
  life?: number;
  maxLife?: number;
  boundTo?: 'cb1' | 'gaba_rec' | 'dopamine_rec' | null;
}

interface InteractiveSynapseProps {
  onOpenGlossary?: () => void;
  onOpenStudies?: (studyId?: string) => void;
}

export const InteractiveSynapse: React.FC<InteractiveSynapseProps> = ({ onOpenGlossary, onOpenStudies }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Synapse Modes
  const [thcLevel, setThcLevel] = useState<'none' | 'low' | 'moderate' | 'heavy'>('none');
  const [cbdBuffered, setCbdBuffered] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  // Stats Counters
  const [dopamineRate, setDopamineRate] = useState<number>(100); // 100% baseline
  const [gabaInhibition, setGabaInhibition] = useState<number>(100); // 100% baseline
  const [boundDopamineCount, setBoundDopamineCount] = useState<number>(0);

  // Update rates when THC level or CBD buffer changes
  useEffect(() => {
    let daRate = 100;
    let gabaRate = 100;

    if (thcLevel === 'low') {
      gabaRate = 50;
      daRate = 160;
    } else if (thcLevel === 'moderate') {
      gabaRate = 20;
      daRate = 240;
    } else if (thcLevel === 'heavy') {
      gabaRate = 5; // Almost completely shut down
      daRate = 380; // Severe Dopamine Flood!
    }

    if (cbdBuffered && thcLevel !== 'none') {
      gabaRate = Math.min(100, gabaRate + 45);
      daRate = Math.max(110, daRate - 150);
    }

    setDopamineRate(daRate);
    setGabaInhibition(gabaRate);
  }, [thcLevel, cbdBuffered]);

  // Canvas Animation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let particleIdCounter = 0;
    let frameCount = 0;
    let activeDopamineDocked = 0;

    const width = canvas.width;
    const height = canvas.height;

    // 3-Neuron Coordinates
    // GABA Neuron (Top-Left)
    const gabaCenter = { x: 120, y: 90 };
    const cb1Pos = { x: 190, y: 140 };

    // Dopamine Neuron (Top-Right)
    const daCenter = { x: 520, y: 90 };
    const gabaRecPos = { x: 420, y: 120 };

    // Post-Synaptic Neuron (Bottom)
    const postY = 320;
    const postReceptors = [
      { x: 120, y: postY, bound: false },
      { x: 220, y: postY, bound: false },
      { x: 320, y: postY, bound: false },
      { x: 420, y: postY, bound: false },
      { x: 520, y: postY, bound: false }
    ];

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // --- BACKGROUND & CLEFT SPACE ---
      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, width, height);

      // --- 1. GABA INTERNEURON (Top-Left, Purple Tint) ---
      ctx.save();
      ctx.fillStyle = 'rgba(88, 28, 135, 0.35)';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(240, 0);
      ctx.quadraticCurveTo(230, 100, 190, 140);
      ctx.quadraticCurveTo(140, 175, 0, 180);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Label GABA Neuron
      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 11px "Space Grotesk", sans-serif';
      ctx.fillText('1. GABA INTERNEURON', 15, 25);
      ctx.fillStyle = '#e9d5ff';
      ctx.font = '9px monospace';
      ctx.fillText('(Inhibitory Braking Control)', 15, 38);

      // GABA Vesicles (Purple/Cyan circles)
      const gabaVesicles = [
        { x: 70, y: 70 },
        { x: 130, y: 60 },
        { x: 90, y: 120 }
      ];
      gabaVesicles.forEach(v => {
        ctx.fillStyle = 'rgba(192, 132, 252, 0.25)';
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(v.x, v.y, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner GABA triangles
        ctx.fillStyle = '#22d3ee';
        ctx.beginPath();
        ctx.arc(v.x - 4, v.y - 2, 3, 0, Math.PI * 2);
        ctx.arc(v.x + 5, v.y + 3, 3, 0, Math.PI * 2);
        ctx.arc(v.x, v.y - 6, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // CB1 Receptor on GABA Membrane
      const cb1Locked = thcLevel !== 'none';
      ctx.fillStyle = cb1Locked ? (cbdBuffered ? '#f59e0b' : '#ef4444') : '#10b981';
      ctx.beginPath();
      ctx.arc(cb1Pos.x, cb1Pos.y, 11, Math.PI * 0.7, Math.PI * 2.2);
      ctx.lineTo(cb1Pos.x - 6, cb1Pos.y + 6);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // CB1 Receptor Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px font-mono';
      ctx.fillText(cb1Locked ? (cbdBuffered ? 'CB1+CBD' : 'CB1 (THC LOCKED)') : 'CB1 Receptor', cb1Pos.x - 35, cb1Pos.y + 22);
      ctx.restore();

      // --- 2. DOPAMINE PRE-SYNAPTIC NEURON (Top-Right, Pink Tint) ---
      ctx.save();
      ctx.fillStyle = 'rgba(157, 23, 77, 0.35)';
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width, 0);
      ctx.lineTo(400, 0);
      ctx.quadraticCurveTo(410, 90, 430, 130);
      ctx.quadraticCurveTo(480, 180, width, 190);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Label Dopamine Neuron
      ctx.fillStyle = '#f472b6';
      ctx.font = 'bold 11px "Space Grotesk", sans-serif';
      ctx.fillText('2. DOPAMINE NEURON (VTA)', 435, 25);
      ctx.fillStyle = '#fbcfe8';
      ctx.font = '9px monospace';
      ctx.fillText('(Reward / Salience Output)', 435, 38);

      // Dopamine Vesicles (Yellow/Pink circles)
      const daVesicles = [
        { x: 500, y: 70 },
        { x: 570, y: 80 },
        { x: 530, y: 130 }
      ];
      daVesicles.forEach(v => {
        ctx.fillStyle = 'rgba(251, 207, 232, 0.25)';
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(v.x, v.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner Dopamine yellow spheres
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(v.x - 6, v.y - 4, 4, 0, Math.PI * 2);
        ctx.arc(v.x + 6, v.y + 4, 4, 0, Math.PI * 2);
        ctx.arc(v.x, v.y - 8, 4, 0, Math.PI * 2);
        ctx.arc(v.x + 2, v.y + 6, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // GABA Receptor on Dopamine Membrane (Receives GABA brake signal)
      const receivingGabaBrake = gabaInhibition > 40;
      ctx.fillStyle = receivingGabaBrake ? '#10b981' : '#64748b';
      ctx.beginPath();
      ctx.rect(gabaRecPos.x - 10, gabaRecPos.y - 10, 20, 20);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = receivingGabaBrake ? '#6ee7b7' : '#94a3b8';
      ctx.font = 'bold 9px font-mono';
      ctx.fillText(receivingGabaBrake ? 'GABA Receptor (BRAKE ON)' : 'GABA Rec (BRAKE OFF!)', gabaRecPos.x - 45, gabaRecPos.y - 14);
      ctx.restore();

      // --- 3. POST-SYNAPTIC NEURON (Bottom, Cyan/Blue Tint) ---
      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width, height);
      ctx.lineTo(width, postY);
      ctx.quadraticCurveTo(width / 2, postY - 25, 0, postY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px "Space Grotesk", sans-serif';
      ctx.fillText('3. POST-SYNAPTIC NEURON (Nucleus Accumbens / PFC)', 20, height - 20);

      // Render Post-Synaptic Dopamine Receptors (Cup Receptors)
      activeDopamineDocked = 0;
      postReceptors.forEach((rec, idx) => {
        const isDocked = particles.some(p => p.type === 'dopamine' && p.boundTo === 'dopamine_rec' && Math.abs(p.x - rec.x) < 20);
        if (isDocked) activeDopamineDocked++;

        ctx.fillStyle = isDocked ? '#f59e0b' : '#0284c7';
        ctx.beginPath();
        ctx.arc(rec.x, rec.y - 2, 12, 0, Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = isDocked ? '#fef08a' : '#bae6fd';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (isDocked) {
          // Glow effect on active receptor
          ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
          ctx.beginPath();
          ctx.arc(rec.x, rec.y - 2, 22, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = '#bae6fd';
        ctx.font = '9px monospace';
        ctx.fillText(`D2 Rec ${idx + 1}`, rec.x - 18, rec.y + 16);
      });
      ctx.restore();

      // --- CLEFT TEXT LABEL ---
      ctx.fillStyle = '#475569';
      ctx.font = '10px monospace';
      ctx.fillText('SYNAPTIC CLEFT (20nm Fluid Gap)', width / 2 - 80, 220);

      // --- PARTICLE GENERATION & SIMULATION ---
      if (isAnimating) {
        // A. Generate GABA particles from GABA neuron (if not shut down by THC)
        const gabaSpawnChance = (gabaInhibition / 100) * 0.15;
        if (Math.random() < gabaSpawnChance) {
          particles.push({
            id: particleIdCounter++,
            x: 140 + (Math.random() - 0.5) * 40,
            y: 130 + (Math.random() - 0.5) * 20,
            vx: 1.2 + Math.random() * 1.5,
            vy: -0.2 + (Math.random() - 0.5) * 0.8,
            type: 'gaba',
            size: 4
          });
        }

        // B. Generate Dopamine particles from Dopamine neuron
        // Rate is inversely proportional to GABA brake!
        const daSpawnInterval = Math.max(2, Math.floor(30 / (dopamineRate / 100)));
        if (frameCount % daSpawnInterval === 0) {
          particles.push({
            id: particleIdCounter++,
            x: 480 + (Math.random() - 0.5) * 60,
            y: 140 + (Math.random() - 0.5) * 20,
            vx: -0.8 + (Math.random() - 0.5) * 1.5,
            vy: 1.5 + Math.random() * 2.5,
            type: 'dopamine',
            size: 5
          });
        }

        // C. Generate THC particles if THC level > 'none'
        const thcSpawnProb = thcLevel === 'heavy' ? 0.35 : thcLevel === 'moderate' ? 0.20 : thcLevel === 'low' ? 0.08 : 0;
        if (Math.random() < thcSpawnProb) {
          particles.push({
            id: particleIdCounter++,
            x: 200 + Math.random() * 100,
            y: 10 + Math.random() * 20,
            vx: -0.8 + (Math.random() - 0.5) * 1.2,
            vy: 1.2 + Math.random() * 1.2,
            type: 'thc',
            size: 6
          });
        }

        // D. Generate CBD particles if CBD buffered
        if (cbdBuffered && Math.random() < 0.15) {
          particles.push({
            id: particleIdCounter++,
            x: 150 + Math.random() * 100,
            y: 10 + Math.random() * 20,
            vx: (Math.random() - 0.5) * 1.5,
            vy: 1.0 + Math.random() * 1.0,
            type: 'cbd',
            size: 6
          });
        }
      }

      // --- RENDER & MOVE PARTICLES ---
      particles.forEach(p => {
        if (isAnimating) {
          p.x += p.vx;
          p.y += p.vy;

          // GABA particles seek GABA receptor on Dopamine neuron
          if (p.type === 'gaba') {
            const dx = gabaRecPos.x - p.x;
            const dy = gabaRecPos.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 15) {
              p.boundTo = 'gaba_rec';
              p.vx = 0;
              p.vy = 0;
            }
          }

          // THC particles seek CB1 receptor on GABA neuron
          if (p.type === 'thc') {
            const dx = cb1Pos.x - p.x;
            const dy = cb1Pos.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 18) {
              p.boundTo = 'cb1';
              p.vx = 0;
              p.vy = 0;
            }
          }

          // Dopamine particles float down to post-synaptic receptors
          if (p.type === 'dopamine') {
            if (p.y >= postY - 12) {
              p.y = postY - 12;
              p.vy = 0;
              p.vx *= 0.5;
              p.boundTo = 'dopamine_rec';
            }
          }
        }

        // DRAW PARTICLES
        if (p.type === 'gaba') {
          // Cyan GABA triangles
          ctx.fillStyle = '#22d3ee';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'thc') {
          // Glowing Red/Purple THC Keys
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size + 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#fca5a5';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.type === 'dopamine') {
          // Bright Yellow Dopamine Spheres
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#eab308';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.type === 'cbd') {
          // Gold CBD Shields
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        }
      });

      // Filter out off-screen particles or old bound particles
      particles = particles.filter(p => p.x > -20 && p.x < width + 20 && p.y > -20 && p.y < height + 20);

      setBoundDopamineCount(activeDopamineDocked);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [thcLevel, cbdBuffered, isAnimating, dopamineRate, gabaInhibition]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/80 border border-emerald-800/50 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Interactive Synaptic Disinhibition Mechanism
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Observe the live 3-neuron particle engine to visualize how 
              <InfoTooltip 
                term="THC" 
                simpleExplanation="The psychoactive chemical in cannabis that mimics natural brain signals but overstimulates receptors."
                technicalTerm="CB1 Receptor Agonist"
                onOpenGlossary={onOpenGlossary}
              /> shuts off pre-synaptic 
              <InfoTooltip 
                term="GABA Brakes" 
                simpleExplanation="Inhibitory brain chemical signals that keep dopamine from over-firing."
                technicalTerm="GABAergic Inhibitory Interneurons"
                onOpenGlossary={onOpenGlossary}
              />, resulting in an uncontrolled <strong>dopamine flood</strong> in the synaptic cleft.
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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Visual Area */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4 relative overflow-hidden">
          
          {/* Particle Canvas Simulation Mode */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span>
                <span className="text-slate-300">GABA (Inhibitory Brake)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
                <span className="text-slate-300">Dopamine (DA)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="text-slate-300">THC (CB1 Agonist)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-amber-400 inline-block"></span>
                <span className="text-slate-300">CBD Buffer</span>
              </div>
              <div className="flex items-center justify-end gap-2 ml-auto">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-bold"
                >
                  {isAnimating ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={() => { setThcLevel('none'); setCbdBuffered(false); }}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Canvas Container */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#080c14]">
              <canvas
                ref={canvasRef}
                width={640}
                height={400}
                className="w-full h-[360px] sm:h-[400px] object-contain cursor-crosshair"
              />
            </div>

            {/* Gauges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">GABA Brakes</span>
                  <span className={`font-bold ${gabaInhibition < 40 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                    {gabaInhibition}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className={`h-full transition-all duration-500 rounded-full ${gabaInhibition < 40 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${gabaInhibition}%` }} />
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Dopamine Flood Rate</span>
                  <span className={`font-bold ${dopamineRate > 200 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                    {dopamineRate}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className={`h-full transition-all duration-500 rounded-full ${dopamineRate > 200 ? 'bg-red-500' : 'bg-sky-400'}`} style={{ width: `${Math.min(100, (dopamineRate / 380) * 100)}%` }} />
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Docked D2 Receptors</span>
                  <span className={`font-bold ${boundDopamineCount >= 3 ? 'text-amber-400 animate-pulse' : 'text-sky-400'}`}>
                    {boundDopamineCount} / 5
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-amber-400 transition-all duration-300 rounded-full" style={{ width: `${(boundDopamineCount / 5) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side Control Panel */}
        <div className="lg:col-span-4 space-y-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-display font-bold text-white border-b border-slate-800 pb-2">
            Neurochemical Manipulations
          </h3>

          {/* THC Exposure Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              1. Add Cannabis (THC Dose):
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'none', label: '0% Baseline', risk: 'Normal GABA Brake' },
                { id: 'low', label: 'Low THC', risk: '50% GABA Brake' },
                { id: 'moderate', label: 'Moderate THC', risk: '20% GABA Brake' },
                { id: 'heavy', label: 'Heavy Skunk THC', risk: '5% Brake (FLOOD!)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setThcLevel(item.id as any)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    thcLevel === item.id
                      ? 'bg-red-950/80 border-red-500 text-white font-bold reggae-glow-red'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{item.label}</span>
                    {thcLevel === item.id && <Flame className="w-3.5 h-3.5 text-red-400" />}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.risk}</div>
                </button>
              ))}
            </div>
          </div>

          {/* CBD Protective Buffer Toggle */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
              2. Add CBD Neuroprotective Buffer:
            </label>
            <button
              onClick={() => setCbdBuffered(!cbdBuffered)}
              className={`w-full p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                cbdBuffered
                  ? 'bg-amber-950/80 border-amber-400 text-amber-200 reggae-glow-gold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>{cbdBuffered ? 'CBD Buffer Active (Allosteric Block)' : 'Enable CBD Buffer'}</span>
              </div>
              {cbdBuffered && <Check className="w-4 h-4 text-amber-400" />}
            </button>
          </div>

          {/* Mechanism Callout Box */}
          <div className="bg-slate-950 rounded-xl p-4 border border-emerald-900/60 text-xs space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              The 3-Neuron Disinhibition Circuit:
            </div>
            <p className="text-slate-300 leading-relaxed">
              1. <strong>GABA Interneuron</strong> (top left) continuously releases GABA to inhibit the <strong>Dopamine Neuron</strong> (top right).
            </p>
            <p className="text-slate-300 leading-relaxed">
              2. When <strong>THC</strong> binds to CB1 receptors on the GABA interneuron, it shuts off GABA release.
            </p>
            <p className="text-slate-300 leading-relaxed font-mono text-[11px] text-amber-300">
              3. Without the GABA brake, the Dopamine neuron dumps a massive flood of dopamine into the synaptic cleft, over-activating post-synaptic receptors at the bottom!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

