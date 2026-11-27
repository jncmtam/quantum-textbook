:::question
Một qubit thật mất kết hợp sau vài chục đến vài trăm micro giây; một cổng hai qubit sai khoảng 1 lần trong vài trăm. Thuật toán Shor cho RSA-2048 cần hàng tỉ cổng. Làm sao một phép tính dài như vậy có thể hoàn tất trên những linh kiện tồi như thế? Năm 1995, nhiều người tin là không thể.
:::

## Trực giác: dư thừa — nhưng không sao chép

Máy tính cổ điển chống lỗi bằng **dư thừa**: lưu mỗi bit ba lần ($0\to000$), và nếu một bản bị lật, lấy theo đa số. Với lượng tử, có ba trở ngại rõ ràng:

1. **Không sao chép được** ([[dich-chuyen]]): không thể biến $|\psi\rangle$ thành $|\psi\rangle|\psi\rangle|\psi\rangle$.
2. **Đo làm hỏng trạng thái** ([[phep-do]]): không thể “nhìn” để xem bản nào bị lỗi.
3. **Lỗi là liên tục**: không chỉ lật bit, mà quay một góc nhỏ bất kỳ, lật pha, và mọi tổ hợp.

Shor (1995) và Steane (1996) vượt qua cả ba. Ý tưởng then chốt: **không sao chép trạng thái, mà trải nó ra trong rối của nhiều qubit**; **không đo dữ liệu, mà đo các tính chất tập thể** (“hai qubit này có giống nhau không?”) cho biết lỗi mà không tiết lộ gì về dữ liệu; và **đo lỗi thì rời rạc hóa nó**.

## Bản chất: mã lật bit 3 qubit

:::derivation Mã hóa, phát hiện và sửa lỗi lật bit
**Mã hóa** (hai CNOT từ qubit dữ liệu):
$$\alpha|0\rangle + \beta|1\rangle\ \longmapsto\ \alpha|000\rangle + \beta|111\rangle.$$
Đây *không* phải $|\psi\rangle^{\otimes3}$ — đó là một trạng thái rối, nên không vi phạm định lý không sao chép.

---
Giả sử qubit 2 bị lật ($X_2$): $\alpha|010\rangle + \beta|101\rangle$.

---
**Đo hội chứng** (syndrome): đo hai toán tử $Z_1Z_2$ và $Z_2Z_3$. Mỗi toán tử hỏi “hai qubit này có cùng giá trị không?” (trị riêng $+1$ nếu giống, $-1$ nếu khác). Với trạng thái trên, cả $|010\rangle$ và $|101\rangle$ đều cho $Z_1Z_2 = -1$, $Z_2Z_3 = -1$. **Hai thành phần cho cùng kết quả**, nên phép đo không làm sụp chồng chập: $\alpha, \beta$ được giữ nguyên.

---
Bảng hội chứng:

| $Z_1Z_2$ | $Z_2Z_3$ | Lỗi | Sửa |
|---|---|---|---|
| $+1$ | $+1$ | không | — |
| $-1$ | $+1$ | qubit 1 | $X_1$ |
| $-1$ | $-1$ | qubit 2 | $X_2$ |
| $+1$ | $-1$ | qubit 3 | $X_3$ |

---
Áp $X_2$: trở về $\alpha|000\rangle + \beta|111\rangle$. Ta đã sửa lỗi **mà không bao giờ biết $\alpha, \beta$**.
:::

:::sim circuit {"preset":"bitflip"}
Qubit dữ liệu q0 được chuẩn bị bằng Ry, mã hóa vào q0–q2, rồi một lỗi X đánh vào q1 (cột 3). Hai ancilla q3, q4 thu hội chứng; các Toffoli áp sửa lỗi có điều kiện; cuối cùng giải mã. So sánh quả cầu Bloch của q0 ở cột 1 (trước khi mã hóa) với cuối mạch. Hãy xóa cổng X lỗi rồi đặt nó lên q0 hoặc q2: mạch vẫn sửa được. Đặt **hai** lỗi: mạch thất bại — mã này chỉ sửa được một lỗi.
:::

### Lỗi liên tục trở thành rời rạc

:::derivation Vì sao sửa được lỗi quay một góc nhỏ
Giả sử qubit 1 bị quay một góc nhỏ: $e^{-i\epsilon X_1} = \cos\epsilon\,I - i\sin\epsilon\,X_1$. Trạng thái mã sau lỗi:
$$\cos\epsilon\,|\bar\psi\rangle - i\sin\epsilon\,X_1|\bar\psi\rangle.$$

---
Đo hội chứng. Với xác suất $\cos^2\epsilon$, được “không lỗi” và trạng thái sụp về $|\bar\psi\rangle$ — sạch hoàn toàn. Với xác suất $\sin^2\epsilon$, được “lỗi ở qubit 1” và trạng thái sụp về $X_1|\bar\psi\rangle$ — sửa được bằng $X_1$.

