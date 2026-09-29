"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal built on IntersectionObserver.
 *
 * Deliberately CSS-transition based rather than a scroll listener: the
 * design-taste skill bans window scroll handlers outright (they run on
 * every frame and jank on mobile), and this is the cheapest way to get
 * an enter transition that degrades cleanly.
 *
 * The visible class is toggled on the DOM node directly instead of via
 * useState, so revealing a grid of cards triggers zero React re-renders.
 * The observer disconnects after the first reveal.
 *
 * prefers-reduced-motion needs no JS branch: globals.css already forces
 * .reveal to its final state under that media query.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Stagger step in ms. Keep 30-80ms between siblings. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (delay) node.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.classList.add("is-visible");
        io.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref as never} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
