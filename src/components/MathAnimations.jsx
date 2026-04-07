import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// ── Helpers ──────────────────────────────────────────────
// Throttled animation timer — updates at ~30fps instead of 60 to halve CPU
const useAnimTime = (speed = 0.02) => {
  const [t, setT] = useState(0);
  const timeRef = useRef(0);
  const lastUpdate = useRef(0);
  useEffect(() => {
    let frame;
    const tick = (now) => {
      timeRef.current += speed;
      // Only trigger React re-render every ~33ms (30fps)
      if (now - lastUpdate.current > 33) {
        lastUpdate.current = now;
        setT(timeRef.current);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return t;
};

const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
const boxMuller = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const CLR = ['#8B6B4A', '#cb4a4a', '#4a6bcb', '#4acb6b', '#cb9e4a'];
const BR = 'var(--color-brown)';
// Pre-compute constants
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);
const PI2 = Math.PI * 2;
const SQRT3_2 = Math.sqrt(3) / 2;

// ── 1. Sine Surface ─────────────────────────────────────
const SineSurface = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.03);
  const paths = useMemo(() => {
    const r = [], n = 22, o = 175, s = 20, lim = 6, step = 12 / n;
    for (let dir = 0; dir < 2; dir++) {
      for (let i = 0; i <= n; i++) {
        const pts = [];
        for (let j = 0; j <= n; j++) {
          const a = -lim + i * step, b = -lim + j * step;
          const [x, y] = dir ? [b, a] : [a, b];
          const z = Math.cos(x + t) * Math.sin(y + t) * 1.5;
          pts.push(`${o + (x - y) * COS30 * s},${o + ((x + y) * SIN30 - z) * s}`);
        }
        r.push(`M ${pts.join(' L ')}`);
      }
    }
    return r;
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      {paths.map((d, i) => <path key={i} d={d} fill="none" stroke={BR} strokeWidth="0.8" opacity="0.8" strokeLinejoin="round" />)}
    </svg>
  );
});

// ── 2. Brownian Motion ──────────────────────────────────
const BrownianMotion = React.memo(({ size = 350 }) => {
  const data = useMemo(() => {
    const walks = [], S0 = 175, vol = 6, steps = 80, maxX = 320, minX = 10;
    for (let w = 0; w < 30; w++) {
      let y = S0; const pts = [`${minX},${y}`];
      for (let s = 1; s <= steps; s++) {
        y += vol * boxMuller();
        if (y < 20 || y > 330) y += (S0 - y) * 0.1;
        pts.push(`${minX + (s / steps) * (maxX - minX)},${y}`);
      }
      walks.push({ d: `M ${pts.join(' L ')}`, ci: w % 5, dur: 4 + (w * 0.037) % 1.5, del: (w * 0.13) % 2 });
    }
    const mu = S0, sig = vol * Math.sqrt(steps), maxD = 1 / (Math.sqrt(PI2) * sig);
    const bPts = [];
    for (let y = 0; y <= 350; y += 4) {
      const d = (1 / (Math.sqrt(PI2) * sig)) * Math.exp(-Math.pow(y - mu, 2) / (2 * Math.pow(sig, 2)));
      bPts.push(`${maxX - (d / maxD) * 110},${y}`);
    }
    return { walks, bell: `M ${maxX},0 L ${bPts.join(' L ')} L ${maxX},350 Z`, mu };
  }, []);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d="M 20 330 L 330 330 M 20 20 L 20 330" fill="none" stroke={BR} strokeWidth="3" opacity="0.3" />
      <path d={`M 10 175 L 320 ${data.mu}`} fill="none" stroke={BR} strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
      <path d={data.bell} fill={BR} opacity="0.15" stroke={BR} strokeWidth="2" />
      {data.walks.map((w, i) => (
        <motion.path key={i} d={w.d} fill="none" stroke={CLR[w.ci]} strokeWidth={i === 0 ? '3' : '0.5'} strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: w.dur, ease: 'linear', repeat: Infinity, repeatType: 'loop', repeatDelay: w.del }} />
      ))}
    </svg>
  );
});

