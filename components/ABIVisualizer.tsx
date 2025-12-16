"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileCode, Play, Box, ArrowRight, Wallet, Eye, Zap } from "lucide-react";

interface ABIItem {
    type: "function" | "event" | "constructor" | "fallback" | "receive";
    name?: string;
    inputs?: { name: string; type: string; indexed?: boolean }[];
    outputs?: { name: string; type: string }[];
    stateMutability?: "pure" | "view" | "nonpayable" | "payable";
    anonymous?: boolean;
}

export default function ABIVisualizer() {
    const [abiInput, setAbiInput] = useState("");
    const [items, setItems] = useState<ABIItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!abiInput.trim()) {
            setItems([]);
            setError(null);
            return;
        }

        try {
            const parsed = JSON.parse(abiInput);
            if (!Array.isArray(parsed)) throw new Error("ABI must be an array");
            setItems(parsed);
            setError(null);
        } catch (e) {
            setError("Invalid JSON format");
            setItems([]);
        }
    }, [abiInput]);

    const functions = items.filter(i => i.type === "function");
    const events = items.filter(i => i.type === "event");
    const ctor = items.find(i => i.type === "constructor");

    return (
        <div className="w-full h-[calc(100vh-140px)] grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Editor Pane */}
            <div className="flex flex-col bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <FileCode size={14} />
                        Input ABI (JSON)
                    </span>
                    <button
                        onClick={() => setAbiInput("")}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Clear
                    </button>
                </div>
                <textarea
                    className="flex-grow w-full p-4 font-mono text-sm resize-none focus:outline-none text-slate-700 bg-white"
                    placeholder={`[
  {
    "type": "function",
    "name": "transfer",
    "inputs": [...]
  }
]`}
                    value={abiInput}
                    onChange={(e) => setAbiInput(e.target.value)}
                    spellCheck={false}
                />
                {error && (
                    <div className="bg-rose-50 border-t border-rose-100 px-4 py-2 text-xs text-rose-600 font-mono">
                        {error}
                    </div>
                )}
            </div>

            {/* Documentation Pane */}
            <div className="flex flex-col bg-slate-50 border border-slate-200 rounded-lg shadow-inner overflow-hidden">
                <div className="bg-white border-b border-slate-200 px-4 py-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Documentation Preview</span>
                </div>

                <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">

                    {items.length === 0 && !error && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                            <Box size={48} className="mb-4" />
                            <p className="text-sm">Paste ABI to generate docs</p>
                        </div>
                    )}

                    {/* Constructor */}
                    {ctor && (
                        <section>
                            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Constructor</h3>
                            <FunctionCard item={ctor} />
                        </section>
                    )}

                    {/* Functions */}
                    {functions.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                                Functions
                                <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-[10px]">{functions.length}</span>
                            </h3>
                            <div className="space-y-4">
                                {functions.map((fn, i) => (
                                    <FunctionCard key={i} item={fn} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Events */}
                    {events.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                                Events
                                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px]">{events.length}</span>
                            </h3>
                            <div className="space-y-4">
                                {events.map((ev, i) => (
                                    <EventCard key={i} item={ev} />
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </div>

        </div>
    );
}

function FunctionCard({ item }: { item: ABIItem }) {
    const isView = item.stateMutability === "view" || item.stateMutability === "pure";
    const isPayable = item.stateMutability === "payable";

    return (
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm hover:border-indigo-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className={`p-1.5 rounded-md ${isView ? "bg-emerald-100 text-emerald-600" : isPayable ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-600"}`}>
                        {isView ? <Eye size={14} /> : isPayable ? <Wallet size={14} /> : <Zap size={14} />}
                    </span>
                    <h4 className="font-mono font-semibold text-slate-800">{item.name || "constructor"}</h4>
                </div>
                <div className="flex gap-2">
                    {item.stateMutability && (
                        <span className={`tag-badge ${isView ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                isPayable ? "bg-rose-50 text-rose-600 border border-rose-100" :
                                    "bg-slate-100 text-slate-500 border border-slate-200"
                            }`}>
                            {item.stateMutability}
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-3 pl-8 border-l-2 border-slate-100 ml-3">
                {/* Inputs */}
                {item.inputs && item.inputs.length > 0 && (
                    <div>
                        <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Inputs</p>
                        <div className="space-y-1">
                            {item.inputs.map((input, j) => (
                                <div key={j} className="flex items-center gap-2 font-mono text-xs">
                                    <span className="text-indigo-600 font-bold">{input.type}</span>
                                    <span className="text-slate-700">{input.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Outputs */}
                {item.outputs && item.outputs.length > 0 && (
                    <div>
                        <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Returns</p>
                        <div className="flex items-center gap-2 font-mono text-xs">
                            <ArrowRight size={10} className="text-slate-400" />
                            <span className="text-slate-600">
                                {item.outputs.map(o => o.type).join(", ")}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function EventCard({ item }: { item: ABIItem }) {
    return (
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm border-l-4 border-l-amber-400">
            <div className="flex items-center gap-2 mb-2">
                <h4 className="font-mono font-semibold text-slate-800">{item.name}</h4>
                <span className="tag-badge bg-amber-50 text-amber-600 border border-amber-100">Event</span>
            </div>
            <div className="space-y-1 pl-4">
                {item.inputs?.map((input, j) => (
                    <div key={j} className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-amber-600 font-bold">{input.type}</span>
                        <span className={`text-slate-700 ${input.indexed ? "font-bold underline decoration-dotted" : ""}`}>{input.name}</span>
                        {input.indexed && <span className="text-[9px] text-slate-400 uppercase tracking-tighter">(indexed)</span>}
                    </div>
                ))}
            </div>
        </div>
    )
}
