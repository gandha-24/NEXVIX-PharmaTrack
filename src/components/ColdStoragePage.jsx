import React, { useState, useEffect } from 'react';
import { Snowflake, Droplets, Activity, ShieldCheck, Cpu, Zap, Beaker, BarChart3, Waves, Thermometer } from 'lucide-react';

export default function ColdStoragePage() {
  const [humidity, setHumidity] = useState(45);
  const [preservation, setPreservation] = useState(98.5);
  const [safetyScore, setSafetyScore] = useState(94);

  useEffect(() => {
    const interval = setInterval(() => {
      setHumidity(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(30, Math.min(60, prev + change));
      });
      setPreservation(prev => {
        const change = (Math.random() - 0.5) * 0.5;
        return Math.max(90, Math.min(100, prev + change));
      });
      setSafetyScore(prev => {
        const change = (Math.random() - 0.5) * 1.5;
        return Math.max(80, Math.min(100, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-8 z-10 text-slate-200">
      {/* Prototype Banners */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 flex items-center gap-4 backdrop-blur-md relative overflow-hidden group shadow-[0_0_15px_rgba(99,102,241,0.05)] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex h-3 w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </div>
          <div>
            <h4 className="text-indigo-400 font-bold text-sm tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]">
              Prototype Simulation Mode
            </h4>
            <p className="text-xs text-indigo-400/80 mt-0.5">Advanced environmental monitoring analytics.</p>
          </div>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center gap-4 backdrop-blur-md relative overflow-hidden group shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Zap className="w-5 h-5 text-cyan-400 animate-pulse flex-shrink-0" />
          <div>
            <h4 className="text-cyan-400 font-bold text-sm tracking-widest uppercase drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">
              Future IoT Expansion
            </h4>
            <p className="text-xs text-cyan-400/80 mt-0.5">Ready for next-gen sensor mesh integration.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">Cold Storage & Preservation</h2>
          <p className="text-sm text-slate-400 mt-1">Live environmental telemetry and drug viability scoring.</p>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Cold Storage Status */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="absolute -inset-0.5 bg-blue-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 shadow-inner group-hover:border-blue-500/50 transition-colors">
              <Snowflake className="w-5 h-5 text-blue-400" />
            </div>
            <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Active</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1 group-hover:text-blue-300 transition-colors">Cold Storage Network</h3>
          <div className="text-3xl font-bold text-white tracking-tight">100%</div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><Activity className="w-3 h-3 text-blue-400" /> Compressors Nominal</p>
        </div>

        {/* Humidity Status */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="absolute -inset-0.5 bg-cyan-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 shadow-inner group-hover:border-cyan-500/50 transition-colors">
              <Droplets className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Optimal</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1 group-hover:text-cyan-300 transition-colors">Ambient Humidity</h3>
          <div className="text-3xl font-bold text-white tracking-tight">{humidity.toFixed(1)}<span className="text-lg text-slate-500 ml-1">%</span></div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><Waves className="w-3 h-3 text-cyan-400" /> Auto-regulating</p>
        </div>

        {/* Preservation Indicator */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="absolute -inset-0.5 bg-emerald-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 shadow-inner group-hover:border-emerald-500/50 transition-colors">
              <Beaker className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Stable</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1 group-hover:text-emerald-300 transition-colors">Drug Preservation</h3>
          <div className="text-3xl font-bold text-white tracking-tight">{preservation.toFixed(1)}<span className="text-lg text-slate-500 ml-1">%</span></div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> Viability Confirmed</p>
        </div>

        {/* Shipment Safety Score */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="absolute -inset-0.5 bg-indigo-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 shadow-inner group-hover:border-indigo-500/50 transition-colors">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Excellent</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1 group-hover:text-indigo-300 transition-colors">Shipment Safety Score</h3>
          <div className="text-3xl font-bold text-white tracking-tight">{safetyScore.toFixed(0)}<span className="text-lg text-slate-500 ml-1">/ 100</span></div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><BarChart3 className="w-3 h-3 text-indigo-400" /> Above industry avg</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analytics Graph Mockup */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" /> Storage Health Analytics
            </h3>
          </div>
          <div className="h-64 relative w-full border-b border-l border-slate-800 pb-4 pl-4 flex items-end">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradientPreserve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                </linearGradient>
              </defs>
              {/* Viability Index Line */}
              <path d="M 0,220 Q 100,180 200,210 T 400,200 T 600,190 T 800,215 T 1000,195" fill="none" stroke="#10b981" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M 0,220 Q 100,180 200,210 T 400,200 T 600,190 T 800,215 T 1000,195 L 1000,250 L 0,250 Z" fill="url(#gradientPreserve)" stroke="none" />
              
              {/* Humidity Levels Line */}
              <path d="M 0,50 Q 100,60 200,45 T 400,55 T 600,40 T 800,60 T 1000,50" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="absolute left-[-30px] top-0 bottom-4 flex flex-col justify-between text-[10px] text-slate-500 font-mono">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
            </div>
            <div className="absolute left-4 right-0 bottom-[-20px] flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Day 1</span>
              <span>Day 2</span>
              <span>Day 3</span>
              <span>Day 4</span>
              <span>Day 5</span>
              <span>Day 6</span>
              <span>Today</span>
            </div>
            <div className="absolute inset-0 ml-4 mb-4 border-b border-t border-slate-800/30 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-slate-800/30 w-full h-0"></div>
              <div className="border-b border-slate-800/30 w-full h-0"></div>
            </div>
          </div>
          <div className="flex gap-4 mt-8 justify-center">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></div><span className="text-xs text-slate-400">Viability Index</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]"></div><span className="text-xs text-slate-400">Humidity Levels</span></div>
          </div>
        </div>

        {/* Environmental Modules */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" /> Simulated Environment Modules
          </h3>
          <div className="space-y-4">
            {[
              { id: 'ENV-Alpha', label: 'Vaccine Sub-Zero Array', temp: '-78°C', hum: '22%', status: 'Optimal', icon: Snowflake, glow: 'text-blue-400' },
              { id: 'ENV-Beta', label: 'Antibiotic Climate Room', temp: '18°C', hum: '45%', status: 'Optimal', icon: Thermometer, glow: 'text-amber-400' },
              { id: 'ENV-Gamma', label: 'Plasma Cryo-Vault', temp: '-35°C', hum: '18%', status: 'Active', icon: Beaker, glow: 'text-indigo-400' }
            ].map((mod, i) => (
              <div key={i} className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between hover:border-slate-600 hover:bg-slate-800/30 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700/50 flex items-center justify-center group-hover:border-slate-500 shadow-inner transition-colors">
                    <mod.icon className={`w-6 h-6 text-slate-400 group-hover:${mod.glow} transition-colors`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-slate-200 transition-colors">{mod.label}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{mod.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Temp</div>
                    <div className="text-sm font-semibold text-white">{mod.temp}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">RH</div>
                    <div className="text-sm font-semibold text-white">{mod.hum}</div>
                  </div>
                  <div className="w-20">
                    <span className="inline-block bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{mod.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
