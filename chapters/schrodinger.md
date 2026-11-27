:::question
Ta đã biết trạng thái là một vectơ. Nhưng thế giới thay đổi: electron trong nguyên tử, spin trong từ trường, qubit trong máy tính. Vectơ trạng thái thay đổi theo quy luật nào? Và vì sao quy luật ấy lại tự động sinh ra các mức năng lượng rời rạc mà Bohr phải *giả định*?
:::

## Trực giác: các mũi tên quay

Hãy nhớ lại [[so-phuc]]: nhân với $e^{-i\omega t}$ là quay một mũi tên trên mặt phẳng phức với tần số $\omega$. Ý tưởng trung tâm của chương này là:

> Mỗi trạng thái có năng lượng xác định $E$ là một mũi tên quay với tần số $\omega = E/\hbar$. Một trạng thái tổng quát là tổng của nhiều mũi tên như vậy, quay với các tần số khác nhau — và giao thoa giữa chúng tạo nên mọi chuyển động.

Năng lượng, trong cơ học lượng tử, *chính là* tần số quay của pha.

:::sim wellbox
Bắt đầu chỉ với $c_1 \neq 0$: mật độ xác suất **đứng yên hoàn toàn** — đó là một trạng thái dừng. Thêm $c_2$: “cục” xác suất bắt đầu dao động qua lại với chu kỳ $2\pi\hbar/(E_2 - E_1)$. Lưu ý rằng $\langle E\rangle$ không đổi theo thời gian.
:::

## Vì sao lại là phương trình này?

Schrödinger (1926) bắt đầu từ ý tưởng sóng vật chất của de Broglie và câu hỏi: *sóng ấy tuân theo phương trình nào?* Có thể đi theo con đường của ông, nhưng có một lập luận hiện đại sạch hơn, chỉ dựa trên hai yêu cầu vật lý:

1. **Tuyến tính.** Nguyên lý chồng chập phải được bảo toàn theo thời gian: nếu $|\psi_1\rangle$ tiến hóa thành $|\psi_1(t)\rangle$ và $|\psi_2\rangle$ thành $|\psi_2(t)\rangle$, thì tổ hợp phải tiến hóa thành tổ hợp.
2. **Bảo toàn xác suất.** Tổng xác suất phải luôn bằng 1: $\langle\psi(t)|\psi(t)\rangle = 1$.

Hai yêu cầu này buộc tiến hóa phải là một **ma trận unita** $U(t)$: $|\psi(t)\rangle = U(t)|\psi(0)\rangle$.

## Nền tảng toán học

:::derivation Từ tiến hóa unita tới phương trình Schrödinger
Xét một bước thời gian nhỏ $\delta t$. Vì $U(0) = I$ và tiến hóa liên tục, ta viết
$$U(\delta t) = I - \frac{i}{\hbar}H\,\delta t + O(\delta t^2)$$
với một ma trận $H$ nào đó. (Hệ số $-i/\hbar$ chỉ là quy ước để $H$ có đơn vị năng lượng.)

---
Điều kiện unita $U^\dagger U = I$:
$$\Big(I + \tfrac{i}{\hbar}H^\dagger\delta t\Big)\Big(I - \tfrac{i}{\hbar}H\delta t\Big) = I + \tfrac{i}{\hbar}(H^\dagger - H)\delta t + O(\delta t^2) = I.$$
Vậy $H^\dagger = H$: **$H$ là Hermite**. Nó là một đại lượng quan sát — và ta đồng nhất nó với **năng lượng**, gọi là **Hamiltonian**.

---
Từ $|\psi(t + \delta t)\rangle = U(\delta t)|\psi(t)\rangle$:
$$\frac{|\psi(t+\delta t)\rangle - |\psi(t)\rangle}{\delta t} = -\frac{i}{\hbar}H|\psi(t)\rangle + O(\delta t).$$
Cho $\delta t \to 0$:
$$\boxed{i\hbar\frac{d}{dt}|\psi(t)\rangle = H|\psi(t)\rangle.}$$
Đây là **phương trình Schrödinger phụ thuộc thời gian**.

---
Vì sao $H$ là năng lượng? Với một sóng phẳng của hạt tự do, $\psi \propto e^{i(px - Et)/\hbar}$, ta có $i\hbar\,\partial_t\psi = E\psi$: toán tử $i\hbar\partial_t$ “đọc ra” năng lượng, đúng như hệ thức Planck–Einstein $E = \hbar\omega$. Đồng nhất $H$ với năng lượng là nhất quán với [[khung-hoang]].
:::

### Lời giải: chéo hóa Hamiltonian

Nếu $H$ không phụ thuộc thời gian, theo định lý phổ ([[ma-tran]]) nó có cơ sở riêng trực chuẩn: $H|E_n\rangle = E_n|E_n\rangle$.

