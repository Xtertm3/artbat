import { Calendar, Clock, User, Music } from 'lucide-react';

export default function Trial() {
  return (
    <div className="container py-20 mt-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Book Your Free Trial Class</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Experience our 1:1 live sessions with an expert teacher, completely free.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-4 text-primary-900 dark:text-primary-100">What to expect:</h3>
            <ul className="space-y-4 text-sm text-primary-800 dark:text-primary-200">
              <li className="flex items-center gap-3"><User size={18} /> Meet your expert instructor</li>
              <li className="flex items-center gap-3"><Clock size={18} /> 30-minute interactive session</li>
              <li className="flex items-center gap-3"><Music size={18} /> Skill assessment & goal setting</li>
              <li className="flex items-center gap-3"><Calendar size={18} /> Personalized learning roadmap</li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 lg:p-8 shadow-sm">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input type="text" className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input type="text" className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Doe" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input type="email" className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="john@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">I want to learn</label>
              <select className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 focus:ring-2 focus:ring-primary-500 outline-none">
                <option>Piano</option>
                <option>Acoustic Guitar</option>
                <option>Western Vocals</option>
                <option>Hindustani Vocals</option>
                <option>Bharatanatyam</option>
              </select>
            </div>

            <button className="w-full h-12 mt-4 rounded-xl gradient-bg text-white font-bold hover:opacity-90 transition active:scale-[0.98]">
              Schedule Free Trial
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
