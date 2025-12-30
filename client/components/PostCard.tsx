import React from 'react';
import { Post } from '../types';
import { Clock } from 'lucide-react';

interface PostCardProps {
  post: Post;
  variant?: 'compact' | 'standard' | 'minimal';
}

const PostCard: React.FC<PostCardProps> = ({ post, variant = 'standard' }) => {
  // Verge-style Sharp Colors (High Contrast)
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'AI Lab': return 'text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-900/20';
      case 'Tech Stack': return 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20';
      case 'Business Strategy': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
      default: return 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800';
    }
  };

  const categoryColorClass = getCategoryColor(post.category);

  // 1. Compact Variant (Used in Lists/Trending) - SHARP & DENSE
  if (variant === 'compact') {
    return (
      <a href={`/article/${post.slug}`} className="group flex gap-4 py-4 border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
        <div className="w-1/3 aspect-[4/3] shrink-0 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex flex-col justify-center gap-1 w-2/3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{post.category}</span>
          <h3 className="text-sm md:text-base font-bold leading-tight text-zinc-900 dark:text-white group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors line-clamp-3">
            {post.title}
          </h3>
        </div>
      </a>
    );
  }

  // 2. Minimal Variant (Sidebar/Text Only)
  if (variant === 'minimal') {
    return (
      <a href={`/article/${post.slug}`} className="group block py-3 border-b border-zinc-100 dark:border-zinc-800">
        <h4 className="font-bold text-base text-zinc-800 dark:text-zinc-200 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 leading-snug transition-colors">
          {post.title}
        </h4>
        <span className="text-[10px] font-mono text-zinc-400 mt-1 block uppercase">
          By {post.author.name}
        </span>
      </a>
    )
  }

  // 3. Standard Card (The "Hero" of Sections) - BIG IMAGE, BOLD TYPE
  return (
    <article className="group flex flex-col h-full bg-transparent">
      <a href={`/article/${post.slug}`} className="block relative aspect-[3/2] overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-4">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Topic Tag Floating on Image (Verge Style) */}
        <div className="absolute top-0 left-0">
          <span className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-white dark:bg-black border-2 border-transparent ${categoryColorClass}`}>
            {post.category}
          </span>
        </div>
      </a>

      <div className="flex flex-col gap-2">
        <a href={`/article/${post.slug}`} className="group-hover:underline decoration-4 decoration-fuchsia-500 underline-offset-4">
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
            {post.title}
          </h2>
        </a>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base font-medium leading-relaxed mt-2 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
            {post.author.name}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span className="text-[10px] uppercase text-zinc-500">{post.publishedAt}</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;