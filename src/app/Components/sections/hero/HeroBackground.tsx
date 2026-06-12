"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BACKGROUND_IMAGES } from "./hero.constants";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {BACKGROUND_IMAGES.filter(
        (image) => !image.src.includes("momento-3")
      ).map((image, index) => (
        <motion.div
          key={index}
          className={`hidden lg:block absolute ${image.position}`}
          style={{ transform: `rotate(${image.rotate}deg)` }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.15, ease: "easeOut" }}
          whileHover={{ scale: 1.04, zIndex: 10 }}
        >
          <div
            className={`relative ${image.size} rounded-3xl overflow-hidden transition-shadow duration-300`}
            style={{
              border: "2px solid rgba(0,240,255,.3)",
              boxShadow:
                "0 0 20px rgba(0,240,255,.12), 0 0 40px rgba(138,43,226,.12), 0 15px 40px rgba(0,0,0,.4)",
            }}
          >
            <Image src={image.src} alt="" fill className="object-cover" />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,15,25,.45), transparent 60%)",
              }}
            />

            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "rgba(0,240,255,0.06)",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}