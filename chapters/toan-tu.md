:::question
Bạn có thể biết chính xác vị trí của một chiếc xe *và* tốc độ của nó cùng lúc. Vì sao với một electron thì không? Có phải do dụng cụ đo của ta quá thô — hay là do chính cấu trúc của đại lượng “vị trí” và “động lượng”?
:::

## Trực giác: đại lượng đo được là một câu hỏi

Trong vật lý cổ điển, “vị trí” là một con số mà hạt *có*. Trong cơ học lượng tử, “vị trí” là một **câu hỏi** ta có thể đặt ra cho hệ — và mỗi câu hỏi có một bộ các câu trả lời khả dĩ (trị riêng) cùng với những trạng thái mà ở đó câu trả lời là chắc chắn (vectơ riêng).

Hai câu hỏi có thể **tương thích** (có những trạng thái mà cả hai đều có câu trả lời chắc chắn) hoặc **không tương thích**. Toán học phân biệt hai trường hợp này bằng một thứ duy nhất: hai ma trận có **giao hoán** với nhau hay không.

## Vì sao cần ngôn ngữ toán tử?

Năm 1925, Heisenberg cố gắng xây dựng lý thuyết chỉ dựa trên những đại lượng đo được (tần số và cường độ vạch phổ). Ông sắp xếp chúng thành các bảng số hai chỉ số và phát hiện ra rằng để quy tắc kết hợp các vạch phổ (nguyên lý Ritz) được thỏa mãn, các bảng này phải nhân với nhau theo một quy tắc lạ — và $x\cdot p \neq p \cdot x$. Born nhận ra đó chính là phép nhân ma trận. Từ đó, đại lượng vật lý trở thành **ma trận**, và phép nhân không giao hoán trở thành trung tâm của lý thuyết.

## Bản chất

:::definition Tiên đề 3 — Đại lượng quan sát
Mỗi đại lượng đo được (observable) $A$ được biểu diễn bởi một toán tử Hermite $\hat A$ trên không gian Hilbert. Theo định lý phổ, $\hat A = \sum_k a_k P_k$ với $a_k$ thực. Khi đo:
- kết quả có thể có là các **trị riêng** $a_k$;
- xác suất được $a_k$ là $\langle\psi|P_k|\psi\rangle$ (quy tắc Born);
- trạng thái sau đo nằm trong không gian riêng tương ứng;
- giá trị trung bình là $\langle A\rangle = \langle\psi|\hat A|\psi\rangle$.
:::

:::example Ma trận Pauli là phép đo spin
$$\sigma_x = \begin{pmatrix}0&1\\1&0\end{pmatrix},\quad \sigma_y = \begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad \sigma_z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}.$$
Mỗi ma trận có trị riêng $\pm1$ — hai kết quả “lên” hoặc “xuống” dọc theo trục tương ứng. Ta sẽ gặp chúng trong [[spin]] và ở mọi nơi của tính toán lượng tử, dưới tên $X, Y, Z$.
:::

### Phương sai lượng tử

Độ bất định của đại lượng $A$ trong trạng thái $|\psi\rangle$ là độ lệch chuẩn của các kết quả đo:
$$(\Delta A)^2 = \langle A^2\rangle - \langle A\rangle^2 = \langle\psi|(\hat A - \langle A\rangle)^2|\psi\rangle.$$
$\Delta A = 0$ khi và chỉ khi $|\psi\rangle$ là vectơ riêng của $\hat A$: kết quả đo là chắc chắn.

## Nền tảng toán học: giao hoán tử và nguyên lý bất định

:::definition Giao hoán tử
$[A, B] = AB - BA$. Hai toán tử **giao hoán** nếu $[A,B] = 0$.
:::

:::theorem Đo đồng thời
Hai toán tử Hermite giao hoán khi và chỉ khi chúng có chung một cơ sở trực chuẩn gồm các vectơ riêng. Khi đó tồn tại những trạng thái mà cả hai đại lượng đều có giá trị xác định.
:::

Với các đại lượng không giao hoán, ta có một giới hạn định lượng.

:::derivation Bất đẳng thức bất định Robertson
Đặt $\tilde A = A - \langle A\rangle$, $\tilde B = B - \langle B\rangle$ (vẫn Hermite, và $[\tilde A, \tilde B] = [A, B]$). Đặt $|f\rangle = \tilde A|\psi\rangle$, $|g\rangle = \tilde B|\psi\rangle$. Khi đó $\langle f|f\rangle = (\Delta A)^2$ và $\langle g|g\rangle = (\Delta B)^2$.

