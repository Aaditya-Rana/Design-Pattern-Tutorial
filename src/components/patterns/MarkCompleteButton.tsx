'use client';

import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

interface MarkCompleteButtonProps {
    patternSlug: string;
}

export default function MarkCompleteButton({ patternSlug }: MarkCompleteButtonProps) {
    const { user } = useAuth();
    const { isCompleted, markComplete } = useProgress();
    const [loading, setLoading] = useState(false);

    if (!user) {
        return null;
    }

    const completed = isCompleted(patternSlug);

    const handleToggle = async () => {
        if (completed) return; // Can't uncomplete

        setLoading(true);
        await markComplete(patternSlug);
        setLoading(false);
    };

    return (
        <button
            onClick={handleToggle}
            disabled={completed || loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${completed
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
        >
            {completed ? (
                <>
                    <CheckCircle2 size={20} />
                    Completed!
                </>
            ) : (
                <>
                    <Circle size={20} />
                    {loading ? 'Marking...' : 'Mark as Complete'}
                </>
            )}
        </button>
    );
}
