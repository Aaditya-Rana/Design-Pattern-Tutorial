'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageProxy } from '../domain/ImageProxy';
import { Image as ImageIcon, Eye, Download } from 'lucide-react';

export default function ProxySimulation() {
    const [proxies] = useState([
        new ImageProxy('photo1.jpg'),
        new ImageProxy('photo2.jpg'),
        new ImageProxy('photo3.jpg'),
    ]);
    const [loadedStates, setLoadedStates] = useState([false, false, false]);
    const [displayMessages, setDisplayMessages] = useState<string[]>([]);

    const loadImage = (index: number) => {
        const message = proxies[index].display();
        setDisplayMessages((prev) => [...prev, message]);

        const newStates = [...loadedStates];
        newStates[index] = true;
        setLoadedStates(newStates);
    };

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Image Lazy Loading Proxy</h3>
                <p className="text-sm text-slate-600">Images are only loaded when you click to view them</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
                {proxies.map((proxy, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-4 rounded-lg border-2 border-slate-300"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center justify-center h-32 bg-slate-100 rounded mb-3">
                            {loadedStates[index] ? (
                                <ImageIcon size={48} className="text-blue-600" />
                            ) : (
                                <ImageIcon size={48} className="text-slate-300" />
                            )}
                        </div>

                        <div className="text-sm font-semibold text-slate-700 mb-2">
                            photo{index + 1}.jpg
                        </div>

                        <div className="text-xs text-slate-500 mb-3">
                            {loadedStates[index] ? (
                                <span className="text-green-600 flex items-center gap-1">
                                    <Download size={12} /> Loaded ({proxy.getSize()} KB)
                                </span>
                            ) : (
                                <span className="text-slate-400">Not loaded yet</span>
                            )}
                        </div>

                        <button
                            onClick={() => loadImage(index)}
                            disabled={loadedStates[index]}
                            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded font-medium transition-colors ${loadedStates[index]
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            <Eye size={16} />
                            {loadedStates[index] ? 'Loaded' : 'Load Image'}
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Activity Log */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-700 mb-2 text-sm">Activity Log:</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                    {displayMessages.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No images loaded yet</p>
                    ) : (
                        displayMessages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xs text-slate-600 font-mono"
                            >
                                {msg}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
