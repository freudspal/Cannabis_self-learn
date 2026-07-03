import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle, AlertCircle, Award, Sparkles, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "According to Caspi et al. (2005), which gene variant combined with adolescent cannabis use produced a 7x increase in psychosis risk?",
    options: [
      "COMT Val/Val genotype",
      "AKT1 C/C genotype",
      "5-HTTLPR short allele",
      "MAOA low activity gene"
    ],
    correctIndex: 1,
    explanation: "Correct! Participants carrying the AKT1 C/C homozygous genotype who used daily cannabis during adolescence had a 7.0x higher risk of schizophrenia symptoms."
  },
  {
    id: 2,
    question: "What primary neurochemical effect occurs when THC binds to pre-synaptic CB1 receptors on GABAergic interneurons in the VTA?",
    options: [
      "It stimulates GABA release, shutting down dopamine neurons",
      "It suppresses GABA release, disinhibiting dopamine neurons (Hyper-dopaminergia)",
      "It destroys dopamine D2 receptors directly",
      "It converts serotonin into anandamide"
    ],
    correctIndex: 1,
    explanation: "Correct! THC causes depolarization-induced suppression of inhibition by cutting off GABA release ('the brakes'), allowing dopamine neurons to overfire into the mesolimbic pathway."
  },
  {
    id: 3,
    question: "How does CBD (Cannabidiol) protect against the psychotogenic effects of high-THC strains?",
    options: [
      "It acts as a negative allosteric modulator at CB1 receptors, altering their shape",
      "It increases blood pressure to flush THC out of the liver",
      "It directly destroys CB1 receptors",
      "It neutralizes dopamine in the stomach"
    ],
    correctIndex: 0,
    explanation: "Correct! CBD binds to an allosteric site on CB1 receptors, changing their shape so THC cannot bind as effectively, dampening paranoia and psychotic symptoms."
  },
  {
    id: 4,
    question: "Which dopaminergic pathway hyperactivity is responsible for POSITIVE symptoms (hallucinations & delusions)?",
    options: [
      "Nigrostriatal pathway",
      "Mesocortical pathway",
      "Mesolimbic pathway",
      "Tuberoinfundibular pathway"
    ],
    correctIndex: 2,
    explanation: "Correct! Hyper-dopaminergia in the Mesolimbic pathway (VTA to Nucleus Accumbens/Limbic system) triggers positive symptoms like auditory voices and persecutory delusions."
  },
  {
    id: 5,
    question: "What neuroimaging technique did Ashtari et al. (2009) use to demonstrate white matter tract damage in heavy adolescent cannabis users?",
    options: [
      "Positron Emission Tomography (PET)",
      "Diffusion Tensor Imaging (DTI) MRI",
      "Electroencephalogram (EEG)",
      "CT Scan"
    ],
    correctIndex: 1,
    explanation: "Correct! Ashtari et al. (2009) used Diffusion Tensor Imaging (DTI) to reveal structural abnormalities and reduced fractional anisotropy in fronto-temporal white matter tracts."
  },
  {
    id: 6,
    question: "According to Murray et al. (2016), what percentage of first-episode psychosis cases in South London were attributable to high-potency Skunk?",
    options: [
      "5%",
      "12%",
      "24%",
      "80%"
    ],
    correctIndex: 2,
    explanation: "Correct! Murray estimated that 24% of all first-episode psychosis presentations in South London were attributable to high-potency Skunk (high THC, zero CBD)."
  }
];

interface RevisionQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RevisionQuizModal: React.FC<RevisionQuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOpt(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOpt === null) return;
    setIsSubmitted(true);
    if (selectedOpt === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsSubmitted(false);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-2xl w-full max-w-xl p-6 space-y-6 relative reggae-glow-green shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-800 pb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-mono font-bold mb-1">
            <Award className="w-3.5 h-3.5" /> Psychology Knowledge Check
          </div>
          <h3 className="text-xl font-display font-bold text-white">
            A-Level Psychology Revision Quiz
          </h3>
        </div>

        {!quizFinished ? (
          /* Question View */
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>Score: <strong className="text-emerald-400">{score}</strong></span>
            </div>

            <h4 className="text-base font-display font-bold text-white leading-snug">
              {currentQ.question}
            </h4>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                if (isSubmitted) {
                  if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-400 text-emerald-200 font-bold';
                  else if (isSelected && !isCorrect) btnStyle = 'bg-red-950 border-red-500 text-red-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-emerald-500 text-black font-bold border-emerald-400';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation Feedback */}
            {isSubmitted && (
              <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-800/60 text-xs text-slate-300 leading-relaxed font-mono">
                <span className="text-amber-400 font-bold block mb-0.5">Explanation:</span>
                {currentQ.explanation}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 pt-2">
              {!isSubmitted ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedOpt === null}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-xs font-mono"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs font-mono"
                >
                  {currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question →' : 'View Results'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Results View */
          <div className="text-center py-6 space-y-4">
            <Sparkles className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
            <h4 className="text-2xl font-display font-extrabold text-white">
              Revision Complete!
            </h4>
            <div className="text-4xl font-display font-bold text-emerald-400">
              {score} / {QUIZ_QUESTIONS.length} Correct
            </div>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              {score >= 5
                ? 'Outstanding work! You have mastered the Cannabis & Schizophrenia psychology topic.'
                : 'Good effort! Review the Core Studies and Synapse model tabs to reinforce your key concepts.'}
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono rounded-xl"
              >
                <RotateCcw className="w-4 h-4" /> Try Quiz Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
