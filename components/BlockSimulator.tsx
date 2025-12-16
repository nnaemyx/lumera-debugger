"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Hammer, CheckCircle, XCircle, Box } from "lucide-react";

export default function BlockSimulator() {
    const [blockNumber, setBlockNumber] = useState(1);
    const [nonce, setNonce] = useState(0);
    const [data, setData] = useState("");
    const [hash, setHash] = useState("");
    const [isMining, setIsMining] = useState(false);

    // Difficulty target: Hash must start with "0000"
    const DIFFICULTY = "0000";
    const isSigned = hash.startsWith(DIFFICULTY);

    const calculateHash = useCallback(async (num: number, non: number, dat: string) => {
        const text = `${num}${non}${dat}`;
        const msgBuffer = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        return hashHex;
    }, []);

    useEffect(() => {
        calculateHash(blockNumber, nonce, data).then(setHash);
    }, [blockNumber, nonce, data, calculateHash]);

    const mine = async () => {
        setIsMining(true);
        let currentNonce = nonce;
        let found = false;

        // Small delay to allow UI to update to "Mining" state
        await new Promise(r => setTimeout(r, 100));

        // Simple limiting to prevent browser freeze, essentially a sync loop in chunks could be better but this is a demo
        // We'll try to find it within a reasonable range or give up to keep it responsive
        const startTime = Date.now();

        while (!found && Date.now() - startTime < 5000) {
            currentNonce++;
            const h = await calculateHash(blockNumber, currentNonce, data);
            if (h.startsWith(DIFFICULTY)) {
                found = true;
                setNonce(currentNonce);
                setHash(h);
            }
        }

        setIsMining(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <motion.div
                layout
                className={`card p-8 border-4 transition-colors duration-500 ${isSigned ? "bg-emerald-50/5 border-emerald-500" : "bg-slate-800/50 border-rose-500"}`}
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Box size={32} className={isSigned ? "text-emerald-500" : "text-rose-500"} />
                        BLOCK #{blockNumber.toString().padStart(3, '0')}
                    </h2>
                    <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isSigned ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>
                        {isSigned ? "Signed / Valid" : "Unsigned / Invalid"}
                    </div>
                </div>

                <div className="space-y-6">

                    {/* Block Number Input */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Block Number</label>
                        <input
                            type="number"
                            value={blockNumber}
                            onChange={(e) => setBlockNumber(parseInt(e.target.value) || 0)}
                            className="w-full font-mono text-lg"
                        />
                    </div>

                    {/* Nonce Input & Mine Button */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nonce</label>
                        <div className="flex gap-4">
                            <input
                                type="number"
                                value={nonce}
                                onChange={(e) => setNonce(parseInt(e.target.value) || 0)}
                                className="flex-grow font-mono text-lg"
                            />
                            <button
                                onClick={mine}
                                disabled={isMining || isSigned}
                                className={`flex items-center gap-2 px-6 py-2 rounded font-bold text-white transition-all
                            ${isMining ? "bg-slate-600 cursor-wait" : isSigned ? "bg-emerald-600 opacity-50 cursor-not-allowed" : "bg-primary hover:bg-primary-hover shadow-lg hover:shadow-orange-500/20"}
                        `}
                            >
                                {isMining ? (
                                    <RefreshCw size={20} className="animate-spin" />
                                ) : (
                                    <Hammer size={20} />
                                )}
                                {isMining ? "MINING..." : "MINE"}
                            </button>
                        </div>
                    </div>

                    {/* Data Input */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Data</label>
                        <textarea
                            rows={4}
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            placeholder="Enter block data here..."
                            className="w-full font-mono text-sm resize-none"
                        />
                    </div>

                    {/* Hash Display */}
                    <div className="pt-4 border-t border-slate-700">
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-2">SHA-256 Hash</label>
                        <div className={`p-4 rounded-lg hash-display text-sm break-all transition-colors duration-300 ${isSigned ? "bg-emerald-900/20 text-emerald-400" : "bg-rose-900/20 text-rose-400"}`}>
                            {hash}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 text-right">Target: Starts with {DIFFICULTY}</p>
                    </div>

                </div>
            </motion.div>

            {/* Educational Note */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard
                    title="THE NONCE"
                    text="An arbitrary number that can be used just once. Miners change this value repeatedly to find a hash that meets the difficulty target."
                />
                <InfoCard
                    title="THE DATA"
                    text="Any modification to the data completely changes the hash. This linkage ensures the integrity of the blockchain history."
                />
                <InfoCard
                    title="THE HASH"
                    text="A digital fingerprint of the block. To be valid, it must meet the network's difficulty criteria (e.g. leading zeros)."
                />
            </div>
        </div>
    );
}

function InfoCard({ title, text }: { title: string, text: string }) {
    return (
        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <h4 className="text-primary font-bold text-xs uppercase mb-2">{title}</h4>
            <p className="text-slate-400 text-xs leading-relaxed">{text}</p>
        </div>
    )
}
