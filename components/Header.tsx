"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, Radar } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-sonar"></div>
            <div className="relative z-10 w-full h-full bg-gradient-to-br from-cyan-600 to-blue-700 rounded-lg flex items-center justify-center border border-cyan-400/30">
              <Radar className="text-white" size={20} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-heading tracking-wider">
              WHALE<span className="text-primary">WATCH</span>
            </h1>
            <p className="text-[10px] text-cyan-300 font-mono tracking-widest uppercase opacity-70">
              Lumera Network
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-slate-700 rounded-lg backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                <span className="text-xs font-mono text-slate-300">
                  {formatAddress(address!)}
                </span>
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded-lg transition-all duration-200 font-medium text-xs font-mono"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Disconnect</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all duration-200 font-medium text-xs font-mono shadow-lg shadow-cyan-900/20 disabled:opacity-50"
            >
              <Wallet size={16} />
              {isLoading ? "Connecting..." : "Connect Radar"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

