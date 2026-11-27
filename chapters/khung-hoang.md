:::question
Năm 1900, nhiều nhà vật lý tin rằng ngành của họ gần như đã hoàn tất: cơ học Newton, điện từ học Maxwell và nhiệt động lực học giải thích được hầu hết mọi thứ. Chỉ còn “vài đám mây nhỏ” trên bầu trời. Vì sao vài đám mây đó lại đánh sập cả bức tranh?
:::

## Trực giác: khi lý thuyết tốt nhất cho câu trả lời vô lý

Một lý thuyết sai thường cho câu trả lời *hơi lệch*. Điều đáng sợ ở năm 1900 là vật lý cổ điển cho những câu trả lời **vô lý một cách tuyệt đối**: một lò nung nóng phải phát ra năng lượng vô hạn; mọi nguyên tử phải sụp đổ trong một phần trăm tỷ giây. Khi một lý thuyết đã được kiểm chứng hàng trăm năm lại đưa ra kết luận như vậy, vấn đề không nằm ở chi tiết, mà ở **giả định nền tảng**.

Chương này kể lại ba “đám mây” ấy. Không phải để học lịch sử cho vui, mà vì mỗi đám mây để lại một nguyên lý mà ta sẽ dùng mãi về sau: **năng lượng bị lượng tử hóa**, **ánh sáng đến từng hạt**, và **nguyên tử chỉ có những trạng thái rời rạc**.

## Đám mây thứ nhất: bức xạ vật đen

Mọi vật nóng đều phát sáng: thanh sắt nung đổi từ đỏ sang cam rồi trắng. Một **vật đen** (black body) lý tưởng hấp thụ mọi bức xạ chiếu tới và phát xạ một phổ chỉ phụ thuộc vào nhiệt độ. Thí nghiệm đo phổ này rất chính xác vào cuối thế kỷ XIX.

:::derivation Vì sao vật lý cổ điển dự đoán “thảm họa tử ngoại”
Xét bức xạ trong một hộp kín. Sóng điện từ trong hộp là tổng của các **mode dừng** — giống các họa âm trên dây đàn, nhưng ba chiều. Đếm số mode có tần số trong khoảng $[\nu, \nu + d\nu]$ (trong một đơn vị thể tích) cho:
$$g(\nu)\,d\nu = \frac{8\pi\nu^2}{c^3}\,d\nu.$$
Số mode tăng theo $\nu^2$: tần số càng cao, càng nhiều cách để sóng “vừa” trong hộp.

---
Định lý **phân bố đều năng lượng** của cơ học thống kê cổ điển nói rằng ở cân bằng nhiệt độ $T$, mỗi mode dao động có năng lượng trung bình $k_BT$ (Boltzmann).

---
Nhân hai thứ lại, ta được định luật Rayleigh–Jeans cho mật độ năng lượng:
$$u(\nu) = \frac{8\pi\nu^2}{c^3}\,k_BT.$$

---
Định luật này khớp thí nghiệm ở tần số thấp. Nhưng tích phân trên mọi tần số: $\int_0^\infty u(\nu)\,d\nu = \infty$. Lò nung phải phát ra năng lượng vô hạn, chủ yếu ở vùng tử ngoại và cao hơn. Thực tế, phổ đo được tăng rồi **giảm** về 0 ở tần số cao.
:::

### Lời giải của Planck (1900)

Planck tìm ra một công thức khớp hoàn hảo dữ liệu, và sau đó tìm cách giải thích nó. Giải thích đòi hỏi một giả định mà chính ông gọi là “hành động tuyệt vọng”:

:::definition Giả thuyết lượng tử của Planck
Một dao động tử tần số $\nu$ chỉ có thể trao đổi năng lượng theo từng phần nguyên của một lượng tử:
$$E = n\,h\nu, \qquad n = 0, 1, 2, \dots$$
với $h \approx 6{,}626\times10^{-34}\ \mathrm{J\cdot s}$ là **hằng số Planck**.
:::

:::derivation Năng lượng trung bình của một mode khi năng lượng bị lượng tử hóa
Theo phân bố Boltzmann, xác suất mode có năng lượng $E_n = nh\nu$ tỉ lệ với $e^{-E_n/k_BT}$. Đặt $x = h\nu/k_BT$. Năng lượng trung bình:
$$\langle E\rangle = \frac{\sum_n nh\nu\,e^{-nx}}{\sum_n e^{-nx}}.$$

---
Mẫu số là cấp số nhân: $Z = \sum_n e^{-nx} = \dfrac{1}{1 - e^{-x}}$. Tử số là $-h\nu\,\dfrac{dZ}{dx}$. Do đó
$$\langle E\rangle = -h\nu\,\frac{d\ln Z}{dx} = h\nu\,\frac{e^{-x}}{1 - e^{-x}} = \frac{h\nu}{e^{h\nu/k_BT} - 1}.$$

