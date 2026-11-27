:::question
Feynman gọi thí nghiệm hai khe là hiện tượng “không thể giải thích bằng bất kỳ cách cổ điển nào, và chứa đựng điều bí ẩn duy nhất của cơ học lượng tử”. Bí ẩn đó là gì — và nó có thể được nói gọn trong một dòng toán học không?
:::

## Trực giác: ba thí nghiệm

Tưởng tượng một bức tường có hai khe hẹp, phía sau là một màn hứng.

**Thí nghiệm 1 — bắn bi.** Bắn những viên bi qua hai khe. Trên màn, bi tụ thành hai đống, mỗi đống sau một khe. Nếu chỉ mở khe 1, ta được phân bố $P_1$; chỉ mở khe 2, được $P_2$; mở cả hai, được $P_{12} = P_1 + P_2$. Xác suất cộng lại — vì mỗi viên bi đi qua *một* khe.

**Thí nghiệm 2 — sóng nước.** Sóng đi qua hai khe tạo thành hai sóng tròn, giao thoa với nhau. Trên “màn” (một dãy phao), độ cao dao động có các chỗ cực đại và cực tiểu xen kẽ: **vân giao thoa**. Cường độ $I_{12} \neq I_1 + I_2$. Nhưng sóng là liên tục: năng lượng tới mọi điểm trên màn cùng lúc.

**Thí nghiệm 3 — electron (hay photon) từng hạt một.** Bắn electron với cường độ thấp đến mức chỉ có *một* electron trong thiết bị tại mỗi thời điểm. Mỗi electron tạo **một chấm** trên màn — như một viên bi. Nhưng khi tích lũy hàng nghìn chấm, chúng tạo thành **vân giao thoa** — như một con sóng. Và nếu đặt máy dò để biết mỗi electron đi qua khe nào, vân giao thoa **biến mất**.

:::sim interference
Bấm “Bắn 1 hạt” vài lần: các chấm có vẻ ngẫu nhiên. Rồi bắn 2000 hạt: vân hiện ra. Bây giờ đánh dấu ô “Đặt máy dò” và bắn lại. Hãy thử giảm độ mở của khe thứ hai về 0 — vân biến mất theo một cách khác.
:::

## Vì sao cần một khái niệm mới?

Không mô hình cổ điển nào giải thích cả ba quan sát cùng lúc:
- Nếu electron là hạt đi qua một khe xác định, phân bố phải là $P_1 + P_2$ — không có vân.
- Nếu electron là sóng lan tỏa, nó không thể tạo ra *một chấm* duy nhất.
- Có những điểm trên màn mà khi mở **một** khe thì electron tới được, nhưng khi mở **hai** khe thì electron *không bao giờ* tới. Thêm một con đường lại làm *giảm* xác suất! Không có lý thuyết xác suất cổ điển nào cho phép điều đó.

Cần một đại lượng mới: thứ có thể triệt tiêu nhau. Xác suất (số không âm) không làm được. **Số phức** làm được.

## Bản chất: biên độ xác suất

:::definition Quy tắc của Feynman cho biên độ
1. Mỗi cách để một sự kiện xảy ra được gán một số phức gọi là **biên độ xác suất** (probability amplitude) $\psi$.
2. Xác suất của sự kiện là $P = |\psi|^2$.
3. Nếu sự kiện có thể xảy ra theo nhiều cách **không phân biệt được**, biên độ tổng là **tổng các biên độ**: $\psi = \psi_1 + \psi_2$.
4. Nếu các cách là **phân biệt được** (về nguyên tắc có thể biết cách nào đã xảy ra), xác suất tổng là **tổng các xác suất**: $P = |\psi_1|^2 + |\psi_2|^2$.
:::

Áp dụng cho hai khe:
$$P_{12} = |\psi_1 + \psi_2|^2 = |\psi_1|^2 + |\psi_2|^2 + 2\,\mathrm{Re}(\bar\psi_1\psi_2).$$

