'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SortContext,
    BubbleSortStrategy,
    QuickSortStrategy,
    MergeSortStrategy,
    SortStep,
} from '../domain/SortStrategy';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

const STRATEGIES = {
    bubble: new BubbleSortStrategy(),
    quick: new QuickSortStrategy(),
    merge: new MergeSortStrategy(),
};

function generateRandomArray(size: number = 10): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

export default function StrategySimulation() {
    const [array, setArray] = useState<number[]>(generateRandomArray());
    const [currentStrategy, setCurrentStrategy] = useState<keyof typeof STRATEGIES>('bubble');
    const [steps, setSteps] = useState<SortStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const context = useRef(new SortContext(STRATEGIES[currentStrategy]));

    const handleStrategyChange = (strategy: keyof typeof STRATEGIES) => {
        setCurrentStrategy(strategy);
        context.current.setStrategy(STRATEGIES[strategy]);
        resetVisualization();
    };

    const handleSort = () => {
        const result = context.current.executeStrategy(array);
        setSteps(result.steps);
        setCurrentStep(0);
        setIsSorted(false);
    };

    const handlePlay = () => {
        if (steps.length === 0) {
            handleSort();
        }
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const resetVisualization = () => {
        setSteps([]);
        setCurrentStep(0);
        setIsPlaying(false);
        setIsSorted(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleReset = () => {
        setArray(generateRandomArray());
        resetVisualization();
    };

    React.useEffect(() => {
        if (isPlaying && steps.length > 0) {
            intervalRef.current = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev >= steps.length - 1) {
                        setIsPlaying(false);
                        setIsSorted(true);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 100);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, steps]);

    const currentArray = steps[currentStep]?.array || array;
    const comparing = steps[currentStep]?.comparing;
    const swapping = steps[currentStep]?.swapping;
    const sorted = steps[currentStep]?.sorted;

    const maxValue = Math.max(...currentArray);

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-4xl mx-auto">
            {/* Strategy Selection */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Zap size={16} className="text-blue-600" /> Select Sorting Strategy
                </h3>
                <div className="flex gap-2">
                    {Object.keys(STRATEGIES).map((key) => (
                        <button
                            key={key}
                            onClick={() => handleStrategyChange(key as keyof typeof STRATEGIES)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${currentStrategy === key
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'
                                }`}
                        >
                            {STRATEGIES[key as keyof typeof STRATEGIES].name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Visualization Area */}
            <div className="bg-white rounded-lg border border-slate-100 p-6 mb-6 min-h-[300px] flex items-end justify-center gap-1">
                <AnimatePresence mode="popLayout">
                    {currentArray.map((value, index) => {
                        const isComparing = comparing?.includes(index);
                        const isSwapping = swapping?.includes(index);
                        const isSortedIndex = sorted?.includes(index);

                        return (
                            <motion.div
                                key={`${index}-${value}`}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center gap-1"
                                style={{ width: `${100 / currentArray.length}%`, maxWidth: '60px' }}
                            >
                                <motion.div
                                    animate={{
                                        backgroundColor: isSortedIndex
                                            ? '#10b981'
                                            : isSwapping
                                                ? '#f59e0b'
                                                : isComparing
                                                    ? '#3b82f6'
                                                    : '#cbd5e1',
                                    }}
                                    className="w-full rounded-t transition-colors"
                                    style={{
                                        height: `${(value / maxValue) * 200}px`,
                                        minHeight: '20px',
                                    }}
                                />
                                <span className="text-xs font-mono text-slate-600">{value}</span>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {!isPlaying ? (
                        <button
                            onClick={handlePlay}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            <Play size={16} /> {steps.length === 0 ? 'Sort' : 'Resume'}
                        </button>
                    ) : (
                        <button
                            onClick={handlePause}
                            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            <Pause size={16} /> Pause
                        </button>
                    )}
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>

                <div className="text-sm text-slate-600">
                    {isSorted ? (
                        <span className="text-green-600 font-semibold">✓ Sorted!</span>
                    ) : steps.length > 0 ? (
                        <span>
                            Step {currentStep + 1} / {steps.length}
                        </span>
                    ) : (
                        <span>Ready to sort</span>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex gap-4 text-xs text-slate-600 bg-blue-50 p-3 rounded border border-blue-100">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded" />
                    <span>Comparing</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded" />
                    <span>Swapping</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    <span>Sorted</span>
                </div>
            </div>
        </div>
    );
}
