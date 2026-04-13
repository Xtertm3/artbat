import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import { useAudio } from '@/hooks/useAudio';

// Standard tuning: E2, A2, D3, G3, B3, E4
const STRINGS = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];
const FRETS = [0, 1, 2, 3, 4, 5]; // Open string + 5 frets

// Note mapping utility
const getNoteFromPosition = (stringIndex: number, fret: number) => {
  const stringNotes = [
    ['E4', 'F4', 'F#4', 'G4', 'G#4', 'A4'], // High E
    ['B3', 'C4', 'C#4', 'D4', 'D#4', 'E4'], // B
    ['G3', 'G#3', 'A3', 'A#3', 'B3', 'C4'], // G
    ['D3', 'D#3', 'E3', 'F3', 'F#3', 'G3'], // D
    ['A2', 'A#2', 'B2', 'C3', 'C#3', 'D3'], // A
    ['E2', 'F2', 'F#2', 'G2', 'G#2', 'A2'], // Low E
  ];
  return stringNotes[stringIndex][fret];
};

interface VirtualGuitarProps {
  onNotePress?: (stringIndex: number, fret: number) => void;
  className?: string;
}

export function VirtualGuitar({ onNotePress, className }: VirtualGuitarProps) {
  const [activeNote, setActiveNote] = useState<{ s: number; f: number } | null>(null);
  const { playGuitarNote } = useAudio();

  const handlePress = (sIdx: number, fIdx: number) => {
    const note = getNoteFromPosition(sIdx, fIdx);
    setActiveNote({ s: sIdx, f: fIdx });
    playGuitarNote(note);
    onNotePress?.(sIdx, fIdx);
    setTimeout(() => setActiveNote(null), 300); // Visual feedback auto-reset
  };

  return (
    <div className={cn("relative p-8 bg-[#2d1b14] rounded-3xl border-8 border-[#3d2b24] shadow-2xl overflow-hidden", className)}>
      {/* Wood Texture Simulation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, transparent 1px, transparent 50px)' }} />

      <div className="relative flex h-64 bg-[#1a0f0a] border-y border-[#3d2b24] p-4">
        {/* Frets */}
        {FRETS.map((fIdx) => (
          <div 
            key={`fret-${fIdx}`} 
            className="flex-1 border-r border-yellow-700/50 relative"
            style={{ minWidth: '80px' }}
          >
            {/* Fret wire */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-gray-400 to-gray-200 shadow-sm" />
            
            {/* Fret markers */}
            {[3, 5].includes(fIdx) && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-300/30 rounded-full" />
            )}

            {/* Note Slots */}
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {STRINGS.map((note, sIdx) => (
                <div 
                  key={`note-${sIdx}-${fIdx}`}
                  className="relative h-6 flex items-center justify-center cursor-pointer group"
                  onClick={() => handlePress(sIdx, fIdx)}
                >
                  {/* String */}
                  <div 
                    className={cn(
                      "absolute w-full bg-gradient-to-b transition-all duration-300",
                      sIdx < 2 ? "h-[1px] from-gray-300 via-gray-100 to-gray-300" : "h-[2px] from-yellow-600 via-yellow-200 to-yellow-600 shadow-sm",
                      activeNote?.s === sIdx && activeNote?.f === fIdx ? "scale-y-[3] shadow-lg shadow-primary-500/50" : "group-hover:scale-y-150"
                    )} 
                  />
                  
                  {/* Indicator */}
                  <AnimatePresence>
                    {activeNote?.s === sIdx && activeNote?.f === fIdx && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        exit={{ scale: 2, opacity: 0 }}
                        className="w-6 h-6 rounded-full bg-primary-500/80 shadow-lg z-10"
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* String Labels */}
        <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between py-5 z-20">
          {STRINGS.map((s) => (
            <span key={s} className="text-[10px] font-bold text-gray-500 bg-[#1a0f0a] px-1">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
