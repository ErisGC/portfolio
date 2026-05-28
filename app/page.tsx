"use client";

import Link from "next/link";
import { useState } from "react";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Prompt } from "@/components/Prompt";
import { TypingText } from "@/components/TypingText";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";

export default function HomePage() {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <TerminalWindow title="ruben@portfolio: ~ — zsh — 100x30">
        <div className="space-y-4 min-h-[420px]">
          {/* Boot */}
          <Prompt
            command="./welcome.sh"
            output={
              <TypingText
                text="Iniciando sesión... autenticación completa. Bienvenido."
                speed={25}
                onDone={() => setStep(1)}
              />
            }
          />

          {step >= 1 && (
            <Prompt
              command="whoami"
              output={
                <TypingText
                  text="Rubén Gutiérrez — Full-stack engineer"
                  speed={20}
                  onDone={() => setStep(2)}
                />
              }
            />
          )}

          {step >= 2 && (
            <Prompt
              command="cat /etc/profile"
              output={
                <div className="space-y-3 mt-2">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-fg)] mb-2 leading-tight">
                      Hola, soy{" "}
                      <span className="text-[var(--color-accent)] text-glow">
                        Rubén
                      </span>
                      <span className="cursor" />
                    </h1>
                    <p className="text-base md:text-lg text-[var(--color-fg-muted)] max-w-2xl leading-relaxed">
                      Construyo plataformas web y móviles con foco en{" "}
                      <span className="text-[var(--color-cyan)]">
                        arquitectura clara
                      </span>
                      ,{" "}
                      <span className="text-[var(--color-violet)]">
                        seguridad
                      </span>{" "}
                      y experiencia de usuario.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2 text-sm">
                    <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
                      <MapPin size={14} className="text-[var(--color-accent)]" />
                      Valledupar, Colombia
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
                      <Briefcase
                        size={14}
                        className="text-[var(--color-accent)]"
                      />
                      Disponible para proyectos
                    </div>
                  </div>
                </div>
              }
            />
          )}

          {step >= 2 && (
            <Prompt
              command="ls -F ~/skills/"
              output={
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 mt-2 text-sm">
                  <span className="text-[var(--color-accent)]">backend/</span>
                  <span className="text-[var(--color-cyan)]">frontend/</span>
                  <span className="text-[var(--color-violet)]">mobile/</span>
                  <span className="text-[var(--color-yellow)]">devops/</span>
                </div>
              }
            />
          )}

          {step >= 2 && (
            <div className="pt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/projects"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-mono text-sm font-bold rounded hover:opacity-90 hover:gap-3 transition-all"
              >
                $ ./ver-proyectos
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-bg-overlay)] border border-[var(--color-border-strong)] text-[var(--color-fg)] font-mono text-sm rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
              >
                $ ./contactar
              </Link>
            </div>
          )}
        </div>
      </TerminalWindow>

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