// ── 3. Lorenz Attractor ─────────────────────────────────
const LorenzAttractor = React.memo(({ size = 350 }) => {
  const path = useMemo(() => {
    let x = 1, y = 1, z = 1; const dt = 0.005, pts = [];
    for (let i = 0; i < 5000; i++) {
      const dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - (8 / 3) * z;
      x += dx * dt; y += dy * dt; z += dz * dt;
      pts.push(`${175 + x * 4},${340 - z * 6.5}`);
    }
    return `M ${pts.join(' L ')}`;
  }, []);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <motion.path d={path} fill="none" stroke={BR} strokeWidth="0.6" opacity="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'loop' }} />
    </svg>
  );
});

// ── 4. Lissajous Curve ──────────────────────────────────
const LissajousCurve = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.01);
  const d = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 400; i++) {
      const th = i * 0.016;
      pts.push(`${175 + 130 * Math.sin(3 * (th + t) + Math.PI / 2)},${175 + 130 * Math.sin(2 * (th + t))}`);
    }
    return `M ${pts.join(' L ')}`;
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d={d} fill="none" stroke={BR} strokeWidth="1.2" opacity="0.8" strokeLinejoin="round" />
    </svg>
  );
});

// ── 5. Rose Curve ───────────────────────────────────────
const RoseCurve = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.012);
  const d = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 500; i++) {
      const th = (i / 500) * PI2 * 5;
      const r = 140 * Math.cos(5 * (th + t));
      pts.push(`${175 + r * Math.cos(th)},${175 + r * Math.sin(th)}`);
    }
    return `M ${pts.join(' L ')}`;
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d={d} fill="none" stroke={BR} strokeWidth="0.8" opacity="0.8" />
    </svg>
  );
});

// ── 6. Spirograph (Epitrochoid) ─────────────────────────
const Spirograph = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.008);
  const d = useMemo(() => {
    const R = 80, r = 30, dd = 60, ratio = (R + r) / r, pts = [];
    for (let i = 0; i <= 1200; i++) {
      const th = (i / 1200) * 20 * Math.PI + t;
      pts.push(`${175 + (R + r) * Math.cos(th) - dd * Math.cos(ratio * th)},${175 + (R + r) * Math.sin(th) - dd * Math.sin(ratio * th)}`);
    }
    return `M ${pts.join(' L ')}`;
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d={d} fill="none" stroke={BR} strokeWidth="0.6" opacity="0.8" />
    </svg>
  );
});

// ── 7. Fourier Square Wave ──────────────────────────────
const FourierSquareWave = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.015);
  const paths = useMemo(() => {
    const r = [];
    const sq = [];
    for (let px = 10; px <= 340; px += 3) {
      sq.push(`${px},${175 - Math.sign(Math.sin(((px - 175) / 55) + t)) * 70}`);
    }
    r.push({ d: `M ${sq.join(' L ')}`, op: 0.2, dash: '4 4', sw: 1.5 });
    for (const n of [1, 3, 7, 21]) {
      const pts = [];
      for (let px = 10; px <= 340; px += 3) {
        const x = ((px - 175) / 55);
        let y = 0;
        for (let k = 0; k < n; k++) { const h = 2 * k + 1; y += Math.sin(h * (x + t)) / h; }
        pts.push(`${px},${175 - y * (4 / Math.PI) * 70}`);
      }
      r.push({ d: `M ${pts.join(' L ')}`, op: n === 21 ? 0.9 : 0.15 + n * 0.04, sw: n === 21 ? 1.5 : 0.8 });
    }
    return r;
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d="M 10 175 L 340 175" fill="none" stroke={BR} strokeWidth="0.5" opacity="0.2" />
      {paths.map((p, i) => <path key={i} d={p.d} fill="none" stroke={BR} strokeWidth={p.sw} opacity={p.op} strokeDasharray={p.dash} strokeLinejoin="round" />)}
    </svg>
  );
});

