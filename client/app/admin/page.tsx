

"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { createPost, type CreatePostPayload } from '../../services/api';
import { authClient } from '../../services/auth-client';
import { useRouter } from 'next/navigation';
import {
    LayoutGrid,
    FileText,
    User,
    Image as ImageIcon,
    Tags,
    Clock,
    CheckCircle2,
    ArrowLeft,
    ShieldCheck,
    Calendar,
    PenTool,
    Zap,
    Globe,
    BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.push('/'); // Redirect to home or login page if not authorized
        }
    }, [session, isPending, router]);

    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        excerpt: '',
        content: '',
        category: 'AI Lab',
        authorName: '',
        authorAvatar: '',
        publishedAt: new Date().toISOString().split('T')[0],
        readingTime: '',
        image: '',
        isFeatured: false,
        isTrending: false
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const postData: CreatePostPayload = {
                slug: formData.slug,
                title: formData.title,
                excerpt: formData.excerpt,
                content: formData.content,
                category: formData.category,
                authorName: formData.authorName,
                authorAvatar: formData.authorAvatar,
                publishedAt: formData.publishedAt,
                readingTime: formData.readingTime,
                image: formData.image,
                isFeatured: formData.isFeatured,
                isTrending: formData.isTrending
            };

            await createPost(postData);
            setMessage({ type: 'success', text: 'Article published successfully to the intelligence feed.' });
            // Optionally reset form
        } catch (error) {
            setMessage({ type: 'error', text: 'Authorization failed or network error. Please verify credentials.' });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const inputClasses = "w-full bg-white/5 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-ocean/30 focus:border-brand-ocean transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600";
    const labelClasses = "flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-2.5 ml-1";
    const sectionClasses = "bg-white/40 dark:bg-white/[0.01] border border-slate-200/50 dark:border-white/[0.05] rounded-[2.5rem] p-8 md:p-10 shadow-sm backdrop-blur-md";

    if (isPending || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-pearl dark:bg-midnight">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-brand-ocean/30 border-t-brand-ocean rounded-full animate-spin" />
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Verifying Credentials...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-brand-ocean selection:text-midnight transition-colors duration-500 bg-brand-pearl dark:bg-midnight">
            <Navbar />

            <main className="flex-grow pt-32 pb-32">
                <div className="container mx-auto px-6 max-w-6xl">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-2">
                        <div className="space-y-4 animate-in fade-in slide-in-from-left duration-700">
                            <div className="flex items-center gap-2 text-brand-ocean font-bold tracking-widest text-xs uppercase">
                                <ShieldCheck size={16} />
                                <span>Security Verified Workspace</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[0.9]">
                                STUDIO<span className="text-gradient-brand">CONSOLE</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md">
                                Create, orchestrate, and deploy high-fidelity intelligence feeds for your global audience.
                            </p>
                        </div>

                        <div className="flex gap-4 animate-in fade-in slide-in-from-right duration-700">
                            <Link href="/">
                                <div className="group flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-white/10 hover:border-brand-ocean transition-all cursor-pointer">
                                    <ArrowLeft size={16} className="text-slate-400 group-hover:text-brand-ocean transition-colors" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Exit Studio</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Left Column: Content (8 cols) */}
                        <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom duration-700 delay-100">

                            {message && (
                                <div className={`p-5 rounded-2xl flex items-center gap-4 text-sm font-semibold border backdrop-blur-xl animate-in zoom-in duration-300 ${message.type === 'success'
                                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                                    : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                                    }`}>
                                    <div className={`p-2 rounded-full ${message.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                                        {message.type === 'success' ? <CheckCircle2 size={16} /> : <Zap size={16} />}
                                    </div>
                                    {message.text}
                                </div>
                            )}

                            <section className={sectionClasses}>
                                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-white/[0.05]">
                                    <div className="p-3 bg-brand-ocean/10 rounded-2xl text-brand-ocean">
                                        <PenTool size={22} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Primary Manuscript</h2>
                                        <p className="text-xs text-slate-500 italic mt-0.5">Define core content and narrative structure.</p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className={labelClasses}>
                                                <Globe size={13} className="text-brand-ocean" />
                                                Article Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className={inputClasses}
                                                placeholder="Title of your next breakthrough..."
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className={labelClasses}>
                                                <LayoutGrid size={13} className="text-brand-ocean" />
                                                Routing Slug
                                            </label>
                                            <input
                                                type="text"
                                                name="slug"
                                                value={formData.slug}
                                                onChange={handleChange}
                                                className={`${inputClasses} font-mono text-xs`}
                                                placeholder="future-intelligence-01"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className={labelClasses}>
                                            <BarChart3 size={13} className="text-brand-ocean" />
                                            Executive Summary
                                        </label>
                                        <textarea
                                            name="excerpt"
                                            value={formData.excerpt}
                                            onChange={handleChange}
                                            className={`${inputClasses} min-h-[100px] resize-none`}
                                            placeholder="A distilled version of your content for high-level previews..."
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className={labelClasses}>
                                            <FileText size={13} className="text-brand-ocean" />
                                            Deep Intelligence (Markdown)
                                        </label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            className={`${inputClasses} min-h-[450px] font-mono text-[13px] leading-relaxed`}
                                            placeholder="# Start writing your narrative structure..."
                                            required
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Metadata & Actions (4 cols) */}
                        <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right duration-700 delay-200">

                            {/* Deployment Sidebar */}
                            <section className={`${sectionClasses} !p-6 flex flex-col gap-6`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Deployment Config</h3>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className={labelClasses}>Category Environment</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className={`${inputClasses} !py-3 bg-slate-50 dark:bg-white/[0.04]`}
                                        >
                                            <option value="AI Lab">Intelligence (AI Lab)</option>
                                            <option value="Tech Stack">Platform (Tech Stack)</option>
                                            <option value="Business Strategy">Capital (Business Strategy)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Release Schedule</label>
                                        <div className="relative">
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input
                                                type="date"
                                                name="publishedAt"
                                                value={formData.publishedAt}
                                                onChange={handleChange}
                                                className={`${inputClasses} !py-3`}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Telemetry (Read Time)</label>
                                        <div className="relative">
                                            <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input
                                                type="text"
                                                name="readingTime"
                                                value={formData.readingTime}
                                                onChange={handleChange}
                                                className={`${inputClasses} !py-3`}
                                                placeholder="e.g. 12 min read"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-200 dark:border-white/[0.05] space-y-4">
                                    <label className="flex items-center justify-between group cursor-pointer">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Feature in Main Feed</span>
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                name="isFeatured"
                                                checked={formData.isFeatured}
                                                onChange={handleChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-10 h-5 bg-slate-200 dark:bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-ocean shadow-inner transition-colors"></div>
                                        </div>
                                    </label>

                                    <label className="flex items-center justify-between group cursor-pointer">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Trending Promotion</span>
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                name="isTrending"
                                                checked={formData.isTrending}
                                                onChange={handleChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-10 h-5 bg-slate-200 dark:bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-ocean shadow-inner transition-colors"></div>
                                        </div>
                                    </label>
                                </div>
                            </section>

                            {/* Assets Sidebar */}
                            <section className={`${sectionClasses} !p-6 space-y-6`}>
                                <div className="flex items-center gap-3">
                                    <ImageIcon size={18} className="text-brand-ocean" />
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Media Assets</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className={labelClasses}>Display Landscape URL</label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            className={`${inputClasses} !py-3 text-[11px]`}
                                            placeholder="https://source.unsplash.com/..."
                                            required
                                        />
                                    </div>
                                    {formData.image && (
                                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Author Identity */}
                            <section className={`${sectionClasses} !p-6 space-y-6`}>
                                <div className="flex items-center gap-3">
                                    <User size={18} className="text-brand-ocean" />
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Intelligence Source</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className={labelClasses}>Origin Creator</label>
                                        <input
                                            type="text"
                                            name="authorName"
                                            value={formData.authorName}
                                            onChange={handleChange}
                                            className={`${inputClasses} !py-3`}
                                            placeholder="Lead Researcher Name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelClasses}>Identity Avatar URL</label>
                                        <input
                                            type="url"
                                            name="authorAvatar"
                                            value={formData.authorAvatar}
                                            onChange={handleChange}
                                            className={`${inputClasses} !py-3 text-[11px]`}
                                            placeholder="https://avatar.url/..."
                                            required
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="xl"
                                    className="h-16 shadow-2xl shadow-brand-ocean/40"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 border-2 border-midnight/30 border-t-midnight rounded-full animate-spin" />
                                            <span>Orchestrating Feed...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <Zap size={18} />
                                            <span>Deploy Intelligence</span>
                                        </div>
                                    )}
                                </Button>
                                <p className="text-center text-[9px] uppercase tracking-[0.3em] font-black text-slate-400 mt-6 animate-pulse">
                                    Ready for Global Broadcasting
                                </p>
                            </div>
                        </div>

                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
