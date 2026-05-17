import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (animationCallback, deps = []) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      animationCallback(element, gsap, ScrollTrigger);
    }, element);

    return () => ctx.revert();
  }, deps);

  return ref;
};

export default useScrollAnimation;
