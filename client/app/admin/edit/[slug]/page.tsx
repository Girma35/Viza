"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { getPostBySlug, updatePost, type CreatePostPayload } from '@/services/api';
import { authClient } from '@/services/auth-client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
    CheckCircle2,
    ArrowLeft,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';

function EditConsole() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { data: session, isPending } = authClient.useSession();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState<CreatePostPayload>({
        slug: '',
        title: '',
        excerpt: '',
        content: '',
        category: 'AI Lab',
        authorName: '',
        authorAvatar: '',
        publishedAt: '',
        readingTime: '',
        image: '',
        isFeatured: false,
        isTrending: false
    });

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase().trim();
    const bypassKey = process.env.NEXT_PUBLIC_ADMIN_BYPASS_KEY;
    const providedKey = searchParams.get('key');

    const isAdmin = (session?.user?.email?.toLowerCase().trim() === adminEmail) || (providedKey === bypassKey);

    useEffect(() => {
        if (!isPending && !isAdmin) {
            router.push('/');
            return;
        }

        if (isAdmin && params.slug) {
            fetchPost();
        }
    }, [isAdmin, isPending, params.slug]);

    const fetchPost = async () => {
        try {
            const post = await getPostBySlug(params.slug as string);
            setFormData({
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt || '',
                content: post.content || '',
                category: post.category,
                authorName: post.author.name,
                authorAvatar: post.author.avatar || '',
                publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : '',
                readingTime: post.readingTime || '',
                image: post.image || '',
                isFeatured: post.isFeatured || false,
                isTrending: post.isTrending || false
            });
        } catch (error) {
            console.error("Failed to fetch post:", error);
            setMessage({ type: 'error', text: 'FAILED TO LOAD MANUSCRIPT.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            await updatePost(params.slug as string, formData, providedKey || undefined);
            setMessage({
                type: 'success',
                text: 'MANUSCRIPT UPDATED SUCCESSFULLY.'
            });
            // If slug changed, redirect to new slug's edit page
            if (formData.slug !== params.slug) {
                router.push(`/admin/edit/${formData.slug}?key=${providedKey || ''}`);
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.response?.data?.error || 'UPDATE FAILED. CHECK PERMISSIONS.';
            setMessage({ type: 'error', text: errorMsg.toUpperCase() });
            console.error(error);
        } finally {
            setSubmitting(false);
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

    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
                <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const inputClasses = "w-full bg-transparent border border-black dark:border-white p-4 text-[13px] font-medium uppercase focus:outline-none placeholder:opacity-30";
    const labelClasses = "text-[10px] font-black uppercase tracking-widest opacity-50 mb-2 block";

    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white dark:bg-black text-black dark:text-white">
            <Navbar />

            <main className="flex-grow pt-24 pb-32">
                <div className="container mx-auto px-4">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-12 magazine-border-b mb-16">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Revision Console</span>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                                Edit<br />Manuscript
                            </h1>
                        </div>
                        <button onClick={() => router.push(`/admin/manage?key=${providedKey || ''}`)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity pb-2">
                            <ArrowLeft size={14} /> Back to Library
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Content Input Area */}
                        <div className="lg:col-span-8 space-y-12">

                            {message && (
                                <div className={`p-8 border border-black dark:border-white flex flex-col gap-4 animate-in slide-in-from-top-4 duration-500 ${message.type === 'success' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-red-50 text-red-600 border-red-200'}`}>
                                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                                        {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                        {message.text}
                                    </div>
                                    <button onClick={() => setMessage(null)} className="text-[9px] font-black uppercase tracking-widest self-start opacity-50 hover:opacity-100">Dismiss</button>
                                </div>
                            )}

                            <div className="space-y-10">
                                <div>
                                    <label className={labelClasses}>Article Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b-4 border-black dark:border-white p-0 pb-4 text-4xl md:text-6xl font-black uppercase focus:outline-none placeholder:opacity-10"
                                        placeholder="Headline here..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div>
                                        <label className={labelClasses}>Slug (URL Endpoint)</label>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            placeholder="future-of-intelligence"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Author Identity</label>
                                        <input
                                            type="text"
                                            name="authorName"
                                            value={formData.authorName}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            placeholder="Girma Wakeyo"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Executive Summary</label>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleChange}
                                        className={`${inputClasses} min-h-[120px] resize-none uppercase leading-relaxed`}
                                        placeholder="Short summary for the intelligence card..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClasses}>Main Intelligence Feed (Markdown Support)</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        className={`${inputClasses} min-h-[500px] font-mono leading-relaxed normal-case`}
                                        placeholder="Write deep intelligence reports here..."
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Config Details */}
                        <div className="lg:col-span-4 space-y-16">

                            <div className="flex flex-col gap-10 p-8 border border-black dark:border-white h-fit">
                                <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Intelligence Config</span>

                                <div className="space-y-8 text-black dark:text-white">
                                    <div>
                                        <label className={labelClasses}>Category Department</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border border-black dark:border-white p-4 text-[11px] font-black uppercase tracking-widest focus:outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="AI Lab">AI Lab (Intelligence)</option>
                                            <option value="Tech Stack">Tech Stack (Infrastructure)</option>
                                            <option value="Business Strategy">Business Strategy (Capital)</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelClasses}>Release Date</label>
                                            <input
                                                type="date"
                                                name="publishedAt"
                                                value={formData.publishedAt}
                                                onChange={handleChange}
                                                className={inputClasses}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Read Time</label>
                                            <input
                                                type="text"
                                                name="readingTime"
                                                value={formData.readingTime}
                                                onChange={handleChange}
                                                className={inputClasses}
                                                placeholder="5 MIN"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Main Image URL</label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            placeholder="https://images.unsplash..."
                                            required
                                        />
                                    </div>

                                    <div className="space-y-6 pt-4">
                                        <label className="flex items-center gap-4 cursor-pointer group">
                                            <div className={`w-6 h-6 border-2 border-black dark:border-white flex items-center justify-center transition-colors ${formData.isFeatured ? 'bg-black dark:bg-white' : ''}`}>
                                                {formData.isFeatured && <div className="w-2 h-2 bg-white dark:bg-black" />}
                                                <input
                                                    type="checkbox"
                                                    name="isFeatured"
                                                    checked={formData.isFeatured}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest">Mark as Featured</span>
                                        </label>

                                        <label className="flex items-center gap-4 cursor-pointer group">
                                            <div className={`w-6 h-6 border-2 border-black dark:border-white flex items-center justify-center transition-colors ${formData.isTrending ? 'bg-black dark:bg-white' : ''}`}>
                                                {formData.isTrending && <div className="w-2 h-2 bg-white dark:bg-black" />}
                                                <input
                                                    type="checkbox"
                                                    name="isTrending"
                                                    checked={formData.isTrending}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest">Add to Trending</span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-6 bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-[0.3em] text-xs hover:invert transition-all flex items-center justify-center gap-4"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                                            <span>Updating...</span>
                                        </>
                                    ) : (
                                        <span>Apply Revisions</span>
                                    )}
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function EditPage() {
    return (
        <Suspense fallback={null}>
            <EditConsole />
        </Suspense>
    );
}
