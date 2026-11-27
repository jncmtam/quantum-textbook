:::question
Khi bạn xoay một quả địa cầu, mọi điểm trên bề mặt đều di chuyển — trừ hai điểm: hai cực. Chúng nằm trên trục quay. Có phải mọi phép biến đổi đều có những “phương đặc biệt” như vậy? Và vì sao vật lý lượng tử lại quan tâm tới chúng đến thế?
:::

## Trực giác: ma trận là một hành động

Một ma trận không phải một bảng số để ghi nhớ. Nó là một **hành động** lên không gian: kéo giãn, xoay, phản xạ, trượt, chiếu. Cột thứ nhất của ma trận cho biết vectơ cơ sở thứ nhất đi đâu; cột thứ hai cho biết vectơ cơ sở thứ hai đi đâu. Vì phép biến đổi là *tuyến tính*, biết cơ sở đi đâu là biết mọi vectơ đi đâu.

Với hầu hết vectơ, hành động này làm đổi cả độ dài lẫn hướng. Nhưng thường tồn tại vài phương đặc biệt mà vectơ trên đó **chỉ bị co giãn, không bị xoay**. Đó là các **vectơ riêng** (eigenvector), và hệ số co giãn là **trị riêng** (eigenvalue). Chữ *eigen* trong tiếng Đức nghĩa là “của riêng nó”.

:::sim matrix
Bắt đầu với preset **Đối xứng**. Kéo vectơ $v$ (xanh dương) quanh đường tròn và theo dõi $Av$ (lục lam). Ở hai phương đặc biệt (đường đứt nét xanh lá), $Av$ nằm đúng trên phương của $v$. Rồi thử **Quay 45°**: không phương thực nào sống sót — trị riêng trở thành số phức.
:::

## Vì sao cần đến trị riêng?

Trị riêng xuất hiện ở khắp nơi trong vật lý vì một lý do sâu sắc: **chúng biến một bài toán liên kết thành nhiều bài toán độc lập**.

- Một hệ lò xo nối nhiều vật dao động rất phức tạp — nhưng trong cơ sở các vectơ riêng (các *mode chuẩn*), mỗi mode dao động độc lập với tần số riêng của nó.
- Một vật rắn quay quanh trục bất kỳ thì lắc lư — nhưng quanh ba *trục quán tính chính* (các vectơ riêng của tensor quán tính) thì quay đều.
- Trong cơ học lượng tử: **các giá trị có thể đo được của một đại lượng chính là các trị riêng** của toán tử tương ứng, và trạng thái sau phép đo là vectơ riêng. Câu này là nội dung của cả một chương ([[toan-tu]]) — chương này chuẩn bị công cụ.

## Bản chất

Ma trận $A$ kích thước $m \times n$ biến vectơ $v \in \mathbb{C}^n$ thành $Av \in \mathbb{C}^m$:
$$(Av)_i = \sum_j A_{ij}v_j.$$

Tích ma trận $AB$ là **hợp của hai hành động**: làm $B$ trước, rồi $A$. Vì thứ tự hành động quan trọng (đội mũ rồi mặc áo khác mặc áo rồi đội mũ?), nói chung $AB \neq BA$.

:::example Không giao hoán, ngay trong hai chiều
$$X = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix},\quad Z = \begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix},\quad XZ = \begin{pmatrix}0 & -1\\ 1 & 0\end{pmatrix},\quad ZX = \begin{pmatrix}0 & 1\\ -1 & 0\end{pmatrix}.$$
$XZ = -ZX$. Hai ma trận này (ma trận Pauli) sẽ là hai phép đo spin theo hai trục khác nhau — và chính việc chúng không giao hoán khiến ta không thể biết đồng thời spin theo cả hai trục.
:::

### Các phép toán đi kèm

- **Chuyển vị liên hợp** (adjoint, Hermitian conjugate): $A^\dagger = \bar A^{T}$, tức $(A^\dagger)_{ij} = \overline{A_{ji}}$. Tính chất định nghĩa: $\langle u, Av\rangle = \langle A^\dagger u, v\rangle$.
- **Vết** (trace): $\mathrm{tr}\,A = \sum_i A_{ii}$. Bất biến khi đổi cơ sở, và $\mathrm{tr}(AB) = \mathrm{tr}(BA)$.
- **Định thức**: $\det A$ là hệ số thay đổi “thể tích” (có dấu). $\det A = 0$ khi và chỉ khi $A$ ép không gian xuống số chiều thấp hơn.

## Nền tảng toán học: bài toán trị riêng

:::definition
Số $\lambda$ là **trị riêng** của ma trận vuông $A$ nếu tồn tại vectơ $v \neq 0$ sao cho
$$Av = \lambda v.$$
Khi đó $v$ là một **vectơ riêng** ứng với $\lambda$.
:::

:::derivation Tìm trị riêng: phương trình đặc trưng
Viết lại $Av = \lambda v$ thành $(A - \lambda I)v = 0$, với $I$ là ma trận đơn vị.

