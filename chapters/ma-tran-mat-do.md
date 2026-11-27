:::question
Tôi đưa bạn một hộp gồm nhiều photon. Có hai cách tôi có thể đã chuẩn bị nó: (A) mỗi photon được tung đồng xu, mặt ngửa thì phân cực ngang $|H\rangle$, sấp thì dọc $|V\rangle$; (B) mỗi photon được tung đồng xu, ngửa thì phân cực 45° $|D\rangle$, sấp thì −45° $|A\rangle$. Bạn được làm bất kỳ phép đo nào. Bạn có thể biết tôi đã dùng cách nào không?
:::

## Trực giác: hai loại không chắc chắn

Câu trả lời đáng ngạc nhiên: **không thể**. Không có phép đo nào, dù tinh vi đến đâu, phân biệt được hai hộp đó. Chúng là cùng một trạng thái vật lý.

Điều này cho thấy vectơ trạng thái chưa đủ để mô tả mọi tình huống. Khi ta **không biết chắc** hệ đang ở trạng thái thuần nào — vì nguồn ồn, vì hệ tương tác với môi trường, hoặc vì hệ là một phần của một hệ lớn hơn bị rối — cần một đối tượng mô tả mới. Đối tượng đó phải gom mọi cách chuẩn bị cho cùng thống kê lại làm một. Đó là **ma trận mật độ**.

Hãy giữ trong đầu hai loại không chắc chắn:
- **Chồng chập** $\tfrac{1}{\sqrt2}(|H\rangle + |V\rangle)$: một trạng thái xác định, có pha tương đối, cho giao thoa.
- **Hỗn hợp** “50% $|H\rangle$, 50% $|V\rangle$”: sự thiếu hiểu biết cổ điển, không có pha, không giao thoa.

## Vì sao cần đến nó?

Ba lý do, mỗi cái đều thiết yếu:

1. **Thiết bị thật không hoàn hảo.** Nguồn photon, qubit siêu dẫn, bẫy ion — đều tạo ra trạng thái bị nhiễu.
2. **Hệ con của một hệ rối không có trạng thái thuần.** Ở [[tensor]], ta thấy $\tfrac1{\sqrt2}(|00\rangle + |11\rangle)$ không viết được dưới dạng tích. Vậy qubit thứ nhất *một mình* đang ở trạng thái nào? Câu trả lời là một ma trận mật độ.
3. **Mất kết hợp.** Mọi hệ thật đều tương tác với môi trường. Hiểu cách chồng chập biến thành hỗn hợp là hiểu vì sao thế giới vĩ mô trông cổ điển — và vì sao máy tính lượng tử khó chế tạo.

## Bản chất

:::definition Ma trận mật độ
Nếu hệ ở trạng thái $|\psi_i\rangle$ với xác suất $p_i$, **ma trận mật độ** (density matrix/operator) là
$$\rho = \sum_i p_i\,|\psi_i\rangle\langle\psi_i|.$$
:::

Vì sao định nghĩa như vậy? Vì mọi thống kê đều tính được từ $\rho$:

:::derivation Quy tắc Born cho ma trận mật độ
Xác suất được kết quả $k$ (phép chiếu $P_k$) là trung bình có trọng số:
$$p(k) = \sum_i p_i\,\langle\psi_i|P_k|\psi_i\rangle.$$

---
Dùng đẳng thức $\langle\psi|A|\psi\rangle = \mathrm{tr}(A|\psi\rangle\langle\psi|)$ (kiểm tra: viết vết trong một cơ sở chứa $|\psi\rangle$):
$$p(k) = \sum_ip_i\,\mathrm{tr}(P_k|\psi_i\rangle\langle\psi_i|) = \mathrm{tr}\Big(P_k\sum_ip_i|\psi_i\rangle\langle\psi_i|\Big) = \mathrm{tr}(P_k\rho).$$

---
Tương tự $\langle A\rangle = \mathrm{tr}(A\rho)$. **Mọi tiên đoán chỉ phụ thuộc vào $\rho$**, không phụ thuộc vào cách cụ thể $\rho$ được tạo ra. Hai cách chuẩn bị cho cùng $\rho$ là không thể phân biệt.
:::

