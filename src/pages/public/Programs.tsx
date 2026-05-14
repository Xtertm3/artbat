import { Briefcase, Gift, Music, Building2, HeartHandshake, Users } from 'lucide-react';

export default function Programs() {
  const programs = [
    { icon: Briefcase, title: 'Corporate Wellness Programs', desc: 'Boost employee morale, reduce burnout, and foster team bonding through the power of music and arts. We offer structured team-building workshops, corporate choir setups, and wellness drum circles tailored to your company\'s culture. Our expert facilitators ensure an inclusive environment where everyone can participate regardless of prior experience.' },
    { icon: Gift, title: 'Gift an Experience', desc: 'Looking for a unique and thoughtful gift? Gift a musical journey to your loved ones. Whether it is a single introductory masterclass or a 3-month comprehensive course, our gift packages allow the recipient to choose the instrument or dance style they have always wanted to learn. Help them make memories that last a lifetime.' },
    { icon: Music, title: 'Couples Programs', desc: 'Play together, grow together. Specialized 1:2 sessions designed specifically for partners to learn an instrument or dance style synchronously. It is a fantastic way to spend quality time together, improve communication, and share a creative hobby. Perfect for anniversaries, wedding preparations, or just weekend fun.' },
    { icon: Building2, title: 'School Integration', desc: 'We partner with K-12 schools to provide a comprehensive arts curriculum. Our program includes customized syllabus design, trained instructor placement, grading, and annual recital management, ensuring students receive a holistic education.' },
    { icon: HeartHandshake, title: 'NGO Outreach', desc: 'Art is for everyone. We proudly collaborate with various NGOs to bring music and dance education to underprivileged communities. Ask us about our subsidized programs and how your organization can get involved in our outreach initiatives.' },
    { icon: Users, title: 'Group Masterclasses', desc: 'Join intensive 4-week group bootcamps led by industry legends and celebrity artists. These programs focus on specific advanced techniques, performance psychology, and industry networking for aspiring professionals.' },
  ];

  return (
    <div className="container py-20 mt-16">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Special Programs & Packages</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Beyond our standard individual learning paths, we offer specialized, curated experiences designed for organizations, couples, schools, and thoughtful gifting. Explore how our programs can bring the joy of music and dance into different aspects of your life.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {programs.map((prog, i) => (
          <div key={i} className="p-8 rounded-3xl bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all flex flex-col">
            <div className="w-16 h-16 bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 rounded-2xl flex items-center justify-center mb-6">
              <prog.icon size={28} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{prog.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed flex-1">{prog.desc}</p>
            <button className="text-primary-600 font-bold hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-2 group mt-auto">
              Request Details <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
