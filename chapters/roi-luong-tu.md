:::question
Bỏ một chiếc găng tay trái và một chiếc găng tay phải vào hai hộp, gửi một hộp lên Mặt Trăng. Mở hộp ở Trái Đất, thấy găng trái — bạn biết ngay hộp kia chứa găng phải. Không có gì bí ẩn. Năm 1935, Einstein lập luận rằng tương quan lượng tử cũng chỉ là chuyện găng tay như vậy. Năm 1964, John Bell chỉ ra rằng có thể **kiểm tra bằng thí nghiệm** liệu Einstein đúng hay sai. Kết quả là gì?
:::

## Trực giác: găng tay không đủ

Hai qubit ở trạng thái Bell $|\Phi^+\rangle = \tfrac1{\sqrt2}(|00\rangle + |11\rangle)$ luôn cho kết quả giống nhau khi cả hai được đo theo Z. Găng tay làm được điều đó. Nhưng trạng thái Bell còn làm được hơn: nếu cả hai được đo theo X, kết quả *cũng* luôn giống nhau. Theo bất kỳ trục nào, miễn là cùng trục, kết quả luôn giống nhau — dù từng kết quả riêng lẻ là hoàn toàn ngẫu nhiên.

Có thể nào mỗi qubit mang sẵn một “bảng tra” bí mật, ghi trước kết quả cho mọi trục có thể đo? Bell chứng minh: nếu vậy, tương quan giữa các trục **khác nhau** phải thỏa một bất đẳng thức. Cơ học lượng tử vi phạm bất đẳng thức đó. Và thí nghiệm đứng về phía cơ học lượng tử.

## Vì sao điều này quan trọng?

**EPR (1935)** lập luận: nếu đo hạt A cho phép tiên đoán chắc chắn kết quả đo hạt B ở xa mà không làm nhiễu B, thì kết quả của B phải là một “yếu tố của thực tại” có từ trước. Vì điều đó đúng cho cả vị trí lẫn động lượng (hai đại lượng không giao hoán), cơ học lượng tử — vốn không gán giá trị đồng thời cho chúng — phải là **chưa đầy đủ**. Họ ngầm giả định hai nguyên lý:
- **Hiện thực** (realism): kết quả đo được quyết định bởi các tính chất có sẵn (biến ẩn $\lambda$).
- **Cục bộ** (locality): những gì làm ở A không ảnh hưởng tức thời tới B.

Trong gần 30 năm, đây được coi là tranh luận triết học. Bell biến nó thành một câu hỏi có thể đo.

## Nền tảng toán học: bất đẳng thức CHSH

Alice chọn một trong hai phép đo $A_0, A_1$; Bob chọn một trong hai $B_0, B_1$. Mỗi phép đo cho kết quả $\pm1$. Gọi $E(A_x, B_y)$ là tương quan — trung bình của tích hai kết quả.

:::derivation Mọi lý thuyết biến ẩn địa phương đều thỏa $|S| \le 2$
Giả sử có biến ẩn $\lambda$ (phân bố $p(\lambda)$) quyết định trước kết quả: $a_x(\lambda), b_y(\lambda) \in \{\pm1\}$. **Cục bộ** nghĩa là $a_x$ không phụ thuộc lựa chọn $y$ của Bob và ngược lại.

---
Với mỗi $\lambda$, xét
$$s(\lambda) = a_0(b_0 - b_1) + a_1(b_0 + b_1).$$

---
Vì $b_0, b_1 \in \{\pm1\}$, hoặc $b_0 = b_1$ (khi đó $b_0 - b_1 = 0$ và $b_0 + b_1 = \pm2$), hoặc $b_0 = -b_1$ (khi đó $b_0 + b_1 = 0$ và $b_0 - b_1 = \pm2$). Trong cả hai trường hợp, đúng một ngoặc bằng $\pm2$ và ngoặc kia bằng 0. Vậy $s(\lambda) = \pm2$.

