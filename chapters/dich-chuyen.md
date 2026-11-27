:::question
Bạn có một qubit ở trạng thái $|\psi\rangle$ mà chính bạn không biết. Bạn muốn gửi nó cho một người bạn ở thành phố khác, nhưng chỉ có điện thoại (kênh cổ điển). Đo nó rồi đọc kết quả qua điện thoại? Phép đo chỉ cho một bit và phá hủy trạng thái. Sao chép nó trước rồi đo nhiều bản? Hóa ra không sao chép được. Vậy có cách nào không?
:::

## Trực giác

Có — nếu bạn và người bạn **đã chia sẻ trước** một cặp qubit rối. Rối là một “kênh” không chở thông tin gì cả, nhưng khi kết hợp với 2 bit cổ điển, nó chở trọn một qubit. Đó là **dịch chuyển lượng tử** (quantum teleportation, Bennett và cộng sự, 1993).

Nhưng trước hết phải hiểu vì sao cách ngây thơ — sao chép — là bất khả.

## Định lý không sao chép

:::theorem No-cloning (Wootters–Zurek, Dieks, 1982)
Không tồn tại phép biến đổi unita $U$ nào sao cho với **mọi** trạng thái $|\psi\rangle$:
$$U\big(|\psi\rangle|0\rangle\big) = |\psi\rangle|\psi\rangle.$$
:::

:::derivation Chứng minh (hai dòng)
Giả sử $U$ sao chép được hai trạng thái $|\psi\rangle$ và $|\phi\rangle$. Phép biến đổi unita bảo toàn tích trong, nên
$$\langle\phi|\psi\rangle\cdot\langle0|0\rangle = \big(\langle\phi|\langle\phi|\big)\big(|\psi\rangle|\psi\rangle\big) = \langle\phi|\psi\rangle^2.$$

---
Vậy $\langle\phi|\psi\rangle = \langle\phi|\psi\rangle^2$, tức $\langle\phi|\psi\rangle \in \{0, 1\}$. Chỉ những trạng thái **trực giao** hoặc **trùng nhau** mới có thể cùng được sao chép. Không thể sao chép $|0\rangle$ và $|{+}\rangle$ bằng cùng một máy. (Lập luận bằng tính tuyến tính cũng cho kết quả tương tự.)
:::

:::physics
- Máy tính cổ điển sao chép bit thoải mái — bit là các trạng thái trực giao $|0\rangle, |1\rangle$. CNOT sao chép đúng hai trạng thái này: $|a\rangle|0\rangle\mapsto|a\rangle|a\rangle$. Nhưng trên $|{+}\rangle$, CNOT tạo ra trạng thái Bell, không phải $|{+}\rangle|{+}\rangle$.
- Không sao chép là **nền tảng an toàn** của mật mã lượng tử ([[bb84]]): kẻ nghe lén không thể giữ một bản sao rồi chuyển tiếp bản gốc.
- Nó cũng là lý do sửa lỗi lượng tử khó hơn sửa lỗi cổ điển: không thể dùng mã lặp “sao ba bản” ([[sua-loi]]).
:::

## Mã hóa siêu đặc: 1 qubit chở 2 bit

Trước khi dịch chuyển, hãy xem giao thức “ngược” của nó. Alice và Bob chia sẻ $|\Phi^+\rangle$. Alice muốn gửi 2 bit $(b_1, b_2)$ nhưng chỉ gửi **một** qubit.

- Alice áp lên qubit của mình: $I$ (cho 00), $X$ (01), $Z$ (10), $ZX$ (11).
- Bốn kết quả chính là bốn trạng thái Bell trực giao: $|\Phi^+\rangle, |\Psi^+\rangle, |\Phi^-\rangle, |\Psi^-\rangle$ (sai khác pha).
- Alice gửi qubit của mình cho Bob. Bob làm phép đo Bell trên hai qubit, đọc ra 2 bit.

Không mâu thuẫn với giới hạn Holevo: tổng cộng có **hai** qubit tham gia; một trong số đó được gửi trước (lúc chia sẻ rối). (Preset “Mã hóa siêu đặc” trong mô phỏng.)

## Dịch chuyển lượng tử

