import React, { useState, useEffect } from 'react';
import { InlineMath } from './KaTeX';
import { motion } from 'framer-motion';

const PaymentTerms = () => {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goBack = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('routeChange'));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.section}
    >
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button className="btn-secondary" onClick={goBack} style={styles.backBtn}>
          ← Back
        </button>

        <h1 style={styles.title}>
          <InlineMath math="\mathbb{P}" />ayment Options
        </h1>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Cash Payment</h2>
          </div>
          <div style={styles.cardBody}>
            <p style={styles.text}>Cash is accepted for <strong>in-person sessions only</strong>.</p>
            <ol style={styles.list}>
              <li style={styles.listItem}>Email <a href="mailto:jackbkinder@gmail.com" style={styles.link}>jackbkinder@gmail.com</a> to arrange your session</li>
              <li style={styles.listItem}>Bring $89 in cash to your session (10% off)</li>
            </ol>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Bitcoin Payment</h2>
          </div>
          <div style={styles.cardBody}>
            <p style={styles.text}>Available for both in-person and online sessions.</p>
            <ol style={styles.list}>
              <li style={styles.listItem}>Email <a href="mailto:jackbkinder@gmail.com?subject=Single Session - Bitcoin Payment" style={styles.link}>jackbkinder@gmail.com</a> to arrange your session</li>
              <li style={styles.listItem}>You will receive a BTC address to send payment to</li>
              <li style={styles.listItem}>Once payment is confirmed on-chain, your session is booked</li>
            </ol>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{...styles.cardHeader, backgroundColor: 'var(--color-yellow)'}}>
            <h2 style={{...styles.cardTitle, color: 'var(--color-brown-dark)'}}>Cancellation Policy</h2>
          </div>
          <div style={styles.cardBody}>
            <p style={{...styles.text, fontWeight: '700', marginBottom: '1.5rem'}}>
              All bookings require a minimum of 24 hours notice for cancellation or rescheduling.
            </p>

            <h3 style={styles.subheading}>BTC Sessions</h3>
            <p style={styles.text}>
              Cancellations with less than 24 hours notice are <strong>non-refundable</strong>. The full $89 fee is forfeited.
            </p>

            <h3 style={styles.subheading}>In-Person Cash Sessions</h3>
            <p style={styles.text}>
              If you cancel an in-person cash session with less than 24 hours notice, you must either:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Pay $89 via online bank transfer before your next session, <strong>OR</strong></li>
              <li style={styles.listItem}>Pay double ($178) in cash at your next in-person session to cover both the missed and upcoming session</li>
            </ul>
          </div>
        </div>

        <div style={styles.agreementBox}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={styles.checkbox}
            />
            I have read and agree to the above payment terms and cancellation policy.
          </label>
          <a
            href="mailto:jackbkinder@gmail.com?subject=Session Booking - Cash/BTC Payment&body=Hi Jack,%0A%0AI'd like to book a session and pay via [Cash/Bitcoin].%0A%0AI have read and agreed to the cancellation policy.%0A%0APreferred date/time:%0ASubject:%0A"
            className="btn-primary"
            style={{
              ...styles.contactBtn,
              opacity: agreed ? 1 : 0.4,
              pointerEvents: agreed ? 'auto' : 'none',
            }}
          >
            Contact Jack to Book
          </a>
        </div>
      </div>
    </motion.section>
  );
};

const styles = {
  section: {
    padding: '8rem 0',
    backgroundColor: 'var(--color-beige)',
    minHeight: '100vh',
  },
  backBtn: {
    marginBottom: '2rem',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
  },
  title: {
    fontSize: '3rem',
    color: 'var(--color-brown-dark)',
    marginBottom: '3rem',
  },
  card: {
    border: '4px solid var(--color-brown)',
    marginBottom: '2rem',
  },
  cardHeader: {
    padding: '1.25rem 1.5rem',
    backgroundColor: 'var(--color-brown)',
    borderBottom: '4px solid var(--color-brown)',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.3rem',
    color: 'var(--color-beige)',
  },
  cardBody: {
    padding: '2rem',
  },
  text: {
    fontWeight: '500',
    marginBottom: '1rem',
    lineHeight: '1.6',
  },
  subheading: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
    color: 'var(--color-brown-dark)',
  },
  list: {
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
  },
  listItem: {
    marginBottom: '0.75rem',
    fontWeight: '500',
    lineHeight: '1.6',
  },
  link: {
    color: 'var(--color-brown-dark)',
    fontWeight: '700',
  },
  agreementBox: {
    border: '4px solid var(--color-brown)',
    padding: '2rem',
    marginTop: '2rem',
    backgroundColor: 'var(--color-beige)',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    marginTop: '2px',
    accentColor: 'var(--color-brown-dark)',
  },
  contactBtn: {
    width: '100%',
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  },
};

export default PaymentTerms;
