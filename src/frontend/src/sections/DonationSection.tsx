import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Building2,
  Globe,
  GraduationCap,
  Heart,
  Phone,
  Smartphone,
  Star,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

type ModalType = "main" | "telebirr" | "bank" | "contact" | null;

const modalContent: Record<
  string,
  { title: string; body: { id: string; text: string }[] }
> = {
  main: {
    title: "Support Adwa Museum 🇪🇹",
    body: [
      { id: "m1", text: "To support Adwa Museum 🇪🇹, you can donate using:" },
      { id: "m2", text: "📱 Telebirr" },
      { id: "m3", text: "🏦 Bank Transfer" },
      { id: "m4", text: "" },
      { id: "m5", text: "Contact:" },
      { id: "m6", text: "📞 09XXXXXXXX" },
      { id: "m7", text: "" },
      { id: "m8", text: "Thank you for your support ❤️🇪🇹" },
    ],
  },
  telebirr: {
    title: "Telebirr 📱",
    body: [
      { id: "t1", text: "Send your donation via Telebirr:" },
      { id: "t2", text: "" },
      { id: "t3", text: "📱 Account Number: 09XXXXXXXX" },
      { id: "t4", text: "👤 Account Name: Adwa Museum" },
      { id: "t5", text: "" },
      { id: "t6", text: "Steps:" },
      { id: "t7", text: "1. Open your Telebirr app" },
      { id: "t8", text: "2. Select \u2018Send Money\u2019" },
      { id: "t9", text: "3. Enter the number above" },
      { id: "t10", text: "4. Enter your donation amount" },
      { id: "t11", text: "5. Confirm the transfer" },
      { id: "t12", text: "" },
      { id: "t13", text: "Thank you for your generosity ❤️" },
    ],
  },
  bank: {
    title: "Bank Transfer 🏦",
    body: [
      { id: "b1", text: "Send your donation via Bank Transfer:" },
      { id: "b2", text: "" },
      { id: "b3", text: "🏦 Bank: Commercial Bank of Ethiopia" },
      { id: "b4", text: "💳 Account Number: XXXX-XXXX-XXXX" },
      { id: "b5", text: "👤 Account Name: Adwa Museum Fund" },
      { id: "b6", text: "" },
      { id: "b7", text: "Steps:" },
      { id: "b8", text: "1. Visit your nearest bank branch" },
      { id: "b9", text: "2. Or use mobile/internet banking" },
      { id: "b10", text: "3. Transfer to the account above" },
      { id: "b11", text: "4. Keep your receipt for records" },
      { id: "b12", text: "" },
      { id: "b13", text: "Thank you for your generosity ❤️" },
    ],
  },
  contact: {
    title: "Contact Us ☎️",
    body: [
      { id: "c1", text: "Get in touch with us:" },
      { id: "c2", text: "" },
      { id: "c3", text: "📞 Phone: 09XXXXXXXX" },
      { id: "c4", text: "📧 Email: adwamuseum@example.com" },
      { id: "c5", text: "📍 Location: Adwa, Tigray, Ethiopia" },
      { id: "c6", text: "" },
      { id: "c7", text: "We are available:" },
      { id: "c8", text: "🕐 Mon – Fri: 9:00 AM – 5:00 PM" },
      { id: "c9", text: "" },
      { id: "c10", text: "We will be happy to assist you ❤️🇪🇹" },
    ],
  },
};

