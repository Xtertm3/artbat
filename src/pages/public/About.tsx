import { Users, Target, Heart, Award, Globe, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div className="container py-20 mt-16">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Empowering Artists Worldwide</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          We believe that everyone has an inner artist waiting to be discovered. Founded with a vision to democratize high-quality arts education, our academy has grown from a humble local studio into a premier global online platform. 
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Through a rigorous curriculum, passionate instructors, and cutting-edge interactive technology, we bridge the gap between traditional gurukul systems and modern accessibility. Whether you are picking up a guitar for the first time, mastering the intricacies of Bharatanatyam, or refining your vocal pitch, we provide a nurturing environment where your talent can thrive.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Target, title: 'Our Mission', desc: 'To make high-quality arts education accessible globally through innovative technology and passionate educators. We strive to create a structured path for every learner.' },
          { icon: Users, title: 'Our Community', desc: 'A vibrant global network of over 40,000 students and 700+ expert teachers across 15+ countries, learning and growing together every single day.' },
          { icon: Heart, title: 'Our Values', desc: 'We prioritize creativity, inclusivity, and personalized learning. We believe that art is a universal language that should be taught with patience and love.' },
          { icon: Award, title: 'Excellence', desc: 'Our curriculum is designed by industry veterans and academic scholars to ensure you receive an education that meets international certification standards.' },
          { icon: Globe, title: 'Accessibility', desc: 'Geographic boundaries should not limit your passion. Our live 1:1 online classes bring the best teachers directly to your living room.' },
          { icon: BookOpen, title: 'Continuous Growth', desc: 'We foster a culture of lifelong learning, providing students with progressive course levels, masterclasses, and global performance opportunities.' },
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 mx-auto bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <item.icon size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
