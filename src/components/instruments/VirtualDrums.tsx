import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAudio } from '@/hooks/useAudio';

interface DrumPadProps {
  label: string;
  type: 'kick' | 'snare' | 'hihat';
  color: string;
  onPress: (type: 'kick' | 'snare' | 'hihat') => void;
}

function DrumPad({ label, type, color, onPress }: DrumPadProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9, rotate: 2 }}
      onClick={() => onPress(type)}
      className={cn(
        "h-32 rounded-3xl flex flex-col items-center justify-center gap-2 border-b-8 transition-all shadow-xl",
        color
      )}
    >
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-xl">
        {label[0]}
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-white/80">{label}</span>
    </motion.button>
  );
}

export function VirtualDrums({ onPadPress, className }: { onPadPress?: (type: 'kick' | 'snare' | 'hihat') => void; className?: string }) {
  const { playDrumSound } = useAudio();

  const handlePress = (type: 'kick' | 'snare' | 'hihat') => {
    playDrumSound(type);
    onPadPress?.(type);
  };

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-6 p-8 bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl", className)}>
      <DrumPad label="Kick" type="kick" color="bg-indigo-600 border-indigo-800" onPress={handlePress} />
      <DrumPad label="Snare" type="snare" color="bg-rose-600 border-rose-800" onPress={handlePress} />
      <DrumPad label="Hi-Hat" type="hihat" color="bg-amber-500 border-amber-700" onPress={handlePress} />
      <DrumPad label="Floor Tom" type="kick" color="bg-indigo-700 border-indigo-900" onPress={handlePress} />
      <DrumPad label="Clap" type="snare" color="bg-rose-500 border-rose-700" onPress={handlePress} />
      <DrumPad label="Closed Hat" type="hihat" color="bg-amber-400 border-amber-600" onPress={handlePress} />
    </div>
  );
}
