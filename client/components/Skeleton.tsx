
import React from 'react';

export const PostCardSkeleton: React.FC = () => (
  <div className="animate-pulse flex flex-col gap-4">
    <div className="aspect-video bg-slate-800 rounded-xl" />
    <div className="h-4 w-1/4 bg-slate-800 rounded" />
    <div className="h-6 w-full bg-slate-800 rounded" />
    <div className="h-4 w-3/4 bg-slate-800 rounded" />
  </div>
);

export const HeroSkeleton: React.FC = () => (
  <div className="animate-pulse grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 aspect-[16/9] bg-slate-800 rounded-2xl" />
    <div className="flex flex-col gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex gap-4">
          <div className="w-24 h-24 bg-slate-800 rounded-lg shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 w-full bg-slate-800 rounded" />
            <div className="h-4 w-2/3 bg-slate-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
