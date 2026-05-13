export default function PrivacyPolicy() {
  return (
    <div className="container py-20 mt-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
        <p>We collect information that you provide directly to us, including when you create an account, update your profile, book a trial, or contact us. The types of information we may collect include your name, email address, phone number, and payment information.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you technical notices and support messages, and to communicate with you about products, services, offers, and events.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Data Security</h2>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@artbeat.com.</p>
      </div>
    </div>
  );
}
