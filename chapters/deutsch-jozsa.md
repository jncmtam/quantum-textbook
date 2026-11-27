:::question
Có một chiếc hộp đen tính một hàm $f: \{0,1\}^n \to \{0,1\}$. Bạn được hứa rằng $f$ hoặc **hằng** (luôn ra 0, hoặc luôn ra 1), hoặc **cân bằng** (đúng một nửa số đầu vào ra 0). Bạn phải hỏi hộp bao nhiêu lần để biết chắc chắn là trường hợp nào?
:::

## Trực giác

Cổ điển, trong trường hợp xấu nhất, bạn phải hỏi $2^{n-1} + 1$ lần: có thể bạn đã hỏi một nửa số đầu vào và đều nhận 0 — vẫn chưa loại trừ được khả năng cân bằng. Với $n = 50$, đó là khoảng $5\times10^{14}$ lần hỏi.

Một máy tính lượng tử chỉ cần **một** lần hỏi. Bí quyết không phải là “thử mọi đầu vào cùng lúc” — mà là sắp đặt để các biên độ **giao thoa**: nếu $f$ hằng, mọi biên độ cộng dồn vào một kết quả duy nhất; nếu $f$ cân bằng, chúng triệt tiêu đúng tại kết quả đó.

Bài toán này nhân tạo — không ai cần giải nó trong thực tế. Nhưng nó là ví dụ đầu tiên (Deutsch 1985, Deutsch–Jozsa 1992) cho thấy một mạch lượng tử có thể vượt xa mọi thuật toán cổ điển tất định, và nó chứa đúng khung sườn của các thuật toán quan trọng về sau.

## Bản chất: oracle lượng tử

Hộp đen được cài đặt dưới dạng một unita khả nghịch:
$$U_f|x\rangle|y\rangle = |x\rangle|y\oplus f(x)\rangle.$$
Với $y$ ở trạng thái $|{-}\rangle$, nhờ **phase kickback** ([[cong-mach]]):
$$U_f|x\rangle|{-}\rangle = (-1)^{f(x)}|x\rangle|{-}\rangle.$$
Giá trị của hàm được ghi vào **pha**, không vào bit. Đây gọi là **oracle pha**: $O_f|x\rangle = (-1)^{f(x)}|x\rangle$.

## Nền tảng toán học

### Cổng Hadamard trên $n$ qubit

:::derivation $H^{\otimes n}$ trên một chuỗi bit
Với một qubit: $H|x\rangle = \tfrac{1}{\sqrt2}\sum_{z\in\{0,1\}}(-1)^{xz}|z\rangle$ (kiểm tra: $x=0$ cho dấu $+$ cả hai; $x = 1$ cho dấu $-$ ở $z = 1$).

---
Với $n$ qubit, tích tensor:
$$H^{\otimes n}|x\rangle = \frac{1}{\sqrt{2^n}}\sum_{z\in\{0,1\}^n}(-1)^{x\cdot z}|z\rangle,\qquad x\cdot z = x_1z_1\oplus\dots\oplus x_nz_n.$$

---
Đặc biệt $H^{\otimes n}|0\dots0\rangle = \frac{1}{\sqrt{2^n}}\sum_z|z\rangle$: chồng chập đều của mọi chuỗi bit.
:::

### Thuật toán Deutsch–Jozsa

:::derivation Một lần hỏi là đủ
**Bước 1.** Chuẩn bị $|0\rangle^{\otimes n}$ và áp $H^{\otimes n}$:
$$\frac{1}{\sqrt{2^n}}\sum_x|x\rangle.$$

---
**Bước 2.** Áp oracle pha (dùng một qubit phụ ở $|{-}\rangle$):
$$\frac{1}{\sqrt{2^n}}\sum_x(-1)^{f(x)}|x\rangle.$$

---
**Bước 3.** Áp $H^{\otimes n}$ lần nữa:
$$\frac{1}{2^n}\sum_z\Big[\sum_x(-1)^{f(x)+x\cdot z}\Big]|z\rangle.$$

---
**Bước 4.** Đo. Biên độ của kết quả $z = 0\dots0$ là
$$a_0 = \frac{1}{2^n}\sum_x(-1)^{f(x)}.$$
- Nếu $f$ hằng: mọi số hạng cùng dấu, $a_0 = \pm1$. **Luôn đo được $0\dots0$.**
- Nếu $f$ cân bằng: một nửa $+1$, một nửa $-1$, $a_0 = 0$. **Không bao giờ đo được $0\dots0$.**

Một lần gọi oracle, kết quả chắc chắn.
:::

:::sim circuit {"preset":"djBalanced"}
Hàm cân bằng $f(x_0, x_1) = x_0\oplus x_1$ (hai CNOT vào qubit phụ). Bấm “Đo 1024 lần”: q0q1 luôn là $11$, không bao giờ $00$. Đổi preset sang “Deutsch–Jozsa: hàm hằng”: luôn là $00$. Hãy xem cột thứ 2 (sau các H): qubit phụ q2 nằm ở $-x$ trên quả cầu Bloch — trạng thái $|{-}\rangle$ cho phase kickback.
:::

