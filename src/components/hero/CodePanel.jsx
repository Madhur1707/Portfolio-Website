import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { devConfig } from '../../data/portfolioData';
 
/**
 * Animated VS-Code-style panel that types the developer config line-by-line.
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
 
  // simple JS-flavored token highlighter
  const colorize = (line) => {
    const parts = [];
    let rest = line;
 
    const patterns = [
      { re: /^(\s*\/\/.*)$/, cls: 'text-white/35 italic' },
      { re: /^(\s*)(const|let|var|export|default|return|import|from)\b/, cls: 'text-neon-purple' },
    ];
 
    // simple per-character coloring instead — fast enough for short config
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
      // word
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
      // comment
      if (line[i] === '/' && line[i + 1] === '/') {
        tokens.push({ text: line.slice(i), cls: 'text-white/35 italic' });
        break;
      }
      tokens.push({ text: line[i], cls: 'text-white/55' });
      i++;
    }
    return tokens;
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      className="relative glass neon-border rounded-xl overflow-hidden"
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-neon-orange/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-neon-green/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/80" />
        </div>
        <span className="font-mono text-[11px] text-white/50 tracking-wider">
          {devConfig.filename}
        </span>
        <span className="font-mono text-[11px] text-neon-green/80">JS</span>
      </div>
 
      {/* Body */}
      <pre className="relative font-mono text-[13px] sm:text-sm leading-relaxed px-5 py-5 overflow-x-auto">
        {lines.map((_, i) => {
          const line = renderedLines[i] || '';
          const isCurrent = i === lineIdx;
          const tokens = colorize(line);
          return (
            <div key={i} className="flex gap-4">
              <span className="select-none text-white/25 w-5 text-right">
                {i + 1}
              </span>
              <code className="whitespace-pre">
                {tokens.map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))}
                {isCurrent && (
                  <span className="inline-block w-[7px] h-[1.05em] -mb-[2px] bg-neon-green ml-[1px] animate-blink-caret align-baseline" />
                )}
              </code>
            </div>
          );
        })}
      </pre>
 
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-white/[0.02] font-mono text-[11px] text-white/55">
        <div className="flex items-center gap-3">
          <span className="text-neon-green">● live</span>
          <span>main</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>LF</span>
          <span>Ln {Math.min(lineIdx + 1, lines.length)}, Col {Math.max(charIdx, 0)}</span>
        </div>
      </div>
    </motion.div>
  );
}
 