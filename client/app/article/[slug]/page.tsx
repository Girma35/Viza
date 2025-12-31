"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPostBySlug } from '../../../services/api';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Post } from '../../../types';
import { ArrowLeft, Share2, Instagram, Twitter, Youtube } from 'lucide-react';
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

                {/* Hero Title Section */}
                <div className="container mx-auto px-4 py-16 magazine-border-b">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                        <div className="lg:col-span-8">
                            <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter mb-0">
                                {post.title}
                            </h1>
                        </div>
                        <div className="lg:col-span-4">
                            <p className="text-lg md:text-xl font-medium leading-relaxed uppercase opacity-70">
                                {post.excerpt}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Meta details bar */}
                <div className="container mx-auto px-4 py-4 flex flex-wrap gap-8 justify-between items-center text-[10px] font-black uppercase tracking-widest magazine-border-b">
                    <div className="flex gap-8">
                        <span>Text: {post.author.name}</span>
                        <span>Date: {post.publishedAt || '16. March 2024'}</span>
                        <span>Read: {post.readingTime || '5 MIN'}</span>
                    </div>
                    <span className="border border-black dark:border-white px-4 py-1 rounded-full">{post.category}</span>
                </div>

                {/* Hero Image */}
                <div className="container mx-auto px-4 mt-12 mb-24">
                    <div className="aspect-[21/9] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 bg-black">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Sticky Meta */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-32 flex flex-col gap-12">
                            <div className="flex flex-col gap-6">
                                <div className="w-20 h-20 rounded-none bg-black overflow-hidden grayscale">
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
                                    <Twitter size={18} className="cursor-pointer hover:opacity-50" />
                                    <Instagram size={18} className="cursor-pointer hover:opacity-50" />
                                    <Youtube size={18} className="cursor-pointer hover:opacity-50" />
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
