import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationToastProps {
  notifications: Notification[];
}

export function NotificationToast({ notifications }: NotificationToastProps) {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {notifications.map(n => (
          <motion.div 
            key={n.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-4 text-sm font-bold bg-white min-w-[300px] ${
              n.type === 'success' ? 'border-green-100 text-slate-700' : 
              n.type === 'error' ? 'border-red-100 text-mfu-red' : 'border-blue-100 text-blue-700'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              n.type === 'success' ? 'bg-green-50 text-green-500' : 
              n.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
            }`}>
              {n.type === 'success' ? <CheckCircle2 size={18} /> : 
               n.type === 'error' ? <AlertCircle size={18} /> : <Info size={18} />}
            </div>
            <span>{n.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
