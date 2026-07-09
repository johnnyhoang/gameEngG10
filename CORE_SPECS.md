# Core Specification: GameEngG10 (Đấu Trường Tuyển Sinh 10)

Tài liệu đặc tả này định hình ý tưởng cốt lõi, kiến trúc chức năng, luồng vận hành kinh tế và tích hợp AI của ứng dụng **GameEngG10**. Mục tiêu là thiết lập một bộ khung định hướng nhất quán để tất cả các đợt phát triển tiếp theo bám sát, tránh việc bổ sung tính năng lan man làm loãng trải nghiệm học tập và sẵn sàng cho việc mở rộng quy mô.

---

## 1. Triết Lý Cốt Lõi & Tầm Nhìn Sản Phẩm

### 1.1 Sứ mệnh (Mission)
**GameEngG10** là nền tảng ôn thi tuyển sinh lớp 10 (mô phỏng theo cấu trúc đề tuyển sinh lớp 10 của Sở GD&ĐT TP.HCM) tích hợp cơ chế trò chơi hóa (gamification) sâu sắc. Nền tảng giải quyết bài toán:
*   **Học sinh:** Biến việc ôn luyện căng thẳng, khô khan thành các đợt chinh phục thử thách (chế độ chơi), tăng phản xạ tư duy và trực quan hóa kiến thức phức tạp (đồ thị, hình học).
*   **Viện Chủ:** Đóng vai trò là nhà tài trợ, kiểm soát và khích lệ bằng cách liên kết kết quả học tập trong thế giới ảo với các phần thưởng thực tế ngoài đời thực.

### 1.2 Mô hình Phân Quyền Vai Trò Độc Lập (Independent Role-Based Model)
Mỗi tài khoản người dùng tại một thời điểm chỉ đảm nhận duy nhất một vai trò hoạt động hoạt động (Học sinh hoặc Quản trị/Viện Chủ), hoàn toàn phân tách về mặt chức năng và giao diện:
*   **Học sinh (Student):** Chỉ tiếp cận các chức năng học tập, bản đồ game, hang luyện công, đấu trường, cửa hàng và thú cưng.
*   **Quản trị/Viện Chủ (Admin):** Chỉ tiếp cận Bảng Quản trị Viện Chủ để giám sát, phê duyệt phần thưởng, cấu hình hệ thống và quản lý câu hỏi.
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
    *   *Hang luyện công:* Gồm các Chuyên đề Môn học (Lớp 9), Công cụ học tập phụ trợ (Học lý thuyết, Sổ tay, Nguồn), và Mật thất Biki tương tác (đang phát triển, hiện giữ chỗ bằng thẻ "sắp khai mở" — xem §2.2, chỉ Toán có đủ 3 mật thất).
    *   *Khu thư giãn:* Có đầy đủ các mini-game tương tác giống như nhóm Chuyên Sâu.
*   **Cô lập ngữ cảnh tuyệt đối (Absolute Context Isolation):** Ở cùng một thời điểm, học sinh chỉ thuộc về duy nhất một Môn phái đang hoạt động (Active Sect). Toàn bộ nội dung hiển thị trong ứng dụng (bao gồm: bản đồ game, bài tập đấu trường, bài học trong hang luyện công, vật phẩm trong shop, thú cưng/ngoại trang, cho đến nhật ký hoạt động...) sẽ tự động lọc và chỉ hiển thị thông tin của Môn phái đó. Không có sự trộn lẫn nội dung giữa các môn phái trên cùng một trang màn hình (ngoại trừ duy nhất trang báo cáo/thống kê tổng quan dành cho phụ huynh).
## 2. Kiến Trúc Mô-đun & Bản Đồ Học Tập (World Map)

Hệ thống được thiết kế phân tách rõ ràng thành hai môi trường hoạt động độc lập với các mô-đun chức năng cụ thể:

### 2.1 Môi trường Thiếu Hiệp (Học sinh)

Môi trường dành cho học sinh tập trung vào trải nghiệm tu luyện, học tập và rèn luyện kỹ năng thông qua bản đồ game worldmap (`WorldMap`) — hub trung tâm dẫn vào 5 module chính bên dưới:

#### A. Năm Module Chính

##### 1. 🏛️ Đấu Trường (Arena / Play Area)
Nơi kiểm tra năng lực và rèn luyện phản xạ thi cử dưới các chế độ chơi áp lực cao:
*   **Mixed/Skill Practicing:** Luyện ngẫu nhiên theo mảng kiến thức (Grammar, Vocab, Reading, Pronunciation).
*   **Sinh tồn (Survival):** Giới hạn mạng chơi (`hearts` - tối đa 3 tim). Trả lời sai mất 1 tim. Mất hết tim là kết thúc đợt luyện.
*   **Quyết đấu Boss (Boss Battle):** Đấu trường thi thử theo thời gian thực (20 phút). Đề thi được chọn lọc bám sát cấu trúc đề chính thức các năm (2024, 2025, 2026).
*   **Truy tìm lỗi sai (Revenge):** Chế độ ôn tập riêng các câu trả lời sai trong lịch sử để khắc phục lỗ hổng kiến thức.
*   **Quy tắc Khấu trừ Chân Khí (Energy Upfront Deduction):** Chân khí được khấu trừ một lần duy nhất ngay khi thiếu hiệp xác nhận bắt đầu trận đấu. Khi đã vào trận (đặc biệt là bài thi Boss 20 phút), thiếu hiệp được tu học liên tục cho đến hết mà không bị dừng đột ngột kể cả khi chân khí cạn kiệt giữa chừng.

##### 2. 🕳️ Hang Luyện Công (Training Cave / HangLuyenCong)
Không gian tự học, hệ thống hóa lý thuyết sâu sắc theo từng môn:
*   **Các Chuyên đề Môn học:** Ôn tập lý thuyết và luyện nhanh theo đặc trưng từng môn (Toán, Văn, Anh ôn theo chuyên đề tuyển sinh; các môn Cơ bản ôn theo kiến thức cốt lõi lớp 9).
*   **3 Công cụ học tập phụ trợ:**
    *   *Học lý thuyết (Drill):* Tiếp cận bài giảng lý thuyết trước khi chuyển sang luyện tập.
    *   *Sổ tay (Notes):* Ghi chú cá nhân về lỗi sai và lưu ý cần nhớ.
    *   *Nguồn tài liệu (Sources):* Danh mục văn bản, hướng dẫn từ Bộ và Sở GD&ĐT.

