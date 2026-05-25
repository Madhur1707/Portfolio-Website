import { useEffect, useState } from 'react';
 
/**
 * Cycles through `phrases`, typing each one out and then deleting it.
 *
 * @param {object} props
 * @param {string[]} props.phrases
 * @param {number} [props.typeSpeed=80]
 * @param {number} [props.deleteSpeed=40]
 * @param {number} [props.pause=1500]
 * @param {string} [props.className]
 */
export default function Typewriter({
  phrases,
  typeSpeed = 75,
  deleteSpeed = 40,
  pause = 1400,
  className = '',
}) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
 
  useEffect(() => {
    if (!phrases || phrases.length === 0) return undefined;
 
    const current = phrases[index % phrases.length];
    let timeout;
 
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
 
    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, pause]);
 
  return (
    <span className={className}>
      {text}
      <span
        aria-hidden="true"
        className="inline-block w-[0.6ch] -mb-[2px] ml-0.5 bg-neon-green animate-blink-caret"
        style={{ height: '0.9em', verticalAlign: 'baseline' }}
      />
    </span>
  );
}
 