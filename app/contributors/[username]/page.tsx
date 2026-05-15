import Link from "next/link";
import { GitFork, Globe, MessageCircle, Mail, ArrowLeft, Star, Award, Zap } from "lucide-react";

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  html_url: string;
  blog?: string;
  twitter_username?: string;
}

async function getGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// For static export, we need to know which paths to generate.
// For now, we'll return an empty array or pre-populate with known top contributors.
export async function generateStaticParams() {
  // In a real scenario, you'd fetch the contributor list and return the logins.
  // For the sake of the demo, we'll include the owner.
  return [{ username: "saikirantechy" }];
}

export default async function ContributorProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await getGitHubUser(username);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <div className="text-6xl">🔍</div>
          <h1 className="text-3xl font-bold">Contributor not found</h1>
          <Link href="/contributors" className="text-blue-400 hover:underline">Back to leaderboard</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-600/10 to-transparent blur-3xl -z-10" />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <Link href="/contributors" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Leaderboard
        </Link>

        <header className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
          <img 
            src={user.avatar_url} 
            alt={user.login}
            className="w-40 h-40 rounded-3xl border-4 border-white/10 shadow-2xl"
          />
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <h1 className="text-5xl font-black tracking-tight">{user.name || user.login}</h1>
              <p className="text-xl text-blue-400 font-medium">@{user.login}</p>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              {user.bio || "This contributor is helping build the future of the Dev Resource Hub ecosystem."}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link href={user.html_url} target="_blank" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-400 hover:text-white">
                <GitFork size={20} />
              </Link>
              {user.blog && (
                <Link href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-400 hover:text-white">
                  <Globe size={20} />
                </Link>
              )}
              {user.twitter_username && (
                <Link href={`https://twitter.com/${user.twitter_username}`} target="_blank" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-400 hover:text-white">
                  <MessageCircle size={20} />
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-1">
            <div className="text-2xl font-bold">{user.public_repos}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Repositories</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-1">
            <div className="text-2xl font-bold">{user.followers}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Followers</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-1">
            <div className="text-2xl font-bold text-yellow-500">Elite</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Rank</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-1">
            <div className="text-2xl font-bold text-green-500">Active</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Status</div>
          </div>
        </div>

        {/* Contribution Highlights */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="text-blue-500" /> Contribution Badges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-4">
              <Zap className="text-blue-400" />
              <div>
                <div className="text-sm font-bold">Fast Mover</div>
                <div className="text-xs text-gray-500">Merged PR within 24h</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-4">
              <Star className="text-purple-400" />
              <div>
                <div className="text-sm font-bold">Quality First</div>
                <div className="text-xs text-gray-500">High impact resources</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-4">
              <Award className="text-orange-400" />
              <div>
                <div className="text-sm font-bold">Early Adopter</div>
                <div className="text-xs text-gray-500">Joined in Phase 1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