:::example Giải câu đố mở đầu
Cách (A): $\rho_A = \tfrac12|H\rangle\langle H| + \tfrac12|V\rangle\langle V| = \tfrac12 I$.
Cách (B): $|D\rangle\langle D| = \tfrac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$, $|A\rangle\langle A| = \tfrac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, nên $\rho_B = \tfrac12\cdot\tfrac12\begin{pmatrix}2 & 0\\0&2\end{pmatrix} = \tfrac12I$.
Cùng một ma trận. Không thí nghiệm nào phân biệt được. $\tfrac12I$ gọi là **trạng thái hỗn hợp cực đại** (maximally mixed state).
:::

:::theorem Đặc trưng của ma trận mật độ
Một ma trận $\rho$ là ma trận mật độ khi và chỉ khi: (1) $\rho^\dagger = \rho$; (2) $\rho \ge 0$ (mọi trị riêng không âm); (3) $\mathrm{tr}\,\rho = 1$.
Trạng thái là **thuần** khi và chỉ khi $\rho = |\psi\rangle\langle\psi|$, tương đương $\mathrm{tr}(\rho^2) = 1$. Ngược lại là **hỗn hợp**, với $\mathrm{tr}(\rho^2) < 1$.
:::

Đại lượng $\mathrm{tr}(\rho^2)$ gọi là **độ thuần khiết** (purity): bằng 1 với trạng thái thuần, bằng $1/d$ với trạng thái hỗn hợp cực đại trong $d$ chiều.

## Nền tảng toán học

### Qubit: quả cầu Bloch được lấp đầy

Mọi ma trận mật độ $2\times2$ viết được là
$$\rho = \frac12\big(I + \vec r\cdot\vec\sigma\big) = \frac12\begin{pmatrix}1 + r_z & r_x - ir_y\\ r_x + ir_y & 1 - r_z\end{pmatrix},\qquad |\vec r| \le 1.$$
Vectơ $\vec r = (\langle\sigma_x\rangle, \langle\sigma_y\rangle, \langle\sigma_z\rangle)$ là **vectơ Bloch**. Trị riêng của $\rho$ là $\tfrac{1\pm|\vec r|}{2}$, nên:
- $|\vec r| = 1$: trạng thái thuần, nằm **trên mặt** cầu;
- $|\vec r| < 1$: hỗn hợp, nằm **bên trong**;
- $\vec r = 0$: tâm cầu, hỗn hợp cực đại $\tfrac12I$.

Độ thuần khiết: $\mathrm{tr}\rho^2 = \tfrac12(1 + |\vec r|^2)$.

:::physics
Các phần tử ngoài đường chéo $\rho_{01} = \tfrac12(r_x - ir_y)$ gọi là **độ kết hợp** (coherence). Chúng mã hóa pha tương đối — thứ cho phép giao thoa. Phần tử trên đường chéo là **phân bố** (population) — xác suất ở $|0\rangle$ và $|1\rangle$. Một hỗn hợp có phân bố giống hệt chồng chập nhưng độ kết hợp bằng 0.
:::

### Vết riêng phần: trạng thái của một hệ con

Với hệ ghép $AB$ ở trạng thái $\rho_{AB}$, trạng thái của riêng $A$ là
$$\rho_A = \mathrm{tr}_B\,\rho_{AB} = \sum_j (I\otimes\langle j|)\,\rho_{AB}\,(I\otimes|j\rangle).$$
Đây là phiên bản lượng tử của **phân phối biên** ở [[xac-suat]]: “cộng bỏ” hệ $B$. Nó là cách *duy nhất* cho kết quả đúng với mọi phép đo chỉ thực hiện trên $A$.

:::derivation Một nửa của cặp Bell
$|\Phi^+\rangle = \tfrac{1}{\sqrt2}(|00\rangle + |11\rangle)$, nên
$$\rho_{AB} = \tfrac12\big(|00\rangle\langle00| + |00\rangle\langle11| + |11\rangle\langle00| + |11\rangle\langle11|\big).$$

---
Vết riêng phần trên $B$ giữ lại các số hạng mà phần $B$ của bra và ket **trùng nhau**, và bỏ phần $B$: $\mathrm{tr}_B(|a b\rangle\langle a'b'|) = |a\rangle\langle a'|\,\langle b'|b\rangle$.

---
- $|00\rangle\langle00| \to |0\rangle\langle 0|$
- $|00\rangle\langle 11| \to |0\rangle\langle1|\cdot\langle1|0\rangle = 0$
- $|11\rangle\langle00| \to 0$
- $|11\rangle\langle 11| \to |1\rangle\langle1|$

