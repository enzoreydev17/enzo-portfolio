"use client";
import { useState, useEffect, useCallback } from "react";

const PHOTOS = [
  { src: "/photos/photo-profile.jpg",   caption: "Lorenzo Zuriel Reybuenan",  sub: "Automation Engineer & AI Consultant", pos: "top" },
  { src: "/photos/photo-ironman.jpg",   caption: "IRONMAN 70.3 Philippines",   sub: "Finisher · 113km · Swim · Bike · Run", pos: "top" },
  { src: "/photos/photo-swimming.jpg",  caption: "CoastMan Lobo 2026",         sub: "1.5km Open Water Swim Finisher", pos: "center" },
  { src: "/photos/photo-running.jpg",   caption: "Albay Ultra",                sub: "Trail & Ultra Running", pos: "center" },
  { src: "/photos/photo-cycling.jpg",   caption: "Road Cycling",               sub: "Triathlon Training", pos: "center" },
];

// deck positions: slot 0 = front, slot 4 = furthest behind
const DECK = [
  { tx:  0,  ty:  0,  rot:  0,   sc: 1.00, z: 5, op: 1.0 },
  { tx: 10,  ty:  8,  rot:  3.5, sc: 0.96, z: 4, op: 1.0 },
  { tx: -13, ty: 14,  rot: -4.5, sc: 0.92, z: 3, op: 0.9 },
  { tx: 15,  ty: 20,  rot:  6.0, sc: 0.88, z: 2, op: 0.65 },
  { tx: -8,  ty: 26,  rot: -2.5, sc: 0.84, z: 1, op: 0.45 },
];

const CERTS = [
  {
    name: "AWS Solutions Architect Associate",
    year: "2022",
    iconUrl: "https://cdn.simpleicons.org/amazonaws/FF9900",
    iconBg: "#131921",
  },
  {
    name: "Databricks Certified Data Engineer",
    year: "2023",
    iconUrl: "https://cdn.simpleicons.org/databricks/FF3621",
    iconBg: "#1B1B1B",
  },
  {
    name: "SnowPro Core Certified",
    year: "2024",
    iconUrl: "https://cdn.simpleicons.org/snowflake/29B5E8",
    iconBg: "#F5FBFF",
  },
  {
    name: "HubSpot RevOps Certified",
    year: "—",
    iconUrl: "https://cdn.simpleicons.org/hubspot/FF7A59",
    iconBg: "#FFF4F0",
  },
  {
    name: "Lean Six Sigma Black Belt",
    year: "2020",
    iconUrl: null,
    iconBg: "#111",
  },
];

function UPLBIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* Outer maroon ring */}
      <circle cx="18" cy="18" r="18" fill="#7B1C3A"/>
      {/* Inner cream field */}
      <circle cx="18" cy="18" r="13" fill="#F5E2C8"/>
      {/* Three stars (PH flag motif) */}
      <text x="18" y="10" textAnchor="middle" fontSize="5" fill="#7B1C3A" fontFamily="Arial,sans-serif">★ ★ ★</text>
      {/* UP wordmark */}
      <text x="18" y="21.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#7B1C3A" fontFamily="Georgia,serif" letterSpacing="-0.5">UP</text>
      {/* Ring label */}
      <text x="18" y="34" textAnchor="middle" fontSize="3.2" fill="white" fontFamily="Arial,sans-serif" letterSpacing="0.6">LOS BAÑOS</text>
    </svg>
  );
}

function LSSIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="10" width="20" height="8" rx="4" fill="#2A2A2A" stroke="#555" strokeWidth="1"/>
      <rect x="9" y="8" width="6" height="12" rx="1.5" fill="#333" stroke="#666" strokeWidth="0.8"/>
      <circle cx="12" cy="14" r="2" fill="#888"/>
      <text x="12" y="7.5" fontSize="4" fontWeight="900" fill="#999" textAnchor="middle" fontFamily="Arial,sans-serif" letterSpacing="0.3">LSS</text>
    </svg>
  );
}

