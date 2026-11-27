:::question
Bạn đã đi từ số phức tới sửa lỗi lượng tử. Bây giờ là câu hỏi của người làm nghiên cứu: *đâu là những bài toán thật sự còn mở, và mình có thể đóng góp vào đâu?*
:::

Chương này là một **bản đồ**, không phải một bài giảng. Với mỗi hướng nghiên cứu, ta trả lời cùng một bộ câu hỏi: bài toán gốc là gì, vì sao lĩnh vực xuất hiện, cần nền tảng gì, nguyên lý nào đứng đằng sau, các phương pháp chính, các công trình mốc, những gì còn mở, và nó nối với các hướng khác ra sao. Mỗi khẳng định được gắn nhãn mức độ chắc chắn.

:::warning Về các trích dẫn
Các công trình được nêu là những mốc được cộng đồng thừa nhận rộng rãi. Nghiên cứu lượng tử thay đổi rất nhanh: trước khi dựa vào một con số (số qubit, tỉ lệ lỗi, ước lượng tài nguyên), hãy kiểm tra phiên bản mới nhất trên arXiv (quant-ph) và các bài tổng quan gần đây.
:::

## Cách đọc một paper lượng tử

Trước khi vào từng hướng, đây là bộ câu hỏi nên đặt ra cho **mọi** bài báo:

1. **Bài toán:** paper giải quyết câu hỏi gì? Vì sao câu hỏi đó quan trọng *bây giờ*?
2. **Giả định:** mô hình nhiễu nào? Truy cập dữ liệu kiểu gì (oracle, QRAM, dữ liệu lượng tử)? Thuật toán cổ điển dùng để so sánh có phải là tốt nhất hiện có không?
3. **Loại kết quả:** chứng minh toán học, mô phỏng số, hay thực nghiệm? Ở quy mô nào?
4. **Thước đo:** độ trung thực, tỉ lệ lỗi logic, số cổng $T$, độ sâu mạch, thời gian chạy thực — và so với cái gì?
5. **Giới hạn:** paper tự nêu những giới hạn nào? Những giới hạn nào nó *không* nêu?
6. **Tái hiện:** bạn có thể tái tạo một kết quả nhỏ (một hình, một bảng) bằng mô phỏng không?

:::tip
Một bài tập nghiên cứu tốt cho mọi hướng dưới đây: chọn một paper mốc, tái hiện một kết quả ở quy mô nhỏ bằng mô phỏng (ví dụ với trình mô phỏng mạch trong sách, hoặc Qiskit/Cirq/PennyLane), rồi viết một trang phản biện theo sáu câu hỏi trên.
:::

## 1. Sửa lỗi lượng tử & chịu lỗi

- **Bài toán gốc:** chạy phép tính dài tùy ý trên phần cứng nhiễu.
- **Vì sao xuất hiện:** thuật toán Shor (1994) cho thấy giá trị của máy tính lượng tử lớn; nhiễu là rào cản duy nhất không thể né tránh.
- **Nền tảng:** [[sua-loi]], lý thuyết nhóm (nhóm Pauli, Clifford), mã cổ điển (tuyến tính, LDPC), xác suất.
- **Nguyên lý:** rời rạc hóa lỗi qua đo hội chứng; định lý ngưỡng; điều kiện Knill–Laflamme.
- **Phương pháp:** mã stabilizer, mã bề mặt, mã màu, mã qLDPC; bộ giải mã (matching, union-find, belief propagation + OSD, mạng nơ-ron); phẫu thuật mạng (lattice surgery); chưng cất trạng thái ma thuật.
- **Mốc:** Shor (1995) mã 9 qubit; Steane (1996); Gottesman (1997) stabilizer; Kitaev (1997/2003) mã toric; Aharonov–Ben-Or (1997) ngưỡng; Fowler và cộng sự (PRA 2012) mã bề mặt thực tế; Panteleev–Kalachev (2021) qLDPC tốt; Google Quantum AI (Nature 2025) dưới ngưỡng.
- **Còn mở:** giải mã nhanh và chính xác cho qLDPC; kiến trúc phần cứng cho kết nối không cục bộ; giảm chi phí cổng phi-Clifford; lỗi tương quan (tia vũ trụ, rò rỉ trạng thái) vi phạm giả định của định lý ngưỡng.
- **Cơ hội:** thiết kế mã phù hợp nhiễu thiên lệch (biased noise) của cat qubit; mã cho kiến trúc mô-đun; công cụ phần mềm mã nguồn mở cho mô phỏng và giải mã (Stim, PyMatching là ví dụ tốt).
- **Kết nối:** phần cứng (mục 2), biên dịch (mục 3), lý thuyết thông tin (mục 9), vật lý vật chất ngưng tụ (pha tô-pô).

