import type { Metadata } from "next";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Prompt } from "@/components/Prompt";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Rubén Gutiérrez",
  description: "Sobre Rubén Gutiérrez: background, intereses y filosofía.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
      <TerminalWindow title="ruben@portfolio: ~/about — cat about.md">
        <div className="space-y-5">
          <Prompt
            command="cat about.md"
            cwd="~/about"
            output={
              <div className="prose prose-invert max-w-none space-y-4 text-[var(--color-fg)] leading-relaxed">
                <p>
                  Soy <strong className="text-[var(--color-accent)]">Rubén Gutiérrez</strong>,
                  ingeniero de software full-stack basado en Valledupar, Cesar
                  (Colombia). Trabajo en plataformas que mezclan backend
                  robusto, frontend pulido y aplicaciones móviles que se sienten
                  nativas.
                </p>

                <p>
                  Me interesan los sistemas con{" "}
                  <span className="text-[var(--color-cyan)]">arquitectura clara</span>:
                  separación explícita de responsabilidades, pipelines auditables y
                  decisiones documentadas. Eso, sumado a un foco fuerte en{" "}
                  <span className="text-[var(--color-violet)]">seguridad</span>{" "}
                  (cookies HttpOnly cross-origin, JWT separados por rol, signed
                  download URLs, audit logs), es lo que me define como ingeniero.
                </p>

                <p>
                  Mi proyecto principal hoy es{" "}
                  <Link href="/projects/aiencmaster" className="term-link">
                    AIENCMASTER
                  </Link>
                  , un portal institucional + panel administrativo multi-rol
                  con app móvil firmada, distribuido para una asociación de
                  iglesias del norte de Colombia.
                </p>
              </div>
            }
          />
        </div>
      </TerminalWindow>

      <TerminalWindow title="ruben@portfolio: ~/about — cat filosofia.md">
        <Prompt
          command="cat filosofia.md"
          cwd="~/about"
          output={
            <div className="space-y-3 mt-2">
              <div className="text-[var(--color-fg-muted)] text-sm">
                # Cómo trabajo
              </div>
              <ul className="space-y-3">
                {[
                  {
                    title: "Decisiones explícitas",
                    body: "Si una skill no envía MagnitudeProfile, el sistema marca el fallback explícitamente. No hay magia silenciosa.",
                  },
                  {
                    title: "Seguridad por defecto",
                    body: "Cookies HttpOnly, JWT con tokenVersion para invalidación masiva, signed URLs con expiry, secrets fuera del repo con templates committeados.",
                  },
                  {
                    title: "Tests donde importan",
                    body: "48 tests en AIENC cubriendo la cadena ROOT→ROOT. No persigo coverage; persigo confianza al refactorizar.",
                  },
                  {
                    title: "Documentación viva",
                    body: "README como portada técnica, no como manual desactualizado. Mis decisiones de arquitectura van escritas en el repo.",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="bg-[var(--color-bg-overlay)] border border-[var(--color-border)] rounded p-4"
                  >
                    <div className="flex gap-2 items-baseline mb-1">
                      <span className="text-[var(--color-accent)] font-mono text-xs">
                        [{String(i + 1).padStart(2, "0")}]
                      </span>
                      <span className="text-[var(--color-fg)] font-bold">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          }
        />
      </TerminalWindow>

      <TerminalWindow title="ruben@portfolio: ~/about — env">
        <Prompt
          command="env | grep RUBEN_"
          cwd="~/about"
          output={
            <div className="font-mono text-sm space-y-1 mt-2">
              {[
                ["RUBEN_LOCATION", "Valledupar, Cesar, Colombia"],
                ["RUBEN_TIMEZONE", "America/Bogota (UTC-5)"],
                ["RUBEN_LANGUAGES", "Español (nativo), Inglés (técnico)"],
                ["RUBEN_LEARNING", "Audio ML, sistemas distribuidos, CDP"],
                ["RUBEN_FAVORITE_STACK", "NestJS + Next.js + Flutter"],
                ["RUBEN_STATUS", "Open to work"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap gap-x-1">
                  <span className="text-[var(--color-cyan)]">{k}</span>
                  <span className="text-[var(--color-fg-muted)]">=</span>
                  <span className="text-[var(--color-fg)]">&quot;{v}&quot;</span>
                </div>
              ))}
            </div>
          }
        />
      </TerminalWindow>
    </div>
  );
}
