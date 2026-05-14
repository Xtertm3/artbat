import { BookOpen, Calendar, ChevronRight } from 'lucide-react';

export default function Resources() {
  const blogs = [
    { title: 'A Comprehensive Guide to the 72 Melakarta Ragas', category: 'Carnatic Music', date: 'Apr 13, 2026', readTime: '9 Mins', desc: 'Dive deep into the foundational scale system of Carnatic music. Learn how the 72 Melakarta ragas are structured, their mathematical logic, and how to identify them.' },
    { title: 'Find Your Sruthi in Carnatic Music: Beginner’s Guide', category: 'Vocals', date: 'Apr 4, 2026', readTime: '8 Mins', desc: 'Struggling to find and hold your base pitch? This guide provides practical vocal exercises, breath control techniques, and tips on using a tanpura effectively.' },
    { title: 'Best Old Bollywood Songs to Practice Singing', category: 'Bollywood', date: 'Nov 15, 2025', readTime: '11 Mins', desc: 'Explore a curated list of classic Bollywood melodies that are perfect for vocal practice. We break down the ragas and vocal techniques used by legendary playback singers.' },
    { title: 'Raag Yaman: A Complete Beginner\'s Guide', category: 'Hindustani', date: 'Oct 29, 2025', readTime: '9 Mins', desc: 'Raga Yaman is often the first raga taught to students. Discover its emotional profile, Aaroh-Avaroh, pakad, and learn a simple bandish to get started.' },
    { title: 'Easy Musical Instruments to Learn at Any Age', category: 'General', date: 'Oct 25, 2025', readTime: '7 Mins', desc: 'It is never too late to start your musical journey. We review the easiest instruments to pick up as an adult, including the ukulele, keyboard, and hand drums.' },
    { title: 'Why Music and Dance Education Matter in 2026', category: 'Education', date: 'May 8, 2025', readTime: '4 Mins', desc: 'In a fast-paced digital world, arts education provides crucial cognitive benefits, emotional regulation, and a sense of community. Read our research-backed insights.' },
  ];

  return (
    <div className="container py-20 mt-16">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-bold mb-6">Music & Arts Resources</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Welcome to our knowledge hub. Whether you are a beginner looking for practice tips or an advanced artist exploring deep music theory, our expert educators regularly share insights, comprehensive guides, and historical context to aid your learning journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {blogs.map((blog, i) => (
          <div key={i} className="group flex flex-col p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-primary-100 dark:hover:border-primary-900/30 transition-all cursor-pointer">
            <div className="flex items-center gap-2 text-sm font-bold text-primary-600 mb-4 uppercase tracking-wider">
              <BookOpen size={16} /> {blog.category}
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-600 transition-colors leading-tight">{blog.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 flex-1 leading-relaxed">
              {blog.desc}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 font-medium pt-6 border-t border-gray-100 dark:border-gray-800 mt-auto">
              <div className="flex items-center gap-2"><Calendar size={14} /> {blog.date}</div>
              <div className="flex items-center gap-4">
                <span>{blog.readTime} Read</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-primary-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