---
Ta cần một nghiệm $v \neq 0$. Nếu $A - \lambda I$ khả nghịch, ta có thể nhân hai vế với nghịch đảo và được $v = 0$ — không được. Vậy $A - \lambda I$ phải **không khả nghịch**, tức là ép một phương nào đó về 0:
$$\det(A - \lambda I) = 0.$$

---
Với ma trận $2\times 2$, $A = \begin{pmatrix}a & b\\ c & d\end{pmatrix}$:
$$\det\begin{pmatrix}a - \lambda & b\\ c & d - \lambda\end{pmatrix} = (a-\lambda)(d-\lambda) - bc = \lambda^2 - (a+d)\lambda + (ad - bc) = 0.$$

---
Nhận ra hai đại lượng quen thuộc: $a + d = \mathrm{tr}\,A$ và $ad - bc = \det A$. Vậy
$$\lambda^2 - (\mathrm{tr}\,A)\,\lambda + \det A = 0 \quad\Longrightarrow\quad \lambda_{1,2} = \frac{\mathrm{tr}\,A \pm \sqrt{(\mathrm{tr}\,A)^2 - 4\det A}}{2}.$$
Hệ quả đẹp: $\lambda_1 + \lambda_2 = \mathrm{tr}\,A$ và $\lambda_1\lambda_2 = \det A$ (định lý Viète). Hai bất biến của ma trận được mã hóa hoàn toàn trong các trị riêng.

---
Khi biệt thức âm, trị riêng là cặp số phức liên hợp. Ma trận quay góc $\alpha$ có $\mathrm{tr} = 2\cos\alpha$, $\det = 1$, nên $\lambda = \cos\alpha \pm i\sin\alpha = e^{\pm i\alpha}$. Phép quay trên mặt phẳng thực trở thành phép *nhân với pha* trên mặt phẳng phức — đúng điều [[so-phuc]] đã gợi ý.
:::

### Hai họ ma trận quan trọng nhất

:::definition Ma trận Hermite và ma trận unita
- $H$ là **Hermite** (self-adjoint) nếu $H^\dagger = H$.
- $U$ là **unita** (unitary) nếu $U^\dagger U = I$, tức $U^{-1} = U^\dagger$.
:::

:::theorem Định lý phổ (dạng hữu hạn chiều)
Nếu $H$ là ma trận Hermite thì:
1. mọi trị riêng của $H$ là **số thực**;
2. các vectơ riêng ứng với các trị riêng khác nhau **trực giao** với nhau;
3. tồn tại một **cơ sở trực chuẩn** gồm toàn vectơ riêng của $H$, tức $H = \sum_k \lambda_k\, v_kv_k^\dagger$.
:::

:::derivation Chứng minh hai ý đầu
Giả sử $Hv = \lambda v$ với $\|v\| = 1$. Tính $\langle v, Hv\rangle$ theo hai cách:
$$\langle v, Hv\rangle = \langle v, \lambda v\rangle = \lambda.$$

---
Mặt khác, vì $H^\dagger = H$:
$$\langle v, Hv\rangle = \langle H^\dagger v, v\rangle = \langle Hv, v\rangle = \langle \lambda v, v\rangle = \bar\lambda.$$
(đối số thứ nhất phản tuyến tính nên $\lambda$ bị liên hợp). Vậy $\lambda = \bar\lambda$: **trị riêng là số thực**.

---
Với $Hv = \lambda v$, $Hw = \mu w$, $\lambda \neq \mu$ (đều thực):
$$\mu\langle v, w\rangle = \langle v, Hw\rangle = \langle Hv, w\rangle = \lambda\langle v, w\rangle.$$
Vì $\lambda \neq \mu$, ta phải có $\langle v, w\rangle = 0$: **vectơ riêng trực giao**.
:::

:::physics
Đây là lý do toán học khiến **đại lượng đo được trong cơ học lượng tử được biểu diễn bằng ma trận Hermite**: kết quả đo phải là số thực (trị riêng thực), và các kết quả khác nhau phải phân biệt được hoàn toàn (vectơ riêng trực giao). Còn **ma trận unita** bảo toàn tích trong, $\langle Uu, Uv\rangle = \langle u, v\rangle$, do đó bảo toàn độ dài — tức bảo toàn tổng xác suất. Tiến hóa của hệ lượng tử kín và mọi cổng lượng tử đều là unita. Trị riêng của ma trận unita có mô-đun 1, dạng $e^{i\theta}$.
:::

### Hàm của ma trận

Nhờ định lý phổ, ta định nghĩa được hàm của ma trận Hermite: nếu $H = \sum_k\lambda_k v_kv_k^\dagger$ thì $f(H) = \sum_k f(\lambda_k)\,v_kv_k^\dagger$. Đặc biệt, $U = e^{-iHt}$ là một ma trận unita — đây sẽ là lời giải của phương trình Schrödinger ([[schrodinger]]).

## Ví dụ

