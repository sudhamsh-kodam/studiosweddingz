import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';

const alignments = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
};

const SectionHeading = ({
  subtitle, title, description, align = 'center',
  light = false, className = '', maxWidth = 'max-w-3xl',
}) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`${alignments[align]} ${maxWidth} mb-6 md:mb-8 ${className}`}
    >
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="font-cormorant text-gold text-sm md:text-base uppercase tracking-[0.3em] mb-4"
        >
          {subtitle}
        </motion.p>
      )}
      {title && (
        <motion.h2
          variants={fadeUp}
          className={`font-playfair text-display ${light ? 'text-noir' : 'text-ivory'} mb-4`}
        >
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p
          variants={fadeUp}
          className={`font-inter text-sm md:text-base leading-relaxed ${
            light ? 'text-noir/60' : 'text-ivory/50'
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