:::status experimental
Qubit logic hoạt động dưới ngưỡng đã được trình diễn trên vài nền tảng (2023–2025). Chưa có máy tính chịu lỗi chạy được thuật toán hữu ích ở quy mô lớn.
:::

## 2. Phần cứng & kiến trúc lượng tử

- **Bài toán gốc:** chế tạo qubit có thời gian kết hợp dài, cổng nhanh và chính xác, đọc tin cậy, và mở rộng lên hàng triệu.
- **Các nền tảng chính:** mạch siêu dẫn (transmon, fluxonium, cat qubit); ion bẫy; nguyên tử trung hòa trong bẫy quang học (tweezer); photon; spin trong bán dẫn; tâm màu (NV, SiV); qubit tô-pô (đang nghiên cứu).
- **Nguyên lý:** [[schrodinger]] (hệ hai mức, dao động Rabi), [[ma-tran-mat-do]] (T₁, T₂), điện động lực học lượng tử mạch/khoang.
- **Mốc:** Cirac–Zoller (1995) đề xuất máy tính ion; Nakamura (1999) qubit siêu dẫn; Koch và cộng sự (2007) transmon; Arute và cộng sự (Nature 2019) lấy mẫu mạch ngẫu nhiên 53 qubit; Bluvstein và cộng sự (Nature 2024) mạch logic trên 48 qubit logic nguyên tử trung hòa.
- **Còn mở:** dây dẫn và làm lạnh cho hàng triệu qubit; nhiễu hai mức (TLS) trong vật liệu; kết nối mô-đun qua photon; tốc độ cổng của ion và nguyên tử; tính đồng đều của qubit spin.
- **Cơ hội:** khoa học vật liệu cho giảm tổn hao; điều khiển tối ưu (optimal control) cho cổng; đặc trưng hóa và học mô hình nhiễu.

:::status debated
Không có nền tảng nào chắc chắn “thắng”. Mỗi nền tảng có hồ sơ ưu–nhược khác nhau, và có thể máy tương lai là lai (ví dụ: xử lý trên siêu dẫn, liên kết bằng photon).
:::

## 3. Biên dịch & xác minh lượng tử

- **Bài toán gốc:** biến thuật toán trừu tượng thành chuỗi xung trên phần cứng cụ thể một cách tối ưu, và **chứng minh** chương trình đúng.
- **Nền tảng:** [[cong-mach]] (phổ dụng, Clifford + T, Solovay–Kitaev), lý thuyết đồ thị, trình biên dịch cổ điển.
- **Phương pháp:** tổng hợp mạch (synthesis), định tuyến qubit, tối ưu hóa dựa trên ZX-calculus, biên dịch cho mã sửa lỗi; xác minh hình thức (formal verification), kiểm tra tương đương mạch; xác minh tính toán lượng tử từ xa bằng giao thức tương tác (Mahadev 2018 — xác minh cổ điển cho BQP dưới giả định mật mã).
- **Còn mở:** tổng hợp tối ưu số cổng $T$ cho mạch lớn; biên dịch nhận biết nhiễu; xác minh hiệu quả cho máy không mô phỏng được; ngôn ngữ lập trình lượng tử an toàn kiểu.
- **Kết nối:** mục 1 (biên dịch cho mã), khoa học máy tính lý thuyết, mật mã.