export default function About() {
  const [active, setActive] = useState(0);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % PHOTOS.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, 3800);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <section id="about" className="px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">// 04_about</span>
        <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink mt-4 max-w-lg">
          I didn&apos;t start as a consultant. I started as the builder.
        </h2>

        <div className="grid lg:grid-cols-2 gap-14 mt-12 items-start">

          {/* ── LEFT: Card deck carousel ── */}
          <div className="flex flex-col items-center gap-5">
            {/* Deck wrapper — extra bottom padding absorbs the stack offset */}
            <div className="relative" style={{ width: 280, height: 420 }}>
              {PHOTOS.map((photo, idx) => {
                const slot = (idx - active + PHOTOS.length) % PHOTOS.length;
                const { tx, ty, rot, sc, z, op } = DECK[slot];
                const isActive = slot === 0;
                return (
                  <div
                    key={photo.src}
                    onClick={isActive ? advance : undefined}
                    style={{
                      position: "absolute",
                      width: 280,
                      height: 390,
                      borderRadius: 16,
                      overflow: "hidden",
                      transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc})`,
                      zIndex: z,
                      opacity: op,
                      transition: "transform 0.55s cubic-bezier(0.34,1.4,0.64,1), opacity 0.55s ease",
                      cursor: isActive ? "pointer" : "default",
                      boxShadow: isActive
                        ? "0 20px 48px rgba(58,31,14,0.22), 0 0 0 1px rgba(58,31,14,0.08)"
                        : "0 8px 24px rgba(58,31,14,0.14)",
                      background: "#F5E2C8",
                    }}
                  >
                    {/* Photo area */}
                    <div style={{ width: "100%", height: "calc(100% - 64px)", overflow: "hidden", position: "relative" }}>
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: photo.pos,
                          filter: "sepia(0.42) saturate(0.82) hue-rotate(-6deg) brightness(0.93)",
                          display: "block",
                        }}
                      />
                      {/* Subtle warm gradient overlay */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, transparent 55%, rgba(245,226,200,0.35))",
                        pointerEvents: "none",
                      }} />
                    </div>

                    {/* Caption strip */}
                    <div style={{
                      height: 64,
                      padding: "10px 14px",
                      background: "#F5E2C8",
                      borderTop: "1px solid rgba(58,31,14,0.1)",
                    }}>
                      <p style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#3A1F0E", margin: 0, lineHeight: 1.4 }}>
                        {photo.caption}
                      </p>
                      <p style={{ fontFamily: "monospace", fontSize: 10, color: "#8A6B4F", margin: 0, marginTop: 2 }}>
                        {photo.sub}
                      </p>
                    </div>

                    {/* Active indicator: tap hint */}
                    {isActive && (
                      <div style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "rgba(245,130,49,0.85)",
                        borderRadius: 20,
                        padding: "3px 9px",
                        backdropFilter: "blur(4px)",
                      }}>
                        <span style={{ fontFamily: "monospace", fontSize: 9, color: "white", fontWeight: 700, letterSpacing: "0.05em" }}>
                          TAP →
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-1">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Photo ${i + 1}`}
                  className="rounded-full transition-all duration-300 flex-shrink-0"
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    background: i === active ? "#F58231" : "rgba(58,31,14,0.18)",
                  }}
                />
              ))}
            </div>

            {/* Tagline */}
            <div className="text-center max-w-[260px]">
              <p className="font-display text-[17px] font-semibold text-ink leading-snug">
                I don&apos;t DNF races.
              </p>
              <p className="font-display text-[17px] font-semibold text-brand-red leading-snug">
                I don&apos;t DNF projects.
              </p>
              <p className="font-mono text-[10px] text-muted mt-1.5 tracking-wide">DNF = Did Not Finish</p>
            </div>
          </div>

          {/* ── RIGHT: Bio + Certs + Education ── */}
          <div>
            <div className="space-y-5 mb-10">
              <p className="font-display text-[17px] text-ink/85 leading-[1.8]">
                My career started in data — modeling credit risk at UnionBank, tracking
                commodity markets at S&P Global Platts. I wasn&apos;t pitching decks.
                I was building the actual systems that decisions ran on.
              </p>
              <p className="font-display text-[17px] text-ink/85 leading-[1.8]">
                That shifted when I moved into automation. At Meta, I led the team
                that delivered a UiPath bot saving 68,000 hours a year. At Accenture,
                I built an AI agent that automated 65% of customer-facing operations.
                At Thakral One, I designed a Single Customer View unifying four data
                domains for a regional banking group.
              </p>
              <p className="font-display text-[17px] text-ink/85 leading-[1.8]">
                What I found across all of it: the technical part is the easy bit.
                The hard part is understanding the business well enough to know
                what to build — and what not to.
              </p>
            </div>

            {/* Certifications */}
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">Certifications</p>
            <div className="flex flex-col gap-2 mb-6">
              {CERTS.map(({ name, year, iconUrl, iconBg }) => (
                <div key={name}
                  className="flex items-center gap-3 px-3.5 py-2.5 bg-white rounded-xl border border-ink/8 transition-all hover:border-brand-orange/30 hover:bg-cream">
                  {/* Logo badge */}
                  <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
                    style={{ background: iconBg }}>
                    {iconUrl
                      ? <img src={iconUrl} alt="" width={20} height={20} style={{ objectFit: "contain" }} />
                      : <LSSIcon />}
                  </div>
                  <span className="font-mono text-[12px] text-ink flex-1 min-w-0">{name}</span>
                  <span className="font-mono text-[11px] font-semibold text-ink/50 flex-shrink-0 ml-2">{year}</span>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-ink text-cream">
              <div className="flex-shrink-0">
                <UPLBIcon />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-cream/45 mb-1">Education</p>
                <p className="font-display text-[16px] font-medium leading-snug">University of the Philippines Los Baños</p>
                <p className="font-mono text-[12px] text-cream/55 mt-1">B.S. Statistics</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}