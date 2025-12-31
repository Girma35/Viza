import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  variant?: 'compact' | 'standard' | 'minimal';
}

const PostCard: React.FC<PostCardProps> = ({ post, variant = 'standard' }) => {
  if (variant === 'compact') {
    return (
      <a href={`/article/${post.slug}`} className="group block py-6 border-b border-black dark:border-white last:border-0">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-2 flex-grow">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-50">{post.category}</span>
            <h3 className="text-lg font-black leading-tight group-hover:underline underline-offset-4">{post.title}</h3>
          </div>
          <div className="w-16 h-16 shrink-0 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'minimal') {
    return (
      <a href={`/article/${post.slug}`} className="group block py-4 border-b border-black dark:border-white opacity-80 hover:opacity-100 transition-opacity">
        <h4 className="text-base font-black uppercase leading-tight">{post.title}</h4>
        <div className="flex justify-between mt-2 text-[8px] font-black uppercase tracking-widest opacity-50">
          <span>{post.author.name}</span>
          <span>{post.category}</span>
        </div>
      </a>
    );
  }

  return (
    <article className="group flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 text-[9px] font-black uppercase tracking-widest">
        <span>{post.publishedAt || '16. March 2024'}</span>
        <span className="border border-black dark:border-white px-3 py-1 rounded-full">{post.category}</span>
      </div>

      <a href={`/article/${post.slug}`} className="block aspect-[4/3] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 mb-6 font-sans">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
      </a>

      <div className="flex flex-col gap-4">
        <a href={`/article/${post.slug}`}>
          <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter hover:opacity-70 transition-opacity">
            {post.title}
          </h2>
        </a>

        <p className="text-sm font-medium leading-relaxed opacity-80 uppercase line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex justify-between items-center pt-6 mt-2 border-t border-black dark:border-white text-[9px] font-black uppercase tracking-widest">
          <div className="flex gap-4">
            <span>Text: {post.author.name}</span>
            <span>Duration: {post.readingTime || '2 MIN'}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;