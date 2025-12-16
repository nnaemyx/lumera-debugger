"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, Calculator, Coins } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg">
            <Calculator size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 tracking-tight">
              Lumera UnitCalc
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Web3 Token Converter
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-mono text-gray-600">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-700 rounded-lg transition-colors text-xs font-medium"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all font-medium text-xs disabled:opacity-50"
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

