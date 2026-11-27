// Tiện ích dùng chung cho các mô phỏng
import { tex } from '../markdown.js';
export { tex };

export const h = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};

/** Đọc màu từ biến CSS để canvas đổi theo giao diện sáng/tối */
export function palette() {
  const cs = getComputedStyle(document.documentElement);
  const v = (n) => cs.getPropertyValue(n).trim();
  return { bg: v('--bg-2'), paper: v('--paper'), ink: v('--ink'), ink2: v('--ink-2'), muted: v('--muted'), line: v('--line'), line2: v('--line-2'), accent: v('--accent'), red: v('--red'), green: v('--green'), amber: v('--amber'), teal: v('--teal'), violet: v('--violet'), blue: v('--blue') };
}

/** Canvas có độ phân giải cao, tự co giãn theo chiều rộng phần tử chứa. draw(ctx, w, h) */
export function hiCanvas(canvas, aspect, draw) {
  const ctx = canvas.getContext('2d');
  let w = 0, hh = 0;
  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    w = canvas.clientWidth || 300;
    hh = Math.round(w * aspect);
    canvas.style.height = hh + 'px';
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(hh * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(ctx, w, hh);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  document.addEventListener('themechange', resize);
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', resize);
  resize();
  return { redraw: () => draw(ctx, w, hh), get w() { return w; }, get h() { return hh; } };
}

export function slider(label, { min, max, step = 0.01, value, fmt = (v) => v.toFixed(2) }) {
  const el = h(`<div class="ctrl"><label><span>${label}</span><output></output></label><input type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`);
  const input = el.querySelector('input');
  const out = el.querySelector('output');
  const show = () => (out.innerHTML = fmt(+input.value));
  input.addEventListener('input', show);
  show();
  return { el, input, get value() { return +input.value; }, set value(v) { input.value = v; show(); }, on(fn) { input.addEventListener('input', () => fn(+input.value)); return this; } };
}

export const deg = (r) => `${Math.round((r * 180) / Math.PI)}°`;
export const piFmt = (r) => {
  const k = r / Math.PI;
  const fr = [[0, '0'], [0.25, 'π/4'], [0.5, 'π/2'], [0.75, '3π/4'], [1, 'π'], [1.25, '5π/4'], [1.5, '3π/2'], [1.75, '7π/4'], [2, '2π'], [-0.5, '−π/2'], [-0.25, '−π/4'], [-1, '−π']];
  for (const [v, s] of fr) if (Math.abs(k - v) < 0.004) return s;
  return `${k.toFixed(2)}π`;
};

/** Vẽ biểu đồ cột đơn giản */
export function bars(ctx, x, y, w, hh, values, { colors, labels, max = 1, theory, pal }) {
  const n = values.length;
  const bw = w / n;
  ctx.strokeStyle = pal.line2;
  ctx.beginPath();
  ctx.moveTo(x, y + hh);
  ctx.lineTo(x + w, y + hh);
  ctx.stroke();
  values.forEach((v, i) => {
    const bh = (Math.min(v, max) / max) * hh;
    ctx.fillStyle = Array.isArray(colors) ? colors[i % colors.length] : colors || pal.accent;
    ctx.fillRect(x + i * bw + bw * 0.15, y + hh - bh, bw * 0.7, bh);
    if (theory) {
      const th = (theory[i] / max) * hh;
      ctx.strokeStyle = pal.ink;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(x + i * bw + bw * 0.08, y + hh - th);
      ctx.lineTo(x + i * bw + bw * 0.92, y + hh - th);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (labels) {
      ctx.fillStyle = pal.muted;
      ctx.font = '11px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + i * bw + bw / 2, y + hh + 14);
    }
  });
}

/** Mũi tên 2D */
export function arrow(ctx, x1, y1, x2, y2, color, width = 2.5, head = 9) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2 - Math.cos(a) * head * 0.6, y2 - Math.sin(a) * head * 0.6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(a - 0.4), y2 - head * Math.sin(a - 0.4));
  ctx.lineTo(x2 - head * Math.cos(a + 0.4), y2 - head * Math.sin(a + 0.4));
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 1;
}
