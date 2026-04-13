import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Clock, CheckCircle2, ChevronRight, Play, Star, BookMarked, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { VirtualAssessment } from '@/components/student/VirtualAssessment';
import { cn } from '@/lib/utils';
import { useAudio } from '@/hooks/useAudio';

interface Assignment {
  id: string;
  title: string;
  courseName: string;
  type: string;
  instrument: 'piano' | 'guitar';
  difficulty: string;
  timeEst: string;
  points: number;
  status: string;
  score?: number;
  questions?: {
    id: string;
    type: 'piano' | 'guitar';
    instruction: string;
    targetNote?: string;
    guitarPosition?: { s: number; f: number };
  }[];
}

// Mock data for assignments
const DEMO_ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    title: 'Guitar Chords Mastery',
    courseName: 'Guitar Foundations Bootcamp',
    type: 'Practical',
    instrument: 'guitar',
    difficulty: 'Beginner',
    timeEst: '10 min',
    points: 50,
    status: 'pending',
    questions: [
      { id: 'q1', type: 'guitar', instruction: 'Press the E2 String (Open position)', guitarPosition: { s: 5, f: 0 } },
      { id: 'q2', type: 'guitar', instruction: 'Press the 3rd Fret on the E2 String', guitarPosition: { s: 5, f: 3 } },
      { id: 'q3', type: 'guitar', instruction: 'Press the 1st Fret on the B3 String', guitarPosition: { s: 1, f: 1 } },
    ]
  },
  {
    id: 'a2',
    title: 'Piano Key Recognition',
    courseName: 'Piano for Beginners',
    type: 'Quiz',
    instrument: 'piano',
    difficulty: 'Beginner',
    timeEst: '5 min',
    points: 30,
    status: 'pending',
    questions: [
      { id: 'p1', type: 'piano', instruction: 'Find and press the middle C key', targetNote: 'C' },
      { id: 'p2', type: 'piano', instruction: 'Press the F key', targetNote: 'F' },
      { id: 'p3', type: 'piano', instruction: 'Find the C# (Sharp) key', targetNote: 'C#' },
    ]
  },
  {
    id: 'a3',
    title: 'Rhythm Basics',
    courseName: 'Music Theory 101',
    type: 'Theory',
    instrument: 'piano',
    difficulty: 'Intermediate',
    timeEst: '15 min',
    points: 100,
    status: 'completed',
    score: 95,
  }
];

export default function AssignmentsPage() {
  const { unlockAudio, isAudioRunning } = useAudio();
  const [activeAssignment, setActiveAssignment] = useState<typeof DEMO_ASSIGNMENTS[0] | null>(null);

  const handleComplete = (score: number) => {
    console.log('Assessment complete with score:', score);
    // In a real app, this would hit the API
    setTimeout(() => setActiveAssignment(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} /> Student Dashboard
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Your Assignments</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Test your skills with interactive assessments and earn certifications.</p>
        </div>
        
        <div className="flex items-center gap-4">
          {!isAudioRunning && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={unlockAudio}
              className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-bold flex items-center gap-2 border border-amber-200 dark:border-amber-800 shadow-sm transition-all"
            >
              <VolumeX size={18} /> Enable Audio
            </motion.button>
          )}
          
          <div className="flex items-center gap-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 gradient-bg flex items-center justify-center text-white text-xs font-bold shadow-md">
                   U{i}
                 </div>
               ))}
            </div>
            <div className="text-sm">
              <span className="font-bold text-primary-600">12 Pending Tasks</span>
              <p className="text-gray-400 text-xs">Keep up the great work!</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            {activeAssignment ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="col-span-2"
              >
                <button 
                  onClick={() => setActiveAssignment(null)}
                  className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition"
                >
                  <ChevronRight size={16} className="rotate-180" /> Back to list
                </button>
                <VirtualAssessment 
                  title={activeAssignment.title}
                  questions={activeAssignment.questions || []}
                  onComplete={handleComplete}
                />
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {DEMO_ASSIGNMENTS.filter(a => a.status !== 'completed').map((assignment, idx) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:shadow-2xl hover:shadow-primary-500/5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest",
                            assignment.difficulty === 'Beginner' ? "bg-green-100 text-green-600" : "bg-primary-100 text-primary-600"
                          )}>
                            {assignment.difficulty}
                          </span>
                          <span className="text-gray-300 dark:text-gray-700">•</span>
                          <span className="text-xs text-gray-400 font-bold">{assignment.instrument.toUpperCase()}</span>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-primary-600 transition-colors">{assignment.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                          <BookOpen size={14} /> {assignment.courseName}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Potential</p>
                          <p className="text-lg font-black text-amber-500">+{assignment.points} XP</p>
                        </div>
                        <button 
                          onClick={() => setActiveAssignment(assignment)}
                          className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:bg-primary-600 hover:text-white transition-all flex items-center gap-2 group/btn shadow-lg shadow-black/5"
                        >
                          Start <Play size={16} className="fill-current group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-6 border-t border-gray-50 dark:border-gray-800/50 pt-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                        <Clock size={14} /> {assignment.timeEst}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                        <Award size={14} /> {assignment.type}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
              <Award size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Certification Path</h3>
            <p className="text-white/80 text-sm mb-6">Complete 5 more assessments to unlock your "Grade 1 Music Fundamentals" certificate.</p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-white w-3/5 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            <p className="text-xs text-white/60 font-medium">3/5 Completed</p>
          </section>

          <section className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-500" /> Completed
            </h3>
            <div className="space-y-4">
              {DEMO_ASSIGNMENTS.filter(a => a.status === 'completed').map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">{a.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{a.score}% Score</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <CheckCircle2 size={16} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
             <h3 className="font-bold mb-4 flex items-center gap-2 text-amber-500">
              <Star size={18} /> Top Performers
            </h3>
            <div className="space-y-4">
               {[
                 { name: 'Alex Johnson', xp: '2450', rank: 1 },
                 { name: 'Sarah Miller', xp: '2320', rank: 2 },
                 { name: 'David Chen', xp: '2100', rank: 3 },
               ].map(user => (
                 <div key={user.rank} className="flex items-center gap-3">
                   <div className={cn(
                     "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black",
                     user.rank === 1 ? "bg-yellow-400 text-yellow-900" : "bg-gray-100 text-gray-500"
                   )}>
                     {user.rank}
                   </div>
                   <div className="flex-1">
                     <p className="text-xs font-bold">{user.name}</p>
                     <p className="text-[10px] text-gray-400">{user.xp} XP</p>
                   </div>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
