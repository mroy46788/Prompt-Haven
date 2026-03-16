import { Link, useLocation } from 'react-router-dom';
import { Home, Image as ImageIcon, BookOpen, PenTool, ImagePlus, CreditCard, LogIn, Rabbit, X, Info, Mail, Send } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  const { settings } = useSettings();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'All Prompts', path: '/prompts', icon: ImageIcon },
    { name: 'Submit Prompt', path: '/submit', icon: Send },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const toolsItems = [
    { name: 'AI Creation Edit', path: '/tools/edit', icon: PenTool },
    { name: 'Image to Prompt', path: '/tools/image-to-prompt', icon: ImagePlus },
    { name: 'Pricing', path: '/pricing', icon: CreditCard },
  ];

  return (
    <aside className={`w-64 bg-slate-950 border-r border-slate-800 h-screen fixed left-0 top-0 flex flex-col text-slate-300 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-6 flex flex-col items-center justify-center border-b border-slate-800/50 relative">
        <button 
          className="absolute top-4 right-4 lg:hidden text-slate-400 hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-2 border border-slate-800 overflow-hidden">
          {settings.siteLogo ? (
            <img src={settings.siteLogo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <Rabbit className="w-8 h-8 text-white" />
          )}
        </div>
        <h1 className="text-white font-bold text-lg">{settings.siteName}</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        <div>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-slate-800 text-white'
                        : 'hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
