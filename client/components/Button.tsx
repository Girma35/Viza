
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-brand-ocean text-midnight hover:bg-brand-sky shadow-xl shadow-brand-ocean/20 rounded-full hover:scale-105",
        secondary: "bg-brand-ocean dark:bg-brand-pearl text-midnight hover:opacity-90 rounded-xl",
        outline: "border border-brand-ocean/20 text-brand-ocean dark:text-brand-sky hover:bg-brand-ocean hover:text-midnight rounded-2xl",
        ghost: "text-slate-500 hover:text-brand-ocean dark:hover:text-brand-pearl transition-colors"
    };

    const sizes = {
        sm: "px-4 py-2 text-[8px]",
        md: "px-6 py-2.5 text-[10px]",
        lg: "px-8 py-4 text-[12px]",
        xl: "w-full py-4 text-[10px]"
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
