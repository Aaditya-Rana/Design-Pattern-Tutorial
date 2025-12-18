'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PizzaBuilder, Pizza } from '../domain/PizzaBuilder';
import { Pizza as PizzaIcon, Plus, Trash2 } from 'lucide-react';

export default function BuilderSimulation() {
    const [builder] = useState(() => new PizzaBuilder());
    const [pizza, setPizza] = useState<Pizza | null>(null);
    const [size, setSize] = useState<'small' | 'medium' | 'large' | null>(null);
    const [crust, setCrust] = useState<'thin' | 'thick' | 'stuffed' | null>(null);
    const [toppings, setToppings] = useState<string[]>([]);
    const [hasCheese, setHasCheese] = useState(false);

    const buildPizza = () => {
        try {
            builder.reset();
            if (size) builder.setSize(size);
            if (crust) builder.setCrust(crust);
            toppings.forEach((t) => builder.addTopping(t));
            if (hasCheese) builder.addCheese();

            const result = builder.build();
            setPizza(result);
        } catch {
            alert('Please select size and crust!');
        }
    };

    const addTopping = (topping: string) => {
        setToppings([...toppings, topping]);
    };

    const reset = () => {
        setSize(null);
        setCrust(null);
        setToppings([]);
        setHasCheese(false);
        setPizza(null);
    };

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Build Your Pizza</h3>
                <p className="text-sm text-slate-600">Step-by-step construction with fluent interface</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Builder Controls */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Size:</label>
                        <div className="flex gap-2">
                            {(['small', 'medium', 'large'] as const).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={`flex-1 px-3 py-2 rounded font-medium transition-all ${size === s
                                        ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Crust:</label>
                        <div className="flex gap-2">
                            {(['thin', 'thick', 'stuffed'] as const).map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCrust(c)}
                                    className={`flex-1 px-3 py-2 rounded font-medium transition-all ${crust === c
                                        ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Toppings:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Pepperoni', 'Mushrooms', 'Olives', 'Onions'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => addTopping(t)}
                                    className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded font-medium transition-colors text-sm"
                                >
                                    <Plus size={14} /> {t}
                                </button>
                            ))}
                        </div>
                        {toppings.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                                {toppings.map((t, i) => (
                                    <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={hasCheese}
                                onChange={(e) => setHasCheese(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm font-semibold text-slate-700">Extra Cheese (+$1)</span>
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={buildPizza}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                        >
                            <PizzaIcon size={20} /> Build Pizza
                        </button>
                        <button
                            onClick={reset}
                            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Pizza Preview */}
                <div className="bg-white p-6 rounded-lg border-2 border-slate-300">
                    <h4 className="font-semibold text-slate-700 mb-4">Your Pizza:</h4>
                    {pizza ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-2"
                        >
                            <div className="text-sm">
                                <strong>Size:</strong> {pizza.size}
                            </div>
                            <div className="text-sm">
                                <strong>Crust:</strong> {pizza.crust}
                            </div>
                            <div className="text-sm">
                                <strong>Toppings:</strong> {pizza.toppings.join(', ') || 'None'}
                            </div>
                            <div className="text-sm">
                                <strong>Extra Cheese:</strong> {pizza.cheese ? 'Yes' : 'No'}
                            </div>
                            <div className="mt-4 p-3 bg-green-100 rounded">
                                <div className="text-lg font-bold text-green-700">
                                    Total: ${pizza.price}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <p className="text-slate-400 italic">Configure your pizza and click Build</p>
                    )}
                </div>
            </div>
        </div>
    );
}
