import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowUp, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data } = useCMS();
  const { profile } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950/90 border-t border-slate-800/80 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg">
                {profile.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span className="text-xs font-bold text-indigo-400">
                {profile.title}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Building modern, accessible, and high-performance digital systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer shadow-sm"
              title="Scroll to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 text-indigo-400" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex items-center justify-center text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
