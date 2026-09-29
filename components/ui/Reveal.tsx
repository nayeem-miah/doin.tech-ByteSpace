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
 *
 * Content must never be left invisible, so the observer is backed up by
 * two independent checks: an immediate rect test on mount, and a short
 * timer. An observer whose callback is missed (fast programmatic scroll,
 * a container resized underneath it, a restored scroll position) would
 * otherwise strand the element at opacity 0 forever.
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

    const show = () => node.classList.add("is-visible");

    // 1. Already on screen at mount (deep link, restored scroll, SSR).
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show();
      return;
    }

    // 2. Observer, for everything reached by scrolling.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        io.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(node);

    // 3. Safety net, in case the callback never arrives.
    const timer = window.setTimeout(() => {
      const r = node.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        show();
        io.disconnect();
      }
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay]);

  return (
    <Tag ref={ref as never} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
