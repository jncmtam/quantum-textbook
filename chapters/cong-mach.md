:::question
Máy tính của bạn được xây từ hàng tỉ cổng NAND. Một máy tính lượng tử cần những “cổng” nào? Có cần một danh sách vô hạn cổng cho vô số phép quay không — hay chỉ một bộ nhỏ là đủ?
:::

## Trực giác: mạch là một bản nhạc

Hãy hình dung một bản nhạc: mỗi dòng kẻ là một qubit, thời gian chạy từ trái sang phải, và các nốt nhạc là các cổng. Cổng một qubit là nốt trên một dòng; cổng hai qubit là hợp âm nối hai dòng. Bản nhạc bắt đầu với mọi qubit ở $|0\rangle$ và kết thúc bằng phép đo.

Nhưng khác với bản nhạc, “âm thanh” ở đây là một vectơ trong không gian $2^n$ chiều, và mỗi cổng là một phép quay của không gian khổng lồ ấy. Điều kỳ diệu là chỉ cần **một bộ cổng nhỏ** tác động lên một hoặc hai qubit mỗi lần, ta có thể xấp xỉ mọi phép quay đó.

:::sim circuit {"preset":"bell"}
Mạch tạo trạng thái Bell. Kéo thanh “Xem trạng thái sau cột” về 0, 1, 2 để xem trạng thái thay đổi qua từng cổng. Để ý: sau cột 1 (chỉ có H), qubit 0 nằm trên xích đạo quả cầu Bloch; sau CNOT, **cả hai vectơ Bloch co về tâm** — dấu hiệu của rối. Thử đổi preset sang “GHZ” hoặc tự xây mạch của bạn.
:::

## Vì sao cần cổng hai qubit?

Nếu chỉ dùng cổng một qubit, mỗi qubit tiến hóa độc lập: trạng thái tách được luôn tách được ([[tensor]]). Không có rối thì — như ta sẽ thấy — máy tính lượng tử có thể mô phỏng hiệu quả trên máy cổ điển. Cần ít nhất một cổng **tạo rối**.

## Bản chất: các cổng cơ bản

### Cổng CNOT

$$\mathrm{CNOT} = |0\rangle\langle0|\otimes I + |1\rangle\langle 1|\otimes X = \begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&0&1\\0&0&1&0\end{pmatrix}.$$
Trên cơ sở tính toán: $|a, b\rangle \mapsto |a, b\oplus a\rangle$ — lật qubit đích nếu qubit điều khiển là 1. Trông như một phép toán cổ điển (XOR). Nhưng trên chồng chập, nó tạo rối:

:::derivation Tạo trạng thái Bell
Bắt đầu: $|00\rangle$. Áp $H$ lên qubit 0:
$$(H\otimes I)|00\rangle = \tfrac{1}{\sqrt2}(|0\rangle + |1\rangle)|0\rangle = \tfrac1{\sqrt2}(|00\rangle + |10\rangle).$$

---
Áp CNOT (điều khiển 0, đích 1). Do tuyến tính, áp lên từng thành phần: $|00\rangle \mapsto |00\rangle$, $|10\rangle\mapsto|11\rangle$.
$$\mathrm{CNOT}\,\tfrac{1}{\sqrt2}(|00\rangle + |10\rangle) = \tfrac1{\sqrt2}(|00\rangle + |11\rangle) = |\Phi^+\rangle.$$

---
Thay $|00\rangle$ bằng ba đầu vào khác ta được bốn **trạng thái Bell**, một cơ sở trực chuẩn của hai qubit:
$$|\Phi^\pm\rangle = \tfrac1{\sqrt2}(|00\rangle\pm|11\rangle),\qquad |\Psi^\pm\rangle = \tfrac1{\sqrt2}(|01\rangle\pm|10\rangle).$$
Chạy ngược mạch (CNOT rồi $H$) biến cơ sở Bell thành cơ sở tính toán: đó là **phép đo Bell**, cần cho dịch chuyển lượng tử ([[dich-chuyen]]).
:::

### Các cổng nhiều qubit khác

- **CZ:** $|a,b\rangle\mapsto(-1)^{ab}|a,b\rangle$. Đối xứng giữa hai qubit. $\mathrm{CNOT} = (I\otimes H)\,\mathrm{CZ}\,(I\otimes H)$.
- **SWAP:** $|a,b\rangle\mapsto|b,a\rangle$ = ba CNOT luân phiên.
- **Controlled-$U$:** áp $U$ lên đích nếu điều khiển là 1. Ví dụ quan trọng: controlled-phase $\mathrm{CP}(\varphi)$, dùng trong biến đổi Fourier lượng tử.
- **Toffoli (CCX):** lật đích nếu cả hai điều khiển là 1. Toffoli là phổ dụng cho tính toán cổ điển **khả nghịch** — nghĩa là máy tính lượng tử chạy được mọi thuật toán cổ điển.

