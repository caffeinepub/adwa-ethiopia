import { Toaster } from "@/components/ui/sonner";
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

import TopNav from "./components/TopNav";
import AboutSection from "./sections/AboutSection";
import ChatSection from "./sections/ChatSection";
import CommentsSection from "./sections/CommentsSection";
import DocumentarySection from "./sections/DocumentarySection";
import DonationSection from "./sections/DonationSection";
import GallerySection from "./sections/GallerySection";
import HeroesSection from "./sections/HeroesSection";
import HistorySection from "./sections/HistorySection";
import HomeSection from "./sections/HomeSection";
import LearnSection from "./sections/LearnSection";
import MusicSection from "./sections/MusicSection";
import QuizSection from "./sections/QuizSection";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.008 80)" }}
    >
      <TopNav />
      <main>
        <section id="home">
          <HomeSection />
        </section>
        <section id="learn">
          <LearnSection />
        </section>
        <section id="history">
          <HistorySection />
        </section>
        <section id="heroes">
          <HeroesSection />
        </section>
        <section id="gallery">
          <GallerySection />
        </section>
        <section id="quiz">
          <QuizSection />
        </section>
        <section id="chat">
          <ChatSection />
        </section>
        <section id="documentary">
          <DocumentarySection />
        </section>
        <section id="music">
          <MusicSection />
        </section>
        <section id="donation">
          <DonationSection />
        </section>
        <section id="comments">
          <CommentsSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
      </main>
      <footer
        className="text-center py-8 px-4 border-t"
        style={{ borderColor: "oklch(0.88 0.01 80)" }}
      >
        <div
          className="eth-stripe mb-6"
          style={{ height: "3px", maxWidth: "120px", margin: "0 auto 24px" }}
        >
          <div className="s-green" />
          <div className="s-yellow" />
          <div className="s-red" />
        </div>
        <p className="text-sm" style={{ color: "oklch(0.50 0.02 80)" }}>
          © 2026 by Helen Metekiya
        </p>
      </footer>
      <Toaster />
    </div>
  );
}
