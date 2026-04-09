import React, { useRef } from 'react';
import { InlineMath, BlockMath } from './KaTeX';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

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

const Hero = ({ appReady, selected }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityFade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const handleBooking = () => window.dispatchEvent(new Event('openBooking'));

  const scrollToCoursesBtn = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('routeChange'));
      setTimeout(executeScroll, 100);
    } else {
      executeScroll();
    }
  };

  const executeScroll = () => {
    const el = document.getElementById('take-me-there-btn');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('highlight-pulse');
      setTimeout(() => el.classList.remove('highlight-pulse'), 1800);
    }
  };

  const LeftAnim = selected[0];
  const RightAnim = selected[1];

  return (
    <section ref={containerRef} className="hero" style={styles.hero}>
      {/* Always visible — left animation */}
      <div id="wave-target" className="math-hero-anim hide-on-mobile" style={styles.leftAnim}>
        <LeftAnim.Component size={350} />
        <div style={styles.animLabel}>
          <div style={styles.labelTag}>{LeftAnim.label}</div>
          {LeftAnim.equation && (
            <div style={{ marginTop: '0.5rem', transform: 'scale(1.2)' }}>
              <BlockMath math={LeftAnim.equation} />
            </div>
          )}
        </div>
      </div>

      {/* Always visible — right animation */}
      <div id="quant-target" className="math-hero-anim hide-on-mobile" style={styles.rightAnim}>
        <RightAnim.Component size={350} />
        <div style={styles.animLabel}>
          <div style={styles.labelTag}>{RightAnim.label}</div>
          {RightAnim.equation && (
            <div style={{ marginTop: '0.5rem', transform: 'scale(1.2)' }}>
              <BlockMath math={RightAnim.equation} />
            </div>
          )}
        </div>
      </div>

      {/* Always visible — floating equations background */}
      <div style={styles.equationsLayer}>
        {equationPositions.map((item, i) => (
          <motion.div
            key={i}
            style={{ position: 'absolute', top: item.top, left: item.left, color: 'var(--color-brown)', fontSize: '1rem', whiteSpace: 'nowrap' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.15, 0.15, 0], y: [10, 0, 0, -10] }}
            transition={{ duration: 4, delay: item.delay, repeat: Infinity, repeatDelay: 2 }}
          >
            <InlineMath math={item.eq} />
          </motion.div>
        ))}
      </div>

      {/* Fades in — hero content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={appReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        style={{ display: 'contents' }}
      >
        <motion.div
          className="container"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', y: parallaxY, opacity: opacityFade }}
        >
          <div style={styles.titleWrapper}>
            <svg width="100%" height="auto" viewBox="0 0 1000 200" style={{ maxWidth: '1000px' }}>
              <text x="500" y="140" textAnchor="middle" fontSize="120" fontWeight="800" fontFamily="var(--font-primary)" fill="transparent" stroke="var(--color-brown)" strokeWidth="4" className="animated-text">Master your Math</text>
              <text x="500" y="140" textAnchor="middle" fontSize="120" fontWeight="800" fontFamily="var(--font-primary)" fill="var(--color-brown-dark)" className="animated-text-fill">Master your Math</text>
            </svg>
          </div>
          <div className="fade-in-delayed" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={styles.subheadline}>
              <InlineMath math="\mathbb{E}" />xpert local tutoring with Jack Kinder and premium digital courses designed to make calculus, linear algebra, and advanced math click.
            </p>
            <div style={styles.badgeWrapper}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={styles.discountBadge}>10% OFF CASH</div>
                <div style={styles.discountBadge}>20% OFF BTC ₿</div>
              </div>
            </div>
            <div style={styles.buttonGroup}>
              <MagneticButton><button className="btn-primary" onClick={handleBooking}>Book a Tutoring Session</button></MagneticButton>
              <MagneticButton><button className="btn-secondary" onClick={scrollToCoursesBtn}>Browse Courses</button></MagneticButton>
            </div>
          </div>
        </motion.div>
        <div style={styles.marqueeContainer}>
          <motion.div style={styles.marqueeTrack} animate={{ x: ['0%', '-50%'] }} transition={{ ease: 'linear', duration: 10, repeat: Infinity }}>
            <div style={styles.marqueeContent}><InlineMath math="\mathbb{K}" />INDER MATH • EXPERT TUTORING • DIGITAL COURSES • <InlineMath math="\mathbb{K}" />INDER MATH • EXPERT TUTORING • DIGITAL COURSES • <InlineMath math="\mathbb{K}" />INDER MATH • EXPERT TUTORING • DIGITAL COURSES •</div>
            <div style={styles.marqueeContent}><InlineMath math="\mathbb{K}" />INDER MATH • EXPERT TUTORING • DIGITAL COURSES • <InlineMath math="\mathbb{K}" />INDER MATH • EXPERT TUTORING • DIGITAL COURSES • <InlineMath math="\mathbb{K}" />INDER MATH • EXPERT TUTORING • DIGITAL COURSES •</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const styles = {
  hero: { paddingTop: '6rem', backgroundColor: 'var(--color-beige)', borderBottom: '2px solid var(--color-brown)', textAlign: 'center', position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  leftAnim: { position: 'absolute', left: '5%', top: '10%', opacity: 0.9, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'scale(0.8)' },
  rightAnim: { position: 'absolute', right: '5%', top: '15%', opacity: 0.9, zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'scale(0.85)', pointerEvents: 'none' },
  animLabel: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-1rem', backgroundColor: 'var(--color-beige)', padding: '0.5rem 1rem', pointerEvents: 'none' },
  labelTag: { fontFamily: 'monospace', color: 'var(--color-brown-dark)', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', borderBottom: '2px solid var(--color-brown)', paddingBottom: '0.2rem' },
  titleWrapper: { width: '100%', marginBottom: '2rem' },
  subheadline: { fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: '500', maxWidth: '600px' },
  badgeWrapper: { marginBottom: '1.5rem' },
  discountBadge: { backgroundColor: 'var(--color-brown-dark)', color: 'var(--color-yellow)', padding: '0.5rem 1rem', fontWeight: '800', fontSize: '0.9rem', display: 'inline-block', letterSpacing: '1px', border: '2px solid var(--color-yellow)' },
  buttonGroup: { display: 'flex', gap: '1.5rem' },
  marqueeContainer: { borderTop: '2px solid var(--color-brown)', width: '100vw', position: 'absolute', bottom: 0, left: 0, backgroundColor: 'var(--color-yellow)', display: 'flex', overflow: 'hidden', padding: '0.75rem 0' },
  marqueeTrack: { display: 'flex', whiteSpace: 'nowrap', width: 'max-content' },
  marqueeContent: { fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-brown-dark)', display: 'inline-block', paddingRight: '1rem' },
  equationsLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 },
};

export default Hero;
