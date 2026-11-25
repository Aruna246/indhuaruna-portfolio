import React from 'react';
import { useCMS } from '../context/CMSContext';
import { X, Download, FileText } from 'lucide-react';
import { PdfCanvasViewer } from './PdfCanvasViewer';

export const ResumeModal: React.FC = () => {
  const { data, isResumeModalOpen, setIsResumeModalOpen } = useCMS();

  if (!isResumeModalOpen) return null;

  const { profile, education, experience, projects, skillsCategories, resume, awards } = data;

  const handleDownload = () => {
    if (resume.pdfUrl) {
      const link = document.createElement('a');
      link.href = resume.pdfUrl;
      link.download = resume.pdfFileName || `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.print();
    }
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in"
      onClick={() => setIsResumeModalOpen(false)}
    >
      <div
        id="resume-modal-dialog"
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-700/60 overflow-hidden relative animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Toolbar: ONLY Download and Close as requested */}
        <div className="print:hidden bg-slate-900 text-white px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base text-white block leading-tight">
                {profile.name} - Resume
              </span>
              {resume.pdfFileName && (
                <span className="text-[11px] text-slate-400 block font-mono">
                  {resume.pdfFileName}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Single prominent Download button */}
            {resume.pdfUrl ? (
              <a
                href={resume.pdfUrl}
                download={resume.pdfFileName || `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white transition-all shadow-md shadow-indigo-600/30 active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            ) : (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white transition-all shadow-md shadow-indigo-600/30 active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            )}

            <button
              onClick={() => setIsResumeModalOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content: Render uploaded PDF via HTML5 Canvas or fallback document */}
        {resume.pdfUrl ? (
          <div className="w-full h-[78vh] sm:h-[82vh] bg-slate-900 flex flex-col relative overflow-hidden">
            <PdfCanvasViewer
              pdfDataUrl={resume.pdfUrl}
              fileName={resume.pdfFileName || `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
            />
          </div>
        ) : (
          <div className="overflow-y-auto p-6 sm:p-10 bg-slate-100/60 print:bg-white print:p-0">
            <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-xs border border-slate-200/80 print:border-none print:shadow-none print:p-0 space-y-5 text-slate-800">
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                  {profile.name}
                </h1>

                <div className="flex flex-wrap justify-center items-center gap-y-1 gap-x-3 text-xs text-slate-700 font-medium">
                  {profile.socials.phone && <span>{profile.socials.phone}</span>}
                  {profile.socials.email && <span>• {profile.socials.email}</span>}
                  {profile.socials.location && <span>• {profile.socials.location}</span>}
                  {profile.socials.linkedin && <span>• LinkedIn</span>}
                  {profile.socials.github && <span>• GitHub</span>}
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-1">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Professional Summary
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {resume.summary || profile.bio}
                </p>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Education
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-slate-900">{edu.institution}</h3>
                        <p className="text-xs text-slate-700">{edu.degree}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-slate-800 block">
                          {edu.duration}
                        </span>
                        {edu.cgpa && (
                          <span className="text-xs font-bold text-slate-900">
                            CGPA: {edu.cgpa}
                          </span>
                        )}
                        {(edu.percentage || edu.score) && !edu.cgpa && (
                          <span className="text-xs font-bold text-slate-900">
                            Score: {edu.percentage || edu.score}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Skills */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Technical Skills
                </h2>
                <div className="space-y-1 text-xs">
                  {skillsCategories.map((cat) => (
                    <div key={cat.id} className="flex">
                      <span className="font-bold text-slate-900 w-36 shrink-0">
                        {cat.categoryName}:
                      </span>
                      <span className="text-slate-700">
                        {cat.skills.map((s) => s.name).join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience / Internships */}
              {experience && experience.length > 0 && (
                <div className="space-y-2.5">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                    Internships & Experience
                  </h2>
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">
                            {exp.role} – <span className="font-semibold text-slate-800">{exp.company}</span>
                          </h3>
                          <p className="text-[11px] text-slate-500 font-medium">{exp.location}</p>
                        </div>
                        <span className="text-xs font-semibold text-slate-700">
                          {exp.duration}
                        </span>
                      </div>

                      {exp.highlights && exp.highlights.length > 0 ? (
                        <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 pl-1">
                          {exp.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-700">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Projects */}
              <div className="space-y-2.5">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Projects
                </h2>
                <div className="space-y-2">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-0.5">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-xs font-bold text-slate-900">
                          {proj.title}{' '}
                          <span className="text-[11px] font-normal text-slate-500">
                            | {proj.tags.join(', ')}
                          </span>
                        </h3>
                        {proj.completedDate && (
                          <span className="text-xs text-slate-500">{proj.completedDate}</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honors & Awards */}
              {awards && awards.length > 0 && (
                <div className="space-y-1.5">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                    Honors & Awards
                  </h2>
                  <div className="space-y-1 text-xs">
                    {awards.map((award) => (
                      <div key={award.id} className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-900">{award.title}</span>
                          <span className="text-slate-600"> – {award.institution}</span>
                        </div>
                        <span className="text-slate-600 font-semibold shrink-0 pl-2">
                          {award.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
