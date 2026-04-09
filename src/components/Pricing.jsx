import React from 'react';
import { InlineMath } from './KaTeX';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const STRIPE_LINK = 'https://buy.stripe.com/test_bJeaEYdsf2Dv0qo7N70Ba00';

const navigateToPayment = () => {
  window.history.pushState({}, '', '/payment');
  window.dispatchEvent(new Event('routeChange'));
  window.scrollTo(0, 0);
};

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

        <div style={styles.layout}>
          {/* Left: Pricing Card */}
          <motion.div
            style={styles.card}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div style={styles.cardTop}>
              <h3 style={styles.planName}>1-on-1 Tutoring</h3>
              <div style={styles.priceContainer}>
                <span style={styles.currency}>$</span>
                <span style={styles.amount}>99</span>
                <span style={styles.perSession}>/session</span>
              </div>
              <p style={styles.discounts}>
                5+ sessions: 5% off (<strong>5PACK</strong>)
                <br />
                10+ sessions: 10% off (<strong>10PACK</strong>)
              </p>
            </div>
            <div style={styles.cardBottom}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <MagneticButton style={{ width: '100%' }}>
                  <a
                    href={STRIPE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ width: '100%', display: 'block', textAlign: 'center', textDecoration: 'none' }}
                  >
                    Pay Online (Stripe)
                  </a>
                </MagneticButton>
                <MagneticButton style={{ width: '100%' }}>
                  <button
                    className="btn-secondary"
                    style={{ width: '100%' }}
                    onClick={navigateToPayment}
                  >
                    Pay with Cash / BTC
                  </button>
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Right: Calendar */}
          <motion.div
            style={styles.calendarCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <div style={styles.calendarHeader}>
              <h3 style={styles.calendarTitle}>Available Times</h3>
            </div>
            <div style={styles.calendarBody}>
              <iframe
                src="https://calendar.google.com/calendar/embed?src=a54a3efd8277708d5283bd0c9a59bf3d41d495203053872514a20a6e801d528f%40group.calendar.google.com&ctz=Australia%2FSydney&mode=WEEK&showTitle=0&showPrint=0&showCalendars=0&showTz=0"
                style={{ border: 0, width: '100%', height: '600px' }}
                title="Availability Calendar"
              />
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
  title: {
    fontSize: '2.5rem',
    marginBottom: '4rem',
    textAlign: 'center',
    letterSpacing: '-0.02em',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '380px 1fr',
    gap: '2rem',
    alignItems: 'start',
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
    padding: '3rem 2rem',
    borderBottom: '4px solid var(--color-brown)',
    textAlign: 'center',
  },
  planName: {
    fontSize: '1.75rem',
    margin: '0 0 1rem 0',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  currency: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '0.6rem',
  },
  amount: {
    fontSize: '5rem',
    fontWeight: '800',
    lineHeight: '1',
    letterSpacing: '-0.05em',
  },
  perSession: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.6rem',
    marginLeft: '0.25rem',
    opacity: 0.6,
  },
  discounts: {
    fontSize: '0.85rem',
    fontWeight: '500',
    opacity: 0.7,
    margin: 0,
    lineHeight: '1.6',
  },
  cardBottom: {
    padding: '2rem',
    backgroundColor: 'var(--color-beige)',
  },
  calendarCard: {
    border: '4px solid var(--color-brown)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '650px',
  },
  calendarHeader: {
    padding: '1.25rem 1.5rem',
    backgroundColor: 'var(--color-brown)',
    borderBottom: '4px solid var(--color-brown)',
  },
  calendarTitle: {
    margin: 0,
    fontSize: '1.3rem',
    color: 'var(--color-beige)',
  },
  calendarBody: {
    flex: 1,
  },
};

export default Pricing;