// ── 8. Fundamental Theorem of Calculus ───────────────────
const FundamentalTheorem = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.008);
  const { curvePath, areaPath, bars } = useMemo(() => {
    const f = (x) => 0.4 * x * x * x - 2 * x * x + 2.5 * x + 2;
    const xMax = 5;
    const mapX = (x) => 30 + (x / xMax) * 300;
    const mapY = (y) => 290 - y * 55;
    const cPts = [];
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * xMax;
      cPts.push(`${mapX(x)},${mapY(f(x))}`);
    }
    const bound = (t * 1.2) % 5.5;
    const upperX = Math.min(bound, xMax);
    const numBars = 15;
    const barW = upperX / numBars;
    const barPaths = [];
    for (let i = 0; i < numBars && barW > 0.01; i++) {
      const bx = i * barW;
      const bh = f(bx + barW / 2);
      if (bh > 0) {
        const x1 = mapX(bx), x2 = mapX(bx + barW), yB = mapY(0), yT = mapY(bh);
        barPaths.push(`M ${x1},${yB} L ${x1},${yT} L ${x2},${yT} L ${x2},${yB} Z`);
      }
    }
    const aPts = [`${mapX(0)},${mapY(0)}`];
    for (let i = 0; i <= 50; i++) {
      const x = (i / 50) * upperX;
      aPts.push(`${mapX(x)},${mapY(f(x))}`);
    }
    aPts.push(`${mapX(upperX)},${mapY(0)}`);
    return { curvePath: `M ${cPts.join(' L ')}`, areaPath: `M ${aPts.join(' L ')} Z`, bars: barPaths };
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d="M 30 290 L 335 290 M 30 20 L 30 290" fill="none" stroke={BR} strokeWidth="1.5" opacity="0.3" />
      {bars.map((d, i) => <path key={i} d={d} fill={BR} opacity="0.12" stroke={BR} strokeWidth="0.5" />)}
      <path d={areaPath} fill={BR} opacity="0.08" />
      <path d={curvePath} fill="none" stroke={BR} strokeWidth="2" opacity="0.9" />
    </svg>
  );
});

