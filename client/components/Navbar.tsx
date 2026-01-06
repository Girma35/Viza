"use client";

import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Bell, Sun, Moon } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

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
    { name: 'Tech news', href: '/#/category/tech-news' },
    { name: 'Learning', href: '/#/category/learning' },
    { name: 'Road maps', href: '/#/category/road-maps' },
    { name: 'SaaS', href: '/#/category/saas' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white dark:bg-black border-b border-black dark:border-white`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="/" className="text-xl font-black tracking-tighter uppercase">
            VIZA <span className="text-[10px] tracking-widest ml-1 font-bold">Magazine</span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <button onClick={toggleTheme} className="hover:opacity-60 transition-opacity">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="hover:opacity-60 transition-opacity"><Search size={16} /></button>
            <a href="/contact" className="text-[10px] font-black uppercase tracking-[0.2em] border border-black dark:border-white px-4 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
              Subscribe
            </a>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white dark:bg-black p-8 flex flex-col gap-8 animate-in slide-in-from-top-4 duration-300 z-40">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-4xl font-black uppercase tracking-tighter"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="/contact" className="w-full mt-auto">
            <Button variant="primary" size="lg" className="rounded-none bg-black text-white dark:bg-white dark:text-black w-full">
              Subscribe
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;