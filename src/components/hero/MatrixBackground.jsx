import { useEffect, useRef } from 'react';
 
/**
 * Matrix-style falling glyphs rendered on a canvas.
 * Rendered as an absolutely positioned background — keep it inside a
 * `position: relative` container with `overflow: hidden`.
 */
export default function MatrixBackground({ density = 18, opacity = 0.55 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
 
    let width = 0;
    let height = 0;
    let columns = [];
    const fontSize = density;
    const glyphs =
      '01アカサタナハマヤラワ◇<>{}[]=+#$@&*<>/';
 
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 
      const colCount = Math.floor(width / fontSize);
      columns = new Array(colCount).fill(0).map(() => Math.random() * -height);
    };
 
    resize();
    window.addEventListener('resize', resize);
 
    const draw = () => {
      // Fade trail
      ctx.fillStyle = 'rgba(6, 6, 10, 0.08)';
      ctx.fillRect(0, 0, width, height);
 
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
      for (let i = 0; i < columns.length; i++) {
        const x = i * fontSize;
        const y = columns[i];
        const char = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
 
        // Random colorized "head" with green trail
        const isHead = Math.random() > 0.975;
        ctx.fillStyle = isHead
          ? `rgba(0, 212, 255, ${opacity})`
          : `rgba(0, 255, 136, ${opacity * 0.85})`;
        ctx.fillText(char, x, y);
 
        if (y > height && Math.random() > 0.975) {
          columns[i] = 0;
        } else {
          columns[i] = y + fontSize;
        }
      }
 
      rafRef.current = requestAnimationFrame(draw);
    };
 
    rafRef.current = requestAnimationFrame(draw);
 
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [density, opacity]);
 
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)' }}
      aria-hidden="true"
    />
  );
}
 