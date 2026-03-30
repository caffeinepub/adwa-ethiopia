import { BookOpen, HelpCircle, Home, Image, MessageSquare } from "lucide-react";
import type { Tab } from "../App";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", icon: <Home size={20} /> },
  { id: "learn", label: "Learn", icon: <BookOpen size={20} /> },
  { id: "quiz", label: "Quiz", icon: <HelpCircle size={20} /> },
  { id: "chat", label: "AI Chat", icon: <MessageSquare size={20} /> },
  { id: "gallery", label: "Gallery", icon: <Image size={20} /> },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-dark-brown border-t border-white/10 flex z-50"
      style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.3)" }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            type="button"
            key={tab.id}
            data-ocid={`nav.${tab.id}.link`}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 transition-colors"
          >
            <span
              className="transition-colors"
              style={{
                color: isActive
                  ? "oklch(0.72 0.12 70)"
                  : "oklch(0.65 0.015 80)",
              }}
            >
              {tab.icon}
            </span>
            <span
              className="text-[10px] font-medium transition-colors"
              style={{
                color: isActive
                  ? "oklch(0.72 0.12 70)"
                  : "oklch(0.65 0.015 80)",
              }}
            >
              {tab.label}
            </span>
            {isActive && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-gold rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
