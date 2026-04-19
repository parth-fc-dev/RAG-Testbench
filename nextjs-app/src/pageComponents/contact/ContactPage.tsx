"use client";

import { FormEvent, useState } from "react";
import { Header, Button, Card, Footer } from "@/components";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16 overflow-y-auto">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 md:mb-8">
            Contact Us
          </h1>

          <Card>
            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-3 md:px-4 py-2 md:py-3 mb-6">
                ✓ Thank you! Your message has been received.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white text-sm md:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white text-sm md:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white text-sm md:text-base"
                  placeholder="Your message here..."
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
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
