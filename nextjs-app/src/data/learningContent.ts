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
    id: "foundation",
    label: "Foundation & Core Concepts",
    children: [
      {
        id: "llm-fundamentals",
        label: "LLM Fundamentals",
        children: [
          { id: "llm-internals", label: "LLM Internals" },
          { id: "transformer-architecture", label: "Transformer Architecture" },
          { id: "attention-mechanism", label: "Attention Mechanism" },
          { id: "tokenization", label: "Tokenization Deep Dive" },
        ],
      },
      {
        id: "representation",
        label: "Representation & Semantics",
        children: [
          { id: "embeddings", label: "Embeddings & Vector Spaces" },
          { id: "semantic-similarity", label: "Semantic Similarity" },
          {
            id: "vector-retrieval",
            label: "Vector Representations in Retrieval",
          },
        ],
      },
      {
        id: "inference-pipeline",
        label: "Inference Pipeline",
        children: [
          { id: "inference-flow", label: "End-to-End Inference Flow" },
          { id: "lifecycle", label: "Prompt → Model → Output Lifecycle" },
          { id: "tradeoffs", label: "Latency vs Quality Trade-offs" },
        ],
      },
    ],
  },

  {
    id: "models",
    label: "Model Landscape & Adaptation",
    children: [
      {
        id: "model-ecosystem",
        label: "Model Ecosystem",
        children: [
          { id: "model-taxonomy", label: "Open vs Closed Models" },
          { id: "benchmarking", label: "Capability Benchmarking" },
          { id: "model-selection", label: "Model Selection Strategies" },
        ],
      },
      {
        id: "cost-performance",
        label: "Cost & Performance",
        children: [
          { id: "pricing", label: "Pricing Models" },
          { id: "cost-tradeoffs", label: "Cost vs Performance Trade-offs" },
          { id: "throughput-latency", label: "Throughput vs Latency" },
        ],
      },
      {
        id: "training",
        label: "Training & Adaptation",
        children: [
          { id: "pretraining", label: "Pretraining Basics" },
          { id: "finetuning", label: "Fine-tuning Strategies" },
          { id: "lora", label: "LoRA / QLoRA / PEFT" },
        ],
      },
      {
        id: "advanced-adaptation",
        label: "Advanced Adaptation",
        children: [
          { id: "rlhf", label: "RLHF & DPO" },
          { id: "distillation", label: "Knowledge Distillation" },
          { id: "synthetic-data", label: "Synthetic Data Generation" },
          { id: "quantization", label: "Quantization" },
        ],
      },
    ],
  },

  {
    id: "inference",
    label: "Inference Optimization",
    children: [
      {
        id: "core-optimization",
        label: "Core Optimization",
        children: [
          { id: "kv-cache", label: "KV Cache & Context Caching" },
          { id: "batching", label: "Batching Strategies" },
          { id: "speculative-decoding", label: "Speculative Decoding" },
        ],
      },
      {
        id: "memory-efficiency",
        label: "Memory & Efficiency",
        children: [
          { id: "paged-attention", label: "Paged Attention" },
          { id: "token-efficiency", label: "Token Efficiency Techniques" },
        ],
      },
      {
        id: "infra",
        label: "Infrastructure",
        children: [
          { id: "model-serving", label: "Model Serving Systems" },
          { id: "scaling", label: "Scaling Inference Systems" },
        ],
      },
      {
        id: "cost-opt",
        label: "Cost Optimization",
        children: [
          { id: "cost-playbook", label: "Cost Optimization Playbook" },
          { id: "deployment-tradeoffs", label: "Deployment Trade-offs" },
        ],
      },
    ],
  },

  {
    id: "prompting",
    label: "Prompting & Context Engineering",
    children: [
      {
        id: "prompt-basics",
        label: "Prompting Basics",
        children: [
          {
            id: "prompt-engineering",
            label: "Prompt Engineering Fundamentals",
          },
          { id: "few-shot", label: "Few-shot & In-context Learning" },
        ],
      },
      {
        id: "reasoning",
        label: "Reasoning Techniques",
        children: [
          { id: "cot", label: "Chain-of-Thought" },
          { id: "tot", label: "Tree-of-Thought" },
        ],
      },
      {
        id: "advanced-prompting",
        label: "Advanced Prompting",
        children: [
          { id: "structured-output", label: "Structured Generation" },
          { id: "context-engineering", label: "Context Engineering" },
          { id: "dspy", label: "Prompt Optimization (DSPy)" },
        ],
      },
      {
        id: "prompt-security",
        label: "Prompt Security",
        children: [
          { id: "prompt-injection", label: "Prompt Injection Attacks" },
          { id: "defenses", label: "Defense Strategies" },
        ],
      },
    ],
  },

  {
    id: "rag",
    label: "Retrieval Systems (RAG)",
    children: [
      {
        id: "rag-basics",
        label: "RAG Fundamentals",
        children: [
          { id: "what-is-rag", label: "What is RAG" },
          { id: "rag-architecture", label: "Retrieval Pipeline Architecture" },
        ],
      },
      {
        id: "data-prep",
        label: "Data Preparation",
        children: [
          { id: "chunking", label: "Chunking Strategies" },
          { id: "preprocessing", label: "Document Preprocessing" },
        ],
      },
      {
        id: "embeddings-storage",
        label: "Embeddings & Storage",
        children: [
          { id: "embedding-models", label: "Embedding Models" },
          { id: "vector-db", label: "Vector Databases" },
          { id: "db-comparison", label: "Database Comparisons" },
        ],
      },
      {
        id: "retrieval",
        label: "Retrieval Techniques",
        children: [
          { id: "dense", label: "Dense Retrieval" },
          { id: "hybrid", label: "Hybrid Search" },
          { id: "graph-rag", label: "Graph RAG" },
        ],
      },
      {
        id: "ranking",
        label: "Ranking & Relevance",
        children: [
          { id: "reranking", label: "Reranking Basics" },
          { id: "advanced-reranking", label: "Advanced Reranking" },
        ],
      },
      {
        id: "advanced-rag",
        label: "Advanced RAG",
        children: [
          { id: "agentic-rag", label: "Agentic RAG" },
          { id: "multi-step", label: "Multi-step Retrieval" },
          { id: "orchestration", label: "Retrieval Orchestration" },
        ],
      },
    ],
  },
];
