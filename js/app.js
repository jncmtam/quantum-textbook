import { BOOK, CHAPTERS, byId } from './book.js';
import { createRenderer, plainText, slugify } from './markdown.js';
import { mountSim } from './sims/index.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const md = createRenderer({ chapterTitle: (id) => byId.get(id)?.title });
const main = $('#main');

// ---------------- Lưu trữ cục bộ ----------------
const KEY = 'qtb:v1';
const state = (() => {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { s = {}; }
  return { chapters: {}, quiz: {}, notes: {}, last: null, ...s };
})();
let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* chế độ riêng tư */ }
  }, 150);
}
const statusOf = (id) => state.chapters[id]?.status || 'none';
const isDone = (id) => statusOf(id) === 'understood';

// ---------------- Giao diện sáng/tối ----------------
function applyTheme(t) {
  if (t === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem('qtb:theme', t); } catch {}
  document.dispatchEvent(new CustomEvent('themechange'));
}
$('#theme-btn').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(dark ? 'light' : 'dark');
});

// ---------------- Mục lục bên trái ----------------
const STATUS_ICON = { none: '', read: '◐', understood: '●' };
function renderToc(activeId) {
  const toc = $('#toc');
  toc.innerHTML = `
    <div class="toc-links">
      <a href="#/" class="${!activeId && location.hash.length < 3 ? 'active' : ''}">Trang bìa</a>
      <a href="#/ban-do">Bản đồ kiến thức</a>
      <a href="#/phong-thi-nghiem">Phòng thí nghiệm</a>
      <a href="#/so-tay">Sổ tay & tiến độ</a>
    </div>
    ${BOOK.parts
      .map(
        (p) => `<div class="toc-part"><div class="toc-part-title">${esc(p.title)}</div><ol>${p.chapters
          .map((c) => {
            const ch = byId.get(c.id);
            return `<li><a href="#/c/${c.id}" class="${c.id === activeId ? 'active' : ''}" data-st="${statusOf(c.id)}"><span class="toc-num">${ch.index}</span><span class="toc-title">${esc(c.title)}</span><span class="toc-st" aria-hidden="true">${STATUS_ICON[statusOf(c.id)]}</span></a></li>`;
          })
          .join('')}</ol></div>`,
      )
      .join('')}`;
  const a = $('a.active', toc);
  if (a) a.scrollIntoView({ block: 'nearest' });
}
$('#menu-btn').addEventListener('click', () => document.body.classList.toggle('toc-open'));
$('#scrim').addEventListener('click', () => document.body.classList.remove('toc-open'));

// ---------------- Nạp chương ----------------
const cache = new Map();
async function loadChapter(id) {
  if (!cache.has(id)) {
    const p = fetch(`chapters/${id}.md`).then((r) => {
      if (!r.ok) throw new Error(`Không tải được chương "${id}" (${r.status})`);
      return r.text();
    });
    cache.set(id, p);
    p.catch(() => cache.delete(id));
  }
  return cache.get(id);
}

// ---------------- Các trang ----------------
function chapterCard(c) {
  const st = statusOf(c.id);
  return `<a class="ch-card" href="#/c/${c.id}" data-st="${st}"><span class="ch-num">Chương ${c.index}</span><span class="ch-title">${esc(c.title)}</span><span class="ch-meta">${c.minutes} phút${st === 'understood' ? ' · đã hiểu' : st === 'read' ? ' · đã đọc' : ''}</span></a>`;
}

