# Evaluation Metrics

## Overview

Evaluating RAG systems requires measuring both retrieval and generation quality.

## Retrieval Metrics

### Precision@K

- Percentage of top-k results that are relevant
- Formula: (# relevant in top-k) / k

### Recall@K

- Percentage of all relevant documents in top-k results
- Formula: (# relevant in top-k) / (# total relevant)

### MRR (Mean Reciprocal Rank)

- Average position of first relevant result
- Useful for ranking evaluation

### NDCG (Normalized Discounted Cumulative Gain)

- Considers ranking order and relevance scores
- Values relevant items higher when ranked first

## Generation Metrics

### BLEU Score

- Compares generated text with reference text
- Measures n-gram overlap

### ROUGE Score

- Recall-oriented metric
- Good for summarization evaluation

### BERTScore

- Semantic similarity using BERT embeddings
- More robust than n-gram metrics

### Faithfulness

- Checks if generation is grounded in retrieved context
- Prevents hallucinations

## Human Evaluation

- Manual relevance assessment
- User satisfaction surveys
- A/B testing with users
- Qualitative feedback analysis

## Best Practices

- Use multiple metrics
- Establish baselines
- Regular evaluation cycles
- Track metric trends
