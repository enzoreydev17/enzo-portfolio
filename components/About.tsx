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
    cat: "Cloud",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/3840px-Amazon_Web_Services_Logo.svg.png",
  },
  {
    name: "Databricks Certified Data Engineer",
    cat: "Data Eng.",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png",
  },
  {
    name: "SnowPro Core Certified",
    cat: "Data Eng.",
    imgSrc: "https://img.logo.dev/snowflake.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=512&retina=true&format=png",
  },
  {
    name: "HubSpot RevOps Certified",
    cat: "CRM",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HubSpot_Logo.svg/3840px-HubSpot_Logo.svg.png",
  },
  {
    name: "Lean Six Sigma Black Belt",
    cat: "Process",
    imgSrc: "https://images.credly.com/images/99c6c563-b252-4a36-8521-00f4509f2e5c/image.png",
  },
];



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
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/8 border border-brand-red/15 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">Person Behind the Work</span>
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink">
            I didn&apos;t start as a <em className="not-italic text-brand-red">consultant.</em> I started as the <em className="not-italic text-brand-red">builder.</em>
          </h2>
          <p className="font-mono text-[13px] text-muted mt-3 max-w-md mx-auto leading-relaxed">
            Data scientist, automation engineer, triathlete.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* ── LEFT: Card deck carousel ── */}
          <div className="flex flex-col items-center gap-5">
            {/* Intro label */}
            <div className="text-center">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Beyond the Screen</p>
              <div className="mt-1.5 h-px w-12 mx-auto bg-brand-orange/40 rounded-full" />
            </div>

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
            <div className="text-center max-w-[270px]">
              <p className="font-display text-[16px] text-ink/75 leading-relaxed">
                Most people stop at <em className="not-italic font-semibold text-ink">hard.</em>
              </p>
              <p className="font-display text-[16px] leading-relaxed">
                Triathletes — and good Automation engineers —
              </p>
              <p className="font-display text-[16px] font-semibold text-brand-red leading-relaxed">
                stop at done.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Bio ── */}
          <div className="space-y-5">
            <p className="font-display text-[17px] text-ink/85 leading-[1.8]">
              My career started in data — a Statistics degree from University of the Philippines Los Baños,
              then modeling credit risk at UnionBank and tracking commodity markets
              at S&P Global Platts. I wasn&apos;t pitching decks. I was building
              the actual systems that decisions ran on.
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

        </div>

        {/* ── Certifications marquee ── */}
        <div className="mt-14">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-5 text-center">Certifications</p>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #FBEDDD, transparent)" }} />
            <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #FBEDDD, transparent)" }} />

            {/* Scrolling track — items duplicated for seamless loop */}
            <div className="cert-track gap-4 py-2">
              {[...CERTS, ...CERTS].map(({ name, cat, imgSrc }, i) => (
                <div key={i}
                  className="min-w-[160px] flex-shrink-0 flex flex-col items-center gap-3 px-5 py-4 bg-white border border-ink/8 rounded-2xl transition-all duration-300 hover:border-brand-orange/30 hover:shadow-xl cursor-default">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl overflow-hidden p-2"
                    style={{ background: "#fff", boxShadow: "0 1px 8px rgba(58,31,14,0.09)" }}>
                    <img src={imgSrc} alt={name}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2"; }} />
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-[11px] font-semibold text-ink leading-snug">{name}</p>
                    <p className="font-mono text-[10px] text-muted mt-1">{cat}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}