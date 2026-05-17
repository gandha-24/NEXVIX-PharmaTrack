import React from 'react';
import { Thermometer, ThermometerSun, Snowflake, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Clock, Activity, Cpu } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function TemperaturePage() {
  const { monitors } = useData();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Optimal': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Ultra-Cold':
      case 'Frozen': return <Snowflake className="w-5 h-5 text-cyan-400" />;
      case 'Cold Chain': return <Thermometer className="w-5 h-5 text-blue-400" />;
      case 'Ambient': return <ThermometerSun className="w-5 h-5 text-amber-400" />;
      default: return <Thermometer className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 z-10 text-slate-200">
      
      {/* Simulation Banners */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-brand-500/10 border border-brand-500/30 rounded-xl p-4 flex items-center gap-4 backdrop-blur-md relative overflow-hidden group shadow-[0_0_15px_rgba(56,189,248,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex h-3 w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
          </div>
          <div>
            <h4 className="text-brand-400 font-bold text-sm tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]">
              Simulation Mode
            </h4>
            <p className="text-xs text-brand-400/80 mt-0.5">Live data generation for demonstration purposes.</p>
          </div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-4 backdrop-blur-md relative overflow-hidden group shadow-[0_0_15px_rgba(245,158,11,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Cpu className="w-5 h-5 text-amber-400 animate-pulse flex-shrink-0" />
          <div>
            <h4 className="text-amber-400 font-bold text-sm tracking-widest uppercase drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
              IoT Sensor Integration Planned
            </h4>
            <p className="text-xs text-amber-400/80 mt-0.5">Awaiting physical sensor connections.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">Temperature Monitor</h2>
          <p className="text-sm text-slate-400 mt-1">Live telemetry for critical pharmaceutical storage environments.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/80 border border-slate-700/50 backdrop-blur-md shadow-lg shadow-black/20">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
             </span>
             <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Live Sync</span>
          </div>
        </div>
      </div>

      {/* Main Historical Chart Panel */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm backdrop-blur-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-400" /> System Temperature Aggregation
          </h3>
          <select className="bg-slate-950/50 border border-slate-800 text-slate-300 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-brand-500 transition-colors">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        
        {/* SVG Chart Mockup */}
        <div className="h-64 relative w-full border-b border-l border-slate-800 pb-4 pl-4 flex items-end">
          {/* Y Axis Labels */}
          <div className="absolute left-[-25px] top-0 bottom-4 flex flex-col justify-between text-[10px] text-slate-500 font-mono">
            <span>20°C</span>
            <span>0°C</span>
            <span>-20°C</span>
            <span>-80°C</span>
          </div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 ml-4 mb-4 border-b border-t border-slate-800/30 flex flex-col justify-between pointer-events-none">
            <div className="border-b border-slate-800/30 w-full h-0"></div>
            <div className="border-b border-slate-800/30 w-full h-0"></div>
          </div>

          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradientCold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
              </linearGradient>
            </defs>
            {/* Ambient Temp Line */}
            <path d="M 0,40 Q 100,50 200,35 T 400,45 T 600,30 T 800,50 T 1000,40" fill="none" stroke="#fbbf24" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            {/* Cold Chain Line */}
            <path d="M 0,100 Q 100,110 200,95 T 400,105 T 600,90 T 800,110 T 1000,100" fill="none" stroke="#60a5fa" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            {/* Ultra-Cold Line */}
            <path d="M 0,220 Q 100,225 200,215 T 400,230 T 600,210 T 800,225 T 1000,215" fill="none" stroke="#22d3ee" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d="M 0,220 Q 100,225 200,215 T 400,230 T 600,210 T 800,225 T 1000,215 L 1000,250 L 0,250 Z" fill="url(#gradientCold)" stroke="none" />
          </svg>
          
          {/* X Axis Labels */}
          <div className="absolute left-4 right-0 bottom-[-20px] flex justify-between text-[10px] text-slate-500 font-mono">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
            <span>Now</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex gap-4 mt-8 justify-center">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></div><span className="text-xs text-slate-400">Ambient</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></div><span className="text-xs text-slate-400">Cold Chain</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div><span className="text-xs text-slate-400">Ultra-Cold</span></div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-4">Active Monitoring Units</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monitors.map((monitor) => {
          const isWarning = monitor.status === 'Warning';
          const isCritical = monitor.status === 'Critical';
          const warningClass = isCritical ? 'border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]' : isWarning ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-slate-800/80';
          
          // Calculate percentage position of current temp within safe range
          const range = monitor.maxSafe - monitor.minSafe;
          const pos = monitor.current - monitor.minSafe;
          let pct = (pos / range) * 100;
          if(pct < 0) pct = 0; if(pct > 100) pct = 100;
          const markerColor = isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500';

          return (
            <div key={monitor.id} className={`bg-slate-900/60 backdrop-blur-xl border ${warningClass} rounded-2xl p-6 transition-all duration-500 hover:bg-slate-800/80 group hover:shadow-xl hover:-translate-y-1 relative overflow-hidden`}>
              {/* Dynamic glow effect based on status */}
              <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl pointer-events-none ${isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
              
              <div className="relative flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 group-hover:border-slate-600 transition-colors shadow-inner`}>
                    {getIcon(monitor.type)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium group-hover:text-brand-300 transition-colors">{monitor.name}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{monitor.id} &bull; {monitor.type}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider border shadow-sm ${getStatusColor(monitor.status)} ${isCritical ? 'animate-pulse shadow-rose-500/20' : ''}`}>
                  {isCritical ? <AlertTriangle className="w-3.5 h-3.5" /> : isWarning ? <Clock className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  {monitor.status}
                </span>
              </div>

              <div className="flex items-end gap-3 mb-6">
                <div className={`text-4xl font-bold tracking-tight ${isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-white'}`}>
                  {monitor.current.toFixed(1)}°
                </div>
                <div className="pb-1 text-sm font-medium text-slate-500">
                  {monitor.trend === 'up' ? <TrendingUp className="w-4 h-4 text-rose-400" /> : monitor.trend === 'down' ? <TrendingDown className="w-4 h-4 text-emerald-400" /> : <TrendingUp className="w-4 h-4 text-slate-600 opacity-50" />}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Safe Range</span>
                  <span>{monitor.minSafe}°C to {monitor.maxSafe}°C</span>
                </div>
                {/* Visual Range Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                   <div className="absolute top-0 bottom-0 left-[20%] right-[20%] bg-emerald-500/20"></div>
                   <div 
                     className={`absolute top-0 bottom-0 w-2 -ml-1 rounded-full ${markerColor} shadow-[0_0_8px_currentColor]`}
                     style={{ left: `${pct}%` }}
                   ></div>
                </div>
                {isCritical && (
                  <p className="text-xs text-rose-400 mt-3 font-medium bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg flex items-center gap-2 animate-pulse shadow-inner">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" /> Exceeds maximum safe temperature! Immediate action required.
                  </p>
                )}
                {isWarning && (
                  <p className="text-xs text-amber-400 mt-3 font-medium bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg flex items-center gap-2 shadow-inner">
                    <Clock className="w-4 h-4 flex-shrink-0" /> Approaching threshold limits. Monitor closely.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