:::derivation Toán học của dịch chuyển
Alice có qubit 0 ở trạng thái $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$. Qubit 1 (của Alice) và qubit 2 (của Bob) ở $|\Phi^+\rangle$. Trạng thái ban đầu:
$$|\psi\rangle_0|\Phi^+\rangle_{12} = \tfrac{1}{\sqrt2}\big(\alpha|0\rangle(|00\rangle + |11\rangle) + \beta|1\rangle(|00\rangle + |11\rangle)\big).$$

---
Alice áp CNOT (điều khiển 0, đích 1):
$$\tfrac1{\sqrt2}\big(\alpha|0\rangle(|00\rangle + |11\rangle) + \beta|1\rangle(|10\rangle + |01\rangle)\big).$$

---
Alice áp $H$ lên qubit 0 ($|0\rangle\to\tfrac{|0\rangle + |1\rangle}{\sqrt2}$, $|1\rangle\to\tfrac{|0\rangle - |1\rangle}{\sqrt2}$):
$$\tfrac12\big(\alpha(|0\rangle + |1\rangle)(|00\rangle + |11\rangle) + \beta(|0\rangle - |1\rangle)(|10\rangle + |01\rangle)\big).$$

---
Nhóm lại theo hai qubit của Alice (qubit 0, 1):
$$\tfrac12\Big[|00\rangle(\alpha|0\rangle + \beta|1\rangle) + |01\rangle(\alpha|1\rangle + \beta|0\rangle) + |10\rangle(\alpha|0\rangle - \beta|1\rangle) + |11\rangle(\alpha|1\rangle - \beta|0\rangle)\Big].$$

---
Alice đo hai qubit của mình, được $m_0m_1$ (mỗi kết quả xác suất $1/4$). Qubit của Bob tương ứng là:

| Kết quả của Alice | Trạng thái của Bob | Bob cần áp |
|---|---|---|
| 00 | $\alpha|0\rangle + \beta|1\rangle$ | $I$ |
| 01 | $\alpha|1\rangle + \beta|0\rangle$ | $X$ |
| 10 | $\alpha|0\rangle - \beta|1\rangle$ | $Z$ |
| 11 | $\alpha|1\rangle - \beta|0\rangle$ | $ZX$ |

Alice gọi điện báo 2 bit; Bob áp $X^{m_1}$ rồi $Z^{m_0}$ và thu được đúng $|\psi\rangle$.
:::

:::sim circuit {"preset":"teleport"}
Qubit 0 được chuẩn bị ở một trạng thái “bí mật” (Ry rồi Rz). Phiên bản này dùng **nguyên lý đo trì hoãn**: thay “đo rồi gửi bit, Bob áp cổng theo bit” bằng CNOT và CZ được điều khiển lượng tử — tương đương về kết quả. So sánh quả cầu Bloch của q2 ở cuối mạch với q0 ở cột 2 (kéo thanh trượt): chúng trùng nhau. Đổi preset sang “Dịch chuyển lượng tử (có phép đo)” và bấm “Chạy lại” nhiều lần: kết quả đo của Alice thay đổi ngẫu nhiên, nhưng q2 luôn ra cùng một trạng thái.
:::

### Những điều dịch chuyển KHÔNG làm

- **Không nhanh hơn ánh sáng:** trước khi nhận 2 bit, trạng thái của Bob là $\tfrac12I$ (trung bình trên 4 kết quả) — không chứa thông tin gì về $|\psi\rangle$.
- **Không sao chép:** bản gốc ở Alice bị phá hủy bởi phép đo. Định lý không sao chép vẫn nguyên vẹn.
- **Không dịch chuyển vật chất:** chỉ trạng thái (thông tin lượng tử) được chuyển; Bob phải có sẵn một qubit vật lý.
- **Tiêu thụ tài nguyên:** mỗi lần dịch chuyển dùng hết 1 ebit rối và 2 bit cổ điển. Hệ thức tài nguyên: $1\text{ ebit} + 2\text{ cbit} \ge 1\text{ qubit}$; mã hóa siêu đặc cho chiều ngược lại: $1\text{ ebit} + 1\text{ qubit} \ge 2\text{ cbit}$.

## Bài tập