Đúng là công thức đã gặp ở [[so-phuc]]. Số hạng cuối là **số hạng giao thoa**. Nó có thể âm — và đó là cách thêm một con đường lại làm giảm xác suất.

:::derivation Vị trí các vân sáng
Gọi $d$ là khoảng cách hai khe, $L$ là khoảng cách tới màn ($L \gg d$), $x$ là vị trí trên màn. Biên độ từ mỗi khe tới điểm $x$ tỉ lệ với $e^{ikr_j}$, trong đó $r_j$ là quãng đường và $k = 2\pi/\lambda$ (với electron, $\lambda = h/p$ theo de Broglie).

---
Hiệu quãng đường: $r_2 - r_1 \approx d\sin\theta \approx d\,x/L$. Do đó độ lệch pha:
$$\Delta\varphi = k(r_2 - r_1) \approx \frac{2\pi d\,x}{\lambda L}.$$

---
Với hai biên độ cùng độ lớn: $P_{12} \propto 2 + 2\cos\Delta\varphi = 4\cos^2(\Delta\varphi/2)$.

---
Vân sáng khi $\Delta\varphi = 2\pi m$, tức tại $x_m = m\,\dfrac{\lambda L}{d}$. **Khoảng vân** $\lambda L/d$: bước sóng càng nhỏ hoặc hai khe càng xa nhau, vân càng sít. Đây là cách người ta *đo* bước sóng de Broglie của electron, neutron, và cả phân tử $C_{60}$.
:::

### Vì sao biết đường đi thì mất giao thoa?

Quy tắc 4 nói: chỉ cần *về nguyên tắc* có thông tin phân biệt hai con đường là đủ để giao thoa biến mất — không cần ai đọc thông tin đó. Ta sẽ hiểu cơ chế chính xác ở [[ma-tran-mat-do]]: máy dò trở nên **rối** với electron, và hai con đường gắn với hai trạng thái *trực giao* của máy dò. Số hạng giao thoa bị nhân với tích trong của hai trạng thái máy dò — bằng 0.

## Giao thoa kế Mach–Zehnder: thí nghiệm hai khe dạng “sạch”

Để thấy rõ cấu trúc toán học, hãy thay hai khe bằng một thiết bị chỉ có **hai đường đi** rời rạc. Một photon đi vào **bộ tách chùm** (beam splitter) thứ nhất, bị chia thành hai nhánh, mỗi nhánh đi qua một gương, rồi gặp lại nhau ở bộ tách chùm thứ hai, sau đó tới một trong hai đầu dò $D_0$, $D_1$.

Mô tả photon bằng vectơ biên độ $(\psi_{\text{dưới}}, \psi_{\text{trên}}) \in \mathbb{C}^2$. Một bộ tách chùm 50/50 là ma trận unita
$$B = \frac{1}{\sqrt 2}\begin{pmatrix}1 & i\\ i & 1\end{pmatrix}$$
(phản xạ thêm một pha $i$). Bộ dịch pha trên nhánh trên là $\mathrm{diag}(1, e^{i\varphi})$.

:::derivation Tính xác suất tại hai đầu dò
Photon vào theo nhánh dưới: $(1, 0)$. Sau bộ tách chùm thứ nhất: $\tfrac{1}{\sqrt2}(1, i)$ — cùng độ lớn trên hai nhánh.

---
Sau bộ dịch pha: $\tfrac1{\sqrt2}(1, ie^{i\varphi})$.

---
Sau bộ tách chùm thứ hai:
$$\frac12\begin{pmatrix}1 & i\\ i & 1\end{pmatrix}\begin{pmatrix}1\\ ie^{i\varphi}\end{pmatrix} = \frac12\begin{pmatrix}1 - e^{i\varphi}\\ i + ie^{i\varphi}\end{pmatrix}.$$

