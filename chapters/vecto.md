:::question
Nếu tôi nói “trạng thái của hệ là một mũi tên”, bạn sẽ hỏi: mũi tên trong không gian nào? Đo góc giữa hai mũi tên bằng cách nào? Và vì sao những câu hỏi hình học như vậy lại quyết định *xác suất* của một thí nghiệm?
:::

## Trực giác: mũi tên, công thức nấu ăn và các thứ cộng được với nhau

Hãy nghĩ về một công thức sinh tố: 2 phần chuối, 1 phần xoài, 3 phần sữa. Bạn có thể viết nó là bộ số $(2, 1, 3)$. Gấp đôi công thức là $(4, 2, 6)$; trộn hai công thức là cộng từng thành phần. Không ai bắt bộ số ấy phải là “mũi tên trong không gian” — nhưng nó tuân theo đúng những quy tắc của mũi tên: **cộng được với nhau** và **nhân được với một con số**.

Đó là ý tưởng cốt lõi của *không gian vectơ*: bất cứ thứ gì có thể cộng và co giãn một cách nhất quán đều là vectơ. Mũi tên, bộ số, đa thức, hàm số, tín hiệu âm thanh — và, như ta sẽ thấy, **trạng thái lượng tử**.

## Vì sao cần đến khái niệm trừu tượng này?

Vật lý cổ điển chỉ cần vectơ ba chiều: vị trí, vận tốc, lực. Nhưng tới đầu thế kỷ XX, hai thứ buộc toán học phải tổng quát hóa:

- **Sóng và hàm số.** Sóng trên dây đàn là tổng của các họa âm $\sin(n\pi x/L)$. Nghĩa là một *hàm* được phân tích thành tổ hợp của các hàm cơ bản — giống hệt một vectơ được phân tích theo các trục tọa độ. Fourier đã làm vậy từ 1807, nhưng khung hình học cho nó (Hilbert, đầu thế kỷ XX) là không gian vectơ vô hạn chiều.
- **Nguyên lý chồng chập.** Thí nghiệm cho thấy nếu một hệ lượng tử có thể ở trạng thái $A$ và ở trạng thái $B$, thì nó cũng có thể ở những “tổ hợp” của $A$ và $B$ — và các tổ hợp ấy giao thoa. “Tổ hợp tuyến tính” chính là ngôn ngữ của không gian vectơ.

## Bản chất

:::definition Không gian vectơ
Một **không gian vectơ** trên trường số $\mathbb{F}$ ($\mathbb{R}$ hoặc $\mathbb{C}$) là một tập $V$ có phép cộng $u + v$ và phép nhân với số $c\,v$, thỏa các quy tắc quen thuộc: cộng giao hoán và kết hợp, có vectơ không $0$, mỗi vectơ có vectơ đối, và phép nhân với số phân phối với phép cộng.
:::

Một số khái niệm chủ chốt:

- **Tổ hợp tuyến tính**: $c_1v_1 + c_2v_2 + \dots + c_nv_n$.
- **Độc lập tuyến tính**: không vectơ nào trong họ là tổ hợp của các vectơ còn lại.
- **Cơ sở** (basis): một họ độc lập tuyến tính mà mọi vectơ đều là tổ hợp của nó — theo **đúng một cách duy nhất**. Các hệ số của tổ hợp ấy là **tọa độ** của vectơ trong cơ sở đó.
- **Số chiều**: số vectơ trong một cơ sở (không phụ thuộc vào cơ sở được chọn).

:::intuition
Cơ sở giống như một hệ quy chiếu, một “ngôn ngữ” để mô tả vectơ. Vectơ là thứ có thật; tọa độ chỉ là cách ta *gọi tên* nó trong một ngôn ngữ cụ thể. Đổi cơ sở là dịch sang ngôn ngữ khác — vectơ không thay đổi. Trong cơ học lượng tử, *chọn phép đo* về bản chất là *chọn cơ sở*.
:::

## Nền tảng toán học: tích trong

