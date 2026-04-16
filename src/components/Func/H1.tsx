import { easeInOut, motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letter = {
  hidden: (custom: number) => ({
    opacity: 0,
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    rotate: Math.random() * 180 - 90,
    scale: 0,
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
};

export default function H1({ text }: { text: string }) {
  return (
    <motion.h1
      className="h1"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          custom={i}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
