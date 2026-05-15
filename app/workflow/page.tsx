import WorkflowClient from "./WorkflowClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Workflow Builder | Dev Resource Hub",
  description: "Design and orchestrate multi-agent workflows visually. Connect Devin, Manus, v0, and more to build complex AI-first applications.",
  openGraph: {
    title: "Visual AI Workflow Orchestrator",
    description: "Drag-and-drop AI agent orchestration for the modern developer.",
  },
};

export default function WorkflowPage() {
  return <WorkflowClient />;
}
