"use client";
import { Zap } from "lucide-react";

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
      onSubmit={e => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 glass border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
      />
      <button className="btn-primary px-8 py-4 whitespace-nowrap">
        <Zap size={16} /> Join Now
      </button>
    </form>
  );
}
