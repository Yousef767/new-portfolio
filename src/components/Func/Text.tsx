const letter = {
  hidden: (custom: number) => ({
    opacity: 0,
    x: Math.sin(custom) * 200 - 100,
    y: Math.cos(custom) * 200 - 100,
    rotate: Math.sin(custom * 2) * 180 - 90,
    scale: 0,
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.1,
      ease: easeInOut,
    },
  },
};
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
