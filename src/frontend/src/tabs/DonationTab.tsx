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

const impactCards = [
  {
    icon: <Users size={22} />,
    title: "Educate Youth",
    description:
      "Help fund digital learning resources that bring Ethiopian history to young people worldwide.",
    accentColor: "oklch(0.55 0.18 145)",
  },
  {
    icon: <Heart size={22} />,
    title: "Preserve Heritage",
    description:
      "Support the preservation and documentation of cultural artifacts, stories, and traditions.",
    accentColor: "oklch(0.65 0.18 50)",
  },
  {
    icon: <Globe size={22} />,
    title: "Inspire Africa",
    description:
      "Share the legacy of Adwa across the continent, inspiring pride and unity in African identity.",
    accentColor: "oklch(0.50 0.20 25)",
  },
];

const donationBenefits = [
  {
    icon: <BookOpen size={20} />,
    text: "Preserve historical heritage 📚",
    accent: "oklch(0.55 0.18 145)",
  },
  {
    icon: <GraduationCap size={20} />,
    text: "Support education 🎓",
    accent: "oklch(0.65 0.18 50)",
  },
  {
    icon: <Star size={20} />,
    text: "Promote Ethiopian pride 🇪🇹",
    accent: "oklch(0.50 0.20 25)",
  },
];

type ModalType = "main" | "telebirr" | "bank" | "contact" | null;

interface BodyLine {
  id: string;
  text: string;
}

interface ModalInfo {
  title: string;
  body: BodyLine[];
}

const modalContent: Record<string, ModalInfo> = {
  main: {
    title: "Support Adwa Museum \u{1F1EA}\u{1F1F9}",
    body: [
      {
        id: "m1",
        text: "To support Adwa Museum \u{1F1EA}\u{1F1F9}, you can donate using:",
      },
      { id: "m2", text: "\uD83D\uDCF1 Telebirr" },
      { id: "m3", text: "\uD83C\uDFE6 Bank Transfer" },
      { id: "m4", text: "" },
      { id: "m5", text: "Contact:" },
      { id: "m6", text: "\uD83D\uDCDE 09XXXXXXXX" },
      { id: "m7", text: "" },
      {
        id: "m8",
        text: "Thank you for your support \u2764\uFE0F\u{1F1EA}\u{1F1F9}",
      },
    ],
  },
  telebirr: {
    title: "Telebirr \uD83D\uDCF1",
    body: [
      { id: "t1", text: "Send your donation via Telebirr:" },
      { id: "t2", text: "" },
      { id: "t3", text: "\uD83D\uDCF1 Account Number: 09XXXXXXXX" },
      { id: "t4", text: "\uD83D\uDC64 Account Name: Adwa Museum" },
      { id: "t5", text: "" },
      { id: "t6", text: "Steps:" },
      { id: "t7", text: "1. Open your Telebirr app" },
      { id: "t8", text: "2. Select \u2018Send Money\u2019" },
      { id: "t9", text: "3. Enter the number above" },
      { id: "t10", text: "4. Enter your donation amount" },
      { id: "t11", text: "5. Confirm the transfer" },
      { id: "t12", text: "" },
      { id: "t13", text: "Thank you for your generosity \u2764\uFE0F" },
    ],
  },
  bank: {
    title: "Bank Transfer \uD83C\uDFE6",
    body: [
      { id: "b1", text: "Send your donation via Bank Transfer:" },
      { id: "b2", text: "" },
      { id: "b3", text: "\uD83C\uDFE6 Bank: Commercial Bank of Ethiopia" },
      { id: "b4", text: "\uD83D\uDCB3 Account Number: XXXX-XXXX-XXXX" },
      { id: "b5", text: "\uD83D\uDC64 Account Name: Adwa Museum Fund" },
      { id: "b6", text: "" },
      { id: "b7", text: "Steps:" },
      { id: "b8", text: "1. Visit your nearest bank branch" },
      { id: "b9", text: "2. Or use mobile/internet banking" },
      { id: "b10", text: "3. Transfer to the account above" },
      { id: "b11", text: "4. Keep your receipt for records" },
      { id: "b12", text: "" },
      { id: "b13", text: "Thank you for your generosity \u2764\uFE0F" },
    ],
  },
  contact: {
    title: "Contact Us \u260E\uFE0F",
    body: [
      { id: "c1", text: "Get in touch with us:" },
      { id: "c2", text: "" },
      { id: "c3", text: "\uD83D\uDCDE Phone: 09XXXXXXXX" },
      { id: "c4", text: "\uD83D\uDCE7 Email: adwamuseum@example.com" },
      { id: "c5", text: "\uD83D\uDCCD Location: Adwa, Tigray, Ethiopia" },
      { id: "c6", text: "" },
      { id: "c7", text: "We are available:" },
      { id: "c8", text: "\uD83D\uDD50 Mon \u2013 Fri: 9:00 AM \u2013 5:00 PM" },
      { id: "c9", text: "" },
      {
        id: "c10",
        text: "We will be happy to assist you \u2764\uFE0F\u{1F1EA}\u{1F1F9}",
      },
    ],
  },
};

