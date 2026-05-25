import { useEffect, useState } from 'react';
 
/**
 * Returns the id of the section currently in the viewport.
 * Uses IntersectionObserver against the provided section ids.
 *
 * @param {string[]} sectionIds  Section element ids to observe.
 * @param {object} [options]
 * @param {string} [options.rootMargin]  Top/bottom margin tuning for activation.
 * @returns {string} active section id
 */
export default function useActiveSection(sectionIds, options = {}) {
  const { rootMargin = '-40% 0px -55% 0px' } = options;
  const [active, setActive] = useState(sectionIds[0] || '');
 
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
 
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
 
    if (elements.length === 0) return undefined;
 
    const visibility = new Map();
 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.intersectionRatio);
        });
 
        // Pick the section with the largest visibility ratio that's currently visible.
        let bestId = active;
        let bestRatio = -1;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestRatio > 0 && bestId) setActive(bestId);
      },
      {
        rootMargin,
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      }
    );
 
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join('|'), rootMargin]);
 
  return active;
}
 