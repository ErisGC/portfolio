import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  repoUrl: string;
  demoUrl?: string;
  status: "production" | "demo" | "prototype" | "active";
  accent: "accent" | "cyan" | "violet" | "yellow" | "orange";
};

const STATUS_LABEL: Record<Project["status"], string> = {
  production: "PRODUCTION",
  demo: "DEMO",
  prototype: "PROTOTYPE",
  active: "ACTIVE",
};

const STATUS_COLOR: Record<Project["status"], string> = {
  production: "text-[var(--color-accent)] border-[var(--color-accent)]",
  demo: "text-[var(--color-cyan)] border-[var(--color-cyan)]",
  prototype: "text-[var(--color-yellow)] border-[var(--color-yellow)]",
  active: "text-[var(--color-violet)] border-[var(--color-violet)]",
};

const ACCENT_COLOR: Record<Project["accent"], string> = {
  accent: "text-[var(--color-accent)]",
  cyan: "text-[var(--color-cyan)]",
  violet: "text-[var(--color-violet)]",
  yellow: "text-[var(--color-yellow)]",
  orange: "text-[var(--color-orange)]",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg overflow-hidden transition-all hover:border-[var(--color-border-strong)] hover:shadow-xl">
      {/* Header tipo terminal */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-bg-overlay)] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-red)] opacity-60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-yellow)] opacity-60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] opacity-60" />
          </div>
          <span className="text-xs text-[var(--color-fg-muted)] ml-2 font-mono">
            ~/projects/{project.slug}
          </span>
        </div>
        <span
          className={`text-[10px] px-2 py-0.5 border rounded font-mono ${STATUS_COLOR[project.status]}`}
        >
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className={`text-xl md:text-2xl font-bold font-mono ${ACCENT_COLOR[project.accent]}`}
          >
            {project.name}
          </h3>
        </div>

        <p className="text-sm text-[var(--color-fg-muted)] mb-3 italic">
          {project.tagline}
        </p>

        <p className="text-sm text-[var(--color-fg)] mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 bg-[var(--color-bg-overlay)] border border-[var(--color-border)] rounded text-[var(--color-fg-muted)] font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="space-y-1 mb-5 text-sm">
          {project.highlights.slice(0, 3).map((h, i) => (
            <li
              key={i}
              className="flex gap-2 text-[var(--color-fg)] leading-relaxed"
            >
              <span className={`${ACCENT_COLOR[project.accent]} font-mono`}>
                {">"}
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] font-mono transition-colors"
            >
              <Github size={13} />
              repo
            </Link>
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] font-mono transition-colors"
              >
                <ExternalLink size={13} />
                demo
              </Link>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className={`flex items-center gap-1.5 text-xs font-mono ${ACCENT_COLOR[project.accent]} hover:gap-2 transition-all`}
          >
            cat README
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}