:::derivation Trạng thái dừng và nghiệm tổng quát
Thử nghiệm dạng $|\psi(t)\rangle = f(t)|E_n\rangle$. Thay vào: $i\hbar f'(t) = E_nf(t)$, nên $f(t) = e^{-iE_nt/\hbar}$.

---
Mật độ xác suất của trạng thái này: $|e^{-iE_nt/\hbar}|^2 = 1$ — **không đổi theo thời gian**. Mọi kết quả đo đều không đổi. Vì vậy $|E_n\rangle$ được gọi là **trạng thái dừng** (stationary state). Phương trình trị riêng $H|E\rangle = E|E\rangle$ gọi là **phương trình Schrödinger dừng**.

---
Do tính tuyến tính, nghiệm tổng quát là:
$$|\psi(t)\rangle = \sum_n c_n\,e^{-iE_nt/\hbar}|E_n\rangle,\qquad c_n = \langle E_n|\psi(0)\rangle.$$
Hay gọn: $U(t) = e^{-iHt/\hbar} = \sum_n e^{-iE_nt/\hbar}|E_n\rangle\langle E_n|$.

---
**Ý nghĩa:** giải bài toán động lực học lượng tử = tìm trị riêng và vectơ riêng của $H$. Xác suất đo được năng lượng $E_n$ là $|c_n|^2$, không đổi theo thời gian (năng lượng bảo toàn). Mọi chuyển động quan sát được đến từ **giao thoa giữa các thành phần có năng lượng khác nhau**, với tần số $(E_m - E_n)/\hbar$ — chính là tần số các vạch phổ mà Bohr phải giả định!
:::

### Hạt trong hộp: nơi lượng tử hóa xuất hiện

Một hạt khối lượng $m$ bị nhốt trong đoạn $[0, L]$ với thành vô hạn. Trong hộp, $H = \hat p^2/2m = -\frac{\hbar^2}{2m}\frac{d^2}{dx^2}$, và hàm sóng phải bằng 0 ở hai đầu.

:::derivation Các mức năng lượng của hạt trong hộp
Phương trình dừng: $-\dfrac{\hbar^2}{2m}\psi'' = E\psi$, tức $\psi'' = -k^2\psi$ với $k = \sqrt{2mE}/\hbar$. Nghiệm tổng quát: $\psi(x) = A\sin kx + B\cos kx$.

---
Điều kiện $\psi(0) = 0$ cho $B = 0$. Điều kiện $\psi(L) = 0$ cho $\sin kL = 0$, tức $kL = n\pi$, $n = 1, 2, 3, \dots$ ($n = 0$ cho hàm bằng 0 khắp nơi — không phải trạng thái).

---
Vậy $k$ chỉ nhận các giá trị rời rạc, kéo theo năng lượng rời rạc:
$$E_n = \frac{\hbar^2k_n^2}{2m} = \frac{n^2\pi^2\hbar^2}{2mL^2}, \qquad \psi_n(x) = \sqrt{\frac2L}\sin\frac{n\pi x}{L}.$$

---
**Lượng tử hóa không cần giả định**: nó xuất hiện vì sóng phải “vừa khít” trong hộp, giống các họa âm của dây đàn. Và năng lượng thấp nhất $E_1 > 0$: hạt không bao giờ đứng yên được (**năng lượng điểm không** — hệ quả của nguyên lý bất định: bị giam trong $\Delta x \sim L$ thì phải có $\Delta p \gtrsim \hbar/L$).
:::

:::physics
Với nguyên tử hydro, làm tương tự với thế Coulomb $-e^2/(4\pi\varepsilon_0r)$ trong ba chiều cho đúng $E_n = -13{,}6\ \text{eV}/n^2$ — kết quả của Bohr, nhưng giờ là hệ quả của một lý thuyết nhất quán, kèm thêm cấu trúc các orbital $s, p, d, f$ và giải thích được bảng tuần hoàn. Mọi hóa học đều bắt đầu từ phương trình Schrödinger dừng.
:::

## Một ví dụ hai mức: dao động Rabi

Nhiều hệ quan trọng chỉ có hai mức liên quan: một spin trong từ trường, hai mức của một nguyên tử, một qubit siêu dẫn. Với $H = \tfrac{\hbar\Omega}{2}\sigma_x$:
$$U(t) = e^{-i\Omega t\sigma_x/2} = \cos\tfrac{\Omega t}{2}\,I - i\sin\tfrac{\Omega t}{2}\,\sigma_x.$$
(Dùng $\sigma_x^2 = I$ và khai triển Taylor.) Bắt đầu từ $|0\rangle$: $|\psi(t)\rangle = \cos\tfrac{\Omega t}2|0\rangle - i\sin\tfrac{\Omega t}{2}|1\rangle$. Xác suất ở $|1\rangle$ là $\sin^2(\Omega t/2)$: hệ **dao động** qua lại giữa hai mức. Tắt trường đúng lúc $\Omega t = \pi$, ta có cổng NOT lượng tử — đây chính là cách điều khiển qubit thật bằng xung vi sóng hoặc laser ([[qubit-bloch]], [[cong-mach]]).

