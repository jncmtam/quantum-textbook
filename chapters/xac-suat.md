:::question
Bạn tung một đồng xu 10 lần, được 7 lần ngửa. Đồng xu có bị lệch không? Còn nếu tung 1000 lần được 700 lần ngửa? Cùng một tỉ lệ 70%, nhưng cảm giác của bạn hoàn toàn khác. Con số nào đo “mức độ tin tưởng” đó?
:::

## Trực giác

Xác suất là ngôn ngữ để nói chính xác về **những điều ta không biết chắc**. Có hai nguồn gốc của sự không chắc chắn:

1. **Thiếu thông tin.** Đồng xu tuân theo định luật Newton; nếu biết chính xác lực tung, ta đoán được kết quả. Xác suất ở đây đo *sự thiếu hiểu biết của ta*.
2. **Ngẫu nhiên nội tại.** Theo cơ học lượng tử chuẩn, khi một photon phân cực 45° đi tới bộ lọc dọc, *không có gì trong vũ trụ* quyết định trước nó sẽ đi qua hay bị chặn.

Toán học của hai loại là giống nhau — điều khác biệt nằm ở *cách các xác suất kết hợp*. Ở chương [[song-hat]], ta sẽ thấy xác suất lượng tử không cộng như xác suất cổ điển. Nhưng trước hết phải nắm thật chắc xác suất cổ điển.

## Vì sao cần lý thuyết xác suất?

Pascal và Fermat (1654) bắt đầu từ bài toán chia tiền cược khi ván bài bị dừng giữa chừng. Laplace dùng nó cho thiên văn học. Rồi đến thế kỷ XIX, Maxwell và Boltzmann làm một điều táo bạo: mô tả chất khí với $10^{23}$ phân tử không phải bằng cách theo dõi từng phân tử, mà bằng **phân phối xác suất** của vận tốc. Từ đó sinh ra cơ học thống kê, entropy, và — gián tiếp — lý thuyết lượng tử (Planck tìm ra lượng tử khi làm thống kê bức xạ, xem [[khung-hoang]]).

Ngày nay, mỗi lần chạy một máy tính lượng tử, bạn nhận được một **mẫu ngẫu nhiên**. Không hiểu thống kê thì không đọc được kết quả của nó.

## Bản chất

- **Không gian mẫu** $\Omega$: tập mọi kết quả có thể (ví dụ $\{S, N\}$ cho đồng xu).
- **Phân phối xác suất**: gán cho mỗi kết quả $x$ một số $p(x) \ge 0$, với $\sum_x p(x) = 1$.
- **Biến ngẫu nhiên** $X$: một con số gắn với mỗi kết quả.
- **Kỳ vọng**: $\mathbb{E}[X] = \sum_x x\,p(x)$ — trung bình có trọng số.
- **Phương sai**: $\mathrm{Var}(X) = \mathbb{E}[(X - \mathbb{E}X)^2] = \mathbb{E}[X^2] - (\mathbb{E}X)^2$. Căn bậc hai của nó là **độ lệch chuẩn** $\sigma$.

### Xác suất có điều kiện và độc lập

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}.$$

Hai biến cố **độc lập** nếu $P(A\cap B) = P(A)P(B)$: biết $B$ không cho thêm thông tin gì về $A$.

**Phân phối đồng thời** (joint distribution) $p(x, y)$ mô tả hai biến cùng lúc. **Phân phối biên** (marginal) có được bằng cách cộng bỏ biến kia: $p(x) = \sum_y p(x, y)$. Hãy nhớ phép “cộng bỏ” này — ở [[ma-tran-mat-do]], phiên bản lượng tử của nó là **vết riêng phần**.

:::definition Tương quan
Hiệp phương sai $\mathrm{Cov}(X, Y) = \mathbb{E}[XY] - \mathbb{E}[X]\mathbb{E}[Y]$. Với các biến nhận giá trị $\pm1$, đại lượng $\mathbb{E}[XY]$ gọi là **tương quan**: bằng $+1$ khi chúng luôn giống nhau, $-1$ khi luôn ngược nhau. Bất đẳng thức Bell ([[roi-luong-tu]]) là một phát biểu về giới hạn của các tương quan như vậy.
:::

## Nền tảng toán học: vì sao trung bình hội tụ?

:::derivation Phương sai của trung bình mẫu
Gọi $X_1, \dots, X_N$ là $N$ lần đo độc lập, cùng phân phối, kỳ vọng $\mu$, phương sai $\sigma^2$. Trung bình mẫu là $\bar X = \frac1N\sum_i X_i$.

