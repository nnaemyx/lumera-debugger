"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import WhaleMonitor from "@/components/WhaleMonitor";
import { motion } from "framer-motion";
import { Radar, Target, Radio } from "lucide-react";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Ambience (Sonar Mesh) */}
      <div className="fixed inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none" />

      <Header />

      <main className="container mx-auto px-4 py-12 relative z-10 flex-grow">

        {/* Radar Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Animated Radar Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none opacity-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary/50 rounded-full blur-md" />
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-4 tracking-tight"
          >
            <span className="text-white">WHALE</span>
            <span className="text-primary glow-box inline-block mx-2 px-2 rounded">WATCH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-mono text-sm md:text-base max-w-xl mx-auto uppercase tracking-wider"
          >
            Monitoring high-value transfers on Lumera Testnet
          </motion.p>
        </div>

        {/* Status Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12"
        >
          {[
            { label: "Mempool Status", value: "Active", icon: ActivityIcon, color: "text-emerald-400" },
            { label: "Total Whales", value: "142", icon: Target, color: "text-primary" },
            { label: "Alert Level", value: "Normal", icon: Radio, color: "text-cyan-400" },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl font-heading font-bold text-white tracking-wide">{stat.value}</p>
              </div>
              <stat.icon className={stat.color} size={20} />
            </div>
          ))}
        </motion.div>

        {/* Main Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <WhaleMonitor />
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#020617] py-6 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-600 text-xs font-mono">
            System Status: <span className="text-emerald-500">OPERATIONAL</span> | v2.1.0-RC
          </p>
        </div>
      </footer>
    </div>
  );
}

function ActivityIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
