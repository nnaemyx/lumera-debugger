"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import TxFailureAnalyzer from "@/components/TxFailureAnalyzer";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-stone-200 font-mono selection:bg-amber-500/30">

      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl mb-8"
        >
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 mb-6 text-[10px] font-mono font-medium text-amber-500 bg-amber-950/20 border border-amber-500/20 rounded-full tracking-widest uppercase">
              System Diagnostic Mode Active
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500">
                TRANSACTION DEBUGGER
              </span>
            </h2>
            <p className="text-sm text-stone-500 max-w-lg mx-auto font-mono leading-relaxed">
              Identify the root cause of failed transactions on the Lumera Network.
              <br />
              <span className="opacity-50">Paste a transaction hash below to begin analysis.</span>
            </p>
          </div>

          <TxFailureAnalyzer />
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
