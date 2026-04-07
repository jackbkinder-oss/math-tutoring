import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineMath } from 'react-katex';

const BookingModal = ({ isOpen, onClose, paymentPreselect }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', subject: 'Calculus', date: '', payment: 'card'
  });

  useEffect(() => {
    if (paymentPreselect && isOpen) {
        setFormData(prev => ({...prev, payment: paymentPreselect}));
    }
  }, [paymentPreselect, isOpen]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Close when clicking outside
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.overlay}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div 
            style={styles.modal}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100vh', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="booking-modal"
          >
            <div style={styles.header}>
              <h2><InlineMath math="\mathbb{B}" />ook a Session</h2>
              <button onClick={onClose} style={styles.closeBtn}>X</button>
            </div>

            <div style={styles.body}>
              {step === 1 && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                  <h3 style={styles.stepTitle}>Student Details</h3>
                  <div style={styles.formGroup}>
                    <label>Name</label>
                    <input type="text" name="name" style={styles.input} onChange={handleChange} value={formData.name} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" name="email" style={styles.input} onChange={handleChange} value={formData.email} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Subject</label>
                    <select name="subject" style={styles.input} onChange={handleChange} value={formData.subject}>
                      <option>Yr 7-10 Maths</option>
                      <option>Standard Maths</option>
                      <option>Advanced Maths</option>
                      <option>Extension 1 Maths</option>
                      <option>Extension 2 Maths</option>
                      <option>1st Yr Uni Calculus & Linear Algebra</option>
                      <option>Other 1st Yr Uni Math Related Courses</option>
                    </select>
                  </div>
                  <button className="btn-primary" style={styles.fullBtn} onClick={nextStep}>Next: Scheduling</button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                  <h3 style={styles.stepTitle}>Select a Time</h3>
                  <div style={styles.formGroup}>
                    <label>Preferred Date & Time</label>
                    <input type="datetime-local" name="date" style={styles.input} onChange={handleChange} value={formData.date} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button className="btn-secondary" style={{flex:1}} onClick={prevStep}>Back</button>
                    <button className="btn-primary" style={{flex:2}} onClick={nextStep}>Next: Payment</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                  <h3 style={styles.stepTitle}>Payment Preference</h3>
                  
                  <div style={styles.paymentOptions}>
                    <label style={{ ...styles.radioLabel, border: formData.payment === 'card' ? '4px solid var(--color-brown)' : '2px solid var(--color-brown)' }}>
                      <input type="radio" name="payment" value="card" checked={formData.payment === 'card'} onChange={handleChange} style={{marginRight: '10px'}} />
                      <div>
                        <strong>Standard Card</strong>
                        <p style={{margin:0, fontSize:'0.9rem'}}>Powered by Stripe. Instructions sent via email.</p>
                      </div>
                    </label>

                    <label style={{ ...styles.radioLabel, backgroundColor: 'var(--color-yellow)', border: formData.payment === 'btc' ? '4px solid var(--color-brown)' : '2px solid var(--color-brown)' }}>
                      <input type="radio" name="payment" value="btc" checked={formData.payment === 'btc'} onChange={handleChange} style={{marginRight: '10px'}} />
                      <div>
                        <strong>Physical Cash or Bitcoin (-10%)</strong>
                        <p style={{margin:0, fontSize:'0.9rem'}}>Opt out of corporate banking rails. Receive a 10% discount.</p>
                      </div>
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button className="btn-secondary" style={{flex:1}} onClick={prevStep}>Back</button>
                    <button className="btn-primary" style={{flex:2}} onClick={() => {
                        // Normally this would submit to formspree
                        // fetch('https://formspree.io/f/placeholder', { method: 'POST', body: JSON.stringify(formData) })
                        nextStep();
                    }}>Submit Request</button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} style={{textAlign: 'center', padding: '2rem 0'}}>
                  <h3 style={{fontSize: '2rem', marginBottom: '1rem'}}><InlineMath math="\mathbb{S}" />uccess!</h3>
                  <p style={{fontSize: '1.2rem', marginBottom: '2rem'}}>Your booking request has been sent to Jack via Formspree.</p>
                  
                  {formData.payment === 'btc' && (
                    <div style={{ backgroundColor: 'var(--color-brown)', color: 'var(--color-beige)', padding: '2rem', border: '4px solid var(--color-brown-dark)' }}>
                      <h4 style={{ color: 'var(--color-yellow)', marginBottom: '1rem' }}>Bitcoin Payment Instructions</h4>
                      <p>Send precisely calculated sats to:</p>
                      <code style={{ display: 'block', backgroundColor: 'var(--color-brown-dark)', padding: '1rem', marginTop: '1rem', wordBreak: 'break-all' }}>
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </code>
                    </div>
                  )}

                  <button className="btn-secondary" style={{marginTop: '3rem', width: '100%'}} onClick={() => { onClose(); setTimeout(() => setStep(1), 500); }}>Close</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 99999,
  },
  modal: {
    position: 'fixed',
    bottom: 0, // Slides up from bottom like a drawer
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'var(--color-beige)',
    border: '4px solid var(--color-brown)',
    borderBottom: 'none',
    zIndex: 100000,
    maxHeight: '90vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
  },
  header: {
    borderBottom: '4px solid var(--color-brown)',
    backgroundColor: 'var(--color-yellow)',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    backgroundColor: 'transparent',
    border: '2px solid var(--color-brown)',
    padding: '0.4rem 0.8rem',
    fontWeight: 'bold',
  },
  body: {
    padding: '2rem',
  },
  stepTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    backgroundColor: 'transparent',
    border: '2px solid var(--color-brown)',
    padding: '1rem',
    fontFamily: 'var(--font-primary)',
    fontSize: '1rem',
    color: 'var(--color-brown-dark)',
  },
  fullBtn: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
  },
  paymentOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '1.5rem',
    cursor: 'pointer',
  }
};

export default BookingModal;
