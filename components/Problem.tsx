const pains = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
    ),
    title: "People are doing robot work.",
    titleColor: "text-brand-orange",
    body: "Your best people spend hours copying, updating, and chasing data instead of solving problems.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    ),
    title: "Nobody trusts the numbers.",
    titleColor: "text-brand-red",
    body: 'Data lives everywhere, so every report starts with, "Which version is correct?"',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
    ),
    title: "It never becomes a priority.",
    titleColor: "text-gold",
    body: "Everyone wants automation. Until today's urgent work pushes it back again.",
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
          {pains.map(({ icon, title, titleColor, body }) => (
            <div key={title}
              className="group bg-cream rounded-2xl p-6 border border-ink/8 transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(58,31,14,0.1)] hover:border-brand-orange/30">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className={`font-display text-[18px] font-semibold mb-2 ${titleColor}`}>{title}</h3>
              <p className="font-mono text-[13px] text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-red text-cream font-mono text-[13px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(212,0,0,0.28)]">
            Let&apos;s solve this together
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

      </div>
    </section>
  );
}
