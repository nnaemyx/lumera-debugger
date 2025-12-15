"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import { motion } from "framer-motion";
import { Zap, Crown, Award, TrendingUp } from "lucide-react";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050508] to-[#050508] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

      <Header />

      <main className="container mx-auto px-4 py-12 relative z-10 flex-grow">

        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight"
          >
            <span className="text-white">Lumera</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Rankings</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Discover the top performing addresses on the Lumera network.
            Track real-time statistics for transactions, gas usage, and token volume.
          </motion.p>
        </div>

        {/* Stats Overview (Optional visual flair) */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
          >
            {[
              { label: "Active Addresses", value: "125,402", icon: Crown, color: "text-yellow-400" },
              { label: "24h Transactions", value: "2.4M+", icon: Zap, color: "text-indigo-400" },
              { label: "Total Volume", value: "$450M", icon: TrendingUp, color: "text-emerald-400" },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl flex items-center justify-between group hover:border-indigo-500/30 transition-colors">
                <div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-3xl font-mono font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Main Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Leaderboard />
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#050508] py-8 mt-auto">
        <div className="container mx-auto px-6 text-center text-gray-600 text-sm">
          <p>© 2024 Lumera Foundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