## 4. Mô phỏng lượng tử, hóa học & vật liệu

- **Bài toán gốc:** tính các tính chất của hệ lượng tử nhiều hạt (năng lượng phân tử, cơ chế phản ứng, siêu dẫn nhiệt độ cao) mà máy cổ điển không làm nổi.
- **Vì sao xuất hiện:** Feynman (1982): “tự nhiên không cổ điển, khỉ thật, và nếu muốn mô phỏng nó thì phải làm nó lượng tử”. Lloyd (Science 1996) chứng minh mô phỏng Hamiltonian cục bộ là hiệu quả.
- **Nền tảng:** [[schrodinger]], [[tensor]], [[qft-shor]] (ước lượng pha), hóa lượng tử (Hartree–Fock, cơ sở orbital), hạt đồng nhất và lượng tử hóa lần hai.
- **Phương pháp:** Trotter–Suzuki, LCU, qubitization, QSVT; ước lượng pha; VQE ([[bien-phan]]); mô phỏng tương tự (analog) bằng nguyên tử lạnh/ion.
- **Mốc:** Aspuru-Guzik và cộng sự (Science 2005) — QPE cho hóa học; Reiher và cộng sự (PNAS 2017) — ước lượng tài nguyên cho FeMoco (cố định đạm); Low–Chuang (2017, 2019) — qubitization.
- **Còn mở:** bài toán chuẩn bị trạng thái ban đầu có độ chồng lấp tốt với trạng thái cơ bản; lợi thế lượng tử thực tế cho hóa học có tồn tại theo hàm mũ không (Lee và cộng sự, Nature Communications 2023 đưa ra bằng chứng hoài nghi cho nhiều hệ hóa học); động lực học ngoài cân bằng là ứng viên hứa hẹn hơn.
- **Cơ hội:** chọn bài toán ứng dụng có “độ khó cổ điển” được kiểm chứng kỹ; kết hợp phương pháp cổ điển mạnh (DMRG, coupled cluster, QMC) với lượng tử.

:::status debated
“Mô phỏng hóa học sẽ là ứng dụng sát thủ đầu tiên” là quan điểm phổ biến nhưng đang bị chất vấn nghiêm túc. Mô phỏng động lực học và vật liệu tương quan mạnh có thể là nơi lợi thế rõ ràng hơn.
:::

## 5. Thuật toán biến phân & tối ưu lượng tử

- **Bài toán gốc:** khai thác máy NISQ cho tối ưu tổ hợp và tìm trạng thái cơ bản.
- **Nền tảng & phương pháp:** xem [[bien-phan]]; ủ lượng tử (quantum annealing), tính toán đoạn nhiệt (Farhi và cộng sự 2000/2001); QAOA; Grover và bước đi lượng tử ([[grover]]).
- **Mốc:** Peruzzo và cộng sự (2014); Farhi–Goldstone–Gutmann (2014); McClean và cộng sự (2018) barren plateaus; Cerezo và cộng sự (Nature Reviews Physics 2021) tổng quan.
- **Còn mở:** có lợi thế lượng tử nào cho tối ưu tổ hợp không, kể cả xấp xỉ? Mối quan hệ giữa khả năng huấn luyện và khả năng mô phỏng cổ điển. Chi phí giảm nhiễu.
- **Cơ hội:** benchmark trung thực so với thuật toán cổ điển tốt nhất (không chỉ so với tham chiếu yếu); lý thuyết về cảnh quan tối ưu.

## 6. Học máy, AI và mô hình sinh lượng tử

