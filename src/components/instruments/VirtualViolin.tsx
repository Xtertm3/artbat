import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAudio } from '@/hooks/useAudio';

interface ViolinStringProps {
  note: string;
  onPress: (note: string) => void;
  onRelease: (note: string) => void;
  isPressed: boolean;
}

function ViolinString({ note, onPress, onRelease, isPressed }: ViolinStringProps) {
  return (
    <div 
      className="relative flex-1 group cursor-pointer"
      onMouseDown={() => onPress(note)}
      onMouseUp={() => onRelease(note)}
      onMouseLeave={() => isPressed && onRelease(note)}
      onTouchStart={(e) => { e.preventDefault(); onPress(note); }}
      onTouchEnd={(e) => { e.preventDefault(); onRelease(note); }}
    >
      {/* String Visual */}
      <div className={cn(
        "absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 transition-all duration-75",
        isPressed ? "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)] w-[3px]" : "bg-gray-300 group-hover:bg-gray-200"
      )} />
      
      {/* Finger Position Indicator */}
      {isPressed && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-500/30 border-2 border-primary-500 shadow-xl z-20"
        />
      )}
    </div>
  );
}

const VIOLIN_STRINGS = [
  { note: 'E5', label: 'E' },
  { note: 'A4', label: 'A' },
  { note: 'D4', label: 'D' },
  { note: 'G3', label: 'G' },
];

export function VirtualViolin({ onNotePress, className }: { onNotePress?: (note: string) => void; className?: string }) {
  const [activeString, setActiveString] = useState<string | null>(null);
  const { playViolinNote, stopViolinNote } = useAudio();

  const handlePress = (note: string) => {
    setActiveString(note);
    playViolinNote(note);
    onNotePress?.(note);
  };

  const handleRelease = (note: string) => {
    setActiveString(null);
    stopViolinNote(note);
  };

  return (
    <div className={cn("relative w-64 h-96 bg-[#3d1c02] rounded-t-[100px] rounded-b-xl border-4 border-[#2a1301] shadow-2xl overflow-hidden p-6", className)}>
      {/* Wood Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
      
      {/* Fingerboard */}
      <div className="absolute inset-x-8 inset-y-0 bg-[#1a0d02] shadow-inner flex">
        {VIOLIN_STRINGS.map((s) => (
          <ViolinString 
            key={s.note} 
            note={s.note} 
            isPressed={activeString === s.note}
            onPress={handlePress}
            onRelease={handleRelease}
          />
        ))}
      </div>

      {/* String Labels */}
      <div className="absolute bottom-4 inset-x-8 flex justify-between px-2 text-[10px] font-black text-amber-900/40 uppercase tracking-widest">
        {VIOLIN_STRINGS.map(s => <span key={s.note}>{s.label}</span>)}
      </div>
    </div>
  );
}