:::example Ma trận Pauli X
$X = \begin{pmatrix}0&1\\1&0\end{pmatrix}$: $\mathrm{tr} = 0$, $\det = -1$, nên $\lambda^2 - 1 = 0$, $\lambda = \pm1$. Với $\lambda = 1$: $(X - I)v = 0 \Rightarrow -v_1 + v_2 = 0$, vectơ riêng $\tfrac1{\sqrt2}(1, 1)$. Với $\lambda = -1$: $\tfrac{1}{\sqrt2}(1, -1)$. Chính là cơ sở $f_\pm$ ở chương [[vecto]]. $X$ vừa Hermite vừa unita.
:::

:::exercise Pauli Y
Tìm trị riêng và vectơ riêng của $Y = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}$. Kiểm tra rằng $Y$ là Hermite và các vectơ riêng trực giao.
???hint
$\mathrm{tr}\,Y = 0$, $\det Y = 0 - (-i)(i) = -1$.
???solution
$\lambda = \pm 1$. Với $\lambda = 1$: $-v_1 - iv_2 = 0 \Rightarrow v_2 = iv_1$, vectơ riêng $\tfrac1{\sqrt2}(1, i)$. Với $\lambda = -1$: $\tfrac1{\sqrt2}(1, -i)$. Bài tập ở chương [[vecto]] đã cho thấy hai vectơ này trực giao. $Y^\dagger$: chuyển vị rồi liên hợp, $\begin{pmatrix}0 & \bar i\\ \overline{-i} & 0\end{pmatrix} = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix} = Y$. ✓
:::

:::exercise Hadamard
$H = \tfrac{1}{\sqrt2}\begin{pmatrix}1 & 1\\ 1 & -1\end{pmatrix}$. Chứng minh $H^2 = I$. Suy ra (không cần giải phương trình đặc trưng) rằng trị riêng của $H$ chỉ có thể là $\pm1$.
???solution
$H^2 = \tfrac12\begin{pmatrix}1+1 & 1-1\\ 1-1 & 1+1\end{pmatrix} = I$. Nếu $Hv = \lambda v$ thì $v = H^2 v = \lambda^2 v$, nên $\lambda^2 = 1$. Cách lập luận “từ đẳng thức đại số suy ra trị riêng” này dùng rất nhiều trong tính toán lượng tử (ví dụ toán tử stabilizer ở [[sua-loi]]).
:::

:::quiz
Q: Một ma trận $2\times 2$ thực có $\mathrm{tr}\,A = 0$ và $\det A = 1$. Kết luận nào đúng?
- [ ] Nó có hai vectơ riêng thực || Trị riêng là nghiệm của $\lambda^2 + 1 = 0$, tức $\pm i$ — không thực.
- [x] Nó không giữ nguyên phương thực nào; có trị riêng $\pm i$ || Đây là (một biến dạng của) phép quay 90°.
- [ ] Nó không khả nghịch || $\det A = 1 \neq 0$ nên khả nghịch.
:::

## Kết nối

- **Nền tảng:** [[vecto]] (tích trong, cơ sở trực chuẩn).
- **Tiếp theo:** [[tensor]] ghép ma trận của các hệ con; [[toan-tu]] biến định lý phổ thành tiên đề về phép đo; [[cong-mach]] dùng ma trận unita làm cổng lượng tử.
- **Chuỗi xuyên suốt:** *đại số tuyến tính → không gian Hilbert → trạng thái → qubit → cổng → mạch → thuật toán.* Chương này là mắt xích thứ hai.

## Hiểu lầm thường gặp

:::misconception “Mọi ma trận đều có đủ vectơ riêng để làm cơ sở.”
Ma trận trượt $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ chỉ có một phương riêng. Đó là lý do định lý phổ quý giá: nó *đảm bảo* điều này cho ma trận Hermite (và tổng quát hơn, ma trận chuẩn tắc $AA^\dagger = A^\dagger A$).
:::

:::misconception “Vectơ riêng là duy nhất.”
Nếu $v$ là vectơ riêng thì $cv$ cũng vậy với mọi $c \neq 0$. Trong cơ học lượng tử ta chuẩn hóa $\|v\|= 1$, nhưng vẫn còn tự do nhân với một pha $e^{i\alpha}$ — chính là pha toàn cục không quan sát được.
:::

## Góc nhìn nghiên cứu

:::research
- **Bài toán trị riêng là bài toán số một của mô phỏng lượng tử.** Tìm trị riêng nhỏ nhất (năng lượng trạng thái cơ bản) của một ma trận Hermite cỡ $2^n \times 2^n$ là mục tiêu của VQE ([[bien-phan]]) và của ước lượng pha lượng tử ([[qft-shor]]). Với Hamiltonian cục bộ tổng quát, bài toán này là **QMA-đầy đủ** (Kitaev, 2002) — nên ngay cả máy tính lượng tử cũng không được kỳ vọng giải nhanh mọi trường hợp.
- **Ước lượng pha lượng tử** là phiên bản lượng tử của “tìm trị riêng”: cho một ma trận unita và một vectơ riêng, nó trả về pha $e^{2\pi i\theta}$ với độ chính xác cao. Thuật toán Shor là một ứng dụng của nó.
:::
