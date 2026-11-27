// Lõi mô phỏng lượng tử nhỏ gọn: số phức, vectơ trạng thái n qubit, cổng, phép đo, vectơ Bloch rút gọn.
// Quy ước thứ tự: |q0 q1 … q(n-1)⟩ — qubit 0 là bit trái nhất (giống Nielsen & Chuang).

export const C = (re, im = 0) => ({ re, im });
export const cadd = (a, b) => C(a.re + b.re, a.im + b.im);
export const cmul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
export const conj = (a) => C(a.re, -a.im);
export const abs2 = (a) => a.re * a.re + a.im * a.im;
export const expi = (t) => C(Math.cos(t), Math.sin(t));

const s2 = Math.SQRT1_2;
export const GATES = {
  I: [[C(1), C(0)], [C(0), C(1)]],
  X: [[C(0), C(1)], [C(1), C(0)]],
  Y: [[C(0), C(0, -1)], [C(0, 1), C(0)]],
  Z: [[C(1), C(0)], [C(0), C(-1)]],
  H: [[C(s2), C(s2)], [C(s2), C(-s2)]],
  S: [[C(1), C(0)], [C(0), C(0, 1)]],
  Sdg: [[C(1), C(0)], [C(0), C(0, -1)]],
  T: [[C(1), C(0)], [C(0), expi(Math.PI / 4)]],
  Tdg: [[C(1), C(0)], [C(0), expi(-Math.PI / 4)]],
};
export const Rx = (t) => [[C(Math.cos(t / 2)), C(0, -Math.sin(t / 2))], [C(0, -Math.sin(t / 2)), C(Math.cos(t / 2))]];
export const Ry = (t) => [[C(Math.cos(t / 2)), C(-Math.sin(t / 2))], [C(Math.sin(t / 2)), C(Math.cos(t / 2))]];
export const Rz = (t) => [[expi(-t / 2), C(0)], [C(0), expi(t / 2)]];
export const Phase = (t) => [[C(1), C(0)], [C(0), expi(t)]];

export class State {
  constructor(n) {
    this.n = n;
    this.dim = 1 << n;
    this.re = new Float64Array(this.dim);
    this.im = new Float64Array(this.dim);
    this.re[0] = 1;
  }
  clone() {
    const s = new State(this.n);
    s.re.set(this.re);
    s.im.set(this.im);
    return s;
  }
  bit(k) {
    return 1 << (this.n - 1 - k);
  }
  /** Áp cổng 2×2 U lên qubit t, có thể kèm danh sách qubit điều khiển. */
  apply(U, t, controls = []) {
    const tb = this.bit(t);
    let cm = 0;
    for (const c of controls) cm |= this.bit(c);
    const { re, im } = this;
    for (let i = 0; i < this.dim; i++) {
      if (i & tb || (i & cm) !== cm) continue;
      const j = i | tb;
      const ar = re[i], ai = im[i], br = re[j], bi = im[j];
      const [[a, b], [c, d]] = U;
      re[i] = a.re * ar - a.im * ai + b.re * br - b.im * bi;
      im[i] = a.re * ai + a.im * ar + b.re * bi + b.im * br;
      re[j] = c.re * ar - c.im * ai + d.re * br - d.im * bi;
      im[j] = c.re * ai + c.im * ar + d.re * bi + d.im * br;
    }
    return this;
  }
  swap(a, b) {
    const ba = this.bit(a), bb = this.bit(b);
    for (let i = 0; i < this.dim; i++) {
      if (i & ba && !(i & bb)) {
        const j = (i & ~ba) | bb;
        [this.re[i], this.re[j]] = [this.re[j], this.re[i]];
        [this.im[i], this.im[j]] = [this.im[j], this.im[i]];
      }
    }
    return this;
  }
  probs() {
    const p = new Float64Array(this.dim);
    for (let i = 0; i < this.dim; i++) p[i] = this.re[i] ** 2 + this.im[i] ** 2;
    return p;
  }
  /** Xác suất qubit k cho kết quả 1 */
  p1(k) {
    const b = this.bit(k);
    let s = 0;
    for (let i = 0; i < this.dim; i++) if (i & b) s += this.re[i] ** 2 + this.im[i] ** 2;
    return s;
  }
  /** Đo qubit k (sụp đổ trạng thái). rnd: số ngẫu nhiên trong [0,1). Trả 0 hoặc 1. */
  measure(k, rnd = Math.random()) {
    const p1 = this.p1(k);
    const out = rnd < p1 ? 1 : 0;
    const b = this.bit(k);
    const norm = Math.sqrt(out ? p1 : 1 - p1) || 1;
    for (let i = 0; i < this.dim; i++) {
      if (!!(i & b) !== !!out) this.re[i] = this.im[i] = 0;
      else (this.re[i] /= norm), (this.im[i] /= norm);
    }
    return out;
  }
  /** Vectơ Bloch của qubit k (từ ma trận mật độ rút gọn). Độ dài < 1 nghĩa là qubit rối với phần còn lại. */
  bloch(k) {
    const b = this.bit(k);
    let r00 = 0, r11 = 0, xr = 0, xi = 0;
    for (let i = 0; i < this.dim; i++) {
      if (i & b) continue;
      const j = i | b;
      r00 += this.re[i] ** 2 + this.im[i] ** 2;
      r11 += this.re[j] ** 2 + this.im[j] ** 2;
      // ρ01 = Σ a_i · conj(a_j)
      xr += this.re[i] * this.re[j] + this.im[i] * this.im[j];
      xi += this.im[i] * this.re[j] - this.re[i] * this.im[j];
    }
    return { x: 2 * xr, y: -2 * xi, z: r00 - r11 };
  }
  amp(i) {
    return C(this.re[i], this.im[i]);
  }
}

export const label = (i, n) => i.toString(2).padStart(n, '0');

export function fmtC(z, d = 3) {
  const r = Math.abs(z.re) < 5e-4 ? 0 : z.re;
  const i = Math.abs(z.im) < 5e-4 ? 0 : z.im;
  if (!i) return r.toFixed(d);
  if (!r) return `${i.toFixed(d)}i`;
  return `${r.toFixed(d)}${i < 0 ? '−' : '+'}${Math.abs(i).toFixed(d)}i`;
}

/** Entropy von Neumann (bit) của một qubit từ độ dài vectơ Bloch */
export function entropyFromBloch(v) {
  const r = Math.min(1, Math.hypot(v.x, v.y, v.z));
  const h = (p) => (p <= 1e-12 ? 0 : -p * Math.log2(p));
  return h((1 + r) / 2) + h((1 - r) / 2);
}

/** Lấy mẫu kết quả đo toàn bộ thanh ghi */
export function sample(probs, shots) {
  const cdf = [];
  let s = 0;
  for (const p of probs) cdf.push((s += p));
  const counts = new Array(probs.length).fill(0);
  for (let k = 0; k < shots; k++) {
    const r = Math.random() * s;
    let lo = 0, hi = cdf.length - 1;
    while (lo < hi) {
      const m = (lo + hi) >> 1;
      if (cdf[m] < r) lo = m + 1;
      else hi = m;
    }
    counts[lo]++;
  }
  return counts;
}
