import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    { q: 'What is the duration of a typical course?', a: 'Our foundational courses usually run for 6-8 months, depending on the student\'s pace and practice discipline.' },
    { q: 'Do I need my own instrument?', a: 'Yes, for most instrumental courses, you will need your own instrument to practice. We offer buying guides to help you choose the right one.' },
    { q: 'Are the classes pre-recorded or live?', a: 'All our core sessions are 1:1 Live Interactive Sessions with your dedicated teacher to ensure personalized learning.' },
    { q: 'Is there a certification provided?', a: 'Yes! We provide internationally recognized graded certifications upon successful completion and evaluation of the course.' },
    { q: 'Can I change my teacher if I am not comfortable?', a: 'Absolutely. We want you to have the best learning experience. You can request a teacher change through our support portal.' },
  ];

  return (
    <div className="container py-20 mt-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
              <button 
                className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                onClick={() => setIsOpen(!isOpen)}
              >
                {faq.q}
                <span className="text-gray-400">{isOpen ? '-' : '+'}</span>
              </button>
              {isOpen && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
