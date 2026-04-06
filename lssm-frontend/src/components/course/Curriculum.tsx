import { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Lock, CheckCircle, FileText, Music } from 'lucide-react';
import { cn, formatDuration } from '@/lib/utils';
import type { Module, Lesson } from '@/types';

interface CurriculumProps {
  modules: Module[];
  completedLessons?: string[];
  currentLessonId?: string;
  onLessonClick?: (lesson: Lesson, moduleId: string) => void;
}

const LESSON_ICONS: Record<string, React.ElementType> = {
  video: Play,
  live: Play,
  assignment: FileText,
  quiz: CheckCircle,
  audio: Music,
};

function LessonRow({ lesson, isCompleted, isCurrent, onLessonClick }:
  { lesson: Lesson; isCompleted: boolean; isCurrent: boolean; onLessonClick?: () => void }) {
  const Icon = LESSON_ICONS[lesson.type] || Play;
  const isLocked = !lesson.isPreview && !isCompleted && !isCurrent && onLessonClick === undefined;

  return (
    <button
      onClick={onLessonClick}
      disabled={isLocked}
      className={cn(
        'flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm transition hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg',
        isCurrent && 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300',
        isLocked && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className={cn('w-7 h-7 rounded-full flex items-center justify-center shrink-0',
        isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
        isCurrent ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' :
        'bg-gray-100 dark:bg-gray-800 text-gray-500')}>
        {isCompleted ? <CheckCircle size={14} /> : isLocked ? <Lock size={12} /> : <Icon size={13} />}
      </div>
      <span className="flex-1 truncate">{lesson.title}</span>
      {lesson.duration && <span className="text-xs text-gray-400 shrink-0">{formatDuration(lesson.duration)}</span>}
      {lesson.isPreview && !isCompleted && <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded font-medium shrink-0">Preview</span>}
    </button>
  );
}

export function Curriculum({ modules, completedLessons = [], currentLessonId, onLessonClick }: CurriculumProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set([modules[0]?.id]));

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const totalDuration = modules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + (l.duration || 0), 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
        <span>{modules.length} modules • {totalLessons} lessons</span>
        <span>{formatDuration(totalDuration)} total</span>
      </div>

      <div className="space-y-2">
        {modules.map((mod) => {
          const isOpen = expanded.has(mod.id);
          const completed = mod.lessons.filter((l) => completedLessons.includes(l.id)).length;
          return (
            <div key={mod.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(mod.id)}
                className="flex items-center gap-3 w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{mod.title}</p>
                  <p className="text-xs text-gray-400">{completed}/{mod.lessons.length} completed</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">
                  {formatDuration(mod.lessons.reduce((s, l) => s + (l.duration || 0), 0))}
                </span>
              </button>
              {isOpen && (
                <div className="p-2 space-y-0.5">
                  {mod.lessons.map((lesson) => (
                    <LessonRow
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={completedLessons.includes(lesson.id)}
                      isCurrent={lesson.id === currentLessonId}
                      onLessonClick={onLessonClick ? () => onLessonClick(lesson, mod.id) : undefined}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