function pageCover() {
  const done = CHAPTERS.filter((c) => isDone(c.id)).length;
  const next = CHAPTERS.find((c) => !isDone(c.id) && c.prereqs.every(isDone));
  const last = state.last && byId.get(state.last);
  main.innerHTML = `
  <article class="cover">
    <div class="cover-hero">
      <p class="eyebrow">Giáo trình tương tác</p>
      <h1>${esc(BOOK.title)}</h1>
      <p class="lede">${esc(BOOK.subtitle)}</p>
      <blockquote class="motto">Đừng chỉ học tính toán lượng tử <em>là gì</em>. Hãy học vì sao từng ý tưởng ra đời, vì sao nó đúng, nó nối với điều gì — và làm sao xây ý tưởng mới trên nó.</blockquote>
      <div class="cover-actions">
        ${last ? `<a class="btn primary" href="#/c/${last.id}">Đọc tiếp: Chương ${last.index}</a>` : `<a class="btn primary" href="#/c/loi-mo-dau">Bắt đầu đọc</a>`}
        ${next && next.id !== (last ? last.id : 'loi-mo-dau') ? `<a class="btn" href="#/c/${next.id}">Gợi ý tiếp theo: ${esc(next.title)}</a>` : ''}
        <a class="btn ghost" href="#/ban-do">Xem bản đồ kiến thức</a>
      </div>
      <div class="cover-progress"><div class="bar"><span style="width:${(100 * done) / CHAPTERS.length}%"></span></div><span>${done}/${CHAPTERS.length} chương đã hiểu</span></div>
    </div>
    <section class="cover-chains">
      <h2>Hai sợi chỉ đỏ xuyên suốt cuốn sách</h2>
      <div class="chain">${chain(['vecto', 'ma-tran', 'trang-thai', 'qubit-bloch', 'cong-mach', 'grover'], ['Đại số tuyến tính', 'Ma trận & trị riêng', 'Không gian Hilbert', 'Qubit', 'Cổng & mạch', 'Thuật toán'])}</div>
      <div class="chain">${chain(['xac-suat', 'ma-tran-mat-do', 'roi-luong-tu', 'bb84', 'sua-loi'], ['Xác suất', 'Trạng thái hỗn hợp & entropy', 'Rối & tương quan', 'Mật mã', 'Sửa lỗi lượng tử'])}</div>
    </section>
    ${BOOK.parts.map((p) => `<section class="cover-part"><h2>${esc(p.title)}</h2><div class="ch-grid">${p.chapters.map((c) => chapterCard(byId.get(c.id))).join('')}</div></section>`).join('')}
  </article>`;
}
const chain = (ids, labels) => ids.map((id, i) => `<a href="#/c/${id}" class="chain-step">${esc(labels[i])}</a>`).join('<span class="chain-arrow">→</span>');

