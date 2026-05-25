import { useEffect, useRef, useState } from 'react';
 
/**
 * useScrollReveal — IntersectionObserver hook for scroll-in reveal animations.
 *
 * @param {object} [options]
 * @param {number} [options.threshold=0.15]
 * @param {string} [options.rootMargin='0px 0px -10% 0px']
 * @param {boolean} [options.once=true]  Reveal once and stop observing.
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export default function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
 
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === 'undefined') return undefined;
 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );
 
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);
 
  return [ref, visible];
}
 