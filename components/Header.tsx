"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, Activity } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-emerald-500 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 font-mono">
              <span className="text-amber-500">LUMERA</span>
              <span className="text-slate-400">DEBUGGER</span>
            </h1>
            <div className="hidden md:flex items-center space-x-1 text-[10px] font-mono uppercase tracking-widest text-amber-500/80 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              FAILURE ANALYSIS
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-full text-xs font-mono text-gray-300">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-colors text-xs font-mono border border-transparent hover:border-red-500/20"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">DISCONNECT</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all font-medium text-xs font-mono disabled:opacity-50 border border-emerald-400/20"
            >
              <Wallet size={14} />
              {isLoading ? "CONNECTING..." : "CONNECT WALLET"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

