import { motion } from 'framer-motion';

const GoldDivider = ({ className = '', width = 'w-24' }) => {
  return (
    <motion.div
      className={`${width} h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    />
  );
};

export default GoldDivider;