###### 🔮 Mật thất Biki (Biki Interactive Studios)
Các mô-đun tương tác chuyên sâu phá vỡ giới hạn giao diện chung để trực quan hóa Toán học (chỉ áp dụng đối với Môn phái Toán):
*   **Mật thất 3D (Biki3DStudio):** Công cụ mô phỏng hình học không gian (Hình trụ, Hình nón, Hình cầu, Hình chóp, Hình hộp). Cho phép xoay 360°, đổi góc nhìn, tô màu mặt phẳng, vẽ đường cao nét đứt/nét liền dưới sự hướng dẫn của AI.
*   **Mật thất Hình học phẳng (BikiHinhHocPhang):** Bảng dựng hình 2D (điểm, tam giác, tứ giác, đường tròn). Học sinh có thể kéo thả điểm tự do, kẻ thêm đường phụ (đường cao, trung tuyến, tiếp tuyến) để tìm lời giải chứng minh hình học.
*   **Mật thất Đồ thị hàm số (BikiDoThiHamSo):** Vẽ đồ thị parabol ($y = ax^2 + bx + c$) và đường thẳng ($y = mx + n$). Cho phép kéo thanh trượt (slider) hệ số để quan sát sự thay đổi tiêu cự, đỉnh, giao điểm trực quan theo thời gian thực.

##### 3. 🦄 Sơn trang Thư Giãn (Relaxation Zone)
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

##### 4. 🏮 Bách Hóa Phường (Item Shop)
Vận hành nền kinh tế vi mô trong học viện. Tiêu hao **Ngân lượng (NP)** để đổi các vật phẩm và đặc quyền:
*   📜 **Khai Ngộ Quyển:** Gợi mở hướng giải hoặc loại bỏ đáp án nhiễu (trước đây gọi là Gợi ý / Hint).
*   ❤️ **Hồi Nguyên Đan:** Khôi phục 1 tim sinh lực cho các chế độ thử thách Sinh tồn / Boss (trước đây gọi là Tim hồi phục / Heart).
*   🛡️ **Hộ Tâm Phù:** Duy trì chuỗi tu luyện (Streak) khi bỏ lỡ một ngày, tránh bị áp Luật Phế Bỏ Võ Công (trước đây gọi là Khiên giữ chuỗi / Streak Shield).
*   🎭 **Phong Vị:** Mở khóa các phong cách giao diện cá tính như Đào Hoa, Trúc Lâm, Tinh Không, Tuyết Sơn... để thiếu hiệp cá nhân hóa không gian học tập.
*   🎁 **Phúc Lợi Gia Môn:** Đổi Ngân lượng lấy các phần thưởng thực tế do Viện Chủ thiết lập (trước đây gọi là Phần thưởng Phụ huynh / Parent Rewards).

##### 5. 🐷 Sân Nuôi Thú (Pet Sanctuary - Heo Maikawaii)
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
*   **Album Kỷ Niệm (Pet Memory Album):**
    *   *Xem lại hành trình:* Tích hợp tính năng album kỷ niệm cho phép thiếu hiệp lật xem lại hành trình của Heo Maikawaii qua các nút bấm Next/Prev. Album chứa các hình ảnh từ thuở sơ khai qua từng giai đoạn phát triển, các câu chuyện kỷ niệm đáng nhớ và những bức hình chụp chung kỷ niệm giữa thiếu hiệp và thú cưng.
    *   *Ẩn giấu tương lai:* Thiếu hiệp không thể xem trước hình ảnh ở các giai đoạn tương lai chưa đạt tới. Chỉ khi kiên trì chăm sóc, nâng cấp và phát triển Heo Maikawaii thành công, album mới mở khóa thêm nhiều hình ảnh và nội dung mới.
    *   *Hoàn thiện giao diện:* Phần giao diện (UI) của Album Kỷ Niệm sẽ được ClaudeCode tiến hành review, audit kỹ lưỡng và phát triển tiếp tục để tối ưu hóa trải nghiệm trực quan.
*   **Cơ Chế "Thú Về Chuồng" (Pet Stable & Overlay)** — *(TODO: chưa triển khai)*:
    *   **Nguyên tắc cốt lõi:** Heo Maikawaii KHÔNG chiếm không gian layout thường trực (hiện tại là cột trái cố định trên desktop, `aside w-72`). Bình thường heo ở trong **Chuồng Heo** — một nút/avatar nhỏ núp gọn ở một góc màn hình (ví dụ góc dưới-phải, kiểu "chat bubble" các web hiện đại). Toàn bộ không gian trung tâm được trả lại cho nội dung học tập.
    *   **Các thời điểm heo xuất hiện** (dưới dạng **overlay đè lên layout hiện tại**, nền phía sau làm mờ nhẹ để tập trung vào heo):
        1.  *Chào khi đăng nhập:* Ngay sau khi thiếu hiệp bấm "Đã Lĩnh Ngộ" đóng trang Cẩm Nang ngẫu nhiên hiện ra lúc đăng nhập (Login Trigger §2.7), heo xuất hiện chào hỏi một lần. Sau đó heo về chuồng, chỉ ra tiếp khi được gọi hoặc khi có lý do dưới đây.
        2.  *Triệu hồi thủ công:* Thiếu hiệp bấm vào Chuồng Heo bất cứ lúc nào để chủ động gọi heo ra.
        3.  *Nhắc học (Idle Reminder):* Quá lâu không có tương tác nào trong app (ngưỡng mặc định 5 phút không thao tác), heo tự ra nhắc nhở học tiếp.
        4.  *Nhắc ngủ (sau 22:00 giờ địa phương):* Heo ra nhắc đi ngủ; nếu bị cho về chuồng mà thiếu hiệp vẫn còn thức trong app, heo sẽ **tự động quay lại nhắc mỗi 5 phút** cho đến khi thoát app hoặc qua khỏi khung giờ.
        5.  *Đòi ăn (Hunger):* Khi quá lâu chưa được cho ăn (dựa trên field `lastFed` sẵn có), heo tự ra đòi ăn.
    *   **Cách duy nhất cất heo về chuồng:** overlay **KHÔNG có nút đóng (X)**. Thiếu hiệp bắt buộc phải *cho ăn*, *tương tác* (vuốt ve/khen) hoặc *thọt lét (Tickle)* thì heo mới chịu về chuồng. Thọt lét là lối thoát miễn phí không tốn tài nguyên; cho ăn vẫn tốn NP + XP theo đúng quy tắc hiện hành ở mục trên (chấp nhận rủi ro tụt cấp).
    *   **Kỷ luật thi cử — không phá bĩnh giữa trận:** Khi thiếu hiệp đang trong trận đấu (Đấu Trường / Boss / đang làm bài luyện tập), mọi trigger tự động (idle/ngủ/đói) bị **hoãn lại**, dồn tích và chỉ hiện ra ngay khi thiếu hiệp thoát về Sơn Trang/Bản Đồ. Trigger triệu hồi thủ công vẫn bị khóa trong lúc làm bài như hiện tại.
    *   **Chuồng Heo vẫn là cổng vào Sân Nuôi Thú đầy đủ:** Từ overlay hoặc nút Chuồng Heo đều mở được toàn bộ Sân Nuôi Thú (Album Kỷ Niệm, cho ăn chủ động, xem tiến hóa) — không mất tính năng nào, chỉ đổi cách hiển thị từ "luôn nằm sẵn trên layout" sang "gọi ra khi cần".
    *   **Hệ quả layout (re-layout diện rộng):** Mọi trang trước đây phải chừa `aside w-72` cho thú (Sơn Trang/Bản Đồ, và gián tiếp ảnh hưởng độ rộng khả dụng của Bách Hóa, Hang Luyện Công, Lầu Thư Giãn khi xem trên cùng khung `main` chung) được thiết kế lại để card, box, công cụ rộng rãi hơn, hiển thị nhiều thông tin hơn trên cùng một màn hình — xem chi tiết Mục 5.

