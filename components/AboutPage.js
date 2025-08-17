'use client'
export default function AboutPage() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <main className="flex-grow max-w-5xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                    About <span className="text-indigo-600">PathMantra</span>
                </h1>

                <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
                    PathMantra is your trusted AI-powered career companion, designed to help students,
                    professionals, and lifelong learners discover the right career paths, build skills,
                    and make confident decisions for the future.
                </p>

                <section className="space-y-10">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3"> Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our mission is simple: to bridge the gap between aspirations and opportunities.
                            We empower individuals with personalized roadmaps, skill-building resources,
                            and career recommendations that align with their strengths, passions, and goals.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">🚀 What We Do</h2>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                            <li>Offer <strong>AI-driven career recommendations</strong> tailored to your interests and skills.</li>
                            <li>Provide <strong>interactive roadmaps</strong> for achieving your career goals step by step.</li>
                            <li>Help you <strong>track progress</strong> and stay motivated with personalized insights.</li>
                            <li>Connect you with the <strong>latest industry trends</strong> and future-ready skills.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Why PathMantra?</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Unlike traditional career counseling, PathMantra uses advanced AI and real-world
                            data to offer insights that evolve with you. Whether you are a student exploring
                            options, a graduate entering the workforce, or a professional seeking growth,
                            PathMantra adapts to your journey.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    )
}