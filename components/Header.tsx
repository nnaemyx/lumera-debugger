"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, ServerCrash, Activity } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0f172a]/90 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center shadow-lg border border-emerald-500/20">
            <Activity className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              LUMERA <span className="text-emerald-400">SENTINEL</span>
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[10px] text-slate-400 font-mono font-medium tracking-wider uppercase">
                System Online
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-300">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded transition-all duration-200 font-medium text-xs font-mono"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Disc.</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-all duration-200 font-medium text-xs font-mono shadow-lg shadow-emerald-900/20 disabled:opacity-50"
            >
              <Wallet size={16} />
              {isLoading ? "Connecting..." : "Connect Node"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

