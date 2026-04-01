import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface EntryPopupProps {
  onDismiss: () => void;
}

const COUNTRIES: { code: string; name: string; flag: string }[] = [
  { code: "AF", name: "Afghanistan", flag: "🇦🇫" },
  { code: "AL", name: "Albania", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿" },
  { code: "AD", name: "Andorra", flag: "🇦🇩" },
  { code: "AO", name: "Angola", flag: "🇦🇴" },
  { code: "AG", name: "Antigua and Barbuda", flag: "🇦🇬" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "AM", name: "Armenia", flag: "🇦🇲" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaijan", flag: "🇦🇿" },
  { code: "BS", name: "Bahamas", flag: "🇧🇸" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "BB", name: "Barbados", flag: "🇧🇧" },
  { code: "BY", name: "Belarus", flag: "🇧🇾" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "BZ", name: "Belize", flag: "🇧🇿" },
  { code: "BJ", name: "Benin", flag: "🇧🇯" },
  { code: "BT", name: "Bhutan", flag: "🇧🇹" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴" },
  { code: "BA", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "BW", name: "Botswana", flag: "🇧🇼" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "BN", name: "Brunei", flag: "🇧🇳" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "BF", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", flag: "🇧🇮" },
  { code: "CV", name: "Cabo Verde", flag: "🇨🇻" },
  { code: "KH", name: "Cambodia", flag: "🇰🇭" },
  { code: "CM", name: "Cameroon", flag: "🇨🇲" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "CF", name: "Central African Republic", flag: "🇨🇫" },
  { code: "TD", name: "Chad", flag: "🇹🇩" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "KM", name: "Comoros", flag: "🇰🇲" },
  { code: "CG", name: "Congo", flag: "🇨🇬" },
  { code: "CD", name: "Congo (DRC)", flag: "🇨🇩" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "HR", name: "Croatia", flag: "🇭🇷" },
  { code: "CU", name: "Cuba", flag: "🇨🇺" },
  { code: "CY", name: "Cyprus", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "DJ", name: "Djibouti", flag: "🇩🇯" },
  { code: "DM", name: "Dominica", flag: "🇩🇲" },
  { code: "DO", name: "Dominican Republic", flag: "🇩🇴" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "SV", name: "El Salvador", flag: "🇸🇻" },
  { code: "GQ", name: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "ER", name: "Eritrea", flag: "🇪🇷" },
  { code: "EE", name: "Estonia", flag: "🇪🇪" },
  { code: "SZ", name: "Eswatini", flag: "🇸🇿" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹" },
  { code: "FJ", name: "Fiji", flag: "🇫🇯" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "GA", name: "Gabon", flag: "🇬🇦" },
  { code: "GM", name: "Gambia", flag: "🇬🇲" },
  { code: "GE", name: "Georgia", flag: "🇬🇪" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "GD", name: "Grenada", flag: "🇬🇩" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹" },
  { code: "GN", name: "Guinea", flag: "🇬🇳" },
  { code: "GW", name: "Guinea-Bissau", flag: "🇬🇼" },
  { code: "GY", name: "Guyana", flag: "🇬🇾" },
  { code: "HT", name: "Haiti", flag: "🇭🇹" },
  { code: "HN", name: "Honduras", flag: "🇭🇳" },
  { code: "HU", name: "Hungary", flag: "🇭🇺" },
  { code: "IS", name: "Iceland", flag: "🇮🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "IR", name: "Iran", flag: "🇮🇷" },
  { code: "IQ", name: "Iraq", flag: "🇮🇶" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "JM", name: "Jamaica", flag: "🇯🇲" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "JO", name: "Jordan", flag: "🇯🇴" },
  { code: "KZ", name: "Kazakhstan", flag: "🇰🇿" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "KI", name: "Kiribati", flag: "🇰🇮" },
  { code: "KP", name: "North Korea", flag: "🇰🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼" },
  { code: "KG", name: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "LA", name: "Laos", flag: "🇱🇦" },
  { code: "LV", name: "Latvia", flag: "🇱🇻" },
  { code: "LB", name: "Lebanon", flag: "🇱🇧" },
  { code: "LS", name: "Lesotho", flag: "🇱🇸" },
  { code: "LR", name: "Liberia", flag: "🇱🇷" },
  { code: "LY", name: "Libya", flag: "🇱🇾" },
  { code: "LI", name: "Liechtenstein", flag: "🇱🇮" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺" },
  { code: "MG", name: "Madagascar", flag: "🇲🇬" },
  { code: "MW", name: "Malawi", flag: "🇲🇼" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "MV", name: "Maldives", flag: "🇲🇻" },
  { code: "ML", name: "Mali", flag: "🇲🇱" },
  { code: "MT", name: "Malta", flag: "🇲🇹" },
  { code: "MH", name: "Marshall Islands", flag: "🇲🇭" },
  { code: "MR", name: "Mauritania", flag: "🇲🇷" },
  { code: "MU", name: "Mauritius", flag: "🇲🇺" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "FM", name: "Micronesia", flag: "🇫🇲" },
  { code: "MD", name: "Moldova", flag: "🇲🇩" },
  { code: "MC", name: "Monaco", flag: "🇲🇨" },
  { code: "MN", name: "Mongolia", flag: "🇲🇳" },
  { code: "ME", name: "Montenegro", flag: "🇲🇪" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "MZ", name: "Mozambique", flag: "🇲🇿" },
  { code: "MM", name: "Myanmar", flag: "🇲🇲" },
  { code: "NA", name: "Namibia", flag: "🇳🇦" },
  { code: "NR", name: "Nauru", flag: "🇳🇷" },
  { code: "NP", name: "Nepal", flag: "🇳🇵" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "NI", name: "Nicaragua", flag: "🇳🇮" },
  { code: "NE", name: "Niger", flag: "🇳🇪" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "MK", name: "North Macedonia", flag: "🇲🇰" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "OM", name: "Oman", flag: "🇴🇲" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "PW", name: "Palau", flag: "🇵🇼" },
  { code: "PA", name: "Panama", flag: "🇵🇦" },
  { code: "PG", name: "Papua New Guinea", flag: "🇵🇬" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾" },
  { code: "PE", name: "Peru", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "RO", name: "Romania", flag: "🇷🇴" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼" },
  { code: "KN", name: "Saint Kitts and Nevis", flag: "🇰🇳" },
  { code: "LC", name: "Saint Lucia", flag: "🇱🇨" },
  { code: "VC", name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
  { code: "WS", name: "Samoa", flag: "🇼🇸" },
  { code: "SM", name: "San Marino", flag: "🇸🇲" },
  { code: "ST", name: "São Tomé and Príncipe", flag: "🇸🇹" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "SN", name: "Senegal", flag: "🇸🇳" },
  { code: "RS", name: "Serbia", flag: "🇷🇸" },
  { code: "SC", name: "Seychelles", flag: "🇸🇨" },
  { code: "SL", name: "Sierra Leone", flag: "🇸🇱" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "SK", name: "Slovakia", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", flag: "🇸🇮" },
  { code: "SB", name: "Solomon Islands", flag: "🇸🇧" },
  { code: "SO", name: "Somalia", flag: "🇸🇴" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "SS", name: "South Sudan", flag: "🇸🇸" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "SD", name: "Sudan", flag: "🇸🇩" },
  { code: "SR", name: "Suriname", flag: "🇸🇷" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "SY", name: "Syria", flag: "🇸🇾" },
  { code: "TW", name: "Taiwan", flag: "🇹🇼" },
  { code: "TJ", name: "Tajikistan", flag: "🇹🇯" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "TL", name: "Timor-Leste", flag: "🇹🇱" },
  { code: "TG", name: "Togo", flag: "🇹🇬" },
  { code: "TO", name: "Tonga", flag: "🇹🇴" },
  { code: "TT", name: "Trinidad and Tobago", flag: "🇹🇹" },
  { code: "TN", name: "Tunisia", flag: "🇹🇳" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "TM", name: "Turkmenistan", flag: "🇹🇲" },
  { code: "TV", name: "Tuvalu", flag: "🇹🇻" },
  { code: "UG", name: "Uganda", flag: "🇺🇬" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "VU", name: "Vanuatu", flag: "🇻🇺" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "YE", name: "Yemen", flag: "🇾🇪" },
  { code: "ZM", name: "Zambia", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", flag: "🇿🇼" },
];

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
  const [country, setCountry] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [visible, setVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedCountry = COUNTRIES.find((c) => c.code === country);
  const filteredCountries = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (dropdownOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
        setSearch("");
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

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
    if (!country) {
      setCountryError("Please select your country.");
      valid = false;
    } else {
      setCountryError("");
    }
    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setVisible(false);
  }

  function selectCountry(code: string) {
    setCountry(code);
    setCountryError("");
    setDropdownOpen(false);
    setSearch("");
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
                <div style={{ marginBottom: "1rem" }}>
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

                {/* Country Selector */}
                <div
                  style={{ marginBottom: "1.5rem", position: "relative" }}
                  ref={dropdownRef}
                >
                  <p
                    aria-hidden="true"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.65)",
                      marginBottom: "0.4rem",
                      letterSpacing: "0.04em",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      margin: "0 0 0.4rem 0",
                    }}
                  >
                    Country
                  </p>

                  {/* Trigger button */}
                  <button
                    type="button"
                    data-ocid="entry.select"
                    onClick={() => setDropdownOpen((o) => !o)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.875rem",
                      background: "rgba(255,255,255,0.05)",
                      border: countryError
                        ? "1.5px solid #8b1a1a"
                        : dropdownOpen
                          ? "1.5px solid #d4af37"
                          : "1.5px solid rgba(255,255,255,0.1)",
                      borderRadius: dropdownOpen ? "9px 9px 0 0" : "9px",
                      color: selectedCountry
                        ? "#fff"
                        : "rgba(255,255,255,0.35)",
                      fontSize: "0.9rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      outline: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {selectedCountry ? (
                        <>
                          <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>
                            {selectedCountry.flag}
                          </span>
                          <span>{selectedCountry.name}</span>
                        </>
                      ) : (
                        <span>Select your country…</span>
                      )}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.4)",
                        transition: "transform 0.2s",
                        transform: dropdownOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    >
                      ▾
                    </span>
                  </button>

                  {/* Dropdown panel */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        key="country-dropdown"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          zIndex: 100,
                          background: "#131820",
                          border: "1.5px solid #d4af37",
                          borderTop: "none",
                          borderRadius: "0 0 9px 9px",
                          overflow: "hidden",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                        }}
                      >
                        {/* Search input */}
                        <div
                          style={{
                            padding: "0.5rem 0.75rem",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                            background: "rgba(255,255,255,0.03)",
                          }}
                        >
                          <input
                            ref={searchRef}
                            type="text"
                            placeholder="🔍 Search country…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                              width: "100%",
                              background: "transparent",
                              border: "none",
                              outline: "none",
                              color: "#fff",
                              fontSize: "0.85rem",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              padding: "0.25rem 0",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        {/* Country list */}
                        <div
                          style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                            scrollbarColor: "rgba(212,175,55,0.3) transparent",
                          }}
                        >
                          {filteredCountries.length === 0 ? (
                            <div
                              style={{
                                padding: "0.75rem 1rem",
                                color: "rgba(255,255,255,0.35)",
                                fontSize: "0.85rem",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                textAlign: "center",
                              }}
                            >
                              No countries found
                            </div>
                          ) : (
                            filteredCountries.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => selectCountry(c.code)}
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.625rem",
                                  padding: "0.5rem 1rem",
                                  background:
                                    country === c.code
                                      ? "rgba(212,175,55,0.12)"
                                      : "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  color:
                                    country === c.code
                                      ? "#d4af37"
                                      : "rgba(255,255,255,0.8)",
                                  fontSize: "0.875rem",
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                  textAlign: "left",
                                  transition: "background 0.12s, color 0.12s",
                                }}
                                onMouseEnter={(e) => {
                                  if (country !== c.code) {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.05)";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (country !== c.code) {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "1.2rem",
                                    lineHeight: 1,
                                    flexShrink: 0,
                                  }}
                                >
                                  {c.flag}
                                </span>
                                <span>{c.name}</span>
                                {country === c.code && (
                                  <span
                                    style={{
                                      marginLeft: "auto",
                                      color: "#d4af37",
                                      fontSize: "0.8rem",
                                    }}
                                  >
                                    ✓
                                  </span>
                                )}
                              </button>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {countryError && (
                    <p
                      data-ocid="entry.error_state"
                      style={{
                        fontSize: "0.75rem",
                        color: "#e05c5c",
                        marginTop: "0.3rem",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {countryError}
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