async function pageChapter(id, anchor) {
  const ch = byId.get(id);
  if (!ch) return pageNotFound();
  state.last = id;
  save();
  main.innerHTML = `<div class="reader"><article class="chapter"><div class="loading">Đang mở chương…</div></article></div>`;
  let src;
  try {
    src = await loadChapter(id);
  } catch (e) {
    main.innerHTML = `<div class="reader"><article class="chapter"><h1>Không mở được chương</h1><p>${esc(e.message)}</p><p>Hãy chắc rằng bạn đang chạy giáo trình qua một máy chủ tĩnh (xem README), không mở trực tiếp tệp <code>index.html</code>.</p></article></div>`;
    return;
  }
  const { html, toc } = md.render(src);
  const prev = CHAPTERS[ch.index - 1];
  const next = CHAPTERS[ch.index + 1];
  const missing = ch.prereqs.filter((p) => !isDone(p)).map((p) => byId.get(p));
  const dependents = CHAPTERS.filter((c) => c.prereqs.includes(id));
  const st = statusOf(id);
  main.innerHTML = `
  <div class="reader">
    <article class="chapter" data-id="${id}">
      <header class="ch-head">
        <p class="eyebrow">${esc(ch.part.title)} · Chương ${ch.index}</p>
        <h1>${esc(ch.title)}</h1>
        <p class="ch-sub">Khoảng ${ch.minutes} phút đọc${ch.sims?.length ? ` · ${ch.sims.length} mô phỏng tương tác` : ''}</p>
        ${ch.prereqs.length ? `<div class="prereq ${missing.length ? 'warn' : 'ok'}"><span>${missing.length ? 'Bạn chưa đánh dấu hiểu các chương nền tảng:' : 'Nền tảng cần có:'}</span> ${ch.prereqs.map((p) => `<a href="#/c/${p}" data-st="${statusOf(p)}">${esc(byId.get(p).title)}</a>`).join('')}${missing.length ? `<small>Bạn vẫn có thể đọc tiếp — chương này sẽ dẫn lại các ý cần thiết, nhưng sẽ dễ hơn nếu nắm chắc phần nền trước.</small>` : ''}</div>` : ''}
      </header>
      <div class="ch-body">${html}</div>
      <footer class="ch-foot">
        <section class="ch-check">
          <h2>Bạn đã nắm chương này chưa?</h2>
          <p>Hãy thử tự giải thích lại ý chính của chương cho một người bạn mà không nhìn sách. Nếu làm được, hãy đánh dấu “đã hiểu”.</p>
          <div class="seg" role="group">
            <button data-set="none" class="${st === 'none' ? 'on' : ''}">Chưa đọc</button>
            <button data-set="read" class="${st === 'read' ? 'on' : ''}">Đã đọc</button>
            <button data-set="understood" class="${st === 'understood' ? 'on' : ''}">Đã hiểu</button>
          </div>
        </section>
        <section class="ch-notes">
          <h2>Ghi chú của bạn</h2>
          <textarea id="note" rows="5" placeholder="Viết lại bằng lời của bạn, câu hỏi còn thắc mắc, ý tưởng nảy ra… (lưu tự động trong trình duyệt; hỗ trợ $công thức$)">${esc(state.notes[id] || '')}</textarea>
          <div class="note-preview" id="note-preview"></div>
        </section>
        ${dependents.length ? `<section class="ch-next"><h2>Chương này là nền tảng cho</h2><div class="ch-grid">${dependents.map(chapterCard).join('')}</div></section>` : ''}
        <nav class="pager">
          ${prev ? `<a href="#/c/${prev.id}" class="prev"><small>← Chương trước</small><span>${esc(prev.title)}</span></a>` : '<span></span>'}
          ${next ? `<a href="#/c/${next.id}" class="next"><small>Chương sau →</small><span>${esc(next.title)}</span></a>` : '<span></span>'}
        </nav>
      </footer>
    </article>
    <aside class="otp">${toc.length ? `<div class="otp-title">Trong chương này</div><ol>${toc.map((t) => `<li class="d${t.depth}"><a href="#/c/${id}/${t.id}" data-target="${t.id}">${t.html}</a></li>`).join('')}</ol>` : ''}</aside>
  </div>`;
  enhance($('.chapter'), id);
  $$('.seg button').forEach((b) =>
    b.addEventListener('click', () => {
      state.chapters[id] = { status: b.dataset.set, at: Date.now() };
      save();
      $$('.seg button').forEach((x) => x.classList.toggle('on', x === b));
      renderToc(id);
    }),
  );
  const note = $('#note');
  const prevEl = $('#note-preview');
  const showNote = () => (prevEl.innerHTML = note.value.trim() ? md.render(note.value).html : '');
  showNote();
  note.addEventListener('input', () => {
    state.notes[id] = note.value;
    save();
    clearTimeout(note._t);
    note._t = setTimeout(showNote, 400);
  });
  scrollSpy();
  if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView());
  else window.scrollTo(0, 0);
}

// Kích hoạt các thành phần tương tác bên trong nội dung
function enhance(root, chapterId) {
  // Dẫn xuất từng bước
  $$('.derivation', root).forEach((d) => {
    const steps = $$('.d-step', d);
    if (steps.length < 2) return;
    let shown = 1;
    const ctr = $('.d-controls', d);
    const update = () => {
      steps.forEach((s, k) => s.classList.toggle('hidden', k >= shown));
      ctr.innerHTML = shown < steps.length ? `<button class="btn small primary" data-a="next">Bước tiếp theo (${shown + 1}/${steps.length})</button><button class="btn small ghost" data-a="all">Hiện toàn bộ</button>` : `<button class="btn small ghost" data-a="reset">Thu gọn lại</button>`;
    };
    ctr.addEventListener('click', (e) => {
      const a = e.target.closest('button')?.dataset.a;
      if (a === 'next') shown++;
      if (a === 'all') shown = steps.length;
      if (a === 'reset') shown = 1;
      update();
    });
    update();
  });
  // Trắc nghiệm
  $$('.quiz', root).forEach((q, qi) => {
    const key = `${chapterId}:${qi}`;
    const items = $$('.quiz-opts li', q);
    const reveal = (li) => {
      li.classList.add(li.dataset.ok === '1' ? 'right' : 'wrong');
      $('.quiz-ex', li).hidden = false;
    };
    items.forEach((li, k) =>
      $('button', li).addEventListener('click', () => {
        reveal(li);
        if (li.dataset.ok === '1') items.forEach(reveal), q.classList.add('solved');
        if (state.quiz[key] === undefined) state.quiz[key] = li.dataset.ok === '1';
        save();
      }),
    );
  });
  // Mô phỏng: nạp khi cuộn tới
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        const cfg = JSON.parse(e.target.dataset.config || '{}');
        mountSim(e.target.dataset.sim, $('.sim-mount', e.target), cfg);
      }
    },
    { rootMargin: '300px' },
  );
  $$('figure.sim', root).forEach((f) => io.observe(f));
}

