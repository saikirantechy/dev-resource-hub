import { Bot, Terminal, Database, Wrench, GitBranch, CheckCircle2 } from 'lucide-react';
import { useWorkflowStore, AppNode } from '@/lib/workflow/store';
import { templates } from '@/lib/workflow/templates';

const NODE_TYPES = [
  { type: 'prompt', label: 'Prompt', icon: Terminal, color: 'text-purple-400', border: 'border-purple-400/30', bg: 'bg-purple-500/10', desc: 'Initial context' },
  { type: 'agent', label: 'AI Agent', icon: Bot, color: 'text-cyan-400', border: 'border-cyan-400/30', bg: 'bg-cyan-500/10', desc: 'Execute tasks' },
  { type: 'memory', label: 'Memory', icon: Database, color: 'text-yellow-400', border: 'border-yellow-400/30', bg: 'bg-yellow-500/10', desc: 'Persistent context' },
  { type: 'tool', label: 'Tool', icon: Wrench, color: 'text-orange-400', border: 'border-orange-400/30', bg: 'bg-orange-500/10', desc: 'API / Integrations' },
  { type: 'logic', label: 'Logic', icon: GitBranch, color: 'text-indigo-400', border: 'border-indigo-400/30', bg: 'bg-indigo-500/10', desc: 'Branching logic' },
  { type: 'output', label: 'Output', icon: CheckCircle2, color: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-500/10', desc: 'Final result' },
];

export default function Sidebar() {
  const { setNodes, setEdges, setWorkflowName, saveWorkflow, exportWorkflow, importWorkflow } = useWorkflowStore();

  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  const loadTemplate = (index: number) => {
    const tpl = templates[index];
    setNodes(tpl.nodes as AppNode[]);
    setEdges(tpl.edges);
    setWorkflowName(tpl.name);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        importWorkflow(ev.target.result);
      }
    };
    reader.readAsText(file);
    // reset input
    e.target.value = '';
  };

  return (
    <aside className="w-64 glass border-r border-white/10 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-white/[0.02]">
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Workflow Actions</h2>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button onClick={saveWorkflow} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 hover:bg-blue-500/20 transition-all">Save</button>
          <button onClick={exportWorkflow} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 text-xs font-bold border border-white/10 hover:bg-white/10 transition-all">Export</button>
        </div>
        <label className="mt-2 flex items-center justify-center w-full px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 text-xs font-bold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
          Import JSON
          <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      <div className="p-4 border-b border-white/10">
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Node Palette</h2>
        <p className="text-[10px] text-gray-500 mb-4">Drag and drop nodes onto the canvas.</p>
        
        <div className="space-y-2">
          {NODE_TYPES.map((node) => (
            <div
              key={node.type}
              onDragStart={(e) => onDragStart(e, node.type, node.label)}
              draggable
              className={`flex items-center gap-3 p-3 rounded-xl border ${node.border} ${node.bg} cursor-grab hover:brightness-125 transition-all`}
            >
              <node.icon size={16} className={node.color} />
              <div>
                <div className={`text-xs font-bold uppercase tracking-widest ${node.color}`}>{node.label}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{node.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Templates</h2>
        <div className="space-y-2">
          {templates.map((tpl, i) => (
            <button
              key={tpl.name}
              onClick={() => loadTemplate(i)}
              className="w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-all"
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
