'use client';

import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';

export default function ProgressBar() {
    const { user } = useAuth();
    const { getStats, loading } = useProgress();

    if (!user || loading) {
        return null;
    }

    const { completed, inProgress, notStarted, total } = getStats();
    const completedPercent = (completed / total) * 100;
    const inProgressPercent = (inProgress / total) * 100;

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Your Progress</h3>

            {/* Progress Bar */}
            <div className="relative h-8 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div
                    className="absolute h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${completedPercent}%` }}
                />
                <div
                    className="absolute h-full bg-blue-500 transition-all duration-500"
                    style={{ left: `${completedPercent}%`, width: `${inProgressPercent}%` }}
                />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <div className="text-2xl font-bold text-green-600">{completed}</div>
                    <div className="text-xs text-slate-600">Completed</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-blue-600">{inProgress}</div>
                    <div className="text-xs text-slate-600">In Progress</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-400">{notStarted}</div>
                    <div className="text-xs text-slate-600">Not Started</div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-slate-600">Completed</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-slate-600">In Progress</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-slate-200 rounded-full" />
                    <span className="text-slate-600">Not Started</span>
                </div>
            </div>
        </div>
    );
}
