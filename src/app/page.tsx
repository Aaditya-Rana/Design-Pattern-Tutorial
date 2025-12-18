'use client';

import Link from 'next/link';
import { patterns } from '@/core/data/patterns';
import { ArrowRight, CheckCircle2, Clock, Circle } from 'lucide-react';
import Header from '@/components/layout/Header';
import ProgressBar from '@/components/progress/ProgressBar';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';

export default function Home() {
  const { user } = useAuth();
  const { getStatus, loading: progressLoading } = useProgress();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
              Master Design Patterns
              <span className="block text-blue-500 mt-2">Visually & Interactively</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Stop reading boring tutorials. Experience software design patterns through interactive
              simulations, real-world analogies, and deep insights.
            </p>
            {user && (
              <div className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block mb-4">
                Welcome back, {user.name}! Track your progress below.
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Link
                href="/patterns/observer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center gap-2"
              >
                Start Learning <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Progress Bar Section */}
        {user && (
          <section className="container mx-auto px-4 py-8">
            <ProgressBar />
          </section>
        )}

        {/* Pattern Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Available Patterns</h2>
            <span className="text-slate-500">{patterns.length} Patterns Ready</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patterns.map((pattern) => {
              const status = user && !progressLoading ? getStatus(pattern.slug) : 'not-started';

              return (
                <Link key={pattern.id} href={`/patterns/${pattern.slug}`} className="group">
                  <article className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full flex flex-col relative">
                    {/* Status Badge */}
                    {user && (
                      <div className="absolute top-4 right-4">
                        {status === 'completed' && (
                          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                            <CheckCircle2 size={14} />
                            Completed
                          </div>
                        )}
                        {status === 'in-progress' && (
                          <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                            <Clock size={14} />
                            In Progress
                          </div>
                        )}
                        {status === 'not-started' && (
                          <div className="flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-semibold">
                            <Circle size={14} />
                            Not Started
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mb-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                    ${pattern.type === 'Behavioral'
                            ? 'bg-orange-100 text-orange-700'
                            : pattern.type === 'Structural'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                      >
                        {pattern.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {pattern.name}
                    </h3>
                    <p className="text-slate-600 mb-4 flex-1">{pattern.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-sm">
                      <span className="text-slate-500 font-medium">{pattern.difficulty}</span>
                      <div className="flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
