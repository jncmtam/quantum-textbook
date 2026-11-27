// Ma trận 2×2 như một phép biến đổi mặt phẳng. Tìm các phương không đổi hướng — vectơ riêng.
import { h, palette, hiCanvas, arrow, slider, tex } from './util.js';

const PRESETS = {
  'Đơn vị I': [1, 0, 0, 1],
  'Co giãn': [2, 0, 0, 0.5],
  'Đối xứng': [2, 1, 1, 2],
  'Trượt (shear)': [1, 1, 0, 1],
  'Quay 45°': [Math.SQRT1_2, -Math.SQRT1_2, Math.SQRT1_2, Math.SQRT1_2],
  'Pauli Z (phản xạ)': [1, 0, 0, -1],
  'Pauli X (hoán đổi)': [0, 1, 1, 0],
  'Hadamard': [Math.SQRT1_2, Math.SQRT1_2, Math.SQRT1_2, -Math.SQRT1_2],
  'Chiếu lên trục x': [1, 0, 0, 0],
};

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">Ma trận là một phép biến đổi</span><span class="hint">Kéo vectơ v (xanh) quanh vòng tròn — tìm chỗ Av cùng phương với v</span></div>
  <div class="sim-grid"><canvas class="sim-canvas"></canvas><div>
    <div class="btns presets">${Object.keys(PRESETS).map((k) => `<button class="btn small" data-p="${k}">${k}</button>`).join('')}</div>
    <div class="mat" style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px"></div>
    <div class="morph"></div>
    <div class="readout out"></div></div></div></div>`);
  root.appendChild(el);
  let M = [2, 1, 1, 2];
  let vAng = 0.4;
  const names = ['a', 'b', 'c', 'd'];
  const sl = names.map((nm, i) => slider(nm, { min: -2.5, max: 2.5, step: 0.01, value: M[i] }).on((x) => { M[i] = x; cv.redraw(); }));
  sl.forEach((s) => el.querySelector('.mat').appendChild(s.el));
  const tS = slider('Biến đổi dần từ I tới A: t', { min: 0, max: 1, step: 0.01, value: 1 }).on(() => cv.redraw());
  el.querySelector('.morph').appendChild(tS.el);
  el.querySelector('.presets').addEventListener('click', (e) => {
    const p = e.target.dataset.p;
    if (!p) return;
    M = [...PRESETS[p]];
    sl.forEach((s, i) => (s.value = M[i]));
    animateT();
  });
  function animateT() {
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 700);
      tS.value = k;
      cv.redraw();
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const S = 55;
  const cv = hiCanvas(el.querySelector('canvas'), 0.85, (ctx, w, hh) => {
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const t = tS.value;
    const A = [1 - t + t * M[0], t * M[1], t * M[2], 1 - t + t * M[3]];
    const ox = w / 2, oy = hh / 2;
    const T = (x, y) => [ox + (A[0] * x + A[1] * y) * S, oy - (A[2] * x + A[3] * y) * S];
    const R = (x, y) => [ox + x * S, oy - y * S];
    ctx.strokeStyle = pal.line;
    for (let k = -8; k <= 8; k++) {
      ctx.beginPath(); ctx.moveTo(...R(k, -8)); ctx.lineTo(...R(k, 8)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(...R(-8, k)); ctx.lineTo(...R(8, k)); ctx.stroke();
    }
    // lưới đã biến đổi
    ctx.strokeStyle = pal.accent; ctx.globalAlpha = 0.28;
    for (let k = -6; k <= 6; k++) {
      ctx.beginPath(); ctx.moveTo(...T(k, -6)); ctx.lineTo(...T(k, 6)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(...T(-6, k)); ctx.lineTo(...T(6, k)); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // hình vuông đơn vị → hình bình hành (diện tích = |det|)
    ctx.fillStyle = pal.amber; ctx.globalAlpha = 0.18;
    ctx.beginPath(); ctx.moveTo(...T(0, 0)); ctx.lineTo(...T(1, 0)); ctx.lineTo(...T(1, 1)); ctx.lineTo(...T(0, 1)); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
    // đường tròn đơn vị → elip
    ctx.strokeStyle = pal.muted; ctx.setLineDash([3, 4]);
    ctx.beginPath(); for (let i = 0; i <= 80; i++) { const a = (i / 80) * 2 * Math.PI; ctx.lineTo(...R(Math.cos(a), Math.sin(a))); } ctx.stroke();
    ctx.setLineDash([]); ctx.strokeStyle = pal.violet;
    ctx.beginPath(); for (let i = 0; i <= 80; i++) { const a = (i / 80) * 2 * Math.PI; ctx.lineTo(...T(Math.cos(a), Math.sin(a))); } ctx.stroke();
    // trị riêng của A
    const tr = A[0] + A[3], det = A[0] * A[3] - A[1] * A[2], disc = tr * tr - 4 * det;
    let eig = '';
    const evs = [];
    if (disc >= -1e-9) {
      const sq = Math.sqrt(Math.max(0, disc));
      for (const lam of [(tr + sq) / 2, (tr - sq) / 2]) {
        let vx, vy;
        if (Math.abs(A[1]) > 1e-9) (vx = A[1]), (vy = lam - A[0]);
        else if (Math.abs(A[2]) > 1e-9) (vx = lam - A[3]), (vy = A[2]);
        else (vx = lam === A[0] ? 1 : 0), (vy = lam === A[0] ? 0 : 1);
        const n = Math.hypot(vx, vy) || 1;
        evs.push({ lam, x: vx / n, y: vy / n });
      }
      for (const e of evs) {
        ctx.strokeStyle = pal.green; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(...R(-8 * e.x, -8 * e.y)); ctx.lineTo(...R(8 * e.x, 8 * e.y)); ctx.stroke();
        ctx.setLineDash([]); ctx.lineWidth = 1;
      }
      eig = `${tex(`\\lambda_1 = ${evs[0].lam.toFixed(3)},\\ \\lambda_2 = ${evs[1].lam.toFixed(3)}`)}<div class="hint">Đường đứt nét xanh lá: các phương riêng (thực).${Math.abs(disc) < 1e-6 ? ' Trị riêng kép.' : ''}</div>`;
    } else {
      const re = tr / 2, im = Math.sqrt(-disc) / 2;
      eig = `${tex(`\\lambda = ${re.toFixed(3)} \\pm ${im.toFixed(3)}\\,i`)}<div class="hint">Trị riêng phức: không có phương thực nào giữ nguyên — ma trận “có thành phần quay”. Vectơ riêng tồn tại, nhưng nằm trong ${tex('\\mathbb{C}^2')}.</div>`;
    }
    // e1, e2 và vectơ v
    arrow(ctx, ox, oy, ...T(1, 0), pal.red, 2.5);
    arrow(ctx, ox, oy, ...T(0, 1), pal.amber, 2.5);
    const vx = Math.cos(vAng), vy = Math.sin(vAng);
    const Av = [A[0] * vx + A[1] * vy, A[2] * vx + A[3] * vy];
    arrow(ctx, ox, oy, ...R(vx, vy), pal.blue, 2.5);
    arrow(ctx, ox, oy, ...R(Av[0], Av[1]), pal.teal, 3.5);
    const cross = vx * Av[1] - vy * Av[0];
    const aligned = Math.abs(cross) < 0.03 * (Math.hypot(...Av) + 0.1);
    ctx.fillStyle = pal.ink; ctx.font = '12px ui-monospace, monospace';
    ctx.fillText('v', ...R(vx * 1.12, vy * 1.12)); ctx.fillText('Av', ...R(Av[0] * 1.06 + 0.1, Av[1] * 1.06 + 0.1));
    el.querySelector('.out').innerHTML = `${tex(`A = \\begin{pmatrix} ${A[0].toFixed(2)} & ${A[1].toFixed(2)} \\\\ ${A[2].toFixed(2)} & ${A[3].toFixed(2)} \\end{pmatrix}`)}<dl class="kv" style="margin-top:6px"><dt>det A (hệ số diện tích)</dt><dd>${det.toFixed(3)}</dd><dt>tr A = λ₁ + λ₂</dt><dd>${tr.toFixed(3)}</dd></dl>${eig}<div style="margin-top:6px" class="${aligned ? 'good' : 'hint'}">${aligned ? `✓ v đang là vectơ riêng: Av = ${(Math.hypot(...Av) * Math.sign(vx * Av[0] + vy * Av[1])).toFixed(2)}·v` : 'Av (lục lam) chưa cùng phương với v (xanh dương).'}</div>`;
  });
  const canvas = el.querySelector('canvas');
  let drag = false;
  canvas.addEventListener('pointerdown', (e) => { drag = true; canvas.setPointerCapture(e.pointerId); move(e); });
  canvas.addEventListener('pointermove', (e) => drag && move(e));
  canvas.addEventListener('pointerup', () => (drag = false));
  function move(e) {
    const r = canvas.getBoundingClientRect();
    vAng = Math.atan2(-(e.clientY - r.top - r.height / 2), e.clientX - r.left - r.width / 2);
    cv.redraw();
  }
}
