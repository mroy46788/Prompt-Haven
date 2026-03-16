import { Heart } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLikes } from '../hooks/useLikes';

interface PromptCardProps {
  id: string;
  title: string;
  image: string;
  tags: string[];
  isFeatured?: boolean;
  promptText?: string;
  key?: string | number;
}

export default function PromptCard({ id, title, image, tags, isFeatured, promptText }: PromptCardProps) {
  const navigate = useNavigate();
  const { likes, isLiked, toggleLike } = useLikes(id);

  return (
    <Link to={`/prompts/${id}`} className="group block rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-indigo-500/10">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <button 
            className={`flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-md rounded-full text-white transition-colors ${
              isLiked ? 'bg-rose-500/80 hover:bg-rose-500/90' : 'bg-black/40 hover:bg-black/60'
            }`} 
            onClick={toggleLike}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
            <span className="text-xs font-medium">{likes}</span>
          </button>
        </div>
        {isFeatured && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-rose-500/90 backdrop-blur-md rounded-full text-white text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-slate-100 text-lg mb-3 line-clamp-1 group-hover:text-indigo-400 transition-colors">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700/50">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700/50">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