---
Bất đẳng thức Cauchy–Schwarz ([[vecto]]):
$$(\Delta A)^2(\Delta B)^2 = \langle f|f\rangle\langle g|g\rangle \ge |\langle f|g\rangle|^2.$$

---
Với mọi số phức $z$, $|z|^2 \ge (\mathrm{Im}\,z)^2 = \left(\frac{z - \bar z}{2i}\right)^2$. Ở đây $z = \langle f|g\rangle = \langle\psi|\tilde A\tilde B|\psi\rangle$ và $\bar z = \langle g|f\rangle = \langle\psi|\tilde B\tilde A|\psi\rangle$. Vậy
$$z - \bar z = \langle\psi|[\tilde A, \tilde B]|\psi\rangle = \langle [A, B]\rangle.$$

---
Ghép lại:
$$(\Delta A)^2(\Delta B)^2 \ge \left|\frac{\langle[A,B]\rangle}{2i}\right|^2 \quad\Longrightarrow\quad \boxed{\Delta A\,\Delta B \ge \tfrac12\big|\langle[A,B]\rangle\big|.}$$
:::

### Vị trí và động lượng

Trong cơ học sóng, toán tử vị trí $\hat x$ là nhân với $x$, toán tử động lượng là $\hat p = -i\hbar\,\dfrac{d}{dx}$. Lý do: sóng phẳng $e^{ipx/\hbar}$ (bước sóng de Broglie $h/p$) là hàm riêng của $\hat p$ với trị riêng $p$.

:::derivation Hệ thức giao hoán chính tắc
Tác động $[\hat x, \hat p]$ lên một hàm thử $\psi(x)$:
$$\hat x\hat p\,\psi = x\cdot(-i\hbar\psi'), \qquad \hat p\hat x\,\psi = -i\hbar\frac{d}{dx}(x\psi) = -i\hbar(\psi + x\psi').$$

---
Trừ hai vế: $[\hat x, \hat p]\psi = i\hbar\,\psi$ với mọi $\psi$, tức
$$[\hat x, \hat p] = i\hbar.$$

---
Thay vào bất đẳng thức Robertson:
$$\boxed{\Delta x\,\Delta p \ge \frac{\hbar}{2}.}$$
Đây là **nguyên lý bất định Heisenberg**. Dấu bằng đạt được với gói sóng Gauss.
:::

:::physics
Hãy đọc cẩn thận điều bất đẳng thức này nói: **không tồn tại trạng thái** nào mà cả $\Delta x$ và $\Delta p$ đều nhỏ tùy ý. Đây là phát biểu về *trạng thái*, không phải về dụng cụ đo. Một gói sóng hẹp trong không gian phải được tạo từ rất nhiều sóng phẳng có bước sóng khác nhau — tức nhiều giá trị động lượng. Đó cũng là một định lý của giải tích Fourier: tín hiệu càng ngắn, phổ tần số càng rộng.
:::

## Ví dụ

:::example Bất định giữa $\sigma_x$ và $\sigma_z$
$[\sigma_x, \sigma_z] = -2i\sigma_y$ (kiểm tra bằng nhân ma trận). Do đó $\Delta\sigma_x\,\Delta\sigma_z \ge |\langle\sigma_y\rangle|$. Với $|0\rangle$: $\langle\sigma_y\rangle = 0$, $\Delta\sigma_z = 0$, $\Delta\sigma_x = 1$ — bất đẳng thức thỏa mãn tầm thường. Với $|{+i}\rangle = \tfrac{1}{\sqrt2}(|0\rangle + i|1\rangle)$: $\langle\sigma_y\rangle = 1$, $\Delta\sigma_x = \Delta\sigma_z = 1$, dấu bằng đạt được.
:::

:::exercise Tính giá trị kỳ vọng
Với $|\psi\rangle = \cos\tfrac\theta2|0\rangle + e^{i\varphi}\sin\tfrac\theta2|1\rangle$, chứng minh
$$\langle\sigma_x\rangle = \sin\theta\cos\varphi,\quad \langle\sigma_y\rangle = \sin\theta\sin\varphi,\quad \langle\sigma_z\rangle = \cos\theta.$$
???hint
$\sigma_x|\psi\rangle = \cos\tfrac\theta2|1\rangle + e^{i\varphi}\sin\tfrac\theta2|0\rangle$. Rồi lấy tích trong với $\langle\psi|$.
???solution
$\langle\sigma_x\rangle = \cos\tfrac\theta2\sin\tfrac\theta2(e^{i\varphi} + e^{-i\varphi}) = \tfrac12\sin\theta\cdot2\cos\varphi = \sin\theta\cos\varphi$. Tương tự $\langle\sigma_y\rangle = \cos\tfrac\theta2\sin\tfrac\theta2(-ie^{i\varphi} + ie^{-i\varphi}) = \sin\theta\sin\varphi$, và $\langle\sigma_z\rangle = \cos^2\tfrac\theta2 - \sin^2\tfrac\theta2 = \cos\theta$. Ba con số này là **tọa độ của một điểm trên mặt cầu đơn vị** — quả cầu Bloch ([[qubit-bloch]]).
:::

