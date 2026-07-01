const pains = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    title: "Hours burned on reports",
    body: "Your analysts spend half their week copying data between tools instead of finding insights inside it. The work is manual. The cost is invisible.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>
    ),
    title: "No single source of truth",
    body: "Data lives across five platforms and nobody can see the full picture. Decisions get made on gut feel — and gut feel has a poor track record.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
    ),
    title: "You know automation could fix this",
    body: "The ROI is obvious. But nobody on the team has the time — or the right expertise — to build it properly. So it stays on the roadmap. Forever.",
  },
];

export default function Problem() {
  return (
    <section className="bg-white px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/8 border border-brand-red/15 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">The hidden cost of manual work</span>
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink">
            Your business is leaking hours every single day.
          </h2>
          <p className="font-mono text-[13px] text-muted mt-3 max-w-md mx-auto leading-relaxed">
            Not because your team isn&apos;t working hard — but because manual work quietly compounds over time.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {pains.map(({ icon, title, body }) => (
            <div key={title}
              className="group bg-cream rounded-2xl p-6 border border-ink/8 transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(58,31,14,0.1)] hover:border-brand-orange/30">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="font-display text-[18px] font-semibold text-ink mb-2">{title}</h3>
              <p className="font-mono text-[13px] text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <blockquote className="mt-12 pl-5 border-l-2 border-brand-red/40">
          <p className="font-display text-[19px] italic text-ink/80 leading-relaxed max-w-2xl">
            &ldquo;I&apos;ve seen this pattern at Meta, Accenture, S&P Global, and a dozen
            companies since. The tools change. The waste stays the same —
            until someone builds a system that eliminates it.&rdquo;
          </p>
          <footer className="font-mono text-[12px] text-muted mt-3">— Lorenzo, on every first client call</footer>
        </blockquote>
      </div>
    </section>
  );
}
