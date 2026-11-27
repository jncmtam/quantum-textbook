:::question
Hai con sóng nước gặp nhau. Ở chỗ này chúng cộng lại thành sóng cao gấp đôi, ở chỗ khác chúng triệt tiêu thành mặt nước phẳng lặng. Làm sao một con số duy nhất có thể ghi lại cả “độ lớn” lẫn “nhịp” — để khi cộng hai con sóng, ta tự động biết chúng tăng cường hay triệt tiêu nhau?
:::

## Trực giác: con số có hướng

Một số thực chỉ có độ lớn và dấu. Hai số dương cộng lại luôn lớn hơn từng số. Nhưng thế giới có rất nhiều thứ *cộng lại có thể nhỏ đi*: hai sóng ngược pha, hai lực ngược chiều, hai dòng điện xoay chiều lệch nhịp.

Hãy tưởng tượng mỗi con số là **một mũi tên trên mặt phẳng**: độ dài mũi tên là độ lớn, góc của mũi tên là *pha* — nó đang ở thời điểm nào trong chu kỳ dao động. Cộng hai con số là đặt các mũi tên nối đuôi nhau. Hai mũi tên cùng hướng: tổng dài gấp đôi. Hai mũi tên ngược hướng: tổng bằng không.

Đó là toàn bộ trực giác về số phức. Phần còn lại của chương là biến trực giác này thành một công cụ chính xác.

:::sim phasor
Kéo đầu các mũi tên. Ở chế độ **Phép cộng**, hãy quan sát số hạng giao thoa $2\,\mathrm{Re}(z_1\bar z_2)$: nó dương khi hai mũi tên gần cùng hướng và âm khi chúng ngược hướng. Ở chế độ **Phép nhân**, để ý rằng các góc *cộng lại*.
:::

## Vì sao cần đến số phức?

Lịch sử thật ra không bắt đầu từ sóng, mà từ phương trình bậc ba. Thế kỷ XVI, Cardano và Bombelli phát hiện rằng công thức nghiệm của phương trình $x^3 = 15x + 4$ buộc họ đi qua đại lượng $\sqrt{-121}$ — dù nghiệm cuối cùng, $x = 4$, hoàn toàn là số thực. Các đại lượng “không thể có” ấy cứ xuất hiện ở giữa phép tính rồi biến mất ở cuối. Chúng bị gọi là số *ảo* (imaginary), một cái tên đầy nghi ngờ mà ta vẫn dùng đến hôm nay.

Phải tới thế kỷ XIX (Wessel, Argand, Gauss), người ta mới hiểu rằng số phức chẳng có gì “ảo”: chúng là các điểm trên mặt phẳng, và phép nhân với chúng là **phép quay kèm co giãn**. Từ đó, số phức trở thành công cụ tự nhiên cho mọi thứ dao động: mạch điện xoay chiều, quang học, sóng âm.

Trong cơ học lượng tử, vai trò của chúng còn sâu hơn — chúng không còn là *mẹo tính toán* mà là *một phần của định luật*. Ta sẽ thấy ở [[song-hat]] rằng không có số phức thì không mô tả được giao thoa của từng hạt riêng lẻ.

## Bản chất

Một số phức là một cặp số thực $(a, b)$, viết là $z = a + bi$, trong đó $i$ là một ký hiệu thỏa mãn đúng một quy tắc: $i^2 = -1$. Mọi phép tính khác là đại số thông thường.

- $a = \mathrm{Re}\,z$ là **phần thực**, $b = \mathrm{Im}\,z$ là **phần ảo**.
- Trên mặt phẳng phức, $z$ là điểm có tọa độ $(a, b)$.
- Độ dài của mũi tên, $|z| = \sqrt{a^2 + b^2}$, gọi là **mô-đun** (modulus).
- Góc $\varphi$ mà mũi tên tạo với trục thực gọi là **argument** hay **pha**.

