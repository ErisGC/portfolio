import type { Metadata } from "next";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Prompt } from "@/components/Prompt";

export const metadata: Metadata = {
  title: "Stack — Rubén Gutiérrez",
  description: "Tecnologías y herramientas que uso en el día a día.",
};

type StackItem = {
  name: string;
  level: "expert" | "advanced" | "comfortable" | "learning";
};

type StackGroup = {
  category: string;
  icon: string;
  color: "accent" | "cyan" | "violet" | "yellow" | "orange";
  items: StackItem[];
};

const STACK: StackGroup[] = [
  {
    category: "Backend",
    icon: "⚙️",
    color: "accent",
    items: [
      { name: "NestJS", level: "expert" },
      { name: "Express", level: "advanced" },
      { name: "FastAPI", level: "advanced" },
      { name: ".NET 8 / ASP.NET Core", level: "advanced" },
      { name: "Node.js", level: "expert" },
      { name: "Python 3.11+", level: "advanced" },
      { name: "TypeORM", level: "advanced" },
      { name: "Prisma", level: "advanced" },
      { name: "Entity Framework Core", level: "advanced" },
      { name: "SQLAlchemy 2.0", level: "comfortable" },
    ],
  },
  {
    category: "Frontend",
    icon: "🎨",
    color: "cyan",
    items: [
      { name: "Next.js 15/16 (App Router)", level: "expert" },
      { name: "React 19", level: "expert" },
      { name: "Vite", level: "advanced" },
      { name: "Tailwind CSS 4", level: "expert" },
      { name: "Framer Motion", level: "comfortable" },
      { name: "React Router", level: "advanced" },
    ],
  },
  {
    category: "Mobile",
    icon: "📱",
    color: "violet",
    items: [
      { name: "Flutter 3.x", level: "advanced" },
      { name: "Dart", level: "advanced" },
      { name: "Android nativo (APK firmado)", level: "advanced" },
      { name: "Deep linking", level: "comfortable" },
      { name: "Biometría", level: "comfortable" },
    ],
  },
  {
    category: "Datos",
    icon: "💾",
    color: "yellow",
    items: [
      { name: "PostgreSQL 17", level: "advanced" },
      { name: "Redis 7", level: "advanced" },
      { name: "Migraciones (Prisma, Alembic, EF)", level: "advanced" },
      { name: "Audit trails", level: "advanced" },
    ],
  },
  {
    category: "DevOps & Infra",
    icon: "🚀",
    color: "orange",
    items: [
      { name: "GitHub Actions", level: "advanced" },
      { name: "Railway", level: "advanced" },
      { name: "Vercel", level: "expert" },
      { name: "Cloudinary", level: "advanced" },
      { name: "Docker Compose", level: "comfortable" },
    ],
  },
  {
    category: "Pagos & Auth",
    icon: "🔐",
    color: "accent",
    items: [
      { name: "Stripe (Checkout + Webhooks)", level: "advanced" },
      { name: "Wompi (Colombia · COP, PSE, Nequi)", level: "advanced" },
      { name: "Auth0", level: "advanced" },
      { name: "JWT + cookies HttpOnly cross-origin", level: "expert" },
    ],
  },
];

const LEVEL_LABEL: Record<StackItem["level"], string> = {
  expert: "expert",
  advanced: "advanced",
  comfortable: "comfortable",
  learning: "learning",
};

const LEVEL_DOTS: Record<StackItem["level"], number> = {
  expert: 5,
  advanced: 4,
  comfortable: 3,
  learning: 2,
};

const COLOR_CLASSES: Record<StackGroup["color"], string> = {
  accent: "text-[var(--color-accent)] border-[var(--color-accent)]",
  cyan: "text-[var(--color-cyan)] border-[var(--color-cyan)]",
  violet: "text-[var(--color-violet)] border-[var(--color-violet)]",
  yellow: "text-[var(--color-yellow)] border-[var(--color-yellow)]",
  orange: "text-[var(--color-orange)] border-[var(--color-orange)]",
};

const DOT_COLOR: Record<StackGroup["color"], string> = {
  accent: "bg-[var(--color-accent)]",
  cyan: "bg-[var(--color-cyan)]",
  violet: "bg-[var(--color-violet)]",
  yellow: "bg-[var(--color-yellow)]",
  orange: "bg-[var(--color-orange)]",
};

export default function StackPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <TerminalWindow title="ruben@portfolio: ~/stack — tree">
        <Prompt
          command="tree -L 2 ~/stack"
          cwd="~/stack"
          output={
            <p className="text-sm text-[var(--color-fg-muted)] mt-2 mb-4">
              Tecnologías agrupadas por categoría. Los círculos llenos indican
              nivel de dominio.
            </p>
          }
        />
      </TerminalWindow>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {STACK.map((group) => (
          <div
            key={group.category}
            className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-overlay)] border-b border-[var(--color-border)]">
              <span className="text-base">{group.icon}</span>
              <span
                className={`text-sm font-mono font-bold ${COLOR_CLASSES[group.color].split(" ")[0]}`}
              >
                {group.category}
              </span>
              <span className="ml-auto text-xs text-[var(--color-fg-dim)] font-mono">
                {group.items.length} items
              </span>
            </div>

            <ul className="p-4 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-3 group"
                >
                  <span className="text-sm text-[var(--color-fg)] font-mono">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            dot <= LEVEL_DOTS[item.level]
                              ? DOT_COLOR[group.color]
                              : "bg-[var(--color-border-strong)]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[var(--color-fg-dim)] font-mono w-20 text-right">
                      {LEVEL_LABEL[item.level]}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-5">
        <Prompt
          command="cat ~/learning.now"
          cwd="~/stack"
          output={
            <ul className="mt-2 space-y-1 text-sm text-[var(--color-fg-muted)]">
              <li>
                <span className="text-[var(--color-accent)]">{">"}</span> Audio
                ML y arquitecturas de modelos de conversión de voz
              </li>
              <li>
                <span className="text-[var(--color-accent)]">{">"}</span>{" "}
                Sistemas distribuidos autoritativos para juegos en tiempo real
              </li>
              <li>
                <span className="text-[var(--color-accent)]">{">"}</span>{" "}
                Patrones avanzados de identity resolution y CDP
              </li>
            </ul>
          }
        />
      </div>
    </div>
  );
}
