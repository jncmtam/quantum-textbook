:::question
Ở chương trước, photon trong giao thoa kế được mô tả bằng một cặp số phức. Electron trong nguyên tử, spin của một hạt, phân cực của ánh sáng, trạng thái của một qubit siêu dẫn — liệu có một ngôn ngữ chung cho tất cả chúng?
:::

## Trực giác

Có. Ý tưởng then chốt của cơ học lượng tử là: **trạng thái của một hệ là một vectơ** trong một không gian vectơ phức có tích trong. Mọi điều ta biết về giao thoa — biên độ cộng lại, pha tương đối quan trọng, pha toàn cục thì không — đều là hệ quả của việc trạng thái là vectơ.

Nhiều người thấy điều này khó chịu: một electron *là* một mũi tên trong một không gian trừu tượng ư? Hãy thử nghĩ khác đi: vectơ trạng thái không phải là *bản thân* electron, mà là **bản tóm tắt đầy đủ nhất** về mọi dự đoán có thể đưa ra cho electron đó. Nó là một danh mục biên độ, và mọi thí nghiệm ta có thể làm đều được tính ra từ danh mục ấy.

## Vì sao lại là vectơ?

Vì **nguyên lý chồng chập**, một sự thật thực nghiệm: nếu một hệ có thể được chuẩn bị ở trạng thái $A$ và ở trạng thái $B$, thì nó cũng có thể được chuẩn bị ở những trạng thái “kết hợp” của $A$ và $B$ — với mọi tỉ lệ và mọi pha tương đối — và những trạng thái kết hợp ấy cho ra các hiện tượng giao thoa *không* có ở $A$ hay $B$. Cấu trúc toán học duy nhất cho phép “kết hợp với hệ số phức tùy ý” là không gian vectơ phức.

## Bản chất: ký hiệu Dirac

Dirac đề xuất một ký hiệu gọn, nay là chuẩn của toàn ngành.

- **Ket** $|\psi\rangle$: một vectơ trạng thái (vectơ cột). Chữ bên trong chỉ là nhãn: $|0\rangle$, $|{\uparrow}\rangle$, $|\text{trên}\rangle$, $|E_1\rangle$...
- **Bra** $\langle\phi|$: chuyển vị liên hợp của ket, $\langle\phi| = |\phi\rangle^\dagger$ (vectơ hàng, các thành phần đã liên hợp).
- **Bracket** $\langle\phi|\psi\rangle$: bra nhân ket, chính là **tích trong** từ chương [[vecto]]. Đây là lý do của tên gọi: *bra-c-ket*.
- **Ket-bra** $|\psi\rangle\langle\phi|$: vectơ cột nhân vectơ hàng — một **ma trận**. Đặc biệt, $|\psi\rangle\langle\psi|$ với $\langle\psi|\psi\rangle = 1$ là **phép chiếu** lên phương của $|\psi\rangle$.

:::example Dịch sang ma trận
Trong $\mathbb{C}^2$, đặt $|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}$, $|1\rangle = \begin{pmatrix}0\\1\end{pmatrix}$. Với $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$:
$$\langle\psi| = (\bar\alpha\ \ \bar\beta),\qquad \langle\psi|\psi\rangle = |\alpha|^2 + |\beta|^2,\qquad |0\rangle\langle 1| = \begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}.$$
:::

Ký hiệu Dirac mạnh ở chỗ các phép biến đổi trở thành “ghép chữ”: $|a\rangle\langle b|\,|c\rangle = |a\rangle\,\langle b|c\rangle$ — một ma trận tác động lên vectơ cho ra một vectơ nhân với một số.

## Nền tảng toán học: tiên đề về trạng thái

:::definition Tiên đề 1 — Trạng thái
Mỗi hệ lượng tử cô lập được gắn với một không gian Hilbert phức $\mathcal{H}$. Trạng thái (thuần) của hệ được mô tả bởi một vectơ đơn vị $|\psi\rangle \in \mathcal{H}$, $\langle\psi|\psi\rangle = 1$. Hai vectơ chỉ khác nhau một pha toàn cục, $|\psi\rangle$ và $e^{i\alpha}|\psi\rangle$, mô tả **cùng một** trạng thái vật lý.
:::

Ba ý trong tiên đề, mỗi ý có lý do riêng:

1. **Phức** — vì giao thoa cần biên độ có pha ([[song-hat]]).
2. **Đơn vị** — vì tổng xác suất bằng 1 (định lý Pythagoras ở [[vecto]]).
3. **Pha toàn cục không quan sát được** — vì mọi xác suất đều là $|\langle\phi|\psi\rangle|^2$, mà nhân $|\psi\rangle$ với $e^{i\alpha}$ không đổi được trị tuyệt đối đó.

### Khai triển theo cơ sở và hệ thức đầy đủ

Với một cơ sở trực chuẩn $\{|k\rangle\}$:
$$|\psi\rangle = \sum_k c_k|k\rangle, \qquad c_k = \langle k|\psi\rangle.$$

