import React, { useState, useRef, useEffect } from 'react';
import { Info, BookOpen, X } from 'lucide-react';

interface InfoTooltipProps {
  term: string;
  simpleExplanation: string;
  technicalTerm?: string;
  onOpenGlossary?: () => void;
  className?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  term,
  simpleExplanation,
  technicalTerm,
  onOpenGlossary,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-flex items-center ${className}`} ref={tooltipRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setIsOpen(true)}
        className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 bg-amber-950/60 border border-amber-500/40 hover:border-amber-400 px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold transition-all cursor-pointer shadow-sm ml-1"
        title={`Learn more about ${term}`}
      >
        <Info className="w-3 h-3 text-amber-400" />
        <span className="underline decoration-dashed underline-offset-2">{term}</span>
      </button>

      {/* Popover / Tooltip */}
      {isOpen && (
        <div className="absolute left-0 bottom-full mb-2 z-50 w-72 p-3.5 bg-zinc-950 border-2 border-amber-400 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] text-slate-100 space-y-2 text-left animate-fadeIn">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <strong className="text-xs font-bold text-amber-300 uppercase tracking-wide">{term}</strong>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-zinc-200 leading-relaxed font-sans">
            {simpleExplanation}
          </p>

          {technicalTerm && (
            <div className="text-[10px] font-mono text-zinc-400 pt-1">
              <span className="text-emerald-400 font-bold">Key Term: </span>
              {technicalTerm}
            </div>
          )}

          {onOpenGlossary && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenGlossary();
              }}
              className="w-full mt-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/50 text-[11px] font-mono font-bold transition-all"
            >
              <BookOpen className="w-3 h-3" />
              <span>Explore in Glossary</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
