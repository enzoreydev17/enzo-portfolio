const cases = [
  {
    tag: "RPA · Meta Platforms",
    result: "68,000 hrs saved / year",
    title: "The bot that gave a team their year back",
    problem: "Manual processes across Meta's internal systems were consuming thousands of hours annually — with every step carrying the risk of human error.",
    built: "Led a cross-functional team to deliver a UiPath bot deeply integrated with Meta's internal systems. Trained end-users to operate and maintain it independently.",
    color: "border-brand-orange",
  },
  {
    tag: "n8n · Accenture",
    result: "65% of ops tasks automated",
    title: "An AI agent that runs the ops floor",
    problem: "Customer-facing teams were manually classifying and resolving common order issues — repetitive work that killed morale and slowed response times.",
    built: "An n8n-based operational agent that classifies and resolves issues autonomously, plus a RAG chatbot that books sales meetings directly from Facebook leads.",
    color: "border-gold",
  },
  {
    tag: "Data Engineering · Thakral One",
    result: "4 data domains unified",
    title: "One view of the customer, finally",
    problem: "Customer data was scattered across Cards, Deposits, Customer, and Digital domains with no unified structure — making any cross-domain analysis nearly impossible.",
    built: "A Single Customer View mapping system with automated data quality checks via Soda, ensuring accuracy and campaign-readiness across all touchpoints.",
    color: "border-brand-orange",
  },
  {
    tag: "Analytics · S&P Global Platts",
    result: "1,000+ concerns resolved in real time",
    title: "Turning feedback chaos into a resolution system",
    problem: "Customer feedback themes were impossible to categorize at scale, slowing resolution and hiding the root causes of recurring issues.",
    built: "A Net Promoter Score case management system with fuzzy matching and topic modeling to surface and categorize key feedback themes — in real time.",
    color: "border-gold",
  },
];

export default function Work() {
  return (
    <section id="work" className="bg-white px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/8 border border-brand-red/15 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">// 03_case_studies</span>
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink">
            Real projects. Real results.
          </h2>
          <p className="font-mono text-[13px] text-muted mt-3 max-w-md mx-auto leading-relaxed">
            Every number below represents time someone got back, or a decision someone could finally make.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {cases.map(({ tag, result, title, problem, built, color }) => (
            <div key={title}
              className={`group bg-cream rounded-2xl p-7 border border-t-[3px] ${color} border-x-ink/8 border-b-ink/8 transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_10px_36px_rgba(58,31,14,0.1)]`}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-orange bg-brand-orange/8 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
                <span className="font-mono text-[11px] font-bold text-brand-red whitespace-nowrap">{result}</span>
              </div>
              <h3 className="font-display text-[21px] font-semibold text-ink leading-snug mb-4">{title}</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">The problem</span>
                  <p className="font-display text-[15px] text-ink/80 leading-relaxed">{problem}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">What I built</span>
                  <p className="font-display text-[15px] text-ink/80 leading-relaxed">{built}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
