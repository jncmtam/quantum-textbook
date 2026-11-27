// Bộ dựng Markdown cho giáo trình: Markdown chuẩn + công thức KaTeX + các khối sư phạm.
//
//   $...$, $$...$$            công thức
//   [[id-chuong]]             liên kết chéo tới chương khác ([[id|nhãn]])
//   :::intuition / :::why / :::definition / :::theorem / :::physics / :::example
//   :::misconception / :::research / :::note / :::warning / :::question / :::history
//   :::derivation Tiêu đề     các bước cách nhau bằng dòng ---
//   :::exercise Tiêu đề       ???hint  /  ???solution
//   :::quiz                   Q: ... ;  - [x] đáp án || giải thích
//   :::sim ten {"cấu hình"}   nhúng mô phỏng tương tác
//   :::status established | experimental | conjecture | debated
import { Marked } from '../vendor/marked.esm.js';
import katex from '../vendor/katex/katex.mjs';

const CALLOUTS = {
  intuition: 'Trực giác',
  why: 'Vì sao cần đến khái niệm này?',
  concept: 'Bản chất',
  definition: 'Định nghĩa',
  theorem: 'Định lý',
  proof: 'Chứng minh',
  physics: 'Ý nghĩa vật lý',
  example: 'Ví dụ',
  misconception: 'Hiểu lầm thường gặp',
  research: 'Góc nhìn nghiên cứu',
  note: 'Ghi chú',
  warning: 'Lưu ý',
  question: 'Câu hỏi gợi mở',
  history: 'Một chút lịch sử',
  term: 'Thuật ngữ',
  tip: 'Lời khuyên',
  connect: 'Kết nối',
};

const STATUS = {
  established: 'Kiến thức đã xác lập',
  experimental: 'Kết quả thực nghiệm',
  conjecture: 'Giả thuyết',
  debated: 'Đang tranh luận',
};

