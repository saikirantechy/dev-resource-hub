export type AnalysisType = "summary" | "code-review" | "security" | "docs" | "improvements";

export interface AnalysisResult {
  summary: string;
  changes: { file: string; status: "added" | "modified" | "deleted"; lines: number }[];
  codeReview: { category: string; severity: "critical" | "warning" | "info"; message: string; suggestion: string }[];
  security: { severity: "critical" | "high" | "medium" | "low"; issue: string; impact: string; recommendation: string }[];
  docs: { section: string; status: "good" | "needs-improvement" | "missing"; details: string }[];
  improvements: { area: string; priority: "high" | "medium" | "low"; suggestion: string; effort: string }[];
  stats: {
    totalFiles: number;
    linesAdded: number;
    linesRemoved: number;
    commentsCount: number;
    riskLevel: "low" | "medium" | "high";
    estimatedReviewTime: string;
  };
  techStack: string[];
}

export interface ParsedPR {
  repoName: string;
  prNumber: string;
  isValid: boolean;
}

export function parseGitHubPR(url: string): ParsedPR {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
  if (!match) return { repoName: "", prNumber: "", isValid: false };
  return { repoName: `${match[1]}/${match[2]}`, prNumber: match[3], isValid: true };
}

export function generateAnalysis(prUrl: string, repoName: string, prNumber: string): AnalysisResult {
  const isFrontend = /react|next|ui|frontend/i.test(prUrl);
  const isBackend = /api|backend|server|python/i.test(prUrl);
  const isML = /ml|ai|model|tensorflow/i.test(prUrl);

  const techStack =
    isML ? ["Python", "TensorFlow", "PyTorch", "CUDA", "Jupyter"] :
    isFrontend ? ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui"] :
    isBackend ? ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"] :
    ["TypeScript", "Node.js", "React", "PostgreSQL", "AWS"];

  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const riskRand = Math.random();

  return {
    summary: [
      `This pull request introduces significant changes to the **${repoName}** repository (PR #${prNumber}).`,
      "The changes primarily focus on adding new features, improving existing functionality, and addressing technical debt.",
      "The implementation follows the project's established patterns and includes comprehensive test coverage for critical paths.\n",
      "**Key Highlights:**",
      `- ${rand(5, 14)} files changed across the codebase`,
      `- Introduction of ${
        isFrontend ? "new UI components with responsive design" :
        isBackend ? "new API endpoints with rate limiting" :
        "new data processing pipeline"
      }`,
      `- Performance improvements reducing ${
        isFrontend ? "bundle size by ~15%" : "API response time by ~40%"
      }`,
      `- Updates to existing tests and addition of ${rand(3, 12)} new test cases\n`,
      "The PR is well-structured with clear commit messages and appropriate code organization.",
      "Below are detailed analyses across multiple dimensions.",
    ].join("\n"),
    changes: [
      { file: `src/components/${isFrontend ? "DataTable.tsx" : "api/handler.ts"}`, status: "modified" as const, lines: 45 },
      { file: `src/lib/${isFrontend ? "utils/formatting.ts" : "services/database.ts"}`, status: "modified" as const, lines: 23 },
      { file: `src/${isFrontend ? "app/page.tsx" : "main.py"}`, status: "modified" as const, lines: 67 },
      { file: `src/types/${isFrontend ? "index.ts" : "models.py"}`, status: "added" as const, lines: 89 },
      { file: `src/__tests__/${isFrontend ? "DataTable.test.tsx" : "test_handler.py"}`, status: "added" as const, lines: 120 },
    ],
    codeReview: [
      { category: "Code Quality", severity: "warning" as const, message: "Large function in `handleSubmit` (> 50 lines) could benefit from breaking into smaller, focused functions.", suggestion: "Extract validation logic, data transformation, and response handling into separate functions. Consider using a service layer pattern." },
      { category: "Error Handling", severity: "critical" as const, message: "Missing error boundary around async data fetching. Unhandled promise rejections could crash the component.", suggestion: "Wrap async operations in try-catch blocks. Add a global error boundary component and implement proper error states in the UI." },
      { category: "Performance", severity: "info" as const, message: "Large dependency array in `useEffect` — consider memoizing callback functions.", suggestion: "Use `useCallback` for event handlers passed as props. Review if all dependencies are actually needed in the effect." },
      { category: "TypeScript", severity: "warning" as const, message: "Several `any` types used in type definitions. This bypasses TypeScript's type checking.", suggestion: "Replace `any` with proper types or generics. Use `unknown` if the type is truly unknown and validate at runtime." },
      { category: "Testing", severity: "info" as const, message: "Test coverage is good but missing edge cases for empty states and error scenarios.", suggestion: "Add tests for: empty data arrays, API failures, loading states, and null/undefined inputs." },
    ],
    security: [
      { severity: "high" as const, issue: "User input not sanitized in search query parameter", impact: "Potential SQL injection or NoSQL injection vulnerability in search functionality.", recommendation: "Use parameterized queries or an ORM that handles sanitization. Validate and escape all user inputs." },
      { severity: "medium" as const, issue: "API keys visible in client-side code comments", impact: "Sensitive credentials could be exposed in source code or bundled JavaScript.", recommendation: "Move all API keys to server-side environment variables. Use a backend proxy for third-party API calls." },
      { severity: "low" as const, issue: "Missing rate limiting on public endpoints", impact: "API could be abused by automated scripts or DDoS attacks.", recommendation: "Implement rate limiting using a sliding window algorithm. Consider using Redis for distributed rate limiting." },
      { severity: "critical" as const, issue: "No authentication check on admin delete endpoint", impact: "Unauthenticated users could delete resources. This is a critical security flaw.", recommendation: "Add authentication middleware to all admin routes. Implement role-based access control (RBAC) checks." },
    ],
    docs: [
      { section: "README", status: "good" as const, details: "README updated with new feature documentation and setup instructions." },
      { section: "API Docs", status: "needs-improvement" as const, details: "API endpoints documented but missing request/response examples. Add curl examples." },
      { section: "Code Comments", status: "good" as const, details: "Inline comments are clear and helpful. Complex logic is well-explained." },
      { section: "Migration Guide", status: "missing" as const, details: "Breaking changes introduced but no migration guide provided. This will cause issues for existing users." },
      { section: "CHANGELOG", status: "needs-improvement" as const, details: "Changes mentioned but not formatted according to Keep a Changelog convention." },
    ],
    improvements: [
      { area: "Architecture", priority: "high" as const, suggestion: "Consider extracting the data layer into a dedicated service module to improve testability and separation of concerns.", effort: "4-6 hours" },
      { area: "Performance", priority: "medium" as const, suggestion: "Implement virtual scrolling for large lists to reduce DOM nodes and improve rendering performance.", effort: "2-3 hours" },
      { area: "Accessibility", priority: "high" as const, suggestion: "Add ARIA labels, keyboard navigation support, and focus management for new interactive components.", effort: "3-4 hours" },
      { area: "DevOps", priority: "low" as const, suggestion: "Add GitHub Actions workflow for automated testing and deployment previews on PR creation.", effort: "1-2 hours" },
      { area: "Monitoring", priority: "medium" as const, suggestion: "Add structured logging and telemetry for the new features to track usage and errors in production.", effort: "2-3 hours" },
    ],
    stats: {
      totalFiles: rand(5, 12),
      linesAdded: rand(80, 279),
      linesRemoved: rand(10, 59),
      commentsCount: rand(2, 6),
      riskLevel: (riskRand > 0.7 ? "high" : riskRand > 0.4 ? "medium" : "low") as "low" | "medium" | "high",
      estimatedReviewTime: `${rand(15, 34)} minutes`,
    },
    techStack,
  };
}
