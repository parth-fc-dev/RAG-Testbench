# Setup Guide

## Installation Steps

### 1. Environment Setup

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install langchain openai pinecone-client python-dotenv
```

### 3. Configure API Keys

Create a `.env` file:

```
OPENAI_API_KEY=your_key_here
PINECONE_API_KEY=your_key_here
```

### 4. Verify Installation

Run a simple test to ensure everything works.
