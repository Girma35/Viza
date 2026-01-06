import React from 'react';
import { Post } from '../types';

interface SidebarProps {
    posts: Post[];
}

const Sidebar: React.FC<SidebarProps> = ({ posts }) => {
    return (
        <aside className="sticky top-24 flex flex-col gap-16 h-fit">
            {/* Print Edition Promo (Magazine Style) */}
            <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Printmagazine</span>
                <div className="text-4xl font-black tracking-tighter uppercase mb-2">03/2024</div>
                <div className="relative aspect-[3/4] overflow-hidden bg-black flex items-center justify-center p-8 text-white group cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop"
                        alt="Magazine Cover"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                        <div className="text-6xl font-black italic tracking-tighter">VIZA</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] border-t border-b border-white/40 py-1">Magazine</div>
                    </div>
                </div>
                <button className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-[0.2em] text-[10px] hover:invert transition-all">
                    Purchase Copy
                </button>
            </div>

            {/* Most Popular List */}
            <div className="flex flex-col gap-8">
                <div className="magazine-border-b pb-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-50">Most Popular</h3>
                </div>
                <div className="flex flex-col gap-0 divide-y divide-black/10 dark:divide-white/10">
                    {posts.slice(0, 3).map((p, idx) => (
                        <a key={p.id} href={`/article/${p.slug}`} className="group block py-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black -mx-4 px-4 transition-all">
                            <div className="flex gap-6 items-start">
                                <span className="text-lg font-black opacity-30 group-hover:opacity-100 italic tracking-tighter">0{idx + 1}</span>
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-xl font-black leading-tight group-hover:underline underline-offset-4 decoration-2">{p.title}</h4>
                                    <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100">
                                        <span>Text: {p.author.name}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
