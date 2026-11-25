import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Trophy, Medal, Calendar, Award, CheckCircle2, Sparkles, Building } from 'lucide-react';

export const AwardsSection: React.FC = () => {
  const { data } = useCMS();
  const { awards } = data;

  if (!awards || awards.length === 0) return null;

  return (
    <section id="awards" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-xs font-bold tracking-widest text-indigo-400 uppercase shadow-2xs backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-indigo-400" />
            <span>HONORS & RECOGNITIONS</span>
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-3xl space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Hackathons &{' '}
            <span className="text-indigo-400">
              Coding Competitions
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Awards and accolades won in competitive programming, algorithmic hackathons, and technical design sprints.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {awards.map((award) => (
            <div
              key={award.id}
              className="group relative bg-slate-900/80 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Highlight Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500/80 group-hover:bg-indigo-400 transition-colors" />

              <div>
                <div className="flex items-start justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Trophy className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider mb-1.5">
                        {award.placement}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {award.title}
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-bold text-slate-300 shrink-0">
                    {award.year}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                  {award.description}
                </p>
              </div>

              {/* Institution / Issuer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Building className="w-4 h-4 text-indigo-400" />
                <span>{award.institution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
