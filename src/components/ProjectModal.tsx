import React from 'react';
import { useCMS } from '../context/CMSContext';
import { X, Github, ExternalLink, Star, CheckCircle, Calendar, User, Edit3, Image as ImageIcon, Sparkles } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { activeProjectModal, setActiveProjectModal, setIsAdminOpen, isAdminAuthenticated } = useCMS();

  if (!activeProjectModal) return null;

  const project = activeProjectModal;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setActiveProjectModal(null)}
    >
      <div
        id="project-modal-dialog"
        className="bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-800 relative animate-in zoom-in-95 duration-150 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold text-indigo-300 bg-indigo-950/80 rounded-full border border-indigo-500/40">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-indigo-600 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  setActiveProjectModal(null);
                  setIsAdminOpen(true);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/40 rounded-lg transition-colors cursor-pointer"
                title="Edit Project"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Project</span>
              </button>
            )}
            <button
              onClick={() => setActiveProjectModal(null)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Project Image banner */}
          <div className="aspect-[16/9] w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center relative">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center mb-3 text-indigo-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-white">{project.title}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Full Stack Architecture & Application Overview
                </p>
              </div>
            )}
          </div>

          {/* Title & Metadata */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
              {project.role && (
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span>{project.role}</span>
                </span>
              )}
              {project.completedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>{project.completedDate}</span>
                </span>
              )}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Project Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Key Features & Engineering Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Tech Stack & Tooling
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-950 border border-slate-800 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Application</span>
                </a>
              )}
            </div>

            <button
              onClick={() => setActiveProjectModal(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
