import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import BottomNav from "./components/BottomNav";
import AIChatTab from "./tabs/AIChatTab";
import AboutTab from "./tabs/AboutTab";
import CommentsTab from "./tabs/CommentsTab";
import DonationTab from "./tabs/DonationTab";
import GalleryTab from "./tabs/GalleryTab";
import HistoryTab from "./tabs/HistoryTab";
import HomeTab from "./tabs/HomeTab";
import LearnTab from "./tabs/LearnTab";
import MusicTab from "./tabs/MusicTab";
import QuizTab from "./tabs/QuizTab";
import VideoTab from "./tabs/VideoTab";

export type Tab =
  | "home"
  | "learn"
  | "quiz"
  | "chat"
  | "gallery"
  | "history"
  | "video"
  | "music"
  | "donation"
  | "about"
  | "comments";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab onNavigate={setActiveTab} />;
      case "learn":
        return <LearnTab />;
      case "quiz":
        return <QuizTab />;
      case "chat":
        return <AIChatTab />;
      case "gallery":
        return <GalleryTab />;
      case "history":
        return <HistoryTab />;
      case "video":
        return <VideoTab />;
      case "music":
        return <MusicTab />;
      case "donation":
        return <DonationTab />;
      case "about":
        return <AboutTab />;
      case "comments":
        return <CommentsTab />;
    }
  };

  return (
    <div className="app-shell">
      <div className="app-frame">
        <main className="flex-1 overflow-y-auto pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        <Toaster />
      </div>
    </div>
  );
}
