import { ChevronRight, Copy, Eye, Moon, Check, ChevronDown, Heart, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PromptCard from '../components/PromptCard';
import { useLikes } from '../hooks/useLikes';

export default function PromptDetail() {
  const { id } = useParams();
  const [prompt, setPrompt] = useState<any | null>(null);
  const [relatedPrompts, setRelatedPrompts] = useState<any[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  const [views, setViews] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/prompts')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => String(p.id) === String(id));
        if (found) {
          setPrompt(found);
          setRelatedPrompts(data.filter((p: any) => String(p.id) !== String(id)).slice(0, 4));
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [id]);

  const { likes, isLiked, toggleLike } = useLikes(prompt?.id || '');

  useEffect(() => {
    if (!prompt) return;
    // Reset state when prompt changes
    setShowFullPrompt(false);
    setIsCopied(false);
    // Scroll to top when navigating to a new prompt
    window.scrollTo(0, 0);

    // Simple deterministic hash to get a base view count between 100 and 999
    const getBaseViews = (promptId: string | number) => {
      const str = String(promptId);
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash) % 900 + 100;
    };

    const baseViews = getBaseViews(prompt.id);
    const storageKey = `prompt_views_${prompt.id}`;
    const currentViews = parseInt(localStorage.getItem(storageKey) || '0', 10);
    const newViews = currentViews + 1;
    localStorage.setItem(storageKey, newViews.toString());
    setViews(baseViews + newViews);
  }, [prompt]);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt.promptText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Prompt Not Found</h1>
        <p className="text-slate-400 mb-8">The prompt you're looking for doesn't exist or has been removed.</p>
        <Link to="/prompts" className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">
          Browse All Prompts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link to="/prompts" className="hover:text-white transition-colors">All Prompts</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-200">{prompt.title}</span>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-8 mb-16">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
            <img
              src={prompt.image.replace('800/1000', '1200/1200')}
              alt={prompt.title}
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <button 
                className={`flex items-center gap-1.5 px-4 py-2 backdrop-blur-md rounded-full text-white transition-colors ${
                  isLiked ? 'bg-rose-500/80 hover:bg-rose-500/90' : 'bg-black/40 hover:bg-black/60'
                }`} 
                onClick={toggleLike}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
                <span className="text-sm font-medium">{likes}</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-white">Reference Image</h3>
              <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700/50">Text-to-Image</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-indigo-400">
                <Moon className="w-6 h-6" />
              </div>
              <h4 className="text-white font-medium mb-2">Pure Text Generation</h4>
              <p className="text-slate-400 text-sm max-w-sm">
                This artwork was generated entirely by AI from text prompts, without any reference image
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">{prompt.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {prompt.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700/50">
                  {tag}
                </span>
              ))}
            </div>
            {prompt.isFeatured && (
              <div className="inline-block px-3 py-1.5 bg-rose-500/10 text-rose-400 text-xs font-medium rounded-md border border-rose-500/20 mb-6">
                Featured
              </div>
            )}
            <p className="text-slate-400 leading-relaxed mb-8">
              Generate an image of {prompt.title.toLowerCase()} capturing its unique atmosphere and style.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Prompt</h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-md transition-colors border border-slate-700"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <p className={`text-slate-300 text-sm font-mono leading-relaxed ${!showFullPrompt && 'line-clamp-3'}`}>
                ### Main Prompt<br />
                {prompt.promptText}
              </p>
              <button 
                onClick={() => setShowFullPrompt(!showFullPrompt)}
                className="w-full mt-4 py-2 text-slate-400 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showFullPrompt ? 'rotate-180' : ''}`} />
                {showFullPrompt ? 'Show less' : 'Show full prompt'}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-6">Generation Parameters</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm">Model</span>
                <span className="text-slate-200 text-sm font-medium bg-slate-800 px-2 py-1 rounded">NANOBANANA - PRO</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Eye className="w-5 h-5" />
              <span className="text-sm">Views</span>
            </div>
            <span className="text-slate-200 font-semibold">{views.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Related Prompts */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Related Prompts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedPrompts.map(({ id, title, image, tags, isFeatured, promptText }) => (
            <PromptCard 
              key={id} 
              id={id} 
              title={title} 
              image={image} 
              tags={tags} 
              isFeatured={isFeatured} 
              promptText={promptText} 
            />
          ))}
        </div>
      </div>

      {/* Details Sections */}
      <div className="max-w-4xl space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">About {prompt.title}</h2>
          <p className="text-slate-400 leading-relaxed">
            This <strong className="text-slate-200">{prompt.title}</strong> prompt is one of our curated AI image generation prompts. Using this <strong className="text-slate-200">{prompt.title}</strong> prompt, you can create similar stunning effects in AI tools like nanobanana-pro. Our <strong className="text-slate-200">{prompt.title}</strong> example demonstrates how to achieve professional-grade AI artwork through carefully crafted prompts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">How to Use {prompt.title} Prompt</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">1</div>
              <p className="text-slate-300">Copy the <strong className="text-slate-200">{prompt.title}</strong> prompt text above</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">2</div>
              <p className="text-slate-300">Open your favorite AI image generator (nanobanana-pro, Midjourney, DALL-E, etc.)</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">3</div>
              <p className="text-slate-300">Paste the <strong className="text-slate-200">{prompt.title}</strong> prompt and adjust parameters</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">4</div>
              <p className="text-slate-300">Generate and iterate until you achieve the desired <strong className="text-slate-200">{prompt.title}</strong> effect</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">{prompt.title} Creation Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <p className="text-slate-300 text-sm">Try modifying details in <strong className="text-slate-200">{prompt.title}</strong> to get different variations</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <p className="text-slate-300 text-sm">Adjusting guidance scale changes the <strong className="text-slate-200">{prompt.title}</strong> style intensity</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <p className="text-slate-300 text-sm">Combining negative prompts improves <strong className="text-slate-200">{prompt.title}</strong> image quality</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <p className="text-slate-300 text-sm">Different seed values produce unique <strong className="text-slate-200">{prompt.title}</strong> variants</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-800 pt-8">
          <p className="text-sm text-slate-500 text-center">
            Related: <Link to="#" className="hover:text-slate-300">{prompt.title}</Link> prompt | <Link to="#" className="hover:text-slate-300">{prompt.title} AI generation</Link> | {prompt.tags.map((tag, i) => <span key={tag}><Link to="#" className="hover:text-slate-300">{tag}</Link>{i < prompt.tags.length - 1 ? ' | ' : ''}</span>)} | <Link to="#" className="hover:text-slate-300">nanobanana-pro prompts</Link>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">How to Use This Prompt</h2>
          <ol className="list-decimal list-inside space-y-3 text-slate-300 ml-2">
            <li>Click "Copy" to get the full prompt</li>
            <li>Open your AI tool (FLUX, Midjourney, Gemini, NanoBanana, ComfyUI, etc.)</li>
            <li>Paste and set parameters matching the page settings</li>
            <li>Generate and iterate as needed</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
          <div className="space-y-4">
            {[
              {
                question: 'Which AI tools are supported?',
                answer: 'Compatible with FLUX.2, Midjourney V6, Google Gemini, NanoBanana, ComfyUI, Stable Diffusion XL, DALL-E 3, and more. Results may vary slightly between tools.'
              },
              {
                question: 'What does the negative prompt do?',
                answer: 'Negative prompts tell the AI what to avoid in the image. Use terms like "low quality, blurry, distorted" to improve output quality, or exclude specific elements you don\'t want.'
              },
              {
                question: 'How to get better results?',
                answer: 'Use descriptive adjectives, be specific about subject/style/lighting/composition. Start with lower steps for quick tests, then increase for final quality. Save seed values to reproduce similar results.'
              },
              {
                question: 'Can I modify the prompt?',
                answer: 'Absolutely! Mix and match keywords, adjust weights, or combine with your own ideas to create unique styles.'
              },
              {
                question: 'What if the result is not ideal?',
                answer: 'Try adjusting guidance scale, changing aspect ratio, or iterating on keywords. Different seeds produce different variations. Experiment with adding or removing descriptive terms.'
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  className="w-full p-6 flex items-center justify-between text-left"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <span className="text-slate-200 font-medium">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-amber-400">💡</span> Pro Tips
          </h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              Use specific words like "gigantic" instead of "big" for better results
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              Focus on what you want, not what you don't want
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              Try different aspect ratios for varied compositions
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              Lower steps for quick tests, higher for final quality
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
