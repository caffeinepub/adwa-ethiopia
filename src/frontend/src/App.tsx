import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { SiFacebook, SiWhatsapp, SiX } from "react-icons/si";
import EmotionalMode from "./components/EmotionalMode";
import EntryPopup from "./components/EntryPopup";
import MusicController from "./components/MusicController";
import TopNav from "./components/TopNav";
import { MusicProvider } from "./contexts/MusicContext";
import AboutSection from "./sections/AboutSection";
import ChatSection from "./sections/ChatSection";
import CommentsSection from "./sections/CommentsSection";
import DocumentarySection from "./sections/DocumentarySection";
import FactsSection from "./sections/FactsSection";
import GallerySection from "./sections/GallerySection";
import HeroesSection from "./sections/HeroesSection";
import HistorySection from "./sections/HistorySection";
import HomeSection from "./sections/HomeSection";
import LearnSection from "./sections/LearnSection";
import MapSection from "./sections/MapSection";
import MusicSection from "./sections/MusicSection";
import QuizSection from "./sections/QuizSection";
import TimelineSection from "./sections/TimelineSection";
import WhyAdwaSection from "./sections/WhyAdwaSection";

export type Tab =
  | "home"
  | "learn"
  | "quiz"
  | "chat"
  | "gallery"
  | "history"
  | "video"
  | "music"
  | "about"
  | "comments";

export default function App() {
  const [popupDismissed, setPopupDismissed] = useState<boolean>(
    () => localStorage.getItem("adwa_entry_done") === "true",
  );

  function handlePopupDismiss() {
    localStorage.setItem("adwa_entry_done", "true");
    setPopupDismissed(true);
  }

  const siteUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(
    "Discover the Battle of Adwa – Africa's greatest victory! 🇪🇹",
  );

  return (
    <MusicProvider>
      <div className="min-h-screen bg-background">
        {!popupDismissed && <EntryPopup onDismiss={handlePopupDismiss} />}
        <TopNav />
        <main>
          <section id="home">
            <HomeSection />
          </section>
          <section id="timeline">
            <TimelineSection />
          </section>
          <section id="heroes">
            <HeroesSection />
          </section>
          <section id="facts">
            <FactsSection />
          </section>
          <section id="map">
            <MapSection />
          </section>
          <section id="why">
            <WhyAdwaSection />
          </section>
          <section id="history">
            <HistorySection />
          </section>
          <section id="learn">
            <LearnSection />
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
          <section id="comments">
            <CommentsSection />
          </section>
          <section id="about">
            <AboutSection />
          </section>
        </main>

        <footer
          className="text-center px-4 border-t border-border"
          style={{ paddingTop: "4rem", paddingBottom: "3rem" }}
        >
          {/* Tricolor stripe */}
          <div
            className="eth-stripe mb-8 mx-auto"
            style={{ height: "3px", maxWidth: "120px" }}
          >
            <div className="s-green" />
            <div className="s-yellow" />
            <div className="s-red" />
          </div>

          {/* Footer quote */}
          <p
            className="font-display text-xl md:text-2xl italic font-bold mb-8"
            style={{
              color: "#FCDD09",
              textShadow: "0 0 30px rgba(252,221,9,0.3)",
            }}
          >
            &ldquo;Adwa is a symbol of freedom for all Africa&rdquo;
          </p>

          {/* Social share buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${siteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.share.button"
              aria-label="Share on X (Twitter)"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.7)";
              }}
            >
              <SiX size={14} />
              <span>Share on X</span>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.share.button"
              aria-label="Share on Facebook"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.7)";
              }}
            >
              <SiFacebook size={14} />
              <span>Facebook</span>
            </a>
            <a
              href={`https://wa.me/?text=${shareText}%20${siteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.share.button"
              aria-label="Share on WhatsApp"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.7)";
              }}
            >
              <SiWhatsapp size={14} />
              <span>WhatsApp</span>
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} by Helen Metekiya
          </p>
        </footer>

        <MusicController />
        <EmotionalMode />
        <Toaster />
      </div>
    </MusicProvider>
  );
}
