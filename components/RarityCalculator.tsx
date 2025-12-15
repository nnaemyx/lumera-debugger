"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Trophy, BarChart3, Zap, Diamond, Filter } from "lucide-react";

interface Trait {
    type: string;
    value: string;
    percent: number;
}

interface RankedNFT {
    id: string;
    name: string;
    image: string;
    rank: number;
    score: number;
    traits: Trait[];
}

// Mock Data simulating a collection
const MOCK_COLLECTION: RankedNFT[] = [
    {
        id: "3321",
        name: "Neon Genesis #3321",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&q=80",
        rank: 1,
        score: 845.2,
        traits: [
            { type: "Background", value: "Holographic void", percent: 0.5 },
            { type: "Body", value: "Gold Cybernetic", percent: 1.2 },
            { type: "Eyes", value: "Laser Red", percent: 3.5 }
        ]
    },
    {
        id: "1042",
        name: "Neon Genesis #1042",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80",
        rank: 2,
        score: 720.5,
        traits: [
            { type: "Background", value: "Deep Space", percent: 2.1 },
            { type: "Body", value: "Chrome", percent: 5.0 },
            { type: "Accessory", value: "Crown", percent: 0.8 }
        ]
    },
    {
        id: "559",
        name: "Neon Genesis #559",
        image: "https://images.unsplash.com/photo-1635322966219-b75d7e0d836c?w=500&q=80",
        rank: 3,
        score: 650.1,
        traits: [
            { type: "Background", value: "City Night", percent: 8.0 },
            { type: "Body", value: "Ghost", percent: 1.5 },
            { type: "Eyes", value: "Void", percent: 2.2 }
        ]
    },
    {
        id: "8888",
        name: "Neon Genesis #8888",
        image: "https://images.unsplash.com/photo-1614730341194-75c6074065db?w=500&q=80",
        rank: 45,
        score: 320.4,
        traits: [
            { type: "Background", value: "Blue", percent: 15.0 },
            { type: "Body", value: "Standard", percent: 25.0 }
        ]
    },
    {
        id: "123",
        name: "Neon Genesis #123",
        image: "https://images.unsplash.com/photo-1614728853913-3e2739593226?w=500&q=80",
        rank: 156,
        score: 110.2,
        traits: [
            { type: "Background", value: "Grey", percent: 30.0 },
            { type: "Body", value: "Damaged", percent: 12.0 }
        ]
    },
    {
        id: "442",
        name: "Neon Genesis #442",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80",
        rank: 204,
        score: 95.5,
        traits: [
            { type: "Background", value: "White", percent: 20.0 },
            { type: "Body", value: "Standard", percent: 25.0 }
        ]
    }
];

export default function RarityCalculator() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNFTs, setFilteredNFTs] = useState<RankedNFT[]>(MOCK_COLLECTION);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (!term) {
            setFilteredNFTs(MOCK_COLLECTION);
            return;
        }
        const lower = term.toLowerCase();
        setFilteredNFTs(MOCK_COLLECTION.filter(nft =>
            nft.id.includes(lower) || nft.name.toLowerCase().includes(lower)
        ));
    };

    const getRankColor = (rank: number) => {
        if (rank === 1) return "text-[var(--rank-legendary)] shadow-[0_0_15px_rgba(251,191,36,0.5)]";
        if (rank <= 3) return "text-[var(--rank-epic)]";
        if (rank <= 50) return "text-[var(--rank-rare)]";
        return "text-[var(--rank-common)]";
    };

    const getCardBorder = (rank: number) => {
        if (rank === 1) return "border-[var(--rank-legendary)] bg-[rgba(251,191,36,0.05)]";
        if (rank <= 3) return "border-[var(--rank-epic)] bg-[rgba(217,70,239,0.05)]";
        return "border-[#3b3054] hover:border-[#8b5cf6]";
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8">

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#1e1b2e] p-4 rounded-xl border border-[#3b3054]">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID or Name..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full bg-[#0f0a1e] border border-[#3b3054] text-[#e2e8f0] rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-[#d946ef] transition-colors"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0f0a1e] border border-[#3b3054] rounded-lg text-sm font-medium text-[#e2e8f0] hover:border-[#8b5cf6] transition-colors">
                        <Filter size={16} />
                        <span>Traits</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white rounded-lg text-sm font-bold tracking-wide shadow-lg shadow-[rgba(217,70,239,0.3)] hover:shadow-[rgba(217,70,239,0.5)] transition-all">
                        <Zap size={16} />
                        <span>Calculate Rarity</span>
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNFTs.map((nft) => (
                    <motion.div
                        key={nft.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`card-gradient rounded-xl overflow-hidden border transition-all duration-300 group hover:-translate-y-1 ${getCardBorder(nft.rank)}`}
                    >
                        {/* Image & Rank Badge */}
                        <div className="relative aspect-square overflow-hidden">
                            <img src={nft.image} alt={nft.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute top-3 left-3 bg-[#0f0a1e]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                                <Trophy size={12} className={getRankColor(nft.rank).split(" ")[0]} />
                                <span className="text-xs font-bold text-white">Rank #{nft.rank}</span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-bold text-white truncate pr-2">{nft.name}</h3>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase text-[#94a3b8] font-bold">Rarity Score</p>
                                    <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#06b6d4]">
                                        {nft.score}
                                    </p>
                                </div>
                            </div>

                            {/* Top Traits */}
                            <div className="space-y-2">
                                <p className="text-xs text-[#94a3b8] uppercase font-bold tracking-wider mb-2">Top Traits</p>
                                {nft.traits.slice(0, 3).map((trait, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs bg-[#0f0a1e] p-2 rounded border border-[#3b3054]">
                                        <span className="text-[#e2e8f0]">{trait.value}</span>
                                        <span className={`font-mono font-bold ${trait.percent < 2 ? "text-[var(--rank-legendary)]" : "text-[#94a3b8]"}`}>
                                            {trait.percent}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredNFTs.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-[#94a3b8] text-lg">No assets found matching "{searchTerm}"</p>
                </div>
            )}

        </div>
    );
}
