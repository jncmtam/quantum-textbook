// Quy tắc Born & nhiễu lấy mẫu: đo một qubit N lần trong cơ sở Z hoặc X; phép đo Z "mù" với pha φ.
import { h, palette, hiCanvas, slider, tex, piFmt, bars } from './util.js';

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">Quy tắc Born trong phòng thí nghiệm</span></div>
  <div class="sim-grid"><canvas class="sim-canvas"></canvas><div>
    <div class="sl"></div>
    <div class="btns"><button class="btn small on" data-b="z">Đo theo Z</button><button class="btn small" data-b="x">Đo theo X</button></div>
    <div class="btns"><button class="btn small primary" data-n="10">Đo 10 lần</button><button class="btn small" data-n="100">100</button><button class="btn small" data-n="1000">1000</button><button class="btn small ghost" data-n="0">Xóa</button></div>
    <div class="readout out"></div></div></div></div>`);
  root.appendChild(el);
  const th = slider('θ', { min: 0, max: Math.PI, step: 0.01, value: Math.PI / 3, fmt: piFmt });
  const ph = slider('φ', { min: 0, max: 2 * Math.PI, step: 0.01, value: 0, fmt: piFmt });
  el.querySelector('.sl').append(th.el, ph.el);
  let basis = 'z';
  let n0 = 0, n1 = 0;
  const p0 = () => (basis === 'z' ? Math.cos(th.value / 2) ** 2 : (1 + Math.sin(th.value) * Math.cos(ph.value)) / 2);
  const cv = hiCanvas(el.querySelector('canvas'), 0.62, (ctx, w, hh) => {
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const N = n0 + n1, p = p0();
    const vals = N ? [n0 / N, n1 / N] : [0, 0];
    bars(ctx, 30, 20, w - 60, hh - 60, vals, { max: 1, labels: basis === 'z' ? ['|0⟩', '|1⟩'] : ['|+⟩', '|−⟩'], theory: [p, 1 - p], pal, colors: [pal.accent, pal.teal] });
    ctx.fillStyle = pal.muted; ctx.font = '11px ui-monospace, monospace';
    ctx.fillText('Tần suất đo được (cột) · Xác suất Born (vạch đứt)', 30, 12);
    const se = N ? Math.sqrt((p * (1 - p)) / N) : 0;
    el.querySelector('.out').innerHTML = `${tex(`|\\psi\\rangle = \\cos\\tfrac{\\theta}{2}|0\\rangle + e^{i\\varphi}\\sin\\tfrac{\\theta}{2}|1\\rangle`)}<dl class="kv" style="margin-top:6px"><dt>Xác suất Born P(${basis === 'z' ? '0' : '+'})</dt><dd>${p.toFixed(4)}</dd><dt>Số lần đo N</dt><dd>${N}</dd><dt>Ước lượng p̂</dt><dd>${N ? (n0 / N).toFixed(4) : '—'}</dd><dt>Sai số chuẩn √(p(1−p)/N)</dt><dd>${N ? se.toFixed(4) : '—'}</dd></dl><div class="hint" style="margin-top:6px">${basis === 'z' ? 'Thử thay đổi φ: kết quả đo Z <b>không đổi</b>. Phép đo Z không “nhìn thấy” pha tương đối.' : 'Trong cơ sở X, P(+) = (1 + sin θ cos φ)/2 — giờ pha φ hiện ra trong thống kê.'}</div>`;
  });
  const reset = () => { n0 = n1 = 0; cv.redraw(); };
  th.on(reset); ph.on(reset);
  el.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.b) { basis = b.dataset.b; el.querySelectorAll('[data-b]').forEach((x) => x.classList.toggle('on', x === b)); reset(); }
    if (b.dataset.n !== undefined) {
      const n = +b.dataset.n;
      if (!n) return reset();
      const p = p0();
      for (let i = 0; i < n; i++) Math.random() < p ? n0++ : n1++;
      cv.redraw();
    }
  });
}
