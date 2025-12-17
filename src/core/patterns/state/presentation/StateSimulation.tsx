'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Document } from '../domain/DocumentState';
import { FileText, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export default function StateSimulation() {
    const [document] = useState(() => new Document());
    const [currentState, setCurrentState] = useState(document.getState());
    const [history, setHistory] = useState<string[]>(['Draft']);

    const handleNext = () => {
        document.nextState();
        const newState = document.getState();
        setCurrentState(newState);
        setHistory((prev) => [...prev, newState.name]);
    };

    const handlePrevious = () => {
        document.previousState();
        const newState = document.getState();
        setCurrentState(newState);
        setHistory((prev) => [...prev, newState.name]);
    };

    const states = ['Draft', 'Review', 'Published'];
    const currentIndex = states.indexOf(currentState.name);

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Document Workflow</h3>
                <p className="text-sm text-slate-600">
                    Current State: <span className="font-semibold text-blue-600">{currentState.name}</span>
                </p>
            </div>

            {/* State Visualization */}
            <div className="flex items-center justify-center gap-4 mb-8">
                {states.map((state, index) => (
                    <React.Fragment key={state}>
                        <motion.div
                            animate={{
                                scale: currentIndex === index ? 1.1 : 1,
                                backgroundColor: currentIndex === index ? '#3b82f6' : '#e2e8f0',
                            }}
                            className="relative"
                        >
                            <div
                                className={`w-32 h-32 rounded-lg flex flex-col items-center justify-center shadow-md ${currentIndex === index ? 'text-white' : 'text-slate-700'
                                    }`}
                            >
                                {index === 0 && <FileText size={32} />}
                                {index === 1 && <FileText size={32} />}
                                {index === 2 && <CheckCircle size={32} />}
                                <span className="mt-2 font-semibold">{state}</span>
                            </div>
                        </motion.div>
                        {index < states.length - 1 && (
                            <ArrowRight className="text-slate-400" size={24} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={handlePrevious}
                    disabled={!currentState.previous()}
                    className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <ArrowLeft size={16} /> Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={!currentState.next()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    Next <ArrowRight size={16} />
                </button>
            </div>

            {/* State Info */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-700 mb-2">Current State Capabilities:</h4>
                <ul className="space-y-1 text-sm">
                    <li className={currentState.canEdit ? 'text-green-600' : 'text-slate-400'}>
                        {currentState.canEdit ? '✓' : '✗'} Can Edit
                    </li>
                    <li className={currentState.canReview ? 'text-green-600' : 'text-slate-400'}>
                        {currentState.canReview ? '✓' : '✗'} Can Send to Review
                    </li>
                    <li className={currentState.canPublish ? 'text-green-600' : 'text-slate-400'}>
                        {currentState.canPublish ? '✓' : '✗'} Can Publish
                    </li>
                </ul>
            </div>

            {/* History */}
            <div className="mt-4 text-xs text-slate-500">
                <strong>State History:</strong> {history.join(' → ')}
            </div>
        </div>
    );
}
