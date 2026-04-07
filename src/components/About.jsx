import React from 'react';
import { InlineMath } from 'react-katex';

const About = () => {
  return (
    <section id="about" style={styles.section}>
      <div className="container" style={styles.container}>
        <h2 style={styles.heading}>
          <InlineMath math="\mathbb{A}" />bout Jack Kinder
        </h2>
        <div style={styles.textBox}>
          <p style={styles.paragraph}>
            [Placeholder: Replace this text with your personal bio, teaching philosophy, and background. 
            Highlight your expertise in translating complex university mathematics into intuitive concepts.]
          </p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '6rem 0',
    backgroundColor: 'var(--color-yellow)',
    borderBottom: '2px solid var(--color-brown)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  heading: {
    fontFamily: 'var(--font-primary)',
    fontSize: '3rem',
    color: 'var(--color-brown-dark)',
    marginBottom: '2rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderBottom: '4px solid var(--color-brown-dark)',
    display: 'inline-block',
  },
  textBox: {
    maxWidth: '800px',
    backgroundColor: 'var(--color-beige)',
    padding: '2.5rem',
    border: '2px solid var(--color-brown)',
  },
  paragraph: {
    fontSize: '1.25rem',
    lineHeight: '1.8',
    color: 'var(--color-brown-dark)',
    margin: 0,
    fontWeight: '500',
  }
};

export default About;
