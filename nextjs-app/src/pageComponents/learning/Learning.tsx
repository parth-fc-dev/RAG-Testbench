"use client";

import { useState } from "react";
import { Header, Sidebar, MarkdownRenderer, Footer } from "@/components";
import { learningMenuItems, getDocPathForId } from "@/data/learningContent";

export default function LearningPage() {
  const [activeId, setActiveId] = useState("what-is-rag");

  const handleItemClick = (id: string) => {
    setActiveId(id);
    // Scroll to top of content
    const contentSection = document.getElementById("content-section");
    if (contentSection) {
      contentSection.scrollTop = 0;
    }
  };

  const docPath = getDocPathForId(activeId);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          items={learningMenuItems}
          activeId={activeId}
          onItemClick={handleItemClick}
        />

        {/* Main Content Area */}
        <main id="content-section" className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-8xl mx-6 px-6 py-8 md:py-12">
            <MarkdownRenderer filePath={docPath} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
