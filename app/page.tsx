"use client";

import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import QuickActions from "@/components/QuickActions";
import NetworkInfo from "@/components/NetworkInfo";
import Features from "@/components/Features";
import TransferModal from "@/components/TransferModal";
import StakingModal from "@/components/StakingModal";
import HistoryModal from "@/components/HistoryModal";
import AnalyticsModal from "@/components/AnalyticsModal";
import { AlertCircle, Sparkles, Zap, ArrowRight, Shield, TrendingUp, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected, error } = useWallet();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showStakingModal, setShowStakingModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(96,165,250,0.10),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.08),transparent_50%)] pointer-events-none" />
      {/* Animated mesh gradient */}
      <div className="fixed inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(59,130,246,0.06)_50%,transparent_70%)] pointer-events-none animate-pulse"></div>
      {/* Hexagonal pattern */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(59,130,246,0.1) 20px, rgba(59,130,246,0.1) 40px), repeating-linear-gradient(60deg, transparent, transparent 20px, rgba(59,130,246,0.1) 20px, rgba(59,130,246,0.1) 40px), repeating-linear-gradient(120deg, transparent, transparent 20px, rgba(59,130,246,0.1) 20px, rgba(59,130,246,0.1) 40px)`,
      }}></div>
      
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
              <p className="font-semibold text-red-300">Connection Error</p>
              <p className="text-sm text-red-400/80 mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* HERO SECTION - FLUX DESIGN */}
            <div className="mb-20 mt-8">
              <div className="max-w-7xl mx-auto">
                {/* Layered Stacked Cards Layout */}
                <div className="relative min-h-[600px] flex items-center justify-center mb-16">
                  {/* Bottom Card - Layer 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute w-full max-w-3xl bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl p-12 border-2 border-blue-500/20 shadow-2xl backdrop-blur-md"
                    style={{ transform: 'translateY(20px) scale(0.95)' }}
                  >
                    <div className="h-[400px]"></div>
                  </motion.div>

                  {/* Middle Card - Layer 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute w-full max-w-3xl bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl p-12 border-2 border-cyan-500/30 shadow-2xl backdrop-blur-md z-10"
                    style={{ transform: 'translateY(10px) scale(0.97)' }}
                  >
                    <div className="h-[400px]"></div>
                  </motion.div>

                  {/* Top Card - Layer 3 (Main Content) */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative w-full max-w-3xl bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl p-12 border-2 border-blue-500/30 shadow-2xl backdrop-blur-md z-20"
                  >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59,130,246,0.2) 1px, transparent 0)`,
                        backgroundSize: '50px 50px'
                      }}></div>
                    </div>
                    
                    <div className="relative z-10 text-center space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                        <Sparkles className="text-blue-400" size={16} />
                        <span className="text-blue-300 text-xs font-semibold tracking-wider" style={{ fontFamily: 'var(--font-titillium)' }}>
                          Fluid DeFi Experience
                        </span>
                      </div>

                      <h1 
                        className="text-6xl md:text-8xl font-bold text-white leading-tight"
                        style={{ fontFamily: 'var(--font-titillium)' }}
                      >
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                          FLUX
                        </span>
                      </h1>
                      
                      <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto">
                        Flow with the flux of decentralized finance. A fluid platform for staking, governance, and token management on the Cosmos ecosystem.
                      </p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-6"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl transition-all duration-300 font-semibold text-base shadow-2xl glow-primary"
                          style={{ fontFamily: 'var(--font-titillium)' }}
                        >
                          <AlertCircle size={20} />
                          <span>Connect Wallet</span>
                          <ArrowRight size={18} />
                        </motion.button>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-blue-300">
                            <Zap className="text-blue-400" size={18} />
                            <span>Ultra Fast</span>
                          </div>
                          <div className="flex items-center gap-2 text-cyan-300">
                            <Shield className="text-cyan-400" size={18} />
                            <span>Secure</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Side Visual Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 z-30"
                  >
                    <div className="bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-2xl p-8 border-2 border-teal-500/30 flex items-center justify-center w-40 h-40 overflow-hidden relative">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(20,184,166,0.1) 10px, rgba(20,184,166,0.1) 20px)`,
                        }}></div>
                      </div>
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity }
                        }}
                        className="w-32 h-32 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 rounded-xl flex items-center justify-center shadow-2xl glow-primary border-4 border-blue-400/50 relative z-10"
                      >
                        <span className="text-white font-bold text-5xl" style={{ fontFamily: 'var(--font-titillium)' }}>F</span>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Feature Grid - 3 Columns */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid md:grid-cols-3 gap-6 mb-16"
                >
                  {[
                    { icon: Shield, title: "Advanced Security", desc: "Multi-layer protection", gradient: "from-blue-500 to-blue-600", delay: 0.8 },
                    { icon: TrendingUp, title: "Smart Staking", desc: "Maximize returns", gradient: "from-cyan-500 to-cyan-600", delay: 0.9 },
                    { icon: Globe, title: "Cross-Chain", desc: "IBC compatible", gradient: "from-teal-500 to-teal-600", delay: 1.0 },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: feature.delay }}
                      className="bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-2xl p-8 border-2 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 group text-center"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg glow-primary group-hover:rotate-12 transition-transform duration-300`}>
                        <feature.icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-titillium)' }}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* INFO CARDS */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <NetworkInfo />
              <Features />
            </div>

            {/* GETTING STARTED */}
            <div className="bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl p-10 border-2 border-blue-500/20 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: 'var(--font-titillium)' }}>
                  Getting Started
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {["Install Keplr Wallet browser extension","Click 'Connect Keplr' in the header","Cosmos network will be added automatically","Start managing, staking & transacting tokens"].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-start gap-4 group p-4 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center text-base font-bold shadow-lg glow-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" style={{ fontFamily: 'var(--font-titillium)' }}>
                        {i + 1}
                      </span>
                      <span className="leading-relaxed text-base font-normal pt-3 text-gray-300 group-hover:text-white transition-colors">
                        {i === 0 ? (
                          <>
                            Install <a href="https://www.keplr.app/" target="_blank" rel="noopener noreferrer" className="underline text-blue-400 font-semibold hover:text-cyan-400 transition-colors">Keplr Wallet</a> browser extension
                          </>
                        ) : step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            <BalanceCard />

            <QuickActions
              onTransfer={() => setShowTransferModal(true)}
              onStake={() => setShowStakingModal(true)}
              onHistory={() => setShowHistoryModal(true)}
              onAnalytics={() => setShowAnalyticsModal(true)}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <NetworkInfo />
              <Features />
            </div>
          </motion.div>
        )}
      </main>

      {/* MODALS */}
      <TransferModal isOpen={showTransferModal} onClose={() => setShowTransferModal(false)} />
      <StakingModal isOpen={showStakingModal} onClose={() => setShowStakingModal(false)} />
      <HistoryModal isOpen={showHistoryModal} onClose={() => setShowHistoryModal(false)} />
      <AnalyticsModal isOpen={showAnalyticsModal} onClose={() => setShowAnalyticsModal(false)} />
    </div>
  );
}
