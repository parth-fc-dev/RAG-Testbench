"use client";

import { Header, Button, Card, Footer } from "@/components";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6">
            Welcome to RAG Testbench
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8">
            Test out query processing, chunking, and vectorization.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8">
            <Button href="/learning">Start Learning</Button>
            <Button href="/testbench" variant="secondary">
              Test it out!
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