- **Bài toán gốc:** máy tính lượng tử có học được tốt hơn — nhanh hơn, ít dữ liệu hơn, biểu diễn tốt hơn — không?
- **Ba nhánh:** (a) thuật toán lượng tử cho học máy (HHL — Harrow, Hassidim, Lloyd, PRL 2009; QSVM, quantum kernels); (b) mô hình lượng tử có tham số (mạng nơ-ron lượng tử, **Born machines**, **quantum Boltzmann machines** — Amin và cộng sự, PRX 2018); (c) học máy cổ điển *cho* lượng tử (giải mã, điều khiển, tomography, thiết kế thí nghiệm).
- **Nguyên lý:** quy tắc Born làm mô hình xác suất ([[phep-do]]); không gian Hilbert như không gian đặc trưng; nhiệt động lượng tử cho mô hình Boltzmann.
- **Mốc:** Biamonte và cộng sự (Nature 2017) tổng quan; Havlíček và cộng sự (Nature 2019); Tang (STOC 2019) dequantization; Huang và cộng sự (Nature Communications 2021 “Power of data in quantum machine learning”; Science 2022 lợi thế học từ thí nghiệm); Liu, Arunachalam, Temme (Nature Physics 2021) lợi thế chứng minh được dựa trên logarit rời rạc.
- **“AI lượng tử”:** thuật ngữ thường được dùng lỏng lẻo. Phần có nội dung khoa học rõ là: học tăng cường với môi trường lượng tử, tác tử lượng tử (Dunjko–Briegel), và dùng AI để thiết kế/điều khiển máy lượng tử.
- **Còn mở:** lợi thế thực tế trên dữ liệu cổ điển; nạp dữ liệu (QRAM) hiệu quả; tổng quát hóa của mô hình lượng tử; đánh giá mô hình sinh lượng tử.
- **Cơ hội:** dữ liệu lượng tử từ cảm biến (mục 10); benchmark trung thực; lý thuyết học thống kê cho mô hình lượng tử.

:::status debated
Phần lớn các tuyên bố lợi thế cho QML trên dữ liệu cổ điển chưa đứng vững trước phân tích cẩn thận. Lợi thế chứng minh được tồn tại cho các bài toán có cấu trúc đặc biệt và cho dữ liệu lượng tử.
:::

## 7. Mật mã & truyền thông lượng tử

- **Bài toán gốc:** truyền tin bí mật với an toàn dựa trên vật lý; phân phối rối; xây dựng Internet lượng tử.
- **Nền tảng:** [[bb84]], [[dich-chuyen]], [[roi-luong-tu]].
- **Mốc:** Bennett–Brassard (1984); Ekert (PRL 1991); Shor–Preskill (PRL 2000) chứng minh an toàn; Lo–Ma–Chen (PRL 2005) trạng thái mồi; Lo–Curty–Qi (PRL 2012) MDI-QKD; Kimble (Nature 2008) tầm nhìn Internet lượng tử; Wehner–Elkouss–Hanson (Science 2018) lộ trình các giai đoạn của Internet lượng tử.
- **Còn mở:** bộ lặp lượng tử thực tế; bộ nhớ lượng tử lâu và hiệu quả; tốc độ DIQKD; tiêu chuẩn chứng nhận an ninh cho thiết bị thực.
- **Kết nối:** mật mã hậu lượng tử (mặt toán học của cùng mối đe dọa), cảm biến phân tán (mục 10), tính toán phân tán.

## 8. Độ phức tạp lượng tử

