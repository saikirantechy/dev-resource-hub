import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          Dev Resource <span className="text-blue-500">Hub</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/webagentcore" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold flex items-center gap-1.5">
            <Sparkles size={14} /> WebAgentCore
          </Link>
          <Link href="/blogs" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/ai-finder" className="hover:text-white transition-colors">AI Finder</Link>
          <Link href="/contributors" className="hover:text-white transition-colors">Contributors</Link>
          <Link href="/submit" className="hover:text-white transition-colors">Submit</Link>
          <Link 
            href="https://github.com/saikirantechy/dev-resource-hub" 
            target="_blank"
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all font-semibold"
          >
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
}
