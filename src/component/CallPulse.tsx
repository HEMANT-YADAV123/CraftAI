import { motion } from "motion/react";

export function CallPulse() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      {/* Radio waves - Left side */}
      <div className="absolute left-0 right-1/2 h-full flex items-center justify-end gap-2 pr-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`left-${i}`}
            className="w-1 bg-gradient-to-t from-blue-400/60 to-blue-500/80 rounded-full"
            style={{
              height: `${20 + i * 8}px`,
            }}
            animate={{
              scaleY: [1, 1.5, 1, 0.8, 1],
              opacity: [0.4, 0.8, 0.6, 0.4, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Radio waves - Right side */}
      <div className="absolute left-1/2 right-0 h-full flex items-center justify-start gap-2 pl-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className="w-1 bg-gradient-to-t from-blue-400/60 to-blue-500/80 rounded-full"
            style={{
              height: `${60 - i * 8}px`,
            }}
            animate={{
              scaleY: [1, 0.8, 1, 1.5, 1],
              opacity: [0.4, 0.4, 0.6, 0.8, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-blue-400/10 blur-xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center phone icon */}
      <motion.div
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40 z-20"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 16.92V19.92C22 20.49 21.54 20.96 20.97 20.92C9.44 20.41 1.59 12.56 1.08 1.03C1.04 0.46 1.51 0 2.08 0H5.08C5.64 0 6.11 0.47 6.11 1.03C6.2 3.53 6.67 5.96 7.47 8.23C7.61 8.64 7.5 9.1 7.18 9.42L5.25 11.35C7.42 15.58 11.42 19.58 15.65 21.75L17.58 19.82C17.9 19.5 18.36 19.39 18.77 19.53C21.04 20.33 23.47 20.8 25.97 20.89C26.53 20.89 27 21.36 27 21.92Z"
            transform="translate(-1 -2) scale(0.85)"
            fill="white"
          />
        </svg>
      </motion.div>
    </div>
  );
}
