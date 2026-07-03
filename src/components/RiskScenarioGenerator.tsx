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
    ageOfFirstUse: 'under15',
    cannabisPotency: 'highThcSkunk',
    frequency: 'dailyHeavy',
    geneticHistory: 'firstDegree',
    geneVariant: 'AKT1_CC'
  });

  // Calculate Odds Ratio (OR) dynamically based on epidemiological data
  const calculateOddsRatio = (): RiskAnalysisResult => {
    let baseOR = 1.0;

    // Age multiplier (McGee 2000, Arseneault 2002)
    if (scenario.ageOfFirstUse === 'under15') baseOR *= 2.8;
    else if (scenario.ageOfFirstUse === 'age15to18') baseOR *= 1.8;
    else if (scenario.ageOfFirstUse === 'over18') baseOR *= 1.2;

    // Potency multiplier (Murray 2016)
    if (scenario.cannabisPotency === 'highThcSkunk') baseOR *= 2.5;
    else if (scenario.cannabisPotency === 'moderateBalanced') baseOR *= 1.2;
    else if (scenario.cannabisPotency === 'lowThcCbd') baseOR *= 0.9; // protective

    // Frequency
    if (scenario.frequency === 'dailyHeavy') baseOR *= 2.0;
    else if (scenario.frequency === 'weekly') baseOR *= 1.3;

    // Genetics / Family history
    if (scenario.geneticHistory === 'firstDegree') baseOR *= 3.0; // 10% lifetime baseline
    else if (scenario.geneticHistory === 'secondDegree') baseOR *= 1.5;

    // AKT1 Gene Polymorphism (Caspi 2005)
    if (scenario.geneVariant === 'AKT1_CC') baseOR *= 2.2;
    else if (scenario.geneVariant === 'AKT1_CT') baseOR *= 1.3;

    // Cap & Format
    const finalOR = Math.min(12.5, Math.max(1.0, baseOR));
    
    let category: RiskAnalysisResult['riskCategory'] = 'Low Baseline';
    if (finalOR > 8) category = 'Extreme Risk';
    else if (finalOR > 5) category = 'Very High Risk';
    else if (finalOR > 3) category = 'High Risk';
    else if (finalOR > 1.8) category = 'Moderate Risk';

    return {
      oddsRatio: Number(finalOR.toFixed(1)),
      riskCategory: category,
      percentageIncrease: Math.round((finalOR - 1) * 100),
      keyContributingFactors: [
        scenario.geneVariant === 'AKT1_CC' ? 'AKT1 C/C Genotype (Caspi 2005 7x risk factor)' : '',
        scenario.ageOfFirstUse === 'under15' ? 'Adolescent exposure before age 15 (Pruning window)' : '',
        scenario.cannabisPotency === 'highThcSkunk' ? 'High-THC Skunk without CBD protection (Murray 2016)' : '',
        scenario.geneticHistory === 'firstDegree' ? 'First-degree relative with schizophrenia' : ''
      ].filter(Boolean),
      caspiReference: 'Caspi et al. (2005) demonstrated that participants carrying the AKT1 C/C genotype using daily cannabis faced a 7-fold increase in schizophrenia symptoms.',
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
          <h3 className="text-base font-display font-bold text-white border-b border-slate-800 pb-2">
            Configure Student Scenario Options:
          </h3>

          {/* Option 1: Age of First Use */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              Age of First Cannabis Use:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'under15', label: 'Under 15 yrs', note: 'High Brain Pruning Risk' },
                { id: 'age15to18', label: '15 - 18 yrs', note: 'Moderate Risk' },
                { id: 'over18', label: 'After 18 yrs', note: 'Lower Risk' },
                { id: 'never', label: 'Never Used', note: 'Baseline Risk' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScenario({ ...scenario, ageOfFirstUse: opt.id as any })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    scenario.ageOfFirstUse === opt.id
                      ? 'bg-emerald-500 text-black font-bold border-emerald-400'
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'highThcSkunk', label: 'High-THC "Skunk"', note: 'THC >20%, 0% CBD' },
                { id: 'moderateBalanced', label: 'Balanced 1:1 Strain', note: 'Equal THC & CBD' },
                { id: 'lowThcCbd', label: 'High-CBD / Hemp', note: 'Neuroprotective' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScenario({ ...scenario, cannabisPotency: opt.id as any })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    scenario.cannabisPotency === opt.id
                      ? 'bg-amber-500 text-black font-bold border-amber-400'
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
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'dailyHeavy', label: 'Daily Heavy Use' },
                { id: 'weekly', label: 'Weekly / Weekend' },
                { id: 'occasional', label: 'Occasional / Rare' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScenario({ ...scenario, frequency: opt.id as any })}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                    scenario.frequency === opt.id
                      ? 'bg-sky-500 text-black font-bold border-sky-400'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Option 4: AKT1 Gene Variant (Caspi 2005) */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block">
              AKT1 Gene Genotype (Caspi et al. 2005):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'AKT1_CC', label: '1. C/C Genotype', note: '7x High Vulnerability' },
                { id: 'AKT1_CT', label: '2. C/T Genotype', note: 'Moderate Risk' },
                { id: 'AKT1_TT', label: '3. T/T Genotype', note: 'Protective Allele' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScenario({ ...scenario, geneVariant: opt.id as any })}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    scenario.geneVariant === opt.id
                      ? 'bg-red-950 border-red-500 text-red-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold">{opt.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{opt.note}</div>
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
              {onOpenStudies ? (
                <button
                  onClick={() => onOpenStudies('caspi-2005')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-[10px] font-mono font-bold transition-all cursor-pointer active:scale-95"
                >
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>Caspi et al. (2005)</span>
                </button>
              ) : (
                <span className="text-[10px] font-mono text-slate-400">Caspi et al. (2005)</span>
              )}
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

