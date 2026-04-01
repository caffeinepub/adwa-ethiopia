import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const images = [
  {
    src: "/assets/generated/menelik-ii.dim_400x500.jpg",
    caption: "Emperor Menelik II",
    description:
      "The visionary Emperor who united Ethiopia and led his nation to victory at Adwa in 1896.",
  },
  {
    src: "/assets/generated/empress-taytu.dim_400x500.jpg",
    caption: "Empress Taytu Betul",
    description:
      "A brilliant military strategist and powerful co-leader who commanded her own troops at Adwa.",
  },
  {
    src: "/assets/generated/battle-adwa.dim_800x400.jpg",
    caption: "The Battle of Adwa, 1896",
    description:
      "The historic battle on March 1, 1896, where ~100,000 Ethiopian warriors defeated the Italian army.",
  },
  {
    src: "/assets/generated/ethiopian-child-cultural.jpg",
    caption: "Ethiopian Cultural Pride",
    description:
      "A joyful child dressed in traditional Ethiopian cultural attire, celebrating the colors and heritage of Ethiopia.",
  },
  {
    src: "/assets/919e24266290bcf4bcdbc90d08284161-019d3eb9-5daa-741d-b978-df2f3e7091b0.jpg",
    caption: "Ethiopian Historical Figure",
    description:
      "A historical portrait of a distinguished Ethiopian leader in traditional attire during the era of the Battle of Adwa.",
  },
];

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

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="py-20 px-6" style={{ background: "oklch(0.12 0.01 250)" }}>
      <div className="max-w-7xl mx-auto">
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
              GALLERY
            </p>
            <h2
              className="font-display text-5xl md:text-6xl font-bold"
              style={{ color: "oklch(0.94 0.01 90)" }}
            >
              Historical Gallery
            </h2>
            <p
              className="text-base mt-4 max-w-xl mx-auto"
              style={{ color: "oklch(0.65 0.02 90)" }}
            >
              Portraits, battle scenes, and cultural visuals from the Battle of
              Adwa era
            </p>
          </div>
        </FadeBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <FadeBlock key={img.caption} delay={i * 100}>
              <button
                type="button"
                className="bg-card rounded-2xl overflow-hidden cursor-pointer group transition-transform hover:-translate-y-1 w-full text-left"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
                onClick={() => setLightbox(i)}
              >
                <div className="h-1.5 flex">
                  <div className="flex-1" style={{ background: "#078930" }} />
                  <div className="flex-1" style={{ background: "#FCDD09" }} />
                  <div className="flex-1" style={{ background: "#DA121A" }} />
                </div>
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full object-cover"
                  style={{ height: 240 }}
                />
                <div className="px-5 py-4">
                  <h3
                    className="font-bold text-sm"
                    style={{ color: "oklch(0.94 0.01 90)" }}
                  >
                    {img.caption}
                  </h3>
                  <p
                    className="text-xs mt-1 leading-snug"
                    style={{ color: "oklch(0.60 0.02 90)" }}
                  >
                    {img.description}
                  </p>
                </div>
              </button>
            </FadeBlock>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "rgba(0,0,0,0.95)" }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)" }}
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
            >
              <X size={18} color="white" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={images[lightbox].src}
              alt={images[lightbox].caption}
              className="max-w-[90%] max-h-[75vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-4 text-sm font-medium text-white">
              {images[lightbox].caption}
            </p>
            <p
              className="mt-1 text-xs text-center max-w-sm px-4"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {images[lightbox].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
