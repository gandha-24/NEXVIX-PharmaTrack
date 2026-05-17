import React, { useState } from 'react';
import { Search, Filter, Truck, MapPin, Clock, AlertTriangle, CheckCircle2, Package, ShieldAlert, ShieldCheck, User } from 'lucide-react';

export default function ShipmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [shipments] = useState([
    { id: 'SHP-9021', driver: 'Marcus Cole', vehicle: 'TRK-892', destination: 'Mercy General Hospital', status: 'In Transit', expectedDelivery: 'Today, 14:30', condition: 'Optimal', medicineCount: 12500 },
    { id: 'SHP-9018', driver: 'Sarah Jenkins', vehicle: 'TRK-104', destination: 'St. Jude Medical Center', status: 'Delivered', expectedDelivery: 'Yesterday, 09:15', condition: 'Optimal', medicineCount: 8400 },
    { id: 'SHP-8994', driver: 'David Ross', vehicle: 'TRK-445', destination: 'Westside Clinic', status: 'Delayed', expectedDelivery: 'Today, 16:00', condition: 'Warning', medicineCount: 450 },
    { id: 'SHP-9022', driver: 'Elena Rodriguez', vehicle: 'TRK-210', destination: 'Northwest Pharmacy Hub', status: 'In Transit', expectedDelivery: 'Tomorrow, 08:00', condition: 'Critical', medicineCount: 34000 },
    { id: 'SHP-9005', driver: 'James Chen', vehicle: 'TRK-773', destination: 'Regional Distribution Ctr', status: 'Loading', expectedDelivery: 'Tomorrow, 12:00', condition: 'Optimal', medicineCount: 120000 },
  ]);

  const statuses = ['All', 'In Transit', 'Delivered', 'Delayed', 'Loading'];

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shipment.driver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || shipment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Delivered': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="w-3 h-3" /> Delivered</span>;
      case 'In Transit': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20"><Truck className="w-3 h-3" /> In Transit</span>;
      case 'Delayed': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock className="w-3 h-3" /> Delayed</span>;
      case 'Loading': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"><Package className="w-3 h-3" /> Loading</span>;
      default: return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">{status}</span>;
    }
  };

  const getConditionBadge = (condition) => {
    switch(condition) {
      case 'Optimal': return <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400 font-medium">Optimal</span></div>;
      case 'Warning': return <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" /><span className="text-amber-400 font-medium">Warning</span></div>;
      case 'Critical': return <div className="flex items-center gap-2 animate-pulse"><ShieldAlert className="w-4 h-4 text-rose-400" /><span className="text-rose-400 font-medium">Critical</span></div>;
      default: return <span className="text-slate-400">{condition}</span>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 z-10 text-slate-200 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">Shipment Management</h2>
          <p className="text-sm text-slate-400">Monitor active pharmaceutical deliveries and logistics performance.</p>
        </div>
        <button className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2">
          <Truck className="w-4 h-4" />
          New Shipment
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm backdrop-blur-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search by ID, destination, or driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block pl-10 p-2.5 transition-all outline-none"
            />
          </div>
          <div className="relative min-w-[200px] group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
              <Filter className="w-5 h-5" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block pl-10 p-2.5 transition-all outline-none appearance-none"
            >
              {statuses.map(stat => <option key={stat} value={stat}>{stat}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-sm backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Shipment Info</th>
                <th className="px-6 py-4 font-medium">Driver & Vehicle</th>
                <th className="px-6 py-4 font-medium">Destination</th>
                <th className="px-6 py-4 font-medium">Status & ETA</th>
                <th className="px-6 py-4 font-medium">Condition</th>
                <th className="px-6 py-4 font-medium">Medicine Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment) => (
                <tr key={shipment.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        <Package className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{shipment.id}</div>
                        <div className="text-xs text-slate-500 mt-0.5 hover:text-brand-400 cursor-pointer transition-colors">View Details &rarr;</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-200 font-medium">{shipment.driver}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Truck className="w-3.5 h-3.5" />
                      {shipment.vehicle}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300 max-w-[150px] truncate" title={shipment.destination}>{shipment.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="mb-2">{getStatusBadge(shipment.status)}</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {shipment.expectedDelivery}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getConditionBadge(shipment.condition)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-200 font-medium">{shipment.medicineCount.toLocaleString()} <span className="text-slate-500 text-xs font-normal">units</span></div>
                  </td>
                </tr>
              ))}
              {filteredShipments.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    <Package className="w-8 h-8 mx-auto mb-3 text-slate-600 opacity-50" />
                    <p>No shipments found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
