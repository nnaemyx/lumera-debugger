"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Server, Activity, RefreshCw, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";

interface NodeStatus {
    id: string;
    name: string;
    url: string;
    status: "active" | "degraded" | "down" | "checking";
    latency: number; // in ms
    history: number[]; // last 10 latency checks
    blockHeight: number;
}

const INITIAL_NODES: NodeStatus[] = [
    { id: "1", name: "Lumera Testnet 1", url: "https://rpc-testnet.lumera.foundation", status: "checking", latency: 0, history: [], blockHeight: 0 },
    { id: "2", name: "Validator A Primary", url: "https://val-a.lumera.network", status: "checking", latency: 0, history: [], blockHeight: 0 },
    { id: "3", name: "Validator B Backup", url: "https://val-b.lumera.network", status: "checking", latency: 0, history: [], blockHeight: 0 },
    { id: "4", name: "Public Node EU", url: "https://public-eu.lumera.io", status: "checking", latency: 0, history: [], blockHeight: 0 },
    { id: "5", name: "Public Node US", url: "https://public-us.lumera.io", status: "checking", latency: 0, history: [], blockHeight: 0 },
];

export default function NodeMonitor() {
    const [nodes, setNodes] = useState<NodeStatus[]>(INITIAL_NODES);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const checkNodeStatus = async (node: NodeStatus): Promise<Partial<NodeStatus>> => {
        // Simulate checking status (Real implementations would use fetch/axios with timeout)
        // We add a random delay to simulate network latency
        const start = Date.now();
        await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 50));
        const end = Date.now();
        const latency = end - start;

        const random = Math.random();
        let status: NodeStatus["status"] = "active";
        let blockHeight = 1254032;

        if (random > 0.9) status = "down";
        else if (random > 0.7 || latency > 500) status = "degraded";

        if (status !== "down") {
            blockHeight += Math.floor(Math.random() * 5); // Allow slight drift
        } else {
            blockHeight = 0;
        }

        return {
            status,
            latency: status === "down" ? 0 : latency,
            blockHeight,
            history: [...node.history, status === "down" ? 0 : latency].slice(-15)
        };
    };

    const refreshAll = async () => {
        setIsRefreshing(true);
        setNodes(prev => prev.map(n => ({ ...n, status: "checking" }))); // Set all to checking

        const updatedNodes = await Promise.all(
            nodes.map(async (node) => {
                const update = await checkNodeStatus(node);
                return { ...node, ...update };
            })
        );

        setNodes(updatedNodes);
        setLastUpdated(new Date());
        setIsRefreshing(false);
    };

    // Initial refresh
    useEffect(() => {
        refreshAll();
        const interval = setInterval(refreshAll, 10000); // Auto refresh every 10s
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status: NodeStatus["status"]) => {
        switch (status) {
            case "active": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
            case "degraded": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
            case "down": return "text-red-500 bg-red-500/10 border-red-500/20";
            default: return "text-slate-400 bg-slate-400/10 border-slate-400/20";
        }
    };

    const getStatusIcon = (status: NodeStatus["status"]) => {
        switch (status) {
            case "active": return <CheckCircle2 size={16} />;
            case "degraded": return <AlertTriangle size={16} />;
            case "down": return <XCircle size={16} />;
            default: return <Server size={16} className="animate-pulse" />;
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">

            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Server className="text-emerald-500" size={20} />
                        RPC Nodes
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Displaying real-time latency and block height synchronization.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {lastUpdated && (
                        <span className="text-xs text-slate-500 font-mono">
                            Updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                    <button
                        onClick={refreshAll}
                        disabled={isRefreshing}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* Nodes List */}
            <div className="space-y-3">
                {nodes.map((node) => (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`glass-panel p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-slate-800/50 ${node.status === "down" ? "border-red-500/30" : "border-slate-800"
                            }`}
                    >
                        {/* Info */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className={`p-2 rounded-lg border ${getStatusColor(node.status)}`}>
                                {getStatusIcon(node.status)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-200">{node.name}</h3>
                                <p className="text-xs text-slate-500 font-mono hidden sm:block">{node.url}</p>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="flex items-center gap-6 w-full sm:w-auto mt-2 sm:mt-0">

                            {/* Latency Sparkline mock */}
                            <div className="hidden md:flex items-end gap-0.5 h-8 w-24">
                                {node.history.map((h, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 rounded-t-sm ${h > 300 ? 'bg-amber-500/40' : h === 0 ? 'bg-red-500/40' : 'bg-emerald-500/40'}`}
                                        style={{ height: h === 0 ? '4px' : `${Math.min(h / 10, 100)}%` }} // Simple scaling
                                    />
                                ))}
                            </div>

                            <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
                                <div className="text-right">
                                    <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Latency</p>
                                    <p className={`font-mono font-bold ${node.latency > 300 ? "text-amber-400" : node.latency === 0 ? "text-red-400" : "text-emerald-400"
                                        }`}>
                                        {node.status === "checking" ? "..." : node.status === "down" ? "OFFLINE" : `${node.latency}ms`}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Height</p>
                                    <p className="font-mono text-slate-300">
                                        {node.status === "checking" ? "..." : node.status === "down" ? "-" : `#${node.blockHeight.toLocaleString()}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
