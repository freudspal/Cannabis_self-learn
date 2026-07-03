import React, { useState, useEffect, useRef } from 'react';
import { TabType } from '../types';
import { reggaeAudio } from '../utils/audioEngine';
import { 
  Dna, 
  Activity, 
  GitCommit, 
  Brain, 
  BookOpen, 
  Calculator, 
  Search, 
  Volume2, 
  VolumeX, 
  Sparkles,
  ChevronDown,
  X,
  Menu,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  openQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openQuiz }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleAudio = () => {
    const state = reggaeAudio.togglePlay();
    setIsPlaying(state);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    reggaeAudio.setVolume(val);
  };

  const triggerSiren = () => {
    reggaeAudio.playDubSiren();
  };

  const tabs: { id: TabType; label: string; description: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'comparator', label: 'THC vs CBD Strains', description: 'Compare Delta-9-THC & CBD ratios across strains', icon: <Activity className="w-4 h-4" /> },
    { id: 'synapse', label: 'Anatomical Synapse Model', description: 'Interactive synapse diagram & GABA disinhibition', icon: <GitCommit className="w-4 h-4" />, badge: 'Diagram & Animation' },
    { id: 'pathways', label: 'Dopamine Brain Pathways', description: 'Mesolimbic & Mesocortical pathways on brain cross-section', icon: <Brain className="w-4 h-4" />, badge: 'Brain Map' },
    { id: 'receptors', label: 'CB1 & CB2 Receptors', description: 'Human nervous system & immune receptor locations', icon: <Dna className="w-4 h-4" />, badge: 'Nervous System' },
    { id: 'studies', label: 'Core Studies Library', description: 'Empirical research papers (Caspi, van Winkel, Ashtari, Murray)', icon: <BookOpen className="w-4 h-4" />, badge: '8 Papers' },
    { id: 'generator', label: 'Odds Ratio Generator', description: 'Calculate statistical risk odds ratios for schizophrenia', icon: <Calculator className="w-4 h-4" />, badge: 'Risk Calculator' },
    { id: 'glossary', label: 'Glossary & Dictionary', description: 'Psychology terms in plain English with key terms', icon: <Search className="w-4 h-4" /> },
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <header className="sticky top-0 z-50 bg-zinc-950 border-b-2 border-amber-400 shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
      {/* Jamaican Color Accent Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-green-600 via-yellow-400 to-red-600" />

      {/* Single Consolidated Header Banner Container */}
      <div className="relative px-4 sm:px-6 py-4 sm:py-5">
        {/* Background Reggae Hero Artwork - Enhanced High Visibility */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/src/assets/images/reggae_cannabis_hero_1783062896335.jpg"
            alt="Reggae Cannabis Neural Art"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_30%] opacity-90 filter brightness-110 contrast-110"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Subtle vignette gradient overlay for text readability while keeping artwork vibrant */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/40 to-zinc-950/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-3.5 sm:gap-4">
          
          {/* Top Row: Full-width Header Title */}
          <div className="w-full">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight uppercase italic text-white leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]">
              Biological Explanations of Schizophrenia: <span className="text-yellow-400 drop-shadow-[0_2px_12px_rgba(234,179,8,0.8)]">Cannabinoid Hypothesis</span>
            </h1>
          </div>

          {/* Bottom Row: All Action Buttons Lined Up Across the Bottom */}
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2 sm:gap-3 pt-2.5 border-t border-zinc-700/80 w-full">
            
            {/* 1. Menu Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-950 via-zinc-900 to-amber-950 border-2 border-amber-400/90 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:border-amber-300 transition-all cursor-pointer active:scale-95"
                aria-expanded={isMenuOpen}
                aria-haspopup="listbox"
              >
                <div className="p-1 rounded-lg bg-emerald-500 text-black shrink-0">
                  {currentTab.icon}
                </div>
                <div className="text-left max-w-[150px] sm:max-w-[200px] truncate">
                  <div className="text-xs font-black text-amber-300 truncate">
                    {currentTab.label}
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-400 text-black px-2 py-0.5 rounded-md font-mono text-[11px] font-black uppercase shrink-0 ml-1">
                  <span>Menu</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Expanded Menu Dropdown (Unclipped) */}
              {isMenuOpen && (
                <div className="absolute left-0 top-full mt-2.5 z-[100] p-2.5 bg-zinc-950/95 backdrop-blur-xl border-2 border-amber-400 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.95)] space-y-1.5 animate-fadeIn w-80 sm:w-88 max-h-[80vh] overflow-y-auto">
                  <div className="px-3 py-2 border-b border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Menu className="w-4 h-4" /> Select Topic (7 Modules):
                    </span>
                    <button 
                      onClick={() => setIsMenuOpen(false)}
                      className="p-1 text-zinc-400 hover:text-white rounded"
                      title="Close Menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 border ${
                          isActive
                            ? 'bg-emerald-950/90 border-emerald-400 text-white shadow-md'
                            : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-amber-400/50 hover:text-white'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-emerald-400'}`}>
                          {tab.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className={`text-xs font-black uppercase tracking-wide truncate ${isActive ? 'text-amber-300' : 'text-zinc-100'}`}>
                              {tab.label}
                            </span>
                            {tab.badge && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 shrink-0">
                                {tab.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-400 font-sans leading-tight mt-0.5 line-clamp-1">
                            {tab.description}
                          </p>
                        </div>

                        {isActive && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 self-center" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Reggae Beat Audio Control */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/80 border border-zinc-700/80 rounded-xl text-xs backdrop-blur-md">
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                  isPlaying 
                    ? 'bg-yellow-400 text-black shadow-[0_0_12px_rgba(234,179,8,0.6)] animate-pulse' 
                    : 'bg-green-950 text-green-300 border border-green-500/80 hover:bg-green-900'
                }`}
                title={isPlaying ? "Mute Reggae Beat" : "Play Reggae Riddim"}
              >
                {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Riddim ON' : 'Reggae Beat'}</span>
              </button>

              {isPlaying && (
                <div className="flex items-center gap-1.5 pl-1.5 border-l border-zinc-800">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-10 sm:w-12 accent-green-500 cursor-pointer"
                    title="Audio Volume"
                  />
                  <button 
                    onClick={triggerSiren} 
                    className="px-1.5 py-0.5 bg-yellow-400/20 hover:bg-yellow-400/40 border border-yellow-400 text-yellow-300 rounded text-[9px] font-mono font-bold uppercase cursor-pointer"
                    title="Trigger Jamaican Dub Siren SFX"
                  >
                    Dub
                  </button>
                </div>
              )}
            </div>

            {/* 3. Explore Glossary Button */}
            <button
              onClick={() => setActiveTab('glossary')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase transition-all border cursor-pointer active:scale-95 backdrop-blur-md ${
                activeTab === 'glossary'
                  ? 'bg-green-500 text-black border-green-400 shadow-[0_0_12px_rgba(34,197,94,0.5)]'
                  : 'bg-green-950/80 hover:bg-green-900 text-green-300 border-green-600/80'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Glossary</span>
            </button>

            {/* 4. Exam Quiz Button */}
            <button
              onClick={openQuiz}
              className="px-3.5 py-2 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase transition-all flex items-center gap-1.5 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.5)] cursor-pointer active:scale-95 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Exam Quiz</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