export default function DonationTab() {
  const [modal, setModal] = useState<ModalType>(null);

  const greenColor = "oklch(0.55 0.18 145)";
  const yellowColor = "oklch(0.75 0.18 90)";
  const redColor = "oklch(0.50 0.20 25)";

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.15 0.04 45)" }}>
      {/* Ethiopian flag stripe */}
      <div className="flex h-2">
        <div className="flex-1" style={{ background: greenColor }} />
        <div className="flex-1" style={{ background: yellowColor }} />
        <div className="flex-1" style={{ background: redColor }} />
      </div>

      {/* ── INTRODUCTION SECTION ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="px-4 pt-6 pb-6"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.19 0.07 145 / 0.25) 0%, oklch(0.18 0.06 45) 50%, oklch(0.19 0.07 25 / 0.25) 100%)",
          borderBottom: "1px solid oklch(0.28 0.04 45)",
        }}
      >
        {/* Coin icon accent */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
          className="flex justify-center mb-4"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.18 90 / 0.20) 0%, oklch(0.65 0.18 50 / 0.20) 100%)",
              border: `2px solid ${yellowColor}`,
              boxShadow: "0 0 24px oklch(0.75 0.18 90 / 0.30)",
            }}
          >
            💰
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="text-center text-2xl font-bold leading-tight mb-2"
          style={{ color: "oklch(0.93 0.015 80)" }}
        >
          Donate to Support Adwa Museum 🇪🇹
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="text-center text-sm leading-relaxed mb-5"
          style={{ color: "oklch(0.68 0.02 80)" }}
        >
          Support the preservation of Ethiopian history by contributing to the
          Adwa Museum.
        </motion.p>

        {/* Divider */}
        <div className="flex h-0.5 rounded-full mb-5 overflow-hidden mx-8">
          <div className="flex-1" style={{ background: greenColor }} />
          <div className="flex-1" style={{ background: yellowColor }} />
          <div className="flex-1" style={{ background: redColor }} />
        </div>

        {/* Your donation helps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mb-5"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3 text-center"
            style={{ color: yellowColor }}
          >
            Your donation helps:
          </p>
          <div className="space-y-2">
            {donationBenefits.map((benefit, i) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: "oklch(0.20 0.04 45)",
                  borderLeft: `3px solid ${benefit.accent}`,
                }}
              >
                <span style={{ color: benefit.accent }}>{benefit.icon}</span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.88 0.015 80)" }}
                >
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to Donate */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.45 }}
          className="rounded-xl px-4 py-4 mb-4"
          style={{
            background: "oklch(0.20 0.04 45)",
            border: "1px solid oklch(0.27 0.04 45)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: greenColor }}
          >
            How to Donate:
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.75 0.015 80)" }}
          >
            You can support by sending money through available methods such as
            mobile banking or local services.
          </p>
        </motion.div>

        {/* CTA line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.45 }}
          className="text-center text-sm font-semibold mb-4"
          style={{ color: yellowColor }}
        >
          👉 Click the button below to proceed with donation.
        </motion.p>

        {/* Footer lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.45 }}
          className="text-center space-y-1"
        >
          <p className="text-sm font-bold" style={{ color: redColor }}>
            Every contribution makes a difference ❤️🇪🇹
          </p>
          <p className="text-xs" style={{ color: "oklch(0.60 0.015 80)" }}>
            Thank you for supporting the legacy of Adwa 🙏
          </p>
        </motion.div>
      </motion.div>

      {/* Header */}
      <div
        className="px-4 pt-6 pb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 45) 0%, oklch(0.12 0.04 45) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: yellowColor }}
          >
            Make a Difference
          </p>
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: "oklch(0.90 0.015 80)" }}
          >
            Support Adwa Museum 🇪🇹
          </h1>
        </motion.div>
      </div>

      <div className="px-4 pb-8">
        {/* Heart animation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl p-6 mb-6 text-center"
          style={{
            background: "oklch(0.20 0.04 45)",
            border: "1px solid oklch(0.28 0.04 45)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{
              duration: 1.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: "oklch(0.50 0.20 25 / 0.15)" }}
          >
            <Heart
              size={32}
              fill="oklch(0.60 0.20 25)"
              style={{ color: "oklch(0.60 0.20 25)" }}
            />
          </motion.div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.80 0.015 80)" }}
          >
            Your donation helps preserve Ethiopian history and inspire future
            generations to learn about the Battle of Adwa and its legacy.
          </p>
        </motion.div>

        {/* Impact cards */}
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: "oklch(0.50 0.02 80)" }}
        >
          Your Impact
        </p>
        <div className="grid grid-cols-1 gap-3 mb-6">
          {impactCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className="rounded-xl p-4 flex items-start gap-4"
              style={{
                background: "oklch(0.20 0.04 45)",
                borderLeft: `3px solid ${card.accentColor}`,
              }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `${card.accentColor}22`,
                  color: card.accentColor,
                }}
              >
                {card.icon}
              </div>
              <div>
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ color: "oklch(0.90 0.015 80)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.60 0.015 80)" }}
                >
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main donate buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <Button
              data-ocid="donation.primary_button"
              onClick={() => setModal("main")}
              className="h-14 text-sm font-bold rounded-2xl transition-transform active:scale-95"
              style={{
                background: greenColor,
                color: "oklch(0.98 0 0)",
                boxShadow: `0 4px 20px ${greenColor}55`,
              }}
            >
              Transfer Money 💸
            </Button>
            <Button
              data-ocid="donation.secondary_button"
              onClick={() => setModal("main")}
              className="h-14 text-sm font-bold rounded-2xl transition-transform active:scale-95"
              style={{
                background: redColor,
                color: "oklch(0.98 0 0)",
                boxShadow: `0 4px 20px ${redColor}55`,
              }}
            >
              Donate ❤️
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              data-ocid="donation.telebirr.button"
              onClick={() => setModal("telebirr")}
              className="h-12 text-xs font-semibold rounded-xl flex flex-col gap-0.5 transition-transform active:scale-95"
              style={{
                background: "oklch(0.20 0.04 45)",
                borderColor: greenColor,
                color: greenColor,
              }}
            >
              <Smartphone size={16} />
              Telebirr 📱
            </Button>
            <Button
              variant="outline"
              data-ocid="donation.bank.button"
              onClick={() => setModal("bank")}
              className="h-12 text-xs font-semibold rounded-xl flex flex-col gap-0.5 transition-transform active:scale-95"
              style={{
                background: "oklch(0.20 0.04 45)",
                borderColor: yellowColor,
                color: yellowColor,
              }}
            >
              <Building2 size={16} />
              Bank 🏦
            </Button>
            <Button
              variant="outline"
              data-ocid="donation.contact.button"
              onClick={() => setModal("contact")}
              className="h-12 text-xs font-semibold rounded-xl flex flex-col gap-0.5 transition-transform active:scale-95"
              style={{
                background: "oklch(0.20 0.04 45)",
                borderColor: redColor,
                color: redColor,
              }}
            >
              <Phone size={16} />
              Contact ☎️
            </Button>
          </div>

          <p
            className="text-center text-xs"
            style={{ color: "oklch(0.50 0.02 80)" }}
          >
            Every contribution supports Ethiopian cultural education 🇪🇹
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-sm rounded-3xl p-6"
              style={{
                background: "oklch(0.18 0.05 45)",
                border: "1px solid oklch(0.30 0.05 45)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="font-bold text-lg"
                  style={{ color: "oklch(0.90 0.015 80)" }}
                >
                  {modalContent[modal].title}
                </h2>
                <button
                  type="button"
                  data-ocid="donation.modal.close_button"
                  onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "oklch(0.25 0.04 45)",
                    color: "oklch(0.70 0.015 80)",
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex h-1 rounded-full mb-4 overflow-hidden">
                <div className="flex-1" style={{ background: greenColor }} />
                <div className="flex-1" style={{ background: yellowColor }} />
                <div className="flex-1" style={{ background: redColor }} />
              </div>

              <div className="space-y-1">
                {modalContent[modal].body.map((line) => (
                  <p
                    key={line.id}
                    className="text-sm leading-relaxed"
                    style={{
                      color:
                        line.text === ""
                          ? "transparent"
                          : "oklch(0.82 0.015 80)",
                      fontWeight: line.text.includes("Thank you")
                        ? "600"
                        : undefined,
                    }}
                  >
                    {line.text || "\u00A0"}
                  </p>
                ))}
              </div>

              <Button
                data-ocid="donation.modal.close_button"
                onClick={() => setModal(null)}
                className="w-full mt-5 h-11 rounded-xl font-semibold"
                style={{ background: greenColor, color: "oklch(0.98 0 0)" }}
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
