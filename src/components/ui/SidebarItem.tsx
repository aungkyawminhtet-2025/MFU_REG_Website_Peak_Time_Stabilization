import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  isSub?: boolean;
}

export function SidebarItem({
  icon,
  label,
  active,
  onClick,
  isSub = false,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 transition-all group relative ${
        active
          ? "bg-mfu-red text-white"
          : "text-mfu-text-muted hover:bg-slate-50 hover:text-mfu-red"
      } ${isSub ? "pl-10 py-2 text-xs" : "text-sm font-medium"}`}
    >
      <span
        className={`${active ? "text-white" : "text-mfu-text-muted group-hover:text-mfu-red"}`}
      >
        {icon}
      </span>
      <span className="flex-1 text-left text-base text-black">{label}</span>
      {active && !isSub && (
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/30" />
      )}
    </button>
  );
}
