import React, { useState, useEffect } from 'react';
import { CORE_STUDIES } from '../data/studies';
import { ResearchStudy } from '../types';
import { BookOpen, Search, CheckCircle, XCircle, Sparkles, AlertCircle, Award, Lightbulb } from 'lucide-react';

interface StudiesLibraryProps {
  initialStudyId?: string;
}

export const StudiesLibrary: React.FC<StudiesLibraryProps> = ({ initialStudyId }) => {
  const [selectedStudy, setSelectedStudy] = useState<ResearchStudy>(() => {
    if (initialStudyId) {
      const match = CORE_STUDIES.find(s => s.id === initialStudyId || s.id.includes(initialStudyId));
      if (match) return match;
    }
    return CORE_STUDIES[0];
  });
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (initialStudyId) {
      const match = CORE_STUDIES.find(s => s.id === initialStudyId || s.id.includes(initialStudyId));
      if (match) setSelectedStudy(match);
    }
  }, [initialStudyId]);

  const filteredStudies = CORE_STUDIES.filter(s => 
    s.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.year.toString().includes(searchTerm) ||
    s.keyFindings.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/80 border border-emerald-800/50 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Core Research Studies Library
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Master the 7 essential research studies for A-Level Psychology. Includes aims, methodologies, key findings, and rigorous AO3 evaluation points.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search study, author, year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Studies & Selected Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Study Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4" /> 7 Key Research Papers (Eduqas Spec):
          </h3>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredStudies.map((study) => {
              const isSelected = selectedStudy.id === study.id;
              return (
                <button
                  key={study.id}
                  onClick={() => setSelectedStudy(study)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-400 reggae-glow-green'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-white text-base">
                      {study.authors} ({study.year})
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      AO1 / AO3
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {study.fullTitle}
                  </p>

                  <div className="mt-2 text-[11px] text-amber-300 font-mono line-clamp-1">
                    ★ {study.keyFindings.substring(0, 80)}...
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Study Detailed View */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          {/* Study Header */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                Study Reference #{selectedStudy.year}
              </span>
              <span className="text-xs font-mono text-slate-400">
                WJEC Eduqas Component 3
              </span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mt-2">
              {selectedStudy.authors} ({selectedStudy.year})
            </h3>
            <p className="text-xs text-slate-300 font-mono italic mt-1 leading-snug">
              "{selectedStudy.fullTitle}"
            </p>
          </div>

          {/* Aim & Methodology */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Aims & Hypothesis:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedStudy.aim}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-1">
                Sample & Methodology:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedStudy.sampleAndMethod}</p>
            </div>
          </div>

          {/* Key Findings (AO1) */}
          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/60 space-y-1.5">
            <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Key Empirical Findings (AO1):
            </h4>
            <p className="text-sm text-slate-100 font-medium leading-relaxed">
              {selectedStudy.keyFindings}
            </p>
          </div>

          {/* AO3 Strengths vs Criticisms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Methodological Strengths:
              </h4>
              <ul className="space-y-1.5">
                {selectedStudy.strengths.map((s, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-snug">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Criticisms */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                <XCircle className="w-4 h-4 text-red-500" /> Criticisms & Limitations (AO3):
              </h4>
              <ul className="space-y-1.5">
                {selectedStudy.criticisms.map((c, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-snug">
                    <span className="text-red-400 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exam Tip */}
          <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-800/60 space-y-1">
            <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" /> WJEC Eduqas Exam Essay Tip:
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              {selectedStudy.eduqasExamTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
