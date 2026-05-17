import React from 'react';
import { MapPin, Activity, AlertCircle, Package, Truck, Navigation, CheckCircle2, AlertTriangle, ThermometerSnowflake, Info } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function DashboardPanel() {
  const { shipments, alerts } = useData();

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return ThermometerSnowflake;
      case 'success': return CheckCircle2;
      default: return Info;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-rose-400 bg-rose-500/10';
      case 'warning': return 'text-amber-400 bg-amber-500/10';
      case 'success': return 'text-emerald-400 bg-emerald-500/10';
      default: return 'text-blue-400 bg-blue-500/10';
    }
  };

  const getTimeAgo = (date) => {
    const mins = Math.floor((new Date() - date) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Shipment Activity Graph */}
      <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm backdrop-blur-sm flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Shipment Activity</h3>
            <p className="text-xs text-slate-400">Volume over the last 7 days</p>
          </div>
          <select className="bg-slate-950/50 border border-slate-800 text-xs text-slate-300 rounded-lg p-2 outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="flex-1 flex items-end gap-2 pt-4 relative min-h-[200px]">
          {/* Mock Graph Bars */}
          {[40, 70, 45, 90, 65, 85, 110].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end group">
              <div 
                className="w-full bg-brand-500/20 group-hover:bg-brand-500/40 rounded-t-md transition-colors relative"
                style={{ height: `${(h / 120) * 100}%` }}
              >
                <div className="absolute top-0 w-full h-1 bg-brand-400 rounded-t-md shadow-[0_0_8px_rgba(96,165,250,0.8)] opacity-50 group-hover:opacity-100"></div>
              </div>
              <div className="text-center text-[10px] text-slate-500 mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
              </div>
            </div>
          ))}
          {/* Background Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full border-b border-slate-800/50 h-0"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Transport Status */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Live Transport</h3>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </div>
        <div className="space-y-4">
          {shipments.slice(0, 4).map((ship) => {
            const isCritical = ship.condition === 'Critical';
            const isWarning = ship.condition === 'Warning';
            const color = isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : ship.status === 'Delivered' ? 'text-emerald-400' : 'text-brand-400';
            const Icon = ship.status === 'Delivered' ? CheckCircle2 : ship.status === 'Delayed' || isWarning || isCritical ? AlertCircle : ship.status === 'Loading' ? Package : Truck;
            
            return (
              <div key={ship.id} className={`flex items-center gap-4 p-3 rounded-xl bg-slate-950/50 border ${isCritical ? 'border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.1)]' : isWarning ? 'border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]' : 'border-slate-800/50 hover:border-slate-700'} transition-colors`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-900 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-semibold text-white">{ship.id}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${isCritical ? 'bg-rose-500/20 text-rose-400' : isWarning ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>{ship.condition}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className={`${color}`}>{ship.status}</span>
                    <span className="text-slate-500 truncate ml-2">{ship.destination}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GPS Tracking Preview */}
      <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-4">Route Tracking Preview</h3>
        <div className="w-full h-[250px] bg-slate-950/80 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
          {/* Mock Map Background grid */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Mock Route Line */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M 50 200 Q 150 50 300 120 T 600 80" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="4" strokeDasharray="8 8" className="animate-pulse" />
          </svg>
          
          {/* Origin/Destination/Current */}
          <div className="absolute left-[50px] top-[190px] w-4 h-4 bg-slate-800 border-2 border-brand-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
          <div className="absolute left-[300px] top-[110px] z-10 flex flex-col items-center">
            <div className="bg-slate-900 border border-brand-500 text-xs text-white px-2 py-1 rounded mb-2 shadow-lg whitespace-nowrap">TRK-892 (2.4°C)</div>
            <MapPin className="w-6 h-6 text-brand-400 animate-bounce shadow-xl" />
          </div>
          <div className="absolute right-[50px] top-[70px] w-4 h-4 bg-slate-800 border-2 border-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
        </div>
      </div>

      {/* Recent Alerts Section */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-6">Recent Alerts</h3>
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {alerts.length === 0 ? (
            <div className="text-center text-slate-500 py-4 text-sm">No recent alerts.</div>
          ) : alerts.slice(0, 5).map((alert) => {
            const AlertIcon = getAlertIcon(alert.type);
            const colorClass = getAlertColor(alert.type);
            const textColor = colorClass.split(' ')[0];
            const bgColor = colorClass.split(' ')[1];

            return (
              <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/30 transition-colors">
                <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bgColor}`}>
                  <AlertIcon className={`w-4 h-4 ${textColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">{alert.msg}</p>
                  <p className="text-xs text-slate-500 mt-1">{getTimeAgo(alert.time)}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="w-full mt-6 py-2 text-xs font-medium text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors border border-brand-500/20">
          View All Alerts
        </button>
      </div>

      {/* Delivery Performance Chart */}
      <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Delivery Performance</h3>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div> On Time</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]"></div> Delayed</div>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { region: 'North District', onTime: 85, delayed: 15 },
            { region: 'South District', onTime: 92, delayed: 8 },
            { region: 'East District', onTime: 78, delayed: 22 },
          ].map((stat, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">{stat.region}</span>
                <span className="text-slate-300 font-medium">{stat.onTime}% On Time</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] h-full transition-all" style={{ width: `${stat.onTime}%` }}></div>
                <div className="bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] h-full transition-all" style={{ width: `${stat.delayed}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm backdrop-blur-sm flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Inventory Health</h3>
          <p className="text-xs text-slate-400 mb-6">Overall warehouse status across all zones.</p>
        </div>
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
               <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
               <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="351" strokeDashoffset="42" className="text-brand-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] drop-shadow-md transition-all duration-1000" />
             </svg>
             <div className="absolute flex flex-col items-center">
               <span className="text-3xl font-bold text-white">88%</span>
               <span className="text-[10px] text-brand-400 uppercase tracking-wider">Optimal</span>
             </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50 text-center">
            <p className="text-xs text-slate-500 mb-1">Cold Chain</p>
            <p className="text-lg font-semibold text-emerald-400">94%</p>
          </div>
          <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50 text-center">
            <p className="text-xs text-slate-500 mb-1">Ambient</p>
            <p className="text-lg font-semibold text-brand-400">85%</p>
          </div>
        </div>
      </div>

    </div>
  );
}
