
export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author;
  publishedAt: string;
  readingTime: string;
  image: string;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export type AdSize = 'leaderboard' | 'sidebar' | 'inline' | 'mobile-infeed' | 'mobile-anchor';

export interface AdProps {
  size: AdSize;
  className?: string;
  onClose?: () => void;
}
