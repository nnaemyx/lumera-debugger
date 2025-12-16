"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, FileCode, BookOpen } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-1.5 rounded-md text-white">
            <FileCode size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight leading-none">
              Lumera DocGen
            </h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
              Smart Contract Documentation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono text-slate-600">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 text-slate-600 rounded transition-colors text-xs font-medium"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded shadow-sm transition-all font-medium text-xs disabled:opacity-50"
            >
              <Wallet size={14} />
              {isLoading ? "..." : "Connect"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

