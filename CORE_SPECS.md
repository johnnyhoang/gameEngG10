# Core Specification: GameEngG10 (Đấu Trường Tuyển Sinh 10)

Tài liệu đặc tả này định hình ý tưởng cốt lõi, kiến trúc chức năng, luồng vận hành kinh tế và tích hợp AI của ứng dụng **GameEngG10**. Mục tiêu là thiết lập một bộ khung định hướng nhất quán để tất cả các đợt phát triển tiếp theo bám sát, tránh việc bổ sung tính năng lan man làm loãng trải nghiệm học tập và sẵn sàng cho việc mở rộng quy mô.

---

## 1. Triết Lý Cốt Lõi & Tầm Nhìn Sản Phẩm

### 1.1 Sứ mệnh (Mission)
**GameEngG10** là nền tảng ôn thi tuyển sinh lớp 10 (mô phỏng theo cấu trúc đề tuyển sinh lớp 10 của Sở GD&ĐT TP.HCM) tích hợp cơ chế trò chơi hóa (gamification) sâu sắc. Nền tảng giải quyết bài toán:
*   **Học sinh:** Biến việc ôn luyện căng thẳng, khô khan thành các đợt chinh phục thử thách (chế độ chơi), tăng phản xạ tư duy và trực quan hóa kiến thức phức tạp (đồ thị, hình học).
*   **Phụ huynh:** Đóng vai trò là nhà tài trợ, kiểm soát và khích lệ bằng cách liên kết kết quả học tập trong thế giới ảo với các phần thưởng thực tế ngoài đời thực.

### 1.2 Mô hình Phân Quyền Vai Trò Độc Lập (Independent Role-Based Model)
Mỗi tài khoản người dùng tại một thời điểm chỉ đảm nhận duy nhất một vai trò hoạt động hoạt động (Học sinh hoặc Admin/Phụ huynh), hoàn toàn phân tách về mặt chức năng và giao diện:
*   **Học sinh (Student):** Chỉ tiếp cận các chức năng học tập, bản đồ game, hang luyện công, đấu trường, cửa hàng và thú cưng.
*   **Quản trị/Phụ huynh (Admin/Parent):** Chỉ tiếp cận Bảng Quản trị Viện Chủ để giám sát, phê duyệt phần thưởng, cấu hình hệ thống và quản lý câu hỏi.
*   **Duy trì dữ liệu & Ẩn danh tính khi chuyển đổi vai trò:** Hệ thống hỗ trợ cập nhật vai trò tài khoản. Khi một tài khoản học sinh được chuyển sang Admin, toàn bộ giao diện và chức năng sẽ đổi sang quản trị, **tài khoản này sẽ tự động ẩn khỏi danh sách học sinh của Viện Chủ và bảng xếp hạng (Leaderboard)** để tránh gian lận. Toàn bộ dữ liệu tiến trình học tập cũ (level, XP, coins, streak, thú cưng...) vẫn được lưu giữ nguyên vẹn để hoạt động lại khi chuyển vai trò về Học sinh.

---

### 1.3 Nguyên lý Môn Phái Độc Lập (Sect Isolation Principle)
Các môn học được tổ chức thành các **Môn Phái Độc Lập** hoàn toàn và được phân chia làm hai nhóm chính với bản đồ chức năng cụ thể:
*   **Nhóm Môn Phái Ôn Thi Lớp 10 Chuyên Sâu (Toán, Văn, Anh):** 
    Tập trung ôn tập quyết liệt bám sát cấu trúc đề tuyển sinh lớp 10 TP.HCM.
    *   *Đấu trường:* Gồm các chế độ Mixed/Skill Practicing, Sinh tồn (Survival), Quyết đấu Boss (Đề thi tuyển sinh các năm), và Revenge.
    *   *Hang luyện công:* Gồm các Chuyên đề Môn học (Tuyển sinh 10), Công cụ học tập phụ trợ (Học lý thuyết, Sổ tay, Nguồn), và Mật thất Biki (Toán).
    *   *Khu thư giãn:* Có đầy đủ các mini-game tương tác (Match Pairs, Mindmap, Story, Step Builder, Explain to AI, Drag Diagram...).
*   **Nhóm Môn Phái Kiến Thức Lớp 9 Cơ Bản:** 
    Gồm các môn học: Khoa học tự nhiên, Lịch sử và Địa lý, Giáo dục công dân, Công nghệ, Tin học, Nghệ thuật (Âm nhạc, Mỹ thuật).
    *   *Đấu trường:* Gồm các chế độ Mixed/Skill Practicing, Quyết đấu Boss (Đề thi HK1, thi HK2), và Revenge (Không có Sinh tồn).
    *   *Hang luyện công:* Gồm các Chuyên đề Môn học (Lớp 9), Công cụ học tập phụ trợ (Học lý thuyết, Sổ tay, Nguồn), và Mật thất Biki tương tác.
    *   *Khu thư giãn:* Có đầy đủ các mini-game tương tác giống như nhóm Chuyên Sâu.
