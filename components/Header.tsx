"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, Sparkles } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#333] bg-[#111]/95 backdrop-blur-md">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-[#d4af37] rounded-sm flex items-center justify-center bg-[#1a1a1a]">
            <Sparkles className="text-[#d4af37]" size={20} />
          </div>
          <div>
            <h1 className="text-xl text-white font-heading tracking-[0.1em]">
              LUMERA <span className="text-[#d4af37]">GALLERY</span>
            </h1>
            <p className="text-[9px] text-[#888] font-body uppercase tracking-[0.3em]">
              Curated Digital Assets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-sm text-xs font-body tracking-wide text-[#ccc]">
                <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-4 py-2 bg-transparent text-[#888] hover:text-white transition-colors text-xs uppercase tracking-widest font-heading border border-transparent hover:border-[#333]"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-3 px-6 py-2.5 bg-[#d4af37] hover:bg-[#b8982f] text-black transition-all duration-300 font-bold text-xs font-heading tracking-widest uppercase rounded-sm disabled:opacity-50"
            >
              <Wallet size={16} />
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

