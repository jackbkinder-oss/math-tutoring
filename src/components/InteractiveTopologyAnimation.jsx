import React, { useState, useEffect, useMemo } from 'react';
import { BlockMath } from 'react-katex';

const InteractiveTopologyAnimation = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frame;
    let t = 0;
    const animate = () => {
      t += 0.02;
      setTime(t);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const pathData = useMemo(() => {
    const paths = [];
    const limit = 6;
    const res = 30;
    const originX = 175;
    const originY = 175;
    const scale = 20;

    const project = (x, y, z) => {
      const isoX = (x - y) * Math.cos(Math.PI / 6);
      const isoY = (x + y) * Math.sin(Math.PI / 6) - z;
      return { px: originX + isoX * scale, py: originY + isoY * scale };
    };

    for (let i = 0; i <= res; i++) {
      const x = -limit + (i / res) * (limit * 2);
      const lPts = [];
      for (let j = 0; j <= res; j++) {
        const y = -limit + (j / res) * (limit * 2);
        const z = Math.cos(x + time) * Math.sin(y + time) * 1.5;
        const { px, py } = project(x, y, z);
        lPts.push(`${px},${py}`);
      }
      paths.push(`M ${lPts.join(' L ')}`);
    }
    for (let j = 0; j <= res; j++) {
      const y = -limit + (j / res) * (limit * 2);
      const lPts = [];
      for (let i = 0; i <= res; i++) {
        const x = -limit + (i / res) * (limit * 2);
        const z = Math.cos(x + time) * Math.sin(y + time) * 1.5;
        const { px, py } = project(x, y, z);
        lPts.push(`${px},${py}`);
      }
      paths.push(`M ${lPts.join(' L ')}`);
    }
    return paths;
  }, [time]);

  return (
    <div id="wave-target" className="math-hero-anim hide-on-mobile" style={styles.container}>
      <svg width="350" height="350" viewBox="0 0 350 350">
        {pathData.map((d, index) => (
          <path
            key={index}
            d={d}
            fill="none"
            stroke="var(--color-brown)"
            strokeWidth="0.8"
            opacity="0.8"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <div style={styles.equationBlock}>
        <div style={styles.label}>[ DYNAMIC SINE SURFACE ]</div>
        <div style={{ marginTop: '0.5rem', transform: 'scale(1.2)' }}>
          <BlockMath math="Z = \cos(x) \sin(y)" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    left: '5%',
    top: '10%',
    opacity: 0.9,
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'scale(0.8)',
  },
  equationBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '-1rem',
    backgroundColor: 'var(--color-beige)',
    padding: '0.5rem 1rem',
    pointerEvents: 'none',
  },
  label: {
    fontFamily: 'monospace',
    color: 'var(--color-brown-dark)',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    borderBottom: '2px solid var(--color-brown)',
    paddingBottom: '0.2rem',
  }
};

export default InteractiveTopologyAnimation;