*   **Cô lập ngữ cảnh tuyệt đối (Absolute Context Isolation):** Ở cùng một thời điểm, học sinh chỉ thuộc về duy nhất một Môn phái đang hoạt động (Active Sect). Toàn bộ nội dung hiển thị trong ứng dụng (bao gồm: bản đồ game, bài tập đấu trường, bài học trong hang luyện công, vật phẩm trong shop, thú cưng/ngoại trang, cho đến nhật ký hoạt động...) sẽ tự động lọc và chỉ hiển thị thông tin của Môn phái đó. Không có sự trộn lẫn nội dung giữa các môn phái trên cùng một trang màn hình (ngoại trừ duy nhất trang báo cáo/thống kê tổng quan dành cho phụ huynh).
*   **Cô lập phía Phụ huynh (Parent In-Context Banking):** Khi phụ huynh truy cập Bảng Phụ Huynh (`ParentConsole`) để xem và quản lý ngân hàng đề (`banking`), họ bắt buộc phải chọn một môn phái cụ thể làm ngữ cảnh hoạt động. Hệ thống chỉ hiển thị và cho phép thao tác (thêm, sửa, xóa, ingest) các câu hỏi thuộc môn phái đó, tránh việc trộn lẫn ngân hàng câu hỏi giữa các môn phái khác nhau trên cùng một giao diện.
*   **Chuyển đổi toàn cục (Global Switch):** Học sinh chỉ có thể thay đổi môn phái bằng một bộ chuyển đổi ở cấp độ toàn cục (Global Subject Selector trên thanh HUD). Khi học sinh thực hiện chuyển đổi môn phái, toàn bộ môi trường ứng dụng (chủ đề màu neon chủ đạo, bản đồ đảo, nhiệm vụ ngày, dòng sự kiện và dữ liệu câu hỏi trong PlayArea) sẽ chuyển đổi đồng loạt sang môn phái mới được chọn.

---

## 2. Kiến Trúc Mô-đun & Bản Đồ Học Tập (World Map)

Hệ thống được tổ chức thành 6 khu vực cốt lõi hiển thị trực quan trên Bản đồ (`GameMap`):

### 2.1 🏛️ Đấu Trường (Arena / Play Area)
Nơi kiểm tra năng lực và rèn luyện phản xạ thi cử dưới các chế độ chơi áp lực cao:
*   **Mixed/Skill Practicing:** Luyện ngẫu nhiên theo mảng kiến thức (Grammar, Vocab, Reading, Pronunciation).
*   **Sinh tồn (Survival):** Giới hạn mạng chơi (`hearts` - tối đa 3 tim). Trả lời sai mất 1 tim. Mất hết tim là kết thúc đợt luyện.
*   **Quyết đấu Boss (Boss Battle):** Đấu trường thi thử theo thời gian thực (20 phút). Đề thi được chọn lọc bám sát cấu trúc đề chính thức các năm (2024, 2025, 2026).
*   **Truy tìm lỗi sai (Revenge):** Chế độ ôn tập riêng các câu trả lời sai trong lịch sử để khắc phục lỗ hổng kiến thức.
*   **Quy tắc Khấu trừ Chân Khí (Energy Upfront Deduction):** Chân khí được khấu trừ một lần duy nhất ngay khi thiếu hiệp xác nhận bắt đầu trận đấu. Khi đã vào trận (đặc biệt là bài thi Boss 20 phút), thiếu hiệp được tu học liên tục cho đến hết mà không bị dừng đột ngột kể cả khi chân khí cạn kiệt giữa chừng.

### 2.2 🕳️ Hang Luyện Công (Training Cave / HangLuyenCong)
Không gian tự học, hệ thống hóa lý thuyết sâu sắc theo từng môn:
*   **Các Chuyên đề Môn học:** Ôn tập lý thuyết và luyện nhanh theo đặc trưng từng môn (Toán, Văn, Anh ôn theo chuyên đề tuyển sinh; các môn Cơ bản ôn theo kiến thức cốt lõi lớp 9).
*   **3 Công cụ học tập phụ trợ:**
    *   *Học lý thuyết (Drill):* Tiếp cận bài giảng lý thuyết trước khi chuyển sang luyện tập.
    *   *Sổ tay (Notes):* Ghi chú cá nhân về lỗi sai và lưu ý cần nhớ.
    *   *Nguồn tài liệu (Sources):* Danh mục văn bản, hướng dẫn từ Bộ và Sở GD&ĐT.

#### 🔮 Mật thất Biki (Biki Interactive Studios)
Các mô-đun tương tác chuyên sâu phá vỡ giới hạn giao diện chung để trực quan hóa Toán học (chỉ áp dụng đối với Môn phái Toán):
*   **Mật thất 3D (Biki3DStudio):** Công cụ mô phỏng hình học không gian (Hình trụ, Hình nón, Hình cầu, Hình chóp, Hình hộp). Cho phép xoay 360°, đổi góc nhìn, tô màu mặt phẳng, vẽ đường cao nét đứt/nét liền dưới sự hướng dẫn của AI.
*   **Mật thất Hình học phẳng (BikiHinhHocPhang):** Bảng dựng hình 2D (điểm, tam giác, tứ giác, đường tròn). Học sinh có thể kéo thả điểm tự do, kẻ thêm đường phụ (đường cao, trung tuyến, tiếp tuyến) để tìm lời giải chứng minh hình học.
*   **Mật thất Đồ thị hàm số (BikiDoThiHamSo):** Vẽ đồ thị parabol ($y = ax^2 + bx + c$) và đường thẳng ($y = mx + n$). Cho phép kéo thanh trượt (slider) hệ số để quan sát sự thay đổi tiêu cự, đỉnh, giao điểm trực quan theo thời gian thực.

