import type { Metadata } from "next";
import Link from "next/link";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Prompt } from "@/components/Prompt";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Rubén Gutiérrez",
  description: "Cómo contactar con Rubén Gutiérrez.",
};

const CHANNELS = [
  {
    label: "Email",
    value: "bennielrrezno@gmail.com",
    href: "mailto:bennielrrezno@gmail.com",
    icon: Mail,
    cmd: "mail",
    color: "text-[var(--color-accent)]",
    description:
      "Para temas formales, propuestas o cualquier conversación seria.",
  },
  {
    label: "LinkedIn",
    value: "ruben-gutiérrez-4542a1412",
    href: "https://www.linkedin.com/in/ruben-guti%C3%A9rrez-4542a1412",
    icon: Linkedin,
    cmd: "open",
    color: "text-[var(--color-cyan)]",
    description: "Perfil profesional, experiencia detallada y red.",
  },
  {
    label: "GitHub",
    value: "ErisGC",
    href: "https://github.com/ErisGC",
    icon: Github,
    cmd: "git remote -v",
    color: "text-[var(--color-violet)]",
    description: "Código real, commits, READMEs detallados.",
  },
  {
    label: "Ubicación",
    value: "Valledupar, Cesar, Colombia · UTC-5",
    href: "https://maps.google.com/?q=Valledupar,+Cesar,+Colombia",
    icon: MapPin,
    cmd: "geoip",
    color: "text-[var(--color-yellow)]",
    description: "Trabajo remoto sin problema. Disponible para reunir local.",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
      <TerminalWindow title="ruben@portfolio: ~/contact — ping rubén">
        <Prompt
          command="ping -c 1 ruben"
          cwd="~/contact"
          output={
            <div className="mt-3 space-y-1 text-sm font-mono">
              <div className="text-[var(--color-fg-muted)]">
                PING ruben (Valledupar, CO): 56 data bytes
              </div>
              <div className="text-[var(--color-fg)]">
                64 bytes from ruben.dev: icmp_seq=0 ttl=64 time=0.042 ms{" "}
                <span className="text-[var(--color-accent)]">[OPEN]</span>
              </div>
              <div className="text-[var(--color-fg-muted)] mt-2">
                --- ruben statistics ---
              </div>
              <div className="text-[var(--color-fg)]">
                1 packets transmitted, 1 received,{" "}
                <span className="text-[var(--color-accent)]">0% packet loss</span>
              </div>
              <p className="text-[var(--color-fg-muted)] mt-4 leading-relaxed">
                Estoy disponible. Elige tu canal preferido abajo y te respondo
                en menos de 24h hábiles.
              </p>
            </div>
          }
        />
      </TerminalWindow>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                c.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group block bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-5 hover:border-[var(--color-border-strong)] transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 bg-[var(--color-bg-overlay)] rounded ${c.color}`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div className={`font-mono font-bold ${c.color}`}>
                    {c.label}
                  </div>
                  <div className="text-xs text-[var(--color-fg-dim)] font-mono">
                    $ {c.cmd}
                  </div>
                </div>
              </div>
              <div className="text-sm text-[var(--color-fg)] font-mono break-all mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                {c.value}
              </div>
              <p className="text-xs text-[var(--color-fg-muted)] leading-relaxed">
                {c.description}
              </p>
            </Link>
          );
        })}
      </div>

      <TerminalWindow title="ruben@portfolio: ~/contact — uptime">
        <Prompt
          command="uptime"
          cwd="~/contact"
          output={
            <div className="mt-2 text-sm text-[var(--color-fg-muted)]">
              <span className="text-[var(--color-accent)]">22:30:00</span>{" "}
              up 3+ años, 0 users, load avg: 0.42, 0.31, 0.18 ·{" "}
              <span className="text-[var(--color-fg)]">
                Open to work, listo para conversar.
              </span>
            </div>
          }
        />
      </TerminalWindow>
    </div>
  );
}
