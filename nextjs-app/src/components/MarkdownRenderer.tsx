"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MermaidDiagram = dynamic(() => import("./MermaidDiagram"), {
  ssr: false,
  loading: () => (
    <div className="text-gray-400 text-sm italic py-2">Loading diagram...</div>
  ),
});

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
        if (!response.ok) throw new Error(`Failed to load: ${filePath}`);
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
      <div className="flex items-center justify-center py-16">
        <div className="text-gray-400 text-sm tracking-wide">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  return <MarkdownContent markdown={content} />;
}

const prose = {
  p: "text-[17px] leading-[1.78] text-[#374151] mb-5 font-normal tracking-[-0.01em]",
  h1: "text-[2.15rem] font-bold text-[#0f172a] mt-10 mb-4 leading-[1.2] tracking-[-0.03em]",
  h2: "text-[1.55rem] font-bold text-[#0f172a] mt-10 mb-3 leading-[1.25] tracking-[-0.025em] border-b border-gray-200 pb-2",
  h3: "text-[1.2rem] font-semibold text-[#1e293b] mt-8 mb-2 leading-[1.3] tracking-[-0.015em]",
  h4: "text-[1.05rem] font-semibold text-[#1e293b] mt-6 mb-2 leading-[1.35] tracking-[-0.01em]",
  h5: "text-[0.95rem] font-semibold text-[#334155] mt-5 mb-1 leading-[1.4]",
  h6: "text-[0.875rem] font-semibold text-[#475569] mt-4 mb-1 leading-[1.4] uppercase tracking-[0.04em]",
  li: "text-[17px] leading-[1.78] text-[#374151] mb-[6px] tracking-[-0.01em]",
  code: "bg-[#f1f5f9] text-[#be123c] px-[5px] py-[2px] rounded-[4px] text-[0.84em] font-mono font-medium",
  hr: "my-8 border-t border-gray-200",
};

const calloutConfig: Record<
  string,
  {
    bg: string;
    border: string;
    iconBg: string;
    icon: string;
    label: string;
    labelColor: string;
    textColor: string;
  }
> = {
  info: {
    bg: "bg-[#eff6ff]",
    border: "border border-[#bfdbfe]",
    iconBg: "bg-[#dbeafe]",
    icon: "i",
    label: "Info",
    labelColor: "text-[#1d4ed8]",
    textColor: "text-[#1e3a5f]",
  },
  tip: {
    bg: "bg-[#f0fdf4]",
    border: "border border-[#bbf7d0]",
    iconBg: "bg-[#dcfce7]",
    icon: "!",
    label: "Tip",
    labelColor: "text-[#15803d]",
    textColor: "text-[#14532d]",
  },
  warning: {
    bg: "bg-[#fffbeb]",
    border: "border border-[#fde68a]",
    iconBg: "bg-[#fef3c7]",
    icon: "!",
    label: "Warning",
    labelColor: "text-[#b45309]",
    textColor: "text-[#78350f]",
  },
  danger: {
    bg: "bg-[#fff1f2]",
    border: "border border-[#fecdd3]",
    iconBg: "bg-[#ffe4e6]",
    icon: "x",
    label: "Danger",
    labelColor: "text-[#be123c]",
    textColor: "text-[#881337]",
  },
  deepdive: {
    bg: "bg-[#faf5ff]",
    border: "border border-[#e9d5ff]",
    iconBg: "bg-[#f3e8ff]",
    icon: "?",
    label: "Deep Dive",
    labelColor: "text-[#7e22ce]",
    textColor: "text-[#4c1d95]",
  },
};

