// Trò chơi CHSH: Alice và Bob đo trên cặp rối với các góc tự chọn. So sánh với mô hình biến ẩn địa phương.
import { h, palette, hiCanvas, slider, tex } from './util.js';

const D = Math.PI / 180;
export function mount(root) {
  const el = h(`<div class="sim-ui"><div class="sim-head"><span class="sim-title">Bất đẳng thức Bell — CHSH</span><span class="hint">Góc là góc của bộ lọc phân cực (trên quả cầu Bloch: gấp đôi)</span></div>
  <div class="sim-grid"><canvas class="sim-canvas"></canvas><div>
    <div class="ang" style="display:grid;grid-template-columns:1fr 1fr;gap:0 12px"></div><div class="noise"></div>
    <div class="btns"><button class="btn small" data-p="opt">Góc tối ưu Tsirelson</button><button class="btn small" data-p="same">Cùng một góc</button><button class="btn small primary" data-r="2000">Chơi 2000 vòng</button><button class="btn small ghost" data-r="0">Xóa</button></div>
    <div class="readout out"></div></div></div></div>`);
  root.appendChild(el);
  const mk = (l, v) => slider(l, { min: 0, max: 180, step: 0.5, value: v, fmt: (x) => `${x.toFixed(1)}°` });
  const a0 = mk('Alice a', 0), a1 = mk("Alice a′", 45), b0 = mk('Bob b', 10), b1 = mk("Bob b′", 60);
  el.querySelector('.ang').append(a0.el, b0.el, a1.el, b1.el);
  const pS = slider('Độ rối p (trạng thái Werner: p|Φ⁺⟩⟨Φ⁺| + (1−p)I/4)', { min: 0, max: 1, step: 0.01, value: 1 });
  el.querySelector('.noise').appendChild(pS.el);
  // Với |Φ⁺⟩ và phép đo cos θ Z + sin θ X: E(α, β) = cos(α − β) (góc trên quả cầu Bloch = 2 × góc phân cực)
  const Eq = (a, b) => pS.value * Math.cos(2 * (a - b) * D);
  // Mô hình biến ẩn địa phương đơn giản: λ ngẫu nhiên, kết quả = sign(cos(2(θ−λ)))
  const lhv = (a, b, lam) => Math.sign(Math.cos(2 * (a * D - lam))) * Math.sign(Math.cos(2 * (b * D - lam)));
  const Elhv = (a, b) => 1 - (4 * Math.abs(((((a - b) % 180) + 180) % 180 > 90 ? 180 - ((((a - b) % 180) + 180) % 180) : ((((a - b) % 180) + 180) % 180))) / 180);
  let game = null;
  const play = (N) => {
    game ||= { q: [[0, 0], [0, 0], [0, 0], [0, 0]], c: [[0, 0], [0, 0], [0, 0], [0, 0]], winQ: 0, winC: 0, n: 0 };
    const A = [a0.value, a1.value], B = [b0.value, b1.value];
    for (let k = 0; k < N; k++) {
      const x = Math.random() < 0.5 ? 0 : 1, y = Math.random() < 0.5 ? 0 : 1;
      const idx = 2 * x + y;
      // lượng tử: P(kết quả giống nhau) = (1 + E)/2
      const same = Math.random() < (1 + Eq(A[x], B[y])) / 2;
      const prodQ = same ? 1 : -1;
      const lam = Math.random() * Math.PI;
      const prodC = lhv(A[x], B[y], lam);
      game.q[idx][0] += prodQ; game.q[idx][1]++;
      game.c[idx][0] += prodC; game.c[idx][1]++;
      // luật thắng: tỉ lệ thắng = 1/2 + S/8
      const want = x === 0 && y === 1 ? -1 : 1; // khớp dấu trừ của số hạng E(a,b′) trong S
      if (prodQ === want) game.winQ++;
      if (prodC === want) game.winC++;
      game.n++;
    }
  };
  const S = () => Eq(a0.value, b0.value) - Eq(a0.value, b1.value) + Eq(a1.value, b0.value) + Eq(a1.value, b1.value);
  const cv = hiCanvas(el.querySelector('canvas'), 0.7, (ctx, w, hh) => {
    const pal = palette();
    ctx.clearRect(0, 0, w, hh);
    const L = 36, Rr = w - 12, T = 16, B = hh - 30;
    const X = (d) => L + (d / 180) * (Rr - L), Y = (e) => (T + B) / 2 - e * ((B - T) / 2);
    ctx.strokeStyle = pal.line2; ctx.beginPath(); ctx.moveTo(L, Y(0)); ctx.lineTo(Rr, Y(0)); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.stroke();
    ctx.fillStyle = pal.muted; ctx.font = '11px ui-monospace, monospace';
    ctx.fillText('+1', 6, Y(1) + 4); ctx.fillText('−1', 6, Y(-1) + 4); ctx.fillText('0°', L - 4, B + 16); ctx.fillText('90°', X(90) - 10, B + 16); ctx.fillText('180°', X(180) - 26, B + 16);
    ctx.fillText('Tương quan E theo độ lệch góc |a − b|', L + 6, T + 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = pal.red; ctx.beginPath(); for (let d = 0; d <= 180; d++) ctx.lineTo(X(d), Y(pS.value * Math.cos(2 * d * D))); ctx.stroke();
    ctx.strokeStyle = pal.amber; ctx.setLineDash([5, 4]); ctx.beginPath(); for (let d = 0; d <= 180; d++) ctx.lineTo(X(d), Y(Elhv(d, 0))); ctx.stroke(); ctx.setLineDash([]);
    ctx.lineWidth = 1;
    const pairs = [[a0.value, b0.value, 'ab'], [a0.value, b1.value, "ab′"], [a1.value, b0.value, "a′b"], [a1.value, b1.value, "a′b′"]];
    for (const [a, b, l] of pairs) {
      const d = Math.abs(a - b) % 180;
      ctx.fillStyle = pal.accent; ctx.beginPath(); ctx.arc(X(d), Y(Eq(a, b)), 4.5, 0, 7); ctx.fill();
      ctx.fillStyle = pal.ink; ctx.fillText(l, X(d) + 6, Y(Eq(a, b)) - 6);
    }
    ctx.fillStyle = pal.red; ctx.fillText('lượng tử: cos 2Δ', Rr - 130, B - 22);
    ctx.fillStyle = pal.amber; ctx.fillText('biến ẩn địa phương', Rr - 130, B - 8);
    const s = S();
    let emp = '';
    if (game?.n) {
      const e = game.q.map(([s1, n]) => (n ? s1 / n : 0)), ec = game.c.map(([s1, n]) => (n ? s1 / n : 0));
      const Sq = e[0] - e[1] + e[2] + e[3], Sc = ec[0] - ec[1] + ec[2] + ec[3];
      emp = `<div style="margin-top:8px"><b>Sau ${game.n} vòng chơi ngẫu nhiên:</b></div><dl class="kv"><dt>S đo được — lượng tử</dt><dd class="${Math.abs(Sq) > 2 ? 'good' : ''}">${Sq.toFixed(3)}</dd><dt>S đo được — biến ẩn</dt><dd>${Sc.toFixed(3)}</dd><dt>Tỉ lệ thắng — lượng tử</dt><dd>${((100 * game.winQ) / game.n).toFixed(1)}%</dd><dt>Tỉ lệ thắng — biến ẩn</dt><dd>${((100 * game.winC) / game.n).toFixed(1)}%</dd></dl><div class="hint">Giới hạn cổ điển: thắng tối đa 75%. Lượng tử: tối đa cos²(π/8) ≈ 85,4%.</div>`;
    }
    el.querySelector('.out').innerHTML = `${tex('S = E(a,b) - E(a,b\') + E(a\',b) + E(a\',b\')')}<dl class="kv" style="margin-top:6px"><dt>S lượng tử (lý thuyết)</dt><dd class="${Math.abs(s) > 2 ? 'good' : ''}">${s.toFixed(3)}</dd><dt>Giới hạn cổ điển</dt><dd>|S| ≤ 2</dd><dt>Giới hạn Tsirelson</dt><dd>2√2 ≈ 2.828</dd></dl><div class="${Math.abs(s) > 2 ? 'good' : 'hint'}">${Math.abs(s) > 2 ? '✓ Vi phạm bất đẳng thức Bell: không lý thuyết biến ẩn địa phương nào tái tạo được các tương quan này.' : 'Chưa vi phạm. Thử nút “Góc tối ưu”, hoặc tăng độ rối p (cần p > 1/√2 ≈ 0.707).'}</div>${emp}`;
  });
  [a0, a1, b0, b1, pS].forEach((s) => s.on(() => { game = null; cv.redraw(); }));
  el.querySelector('.btns').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.p === 'opt') { a0.value = 0; a1.value = 45; b0.value = 22.5; b1.value = 67.5; game = null; }
    if (b.dataset.p === 'same') { a0.value = 0; a1.value = 0; b0.value = 0; b1.value = 0; game = null; }
    if (b.dataset.r !== undefined) +b.dataset.r ? play(+b.dataset.r) : (game = null);
    cv.redraw();
  });
}
