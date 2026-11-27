:::question
Một photon phân cực 30° đi tới một bộ lọc phân cực dọc. Nó chỉ có hai lựa chọn: đi qua, hoặc bị chặn. Không có “đi qua một phần”. Vậy cái gì quyết định — và xác suất là bao nhiêu?
:::

## Trực giác: hình chiếu trở thành xác suất

Với ánh sáng cổ điển, định luật Malus (1809) đã nói: cường độ qua bộ lọc là $I = I_0\cos^2\theta$, với $\theta$ là góc giữa phân cực và trục bộ lọc. Với một photon duy nhất, “cường độ” không còn ý nghĩa: photon hoặc qua nguyên vẹn, hoặc không. Cách duy nhất để vẫn khớp với định luật Malus khi gửi rất nhiều photon là: **mỗi photon đi qua với xác suất $\cos^2\theta$**.

Và $\cos\theta$ chính là tích trong giữa hai vectơ đơn vị: trạng thái phân cực của photon và trạng thái mà bộ lọc cho qua. Xác suất là **bình phương độ dài của hình chiếu**. Đó là toàn bộ nội dung của quy tắc Born.

## Vì sao cần một tiên đề riêng cho phép đo?

Vectơ trạng thái là một danh mục biên độ phức. Thí nghiệm cho ra những con số thực, rời rạc, ngẫu nhiên: “đầu dò số 3 kêu”. Phải có một quy tắc nối hai thế giới đó. Năm 1926, khi phân tích va chạm bằng phương trình Schrödinger, Max Born nhận ra (trong một chú thích được thêm vào lúc sửa bản in!) rằng xác suất phải tỉ lệ với **bình phương** biên độ, không phải biên độ. Ông nhận giải Nobel năm 1954 cho ý tưởng này.

## Bản chất

:::definition Tiên đề 2 — Phép đo (dạng chiếu)
Một phép đo với các kết quả phân biệt được ứng với một cơ sở trực chuẩn $\{|k\rangle\}$ (tổng quát hơn: một họ các phép chiếu trực giao $P_k$ có tổng bằng $I$). Khi đo trạng thái $|\psi\rangle$:
1. **Quy tắc Born:** kết quả $k$ xuất hiện với xác suất $p(k) = |\langle k|\psi\rangle|^2 = \langle\psi|P_k|\psi\rangle$.
2. **Cập nhật trạng thái:** ngay sau khi thu được kết quả $k$, trạng thái trở thành $\dfrac{P_k|\psi\rangle}{\sqrt{p(k)}}$ (với phép đo theo cơ sở: chính là $|k\rangle$, sai khác một pha).
:::

Kiểm tra đây đúng là một phân phối xác suất: các $p(k) \ge 0$, và theo hệ thức đầy đủ ở [[trang-thai]],
$$\sum_k p(k) = \sum_k\langle\psi|k\rangle\langle k|\psi\rangle = \langle\psi|\Big(\sum_k|k\rangle\langle k|\Big)|\psi\rangle = \langle\psi|\psi\rangle = 1.$$

:::sim born
Chọn một $\theta$, đoán trước tỉ lệ, rồi đo 10, 100, 1000 lần. Quan sát thống kê dao động quanh xác suất Born với biên độ $\sim 1/\sqrt N$. Rồi **thay đổi $\varphi$** khi đang đo theo Z: không có gì thay đổi. Chuyển sang đo theo X: bây giờ $\varphi$ hiện ra.
:::

### Phép đo làm thay đổi trạng thái

Ý thứ hai của tiên đề — thường gọi là **sự sụp đổ** (collapse) — là phần lạ nhất và gây tranh cãi nhất. Nhưng hệ quả thực nghiệm của nó rất rõ ràng: **đo lại ngay lập tức cùng một đại lượng cho cùng kết quả**. Nếu photon đã qua bộ lọc dọc, thì nó qua bộ lọc dọc thứ hai với xác suất 1.

:::example Ba bộ lọc phân cực
Đặt hai bộ lọc vuông góc (ngang rồi dọc): không ánh sáng nào qua. Chèn một bộ lọc 45° **ở giữa**: ánh sáng lại qua được — 1/8 cường độ ban đầu (sau khi qua bộ lọc đầu, còn 1/2; qua bộ lọc 45° còn $\tfrac12\cos^2 45° = \tfrac14$; qua bộ lọc dọc còn $\tfrac14\cos^245° = \tfrac18$). Thêm một vật cản lại làm *tăng* ánh sáng! Giải thích: bộ lọc 45° là một phép đo **đặt lại trạng thái** của photon thành $|D\rangle$, xóa sạch “trí nhớ” rằng nó từng là $|H\rangle$.
:::

## Nền tảng toán học

### Giá trị kỳ vọng

