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
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background/95 backdrop-blur-md border-t border-border flex z-50"
      style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.5)" }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            type="button"
            key={tab.id}
            data-ocid={`nav.${tab.id}.link`}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 transition-colors relative"
          >
            <span
              className="transition-colors duration-300"
              style={{
                color: isActive ? "oklch(0.75 0.14 85)" : "oklch(0.50 0.02 90)",
              }}
            >
              {tab.icon}
            </span>
            <span
              className="text-[10px] font-medium transition-colors duration-300"
              style={{
                color: isActive ? "oklch(0.75 0.14 85)" : "oklch(0.50 0.02 90)",
              }}
            >
              {tab.label}
            </span>
            {isActive && (
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ background: "oklch(0.75 0.14 85)" }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
