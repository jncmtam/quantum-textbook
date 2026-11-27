// Grover: xem biên độ của N phần tử thay đổi qua từng bước "lật dấu" và "đảo quanh trung bình",
// cùng bức tranh hình học: mỗi vòng quay trạng thái một góc 2θ trong mặt phẳng span{|w⟩, |s′⟩}.
import { h, palette, hiCanvas, slider, tex } from './util.js';

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">Grover: đảo quanh trung bình</span></div>
  <div class="sim-grid"><div><canvas class="sim-canvas amps"></canvas><canvas class="sim-canvas geo" style="margin-top:10px"></canvas></div><div>
    <div class="sl"></div>
    <div class="btns"><button class="btn small" data-a="oracle">① Oracle: lật dấu phần tử đúng</button><button class="btn small" data-a="diff">② Khuếch tán: đảo quanh trung bình</button></div>
    <div class="btns"><button class="btn small primary" data-a="iter">Một vòng Grover (① + ②)</button><button class="btn small ghost" data-a="reset">Bắt đầu lại</button></div>
    <div class="readout out"></div></div></div></div>`);
  root.appendChild(el);
  const nS = slider('Số qubit n (N = 2ⁿ phần tử)', { min: 2, max: 7, step: 1, value: 4, fmt: (x) => `${x} → N = ${2 ** x}` });
  el.querySelector('.sl').appendChild(nS.el);
  let N, a, marked, iters, halfStep;
  const reset = () => {
    N = 2 ** nS.value;
    a = new Array(N).fill(1 / Math.sqrt(N));
    marked = Math.floor(N * 0.62);
    iters = 0;
    halfStep = false;
    draw();
  };
  const oracle = () => { a[marked] *= -1; halfStep = !halfStep; };
  const diff = () => { const m = a.reduce((x, y) => x + y, 0) / N; a = a.map((x) => 2 * m - x); if (halfStep) iters++; halfStep = false; };
  const ampCv = hiCanvas(el.querySelector('.amps'), 0.5, (ctx, w, hh) => {
    if (!a) return;
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const L = 8, Rr = w - 8, mid = hh * 0.55, sc = hh * 0.42;
    const bw = (Rr - L) / N;
    ctx.strokeStyle = pal.line2; ctx.beginPath(); ctx.moveTo(L, mid); ctx.lineTo(Rr, mid); ctx.stroke();
    a.forEach((v, i) => {
      ctx.fillStyle = i === marked ? pal.red : pal.accent;
      const y = Math.min(mid, mid - v * sc), hgt = Math.abs(v * sc);
      ctx.fillRect(L + i * bw + bw * 0.12, y, Math.max(1, bw * 0.76), hgt);
    });
    const m = a.reduce((x, y) => x + y, 0) / N;
    ctx.strokeStyle = pal.green; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(L, mid - m * sc); ctx.lineTo(Rr, mid - m * sc); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = pal.green; ctx.font = '11px ui-monospace, monospace'; ctx.fillText('trung bình', Rr - 70, mid - m * sc - 5);
    ctx.fillStyle = pal.muted; ctx.fillText('biên độ (đỏ: phần tử cần tìm)', L, 12);
  });
  const geoCv = hiCanvas(el.querySelector('.geo'), 0.5, (ctx, w, hh) => {
    if (!a) return;
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const ox = w * 0.12, oy = hh * 0.88, R = Math.min(w * 0.75, hh * 0.8);
    const aw = a[marked];
    const rest = Math.sqrt(Math.max(0, 1 - aw * aw)) * Math.sign(a.find((_, i) => i !== marked) || 1);
    ctx.strokeStyle = pal.line2;
    ctx.beginPath(); ctx.moveTo(ox - 10, oy); ctx.lineTo(ox + R + 10, oy); ctx.moveTo(ox, oy + 10); ctx.lineTo(ox, oy - R - 10); ctx.stroke();
    ctx.beginPath(); ctx.arc(ox, oy, R, -Math.PI / 2, 0); ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = pal.muted; ctx.font = '11px ui-monospace, monospace';
    ctx.fillText('|s′⟩ (các phần tử sai)', ox + R - 120, oy + 16); ctx.fillText('|w⟩ (đáp án)', ox + 6, oy - R - 2);
    const th = Math.asin(1 / Math.sqrt(N));
    ctx.strokeStyle = pal.line2; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + R * Math.cos(th), oy - R * Math.sin(th)); ctx.stroke();
    ctx.fillText('|s⟩', ox + R * Math.cos(th) + 4, oy - R * Math.sin(th));
    ctx.strokeStyle = pal.red; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + R * rest, oy - R * aw); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = pal.red; ctx.beginPath(); ctx.arc(ox + R * rest, oy - R * aw, 4, 0, 7); ctx.fill();
  });
  function draw() {
    ampCv.redraw();
    geoCv.redraw();
    const th = Math.asin(1 / Math.sqrt(N));
    const opt = Math.round(Math.PI / (4 * th) - 0.5);
    const p = a[marked] ** 2;
    el.querySelector('.out').innerHTML = `<dl class="kv"><dt>Số vòng đã chạy</dt><dd>${iters}${halfStep ? ' + ½ (mới qua oracle)' : ''}</dd><dt>P(đo ra đáp án)</dt><dd class="${p > 0.9 ? 'good' : ''}">${p.toFixed(4)}</dd><dt>Số vòng tối ưu ≈ (π/4)√N</dt><dd>${opt}</dd><dt>Tìm kiếm cổ điển trung bình cần</dt><dd>≈ ${(N / 2).toFixed(0)} lần thử</dd></dl><div class="hint">${tex(`\\sin\\theta = 1/\\sqrt N,\\ \\theta = ${((th * 180) / Math.PI).toFixed(2)}^\\circ`)}. Mỗi vòng quay trạng thái thêm 2θ về phía |w⟩. Chạy <b>quá</b> số vòng tối ưu và xác suất lại giảm — Grover không phải phép “khuếch đại mãi mãi”.</div>`;
  }
  nS.on(reset);
  el.addEventListener('click', (e) => {
    const x = e.target.closest('button')?.dataset.a;
    if (!x) return;
    if (x === 'oracle') oracle();
    if (x === 'diff') diff();
    if (x === 'iter') { if (!halfStep) oracle(); diff(); }
    if (x === 'reset') return reset();
    draw();
  });
  reset();
}
