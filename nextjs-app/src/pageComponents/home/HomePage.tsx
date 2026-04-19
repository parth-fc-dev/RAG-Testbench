"use client";

import { Header, Button, Card, Footer } from "@/components";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 md:mb-6">
            Welcome to Your Next.js Application
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-6 md:mb-8">
            A modern, full-featured Next.js application built with TypeScript,
            Tailwind CSS, and Docker containerization.
          </p>

          <Card title="Features">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left text-sm md:text-base">
              <li className="flex items-center">
                <span className="text-black dark:text-white mr-3">•</span>
                <span>Next.js 15+ with App Router</span>
              </li>
              <li className="flex items-center">
                <span className="text-black dark:text-white mr-3">•</span>
                <span>TypeScript Support</span>
              </li>
              <li className="flex items-center">
                <span className="text-black dark:text-white mr-3">•</span>
                <span>Tailwind CSS Styling</span>
              </li>
              <li className="flex items-center">
                <span className="text-black dark:text-white mr-3">•</span>
                <span>Docker Ready</span>
              </li>
              <li className="flex items-center">
                <span className="text-black dark:text-white mr-3">•</span>
                <span>Multi-page Routing</span>
              </li>
              <li className="flex items-center">
                <span className="text-black dark:text-white mr-3">•</span>
                <span>ESLint Configured</span>
              </li>
            </ul>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8">
            <Button href="/about">Learn More</Button>
            <Button href="/contact" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