// ── 9. Vector Projection ────────────────────────────────
const VectorProjection = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.012);
  const data = useMemo(() => {
    const ox = 60, oy = 280, sc = 28;
    const bx = 8, by = -3;
    const angle = t * 0.7;
    const ax = 4.5 * Math.cos(angle), ay = -4.5 * Math.sin(angle) - 2;
    const scalar = (ax * bx + ay * by) / (bx * bx + by * by);
    const px = scalar * bx, py = scalar * by;
    const svgA = { x: ox + ax * sc, y: oy + ay * sc };
    const svgB = { x: ox + bx * sc, y: oy + by * sc };
    const svgP = { x: ox + px * sc, y: oy + py * sc };
    const svgO = { x: ox, y: oy };
    // Right angle marker
    const dx = svgA.x - svgP.x, dy = svgA.y - svgP.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    let ra = null;
    if (len > 5) {
      const ux = dx / len * 12, uy = dy / len * 12;
      const bdx = svgB.x - ox, bdy = svgB.y - oy;
      const bl = Math.sqrt(bdx * bdx + bdy * bdy);
      const vx = bdx / bl * 12, vy = bdy / bl * 12;
      ra = `M ${svgP.x + ux},${svgP.y + uy} L ${svgP.x + ux + vx},${svgP.y + uy + vy} L ${svgP.x + vx},${svgP.y + vy}`;
    }
    return { svgA, svgB, svgP, svgO, ra };
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <defs>
        <marker id="pa-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill={BR} opacity="0.7" /></marker>
        <marker id="pa-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#cb4a4a" opacity="0.7" /></marker>
        <marker id="pa-u" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4a6bcb" opacity="0.8" /></marker>
        <marker id="pa-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4acb6b" opacity="0.8" /></marker>
      </defs>
      <path d="M 40 290 L 330 290 M 60 310 L 60 30" fill="none" stroke={BR} strokeWidth="0.5" opacity="0.15" />
      <line x1={data.svgO.x} y1={data.svgO.y} x2={data.svgB.x} y2={data.svgB.y} stroke={BR} strokeWidth="2.5" opacity="0.7" markerEnd="url(#pa-b)" />
      <line x1={data.svgO.x - 10} y1={data.svgO.y + 10 * 3 / 8} x2={data.svgB.x + 30} y2={data.svgB.y - 30 * 3 / 8} stroke={BR} strokeWidth="0.8" opacity="0.15" strokeDasharray="5 4" />
      <line x1={data.svgO.x} y1={data.svgO.y} x2={data.svgA.x} y2={data.svgA.y} stroke="#cb4a4a" strokeWidth="2.5" opacity="0.7" markerEnd="url(#pa-r)" />
      <line x1={data.svgO.x} y1={data.svgO.y} x2={data.svgP.x} y2={data.svgP.y} stroke="#4a6bcb" strokeWidth="2.5" opacity="0.8" markerEnd="url(#pa-u)" />
      <line x1={data.svgP.x} y1={data.svgP.y} x2={data.svgA.x} y2={data.svgA.y} stroke="#4acb6b" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 3" markerEnd="url(#pa-g)" />
      {data.ra && <path d={data.ra} fill="none" stroke={BR} strokeWidth="1" opacity="0.5" />}
      <text x={data.svgB.x + 5} y={data.svgB.y - 8} fontSize="16" fontWeight="800" fill={BR} opacity="0.7">b</text>
      <text x={data.svgA.x + 5} y={data.svgA.y - 8} fontSize="16" fontWeight="800" fill="#cb4a4a" opacity="0.7">a</text>
      <text x={data.svgP.x - 5} y={data.svgP.y + 20} fontSize="13" fontWeight="700" fill="#4a6bcb" opacity="0.8">proj</text>
    </svg>
  );
});

// ── 10. Pendulum Phase Portrait ─────────────────────────
const PendulumPhase = React.memo(({ size = 350 }) => {
  const paths = useMemo(() => {
    const r = [];
    for (let E = -0.8; E < 2.5; E += 0.3) {
      const top = [], bot = [];
      for (let th = -Math.PI; th <= Math.PI; th += 0.05) {
        const val = 2 * (E + Math.cos(th));
        if (val > 0) {
          const w = Math.sqrt(val), px = 175 + th * 48, py1 = 175 - w * 45, py2 = 175 + w * 45;
          if (px > 10 && px < 340) { top.push(`${px},${py1}`); bot.push(`${px},${py2}`); }
        }
      }
      const isSep = Math.abs(E - 1) < 0.16;
      if (top.length > 1) r.push({ d: `M ${top.join(' L ')}`, sw: isSep ? 1.5 : 0.8, dash: isSep ? '5 3' : undefined });
      if (bot.length > 1) r.push({ d: `M ${bot.join(' L ')}`, sw: isSep ? 1.5 : 0.8, dash: isSep ? '5 3' : undefined });
    }
    return r;
  }, []);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d="M 10 175 L 340 175 M 175 10 L 175 340" fill="none" stroke={BR} strokeWidth="0.5" opacity="0.2" />
      {paths.map((p, i) => (
        <motion.path key={i} d={p.d} fill="none" stroke={BR} strokeWidth={p.sw} opacity="0.7" strokeDasharray={p.dash}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 3 + i * 0.15, ease: 'linear', repeat: Infinity, repeatType: 'loop', repeatDelay: 0.5 }} />
      ))}
    </svg>
  );
});

