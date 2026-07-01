"use client";
import { useState } from "react";

const WEBHOOK_URL = "https://REPLACE-WITH-YOUR-N8N-WEBHOOK-URL";

const EMAIL = "lzreybuenan@gmail.com";
const LINKEDIN_URL = "https://linkedin.com/in/lorenzo-zuriel-reybuenan";

export default function Contact() {
  const [tab, setTab] = useState<"message" | "schedule">("message");
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (WEBHOOK_URL.includes("REPLACE-WITH")) {
      setStatus({ text: "Form not connected yet — add your n8n webhook URL.", ok: false });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: (form.elements.namedItem("name") as HTMLInputElement).value,
          email: (form.elements.namedItem("email") as HTMLInputElement).value,
          message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
        }),
      });
      if (res.ok) { setStatus({ text: "Message sent. I'll get back to you soon.", ok: true }); form.reset(); }
      else throw new Error();
    } catch { setStatus({ text: "Something went wrong. Try LinkedIn instead.", ok: false }); }
    finally { setLoading(false); }
  }

  return (
    <section id="contact" className="bg-white px-6 sm:px-10 lg:px-20 py-24 border-t border-ink/8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/8 border border-brand-red/15 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M13 2a9 9 0 0 1 9 9"/><path d="M13 6a5 5 0 0 1 5 5"/><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red">Let's make work easier</span>
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-[1.15] text-ink">
            Let&apos;s build something smart.
          </h2>
          <p className="font-mono text-[13px] text-muted mt-3 max-w-md mx-auto leading-relaxed">
            Ready to get started? Contact me directly or book a consultation below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-7 items-start">
          {/* Channels */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {/* Email — click to copy */}
            <button type="button" onClick={copyEmail}
              className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-cream border border-ink/8 transition-all hover:border-brand-red/30 hover:shadow-[0_4px_16px_rgba(58,31,14,0.08)] text-left w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "#EFF6FF", color: "#2563EB" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[13px] font-semibold text-ink block truncate">{EMAIL}</span>
                  <span className="font-mono text-[10px] text-muted">{copied ? "✓ Copied!" : "Click to copy"}</span>
                </div>
              </div>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${copied ? "bg-brand-orange text-cream" : "bg-ink/5 text-muted group-hover:bg-brand-red group-hover:text-cream"}`}>
                {copied
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>}
              </div>
            </button>

            {/* LinkedIn */}
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"
              className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-cream border border-ink/8 transition-all hover:border-brand-red/30 hover:shadow-[0_4px_16px_rgba(58,31,14,0.08)]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "#ECFEFF", color: "#F58231" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[13px] font-semibold text-ink block">LinkedIn</span>
                  <span className="font-mono text-[10px] text-muted truncate block">linkedin.com/in/lorenzo-zuriel-reybuenan</span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-lg bg-ink/5 flex items-center justify-center flex-shrink-0 text-muted transition-all group-hover:bg-brand-red group-hover:text-cream">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </a>

            <div className="mt-2 p-5 rounded-2xl border border-ink/8 bg-cream">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-2">Typical response time</p>
              <p className="font-display text-[17px] text-ink">Within 24 hours on business days.</p>
            </div>
          </div>

          {/* Panel */}
          <div className="lg:col-span-7 rounded-3xl border border-ink/8 overflow-hidden shadow-[0_4px_24px_rgba(58,31,14,0.07)]" style={{ background: "white" }}>
            {/* Tabs */}
            <div className="grid grid-cols-2 border-b border-ink/8" style={{ background: "#FBEDDD" }}>
              {(["message", "schedule"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setTab(t)}
                  className={`py-4 font-mono text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-t-2 ${tab === t ? "bg-white border-brand-red text-ink" : "border-transparent text-muted hover:text-ink"}`}>
                  {t === "message"
                    ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/></svg> Leave a message</>
                    : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> Schedule a call</>}
                </button>
              ))}
            </div>

            {tab === "message" ? (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[{ id: "name", label: "Your Name", type: "text", placeholder: "Lorenzo Reybuenan" },
                    { id: "email", label: "Email Address", type: "email", placeholder: "email@example.com" }].map(({ id, label, type, placeholder }) => (
                    <div key={id} className="flex flex-col gap-1.5">
                      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-widest text-muted">
                        {label} <span className="text-brand-red">*</span>
                      </label>
                      <input id={id} name={id} type={type} required placeholder={placeholder}
                        className="px-4 py-3 rounded-xl border border-ink/10 bg-cream text-ink font-mono text-[13px] outline-none focus:border-brand-orange transition-colors placeholder:text-muted/50" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    Message <span className="text-brand-red">*</span>
                  </label>
                  <textarea id="message" name="message" required rows={5} placeholder="Hey Lorenzo, I'd love to discuss automating our reporting workflow..."
                    className="px-4 py-3 rounded-xl border border-ink/10 bg-cream text-ink font-mono text-[13px] outline-none focus:border-brand-orange transition-colors resize-none placeholder:text-muted/50" />
                </div>
                <button type="submit" disabled={loading}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-red text-cream font-mono text-[13px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,0,0,0.28)] disabled:opacity-60">
                  {loading ? "Sending..." : "Send message"}
                  {!loading && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>}
                </button>
                {status && (
                  <p className={`font-mono text-[12px] text-center ${status.ok ? "text-brand-orange" : "text-brand-red"}`}>{status.text}</p>
                )}
              </form>
            ) : (
              <iframe
                src="https://calendly.com/enzolabsai?hide_gdpr_banner=1&primary_color=d40000"
                title="Book a call with Lorenzo"
                style={{ width: "100%", height: "660px", border: 0 }}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
