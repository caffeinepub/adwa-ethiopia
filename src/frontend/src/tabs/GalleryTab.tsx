import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const images = [
  {
    src: "/assets/generated/menelik-ii.dim_400x500.jpg",
    caption: "Emperor Menelik II",
    description:
      "The visionary Emperor who united Ethiopia and led his nation to victory at the Battle of Adwa in 1896.",
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
      "A historical portrait of a distinguished Ethiopian leader, captured in traditional attire during the era of the Battle of Adwa.",
  },
];

export default function GalleryTab() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="px-4 pt-5">
      <p
        className="text-xs font-semibold tracking-widest uppercase mb-1"
        style={{ color: "oklch(0.72 0.06 70)" }}
      >
        GALLERY
      </p>
      <h2
        className="font-display text-xl font-bold mb-4"
        style={{ color: "oklch(0.20 0.04 45)" }}
      >
        Historical Gallery
      </h2>

      <div className="space-y-4">
        {images.map((img, i) => (
          <motion.div
            key={img.caption}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            data-ocid={`gallery.item.${i + 1}`}
            className="bg-white rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            style={{ boxShadow: "0 2px 12px rgba(42,26,18,0.10)" }}
            onClick={() => setLightbox(i)}
          >
            <div
              className="h-1.5"
              style={{ background: "oklch(0.72 0.06 70)" }}
            />
            <img
              src={img.src}
              alt={img.caption}
              className="w-full object-cover"
              style={{ maxHeight: "220px" }}
            />
            <div className="px-4 py-3">
              <h3
                className="font-bold text-sm"
                style={{ color: "oklch(0.20 0.04 45)" }}
              >
                {img.caption}
              </h3>
              <p
                className="text-xs mt-0.5 leading-snug"
                style={{ color: "oklch(0.50 0.02 80)" }}
              >
                {img.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "rgba(26,14,6,0.95)" }}
            onClick={() => setLightbox(null)}
            data-ocid="gallery.modal"
          >
            <button
              type="button"
              data-ocid="gallery.close_button"
              className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center"
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
              className="max-w-[90%] max-h-[70vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p
              className="mt-4 text-sm font-medium"
              style={{ color: "oklch(0.90 0.015 80)" }}
            >
              {images[lightbox].caption}
            </p>
            <p
              className="mt-1 text-xs text-center max-w-xs px-4"
              style={{ color: "oklch(0.65 0.015 80)" }}
            >
              {images[lightbox].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
