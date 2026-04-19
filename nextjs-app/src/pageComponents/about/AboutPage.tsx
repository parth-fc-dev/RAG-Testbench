"use client";

import { Header, Button, Card, Footer } from "@/components";

export default function AboutPage() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16 overflow-y-auto">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 md:mb-8">
            About Us
          </h1>

          <Card>
            <p className="text-base md:text-lg text-gray-900 dark:text-gray-200 mb-4">
              Welcome to our Next.js application! This is a modern web
              application built with cutting-edge technologies.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-3">
              Our Mission
            </h2>
            <p className="text-gray-800 dark:text-gray-300 mb-6">
              To deliver high-quality web experiences using the latest
              frameworks and best practices in web development.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-3">
              Technologies
            </h2>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 space-y-2">
              <li>Next.js with TypeScript</li>
              <li>Tailwind CSS for styling</li>
              <li>Server-side rendering capabilities</li>
              <li>Docker containerization</li>
            </ul>
          </Card>

          <div className="mt-6 md:mt-8">
            <Button href="/">Back to Home</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