---
**Phép đo hội chứng rời rạc hóa lỗi.** Chỉ cần sửa được một tập hữu hạn lỗi (ở đây $\{I, X_1, X_2, X_3\}$) là sửa được mọi tổ hợp tuyến tính của chúng. Với lỗi một qubit tổng quát, vì mọi ma trận $2\times2$ là tổ hợp của $I, X, Y, Z$, chỉ cần sửa được $X$, $Z$ (và $Y = iXZ$) trên mỗi qubit.
:::

### Lật pha và mã Shor 9 qubit

Lỗi lật pha $Z$ biến $|{+}\rangle\leftrightarrow|{-}\rangle$ — chính là lật bit trong cơ sở X. Mã lật pha: $|0\rangle\to|{+}{+}{+}\rangle$, $|1\rangle\to|{-}{-}{-}\rangle$. Ghép (concatenate) mã lật pha bên ngoài với mã lật bit bên trong cho **mã Shor 9 qubit**, sửa được mọi lỗi tùy ý trên một qubit — mã sửa lỗi lượng tử đầu tiên.

## Nền tảng toán học: hình thức luận stabilizer

Gottesman (1997) nhận ra một ngôn ngữ thống nhất. Một **mã stabilizer** được định nghĩa bởi một nhóm Abel $\mathcal{S}$ các toán tử Pauli (không chứa $-I$); không gian mã là các trạng thái thỏa
$$S|\bar\psi\rangle = |\bar\psi\rangle\qquad\forall S\in\mathcal{S}.$$

- Mã lật bit: $\mathcal{S} = \langle Z_1Z_2,\ Z_2Z_3\rangle$.
- Một lỗi Pauli $E$ **phản giao hoán** với một số phần tử sinh — các phần tử đó đổi trị riêng từ $+1$ thành $-1$. Mẫu dấu đó là hội chứng.
- **Toán tử logic** giao hoán với mọi stabilizer nhưng không nằm trong nhóm; chúng tác động lên thông tin được mã hóa. Với mã lật bit: $\bar X = X_1X_2X_3$, $\bar Z = Z_1$.
- Ký hiệu $[[n, k, d]]$: $n$ qubit vật lý, $k$ qubit logic, **khoảng cách** $d$ = trọng số nhỏ nhất của một toán tử logic không tầm thường. Mã sửa được $\lfloor(d-1)/2\rfloor$ lỗi tùy ý. Mã Shor: $[[9,1,3]]$; mã Steane: $[[7,1,3]]$; mã nhỏ nhất sửa một lỗi tùy ý: $[[5,1,3]]$.

:::theorem Điều kiện Knill–Laflamme
Một mã với phép chiếu $P$ lên không gian mã sửa được tập lỗi $\{E_a\}$ khi và chỉ khi
$$P E_a^\dagger E_b P = c_{ab}P$$
với một ma trận số $c_{ab}$ nào đó. Ý nghĩa: các lỗi khác nhau phải đưa không gian mã tới những vùng phân biệt được (hoặc tác động giống hệt nhau), **mà không phụ thuộc vào trạng thái logic** — môi trường không được học được gì về thông tin mã hóa.
:::

## Mã bề mặt và ngưỡng chịu lỗi

**Mã bề mặt** (surface code, Kitaev 1997; Bravyi–Kitaev; Dennis và cộng sự 2002) đặt qubit trên lưới hai chiều; stabilizer là tích $X$ hoặc $Z$ của 4 qubit lân cận. Ưu điểm: chỉ cần tương tác **cục bộ** giữa hàng xóm, và chịu được tỉ lệ lỗi vật lý cao (~1%). Khoảng cách $d$ tăng theo kích thước lưới; một qubit logic cần khoảng $2d^2$ qubit vật lý.

:::theorem Định lý ngưỡng (Aharonov–Ben-Or, Knill–Laflamme–Zurek, Kitaev, 1996–1997)
Nếu tỉ lệ lỗi của mỗi thành phần vật lý dưới một **ngưỡng** $p_{\mathrm{th}}$ (và lỗi đủ cục bộ, đủ độc lập), thì một phép tính lượng tử dài tùy ý có thể được thực hiện với sai số tùy ý nhỏ, với chi phí tài nguyên chỉ tăng theo đa thức của $\log(1/\varepsilon)$.
:::

Với mã bề mặt, tỉ lệ lỗi logic xấp xỉ $p_L \approx A\,(p/p_{\mathrm{th}})^{(d+1)/2}$. Dưới ngưỡng, mỗi lần tăng $d$ thêm 2 làm lỗi logic **giảm theo một hệ số** $\Lambda = p_{\mathrm{th}}/p$.

:::status experimental
Google Quantum AI (Nature, 2025, công bố trên arXiv 2024): bộ nhớ mã bề mặt với khoảng cách 3, 5, 7 trên chip 105 qubit, cho thấy lỗi logic giảm khoảng $\Lambda \approx 2{,}1$ lần mỗi lần tăng khoảng cách — lần đầu tiên hoạt động **dưới ngưỡng** một cách thuyết phục, với qubit logic sống lâu hơn qubit vật lý tốt nhất. Các nhóm khác (Quantinuum, QuEra/Harvard, …) cũng công bố qubit logic với nhiều mã khác nhau.
:::

### Cổng logic và trạng thái “ma thuật”

