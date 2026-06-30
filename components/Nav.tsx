export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-20 py-4"
      style={{ background: "rgba(251,237,221,0.82)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(58,31,14,0.08)" }}>
      <a href="#" className="font-mono text-[13px] font-semibold tracking-widest text-ink uppercase">
        L. Reybuenan
      </a>
      <div className="flex items-center gap-1 font-mono text-[12px]">
        {[["#work", "work"], ["#about", "about"], ["#calculator", "calculator"], ["#contact", "contact"]].map(([href, label]) => (
          <a key={href} href={href}
            className="px-3 py-1.5 rounded-full text-muted transition-all duration-200 hover:bg-brand-red/8 hover:text-brand-red">
            {label}
          </a>
        ))}
        <a href="#contact"
          className="ml-3 px-4 py-1.5 rounded-full bg-ink text-cream text-[12px] font-mono font-semibold transition-all duration-200 hover:bg-brand-red hover:shadow-lg">
          Let&apos;s talk
        </a>
      </div>
    </nav>
  );
}
