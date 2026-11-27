// Giao thoa kế Mach–Zehnder với từng photon. Bộ tách chùm BS = (1/√2)[[1, i],[i, 1]].
import { h, palette, hiCanvas, slider, tex, piFmt } from './util.js';

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">Giao thoa kế Mach–Zehnder</span><span class="hint">Một photon mỗi lần</span></div>
  <div class="sim-grid"><canvas class="sim-canvas"></canvas><div>
    <div class="phase"></div>
    <div class="btns" style="flex-direction:column;align-items:flex-start"><label class="hint"><input type="checkbox" class="bs2" checked> Có bộ tách chùm thứ hai (BS₂)</label><label class="hint"><input type="checkbox" class="det"> Đặt máy dò “photon đi nhánh nào”</label><label class="hint"><input type="checkbox" class="block"> Chặn nhánh trên</label></div>
    <div class="btns"><button class="btn small primary" data-n="1">Gửi 1 photon</button><button class="btn small" data-n="200">Gửi 200</button><button class="btn small ghost" data-n="0">Đặt lại bộ đếm</button></div>
    <div class="readout out"></div></div></div></div>`);
  root.appendChild(el);
  const ph = slider('Độ lệch pha φ trên nhánh trên', { min: 0, max: 2 * Math.PI, step: 0.01, value: 0, fmt: piFmt });
  el.querySelector('.phase').appendChild(ph.el);
  const bs2 = el.querySelector('.bs2'), det = el.querySelector('.det'), block = el.querySelector('.block');
  let counts = [0, 0], absorbed = 0, last = null, flash = 0;
  const probs = () => {
    // trạng thái sau BS1: (1/√2)(|dưới⟩ + i|trên⟩) với photon đi vào từ trái theo nhánh dưới
    const s2 = Math.SQRT1_2;
    let lo = { re: s2, im: 0 }, up = { re: 0, im: s2 };
    const c = Math.cos(ph.value), s = Math.sin(ph.value);
    up = { re: up.re * c - up.im * s, im: up.re * s + up.im * c };
    let pAbs = 0;
    if (block.checked) { pAbs = 0.5; up = { re: 0, im: 0 }; }
    if (!bs2.checked) return { D0: lo.re ** 2 + lo.im ** 2, D1: up.re ** 2 + up.im ** 2, pAbs };
    if (det.checked) {
      // máy dò phá hủy sự chồng chập: hai nhánh đi qua BS₂ độc lập, mỗi nhánh chia đôi
      const pl = lo.re ** 2 + lo.im ** 2, pu = up.re ** 2 + up.im ** 2;
      return { D0: (pl + pu) / 2, D1: (pl + pu) / 2, pAbs };
    }
    // BS2: D0 = (lo + i·up)/√2, D1 = (i·lo + up)/√2
    const d0 = { re: s2 * (lo.re - up.im), im: s2 * (lo.im + up.re) };
    const d1 = { re: s2 * (-lo.im + up.re), im: s2 * (lo.re + up.im) };
    return { D0: d0.re ** 2 + d0.im ** 2, D1: d1.re ** 2 + d1.im ** 2, pAbs };
  };
  const send = (N) => {
    for (let k = 0; k < N; k++) {
      const p = probs();
      const r = Math.random();
      if (r < p.pAbs) { absorbed++; last = 'abs'; }
      else if (r < p.pAbs + p.D0) { counts[0]++; last = 0; }
      else { counts[1]++; last = 1; }
    }
    flash = performance.now();
  };
  const cv = hiCanvas(el.querySelector('canvas'), 0.7, (ctx, w, hh) => {
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const x0 = w * 0.08, x1 = w * 0.3, x2 = w * 0.72, yLo = hh * 0.75, yUp = hh * 0.28;
    const p = probs();
    const beam = (xa, ya, xb, yb, intensity, color = pal.red) => {
      ctx.strokeStyle = color; ctx.globalAlpha = 0.25 + 0.75 * Math.min(1, intensity); ctx.lineWidth = 1 + 6 * intensity;
      ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb, yb); ctx.stroke(); ctx.globalAlpha = 1; ctx.lineWidth = 1;
    };
    beam(x0, yLo, x1, yLo, 1);
    beam(x1, yLo, x2, yLo, 0.5);
    beam(x1, yLo, x1, yUp, block.checked ? 0.5 : 0.5);
    if (!block.checked) beam(x1, yUp, x2, yUp, 0.5);
    beam(x2, yUp, x2, yLo, block.checked ? 0 : 0.5);
    if (bs2.checked) {
      beam(x2, yLo, w * 0.92, yLo, p.D0);
      beam(x2, yLo, x2, hh * 0.06, p.D1);
    } else {
      beam(x2, yLo, w * 0.92, yLo, p.D0);
      beam(x2, yUp, x2, hh * 0.06, p.D1);
    }
    // gương & bộ tách chùm
    const bs = (x, y, label, on = true) => {
      ctx.strokeStyle = on ? pal.accent : pal.line2; ctx.lineWidth = 4; ctx.globalAlpha = on ? 0.8 : 0.4;
      ctx.beginPath(); ctx.moveTo(x - 14, y + 14); ctx.lineTo(x + 14, y - 14); ctx.stroke(); ctx.globalAlpha = 1; ctx.lineWidth = 1;
      ctx.fillStyle = pal.muted; ctx.font = '11px ui-monospace, monospace'; ctx.fillText(label, x + 10, y + 26);
    };
    bs(x1, yLo, 'BS₁');
    bs(x2, yLo, 'BS₂', bs2.checked);
    ctx.strokeStyle = pal.ink2; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(x1 - 14, yUp + 14); ctx.lineTo(x1 + 14, yUp - 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2 - 14, yUp + 14); ctx.lineTo(x2 + 14, yUp - 14); ctx.stroke(); ctx.lineWidth = 1;
    // bộ dịch pha
    ctx.fillStyle = pal.amber; ctx.globalAlpha = 0.6; ctx.fillRect((x1 + x2) / 2 - 12, yUp - 12, 24, 24); ctx.globalAlpha = 1;
    ctx.fillStyle = pal.ink; ctx.font = '12px ui-monospace, monospace'; ctx.fillText('φ', (x1 + x2) / 2 - 4, yUp + 4);
    if (det.checked) { ctx.strokeStyle = pal.teal; ctx.lineWidth = 2; ctx.strokeRect((x1 + x2) / 2 - 18, yLo - 16, 36, 32); ctx.lineWidth = 1; ctx.fillStyle = pal.teal; ctx.fillText('dò', (x1 + x2) / 2 - 8, yLo + 30); }
    if (block.checked) { ctx.fillStyle = pal.ink2; ctx.fillRect(x1 + 30, yUp - 14, 10, 28); }
    // đầu dò
    const lit = performance.now() - flash < 250;
    const detBox = (x, y, label, i) => {
      ctx.fillStyle = lit && last === i ? pal.green : pal.paper; ctx.strokeStyle = pal.ink2;
      ctx.beginPath(); ctx.arc(x, y, 14, 0, 7); ctx.fill(); ctx.stroke();
      ctx.fillStyle = pal.ink; ctx.fillText(`${label}: ${counts[i]}`, x - 24, y + (i ? -22 : 30));
    };
    detBox(w * 0.94, yLo, 'D₀', 0);
    detBox(x2, hh * 0.06 + 14, 'D₁', 1);
    ctx.fillStyle = pal.muted; ctx.fillText('nguồn', x0 - 10, yLo + 26);
    const tot = counts[0] + counts[1];
    el.querySelector('.out').innerHTML = `${tex(`P(D_0) = ${p.D0.toFixed(3)},\\quad P(D_1) = ${p.D1.toFixed(3)}`)}<div>Đếm: D₀ = ${counts[0]}, D₁ = ${counts[1]}${absorbed ? `, bị chặn = ${absorbed}` : ''}${tot ? ` (tỉ lệ D₀ ≈ ${(counts[0] / tot).toFixed(2)})` : ''}</div><div class="hint">${!bs2.checked ? 'Không có BS₂: mỗi photon cho biết nó đi nhánh nào — 50/50, không giao thoa.' : det.checked ? 'Có thông tin đường đi: hai khả năng không còn giao thoa → 50/50 bất kể φ.' : block.checked ? 'Chặn một nhánh: giờ D₀ cũng nhận được photon — dù khi mở cả hai nhánh với φ = 0, D₀ không bao giờ sáng! Mở thêm một con đường lại làm một kết quả biến mất.' : 'Hai “con đường” cộng biên độ: với φ = 0 mọi photon đến D₁, D₀ tối hoàn toàn; với φ = π thì ngược lại. P(D₀) = sin²(φ/2).'}</div>`;
    if (lit) requestAnimationFrame(() => cv.redraw());
  });
  ph.on(() => cv.redraw());
  [bs2, det, block].forEach((c) => c.addEventListener('change', () => { counts = [0, 0]; absorbed = 0; cv.redraw(); }));
  el.querySelectorAll('.btns')[1].addEventListener('click', (e) => {
    const n = e.target.dataset.n;
    if (n === undefined) return;
    if (+n === 0) { counts = [0, 0]; absorbed = 0; } else send(+n);
    cv.redraw();
  });
}
