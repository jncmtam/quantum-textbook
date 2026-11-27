// BB84: Alice gửi qubit trong cơ sở ngẫu nhiên, Bob đo trong cơ sở ngẫu nhiên, Eve chặn–gửi lại một phần photon.
import { h, slider } from './util.js';

export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">BB84 và kẻ nghe lén</span></div>
  <div class="sim-grid"><div><div class="readout tbl" style="max-height:360px;overflow:auto"></div></div><div>
    <div class="sl"></div>
    <div class="btns"><button class="btn small primary" data-a="run">Gửi photon</button></div>
    <div class="readout out"></div>
    <p class="hint">“+” là cơ sở Z (|0⟩, |1⟩), “×” là cơ sở X (|+⟩, |−⟩). Hàng được tô xanh là những lần Alice và Bob tình cờ chọn cùng cơ sở — chỉ những bit đó được giữ lại (sifting). Ô đỏ: bit của Bob khác bit của Alice.</p></div></div></div>`);
  root.appendChild(el);
  const nS = slider('Số photon', { min: 16, max: 4000, step: 8, value: 400, fmt: (x) => x.toFixed(0) });
  const eS = slider('Tỉ lệ photon bị Eve chặn và đo', { min: 0, max: 1, step: 0.01, value: 0 });
  const qS = slider('Nhiễu kênh truyền (xác suất lật bit)', { min: 0, max: 0.15, step: 0.005, value: 0.01, fmt: (x) => `${(x * 100).toFixed(1)}%` });
  el.querySelector('.sl').append(nS.el, eS.el, qS.el);
  const bit = () => (Math.random() < 0.5 ? 0 : 1);
  const run = () => {
    const rows = [];
    let sifted = 0, errors = 0;
    for (let i = 0; i < nS.value; i++) {
      const ab = bit(), aB = bit();
      let state = { b: ab, B: aB };
      let eve = null;
      if (Math.random() < eS.value) {
        const eB = bit();
        const eb = eB === state.B ? state.b : bit(); // đo sai cơ sở → kết quả ngẫu nhiên
        state = { b: eb, B: eB };
        eve = eB;
      }
      if (Math.random() < qS.value) state.b ^= 1;
      const bB = bit();
      const bb = bB === state.B ? state.b : bit();
      const keep = aB === bB;
      if (keep) { sifted++; if (bb !== ab) errors++; }
      rows.push({ ab, aB, eve, bB, bb, keep });
    }
    const q = sifted ? errors / sifted : 0;
    const H = (p) => (p <= 0 || p >= 1 ? 0 : -p * Math.log2(p) - (1 - p) * Math.log2(1 - p));
    const rate = Math.max(0, 1 - 2 * H(q));
    const B = (x) => (x ? '×' : '+');
    el.querySelector('.tbl').innerHTML = `<table><tr><th>#</th><th>Alice bit</th><th>Alice cơ sở</th><th>Eve</th><th>Bob cơ sở</th><th>Bob bit</th></tr>${rows.slice(0, 60).map((r, i) => `<tr style="${r.keep ? 'background:color-mix(in srgb,var(--green) 10%,transparent)' : 'opacity:.55'}"><td>${i + 1}</td><td>${r.ab}</td><td>${B(r.aB)}</td><td>${r.eve === null ? '' : B(r.eve)}</td><td>${B(r.bB)}</td><td style="${r.keep && r.bb !== r.ab ? 'color:var(--red);font-weight:700' : ''}">${r.bb}</td></tr>`).join('')}</table>${rows.length > 60 ? `<div class="hint">… và ${rows.length - 60} photon nữa</div>` : ''}`;
    el.querySelector('.out').innerHTML = `<dl class="kv"><dt>Bit sau khi đối chiếu cơ sở</dt><dd>${sifted} (≈ ${((100 * sifted) / nS.value).toFixed(0)}%)</dd><dt>Tỉ lệ lỗi QBER</dt><dd class="${q > 0.11 ? 'bad' : 'good'}">${(100 * q).toFixed(2)}%</dd><dt>QBER dự đoán do Eve</dt><dd>${(25 * eS.value).toFixed(1)}% (+ nhiễu)</dd><dt>Tỉ lệ khóa an toàn 1 − 2h(Q)</dt><dd>${rate.toFixed(3)}</dd></dl><div class="${q > 0.11 ? 'bad' : 'good'}" style="margin-top:6px">${q > 0.11 ? 'QBER vượt ngưỡng ~11%: hủy phiên — không thể trích ra khóa an toàn (với phân tích Shor–Preskill).' : 'QBER dưới ngưỡng: có thể sửa lỗi và khuếch đại bảo mật để thu được khóa bí mật.'}</div>`;
  };
  el.querySelector('[data-a="run"]').addEventListener('click', run);
  [nS, eS, qS].forEach((s) => s.on(run));
  run();
}