Nếu mỗi kết quả $k$ gắn với một giá trị số $a_k$, giá trị trung bình qua nhiều lần đo là
$$\langle A\rangle = \sum_k a_k\,p(k) = \sum_k a_k\langle\psi|P_k|\psi\rangle = \langle\psi|\Big(\sum_k a_kP_k\Big)|\psi\rangle = \langle\psi|A|\psi\rangle,$$
với $A = \sum_k a_kP_k$. Ma trận $A$ này là Hermite (vì $a_k$ thực và $P_k$ là phép chiếu), và theo định lý phổ ([[ma-tran]]), **mọi** ma trận Hermite đều có dạng này. Đó là cầu nối tới chương sau, [[toan-tu]]: một phép đo chính là một ma trận Hermite, kết quả là trị riêng, trạng thái sau đo là vectơ riêng.

### Phép đo trên một phần của hệ

Với hai qubit ở trạng thái $|\Psi\rangle = \sum_{ij}c_{ij}|ij\rangle$, đo **chỉ qubit đầu** tương ứng với phép chiếu $P_0 = |0\rangle\langle0|\otimes I$, $P_1 = |1\rangle\langle1|\otimes I$.

:::derivation Đo một qubit của trạng thái Bell
Lấy $|\Phi^+\rangle = \tfrac1{\sqrt2}(|00\rangle + |11\rangle)$. Xác suất qubit đầu cho kết quả 0:
$$p(0) = \langle\Phi^+|P_0|\Phi^+\rangle = \big\|P_0|\Phi^+\rangle\big\|^2 = \Big\|\tfrac1{\sqrt2}|00\rangle\Big\|^2 = \tfrac12.$$

---
Trạng thái sau khi đo được 0:
$$\frac{P_0|\Phi^+\rangle}{\sqrt{p(0)}} = \frac{\tfrac1{\sqrt2}|00\rangle}{1/\sqrt2} = |00\rangle.$$

---
Bây giờ qubit thứ hai **chắc chắn** ở $|0\rangle$, dù ta không chạm vào nó. Tương tự, nếu được 1 thì qubit thứ hai ở $|1\rangle$. Kết quả của hai qubit **tương quan hoàn hảo**. Chương [[roi-luong-tu]] sẽ chỉ ra vì sao tương quan này khác về bản chất với hai chiếc găng tay trong hai chiếc hộp.
:::

### Phép đo tổng quát (POVM) — một cái nhìn trước

Không phải mọi phép đo trong thực tế đều là phép chiếu. Phép đo tổng quát nhất được mô tả bởi một họ ma trận dương $E_k$ với $\sum_k E_k = I$ (một **POVM**); xác suất là $\langle\psi|E_k|\psi\rangle$. Mọi POVM đều có thể thực hiện bằng cách ghép hệ với một hệ phụ (ancilla) rồi làm phép đo chiếu trên hệ lớn (định lý Naimark). POVM xuất hiện tự nhiên trong phân biệt trạng thái và mật mã ([[bb84]]).

## Ý nghĩa vật lý

:::physics
- **Tính ngẫu nhiên là nội tại.** Theo cơ học lượng tử chuẩn, với một trạng thái thuần đã biết hoàn toàn, kết quả đo vẫn ngẫu nhiên. Không có “biến ẩn” cục bộ nào quyết định trước kết quả — điều này được hỗ trợ mạnh bởi các thí nghiệm Bell ([[roi-luong-tu]]).
- **Thông tin có giá.** Phép đo trích xuất thông tin nhưng phá hủy chồng chập trong cơ sở đo. Không thể đo một trạng thái chưa biết mà không làm thay đổi nó — gốc rễ của định lý không sao chép ([[dich-chuyen]]) và an toàn của mật mã lượng tử ([[bb84]]).
- **Hai trạng thái không trực giao không phân biệt được hoàn hảo.** Nếu $\langle\phi|\psi\rangle \neq 0$, không có phép đo nào luôn nói đúng đó là $|\phi\rangle$ hay $|\psi\rangle$.
:::

## Ví dụ và bài tập

:::exercise Đo theo cơ sở khác
Qubit ở trạng thái $|\psi\rangle = \cos\tfrac\theta2|0\rangle + e^{i\varphi}\sin\tfrac\theta2|1\rangle$. Tính xác suất được $|{+}\rangle$ khi đo theo cơ sở $\{|{+}\rangle, |{-}\rangle\}$.
???hint
$\langle{+}|\psi\rangle = \tfrac1{\sqrt2}(\cos\tfrac\theta2 + e^{i\varphi}\sin\tfrac\theta2)$. Dùng công thức $|a + b|^2 = |a|^2 + |b|^2 + 2\mathrm{Re}(\bar a b)$.
???solution
$p(+) = \tfrac12\big(\cos^2\tfrac\theta2 + \sin^2\tfrac\theta2 + 2\cos\tfrac\theta2\sin\tfrac\theta2\cos\varphi\big) = \tfrac12(1 + \sin\theta\cos\varphi)$. Pha $\varphi$ xuất hiện qua số hạng giao thoa. Đây chính là công thức mô phỏng ở trên dùng khi bạn chọn “Đo theo X”.
:::

