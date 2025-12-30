import React from 'react';
import Button from './Button';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-pearl dark:bg-midnight border-t border-slate-200 dark:border-white/[0.05] py-20 mt-32 transition-colors duration-500">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-5">
                        <h2 className="text-3xl font-black italic tracking-tighter mb-6 text-slate-900 dark:text-white transition-colors">
                            NEXUS<span className="text-brand-ocean">TECH</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-500 max-w-sm font-light leading-relaxed mb-8">
                            The global benchmark for technology and business intelligence. We decode the future for leaders who build it.
                        </p>
                        <div className="flex gap-4">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-300 focus:outline-none focus:border-brand-ocean transition-colors w-full max-w-[240px]"
                            />
                            <Button variant="secondary">
                                Join
                            </Button>
                        </div>
                    </div>
                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Verticals</h4>
                        <ul className="flex flex-col gap-4 text-xs font-bold text-slate-500">
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-cream transition-colors">Artificial Intelligence</a></li>
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-sky transition-colors">Hardware Stack</a></li>
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-ocean transition-colors">Business Strategy</a></li>
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-pearl transition-colors">Venture Index</a></li>
                        </ul>
                    </div>
                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Company</h4>
                        <ul className="flex flex-col gap-4 text-xs font-bold text-slate-500">
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-sky transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-sky transition-colors">Advertise</a></li>
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-sky transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-sky transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Support</h4>
                        <ul className="flex flex-col gap-4 text-xs font-bold text-slate-500">
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-sky transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-sky transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-sky transition-colors">Cookies</a></li>
                            <li><a href="#" className="hover:text-brand-ocean dark:hover:text-brand-sky transition-colors">Accessibility</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-20 pt-10 border-t border-slate-200 dark:border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-slate-500 dark:text-slate-700 uppercase tracking-[0.4em] font-black">
                    <span>© 2024 NEXUSTECH MEDIA GROUP. LONDON / NEW YORK / TOKYO.</span>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-brand-ocean dark:hover:text-brand-cream transition-colors">X</a>
                        <a href="#" className="hover:text-brand-ocean dark:hover:text-brand-sky transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-brand-ocean dark:hover:text-brand-ocean transition-colors">YouTube</a>
                        <a href="#" className="hover:text-brand-ocean dark:hover:text-brand-pearl transition-colors">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
