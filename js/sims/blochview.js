// Vẽ quả cầu Bloch trên canvas 2D bằng phép chiếu 3D đơn giản. Kéo để xoay góc nhìn.
import { palette, hiCanvas } from './util.js';

export class BlochView {
  constructor(canvas, { aspect = 1, labels = true, small = false } = {}) {
    this.canvas = canvas;
    this.vec = { x: 0, y: 0, z: 1 };
    this.trail = [];
    this.ghost = null;
    this.az = -0.55; // góc phương vị của camera
    this.el = 0.32; // góc nâng
    this.labels = labels;
    this.small = small;
    this.cv = hiCanvas(canvas, aspect, (ctx, w, h) => this.draw(ctx, w, h));
    let drag = null;
    canvas.addEventListener('pointerdown', (e) => {
      drag = { x: e.clientX, y: e.clientY, az: this.az, el: this.el };
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!drag) return;
      this.az = drag.az - (e.clientX - drag.x) * 0.01;
      this.el = Math.max(-1.3, Math.min(1.3, drag.el + (e.clientY - drag.y) * 0.01));
      this.redraw();
    });
    canvas.addEventListener('pointerup', () => (drag = null));
    canvas.style.cursor = 'grab';
  }
  set(v, { trail = false } = {}) {
    this.vec = { ...v };
    if (trail) {
      this.trail.push({ ...v });
      if (this.trail.length > 600) this.trail.shift();
    }
    this.redraw();
  }
  clearTrail() {
    this.trail = [];
    this.redraw();
  }
  redraw() {
    this.cv.redraw();
  }
  // Bloch (x,y,z) → màn hình. Trục z hướng lên, +x hướng về phía người xem (lệch trái), +y sang phải.
  proj(p, cx, cy, R) {
    const ca = Math.cos(this.az), sa = Math.sin(this.az);
    const x1 = p.x * ca - p.y * sa;
    const y1 = p.x * sa + p.y * ca;
    const ce = Math.cos(this.el), se = Math.sin(this.el);
    const sx = y1;
    const sy = p.z * ce - x1 * se;
    const depth = x1 * ce + p.z * se;
    return { X: cx + sx * R, Y: cy - sy * R, d: depth };
  }
  circle(ctx, f, cx, cy, R, color, front = true) {
    // f(t) → điểm trên quả cầu; vẽ phần trước nét liền, phần sau nét đứt
    const N = 96;
    const pts = [];
    for (let i = 0; i <= N; i++) pts.push(this.proj(f((2 * Math.PI * i) / N), cx, cy, R));
    for (const back of [true, false]) {
      ctx.beginPath();
      ctx.setLineDash(back ? [3, 4] : []);
      ctx.strokeStyle = color;
      ctx.globalAlpha = back ? 0.45 : 1;
      let pen = false;
      for (const p of pts) {
        const isBack = p.d < 0;
        if (isBack === back) {
          pen ? ctx.lineTo(p.X, p.Y) : ctx.moveTo(p.X, p.Y);
          pen = true;
        } else pen = false;
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }
  draw(ctx, w, h) {
    const pal = palette();
    ctx.clearRect(0, 0, w, h);
    const R = Math.min(w, h) * (this.small ? 0.36 : 0.37);
    const cx = w / 2, cy = h / 2;
    // khối cầu
    const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
    g.addColorStop(0, pal.paper);
    g.addColorStop(1, pal.bg);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = pal.line2;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.lineWidth = 1;
    this.circle(ctx, (t) => ({ x: Math.cos(t), y: Math.sin(t), z: 0 }), cx, cy, R, pal.line2);
    if (!this.small) {
      this.circle(ctx, (t) => ({ x: Math.cos(t), y: 0, z: Math.sin(t) }), cx, cy, R, pal.line);
      this.circle(ctx, (t) => ({ x: 0, y: Math.cos(t), z: Math.sin(t) }), cx, cy, R, pal.line);
    }
    // trục
    const axes = [
      [{ x: 0, y: 0, z: 1.15 }, '|0⟩'], [{ x: 0, y: 0, z: -1.15 }, '|1⟩'],
      [{ x: 1.18, y: 0, z: 0 }, '|+⟩'], [{ x: -1.18, y: 0, z: 0 }, '|−⟩'],
      [{ x: 0, y: 1.15, z: 0 }, '|+i⟩'], [{ x: 0, y: -1.15, z: 0 }, '|−i⟩'],
    ];
    const o = this.proj({ x: 0, y: 0, z: 0 }, cx, cy, R);
    for (const [p, lab] of axes) {
      const q = this.proj(p, cx, cy, R);
      ctx.strokeStyle = pal.line2;
      ctx.setLineDash(q.d < 0 ? [2, 3] : []);
      ctx.beginPath();
      ctx.moveTo(o.X, o.Y);
      ctx.lineTo(q.X, q.Y);
      ctx.stroke();
      ctx.setLineDash([]);
      if (this.labels && (!this.small || lab === '|0⟩' || lab === '|1⟩')) {
        ctx.fillStyle = pal.muted;
        ctx.font = `${this.small ? 10 : 12.5}px ui-monospace, Menlo, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const lq = this.proj({ x: p.x * 1.12, y: p.y * 1.12, z: p.z * 1.1 }, cx, cy, R);
        ctx.fillText(lab, lq.X, lq.Y);
      }
    }
    // vết
    if (this.trail.length > 1) {
      ctx.strokeStyle = pal.amber;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      this.trail.forEach((p, i) => {
        const q = this.proj(p, cx, cy, R);
        i ? ctx.lineTo(q.X, q.Y) : ctx.moveTo(q.X, q.Y);
      });
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    if (this.ghost) this.drawVec(ctx, this.ghost, cx, cy, R, pal.muted, true);
    this.drawVec(ctx, this.vec, cx, cy, R, pal.red, false, pal);
  }
  drawVec(ctx, v, cx, cy, R, color, ghost, pal) {
    const o = this.proj({ x: 0, y: 0, z: 0 }, cx, cy, R);
    const t = this.proj(v, cx, cy, R);
    if (!ghost && pal) {
      // hình chiếu xuống mặt phẳng xích đạo
      const e = this.proj({ x: v.x, y: v.y, z: 0 }, cx, cy, R);
      ctx.strokeStyle = pal.muted;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(t.X, t.Y);
      ctx.lineTo(e.X, e.Y);
      ctx.lineTo(o.X, o.Y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.strokeStyle = color;
    ctx.globalAlpha = ghost ? 0.5 : 1;
    ctx.lineWidth = this.small ? 2 : 3;
    ctx.beginPath();
    ctx.moveTo(o.X, o.Y);
    ctx.lineTo(t.X, t.Y);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(t.X, t.Y, this.small ? 3.5 : 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
  }
}

/** Quay vectơ v quanh trục đơn vị n một góc a (công thức Rodrigues) */
export function rotate(v, n, a) {
  const c = Math.cos(a), s = Math.sin(a);
  const dot = v.x * n.x + v.y * n.y + v.z * n.z;
  const cr = { x: n.y * v.z - n.z * v.y, y: n.z * v.x - n.x * v.z, z: n.x * v.y - n.y * v.x };
  return {
    x: v.x * c + cr.x * s + n.x * dot * (1 - c),
    y: v.y * c + cr.y * s + n.y * dot * (1 - c),
    z: v.z * c + cr.z * s + n.z * dot * (1 - c),
  };
}
