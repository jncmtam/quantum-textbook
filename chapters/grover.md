:::question
Một danh bạ có một triệu số điện thoại, không theo thứ tự nào. Bạn cần tìm số của một người. Trung bình phải xem nửa triệu số. Máy tính lượng tử có thể làm điều đó với khoảng **785** lần “nhìn”. Nó không nhìn vào tất cả cùng lúc — vậy nó làm gì?
:::

## Trực giác: đảo quanh trung bình

Hãy tưởng tượng $N$ phần tử, mỗi phần tử có một biên độ, ban đầu đều bằng $1/\sqrt N$. Thuật toán Grover lặp lại hai bước:

1. **Oracle** lật dấu biên độ của phần tử cần tìm. (Xác suất chưa đổi — biên độ âm bình phương vẫn vậy.)
2. **Khuếch tán** — *đảo mọi biên độ quanh giá trị trung bình*: $a \mapsto 2\bar a - a$.

Vì phần tử đúng bị lật xuống âm, trung bình giảm nhẹ. Khi đảo quanh trung bình, các phần tử sai (nằm ngay trên trung bình) chỉ giảm chút ít, còn phần tử đúng (nằm xa phía dưới) bị bật lên cao. Mỗi vòng, biên độ đúng tăng thêm khoảng $2/\sqrt N$. Sau khoảng $\sqrt N$ vòng, gần như toàn bộ xác suất dồn vào đáp án.

:::sim grover
Bấm lần lượt “① Oracle” rồi “② Khuếch tán” và theo dõi thanh đỏ cùng đường trung bình xanh lá. Sau đó dùng “Một vòng Grover”. Với $n = 4$ ($N = 16$), xác suất cực đại sau 3 vòng. Chạy thêm vòng thứ 4, 5: xác suất **giảm** — mũi tên ở hình dưới đã quay quá đích.
:::

## Vì sao thuật toán này quan trọng?

Tìm kiếm không cấu trúc là một mô hình của **mọi bài toán mà ta chỉ biết kiểm tra lời giải**: tìm khóa mật mã, tìm phép gán thỏa mãn một công thức logic, tìm cấu hình tối ưu. Grover (1996) cho tăng tốc **bậc hai** cho tất cả chúng. Và đáng chú ý: Bennett, Bernstein, Brassard, Vazirani (1997) chứng minh **không thể làm tốt hơn** — $\Omega(\sqrt N)$ lần hỏi là cần thiết với mọi thuật toán lượng tử. Grover là tối ưu.

## Nền tảng toán học: bức tranh hình học

:::derivation Grover là một phép quay trong mặt phẳng hai chiều
Gọi $|w\rangle$ là phần tử cần tìm (giả sử có $M = 1$). Đặt $|s'\rangle = \frac{1}{\sqrt{N-1}}\sum_{x\neq w}|x\rangle$ (chồng chập đều các phần tử sai). Trạng thái ban đầu:
$$|s\rangle = \frac{1}{\sqrt N}\sum_x|x\rangle = \sin\theta\,|w\rangle + \cos\theta\,|s'\rangle,\qquad \sin\theta = \frac{1}{\sqrt N}.$$

---
**Oracle** $O = I - 2|w\rangle\langle w|$ là phép **phản xạ qua $|s'\rangle$** (đổi dấu thành phần $|w\rangle$).

---
**Khuếch tán** $D = 2|s\rangle\langle s| - I$ là phép **phản xạ qua $|s\rangle$**. Kiểm tra nó là “đảo quanh trung bình”: với $|\psi\rangle = \sum_x a_x|x\rangle$, $\langle s|\psi\rangle = \sqrt N\,\bar a$, nên $D|\psi\rangle = \sum_x(2\bar a - a_x)|x\rangle$. ✓ Thực hiện bằng mạch: $D = H^{\otimes n}(2|0\rangle\langle0| - I)H^{\otimes n}$.

---
**Hai phép phản xạ liên tiếp là một phép quay** với góc gấp đôi góc giữa hai trục phản xạ. Góc giữa $|s'\rangle$ và $|s\rangle$ là $\theta$, nên mỗi vòng $G = DO$ quay trạng thái thêm $2\theta$ về phía $|w\rangle$. Sau $k$ vòng:
$$G^k|s\rangle = \sin\big((2k+1)\theta\big)|w\rangle + \cos\big((2k+1)\theta\big)|s'\rangle.$$

---
Xác suất thành công $\sin^2((2k+1)\theta)$ đạt cực đại khi $(2k+1)\theta \approx \pi/2$:
$$k^* \approx \frac{\pi}{4\theta} \approx \frac{\pi}{4}\sqrt N.$$
Với $N = 10^6$: $k^* \approx 785$. Với $M$ đáp án: $\sin\theta = \sqrt{M/N}$, $k^*\approx\frac\pi4\sqrt{N/M}$.
:::

