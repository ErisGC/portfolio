"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";

const NAV = [
  { href: "/", label: "~/", desc: "home" },
  { href: "/about", label: "~/about", desc: "whoami" },
  { href: "/stack", label: "~/stack", desc: "tech" },
  { href: "/projects", label: "~/projects", desc: "ls" },
  { href: "/contact", label: "~/contact", desc: "ping" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg)]/85 border-b border-[var(--color-border)]">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-mono group"
          >
            <Terminal
              size={16}
              className="text-[var(--color-accent)] group-hover:rotate-12 transition-transform"
            />
            <span className="text-[var(--color-fg)]">
              ruben<span className="text-[var(--color-fg-muted)]">@</span>
              <span className="text-[var(--color-cyan)]">portfolio</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-1.5 text-sm font-mono rounded transition-all ${
                    isActive(item.href)
                      ? "text-[var(--color-accent)] bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)]"
                      : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-bg-elevated)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 pt-2 border-t border-[var(--color-border)]">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 text-sm font-mono rounded transition-all ${
                      isActive(item.href)
                        ? "text-[var(--color-accent)] bg-[var(--color-bg-elevated)]"
                        : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-bg-elevated)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[var(--color-fg-dim)]">
                      {item.desc}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
