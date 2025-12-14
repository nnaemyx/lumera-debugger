"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { 
  StickyNote, 
  Plus, 
  Search,
  Edit2,
  Trash2,
  Save,
  X,
  Copy,
  CheckCircle,
  FileText,
  Calendar,
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WalletNote {
  id: string;
  address: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export default function WalletNotesApp() {
  const { address: connectedAddress } = useWallet();
  const [notes, setNotes] = useState<WalletNote[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<WalletNote | null>(null);
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: "" });
  const [copied, setCopied] = useState(false);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("wallet_notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (err) {
        console.error("Error loading notes:", err);
      }
    }
  }, []);

  // Auto-select connected address
  useEffect(() => {
    if (connectedAddress && !selectedAddress) {
      setSelectedAddress(connectedAddress);
    }
  }, [connectedAddress]);

  // Save notes to localStorage
  const saveNotes = (updatedNotes: WalletNote[]) => {
    setNotes(updatedNotes);
    localStorage.setItem("wallet_notes", JSON.stringify(updatedNotes));
  };

  // Get all unique addresses from notes
  const allAddresses = Array.from(new Set(notes.map(note => note.address)));

  // Get all unique tags
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  // Filter notes
  const filteredNotes = notes.filter(note => {
    const matchesAddress = !selectedAddress || note.address.toLowerCase() === selectedAddress.toLowerCase();
    const matchesSearch = !searchQuery || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !filterTag || note.tags.includes(filterTag);
    return matchesAddress && matchesSearch && matchesTag;
  });

  // Get notes for selected address
  const addressNotes = filteredNotes.filter(note => 
    !selectedAddress || note.address.toLowerCase() === selectedAddress.toLowerCase()
  );

  const handleAddNote = () => {
    if (!selectedAddress || !newNote.title.trim() || !newNote.content.trim()) {
      return;
    }

    const tags = newNote.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const note: WalletNote = {
      id: Date.now().toString(),
      address: selectedAddress,
      title: newNote.title.trim(),
      content: newNote.content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags
    };

    saveNotes([...notes, note]);
    setNewNote({ title: "", content: "", tags: "" });
    setIsAddingNote(false);
  };

  const handleEditNote = (note: WalletNote) => {
    setEditingNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
      tags: note.tags.join(", ")
    });
    setIsAddingNote(true);
  };

  const handleUpdateNote = () => {
    if (!editingNote || !newNote.title.trim() || !newNote.content.trim()) {
      return;
    }

    const tags = newNote.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const updatedNotes = notes.map(note =>
      note.id === editingNote.id
        ? {
            ...note,
            title: newNote.title.trim(),
            content: newNote.content.trim(),
            tags,
            updatedAt: new Date().toISOString()
          }
        : note
    );

    saveNotes(updatedNotes);
    setEditingNote(null);
    setNewNote({ title: "", content: "", tags: "" });
    setIsAddingNote(false);
  };

  const handleDeleteNote = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      saveNotes(notes.filter(note => note.id !== id));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#2a1f1f] to-[#3a2f2f] rounded-3xl p-8 border-2 border-amber-500/20 shadow-2xl backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 rounded-2xl flex items-center justify-center shadow-xl glow-primary border-2 border-amber-400/40">
              <StickyNote className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                Wallet Notes
              </h2>
              <p className="text-sm text-gray-300">
                Save personal notes tied to wallet addresses
              </p>
            </div>
          </div>

          {/* Address Selector */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                placeholder="Enter or select wallet address..."
                className="w-full px-6 py-4 bg-[#1a0f0f] border-2 border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60 transition-all duration-200 font-mono text-sm"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              />
            </div>
            {connectedAddress && (
              <button
                onClick={() => {
                  setSelectedAddress(connectedAddress);
                  setIsAddingNote(true);
                }}
                className="px-6 py-4 bg-amber-500/10 border-2 border-amber-500/30 hover:border-amber-500/50 text-amber-300 rounded-xl transition-all duration-200 font-semibold text-sm hover:bg-amber-500/20"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Use My Wallet
              </button>
            )}
          </div>

          {/* Address Quick Select */}
          {allAddresses.length > 0 && (
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Quick Select</p>
              <div className="flex flex-wrap gap-2">
                {allAddresses.map(addr => (
                  <button
                    key={addr}
                    onClick={() => setSelectedAddress(addr)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                      selectedAddress.toLowerCase() === addr.toLowerCase()
                        ? 'bg-amber-500/20 border-2 border-amber-500/50 text-amber-300'
                        : 'bg-[#1a0f0f] border-2 border-amber-500/20 text-gray-400 hover:border-amber-500/40 hover:text-amber-300'
                    }`}
                    style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                  >
                    {formatAddress(addr)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-12 pr-4 py-3 bg-[#1a0f0f] border-2 border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60 transition-all duration-200"
                style={{ fontFamily: 'var(--font-work-sans)' }}
              />
            </div>
            {allTags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="text-amber-400" size={18} />
                <select
                  value={filterTag || ""}
                  onChange={(e) => setFilterTag(e.target.value || null)}
                  className="px-4 py-3 bg-[#1a0f0f] border-2 border-amber-500/30 rounded-xl text-white focus:outline-none focus:border-amber-500/60 transition-all duration-200"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  <option value="">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Note Form */}
      <AnimatePresence>
        {isAddingNote && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-[#2a1f1f] to-[#3a2f2f] rounded-3xl p-8 border-2 border-amber-500/20 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                {editingNote ? "Edit Note" : "New Note"}
              </h3>
              <button
                onClick={() => {
                  setIsAddingNote(false);
                  setEditingNote(null);
                  setNewNote({ title: "", content: "", tags: "" });
                }}
                className="p-2 hover:bg-amber-500/10 rounded-xl transition-colors text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note title..."
                  className="w-full px-4 py-3 bg-[#1a0f0f] border-2 border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60 transition-all duration-200"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Content</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Write your note here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-[#1a0f0f] border-2 border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60 transition-all duration-200 resize-none"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  placeholder="tag1, tag2, tag3..."
                  className="w-full px-4 py-3 bg-[#1a0f0f] border-2 border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60 transition-all duration-200"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={editingNote ? handleUpdateNote : handleAddNote}
                  disabled={!selectedAddress || !newNote.title.trim() || !newNote.content.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl transition-all duration-200 font-semibold text-sm shadow-lg glow-primary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  <Save size={18} />
                  {editingNote ? "Update Note" : "Save Note"}
                </button>
                <button
                  onClick={() => {
                    setIsAddingNote(false);
                    setEditingNote(null);
                    setNewNote({ title: "", content: "", tags: "" });
                  }}
                  className="px-6 py-3 bg-[#1a0f0f] border-2 border-amber-500/30 hover:border-amber-500/50 text-amber-300 rounded-xl transition-all duration-200 font-semibold text-sm"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes Grid */}
      {!isAddingNote && (
        <div>
          {addressNotes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#2a1f1f] to-[#3a2f2f] rounded-3xl p-12 border-2 border-amber-500/20 shadow-2xl backdrop-blur-sm text-center"
            >
              <StickyNote className="text-amber-500/30 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                {selectedAddress ? "No notes yet" : "Select an address to view notes"}
              </h3>
              <p className="text-gray-400 mb-6">
                {selectedAddress 
                  ? "Create your first note for this wallet address"
                  : "Enter a wallet address or use your connected wallet to get started"
                }
              </p>
              {selectedAddress && (
                <button
                  onClick={() => setIsAddingNote(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl transition-all duration-200 font-semibold text-sm shadow-lg glow-primary"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  <Plus size={18} />
                  Create Note
                </button>
              )}
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addressNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-[#2a1f1f] to-[#3a2f2f] rounded-2xl p-6 border-2 border-amber-500/20 shadow-xl hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 relative group"
                >
                  {/* Note Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {note.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <Calendar size={12} />
                        <span>{formatDate(note.updatedAt)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditNote(note)}
                        className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors text-amber-400 hover:text-amber-300"
                        title="Edit note"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400 hover:text-red-300"
                        title="Delete note"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Note Content */}
                  <p className="text-sm text-gray-300 mb-4 line-clamp-4" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    {note.content}
                  </p>

                  {/* Tags */}
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300"
                          style={{ fontFamily: 'var(--font-work-sans)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Address */}
                  <div className="flex items-center justify-between pt-4 border-t border-amber-500/10">
                    <div className="flex items-center gap-2">
                      <FileText className="text-amber-400" size={14} />
                      <span className="text-xs text-gray-400 font-mono" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
                        {formatAddress(note.address)}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(note.address)}
                      className="p-1.5 hover:bg-amber-500/10 rounded-lg transition-colors text-gray-400 hover:text-amber-300"
                      title="Copy address"
                    >
                      {copied ? (
                        <CheckCircle className="text-amber-400" size={14} />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      {notes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#2a1f1f] to-[#3a2f2f] rounded-3xl p-6 border-2 border-amber-500/20 shadow-2xl backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-400 mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
                {notes.length}
              </p>
              <p className="text-sm text-gray-400">Total Notes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-400 mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
                {allAddresses.length}
              </p>
              <p className="text-sm text-gray-400">Wallets</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400 mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
                {allTags.length}
              </p>
              <p className="text-sm text-gray-400">Tags</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
