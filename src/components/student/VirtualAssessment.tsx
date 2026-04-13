import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, RefreshCw, Music, CheckCircle2, XCircle, Star } from 'lucide-react';
import { VirtualPiano } from '../instruments/VirtualPiano';
import { VirtualGuitar } from '../instruments/VirtualGuitar';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Question {
  id: string;
  type: 'piano' | 'guitar';
  instruction: string;
  targetNote?: string;
  targetChord?: string[]; // For piano chords or guitar positions
  guitarPosition?: { s: number; f: number };
}

interface VirtualAssessmentProps {
  questions: Question[];
  onComplete: (score: number) => void;
  title: string;
}

import { useAudio } from '@/hooks/useAudio';

export function VirtualAssessment({ questions, onComplete, title }: VirtualAssessmentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { isAudioLoaded } = useAudio();

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (completed) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899']
      });
    }
  }, [completed]);

  const handlePianoInput = (note: string) => {
    if (status !== 'idle') return;

    if (note === currentQuestion.targetNote) {
      handleSuccess();
    } else {
      handleFail();
    }
  };

  const handleGuitarInput = (sIdx: number, fIdx: number) => {
    if (status !== 'idle') return;

    if (currentQuestion.guitarPosition?.s === sIdx && currentQuestion.guitarPosition?.f === fIdx) {
      handleSuccess();
    } else {
      handleFail();
    }
  };

  const handleSuccess = () => {
    setStatus('success');
    setScore(prev => prev + 10);
    setTimeout(nextQuestion, 1500);
  };

  const handleFail = () => {
    setStatus('fail');
    setAttempts(prev => prev + 1);
    setTimeout(() => setStatus('idle'), 1000);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setStatus('idle');
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center space-y-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl"
      >
        <div className="w-24 h-24 bg-yellow-400/20 rounded-full flex items-center justify-center mb-4">
          <Trophy size={48} className="text-yellow-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">Assessment Complete!</h2>
          <p className="text-gray-500 dark:text-gray-400">Amazing job! You've mastered these skills.</p>
        </div>
        <div className="flex gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl min-w-[120px]">
            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Total Score</p>
            <p className="text-2xl font-bold text-primary-600">{score}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl min-w-[120px]">
            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Accuracy</p>
            <p className="text-2xl font-bold text-green-600">
              {Math.round((questions.length / (questions.length + attempts)) * 100)}%
            </p>
          </div>
        </div>
        <button 
          onClick={() => onComplete(score)}
          className="mt-4 px-8 py-3 gradient-bg text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg shadow-primary-500/30 flex items-center gap-2"
        >
          Check out more Assignments <ArrowRight size={20} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-white">
            <Music size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-gray-500">Question {currentIndex + 1} of {questions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase">Points</p>
            <p className="text-xl font-black text-primary-600 tracking-tight">{score}</p>
          </div>
          <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase">Attempts</p>
            <p className="text-xl font-black text-amber-500 tracking-tight">{attempts}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
        {/* Instruction Bar */}
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 text-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative z-10"
            >
              <h2 className="text-2xl font-bold mb-2">{currentQuestion.instruction}</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider">
                  {currentQuestion.type}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-500">Click to interact</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Background Highlight */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 gradient-bg" />
          </div>
        </div>

        {/* Instrument Container */}
        <div className="p-12 relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {!isAudioLoaded ? (
               <motion.div 
                 key="audio-loader"
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
               >
                 <div className="flex flex-col items-center gap-4">
                   <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                   <div className="text-center">
                     <p className="font-bold text-lg">Initializing Instruments...</p>
                     <p className="text-sm text-gray-500">Tuning strings and keys for you</p>
                   </div>
                 </div>
               </motion.div>
            ) : (
              <motion.div
                key={currentQuestion.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.05, opacity: 0 }}
                className="flex justify-center"
              >
                {currentQuestion.type === 'piano' ? (
                  <VirtualPiano 
                    onKeyPress={handlePianoInput} 
                    className={cn(
                      "transition-all duration-300",
                      status === 'success' && "ring-8 ring-green-500/20 scale-105",
                      status === 'fail' && "ring-8 ring-red-500/20 translate-x-1"
                    )}
                  />
                ) : (
                  <VirtualGuitar 
                    onNotePress={handleGuitarInput}
                    className={cn(
                      "transition-all duration-300",
                      status === 'success' && "ring-8 ring-green-500/20 scale-105",
                      status === 'fail' && "ring-8 ring-red-500/20 translate-x-1"
                    )}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback Overlay */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none bg-green-500/10 backdrop-blur-[2px] z-50 rounded-b-3xl"
              >
                <div className="flex flex-col items-center">
                  <CheckCircle2 size={80} className="text-green-500 mb-2 drop-shadow-lg" />
                  <p className="text-green-600 font-black text-2xl uppercase tracking-widest">Correct!</p>
                  <p className="text-green-600/80 font-bold">+10 Points</p>
                </div>
              </motion.div>
            )}
            {status === 'fail' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none bg-red-500/10 backdrop-blur-[2px] z-50 rounded-b-3xl"
              >
                <div className="flex flex-col items-center">
                  <XCircle size={80} className="text-red-500 mb-2 drop-shadow-lg" />
                  <p className="text-red-600 font-black text-2xl uppercase tracking-widest">Wrong Key!</p>
                  <p className="text-red-600/80 font-bold">Try again</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Footer */}
      <div className="flex items-center gap-4 px-2">
        {questions.map((q, i) => (
          <div 
            key={q.id}
            className={cn(
              "flex-1 h-2 rounded-full transition-all duration-500",
              i < currentIndex ? "gradient-bg shadow-sm" : 
              i === currentIndex ? "bg-gray-300 shadow-inner" : "bg-gray-200 dark:bg-gray-800"
            )}
          />
        ))}
      </div>
    </div>
  );
}
