# Database Connections

## Vector Databases

### Pinecone

- Fully managed vector database
- Easy to get started
- Good for production use

### Weaviate

- Open-source vector database
- GraphQL interface
- Built-in filtering

### Milvus

- Self-hosted vector database
- High performance
- Supports multiple data types

### Chroma

- Lightweight embedded database
- Good for development
- Can be deployed to production

## Connection Patterns

### Connection Pooling

- Maintain persistent connections
- Reuse connections across requests
- Improve performance

### Retry Logic

- Exponential backoff
- Circuit breakers
- Health checks

## SQL Databases

- Store metadata alongside vectors
- Maintain document references
- Track query history

### Common Integrations

- PostgreSQL with pgvector
- MySQL with vector extensions
- MongoDB with vector search

## Document Storage

- S3 for document storage
- Direct database storage
- Hybrid approaches

## Best Practices

- Connection monitoring
- Performance profiling
- Regular backups
- Disaster recovery planning
