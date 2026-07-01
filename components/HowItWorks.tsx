const steps = [
  {
    num: 1,
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    iconColor: "text-gold",
    iconBg: "bg-gold/12 border-gold/25",
    tag: "Discovery",
    title: "Map the waste",
    body: "We spend time together understanding where your team's hours actually go. Most clients are surprised — and a little uncomfortable — by what we find.",
  },
  {
    num: 2,
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
    iconColor: "text-brand-orange",
    iconBg: "bg-brand-orange/10 border-brand-orange/20",
    tag: "Strategy",
    title: "Design the system",
    body: "I architect your custom automation blueprint — no templates, no cookie-cutter solutions. Built around how your business actually works.",
  },
  {
    num: 3,
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    iconColor: "text-muted",
    iconBg: "bg-ink/6 border-ink/12",
    tag: "Engineering",
    title: "Build & test",
    body: "I engineer the pipeline, bot, or AI agent and test it against real data before it ever touches production. Every edge case handled.",
  },
  {
    num: 4,
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
    iconColor: "text-brand-red",
    iconBg: "bg-brand-red/10 border-brand-red/20",
    tag: "Handoff",
    title: "Launch & train",
    body: "We deploy live and I walk your team through operating it. Full documentation. Zero dependency on me after handoff.",
  },
  {
    num: 5,
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    iconColor: "text-brand-orange",
    iconBg: "bg-brand-orange/10 border-brand-orange/20",
    tag: "Support",
    title: "You own it",
    body: "The system is yours completely. I'm available for iterations as your needs grow — but you're never locked into a retainer.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/8 border border-brand-red/15 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3 9 4-18 3 9h4"/></svg>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">How It Works</span>
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink">
            How we turn scattered workflows into automated systems.
          </h2>
          <p className="font-mono text-[13px] text-muted mt-3 max-w-lg mx-auto leading-relaxed">
            No black box. Just a proven process with clear deliverables, clear timelines, and automation your team can actually use.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-[calc(10%+20px)] right-[calc(10%+20px)] h-px bg-gradient-to-r from-gold via-brand-orange to-brand-red opacity-25 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 sm:gap-4 relative z-10">
            {steps.map(({ num, icon, iconColor, iconBg, tag, title, body }) => (
              <div key={num} className="flex flex-col items-center text-center">
                {/* Circle icon with number badge */}
                <div className="relative mb-5">
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-[0_2px_12px_rgba(58,31,14,0.08)] ${iconBg} ${iconColor}`}>
                    {icon}
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-red text-cream text-[9px] font-bold font-mono flex items-center justify-center">
                    {num}
                  </span>
                </div>

                <span className="font-mono text-[9px] uppercase tracking-widest text-muted border border-ink/12 rounded-full px-2.5 py-0.5 mb-3">
                  {tag}
                </span>
                <h3 className="font-display text-[16px] font-semibold text-ink mb-2">{title}</h3>
                <p className="font-mono text-[12px] text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="font-display text-[17px] text-ink/60 italic mb-6">
            Most projects go from first call to deployed system in under four weeks.
          </p>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-red text-cream font-mono text-[13px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(212,0,0,0.28)]">
            Start with a free discovery call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

      </div>
    </section>
  );
}