function scrollSpy() {
  const links = $$('.otp a');
  if (!links.length) return;
  const heads = links.map((a) => document.getElementById(a.dataset.target)).filter(Boolean);
  const onScroll = () => {
    let cur = heads[0];
    for (const h of heads) if (h.getBoundingClientRect().top < 120) cur = h;
    links.forEach((a) => a.classList.toggle('on', a.dataset.target === cur?.id));
  };
  window.removeEventListener('scroll', window._spy);
  window._spy = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------------- Bản đồ kiến thức ----------------
function pageMap() {
  // Độ sâu tiên quyết → cột
  const depth = new Map();
  const d = (id) => {
    if (depth.has(id)) return depth.get(id);
    const v = byId.get(id).prereqs.reduce((m, p) => Math.max(m, d(p) + 1), 0);
    depth.set(id, v);
    return v;
  };
  CHAPTERS.forEach((c) => d(c.id));
  const cols = [];
  for (const c of CHAPTERS) (cols[depth.get(c.id)] ||= []).push(c);
  const W = 238, H = 58, GX = 64, GY = 20, PAD = 30;
  const pos = new Map();
  const rows = Math.max(...cols.map((c) => c.length));
  cols.forEach((col, i) => {
    col.sort((a, b) => a.partIndex - b.partIndex || a.index - b.index);
    const off = ((rows - col.length) * (H + GY)) / 2;
    col.forEach((c, j) => pos.set(c.id, { x: PAD + i * (W + GX), y: PAD + off + j * (H + GY) }));
  });
  const width = PAD * 2 + cols.length * (W + GX) - GX;
  const height = PAD * 2 + rows * (H + GY) - GY;
  const edges = [
    ...CHAPTERS.flatMap((c) => c.prereqs.map((p) => ({ from: p, to: c.id, kind: 'prereq' }))),
    ...BOOK.links,
  ];
  const path = (e) => {
    const a = pos.get(e.from), b = pos.get(e.to);
    const x1 = a.x + W, y1 = a.y + H / 2, x2 = b.x, y2 = b.y + H / 2;
    if (x2 > x1) {
      const mx = (x1 + x2) / 2;
      return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2 - 6},${y2}`;
    }
    // cạnh ngược/cùng cột: vòng qua phía dưới
    const yy = Math.max(a.y, b.y) + H + GY / 2;
    return `M${a.x + W / 2},${a.y + H} C${a.x + W / 2},${yy + 20} ${b.x + W / 2},${yy + 20} ${b.x + W / 2},${b.y + H + 6}`;
  };
  const KIND = { prereq: 'Tiên quyết', foundation: 'Nền tảng toán học', interpretation: 'Diễn giải vật lý', application: 'Ứng dụng', extension: 'Mở rộng', research: 'Kết nối nghiên cứu' };
  main.innerHTML = `
  <article class="page wide">
    <header class="page-head"><p class="eyebrow">Bản đồ kiến thức</p><h1>Mọi chương nối với nhau thế nào</h1>
    <p class="lede">Đọc từ trái sang phải: mỗi cột chỉ cần các cột bên trái nó. Rê chuột (hoặc chạm) vào một chương để thấy toàn bộ chuỗi kiến thức nó phụ thuộc và những gì nó mở ra. Nhấn đúp để mở chương.</p>
    <div class="legend">${Object.entries(KIND).map(([k, v]) => `<span class="lg lg-${k}"><i></i>${v}</span>`).join('')}<span class="lg"><b class="dot understood"></b>Đã hiểu</span></div></header>
    <div class="map-scroll"><svg class="map" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
      <defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="context-stroke"/></marker></defs>
      <g class="edges">${edges.map((e) => `<path class="edge e-${e.kind}" data-from="${e.from}" data-to="${e.to}" d="${path(e)}" marker-end="url(#arr)"><title>${KIND[e.kind]}: ${esc(byId.get(e.from).title)} → ${esc(byId.get(e.to).title)}</title></path>`).join('')}</g>
      <g class="nodes">${CHAPTERS.map((c) => {
        const p = pos.get(c.id);
        return `<g class="mnode part-${c.partIndex}" data-id="${c.id}" data-st="${statusOf(c.id)}" transform="translate(${p.x},${p.y})" tabindex="0"><rect width="${W}" height="${H}" rx="10"/><text x="12" y="20" class="mn-num">Chương ${c.index}</text>${wrap(c.title, 32).map((l, i) => `<text x="12" y="${36 + i * 15}" class="mn-title">${esc(l)}</text>`).join('')}<circle cx="${W - 14}" cy="14" r="5" class="mn-st"/></g>`;
      }).join('')}</g>
    </svg></div>
  </article>`;
  const svg = $('.map');
  const anc = (id, s = new Set()) => (byId.get(id).prereqs.forEach((p) => { if (!s.has(p)) s.add(p), anc(p, s); }), s);
  const desc = (id, s = new Set()) => (CHAPTERS.filter((c) => c.prereqs.includes(id)).forEach((c) => { if (!s.has(c.id)) s.add(c.id), desc(c.id, s); }), s);
  const focus = (id) => {
    if (!id) return svg.classList.remove('focus');
    const A = anc(id), D = desc(id);
    svg.classList.add('focus');
    $$('.mnode', svg).forEach((g) => {
      const x = g.dataset.id;
      g.classList.toggle('hl-self', x === id);
      g.classList.toggle('hl-anc', A.has(x));
      g.classList.toggle('hl-desc', D.has(x));
    });
    $$('.edge', svg).forEach((e) => {
      const on = (e.dataset.to === id || A.has(e.dataset.to)) && (A.has(e.dataset.from) || e.dataset.from === id) && e.classList.contains('e-prereq');
      const on2 = (e.dataset.from === id || D.has(e.dataset.from)) && (D.has(e.dataset.to)) && e.classList.contains('e-prereq');
      const on3 = !e.classList.contains('e-prereq') && (e.dataset.from === id || e.dataset.to === id);
      e.classList.toggle('hl', on || on2 || on3);
    });
  };
  $$('.mnode', svg).forEach((g) => {
    g.addEventListener('mouseenter', () => focus(g.dataset.id));
    g.addEventListener('focus', () => focus(g.dataset.id));
    g.addEventListener('click', () => focus(g.dataset.id));
    g.addEventListener('dblclick', () => (location.hash = `#/c/${g.dataset.id}`));
    g.addEventListener('keydown', (e) => e.key === 'Enter' && (location.hash = `#/c/${g.dataset.id}`));
  });
  svg.addEventListener('mouseleave', () => focus(null));
}
function wrap(s, n) {
  const words = s.split(' ');
  const lines = [''];
  for (const w of words) {
    if ((lines[lines.length - 1] + ' ' + w).trim().length > n && lines[lines.length - 1]) lines.push(w);
    else lines[lines.length - 1] = (lines[lines.length - 1] + ' ' + w).trim();
  }
  return lines.slice(0, 2).map((l, i, a) => (i === 1 && words.join(' ').length > a.join(' ').length ? l.replace(/.{0,2}$/, '…') : l));
}

