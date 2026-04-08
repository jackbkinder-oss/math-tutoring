import React from 'react';
import { InlineMath } from './KaTeX';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

import { openCalBooking } from './BookingModal';

const Services = () => {
  const handleBooking = () => openCalBooking('single-session-99');

  return (
    <section id="services" style={styles.section}>
      <div className="container">
        <motion.h2 
          style={styles.sectionTitle}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <InlineMath math="\mathbb{O}" />ur Services
        </motion.h2>
        <div style={styles.grid}>
          
          <motion.div 
            style={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                <InlineMath math="\mathbb{L}" />ocal 1-on-1 Tutoring
              </h3>
            </div>
            <div style={styles.cardBody}>
              <p style={styles.description}>
                <InlineMath math="\mathbb{P}" />ersonalized instruction tailored exactly to your learning style. We break down the most complex university and high school topics.
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>✓ Yr 7-10, Standard & Advanced</li>
                <li style={styles.listItem}>✓ Extension 1 & Extension 2 Maths</li>
                <li style={styles.listItem}>✓ 1st Yr Uni Calculus & Linear Alg.</li>
                <li style={styles.listItem}>✓ Other 1st Yr Uni Math Related Courses</li>
              </ul>
              <div style={styles.integrityBox}>
                <strong>🚫 ACADEMIC INTEGRITY:</strong> I am here to teach. I WILL NOT do your assignments for you.
              </div>
              <MagneticButton style={{ width: '100%' }}>
                <button className="btn-primary" style={styles.button} onClick={handleBooking}>Book Session</button>
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div 
            style={{...styles.card, backgroundColor: 'var(--color-yellow)'}}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                <InlineMath math="\mathbb{S}" />elf-Paced Digital Courses
              </h3>
            </div>
            <div style={styles.cardBody}>
              <p style={styles.description}>
                <InlineMath math="\mathbb{P}" />remium, highly visual video series. We use custom animations and pure logic to make abstract concepts instantly intuitive.
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>✓ Comprehensive topic modules</li>
                <li style={styles.listItem}>✓ Step-by-step visual learning</li>
                <li style={styles.listItem}>✓ Practice problem sets</li>
                <li style={styles.listItem}>✓ Lifetime access</li>
              </ul>
              <MagneticButton style={{ width: '100%' }}>
                <button 
                  id="take-me-there-btn"
                  className="btn-secondary" 
                  style={styles.button} 
                  onClick={() => {
                    window.history.pushState({}, '', '/courses');
                    window.dispatchEvent(new Event('routeChange'));
                    window.scrollTo(0,0);
                  }}
                >
                  Take me There
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
  sectionTitle: {
    fontSize: '2.5rem',
    marginBottom: '4rem',
    textAlign: 'center',
    letterSpacing: '-0.02em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    border: '4px solid var(--color-brown)',
    backgroundColor: 'var(--color-beige)',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    borderBottom: '4px solid var(--color-brown)',
    padding: '1.5rem',
    backgroundColor: 'var(--color-brown)',
    color: 'var(--color-beige)',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.4rem',
    color: 'var(--color-beige)',
  },
  cardBody: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  description: {
    marginBottom: '1.5rem',
    fontWeight: '500',
  },
  list: {
    listStyle: 'none',
    marginBottom: '1.5rem',
    flex: '1',
  },
  listItem: {
    marginBottom: '0.75rem',
    fontWeight: '600',
  },
  integrityBox: {
    padding: '1rem',
    backgroundColor: 'var(--color-yellow)',
    border: '2px solid var(--color-brown-dark)',
    marginBottom: '1.5rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--color-brown-dark)',
  },
  button: {
    width: '100%',
  }
};

export default Services;
