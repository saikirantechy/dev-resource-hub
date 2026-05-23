"use client";

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/workflow/Sidebar';
import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';
import ExecutionPanel from '@/components/workflow/ExecutionPanel';

export default function WorkflowPage() {
  return (
    <div className="flex flex-col h-screen bg-[#050508] text-white overflow-hidden">
      <Navbar />
      
      {/* Mobile Warning Overlay */}
      <div className="lg:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-6 border border-orange-500/30">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black uppercase tracking-widest mb-2 text-white">Desktop Required</h2>
        <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-8">
          The AI Workflow Builder features a complex drag-and-drop canvas that is best experienced on a desktop or large tablet.
        </p>
        <button className="px-6 py-3 rounded-xl bg-white/10 text-white font-bold text-sm border border-white/20" onClick={(e) => {
          (e.target as HTMLElement).parentElement!.style.display = 'none';
        }}>
          Continue Anyway
        </button>
      </div>

      <main className="flex-1 flex overflow-hidden relative">
        <Sidebar />
        
        <div className="flex-1 flex flex-col h-full relative">
          {/* Main Canvas Area */}
          <WorkflowCanvas />
          
          {/* Bottom Execution Terminal */}
          <ExecutionPanel />
        </div>
      </main>
    </div>
  );
}
