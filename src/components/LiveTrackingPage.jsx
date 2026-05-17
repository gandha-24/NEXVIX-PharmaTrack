import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Compass, Truck, Clock, AlertTriangle, ShieldCheck, Activity, Target } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Map Marker Icon
const truckIcon = new L.DivIcon({
  className: 'custom-truck-marker',
  html: `<div style="width: 32px; height: 32px; background-color: rgba(59, 130, 246, 0.2); border: 2px solid #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(59,130,246,0.8);"><div style="width: 12px; height: 12px; background-color: #3b82f6; border-radius: 50%;"></div></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Component to recenter map automatically when coordinates change
function MapRecenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position[0] !== 0 && position[1] !== 0) {
      map.setView(position, map.getZoom(), {
        animate: true,
      });
    }
  }, [position, map]);
  return null;
}

export default function LiveTrackingPage() {
  const [locationData, setLocationData] = useState({
    latitude: 42.3601,
    longitude: -71.0589,
    speed: 0,
    status: 'Stationary',
    timestamp: new Date().toISOString()
  });

  const [routeHistory, setRouteHistory] = useState([
    [42.3601, -71.0589]
  ]);

  const [permissionError, setPermissionError] = useState(null);
  
  // Ref to hold latest state for the interval closure
  const locationRef = useRef(locationData);
  useEffect(() => {
    locationRef.current = locationData;
  }, [locationData]);

  // Geolocation watcher
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setPermissionError('Geolocation is not supported by your browser.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;
        const currentSpeed = speed || 0; // Speed can be null
        const status = currentSpeed > 0 ? 'Moving' : 'Stationary';
        
        setLocationData({
          latitude,
          longitude,
          speed: currentSpeed,
          status,
          timestamp: new Date(position.timestamp).toISOString()
        });

        setRouteHistory(prev => [...prev, [latitude, longitude]]);
        setPermissionError(null);
      },
      (error) => {
        setPermissionError(`Geolocation Error: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Firestore writer (Every 10 seconds)
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const dataToSave = {
          latitude: locationRef.current.latitude,
          longitude: locationRef.current.longitude,
          speed: locationRef.current.speed,
          status: locationRef.current.status,
          timestamp: locationRef.current.timestamp,
        };
        await addDoc(collection(db, 'vehicle_locations'), dataToSave);
        console.log('Location saved to Firestore:', dataToSave);
      } catch (error) {
        console.error('Error saving location to Firestore:', error);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      {/* Header (Absolute, overlaid on top of map) */}
      <div className="absolute top-0 left-0 right-0 p-8 z-20 pointer-events-none flex justify-between items-start">
        <div className="pointer-events-auto">
          <h2 className="text-2xl font-semibold text-white drop-shadow-md">Live GPS Tracking</h2>
          <p className="text-sm text-slate-300 drop-shadow-md">Real-time monitoring for Active Shipment SHP-9021</p>
          {permissionError && (
             <div className="mt-3 text-xs bg-rose-500/20 text-rose-400 border border-rose-500/50 px-3 py-2 rounded-lg flex items-center gap-2 backdrop-blur-md">
               <AlertTriangle className="w-4 h-4" />
               {permissionError}
             </div>
          )}
        </div>
        
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700 shadow-xl">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-emerald-400">Live Satellite Feed</span>
        </div>
      </div>

      {/* MapContainer (z-0) */}
      <div className="absolute inset-0 z-0 bg-[#0a0f1c]">
        <MapContainer 
          center={[locationData.latitude, locationData.longitude]} 
          zoom={14} 
          zoomControl={false} 
          style={{ width: '100%', height: '100%', background: '#0a0f1c' }}
        >
          {/* CartoDB Dark Matter Base Map */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          <MapRecenter position={[locationData.latitude, locationData.longitude]} />
          
          {/* Historical Route Path Line */}
          {routeHistory.length > 1 && (
             <Polyline positions={routeHistory} pathOptions={{ color: '#3b82f6', weight: 4, opacity: 0.8 }} />
          )}

          {/* Live Vehicle Marker */}
          <Marker position={[locationData.latitude, locationData.longitude]} icon={truckIcon}>
            <Popup className="dark-popup">
               <div className="text-white font-semibold">TRK-892</div>
               <div className="text-brand-400 text-xs">{locationData.status}</div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Floating Info Panels (Absolute) */}
      <div className="absolute top-[100px] left-8 w-[380px] bottom-8 flex flex-col gap-6 z-20 overflow-y-auto pointer-events-auto pb-8 hide-scrollbar">
        
        {/* Vehicle Location Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <Truck className="w-6 h-6 text-brand-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">TRK-892</h3>
              <p className="text-sm text-slate-400">Driver: Marcus Cole</p>
            </div>
            <div className="ml-auto bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/20 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
              <p className="text-xs text-slate-500 mb-1 flex items-center gap-1.5"><Compass className="w-3.5 h-3.5" /> Speed</p>
              <p className="text-lg font-semibold text-white">{Math.round(locationData.speed * 2.23694)} <span className="text-xs text-slate-400 font-normal">mph</span></p>
            </div>
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
              <p className="text-xs text-slate-500 mb-1 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Status</p>
              <p className={`text-lg font-semibold ${locationData.status === 'Moving' ? 'text-brand-400' : 'text-amber-400'}`}>{locationData.status}</p>
            </div>
          </div>
        </div>

        {/* Live GPS Coordinates */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
          <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-500" /> Live Coordinates
          </h4>
          <div className="font-mono text-xl tracking-wider text-white bg-slate-950/50 py-3 px-4 rounded-xl border border-slate-800/80 shadow-inner flex justify-between items-center">
            <span className="text-brand-300">{Math.abs(locationData.latitude).toFixed(4)} {locationData.latitude >= 0 ? 'N' : 'S'}</span>
            <span className="text-slate-600">|</span>
            <span className="text-brand-300">{Math.abs(locationData.longitude).toFixed(4)} {locationData.longitude >= 0 ? 'E' : 'W'}</span>
          </div>
        </div>

        {/* Route Details & ETA */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
          <h4 className="text-sm font-semibold text-slate-300 mb-6 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-indigo-400" /> Route Details
          </h4>
          
          <div className="relative pl-6 space-y-6">
            {/* Timeline Line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-800">
               <div className="absolute top-0 left-0 w-full bg-brand-500 h-[60%] shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            </div>

            {/* Origin */}
            <div className="relative">
              <div className="absolute -left-7 top-1 w-3 h-3 rounded-full bg-brand-500 border-2 border-slate-900"></div>
              <p className="text-xs font-semibold text-brand-400 mb-1">08:00 AM (Departed)</p>
              <p className="text-sm text-white font-medium">Distribution Center Alpha</p>
              <p className="text-xs text-slate-500">Newark, NJ</p>
            </div>

            {/* Current */}
            <div className="relative">
              <div className="absolute -left-7 top-1 w-3 h-3 rounded-full bg-brand-500 border-2 border-slate-900 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <p className="text-xs font-semibold text-brand-400 mb-1">11:30 AM (Current Location)</p>
              <p className="text-sm text-white font-medium">I-95 North Corridor</p>
              <p className="text-xs text-slate-500">Approaching CT Border</p>
            </div>

            {/* Destination */}
            <div className="relative">
              <div className="absolute -left-7 top-1 w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-900"></div>
              <p className="text-xs font-semibold text-slate-500 mb-1">Estimated: 14:30 PM</p>
              <p className="text-sm text-slate-300 font-medium">Mercy General Hospital</p>
              <p className="text-xs text-slate-500">Boston, MA</p>
            </div>
          </div>
        </div>

        {/* Status Metrics */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 shadow-2xl">
              <Clock className="w-5 h-5 text-amber-400 mb-2" />
              <p className="text-2xl font-bold text-white mb-1">45<span className="text-sm font-normal text-slate-400 ml-1">mins</span></p>
              <p className="text-xs text-slate-500">Total Stop Duration</p>
           </div>
           <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 shadow-2xl">
              <Activity className="w-5 h-5 text-brand-400 mb-2" />
              <p className="text-2xl font-bold text-white mb-1">98<span className="text-sm font-normal text-slate-400 ml-1">%</span></p>
              <p className="text-xs text-slate-500">Route Efficiency</p>
           </div>
        </div>

      </div>

    </div>
  );
}