// ---------------- Phòng thí nghiệm ----------------
function pageLab(sim) {
  if (sim && BOOK.sims[sim]) {
    const info = BOOK.sims[sim];
    const ch = byId.get(info.chapter);
    main.innerHTML = `<article class="page wide"><header class="page-head"><p class="eyebrow"><a href="#/phong-thi-nghiem">Phòng thí nghiệm</a></p><h1>${esc(info.title)}</h1><p class="lede">Gắn với <a href="#/c/${ch.id}">Chương ${ch.index}: ${esc(ch.title)}</a>.</p></header><figure class="sim big"><div class="sim-mount"></div></figure></article>`;
    mountSim(sim, $('.sim-mount'), {});
    return;
  }
  main.innerHTML = `<article class="page"><header class="page-head"><p class="eyebrow">Phòng thí nghiệm</p><h1>Tự tay kiểm chứng các nguyên lý</h1><p class="lede">Mỗi mô phỏng được thiết kế để trả lời một câu hỏi cụ thể. Hãy đoán kết quả trước khi thay đổi tham số — rồi kiểm tra xem trực giác của bạn đúng hay sai.</p></header>
  <div class="lab-grid">${Object.entries(BOOK.sims).map(([k, v]) => {
    const ch = byId.get(v.chapter);
    return `<a class="lab-card" href="#/phong-thi-nghiem/${k}"><span class="ch-num">Chương ${ch.index}</span><span class="ch-title">${esc(v.title)}</span><span class="ch-meta">${esc(ch.title)}</span></a>`;
  }).join('')}</div></article>`;
}

