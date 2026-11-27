// Trình mô phỏng mạch lượng tử (tối đa 5 qubit) dựa trên vectơ trạng thái.
// Đặt cổng bằng cách chọn trong bảng rồi nhấn vào ô; cổng nhiều qubit: nhấn lần lượt các qubit điều khiển rồi qubit đích.
import { State, GATES, Rx, Ry, Rz, Phase, label, fmtC, sample, entropyFromBloch } from '../qsim.js';
import { BlochView } from './blochview.js';
import { h, palette, hiCanvas, bars, piFmt, tex } from './util.js';

const SINGLE = ['H', 'X', 'Y', 'Z', 'S', 'S†', 'T', 'T†', 'Rx', 'Ry', 'Rz', 'P'];
const MULTI = { CX: 2, CZ: 2, CP: 2, SWAP: 2, CCX: 3 };
const PARAM = new Set(['Rx', 'Ry', 'Rz', 'P', 'CP']);
const MAT = { H: GATES.H, X: GATES.X, Y: GATES.Y, Z: GATES.Z, S: GATES.S, 'S†': GATES.Sdg, T: GATES.T, 'T†': GATES.Tdg };

const g1 = (g, q, col, p) => ({ g, q: [q], col, p });
const gm = (g, q, col, p) => ({ g, q, col, p });
const PI = Math.PI;

export const PRESETS = {
  empty: { name: 'Mạch trống', n: 2, ops: [] },
  superpos: { name: 'Chồng chập đều (H trên mọi qubit)', n: 3, ops: [g1('H', 0, 0), g1('H', 1, 0), g1('H', 2, 0)] },
  bell: { name: 'Trạng thái Bell |Φ⁺⟩', n: 2, ops: [g1('H', 0, 0), gm('CX', [0, 1], 1)] },
  ghz: { name: 'Trạng thái GHZ (3 qubit)', n: 3, ops: [g1('H', 0, 0), gm('CX', [0, 1], 1), gm('CX', [1, 2], 2)] },
  kickback: { name: 'Phase kickback', n: 2, ops: [g1('H', 0, 0), g1('X', 1, 0), g1('H', 1, 1), gm('CX', [0, 1], 2), g1('H', 0, 3)] },
  interfere: { name: 'Giao thoa: H·H = I, H·Z·H = X', n: 2, ops: [g1('H', 0, 0), g1('H', 0, 1), g1('H', 1, 0), g1('Z', 1, 1), g1('H', 1, 2)] },
  superdense: { name: 'Mã hóa siêu đặc (gửi "10")', n: 2, ops: [g1('H', 0, 0), gm('CX', [0, 1], 1), g1('Z', 0, 2), gm('CX', [0, 1], 3), g1('H', 0, 4)] },
  teleport: {
    name: 'Dịch chuyển lượng tử (đo trì hoãn)', n: 3,
    ops: [g1('Ry', 0, 0, 1.1), g1('Rz', 0, 1, 0.7), g1('H', 1, 0), gm('CX', [1, 2], 1), gm('CX', [0, 1], 2), g1('H', 0, 3), gm('CX', [1, 2], 4), gm('CZ', [0, 2], 5)],
  },
  teleportM: {
    name: 'Dịch chuyển lượng tử (có phép đo)', n: 3,
    ops: [g1('Ry', 0, 0, 1.1), g1('Rz', 0, 1, 0.7), g1('H', 1, 0), gm('CX', [1, 2], 1), gm('CX', [0, 1], 2), g1('H', 0, 3), g1('M', 0, 4), g1('M', 1, 4), gm('CX', [1, 2], 5), gm('CZ', [0, 2], 6)],
  },
  djBalanced: { name: 'Deutsch–Jozsa: hàm cân bằng', n: 3, ops: [g1('X', 2, 0), g1('H', 0, 1), g1('H', 1, 1), g1('H', 2, 1), gm('CX', [0, 2], 2), gm('CX', [1, 2], 3), g1('H', 0, 4), g1('H', 1, 4)] },
  djConstant: { name: 'Deutsch–Jozsa: hàm hằng', n: 3, ops: [g1('X', 2, 0), g1('H', 0, 1), g1('H', 1, 1), g1('H', 2, 1), g1('X', 2, 2), g1('H', 0, 4), g1('H', 1, 4)] },
  bv: { name: 'Bernstein–Vazirani (s = 101)', n: 4, ops: [g1('X', 3, 0), g1('H', 0, 1), g1('H', 1, 1), g1('H', 2, 1), g1('H', 3, 1), gm('CX', [0, 3], 2), gm('CX', [2, 3], 3), g1('H', 0, 4), g1('H', 1, 4), g1('H', 2, 4)] },
  grover2: { name: 'Grover 2 qubit (đánh dấu |11⟩)', n: 2, ops: [g1('H', 0, 0), g1('H', 1, 0), gm('CZ', [0, 1], 1), g1('H', 0, 2), g1('H', 1, 2), g1('X', 0, 3), g1('X', 1, 3), gm('CZ', [0, 1], 4), g1('X', 0, 5), g1('X', 1, 5), g1('H', 0, 6), g1('H', 1, 6)] },
  grover3: { name: 'Grover 3 qubit (đánh dấu |101⟩, 2 vòng)', n: 3, ops: groverOps3() },
  qft3: { name: 'QFT 3 qubit trên |101⟩', n: 3, ops: [g1('X', 0, 0), g1('X', 2, 0), g1('H', 0, 1), gm('CP', [1, 0], 2, PI / 2), gm('CP', [2, 0], 3, PI / 4), g1('H', 1, 4), gm('CP', [2, 1], 5, PI / 2), g1('H', 2, 6), gm('SWAP', [0, 2], 7)] },
  bitflip: {
    name: 'Mã sửa lỗi lật bit (3 qubit + 2 ancilla)', n: 5,
    ops: [g1('Ry', 0, 0, 1.0), gm('CX', [0, 1], 1), gm('CX', [0, 2], 2), g1('X', 1, 3), gm('CX', [0, 3], 4), gm('CX', [1, 3], 5), gm('CX', [1, 4], 6), gm('CX', [2, 4], 7),
      g1('X', 4, 8), gm('CCX', [3, 4, 0], 9), g1('X', 4, 10), gm('CCX', [3, 4, 1], 11), g1('X', 3, 12), gm('CCX', [3, 4, 2], 13), g1('X', 3, 14), gm('CX', [0, 2], 15), gm('CX', [0, 1], 16)],
  },
};

