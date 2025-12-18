'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SimpleCoffee, MilkDecorator, SugarDecorator, WhipDecorator, Coffee } from '../domain/CoffeeDecorator';
import { Coffee as CoffeeIcon, Plus } from 'lucide-react';

export default function DecoratorSimulation() {
    const [coffee, setCoffee] = useState<Coffee>(new SimpleCoffee());
    const [decorators, setDecorators] = useState<string[]>([]);

    const addMilk = () => {
        setCoffee(new MilkDecorator(coffee));
        setDecorators([...decorators, 'Milk']);
    };

    const addSugar = () => {
        setCoffee(new SugarDecorator(coffee));
        setDecorators([...decorators, 'Sugar']);
    };

    const addWhip = () => {
        setCoffee(new WhipDecorator(coffee));
        setDecorators([...decorators, 'Whipped Cream']);
    };

    const reset = () => {
        setCoffee(new SimpleCoffee());
        setDecorators([]);
    };

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Coffee Decorator</h3>
                <p className="text-sm text-slate-600">Dynamically add features to your coffee</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Controls */}
                <div className="space-y-3">
                    <button
                        onClick={addMilk}
                        className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <Plus size={20} /> Add Milk (+$2)
                    </button>
                    <button
                        onClick={addSugar}
                        className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <Plus size={20} /> Add Sugar (+$1)
                    </button>
                    <button
                        onClick={addWhip}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <Plus size={20} /> Add Whipped Cream (+$3)
                    </button>
                    <button
                        onClick={reset}
                        className="w-full bg-slate-600 hover:bg-slate-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Reset
                    </button>
                </div>

                {/* Coffee Display */}
                <div className="bg-white p-6 rounded-lg border-2 border-slate-300">
                    <div className="flex items-center justify-center mb-4">
                        <CoffeeIcon size={48} className="text-amber-700" />
                    </div>

                    <motion.div
                        key={decorators.length}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-3"
                    >
                        <div className="text-center">
                            <h4 className="font-semibold text-slate-700 mb-2">Your Coffee:</h4>
                            <p className="text-sm text-slate-600">{coffee.description()}</p>
                        </div>

                        {decorators.length > 0 && (
                            <div className="space-y-1">
                                <div className="text-xs font-semibold text-slate-500">Decorators Applied:</div>
                                {decorators.map((dec, i) => (
                                    <div key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                        {i + 1}. {dec}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="pt-3 border-t border-slate-200">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-slate-700">Total Cost:</span>
                                <span className="text-2xl font-bold text-green-600">${coffee.cost()}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
