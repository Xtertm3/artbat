import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import {
  COURSE_CATEGORIES,
  MUSIC_SUBCATEGORIES,
  DANCE_SUBCATEGORIES,
  VOCAL_SUBCATEGORIES,
} from '@/config/constants';

type Tab = 'music' | 'dance' | 'vocals' | 'theater';

const THEATER_FOCUS = [
  { id: 'voice', label: 'Voice & Projection', emoji: '🎙️' },
  { id: 'acting', label: 'Acting Basics', emoji: '🎭' },
  { id: 'stage', label: 'Stage Presence', emoji: '✨' },
  { id: 'speech', label: 'Public Speaking', emoji: '🗣️' },
] as const;

const TAB_STYLES: Record<Tab, { bg: string; chip: string; text: string; accent: string }> = {
  music: {
    bg: 'from-violet-50 via-fuchsia-50 to-white dark:from-violet-950/40 dark:via-fuchsia-950/30 dark:to-gray-950',
    chip: 'bg-violet-100/80 dark:bg-violet-900/40 border-violet-300 dark:border-violet-700',
    text: 'text-violet-700 dark:text-violet-200',
    accent: 'Learn instruments from beginner to performance level',
  },
  dance: {
    bg: 'from-rose-50 via-orange-50 to-white dark:from-rose-950/40 dark:via-orange-950/30 dark:to-gray-950',
    chip: 'bg-rose-100/80 dark:bg-rose-900/40 border-rose-300 dark:border-rose-700',
    text: 'text-rose-700 dark:text-rose-200',
    accent: 'Move from fundamentals to choreography confidence',
  },
  vocals: {
    bg: 'from-sky-50 via-cyan-50 to-white dark:from-sky-950/40 dark:via-cyan-950/30 dark:to-gray-950',
    chip: 'bg-sky-100/80 dark:bg-sky-900/40 border-sky-300 dark:border-sky-700',
    text: 'text-sky-700 dark:text-sky-200',
    accent: 'Train tone, control, and style across vocal traditions',
  },
  theater: {
    bg: 'from-amber-50 via-yellow-50 to-white dark:from-amber-950/40 dark:via-yellow-950/20 dark:to-gray-950',
    chip: 'bg-amber-100/80 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700',
    text: 'text-amber-700 dark:text-amber-200',
    accent: 'Build voice, presence, and stage confidence',
  },
};

const IMAGE_BY_GROUP: Record<string, string> = {
  String: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80',
  'Indian String': 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
  Keyboard: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80',
  Percussion: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1200&q=80',
  Wind: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?auto=format&fit=crop&w=1200&q=80',
  'Indian Wind': 'https://images.unsplash.com/photo-1461783436728-0a9217714694?auto=format&fit=crop&w=1200&q=80',
  'Indian Classical': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=1200&q=80',
  Folk: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
  Western: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  Carnatic: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1200&q=80',
  Bollywood: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
  'Semi-Classical': 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
  Theater: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80',
};

const DESCRIPTION_BY_GROUP: Record<string, string> = {
  String: 'Build finger control, tone clarity, and performance confidence.',
  'Indian String': 'Master ragas, meends, and expressive classical phrasing.',
  Keyboard: 'Learn chords, scales, accompaniment, and musical arrangement.',
  Percussion: 'Strengthen rhythm timing, hand techniques, and groove control.',
  Wind: 'Improve breath support, articulation, and melodic flow.',
  'Indian Wind': 'Develop classical phrasing and ornamentation for Indian forms.',
  'Indian Classical': 'Learn traditional foundations with correct posture and form.',
  Folk: 'Practice energetic regional styles with clean movement basics.',
  Western: 'Train modern technique, musicality, and stage presentation.',
  Carnatic: 'Follow structured traditional methods with rhythmic precision.',
  Bollywood: 'Learn cinematic style, expression, and choreography flow.',
  'Semi-Classical': 'Blend classical discipline with expressive contemporary style.',
  Theater: 'Strengthen presence, projection, and storytelling delivery.',
};

function getImageByGroup(group: string): string {
  return IMAGE_BY_GROUP[group] || IMAGE_BY_GROUP.Theater;
}

function getDescriptionByGroup(group: string): string {
  return DESCRIPTION_BY_GROUP[group] || 'Structured learning path with guided outcomes.';
}

export default function ExploreArtsPage() {
  const [tab, setTab] = useState<Tab>('music');

  const items = useMemo(() => {
    if (tab === 'music') return MUSIC_SUBCATEGORIES;
    if (tab === 'dance') return DANCE_SUBCATEGORIES;
    if (tab === 'vocals') return VOCAL_SUBCATEGORIES;
    return THEATER_FOCUS;
  }, [tab]);

  const style = TAB_STYLES[tab];

  return (
    <div className="min-h-screen">
      <section className={`bg-gradient-to-br ${style.bg} border-b border-gray-200/70 dark:border-gray-800`}>
        <div className="container py-14">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              <Compass size={14} /> Explore Paths
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mt-3 mb-4">Choose Your Creative Direction</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{style.accent}</p>
          </div>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {COURSE_CATEGORIES.map((category) => {
              const active = tab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setTab(category.id)}
                  className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                    active
                      ? 'border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-900 shadow-lg'
                      : 'border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900'
                  }`}
                >
                  <p className="text-2xl mb-1">{category.icon}</p>
                  <p className="font-semibold">{category.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="flex items-center justify-between mb-5 gap-4">
          <h2 className="text-2xl font-bold capitalize">{tab} Specializations</h2>
          <Link
            to={`${ROUTES.COURSES}?category=${tab}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white font-semibold text-sm"
          >
            View Courses <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => {
            const sub = 'id' in item ? item.id : '';
            const group = 'group' in item ? item.group : 'Theater';
            return (
              <article
                key={item.id}
                className={`rounded-xl border overflow-hidden transition hover:shadow-lg ${style.chip}`}
              >
                <div className="h-28 relative">
                  <img
                    src={getImageByGroup(group)}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
                  <div className="absolute left-3 bottom-2 text-white">
                    <p className="text-xl">{item.emoji}</p>
                  </div>
                </div>

                <div className="p-4">
                  <p className={`font-semibold text-lg ${style.text}`}>{item.label}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{group}</p>

                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-xs text-gray-400 leading-relaxed max-w-[70%]">
                      {getDescriptionByGroup(group)}
                    </p>
                    <Link
                      to={`${ROUTES.COURSES}?category=${tab}${sub ? `&subcategory=${sub}` : ''}`}
                      className="shrink-0 inline-flex items-center rounded-lg px-3 py-1.5 gradient-bg text-white text-xs font-semibold"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