// ── 11. Damped Harmonic Oscillator ──────────────────────
const DampedOscillator = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.03);
  const paths = useMemo(() => {
    const r = [], gamma = 0.15, omega = 2;
    const pts = [], envU = [], envL = [];
    for (let px = 10; px <= 340; px += 2) {
      const x = (px - 10) / 33;
      const env = Math.exp(-gamma * x);
      pts.push(`${px},${175 - env * Math.cos(omega * (x + t)) * 120}`);
      const e120 = env * 120;
      envU.push(`${px},${175 - e120}`);
      envL.push(`${px},${175 + e120}`);
    }
    r.push({ d: `M ${pts.join(' L ')}`, sw: 1.5, op: 0.9 });
    r.push({ d: `M ${envU.join(' L ')}`, sw: 0.8, op: 0.3, dash: '4 4' });
    r.push({ d: `M ${envL.join(' L ')}`, sw: 0.8, op: 0.3, dash: '4 4' });
    return r;
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d="M 10 175 L 340 175" fill="none" stroke={BR} strokeWidth="0.5" opacity="0.2" />
      {paths.map((p, i) => <path key={i} d={p.d} fill="none" stroke={BR} strokeWidth={p.sw} opacity={p.op} strokeDasharray={p.dash} strokeLinejoin="round" />)}
    </svg>
  );
});

// ── 12. Butterfly Curve ─────────────────────────────────
const ButterflyCurve = React.memo(({ size = 350 }) => {
  const path = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 1500; i++) {
      const t = (i / 1500) * 12 * Math.PI;
      const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin(t / 12), 5);
      pts.push(`${175 + r * Math.sin(t) * 35},${175 - r * Math.cos(t) * 35}`);
    }
    return `M ${pts.join(' L ')}`;
  }, []);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <motion.path d={path} fill="none" stroke={BR} strokeWidth="0.8" opacity="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'loop' }} />
    </svg>
  );
});

// ── 13. Cardioid ────────────────────────────────────────
const Cardioid = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.02);
  const d = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 300; i++) {
      const th = (i / 300) * PI2;
      const r = 110 * (1 + Math.cos(th + t));
      pts.push(`${175 + r * Math.cos(th)},${175 + r * Math.sin(th)}`);
    }
    return `M ${pts.join(' L ')} Z`;
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d={d} fill="none" stroke={BR} strokeWidth="1" opacity="0.8" />
    </svg>
  );
});

// ── 14. Wave Interference ───────────────────────────────
const WaveInterference = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.06);
  const circles = useMemo(() => {
    const r = [], sources = [[120, 175], [230, 175]], wl = 30;
    for (const [sx, sy] of sources) {
      for (let rad = (t * wl) % wl; rad < 350; rad += wl) {
        r.push({ cx: sx, cy: sy, r: rad });
      }
    }
    return r;
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      {circles.map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke={BR} strokeWidth="0.8" opacity="0.25" />)}
    </svg>
  );
});

// ── 15. Hypotrochoid ────────────────────────────────────
const Hypotrochoid = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.006);
  const d = useMemo(() => {
    const R = 100, r = 37, dd = 55, ratio = (R - r) / r, pts = [];
    for (let i = 0; i <= 1500; i++) {
      const th = (i / 1500) * 37 * Math.PI + t;
      pts.push(`${175 + (R - r) * Math.cos(th) + dd * Math.cos(ratio * th)},${175 + (R - r) * Math.sin(th) - dd * Math.sin(ratio * th)}`);
    }
    return `M ${pts.join(' L ')}`;
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d={d} fill="none" stroke={BR} strokeWidth="0.6" opacity="0.8" />
    </svg>
  );
});

