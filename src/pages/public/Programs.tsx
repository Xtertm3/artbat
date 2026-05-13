import { Briefcase, Gift, Music } from 'lucide-react';

export default function Programs() {
  const programs = [
    { icon: Briefcase, title: 'Corporate Programs', desc: 'Help your employees bond through the power of music and arts. We offer team-building sessions and wellness workshops.' },
    { icon: Gift, title: 'Gift an Experience', desc: 'A perfect gift for all ages. Gift a musical journey to your loved ones and help them make memories that last a lifetime.' },
    { icon: Music, title: 'Couples Programs', desc: 'Play together, grow together. Specialized sessions designed for partners to learn an instrument or dance style synchronously.' },
  ];

  return (
    <div className="container py-20 mt-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Special Programs & Packages</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Beyond individual learning, we offer curated experiences for organizations, couples, and thoughtful gifting.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {programs.map((prog, i) => (
          <div key={i} className="p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-14 h-14 mx-auto gradient-bg text-white rounded-full flex items-center justify-center mb-6">
              <prog.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">{prog.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{prog.desc}</p>
            <button className="text-primary-600 font-semibold hover:underline">Learn More &rarr;</button>
          </div>
        ))}
      </div>
    </div>
  );
}
