import { SidebarItem } from "@/components/Sidebar";

// Helper function to find the path chain for a given ID by traversing the tree
function getPathChainForId(
  id: string,
  items: SidebarItem[] = learningMenuItems,
): string[] {
  for (const item of items) {
    if (item.id === id) {
      return [item.id];
    }
    if (item.children) {
      const childPath = getPathChainForId(id, item.children);
      if (childPath.length > 0) {
        return [item.id, ...childPath];
      }
    }
  }
  return [];
}

// Generate doc path automatically based on nesting
export function getDocPathForId(id: string): string {
  const pathChain = getPathChainForId(id);
  if (pathChain.length === 0) return `/docs/${id}.md`;
  return `/docs/${pathChain.join("/")}.md`;
}

export const learningMenuItems: SidebarItem[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    children: [
      {
        id: "intro",
        label: "Introduction",
        children: [
          { id: "what-is-rag", label: "What is RAG?" },
          { id: "why-rag", label: "Why Use RAG?" },
          { id: "use-cases", label: "Use Cases" },
        ],
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        children: [
          { id: "tech-stack", label: "Technology Stack" },
          { id: "setup", label: "Setup Guide" },
          { id: "requirements", label: "System Requirements" },
        ],
      },
      {
        id: "quickstart",
        label: "Quick Start",
        children: [
          { id: "first-steps", label: "First Steps" },
          { id: "basic-example", label: "Basic Example" },
          { id: "common-errors", label: "Common Errors" },
        ],
      },
    ],
  },
  {
    id: "core-concepts",
    label: "Core Concepts",
    children: [
      {
        id: "retrieval",
        label: "Retrieval",
        children: [
          { id: "embeddings", label: "Embeddings" },
          { id: "vector-search", label: "Vector Search" },
          { id: "ranking", label: "Ranking Algorithms" },
        ],
      },
      {
        id: "generation",
        label: "Generation",
        children: [
          { id: "llm-basics", label: "LLM Basics" },
          { id: "prompt-engineering", label: "Prompt Engineering" },
          { id: "context-injection", label: "Context Injection" },
        ],
      },
      {
        id: "architecture",
        label: "Architecture",
        children: [
          { id: "system-design", label: "System Design" },
          { id: "data-pipeline", label: "Data Pipeline" },
          { id: "evaluation", label: "Evaluation Metrics" },
        ],
      },
    ],
  },
  {
    id: "advanced",
    label: "Advanced Topics",
    children: [
      {
        id: "optimization",
        label: "Optimization",
        children: [
          { id: "performance", label: "Performance Tuning" },
          { id: "cost-reduction", label: "Cost Reduction" },
          { id: "scaling", label: "Scaling Strategies" },
        ],
      },
      {
        id: "integration",
        label: "Integration",
        children: [
          { id: "apis", label: "API Integration" },
          { id: "databases", label: "Database Connections" },
          { id: "monitoring", label: "Monitoring & Logging" },
        ],
      },
      {
        id: "troubleshooting",
        label: "Troubleshooting",
        children: [
          { id: "debugging", label: "Debugging Guide" },
          { id: "best-practices", label: "Best Practices" },
          { id: "faq", label: "FAQ" },
        ],
      },
    ],
  },
];
