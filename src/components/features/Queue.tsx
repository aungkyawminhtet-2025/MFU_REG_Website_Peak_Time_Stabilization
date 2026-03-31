import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface QueueProps {
  queuePosition: number;
  eta: number;
}

export function Queue({ queuePosition, eta }: QueueProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 max-w-2xl mx-auto text-center space-y-8">
      <div className="w-24 h-24 bg-mfu-red/10 text-mfu-red rounded-full flex items-center justify-center animate-pulse">
        <Clock size={48} />
      </div>
      <div className="space-y-2">
        <h2 className="text-4xl font-medium text-mfu-text-main">Virtual Waiting Room</h2>
        <p className="text-mfu-text-muted">High traffic detected. Please stay on this page to maintain your position in the queue.</p>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="mfu-card p-8 space-y-2">
          <p className="text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Your Position</p>
          <p className="text-5xl font-bold text-mfu-red">{queuePosition}</p>
        </div>
        <div className="mfu-card p-8 space-y-2">
          <p className="text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Estimated Wait</p>
          <p className="text-5xl font-bold text-mfu-text-main">{Math.ceil(eta)} <span className="text-xl">min</span></p>
        </div>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-mfu-red"
          initial={{ width: '0%' }}
          animate={{ width: `${100 - (queuePosition / 150) * 100}%` }}
        />
      </div>

      <p className="text-sm text-mfu-text-muted italic">"Thank you for your patience. We are processing requests as quickly as possible."</p>
    </div>
  );
}
