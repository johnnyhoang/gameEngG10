const fs = require('fs');

const extraLessons = [
  {
    id: 'math-inequality-concept',
    subject: 'math',
    topic: 'Bất đẳng thức & BPT',
    title: 'Khái niệm bất đẳng thức và tính chất cơ bản',
    category: 'math-inequality',
    theory: '# Khái niệm bất đẳng thức và tính chất cơ bản\n\n## 1. Định nghĩa và ký hiệu\n- Dùng để so sánh hai đại lượng: lớn hơn (>), nhỏ hơn (<), lớn hơn hoặc bằng (≥), nhỏ hơn hoặc bằng (≤).\n- Nếu $a > b$, thì $a - b > 0$.\n\n## 2. Tính chất cơ bản\n1. **Tính chất bắc cầu:** Nếu $a > b$ và $b > c$ thì $a > c$.\n2. **Cộng hai vế với một số:** $a > b \\implies a + c > b + c$.\n3. **Nhân hai vế với số dương:** Nếu $c > 0$, $a > b \\implies a \\cdot c > b \\cdot c$.\n4. **Nhân hai vế với số âm:** Nếu $c < 0$, $a > b \\implies a \\cdot c < b \\cdot c$ (Đổi chiều bất đẳng thức).\n5. **Cộng hai bất đẳng thức cùng chiều:** Nếu $a > b$ và $c > d$ thì $a + c > b + d$.\n\n> **Lưu ý:** Tuyệt đối KHÔNG trừ hai bất đẳng thức cùng chiều cho nhau. Phải đổi chiều rồi mới được áp dụng.'
  },
  {
    id: 'math-inequality-cauchy',
    subject: 'math',
    topic: 'Bất đẳng thức & BPT',
    title: 'Bất đẳng thức Cauchy (AM-GM)',
    category: 'math-inequality',
    theory: '# Bất đẳng thức Cauchy (AM-GM)\n\n## 1. Phát biểu định lý\n- Trung bình cộng của n số không âm luôn lớn hơn hoặc bằng trung bình nhân của chúng.\n- **Dạng 2 số:** Với $a, b \\ge 0$, ta có: $\\frac{a + b}{2} \\ge \\sqrt{ab}$ hay $a + b \\ge 2\\sqrt{ab}$.\n- Dấu "=" xảy ra khi và chỉ khi $a = b$.\n\n## 2. Các hệ quả thường gặp\n- $(a+b)^2 \\ge 4ab$.\n- $\\frac{1}{a} + \\frac{1}{b} \\ge \\frac{4}{a+b}$ với $a,b > 0$.\n\n## 3. Ứng dụng\n- Bất đẳng thức Cauchy thường được dùng để tìm Giá trị lớn nhất (GTLN) và Giá trị nhỏ nhất (GTNN).\n- **Mẹo tìm GTNN:** Khi cần tìm GTNN của tổng $A + B$, nếu ta chứng minh được $A + B \\ge M$, và dấu "=" có thể xảy ra, thì $M$ là GTNN. Tích $A \\cdot B$ phải là hằng số để dùng Cauchy.'
  },
  {
    id: 'math-linear-inequality-1',
    subject: 'math',
    topic: 'Bất đẳng thức & BPT',
    title: 'Giải bất phương trình bậc nhất một ẩn',
    category: 'math-inequality',
    theory: '# Giải bất phương trình bậc nhất một ẩn\n\n## 1. Dạng tổng quát\n- $ax + b > 0$, $ax + b < 0$, $ax + b \\ge 0$, $ax + b \\le 0$ (với $a \\ne 0$).\n\n## 2. Các bước giải\n1. Chuyển hạng tử chứa ẩn sang một vế, hạng tử tự do sang vế kia (đổi dấu hạng tử khi chuyển vế).\n2. Thu gọn và chia cả hai vế cho hệ số của ẩn.\n3. **LƯU Ý ĐẶC BIỆT:** Nếu chia cho số âm, phải đổi chiều bất phương trình.\n\nVí dụ: $-2x + 4 > 0 \\implies -2x > -4 \\implies x < 2$.\n\n## 3. Biểu diễn tập nghiệm trên trục số\n- Dùng dấu ngoặc tròn "$($", "$)$" cho khoảng (không lấy điểm đó, tức là $>$, $<$).\n- Dùng dấu ngoặc vuông "$[$", "$]$" cho đoạn/nửa khoảng (có lấy điểm đó, tức là $\\ge$, $\\le$).\n- Gạch bỏ phần trục số không thuộc tập nghiệm.'
  },
  {
    id: 'math-linear-inequality-2',
    subject: 'math',
    topic: 'Bất đẳng thức & BPT',
    title: 'Hệ bất phương trình & BPT chứa trị tuyệt đối',
    category: 'math-inequality',
    theory: '# Hệ bất phương trình & Bất phương trình chứa dấu giá trị tuyệt đối\n\n## 1. Hệ bất phương trình bậc nhất một ẩn\n- **Cách giải:** Giải riêng từng bất phương trình trong hệ.\n- **Biểu diễn tập nghiệm:** Biểu diễn tập nghiệm của từng BPT lên cùng một trục số. Tập nghiệm của hệ là phần không bị gạch (phần giao của các tập nghiệm).\n- **Ký hiệu giao:** $\\cap$. Ví dụ $x > 2$ và $x \\le 5 \\implies 2 < x \\le 5$.\n\n## 2. Bất phương trình chứa giá trị tuyệt đối cơ bản\n- Dạng 1: $|A| < M$ (với $M > 0$) $\\iff -M < A < M$.\n- Dạng 2: $|A| > M$ (với $M > 0$) $\\iff A > M$ hoặc $A < -M$.\n\n*Lưu ý:* Luôn kiểm tra điều kiện để phân tích bỏ dấu giá trị tuyệt đối nếu biểu thức nằm trong dấu trị tuyệt đối phức tạp.'
  },
  {
    id: 'math-quadratic-function',
    subject: 'math',
    topic: 'Hàm số bậc hai',
    title: 'Hàm số y = ax² — Tính chất và đồ thị Parabol',
    category: 'math-quadratic-function',
    theory: '# Hàm số y = ax² — Tính chất và đồ thị Parabol\n\n## 1. Tính chất hàm số y = ax² ($a \\ne 0$)\n- Tập xác định: $\\mathbb{R}$.\n- Nếu $a > 0$: Hàm số nghịch biến khi $x < 0$ và đồng biến khi $x > 0$. GTNN là $y = 0$ khi $x = 0$.\n- Nếu $a < 0$: Hàm số đồng biến khi $x < 0$ và nghịch biến khi $x > 0$. GTLN là $y = 0$ khi $x = 0$.\n\n## 2. Đồ thị Parabol (P)\n- Đồ thị là một đường cong Parabol đi qua gốc tọa độ O(0,0).\n- O(0,0) là đỉnh của Parabol.\n- Trục Oy ($x=0$) là trục đối xứng.\n- Nằm phía trên trục hoành nếu $a > 0$, nằm phía dưới nếu $a < 0$.\n\n## 3. Cách vẽ đồ thị chuẩn\n1. Lập bảng giá trị: Lấy 5 điểm đối xứng qua $x=0$, ví dụ $x = -2, -1, 0, 1, 2$.\n2. Biểu diễn các điểm trên mặt phẳng tọa độ.\n3. Dùng thước Parabol nối các điểm lại thành đường cong trơn.'
  },
  {
    id: 'lit-info-explain-1',
    subject: 'literature',
    topic: 'Văn bản thông tin',
    title: 'Đọc hiểu văn bản thông tin — Tổ chức thông tin',
    category: 'lit-reading-information',
    theory: '# Đọc hiểu văn bản thông tin — Tổ chức thông tin\n\n## 1. Mục đích của văn bản thông tin\n- Cung cấp thông tin khách quan, chính xác về một sự vật, hiện tượng, quá trình tự nhiên hoặc xã hội.\n- Giúp người đọc mở rộng hiểu biết, nâng cao nhận thức.\n\n## 2. Các cách tổ chức thông tin phổ biến\n1. **Theo trật tự thời gian:** Trình bày sự kiện theo thứ tự trước - sau (thường dùng trong văn bản lịch sử, tiểu sử, báo cáo sự kiện).\n2. **Theo trật tự không gian:** Miêu tả từ ngoài vào trong, từ trên xuống dưới (thường dùng trong giới thiệu danh lam thắng cảnh).\n3. **Theo quan hệ nguyên nhân - kết quả:** Phân tích lý do xảy ra hiện tượng và hậu quả của nó (thường dùng trong giải thích hiện tượng tự nhiên, xã hội).\n4. **Theo mức độ quan trọng:** Trình bày từ thông tin quan trọng nhất đến ít quan trọng hoặc ngược lại.\n\n## 3. Kỹ năng đọc hiểu\n- Đọc lướt (skimming) để tìm ý chính qua tiêu đề, sa-pô, đề mục.\n- Đọc dò (scanning) để tìm thông tin chi tiết (số liệu, thời gian, nhân vật).\n- Nhận biết cấu trúc để hiểu logic trình bày của tác giả.'
  },
  {
    id: 'lit-info-explain-2',
    subject: 'literature',
    topic: 'Văn bản thông tin',
    title: 'Yếu tố phi ngôn ngữ trong văn bản thông tin',
    category: 'lit-reading-information',
    theory: '# Yếu tố phi ngôn ngữ trong văn bản thông tin\n\n## 1. Yếu tố phi ngôn ngữ là gì?\n- Là các phương tiện không sử dụng từ ngữ mà dùng hình ảnh, đường nét, màu sắc, bố cục để truyền đạt thông tin.\n- Bao gồm: Hình ảnh (ảnh chụp, hình vẽ), sơ đồ, biểu đồ, đồ thị, bảng biểu, bản đồ.\n\n## 2. Vai trò của yếu tố phi ngôn ngữ\n1. **Trực quan hóa:** Giúp người đọc dễ hình dung sự vật, hiện tượng một cách sinh động, cụ thể.\n2. **Hệ thống hóa:** Bảng biểu, sơ đồ giúp tóm tắt số liệu phức tạp thành dạng dễ đối chiếu, so sánh và ghi nhớ.\n3. **Tăng tính thuyết phục:** Các số liệu trong biểu đồ cung cấp bằng chứng khách quan, đáng tin cậy.\n4. **Hỗ trợ yếu tố ngôn ngữ:** Bổ sung ý nghĩa cho phần chữ viết, giúp văn bản bớt nhàm chán và hấp dẫn hơn.\n\n## 3. Cách đọc hiểu phối hợp\n- Đọc nhan đề của bảng/biểu đồ để biết chủ đề.\n- Chú thích và đơn vị đo lường.\n- Kết nối thông tin từ hình ảnh với nội dung trong đoạn văn bản để hiểu trọn vẹn ý nghĩa.'
  },
  {
    id: 'lit-info-review-1',
    subject: 'literature',
    topic: 'Văn bản thông tin',
    title: 'Đọc hiểu văn bản giới thiệu sách, bộ phim',
    category: 'lit-reading-information',
    theory: '# Đọc hiểu văn bản giới thiệu sách, bộ phim\n\n## 1. Đặc điểm văn bản giới thiệu tác phẩm nghệ thuật\n- Cung cấp thông tin cơ bản về tác phẩm (tên, tác giả/đạo diễn, năm xuất bản/phát hành, thể loại).\n- Tóm tắt ngắn gọn nội dung mà không làm lộ kết thúc (không spoil).\n- Nêu lên những điểm đặc sắc về nghệ thuật, nhân vật, thông điệp.\n- Thể hiện sự đánh giá, nhận xét của người giới thiệu để khơi gợi sự hứng thú của người đọc.\n\n## 2. Bố cục thường gặp\n1. **Mở đầu:** Nêu tên tác phẩm, tác giả và ấn tượng khái quát.\n2. **Thân bài:**\n   - Tóm tắt bối cảnh, cốt truyện chính.\n   - Nổi bật đặc điểm nhân vật.\n   - Phân tích nét độc đáo về nghệ thuật (ngôn từ, kỹ xảo, góc quay).\n3. **Kết luận:** Tổng kết giá trị tác phẩm và khuyến nghị người xem.\n\n## 3. Kỹ năng tiếp nhận\n- Phân biệt đâu là sự thật khách quan (năm xuất bản, diễn viên) và đâu là ý kiến chủ quan của người viết (hay, cảm động, xuất sắc).'
  },
  {
    id: 'lit-info-review-2',
    subject: 'literature',
    topic: 'Văn bản thông tin',
    title: 'Đánh giá và nhận xét trong văn bản thông tin',
    category: 'lit-reading-information',
    theory: '# Đánh giá và nhận xét trong văn bản thông tin\n\n## 1. Sự đan xen giữa Thông tin và Bình luận\n- Trong các bài viết giới thiệu sách, phim hay bài báo phân tích hiện tượng, yếu tố thông tin (sự thật, dữ kiện khách quan) luôn đi kèm với bình luận (đánh giá chủ quan).\n- **Sự thật (Fact):** Bộ phim đoạt 3 giải Oscar vào năm 2023.\n- **Ý kiến (Opinion):** Kịch bản phim thực sự là một kiệt tác của điện ảnh hiện đại.\n\n## 2. Tiêu chí đánh giá tính thuyết phục\n1. **Lý lẽ rõ ràng:** Lời nhận xét phải dựa trên những cơ sở cụ thể (ví dụ: khen phim hay vì diễn xuất của nam chính rất chân thực).\n2. **Bằng chứng xác đáng:** Dùng chi tiết từ tác phẩm (một câu thoại đắt giá, một hình ảnh biểu tượng) để chứng minh.\n3. **Thái độ khách quan:** Đánh giá cả điểm mạnh và điểm hạn chế, không ca ngợi mù quáng hay chê bai cực đoan.\n\n## 3. Bài học khi làm bài thi\n- Đề thi thường yêu cầu học sinh chỉ ra yếu tố nhận xét trong văn bản và đánh giá tính hợp lý của nó.\n- Cần chỉ rõ bằng chứng mà tác giả đã sử dụng để làm nền tảng cho nhận xét đó.'
  },
  {
    id: 'lit-write-narrative-1',
    subject: 'literature',
    topic: 'Kỹ năng Viết',
    title: 'Kỹ thuật viết văn tự sự kết hợp miêu tả nội tâm',
    category: 'lit-writing',
    theory: '# Kỹ thuật viết văn tự sự kết hợp miêu tả nội tâm\n\n## 1. Tự sự kết hợp miêu tả nội tâm là gì?\n- Kể lại sự việc (tự sự) kết hợp với việc tái hiện những suy nghĩ, cảm xúc, dằn vặt, trăn trở của nhân vật (miêu tả nội tâm).\n- Miêu tả nội tâm giúp câu chuyện có chiều sâu, nhân vật trở nên sống động, chân thực, giúp người đọc thấu hiểu động cơ hành động.\n\n## 2. Các phương thức miêu tả nội tâm\n- **Trực tiếp:** Dùng ngôn ngữ kể để bộc lộ trực tiếp suy nghĩ, tình cảm. Dấu hiệu: từ ngữ chỉ cảm xúc (vui, buồn, sợ hãi), câu độc thoại nội tâm.\n- **Gián tiếp:** Thể hiện tâm trạng qua cử chỉ, ánh mắt, nét mặt, lời nói và cảnh vật xung quanh (Tả cảnh ngụ tình).\n\n## 3. Cách thức thực hành trong bài làm\n- Xây dựng tình huống có vấn đề để nhân vật bộc lộ tâm lý (một quyết định khó khăn, một sự hối hận).\n- Dừng lại ở các "điểm nút" của cốt truyện để chèn đoạn miêu tả nội tâm dài 3-5 câu.\n- Dùng độc thoại nội tâm: "Trời ơi, sao tôi lại làm thế?", "Liệu mọi người có tha thứ cho mình không?".\n- Sử dụng các hình ảnh so sánh, ẩn dụ để cụ thể hóa tâm trạng vô hình.'
  },
  {
    id: 'eng-writing-email-1',
    subject: 'english',
    topic: 'Kỹ năng Viết (Writing)',
    title: 'Viết email trang trọng (Formal Email)',
    category: 'eng-writing',
    theory: '# Viết email trang trọng (Formal Email)\n\n## 1. Khi nào dùng Formal Email?\nGửi cho thầy cô, nhà trường, đối tác, người xin việc, cơ quan tổ chức, hoặc người lạ lớn tuổi.\n\n## 2. Cấu trúc chuẩn\n1. **Greeting (Chào hỏi):** Dear Mr. / Ms. [Họ/Tên], hoặc Dear Sir/Madam (nếu không biết tên).\n2. **Opening (Mở đầu):** \n   - I am writing to inform you that... (Tôi viết thư này để báo...)\n   - I am writing to request information about... (Tôi xin thông tin về...)\n3. **Body (Nội dung chính):** Viết rõ ràng, dùng ngôn ngữ lịch sự, không viết tắt (dùng I am thay vì I\'m, cannot thay vì can\'t).\n4. **Closing (Kết thúc):** \n   - I look forward to hearing from you. (Rất mong nhận phản hồi).\n   - Please let me know if you have any questions.\n5. **Sign-off (Chữ ký):**\n   - Yours sincerely, (Nếu đã xưng tên người nhận ở đầu).\n   - Yours faithfully, (Nếu dùng Dear Sir/Madam).\n\n## 3. Mẫu câu yêu cầu lịch sự\n- Could you please send me...?\n- I would be grateful if you could...\n- I would appreciate it if...'
  },
  {
    id: 'eng-writing-email-2',
    subject: 'english',
    topic: 'Kỹ năng Viết (Writing)',
    title: 'Viết email không trang trọng (Informal Email)',
    category: 'eng-writing',
    theory: '# Viết email không trang trọng (Informal Email)\n\n## 1. Khi nào dùng Informal Email?\nGửi cho bạn bè, người thân, hoặc những người ngang hàng có mối quan hệ thân thiết. Dùng ngôn ngữ thân thiện, có thể dùng câu hỏi tu từ, cảm thán, và từ viết tắt.\n\n## 2. Cấu trúc chuẩn\n1. **Greeting (Chào hỏi):** Hi [Tên], Hello, Dear [Tên],\n2. **Opening (Mở đầu):**\n   - How are things? / How is it going?\n   - Thanks for your email. / Great to hear from you.\n   - Sorry I haven\'t written for so long.\n3. **Body (Nội dung chính):** Cung cấp tin tức, mời mọc, khuyên nhủ.\n   - Guess what? (Đoán xem chuyện gì?)\n   - I\'m writing to tell you about...\n   - Why don\'t we go to...? / How about V-ing...? (Đưa ra lời khuyên/mời)\n4. **Closing (Kết thúc):**\n   - Write back soon!\n   - Can\'t wait to see you!\n   - Give my love to your family.\n5. **Sign-off (Ký tên):**\n   - Best, / Best wishes, / See you, / Lots of love, + [Tên của bạn].\n\n## 3. Lỗi thường gặp cần tránh\n- Trộn lẫn văn phong trang trọng và thân mật trong cùng một bức thư.\n- Quên trả lời tất cả các câu hỏi mà đề bài yêu cầu trong prompt (rất dễ mất điểm Task Achievement).'
  },
  {
    id: 'eng-phonetics-vowels',
    subject: 'english',
    topic: 'Từ vựng & Phát âm',
    title: 'Bảng âm chuẩn IPA — Nguyên âm và Phụ âm',
    category: 'eng-pronunciation',
    theory: '# Bảng âm chuẩn IPA — Nguyên âm và Phụ âm\n\n## 1. Vai trò của IPA\n- IPA (International Phonetic Alphabet) giúp học sinh biết cách phát âm chính xác một từ Tiếng Anh mà không cần phải đoán.\n- Trong bài thi vào 10, câu hỏi phát âm từ gạch chân thường kiểm tra sự nhận biết các âm này.\n\n## 2. Nguyên âm (Vowels)\n- **Nguyên âm ngắn:** /ɪ/ (sit), /e/ (bed), /æ/ (cat), /ʌ/ (cup), /ɒ/ (hot), /ʊ/ (put), /ə/ (about).\n- **Nguyên âm dài:** /iː/ (see), /ɑː/ (car), /ɔː/ (door), /uː/ (blue), /ɜː/ (bird).\n- **Nguyên âm đôi (Diphthongs):** /eɪ/ (day), /aɪ/ (my), /ɔɪ/ (boy), /aʊ/ (how), /əʊ/ (go), /ɪə/ (here), /eə/ (hair), /ʊə/ (tour).\n\n## 3. Phụ âm dễ nhầm lẫn trong đề thi\n- **/θ/ và /ð/:**\n  - /θ/ (vô thanh): think, math, both, through.\n  - /ð/ (hữu thanh): this, that, mother, breathe.\n- **/s/ và /z/:**\n  - Thường kiểm tra quy tắc phát âm đuôi -s/es.\n- **/tʃ/ và /dʒ/:**\n  - /tʃ/: chair, watch, nature.\n  - /dʒ/: jam, age, bridge.\n\n*Mẹo thi:* Khi gặp từ khó, hãy đối chiếu phần gạch chân với các từ quen thuộc chứa âm tương tự.'
  },
  {
    id: 'eng-grammar-mcq-1',
    subject: 'english',
    topic: 'Ngữ pháp (Grammar)',
    title: 'Chiến lược làm trắc nghiệm Ngữ pháp & Từ vựng',
    category: 'eng-grammar',
    theory: '# Chiến lược làm bài trắc nghiệm Ngữ pháp & Từ vựng\n\n## 1. Quan sát "Signal words" (Từ tín hiệu)\n- Khi làm câu hỏi chia thì động từ, hãy quét nhanh câu để tìm các trạng từ chỉ thời gian.\n  - *yesterday, in 2010* $\\rightarrow$ Quá khứ đơn.\n  - *since, for, recently* $\\rightarrow$ Hiện tại hoàn thành.\n  - *at this time tomorrow* $\\rightarrow$ Tương lai tiếp diễn.\n\n## 2. Phân tích loại từ (Từ vựng/Word form)\n- Nhìn vào chỗ trống: Phía trước là gì? Phía sau là gì?\n  - Sau mạo từ (a/an/the) $\\rightarrow$ Danh từ.\n  - Trạng từ (adv) bổ nghĩa cho Động từ (v) hoặc Tính từ (adj).\n  - Tính từ (adj) bổ nghĩa cho Danh từ (n).\n- Dùng phương pháp loại trừ (Elimination) để bỏ các đáp án sai ngữ pháp ngay từ đầu.\n\n## 3. Sự hòa hợp Chủ ngữ - Động từ (Subject-Verb Agreement)\n- Phân biệt danh từ đếm được / không đếm được.\n- *Neither/Either + danh từ* thì chia động từ theo danh từ đứng gần động từ nhất.\n- *The number of + N* $\\rightarrow$ V số ít.\n- *A number of + N* $\\rightarrow$ V số nhiều.\n\n## 4. Kiểm tra Collocations & Phrasal Verbs\n- Câu hỏi từ vựng khó thường là cụm từ cố định. Nếu không chắc chắn, hãy dựa vào tiền tố/hậu tố để đoán nét nghĩa tích cực hay tiêu cực của từ.'
  },
  {
    id: 'eng-vocab-world-future',
    subject: 'english',
    topic: 'Từ vựng & Phát âm',
    title: 'Từ vựng chủ điểm Our World & Future',
    category: 'eng-vocab',
    theory: '# Từ vựng chủ điểm Our World & Future\n\n## 1. Môi trường (Environment)\n- **Danh từ:** pollution (sự ô nhiễm), conservation (sự bảo tồn), deforestation (sự phá rừng), ecosystem (hệ sinh thái), global warming (sự nóng lên toàn cầu).\n- **Động từ:** protect (bảo vệ), preserve (giữ gìn), pollute (làm ô nhiễm), exhaust (làm cạn kiệt), recycle (tái chế).\n- **Tính từ:** eco-friendly (thân thiện với môi trường), endangered (bị đe dọa), renewable (có thể tái tạo).\n\n## 2. Công nghệ và Tương lai (Technology & Future)\n- **Danh từ:** artificial intelligence (trí tuệ nhân tạo), breakthrough (bước đột phá), invention (sự phát minh), gadget (thiết bị điện tử), cyberspace (không gian mạng).\n- **Động từ:** invent (phát minh), discover (khám phá), browse (duyệt web), upgrade (nâng cấp).\n- **Tính từ:** advanced (tiên tiến), high-tech (công nghệ cao), outdated (lỗi thời).\n\n## 3. Cụm động từ (Phrasal Verbs) thường đi kèm\n- **cut down on:** cắt giảm (lượng rác thải, năng lượng).\n- **die out:** tuyệt chủng.\n- **use up:** dùng cạn kiệt.\n- **turn up / turn down:** vặn to / vặn nhỏ.\n- **wipe out:** xóa sổ, hủy diệt.\n\n*Mẹo thi:* Các bài đọc hiểu thường có chủ đề về môi trường và công nghệ, hãy thuộc từ vựng để hiểu nhanh nội dung văn bản.'
  }
];

let content = fs.readFileSync('./src/data/lessons.ts', 'utf8');
const insertStr = extraLessons.map(l => {
  return `  {
    id: '${l.id}',
    subject: '${l.subject}',
    topic: '${l.topic}',
    title: '${l.title}',
    category: '${l.category}',
    theory: \`${l.theory.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`
  }`;
}).join(',\n');

const insertionPoint = content.lastIndexOf('];');
if (insertionPoint !== -1) {
  content = content.slice(0, insertionPoint) + ',\n' + insertStr + '\n' + content.slice(insertionPoint);
  fs.writeFileSync('./src/data/lessons.ts', content);
  console.log('Successfully appended 15 lessons');
} else {
  console.log('Failed to find ];');
}