### 2.3 🦄 Khu Thư Giãn (Relaxation Zone)
Các mô-đun tương tác học tập nhẹ nhàng, kết hợp trực quan hóa và giải trí cốt truyện (Danh sách đầy đủ theo định hướng):
*   *Thẻ nhớ tốc hành (SRS Flashcards):* Ôn tập nhanh khái niệm, công thức theo phương pháp lặp lại ngắt quãng (di chuyển từ Hang Luyện Công).
*   *Ghép cặp (Match Pairs):* Ghép các thẻ liên quan (từ–nghĩa, công thức–tên gọi, tác giả–tác phẩm) tính giờ hoặc so điểm.
*   *Sơ đồ tư duy (Mindmap Builder):* Tự kéo nối các khái niệm, chương học để hệ thống hóa kiến thức tổng quan.
*   *Học qua cốt truyện (Story / Scenario Mode):* Bài học dạng visual novel hoặc tình huống thực tế, đưa ra lựa chọn giải quyết đề bài để vượt qua thử thách cốt truyện.
*   *Hành trình phiêu lưu (Adventure Journey):* Bản đồ thế giới mở chia theo chặng/quốc đảo, mở khóa khu vực mới sau khi hoàn thành nhiệm vụ thay thế cho danh mục bài học tĩnh.
*   *Sắp xếp các bước (Step Builder):* Sắp xếp các bước giải toán, các ý trong bài văn hoặc cấu trúc câu tiếng Anh theo đúng trình tự.
*   *Thử thách đọc hiểu (Reading Challenge):* Đọc văn bản ngắn, tìm ý chính, tô sáng từ khóa và định vị luận điểm quan trọng.
*   *Giải thích cho AI (Explain to AI):* Học sinh tự nói hoặc gõ giải thích khái niệm bằng ngôn ngữ của mình, AI chấm nhận xét và bổ sung (Feynman method).
*   *Dạy học cho AI (Teach the AI):* Người học đóng vai giáo viên hướng dẫn AI giải bài; AI giả lập học sinh đặt câu hỏi phản biện để kiểm tra độ hiểu sâu.
*   *Kéo thả sơ đồ (Drag & Drop Diagram):* Kéo thả nhãn công thức, thành phần vào đúng vị trí của hình vẽ, sơ đồ khoa học/địa lý.
*   **Cơ chế Fallback Học liệu (Learning Asset Fallback):** Đối với các môn cơ bản chưa được Viện Chủ nạp đủ dữ liệu cấu trúc phức tạp (như Sắp xếp bước giải, Ghép sơ đồ), hệ thống sẽ tự động chuyển đổi các câu hỏi trắc nghiệm/từ vựng thông thường của môn học đó thành dữ liệu ghép cặp hoặc thẻ nhớ tương đương để thiếu hiệp vẫn có thể tu học nhẹ nhàng, hoặc tạm ẩn tab mini-game đó nếu không thể tự động chuyển đổi nhằm tránh lỗi hiển thị trống.

### 2.4 🛒 Cửa Hàng (Item Shop)
Vận hành nền kinh tế vi mô trong game:
*   Tiêu thụ **NP (Ngoại tệ / Coins)** kiếm được để mua:
    *   *Gợi ý (Hint):* Hỗ trợ loại bỏ đáp án nhiễu hoặc hướng dẫn giải nhanh.
    *   *Tim hồi phục (Hearts):* Phục vụ chế độ Sinh tồn/Quyết đấu Boss.
    *   *Khiên bảo vệ chuỗi (Streak Shield):* Giữ chuỗi học tập khi lỡ quên đăng nhập một ngày.
    *   *Mở khóa Phong Vị (Cá Tính):* Phong Vị Đào Hoa, Trúc Lâm, Tinh Không, Tuyết Sơn... giúp cá nhân hóa không gian học.
    *   *Phần thưởng Phụ huynh (Parent Rewards):* Đổi Coin lấy các voucher đặc quyền ngoài đời.