#### B. Một Module Phụ

##### 1. 👑 Thân Phận (Profile Page)
Hồ sơ cá nhân của thiếu hiệp — nơi tra cứu tiến trình tu luyện và là **cổng duy nhất** để đổi Môn Phái đang hoạt động:
*   **Global Switch Môn Phái:** Đây là nơi duy nhất trong toàn ứng dụng cho phép đổi Môn phái đang hoạt động (Active Sect) — xem §1.3 Cô lập ngữ cảnh tuyệt đối và §7.4. Học sinh click vào thẻ môn phái để chuyển đổi; toàn bộ nội dung (bản đồ, đấu trường, hang luyện công, sơn trang, shop, nhật ký) tự động lọc lại theo môn phái vừa chọn. TopHUD chỉ hiển thị chấm màu môn phái đang mở, không có dropdown chọn môn riêng.
*   **Đẳng Cấp Môn Phái (Sect Mastery):** Hiển thị đẳng cấp tu luyện độc lập theo từng môn phái (Nhập Môn → Xuất Chúng), Nội Công rèn luyện (tổng câu trả lời đúng) và Thời Gian rèn luyện ước lượng — công thức chi tiết xem §7.4.
*   **Danh hiệu & tiến trình chung:** Danh hiệu kiếm hiệp (Tân Đệ Tử, Đệ Tử, Thiếu Hiệp...) ánh xạ từ Level (§7.2), badges và lịch sử truyền công.
*   **Cổng hành động chuyển màn nhanh (Exit Gates):** 2 nút ở chân trang — 🚪 *Bôn Tẩu Giang Hồ* (về Bản Đồ) và ⚔️ *Vào Hang Luyện Công* (đi thẳng vào luyện tập theo môn phái vừa chọn).
*   **Cẩm Nang Bí Lục:** Lối vào để lật xem toàn bộ cuốn cẩm nang bất kỳ lúc nào (xem §2.7).

### 2.6 ⚙️ Bảng Quản Trị Viện Chủ (Admin Console)
Hệ thống quản lý, giám sát và cung cấp tài nguyên, được phân chia thành các khu vực chuyên biệt:
*   🏛️ **Chính Điện:** Trung tâm quyền lực và phân quyền. Quản lý tài khoản thiếu hiệp, thiết lập PIN bảo mật, thăng cấp/hạ cấp vai trò. Đây là nơi quản lý học sinh ở quy mô toàn viện (không chia theo môn phái).
*   📖 **Thiên Cơ Các:** Nơi lưu trữ thông tin, báo cáo, cơ mật của toàn viện. Dashboard tổng quan thống kê kết quả học tập của thiếu hiệp, số lượng câu hỏi, bài học và hiệu quả tu học chung của toàn bộ môn phái.
*   📚 **Vạn Quyển Các:** Kho tri thức và quản lý đề thi (CRUD, nạp đề thi bằng AI). Viện Chủ bắt buộc phải chọn ngữ cảnh môn phái cụ thể tại mỗi thời điểm quản lý.
*   👑 **Thân Phận:** Hồ sơ cá nhân của thiếu hiệp (profile), hiển thị danh hiệu kiếm hiệp (Tân Đệ Tử, Đệ Tử, Thiếu Hiệp...), cấp độ tu học, badges và lịch sử truyền công.
*   💰 **Ngân Các:** Quản lý kho tài nguyên, phê duyệt yêu cầu đổi quà tiêu vặt (VND Wallet), cấu hình chi phí chân khí khi làm bài, định mức NP/XP thưởng và danh mục quà tặng.

### 2.7 📖 Cẩm Nang Bí Lục (Giang Hồ Cẩm Nang)
Sổ tay quy tắc, kinh nghiệm tu hành của học viện được biên soạn dưới dạng sách cổ bí kíp:
*   **Cơ cấu nội dung:** Để đảm bảo tính dễ đọc và vừa mắt học sinh, nội dung sách được chia nhỏ thành nhiều trang ngắn gọn (mỗi trang chỉ chứa tối đa 2 câu). Danh sách ban đầu gồm 12 trang chia thành các chương: Võ Học & Tinh Tấn, Đấu Trường Kỳ Ngộ, Giang Hồ Quy Tắc.
*   **Kích thước & Thiết kế sách cổ:** Thiết kế với kích thước bỏ túi nhỏ gọn (`max-w-md`) để trông giống như một cuốn sổ tay võ học. Nền giấy dó cổ kính màu vàng nâu kết hợp cùng font chữ Lora (`font-ancient-book`) được tối ưu hóa hiển thị tiếng Việt, nét chữ sắc nét giúp học sinh không bị mỏi mắt.
*   **Điểm chạm tương tác của Thiếu Hiệp:**
    *   *Login Trigger:* Mỗi khi đăng nhập vào hệ thống, một trang ngẫu nhiên của cẩm nang sẽ tự động hiển thị. Thiếu hiệp bắt buộc phải đọc và bấm nút "Đã Lĩnh Ngộ" để có thể đóng sách và tiếp tục tu học ở Đấu trường.
    *   *Logout Trigger:* Mỗi khi thiếu hiệp bấm Đăng xuất (thoát), một trang cẩm nang sẽ mở ra để dặn dò trước khi rời giang hồ. Bấm "Đã Lĩnh Ngộ" để hoàn tất đăng xuất.
    *   *Thân Phận (Profile Page):* Thiếu hiệp có thể mở toàn bộ cuốn cẩm nang để lật xem từng trang, từng chương bất kỳ lúc nào để tra cứu quy tắc.