:::derivation Hệ thức đầy đủ (resolution of the identity)
Thay $c_k = \langle k|\psi\rangle$ vào khai triển:
$$|\psi\rangle = \sum_k |k\rangle\langle k|\psi\rangle = \Big(\sum_k |k\rangle\langle k|\Big)|\psi\rangle.$$

---
Đẳng thức đúng với **mọi** $|\psi\rangle$, nên toán tử trong ngoặc phải là toán tử đơn vị:
$$\boxed{\sum_k |k\rangle\langle k| = I.}$$

---
Đây là “công cụ vạn năng” của tính toán lượng tử: chèn $I = \sum_k|k\rangle\langle k|$ vào bất kỳ chỗ nào để đổi cơ sở. Ví dụ, tích trong của hai trạng thái:
$$\langle\phi|\psi\rangle = \langle\phi|I|\psi\rangle = \sum_k \langle\phi|k\rangle\langle k|\psi\rangle = \sum_k \bar d_k c_k.$$
:::

### Chồng chập là phụ thuộc vào cơ sở

$|{+}\rangle = \tfrac1{\sqrt2}(|0\rangle + |1\rangle)$ là một chồng chập *trong cơ sở* $\{|0\rangle, |1\rangle\}$. Nhưng trong cơ sở $\{|{+}\rangle, |{-}\rangle\}$, nó chỉ đơn giản là vectơ cơ sở thứ nhất. “Ở trong chồng chập” không phải là một tính chất tuyệt đối của trạng thái, mà là quan hệ giữa trạng thái và một cơ sở — thường là cơ sở của phép đo mà ta định làm.

:::physics
Vậy điều gì *thực sự* có ý nghĩa vật lý trong một chồng chập? Hai thứ: (1) **độ lớn** các hệ số trong cơ sở đo, quyết định xác suất; và (2) **pha tương đối** giữa các hệ số, quyết định kết quả giao thoa khi ta đo trong một cơ sở *khác*. Trạng thái $\tfrac1{\sqrt2}(|0\rangle + |1\rangle)$ và $\tfrac1{\sqrt2}(|0\rangle - |1\rangle)$ cho cùng xác suất khi đo theo $\{|0\rangle,|1\rangle\}$ nhưng hoàn toàn phân biệt được khi đo theo $\{|{+}\rangle, |{-}\rangle\}$.
:::

### Không gian Hilbert vô hạn chiều — một lời nhắc

Với một hạt chuyển động trên đường thẳng, cơ sở là các trạng thái vị trí $|x\rangle$, chỉ số $x$ liên tục. Tổng thành tích phân:
$$|\psi\rangle = \int \psi(x)\,|x\rangle\,dx, \qquad \psi(x) = \langle x|\psi\rangle, \qquad \int|x\rangle\langle x|\,dx = I.$$

Hàm $\psi(x)$ chính là **hàm sóng**: tọa độ của vectơ trạng thái trong cơ sở vị trí. Điều kiện chuẩn hóa là $\int|\psi(x)|^2dx = 1$. Có những tinh tế toán học ($|x\rangle$ không chuẩn hóa được, cần lý thuyết phân bố), nhưng mọi trực giác hữu hạn chiều vẫn đúng. Cuốn sách này làm việc chủ yếu trong hữu hạn chiều, nơi mọi thứ là ma trận.

## Ví dụ

:::example Phân cực của photon
Một photon phân cực ngang: $|H\rangle$; dọc: $|V\rangle$. Phân cực chéo 45°: $|D\rangle = \tfrac1{\sqrt2}(|H\rangle + |V\rangle)$. Phân cực tròn: $|R\rangle = \tfrac1{\sqrt2}(|H\rangle - i|V\rangle)$, $|L\rangle = \tfrac{1}{\sqrt2}(|H\rangle + i|V\rangle)$ (quy ước dấu khác nhau tùy sách). Cùng một không gian $\mathbb{C}^2$, cùng toán học với spin và qubit. Pha tương đối $\pm i$ phân biệt phân cực tròn trái và phải.
:::

:::exercise Chuẩn hóa và pha
Cho $|\psi\rangle = 3|0\rangle + 4i|1\rangle$ (chưa chuẩn hóa). (a) Chuẩn hóa nó. (b) Tính $\langle{+}|\psi\rangle$ và $\langle{-}|\psi\rangle$. (c) Kiểm tra rằng $|\langle{+}|\psi\rangle|^2 + |\langle{-}|\psi\rangle|^2 = 1$.
???solution
(a) $\|\psi\|^2 = 9 + 16 = 25$, nên $|\psi\rangle = \tfrac15(3|0\rangle + 4i|1\rangle)$.
(b) $\langle{\pm}| = \tfrac1{\sqrt2}(\langle0| \pm \langle 1|)$, nên $\langle{\pm}|\psi\rangle = \tfrac{1}{5\sqrt2}(3 \pm 4i)$.
(c) $|3\pm4i|^2 = 25$, nên mỗi số là $\tfrac{25}{50} = \tfrac12$, tổng bằng 1. ✓ Lưu ý: kết quả 50/50 trong cơ sở $\pm$ là do pha $i$ — với $3|0\rangle + 4|1\rangle$ (không có $i$), bạn sẽ được $\tfrac{49}{50}$ và $\tfrac1{50}$.
:::

