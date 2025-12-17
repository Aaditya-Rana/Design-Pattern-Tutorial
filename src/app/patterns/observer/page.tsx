'use client';

import ObserverSimulation from '@/core/patterns/observer/presentation/ObserverSimulation';
import ObserverDocs from '@/content/patterns/observer.mdx';

export default function ObserverPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-slate-900">
                    Observer Pattern
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Keep your objects in the loop. The ultimate guide to Publisher-Subscriber relationships.
                </p>
            </header>

            {/* Simulation Section */}
            <section className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">Interactive Simulation</span>
                    <h2 className="text-2xl font-bold text-slate-800">Visualizing the Pattern</h2>
                </div>
                <div className="not-prose">
                    <ObserverSimulation />
                </div>
            </section>

            {/* Documentation Section */}
            <article className="max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm prose prose-slate lg:prose-lg">
                <ObserverDocs />
            </article>
        </div>
    );
}
