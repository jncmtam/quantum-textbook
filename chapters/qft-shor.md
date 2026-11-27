:::question
Gần như toàn bộ giao dịch an toàn trên Internet dựa vào một niềm tin: phân tích một số 2048 bit thành thừa số nguyên tố là việc bất khả thi. Năm 1994, Peter Shor chỉ ra rằng một máy tính lượng tử đủ lớn sẽ làm được việc đó trong vài giờ. Làm sao một bài toán *số học* lại có lời giải *lượng tử*?
:::

## Trực giác: phân tích thừa số là tìm chu kỳ

Chìa khóa của Shor là một sự quy dẫn cổ điển: **phân tích thừa số ⟸ tìm chu kỳ**. Và tìm chu kỳ là việc mà giao thoa làm rất giỏi — giống như lăng kính tách ánh sáng thành các màu (tần số), biến đổi Fourier lượng tử tách một trạng thái tuần hoàn thành các “đỉnh” tại tần số của nó.

Tóm tắt trong một câu: *dùng chồng chập để tính $a^x \bmod N$ cho mọi $x$, dùng biến đổi Fourier lượng tử để đọc ra chu kỳ của dãy đó, rồi dùng số học cổ điển để từ chu kỳ suy ra thừa số.*

## Bước 1 — Quy dẫn cổ điển

:::derivation Từ chu kỳ tới thừa số
Cho $N$ (lẻ, không phải lũy thừa của số nguyên tố). Chọn ngẫu nhiên $a < N$ với $\gcd(a, N) = 1$ (nếu $\gcd > 1$ thì đã tìm được thừa số). Xét dãy $f(x) = a^x \bmod N$. Dãy này tuần hoàn; gọi **chu kỳ** (bậc của $a$) là số $r$ nhỏ nhất với $a^r \equiv 1 \pmod N$.

---
Nếu $r$ chẵn: $a^r - 1 = (a^{r/2} - 1)(a^{r/2} + 1) \equiv 0 \pmod N$. Vậy $N$ chia hết tích của hai số này.

---
Nếu thêm $a^{r/2}\not\equiv -1 \pmod N$, thì $N$ không chia hết từng thừa số riêng lẻ (thừa số đầu nhỏ hơn bậc nên không chia hết), nên $\gcd(a^{r/2} - 1, N)$ là một **ước không tầm thường** của $N$. Thuật toán Euclid tính gcd rất nhanh.

---
Có thể chứng minh với $a$ ngẫu nhiên, xác suất “may mắn” (r chẵn và $a^{r/2}\not\equiv-1$) ít nhất $1/2$. Vậy toàn bộ độ khó nằm ở **tìm $r$**.
:::

:::example $N = 15$
Chọn $a = 7$: $7^1 = 7$, $7^2 = 49 \equiv 4$, $7^3 \equiv 28 \equiv 13$, $7^4 \equiv 91 \equiv 1$. Chu kỳ $r = 4$. $a^{r/2} = 49 \equiv 4$. $\gcd(3, 15) = 3$, $\gcd(5, 15) = 5$. Ta được $15 = 3\times5$.
:::

## Bước 2 — Biến đổi Fourier lượng tử

:::definition QFT
Trên $n$ qubit, $M = 2^n$, với $\omega = e^{2\pi i/M}$:
$$\mathrm{QFT}|x\rangle = \frac{1}{\sqrt M}\sum_{y=0}^{M-1}\omega^{xy}|y\rangle.$$
Đây là biến đổi Fourier rời rạc (DFT) áp lên vectơ biên độ, và là một ma trận unita.
:::

Tính chất cần nhớ từ [[so-phuc]]: $\sum_{y=0}^{M-1}\omega^{ky} = M$ nếu $k \equiv 0 \pmod M$, và bằng $0$ nếu không — các căn của đơn vị triệt tiêu nhau. Đây là cơ chế giao thoa của QFT.

:::derivation QFT phân tích được thành tích — và vì thế có mạch nhỏ
Viết $x = x_1x_2\dots x_n$ (nhị phân, $x_1$ là bit cao nhất). Khai triển $y = \sum_k y_k2^{n-k}$ thì $\omega^{xy} = \prod_k e^{2\pi i\,x\,y_k/2^k}$, và tổng trên $y$ tách thành tích:
$$\mathrm{QFT}|x\rangle = \frac{1}{\sqrt{2^n}}\bigotimes_{k=1}^{n}\Big(|0\rangle + e^{2\pi i\,x/2^k}|1\rangle\Big).$$

---
$e^{2\pi ix/2^k}$ chỉ phụ thuộc $k$ bit thấp của $x$: $x/2^k \bmod 1 = 0.x_{n-k+1}\dots x_n$ (phân số nhị phân). Vậy qubit ra thứ $k$ là $|0\rangle + e^{2\pi i\,0.x_{n-k+1}\dots x_n}|1\rangle$.

