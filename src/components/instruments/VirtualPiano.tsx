import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KeyProps {
  note: string;
  isBlack?: boolean;
  isPressed: boolean;
  onPress: (note: string) => void;
  onRelease: (note: string) => void;
  label?: string;
}

function PianoKey({ note, isBlack, isPressed, onPress, onRelease, label }: KeyProps) {
  return (
    <div
      className={cn(
        "relative select-none transition-all duration-75 cursor-pointer flex flex-col items-center justify-end pb-4",
        isBlack 
          ? "z-10 w-8 h-32 -mx-4 rounded-b-md bg-gray-900 border-x border-gray-700 shadow-lg" 
          : "w-14 h-48 bg-white border border-gray-200 rounded-b-xl shadow-md",
        isPressed && (isBlack ? "bg-primary-600 scale-[0.98] translate-y-1" : "bg-gray-100 scale-[0.98] translate-y-1 shadow-inner"),
        !isPressed && (isBlack ? "hover:bg-gray-800" : "hover:bg-gray-50")
      )}
      onMouseDown={() => onPress(note)}
      onMouseUp={() => onRelease(note)}
      onMouseLeave={() => isPressed && onRelease(note)}
      onTouchStart={(e) => { e.preventDefault(); onPress(note); }}
      onTouchEnd={(e) => { e.preventDefault(); onRelease(note); }}
    >
      {isPressed && !isBlack && (
        <motion.div 
          layoutId="pressed-indicator"
          className="absolute inset-0 bg-primary-500/10 rounded-b-xl"
        />
      )}
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-tighter",
        isBlack ? "text-gray-400" : "text-gray-300"
      )}>
        {label || note}
      </span>
    </div>
  );
}

const NOTES = [
  // Octave 2
  { note: 'C2', isBlack: false, label: 'C2' },
  { note: 'C#2', isBlack: true, label: 'C#' },
  { note: 'D2', isBlack: false, label: 'D' },
  { note: 'D#2', isBlack: true, label: 'D#' },
  { note: 'E2', isBlack: false, label: 'E' },
  { note: 'F2', isBlack: false, label: 'F' },
  { note: 'F#2', isBlack: true, label: 'F#' },
  { note: 'G2', isBlack: false, label: 'G' },
  { note: 'G#2', isBlack: true, label: 'G#' },
  { note: 'A2', isBlack: false, label: 'A' },
  { note: 'A#2', isBlack: true, label: 'A#' },
  { note: 'B2', isBlack: false, label: 'B' },
  // Octave 3
  { note: 'C3', isBlack: false, label: 'C3' },
  { note: 'C#3', isBlack: true, label: 'C#' },
  { note: 'D3', isBlack: false, label: 'D' },
  { note: 'D#3', isBlack: true, label: 'D#' },
  { note: 'E3', isBlack: false, label: 'E' },
  { note: 'F3', isBlack: false, label: 'F' },
  { note: 'F#3', isBlack: true, label: 'F#' },
  { note: 'G3', isBlack: false, label: 'G' },
  { note: 'G#3', isBlack: true, label: 'G#' },
  { note: 'A3', isBlack: false, label: 'A' },
  { note: 'A#3', isBlack: true, label: 'A#' },
  { note: 'B3', isBlack: false, label: 'B' },
  // Octave 4
  { note: 'C4', isBlack: false, label: 'C4' },
  { note: 'C#4', isBlack: true, label: 'C#' },
  { note: 'D4', isBlack: false, label: 'D' },
  { note: 'D#4', isBlack: true, label: 'D#' },
  { note: 'E4', isBlack: false, label: 'E' },
  { note: 'F4', isBlack: false, label: 'F' },
  { note: 'F#4', isBlack: true, label: 'F#' },
  { note: 'G4', isBlack: false, label: 'G' },
  { note: 'G#4', isBlack: true, label: 'G#' },
  { note: 'A4', isBlack: false, label: 'A' },
  { note: 'A#4', isBlack: true, label: 'A#' },
  { note: 'B4', isBlack: false, label: 'B' },
  // Octave 5
  { note: 'C5', isBlack: false, label: 'C5' },
  { note: 'C#5', isBlack: true, label: 'C#' },
  { note: 'D5', isBlack: false, label: 'D' },
  { note: 'D#5', isBlack: true, label: 'D#' },
  { note: 'E5', isBlack: false, label: 'E' },
  { note: 'F5', isBlack: false, label: 'F' },
  { note: 'F#5', isBlack: true, label: 'F#' },
  { note: 'G5', isBlack: false, label: 'G' },
  { note: 'G#5', isBlack: true, label: 'G#' },
  { note: 'A5', isBlack: false, label: 'A' },
  { note: 'A#5', isBlack: true, label: 'A#' },
  { note: 'B5', isBlack: false, label: 'B' },
  // Octave 6
  { note: 'C6', isBlack: false, label: 'C6' },
  { note: 'C#6', isBlack: true, label: 'C#' },
  { note: 'D6', isBlack: false, label: 'D' },
  { note: 'D#6', isBlack: true, label: 'D#' },
  { note: 'E6', isBlack: false, label: 'E' },
  { note: 'F6', isBlack: false, label: 'F' },
  { note: 'F#6', isBlack: true, label: 'F#' },
  { note: 'G6', isBlack: false, label: 'G' },
  { note: 'G#6', isBlack: true, label: 'G#' },
  { note: 'A6', isBlack: false, label: 'A' },
  { note: 'A#6', isBlack: true, label: 'A#' },
  { note: 'B6', isBlack: false, label: 'B' },
  // Octave 7 start
  { note: 'C7', isBlack: false, label: 'C7' },
];

import { useAudio } from '@/hooks/useAudio';

interface VirtualPianoProps {
  onKeyPress?: (note: string) => void;
  highlightNotes?: string[];
  className?: string;
}

export function VirtualPiano({ onKeyPress, highlightNotes = [], className }: VirtualPianoProps) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const { playPianoNote, stopPianoNote } = useAudio();

  const handlePress = (note: string) => {
    setPressedKeys(prev => new Set(prev).add(note));
    playPianoNote(note);
    onKeyPress?.(note);
  };

  const handleRelease = (note: string) => {
    setPressedKeys(prev => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });
    stopPianoNote(note);
  };

  return (
    <div className={cn("flex justify-start items-start p-8 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-x-auto custom-scrollbar", className)}>
      <div className="flex relative min-w-max h-64 items-start py-4">
        {NOTES.map((info, idx) => (
          <PianoKey
            key={`${info.note}-${idx}`}
            note={info.note}
            isBlack={info.isBlack}
            label={info.label}
            isPressed={pressedKeys.has(info.note) || highlightNotes.includes(info.note)}
            onPress={handlePress}
            onRelease={handleRelease}
          />
        ))}
      </div>
    </div>
  );
}