### 2.5 🐷 Sân Nuôi Thú (Pet Sanctuary - Heo Maikawaii)
Đại diện trực quan cho tiến trình học tập của học sinh:
*   Thú cưng dã thú (**Heo Maikawaii**) phát triển qua 4 giai đoạn tiến hóa đặc trưng (Evolution):
    *   **Đám Mây & Nấm Sơ Sinh (Egg):** Sinh ra từ một đám mây bông, mưa rơi xuống mặt đất nhiều lá khô mọc thành mầm nấm múp míp xinh đẹp.
    *   **Heo Con Mũm Mĩm (Baby):** Cây nấm nứt vỡ ra chú heo con mũm mĩm, hồng hào, cực kỳ đáng yêu.
    *   **Heo Hiệp Sĩ Trưởng Thành (Dragon):** Heo con khôn lớn, mang phong thái võ hiệp với khăn trán hoặc nón lá và đeo kiếm gỗ sau lưng.
    *   **Thần Heo Maikawaii (Legend):** Thần thú tối thượng mũm mĩm siêu cấp, đeo vòng kim cô vàng lấp lánh và cưỡi mây Cân Đẩu Vân.
*   **Cơ chế tương tác thông minh:**
    *   *Thọt lét (Tickle):* Khi click thọt lét chú heo, heo sẽ nhảy dựng lên vui sướng và nói các câu thoại ngộ nghĩnh, linh tinh khó hiểu.
    *   *Nhắc nhở bài vở (Study Reminder):* Nhắc thiếu hiệp môn học hôm nay nên ôn luyện dựa trên năng lượng/tiến trình.
    *   *Khen thưởng (Praise):* Nhận biết điểm số, số câu đúng và Ngân lượng nhận được trong ngày của học sinh để đưa ra những lời khen ngợi ngọt ngào.
*   Học sinh cho thú ăn để duy trì tâm trạng vui vẻ và tăng cấp cho thú. Việc cho thú ăn sẽ tiêu tốn cả Coins (NP) và một lượng XP cố định của thiếu hiệp, chấp nhận việc thiếu hiệp có thể bị tụt cấp độ (Level) tạm thời nếu dành quá nhiều tài nguyên chăm sóc thú cưng.

### 2.6 ⚙️ Bảng Quản Trị Viện Chủ (Admin Console)
Hệ thống quản lý, giám sát và cung cấp tài nguyên, được phân chia thành các khu vực chuyên biệt:
*   🏛️ **Chính Điện:** Trung tâm quyền lực và phân quyền. Quản lý tài khoản thiếu hiệp, thiết lập PIN bảo mật, thăng cấp/hạ cấp vai trò. Đây là nơi quản lý học sinh ở quy mô toàn viện (không chia theo môn phái).
*   📖 **Thiên Cơ Các:** Nơi lưu trữ thông tin, báo cáo, cơ mật của toàn viện. Dashboard tổng quan thống kê kết quả học tập của thiếu hiệp, số lượng câu hỏi, bài học và hiệu quả tu học chung của toàn bộ môn phái.
*   📚 **Vạn Quyển Các:** Kho tri thức và quản lý đề thi (CRUD, nạp đề thi bằng AI). Viện Chủ bắt buộc phải chọn ngữ cảnh môn phái cụ thể tại mỗi thời điểm quản lý.
*   👑 **Thân Phận:** Hồ sơ cá nhân của thiếu hiệp (profile), hiển thị danh hiệu kiếm hiệp (Tân Đệ Tử, Đệ Tử, Thiếu Hiệp...), cấp độ tu học, badges và lịch sử truyền công.
*   💰 **Ngân Các:** Quản lý kho tài nguyên, phê duyệt yêu cầu đổi quà tiêu vặt (VND Wallet), cấu hình chi phí chân khí khi làm bài, định mức NP/XP thưởng và danh mục quà tặng.

### 2.7 📖 Cẩm Nang Bí Lục (Giang Hồ Cẩm Nang)
Sổ tay quy tắc, kinh nghiệm tu hành của học viện được biên soạn dưới dạng sách cổ bí kíp:
*   **Cơ cấu nội dung:** Chia thành nhiều Chương (Võ Học & Tinh Tấn, Đấu Trường Kỳ Ngộ, Giang Hồ Quy Tắc, Dặn Dò của Viện Chủ) và các trang chi tiết về XP, Ngân lượng, Chân khí, Boss, nhiệm vụ ngày.
*   **Điểm chạm tương tác của Thiếu Hiệp:**
    *   *Login Trigger:* Mỗi khi đăng nhập vào hệ thống, một trang ngẫu nhiên của cẩm nang sẽ tự động hiển thị. Thiếu hiệp bắt buộc phải đọc và bấm nút "Đã Lĩnh Ngộ" để có thể đóng sách và tiếp tục tu học ở Đấu trường.
    *   *Logout Trigger:* Mỗi khi thiếu hiệp bấm Đăng xuất (thoát), một trang cẩm nang sẽ mở ra để dặn dò trước khi rời giang hồ. Bấm "Đã Lĩnh Ngộ" để hoàn tất đăng xuất.
    *   *Thân Phận (Profile Page):* Thiếu hiệp có thể mở toàn bộ cuốn cẩm nang để lật xem từng trang, từng chương bất kỳ lúc nào để tra cứu quy tắc.
