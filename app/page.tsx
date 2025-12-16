"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import ABIVisualizer from "@/components/ABIVisualizer";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#f8fafc] text-slate-800">

      <Header />

      <main className="container mx-auto px-4 py-6 relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ABIVisualizer />
        </motion.div>
      </main>

    </div>
  );
}
