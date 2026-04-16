import { easeInOut } from "motion";

  export const item = {
    hidden: (custom: number) => ({
      opacity: 0,
      y: 60,
      scale: 0.8,
      transition: { duration: 0.4, ease: easeInOut },
    }),
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: easeInOut },
    },
  };