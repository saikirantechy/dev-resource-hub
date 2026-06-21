"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, RotateCcw, Globe, Search, Bell } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { saveSystemSettings, getSystemSettings } from "@/lib/admin/storage";

export default function AdminSettingsPage() {
  const { settings, logAction } = useAdmin();
  const [activeTab, setActiveTab] = useState<"general" | "seo" | "features" | "analytics">("general");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ ...settings });

  const handleSave = () => {
    saveSystemSettings({ ...form, version: form.version + 1, updatedAt: new Date().toISOString() });
    logAction("update", "settings", undefined, "System settings updated");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setForm({ ...getSystemSettings() });
  };

  const TABS = [
    { id: "general" as const, label: "General", icon: Settings },
    { id: "seo" as const, label: "SEO", icon: Search },
    { id: "features" as const, label: "Features", icon: Globe },
    { id: "analytics" as const, label: "Analytics", icon: Bell },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Settings size={24} className="text-gray-400" /> Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Platform configuration</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleReset} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            <RotateCcw size={14} /> Reset
          </button>
          <button onClick={handleSave} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2">
            <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl bg-white/5 border border-white/5">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id ? "bg-blue-500/20 text-blue-400" : "text-gray-500 hover:text-white"
            }`}>
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl glass border border-white/5 space-y-6">
        {activeTab === "general" && (
          <div className="space-y-5">
            <h2 className="text-sm font-black">General Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Site Name</label>
                <input type="text" value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Primary Color</label>
                <div className="flex gap-2">
                  <input type="color" value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 cursor-pointer" />
                  <input type="text" value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Site Description</label>
              <textarea value={form.siteDescription} onChange={(e) => setForm({ ...form, siteDescription: e.target.value })}
                rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-5">
            <h2 className="text-sm font-black">SEO Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Default Title</label>
                <input type="text" value={form.seo.defaultTitle} onChange={(e) => setForm({ ...form, seo: { ...form.seo, defaultTitle: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Default Description</label>
                <textarea value={form.seo.defaultDescription} onChange={(e) => setForm({ ...form, seo: { ...form.seo, defaultDescription: e.target.value } })}
                  rows={2} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">OG Image URL</label>
                  <input type="text" value={form.seo.ogImage || ""} onChange={(e) => setForm({ ...form, seo: { ...form.seo, ogImage: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Twitter Handle</label>
                  <input type="text" value={form.seo.twitterHandle || ""} onChange={(e) => setForm({ ...form, seo: { ...form.seo, twitterHandle: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-5">
            <h2 className="text-sm font-black">Feature Toggles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {([
                ["enableComments", "Comments"],
                ["enableRatings", "Ratings"],
                ["enableBookmarks", "Bookmarks"],
                ["enableNewsletter", "Newsletter"],
                ["enableCommunity", "Community"],
                ["enableMarketplace", "Marketplace"],
              ] as const).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] cursor-pointer">
                  <span className="text-sm font-medium">{label}</span>
                  <div className={`w-10 h-6 rounded-full relative transition-all ${form.features[key] ? "bg-blue-500" : "bg-white/10"}`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${form.features[key] ? "left-5" : "left-1"}`} />
                    <input type="checkbox" checked={form.features[key]} onChange={(e) => setForm({ ...form, features: { ...form.features, [key]: e.target.checked } })}
                      className="sr-only" />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-5">
            <h2 className="text-sm font-black">Analytics Integration</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Google Analytics ID</label>
                <input type="text" value={form.analytics.googleAnalyticsId || ""} onChange={(e) => setForm({ ...form, analytics: { ...form.analytics, googleAnalyticsId: e.target.value } })}
                  placeholder="G-XXXXXXXXXX" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Plausible URL</label>
                <input type="text" value={form.analytics.plausibleUrl || ""} onChange={(e) => setForm({ ...form, analytics: { ...form.analytics, plausibleUrl: e.target.value } })}
                  placeholder="https://plausible.io/js/script.js" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
