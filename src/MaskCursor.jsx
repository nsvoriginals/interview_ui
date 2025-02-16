import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const MaskCursor = () => {
  const cursorSize = 100; // Cursor size
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="mask-cursor"
      style={{
        width: cursorSize,
        height: cursorSize,
        x: cursorX, 
        y: cursorY,
        translateX: `-${cursorSize / 2}px`, // Centering the cursor
        translateY: `-${cursorSize / 2}px`
      }}
    />
  );
};

export default MaskCursor;
