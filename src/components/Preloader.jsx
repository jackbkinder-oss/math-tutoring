import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineMath, BlockMath } from './KaTeX';

const EQUATIONS = [
  "e^{i\\pi} + 1 = 0",
  "\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}",
  "\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}",
  "\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}",
  "\\frac{d}{dx} e^x = e^x",
  "\\det(A - \\lambda I) = 0",
  "\\mathbb{P}(A|B) = \\frac{\\mathbb{P}(B|A)\\mathbb{P}(A)}{\\mathbb{P}(B)}",
  "\\oint \\mathbf{F} \\cdot d\\mathbf{r} = \\iint (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}",
  "\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}",
  "\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i x \\xi} dx",
  "a^2 + b^2 = c^2",
  "\\Gamma(n) = (n-1)!",
  "\\nabla^2 \\phi = 0",
  "\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u",
];

const equationPositions = EQUATIONS.map((eq, i) => ({
  eq,
  top: `${5 + (i % 7) * 13}%`,
  left: `${3 + ((i * 17 + 7) % 90)}%`,
  delay: i * 0.15,
}));

const Preloader = ({ onComplete, selected }) => {
  const [stage, setStage] = useState(0);
  const [leftTarget, setLeftTarget] = useState({ x: 0, y: 0, scale: 1 });
  const [rightTarget, setRightTarget] = useState({ x: 0, y: 0, scale: 1 });
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const measureTimer = setTimeout(() => {
      const measure = (ref, destId, setter) => {
        const el = ref.current;
        const dest = document.getElementById(destId);
        if (el && dest) {
          const from = el.getBoundingClientRect();
          const to = dest.getBoundingClientRect();
          setter({
            x: (to.left + to.width / 2) - (from.left + from.width / 2),
            y: (to.top + to.height / 2) - (from.top + from.height / 2),
            scale: to.width / from.width,
          });
        }
      };
      measure(leftRef, 'wave-target', setLeftTarget);
      measure(rightRef, 'quant-target', setRightTarget);
    }, 50);

    const timer1 = setTimeout(() => setStage(1), 800);
    const timer2 = setTimeout(() => setStage(2), 2000);
    const timer3 = setTimeout(() => setStage(3), 3200);
    const timer4 = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(measureTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LeftAnim = selected[0];
  const RightAnim = selected[1];

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          key="preloader"
          style={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Floating LaTeX equations */}
          <div style={styles.equationsLayer}>
            {equationPositions.map((item, i) => (
              <motion.div
                key={i}
                style={{ ...styles.equation, top: item.top, left: item.left }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 0.25, 0.25, 0], y: [10, 0, 0, -10] }}
                transition={{ duration: 3, delay: item.delay, repeat: Infinity, repeatDelay: 1 }}
              >
                <InlineMath math={item.eq} />
              </motion.div>
            ))}
          </div>

          {/* Both animations side by side */}
          <div style={styles.animationsRow}>
            {/* Left animation */}
            <motion.div
              ref={leftRef}
              style={styles.animationItem}
              initial={{ x: 0, y: 0, scale: 1 }}
              animate={stage >= 2 ? leftTarget : { x: 0, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <LeftAnim.Component size={400} />
              <motion.div
                style={styles.labelBlock}
                initial={{ opacity: 0 }}
                animate={stage >= 2 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: stage >= 2 ? 0.3 : 0 }}
              >
                <div style={styles.eqLabel}>{LeftAnim.label}</div>
                {LeftAnim.equation && (
                  <div style={{ marginTop: '0.5rem', transform: 'scale(1.2)' }}>
                    <BlockMath math={LeftAnim.equation} />
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Right animation */}
            <motion.div
              ref={rightRef}
              style={styles.animationItem}
              initial={{ x: 0, y: 0, scale: 1 }}
              animate={stage >= 2 ? rightTarget : { x: 0, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: stage >= 2 ? 0.1 : 0, ease: [0.19, 1, 0.22, 1] }}
            >
              <RightAnim.Component size={400} />
              <motion.div
                style={styles.labelBlock}
                initial={{ opacity: 0 }}
                animate={stage >= 2 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: stage >= 2 ? 0.4 : 0 }}
              >
                <div style={styles.eqLabel}>{RightAnim.label}</div>
                {RightAnim.equation && (
                  <div style={{ marginTop: '0.5rem', transform: 'scale(1.2)' }}>
                    <BlockMath math={RightAnim.equation} />
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'var(--color-beige)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999, overflow: 'hidden' },
  animationsRow: { display: 'flex', alignItems: 'center', gap: '3rem', zIndex: 2, pointerEvents: 'none' },
  animationItem: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  equationsLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 },
  equation: { position: 'absolute', color: 'var(--color-brown)', fontSize: '1rem', whiteSpace: 'nowrap' },
  labelBlock: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-1rem', backgroundColor: 'var(--color-beige)', padding: '0.5rem 1rem', pointerEvents: 'none' },
  eqLabel: { fontFamily: 'monospace', color: 'var(--color-brown-dark)', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', borderBottom: '2px solid var(--color-brown)', paddingBottom: '0.2rem' },
};

export default Preloader;
