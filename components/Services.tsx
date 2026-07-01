"use client";

const SERVICES = [
  {
    title: "Workflow Automation & RPA",
    description:
      "Bots and scripts that eliminate manual, repetitive processes — data entry, reporting, reconciliation. Your team stops being the middleware.",
    tools: ["UiPath", "Python", "Power Automate", "Excel"],
    rgb: "245,130,49",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/>
        <path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
      </svg>
    ),
    example: null,
  },
  {
    title: "AI Agents & LLM Systems",
    description:
      "RAG pipelines, chatbots, and agentic workflows built on your own data — not generic AI, but systems trained on your context and wired to your tools.",
    tools: ["OpenAI", "n8n", "LangChain", "Pinecone"],
    rgb: "212,0,0",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 1 8 8v1a8 8 0 0 1-8 8H8l-4 4V10a8 8 0 0 1 8-8z"/>
        <path d="M8 10h.01M12 10h.01M16 10h.01"/>
      </svg>
    ),
    example: null,
  },
  {
    title: "Data Pipeline & Analytics Engineering",
    description:
      "Unifying scattered data across platforms into a single reliable source of truth — so every report starts from the same place and every decision is grounded.",
    tools: ["Databricks", "Snowflake", "dbt", "Soda"],
    rgb: "247,178,59",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
    example: null,
  },
  {
    title: "System Integration & Migration",
    description:
      "Connecting CRMs, databases, and internal tools so information flows where it needs to go — without manual exports, copy-paste, or lost records.",
    tools: ["GoHighLevel", "HubSpot", "REST APIs", "Webhooks"],
    rgb: "138,107,79",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    example: {
      label: "Sample project",
      text: "Facebook Lead Ads → GoHighLevel CRM → automated follow-up sequences. Removed 3 manual handoffs; lead response time dropped from 4 hours to under 4 minutes.",
    },
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/8 border border-brand-red/15 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">// 04_services</span>
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink">
            What I build for you.
          </h2>
          <p className="font-mono text-[13px] text-muted mt-3 max-w-md mx-auto leading-relaxed">
            Four concrete offerings. Each one designed to eliminate a specific category of wasted time.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {SERVICES.map(({ title, description, tools, rgb, icon, example }) => {
            const accent = `rgb(${rgb})`;
            return (
              <div key={title}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-ink/8 bg-cream transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(58,31,14,0.10)]"
                style={{ "--hover-border": `rgba(${rgb},0.35)` } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `rgba(${rgb},0.35)`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "")}>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${rgb},0.10)`, color: accent }}>
                  {icon}
                </div>

                {/* Title + description */}
                <div className="flex-1">
                  <h3 className="font-display text-[19px] font-semibold text-ink mb-2">{title}</h3>
                  <p className="font-mono text-[13px] text-muted leading-relaxed">{description}</p>
                </div>

                {/* Sample project note */}
                {example && (
                  <div className="rounded-xl p-3.5 border"
                    style={{ background: `rgba(${rgb},0.05)`, borderColor: `rgba(${rgb},0.18)` }}>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>
                      {example.label}
                    </p>
                    <p className="font-mono text-[12px] text-muted leading-relaxed">{example.text}</p>
                  </div>
                )}

                {/* Tool pills */}
                <div className="flex flex-wrap gap-1.5">
                  {tools.map(t => (
                    <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-full border text-muted"
                      style={{ background: `rgba(${rgb},0.04)`, borderColor: `rgba(${rgb},0.18)` }}>
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-ink text-cream font-mono text-[13px] font-semibold transition-all hover:-translate-y-0.5 hover:bg-brand-red hover:shadow-[0_8px_28px_rgba(212,0,0,0.25)]">
            Not sure which fits? Let&apos;s talk.
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

      </div>
    </section>
  );
}