### Phase kickback: khi “điều khiển” bị thay đổi

:::derivation Pha “đá ngược” lên qubit điều khiển
Đặt qubit đích ở $|{-}\rangle = \tfrac1{\sqrt2}(|0\rangle - |1\rangle)$, là vectơ riêng của $X$ với trị riêng $-1$: $X|{-}\rangle = -|{-}\rangle$.

---
Với qubit điều khiển ở $|a\rangle$: nếu $a = 0$, không làm gì; nếu $a = 1$, áp $X$ lên đích, nhân trạng thái với $-1$. Gộp lại:
$$\mathrm{CNOT}\,|a\rangle|{-}\rangle = (-1)^a|a\rangle|{-}\rangle.$$

---
Qubit đích **không thay đổi**; dấu $(-1)^a$ được “đá ngược” thành pha của qubit điều khiển. Trên chồng chập: $\tfrac{1}{\sqrt2}(|0\rangle + |1\rangle)|{-}\rangle \mapsto \tfrac{1}{\sqrt2}(|0\rangle - |1\rangle)|{-}\rangle$. Qubit điều khiển đi từ $|{+}\rangle$ sang $|{-}\rangle$!
:::

:::physics
“Điều khiển” và “đích” chỉ là cách nhìn trong cơ sở tính toán. Trong cơ sở $\pm$, vai trò đổi ngược: CNOT là một CNOT với điều khiển và đích hoán đổi. Phase kickback là cơ chế trung tâm của **mọi** thuật toán dùng oracle: Deutsch–Jozsa, Bernstein–Vazirani, Grover, ước lượng pha, Shor. (Preset “Phase kickback” trong mô phỏng.)
:::

## Nền tảng toán học: tính phổ dụng

:::theorem Tập cổng phổ dụng
1. Cổng một qubit tùy ý + CNOT là **phổ dụng chính xác**: mọi unita trên $n$ qubit phân tích được thành tích của chúng.
2. Tập hữu hạn $\{H, T, \mathrm{CNOT}\}$ là **phổ dụng xấp xỉ**: mọi unita được xấp xỉ với sai số $\varepsilon$ tùy ý.
3. **Định lý Solovay–Kitaev:** xấp xỉ một cổng một qubit với sai số $\varepsilon$ chỉ cần $O(\log^c(1/\varepsilon))$ cổng từ tập hữu hạn (với $c \approx 2$ hoặc nhỏ hơn) — chi phí rất nhẹ.
:::

:::warning Phổ dụng không có nghĩa là hiệu quả
Một unita tổng quát trên $n$ qubit có $4^n$ tham số; hầu hết chúng cần số cổng **hàm mũ** theo $n$. Thuật toán lượng tử hữu ích là những unita đặc biệt thực hiện được bằng số cổng đa thức. Tìm ra chúng là nghệ thuật của thiết kế thuật toán.
:::

### Clifford và phi-Clifford

Các cổng $H, S, \mathrm{CNOT}$ sinh ra **nhóm Clifford**. Định lý **Gottesman–Knill**: mạch chỉ gồm cổng Clifford, chuẩn bị và đo theo cơ sở tính toán có thể **mô phỏng hiệu quả trên máy cổ điển** — dù nó tạo ra rối lớn! Cổng $T$ (phi-Clifford) là thành phần “đắt” mang lại sức mạnh lượng tử. Trong máy tính chịu lỗi, số lượng cổng $T$ là thước đo chi phí chủ yếu ([[sua-loi]]).

### Độ phức tạp: BQP

Lớp **BQP** gồm các bài toán quyết định giải được bằng mạch lượng tử kích thước đa thức với xác suất đúng $\ge 2/3$. Ta biết $\mathrm{P}\subseteq\mathrm{BPP}\subseteq\mathrm{BQP}\subseteq\mathrm{PSPACE}$. Phân tích thừa số (Shor) thuộc BQP nhưng không biết có thuộc BPP không. Người ta **tin** rằng BQP không chứa các bài toán NP-đầy đủ — máy tính lượng tử không được kỳ vọng giải nhanh mọi bài toán khó.

## Bài tập

