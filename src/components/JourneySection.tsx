import React, { useState } from 'react';
import {
  Compass,
  Code2,
  Rocket,
  Briefcase,
  Trophy,
  Layers,
  Sparkles,
  Calendar,
  Terminal,
  Globe
} from 'lucide-react';

interface JourneyMilestone {
  id: string;
  year: string;
  period: string;
  title: string;
  category: 'Frontend' | 'Internship' | 'Hackathon' | 'Full Stack' | 'MERN';
  icon: typeof Code2;
  gradient: string;
  glow: string;
  techStack: string[];
}

export const JourneySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const milestones: JourneyMilestone[] = [
    {
      id: 'm-frontend',
      year: '2024',
      period: 'Jan – Feb 2024',
      title: 'Frontend Development & Industry Internship',
      category: 'Frontend',
      icon: Globe,
      gradient: 'from-cyan-500 to-blue-600',
      glow: 'shadow-cyan-500/20 border-cyan-500/40',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Git']
    },
    {
      id: 'm-hackathon-1',
      year: '2024',
      period: 'Spring 2024',
      title: 'Code Whizz Hackathon – 2nd Runner-Up',
      category: 'Hackathon',
      icon: Trophy,
      gradient: 'from-amber-500 to-orange-600',
      glow: 'shadow-amber-500/20 border-amber-500/40',
      techStack: ['Data Structures', 'Algorithms', 'Rapid Prototyping', 'Java']
    },
    {
      id: 'm-wordpress',
      year: '2025',
      period: 'June – July 2025',
      title: 'E-Commerce & WordPress Engineering (Skeneticdigital)',
      category: 'Internship',
      icon: Briefcase,
      gradient: 'from-violet-500 to-purple-600',
      glow: 'shadow-violet-500/20 border-violet-500/40',
      techStack: ['WordPress', 'WooCommerce', 'Elementor', 'SEO', 'Web Performance']
    },
    {
      id: 'm-mern-transition',
      year: '2025',
      period: 'Late 2025',
      title: 'Full Stack & Modern MERN Stack Transition',
      category: 'Full Stack',
      icon: Layers,
      gradient: 'from-emerald-500 to-teal-600',
      glow: 'shadow-emerald-500/20 border-emerald-500/40',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS']
    },
    {
      id: 'm-hackathon-2',
      year: '2026',
      period: 'Spring 2026',
      title: 'Code Whizz 2026 Hackathon – 1st Runner-Up',
      category: 'Hackathon',
      icon: Trophy,
      gradient: 'from-amber-400 to-yellow-500',
      glow: 'shadow-amber-500/20 border-amber-500/40',
      techStack: ['React.js', 'Node.js', 'REST APIs', 'Full Stack System']
    },
    {
      id: 'm-codingrim',
      year: '2026',
      period: 'June – July 2026',
      title: 'MERN Stack Developer Internship (Codingrim Technology)',
      category: 'MERN',
      icon: Rocket,
      gradient: 'from-indigo-500 to-cyan-500',
      glow: 'shadow-indigo-500/20 border-indigo-500/40',
      techStack: ['MERN Stack', 'React.js', 'Express.js', 'MongoDB', 'REST APIs']
    },
    {
      id: 'm-present',
      year: 'Present',
      period: '2026 – Present',
      title: 'Building Scalable Full-Stack Web Applications',
      category: 'Full Stack',
      icon: Terminal,
      gradient: 'from-indigo-400 via-purple-500 to-cyan-400',
      glow: 'shadow-indigo-500/25 border-indigo-400/50',
      techStack: ['TypeScript', 'Full-Stack Engineering', 'System Design', 'Production Software']
    }
  ];

  const categories = ['ALL', 'Frontend', 'Full Stack', 'MERN', 'Internship', 'Hackathon'];

  const filteredMilestones =
    activeFilter === 'ALL'
      ? milestones
      : milestones.filter((m) => m.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="journey" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-xs font-bold tracking-widest text-indigo-400 uppercase shadow-2xs backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>DEVELOPER JOURNEY</span>
          </div>
        </div>

        {/* Section Heading & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Journey from Frontend to{' '}
              <span className="text-indigo-400">
                Software Developer
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Chronological milestones from modern frontend foundations to production full-stack systems.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Streamlined Minimalist Timeline */}
        <div className="relative">
          {/* Vertical Spine Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-indigo-500/30 pointer-events-none" />

          <div className="space-y-6 md:space-y-8">
            {filteredMilestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const IconComp = item.icon;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Compact Milestone Card */}
                  <div className="w-full md:w-[calc(50%-2rem)]">
                    <div
                      className={`group relative bg-slate-900/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-indigo-500/50 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 overflow-hidden`}
                    >
                      {/* Top Accent Line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 bg-indigo-500/80 group-hover:bg-indigo-400 transition-colors"
                      />

                      {/* Header */}
                      <div className="flex items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2.5 py-0.5 rounded-md text-xs font-bold text-white bg-indigo-600"
                          >
                            {item.year}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {item.period}
                          </span>
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-500/30">
                          {item.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-indigo-400 transition-colors mb-3">
                        {item.title}
                      </h3>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md text-xs font-medium text-slate-300 bg-slate-950/80 border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Node Icon Bubble */}
                  <div className="hidden md:flex shrink-0 w-11 h-11 rounded-xl bg-slate-900 border border-indigo-500/40 shadow-md shadow-indigo-500/20 items-center justify-center text-indigo-400 z-10 group-hover:scale-105 transition-transform">
                    <IconComp className="w-5 h-5 text-indigo-400" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-full md:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
