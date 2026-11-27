:::question
Một qubit cần 2 số phức để mô tả. Hai qubit cần bao nhiêu? Câu trả lời trực giác là $2 + 2 = 4$. Câu trả lời đúng cũng là 4 — nhưng vì một lý do hoàn toàn khác. Và với 3 qubit, trực giác nói 6, còn câu trả lời đúng là 8. Chuyện gì đang xảy ra?
:::

## Trực giác: cộng hay nhân?

Khi ghép hai hệ cổ điển — ví dụ hai đồng xu — ta mô tả hệ chung bằng cách **liệt kê mọi cặp khả năng**: SS, SN, NS, NN. Một phân phối xác suất trên hệ chung cần $2 \times 2 = 4$ con số, không phải $2 + 2$. Đó là vì hai đồng xu có thể *tương quan*: $p(S,S)$ không nhất thiết bằng $p(S)\,p(S)$.

Với hệ lượng tử cũng vậy: không gian trạng thái của hệ ghép có một cơ sở gồm mọi cặp trạng thái cơ sở của các hệ con. Số chiều **nhân** với nhau. Cấu trúc toán học thực hiện phép “ghép bằng cách nhân” này gọi là **tích tensor**, ký hiệu $\otimes$.

## Vì sao cần đến nó?

Năm 1935, Einstein, Podolsky và Rosen (EPR) và Schrödinger nhận ra rằng phép ghép hệ trong cơ học lượng tử dẫn tới một hiện tượng chưa từng có: các trạng thái của hệ ghép mà **không thể mô tả bằng cách nói từng hệ con đang ở trạng thái nào**. Schrödinger đặt tên cho nó là *Verschränkung* — rối lượng tử (entanglement). Để thấy vì sao điều đó có thể xảy ra, trước hết phải có ngôn ngữ chính xác cho “hệ ghép”: tích tensor.

## Bản chất

:::definition Tích tensor của vectơ
Với $u \in \mathbb{C}^m$ và $v \in \mathbb{C}^n$, tích tensor $u\otimes v \in \mathbb{C}^{mn}$ là vectơ gồm mọi tích $u_iv_j$:
$$\begin{pmatrix}u_1\\u_2\end{pmatrix}\otimes\begin{pmatrix}v_1\\v_2\end{pmatrix} = \begin{pmatrix}u_1v_1\\u_1v_2\\u_2v_1\\u_2v_2\end{pmatrix}.$$
:::

