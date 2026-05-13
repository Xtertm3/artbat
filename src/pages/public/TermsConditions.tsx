export default function TermsConditions() {
  return (
    <div className="container py-20 mt-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Agreement to Terms</h2>
        <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of our platform and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. User Accounts</h2>
        <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Termination</h2>
        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
      </div>
    </div>
  );
}