---
Xác suất:
$$P(D_0) = \tfrac14|1 - e^{i\varphi}|^2 = \sin^2\tfrac{\varphi}{2}, \qquad P(D_1) = \cos^2\tfrac\varphi2.$$
Với $\varphi = 0$: **mọi photon tới $D_1$**, đầu dò $D_0$ không bao giờ sáng. Hai biên độ tới $D_0$ là $\tfrac12$ và $-\tfrac12$ — triệt tiêu hoàn toàn.
:::

:::sim mzi
Đặt $\varphi = 0$ và gửi 200 photon: $D_0$ im lặng. Bây giờ chặn nhánh trên: một nửa số photon bị chặn, nhưng **$D_0$ bắt đầu nhận photon**. Đây là nền tảng của thí nghiệm “kiểm tra bom” Elitzur–Vaidman: phát hiện sự hiện diện của một vật mà (đôi khi) không có photon nào chạm vào nó.
:::

:::physics
Hãy để ý cấu trúc: trạng thái là vectơ trong $\mathbb{C}^2$, các thiết bị quang học là ma trận unita, xác suất là bình phương mô-đun. Một photon trong giao thoa kế **chính là một qubit**, và bộ tách chùm là (một biến thể của) cổng Hadamard. Giao thoa kế Mach–Zehnder là máy tính lượng tử nhỏ nhất có thể: mạch $H \cdot \text{Phase}(\varphi) \cdot H$. Ta sẽ gặp lại nó trong [[cong-mach]] và [[deutsch-jozsa]].
:::

## Ví dụ và bài tập

:::exercise Không có bộ tách chùm thứ hai
Bỏ bộ tách chùm thứ hai. Tính $P(D_0)$ và $P(D_1)$. Chúng có phụ thuộc $\varphi$ không? Giải thích.
???solution
Trạng thái tới đầu dò là $\tfrac1{\sqrt2}(1, ie^{i\varphi})$, nên $P = \tfrac12, \tfrac12$, không phụ thuộc $\varphi$. Không có gì “trộn” hai nhánh lại với nhau, nên mỗi đầu dò chỉ ứng với một con đường: con đường là phân biệt được, xác suất cộng thay vì biên độ. Pha chỉ trở nên quan sát được khi hai con đường được **kết hợp lại** — đó là vai trò của bộ tách chùm thứ hai, và của cổng Hadamard cuối cùng trong nhiều thuật toán lượng tử.
:::

:::exercise Giao thoa không hoàn toàn
Thay bộ tách chùm thứ nhất bằng một bộ không cân bằng, cho biên độ $\cos\alpha$ ở nhánh dưới và $i\sin\alpha$ ở nhánh trên. Với $\varphi = 0$, tính $P(D_0)$. Độ tương phản vân $V = (P_{\max} - P_{\min})/(P_{\max} + P_{\min})$ bằng bao nhiêu khi quét $\varphi$?
???solution
Biên độ tới $D_0$: $\tfrac1{\sqrt2}(\cos\alpha - \sin\alpha\,e^{i\varphi})$, nên $P(D_0) = \tfrac12(1 - \sin 2\alpha\cos\varphi)$. Khi $\varphi = 0$: $\tfrac12(1 - \sin2\alpha)$. Quét $\varphi$: $P$ dao động giữa $\tfrac12(1\pm\sin2\alpha)$, nên $V = \sin 2\alpha = 2|\cos\alpha\sin\alpha|$. Độ tương phản cực đại khi hai nhánh có biên độ bằng nhau. Đây là một mối quan hệ định lượng giữa “biết đường đi” và “thấy giao thoa” (bất đẳng thức Englert–Greenberger–Yasin $D^2 + V^2 \le 1$).
:::

