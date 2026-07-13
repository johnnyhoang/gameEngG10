/**
 * Grade 8 Comprehensive Lesson Bank
 * Theo chương trình TP.HCM
 */

export interface Lesson {
  id: string;
  subject: string;
  topic: string;
  title: string;
  theory: string;
  examples: string[];
  practicePoints: string[];
  category: string;
  difficulty: number; // 1-10
}

export const GRADE8_LESSONS: Lesson[] = [
  // ==================== TIẾNG ANH ====================
  {
    id: 'eng-8-1',
    subject: 'english',
    topic: 'present-perfect',
    title: 'Present Perfect Tense (Hiện Tại Hoàn Thành)',
    theory: `Present Perfect được dùng để diễn tả:
1. Hành động đã xảy ra trong quá khứ nhưng vẫn còn liên quan đến hiện tại
2. Hành động bắt đầu trong quá khứ và tiếp tục đến hiện tại
3. Kinh nghiệm sống của một người

Cấu trúc: S + have/has + V3/ed
- I/You/We/They + have + V3
- He/She/It + has + V3

Ví dụ:
- I have visited Hanoi three times. (Tôi đã đi Hà Nội ba lần)
- She has lived in HCMC since 2020. (Cô ấy đã sống ở TP.HCM kể từ 2020)
- They have never tried this food before. (Họ chưa bao giờ thử thức ăn này)`,
    examples: [
      'I have finished my homework.',
      'He has worked here for 5 years.',
      'Have you ever been to the beach?',
      'She has not called me yet.'
    ],
    practicePoints: [
      'Phân biệt Present Perfect và Past Simple',
      'Dùng "for" (khoảng thời gian) và "since" (thời điểm)',
      'Dùng "ever", "never", "already", "yet" với Present Perfect',
      'Câu hỏi với "How long have you...?"'
    ],
    category: 'grammar',
    difficulty: 6
  },

  {
    id: 'eng-8-2',
    subject: 'english',
    topic: 'reported-speech',
    title: 'Reported Speech (Lời Nói Gián Tiếp)',
    theory: `Reported Speech (hay Indirect Speech) dùng để nói lại lời của người khác mà không dùng lời trích dẫn.

Quy tắc thay đổi:
1. Thì động từ lùi một bậc (Backshift)
   - Present Simple → Past Simple
   - Present Continuous → Past Continuous
   - Past Simple → Past Perfect

2. Thay đổi đại từ và tính từ sở hữu
   - I → he/she/it
   - My → his/her

3. Thay đổi trạng từ chỉ thời gian
   - Now → then
   - Today → that day
   - Tomorrow → the next day

Ví dụ:
- Direct: "I am a student," Tom said.
- Reported: Tom said (that) he was a student.

- Direct: "Where do you live?" she asked me.
- Reported: She asked me where I lived.`,
    examples: [
      'He said (that) he was going to school.',
      'She told me she had finished her work.',
      'They asked if I wanted to join them.',
      'He said he would come back tomorrow.'
    ],
    practicePoints: [
      'Backshift thì trong Reported Speech',
      'Dùng "said" với reported statement và "asked" với reported question',
      'Thay đổi pronouns, possessive adjectives, time expressions',
      'Reported Speech với modals (can → could, will → would)'
    ],
    category: 'grammar',
    difficulty: 7
  },

  {
    id: 'eng-8-3',
    subject: 'english',
    topic: 'comparative-superlative',
    title: 'Comparative & Superlative Adjectives (So Sánh & Tuyệt Đối)',
    theory: `Comparative: So sánh giữa hai người/vật
Superlative: Chỉ mức độ cao nhất trong nhóm

Quy tắc thành lập:
1. Tính từ ngắn (1-2 âm tiết):
   - Comparative: Tính từ + -er + than
   - Superlative: The + tính từ + -est
   Ví dụ: tall → taller → the tallest

2. Tính từ dài (2+ âm tiết):
   - Comparative: more + tính từ + than
   - Superlative: the most + tính từ
   Ví dụ: interesting → more interesting → the most interesting

3. Bất quy tắc:
   - good → better → the best
   - bad → worse → the worst
   - far → farther/further → the farthest/furthest`,
    examples: [
      'This book is more interesting than that one.',
      'She is the tallest girl in the class.',
      'Math is more difficult than English for me.',
      'This is the most beautiful place I have ever seen.'
    ],
    practicePoints: [
      'Nguyên tắc thêm -er/-est và doubling consonant',
      'Khi nào dùng "more/most" và khi nào dùng "-er/-est"',
      'Tính từ bất quy tắc',
      'So sánh kép: "The more... the more..." hoặc "The bigger... the better..."'
    ],
    category: 'grammar',
    difficulty: 5
  },

  {
    id: 'eng-8-4',
    subject: 'english',
    topic: 'conditional-sentences',
    title: 'Conditional Sentences (Câu Điều Kiện)',
    theory: `Conditional Sentences diễn tả tình huống giả định và kết quả của nó.

Type 1 (Có thể xảy ra):
- Form: If + Present Simple, ... will/can + V (infinitive)
- Meaning: Điều kiện có thể xảy ra, kết quả có thể xảy ra
- Example: If it rains, I will stay at home.

Type 2 (Không thể xảy ra hiện tại):
- Form: If + Past Simple, ... would + V (infinitive)
- Meaning: Giả định trái với hiện tại
- Example: If I were rich, I would travel around the world.

Type 3 (Không thể xảy ra trong quá khứ):
- Form: If + Past Perfect, ... would have + V3/ed
- Meaning: Giả định trái với quá khứ
- Example: If I had studied hard, I would have passed the test.`,
    examples: [
      'If you work hard, you will succeed.',
      'If I had a car, I would drive to school.',
      'If she had known about the party, she would have come.',
      'Unless you study, you will fail the exam.'
    ],
    practicePoints: [
      'Phân biệt Type 1, 2, 3 dựa trên thì và ý nghĩa',
      'Dùng "unless" thay cho "if not"',
      'Thay đổi vị trí if-clause và main clause',
      'Mixed conditionals: Type 2 điều kiện + Type 3 kết quả'
    ],
    category: 'grammar',
    difficulty: 7
  },

  {
    id: 'eng-8-5',
    subject: 'english',
    topic: 'passive-voice-8',
    title: 'Passive Voice (Câu Bị Động)',
    theory: `Câu bị động dùng để nhấn mạnh tác động (object) thay vì người thực hiện hành động (subject).

Cấu trúc:
- Present Simple Passive: S + am/is/are + V3/ed
- Past Simple Passive: S + was/were + V3/ed
- Present Perfect Passive: S + have/has + been + V3/ed
- Future Simple Passive: S + will be + V3/ed

So sánh:
- Active: The teacher teaches English.
- Passive: English is taught by the teacher.

Các dạng khi không nói "by + agent":
- When the agent is unknown
- When the agent is obvious
- When emphasizing the action not the agent`,
    examples: [
      'The cake was eaten by the children.',
      'English is spoken in many countries.',
      'The house is being painted by workers.',
      'Has the homework been finished by you?'
    ],
    practicePoints: [
      'Thay đổi từ Active sang Passive (tất cả các thì)',
      'Khi nào dùng "by" và khi nào không',
      'Passive Voice với double objects',
      'Thay đổi modal verbs sang Passive'
    ],
    category: 'grammar',
    difficulty: 6
  },

  {
    id: 'eng-8-6',
    subject: 'english',
    topic: 'phrasal-verbs',
    title: 'Phrasal Verbs (Động Từ Cụm)',
    theory: `Phrasal Verbs là sự kết hợp của động từ + preposition/adverb, tạo thành ý nghĩa mới hoàn toàn khác với ý nghĩa gốc.

Các loại Phrasal Verbs phổ biến lớp 8:
1. Come:
   - Come back = quay lại
   - Come across = tình cờ gặp
   - Come up with = đưa ra (ý tưởng)

2. Put:
   - Put on = mặc vào
   - Put off = hoãn lại
   - Put up with = chịu đựng

3. Look:
   - Look for = tìm kiếm
   - Look after = chăm sóc
   - Look forward to = mong chờ

4. Get:
   - Get on = bắt đầu, hòa thuận
   - Get over = vượt qua
   - Get away = trốn thoát`,
    examples: [
      'I looked forward to the summer vacation.',
      'She put on her coat before going out.',
      'He came across an old friend yesterday.',
      'Can you look after my bag while I am away?'
    ],
    practicePoints: [
      'Ghi nhớ ý nghĩa của Phrasal Verbs phổ biến',
      'Dùng đúng Phrasal Verbs trong ngữ cảnh',
      'Separable vs Inseparable Phrasal Verbs',
      'Thay thế Phrasal Verbs bằng một động từ đơn'
    ],
    category: 'vocabulary',
    difficulty: 6
  },

  {
    id: 'eng-8-7',
    subject: 'english',
    topic: 'reading-comprehension-8',
    title: 'Reading Comprehension (Đọc Hiểu)',
    theory: `Đọc hiểu là kỹ năng hiểu nội dung của bài đọc thông qua việc:
1. Tìm hiểu ý chính của mỗi đoạn
2. Tìm chi tiết cụ thể
3. Suy luận ý của tác giả
4. Hiểu từ vựng mới từ ngữ cảnh

Các dạng câu hỏi:
1. Main Idea: "What is the main idea of the passage?"
2. Detail: "According to the text, what...?"
3. Inference: "The author suggests that..."
4. Vocabulary: "The word 'xxx' in the passage means..."
5. Purpose: "Why did the author write this?"

Chiến lược đọc:
1. Skim: Đọc nhanh để hiểu ý chính
2. Scan: Tìm kiếm thông tin cụ thể
3. Close reading: Đọc kỹ từng chi tiết`,
    examples: [
      'Read the passage and answer the questions below.',
      'What is the main topic of the text?',
      'According to the passage, when did the event occur?',
      'From the text, we can infer that...'
    ],
    practicePoints: [
      'Đọc câu hỏi trước khi đọc bài',
      'Ghi dấu những từ khóa trong bài',
      'Suy luận từ ngữ cảnh thay vì dịch từng từ',
      'Quản lý thời gian khi làm bài đọc'
    ],
    category: 'reading',
    difficulty: 6
  },

  {
    id: 'eng-8-8',
    subject: 'english',
    topic: 'writing-paragraph',
    title: 'Paragraph Writing (Viết Đoạn Văn)',
    theory: `Một đoạn văn tốt gồm:
1. Topic Sentence: Câu chủ đề, nêu ý chính
2. Supporting Sentences: Câu hỗ trợ, cung cấp chi tiết, ví dụ
3. Concluding Sentence: Câu kết luận, tóm tắt hoặc chuyển tiếp

Các loại đoạn văn:
1. Descriptive: Tả lại cảnh vật, con người
   - Dùng tính từ mô tả, trạng từ chỉ vị trí
2. Narrative: Kể chuyện
   - Dùng động từ, trạng từ chỉ thời gian
3. Expository: Giải thích
   - Dùng "for example", "therefore", "as a result"
4. Persuasive: Thuyết phục
   - Dùng "believe", "should", "must", "important"`,
    examples: [
      'My Favorite Place in Ho Chi Minh City',
      'A Day I Will Never Forget',
      'Why Learning English is Important',
      'How to Make a Perfect Cup of Coffee'
    ],
    practicePoints: [
      'Viết topic sentence rõ ràng, không quá rộng',
      'Dùng transition words kết nối câu',
      'Cung cấp ví dụ cụ thể hỗ trợ ý chính',
      'Viết concluding sentence hợp lý'
    ],
    category: 'writing',
    difficulty: 6
  },

  // ==================== TOÁN HỌC ====================
  {
    id: 'math-8-1',
    subject: 'math',
    topic: 'linear-equations',
    title: 'Linear Equations in One Variable (Phương Trình Bậc Nhất Một Ẩn)',
    theory: `Phương trình bậc nhất một ẩn có dạng: ax + b = 0 (a ≠ 0)

Cách giải:
1. Chuyển vế: ax = -b
2. Chia hai vế cho a: x = -b/a

Ví dụ:
- 2x + 5 = 11
- 2x = 11 - 5 = 6
- x = 6/2 = 3

Quy tắc quan trọng:
1. Chuyển vế đổi dấu
2. Nhân/chia hai vế cho số khác 0
3. Loại bỏ mẫu bằng cách nhân với BCNN
4. Loại bỏ dấu ngoặc

Kiểm tra: Thay x = 3 vào: 2(3) + 5 = 11 ✓`,
    examples: [
      '3x - 7 = 5',
      '2(x + 3) = 14',
      '5x/2 - 3 = 2',
      '4x - 8 = 2x + 4'
    ],
    practicePoints: [
      'Giải phương trình có mẫu số',
      'Giải phương trình chứa dấu ngoặc',
      'Phương trình chứa tham số',
      'Phương trình vô nghiệm, vô số nghiệm'
    ],
    category: 'algebra',
    difficulty: 5
  },

  {
    id: 'math-8-2',
    subject: 'math',
    topic: 'linear-inequalities',
    title: 'Linear Inequalities (Bất Phương Trình Bậc Nhất)',
    theory: `Bất phương trình bậc nhất một ẩn: ax + b > 0 (hoặc <, ≤, ≥)

Tính chất:
1. Cộng/trừ: a < b ⟹ a ± c < b ± c
2. Nhân/chia dương: a < b, c > 0 ⟹ ac < bc
3. Nhân/chia âm: a < b, c < 0 ⟹ ac > bc (đảo dấu!)

Cách giải:
- Tương tự giải phương trình, nhưng chú ý đảo dấu khi nhân/chia số âm

Ví dụ:
- 2x + 3 < 9
- 2x < 6
- x < 3
- Tập nghiệm: {x | x < 3} hoặc (-∞, 3)

Biểu diễn trên trục số:
← ←←← 3 (không tô điểm 3)`,
    examples: [
      '-x + 2 > 5',
      '3x - 4 ≤ 8',
      '5 - 2x < 1',
      '2(x - 1) ≥ 4'
    ],
    practicePoints: [
      'Đảo dấu bất phương trình khi nhân/chia số âm',
      'Viết tập nghiệm dưới dạng khoảng',
      'Biểu diễn bất phương trình trên trục số',
      'Hệ bất phương trình bậc nhất'
    ],
    category: 'algebra',
    difficulty: 5
  },

  {
    id: 'math-8-3',
    subject: 'math',
    topic: 'system-equations',
    title: 'Systems of Linear Equations (Hệ Phương Trình Bậc Nhất)',
    theory: `Hệ phương trình bậc nhất hai ẩn:
{ a₁x + b₁y = c₁
{ a₂x + b₂y = c₂

Cách giải:
1. Phương pháp thế:
   - Từ phương trình 1, biểu diễn x theo y
   - Thế vào phương trình 2, giải tìm y
   - Tìm x từ phương trình 1

2. Phương pháp cộng/trừ:
   - Nhân các phương trình với số thích hợp
   - Cộng hoặc trừ để loại một ẩn
   - Giải tìm ẩn còn lại

Ví dụ:
{ 2x + y = 5    ... (1)
{ x - y = 1     ... (2)
Cộng (1) + (2): 3x = 6 ⟹ x = 2
Từ (2): 2 - y = 1 ⟹ y = 1
Vậy (x; y) = (2; 1)`,
    examples: [
      '{ 2x + y = 7; x - y = 2',
      '{ 3x - 2y = 4; x + y = 5',
      '{ x + 2y = 3; 2x - y = 4',
      '{ 5x + 3y = 1; 2x - y = 8'
    ],
    practicePoints: [
      'Chọn phương pháp giải phù hợp (thế hoặc cộng)',
      'Kiểm tra nghiệm bằng cách thay vào 2 phương trình',
      'Hệ phương trình vô nghiệm, vô số nghiệm',
      'Giải hệ phương trình có hệ số là phân số'
    ],
    category: 'algebra',
    difficulty: 6
  },

  {
    id: 'math-8-4',
    subject: 'math',
    topic: 'polynomials',
    title: 'Polynomials & Factorization (Đa Thức & Phân Tích Nhân Tử)',
    theory: `Đa thức là tổng các hạng tử, mỗi hạng tử là tích của số và các biến.

Phân tích nhân tử là biểu diễn đa thức thành tích các nhân tử.

Các phương pháp:
1. Đặt nhân tử chung: a(x + y) + b(x + y) = (x + y)(a + b)
2. Dùng hằng đẳng thức:
   - x² + 2xy + y² = (x + y)²
   - x² - 2xy + y² = (x - y)²
   - x² - y² = (x + y)(x - y)
   - x³ + y³ = (x + y)(x² - xy + y²)
   - x³ - y³ = (x - y)(x² + xy + y²)
3. Nhóm hạng tử: xy + xz + my + mz = (x + m)(y + z)
4. Tách hạng tử: ax² + bx + c`,
    examples: [
      'x² - 4 = (x + 2)(x - 2)',
      '2x² + 4x = 2x(x + 2)',
      'x² + 5x + 6 = (x + 2)(x + 3)',
      'x³ - 8 = (x - 2)(x² + 2x + 4)'
    ],
    practicePoints: [
      'Phân tích các hạng tử của đa thức',
      'Tìm ƯCLN của các hạng tử',
      'Nhận biết hằng đẳng thức',
      'Kiểm tra bằng phép nhân'
    ],
    category: 'algebra',
    difficulty: 6
  },

  {
    id: 'math-8-5',
    subject: 'math',
    topic: 'triangles-congruence',
    title: 'Triangle Congruence (Tam Giác Bằng Nhau)',
    theory: `Hai tam giác bằng nhau khi có các cạnh và góc tương ứng bằng nhau.

Các trường hợp bằng nhau:
1. Cạnh-Cạnh-Cạnh (CCC):
   Nếu 3 cạnh của tam giác này bằng 3 cạnh của tam giác kia

2. Cạnh-Góc-Cạnh (CGC):
   Nếu 2 cạnh và góc xen giữa của tam giác này bằng 2 cạnh và góc xen giữa của tam giác kia

3. Góc-Cạnh-Góc (GCG):
   Nếu 1 cạnh và 2 góc kề của tam giác này bằng 1 cạnh và 2 góc kề của tam giác kia

Ký hiệu:
△ABC ≅ △DEF (đọc là "tam giác ABC bằng tam giác DEF")

Khi hai tam giác bằng nhau:
- Các cạnh tương ứng bằng nhau
- Các góc tương ứng bằng nhau
- Các đường cao, trung tuyến, đường phân giác tương ứng bằng nhau`,
    examples: [
      'Cho △ABC = △DEF. Nếu AB = 5cm, thì DE = ?',
      'Chứng minh △ABM = △CAM (với M trên AC)',
      '△ABC cân tại A. Chứng minh △ABD = △ACD (với D trên BC)',
      'Cho hình bình hành ABCD. Chứng minh △ABC = △CDA'
    ],
    practicePoints: [
      'Xác định các cạnh và góc tương ứng',
      'Lựa chọn trường hợp bằng nhau phù hợp',
      'Viết câu suy ra đúng thứ tự đỉnh',
      'Chứng minh các hệ quả từ sự bằng nhau'
    ],
    category: 'geometry',
    difficulty: 6
  },

  {
    id: 'math-8-6',
    subject: 'math',
    topic: 'geometry-properties',
    title: 'Quadrilaterals & Properties (Tứ Giác & Tính Chất)',
    theory: `Tứ giác là hình có 4 cạnh, 4 góc.

Tổng các góc trong tứ giác = 360°

Các loại tứ giác:
1. Hình thang: Có 1 cặp cạnh song song
   - Hình thang cân: 2 cạnh bên bằng nhau
   - Tính chất: 2 góc ở mỗi đáy bằng nhau

2. Hình bình hành: 2 cặp cạnh song song
   - Tính chất: Các cạnh đối bằng nhau, các góc đối bằng nhau
   - Đường chéo cắt nhau tại trung điểm

3. Hình chữ nhật: Hình bình hành có 1 góc vuông
   - Tính chất: 4 góc đều vuông, 2 đường chéo bằng nhau

4. Hình thoi: Hình bình hành có 2 cạnh kề bằng nhau
   - Tính chất: 4 cạnh bằng nhau, 2 đường chéo vuông góc

5. Hình vuông: Hình chữ nhật + Hình thoi
   - Tính chất: 4 cạnh bằng nhau, 4 góc vuông, 2 đường chéo bằng nhau và vuông góc`,
    examples: [
      'Hình bình hành ABCD có AB = 6cm, BC = 4cm. Tìm CD, AD.',
      'Chứng minh ABCD là hình chữ nhật.',
      'Hình thoi ABCD có cạnh 5cm. Tính chu vi.',
      'Hình vuông ABCD có diện tích 16cm². Tính cạnh.'
    ],
    practicePoints: [
      'Nhận biết loại tứ giác từ tính chất',
      'Chứng minh tứ giác là hình gì',
      'Áp dụng tính chất để tìm cạnh, góc, diện tích',
      'Liên hệ giữa các loại tứ giác'
    ],
    category: 'geometry',
    difficulty: 6
  },

  {
    id: 'math-8-7',
    subject: 'math',
    topic: 'statistics-probability',
    title: 'Statistics & Probability (Thống Kê & Xác Suất)',
    theory: `Thống kê:
- Tần số: Số lần xuất hiện
- Tần suất = Tần số / Tổng số
- Trung bình cộng = (Tổng) / (Số lượng)
- Trung vị: Giá trị ở giữa khi sắp xếp dữ liệu
- Mốt: Giá trị xuất hiện nhiều nhất

Xác suất:
- Xác suất = (Số kết quả thuận lợi) / (Tổng số kết quả có thể)
- 0 ≤ P ≤ 1
- P = 0: Biến cố không thể xảy ra
- P = 1: Biến cố chắc chắn xảy ra

Ví dụ:
- Rút 1 lá bài từ bộ 52 lá
  P(Rút được Át) = 4/52 = 1/13

- Tung 1 xúc xắc
  P(Mặt 6) = 1/6
  P(Số chẵn) = 3/6 = 1/2`,
    examples: [
      'Điểm kiểm tra: 7, 8, 9, 8, 7, 6, 9, 8. Tìm mode, median, mean.',
      'Tính xác suất rút được thẻ đỏ từ 1 bộ 52 lá bài.',
      'Tung 2 đồng xu. Tính xác suất có ít nhất 1 mặt sấp.',
      'Dữ liệu: 10, 20, 30, 40, 50. Tính trung bình cộng.'
    ],
    practicePoints: [
      'Tính tần số, tần suất từ bảng dữ liệu',
      'Tính giá trị trung bình, trung vị, mốt',
      'Phân biệt giữa biến cố độc lập và phụ thuộc',
      'Tính xác suất của các biến cố phức tạp'
    ],
    category: 'statistics',
    difficulty: 5
  },

  // ==================== NGỮ VĂN ====================
  {
    id: 'lit-8-1',
    subject: 'literature',
    topic: 'narrative-poetry',
    title: 'Narrative Poetry (Thơ Tự Sự)',
    theory: `Thơ tự sự là loại thơ kể chuyện, có nhân vật, cốt truyện, tình tiết như truyện ngắn/dài.

Đặc điểm:
1. Có câu chuyện với: Nhân vật, tình tiết, cao trào, kết thúc
2. Có tác dụng thẩm mỹ: Từngữ, hình ảnh, âm sắc
3. Thường kết hợp: Miêu tả + Biểu cảm

Ví dụ:
- "Truyện Kiều" của Nguyễn Du
- "Lưu Bình - Dương Lễ" (thơ tự sự cổ)
- "Vợ chồng A Phủ" (Tố Hữu) - thơ tự sự hiện đại

Kỹ năng phân tích:
1. Tóm tắt nội dung câu chuyện
2. Phân tích nhân vật (ngoại hình, tính cách, hoàn cảnh)
3. Xác định cao trào, kết thúc
4. Phân tích ý nghĩa, bài học
5. Nhận xét về cách kể chuyện (tác dụng của giọng điệu, giai điệu)`,
    examples: [
      'Tóm tắt nội dung phần đầu của "Truyện Kiều".',
      'Phân tích nhân vật Thúy Kiều: tính cách, hoàn cảnh, số phận.',
      'Nêu ý nghĩa của câu thơ: "Trót duyên kỵ ước hồi thơm"',
      'So sánh 2 version của "Lưu Bình - Dương Lễ"'
    ],
    practicePoints: [
      'Kỹ năng tóm tắt nội dung',
      'Phân tích nhân vật chi tiết',
      'Hiểu bề sâu ý nghĩa bài thơ',
      'Phân tích những hình ảnh, biểu tượng trong thơ'
    ],
    category: 'reading',
    difficulty: 7
  },

  {
    id: 'lit-8-2',
    subject: 'literature',
    topic: 'lyric-poetry',
    title: 'Lyric Poetry (Thơ Ch抒 Tình)',
    theory: `Thơ ch抒情là loại thơ bày tỏ cảm xúc, tâm tư, suy tư của nhà thơ.

Đặc điểm:
1. Tập trung vào cảm xúc, trạng thái tâm hồn
2. Không nhất thiết có câu chuyện, nhân vật, sự kiện
3. Dùng nhiều hình ảnh, so sánh, ẩn dụ
4. Có giai điệu, âm sắc mạnh mẽ

Các loại:
- Thơ tình: Về tình yêu, luyến tiếc
- Thơ xã hội: Về hoàn cảnh xã hội, cuộc sống
- Thơ triết lý: Về suy tư, nhân sinh quan
- Thơ nôn nả: Về những cảm xúc tức tốc

Ví dụ:
- "Vội vàng" (Xuân Diệu)
- "Chiều tối" (Hồ Xuân Hương)
- "Người mẹ" (Phạm Văn Đồng)
- "Tuyên ngôn" (Phạm Tiến Duật)

Kỹ năng phân tích:
1. Xác định loại cảm xúc chính
2. Tìm hình ảnh đại diện (hình ảnh trung tâm)
3. Phân tích từngữ, so sánh, ẩn dụ
4. Nắm bắt giai điệu bài thơ`,
    examples: [
      'Phân tích hình ảnh "đêm" trong bài thơ của Hồ Xuân Hương.',
      'Nêu cảm xúc chính của nhà thơ trong bài "Vội vàng".',
      'Chỉ ra những so sánh, ẩn dụ và tác dụng của chúng.',
      'Nhận xét về giai điệu, âm sắc của bài thơ.'
    ],
    practicePoints: [
      'Nhận biết cảm xúc từ từngữ, hình ảnh',
      'Phân tích kỹ thuật thơ: so sánh, ẩn dụ, hoán dụ',
      'Liên hệ bối cảnh xã hội để hiểu bài thơ',
      'Phát triển ý kiến cá nhân về bài thơ'
    ],
    category: 'reading',
    difficulty: 7
  },

  {
    id: 'lit-8-3',
    subject: 'literature',
    topic: 'short-story',
    title: 'Short Story (Truyện Ngắn)',
    theory: `Truyện ngắn là tác phẩm văn xuôi có: Nhân vật, cốt truyện, bối cảnh.

Đặc điểm:
1. Độ dài ngắn (thường từ 2-20 trang)
2. Có câu chuyện hoàn chỉnh: Nở rộ, phát triển, cao trào, kết thúc
3. Thường có 1-2 nhân vật chính
4. Lắng đọng, có bài học sâu sắc

Cấu trúc:
- Mở bài: Giới thiệu nhân vật, bối cảnh, tình huống ban đầu
- Phát triển: Tình tiết phát triển, xung đột tăng
- Cao trào: Khoảnh khắc quyết định
- Kết thúc: Giải quyết mâu thuẫn, bài học

Ví dụ tác phẩm:
- "Những người lái đò sông Đà" (Nguyễn Tuân)
- "Số phận" (Ngô Tất Tố)
- "Gà trống" (Thạch Lam)
- "Chuyện cũ" (Khánh Hòa)

Kỹ năng phân tích:
1. Tóm tắt tình tiết, xác định các giai đoạn
2. Phân tích nhân vật (hoàn cảnh, tính cách, biến chuyển)
3. Nắm bắt chủ đề, ý tưởng chính
4. Phân tích tác dụng của các yếu tố (cách tả, tây từ)`,
    examples: [
      'Tóm tắt nội dung "Những người lái đò sông Đà".',
      'Phân tích nhân vật ông "người lái đò" trong tác phẩm trên.',
      'Nêu ý tưởng chính của truyện "Số phận".',
      'Phân tích tác dụng của bối cảnh (sông, nước, thôn quê) trong truyện.'
    ],
    practicePoints: [
      'Kỹ năng tóm tắt tình tiết ngắn gọn',
      'Phân tích nhân vật chi tiết: ngoại hình, tính cách, hoàn cảnh, hành động',
      'Nắm bắt ý tưởng qua chi tiết, hành động nhân vật',
      'Liên hệ tác phẩm với cuộc sống, xã hội'
    ],
    category: 'reading',
    difficulty: 7
  },

  {
    id: 'lit-8-4',
    subject: 'literature',
    topic: 'essay-writing',
    title: 'Essay Writing (Viết Văn Chủ Đề)',
    theory: `Essay là bài viết về một chủ đề nhất định, thể hiện quan điểm, suy nghĩ của tác giả.

Cấu trúc:
1. Mở bài:
   - Nêu chủ đề hoặc vấn đề
   - Gợi sự chú ý của độc giả
   - Nêu luận điểm chính (thesis statement)

2. Thân bài:
   - Mỗi đoạn trình bày 1 luận điểm phụ
   - Cung cấp dẫn chứng (ví dụ, trích dẫn, sự kiện)
   - Phân tích, bình luận về dẫn chứng

3. Kết bài:
   - Tóm tắt luận điểm chính
   - Nêu ý nghĩa hoặc gợi ý
   - Có thể nêu dự báo hoặc lời kêu gọi

Các loại:
- Persuasive: Thuyết phục độc giả
- Expository: Giải thích, phân tích
- Narrative: Kể lại sự kiện

Dài: 500-1000 từ (cho lớp 8)`,
    examples: [
      'Viết essay về "Tầm quan trọng của giáo dục"',
      'Viết essay: "Ảnh hưởng của công nghệ đến cuộc sống"',
      'Viết essay persuasive: "Tại sao phải chăm chỉ học tập"',
      'Viết essay narrative về "Kỷ niệm đáng nhớ"'
    ],
    practicePoints: [
      'Lập dàn ý rõ ràng trước khi viết',
      'Mở bài hấp dẫn, có luận điểm chính',
      'Mỗi đoạn có topic sentence và dẫn chứng',
      'Dùng transition words kết nối ý tưởng',
      'Kết bài thuyết phục'
    ],
    category: 'writing',
    difficulty: 7
  },

  // ==================== KHOA HỌC TỰ NHIÊN ====================
  {
    id: 'sci-8-1',
    subject: 'science',
    topic: 'atoms-molecules',
    title: 'Atoms & Molecules (Nguyên Tử & Phân Tử)',
    theory: `Nguyên tử là hạt nhỏ nhất của một chất còn giữ được tính chất của chất đó.

Cấu trúc nguyên tử:
1. Hạt nhân: Chứa proton (+) và neutron (trung hòa)
2. Electron (-) quay quanh hạt nhân

Ký hiệu nguyên tố:
- Số nguyên tử (Z) = số proton = số electron
- Số khối (A) = số proton + số neutron
- Số neutron = A - Z

Ví dụ: ¹⁶O (Oxy)
- Z = 8 (có 8 proton, 8 electron)
- A = 16
- Số neutron = 16 - 8 = 8

Phân tử:
- Là nhóm 2 hay nhiều nguyên tử liên kết với nhau
- Ví dụ: H₂O, CO₂, O₂

Hoá trị:
- Là khả năng kết hợp của nguyên tố
- Ví dụ: H có hoá trị I, O có hoá trị II, N có hoá trị III`,
    examples: [
      'Vẽ mô hình nguyên tử Cacbon (C, Z = 6, A = 12)',
      'Tìm số proton, neutron, electron của Na (Z = 11, A = 23)',
      'Xác định hoá trị của N, P, S, Cl',
      'Viết công thức hoá học: Natri oxit, Lưu huỳnh dioxit'
    ],
    practicePoints: [
      'Biết cấu trúc nguyên tử cơ bản',
      'Tính số proton, neutron, electron',
      'Hiểu khái niệm hoá trị và ứng dụng',
      'Viết công thức hoá học đơn giản'
    ],
    category: 'chemistry',
    difficulty: 5
  },

  {
    id: 'sci-8-2',
    subject: 'science',
    topic: 'chemical-reactions',
    title: 'Chemical Reactions (Phản Ứng Hóa Học)',
    theory: `Phản ứng hoá học là sự biến đổi các chất này thành các chất khác.

Dấu hiệu nhận biết:
1. Tạo thành chất khí
2. Tạo thành k沉淀 (chất rắn)
3. Tạo thành nước
4. Thoát nhiệt hoặc hấp thụ nhiệt
5. Thay đổi màu sắc

Phương trình hóa học:
- Biểu diễn: Chất phản ứng → Chất sản phẩm
- Phải cân bằng về nguyên tử

Ví dụ:
1. Cháy:
   C + O₂ → CO₂
   2H₂ + O₂ → 2H₂O

2. Phản ứng với acid:
   Zn + 2HCl → ZnCl₂ + H₂↑

3. Phản ứng đơn thế:
   Zn + CuSO₄ → ZnSO₄ + Cu`,
    examples: [
      'Cân bằng: Fe + O₂ → Fe₃O₄',
      'Viết phương trình: Magie cháy trong không khí',
      'Viết phương trình: Kim loại Zn với HCl',
      'Chỉ ra dấu hiệu của phản ứng: Ca(OH)₂ + CO₂ → ?'
    ],
    practicePoints: [
      'Nhận biết dấu hiệu phản ứng hoá học',
      'Cân bằng phương trình hoá học',
      'Phân loại phản ứng (cháy, tổng hợp, phân hủy)',
      'Viết phương trình từ mô tả bằng lời'
    ],
    category: 'chemistry',
    difficulty: 6
  },

  {
    id: 'sci-8-3',
    subject: 'science',
    topic: 'electricity',
    title: 'Electricity (Điện Học)',
    theory: `Dòng điện: Sự chuyển động có thứ tự của các electron.

Các đại lượng:
1. Cường độ dòng điện (I): Đơn vị Ampe (A)
   - I = Q / t (Miliampe = A / 1000)

2. Hiệu điện thế (U): Đơn vị Volt (V)
   - Được đo bằng Vôn kế

3. Điện trở (R): Đơn vị Ôm (Ω)
   - Công thức Ohm: U = I × R
   - R = ρ × l / S (ρ = điện trở suất, l = chiều dài, S = tiết diện)

Mạch điện:
1. Mắc nối tiếp:
   - Cường độ: I = I₁ = I₂ = ...
   - Điện trở: R = R₁ + R₂ + ...
   - Hiệu điện thế: U = U₁ + U₂ + ...

2. Mắc song song:
   - Cường độ: I = I₁ + I₂ + ...
   - Điện trở: 1/R = 1/R₁ + 1/R₂ + ...
   - Hiệu điện thế: U = U₁ = U₂ = ...`,
    examples: [
      'Cho U = 12V, R = 6Ω. Tính I.',
      'Hai bóng đèn R₁ = 10Ω, R₂ = 15Ω mắc nối tiếp. Tính điện trở tương đương.',
      'Hai điện trở mắc song song. R₁ = 6Ω, R₂ = 12Ω. Tính R?',
      'Từ U = IR, tính R biết U = 24V, I = 2A.'
    ],
    practicePoints: [
      'Áp dụng định luật Ôm: U = I × R',
      'Tính cường độ dòng điện, hiệu điện thế, điện trở',
      'Tính điện trở tương đương của mạch nối tiếp, song song',
      'Vẽ sơ đồ mạch điện từ mô tả'
    ],
    category: 'physics',
    difficulty: 6
  },

  {
    id: 'sci-8-4',
    subject: 'science',
    topic: 'waves-light',
    title: 'Waves & Light (Sóng & Ánh Sáng)',
    theory: `Sóng: Sự truyền năng lượng qua không gian mà không truyền vật chất.

Các loại sóng:
1. Sóng cơ: Cần môi trường (sóng âm, sóng nước)
2. Sóng điện từ: Không cần môi trường (ánh sáng, sóng radio)

Đại lượng của sóng:
- Bước sóng λ (lamda): Khoảng cách giữa 2 điểm dao động cùng pha
- Tần số f: Số dao động trong 1 giây (Hz)
- Chu kỳ T = 1/f
- Vận tốc sóng: v = λ × f

Ánh sáng:
1. Tính chất sóng: Giao thoa, nhiễu xạ
2. Tính chất hạt: Quang điện hiệu ứng, tán xạ Compton

Hiện tượng ánh sáng:
1. Phản xạ: Góc tới = góc phản xạ
2. Khúc xạ: Thay đổi hướng khi đi qua 2 môi trường
3. Tán xạ: Phản xạ không quy tắc
4. Hấp thụ: Ánh sáng bị hứng thụ bởi vật

Thấu kính:
- Thấu kính hội tụ: Tập trung tia sáng
- Thấu kính phân kỳ: Tán khúc tia sáng
- Công thức: 1/f = 1/u + 1/v`,
    examples: [
      'Tìm bước sóng ánh sáng: f = 5×10¹⁴ Hz, c = 3×10⁸ m/s',
      'Vẽ hình vẽ: Phản xạ ánh sáng trên gương phẳng',
      'Vẽ hình vẽ: Khúc xạ ánh sáng qua lăng kính',
      'Tìm tiêu cự thấu kính: u = 15cm, v = 30cm'
    ],
    practicePoints: [
      'Hiểu khái niệm sóng, bước sóng, tần số',
      'Áp dụng công thức v = λ × f',
      'Vẽ hình minh họa phản xạ, khúc xạ',
      'Tính toán với lăng kính và thấu kính'
    ],
    category: 'physics',
    difficulty: 6
  },

  // ==================== LỊCH SỬ & ĐỊA LÍ ====================
  {
    id: 'hist-8-1',
    subject: 'history_geography',
    topic: 'world-war-2',
    title: 'World War II (Thế Chiến II)',
    theory: `Thế Chiến II (1939-1945) là cuộc chiến tranh lớn nhất lịch sử.

Nguyên nhân:
1. Điều ước Versailles quá khắt khe với Đức
2. Phát xít nổi lên: Hitler, Mussolini, Tojo
3. Chính sách bành trướng, quân quốc chủ nghĩa
4. Tổ chức Liên Quốc yếu kém, không thể ngăn chặn

Các giai đoạn:
1. 1939-1941: Phát xít tấn công
   - Đức tấn công Ba Lan (1939)
   - Blitzkrieg (Chiến tranh Chớp nhoáng)
   - Đức chiến thắng Pháp

2. 1941-1943: Sự mở rộng
   - Đức tấn công CCCP
   - Nhật tấn công Mỹ (Pearl Harbor 1941)
   - Mỹ, Anh gia nhập

3. 1943-1945: Đồng Minh phản công
   - D-Day: Liên Xô đánh bại Đức (Stalingrad)
   - Mỹ đánh bại Nhật
   - Đức hàng không điều kiện (8/5/1945)
   - Nhật hàng (2/9/1945)

Hậu quả:
- 50 triệu người chết
- Toàn bộ thế giới bị tàn phá
- Liên Xô thành siêu cường
- Hội Liên Hợp Quốc thành lập

Ảnh hưởng đến Việt Nam:
- Nhật chiếm Indochina
- Đông Dương khẩn hoạn
- Tháng 8 Cách mạng (1945)`,
    examples: [
      'Nêu nguyên nhân của Thế Chiến II.',
      'Kể sự kiện Mỹ gia nhập Thế Chiến II.',
      'So sánh Thế Chiến I và II.',
      'Phân tích ảnh hưởng của Thế Chiến II tới Việt Nam.'
    ],
    practicePoints: [
      'Nắm vững các sự kiện chính, ngày tháng',
      'Hiểu nguyên nhân và hậu quả',
      'Phân tích vai trò các nước chính',
      'Liên hệ với lịch sử Việt Nam'
    ],
    category: 'history',
    difficulty: 6
  },

  {
    id: 'hist-8-2',
    subject: 'history_geography',
    topic: 'vietnam-history',
    title: 'Vietnamese History (Lịch Sử Việt Nam)',
    theory: `Lịch sử Việt Nam có 3 giai đoạn chính:

1. Tiền sử đến Thục Phán (trước 258 TCN):
   - Nước Văn Lang (Hùng Vương)
   - Nước Âu Lạc (Thục Phán)

2. Thời Bắc Thuộc (258 TCN - 938):
   - 1000 năm chịu ách Bắc (Trung Quốc)
   - Các cuộc khởi nghĩa: Hai Bà Trưng, Mẹ Chiêu
   - 938: Ngoại Giao Vương độc lập (Ngo Quyền)

3. Thời Độc Lập (938-1858):
   - Nhà Đinh, Tiền Lê (10-11 thế kỷ)
   - Nhà Lý (11-13 thế kỷ): Thị Kính, Trần Hưng Đạo
   - Nhà Trần (13-15 thế kỷ): Đánh bại Nguyên
   - Nhà Lê (15-18 thế kỷ): Mở rộng lãnh thổ

4. Thời Pháp Thuộc (1858-1954):
   - Nước Pháp chiếm Indochina
   - Các phong trào chống Pháp
   - Tháng 8 Cách mạng 1945: Độc lập
   - Chiến tranh Diệp Biên Phủ: Kết thúc Pháp (1954)

Chủ quyền & Lãnh thổ:
- Vn chiếm rộng từ Bắc đến Nam qua các thế kỷ
- Chịu áp lực từ Trung Quốc, Champa, Xiêm Thái`,
    examples: [
      'Tóm tắt các giai đoạn lịch sử Việt Nam.',
      'Nêu vai trò của Trần Hưng Đạo.',
      'Phân tích ảnh hưởng của Pháp thuộc đối với Việt Nam.',
      'Kể về Tháng 8 Cách mạng năm 1945.'
    ],
    practicePoints: [
      'Ghi nhớ các sự kiện, năm tháng quan trọng',
      'Hiểu các giai đoạn và đặc điểm của từng giai đoạn',
      'Phân tích tác động của các cuộc chiến chiến',
      'Liên hệ quá khứ với hiện tại'
    ],
    category: 'history',
    difficulty: 6
  },

  {
    id: 'geo-8-1',
    subject: 'history_geography',
    topic: 'geography-vietnam',
    title: 'Geography of Vietnam (Địa Lý Việt Nam)',
    theory: `Vị trí, địa hình, khí hậu, dân cư, kinh tế của Việt Nam.

I. Vị Trí & Diện Tích:
- Nằm trên Bán đảo Đông Dương
- Vĩ độ: 8°N - 23°N
- Kinh độ: 102°E - 109°E
- Diện tích: ~331,000 km²
- Dân số: ~98 triệu người (2023)

II. Địa Hình:
- Miền núi Tây Bắc
- Đồng bằng Sông Hồng
- Hành lang hẹp ở Trung Bộ
- Cao Nguyên Trung Bộ
- Đông bằng Sông Mekong

III. Khí Hậu:
- Tropical monsoonal
- Mùa mưa: Tháng 5-9 (mùa hè)
- Mùa khô: Tháng 10-4 (mùa đông)
- Trung Bộ: Mùa khô tương đối, mưa tập trung (IX-XI)

IV. Dân Cư & Xã Hội:
- Chủ yếu ở Đông bằng, ven biển
- Tập trung ở Hà Nội, TP.HCM
- Mật độ: ~300 người/km²
- Người Kinh chiếm 86%, các dân tộc khác 14%

V. Kinh Tế:
- Nông nghiệp: Lúa, cà phê, hồ tiêu, tôm, cá
- Công nghiệp: Dệt may, điện tử, hóa dầu
- Du lịch: Hạ Long, Hội An, Huế

VI. Tài Nguyên & Môi Trường:
- Than, dầu khí, quặng
- Các khu bảo tồn: Cát Bà, Kiếp Bạc
- Thách thức: Ô nhiễm, suy thoái`,
    examples: [
      'Mô tả địa hình Việt Nam.',
      'Phân tích khí hậu các vùng của Việt Nam.',
      'Giải thích vì sao dân cư tập trung ở Đông bằng.',
      'Nêu các ngành kinh tế chính của Việt Nam.'
    ],
    practicePoints: [
      'Vẽ sơ đồ, bản đồ địa hình Việt Nam',
      'Liên hệ khí hậu và cách sống của người dân',
      'Phân tích sự phân bố kinh tế, dân cư',
      'Hiểu những thách thức môi trường hiện nay'
    ],
    category: 'geography',
    difficulty: 6
  }
];

export default GRADE8_LESSONS;
