"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import TransactionInspector from "@/components/TransactionInspector";
import { AlertCircle, FileCode, Search, Zap, Layers, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected, error, connect, isLoading } = useWallet();

  return (
    <div className="min-h-screen bg-[#0d0d17] relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0d0d17] via-[#1a1a2e] to-[#0d0d17] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.10),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.08),transparent_50%)] pointer-events-none" />
      {/* Animated mesh gradient */}
      <div className="fixed inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(6,182,212,0.06)_50%,transparent_70%)] pointer-events-none animate-pulse"></div>
      
      <Header />

      <main className="container mx-auto px-4 py-10 relative z-10">
        {/* ERROR ALERT */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-950/50 border-2 border-red-500/30 rounded-2xl flex items-start gap-3 shadow-lg backdrop-blur-sm"
          >
            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={22} />
            <div>
              <p className="font-semibold text-red-300" style={{ fontFamily: 'var(--font-orbitron)' }}>Connection Error</p>
              <p className="text-sm text-red-400/80 mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Main Content - Always show Transaction Inspector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto"
        >
          <TransactionInspector />
        </motion.div>

        {/* Info Section */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-3xl p-8 border-2 border-cyan-500/20 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-2xl mb-6">
                    <FileCode className="text-cyan-400" size={20} />
                    <span className="text-cyan-300 text-sm font-semibold tracking-wider" style={{ fontFamily: 'var(--font-orbitron)' }}>
                      How It Works
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    Transaction Inspector
                  </h2>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                    Inspect transaction details on Lumera Testnet. Paste a transaction hash to view gas usage, logs, events, and decoded input data. Deep dive into transaction execution details.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { 
                      icon: Search, 
                      title: "Hash Search", 
                      desc: "Paste any transaction hash to instantly view all transaction details including status, gas, and execution data",
                      bgColor: "bg-cyan-500/5",
                      borderColor: "border-cyan-500/20",
                      hoverBorder: "hover:border-cyan-500/40",
                      iconBg: "bg-cyan-500/20",
                      iconBorder: "border-cyan-500/30",
                      iconColor: "text-cyan-400"
                    },
                    { 
                      icon: Zap, 
                      title: "Gas Analysis", 
                      desc: "View detailed gas information including gas used, gas wanted, and transaction fees. Understand transaction costs",
                      bgColor: "bg-sky-500/5",
                      borderColor: "border-sky-500/20",
                      hoverBorder: "hover:border-sky-500/40",
                      iconBg: "bg-sky-500/20",
                      iconBorder: "border-sky-500/30",
                      iconColor: "text-sky-400"
                    },
                    { 
                      icon: Layers, 
                      title: "Events & Logs", 
                      desc: "Explore all events and logs emitted during transaction execution. See decoded messages and raw log data",
                      bgColor: "bg-blue-500/5",
                      borderColor: "border-blue-500/20",
                      hoverBorder: "hover:border-blue-500/40",
                      iconBg: "bg-blue-500/20",
                      iconBorder: "border-blue-500/30",
                      iconColor: "text-blue-400"
                    },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className={`${feature.bgColor} ${feature.borderColor} ${feature.hoverBorder} rounded-2xl p-6 text-center transition-all duration-300`}
                    >
                      <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4 border ${feature.iconBorder}`}>
                        <feature.icon className={feature.iconColor} size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-orbitron)' }}>
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {!isConnected && (
                  <div className="mt-8 text-center">
                    <motion.button
                      onClick={connect}
                      disabled={isLoading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white rounded-xl transition-all duration-300 font-semibold text-base shadow-2xl glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                      <FileCode size={20} />
                      <span>{isLoading ? "Connecting..." : "Connect Wallet to Inspect"}</span>
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
