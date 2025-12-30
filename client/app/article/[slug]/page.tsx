"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPostBySlug } from '../../../services/api';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Post } from '../../../types';
import { Clock, Calendar, ChevronLeft, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ArticlePage() {
    const { slug } = useParams();
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
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white font-sans selection:bg-fuchsia-500 selection:text-white">
            <Navbar />
            <div className="container mx-auto px-4 pt-32 max-w-4xl">
                <div className="animate-pulse space-y-8">
                    <div className="h-96 bg-zinc-200 dark:bg-zinc-800 w-full" />
                    <div className="space-y-4">
                        <div className="h-12 bg-zinc-200 dark:bg-zinc-800 w-3/4" />
                        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 w-1/4" />
                    </div>
                </div>
            </div>
        </div>
    );

    if (!post) return <div className="min-h-screen flex items-center justify-center text-2xl font-black uppercase">Article Not Found</div>;

    // Verge-style Color Logic
    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'AI Lab': return 'text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/20';
            case 'Tech Stack': return 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20';
            case 'Business Strategy': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
            default: return 'text-zinc-600 bg-zinc-100 dark:bg-zinc-800';
        }
    };
    const categoryClass = getCategoryColor(post.category);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white font-sans selection:bg-fuchsia-500 selection:text-white">
            <Navbar />

            <main className="pt-24 pb-24">
                {/* HERO SECTION: Full Width Image + Title Overlay Effect */}
                <div className="relative w-full aspect-[21/9] md:aspect-[21/8] bg-zinc-900 overflow-hidden mb-12">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 container mx-auto">
                        <div className="max-w-4xl">
                            <span className={`inline-block px-3 py-1 mb-6 text-xs font-black uppercase tracking-widest bg-white dark:bg-black border border-transparent ${categoryClass}`}>
                                {post.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-6 drop-shadow-lg">
                                {post.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed max-w-2xl drop-shadow-md">
                                {post.excerpt}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA: Two Column Layout (Sidebar for Meta) */}
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: Meta / Author / Share */}
                    <div className="lg:col-span-3 lg:border-r border-zinc-200 dark:border-zinc-800 pr-8">
                        <div className="sticky top-32 flex flex-col gap-8">
                            <div className="border-t-4 border-fuchsia-600 pt-4">
                                <span className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Author</span>
                                <div className="flex items-center gap-4">
                                    <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-700" />
                                    <div>
                                        <span className="block font-bold text-lg leading-tight">{post.author.name}</span>
                                        <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Editor</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t-4 border-zinc-300 dark:border-zinc-700 pt-4">
                                <span className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Published</span>
                                <div className="flex flex-col gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                                    <span className="flex items-center gap-2"><Calendar size={14} /> {post.publishedAt}</span>
                                    <span className="flex items-center gap-2"><Clock size={14} /> {post.readingTime}</span>
                                </div>
                            </div>

                            <button className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-100 dark:bg-zinc-900 hover:bg-fuchsia-600 hover:text-white transition-colors font-black uppercase tracking-widest text-xs rounded-none">
                                <Share2 size={16} /> Share Article
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Article Content */}
                    <article className="lg:col-span-8 lg:col-start-4 prose prose-xl prose-zinc dark:prose-invert max-w-none">
                        {/* We use a markdown parser or just render raw content for now if it's plain text */}
                        <div className="font-serif text-xl leading-relaxed text-zinc-900 dark:text-zinc-100">
                            {/* Simple split for paragraphs since we don't have a full markdown parser installed yet */}
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>

                        {/* Footer visual separator */}
                        <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                            <div className="w-2 h-2 bg-fuchsia-600 rotate-45" />
                            <div className="w-20 h-px bg-fuchsia-600 mx-4" />
                            <div className="w-2 h-2 bg-fuchsia-600 rotate-45" />
                        </div>
                    </article>

                </div>
            </main>

            <Footer />
        </div>
    );
}
