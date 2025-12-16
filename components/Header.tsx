"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, Cuboid, Box } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f172a]/95 backdrop-blur border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-primary bg-primary/10 p-2 rounded-lg">
            <Cuboid size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-100 items-center gap-2">
              LUMERA <span className="text-primary">BLOCK_LAB</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider">
              CONSENSUS SIMULATOR v1.0
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 text-xs font-mono text-blue-400 rounded-md">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-800 text-slate-500 hover:text-slate-300 border border-transparent hover:border-slate-700 transition-colors text-xs font-bold rounded-md"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">EXIT LAB</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-lg shadow-blue-500/20 transition-all font-bold text-xs font-mono disabled:opacity-50"
            >
              <Wallet size={14} />
              {isLoading ? "INIT..." : "CONNECT WALLET"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

