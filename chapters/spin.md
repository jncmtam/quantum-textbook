:::question
Năm 1922, Stern và Gerlach bắn một chùm nguyên tử bạc qua một từ trường không đều. Họ chờ đợi một vệt nhòe liên tục trên màn. Họ thấy hai vết tách biệt. Không có gì ở giữa. Một tính chất của nguyên tử chỉ nhận hai giá trị — đó là gì?
:::

## Trực giác: một mũi tên chỉ có thể trả lời “lên” hoặc “xuống”

Nếu nguyên tử bạc là một nam châm nhỏ hướng ngẫu nhiên, lực từ trong trường không đều sẽ đẩy lệch nó một lượng tỉ lệ với hình chiếu của mô-men từ lên trục trường — mọi giá trị từ $-\mu$ đến $+\mu$. Kết quả phải là một vệt liên tục.

Thay vào đó, mỗi nguyên tử đi lên hoặc đi xuống. Như thể mỗi khi hỏi “mũi tên của bạn hướng bao nhiêu theo trục $z$?”, nguyên tử chỉ có thể trả lời “$+\hbar/2$” hoặc “$-\hbar/2$”. Và điều kỳ lạ nhất: **trục nào cũng vậy**. Xoay nam châm đi bất kỳ góc nào, vẫn chỉ có hai vết.

Tính chất này — sau được Uhlenbeck và Goudsmit (1925) gọi là **spin** — là hệ hai mức đơn giản nhất của tự nhiên, và là nguyên mẫu của qubit.

## Vì sao cần một khái niệm mới?

Bạc có một electron lớp ngoài cùng với mô-men động lượng quỹ đạo bằng 0. Sự tách làm hai phải đến từ một mô-men động lượng **nội tại** của electron, không gắn với chuyển động quỹ đạo nào. Hơn nữa, cơ học lượng tử của mô-men động lượng quỹ đạo chỉ cho số giá trị *lẻ* ($2\ell + 1$: 1, 3, 5...). Hai giá trị nghĩa là “$\ell = 1/2$” — một thứ không thể là sự quay của bất kỳ vật gì trong không gian.

## Bản chất

Spin $\tfrac12$ được mô tả trong $\mathbb{C}^2$ với cơ sở $|{\uparrow}\rangle = |0\rangle$, $|{\downarrow}\rangle = |1\rangle$ (spin lên/xuống theo $z$). Toán tử spin theo các trục:
$$S_x = \frac\hbar2\sigma_x,\qquad S_y = \frac\hbar2\sigma_y,\qquad S_z = \frac\hbar2\sigma_z.$$
Spin theo một trục bất kỳ có vectơ đơn vị $\vec n = (n_x, n_y, n_z)$:
$$S_{\vec n} = \frac\hbar2\,\vec n\cdot\vec\sigma = \frac\hbar2(n_x\sigma_x + n_y\sigma_y + n_z\sigma_z).$$

:::derivation Mọi trục đều cho đúng hai kết quả $\pm\hbar/2$
Ta có $\vec n\cdot\vec\sigma = \begin{pmatrix}n_z & n_x - in_y\\ n_x + in_y & -n_z\end{pmatrix}$, Hermite, vết bằng 0.

---
Định thức: $-n_z^2 - (n_x^2 + n_y^2) = -1$. Theo [[ma-tran]], trị riêng thỏa $\lambda^2 - 0\cdot\lambda - 1 = 0$, nên $\lambda = \pm1$.

---
Vậy với **mọi** hướng $\vec n$, $S_{\vec n}$ có đúng hai trị riêng $\pm\hbar/2$ — giải thích vì sao xoay nam châm Stern–Gerlach theo hướng nào cũng chỉ thấy hai vết. Vectơ riêng với trị riêng $+1$, viết $\vec n = (\sin\theta\cos\varphi, \sin\theta\sin\varphi, \cos\theta)$:
$$|{\uparrow_{\vec n}}\rangle = \cos\tfrac\theta2|0\rangle + e^{i\varphi}\sin\tfrac\theta2|1\rangle.$$
(Kiểm tra bằng cách nhân trực tiếp.) Mỗi trạng thái của spin là “spin lên” theo một hướng nào đó trong không gian — đây chính là quả cầu Bloch.
:::