---
Kỳ vọng tuyến tính: $\mathbb{E}[\bar X] = \frac1N\sum_i \mathbb{E}[X_i] = \mu$. Trung bình mẫu là **ước lượng không chệch** của $\mu$.

---
Với các biến độc lập, phương sai của tổng bằng tổng phương sai (các số hạng chéo $\mathrm{Cov}(X_i, X_j)$ bằng 0):
$$\mathrm{Var}\Big(\sum_i X_i\Big) = N\sigma^2.$$

---
Nhân một biến với $c$ thì phương sai nhân $c^2$. Vậy
$$\mathrm{Var}(\bar X) = \frac{1}{N^2}\cdot N\sigma^2 = \frac{\sigma^2}{N}, \qquad \sigma_{\bar X} = \frac{\sigma}{\sqrt N}.$$

---
**Kết luận:** sai số của trung bình giảm theo $1/\sqrt N$. Muốn chính xác gấp 10 lần, cần số lần đo gấp **100** lần. Với đồng xu xác suất $p$: $\sigma^2 = p(1-p)$, nên sai số chuẩn của tỉ lệ đo được là $\sqrt{p(1-p)/N}$.
:::

Quay lại câu hỏi mở đầu: với $N = 10$ và $p = 0{,}5$, sai số chuẩn là $\sqrt{0{,}25/10} \approx 0{,}16$; tỉ lệ $0{,}7$ chỉ lệch khoảng $1{,}3\sigma$ — hoàn toàn có thể do may rủi. Với $N = 1000$, sai số chuẩn là $0{,}016$, và $0{,}7$ lệch tới $12\sigma$ — gần như chắc chắn đồng xu bị lệch.

:::theorem Hai định lý giới hạn
- **Luật số lớn:** $\bar X \to \mu$ khi $N \to \infty$.
- **Định lý giới hạn trung tâm:** phân phối của $\sqrt N(\bar X - \mu)/\sigma$ tiến tới phân phối chuẩn $\mathcal{N}(0, 1)$, *bất kể* phân phối ban đầu ra sao (miễn phương sai hữu hạn).
:::

:::sim probability
Ở tab **Luật số lớn**, để ý vùng mờ hẹp lại theo $1/\sqrt N$ (trục ngang là thang log). Ở tab **Giới hạn trung tâm**, chỉ cần cộng 3–4 xúc xắc là biểu đồ đã có hình chuông.
:::

:::physics
Với máy tính lượng tử, mỗi lần chạy mạch (một **shot**) cho ra một chuỗi bit ngẫu nhiên. Để ước lượng một xác suất hoặc một giá trị kỳ vọng với sai số $\varepsilon$, cần cỡ $1/\varepsilon^2$ shot. Đây là nút thắt thực tế của nhiều thuật toán biến phân ([[bien-phan]]): ước lượng năng lượng với độ chính xác hóa học ($\sim 10^{-3}$ Hartree) có thể cần hàng triệu shot.
:::

### Entropy: đo lượng bất định

Nếu một biến có phân phối $p(x)$, **entropy Shannon** là
$$H(X) = -\sum_x p(x)\log_2 p(x).$$

Nó đo số bit trung bình cần để ghi lại kết quả. Đồng xu cân đối: $H = 1$ bit. Đồng xu chắc chắn ngửa: $H = 0$. Entropy cực đại khi phân phối đều.

:::connect Một sợi chỉ xuyên suốt
*Xác suất → cơ học thống kê → entropy → lý thuyết thông tin → thông tin lượng tử → sửa lỗi lượng tử.* Boltzmann viết $S = k_B\ln W$ cho entropy nhiệt động; Shannon (1948) tìm lại cùng công thức khi đo thông tin; von Neumann mở rộng nó cho ma trận mật độ ([[ma-tran-mat-do]]). Ở [[bb84]], entropy nhị phân $h(Q)$ quyết định bao nhiêu khóa bí mật còn lại sau khi trừ đi thông tin kẻ nghe lén có thể biết; ở [[sua-loi]], entropy giới hạn lượng nhiễu một mã có thể chịu được.
:::

## Ví dụ

:::example Định lý Bayes
Một bài kiểm tra phát hiện bệnh với độ nhạy 99% và tỉ lệ dương tính giả 2%. Bệnh có tỉ lệ 1/1000 trong dân số. Người có kết quả dương tính thực sự mắc bệnh với xác suất
$$P(B\mid +) = \frac{P(+\mid B)P(B)}{P(+)} = \frac{0{,}99\cdot 0{,}001}{0{,}99\cdot0{,}001 + 0{,}02\cdot0{,}999} \approx 4{,}7\%.$$
Trực giác thường đoán 99%. Bài học: điều kiện hóa phải làm cẩn thận — cũng cần sự cẩn thận ấy khi phân tích “thông tin” mà phép đo lượng tử mang lại.
:::

