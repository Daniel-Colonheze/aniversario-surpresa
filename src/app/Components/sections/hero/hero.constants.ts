export const WORDS = ["Para", "um", "amigo", "especial."];

export const BACKGROUND_IMAGES = [
  {
    src: "/images/momento-1.jpg",
    position: "top-10 left-6",
    rotate: -8,
    size: "w-72 h-96",
  },
  {
    src: "/images/momento-2.jpg",
    position: "bottom-0 left-6",
    rotate: 6,
    size: "w-72 h-96",
  },
  {
    src: "/images/momento-3.jpg",
    position: "top-12 right-10",
    rotate: -6,
    size: "w-72 h-96",
  },
  {
    src: "/images/momento-4.jpg",
    position: "bottom-1/4 right-10",
    rotate: 4,
    size: "w-72 h-96",
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