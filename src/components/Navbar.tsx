import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Settings, Menu, X, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards', label: 'Awards' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const { data, openAdmin, isAdminAuthenticated, logoutAdmin } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrolled state for background styling
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Active section tracking based on viewport scroll position
      const scrollPosition = window.scrollY + 180;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const sectionId = NAV_ITEMS[i].id;
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md shadow-lg shadow-black/30 border-b border-slate-800/80 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Avatar & Name */}
        <button
          id="nav-brand-button"
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-all duration-300">
            {data.profile.initials || 'IA'}
          </div>
          <div>
            <span className="font-semibold text-white text-base sm:text-lg tracking-wider uppercase block group-hover:text-indigo-400 transition-colors">
              {data.profile.name}
            </span>
          </div>
        </button>

        {/* Desktop Nav Links (Dynamically highlighted based on current active section) */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-semibold">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer font-semibold ${
                  isActive
                    ? 'text-indigo-400 bg-indigo-950/60 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Settings Icon without green dot */}
          <button
            id="admin-settings-button"
            onClick={openAdmin}
            className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              isAdminAuthenticated
                ? 'text-indigo-400 bg-indigo-950/80 border-indigo-500/50 hover:bg-indigo-900/60 shadow-md shadow-indigo-500/20'
                : 'text-slate-400 bg-slate-900/80 hover:bg-slate-800 hover:text-white border-slate-800'
            }`}
            title={isAdminAuthenticated ? 'Admin Console (Active)' : 'Settings'}
            aria-label="Settings"
          >
            <Settings className={`w-4 h-4 ${isAdminAuthenticated ? 'animate-spin-slow text-indigo-400' : ''}`} />
          </button>

          {/* If admin is authenticated, quick logout indicator */}
          {isAdminAuthenticated && (
            <button
              onClick={logoutAdmin}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-950/60 rounded-lg border border-red-900/50 transition-colors cursor-pointer"
              title="Log out from Admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-1.5 animate-in slide-in-from-top-4 duration-150">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={`mobile-${item.id}`}
                id={`mobile-nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-indigo-400 bg-indigo-950/60 font-bold'
                    : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {isAdminAuthenticated && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logoutAdmin();
              }}
              className="block w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-950/60 border-t border-slate-800 mt-2"
            >
              Log out Admin
            </button>
          )}
        </div>
      )}
    </header>
  );
};