:::exercise Phép chiếu
Chứng minh rằng $P = |\psi\rangle\langle\psi|$ (với $\langle\psi|\psi\rangle = 1$) thỏa $P^2 = P$ và $P^\dagger = P$. Giải thích bằng hình học vì sao $P^2 = P$.
???solution
$P^2 = |\psi\rangle\langle\psi|\psi\rangle\langle\psi| = |\psi\rangle\cdot 1\cdot\langle\psi| = P$. $P^\dagger = (\langle\psi|)^\dagger(|\psi\rangle)^\dagger = |\psi\rangle\langle\psi| = P$. Hình học: chiếu một lần đưa vectơ về phương của $|\psi\rangle$; chiếu thêm lần nữa không thay đổi gì vì nó đã nằm trên phương đó. Ở [[phep-do]], tính chất này tương ứng với việc **lặp lại cùng một phép đo cho cùng kết quả**.
:::

:::quiz
Q: Hai ket $|\psi\rangle$ và $-|\psi\rangle$ mô tả...
- [x] cùng một trạng thái vật lý || $-1 = e^{i\pi}$ là một pha toàn cục.
- [ ] hai trạng thái trực giao || Chúng song song (cùng phương), không trực giao.
- [ ] hai trạng thái cho xác suất ngược nhau || Mọi xác suất đều có dạng $|\langle\phi|\psi\rangle|^2$, không đổi khi đổi dấu.
:::

:::quiz
Q: Nhưng $|0\rangle + |1\rangle$ và $|0\rangle - |1\rangle$ (đã chuẩn hóa) thì sao?
- [ ] Cũng là cùng trạng thái, vì chỉ khác dấu || Dấu trừ chỉ nằm trên *một* thành phần — đó là pha **tương đối**, không phải pha toàn cục.
- [x] Là hai trạng thái trực giao, phân biệt được hoàn toàn || $\langle{+}|{-}\rangle = 0$; đo theo cơ sở $\{|{+}\rangle, |{-}\rangle\}$ phân biệt chúng với xác suất 1.
:::

## Kết nối

- **Nền tảng:** [[vecto]] (tích trong, cơ sở trực chuẩn), [[song-hat]] (vì sao cần biên độ phức).
- **Tiếp theo:** [[phep-do]] cho biết cách lấy xác suất từ vectơ trạng thái; [[schrodinger]] cho biết vectơ trạng thái thay đổi theo thời gian; [[ma-tran-mat-do]] mở rộng khái niệm trạng thái cho trường hợp ta không biết chắc trạng thái thuần.

## Hiểu lầm thường gặp

:::misconception “Chồng chập nghĩa là hệ ở trong cả hai trạng thái cùng một lúc.”
Câu này dễ nhớ nhưng gây hiểu lầm. $|{+}\rangle$ không phải là “một nửa $|0\rangle$ và một nửa $|1\rangle$” theo nghĩa hỗn hợp: một hỗn hợp 50/50 của $|0\rangle$ và $|1\rangle$ cho kết quả **khác** $|{+}\rangle$ khi đo theo cơ sở $\pm$. $|{+}\rangle$ là một trạng thái xác định, hoàn toàn chắc chắn trong cơ sở của chính nó. Phân biệt chồng chập với hỗn hợp là chủ đề của [[ma-tran-mat-do]].
:::

:::misconception “Hàm sóng là một con sóng thật trong không gian.”
Với $N$ hạt, hàm sóng là một hàm trên không gian cấu hình $3N$ chiều. Không có “con sóng” nào trong không gian ba chiều của ta có thể chứa thông tin ấy.
:::

## Góc nhìn nghiên cứu

:::research
- **Trạng thái lượng tử là “thực” hay chỉ là “kiến thức”?** Định lý PBR (Pusey, Barrett, Rudolph, Nature Physics 2012) chỉ ra rằng, dưới một số giả định hợp lý, vectơ trạng thái không thể chỉ là thông tin về một thực tại tiềm ẩn nào đó — nó phải tương ứng với một yếu tố của thực tại. Định lý gây ra một làn sóng nghiên cứu về các *mô hình ontological*.
- **Tomography trạng thái** — tái dựng vectơ trạng thái (hay ma trận mật độ) từ dữ liệu đo — cần số phép đo tăng theo hàm mũ với số qubit. Các phương pháp như classical shadows, tomography bằng mạng tensor và học máy là những hướng giảm chi phí này.
:::

:::status debated
Ý nghĩa “thực tại” của vectơ trạng thái là câu hỏi diễn giải còn tranh luận (ψ-ontic hay ψ-epistemic). Cách tính toán thì không có tranh cãi: mọi diễn giải chuẩn đều cho cùng tiên đoán thực nghiệm.
:::