:::exercise Bao nhiêu shot là đủ?
Một mạch lượng tử cho kết quả “1” với xác suất $p$ chưa biết, nghi là khoảng $0{,}3$. Cần bao nhiêu shot để sai số chuẩn của ước lượng nhỏ hơn $0{,}01$?
???solution
$\sqrt{p(1-p)/N} < 0{,}01 \iff N > p(1-p)/10^{-4} = 0{,}21 \times 10^4 = 2100$ shot. Nếu không biết $p$, dùng trường hợp xấu nhất $p = 0{,}5$: $N > 2500$.
:::

:::exercise Phân phối biên
Hai đồng xu có phân phối đồng thời $p(S,S) = p(N,N) = 0{,}5$, $p(S,N) = p(N,S) = 0$. Tính phân phối biên của từng đồng xu. Hai đồng xu có độc lập không? Tính tương quan $\mathbb{E}[XY]$ nếu gán $S = +1$, $N = -1$.
???solution
Mỗi đồng xu riêng lẻ: 50/50 — hoàn toàn ngẫu nhiên. Nhưng không độc lập: $p(S,S) = 0{,}5 \neq 0{,}25$. Tương quan $= 0{,}5(+1) + 0{,}5(+1) = 1$. Đây là một tương quan *cổ điển* hoàn hảo — như hai chiếc găng tay cùng một đôi. Ở [[roi-luong-tu]], ta sẽ thấy trạng thái Bell cho tương quan như thế **trong mọi cơ sở đo**, điều mà găng tay không làm được.
:::

:::quiz
Q: Bạn chạy một mạch 400 shot và ước lượng $p \approx 0{,}5$. Muốn sai số giảm một nửa, cần tổng cộng bao nhiêu shot?
- [ ] 800 || Sai số tỉ lệ với $1/\sqrt N$, không phải $1/N$.
- [x] 1600 || Giảm sai số 2 lần cần tăng $N$ lên $2^2 = 4$ lần.
- [ ] 4000 || Quá nhiều — tăng 10 lần làm sai số giảm $\sqrt{10} \approx 3{,}2$ lần.
:::

## Kết nối

- [[song-hat]]: xác suất lượng tử là bình phương của **biên độ**, và biên độ — không phải xác suất — mới là thứ được cộng.
- [[phep-do]]: quy tắc Born biến hình học của không gian Hilbert thành phân phối xác suất.
- [[ma-tran-mat-do]]: ma trận mật độ là sự kết hợp giữa xác suất cổ điển (thiếu thông tin) và chồng chập lượng tử.

## Hiểu lầm thường gặp

:::misconception “Sau 5 lần sấp liên tiếp, lần tiếp theo dễ ra ngửa hơn.”
Ngụy biện của con bạc. Các lần tung độc lập không có trí nhớ. Luật số lớn không hoạt động bằng cách “bù trừ” các kết quả trước, mà bằng cách *pha loãng* chúng trong số lượng lần tung khổng lồ.
:::

:::misconception “Xác suất lượng tử chỉ là xác suất cổ điển với một cái tên mới.”
Mỗi lần đo riêng lẻ thì đúng là một phân phối xác suất thông thường. Nhưng *các xác suất của các phép đo khác nhau trên cùng một trạng thái* không thể được giải thích bằng một phân phối đồng thời cổ điển duy nhất — đó là nội dung của định lý Bell và định lý Kochen–Specker.
:::

## Góc nhìn nghiên cứu

:::research
- **Ước lượng hiệu quả từ ít shot.** Kỹ thuật **classical shadows** (Huang, Kueng, Preskill, Nature Physics 2020) cho phép ước lượng đồng thời rất nhiều tính chất của một trạng thái lượng tử từ số phép đo chỉ tăng theo logarit của số tính chất cần ước lượng. Đây là ví dụ điển hình của việc thống kê thông minh thay đổi được giới hạn thực tế của phần cứng.
- **Kiểm định “lợi thế lượng tử”.** Các thí nghiệm lấy mẫu mạch ngẫu nhiên được đánh giá bằng các thống kê như *cross-entropy benchmarking*. Tranh luận về việc mô phỏng cổ điển có thể giả lập các thống kê đó hay không vẫn đang diễn ra.
:::
