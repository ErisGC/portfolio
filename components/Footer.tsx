import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16 py-8 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[var(--color-fg-muted)] font-mono">
            <span className="text-[var(--color-accent)]">$</span> echo
            &quot;Construido con Next.js + Tailwind + ❤️ en Valledupar&quot;
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/ErisGC"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-elevated)] rounded transition-all"
              aria-label="GitHub"
            >
              <Github size={16} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ruben-guti%C3%A9rrez-4542a1412"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-elevated)] rounded transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </Link>
            <Link
              href="mailto:bennielrrezno@gmail.com"
              className="p-2 text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-elevated)] rounded transition-all"
              aria-label="Email"
            >
              <Mail size={16} />
            </Link>
          </div>

          <div className="text-xs text-[var(--color-fg-dim)] font-mono">
            © 2026 · v1.0.0
          </div>
        </div>
      </div>
    </footer>
  );
}
