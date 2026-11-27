// Khám phá quả cầu Bloch: chọn trạng thái bằng (θ, φ), áp cổng như các phép quay, đo theo các cơ sở,
// và quan sát mất kết hợp (T1, T2) kéo vectơ Bloch vào trong quả cầu.
import { BlochView, rotate } from './blochview.js';
import { h, slider, tex, piFmt } from './util.js';

const R2 = Math.SQRT1_2;
const GATE_ROT = {
  X: [{ x: 1, y: 0, z: 0 }, Math.PI],
  Y: [{ x: 0, y: 1, z: 0 }, Math.PI],
  Z: [{ x: 0, y: 0, z: 1 }, Math.PI],
  H: [{ x: R2, y: 0, z: R2 }, Math.PI],
  S: [{ x: 0, y: 0, z: 1 }, Math.PI / 2],
  'S†': [{ x: 0, y: 0, z: 1 }, -Math.PI / 2],
  T: [{ x: 0, y: 0, z: 1 }, Math.PI / 4],
};

export function mount(root, cfg = {}) {
  const mode = cfg.mode || 'all';
  const el = h(`<div class="sim-ui">
    <div class="sim-head"><span class="sim-title">Quả cầu Bloch</span><span class="hint">Kéo quả cầu để xoay góc nhìn</span></div>
    <div class="sim-grid">
      <div><canvas class="sim-canvas"></canvas><div class="readout ket" style="margin-top:10px"></div></div>
      <div class="side">
        <div class="tabs btns"></div>
        <div class="pane p-state"></div>
        <div class="pane p-deco" hidden></div>
      </div>
    </div></div>`);
  root.appendChild(el);
  const view = new BlochView(el.querySelector('canvas'), { aspect: 0.92 });
  let v = { x: 0, y: 0, z: 1 };
  if (cfg.theta !== undefined) v = fromAngles(cfg.theta, cfg.phi || 0);
  let anim = null;

  // ----- Tab trạng thái & cổng -----
  const pState = el.querySelector('.p-state');
  const sT = slider('θ (góc cực)', { min: 0, max: Math.PI, step: 0.01, value: 0, fmt: piFmt });
  const sP = slider('φ (pha tương đối)', { min: 0, max: 2 * Math.PI, step: 0.01, value: 0, fmt: piFmt });
  pState.append(sT.el, sP.el);
  const gates = h(`<div><div class="lbl hint">Áp cổng (mỗi cổng là một phép quay quả cầu):</div><div class="btns">${Object.keys(GATE_ROT).map((g) => `<button class="gate-btn" data-g="${g}">${g}</button>`).join('')}</div>
    <div class="ctrl"><label><span>Quay quanh trục với góc</span><output class="ang-o"></output></label><input type="range" class="ang" min="0" max="6.2832" step="0.01" value="1.5708"></div>
    <div class="btns"><button class="gate-btn" data-r="x">Rx</button><button class="gate-btn" data-r="y">Ry</button><button class="gate-btn" data-r="z">Rz</button><button class="btn small ghost" data-a="reset">Về |0⟩</button><button class="btn small ghost" data-a="trail">Xóa vết</button></div></div>`);
  pState.appendChild(gates);
  const meas = h(`<div><div class="lbl hint">Đo 200 lần trong cơ sở:</div><div class="btns"><button class="btn small" data-m="z">Z {|0⟩,|1⟩}</button><button class="btn small" data-m="x">X {|+⟩,|−⟩}</button><button class="btn small" data-m="y">Y {|+i⟩,|−i⟩}</button><button class="btn small ghost" data-m="once">Đo 1 lần (Z) — sụp đổ</button></div><div class="readout mres hint">Hãy đoán trước tỉ lệ kết quả, rồi nhấn đo.</div></div>`);
  pState.appendChild(meas);
  const angIn = gates.querySelector('.ang');
  const angOut = gates.querySelector('.ang-o');
  const showAng = () => (angOut.textContent = piFmt(+angIn.value));
  angIn.addEventListener('input', showAng);
  showAng();

  const syncSliders = () => {
    const r = Math.hypot(v.x, v.y, v.z) || 1;
    const th = Math.acos(Math.max(-1, Math.min(1, v.z / r)));
    let ph = Math.atan2(v.y, v.x);
    if (ph < 0) ph += 2 * Math.PI;
    sT.value = th;
    if (Math.sin(th) > 1e-3) sP.value = ph;
  };
  const update = (trail = false) => {
    view.set(v, { trail });
    renderKet();
  };
  const onAngles = () => {
    stopAnim();
    v = fromAngles(sT.value, sP.value);
    update();
  };
  sT.on(onAngles);
  sP.on(onAngles);

  function animateRotation(n, a) {
    stopAnim();
    const start = { ...v };
    const t0 = performance.now();
    const dur = 420 + 260 * Math.abs(a) / Math.PI;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      v = rotate(start, n, a * e);
      update(true);
      if (k < 1) anim = requestAnimationFrame(step);
      else (anim = null), syncSliders();
    };
    anim = requestAnimationFrame(step);
  }
  const stopAnim = () => anim && (cancelAnimationFrame(anim), (anim = null));

  gates.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.g) animateRotation(...GATE_ROT[b.dataset.g]);
    if (b.dataset.r) animateRotation({ x: +(b.dataset.r === 'x'), y: +(b.dataset.r === 'y'), z: +(b.dataset.r === 'z') }, +angIn.value);
    if (b.dataset.a === 'reset') (v = { x: 0, y: 0, z: 1 }), view.clearTrail(), syncSliders(), update();
    if (b.dataset.a === 'trail') view.clearTrail();
  });
  const mres = meas.querySelector('.mres');
  meas.addEventListener('click', (e) => {
    const m = e.target.closest('button')?.dataset.m;
    if (!m) return;
    if (m === 'once') {
      const p0 = (1 + v.z) / 2;
      const out = Math.random() < p0 ? 0 : 1;
      v = { x: 0, y: 0, z: out ? -1 : 1 };
      syncSliders();
      update();
      mres.innerHTML = `Kết quả: <b>${out}</b> (xác suất trước khi đo là ${(out ? 1 - p0 : p0).toFixed(3)}). Trạng thái đã sụp đổ về ${tex(out ? '|1\\rangle' : '|0\\rangle')} — thông tin về pha φ đã mất.`;
      return;
    }
    const comp = v[m];
    const p = (1 + comp) / 2;
    let k = 0;
    for (let i = 0; i < 200; i++) if (Math.random() < p) k++;
    const names = { z: ['0', '1'], x: ['+', '−'], y: ['+i', '−i'] }[m];
    mres.innerHTML = `<div>${names[0]}: <b>${k}</b> &nbsp; ${names[1]}: <b>${200 - k}</b></div><div class="hint">Lý thuyết: P(${names[0]}) = (1 + r<sub>${m}</sub>)/2 = ${p.toFixed(3)}. Trạng thái không bị thay đổi trong minh họa này (mỗi lần đo dùng một bản sao mới được chuẩn bị giống hệt).</div>`;
  });

  // ----- Tab mất kết hợp -----
  const pDeco = el.querySelector('.p-deco');
  const sT1 = slider('T₁ (hồi phục năng lượng)', { min: 0.5, max: 20, step: 0.1, value: 8, fmt: (x) => x.toFixed(1) });
  const sT2 = slider('T₂ (mất pha)', { min: 0.2, max: 20, step: 0.1, value: 3, fmt: (x) => x.toFixed(1) });
  const sW = slider('ω (tần số tuế sai quanh trục z)', { min: 0, max: 4, step: 0.05, value: 1.5, fmt: (x) => x.toFixed(2) });
  pDeco.append(sT1.el, sT2.el, sW.el);
  const decoBtns = h(`<div class="btns"><button class="btn small primary" data-d="play">▶ Chạy</button><button class="btn small" data-d="plus">Bắt đầu từ |+⟩</button><button class="btn small ghost" data-d="stop">Dừng</button></div>`);
  const decoOut = h(`<div class="readout"></div>`);
  pDeco.append(decoBtns, decoOut, h(`<p class="hint">Phương trình Bloch: ${tex('\\dot r_x = -\\omega r_y - r_x/T_2')}, ${tex('\\dot r_y = \\omega r_x - r_y/T_2')}, ${tex('\\dot r_z = -(r_z-1)/T_1')}. Vật lý đòi hỏi ${tex('T_2 \\le 2T_1')}.</p>`));
  let simT = 0;
  let loop = null;
  const runDeco = () => {
    stopAnim();
    cancelAnimationFrame(loop);
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000) * 2;
      last = now;
      const T1 = sT1.value, T2 = Math.min(sT2.value, 2 * T1), w = sW.value;
      const sub = 10;
      for (let i = 0; i < sub; i++) {
        const d = dt / sub;
        const nx = v.x + (-w * v.y - v.x / T2) * d;
        const ny = v.y + (w * v.x - v.y / T2) * d;
        const nz = v.z + (-(v.z - 1) / T1) * d;
        v = { x: nx, y: ny, z: nz };
      }
      simT += dt;
      update(true);
      showDeco();
      if (simT < 60) loop = requestAnimationFrame(tick);
    };
    loop = requestAnimationFrame(tick);
  };
  const showDeco = () => {
    const r = Math.hypot(v.x, v.y, v.z);
    const purity = (1 + r * r) / 2;
    decoOut.innerHTML = `<dl class="kv"><dt>Thời gian</dt><dd>${simT.toFixed(2)}</dd><dt>Độ dài |r|</dt><dd>${r.toFixed(3)}</dd><dt>Độ thuần khiết Tr(ρ²)</dt><dd>${purity.toFixed(3)}</dd><dt>Độ kết hợp |ρ₀₁| = r⊥/2</dt><dd>${(Math.hypot(v.x, v.y) / 2).toFixed(3)}</dd></dl>${sT2.value > 2 * sT1.value ? '<div class="bad">T₂ > 2T₁ không vật lý — mô phỏng dùng T₂ = 2T₁.</div>' : ''}`;
  };
  decoBtns.addEventListener('click', (e) => {
    const d = e.target.closest('button')?.dataset.d;
    if (d === 'play') (simT = 0), runDeco();
    if (d === 'plus') (v = { x: 1, y: 0, z: 0 }), (simT = 0), view.clearTrail(), runDeco();
    if (d === 'stop') cancelAnimationFrame(loop);
  });

  // ----- Tabs -----
  const tabs = el.querySelector('.tabs');
  const tabDefs = mode === 'deco' ? [['deco', 'Mất kết hợp']] : mode === 'state' ? [['state', 'Trạng thái & cổng']] : [['state', 'Trạng thái & cổng'], ['deco', 'Mất kết hợp']];
  tabs.innerHTML = tabDefs.map(([k, l], i) => `<button class="btn small ${i ? '' : 'on'}" data-t="${k}">${l}</button>`).join('');
  const show = (k) => {
    el.querySelector('.p-state').hidden = k !== 'state';
    el.querySelector('.p-deco').hidden = k !== 'deco';
    tabs.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.t === k));
    if (k !== 'deco') cancelAnimationFrame(loop);
    else showDeco();
  };
  tabs.addEventListener('click', (e) => e.target.dataset.t && show(e.target.dataset.t));
  show(tabDefs[0][0]);
  if (tabDefs.length === 1) tabs.hidden = true;

  function renderKet() {
    const r = Math.hypot(v.x, v.y, v.z);
    const ket = el.querySelector('.ket');
    if (r > 0.999) {
      const th = Math.acos(Math.max(-1, Math.min(1, v.z)));
      let ph = Math.atan2(v.y, v.x);
      if (ph < 0) ph += 2 * Math.PI;
      const a = Math.cos(th / 2), b = Math.sin(th / 2);
      ket.innerHTML = `${tex(`|\\psi\\rangle = ${a.toFixed(3)}\\,|0\\rangle + ${b < 1e-3 ? '0' : `e^{i\\,${(ph / Math.PI).toFixed(2)}\\pi}\\,${b.toFixed(3)}`}\\,|1\\rangle`)}<div class="hint" style="margin-top:6px">P(0) = cos²(θ/2) = ${(a * a).toFixed(3)} · P(1) = ${(b * b).toFixed(3)} · vectơ Bloch (${v.x.toFixed(2)}, ${v.y.toFixed(2)}, ${v.z.toFixed(2)})</div>`;
    } else {
      ket.innerHTML = `${tex(`\\rho = \\tfrac12\\begin{pmatrix} 1+r_z & r_x - i r_y \\\\ r_x + i r_y & 1-r_z\\end{pmatrix},\\quad \\vec r = (${v.x.toFixed(2)},\\ ${v.y.toFixed(2)},\\ ${v.z.toFixed(2)})`)}<div class="hint" style="margin-top:6px">Trạng thái hỗn hợp: |r| = ${r.toFixed(3)} &lt; 1. Không còn viết được dưới dạng một ket duy nhất.</div>`;
    }
  }
  syncSliders();
  update();
}

function fromAngles(th, ph) {
  return { x: Math.sin(th) * Math.cos(ph), y: Math.sin(th) * Math.sin(ph), z: Math.cos(th) };
}
