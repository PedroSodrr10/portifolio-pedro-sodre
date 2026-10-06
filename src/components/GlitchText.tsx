"use client";
// Adapted from React Bits GlitchText (David Haz). See licenses/React-Bits-LICENSE.txt.
import { useEffect, useRef } from "react";
import s from "./GlitchText.module.css";
export function GlitchText({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("pedro-welcome")) return;
      sessionStorage.setItem("pedro-welcome", "1");
    } catch {
      return;
    }
    ref.current?.classList.add(s.active);
    const timer = setTimeout(
      () => ref.current?.classList.remove(s.active),
      900,
    );
    return () => clearTimeout(timer);
  }, []);
  return (
    <span className={s.glitch} ref={ref} data-text={children}>
      {children}
    </span>
  );
}