*   **Quyền quản trị của Viện Chủ:** Tại **Ngân Các** (hoặc bảng quản trị), Viện Chủ có thể tra cứu toàn bộ cuốn sách và có một biểu mẫu riêng để **nạp thêm các trang dặn dò** (Quy định riêng của gia đình, nhắc nhở ôn bài, lịch học thực tế) vào cuốn cẩm nang của thiếu hiệp. Dữ liệu các trang mới này được đồng bộ và lưu trữ tự động.

---

## 2.8 Kiến Trúc Phân Cấp "Page 3 Tầng" cho Bản Đồ Khám Phá (Map Page Hierarchy) — *(TODO: đang phân tích, chưa triển khai)*

Toàn bộ không gian điều hướng của Thiếu Hiệp sẽ được mô hình hóa lại thành một cây **Page 3 tầng** (Cấp 1 → Cấp 2 → Cấp 3) thay vì các "màn hình" rời rạc như hiện tại. Mỗi Page (từ Cấp 2 trở xuống) là một điểm có thể **khám phá (explore)** và ghi lại dấu vết tu luyện riêng theo từng thiếu hiệp, phục vụ nhiều mục đích game hóa (gợi ý ôn tập, thành tựu khám phá bản đồ, heatmap cho Viện Chủ...).

### 2.8.1 Cấp 1 — Các Page gốc (ngang hàng, không lồng nhau)
Trùng với các module chính/phụ đã có ở §2.1, tất cả đều **ngang cấp**, không có page nào là "vùng con" của page khác: **Bản Đồ (WorldMap)**, **Đấu Trường**, **Hang Luyện Công**, **Sơn Trang Thư Giãn**, **Bách Hóa Phường**, **Sân Thú Nuôi**, **Thân Phận**.

> ✏️ *Sửa so với bản nháp trước:* Sơn Trang Thư Giãn, Bách Hóa Phường, Sân Thú Nuôi **không phải** là loại "vùng" (Mật Cảnh) nằm bên trong Bản Đồ Lớn — đã bỏ hẳn cách phân loại đó. Cả 3 đều là Page Cấp 1 độc lập, ngang hàng với WorldMap/Đấu Trường/Hang Luyện Công.

### 2.8.2 Vùng Điều Hướng Trung Tâm (Central Navigation Hub) — quy tắc áp dụng cho MỌI Page Cấp 1

Mỗi Page Cấp 1 đều dành riêng một **vùng trung tâm** đặt các cổng (gate/portal component) dẫn sang các Page Cấp 1 khác. Vùng này thuần túy là hạ tầng điều hướng, **không được tính là page con**. Các thành phần còn lại trên trang — sau khi trừ đi vùng điều hướng này — mới thật sự là **Page con (Cấp 2)** thuộc về chính page đó.

**Vùng này biểu hiện khác nhau theo thiết bị:**
*   **Mobile:** đã tồn tại sẵn dưới dạng **thanh điều hướng dưới cùng (Bottom Navigation)** — persistent trên mọi màn hình (`App.tsx`), gồm 5 nút 🗺️ Bản Đồ / ⚔️ Đấu Trường / 📚 Hang / 🏮 Bách Hóa / 🐷 Sân Thú Nuôi. Vì đây là chrome dùng chung toàn app (không nằm trong nội dung riêng của từng trang), **mọi Page Cấp 1 trên mobile đã có sẵn Vùng Điều Hướng Trung Tâm**, kể cả Hang Luyện Công và Sơn Trang Thư Giãn.
*   **Desktop:** **chưa đạt độ phủ tương đương mobile**. Chỉ chính trang WorldMap có đủ lưới 5 cổng (`WorldMap.tsx`); các trang còn lại chỉ có nav rút gọn qua `TopHUD` (nút Bách Hóa, Hang Luyện Công, Thân Phận + logo bấm về Bản Đồ) — thiếu cổng trực tiếp sang Đấu Trường và Sân Thú Nuôi từ mọi trang. Đây là gap thật cần bổ sung.

| Page Cấp 1 | Vùng Điều Hướng Trung Tâm — Mobile | Vùng Điều Hướng Trung Tâm — Desktop | Thành phần còn lại = Page con Cấp 2 thật sự |
| :--- | :--- | :--- | :--- |
| 🗺️ **Bản Đồ Lớn (WorldMap)** | ✅ Bottom Nav | ✅ Lưới 5 cổng tại chỗ | Daily Quest Banner, banner gợi ý của AI Sư Phụ (weak-lesson) — đây mới là page con Cấp 2 thật sự của WorldMap, hiện chưa được đặt tên/phân loại cụ thể *(TODO)* |
| 🕳️ **Hang Luyện Công** | ✅ Bottom Nav | ⚠️ Chỉ có nút "Đổi môn phái tại Thân Phận" qua TopHUD — TODO bổ sung cổng đầy đủ | Mật Thất, Hầm, Rương — xem §2.8.3 |
| 🦄 **Sơn Trang Thư Giãn** | ✅ Bottom Nav | ⚠️ Chưa có cổng liên trang riêng trong trang — TODO | 3 Cảnh (Hoa Viên/Núi Rừng/Thác Hồ) — xem §2.8.3 |
| ⚔️ **Đấu Trường** | ✅ Bottom Nav | ⚠️ Chưa có cổng liên trang riêng trong trang — TODO | *(chưa định nghĩa — TODO)* |
| 🏮 **Bách Hóa Phường** | ✅ Bottom Nav | ⚠️ Chưa có cổng liên trang riêng trong trang — TODO | *(chưa định nghĩa — TODO)* |
| 🐷 **Sân Thú Nuôi** | ✅ Bottom Nav | ⚠️ Chưa có cổng liên trang riêng trong trang — TODO | *(chưa định nghĩa — TODO)* |

