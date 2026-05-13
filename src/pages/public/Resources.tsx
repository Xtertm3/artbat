import { BookOpen, Calendar } from 'lucide-react';

export default function Resources() {
  const blogs = [
    { title: 'A Comprehensive Guide to the 72 Melakarta Ragas', category: 'Carnatic Music', date: 'Apr 13, 2026', readTime: '9 Mins' },
    { title: 'Find Your Sruthi in Carnatic Music: Beginner’s Guide', category: 'Vocals', date: 'Apr 4, 2026', readTime: '8 Mins' },
    { title: 'Best Old Bollywood Songs to Practice Singing', category: 'Bollywood', date: 'Nov 15, 2025', readTime: '11 Mins' },
    { title: 'Raag Yaman: A Complete Beginner\'s Guide', category: 'Hindustani', date: 'Oct 29, 2025', readTime: '9 Mins' },
    { title: 'Easy Musical Instruments to Learn at Any Age', category: 'General', date: 'Oct 25, 2025', readTime: '7 Mins' },
    { title: 'Why Music and Dance Education Matter in 2026', category: 'Education', date: 'May 8, 2025', readTime: '4 Mins' },
  ];

  return (
    <div className="container py-20 mt-16">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Music & Arts Resources</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Discover insights, tips, and comprehensive guides from our expert educators.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, i) => (
          <div key={i} className="group p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 mb-4">
              <BookOpen size={16} /> {blog.category}
            </div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-primary-600 transition-colors line-clamp-2">{blog.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2"><Calendar size={14} /> {blog.date}</div>
              <span>{blog.readTime} Read</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
