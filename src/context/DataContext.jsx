import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThermometerSnowflake, AlertTriangle, CheckCircle2 } from 'lucide-react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [monitors, setMonitors] = useState([
    { id: 'TM-01', name: 'Vaccine Storage A', type: 'Ultra-Cold', current: -72.4, minSafe: -80.0, maxSafe: -60.0, status: 'Optimal', trend: 'stable' },
    { id: 'TM-02', name: 'Insulin Batch B', type: 'Cold Chain', current: 4.2, minSafe: 2.0, maxSafe: 8.0, status: 'Optimal', trend: 'down' },
    { id: 'TM-03', name: 'Antibiotics C', type: 'Ambient', current: 24.8, minSafe: 15.0, maxSafe: 25.0, status: 'Warning', trend: 'up' },
    { id: 'TM-04', name: 'Shipment SHP-9021', type: 'Cold Chain', current: 8.5, minSafe: 2.0, maxSafe: 8.0, status: 'Critical', trend: 'up' },
    { id: 'TM-05', name: 'Plasma Reserve', type: 'Frozen', current: -21.0, minSafe: -25.0, maxSafe: -15.0, status: 'Optimal', trend: 'stable' },
  ]);

  const [shipments, setShipments] = useState([
    { id: 'SHP-9021', driver: 'Marcus Cole', vehicle: 'TRK-892', destination: 'Mercy General Hospital', status: 'In Transit', expectedDelivery: 'Today, 14:30', condition: 'Critical', medicineCount: 12500, tempId: 'TM-04' },
    { id: 'SHP-9018', driver: 'Sarah Jenkins', vehicle: 'TRK-104', destination: 'St. Jude Medical Center', status: 'Delivered', expectedDelivery: 'Yesterday, 09:15', condition: 'Optimal', medicineCount: 8400 },
    { id: 'SHP-8994', driver: 'David Ross', vehicle: 'TRK-445', destination: 'Westside Clinic', status: 'Delayed', expectedDelivery: 'Today, 16:00', condition: 'Warning', medicineCount: 450 },
    { id: 'SHP-9022', driver: 'Elena Rodriguez', vehicle: 'TRK-210', destination: 'Northwest Pharmacy Hub', status: 'In Transit', expectedDelivery: 'Tomorrow, 08:00', condition: 'Critical', medicineCount: 34000 },
    { id: 'SHP-9005', driver: 'James Chen', vehicle: 'TRK-773', destination: 'Regional Distribution Ctr', status: 'Loading', expectedDelivery: 'Tomorrow, 12:00', condition: 'Optimal', medicineCount: 120000 },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, msg: 'Temperature fluctuation TRK-210', time: new Date(Date.now() - 10 * 60000), type: 'warning' },
    { id: 2, msg: 'Unauthorized door open TRK-892', time: new Date(Date.now() - 60 * 60000), type: 'critical' },
    { id: 3, msg: 'Delivery confirmed at Site B', time: new Date(Date.now() - 120 * 60000), type: 'success' },
  ]);

  const [notifications, setNotifications] = useState([]);

  const addNotification = (notif) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notif, id }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setMonitors(prevMonitors => {
        let monitorsChanged = false;
        const newMonitors = prevMonitors.map(monitor => {
          // Add some randomness to the current temperature based on trend
          let change = (Math.random() * 0.4) - 0.2; // -0.2 to +0.2
          if (monitor.trend === 'up') change += 0.1;
          if (monitor.trend === 'down') change -= 0.1;

          let newTemp = monitor.current + change;

          // Determine new status
          let newStatus = 'Optimal';
          const range = monitor.maxSafe - monitor.minSafe;
          const warningMargin = range * 0.1; // 10% margin for warning

          if (newTemp >= monitor.maxSafe || newTemp <= monitor.minSafe) {
            newStatus = 'Critical';
          } else if (
            newTemp >= monitor.maxSafe - warningMargin ||
            newTemp <= monitor.minSafe + warningMargin
          ) {
            newStatus = 'Warning';
          }

          if (newStatus !== monitor.status && (newStatus === 'Critical' || newStatus === 'Warning')) {
            monitorsChanged = true;

            // Check if we should trigger an alert (only if it worsened)
            if (
              (newStatus === 'Critical' && monitor.status !== 'Critical') ||
              (newStatus === 'Warning' && monitor.status === 'Optimal')
            ) {
              const alertMsg = `${newStatus} Temp Alert: ${monitor.name} is at ${newTemp.toFixed(1)}°C`;
              setAlerts(prev => [{
                id: Date.now() + Math.random(),
                msg: alertMsg,
                time: new Date(),
                type: newStatus.toLowerCase()
              }, ...prev].slice(0, 10)); // keep last 10 alerts

              addNotification({
                title: `Temperature ${newStatus}`,
                message: `${monitor.name} reached ${newTemp.toFixed(1)}°C`,
                type: newStatus.toLowerCase()
              });

              // Update related shipment if it exists
              setShipments(prevShipments =>
                prevShipments.map(ship =>
                  ship.tempId === monitor.id
                    ? { ...ship, condition: newStatus }
                    : ship
                )
              );
            }
          }

          // Randomly change trend occasionally
          let newTrend = monitor.trend;
          if (Math.random() < 0.1) {
            const trends = ['up', 'down', 'stable'];
            newTrend = trends[Math.floor(Math.random() * trends.length)];
          }

          return { ...monitor, current: newTemp, status: newStatus, trend: newTrend };
        });

        return newMonitors;
      });

    }, 3000); // 3-second simulation pace

    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider value={{ monitors, shipments, alerts, notifications, addNotification }}>
      {children}
    </DataContext.Provider>
  );
};