---
Kiểm tra hai giới hạn. Khi $h\nu \ll k_BT$: $e^x - 1 \approx x$, nên $\langle E\rangle \approx k_BT$ — khớp với kết quả cổ điển. Khi $h\nu \gg k_BT$: $\langle E\rangle \approx h\nu\,e^{-h\nu/k_BT} \to 0$ cực nhanh. Các mode tần số cao **bị “đóng băng”**: lượng tử năng lượng tối thiểu của chúng quá lớn so với năng lượng nhiệt có sẵn.

---
Thay vào, ta được **định luật Planck**:
$$u(\nu) = \frac{8\pi h\nu^3}{c^3}\,\frac{1}{e^{h\nu/k_BT} - 1}.$$
Tích phân giờ là hữu hạn (tỉ lệ $T^4$ — định luật Stefan–Boltzmann).
:::

:::physics
Chìa khóa không phải là một mẹo toán học: tính rời rạc của năng lượng **làm thay đổi thống kê**, và thống kê đó quan sát được. Đây là lần đầu tiên hằng số $h$ xuất hiện — nó đặt ra thang đo nơi thế giới ngừng liên tục.
:::

## Đám mây thứ hai: hiệu ứng quang điện

Chiếu ánh sáng vào bề mặt kim loại, electron bị bật ra. Theo lý thuyết sóng cổ điển, ánh sáng mạnh hơn (biên độ lớn hơn) phải cho electron năng lượng lớn hơn, và ánh sáng yếu phải cần thời gian “tích lũy” năng lượng trước khi bật electron. Thí nghiệm (Lenard, 1902) cho thấy:

1. Năng lượng của electron **không phụ thuộc cường độ**, chỉ phụ thuộc **tần số** ánh sáng.
2. Dưới một tần số ngưỡng, không có electron nào bật ra, dù ánh sáng mạnh đến đâu.
3. Trên ngưỡng, electron bật ra **ngay lập tức**, dù ánh sáng yếu đến đâu.

Einstein (1905) đề xuất: ánh sáng *tự nó* gồm các lượng tử năng lượng $h\nu$ (sau này gọi là **photon**). Mỗi photon trao toàn bộ năng lượng cho một electron:
$$E_{\text{động, max}} = h\nu - W,$$
với $W$ là công thoát của kim loại. Cường độ chỉ quyết định *số* photon, không quyết định năng lượng *mỗi* photon. Millikan, vốn hoài nghi, đo cẩn thận và xác nhận công thức (1916). Einstein nhận giải Nobel vì công trình này, không phải vì thuyết tương đối.

:::misconception “Einstein đã chứng minh ánh sáng là hạt, không phải sóng.”
Giao thoa ánh sáng vẫn là sự thật thí nghiệm không thể chối cãi. Điều Einstein chỉ ra là năng lượng ánh sáng được **trao đổi theo từng lượng tử**. Chương [[song-hat]] sẽ cho thấy cùng một photon vừa “đến như hạt” vừa “giao thoa như sóng” — và cả hai bức tranh đều không đủ.
:::

## Đám mây thứ ba: sự ổn định của nguyên tử

Rutherford (1911) phát hiện nguyên tử có một hạt nhân nhỏ, dương, với electron quay xung quanh. Nhưng theo điện động lực học Maxwell, một điện tích chuyển động có gia tốc phải **bức xạ năng lượng**. Electron quay quanh hạt nhân sẽ mất năng lượng và rơi xoắn ốc vào hạt nhân trong khoảng $10^{-11}$ giây. Mọi vật chất lẽ ra đã sụp đổ.

Thêm vào đó, nguyên tử khí nóng không phát ra phổ liên tục mà phát ra các **vạch phổ** rời rạc. Với hydro, Balmer (1885) đã tìm ra công thức thực nghiệm; Rydberg tổng quát hóa:
$$\frac1\lambda = R\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right).$$

Bohr (1913) đưa ra một mô hình “lai”: electron chỉ được ở những quỹ đạo có mô-men động lượng $L = n\hbar$ (với $\hbar = h/2\pi$), không bức xạ khi ở trên quỹ đạo đó, và phát ra một photon $h\nu = E_{n_2} - E_{n_1}$ khi nhảy giữa hai quỹ đạo. Mô hình cho năng lượng
$$E_n = -\frac{13{,}6\ \text{eV}}{n^2},$$
khớp hoàn hảo với công thức Rydberg.

:::warning
Mô hình Bohr là một **bước đệm**, không phải lý thuyết đúng. Electron không có quỹ đạo theo nghĩa cổ điển, và mô hình thất bại với nguyên tử nhiều electron. Nhưng nó để lại một ý tưởng trường tồn: **hệ lượng tử liên kết chỉ có các mức năng lượng rời rạc**, và ánh sáng phát ra mang thông tin về *hiệu* các mức đó. Ở [[schrodinger]], tính rời rạc này sẽ xuất hiện tự nhiên như các trị riêng của một toán tử.
:::

