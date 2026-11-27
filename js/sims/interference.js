// Thí nghiệm hai khe với từng hạt một: cộng biên độ (lượng tử) hay cộng xác suất (cổ điển)?
import { h, palette, hiCanvas, slider } from './util.js';

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">Hai khe, từng hạt một</span><span class="hint">Mỗi chấm là một hạt chạm màn</span></div>
  <div class="sim-grid"><canvas class="sim-canvas"></canvas><div>
    <div class="ctrl-box"></div>
    <div class="btns"><label class="hint"><input type="checkbox" class="which"> Đặt máy dò xem hạt đi qua khe nào</label></div>
    <div class="btns fire"><button class="btn small primary" data-n="1">Bắn 1 hạt</button><button class="btn small" data-n="100">Bắn 100</button><button class="btn small" data-n="2000">Bắn 2000</button><button class="btn small ghost" data-n="0">Xóa màn</button></div>
    <div class="readout out"></div></div></div></div>`);
  root.appendChild(el);
  const dS = slider('Khoảng cách hai khe d', { min: 1, max: 8, step: 0.1, value: 4, fmt: (x) => x.toFixed(1) });
  const lS = slider('Bước sóng λ', { min: 0.4, max: 2, step: 0.02, value: 1, fmt: (x) => x.toFixed(2) });
  const bS = slider('Độ mở của mỗi khe (biên độ khe 2 so với khe 1)', { min: 0, max: 1, step: 0.01, value: 1 });
  el.querySelector('.ctrl-box').append(dS.el, lS.el, bS.el);
  const which = el.querySelector('.which');
  let hits = [];
  const NX = 240;
  // Cường độ trên màn tại vị trí x ∈ [-1,1]
  const amp = (x) => {
    const L = 10, X = x * 6;
    const r1 = Math.hypot(L, X - dS.value / 2), r2 = Math.hypot(L, X + dS.value / 2);
    const k = (2 * Math.PI) / lS.value;
    const env = Math.exp(-(X * X) / 30); // đường bao do nhiễu xạ một khe (gần đúng)
    const a1 = { re: Math.cos(k * r1), im: Math.sin(k * r1) };
    const a2 = { re: bS.value * Math.cos(k * r2), im: bS.value * Math.sin(k * r2) };
    const pq = ((a1.re + a2.re) ** 2 + (a1.im + a2.im) ** 2) * env;
    const pc = (1 + bS.value ** 2) * env;
    return { pq, pc };
  };
  const dist = () => {
    const arr = [];
    for (let i = 0; i < NX; i++) {
      const x = -1 + (2 * (i + 0.5)) / NX;
      const a = amp(x);
      arr.push(which.checked ? a.pc : a.pq);
    }
    return arr;
  };
  const fire = (N) => {
    const d = dist();
    const cdf = [];
    let s = 0;
    for (const v of d) cdf.push((s += v));
    for (let k = 0; k < N; k++) {
      const r = Math.random() * s;
      let i = cdf.findIndex((c) => c >= r);
      hits.push({ x: -1 + (2 * (i + Math.random())) / NX, y: Math.random() });
    }
    if (hits.length > 30000) hits = hits.slice(-30000);
  };
  const cv = hiCanvas(el.querySelector('canvas'), 0.72, (ctx, w, hh) => {
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const scrTop = 10, scrH = hh * 0.46, gTop = scrTop + scrH + 18, gH = hh - gTop - 18;
    ctx.fillStyle = pal.paper; ctx.fillRect(10, scrTop, w - 20, scrH);
    ctx.strokeStyle = pal.line2; ctx.strokeRect(10, scrTop, w - 20, scrH);
    ctx.fillStyle = pal.accent;
    const r = hits.length > 3000 ? 0.9 : 1.6;
    for (const p of hits) { ctx.globalAlpha = hits.length > 3000 ? 0.5 : 0.85; ctx.beginPath(); ctx.arc(10 + ((p.x + 1) / 2) * (w - 20), scrTop + 3 + p.y * (scrH - 6), r, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;
    // biểu đồ phân bố
    const qs = [], cs = [];
    for (let i = 0; i < NX; i++) { const a = amp(-1 + (2 * (i + 0.5)) / NX); qs.push(a.pq); cs.push(a.pc); }
    const mx = Math.max(...qs, ...cs) || 1;
    const hist = new Array(60).fill(0);
    for (const p of hits) hist[Math.min(59, Math.floor(((p.x + 1) / 2) * 60))]++;
    const hm = Math.max(...hist, 1);
    ctx.fillStyle = pal.line2;
    const bw = (w - 20) / 60;
    // quy đổi histogram về cùng thang với đường cong
    const curveShown = which.checked ? cs : qs;
    const area = curveShown.reduce((a, b) => a + b, 0) / NX; // trung bình
    hist.forEach((c, i) => { if (!hits.length) return; const v = (c / hits.length) * 60 * area; ctx.fillRect(10 + i * bw + 1, gTop + gH - (v / mx) * gH, bw - 2, (v / mx) * gH); });
    const line = (arr, color, dash) => { ctx.strokeStyle = color; ctx.setLineDash(dash); ctx.lineWidth = 1.8; ctx.beginPath(); arr.forEach((v, i) => ctx.lineTo(10 + ((i + 0.5) / NX) * (w - 20), gTop + gH - (v / mx) * gH)); ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1; };
    line(cs, pal.amber, [5, 4]);
    line(qs, pal.red, which.checked ? [2, 4] : []);
    ctx.fillStyle = pal.muted; ctx.font = '11px ui-monospace, monospace';
    ctx.fillText('Màn hứng', 14, scrTop + 14);
    ctx.fillText('đỏ: |ψ₁+ψ₂|²   vàng: |ψ₁|²+|ψ₂|²   xám: số hạt đếm được', 14, hh - 4);
    el.querySelector('.out').innerHTML = `Số hạt: <b>${hits.length}</b><br>${which.checked ? '<span class="bad">Có máy dò đường đi:</span> vân giao thoa biến mất, phân bố trở thành tổng xác suất của hai khe (đường vàng).' : '<span class="good">Không biết hạt đi khe nào:</span> các biên độ cộng với nhau, xuất hiện vân sáng – tối (đường đỏ).'}<div class="hint">Khoảng vân ≈ λL/d: tăng d hoặc giảm λ → vân sít lại.</div>`;
  });
  const redraw = () => cv.redraw();
  [dS, lS, bS].forEach((s) => s.on(() => { hits = []; redraw(); }));
  which.addEventListener('change', () => { hits = []; redraw(); });
  el.querySelector('.fire').addEventListener('click', (e) => {
    const n = e.target.dataset.n;
    if (n === undefined) return;
    if (+n === 0) hits = [];
    else fire(+n);
    redraw();
  });
}
