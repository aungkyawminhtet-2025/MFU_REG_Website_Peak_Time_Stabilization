import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCcw, Home, WifiOff } from 'lucide-react';

interface ServerNotFoundErrorProps {
  onReset: () => void;
}

export function ServerNotFoundError({ onReset }: ServerNotFoundErrorProps) {
  return (
    <div className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center p-4 md:p-6 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full text-center space-y-6 md:space-y-8"
      >
        <div className="relative inline-block">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto text-mfu-red">
            <WifiOff size={40} className="md:w-12 md:h-12" />
          </div>
          <motion.div 
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              transition: { repeat: Infinity, duration: 2 }
            }}
            className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-slate-50 text-amber-500"
          >
            <AlertTriangle size={16} />
          </motion.div>
        </div>

        <div className="space-y-2 md:space-y-3 px-2">
          <h1 className="text-2xl md:text-4xl font-bold text-mfu-text-main tracking-tight uppercase">500 Error</h1>
          <p className="text-sm md:text-xl font-bold text-mfu-red uppercase tracking-widest">Internal Server Error</p>
          <div className="h-1 w-16 md:w-20 bg-mfu-red mx-auto rounded-full" />
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg border border-mfu-border shadow-sm text-left space-y-3 md:space-y-4 font-mono text-[10px] md:text-sm overflow-hidden mx-auto max-w-[90vw] sm:max-w-none">
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <span className="text-mfu-text-muted">Timestamp:</span>
            <span className="text-mfu-text-main break-all">{new Date().toISOString()}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <span className="text-mfu-text-muted">Error Code:</span>
            <span className="text-mfu-text-main">DB_LIMIT_EXCEEDED</span>
          </div>
          <div className="flex gap-2">
            <span className="text-mfu-text-muted">Route:</span>
            <span className="text-mfu-text-main">/api/v2/registration/enroll</span>
          </div>
          <div className="pt-2 border-t border-slate-100 text-mfu-text-muted italic">
            "The system is currently experiencing high volumes of traffic. The database listener successfully received your request but timed out while waiting for a worker node to become available."
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onReset}
            className="w-full sm:w-auto px-8 py-3 bg-mfu-red text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-red-800 transition-all shadow-lg shadow-red-200"
          >
            <RefreshCcw size={18} />
            Try Reconnect
          </button>
          <button 
            onClick={onReset}
            className="w-full sm:w-auto px-8 py-3 bg-white text-mfu-text-main border border-mfu-border font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
            <Home size={18} />
            Reset Demo Environment
          </button>
        </div>

        <p className="text-xs text-mfu-text-muted uppercase tracking-widest font-bold">
          Mae Fah Luang University Infrastructure Team
        </p>
      </motion.div>
    </div>
  );
}
