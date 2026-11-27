// Mục lục của giáo trình. Thêm chương mới: tạo tệp chapters/<id>.md và khai báo ở đây.
//   prereqs: các chương nên đọc trước (dùng để cảnh báo thiếu nền tảng và vẽ bản đồ kiến thức)
//   links:   các kết nối xuyên chương khác (không bắt buộc đọc trước) — { to, kind }
//            kind: foundation (nền tảng toán học) | interpretation (diễn giải vật lý) | application (ứng dụng) | extension (mở rộng) | research (nghiên cứu)
export const BOOK = {
  title: 'Cơ học Lượng tử & Tính toán Lượng tử',
  subtitle: 'Một giáo trình sinh động — từ những nguyên lý đầu tiên tới biên giới nghiên cứu',
  parts: [
    {
      id: 'p0', title: 'Mở đầu', chapters: [
        { id: 'loi-mo-dau', title: 'Lời mở đầu: đọc cuốn sách này thế nào', minutes: 8, prereqs: [] },
      ],
    },
    {
      id: 'p1', title: 'Phần I — Ngôn ngữ toán học', chapters: [
        { id: 'so-phuc', title: 'Số phức — ngôn ngữ của pha', minutes: 35, prereqs: [], sims: ['phasor'] },
        { id: 'vecto', title: 'Vectơ, không gian vectơ & tích trong', minutes: 40, prereqs: ['so-phuc'], sims: ['inner'] },
        { id: 'ma-tran', title: 'Ma trận, trị riêng & vectơ riêng', minutes: 45, prereqs: ['vecto'], sims: ['matrix'] },
        { id: 'xac-suat', title: 'Xác suất — từ đồng xu tới phân phối', minutes: 35, prereqs: [], sims: ['probability'] },
        { id: 'tensor', title: 'Tích tensor — ghép các hệ lại với nhau', minutes: 30, prereqs: ['ma-tran'] },
      ],
    },
    {
      id: 'p2', title: 'Phần II — Khi vật lý cổ điển rạn nứt', chapters: [
        { id: 'khung-hoang', title: 'Khủng hoảng năm 1900: ánh sáng, nhiệt và nguyên tử', minutes: 30, prereqs: [] },
        { id: 'song-hat', title: 'Giao thoa và lưỡng tính sóng–hạt', minutes: 40, prereqs: ['so-phuc', 'xac-suat', 'khung-hoang'], sims: ['interference', 'mzi'] },
      ],
    },
    {
      id: 'p3', title: 'Phần III — Cơ học lượng tử', chapters: [
        { id: 'trang-thai', title: 'Trạng thái, chồng chập & ký hiệu Dirac', minutes: 45, prereqs: ['vecto', 'song-hat'] },
        { id: 'phep-do', title: 'Phép đo & quy tắc Born', minutes: 40, prereqs: ['trang-thai', 'xac-suat'], sims: ['born'] },
        { id: 'toan-tu', title: 'Toán tử, đại lượng quan sát & nguyên lý bất định', minutes: 50, prereqs: ['ma-tran', 'phep-do'] },
        { id: 'schrodinger', title: 'Phương trình Schrödinger & tiến hóa thời gian', minutes: 50, prereqs: ['toan-tu'], sims: ['wellbox'] },
        { id: 'spin', title: 'Spin — hệ hai mức của tự nhiên', minutes: 35, prereqs: ['toan-tu'] },
        { id: 'ma-tran-mat-do', title: 'Ma trận mật độ, trạng thái hỗn hợp & mất kết hợp', minutes: 45, prereqs: ['spin', 'tensor'], sims: ['bloch'] },
        { id: 'roi-luong-tu', title: 'Rối lượng tử & bất đẳng thức Bell', minutes: 55, prereqs: ['tensor', 'spin', 'ma-tran-mat-do'], sims: ['chsh'] },
      ],
    },
    {
      id: 'p4', title: 'Phần IV — Tính toán lượng tử', chapters: [
        { id: 'qubit-bloch', title: 'Qubit & quả cầu Bloch', minutes: 35, prereqs: ['spin', 'phep-do'], sims: ['bloch'] },
        { id: 'cong-mach', title: 'Cổng lượng tử & mạch lượng tử', minutes: 50, prereqs: ['qubit-bloch', 'tensor'], sims: ['circuit'] },
        { id: 'dich-chuyen', title: 'Không sao chép, mã hóa siêu đặc & dịch chuyển lượng tử', minutes: 45, prereqs: ['cong-mach', 'roi-luong-tu'], sims: ['circuit'] },
        { id: 'deutsch-jozsa', title: 'Giao thoa như một tài nguyên: Deutsch–Jozsa', minutes: 40, prereqs: ['cong-mach'], sims: ['circuit'] },
        { id: 'grover', title: 'Thuật toán tìm kiếm Grover', minutes: 45, prereqs: ['deutsch-jozsa'], sims: ['grover', 'circuit'] },
        { id: 'qft-shor', title: 'Biến đổi Fourier lượng tử & thuật toán Shor', minutes: 60, prereqs: ['deutsch-jozsa'], sims: ['circuit'] },
        { id: 'bb84', title: 'Mật mã lượng tử: giao thức BB84', minutes: 35, prereqs: ['phep-do', 'qubit-bloch'], sims: ['bb84'] },
        { id: 'sua-loi', title: 'Sửa lỗi lượng tử', minutes: 55, prereqs: ['cong-mach', 'ma-tran-mat-do'], sims: ['circuit'] },
      ],
    },
    {
      id: 'p5', title: 'Phần V — Biên giới nghiên cứu', chapters: [
        { id: 'bien-phan', title: 'Thuật toán biến phân, NISQ & học máy lượng tử', minutes: 50, prereqs: ['cong-mach', 'toan-tu'], sims: ['vqe'] },
        { id: 'ban-do-nghien-cuu', title: 'Bản đồ các hướng nghiên cứu', minutes: 45, prereqs: ['sua-loi', 'bien-phan'] },
      ],
    },
  ],
  links: [
    { from: 'so-phuc', to: 'song-hat', kind: 'foundation' },
    { from: 'ma-tran', to: 'toan-tu', kind: 'foundation' },
    { from: 'ma-tran', to: 'cong-mach', kind: 'foundation' },
    { from: 'xac-suat', to: 'ma-tran-mat-do', kind: 'foundation' },
    { from: 'tensor', to: 'cong-mach', kind: 'foundation' },
    { from: 'khung-hoang', to: 'schrodinger', kind: 'interpretation' },
    { from: 'roi-luong-tu', to: 'bb84', kind: 'application' },
    { from: 'roi-luong-tu', to: 'sua-loi', kind: 'extension' },
    { from: 'ma-tran-mat-do', to: 'qubit-bloch', kind: 'interpretation' },
    { from: 'schrodinger', to: 'bien-phan', kind: 'application' },
    { from: 'qft-shor', to: 'bb84', kind: 'research' },
    { from: 'sua-loi', to: 'ban-do-nghien-cuu', kind: 'research' },
    { from: 'grover', to: 'bien-phan', kind: 'extension' },
  ],
  // Mô phỏng: tên → mô tả cho Phòng thí nghiệm
  sims: {
    phasor: { title: 'Mặt phẳng phức & cộng pha', chapter: 'so-phuc' },
    inner: { title: 'Tích trong & phép chiếu', chapter: 'vecto' },
    matrix: { title: 'Ma trận như phép biến đổi — tìm vectơ riêng', chapter: 'ma-tran' },
    probability: { title: 'Luật số lớn & định lý giới hạn trung tâm', chapter: 'xac-suat' },
    interference: { title: 'Cộng biên độ hay cộng xác suất?', chapter: 'song-hat' },
    mzi: { title: 'Giao thoa kế Mach–Zehnder', chapter: 'song-hat' },
    born: { title: 'Quy tắc Born & nhiễu lấy mẫu', chapter: 'phep-do' },
    wellbox: { title: 'Hạt trong hộp: chồng chập & tiến hóa thời gian', chapter: 'schrodinger' },
    bloch: { title: 'Khám phá quả cầu Bloch (cổng & mất kết hợp)', chapter: 'qubit-bloch' },
    chsh: { title: 'Bất đẳng thức Bell — trò chơi CHSH', chapter: 'roi-luong-tu' },
    circuit: { title: 'Trình mô phỏng mạch lượng tử', chapter: 'cong-mach' },
    grover: { title: 'Grover: đảo quanh trung bình', chapter: 'grover' },
    bb84: { title: 'BB84 & kẻ nghe lén', chapter: 'bb84' },
    vqe: { title: 'VQE cho một qubit: cảnh quan năng lượng', chapter: 'bien-phan' },
  },
};

export const CHAPTERS = BOOK.parts.flatMap((p, pi) => p.chapters.map((c) => ({ ...c, part: p, partIndex: pi })));
CHAPTERS.forEach((c, i) => (c.index = i));
export const byId = new Map(CHAPTERS.map((c) => [c.id, c]));
