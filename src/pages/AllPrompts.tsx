import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PromptCard from '../components/PromptCard';

const PROMPTS_PER_PAGE = 13;

export default function AllPrompts() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/prompts')
      .then(res => res.json())
      .then(data => setPrompts(data))
      .catch(err => console.error(err));
  }, []);

  const categories = useMemo(() => {
    const tags = new Set<string>();
    prompts.forEach(prompt => {
      prompt.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags)];
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedCount, setDisplayedCount] = useState(PROMPTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredPrompts = useMemo(() => {
    let filtered = prompts;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(prompt => prompt.tags.includes(selectedCategory));
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(prompt => 
        prompt.title.toLowerCase().includes(query) || 
        prompt.promptText.toLowerCase().includes(query) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  const displayedPrompts = useMemo(() => {
    return filteredPrompts.slice(0, displayedCount);
  }, [filteredPrompts, displayedCount]);

  const hasMore = displayedCount < filteredPrompts.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + PROMPTS_PER_PAGE, filteredPrompts.length));
      setIsLoading(false);
    }, 1000);
  }, [isLoading, hasMore, filteredPrompts.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMore, hasMore, isLoading]);

  // Reset count when category or search query changes
  useEffect(() => {
    setDisplayedCount(PROMPTS_PER_PAGE);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 capitalize">
          {selectedCategory === 'All' 
            ? (searchQuery ? `Search Results for "${searchQuery}"` : 'AI Prompts')
            : selectedCategory
          }
        </h1>
        <p className="text-slate-400 text-lg">
          {selectedCategory === 'All'
            ? (searchQuery 
                ? `Found ${filteredPrompts.length} prompt${filteredPrompts.length === 1 ? '' : 's'} matching your search`
                : 'Browse our collection of AI image generation prompts')
            : 'Explore our curated collection of AI image prompts in this category. Each prompt is tested and optimized for the best results with popular AI generators like Midjourney, DALL-E, and Stable Diffusion.'
          }
        </p>
      </div>

      {/* Categories */}
      <div className="relative group mb-12">
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/90 text-white border border-slate-800 hover:bg-slate-800 transition-all shadow-xl backdrop-blur-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        
        <div 
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide px-2 scroll-smooth"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all capitalize border ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-slate-800/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/90 text-white border border-slate-800 hover:bg-slate-800 transition-all shadow-xl backdrop-blur-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedPrompts.map(({ id, title, image, tags, isFeatured, promptText }) => (
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

      {hasMore && (
        <div 
          ref={loaderRef}
          className="flex items-center justify-center py-12 text-slate-400"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
              <span className="text-lg font-medium">Loading more...</span>
            </div>
          ) : (
            <div className="h-6" /> // Spacer to maintain height when not loading but has more
          )}
        </div>
      )}

      {!hasMore && displayedPrompts.length > 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-sm">You've reached the end of the prompts.</p>
        </div>
      )}

      {displayedPrompts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No prompts found for this category.</p>
        </div>
      )}
    </div>
  );
}
