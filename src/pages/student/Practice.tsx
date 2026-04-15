import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ArrowLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { VirtualPiano } from '@/components/instruments/VirtualPiano';
import { VirtualGuitar } from '@/components/instruments/VirtualGuitar';
import { VirtualViolin } from '@/components/instruments/VirtualViolin';
import { VirtualDrums } from '@/components/instruments/VirtualDrums';
import { useAudio } from '@/hooks/useAudio';
import { cn } from '@/lib/utils';

export default function PracticePage() {
  const [selectedInstrument, setSelectedInstrument] = useState<'piano' | 'guitar' | 'violin' | 'drums' | null>(null);
  const { isAudioRunning, unlockAudio } = useAudio();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} /> Training Room
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Practice Zone</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Master your instrument at your own pace with real-time audio feedback.</p>
        </div>

        {!isAudioRunning && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={unlockAudio}
            className="px-6 py-3 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-2xl text-sm font-bold flex items-center gap-3 border border-amber-200 dark:border-amber-800 shadow-lg shadow-amber-500/10 transition-all pulse-amber"
          >
            <VolumeX size={20} /> Enable Interactive Audio
          </motion.button>
        )}
      </header>

      <AnimatePresence mode="wait">
        {!selectedInstrument ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Piano Option */}
            <motion.button
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedInstrument('piano')}
              className="group relative h-80 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl hover:shadow-primary-500/10 transition-all flex flex-col items-center justify-center p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-primary-50/50 dark:from-indigo-950/20 dark:to-primary-950/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Music size={48} />
              </div>
              <h2 className="text-3xl font-black mb-2 tracking-tight">Virtual Piano</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Full 88-key acoustic simulation</p>
              
              <div className="mt-8 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-full group-hover:bg-primary-600 group-hover:text-white transition-colors">
                Select Instrument
              </div>
            </motion.button>

            {/* Guitar Option */}
            <motion.button
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedInstrument('guitar')}
              className="group relative h-80 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all flex flex-col items-center justify-center p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-3xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Music size={48} />
              </div>
              <h2 className="text-3xl font-black mb-2 tracking-tight">Virtual Guitar</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">6-string acoustic fretboard</p>
              
              <div className="mt-8 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-full group-hover:bg-amber-600 group-hover:text-white transition-colors">
                Select Instrument
              </div>
            </motion.button>

            {/* Violin Option */}
            <motion.button
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedInstrument('violin')}
              className="group relative h-80 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl hover:shadow-red-500/10 transition-all flex flex-col items-center justify-center p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-rose-50/50 dark:from-red-950/20 dark:to-rose-950/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center text-red-600 dark:text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Music size={48} />
              </div>
              <h2 className="text-3xl font-black mb-2 tracking-tight">Virtual Violin</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Bowed fretless masterpiece</p>
              
              <div className="mt-8 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors">
                Select Instrument
              </div>
            </motion.button>

            {/* Drums Option */}
            <motion.button
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedInstrument('drums')}
              className="group relative h-80 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all flex flex-col items-center justify-center p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Music size={48} />
              </div>
              <h2 className="text-3xl font-black mb-2 tracking-tight">Virtual Drums</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">6-pad rhythmic launchpad</p>
              
              <div className="mt-8 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                Select Instrument
              </div>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="practice-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedInstrument(null)}
                className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              >
                <ArrowLeft size={18} /> Switch Instrument
              </button>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full text-xs font-bold shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {selectedInstrument.toUpperCase()} MODE ACTIVE
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 p-12 shadow-2xl relative overflow-hidden">
               {/* Unmute Overlay in Practice Zone */}
               {!isAudioRunning && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-40 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-md"
                >
                  <button
                    onClick={unlockAudio}
                    className="group flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800 hover:scale-105 transition-all"
                  >
                    <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 animate-pulse">
                      <VolumeX size={40} />
                    </div>
                    <div className="text-center">
                      <p className="font-black text-2xl text-gray-900 dark:text-white mb-1">Audio is Locked</p>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">Click to unlock instrument sounds</p>
                    </div>
                  </button>
                </motion.div>
              )}

              <div className="flex justify-start max-w-full overflow-x-auto pb-4 scroll-smooth custom-scrollbar">
                {selectedInstrument === 'piano' ? (
                  <VirtualPiano className="scale-110 origin-top pt-8" />
                ) : selectedInstrument === 'guitar' ? (
                  <VirtualGuitar className="scale-110 origin-top pt-8" />
                ) : selectedInstrument === 'violin' ? (
                  <VirtualViolin className="scale-110 origin-top pt-8" />
                ) : (
                  <VirtualDrums className="scale-110 origin-top pt-8" />
                )}
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-50 dark:border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400">Controls</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Click or tap any {selectedInstrument === 'piano' ? 'key' : 'string'} to hear the sound.</p>
                </div>
                <div className="space-y-2 text-center">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-primary-600">Quick Tip</h4>
                  <p className="text-sm italic text-gray-500">Practice chords slowly to build muscle memory before speeding up.</p>
                </div>
                <div className="space-y-2 text-right">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400">Sound Quality</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-bold flex items-center justify-end gap-2">
                    <Volume2 size={16} /> Synthesis Mode: Active
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