function FadeBlock({
  children,
  delay = 0,
}: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollAnimation();
  return (
    <div
      ref={ref}
      className="fade-in-up"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function DonationSection() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <div className="py-20 px-6" style={{ background: "oklch(0.12 0.01 250)" }}>
      <div className="max-w-5xl mx-auto">
        <FadeBlock>
          <div className="text-center mb-14">
            <div className="eth-stripe mx-auto mb-5" style={{ maxWidth: 60 }}>
              <div className="s-green" />
              <div className="s-yellow" />
              <div className="s-red" />
            </div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "oklch(0.72 0.18 145)" }}
            >
              SUPPORT
            </p>
            <h2
              className="font-display text-5xl md:text-6xl font-bold"
              style={{ color: "oklch(0.94 0.01 90)" }}
            >
              Donate to Support Adwa Museum 🇪🇹
            </h2>
            <p
              className="text-base mt-4 max-w-2xl mx-auto"
              style={{ color: "oklch(0.65 0.02 90)" }}
            >
              Support the preservation of Ethiopian history by contributing to
              the Adwa Museum.
            </p>
          </div>
        </FadeBlock>

        {/* Impact cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Users size={28} />,
              title: "Educate Youth",
              desc: "Help fund digital learning resources that bring Ethiopian history to young people worldwide.",
              color: "oklch(0.72 0.18 145)",
            },
            {
              icon: <Heart size={28} />,
              title: "Preserve Heritage",
              desc: "Support the preservation and documentation of cultural artifacts, stories, and traditions.",
              color: "#FCDD09",
            },
            {
              icon: <Globe size={28} />,
              title: "Inspire Africa",
              desc: "Share the legacy of Adwa across the continent, inspiring pride and unity in African identity.",
              color: "#DA121A",
            },
          ].map((card, i) => (
            <FadeBlock key={card.title} delay={i * 100}>
              <div
                className="bg-card rounded-2xl p-6 text-center h-full museum-card shadow-card"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                  borderTop: `4px solid ${card.color}`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${card.color}18`, color: card.color }}
                >
                  {card.icon}
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: "oklch(0.94 0.01 90)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.02 90)" }}
                >
                  {card.desc}
                </p>
              </div>
            </FadeBlock>
          ))}
        </div>

        {/* Benefits + Buttons */}
        <FadeBlock>
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{ background: "oklch(0.14 0.01 250)" }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "#FCDD09" }}
                >
                  Your donation helps:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: <BookOpen size={18} />,
                      text: "Preserve historical heritage 📚",
                      color: "oklch(0.72 0.18 145)",
                    },
                    {
                      icon: <GraduationCap size={18} />,
                      text: "Support education 🎓",
                      color: "#FCDD09",
                    },
                    {
                      icon: <Star size={18} />,
                      text: "Promote Ethiopian pride 🇪🇹",
                      color: "#DA121A",
                    },
                  ].map((b) => (
                    <div
                      key={b.text}
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{
                        background: "oklch(0.19 0.01 250)",
                        borderLeft: `3px solid ${b.color}`,
                      }}
                    >
                      <span style={{ color: b.color }}>{b.icon}</span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.90 0.01 90)" }}
                      >
                        {b.text}
                      </span>
                    </div>
                  ))}
                </div>
                <p
                  className="text-sm font-bold mt-5 text-center"
                  style={{ color: "#DA121A" }}
                >
                  Every contribution makes a difference ❤️🇪🇹
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => setModal("main")}
                    className="h-14 text-sm font-bold rounded-2xl"
                    style={{ background: "#078930", color: "white" }}
                  >
                    Transfer Money 💸
                  </Button>
                  <Button
                    onClick={() => setModal("main")}
                    className="h-14 text-sm font-bold rounded-2xl"
                    style={{ background: "#DA121A", color: "white" }}
                  >
                    Donate ❤️
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setModal("telebirr")}
                    className="h-12 text-xs font-semibold rounded-xl flex flex-col gap-0.5"
                    style={{
                      borderColor: "#078930",
                      color: "oklch(0.72 0.18 145)",
                      background: "oklch(0.19 0.01 250)",
                    }}
                  >
                    <Smartphone size={14} />
                    Telebirr 📱
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setModal("bank")}
                    className="h-12 text-xs font-semibold rounded-xl flex flex-col gap-0.5"
                    style={{
                      borderColor: "#FCDD09",
                      color: "#FCDD09",
                      background: "oklch(0.19 0.01 250)",
                    }}
                  >
                    <Building2 size={14} />
                    Bank 🏦
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setModal("contact")}
                    className="h-12 text-xs font-semibold rounded-xl flex flex-col gap-0.5"
                    style={{
                      borderColor: "#DA121A",
                      color: "#DA121A",
                      background: "oklch(0.19 0.01 250)",
                    }}
                  >
                    <Phone size={14} />
                    Contact ☎️
                  </Button>
                </div>
                <p
                  className="text-center text-xs"
                  style={{ color: "oklch(0.62 0.02 90)" }}
                >
                  Every contribution supports Ethiopian cultural education 🇪🇹
                </p>
              </div>
            </div>
          </div>
        </FadeBlock>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="w-full max-w-sm rounded-3xl p-6"
              style={{
                background: "oklch(0.17 0.01 250)",
                border: "1px solid oklch(0.28 0.02 250)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="font-bold text-lg"
                  style={{ color: "oklch(0.90 0.01 90)" }}
                >
                  {modalContent[modal].title}
                </h2>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "oklch(0.22 0.015 250)" }}
                >
                  <X size={16} color="white" />
                </button>
              </div>
              <div className="eth-stripe mb-4" style={{ height: "3px" }}>
                <div className="s-green" />
                <div className="s-yellow" />
                <div className="s-red" />
              </div>
              <div className="space-y-1">
                {modalContent[modal].body.map((line) => (
                  <p
                    key={line.id}
                    className="text-sm leading-relaxed"
                    style={{
                      color: line.text ? "oklch(0.80 0.02 90)" : "transparent",
                    }}
                  >
                    {line.text || "\u00A0"}
                  </p>
                ))}
              </div>
              <Button
                onClick={() => setModal(null)}
                className="w-full mt-5 h-11 rounded-xl font-semibold"
                style={{ background: "#078930", color: "white" }}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
