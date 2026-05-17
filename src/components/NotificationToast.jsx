import React from 'react';
import { AlertTriangle, X, CheckCircle2, Info } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function NotificationToast() {
  const { notifications } = useData();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-start gap-3 w-80 animate-in slide-in-from-right-8 fade-in duration-300"
        >
          <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 \${
            notif.type === 'critical' ? 'bg-rose-500/20 text-rose-400' :
            notif.type === 'warning' ? 'bg-amber-500/20 text-amber-400' :
            'bg-brand-500/20 text-brand-400'
          }`}>
            {notif.type === 'critical' || notif.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <Info className="w-4 h-4" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{notif.title}</h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{notif.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
