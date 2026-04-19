"use client";

import React, { useEffect, useRef } from "react";

interface MermaidDiagramProps {
  diagram: string;
}

export default function MermaidDiagram({ diagram }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
          },
        });

        if (!containerRef.current) return;

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg } = await mermaid.render(id, diagram);

        containerRef.current.innerHTML = svg;

        const svgEl = containerRef.current.querySelector("svg");
        if (svgEl) {
          svgEl.removeAttribute("width");
          svgEl.removeAttribute("height");
          svgEl.style.width = "100%";
          svgEl.style.margin = "0 auto";
          svgEl.style.height = "auto";
        }
      } catch (error) {
        console.error("Error rendering mermaid diagram:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML =
            '<div class="text-red-600 text-sm">Error rendering diagram</div>';
        }
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white p-4 rounded-lg border border-gray-200 overflow-x-auto"
    />
  );
}