// ── 16. Triangle Medians & Centroid ──────────────────────
const TriangleCentroid = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.008);
  const data = useMemo(() => {
    const wobble = Math.sin(t) * 40;
    const Ax = 70, Ay = 300, Bx = 300, By = 290, Cx = 150 + wobble, Cy = 50;
    const mAB = { x: (Ax + Bx) / 2, y: (Ay + By) / 2 };
    const mBC = { x: (Bx + Cx) / 2, y: (By + Cy) / 2 };
    const mAC = { x: (Ax + Cx) / 2, y: (Ay + Cy) / 2 };
    const G = { x: (Ax + Bx + Cx) / 3, y: (Ay + By + Cy) / 3 };
    return { Ax, Ay, Bx, By, Cx, Cy, mAB, mBC, mAC, G };
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d={`M ${data.Ax},${data.Ay} L ${data.Bx},${data.By} L ${data.Cx},${data.Cy} Z`} fill={BR} fillOpacity="0.04" stroke={BR} strokeWidth="2" opacity="0.7" />
      <line x1={data.Cx} y1={data.Cy} x2={data.mAB.x} y2={data.mAB.y} stroke="#cb4a4a" strokeWidth="1.2" opacity="0.6" />
      <line x1={data.Ax} y1={data.Ay} x2={data.mBC.x} y2={data.mBC.y} stroke="#4a6bcb" strokeWidth="1.2" opacity="0.6" />
      <line x1={data.Bx} y1={data.By} x2={data.mAC.x} y2={data.mAC.y} stroke="#4acb6b" strokeWidth="1.2" opacity="0.6" />
      <circle cx={data.mAB.x} cy={data.mAB.y} r="4" fill="#cb4a4a" opacity="0.5" />
      <circle cx={data.mBC.x} cy={data.mBC.y} r="4" fill="#4a6bcb" opacity="0.5" />
      <circle cx={data.mAC.x} cy={data.mAC.y} r="4" fill="#4acb6b" opacity="0.5" />
      <circle cx={data.G.x} cy={data.G.y} r="6" fill={BR} opacity="0.9" />
      <text x={data.Ax - 18} y={data.Ay + 5} fontSize="16" fontWeight="800" fill={BR} opacity="0.7">A</text>
      <text x={data.Bx + 6} y={data.By + 5} fontSize="16" fontWeight="800" fill={BR} opacity="0.7">B</text>
      <text x={data.Cx - 5} y={data.Cy - 10} fontSize="16" fontWeight="800" fill={BR} opacity="0.7">C</text>
      <text x={data.G.x + 9} y={data.G.y - 8} fontSize="14" fontWeight="800" fill={BR} opacity="0.8">G</text>
      <text x={data.G.x + 9} y={data.G.y + 16} fontSize="10" fontWeight="600" fill={BR} opacity="0.5" fontFamily="monospace">2 : 1</text>
    </svg>
  );
});

// ── 17. Taylor Series of sin(x) ────────────────────────
const TaylorSeries = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.012);
  const paths = useMemo(() => {
    const r = [];
    const sinP = [];
    for (let px = 10; px <= 340; px += 4) {
      sinP.push(`${px},${175 - Math.sin((px - 175) / 40 + t) * 80}`);
    }
    r.push({ d: `M ${sinP.join(' L ')}`, sw: 2, op: 0.3, dash: '4 3' });
    for (const n of [1, 3, 5, 8]) {
      const pts = [];
      for (let px = 10; px <= 340; px += 4) {
        const x = (px - 175) / 40;
        let y = 0;
        for (let k = 0; k < n; k++) { const e = 2 * k + 1; y += Math.pow(-1, k) * Math.pow(x + t, e) / fact(e); }
        pts.push(`${px},${175 - Math.max(-2.5, Math.min(2.5, y)) * 80}`);
      }
      r.push({ d: `M ${pts.join(' L ')}`, sw: n === 8 ? 1.5 : 0.8, op: 0.2 + n * 0.08 });
    }
    return r;
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d="M 10 175 L 340 175" fill="none" stroke={BR} strokeWidth="0.5" opacity="0.2" />
      {paths.map((p, i) => <path key={i} d={p.d} fill="none" stroke={BR} strokeWidth={p.sw} opacity={p.op} strokeLinejoin="round" strokeDasharray={p.dash} />)}
    </svg>
  );
});

