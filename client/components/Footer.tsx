import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-black border-t border-black dark:border-white py-24 mt-32 transition-colors duration-500">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    <div className="md:col-span-5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-6xl font-black tracking-tighter mb-8">
                                VIZA
                            </h2>
                            <p className="text-black dark:text-white max-w-sm font-medium uppercase leading-relaxed mb-12 opacity-70">
                                The global benchmark for technology and business intelligence. We decode the future for leaders who build it.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Newsletter Intelligence</span>
                            <div className="flex gap-0 max-w-md border border-black dark:border-white">
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className="bg-transparent border-none px-6 py-4 text-[10px] font-black uppercase tracking-widest focus:outline-none flex-grow"
                                />
                                <button className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:invert transition-all">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-center items-end text-right">
                        <div className="bg-black text-white dark:bg-white dark:text-black p-12 md:p-16 w-full max-w-2xl">
                            <h3 className="text-4xl font-black uppercase leading-tight mb-4">
                                Need Elite Software Developers?
                            </h3>
                            <p className="opacity-80 mb-10 font-medium uppercase leading-relaxed text-sm">
                                Hire top-tier talent to build your vision. World-class engineering for your next big project.
                            </p>
                            <a
                                href="https://girma.studio/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 text-white dark:text-black font-black uppercase tracking-widest text-[10px] group border-b border-white dark:border-black pb-1 hover:opacity-50 transition-all"
                            >
                                Visit Girma Studio
                                <span className="group-hover:translate-x-2 transition-transform">→</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-24 pt-8 border-t border-black/10 dark:border-white/10 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em] opacity-40">
                    <span>© 2024 Viza Digital Magazine</span>
                    <div className="flex gap-8">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