## Bài tập

:::exercise Chu kỳ dao động
Hạt trong hộp ở trạng thái $\tfrac1{\sqrt2}(\psi_1 + \psi_2)$. Chứng minh mật độ xác suất dao động với chu kỳ $T = \dfrac{2\pi\hbar}{E_2 - E_1} = \dfrac{4mL^2}{3\pi\hbar}$.
???solution
$|\psi(x,t)|^2 = \tfrac12\big(\psi_1^2 + \psi_2^2 + 2\psi_1\psi_2\cos\frac{(E_2 - E_1)t}{\hbar}\big)$ (các $\psi_n$ thực). Số hạng giao thoa dao động với tần số góc $(E_2 - E_1)/\hbar$. Với $E_2 - E_1 = 3E_1 = \dfrac{3\pi^2\hbar^2}{2mL^2}$: $T = \dfrac{2\pi\hbar\cdot 2mL^2}{3\pi^2\hbar^2} = \dfrac{4mL^2}{3\pi\hbar}$.
:::

:::exercise Đại lượng bảo toàn
Chứng minh rằng với mọi toán tử $A$ không phụ thuộc thời gian, $\dfrac{d}{dt}\langle A\rangle = \dfrac{i}{\hbar}\langle[H, A]\rangle$ (định lý Ehrenfest). Suy ra: đại lượng giao hoán với $H$ thì được bảo toàn.
???solution
$\frac{d}{dt}\langle\psi|A|\psi\rangle = \langle\dot\psi|A|\psi\rangle + \langle\psi|A|\dot\psi\rangle$. Với $|\dot\psi\rangle = -\frac{i}{\hbar}H|\psi\rangle$ và $\langle\dot\psi| = \frac{i}{\hbar}\langle\psi|H$: tổng $= \frac{i}{\hbar}\langle\psi|(HA - AH)|\psi\rangle$. Nếu $[H, A] = 0$, $\langle A\rangle$ không đổi — và cả phân phối xác suất của $A$ cũng không đổi. Đây là phiên bản lượng tử của “đối xứng ↔ định luật bảo toàn” (định lý Noether).
:::

:::quiz
Q: Một hệ ở trạng thái dừng $|E_3\rangle$. Điều nào **sai**?
- [ ] Mọi xác suất đo không đổi theo thời gian || Đúng — trạng thái chỉ nhận thêm một pha toàn cục.
- [ ] Vectơ trạng thái vẫn thay đổi theo thời gian || Đúng — nó nhân với $e^{-iE_3t/\hbar}$; chỉ là pha toàn cục nên không quan sát được.
- [x] Vị trí trung bình $\langle x\rangle$ dao động với tần số $E_3/\hbar$ || Sai: dao động cần giao thoa giữa *hai* mức năng lượng khác nhau; một mức duy nhất cho mọi kỳ vọng hằng số.
:::

## Kết nối

- **Nền tảng:** [[toan-tu]] (Hamiltonian là một observable), [[ma-tran]] (hàm của ma trận, định lý phổ), [[khung-hoang]].
- **Tiếp theo:** [[spin]] (Hamiltonian của spin trong từ trường), [[cong-mach]] (cổng lượng tử = tiến hóa $e^{-iHt}$ được điều khiển), [[bien-phan]] (tìm trị riêng nhỏ nhất của $H$).

## Hiểu lầm thường gặp

:::misconception “Phương trình Schrödinger mô tả sụp đổ hàm sóng.”
Phương trình Schrödinger là tuyến tính, tất định và unita. Cập nhật khi đo ([[phep-do]]) là một quy tắc *khác*, không tuyến tính, ngẫu nhiên. Sự cùng tồn tại của hai quy luật này chính là bài toán đo lường.
:::

:::misconception “Năng lượng điểm không có thể khai thác làm nguồn năng lượng vô tận.”
$E_1$ là năng lượng *thấp nhất có thể*. Muốn lấy năng lượng ra, hệ phải chuyển xuống một trạng thái thấp hơn — mà không có trạng thái nào thấp hơn.
:::

## Góc nhìn nghiên cứu

:::research
- **Mô phỏng Hamiltonian** — xây dựng $e^{-iHt}$ trên máy tính lượng tử — là ứng dụng được kỳ vọng nhiều nhất (Lloyd, Science 1996). Các phương pháp: phân tách Trotter–Suzuki, tổ hợp tuyến tính của unita (LCU), *qubitization* và biến đổi giá trị kỳ dị lượng tử (QSVT), đạt chi phí gần tối ưu.
- **Bài toán trạng thái cơ bản** của Hamiltonian cục bộ là QMA-đầy đủ trong trường hợp tổng quát, nhưng với các Hamiltonian hóa học và vật liệu cụ thể, lợi thế lượng tử thực tế là bao nhiêu vẫn là câu hỏi nghiên cứu tích cực ([[ban-do-nghien-cuu]]).
:::
