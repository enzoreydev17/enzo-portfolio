"use client";
import { useState } from "react";

const faqs = [
  { q: "What tools do you work with?", a: "Python, n8n, UiPath, Databricks, Snowflake, AWS, HubSpot, and Soda — covering data engineering, predictive modeling, RPA, and AI automation end to end." },
  { q: "Do I need technical knowledge to work with you?", a: "Not at all. You describe the problem or the manual process you want to eliminate — I handle the architecture, the build, and the handoff. You just need to know your business." },
  { q: "How long does a typical project take?", a: "RPA and automation workflows typically run 1–2 weeks. Data pipelines and AI systems range from 3–8 weeks depending on complexity and the integrations required." },
  { q: "Who do you work with?", a: "Enterprise teams, scale-ups, and consulting firms that need reliable data infrastructure or automation built by someone with real production experience — not just a demo portfolio." },
  { q: "How does the engagement work?", a: "We start with a scoping call to map the problem. I then deliver a clear proposal with timeline and milestones. Development is transparent — no surprises, no scope creep without discussion." },
  { q: "How much does a project cost?", a: "Automation builds start around $1,500. Data engineering and AI systems are quoted after scoping. All pricing is fixed — no hourly billing, no hidden fees." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/8 border border-brand-red/15 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">Still wondering if automation is worth it?</span>
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink">
            Got questions? I&apos;ve got <em className="not-italic text-brand-red">answers</em>.
          </h2>
          <p className="font-mono text-[13px] text-muted mt-3 max-w-md mx-auto leading-relaxed">
            Everything you need to know before we start working together.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map(({ q, a }, i) => (
            <div key={i}
              className={`rounded-2xl border bg-white overflow-hidden transition-all duration-200 ${open === i ? "border-brand-orange/40 shadow-[0_4px_20px_rgba(58,31,14,0.08)]" : "border-ink/8 hover:border-ink/20"}`}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left"
              >
                <span className="font-display text-[17px] font-medium text-ink">{q}</span>
                <span className={`flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${open === i ? "bg-brand-red/10 text-brand-red rotate-180" : "bg-ink/5 text-muted"}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="font-mono text-[13px] text-muted leading-relaxed px-5 sm:px-6 pb-5">{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
