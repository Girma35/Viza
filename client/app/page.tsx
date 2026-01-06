
"use client";

import React, { useState, useEffect } from 'react';
import { Post } from '@/types';
import { getPosts } from '@/services/api';
import Navbar from '@/components/Navbar';
import HeroGrid from '@/components/HeroGrid';

import CategorySilo from '@/components/CategorySilo';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { HeroSkeleton } from '@/components/Skeleton';

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAnchor, setShowAnchor] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const featured = posts.find(p => p.isFeatured);
    const trending = posts.filter(p => p.isTrending).slice(0, 3);

    const techNewsPosts = posts.filter(p => p.category === 'TECH_NEWS');
    const learningPosts = posts.filter(p => p.category === 'LEARNING');
    const roadmapsPosts = posts.filter(p => p.category === 'ROAD_MAPS');
    const saasPosts = posts.filter(p => p.category === 'SAAS');

    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white dark:bg-black">
            <Navbar />

            <main className="flex-grow pt-16">
                {/* News Ticker */}
                <div className="ticker-container magazine-border-b">
                    <div className="animate-ticker">
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="mx-8">
                                BREAKING: THE FUTURE IS REDEFINED +++ VIZA INTELLIGENCE REPORT +++ ARTIFICIAL ASCENSION +++ STRATEGIC DEPTH
                            </span>
                        ))}
                    </div>
                </div>

                {/* Giant Page Title Section */}
                <div className="container mx-auto px-4 py-8 magazine-border-b">
                    <h1 className="giant-header text-center">
                        VIZA <span className="text-stroke">DIGITAL</span>
                    </h1>
                </div>

                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="py-24 text-center">
                            <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Processing Intelligence...</p>
                        </div>
                    ) : (
                        <>
                            <div className="magazine-border-b mb-12">
                                {featured && <HeroGrid featured={featured} trending={trending} />}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                <div className="lg:col-span-8 lg:pr-12 lg:magazine-border-r pb-12">
                                    <div className="space-y-24">
                                        <CategorySilo
                                            title="Tech news"
                                            posts={techNewsPosts}
                                            accentColor="bg-black text-white"
                                        />
                                        <CategorySilo
                                            title="Learning"
                                            posts={learningPosts}
                                            accentColor="bg-black text-white"
                                        />
                                        <CategorySilo
                                            title="Road maps"
                                            posts={roadmapsPosts}
                                            accentColor="bg-black text-white"
                                        />
                                        <CategorySilo
                                            title="SaaS"
                                            posts={saasPosts}
                                            accentColor="bg-black text-white"
                                        />
                                    </div>
                                </div>

                                <div className="lg:col-span-4 lg:pl-12 pt-12 lg:pt-0 pb-12">
                                    <Sidebar posts={posts} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

