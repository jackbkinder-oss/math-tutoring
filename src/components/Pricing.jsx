import React from 'react';
import { InlineMath } from './KaTeX';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const navigateToPayment = () => {
  window.history.pushState({}, '', '/payment');
  window.dispatchEvent(new Event('routeChange'));
  window.scrollTo(0, 0);
};

const packages = [
  { name: 'Single Session', desc: 'One-off targeted intensive.', sessions: 1, price: 99, savings: null },
  { name: '3-Session Pack', desc: 'Build momentum over weeks.', sessions: 3, price: 297, savings: null },
  { name: '5-Session Pack', desc: 'Commit to real progress.', sessions: 5, price: 470, savings: '5% Off' },
  { name: '10-Session Bundle', desc: 'Master the entire syllabus term.', sessions: 10, price: 891, savings: '1 Free' },
];

const Pricing = () => {
  return (
    <section id="pricing" style={styles.section}>
      <div className="container">
        <motion.h2
          style={styles.title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <InlineMath math="\mathbb{I}" />nvestment Plans
        </motion.h2>

        <div style={styles.grid}>
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              style={{
                ...styles.card,
                ...(i === 3 ? { backgroundColor: 'var(--color-yellow)' } : {}),
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            >
              <div style={{
                ...styles.cardTop,
                ...(i === 3 ? { backgroundColor: 'var(--color-yellow)', borderBottom: '4px solid var(--color-brown)' } : {}),
              }}>
                <h3 style={styles.planName}>{pkg.name}</h3>
                <p style={styles.planDesc}>{pkg.desc}</p>
                <div style={styles.priceContainer}>
                  <span style={styles.currency}>$</span>
                  <span style={styles.amount}>{pkg.price}</span>
                  {pkg.savings && (
                    <span style={styles.savings}>{pkg.savings}</span>
                  )}
                </div>
              </div>
              <div style={{
                ...styles.cardBottom,
                ...(i === 3 ? { backgroundColor: 'var(--color-beige)' } : {}),
              }}>
                <MagneticButton style={{ width: '100%' }}>
                  <button
                    className="btn-primary"
                    style={{ width: '100%' }}
                    onClick={navigateToPayment}
                  >
                    Get Started
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '8rem 0',
    backgroundColor: 'var(--color-beige)',
    borderBottom: '2px solid var(--color-brown)',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '4rem',
    textAlign: 'center',
    letterSpacing: '-0.02em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '2rem',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  card: {
    border: '4px solid var(--color-brown)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--color-beige)',
  },
  cardTop: {
    padding: '2.5rem 1.5rem',
    borderBottom: '4px solid var(--color-brown)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  planName: {
    fontSize: '1.5rem',
    margin: 0,
  },
  planDesc: {
    fontWeight: '500',
    opacity: 0.8,
    marginBottom: '2rem',
    fontSize: '0.9rem',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  currency: {
    fontSize: '1.75rem',
    fontWeight: '800',
    marginTop: '0.5rem',
  },
  amount: {
    fontSize: '4rem',
    fontWeight: '800',
    lineHeight: '1',
    letterSpacing: '-0.05em',
  },
  savings: {
    backgroundColor: 'var(--color-brown-dark)',
    color: 'var(--color-beige)',
    padding: '0.25rem 0.5rem',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    alignSelf: 'center',
    marginLeft: '0.75rem',
  },
  cardBottom: {
    padding: '1.5rem',
    backgroundColor: 'var(--color-beige)',
  },
};

export default Pricing;