:::quiz
Q: Trong thí nghiệm hai khe, ta đặt một máy dò ở khe 1 nhưng **không bao giờ đọc** kết quả của nó. Vân giao thoa sẽ ra sao?
- [ ] Vẫn còn nguyên, vì không ai biết hạt đi khe nào || Điều quyết định là thông tin có *tồn tại* trong máy dò hay không, không phải có ai đọc nó hay không.
- [x] Biến mất || Máy dò ghi lại thông tin phân biệt hai đường đi; hai khả năng trở nên phân biệt được nên xác suất cộng chứ không phải biên độ cộng.
- [ ] Biến mất một nửa || Nếu máy dò phân biệt hoàn hảo, giao thoa mất hoàn toàn. Máy dò yếu (phân biệt một phần) mới cho giao thoa một phần.
:::

## Kết nối

- **Nền tảng:** [[so-phuc]] (số hạng giao thoa), [[xac-suat]] (xác suất cổ điển cộng như thế nào), [[khung-hoang]] (photon, bước sóng de Broglie).
- **Tiếp theo:** [[trang-thai]] trừu tượng hóa “vectơ biên độ” thành trạng thái lượng tử; [[phep-do]] chính thức hóa quy tắc $P = |\psi|^2$.
- **Xa hơn:** mọi thuật toán lượng tử là một giao thoa kế được thiết kế khéo: làm các biên độ của đáp án sai triệt tiêu, của đáp án đúng tăng cường ([[deutsch-jozsa]], [[grover]]).

## Hiểu lầm thường gặp

:::misconception “Electron là một con sóng, và chấm trên màn là nơi sóng ‘sụp’ xuống.”
Hàm sóng không phải là một con sóng vật chất trong không gian ba chiều. Với hai electron, hàm sóng sống trong không gian **sáu** chiều (cấu hình của cả hai). Nó là một công cụ tính biên độ xác suất, không phải một vật thể gợn sóng thực sự.
:::

:::misconception “Electron đi qua cả hai khe cùng lúc.”
Đây là một cách nói gợi hình phổ biến, nhưng nó gán cho electron một quỹ đạo, chỉ là “hai quỹ đạo”. Phát biểu chính xác là: hai khả năng đóng góp **biên độ** và các biên độ cộng lại. Câu hỏi “thực sự electron đi đâu khi không ai đo” thuộc về các cách diễn giải cơ học lượng tử, và các cách diễn giải khác nhau trả lời khác nhau.
:::

:::misconception “Giao thoa biến mất vì máy dò làm nhiễu, đẩy lệch hạt.”
Có những thí nghiệm (máy xóa lượng tử — quantum eraser, máy dò dựa trên trạng thái nội của nguyên tử) trong đó việc đánh dấu đường đi hầu như không làm thay đổi động lượng, nhưng vân vẫn biến mất. Cơ chế đúng là **rối với máy dò**, không phải cú va chạm cơ học.
:::

## Góc nhìn nghiên cứu

:::research
- **Giao thoa sóng vật chất với vật thể ngày càng lớn.** Các nhóm ở Vienna đã quan sát giao thoa với phân tử chứa hơn 2 000 nguyên tử (khối lượng trên 25 000 đơn vị khối lượng nguyên tử, Fein và cộng sự, Nature Physics 2019). Câu hỏi “cơ học lượng tử có còn đúng ở thang vĩ mô?” là một hướng thực nghiệm của nền tảng lượng tử, liên quan đến các mô hình sụp đổ tự phát (GRW, CSL).
- **Giao thoa kế nguyên tử** đo gia tốc trọng trường và quay với độ chính xác cực cao — một nhánh lớn của cảm biến lượng tử ([[ban-do-nghien-cuu]]).
:::

:::status experimental
Vân giao thoa đơn hạt đã được quan sát với photon, electron, neutron, nguyên tử và phân tử lớn. Chưa có thí nghiệm nào phát hiện vi phạm của quy tắc cộng biên độ; các giới hạn trên của các mô hình sụp đổ tự phát ngày càng được siết chặt.
:::