> ⚠️ *Điểm cần xác nhận lại:* yêu cầu gốc nói vùng trung tâm của WorldMap có "4 component link qua 4 trang còn lại", nhưng theo cấu trúc 5 module đã triển khai thực tế (§2.1) và đúng như Bottom Nav mobile hiện có, WorldMap có 5 cổng (Đấu Trường/Hang/Sơn Trang/Bách Hóa/Sân Thú Nuôi). Tạm ghi nhận theo đúng thực tế code (5 cổng) — nếu ý user là con số 4 có chủ đích khác thì cần nói rõ ở đợt sau.

### 2.8.3 Cấp 2 — Page con nội dung thật sự theo từng Page Cấp 1

#### Hang Luyện Công → 3 loại Page con

| Loại | Ý nghĩa | Thành phần hiện tại map vào |
| :--- | :--- | :--- |
| 🔮 **Mật Thất** | Buồng bí mật, mô-đun tương tác sâu | Mật Thất Biki (Biki3DStudio, BikiHinhHocPhang, BikiDoThiHamSo — hiện chỉ đủ 3 mật thất cho Toán, xem §2.1/§1.3) |
| 🕳️ **Hầm** (Hỏa Hầm / Băng Hầm / Thạch Hầm) | Không gian luyện tập theo Chuyên đề | "Hầm Ngục Chuyên Đề" hiện có (accordion theo Chuyên đề Môn học) — mỗi Chuyên đề được gán vào 1 trong 3 hầm nguyên tố |
| 🎁 **Rương** | Vật phẩm/công cụ phụ trợ ẩn bên trong Hầm | 3 Công cụ học tập phụ trợ hiện tại (Học lý thuyết / Sổ tay / Nguồn tài liệu) — tái định vị thành "rương" mở ra bên trong mỗi Hầm thay vì hiển thị ngang hàng như tab riêng |

> ⚠️ *Điểm cần chốt lại với user:* quy tắc gán 1 Chuyên đề vào Hỏa/Băng/Thạch Hầm cụ thể là gì (theo độ khó, theo dạng bài, hay random cố định theo id chuyên đề để ổn định qua các lần vào)?

#### Sơn Trang Thư Giãn → 3 Cảnh
3 Cảnh ở đây **thuần túy trực quan/trang trí**, không phân biệt chức năng — toàn bộ 9 mini-game hiện có (Thẻ Nhớ, Ghép Cặp, Sơ Đồ Ôn Tập, Tình Huống RPG, Du Khảo Kỳ Thú, Trình Tự Giải, Đọc Hiểu Sâu, Giảng Cho AI, Ghép Sơ Đồ) về bản chất đều là "khu vui chơi trí tuệ" như nhau, chỉ đổi giao diện/khung cảnh bao quanh:

| Cảnh | Mini-game đề xuất gán vào (minh họa, chưa cố định) |
| :--- | :--- |
| 🌸 **Cảnh Hoa Viên** | Thẻ Nhớ, Ghép Cặp, Sơ Đồ Ôn Tập |
| 🏔️ **Cảnh Núi Rừng** | Du Khảo Kỳ Thú, Trình Tự Giải, Đọc Hiểu Sâu |
| 🌊 **Cảnh Thác Hồ** | Tình Huống RPG, Giảng Cho AI, Ghép Sơ Đồ |

#### Đấu Trường, Bách Hóa Phường, Sân Thú Nuôi
Chưa định nghĩa Page con Cấp 2 — TODO đợt sau (xem §2.8.2).

### 2.8.4 Cấp 3 — Page lá
Chưa định nghĩa (theo yêu cầu user, sẽ chốt ở đợt sau). Ví dụ tham khảo: dưới Mật Thất Ngữ Pháp (Cấp 2) có các Page lá Verb Tense / Passive Voice / Relative Clause. Với nhánh Sơn Trang, Đấu Trường, Bách Hóa, Sân Thú Nuôi — Cấp 3 là gì vẫn còn bỏ ngỏ (có thể là từng vòng chơi/level trong minigame, từng Boss, từng vật phẩm...).

### 2.8.5 Cấu trúc dữ liệu Page & Dấu vết Khám phá (đề xuất, chưa triển khai)

```typescript
type PageLevel = 1 | 2 | 3;

type ZoneTypeHangLuyenCong = 'mat_that' | 'ham' | 'ruong';
type ZoneTypeSonTrang = 'canh_hoa_vien' | 'canh_nui_rung' | 'canh_thac_ho';

interface MapPage {
  id: string;
  level: PageLevel;
  parentId: string | null;        // null nếu là Cấp 1 (Cấp 1 không có parent — tất cả ngang hàng)
  rootPageId: string;              // Page Cấp 1 gốc mà node này thuộc về (worldmap/hang/sontrang/...)
  zoneType?: ZoneTypeHangLuyenCong | ZoneTypeSonTrang; // chỉ Page Cấp 2 mới có, tùy theo rootPageId
  isNavGate?: boolean;             // true nếu đây là 1 cổng trong Vùng Điều Hướng Trung Tâm (§2.8.2) — KHÔNG tính là page con thật sự, chỉ dùng cho routing UI
  name: string;
  icon: string;
}

// Dấu vết khám phá — ghi theo từng học sinh, áp dụng cho Page Cấp 2 và Cấp 3 (không áp dụng cho cổng điều hướng isNavGate)
interface PageExplorationState {
  studentId: string;
  pageId: string;
  lastExploredAt: string;          // ISO timestamp của lần khám phá gần nhất
  explorationCount: number;        // tổng số lần vào Page này
  childPagesExploredCount: number; // số Page con đã khám phá ít nhất 1 lần
}
```

