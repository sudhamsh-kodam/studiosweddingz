import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '', label }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-playfair text-display-lg text-gradient-gold mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      {label && (
        <p className="font-cormorant text-ivory/60 text-lg tracking-wide uppercase">
          {label}
        </p>
      )}
    </div>
  );
};

export default AnimatedCounter;
