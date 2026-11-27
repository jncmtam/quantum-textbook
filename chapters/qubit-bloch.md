:::question
Một bit cổ điển là 0 hoặc 1 — hai điểm. Một qubit có vô số trạng thái. Nếu phải vẽ *tất cả* trạng thái của một qubit lên một hình, hình đó trông như thế nào? Và nếu qubit có vô số trạng thái, tại sao ta không nhét được vô số thông tin vào nó?
:::

## Trực giác

Qubit là bất kỳ hệ lượng tử hai mức nào được ta dùng để xử lý thông tin: spin electron ([[spin]]), phân cực photon, hai mức năng lượng của một ion, hai trạng thái dòng điện của một mạch siêu dẫn. Toán học của chúng là một: vectơ đơn vị trong $\mathbb{C}^2$.

Hình ảnh trung tâm là **quả cầu Bloch**: mỗi trạng thái thuần là một điểm trên mặt cầu đơn vị. Cực bắc là $|0\rangle$, cực nam là $|1\rangle$, xích đạo là các chồng chập “đều” khác nhau bởi pha. Mọi cổng một qubit là một **phép quay** quả cầu. Mọi trạng thái hỗn hợp nằm bên trong ([[ma-tran-mat-do]]).

:::sim bloch {"mode":"state"}
Thử chuỗi H → S → H và đoán xem vectơ dừng ở đâu trước khi bấm. Áp T tám lần liên tiếp: vectơ quay một vòng đầy đủ quanh trục $z$. Đặt $\theta = \pi/2$ rồi đo theo Z và theo X: phép đo Z luôn cho 50/50, còn phép đo X phụ thuộc vào $\varphi$.
:::

## Vì sao là một quả cầu?

:::derivation Từ $\mathbb{C}^2$ tới mặt cầu $S^2$
Trạng thái tổng quát: $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ với $|\alpha|^2 + |\beta|^2 = 1$. Hai số phức là 4 số thực; điều kiện chuẩn hóa bớt 1, còn 3.

---
Pha toàn cục không có ý nghĩa vật lý ([[trang-thai]]), nên ta có thể nhân với một pha để $\alpha$ là số thực không âm. Bớt thêm 1 tham số, còn **2 tham số thực** — đúng số chiều của một mặt cầu.

---
Đặt $\alpha = \cos\tfrac\theta2$, $\beta = e^{i\varphi}\sin\tfrac\theta2$ với $\theta \in [0, \pi]$, $\varphi \in [0, 2\pi)$:
$$|\psi\rangle = \cos\tfrac\theta2|0\rangle + e^{i\varphi}\sin\tfrac{\theta}{2}|1\rangle.$$
Đây chính là tọa độ cầu: $\theta$ là góc cực (từ cực bắc), $\varphi$ là góc phương vị.

---
Ở [[toan-tu]] ta đã tính $(\langle X\rangle, \langle Y\rangle, \langle Z\rangle) = (\sin\theta\cos\varphi, \sin\theta\sin\varphi, \cos\theta)$. Vậy điểm trên quả cầu chính là **vectơ các giá trị kỳ vọng Pauli** — có ý nghĩa vật lý trực tiếp: đo theo trục nào thì hình chiếu lên trục đó cho biết độ lệch xác suất.
:::

:::warning Vì sao có $\theta/2$?
$|0\rangle$ và $|1\rangle$ trực giao trong $\mathbb{C}^2$ (góc 90° theo nghĩa Hilbert) nhưng là hai cực đối diện (180°) trên quả cầu. **Các trạng thái trực giao luôn là hai điểm đối xuyên tâm** trên quả cầu Bloch. Góc trên quả cầu gấp đôi “góc” trong không gian Hilbert.
:::

### Sáu điểm đáng nhớ

| Trạng thái | Biểu thức | Vị trí | Là vectơ riêng của |
|---|---|---|---|
| $|0\rangle$ | — | cực bắc $+z$ | $Z$, trị riêng $+1$ |
| $|1\rangle$ | — | cực nam $-z$ | $Z$, trị riêng $-1$ |
| $|{+}\rangle$ | $\tfrac{1}{\sqrt2}(|0\rangle + |1\rangle)$ | $+x$ | $X$, $+1$ |
| $|{-}\rangle$ | $\tfrac{1}{\sqrt2}(|0\rangle - |1\rangle)$ | $-x$ | $X$, $-1$ |
| $|{+i}\rangle$ | $\tfrac{1}{\sqrt2}(|0\rangle + i|1\rangle)$ | $+y$ | $Y$, $+1$ |
| $|{-i}\rangle$ | $\tfrac{1}{\sqrt2}(|0\rangle - i|1\rangle)$ | $-y$ | $Y$, $-1$ |

## Cổng một qubit là phép quay

:::theorem
Mọi ma trận unita $2\times2$ đều có dạng $U = e^{i\gamma}R_{\vec n}(\alpha)$, trong đó
$$R_{\vec n}(\alpha) = e^{-i\alpha\,\vec n\cdot\vec\sigma/2} = \cos\tfrac\alpha2\,I - i\sin\tfrac\alpha2\,(\vec n\cdot\vec\sigma)$$
là phép quay quả cầu Bloch một góc $\alpha$ quanh trục $\vec n$.
:::

| Cổng | Ma trận | Phép quay |
|---|---|---|
| $X$ | $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ | $\pi$ quanh $x$ (NOT lượng tử) |
| $Y$ | $\begin{pmatrix}0&-i\\i&0\end{pmatrix}$ | $\pi$ quanh $y$ |
| $Z$ | $\begin{pmatrix}1&0\\0&-1\end{pmatrix}$ | $\pi$ quanh $z$ (lật pha) |
| $H$ | $\tfrac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ | $\pi$ quanh $(x+z)/\sqrt2$ |
| $S$ | $\begin{pmatrix}1&0\\0&i\end{pmatrix}$ | $\pi/2$ quanh $z$ |
| $T$ | $\begin{pmatrix}1&0\\0&e^{i\pi/4}\end{pmatrix}$ | $\pi/4$ quanh $z$ |

