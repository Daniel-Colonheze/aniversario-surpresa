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

export const PARTICLES = Array.from({ length: 40 }, () => ({
  width: Math.random() * 4 + 1,
  height: Math.random() * 4 + 1,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 4 + Math.random() * 5,
  delay: Math.random() * 2,
  color:
    Math.random() > 0.6
      ? "var(--accent-cyan)"
      : Math.random() > 0.3
        ? "var(--accent-purple)"
        : "var(--accent-pink)",
}));
