"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import MempoolFeed from "@/components/MempoolFeed";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-gray-200 font-sans selection:bg-emerald-500/30">

      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl mb-8"
        >
          <div className="text-center mb-10 pt-8">
            <div className="inline-block px-3 py-1 mb-4 text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 rounded-full tracking-widest uppercase">
              System Status: Operational
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                REAL-TIME
              </span> MEMPOOL
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto font-mono">
              Monitoring unconfirmed transactions on Lumera Testnet.
              <br />
              <span className="opacity-50">Validating consensus integrity.</span>
            </p>
          </div>

          <MempoolFeed />
        </motion.div>

      </main>

      <footer className="border-t border-gray-800 py-6 mt-auto bg-[#0a0a0a]">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
            &copy; 2024 Lumera Network &bull; Live Operations
          </p>
        </div>
      </footer>
    </div>
  );
}
