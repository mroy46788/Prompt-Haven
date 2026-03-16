import { Rabbit, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function About() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [featuredPrompts, setFeaturedPrompts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/prompts')
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 12);
        setFeaturedPrompts(sorted);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      {/* Header */}
      <div className="text-center mb-24">
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 mx-auto mb-6">
          {settings.logo ? (
            <img src={settings.logo} alt={settings.siteName} className="w-12 h-12 object-contain" />
          ) : (
            <Rabbit className="w-10 h-10 text-white" />
          )}
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">{settings.siteName}</h1>
        <p className="text-slate-400 text-lg mb-8">{settings.description}</p>
        <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          👋 Welcome to {settings.siteName}! We're dedicated to building the best AI image generation prompt library, helping creators explore the infinite possibilities of AI art. Whether you're using Midjourney v6, DALL-E 3, Flux, Stable Diffusion XL, Leonardo AI, or nanobanana, you'll find inspiration and learning resources here.
        </p>
        <button 
          onClick={() => navigate('/contact')}
          className="w-full sm:w-auto px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mx-auto"
        >
          <span className="text-xl">✉️</span> Contact Us
        </button>
      </div>

      {/* Most Popular Prompts Gallery (Masonry Style) */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Most Popular Prompts</h2>
          <p className="text-slate-400">Our community's most viewed and loved AI art inspirations</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {featuredPrompts.map((prompt) => (
              <div 
                key={prompt.id}
                onClick={() => navigate(`/prompt/${prompt.id}`)}
                className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                <img
                  src={prompt.image}
                  alt={prompt.title}
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{prompt.title}</h3>
                    <span className="text-[10px] text-slate-400 bg-slate-950/50 px-2 py-1 rounded-full backdrop-blur-sm border border-white/5">
                      {prompt.views?.toLocaleString()} views
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded-md border border-indigo-500/20">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="space-y-20 mb-24">
        {/* ... (rest of the sections remain the same) */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <div className="space-y-6 text-slate-300 leading-relaxed">
            <p>
              In today's rapidly evolving AI image generation landscape, we noticed creators facing a common challenge: how to write prompts that generate the desired images? Crafting effective prompts often requires extensive practice and accumulated experience.
            </p>
            <p>
              Prompt Image was born from this insight: by collecting and sharing these valuable prompt experiences, we can help more people overcome the learning curve and create stunning AI artwork faster.
            </p>
            <p>
              We believe knowledge and creativity should be shared, not monopolized. By building an open, free prompt library, we aim to lower the barriers to AI art creation and enable everyone to participate in this creative revolution.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-slate-300 mb-6">Make AI art creation simple, fun, and accessible to everyone. We're committed to:</p>
          <ul className="space-y-3 text-slate-300 ml-4">
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1.5">•</span>
              Curating high-quality prompts to save creators' exploration time
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1.5">•</span>
              Providing detailed guides to help beginners get started quickly
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1.5">•</span>
              Building an open sharing community to foster creative exchange
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1.5">•</span>
              Continuously updating content to keep pace with the latest AI developments
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-8">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">Curated Prompt Library</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Every prompt is tested in practice to ensure high-quality image generation</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">Multi-Platform Support</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Covering Midjourney v6, DALL-E 3, Flux, Stable Diffusion XL, Leonardo AI, and nanobanana</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">Completely Free</h3>
              <p className="text-slate-400 text-sm leading-relaxed">All content is freely accessible, no registration required, open for use</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">Detailed Instructions</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Each prompt comes with parameter explanations and usage recommendations</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">Categorized Search</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Quickly find prompts through categories, tags, and search</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">Regular Updates</h3>
              <p className="text-slate-400 text-sm leading-relaxed">New content added regularly, keeping up with latest AI tech and creative trends</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Open Sharing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">We believe knowledge should flow freely. All prompts use open licenses, encouraging sharing and innovation.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Quality First</h3>
              <p className="text-slate-400 text-sm leading-relaxed">We don't chase quantity, but focus on providing truly valuable, verified high-quality content.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Community Driven</h3>
              <p className="text-slate-400 text-sm leading-relaxed">We listen to user feedback and will open community submissions, making the platform truly co-created by creators.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Continuous Innovation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">AI technology evolves rapidly. We keep learning and improving to provide the latest, most practical resources.</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
          <h2 className="text-3xl font-bold text-white mb-6">Join Us</h2>
          <p className="text-slate-300 mb-6">Prompt Image is not just a tool, but a creator community. We welcome you to:</p>
          <ul className="space-y-3 text-slate-300 ml-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1.5">•</span>
              Use our prompts to create amazing works
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1.5">•</span>
              Share your creative experiences and insights
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1.5">•</span>
              Suggest improvements to help us do better
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1.5">•</span>
              Follow our social media for the latest updates
            </li>
          </ul>
          <p className="text-indigo-400 font-bold text-lg">Let's explore the infinite possibilities of AI art together!</p>
        </section>
      </div>

    </div>
  );
}
