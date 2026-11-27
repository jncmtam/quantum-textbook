:::question
Máy tính lượng tử chịu lỗi còn nhiều năm nữa. Trong lúc chờ đợi, ta có những máy vài trăm qubit nhiễu, chỉ chạy được mạch nông. Có làm được gì hữu ích với chúng không? Ý tưởng được đặt cược nhiều nhất trong thập kỷ qua là: *để máy lượng tử làm phần nó giỏi, để máy cổ điển làm phần còn lại.*
:::

## Trực giác: một vòng lặp lai

Thuật toán biến phân giống như chỉnh một chiếc đài cũ: bạn vặn núm (tham số), nghe tín hiệu (đo), rồi vặn tiếp theo hướng tốt hơn. Ở đây:

- **Máy lượng tử** chuẩn bị một trạng thái $|\psi(\vec\theta)\rangle$ bằng một mạch có tham số (gọi là **ansatz** — “giả thiết ban đầu” về hình dạng lời giải), rồi đo để ước lượng một hàm chi phí $C(\vec\theta)$.
- **Máy cổ điển** nhận $C(\vec\theta)$, đề xuất tham số mới để giảm chi phí.
- Lặp lại tới khi hội tụ.

Vì mạch nông, nó chạy được trước khi nhiễu phá hủy trạng thái. Đây là triết lý của kỷ nguyên **NISQ** (Noisy Intermediate-Scale Quantum — Preskill, 2018).

## Vì sao lại là nguyên lý biến phân?

Bài toán trung tâm của hóa học và vật lý vật liệu là tìm **năng lượng trạng thái cơ bản** — trị riêng nhỏ nhất của Hamiltonian $H$ ([[schrodinger]], [[ma-tran]]).

:::theorem Nguyên lý biến phân
Với mọi trạng thái chuẩn hóa $|\psi\rangle$: $\langle\psi|H|\psi\rangle \ge E_0$, với $E_0$ là trị riêng nhỏ nhất. Dấu bằng khi $|\psi\rangle$ là trạng thái cơ bản.
:::

:::derivation Chứng minh
Khai triển $|\psi\rangle = \sum_n c_n|E_n\rangle$ theo cơ sở riêng của $H$, với $\sum|c_n|^2 = 1$:
$$\langle\psi|H|\psi\rangle = \sum_n|c_n|^2E_n \ge \sum_n|c_n|^2E_0 = E_0.$$
Năng lượng trung bình là trung bình có trọng số của các trị riêng — không thể nhỏ hơn trị riêng nhỏ nhất.
:::

Vậy cực tiểu hóa $E(\vec\theta) = \langle\psi(\vec\theta)|H|\psi(\vec\theta)\rangle$ cho một **cận trên** của $E_0$, chặt khi ansatz đủ biểu diễn. Đây là **VQE** (Variational Quantum Eigensolver — Peruzzo và cộng sự, Nature Communications 2014).

## Nền tảng toán học

### Đo năng lượng: phân tích Pauli

Hamiltonian của phân tử, sau khi ánh xạ electron sang qubit (Jordan–Wigner, Bravyi–Kitaev), có dạng
$$H = \sum_k h_k P_k,\qquad P_k\in\{I, X, Y, Z\}^{\otimes n}.$$
Mỗi $\langle P_k\rangle$ đo được bằng cách xoay về cơ sở Z rồi đo. Vì thế $E = \sum_kh_k\langle P_k\rangle$ được ước lượng từ nhiều cấu hình đo, mỗi cấu hình nhiều shot. Sai số thống kê theo $1/\sqrt{N_{\text{shot}}}$ ([[xac-suat]]) — một chi phí thực tế lớn.

### Gradient: quy tắc dịch tham số

:::derivation Parameter-shift rule
Xét một tham số xuất hiện qua cổng $e^{-i\theta P/2}$, với $P$ là một Pauli ($P^2 = I$). Có thể chứng minh $E(\theta)$ có dạng $a + b\cos\theta + c\sin\theta$ (vì $e^{-i\theta P/2} = \cos\frac\theta2 I - i\sin\frac\theta2 P$, và $E$ là bậc hai theo $\cos\frac\theta2, \sin\frac\theta2$).

---
Với dạng đó:
$$\frac{dE}{d\theta} = -b\sin\theta + c\cos\theta.$$
Và
$$E(\theta + \tfrac\pi2) - E(\theta - \tfrac\pi2) = b[\cos(\theta + \tfrac\pi2) - \cos(\theta - \tfrac\pi2)] + c[\sin(\theta + \tfrac\pi2) - \sin(\theta - \tfrac\pi2)] = -2b\sin\theta + 2c\cos\theta.$$