export function slugify(s) {
  return String(s)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')
    .toLowerCase().replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'muc';
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function tex(src, display = false) {
  try {
    return katex.renderToString(src, { displayMode: display, throwOnError: false, strict: 'ignore' });
  } catch {
    return `<code>${esc(src)}</code>`;
  }
}

const isFence = (l) => /^\s*(```|~~~)/.test(l);
const isOpen = (l) => /^:::\s*[a-z-]+/i.test(l);
const isClose = (l) => /^:::\s*$/.test(l);

export function createRenderer({ chapterTitle = () => null } = {}) {
  let uid = 0;

  function render(src) {
    const ctx = { toc: [], ids: new Map(), ex: 0 };
    const html = blocks(String(src || '').replace(/\r\n?/g, '\n'), ctx);
    return { html, toc: ctx.toc };
  }

  function split(src) {
    const lines = src.split('\n');
    const out = [];
    let buf = [];
    let fence = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (isFence(line)) fence = !fence;
      const m = !fence && line.match(/^:::\s*([a-z-]+)\s*(.*)$/i);
      if (!m) {
        buf.push(line);
        continue;
      }
      if (buf.length) out.push({ md: buf.join('\n') }), (buf = []);
      const body = [];
      let depth = 1;
      let f2 = false;
      for (i++; i < lines.length; i++) {
        const l = lines[i];
        if (isFence(l)) f2 = !f2;
        if (!f2 && isOpen(l)) depth++;
        else if (!f2 && isClose(l) && --depth === 0) break;
        body.push(l);
      }
      out.push({ type: m[1].toLowerCase(), args: m[2].trim(), text: body.join('\n') });
    }
    if (buf.length) out.push({ md: buf.join('\n') });
    return out;
  }

  function splitTop(text, re) {
    const parts = [{ lines: [], sep: null }];
    let depth = 0;
    let fence = false;
    for (const l of text.split('\n')) {
      if (isFence(l)) fence = !fence;
      if (!fence && isOpen(l)) depth++;
      else if (!fence && isClose(l)) depth--;
      const m = !depth && !fence && l.match(re);
      if (m) parts.push({ lines: [], sep: m });
      else parts[parts.length - 1].lines.push(l);
    }
    return parts.map((p) => ({ text: p.lines.join('\n'), sep: p.sep }));
  }

  const blocks = (src, ctx) => split(src).map((s) => (s.md !== undefined ? markdown(s.md, ctx) : block(s, ctx))).join('\n');

  function block({ type, args, text }, ctx) {
    if (CALLOUTS[type]) {
      return `<aside class="callout c-${type}"><div class="callout-title">${inline(args || CALLOUTS[type])}</div><div class="callout-body">${blocks(text, ctx)}</div></aside>`;
    }
    if (type === 'derivation') {
      const steps = splitTop(text, /^---\s*$/).filter((s) => s.text.trim());
      return `<section class="derivation"><header><span class="tag">Dẫn xuất từng bước</span> <span class="d-title">${inline(args)}</span></header><ol>${steps
        .map((s, k) => `<li class="d-step" data-k="${k}">${blocks(s.text, ctx)}</li>`)
        .join('')}</ol><div class="d-controls"></div></section>`;
    }
    if (type === 'exercise') {
      ctx.ex++;
      const parts = splitTop(text, /^\?\?\?\s*(hint|solution)\s*(.*)$/i);
      const extra = parts
        .slice(1)
        .map((p) => {
          const hint = p.sep[1].toLowerCase() === 'hint';
          return `<details class="${hint ? 'ex-hint' : 'ex-sol'}"><summary>${inline(p.sep[2] || (hint ? 'Gợi ý' : 'Lời giải'))}</summary><div>${blocks(p.text, ctx)}</div></details>`;
        })
        .join('');
      return `<section class="exercise"><header><span class="tag">Bài tập ${ctx.ex}</span> ${inline(args)}</header>${blocks(parts[0].text, ctx)}${extra}</section>`;
    }
    if (type === 'quiz') return quiz(text, args, ctx);
    if (type === 'sim') {
      const m = args.match(/^([a-z0-9-]+)\s*(\{.*\})?\s*$/i) || [null, args];
      let cfg = '{}';
      try { if (m[2]) cfg = JSON.stringify(JSON.parse(m[2])); } catch { /* bỏ qua cấu hình lỗi */ }
      const cap = text.trim() ? `<figcaption>${blocks(text, ctx)}</figcaption>` : '';
      return `<figure class="sim" data-sim="${esc(m[1])}" data-config="${esc(cfg)}"><div class="sim-mount"><div class="sim-loading">Đang nạp mô phỏng…</div></div>${cap}</figure>`;
    }
    if (type === 'status') {
      const key = (args.split(/\s+/)[0] || 'established').toLowerCase();
      return `<aside class="status s-${key}"><span class="status-badge">${STATUS[key] || key}</span>${blocks(text, ctx)}</aside>`;
    }
    if (type === 'columns') {
      return `<div class="columns">${splitTop(text, /^\|\|\|\s*$/).map((c) => `<div>${blocks(c.text, ctx)}</div>`).join('')}</div>`;
    }
    return `<aside class="callout c-note"><div class="callout-title">${esc(type)}</div><div class="callout-body">${blocks(text, ctx)}</div></aside>`;
  }

  function quiz(text, args, ctx) {
    const q = [];
    const opts = [];
    for (const l of text.split('\n')) {
      const m = l.match(/^\s*-\s*\[( |x|X)\]\s*(.*)$/);
      if (m) {
        const [label, ...ex] = m[2].split('||');
        opts.push({ ok: m[1] !== ' ', label: label.trim(), ex: ex.join('||').trim() });
      } else if (opts.length && l.trim()) opts[opts.length - 1].ex += ' ' + l.trim();
      else q.push(l.replace(/^\s*Q:\s*/, ''));
    }
    const id = `quiz-${++uid}`;
    return `<section class="quiz" data-quiz="${id}"><header><span class="tag">Tự kiểm tra</span> ${inline(args)}</header><div class="quiz-q">${markdown(q.join('\n'), ctx)}</div><ol class="quiz-opts">${opts
      .map((o, k) => `<li data-ok="${o.ok ? 1 : 0}"><button type="button"><b>${String.fromCharCode(65 + k)}</b><span>${inline(o.label)}</span></button><div class="quiz-ex" hidden>${inline(o.ex)}</div></li>`)
      .join('')}</ol></section>`;
  }

  // ---- Bảo vệ công thức & liên kết trước khi đưa qua marked ----
  function protect(src) {
    const store = [];
    const put = (h) => `\u0000${store.push(h) - 1}\u0000`;
    const code = [];
    const parts = src.split(/(^```[\s\S]*?^```\s*$|^~~~[\s\S]*?^~~~\s*$)/m);
    const text = parts
      .map((part, i) => {
        if (i % 2) return part;
        let s = part.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (m) => `\u0001${code.push(m) - 1}\u0001`);
        s = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => put(`<div class="math-block">${tex(t.trim(), true)}</div>`));
        s = s.replace(/(^|[^\\$])\$(?!\s)([^$\n]+?)(?<![\s\\])\$(?!\d)/g, (_, pre, t) => pre + put(tex(t, false)));
        s = s.replace(/\\\$/g, '$');
        s = s.replace(/\[\[([a-z0-9-]+)(#[a-z0-9-]+)?(?:\|([^\]]+))?\]\]/gi, (_, id, hash, label) => {
          const title = chapterTitle(id);
          return put(`<a class="xref${title ? '' : ' missing'}" href="#/c/${id}${hash ? '/' + hash.slice(1) : ''}">${esc(label || title || id)}</a>`);
        });
        return s.replace(/\u0001(\d+)\u0001/g, (_, k) => code[+k]);
      })
      .join('');
    return { text, store };
  }

  const restore = (html, store) =>
    html.replace(/\u0000(\d+)\u0000/g, (_, k) => store[+k] ?? '').replace(/<p>\s*(<div class="math-block">[\s\S]*?<\/div>)\s*<\/p>/g, '$1');

  function markdown(src, ctx) {
    const { text, store } = protect(src);
    const m = new Marked({ gfm: true });
    m.use({
      renderer: {
        heading({ tokens, depth }) {
          const inner = this.parser.parseInline(tokens);
          const full = restore(inner, store);
          let id = slugify(full);
          const n = ctx.ids.get(id) || 0;
          ctx.ids.set(id, n + 1);
          if (n) id += '-' + n;
          if (depth === 2 || depth === 3) ctx.toc.push({ id, depth, html: full });
          return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
        },
      },
    });
    return restore(m.parse(text), store).replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  }

  function inline(src) {
    if (!src) return '';
    const { text, store } = protect(String(src));
    return restore(new Marked({ gfm: true }).parseInline(text), store);
  }

  return { render, inline };
}

export function plainText(md) {
  return String(md || '')
    .replace(/^:::.*$/gm, ' ')
    .replace(/^\?\?\?.*$/gm, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\[\[([a-z0-9-]+)(?:#[^|\]]*)?(?:\|([^\]]+))?\]\]/gi, (_, id, l) => l || id)
    .replace(/[#>*_`|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