:::physics
Toàn bộ động lực học của một thuật toán trên không gian $2^n$ chiều bị giới hạn trong một **mặt phẳng hai chiều** span$\{|w\rangle, |s'\rangle\}$. Đây là một kỹ thuật phân tích mạnh: tìm không gian con bất biến nhỏ. Ý tưởng tổng quát hóa thành **khuếch đại biên độ** (amplitude amplification, Brassard–Høyer–Mosca–Tapp 2002): bất kỳ thuật toán nào thành công với xác suất $p$ đều có thể được tăng lên gần 1 với $O(1/\sqrt p)$ lần lặp thay vì $O(1/p)$.
:::

:::sim circuit {"preset":"grover3"}
Grover trên 3 qubit, đánh dấu $|101\rangle$, chạy 2 vòng. Oracle được xây bằng X, H và Toffoli (thành cổng CCZ). Đo 1024 lần: $|101\rangle$ xuất hiện khoảng 94,5% — đúng $\sin^2(5\theta)$ với $\sin\theta = 1/\sqrt8$.
:::

## Bài tập

:::exercise Trường hợp $N = 4$
Chứng minh rằng với $N = 4$, $M = 1$, chỉ **một** vòng Grover cho xác suất thành công bằng đúng 1.
???solution
$\sin\theta = 1/2$, $\theta = \pi/6$. Sau 1 vòng: $\sin(3\theta) = \sin(\pi/2) = 1$. Có thể kiểm tra trong mô phỏng mạch, preset “Grover 2 qubit”. Bằng “đảo quanh trung bình”: sau oracle các biên độ là $(\tfrac12, \tfrac12, \tfrac12, -\tfrac12)$, trung bình $\tfrac14$; đảo: $2\cdot\tfrac14 - \tfrac12 = 0$ cho ba phần tử sai và $2\cdot\tfrac14 + \tfrac12 = 1$ cho phần tử đúng.
:::

:::exercise Grover và mật mã
Khóa AES-128 có $2^{128}$ khả năng. Thuật toán Grover cần khoảng bao nhiêu lần gọi hàm mã hóa (dưới dạng mạch lượng tử)? Vì sao chuyên gia khuyên chuyển sang AES-256 thay vì coi AES “bị phá”?
???solution
$\tfrac\pi4\sqrt{2^{128}} \approx 2^{64}$ lần lặp. Grover giảm độ an toàn hiệu dụng một nửa số bit. AES-256 dưới Grover vẫn có độ an toàn $\sim2^{128}$. Hơn nữa, các vòng Grover phải chạy **tuần tự** (không song song hóa hiệu quả: chia cho $P$ máy chỉ được tăng tốc $\sqrt P$), và mỗi vòng là một mạch AES lượng tử sâu, chạy trên phần cứng chịu lỗi — chi phí thực tế khổng lồ.
:::

:::quiz
Q: Nếu không biết có bao nhiêu đáp án $M$, điều gì có thể sai?
- [x] Chạy sai số vòng có thể cho xác suất thành công thấp — vì Grover là phép quay, quay quá đích làm xác suất giảm || Có cách khắc phục: chọn số vòng ngẫu nhiên tăng dần (Boyer–Brassard–Høyer–Tapp), hoặc ước lượng $M$ bằng đếm lượng tử (quantum counting).
- [ ] Không có gì: chạy càng nhiều vòng càng tốt || Grover dao động tuần hoàn, không hội tụ đơn điệu.
:::

## Kết nối

- **Nền tảng:** [[deutsch-jozsa]] (oracle pha, H – oracle – H), [[vecto]] (phản xạ, phép chiếu).
- **Mở rộng:** khuếch đại biên độ, ước lượng biên độ (amplitude estimation — tăng tốc bậc hai cho Monte Carlo), bước đi lượng tử (quantum walks), và vai trò trong [[bien-phan]] khi so sánh với các heuristic tối ưu.

## Hiểu lầm thường gặp

:::misconception “Grover giải được bài toán NP-đầy đủ trong thời gian đa thức.”
Grover cho $O(\sqrt{2^n}) = O(2^{n/2})$ — vẫn hàm mũ. Định lý BBBV chỉ ra rằng không thể làm tốt hơn với tìm kiếm hộp đen. Lợi thế lượng tử cho bài toán NP-đầy đủ, nếu có, phải khai thác cấu trúc của bài toán.
:::

:::misconception “Grover tìm trong cơ sở dữ liệu thật nhanh hơn.”
Để dùng Grover trên một cơ sở dữ liệu thật, dữ liệu phải được truy cập trong chồng chập (QRAM) — một thiết bị mà xây dựng hiệu quả và chịu lỗi vẫn là câu hỏi mở. Với dữ liệu thật, chỉ riêng việc nạp dữ liệu đã tốn $O(N)$. Grover hữu ích khi “oracle” là một **phép tính** (kiểm tra lời giải), không phải tra cứu bảng.
:::

## Góc nhìn nghiên cứu

:::research
- Lợi thế bậc hai có thể **không đủ** trong thực tế: Babbush và cộng sự (PRX Quantum, 2021) phân tích rằng với chi phí cổng chịu lỗi hiện tại, tăng tốc bậc hai cần thời gian chạy rất dài mới vượt được máy cổ điển. Điều này hướng nghiên cứu sang các lợi thế bậc cao hơn hoặc hàm mũ.
- **Ước lượng biên độ** không cần ước lượng pha (Suzuki và cộng sự, 2020) và các biến thể thân thiện với NISQ là hướng đang được khám phá cho tài chính và Monte Carlo.
:::