function MarkdownContent({ markdown }: { markdown: string }) {
  const renderInlineElements = (text: string): React.ReactNode => {
    const replacements: Array<{
      start: number;
      end: number;
      node: React.ReactNode;
    }> = [];
    const content = text;

    content.replace(/\*\*(.*?)\*\*/g, (match, captured, offset) => {
      replacements.push({
        start: offset,
        end: offset + match.length,
        node: (
          <strong className="font-semibold text-[#0f172a]">{captured}</strong>
        ),
      });
      return match;
    });

    content.replace(
      /(?<!\*)\*((?!\*).+?)(?<!\*)\*/g,
      (match, captured, offset) => {
        if (!replacements.some((r) => offset >= r.start && offset < r.end)) {
          replacements.push({
            start: offset,
            end: offset + match.length,
            node: <em className="italic text-[#374151]">{captured}</em>,
          });
        }
        return match;
      },
    );

    content.replace(/`(.*?)`/g, (match, captured, offset) => {
      if (!replacements.some((r) => offset >= r.start && offset < r.end)) {
        replacements.push({
          start: offset,
          end: offset + match.length,
          node: <code className={prose.code}>{captured}</code>,
        });
      }
      return match;
    });

    content.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (match, linkText, url, offset) => {
        if (!replacements.some((r) => offset >= r.start && offset < r.end)) {
          replacements.push({
            start: offset,
            end: offset + match.length,
            node: (
              <a
                href={url}
                className="text-[#2563eb] underline underline-offset-2 decoration-[#93c5fd] hover:decoration-[#2563eb] transition-colors duration-150"
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkText}
              </a>
            ),
          });
        }
        return match;
      },
    );

    replacements.sort((a, b) => a.start - b.start);
    const parts: React.ReactNode[] = [];
    let lastEnd = 0;
    replacements.forEach((r, idx) => {
      if (lastEnd < r.start) parts.push(content.slice(lastEnd, r.start));
      parts.push(
        <React.Fragment key={`inline-${idx}`}>{r.node}</React.Fragment>,
      );
      lastEnd = r.end;
    });
    if (lastEnd < content.length) parts.push(content.slice(lastEnd));
    return parts.length > 0 ? parts : text;
  };

  const renderCallout = (
    type: string,
    content: string,
    renderInline: (t: string) => React.ReactNode,
  ) => {
    const cfg = calloutConfig[type] ?? calloutConfig.info;
    return (
      <div
        className={`${cfg.bg} ${cfg.border} rounded-lg px-4 py-3.5 my-5 flex gap-3`}
      >
        <div
          className={`${cfg.iconBg} rounded-md h-7 w-7 flex items-center justify-center flex-shrink-0 mt-0.5 text-base`}
        >
          {cfg.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-[12px] font-semibold uppercase tracking-[0.07em] mb-1 ${cfg.labelColor}`}
          >
            {cfg.label}
          </div>
          <div className={`text-[15px] leading-[1.65] ${cfg.textColor}`}>
            {renderInline(content)}
          </div>
        </div>
      </div>
    );
  };

  const renderTable = (tableStr: string) => {
    const rows = tableStr
      .split("\n")
      .filter((r) => r.trim())
      .map((r) =>
        r
          .split("|")
          .map((c) => c.trim())
          .filter((c) => c),
      );
    if (rows.length < 2) return null;
    const headers = rows[0];
    const body = rows.slice(2);
    return (
      <div className="overflow-x-auto my-6 rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full border-collapse text-[15px]">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-gray-200">
              {headers.map((header, idx) => (
                <th
                  key={`th-${idx}`}
                  className="px-4 py-3 text-left text-[11.5px] font-semibold text-[#64748b] uppercase tracking-[0.07em] whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {body.map((row, rowIdx) => (
              <tr
                key={`tr-${rowIdx}`}
                className="hover:bg-[#f8fafc] transition-colors duration-100"
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={`td-${rowIdx}-${cellIdx}`}
                    className="px-4 py-3 text-[#374151] leading-[1.6] align-top"
                  >
                    {renderInlineElements(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = (text: string): React.ReactNode[] => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Mermaid
      if (line.trim().startsWith("```mermaid")) {
        let diagramContent = "";
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          diagramContent += lines[i] + "\n";
          i++;
        }
        if (diagramContent.trim()) {
          elements.push(
            <div
              key={`mermaid-${i}`}
              className="my-7 w-full rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              <MermaidDiagram diagram={diagramContent} />
            </div>,
          );
        }
        i++;
        continue;
      }

      // Code block
      if (line.startsWith("```")) {
        const codeLanguage = line.slice(3).trim() || "bash";
        let codeContent = "";
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeContent += lines[i] + "\n";
          i++;
        }
        if (codeContent.trim()) {
          elements.push(
            <div
              key={`code-${i}`}
              className="my-5 rounded-xl overflow-hidden border border-[#1e293b] shadow-md"
            >
              <div className="flex items-center justify-between bg-[#0f172a] border-b border-[#1e293b] px-4 py-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] font-mono text-[#64748b] uppercase tracking-[0.08em]">
                  {codeLanguage}
                </span>
              </div>
              <pre className="bg-[#0f172a] text-[#e2e8f0] px-5 py-4 overflow-x-auto m-0">
                <code
                  className={`language-${codeLanguage} text-[13.5px] font-mono leading-[1.65] tracking-[0.01em]`}
                >
                  {codeContent}
                </code>
              </pre>
            </div>,
          );
        }
        i++;
        continue;
      }

      // YouTube / iframe embed
      if (line.trim().startsWith("<iframe")) {
        let iframeStr = line.trim();
        i++;
        while (
          i < lines.length &&
          !iframeStr.includes("</iframe>") &&
          !iframeStr.endsWith("/>")
        ) {
          iframeStr += " " + lines[i].trim();
          i++;
        }
        elements.push(
          <div
            key={`iframe-${i}`}
            className="my-7 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm"
            style={{ aspectRatio: "16/9" }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              dangerouslySetInnerHTML={{
                __html: iframeStr.replace(
                  "<iframe",
                  '<iframe style="width:100%;height:100%;border:none;display:block;"',
                ),
              }}
            />
          </div>,
        );
        i++;
        continue;
      }

      // Collapsible details
      if (line.trim().startsWith("<details>")) {
        let detailsContent = "";
        let summary = "";
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("</details>")) {
          const dl = lines[i];
          if (dl.trim().startsWith("<summary>")) {
            summary = dl.replace(/<\/?summary>/g, "").trim();
          } else {
            detailsContent += dl + "\n";
          }
          i++;
        }
        elements.push(
          <details
            key={`details-${i}`}
            className="my-5 rounded-xl border border-gray-200 bg-[#f8fafc] overflow-hidden group"
          >
            <summary className="flex items-center gap-2.5 px-4 py-3.5 cursor-pointer font-semibold text-[15px] text-[#1e293b] hover:bg-gray-100 transition-colors duration-150 select-none list-none">
              <span className="text-[10px] text-gray-400 group-open:rotate-90 transition-transform duration-200 inline-block">
                &#9658;
              </span>
              {summary}
            </summary>
            <div className="px-5 py-4 border-t border-gray-200 text-[#374151]">
              {renderContent(detailsContent)}
            </div>
          </details>,
        );
        i++;
        continue;
      }

      // Blockquote / callout
      if (line.startsWith("> ")) {
        let blockquoteContent = line.slice(2).trim();
        i++;
        let calloutType = "info";
        if (blockquoteContent.includes("[!TIP]")) calloutType = "tip";
        else if (blockquoteContent.includes("[!WARNING]"))
          calloutType = "warning";
        else if (blockquoteContent.includes("[!DANGER]"))
          calloutType = "danger";
        else if (blockquoteContent.includes("[!DEEPDIVE]"))
          calloutType = "deepdive";
        blockquoteContent = blockquoteContent
          .replace(/\[!(INFO|TIP|WARNING|DANGER|DEEPDIVE)\]/g, "")
          .trim();
        while (i < lines.length && lines[i].startsWith("> ")) {
          blockquoteContent += " " + lines[i].slice(2).trim();
          i++;
        }
        elements.push(
          <div key={`callout-${i}`}>
            {renderCallout(
              calloutType,
              blockquoteContent,
              renderInlineElements,
            )}
          </div>,
        );
        continue;
      }

      // Table
      if (
        line.includes("|") &&
        i + 1 < lines.length &&
        lines[i + 1].includes("|") &&
        lines[i + 1].includes("-")
      ) {
        let tableStr = line;
        i++;
        while (i < lines.length && lines[i].includes("|")) {
          tableStr += "\n" + lines[i];
          i++;
        }
        elements.push(<div key={`table-${i}`}>{renderTable(tableStr)}</div>);
        continue;
      }

      // Horizontal rule
      if (
        line.trim() === "---" ||
        line.trim() === "***" ||
        line.trim() === "___"
      ) {
        elements.push(<hr key={`hr-${i}`} className={prose.hr} />);
        i++;
        continue;
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={`h1-${i}`} className={prose.h1}>
            {renderInlineElements(line.slice(2))}
          </h1>,
        );
        i++;
        continue;
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={`h2-${i}`} className={prose.h2}>
            {renderInlineElements(line.slice(3))}
          </h2>,
        );
        i++;
        continue;
      }
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${i}`} className={prose.h3}>
            {renderInlineElements(line.slice(4))}
          </h3>,
        );
        i++;
        continue;
      }
      if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={`h4-${i}`} className={prose.h4}>
            {renderInlineElements(line.slice(5))}
          </h4>,
        );
        i++;
        continue;
      }
      if (line.startsWith("##### ")) {
        elements.push(
          <h5 key={`h5-${i}`} className={prose.h5}>
            {renderInlineElements(line.slice(6))}
          </h5>,
        );
        i++;
        continue;
      }
      if (line.startsWith("###### ")) {
        elements.push(
          <h6 key={`h6-${i}`} className={prose.h6}>
            {renderInlineElements(line.slice(7))}
          </h6>,
        );
        i++;
        continue;
      }

      // Bullet list
      if (line.startsWith("- ")) {
        elements.push(
          <li
            key={`li-${i}`}
            className={`${prose.li} list-none flex gap-2.5 items-baseline`}
          >
            <span className="text-[#94a3b8] text-[9px] flex-shrink-0 mt-[5px]">
              &#9679;
            </span>
            <span>{renderInlineElements(line.slice(2))}</span>
          </li>,
        );
        i++;
        continue;
      }

      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        const match = line.match(/^(\d+)\.\s(.*)$/);
        if (match) {
          elements.push(
            <li
              key={`ol-${i}`}
              className={`${prose.li} list-none flex gap-2.5 items-baseline`}
            >
              <span className="text-[#94a3b8] text-[13px] font-mono w-5 flex-shrink-0 text-right">
                {match[1]}.
              </span>
              <span>{renderInlineElements(match[2])}</span>
            </li>,
          );
          i++;
          continue;
        }
      }

      // Empty line
      if (!line.trim()) {
        elements.push(<div key={`empty-${i}`} className="h-1" />);
        i++;
        continue;
      }

      // Paragraph
      elements.push(
        <p key={`p-${i}`} className={prose.p}>
          {renderInlineElements(line)}
        </p>,
      );
      i++;
    }

    return elements;
  };

  return (
    <article
      style={{
        fontFamily: "'Inter', 'system-ui', sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
      className="max-w-6xl mx-auto px-1"
    >
      <div className="space-y-0">{renderContent(markdown)}</div>
    </article>
  );
}
