// Luật số lớn (tung đồng xu) & định lý giới hạn trung tâm (tổng nhiều xúc xắc).
import { h, palette, hiCanvas, slider } from './util.js';

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">Phòng thí nghiệm xác suất</span></div>
  <div class="btns tabs"><button class="btn small on" data-t="lln">Luật số lớn</button><button class="btn small" data-t="clt">Giới hạn trung tâm</button></div>
  <div class="sim-grid"><canvas class="sim-canvas"></canvas><div class="side"></div></div></div>`);
  root.appendChild(el);
  const side = el.querySelector('.side');
  let tab = 'lln';
  // --- LLN ---
  const pS = slider('Xác suất ra mặt ngửa p', { min: 0, max: 1, step: 0.01, value: 0.5 });
  let flips = [], heads = 0;
  // --- CLT ---
  const nS = slider('Số xúc xắc cộng lại n', { min: 1, max: 30, step: 1, value: 1, fmt: (x) => x.toFixed(0) });
  let sums = [];
  const llnUI = h(`<div></div>`);
  llnUI.append(pS.el, h(`<div class="btns"><button class="btn small primary" data-a="1">Tung 1</button><button class="btn small" data-a="100">Tung 100</button><button class="btn small" data-a="2000">Tung 2000</button><button class="btn small ghost" data-a="reset">Làm lại</button></div>`), h(`<div class="readout ro"></div>`), h(`<p class="hint">Đường liền: tỉ lệ mặt ngửa sau N lần tung. Vùng mờ: dải ±1 độ lệch chuẩn của trung bình, ${'σ/√N = √(p(1−p)/N)'}. Sai số giảm theo 1/√N — muốn chính xác gấp 10 lần phải tung gấp 100 lần. Quy luật này sẽ quay lại khi ta ước lượng xác suất trên máy tính lượng tử (“shot noise”).</p>`));
  const cltUI = h(`<div></div>`);
  cltUI.append(nS.el, h(`<div class="btns"><button class="btn small primary" data-c="500">Gieo 500 lần</button><button class="btn small" data-c="5000">Gieo 5000 lần</button><button class="btn small ghost" data-c="reset">Làm lại</button></div>`), h(`<div class="readout ro2"></div>`), h(`<p class="hint">Một xúc xắc cho phân phối đều. Cộng vài xúc xắc, biểu đồ đã có hình chuông. Đường đứt nét là phân phối chuẩn có cùng trung bình 3,5n và phương sai 35n/12. Chuyện này xảy ra với hầu như mọi phân phối có phương sai hữu hạn.</p>`));
  pS.on(() => { flips = []; heads = 0; cv.redraw(); });
  nS.on(() => { sums = []; cv.redraw(); });
  llnUI.addEventListener('click', (e) => {
    const a = e.target.dataset.a;
    if (!a) return;
    if (a === 'reset') (flips = []), (heads = 0);
    else for (let i = 0; i < +a && flips.length < 20000; i++) { heads += Math.random() < pS.value; flips.push(heads / (flips.length + 1)); }
    cv.redraw();
  });
  cltUI.addEventListener('click', (e) => {
    const c = e.target.dataset.c;
    if (!c) return;
    if (c === 'reset') sums = [];
    else for (let i = 0; i < +c; i++) { let s = 0; for (let k = 0; k < nS.value; k++) s += 1 + Math.floor(Math.random() * 6); sums.push(s); }
    cv.redraw();
  });
  const cv = hiCanvas(el.querySelector('canvas'), 0.68, (ctx, w, hh) => {
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const L = 40, B = hh - 28, T = 14, Rr = w - 12;
    ctx.strokeStyle = pal.line2;
    ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(Rr, B); ctx.stroke();
    ctx.fillStyle = pal.muted; ctx.font = '11px ui-monospace, monospace';
    if (tab === 'lln') {
      const p = pS.value, N = Math.max(10, flips.length);
      const X = (i) => L + ((Math.log10(i + 1)) / Math.log10(N + 1)) * (Rr - L);
      const Y = (v) => B - v * (B - T);
      ctx.fillStyle = pal.accent; ctx.globalAlpha = 0.12; ctx.beginPath();
      for (let i = 0; i <= N; i++) ctx.lineTo(X(i), Y(Math.min(1, p + Math.sqrt((p * (1 - p)) / (i + 1)))));
      for (let i = N; i >= 0; i--) ctx.lineTo(X(i), Y(Math.max(0, p - Math.sqrt((p * (1 - p)) / (i + 1)))));
      ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = pal.ink; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(L, Y(p)); ctx.lineTo(Rr, Y(p)); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = pal.red; ctx.lineWidth = 1.6; ctx.beginPath();
      flips.forEach((v, i) => ctx.lineTo(X(i), Y(v))); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = pal.muted;
      ctx.fillText('1', L - 14, T + 4); ctx.fillText('0', L - 14, B); ctx.fillText('N (thang log) →', Rr - 110, B + 18);
      llnUI.querySelector('.ro').innerHTML = `<dl class="kv"><dt>Số lần tung N</dt><dd>${flips.length}</dd><dt>Tỉ lệ ngửa</dt><dd>${flips.length ? flips[flips.length - 1].toFixed(4) : '—'}</dd><dt>Sai số so với p</dt><dd>${flips.length ? Math.abs(flips[flips.length - 1] - p).toFixed(4) : '—'}</dd><dt>σ/√N dự đoán</dt><dd>${flips.length ? Math.sqrt((p * (1 - p)) / flips.length).toFixed(4) : '—'}</dd></dl>`;
    } else {
      const n = nS.value, lo = n, hi = 6 * n, K = hi - lo + 1;
      const cnt = new Array(K).fill(0);
      for (const s of sums) cnt[s - lo]++;
      const tot = sums.length || 1;
      const mu = 3.5 * n, sd = Math.sqrt((35 * n) / 12);
      const pdf = (x) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
      const maxY = Math.max(pdf(mu) * 1.15, ...cnt.map((c) => c / tot));
      const bw = (Rr - L) / K;
      ctx.fillStyle = pal.teal;
      cnt.forEach((c, i) => { const bh = ((c / tot) / maxY) * (B - T); ctx.fillRect(L + i * bw + bw * 0.1, B - bh, Math.max(1, bw * 0.8), bh); });
      ctx.strokeStyle = pal.ink; ctx.setLineDash([4, 3]); ctx.beginPath();
      for (let i = 0; i <= 200; i++) { const x = lo - 0.5 + (i / 200) * K; ctx.lineTo(L + (x - lo + 0.5) * bw, B - (pdf(x) / maxY) * (B - T)); }
      ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = pal.muted; ctx.fillText(String(lo), L, B + 16); ctx.fillText(String(hi), Rr - 20, B + 16);
      const mean = sums.reduce((a, b) => a + b, 0) / tot;
      const varr = sums.reduce((a, b) => a + (b - mean) ** 2, 0) / tot;
      cltUI.querySelector('.ro2').innerHTML = `<dl class="kv"><dt>Số lần gieo</dt><dd>${sums.length}</dd><dt>Trung bình mẫu / lý thuyết</dt><dd>${sums.length ? mean.toFixed(2) : '—'} / ${mu.toFixed(2)}</dd><dt>Phương sai mẫu / lý thuyết</dt><dd>${sums.length ? varr.toFixed(2) : '—'} / ${(sd * sd).toFixed(2)}</dd></dl>`;
    }
  });
  const setTab = (t) => {
    tab = t;
    side.innerHTML = '';
    side.appendChild(t === 'lln' ? llnUI : cltUI);
    el.querySelectorAll('.tabs button').forEach((b) => b.classList.toggle('on', b.dataset.t === t));
    cv.redraw();
  };
  el.querySelector('.tabs').addEventListener('click', (e) => e.target.dataset.t && setTab(e.target.dataset.t));
  setTab('lln');
}
