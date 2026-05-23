import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Bot, GripHorizontal } from 'lucide-react';
import { AppNode } from '@/lib/workflow/store';

export default memo(function AgentNode({ data, selected }: NodeProps<AppNode>) {
  return (
    <div className={`relative group min-w-[200px] rounded-xl glass-strong border transition-all ${
      selected 
        ? 'border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
        : 'border-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
    }`}>
      {/* Neural Glow Background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 pointer-events-none" />

      {/* Target Handle (Input) */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-cyan-400 border-2 border-black" 
      />

      <div className="relative p-3 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 drag-handle cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30">
              <Bot size={14} className="text-cyan-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-100">
              {data.label || 'AI Agent'}
            </span>
          </div>
          <GripHorizontal size={14} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
        </div>

        {/* Content */}
        <div className="px-1 py-1">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            {data.description || 'Executes a specific persona or task.'}
          </p>
        </div>
      </div>

      {/* Source Handle (Output) */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-cyan-400 border-2 border-black" 
      />
    </div>
  );
});
