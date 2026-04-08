import React, { useState, useEffect } from 'react';
import { InlineMath } from './KaTeX';
import { motion } from 'framer-motion';

const packages = [
  { name: '1 Session', standard: 99, cash: 89, btc: 79 },
  { name: '3 Sessions', standard: 297, cash: 267, btc: 238 },
  { name: '5 Sessions', standard: 470, cash: 423, btc: 376 },
  { name: '10 Sessions', standard: 891, cash: 802, btc: 713 },
];

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

        {/* Pricing Table */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Pricing</h2>
          </div>
          <div style={styles.cardBody}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Package</th>
                  <th style={styles.th}>Standard</th>
                  <th style={styles.th}>Cash (-10%)</th>
                  <th style={styles.th}>BTC (-20%)</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.name}>
                    <td style={styles.td}><strong>{pkg.name}</strong></td>
                    <td style={styles.td}>${pkg.standard}</td>
                    <td style={styles.td}>${pkg.cash}</td>
                    <td style={styles.td}>${pkg.btc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How It Works */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>How It Works</h2>
          </div>
          <div style={styles.cardBody}>
            <ol style={styles.list}>
              <li style={styles.listItem}><strong>Choose your package</strong> and payment method below</li>
              <li style={styles.listItem}><strong>Complete payment</strong> via your chosen method</li>
              <li style={styles.listItem}><strong>Receive a booking link</strong> to schedule your session(s) at a time that suits you</li>
            </ol>
          </div>
        </div>

        {/* Standard / Stripe */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Standard Payment (Stripe)</h2>
          </div>
          <div style={styles.cardBody}>
            <p style={styles.text}>Pay securely online via credit/debit card.</p>
            <p style={styles.text}>After payment, you'll receive an email with a link to book your session(s).</p>
            <p style={{...styles.text, fontStyle: 'italic', opacity: 0.7}}>Stripe Payment Links coming soon — for now, email to arrange.</p>
          </div>
        </div>

        {/* Cash */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Cash Payment (-10%)</h2>
          </div>
          <div style={styles.cardBody}>
            <p style={styles.text}>Cash is accepted for <strong>in-person sessions only</strong>.</p>
            <ol style={styles.list}>
              <li style={styles.listItem}>Email <a href="mailto:jackbkinder@gmail.com" style={styles.link}>jackbkinder@gmail.com</a> to arrange your session(s)</li>
              <li style={styles.listItem}>Bring the cash amount to your first session</li>
            </ol>
          </div>
        </div>

        {/* Bitcoin */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Bitcoin Payment (-20%)</h2>
          </div>
          <div style={styles.cardBody}>
            <p style={styles.text}>Available for both in-person and online sessions.</p>
            <ol style={styles.list}>
              <li style={styles.listItem}>Email <a href="mailto:jackbkinder@gmail.com?subject=Bitcoin Payment Enquiry" style={styles.link}>jackbkinder@gmail.com</a> to arrange your session(s)</li>
              <li style={styles.listItem}>You will receive a BTC address to send payment to</li>
              <li style={styles.listItem}>Once payment is confirmed on-chain, you'll receive a booking link</li>
            </ol>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div style={styles.card}>
          <div style={{...styles.cardHeader, backgroundColor: 'var(--color-yellow)'}}>
            <h2 style={{...styles.cardTitle, color: 'var(--color-brown-dark)'}}>Cancellation Policy</h2>
          </div>
          <div style={styles.cardBody}>
            <p style={{...styles.text, fontWeight: '700', marginBottom: '1.5rem'}}>
              All bookings require a minimum of 24 hours notice for cancellation or rescheduling.
            </p>

            <h3 style={styles.subheading}>Standard / BTC Sessions</h3>
            <p style={styles.text}>
              Cancellations with less than 24 hours notice are <strong>non-refundable</strong>. The session fee is forfeited.
            </p>

            <h3 style={styles.subheading}>In-Person Cash Sessions</h3>
            <p style={styles.text}>
              If you cancel an in-person cash session with less than 24 hours notice, you must either:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Pay $99 via online bank transfer before your next session, <strong>OR</strong></li>
              <li style={styles.listItem}>Pay double in cash at your next in-person session to cover both the missed and upcoming session</li>
            </ul>
          </div>
        </div>

        {/* Agreement */}
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
            href="mailto:jackbkinder@gmail.com?subject=Session Booking Enquiry&body=Hi Jack,%0A%0AI'd like to book sessions and pay via [Standard/Cash/Bitcoin].%0A%0APackage: [1/3/5/10 sessions]%0A%0AI have read and agreed to the payment terms and cancellation policy.%0A%0APreferred day/time:%0ASubject:%0A"
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: '3px solid var(--color-brown)',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid var(--color-brown)',
    fontWeight: '500',
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
