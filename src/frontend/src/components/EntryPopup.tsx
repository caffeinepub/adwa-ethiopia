import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface EntryPopupProps {
  onDismiss: () => void;
}

function focusGold(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = "#d4af37";
}

function blurBorder(e: React.FocusEvent<HTMLInputElement>, hasError: boolean) {
  e.currentTarget.style.borderColor = hasError
    ? "#8b1a1a"
    : "rgba(255,255,255,0.1)";
}

function hoverEnter(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.transform = "translateY(-1px)";
  e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,175,55,0.4)";
}

function hoverLeave(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.transform = "";
  e.currentTarget.style.boxShadow = "";
}

export default function EntryPopup({ onDismiss }: EntryPopupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function validate() {
    let valid = true;
    if (!name.trim()) {
      setNameError("Please enter your name.");
      valid = false;
    } else {
      setNameError("");
    }
    if (!email.trim()) {
      setEmailError("Please enter your email.");
      valid = false;
    } else if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }
    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setVisible(false);
  }

  return (
    <AnimatePresence onExitComplete={onDismiss}>
      {visible && (
        <motion.div
          key="entry-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid="entry.modal"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            background: "rgba(5, 8, 18, 0.88)",
            backdropFilter: "blur(6px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%",
              maxWidth: "440px",
              background: "#0d1117",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow:
                "0 0 0 1px rgba(212, 175, 55, 0.18), 0 8px 40px rgba(212, 175, 55, 0.12), 0 24px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Tricolor bar */}
            <div style={{ display: "flex", height: "5px" }}>
              <div style={{ flex: 1, background: "#1a6b3a" }} />
              <div style={{ flex: 1, background: "#d4af37" }} />
              <div style={{ flex: 1, background: "#8b1a1a" }} />
            </div>

            <div style={{ padding: "2rem 2rem 2.25rem" }}>
              {/* Title */}
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#1a6b3a",
                    marginBottom: "0.5rem",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  ኢትዮጵያ ትቅደም
                </div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.4rem, 4vw, 1.75rem)",
                    fontWeight: 700,
                    color: "#d4af37",
                    lineHeight: 1.2,
                    marginBottom: "0.5rem",
                    margin: 0,
                  }}
                >
                  Welcome to Adwa Ethiopia
                </h2>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    marginTop: "0.5rem",
                  }}
                >
                  Please enter your details to continue
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    htmlFor="entry-name"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.65)",
                      marginBottom: "0.4rem",
                      letterSpacing: "0.04em",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    id="entry-name"
                    data-ocid="entry.input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.875rem",
                      background: "rgba(255,255,255,0.05)",
                      border: nameError
                        ? "1.5px solid #8b1a1a"
                        : "1.5px solid rgba(255,255,255,0.1)",
                      borderRadius: "9px",
                      color: "#fff",
                      fontSize: "0.9rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={focusGold}
                    onBlur={(e) => blurBorder(e, !!nameError)}
                  />
                  {nameError && (
                    <p
                      data-ocid="entry.error_state"
                      style={{
                        fontSize: "0.75rem",
                        color: "#e05c5c",
                        marginTop: "0.3rem",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {nameError}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="entry-email"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.65)",
                      marginBottom: "0.4rem",
                      letterSpacing: "0.04em",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    id="entry-email"
                    data-ocid="entry.input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.875rem",
                      background: "rgba(255,255,255,0.05)",
                      border: emailError
                        ? "1.5px solid #8b1a1a"
                        : "1.5px solid rgba(255,255,255,0.1)",
                      borderRadius: "9px",
                      color: "#fff",
                      fontSize: "0.9rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={focusGold}
                    onBlur={(e) => blurBorder(e, !!emailError)}
                  />
                  {emailError && (
                    <p
                      data-ocid="entry.error_state"
                      style={{
                        fontSize: "0.75rem",
                        color: "#e05c5c",
                        marginTop: "0.3rem",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  data-ocid="entry.submit_button"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background:
                      "linear-gradient(135deg, #c9a227 0%, #d4af37 50%, #b8912a 100%)",
                    border: "none",
                    borderRadius: "9px",
                    color: "#0d1117",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={hoverEnter}
                  onMouseLeave={hoverLeave}
                >
                  Enter the Site
                </button>
              </form>

              {/* Decorative footer */}
              <div
                style={{
                  marginTop: "1.5rem",
                  textAlign: "center",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.1em",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                🇪🇹 &nbsp; Battle of Adwa, 1896 &nbsp; 🇪🇹
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