---
Vậy
$$\boxed{\frac{dE}{d\theta} = \frac{E(\theta + \frac\pi2) - E(\theta - \frac\pi2)}{2}.}$$
Đây là **gradient chính xác** (không phải xấp xỉ sai phân), tính được từ hai lần chạy mạch với tham số dịch đi $\pm\pi/2$.
:::

:::sim vqe
Hamiltonian một qubit $H = aZ + bX$ với ansatz $R_y(\theta)|0\rangle$. Bấm “Chạy 40 bước” với số shot bằng 0 (chính xác): hội tụ nhanh về $E_0$. Đặt shot = 50: θ “rung” quanh cực tiểu và sai số không giảm dưới một mức sàn. Đây là trải nghiệm thường ngày với thuật toán biến phân trên phần cứng thật.
:::

### QAOA

Thuật toán xấp xỉ tối ưu lượng tử (Farhi, Goldstone, Gutmann, 2014) cho bài toán tổ hợp (ví dụ MaxCut) dùng ansatz xen kẽ:
$$|\vec\gamma, \vec\beta\rangle = e^{-i\beta_pH_M}e^{-i\gamma_pH_C}\cdots e^{-i\beta_1H_M}e^{-i\gamma_1H_C}|{+}\rangle^{\otimes n},$$
với $H_C$ mã hóa hàm mục tiêu (đường chéo) và $H_M = \sum_jX_j$ là Hamiltonian “trộn”. Khi $p\to\infty$, QAOA tái tạo tiến hóa đoạn nhiệt (adiabatic) và tìm được nghiệm tối ưu; với $p$ nhỏ, hiệu năng so với thuật toán cổ điển tốt nhất là câu hỏi mở.

## Học máy lượng tử

