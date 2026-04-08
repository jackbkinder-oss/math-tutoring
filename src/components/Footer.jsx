import React from 'react';
import { InlineMath } from './KaTeX';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.col}>
          <div style={styles.logo}>
            <InlineMath math="\mathbb{K}" />INDER
          </div>
          <p style={styles.text}>
            <InlineMath math="\mathbb{U}" />tilitarian learning for complex problems.
          </p>
        </div>
        <div style={styles.col}>
          <h4 style={styles.heading}>Links</h4>
          <a href="#" style={styles.link}>Tutoring</a>
          <a href="#" style={styles.link}>Courses</a>
          <a href="#" style={styles.link}>Login</a>
        </div>
        <div style={styles.col}>
          <h4 style={styles.heading}>Contact</h4>
          <p style={styles.text}>Sydney, Australia</p>
          <a href="mailto:hello@mathsys.com" style={styles.link}>hello@Kindermath.com</a>
        </div>
      </div>
      <div style={styles.bottom}>
        <div className="container">
          <p style={styles.copyright}>&copy; {new Date().getFullYear()} Kinder Math. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--color-brown)',
    color: 'var(--color-beige)',
    paddingTop: '4rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '2rem',
    paddingBottom: '3rem',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    minWidth: '200px',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--color-yellow)',
    marginBottom: '0.5rem',
    letterSpacing: '-0.05em',
  },
  heading: {
    color: 'var(--color-yellow)',
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
  },
  text: {
    color: 'var(--color-beige)',
    margin: 0,
    opacity: 0.9,
  },
  link: {
    color: 'var(--color-beige)',
    textDecoration: 'none',
    opacity: 0.9,
    fontSize: '0.95rem',
  },
  bottom: {
    borderTop: '2px solid rgba(245, 240, 230, 0.2)',
    padding: '1.5rem 0',
  },
  copyright: {
    margin: 0,
    fontSize: '0.85rem',
    opacity: 0.7,
    textAlign: 'center',
  }
};

export default Footer;