### Đại số Pauli

Các ma trận Pauli thỏa những hệ thức cần thuộc lòng:
$$\sigma_x^2 = \sigma_y^2 = \sigma_z^2 = I,\qquad \sigma_x\sigma_y = i\sigma_z,\quad \sigma_y\sigma_z = i\sigma_x,\quad \sigma_z\sigma_x = i\sigma_y,$$
$$[\sigma_j, \sigma_k] = 2i\varepsilon_{jkl}\sigma_l,\qquad \{\sigma_j, \sigma_k\} = 2\delta_{jk}I.$$
Cùng với $I$, chúng tạo thành một cơ sở của mọi ma trận $2\times2$: mọi ma trận Hermite $2\times 2$ đều viết được là $a_0I + \vec a\cdot\vec\sigma$ với các hệ số thực.

### Spin trong từ trường: tuế sai Larmor

Một spin trong từ trường $\vec B = B\hat z$ có Hamiltonian $H = -\vec\mu\cdot\vec B = \tfrac{\hbar\omega_0}{2}\sigma_z$ (với $\omega_0 = \gamma B$, $\gamma$ là tỉ số từ hồi chuyển).

:::derivation Spin quay quanh từ trường
$U(t) = e^{-i\omega_0t\sigma_z/2} = \mathrm{diag}(e^{-i\omega_0t/2},\ e^{i\omega_0t/2})$. Áp lên $|{\uparrow_{\vec n}}\rangle$:
$$\cos\tfrac\theta2 e^{-i\omega_0t/2}|0\rangle + e^{i\varphi}\sin\tfrac\theta2e^{i\omega_0t/2}|1\rangle = e^{-i\omega_0t/2}\Big(\cos\tfrac\theta2|0\rangle + e^{i(\varphi + \omega_0t)}\sin\tfrac\theta2|1\rangle\Big).$$

---
Bỏ pha toàn cục: trạng thái vẫn là “spin lên” nhưng theo hướng có góc $\theta$ không đổi và $\varphi \to \varphi + \omega_0t$. Hướng spin **quay quanh trục $z$** với tần số $\omega_0$ — **tuế sai Larmor**, giống con quay quanh trục trọng lực.
:::

:::physics
Đây là nguyên lý của **cộng hưởng từ hạt nhân** (NMR) và chụp cộng hưởng từ (MRI): các spin hạt nhân hydro trong cơ thể tuế sai với tần số Larmor (~64 MHz ở 1,5 tesla). Một xung sóng vô tuyến đúng tần số làm lật spin (dao động Rabi, xem [[schrodinger]]); tín hiệu khi spin hồi phục mang thông tin về mô. Các thời gian hồi phục $T_1$, $T_2$ ở đây chính là các thời gian mất kết hợp mà ta sẽ gặp ở [[ma-tran-mat-do]]. NMR cũng là nền tảng của một trong những thí nghiệm tính toán lượng tử đầu tiên (thuật toán Shor phân tích 15, năm 2001).
:::

## Bài tập

:::exercise Stern–Gerlach nối tiếp
Một chùm spin đi qua thiết bị SG theo $z$, ta chỉ giữ chùm “lên”. Chùm này đi qua thiết bị SG theo $x$, ta chỉ giữ chùm “lên theo $x$”. Cuối cùng, nó đi qua thiết bị SG theo $z$ lần nữa. Tỉ lệ nguyên tử đi ra “xuống theo $z$” ở thiết bị cuối là bao nhiêu (so với chùm sau thiết bị đầu)?
???solution
Sau thiết bị 1: $|0\rangle$. Thiết bị 2 giữ $|{+}\rangle$ với xác suất $|\langle{+}|0\rangle|^2 = \tfrac12$. Thiết bị 3: $|\langle1|{+}\rangle|^2 = \tfrac12$. Tổng: $\tfrac14$. Dù đã lọc chỉ giữ “lên theo $z$” ở bước đầu, “xuống theo $z$” lại xuất hiện — phép đo theo $x$ đã xóa thông tin về $z$. Đây là phiên bản spin của thí nghiệm ba bộ lọc phân cực ([[phep-do]]).
:::