---
Mỗi thừa số như vậy được tạo bằng một cổng $H$ (cho bit $x_{n-k+1}$, đóng góp $e^{i\pi x_j} = \pm1$) và một dãy cổng controlled-phase $\mathrm{CP}(2\pi/2^m)$ cho các bit còn lại. Tổng cộng $n(n+1)/2$ cổng, cộng $n/2$ cổng SWAP để đảo thứ tự. **QFT cần $O(n^2)$ cổng**, trong khi FFT cổ điển trên $2^n$ số cần $O(n2^n)$ phép tính.
:::

:::sim circuit {"preset":"qft3"}
QFT trên 3 qubit áp lên $|101\rangle$ ($x = 5$). Mọi biên độ ra đều có độ lớn $1/\sqrt8 \approx 0{,}354$, nhưng **pha** quay đều: $\omega^{5y}$ với $\omega = e^{2\pi i/8}$ — để ý màu của các thanh thay đổi theo $y$. Mỗi qubit ra nằm trên xích đạo quả cầu Bloch, đúng như dạng tích ở trên.
:::

:::warning Không thể “đọc” kết quả QFT
QFT không thay thế FFT cổ điển trong xử lý tín hiệu: các hệ số Fourier nằm trong biên độ, và phép đo chỉ cho một mẫu. QFT hữu ích khi ta chỉ cần **một thông tin toàn cục** từ phổ — như vị trí các đỉnh của một hàm tuần hoàn.
:::

## Bước 3 — Tìm chu kỳ bằng ước lượng pha

:::derivation Vì sao đo được bội số của $M/r$
Dùng hai thanh ghi: thanh ghi thứ nhất $n$ qubit (với $M = 2^n \ge N^2$), thanh ghi thứ hai lưu $a^x \bmod N$. Áp $H^{\otimes n}$ rồi tính $f$:
$$\frac{1}{\sqrt M}\sum_{x=0}^{M-1}|x\rangle|a^x\bmod N\rangle.$$

---
(Tưởng tượng) đo thanh ghi thứ hai, được một giá trị $f(x_0)$. Thanh ghi thứ nhất sụp về các $x$ có cùng giá trị: $x_0, x_0 + r, x_0 + 2r, \dots$ — một **lược** có bước $r$:
$$\frac{1}{\sqrt K}\sum_{j=0}^{K-1}|x_0 + jr\rangle,\qquad K\approx M/r.$$

---
Áp QFT. Biên độ của $|y\rangle$ là $\frac{1}{\sqrt{MK}}\,\omega^{x_0y}\sum_j\omega^{jry}$. Tổng trên $j$ là tổng hình học: lớn (cỡ $K$) khi $ry/M$ gần một số nguyên, và gần như triệt tiêu ở chỗ khác. Pha $\omega^{x_0y}$ chỉ là pha — **độ dịch $x_0$ không ảnh hưởng tới xác suất**.

---
Vậy phép đo cho $y \approx k\cdot M/r$ với $k$ ngẫu nhiên. Từ $y/M \approx k/r$, thuật toán **liên phân số** (continued fractions) khôi phục $r$ (thường cần lặp vài lần để lấy bội chung nhỏ nhất của các mẫu số).
:::

:::physics
Cùng một cơ chế được trừu tượng hóa thành **ước lượng pha lượng tử** (QPE): cho unita $U$ và vectơ riêng $|u\rangle$ với $U|u\rangle = e^{2\pi i\phi}|u\rangle$, QPE dùng các phiên bản có điều khiển $U^{2^k}$ (phase kickback!) để ghi $\phi$ vào một thanh ghi dưới dạng pha, rồi QFT nghịch đảo để đọc $\phi$ ra thành bit. Shor là QPE với $U|y\rangle = |ay \bmod N\rangle$, có trị riêng $e^{2\pi ik/r}$. QPE cũng là nền tảng của mô phỏng hóa học chính xác: đọc ra năng lượng (trị riêng của $e^{-iHt}$).
:::

## Chi phí và thực tế

:::status established
Thuật toán Shor chạy trong thời gian đa thức, cỡ $O(n^2\log n\log\log n)$ cổng cho số $n$ bit với nhân nhanh (thường được trích dẫn là khoảng $O(n^3)$ với nhân thông thường). Thuật toán cổ điển tốt nhất được biết (sàng trường số — number field sieve) chạy trong thời gian $\exp\big(O(n^{1/3}(\log n)^{2/3})\big)$. Không có chứng minh rằng không tồn tại thuật toán cổ điển nhanh.
:::

