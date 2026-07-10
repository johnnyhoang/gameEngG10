// Cẩm Nang Bí Lục — toàn bộ trang mặc định (12 trang gốc + các trang Trợ Giúp hợp nhất).
// Tách ra từ useGameState monolith khi store chuyển sang kiến trúc slices (CORE_SPECS §2.7).
import type { HandbookPage } from '../types/game';

export const INITIAL_HANDBOOK_PAGES: HandbookPage[] = [
  {
    id: 'hb-1',
    category: 'Võ Học & Tinh Tấn',
    title: 'Tu Vi & Kinh Nghiệm (XP)',
    content: 'Tu vi (XP) đo lường trình độ võ học của Thiếu hiệp trên giang hồ. Khi làm đúng mỗi câu hỏi thường ở Hang Luyện Công, con sẽ tích lũy được +15 XP.'
  },
  {
    id: 'hb-2',
    category: 'Võ Học & Tinh Tấn',
    title: 'Vượt Ải & Diệt Boss',
    content: 'Lĩnh ngộ thành công mỗi chuyên đề võ học sẽ giúp con nhận thêm +50 XP. Quyết đấu thắng Boss nhận +150 XP và được nhân đôi điểm XP câu đúng trong trận.'
  },
  {
    id: 'hb-3',
    category: 'Võ Học & Tinh Tấn',
    title: 'Luật Lực Bất Tòng Tâm',
    content: 'Cho Heo Maikawaii ăn tăng cấp sẽ tiêu tốn 30 XP và 50 Ngân Lượng của con. Điều này có thể khiến con bị tụt cấp độ tạm thời để tập trung nuôi dưỡng pet.'
  },
  {
    id: 'hb-4',
    category: 'Võ Học & Tinh Tấn',
    title: 'Quy Tắc Thưởng Ngân Lượng',
    content: 'Ngân Lượng (NP) là tiền tệ để con mua sắm chân khí đan, mạng hồi phục, khiên bảo vệ trong shop. Làm đúng câu hỏi Đấu trường sẽ thưởng cho con +5 NP.'
  },
  {
    id: 'hb-5',
    category: 'Võ Học & Tinh Tấn',
    title: 'Luật Liên Hoàn Kích (Combo)',
    content: 'Làm đúng liên tiếp từ 3 câu trở lên sẽ nhận hệ số nhân Ngân Lượng cực lớn x1.2, x1.5, x2.0. Chỉ cần làm sai một câu, chuỗi liên hoàn kích sẽ bị reset.'
  },
  {
    id: 'hb-6',
    category: 'Đấu Trường Kỳ Ngộ',
    title: 'Chân Khí Học Tập',
    content: 'Chân khí (Energy) là năng lượng cần thiết để xuất chiêu làm bài tập ở Đấu trường. Mỗi lượt luyện tập thường tiêu hao 30 Chân khí của thiếu hiệp.'
  },
  {
    id: 'hb-7',
    category: 'Đấu Trường Kỳ Ngộ',
    title: 'Luật Chân Khí Tán Thất',
    content: 'Mỗi trận quyết đấu Boss tiêu hao 100 Chân khí và được trừ ngay khi vào trận. Nếu con bỏ cuộc giữa chừng, lượng chân khí này sẽ tiêu tán hoàn toàn.'
  },
  {
    id: 'hb-8',
    category: 'Đấu Trường Kỳ Ngộ',
    title: 'Sinh Mệnh & Tim Đấu Trường',
    content: 'Thiếu hiệp có tối đa 3 Tim sinh mệnh trong mỗi lượt đấu sinh tử ở Đấu trường. Mỗi câu làm sai sẽ bị phạt khấu trừ 1 Tim sinh mệnh của con.'
  },
  {
    id: 'hb-9',
    category: 'Đấu Trường Kỳ Ngộ',
    title: 'Luật Tẩu Hỏa Nhập Ma',
    content: 'Hết Tim giữa trận đấu sẽ thất bại và bị khấu hao 50% số Ngân Lượng và XP kiếm được. Đồng thời Heo Maikawaii sẽ buồn bã giảm 5 điểm vui vẻ.'
  },
  {
    id: 'hb-10',
    category: 'Giang Hồ Quy Tắc',
    title: 'Duy Trì Chuỗi Luyện Công',
    content: 'Con cần chăm chỉ học tập mỗi ngày để duy trì Chuỗi học tập (Streak) của bản thân. Chuỗi học tập tăng giúp rèn luyện thói quen và nhận thưởng lớn.'
  },
  {
    id: 'hb-11',
    category: 'Giang Hồ Quy Tắc',
    title: 'Luật Chuỗi Tinh Tấn',
    content: 'Giữ chuỗi càng lâu thưởng càng lớn: ngày 2 được +10 NP, ngày 3 +20 NP, từ ngày 4 mỗi ngày +30 NP. Bỏ quá 24 giờ không học thì chuỗi reset về 0 (không bị trừ điểm) và phải leo lại từ đầu.'
  },
  {
    id: 'hb-12',
    category: 'Giang Hồ Quy Tắc',
    title: 'Kỳ Ngộ Giang Hồ',
    content: 'Khi luyện công hoặc đăng nhập, con có 5% cơ hội gặp Kỳ Ngộ nhận miễn phí +100 Chân khí, hoặc gặp Khảo Hạch bất ngờ từ Linh Sư.'
  }
];

