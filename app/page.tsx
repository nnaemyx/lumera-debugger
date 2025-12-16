"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import TokenConverter from "@/components/TokenConverter";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow flex flex-col items-center justify-center">

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
            Unit Conversion
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Easily convert between Ether, Gwei, and Wei unit denominations.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <TokenConverter />
        </motion.div>

      </main>

      <footer className="border-t border-gray-200 py-6 mt-auto bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-gray-400 font-medium">
            &copy; 2024 Lumera Network. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
