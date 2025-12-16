"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import HexDecoder from "@/components/HexDecoder";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-black text-green-500">

      <div className="scanline"></div>
      <Header />

      <main className="container mx-auto px-4 py-12 relative z-10 flex-grow">

        <div className="text-center mb-10">
          <h2 className="text-2xl font-heading tracking-widest text-green-600 mb-2">
            &lt; DECODE_MODULE /&gt;
          </h2>
          <p className="text-xs font-mono text-green-900">
            Interpret raw bytecode and hex data streams.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HexDecoder />
        </motion.div>

      </main>

      <footer className="border-t border-green-900 bg-black py-6 mt-auto">
        <div className="container mx-auto px-6 text-center select-none">
          <p className="text-[10px] text-green-900 font-mono tracking-widest">
            ENCRYPTED CONNECTION ESTABLISHED // LUMERA_SECURE
          </p>
        </div>
      </footer>
    </div>
  );
}