Mã bề mặt thực hiện dễ dàng các cổng Clifford, nhưng theo định lý Eastin–Knill, **không mã nào** có tập cổng phổ dụng hoàn toàn transversal (tác động riêng rẽ từng qubit). Cổng $T$ thường được thực hiện bằng **dịch chuyển cổng** với một **trạng thái ma thuật** $|T\rangle = T|{+}\rangle$, được tinh chế qua **chưng cất trạng thái ma thuật** (magic state distillation, Bravyi–Kitaev 2005) — thường chiếm phần lớn chi phí của máy tính chịu lỗi.

## Bài tập

:::exercise Hai lỗi
Trong mã lật bit, lỗi $X_1X_2$ xảy ra. Hội chứng là gì? Mạch “sửa” sẽ làm gì, và kết quả cuối cùng là gì?
???solution
$X_1X_2$ biến $|000\rangle\to|110\rangle$: $Z_1Z_2 = +1$, $Z_2Z_3 = -1$ — giống hệt hội chứng của $X_3$. Mạch áp $X_3$, cho $X_1X_2X_3 = \bar X$: **lỗi logic** — trạng thái thành $\alpha|111\rangle + \beta|000\rangle$, tức qubit logic bị lật mà không ai hay. Đó là lý do khoảng cách $d = 3$ chỉ sửa được 1 lỗi.
:::

:::exercise Hội chứng của lỗi Z
Trong mã lật bit, nếu xảy ra lỗi $Z_1$, hội chứng là gì? Hậu quả?
???solution
$Z_1$ giao hoán với $Z_1Z_2$ và $Z_2Z_3$, nên hội chứng là $(+1, +1)$: “không lỗi”. Nhưng $Z_1|\bar\psi\rangle = \alpha|000\rangle - \beta|111\rangle$ — lỗi pha logic không bị phát hiện ($Z_1$ chính là $\bar Z$). Mã lật bit hoàn toàn mù với lỗi pha: cần mã Shor hoặc mã bề mặt.
:::

:::quiz
Q: Vì sao đo hội chứng không phá hủy thông tin lượng tử được mã hóa?
- [ ] Vì phép đo được thực hiện rất nhanh || Tốc độ không liên quan.
- [x] Vì toán tử hội chứng có cùng trị riêng trên mọi trạng thái của không gian mã — phép đo không phân biệt được $|\bar0\rangle$ với $|\bar1\rangle$ || Đúng: nó chỉ hỏi “lỗi nào”, không hỏi “dữ liệu là gì”.
- [ ] Vì ta đo ancilla chứ không đo qubit dữ liệu || Đo ancilla sau khi nó tương tác với dữ liệu *chính là* một phép đo trên dữ liệu; điều quan trọng là phép đo nào.
:::

## Kết nối

- **Nền tảng:** [[cong-mach]], [[ma-tran-mat-do]] (mô hình nhiễu), [[dich-chuyen]] (không sao chép, dịch chuyển cổng), [[toan-tu]] (giao hoán và phản giao hoán).
- **Chuỗi xuyên suốt:** *xác suất → entropy → thông tin → thông tin lượng tử → sửa lỗi lượng tử.* Giới hạn lượng tử Hamming và giới hạn hashing liên hệ khả năng sửa lỗi với entropy.
- **Xa hơn:** [[ban-do-nghien-cuu]].

## Hiểu lầm thường gặp

:::misconception “Sửa lỗi lượng tử cần đo dữ liệu để biết nó bị lỗi.”
Chính xác là ngược lại: phải thiết kế để phép đo **không** tiết lộ gì về dữ liệu.
:::

:::misconception “Có nhiều qubit vật lý hơn là có máy tính mạnh hơn.”
Một nghìn qubit vật lý nhiễu có thể chỉ tương đương vài qubit logic. Thước đo có ý nghĩa là số qubit logic, tỉ lệ lỗi logic và số cổng logic thực hiện được.
:::

## Góc nhìn nghiên cứu

:::research
- **Mã LDPC lượng tử** (qLDPC): Panteleev–Kalachev (2021) xây dựng mã qLDPC “tốt” (tỉ lệ và khoảng cách đều tuyến tính). Mã “bivariate bicycle” của IBM (Bravyi và cộng sự, Nature 2024) mã hóa 12 qubit logic trong 144 qubit dữ liệu với khoảng cách 12 — hiệu quả hơn mã bề mặt khoảng 10 lần, đổi lại cần kết nối không cục bộ.
- **Giải mã thời gian thực**: bộ giải mã (minimum-weight perfect matching, union-find, mạng nơ-ron như AlphaQubit) phải theo kịp tốc độ đo hội chứng (~1 µs mỗi vòng với qubit siêu dẫn).
- **Qubit được bảo vệ phần cứng**: mã bosonic (cat qubit, mã GKP) và qubit tô-pô (Majorana — kết quả thực nghiệm còn tranh luận) cố gắng đưa sửa lỗi vào tầng vật lý.
- **Chi phí cổng phi-Clifford**: magic state cultivation (Gidney, Shutty, Jones, 2024) giảm mạnh chi phí so với chưng cất truyền thống.
:::
