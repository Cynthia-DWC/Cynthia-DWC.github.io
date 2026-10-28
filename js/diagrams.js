// SVG drawings generated from content: card mini-flows and the faint hero backgrounds.
import { esc } from './util.js';

export function miniFlowSvg(steps) {
  const n = Math.min(steps.length, 9);
  const w = 300, y = 22, pad = 10;
  const gap = n > 1 ? (w - pad * 2) / (n - 1) : 0;
  const xs = Array.from({ length: n }, (_, i) => pad + i * gap);
  const lines = xs.slice(1).map((x, i) => `<line x1="${xs[i] + 5}" y1="${y}" x2="${x - 5}" y2="${y}"/>`).join('');
  const dots = xs.map((x, i) => `<circle cx="${x}" cy="${y}" r="5"${i === n - 1 ? ' class="end"' : ''}/>`).join('');
  const first = steps[0];
  const last = steps[steps.length - 1];
  return `<div class="fb-flowwrap"><svg class="fb-flow" viewBox="0 0 ${w} 44" preserveAspectRatio="xMidYMid meet">${lines}${dots}</svg>
    <p class="fb-ends"><span>${esc(first)}</span><span>${esc(last)}</span></p></div>`;
}

// Line drawing of a real workflow, shown as a strip in the Home and Automation heroes.
export function heroPipeline(steps) {
  const n = steps.length;
  if (!n) return '';
  const W = 1200, H = 150, x0 = 100, x1 = W - 100;
  const pts = steps.map((s, i) => ({ x: n > 1 ? x0 + (i * (x1 - x0)) / (n - 1) : W / 2, y: i % 2 ? 98 : 54, s }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i], mx = (a.x + b.x) / 2;
    d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
  }
  const nodes = pts.map((p, i) => `
    <circle class="pl-node${i === n - 1 ? ' end' : ''}" cx="${p.x}" cy="${p.y}" r="6"/>
    <text class="pl-text" x="${p.x}" y="${i % 2 ? p.y + 30 : p.y - 20}" text-anchor="middle"><tspan class="pl-num">${String(i + 1).padStart(2, '0')}</tspan> ${esc(p.s)}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" focusable="false">
    <path class="pl-line draw" d="${d}" pathLength="1"/>${nodes}</svg>`;
}

// Star schema strip (one fact table, dimensions either side), shown in the Data & BI hero.
export function heroStarSchema() {
  const W = 1200, H = 150, cx = 600, cy = 75;
  const dims = [{ x: 180, y: 40 }, { x: 330, y: 112 }, { x: 870, y: 112 }, { x: 1020, y: 40 }, { x: 600, y: 140 }].slice(0, 4);
  const lines = dims.map((p) => `<path class="pl-line draw" d="M ${cx} ${cy} L ${p.x} ${p.y}" pathLength="1"/>`).join('');
  const boxes = dims.map((p) => `<rect class="pl-node" x="${p.x - 60}" y="${p.y - 16}" width="120" height="32" rx="4"/><text class="pl-text" x="${p.x}" y="${p.y + 4}" text-anchor="middle">DIMENSION</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" focusable="false">
    ${lines}${boxes}
    <rect class="pl-node end" x="${cx - 80}" y="${cy - 22}" width="160" height="44" rx="5" style="fill:var(--navy-700)"/>
    <text class="pl-text" x="${cx}" y="${cy + 4}" text-anchor="middle" style="fill:var(--on-navy)">FACT TABLE</text></svg>`;
}
