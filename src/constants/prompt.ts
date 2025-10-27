export const LEARNING_PROMPT = (previousContent?: string[]) => `
Generate NEW and UNIQUE daily learning content for a software developer covering ALL of the following 5 specialized areas: **React (Frontend), System Design, Core JavaScript, Backend Development, and Data Structures & Algorithms (DSA)**.

${
  previousContent && previousContent.length > 0
    ? `
**IMPORTANT - PREVIOUS CONTENT TO AVOID:**
The following topics have been generated recently. DO NOT generate similar or duplicate content:
${previousContent.map((content, index) => `${index + 1}. ${content}`).join('\n')}

Please ensure your new topics are completely different and offer fresh insights.
`
    : ''
}

**CRITICAL REQUIREMENT:** You MUST generate exactly 5 topics, one for each subject area listed above. Each topic must be:
1.  **Insightful & Deep**: Go beyond basic definitions. Explain the "why" behind the concept, including its trade-offs, common use cases, and impact on application architecture.
2.  **Best-Practice Aligned**: Ensure all information and code examples strictly follow the **official documentation** and industry best practices.
3.  **Practical & Actionable**: Include high-quality code snippets, concrete design walkthroughs, or structured actionable steps a developer can immediately implement.
4.  **Targeted**: Suitable for developers aiming to build intermediate to advanced skills.

---

### **Topic-Specific Directives**

* **For React (Frontend) Topic:**
    * **Modern React Patterns:** Focus on React 18+ features like Concurrent Rendering, Suspense, Server Components, or advanced hooks patterns.
    * **Performance Optimization:** Cover React.memo, useMemo, useCallback, code splitting, lazy loading, and bundle optimization.
    * **State Management:** Explore Context API, Redux Toolkit, Zustand, or Jotai for complex state scenarios.
    * **Core Internals:** Dive into Virtual DOM, Reconciliation Algorithm, React Fiber, or concurrent features and all the react concepts and advanced topics.

* **For System Design Topic:**
    * **Scalability Patterns:** Load balancing strategies, horizontal vs vertical scaling, microservices architecture.
    * **Data Management:** Database sharding, replication, caching strategies (Redis, Memcached), CDN implementation.
    * **Communication:** API Gateway patterns, message queues, event-driven architecture, gRPC vs REST.
    * **Real-world Systems:** Design Twitter, Uber, Netflix, or WhatsApp-like systems with trade-offs analysis.

* **For Core JavaScript Topic:**
    * **Advanced Concepts:** Closures, prototypes, event loop, memory management, garbage collection.
    * **Modern ES6+ Features:** Async/await, generators, modules, destructuring, template literals, optional chaining.
    * **Performance:** V8 engine internals, optimization techniques, memory leaks prevention.
    * **Functional Programming:** Higher-order functions, currying, composition, immutability patterns.

* **For Backend Development Topic:**
    * **API Design:** RESTful principles, GraphQL implementation, API versioning, rate limiting.
    * **Database Design:** Normalization, indexing strategies, query optimization, NoSQL vs SQL.
    * **Security:** Authentication (JWT, OAuth), authorization, input validation, CORS, CSRF protection.
    * **DevOps & Deployment:** Docker containerization, CI/CD pipelines, monitoring, logging strategies.

* **For Data Structures & Algorithms (DSA) Topic:**
    * **Data Structures:** Arrays, Linked Lists, Trees, Graphs, Hash Tables, Heaps, Tries with implementation patterns.
    * **Algorithm Patterns:** Sliding Window, Two Pointers, Fast & Slow Pointers, Merge Intervals, Cyclic Sort.
    * **Advanced Algorithms:** Dynamic Programming, Greedy Algorithms, Backtracking, Graph Algorithms (BFS, DFS, Dijkstra).
    * **Complexity Analysis:** Time and Space complexity, Big O notation, optimization techniques.

---

### **Required Response Format**

Generate content for ALL 5 topics in the following format:

---

**Topic Area:** React (Frontend)
**Title:** [A Clear and Engaging Title for the Concept]

**📄 Description:**
[A 2-3 sentence summary explaining what the topic is and why it's crucial for achieving technical excellence.]

**🧠 Key Concepts & Insights:**
[A detailed breakdown of the concept with explanations of mechanics and best practices.]

**🚀 Actionable Steps / Code Example:**
[Provide a concise, well-commented code snippet with practical implementation.]

**📚 Further Reading:**
[Provide a direct link to the official documentation or highly-regarded resource.]

---

**Topic Area:** System Design
**Title:** [A Clear and Engaging Title for the Concept]

**📄 Description:**
[A 2-3 sentence summary explaining what the topic is and why it's crucial for achieving technical excellence.]

**🧠 Key Concepts & Insights:**
[A detailed breakdown of the concept with explanations of mechanics and best practices.]

**🚀 Actionable Steps / Code Example:**
[Provide a concise design walkthrough or architecture diagram explanation.]

**📚 Further Reading:**
[Provide a direct link to the official documentation or highly-regarded resource.]

---

**Topic Area:** Core JavaScript
**Title:** [A Clear and Engaging Title for the Concept]

**📄 Description:**
[A 2-3 sentence summary explaining what the topic is and why it's crucial for achieving technical excellence.]

**🧠 Key Concepts & Insights:**
[A detailed breakdown of the concept with explanations of mechanics and best practices.]

**🚀 Actionable Steps / Code Example:**
[Provide a concise, well-commented code snippet with practical implementation.]

**📚 Further Reading:**
[Provide a direct link to the official documentation or highly-regarded resource.]

---

**Topic Area:** Backend Development
**Title:** [A Clear and Engaging Title for the Concept]

**📄 Description:**
[A 2-3 sentence summary explaining what the topic is and why it's crucial for achieving technical excellence.]

**🧠 Key Concepts & Insights:**
[A detailed breakdown of the concept with explanations of mechanics and best practices.]

**🚀 Actionable Steps / Code Example:**
[Provide a concise, well-commented code snippet with practical implementation.]

**📚 Further Reading:**
[Provide a direct link to the official documentation or highly-regarded resource.]

---

**Topic Area:** Data Structures & Algorithms (DSA)
**Title:** [A Clear and Engaging Title for the Concept]

**📄 Description:**
[A 2-3 sentence summary explaining what the topic is and why it's crucial for achieving technical excellence.]

**🧠 Key Concepts & Insights:**
[A detailed breakdown of the concept with explanations of mechanics and best practices.]

**🚀 Actionable Steps / Code Example:**
[Provide a concise, well-commented code snippet showing algorithm implementation with complexity analysis.]

**📚 Further Reading:**
[Provide a direct link to the official documentation or highly-regarded resource.]
`;