Không gian vectơ chỉ cho phép cộng và co giãn. Để nói về **độ dài** và **góc**, ta cần thêm một cấu trúc: tích trong.

### Trong không gian thực

Với $u, v \in \mathbb{R}^n$:
$$\langle u, v\rangle = u_1v_1 + u_2v_2 + \dots + u_nv_n.$$

Hình học: $\langle u, v\rangle = \|u\|\,\|v\|\cos\theta$, trong đó $\|u\| = \sqrt{\langle u, u\rangle}$ và $\theta$ là góc giữa hai vectơ. Đặc biệt $\langle u, v\rangle = 0$ nghĩa là hai vectơ **trực giao** (vuông góc).

:::sim inner
Kéo hai vectơ. Khi chúng là vectơ đơn vị, $\cos^2\theta$ đo “phần của $v$ nằm theo phương $u$”. Hãy nhớ con số này — ở [[phep-do]] nó sẽ trở thành một xác suất.
:::

### Vì sao tích trong phức phải có liên hợp?

:::derivation Xây dựng tích trong cho $\mathbb{C}^n$
Ta muốn độ dài bình phương $\langle v, v\rangle$ luôn là **số thực không âm**, và bằng 0 chỉ khi $v = 0$. Thử “bê nguyên” công thức thực sang: với $v = (i) \in \mathbb{C}^1$, ta được $v_1v_1 = i^2 = -1 < 0$. Một vectơ có “độ dài bình phương” âm — vô nghĩa.

---
Nhớ lại từ [[so-phuc]]: $\bar z z = |z|^2 \ge 0$. Vậy ta liên hợp thành phần thứ nhất:
$$\langle u, v\rangle = \bar u_1v_1 + \bar u_2v_2 + \dots + \bar u_nv_n = \sum_k \bar u_k v_k.$$

---
Kiểm tra: $\langle v, v\rangle = \sum_k |v_k|^2 \ge 0$, bằng 0 khi và chỉ khi mọi $v_k = 0$. ✓

---
Cái giá phải trả: tích trong không còn đối xứng, mà **đối xứng liên hợp**:
$$\langle u, v\rangle = \overline{\langle v, u\rangle}.$$
Nó tuyến tính theo đối số thứ hai, $\langle u, cv\rangle = c\langle u, v\rangle$, nhưng *phản tuyến tính* theo đối số thứ nhất, $\langle cu, v\rangle = \bar c\,\langle u, v\rangle$. (Quy ước này là của vật lý; nhiều sách toán làm ngược lại.)
:::

### Các tính chất phải thuộc

1. **Bất đẳng thức Cauchy–Schwarz:** $|\langle u, v\rangle| \le \|u\|\,\|v\|$. Dấu bằng khi và chỉ khi $u, v$ cùng phương.
2. **Cơ sở trực chuẩn** (orthonormal basis) $\{e_k\}$: $\langle e_j, e_k\rangle = \delta_{jk}$ (bằng 1 nếu $j = k$, bằng 0 nếu khác).
3. **Tọa độ là tích trong:** trong cơ sở trực chuẩn, $v = \sum_k c_k e_k$ với $c_k = \langle e_k, v\rangle$.
4. **Định lý Pythagoras / Parseval:** $\|v\|^2 = \sum_k |c_k|^2$.

:::derivation Chứng minh tính chất 3 và 4
Giả sử $v = \sum_k c_k e_k$. Lấy tích trong với $e_j$ và dùng tính tuyến tính theo đối số thứ hai:
$$\langle e_j, v\rangle = \sum_k c_k\langle e_j, e_k\rangle = \sum_k c_k\,\delta_{jk} = c_j.$$

---
Với độ dài:
$$\|v\|^2 = \Big\langle \sum_j c_je_j,\ \sum_k c_ke_k\Big\rangle = \sum_{j,k}\bar c_j c_k\,\delta_{jk} = \sum_k |c_k|^2.$$
Lưu ý $\bar c_j$ xuất hiện vì đối số thứ nhất là phản tuyến tính.
:::

