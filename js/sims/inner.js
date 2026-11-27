// Tích trong & phép chiếu: kéo hai vectơ, xem ⟨u,v⟩, góc, hình chiếu — và cos²θ (tiền thân của quy tắc Born).
import { h, palette, hiCanvas, arrow, tex } from './util.js';

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">Tích trong & phép chiếu</span><span class="hint">Kéo đầu vectơ u (đỏ) và v (xanh)</span></div>
  <div class="sim-grid"><canvas class="sim-canvas"></canvas><div><div class="btns"><label class="hint"><input type="checkbox" class="unit" checked> Chuẩn hóa về độ dài 1</label></div><div class="readout out"></div><p class="hint expl"></p></div></div></div>`);
  root.appendChild(el);
  let u = { x: 1, y: 0 }, v = { x: 0.6, y: 0.8 };
  const unit = el.querySelector('.unit');
  const S = 110;
  const cv = hiCanvas(el.querySelector('canvas'), 0.75, (ctx, w, hh) => {
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const ox = w / 2, oy = hh * 0.62;
    const P = (p) => [ox + p.x * S, oy - p.y * S];
    ctx.strokeStyle = pal.line;
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, hh); ctx.stroke();
    if (unit.checked) { ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(ox, oy, S, 0, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([]); }
    const uu = u.x * u.x + u.y * u.y;
    const k = (u.x * v.x + u.y * v.y) / uu;
    const pr = { x: k * u.x, y: k * u.y };
    // đường kéo dài của u
    ctx.strokeStyle = pal.line2; ctx.setLineDash([2, 4]);
    ctx.beginPath(); ctx.moveTo(...P({ x: -3 * u.x, y: -3 * u.y })); ctx.lineTo(...P({ x: 3 * u.x, y: 3 * u.y })); ctx.stroke();
    ctx.setLineDash([4, 3]); ctx.strokeStyle = pal.muted;
    ctx.beginPath(); ctx.moveTo(...P(v)); ctx.lineTo(...P(pr)); ctx.stroke(); ctx.setLineDash([]);
    arrow(ctx, ox, oy, ...P(pr), pal.violet, 4);
    arrow(ctx, ox, oy, ...P(u), pal.red);
    arrow(ctx, ox, oy, ...P(v), pal.blue);
    ctx.fillStyle = pal.ink; ctx.font = '13px ui-monospace, monospace';
    ctx.fillText('u', ...P({ x: u.x * 1.08, y: u.y * 1.08 + 0.05 }));
    ctx.fillText('v', ...P({ x: v.x * 1.08, y: v.y * 1.08 + 0.05 }));
    const dot = u.x * v.x + u.y * v.y, nu = Math.sqrt(uu), nv = Math.hypot(v.x, v.y);
    const c = dot / (nu * nv);
    el.querySelector('.out').innerHTML = `<dl class="kv"><dt>⟨u, v⟩ = uₓvₓ + u_yv_y</dt><dd>${dot.toFixed(3)}</dd><dt>‖u‖, ‖v‖</dt><dd>${nu.toFixed(2)}, ${nv.toFixed(2)}</dd><dt>cos θ</dt><dd>${c.toFixed(3)}</dd><dt>Góc θ</dt><dd>${((Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI).toFixed(1)}°</dd><dt>cos²θ</dt><dd>${(c * c).toFixed(3)}</dd></dl>`;
    el.querySelector('.expl').innerHTML = Math.abs(c) < 0.03 ? '<b class="good">u và v trực giao</b>: tích trong bằng 0, hình chiếu bằng 0 — chúng “không có gì chung”.' : `Mũi tên tím là hình chiếu của v lên phương u: ${tex('\\frac{\\langle u,v\\rangle}{\\langle u,u\\rangle}u')}. Với hai vectơ đơn vị, ${tex('\\cos^2\\theta')} là “phần của v nằm theo phương u” — trong cơ học lượng tử con số này trở thành <b>xác suất</b>.`;
  });
  const canvas = el.querySelector('canvas');
  let drag = null;
  const toP = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left - r.width / 2) / S, y: -(e.clientY - r.top - r.height * 0.62) / S };
  };
  const norm = (p) => { const n = Math.hypot(p.x, p.y) || 1; return unit.checked ? { x: p.x / n, y: p.y / n } : p; };
  canvas.addEventListener('pointerdown', (e) => {
    const p = toP(e);
    drag = Math.hypot(p.x - u.x, p.y - u.y) < Math.hypot(p.x - v.x, p.y - v.y) ? 'u' : 'v';
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const p = norm(toP(e));
    if (Math.hypot(p.x, p.y) < 0.05) return;
    drag === 'u' ? (u = p) : (v = p);
    cv.redraw();
  });
  canvas.addEventListener('pointerup', () => (drag = null));
  unit.addEventListener('change', () => { u = norm(u); v = norm(v); cv.redraw(); });
}
