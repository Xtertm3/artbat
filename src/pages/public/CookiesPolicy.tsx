export default function CookiesPolicy() {
  return (
    <div className="container py-20 mt-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Cookies Policy</h1>
      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">What Are Cookies</h2>
        <p>Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">How We Use Cookies</h2>
        <p>When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes: to enable certain functions of the Service, to provide analytics, to store your preferences, and to enable advertisements delivery.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Your Choices Regarding Cookies</h2>
        <p>If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.</p>
      </div>
    </div>
  );
}
