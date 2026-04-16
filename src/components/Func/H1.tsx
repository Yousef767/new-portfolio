import { easeInOut, motion } from "framer-motion";
import type { Variants } from "framer-motion";

type VariantType = "chaos" | "slide" | "blur" | "pop";

export default function H1({
  text,
  variant = "pop",
}: {
  text: string;
  variant?: VariantType;
}) {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.045,
      },
    },
  };

  const variantsMap: Record<VariantType, Variants> = {
    chaos: {
      hidden: () => ({
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
    },

    slide: {
      hidden: {
        opacity: 0,
        y: 60,
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: easeInOut,
        },
      },
    },

    blur: {
      hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
      },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.6,
          ease: easeInOut,
        },
      },
    },

    pop: {
      hidden: {
        opacity: 0,
        scale: 0.5,
        y: 20,
      },
      show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring" as const,
          stiffness: 400,
          damping: 15,
        },
      },
    },
  };

  const letter = variantsMap[variant];

  return (
    <motion.h1
      className="h1"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        lineHeight: 1.2,
      }}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            display: "flex",
            marginRight: "10px",
          }}
        >
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              variants={letter}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