:::example Hadamard đổi trục $x$ và $z$
$H$ quay $180°$ quanh đường chéo giữa $x$ và $z$, nên đổi chỗ hai trục này: $H|0\rangle = |{+}\rangle$, $H|{+}\rangle = |0\rangle$, và trục $y$ bị lật ngược. Hệ quả đại số: $HZH = X$, $HXH = Z$, $HYH = -Y$. Trong thuật toán, $H$ là “cửa” đi vào và đi ra khỏi chồng chập.
:::

## Ý nghĩa vật lý và giới hạn thông tin

:::physics
Qubit có vô số trạng thái, nhưng mỗi lần đo chỉ cho **một bit**. Để biết $(\theta, \varphi)$ với độ chính xác $\varepsilon$, cần cỡ $1/\varepsilon^2$ bản sao giống hệt nhau ([[xac-suat]]). Và định lý Holevo khẳng định: dù mã hóa khéo đến đâu, một qubit truyền được tối đa **1 bit** thông tin cổ điển (hoặc 2 bit nếu đã chia sẻ rối trước — mã hóa siêu đặc, [[dich-chuyen]]). Sự phong phú của không gian trạng thái là tài nguyên cho *xử lý*, không phải cho *lưu trữ*.
:::

## Bài tập

:::exercise Định vị trên quả cầu
Xác định vị trí trên quả cầu Bloch của $|\psi\rangle = \tfrac{\sqrt3}{2}|0\rangle + \tfrac{i}{2}|1\rangle$.
???solution
$\cos\tfrac\theta2 = \tfrac{\sqrt3}2 \Rightarrow \theta = \tfrac\pi3$; $e^{i\varphi} = i \Rightarrow \varphi = \tfrac\pi2$. Vectơ Bloch: $(\sin\tfrac\pi3\cos\tfrac\pi2, \sin\tfrac\pi3\sin\tfrac\pi2, \cos\tfrac\pi3) = (0, \tfrac{\sqrt3}2, \tfrac12)$: nằm trong mặt phẳng $y$–$z$, cách cực bắc $60°$ và nghiêng về phía $+y$.
:::

:::exercise HZH
Chứng minh $HZH = X$ bằng nhân ma trận, rồi giải thích bằng hình học trên quả cầu Bloch.
???solution
$ZH = \tfrac1{\sqrt2}\begin{pmatrix}1&1\\-1&1\end{pmatrix}$, $H(ZH) = \tfrac12\begin{pmatrix}0&2\\2&0\end{pmatrix} = X$. Hình học: $H$ đưa trục $x$ về trục $z$; quay $\pi$ quanh $z$; $H$ đưa trục $z$ trở lại trục $x$. Kết quả: quay $\pi$ quanh $x$ — chính là $X$. Mẫu “$V\,A\,V^\dagger$” (đổi cơ sở, làm thao tác, đổi lại) xuất hiện liên tục trong thiết kế mạch.
:::

:::quiz
Q: Trạng thái $|{-}\rangle$ sau khi áp $S$ sẽ ở đâu trên quả cầu?
- [ ] $+x$ || $S$ là quay $+90°$ quanh $z$, không phải $180°$.
- [x] $-y$ || Từ $-x$ quay $+90°$ quanh $z$ (ngược chiều kim đồng hồ nhìn từ trên xuống): $-x \to -y$. Kiểm tra: $S|{-}\rangle = \tfrac1{\sqrt2}(|0\rangle - i|1\rangle) = |{-i}\rangle$.
- [ ] $+y$ || Đó là ảnh của $|{+}\rangle$, không phải $|{-}\rangle$.
:::

## Kết nối

- **Nền tảng:** [[spin]], [[phep-do]], [[ma-tran-mat-do]] (quả cầu đặc).
- **Tiếp theo:** [[cong-mach]] — ghép nhiều qubit, cổng hai qubit; [[bb84]] — mã hóa thông tin vào hai cơ sở “liên hợp” $Z$ và $X$.

## Hiểu lầm thường gặp

:::misconception “Qubit là 0 và 1 cùng lúc, nên máy tính lượng tử thử mọi đáp án song song.”
Nếu chỉ chồng chập rồi đo, ta nhận một đáp án ngẫu nhiên — không hơn tung đồng xu. Sức mạnh đến từ **giao thoa** được thiết kế để làm đáp án sai triệt tiêu ([[deutsch-jozsa]], [[grover]]).
:::

:::misconception “Quả cầu Bloch dùng được cho nhiều qubit.”
Nó chỉ mô tả *một* qubit. Trạng thái $n$ qubit cần $2^{n+1} - 2$ tham số thực; ngay cả hai qubit cũng không vẽ được bằng hai quả cầu (trạng thái rối làm cả hai vectơ Bloch co về tâm).
:::

## Góc nhìn nghiên cứu

:::research
- Các thông số chất lượng của qubit vật lý: thời gian kết hợp $T_1, T_2$; độ trung thực cổng một qubit (tốt nhất đã vượt 99,99% trên ion bẫy) và hai qubit (khoảng 99,5–99,9% trên các nền tảng hàng đầu); độ trung thực đọc.
- **Qudit** — hệ $d$ mức thay cho 2 mức — có thể giảm số phần tử vật lý và đơn giản hóa một số mạch; nhiều nhóm đang khảo sát qudit trên ion, photon và mạch siêu dẫn.
:::
