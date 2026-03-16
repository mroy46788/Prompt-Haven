import { Search, Menu } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/prompts?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/prompts');
    }
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center flex-1 gap-4">
        <button 
          className="p-2 -ml-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex-1 max-w-2xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
            />
          </form>
        </div>
      </div>

      {/* Ad Box Placeholder - Users can insert their ad scripts here */}
      <div 
        id="header-ad-box" 
        className="hidden xl:flex items-center justify-center w-[468px] h-[40px] bg-slate-900/40 border border-dashed border-slate-800 rounded text-[10px] text-slate-600 uppercase tracking-widest"
      >
        Advertisement
      </div>
    </header>
  );
}