*   **Giao diện Sách cổ (Antique Book UI):** Hiển thị trên nền giấy dó/kraft vàng nâu cổ kính, nét chữ mực đen kiểu thư pháp, tiêu đề đỏ son, tạo cảm giác như đang cầm trên tay một cuốn bí kíp võ công thật sự.
*   **Quyền quản trị của Viện Chủ:** Tại **Ngân Các** (hoặc bảng quản trị), Viện Chủ có thể tra cứu toàn bộ cuốn sách và có một biểu mẫu riêng để **nạp thêm các trang dặn dò** (Quy định riêng của gia đình, nhắc nhở ôn bài, lịch học thực tế) vào cuốn cẩm nang của thiếu hiệp. Dữ liệu các trang mới này được đồng bộ và lưu trữ tự động.

---

## 3. Cơ Chế Gamification & Luồng Kinh Tế Trực Quan

Ứng dụng vận hành trên các vòng lặp động lực chính:
*   **Học tập:** Giải bài tập / Vượt ải -> Nhận XP & Ngân Lượng -> Chăm sóc Pet & Mua vật phẩm.
*   **Luyện tập:** Tăng chuỗi luyện công liên tục -> Tránh hình phạt reset chuỗi.
*   **Đổi quà:** Gửi yêu cầu đổi quà -> Viện Chủ phê duyệt -> Nhận VND thực tế / Quà ngoài đời.

### 3.1 Quy Tắc Thưởng Phạt Võ Học (Gamification Rules)

Để tối ưu hóa trải nghiệm rèn luyện của Thiếu Hiệp, hệ thống áp dụng các quy tắc kinh tế & rèn luyện nghiêm ngặt sau:

#### A. Luật Thưởng Phạt Tại Hang Luyện Công (Learning Area)
*   **Võ học Tinh tấn (Thưởng):**
    *   *Câu hỏi thường:* Trả lời đúng mỗi câu được **+5 NP** và **+15 XP**.
    *   *Hoàn thành ải bài học:* Nhận ngay **+50 XP**.
    *   *Rương Báu Ải:* Đạt độ chính xác từ 90% trở lên khi hoàn thành ải nhận thêm **+20 NP**.
    *   *Quyết đấu Boss:* Đánh bại Boss nhận ngay **+150 XP** và được **nhân đôi XP** cho tất cả câu trả lời đúng trong trận (**+30 XP/câu**).
    *   *Hệ số Combo:* Đúng liên tiếp 3 câu được nhân hệ số thưởng Ngân lượng (Combo x1.2, x1.5, x2.0). Trả lời sai combo lập tức reset về 0.
*   **Võ học Gian khổ (Phạt & Khấu hao):**
    *   *Hao tổn Chân khí:* Mỗi lần bước vào ải thường tiêu hao **30 Chân khí**. Lượt quyết đấu Boss tiêu hao **100 Chân khí**.
    *   *Luật "Chân Khí Tán Thất":* Nếu rút lui hoặc thất bại giữa trận, lượng Chân khí đã nạp sẽ bị tiêu tán, **không được hoàn trả**.
    *   *Luật "Tẩu Hỏa Nhập Ma" (Thua trận):* Hết Tim (3 mạng) trước khi hoàn thành ải sẽ thất bại ngay lập tức, chỉ nhận được 50% lượng XP/NP đã thu được trong trận, đồng thời Pet giảm 5 điểm vui vẻ.
    *   *Luật "Phế Bỏ Võ Công" (Streak broken):* Nếu không học bài quá 24h, Chuỗi luyện công bị reset về 0 và bị phạt **-50 NP** vì sự lười biếng.

#### B. Luật Thưởng Phạt Tại Sơn Trang Thư Giãn (Relaxation Area)
*   Để tránh học sinh tập trung chơi minigame dễ mà bỏ bê học tập ở Hang Luyện Công, lượng phần thưởng được giới hạn:
    *   *Luyện thẻ nhớ (Flashcard):* Trả lời đúng mỗi thẻ được **+5 XP** và **+2 NP**.
    *   *Ghép cặp (Match Pairs):* Hoàn thành bảng ghép cặp được **+20 XP** và **+10 NP**.
    *   *Đàm đạo Linh Sư (AI Chat):* Đàm đạo thành công được **+30 XP** và **+15 NP**.
*   **Luật "Lực Bất Tòng Tâm" (Chăm Pet tổn hao XP):**
    *   Cho Pet ăn tiêu tốn **50 NP** và **30 XP** của Thiếu hiệp.
    *   Do tiêu hao trực tiếp điểm XP của bản thân, Thiếu hiệp chấp nhận bị **tụt cấp độ (Level) tạm thời** nếu dồn quá nhiều tài nguyên chăm sóc thú cưng. Để khôi phục cấp độ, thiếu hiệp bắt buộc phải quay lại Hang Luyện Công làm bài tập cày lại XP.

#### C. Hệ thống "Kỳ Ngộ Giang Hồ" (Random Events)
Mỗi lần đăng nhập hoặc hoàn thành bài luyện tập ở Hang Luyện Công, có xác suất 5% kích hoạt sự kiện ngẫu nhiên:
*   *Linh Dược Kỳ Ngộ (Tốt):* Gặp đạo sư ban tặng nhân sâm hồi phục **+100 Chân khí** hoặc **+50 NP** miễn phí.
*   *Khảo Hạch Kỳ Ngộ (Thách thức):* Linh Sư xuất hiện yêu cầu trả lời nhanh 1 câu hỏi ngẫu nhiên. Đúng nhận **+100 NP**, sai bị phạt **-30 Chân khí** hoặc **-1 Tim**.

