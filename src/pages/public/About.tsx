import { Users, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="container py-20 mt-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Empowering Artists Worldwide</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          We believe that everyone has an inner artist waiting to be discovered. Our mission is to provide world-class education in music, dance, and theater, accessible to all ages and skill levels.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Target, title: 'Our Mission', desc: 'To make high-quality arts education accessible globally through innovative technology and passionate educators.' },
          { icon: Users, title: 'Our Community', desc: 'A vibrant global network of over 40,000 students and 700+ expert teachers across 15+ countries.' },
          { icon: Heart, title: 'Our Values', desc: 'We prioritize creativity, inclusivity, and personalized learning to ensure every student thrives.' },
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 mx-auto bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <item.icon size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
