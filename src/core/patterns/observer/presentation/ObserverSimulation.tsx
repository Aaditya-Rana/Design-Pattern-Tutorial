'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopicSubject } from '../domain/TopicSubject';
import { Observer } from '../domain/interfaces';
import { Plus, Minus, Send, Play } from 'lucide-react';
import clsx from 'clsx';

// Visual representation types
interface Log {
    id: string;
    message: string;
    timestamp: string;
}

function generateId() {
    return `Obs-${Math.floor(Math.random() * 1000)}`;
}

function generateMessage() {
    return `Update #${Math.floor(Math.random() * 100)}`;
}

function generateLogId() {
    return Date.now().toString() + Math.random();
}

export default function ObserverSimulation() {
    const [observers, setObservers] = useState<{ id: string; lastMessage: string }[]>([]);
    const [logs, setLogs] = useState<Log[]>([]);
    const [subjectState, setSubjectState] = useState<string>('Ready');
    const [isNotifying, setIsNotifying] = useState(false);

    // We keep a ref to the domain object to maintain purity, 
    // but we sync it with React state for rendering.
    const subjectRef = useRef<TopicSubject<string>>(new TopicSubject('Initial'));

    const addLog = (msg: string) => {
        setLogs((prev) => [
            { id: generateLogId(), message: msg, timestamp: new Date().toLocaleTimeString() },
            ...prev.slice(0, 9), // Keep last 10
        ]);
    };

    const handleAddObserver = () => {
        if (observers.length >= 5) {
            addLog('Max 5 observers allowed for this demo.');
            return;
        }

        const newId = generateId();
        const newObserver: Observer<string> = {
            id: newId,
            update: (data) => {
                // This runs when notify() is called on the subject
                // We update the specific observer's visual state
                setObservers((prev) =>
                    prev.map((o) => o.id === newId ? { ...o, lastMessage: data } : o)
                );
            }
        };

        subjectRef.current.attach(newObserver);
        setObservers((prev) => [...prev, { id: newId, lastMessage: '' }]);
        addLog(`Attached ${newId}`);
    };

    const handleRemoveObserver = (id: string) => {
        subjectRef.current.detach(id);
        setObservers((prev) => prev.filter((o) => o.id !== id));
        addLog(`Detached ${id}`);
    };

    const handleNotify = () => {
        if (observers.length === 0) {
            addLog('No observers to notify!');
            return;
        }

        setIsNotifying(true);
        const msg = generateMessage();
        setSubjectState(msg);
        addLog(`Subject notifying: "${msg}"`);

        // Simulate network/processing delay for animation
        setTimeout(() => {
            subjectRef.current.notify(msg);
            setIsNotifying(false);
        }, 1000);
    };

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Simulation Area */}
                <div className="flex-1 relative min-h-[400px] bg-white rounded-lg border border-slate-100 shadow-inner flex items-center justify-center overflow-hidden">

                    {/* Subject (Center) */}
                    <div className="z-20 flex flex-col items-center">
                        <motion.div
                            animate={{ scale: isNotifying ? 1.1 : 1 }}
                            className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-4 ring-blue-100"
                        >
                            SUBJECT
                        </motion.div>
                        <div className="mt-2 text-sm font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            State: {subjectState}
                        </div>
                    </div>

                    {/* Observers (Orbiting) */}
                    <AnimatePresence>
                        {observers.map((obs, index) => {
                            // Calculate position in a circle
                            const angle = (index / observers.length) * 2 * Math.PI - (Math.PI / 2);
                            const radius = 140; // distance from center
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;

                            return (
                                <motion.div
                                    key={obs.id}
                                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    animate={{ opacity: 1, scale: 1, x, y }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    className="absolute z-10"
                                >
                                    {/* Connection Line (Visual Only) */}
                                    <svg className="absolute top-1/2 left-1/2 w-0 h-0 overflow-visible -z-10 pointer-events-none">
                                        <motion.line
                                            x1={-x} // Vector back to center (relative to this node)
                                            y1={-y}
                                            x2={0}
                                            y2={0}
                                            stroke="#cbd5e1"
                                            strokeWidth="2"
                                            strokeDasharray="4 4"
                                        />
                                        {/* Notification Particle */}
                                        {isNotifying && (
                                            <motion.circle
                                                r="4"
                                                fill="#2563eb"
                                                initial={{ cx: -x, cy: -y }} // Starts at subject (relative to observer)
                                                animate={{ cx: 0, cy: 0 }} // Ends at observer
                                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                            />
                                        )}
                                    </svg>

                                    <div className="relative group">
                                        <div className={clsx(
                                            "w-16 h-16 rounded-lg flex items-center justify-center text-xs font-semibold shadow-md transition-colors",
                                            obs.lastMessage === subjectState && subjectState !== 'Ready' ? "bg-green-100 text-green-700 border-2 border-green-500" : "bg-white text-slate-700 border border-slate-200"
                                        )}>
                                            {obs.id}
                                        </div>

                                        {/* Interaction: Detach */}
                                        <button
                                            onClick={() => handleRemoveObserver(obs.id)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                                            title="Detach"
                                        >
                                            <Minus size={12} />
                                        </button>

                                        {/* Display Data */}
                                        {obs.lastMessage && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg"
                                            >
                                                Got: {obs.lastMessage}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                </div>

                {/* Controls & Logs Area */}
                <div className="w-full md:w-80 flex flex-col gap-4">

                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
                        <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                            <Play size={18} /> Controls
                        </h3>

                        <div className="flex gap-2">
                            <button
                                onClick={handleAddObserver}
                                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                            >
                                <Plus size={16} /> Attach Obs
                            </button>
                            <button
                                onClick={handleNotify}
                                disabled={isNotifying}
                                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                            >
                                <Send size={16} /> Notify
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 bg-slate-900 rounded-lg p-4 text-xs font-mono text-slate-300 overflow-hidden flex flex-col">
                        <h3 className="text-slate-400 mb-2 font-bold uppercase tracking-wider border-b border-slate-700 pb-1">System Logs</h3>
                        <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
                            <AnimatePresence initial={false}>
                                {logs.map((log) => (
                                    <motion.div
                                        key={log.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-2"
                                    >
                                        <span className="text-slate-500">[{log.timestamp.split(' ')[0]}]</span>
                                        <span>{log.message}</span>
                                    </motion.div>
                                ))}
                                {logs.length === 0 && <span className="text-slate-600 italic">Ready...</span>}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-4 text-sm text-slate-500 bg-blue-50 p-3 rounded border border-blue-100">
                💡 <strong>Try this:</strong> Attach 3 observers, then click &quot;Notify&quot;. Watch how the Subject pushes the state update to all attached observers simultaneously.
            </div>
        </div>
    );
}
