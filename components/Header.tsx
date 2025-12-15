"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, Trophy } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050508]/80 backdrop-blur-xl shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
            <Trophy className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-heading tracking-wide">
              LUMERA<span className="text-indigo-400">RANK</span>
            </h1>
            <p className="text-xs text-indigo-300 font-medium tracking-[0.2em] uppercase">
              Official Leaderboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                <span className="text-sm font-mono text-gray-300">
                  {formatAddress(address!)}
                </span>
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all duration-200 font-medium text-sm"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Disconnect</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl transition-all duration-200 font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <Wallet size={18} />
              {isLoading ? "Connecting..." : "Connect Calculator"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

