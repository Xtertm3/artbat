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
  { note: 'C', isBlack: false },
  { note: 'C#', isBlack: true },
  { note: 'D', isBlack: false },
  { note: 'D#', isBlack: true },
  { note: 'E', isBlack: false },
  { note: 'F', isBlack: false },
  { note: 'F#', isBlack: true },
  { note: 'G', isBlack: false },
  { note: 'G#', isBlack: true },
  { note: 'A', isBlack: false },
  { note: 'A#', isBlack: true },
  { note: 'B', isBlack: false },
  { note: 'C2', isBlack: false, label: 'C' },
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
    <div className={cn("flex justify-center items-start p-8 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-x-auto", className)}>
      <div className="flex relative min-w-max h-64 items-start">
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
