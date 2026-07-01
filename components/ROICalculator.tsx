"use client";
import { useState, useCallback } from "react";

const presets = [
  { label: "Data entry & reporting",           automatable: 85 },
  { label: "Email & follow-up sequences",       automatable: 80 },
  { label: "Scheduling & calendar management",  automatable: 75 },
  { label: "Invoice & document processing",     automatable: 75 },
  { label: "Lead qualification & CRM updates",  automatable: 70 },
  { label: "Customer support & FAQ responses",  automatable: 65 },
  { label: "Social media & content scheduling", automatable: 70 },
];

function trackPct(val: number, min: number, max: number) {
  return ((val - min) / (max - min) * 100).toFixed(2) + "%";
}

function fmtHours(h: number) {
  if (h < 1) return `${Math.round(h * 60)}m`;
  if (Number.isInteger(h)) return `${h}h`;
  return `${h.toFixed(1)}h`;
}

function fmtMoney(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
}

export default function ROICalculator() {
  const [people, setPeople] = useState(5);
  const [hours,  setHours]  = useState(10);
  const [auto,   setAuto]   = useState(75);
  const [rate,   setRate]   = useState(40);

  const weeklyPerPerson  = hours * auto / 100;
  const weeklyTeam       = Math.round(weeklyPerPerson * people);
  const monthly          = Math.round(weeklyTeam * 52 / 12);
  const annual           = weeklyTeam * 52;
  const daysFreed        = Math.round(annual / 8);
  const fteRecovered     = (annual / 2080).toFixed(1);

  // Money outputs
  const monthlySpend     = Math.round(people * hours * (52 / 12) * rate);
  const annualSpend      = people * hours * 52 * rate;
  const annualSavings    = Math.round(annual * rate);
  const monthlySavings   = Math.round(monthly * rate);

  const onPreset = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setAuto(Number(e.target.selectedOptions[0].dataset.auto));
  }, []);

  const sliders = [
    {
      id: "people", label: "Team members doing this task", value: people,
      min: 1, max: 50, step: 1,
      display: `${people} ${people === 1 ? "person" : "people"}`,
      set: setPeople,
    },
    {
      id: "hours", label: "Manual hours per person / week", value: hours,
      min: 1, max: 40, step: 1,
      display: `${hours}h / week`,
      set: setHours,
    },
    {
      id: "rate", label: "Fully-loaded cost per person / hour", value: rate,
      min: 15, max: 150, step: 5,
      display: `$${rate} / hr`,
      set: setRate,
    },
    {
      id: "auto", label: "How automatable is this task?", value: auto,
      min: 30, max: 95, step: 5,
      display: `${auto}% automatable`,
      set: setAuto,
    },
  ];

  return (
    <section id="calculator" className="bg-white px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/8 border border-brand-red/15 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">What is manual work really costing you?</span>
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink">
            Time <em className="not-italic text-brand-red">saved</em> = money <em className="not-italic text-brand-red">earned.</em> See the numbers.
          </h2>
          <p className="font-mono text-[13px] text-muted mt-3 max-w-md mx-auto leading-relaxed">
            Adjust the sliders to your team. The numbers are conservative — real results are usually higher.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* Inputs */}
          <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-ink/8 space-y-8">
            {sliders.map(({ id, label, value, min, max, step, display, set }) => (
              <div key={id}>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</label>
                  <span className="font-display text-[16px] font-semibold text-gold">{display}</span>
                </div>
                <input id={id} type="range" min={min} max={max} step={step} value={value}
                  onChange={e => set(Number(e.target.value))}
                  style={{ "--p": trackPct(value, min, max) } as React.CSSProperties} />
              </div>
            ))}

            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest text-muted block mb-2">Task type preset</label>
              <div className="relative">
                <select onChange={onPreset}
                  className="w-full appearance-none bg-white border border-ink/10 rounded-xl px-4 py-3 font-mono text-[13px] text-ink cursor-pointer focus:outline-none focus:border-brand-orange">
                  {presets.map(p => (
                    <option key={p.label} data-auto={p.automatable}>{p.label}</option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="flex flex-col gap-4">

            {/* Hero stat — annual savings + current spend */}
            <div className="rounded-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #D40000 0%, #F58231 100%)" }}>
              {/* Savings row */}
              <div className="flex items-center gap-5 px-6 pt-6 pb-5">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(251,237,221,0.18)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div className="text-cream">
                  <div className="font-display text-[38px] font-semibold leading-none">{fmtMoney(annualSavings)}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest opacity-70 mt-1">Estimated annual savings</div>
                </div>
              </div>
              {/* Divider */}
              <div style={{ borderTop: "1px solid rgba(251,237,221,0.2)" }} />
              {/* Current spend row */}
              <div className="px-6 py-4">
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(251,237,221,0.6)" }}>
                  What you&apos;re currently spending on this task
                </p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="font-display text-[22px] font-semibold text-cream">{fmtMoney(monthlySpend)}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(251,237,221,0.55)" }}>per month</div>
                  </div>
                  <div style={{ width: 1, background: "rgba(251,237,221,0.2)" }} />
                  <div className="flex-1">
                    <div className="font-display text-[22px] font-semibold text-cream">{fmtMoney(annualSpend)}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(251,237,221,0.55)" }}>per year</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time + FTE breakdown */}
            <div className="bg-cream rounded-2xl p-4 border border-ink/8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">Time & money recovered</p>
              <dl className="space-y-0">
                {[
                  { label: "Hours saved / week",  value: fmtHours(weeklyTeam),        big: false },
                  { label: "Hours saved / month", value: `${monthly}h`,               big: false },
                  { label: "Saved / month",       value: fmtMoney(monthlySavings),    big: false },
                  { label: "Work days freed",     value: `${daysFreed} days`,         big: false },
                  { label: "FTE recovered",       value: `${fteRecovered} FTE`,       big: true  },
                ].map(({ label, value, big }) => (
                  <div key={label} className={`flex justify-between items-center py-2 ${big ? "border-t border-ink/10" : "border-b border-ink/8"}`}>
                    <dt className={`font-mono text-[11px] ${big ? "font-semibold text-ink" : "text-muted"}`}>{label}</dt>
                    <dd className={`font-display ${big ? "text-[20px] font-semibold text-gold" : "text-[13px] font-medium text-ink"}`}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="mt-5">
          <a href="#contact"
            className="w-full block text-center py-4 rounded-xl bg-ink text-cream font-mono text-[13px] font-semibold transition-all hover:-translate-y-0.5 hover:bg-brand-red hover:shadow-[0_6px_20px_rgba(212,0,0,0.25)]">
            Start getting that money back →
          </a>
          <p className="font-mono text-[11px] text-muted/70 text-center leading-relaxed mt-3">
            Illustrative estimates. Fully-loaded cost includes salary, benefits & overhead. FTE at 2,080 hrs/yr.
          </p>
        </div>
      </div>
    </section>
  );
}