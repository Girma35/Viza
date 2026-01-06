import React from 'react';
import { Post } from '../types';
import PostCard from './PostCard';
import { ArrowRight } from 'lucide-react';

interface CategorySiloProps {
  title: string;
  posts: Post[];
  accentColor?: string;
  injectAdAt?: number;
}

const CategorySilo: React.FC<CategorySiloProps> = ({ title, posts, injectAdAt }) => {
  return (
    <div className="py-12">
      <div className="flex justify-between items-end mb-12 magazine-border-b pb-4">
        <h2 className="text-4xl font-black tracking-tighter uppercase">{title}</h2>
        <a href={`/category/${title.toLowerCase().replace(' ', '-')}`} className="text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity flex items-center gap-2">
          See All <ArrowRight size={14} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {posts.map((post, idx) => (
          <div key={post.id} className={`pb-12 md:pb-0 ${idx !== posts.length - 1 ? 'md:pr-8 md:magazine-border-r' : ''} ${idx !== 0 ? 'md:pl-8' : ''}`}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySilo;