:::exercise Đại lượng bảo toàn
Chứng minh rằng nếu $|\psi\rangle$ là vectơ riêng của $A$ thì $\Delta A = 0$; và ngược lại, nếu $\Delta A = 0$ thì $|\psi\rangle$ là vectơ riêng.
???solution
Nếu $A|\psi\rangle = a|\psi\rangle$ thì $\langle A\rangle = a$, $\langle A^2\rangle = a^2$, nên $\Delta A = 0$. Ngược lại, $(\Delta A)^2 = \|(A - \langle A\rangle)|\psi\rangle\|^2 = 0$ nên $(A - \langle A\rangle)|\psi\rangle = 0$, tức $|\psi\rangle$ là vectơ riêng với trị riêng $\langle A\rangle$.
:::

:::quiz
Q: Nguyên lý bất định $\Delta x\Delta p \ge \hbar/2$ nói gì?
- [ ] Phép đo vị trí luôn làm nhiễu động lượng một lượng $\ge\hbar/2$ || Đó là một phát biểu khác (về nhiễu do phép đo — error–disturbance), có dạng toán học khác (Ozawa, 2003). Bất đẳng thức Robertson nói về độ phân tán trong một trạng thái.
- [x] Không có trạng thái nào mà phân bố vị trí và phân bố động lượng đều hẹp tùy ý || Đúng: $\Delta x, \Delta p$ là độ lệch chuẩn của hai thống kê đo trên các bản sao giống nhau của cùng một trạng thái.
- [ ] Hạt có vị trí và động lượng xác định, nhưng ta không biết được || Đây là quan điểm biến ẩn; định lý Bell và Kochen–Specker loại trừ phần lớn các phiên bản của nó.
:::

## Kết nối

- **Nền tảng:** [[ma-tran]] (định lý phổ — lý do toán học), [[phep-do]].
- **Tiếp theo:** [[schrodinger]] — toán tử năng lượng (Hamiltonian) quyết định tiến hóa; [[spin]] — các toán tử Pauli trong tự nhiên.
- **Xa hơn:** ở [[sua-loi]], các toán tử Pauli giao hoán với nhau (stabilizer) cho phép đo “lỗi” mà không đo thông tin được mã hóa.

## Hiểu lầm thường gặp

:::misconception “Bất định là do tác động của photon dùng để quan sát.”
Đó là lập luận “kính hiển vi Heisenberg” — có giá trị lịch sử nhưng gây hiểu lầm. Bất định là tính chất của trạng thái, xuất hiện ngay cả khi không có phép đo nào làm nhiễu (ví dụ, nó quyết định năng lượng điểm không của dao động tử).
:::

:::misconception “Năng lượng–thời gian là một nguyên lý bất định giống hệt vị trí–động lượng.”
Thời gian không phải là một toán tử trong cơ học lượng tử chuẩn; quan hệ $\Delta E\,\Delta t \gtrsim \hbar$ có ý nghĩa khác (thời gian cần để trạng thái thay đổi đáng kể — bất đẳng thức Mandelstam–Tamm), và phải được phát biểu cẩn thận.
:::

## Góc nhìn nghiên cứu

:::research
- **Bất định entropy** (Maassen–Uffink, 1988): $H(A) + H(B) \ge -2\log_2 \max_{j,k}|\langle a_j|b_k\rangle|$. Phiên bản này không phụ thuộc trạng thái, và khi có bộ nhớ lượng tử (Berta và cộng sự, Nature Physics 2010), nó trở thành công cụ chứng minh an toàn cho mật mã lượng tử ([[bb84]]).
- **Trạng thái nén** (squeezed states) giảm bất định của một đại lượng dưới mức lượng tử chuẩn, đổi lại tăng bất định của đại lượng liên hợp. LIGO dùng ánh sáng nén để tăng độ nhạy đo sóng hấp dẫn — một ứng dụng thực tế của chính bất đẳng thức trong chương này.
:::
