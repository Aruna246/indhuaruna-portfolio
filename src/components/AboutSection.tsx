import React from 'react';
import { useCMS } from '../context/CMSContext';
import {
  GraduationCap,
  BookOpen,
  Wrench,
  Target,
  Code2,
  Sparkles,
  Cpu,
  Briefcase,
  Flame
} from 'lucide-react';

const renderIcon = (name: string) => {
  const iconProps = { className: 'w-6 h-6 text-indigo-400' };
  switch (name) {
    case 'graduation-cap':
      return <GraduationCap {...iconProps} />;
    case 'book-open':
      return <BookOpen {...iconProps} />;
    case 'wrench':
      return <Wrench {...iconProps} />;
    case 'target':
      return <Target {...iconProps} />;
    case 'code':
      return <Code2 {...iconProps} />;
    case 'cpu':
      return <Cpu {...iconProps} />;
    case 'briefcase':
      return <Briefcase {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};

export const AboutSection: React.FC = () => {
  const { data } = useCMS();
  const { about } = data;

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Label */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-xs font-bold tracking-widest text-indigo-400 uppercase shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>ABOUT ME</span>
          </div>
        </div>

        {/* Section Heading & Intro */}
        <div className="max-w-4xl space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {about.sectionTitle || 'Professional Summary'}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {about.introduction}
          </p>
        </div>

        {/* 4 Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {about.highlights.map((item) => (
            <div
              key={item.id}
              className="group p-7 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300 flex items-start gap-5 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <div className="group-hover:text-white transition-colors">
                  {renderIcon(item.iconName)}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Strengths Row */}
        {about.strengths && about.strengths.length > 0 && (
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-indigo-400 uppercase">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>CORE STRENGTHS</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {about.strengths.map((str, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-200 bg-indigo-950/50 hover:text-indigo-300 hover:border-indigo-400/60 rounded-xl border border-indigo-900/60 shadow-xs transition-all"
                >
                  {str}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
