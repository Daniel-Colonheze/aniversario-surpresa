export const WORDS = ["Para", "um", "amigo", "especial."];

export const BACKGROUND_IMAGES = [
  {
    src: "/images/momento-1.jpg",
    position: "top-6 left-4",
    rotate: -7,
    size: "w-60 h-80",
  },
  {
    src: "/images/momento-2.jpg",
    position: "top-1/2 -translate-y-1/2 left-4",
    rotate: 5,
    size: "w-60 h-80",
  },
  {
    src: "/images/momento-11.jpg",
    position: "bottom-6 left-4",
    rotate: -4,
    size: "w-60 h-80",
  },
  {
    src: "/images/momento-3.jpg",
    position: "top-6 right-4",
    rotate: 6,
    size: "w-60 h-80",
  },
  {
    src: "/images/momento-4.jpg",
    position: "top-1/2 -translate-y-1/2 right-4",
    rotate: -5,
    size: "w-60 h-80",
  },
  {
    src: "/images/momento-12.jpg",
    position: "bottom-6 right-4",
    rotate: 4,
    size: "w-60 h-80",
  },
];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export const PARTICLES = Array.from({ length: 55 }, () => {
  const colorRoll = Math.random();
  const color =
    colorRoll > 0.65
      ? "var(--accent-cyan)"
      : colorRoll > 0.35
        ? "var(--accent-purple)"
        : "var(--accent-pink)";
  const size = rand(1.5, 5.5);
  return {
    width: size,
    height: size,
    left: `${rand(0, 100)}%`,
    top: `${rand(0, 100)}%`,
    duration: rand(4, 10),
    delay: rand(0, 4),
    color,
    blur: size > 4 ? 1.5 : 0,
    yRange: -(rand(20, 50)),
    xRange: rand(-18, 18),
    opacityMin: rand(0.08, 0.2),
    opacityMax: rand(0.55, 0.85),
  };
});