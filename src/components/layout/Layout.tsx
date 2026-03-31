import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { NotificationToast } from '../ui/NotificationToast';
import { User, View, Notification } from '../../types';

interface LayoutProps {
  user: User | null;
  view: View;
  setView: (view: View) => void;
  isPeakMode: boolean;
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-mfu-red text-white text-center py-2 text-xs font-bold flex items-center justify-center gap-2 overflow-hidden"
          >
            <ShieldAlert size={14} />
            SYSTEM NOTICE: HIGH TRAFFIC DETECTED. VIRTUAL QUEUEING IS ACTIVE.
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
