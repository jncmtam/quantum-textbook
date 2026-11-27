// Đăng ký mô phỏng: tên dùng trong :::sim <tên> → mô-đun tương ứng (nạp lười).
const REGISTRY = {
  phasor: () => import('./phasor.js'),
  inner: () => import('./inner.js'),
  matrix: () => import('./matrix.js'),
  probability: () => import('./probability.js'),
  interference: () => import('./interference.js'),
  mzi: () => import('./mzi.js'),
  born: () => import('./born.js'),
  wellbox: () => import('./wellbox.js'),
  bloch: () => import('./bloch.js'),
  chsh: () => import('./chsh.js'),
  circuit: () => import('./circuit.js'),
  grover: () => import('./grover.js'),
  bb84: () => import('./bb84.js'),
  vqe: () => import('./vqe.js'),
};

export async function mountSim(name, el, cfg = {}) {
  const load = REGISTRY[name];
  if (!load) {
    el.innerHTML = `<div class="sim-loading">Không có mô phỏng “${name}”.</div>`;
    return;
  }
  try {
    const mod = await load();
    el.innerHTML = '';
    mod.mount(el, cfg);
  } catch (e) {
    console.error(e);
    el.innerHTML = `<div class="sim-loading">Lỗi khi nạp mô phỏng: ${e.message}</div>`;
  }
}
