import { Rabbit, Sun, Moon, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-800 bg-slate-950 pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
                <Rabbit className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Prompt Image</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Discover and share AI art prompts with our creative community
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              RESOURCES
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/submit" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Submit Prompt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              COMPANY
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              LEGAL
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Prompt Image All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
