"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
};

export function TypingText({
  text,
  speed = 35,
  delay = 0,
  className = "",
  cursor = true,
  onDone,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
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
    const startTimer = setTimeout(tick, delay);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, [text, speed, delay, onDone]);

  return (
    <span className={className}>
      {displayed}
      {cursor && !done && <span className="cursor" />}
    </span>
  );
}
