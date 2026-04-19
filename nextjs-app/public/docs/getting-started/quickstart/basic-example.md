# Basic Example

Here's a simple RAG example to get you started.

## Python Example

```python
from langchain.vectorstores import Pinecone
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA

# Initialize components
llm = OpenAI(temperature=0)
retriever = Pinecone.from_existing_index(...)
qa = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

# Query
answer = qa.run("Your question here")
print(answer)
```

## JavaScript Example

```javascript
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

const llm = new OpenAI({ temperature: 0 });
const vectorStore = await PineconeStore.fromExistingIndex(...);
const retriever = vectorStore.asRetriever();

const result = await retriever.getRelevantDocuments("Your question");
console.log(result);
```

This creates a simple question-answering system powered by RAG.
