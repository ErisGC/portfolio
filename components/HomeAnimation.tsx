"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Prompt } from "@/components/Prompt";
import { TypingText } from "@/components/TypingText";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Pause,
  Play,
  SkipForward,
  RotateCcw,
} from "lucide-react";

const STORAGE_KEY = "portfolio:home:seen-v1";

type Mode = "playing" | "paused" | "done";

export function HomeAnimation() {
  // step controla cuantos prompts se han renderizado ya
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<Mode>("playing");
  const [hydrated, setHydrated] = useState(false);

  // En primer mount: si ya vio la animacion antes, saltar directo
  useEffect(() => {
    setHydrated(true);
    try {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const seen = sessionStorage.getItem(STORAGE_KEY) === "1";
      if (seen || reducedMotion) {
        setStep(2);
        setMode("done");
      }
    } catch {
      // sessionStorage puede fallar en modo privado, no pasa nada
    }
  }, []);

  // Cuando termina la animacion, guardar en sessionStorage
  useEffect(() => {
    if (mode === "done") {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
    }
  }, [mode]);

  const skip = () => {
    setStep(2);
    setMode("done");
  };

  const togglePause = () => {
    setMode((m) => (m === "playing" ? "paused" : "playing"));
  };

  const replay = () => {
    setStep(0);
    setMode("playing");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const handleStep1 = () => {
    if (mode !== "paused") setStep(Math.max(step, 1));
  };
  const handleStep2 = () => {
    if (mode !== "paused") {
      setStep(Math.max(step, 2));
      setMode("done");
    }
  };

  // Antes de la hidratacion, render del estado inicial (evita flash)
  if (!hydrated) {
    return (
      <TerminalWindow title="ruben@portfolio: ~ — zsh — 100x30">
        <div className="min-h-[420px]" />
      </TerminalWindow>
    );
  }

  const isPlaying = mode === "playing";
  const isPaused = mode === "paused";
  const isDone = mode === "done";

  return (
    <>
      <TerminalWindow title="ruben@portfolio: ~ — zsh — 100x30">
        <div className="space-y-4 min-h-[420px]">
          {/* Controles */}
          <div className="flex flex-wrap items-center gap-2 -mt-2 mb-2 pb-3 border-b border-[var(--color-border)]">
            <span className="text-[10px] text-[var(--color-fg-dim)] font-mono uppercase tracking-wider">
              animación:
            </span>

            {!isDone && (
              <button
                onClick={togglePause}
                className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-[var(--color-fg-muted)] bg-[var(--color-bg-overlay)] border border-[var(--color-border)] rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
                aria-label={isPaused ? "Reanudar" : "Pausar"}
              >
                {isPaused ? (
                  <>
                    <Play size={11} /> reanudar
                  </>
                ) : (
                  <>
                    <Pause size={11} /> pausar
                  </>
                )}
              </button>
            )}

            {!isDone && (
              <button
                onClick={skip}
                className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-[var(--color-fg-muted)] bg-[var(--color-bg-overlay)] border border-[var(--color-border)] rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
              >
                <SkipForward size={11} /> saltar
              </button>
            )}

            {isDone && (
              <button
                onClick={replay}
                className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-[var(--color-fg-muted)] bg-[var(--color-bg-overlay)] border border-[var(--color-border)] rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
              >
                <RotateCcw size={11} /> repetir intro
              </button>
            )}

            <span className="ml-auto text-[10px] text-[var(--color-fg-dim)] font-mono">
              {isPlaying && "▶ reproduciendo"}
              {isPaused && "⏸ en pausa"}
              {isDone && "✓ listo"}
            </span>
          </div>

          {/* Boot */}
          <Prompt
            command="./welcome.sh"
            output={
              <TypingText
                text="Iniciando sesión... autenticación completa. Bienvenido."
                speed={45}
                paused={isPaused}
                instant={isDone}
                onDone={handleStep1}
              />
            }
          />

          {step >= 1 && (
            <Prompt
              command="whoami"
              output={
                <TypingText
                  text="Rubén Gutiérrez — Full-stack engineer"
                  speed={45}
                  paused={isPaused}
                  instant={isDone}
                  onDone={handleStep2}
                />
              }
            />
          )}

          {step >= 2 && (
            <Prompt
              command="cat /etc/profile"
              output={
                <div className="space-y-3 mt-2">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-fg)] mb-2 leading-tight">
                      Hola, soy{" "}
                      <span className="text-[var(--color-accent)] text-glow">
                        Rubén
                      </span>
                      <span className="cursor" />
                    </h1>
                    <p className="text-base md:text-lg text-[var(--color-fg-muted)] max-w-2xl leading-relaxed">
                      Construyo plataformas web y móviles con foco en{" "}
                      <span className="text-[var(--color-cyan)]">
                        arquitectura clara
                      </span>
                      ,{" "}
                      <span className="text-[var(--color-violet)]">
                        seguridad
                      </span>{" "}
                      y experiencia de usuario.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2 text-sm">
                    <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
                      <MapPin
                        size={14}
                        className="text-[var(--color-accent)]"
                      />
                      Valledupar, Colombia
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
                      <Briefcase
                        size={14}
                        className="text-[var(--color-accent)]"
                      />
                      Disponible para proyectos
                    </div>
                  </div>
                </div>
              }
            />
          )}

          {step >= 2 && (
            <Prompt
              command="ls -F ~/skills/"
              output={
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 mt-2 text-sm">
                  <span className="text-[var(--color-accent)]">backend/</span>
                  <span className="text-[var(--color-cyan)]">frontend/</span>
                  <span className="text-[var(--color-violet)]">mobile/</span>
                  <span className="text-[var(--color-yellow)]">devops/</span>
                </div>
              }
            />
          )}

          {step >= 2 && (
            <div className="pt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/projects"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-mono text-sm font-bold rounded hover:opacity-90 hover:gap-3 transition-all"
              >
                $ ./ver-proyectos
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-bg-overlay)] border border-[var(--color-border-strong)] text-[var(--color-fg)] font-mono text-sm rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
              >
                $ ./contactar
              </Link>
            </div>
          )}
        </div>
      </TerminalWindow>
    </>
  );
}
