import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../utils/animations';
import AnimatedCounter from '../../ui/AnimatedCounter';
import GoldDivider from '../../ui/GoldDivider';

const stats = [
  { end: 500, suffix: '+', label: 'Weddings Captured' },
  { end: 10, suffix: '+', label: 'Years of Excellence' },
  { end: 50, suffix: 'K+', label: 'Photos Delivered' },
  { end: 200, suffix: '+', label: 'Cinematic Films' },
];

const StatsCounter = () => {
  return (
    <section className="py-20 md:py-28 bg-noir-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.05),transparent_70%)]" />
      <div className="max-container section-padding relative z-10">
        <GoldDivider className="mb-16" width="w-32" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUp}>
              <AnimatedCounter
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </motion.div>
        <GoldDivider className="mt-16" width="w-32" />
      </div>
    </section>
  );
};

export default StatsCounter;
