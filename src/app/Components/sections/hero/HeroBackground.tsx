"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { BACKGROUND_IMAGES } from "./hero.constants";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {BACKGROUND_IMAGES.map((image, index) => (
        <motion.div
          key={index}
          className={`hidden lg:block absolute ${image.position}`}
          style={{ rotate: image.rotate }}
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.05, zIndex: 10, transition: { duration: 0.3 } }}
        >
          <div
            className={`relative ${image.size} rounded-3xl overflow-hidden`}
            style={{
              border: "2px solid rgba(0,240,255,.3)",
              boxShadow: "0 0 20px rgba(0,240,255,.12), 0 0 40px rgba(138,43,226,.12), 0 15px 40px rgba(0,0,0,.4)",
            }}
          >
            <Image
              src={image.src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 0px, 240px"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(11,15,25,.45), transparent 60%)" }}
            />
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ background: "rgba(0,240,255,0.06)" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}