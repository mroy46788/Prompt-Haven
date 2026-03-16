import { Check, CreditCard, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-bold text-white mb-6">Simple, transparent pricing</h1>
        <p className="text-xl text-slate-400">
          Start for free, upgrade when you need more power. No hidden fees.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Basic</h2>
            <p className="text-slate-400">Perfect for exploring and learning</p>
            <div className="mt-6 flex items-baseline text-5xl font-extrabold text-white">
              $0
              <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            {[
              'Browse all prompts',
              'Copy prompts to clipboard',
              'Save up to 50 favorite prompts',
              'Basic search functionality',
              'Community support',
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={() => navigate('/contact')}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors border border-slate-700"
          >
            Get Started Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-b from-indigo-500/10 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 relative flex flex-col shadow-2xl shadow-indigo-500/10">
          <div className="absolute top-0 right-8 transform -translate-y-1/2">
            <span className="bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" /> Most Popular
            </span>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Pro Creator</h2>
            <p className="text-slate-400">For serious AI artists and professionals</p>
            <div className="mt-6 flex items-baseline text-5xl font-extrabold text-white">
              $12
              <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            {[
              'Everything in Basic',
              'Unlimited saved prompts',
              'Advanced search & filtering',
              'Access to AI Creation Editor',
              'Image to Prompt converter tool',
              'Priority support',
              'Early access to new features',
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={() => navigate('/contact')}
            className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" /> Subscribe Now
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-24 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Can I cancel my subscription anytime?</h3>
            <p className="text-slate-400">Yes, you can cancel your subscription at any time. You will continue to have access to Pro features until the end of your current billing period.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Do I need a credit card for the free plan?</h3>
            <p className="text-slate-400">No, the Basic plan is completely free forever. We only ask for payment information if you decide to upgrade to Pro.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">What is the AI Creation Editor?</h3>
            <p className="text-slate-400">The AI Creation Editor is a Pro feature that allows you to tweak and test prompts directly within our platform before copying them to your preferred AI generator.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
