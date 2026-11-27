// Mặt phẳng phức: kéo z₁, z₂; xem tổng, tích, và vì sao |z₁+z₂|² ≠ |z₁|²+|z₂|².
import { h, palette, hiCanvas, arrow, tex } from './util.js';

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">Mặt phẳng phức</span><span class="hint">Kéo đầu mũi tên z₁ (đỏ) và z₂ (xanh)</span></div>
  <div class="sim-grid"><canvas class="sim-canvas"></canvas><div>
    <div class="btns"><button class="btn small on" data-m="add">Phép cộng</button><button class="btn small" data-m="mul">Phép nhân</button><button class="btn small" data-m="spin">Quay theo thời gian</button></div>
    <div class="readout out"></div><p class="hint expl"></p></div></div></div>`);
  root.appendChild(el);
  let z1 = { re: 1.2, im: 0.5 }, z2 = { re: -0.4, im: 1.0 };
  let mode = 'add';
  let t = 0, raf = null;
  const S = 70; // pixel trên mỗi đơn vị
  const cv = hiCanvas(el.querySelector('canvas'), 0.8, draw);
  function draw(ctx, w, hh) {
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const ox = w / 2, oy = hh / 2;
    const P = (z) => [ox + z.re * S, oy - z.im * S];
    ctx.strokeStyle = pal.line;
    for (let k = -6; k <= 6; k++) {
      ctx.beginPath(); ctx.moveTo(ox + k * S, 0); ctx.lineTo(ox + k * S, hh); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, oy + k * S); ctx.lineTo(w, oy + k * S); ctx.stroke();
    }
    ctx.strokeStyle = pal.line2;
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, hh); ctx.stroke();
    ctx.beginPath(); ctx.arc(ox, oy, S, 0, 2 * Math.PI); ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = pal.muted; ctx.font = '12px ui-monospace, monospace';
    ctx.fillText('Re', w - 24, oy - 6); ctx.fillText('Im', ox + 6, 14);
    let a = z1, b = z2;
    if (mode === 'spin') {
      const w1 = 1, w2 = 1.6;
      a = rot(z1, w1 * t); b = rot(z2, w2 * t);
    }
    arrow(ctx, ox, oy, ...P(a), pal.red);
    if (mode === 'mul') {
      arrow(ctx, ox, oy, ...P(b), pal.blue);
      const p = { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
      arrow(ctx, ox, oy, ...P(p), pal.violet, 3);
      // cung góc
      for (const [z, c, r] of [[a, pal.red, 22], [b, pal.blue, 30], [p, pal.violet, 38]]) {
        ctx.strokeStyle = c; ctx.beginPath(); ctx.arc(ox, oy, r, 0, -Math.atan2(z.im, z.re), Math.atan2(z.im, z.re) > 0); ctx.stroke();
      }
    } else {
      // z2 đặt nối tiếp đầu z1 (quy tắc đầu–đuôi)
      const [ax, ay] = P(a);
      arrow(ctx, ax, ay, ax + b.re * S, ay - b.im * S, pal.blue);
      ctx.globalAlpha = 0.35; arrow(ctx, ox, oy, ...P(b), pal.blue, 1.5); ctx.globalAlpha = 1;
      const s = { re: a.re + b.re, im: a.im + b.im };
      arrow(ctx, ox, oy, ...P(s), pal.violet, 3);
    }
    show(a, b);
  }
  function show(a, b) {
    const m = (z) => Math.hypot(z.re, z.im), g = (z) => Math.atan2(z.im, z.re);
    const out = el.querySelector('.out');
    const f = (z) => `${z.re.toFixed(2)} ${z.im < 0 ? '-' : '+'} ${Math.abs(z.im).toFixed(2)}i`;
    if (mode === 'mul') {
      const p = { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
      out.innerHTML = `${tex(`z_1 = ${m(a).toFixed(2)}\\,e^{i\\,${g(a).toFixed(2)}}`)}<br>${tex(`z_2 = ${m(b).toFixed(2)}\\,e^{i\\,${g(b).toFixed(2)}}`)}<br>${tex(`z_1 z_2 = ${m(p).toFixed(2)}\\,e^{i\\,${g(p).toFixed(2)}}`)}`;
      el.querySelector('.expl').innerHTML = `Nhân hai số phức: <b>độ lớn nhân với nhau, góc cộng với nhau</b> (${(m(a) * m(b)).toFixed(2)} và ${(g(a) + g(b)).toFixed(2)} rad, sai khác bội 2π). Nhân với ${tex('e^{i\\alpha}')} chính là quay một góc α.`;
    } else {
      const s = { re: a.re + b.re, im: a.im + b.im };
      const sep = m(a) ** 2 + m(b) ** 2, tot = m(s) ** 2;
      const cross = tot - sep;
      out.innerHTML = `<dl class="kv"><dt>z₁</dt><dd>${f(a)}</dd><dt>z₂</dt><dd>${f(b)}</dd><dt>z₁+z₂</dt><dd>${f(s)}</dd><dt>|z₁|²+|z₂|²</dt><dd>${sep.toFixed(3)}</dd><dt>|z₁+z₂|²</dt><dd>${tot.toFixed(3)}</dd><dt>Số hạng giao thoa 2Re(z₁z̄₂)</dt><dd class="${cross >= 0 ? 'good' : 'bad'}">${cross >= 0 ? '+' : ''}${cross.toFixed(3)}</dd></dl>`;
      el.querySelector('.expl').innerHTML = mode === 'spin'
        ? 'Hai “kim đồng hồ” quay với tốc độ khác nhau: độ dài tổng dao động lên xuống — đó chính là hiện tượng phách (beat) và là mô hình của giao thoa theo thời gian.'
        : 'Độ dài bình phương của tổng phụ thuộc vào <b>góc lệch</b> giữa hai mũi tên. Cùng hướng: tăng cường; ngược hướng: triệt tiêu. Đây là toàn bộ bí mật của giao thoa lượng tử.';
    }
  }
  const rot = (z, a) => ({ re: z.re * Math.cos(a) - z.im * Math.sin(a), im: z.re * Math.sin(a) + z.im * Math.cos(a) });
  const canvas = el.querySelector('canvas');
  let drag = null;
  const toZ = (e) => {
    const r = canvas.getBoundingClientRect();
    return { re: (e.clientX - r.left - r.width / 2) / S, im: -(e.clientY - r.top - r.height / 2) / S };
  };
  canvas.addEventListener('pointerdown', (e) => {
    if (mode === 'spin') return;
    const z = toZ(e);
    const tip2 = mode === 'mul' ? z2 : { re: z1.re + z2.re, im: z1.im + z2.im };
    const d1 = Math.hypot(z.re - z1.re, z.im - z1.im), d2 = Math.hypot(z.re - tip2.re, z.im - tip2.im);
    drag = d1 < d2 ? 1 : 2;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const z = toZ(e);
    if (drag === 1) z1 = z;
    else z2 = mode === 'mul' ? z : { re: z.re - z1.re, im: z.im - z1.im };
    cv.redraw();
  });
  canvas.addEventListener('pointerup', () => (drag = null));
  el.querySelector('.btns').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    mode = b.dataset.m;
    el.querySelectorAll('.btns button').forEach((x) => x.classList.toggle('on', x === b));
    cancelAnimationFrame(raf);
    if (mode === 'spin') {
      const loop = () => { t += 0.02; cv.redraw(); raf = requestAnimationFrame(loop); };
      loop();
    } else cv.redraw();
  });
}
