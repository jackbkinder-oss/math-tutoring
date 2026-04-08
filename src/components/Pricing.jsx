import React from 'react';
import { InlineMath } from './KaTeX';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

import { openCalBooking } from './BookingModal';

const Pricing = () => {

  return (
    <section id="pricing" style={styles.section}>
      <div className="container">
        <motion.h2 
          style={styles.Title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <InlineMath math="\mathbb{I}" />nvestment Plans
        </motion.h2>
        
        <div style={styles.grid}>
          
          {/* Single Session Card */}
          <motion.div 
            style={styles.card}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div style={styles.cardTop}>
              <h3 style={styles.planName}>Single Session</h3>
              <p style={styles.planDesc}>One-off targeted 1-on-1 intensive.</p>
              <div style={styles.priceContainer}>
                <span style={styles.currency}>$</span>
                <span style={styles.amount}>99</span>
              </div>
            </div>
            <div style={styles.cardBottom}>
              <MagneticButton style={{ width: '100%' }}>
                <button className="btn-primary" style={{width: '100%'}} onClick={() => openCalBooking('single-session-99')}>
                  Book Single Session
                </button>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Bundle Card */}
          <motion.div
            style={{...styles.card, backgroundColor: 'var(--color-yellow)'}}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          >
            <div style={{...styles.cardTop, borderBottom: '4px solid var(--color-brown)', backgroundColor: 'var(--color-yellow)'}}>
              <h3 style={styles.planName}>10-Session Bundle</h3>
              <p style={styles.planDesc}>Master the entire syllabus term.</p>
              <div style={styles.priceContainer}>
                <span style={styles.currency}>$</span>
                <span style={styles.amount}>891</span>
                <span style={styles.savings}>1 Session Free</span>
              </div>
            </div>
            <div style={{...styles.cardBottom, backgroundColor: 'var(--color-beige)'}}>
              <MagneticButton style={{ width: '100%' }}>
                <button className="btn-primary" style={{width: '100%'}} onClick={() => openCalBooking('10-session-bundle')}>
                  Book 10-Session Bundle
                </button>
              </MagneticButton>
            </div>
          </motion.div>

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
  Title: {
    fontSize: '2.5rem',
    marginBottom: '4rem',
    textAlign: 'center',
    letterSpacing: '-0.02em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  card: {
    border: '4px solid var(--color-brown)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--color-beige)',
  },
  cardTop: {
    padding: '3rem 2rem',
    borderBottom: '4px solid var(--color-brown)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  planName: {
    fontSize: '1.75rem',
    marginBottom: '0.5rem',
    margin: 0,
  },
  planDesc: {
    fontWeight: '500',
    opacity: 0.8,
    marginBottom: '2rem',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  currency: {
    fontSize: '2rem',
    fontWeight: '800',
    marginTop: '0.5rem',
  },
  amount: {
    fontSize: '5rem',
    fontWeight: '800',
    lineHeight: '1',
    letterSpacing: '-0.05em',
  },
  savings: {
    backgroundColor: 'var(--color-brown-dark)',
    color: 'var(--color-beige)',
    padding: '0.25rem 0.5rem',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    alignSelf: 'center',
    marginLeft: '1rem',
  },
  cardBottom: {
    padding: '2rem',
    backgroundColor: 'var(--color-beige)',
  }
};

export default Pricing;
