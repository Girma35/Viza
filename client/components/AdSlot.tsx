import React from 'react';

interface AdSlotProps {
    size?: string;
    className?: string;
}

const AdSlot = ({ size = 'medium-rectangle', className = '' }: AdSlotProps) => {
    return (
        <div className={`w-full bg-gray-100 flex items-center justify-center border border-gray-200 my-8 ${size === 'leaderboard' ? 'h-32' : 'h-64'
            } ${className}`}>
            <span className="text-gray-400 text-sm">Advertisement Space ({size})</span>
        </div>
    );
};

export default AdSlot;
