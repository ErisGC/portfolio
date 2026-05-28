import { ReactNode } from "react";

type TerminalWindowProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function TerminalWindow({
  title = "ruben@portfolio:~",
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg overflow-hidden shadow-2xl ${className}`}
    >
      {/* Title bar estilo macOS */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-overlay)] border-b border-[var(--color-border)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[var(--color-red)] opacity-70" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-yellow)] opacity-70" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-accent)] opacity-70" />
        </div>
        <span className="flex-1 text-center text-xs text-[var(--color-fg-muted)] select-none">
          {title}
        </span>
        <div className="w-12" />
      </div>
      {/* Contenido */}
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}
