"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import MetadataViewer from "@/components/MetadataViewer";
import { motion } from "framer-motion";
import { Terminal, Database, FileJson, Layers } from "lucide-react";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#0d1117] text-[#c9d1d9]">
      {/* Background Ambience (Grid) */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-50" />

      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10 flex-grow">

        {/* Intro */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-2 bg-[#1f2428] rounded border border-[#30363d]">
              <Terminal size={24} className="text-[#58a6ff]" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-mono text-[#c9d1d9] tracking-tight">Metadata Inspector</h1>
              <p className="text-xs text-[#8b949e] font-mono">Validate Token URIs and debug metadata structures.</p>
            </div>
          </motion.div>

          {/* Quick Stats / Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Schema", value: "ERC-721", icon: Layers, color: "text-[#d2a8ff]" },
              { label: "Validation", value: "Active", icon: CheckIcon, color: "text-[#238636]" },
              { label: "IPFS Gateway", value: "Online", icon: Database, color: "text-[#58a6ff]" },
              { label: "JSON Parser", value: "Ready", icon: FileJson, color: "text-[#79c0ff]" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#161b22] border border-[#30363d] p-3 rounded-md flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#8b949e] font-mono uppercase mb-0.5">{stat.label}</p>
                  <p className="text-sm font-bold text-[#c9d1d9] font-mono">{stat.value}</p>
                </div>
                <stat.icon size={16} className={stat.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <MetadataViewer />
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#30363d] bg-[#0d1117] py-6 mt-auto">
        <div className="container mx-auto px-6 flex justify-between items-center text-xs font-mono text-[#8b949e]">
          <p>Lumera Inspector v1.0.0-beta</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#238636]"></span>
            System Operational
          </p>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
