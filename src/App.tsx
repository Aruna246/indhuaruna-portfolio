import React from 'react';
import { CMSProvider } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { JourneySection } from './components/JourneySection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AwardsSection } from './components/AwardsSection';
import { EducationSection } from './components/EducationSection';
import { CtaSection } from './components/CtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { CMSAdminDrawer } from './components/cms/CMSAdminDrawer';

const PortfolioContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      {/* Interactive Animated Ambient & Particle Canvas Layer */}
      <AnimatedBackground />

      <Navbar />
      <main className="relative z-10 flex-1">
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <SkillsSection />
        <ProjectsSection />
        <AwardsSection />
        <EducationSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <ProjectModal />
      <ResumeModal />
      <AdminAuthModal />
      <CMSAdminDrawer />
    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <PortfolioContent />
    </CMSProvider>
  );
}