:::exercise Kiểm tra vectơ riêng
Chứng minh trực tiếp rằng $|{\uparrow_{\vec n}}\rangle = \cos\tfrac\theta2|0\rangle + e^{i\varphi}\sin\tfrac\theta2|1\rangle$ là vectơ riêng của $\vec n\cdot\vec\sigma$ với trị riêng $+1$.
???hint
Thành phần thứ nhất của $(\vec n\cdot\vec\sigma)|{\uparrow_{\vec n}}\rangle$ là $\cos\theta\cos\tfrac\theta2 + \sin\theta e^{-i\varphi}e^{i\varphi}\sin\tfrac\theta2$. Dùng công thức góc nhân đôi.
???solution
Thành phần 1: $\cos\theta\cos\tfrac\theta2 + \sin\theta\sin\tfrac\theta2 = \cos(\theta - \tfrac\theta2) = \cos\tfrac\theta2$. ✓ Thành phần 2: $\sin\theta e^{i\varphi}\cos\tfrac\theta2 - \cos\theta e^{i\varphi}\sin\tfrac\theta2 = e^{i\varphi}\sin(\theta - \tfrac\theta2) = e^{i\varphi}\sin\tfrac\theta2$. ✓
:::

:::quiz
Q: Xoay một spin $\tfrac12$ đúng 360° (một vòng đầy đủ quanh trục $z$, $U = e^{-i2\pi\sigma_z/2}$). Vectơ trạng thái trở thành gì?
- [ ] Đúng như ban đầu || $e^{-i\pi\sigma_z} = \mathrm{diag}(e^{-i\pi}, e^{i\pi}) = -I$.
- [x] Âm của trạng thái ban đầu || Spinor đổi dấu sau 360° và cần quay 720° để trở về chính nó. Dấu này là pha toàn cục — nhưng nó đã được đo bằng giao thoa neutron (1975) khi chỉ quay *một nhánh* của giao thoa kế.
- [ ] Trạng thái trực giao || $-|\psi\rangle$ cùng phương với $|\psi\rangle$.
:::

## Kết nối

- **Nền tảng:** [[toan-tu]] (Pauli, giao hoán tử), [[schrodinger]] (tiến hóa).
- **Tiếp theo:** [[qubit-bloch]] — spin chính là qubit, và quả cầu của các hướng spin là quả cầu Bloch; [[ma-tran-mat-do]] — spin bị nhiễu; [[roi-luong-tu]] — hai spin rối, phiên bản của Bohm cho nghịch lý EPR.

## Hiểu lầm thường gặp

:::misconception “Spin là electron tự quay quanh trục của nó.”
Nếu electron là một quả cầu tích điện tự quay để tạo ra mô-men từ quan sát được, điểm trên bề mặt của nó phải chuyển động nhanh hơn ánh sáng (với mọi bán kính hợp lý). Spin là một mô-men động lượng nội tại, không có hình ảnh cổ điển; nó xuất hiện tự nhiên từ phương trình Dirac (kết hợp cơ học lượng tử và thuyết tương đối hẹp).
:::

:::misconception “$|{\uparrow}\rangle$ và $|{\downarrow}\rangle$ vuông góc nên trên quả cầu Bloch chúng cách nhau 90°.”
Chúng trực giao trong $\mathbb{C}^2$ nhưng là hai cực đối diện (180°) trên quả cầu Bloch. Góc trên quả cầu gấp đôi góc trong không gian Hilbert — đó là lý do xuất hiện $\theta/2$ trong công thức.
:::

## Góc nhìn nghiên cứu

:::research
- **Qubit spin trong bán dẫn** (silicon, germanium) là một nền tảng phần cứng hứa hẹn vì tương thích với công nghệ chế tạo chip hiện có và kích thước rất nhỏ. Thách thức: điều khiển đồng đều hàng triệu qubit, nhiễu điện tích, và nhiệt độ hoạt động.
- **Tâm NV trong kim cương** — một spin điện tử có thể đọc bằng quang học ở nhiệt độ phòng — là nền tảng hàng đầu cho cảm biến từ trường lượng tử với độ phân giải nano mét.
:::
