"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, PieChart, Activity } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg">
            <PieChart className="text-teal-500" size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-100 flex items-center gap-2 tracking-tight">
              LUMERA <span className="text-zinc-500">/</span> TRAITS
            </h1>
            <p className="text-[10px] text-zinc-500 font-medium">
              Collection Analytics Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-mono text-zinc-400">
                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-md transition-colors text-xs font-medium border border-transparent hover:border-zinc-700"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-1.5 bg-zinc-100 hover:bg-white text-black border border-zinc-200 rounded-md transition-all font-bold text-xs disabled:opacity-50 shadow-sm hover:shadow-md"
            >
              <Wallet size={14} />
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

