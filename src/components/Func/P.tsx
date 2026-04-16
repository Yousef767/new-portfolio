import { motion, easeOut } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const word = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

export default function P({ text }: { text: string }) {
  return (
    <motion.p
      className="p"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      style={{ display: "flex", flexWrap: "wrap", gap: "6px",alignItems:"flex-start" }}
    >
      {text.split(" ").map((wordText, i) => (
        <motion.span key={i} variants={word}>
          {wordText}
        </motion.span>
      ))}
    </motion.p>
  );
}