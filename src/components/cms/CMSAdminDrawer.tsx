import React, { useState, useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  X,
  Layers,
  FolderGit2,
  GraduationCap,
  Sparkles,
  Inbox,
  Plus,
  Trash2,
  Edit2,
  Edit3,
  Check,
  ExternalLink,
  Save,
  FileText,
  LogOut,
  ShieldCheck,
  Eye,
  AlertCircle,
  FileUp,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  Upload,
  Download,
  Search,
  Copy,
  ArrowUp,
  ArrowDown,
  Globe,
  Star,
  Tag,
  Calendar,
  Code2,
  Link2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProjectItem, EducationItem } from '../../types';

const POPULAR_SKILL_SUGGESTIONS = [
  'Java',
  'JavaScript',
  'TypeScript',
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MySQL',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Python',
  'Next.js',
  'Docker',
  'Git & GitHub',
  'REST APIs',
  'Data Structures & Algorithms',
  'Object-Oriented Programming (OOP)',
  'WordPress',
  'Postman'
];

type TabType = 'projects' | 'skills' | 'education' | 'cta' | 'inbox';

const QUICK_CATEGORY_OPTIONS = [
  'Full Stack',
  'Frontend',
  'Backend',
  'AI / ML',
  'WordPress / E-Commerce',
  'Mobile App',
  'Cloud / DevOps'
];

const SAMPLE_PROJECT_IMAGE_PRESETS = [
  {
    label: 'Modern Tech Dashboard',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Code / IDE Workspace',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Fintech & Analytics',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'E-Commerce Platform',
    url: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'AI & Data Visuals',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Mobile App Mockup',
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80'
  }
];

const POPULAR_TECH_TAGS = [
  'React.js',
  'TypeScript',
  'Node.js',
  'Express.js',
  'Next.js',
  'Tailwind CSS',
  'MongoDB',
  'PostgreSQL',
  'Firebase',
  'Docker',
  'GraphQL',
  'Python',
  'FastAPI',
  'Prisma',
  'AWS',
  'Vite'
];

