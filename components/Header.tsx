"use client";

import { useWallet } from "@/contexts/WalletContext";
import { Wallet, LogOut, Code2, Terminal } from "lucide-react";

export default function Header() {
  const { address, isConnected, connect, disconnect, isLoading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#30363d] bg-[#161b22]">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#21262d] p-2 rounded-md border border-[#30363d]">
            <Code2 className="text-[#c9d1d9]" size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#c9d1d9] font-mono flex items-center gap-2">
              lumera/<span className="text-[#58a6ff]">metadata-inspector</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#0d1117] border border-[#30363d] rounded text-xs font-mono text-[#8b949e]">
                <div className="w-2 h-2 bg-[#238636] rounded-full"></div>
                {formatAddress(address!)}
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] rounded transition-colors text-xs font-mono"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Disc.</span>
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white border border-[rgba(240,246,252,0.1)] rounded transition-all font-medium text-xs font-mono disabled:opacity-50"
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