## Từ khủng hoảng tới lý thuyết (1923–1927)

- **De Broglie (1923):** nếu sóng ánh sáng có tính hạt, thì hạt vật chất cũng có tính sóng, với bước sóng $\lambda = h/p$. Davisson–Germer (1927) quan sát nhiễu xạ electron.
- **Heisenberg (1925):** cơ học ma trận — chỉ nói về những đại lượng quan sát được (tần số và cường độ vạch phổ), và phát hiện các đại lượng đó *không giao hoán*.
- **Schrödinger (1926):** cơ học sóng — một phương trình sóng cho electron, cho lại mức năng lượng hydro.
- **Born (1926):** bình phương biên độ sóng là **mật độ xác suất**.
- **Dirac, von Neumann (1927–1932):** thống nhất tất cả trong khung không gian Hilbert — khung mà phần III của cuốn sách sẽ xây dựng.

:::exercise Một ước lượng nhanh
Ánh sáng xanh lá có bước sóng $\lambda \approx 530$ nm. Tính năng lượng một photon (theo eV). Một con trỏ laser 1 mW phát bao nhiêu photon mỗi giây?
???hint
$E = hc/\lambda$, với $hc \approx 1240\ \text{eV}\cdot\text{nm}$. $1\ \text{eV} = 1{,}6\times10^{-19}$ J.
???solution
$E \approx 1240/530 \approx 2{,}34$ eV $\approx 3{,}75\times10^{-19}$ J. Số photon/giây $= 10^{-3}/(3{,}75\times10^{-19}) \approx 2{,}7\times10^{15}$. Số lượng khổng lồ này là lý do ánh sáng thường ngày trông liên tục — tính hạt chỉ lộ ra khi ánh sáng rất yếu, hoặc khi ta nhìn từng lần tương tác.
:::

:::exercise Bước sóng de Broglie
Tính bước sóng de Broglie của (a) một electron có động năng 100 eV; (b) một quả bóng tennis 57 g bay với vận tốc 50 m/s. Vì sao ta không thấy quả bóng giao thoa?
???solution
(a) $p = \sqrt{2mE} = \sqrt{2\cdot 9{,}11\times10^{-31}\cdot 1{,}6\times10^{-17}} \approx 5{,}4\times10^{-24}$ kg·m/s, nên $\lambda = h/p \approx 1{,}2\times10^{-10}$ m $= 0{,}12$ nm — cỡ khoảng cách nguyên tử trong tinh thể, nên tinh thể làm cách tử nhiễu xạ được. (b) $\lambda = 6{,}6\times10^{-34}/(0{,}057\cdot50) \approx 2{,}3\times10^{-34}$ m — nhỏ hơn hạt nhân nguyên tử tới $10^{19}$ lần. Không có khe nào đủ nhỏ để thấy giao thoa; hơn nữa, vật lớn tương tác liên tục với môi trường và mất kết hợp ([[ma-tran-mat-do]]).
:::

:::quiz
Q: Trong hiệu ứng quang điện, nếu tăng gấp đôi cường độ ánh sáng (giữ nguyên tần số trên ngưỡng), điều gì xảy ra?
- [ ] Động năng cực đại của electron tăng gấp đôi || Động năng chỉ phụ thuộc $h\nu - W$.
- [x] Số electron bật ra mỗi giây tăng gấp đôi || Cường độ gấp đôi = số photon gấp đôi; mỗi photon bật tối đa một electron.
- [ ] Không có gì thay đổi || Số electron tăng.
:::

## Kết nối

- [[xac-suat]]: Planck tìm ra lượng tử khi làm **thống kê** — phân bố Boltzmann là công cụ then chốt.
- [[song-hat]]: tính hạt của ánh sáng và tính sóng của vật chất, gặp nhau trong thí nghiệm hai khe.
- [[schrodinger]]: mức năng lượng rời rạc xuất hiện như trị riêng.

## Góc nhìn nghiên cứu

:::research
- Hằng số Planck $h$ ngày nay được dùng để **định nghĩa** kilogram (từ 2019, SI cố định $h$ chính xác bằng $6{,}62607015\times10^{-34}$ J·s). Lượng tử học trở thành nền móng của hệ đo lường.
- Các nguồn **photon đơn** (single-photon sources) — phát đúng một photon mỗi lần theo yêu cầu — là thành phần then chốt của truyền thông lượng tử và máy tính lượng tử quang. Chế tạo chúng với hiệu suất cao và photon không phân biệt được là một hướng nghiên cứu sôi động.
:::
