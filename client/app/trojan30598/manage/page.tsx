"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { getPosts, deletePost } from '@/services/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Trash2, Edit3, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/types';

function ManagePostsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!window.confirm(`Are you sure you want to delete this article? This action cannot be undone.`)) return;

        setActionLoading(slug);
        try {
            await deletePost(slug);
            setPosts(posts.filter(p => p.slug !== slug));
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.response?.data?.error || "Failed to delete post. You may not have permission.";
            alert(errorMsg);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
                <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white dark:bg-black text-black dark:text-white">
            <Navbar />

            <main className="flex-grow pt-24 pb-32">
                <div className="container mx-auto px-4">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-12 magazine-border-b mb-16">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Intelligence Management</span>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                                Manuscript<br />Library
                            </h1>
                        </div>
                        <div className="flex gap-6 pb-2">
                            <button
                                onClick={() => router.push(`/trojan30598`)}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity"
                            >
                                <Edit3 size={14} /> Create New
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity"
                            >
                                <ArrowLeft size={14} /> Exit
                            </button>
                        </div>
                    </div>

                    {/* Posts List */}
                    <div className="space-y-0 divide-y divide-black dark:divide-white">
                        {posts.length === 0 ? (
                            <div className="py-24 text-center">
                                <p className="text-xl font-black uppercase opacity-20 italic tracking-widest text-[40px]">No Manuscripts Found</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className="group py-8 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all px-4 -mx-4">
                                    <div className="flex flex-col gap-2 max-w-2xl">
                                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100">
                                            <span>{post.publishedAt || 'March 2024'}</span>
                                            <span className="border border-current px-2 py-0.5 rounded-full">{post.category}</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight">
                                            {post.title}
                                        </h2>
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100">
                                            Slug: {post.slug}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <Link
                                            href={`/article/${post.slug}`}
                                            className="text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 flex items-center gap-2"
                                        >
                                            <ExternalLink size={14} /> View
                                        </Link>
                                        <button
                                            onClick={() => router.push(`/trojan30598/edit/${post.slug}`)}
                                            className="text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 flex items-center gap-2"
                                        >
                                            <Edit3 size={14} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.slug)}
                                            disabled={actionLoading === post.slug}
                                            className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400 group-hover:text-white dark:group-hover:text-black opacity-50 hover:opacity-100 flex items-center gap-2"
                                        >
                                            <Trash2 size={14} /> {actionLoading === post.slug ? '...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function ManagePostsPage() {
    return (
        <Suspense fallback={null}>
            <ManagePostsContent />
        </Suspense>
    );
}
