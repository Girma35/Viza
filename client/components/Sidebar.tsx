import React from 'react';
import { Post } from '../types';
import { Hash } from 'lucide-react';

interface SidebarProps {
    posts: Post[];
}

const Sidebar: React.FC<SidebarProps> = ({ posts }) => {
    return (
        <aside className="lg:col-span-4 hidden lg:block border-l px-8 border-zinc-200 dark:border-zinc-800">
            <div className="sticky top-32 flex flex-col gap-8">
                {/* Header */}
                <div className="pb-4 border-b-4 border-black dark:border-white">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white flex items-center gap-2">
                        <Hash size={20} className="text-fuchsia-600" />
                        Most Popular
                    </h3>
                </div>

                {/* Numbered List - Verge Style */}
                <div className="flex flex-col gap-0">
                    {posts.slice(0, 5).map((p, idx) => (
                        <a key={p.id} href={`/article/${p.slug}`} className="group flex gap-4 items-start py-4 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 -mx-4 px-4 transition-colors">
                            <span className="text-3xl font-black text-zinc-200 dark:text-zinc-800 group-hover:text-fuchsia-600 transition-colors">
                                {(idx + 1).toString()}
                            </span>
                            <div className="flex flex-col pt-1">
                                <h4 className="font-bold text-lg text-zinc-900 dark:text-white leading-[1.1] group-hover:underline underline-offset-2 decoration-2 decoration-fuchsia-600">
                                    {p.title}
                                </h4>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mt-2">
                                    {p.category}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Sharp Ad-like Box (Self Promo) */}
                <div className="mt-8 bg-zinc-900 dark:bg-white text-white dark:text-black p-6">
                    <span className="block text-fuchsia-500 mb-2 text-xs font-black uppercase tracking-[0.2em]">Newsletter</span>
                    <h3 className="text-2xl font-black leading-none mb-4">Command Line</h3>
                    <p className="text-sm font-medium opacity-80 mb-6">Daily updates from the AI frontier.</p>
                    <button className="w-full py-3 bg-white dark:bg-black text-black dark:text-white font-black uppercase tracking-widest text-xs hover:bg-fuchsia-500 hover:text-white transition-colors">
                        Subscribe
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
