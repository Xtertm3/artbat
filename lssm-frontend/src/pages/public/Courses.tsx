import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { CourseGrid } from '@/components/course/CourseGrid';
import { COURSE_CATEGORIES, SKILL_LEVELS, SORT_OPTIONS, LANGUAGE_OPTIONS } from '@/config/constants';
import { MOCK_COURSES } from '@/config/mockData';
import { useCourses } from '@/hooks/useCourses';
import type { Course, CourseFilters, SkillLevel } from '@/types';

function applyFilters(courses: Course[], filters: CourseFilters): Course[] {
  const search = filters.search?.trim().toLowerCase();
  const minPrice = filters.minPrice ?? 0;
  const maxPrice = filters.maxPrice ?? Number.MAX_SAFE_INTEGER;

  let result = courses.filter((course) => {
    const searchMatch =
      !search ||
      course.title.toLowerCase().includes(search) ||
      course.instructor.name.toLowerCase().includes(search) ||
      course.subcategory?.toLowerCase().includes(search) ||
      course.tags.some((tag) => tag.toLowerCase().includes(search));

    const categoryMatch = !filters.category || course.category === filters.category;
    const levelMatch = !filters.level || course.level === filters.level;
    const priceMatch = course.price >= minPrice && course.price <= maxPrice;
    const languageMatch = !filters.language || course.language === filters.language;
    const subcategoryMatch = !filters.subcategory || course.subcategory === filters.subcategory;

    return searchMatch && categoryMatch && levelMatch && priceMatch && languageMatch && subcategoryMatch;
  });

  switch (filters.sortBy) {
    case 'price_asc':
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result = [...result].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      break;
    default:
      result = [...result].sort((a, b) => b.totalStudents - a.totalStudents);
  }

  return result;
}

export default function CoursesPage() {
  const [params, setParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(params.get('search') || '');

  const filters: CourseFilters = useMemo(() => ({
    category: (params.get('category') as CourseFilters['category']) || undefined,
    level: (params.get('level') as SkillLevel) || undefined,
    search: params.get('search') || undefined,
    language: params.get('language') || undefined,
    subcategory: params.get('subcategory') || undefined,
    sortBy: (params.get('sortBy') as CourseFilters['sortBy']) || 'popular',
  }), [params]);

  const { data, isLoading } = useCourses(filters);
  const sourceCourses = data?.courses?.length ? data.courses : MOCK_COURSES;
  const filteredCourses = useMemo(() => applyFilters(sourceCourses, filters), [sourceCourses, filters]);

  const updateParam = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (!value) next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const activeFilters = [
    filters.category && { key: 'category', label: `Category: ${filters.category}` },
    filters.level && { key: 'level', label: `Level: ${filters.level}` },
    filters.language && { key: 'language', label: `Language: ${filters.language}` },
    filters.subcategory && { key: 'subcategory', label: `Type: ${filters.subcategory}` },
    filters.search && { key: 'search', label: `"${filters.search}"` },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <div className="container py-10 space-y-7">
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-800 text-white p-7 lg:p-10">
        <p className="text-sm text-white/80 mb-2 uppercase tracking-[0.2em]">Discover Programs</p>
        <h1 className="text-4xl lg:text-5xl font-bold mb-3">Find Your Next Course</h1>
        <p className="text-white/90 text-base lg:text-lg max-w-2xl">
          Explore curated classes across music, dance, vocals, and theater with structured pathways.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 lg:p-6 space-y-5 shadow-sm">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateParam('search', searchInput || undefined);
            }}
            placeholder="Search by title, instrument, instructor, or tag…"
            className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-11 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
          <SlidersHorizontal size={16} />
          Filters
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <select
            value={filters.category || ''}
            onChange={(e) => updateParam('category', e.target.value || undefined)}
            className="h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 text-sm"
          >
            <option value="">All Categories</option>
            {COURSE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
            ))}
          </select>

          <select
            value={filters.level || ''}
            onChange={(e) => updateParam('level', e.target.value || undefined)}
            className="h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 text-sm"
          >
            <option value="">All Levels</option>
            {SKILL_LEVELS.map((level) => (
              <option key={level.id} value={level.id}>{level.label}</option>
            ))}
          </select>

          <select
            value={filters.language || ''}
            onChange={(e) => updateParam('language', e.target.value || undefined)}
            className="h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 text-sm"
          >
            <option value="">All Languages</option>
            {LANGUAGE_OPTIONS.map((lang) => (
              <option key={lang.id} value={lang.id}>{lang.flag} {lang.label}</option>
            ))}
          </select>

          <select
            value={filters.sortBy || 'popular'}
            onChange={(e) => updateParam('sortBy', e.target.value)}
            className="h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 text-sm"
          >
            {SORT_OPTIONS.map((sort) => (
              <option key={sort.value} value={sort.value}>{sort.label}</option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearchInput('');
              setParams(new URLSearchParams());
            }}
            className="h-11 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {activeFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  updateParam(f.key, undefined);
                  if (f.key === 'search') setSearchInput('');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold border border-primary-200 dark:border-primary-800 hover:bg-primary-100 transition"
              >
                {f.label} <X size={13} />
              </button>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{filteredCourses.length} courses found</h2>
        </div>
        <CourseGrid courses={filteredCourses} isLoading={isLoading} />
      </section>
    </div>
  );
}
