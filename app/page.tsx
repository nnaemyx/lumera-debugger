"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import NFTGallery from "@/components/NFTGallery";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#111]">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f1f1f] via-[#111] to-[#000] pointer-events-none" />

      <Header />

      <main className="container mx-auto px-4 py-12 relative z-10 flex-grow">

        {/* Intro / Hero */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#d4af37] font-body text-xs uppercase tracking-[0.4em] mb-4">The Collection</p>
            <h1 className="text-5xl md:text-7xl font-heading font-light text-white tracking-widest mb-6">
              DIGITAL <span className="italic font-serif text-[#888]">ARTIFACTS</span>
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
          </motion.div>
        </div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#333] to-[#d4af37] mb-4" />
              <p className="text-[#666] font-heading font-light text-xl">Connect wallet to view your collection</p>
            </div>
          ) : (
            <NFTGallery />
          )}
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#222] bg-[#0a0a0a] py-12 mt-auto">
        <div className="container mx-auto px-6 text-center text-[#444] text-[10px] uppercase tracking-[0.2em] font-body">
          <p>© 2024 Lumera Foundation. Curated by Cyber Jay.</p>
        </div>
      </footer>
    </div>
  );
}
