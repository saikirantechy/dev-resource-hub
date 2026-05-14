import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="text-xl font-bold mb-2">Dev Resource Hub</div>
          <p className="text-gray-500 text-sm max-w-xs">
            Building the most comprehensive ecosystem for modern developers.
          </p>
        </div>
        
        <div className="flex gap-12 text-sm">
          <div className="space-y-4">
            <h4 className="font-bold text-white">Project</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Docs</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-white">Community</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="https://github.com/saikirantechy/dev-resource-hub" className="hover:text-white transition-colors">GitHub</Link></li>
              <li><Link href="/contribute" className="hover:text-white transition-colors">Contribute</Link></li>
              <li><Link href="/showcase" className="hover:text-white transition-colors">Showcase</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
        © 2026 Dev Resource Hub. Built by the community for the community.
      </div>
    </footer>
  );
}
