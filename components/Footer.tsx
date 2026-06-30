export default function Footer() {
  return (
    <footer className="px-6 sm:px-10 lg:px-20 py-8 border-t border-ink/8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-mono text-[12px] text-muted">© 2026 Lorenzo Zuriel Reybuenan</span>
      <div className="flex items-center gap-6 font-mono text-[12px] text-muted">
        <a href="https://linkedin.com/in/lorenzozuriel-reybuenan" target="_blank" rel="noopener"
          className="hover:text-brand-red transition-colors">LinkedIn</a>
        <a href="#work" className="hover:text-brand-red transition-colors">Work</a>
        <a href="#contact" className="hover:text-brand-red transition-colors">Contact</a>
      </div>
    </footer>
  );
}
