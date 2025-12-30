
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '../../services/auth-client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { ShieldCheck, Lock, Mail, ArrowRight, Zap, AlertCircle } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: signInError } = await authClient.signIn.email({
                email,
                password,
                callbackURL: '/admin'
            });

            if (signInError) {
                setError(signInError.message || 'Authentication failed. Please check your credentials.');
            } else {
                router.push('/admin');
            }
        } catch (err) {
            setError('A network error occurred. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full bg-white/5 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] rounded-2xl px-5 py-4 pl-12 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-ocean/30 focus:border-brand-ocean transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600";
    const labelClasses = "flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-2.5 ml-1";

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-brand-ocean selection:text-midnight transition-colors duration-500 bg-brand-pearl dark:bg-midnight overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-ocean/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-ocean/5 rounded-full blur-[120px] pointer-events-none" />

            <Navbar />

            <main className="flex-grow flex items-center justify-center pt-24 pb-24 px-6 relative z-10">
                <div className="w-full max-w-md animate-in fade-in zoom-in duration-700">
                    <div className="bg-white/40 dark:bg-white/[0.01] border border-slate-200/50 dark:border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-3xl relative">

                        {/* Status Badge */}
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-ocean/10 text-brand-ocean border border-brand-ocean/20">
                                <ShieldCheck size={14} className="animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Secure Access Point</span>
                            </div>
                        </div>

                        {/* Heading */}
                        <div className="text-center mb-10 space-y-2">
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                                IDENTITY<span className="text-gradient-brand">VAULT</span>
                            </h1>
                            <p className="text-xs text-slate-500 font-medium tracking-wide">
                                Authenticate to access the intelligence console.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-600 text-[13px] font-semibold animate-in slide-in-from-top duration-300">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2 relative">
                                <label className={labelClasses}>Deployment Interface (Email)</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={inputClasses}
                                        placeholder="admin@viza.ai"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 relative">
                                <label className={labelClasses}>Authorization Key (Password)</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={inputClasses}
                                        placeholder="••••••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="xl"
                                    className="w-full h-16 group shadow-xl shadow-brand-ocean/20"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 border-2 border-midnight/30 border-t-midnight rounded-full animate-spin" />
                                            <span>Verifying Identity...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <span>Initialize Access</span>
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/[0.05] text-center">
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 flex items-center justify-center gap-2">
                                <Zap size={12} className="text-brand-ocean" />
                                Encrypted Connection Verified
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
