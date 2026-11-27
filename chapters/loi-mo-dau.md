Cuốn sách này được viết cho một người muốn **thực sự hiểu** cơ học lượng tử và tính toán lượng tử — không phải để thuộc vài định nghĩa, mà để có thể tự mình dẫn ra các công thức quan trọng, giải thích vì sao chúng đúng, và cuối cùng đọc được một bài báo nghiên cứu với con mắt phản biện.

## Cuốn sách này khác gì?

Phần lớn giáo trình bắt đầu bằng định nghĩa: *“Một qubit là một vectơ đơn vị trong $\mathbb{C}^2$.”* Câu đó đúng, nhưng nó trả lời câu hỏi sai. Người mới học không hỏi *qubit là gì*; họ hỏi *tại sao lại là vectơ phức? Tại sao xác suất lại là bình phương? Ai nghĩ ra những thứ này, và họ bị buộc phải nghĩ ra nó bởi thí nghiệm nào?*

Vì vậy mỗi chương đi theo một nhịp cố định:

1. **Trực giác** — một hiện tượng, một hình ảnh, hoặc một câu hỏi gợi mở.
2. **Vì sao** — vấn đề nào khiến con người phải phát minh ra khái niệm này.
3. **Bản chất** — cơ chế hoạt động, nói bằng lời trước khi nói bằng ký hiệu.
4. **Nền tảng toán học** — dẫn xuất từng bước, không nhảy cóc, giải thích từng ký hiệu.
5. **Ý nghĩa vật lý** — công thức đó thực sự mô tả điều gì trong thế giới.
6. **Ví dụ và bài tập** — có gợi ý, lời giải, và giải thích vì sao một đáp án sai là sai.
7. **Mô phỏng** — để bạn tự thay đổi tham số và *kiểm chứng* điều vừa học.
8. **Kết nối** — chương này dựa trên gì, và mở đường cho những gì.
9. **Hiểu lầm thường gặp** — những cái bẫy mà gần như ai cũng từng rơi vào.
10. **Góc nhìn nghiên cứu** — khái niệm này đang sống thế nào trong nghiên cứu hiện đại.

Không phải chương nào cũng có đủ mười mục với độ dài như nhau, nhưng tinh thần thì luôn vậy: *hiểu bản chất trước, ghi nhớ công thức sau*.

## Các khối bạn sẽ gặp

:::intuition
Khối màu hổ phách là **trực giác**: một cách nghĩ “đủ đúng” để định hướng. Nó không thay thế được chứng minh, và đôi khi sẽ được chỉnh lại ở chương sau.
:::

:::definition
Khối xanh dương là **định nghĩa** — phát biểu chính xác, dùng để lập luận.
:::

:::misconception
Khối đỏ chỉ ra một **hiểu lầm phổ biến** và cách phân biệt nó với điều đúng.
:::

:::derivation Một dẫn xuất nhỏ để làm quen
Mỗi dẫn xuất được chia thành các bước. Hãy thử tự làm bước tiếp theo *trước khi* bấm nút hiện nó.

---
Ví dụ: ta muốn chứng minh $(a+b)^2 = a^2 + 2ab + b^2$. Theo định nghĩa của bình phương:
$$(a+b)^2 = (a+b)(a+b).$$

---
Dùng tính phân phối của phép nhân với phép cộng:
$$(a+b)(a+b) = a(a+b) + b(a+b) = a^2 + ab + ba + b^2.$$

---
Vì phép nhân số thực có tính giao hoán, $ab = ba$, nên ta được $a^2 + 2ab + b^2$. Hãy để ý: bước cuối **dùng tới tính giao hoán**. Khi gặp ma trận và toán tử — những thứ *không* giao hoán — công thức này sẽ sai, và chính chỗ sai đó sinh ra nguyên lý bất định.
:::

:::quiz
Q: Trong dẫn xuất trên, nếu $a$ và $b$ là hai ma trận với $ab \neq ba$, thì $(a+b)^2$ bằng gì?
- [ ] $a^2 + 2ab + b^2$ || Bước gộp $ab + ba = 2ab$ cần tính giao hoán, mà ma trận nói chung không có.
- [x] $a^2 + ab + ba + b^2$ || Đây là kết quả trước khi dùng tính giao hoán — luôn đúng cho ma trận.
- [ ] $a^2 + b^2$ || Các số hạng chéo không tự biến mất.
:::

:::status established
Khối có nhãn như thế này cho biết **mức độ chắc chắn** của một phát biểu: *kiến thức đã xác lập*, *kết quả thực nghiệm*, *giả thuyết* hay *đang tranh luận*. Ở các chương nghiên cứu, sự phân biệt này cực kỳ quan trọng.
:::

## Lộ trình đọc

Cuốn sách có năm phần.

- **Phần I — Ngôn ngữ toán học.** Số phức, vectơ, ma trận, xác suất, tích tensor. Nếu bạn đã vững đại số tuyến tính, vẫn nên đọc lướt: các ví dụ được chọn để chuẩn bị trực tiếp cho cơ học lượng tử.
- **Phần II — Khi vật lý cổ điển rạn nứt.** Những thí nghiệm đã buộc các nhà vật lý từ bỏ trực giác cổ điển.
- **Phần III — Cơ học lượng tử.** Các tiên đề: trạng thái, phép đo, tiến hóa, hệ hỗn hợp, rối lượng tử.
- **Phần IV — Tính toán lượng tử.** Qubit, cổng, mạch, các giao thức và thuật toán nền tảng, sửa lỗi.
- **Phần V — Biên giới nghiên cứu.** Thuật toán biến phân, học máy lượng tử, và bản đồ những câu hỏi còn mở.

Bạn không bắt buộc phải đọc tuyến tính. Trang [Bản đồ kiến thức](#/ban-do) cho thấy chương nào phụ thuộc vào chương nào. Khi bạn mở một chương mà chưa đánh dấu hiểu các chương nền tảng của nó, sách sẽ nhắc bạn — nhưng không cấm bạn đọc tiếp.

## Cách học hiệu quả với cuốn sách này

:::tip
- **Đoán trước khi xem.** Trước mỗi mô phỏng, hãy dự đoán kết quả. Sai cũng tốt — chỗ trực giác của bạn sai chính là chỗ bạn sắp học được điều gì đó.
- **Viết lại bằng lời của mình.** Cuối mỗi chương có ô ghi chú. Nếu không tóm tắt được chương trong năm câu, bạn chưa hiểu nó.
- **Làm bài tập bằng bút chì.** Đọc lời giải không thay thế được việc tự tính.
- **Chỉ đánh dấu “đã hiểu” khi bạn có thể giảng lại** cho người khác mà không nhìn sách.
:::

Về ngôn ngữ: sách viết bằng tiếng Việt. Thuật ngữ chuyên ngành tiếng Anh được giữ lại khi đó là từ cộng đồng nghiên cứu thực sự dùng (ví dụ *entanglement*, *qubit*, *ansatz*), và được giải thích ở lần xuất hiện đầu tiên. Khi đọc paper, bạn sẽ cần chính những từ đó.

Bắt đầu thôi. Chương đầu tiên nói về một thứ tưởng chừng chỉ là mẹo đại số — **số phức** — nhưng thực ra là ngôn ngữ mà tự nhiên dùng để viết các định luật lượng tử: [[so-phuc]].
