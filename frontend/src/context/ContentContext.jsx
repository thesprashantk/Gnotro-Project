import React, { createContext, useContext, useEffect, useState } from 'react';

const ContentContext = createContext();
export const useContent = () => useContext(ContentContext);

const DISCUSSIONS_KEY = 'gnotro_discussions';
const ARTICLES_KEY = 'gnotro_articles';

const defaultDiscussions = [
  {
    _id: 'd1',
    author: { username: 'alice_dev', profilePicture: '' },
    title: 'What is the best way to manage global state in large React applications?',
    content: 'I have been working on a large-scale React app and finding it increasingly hard to manage state with just Context and useState. Should I be using Redux, Zustand, or Jotai? Looking for real-world recommendations from engineers who have scaled.',
    likes: [1, 2],
    reposts: [],
    comments: [],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    _id: 'd2',
    author: { username: 'priya_ml', profilePicture: '' },
    title: 'How do transformer models handle long-context documents efficiently?',
    content: 'Most transformer architectures have a fixed context window due to quadratic attention complexity. Techniques like sliding window attention, sparse attention, and flash attention help. But how do models like Gemini handle million-token contexts practically?',
    likes: [1],
    reposts: [],
    comments: [],
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    _id: 'd3',
    author: { username: 'kiran_web', profilePicture: '' },
    title: 'Is WebAssembly ready to replace JavaScript for performance-critical browser tasks?',
    content: 'WebAssembly has matured a lot but JavaScript engines have gotten incredibly fast too. For which categories of tasks does WASM offer a truly significant advantage in the browser today? Would love specific benchmarks and use cases.',
    likes: [1, 2, 3, 4],
    reposts: [1],
    comments: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const defaultArticles = [
  {
    _id: 'a1',
    author: { username: 'techwriter_bob', fullName: 'Bob Thompson', profilePicture: '' },
    title: 'A Deep Dive into the New CSS Container Queries',
    content: 'Container Queries are finally here and they completely change how we write responsive components. Unlike media queries that look at the viewport, container queries let components respond to their own available space. Here is how to use them in production today with real examples.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    likes: [1, 2, 3],
    reposts: [1],
    comments: [],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    _id: 'a2',
    author: { username: 'sara_writes', fullName: 'Sara Chen', profilePicture: '' },
    title: 'Understanding Retrieval-Augmented Generation: A Complete Practical Guide',
    content: 'RAG is the most impactful pattern to emerge from the LLM era for real-world applications. Instead of fine-tuning a model on your data, you retrieve relevant chunks at inference time and inject them into the prompt context. This guide walks through every component from chunking to reranking.',
    coverImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    likes: [1, 2, 3, 4, 5],
    reposts: [1, 2],
    comments: [],
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    _id: 'a3',
    author: { username: 'devops_rajan', fullName: 'Rajan Patel', profilePicture: '' },
    title: 'From Zero to Production: Deploying a Node.js App on Kubernetes',
    content: 'Kubernetes can feel overwhelming at first but once you understand the core primitives - Pods, Deployments, Services, and Ingress - everything clicks. This step-by-step article takes a simple Express API and deploys it to a production-grade Kubernetes cluster with health checks and autoscaling.',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
    likes: [1, 2],
    reposts: [],
    comments: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const parseStoredItems = (items) => items.map(item => ({
  ...item,
  createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
}));

const ContentProvider = ({ children }) => {
  const [discussions, setDiscussions] = useState(() => {
    try {
      const stored = localStorage.getItem(DISCUSSIONS_KEY);
      return stored ? parseStoredItems(JSON.parse(stored)) : parseStoredItems(defaultDiscussions);
    } catch {
      return parseStoredItems(defaultDiscussions);
    }
  });
  const [articles, setArticles] = useState(() => {
    try {
      const stored = localStorage.getItem(ARTICLES_KEY);
      return stored ? parseStoredItems(JSON.parse(stored)) : parseStoredItems(defaultArticles);
    } catch {
      return parseStoredItems(defaultArticles);
    }
  });

  useEffect(() => {
    localStorage.setItem(DISCUSSIONS_KEY, JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  }, [articles]);

  const addDiscussion = (discussion) => {
    setDiscussions(prev => [discussion, ...prev]);
  };

  const addArticle = (article) => {
    setArticles(prev => [article, ...prev]);
  };

  return (
    <ContentContext.Provider value={{ discussions, articles, addDiscussion, addArticle }}>
      {children}
    </ContentContext.Provider>
  );
};

export { ContentProvider, ContentContext };
