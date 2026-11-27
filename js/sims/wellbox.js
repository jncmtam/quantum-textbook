// Hạt trong hộp thế vô hạn: chồng chập các trạng thái dừng ψₙ(x) = √2 sin(nπx), Eₙ = n²E₁.
import { h, palette, hiCanvas, slider, tex } from './util.js';

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">Hạt trong hộp</span><span class="hint">Mật độ xác suất |ψ(x,t)|² (tô màu) và Re ψ (đường mảnh)</span></div>
  <div class="sim-grid"><canvas class="sim-canvas"></canvas><div>
    <div class="cs"></div>
    <div class="btns"><button class="btn small primary" data-a="play">▶ Chạy thời gian</button><button class="btn small ghost" data-a="pause">Dừng</button><button class="btn small ghost" data-a="t0">t = 0</button></div>
    <div class="readout out"></div></div></div></div>`);
  root.appendChild(el);
  const cs = [1, 0.7, 0, 0].map((v, i) => slider(`Hệ số c${i + 1} (trạng thái n = ${i + 1}, E = ${(i + 1) ** 2}E₁)`, { min: 0, max: 1, step: 0.01, value: v }));
  cs.forEach((s) => el.querySelector('.cs').appendChild(s.el));
  let t = 0, raf = null;
  const cv = hiCanvas(el.querySelector('canvas'), 0.62, (ctx, w, hh) => {
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const c = cs.map((s) => s.value);
    const nrm = Math.sqrt(c.reduce((a, b) => a + b * b, 0)) || 1;
    const cn = c.map((x) => x / nrm);
    const N = 300, L = 30, Rr = w - 30, B = hh - 24, T = 16;
    const re = [], im = [], rho = [];
    let mx = 0;
    for (let i = 0; i <= N; i++) {
      const x = i / N;
      let r = 0, m = 0;
      cn.forEach((ck, k) => {
        const n = k + 1, ps = Math.SQRT2 * Math.sin(n * Math.PI * x), E = n * n;
        r += ck * ps * Math.cos(-E * t);
        m += ck * ps * Math.sin(-E * t);
      });
      re.push(r); im.push(m); rho.push(r * r + m * m);
      mx = Math.max(mx, r * r + m * m, Math.abs(r));
    }
    mx = Math.max(mx, 2);
    const X = (i) => L + (i / N) * (Rr - L);
    const Y0 = (B + T) / 2 + (B - T) * 0.25;
    const sc = (B - T) * 0.7 / mx;
    ctx.fillStyle = pal.ink2;
    ctx.fillRect(L - 6, T, 6, B - T); ctx.fillRect(Rr, T, 6, B - T);
    ctx.strokeStyle = pal.line2; ctx.beginPath(); ctx.moveTo(L, Y0); ctx.lineTo(Rr, Y0); ctx.stroke();
    ctx.fillStyle = pal.accent; ctx.globalAlpha = 0.28; ctx.beginPath(); ctx.moveTo(X(0), Y0);
    rho.forEach((v, i) => ctx.lineTo(X(i), Y0 - v * sc)); ctx.lineTo(X(N), Y0); ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = pal.accent; ctx.lineWidth = 2; ctx.beginPath(); rho.forEach((v, i) => ctx.lineTo(X(i), Y0 - v * sc)); ctx.stroke();
    ctx.strokeStyle = pal.red; ctx.lineWidth = 1; ctx.beginPath(); re.forEach((v, i) => ctx.lineTo(X(i), Y0 - v * sc)); ctx.stroke();
    // ⟨x⟩
    let ex = 0;
    rho.forEach((v, i) => (ex += (v * (i / N)) / N));
    ctx.strokeStyle = pal.green; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(L + ex * (Rr - L), T); ctx.lineTo(L + ex * (Rr - L), B); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = pal.green; ctx.font = '11px ui-monospace, monospace'; ctx.fillText('⟨x⟩', L + ex * (Rr - L) + 4, T + 10);
    const pE = cn.map((x) => x * x);
    const E = pE.reduce((a, p, k) => a + p * (k + 1) ** 2, 0);
    const active = cn.filter((x) => x > 1e-3).length;
    el.querySelector('.out').innerHTML = `${tex('\\psi(x,t) = \\sum_n c_n\\,\\psi_n(x)\\,e^{-iE_n t/\\hbar}')}<dl class="kv" style="margin-top:6px"><dt>Thời gian t (đơn vị ħ/E₁)</dt><dd>${t.toFixed(2)}</dd><dt>Xác suất đo được Eₙ: |cₙ|²</dt><dd>${pE.map((p) => p.toFixed(2)).join(' · ')}</dd><dt>⟨E⟩ (không đổi theo t)</dt><dd>${E.toFixed(3)} E₁</dd><dt>⟨x⟩</dt><dd>${ex.toFixed(3)}</dd></dl><div class="hint">${active <= 1 ? 'Chỉ một trạng thái dừng: |ψ|² hoàn toàn đứng yên — chỉ có pha toàn cục quay.' : 'Chồng chập nhiều mức năng lượng: các pha quay với tốc độ khác nhau (Eₙ), giao thoa giữa chúng làm “cục” xác suất dao động qua lại.'}</div>`;
  });
  cs.forEach((s) => s.on(() => cv.redraw()));
  el.querySelector('.btns').addEventListener('click', (e) => {
    const a = e.target.dataset.a;
    if (a === 'play') {
      cancelAnimationFrame(raf);
      let last = performance.now();
      const loop = (now) => { t += ((now - last) / 1000) * 0.5; last = now; cv.redraw(); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    if (a === 'pause') cancelAnimationFrame(raf);
    if (a === 't0') { t = 0; cv.redraw(); }
  });
}
