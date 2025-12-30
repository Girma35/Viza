
import React, { useState, useEffect } from 'react';
import { Post } from './types';
import { getPosts } from './services/api';
import Navbar from './components/Navbar';
import HeroGrid from './components/HeroGrid';
import AdSlot from './components/AdSlot';
import CategorySilo from './components/CategorySilo';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { HeroSkeleton } from './components/Skeleton';

const App: React.FC = () => {
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

  const aiLabPosts = posts.filter(p => p.category === 'AI Lab');
  const techStackPosts = posts.filter(p => p.category === 'Tech Stack');
  const businessPosts = posts.filter(p => p.category === 'Business Strategy');

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-ocean selection:text-midnight transition-colors duration-500">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 md:pb-0">
        {/* Desktop Leaderboard */}
        <div className="container mx-auto px-4 mb-12 hidden md:block">
          <AdSlot size="leaderboard" />
        </div>

        <div className="container mx-auto px-4">
          {loading ? (
            <HeroSkeleton />
          ) : (
            <>
              {featured && <HeroGrid featured={featured} trending={trending} />}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8">
                  <CategorySilo
                    title="AI Lab"
                    posts={aiLabPosts}
                    accentColor="bg-brand-ocean dark:bg-brand-cream"
                    injectAdAt={0}
                  />
                  <CategorySilo
                    title="Tech Stack"
                    posts={techStackPosts}
                    accentColor="bg-brand-sky"
                  />
                  <CategorySilo
                    title="Business Strategy"
                    posts={businessPosts}
                    accentColor="bg-brand-ocean"
                  />
                </div>

                <Sidebar posts={posts} />
              </div>
            </>
          )}
        </div>
      </main>

      {showAnchor && (
        <AdSlot
          size="mobile-anchor"
          onClose={() => setShowAnchor(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;
