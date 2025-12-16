"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Hash, Type, MapPin, Calculator, Copy, AlertTriangle } from "lucide-react";

interface DecodedResult {
    utf8: string;
    decimal: string;
    address: string | null;
    isValidHex: boolean;
    byteSize: number;
}

export default function HexDecoder() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<DecodedResult>({
        utf8: "",
        decimal: "",
        address: null,
        isValidHex: false,
        byteSize: 0
    });

    useEffect(() => {
        if (!input.trim()) {
            setResult({ utf8: "", decimal: "", address: null, isValidHex: false, byteSize: 0 });
            return;
        }

        const cleanInput = input.startsWith("0x") ? input.slice(2) : input;
        const isValid = /^[0-9A-Fa-f]*$/.test(cleanInput);

        if (!isValid) {
            setResult(prev => ({ ...prev, isValidHex: false }));
            return;
        }

        // 1. Byte Size
        const byteSize = cleanInput.length / 2;

        // 2. UTF-8 String
        let str = "";
        try {
            for (let i = 0; i < cleanInput.length; i += 2) {
                const code = parseInt(cleanInput.substr(i, 2), 16);
                if (code) str += String.fromCharCode(code);
            }
        } catch (e) { str = "[Invalid Encoding]"; }

        // 3. Decimal / BigInt
        let decimal = "";
        try {
            if (cleanInput.length > 0) {
                decimal = BigInt("0x" + cleanInput).toString();
            }
        } catch (e) { decimal = "Too Large / Invalid"; }

        // 4. Address Detection
        let address = null;
        if (cleanInput.length === 40) {
            address = "0x" + cleanInput;
        } else if (cleanInput.length > 40 && cleanInput.length % 64 === 0) {
            // Potential padded address
            const last40 = cleanInput.slice(-40);
            if (/^[0-9A-Fa-f]+$/.test(last40)) {
                address = "0x" + last40 + " (Extracted from Padding)";
            }
        }

        setResult({
            utf8: str,
            decimal: decimal,
            address: address,
            isValidHex: true,
            byteSize: byteSize
        });

    }, [input]);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">

            {/* Input Area */}
            <div className="matrix-border bg-black p-1">
                <div className="bg-[#050505] p-6 relative">
                    <div className="absolute top-0 left-0 bg-green-900/30 px-3 py-1 text-xs font-mono text-green-400 border-b border-r border-green-800">
                        INPUT_STREAM // RAW_HEX
                    </div>

                    <textarea
                        className="w-full h-32 bg-transparent text-green-500 font-mono text-sm resize-none focus:outline-none pt-6 custom-scrollbar placeholder-green-900"
                        placeholder="Paste hex string (0x...)"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        spellCheck={false}
                    />

                    {!result.isValidHex && input.length > 0 && (
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-red-500 text-xs font-mono animate-pulse">
                            <AlertTriangle size={14} /> INVALID_HEX_DETECTED
                        </div>
                    )}
                </div>
            </div>

            {/* Results Grid */}
            {result.isValidHex && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* UTF-8 Decode */}
                    <ResultCard
                        icon={<Type size={18} />}
                        label="ASCII / UTF-8 DECODED"
                        value={result.utf8 || "[Non-printable or Empty]"}
                        scramble={true}
                    />

                    {/* Decimal Decode */}
                    <ResultCard
                        icon={<Calculator size={18} />}
                        label="DECIMAL (UINT)"
                        value={result.decimal}
                    />

                    {/* Address Decode */}
                    <ResultCard
                        icon={<MapPin size={18} />}
                        label="ETHEREUM ADDRESS CHECK"
                        value={result.address || "No Address Detected"}
                        highlight={!!result.address}
                    />

                    {/* Meta Info */}
                    <div className="matrix-border bg-black p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-teal-500">
                            <Hash size={18} />
                            <span className="font-bold text-sm tracking-widest">DATA_METRICS</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-green-800 uppercase">Size</p>
                            <p className="text-xl font-mono text-green-400">{result.byteSize} <span className="text-sm">bytes</span></p>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}

function ResultCard({ icon, label, value, highlight, scramble }: { icon: React.ReactNode, label: string, value: string, highlight?: boolean, scramble?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`matrix-border bg-[#050505] p-4 group relative overflow-hidden ${highlight ? "shadow-[0_0_15px_rgba(20,184,166,0.3)] border-teal-600" : ""}`}
        >
            <div className="flex items-center gap-2 text-green-700 mb-3 border-b border-green-900/50 pb-2">
                <span className={highlight ? "text-teal-400" : ""}>{icon}</span>
                <span className="text-xs font-bold tracking-widest">{label}</span>
            </div>

            <div className="relative">
                <p className={`font-mono text-sm break-all ${highlight ? "text-teal-300 font-bold" : "text-gray-300"}`}>
                    {value}
                </p>
            </div>

            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => navigator.clipboard.writeText(value)}
                    className="text-green-600 hover:text-green-400"
                >
                    <Copy size={14} />
                </button>
            </div>
        </motion.div>
    )
}
