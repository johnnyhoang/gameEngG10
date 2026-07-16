// Cẩm Nang Học Đường — toàn bộ trang mặc định (12 trang gốc + các trang Trợ Giúp hợp nhất).
// Tách ra từ useGameState monolith khi store chuyển sang kiến trúc slices (CORE_SPECS §2.7).
import type { HandbookPage } from '../types/game';

export const INITIAL_HANDBOOK_PAGES: HandbookPage[] = [
  {
    id: 'hb-1',
    category: 'Học Vấn & Tinh Tấn',
    title: 'Học Vấn & Kinh Nghiệm (XP)',
    content: 'Học vấn (XP) đo lường trình độ kiến thức của Sĩ Tử trên học đường. Khi làm đúng mỗi câu hỏi thường ở Học Đường, con sẽ tích lũy được +15 XP.'
  },
  {
    id: 'hb-2',
    category: 'Học Vấn & Tinh Tấn',
    title: 'Vượt Chuyên Đề & Khoa Thi',
    content: 'Lĩnh ngộ thành công mỗi chuyên đề kiến thức sẽ giúp con nhận thêm +50 XP. Thi đỗ Khoa Thi nhận +150 XP và được nhân đôi điểm XP câu đúng trong bài.'
  },
  {
    id: 'hb-3',
    category: 'Học Vấn & Tinh Tấn',
    title: 'Luật Nuôi Dưỡng Linh Vật',
    content: 'Cho Heo Maikawaii ăn tăng cấp sẽ tiêu tốn 30 XP và 50 Ruby của con. Điều này có thể khiến con bị giảm cấp độ tạm thời để tập trung nuôi dưỡng Linh vật.'
  },
  {
    id: 'hb-4',
    category: 'Học Vấn & Tinh Tấn',
    title: 'Quy Tắc Thưởng Ruby',
    content: 'Ruby là đơn vị tích lũy để con đổi học cụ và quà khuyến học trong Shop Học Cụ. Làm đúng câu hỏi Trường Thi sẽ thưởng cho con +5 Ruby.'
  },
  {
    id: 'hb-5',
    category: 'Học Vấn & Tinh Tấn',
    title: 'Luật Đăng Khoa Liên Tiếp (Combo)',
    content: 'Làm đúng liên tiếp từ 3 câu trở lên sẽ nhận hệ số nhân Ruby cực lớn x1.2, x1.5, x2.0. Chỉ cần làm sai một câu, chuỗi trả lời liên tiếp sẽ bị reset.'
  },
  {
    id: 'hb-6',
    category: 'Trường Thi & Khoa Cử',
    title: 'Năng Lượng Học Tập',
    content: 'Năng Lượng (Energy) là tài nguyên cần thiết để làm bài tập ở Trường Thi. Mỗi lượt luyện tập thường tiêu hao 30 Năng Lượng của Sĩ Tử.'
  },
  {
    id: 'hb-7',
    category: 'Trường Thi & Khoa Cử',
    title: 'Luật Tiêu Hao Năng Lượng',
    content: 'Mỗi Khoa Thi tiêu hao 100 Năng Lượng và được trừ ngay khi vào lượt thi. Nếu con bỏ cuộc giữa chừng, lượng Năng Lượng này không được hoàn lại.'
  },
  {
    id: 'hb-8',
    category: 'Trường Thi & Khoa Cử',
    title: 'Số Lượt Làm Bài & Trái Tim',
    content: 'Sĩ Tử có tối đa 3 Trái tim trong mỗi lượt làm bài khảo thí ở Trường Thi. Mỗi câu làm sai sẽ bị khấu trừ 1 Trái tim của con.'
  },
  {
    id: 'hb-9',
    category: 'Trường Thi & Khoa Cử',
    title: 'Luật Phạm Quy Trường Thi',
    content: 'Hết Trái tim giữa lượt thi sẽ thất bại và bị giảm 50% số Ruby và XP kiếm được trong lượt đó. Đồng thời Heo Maikawaii sẽ buồn bã giảm 5 điểm vui vẻ.'
  },
  {
    id: 'hb-10',
    category: 'Học Viện Quy Củ',
    title: 'Duy Trì Chuỗi Đèn Sách',
    content: 'Con cần chăm chỉ học tập mỗi ngày để duy trì Chuỗi học tập (Streak) của bản thân. Chuỗi học tập tăng giúp rèn luyện thói quen và nhận thưởng lớn.'
  },
  {
    id: 'hb-11',
    category: 'Học Viện Quy Củ',
    title: 'Luật Chuyên Cần',
    content: 'Giữ chuỗi càng lâu thưởng càng lớn: ngày 2 được +10 Ruby, ngày 3 +20 Ruby, từ ngày 4 mỗi ngày +30 Ruby. Bỏ quá 24 giờ không học thì chuỗi reset về 0 (không bị trừ điểm) và phải leo lại từ đầu.'
  },
  {
    id: 'hb-12',
    category: 'Học Viện Quy Củ',
    title: 'Thử Thách Bất Ngờ',
    content: 'Khi ôn luyện hoặc đăng nhập, con có 5% cơ hội gặp Thử Thách Bất Ngờ để nhận +100 Năng Lượng hoặc một bài kiểm tra từ Trợ Giáo MIKA.'
  }
];

