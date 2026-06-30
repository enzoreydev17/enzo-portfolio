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

export default function ROICalculator() {
  const [people, setPeople]   = useState(5);
  const [hours, setHours]     = useState(10);
  const [auto, setAuto]       = useState(75);

  const weeklyPerPerson = hours * auto / 100;
  const weeklyTeam      = Math.round(weeklyPerPerson * people);
  const monthly         = Math.round(weeklyTeam * 52 / 12);
  const annual          = weeklyTeam * 52;
  const daysFreed       = Math.round(annual / 8);
  const fteRecovered    = (annual / 2080).toFixed(1);

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
      display: `${hours}h`,
      set: setHours,
    },
    {
      id: "auto", label: "How automatable is this task?", value: auto,
      min: 30, max: 95, step: 5,
      display: `${auto}%`,
      set: setAuto,
    },
  ];

  return (
    <section id="calculator" className="bg-white px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">// 05_time_savings</span>
        <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink mt-4">
          See how much time you&apos;re <em className="not-italic text-brand-orange">leaving on the table.</em>
        </h2>
        <p className="font-mono text-[13px] text-muted mt-3 max-w-md leading-relaxed">
          Adjust the sliders to your team. The numbers are conservative — real results are usually higher.
        </p>

        <div className="grid lg:grid-cols-2 gap-6 mt-12 items-start">
          {/* Inputs */}
          <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-ink/8 space-y-8">
            {sliders.map(({ id, label, value, min, max, step, display, set }) => (
              <div key={id}>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</label>
                  <span className="font-display text-[20px] font-semibold text-gold">{display}</span>
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
            {/* Hero stat */}
            <div className="rounded-2xl p-6 text-cream flex items-center gap-5"
              style={{ background: "linear-gradient(135deg, #D40000 0%, #F58231 100%)" }}>
              <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(251,237,221,0.18)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
              </div>
              <div>
                <div className="font-display text-[52px] font-semibold leading-none">{fmtHours(weeklyTeam)}</div>
                <div className="font-mono text-[11px] uppercase tracking-widest opacity-70 mt-1">Team hours saved / week</div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-cream rounded-2xl p-6 border border-ink/8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Time recovered</p>
              <dl className="space-y-0">
                {[
                  { label: "Per month",       value: `${monthly}h`,        big: false },
                  { label: "Per year",        value: `${annual}h`,         big: false },
                  { label: "Work days freed", value: `${daysFreed} days`,  big: false },
                  { label: "FTE recovered",   value: `${fteRecovered} FTE`, big: true  },
                ].map(({ label, value, big }) => (
                  <div key={label} className={`flex justify-between items-center py-3.5 ${big ? "border-t border-ink/10" : "border-b border-ink/8"}`}>
                    <dt className={`font-mono text-[13px] ${big ? "font-semibold text-ink" : "text-muted"}`}>{label}</dt>
                    <dd className={`font-display ${big ? "text-[34px] font-semibold text-gold" : "text-[19px] font-medium text-ink"}`}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <a href="#contact"
              className="w-full text-center py-4 rounded-xl bg-ink text-cream font-mono text-[13px] font-semibold transition-all hover:-translate-y-0.5 hover:bg-brand-red hover:shadow-[0_6px_20px_rgba(212,0,0,0.25)]">
              Start getting that time back →
            </a>

            <p className="font-mono text-[11px] text-muted/70 text-center leading-relaxed px-2">
              Illustrative estimates. FTE calculated at 2,080 hrs/year. Actual results vary by task complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}