import { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "AI Tools Directory | Dev Resource Hub",
  description: "Explore curated AI-powered developer tools, IDEs like Cursor and Windsurf, and UI builders like v0 and Bolt.new.",
  keywords: ["AI tools", "developer tools", "AI IDE", "Cursor", "Windsurf", "v0", "Bolt.new", "generative UI"],
};

export default function Page() {
  return <ToolsClient />;
}
