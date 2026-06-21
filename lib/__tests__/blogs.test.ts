import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock fs module
vi.mock("fs", () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
}));

// Mock gray-matter
vi.mock("gray-matter", () => ({
  default: vi.fn(),
}));

import fs from "fs";
import matter from "gray-matter";

describe("blogs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getBlogSlugs", () => {
    it("returns empty array when content directory missing", async () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const { getBlogSlugs } = await import("@/lib/blogs");
      const result = getBlogSlugs();
      expect(result).toEqual([]);
    });

    it("filters to .md files only", async () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue([
        "post1.md",
        "post2.md",
        "image.png",
        "notes.txt",
      ] as any);

      const { getBlogSlugs } = await import("@/lib/blogs");
      const result = getBlogSlugs();
      expect(result).toHaveLength(2);
      expect(result).toContain("post1.md");
      expect(result).toContain("post2.md");
      expect(result).not.toContain("image.png");
    });
  });

  describe("getBlogBySlug", () => {
    it("returns null for non-existent blog", async () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const { getBlogBySlug } = await import("@/lib/blogs");
      const result = getBlogBySlug("nonexistent");
      expect(result).toBeNull();
    });

    it("parses frontmatter and content correctly", async () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(
        "---\ntitle: Test Blog\ndescription: A test\ndate: 2026-01-15\nauthor: Tester\ntags: [test, blog]\n---\n\nThis is the blog content.",
      );
      vi.mocked(matter).mockReturnValue({
        data: {
          title: "Test Blog",
          description: "A test",
          date: "2026-01-15",
          author: "Tester",
          tags: ["test", "blog"],
        },
        content: "This is the blog content.",
      } as any);

      const { getBlogBySlug } = await import("@/lib/blogs");
      const result = getBlogBySlug("test-blog");

      expect(result).not.toBeNull();
      expect(result!.slug).toBe("test-blog");
      expect(result!.title).toBe("Test Blog");
      expect(result!.description).toBe("A test");
      expect(result!.date).toBe("2026-01-15");
      expect(result!.author).toBe("Tester");
      expect(result!.tags).toEqual(["test", "blog"]);
      expect(result!.content).toBe("This is the blog content.");
    });

    it("provides defaults for missing frontmatter fields", async () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue("---\n---\nContent here");
      vi.mocked(matter).mockReturnValue({
        data: {},
        content: "Content here",
      } as any);

      const { getBlogBySlug } = await import("@/lib/blogs");
      const result = getBlogBySlug("minimal");

      expect(result!.title).toBe("Untitled");
      expect(result!.author).toBe("Anonymous");
      expect(result!.tags).toEqual([]);
      expect(result!.description).toBe("");
    });

    it("calculates read time based on word count", async () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      // ~400 words = ~2 min read at 200 wpm
      const words = Array.from({ length: 400 }, (_, i) => `word${i}`).join(" ");
      vi.mocked(fs.readFileSync).mockReturnValue(`---\ntitle: Long\n---\n${words}`);
      vi.mocked(matter).mockReturnValue({
        data: { title: "Long" },
        content: words,
      } as any);

      const { getBlogBySlug } = await import("@/lib/blogs");
      const result = getBlogBySlug("long-post");
      expect(result!.readTime).toBe("2 min read");
    });
  });

  describe("getAllBlogs", () => {
    it("returns blogs sorted by date descending", async () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue([
        "old.md",
        "new.md",
        "middle.md",
      ] as any);

      const callCount: Record<string, number> = {};
      vi.mocked(fs.readFileSync).mockImplementation((path: any) => {
        const slug = String(path).includes("old")
          ? "old"
          : String(path).includes("new")
            ? "new"
            : "middle";
        callCount[slug] = (callCount[slug] || 0) + 1;
        return `---\ntitle: ${slug}\ndate: ${
          slug === "old" ? "2025-01-01" : slug === "new" ? "2026-06-01" : "2026-01-01"
        }\n---\nContent`;
      });

      vi.mocked(matter).mockImplementation((_content: any, ..._args: any[]) => {
        const title = String(_content).includes("old")
          ? "Old Post"
          : String(_content).includes("new")
            ? "New Post"
            : "Middle Post";
        const date = String(_content).includes("old")
          ? "2025-01-01"
          : String(_content).includes("new")
            ? "2026-06-01"
            : "2026-01-01";
        return {
          data: { title, date },
          content: "Content",
        } as any;
      });

      const { getAllBlogs } = await import("@/lib/blogs");
      const blogs = getAllBlogs();

      expect(blogs).toHaveLength(3);
      expect(blogs[0].slug).toBe("new");
      expect(blogs[1].slug).toBe("middle");
      expect(blogs[2].slug).toBe("old");
    });

    it("handles empty content directory", async () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue([]);

      const { getAllBlogs } = await import("@/lib/blogs");
      const blogs = getAllBlogs();
      expect(blogs).toEqual([]);
    });

    it("filters out null results from getBlogBySlug", async () => {
      vi.mocked(fs.existsSync).mockImplementation((path: unknown) => {
        const p = String(path);
        // Content directory exists; only "exists.md" file exists
        if (p.includes("missing")) return false;
        return true;
      });
      vi.mocked(fs.readdirSync).mockReturnValue(["exists.md", "missing.md"] as any);
      vi.mocked(fs.readFileSync).mockReturnValue(
        "---\ntitle: Exists\ndate: 2026-01-01\n---\nContent",
      );
      vi.mocked(matter).mockReturnValue({
        data: { title: "Exists", date: "2026-01-01" },
        content: "Content",
      } as any);

      const { getAllBlogs } = await import("@/lib/blogs");
      const blogs = getAllBlogs();
      expect(blogs).toHaveLength(1);
      expect(blogs[0].slug).toBe("exists");
    });
  });
});
