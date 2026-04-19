import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { NotificationToast } from '../ui/NotificationToast';
import { User, View, Notification } from '../../types';
import { Clock, Users, Menu, X } from 'lucide-react';

interface LayoutProps {
  user: User | null;
  view: View;
  setView: (view: View) => void;
  isPeakMode: boolean;
  isPreRegQueued: boolean;
  preRegQueuePosition: number;
  preRegEta: number;
  isGradesQueued: boolean;
  gradesQueuePosition: number;
  gradesEta: number;
  setActiveQueueType: (type: 'pre-reg' | 'grades' | null) => void;
  expandedMenus: string[];
  toggleMenu: (menu: string) => void;
  navigateToProtectedView: (view: View) => void;
  handleLogout: () => void;
  notifications: Notification[];
  removeNotification: (id: string) => void;
  children: React.ReactNode;
}

export function Layout({
  user,
  view,
  setView,
  isPeakMode,
  isPreRegQueued,
  preRegQueuePosition,
  preRegEta,
  isGradesQueued,
  gradesQueuePosition,
  gradesEta,
  setActiveQueueType,
  expandedMenus,
  toggleMenu,
  navigateToProtectedView,
  handleLogout,
  notifications,
  removeNotification,
  children
}: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-mfu-bg flex flex-col font-sans">
      <TopNav user={user} onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      <AnimatePresence>
        {isPeakMode && view !== 'server-error' && (
          <motion.div 
            key="peak-mode-notice"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-mfu-red text-white text-center py-2 text-sm font-bold flex items-center justify-center gap-2 overflow-hidden border-b border-white/10"
          >
            <ShieldAlert size={14} />
            SYSTEM NOTICE: HIGH TRAFFIC DETECTED. VIRTUAL QUEUEING IS ACTIVE.
          </motion.div>
        )}
        
        {(isPreRegQueued || isGradesQueued) && view !== 'queue' && view !== 'server-error' && (
          <motion.div 
            key="consolidated-queue-bar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-800 text-white px-4 md:px-8 py-2 text-sm font-bold flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4 border-t border-slate-700"
          >
            {isPreRegQueued && (
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <span className="text-mfu-red uppercase text-[10px] md:text-xs">Registration Queue</span>
                <span className="flex items-center gap-1.5 text-xs md:text-sm">
                  <Users size={14} className="text-mfu-red" />
                  Pos: <span className="text-mfu-red font-bold">{preRegQueuePosition}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs md:text-sm">
                  <Clock size={14} className="text-mfu-red" />
                  Time: <span className="text-mfu-red font-bold">{preRegEta.toFixed(1)}m</span>
                </span>
                <button 
                  onClick={() => {
                    setActiveQueueType('pre-reg');
                    setView('queue');
                  }}
                  className="text-[9px] md:text-[10px] uppercase tracking-wider bg-mfu-red hover:bg-red-700 px-2 py-0.5 rounded transition-colors"
                >
                  View
                </button>
              </div>
            )}
            
            {isGradesQueued && (
               <div className={`flex flex-wrap items-center gap-2 md:gap-4 ${isPreRegQueued ? 'border-t md:border-t-0 md:border-l border-slate-600 pt-2 md:pt-0 md:pl-4 mt-2 md:mt-0' : ''}`}>
                <span className="text-amber-500 uppercase text-[10px] md:text-xs">Grades Queue</span>
                <span className="flex items-center gap-1.5 text-xs md:text-sm">
                  <Users size={14} className="text-amber-500" />
                  Pos: <span className="text-amber-500 font-bold">{gradesQueuePosition}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs md:text-sm">
                  <Clock size={14} className="text-amber-500" />
                  Time: <span className="text-amber-500 font-bold">{gradesEta.toFixed(1)}m</span>
                </span>
                <button 
                  onClick={() => {
                    setActiveQueueType('grades');
                    setView('queue');
                  }}
                  className="text-[9px] md:text-[10px] uppercase tracking-wider bg-amber-600 hover:bg-amber-700 px-2 py-0.5 rounded transition-colors"
                >
                  View
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 relative">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] lg:hidden backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        <div className={`fixed inset-y-0 left-0 z-[70] transition-transform duration-300 transform lg:relative lg:translate-x-0 lg:z-auto ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar 
            view={view}
            setView={(v) => { setView(v); setIsMobileMenuOpen(false); }}
            expandedMenus={expandedMenus}
            toggleMenu={toggleMenu}
            navigateToProtectedView={(v) => { navigateToProtectedView(v); setIsMobileMenuOpen(false); }}
            handleLogout={handleLogout}
          />
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden relative min-w-0">
          <NotificationToast notifications={notifications} onRemove={removeNotification} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
