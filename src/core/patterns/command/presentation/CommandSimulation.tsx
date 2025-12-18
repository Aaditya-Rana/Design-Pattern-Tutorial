'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CommandHistory, AddTextCommand, DeleteTextCommand, TextEditor } from '../domain/CommandPattern';
import { Undo2, Redo2, Type, Trash2 } from 'lucide-react';

export default function CommandSimulation() {
    const [editor] = useState(() => new TextEditor());
    const [history] = useState(() => new CommandHistory());
    const [content, setContent] = useState('');
    const [commandLog, setCommandLog] = useState<string[]>([]);

    const addText = (text: string) => {
        const command = new AddTextCommand(editor, text, content.length);
        history.execute(command);
        setContent(editor.getText());
        setCommandLog((prev) => [...prev, `Added: "${text}"`]);
    };

    const deleteText = (length: number) => {
        if (content.length === 0) return;
        const deleteLength = Math.min(length, content.length);
        const command = new DeleteTextCommand(editor, content.length - deleteLength, deleteLength);
        history.execute(command);
        setContent(editor.getText());
        setCommandLog((prev) => [...prev, `Deleted ${deleteLength} chars`]);
    };

    const undo = () => {
        if (history.undo()) {
            setContent(editor.getText());
            setCommandLog((prev) => [...prev, '↶ Undo']);
        }
    };

    const redo = () => {
        if (history.redo()) {
            setContent(editor.getText());
            setCommandLog((prev) => [...prev, '↷ Redo']);
        }
    };

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Text Editor with Undo/Redo</h3>
                <p className="text-sm text-slate-600">Commands are encapsulated and reversible</p>
            </div>

            {/* Editor Display */}
            <div className="bg-white p-4 rounded-lg border-2 border-slate-300 mb-4 min-h-32">
                <div className="font-mono text-slate-800">
                    {content || <span className="text-slate-400 italic">Start typing...</span>}
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    <button
                        onClick={() => addText('Hello ')}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <Type size={16} /> Add &quot;Hello&quot;
                    </button>
                    <button
                        onClick={() => addText('World! ')}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <Type size={16} /> Add &quot;World!&quot;
                    </button>
                </div>
                <div className="space-y-2">
                    <button
                        onClick={() => deleteText(6)}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <Trash2 size={16} /> Delete 6 chars
                    </button>
                    <button
                        onClick={() => deleteText(content.length)}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <Trash2 size={16} /> Clear All
                    </button>
                </div>
            </div>

            {/* Undo/Redo */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={undo}
                    disabled={!history.canUndo()}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                >
                    <Undo2 size={20} /> Undo
                </button>
                <button
                    onClick={redo}
                    disabled={!history.canRedo()}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                >
                    <Redo2 size={20} /> Redo
                </button>
            </div>

            {/* Command Log */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-700 mb-2 text-sm">Command History:</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                    <AnimatePresence>
                        {commandLog.slice(-10).map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xs text-slate-600 font-mono"
                            >
                                {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
