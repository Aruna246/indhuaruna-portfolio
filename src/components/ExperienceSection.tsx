import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building, Sparkles } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data } = useCMS();
  const { experience } = data;

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-xs font-bold tracking-widest text-indigo-400 uppercase shadow-2xs backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>INDUSTRY EXPERIENCE</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Work Experience &{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Internships
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Real-world software engineering experience in MERN stack development, frontend architecture, and client-facing digital systems.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="group relative bg-slate-900/80 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Left Accent Color Strip */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-500" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-950/90 text-indigo-300 border border-indigo-500/40">
                      Internship
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm font-semibold text-slate-300">
                    <span className="flex items-center gap-1.5 text-indigo-300 font-bold">
                      <Building className="w-4 h-4 text-indigo-400" />
                      <span>{exp.company}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-bold text-slate-300 shrink-0 self-start">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                {exp.description}
              </p>

              {/* Key Highlights / Deliverables */}
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="space-y-2.5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                    Key Deliverables & Responsibilities:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {exp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
