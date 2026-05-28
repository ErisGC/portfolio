"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  paused?: boolean;
  instant?: boolean;
  onDone?: () => void;
};

export function TypingText({
  text,
  speed = 35,
  delay = 0,
  className = "",
  cursor = true,
  paused = false,
  instant = false,
  onDone,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState(instant ? text : "");
  const [done, setDone] = useState(instant);

  useEffect(() => {
    // Modo instantaneo: muestra todo y marca como hecho
    if (instant) {
      setDisplayed(text);
      setDone(true);
      onDone?.();
      return;
    }

    if (paused) return;

    let cancelled = false;
    let i = displayed.length;

    const tick = () => {
      if (cancelled) return;
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        setTimeout(tick, speed);
      } else {
        setDone(true);
        onDone?.();
      }
    };

    const startTimer = setTimeout(tick, displayed.length === 0 ? delay : 0);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, delay, paused, instant]);

  return (
    <span className={className}>
      {displayed}
      {cursor && !done && !paused && <span className="cursor" />}
      {cursor && paused && <span className="cursor opacity-50" />}
    </span>
  );
}
