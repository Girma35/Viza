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
    <div className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Main Story */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <a href={`/article/${featured.slug}`} className="block group overflow-hidden">
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-8 hover:opacity-70 transition-opacity">
              {featured.title}
            </h1>
          </a>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-lg font-medium leading-relaxed uppercase opacity-80">
                {featured.excerpt}
              </p>
              <div className="flex flex-col gap-2 pt-6 border-t border-black dark:border-white">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span>{featured.author.name}</span>
                  <span>{featured.publishedAt || 'March 2024'}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-50">
                  <span>{featured.category}</span>
                  <span>{featured.readingTime || '5 MIN'} READ</span>
                </div>
              </div>
              <a href={`/article/${featured.slug}`} className="inline-flex items-center justify-center border border-black dark:border-white py-4 mt-4 font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                Read Intelligence
              </a>
            </div>
          </div>
        </div>

        {/* Trending Column */}
        <div className="lg:col-span-4 lg:magazine-border-l lg:pl-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-50">Editor's Choice</h2>
          <div className="space-y-12">
            {trending.map((post, idx) => (
              <a href={`/article/${post.slug}`} key={post.id} className="block group">
                <div className="flex flex-col gap-4">
                  <span className="text-4xl font-black opacity-10 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                  <h3 className="text-xl leading-tight group-hover:underline decoration-2 underline-offset-4">{post.title}</h3>
                  <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest opacity-50">
                    <span>{post.category}</span>
                    <span>{post.author.name}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroGrid;