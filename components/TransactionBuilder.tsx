"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Hexagon, Database, DollarSign, Activity } from "lucide-react";

interface TransactionData {
    chainId: number;
    to: string;
    value: string;
    data: string;
    gasLimit: string;
    gasPrice: string;
    nonce: string;
}

export default function TransactionBuilder() {
    const [tx, setTx] = useState<TransactionData>({
        chainId: 1111, // Lumera
        to: "",
        value: "0",
        data: "0x",
        gasLimit: "21000",
        gasPrice: "2.5",
        nonce: "0"
    });

    const [jsonPreview, setJsonPreview] = useState("");
    const [dataSize, setDataSize] = useState(0);

    // Real-time update effect
    useEffect(() => {
        // 1. Calculate Data Size
        const dataBytes = tx.data.startsWith("0x") ? (tx.data.length - 2) / 2 : tx.data.length / 2;
        setDataSize(Math.max(0, Math.floor(dataBytes)));

        // 2. Generate JSON-RPC Payload Preview
        const payload = {
            jsonrpc: "2.0",
            method: "eth_sendTransaction",
            params: [{
                from: "[YOUR_WALLET]",
                to: tx.to || null,
                gas: `0x${parseInt(tx.gasLimit).toString(16)}`,
                gasPrice: `0x${(parseFloat(tx.gasPrice) * 1e9).toString(16)}`,
                value: `0x${(parseFloat(tx.value) * 1e18).toString(16)}`,
                data: tx.data !== "0x" ? tx.data : undefined,
                nonce: `0x${parseInt(tx.nonce).toString(16)}`
            }],
            id: 1
        };

        setJsonPreview(JSON.stringify(payload, null, 2));
    }, [tx]);

    const handleChange = (field: keyof TransactionData, value: string) => {
        setTx(prev => ({ ...prev, [field]: value }));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(jsonPreview);
    };

    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Builder Form */}
            <div className="terminal-border bg-[#0c0a09] p-6 lg:p-8 rounded-sm">
                <h2 className="text-xl font-heading text-amber-500 mb-6 flex items-center gap-2">
                    <Terminal size={20} />
                    TRANSACTION_CONSTRUCTOR
                </h2>

                <div className="space-y-6">

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-stone-500 font-bold mb-1 block">CHAIN_ID</label>
                            <input
                                type="number"
                                value={tx.chainId}
                                onChange={(e) => handleChange("chainId", e.target.value)}
                                className="w-full p-2 text-sm font-mono bg-[#1c1917] border border-stone-700 text-amber-400 focus:border-amber-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-stone-500 font-bold mb-1 block">NONCE</label>
                            <input
                                type="number"
                                value={tx.nonce}
                                onChange={(e) => handleChange("nonce", e.target.value)}
                                className="w-full p-2 text-sm font-mono bg-[#1c1917] border border-stone-700 text-amber-400 focus:border-amber-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-stone-500 font-bold mb-1 block">TO_ADDRESS (Recepient)</label>
                        <div className="relative">
                            <Hexagon className="absolute left-3 top-2.5 text-stone-600" size={14} />
                            <input
                                type="text"
                                placeholder="0x..."
                                value={tx.to}
                                onChange={(e) => handleChange("to", e.target.value)}
                                className="w-full p-2 pl-9 text-sm font-mono bg-[#1c1917] border border-stone-700 text-green-400 focus:border-green-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-stone-500 font-bold mb-1 block">VALUE (LUM)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 text-stone-600" size={14} />
                                <input
                                    type="number"
                                    value={tx.value}
                                    onChange={(e) => handleChange("value", e.target.value)}
                                    className="w-full p-2 pl-9 text-sm font-mono bg-[#1c1917] border border-stone-700 text-amber-400 focus:border-amber-500 outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-stone-500 font-bold mb-1 block">GAS_LIMIT</label>
                            <div className="relative">
                                <Activity className="absolute left-3 top-2.5 text-stone-600" size={14} />
                                <input
                                    type="number"
                                    value={tx.gasLimit}
                                    onChange={(e) => handleChange("gasLimit", e.target.value)}
                                    className="w-full p-2 pl-9 text-sm font-mono bg-[#1c1917] border border-stone-700 text-amber-400 focus:border-amber-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-xs text-stone-500 font-bold">DATA (Hex)</label>
                            <span className="text-xs text-stone-600 font-mono">SIZE: {dataSize} bytes</span>
                        </div>
                        <textarea
                            rows={6}
                            value={tx.data}
                            onChange={(e) => handleChange("data", e.target.value)}
                            className="w-full p-3 text-xs font-mono bg-[#1c1917] border border-stone-700 text-stone-300 focus:border-amber-500 outline-none resize-none"
                            placeholder="0x..."
                        />
                    </div>

                </div>
            </div>

            {/* Preview Pane */}
            <div className="flex flex-col gap-6">

                {/* Output Preview */}
                <div className="terminal-border bg-[#0c0a09] p-6 rounded-sm flex-grow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm font-heading text-green-500 flex items-center gap-2">
                            <Database size={16} /> RPC_PAYLOAD_PREVIEW
                        </h2>
                        <button
                            onClick={copyToClipboard}
                            className="text-xs text-stone-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                        >
                            <Copy size={12} /> COPY
                        </button>
                    </div>

                    <div className="bg-[#1c1917] p-4 rounded-sm border border-stone-700 h-[300px] overflow-auto custom-scrollbar">
                        <pre className="text-xs font-mono text-green-400/90 whitespace-pre-wrap break-all">
                            {jsonPreview}
                        </pre>
                    </div>
                </div>

                {/* Stats / Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1c1917] p-4 border border-stone-800">
                        <p className="text-[10px] text-stone-500 uppercase">Est. Cost (USD)</p>
                        <p className="text-lg font-mono text-amber-500">
                            --
                        </p>
                    </div>
                    <div className="bg-[#1c1917] p-4 border border-stone-800">
                        <p className="text-[10px] text-stone-500 uppercase">Function Sig</p>
                        <p className="text-xs font-mono text-stone-400 truncate">
                            {tx.data.length >= 10 ? tx.data.slice(0, 10) : "0x"}
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
}
