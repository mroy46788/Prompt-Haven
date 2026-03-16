import React, { useState } from 'react';
import { Upload, Send, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function SubmitPrompt() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    promptText: '',
    category: '',
    model: '',
    tags: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/prompts/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()),
          image: 'https://picsum.photos/seed/' + Date.now() + '/800/1000' // Placeholder image
        })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-24 text-center">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Submission Received!</h1>
        <p className="text-slate-400 text-lg mb-8">
          Thank you for sharing your creativity with the community. Our moderators will review your prompt shortly.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition-all"
        >
          Submit Another Prompt
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Submit a Prompt</h1>
        <p className="text-slate-400 text-lg">
          Share your best AI image generation prompts with the community and help others create amazing art.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 p-8 bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-sm">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
              Prompt Title
            </label>
            <input
              type="text"
              id="title"
              required
              placeholder="e.g. Cyberpunk Cityscape at Night"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              required
              placeholder="e.g. Digital Art, Anime, 3D Render"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          {/* AI Model */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-slate-300 mb-2">
              AI Model Used
            </label>
            <input
              type="text"
              id="model"
              required
              placeholder="e.g. Midjourney v6, DALL-E 3, Stable Diffusion XL"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            />
          </div>

          {/* Prompt Text */}
          <div>
            <label htmlFor="promptText" className="block text-sm font-medium text-slate-300 mb-2">
              The Prompt
            </label>
            <textarea
              id="promptText"
              required
              rows={5}
              placeholder="Paste your full AI prompt here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              value={formData.promptText}
              onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-slate-300 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              placeholder="e.g. neon, futuristic, rain, cinematic"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          {/* Image Upload Placeholder */}
          <div className="border-2 border-dashed border-slate-800 rounded-2xl p-12 text-center hover:border-indigo-500/50 transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800 group-hover:border-indigo-500/50 transition-all">
              <ImageIcon className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-all" />
            </div>
            <p className="text-slate-300 font-medium mb-1">Upload Sample Image</p>
            <p className="text-slate-500 text-sm">Drag and drop or click to browse</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
        >
          <Send className="w-5 h-5" />
          Submit Prompt for Review
        </button>
      </form>
    </div>
  );
}
