import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
      <div className="space-y-8 text-slate-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Service</h2>
          <p className="leading-relaxed">
            You are responsible for your use of the services and for any content you provide. You agree not to use the services for any illegal or unauthorized purpose.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. Intellectual Property</h2>
          <p className="leading-relaxed">
            The services and their original content, features, and functionality are owned by Prompt Image and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. Termination</h2>
          <p className="leading-relaxed">
            We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
          <p className="leading-relaxed">
            In no event shall Prompt Image, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </section>
      </div>
    </div>
  );
}