// Cốt lõi Cẩm Nang Bí Lục là help/guide — mọi điểm chạm "?" trong app đều mở thẳng 1 trang ở đây
// (thay vì một modal help riêng biệt), mỗi trang có id `help-<topic>` khớp với tham số truyền vào showHelp(topic).
const HELP_HANDBOOK_PAGES: HandbookPage[] = [
  {
    id: 'help-xp', category: 'Trợ Giúp Nhanh', title: 'Cấp độ và XP', content: '', audience: 'student',
    bullets: [
      '• Làm đúng câu hỏi là có XP. Câu càng khó, XP càng nặng tay.',
      '• Đủ XP thì lên cấp, mở thêm giới hạn và tiến hóa thú cưng.',
      '• Boss và nhiệm vụ ngày là hai mỏ thưởng lớn nhất.'
    ]
  },
  {
    id: 'help-energy', category: 'Trợ Giúp Nhanh', title: 'Chân Khí (Energy)', content: '', audience: 'student',
    bullets: [
      '• Chân Khí hồi đầy mỗi ngày lúc 0h.',
      '• Mỗi lượt luyện thường tốn 30 Chân Khí.',
      '• Quyết đấu Boss tốn 100 Chân Khí, trừ ngay khi vào trận.',
      '• Cạn Chân Khí thì nghỉ nhịp, đừng cố kéo liều.'
    ]
  },
  {
    id: 'help-hearts', category: 'Trợ Giúp Nhanh', title: 'Luật 3 Lần Sai (Sinh Tồn/Boss)', content: '', audience: 'student',
    bullets: [
      '• Boss và Sinh Tồn cho phép sai tối đa 2 câu — sai câu thứ 3 là kết thúc lượt.',
      '• Bộ đếm lỗi chỉ tính trong lượt đang chơi, hết lượt là xóa sạch.',
      '• Thua trận chỉ giữ được 50% chiến lợi phẩm thu được trong trận.',
      '• Sai ở chế độ luyện tập thường không bị tính lỗi sinh tử.'
    ]
  },
  {
    id: 'help-nanite', category: 'Trợ Giúp Nhanh', title: 'Ngân Lượng (NP)', content: '', audience: 'student',
    bullets: [
      '• NP là tiền tệ trong game, trả công cho câu đúng.',
      '• NP dùng để mua Khai Ngộ Quyển, Hộ Tâm Phù, Hồi Nguyên Đan, Phong Vị và đổi quà.',
      '• Kiếm NP đều tay thì chơi mượt hơn nhiều.'
    ]
  },
  {
    id: 'help-wallet', category: 'Trợ Giúp Nhanh', title: 'Phúc Lợi Gia Môn', content: '', audience: 'student',
    bullets: [
      '• Đây là phần thưởng thật do Viện Chủ tự tạo, có số lượng giới hạn — đổi sớm để không bị hết.',
      '• Đổi xong sẽ trừ NP ngay và chờ Viện Chủ trao quà thật ngoài đời.',
      '• Khi Viện Chủ bấm "Đã Trao" thì yêu cầu hoàn tất.'
    ]
  },
  {
    id: 'help-adult', category: 'Trợ Giúp Nhanh', title: 'Heo Maikawaii', content: '', audience: 'student',
    bullets: [
      '• Heo Maikawaii lớn lên theo tiến trình tu luyện của con.',
      '• Cho Heo Maikawaii ăn chỉ tốn 10 NP và 5 XP mỗi lần — cho ăn thoải mái nhé!',
      '• Hết NP thì Heo tự về chuồng ngủ, cày thêm NP ở Hang Luyện Công rồi cho ăn tiếp.',
      '• Muốn Heo Maikawaii khôn lớn, con phải học đều chứ không được bỏ ải.'
    ]
  },
  {
    id: 'help-prediction', category: 'Trợ Giúp Nhanh', title: 'Dự đoán điểm thi', content: '', audience: 'student',
    bullets: [
      '• Hệ thống nhìn vào kết quả làm bài để ước tính điểm thi.',
      '• Càng làm nhiều câu thì ước lượng càng chắc.',
      '• Con nên lấy đó làm mốc luyện chứ đừng xem như phán quyết cuối.'
    ]
  },
  {
    id: 'help-streak', category: 'Trợ Giúp Nhanh', title: 'Chuỗi học tập', content: '', audience: 'student',
    bullets: [
      '• Học đều thì chuỗi tăng — ngày 2 thưởng +10 NP, ngày 3 +20 NP, ngày 4 trở đi +30 NP/ngày.',
      '• Bỏ quá 24h không học là chuỗi gãy, quay về 0 (không bị trừ điểm).',
      '• Có Hộ Tâm Phù thì còn cứu được, nhưng đừng ỷ lại.'
    ]
  },
  {
    id: 'help-ai-ingest', category: 'Trợ Giúp Quản Trị', title: 'Nhập đề bằng AI', content: '', audience: 'admin',
    bullets: [
      '• Dán đề thô hoặc file câu hỏi vào khung nhập.',
      '• AI sẽ tách câu, lựa chọn đáp án và gợi ý lời giải.',
      '• Xác nhận xong là câu hỏi vào kho đề ngay.'
    ]
  },
  {
    id: 'help-parent-console', category: 'Trợ Giúp Quản Trị', title: 'Bảng quản trị', content: '', audience: 'admin',
    bullets: [
      '• Chính Điện: quản lý tài khoản thiếu hiệp và cấp quyền toàn viện.',
      '• Vạn Quyển Các: lọc ngân hàng câu hỏi theo môn, dạng và thang chấm.',
      '• Ngân Các: duyệt đổi quà, cấu hình chân khí và định mức NP/XP.',
      '• Thân Phận: xem hồ sơ chi tiết từng thiếu hiệp.'
    ]
  },
  {
    id: 'help-bank-structure', category: 'Trợ Giúp Quản Trị', title: 'Cấu trúc ngân hàng', content: '', audience: 'admin',
    bullets: [
      '• Mỗi câu nên có subject, category và metadata rõ ràng.',
      '• examPart giúp chia đề, answerMode quyết định cách chấm.',
      '• solutionSteps dùng để chấm rubric và giải thích.'
    ]
  },
  {
    id: 'help-math-bank', category: 'Trợ Giúp Quản Trị', title: 'Dạng Toán', content: '', audience: 'admin',
    bullets: [
      '• Giữ đủ các mảng: đại số, đồ thị, hình học, thực tế.',
      '• Bài nhiều ý nên tách a/b/c và solutionSteps theo từng ý.',
      '• proof hoặc diagram phải có bước trung gian rõ ràng.'
    ]
  },
  {
    id: 'help-english-bank', category: 'Trợ Giúp Quản Trị', title: 'Dạng Tiếng Anh', content: '', audience: 'admin',
    bullets: [
      '• MCQ tách riêng grammar, vocabulary, pronunciation, stress, reading.',
      '• Tự luận nên lưu đáp án chấp nhận được và biến thể.',
      '• Chấm theo dạng bài, không chấm cảm tính.'
    ]
  },
  {
    id: 'help-literature-bank', category: 'Trợ Giúp Quản Trị', title: 'Dạng Ngữ văn', content: '', audience: 'admin',
    bullets: [
      '• Tách đọc hiểu, tiếng Việt, nghị luận xã hội và nghị luận văn học.',
      '• Bài văn nên có rubric, câu mấu chốt và ý cần đạt.',
      '• Chấm theo bố cục, lập luận, dẫn chứng và diễn đạt.'
    ]
  },
  {
    id: 'help-rubric', category: 'Trợ Giúp Quản Trị', title: 'Cách chấm', content: '', audience: 'admin',
    bullets: [
      '• Bố cục phải rõ, ý phải mạch, không viết kiểu phóng tay.',
      '• Dẫn chứng và bước giải phải đủ để AI không phải đoán.',
      '• Chấm theo rubric, không chấm theo cảm giác.'
    ]
  },
  {
    id: 'help-question-type-mcq', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Trắc nghiệm', content: '', audience: 'admin',
    bullets: [
      '• Chỉ lưu một đáp án đúng.',
      '• Bốn lựa chọn phải cùng kiểu, cùng độ dài tương đối.',
      '• Giải thích ngắn, gọn, đủ để thấy vì sao đúng và sai.'
    ]
  },
  {
    id: 'help-question-type-short-answer', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Tự luận ngắn', content: '', audience: 'admin',
    bullets: [
      '• Đáp số phải rõ ràng, có đơn vị nếu cần.',
      '• Bước làm chỉ cần vừa đủ, không lan man.',
      '• Chấm cả kết quả lẫn cách đi tới kết quả.'
    ]
  },
  {
    id: 'help-question-type-proof', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Chứng minh', content: '', audience: 'admin',
    bullets: [
      '• Đi từ giả thiết sang suy luận rồi chốt kết luận.',
      '• Mỗi ý nên có một mốc chấm riêng.',
      '• Hình học thì ghi rõ góc, tam giác, hệ thức hoặc đồng dạng.'
    ]
  },
  {
    id: 'help-question-type-multi-part', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Nhiều ý', content: '', audience: 'admin',
    bullets: [
      '• Tách rõ a/b/c ngay từ đầu.',
      '• Ý nào ra kết quả riêng thì chấm riêng.',
      '• Đừng để một ý sai kéo sập cả bài nếu các ý khác vẫn ổn.'
    ]
  },
  {
    id: 'help-question-type-wordform', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Word form', content: '', audience: 'admin',
    bullets: [
      '• Lưu từ gốc và các đáp án chấp nhận được.',
      '• Chấm đúng loại từ, đúng ngữ cảnh, đúng chính tả.',
      '• Nếu có biến thể hợp lệ thì phải ghi vào.'
    ]
  },
  {
    id: 'help-question-type-rewrite', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Viết lại câu', content: '', audience: 'admin',
    bullets: [
      '• Giữ nghĩa, đổi đúng cấu trúc đề yêu cầu.',
      '• Có nhiều đáp án đúng thì lưu hết.',
      '• Chấm theo mục tiêu chuyển đổi, không soi từng chữ vụn.'
    ]
  },
  {
    id: 'help-question-type-cloze', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Điền khuyết', content: '', audience: 'admin',
    bullets: [
      '• Nhìn trước và sau chỗ trống.',
      '• Ưu tiên collocation, từ loại và ngữ cảnh.',
      '• Nếu đề có gợi ý thì dùng gợi ý để khóa đáp án.'
    ]
  },
  {
    id: 'help-question-type-reading', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Đọc hiểu', content: '', audience: 'admin',
    bullets: [
      '• Luôn gắn ngữ liệu gốc ở đầu câu.',
      '• Câu hỏi phải nói rõ cần ý chính, chi tiết hay suy luận.',
      '• Chấm theo nội dung đúng, không chỉ theo từ khóa lẻ.'
    ]
  }
];

// Toàn bộ trang Cẩm Nang mặc định: lore gốc + mọi trang trợ giúp quy đổi từ hệ thống help cũ.
export const ALL_HANDBOOK_PAGES: HandbookPage[] = [...INITIAL_HANDBOOK_PAGES, ...HELP_HANDBOOK_PAGES];
