import { Metadata } from "next";
import Link from "next/link";
import { PlusCircle, Globe, ArrowRight, Lightbulb, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Submit a Resource | Dev Resource Hub",
  description: "Contribute to the ecosystem by suggesting a new AI tool, agent, prompt, or resource to the Dev Resource Hub marketplace.",
};

export default function SubmitPage() {
  const steps = [
    {
      icon: <Lightbulb className="text-yellow-400" />,
      title: "Find a Tool",
      description: "Discover a resource that's missing from our ecosystem."
    },
    {
      icon: <Globe className="text-white" />,
      title: "Open an Issue",
      description: "Use our 'Resource Addition' template to submit the tool."
    },
    {
      icon: <ShieldCheck className="text-green-400" />,
      title: "Maintainer Review",
      description: "Our community will review the link for quality and safety."
    },
    {
      icon: <Zap className="text-blue-400" />,
      title: "Live on Site",
      description: "Once merged, your resource will be live for everyone!"
    }
  ];

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
            <PlusCircle size={14} /> Contribute to the Hub
          </div>
          <h1 className="text-5xl font-bold tracking-tight">Suggest a New Resource</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Help us build the most comprehensive developer resource hub in the world.
          </p>
        </header>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 border border-white/10 text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to contribute?</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            We use GitHub Issues to manage new submissions. Click the button below to go to our repository.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="https://github.com/saikirantechy/dev-resource-hub/issues/new?template=resource_addition.md" 
              target="_blank"
              className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              Submit Resource <ArrowRight size={18} />
            </Link>
            <Link 
              href="/docs/contribution-guide" 
              className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              Read Guidelines
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
