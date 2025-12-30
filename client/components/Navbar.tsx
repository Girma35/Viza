"use client";

import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Bell, Sun, Moon } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Sync state with html class
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'AI Lab', href: '#/category/ai' },
    { name: 'Tech Stack', href: '#/category/tech' },
    { name: 'Strategy', href: '#/category/business' },
    { name: 'Podcasts', href: '#/podcasts' },
    { name: 'Events', href: '#/events' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 glass shadow-2xl border-b border-brand-ocean/10' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="#" className="text-2xl font-black italic tracking-tighter group flex items-center">
            <span className="text-slate-900 dark:text-white transition-colors">NEXUS</span>
            <span className="text-brand-ocean group-hover:text-brand-cream transition-colors duration-300">TECH</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-brand-sky transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-4 pr-6 border-r border-slate-200 dark:border-slate-800">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="px-0 py-0"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button variant="ghost" className="px-0 py-0"><Search size={18} /></Button>
            <Button variant="ghost" className="px-0 py-0 relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-ocean rounded-full ring-2 ring-brand-pearl dark:ring-midnight" />
            </Button>
          </div>

          <Button variant="primary" className="hidden md:block">
            Subscribe
          </Button>

          <button
            className="lg:hidden text-slate-900 dark:text-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass border-t border-brand-ocean/10 p-8 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-200 dark:border-slate-800"
          >
            {isDark ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
          </button>
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button variant="primary" size="lg" className="rounded-xl">
            Subscribe
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;