function groverOps3() {
  const ops = [];
  let c = 0;
  ops.push(g1('H', 0, c), g1('H', 1, c), g1('H', 2, c));
  for (let r = 0; r < 2; r++) {
    c++; ops.push(g1('X', 1, c));
    c++; ops.push(g1('H', 2, c));
    c++; ops.push(gm('CCX', [0, 1, 2], c));
    c++; ops.push(g1('H', 2, c));
    c++; ops.push(g1('X', 1, c));
    c++; ops.push(g1('H', 0, c), g1('H', 1, c), g1('H', 2, c));
    c++; ops.push(g1('X', 0, c), g1('X', 1, c), g1('X', 2, c));
    c++; ops.push(g1('H', 2, c));
    c++; ops.push(gm('CCX', [0, 1, 2], c));
    c++; ops.push(g1('H', 2, c));
    c++; ops.push(g1('X', 0, c), g1('X', 1, c), g1('X', 2, c));
    c++; ops.push(g1('H', 0, c), g1('H', 1, c), g1('H', 2, c));
  }
  return ops;
}

export function applyOp(s, op, rng = Math.random) {
  const [a, b, c] = op.q;
  switch (op.g) {
    case 'Rx': return s.apply(Rx(op.p), a);
    case 'Ry': return s.apply(Ry(op.p), a);
    case 'Rz': return s.apply(Rz(op.p), a);
    case 'P': return s.apply(Phase(op.p), a);
    case 'CX': return s.apply(GATES.X, b, [a]);
    case 'CZ': return s.apply(GATES.Z, b, [a]);
    case 'CP': return s.apply(Phase(op.p), b, [a]);
    case 'CCX': return s.apply(GATES.X, c, [a, b]);
    case 'SWAP': return s.swap(a, b);
    case 'M': s.measure(a, rng()); return s;
    default: return s.apply(MAT[op.g], a);
  }
}

