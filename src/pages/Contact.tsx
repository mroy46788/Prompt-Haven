import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-xl text-slate-400">
          Have questions, suggestions, or want to collaborate? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 border border-slate-800">
              <Mail className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Email</h3>
              <p className="text-slate-400">hello@promptimage.com</p>
              <p className="text-slate-500 text-sm mt-1">We aim to reply within 24 hours.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 border border-slate-800">
              <MapPin className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Location</h3>
              <p className="text-slate-400">San Francisco, CA</p>
              <p className="text-slate-500 text-sm mt-1">Global remote team</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
