"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: "dashboard", activeIcon: "dashboard" },
    { name: "Tareas", href: "/tasks", icon: "checklist", activeIcon: "checklist" },
    { name: "Horario", href: "/schedule", icon: "calendar_month", activeIcon: "calendar_month" },
    { name: "Chat", href: "/chat", icon: "smart_toy", activeIcon: "smart_toy" },
  ];

  return (
    <nav className="fixed bottom-0 w-full h-[56px] z-50 bg-surface shadow-[0px_-2px_8px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center w-full max-w-[768px] mx-auto px-margin-mobile h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex flex-col items-center justify-center transition-all active:scale-90 ${
                isActive 
                  ? "text-secondary hover:opacity-80" 
                  : "text-on-surface-variant hover:text-secondary"
              }`}
            >
              <span className="material-symbols-outlined" data-weight={isActive ? "fill" : "regular"}>
                {isActive ? item.activeIcon : item.icon}
              </span>
              <span className={`font-label-sm text-label-sm mt-1 ${isActive ? 'font-bold' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
