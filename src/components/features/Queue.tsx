import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface QueueProps {
  queuePosition: number;
  eta: number;
  title?: string;
  onBypass?: () => void;
}

export function Queue({ queuePosition, eta, title = "Virtual Waiting Room", onBypass }: QueueProps) {
  const isRedirecting = queuePosition === 0;

  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-20 max-w-2xl mx-auto text-center space-y-6 md:space-y-8 px-4">
      <div className={`w-20 h-20 md:w-24 md:h-24 ${isRedirecting ? 'bg-green-100 text-green-600' : 'bg-mfu-red/10 text-mfu-red'} rounded-full flex items-center justify-center animate-pulse transition-colors duration-500`}>
        <Clock size={40} className="md:w-12 md:h-12" />
      </div>
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-2xl md:text-4xl font-medium text-mfu-text-main">
          {isRedirecting ? "Access Granted!" : title}
        </h2>
        <p className="text-mfu-text-muted">
          {isRedirecting 
            ? "Please wait while we redirect you to the system..." 
            : "High traffic detected. Please stay on this page to maintain your position in the queue."}
        </p>
      </div>

      {!isRedirecting && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
            <div className="mfu-card p-6 md:p-8 space-y-1 md:space-y-2">
              <p className="text-[10px] md:text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Your Position</p>
              <p className="text-4xl md:text-5xl font-bold text-mfu-red">{queuePosition}</p>
            </div>
            <div className="mfu-card p-6 md:p-8 space-y-1 md:space-y-2">
              <p className="text-[10px] md:text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Estimated Wait</p>
              <p className="text-4xl md:text-5xl font-bold text-mfu-text-main font-mono">
                {Math.floor(Math.round(eta * 60) / 60)}:{String(Math.round(eta * 60) % 60).padStart(2, '0')} 
                <span className="text-lg md:text-xl ml-1 md:ml-2">min</span>
              </p>
            </div>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-mfu-red"
              initial={{ width: '0%' }}
              animate={{ width: `${100 - (queuePosition / 100) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 w-full pt-4">
            <div className="text-center space-y-1">
              <p className="text-[10px] font-bold text-mfu-text-muted uppercase tracking-tighter">Server Load</p>
              <div className="flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-mfu-text-main">High</span>
              </div>
            </div>
            <div className="text-center space-y-1 border-x border-slate-100">
              <p className="text-[10px] font-bold text-mfu-text-muted uppercase tracking-tighter">Throughput</p>
              <p className="text-xs font-bold text-mfu-text-main">142 req/s</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[10px] font-bold text-mfu-text-muted uppercase tracking-tighter">Status</p>
              <p className="text-xs font-bold text-green-600">Processing</p>
            </div>
          </div>

          <div className="space-y-4 w-full">
            <p className="text-sm text-mfu-text-muted italic">"Thank you for your patience. We are processing requests as quickly as possible."</p>
            
            {onBypass && (
              <button
                onClick={onBypass}
                className="text-[10px] font-bold text-mfu-text-muted hover:text-mfu-red transition-colors uppercase tracking-widest border border-slate-200 px-4 py-2 rounded-full"
              >
                Bypass Queue (Admin/Test Only)
              </button>
            )}
          </div>
        </>
      )}

      {isRedirecting && (
        <div className="flex items-center gap-2 text-green-600 font-bold animate-bounce">
          <div className="w-2 h-2 bg-green-600 rounded-full" />
          <div className="w-2 h-2 bg-green-600 rounded-full animate-delay-100" />
          <div className="w-2 h-2 bg-green-600 rounded-full animate-delay-200" />
          <span className="ml-2">Redirecting...</span>
        </div>
      )}
    </div>
  );
}
