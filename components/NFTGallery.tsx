"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ExternalLink, Info } from "lucide-react";

interface NFTAttribute {
    trait_type: string;
    value: string;
}

interface NFT {
    id: string;
    name: string;
    collection: string;
    image: string;
    description: string;
    attributes: NFTAttribute[];
}

const MOCK_NFTS: NFT[] = [
    {
        id: "1",
        name: "Aether Guardian #42",
        collection: "Lumera Genesis",
        image: "https://images.unsplash.com/photo-1635322966219-b75d7e0d836c?w=800&q=80",
        description: "A celestial being formed from the raw energy of the Lumera nebula.",
        attributes: [
            { trait_type: "Class", value: "Celestial" },
            { trait_type: "Element", value: "Void" },
            { trait_type: "Power", value: "95" }
        ]
    },
    {
        id: "2",
        name: "Cyber Ronin 2077",
        collection: "Neon City",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
        description: " protector of the digital district.",
        attributes: [
            { trait_type: "Weapon", value: "Katana" },
            { trait_type: "Cybernetics", value: "Full" },
            { trait_type: "Rarity", value: "Epic" }
        ]
    },
    {
        id: "3",
        name: "Abstract Thought",
        collection: "Mindscapes",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        description: "A visual representation of complex cognitive processes.",
        attributes: [
            { trait_type: "Style", value: "Abstract" },
            { trait_type: "Mood", value: "Serene" }
        ]
    },
    {
        id: "4",
        name: "Golden Geometry",
        collection: "Mathematical Art",
        image: "https://images.unsplash.com/photo-1614730341194-75c6074065db?w=800&q=80",
        description: "Sacred geometry manifested in digital gold.",
        attributes: [
            { trait_type: "Shape", value: "Icosahedron" },
            { trait_type: "Material", value: "Gold" }
        ]
    },
    {
        id: "5",
        name: "Deep Space Voyager",
        collection: "Cosmic Series",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        description: "Exploring the unknown boundaries of the universe.",
        attributes: [
            { trait_type: "Mission", value: "Exploration" },
            { trait_type: "Sector", value: "Alpha" }
        ]
    },
    {
        id: "6",
        name: "Glitch Punk",
        collection: "Error 404",
        image: "https://images.unsplash.com/photo-1614728853913-3e2739593226?w=800&q=80",
        description: "Beauty found in system corruption.",
        attributes: [
            { trait_type: "Error", value: "Critical" },
            { trait_type: "Color", value: "RGB" }
        ]
    }
];

export default function NFTGallery() {
    const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

    return (
        <div className="w-full max-w-7xl mx-auto py-8">

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_NFTS.map((nft) => (
                    <motion.div
                        key={nft.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="gallery-card group relative bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer border border-[#333] hover:border-[#d4af37]/50"
                        onClick={() => setSelectedNFT(nft)}
                    >
                        <div className="aspect-square relative overflow-hidden">
                            <img
                                src={nft.image}
                                alt={nft.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white text-sm font-heading tracking-widest uppercase flex items-center gap-2">
                                    <Maximize2 size={16} className="text-[#d4af37]" />
                                    View Details
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-[#888] text-xs font-heading uppercase tracking-widest mb-1">{nft.collection}</p>
                            <h3 className="text-xl text-[#f5f5f5] font-light font-heading">{nft.name}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal View */}
            <AnimatePresence>
                {selectedNFT && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                        onClick={() => setSelectedNFT(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#111] max-w-4xl w-full rounded-2xl overflow-hidden border border-[#333] shadow-2xl flex flex-col md:flex-row relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedNFT(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Left: Image */}
                            <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                                <img src={selectedNFT.image} alt={selectedNFT.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Right: Details */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[60vh] md:max-h-auto scrollbar-hide">
                                <div>
                                    <h2 className="text-[#d4af37] text-sm font-heading uppercase tracking-[0.2em] mb-2">{selectedNFT.collection}</h2>
                                    <h1 className="text-4xl text-white font-heading font-light mb-6">{selectedNFT.name}</h1>
                                    <p className="text-[#aaa] font-body leading-relaxed mb-8 border-l-2 border-[#d4af37]/30 pl-4">{selectedNFT.description}</p>

                                    <div className="mb-8">
                                        <h3 className="text-white text-sm font-heading mb-4 flex items-center gap-2">
                                            <Info size={16} className="text-[#d4af37]" />
                                            Attributes
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedNFT.attributes.map((attr, i) => (
                                                <div key={i} className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">
                                                    <p className="text-[#666] text-[10px] uppercase tracking-wider mb-1">{attr.trait_type}</p>
                                                    <p className="text-[#eee] text-sm font-medium">{attr.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black font-heading font-bold uppercase tracking-wider text-xs hover:bg-[#b8982f] transition-colors rounded-sm"
                                    >
                                        <ExternalLink size={16} />
                                        View on Explorer
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