// ---------------- Sổ tay & tiến độ ----------------
function pageNotebook() {
  const notes = CHAPTERS.filter((c) => (state.notes[c.id] || '').trim());
  const quizTotal = Object.keys(state.quiz).length;
  const quizRight = Object.values(state.quiz).filter(Boolean).length;
  main.innerHTML = `<article class="page"><header class="page-head"><p class="eyebrow">Sổ tay</p><h1>Tiến độ & ghi chú của bạn</h1><p class="lede">Mọi thứ được lưu ngay trong trình duyệt này. Hãy xuất bản sao lưu nếu bạn muốn chuyển sang máy khác.</p></header>
  <section class="stats">
    ${BOOK.parts.map((p) => {
      const n = p.chapters.length, u = p.chapters.filter((c) => isDone(c.id)).length, r = p.chapters.filter((c) => statusOf(c.id) === 'read').length;
      return `<div class="stat"><div class="stat-t">${esc(p.title)}</div><div class="bar two"><span style="width:${(100 * u) / n}%"></span><span class="r" style="width:${(100 * r) / n}%"></span></div><small>${u} đã hiểu · ${r} đã đọc · ${n} chương</small></div>`;
    }).join('')}
    <div class="stat"><div class="stat-t">Câu hỏi tự kiểm tra</div><div class="big-num">${quizRight}<small>/${quizTotal}</small></div><small>trả lời đúng ngay lần đầu</small></div>
  </section>
  <section><h2>Ghi chú</h2>${notes.length ? notes.map((c) => `<div class="note-card"><a href="#/c/${c.id}">Chương ${c.index}: ${esc(c.title)}</a><div>${md.render(state.notes[c.id]).html}</div></div>`).join('') : '<p class="muted">Chưa có ghi chú nào. Cuối mỗi chương có một ô ghi chú — hãy viết lại ý chính bằng lời của bạn.</p>'}</section>
  <section><h2>Sao lưu</h2><div class="row"><button class="btn" id="exp">Xuất tệp sao lưu (.json)</button><label class="btn ghost">Nhập từ tệp<input type="file" id="imp" accept="application/json" hidden></label></div></section>
  </article>`;
  $('#exp').onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `giao-trinh-luong-tu-${new Date().toISOString().slice(0, 10)}.json` });
    a.click();
    URL.revokeObjectURL(a.href);
  };
  $('#imp').onchange = async (e) => {
    try {
      const data = JSON.parse(await e.target.files[0].text());
      for (const k of ['chapters', 'quiz', 'notes']) Object.assign(state[k], data[k] || {});
      save();
      pageNotebook();
      renderToc();
    } catch {
      alert('Tệp không hợp lệ.');
    }
  };
}

function pageNotFound() {
  main.innerHTML = `<article class="page"><h1>Không tìm thấy trang</h1><p><a href="#/">Về trang bìa</a></p></article>`;
}

