import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationToastProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export function NotificationToast({ notifications, onRemove }: NotificationToastProps) {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map(n => (
          <motion.div 
            key={n.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-4 text-sm font-bold bg-white min-w-[300px] pointer-events-auto group ${
              n.type === 'success' ? 'border-green-100 text-slate-700' : 
              n.type === 'error' ? 'border-red-100 text-mfu-red' : 'border-blue-100 text-blue-700'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              n.type === 'success' ? 'bg-green-50 text-green-500' : 
              n.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
            }`}>
              {n.type === 'success' ? <CheckCircle2 size={18} /> : 
               n.type === 'error' ? <AlertCircle size={18} /> : <Info size={18} />}
            </div>
            <span className="flex-1">{n.message}</span>
            <button 
              onClick={() => onRemove(n.id)}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-mfu-text-main transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