:::physics
Tính chất 4 sẽ trở thành **tổng xác suất bằng 1**. Nếu một trạng thái lượng tử là vectơ đơn vị $\|\psi\| = 1$ và ta khai triển nó theo một cơ sở trực chuẩn, thì các số $|c_k|^2$ là các số không âm có tổng bằng 1 — đúng là một phân phối xác suất. Đây không phải trùng hợp: quy tắc Born ([[phep-do]]) được xây dựng chính xác để tận dụng điều này.
:::

### Phép chiếu

Hình chiếu của $v$ lên phương của vectơ đơn vị $e$ là $\langle e, v\rangle\,e$. Phần còn lại, $v - \langle e, v\rangle e$, trực giao với $e$. Quy trình **Gram–Schmidt** dùng phép chiếu lặp đi lặp lại để biến một cơ sở bất kỳ thành cơ sở trực chuẩn.

### Một cái nhìn trước về không gian Hilbert

Một **không gian Hilbert** là một không gian vectơ phức có tích trong và “đủ” (mọi dãy Cauchy hội tụ). Trong hữu hạn chiều, điều kiện đầy đủ là tự động: $\mathbb{C}^n$ với tích trong ở trên *là* một không gian Hilbert. Toàn bộ tính toán lượng tử sống trong $\mathbb{C}^{2^n}$, nên trong phần lớn cuốn sách, “không gian Hilbert” chỉ đơn giản là $\mathbb{C}^d$. Tinh tế vô hạn chiều (hàm sóng của hạt tự do) được nhắc tới ở [[schrodinger]].

## Ví dụ

:::example Hai cơ sở của $\mathbb{C}^2$
Cơ sở chuẩn: $e_0 = (1, 0)$, $e_1 = (0, 1)$. Một cơ sở trực chuẩn khác:
$$f_+ = \tfrac{1}{\sqrt 2}(1, 1), \qquad f_- = \tfrac{1}{\sqrt2}(1, -1).$$
Kiểm tra: $\langle f_+, f_-\rangle = \tfrac12(1 - 1) = 0$, và $\|f_\pm\| = 1$. Vectơ $e_0$ viết trong cơ sở mới: $c_\pm = \langle f_\pm, e_0\rangle = \tfrac1{\sqrt2}$, nên $e_0 = \tfrac1{\sqrt2}(f_+ + f_-)$. Ở [[qubit-bloch]], $e_0, e_1$ sẽ là $|0\rangle, |1\rangle$ và $f_\pm$ sẽ là $|{+}\rangle, |{-}\rangle$.
:::

:::exercise Tích trong phức
Cho $u = \tfrac{1}{\sqrt2}(1, i)$ và $v = \tfrac{1}{\sqrt2}(1, -i)$. Tính $\langle u, v\rangle$, $\langle u, u\rangle$. Hai vectơ này có trực giao không?
???hint
Nhớ liên hợp các thành phần của $u$: $\bar u = \tfrac1{\sqrt2}(1, -i)$.
???solution
$\langle u, v\rangle = \tfrac12(\bar 1\cdot 1 + \bar i\cdot(-i)) = \tfrac12(1 + (-i)(-i)) = \tfrac12(1 - 1) = 0$. Trực giao.
$\langle u, u\rangle = \tfrac12(1 + (-i)(i)) = \tfrac12(1 + 1) = 1$.
Nếu quên liên hợp, bạn sẽ được $\tfrac12(1 + i\cdot i) = 0$ cho $\langle u,u\rangle$ — một vectơ khác không có “độ dài 0”. Đó là lý do phải có liên hợp. Hai vectơ này về sau sẽ là $|{+i}\rangle$ và $|{-i}\rangle$.
:::

