import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  siteName: string;
  siteLogo: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: string;
  description: string;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  isLoading: boolean;
}

const defaultSettings: Settings = {
  siteName: 'Prompt Haven',
  siteLogo: '',
  primaryColor: '#6366f1',
  secondaryColor: '#0f172a',
  fontFamily: 'Inter, sans-serif',
  layout: 'grid',
  description: 'A comprehensive directory for AI prompts, tools, and creations.'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setIsLoading(false);
        applyTheme(data);
      })
      .catch(err => {
        console.error('Failed to fetch settings:', err);
        setIsLoading(false);
      });
  }, []);

  const applyTheme = (s: Settings) => {
    document.documentElement.style.setProperty('--primary-color', s.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', s.secondaryColor);
    document.body.style.fontFamily = s.fontFamily;
    document.title = s.siteName;
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        applyTheme(data.settings);
      }
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
