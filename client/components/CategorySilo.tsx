import React from 'react';
import { Post } from '../types';
import PostCard from './PostCard';

interface CategorySiloProps {
  title: string;
  posts: Post[];
  accentColor?: string;
  injectAdAt?: number; // Deprecated but kept for compatibility
}

const CategorySilo: React.FC<CategorySiloProps> = ({ title, posts, accentColor = 'bg-blue-500' }) => {
  return (
    <section className="mb-24">
      <div className="flex items-end justify-between mb-10 pb-4 border-b border-slate-200 dark:border-white/[0.05]">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-brand-ocean dark:text-brand-sky uppercase tracking-[0.3em]">Explore</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h2>
        </div>
        <a href="#" className="hidden md:block px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] hover:bg-brand-ocean hover:text-white dark:hover:bg-brand-ocean transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em]">
          View All {title}
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
        {posts.map((post) => (
          <React.Fragment key={post.id}>
            <PostCard post={post} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default CategorySilo;
