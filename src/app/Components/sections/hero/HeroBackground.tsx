"use client";

import Image from "next/image";
import { BACKGROUND_IMAGES } from "./hero.constants";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {BACKGROUND_IMAGES.filter((image) => !image.src.includes("momento-3")).map((image, index) => (
        <div
          key={index}
          className={`
            hidden
            lg:block
            absolute
            ${image.position}
          `}
          style={{
            transform: `rotate(${image.rotate}deg)`,
          }}
        >
          <div
            className={`
              relative
              ${image.size}
              rounded-3xl
              overflow-hidden
            `}
            style={{
              border: "2px solid rgba(0,240,255,.35)",
              boxShadow: `
                0 0 20px rgba(0,240,255,.15),
                0 0 40px rgba(138,43,226,.15),
                0 15px 40px rgba(0,0,0,.35)
              `,
            }}
          >
            <Image src={image.src} alt="" fill className="object-cover" />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,15,25,.35), transparent)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}