import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Loader2 } from 'lucide-react';
import PromptCard from '../components/PromptCard';
import { useSettings } from '../context/SettingsContext';

const faqs = [
  {
    question: 'What is Prompt Image?',
    answer: 'Prompt Image is a platform dedicated to sharing high-quality AI image generation prompts. We curate and organize prompts to help creators produce amazing images using AI tools like Midjourney v6, DALL-E 3, Flux, Stable Diffusion XL, Leonardo AI, and nanobanana.'
  },
  {
    question: 'What are AI image prompts and why are they important?',
    answer: 'AI image prompts are text descriptions that guide AI to generate specific styles or content. A well-crafted prompt can significantly improve the quality, accuracy, and artistic value of generated images. It\'s like a language for communicating with AI - mastering prompts is key to creating excellent AI art.'
  },
  {
    question: 'Which AI platforms does Prompt Image support?',
    answer: 'Our prompts support mainstream AI image generation platforms including Midjourney v6, DALL-E 3, Flux, Stable Diffusion XL, Leonardo AI, Adobe Firefly, and nanobanana. Each prompt is tagged with compatible platforms and recommended parameters.'
  },
  {
    question: 'How do I use these prompts?',
    answer: 'It\'s simple: 1) Browse or search for prompts you\'re interested in 2) Click to view details and generation parameters 3) Copy the prompt text 4) Paste it into your AI platform (like Midjourney\'s chat) 5) Adjust parameters as needed.'
  },
  {
    question: 'What subscription plans do you offer?',
    answer: 'Currently, all our prompts and resources are completely free to browse, copy, and use. We believe in open access to help the community learn and grow.'
  }
];

