import React from 'react';
import { useCMS } from '../context/CMSContext';
import { GraduationCap, Calendar, Award, MapPin, School } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { data } = useCMS();
  const { education } = data;

  return (
    <section id="education" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Tag */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-xs font-bold tracking-widest text-indigo-400 uppercase shadow-2xs backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Formal Education &{' '}
            <span className="text-indigo-400">
              Qualifications
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Academic qualifications and academic record.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="group relative bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header with Duration & Score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{edu.duration}</span>
                    </div>

                    {edu.cgpa && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        <span>CGPA: {edu.cgpa}</span>
                      </span>
                    )}

                    {(edu.percentage || edu.score) && !edu.cgpa && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Score: {edu.percentage || edu.score}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Degree & Institution */}
                <div className="space-y-1.5 pt-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium text-slate-300">
                    {edu.institution}
                  </p>
                  {edu.location && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
