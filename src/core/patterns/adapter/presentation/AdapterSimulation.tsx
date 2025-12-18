'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaymentAdapter } from '../domain/PaymentAdapter';
import { CreditCard, ArrowRight } from 'lucide-react';

export default function AdapterSimulation() {
    const [amount, setAmount] = useState(100);
    const [currency, setCurrency] = useState('USD');
    const [result, setResult] = useState('');

    const processPayment = () => {
        const adapter = new PaymentAdapter(currency);
        const message = adapter.pay(amount);
        setResult(message);
    };

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Payment System Adapter</h3>
                <p className="text-sm text-slate-600">Adapting legacy payment system to modern interface</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Input */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Amount:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Currency:</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="JPY">JPY</option>
                        </select>
                    </div>

                    <button
                        onClick={processPayment}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <CreditCard size={20} /> Process Payment
                    </button>
                </div>

                {/* Visualization */}
                <div className="bg-white p-6 rounded-lg border-2 border-slate-300">
                    <h4 className="font-semibold text-slate-700 mb-4">Adapter Flow:</h4>

                    <div className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded border border-blue-200">
                            <div className="text-xs text-blue-600 font-semibold mb-1">Modern Interface</div>
                            <div className="text-sm font-mono">pay({amount})</div>
                        </div>

                        <div className="flex justify-center">
                            <ArrowRight className="text-slate-400" size={24} />
                        </div>

                        <div className="p-3 bg-purple-50 rounded border border-purple-200">
                            <div className="text-xs text-purple-600 font-semibold mb-1">Adapter</div>
                            <div className="text-sm font-mono">PaymentAdapter</div>
                        </div>

                        <div className="flex justify-center">
                            <ArrowRight className="text-slate-400" size={24} />
                        </div>

                        <div className="p-3 bg-orange-50 rounded border border-orange-200">
                            <div className="text-xs text-orange-600 font-semibold mb-1">Legacy System</div>
                            <div className="text-sm font-mono">processPayment({amount}, &quot;{currency}&quot;)</div>
                        </div>
                    </div>

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-green-100 rounded text-sm text-green-700 font-semibold"
                        >
                            {result}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
