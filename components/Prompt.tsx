import { ReactNode } from "react";

type PromptProps = {
  command: string;
  output?: ReactNode;
  user?: string;
  host?: string;
  cwd?: string;
};

export function Prompt({
  command,
  output,
  user = "ruben",
  host = "portfolio",
  cwd = "~",
}: PromptProps) {
  return (
    <div className="font-mono text-sm md:text-base">
      <div className="flex flex-wrap items-baseline gap-x-1">
        <span className="text-[var(--color-accent)]">{user}</span>
        <span className="text-[var(--color-fg-muted)]">@</span>
        <span className="text-[var(--color-cyan)]">{host}</span>
        <span className="text-[var(--color-fg-muted)]">:</span>
        <span className="text-[var(--color-violet)]">{cwd}</span>
        <span className="text-[var(--color-fg-muted)]">$</span>
        <span className="text-[var(--color-fg)] ml-1 break-all">{command}</span>
      </div>
      {output !== undefined && (
        <div className="mt-2 ml-0 md:ml-4 text-[var(--color-fg)]">{output}</div>
      )}
    </div>
  );
}