### 3.1 Quy tắc ví tiền mặt thực tế (VND Wallet) & Đổi quà bằng Coins (NP)
*   **Đổi quà bằng Coins (NP):** Quà tặng Phụ huynh được định giá bằng Coins (NP). Khi thiếu hiệp yêu cầu đổi quà, hệ thống sẽ trừ lượng Coins tương ứng của thiếu hiệp và tự động quy đổi thành yêu cầu rút tiền VND chuyển đến cho Viện Chủ dựa trên tỷ giá quy đổi do phụ huynh tự thiết lập trong Ngân Các (ví dụ: 100 Coins = 10,000đ).
*   **Thưởng ví VND từ thi Boss:** Mỗi khi hoàn thành xuất sắc Đợt Quyết đấu Boss (thi thử đề chuẩn năm học), học sinh sẽ nhận được phần thưởng tiền mặt trực tiếp cộng thẳng vào Ví VND (ví dụ: 10,000đ - 20,000đ).
*   **Phê duyệt và giải ngân:** Viện Chủ phê duyệt yêu cầu đồng nghĩa với việc giao tiền mặt/quà thật cho con ngoài đời, hệ thống sẽ khấu trừ số dư tương ứng trên ứng dụng để đảm bảo tính minh bạch.

---

## 4. Mô Hình Tích Hợp Trí Tuệ Nhân Tạo (AI Engine - Gemini)

AI đóng vai trò là xương sống trong việc chấm điểm tự luận, dựng hình thông minh và nạp đề tự động.

### 4.1 Quy tắc Nạp đề thi bằng AI (AI Ingest Rules)
*   **Không tự bịa phương án nhiễu cho câu tự luận:** Đối với câu tự luận toán học, chỉ lưu trữ dưới dạng câu hỏi ngắn (`short-answer`/`proof`). Tuyệt đối không tự ý thêm các lựa chọn A, B, C, D giả lập để biến thành câu trắc nghiệm.
*   **Bỏ qua câu không thể số hóa trọn vẹn:** Các câu chứng minh thuần hình học phức tạp không thể dựng qua tọa độ bảng vẽ hoặc câu tự luận đại số cần trình bày sơ đồ dài sẽ bị loại bỏ khi import.
*   **Lọc trùng lặp nghiêm ngặt:** Nếu câu hỏi mới trùng lặp trên 95% ý tưởng hoặc từ ngữ với câu hỏi đã có trong Database, hệ thống sẽ tự động bỏ qua.

### 4.2 AI Chấm điểm Tự luận Văn & Toán (AI Grading)
Khi học sinh làm câu nghị luận xã hội/nghị luận văn học (hoặc lời giải hình học bậc cao):
1.  Hệ thống gửi câu trả lời của học sinh kèm đề bài, từ khóa tối thiểu cần có (keywords) và các bước ý chính (rubric) lên Gemini.
2.  Gemini đánh giá độ bao phủ ý nghĩa (không so khớp từ khóa thô cứng, ưu tiên sự tương đồng ngữ nghĩa).
3.  Trả về kết cấu chuẩn hóa:
    ```json
    {
      "score": "Điểm số từ 0 - 10 (số nguyên)",
      "matchedKeywords": ["các ý học sinh đã viết đạt"],
      "missingKeywords": ["các ý bị thiếu hoặc mờ nhạt"],
      "feedback": "Nhận xét ưu/nhược điểm ngắn gọn về lập luận, diễn đạt",
      "suggestions": ["hướng dẫn chi tiết để nâng cấp bài viết"]
    }
    ```
4.  Có cơ chế **Chấm điểm dự phòng (Fallback Evaluation)** bằng biểu thức chính quy (Regex) và đo khớp từ khóa thô nếu API AI gặp sự cố để đảm bảo bài làm không bao giờ bị nghẽn.

---

## 5. Quy Tắc Thiết Kế Trực Quan & Hệ Thống Giao Diện (Visual Spec)

Để duy trì tính thẩm mỹ vượt trội (Wow factor), ứng dụng tuân thủ:
*   **Aesthetic Theme:** Sử dụng phong cách **Synthwave / Cyberpunk Neon** làm chủ đạo, kết hợp với các bảng màu dịu mắt tùy biến theo thiết lập Phong Vị (Cá Tính) của học sinh.
*   **Bảng màu Neon Harmonic:**
    *   *English (Cyan):* `#00f0ff` đại diện cho công nghệ, kết nối ngôn ngữ.
    *   *Math (Magenta/Pink):* `#ff007f` đại diện cho sự chính xác, sắc nét tư duy toán học.
    *   *Literature (Orange/Amber):* `#f97316` đại diện cho cảm xúc ấm áp, văn học.
