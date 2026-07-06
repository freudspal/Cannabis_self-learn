import React, { useState } from 'react';
import { RiskFactorsScenario, RiskAnalysisResult } from '../types';
import { Calculator, AlertTriangle, Shield, CheckCircle, Flame, Info, Sparkles, TrendingUp, Dna, Award } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';

interface RiskScenarioGeneratorProps {
  onOpenGlossary?: () => void;
  onOpenStudies?: (studyId?: string) => void;
}

export const RiskScenarioGenerator: React.FC<RiskScenarioGeneratorProps> = ({ onOpenGlossary, onOpenStudies }) => {
  const [scenario, setScenario] = useState<RiskFactorsScenario>({
    ageOfFirstUse: 'never',
    cannabisPotency: 'none',
    frequency: 'never',
    geneticHistory: 'noHistory',
    geneVariant: 'AKT1_TT'
  });

  const handleResetBaseline = () => {
    setScenario({
      ageOfFirstUse: 'never',
      cannabisPotency: 'none',
      frequency: 'never',
      geneticHistory: 'noHistory',
      geneVariant: 'AKT1_TT'
    });
  };

  // Calculate Odds Ratio (OR) dynamically based on epidemiological data
  const calculateOddsRatio = (): RiskAnalysisResult => {
    let baseOR = 1.0;

    // Age multiplier (McGee 2000, Arseneault 2002)
    if (scenario.ageOfFirstUse === 'under15') baseOR *= 2.8;
    else if (scenario.ageOfFirstUse === 'age15to18') baseOR *= 1.8;
    else if (scenario.ageOfFirstUse === 'over18') baseOR *= 1.2;
    else if (scenario.ageOfFirstUse === 'never') baseOR *= 1.0;

    // Potency multiplier (Murray 2016)
    if (scenario.cannabisPotency === 'highThcSkunk') baseOR *= 2.5;
    else if (scenario.cannabisPotency === 'moderateBalanced') baseOR *= 1.3;
    else if (scenario.cannabisPotency === 'lowThcCbd') baseOR *= 0.95;
    else if (scenario.cannabisPotency === 'none') baseOR *= 1.0;

    // Frequency multiplier
    if (scenario.frequency === 'dailyHeavy') baseOR *= 2.0;
    else if (scenario.frequency === 'weekly') baseOR *= 1.4;
    else if (scenario.frequency === 'occasional') baseOR *= 1.1;
    else if (scenario.frequency === 'never') baseOR *= 1.0;

    // AKT1 Gene Polymorphism / Genetic Markers (van Winkel 2011)
    if (scenario.geneVariant === 'AKT1_CC') baseOR *= 2.2;
    else if (scenario.geneVariant === 'AKT1_CT') baseOR *= 1.4;
    else if (scenario.geneVariant === 'AKT1_TT') baseOR *= 1.0;

    // Cap & Format
    const finalOR = Math.min(12.5, Math.max(1.0, baseOR));
    
    let category: RiskAnalysisResult['riskCategory'] = 'Low Baseline';
    if (finalOR > 8) category = 'Extreme Risk';
    else if (finalOR > 5) category = 'Very High Risk';
    else if (finalOR > 3) category = 'High Risk';
    else if (finalOR > 1.4) category = 'Moderate Risk';

    const rawFactors = [
      scenario.ageOfFirstUse === 'under15' ? 'Adolescent exposure before age 15 (Pruning window)' :
      scenario.ageOfFirstUse === 'age15to18' ? 'Adolescent exposure age 15-18' :
      scenario.ageOfFirstUse === 'over18' ? 'Adult cannabis initiation' : '',

      scenario.cannabisPotency === 'highThcSkunk' ? 'High-THC Skunk without CBD protection (Murray 2016)' :
      scenario.cannabisPotency === 'moderateBalanced' ? 'Balanced 1:1 THC:CBD Strain' :
      scenario.cannabisPotency === 'lowThcCbd' ? 'High-CBD / Hemp (Protective)' : '',

      scenario.frequency === 'dailyHeavy' ? 'Daily heavy consumption pattern' :
      scenario.frequency === 'weekly' ? 'Weekly / weekend consumption' :
      scenario.frequency === 'occasional' ? 'Occasional / rare use' : '',

      scenario.geneVariant === 'AKT1_CC' ? 'AKT1 C/C Genotype (van Winkel 2011 7x risk factor)' :
      scenario.geneVariant === 'AKT1_CT' ? 'AKT1 C/T Genotype (Moderate Risk Variant)' : ''
    ].filter(Boolean);

    const keyContributingFactors = rawFactors.length > 0 
      ? rawFactors 
      : ['✓ Baseline Non-User Profile (Standard population risk ~1.0x)'];

    return {
      oddsRatio: Number(finalOR.toFixed(1)),
      riskCategory: category,
      percentageIncrease: Math.round((finalOR - 1) * 100),
      keyContributingFactors,
      caspiReference: 'Caspi et al. (2005) demonstrated that participants carrying the COMT Val/Val genotype using adolescent cannabis faced a significantly increased risk of schizophreniform disorder.',
      vanWinkelReference: 'van Winkel et al. (2011) demonstrated that participants carrying the AKT1 C/C genotype using daily cannabis faced a 7-fold increase in psychosis risk.',
      murrayReference: 'Murray et al. (2016) estimated that high-potency Skunk accounts for 24% of all first-episode psychosis presentations in South London.',
      examEvaluationNote: 'A-Level Exam Evaluation (AO3): Remember that an Odds Ratio of 5.0x does NOT equal 100% certainty. Baseline population risk is ~1%. A 5x increase raises lifetime risk to ~5%, meaning 95% of high-risk users do NOT develop schizophrenia.'
    };
  };

  const result = calculateOddsRatio();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/80 border border-emerald-800/50 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Schizophrenia Odds Ratio Scenario Generator
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Configure different individual risk profiles (age of onset, potency, genetics, frequency) to calculate the statistical 
              <InfoTooltip 
                term="Odds Ratio" 
                simpleExplanation="A statistical measure comparing the likelihood of developing a condition in an exposed group vs an unexposed group. E.g., 5x OR means 5 times higher relative likelihood."
                technicalTerm="Relative Odds Ratio"
                onOpenGlossary={onOpenGlossary}
              /> of developing schizophrenia.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Configurator + Odds Ratio Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Options Configurator */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <h3 className="text-base font-display font-bold text-white">
              Configure Student Scenario Options:
            </h3>
            <button
              onClick={handleResetBaseline}
              className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-emerald-950 text-emerald-400 border border-emerald-800/80 transition-all cursor-pointer active:scale-95"
              title="Reset all options to baseline non-user state (1.0x)"
            >
              Reset to Baseline (1.0x)
            </button>
          </div>

          {/* Option 1: Age of First Use */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              Age of First Cannabis Use:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'never', label: 'Never Used', note: 'Baseline (1.0x)' },
                { id: 'over18', label: 'After 18 yrs', note: 'Lower Risk (1.2x)' },
                { id: 'age15to18', label: '15 - 18 yrs', note: 'Moderate (1.8x)' },
                { id: 'under15', label: 'Under 15 yrs', note: 'High Risk (2.8x)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScenario({ ...scenario, ageOfFirstUse: opt.id as any })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    scenario.ageOfFirstUse === opt.id
                      ? 'bg-emerald-500 text-black font-bold border-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold">{opt.label}</div>
                  <div className="text-[10px] opacity-80 font-mono mt-0.5">{opt.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Option 2: Strain Potency */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Cannabis Strain Type & Potency:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'none', label: 'Never Used', note: 'No THC (1.0x)' },
                { id: 'lowThcCbd', label: 'High-CBD / Hemp', note: 'Protective (0.95x)' },
                { id: 'moderateBalanced', label: 'Balanced 1:1', note: 'Equal THC:CBD (1.3x)' },
                { id: 'highThcSkunk', label: 'High-THC "Skunk"', note: 'THC >20% (2.5x)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScenario({ ...scenario, cannabisPotency: opt.id as any })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    scenario.cannabisPotency === opt.id
                      ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold">{opt.label}</div>
                  <div className="text-[10px] opacity-80 font-mono mt-0.5">{opt.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Option 3: Frequency */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
              Frequency of Consumption:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'never', label: 'Never Used', note: 'Zero Use (1.0x)' },
                { id: 'occasional', label: 'Occasional / Rare', note: 'Infrequent (1.1x)' },
                { id: 'weekly', label: 'Weekly / Weekend', note: 'Regular (1.4x)' },
                { id: 'dailyHeavy', label: 'Daily Heavy Use', note: 'Frequent (2.0x)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScenario({ ...scenario, frequency: opt.id as any })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    scenario.frequency === opt.id
                      ? 'bg-sky-500 text-black font-bold border-sky-400 shadow-md shadow-sky-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold">{opt.label}</div>
                  <div className="text-[10px] opacity-80 font-mono mt-0.5">{opt.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Option 4: AKT1 Gene Variant (van Winkel et al. 2011) */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block">
              Genetic Markers (AKT1 Genotype - van Winkel 2011):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'AKT1_TT', label: 'No Genetic Markers', note: 'T/T Baseline Genotype (1.0x)' },
                { id: 'AKT1_CT', label: 'C/T Genotype', note: 'Moderate Risk Variant (1.4x)' },
                { id: 'AKT1_CC', label: 'C/C Genotype', note: 'High Risk Variant (2.2x)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScenario({ ...scenario, geneVariant: opt.id as any })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    scenario.geneVariant === opt.id
                      ? 'bg-red-500 text-black font-bold border-red-400 shadow-md shadow-red-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold">{opt.label}</div>
                  <div className="text-[10px] opacity-80 font-mono mt-0.5">{opt.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3 Genetic Types Explanations Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                <Dna className="w-4 h-4 text-red-400" />
                Explanation of the 3 Genetic Types (AKT1 Genotypes):
              </span>
              <div className="flex items-center gap-1.5">
                {onOpenStudies && (
                  <>
                    <button
                      onClick={() => onOpenStudies('van-winkel-2011')}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-[10px] font-mono font-bold transition-all cursor-pointer active:scale-95"
                      title="View van Winkel et al. (2011) study on AKT1 gene"
                    >
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>van Winkel (2011)</span>
                    </button>
                    <button
                      onClick={() => onOpenStudies('caspi-2005')}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[10px] font-mono font-bold transition-all cursor-pointer active:scale-95"
                      title="View Caspi et al. (2005) study on COMT gene"
                    >
                      <Award className="w-3 h-3 text-slate-400" />
                      <span>Caspi (2005)</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Type 1: C/C Genotype */}
              <div className={`p-3 rounded-xl border transition-all ${
                scenario.geneVariant === 'AKT1_CC' 
                  ? 'bg-red-950/80 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold font-mono text-xs text-red-400">1. AKT1 C/C Genotype (Homozygous High Risk)</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-900 text-red-200 border border-red-700">
                    7x Risk Factor
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  Carrying two copies of the C allele alters AKT1 kinase enzyme regulation in striatal dopamine neurons. When exposed to daily high-THC cannabis, C/C carriers suffer severe presynaptic dopamine disinhibition, producing a <strong>7-fold increased risk</strong> of psychotic symptoms and schizophrenia.
                </p>
              </div>

              {/* Type 2: C/T Genotype */}
              <div className={`p-3 rounded-xl border transition-all ${
                scenario.geneVariant === 'AKT1_CT' 
                  ? 'bg-amber-950/80 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold font-mono text-xs text-amber-400">2. AKT1 C/T Genotype (Heterozygous Intermediate)</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-900 text-amber-200 border border-amber-700">
                    Moderate Risk
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  Carrying one risk C allele and one protective T allele produces an intermediate genetic vulnerability (~2x risk factor). Psychosis expression in C/T carriers depends heavily on environmental triggers such as adolescent age of onset and daily high-potency THC consumption.
                </p>
              </div>

              {/* Type 3: T/T Genotype */}
              <div className={`p-3 rounded-xl border transition-all ${
                scenario.geneVariant === 'AKT1_TT' 
                  ? 'bg-emerald-950/80 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold font-mono text-xs text-emerald-400">3. AKT1 T/T Genotype (Homozygous Protective)</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-900 text-emerald-200 border border-emerald-700">
                    Protective Allele
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  Carrying two copies of the T allele provides baseline resilience against cannabis-induced psychosis. Even with daily cannabis use, T/T carriers maintain normal AKT1 enzyme activity and do not exhibit the exponential dopamine surge seen in C/C carriers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Odds Ratio Gauge Meter & Analysis */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
              Calculated Schizophrenia Odds Ratio Meter:
            </h3>

            {/* Gauge Display Box */}
            <div className="bg-[#07090e] border border-slate-800 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
              
              <div className="text-xs font-mono text-slate-400">Estimated Relative Risk Factor</div>
              
              <div className={`text-5xl font-display font-extrabold tracking-tight ${
                result.oddsRatio > 6 ? 'text-red-500' : result.oddsRatio > 3 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {result.oddsRatio}x <span className="text-xl font-normal text-slate-400">OR</span>
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                result.oddsRatio > 6 
                  ? 'bg-red-950 text-red-400 border-red-800' 
                  : result.oddsRatio > 3 
                    ? 'bg-amber-950 text-amber-300 border-amber-800' 
                    : 'bg-emerald-950 text-emerald-400 border-emerald-800'
              }`}>
                {result.riskCategory.toUpperCase()} (+{result.percentageIncrease}% vs baseline)
              </div>

              {/* Progress Bar Gauge */}
              <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden p-0.5 mt-2">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.oddsRatio > 6
                      ? 'bg-gradient-to-r from-amber-500 to-red-600'
                      : result.oddsRatio > 3
                        ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                        : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (result.oddsRatio / 12) * 100)}%` }}
                />
              </div>
            </div>

            {/* Contributing Key Factors */}
            <div className="mt-4 space-y-2">
              <span className="text-xs font-mono text-slate-400 font-bold block">Primary Risk Amplifiers:</span>
              <ul className="space-y-1">
                {result.keyContributingFactors.map((f, i) => (
                  <li key={i} className="text-xs text-amber-300 flex items-center gap-1.5 font-mono">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exam Caution Box */}
          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/60 text-xs space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-400" />
              Critical AO3 Exam Note (Correlation vs Causation):
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              {result.examEvaluationNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

