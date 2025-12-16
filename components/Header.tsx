"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, Hammer } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-800 bg-[#000000]/90 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-amber-500">
            <Hammer size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-amber-500 tracking-wider flex items-center gap-2">
              LUMERA_TxFORGE
            </h1>
            <p className="text-[10px] text-stone-500 font-mono tracking-widest">
              v2.0.4 :: RAW_TX_BUILDER
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1c1917] border border-stone-800 text-xs font-mono text-stone-400">
                <div className="w-2 h-2 bg-green-500 rounded-sm animate-pulse"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#1c1917] text-stone-500 hover:text-amber-500 border border-transparent hover:border-stone-700 transition-colors text-xs font-mono"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">LOGOUT</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black border border-amber-600 transition-all font-bold text-xs font-mono disabled:opacity-50"
            >
              <Wallet size={14} />
              {isLoading ? "INIT..." : "CONNECT_WALLET"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

