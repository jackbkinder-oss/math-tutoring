import React, { useEffect } from 'react';
import { InlineMath } from 'react-katex';
import { motion } from 'framer-motion';

const Courses = () => {
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
      <div className="container">
        <button className="btn-secondary" onClick={goBack} style={styles.backBtn}>
          ← Back to Main Menu
        </button>

        <h1 style={styles.title}>
          <InlineMath math="\mathbb{O}" />nline Resources
        </h1>
        <p style={styles.subtitle}>
          More details coming soon.
        </p>

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
    fontSize: '4rem',
    color: 'var(--color-brown-dark)',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.25rem',
    fontWeight: '500',
    maxWidth: '700px',
    marginBottom: '4rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem',
  },
  card: {
    border: '4px solid var(--color-brown)',
    backgroundColor: 'var(--color-beige)',
    display: 'flex',
    flexDirection: 'column',
  },
  cardImagePlaceholder: {
    height: '200px',
    backgroundColor: 'var(--color-brown)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    color: 'var(--color-beige)',
    borderBottom: '4px solid var(--color-brown)',
  },
  cardContent: {
    padding: '2rem',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.5rem',
  },
  cardDesc: {
    flex: '1',
    marginBottom: '2rem',
    fontWeight: '500',
  }
};

export default Courses;