Hai cách viết cùng một số: dạng *đại số* $a + bi$ (tiện cho phép cộng) và dạng *cực* $r(\cos\varphi + i\sin\varphi)$ (tiện cho phép nhân).

## Nền tảng toán học

### Các phép toán cơ bản

Cộng theo từng thành phần — giống cộng vectơ:
$$(a + bi) + (c + di) = (a + c) + (b + d)i.$$

Nhân bằng cách khai triển và dùng $i^2 = -1$:
$$(a + bi)(c + di) = ac + adi + bci + bd\,i^2 = (ac - bd) + (ad + bc)i.$$

:::definition Liên hợp phức
Liên hợp của $z = a + bi$ là $\bar z = a - bi$ (trong vật lý thường viết $z^*$). Về hình học, đó là phép phản xạ qua trục thực.
:::

Phép tính quan trọng nhất của cả cuốn sách là tích của một số với liên hợp của nó:
$$z\bar z = (a + bi)(a - bi) = a^2 - (bi)^2 = a^2 + b^2 = |z|^2.$$

Hãy để ý: kết quả luôn là **số thực không âm**. Đây là cách duy nhất để từ một số phức lấy ra một “độ lớn” thực. Trong cơ học lượng tử, xác suất sẽ được tính đúng theo cách này.

### Công thức Euler

:::derivation Vì sao $e^{i\varphi} = \cos\varphi + i\sin\varphi$?
Ta muốn tìm một hàm $f(\varphi)$ mô tả một điểm *chạy đều trên đường tròn đơn vị*. Chuyển động tròn đều có một tính chất: vận tốc luôn vuông góc với bán kính và có cùng độ lớn. Trên mặt phẳng phức, “quay 90°” chính là “nhân với $i$” (vì $i \cdot 1 = i$, $i \cdot i = -1$...). Vậy điều kiện là:
$$\frac{df}{d\varphi} = i\,f(\varphi), \qquad f(0) = 1.$$

---
Phương trình $f' = k f$ có nghiệm duy nhất $f = e^{k\varphi}$ (với điều kiện $f(0) = 1$). Vậy một cách tự nhiên ta **định nghĩa** $e^{i\varphi}$ là nghiệm của phương trình trên.

---
Kiểm tra ứng viên $g(\varphi) = \cos\varphi + i\sin\varphi$:
$$g'(\varphi) = -\sin\varphi + i\cos\varphi = i(\cos\varphi + i\sin\varphi) = i\,g(\varphi),$$
và $g(0) = 1$. Do nghiệm là duy nhất, $g = f$:
$$\boxed{e^{i\varphi} = \cos\varphi + i\sin\varphi.}$$

---
Một cách kiểm tra độc lập: khai triển Taylor $e^x = \sum x^n/n!$ với $x = i\varphi$, rồi tách các số hạng chẵn (có $i^{2k} = (-1)^k$, cho ra chuỗi của $\cos$) và lẻ (cho ra $i$ nhân chuỗi của $\sin$). Hai con đường cho cùng kết quả.
:::

Hệ quả: mọi số phức đều viết được dưới dạng
$$z = r\,e^{i\varphi}, \qquad r = |z|,\ \varphi = \arg z.$$

Và phép nhân trở nên trong suốt:
$$z_1 z_2 = r_1 r_2\, e^{i(\varphi_1 + \varphi_2)}.$$

**Độ lớn nhân với nhau, góc cộng với nhau.** Nhân với $e^{i\alpha}$ là quay mũi tên một góc $\alpha$ mà không thay đổi độ dài. Đây sẽ là hình ảnh trung tâm của tiến hóa lượng tử: theo thời gian, các biên độ xác suất *quay* trên mặt phẳng phức.

### Giao thoa trong một dòng

Cộng hai số phức rồi lấy bình phương mô-đun:
$$|z_1 + z_2|^2 = (z_1 + z_2)(\bar z_1 + \bar z_2) = |z_1|^2 + |z_2|^2 + z_1\bar z_2 + \bar z_1 z_2.$$

