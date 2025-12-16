"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import CollectionOverview from "@/components/CollectionOverview";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#09090b] text-zinc-100">

      <Header />

      <main className="container mx-auto px-4 py-12 relative z-10 flex-grow">

        {/* Intro */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full mb-4"
          >
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-zinc-400">v2.0 Data Engine Online</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Collection <span className="text-teal-500">Analytics</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-500 max-w-lg mx-auto"
          >
            Upload your collection metadata to visualize trait distributions and identify anomalies.
          </motion.p>
        </div>

        {/* Main Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CollectionOverview />
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-[#09090b] py-8 mt-auto">
        <div className="container mx-auto px-6 flex justify-between items-center text-xs text-zinc-600">
          <p>Lumera Inc. © 2024</p>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Docs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
