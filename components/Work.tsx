"use client";
import { useState } from "react";

const CATS = [
  { id: "all",       label: "All Projects", count: 4 },
  { id: "rpa",       label: "RPA & Bots",   count: 1 },
  { id: "ai",        label: "AI Agents",    count: 1 },
  { id: "data",      label: "Data Eng.",    count: 1 },
  { id: "analytics", label: "Analytics",    count: 1 },
];

const PROJECTS = [
  {
    id: 0, cat: "rpa",
    title: "The bot that gave a team their year back",
    company: "Meta Platforms", metric: "68,000 hrs / yr", tool: "UiPath",
    rgb: "245,130,49",
    headerBg: "linear-gradient(160deg, #1C0F07, rgba(245,130,49,0.22))",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
    problem: "Manual processes across Meta's internal systems consumed thousands of hours annually — every step a potential human error.",
    built: "Led a cross-functional team to deliver a UiPath bot deeply integrated with Meta's internal tooling. Trained end-users to own and operate it independently. Zero ongoing engineering dependency.",
    tools: ["UiPath", "Python", "Meta Internal APIs", "Excel Automation"],
  },
  {
    id: 1, cat: "ai",
    title: "An AI agent that runs the ops floor",
    company: "Accenture", metric: "65% ops automated", tool: "n8n",
    rgb: "212,0,0",
    headerBg: "linear-gradient(160deg, #1C0707, rgba(212,0,0,0.22))",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l3 3"/><circle cx="19" cy="5" r="3"/></svg>,
    problem: "Customer-facing teams manually classified and resolved common order issues — repetitive work that killed morale and slowed response times.",
    built: "An n8n-based operational agent that classifies and resolves issues autonomously, plus a RAG chatbot booking sales meetings directly from Facebook leads.",
    tools: ["n8n", "OpenAI", "Facebook Lead Ads", "HubSpot", "CRM API"],
  },
  {
    id: 2, cat: "data",
    title: "One view of the customer, finally",
    company: "Thakral One", metric: "4 domains unified", tool: "Databricks",
    rgb: "247,178,59",
    headerBg: "linear-gradient(160deg, #1C1507, rgba(247,178,59,0.18))",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>,
    problem: "Customer data was scattered across Cards, Deposits, Customer, and Digital domains — no unified structure, making cross-domain analysis nearly impossible.",
    built: "A Single Customer View mapping system with automated data quality checks via Soda, ensuring accuracy and campaign-readiness across all four data domains.",
    tools: ["Databricks", "Snowflake", "dbt", "Soda", "Python"],
  },
  {
    id: 3, cat: "analytics",
    title: "Turning feedback chaos into a resolution system",
    company: "S&P Global Platts", metric: "1,000+ resolved", tool: "Python / NLP",
    rgb: "138,107,79",
    headerBg: "linear-gradient(160deg, #1C1510, rgba(138,107,79,0.22))",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    problem: "Customer feedback themes were impossible to categorize at scale — slowing resolution and hiding the root causes of recurring issues.",
    built: "A Net Promoter Score case management system with fuzzy matching and topic modeling to surface and categorize key feedback themes in real time.",
    tools: ["Python", "NLP", "Fuzzy Matching", "Topic Modeling", "SQL"],
  },
];

