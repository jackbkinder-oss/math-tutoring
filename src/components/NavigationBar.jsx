import React from 'react';
import { motion } from 'framer-motion';
import { InlineMath } from 'react-katex';

const navigateTo = (e, path) => {
  e.preventDefault();
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('routeChange'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const NavigationBar = ({ appReady }) => {
  return (
    <motion.nav
      className="navbar"
      style={styles.navbar}
      initial={{ opacity: 0, y: -20 }}
      animate={appReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="container" style={styles.container}>
        <a href="/" style={styles.logo} onClick={(e) => navigateTo(e, '/')}>
          <InlineMath math="\mathbb{K}" />
        </a>
        <div className="nav-links" style={styles.navLinks}>
          <a href="/tutoring" style={styles.link} onClick={(e) => navigateTo(e, '/tutoring')}>Tutoring</a>
          <a href="/courses" style={styles.link} onClick={(e) => navigateTo(e, '/courses')}>Online Resources</a>
          <span style={styles.disabledLink}>K-Tools <span style={styles.comingSoon}>Coming Soon!</span></span>
          <a href="#login" style={styles.loginBtn}>Login</a>
        </div>
      </div>
    </motion.nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'var(--color-beige)',
    borderBottom: '2px solid var(--color-brown)',
    padding: '1.5rem 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: '800',
    letterSpacing: '-0.05em',
    color: 'var(--color-brown-dark)',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  disabledLink: {
    fontWeight: '600',
    fontSize: '1rem',
    color: '#bbb',
    cursor: 'default',
  },
  comingSoon: {
    fontSize: '0.7rem',
    fontStyle: 'italic',
    color: '#ccc',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  link: {
    fontWeight: '600',
    fontSize: '1rem',
  },
  loginBtn: {
    border: '2px solid var(--color-brown-dark)',
    padding: '0.5rem 1rem',
    fontWeight: '700',
    transition: 'background-color 0.2s',
  }
};

export default NavigationBar;
