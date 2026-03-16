import { ImagePlus, UploadCloud, FileImage, Sparkles, Copy } from 'lucide-react';
import React, { useState } from 'react';

export default function ImageToPrompt() {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      analyzeImage();
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedPrompt('A highly detailed, photorealistic portrait of a young woman with glowing blue eyes, cyberpunk aesthetic, neon lighting, rain-slicked streets in the background, cinematic composition, 8k resolution, masterpiece.');
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <ImagePlus className="w-10 h-10 text-indigo-500" />
          Image to Prompt
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Upload any image and our AI will reverse-engineer it to generate a detailed prompt you can use to recreate similar styles.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FileImage className="w-5 h-5 text-indigo-400" /> Upload Image
          </h2>
          
          <div 
            className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-colors ${
              isDragging ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-700 hover:border-slate-600 bg-slate-950'
            } ${image ? 'p-2' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden group">
                <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => { setImage(null); setGeneratedPrompt(''); }}
                    className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg font-medium backdrop-blur-sm transition-colors"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
                  <UploadCloud className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-300 font-medium mb-2">Drag & drop your image here</p>
                <p className="text-slate-500 text-sm mb-6 text-center">Supports JPG, PNG, WEBP up to 10MB</p>
                
                <label className="px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-xl font-medium transition-colors border border-indigo-500/20 cursor-pointer">
                  Browse Files
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
                </label>
              </>
            )}
          </div>
        </div>

        {/* Result Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" /> Generated Prompt
          </h2>
          
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-6 relative flex flex-col">
            {!image ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                <p>Upload an image to see the magic happen</p>
              </div>
            ) : isAnalyzing ? (
              <div className="flex-1 flex flex-col items-center justify-center text-indigo-400">
                <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p className="font-medium animate-pulse">Analyzing image details...</p>
              </div>
            ) : (
              <>
                <p className="text-slate-300 font-mono text-sm leading-relaxed flex-1">
                  {generatedPrompt}
                </p>
                <div className="mt-6 pt-6 border-t border-slate-800 flex justify-end">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedPrompt);
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                  >
                    <Copy className="w-5 h-5" /> {isCopied ? 'Copied!' : 'Copy Prompt'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
