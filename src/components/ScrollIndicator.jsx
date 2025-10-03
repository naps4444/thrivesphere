"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollIndicator({ style: customStyle = {} }) {
  const { scrollYProgress } = useScroll();

  // Default style for the scroll indicator without glow
  const defaultStyle = {
    scaleX: scrollYProgress,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "8px",
    originX: 0,
    backgroundColor: "#CCC193", // default color
    zIndex: 9999,
    borderRadius: "4px",
  };

  return <motion.div id="scroll-indicator" style={{ ...defaultStyle, ...customStyle }} />;
}