*   **Khuôn khổ dựng hình:** Tất cả tọa độ vẽ (2D/3D) phải nằm trong khung hiển thị an toàn `800x560` để tránh tràn trang trên các thiết bị máy tính bảng hoặc laptop nhỏ.

---

## 6. Khung Định Hướng Mở Rộng (Extensibility Roadmap)

Hệ thống được thiết kế dạng mô-đun rời (decoupled) để dễ dàng tích hợp các cải tiến sau này mà không cần đập đi xây lại:

1.  **Mở rộng Môn học mới (Lớp 10 / THPT):** Cấu trúc dữ liệu `subject` hỗ trợ enum mở rộng. Có thể dễ dàng thêm Lý, Hóa, Sinh bằng cách tạo thêm track môn và bảng ánh xạ chủ đề.
2.  **Chế độ Chơi mạng (Multiplayer Arena):** Cơ chế PvP thời gian thực, bảng xếp hạng liên trường hoặc liên nhóm lớp.
3.  **Tích hợp Thư viện vẽ nâng cao:** Chuyển đổi các mật thất Biki từ vẽ SVG sang Canvas 2D/WebGL để tối ưu hóa hiệu năng xoay mô hình 3D phức tạp.
4.  **Cổng kết nối Phụ huynh liên ứng dụng:** Tách riêng cổng Phụ huynh thành một ứng dụng nhỏ hoặc kênh chatbox (Telegram/Zalo) nhận thông báo thời gian thực mỗi khi con hoàn thành bài học hoặc gửi yêu cầu phê duyệt quà.

---

## 7. Hệ Thống Thuật Ngữ & Danh Hiệu Kiếm Hiệp (Wuxia System)

Để đồng bộ hóa trải nghiệm nhập vai võ hiệp nhất quán, toàn bộ thuật ngữ tiếng Việt trong giao diện và tài liệu học tập của ứng dụng phải tuân thủ quy tắc quy đổi sau:

### 7.1 Bảng quy đổi thuật ngữ vai trò (Roles Terminology)

| Vai trò nguyên bản | Thuật ngữ Kiếm hiệp | Ý nghĩa hiển thị trên hệ thống |
| :--- | :--- | :--- |
| **Super Admin / Parent** | **Viện Chủ** 👑 | Người quản lý cao nhất của học viện (phê duyệt phần thưởng, giám sát tổng quan). |
| **Teacher / Content Creator** | **Đạo Sư** 📖 | Thầy cô truyền dạy võ học và kiến thức của các môn phái. |
| **Grader / Examiner** | **Khảo Quan** 📝 | Người phụ trách chấm điểm bài luận và đánh giá học lực. |
| **AI Teacher (Gemini)** | **Linh Sư** 🤖 | Vị thầy thông tuệ ảo đồng hành hướng dẫn thiếu hiệp mọi lúc mọi nơi. |
| **Student / Player** | **Thiếu Hiệp** 🌱 | Cách gọi chung cho người học tham gia tu luyện. |

### 7.2 Hệ thống Cấp bậc tu học của Thiếu hiệp (Student Ranks & Level Mapping)

Cấp bậc của thiếu hiệp được ánh xạ trực tiếp từ cấp độ số (Level) hiện tại của người học, thay thế cho cách hiển thị số cấp độ khô khan. Công thức ánh xạ cụ thể:

| Cấp bậc học tập | Icon hiển thị | Phạm vi Level áp dụng | Ý nghĩa tu học |
| :--- | :---: | :---: | :--- |
| 🌱 **Tân Đệ Tử** | `🌱` | **Level 1 - 4** | Mới nhập môn võ học học viện, làm quen với các khái niệm căn bản. |
| 🥋 **Đệ Tử** | `🥋` | **Level 5 - 14** | Đã bắt đầu tu học kiến thức chuyên sâu của các môn phái. |
| ⚔️ **Thiếu Hiệp** | `⚔️` | **Level 15 - 29** | Có nền tảng vững vàng, đã tự mình vượt qua nhiều thử thách. |
| ⭐ **Cao Thủ** | `⭐` | **Level 30 - 49** | Đạt được những thành tích nổi bật và độ chính xác cao khi giải bài. |
| 🐉 **Đại Hiệp** | `🐉` | **Level 50 - 79** | Võ công thượng thừa, nằm trong danh sách các thiếu hiệp đứng đầu môn phái. |
| 👑 **Tông Sư** | `👑` | **Level 80+** | Đỉnh phong võ học, danh hiệu cao nhất chỉ dành cho rất ít người xuất chúng. |

### 7.3 Kiến trúc tích hợp Cấp bậc (Architectural Integration)

Để tối ưu hóa hiệu năng và tránh bất nhất dữ liệu, hệ thống danh hiệu được áp dụng theo các quy tắc thiết kế sau:

