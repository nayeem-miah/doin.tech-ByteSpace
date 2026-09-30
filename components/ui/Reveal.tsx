"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Origin = "up" | "left" | "scale" | "fade";

/**
 * Scroll reveal driven by IntersectionObserver.
 *
 * No window scroll listener anywhere: those run on every frame and
 * collapse on mobile. The observer fires once, reveals, and disconnects.
 *
 * The visible class is toggled on the node through a ref rather than via
 * useState, so revealing a grid of cards costs zero React re-renders.
 *
 * Content must never be left invisible, so the observer is backed by an
 * immediate rect test on mount and a short timer. A callback that never
 * arrives - a fast programmatic scroll, a restored scroll position, a
 * container resized underneath - would otherwise strand the element at
 * opacity 0 forever.
 *
 * prefers-reduced-motion needs no JS branch: globals.css resolves every
 * origin to its end state under that media query.
 */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Stagger step in ms. Keep 30-80ms between siblings. */
  delay?: number;
  from?: Origin;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (delay) node.style.setProperty("--i", `${delay}ms`);

    const show = () => node.classList.add("is-visible");

    // Already on screen at mount (deep link, restored scroll, SSR).
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(node);

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
    <Tag
      ref={ref as never}
      className={`reveal reveal-${from} ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals direct children one after another as the group scrolls in.
 *
 * Each child reads its own delay from an inline --i, set here rather
 * than by a per-child observer, so a twelve-card grid runs one observer
 * instead of twelve.
 */
export function Stagger({
  children,
  step = 70,
  from = "up",
  className = "",
  style,
  as: Tag = "div",
}: {
  children: ReactNode[];
  /** Delay added per child, in ms. */
  step?: number;
  from?: Origin;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "ul" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const items = Array.from(node.children) as HTMLElement[];
    items.forEach((el, i) => el.style.setProperty("--i", `${i * step}ms`));

    const show = () => node.classList.add("is-visible");

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        io.disconnect();
      },
      { threshold: 0.05, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(node);

    const timer = window.setTimeout(() => {
      const r = node.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        show();
        io.disconnect();
      }
    }, 1800);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [step]);

  return (
    <Tag ref={ref as never} className={`reveal reveal-${from} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
