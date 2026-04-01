import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { NotificationToast } from '../ui/NotificationToast';
import { User, View, Notification } from '../../types';
import { Clock, Users } from 'lucide-react';

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
  children
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-mfu-bg flex flex-col font-sans">
      <TopNav user={user} />
      
      <AnimatePresence>
        {isPeakMode && (
          <motion.div 
            key="peak-mode-notice"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-mfu-red text-white text-center py-2 text-xs font-bold flex items-center justify-center gap-2 overflow-hidden"
          >
            <ShieldAlert size={14} />
            SYSTEM NOTICE: HIGH TRAFFIC DETECTED. VIRTUAL QUEUEING IS ACTIVE.
          </motion.div>
        )}
        
        {isPreRegQueued && view !== 'queue' && (
          <motion.div 
            key="pre-reg-queue-bar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-800 text-white px-8 py-2 text-xs font-bold flex items-center justify-between gap-4 border-t border-slate-700"
          >
            <div className="flex items-center gap-4">
              <span className="text-mfu-red uppercase text-[10px]">Registration Queue</span>
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-mfu-red" />
                Position: <span className="text-mfu-red">{preRegQueuePosition}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-mfu-red" />
                Wait: <span className="text-mfu-red">{preRegEta.toFixed(1)} min</span>
              </span>
            </div>
            <button 
              onClick={() => {
                setActiveQueueType('pre-reg');
                setView('queue');
              }}
              className="text-[10px] uppercase tracking-wider bg-mfu-red hover:bg-red-700 px-3 py-1 rounded transition-colors"
            >
              View Queue
            </button>
          </motion.div>
        )}

        {isGradesQueued && view !== 'queue' && (
          <motion.div 
            key="grades-queue-bar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-700 text-white px-8 py-2 text-xs font-bold flex items-center justify-between gap-4 border-t border-slate-600"
          >
            <div className="flex items-center gap-4">
              <span className="text-mfu-red uppercase text-[10px]">Grades Queue</span>
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-mfu-red" />
                Position: <span className="text-mfu-red">{gradesQueuePosition}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-mfu-red" />
                Wait: <span className="text-mfu-red">{gradesEta.toFixed(1)} min</span>
              </span>
            </div>
            <button 
              onClick={() => {
                setActiveQueueType('grades');
                setView('queue');
              }}
              className="text-[10px] uppercase tracking-wider bg-mfu-red hover:bg-red-700 px-3 py-1 rounded transition-colors"
            >
              View Queue
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1">
        <Sidebar 
          view={view}
          setView={setView}
          expandedMenus={expandedMenus}
          toggleMenu={toggleMenu}
          navigateToProtectedView={navigateToProtectedView}
          handleLogout={handleLogout}
        />
        <main className="flex-1 p-8 overflow-x-hidden relative">
          <NotificationToast notifications={notifications} />
          
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
