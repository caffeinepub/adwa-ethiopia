import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const { t, toggleLang } = useLanguage();
  const navLinks = [
    { href: "#home", label: t.navHome },
    { href: "#timeline", label: t.navTimeline },
    { href: "#heroes", label: t.navHeroes },
    { href: "#facts", label: t.navFacts },
    { href: "#map", label: t.navMap },
    { href: "#why", label: t.navWhyAdwa },
    { href: "#history", label: t.navHistory },
    { href: "#quiz", label: t.navQuiz },
    { href: "#chat", label: t.navChat },
    { href: "#gallery", label: t.navGallery },
    { href: "#music", label: t.navMusic },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      {/* Tricolor accent bar */}
      <div className="eth-stripe" style={{ height: "3px" }}>
        <div className="s-green" />
        <div className="s-yellow" />
        <div className="s-red" />
      </div>

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 shrink-0"
          data-ocid="nav.home.link"
        >
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
            className="font-display font-bold text-sm tracking-widest uppercase"
            style={{ color: "oklch(0.75 0.14 85)" }}
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
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-")}.link`}
              className="px-3 py-1.5 rounded-btn text-xs font-medium tracking-wide transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Language toggle + Mobile hamburger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            data-ocid="nav.lang.toggle"
            style={{
              color: "#FCDD09",
              border: "1px solid #FCDD09",
              borderRadius: 20,
              padding: "2px 10px",
              fontSize: 11,
              fontWeight: 700,
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {t.langToggle}
          </button>
          <button
            type="button"
            className="lg:hidden p-2 rounded-btn text-secondary"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            data-ocid="nav.mobile.toggle"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background/98">
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-btn text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