Mạch biến phân cũng có thể đóng vai trò mô hình học máy (**mạng nơ-ron lượng tử**): dữ liệu được nhúng vào trạng thái qua một **bản đồ đặc trưng** (feature map), mạch có tham số xử lý, phép đo cho dự đoán. Một hướng khác là **phương pháp nhân lượng tử** (quantum kernel): dùng $|\langle\phi(x)|\phi(x')\rangle|^2$ làm hàm nhân cho SVM (Havlíček và cộng sự, Nature 2019).

### Những vấn đề lớn

:::status established
**Barren plateaus** (McClean và cộng sự, Nature Communications 2018): với ansatz đủ ngẫu nhiên và sâu, phương sai của gradient giảm **theo hàm mũ** với số qubit. Cảnh quan năng lượng phẳng gần như khắp nơi; ước lượng gradient đòi hỏi số shot hàm mũ. Nhiễu phần cứng cũng gây barren plateaus (Wang và cộng sự 2021).
:::

:::status debated
**Khả năng huấn luyện vs. mô phỏng được:** các kết quả gần đây (Cerezo và cộng sự, 2023–2024) cho thấy nhiều mô hình *tránh được* barren plateaus nhờ cấu trúc lại chính vì cấu trúc đó khiến chúng **mô phỏng được hiệu quả trên máy cổ điển**. Liệu có mô hình vừa huấn luyện được vừa có lợi thế lượng tử thật sự hay không là câu hỏi đang tranh luận sôi nổi.
:::

:::status debated
**Dequantization:** Tang (2019) chỉ ra rằng thuật toán gợi ý (recommendation) lượng tử của Kerenidis–Prakash có thể được “giải lượng tử hóa” — thuật toán cổ điển với giả định truy cập dữ liệu tương tự chỉ chậm hơn đa thức. Nhiều thuật toán QML dựa trên đại số tuyến tính (HHL và hậu duệ) chịu chung số phận khi dữ liệu có hạng thấp. Lợi thế chứng minh được thường chỉ xuất hiện với **dữ liệu lượng tử** (dữ liệu đến từ chính các hệ lượng tử — Huang và cộng sự, Science 2022).
:::

## Bài tập

:::exercise VQE một qubit bằng tay
$H = Z + X$. Với ansatz $R_y(\theta)|0\rangle = \cos\frac\theta2|0\rangle + \sin\frac\theta2|1\rangle$, tính $E(\theta)$, tìm $\theta^*$ và $E_0$. So sánh với trị riêng tính trực tiếp.
???solution
$\langle Z\rangle = \cos\theta$, $\langle X\rangle = \sin\theta$, nên $E(\theta) = \cos\theta + \sin\theta = \sqrt2\cos(\theta - \pi/4)$. Cực tiểu tại $\theta^* = 5\pi/4$, $E_0 = -\sqrt2$. Trị riêng của $\begin{pmatrix}1&1\\1&-1\end{pmatrix}$: $\pm\sqrt2$. ✓ Ansatz đủ biểu diễn vì trạng thái cơ bản là thực (ma trận thực đối xứng).
:::

:::exercise Ansatz không đủ biểu diễn
Với $H = Y$ và cùng ansatz $R_y(\theta)|0\rangle$, VQE cho kết quả gì?
???solution
$\langle Y\rangle = 0$ với mọi $\theta$ (trạng thái có biên độ thực, nằm trong mặt phẳng $x$–$z$ của quả cầu Bloch). $E(\theta) \equiv 0$, trong khi $E_0 = -1$. Ansatz không chứa trạng thái cơ bản $|{-i}\rangle$. Bài học: chọn ansatz là nơi kiến thức vật lý (đối xứng, cấu trúc bài toán) quyết định thành bại.
:::

:::quiz
Q: Vì sao VQE được coi là phù hợp với phần cứng NISQ hơn ước lượng pha lượng tử (QPE)?
- [x] Mạch ngắn hơn nhiều, và một phần công việc (tối ưu) chuyển sang máy cổ điển || Đổi lại, VQE cần rất nhiều lần chạy và không có đảm bảo hội tụ hay độ chính xác như QPE.
- [ ] VQE chính xác hơn QPE || QPE (trên máy chịu lỗi) cho năng lượng với độ chính xác có kiểm soát; VQE phụ thuộc ansatz và tối ưu.
- [ ] VQE không cần đo || VQE cần cực kỳ nhiều phép đo.
:::

## Kết nối

- **Nền tảng:** [[cong-mach]], [[toan-tu]] (giá trị kỳ vọng, Pauli), [[schrodinger]] (Hamiltonian), [[xac-suat]] (nhiễu shot).
- **Liên quan:** [[grover]] (so sánh tối ưu lượng tử với tìm kiếm), [[sua-loi]] (con đường thay thế: chờ máy chịu lỗi), [[ban-do-nghien-cuu]].

## Hiểu lầm thường gặp

:::misconception “Học máy lượng tử chắc chắn mạnh hơn học máy cổ điển.”
Hiện chưa có bằng chứng lợi thế thực tế trên dữ liệu cổ điển. Các lợi thế được chứng minh đều dựa trên giả định đặc biệt (dữ liệu lượng tử, hoặc bài toán được dựng riêng như dựa trên logarit rời rạc).
:::

:::misconception “VQE tìm được trạng thái cơ bản của mọi phân tử.”
VQE chỉ tốt bằng ansatz, bộ tối ưu và ngân sách đo. Với hệ lớn, mỗi yếu tố đều gặp trở ngại cơ bản (barren plateaus, số phép đo khổng lồ, cực tiểu địa phương).
:::

## Góc nhìn nghiên cứu

:::research
**Các câu hỏi mở đáng theo đuổi:**
1. Có tồn tại họ ansatz vừa huấn luyện được vừa không mô phỏng cổ điển được không? Nếu có, cấu trúc của chúng là gì?
2. Giảm nhiễu (error mitigation: zero-noise extrapolation, probabilistic error cancellation) có chi phí tăng theo hàm mũ với kích thước mạch — đâu là ranh giới thực tế? IBM (Kim và cộng sự, Nature 2023) đã dùng nó cho mạch 127 qubit, nhưng các mô phỏng cổ điển bằng mạng tensor nhanh chóng tái tạo kết quả.
3. Lợi thế lượng tử trong học **từ dữ liệu lượng tử** (ví dụ: học tính chất của trạng thái từ cảm biến lượng tử) đã được chứng minh trên lý thuyết và trình diễn thực nghiệm — đâu là ứng dụng thực tế?
4. **Mô hình sinh lượng tử** (quantum Born machines, quantum Boltzmann machines): có lợi thế biểu diễn về mặt lý thuyết, nhưng huấn luyện và đánh giá vẫn là thách thức.

Tài liệu khởi đầu: Cerezo và cộng sự, “Variational quantum algorithms”, *Nature Reviews Physics* 3, 625 (2021); Biamonte và cộng sự, “Quantum machine learning”, *Nature* 549, 195 (2017); Bharti và cộng sự, “Noisy intermediate-scale quantum algorithms”, *Reviews of Modern Physics* 94, 015004 (2022).
:::
