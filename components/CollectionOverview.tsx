"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileJson, BarChart2, PieChart, Layers, RefreshCcw, AlertCircle } from "lucide-react";

interface TraitStat {
    trait: string;
    count: number;
    percentage: number;
}

interface AttributeCategory {
    category: string;
    stats: TraitStat[];
}

export default function CollectionOverview() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [data, setData] = useState<AttributeCategory[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = (uploadedFile: File) => {
        setAnalyzing(true);
        setError(null);
        setData(null);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = e.target?.result as string;
                if (!result) throw new Error("Empty file");

                let jsonContent;
                try {
                    jsonContent = JSON.parse(result);
                } catch (e) {
                    throw new Error("Invalid JSON format");
                }

                // Support both array of metadata or single object wrapper
                const items = Array.isArray(jsonContent) ? jsonContent :
                    (jsonContent.items || jsonContent.assets || jsonContent.collection || [jsonContent]);

                if (!Array.isArray(items) || items.length === 0) {
                    throw new Error("No array of items found in JSON");
                }

                // Analyze traits
                const traitMap = new Map<string, Map<string, number>>();
                let totalItems = 0;

                items.forEach((item: any) => {
                    totalItems++;
                    // Support various metadata standards (OpenSea, etc)
                    const attributes = item.attributes || item.traits || item.properties || [];

                    if (Array.isArray(attributes)) {
                        attributes.forEach((attr: any) => {
                            const traitType = attr.trait_type || attr.name || (typeof attr === 'object' ? Object.keys(attr)[0] : null);
                            const value = attr.value || (traitType ? attr[traitType] : null);

                            if (traitType && value !== undefined && value !== null) {
                                if (!traitMap.has(traitType)) {
                                    traitMap.set(traitType, new Map());
                                }
                                const values = traitMap.get(traitType)!;
                                values.set(String(value), (values.get(String(value)) || 0) + 1);
                            }
                        });
                    } else if (typeof attributes === 'object') {
                        // Key-value pair properties
                        Object.entries(attributes).forEach(([key, val]) => {
                            if (!traitMap.has(key)) {
                                traitMap.set(key, new Map());
                            }
                            const values = traitMap.get(key)!;
                            values.set(String(val), (values.get(String(val)) || 0) + 1);
                        });
                    }
                });

                if (traitMap.size === 0) {
                    throw new Error("No traits found to analyze");
                }

                // Convert to view model
                const categories: AttributeCategory[] = [];
                traitMap.forEach((values, key) => {
                    const stats: TraitStat[] = [];
                    values.forEach((count, traitVal) => {
                        stats.push({
                            trait: traitVal,
                            count: count,
                            percentage: parseFloat(((count / totalItems) * 100).toFixed(1))
                        });
                    });
                    // Sort by count descending
                    stats.sort((a, b) => b.count - a.count);
                    categories.push({ category: key, stats: stats });
                });

                // Sort categories by number of possible values (variants)
                categories.sort((a, b) => a.stats.length - b.stats.length);

                setData(categories);
            } catch (err: any) {
                console.error("Analysis Error", err);
                setError(err.message || "Failed to process metadata");
            } finally {
                setAnalyzing(false);
            }
        };
        reader.onerror = () => {
            setError("Error reading file");
            setAnalyzing(false);
        };
        reader.readAsText(uploadedFile);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile);
            handleFileUpload(droppedFile);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">

            {/* Upload Zone */}
            {!data && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${isDragging
                            ? "border-teal-500 bg-teal-500/5 scale-[1.02]"
                            : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/50"
                        }`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className={`p-4 rounded-full ${analyzing ? "bg-teal-500/20 animate-pulse" : "bg-zinc-800"}`}>
                            {analyzing ? (
                                <RefreshCcw className="text-teal-500 animate-spin" size={32} />
                            ) : (
                                <Upload className={isDragging ? "text-teal-500" : "text-zinc-400"} size={32} />
                            )}
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-zinc-200">
                                {analyzing ? "Analyzing Metadata..." : "Drop Collection JSON"}
                            </h3>
                            <p className="text-sm text-zinc-500 font-mono">
                                Supports standard ERC-721 metadata exports (.json)
                            </p>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-rose-500 bg-rose-500/10 px-4 py-2 rounded-md border border-rose-500/20">
                                <AlertCircle size={16} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {!analyzing && (
                            <label className="mt-4 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md text-sm font-medium transition-colors border border-zinc-700 cursor-pointer inline-flex items-center gap-2 group">
                                Browse Files
                                <input
                                    type="file"
                                    accept=".json,.txt"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                            setFile(e.target.files[0]);
                                            handleFileUpload(e.target.files[0]);
                                        }
                                    }}
                                />
                            </label>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Dashboard View */}
            {data && (
                <div className="space-y-8">

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="glass-panel p-6 rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Total Assets</p>
                                <p className="text-2xl font-bold text-white font-mono">
                                    {data.reduce((acc, cat) => acc + (cat.stats.reduce((s, x) => s + x.count, 0) / (data.length || 1)), 0).toFixed(0)}*
                                </p>
                            </div>
                            <Layers className="text-teal-500" />
                        </div>
                        <div className="glass-panel p-6 rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Attributes</p>
                                <p className="text-2xl font-bold text-white font-mono">
                                    {data.reduce((acc, cat) => acc + cat.stats.length, 0)}
                                </p>
                            </div>
                            <FileJson className="text-indigo-500" />
                        </div>
                        <div className="glass-panel p-6 rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Categories</p>
                                <p className="text-2xl font-bold text-white font-mono">{data.length}</p>
                            </div>
                            <BarChart2 className="text-rose-500" />
                        </div>
                    </div>

                    {/* Trait Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {data.map((category, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-6 rounded-xl"
                            >
                                <h3 className="text-lg font-bold text-zinc-200 mb-6 flex items-center gap-2">
                                    {category.category}
                                    <span className="text-xs font-mono font-normal text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                                        {category.stats.length} variants
                                    </span>
                                </h3>

                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {category.stats.map((stat, j) => (
                                        <div key={j} className="group">
                                            <div className="flex justify-between text-sm mb-1.5">
                                                <span className="text-zinc-300 font-medium truncate pr-4">{stat.trait}</span>
                                                <span className="text-zinc-500 font-mono text-xs whitespace-nowrap">{stat.count} ({stat.percentage}%)</span>
                                            </div>
                                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-teal-500/80 rounded-full chart-bar group-hover:bg-teal-400"
                                                    style={{ width: `${stat.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={() => setData(null)}
                            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
                        >
                            <RefreshCcw size={14} />
                            Analyze Another Collection
                        </button>
                    </div>

                </div>
            )}

        </div>
    );
}
