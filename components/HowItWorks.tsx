const steps = [
  {
    num: 1,
    emoji: "🔍",
    tag: "Discovery",
    title: "Map the waste",
    body: "We spend time together understanding where your team's hours actually go. Most clients are surprised — and a little uncomfortable — by what we find.",
  },
  {
    num: 2,
    emoji: "🗺️",
    tag: "Strategy",
    title: "Design the system",
    body: "I architect your custom automation blueprint — no templates, no cookie-cutter solutions. Built around how your business actually works.",
  },
  {
    num: 3,
    emoji: "⚙️",
    tag: "Engineering",
    title: "Build & test",
    body: "I engineer the pipeline, bot, or AI agent and test it against real data before it ever touches production. Every edge case handled.",
  },
  {
    num: 4,
    emoji: "🚀",
    tag: "Handoff",
    title: "Launch & train",
    body: "We deploy live and I walk your team through operating it. Full documentation. Zero dependency on me after handoff.",
  },
  {
    num: 5,
    emoji: "🛡️",
    tag: "Support",
    title: "You own it",
    body: "The system is yours completely. I'm available for iterations as your needs grow — but you're never locked into a retainer.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="w-5 h-px bg-brand-red flex-shrink-0" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">
              How it Works
            </span>
            <span className="w-5 h-px bg-brand-red flex-shrink-0" />
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink">
            Five clear steps from chaos to clarity.
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-[calc(10%+20px)] right-[calc(10%+20px)] h-px bg-gradient-to-r from-gold via-brand-orange to-brand-red opacity-25 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 sm:gap-4 relative z-10">
            {steps.map(({ num, emoji, tag, title, body }) => (
              <div key={num} className="flex flex-col items-center text-center">
                {/* Circle icon with number badge */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-full bg-cream border-2 border-ink/12 flex items-center justify-center text-2xl shadow-[0_2px_12px_rgba(58,31,14,0.08)]">
                    {emoji}
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