// ── 18. Cycloid ─────────────────────────────────────────
const Cycloid = React.memo(({ size = 350 }) => {
  const t = useAnimTime(0.025);
  const { curve, circle } = useMemo(() => {
    const r = 35, pts = [];
    for (let i = 0; i <= 500; i++) {
      const th = (i / 500) * 4 * Math.PI;
      pts.push(`${20 + r * (th - Math.sin(th))},${280 - r * (1 - Math.cos(th))}`);
    }
    const cth = (t % (4 * Math.PI));
    return { curve: `M ${pts.join(' L ')}`, circle: { cx: 20 + r * cth, cy: 280 - r, px: 20 + r * (cth - Math.sin(cth)), py: 280 - r * (1 - Math.cos(cth)), r } };
  }, [t]);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d="M 10 280 L 340 280" fill="none" stroke={BR} strokeWidth="0.5" opacity="0.2" />
      <path d={curve} fill="none" stroke={BR} strokeWidth="1" opacity="0.8" />
      <circle cx={circle.cx} cy={circle.cy} r={circle.r} fill="none" stroke={BR} strokeWidth="0.8" opacity="0.5" />
      <line x1={circle.cx} y1={circle.cy} x2={circle.px} y2={circle.py} stroke={BR} strokeWidth="0.8" opacity="0.5" />
      <circle cx={circle.px} cy={circle.py} r="4" fill={BR} opacity="0.8" />
    </svg>
  );
});