// Cốt lõi Cẩm Nang Học Đường là help/guide — mọi điểm chạm "?" trong app đều mở thẳng 1 trang ở đây
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
    id: 'help-energy', category: 'Trợ Giúp Nhanh', title: 'Năng Lượng (Energy)', content: '', audience: 'student',
    bullets: [
      '• Năng Lượng hồi đầy mỗi ngày lúc 0h.',
      '• Mỗi lượt luyện thường tốn 30 Năng Lượng.',
      '• Khoa Thi tốn 100 Năng Lượng, trừ ngay khi bắt đầu.',
      '• Cạn Năng Lượng thì nghỉ một nhịp và chờ hồi.'
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
    id: 'help-nanite', category: 'Trợ Giúp Nhanh', title: 'Ruby', content: '', audience: 'student',
    bullets: [
      '• Ruby là tiền tệ trong game, trả công cho câu đúng.',
      '• Ruby dùng để mua Thẻ Nhắc Bài, Thẻ Chuyên Cần, Hồi Nguyên Đan, Phong Cách Học Đường và đổi quà.',
      '• Kiếm Ruby đều tay thì chơi mượt hơn nhiều.'
    ]
  },
  {
    id: 'help-wallet', category: 'Trợ Giúp Nhanh', title: 'Quà Khuyến Học', content: '', audience: 'student',
    bullets: [
      '• Đây là phần thưởng thật do Chủ Nhiệm Chính hoặc Viện Trưởng tạo, có số lượng giới hạn — đổi sớm để không bị hết.',
      '• Đổi xong sẽ trừ Ruby ngay và chờ người quản lý trao quà thật ngoài đời.',
      '• Khi người quản lý bấm "Đã Trao" thì yêu cầu hoàn tất.'
    ]
  },
  {
    id: 'help-adult', category: 'Trợ Giúp Nhanh', title: 'Heo Maikawaii', content: '', audience: 'student',
    bullets: [
      '• Heo Maikawaii lớn lên theo tiến trình tu luyện của con.',
      '• Cho Heo Maikawaii ăn chỉ tốn 10 Ruby và 5 XP mỗi lần — cho ăn thoải mái nhé!',
      '• Hết Ruby thì Heo tự về chuồng ngủ, cày thêm Ruby ở Học Đường rồi cho ăn tiếp.',
      '• Muốn Heo Maikawaii khôn lớn, con phải học đều chứ không được bỏ phòng.'
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
      '• Học đều thì chuỗi tăng — ngày 2 thưởng +10 Ruby, ngày 3 +20 Ruby, ngày 4 trở đi +30 Ruby/ngày.',
      '• Bỏ quá 24h không học là chuỗi gãy, quay về 0 (không bị trừ điểm).',
      '• Có Thẻ Chuyên Cần thì còn cứu được, nhưng đừng ỷ lại.'
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
    id: 'help-parent-console', category: 'Trợ Giúp Quản Trị', title: 'Phòng Điều Hành', content: '', audience: 'admin',
    bullets: [
      '• Sổ Danh Bộ: quản lý tài khoản Sĩ Tử và cấp quyền toàn viện.',
      '• Kho Đề Thi: lọc ngân hàng câu hỏi theo môn, dạng và thang chấm.',
      '• Phòng Tài Vụ: duyệt đổi quà, cấu hình Năng Lượng và định mức Ruby/XP.',
      '• Hồ Sơ Sĩ Tử: xem hồ sơ chi tiết từng Sĩ Tử.'
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