// ---------------- Tìm kiếm toàn sách ----------------
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase();
let index = null;
async function buildIndex() {
  if (index) return index;
  const docs = await Promise.all(
    CHAPTERS.map(async (c) => {
      const src = await loadChapter(c.id).catch(() => '');
      // chia theo tiêu đề để kết quả trỏ đúng mục
      const sections = [];
      let cur = { title: c.title, anchor: null, text: [] };
      const ids = new Map();
      for (const line of src.split('\n')) {
        const m = line.match(/^(#{2,3})\s+(.*)$/);
        if (m) {
          sections.push(cur);
          let a = slugify(m[2].replace(/\$[^$]*\$/g, (x) => x));
          const n = ids.get(a) || 0;
          ids.set(a, n + 1);
          cur = { title: m[2], anchor: n ? `${a}-${n}` : a, text: [] };
        } else cur.text.push(line);
      }
      sections.push(cur);
      return sections.map((s) => {
        const plain = plainText(s.text.join('\n'));
        return { ch: c, title: s.title, anchor: s.anchor, plain, n: norm(plain), nt: norm(s.title + ' ' + c.title) };
      });
    }),
  );
  return (index = docs.flat());
}
function openSearch() {
  const m = $('#search');
  m.hidden = false;
  const input = $('#search input');
  input.value = '';
  input.focus();
  $('#search-results').innerHTML = '<p class="muted">Gõ từ khóa — ví dụ: “trị riêng”, “Born”, “entanglement”, “Hadamard”.</p>';
  buildIndex();
}
function closeSearch() {
  $('#search').hidden = true;
}
async function doSearch(q) {
  const terms = norm(q).trim().split(/\s+/).filter((t) => t.length > 1);
  const box = $('#search-results');
  if (!terms.length) return;
  const idx = await buildIndex();
  const res = [];
  for (const d of idx) {
    let score = 0;
    let all = true;
    for (const t of terms) {
      const s = (d.nt.includes(t) ? 10 : 0) + Math.min(5, d.n.split(t).length - 1);
      if (!s) all = false;
      score += s;
    }
    if (all && score) res.push({ d, score });
  }
  res.sort((a, b) => b.score - a.score);
  box.innerHTML = res.length
    ? res.slice(0, 25).map(({ d }) => {
        const p = d.n.indexOf(terms[0]);
        const start = Math.max(0, p - 50);
        const snip = p >= 0 ? (start ? '…' : '') + d.plain.slice(start, p + 110) + '…' : d.plain.slice(0, 140);
        return `<a class="sr" href="#/c/${d.ch.id}${d.anchor ? '/' + d.anchor : ''}"><span class="sr-ch">Chương ${d.ch.index} · ${esc(d.ch.title)}</span><span class="sr-t">${md.inline(d.title)}</span><span class="sr-s">${esc(snip)}</span></a>`;
      }).join('')
    : '<p class="muted">Không tìm thấy kết quả.</p>';
}
$('#search-btn').addEventListener('click', openSearch);
$('#search').addEventListener('click', (e) => (e.target.id === 'search' || e.target.closest('.sr')) && closeSearch());
$('#search input').addEventListener('input', (e) => {
  clearTimeout(e.target._t);
  e.target._t = setTimeout(() => doSearch(e.target.value), 120);
});
document.addEventListener('keydown', (e) => {
  if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName))) {
    e.preventDefault();
    openSearch();
  }
  if (e.key === 'Escape') closeSearch(), document.body.classList.remove('toc-open');
});

// ---------------- Định tuyến ----------------
function routeTo() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  document.body.classList.remove('toc-open');
  window.removeEventListener('scroll', window._spy);
  const [a, b, c] = parts;
  if (a === 'c') {
    const same = $('.chapter')?.dataset.id === b;
    renderToc(b);
    if (same && c) return document.getElementById(c)?.scrollIntoView({ behavior: 'smooth' });
    return pageChapter(b, c);
  }
  renderToc(null);
  window.scrollTo(0, 0);
  if (!a) return pageCover();
  if (a === 'ban-do') return pageMap();
  if (a === 'phong-thi-nghiem') return pageLab(b);
  if (a === 'so-tay') return pageNotebook();
  pageNotFound();
}
window.addEventListener('hashchange', routeTo);
routeTo();
