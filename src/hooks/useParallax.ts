import { useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

export const useParallax = (
  range: [string, string] = ['-50px', '50px']
): { ref: React.RefObject<HTMLElement>; x: MotionValue<string> } => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], range);
  return { ref, x };
};
