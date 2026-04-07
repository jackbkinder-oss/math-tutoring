import React from 'react';
import { BlockMath } from 'react-katex';
import { animations } from './MathAnimations';

const AnimationGallery = () => {
  const goBack = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('routeChange'));
  };

  return (
    <section style={styles.section}>
      <div className="container">
        <button className="btn-secondary" onClick={goBack} style={styles.backBtn}>
          ← Back to Main Menu
        </button>

        <h1 style={styles.title}>All Math Animations ({animations.length})</h1>
        <p style={styles.subtitle}>Each page refresh randomly picks 2 of these for the loading screen and hero.</p>

        <div style={styles.grid}>
          {animations.map((anim, i) => (
            <div key={anim.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.index}>#{i + 1}</span>
                <span style={styles.cardTitle}>{anim.label}</span>
              </div>
              <div style={styles.svgWrap}>
                <anim.Component size={300} />
              </div>
              {anim.equation && (
                <div style={styles.eqWrap}>
                  <BlockMath math={anim.equation} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { padding: '8rem 0 4rem', backgroundColor: 'var(--color-beige)', minHeight: '100vh' },
  backBtn: { marginBottom: '2rem', padding: '0.5rem 1rem', fontSize: '0.9rem' },
  title: { fontSize: '3rem', color: 'var(--color-brown-dark)', marginBottom: '0.5rem' },
  subtitle: { fontSize: '1.1rem', fontWeight: '500', marginBottom: '3rem', opacity: 0.7 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' },
  card: { border: '4px solid var(--color-brown)', backgroundColor: 'var(--color-beige)', display: 'flex', flexDirection: 'column' },
  cardHeader: { borderBottom: '4px solid var(--color-brown)', padding: '1rem 1.5rem', backgroundColor: 'var(--color-brown)', color: 'var(--color-beige)', display: 'flex', alignItems: 'center', gap: '1rem' },
  index: { fontFamily: 'monospace', fontSize: '0.85rem', opacity: 0.7 },
  cardTitle: { fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px' },
  svgWrap: { padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' },
  eqWrap: { borderTop: '2px solid var(--color-brown)', padding: '1rem', textAlign: 'center' },
};

export default AnimationGallery;
