'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, LogOut, UserPlus, User } from 'lucide-react';

export default function Header() {
    const { user, loading, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        window.location.href = '/';
    };

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
                <Link href="/" className="text-xl sm:text-2xl font-bold text-slate-900">
                    <span className="hidden sm:inline">Design Patterns</span>
                    <span className="sm:hidden">DP Tutorial</span>
                </Link>

                <nav className="flex items-center gap-2 sm:gap-4">
                    {loading ? (
                        <div className="w-20 sm:w-24 h-8 sm:h-10 bg-slate-200 animate-pulse rounded" />
                    ) : user ? (
                        <>
                            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-700">
                                <User size={16} />
                                <span>{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 sm:gap-2 bg-slate-600 hover:bg-slate-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth/login"
                                className="flex items-center gap-1 sm:gap-2 text-slate-700 hover:text-slate-900 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
                            >
                                <LogIn size={16} />
                                <span className="hidden sm:inline">Login</span>
                            </Link>
                            <Link
                                href="/auth/register"
                                className="flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
                            >
                                <UserPlus size={16} />
                                <span className="hidden sm:inline">Sign Up</span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
