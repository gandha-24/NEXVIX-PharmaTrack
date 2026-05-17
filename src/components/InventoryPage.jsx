import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, Package, Truck, Calendar, Activity, Thermometer, Factory, Hash } from 'lucide-react';

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Amoxicillin 500mg', batchId: 'BAT-A921', shipmentId: 'SHP-9021', quantity: 1250, expiry: '2027-05-12', manufacturer: 'PharmaCorp', temperatureRange: 'Ambient (15-25°C)', status: 'In Stock' },
    { id: 2, name: 'Lisinopril 10mg', batchId: 'BAT-L104', shipmentId: 'SHP-9018', quantity: 840, expiry: '2026-11-30', manufacturer: 'BioHealth', temperatureRange: 'Ambient (15-25°C)', status: 'In Stock' },
    { id: 3, name: 'Insulin Glargine', batchId: 'BAT-I445', shipmentId: 'SHP-8994', quantity: 45, expiry: '2025-08-15', manufacturer: 'NovoMed', temperatureRange: 'Cold Chain (2-8°C)', status: 'Low Stock' },
    { id: 4, name: 'Ibuprofen 400mg', batchId: 'BAT-IB22', shipmentId: 'SHP-9022', quantity: 3400, expiry: '2028-01-20', manufacturer: 'PharmaCorp', temperatureRange: 'Ambient (15-25°C)', status: 'In Stock' },
    { id: 5, name: 'Pfizer-BioNTech Vaccine', batchId: 'BAT-V905', shipmentId: 'SHP-9005', quantity: 120, expiry: '2024-03-10', manufacturer: 'Pfizer', temperatureRange: 'Ultra-Cold (-70°C)', status: 'Quarantined' },
  ]);

  const [formData, setFormData] = useState({
    name: '', batchId: '', shipmentId: '', quantity: '', expiry: '', manufacturer: '', temperatureRange: 'Ambient (15-25°C)', status: 'In Stock', price: '', type: 'Tablet'
  });

  const statuses = ['All', 'In Stock', 'Low Stock', 'Quarantined', 'Expired'];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.batchId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.shipmentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setInventory(inventory.map(item => item.id === editingId ? { ...item, ...formData, quantity: Number(formData.quantity) } : item));
    } else {
      const newItem = {
        id: Math.max(...inventory.map(i => i.id), 0) + 1,
        ...formData,
        quantity: Number(formData.quantity)
      };
      setInventory([...inventory, newItem]);
    }
    closeForm();
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name, batchId: item.batchId, shipmentId: item.shipmentId, quantity: item.quantity, 
      expiry: item.expiry, manufacturer: item.manufacturer, temperatureRange: item.temperatureRange, status: item.status, price: item.price || '', type: item.type || 'Tablet'
    });
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: '', batchId: '', shipmentId: '', quantity: '', expiry: '', manufacturer: '', temperatureRange: 'Ambient (15-25°C)', status: 'In Stock', price: '', type: 'Tablet' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Stock': return 'bg-emerald-500/10 text-emerald-400';
      case 'Low Stock': return 'bg-amber-500/10 text-amber-400';
      case 'Quarantined': return 'bg-orange-500/10 text-orange-400';
      case 'Expired': return 'bg-rose-500/10 text-rose-400';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 z-10 text-slate-200 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">Pharmaceutical Inventory</h2>
          <p className="text-sm text-slate-400">Manage medicine batches, storage conditions, and stock status.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Medicine
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
              placeholder="Search by name, batch ID, or shipment ID..."
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

      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-800">
              <h3 className="text-xl font-semibold text-white">{editingId ? 'Edit Medicine Entry' : 'Add New Medicine'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Medicine Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-2.5 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Manufacturer</label>
                  <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleInputChange} required className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-2.5 outline-none transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Batch ID</label>
                  <input type="text" name="batchId" value={formData.batchId} onChange={handleInputChange} required className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-2.5 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Shipment ID</label>
                  <input type="text" name="shipmentId" value={formData.shipmentId} onChange={handleInputChange} required className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-2.5 outline-none transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Quantity</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required min="0" className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-2.5 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Expiry Date</label>
                  <input type="date" name="expiry" value={formData.expiry} onChange={handleInputChange} required className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-2.5 outline-none transition-all [color-scheme:dark]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Storage Temperature</label>
                  <select name="temperatureRange" value={formData.temperatureRange} onChange={handleInputChange} className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-2.5 outline-none transition-all">
                    <option value="Ambient (15-25°C)">Ambient (15-25°C)</option>
                    <option value="Cold Chain (2-8°C)">Cold Chain (2-8°C)</option>
                    <option value="Frozen (-20°C)">Frozen (-20°C)</option>
                    <option value="Ultra-Cold (-70°C)">Ultra-Cold (-70°C)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-2.5 outline-none transition-all">
                    {statuses.filter(s => s !== 'All').map(stat => <option key={stat} value={stat}>{stat}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Unit Price ($)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-2.5 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Medicine Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-2.5 outline-none transition-all">
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Liquid">Liquid</option>
                    <option value="Injection">Injection</option>
                    <option value="Vaccine">Vaccine</option>
                    <option value="Topical">Topical</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={closeForm} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-brand-500/20">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-sm backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Medicine & Mfg</th>
                <th className="px-6 py-4 font-medium">Batch / Shipment</th>
                <th className="px-6 py-4 font-medium">Quantity</th>
                <th className="px-6 py-4 font-medium">Expiry</th>
                <th className="px-6 py-4 font-medium">Storage Range</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4 text-brand-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Factory className="w-3 h-3" /> {item.manufacturer}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-300 flex items-center gap-1.5 mb-0.5"><Hash className="w-3.5 h-3.5 text-slate-500" /> {item.batchId}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> {item.shipmentId}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">{item.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.expiry}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-3.5 h-3.5 text-slate-500" />
                      {item.temperatureRange}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(item)} className="p-1.5 text-slate-400 hover:text-brand-400 hover:bg-brand-400/10 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    <Activity className="w-8 h-8 mx-auto mb-3 text-slate-600 opacity-50" />
                    <p>No inventory items found.</p>
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
