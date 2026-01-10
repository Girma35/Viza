"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { createPost, type CreatePostPayload } from '@/services/api';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    FileText,
    User,
    Image as ImageIcon,
    Clock,
    CheckCircle2,
    ArrowLeft,
    Calendar,
    Globe,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { allCategories } from '@/utils/category-mapper';

function AdminConsole() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialFormState = {
        slug: '',
        title: '',
        excerpt: '',
        content: '',
        category: 'TECH_NEWS',
        authorName: '',
        authorAvatar: '',
        publishedAt: new Date().toISOString().split('T')[0],
        readingTime: '',
        image: '',
        isFeatured: false,
        isTrending: false
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string, slug?: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            await createPost(formData);
            setMessage({
                type: 'success',
                text: 'PUBLISHED SUCCESSFULLY TO THE VIZA FEED.',
                slug: formData.slug
            });
            setFormData(initialFormState);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.response?.data?.error || 'AUTHORIZATION FAILED OR NETWORK ERROR.';
            setMessage({ type: 'error', text: errorMsg.toUpperCase() });
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
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Administrative Access</span>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                                Studio<br />Console
                            </h1>
                        </div>
                        <div className="flex gap-6 pb-2">
                            <button
                                onClick={() => router.push(`/trojan30598/manage`)}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity"
                            >
                                <FileText size={14} /> Manage Library
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity"
                            >
                                <ArrowLeft size={14} /> Finish & Exit
                            </button>
                        </div>
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
                                    {message.type === 'success' && message.slug && (
                                        <Link href={`/article/${message.slug}`} className="text-[10px] font-black uppercase tracking-widest underline underline-offset-4 decoration-2">
                                            View Published Article →
                                        </Link>
                                    )}
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
                                            {allCategories.map((cat) => (
                                                <option key={cat.enum} value={cat.enum} className="bg-white dark:bg-black">
                                                    {cat.display.toUpperCase()} ({cat.enum})
                                                </option>
                                            ))}
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
                                    disabled={loading}
                                    className="w-full py-6 bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-[0.3em] text-xs hover:invert transition-all flex items-center justify-center gap-4"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <span>Deploy Intelligence</span>
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

export default function AdminPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
                <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <AdminConsole />
        </Suspense>
    );
}