Hai số hạng cuối là liên hợp của nhau, nên tổng của chúng là $2\,\mathrm{Re}(z_1\bar z_2)$. Viết theo dạng cực:
$$|z_1 + z_2|^2 = r_1^2 + r_2^2 + 2r_1 r_2\cos(\varphi_1 - \varphi_2).$$

:::physics
Số hạng $2r_1r_2\cos(\varphi_1 - \varphi_2)$ là **số hạng giao thoa**. Nó chỉ phụ thuộc vào **độ lệch pha** $\varphi_1 - \varphi_2$, không phụ thuộc vào pha tuyệt đối. Khi hai pha bằng nhau, nó dương cực đại (tăng cường); khi lệch nhau $\pi$, nó âm cực đại (triệt tiêu). Toàn bộ hiện tượng giao thoa — từ vân sáng tối trên màn tới tốc độ của thuật toán Grover — đều sống trong số hạng này.
:::

### Pha toàn cục và pha tương đối

Nếu nhân **cả hai** số với cùng một $e^{i\alpha}$, độ lệch pha không đổi, nên $|z_1 + z_2|^2$ không đổi. Pha chung đó — **pha toàn cục** (global phase) — không ảnh hưởng tới bất kỳ đại lượng đo được nào. Chỉ có **pha tương đối** (relative phase) giữa các thành phần là có ý nghĩa vật lý. Chúng ta sẽ dùng sự kiện này liên tục ở [[trang-thai]] và [[qubit-bloch]].

## Ví dụ

:::example Nhân với $i$ là quay 90°
$z = 2 + i$. Khi đó $iz = 2i + i^2 = -1 + 2i$. Điểm $(2, 1)$ biến thành $(-1, 2)$: đúng là quay ngược chiều kim đồng hồ 90°, độ dài vẫn là $\sqrt 5$.
:::

:::example Căn bậc $n$ của đơn vị
Các nghiệm của $z^n = 1$ là $z_k = e^{2\pi i k/n}$, $k = 0, 1, \dots, n-1$: $n$ điểm chia đều đường tròn đơn vị. Tổng của chúng bằng 0 (với $n \ge 2$) — các mũi tên triệt tiêu nhau hoàn toàn. Đẳng thức nhỏ này là trái tim của biến đổi Fourier lượng tử trong [[qft-shor]].
:::

:::exercise Tính toán cơ bản
Cho $z_1 = 1 + i$ và $z_2 = 1 - i$. Tính $z_1 z_2$, $z_1/z_2$, $|z_1|$, và viết $z_1$ dưới dạng $re^{i\varphi}$.
???hint
Để chia, nhân cả tử và mẫu với liên hợp của mẫu: $\dfrac{z_1}{z_2} = \dfrac{z_1\bar z_2}{|z_2|^2}$.
???solution
$z_1z_2 = 1 - i^2 = 2$. $\dfrac{z_1}{z_2} = \dfrac{(1+i)(1+i)}{2} = \dfrac{1 + 2i - 1}{2} = i$. $|z_1| = \sqrt 2$. Góc của $z_1$ là $45°$, nên $z_1 = \sqrt2\,e^{i\pi/4}$. Kiểm tra bằng dạng cực: $z_2 = \sqrt2 e^{-i\pi/4}$, nên $z_1/z_2 = e^{i\pi/2} = i$. ✓
:::

:::exercise Khi nào giao thoa triệt tiêu hoàn toàn?
Với $|z_1| = |z_2| = r$, tìm điều kiện để $|z_1 + z_2| = 0$. Còn nếu $|z_1| \neq |z_2|$ thì có triệt tiêu hoàn toàn được không?
???solution
$|z_1+z_2|^2 = 2r^2(1 + \cos\Delta\varphi) = 0 \iff \Delta\varphi = \pi$. Nếu độ lớn khác nhau, giá trị nhỏ nhất là $(r_1 - r_2)^2 > 0$: triệt tiêu chỉ một phần. Trong thí nghiệm hai khe, đây là lý do vân tối không hoàn toàn tối khi một khe hẹp hơn khe kia.
:::

