import React, { useState } from 'react';
import { GLOSSARY_ITEMS } from '../data/glossary';
import { GlossaryItem } from '../types';
import { Search, BookOpen, Volume2, Sparkles, Brain, CheckCircle, Lightbulb } from 'lucide-react';

export const GlossaryDictionary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [flashcardMode, setFlashcardMode] = useState<boolean>(false);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const categories = ['ALL', 'Neurotransmitter', 'Cannabinoid', 'Brain Region', 'Clinical Term', 'Methodology'];

  const filteredItems = GLOSSARY_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.roleInSchizophrenia.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentFlashcard = filteredItems[cardIndex] || filteredItems[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/80 border border-emerald-800/50 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              A-Level Psychology Glossary & Flashcards
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Psychology <span className="text-amber-400">&</span> Neurochemistry Dictionary
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Definitions, pronunciations, memory hooks, and specific roles in Schizophrenia for every key A-Level term.
            </p>
          </div>

          {/* Flashcard Mode Toggle */}
          <button
            onClick={() => {
              setFlashcardMode(!flashcardMode);
              setShowAnswer(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
              flashcardMode 
                ? 'bg-amber-400 text-black reggae-glow-gold' 
                : 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{flashcardMode ? 'Dictionary Grid View' : 'Revision Flashcard Mode'}</span>
          </button>
        </div>
      </div>

      {!flashcardMode ? (
        /* Dictionary Grid View */
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-emerald-500 text-black font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Glossary Item Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-emerald-800/80 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-lg text-white">{item.term}</h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
                      {item.category}
                    </span>
                  </div>

                  {item.pronunciation && (
                    <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1 mt-1">
                      <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                      <span>{item.pronunciation}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.definition}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-sky-400 font-mono font-bold block mb-1">Role in Schizophrenia:</span>
                    <p className="text-slate-300 leading-snug">{item.roleInSchizophrenia}</p>
                  </div>

                  {item.memoryHook && (
                    <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/60 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item.memoryHook}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Revision Flashcard Interactive Mode */
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Flashcard {cardIndex + 1} of {filteredItems.length}</span>
            <span>Category: <strong className="text-emerald-400">{currentFlashcard.category}</strong></span>
          </div>

          {/* Flashcard Box */}
          <div
            onClick={() => setShowAnswer(!showAnswer)}
            className="min-h-[280px] bg-slate-900 border-2 border-emerald-500/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-400 transition-all reggae-glow-green space-y-4"
          >
            {!showAnswer ? (
              <>
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                  Click to Reveal Definition & Schizophrenia Role
                </div>
                <h3 className="text-3xl font-display font-extrabold text-white">
                  {currentFlashcard.term}
                </h3>
                {currentFlashcard.pronunciation && (
                  <div className="text-sm font-mono text-slate-400">
                    🗣 {currentFlashcard.pronunciation}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  {currentFlashcard.term}
                </div>
                <p className="text-base text-slate-200 font-medium leading-relaxed">
                  {currentFlashcard.definition}
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong className="text-sky-400 block mb-1 font-mono">Role in Schizophrenia:</strong>
                  {currentFlashcard.roleInSchizophrenia}
                </div>
                {currentFlashcard.memoryHook && (
                  <div className="text-xs font-mono text-amber-300">
                    💡 Memory Hook: {currentFlashcard.memoryHook}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setCardIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
                setShowAnswer(false);
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold border border-slate-800"
            >
              ← Previous Term
            </button>
            <button
              onClick={() => {
                setCardIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
                setShowAnswer(false);
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-mono font-bold shadow-lg"
            >
              Next Term →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
