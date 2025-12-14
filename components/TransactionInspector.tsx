"use client";

import { useState } from "react";
import { getTransactionByHash, TransactionDetails } from "@/lib/cosmos-client";
import { 
  Search, 
  FileCode,
  Copy,
  CheckCircle,
  Loader2,
  Hash,
  Clock,
  Zap,
  FileText,
  Layers,
  Activity,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion } from "framer-motion";

export default function TransactionInspector() {
  const [txHash, setTxHash] = useState("");
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["overview", "messages"]));

  const handleSearch = async () => {
    if (!txHash.trim()) {
      setError("Please enter a transaction hash");
      return;
    }

    setIsLoading(true);
    setError(null);
    setTransaction(null);

    try {
      const tx = await getTransactionByHash(txHash.trim());
      if (tx) {
        setTransaction(tx);
      } else {
        setError("Transaction not found");
      }
    } catch (err: any) {
      console.error("Error fetching transaction:", err);
      setError(err.message || "Failed to fetch transaction. Please check the hash and try again.");
      setTransaction(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const formatHash = (hash: string) => {
    if (!hash) return "N/A";
    return `${hash.slice(0, 16)}...${hash.slice(-12)}`;
  };

  const formatAddress = (addr: string) => {
    if (!addr) return "N/A";
    return `${addr.slice(0, 12)}...${addr.slice(-8)}`;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const formatJSON = (obj: any) => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-3xl p-8 border-2 border-cyan-500/20 shadow-2xl backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl glow-primary border-2 border-cyan-400/40">
              <FileCode className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Transaction Inspector
              </h2>
              <p className="text-sm text-gray-300">
                Inspect transaction details, gas, logs, events, and decoded data
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Paste transaction hash..."
                className="w-full pl-12 pr-4 py-4 bg-[#0d0d17] border-2 border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 transition-all duration-200 font-mono text-sm"
                style={{ fontFamily: 'var(--font-inconsolata)' }}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading || !txHash.trim()}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white rounded-xl transition-all duration-200 font-semibold text-sm shadow-lg glow-primary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Inspecting...</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>Inspect</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-950/50 border-2 border-red-500/30 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-300">{error}</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Transaction Details */}
      {transaction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Overview Section */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-3xl p-8 border-2 border-cyan-500/20 shadow-2xl backdrop-blur-sm">
            <button
              onClick={() => toggleSection("overview")}
              className="w-full flex items-center justify-between mb-6"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <Activity className="text-cyan-400" size={24} />
                Overview
              </h3>
              {expandedSections.has("overview") ? (
                <ChevronUp className="text-cyan-400" size={20} />
              ) : (
                <ChevronDown className="text-cyan-400" size={20} />
              )}
            </button>

            {expandedSections.has("overview") && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="text-cyan-400" size={16} />
                    <span className="text-xs text-gray-400 uppercase">Transaction Hash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono text-white flex-1" style={{ fontFamily: 'var(--font-inconsolata)' }}>
                      {formatHash(transaction.hash)}
                    </p>
                    <button
                      onClick={() => copyToClipboard(transaction.hash, "tx-hash")}
                      className="p-1.5 hover:bg-cyan-500/10 rounded-lg transition-colors"
                    >
                      {copied === "tx-hash" ? (
                        <CheckCircle className="text-cyan-400" size={14} />
                      ) : (
                        <Copy className="text-gray-400 hover:text-cyan-400" size={14} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-sky-400" size={16} />
                    <span className="text-xs text-gray-400 uppercase">Timestamp</span>
                  </div>
                  <p className="text-sm text-white">{formatDate(transaction.timestamp)}</p>
                </div>
                <div className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="text-blue-400" size={16} />
                    <span className="text-xs text-gray-400 uppercase">Block Height</span>
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    {parseInt(transaction.height).toLocaleString()}
                  </p>
                </div>
                <div className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className={`${transaction.code === 0 ? 'text-emerald-400' : 'text-red-400'}`} size={16} />
                    <span className="text-xs text-gray-400 uppercase">Status</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    transaction.code === 0 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {transaction.code === 0 ? "Success" : `Failed (Code: ${transaction.code})`}
                  </span>
                  {transaction.codespace && (
                    <p className="text-xs text-gray-400 mt-1">Codespace: {transaction.codespace}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Gas Information */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-3xl p-8 border-2 border-cyan-500/20 shadow-2xl backdrop-blur-sm">
            <button
              onClick={() => toggleSection("gas")}
              className="w-full flex items-center justify-between mb-6"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <Zap className="text-cyan-400" size={24} />
                Gas Information
              </h3>
              {expandedSections.has("gas") ? (
                <ChevronUp className="text-cyan-400" size={20} />
              ) : (
                <ChevronDown className="text-cyan-400" size={20} />
              )}
            </button>

            {expandedSections.has("gas") && (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-cyan-400" size={16} />
                    <span className="text-xs text-gray-400 uppercase">Gas Used</span>
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    {parseInt(transaction.gasUsed).toLocaleString()}
                  </p>
                </div>
                <div className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-sky-400" size={16} />
                    <span className="text-xs text-gray-400 uppercase">Gas Wanted</span>
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    {parseInt(transaction.gasWanted).toLocaleString()}
                  </p>
                </div>
                {transaction.fee && (
                  <div className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="text-blue-400" size={16} />
                      <span className="text-xs text-gray-400 uppercase">Fee</span>
                    </div>
                    <p className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                      {transaction.fee.amount} {transaction.fee.denom.toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Messages Section */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-3xl p-8 border-2 border-cyan-500/20 shadow-2xl backdrop-blur-sm">
            <button
              onClick={() => toggleSection("messages")}
              className="w-full flex items-center justify-between mb-6"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <FileText className="text-cyan-400" size={24} />
                Messages ({transaction.messages.length})
              </h3>
              {expandedSections.has("messages") ? (
                <ChevronUp className="text-cyan-400" size={20} />
              ) : (
                <ChevronDown className="text-cyan-400" size={20} />
              )}
            </button>

            {expandedSections.has("messages") && (
              <div className="space-y-4">
                {transaction.messages.map((msg, idx) => (
                  <div key={idx} className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-400 uppercase">Message {idx + 1}</span>
                      <button
                        onClick={() => copyToClipboard(formatJSON(msg), `msg-${idx}`)}
                        className="p-1.5 hover:bg-cyan-500/10 rounded-lg transition-colors"
                      >
                        {copied === `msg-${idx}` ? (
                          <CheckCircle className="text-cyan-400" size={14} />
                        ) : (
                          <Copy className="text-gray-400 hover:text-cyan-400" size={14} />
                        )}
                      </button>
                    </div>
                    <pre className="text-xs text-gray-300 overflow-x-auto" style={{ fontFamily: 'var(--font-inconsolata)' }}>
                      {formatJSON(msg)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Events Section */}
          {transaction.events.length > 0 && (
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-3xl p-8 border-2 border-cyan-500/20 shadow-2xl backdrop-blur-sm">
              <button
                onClick={() => toggleSection("events")}
                className="w-full flex items-center justify-between mb-6"
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  <Layers className="text-cyan-400" size={24} />
                  Events ({transaction.events.length})
                </h3>
                {expandedSections.has("events") ? (
                  <ChevronUp className="text-cyan-400" size={20} />
                ) : (
                  <ChevronDown className="text-cyan-400" size={20} />
                )}
              </button>

              {expandedSections.has("events") && (
                <div className="space-y-4">
                  {transaction.events.map((event, idx) => (
                    <div key={idx} className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-sm font-semibold text-cyan-400">{event.type || "Unknown Event"}</span>
                          {event.attributes && (
                            <span className="text-xs text-gray-400 ml-2">
                              ({event.attributes.length} attributes)
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => copyToClipboard(formatJSON(event), `event-${idx}`)}
                          className="p-1.5 hover:bg-cyan-500/10 rounded-lg transition-colors"
                        >
                          {copied === `event-${idx}` ? (
                            <CheckCircle className="text-cyan-400" size={14} />
                          ) : (
                            <Copy className="text-gray-400 hover:text-cyan-400" size={14} />
                          )}
                        </button>
                      </div>
                      {event.attributes && event.attributes.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {event.attributes.map((attr: any, attrIdx: number) => (
                            <div key={attrIdx} className="flex items-start gap-2 text-xs">
                              <span className="text-cyan-300 font-mono flex-shrink-0" style={{ fontFamily: 'var(--font-inconsolata)' }}>
                                {attr.key || attr.key}:
                              </span>
                              <span className="text-gray-300 font-mono break-all" style={{ fontFamily: 'var(--font-inconsolata)' }}>
                                {attr.value || attr.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Logs Section */}
          {transaction.logs.length > 0 && (
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-3xl p-8 border-2 border-cyan-500/20 shadow-2xl backdrop-blur-sm">
              <button
                onClick={() => toggleSection("logs")}
                className="w-full flex items-center justify-between mb-6"
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  <FileText className="text-cyan-400" size={24} />
                  Logs ({transaction.logs.length})
                </h3>
                {expandedSections.has("logs") ? (
                  <ChevronUp className="text-cyan-400" size={20} />
                ) : (
                  <ChevronDown className="text-cyan-400" size={20} />
                )}
              </button>

              {expandedSections.has("logs") && (
                <div className="space-y-4">
                  {transaction.logs.map((log, idx) => (
                    <div key={idx} className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-400 uppercase">Log {idx + 1}</span>
                        <button
                          onClick={() => copyToClipboard(formatJSON(log), `log-${idx}`)}
                          className="p-1.5 hover:bg-cyan-500/10 rounded-lg transition-colors"
                        >
                          {copied === `log-${idx}` ? (
                            <CheckCircle className="text-cyan-400" size={14} />
                          ) : (
                            <Copy className="text-gray-400 hover:text-cyan-400" size={14} />
                          )}
                        </button>
                      </div>
                      <pre className="text-xs text-gray-300 overflow-x-auto" style={{ fontFamily: 'var(--font-inconsolata)' }}>
                        {formatJSON(log)}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Raw Log */}
          {transaction.rawLog && (
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-3xl p-8 border-2 border-cyan-500/20 shadow-2xl backdrop-blur-sm">
              <button
                onClick={() => toggleSection("rawLog")}
                className="w-full flex items-center justify-between mb-6"
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  <FileCode className="text-cyan-400" size={24} />
                  Raw Log
                </h3>
                {expandedSections.has("rawLog") ? (
                  <ChevronUp className="text-cyan-400" size={20} />
                ) : (
                  <ChevronDown className="text-cyan-400" size={20} />
                )}
              </button>

              {expandedSections.has("rawLog") && (
                <div className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                  <div className="flex items-center justify-end mb-3">
                    <button
                      onClick={() => copyToClipboard(transaction.rawLog, "raw-log")}
                      className="p-1.5 hover:bg-cyan-500/10 rounded-lg transition-colors"
                    >
                      {copied === "raw-log" ? (
                        <CheckCircle className="text-cyan-400" size={14} />
                      ) : (
                        <Copy className="text-gray-400 hover:text-cyan-400" size={14} />
                      )}
                    </button>
                  </div>
                  <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap" style={{ fontFamily: 'var(--font-inconsolata)' }}>
                    {transaction.rawLog}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Memo */}
          {transaction.memo && (
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-3xl p-8 border-2 border-cyan-500/20 shadow-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <FileText className="text-cyan-400" size={24} />
                Memo
              </h3>
              <div className="bg-[#0d0d17] rounded-xl p-4 border border-cyan-500/10">
                <p className="text-sm text-gray-300 font-mono" style={{ fontFamily: 'var(--font-inconsolata)' }}>
                  {transaction.memo}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