- **Bài toán gốc:** máy tính lượng tử giải được những gì hiệu quả, và *không* giải được những gì?
- **Nền tảng:** [[cong-mach]] (BQP), lý thuyết độ phức tạp cổ điển.
- **Mốc:** Bernstein–Vazirani (1993/1997) định nghĩa BQP; Kitaev (2002) QMA-đầy đủ của Hamiltonian cục bộ; Aaronson–Arkhipov (2011) boson sampling; Raz–Tal (2019) tách BQP khỏi hệ phân cấp đa thức tương đối với oracle; Ji và cộng sự (2020) MIP* = RE.
- **Còn mở:** BQP so với NP; giả thuyết PCP lượng tử (bước tiến: định lý NLTS, Anshu–Breuckmann–Nirkhe 2023); độ khó của lấy mẫu mạch ngẫu nhiên có nhiễu.

## 9. Lý thuyết thông tin lượng tử

- **Bài toán gốc:** giới hạn cơ bản của việc lưu trữ, truyền và xử lý thông tin bằng hệ lượng tử.
- **Nền tảng:** [[ma-tran-mat-do]] (entropy von Neumann), [[xac-suat]] (Shannon), kênh lượng tử.
- **Mốc:** Holevo (1973) giới hạn Holevo; Schumacher (PRA 1995) nén lượng tử; Bennett và cộng sự (1996) chưng cất rối; Holevo–Schumacher–Westmoreland (1997–98) dung lượng cổ điển của kênh lượng tử; Hastings (Nature Physics 2009) phản ví dụ cho giả thuyết cộng tính.
- **Còn mở:** công thức dung lượng lượng tử (siêu kích hoạt — superactivation — cho thấy dung lượng không cộng tính); lý thuyết tài nguyên (rối, tính ma thuật, độ kết hợp); nhiệt động lực học lượng tử.

## 10. Cảm biến & đo lường lượng tử

- **Bài toán gốc:** đo các đại lượng vật lý (từ trường, thời gian, gia tốc, sóng hấp dẫn) chính xác hơn giới hạn cổ điển.
- **Nguyên lý:** pha tương đối mang thông tin ([[so-phuc]]); giới hạn lượng tử chuẩn $\Delta\phi\sim1/\sqrt N$ ([[xac-suat]]) và giới hạn Heisenberg $\Delta\phi\sim1/N$ khi dùng rối hoặc trạng thái nén; thông tin Fisher lượng tử.
- **Mốc:** Caves (PRD 1981) ánh sáng nén cho giao thoa kế; Giovannetti–Lloyd–Maccone (Science 2004; Nature Photonics 2011); Degen–Reinhard–Cappellaro (Reviews of Modern Physics 2017) tổng quan; LIGO dùng ánh sáng nén trong vận hành thường xuyên; đồng hồ nguyên tử quang học với độ chính xác $10^{-18}$.
- **Còn mở:** giữ lợi thế Heisenberg khi có nhiễu (thường bị giảm về hằng số); cảm biến phân tán bằng mạng rối; ứng dụng y sinh (tâm NV).
- **Cơ hội:** đây có lẽ là lĩnh vực lượng tử **gần ứng dụng thực tế nhất**, và cần ít qubit nhất.

## 11. Nền tảng lượng tử