:::exercise CNOT trên cơ sở ±
Chứng minh $(H\otimes H)\,\mathrm{CNOT}_{0\to1}\,(H\otimes H) = \mathrm{CNOT}_{1\to0}$.
???hint
Kiểm tra trên bốn trạng thái $|{\pm}{\pm}\rangle$, hoặc viết CNOT là $\tfrac12(I\otimes I + Z\otimes I + I\otimes X - Z\otimes X)$ rồi dùng $HZH = X$, $HXH = Z$.
???solution
$\mathrm{CNOT}_{0\to1} = |0\rangle\langle0|\otimes I + |1\rangle\langle1|\otimes X = \tfrac{I+Z}{2}\otimes I + \tfrac{I-Z}{2}\otimes X$. Liên hợp với $H\otimes H$: $Z\to X$, $X\to Z$, ra $\tfrac{I+X}2\otimes I + \tfrac{I-X}2\otimes Z = I\otimes\tfrac{I+Z}{2} + X\otimes\tfrac{I-Z}{2}$ — chính là CNOT với điều khiển là qubit 1 và đích là qubit 0.
:::

:::exercise Xây mạch trong mô phỏng
Dùng mô phỏng ở trên (mạch trống, 2 qubit), tạo trạng thái $|\Psi^-\rangle = \tfrac1{\sqrt2}(|01\rangle - |10\rangle)$.
???hint
Bắt đầu từ $|11\rangle$ thay vì $|00\rangle$, rồi dùng mạch Bell.
???solution
X trên cả hai qubit → $|11\rangle$; H trên qubit 0 → $\tfrac1{\sqrt2}(|01\rangle - |11\rangle)$; CNOT 0→1 → $\tfrac1{\sqrt2}(|01\rangle - |10\rangle)$. Kiểm tra trong bảng biên độ: $|01\rangle$ có $+0{,}707$, $|10\rangle$ có $-0{,}707$ (thanh màu khác pha).
:::

:::quiz
Q: Một mạch gồm 50 qubit, hàng nghìn cổng H, S và CNOT, cuối cùng đo mọi qubit. Mô phỏng nó trên laptop có khả thi không?
- [x] Có — theo định lý Gottesman–Knill || Mạch Clifford mô phỏng được trong thời gian đa thức bằng hình thức luận stabilizer, dù có rối mạnh.
- [ ] Không — cần $2^{50}$ biên độ || Đó là chi phí của mô phỏng vectơ trạng thái tổng quát; mạch Clifford có cấu trúc đặc biệt.
- [ ] Không — vì có rối || Rối là cần nhưng không đủ cho lợi thế lượng tử.
:::

## Kết nối

- **Nền tảng:** [[qubit-bloch]], [[tensor]], [[ma-tran]].
- **Tiếp theo:** [[dich-chuyen]], [[deutsch-jozsa]], [[grover]], [[qft-shor]] — các mạch cụ thể; [[sua-loi]] — mạch chống lại lỗi.
- **Chuỗi xuyên suốt:** *… qubit → cổng → mạch → thuật toán.*

## Hiểu lầm thường gặp

:::misconception “Mạch lượng tử chạy trên mọi đầu vào cùng lúc rồi đọc ra mọi kết quả.”
Mạch biến đổi một vectơ; phép đo cuối cùng cho **một** chuỗi bit, lấy mẫu từ $|\text{biên độ}|^2$. Song song lượng tử chỉ hữu ích khi giao thoa gom xác suất về đáp án.
:::

:::misconception “CNOT là cổng cổ điển nên không có gì lượng tử.”
Trên trạng thái cơ sở, đúng là nó giống XOR. Trên chồng chập, nó tạo rối và gây phase kickback — những hiện tượng không có trong mạch cổ điển.
:::

## Góc nhìn nghiên cứu

:::research
- **Biên dịch lượng tử** (quantum compilation): chuyển mạch trừu tượng thành chuỗi xung trên phần cứng thật với kết nối hạn chế, tối thiểu hóa số cổng hai qubit và độ sâu. Bài toán định tuyến qubit tối ưu là NP-khó; các công cụ (Qiskit transpiler, tket, …) dùng heuristic. Xác minh rằng mạch đã biên dịch tương đương mạch gốc là một bài toán nghiên cứu riêng.
- **Lấy mẫu mạch ngẫu nhiên** và **lợi thế lượng tử**: Google (Arute và cộng sự, Nature 2019) công bố một mạch 53 qubit mà họ ước tính siêu máy tính cần 10 000 năm để mô phỏng; các thuật toán mạng tensor sau đó rút ngắn con số này rất nhiều. Ranh giới thực sự giữa mô phỏng được và không mô phỏng được vẫn đang dịch chuyển.
:::

:::status debated
Các tuyên bố “lợi thế lượng tử” (quantum advantage) cho bài toán lấy mẫu là kết quả thực nghiệm có thật, nhưng mức độ lợi thế phụ thuộc vào thuật toán cổ điển tốt nhất hiện có — và con số này đã nhiều lần bị thu hẹp. Lợi thế cho bài toán *hữu ích* vẫn đang được tìm kiếm.
:::