**Ví dụ minh họa** (theo đúng kịch bản user đặt ra): Thuý Nga vào **Hang Luyện Công** (Cấp 1) lúc 14:00 hôm qua → khám phá **Mật Thất Ngữ Pháp** (Cấp 2, loại `mat_that`) → khám phá 3 Page lá Cấp 3 (Verb Tense, Passive Voice, Relative Clause). 19:00 cùng ngày quay lại Mật Thất Ngữ Pháp, khám phá thêm 2 Page con mới.
→ `PageExplorationState(studentId: 'thuy-nga', pageId: 'mat-that-ngu-phap')`: `explorationCount = 2`, `lastExploredAt = 19:00 hôm qua`, `childPagesExploredCount = 5`.
→ Mỗi Page Cấp 3 được khám phá cũng tự sinh 1 dòng `PageExplorationState` riêng cho chính nó (`explorationCount = 1`, `childPagesExploredCount = 0` vì là lá).

**Mục đích sử dụng dữ liệu** (định hướng, chưa triển khai): AI Sư Phụ gợi ý ôn lại vùng có `lastExploredAt` cũ nhất; thành tựu "đã khám phá X% Hang Luyện Công"; Viện Chủ xem heatmap con học nhiều/ít ở đâu; sự kiện Kỳ Ngộ Giang Hồ (§3.C) ưu tiên xuất hiện ở vùng ít được khám phá.

### 2.8.6 Việc cần chốt tiếp (chưa làm ngay)
1.  Xác nhận số lượng cổng ở vùng điều hướng trung tâm của WorldMap (5 theo code thực tế/Bottom Nav mobile hay 4 theo ý user — xem ghi chú ở §2.8.2).
2.  Bổ sung Vùng Điều Hướng Trung Tâm trên **desktop** cho Hang Luyện Công, Sơn Trang Thư Giãn, Đấu Trường, Bách Hóa Phường, Sân Thú Nuôi (mobile đã có sẵn qua Bottom Nav; desktop mới chỉ WorldMap có đủ 5 cổng tại chỗ).
3.  Định nghĩa Page con Cấp 2 cho Đấu Trường, Bách Hóa Phường, Sân Thú Nuôi (hiện hoàn toàn bỏ ngỏ).
4.  Định nghĩa Page Cấp 3 cho từng nhánh.
5.  Quy tắc gán cố định Chuyên đề → Hầm nguyên tố (Hỏa/Băng/Thạch).
6.  Đặt tên/phân loại chính thức cho Daily Quest Banner + AI Sư Phụ banner (page con Cấp 2 thật sự của WorldMap).
7.  Thiết kế bảng PostgreSQL cho `MapPage` (dữ liệu tĩnh, seed 1 lần) và `PageExplorationState` (dữ liệu động theo từng học sinh).

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

#### D. Cơ Chế "Môn Chủ Hỏi Tội" (Chống Né Tránh Thử Thách) — *(TODO: chưa triển khai)*
Nút "Bỏ qua câu này" xuất hiện xuyên suốt mọi khu vực làm bài (Đấu Trường, Hang Luyện Công...) hiện cho phép bỏ qua tự do, không có rào cản. Để tránh Thiếu Hiệp lạm dụng né tránh thử thách thay vì cố gắng tư duy, bổ sung quy tắc sau:
*   **Vấn Tội trước khi Bỏ qua:** Khi bấm "Bỏ qua câu này", hệ thống **không** bỏ qua ngay mà hiện hộp thoại **Môn Chủ Hỏi Tội** với giọng điệu nghiêm khắc, bắt buộc Thiếu Hiệp chọn 1 trong các lý do né tránh trước khi được xác nhận bỏ qua:
    *   🥵 *Quá khó* — vượt quá năng lực hiện tại.
    *   📜 *Quá dài* — đề bài dài dòng, mất nhiều thời gian đọc.
    *   🤪 *Quá khùng* — đề bài vô lý, sai sót, khó hiểu, diễn đạt tối nghĩa.
    Kèm theo mức độ nghiêm trọng tự đánh giá từ **1 đến 5** (1 = khó chịu nhẹ, 5 = rất nghiêm trọng cần Viện Chủ xem gấp).
*   **Chuyển hóa thành phản ánh cho Viện Chủ:** Lý do + mức độ + câu hỏi liên quan được ghi vào ngân hàng câu hỏi (mở rộng cờ `isConfused` sẵn có thành cấu trúc đầy đủ: `skipReason`, `skipSeverity`) để Viện Chủ xem lại, cân nhắc sửa hoặc gỡ câu hỏi tại Vạn Quyển Các.
*   **Giới hạn Bỏ qua trong ngày:** Thiếu Hiệp chỉ được Bỏ qua tối đa **3 câu/ngày**, tính gộp trên **toàn bộ ứng dụng** (không phân biệt Đấu Trường hay Hang Luyện Công, không reset theo từng phiên chơi). Đến lượt Bỏ qua thứ 4 trong cùng một ngày, Môn Chủ sẽ từ chối yêu cầu bằng giọng điệu nghiêm khắc hơn, buộc Thiếu Hiệp phải tự trả lời (đúng hoặc sai) mới được đi tiếp, không còn lựa chọn Bỏ qua cho đến khi reset vào ngày hôm sau.

### 3.1 Quy tắc ví tiền mặt thực tế (VND Wallet) & Đổi quà bằng Coins (NP)
*   **Đổi quà bằng Coins (NP):** Quà tặng Viện Chủ được định giá bằng Coins (NP). Khi thiếu hiệp yêu cầu đổi quà, hệ thống sẽ trừ lượng Coins tương ứng của thiếu hiệp và tự động quy đổi thành yêu cầu rút tiền VND chuyển đến cho Viện Chủ dựa trên tỷ giá quy đổi do Viện Chủ tự thiết lập trong Ngân Các (ví dụ: 100 Coins = 10,000đ).
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
*   **Bố cục Thanh HUD (`TopHUD`):** Để tránh rối mắt (nhiều box chồng lấn, cao thấp lộn xộn), thanh HUD gom nhóm thông tin thành các **khối gộp có cùng chiều cao** thay vì rải rác từng chỉ số riêng lẻ:
    *   *Khối Định Danh:* 1 khối duy nhất gồm avatar, tên, danh hiệu/cấp độ (hoặc badge Viện Chủ), thanh EXP và Chân Khí — thông tin "về người chơi" gộp chung 1 nơi.
    *   *Khối Tài Nguyên:* 1 khối duy nhất gồm Tim sinh mệnh, Ngân Lượng (NP), Chuỗi luyện công (kèm icon Hộ Tâm Phù nếu có) và Ví Thưởng — các chỉ số kinh tế/tiến trình gộp chung 1 nơi, phân cách bằng vạch mảnh, không dùng nhãn chữ 2 dòng (chỉ icon + số + tooltip) để tiết kiệm không gian.
    *   *Điều hướng nhanh:* Nút vào Bách Hóa Phường và Hang Luyện Công dùng icon gọn (ẩn chữ ở màn hình hẹp, chỉ hiện icon + tooltip).
    *   *Nút Thân Phận:* Mang theo 1 chấm màu nhỏ theo màu môn phái đang hoạt động (xem §1.3 Global Switch) — đây là nơi duy nhất để đổi môn phái, HUD không có dropdown môn phái riêng.
    *   *Nút Thoái Ẩn:* Tên gọi kiếm hiệp cho hành động Đăng xuất (logout), giữ nhất quán văn phong giang hồ toàn ứng dụng.
