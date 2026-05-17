import React from 'react';
import { 
  LayoutDashboard, 
  Package,
  Truck,
  Map,
  Thermometer,
  AlertTriangle,
  LineChart,
  Cpu,
  Settings, 
  LogOut,
  Activity,
  Snowflake
} from 'lucide-react';

export default function Sidebar({ activeView, onNavigate, onLogout }) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'inventory', icon: Package, label: 'Inventory' },
    { id: 'shipments', icon: Truck, label: 'Shipments' },
    { id: 'tracking', icon: Map, label: 'Live Tracking' },
    { id: 'temperature', icon: Thermometer, label: 'Temperature Monitor' },
    { id: 'cold-storage', icon: Snowflake, label: 'Cold Storage' },
    { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
    { id: 'analytics', icon: LineChart, label: 'Analytics' },
    { id: 'hardware', icon: Cpu, label: 'Hardware Status' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 shadow-lg shadow-brand-500/10">
          <Activity className="w-5 h-5 text-brand-400" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">NEXVIX Medical</span>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</p>
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeView === item.id 
                  ? 'bg-brand-500/10 text-brand-400' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-brand-400' : 'text-slate-500'}`} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-4 py-6 mt-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Settings</p>
        <nav className="space-y-1 mb-6">
          <button 
            onClick={() => onNavigate('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeView === 'settings' 
                ? 'bg-brand-500/10 text-brand-400' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <Settings className={`w-5 h-5 ${activeView === 'settings' ? 'text-brand-400' : 'text-slate-500'}`} />
            Settings
          </button>
        </nav>

        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
            DR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Dr. Reynolds</p>
            <p className="text-xs text-slate-400 truncate">Cardiology</p>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
}
