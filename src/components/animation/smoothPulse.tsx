"use client";
import { motion } from "framer-motion";

export default function SmoothPulseSVG() {
  const fillAnimation = [
    "#a1dab6", // light mint
    "#22c55e", // bright green
    "#095c46", // dark green
    "#22c55e",
    "#a1dab6",
  ];

  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="-3 -3 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Dark green shapes */}
        <motion.path
          d="M17.343 2.65705L20 0L40 20L20 40L17.3429 37.3429L34.6859 20L17.343 2.65705Z"
          fill="#16A34A"
          animate={{ fill: fillAnimation }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
        />
        <motion.path
          d="M13.8744 6.12564L16.5314 3.46859L33.0628 20L16.5314 36.5314L13.8744 33.8744L27.7487 20L13.8744 6.12564Z"
          fill="#16A34A"
          animate={{ fill: fillAnimation }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
            delay: 1.2,
          }}
        />

        {/* Light green shapes */}
        <motion.path
          d="M0 20L13.0628 6.93718L26.1256 20L13.0628 33.0628L10.4058 30.4058L20.8115 20L13.0628 12.2513L2.65705 22.657L0 20Z"
          fill="#6CC58D"
          animate={{ fill: fillAnimation }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
            delay: 2.4,
          }}
        />
        <motion.path
          d="M13.0628 13.8744L10.4058 16.5314L13.8744 20L6.93718 26.9372L9.59422 29.5942L19.1885 20L13.0628 13.8744Z"
          fill="#6CC58D"
          animate={{ fill: fillAnimation }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
            delay: 3.6,
          }}
        />
        <motion.path
          d="M6.12564 26.1256L3.46859 23.4686L9.56643 17.3708L12.2235 20.0278L6.12564 26.1256Z"
          fill="#6CC58D"
          animate={{ fill: fillAnimation }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
            delay: 4.8,
          }}
        />
      </motion.g>
    </motion.svg>
  );
}
