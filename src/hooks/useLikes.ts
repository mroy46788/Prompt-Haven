import React, { useState, useEffect } from 'react';

export function useLikes(promptId: string | number) {
  const storageKey = `prompt_likes_${promptId}`;
  
  // Deterministic base likes
  const getBaseLikes = (id: string | number) => {
    const str = String(id);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 300 + 50;
  };

  const baseLikes = getBaseLikes(promptId);
  
  const [currentPromptId, setCurrentPromptId] = useState(promptId);
  const [likes, setLikes] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? parseInt(stored, 10) : baseLikes;
  });
  
  const [isLiked, setIsLiked] = useState(() => {
    return localStorage.getItem(`${storageKey}_user_liked`) === 'true';
  });

  // Derive state from props to avoid flicker when navigating between prompts
  if (promptId !== currentPromptId) {
    setCurrentPromptId(promptId);
    const stored = localStorage.getItem(storageKey);
    setLikes(stored ? parseInt(stored, 10) : baseLikes);
    setIsLiked(localStorage.getItem(`${storageKey}_user_liked`) === 'true');
  }

  const toggleLike = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (isLiked) {
      const newLikes = likes - 1;
      setLikes(newLikes);
      setIsLiked(false);
      localStorage.setItem(storageKey, newLikes.toString());
      localStorage.setItem(`${storageKey}_user_liked`, 'false');
      window.dispatchEvent(new Event('likes_updated'));
    } else {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setIsLiked(true);
      localStorage.setItem(storageKey, newLikes.toString());
      localStorage.setItem(`${storageKey}_user_liked`, 'true');
      window.dispatchEvent(new Event('likes_updated'));
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem(storageKey);
      if (stored) setLikes(parseInt(stored, 10));
      setIsLiked(localStorage.getItem(`${storageKey}_user_liked`) === 'true');
    };

    window.addEventListener('likes_updated', handleStorageChange);
    return () => window.removeEventListener('likes_updated', handleStorageChange);
  }, [storageKey]);

  return { likes, isLiked, toggleLike };
}
