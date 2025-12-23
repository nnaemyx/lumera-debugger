"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTransactionByHash, analyzeTxFailure, TransactionDetails, FailureAnalysis } from "@/lib/cosmos-client";
import { Search, AlertTriangle, CheckCircle, Terminal, Activity, XCircle } from "lucide-react";

export default function TxFailureAnalyzer() {
    const [txHash, setTxHash] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ tx: TransactionDetails; analysis: FailureAnalysis | null } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!txHash) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const tx = await getTransactionByHash(txHash);
            if (tx) {
                const analysis = analyzeTxFailure(tx);
                setResult({ tx, analysis });
            } else {
                setError("Transaction not found. Please check the hash.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to analyze transaction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto font-mono text-sm">

            {/* Search Input */}
            <form onSubmit={handleAnalyze} className="relative mb-8 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-amber-500/50 group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="Enter Transaction Hash (0x...)"
                    className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-300 rounded-lg py-4 pl-12 pr-4 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all shadow-xl font-mono tracking-tight"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-2 bottom-2 bg-stone-900 hover:bg-stone-800 text-amber-500 hover:text-amber-400 px-6 rounded-md border border-amber-500/10 transition-all uppercase tracking-widest text-xs font-bold disabled:opacity-50"
                >
                    {loading ? "Scanning..." : "Analyze"}
                </button>
            </form>

            {/* Results Area */}
            <AnimatePresence mode="wait">

                {/* Loading State */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center py-20"
                    >
                        <div className="inline-block p-4 border border-amber-500/20 rounded-full bg-amber-500/5 mb-4">
                            <Activity className="h-8 w-8 text-amber-500 animate-pulse" />
                        </div>
                        <p className="text-stone-500 animate-pulse">Querying RPC node...</p>
                    </motion.div>
                )}

                {/* Error State */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 flex items-start gap-4"
                    >
                        <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-red-400 font-bold mb-1 uppercase tracking-wider">Analysis Failed</h3>
                            <p className="text-red-500/70">{error}</p>
                        </div>
                    </motion.div>
                )}

                {/* Success Result State */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >

                        {/* Status Banner */}
                        <div className={`
                flex items-center justify-between p-6 rounded-xl border relative overflow-hidden
                ${result.analysis
                                ? 'bg-amber-500/5 border-amber-500/30'
                                : 'bg-emerald-500/5 border-emerald-500/30'}
                `}
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    {result.analysis ? (
                                        <XCircle className="h-8 w-8 text-amber-500" />
                                    ) : (
                                        <CheckCircle className="h-8 w-8 text-emerald-500" />
                                    )}
                                    <h2 className={`text-2xl font-bold tracking-tight ${result.analysis ? 'text-amber-500' : 'text-emerald-500'}`}>
                                        {result.analysis ? 'TRANSACTION FAILED' : 'TRANSACTION SUCCESSFUL'}
                                    </h2>
                                </div>
                                <p className="text-stone-500 text-xs uppercase tracking-widest">{result.tx.height} • {result.tx.timestamp}</p>
                            </div>

                            {/* Severity Badge (if failed) */}
                            {result.analysis && (
                                <div className={`
                        hidden md:block px-4 py-2 rounded border uppercase tracking-widest text-xs font-bold
                        ${result.analysis.severity === 'high' ? 'bg-red-500/20 border-red-500/40 text-red-500' :
                                        result.analysis.severity === 'medium' ? 'bg-amber-500/20 border-amber-500/40 text-amber-500' :
                                            'bg-stone-500/20 border-stone-500/40 text-stone-400'}
                     `}>
                                    SEVERITY: {result.analysis.severity}
                                </div>
                            )}
                        </div>

                        {/* Analysis Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Left: Explanation */}
                            <div className="bg-[#0c0c0c] border border-stone-800 rounded-xl p-6 flex flex-col h-full">
                                <div className="flex items-center gap-2 mb-6 text-stone-500">
                                    <Terminal className="h-4 w-4" />
                                    <span className="text-xs uppercase tracking-widest">Diagnostic Report</span>
                                </div>

                                {result.analysis ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-stone-400 text-xs uppercase mb-2">Failure Reason</h4>
                                            <p className="text-xl text-stone-200 font-bold">{result.analysis.reason}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-stone-400 text-xs uppercase mb-2">Recommendation</h4>
                                            <p className="text-amber-500 leading-relaxed">
                                                {result.analysis.recommendation}
                                            </p>
                                        </div>
                                        <div className="pt-4 border-t border-stone-800/50">
                                            <h4 className="text-stone-600 text-[10px] uppercase mb-1">Raw Error Code</h4>
                                            <code className="text-stone-500 text-xs block bg-black/50 p-2 rounded border border-stone-900 border-l-2 border-l-red-900/50">
                                                {result.analysis.technicalError}
                                            </code>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center h-full py-10">
                                        <CheckCircle className="h-12 w-12 text-emerald-500/20 mb-4" />
                                        <p className="text-stone-400">No errors detected.</p>
                                        <p className="text-emerald-500/50 text-sm mt-2">This transaction was included in block #{result.tx.height} successfully.</p>
                                    </div>
                                )}
                            </div>

                            {/* Right: Technical Details */}
                            <div className="bg-[#0c0c0c] border border-stone-800 rounded-xl p-6  flex flex-col">
                                <div className="flex items-center gap-2 mb-6 text-stone-500">
                                    <Activity className="h-4 w-4" />
                                    <span className="text-xs uppercase tracking-widest">Execution Telemetry</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-stone-900">
                                        <span className="text-stone-500">Tx Hash</span>
                                        <span className="text-stone-300 font-mono text-xs truncate max-w-[150px]" title={result.tx.hash}>
                                            {result.tx.hash.slice(0, 10)}...{result.tx.hash.slice(-10)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-stone-900">
                                        <span className="text-stone-500">Gas Used / Wanted</span>
                                        <div className="text-right">
                                            <span className={`${parseInt(result.tx.gasUsed) > parseInt(result.tx.gasWanted) ? 'text-red-500' : 'text-stone-300'
                                                }`}>
                                                {parseInt(result.tx.gasUsed).toLocaleString()}
                                            </span>
                                            <span className="text-stone-600 mx-1">/</span>
                                            <span className="text-stone-500">{parseInt(result.tx.gasWanted).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-stone-900">
                                        <span className="text-stone-500">Msg Type</span>
                                        <span className="text-stone-300 text-xs px-2 py-1 bg-stone-900 rounded border border-stone-800">
                                            {result.tx.type.split('.').pop()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-stone-900">
                                        <span className="text-stone-500">Fee</span>
                                        <span className="text-stone-300">
                                            {result.tx.fee?.amount || 0} {result.tx.fee?.denom || 'ulume'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6">
                                    <h4 className="text-stone-600 text-[10px] uppercase mb-2">Raw Log Output</h4>
                                    <div className="h-32 bg-black border border-stone-900 rounded p-3 overflow-y-auto text-[10px] text-stone-500 font-mono scrollbar-thin scrollbar-thumb-stone-800">
                                        {result.tx.rawLog || "No raw log available."}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
