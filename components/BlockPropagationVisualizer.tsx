"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLatestBlockHeight, getNetworkStats, getUnconfirmedTxs } from "@/lib/cosmos-client";

interface Node {
    id: number;
    x: number;
    y: number;
    status: "idle" | "receiving" | "propagating" | "synced";
    connections: number[];
}

interface BlockStat {
    blockHeight: number;
    propagationTime: number; // ms
    coverage: number; // percentage
    timestamp: string;
}

export default function BlockPropagationVisualizer() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [stats, setStats] = useState<BlockStat>({
        blockHeight: 0,
        propagationTime: 0,
        coverage: 0,
        timestamp: "--",
    });
    const [isSimulating, setIsSimulating] = useState(false);
    const [loading, setLoading] = useState(true);
    const lastHeightRef = useRef<number>(0);
    const simulationRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize nodes
    useEffect(() => {
        const newNodes: Node[] = [];
        const nodeCount = 20;

        // Create nodes with somewhat random positions but keeping them central
        for (let i = 0; i < nodeCount; i++) {
            // Grid-like distribution with randomness
            newNodes.push({
                id: i,
                x: Math.random() * 80 + 10, // 10% to 90%
                y: Math.random() * 80 + 10,
                status: "idle",
                connections: [],
            });
        }

        // Create random connections (topology)
        newNodes.forEach((node) => {
            const numConnections = Math.floor(Math.random() * 3) + 2; // 2-4 connections
            for (let j = 0; j < numConnections; j++) {
                const targetId = Math.floor(Math.random() * nodeCount);
                if (targetId !== node.id && !node.connections.includes(targetId)) {
                    node.connections.push(targetId);
                    // Undirected graph, so add back-link
                    const targetNode = newNodes.find((n) => n.id === targetId);
                    if (targetNode && !targetNode.connections.includes(node.id)) {
                        targetNode.connections.push(node.id);
                    }
                }
            }
        });

        setNodes(newNodes);
    }, []);

    const startPropagation = useCallback((newHeight: number) => {
        if (nodes.length === 0) return;
        setIsSimulating(true);

        // Reset nodes
        setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));

        setStats(prev => ({
            ...prev,
            blockHeight: newHeight,
            propagationTime: 0,
            coverage: 0,
            timestamp: new Date().toLocaleTimeString(),
        }));

        // Pick a random starter node
        const startNodeId = Math.floor(Math.random() * nodes.length);

        // Set initial node status
        setNodes((prev) =>
            prev.map(n => n.id === startNodeId ? { ...n, status: "propagating" } : n)
        );

        let tick = 0;
        const interval = setInterval(() => {
            tick++;

            setStats(prev => ({
                ...prev,
                propagationTime: tick * 50,
                coverage: Math.min(100, prev.coverage + (Math.random() * 15)) // Fast coverage
            }));

            if (tick >= 20) { // approx 1s propagation visualization
                clearInterval(interval);
                setIsSimulating(false);
                setNodes((prev) => prev.map((n) => ({ ...n, status: "synced" })));
                setStats(prev => ({ ...prev, coverage: 100 }));
            }

            // Randomly propagate
            setNodes(prev => prev.map(n => {
                if (n.status === 'idle' && Math.random() > 0.7) {
                    // Check if any neighbor is propagating
                    // This is a simplified visual effect, not full simulation logic
                    return { ...n, status: 'propagating' };
                }
                if (n.status === 'propagating') {
                    return { ...n, status: 'synced' };
                }
                return n;
            }));

        }, 100);

        simulationRef.current = interval;
    }, [nodes.length]);

    // Real-time Data Polling
    useEffect(() => {
        const fetchData = async () => {
            try {
                const height = await getLatestBlockHeight();

                // First load or new block
                if (height > lastHeightRef.current) {
                    if (lastHeightRef.current !== 0) {
                        // Trigger animation for new block
                        startPropagation(height);
                    } else {
                        // Initial load
                        setStats(prev => ({ ...prev, blockHeight: height, coverage: 100, timestamp: new Date().toLocaleTimeString() }));
                        setNodes(prev => prev.map(n => ({ ...n, status: "synced" })));
                    }
                    lastHeightRef.current = height;
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch block height", error);
            }
        };

        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 2000); // Poll every 2s

        return () => clearInterval(intervalId);
    }, [startPropagation]);


    // Unconfirmed Txs Effect (Mempool Noise)
    useEffect(() => {
        const fetchMempool = async () => {
            try {
                // We can use this to add "noise" or "receiving" states to nodes randomly
                const txs = await getUnconfirmedTxs(10);
                if (txs.length > 0 && !isSimulating) {
                    // Flash some nodes as receiving
                    setNodes(prev => prev.map(n => {
                        if (n.status === 'synced' && Math.random() > 0.9) {
                            return { ...n, status: 'receiving' };
                        }
                        return n;
                    }));

                    setTimeout(() => {
                        setNodes(prev => prev.map(n => {
                            if (n.status === 'receiving') return { ...n, status: 'synced' };
                            return n;
                        }));
                    }, 500);
                }
            } catch (e) { console.error(e); }
        };

        const interval = setInterval(fetchMempool, 3000);
        return () => clearInterval(interval);
    }, [isSimulating]);


    return (
        <div className="w-full h-[600px] bg-[#050b14] rounded-xl border border-emerald-500/10 relative overflow-hidden flex flex-col shadow-2xl shadow-emerald-900/10">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

            {/* Header / HUD */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">

                {/* Left Stats */}
                <div className="flex flex-col gap-2">
                    <div className="bg-black/40 backdrop-blur-md border border-emerald-500/20 px-4 py-2 rounded-lg">
                        <div className="text-[10px] text-emerald-500/60 uppercase tracking-widest font-mono mb-1">Block Height</div>
                        <div className="text-2xl font-mono text-emerald-400 font-bold">
                            {loading ? <span className="animate-pulse">...</span> : `#${stats.blockHeight.toLocaleString()}`}
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-emerald-500/20 px-4 py-2 rounded-lg">
                        <div className="text-[10px] text-emerald-500/60 uppercase tracking-widest font-mono mb-1">Time Elapsed</div>
                        <div className="text-xl font-mono text-white font-bold">{stats.propagationTime}ms</div>
                    </div>
                </div>

                {/* Right Stats (Coverage) */}
                <div className="bg-black/40 backdrop-blur-md border border-emerald-500/20 px-4 py-3 rounded-lg min-w-[150px]">
                    <div className="text-[10px] text-emerald-500/60 uppercase tracking-widest font-mono mb-2">Network Coverage</div>
                    <div className="w-full bg-emerald-950/50 h-2 rounded-full overflow-hidden mb-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.coverage}%` }}
                            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        />
                    </div>
                    <div className="text-right text-sm font-mono text-emerald-300">{Math.round(stats.coverage)}% Synced</div>
                </div>
            </div>

            {/* Manual Trigger (Hidden or Debug only if real implementation is purely automatic, but let's keep for demo) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 opacity-0 hover:opacity-100 transition-opacity">
                <div
                    className="text-[10px] text-emerald-500/30 uppercase tracking-widest font-mono"
                >
                    Real-time Mode Active
                </div>
            </div>

            {/* Visualization Area */}
            <div className="flex-grow relative z-0">
                {/* Connections (Lines) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    {nodes.map(node => (
                        node.connections.map(targetId => {
                            const target = nodes.find(n => n.id === targetId);
                            if (!target || target.id < node.id) return null; // Draw once per pair
                            return (
                                <line
                                    key={`${node.id}-${target.id}`}
                                    x1={`${node.x}%`}
                                    y1={`${node.y}%`}
                                    x2={`${target.x}%`}
                                    y2={`${target.y}%`}
                                    stroke="#10b981"
                                    strokeWidth="1"
                                    strokeOpacity={0.3}
                                />
                            );
                        })
                    ))}
                </svg>

                {/* Nodes */}
                {nodes.map(node => (
                    <motion.div
                        key={node.id}
                        className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full z-10 transition-colors duration-300
                    ${node.status === 'propagating' ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,1)] scale-150' :
                                node.status === 'receiving' ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)]' :
                                    node.status === 'synced' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]' :
                                        'bg-emerald-900/80 border border-emerald-500/30'}
                `}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        animate={{
                            scale: node.status === 'propagating' ? [1, 1.8, 1] : node.status === 'receiving' ? [1, 1.3, 1] : 1
                        }}
                    />
                ))}

            </div>

        </div>
    );
}
