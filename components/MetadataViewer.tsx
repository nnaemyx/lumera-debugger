"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Code, Image as ImageIcon, CheckCircle, AlertCircle, Copy, Terminal } from "lucide-react";

interface Metadata {
    name?: string;
    description?: string;
    image?: string;
    attributes?: Array<{ trait_type: string; value: string | number }>;
    properties?: any;
    [key: string]: any;
}

const MOCK_DATA: Record<string, Metadata> = {
    "ipfs://Qm...": {
        name: "Cosmic Sentinel #001",
        description: "A guardian of the digital realm, forged in the block-lattice.",
        image: "https://images.unsplash.com/photo-1635322966219-b75d7e0d836c?w=600&q=80",
        external_url: "https://lumera.network/assets/1",
        attributes: [
            { trait_type: "Class", value: "Celestial" },
            { trait_type: "Power", value: 9000 },
        ],
        compiler: "Lumera Engine v1",
    }
};

export default function MetadataViewer() {
    const [url, setUrl] = useState("ipfs://Qm..."); // Default to mock key
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Metadata | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"json" | "preview">("json");

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        setData(null);

        // Simulate network delay
        setTimeout(() => {
            if (MOCK_DATA[url]) {
                setData(MOCK_DATA[url]);
            } else {
                // Fallback mock for any other URL to show functionality
                setData({
                    name: "Unknown Artifact",
                    description: "Metadata retrieved from " + url,
                    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
                    attributes: [{ trait_type: "Status", value: "Verified" }]
                });
            }
            setLoading(false);
        }, 1500);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">

            {/* Search Bar */}
            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg shadow-sm">
                <label className="text-xs font-mono text-[#8b949e] mb-2 block">Token URI / IPFS URL</label>
                <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" size={16} />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] text-sm rounded-md py-2 pl-9 pr-4 focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] font-mono"
                            placeholder="ipfs://... or https://..."
                        />
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? <Terminal size={16} className="animate-spin" /> : <Terminal size={16} />}
                        Analyze
                    </button>
                </div>
            </div>

            {loading && (
                <div className="text-center py-20 font-mono text-[#8b949e] animate-pulse">
                    Requesting data from gateway...
                </div>
            )}

            {data && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">

                    {/* Left: Image / Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden flex flex-col"
                    >
                        <div className="bg-[#21262d] border-b border-[#30363d] px-4 py-2 flex items-center gap-2">
                            <ImageIcon size={16} className="text-[#8b949e]" />
                            <span className="text-xs font-mono text-[#c9d1d9]">Preview</span>
                        </div>
                        <div className="flex-grow flex items-center justify-center p-8 bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-[size:20px_20px]">
                            {data.image ? (
                                <img src={data.image} alt="NFT Preview" className="max-h-full max-w-full rounded shadow-2xl border border-[#30363d]" />
                            ) : (
                                <div className="text-[#8b949e] flex flex-col items-center gap-2">
                                    <AlertCircle size={32} />
                                    <span>No Image Found</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right: JSON Code */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden flex flex-col"
                    >
                        <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Code size={16} className="text-[#8b949e]" />
                                <span className="text-xs font-mono text-[#c9d1d9]">metadata.json</span>
                            </div>
                            <button
                                onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
                                className="text-[#8b949e] hover:text-[#c9d1d9]"
                            >
                                <Copy size={14} />
                            </button>
                        </div>
                        <div className="flex-grow overflow-auto p-4 font-mono text-sm leading-relaxed">
                            <pre>
                                {JSON.stringify(data, null, 2).split('\n').map((line, i) => (
                                    <div key={i} className="table-row">
                                        <span className="table-cell select-none text-[#484f58] text-right pr-4 w-8">{i + 1}</span>
                                        <span className="table-cell" dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) }} />
                                    </div>
                                ))}
                            </pre>
                        </div>
                    </motion.div>

                </div>
            )}
        </div>
    );
}

// Simple regex based syntax highlighting for JSON
function syntaxHighlight(json: string) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'syntax-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'syntax-key';
            } else {
                cls = 'syntax-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'syntax-boolean';
        } else if (/null/.test(match)) {
            cls = 'bg-red-500/20 text-red-400';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
