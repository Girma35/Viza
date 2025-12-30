import React from 'react';
import { Post } from '../types';
import PostCard from './PostCard';
import { ArrowUpRight } from 'lucide-react';

interface HeroGridProps {
  featured: Post;
  trending: Post[];
}

const HeroGrid: React.FC<HeroGridProps> = ({ featured, trending }) => {
  return (
    <div className="mb-24 border-b-4 border-black dark:border-white pb-12">
      {/* Verge-style Mosaic: 1 Big Left, 2 Stacked Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">

        {/* [Left Column] THE LEAD STORY (2/3 width) */}
        <div className="lg:col-span-2 group">
          <a href={`/article/${featured.slug}`} className="block relative aspect-[16/9] mb-6 overflow-hidden bg-zinc-900">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          </a>
          <div className="flex flex-col gap-4 max-w-2xl">
            <a href={`/article/${featured.slug}`} className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
              <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white leading-[0.95] tracking-tighter">
                {featured.title}
              </h1>
            </a>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium leading-normal">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-1 py-0.5 bg-fuchsia-600 text-white text-[10px] font-bold uppercase tracking-widest">{featured.category}</span>
              <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase">By {featured.author.name}</span>
            </div>
          </div>
        </div>

        {/* [Right Column] TOP STORIES STACK (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col border-t-4 border-black dark:border-white lg:border-t-0 lg:border-l lg:pl-8">
          <div className="flex items-center justify-between mb-6 pt-2 lg:pt-0">
            <h2 className="text-sm font-black uppercase tracking-widest text-fuchsia-600">Top Stories</h2>
            <ArrowUpRight size={16} />
          </div>

          <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
            {trending.map((post) => (
              <div key={post.id} className="py-6 first:pt-0 last:pb-0">
                <PostCard post={post} variant="compact" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroGrid;