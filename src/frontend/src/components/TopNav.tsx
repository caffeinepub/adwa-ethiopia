import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#learn", label: "Learn" },
  { href: "#history", label: "History" },
  { href: "#heroes", label: "Heroes" },
  { href: "#gallery", label: "Gallery" },
  { href: "#quiz", label: "Quiz" },
  { href: "#chat", label: "AI Chat" },
  { href: "#documentary", label: "Documentary" },
  { href: "#music", label: "Music" },
  { href: "#donation", label: "Donation" },
  { href: "#comments", label: "Comments" },
  { href: "#about", label: "About" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(14,24,14,0.96)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Ethiopian stripe */}
      <div className="eth-stripe">
        <div className="s-green" />
        <div className="s-yellow" />
        <div className="s-red" />
      </div>

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 shrink-0">
          <svg
            width="36"
            height="24"
            viewBox="0 0 54 36"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Ethiopian Flag"
          >
            <rect width="54" height="12" y="0" fill="#078930" />
            <rect width="54" height="12" y="12" fill="#FCDD09" />
            <rect width="54" height="12" y="24" fill="#DA121A" />
            <circle cx="27" cy="18" r="10" fill="#0F47AF" />
            <polygon
              points="27,9 28.8,14.5 34.5,14.5 29.9,17.9 31.6,23.4 27,20 22.4,23.4 24.1,17.9 19.5,14.5 25.2,14.5"
              fill="#FCDD09"
            />
          </svg>
          <span
            className="font-bold text-sm tracking-widest uppercase"
            style={{
              color: "#FCDD09",
              fontFamily: "Playfair Display, Georgia, serif",
            }}
          >
            Adwa Ethiopia
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded text-xs font-medium tracking-wide transition-colors hover:text-yellow-300"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 rounded"
          style={{ color: "#FCDD09" }}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden border-t"
          style={{
            background: "rgba(14,24,14,0.98)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.80)" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
