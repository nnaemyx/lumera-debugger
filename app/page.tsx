"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import NodeMonitor from "@/components/NodeMonitor";
import { motion } from "framer-motion";
import { Server, ShieldCheck, Globe, Cpu } from "lucide-react";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#0f172a]">
      {/* Background Ambience (Circuit/Grid) */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(16,185,129,0.1),transparent_60%)] pointer-events-none" />

      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10 flex-grow">

        {/* Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Network Status", value: "Degraded", status: "warning", icon: Globe },
            { label: "Active Validators", value: "84/100", status: "normal", icon: ShieldCheck },
            { label: "Avg Block Time", value: "1.2s", status: "good", icon: ClockIcon },
            { label: "TPS (Current)", value: "2,405", status: "good", icon: Cpu },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-lg border-l-4 border-l-emerald-500/50 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-1">{stat.label}</p>
                <p className="text-lg font-mono font-bold text-slate-200">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-md ${stat.status === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                <stat.icon size={18} />
              </div>
            </div>
          ))}
        </div>

        {/* Console / Monitor Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Node Monitor */}
          <div className="lg:col-span-2 space-y-6">
            <NodeMonitor />

            {/* Logs / Console stub */}
            <div className="glass-panel rounded-xl overflow-hidden border border-slate-800">
              <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">System Logs</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-emerald-500 uppercase font-bold">Live</span>
                </span>
              </div>
              <div className="p-4 font-mono text-xs text-slate-400 h-32 overflow-y-auto space-y-1">
                <p><span className="text-slate-600">[14:20:01]</span> Connected to mesh network.</p>
                <p><span className="text-slate-600">[14:20:02]</span> Syncing block headers... <span className="text-emerald-500">Done (2ms)</span></p>
                <p><span className="text-slate-600">[14:20:05]</span> Discovered 12 peers.</p>
                <p><span className="text-slate-600">[14:20:12]</span> <span className="text-amber-500">WARN:</span> High latency on peer 192.168.1.105</p>
                <p><span className="text-slate-600">[14:20:15]</span> Block #1254033 finalized.</p>
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-panel p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                <Server size={16} className="text-emerald-500" />
                Infrastructure Health
              </h3>

              <div className="space-y-4">
                <HealthBar label="API Gateway" percent={98} />
                <HealthBar label="Indexer Service" percent={82} color="amber" />
                <HealthBar label="Storage Cluster" percent={100} />
                <HealthBar label="P2P Layer" percent={95} />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-emerald-900/10 border border-emerald-500/20 text-center">
              <ShieldCheck size={32} className="mx-auto text-emerald-500 mb-2" />
              <h4 className="text-emerald-400 font-bold text-sm">Secure Connection</h4>
              <p className="text-xs text-emerald-500/60 mt-1">End-to-end encrypted telemetry</p>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0f172a] py-4 mt-auto">
        <div className="container mx-auto px-6 flex justify-between items-center text-xs font-mono text-slate-600">
          <p>Lumera Sentinel v3.0.1</p>
          <p>Latency: 24ms</p>
        </div>
      </footer>
    </div>
  );
}

function ClockIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function HealthBar({ label, percent, color = "emerald" }: { label: string, percent: number, color?: "emerald" | "amber" | "red" }) {
  const colorClass = color === "emerald" ? "bg-emerald-500" : color === "amber" ? "bg-amber-500" : "bg-red-500";

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-300 font-mono">{percent}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
