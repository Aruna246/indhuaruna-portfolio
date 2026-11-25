import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Download, Sparkles } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { data, setIsResumeModalOpen } = useCMS();
  const { cta } = data;

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/80 border border-slate-800 p-8 sm:p-14 lg:p-16 text-center space-y-8 shadow-2xl">
          {/* Ambient Glowing Blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/90 border border-indigo-500/40 text-xs font-bold tracking-widest text-indigo-300 uppercase shadow-xs backdrop-blur-md mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>OPEN FOR OPPORTUNITIES</span>
          </div>

          {/* Heading */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {cta.title || 'Ready to collaborate or build something impactful?'}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              {cta.subtitle ||
                'Looking for a passionate Software Developer ready to write clean code, solve technical challenges, and build reliable web systems.'}
            </p>
          </div>

          {/* Action Button: Download Resume */}
          <div className="flex items-center justify-center pt-2">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-500/30 active:scale-98 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
