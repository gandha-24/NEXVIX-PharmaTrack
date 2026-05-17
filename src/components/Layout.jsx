import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Truck, Package, ShieldCheck, AlertTriangle, Thermometer, Clock } from 'lucide-react';
import InventoryPage from './InventoryPage';
import DashboardPanel from './DashboardPanel';
import ShipmentsPage from './ShipmentsPage';
import LiveTrackingPage from './LiveTrackingPage';
import TemperaturePage from './TemperaturePage';
import ColdStoragePage from './ColdStoragePage';

export default function Layout({ onLogout }) {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-200">
      <Sidebar activeView={activeView} onNavigate={setActiveView} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background elements for main content area */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-900/10 blur-[120px] pointer-events-none"></div>
        
        {activeView === 'dashboard' ? (
          <>
            <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md z-10 shrink-0">
          <div>
            <h2 className="text-2xl font-semibold text-white">Dashboard Overview</h2>
            <p className="text-sm text-slate-400">Welcome back, here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800">
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full"></span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Active Shipments', value: '124', trend: '8 incoming today', status: 'normal', icon: Truck, color: 'text-brand-400', bg: 'bg-brand-500/10', glow: 'group-hover:shadow-brand-500/20', gradient: 'from-brand-500/5' },
              { label: 'Medicines In Transit', value: '8,450', trend: 'Units moving', status: 'normal', icon: Package, color: 'text-indigo-400', bg: 'bg-indigo-500/10', glow: 'group-hover:shadow-indigo-500/20', gradient: 'from-indigo-500/5' },
              { label: 'Inventory Health', value: '96.4%', trend: '+1.2% this week', status: 'good', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'group-hover:shadow-emerald-500/20', gradient: 'from-emerald-500/5' },
              { label: 'Low Stock Alerts', value: '24', trend: 'Needs attention', status: 'warning', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', glow: 'group-hover:shadow-amber-500/20', gradient: 'from-amber-500/5' },
              { label: 'Temperature Warnings', value: '3', trend: 'Action required', status: 'critical', icon: Thermometer, color: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'group-hover:shadow-rose-500/20', gradient: 'from-rose-500/5' },
              { label: 'Delayed Deliveries', value: '7', trend: 'Weather related', status: 'warning', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/10', glow: 'group-hover:shadow-orange-500/20', gradient: 'from-orange-500/5' },
            ].map((stat, i) => (
              <div key={i} className={`bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg ${stat.glow} group relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    stat.status === 'good' ? 'bg-emerald-500/10 text-emerald-400' :
                    stat.status === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                    stat.status === 'critical' ? 'bg-rose-500/10 text-rose-400' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {stat.status === 'normal' ? 'Active' : stat.status === 'good' ? 'Healthy' : stat.status === 'warning' ? 'Warning' : 'Critical'}
                  </span>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-white transition-colors">{stat.value}</h3>
                  <p className="text-xs text-slate-500">{stat.trend}</p>
                </div>
              </div>
            ))}
          </div>

          <DashboardPanel />
        </main>
          </>
        ) : activeView === 'inventory' ? (
          <InventoryPage />
        ) : activeView === 'shipments' ? (
          <ShipmentsPage />
        ) : activeView === 'tracking' ? (
          <LiveTrackingPage />
        ) : activeView === 'temperature' ? (
          <TemperaturePage />
        ) : activeView === 'cold-storage' ? (
          <ColdStoragePage />
        ) : (
          <div className="flex-1 flex items-center justify-center z-10">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">Coming Soon</h2>
              <p className="text-slate-400">This module is currently under development.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
