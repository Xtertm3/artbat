export default function RefundPolicy() {
  return (
    <div className="container py-20 mt-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Refund & Cancellation Policy</h1>
      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. General Policy</h2>
        <p>We want you to be satisfied with our courses and educational materials. If you are not completely satisfied with your purchase, you may be eligible for a refund depending on the course terms and how much of the course you have completed.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. 14-Day Money-Back Guarantee</h2>
        <p>For most of our long-term courses, we offer a 14-day money-back guarantee. If you request a refund within 14 days of your purchase, and have completed less than 15% of the course material, we will provide a full refund.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Live 1:1 Sessions</h2>
        <p>Cancellations for live 1:1 sessions must be made at least 24 hours in advance. Sessions cancelled with less than 24 hours notice are not eligible for a refund or rescheduling.</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Requesting a Refund</h2>
        <p>To request a refund, please contact our support team at support@artbeat.com with your order details and reason for the request.</p>
      </div>
    </div>
  );
}