*   **Bố cục "Chuồng Heo" thay thế cột thú cố định** — *(TODO: chưa triển khai, xem §2.5)*: Cột trái `aside w-72` chiếm chỗ Heo Maikawaii thường trực trên desktop bị loại bỏ. Thay vào đó:
    *   *Chuồng Heo:* một nút/avatar nhỏ neo cố định ở góc màn hình (không chiếm luồng layout chính, `position: fixed`), luôn hiện diện làm điểm triệu hồi thủ công.
    *   *Overlay Heo:* khi xuất hiện (chào đăng nhập, idle, nhắc ngủ, đói), heo hiển thị dạng lớp phủ (modal/overlay) đè lên toàn bộ layout hiện tại, nền sau mờ nhẹ — không chiếm không gian cố định, không đẩy lệch bố cục các trang khác.
    *   *Re-layout diện rộng:* Sơn Trang/Bản Đồ (`GameMap`), Bách Hóa Phường, Hang Luyện Công, Lầu Thư Giãn được thiết kế lại bố cục lưới/card để tận dụng phần không gian trước đây dành cho cột thú — nhiều cột hơn, card lớn hơn, hiển thị nhiều thông tin hơn trên cùng một màn hình.

---

## 6. Khung Định Hướng Mở Rộng (Extensibility Roadmap)

Hệ thống được thiết kế dạng mô-đun rời (decoupled) để dễ dàng tích hợp các cải tiến sau này mà không cần đập đi xây lại:

1.  **Mở rộng Môn học mới (Lớp 10 / THPT):** Cấu trúc dữ liệu `subject` hỗ trợ enum mở rộng. Có thể dễ dàng thêm Lý, Hóa, Sinh bằng cách tạo thêm track môn và bảng ánh xạ chủ đề.
2.  **Chế độ Chơi mạng (Multiplayer Arena):** Cơ chế PvP thời gian thực, bảng xếp hạng liên trường hoặc liên nhóm lớp.
3.  **Tích hợp Thư viện vẽ nâng cao:** Chuyển đổi các mật thất Biki từ vẽ SVG sang Canvas 2D/WebGL để tối ưu hóa hiệu năng xoay mô hình 3D phức tạp.
4.  **Cổng kết nối Viện Chủ liên ứng dụng:** Tách riêng cổng Viện Chủ thành một ứng dụng nhỏ hoặc kênh chatbox (Telegram/Zalo) nhận thông báo thời gian thực mỗi khi con hoàn thành bài học hoặc gửi yêu cầu phê duyệt quà.

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
| **Discipline Voice (hệ thống)** | **Môn Chủ** ⚖️ | Giọng nói kỷ luật, nghiêm khắc của học viện — chỉ xuất hiện khi Thiếu Hiệp có hành vi né tránh thử thách (vd Bỏ qua câu hỏi, xem §3.D). Không phải tài khoản/vai trò thật, chỉ là nhân vật tường thuật trong UI. |

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
    *   **Cổng hành động chuyển màn nhanh (Exit Gates):** Sau khi thay đổi thân phận và phong vị vừa ý, thiếu hiệp có 2 cổng hành động trực quan ở chân trang để đi thẳng đến khu vực cần thiết:
        *   *🚪 Bôn Tẩu Giang Hồ:* Đóng hồ sơ và chuyển màn hình về Bản đồ môn phái (Main Map).
        *   *⚔️ Vào Hang Luyện Công:* Đóng hồ sơ và đi thẳng tới Hang Luyện Công để bắt đầu làm bài luyện tập.

---

## 8. Tự Điển Thuật Ngữ & Khái Niệm (Terminology & Concepts Dictionary)

> [!IMPORTANT]
> **Quy Tắc Biên Soạn:** Mỗi khi có ý tưởng hoặc tính năng mới được cập nhật vào Core Specs, các khái niệm, tên gọi và thuật ngữ mới bắt buộc phải được định nghĩa và cập nhật vào bộ tự điển này để đảm bảo tính đồng bộ từ thiết kế đến triển khai mã nguồn.

