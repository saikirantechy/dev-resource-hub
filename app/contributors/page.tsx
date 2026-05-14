import Link from "next/link";
import { Globe, Trophy, Medal, Star } from "lucide-react";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/saikirantechy/dev-resource-hub/contributors",
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch contributors:", error);
    return [];
  }
}

export default async function ContributorsPage() {
  const contributors = await getContributors();

  const getBadge = (index: number, contributions: number) => {
    if (index === 0) return { label: "🥇 Top Contributor", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" };
    if (index === 1) return { label: "🥈 Silver Curator", color: "bg-gray-300/10 text-gray-300 border-gray-300/20" };
    if (index === 2) return { label: "🥉 Bronze Helper", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" };
    if (contributions > 10) return { label: "🔥 Power Contributor", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
    return { label: "🚀 Early Supporter", color: "bg-white/5 text-gray-400 border-white/10" };
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <Trophy size={14} /> Community Leaderboard
          </div>
          <h1 className="text-5xl font-bold tracking-tight">Meet Our Contributors</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The amazing people who are building the world's best developer ecosystem together.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributors.map((contributor, index) => {
            const badge = getBadge(index, contributor.contributions);
            return (
              <Link 
                key={contributor.login}
                href={`/contributors/${contributor.login}`}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.07] transition-all duration-300 text-center relative overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full group-hover:bg-blue-500/10 transition-colors" />
                
                <div className="relative mb-6">
                  <img 
                    src={contributor.avatar_url} 
                    alt={contributor.login}
                    className="w-20 h-20 rounded-full mx-auto border-2 border-white/10 group-hover:border-blue-500/50 transition-all duration-300"
                  />
                  {index < 3 && (
                    <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#0a0a0a] border border-white/10">
                      <Medal size={16} className={index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-300" : "text-orange-500"} />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{contributor.login}</h3>
                <div className="text-sm text-gray-500 mb-4">{contributor.contributions} Contributions</div>
                
                <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badge.color}`}>
                  {badge.label}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-gray-500 group-hover:text-white transition-colors text-sm">
                  <Globe size={14} />
                  <span>View GitHub</span>
                </div>
              </Link>
            );
          })}
        </div>

        {contributors.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-2xl font-bold mb-2">Be the first to contribute!</h2>
            <p className="text-gray-500">Submit a resource or fix a bug to join our leaderboard.</p>
            <Link 
              href="/submit"
              className="mt-8 inline-block px-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all"
            >
              Start Contributing
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
