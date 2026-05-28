import Link from "next/link";
import { HomeAnimation } from "@/components/HomeAnimation";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <HomeAnimation />

      {/* Quick stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
        {[
          { label: "Proyectos", value: "4", color: "accent" },
          { label: "Lenguajes", value: "5+", color: "cyan" },
          { label: "Stacks", value: "10+", color: "violet" },
          { label: "Cafés/dia", value: "∞", color: "yellow" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-border-strong)] transition-colors"
          >
            <div
              className={`text-2xl md:text-3xl font-bold font-mono text-[var(--color-${s.color})]`}
            >
              {s.value}
            </div>
            <div className="text-xs text-[var(--color-fg-muted)] mt-1 font-mono">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* Quick links */}
      <section className="mt-10 text-sm text-[var(--color-fg-muted)] font-mono">
        <div className="text-[var(--color-fg-dim)] mb-2"># Tip</div>
        <p>
          Usa el navbar de arriba para navegar entre vistas, o{" "}
          <Link href="/about" className="term-link">
            empieza con whoami →
          </Link>
        </p>
      </section>
    </div>
  );
}
