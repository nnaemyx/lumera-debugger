"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, Lock, Unlock } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-900 bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-green-500 animate-pulse">
            {isConnected ? <Unlock size={24} /> : <Lock size={24} />}
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-green-500 tracking-widest flex items-center gap-2 glitch-text">
              LUMERA_HEX_VAULT
            </h1>
            <p className="text-[10px] text-green-800 font-mono tracking-[0.2em] uppercase">
              Secure Decoding Protocol
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#050505] border border-green-900 text-xs font-mono text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-green-900/20 text-green-700 hover:text-green-500 border border-transparent hover:border-green-800 transition-colors text-xs font-mono"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">DISCONNECT</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#050505] hover:bg-green-900/10 text-green-500 border border-green-700 transition-all font-bold text-xs font-mono disabled:opacity-50 hover:shadow-[0_0_10px_rgba(34,197,94,0.2)]"
            >
              <Wallet size={14} />
              {isLoading ? "QSY_LINK..." : "ACCESS_CONSOLE"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