export default function Work() {
  const [activeCat, setActiveCat] = useState("all");
  const [activeProjId, setActiveProjId] = useState(0);
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  const filtered = activeCat === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === activeCat);
  const proj = PROJECTS.find(p => p.id === activeProjId) ?? PROJECTS[0];

  function handleCat(id: string) {
    setActiveCat(id);
    const first = id === "all" ? PROJECTS[0] : PROJECTS.find(p => p.cat === id);
    if (first) setActiveProjId(first.id);
    setMobileView("list");
  }

  function handleProj(id: number) {
    setActiveProjId(id);
    setMobileView("detail");
  }

  return (
    <section id="work" className="bg-white px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/8 border border-brand-red/15 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">Delivered Projects</span>
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink">
            Real projects. Real results.
          </h2>
          <p className="font-mono text-[13px] text-muted mt-3 max-w-md mx-auto leading-relaxed">
            Every number below represents time someone got back, or a decision someone could finally make.
          </p>
        </div>

        {/* App window */}
        <div className="rounded-2xl border border-ink/12 overflow-hidden shadow-[0_8px_40px_rgba(58,31,14,0.12)]">

          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-ink/10" style={{ background: "#F5E2C8" }}>
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] flex-shrink-0" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] flex-shrink-0" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] flex-shrink-0" />
            <span className="font-mono text-[11px] font-semibold text-muted ml-3 tracking-wide">Automation Systems Portfolio</span>
            <div className="ml-auto">
              <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-red/8 border border-brand-red/20 text-brand-red">
                4 projects
              </span>
            </div>
          </div>

          {/* Mobile: category tab strip */}
          <div className="flex md:hidden px-3 py-2 gap-2 overflow-x-auto border-b border-ink/10 bg-white">
            {CATS.map(c => (
              <button key={c.id} type="button" onClick={() => handleCat(c.id)}
                className="px-3 py-1.5 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap flex-shrink-0 transition-colors"
                style={{ background: activeCat === c.id ? "#F58231" : "#F5E2C8", color: activeCat === c.id ? "#fff" : "#8A6B4F" }}>
                {c.label}
              </button>
            ))}
          </div>

          {/* 3-column body */}
          <div className="flex" style={{ height: "clamp(440px, 52vh, 520px)", overflow: "hidden" }}>

            {/* LEFT: category sidebar (desktop only) */}
            <div className="hidden md:flex w-44 flex-shrink-0 border-r border-ink/10 flex-col p-2 gap-0.5" style={{ background: "rgba(245,226,200,0.4)" }}>
              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted px-3 py-2">Category</p>
              {CATS.map(c => {
                const active = activeCat === c.id;
                return (
                  <button key={c.id} type="button" onClick={() => handleCat(c.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left font-mono text-[12px] transition-all"
                    style={{
                      borderLeft: `2px solid ${active ? "#F58231" : "transparent"}`,
                      background: active ? "rgba(245,130,49,0.08)" : "transparent",
                      color: active ? "#F58231" : "#8A6B4F",
                      fontWeight: active ? 600 : 500,
                    }}>
                    <span>{c.label}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: active ? "rgba(245,130,49,0.15)" : "rgba(58,31,14,0.08)", color: active ? "#F58231" : "#8A6B4F" }}>
                      {c.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* MIDDLE: project list */}
            <div className={`${mobileView === "detail" ? "hidden" : "flex"} md:flex flex-col w-full md:w-56 flex-shrink-0 border-r border-ink/10 overflow-y-auto`}>
              <div className="px-3 py-2 border-b border-ink/10 bg-white sticky top-0">
                <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted">Systems</p>
              </div>
              {filtered.map(p => {
                const active = activeProjId === p.id;
                const accent = `rgb(${p.rgb})`;
                return (
                  <button key={p.id} type="button" onClick={() => handleProj(p.id)}
                    className="w-full flex items-start gap-2.5 p-3 text-left border-b border-ink/8 transition-colors hover:bg-cream/60"
                    style={{
                      borderLeft: `2px solid ${active ? accent : "transparent"}`,
                      background: active ? `rgba(${p.rgb}, 0.05)` : "transparent",
                    }}>
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: `rgba(${p.rgb}, 0.1)`, border: `1px solid rgba(${p.rgb}, 0.22)`, color: accent }}>
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] font-semibold leading-snug mb-1 line-clamp-2" style={{ color: active ? "#3A1F0E" : "#8A6B4F" }}>
                        {p.title}
                      </p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-[10px] font-bold" style={{ color: accent }}>{p.metric}</span>
                        <span className="w-1 h-1 rounded-full bg-ink/15 flex-shrink-0" />
                        <span className="font-mono text-[9px] text-muted">{p.tool}</span>
                      </div>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: active ? accent : "#8A6B4F", opacity: active ? 1 : 0.35 }} />
                  </button>
                );
              })}
            </div>

            {/* RIGHT: project detail */}
            <div className={`${mobileView === "list" ? "hidden" : "flex flex-col"} md:flex md:flex-col flex-1 min-w-0 overflow-y-auto`}>
              {/* Mobile back button */}
              <button type="button" onClick={() => setMobileView("list")}
                className="flex md:hidden items-center gap-2 px-4 py-3 border-b border-ink/10 font-mono text-[12px] text-muted bg-cream/50">
                ← All projects
              </button>

              {/* Gradient header */}
              <div className="relative flex-shrink-0" style={{ height: 120, background: proj.headerBg }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "22px 22px" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 36, background: "linear-gradient(to bottom, transparent, white)" }} />
                <div className="absolute top-3 left-4 flex gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{ background: "rgba(0,0,0,0.5)", border: `1px solid rgba(${proj.rgb},0.35)`, color: `rgb(${proj.rgb})`, backdropFilter: "blur(8px)" }}>
                    {proj.tool}
                  </span>
                  <span className="font-mono text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#F7B23B", backdropFilter: "blur(8px)" }}>
                    ● Delivered
                  </span>
                </div>
              </div>

              {/* Detail content */}
              <div className="px-5 pb-6 flex-1">
                <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                  <h3 className="font-display text-[17px] font-bold text-ink leading-snug">{proj.title}</h3>
                  <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-lg flex-shrink-0"
                    style={{ background: `rgba(${proj.rgb}, 0.07)`, border: `1px solid rgba(${proj.rgb}, 0.22)`, color: `rgb(${proj.rgb})` }}>
                    {proj.metric}
                  </span>
                </div>

                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted mb-1">The Problem</p>
                <p className="font-display text-[13px] text-ink/80 leading-relaxed mb-4">{proj.problem}</p>

                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted mb-1">What I Built</p>
                <p className="font-display text-[13px] text-ink/80 leading-relaxed mb-4">{proj.built}</p>

                <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted mb-2">Tools Used</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.tools.map(t => (
                    <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-full text-muted"
                      style={{ background: `rgba(${proj.rgb}, 0.04)`, border: `1px solid rgba(${proj.rgb}, 0.18)` }}>
                      {t}
                    </span>
                  ))}
                </div>

                <a href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[12px] font-bold text-cream transition-all hover:opacity-90"
                  style={{ background: `rgb(${proj.rgb})`, boxShadow: `0 4px 20px rgba(${proj.rgb}, 0.28)` }}>
                  Discuss this project
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}