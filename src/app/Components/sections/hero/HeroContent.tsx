"use client";

import { WORDS } from "./hero.constants";

export default function HeroContent() {
  return (
<div
  className="
    relative
    z-10
    max-w-6xl
    mx-auto
    px-4
    md:px-8
    text-center
  "
  style={{
    marginTop: "250px",
  }}
>
      <p
        className="
          text-xs
          md:text-sm
          uppercase
          tracking-[0.35em]
          mb-6
        "
        style={{
          color: "var(--accent-cyan)",
        }}
      >
        Entre risadas, histórias e memórias
      </p>

      <h1
        className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
          xl:text-8xl
          font-black
          leading-tight
          mb-6
        "
      >
        {WORDS.map((word, index) => (
          <span
            key={word}
            className="inline-block mr-3 md:mr-4"
            style={{
              background: index % 2 === 0 ? "var(--gradient-hero)" : undefined,
              WebkitBackgroundClip: index % 2 === 0 ? "text" : undefined,
              WebkitTextFillColor:
                index % 2 === 0 ? "transparent" : "var(--text-primary)",
            }}
          >
            {word}
          </span>
        ))}
      </h1>

      <p
        className="
          text-xl
          sm:text-2xl
          md:text-3xl
          lg:text-4xl
          font-light
        "
        style={{
          color: "var(--accent-pink)",
        }}
      >
        Arthur Begosso (Chupa Engole)
      </p>
    </div>
  );
}
