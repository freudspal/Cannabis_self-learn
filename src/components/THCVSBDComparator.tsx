import React, { useState, useEffect } from 'react';
import { STRAINS_DATA, INGESTION_METHODS } from '../data/strains';
import { StrainProduct, IngestionMethod } from '../types';
import { Shield, Flame, Info, CheckCircle, Zap, Sparkles, Ban, Award } from 'lucide-react';

interface THCVSBDComparatorProps {
  onOpenGlossary?: () => void;
  onOpenStudies?: (studyId?: string) => void;
}

export const THCVSBDComparator: React.FC<THCVSBDComparatorProps> = ({ onOpenStudies }) => {
  // Method selection #1 first
  const [selectedMethod, setSelectedMethod] = useState<IngestionMethod>(INGESTION_METHODS[0]);
  
  // Product selection #2 second
  const [selectedStrain, setSelectedStrain] = useState<StrainProduct>(STRAINS_DATA[0]);

  // Custom sliders
  const [customThc, setCustomThc] = useState<number>(STRAINS_DATA[0].thcPercent);
  const [customCbd, setCustomCbd] = useState<number>(STRAINS_DATA[0].cbdPercent);

  // When selectedMethod changes, ensure selectedStrain is compatible
  const handleSelectMethod = (method: IngestionMethod) => {
    setSelectedMethod(method);
    const isCurrentStrainCompatible = method.compatibleProducts.includes(selectedStrain.id);
    if (!isCurrentStrainCompatible) {
      // Auto switch to first compatible strain
      const compatibleStrain = STRAINS_DATA.find((s) => method.compatibleProducts.includes(s.id)) || STRAINS_DATA[0];
      setSelectedStrain(compatibleStrain);
      setCustomThc(compatibleStrain.thcPercent);
      setCustomCbd(compatibleStrain.cbdPercent);
    }
  };

  // When strain changes, update custom THC/CBD sliders within bounds
  const handleSelectStrain = (strain: StrainProduct) => {
    setSelectedStrain(strain);
    setCustomThc(strain.thcPercent);
    setCustomCbd(strain.cbdPercent);

    // If strain is incompatible with current method, auto switch method to first compatible one
    if (!strain.compatibleMethods.includes(selectedMethod.id)) {
      const compatibleMethod = INGESTION_METHODS.find((m) => strain.compatibleMethods.includes(m.id)) || INGESTION_METHODS[0];
      setSelectedMethod(compatibleMethod);
    }
  };

  // Keep slider values clamped within strain achievable bounds
  useEffect(() => {
    const [minThc, maxThc] = selectedStrain.thcMinMax;
    const [minCbd, maxCbd] = selectedStrain.cbdMinMax;

    if (customThc < minThc) setCustomThc(minThc);
    if (customThc > maxThc) setCustomThc(maxThc);
    if (customCbd < minCbd) setCustomCbd(minCbd);
    if (customCbd > maxCbd) setCustomCbd(maxCbd);
  }, [selectedStrain]);

  // Calculations
  const thcRatio = customThc / Math.max(0.1, customCbd);
  const effectiveThc = customThc * selectedMethod.potencyMultiplier;
  const cbdProtectionFactor = Math.min(10, customCbd * 0.8);
  
  // Risk of Developing Psychosis calculation relative to baseline non-use (1.0x)
  const relativeRiskRatio = Math.min(10.0, Math.max(1.0, 1.0 + (effectiveThc * 0.11) - (cbdProtectionFactor * 0.18)));

  // Percentages for vertical bars (0-100%)
  const effectiveThcBarPercent = Math.min(100, Math.max(5, (effectiveThc / 90) * 100));
  const cbdProtectionBarPercent = Math.min(100, Math.max(5, (customCbd / 30) * 100));
  const riskScoreBarPercent = Math.min(100, Math.max(5, (relativeRiskRatio / 10) * 100));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/80 to-slate-900 border border-emerald-800/50 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              THC vs CBD Strain <span className="text-amber-400">&</span> Product Comparator
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Compare <strong className="text-emerald-400">Delta-9-THC</strong> (psychotogenic CB1 agonist) and <strong className="text-amber-400">CBD</strong> (neuroprotective allosteric modulator) across ingestion methods, product forms, and potency levels.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3 text-xs space-y-1.5 min-w-[230px]">
            <div className="text-slate-400 font-mono font-bold uppercase tracking-wider text-[11px]">Key Exam Rule:</div>
            <div className="text-emerald-300 font-bold">High THC + Low CBD = Max Psychosis Risk</div>
            <div className="text-amber-300 font-bold">High CBD = Buffers CB1 Receptors</div>
            {onOpenStudies && (
              <button
                onClick={() => onOpenStudies('murray-2004')}
                className="mt-1 w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-[11px] font-mono font-bold transition-all cursor-pointer active:scale-95"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Research Support: Murray (2004)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Controls (Methods -> Products) & Right Panel (Gauges + Sliders) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Controls & Product Options */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: Select Method of Ingestion */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              1. Select Method of Ingestion:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INGESTION_METHODS.map((method) => {
                const isSelected = selectedMethod.id === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => handleSelectMethod(method)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-white text-sm">{method.name}</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-900/80 text-amber-300 border border-amber-700/60">
                        {method.potencyMultiplier}x Boost
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-400 flex flex-col gap-0.5 font-mono">
                      <span>Metabolite: <strong className="text-amber-300">{method.metabolite}</strong></span>
                      <span>Onset: {method.onset} | Duration: {method.duration}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Select Cannabis Strain or Product Type */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                2. Select Cannabis Product / Strain Type:
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Method: <strong className="text-amber-400">{selectedMethod.name}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {STRAINS_DATA.map((strain) => {
                const isSelected = selectedStrain.id === strain.id;
                const isCompatible = selectedMethod.compatibleProducts.includes(strain.id);

                return (
                  <button
                    key={strain.id}
                    onClick={() => handleSelectStrain(strain)}
                    className={`text-left p-3.5 rounded-xl border transition-all relative cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                        : isCompatible
                          ? 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                          : 'bg-slate-950/40 border-slate-900 opacity-40 filter grayscale hover:opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className={`font-display font-bold text-xs sm:text-sm ${isCompatible ? 'text-white' : 'text-slate-400'}`}>
                        {strain.name}
                      </span>
                      {isCompatible ? (
                        <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                          strain.psychosisRiskScore > 7 
                            ? 'bg-red-950 text-red-300 border border-red-800' 
                            : strain.psychosisRiskScore > 4 
                              ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}>
                          RR {strain.psychosisRiskScore.toFixed(1)}x
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800 flex items-center gap-1 shrink-0">
                          <Ban className="w-2.5 h-2.5 text-slate-500" />
                          Incompatible
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{strain.description}</p>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-1 text-emerald-400 font-bold">
                        <Flame className="w-3 h-3 text-emerald-500" />
                        <span>THC: {strain.thcPercent}%</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Shield className="w-3 h-3 text-amber-500" />
                        <span>CBD: {strain.cbdPercent}%</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pharmacokinetics Note & Biological Mechanism Callout */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Info className="w-4 h-4" /> Pharmacokinetics: {selectedMethod.name}
              </div>
              <p className="text-slate-300 leading-relaxed">{selectedMethod.description}</p>
              {selectedMethod.id === 'oral-edible' && (
                <div className="mt-1 p-2 bg-amber-950/40 border border-amber-800/50 rounded text-[11px] text-amber-200">
                  ⚠️ <strong>11-Hydroxy-THC Metabolite:</strong> Liver metabolism creates 11-OH-THC, which crosses the blood-brain barrier far more easily and lasts up to 12 hours, greatly increasing risk of prolonged acute paranoia.
                </div>
              )}
            </div>

            <div className="p-3.5 bg-emerald-950/40 border border-emerald-800/60 rounded-xl space-y-1.5 text-xs">
              <div className="font-bold text-emerald-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>A-Level Neurochemical Explanation:</span>
                </span>
                {onOpenStudies && (
                  <button
                    onClick={() => onOpenStudies('murray-2004')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-500/40 text-emerald-200 text-[10px] font-mono font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                  >
                    <Award className="w-3 h-3 text-emerald-400" />
                    <span>Research Support</span>
                  </button>
                )}
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {selectedStrain.details}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE GAUGES + POWER ADJUSTMENT SLIDERS UNDERNEATH */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5 lg:sticky lg:top-4">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              Live Neurochemical Gauges
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold animate-pulse">
              LIVE METRICS
            </span>
          </div>

          {/* Key Metric Gauge Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400">THC:CBD</div>
              <div className="text-sm font-display font-bold text-emerald-400 mt-0.5">
                {thcRatio > 100 ? '>100:1' : `${thcRatio.toFixed(1)}:1`}
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400">Psychosis Risk</div>
              <div className={`text-sm font-display font-bold mt-0.5 ${
                relativeRiskRatio > 6 ? 'text-red-400' : relativeRiskRatio > 3 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {relativeRiskRatio.toFixed(1)}x
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400">CBD Buffer</div>
              <div className="text-sm font-display font-bold text-amber-400 mt-0.5">
                {cbdProtectionFactor.toFixed(1)}/10
              </div>
            </div>
          </div>

          {/* Vertical Impact Bars Panel */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-mono font-bold text-slate-300 text-center mb-3 uppercase tracking-wider">
              Relative Neurochemical Impact Bars
            </div>

            <div className="flex items-end justify-around h-56 sm:h-64 px-2 pt-6 pb-2">
              {/* Vertical Bar 1: Effective THC Burden */}
              <div className="flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-mono font-bold text-emerald-400 mb-2">
                  {effectiveThc.toFixed(1)}%
                </span>
                <div className="w-10 sm:w-12 bg-slate-900 border border-slate-800 rounded-t-xl overflow-hidden flex flex-col justify-end p-1 h-full">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-300 rounded-t-lg transition-all duration-300"
                    style={{ height: `${effectiveThcBarPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-300 mt-2 text-center leading-tight">
                  Effective<br />THC Hit
                </span>
              </div>

              {/* Vertical Bar 2: CBD Protection */}
              <div className="flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-mono font-bold text-amber-400 mb-2">
                  {customCbd.toFixed(1)}%
                </span>
                <div className="w-10 sm:w-12 bg-slate-900 border border-slate-800 rounded-t-xl overflow-hidden flex flex-col justify-end p-1 h-full">
                  <div
                    className="w-full bg-gradient-to-t from-amber-600 via-amber-500 to-yellow-300 rounded-t-lg transition-all duration-300"
                    style={{ height: `${cbdProtectionBarPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-300 mt-2 text-center leading-tight">
                  CBD<br />Buffer
                </span>
              </div>

              {/* Vertical Bar 3: Risk of Developing Psychosis */}
              <div className="flex flex-col items-center h-full justify-end group">
                <span className={`text-[10px] font-mono font-bold mb-2 ${
                  relativeRiskRatio > 6 ? 'text-red-400' : relativeRiskRatio > 3 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {relativeRiskRatio.toFixed(1)}x Risk
                </span>
                <div className="w-10 sm:w-12 bg-slate-900 border border-slate-800 rounded-t-xl overflow-hidden flex flex-col justify-end p-1 h-full">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      relativeRiskRatio > 6
                        ? 'bg-gradient-to-t from-amber-600 via-red-500 to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                        : relativeRiskRatio > 3
                          ? 'bg-gradient-to-t from-emerald-600 via-amber-500 to-amber-400'
                          : 'bg-gradient-to-t from-emerald-700 via-emerald-500 to-emerald-400'
                    }`}
                    style={{ height: `${riskScoreBarPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-300 mt-2 text-center leading-tight">
                  Risk of<br />Developing Psychosis
                </span>
              </div>
            </div>
          </div>

          {/* POWER ADJUSTMENT SLIDERS - LOCATED DIRECTLY UNDERNEATH GAUGES FOR STREAMLINED ACCESS */}
          <div className="bg-slate-950 border border-emerald-900/60 rounded-xl p-4 space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-emerald-400" />
                Streamlined Potency Sliders:
              </h4>
              <span className="text-[10px] font-mono text-slate-400">
                {selectedStrain.name}
              </span>
            </div>

            {/* THC % Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  THC Concentration (%):
                </span>
                <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  {customThc.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={selectedStrain.thcMinMax[0]}
                max={selectedStrain.thcMinMax[1]}
                step="0.5"
                value={customThc}
                onChange={(e) => setCustomThc(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Min: {selectedStrain.thcMinMax[0]}%</span>
                <span>Max: {selectedStrain.thcMinMax[1]}%</span>
              </div>
            </div>

            {/* CBD % Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  CBD Protection Level (%):
                </span>
                <span className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800 font-bold">
                  {customCbd.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={selectedStrain.cbdMinMax[0]}
                max={selectedStrain.cbdMinMax[1]}
                step="0.1"
                value={customCbd}
                onChange={(e) => setCustomCbd(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Min: {selectedStrain.cbdMinMax[0]}%</span>
                <span>Max: {selectedStrain.cbdMinMax[1]}%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
