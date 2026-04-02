import React from "react";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  FileSearch,
  History,
  UserCheck,
  ClipboardList,
  GraduationCap,
  Wallet,
  Receipt,
  Undo2,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { SidebarItem } from "../ui/SidebarItem";
import { CategoryHeader } from "../ui/CategoryHeader";
import { View } from "../../types";

interface SidebarProps {
  view: View;
  setView: (view: View) => void;
  expandedMenus: string[];
  toggleMenu: (menu: string) => void;
  navigateToProtectedView: (view: View) => void;
  handleLogout: () => void;
}

export function Sidebar({
  view,
  setView,
  expandedMenus,
  toggleMenu,
  navigateToProtectedView,
  handleLogout,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-mfu-border h-[calc(100vh-64px)] overflow-y-auto sticky top-16 flex flex-col">
      <nav className="py-4 flex-1">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active={view === "dashboard"}
          onClick={() => setView("dashboard")}
        />
        <SidebarItem
          icon={<Calendar size={18} />}
          label="Pre-Registration System"
          active={view === "pre-reg"}
          onClick={() => navigateToProtectedView("pre-reg")}
        />
        <SidebarItem
          icon={<FileText size={18} />}
          label="Exit Examination System (NEW)"
          active={view === "exit-exam"}
          onClick={() => setView("exit-exam")}
        />

        <CategoryHeader
          label="General Menu"
          isOpen={expandedMenus.includes("General Menu")}
          onToggle={() => toggleMenu("General Menu")}
        />
        {expandedMenus.includes("General Menu") && (
          <div className="bg-slate-50/30">
            <SidebarItem
              icon={<FileSearch size={18} />}
              label="Search Instructor Schedule"
              active={view === "search-instructor"}
              onClick={() => setView("search-instructor")}
              isSub
            />
            <SidebarItem
              icon={<History size={18} />}
              label="Login History"
              active={view === "login-history"}
              onClick={() => setView("login-history")}
              isSub
            />
            <SidebarItem
              icon={<UserCheck size={18} />}
              label="Admin Dashboard"
              active={view === "admin"}
              onClick={() => setView("admin")}
              isSub
            />
          </div>
        )}

        <CategoryHeader
          label="Student Menu"
          isOpen={expandedMenus.includes("Student Menu")}
          onToggle={() => toggleMenu("Student Menu")}
        />
        {expandedMenus.includes("Student Menu") && (
          <div className="bg-slate-50/30">
            <SidebarItem
              icon={<ClipboardList size={18} />}
              label="Enrollment Results"
              active={view === "enrollment-results"}
              onClick={() => setView("enrollment-results")}
              isSub
            />
            <SidebarItem
              icon={<Calendar size={18} />}
              label="Student Schedule Check"
              active={view === "schedule"}
              onClick={() => setView("schedule")}
              isSub
            />
            <SidebarItem
              icon={<GraduationCap size={18} />}
              label="Grade Results"
              active={view === "grades"}
              onClick={() => navigateToProtectedView("grades")}
              isSub
            />
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Programme Structure"
              active={false}
              onClick={() => {}}
              isSub
            />
            <SidebarItem
              icon={<UserCheck size={18} />}
              label="Graduation Check"
              active={false}
              onClick={() => {}}
              isSub
            />
            <SidebarItem
              icon={<Wallet size={18} />}
              label="Debt / Scholarship"
              active={false}
              onClick={() => {}}
              isSub
            />
            <SidebarItem
              icon={<Receipt size={18} />}
              label="Payment / Receipt"
              active={false}
              onClick={() => {}}
              isSub
            />
            <SidebarItem
              icon={<Undo2 size={18} />}
              label="Refund Request"
              active={false}
              onClick={() => {}}
              isSub
            />
            <SidebarItem
              icon={<MessageSquare size={18} />}
              label="Message to Student"
              active={false}
              onClick={() => {}}
              isSub
            />
          </div>
        )}
      </nav>

      <div className="p-4 mt-auto border-t border-mfu-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm font-bold text-mfu-text-muted hover:text-mfu-red transition-colors w-full px-4 py-2"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
