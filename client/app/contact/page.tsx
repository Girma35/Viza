
"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white dark:bg-black">
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-4">
                    {/* Page Header */}
                    <div className="magazine-border-b mb-12 pb-8">
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                            Contact <span className="text-stroke">Viza</span>
                        </h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                            Connect with our intelligence division
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Info Section */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-2xl font-black uppercase mb-4">Editorial Inquiries</h2>
                                <p className="text-sm leading-relaxed opacity-80 max-w-md">
                                    Have a story or insight that needs to be shared? Our editors are looking for bold perspectives on AI, Strategy, and the future of Technology.
                                </p>
                                <a href="mailto:editorial@viza.com" className="inline-block mt-4 text-[10px] font-black uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:opacity-60 transition-opacity">
                                    editorial@viza.com
                                </a>
                            </div>

                            <div>
                                <h2 className="text-2xl font-black uppercase mb-4">Partnerships</h2>
                                <p className="text-sm leading-relaxed opacity-80 max-w-md">
                                    Strategic collaborations that push the boundaries of digital intelligence.
                                </p>
                                <a href="mailto:partners@viza.com" className="inline-block mt-4 text-[10px] font-black uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:opacity-60 transition-opacity">
                                    partners@viza.com
                                </a>
                            </div>

                            <div className="pt-8 border-t border-black dark:border-white opacity-20 hidden lg:block" />
                        </div>

                        {/* Form Section */}
                        <div className="border-l-0 lg:border-l border-black dark:border-white lg:pl-16">
                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest block">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-b border-black dark:border-white py-4 focus:outline-none focus:border-opacity-50 transition-all font-bold"
                                        placeholder="ALEX RIVERA_"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest block">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-transparent border-b border-black dark:border-white py-4 focus:outline-none focus:border-opacity-50 transition-all font-bold"
                                        placeholder="MAIL@EXAMPLE.COM"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest block">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-transparent border-b border-black dark:border-white py-4 focus:outline-none focus:border-opacity-50 transition-all font-bold resize-none"
                                        placeholder="TRANSMISSION START..."
                                    />
                                </div>
                                <button className="w-full bg-black text-white dark:bg-white dark:text-black py-6 font-black uppercase tracking-[0.4em] hover:bg-opacity-90 transition-all active:scale-[0.98]">
                                    Send Intelligence
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
