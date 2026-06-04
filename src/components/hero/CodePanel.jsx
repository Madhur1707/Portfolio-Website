import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { devConfig } from '../../data/portfolioData';

/**
 * Animated VS-Code-style panel that types the developer config line-by-line.
 * Mobile-responsive: no horizontal overflow, condensed chrome on small screens.
 */
export default function CodePanel() {
  const lines = devConfig.lines;
  const [renderedLines, setRenderedLines] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) return undefined;
    const current = lines[lineIdx];

    if (charIdx <= current.length) {
      const t = setTimeout(() => {
        setRenderedLines((prev) => {
          const copy = [...prev];
          copy[lineIdx] = current.slice(0, charIdx);
          return copy;
        });
        setCharIdx((c) => c + 1);
      }, 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 80);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, lines]);

  // Simple JS-flavored token highlighter
  const colorize = (line) => {
    const tokens = [];
    let i = 0;
    while (i < line.length) {
      // strings
      if (line[i] === "'") {
        const end = line.indexOf("'", i + 1);
        if (end !== -1) {
          tokens.push({ text: line.slice(i, end + 1), cls: 'text-neon-green' });
          i = end + 1;
          continue;
        }
      }
      // brackets/braces
      if ('{}[]()'.includes(line[i])) {
        tokens.push({ text: line[i], cls: 'text-neon-cyan' });
        i++;
        continue;
      }
      // words / keywords
      const m = line.slice(i).match(/^([A-Za-z_][A-Za-z0-9_]*)/);
      if (m) {
        const w = m[1];
        let cls = 'text-white/85';
        if (['const', 'let', 'var', 'export', 'default', 'return', 'import', 'from'].includes(w)) {
          cls = 'text-neon-purple';
        } else if (['true', 'false', 'null'].includes(w)) {
          cls = 'text-neon-orange';
        } else if (/^[A-Z]/.test(w)) {
          cls = 'text-neon-cyan';
        }
        tokens.push({ text: w, cls });
        i += w.length;
        continue;
      }
      // inline comments
      if (line[i] === '/' && line[i + 1] === '/') {
        tokens.push({ text: line.slice(i), cls: 'text-white/35 italic' });
        break;
      }
      tokens.push({ text: line[i], cls: 'text-white/55' });
      i++;
    }
    return tokens;
  };

  // Truncate filename so it never blows out the chrome bar on narrow screens
  const shortFilename = devConfig.filename?.length > 20
    ? '…' + devConfig.filename.slice(-18)
    : devConfig.filename;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      className="relative glass neon-border rounded-xl overflow-hidden w-full"
    >
      {/* ── Window chrome ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 bg-white/[0.02] min-w-0 gap-2">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-neon-orange/80" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-neon-green/80" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-neon-cyan/80" />
        </div>

        {/* Filename — truncates, never overflows */}
        <span className="font-mono text-[10px] sm:text-[11px] text-white/50 tracking-wider truncate min-w-0 text-center flex-1">
          {shortFilename}
        </span>

        {/* Language badge */}
        <span className="font-mono text-[10px] sm:text-[11px] text-neon-green/80 shrink-0">
          JS
        </span>
      </div>

      {/* ── Code body ───────────────────────────────────────── */}
      {/*
        Key mobile fixes:
        - No overflow-x-auto at this level (was leaking outside the card)
        - overflow-hidden keeps content clipped to the rounded card
        - Inner <pre> gets overflow-x-auto so ONLY the code area scrolls
        - Smaller horizontal padding on mobile (px-3 vs px-5)
        - Smaller font on xs (text-[11px]) scaling up
      */}
      <div className="overflow-hidden">
        <pre className="font-mono text-[11px] sm:text-[13px] leading-relaxed sm:leading-relaxed px-3 sm:px-5 py-3 sm:py-5 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {lines.map((_, i) => {
            const line = renderedLines[i] || '';
            const isCurrent = i === lineIdx;
            const tokens = colorize(line);
            return (
              <div key={i} className="flex gap-3 sm:gap-4">
                {/* Line number */}
                <span className="select-none text-white/25 w-4 sm:w-5 text-right shrink-0">
                  {i + 1}
                </span>
                {/* Code */}
                <code className="whitespace-pre min-w-0">
                  {tokens.map((t, j) => (
                    <span key={j} className={t.cls}>
                      {t.text}
                    </span>
                  ))}
                  {isCurrent && (
                    <span className="inline-block w-[6px] sm:w-[7px] h-[1.05em] -mb-[2px] bg-neon-green ml-[1px] animate-blink-caret align-baseline" />
                  )}
                </code>
              </div>
            );
          })}
        </pre>
      </div>

      {/* ── Status bar ──────────────────────────────────────── */}
      {/*
        Mobile: hide the UTF-8 / LF labels, keep only the essentials.
        Wrap is prevented by using hidden sm:inline on verbose items.
      */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 border-t border-white/10 bg-white/[0.02] font-mono text-[10px] sm:text-[11px] text-white/55 min-w-0 gap-2">
        {/* Left cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="text-neon-green">● live</span>
          <span>main</span>
        </div>

        {/* Right cluster — verbose items hidden on xs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">LF</span>
          <span>
            Ln {Math.min(lineIdx + 1, lines.length)}, Col {Math.max(charIdx, 0)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}