:::status experimental
Ước lượng tài nguyên cho RSA-2048: Gidney và Ekerå (Quantum, 2021) ước tính khoảng 20 triệu qubit vật lý chạy 8 giờ; Gidney (2025) giảm xuống dưới 1 triệu qubit nhiễu chạy dưới một tuần. Máy tính lượng tử hiện tại có cỡ vài trăm đến vài nghìn qubit vật lý chưa chịu lỗi. Các thí nghiệm “phân tích 15, 21” chủ yếu mang tính minh họa và thường dùng hiểu biết trước về đáp án để đơn giản hóa mạch.
:::

Phản ứng của thế giới mật mã: **mật mã hậu lượng tử** (post-quantum cryptography) — các thuật toán cổ điển dựa trên bài toán (như lưới) không bị Shor phá. NIST đã chuẩn hóa ML-KEM (Kyber) và ML-DSA (Dilithium) năm 2024. Mối lo “thu thập bây giờ, giải mã sau” (harvest now, decrypt later) khiến việc chuyển đổi trở nên cấp bách.

## Bài tập

:::exercise Phân tích 21
Dùng $a = 2$, tìm chu kỳ của $2^x \bmod 21$ và suy ra thừa số của 21.
???solution
$2, 4, 8, 16, 32\equiv11, 22\equiv1$. Vậy $r = 6$. $a^{r/2} = 8$. $\gcd(7, 21) = 7$, $\gcd(9, 21) = 3$. $21 = 3\times7$.
:::

:::exercise Liên phân số
Với $M = 256$, giả sử phép đo cho $y = 192$. Biết $r < 16$, suy ra $r$ có thể là bao nhiêu?
???solution
$y/M = 192/256 = 3/4$. Vậy $k/r = 3/4$, nên $r$ là bội của 4. Kiểm tra $a^4 \bmod N$; nếu bằng 1 thì $r = 4$. Nếu đo được $y = 128$ ($= 1/2$), ta chỉ biết $r$ chẵn — đó là lý do phải lặp lại và lấy bội chung nhỏ nhất.
:::

:::quiz
Q: Trong thuật toán Shor, phần nào **thực sự cần** máy tính lượng tử?
- [ ] Tính gcd || Thuật toán Euclid là cổ điển và rất nhanh.
- [x] Tìm chu kỳ $r$ của $a^x \bmod N$ || Đây là phần khó; phần lượng tử là lũy thừa modulo trong chồng chập + QFT.
- [ ] Liên phân số || Hậu xử lý cổ điển.
:::

## Kết nối

- **Nền tảng:** [[deutsch-jozsa]] (Simon → Shor), [[so-phuc]] (căn của đơn vị), [[ma-tran]] (trị riêng của unita).
- **Hệ quả:** [[bb84]] — mật mã lượng tử như một lời đáp *vật lý*, song song với mật mã hậu lượng tử là lời đáp *toán học*; [[sua-loi]] — Shor chỉ chạy được trên máy chịu lỗi.

## Hiểu lầm thường gặp

:::misconception “Máy tính lượng tử phá được mọi mật mã.”
Shor phá RSA, Diffie–Hellman và mật mã đường cong elliptic. Mật mã đối xứng (AES) và hàm băm chỉ bị Grover làm yếu đi (tăng gấp đôi độ dài khóa là đủ). Các hệ hậu lượng tử được thiết kế để chống cả Shor lẫn Grover.
:::

:::misconception “QFT nhanh hơn FFT theo hàm mũ, nên máy tính lượng tử xử lý tín hiệu nhanh hơn.”
QFT biến đổi biên độ, không đưa ra hệ số Fourier. Để có dữ liệu vào và đọc dữ liệu ra cần thời gian ít nhất tỉ lệ kích thước dữ liệu.
:::

## Góc nhìn nghiên cứu

:::research
- **Giảm chi phí Shor:** số học có cửa sổ (windowed arithmetic), biểu diễn số dư gần đúng, mã bề mặt có “magic state cultivation”, mã qLDPC — mỗi cải tiến giảm số qubit hoặc thời gian chạy đáng kể. Theo dõi các con số này là cách đo khoảng cách tới “ngày Q”.
- **Thuật toán Regev (2023)** đề xuất một biến thể đa chiều của Shor cần ít cổng hơn (khoảng $O(n^{3/2})$ thay vì $O(n^2)$ cho phần lượng tử, với chi phí bộ nhớ lớn hơn), mở ra hướng tối ưu hóa mới.
- **Mật mã hậu lượng tử:** độ an toàn của bài toán lưới (LWE) trước máy tính lượng tử là một giả thuyết; một bài báo năm 2024 tuyên bố thuật toán lượng tử cho LWE nhưng đã được phát hiện có lỗi — minh họa cho mức độ gay cấn của lĩnh vực.
:::
