import React, { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { THCVSBDComparator } from './components/THCVSBDComparator';
import { InteractiveSynapse } from './components/InteractiveSynapse';
import { DopaminePathways } from './components/DopaminePathways';
import { NervousSystemMap } from './components/NervousSystemMap';
import { StudiesLibrary } from './components/StudiesLibrary';
import { RiskScenarioGenerator } from './components/RiskScenarioGenerator';
import { GlossaryDictionary } from './components/GlossaryDictionary';
import { RevisionQuizModal } from './components/RevisionQuizModal';
import { Sparkles, Brain, Award, BookOpen, Scale, Music } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('comparator');
  const [selectedStudyId, setSelectedStudyId] = useState<string | undefined>(undefined);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  const handleOpenStudies = (studyId?: string) => {
    if (studyId) {
      setSelectedStudyId(studyId);
    }
    setActiveTab('studies');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col relative border-4 sm:border-8 border-green-600 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
      
      {/* Background SVG Watermark Pattern from Immersive UI Design */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M50 10 L60 40 L90 40 L65 55 L75 85 L50 70 L25 85 L35 55 L10 40 L40 40 Z" fill="#16a34a" transform="translate(-20, -20) rotate(15)" />
          <path d="M50 10 L60 40 L90 40 L65 55 L75 85 L50 70 L25 85 L35 55 L10 40 L40 40 Z" fill="#eab308" transform="translate(80, 70) rotate(-20)" />
        </svg>
      </div>

      {/* Top Navigation Bar with Audio Controls */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex-1 space-y-6 z-10">
        {/* Tab Content Display */}
        <div className="transition-all duration-300">
          {activeTab === 'comparator' && <THCVSBDComparator onOpenGlossary={() => setActiveTab('glossary')} onOpenStudies={handleOpenStudies} />}
          {activeTab === 'synapse' && <InteractiveSynapse onOpenGlossary={() => setActiveTab('glossary')} onOpenStudies={handleOpenStudies} />}
          {activeTab === 'pathways' && <DopaminePathways onOpenGlossary={() => setActiveTab('glossary')} onOpenStudies={handleOpenStudies} />}
          {activeTab === 'receptors' && <NervousSystemMap onOpenGlossary={() => setActiveTab('glossary')} onOpenStudies={handleOpenStudies} />}
          {activeTab === 'studies' && <StudiesLibrary initialStudyId={selectedStudyId} />}
          {activeTab === 'generator' && <RiskScenarioGenerator onOpenGlossary={() => setActiveTab('glossary')} onOpenStudies={handleOpenStudies} />}
          {activeTab === 'glossary' && <GlossaryDictionary />}
        </div>
      </main>

      {/* Immersive Theme Footer */}
      <footer className="h-auto sm:h-12 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between px-6 py-3 sm:py-0 gap-2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          <div className="w-3 h-3 bg-green-600 rounded-full" />
          <span className="text-[10px] text-zinc-400 font-mono tracking-tighter ml-2 italic">
            &quot;The herb is the healing of a nation...&quot; - Marley (1945-1981)
          </span>
        </div>
        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest text-center sm:text-right">
          A-Level Psychology Resource | Module: Schizophrenia
        </div>
      </footer>

      {/* Revision Quiz Modal */}
      <RevisionQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
}
