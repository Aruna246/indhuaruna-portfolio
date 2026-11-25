export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  location: string;
  twitter?: string;
  website?: string;
  phone?: string;
}

export interface ProfileData {
  name: string;
  initials: string;
  title: string;
  headlinePrefix: string;
  statusBadge: string;
  bio: string;
  avatarUrl: string;
  socials: SocialLinks;
}

export interface AboutHighlight {
  id: string;
  iconName: 'graduation-cap' | 'book-open' | 'wrench' | 'target' | 'code' | 'sparkles' | 'cpu' | 'briefcase';
  title: string;
  description: string;
}

export interface AboutData {
  sectionTitle: string;
  introduction: string;
  highlights: AboutHighlight[];
  strengths: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  proficiency: number; // 0 to 100
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string; // e.g. 'Full Stack', 'Frontend', 'Backend', 'AI/ML'
  featured: boolean;
  image: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  keyFeatures?: string[];
  role?: string;
  completedDate?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  department?: string;
  duration: string; // e.g. '2023 – 2027' or '2023'
  cgpa?: string; // e.g. '8.10'
  percentage?: string; // e.g. '89.6%'
  score?: string; // e.g. '89.6%' or '8.10 CGPA'
  coursework?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  type: string; // e.g. 'Internship', 'Full-time', 'Freelance'
  description: string;
  highlights: string[];
}

export interface CtaData {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ResumeSettings {
  summary: string;
  includeGpa: boolean;
  includeCoursework: boolean;
  selectedSkills: string[];
  customObjective?: string;
  pdfUrl?: string;
  pdfFileName?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  year: string;
  placement: string; // e.g. '1st Runner-Up' | '2nd Runner-Up' | 'Winner'
  institution: string;
  description: string;
}

export interface PortfolioCMSData {
  profile: ProfileData;
  about: AboutData;
  skillsCategories: SkillCategory[];
  projects: ProjectItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  awards?: AwardItem[];
  courseworkList?: string[];
  cta: CtaData;
  resume: ResumeSettings;
  theme: {
    accentColor: string; // hex or tailwind class identifier
    darkMode: boolean;
  };
}
