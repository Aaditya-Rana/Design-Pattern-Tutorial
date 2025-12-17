'use client';

import { useState, useEffect } from 'react';

interface Progress {
    patternSlug: string;
    completed: boolean;
    completedAt?: string;
}

export function useProgress() {
    const [progress, setProgress] = useState<Progress[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProgress();
    }, []);

    const fetchProgress = async () => {
        try {
            const res = await fetch('/api/progress');
            if (res.ok) {
                const data = await res.json();
                setProgress(data.progress);
            }
        } catch (error) {
            console.error('Failed to fetch progress:', error);
        } finally {
            setLoading(false);
        }
    };

    const markComplete = async (patternSlug: string) => {
        try {
            const res = await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patternSlug }),
            });

            if (res.ok) {
                await fetchProgress();
            }
        } catch (error) {
            console.error('Failed to mark complete:', error);
        }
    };

    const isCompleted = (slug: string) => {
        return progress.some((p) => p.patternSlug === slug && p.completed);
    };

    return { progress, loading, markComplete, isCompleted, refetch: fetchProgress };
}
