// VQE cho một qubit: H = a·Z + b·X, ansatz |ψ(θ)⟩ = Ry(θ)|0⟩ ⇒ E(θ) = a cos θ + b sin θ.
// Tối ưu bằng gradient theo quy tắc dịch tham số (parameter-shift), có thể thêm nhiễu lấy mẫu (shots).
import { h, palette, hiCanvas, slider, tex } from './util.js';

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">VQE: đi xuống cảnh quan năng lượng</span></div>
  <div class="sim-grid"><canvas class="sim-canvas"></canvas><div>
    <div class="sl"></div>
    <div class="btns"><button class="btn small primary" data-a="step">1 bước gradient</button><button class="btn small" data-a="run">Chạy 40 bước</button><button class="btn small ghost" data-a="reset">Khởi tạo lại θ</button></div>
    <div class="readout out"></div></div></div></div>`);
  root.appendChild(el);
  const aS = slider('Hệ số a (của Z)', { min: -1, max: 1, step: 0.01, value: 0.6 });
  const bS = slider('Hệ số b (của X)', { min: -1, max: 1, step: 0.01, value: 0.8 });
  const lr = slider('Tốc độ học η', { min: 0.05, max: 1.5, step: 0.01, value: 0.4 });
  const shots = slider('Số shot mỗi lần ước lượng (0 = chính xác)', { min: 0, max: 2000, step: 10, value: 200, fmt: (x) => (x ? x.toFixed(0) : '∞') });
  el.querySelector('.sl').append(aS.el, bS.el, lr.el, shots.el);
  let theta = 2.6, hist = [], evals = 0;
  const Eexact = (t) => aS.value * Math.cos(t) + bS.value * Math.sin(t);
  // Ước lượng ⟨Z⟩ và ⟨X⟩ bằng lấy mẫu: mỗi đại lượng cần một cấu hình đo riêng
  const est = (t) => {
    const N = shots.value;
    evals++;
    if (!N) return Eexact(t);
    const pz = (1 + Math.cos(t)) / 2, px = (1 + Math.sin(t)) / 2;
    let kz = 0, kx = 0;
    for (let i = 0; i < N; i++) { if (Math.random() < pz) kz++; if (Math.random() < px) kx++; }
    return aS.value * (2 * kz / N - 1) + bS.value * (2 * kx / N - 1);
  };
  const step = () => {
    const g = (est(theta + Math.PI / 2) - est(theta - Math.PI / 2)) / 2; // parameter-shift: chính xác, không phải sai phân
    theta -= lr.value * g;
    hist.push({ t: theta, e: est(theta) });
  };
  const cv = hiCanvas(el.querySelector('canvas'), 0.72, (ctx, w, hh) => {
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const L = 36, Rr = w - 10, T = 14, B = hh * 0.62;
    const r = Math.hypot(aS.value, bS.value) || 1;
    const X = (t) => L + (((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) / (2 * Math.PI) * (Rr - L);
    const Y = (e) => (T + B) / 2 - (e / (r * 1.1)) * ((B - T) / 2);
    ctx.strokeStyle = pal.line2; ctx.beginPath(); ctx.moveTo(L, Y(0)); ctx.lineTo(Rr, Y(0)); ctx.stroke();
    ctx.strokeStyle = pal.accent; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 300; i++) { const t = (i / 300) * 2 * Math.PI; ctx.lineTo(X(t) - (i === 300 ? 0.01 : 0), Y(Eexact(t))); }
    ctx.stroke(); ctx.lineWidth = 1;
    ctx.strokeStyle = pal.green; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(L, Y(-r)); ctx.lineTo(Rr, Y(-r)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = pal.green; ctx.font = '11px ui-monospace, monospace'; ctx.fillText('E₀ = −√(a²+b²)', L + 4, Y(-r) + 13);
    ctx.fillStyle = pal.muted; ctx.fillText('E(θ)', 4, T + 6); ctx.fillText('θ: 0 → 2π', Rr - 70, B + 14);
    ctx.fillStyle = pal.red; ctx.beginPath(); ctx.arc(X(theta), Y(Eexact(theta)), 6, 0, 7); ctx.fill();
    // đường hội tụ
    const T2 = B + 28, B2 = hh - 10;
    ctx.strokeStyle = pal.line2; ctx.beginPath(); ctx.moveTo(L, B2); ctx.lineTo(Rr, B2); ctx.stroke();
    if (hist.length) {
      const errs = hist.map((p) => Math.max(1e-6, Eexact(p.t) + r));
      const lmax = 1, lmin = -6;
      const Yl = (v) => T2 + ((lmax - Math.log10(v)) / (lmax - lmin)) * (B2 - T2);
      ctx.strokeStyle = pal.teal; ctx.beginPath();
      errs.forEach((v, i) => ctx.lineTo(L + (i / Math.max(40, errs.length)) * (Rr - L), Yl(v))); ctx.stroke();
      ctx.fillStyle = pal.muted; ctx.fillText('sai số E − E₀ (thang log) theo số bước', L + 4, T2 + 4);
    }
    const e = Eexact(theta);
    el.querySelector('.out').innerHTML = `${tex('H = aZ + bX,\\quad E(\\theta) = \\langle\\psi(\\theta)|H|\\psi(\\theta)\\rangle = a\\cos\\theta + b\\sin\\theta')}<dl class="kv" style="margin-top:6px"><dt>θ hiện tại</dt><dd>${theta.toFixed(3)}</dd><dt>E(θ) chính xác</dt><dd>${e.toFixed(4)}</dd><dt>Năng lượng cơ bản E₀</dt><dd>${(-r).toFixed(4)}</dd><dt>Số lần gọi máy lượng tử</dt><dd>${evals}</dd></dl><div class="hint">${tex('\\partial_\\theta E = \\tfrac12\\,[E(\\theta+\\tfrac\\pi2) - E(\\theta-\\tfrac\\pi2)]')} — gradient chính xác từ hai lần đo. Với số shot hữu hạn, mỗi ước lượng có sai số ~1/√N nên θ “rung” quanh cực tiểu: sai số không thể nhỏ hơn mức nhiễu lấy mẫu.</div>`;
  });
  const reset = () => { theta = 2.6; hist = []; evals = 0; cv.redraw(); };
  [aS, bS].forEach((s) => s.on(reset));
  el.querySelector('.btns').addEventListener('click', (e) => {
    const a = e.target.dataset.a;
    if (a === 'step') step();
    if (a === 'run') for (let i = 0; i < 40; i++) step();
    if (a === 'reset') return reset();
    cv.redraw();
  });
}