Các quy tắc: song tuyến tính, $(au + bu')\otimes v = a\,u\otimes v + b\,u'\otimes v$ (và tương tự với vế phải), và tích trong nhân với nhau:
$$\langle u\otimes v,\ u'\otimes v'\rangle = \langle u, u'\rangle\,\langle v, v'\rangle.$$

Nếu $\{e_i\}$ là cơ sở trực chuẩn của hệ thứ nhất và $\{f_j\}$ của hệ thứ hai, thì $\{e_i\otimes f_j\}$ là cơ sở trực chuẩn của hệ ghép. Với hai qubit, bốn vectơ cơ sở được viết gọn là $|00\rangle, |01\rangle, |10\rangle, |11\rangle$.

### Điểm mấu chốt: không phải vectơ nào cũng là một tích

Không gian ghép chứa mọi **tổ hợp tuyến tính** của các tích $e_i\otimes f_j$. Một vectơ như
$$\frac{1}{\sqrt2}\big(e_0\otimes f_0 + e_1\otimes f_1\big)$$
có thể không viết được dưới dạng $u\otimes v$ cho bất kỳ $u, v$ nào.

:::derivation Trạng thái $\tfrac{1}{\sqrt2}(|00\rangle + |11\rangle)$ không phải là một tích
Giả sử tồn tại $u = (a, b)$, $v = (c, d)$ với $u\otimes v = (ac, ad, bc, bd) = \tfrac1{\sqrt2}(1, 0, 0, 1)$.

---
Thành phần thứ hai: $ad = 0$, nên $a = 0$ hoặc $d = 0$.

---
Nếu $a = 0$ thì thành phần thứ nhất $ac = 0 \neq \tfrac1{\sqrt2}$. Mâu thuẫn. Nếu $d = 0$ thì thành phần thứ tư $bd = 0 \neq \tfrac1{\sqrt2}$. Mâu thuẫn.

---
Vậy không tồn tại $u, v$. Một tiêu chí gọn: viết vectơ $(c_{00}, c_{01}, c_{10}, c_{11})$ của hai qubit thành ma trận $C = \begin{pmatrix}c_{00} & c_{01}\\ c_{10} & c_{11}\end{pmatrix}$. Vectơ là một tích khi và chỉ khi $C$ có hạng 1, tức $\det C = c_{00}c_{11} - c_{01}c_{10} = 0$. Ở đây $\det C = \tfrac12 \neq 0$.
:::

:::definition
Một trạng thái của hệ ghép là **tách được** (product/separable, với trạng thái thuần) nếu nó có dạng $u\otimes v$; ngược lại, nó là **rối** (entangled).
:::

### Tích tensor của ma trận

Nếu $A$ tác động lên hệ thứ nhất và $B$ lên hệ thứ hai, thì $A\otimes B$ tác động lên hệ ghép theo quy tắc $(A\otimes B)(u\otimes v) = Au\otimes Bv$. Ma trận của nó là **tích Kronecker**:
$$A\otimes B = \begin{pmatrix}a_{11}B & a_{12}B\\ a_{21}B & a_{22}B\end{pmatrix}.$$

:::example Áp cổng lên một qubit trong hai qubit
Cổng $X$ chỉ lên qubit thứ hai là $I\otimes X$:
$$I\otimes X = \begin{pmatrix}X & 0\\ 0 & X\end{pmatrix} = \begin{pmatrix}0&1&0&0\\1&0&0&0\\0&0&0&1\\0&0&1&0\end{pmatrix}.$$
Nó đổi $|00\rangle \leftrightarrow |01\rangle$ và $|10\rangle\leftrightarrow|11\rangle$ — đúng là lật bit thứ hai.
:::

:::warning
Không phải mọi ma trận trên hệ ghép đều là một tích $A\otimes B$. Cổng CNOT ([[cong-mach]]) là một ví dụ — và chính các cổng “không tách được” như vậy là thứ **tạo ra rối lượng tử**. Cổng dạng $A\otimes B$ (tác động riêng rẽ) không bao giờ biến trạng thái tách được thành trạng thái rối.
:::

## Nền tảng toán học: sự bùng nổ số chiều

Với $n$ hệ, mỗi hệ $d$ chiều, không gian ghép có $d^n$ chiều. Với $n$ qubit: $2^n$.

| Số qubit | Số biên độ phức | Bộ nhớ (16 byte/biên độ) |
|---|---|---|
| 10 | 1 024 | 16 KB |
| 30 | ~$10^9$ | 16 GB |
| 50 | ~$10^{15}$ | 16 PB |
| 300 | ~$10^{90}$ | nhiều hơn số nguyên tử trong vũ trụ |

Trạng thái tách được chỉ cần $2n$ số phức (mỗi qubit hai số). Mọi phần “thừa” của $2^n$ chiều nằm trong các trạng thái rối. Đây là nơi máy tính lượng tử có thể chứa thứ mà máy tính cổ điển không biểu diễn hiệu quả được.

:::physics
Feynman (1982) lập luận rằng chính vì sự bùng nổ này, mô phỏng tự nhiên lượng tử bằng máy tính cổ điển là quá tốn kém — và đề xuất dùng một hệ lượng tử có điều khiển để mô phỏng hệ lượng tử khác. Đó là một trong những ý tưởng khai sinh ngành tính toán lượng tử.
:::

## Ví dụ và bài tập

:::exercise Tính tích tensor
Tính $|{+}\rangle\otimes|0\rangle$ với $|{+}\rangle = \tfrac1{\sqrt2}(1, 1)$, $|0\rangle = (1, 0)$. Viết kết quả theo $|00\rangle, |01\rangle, |10\rangle, |11\rangle$.
???solution
$\tfrac1{\sqrt2}(1\cdot1, 1\cdot 0, 1\cdot 1, 1\cdot 0) = \tfrac1{\sqrt2}(1, 0, 1, 0) = \tfrac1{\sqrt2}(|00\rangle + |10\rangle)$. Đây chính là trạng thái sau cổng Hadamard lên qubit đầu trong mạch tạo trạng thái Bell, ngay trước cổng CNOT.
:::

:::exercise Rối hay không?
Trạng thái nào sau đây là rối? (a) $\tfrac12(|00\rangle + |01\rangle + |10\rangle + |11\rangle)$; (b) $\tfrac12(|00\rangle + |01\rangle + |10\rangle - |11\rangle)$.
???hint
Dùng tiêu chí định thức $c_{00}c_{11} - c_{01}c_{10}$.
???solution
(a) $\tfrac14(1\cdot1 - 1\cdot1) = 0$: tách được, bằng $|{+}\rangle\otimes|{+}\rangle$. (b) $\tfrac14(-1 - 1) = -\tfrac12 \neq 0$: **rối**. Chỉ một dấu trừ khác biệt — rối lượng tử ẩn trong **pha tương đối**, thứ mà phép đo theo cơ sở chuẩn không nhìn thấy (cả hai trạng thái cho cùng xác suất 1/4 cho mỗi kết quả).
:::

:::quiz
Q: Với 3 qubit, trạng thái tổng quát cần bao nhiêu biên độ phức?
- [ ] 6 || Đó là số tham số của một trạng thái *tách được* (2 cho mỗi qubit).
- [ ] 9 || $3^2$ — nhầm giữa số qubit và số chiều.
- [x] 8 || $2^3 = 8$: một biên độ cho mỗi chuỗi bit $000, 001, \dots, 111$.
:::

## Kết nối

- **Nền tảng:** [[ma-tran]], [[vecto]], và ý tưởng phân phối đồng thời ở [[xac-suat]].
- **Tiếp theo:** [[cong-mach]] (cổng nhiều qubit), [[ma-tran-mat-do]] (mô tả một hệ con khi hệ chung bị rối), [[roi-luong-tu]].

## Hiểu lầm thường gặp

:::misconception “$n$ qubit lưu trữ được $2^n$ bit thông tin.”
Không gian có $2^n$ chiều, nhưng **định lý Holevo** nói rằng từ $n$ qubit ta chỉ trích xuất được tối đa $n$ bit thông tin cổ điển. Sức mạnh của tính toán lượng tử không đến từ “lưu nhiều dữ liệu”, mà từ việc thao tác giao thoa trên không gian lớn đó.
:::

:::misconception “Trạng thái rối nghĩa là mỗi qubit có trạng thái riêng nhưng ta chưa biết.”
Đó là mô tả của tương quan *cổ điển*. Với trạng thái rối thuần, không tồn tại phép gán trạng thái thuần nào cho từng qubit khớp với trạng thái chung. Bất đẳng thức Bell ([[roi-luong-tu]]) biến khác biệt này thành một thí nghiệm.
:::

## Góc nhìn nghiên cứu

:::research
- **Mạng tensor** (tensor networks: MPS, PEPS, MERA) là cách biểu diễn nén những trạng thái có “ít rối”, dựa trên định luật diện tích (area law) của entropy rối. Chúng là đối thủ cổ điển mạnh nhất của máy tính lượng tử trong mô phỏng vật liệu và là công cụ để mô phỏng mạch lượng tử cỡ lớn.
- **Cấu trúc tích tensor có phải là nền tảng?** Trong hấp dẫn lượng tử và lý thuyết trường, việc phân chia không gian Hilbert thành “các hệ con” không hiển nhiên. Câu hỏi “điều gì quyết định cách chia hệ thành các phần” là một chủ đề nền tảng đang được nghiên cứu.
:::
