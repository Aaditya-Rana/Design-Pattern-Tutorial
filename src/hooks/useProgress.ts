'use client';

import { useState, useEffect } from 'react';

interface Progress {
    patternSlug: string;
    status: 'not-started' | 'in-progress' | 'completed';
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

    const updateStatus = async (patternSlug: string, status: 'not-started' | 'in-progress' | 'completed') => {
        try {
            const res = await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patternSlug, status }),
            });

            if (res.ok) {
                await fetchProgress();
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const getStatus = (slug: string): 'not-started' | 'in-progress' | 'completed' => {
        const item = progress.find((p) => p.patternSlug === slug);
        return item?.status || 'not-started';
    };

    const getStats = () => {
        const completed = progress.filter((p) => p.status === 'completed').length;
        const inProgress = progress.filter((p) => p.status === 'in-progress').length;
        const notStarted = 10 - completed - inProgress; // Total 10 patterns
        return { completed, inProgress, notStarted, total: 10 };
    };

    return { progress, loading, updateStatus, getStatus, getStats, refetch: fetchProgress };
}