interface EditableProjectCardProps {
  proj: ProjectItem;
  originalIndex: number;
  totalCount: number;
  onUpdate: (id: string, updates: Partial<ProjectItem>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (proj: ProjectItem) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

const EditableProjectCard: React.FC<EditableProjectCardProps> = ({
  proj,
  originalIndex,
  totalCount,
  onUpdate,
  onDelete,
  onDuplicate,
  onMove
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  // Local state for all fields to guarantee zero typing latency, zero focus loss, and zero dropped keys
  const [title, setTitle] = useState(proj.title || '');
  const [category, setCategory] = useState(proj.category || '');
  const [description, setDescription] = useState(proj.description || '');
  const [liveUrl, setLiveUrl] = useState(proj.liveUrl || '');
  const [githubUrl, setGithubUrl] = useState(proj.githubUrl || '');
  const [image, setImage] = useState(proj.image || '');
  const [role, setRole] = useState(proj.role || '');
  const [completedDate, setCompletedDate] = useState(proj.completedDate || '');
  const [fullDescription, setFullDescription] = useState(proj.fullDescription || '');
  const [tagsStr, setTagsStr] = useState(() => (Array.isArray(proj.tags) ? proj.tags.join(', ') : ''));
  const [featuresStr, setFeaturesStr] = useState(() =>
    Array.isArray(proj.keyFeatures) ? proj.keyFeatures.join('\n') : ''
  );

  // Sync from props only when project ID changes (or when resetting)
  React.useEffect(() => {
    setTitle(proj.title || '');
    setCategory(proj.category || '');
    setDescription(proj.description || '');
    setLiveUrl(proj.liveUrl || '');
    setGithubUrl(proj.githubUrl || '');
    setImage(proj.image || '');
    setRole(proj.role || '');
    setCompletedDate(proj.completedDate || '');
    setFullDescription(proj.fullDescription || '');
    setTagsStr(Array.isArray(proj.tags) ? proj.tags.join(', ') : '');
    setFeaturesStr(Array.isArray(proj.keyFeatures) ? proj.keyFeatures.join('\n') : '');
  }, [proj.id]);

  const showSavedIndicator = () => {
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2000);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    onUpdate(proj.id, { title: val });
    showSavedIndicator();
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    onUpdate(proj.id, { category: val });
    showSavedIndicator();
  };

  const handleDescriptionChange = (val: string) => {
    setDescription(val);
    onUpdate(proj.id, { description: val });
    showSavedIndicator();
  };

  const handleLiveUrlChange = (val: string) => {
    setLiveUrl(val);
    onUpdate(proj.id, { liveUrl: val });
  };

  const handleGithubUrlChange = (val: string) => {
    setGithubUrl(val);
    onUpdate(proj.id, { githubUrl: val });
  };

  const handlePasteLiveUrl = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          handleLiveUrlChange(text.trim());
          showSavedIndicator();
          return;
        }
      }
    } catch {
      // Fallback if clipboard API is blocked in iframe
    }
    const el = document.getElementById(`live-demo-input-${proj.id}`) as HTMLInputElement | null;
    if (el) {
      el.focus();
      el.select();
    }
  };

  const handlePasteGithubUrl = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          handleGithubUrlChange(text.trim());
          showSavedIndicator();
          return;
        }
      }
    } catch {
      // Fallback if clipboard API is blocked in iframe
    }
    const el = document.getElementById(`github-url-input-${proj.id}`) as HTMLInputElement | null;
    if (el) {
      el.focus();
      el.select();
    }
  };

  const handleTagsChange = (val: string) => {
    setTagsStr(val);
    const parsed = val.split(',').map((t) => t.trim()).filter(Boolean);
    onUpdate(proj.id, { tags: parsed });
    showSavedIndicator();
  };

  const handleAddTag = (tag: string) => {
    const existing = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);
    if (!existing.includes(tag)) {
      const next = existing.length > 0 ? `${tagsStr.trim()}, ${tag}` : tag;
      setTagsStr(next);
      onUpdate(proj.id, { tags: next.split(',').map((t) => t.trim()).filter(Boolean) });
      showSavedIndicator();
    }
  };

  const handleFeaturesChange = (val: string) => {
    setFeaturesStr(val);
    const parsed = val.split('\n').map((f) => f.trim()).filter(Boolean);
    onUpdate(proj.id, { keyFeatures: parsed });
    showSavedIndicator();
  };

  const handleImageChange = (val: string) => {
    setImage(val);
    onUpdate(proj.id, { image: val });
    showSavedIndicator();
  };

  const handleImageFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, SVG)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size is too large (max 5MB).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result as string;
      if (res) {
        handleImageChange(res);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      id={`project-card-${proj.id}`}
      className="p-5 rounded-2xl border-2 border-slate-200 hover:border-indigo-400 bg-white shadow-xs hover:shadow-md transition-all space-y-4"
    >
      {/* Top Header Row of the Card: Title, Order Buttons, Badges, Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          {/* Move Up/Down Controls */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            <button
              type="button"
              disabled={originalIndex === 0}
              onClick={() => onMove(originalIndex, 'up')}
              className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Move project up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold text-slate-600 px-1">#{originalIndex + 1}</span>
            <button
              type="button"
              disabled={originalIndex === totalCount - 1}
              onClick={() => onMove(originalIndex, 'down')}
              className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Move project down"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Project #{originalIndex + 1}
            </span>
            {isSavedRecently && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md animate-in fade-in">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Auto-saved</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Toggle Featured */}
          <button
            type="button"
            onClick={() => {
              onUpdate(proj.id, { featured: !proj.featured });
              showSavedIndicator();
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
              proj.featured
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Toggle Featured Project"
          >
            <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>{proj.featured ? 'Featured' : 'Mark Featured'}</span>
          </button>

          {/* Duplicate */}
          <button
            type="button"
            onClick={() => onDuplicate(proj)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Duplicate Project"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Duplicate</span>
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(proj.id)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
            title={`Delete ${title || proj.title}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Direct-Editable Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Project Title Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Project Title *</span>
            <span className="text-[10px] font-normal text-emerald-600">Direct Edit</span>
          </label>
          <input
            id={`project-title-${proj.id}`}
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. AI-Powered Healthcare Portal"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs font-bold text-slate-900 bg-white"
          />
        </div>

        {/* Category Input & Quick Chips */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Category *</label>
          <input
            id={`project-category-${proj.id}`}
            type="text"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            placeholder="e.g. Full Stack, Frontend, Backend, AI / ML"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs font-semibold text-slate-800 bg-white"
          />
          <div className="flex flex-wrap gap-1 pt-1">
            {QUICK_CATEGORY_OPTIONS.slice(0, 5).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                  category.toLowerCase() === cat.toLowerCase()
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-100 hover:bg-indigo-100 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Short Summary Description */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700">
          Short Summary (Displayed directly on website project card) *
        </label>
        <textarea
          id={`project-desc-${proj.id}`}
          rows={2}
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Brief 1-2 sentence description highlighting key technologies and functionality..."
          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs text-slate-800 bg-white resize-none"
        />
      </div>

      {/* URLs: Live Demo & GitHub (High-visibility, dedicated link inputs) */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Project External Links (Live Demo & GitHub)</span>
          </label>
          <span className="text-[10px] text-slate-500">Type or paste URLs below</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Live Demo URL Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor={`live-demo-input-${proj.id}`} className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Demo URL</span>
              </label>
              <button
                type="button"
                onClick={handlePasteLiveUrl}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
              >
                Paste URL
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                id={`live-demo-input-${proj.id}`}
                name={`live-demo-input-${proj.id}`}
                type="text"
                autoComplete="off"
                spellCheck={false}
                value={liveUrl}
                onChange={(e) => handleLiveUrlChange(e.target.value)}
                onBlur={() => {
                  onUpdate(proj.id, { liveUrl: liveUrl.trim() });
                  showSavedIndicator();
                }}
                placeholder="https://my-live-demo.vercel.app"
                className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-xs font-medium text-slate-900 bg-white"
              />
              <div className="flex items-center gap-1 shrink-0">
                {liveUrl ? (
                  <>
                    <a
                      href={liveUrl.startsWith('http') ? liveUrl : `https://${liveUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                      title="Open live demo in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        handleLiveUrlChange('');
                        onUpdate(proj.id, { liveUrl: '' });
                      }}
                      className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                      title="Clear live demo URL"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* GitHub Repository URL Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor={`github-url-input-${proj.id}`} className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-slate-800" />
                <span>GitHub Repository URL</span>
              </label>
              <button
                type="button"
                onClick={handlePasteGithubUrl}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
              >
                Paste URL
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                id={`github-url-input-${proj.id}`}
                name={`github-url-input-${proj.id}`}
                type="text"
                autoComplete="off"
                spellCheck={false}
                value={githubUrl}
                onChange={(e) => handleGithubUrlChange(e.target.value)}
                onBlur={() => {
                  onUpdate(proj.id, { githubUrl: githubUrl.trim() });
                  showSavedIndicator();
                }}
                placeholder="https://github.com/username/project-repo"
                className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs font-medium text-slate-900 bg-white"
              />
              <div className="flex items-center gap-1 shrink-0">
                {githubUrl ? (
                  <>
                    <a
                      href={githubUrl.startsWith('http') ? githubUrl : `https://${githubUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
                      title="Open GitHub repo in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        handleGithubUrlChange('');
                        onUpdate(proj.id, { githubUrl: '' });
                      }}
                      className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                      title="Clear GitHub URL"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image Controls */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
            <span>Cover Image</span>
          </label>
          {image && (
            <button
              type="button"
              onClick={() => handleImageChange('')}
              className="text-[11px] font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Remove Image</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
          <div className="sm:col-span-1 aspect-video w-full rounded-lg bg-slate-900 overflow-hidden border border-slate-200 flex items-center justify-center relative">
            {image ? (
              <img src={image} alt={title || proj.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-slate-400 p-1">
                <ImageIcon className="w-5 h-5 text-slate-500 mb-0.5" />
                <span className="text-[9px]">No Image</span>
              </div>
            )}
          </div>

          <div className="sm:col-span-3 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-2xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Local File</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageFile(file);
                  }}
                />
              </label>
              <span className="text-[11px] text-slate-500">PNG, JPG, WebP</span>
            </div>

            <input
              id={`project-image-url-${proj.id}`}
              type="text"
              value={image}
              onChange={(e) => handleImageChange(e.target.value)}
              placeholder="Or paste image URL (https://...)"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:border-indigo-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div className="pt-1.5 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-slate-500 mr-1">Presets:</span>
          {SAMPLE_PROJECT_IMAGE_PRESETS.slice(0, 4).map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleImageChange(p.url)}
              className="px-2 py-0.5 rounded text-[10px] font-medium bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              + {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Stack Tags Input & Quick Add */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-slate-500" />
          <span>Tech Stack Tags (Comma separated)</span>
        </label>
        <input
          id={`project-tags-${proj.id}`}
          type="text"
          value={tagsStr}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="e.g. React.js, Node.js, Express.js, MongoDB, Tailwind CSS"
          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs font-medium text-slate-800 bg-white"
        />
        <div className="flex flex-wrap gap-1 pt-1">
          <span className="text-[10px] text-slate-500 font-semibold mr-1">Quick Add:</span>
          {POPULAR_TECH_TAGS.slice(0, 8).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleAddTag(tag)}
              className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 transition-colors cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Expand/Collapse Additional Details Button */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
        >
          <span>{isExpanded ? '▲ Hide Advanced Details' : '▼ Edit Role, Year & Case Study Highlights'}</span>
        </button>

        <span className="text-[11px] text-slate-400">All edits save automatically</span>
      </div>

      {/* Advanced Details Collapsible Section */}
      {isExpanded && (
        <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-3 animate-in fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Developer Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  onUpdate(proj.id, { role: e.target.value });
                  showSavedIndicator();
                }}
                placeholder="e.g. Lead Full Stack Developer"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Year / Completion Date</label>
              <input
                type="text"
                value={completedDate}
                onChange={(e) => {
                  setCompletedDate(e.target.value);
                  onUpdate(proj.id, { completedDate: e.target.value });
                  showSavedIndicator();
                }}
                placeholder="e.g. 2026 or Jan 2026"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Full Description / Case Study Details</label>
            <textarea
              rows={3}
              value={fullDescription}
              onChange={(e) => {
                setFullDescription(e.target.value);
                onUpdate(proj.id, { fullDescription: e.target.value });
                showSavedIndicator();
              }}
              placeholder="Comprehensive architectural overview, problem statement, solution, and outcomes for details modal"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Key Features (One feature highlight per line)</label>
            <textarea
              rows={3}
              value={featuresStr}
              onChange={(e) => handleFeaturesChange(e.target.value)}
              placeholder="Real-time WebSocket chat and instant notification engine&#10;Role-Based Access Control (RBAC) with JWT auth&#10;Stripe payment gateway integration with webhooks"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white resize-none font-mono text-[11px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface EditableSkillItemProps {
  categoryId: string;
  skill: { id: string; name: string; proficiency: number };
  onUpdate: (categoryId: string, skillId: string, name: string, proficiency: number) => void;
  onDelete: (categoryId: string, skillId: string) => void;
}

const EditableSkillItem: React.FC<EditableSkillItemProps> = ({
  categoryId,
  skill,
  onUpdate,
  onDelete
}) => {
  const [name, setName] = useState(skill.name);
  const [proficiency, setProficiency] = useState(skill.proficiency);
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    setName(skill.name);
    setProficiency(skill.proficiency);
  }, [skill.id, skill.name, skill.proficiency]);

  const showSaved = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    onUpdate(categoryId, skill.id, val, proficiency);
    showSaved();
  };

  const handleProficiencyChange = (val: number) => {
    setProficiency(val);
    onUpdate(categoryId, skill.id, name, val);
    showSaved();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200 transition-colors">
      <div className="flex-1 flex items-center gap-2">
        <input
          id={`skill-name-${skill.id}`}
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Skill name (e.g. Java, React.js)"
          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs font-semibold text-slate-800 bg-white"
        />
        {isSaved && (
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded shrink-0 animate-in fade-in">
            ✓
          </span>
        )}
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-60">
        <input
          id={`skill-slider-${skill.id}`}
          type="range"
          min={10}
          max={100}
          step={5}
          value={proficiency}
          onChange={(e) => handleProficiencyChange(Number(e.target.value))}
          className="flex-1 accent-indigo-600 cursor-pointer"
        />
        <span className="text-xs font-bold text-slate-700 w-10 text-right shrink-0">
          {proficiency}%
        </span>
        <button
          type="button"
          onClick={() => onDelete(categoryId, skill.id)}
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
          title={`Delete skill ${name}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

interface EditableEducationCardProps {
  edu: EducationItem;
  index: number;
  onUpdate: (id: string, updates: Partial<EducationItem>) => void;
  onDelete: (id: string) => void;
}

const EditableEducationCard: React.FC<EditableEducationCardProps> = ({
  edu,
  index,
  onUpdate,
  onDelete
}) => {
  const [degree, setDegree] = useState(edu.degree || '');
  const [institution, setInstitution] = useState(edu.institution || '');
  const [location, setLocation] = useState(edu.location || '');
  const [duration, setDuration] = useState(edu.duration || '');
  const [cgpa, setCgpa] = useState(edu.cgpa || edu.percentage || edu.score || '');
  const [coursework, setCoursework] = useState(edu.coursework || '');
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    setDegree(edu.degree || '');
    setInstitution(edu.institution || '');
    setLocation(edu.location || '');
    setDuration(edu.duration || '');
    setCgpa(edu.cgpa || edu.percentage || edu.score || '');
    setCoursework(edu.coursework || '');
  }, [edu.id]);

  const showSaved = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDegreeChange = (val: string) => {
    setDegree(val);
    onUpdate(edu.id, { degree: val });
    showSaved();
  };

  const handleInstitutionChange = (val: string) => {
    setInstitution(val);
    onUpdate(edu.id, { institution: val });
    showSaved();
  };

  const handleLocationChange = (val: string) => {
    setLocation(val);
    onUpdate(edu.id, { location: val });
    showSaved();
  };

  const handleDurationChange = (val: string) => {
    setDuration(val);
    onUpdate(edu.id, { duration: val });
    showSaved();
  };

  const handleCgpaChange = (val: string) => {
    setCgpa(val);
    onUpdate(edu.id, { cgpa: val, percentage: val, score: val });
    showSaved();
  };

  const handleCourseworkChange = (val: string) => {
    setCoursework(val);
    onUpdate(edu.id, { coursework: val });
    showSaved();
  };

  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Academic Degree #{index + 1}
          </span>
          {isSaved && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md animate-in fade-in">
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Auto-saved</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onDelete(edu.id)}
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
          title={`Delete ${degree || 'this education entry'}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Degree / Qualification *</label>
          <input
            id={`edu-degree-${edu.id}`}
            type="text"
            value={degree}
            onChange={(e) => handleDegreeChange(e.target.value)}
            placeholder="e.g. B.E. Electronics and Communication Engineering"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs font-bold text-slate-900 bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Institution & College Name *</label>
          <input
            id={`edu-inst-${edu.id}`}
            type="text"
            value={institution}
            onChange={(e) => handleInstitutionChange(e.target.value)}
            placeholder="e.g. Thanthai Periyar Government Institute of Technology"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs font-semibold text-slate-800 bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Location</label>
          <input
            id={`edu-loc-${edu.id}`}
            type="text"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            placeholder="e.g. Vellore, Tamil Nadu"
            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs text-slate-800 bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Duration (Years)</label>
          <input
            id={`edu-dur-${edu.id}`}
            type="text"
            value={duration}
            onChange={(e) => handleDurationChange(e.target.value)}
            placeholder="e.g. 2023 – 2027"
            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs font-medium text-slate-800 bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">CGPA / Percentage / Grade</label>
          <input
            id={`edu-cgpa-${edu.id}`}
            type="text"
            value={cgpa}
            onChange={(e) => handleCgpaChange(e.target.value)}
            placeholder="e.g. 8.10 CGPA or 89.6%"
            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs font-bold text-indigo-700 bg-white"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700">Coursework / Key Subjects & Focus Areas</label>
        <textarea
          id={`edu-course-${edu.id}`}
          rows={2}
          value={coursework}
          onChange={(e) => handleCourseworkChange(e.target.value)}
          placeholder="e.g. Data Structures and Algorithms, Object-Oriented Programming, Java, MERN Stack, DBMS, Computer Networks..."
          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs text-slate-800 bg-white resize-none"
        />
      </div>
    </div>
  );
};

export const CMSAdminDrawer: React.FC = () => {
  const {
    data,
    messages,
    isAdminOpen,
    setIsAdminOpen,
    logoutAdmin,
    addSkill,
    deleteSkill,
    updateSkillItem,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience,
    updateCta,
    updateResumeSettings,
    setIsResumeModalOpen,
    markMessageRead,
    deleteMessage,
    clearAllMessages
  } = useCMS();

  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [saveToast, setSaveToast] = useState(false);

  // PDF Resume upload state
  const [isDraggingPdf, setIsDraggingPdf] = useState(false);
  const [pdfUploadError, setPdfUploadError] = useState('');
  const [customPdfUrlInput, setCustomPdfUrlInput] = useState('');

  // Project search and filter in Admin
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('all');

  // New Project form state
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    category: 'Full Stack',
    featured: false,
    image: '',
    description: '',
    fullDescription: '',
    tags: 'React.js, Node.js, Express.js, MongoDB',
    githubUrl: '',
    liveUrl: '',
    keyFeatures: '',
    role: 'Full Stack Developer',
    completedDate: '2026'
  });

  // Editing existing project state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editProjectForm, setEditProjectForm] = useState({
    title: '',
    category: 'Full Stack',
    featured: false,
    image: '',
    description: '',
    fullDescription: '',
    tags: '',
    githubUrl: '',
    liveUrl: '',
    keyFeatures: '',
    role: 'Full Stack Developer',
    completedDate: '2025'
  });

  // New Skill form state
  const [newSkillForm, setNewSkillForm] = useState({
    categoryId: data.skillsCategories[0]?.id || 'languages',
    name: '',
    proficiency: 85
  });

  // Education form state
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [newEducationForm, setNewEducationForm] = useState({
    degree: '',
    institution: '',
    location: 'Vellore, Tamil Nadu',
    duration: '2023 – 2027',
    cgpa: '',
    coursework: ''
  });

  if (!isAdminOpen) return null;

  const triggerSaveNotification = () => {
    setSaveToast(true);
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    } catch (e) {}
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handlePdfFileUpload = (file: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setPdfUploadError('Please select a valid PDF document (.pdf)');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setPdfUploadError('PDF file is too large (max 8MB).');
      return;
    }

    setPdfUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateResumeSettings({
          pdfUrl: result,
          pdfFileName: file.name
        });
        triggerSaveNotification();
      }
    };
    reader.onerror = () => {
      setPdfUploadError('Failed to read PDF file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleCustomPdfUrlSave = () => {
    if (!customPdfUrlInput.trim()) return;
    updateResumeSettings({
      pdfUrl: customPdfUrlInput.trim(),
      pdfFileName: customPdfUrlInput.split('/').pop() || 'Custom_Resume.pdf'
    });
    setCustomPdfUrlInput('');
    triggerSaveNotification();
  };

  const handleRemovePdf = () => {
    updateResumeSettings({
      pdfUrl: undefined,
      pdfFileName: undefined
    });
    triggerSaveNotification();
  };

  // Helper for Project Image Upload from local disk
  const handleProjectImageFile = (file: File, isEdit: boolean = false) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, SVG, GIF)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size is too large (maximum 5MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        if (isEdit) {
          setEditProjectForm((prev) => ({ ...prev, image: result }));
        } else {
          setNewProjectForm((prev) => ({ ...prev, image: result }));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDuplicateProject = (proj: ProjectItem) => {
    addProject({
      title: `${proj.title} (Copy)`,
      category: proj.category,
      featured: false,
      image: proj.image,
      description: proj.description,
      fullDescription: proj.fullDescription || proj.description,
      tags: [...proj.tags],
      githubUrl: proj.githubUrl,
      liveUrl: proj.liveUrl,
      keyFeatures: proj.keyFeatures ? [...proj.keyFeatures] : [],
      role: proj.role,
      completedDate: proj.completedDate
    });
    triggerSaveNotification();
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.projects.length) return;
    const updated = [...data.projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    reorderProjects(updated);
    triggerSaveNotification();
  };

  const handleAddTagToForm = (tag: string, isEdit: boolean) => {
    if (isEdit) {
      const existing = editProjectForm.tags.split(',').map((t) => t.trim()).filter(Boolean);
      if (!existing.includes(tag)) {
        const next = existing.length > 0 ? `${editProjectForm.tags.trim()}, ${tag}` : tag;
        setEditProjectForm((prev) => ({ ...prev, tags: next }));
      }
    } else {
      const existing = newProjectForm.tags.split(',').map((t) => t.trim()).filter(Boolean);
      if (!existing.includes(tag)) {
        const next = existing.length > 0 ? `${newProjectForm.tags.trim()}, ${tag}` : tag;
        setNewProjectForm((prev) => ({ ...prev, tags: next }));
      }
    }
  };

  const handleQuickCategorySelect = (category: string, isEdit: boolean) => {
    if (isEdit) {
      setEditProjectForm((prev) => ({ ...prev, category }));
    } else {
      setNewProjectForm((prev) => ({ ...prev, category }));
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.title) return;

    addProject({
      title: newProjectForm.title,
      category: newProjectForm.category,
      featured: newProjectForm.featured,
      image: newProjectForm.image,
      description: newProjectForm.description,
      fullDescription: newProjectForm.fullDescription || newProjectForm.description,
      tags: newProjectForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl: newProjectForm.githubUrl,
      liveUrl: newProjectForm.liveUrl,
      keyFeatures: newProjectForm.keyFeatures
        ? newProjectForm.keyFeatures.split('\n').map((f) => f.trim()).filter(Boolean)
        : [],
      role: newProjectForm.role,
      completedDate: newProjectForm.completedDate
    });

    setIsAddingProject(false);
    setNewProjectForm({
      title: '',
      category: 'Full Stack',
      featured: false,
      image: '',
      description: '',
      fullDescription: '',
      tags: 'React.js, Node.js, Express.js, MongoDB',
      githubUrl: '',
      liveUrl: '',
      keyFeatures: '',
      role: 'Full Stack Developer',
      completedDate: '2026'
    });
    triggerSaveNotification();
  };

  const handleStartEditProject = (proj: any) => {
    setEditingProjectId(proj.id);
    setIsAddingProject(false);
    setEditProjectForm({
      title: proj.title || '',
      category: proj.category || 'Full Stack',
      featured: !!proj.featured,
      image: proj.image || '',
      description: proj.description || '',
      fullDescription: proj.fullDescription || proj.description || '',
      tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : (proj.tags || ''),
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      keyFeatures: Array.isArray(proj.keyFeatures) ? proj.keyFeatures.join('\n') : '',
      role: proj.role || 'Full Stack Developer',
      completedDate: proj.completedDate || '2025'
    });
  };

  const handleUpdateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProjectId || !editProjectForm.title) return;

    updateProject(editingProjectId, {
      title: editProjectForm.title,
      category: editProjectForm.category,
      featured: editProjectForm.featured,
      image: editProjectForm.image,
      description: editProjectForm.description,
      fullDescription: editProjectForm.fullDescription || editProjectForm.description,
      tags: editProjectForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl: editProjectForm.githubUrl,
      liveUrl: editProjectForm.liveUrl,
      keyFeatures: editProjectForm.keyFeatures
        ? editProjectForm.keyFeatures.split('\n').map((f) => f.trim()).filter(Boolean)
        : [],
      role: editProjectForm.role,
      completedDate: editProjectForm.completedDate
    });

    setEditingProjectId(null);
    triggerSaveNotification();
  };

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillForm.name.trim()) return;
    const catId = newSkillForm.categoryId || data.skillsCategories[0]?.id || 'languages';
    addSkill(catId, newSkillForm.name.trim(), Number(newSkillForm.proficiency));
    setNewSkillForm((prev) => ({ ...prev, name: '' }));
    triggerSaveNotification();
  };

  const handleQuickAddSkillToCategory = (catId: string, skillName: string, proficiency: number = 85) => {
    if (!skillName.trim()) return;
    addSkill(catId, skillName.trim(), proficiency);
    triggerSaveNotification();
  };

  const handleCreateEducationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEducationForm.degree.trim() || !newEducationForm.institution.trim()) return;
    addEducation({
      degree: newEducationForm.degree.trim(),
      institution: newEducationForm.institution.trim(),
      location: newEducationForm.location.trim() || 'Vellore, Tamil Nadu',
      duration: newEducationForm.duration.trim() || '2023 – 2027',
      cgpa: newEducationForm.cgpa.trim(),
      percentage: newEducationForm.cgpa.trim(),
      score: newEducationForm.cgpa.trim(),
      coursework: newEducationForm.coursework.trim()
    });
    setNewEducationForm({
      degree: '',
      institution: '',
      location: 'Vellore, Tamil Nadu',
      duration: '2023 – 2027',
      cgpa: '',
      coursework: ''
    });
    setIsAddingEducation(false);
    triggerSaveNotification();
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div
      id="cms-admin-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={() => setIsAdminOpen(false)}
    >
      <div
        id="cms-admin-panel"
        className="bg-white w-full max-w-3xl h-full max-h-screen flex flex-col shadow-2xl border-l border-slate-200 overflow-hidden relative animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs tracking-wider">
              ADMIN
            </div>
            <div>
              <h2 className="font-bold text-base text-white leading-none">
                Portfolio Admin Studio
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Customize content, skills, projects, and manage messages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveToast && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 animate-in fade-in">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Changes saved!</span>
              </span>
            )}
            
            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-300 bg-red-950/50 hover:bg-red-900/60 border border-red-800/60 rounded-lg transition-colors cursor-pointer"
              title="Log out from Admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Close Admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-2 flex items-center gap-1 overflow-x-auto shrink-0 text-xs font-semibold text-slate-600 scrollbar-thin">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors shrink-0 cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-white text-blue-700 shadow-2xs font-bold'
                : 'hover:bg-slate-200/70 text-slate-700'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects ({data.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors shrink-0 cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-white text-blue-700 shadow-2xs font-bold'
                : 'hover:bg-slate-200/70 text-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Skills Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors shrink-0 cursor-pointer ${
              activeTab === 'education'
                ? 'bg-white text-blue-700 shadow-2xs font-bold'
                : 'hover:bg-slate-200/70 text-slate-700'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education</span>
          </button>

          <button
            onClick={() => setActiveTab('cta')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors shrink-0 cursor-pointer ${
              activeTab === 'cta'
                ? 'bg-white text-blue-700 shadow-2xs font-bold'
                : 'hover:bg-slate-200/70 text-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume & CTA</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors shrink-0 cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-white text-blue-700 shadow-2xs font-bold'
                : 'hover:bg-slate-200/70 text-slate-700'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Messages</span>
            {unreadCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 3: SKILLS MANAGER */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* Header & Quick Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 rounded-2xl shadow-md border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Skills & Technical Proficiencies</h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Directly add and edit programming languages, frameworks, developer tools, and adjust proficiency percentages with auto-save
                    </p>
                  </div>
                </div>
              </div>

              {/* Add New Skill Form */}
              <form
                onSubmit={handleAddSkillSubmit}
                className="p-5 rounded-2xl border border-indigo-200/80 bg-indigo-50/40 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
                    <Plus className="w-4 h-4 text-indigo-600" />
                    <span>Add New Skill Item</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">Type name & click Add</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      Target Category
                    </label>
                    <select
                      id="new-skill-category-select"
                      value={newSkillForm.categoryId}
                      onChange={(e) =>
                        setNewSkillForm({ ...newSkillForm, categoryId: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                    >
                      {data.skillsCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.categoryName} ({c.skills.length} skills)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      Skill Name *
                    </label>
                    <input
                      id="new-skill-name-input"
                      type="text"
                      required
                      value={newSkillForm.name}
                      onChange={(e) =>
                        setNewSkillForm({ ...newSkillForm, name: e.target.value })
                      }
                      placeholder="e.g. Java, React.js, Docker, MongoDB"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700">
                        Proficiency
                      </label>
                      <span className="text-xs font-bold text-indigo-700">{newSkillForm.proficiency}%</span>
                    </div>
                    <input
                      id="new-skill-proficiency-slider"
                      type="range"
                      min={10}
                      max={100}
                      step={5}
                      value={newSkillForm.proficiency}
                      onChange={(e) =>
                        setNewSkillForm({
                          ...newSkillForm,
                          proficiency: Number(e.target.value)
                        })
                      }
                      className="w-full accent-indigo-600 mt-2 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Popular Skill Quick Suggestions */}
                <div className="pt-2 border-t border-indigo-100/80">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-600 mr-1">Quick Select:</span>
                    {POPULAR_SKILL_SUGGESTIONS.slice(0, 12).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNewSkillForm((prev) => ({ ...prev, name: s }))}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white hover:bg-indigo-600 hover:text-white border border-slate-200 text-slate-700 transition-colors cursor-pointer shadow-2xs"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill to Category</span>
                  </button>
                </div>
              </form>

              {/* Existing Categories & Skills List */}
              <div className="space-y-6">
                {data.skillsCategories.map((category) => (
                  <div
                    key={category.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                          {category.categoryName}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">
                          ({category.skills.length} skills)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-slate-400">Quick Add:</span>
                        {POPULAR_SKILL_SUGGESTIONS.slice(0, 4).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleQuickAddSkillToCategory(category.id, s, 85)}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-600 transition-colors cursor-pointer"
                          >
                            + {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {category.skills.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2.5">
                        {category.skills.map((skill) => (
                          <EditableSkillItem
                            key={skill.id}
                            categoryId={category.id}
                            skill={skill}
                            onUpdate={(catId, skillId, name, prof) => {
                              updateSkillItem(catId, skillId, name, prof);
                            }}
                            onDelete={(catId, skillId) => {
                              deleteSkill(catId, skillId);
                              triggerSaveNotification();
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center rounded-xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 text-xs">
                        No skills in this category yet. Add your first skill using the form above!
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Header & Quick Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-2xl shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-blue-200">
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        Portfolio Projects Manager
                      </h3>
                      <p className="text-xs text-blue-200 mt-0.5">
                        Directly edit titles, tags, links, descriptions and images with live auto-save
                      </p>
                    </div>
                  </div>
                </div>
                {!isAddingProject && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProject(true);
                      setEditingProjectId(null);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add New Project</span>
                  </button>
                )}
              </div>

              {/* Statistics & Insights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-medium text-slate-500 block">Total Projects</span>
                  <span className="text-lg font-bold text-slate-900">{data.projects.length}</span>
                </div>
                <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                  <span className="text-[11px] font-medium text-amber-700 block flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>Featured</span>
                  </span>
                  <span className="text-lg font-bold text-amber-900">
                    {data.projects.filter((p) => p.featured).length}
                  </span>
                </div>
                <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl">
                  <span className="text-[11px] font-medium text-emerald-700 block flex items-center gap-1">
                    <Globe className="w-3 h-3 text-emerald-600" />
                    <span>With Live Link</span>
                  </span>
                  <span className="text-lg font-bold text-emerald-900">
                    {data.projects.filter((p) => Boolean(p.liveUrl)).length}
                  </span>
                </div>
                <div className="p-3 bg-indigo-50/60 border border-indigo-200/80 rounded-xl">
                  <span className="text-[11px] font-medium text-indigo-700 block flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-indigo-600" />
                    <span>With GitHub Repo</span>
                  </span>
                  <span className="text-lg font-bold text-indigo-900">
                    {data.projects.filter((p) => Boolean(p.githubUrl)).length}
                  </span>
                </div>
              </div>

              {/* Search & Category Filter Controls */}
              {!isAddingProject && (
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={projectSearchQuery}
                        onChange={(e) => setProjectSearchQuery(e.target.value)}
                        placeholder="Search projects by title, category, tag, or description..."
                        className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:border-blue-700 focus:outline-none placeholder:text-slate-400"
                      />
                      {projectSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setProjectSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <select
                      value={projectCategoryFilter}
                      onChange={(e) => setProjectCategoryFilter(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:border-blue-700 focus:outline-none font-medium text-slate-700"
                    >
                      <option value="all">All Categories ({data.projects.length})</option>
                      <option value="featured">Featured Only ({data.projects.filter(p => p.featured).length})</option>
                      {Array.from(new Set(data.projects.map((p) => p.category))).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat} ({data.projects.filter((p) => p.category === cat).length})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1">
                      Quick Filters:
                    </span>
                    <button
                      type="button"
                      onClick={() => setProjectCategoryFilter('all')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                        projectCategoryFilter === 'all'
                          ? 'bg-blue-700 text-white shadow-2xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      All ({data.projects.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setProjectCategoryFilter('featured')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                        projectCategoryFilter === 'featured'
                          ? 'bg-amber-600 text-white shadow-2xs'
                          : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
                      }`}
                    >
                      <span>★ Featured</span>
                    </button>
                    {['Full Stack', 'Frontend', 'Backend', 'AI / ML', 'WordPress / E-Commerce'].map((cat) => {
                      const count = data.projects.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
                      if (count === 0) return null;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setProjectCategoryFilter(cat)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                            projectCategoryFilter.toLowerCase() === cat.toLowerCase()
                              ? 'bg-blue-700 text-white shadow-2xs'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {cat} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add Project Form */}
              {isAddingProject && (
                <form
                  onSubmit={handleCreateProject}
                  className="p-5 rounded-2xl border-2 border-blue-600 bg-blue-50/40 space-y-4 animate-in fade-in shadow-lg"
                >
                  <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950">
                          Create & Add New Portfolio Project
                        </h4>
                        <p className="text-[11px] text-slate-600">
                          Fill in project metadata, cover image, links, and technical tags
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddingProject(false)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 rounded-md hover:bg-blue-100/60 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={newProjectForm.title}
                        onChange={(e) =>
                          setNewProjectForm({ ...newProjectForm, title: e.target.value })
                        }
                        placeholder="e.g. AI-Powered Healthcare Dashboard"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:border-blue-700 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Category *</label>
                      <input
                        type="text"
                        required
                        value={newProjectForm.category}
                        onChange={(e) =>
                          setNewProjectForm({ ...newProjectForm, category: e.target.value })
                        }
                        placeholder="e.g. Full Stack, Frontend, Backend, AI / ML"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:border-blue-700 focus:outline-none"
                      />
                      {/* Quick Category Chips */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {QUICK_CATEGORY_OPTIONS.slice(0, 5).map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => handleQuickCategorySelect(cat, false)}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100/70 hover:bg-blue-200 text-blue-900 transition-colors cursor-pointer"
                          >
                            + {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Short Summary * (Card Description)</label>
                    <textarea
                      rows={2}
                      required
                      value={newProjectForm.description}
                      onChange={(e) =>
                        setNewProjectForm({ ...newProjectForm, description: e.target.value })
                      }
                      placeholder="Concise 1-2 sentence overview displayed directly on the project card"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white resize-none focus:border-blue-700 focus:outline-none"
                    />
                  </div>

                  {/* PROJECT IMAGE SECTION */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-blue-700" />
                        <span>Project Cover Image</span>
                      </label>
                      {newProjectForm.image && (
                        <button
                          type="button"
                          onClick={() => setNewProjectForm({ ...newProjectForm, image: '' })}
                          className="text-[11px] font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove Image</span>
                        </button>
                      )}
                    </div>

                    {/* Image Preview & Upload Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      <div className="sm:col-span-1 aspect-video w-full rounded-lg bg-slate-900 border border-slate-200 overflow-hidden flex items-center justify-center relative shadow-inner">
                        {newProjectForm.image ? (
                          <img
                            src={newProjectForm.image}
                            alt="Project Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-2 text-center text-slate-400">
                            <ImageIcon className="w-6 h-6 mb-1 text-slate-500" />
                            <span className="text-[10px] font-medium">No Image Set</span>
                          </div>
                        )}
                      </div>

                      <div className="sm:col-span-2 space-y-2">
                        {/* File Upload Button */}
                        <div className="flex items-center gap-2">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-2xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Local Image File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleProjectImageFile(file, false);
                              }}
                            />
                          </label>
                          <span className="text-[10px] text-slate-500">PNG, JPG, WebP (Max 5MB)</span>
                        </div>

                        {/* Direct URL input */}
                        <input
                          type="text"
                          value={newProjectForm.image}
                          onChange={(e) =>
                            setNewProjectForm({ ...newProjectForm, image: e.target.value })
                          }
                          placeholder="Or paste an Image URL (https://...)"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:border-blue-700 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Or select a quick stock image preset:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {SAMPLE_PROJECT_IMAGE_PRESETS.slice(0, 5).map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setNewProjectForm({ ...newProjectForm, image: preset.url })}
                            className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-100 hover:bg-blue-100 hover:text-blue-800 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                          >
                            + {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Links Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor="new-project-github-url" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-slate-600" />
                          <span>GitHub Repository URL</span>
                        </label>
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              if (navigator.clipboard && navigator.clipboard.readText) {
                                const text = await navigator.clipboard.readText();
                                if (text) {
                                  setNewProjectForm((prev) => ({ ...prev, githubUrl: text.trim() }));
                                  return;
                                }
                              }
                            } catch {}
                            const el = document.getElementById('new-project-github-url') as HTMLInputElement | null;
                            if (el) {
                              el.focus();
                              el.select();
                            }
                          }}
                          className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                        >
                          Paste URL
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          id="new-project-github-url"
                          name="new-project-github-url"
                          type="text"
                          autoComplete="off"
                          spellCheck={false}
                          value={newProjectForm.githubUrl}
                          onChange={(e) =>
                            setNewProjectForm((prev) => ({ ...prev, githubUrl: e.target.value }))
                          }
                          placeholder="https://github.com/username/project"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:border-indigo-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor="new-project-live-url" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Live Demo / Production URL</span>
                        </label>
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              if (navigator.clipboard && navigator.clipboard.readText) {
                                const text = await navigator.clipboard.readText();
                                if (text) {
                                  setNewProjectForm((prev) => ({ ...prev, liveUrl: text.trim() }));
                                  return;
                                }
                              }
                            } catch {}
                            const el = document.getElementById('new-project-live-url') as HTMLInputElement | null;
                            if (el) {
                              el.focus();
                              el.select();
                            }
                          }}
                          className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                        >
                          Paste URL
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          id="new-project-live-url"
                          name="new-project-live-url"
                          type="text"
                          autoComplete="off"
                          spellCheck={false}
                          value={newProjectForm.liveUrl}
                          onChange={(e) =>
                            setNewProjectForm((prev) => ({ ...prev, liveUrl: e.target.value }))
                          }
                          placeholder="https://my-app.example.com"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:border-emerald-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tech Tags & Quick Add */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-600" />
                      <span>Tech Stack Tags (Comma separated)</span>
                    </label>
                    <input
                      type="text"
                      value={newProjectForm.tags}
                      onChange={(e) =>
                        setNewProjectForm({ ...newProjectForm, tags: e.target.value })
                      }
                      placeholder="React.js, Node.js, Express.js, MongoDB, Tailwind CSS"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:border-blue-700 focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="text-[10px] text-slate-500 font-medium mr-1">Quick add:</span>
                      {POPULAR_TECH_TAGS.slice(0, 8).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleAddTagToForm(tag, false)}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 hover:bg-blue-100 hover:text-blue-900 text-slate-700 transition-colors cursor-pointer"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Role & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Developer Role</label>
                      <input
                        type="text"
                        value={newProjectForm.role}
                        onChange={(e) =>
                          setNewProjectForm({ ...newProjectForm, role: e.target.value })
                        }
                        placeholder="e.g. Lead Full Stack Developer"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:border-blue-700 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Year / Date Completed</label>
                      <input
                        type="text"
                        value={newProjectForm.completedDate}
                        onChange={(e) =>
                          setNewProjectForm({ ...newProjectForm, completedDate: e.target.value })
                        }
                        placeholder="e.g. 2026 or Jan 2026"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:border-blue-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Full Description */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Description / Case Study Details</label>
                    <textarea
                      rows={3}
                      value={newProjectForm.fullDescription}
                      onChange={(e) =>
                        setNewProjectForm({ ...newProjectForm, fullDescription: e.target.value })
                      }
                      placeholder="Comprehensive architectural overview, problem statement, solution, and outcomes"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white resize-none focus:border-blue-700 focus:outline-none"
                    />
                  </div>

                  {/* Key Features */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Key Features (One highlight per line)</label>
                    <textarea
                      rows={3}
                      value={newProjectForm.keyFeatures}
                      onChange={(e) =>
                        setNewProjectForm({ ...newProjectForm, keyFeatures: e.target.value })
                      }
                      placeholder="Real-time WebSocket chat and instant notification engine&#10;Role-Based Access Control (RBAC) with JWT auth&#10;Stripe payment gateway integration with webhooks"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white resize-none focus:border-blue-700 focus:outline-none font-mono text-[11px]"
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center gap-2 pt-1 p-3 bg-amber-50/60 border border-amber-200/70 rounded-xl">
                    <input
                      type="checkbox"
                      id="new-project-featured"
                      checked={newProjectForm.featured}
                      onChange={(e) =>
                        setNewProjectForm({ ...newProjectForm, featured: e.target.checked })
                      }
                      className="rounded text-blue-700 cursor-pointer w-4 h-4"
                    />
                    <label htmlFor="new-project-featured" className="text-xs font-bold text-amber-900 cursor-pointer flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>Mark as Featured Project (Highlighted prominently on the website)</span>
                    </label>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                    >
                      Save & Publish New Project
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingProject(false)}
                      className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Projects List Section - In-place Editable Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                  <span>
                    Showing {data.projects.filter((p) => {
                      const matchesSearch =
                        projectSearchQuery === '' ||
                        p.title.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                        p.tags.some((t) => t.toLowerCase().includes(projectSearchQuery.toLowerCase()));
                      const matchesCategory =
                        projectCategoryFilter === 'all' ||
                        (projectCategoryFilter === 'featured' ? p.featured : p.category.toLowerCase() === projectCategoryFilter.toLowerCase());
                      return matchesSearch && matchesCategory;
                    }).length} of {data.projects.length} projects (Click & type on any field directly)
                  </span>
                  <span>Use # arrows to reorder</span>
                </div>

                {data.projects
                  .map((proj, originalIndex) => ({ proj, originalIndex }))
                  .filter(({ proj }) => {
                    const matchesSearch =
                      projectSearchQuery === '' ||
                      proj.title.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                      proj.category.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                      proj.description.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                      proj.tags.some((t) => t.toLowerCase().includes(projectSearchQuery.toLowerCase()));

                    const matchesCategory =
                      projectCategoryFilter === 'all' ||
                      (projectCategoryFilter === 'featured' ? proj.featured : proj.category.toLowerCase() === projectCategoryFilter.toLowerCase());

                    return matchesSearch && matchesCategory;
                  })
                  .map(({ proj, originalIndex }) => (
                    <EditableProjectCard
                      key={proj.id}
                      proj={proj}
                      originalIndex={originalIndex}
                      totalCount={data.projects.length}
                      onUpdate={(id, updates) => updateProject(id, updates)}
                      onDelete={(id) => {
                        deleteProject(id);
                        triggerSaveNotification();
                      }}
                      onDuplicate={(p) => handleDuplicateProject(p)}
                      onMove={(idx, dir) => handleMoveProject(idx, dir)}
                    />
                  ))}

                {/* Empty State */}
                {data.projects.length === 0 && (
                  <div className="text-center py-12 px-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
                    <FolderGit2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-slate-800">No Projects Found</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Your portfolio currently has no projects. Click "Add New Project" above to create your first showcase project.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsAddingProject(true)}
                      className="mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      + Create First Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: EDUCATION & EXPERIENCE */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              {/* Header & Quick Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 rounded-2xl shadow-md border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Education & Academic Background</h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Directly edit qualifications, institutions, CGPA, graduation years, and coursework with instant auto-save
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingEducation((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingEducation ? 'Close Add Form' : 'Add Academic Degree'}</span>
                </button>
              </div>

              {/* Add New Education Collapsible Form */}
              {isAddingEducation && (
                <form
                  onSubmit={handleCreateEducationSubmit}
                  className="p-5 rounded-2xl border border-indigo-200/80 bg-indigo-50/40 shadow-xs space-y-4 animate-in fade-in"
                >
                  <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
                      <Plus className="w-4 h-4 text-indigo-600" />
                      <span>Add New Degree / Education Record</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Auto-saves to database</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Degree / Qualification *</label>
                      <input
                        id="new-edu-degree-input"
                        type="text"
                        required
                        value={newEducationForm.degree}
                        onChange={(e) =>
                          setNewEducationForm({ ...newEducationForm, degree: e.target.value })
                        }
                        placeholder="e.g. B.E. Electronics and Communication Engineering"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Institution / College Name *</label>
                      <input
                        id="new-edu-inst-input"
                        type="text"
                        required
                        value={newEducationForm.institution}
                        onChange={(e) =>
                          setNewEducationForm({ ...newEducationForm, institution: e.target.value })
                        }
                        placeholder="e.g. Thanthai Periyar Government Institute of Technology"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Location</label>
                      <input
                        id="new-edu-loc-input"
                        type="text"
                        value={newEducationForm.location}
                        onChange={(e) =>
                          setNewEducationForm({ ...newEducationForm, location: e.target.value })
                        }
                        placeholder="e.g. Vellore, Tamil Nadu"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Duration</label>
                      <input
                        id="new-edu-dur-input"
                        type="text"
                        value={newEducationForm.duration}
                        onChange={(e) =>
                          setNewEducationForm({ ...newEducationForm, duration: e.target.value })
                        }
                        placeholder="e.g. 2023 – 2027"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">CGPA / Percentage</label>
                      <input
                        id="new-edu-cgpa-input"
                        type="text"
                        value={newEducationForm.cgpa}
                        onChange={(e) =>
                          setNewEducationForm({ ...newEducationForm, cgpa: e.target.value })
                        }
                        placeholder="e.g. 8.10 CGPA / 89.6%"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-indigo-700 bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">Coursework Details</label>
                    <textarea
                      id="new-edu-course-input"
                      rows={2}
                      value={newEducationForm.coursework}
                      onChange={(e) =>
                        setNewEducationForm({ ...newEducationForm, coursework: e.target.value })
                      }
                      placeholder="e.g. Data Structures & Algorithms, OOP with Java, DBMS, Full Stack Web Development..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingEducation(false)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Save Academic Record</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Education List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                  <span>Showing {data.education.length} academic qualification entries</span>
                  <span>Direct in-place editing active</span>
                </div>

                {data.education.map((edu, index) => (
                  <EditableEducationCard
                    key={edu.id}
                    edu={edu}
                    index={index}
                    onUpdate={(id, updates) => {
                      updateEducation(id, updates);
                    }}
                    onDelete={(id) => {
                      deleteEducation(id);
                      triggerSaveNotification();
                    }}
                  />
                ))}

                {data.education.length === 0 && (
                  <div className="p-8 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-300 space-y-2">
                    <GraduationCap className="w-8 h-8 text-slate-400 mx-auto" />
                    <h4 className="text-xs font-bold text-slate-700">No Education Records Yet</h4>
                    <p className="text-[11px] text-slate-500">
                      Click the "Add Academic Degree" button above to add your schooling, diploma, or college degrees.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: CTA & RESUME SETTINGS */}
          {activeTab === 'cta' && (
            <div className="space-y-6">
              {/* Resume PDF Upload Section */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>Resume PDF Document</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload your official resume PDF file so website visitors can view and download it directly.
                    </p>
                  </div>
                  {data.resume.pdfUrl && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Custom PDF Active
                    </span>
                  )}
                </div>

                {/* Upload Zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingPdf(true);
                  }}
                  onDragLeave={() => setIsDraggingPdf(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingPdf(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handlePdfFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                    isDraggingPdf
                      ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
                      : 'border-slate-300 hover:border-indigo-400 bg-white'
                  }`}
                >
                  <input
                    type="file"
                    id="resume-pdf-file-input"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handlePdfFileUpload(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <FileUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Drag and drop your Resume PDF here, or{' '}
                        <label
                          htmlFor="resume-pdf-file-input"
                          className="text-indigo-600 hover:text-indigo-700 underline cursor-pointer font-bold"
                        >
                          Browse File
                        </label>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Supports standard PDF files up to 8MB
                      </p>
                    </div>
                  </div>
                </div>

                {pdfUploadError && (
                  <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{pdfUploadError}</span>
                  </div>
                )}

                {/* Active PDF Information & Actions */}
                {data.resume.pdfUrl ? (
                  <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 truncate max-w-[220px] sm:max-w-xs">
                            {data.resume.pdfFileName || 'Custom_Resume.pdf'}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Ready for instant preview and download on your portfolio
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setIsResumeModalOpen(true)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>

                        <a
                          href={data.resume.pdfUrl}
                          download={data.resume.pdfFileName || 'Indhumathi_Resume.pdf'}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </a>

                        <button
                          type="button"
                          onClick={handleRemovePdf}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove custom PDF"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between">
                    <span>No custom PDF uploaded. The app is currently using the auto-generated ATS web resume.</span>
                    <button
                      type="button"
                      onClick={() => setIsResumeModalOpen(true)}
                      className="text-xs font-bold text-amber-900 underline shrink-0 ml-2"
                    >
                      Preview ATS
                    </button>
                  </div>
                )}

                {/* Alternative: Direct PDF URL */}
                <div className="pt-2 border-t border-slate-200/80">
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Or Enter Hosted PDF / Google Drive URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://drive.google.com/... or https://example.com/resume.pdf"
                      value={customPdfUrlInput}
                      onChange={(e) => setCustomPdfUrlInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleCustomPdfUrlSave}
                      className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shrink-0 cursor-pointer"
                    >
                      Set URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Rocket Call to Action Settings */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Bottom Rocket Call to Action
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">CTA Heading</label>
                    <input
                      type="text"
                      value={data.cta.title}
                      onChange={(e) => {
                        updateCta({ title: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">CTA Subtitle</label>
                    <input
                      type="text"
                      value={data.cta.subtitle}
                      onChange={(e) => {
                        updateCta({ subtitle: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Executive Summary */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Resume Summary Text
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Resume Executive Summary</label>
                    <textarea
                      rows={3}
                      value={data.resume.summary}
                      onChange={(e) => {
                        updateResumeSettings({ summary: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: MESSAGES INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Contact Form Messages ({messages.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inquiries submitted through the portfolio contact form
                  </p>
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={clearAllMessages}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                  No messages in inbox yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-xl border transition-colors ${
                        msg.read
                          ? 'bg-slate-50/50 border-slate-200'
                          : 'bg-blue-50/40 border-blue-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{msg.name}</span>
                            <span className="text-xs text-slate-500">&lt;{msg.email}&gt;</span>
                            {!msg.read && (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-700 text-white rounded-full">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-slate-700 mt-1">
                            {msg.subject}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {!msg.read && (
                            <button
                              onClick={() => markMessageRead(msg.id)}
                              className="px-2 py-1 bg-white border border-slate-200 rounded text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                            >
                              Mark Read
                            </button>
                          )}
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                            className="px-2 py-1 bg-blue-700 text-white rounded text-[11px] font-medium hover:bg-blue-800"
                          >
                            Reply
                          </a>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mt-3 pt-2 border-t border-slate-200/60 leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Auto-persisted to browser storage
          </span>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};
