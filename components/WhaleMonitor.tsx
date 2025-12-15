"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Radio, Filter, ArrowRight, DollarSign, Database, AlertTriangle } from "lucide-react";

interface WhaleTx {
    id: string;
    hash: string;
    from: string;
    to: string;
    amount: number;
    timestamp: number;
    type: "transfer" | "swap" | "mint";
}

const generateMockTx = (): WhaleTx => ({
    id: Math.random().toString(36).substring(7),
    hash: `0x${Math.random().toString(36).substring(2, 14)}...${Math.random().toString(36).substring(2, 6)}`,
    from: `lumera1${Math.random().toString(36).substring(2, 8)}...`,
    to: `lumera1${Math.random().toString(36).substring(2, 8)}...`,
    amount: Math.floor(Math.random() * 50000) + 1000,
    timestamp: Date.now(),
    type: Math.random() > 0.7 ? "swap" : "transfer",
});

export default function WhaleMonitor() {
    const [transactions, setTransactions] = useState<WhaleTx[]>([]);
    const [threshold, setThreshold] = useState(5000);
    const [isLive, setIsLive] = useState(true);

    // Simulate live feed
    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            if (Math.random() > 0.4) { // Only add some of the time
                const newTx = generateMockTx();
                if (newTx.amount >= threshold) {
                    setTransactions((prev) => [newTx, ...prev].slice(0, 10)); // Keep last 10
                }
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [isLive, threshold]);

    const formatAmount = (amt: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'LUM',
            minimumFractionDigits: 0,
        }).format(amt).replace('LUM', 'LUM ');
    };

    const getTimeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        return `${Math.floor(seconds / 60)}m ago`;
    };

    return (
        <div className="w-full max-w-5xl mx-auto">

            {/* Controls Panel */}
            <div className="glass-panel p-6 rounded-2xl mb-8 border-l-4 border-l-primary flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative">
                        <div className="w-3 h-3 bg-red-500 rounded-full absolute -top-1 -right-1 animate-pulse" />
                        <Activity className="text-primary" size={24} />
                    </div>
                    <div>
                        <h3 className="font-heading font-bold text-lg text-white">Live Feed</h3>
                        <p className="text-xs text-gray-400 font-mono">Monitoring mempool...</p>
                    </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="flex-1 md:w-64">
                        <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
                            <span>Threshold</span>
                            <span>{threshold.toLocaleString()} LUM</span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="50000"
                            step="1000"
                            value={threshold}
                            onChange={(e) => setThreshold(Number(e.target.value))}
                            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <button
                        onClick={() => setIsLive(!isLive)}
                        className={`px-4 py-2 rounded-lg font-mono text-xs border transition-all ${isLive ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                    >
                        {isLive ? 'PAUSE' : 'RESUME'}
                    </button>
                </div>
            </div>

            {/* Radar Visualizer (Decorative) */}
            <div className="relative h-2 w-full bg-slate-800/50 rounded-full mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent w-1/3 animate-[shimmer_2s_infinite_linear]" />
            </div>

            {/* Feed List */}
            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {transactions.map((tx) => (
                        <motion.div
                            key={tx.id}
                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                            className={`glass-panel p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 group hover:border-accent/50 transition-colors border-l-[3px] ${tx.amount > 20000 ? 'border-l-alert' : 'border-l-primary'
                                }`}
                        >
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.amount > 20000 ? 'bg-alert/10 text-alert' : 'bg-primary/10 text-primary'}`}>
                                    {tx.amount > 20000 ? <AlertTriangle size={18} /> : <Database size={18} />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-mono font-bold tracking-wide">{formatAmount(tx.amount)}</span>
                                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                                        {tx.type.toUpperCase()} • {getTimeAgo(tx.timestamp)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end bg-slate-900/50 p-2 rounded-lg border border-slate-800/50">
                                <div className="font-mono text-xs text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                                        {tx.from}
                                    </div>
                                </div>
                                <ArrowRight size={14} className="text-slate-600" />
                                <div className="font-mono text-xs text-primary">
                                    <div className="flex items-center gap-2">
                                        {tx.to}
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block text-right">
                                <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-mono underline decoration-slate-700 underline-offset-4">
                                    View Hash
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {transactions.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        <Radio className="mx-auto w-12 h-12 text-slate-600 mb-4 animate-pulse" />
                        <p className="text-slate-400 font-mono text-sm">Waiting for large transactions...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