function seeded(seed) {
  let x = seed >>> 0 || 1;
  return () => ((x ^= x << 13), (x ^= x >>> 17), (x ^= x << 5), (x >>> 0) / 4294967296);
}

export function mount(root, cfg = {}) {
  const preset = PRESETS[cfg.preset] || PRESETS[cfg.n ? 'empty' : 'bell'];
  let n = cfg.n || preset.n;
  let ops = preset.ops.map((o) => ({ ...o, q: [...o.q] }));
  let tool = 'H';
  let pending = [];
  let angle = PI / 2;
  let step = Infinity;
  let seed = 1;
  let counts = null;
  const COLW = 46, ROWH = 48, LEFT = 54, TOP = 16;

  const el = h(`<div class="sim-ui">
    <div class="sim-head"><span class="sim-title">Mạch lượng tử</span><span class="hint">Chọn cổng → nhấn vào ô. Nhấn vào cổng đã đặt để xóa.</span></div>
    <div class="row" style="align-items:center;margin-bottom:8px">
      <select class="inp preset">${Object.entries(PRESETS).map(([k, p]) => `<option value="${k}">${p.name}</option>`).join('')}</select>
      <label class="hint">Số qubit <select class="inp nq">${[1, 2, 3, 4, 5].map((k) => `<option ${k === n ? 'selected' : ''}>${k}</option>`).join('')}</select></label>
      <label class="hint">Góc <select class="inp ang">${[['π/8', PI / 8], ['π/4', PI / 4], ['π/2', PI / 2], ['π', PI], ['3π/2', 1.5 * PI], ['1.0', 1], ['0.5', 0.5]].map(([l, v]) => `<option value="${v}" ${l === 'π/2' ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
      <button class="btn small ghost clear">Xóa mạch</button>
    </div>
    <div class="circ-palette"></div>
    <div class="circ-wrap"><svg class="circ"></svg></div>
    <div class="ctrl" style="margin-top:10px"><label><span>Xem trạng thái sau cột</span><output class="st-o"></output></label><input type="range" class="st" min="0" step="1"></div>
    <div class="sim-grid even">
      <div><div class="lbl hint" style="margin-bottom:4px">Vectơ trạng thái</div><div class="readout amps"></div></div>
      <div><div class="lbl hint" style="margin-bottom:4px">Từng qubit trên quả cầu Bloch (vectơ ngắn lại = qubit đang rối)</div><div class="blochs" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:6px"></div>
        <div class="btns" style="margin-top:10px"><button class="btn small primary shots">Đo 1024 lần</button><button class="btn small ghost reroll" hidden>Chạy lại (phép đo giữa mạch)</button><button class="btn small ghost qasmb">OpenQASM</button></div>
        <canvas class="sim-canvas hist" hidden></canvas><textarea class="qasm" readonly hidden></textarea></div>
    </div></div>`);
  root.appendChild(el);
  const svg = el.querySelector('svg.circ');
  const pal0 = el.querySelector('.circ-palette');
  pal0.innerHTML =
    SINGLE.map((g) => `<button class="gate-btn" data-g="${g}" title="${g}">${g}</button>`).join('') +
    '<span style="width:8px"></span>' +
    Object.keys(MULTI).map((g) => `<button class="gate-btn" data-g="${g}">${g === 'CX' ? 'CNOT' : g}</button>`).join('') +
    '<button class="gate-btn" data-g="M" title="Phép đo giữa mạch">M</button>';
  const presetSel = el.querySelector('.preset');
  presetSel.value = cfg.preset && PRESETS[cfg.preset] ? cfg.preset : cfg.n ? 'empty' : 'bell';
  const stIn = el.querySelector('.st');
  const histCv = el.querySelector('.hist');
  let hist = null;

  const ncols = () => Math.max(8, ...ops.map((o) => o.col + 2));
  const occupied = (col, rows) => ops.some((o) => o.col === col && spanOverlap(o.q, rows));
  const spanOverlap = (a, b) => {
    const [a0, a1] = [Math.min(...a), Math.max(...a)];
    const [b0, b1] = [Math.min(...b), Math.max(...b)];
    return a0 <= b1 && b0 <= a1;
  };

  function compute(upto = step) {
    const rng = seeded(seed);
    const s = new State(n);
    const sorted = ops.filter((o) => o.col < upto).sort((a, b) => a.col - b.col);
    for (const o of sorted) applyOp(s, o, rng);
    return s;
  }

  function drawCircuit() {
    const C = ncols();
    const W = LEFT + C * COLW + 20, H = TOP * 2 + n * ROWH;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    const y = (q) => TOP + q * ROWH + ROWH / 2;
    const x = (c) => LEFT + c * COLW + COLW / 2;
    let s = '';
    for (let q = 0; q < n; q++) s += `<text class="qlabel" x="8" y="${y(q)}">q${q} |0⟩</text><line class="wire" x1="${LEFT - 4}" x2="${W - 10}" y1="${y(q)}" y2="${y(q)}"/>`;
    for (let c = 0; c < C; c++) for (let q = 0; q < n; q++) s += `<rect class="cell${pending.some((p) => p.c === c && p.q === q) ? ' pending' : ''}" data-c="${c}" data-q="${q}" x="${LEFT + c * COLW + 2}" y="${TOP + q * ROWH + 2}" width="${COLW - 4}" height="${ROWH - 4}" rx="6"/>`;
    ops.forEach((o, i) => {
      const cx = x(o.col);
      let g = `<g class="placed" data-i="${i}">`;
      const box = (q, t, wide = false) => {
        const bw = wide ? 40 : 32;
        return `<rect class="gbox" x="${cx - bw / 2}" y="${y(q) - 15}" width="${bw}" height="30" rx="5"/><text class="gtxt" x="${cx}" y="${y(q)}">${t}</text>`;
      };
      if (o.q.length > 1) g += `<line class="cline" x1="${cx}" x2="${cx}" y1="${y(Math.min(...o.q))}" y2="${y(Math.max(...o.q))}"/>`;
      if (o.g === 'CX' || o.g === 'CCX') {
        o.q.slice(0, -1).forEach((q) => (g += `<circle class="ctl" cx="${cx}" cy="${y(q)}" r="5"/>`));
        const t = o.q[o.q.length - 1];
        g += `<circle cx="${cx}" cy="${y(t)}" r="12" fill="var(--paper)" stroke="var(--accent)" stroke-width="1.6"/><line class="cline" x1="${cx - 12}" x2="${cx + 12}" y1="${y(t)}" y2="${y(t)}"/><line class="cline" x1="${cx}" x2="${cx}" y1="${y(t) - 12}" y2="${y(t) + 12}"/>`;
      } else if (o.g === 'CZ') {
        o.q.forEach((q) => (g += `<circle class="ctl" cx="${cx}" cy="${y(q)}" r="5"/>`));
      } else if (o.g === 'CP') {
        g += `<circle class="ctl" cx="${cx}" cy="${y(o.q[0])}" r="5"/>` + box(o.q[1], 'P', false) + `<text class="gtxt" x="${cx}" y="${y(o.q[1]) + 22}" style="font-size:9px;font-weight:400">${piFmt(o.p)}</text>`;
      } else if (o.g === 'SWAP') {
        o.q.forEach((q) => (g += `<path d="M${cx - 7},${y(q) - 7}L${cx + 7},${y(q) + 7}M${cx + 7},${y(q) - 7}L${cx - 7},${y(q) + 7}" stroke="var(--accent)" stroke-width="2"/>`));
      } else if (o.g === 'M') {
        g += `<rect class="gbox" x="${cx - 16}" y="${y(o.q[0]) - 15}" width="32" height="30" rx="5" style="stroke:var(--amber)"/><path d="M${cx - 10},${y(o.q[0]) + 6} A10,10 0 0 1 ${cx + 10},${y(o.q[0]) + 6}" fill="none" stroke="var(--ink)" stroke-width="1.4"/><line x1="${cx}" y1="${y(o.q[0]) + 6}" x2="${cx + 7}" y2="${y(o.q[0]) - 8}" stroke="var(--ink)" stroke-width="1.4"/>`;
      } else {
        g += box(o.q[0], o.g, PARAM.has(o.g));
        if (PARAM.has(o.g)) g += `<text class="gtxt" x="${cx}" y="${y(o.q[0]) + 22}" style="font-size:9px;font-weight:400">${piFmt(o.p)}</text>`;
      }
      g += `<title>Nhấn để xóa</title></g>`;
      s += g;
    });
    if (step < Infinity) s += `<line class="stepline" x1="${LEFT + step * COLW}" x2="${LEFT + step * COLW}" y1="4" y2="${H - 4}"/>`;
    svg.innerHTML = s;
    stIn.max = C;
    stIn.value = Math.min(step, C);
    el.querySelector('.st-o').textContent = step >= C ? 'cuối mạch' : step;
  }

  function renderState() {
    const s = compute();
    const p = s.probs();
    const rows = [];
    for (let i = 0; i < s.dim; i++) {
      if (p[i] < 1e-9 && s.dim > 8) continue;
      const a = s.amp(i);
      const phase = Math.atan2(a.im, a.re);
      const hue = ((phase / (2 * PI)) * 360 + 360) % 360;
      rows.push(`<tr><td>|${label(i, n)}⟩</td><td>${fmtC(a)}</td><td><span class="amp-bar" style="width:${Math.round(p[i] * 90)}px;background:hsl(${hue} 65% 52%)"></span></td><td>${p[i].toFixed(3)}</td></tr>`);
    }
    el.querySelector('.amps').innerHTML = `<table><tr><th>Cơ sở</th><th>Biên độ</th><th>Pha (màu)</th><th>Xác suất</th></tr>${rows.join('')}</table>${s.dim > 8 ? '<div class="hint">Ẩn các trạng thái có biên độ 0.</div>' : ''}<div class="hint" style="margin-top:6px">Màu của thanh mã hóa pha của biên độ: đỏ = 0, lục lam = π.</div>`;
    const box = el.querySelector('.blochs');
    if (box.children.length !== n) {
      box.innerHTML = '';
      box._views = [];
      for (let q = 0; q < n; q++) {
        const wrap = h(`<div style="text-align:center"><canvas class="sim-canvas"></canvas><div class="hint bl"></div></div>`);
        box.appendChild(wrap);
        box._views.push({ v: new BlochView(wrap.querySelector('canvas'), { small: true }), t: wrap.querySelector('.bl') });
      }
    }
    for (let q = 0; q < n; q++) {
      const b = s.bloch(q);
      const S = entropyFromBloch(b);
      box._views[q].v.set(b);
      box._views[q].t.innerHTML = `q${q} · P(1)=${s.p1(q).toFixed(2)}${S > 0.01 ? ` · <span style="color:var(--amber)">rối S=${S.toFixed(2)}</span>` : ''}`;
    }
    el.querySelector('.reroll').hidden = !ops.some((o) => o.g === 'M');
  }

  function runShots() {
    const hasM = ops.some((o) => o.g === 'M');
    const dim = 1 << n;
    if (!hasM) counts = sample(compute(Infinity).probs(), 1024);
    else {
      counts = new Array(dim).fill(0);
      const saved = seed;
      for (let k = 0; k < 1024; k++) {
        seed = (Math.random() * 2 ** 32) >>> 0;
        const pr = compute(Infinity).probs();
        counts[sample(pr, 1).indexOf(1)]++;
      }
      seed = saved;
    }
    histCv.hidden = false;
    if (!hist)
      hist = hiCanvas(histCv, 0.5, (ctx, w, hh) => {
        if (!counts) return;
        const pal = palette();
        ctx.clearRect(0, 0, w, hh);
        const max = Math.max(...counts, 1);
        ctx.fillStyle = pal.muted;
        ctx.font = '11px ui-monospace, monospace';
        ctx.fillText('Số lần (trên 1024)', 8, 14);
        const labels = counts.map((_, i) => (counts.length <= 16 ? label(i, n) : ''));
        bars(ctx, 8, 24, w - 16, hh - 48, counts, { max, labels, pal, colors: pal.teal });
        ctx.textAlign = 'center';
        ctx.fillStyle = pal.ink;
        counts.forEach((c, i) => c && ctx.fillText(c, 8 + (i + 0.5) * ((w - 16) / counts.length), 22 + (hh - 48) * (1 - c / max) + 0));
      });
    else hist.redraw();
  }

  function qasm() {
    const out = ['OPENQASM 2.0;', 'include "qelib1.inc";', `qreg q[${n}];`, `creg c[${n}];`];
    const f = (p) => p.toFixed(6);
    for (const o of [...ops].sort((a, b) => a.col - b.col)) {
      const q = o.q.map((k) => `q[${k}]`).join(',');
      const name = { 'S†': 'sdg', 'T†': 'tdg', CX: 'cx', CZ: 'cz', SWAP: 'swap', CCX: 'ccx' }[o.g] || o.g.toLowerCase();
      if (o.g === 'P') out.push(`u1(${f(o.p)}) ${q};`);
      else if (o.g === 'CP') out.push(`cu1(${f(o.p)}) ${q};`);
      else if (PARAM.has(o.g)) out.push(`${name}(${f(o.p)}) ${q};`);
      else if (o.g === 'M') out.push(`measure q[${o.q[0]}] -> c[${o.q[0]}];`);
      else out.push(`${name} ${q};`);
    }
    out.push('measure q -> c;');
    return out.join('\n');
  }

  function refresh() {
    drawCircuit();
    renderState();
    if (!histCv.hidden) runShots();
    const ta = el.querySelector('.qasm');
    if (!ta.hidden) ta.value = qasm();
  }

  pal0.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    tool = b.dataset.g;
    pending = [];
    pal0.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
    drawCircuit();
  });
  pal0.querySelector('[data-g="H"]').classList.add('on');

  svg.addEventListener('click', (e) => {
    const placed = e.target.closest('g.placed');
    if (placed) {
      ops.splice(+placed.dataset.i, 1);
      pending = [];
      counts = null;
      return refresh();
    }
    const cell = e.target.closest('rect.cell');
    if (!cell) return;
    const c = +cell.dataset.c, q = +cell.dataset.q;
    const need = MULTI[tool] || 1;
    if (need === 1) {
      if (occupied(c, [q])) return;
      ops.push({ g: tool, q: [q], col: c, p: PARAM.has(tool) ? angle : undefined });
      return refresh();
    }
    if (pending.length && pending[0].c !== c) pending = [];
    if (pending.some((p) => p.q === q)) return;
    pending.push({ c, q });
    if (pending.length === need) {
      const qs = pending.map((p) => p.q);
      pending = [];
      if (!occupied(c, qs)) ops.push({ g: tool, q: qs, col: c, p: PARAM.has(tool) ? angle : undefined });
      return refresh();
    }
    drawCircuit();
  });

  presetSel.addEventListener('change', () => {
    const p = PRESETS[presetSel.value];
    n = p.n;
    ops = p.ops.map((o) => ({ ...o, q: [...o.q] }));
    el.querySelector('.nq').value = n;
    step = Infinity;
    counts = null;
    histCv.hidden = true;
    refresh();
  });
  el.querySelector('.nq').addEventListener('change', (e) => {
    n = +e.target.value;
    ops = ops.filter((o) => o.q.every((q) => q < n));
    counts = null;
    histCv.hidden = true;
    refresh();
  });
  el.querySelector('.ang').addEventListener('change', (e) => (angle = +e.target.value));
  el.querySelector('.clear').addEventListener('click', () => {
    ops = [];
    step = Infinity;
    histCv.hidden = true;
    refresh();
  });
  stIn.addEventListener('input', () => {
    step = +stIn.value >= ncols() ? Infinity : +stIn.value;
    drawCircuit();
    renderState();
  });
  el.querySelector('.shots').addEventListener('click', runShots);
  el.querySelector('.reroll').addEventListener('click', () => {
    seed = (Math.random() * 2 ** 32) >>> 0;
    refresh();
  });
  el.querySelector('.qasmb').addEventListener('click', () => {
    const ta = el.querySelector('.qasm');
    ta.hidden = !ta.hidden;
    ta.value = qasm();
  });
  refresh();
}
