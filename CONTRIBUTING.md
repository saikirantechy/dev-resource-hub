# Contributing to AI Developer Ecosystem Platform

First off, thank you for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to **Dev Resource Hub**. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## 🚀 How Can I Contribute?

### 1. Adding New Resources
Our platform is data-driven. All tools, agents, and prompts are stored in the `data/` directory as JSON files.
- **Agents**: Add to `data/agents.json`
- **Tools**: Add to `data/tools.json`
- **Prompts**: Add to `data/prompts.json`
- **Blogs**: Add to `data/blogs.json`

**Standard format for a resource:**
```json
{
  "id": "unique-id",
  "name": "Tool Name",
  "description": "Short, punchy description.",
  "url": "https://link-to-tool.com",
  "category": "Specific Category",
  "tags": ["Tag1", "Tag2"],
  "pricing": "Free / Paid / Freemium",
  "isFeatured": false,
  "isTrending": false,
  "isOpenSource": true,
  "stars": 0,
  "views": 0
}
```

### 2. Improving the UI/UX
We use **Next.js 16**, **Tailwind CSS v4**, and **Framer Motion**.
- Global styles: `app/globals.css`
- Components: `components/`
- Layouts: `app/layout.tsx`

If you're proposing a design change, please include a screenshot in your PR.

### 3. Reporting Bugs
- Use the [GitHub Issues](https://github.com/saikirantechy/dev-resource-hub/issues) tracker.
- Describe the bug, steps to reproduce, and expected vs. actual behavior.

## 🛠️ Development Setup

1. Fork and clone the repo.
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev`
4. Open [http://localhost:3000/dev-resource-hub](http://localhost:3000/dev-resource-hub)

## 🤝 Pull Request Process

1. Create a new branch: `git checkout -b feature/amazing-feature`
2. Ensure your code follows the existing style (TypeScript + Tailwind).
3. Test your changes locally.
4. Push to your fork and submit a PR.
5. Provide a clear description of the changes and link to any related issues.

## 🏆 Contributor Rewards
High-impact contributors are featured in the **Showcase** and our **Leaderboard**.

---

*Let's build the ultimate AI developer ecosystem together!* 🚀