:::quiz
Q: Nhân **mọi** biên độ của một hệ với $e^{i\pi/3}$ thì điều gì thay đổi trong kết quả đo?
- [ ] Mọi xác suất bị nhân với $e^{i\pi/3}$ || Xác suất là $|z|^2$, và $|e^{i\alpha}z|^2 = |z|^2$.
- [ ] Các vân giao thoa dịch đi || Vân giao thoa phụ thuộc pha *tương đối*, mà pha tương đối không đổi.
- [x] Không có gì thay đổi || Đó là pha toàn cục — không quan sát được.
:::

## Kết nối

- Chương sau, [[vecto]], xây dựng **vectơ với tọa độ phức**. Mọi tính chất của tích trong phức (vì sao phải lấy liên hợp) đến từ đẳng thức $z\bar z = |z|^2$.
- Ở [[song-hat]], số hạng giao thoa $2r_1r_2\cos\Delta\varphi$ sẽ giải thích vân sáng tối của *từng electron riêng lẻ*.
- Ở [[schrodinger]], nghiệm của phương trình Schrödinger có dạng $e^{-iEt/\hbar}$: mỗi trạng thái năng lượng là một mũi tên quay với tần số tỉ lệ năng lượng.
- Ở [[qft-shor]], tổng các căn của đơn vị bằng 0 là lý do biến đổi Fourier lượng tử “lọc” ra chu kỳ.

## Hiểu lầm thường gặp

:::misconception “Số ảo không có thật, chỉ là công cụ tính toán.”
Trong cơ học cổ điển, đúng là ta có thể làm mọi thứ bằng số thực (số phức chỉ làm gọn). Nhưng trong cơ học lượng tử chuẩn, biên độ phức là cấu trúc thiết yếu. Năm 2021–2022, các nhóm nghiên cứu đã đề xuất và thực hiện thí nghiệm (dạng mạng Bell) cho thấy một lý thuyết lượng tử dùng *chỉ số thực* (với cấu trúc tích tensor chuẩn) đưa ra tiên đoán khác lý thuyết phức — và thí nghiệm ủng hộ lý thuyết phức.
:::

:::misconception “Pha của một số phức đơn lẻ có ý nghĩa vật lý.”
Chỉ có pha **tương đối** là đo được. Pha toàn cục giống như việc chọn thời điểm bắt đầu bấm đồng hồ: đổi nó không thay đổi bất cứ hiện tượng nào.
:::

## Góc nhìn nghiên cứu

:::research
- **Cơ học lượng tử có cần số phức không?** Câu hỏi này từng được coi là triết học, nhưng đã trở thành câu hỏi thực nghiệm: Renou và cộng sự (Nature, 2021) chỉ ra một kịch bản mạng phân biệt được lý thuyết thực và phức; các thí nghiệm sau đó với photon và qubit siêu dẫn đã kiểm chứng.
- **Pha là tài nguyên.** Trong đo lường lượng tử (quantum metrology), thông tin cần ước lượng thường được mã hóa vào một pha tương đối; độ chính xác ước lượng pha là thước đo trung tâm của cảm biến lượng tử.
- **Pha hình học (pha Berry).** Khi một hệ được dẫn chậm qua một vòng kín trong không gian tham số, nó tích lũy một pha chỉ phụ thuộc vào *hình học* của đường đi. Ý tưởng này là nền móng của pha tô-pô trong vật liệu và của một số đề xuất cổng lượng tử chịu nhiễu.
:::

:::status experimental
Kết luận “lý thuyết lượng tử dùng số thực bị loại trừ” là kết quả thực nghiệm dựa trên những giả định cụ thể (các nguồn độc lập, cấu trúc tích tensor). Nó không có nghĩa là mọi mô hình dùng số thực đều bị loại.
:::
