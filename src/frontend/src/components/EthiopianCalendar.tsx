import { useEffect, useState } from "react";

const ethiopicMonths = [
  "መስከረም",
  "ጥቅምት",
  "ህዳር",
  "ታህሳስ",
  "ጥር",
  "የካቲት",
  "መጋቢት",
  "ሚያዚያ",
  "ግንቦት",
  "ሰኔ",
  "ሐምሌ",
  "ነሐሴ",
  "ጳጉሜ",
];

function toEthiopian(gDate: Date): {
  day: number;
  month: number;
  year: number;
  monthName: string;
} {
  const jdn = Math.floor(gDate.getTime() / 86400000 + 2440587.5);
  // Ethiopian epoch is JDN 1724221
  const r = (jdn - 1724221) % 1461;
  const n = (r % 365) + 365 * Math.floor(r / 1460);
  const year =
    4 * Math.floor((jdn - 1724221) / 1461) +
    Math.floor(r / 365) -
    Math.floor(r / 1460);
  const month = Math.floor(n / 30) + 1;
  const day = (n % 30) + 1;
  return {
    day,
    month,
    year,
    monthName: ethiopicMonths[Math.min(month - 1, 12)],
  };
}

const gregorianMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function EthiopianCalendar() {
  const [ethDate, setEthDate] = useState(() => toEthiopian(new Date()));
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setNow(d);
      setEthDate(toEthiopian(d));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const gregStr = `${gregorianMonths[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  return (
    <div
      style={{
        display: "inline-block",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(212,175,55,0.25)",
        borderRadius: "16px",
        overflow: "hidden",
        minWidth: "220px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.1)",
      }}
      data-ocid="ethiopian_calendar.card"
    >
      {/* Tricolor stripe */}
      <div style={{ display: "flex", height: "4px" }}>
        <div style={{ flex: 1, background: "#078930" }} />
        <div style={{ flex: 1, background: "#FCDD09" }} />
        <div style={{ flex: 1, background: "#DA121A" }} />
      </div>

      <div style={{ padding: "1rem 1.5rem 1.2rem" }}>
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.7)",
            margin: "0 0 0.5rem",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Today in Ethiopian Calendar
        </p>

        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 2rem)",
            fontWeight: 700,
            color: "#FCDD09",
            margin: "0 0 0.1rem",
            lineHeight: 1.1,
            textShadow: "0 0 20px rgba(252,221,9,0.35)",
          }}
        >
          {ethDate.monthName} {ethDate.day}
        </p>

        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 0.6rem",
          }}
        >
          {ethDate.year} ዓ.ም
        </p>

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.35)",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          {gregStr}
        </p>
      </div>
    </div>
  );
}