:::exercise Phân biệt hai trạng thái
Ai đó đưa bạn một qubit, chắc chắn là $|0\rangle$ hoặc $|{+}\rangle$ (mỗi khả năng 50%). Bạn đo theo cơ sở $\{|0\rangle,|1\rangle\}$ và đoán “$|{+}\rangle$” nếu được 1, “$|0\rangle$” nếu được 0. Xác suất đoán đúng là bao nhiêu?
???solution
Nếu là $|0\rangle$: luôn được 0 → luôn đoán đúng. Nếu là $|{+}\rangle$: được 1 với xác suất 1/2 → đúng 1/2. Tổng: $\tfrac12\cdot1 + \tfrac12\cdot\tfrac12 = \tfrac34$. Chiến lược tối ưu (đo theo cơ sở nằm “giữa” hai trạng thái) đạt giới hạn Helstrom $\tfrac12(1 + \sqrt{1 - |\langle0|{+}\rangle|^2}) = \tfrac12(1 + \tfrac{1}{\sqrt2}) \approx 0{,}854$. Không chiến lược nào đạt 100%.
:::

:::quiz
Q: Một qubit ở trạng thái $|{+}\rangle$. Ta đo theo Z, được kết quả 0. Ngay sau đó ta đo theo X. Xác suất được $|{+}\rangle$ là bao nhiêu?
- [ ] 1, vì qubit ban đầu là $|{+}\rangle$ || Phép đo Z đã đặt lại trạng thái thành $|0\rangle$ — “trí nhớ” về $|{+}\rangle$ bị xóa.
- [x] 1/2 || Sau phép đo đầu, trạng thái là $|0\rangle$, và $|\langle{+}|0\rangle|^2 = 1/2$.
- [ ] 0 || $|0\rangle$ không trực giao với $|{+}\rangle$.
:::

## Kết nối

- **Nền tảng:** [[trang-thai]], [[xac-suat]], tích trong và phép chiếu ở [[vecto]].
- **Tiếp theo:** [[toan-tu]] — đại lượng quan sát là ma trận Hermite; [[ma-tran-mat-do]] — phép đo mà ta không đọc kết quả biến chồng chập thành hỗn hợp.
- **Ứng dụng:** [[bb84]] dùng chính việc “đo làm nhiễu trạng thái” để phát hiện kẻ nghe lén.

## Hiểu lầm thường gặp

:::misconception “Sụp đổ hàm sóng là một quá trình vật lý lan truyền với tốc độ vô hạn.”
Trong cơ học lượng tử chuẩn, cập nhật trạng thái sau phép đo là một quy tắc tính toán. Với hai hạt rối ở xa nhau, việc đo hạt này cập nhật mô tả của hạt kia, nhưng **không thể dùng để truyền tin** (định lý không truyền tín hiệu — no-signaling). Việc sụp đổ có phải là quá trình vật lý hay không là vấn đề diễn giải (bài toán đo lường — measurement problem).
:::

:::misconception “Phép đo cần một người quan sát có ý thức.”
Không có thí nghiệm nào ủng hộ điều này. Một máy dò, một photon tán xạ, một phân tử khí va chạm đều có thể đóng vai trò “phép đo” theo nghĩa phá hủy giao thoa ([[ma-tran-mat-do]]). Ý thức không xuất hiện trong bất kỳ công thức nào.
:::

## Góc nhìn nghiên cứu

:::research
- **Bài toán đo lường** vẫn là câu hỏi mở lớn nhất của nền tảng lượng tử: vì sao tiến hóa unita liên tục (phương trình Schrödinger) lại cùng tồn tại với cập nhật ngẫu nhiên không liên tục khi đo? Các hướng trả lời: diễn giải nhiều thế giới (Everett), cơ học Bohm, các mô hình sụp đổ tự phát (GRW/CSL — có thể kiểm chứng bằng thực nghiệm), QBism, diễn giải quan hệ.
- **Quy tắc Born có thể được dẫn ra không?** Định lý Gleason (1957) chỉ ra rằng trong không gian có số chiều $\ge 3$, mọi cách gán xác suất “hợp lý” cho các phép chiếu đều phải có dạng Born. Các nỗ lực dẫn quy tắc Born từ đối xứng (Zurek: *envariance*) hay lý thuyết quyết định (Deutsch–Wallace) vẫn còn được thảo luận.
- **Phép đo giữa mạch** (mid-circuit measurement) và **phản hồi** (feedforward) là chức năng phần cứng then chốt cho sửa lỗi lượng tử; độ nhanh và độ chính xác của phép đo là một nút thắt kỹ thuật lớn.
:::
