"use client";

import React, { useEffect, useState } from "react";
import { getUnconfirmedTxs, TransactionDetail } from "@/lib/cosmos-client";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Clock, Activity, Hash, Database } from "lucide-react";

export default function MempoolFeed() {
    const [transactions, setTransactions] = useState<TransactionDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [error, setError] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    const fetchMempool = async () => {
        if (isPaused) return;
        try {
            const txs = await getUnconfirmedTxs(50);
            // Only update if we have new data or if it's the first load
            // For a real feed, we might want to append, but for now replacing is cleaner for "snapshot" view
            setTransactions(txs);
            setLastUpdated(new Date());
            setError(null);
        } catch (err) {
            console.error("Failed to fetch mempool:", err);
            setError("Failed to fetch mempool data. Retrying...");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMempool();
        const interval = setInterval(fetchMempool, 2000); // Poll every 2 seconds
        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 blur-sm opacity-50 rounded-full animate-pulse"></div>
                        <div className="relative bg-black border border-emerald-500/30 p-2 rounded-lg text-emerald-400">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wider font-mono">
                            LIVE_MEMPOOL
                        </h2>
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500/80">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            EST. TPS: {Math.max(1, Math.floor(transactions.length / 5))} (Simulated)
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${isPaused
                                ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20"
                                : "bg-emerald-500/10 border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/20"
                            }`}
                    >
                        {isPaused ? "RESUME" : "PAUSE"}
                    </button>
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                            Last Update
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                            {lastUpdated.toLocaleTimeString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-emerald-900/10">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 bg-gray-900/50 text-xs font-mono text-gray-500 uppercase tracking-wider">
                    <div className="col-span-6 md:col-span-5 flex items-center gap-2">
                        <Hash size={12} /> Transaction Hash
                    </div>
                    <div className="col-span-3 md:col-span-2 flex items-center gap-2">
                        <Database size={12} /> Size
                    </div>
                    <div className="col-span-3 md:col-span-3 flex items-center gap-2">
                        <Clock size={12} /> Time
                    </div>
                    <div className="hidden md:block md:col-span-2 text-right">Status</div>
                </div>

                <div className="relative min-h-[400px]">
                    {loading && transactions.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-4">
                            <RefreshCw className="animate-spin" size={24} />
                            <p className="text-xs font-mono">SCANNING NETWORK...</p>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-2">
                            <p className="font-mono text-emerald-500/20 text-4xl">EMPTY</p>
                            <p className="text-xs font-mono text-gray-500">Waiting for transactions...</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-800/50">
                            <AnimatePresence mode="popLayout">
                                {transactions.map((tx) => (
                                    <motion.div
                                        key={tx.hash}
                                        layout
                                        initial={{ opacity: 0, x: -20, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                                        animate={{ opacity: 1, x: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-800/30 transition-colors group cursor-pointer"
                                    >
                                        <div className="col-span-6 md:col-span-5 font-mono text-sm text-emerald-400 group-hover:text-emerald-300 truncate">
                                            {tx.hash}
                                        </div>
                                        <div className="col-span-3 md:col-span-2 font-mono text-xs text-gray-400">
                                            {tx.memo || "248 bytes"}
                                        </div>
                                        <div className="col-span-3 md:col-span-3 font-mono text-xs text-gray-500">
                                            {new Date(tx.timestamp).toLocaleTimeString()}
                                        </div>
                                        <div className="hidden md:block md:col-span-2 text-right">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 animate-pulse">
                                                PENDING
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-[10px] text-gray-600 font-mono">
                <div>
                    RPC: {process.env.NEXT_PUBLIC_RPC_URL || "Connected to Lumera Testnet"}
                </div>
                <div>
                    V 1.0.0
                </div>
            </div>
        </div>
    );
}
