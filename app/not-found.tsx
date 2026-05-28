import Link from "next/link";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Prompt } from "@/components/Prompt";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <TerminalWindow title="ruben@portfolio: ~ — error 404">
        <Prompt
          command={`cd /esta-ruta`}
          output={
            <div className="mt-2 space-y-3">
              <div className="text-[var(--color-red)] font-mono text-sm">
                cd: /esta-ruta: No such file or directory
              </div>
              <div className="text-6xl md:text-8xl font-bold text-[var(--color-accent)] text-glow my-6">
                404
                <span className="cursor" />
              </div>
              <p className="text-[var(--color-fg)]">
                La ruta que buscas no existe en este filesystem.
              </p>
              <p className="text-sm text-[var(--color-fg-muted)]">
                Quizás te interese{" "}
                <Link href="/" className="term-link">
                  volver a ~/
                </Link>{" "}
                o{" "}
                <Link href="/projects" className="term-link">
                  ver los proyectos
                </Link>
                .
              </p>
            </div>
          }
        />
      </TerminalWindow>
    </div>
  );
}