---
Vậy $\rho_A = \tfrac12(|0\rangle\langle0| + |1\rangle\langle 1|) = \tfrac12I$. **Toàn bộ hệ ở trạng thái thuần, hoàn toàn xác định — nhưng mỗi phần riêng lẻ lại hỗn hợp cực đại.** Thông tin không nằm trong từng qubit, mà nằm trong **tương quan** giữa chúng. Không có sự tương tự cổ điển nào cho điều này: với xác suất cổ điển, nếu biết hoàn toàn hệ chung thì cũng biết hoàn toàn từng phần.
:::

### Entropy von Neumann

$$S(\rho) = -\mathrm{tr}(\rho\log_2\rho) = -\sum_k\lambda_k\log_2\lambda_k,$$
với $\lambda_k$ là trị riêng của $\rho$. Bằng 0 với trạng thái thuần, bằng $\log_2 d$ với hỗn hợp cực đại. Với một trạng thái thuần của hệ ghép, $S(\rho_A)$ là thước đo **mức độ rối** giữa $A$ và $B$ (entropy rối). Ở ví dụ trên, $S(\rho_A) = 1$: một cặp Bell chứa đúng **một ebit** rối.

## Mất kết hợp (decoherence)

Bây giờ ta trả lời được câu hỏi bỏ ngỏ ở [[song-hat]]: vì sao biết đường đi thì mất giao thoa?

:::derivation Môi trường “đo” hệ
Qubit ở trạng thái $\alpha|0\rangle + \beta|1\rangle$; môi trường ban đầu ở $|E\rangle$. Tương tác làm môi trường “ghi nhận” trạng thái của qubit:
$$(\alpha|0\rangle + \beta|1\rangle)|E\rangle\ \longrightarrow\ \alpha|0\rangle|E_0\rangle + \beta|1\rangle|E_1\rangle.$$

---
Trạng thái của riêng qubit (vết riêng phần trên môi trường):
$$\rho = \begin{pmatrix}|\alpha|^2 & \alpha\bar\beta\,\langle E_1|E_0\rangle\\ \bar\alpha\beta\,\langle E_0|E_1\rangle & |\beta|^2\end{pmatrix}.$$

---
Phân bố trên đường chéo **không đổi**. Nhưng độ kết hợp bị nhân với $\langle E_1|E_0\rangle$ — độ “giống nhau” của hai bản ghi trong môi trường. Nếu môi trường phân biệt hoàn hảo ($\langle E_1|E_0\rangle = 0$), độ kết hợp biến mất: chồng chập trở thành hỗn hợp.

---
Không ai cần “đọc” môi trường. Chỉ cần thông tin **tồn tại** ở đó. Với vật vĩ mô, môi trường gồm vô số photon và phân tử khí; mỗi va chạm ghi một chút thông tin, và $\langle E_1|E_0\rangle$ giảm theo hàm mũ với tốc độ khổng lồ. Đó là lý do ta không thấy con mèo ở chồng chập sống–chết.
:::

Với qubit thật, mất kết hợp được mô tả bằng hai thời gian đặc trưng:
- $T_1$ — **hồi phục năng lượng**: qubit ở $|1\rangle$ rơi về $|0\rangle$ (vectơ Bloch bị kéo về cực bắc).
- $T_2$ — **mất pha**: độ kết hợp giảm (vectơ Bloch co lại về phía trục $z$). Luôn có $T_2 \le 2T_1$.

:::sim bloch {"mode":"deco"}
Chọn “Bắt đầu từ $|+\rangle$” và quan sát vectơ Bloch vừa tuế sai vừa co vào trong quả cầu theo đường xoắn ốc, rồi bò về cực bắc. Độ thuần khiết giảm từ 1, rồi tăng lại về 1 khi hệ hồi phục hoàn toàn về $|0\rangle$. Thử đặt $T_2$ rất nhỏ so với $T_1$: pha mất gần như tức thì, trong khi phân bố thay đổi chậm.
:::

## Bài tập

:::exercise Hỗn hợp hay chồng chập?
So sánh $\rho_1 = |{+}\rangle\langle{+}|$ và $\rho_2 = \tfrac12(|0\rangle\langle0| + |1\rangle\langle1|)$. (a) Viết hai ma trận. (b) Tính xác suất được $|0\rangle$ khi đo theo Z cho mỗi trạng thái. (c) Tính xác suất được $|{+}\rangle$ khi đo theo X. (d) Tính độ thuần khiết.
???solution
(a) $\rho_1 = \tfrac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$, $\rho_2 = \tfrac12\begin{pmatrix}1&0\\0&1\end{pmatrix}$. (b) Cả hai: $\tfrac12$. (c) $\rho_1$: $\langle{+}|\rho_1|{+}\rangle = 1$; $\rho_2$: $\tfrac12$. (d) $\mathrm{tr}\rho_1^2 = 1$, $\mathrm{tr}\rho_2^2 = \tfrac12$. Khác biệt duy nhất là các phần tử ngoài đường chéo — và chỉ phép đo theo cơ sở khác Z mới thấy được nó.
:::

