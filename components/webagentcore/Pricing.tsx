"use client";

import { motion } from "framer-motion";
import { Check, Zap, Rocket, Building2 } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Developer",
    price: "$0",
    description: "Perfect for builders and open-source experimenters.",
    features: [
      "Core Agent Framework",
      "Local Inference Support",
      "Community Plugins",
      "Unlimited Open Source Projects",
      "Community Support"
    ],
    icon: <Zap size={24} className="text-gray-400" />,
    cta: "Start Building",
    popular: false
  },
  {
    name: "Professional",
    price: "$49",
    description: "Advanced autonomous capabilities for production apps.",
    features: [
      "Everything in Developer",
      "Multi-Agent Orchestration",
      "Premium Memory Connectors",
      "Commercial License",
      "Priority Email Support"
    ],
    icon: <Rocket size={24} className="text-emerald-400" />,
    cta: "Go Pro Now",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Scale-ready infrastructure for large organizations.",
    features: [
      "Everything in Professional",
      "Dedicated GPU Nodes",
      "SLA Guarantees",
      "Custom Plugin Development",
      "24/7 Dedicated Support"
    ],
    icon: <Building2 size={24} className="text-cyan-400" />,
    cta: "Contact Sales",
    popular: false
  }
];

export default function Pricing() {
  return (
    <section className="py-32 px-6 bg-[#0a0a0a]">
      <div className="container mx-auto">
        <header className="max-w-3xl mx-auto text-center mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black">Scalable <span className="text-emerald-400">Pricing</span></h2>
          <p className="text-gray-400 text-lg">Choose the right plan to power your autonomous web agents.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-10 rounded-[2.5rem] bg-white/[0.02] border transition-all duration-500 flex flex-col ${plan.popular ? "border-emerald-500/50 bg-emerald-500/[0.03] scale-105 z-10 shadow-[0_0_50px_rgba(16,185,129,0.1)]" : "border-white/10 hover:border-white/20"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest shadow-2xl">
                  Most Popular
                </div>
              )}

              <div className="space-y-6 flex-1">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    {plan.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black">{plan.price}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Per Month</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{plan.description}</p>
                </div>

                <ul className="space-y-4 pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                      <div className={`p-1 rounded-full ${plan.popular ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-gray-500"}`}>
                        <Check size={12} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-10">
                <Link 
                  href="#"
                  className={`block w-full py-4 text-center font-bold rounded-2xl transition-all ${plan.popular ? "bg-emerald-500 text-black hover:scale-[1.02] shadow-xl shadow-emerald-500/20" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
