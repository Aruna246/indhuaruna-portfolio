import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Download, ArrowRight, Code2, GraduationCap, MapPin, Mail } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, setIsResumeModalOpen } = useCMS();
  const { profile } = data;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Status Badge */}
          {profile.statusBadge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-xs sm:text-sm font-medium text-slate-300 shadow-lg shadow-black/20 hover:border-indigo-500/50 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-slate-200">{profile.statusBadge}</span>
            </div>
          )}

          {/* Title & Name */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
              {profile.headlinePrefix || "Hi, I'm"}{' '}
              <span className="text-indigo-400 uppercase">
                {profile.name}
              </span>
            </h1>

            {/* Sub-badge role & degree */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-950/80 border border-indigo-500/40 rounded-xl text-indigo-300 text-sm sm:text-base font-bold shadow-xs">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Software Developer</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900/80 border border-slate-700/70 rounded-xl text-slate-300 text-sm sm:text-base font-semibold">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>B.E. ECE (2023 – 2027)</span>
              </span>
              {profile.socials.location && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900/80 border border-slate-700/70 rounded-xl text-slate-300 text-sm sm:text-base font-semibold">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>{profile.socials.location}</span>
                </span>
              )}
            </div>
          </div>

          {/* Bio Paragraph */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl font-normal">
            {profile.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              id="hero-view-projects-button"
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base shadow-lg shadow-indigo-500/25 active:scale-98 transition-all cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-download-resume-button"
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-base border border-slate-700/80 active:scale-98 transition-all cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Download Resume</span>
            </button>

            <button
              id="hero-contact-button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-bold text-base border border-slate-800 hover:border-indigo-500/40 active:scale-98 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>Contact Me</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
