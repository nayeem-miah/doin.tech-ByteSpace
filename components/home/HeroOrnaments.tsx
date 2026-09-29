/**
 * Hero ornament layer.
 *
 * The Figma file builds these from paired image fills clipped by mask
 * groups (one grey render per shape, masked to a lime or white fill).
 * The same result is produced here with a CSS mask: the exported shape
 * becomes the mask, the mask target carries the colour. That keeps one
 * asset per shape instead of a separate lime and white render of each.
 *
 * Positions are expressed against the 1440x1024 design frame.
 */

type Tint = "lime" | "white";

function Shape({
  src,
  tint,
  className = "",
  style,
}: {
  src: string;
  tint: Tint;
  className?: string;
  style?: React.CSSProperties;
}) {
  const mask = `url(${src}) center / contain no-repeat`;
  return (
    <span
      aria-hidden="true"
      className={`block ${className}`}
      style={{
        ...style,
        backgroundColor: tint === "lime" ? "#d4fb20" : "#ffffff",
        WebkitMask: mask,
        mask,
      }}
    />
  );
}

export function HeroOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Faint grid printed over the blue field */}
      <span
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      {/* The lime disc the person stands in front of */}
      <span className="absolute left-1/2 bottom-[-300px] size-[900px] -translate-x-1/2 rounded-full bg-lime" />

      {/* Lime squiggle, top left */}
      <Shape
        src="/assets/hero-float-6.png"
        tint="lime"
        className="absolute top-[268px] left-[-30px] h-[210px] w-[180px] rotate-[-8deg]"
      />
      {/* Lime blob, top right corner */}
      <span className="absolute top-[150px] right-[-60px] h-[300px] w-[210px] rotate-[20deg] rounded-[80px] bg-lime" />

      {/* White ornaments, all sitting on the blue field */}
      <Shape
        src="/assets/hero-float-1.png"
        tint="white"
        className="absolute top-[520px] left-[212px] h-[92px] w-[92px]"
      />
      <Shape
        src="/assets/hero-float-4.png"
        tint="white"
        className="absolute bottom-[120px] left-[96px] h-[190px] w-[190px]"
      />
      <Shape
        src="/assets/shape-lime-2.png"
        tint="white"
        className="absolute top-[500px] right-[168px] h-[112px] w-[112px]"
      />
      <Shape
        src="/assets/hero-float-3.png"
        tint="white"
        className="absolute right-[36px] bottom-[230px] h-[190px] w-[175px] rotate-[6deg]"
      />
    </div>
  );
}
