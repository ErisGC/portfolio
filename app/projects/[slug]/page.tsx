import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Prompt } from "@/components/Prompt";
import { PROJECTS, getProject } from "@/lib/projects";
import { getDetail } from "@/lib/projectDetails";
import { ArrowLeft, ExternalLink, Github, Check, Clock } from "lucide-react";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Rubén Gutiérrez`,
    description: project.tagline,
  };
}

const ACCENT_COLOR: Record<string, string> = {
  accent: "text-[var(--color-accent)]",
  cyan: "text-[var(--color-cyan)]",
  violet: "text-[var(--color-violet)]",
  yellow: "text-[var(--color-yellow)]",
  orange: "text-[var(--color-orange)]",
};

const ACCENT_BORDER: Record<string, string> = {
  accent: "border-[var(--color-accent)]",
  cyan: "border-[var(--color-cyan)]",
  violet: "border-[var(--color-violet)]",
  yellow: "border-[var(--color-yellow)]",
  orange: "border-[var(--color-orange)]",
};

export default async function ProjectDetailPage(props: { params: Params }) {
  const { slug } = await props.params;
  const project = getProject(slug);
  const detail = getDetail(slug);

  if (!project || !detail) {
    notFound();
  }

  const accentText = ACCENT_COLOR[project.accent];
  const accentBorder = ACCENT_BORDER[project.accent];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
      {/* Volver */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] font-mono transition-colors"
      >
        <ArrowLeft size={14} />
        cd ../projects
      </Link>

      {/* Header */}
      <TerminalWindow
        title={`ruben@portfolio: ~/projects/${project.slug} — cat README.md`}
      >
        <Prompt
          command={`cat README.md`}
          cwd={`~/projects/${project.slug}`}
          output={
            <div className="mt-3">
              <h1
                className={`text-3xl md:text-5xl font-bold font-mono ${accentText} mb-3 leading-tight`}
              >
                {project.name}
              </h1>
              <p className="text-base md:text-lg text-[var(--color-fg)] mb-4 leading-relaxed">
                {project.tagline}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2 py-0.5 bg-[var(--color-bg-overlay)] border border-[var(--color-border)] rounded text-[var(--color-fg-muted)] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-bg-overlay)] border border-[var(--color-border-strong)] text-[var(--color-fg)] text-xs font-mono rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
                >
                  <Github size={14} />
                  Ver repo
                </Link>
                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-bg-overlay)] border border-[var(--color-border-strong)] text-[var(--color-fg)] text-xs font-mono rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
                  >
                    <ExternalLink size={14} />
                    Ver demo
                  </Link>
                )}
              </div>
            </div>
          }
        />
      </TerminalWindow>

      {/* Problema y enfoque */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`bg-[var(--color-bg-elevated)] border-l-2 ${accentBorder} border-y border-r border-[var(--color-border)] rounded-lg p-5`}
        >
          <div className="text-xs text-[var(--color-fg-muted)] font-mono mb-2">
            # El problema
          </div>
          <p className="text-sm text-[var(--color-fg)] leading-relaxed">
            {detail.problem}
          </p>
        </div>
        <div
          className={`bg-[var(--color-bg-elevated)] border-l-2 ${accentBorder} border-y border-r border-[var(--color-border)] rounded-lg p-5`}
        >
          <div className="text-xs text-[var(--color-fg-muted)] font-mono mb-2">
            # Mi enfoque
          </div>
          <p className="text-sm text-[var(--color-fg)] leading-relaxed">
            {detail.approach}
          </p>
        </div>
      </div>

      {/* Secciones técnicas */}
      <div className="space-y-4">
        <div className="text-sm text-[var(--color-fg-muted)] font-mono px-1">
          <span className="text-[var(--color-accent)]">$</span> Aspectos técnicos
        </div>
        {detail.sections.map((section, i) => (
          <TerminalWindow
            key={i}
            title={`ruben@portfolio: ~/projects/${project.slug} — ${section.command}`}
          >
            <Prompt
              command={section.command}
              cwd={`~/projects/${project.slug}`}
              output={
                <div className="mt-3">
                  <h3 className={`text-lg font-bold ${accentText} mb-3`}>
                    {section.heading}
                  </h3>
                  {Array.isArray(section.body) ? (
                    <ul className="space-y-2 text-sm text-[var(--color-fg)]">
                      {section.body.map((line, j) => (
                        <li key={j} className="flex gap-2 leading-relaxed">
                          <span className={`${accentText} font-mono shrink-0`}>
                            {">"}
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[var(--color-fg)] leading-relaxed">
                      {section.body}
                    </p>
                  )}
                </div>
              }
            />
          </TerminalWindow>
        ))}
      </div>

      {/* Decisiones */}
      <TerminalWindow title={`ruben@portfolio: ~/projects/${project.slug} — cat DECISIONS.md`}>
        <Prompt
          command="cat DECISIONS.md"
          cwd={`~/projects/${project.slug}`}
          output={
            <div className="mt-3 space-y-3">
              {detail.decisions.map((d, i) => (
                <div
                  key={i}
                  className="bg-[var(--color-bg-overlay)] border border-[var(--color-border)] rounded p-4"
                >
                  <div className="flex gap-2 items-baseline mb-1">
                    <span className={`${accentText} font-mono text-xs`}>
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    <span className="text-[var(--color-fg)] font-bold">
                      {d.title}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          }
        />
      </TerminalWindow>

      {/* Estado actual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <Check size={16} className="text-[var(--color-accent)]" />
            <span className="text-sm font-mono font-bold text-[var(--color-accent)]">
              Implementado
            </span>
          </div>
          <ul className="space-y-1.5 text-sm">
            {detail.status.done.map((d, i) => (
              <li key={i} className="flex gap-2 text-[var(--color-fg)]">
                <span className="text-[var(--color-accent)] font-mono shrink-0">
                  ✓
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-[var(--color-yellow)]" />
            <span className="text-sm font-mono font-bold text-[var(--color-yellow)]">
              Pendiente
            </span>
          </div>
          <ul className="space-y-1.5 text-sm">
            {detail.status.pending.map((d, i) => (
              <li key={i} className="flex gap-2 text-[var(--color-fg)]">
                <span className="text-[var(--color-yellow)] font-mono shrink-0">
                  ○
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navegación entre proyectos */}
      <div className="pt-4 border-t border-[var(--color-border)] text-sm font-mono text-[var(--color-fg-muted)]">
        <div className="text-[var(--color-fg-dim)] mb-2">
          # Otros proyectos:
        </div>
        <div className="flex flex-wrap gap-3">
          {PROJECTS.filter((p) => p.slug !== project.slug).map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="term-link"
            >
              {p.name} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
