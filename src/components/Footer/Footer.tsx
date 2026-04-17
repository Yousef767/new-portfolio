import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Footer() {
  const ref = useRef(null);

  // track scroll relative to footer
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // different speeds (parallax effect)
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={ref} style={{ position: "relative"}}>
      <motion.img
        src="/footer.svg"
        alt="footer-img"
        className="footerImg"
        style={{
          y: yBg,
        }}
      />

      <motion.img
        src="/footerPhone.svg"
        alt="footer-img"
        className="footerImgPhone"
        style={{
          y: yPhone,
        }}
      />
    </div>
  );
}

export default Footer;