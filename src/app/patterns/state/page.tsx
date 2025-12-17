'use client';

import StateSimulation from '@/core/patterns/state/presentation/StateSimulation';
import StateDocs from '@/content/patterns/state.mdx';
import Header from '@/components/layout/Header';
import StatusButton from '@/components/patterns/MarkCompleteButton';

export default function StatePage() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-slate-900">
                        State Pattern
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-6">
                        Allow an object to alter its behavior when its internal state changes.
                    </p>
                    <StatusButton patternSlug="state" />
                </header>

                <section className="mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">
                            Interactive Simulation
                        </span>
                        <h2 className="text-2xl font-bold text-slate-800">Visualizing the Pattern</h2>
                    </div>
                    <div className="not-prose">
                        <StateSimulation />
                    </div>
                </section>

                <article className="max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm prose prose-slate lg:prose-lg">
                    <StateDocs />
                </article>
            </div>
        </>
    );
}
