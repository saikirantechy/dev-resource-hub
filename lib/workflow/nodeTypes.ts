import AgentNode from '@/components/workflow/nodes/AgentNode';
import PromptNode from '@/components/workflow/nodes/PromptNode';
import MemoryNode from '@/components/workflow/nodes/MemoryNode';
import ToolNode from '@/components/workflow/nodes/ToolNode';
import LogicNode from '@/components/workflow/nodes/LogicNode';
import OutputNode from '@/components/workflow/nodes/OutputNode';
// We can map other types to these or create them later
// import DelayNode from '@/components/workflow/nodes/DelayNode';
// import APINode from '@/components/workflow/nodes/APINode';
// import TransformNode from '@/components/workflow/nodes/TransformNode';
// import WebhookNode from '@/components/workflow/nodes/WebhookNode';

export const nodeTypes = {
  agent: AgentNode,
  prompt: PromptNode,
  memory: MemoryNode,
  tool: ToolNode,
  logic: LogicNode,
  output: OutputNode,
  // delay: DelayNode,
  // api: APINode,
  // transform: TransformNode,
  // webhook: WebhookNode,
};