:::exercise Bob không biết gì trước khi nhận cuộc gọi
Từ bảng ở trên, tính ma trận mật độ của Bob khi lấy trung bình trên 4 kết quả của Alice. Chứng minh nó bằng $\tfrac12I$ với mọi $\alpha, \beta$.
???solution
$\rho_B = \tfrac14\sum_{P\in\{I, X, Z, XZ\}}P|\psi\rangle\langle\psi|P^\dagger$. Đây là kênh khử cực hoàn toàn (completely depolarizing): với vectơ Bloch $\vec r$, $X$ đổi dấu $r_y, r_z$; $Z$ đổi dấu $r_x, r_y$; $XZ$ đổi dấu $r_x, r_z$. Trung bình bốn vectơ $(r_x, r_y, r_z), (r_x,-r_y,-r_z), (-r_x,-r_y,r_z), (-r_x, r_y, -r_z)$ bằng $0$. Vậy $\rho_B = \tfrac12I$.
:::

:::exercise Hoán đổi rối
Alice–Bob chia sẻ một cặp Bell (qubit 1–2), Bob–Charlie chia sẻ một cặp khác (qubit 3–4). Bob làm phép đo Bell trên qubit 2 và 3 rồi báo kết quả. Chuyện gì xảy ra với qubit 1 và 4, dù chúng chưa từng tương tác?
???solution
Đây là dịch chuyển của “một nửa cặp Bell”: Bob dịch chuyển trạng thái của qubit 2 (vốn rối với 1) sang qubit 4. Sau hiệu chỉnh, qubit 1 và 4 ở trạng thái Bell. Gọi là **hoán đổi rối** (entanglement swapping) — viên gạch cơ bản của bộ lặp lượng tử (quantum repeater) và mạng Internet lượng tử.
:::

:::quiz
Q: Trong dịch chuyển lượng tử, nếu Alice làm mọi thứ nhưng quên gọi điện cho Bob, Bob có trạng thái gì?
- [ ] $|\psi\rangle$ với xác suất 1/4 || Đúng là trong 1/4 trường hợp Bob có $|\psi\rangle$, nhưng Bob không biết đó là trường hợp nào; mô tả đúng cho Bob là trung bình.
- [x] $\tfrac12 I$ — không có thông tin gì về $|\psi\rangle$ || Không có 2 bit cổ điển, rối một mình không truyền thông tin.
- [ ] $|\psi\rangle$ — dịch chuyển đã xảy ra tức thời || Nếu vậy sẽ truyền được thông tin nhanh hơn ánh sáng.
:::

## Kết nối

- **Nền tảng:** [[roi-luong-tu]], [[cong-mach]], [[phep-do]].
- **Ứng dụng:** mạng lượng tử, máy tính lượng tử phân tán, **dịch chuyển cổng** (gate teleportation) — cách chuẩn để thực hiện cổng $T$ trong máy tính chịu lỗi ([[sua-loi]]).

## Hiểu lầm thường gặp

:::misconception “Dịch chuyển lượng tử có thể đưa người đi xa như trong phim.”
Chỉ trạng thái lượng tử được chuyển, cần một hệ nhận có sẵn, và cần đo hoàn hảo toàn bộ trạng thái của hệ gửi — với vật vĩ mô, điều đó hoàn toàn ngoài tầm với và có lẽ không có ý nghĩa thực tế.
:::

## Góc nhìn nghiên cứu

:::research
- **Thí nghiệm:** dịch chuyển photon đầu tiên năm 1997 (Bouwmeester và cộng sự, Innsbruck; Boschi và cộng sự, Rome). Năm 2017, vệ tinh Micius (Trung Quốc) dịch chuyển trạng thái photon từ mặt đất lên quỹ đạo, khoảng cách tới 1 400 km (Ren và cộng sự, Nature).
- **Internet lượng tử:** chuỗi hoán đổi rối, bộ nhớ lượng tử và chưng cất rối (entanglement distillation) để phân phối rối qua khoảng cách lớn. Năm 2022, nhóm Delft dịch chuyển qubit giữa hai nút không kề nhau trong một mạng ba nút (Hermans và cộng sự, Nature). Thách thức: bộ nhớ lượng tử có thời gian sống dài và giao diện hiệu suất cao giữa photon và vật chất.
:::