// ── 19. Sierpinski Triangle ─────────────────────────────
const SierpinskiTriangle = React.memo(({ size = 350 }) => {
  const triangles = useMemo(() => {
    const result = [];
    const subdivide = (ax, ay, bx, by, cx, cy, depth) => {
      result.push({ d: `M ${ax},${ay} L ${bx},${by} L ${cx},${cy} Z`, depth });
      if (depth >= 4) return;
      const mx1 = (ax + bx) / 2, my1 = (ay + by) / 2;
      const mx2 = (bx + cx) / 2, my2 = (by + cy) / 2;
      const mx3 = (ax + cx) / 2, my3 = (ay + cy) / 2;
      subdivide(ax, ay, mx1, my1, mx3, my3, depth + 1);
      subdivide(mx1, my1, bx, by, mx2, my2, depth + 1);
      subdivide(mx3, my3, mx2, my2, cx, cy, depth + 1);
    };
    subdivide(175, 20, 20, 330, 330, 330, 0);
    return result;
  }, []);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      {triangles.map((tri, i) => (
        <motion.path key={i} d={tri.d}
          fill={tri.depth >= 4 ? BR : 'none'}
          fillOpacity={tri.depth >= 4 ? 0.15 : 0}
          stroke={BR}
          strokeWidth={tri.depth === 0 ? 1.5 : Math.max(0.3, 1.2 - tri.depth * 0.2)}
          opacity={0.8 - tri.depth * 0.05}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: tri.depth * 0.6 + i * 0.003, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
});

// ── 20. Logistic Map Bifurcation ─────────────────────────
const LogisticBifurcation = React.memo(({ size = 350 }) => {
  const pathData = useMemo(() => {
    const segments = [];
    for (let ri = 0; ri < 300; ri++) {
      const r = 2.5 + (ri / 300) * 1.5;
      let x = 0.5;
      for (let i = 0; i < 150; i++) x = r * x * (1 - x);
      const px = 10 + (ri / 300) * 330;
      for (let i = 0; i < 40; i++) {
        x = r * x * (1 - x);
        segments.push(`M ${px},${340 - x * 320} l 0.8,0`);
      }
    }
    return segments.join(' ');
  }, []);
  return (
    <svg width={size} height={size} viewBox="0 0 350 350">
      <path d="M 10 340 L 340 340 M 10 20 L 10 340" fill="none" stroke={BR} strokeWidth="1" opacity="0.3" />
      <text x="175" y="350" textAnchor="middle" fontSize="10" fill={BR} opacity="0.5">r</text>
      <text x="5" y="180" textAnchor="middle" fontSize="10" fill={BR} opacity="0.5" transform="rotate(-90,5,180)">x</text>
      <motion.path d={pathData} fill="none" stroke={BR} strokeWidth="0.5" opacity="0.7"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'loop' }} />
    </svg>
  );
});

// ── Animation Registry ──────────────────────────────────
export const animations = [
  { id: 'sine-surface', label: '[ DYNAMIC SINE SURFACE ]', equation: 'Z = \\cos(x) \\sin(y)', Component: SineSurface },
  { id: 'brownian', label: '[ GEOMETRIC BROWNIAN MOTION ]', equation: 'dS = \\mu\\,dt + \\sigma\\,dW', Component: BrownianMotion },
  { id: 'lorenz', label: '[ LORENZ ATTRACTOR ]', equation: '\\dot{x} = \\sigma(y - x)', Component: LorenzAttractor },
  { id: 'lissajous', label: '[ LISSAJOUS CURVE ]', equation: 'x = \\sin(3t),\\; y = \\sin(2t)', Component: LissajousCurve },
  { id: 'rose', label: '[ ROSE CURVE ]', equation: 'r = \\cos(5\\theta)', Component: RoseCurve },
  { id: 'spirograph', label: '[ EPITROCHOID ]', equation: 'z = (R+r)e^{it} - de^{i\\frac{R+r}{r}t}', Component: Spirograph },
  { id: 'fourier', label: '[ FOURIER SQUARE WAVE ]', equation: 'f = \\frac{4}{\\pi}\\sum\\frac{\\sin(nx)}{n}', Component: FourierSquareWave },
  { id: 'ftc', label: '[ FUNDAMENTAL THEOREM OF CALCULUS ]', equation: '\\int_a^b f(x)\\,dx = F(b) - F(a)', Component: FundamentalTheorem },
  { id: 'projection', label: '[ VECTOR PROJECTION ]', equation: '\\text{proj}_{\\vec{b}}\\vec{a} = \\frac{\\vec{a} \\cdot \\vec{b}}{\\vec{b} \\cdot \\vec{b}}\\vec{b}', Component: VectorProjection },
  { id: 'phase', label: '[ PENDULUM PHASE PORTRAIT ]', equation: '\\ddot{\\theta} = -\\sin(\\theta)', Component: PendulumPhase },
  { id: 'damped', label: '[ DAMPED OSCILLATOR ]', equation: 'x = Ae^{-\\gamma t}\\cos(\\omega t)', Component: DampedOscillator },
  { id: 'butterfly', label: '[ BUTTERFLY CURVE ]', equation: '\\rho = e^{\\cos\\theta} - 2\\cos(4\\theta)', Component: ButterflyCurve },
  { id: 'cardioid', label: '[ CARDIOID ]', equation: 'r = 1 + \\cos(\\theta)', Component: Cardioid },
  { id: 'interference', label: '[ WAVE INTERFERENCE ]', equation: '\\psi = \\psi_1 + \\psi_2', Component: WaveInterference },
  { id: 'hypotrochoid', label: '[ HYPOTROCHOID ]', equation: 'z = (R-r)e^{it} + de^{-i\\frac{R-r}{r}t}', Component: Hypotrochoid },
  { id: 'centroid', label: '[ TRIANGLE CENTROID ]', equation: 'G = \\frac{A + B + C}{3}', Component: TriangleCentroid },
  { id: 'taylor', label: '[ TAYLOR SERIES ]', equation: '\\sin x = \\sum\\frac{(-1)^n x^{2n+1}}{(2n+1)!}', Component: TaylorSeries },
  { id: 'cycloid', label: '[ CYCLOID ]', equation: 'x = r(t - \\sin t)', Component: Cycloid },
  { id: 'sierpinski', label: '[ SIERPINSKI TRIANGLE ]', equation: 'D = \\frac{\\log 3}{\\log 2}', Component: SierpinskiTriangle },
  { id: 'logistic', label: '[ LOGISTIC BIFURCATION ]', equation: 'x_{n+1} = rx_n(1-x_n)', Component: LogisticBifurcation },
];

// ── Random Selection (stable per page load) ─────────────
const shuffled = [...Array(animations.length).keys()].sort(() => Math.random() - 0.5);
export const selectedPair = [shuffled[0], shuffled[1]];
