import { PenTool, Wand2, Copy, Play } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function AICreationEdit() {
  const location = useLocation();
  const initialPrompt = location.state?.promptText || 'A futuristic city with flying cars and neon lights, cyberpunk style, highly detailed, 8k resolution';
  const [prompt, setPrompt] = useState(initialPrompt);
  const [negativePrompt, setNegativePrompt] = useState('blurry, low quality, deformed, text, watermark');
  const [isTesting, setIsTesting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleTestGenerate = () => {
    setIsTesting(true);
    setTimeout(() => setIsTesting(false), 2000);
  };

  const handleCopyAll = () => {
    const fullText = `Prompt: ${prompt}\nNegative Prompt: ${negativePrompt}`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <PenTool className="w-10 h-10 text-indigo-500" />
          AI Creation Editor
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl">
          Fine-tune your prompts with our advanced editor. Test variations, add modifiers, and perfect your vision before generating.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Editor Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Main Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none font-mono text-sm leading-relaxed"
              placeholder="Describe what you want to see..."
            />
            
            <div className="mt-4 flex flex-wrap gap-2">
              {['Photorealistic', 'Cinematic Lighting', 'Unreal Engine 5', 'Masterpiece', 'Trending on ArtStation'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => setPrompt(prev => `${prev}, ${tag}`)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors border border-slate-700"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Negative Prompt</label>
            <textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition-all resize-none font-mono text-sm leading-relaxed"
              placeholder="What you don't want to see..."
            />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleTestGenerate}
              disabled={isTesting}
              className="flex-1 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isTesting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Play className="w-5 h-5" />
              )}
              {isTesting ? 'Generating...' : 'Test Generate'}
            </button>
            <button 
              onClick={handleCopyAll}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors border border-slate-700 flex items-center gap-2"
            >
              <Copy className="w-5 h-5" /> {isCopied ? 'Copied!' : 'Copy All'}
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-indigo-400" /> Parameters
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-2">
                  {['1:1', '16:9', '9:16', '4:3', '3:4', '21:9'].map((ratio) => (
                    <button key={ratio} className={`py-2 rounded-lg text-sm font-medium border transition-colors ${ratio === '16:9' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}>
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-slate-300 mb-3">
                  <span>Stylize (Midjourney)</span>
                  <span className="text-indigo-400">250</span>
                </label>
                <input type="range" min="0" max="1000" defaultValue="250" className="w-full accent-indigo-500" />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-slate-300 mb-3">
                  <span>Chaos</span>
                  <span className="text-indigo-400">0</span>
                </label>
                <input type="range" min="0" max="100" defaultValue="0" className="w-full accent-indigo-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Model Version</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option>Midjourney v6.0</option>
                  <option>Midjourney v5.2</option>
                  <option>Niji v6</option>
                  <option>DALL-E 3</option>
                  <option>Stable Diffusion XL</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