- **Bài toán gốc:** cơ học lượng tử thực sự nói gì về thực tại? Vì sao lại có cấu trúc này (số phức, quy tắc Born, tích tensor)?
- **Nền tảng:** [[phep-do]], [[roi-luong-tu]], [[trang-thai]].
- **Chủ đề:** bài toán đo lường và các diễn giải; định lý Bell, Kochen–Specker, PBR; tái dựng cơ học lượng tử từ tiên đề thông tin (Hardy 2001; Chiribella–D'Ariano–Perinotti 2011); nhân quả lượng tử và trật tự nhân quả bất định; ranh giới lượng tử–cổ điển (mô hình sụp đổ GRW/CSL, giao thoa vật lớn); bạn của Wigner và các định lý không tồn tại (no-go) mới (Frauchiger–Renner 2018).
- **Đặc điểm:** nhiều câu hỏi từng là triết học đã trở thành thí nghiệm (Bell, số phức, sụp đổ tự phát). Hãy tìm câu hỏi nền tảng **có thể kiểm chứng**.

:::status debated
Không có đồng thuận về diễn giải cơ học lượng tử. Tất cả diễn giải chuẩn đều cho cùng tiên đoán cho các thí nghiệm hiện có; một số mô hình sụp đổ thì đưa ra tiên đoán khác và đang bị thực nghiệm giới hạn dần.
:::

## Mạng lưới kết nối

| Hướng | Phụ thuộc mạnh vào | Cung cấp cho |
|---|---|---|
| Sửa lỗi | lý thuyết thông tin, phần cứng | mọi thuật toán chịu lỗi |
| Phần cứng | vật lý, vật liệu, điều khiển | mọi hướng thực nghiệm |
| Biên dịch & xác minh | mạch, độ phức tạp | phần cứng, sửa lỗi |
| Mô phỏng/hóa/vật liệu | ước lượng pha, biến phân | ứng dụng khoa học |
| Biến phân & tối ưu | mạch nông, tối ưu cổ điển | QML, hóa học NISQ |
| QML & mô hình sinh | biến phân, thống kê, độ phức tạp | cảm biến (dữ liệu lượng tử) |
| Mật mã & mạng | rối, không sao chép | an ninh, cảm biến phân tán |
| Độ phức tạp | mạch, tính toán cổ điển | đánh giá mọi tuyên bố lợi thế |
| Thông tin lượng tử | entropy, kênh | sửa lỗi, mật mã |
| Cảm biến | giao thoa, rối, ước lượng | ứng dụng gần nhất |
| Nền tảng | đo lường, Bell | ý nghĩa của tất cả |

## Lộ trình tự học tiếp theo

1. **Sách nền:** Nielsen & Chuang, *Quantum Computation and Quantum Information* — đọc lại toàn bộ các chương 1–10 sau cuốn sách này sẽ nhẹ nhàng hơn nhiều. Preskill, *Lecture Notes for Physics 219* (miễn phí). Wilde, *Quantum Information Theory*. Sakurai, *Modern Quantum Mechanics* cho vật lý.
2. **Thực hành:** viết lại từng mô phỏng trong sách bằng Python/NumPy; dùng Qiskit, Cirq hoặc PennyLane chạy trên trình mô phỏng và (nếu có) phần cứng thật qua đám mây.
3. **Đọc paper:** theo dõi arXiv quant-ph; bắt đầu với các bài tổng quan (*Reviews of Modern Physics*, *Nature Reviews Physics*), rồi các paper mốc được nêu ở trên.
4. **Chọn câu hỏi:** câu hỏi tốt cho người mới thường là: *tái hiện một kết quả, thay đổi một giả định, và đo xem kết quả thay đổi thế nào.*

:::research
**Một vài câu hỏi nghiên cứu cụ thể, vừa sức để bắt đầu:**
- Với một họ ansatz cụ thể, đo phương sai gradient theo số qubit bằng mô phỏng — có barren plateau không? Có mô phỏng cổ điển hiệu quả cho nó không?
- Với mã lặp và mã bề mặt nhỏ, mô phỏng tỉ lệ lỗi logic dưới nhiễu thiên lệch (lỗi $Z$ nhiều hơn $X$) — mã nào được lợi?
- Với BB84 có kích thước khóa hữu hạn, tỉ lệ khóa an toàn giảm bao nhiêu so với giới hạn tiệm cận?
- Với một Hamiltonian spin nhỏ, so sánh VQE (có nhiễu shot) và ước lượng pha (lý tưởng) về số lần gọi mạch để đạt cùng độ chính xác.
:::

Chúc bạn đi tiếp con đường này. Hãy nhớ triết lý của cuốn sách: đừng chỉ học một ý tưởng *là gì* — hãy hỏi nó **ra đời từ đâu, vì sao nó đúng, nó nối với điều gì, và bạn có thể xây gì mới trên nó**.