export default function Home() {
  const { settings } = useSettings();
  const [prompts, setPrompts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/prompts')
      .then(res => res.json())
      .then(data => {
        setPrompts(data.filter((p: any) => p.isFeatured).slice(0, 6));
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-24">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
          {settings.siteName} - AI Art Gallery
        </h1>
        <p className="text-xl text-slate-400 mb-12 leading-relaxed">
          {settings.description}
        </p>
        <div className="flex items-center justify-center gap-6">
          <Link
            to="/prompts"
            className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/25"
          >
            Start Creating
          </Link>
          <Link
            to="/prompts"
            className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/25"
          >
            Browse All Prompts
          </Link>
        </div>
      </div>

      {/* Latest Prompts */}
      <div className="mb-24">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Latest Prompt Images</h2>
          <p className="text-slate-400 text-lg">
            Discover the newest additions to our prompt image gallery. Each prompt image showcases different AI models and creative techniques.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
            </div>
          ) : (
            prompts.map(({ id, title, image, tags, isFeatured, promptText }) => (
              <PromptCard 
                key={id} 
                id={id} 
                title={title} 
                image={image} 
                tags={tags} 
                isFeatured={isFeatured} 
                promptText={promptText} 
              />
            ))
          )}
        </div>
      </div>

      {/* What is a Prompt Image */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-white mb-8">What is a Prompt Image?</h2>
        <div className="grid md:grid-cols-2 gap-12 text-slate-300 leading-relaxed">
          <div className="space-y-6">
            <p>
              A prompt image is an AI-generated artwork created using text descriptions called prompts. Each prompt image in our gallery demonstrates the incredible power of modern AI art generation. When you browse our prompt image collection, you'll discover endless creative possibilities.
            </p>
            <p>
              Our prompt image gallery features diverse styles and subjects. From photorealistic prompt images to abstract art, fantasy landscapes, and character designs, every prompt image tells a unique story. Artists and creators worldwide use prompt images as inspiration for their own projects.
            </p>
          </div>
          <div className="space-y-6">
            <p>
              Creating the perfect prompt image requires understanding AI art generation techniques. Our platform helps you learn by showing successful prompt image examples with their original prompts. Study how different prompts produce various prompt image styles and effects.
            </p>
            <p>
              Whether you're new to AI art or an experienced creator, our prompt image community welcomes everyone. Share your own prompt images, discover trending prompt image styles, and connect with fellow artists. Start exploring our prompt image gallery today and unleash your creativity.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Our Prompt Image Platform</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4">Curated Prompt Image Collection</h3>
            <p className="text-slate-400 leading-relaxed">
              Browse our handpicked prompt image gallery featuring high-quality AI artwork. Every prompt image is carefully selected for creativity and technical excellence.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4">Learn from Prompt Images</h3>
            <p className="text-slate-400 leading-relaxed">
              Each prompt image includes detailed generation parameters. Study successful prompts to improve your own prompt image creation skills.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4">Active Community</h3>
            <p className="text-slate-400 leading-relaxed">
              Join thousands of creators sharing prompt images daily. Get feedback, share techniques, and discover new prompt image trends.
            </p>
          </div>
        </div>
      </div>

      {/* About Prompt Image: Ultimate Resource */}
      <div className="mb-24 bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">About Prompt Image: The Ultimate AI Art Resource</h2>
        <p className="text-slate-300 text-lg max-w-4xl mx-auto mb-16 leading-relaxed">
          Welcome to Prompt Image, the ultimate destination for AI art enthusiasts and creators. We are dedicated to exploring the fascinating world of the promptimage, where text meets visual creativity. Our platform serves as a bridge between your imagination and the limitless possibilities of AI generation. Whether you are a seasoned artist or a curious beginner, Prompt Image is your gateway to mastering the art of the promptimage.
        </p>

        <div className="grid md:grid-cols-3 gap-12 text-left">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Mastering the Promptimage</h3>
            <p className="text-slate-400 leading-relaxed">
              Creating a perfect promptimage requires more than just luck; it requires skill and understanding. Our library provides detailed parameters for every promptimage, allowing you to reverse-engineer the magic. Whether you use Midjourney v6, DALL-E 3, Flux, Stable Diffusion XL, Leonardo AI, or nanobanana, you'll find the specific prompts you need to create your own stunning promptimage.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">A Curated Gallery</h3>
            <p className="text-slate-400 leading-relaxed">
              Not all AI art is created equal. We meticulously curate our collection to ensure that every promptimage featured on our site represents the highest quality. From photorealistic portraits to abstract dreamscapes, our gallery is a testament to what's possible when human creativity guides AI algorithms. Find your next favorite promptimage here.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Community and Sharing</h3>
            <p className="text-slate-400 leading-relaxed">
              The world of promptimage creation is evolving rapidly. We believe in the power of community knowledge. By sharing your promptimage workflows and discoveries, you help others learn and grow. Our platform is built on the spirit of open collaboration, making it easier for everyone to master the art of the promptimage.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-2 block">FAQ</span>
          <h2 className="text-3xl font-bold text-white">Find answers to common questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors hover:border-slate-700"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-slate-200 font-medium">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA Block */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">About Prompt Image</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Prompt Image is your ultimate destination for discovering and sharing AI art prompts. Our curated prompt image gallery features thousands of high-quality prompts for Midjourney, DALL-E, Stable Diffusion, and more. Each prompt image in our collection includes detailed parameters and settings to help you recreate stunning AI artwork.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/prompts" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors">
                Browse Gallery
              </Link>
              <Link to="/submit" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20">
                Submit Prompt
              </Link>
              <Link to="/about" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700">
                About Us
              </Link>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <h3 className="text-white font-bold mb-2">Curated Prompt Image Collection</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Browse our handpicked prompt image gallery featuring the best AI-generated artwork and their prompts.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <h3 className="text-white font-bold mb-2">Free to Use</h3>
                <p className="text-slate-400 text-sm leading-relaxed">All prompt image examples are free to copy and use in your favorite AI image generators.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <h3 className="text-white font-bold mb-2">Learn & Create</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Study successful prompt image techniques and create your own stunning AI artwork.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