1.  **Thuộc tính tính toán động (Computed Property):** Cấp bậc kiếm hiệp không cần lưu trữ trực tiếp dưới dạng một cột chuỗi tĩnh trong cơ sở dữ liệu. Thay vào đó, cấp bậc sẽ được tính toán động (runtime computed) dựa trên giá trị `level` của người học thông qua hàm tiện ích `getStudentRankForLevel(level)`. Điều này giúp cơ sở dữ liệu PostgreSQL (`ge10_player_profiles`) duy trì tính chuẩn hóa cao.
2.  **Định nghĩa Hàm tiện ích:**
    ```typescript
    export interface StudentRank {
      id: string;
      name: string;
      icon: string;
      minLevel: number;
      description: string;
    }

    export const STUDENT_RANKS: StudentRank[] = [
      { id: 'tan-de-tu', name: 'Tân Đệ Tử', icon: '🌱', minLevel: 1, description: 'Mới nhập môn học viện...' },
      { id: 'de-tu', name: 'Đệ Tử', icon: '🥋', minLevel: 5, description: 'Đã bắt đầu tu học...' },
      { id: 'thieu-hiep', name: 'Thiếu Hiệp', icon: '⚔️', minLevel: 15, description: 'Có nền tảng vững vàng...' },
      { id: 'cao-thu', name: 'Cao Thủ', icon: '⭐', minLevel: 30, description: 'Thành tích nổi bật...' },
      { id: 'dai-hiep', name: 'Đại Hiệp', icon: '🐉', minLevel: 50, description: 'Võ công thượng thừa...' },
      { id: 'tong-su', name: 'Tông Sư', icon: '👑', minLevel: 80, description: 'Đỉnh phong võ học...' }
    ];

    export function getStudentRankForLevel(level: number): StudentRank {
      for (let i = STUDENT_RANKS.length - 1; i >= 0; i--) {
        if (level >= STUDENT_RANKS[i].minLevel) return STUDENT_RANKS[i];
      }
      return STUDENT_RANKS[0];
    }
    ```
3.  **Vị trí hiển thị trên giao diện (UI Integration spots):**
    *   *Top HUD:* Thay thế số level thuần túy bằng sự kết hợp giữa rank icon và số level (ví dụ: hiển thị `⚔️ Lvl 18` thay vì `Lvl 18`).
    *   *Bảng Phụ Huynh (Viện Chủ):* Hiển thị danh hiệu hiện tại bên cạnh thông tin tiến độ học tập của thiếu hiệp.
    *   *Leaderboard & Profile:* Hiển thị đầy đủ danh hiệu kèm cấp độ (ví dụ: `🐉 Đại Hiệp (Level 54)`).
4.  **Cơ chế Thăng hạng (Rank Up Perks):**
    *   Khi thiếu hiệp đạt cấp độ cột mốc chuyển giao cấp bậc (ví dụ chạm Level 5, 15, 30, 50, 80), hệ thống sẽ ghi nhận một log hoạt động thăng hạng đặc biệt trong Nhật ký truyền công (`HistoryLog`).
    *   Học viện sẽ tự động thêm huy hiệu tương ứng của cấp bậc đó vào danh sách `badges` lưu trong PostgreSQL (`ge10_player_profiles.badges`) và thưởng thêm một lượng Coin/XP đột biến để chúc mừng.

### 7.4 Đẳng cấp tu luyện theo Môn Phái (Sect Mastery Ranks)

Để Thiếu Hiệp đánh giá chính xác mức độ đầu tư tu luyện của mình trên từng môn học cụ thể (biết phái nào luyện ít, cần luyện thêm), hệ thống áp dụng hệ thống Đẳng cấp Môn phái độc lập dựa trên tỉ lệ hoàn thành bài học và câu hỏi:

1.  **Hệ thống Đẳng cấp:**
    *   🌱 **Nhập Môn:** Tỉ lệ hoàn thành < 15%
    *   📜 **Lĩnh Ngộ:** Tỉ lệ hoàn thành từ 15% đến dưới 40%
    *   ⚔️ **Tiểu Thành:** Tỉ lệ hoàn thành từ 40% đến dưới 65%
    *   🔥 **Tinh Thông:** Tỉ lệ hoàn thành từ 65% đến dưới 85%
    *   ⭐ **Đại Thành:** Tỉ lệ hoàn thành từ 85% đến dưới 98%
    *   🏆 **Xuất Chúng:** Tỉ lệ hoàn thành từ 98% trở lên (khi thiếu hiệp học hết lý thuyết và làm hết bài tập của môn phái đó).

2.  **Công thức tính Tỉ lệ Hoàn thành:**
    $$\text{Tỷ lệ Hoàn thành} = \left(\frac{\text{Số bài học đã xong}}{\text{Tổng số bài học}}\right) \times 50\% + \left(\frac{\text{Số câu trả lời đúng}}{\text{Tổng số câu hỏi của môn}}\right) \times 50\%$$

3.  **Quy tắc Trang Thân Phận (Profile Page):**
    *   Thiếu hiệp có thể click vào thẻ môn phái trong profile để chuyển đổi môn phái tu học toàn cục.
    *   Hiển thị **Nội công rèn luyện** (tổng số câu trả lời chính xác của môn phái đó).
    *   Hiển thị **Thời gian rèn luyện** (ước lượng bằng: $\text{Số câu đúng} \times 1.5$ phút).
