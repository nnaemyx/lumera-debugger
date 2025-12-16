"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import TransactionBuilder from "@/components/TransactionBuilder";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#000000] text-stone-300">

      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10 flex-grow">

        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="text-[10px] text-stone-600 font-mono">[SYSTEM_STATUS: ONLINE]</span>
            <span className="text-[10px] text-green-600 font-mono">[NODE: CONNECTED]</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <TransactionBuilder />
        </motion.div>

      </main>

      <footer className="border-t border-stone-900 bg-[#000000] py-4 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] text-stone-700 font-mono">LUMERA_SYSTEMS // TERMINAL_ACCESS_GRANTED</p>
        </div>
      </footer>
    </div>
  );
}