:::exercise Trạng thái Werner
$\rho_W = p\,|\Phi^+\rangle\langle\Phi^+| + (1-p)\tfrac{I}{4}$. Tính trạng thái rút gọn của qubit đầu. Trạng thái rút gọn có phụ thuộc vào $p$ không?
???solution
$\mathrm{tr}_B|\Phi^+\rangle\langle\Phi^+| = \tfrac12I$ và $\mathrm{tr}_B\tfrac I4 = \tfrac12 I$. Vậy $\rho_A = \tfrac12I$ với mọi $p$. Nhìn từng qubit riêng lẻ, không thể biết cặp này rối nhiều hay ít — thông tin đó chỉ nằm trong tương quan. (Trạng thái Werner hai qubit là rối khi và chỉ khi $p > 1/3$; nó vi phạm bất đẳng thức CHSH khi $p > 1/\sqrt2$.)
:::

:::quiz
Q: Vectơ Bloch của một qubit có độ dài 0,6. Kết luận nào đúng?
- [ ] Qubit ở chồng chập 60/40 || Độ dài vectơ Bloch không cho biết tỉ lệ chồng chập; một trạng thái thuần luôn có độ dài 1.
- [x] Qubit ở trạng thái hỗn hợp, có thể do rối với một hệ khác hoặc do nhiễu || Độ dài $< 1$ nghĩa là $\mathrm{tr}\rho^2 = \tfrac12(1 + 0{,}36) = 0{,}68 < 1$.
- [ ] Qubit đã bị đo || Phép đo có đọc kết quả cho một trạng thái thuần mới; chỉ phép đo không đọc kết quả (hay mất kết hợp) mới cho hỗn hợp.
:::

## Kết nối

- **Nền tảng:** [[spin]], [[tensor]], [[xac-suat]] (phân phối biên, entropy).
- **Tiếp theo:** [[roi-luong-tu]] (đo lường rối), [[qubit-bloch]] (quả cầu Bloch đầy đủ), [[sua-loi]] (chống lại mất kết hợp).
- **Chuỗi xuyên suốt:** *xác suất → cơ học thống kê → entropy → thông tin → thông tin lượng tử → sửa lỗi.* Entropy von Neumann là mắt xích nối.

## Hiểu lầm thường gặp

:::misconception “Mất kết hợp giải quyết hoàn toàn bài toán đo lường.”
Mất kết hợp giải thích vì sao giao thoa biến mất và vì sao ma trận mật độ rút gọn trở nên chéo trong một cơ sở ưu tiên (pointer basis). Nhưng nó không giải thích vì sao trong một lần đo, ta thấy *một* kết quả cụ thể. Ma trận mật độ chéo vẫn mô tả “hoặc cái này hoặc cái kia” theo nghĩa thống kê, không chọn ra kết quả nào.
:::

:::misconception “Ma trận mật độ chỉ dùng khi ta lười tính vectơ trạng thái.”
Với một hệ con của hệ rối, *không có* vectơ trạng thái nào mô tả đúng hệ con. Ma trận mật độ là mô tả cơ bản, không phải xấp xỉ.
:::

## Góc nhìn nghiên cứu

:::research
- **Kênh lượng tử** (quantum channels) — các ánh xạ hoàn toàn dương bảo toàn vết, viết dạng Kraus $\rho \mapsto \sum_kK_k\rho K_k^\dagger$ — là ngôn ngữ chuẩn để mô tả nhiễu. Đặc trưng hóa nhiễu thực của phần cứng (tomography quá trình, randomized benchmarking, gate set tomography) là việc hằng ngày của các phòng thí nghiệm.
- **Darwinism lượng tử** (Zurek) giải thích vì sao nhiều người quan sát đồng ý về cùng một thực tại cổ điển: thông tin về các trạng thái ưu tiên được sao chép thừa vào nhiều mảnh của môi trường.
- **Nhiệt động lực học lượng tử** dùng ma trận mật độ và entropy để nghiên cứu công, nhiệt và giới hạn hiệu suất của các động cơ lượng tử.
:::