:::physics
Cấu trúc **H – oracle – H** chính là giao thoa kế Mach–Zehnder ([[song-hat]]) nhân lên $n$ chiều: H đầu tiên tách thành $2^n$ “con đường”, oracle gắn pha $\pm1$ vào mỗi đường, H cuối cùng tái hợp chúng. Thông tin về $f$ ra khỏi máy dưới dạng **mẫu giao thoa**.
:::

### Bernstein–Vazirani: đọc cả chuỗi bí mật

Nếu $f(x) = s\cdot x$ với một chuỗi bí mật $s$, cùng mạch ấy cho trạng thái cuối là đúng $|s\rangle$ (vì $\sum_x(-1)^{s\cdot x + z\cdot x} = 2^n\delta_{s,z}$). Một lần hỏi đọc được $n$ bit, trong khi cổ điển cần $n$ lần hỏi. (Preset “Bernstein–Vazirani”.)

### Simon: lợi thế hàm mũ thật sự

Bài toán Simon (1994): cho $f$ với $f(x) = f(y) \iff y = x\oplus s$, tìm $s$. Thuật toán lượng tử cần $O(n)$ lần hỏi; **mọi** thuật toán cổ điển, kể cả ngẫu nhiên, cần $\Omega(2^{n/2})$. Đây là lợi thế hàm mũ đầu tiên so với thuật toán *ngẫu nhiên*, và đã truyền cảm hứng trực tiếp cho Shor: “tìm chu kỳ ẩn” ([[qft-shor]]).

## Bài tập

:::exercise Trường hợp $n = 1$ (thuật toán Deutsch)
Với $n = 1$ có 4 hàm: $f(x) = 0$, $1$, $x$, $1\oplus x$. Tính trạng thái cuối của qubit đầu cho từng hàm.
???solution
Sau bước 2: $\tfrac{1}{\sqrt2}((-1)^{f(0)}|0\rangle + (-1)^{f(1)}|1\rangle)$. Nếu $f(0) = f(1)$ (hằng): $\pm|{+}\rangle$, sau $H$ là $\pm|0\rangle$. Nếu $f(0)\neq f(1)$ (cân bằng): $\pm|{-}\rangle$, sau $H$ là $\pm|1\rangle$. Một lần hỏi cho biết $f(0)\oplus f(1)$ — một tính chất **toàn cục** của $f$ — mà không biết $f(0)$ hay $f(1)$ riêng lẻ.
:::

:::exercise Vì sao lợi thế này “không công bằng”?
Một thuật toán cổ điển **ngẫu nhiên** cần bao nhiêu lần hỏi để phân biệt hằng/cân bằng với xác suất sai $\le 2^{-10}$?
???solution
Hỏi $k$ đầu vào ngẫu nhiên. Nếu $f$ cân bằng, xác suất mọi câu trả lời giống nhau là khoảng $2\cdot2^{-k}$. Với $k = 11$, xác suất sai $\le 2^{-10}$. Vậy chỉ cần **hằng số** lần hỏi nếu chấp nhận sai rất nhỏ. Lợi thế của Deutsch–Jozsa chỉ là hàm mũ so với thuật toán *tất định*. Bài toán Simon mới là bước tiến thật sự.
:::

:::quiz
Q: Trong Deutsch–Jozsa, nếu bỏ $H^{\otimes n}$ ở bước 3 và đo ngay sau oracle, ta được gì?
- [ ] Vẫn phân biệt được hằng/cân bằng || Pha $(-1)^{f(x)}$ không ảnh hưởng tới xác suất $|\pm\tfrac{1}{\sqrt{2^n}}|^2$.
- [x] Một chuỗi bit ngẫu nhiên đều, không chứa thông tin về $f$ || Thông tin nằm trong pha tương đối; phải giao thoa (H cuối) mới chuyển nó thành xác suất.
:::

## Kết nối

- **Nền tảng:** [[cong-mach]] (phase kickback), [[song-hat]] (giao thoa kế).
- **Tiếp theo:** [[grover]] (cùng oracle pha, nhưng lặp lại), [[qft-shor]] (thay H bằng biến đổi Fourier).

## Hiểu lầm thường gặp

:::misconception “Oracle tính $f$ trên mọi $x$ song song nên thuật toán biết mọi giá trị $f(x)$.”
Sau oracle, các giá trị $f(x)$ chỉ có trong **pha**. Không phép đo nào đọc được tất cả chúng. Thuật toán chỉ trích xuất một **tính chất toàn cục** (hằng hay cân bằng) — đúng loại thông tin mà giao thoa có thể “tính tổng” được.
:::

## Góc nhìn nghiên cứu

:::research
- **Độ phức tạp truy vấn** (query complexity) là khung lý thuyết nơi lợi thế lượng tử được **chứng minh** chặt chẽ (khác với độ phức tạp thời gian, nơi ta thường chỉ có giả thuyết). Các công cụ chặn dưới: phương pháp đa thức (Beals và cộng sự 1998), phương pháp đối thủ (Ambainis 2000) và phiên bản tổng quát của nó, vốn chặt cho mọi hàm.
- **Bài toán nhóm con ẩn** (hidden subgroup problem) thống nhất Simon, Shor và logarit rời rạc trong nhóm Abel. Trường hợp không Abel (nhóm đối xứng — liên quan đến đẳng cấu đồ thị; nhóm dihedral — liên quan đến bài toán lưới) vẫn chưa có thuật toán hiệu quả, và là lý do mật mã dựa trên lưới được coi là kháng lượng tử.
:::
