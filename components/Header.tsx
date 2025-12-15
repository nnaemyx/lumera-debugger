"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, Diamond, BarChart3 } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#3b3054] bg-[#0f0a1e]/90 backdrop-blur-md shadow-lg shadow-purple-900/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[#d946ef] to-[#8b5cf6] p-2.5 rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.3)]">
            <Diamond className="text-white" size={22} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
              LUMERA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#06b6d4]">RARITY</span>
            </h1>
            <p className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest">
              Trait Analytics Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1e1b2e] border border-[#3b3054] rounded-lg text-xs font-bold text-[#e2e8f0]">
                <div className="w-2 h-2 bg-[#06b6d4] rounded-full shadow-[0_0_8px_#06b6d4]"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1b2e] hover:bg-[#3b3054] text-[#e2e8f0] border border-[#3b3054] rounded-lg transition-all text-xs font-bold"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">EXIT</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="group relative flex items-center gap-2 px-6 py-2 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg transition-all font-bold text-sm shadow-[0_4px_14px_0_rgba(217,70,239,0.39)] hover:shadow-[0_6px_20px_rgba(217,70,239,0.23)] disabled:opacity-50 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
              <Wallet size={16} />
              {isLoading ? "INITIALIZING..." : "CONNECT"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

