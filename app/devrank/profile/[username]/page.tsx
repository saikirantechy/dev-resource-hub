import { DEVELOPERS } from "@/lib/devrank/data";
import ProfilePageClient from "@/components/devrank/DevRankProfilePage";

export function generateStaticParams() {
  // Pre-render known profiles for static export
  return DEVELOPERS.map((d) => ({ username: d.username }));
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <ProfilePageClient />
      </div>
    </div>
  );
}
