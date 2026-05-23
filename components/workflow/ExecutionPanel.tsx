import { useEffect, useRef } from 'react';
import { Terminal, Play, Square, Trash2 } from 'lucide-react';
import { useWorkflowStore } from '@/lib/workflow/store';
import { simulateExecution } from '@/lib/workflow/engine';

export default function ExecutionPanel() {
  const { executionLogs, clearExecutionLogs, nodes, edges } = useWorkflowStore();
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [executionLogs]);

  const handleRun = () => {
    clearExecutionLogs();
    simulateExecution(nodes, edges);
  };

  return (
    <div className="h-64 border-t border-white/10 glass-dark flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">
            Execution Logs
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={clearExecutionLogs} className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors" title="Clear Logs">
            <Trash2 size={14} />
          </button>
          <button onClick={handleRun} className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all text-xs font-bold">
            <Play size={12} /> Run Simulation
          </button>
        </div>
      </div>

      {/* Logs Area */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-gray-300 space-y-2">
        {executionLogs.length === 0 ? (
          <div className="text-gray-600 italic">No execution logs yet. Click 'Run Simulation' to start.</div>
        ) : (
          executionLogs.map((log, i) => (
            <div key={i} className={`${log.startsWith('[SUCCESS]') ? 'text-emerald-400' : log.startsWith('[ERROR]') ? 'text-red-400' : 'text-gray-300'}`}>
              <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span> {log}
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}
