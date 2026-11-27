# Giáo trình Lượng tử

Một cuốn giáo trình tương tác, tự host, về **Cơ học lượng tử và Tính toán lượng tử** — từ số phức tới biên giới nghiên cứu. Đọc như một cuốn sách, nhưng có công thức đẹp, mô phỏng nhúng ngay trong bài, bài tập có gợi ý và lời giải, câu hỏi trắc nghiệm có giải thích, bản đồ kiến thức, tìm kiếm toàn sách và sổ ghi chú.

Không có cơ sở dữ liệu, không có bước build, không phụ thuộc dịch vụ bên ngoài. Toàn bộ là tệp tĩnh.

## Chạy

Cần một máy chủ tĩnh bất kỳ (trình duyệt không cho tải tệp `.md` khi mở trực tiếp `index.html`).

```bash
node serve.js
```

Rồi mở <http://localhost:8000>. Không cần `npm install` — `serve.js` chỉ dùng thư viện chuẩn của Node (18 trở lên).

Không có Node? Dùng Python có sẵn trên macOS/Linux:

```bash
python3 -m http.server 8000
```

Muốn đặt trên máy chủ riêng: chép cả thư mục lên bất kỳ web server nào (nginx, Caddy, GitHub Pages…). Hoặc dùng Docker:

```bash
docker build -t giao-trinh-luong-tu . && docker run -d -p 8000:80 giao-trinh-luong-tu
```

## Nội dung

25 chương trong 5 phần, mỗi chương đi theo nhịp: trực giác → vì sao → bản chất → toán học (dẫn xuất từng bước) → ý nghĩa vật lý → ví dụ & bài tập → mô phỏng → kết nối → hiểu lầm thường gặp → góc nhìn nghiên cứu.

| Phần | Chương |
|---|---|
| Mở đầu | Cách đọc cuốn sách |
| I — Ngôn ngữ toán học | Số phức · Vectơ & tích trong · Ma trận & trị riêng · Xác suất · Tích tensor |
| II — Khi vật lý cổ điển rạn nứt | Khủng hoảng 1900 · Giao thoa & lưỡng tính sóng–hạt |
| III — Cơ học lượng tử | Trạng thái & Dirac · Phép đo & Born · Toán tử & bất định · Schrödinger · Spin · Ma trận mật độ & mất kết hợp · Rối & Bell |
| IV — Tính toán lượng tử | Qubit & Bloch · Cổng & mạch · Không sao chép & dịch chuyển · Deutsch–Jozsa · Grover · QFT & Shor · BB84 · Sửa lỗi |
| V — Biên giới nghiên cứu | Biến phân, NISQ & QML · Bản đồ 11 hướng nghiên cứu |

14 mô phỏng (cũng có ở trang **Phòng thí nghiệm**): mặt phẳng phức, tích trong, ma trận & vectơ riêng, xác suất, hai khe từng hạt, giao thoa kế Mach–Zehnder, quy tắc Born, hạt trong hộp, quả cầu Bloch (cổng + mất kết hợp T₁/T₂), CHSH, trình mô phỏng mạch tới 5 qubit (có preset Bell, GHZ, dịch chuyển, Deutsch–Jozsa, Bernstein–Vazirani, Grover, QFT, mã sửa lỗi; xuất OpenQASM), Grover, BB84, VQE.

## Dữ liệu của bạn

Tiến độ (chưa đọc / đã đọc / đã hiểu), kết quả trắc nghiệm và ghi chú được lưu trong `localStorage` của trình duyệt. Trang **Sổ tay & tiến độ** có nút xuất/nhập tệp `.json` để sao lưu hoặc chuyển sang máy khác.

## Cấu trúc

```
index.html          khung trang
css/book.css        giao diện (sáng/tối)
js/book.js          MỤC LỤC: phần, chương, chương tiên quyết, liên kết, danh sách mô phỏng
js/app.js           điều hướng, trang bìa, trang chương, bản đồ, tìm kiếm, sổ tay
js/markdown.js      Markdown + KaTeX + các khối sư phạm
js/qsim.js          lõi mô phỏng lượng tử (vectơ trạng thái, cổng, đo, vectơ Bloch)
js/sims/*.js        từng mô phỏng
chapters/*.md       nội dung các chương
vendor/             KaTeX và marked (đã kèm sẵn, chạy ngoại tuyến)
serve.js            máy chủ tĩnh tối giản
```

## Viết thêm chương

1. Tạo `chapters/<id>.md`.
2. Khai báo trong `js/book.js` (tiêu đề, số phút, `prereqs`).

Ngoài Markdown chuẩn và công thức `$...$` / `$$...$$`, có các khối:

```markdown
:::intuition                      (cũng có: why, definition, theorem, physics, example,
Nội dung…                          misconception, research, note, warning, tip, question, history)
:::

:::derivation Tiêu đề
Bước 1…
---
Bước 2…
:::

:::exercise Tiêu đề
Đề bài…
???hint
Gợi ý…
???solution
Lời giải…
:::

:::quiz
Q: Câu hỏi?
- [ ] Phương án sai || Vì sao sai
- [x] Phương án đúng || Vì sao đúng
:::

:::sim circuit {"preset":"bell"}
Chú thích cho mô phỏng.
:::

:::status experimental           (established | experimental | conjecture | debated)
Phát biểu kèm mức độ chắc chắn.
:::
```

Liên kết chéo tới chương khác: `[[id-chuong]]` hoặc `[[id-chuong|nhãn]]`.

## Ghi chú

- Phông chữ Literata và Be Vietnam Pro được tải từ Google Fonts nếu có mạng; khi ngoại tuyến, sách tự dùng phông hệ thống. Mọi thứ khác chạy hoàn toàn cục bộ.
- Các con số nghiên cứu (số qubit, tỉ lệ lỗi, ước lượng tài nguyên) phản ánh hiện trạng tới năm 2025; lĩnh vực thay đổi nhanh, nên hãy kiểm tra lại trên arXiv khi dùng.
