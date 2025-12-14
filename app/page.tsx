"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import WalletProfitLossTracker from "@/components/WalletProfitLossTracker";
import { AlertCircle, BarChart3, TrendingUp, Target, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected, error, connect, isLoading } = useWallet();

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(52,211,153,0.10),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(110,231,183,0.08),transparent_50%)] pointer-events-none" />
      {/* Animated mesh gradient */}
      <div className="fixed inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(16,185,129,0.06)_50%,transparent_70%)] pointer-events-none animate-pulse"></div>
      
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
              <p className="font-semibold text-red-300" style={{ fontFamily: 'var(--font-outfit)' }}>Connection Error</p>
              <p className="text-sm text-red-400/80 mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Main Content - Always show Profit & Loss Tracker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto"
        >
          <WalletProfitLossTracker />
        </motion.div>

        {/* Info Section */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="bg-gradient-to-br from-[#161b22] to-[#1f2937] rounded-3xl p-8 border-2 border-emerald-500/20 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl mb-6">
                    <BarChart3 className="text-emerald-400" size={20} />
                    <span className="text-emerald-300 text-sm font-semibold tracking-wider" style={{ fontFamily: 'var(--font-outfit)' }}>
                      How It Works
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                    Profit & Loss Tracking
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Track wallet performance by comparing starting balances vs current balances. Monitor your portfolio&apos;s profit and loss with detailed analytics on Lumera Testnet.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { 
                      icon: Target, 
                      title: "Set Baseline", 
                      desc: "Add wallets to start tracking. The current balance becomes your starting point for comparison",
                      bgColor: "bg-emerald-500/5",
                      borderColor: "border-emerald-500/20",
                      hoverBorder: "hover:border-emerald-500/40",
                      iconBg: "bg-emerald-500/20",
                      iconBorder: "border-emerald-500/30",
                      iconColor: "text-emerald-400"
                    },
                    { 
                      icon: TrendingUp, 
                      title: "Track Performance", 
                      desc: "Monitor profit and loss in real-time. See percentage changes and absolute differences for each token",
                      bgColor: "bg-green-500/5",
                      borderColor: "border-green-500/20",
                      hoverBorder: "hover:border-green-500/40",
                      iconBg: "bg-green-500/20",
                      iconBorder: "border-green-500/30",
                      iconColor: "text-green-400"
                    },
                    { 
                      icon: BarChart3, 
                      title: "Analytics Dashboard", 
                      desc: "View comprehensive analytics including total P&L, token-by-token breakdown, and tracking duration",
                      bgColor: "bg-teal-500/5",
                      borderColor: "border-teal-500/20",
                      hoverBorder: "hover:border-teal-500/40",
                      iconBg: "bg-teal-500/20",
                      iconBorder: "border-teal-500/30",
                      iconColor: "text-teal-400"
                    },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className={`${feature.bgColor} ${feature.borderColor} ${feature.hoverBorder} rounded-2xl p-6 text-center transition-all duration-300`}
                    >
                      <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4 border ${feature.iconBorder}`}>
                        <feature.icon className={feature.iconColor} size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
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
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl transition-all duration-300 font-semibold text-base shadow-2xl glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      <BarChart3 size={20} />
                      <span>{isLoading ? "Connecting..." : "Connect Wallet to Start Tracking"}</span>
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
