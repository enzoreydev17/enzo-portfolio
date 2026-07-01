import FlowPipeline from "@/components/FlowPipeline";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 sm:px-10 lg:px-20 pt-28 pb-20 overflow-hidden">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(46rem 26rem at 60% 0%, rgba(253,255,0,0.06), transparent 60%)" }} />

      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">

        {/* Left: copy */}
        <div className="flex-1 min-w-0">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/8 border border-brand-red/15 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">
              Available for new projects
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[44px] sm:text-[56px] lg:text-[66px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
            Turning data into <em className="not-italic text-brand-red">decisions.</em>{" "}
            Busywork into <em className="not-italic text-brand-red">automation.</em>
          </h1>

          <p className="font-mono text-[14px] sm:text-[15px] text-muted leading-relaxed mt-7 max-w-lg">
            I build AI systems that eliminate repetitive work, connect scattered data,
            and give teams back hundreds of hours every month.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <a href="#work"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-red text-cream font-mono text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(212,0,0,0.28)]">
              See the work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-ink/20 bg-cream/60 text-ink font-mono text-[13px] font-semibold backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/50">
              Book a call
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-12 pt-10 border-t border-ink/10">
            {[
              { num: "68,000", label: "hours saved at Meta" },
              { num: "65%", label: "ops automated at Accenture" },
              { num: "5", label: "cloud certifications" },
              { num: "6+", label: "companies, 3 continents" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-display text-[26px] font-semibold text-ink tracking-tight">{num}</div>
                <div className="font-mono text-[11px] text-muted uppercase tracking-wider mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: pipeline widget — hidden on small screens */}
        <div className="hidden lg:block flex-1 min-w-0 max-w-[580px]">
          <FlowPipeline />
        </div>

      </div>
    </section>
  );
}
