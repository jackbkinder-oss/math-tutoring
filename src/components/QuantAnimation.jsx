import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Box-Muller transform for generating standard normally distributed random numbers
const boxMullerRandom = () => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

const QuantAnimation = () => {

  const Y2K_COLORS = [
    '#8B6B4A', // Brown
    '#cb4a4a', // Muted Red
    '#4a6bcb', // Muted Blue
    '#4acb6b', // Muted Green
    '#cb9e4a'  // Muted Yellow Ochre
  ];

  /* 
   * Geometrically construct authentic Brownian Motion paths & Terminal PDF
   * S_t = S_{t-1} + \mu \Delta t + \sigma W_t
   */
  const { walks, bellPath, finalMu } = useMemo(() => {
    const generated = [];
    const S0 = 175; // Initial asset price (SVG Y-axis center)
    const mu = S0;
    const drift = 0; // Pure Random Walk
    const volatility = 6; // Sigma
    const steps = 100;
    const maxX = 320;
    const minX = 10;
    
    // Simulate 55 independent standard stochastic paths
    for (let w = 0; w < 55; w++) {
      let y = S0;
      const pts = [`${minX},${y}`];
      
      for (let step = 1; step <= steps; step++) {
        // True stochastic jump mapped to coordinates
        y += drift + volatility * boxMullerRandom();
        
        // Add a soft mean-reversion pull towards the center if drifting too far off SVG
        if (y < 20 || y > 330) {
            y += (S0 - y) * 0.1;
        }

        const x = minX + (step / steps) * (maxX - minX);
        pts.push(`${x},${y}`);
      }
      
      // Store the color index alongside the path to cycle through Y2K_COLORS
      generated.push({ path: `M ${pts.join(' L ')}`, colorIndex: w % 5 });
    }

    // Now, mathematically compute the theoretical Normal Distribution 
    // representing the final probability density at step=100.
    const expectedMu = S0 + drift * steps;
    const expectedSigma = volatility * Math.sqrt(steps); // variance scales with time

    const bPts = [];
    // Max PDF density is directly at expectedMu
    const maxDensity = 1 / (Math.sqrt(2 * Math.PI) * expectedSigma);

    for(let y = 0; y <= 350; y += 2) {
      // PDF of Normal Distribution N(mu, sigma^2)
      const density = (1 / (Math.sqrt(2 * Math.PI) * expectedSigma)) * Math.exp(-Math.pow(y - expectedMu, 2) / (2 * Math.pow(expectedSigma, 2)));
      
      // Map density to the X-axis right to left (Max curve depth = 110 pixels)
      const x = maxX - (density / maxDensity) * 110; 
      bPts.push(`${x},${y}`);
    }
    const bellDensity = `M ${maxX},0 L ${bPts.join(' L ')} L ${maxX},350 Z`;

    return { walks: generated, bellPath: bellDensity, finalMu: expectedMu };
  }, []);

  return (
    <div id="quant-target" className="math-hero-anim hide-on-mobile" style={styles.container}>
      <svg width="350" height="350" viewBox="0 0 350 350">
        
        {/* XY Axis Constraints */}
        <path d="M 20 330 L 330 330 M 20 20 L 20 330" fill="none" stroke="var(--color-brown)" strokeWidth="3" opacity="0.3" />
        
        {/* Mean Trajectory Line */}
        <path d={`M 10 175 L 320 ${finalMu}`} fill="none" stroke="var(--color-brown)" strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
        
        {/* Lognormal/Gaussian Density PDF */}
        <motion.path 
          d={bellPath} 
          fill="var(--color-brown)" 
          opacity="0.15" 
          stroke="var(--color-brown)" 
          strokeWidth="2"
        />

        {/* 55 Distinct Stochastic Realizations */}
        {walks.map((wObj, idx) => (
          <motion.path
            key={idx}
            d={wObj.path}
            fill="none"
            stroke={Y2K_COLORS[wObj.colorIndex]}
            strokeWidth={idx === 0 ? '3' : '0.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4 + Math.random(), // Stagger slightly
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: Math.random() * 2
            }}
          />
        ))}

      </svg>
      <div style={styles.equationBlock}>
        <div style={styles.label}>[ GEOMETRIC BROWNIAN MOTION ]</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    right: '5%',
    top: '15%',
    opacity: 0.9,
    pointerEvents: 'none',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'scale(0.85)',
  },
  equationBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '-1rem',
    backgroundColor: 'var(--color-beige)',
    padding: '0.5rem 1rem',
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

export default QuantAnimation;
