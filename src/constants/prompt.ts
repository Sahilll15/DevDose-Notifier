export const LEARNING_PROMPT = (previousContent?: string[]) => `
Generate a NEW and UNIQUE daily learning topic for a software developer, choosing from one of the following specialized areas: **React, System Design, Core JavaScript, Backend Development, or Interview Preparation**.

${
  previousContent && previousContent.length > 0
    ? `
**IMPORTANT - PREVIOUS CONTENT TO AVOID:**
The following topics have been generated recently. DO NOT generate similar or duplicate content:
${previousContent.map((content, index) => `${index + 1}. ${content}`).join('\n')}

Please ensure your new topic is completely different and offers fresh insights.
`
    : ''
}

The generated topic must be:
1.  **Insightful & Deep**: Go beyond basic definitions. Explain the "why" behind the concept, including its trade-offs, common use cases, and impact on application architecture or career trajectory.
2.  **Best-Practice Aligned**: For React and backend technologies, ensure all information and code examples strictly follow the **official documentation**. For career topics, cite established industry principles.
3.  **Practical & Actionable**: Include high-quality, commented code snippets, concrete design walkthroughs, or a structured list of actionable steps a developer can immediately take.
4.  **Targeted**: Be suitable for a developer aiming to build intermediate to advanced skills and accelerate their career.

---

### **Topic-Specific Directives**

* **For a React Topic:**
    * **Modern React Patterns:** Focus on React 18+ features like Concurrent Rendering, Suspense, Server Components, or advanced hooks patterns.
    * **Performance Optimization:** Cover React.memo, useMemo, useCallback, code splitting, lazy loading, and bundle optimization.
    * **State Management:** Explore Context API, Redux Toolkit, Zustand, or Jotai for complex state scenarios.
    * **Core Internals:** Dive into Virtual DOM, Reconciliation Algorithm, React Fiber, or the new concurrent features.

* **For a System Design Topic:**
    * **Scalability Patterns:** Load balancing strategies, horizontal vs vertical scaling, microservices architecture.
    * **Data Management:** Database sharding, replication, caching strategies (Redis, Memcached), CDN implementation.
    * **Communication:** API Gateway patterns, message queues, event-driven architecture, gRPC vs REST.
    * **Real-world Systems:** Design Twitter, Uber, Netflix, or WhatsApp-like systems with trade-offs analysis.

* **For a Core JavaScript Topic:**
    * **Advanced Concepts:** Closures, prototypes, event loop, memory management, garbage collection.
    * **Modern ES6+ Features:** Async/await, generators, modules, destructuring, template literals, optional chaining.
    * **Performance:** V8 engine internals, optimization techniques, memory leaks prevention.
    * **Functional Programming:** Higher-order functions, currying, composition, immutability patterns.

* **For a Backend Development Topic:**
    * **API Design:** RESTful principles, GraphQL implementation, API versioning, rate limiting.
    * **Database Design:** Normalization, indexing strategies, query optimization, NoSQL vs SQL.
    * **Security:** Authentication (JWT, OAuth), authorization, input validation, CORS, CSRF protection.
    * **DevOps & Deployment:** Docker containerization, CI/CD pipelines, monitoring, logging strategies.

* **For an Interview Preparation Topic:**
    * **Technical Interviews:** Coding problem-solving strategies, algorithm complexity analysis, system design preparation.
    * **Behavioral Questions:** STAR method, leadership examples, conflict resolution, project management.
    * **Portfolio Building:** GitHub best practices, open source contributions, technical blogging.
    * **Career Strategy:** Salary negotiation, job search optimization, networking, skill development roadmap.

---

### **Required Response Format**

**Topic Area:** [React | System Design | Core JavaScript | Backend Development | Interview Preparation]
**Title:** [A Clear and Engaging Title for the Concept]

**📄 Description:**
[A 2-3 sentence summary explaining what the topic is and why it's crucial for achieving technical excellence or career advancement.]

**🧠 Key Concepts & Insights:**
[A detailed breakdown of the concept. For technical topics, explain the mechanics. For career topics, explain the strategy and reasoning behind the advice.]

**🚀 Actionable Steps / Code Example:**
[Provide a concise, well-commented code snippet for technical topics. For career or interview topics, provide a structured list of concrete actions the developer should take.]

**📚 Further Reading:**
[Provide a direct link to the primary source of truth: the relevant page from the **official documentation**, a seminal blog post by an industry expert, or a highly-regarded resource.]
`;