| Tên tiếng Việt (UI) | Tên tiếng Anh (UI) | Tên kỹ thuật (Code) | Mô tả |
| :--- | :--- | :--- | :--- |
| **Viện Chủ** 👑 | Parent / Admin | `admin` / `parent` / `ParentConsole` | Người quản lý cao nhất của học viện (phê duyệt phần thưởng, giám sát tổng quan). |
| **Đạo Sư** 📖 | Teacher / Creator | `teacher` / `instructor` | Thầy cô phụ trách soạn thảo học liệu, bài học của các môn phái. |
| **Khảo Quan** 📝 | Examiner / Grader | `grader` / `examiner` | Người phụ trách chấm điểm bài luận và đánh giá học lực của thiếu hiệp. |
| **Linh Sư** 🤖 | AI Companion | `aiCompanion` / `ai_teacher` / `Gemini` | Người đồng hành ảo thông tuệ hướng dẫn thiếu hiệp mọi lúc mọi nơi. |
| **Thiếu Hiệp** 🌱 | Student / Player | `student` / `player` / `user` | Người học tham gia tu luyện kiến thức trong học viện. |
| **Môn Chủ** ⚖️ | Discipline Voice | `disciplineVoice` / `systemVoice` | Nhân vật ảo của hệ thống đóng vai trò kỷ luật, nghiêm khắc vấn tội khi thiếu hiệp né tránh thử thách. |
| **Đấu Trường** 🏛️ | Arena | `PlayArea` / `Arena` / `arena` | Nơi thử thách làm bài dưới áp lực thời gian hoặc giới hạn sinh lực. |
| **Mixed/Skill Practicing** | Practice Mode | `practice` / `mixed` | Chế độ ôn tập tự do theo mảng kiến thức của môn học. |
| **Sinh tồn** | Survival Mode | `survival` | Chế độ làm bài giới hạn số tim sinh mệnh, sai 3 lần là kết thúc. |
| **Quyết đấu Boss** | Boss Battle | `boss` / `bossBattle` | Chế độ thi thử đề chuẩn 20 phút lấy từ cấu trúc đề chính thức. |
| **Truy tìm lỗi sai** | Revenge | `revenge` | Chế độ luyện lại riêng các câu trả lời sai trong lịch sử để vá lỗ hổng. |
| **Hang Luyện Công** 🕳️ | Training Cave | `TrainingCave` / `hang` / `hang-plane` / `hang-3d` | Không gian tự học, hệ thống hóa lý thuyết sâu sắc theo từng môn. |
| **Mật thất Biki** 🔮 | Biki Studios | `BikiStudios` / `biki` | Không gian mô phỏng tương tác Toán học (3D, Hình học phẳng, Đồ thị). |
| **Mật thất 3D** | Biki 3D Studio | `Biki3DStudio` / `hang-3d` | Mô phỏng hình học không gian 3D, hỗ trợ xoay và vẽ hình trực quan. |
| **Mật thất Hình học phẳng** | Biki Geometry Studio | `BikiHinhHocPhang` / `hang-graph` | Bảng dựng hình 2D, cho phép kéo thả điểm và vẽ thêm đường phụ. |
| **Mật thất Đồ thị hàm số** | Biki Function Studio | `BikiDoThiHamSo` / `hang-plane` | Vẽ đồ thị parabol và đường thẳng trực quan bằng thanh trượt hệ số. |
| **Sơn trang Thư Giãn** 🦄 | Relaxation Zone | `RelaxationZone` / `relax` | Module chứa các mini-game tương tác học tập nhẹ nhàng (SRS, Ghép cặp...). |
| **Bách Hóa Phường** 🏮 | Item Shop | `ItemShop` / `shop` | Cửa hàng đổi vật phẩm hỗ trợ và đặc quyền bằng Ngân Lượng. |
| **Khai Ngộ Quyển** 📜 | Hint Scroll | `hints` / `hint` / `buyHint` | Vật phẩm dùng để gợi ý lời giải hoặc loại bỏ đáp án nhiễu. |
| **Hồi Nguyên Đan** ❤️ | Health Pill | `hearts` / `heart` / `buyHeart` | Dược phẩm khôi phục 1 tim sinh mệnh dùng trong Sinh Tồn / Boss. |
| **Hộ Tâm Phù** 🛡️ | Protection Charm | `badges` ("Streak Shield") / `buyStreakShield` | Pháp khí bảo vệ chuỗi tu luyện (Streak) khi lỡ quên đăng nhập 24h. |
| **Phong Vị** 🎭 | Appearance Theme | `uiTheme` / `UiThemeId` / `ProfileThemeModal` | Giao diện hiển thị cá nhân hóa (Đào Hoa, Trúc Lâm, Tinh Không, Tuyết Sơn...). |
| **Phúc Lợi Gia Môn** 🎁 | Parent Reward | `rewards` / `ParentReward` / `claimParentReward` | Phần thưởng thực tế ngoài đời được Viện Chủ thiết lập và phê duyệt. |
| **Sân Nuôi Thú** 🐷 | Pet Sanctuary | `PetSanctuary` / `pet` | Nơi chăm sóc và tương tác tiến hóa với Heo Maikawaii. |
| **Album Kỷ Niệm** | Pet Memory Album | `petAlbum` / `memoryAlbum` | Nơi lưu giữ hình ảnh và nhật ký hành trình lớn lên của thú cưng. |
| **Thân Phận** 👑 | Profile | `ProfileThemeModal` / `isProfileOpen` | Modal quản lý thông tin đệ tử, danh hiệu, badges và chuyển đổi môn phái. |
| **Bảng Quản Trị Viện Chủ** | Admin Console | `ParentConsole` / `parent` | Bảng quản lý tổng quan dành riêng cho vai trò Viện Chủ. |
| **Chính Điện** 🏛️ | Main Hall | `chinh_dien` | Phân hệ quản lý thành viên, bảo mật PIN trong Bảng Quản Trị. |
| **Thiên Cơ Các** 📖 | Secrets Library | `thien_co_cac` | Phân hệ báo cáo thống kê, dashboard số liệu của học viện. |
| **Vạn Quyển Các** 📚 | Question Bank | `van_quyen_cac` / `QuestionBank` | Phân hệ quản lý câu hỏi đề thi và nạp đề bằng AI. |
| **Ngân Các** 💰 | Treasury | `ngan_cac` | Phân hệ quản lý tài nguyên, cấu hình game và phê duyệt Phúc Lợi. |
| **Cẩm Nang Bí Lục** 📖 | Giang Hồ Handbook | `GiangHoCamNang` / `handbookPages` | Cuốn sách cổ dặn dò hiển thị khi đăng nhập/đăng xuất hoặc xem ở Thân Phận. |
| **Chân Khí** ⚡ | Energy | `energy` / `studentEnergyPercent` | Thể lực tiêu hao khi làm bài đấu trường hoặc vượt ải. |
| **Ngân Lượng** 🪙 | Coins (NP) | `coins` / `coinsChanged` | Tiền tệ tích lũy khi tu luyện đúng câu hỏi, dùng để mua sắm. |
| **Kỳ Ngộ Giang Hồ** | Random Event | `randomEvent` | Sự kiện ngẫu nhiên 5% xuất hiện để thưởng Chân Khí/Ngân Lượng hoặc thách đấu. |
| **Thoái ẩn** 🚪 | Logout | `onLogout` / `logout` | Hành động đăng xuất tài khoản giang hồ. |
| **Môn Chủ Hỏi Tội** ⚖️ | Skip Punishment Dialog | `skipPunishment` / `MonChuHoiToi` | Hộp thoại phạt và ghi nhận lý do khi Thiếu Hiệp bấm bỏ qua câu hỏi. |

