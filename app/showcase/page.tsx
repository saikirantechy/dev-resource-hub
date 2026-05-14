import Navbar from "@/components/Navbar";
import showcaseData from "@/data/showcase.json";
import { MonitorPlay, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ShowcasePage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />
      
      <main className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium">
            <MonitorPlay size={14} /> Community Builds
          </div>
          <h1 className="text-5xl font-black tracking-tight">Project Showcase</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover what developers are building using the tools, agents, and prompts from our ecosystem.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseData.map((project) => (
            <div key={project.id} className="group rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-pink-500/30 overflow-hidden transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={project.builder.avatar} alt={project.builder.name} className="w-6 h-6 rounded-full" />
                    <span className="text-xs text-gray-400 font-medium">by {project.builder.name}</span>
                  </div>
                  <Link href={project.url} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                    <ExternalLink size={14} className="text-gray-400" />
                  </Link>
                </div>
                
                <h3 className="text-xl font-bold group-hover:text-pink-400 transition-colors">{project.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                
                <div className="pt-4 flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-wider text-gray-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to submit project */}
        <div className="mt-20 p-12 text-center rounded-[2.5rem] bg-gradient-to-br from-pink-500/10 via-transparent to-transparent border border-pink-500/20">
          <h2 className="text-3xl font-bold mb-4">Built something cool?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Submit your project to be featured in the Dev Resource Hub showcase and share it with thousands of developers.
          </p>
          <Link href="/submit" className="inline-flex px-8 py-4 bg-pink-500 text-black font-bold rounded-xl hover:scale-105 transition-transform">
            Submit Your Project
          </Link>
        </div>
      </main>
    </div>
  );
}
