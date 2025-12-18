'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { WebUIFactory, MobileUIFactory, UIFactory } from '../domain/UIFactory';
import { Monitor, Smartphone } from 'lucide-react';

export default function FactorySimulation() {
    const [platform, setPlatform] = useState<'web' | 'mobile'>('web');

    const factory: UIFactory = platform === 'web' ? new WebUIFactory() : new MobileUIFactory();

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-2">UI Component Factory</h3>
                <p className="text-sm text-slate-600">Different factories create platform-specific components</p>
            </div>

            {/* Platform Selector */}
            <div className="flex gap-4 mb-8 justify-center">
                <button
                    onClick={() => setPlatform('web')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${platform === 'web'
                        ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                >
                    <Monitor size={20} />
                    Web Platform
                </button>
                <button
                    onClick={() => setPlatform('mobile')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${platform === 'mobile'
                        ? 'bg-green-600 text-white ring-2 ring-green-400'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                >
                    <Smartphone size={20} />
                    Mobile Platform
                </button>
            </div>

            {/* UI Preview */}
            <motion.div
                key={platform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-lg border-2 border-slate-300"
            >
                <h4 className="font-semibold text-slate-700 mb-4">Generated UI Components:</h4>

                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded border border-slate-200">
                        <div className="text-xs text-slate-500 mb-2">Button Component:</div>
                        <div
                            className={`inline-block px-4 py-2 rounded font-medium ${platform === 'web'
                                ? 'bg-blue-600 text-white'
                                : 'bg-green-600 text-white'
                                }`}
                        >
                            {platform === 'web' ? 'Click Me' : 'Tap Me'}
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded border border-slate-200">
                        <div className="text-xs text-slate-500 mb-2">Dialog Component:</div>
                        <div
                            className={`p-4 rounded shadow-md ${platform === 'web'
                                ? 'bg-white border-2 border-blue-500'
                                : 'bg-gray-100 border-2 border-green-500'
                                }`}
                        >
                            {platform === 'web' ? 'Web Dialog' : 'Mobile Dialog'}
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded text-sm">
                    <strong>Factory Used:</strong> {platform === 'web' ? 'WebUIFactory' : 'MobileUIFactory'}
                </div>
            </motion.div>
        </div>
    );
}
