import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="space-y-8 text-slate-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
          <p className="leading-relaxed">
            We collect information you provide directly to us, such as when you create an account, share a prompt, or contact us for support. This may include your name, email address, and any other information you choose to provide.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Information</h2>
          <p className="leading-relaxed">
            We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience on our platform.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. Data Security</h2>
          <p className="leading-relaxed">
            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. Cookies</h2>
          <p className="leading-relaxed">
            We use cookies and similar technologies to collect information about your browsing activities and to remember your preferences.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at privacy@promptimage.com.
          </p>
        </section>
      </div>
    </div>
  );
}
