import type { Metadata } from "next";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Prompt } from "@/components/Prompt";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Rubén Gutiérrez",
  description: "Proyectos destacados de Rubén Gutiérrez.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <TerminalWindow title="ruben@portfolio: ~/projects — ls -la">
        <Prompt
          command="ls -la ~/projects/"
          cwd="~/projects"
          output={
            <div className="mt-2 space-y-1 font-mono text-xs md:text-sm">
              <div className="text-[var(--color-fg-muted)]">
                total {PROJECTS.length}
              </div>
              {PROJECTS.map((p) => (
                <div key={p.slug} className="flex flex-wrap gap-x-3">
                  <span className="text-[var(--color-fg-dim)]">drwxr-xr-x</span>
                  <span className="text-[var(--color-fg-muted)]">ruben</span>
                  <span className="text-[var(--color-fg-muted)]">staff</span>
                  <span className="text-[var(--color-fg-dim)]">4.0K</span>
                  <span className="text-[var(--color-fg-dim)]">2026</span>
                  <span className="text-[var(--color-cyan)]">{p.slug}/</span>
                  <span className="text-[var(--color-fg-muted)] italic">
                    # {p.tagline.slice(0, 60)}
                    {p.tagline.length > 60 ? "..." : ""}
                  </span>
                </div>
              ))}
            </div>
          }
        />
      </TerminalWindow>

      <div className="mt-8 mb-4 text-sm text-[var(--color-fg-muted)] font-mono">
        <span className="text-[var(--color-accent)]">$</span> for project in ~/projects/*;
        do cat $project/README; done
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-12 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-5">
        <Prompt
          command="cat ~/projects/.note"
          cwd="~/projects"
          output={
            <p className="text-sm text-[var(--color-fg-muted)] mt-2 leading-relaxed">
              ¿Quieres ver más? Tengo otros experimentos y labs archivados en{" "}
              <a
                href="https://github.com/ErisGC?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="term-link"
              >
                github.com/ErisGC
              </a>
              . Los proyectos destacados están arriba.
            </p>
          }
        />
      </div>
    </div>
  );
}