:::exercise Gram–Schmidt
Trực chuẩn hóa $a = (1, 1, 0)$, $b = (1, 0, 1)$ trong $\mathbb{R}^3$.
???solution
$e_1 = a/\|a\| = \tfrac1{\sqrt2}(1,1,0)$. Trừ hình chiếu: $b - \langle e_1, b\rangle e_1 = (1,0,1) - \tfrac{1}{\sqrt2}\cdot\tfrac1{\sqrt2}(1,1,0) = (\tfrac12, -\tfrac12, 1)$. Chuẩn hóa: độ dài $\sqrt{3/2}$, nên $e_2 = \tfrac{1}{\sqrt6}(1, -1, 2)$. Kiểm tra $\langle e_1, e_2\rangle = \tfrac{1}{\sqrt{12}}(1 - 1 + 0) = 0$. ✓
:::

:::quiz
Q: Trong cơ sở trực chuẩn $\{e_k\}$, vectơ đơn vị $v$ có tọa độ $c_k$. Đẳng thức nào **luôn** đúng?
- [ ] $\sum_k c_k = 1$ || Tọa độ có thể âm hoặc phức; tổng của chúng không có ý nghĩa đặc biệt.
- [x] $\sum_k |c_k|^2 = 1$ || Đây là định lý Pythagoras cho vectơ đơn vị — sau này là “tổng xác suất bằng 1”.
- [ ] $\sum_k c_k^2 = 1$ || Thiếu dấu trị tuyệt đối: với tọa độ phức, $c_k^2$ có thể không phải số thực.
:::

## Kết nối

- **Nền tảng:** [[so-phuc]] — liên hợp phức là lý do tích trong có dạng $\sum\bar u_kv_k$.
- **Tiếp theo:** [[ma-tran]] nghiên cứu các *phép biến đổi* trên không gian vectơ; [[trang-thai]] đưa ký hiệu Dirac $\langle u|v\rangle$ — chính là tích trong của chương này, viết theo kiểu của vật lý.
- **Xa hơn:** biến đổi Fourier là một *phép đổi cơ sở* trong không gian hàm; biến đổi Fourier lượng tử ([[qft-shor]]) là phép đổi cơ sở trong $\mathbb{C}^{2^n}$.

## Hiểu lầm thường gặp

:::misconception “Vectơ là một danh sách các con số.”
Danh sách số là *tọa độ* của vectơ *trong một cơ sở*. Cùng một vectơ có những danh sách tọa độ khác nhau trong các cơ sở khác nhau. Trạng thái lượng tử $|{+}\rangle$ có tọa độ $(\tfrac1{\sqrt2}, \tfrac1{\sqrt2})$ trong cơ sở $\{|0\rangle, |1\rangle\}$ nhưng là $(1, 0)$ trong cơ sở $\{|{+}\rangle, |{-}\rangle\}$.
:::

:::misconception “Trực giao nghĩa là vuông góc trong không gian thật.”
Hai trạng thái spin $|{\uparrow}\rangle$ và $|{\downarrow}\rangle$ trực giao trong không gian Hilbert, nhưng các hướng vật lý của chúng trong không gian thực là *ngược chiều* (180°), không phải vuông góc. Hình học của không gian Hilbert không phải hình học của không gian ta sống.
:::

## Góc nhìn nghiên cứu

:::research
- Số chiều của không gian Hilbert tăng **theo hàm mũ** với số qubit: $n$ qubit cần $\mathbb{C}^{2^n}$. Với $n = 300$, số chiều vượt số nguyên tử trong vũ trụ quan sát được. Đây vừa là nguồn sức mạnh tiềm năng của máy tính lượng tử, vừa là lý do mô phỏng cổ điển thất bại.
- Nhưng “không gian lớn” chưa đủ: hầu hết các vectơ trong không gian ấy là không thể chuẩn bị được bằng mạch có kích thước đa thức. Hiểu được *phần nhỏ* của không gian Hilbert mà tự nhiên và thuật toán thực sự dùng tới (trạng thái ít rối, mạng tensor, trạng thái stabilizer) là một chủ đề nghiên cứu lớn.
:::