---
Lấy trung bình trên $\lambda$:
$$S = E(A_0,B_0) - E(A_0,B_1) + E(A_1,B_0) + E(A_1,B_1) = \int s(\lambda)p(\lambda)\,d\lambda,$$
và vì $|s(\lambda)| = 2$:
$$\boxed{|S| \le 2.}$$
Đây là **bất đẳng thức CHSH** (Clauser, Horne, Shimony, Holt, 1969). Không có gì lượng tử trong chứng minh: chỉ là số học với $\pm1$.
:::

:::derivation Cơ học lượng tử đạt $S = 2\sqrt2$
Với $|\Phi^+\rangle$ và các phép đo trong mặt phẳng $x$–$z$, $A(\alpha) = \cos\alpha\,Z + \sin\alpha\,X$: tính trực tiếp (dùng $\langle\Phi^+|Z\otimes Z|\Phi^+\rangle = \langle\Phi^+|X\otimes X|\Phi^+\rangle = 1$, $\langle\Phi^+|Z\otimes X|\Phi^+\rangle = 0$):
$$E(\alpha, \beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta = \cos(\alpha - \beta).$$

---
Chọn $\alpha_0 = 0$, $\alpha_1 = \pi/2$ cho Alice và $\beta_0 = \pi/4$, $\beta_1 = 3\pi/4$ cho Bob. Bốn tương quan:
$$E(0, \tfrac\pi4) = \tfrac1{\sqrt2},\quad E(0, \tfrac{3\pi}4) = -\tfrac1{\sqrt2},\quad E(\tfrac\pi2, \tfrac\pi4) = \tfrac1{\sqrt2},\quad E(\tfrac\pi2, \tfrac{3\pi}{4}) = \tfrac1{\sqrt2}.$$

---
Thay vào $S = E_{00} - E_{01} + E_{10} + E_{11}$:
$$S = \tfrac{1}{\sqrt2} + \tfrac1{\sqrt2} + \tfrac1{\sqrt2} + \tfrac1{\sqrt2} = 2\sqrt2 \approx 2{,}83 > 2.$$
Bí quyết của cách chọn góc: ba cặp cách nhau $45°$ (tương quan dương lớn), cặp còn lại cách nhau $135°$ (tương quan âm lớn) — và dấu trừ trong $S$ biến nó thành đóng góp dương. Không bảng tra cổ điển nào làm cả bốn số hạng cùng lớn như vậy.

---
Tsirelson (1980) chứng minh $2\sqrt2$ là giá trị **lớn nhất** mà cơ học lượng tử cho phép. Vậy có ba “thế giới”: cổ điển $|S| \le 2$; lượng tử $|S| \le 2\sqrt2$; và các lý thuyết giả định chỉ tôn trọng nguyên lý không truyền tín hiệu, có thể đạt tới 4 (hộp Popescu–Rohrlich). Vì sao tự nhiên dừng ở $2\sqrt2$ là một câu hỏi nền tảng thú vị.
:::

:::sim chsh
Bấm “Góc tối ưu Tsirelson” rồi chơi 2000 vòng: $S$ đo được dao động quanh 2,83, tỉ lệ thắng khoảng 85%, trong khi mô hình biến ẩn không bao giờ vượt 75%. Giảm độ rối $p$ dưới $1/\sqrt2 \approx 0{,}707$: vi phạm biến mất dù trạng thái vẫn còn rối (cho tới $p = 1/3$). (Mô phỏng này dùng góc phân cực, nên các góc là một nửa góc trong phép tính ở trên.)
:::

### Diễn giải dưới dạng trò chơi

Một trọng tài gửi cho Alice bit ngẫu nhiên $x$, cho Bob bit ngẫu nhiên $y$. Họ không được liên lạc, và phải trả lời các bit $a, b$. Họ thắng nếu $a\oplus b = x\wedge y$. Chiến lược cổ điển tốt nhất (ví dụ: luôn trả lời 0) thắng 75%. Chia sẻ một cặp Bell, họ thắng $\cos^2(\pi/8) \approx 85{,}4\%$. Rối lượng tử không cho phép truyền tin, nhưng cho phép **phối hợp** tốt hơn mọi tài nguyên cổ điển.

## Thí nghiệm

:::status experimental
- **Freedman–Clauser (1972), Aspect và cộng sự (1982):** vi phạm CHSH với photon; Aspect thay đổi phép đo trong khi photon đang bay để đóng một phần “lỗ hổng cục bộ”.
- **2015 — các thí nghiệm không lỗ hổng:** Hensen và cộng sự (Delft, spin điện tử trong kim cương cách nhau 1,3 km), Giustina và cộng sự (Vienna), Shalm và cộng sự (NIST) đồng thời đóng lỗ hổng cục bộ và lỗ hổng phát hiện.
- **Giải Nobel Vật lý 2022:** Aspect, Clauser và Zeilinger.

Các lý thuyết biến ẩn địa phương bị loại trừ, với những giả định còn lại tối thiểu (như lựa chọn phép đo là độc lập với biến ẩn — “tự do lựa chọn”).
:::

## Đo lường rối

- Với trạng thái thuần $|\psi\rangle_{AB}$: **entropy rối** $E = S(\rho_A)$, với cặp Bell là 1 ebit.
- **Phân tách Schmidt:** mọi trạng thái thuần hai phần viết được là $\sum_k\sqrt{\lambda_k}|a_k\rangle|b_k\rangle$ với $\{|a_k\rangle\}, \{|b_k\rangle\}$ trực chuẩn. Trạng thái là rối khi và chỉ khi có hơn một hệ số Schmidt khác 0.
- Với trạng thái hỗn hợp, xác định rối là bài toán khó (NP-khó trong trường hợp tổng quát). Với hai qubit, tiêu chí **chuyển vị riêng phần** (Peres–Horodecki) là cần và đủ.

:::warning Rối không có nghĩa là vi phạm Bell
Mọi trạng thái thuần rối đều vi phạm một bất đẳng thức Bell nào đó (định lý Gisin). Nhưng có những trạng thái **hỗn hợp** rối không vi phạm bất kỳ bất đẳng thức Bell nào (trạng thái Werner với $1/3 < p \le$ một ngưỡng nhất định). Rối, phi định xứ (nonlocality) và *steering* là ba khái niệm khác nhau, lồng vào nhau.
:::

## Bài tập

:::exercise Tương quan trong cơ sở X
Chứng minh rằng $|\Phi^+\rangle = \tfrac1{\sqrt2}(|{+}{+}\rangle + |{-}{-}\rangle)$. Suy ra rằng đo cả hai qubit theo X luôn cho kết quả giống nhau.
???solution
$|{+}{+}\rangle + |{-}{-}\rangle = \tfrac12[(|0\rangle + |1\rangle)(|0\rangle + |1\rangle) + (|0\rangle - |1\rangle)(|0\rangle - |1\rangle)] = \tfrac12[2|00\rangle + 2|11\rangle]$. Nhân $\tfrac1{\sqrt2}$ được $|\Phi^+\rangle$. Trạng thái có dạng “giống nhau” trong cả hai cơ sở — điều mà hai găng tay không làm được: găng tay chỉ có tương quan trong một “cơ sở” (trái/phải).
:::

:::exercise Không truyền tín hiệu
Alice và Bob chia sẻ $|\Phi^+\rangle$. Alice hoặc đo theo Z, hoặc đo theo X, hoặc không đo gì. Chứng minh rằng trong cả ba trường hợp, trạng thái rút gọn của Bob (trung bình trên kết quả của Alice mà Bob không biết) là $\tfrac12I$. Kết luận gì về khả năng truyền tin bằng rối?
???solution
Không đo: $\rho_B = \tfrac12I$ (đã tính ở [[ma-tran-mat-do]]). Đo Z: với xác suất 1/2 Bob có $|0\rangle$, 1/2 có $|1\rangle$; trung bình $\tfrac12I$. Đo X: 1/2 có $|{+}\rangle$, 1/2 có $|{-}\rangle$; trung bình cũng là $\tfrac12I$ (câu đố mở đầu chương trước!). Bob không thể biết Alice đã làm gì: **rối không truyền được thông tin**. Mọi lợi thế chỉ hiện ra khi hai bên so sánh kết quả qua một kênh cổ điển.
:::

:::quiz
Q: Thí nghiệm Bell vi phạm $|S| \le 2$. Điều đó bác bỏ chính xác giả thuyết nào?
- [ ] Thuyết tương đối hẹp || Vi phạm Bell không cho phép truyền tín hiệu nhanh hơn ánh sáng, nên không mâu thuẫn với tương đối hẹp.
- [x] Tồn tại các biến ẩn **địa phương** quyết định trước mọi kết quả đo || Chính xác: phải bỏ ít nhất một trong hai — hiện thực (theo nghĩa giá trị xác định trước) hoặc cục bộ (theo nghĩa của Bell).
- [ ] Tồn tại mọi loại biến ẩn || Lý thuyết biến ẩn *phi địa phương* (như cơ học Bohm) vẫn tái tạo được mọi tiên đoán lượng tử.
:::

## Kết nối

- **Nền tảng:** [[tensor]], [[spin]], [[ma-tran-mat-do]].
- **Ứng dụng:** [[dich-chuyen]] (rối + 2 bit cổ điển = chuyển một qubit), [[bb84]] và giao thức Ekert E91 (an toàn từ vi phạm Bell), [[sua-loi]] (thông tin lượng tử được bảo vệ bằng cách “giấu” nó trong rối của nhiều qubit).

## Hiểu lầm thường gặp

:::misconception “Rối cho phép truyền tin tức thời.”
Bài tập “không truyền tín hiệu” ở trên là một chứng minh rằng không thể. Tương quan chỉ hiện ra khi so sánh dữ liệu hai bên — việc đó cần kênh cổ điển, bị giới hạn bởi tốc độ ánh sáng.
:::

:::misconception “Đo hạt A làm thay đổi hạt B một cách vật lý.”
Thống kê cục bộ của B không thay đổi. Việc có “ảnh hưởng” hay chỉ là “cập nhật thông tin” phụ thuộc vào cách diễn giải; điều chắc chắn là không tồn tại mô hình biến ẩn địa phương nào, và cũng không có tín hiệu nào được truyền.
:::

## Góc nhìn nghiên cứu

:::research
- **Bảo mật độc lập thiết bị** (device-independent cryptography): nếu đo được $S > 2$, an toàn của khóa có thể được chứng minh *mà không cần tin vào thiết bị* — kể cả khi thiết bị do kẻ thù sản xuất. Thí nghiệm DIQKD đầu tiên được báo cáo năm 2022 (Nadlinger và cộng sự, Nature; Zhang và cộng sự, Nature).
- **Tự kiểm tra** (self-testing): vi phạm Bell tối đa xác định duy nhất (sai khác phép biến đổi cục bộ) trạng thái và phép đo — một cách chứng nhận thiết bị lượng tử chỉ từ thống kê đầu vào–đầu ra.
- **Mạng Bell và lý thuyết nhân quả lượng tử**: tương quan trong mạng nhiều nguồn độc lập, liên hệ với câu hỏi về số phức ở [[so-phuc]].
- Định lý **MIP\* = RE** (Ji, Natarajan, Vidick, Wright, Yuen, 2020) — một kết quả về trò chơi phi định xứ — đã giải quyết bài toán nhúng Connes trong đại số toán tử, cho thấy chiều sâu bất ngờ của trò chơi CHSH và các mở rộng của nó.
:::
