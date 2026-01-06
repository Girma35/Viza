"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPostBySlug } from '../../../services/api';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Post } from '../../../types';
import { ArrowLeft, Share2, Twitter, Send, Github } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ArticlePage() {
    const { slug } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            getPostBySlug(slug as string)
                .then(data => setPost(data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!post) return <div className="min-h-screen flex items-center justify-center text-2xl font-black uppercase">Article Not Found</div>;

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white">
            <Navbar />

            <main className="pt-24 pb-32">
                {/* Header Meta */}
                <div className="container mx-auto px-4 py-8 flex justify-between items-center magazine-border-b">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity">
                        <ArrowLeft size={14} /> Go Back
                    </button>
                    <span className="text-xl font-black uppercase tracking-tighter">Magazine</span>
                </div>

                {/* Cinematic Hero Section */}
                <div className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden bg-black flex flex-col justify-end">
                    {/* Background Layer (Atmosphere) */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={post.image}
                            alt=""
                            className="w-full h-full object-cover scale-110 blur-xl opacity-30"
                        />
                    </div>

                    {/* Main Image Layer (The Subject) */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-4 lg:p-12">
                        <div className="w-full h-full relative overflow-hidden magazine-border-b lg:border border-white/20">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[10s] ease-out"
                            />
                            {/* Consistent Legibility Mask */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        </div>
                    </div>

                    {/* Content Layer (Always Consistent Placement) */}
                    <div className="container mx-auto px-6 lg:px-24 pb-12 lg:pb-24 relative z-20 text-white">
                        <div className="max-w-5xl space-y-6 lg:space-y-10">



                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                <div className="lg:col-span-12">
                                    <p className="text-lg md:text-2xl font-medium leading-tight uppercase opacity-90 max-w-3xl border-l-4 border-white pl-6 italic">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Refined Meta bar */}
                <div className="bg-black text-white py-8 border-b border-white/10">
                    <div className="container mx-auto px-6 lg:px-24 flex flex-wrap justify-between items-center text-[10px] font-black uppercase tracking-[0.4em]">
                        <div className="flex gap-12">
                            <div className="flex flex-col gap-1">
                                <span className="opacity-40">Intelligence by</span>
                                <span>{post.author.name}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="opacity-40">Release Date</span>
                                <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '01.05.2026'}</span>
                            </div>
                            <div className="flex flex-col gap-1 hidden md:flex">
                                <span className="opacity-40">Status</span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Verified
                                </span>
                            </div>
                        </div>
                        <div className="hidden lg:block text-right">
                            <span className="opacity-30">Viza Intelligence Registry Vol. 01</span>
                        </div>
                    </div>
                </div>

                {/* Space before content */}
                <div className="py-12" />

                {/* Content Area */}
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Sticky Meta */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-32 flex flex-col gap-12">
                            <div className="flex flex-col gap-6">
                                <div className="w-20 h-20 rounded-none bg-black overflow-hidden">
                                    <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xl font-black uppercase tracking-tight">{post.author.name}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Lead Strategist</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 border-t border-black dark:border-white pt-8">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Connect</span>
                                <div className="flex gap-4">
                                    <a href="https://t.me/Akilephero" target="_blank" rel="noopener noreferrer">
                                        <Send size={18} className="cursor-pointer hover:opacity-50" />
                                    </a>
                                    <a href="https://x.com/Girma880731631" target="_blank" rel="noopener noreferrer">
                                        <Twitter size={18} className="cursor-pointer hover:opacity-50" />
                                    </a>
                                    <a href="https://github.com/Girma35" target="_blank" rel="noopener noreferrer">
                                        <Github size={18} className="cursor-pointer hover:opacity-50" />
                                    </a>
                                </div>
                            </div>

                            <button className="flex items-center justify-center gap-2 w-full py-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all font-black uppercase tracking-widest text-[10px]">
                                <Share2 size={16} /> Share Experience
                            </button>
                        </div>
                    </aside>

                    {/* Main Text */}
                    <article className="lg:col-span-7 prose prose-zinc dark:prose-invert max-w-none">
                        <div className="font-serif text-xl md:text-2xl leading-[1.6] text-black dark:text-white space-y-8 uppercase">
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => <p className="mb-8">{children}</p>,
                                    blockquote: ({ children }) => (
                                        <div className="my-16 py-8 border-t border-b border-black dark:border-white">
                                            <span className="text-4xl md:text-5xl font-black leading-tight block">
                                                “{children}”
                                            </span>
                                        </div>
                                    )
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
