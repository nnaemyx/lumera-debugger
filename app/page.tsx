"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import RarityCalculator from "@/components/RarityCalculator";
import { motion } from "framer-motion";
import { TrendingUp, Users, Award, Crown } from "lucide-react";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#0f0a1e] text-[#e2e8f0]">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#d946ef_0%,transparent_25%)] opacity-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#06b6d4] blur-[150px] opacity-10 pointer-events-none" />

      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10 flex-grow">

        {/* Collection Stats Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d946ef] to-[#8b5cf6] p-0.5">
              <div className="w-full h-full bg-[#0f0a1e] rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="text-2xl font-black text-white">NG</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading text-white">Neon Genesis</h1>
              <div className="flex items-center gap-3 text-sm text-[#94a3b8] font-bold">
                <span className="flex items-center gap-1"><Users size={14} /> 4.2k Owners</span>
                <span className="w-1 h-1 rounded-full bg-[#3b3054]"></span>
                <span className="flex items-center gap-1"><Crown size={14} className="text-[#fbbf24]" /> Floor: 450 LUM</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Assets Ranked", value: "10,000", icon: Award, color: "text-[#d946ef]" },
              { label: "Highest Score", value: "845.2", icon: TrendingUp, color: "text-[#06b6d4]" },
              { label: "Traits Indexed", value: "142", icon: Crown, color: "text-[#fbbf24]" },
              { label: "Status", value: "Live Sync", icon: Users, color: "text-[#22c55e]" },
            ].map((stat, i) => (
              <div key={i} className="card-gradient p-4 rounded-xl border border-[#3b3054] flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#94a3b8] font-bold uppercase mb-1 tracking-wider">{stat.label}</p>
                  <p className="text-lg font-black text-white">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <RarityCalculator />
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#3b3054] bg-[#0f0a1e] py-6 mt-auto">
        <div className="container mx-auto px-6 text-center text-xs font-bold text-[#584b7a] uppercase tracking-widest">
          <p>Powered by Lumera Rarity Protocol</p>
        </div>
      </footer>
    </div>
  );
}
