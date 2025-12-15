"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Activity, Fuel, ArrowRightLeft, Search, Copy, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

type RankingCategory = "transactions" | "gas_used" | "token_transfers";

interface AddressData {
  rank: number;
  address: string;
  transactions: number;
  gasUsed: string;
  transfers: number;
  volume: string;
  change: number; // Positive or negative change in rank
}

const MOCK_DATA: AddressData[] = Array.from({ length: 20 }).map((_, i) => ({
  rank: i + 1,
  address: `lumera1${Math.random().toString(36).substring(2, 11)}...${Math.random().toString(36).substring(2, 6)}`,
  transactions: Math.floor(Math.random() * 10000) + 500,
  gasUsed: `${(Math.random() * 5).toFixed(2)}M`,
  transfers: Math.floor(Math.random() * 5000) + 100,
  volume: `$${(Math.random() * 100000).toFixed(2)}`,
  change: Math.floor(Math.random() * 10) - 5,
}));

export default function Leaderboard() {
  const [category, setCategory] = useState<RankingCategory>("transactions");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filtering and Sorting
  const filteredData = MOCK_DATA.filter((item) =>
    item.address.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    let valA, valB;
    switch (category) {
      case "transactions":
        valA = a.transactions;
        valB = b.transactions;
        break;
      case "gas_used":
        valA = parseFloat(a.gasUsed);
        valB = parseFloat(b.gasUsed);
        break;
      case "token_transfers":
        valA = a.transfers;
        valB = b.transfers;
        break;
      default:
        valA = a.rank;
        valB = b.rank;
    }
    return sortDirection === "desc" ? valB - valA : valA - valB;
  });

  const getCategoryIcon = (cat: RankingCategory) => {
    switch (cat) {
      case "transactions": return <Activity className="w-5 h-5" />;
      case "gas_used": return <Fuel className="w-5 h-5" />;
      case "token_transfers": return <ArrowRightLeft className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = (cat: RankingCategory) => {
    switch (cat) {
      case "transactions": return "Transactions";
      case "gas_used": return "Gas Used";
      case "token_transfers": return "Token Transfers";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Controls Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        
        {/* Category Tabs */}
        <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
          {(["transactions", "gas_used", "token_transfers"] as RankingCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                category === cat ? "text-white shadow-lg" : "text-gray-400 hover:text-white"
              }`}
            >
              {category === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/20 border border-primary/50 rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {getCategoryIcon(cat)}
                {getCategoryLabel(cat)}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative group w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-primary/50 transition-all duration-300 sm:text-sm"
            placeholder="Search Address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4 font-mono">Rank</th>
                <th className="px-6 py-4 font-mono">Address</th>
                <th className="px-6 py-4 font-mono text-right cursor-pointer hover:text-primary transition-colors" onClick={() => setSortDirection(prev => prev === "desc" ? "asc" : "desc")}>
                  <div className="flex items-center justify-end gap-1">
                    {getCategoryLabel(category)}
                    {sortDirection === "desc" ? <ChevronDown size={14}/> : <ChevronUp size={14}/>}
                  </div>
                </th>
                <th className="px-6 py-4 font-mono text-right">Change (24h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredData.map((item, index) => (
                  <motion.tr
                    key={item.address}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold font-mono ${
                        index === 0 ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50" :
                        index === 1 ? "bg-gray-400/20 text-gray-300 border border-gray-400/50" :
                        index === 2 ? "bg-orange-700/20 text-orange-400 border border-orange-700/50" :
                        "text-gray-500"
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-300 group-hover:text-primary transition-colors cursor-pointer text-sm md:text-base">
                          {item.address}
                        </span>
                        <button className="text-gray-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                          <Copy size={14} />
                        </button>
                        <button className="text-gray-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-lg font-bold font-mono text-white">
                        {category === "transactions" && item.transactions.toLocaleString()}
                        {category === "gas_used" && item.gasUsed}
                        {category === "token_transfers" && item.transfers.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        {category === "transactions" && " txns"}
                        {category === "gas_used" && " LUM"}
                        {category === "token_transfers" && " transfers"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`text-sm font-mono font-bold flex items-center justify-end gap-1 ${
                        item.change > 0 ? "text-green-400" : item.change < 0 ? "text-red-400" : "text-gray-500"
                      }`}>
                         {item.change > 0 ? <ChevronUp size={14}/> : item.change < 0 ? <ChevronDown size={14}/> : null}
                         {Math.abs(item.change)}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No addresses found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
