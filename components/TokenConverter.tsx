"use client";

import { useState } from "react";
import { Copy, RefreshCw, ArrowRightLeft } from "lucide-react";

export default function TokenConverter() {
    const [wei, setWei] = useState("");
    const [gwei, setGwei] = useState("");
    const [ether, setEther] = useState("");

    const handleWeiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setWei(val);
        if (!val) {
            setGwei("");
            setEther("");
            return;
        }
        try {
            const weiVal = BigInt(val);
            setGwei((Number(weiVal) / 1e9).toString());
            setEther((Number(weiVal) / 1e18).toString());
        } catch { /* Invalid input, ignore */ }
    };

    const handleGweiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setGwei(val);
        if (!val) {
            setWei("");
            setEther("");
            return;
        }
        try {
            const gweiVal = parseFloat(val);
            setWei((BigInt(Math.floor(gweiVal * 1e9))).toString());
            setEther((gweiVal / 1e9).toString());
        } catch { /* Invalid input */ }
    };

    const handleEtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEther(val);
        if (!val) {
            setWei("");
            setGwei("");
            return;
        }
        try {
            const etherVal = parseFloat(val);
            setWei((BigInt(Math.floor(etherVal * 1e18))).toString());
            setGwei((etherVal * 1e9).toString());
        } catch { /* Invalid input */ }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <ArrowRightLeft size={14} />
                    Converter
                </span>
                <button
                    onClick={() => { setWei(""); setGwei(""); setEther(""); }}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                >
                    <RefreshCw size={14} />
                </button>
            </div>

            <div className="p-8 space-y-8">

                {/* Ether Input */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">LMR (Ether)</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={ether}
                            onChange={handleEtherChange}
                            placeholder="1"
                            className="w-full pr-12 text-lg font-mono text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button onClick={() => copyToClipboard(ether)} className="text-gray-400 hover:text-gray-600">
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 font-mono">10^18 Wei</p>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-100"></div>

                {/* Gwei Input */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gwei</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={gwei}
                            onChange={handleGweiChange}
                            placeholder="1000000000"
                            className="w-full pr-12 text-lg font-mono text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button onClick={() => copyToClipboard(gwei)} className="text-gray-400 hover:text-gray-600">
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 font-mono">10^9 Wei</p>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-100"></div>

                {/* Wei Input */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wei</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={wei}
                            onChange={handleWeiChange}
                            placeholder="1000000000000000000"
                            className="w-full pr-12 text-lg font-mono text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button onClick={() => copyToClipboard(wei)} className="text-gray-400 hover:text-gray-600">
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 font-mono">Base Unit</p>
                </div>

            </div>
        </div>
    );
}
