"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import BlockSimulator from "@/components/BlockSimulator";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-slate-100 mb-4">
            Blockchain Internals Training
          </h2>
          <p className="text-sm font-mono text-slate-400 max-w-2xl mx-auto">
            Experiment with the fundamental mechanics of block hashing. Change the data, observe the hash break, and mine a new nonce to restore chain validity.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BlockSimulator />
        </motion.div>

      </main>

      <footer className="border-t border-slate-800 py-8 mt-auto bg-slate-900">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-slate-600 font-mono">
            LUMERA EDUCATION INITIATIVE // OPEN SOURCE
          </p>
        </div>
      </footer>
    </div>
  );
}
