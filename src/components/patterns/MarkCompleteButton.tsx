'use client';

import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { useState } from 'react';

interface StatusButtonProps {
    patternSlug: string;
}

export default function StatusButton({ patternSlug }: StatusButtonProps) {
    const { user } = useAuth();
    const { getStatus, updateStatus } = useProgress();
    const [loading, setLoading] = useState(false);

    if (!user) {
        return null;
    }

    const status = getStatus(patternSlug);

    const handleStatusChange = async (newStatus: 'not-started' | 'in-progress' | 'completed') => {
        setLoading(true);
        await updateStatus(patternSlug, newStatus);
        setLoading(false);
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => handleStatusChange('not-started')}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${status === 'not-started'
                        ? 'bg-slate-200 text-slate-700 ring-2 ring-slate-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
            >
                <Circle size={18} />
                Not Started
            </button>

            <button
                onClick={() => handleStatusChange('in-progress')}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${status === 'in-progress'
                        ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
            >
                <Clock size={18} />
                In Progress
            </button>

            <button
                onClick={() => handleStatusChange('completed')}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${status === 'completed'
                        ? 'bg-green-600 text-white ring-2 ring-green-400'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
            >
                <CheckCircle2 size={18} />
                Completed
            </button>
        </div>
    );
}
