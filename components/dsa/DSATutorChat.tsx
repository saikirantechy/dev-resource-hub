"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Lightbulb, ChevronDown, BookOpen, Code2, Beaker, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "tutor" | "user";
  content: string;
  type?: "concept" | "hint" | "code" | "visual";
}

const WELCOME: Message = {
  id: "welcome",
  role: "tutor",
  content: "Hi! I'm your **DSA Tutor**. I can help you understand any data structure or algorithm concept. What would you like to learn today?\n\nTry asking me:\n- \"Explain how a hash table works\"\n- \"Show me the two-pointer technique\"\n- \"Walk me through reversing a linked list\"",
  type: "concept",
};

interface Props {
  topic?: string;
}

export default function DSATutorChat({ topic }: Props) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const quickActions = [
    { label: "Explain Concept", icon: BookOpen, color: "text-blue-400", action: "Explain how binary search works with an example" },
    { label: "Show Hint", icon: Lightbulb, color: "text-amber-400", action: "Give me a hint for solving the two-sum problem" },
    { label: "Code Example", icon: Code2, color: "text-emerald-400", action: "Show me a code example of DFS traversal" },
    { label: "Complexity", icon: Beaker, color: "text-purple-400", action: "Explain time and space complexity of quicksort" },
  ];

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;
    idCounter.current += 1;
    const userMsg: Message = { id: `msg-${idCounter.current}`, role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        "hash": "**Hash Table Concept** 📚\n\nA hash table is a data structure that stores key-value pairs. It uses a **hash function** to compute an index into an array of buckets.\n\n**How it works:**\n1. You give it a key (like \"name\")\n2. The hash function converts the key to an integer\n3. That integer maps to a bucket index\n4. The value is stored/retrieved from that bucket\n\n**Time Complexity:**\n- Average: O(1) for insert, delete, search\n- Worst: O(n) when collisions occur\n\n**Real-world use:** Database indexing, caching, symbol tables",
        "binary search": "**Binary Search** 🔎\n\nBinary search finds an element in a **sorted array** by repeatedly dividing the search interval in half.\n\n**Algorithm:**\n1. Find the middle element\n2. If it matches → return index\n3. If target < middle → search left half\n4. If target > middle → search right half\n5. Repeat until found or empty\n\n```python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n```\n\n**Complexity:** O(log n) time, O(1) space\n\n**Visual:**\n```\nArray: [1, 3, 5, 7, 9, 11, 13]\nSearch for: 7\nStep 1: mid = 3 → arr[3] = 7 ✓ Found!\n```",
        "two-sum": "**Hint for Two Sum** 💡\n\nLet me guide you without giving away the full solution:\n\n**The Problem:** Find two numbers in an array that add up to a target.\n\n**Think about:**\n- Brute force: Check every pair (O(n²))\n- Can we do better? What if we could look up values instantly?\n\n**Hint 1:** For each number, calculate its complement (target - current).\n\n**Hint 2:** Use a hash map to store numbers you've already seen.\n\n**Hint 3:** While iterating, check if the complement exists in the hash map. If yes, you've found your pair!\n\nWant me to show the full solution?",
        "dfs": "**Depth-First Search (DFS)** 🌲\n\nDFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking.\n\n**Implementation (Recursive):**\n```python\ndef dfs(graph, node, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(node)\n    print(node)  # Process node\n    \n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)\n    return visited\n\n# Example\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D', 'E'],\n    'C': ['F'],\n    'D': [], 'E': [], 'F': []\n}\ndfs(graph, 'A')  # A B D E C F\n```\n\n**Time Complexity:** O(V + E) where V = vertices, E = edges\n**Space Complexity:** O(V) for the recursion stack\n\n**Applications:**\n- Finding connected components\n- Topological sorting\n- Maze solving\n- Cycle detection",
        "quicksort": "**QuickSort Analysis** ⚡\n\n**Algorithm:** Divide & conquer sorting\n1. Pick a pivot element\n2. Partition the array around the pivot\n3. Recursively sort the sub-arrays\n\n**Time Complexity:**\n| Case | Complexity | When |\n|------|-----------|------|\n| Best | O(n log n) | Pivot always divides array in half |\n| Average | O(n log n) | Random data |\n| Worst | O(n²) | Already sorted with bad pivot choice |\n\n**Space Complexity:** O(log n) due to recursion stack (in-place version)\n\n**Optimization Tips:**\n- Use randomized pivot selection\n- Use median-of-three for pivot\n- Switch to insertion sort for small sub-arrays (size < 10)\n\n**Key Insight:** QuickSort's cache efficiency often makes it faster than MergeSort in practice, despite same average complexity.",
      };

      let response = "";
      const lower = text.toLowerCase();
      for (const [key, val] of Object.entries(responses)) {
        if (lower.includes(key)) { response = val; break; }
      }
      if (!response) {
        response = `Great question! Let me explain that concept.\n\n**${text}**\n\nHere's a structured breakdown:\n\n1. **Definition**: This is an important DSA concept that helps solve specific types of problems efficiently.\n\n2. **Key Points**:\n   - Understand the core principle first\n   - Practice with simple examples\n   - Gradually increase complexity\n\n3. **Recommended Approach**:\n   - Start with the brute force solution\n   - Identify patterns\n   - Optimize step by step\n\nWould you like me to go deeper into any specific aspect?`;
      }

      idCounter.current += 1;
      const tutorMsg: Message = {
        id: `msg-${idCounter.current}`,
        role: "tutor",
        content: response,
        type: text.toLowerCase().includes("code") || text.toLowerCase().includes("example") ? "code" : "concept",
      };
      setMessages(prev => [...prev, tutorMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[600px] rounded-2xl glass border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-sm text-white flex items-center gap-2">
            DSA Tutor
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-bold uppercase tracking-wider border border-emerald-500/20">
              <Sparkles size={8} /> AI Powered
            </span>
          </div>
          <div className="text-[10px] text-gray-500">Online • Ready to help</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "tutor" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Bot size={14} className="text-blue-400" />
                </div>
              )}
              <div className={`max-w-[85%] ${msg.role === "user" ? "order-1" : ""}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "tutor"
                    ? "bg-white/[0.03] border border-white/5 text-gray-200"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                }`}>
                  <div className="prose prose-invert prose-sm max-w-none [&_pre]:bg-black/30 [&_pre]:p-3 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/5 [&_pre]:text-[11px] [&_code]:text-emerald-300 [&_strong]:text-white whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/20">
              <Bot size={14} className="text-blue-400" />
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick Actions */}
      {messages.length < 3 && (
        <div className="px-5 py-3 border-t border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={12} className="text-blue-400" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Quick Actions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleSend(action.action)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <action.icon size={12} className={action.color} />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask me anything about DSA..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-30 transition-all hover:opacity-90"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
