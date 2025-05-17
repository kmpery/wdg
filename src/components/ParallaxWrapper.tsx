import { ReactNode, FC, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxWrapperProps {
  children: ReactNode;
  range?: [string, string];
  className?: string;
}

const ParallaxWrapper: FC<ParallaxWrapperProps> = ({
  children,
  range = ['-40px', '40px'],
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x: MotionValue<string> = useTransform(scrollYProgress, [0, 1], range);

  return (
    <motion.div ref={ref} style={{ x }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxWrapper;
