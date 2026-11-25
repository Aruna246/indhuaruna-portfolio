import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioCMSData,
  ProfileData,
  AboutData,
  SkillCategory,
  ProjectItem,
  EducationItem,
  ExperienceItem,
  CtaData,
  ContactMessage,
  ResumeSettings
} from '../types';
import { initialPortfolioData } from '../initialData';

const STORAGE_KEY = 'indhu_portfolio_cms_v4';
const MESSAGES_KEY = 'indhu_portfolio_messages_v2';

interface CMSContextType {
  data: PortfolioCMSData;
  messages: ContactMessage[];
  isAdminOpen: boolean;
  activeProjectModal: ProjectItem | null;
  isResumeModalOpen: boolean;
  activeSection: string;
  isEditMode: boolean; // visual highlight mode

  // Admin Auth state
  isAdminAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginAdmin: (username: string, pass: string) => boolean;
  logoutAdmin: () => void;
  openAdmin: () => void;

  // Modal / Drawer toggles
  setIsAdminOpen: (open: boolean) => void;
  setActiveProjectModal: (project: ProjectItem | null) => void;
  setIsResumeModalOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
  setIsEditMode: (edit: boolean) => void;

  // CMS update methods
  updateProfile: (profile: Partial<ProfileData>) => void;
  updateAbout: (about: Partial<AboutData>) => void;
  updateSkills: (categories: SkillCategory[]) => void;
  addSkill: (categoryId: string, skillName: string, proficiency: number) => void;
  deleteSkill: (categoryId: string, skillId: string) => void;
  updateSkillItem: (categoryId: string, skillId: string, name: string, proficiency: number) => void;
  
  // Projects
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: ProjectItem[]) => void;

  // Education & Experience
  addEducation: (edu: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;

  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;

  // CTA & Resume
  updateCta: (cta: Partial<CtaData>) => void;
  updateResumeSettings: (settings: Partial<ResumeSettings>) => void;

  // Messages
  addMessage: (msg: { name: string; email: string; subject: string; message: string }) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  clearAllMessages: () => void;

  // Backup & Restore
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const ADMIN_AUTH_KEY = 'indhu_portfolio_admin_auth_v1';
const ADMIN_USER = 'Indhu@24';
const ADMIN_PASS = 'Indhu9363';

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioCMSData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load portfolio CMS state from local storage:', e);
    }
    return initialPortfolioData;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load contact messages:', e);
    }
    return [
      {
        id: 'msg-seed-1',
        name: 'Technical Recruiter',
        email: 'recruiting@innovate-tech.io',
        subject: 'Software Engineer Internship / Junior Role Opportunity',
        message: 'Hi Indhu, loved your Student Management System and E-Commerce storefront work. Would you be open for a quick introductory call next week?',
        createdAt: '2026-08-12T14:30:00.000Z',
        read: false
      }
    ];
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true' || localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isEditMode, setIsEditMode] = useState(false);

  // Login handler
  const loginAdmin = (username: string, pass: string): boolean => {
    if (username === ADMIN_USER && pass === ADMIN_PASS) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch (e) {}
      setIsAuthModalOpen(false);
      setIsAdminOpen(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (e) {}
    setIsAdminOpen(false);
    setIsEditMode(false);
  };

  const openAdmin = () => {
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist portfolio CMS data:', e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to persist messages:', e);
    }
  }, [messages]);

  // Profile update
  const updateProfile = (profile: Partial<ProfileData>) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profile,
        socials: {
          ...prev.profile.socials,
          ...(profile.socials || {})
        }
      }
    }));
  };

  // About update
  const updateAbout = (about: Partial<AboutData>) => {
    setData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        ...about
      }
    }));
  };

  // Skills
  const updateSkills = (categories: SkillCategory[]) => {
    setData((prev) => ({
      ...prev,
      skillsCategories: categories
    }));
  };

  const addSkill = (categoryId: string, skillName: string, proficiency: number) => {
    setData((prev) => ({
      ...prev,
      skillsCategories: prev.skillsCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: [
              ...cat.skills,
              {
                id: `sk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                name: skillName,
                proficiency: Math.min(100, Math.max(1, proficiency))
              }
            ]
          };
        }
        return cat;
      })
    }));
  };

  const deleteSkill = (categoryId: string, skillId: string) => {
    setData((prev) => ({
      ...prev,
      skillsCategories: prev.skillsCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: cat.skills.filter((s) => s.id !== skillId)
          };
        }
        return cat;
      })
    }));
  };

  const updateSkillItem = (
    categoryId: string,
    skillId: string,
    name: string,
    proficiency: number
  ) => {
    setData((prev) => ({
      ...prev,
      skillsCategories: prev.skillsCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: cat.skills.map((s) =>
              s.id === skillId ? { ...s, name, proficiency: Math.min(100, Math.max(1, proficiency)) } : s
            )
          };
        }
        return cat;
      })
    }));
  };

  // Projects
  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = {
      ...project,
      id: `p-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (id: string, project: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...project } : p))
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  const reorderProjects = (projects: ProjectItem[]) => {
    setData((prev) => ({
      ...prev,
      projects
    }));
  };

  // Education
  const addEducation = (edu: Omit<EducationItem, 'id'>) => {
    const newEdu: EducationItem = {
      ...edu,
      id: `edu-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, edu: Partial<EducationItem>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...edu } : e))
    }));
  };

  const deleteEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id)
    }));
  };

  // Experience
  const addExperience = (exp: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...exp,
      id: `exp-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, exp: Partial<ExperienceItem>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...exp } : e))
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id)
    }));
  };

  // CTA
  const updateCta = (cta: Partial<CtaData>) => {
    setData((prev) => ({
      ...prev,
      cta: {
        ...prev.cta,
        ...cta
      }
    }));
  };

  // Resume Settings
  const updateResumeSettings = (settings: Partial<ResumeSettings>) => {
    setData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        ...settings
      }
    }));
  };

  // Messages
  const addMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject || 'Portfolio Inquiry',
      message: msg.message,
      createdAt: new Date().toISOString(),
      read: false
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const clearAllMessages = () => {
    setMessages([]);
  };

  // Export / Import
  const exportDataJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.profile && parsed.about && parsed.skillsCategories) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON structure for portfolio CMS import:', e);
    }
    return false;
  };

  const resetToDefaults = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        messages,
        isAdminOpen,
        activeProjectModal,
        isResumeModalOpen,
        activeSection,
        isEditMode,
        isAdminAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginAdmin,
        logoutAdmin,
        openAdmin,
        setIsAdminOpen,
        setActiveProjectModal,
        setIsResumeModalOpen,
        setActiveSection,
        setIsEditMode,
        updateProfile,
        updateAbout,
        updateSkills,
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
        addMessage,
        markMessageRead,
        deleteMessage,
        clearAllMessages,
        exportDataJSON,
        importDataJSON,
        resetToDefaults
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
