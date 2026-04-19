"use client";

import React, { useEffect, useState } from "react";

interface MarkdownRendererProps {
  filePath: string;
}

export default function MarkdownRenderer({ filePath }: MarkdownRendererProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load: ${filePath}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load markdown",
        );
        setContent("");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [filePath]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return <MarkdownContent markdown={content} />;
}

function MarkdownContent({ markdown }: { markdown: string }) {
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let codeBlock = false;
    let codeContent = "";
    let codeLanguage = "";

    lines.forEach((line, index) => {
      // Code block handling
      if (line.startsWith("```")) {
        if (!codeBlock) {
          codeBlock = true;
          codeLanguage = line.slice(3) || "bash";
          codeContent = "";
        } else {
          codeBlock = false;
          elements.push(
            <pre
              key={`code-${index}`}
              className="bg-gray-100 text-gray-900 p-4 rounded-lg overflow-x-auto my-4 border border-gray-300"
            >
              <code className={`language-${codeLanguage}`}>{codeContent}</code>
            </pre>,
          );
        }
        return;
      }

      if (codeBlock) {
        codeContent += line + "\n";
        return;
      }

      // Skip empty lines
      if (!line.trim()) {
        elements.push(<div key={`empty-${index}`} className="h-2" />);
        return;
      }

      // H1 heading
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={`h1-${index}`}
            className="text-3xl font-bold text-black mt-6 mb-4"
          >
            {line.slice(2)}
          </h1>,
        );
        return;
      }

      // H2 heading
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-2xl font-bold text-black mt-5 mb-3"
          >
            {line.slice(3)}
          </h2>,
        );
        return;
      }

      // H3 heading
      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-xl font-semibold text-black mt-4 mb-2"
          >
            {line.slice(4)}
          </h3>,
        );
        return;
      }

      // H4 heading
      if (line.startsWith("#### ")) {
        elements.push(
          <h4
            key={`h4-${index}`}
            className="text-lg font-semibold text-black mt-3 mb-2"
          >
            {line.slice(5)}
          </h4>,
        );
        return;
      }

      // Bullet points
      if (line.startsWith("- ")) {
        elements.push(
          <li key={`li-${index}`} className="ml-6 text-gray-700 list-disc mb-1">
            {line.slice(2)}
          </li>,
        );
        return;
      }

      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        const match = line.match(/^\d+\.\s(.*)$/);
        if (match) {
          elements.push(
            <li
              key={`ol-${index}`}
              className="ml-6 text-gray-700 list-decimal mb-1"
            >
              {match[1]}
            </li>,
          );
          return;
        }
      }

      // Regular paragraph
      elements.push(
        <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-3">
          {line}
        </p>,
      );
    });

    return elements;
  };

  return (
    <article className="prose max-w-none">
      <div className="text-gray-900">{renderContent(markdown)}</div>
    </article>
  );
}
