# Core Specification: GameEngG10 (Đấu Trường Tuyển Sinh 10)

Tài liệu đặc tả này định hình ý tưởng cốt lõi, kiến trúc chức năng, luồng vận hành kinh tế và tích hợp AI của ứng dụng **GameEngG10**. Mục tiêu là thiết lập một bộ khung định hướng nhất quán để tất cả các đợt phát triển tiếp theo bám sát, tránh việc bổ sung tính năng lan man làm loãng trải nghiệm học tập và sẵn sàng cho việc mở rộng quy mô.

---

## 1. Triết Lý Cốt Lõi & Tầm Nhìn Sản Phẩm

### 1.1 Sứ mệnh (Mission)
**GameEngG10** là nền tảng học tập trò chơi hóa (gamification) cho **toàn bộ giáo dục phổ thông** (trọng tâm cấp 2 và cấp 3), tổ chức thế giới giang hồ theo các **Tầng Thế Giới** tương ứng từng lớp học (xem §1.4). Hiện tại chỉ mới phát triển **Tầng Lớp 9**. Riêng 3 môn Toán, Ngữ Văn, Tiếng Anh của Tầng Lớp 9, kho kiến thức tập trung bám sát ôn luyện tuyển sinh vào lớp 10 (theo cấu trúc đề của Sở GD&ĐT TP.HCM). Nền tảng giải quyết bài toán:
*   **Học sinh:** Biến việc ôn luyện căng thẳng, khô khan thành các đợt chinh phục thử thách (chế độ chơi), tăng phản xạ tư duy và trực quan hóa kiến thức phức tạp (đồ thị, hình học).
*   **Hiệu Trưởng:** Đóng vai trò là nhà tài trợ, kiểm soát và khích lệ bằng cách liên kết kết quả học tập trong thế giới ảo với các phần thưởng thực tế ngoài đời thực.

### 1.2 Mô hình Phân Quyền Vai Trò & Đa Hồ Sơ (Multi-Profile)
Chi tiết về định nghĩa các Role (Học sinh, Chủ nhiệm Chính/Phụ, Hiệu Phó, Hiệu Trưởng), cơ chế Đa Hồ Sơ (Multi-Profile trên 1 Account Google) và kết nối thành Lớp Chủ Nhiệm, vui lòng xem tại **[SUB_SPEC_FAMILY_ROLE.md](./SUB_SPEC_FAMILY_ROLE.md)**.
Nguyên tắc cốt lõi: Một tài khoản Google có thể tạo nhiều hồ sơ biệt lập (Học Sinh hoặc Chủ Nhiệm). Tại một thời điểm chỉ đăng nhập vào một hồ sơ duy nhất. Khi chuyển đổi hồ sơ/vai trò, giao diện sẽ thay đổi hoàn toàn và danh tính tự động ẩn khỏi bảng xếp hạng nhóm không liên quan để tránh gian lận. Toàn bộ tiến trình cũ vẫn được bảo lưu độc lập.

---

### 1.3 Nguyên lý Môn Phái Độc Lập (Sect Isolation Principle)
Các môn học được tổ chức thành các **Môn Phái Độc Lập** hoàn toàn và được phân chia làm hai nhóm chính với bản đồ chức năng cụ thể:
*   **Nhóm Môn Phái Ôn Thi Lớp 10 Chuyên Sâu (Toán, Văn, Anh):** 
    Tập trung ôn tập quyết liệt bám sát cấu trúc đề tuyển sinh lớp 10 TP.HCM.
    *   *Đấu trường:* Gồm các chế độ Mixed/Skill Practicing, Sinh tồn (Survival), Quyết đấu Boss (Đề thi tuyển sinh các năm), và Revenge.
    *   *Hang luyện công:* Gồm các Chuyên đề Môn học (Tuyển sinh 10), Công cụ học tập phụ trợ (Học lý thuyết, Sổ tay, Nguồn), và Mật thất Biki (Toán).
    *   *Khu thư giãn:* Sử dụng một Minigame Khung chung (Generic Minigame Hub) với các câu hỏi tương tác cơ bản (Match Pairs, trắc nghiệm MCQ, điền từ), thay vì các minigame tương tác chuyên sâu riêng biệt.
*   **Nhóm Môn Phái Kiến Thức Lớp 9 Cơ Bản:** 
    Gồm các môn học: Khoa học tự nhiên, Lịch sử và Địa lý, Giáo dục công dân, Công nghệ, Tin học, Nghệ thuật (Âm nhạc, Mỹ thuật).
    *   *Đấu trường:* Gồm các chế độ Mixed/Skill Practicing, Quyết đấu Boss (Đề thi HK1, thi HK2), và Revenge (Không có Sinh tồn).
    *   *Hang luyện công:* Gồm các Chuyên đề Môn học (Lớp 9), Công cụ học tập phụ trợ (Học lý thuyết, Sổ tay, Nguồn), và Mật thất Biki tương tác (đang phát triển, hiện giữ chỗ bằng thẻ "sắp khai mở" — xem §2.2, chỉ Toán có đủ 3 mật thất).
    *   *Khu thư giãn:* Sử dụng Minigame Khung chung với các câu hỏi tương tác cơ bản (Match Pairs, MCQ, điền từ), không có minigame chuyên sâu riêng.
*   **Cô lập ngữ cảnh tuyệt đối (Absolute Context Isolation):** Ở cùng một thời điểm, học sinh chỉ thuộc về duy nhất một Môn phái đang hoạt động (Active Sect). Toàn bộ nội dung hiển thị trong ứng dụng (bao gồm: bản đồ game, bài tập đấu trường, bài học trong hang luyện công, vật phẩm trong shop...) sẽ tự động lọc và chỉ hiển thị thông tin của Môn phái đó. 
*   **Modal Chuyển Môn Phái Toàn Cục:** Để tạo sự linh hoạt, thao tác đổi môn phái được thực hiện thông qua một UI Modal dùng chung ở mọi nơi. Có thể gọi modal này từ TopHUD, trong trang Thân Phận, trên Navigation admin, hoặc tại Vùng Điều Hướng Trung Tâm (World Map Hub - nơi danh sách môn phái được hiển thị công khai để chọn nhanh). Đứng bất cứ đâu cũng có thể đổi môn phái dễ dàng.

---

### 1.4 Nguyên lý Tầng Thế Giới (Grade Tier Isolation)
Toàn bộ thế giới giang hồ được phân tầng theo **lớp học (grade)** — mỗi lớp là **một Tầng Thế Giới** độc lập:
*   **Một tầng = một lớp học:** Tầng Lớp 9 là tầng duy nhất đang vận hành. Các Tầng Lớp 10, 11, 12 (và các lớp cấp 2 còn lại) sẽ mở dần về sau, với cơ cấu môn phái điều chỉnh tương ứng từng tầng (chưa làm tới).
*   **Cô lập 100% theo tầng:** Khi môn sinh đứng ở một tầng, toàn bộ các trang (bản đồ, đấu trường, hang luyện công, minigame hub, bách hóa, cẩm nang, ngân hàng câu hỏi, sương mù khám phá, leaderboard...) chỉ hiển thị dữ liệu của tầng đó — **không dính líu gì đến tầng khác**. Cô lập Tầng đứng **trên** cô lập Môn Phái (§1.3): thứ tự lọc ngữ cảnh là *Tầng → Môn Phái → Nội dung*.
*   **Chuyển tầng duy nhất tại Thân Phận:** Thiếu hiệp chỉ có thể **nâng/hạ tầng** của mình trong trang Thân Phận (khác với đổi Môn Phái vốn có modal toàn cục §1.3). Tiến trình của mỗi tầng được bảo lưu riêng khi rời tầng và khôi phục khi quay lại.
*   **Cơ cấu Tầng Lớp 9:** giữ nguyên 9 môn phái — 3 môn **Yêu Cầu Cao** (Toán, Văn, Anh — bám tuyển sinh 10) + 6 môn **Yêu Cầu Cơ Bản** (§1.3).

## 2. Kiến Trúc Mô-đun & Bản Đồ Học Tập (World Map)

Hệ thống được thiết kế phân tách rõ ràng thành hai môi trường hoạt động độc lập với các mô-đun chức năng cụ thể:

### 2.1 Môi trường Môn Sinh (Học sinh)

Môi trường dành cho học sinh tập trung vào trải nghiệm tu luyện, học tập và rèn luyện kỹ năng thông qua bản đồ game worldmap (`WorldMap`) — hub trung tâm dẫn vào 5 module chính bên dưới:

#### A. Năm Module Chính

##### 1. 🏛️ Đấu Trường (Arena / Play Area)
Nơi kiểm tra năng lực và rèn luyện phản xạ thi cử dưới các chế độ chơi áp lực cao:
*   **Mixed/Skill Practicing:** Luyện ngẫu nhiên theo mảng kiến thức (Grammar, Vocab, Reading, Pronunciation).
*   **Sinh tồn (Survival):** Giới hạn **3 lần sai trong một lượt chơi** (bộ đếm lỗi nội bộ của lượt — hệ thống Tim sinh mệnh/vật phẩm hồi tim đã bị **xóa bỏ hoàn toàn** khỏi app). Sai đủ 3 câu là kết thúc đợt luyện.
*   **Quyết đấu Boss (Boss Battle):** Đấu trường thi thử theo thời gian thực (20 phút). Đề Boss được **trích chọn từ đề thi thật** các năm (2024, 2025, 2026): mỗi đề thật số hóa được ~20 câu, mỗi lượt Boss chỉ rút **5 câu** (~1/5 đề). Phần thưởng quy hết về **Điểm**: điểm trên từng câu đúng + một khoản **bonus hoàn thành lớn** được quảng bá ngay trên Boss Card, mức bonus do **Chủ Viện / Hiệu Phó** quy định. Boss **không thưởng tiền** dưới bất kỳ hình thức nào.
*   **Truy tìm lỗi sai (Revenge):** Chế độ ôn tập riêng các câu trả lời sai trong lịch sử để khắc phục lỗ hổng kiến thức.
*   **Quy tắc Khấu trừ Chân Khí (Energy Upfront Deduction):** Chân khí được khấu trừ một lần duy nhất ngay khi môn sinh xác nhận bắt đầu trận đấu. Khi đã vào trận (đặc biệt là bài thi Boss 20 phút), môn sinh được tu học liên tục cho đến hết mà không bị dừng đột ngột kể cả khi chân khí cạn kiệt giữa chừng.

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

##### 3. 🦄 Sàn Game Thư Giãn (Minigame Hub)
Được cấu trúc như một **Sàn ứng dụng (Platform/Hub)**. Các mô-đun tương tác học tập nhẹ nhàng sẽ được plug vào đây dưới dạng các Mini-app độc lập. Xem cấu trúc kỹ thuật tại **[SUB_SPEC_MINIGAME_HUB.md](./SUB_SPEC_MINIGAME_HUB.md)**.
Các Mini-app đang có ở MVP:
*   *Thẻ nhớ tốc hành (SRS Flashcards):* Ôn tập nhanh khái niệm, công thức theo phương pháp lặp lại ngắt quãng.
*   *Ghép cặp (Match Pairs):* Ghép các thẻ liên quan (từ–nghĩa, công thức–tên gọi, tác giả–tác phẩm) tính giờ hoặc so điểm.
*   *Sắp xếp các bước (Step Builder):* Sắp xếp các bước giải toán, các ý trong bài văn hoặc cấu trúc câu tiếng Anh theo đúng trình tự.
*   *(Ghi chú: Việc phát triển thêm các game mới sẽ tuân thủ giao thức của Sàn, không làm phình to core logic của hệ thống)*

##### 3B. 📜 Bảng Cáo Thị (Parent Quests)
Xuất hiện tại Vùng Điều Hướng Trung Tâm (World Map Hub). Đây là nơi hiển thị các **Nhiệm vụ do Chủ nhiệm giao**.
- Chủ nhiệm có thể tạo nhiệm vụ dựa trên tài nguyên có sẵn (Ví dụ: "Làm xong 5 bài Toán", "Đạt 100 điểm Tiếng Anh").
- Khi học sinh hoàn thành, sẽ nhận được phần thưởng NP lớn (hoặc quà thực tế) do chủ nhiệm thiết lập.

##### 4. 🏮 Bách Hóa Phường (Item Shop)
Vận hành nền kinh tế vi mô trong học viện. Tiêu hao **Ngân lượng (NP)** để đổi các vật phẩm và đặc quyền:
*   📜 **Khai Ngộ Quyển:** Gợi mở hướng giải hoặc loại bỏ đáp án nhiễu (trước đây gọi là Gợi ý / Hint).
*   🛡️ **Hộ Tâm Phù:** Duy trì chuỗi tu luyện (Streak) khi bỏ lỡ một ngày, tránh bị reset chuỗi (trước đây gọi là Khiên giữ chuỗi / Streak Shield).
*   🎭 **Phong Vị:** Mở khóa các phong cách giao diện cá tính như Đào Hoa, Trúc Lâm, Tinh Không, Tuyết Sơn... để môn sinh cá nhân hóa không gian học tập.
*   🎁 **Phúc Lợi Lớp Học:** Đổi Ngân lượng lấy các Phần Thưởng Thực Tế do chủ nhiệm tạo, có số lượng giới hạn — cơ chế chi tiết xem §3.2.
*   ~~❤️ Hồi Nguyên Đan~~ — **đã xóa bỏ** cùng toàn bộ hệ thống Tim sinh mệnh (xem §2.1 Sinh tồn).

##### 5. 🐷 Sân Nuôi Thú (Pet Sanctuary - Heo Maikawaii)
Đại diện trực quan cho tiến trình học tập của học sinh:
*   **Linh vật dẫn dắt duy nhất của game:** Heo Maikawaii là linh vật của toàn bộ ứng dụng — mọi việc đồng hành bên cạnh học sinh (chào hỏi, gác cổng đăng nhập/đăng xuất, gác cổng sương mù, nhắc học, đòi ăn, thông báo hết Chân Khí, khen thưởng) đều do **một mình heo** đảm nhiệm. Không thêm bất kỳ nhân vật đồng hành nào khác.
*   Thú cưng dã thú (**Heo Maikawaii**) phát triển qua 4 giai đoạn tiến hóa đặc trưng (Evolution):
    *   **Đám Mây & Nấm Sơ Sinh (Egg):** Sinh ra từ một đám mây bông, mưa rơi xuống mặt đất nhiều lá khô mọc thành mầm nấm múp míp xinh đẹp.
    *   **Heo Con Mũm Mĩm (Baby):** Cây nấm nứt vỡ ra chú heo con mũm mĩm, hồng hào, cực kỳ đáng yêu.
    *   **Heo Hiệp Sĩ Trưởng Thành (Adult):** Heo con khôn lớn, mang phong thái võ hiệp với khăn trán hoặc nón lá và đeo kiếm gỗ sau lưng.
    *   **Thần Heo Maikawaii (Legend):** Thần thú tối thượng mũm mĩm siêu cấp, đeo vòng kim cô vàng lấp lánh và cưỡi mây Cân Đẩu Vân.
*   **Cơ chế tương tác thông minh:**
    *   *Thọt lét (Tickle):* Khi click thọt lét chú heo, heo sẽ nhảy dựng lên vui sướng và nói các câu thoại ngộ nghĩnh, linh tinh khó hiểu.
    *   *Nhắc nhở bài vở (Study Reminder):* Nhắc môn sinh môn học hôm nay nên ôn luyện dựa trên năng lượng/tiến trình.
    *   *Khen thưởng (Praise):* Nhận biết điểm số, số câu đúng và Ngân lượng nhận được trong ngày của học sinh để đưa ra những lời khen ngợi ngọt ngào.
*   Học sinh cho thú ăn để duy trì tâm trạng vui vẻ và tăng cấp cho thú. Việc cho thú ăn **chỉ tiêu tốn Ngân Lượng (NP)** — tuyệt đối **không trừ XP** (tuân thủ Luật Bất Cảm §3.1; NP được phép âm, xem SUB_SPEC_XP_NP).
*   **Album Kỷ Niệm (Pet Memory Album):**
    *   *Xem lại hành trình:* Tích hợp tính năng album kỷ niệm cho phép môn sinh lật xem lại hành trình của Heo Maikawaii qua các nút bấm Next/Prev. Album chứa các hình ảnh từ thuở sơ khai qua từng giai đoạn phát triển, các câu chuyện kỷ niệm đáng nhớ và những bức hình chụp chung kỷ niệm giữa môn sinh và thú cưng.
    *   *Ẩn giấu tương lai:* Thiếu hiệp không thể xem trước hình ảnh ở các giai đoạn tương lai chưa đạt tới. Chỉ khi kiên trì chăm sóc, nâng cấp và phát triển Heo Maikawaii thành công, album mới mở khóa thêm nhiều hình ảnh và nội dung mới.
    *   *Hoàn thiện giao diện:* Phần giao diện (UI) của Album Kỷ Niệm sẽ được ClaudeCode tiến hành review, audit kỹ lưỡng và phát triển tiếp tục để tối ưu hóa trải nghiệm trực quan.
*   **Cơ Chế "Thú Về Chuồng" (Pet Stable & Overlay)**:
    *   **Nguyên tắc cốt lõi:** Heo Maikawaii KHÔNG chiếm không gian layout thường trực (hiện tại là cột trái cố định trên desktop, `aside w-72`). Bình thường heo ở trong **Chuồng Heo** — một nút/avatar nhỏ núp gọn ở một góc màn hình (ví dụ góc dưới-phải, kiểu "chat bubble" các web hiện đại). Toàn bộ không gian trung tâm được trả lại cho nội dung học tập.
    *   **Heo là "Người Gác Cổng" duy nhất — hợp nhất với Cẩm Nang Bí Lục (§2.7):** Đăng nhập/Đăng xuất không còn là 2 lớp popup tách rời (trang Cẩm Nang riêng rồi tới Heo chào riêng) như trước. Heo trực tiếp mang trang Cẩm Nang ngẫu nhiên (tiêu đề + nội dung) ra trình bày ngay trong overlay của chính mình — chỉ còn **một lớp popup duy nhất** tại các mốc đăng nhập/đăng xuất.
    *   **Các thời điểm heo xuất hiện** (dưới dạng **overlay đè lên layout hiện tại**, nền phía sau làm mờ nhẹ để tập trung vào heo):
        1.  *Gác Cổng lúc đăng nhập (Login Gate):* Ngay khi đăng nhập, Heo xuất hiện mang theo một trang Cẩm Nang ngẫu nhiên để chào và dặn dò một lần. Sau đó heo về chuồng, chỉ ra tiếp khi được gọi hoặc khi có lý do dưới đây.
        2.  *Gác Cổng lúc đăng xuất (Logout Gate — "Rời Học Viện"):* Khi môn sinh bấm **Rời Học Viện** (Đăng xuất), Heo xuất hiện mang theo một trang Cẩm Nang khác để dặn dò trước khi rời giang hồ. Để tránh giữ chân cưỡng ép (dark pattern), Môn Sinh hoặc Chủ nhiệm có thể bấm nút "Rời học viện ngay" để hoàn tất đăng xuất ngay lập tức mà không bắt buộc phải thực hiện thọt lét/tương tác thú cưng.
        3.  *Triệu hồi thủ công:* Thiếu hiệp bấm vào Chuồng Heo bất cứ lúc nào để chủ động gọi heo ra.
        4.  *Nhắc học (Idle Reminder):* Quá lâu không có tương tác nào trong app (ngưỡng mặc định 10 phút không thao tác), heo tự ra nhắc nhở học tiếp.
        5.  *Đòi ăn (Hunger):* Khi quá lâu chưa được cho ăn (dựa trên field `lastFed` sẵn có), heo tự ra đòi ăn.
        6.  *Báo hết Chân Khí (Energy Depleted):* Khi Chân Khí của môn sinh về 0, heo xuất hiện thông báo đã hết năng lượng, phải nghỉ ngơi, kèm thời điểm hồi lại — chi tiết luật hồi xem **[SUB_SPEC_ENERGY.md](./SUB_SPEC_ENERGY.md)**.
    *   **Cách duy nhất cất heo về chuồng — áp dụng đồng bộ cho MỌI trigger, kể cả Gác Cổng:** overlay **KHÔNG có nút đóng (X)** và **KHÔNG có nút xác nhận riêng kiểu "Đã Lĩnh Ngộ"**. Thiếu hiệp bắt buộc phải *cho ăn*, *tương tác* (vuốt ve/khen) hoặc *thọt lét (Tickle)* thì heo mới chịu về chuồng — kể cả lúc đăng nhập/đăng xuất. Thọt lét là lối thoát miễn phí không tốn tài nguyên; cho ăn vẫn tốn NP theo đúng quy tắc hiện hành ở mục trên (không trừ XP).
    *   **Chống dồn dập (anti-spam):** Các trigger tự động (idle/đói/hết chân khí) dùng chung một cooldown tối thiểu **30 phút** giữa các lần bật overlay tự động — heo chỉ được tự xuất hiện tối đa 1 lần mỗi 30 phút **bất kể lý do gì** (nâng từ 10 phút lên 30 phút theo yêu cầu Hiệu Trưởng 2026-07-10). Cooldown persist qua localStorage để reload trang không lách được. Dismiss vì lý do này không cho phép lý do khác bật lại overlay ngay sau đó.
    *   **Kỷ luật thi cử — không phá bĩnh giữa trận:** Khi môn sinh đang trong trận đấu (Đấu Trường / Boss / đang làm bài luyện tập), mọi trigger tự động (idle/đói/hết chân khí) bị **hoãn lại**, dồn tích và chỉ hiện ra ngay khi môn sinh thoát về Sơn Trang/Bản Đồ. Trigger triệu hồi thủ công vẫn bị khóa trong lúc làm bài như hiện tại.
    *   **Chuồng Heo vẫn là cổng vào Sân Nuôi Thú đầy đủ:** Từ overlay hoặc nút Chuồng Heo đều mở được toàn bộ Sân Nuôi Thú (Album Kỷ Niệm, cho ăn chủ động, xem tiến hóa) — không mất tính năng nào, chỉ đổi cách hiển thị từ "luôn nằm sẵn trên layout" sang "gọi ra khi cần".
    *   **Hệ quả layout (re-layout diện rộng):** Mọi trang trước đây phải chừa `aside w-72` cho thú (Sơn Trang/Bản Đồ, và gián tiếp ảnh hưởng độ rộng khả dụng của Bách Hóa, Hang Luyện Công, Lầu Thư Giãn khi xem trên cùng khung `main` chung) được thiết kế lại để card, box, công cụ rộng rãi hơn, hiển thị nhiều thông tin hơn trên cùng một màn hình — xem chi tiết Mục 5.

#### B. Một Module Phụ

##### 1. 👑 Thân Phận (Profile Page)
Hồ sơ cá nhân của môn sinh — nơi tra cứu tiến trình tu luyện:
*   **Modal Switch Môn Phái:** Gọi Modal chọn Môn phái đang hoạt động (Active Sect). Sau khi chọn, toàn bộ nội dung (bản đồ, đấu trường, hang luyện công...) tự động lọc lại theo môn phái vừa chọn.
*   **Đẳng Cấp Môn Phái (Sect Mastery):** Hiển thị đẳng cấp tu luyện độc lập theo từng môn phái (Nhập Môn → Xuất Chúng), Nội Công rèn luyện (tổng câu trả lời đúng) và Thời Gian rèn luyện ước lượng — công thức chi tiết xem §7.4.
*   **Danh hiệu & tiến trình chung:** Danh hiệu kiếm hiệp (Tân Đệ Tử, Đệ Tử, Môn Sinh...) ánh xạ từ Level (§7.2), badges và lịch sử truyền công.
*   **Cổng hành động chuyển màn nhanh (Exit Gates):** 2 nút ở chân trang — 🚪 *Bôn Tẩu Giang Hồ* (về Bản Đồ) và ⚔️ *Vào Hang Luyện Công* (đi thẳng vào luyện tập theo môn phái vừa chọn).
*   **Cẩm Nang Bí Lục:** Lối vào để lật xem toàn bộ cuốn cẩm nang bất kỳ lúc nào (xem §2.7).

### 2.6 ⚙️ Bảng Quản Trị Hiệu Trưởng (Admin Console)
Hệ thống quản lý, giám sát và cung cấp tài nguyên, được phân chia thành các khu vực chuyên biệt:
*   🏛️ **Chính Điện:** Trung tâm quyền lực và phân quyền. Quản lý tài khoản môn sinh, thăng cấp/hạ cấp vai trò. Đây là nơi quản lý học sinh ở quy mô toàn viện (không chia theo môn phái).
*   📖 **Thiên Cơ Các:** Nơi lưu trữ thông tin, báo cáo, cơ mật của toàn viện. Dashboard tổng quan thống kê kết quả học tập của môn sinh, số lượng câu hỏi, bài học và hiệu quả tu học chung của toàn bộ môn phái.
*   📚 **Vạn Quyển Các:** Kho tri thức và quản lý đề thi (CRUD, nạp đề thi bằng AI). Hiệu Trưởng bắt buộc phải chọn ngữ cảnh môn phái cụ thể tại mỗi thời điểm quản lý.
*   👑 **Thân Phận:** Hồ sơ cá nhân của môn sinh (profile), hiển thị danh hiệu kiếm hiệp (Tân Đệ Tử, Đệ Tử, Môn Sinh...), cấp độ tu học, badges và lịch sử truyền công.
*   💰 **Ngân Các:** Quản lý kho tài nguyên, quản lý danh mục **Phần Thưởng Thực Tế** (tạo/sửa số lượng, xác nhận "Đã Trao" — §3.2), cấu hình Chân Khí của từng con (`maxEnergy`, `resetHours` — SUB_SPEC_ENERGY), định mức NP/XP thưởng và bonus Boss Card.

### 2.7 📖 Cẩm Nang Bí Lục (Giang Hồ Cẩm Nang)
Sổ tay quy tắc, kinh nghiệm tu hành của học viện được biên soạn dưới dạng sách cổ bí kíp:
*   **Cơ cấu nội dung:** Nội dung sách được chia nhỏ thành nhiều trang ngắn gọn (mỗi trang chỉ chứa tối đa 2 câu).
*   **Quản lý bởi Linh Vật (Heo Maikawaii):** Cẩm nang do heo quản lý và mang ra thông báo — không có modal sách độc lập ở các mốc login/logout.
*   **Điểm chạm tương tác:**
    *   *Gác Cổng qua Heo (Login/Logout) — xem §2.5 "Thú Về Chuồng":* Trang cẩm nang không tự hiện bằng modal sách riêng kèm nút "Đã Lĩnh Ngộ" nữa. Heo mang **1 trang ngẫu nhiên** ra trình bày ngay trong overlay của chính heo khi **đăng nhập** và khi bấm **Rời Học Viện** (đăng xuất). Cách duy nhất đóng overlay (và hoàn tất đăng xuất nếu là mốc logout) là cho ăn / tương tác / thọt lét heo — không còn nút xác nhận đọc riêng.
    *   *Phúc lợi đọc trang (đề xuất):* Lần cất heo về chuồng đầu tiên trong ngày tại Login Gate tặng **+5 NP** (kế thừa phần thưởng của nút "Đã Lĩnh Ngộ" cũ, 1 lần/ngày).
    *   *Tra cứu chủ động:* Thiếu hiệp có thể mở toàn bộ cuốn cẩm nang (giao diện sách đầy đủ, lật từng trang) trong trang Thân Phận để xem lại bất cứ lúc nào — trải nghiệm này giữ nguyên.
*   **Quyền quản trị của Hiệu Trưởng:** Hiệu Trưởng có thể nạp thêm các trang dặn dò (Quy định riêng của gia đình, nhắc nhở ôn bài, lịch học thực tế) vào cuốn cẩm nang. Các trang mới này tự động được đưa vào vòng random mà heo mang ra tại các mốc Gác Cổng.

### 2.9 Quy Tắc Thiết Kế UI Popup & Cảnh Báo (Minimalism) *(đánh số 2.9 để tránh trùng §2.8 Map Hierarchy bên dưới)*
- **Tuyệt đối Đơn Giản (Minimalist Popups):** Mọi popup cảnh báo/thông báo trong ứng dụng chỉ được phép gồm **1 Icon phân loại** (dấu chấm than, hộp quà, mặt buồn...) và **1 câu thông báo trọng tâm**. Lược bỏ hoàn toàn các title, label rườm rà.
- **Cảnh báo thoát giữa chừng:** Khi môn sinh đang làm dở bài và bấm thoát ra Bản Đồ, một popup đơn giản sẽ hiện lên nhắc nhở: *"Nếu con không hoàn tất, vài hôm nữa khu vực này sẽ bị sương mù che phủ lại đấy!"*. Tùy chọn: Ở lại làm tiếp hoặc Vẫn Thoát.
- **Đây chỉ là một phần của bộ quy tắc UI bắt buộc.** Toàn bộ nguyên tắc UI luôn phải tuân theo (theme token, style Fog Card, minimalism popup, linh vật duy nhất...) được tổng hợp tại **[SUB_SPEC_UI_RULES.md](./SUB_SPEC_UI_RULES.md)**.

## 2.8 Kiến Trúc Phân Cấp "Page 3 Tầng" cho Bản Đồ Khám Phá (Map Page Hierarchy) — *(TODO: đang phân tích, chưa triển khai)*

Toàn bộ không gian điều hướng của Môn Sinh sẽ được mô hình hóa lại thành một cây **Page 3 tầng** (Cấp 1 → Cấp 2 → Cấp 3) thay vì các "màn hình" rời rạc như hiện tại. Mỗi Page (từ Cấp 2 trở xuống) là một điểm có thể **khám phá (explore)** và ghi lại dấu vết tu luyện riêng theo từng môn sinh, phục vụ nhiều mục đích game hóa (gợi ý ôn tập, thành tựu khám phá bản đồ, heatmap cho Hiệu Trưởng...).

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
| 🕳️ **Hang Luyện Công** | ✅ Bottom Nav | ✅ Đã có Desktop Central Nav | Mật Thất, Hầm, Rương — xem §2.8.3 |
| 🦄 **Sơn Trang Thư Giãn** | ✅ Bottom Nav | ✅ Đã có Desktop Central Nav | 3 Cảnh (Hoa Viên/Núi Rừng/Thác Hồ) — xem §2.8.3 |
| ⚔️ **Đấu Trường** | ✅ Bottom Nav | ✅ Đã có Desktop Central Nav | *(chưa định nghĩa — TODO)* |
| 🏮 **Bách Hóa Phường** | ✅ Bottom Nav | ✅ Đã có Desktop Central Nav | *(chưa định nghĩa — TODO)* |
| 🐷 **Sân Thú Nuôi** | ✅ Bottom Nav | ✅ Đã có Desktop Central Nav | *(chưa định nghĩa — TODO)* |

> ⚠️ *Điểm cần xác nhận lại:* yêu cầu gốc nói vùng trung tâm của WorldMap có "4 component link qua 4 trang còn lại", nhưng theo cấu trúc 5 module đã triển khai thực tế (§2.1) và đúng như Bottom Nav mobile hiện có, WorldMap có 5 cổng (Đấu Trường/Hang/Sơn Trang/Bách Hóa/Sân Thú Nuôi). Tạm ghi nhận theo đúng thực tế code (5 cổng) — nếu ý user là con số 4 có chủ đích khác thì cần nói rõ ở đợt sau.

### 2.8.3 Cấp 2 — Page con nội dung thật sự theo từng Page Cấp 1

#### Hang Luyện Công → 3 loại Page con

| Loại | Ý nghĩa | Thành phần hiện tại map vào |
| :--- | :--- | :--- |
| 🔮 **Mật Thất** | Buồng bí mật, mô-đun tương tác sâu | Mật Thất Biki (Biki3DStudio, BikiHinhHocPhang, BikiDoThiHamSo — hiện chỉ đủ 3 mật thất cho Toán, xem §2.1/§1.3) |
| 🕳️ **Hầm** (Hỏa Hầm / Băng Hầm / Thạch Hầm) | Không gian luyện tập theo Chuyên đề | "Hầm Ngục Chuyên Đề" hiện có (accordion theo Chuyên đề Môn học) — mỗi Chuyên đề được gán vào 1 trong 3 hầm nguyên tố |
| 🎁 **Rương** | Vật phẩm/công cụ phụ trợ ẩn bên trong Hầm | 3 Công cụ học tập phụ trợ hiện tại (Học lý thuyết / Sổ tay / Nguồn tài liệu) — tái định vị thành "rương" mở ra bên trong mỗi Hầm thay vì hiển thị ngang hàng như tab riêng |

> 📌 **Quy Tắc Gán Hầm Nguyên Tố:**
> Việc gán Chuyên đề vào Hầm dựa trên **bản chất kỹ năng**:
> *   🔥 **Hỏa Hầm:** Dành cho kỹ năng *phản xạ nhanh, ghi nhớ ngắn hạn* (Từ vựng, Phát âm, Rút gọn biểu thức).
> *   ❄️ **Băng Hầm:** Dành cho kỹ năng *suy luận logic sâu, điềm tĩnh* (Đọc hiểu, Hình học không gian, Hệ phương trình).
> *   🪨 **Thạch Hầm:** Dành cho kiến thức *nền tảng cốt lõi, quy tắc cứng* (Ngữ pháp cơ bản, Hệ thức Vi-ét).

#### Sơn Trang Thư Giãn → 3 Cảnh
3 Cảnh ở đây **thuần túy trực quan/trang trí**, không phân biệt chức năng — toàn bộ 9 mini-game hiện có (Thẻ Nhớ, Ghép Cặp, Sơ Đồ Ôn Tập, Tình Huống RPG, Du Khảo Kỳ Thú, Trình Tự Giải, Đọc Hiểu Sâu, Giảng Cho AI, Ghép Sơ Đồ) về bản chất đều là "khu vui chơi trí tuệ" như nhau, chỉ đổi giao diện/khung cảnh bao quanh:

| Cảnh | Mini-game đề xuất gán vào (minh họa, chưa cố định) |
| :--- | :--- |
| 🌸 **Cảnh Hoa Viên** | Thẻ Nhớ, Ghép Cặp, Sơ Đồ Ôn Tập |
| 🏔️ **Cảnh Núi Rừng** | Du Khảo Kỳ Thú, Trình Tự Giải, Đọc Hiểu Sâu |
| 🌊 **Cảnh Thác Hồ** | Tình Huống RPG, Giảng Cho AI, Ghép Sơ Đồ |

#### Đấu Trường, Bách Hóa Phường, Sân Thú Nuôi, WorldMap
Các khu vực này cũng được hệ thống hóa thành Page Cấp 2 và Cấp 3:

| Page Cấp 1 | Page Cấp 2 (Khu vực/Phân loại) | Page Cấp 3 (Điểm chạm cụ thể - Page Lá) |
| :--- | :--- | :--- |
| 🗺️ **WorldMap** | 📜 Bảng Cáo Thị (Daily Quest) <br> 🏛️ Tàng Kinh Các Phân Đà (AI Sư Phụ) | Các nhiệm vụ ngày cụ thể. <br> Bài học được AI đề xuất riêng biệt. |
| ⚔️ **Đấu Trường** | 🏅 Đấu Trường Xếp Hạng (Ranked) <br> 🐲 Lôi Đài Thần Thú (Boss Raid) <br> 🛡️ Vực Sinh Tồn (Survival) | Đỉnh Ngữ Pháp, Tháp Từ Vựng... <br> Từng con Boss cụ thể. <br> Từng mốc Tầng sinh tồn (Tầng 1, Tầng 2). |
| 🏮 **Bách Hóa Phường** | 💊 Quầy Linh Đan & Bùa Chú <br> 👘 Tiệm Y Phục (Themes) <br> 🎁 Quầy Phúc Lợi Lớp Học | Khai Ngộ Quyển, Hộ Tâm Phù... <br> Đào Hoa, Tinh Không, Trúc Lâm... <br> Từng Phần Thưởng Thực Tế do chủ nhiệm tạo (§3.2). |
| 🐷 **Sân Thú Nuôi** | 🏡 Chuồng Chăm Sóc (Stable) <br> 📸 Tàng Thư Kỷ Niệm (Album) | Khu Cho Ăn, Khu Vui Đùa. <br> Từng giai đoạn tiến hóa (Sơ Sinh...). |

### 2.8.4 Cấp 3 — Page lá
Như định nghĩa trong bảng trên, Page Cấp 3 là các điểm chạm sâu nhất (ví dụ: một Mật Thất cụ thể, một môn Boss, một item cụ thể trong shop). Mỗi điểm này đều có `id` riêng và có thể được ghi nhận dấu vết khám phá.

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

**Mục đích sử dụng dữ liệu** (định hướng, chưa triển khai): AI Sư Phụ gợi ý ôn lại vùng có `lastExploredAt` cũ nhất; thành tựu "đã khám phá X% Hang Luyện Công"; Hiệu Trưởng xem heatmap con học nhiều/ít ở đâu; sự kiện Kỳ Ngộ Giang Hồ (§3.C) ưu tiên xuất hiện ở vùng ít được khám phá.

### 2.8.6 Việc cần chốt tiếp (chưa làm ngay)
1.  Xác nhận số lượng cổng ở vùng điều hướng trung tâm của WorldMap (5 theo code thực tế/Bottom Nav mobile hay 4 theo ý user — xem ghi chú ở §2.8.2).
2.  *(Đã xong)* Bổ sung Vùng Điều Hướng Trung Tâm trên **desktop**.
3.  *(Đã xong)* Định nghĩa Page con Cấp 2 cho Đấu Trường, Bách Hóa Phường, Sân Thú Nuôi.
4.  *(Đã xong)* Định nghĩa Page Cấp 3 cho từng nhánh.
5.  *(Đã xong)* Quy tắc gán cố định Chuyên đề → Hầm nguyên tố (Hỏa/Băng/Thạch).
6.  *(Đã xong)* Đặt tên/phân loại chính thức cho Daily Quest Banner + AI Sư Phụ banner.
7.  *(Đã xong)* Thiết kế bảng dữ liệu cho `MapPage` và `PageExplorationState`.

### 2.8.7 Cơ chế "Sương mù Chiến tranh" (Fog of War) và Người Gác Cổng
Áp dụng cho toàn bộ các Page Cấp 2 (Mật Thất, Hầm, Khu Vực):
- **Trạng thái Mờ (Shadowed):** Mặc định, mọi khu vực chưa khám phá đều bị che mờ bởi sương mù.
- **Trạng thái Tạm thời & Pet Gác Cổng:** Khi bấm vào khu vực mờ sương, **Thú cưng (Heo Maikawaii) sẽ xuất hiện làm Người Gác Cổng** và hỏi một câu kiến thức cốt lõi. Câu hỏi **bắt buộc là Trắc nghiệm (MCQ)** với độ khó chuẩn hóa **2/5**; nội dung là các công thức, định nghĩa, định luật — core knowledge của đúng **Tầng lớp học** (§1.4) và **Môn phái** tương ứng; không yêu cầu tính toán dài hay gõ chữ. 
  - Nếu trả lời đúng: Tặng NP nhỏ, sương mù tan tạm thời và con có thể vào học. Trước khi vào, Heo **luôn hiển thị lời giải thích ngắn gọn vì sao đáp án đó đúng** (dùng `Question.explanation`) — con phải đọc và tự bấm "Tiến vào ngay" mới đóng cổng, không tự động đóng.
  - Nếu trả lời sai: Bị trừ lượng nhỏ NP, chỉ báo "sai" và **giữ nguyên câu hỏi đó** để con làm lại — **không đổi sang câu khác**, không tự động chuyển. Con được thử lại không giới hạn số lần cho tới khi trả lời đúng chính câu đó. Quá trình mở khóa chỉ tốn vài cú click và một chút trí nhớ.
- **Tính toán suy giảm (Decay):** Nếu con không tiếp tục luyện tập hoặc đã lâu không quay lại (quá thời hạn `decayDays`), sương mù sẽ dần bao phủ trở lại trên bản đồ học tập (yêu cầu con làm bài Review để xóa mù sương). Tuy nhiên, **Đẳng cấp Môn phái và Huy hiệu Tinh Thông đã đạt được thì không bao giờ bị giảm hoặc hạ cấp** (Bảo toàn Luật Bất Thoái).
- **Trạng thái Vĩnh viễn (Permanent):** Mở khóa vĩnh viễn sương mù yêu cầu hoàn thành khu vực đó nhiều lần:
  - Bài học/Thử thách mức độ **Dễ**: Cần **2 lần hoàn thành**.
  - Bài học/Thử thách mức độ **Khó**: Cần **3 lần hoàn thành**.
  - *(Ghi chú: Việc định nghĩa thế nào là "Hoàn thành" - ví dụ thời gian, số câu đúng... sẽ được mô tả chi tiết tại từng loại trang cấp 3)*.
- **Style bắt buộc của lớp phủ mờ sương:** xem quy tắc chi tiết (màu sắc, animation, text theo ngữ cảnh) tại **[SUB_SPEC_UI_RULES.md §2](./SUB_SPEC_UI_RULES.md#2-quy-tắc-trạng-thái-khóa--mờ-sương-fog-card)**.

---

## 3. Cơ Chế Gamification & Luồng Kinh Tế Trực Quan

Ứng dụng vận hành trên các vòng lặp động lực chính:
*   **Học tập:** Giải bài tập / Vượt ải -> Nhận XP & Điểm (NP) -> Chăm sóc Pet & Mua vật phẩm.
*   **Luyện tập:** Giữ chuỗi luyện công liên tục -> Thưởng điểm leo thang theo ngày (mất chuỗi chỉ reset, không phạt).
*   **Đổi quà:** Dùng Điểm (NP) đổi Phần Thưởng Thực Tế có số lượng giới hạn -> Chủ nhiệm xác nhận "Đã Trao" -> Nhận quà ngoài đời (§3.2).

### 3.1 Quy Tắc Thưởng Phạt Võ Học (Gamification Rules)

Chi tiết về mọi tình huống nhận thưởng (XP/NP) và bị trừ (NP) được đặc tả tại: **[SUB_SPEC_XP_NP.md](./SUB_SPEC_XP_NP.md)**.
Những thay đổi cốt lõi cần lưu ý:
1. **Luật Bất Cảm (XP):** Điểm Kinh Nghiệm (XP) chỉ có thể **Tăng**, không bao giờ bị giảm. Nuôi Pet hay sai bài không làm tụt cấp.
2. **Luật Ngân Lượng (NP):** Mọi khoản phí, phạt (mua đồ, nuôi Pet, trả lời sai cổng sương mù, skip câu hỏi) đều trừ vào NP. **NP được phép âm vô hạn nhưng CHỈ do các khoản trừ bắt buộc từ hệ thống** (skip câu hỏi, trả lời sai cổng sương mù, pet đói bị trừ theo ngày...). Các hành động **do chủ ý của môn sinh** (mua sắm Bách Hóa, cho pet ăn, mua Phong Vị, đổi Phần Thưởng Thực Tế...) vẫn yêu cầu **đủ NP** mới thực hiện được — không cho tiêu âm. Số dư âm là khoản nợ điểm để môn sinh cày lại.
3. **Luật Chuỗi Tinh Tấn (Streak):** Mất chuỗi **KHÔNG bị trừ NP**. Thay vào đó, chuỗi càng dài thưởng càng leo thang: giữ chuỗi sang ngày thứ 2 được cộng điểm, ngày thứ 3 cộng thêm, ngày thứ 4 trở đi cộng thêm nữa (bảng số cụ thể tại SUB_SPEC_XP_NP §2.1). Mất chuỗi chỉ đơn giản reset thưởng về mốc ngày 1. Hộ Tâm Phù vẫn dùng để bảo toàn chuỗi khi lỡ 1 ngày.

#### Cơ Chế "Môn Chủ Hỏi Tội" (Bỏ Qua Thử Thách)
- Môn Sinh được quyền Bỏ qua (Skip) câu hỏi khó. **Không giới hạn số lần Skip trong ngày**.
- Tuy nhiên, mỗi lần Skip sẽ bị **trừ một lượng nhỏ Ngân lượng (NP)**.
- **Vấn Tội trước khi Bỏ qua:** Khi bấm "Bỏ qua câu này", một popup cảnh báo (đúng luật Minimalism) sẽ hiện ra báo rằng Môn Sinh sẽ bị trừ NP. Bắt buộc chọn 1 lý do: 🥵 Quá khó, 📜 Quá dài, 🤪 Lỗi đề.
- Lý do này được ghi nhận lại để Hiệu Trưởng xem xét điều chỉnh chất lượng Câu hỏi trong ngân hàng.

### 3.2 Phần Thưởng Thực Tế (Reward Catalog) — thay thế hoàn toàn Ví VND

> ❌ **Bãi bỏ:** quy tắc tỷ giá "100 NP = 10.000đ", Ví VND, thưởng tiền mặt từ Boss. Lý do: dễ gây lạm phát điểm và không có người chi trả bảo chứng. **App không quản lý tiền** — không tồn tại tài khoản tiền trong hệ thống; tiền mặt (nếu có) chỉ là MỘT LOẠI phần thưởng như mọi phần thưởng khác.

Chi tiết về cơ chế hoạt động của **Phúc Lợi Lớp Học (Class Rewards)**, luồng giao dịch atomic trừ điểm/hoàn điểm, rút lại yêu cầu pending của học sinh và phê duyệt phát thưởng của Giáo viên, vui lòng xem tại đặc tả riêng **[SUB_SPEC_CLASS_REWARDS.md](./SUB_SPEC_CLASS_REWARDS.md)**.
*   **Chủ nhiệm tự tạo Phần Thưởng:** Mỗi chủ nhiệm tự tạo danh mục phần thưởng riêng cho lớp mình và tự định giá bằng NP. Chỉ học sinh thuộc lớp của chủ nhiệm/phó chủ nhiệm đó mới nhìn thấy và đổi được. Học sinh chưa có lớp (orphan) sẽ nhìn thấy danh mục quà tặng toàn trường do Hiệu Trưởng/Phó tạo.
*   **Số lượng giới hạn (khan hiếm có chủ đích):** Mỗi phần thưởng có số lượng cụ thể (`quantity`). Ai kiếm đủ điểm đổi sớm thì lấy trước; mỗi lần đổi số lượng giảm xuống, hết là thôi.
*   **Cơ chế Rút Lại (Cancel/Refund):** Khi giáo viên chưa bấm "Phát Thưởng", học sinh có thể tự hủy yêu cầu đổi quà ngay lập tức để nhận lại 100% số NP đã tiêu và trả lại số lượng tồn kho cho quà tặng.
*   **Luồng trao thưởng ngoài app:** Việc trao quà diễn ra hoàn toàn **ngoài đời thực**; chủ nhiệm bấm nút **"Phát Thưởng" (confirm delivery)** để đóng yêu cầu. Không có giao dịch tiền thật chạy bên trong hệ thống.
*   **Boss không thưởng tiền:** Phần thưởng Boss quy hết về Điểm + bonus hoàn thành cấu hình bởi Chủ Viện / Hiệu Phó (xem §2.1).

### 3.3 Phút Tu Luyện (Learning Minutes) — thước đo North Star
*   **Nguồn phút được ghi nhận:**
    1.  Mỗi *bài làm* (ải, lượt Arena, Boss) có **số phút quy định trước** (`estimatedMinutes`).
    2.  Mỗi *bài đọc / bài giảng lý thuyết* có số phút quy định trước.
    3.  Mỗi *mini-game* tự trả về **số phút chơi thực tế** qua sự kiện `onGameComplete({ timeSpent })` (SUB_SPEC_MINIGAME_HUB §2.2).
*   **Tổng hợp:** Cộng dồn thành **Phút Tu Luyện** theo ngày và theo tuần, bổ theo từng môn sinh / môn phái / tầng.
*   **Nơi sử dụng:** Thân Phận (học sinh tự xem), báo cáo Chủ nhiệm, dashboard Thiên Cơ Các, và là chỉ số xương sống của hệ thống Leaderboard (§7.5). Đây là thước đo "north star" của sản phẩm: *tổng phút tu luyện thu hoạch mỗi ngày/tuần*.

### 3.4 Kỳ Ngộ Giang Hồ (Random Encounter) — *(đã duyệt thiết kế 2026-07-10)*
1.  **Bản chất:** Page Cấp 3 đặc biệt (§2.8.4) do **Heo Maikawaii dẫn ra** (đúng luật linh vật duy nhất §2.5), xuất hiện ngẫu nhiên dưới dạng node phát sáng, **không bao giờ bị sương mù** che.
2.  **Ba biến thể theo vị trí xuất hiện:**
    *   *Daily (Bảng Cáo Thị / WorldMap):* thẻ **"Kỳ Ngộ Hôm Nay"** — 1 câu đố vui + thưởng.
    *   *Đấu Trường:* **"Tốc Chiến Kỳ Ngộ"** — 3 câu MCQ trong 60 giây (chơi nhanh).
    *   *Hang Luyện Công:* **"Cơ Duyên Học Nhanh"** — 1 trang lý thuyết cực ngắn + 1 câu hỏi liền sau.
3.  **Tần suất & chống lạm dụng:** xác suất ~**8%** mỗi lần bước vào một Page Cấp 1; tối đa **2 Kỳ Ngộ/ngày**; node tự biến mất sau **10 phút** nếu không nhận.
4.  **Thưởng (chỉ thưởng, không phạt):** +15~30 NP *hoặc* +20 Chân Khí. Trả lời **sai không bị phạt** — Kỳ Ngộ là khoảnh khắc may mắn, không phải kỷ luật.
5.  **Dữ liệu:** `KyNgoEvent { id, date, locationPageId, kind, claimed }` + bộ đếm số Kỳ Ngộ đã nhận trong ngày.

---

## 4. Mô Hình Tích Hợp Trí Tuệ Nhân Tạo (AI Engine - Gemini)

AI đóng vai trò là xương sống trong việc chấm điểm tự luận, dựng hình thông minh và nạp đề tự động.

### 4.1 Quy tắc Nạp đề thi bằng AI (AI Ingest Rules)
*   **Không tự bịa phương án nhiễu cho câu tự luận:** Đối với câu tự luận toán học, chỉ lưu trữ dưới dạng câu hỏi ngắn (`short-answer`/`proof`). Tuyệt đối không tự ý thêm các lựa chọn A, B, C, D giả lập để biến thành câu trắc nghiệm.
*   **Bỏ qua câu không thể số hóa trọn vẹn:** Các câu chứng minh thuần hình học phức tạp không thể dựng qua tọa độ bảng vẽ hoặc câu tự luận đại số cần trình bày sơ đồ dài sẽ bị loại bỏ khi import.
*   **Lọc trùng lặp nghiêm ngặt:** Nếu câu hỏi mới trùng lặp trên 95% ý tưởng hoặc từ ngữ với câu hỏi đã có trong Database, hệ thống sẽ tự động bỏ qua.

### 4.1.2 Quy tắc Quản Lý & Đạt Chuẩn Ngân Hàng Câu Hỏi (CRUD & Standard Rules)
*   **Lazy Load & Paging:** Danh sách câu hỏi hiển thị tối đa 10 câu ban đầu. Khi scroll xuống đáy danh sách, hệ thống tự động tải tiếp 10 câu tiếp theo (vô hạn scroll) giúp tối ưu hóa hiệu năng frontend.
*   **UX CRUD Tinh Gọn:**
    *   **Click-to-edit:** Nhấp trực tiếp vào thẻ câu hỏi bất kỳ để mở Form sửa đổi ngay tức khắc thay vì bấm nút "Sửa" nhỏ.
    *   **Nút Thêm mới (+):** Đặt nút "Thêm Câu Hỏi" ở header quản lý môn học, click để mở form trống, đổi nút submit thành "Tạo câu hỏi mới 💾".
    *   **Nút Xóa nhanh (X):** Khi hover vào thẻ câu hỏi xuất hiện nút X đỏ góc trên bên phải, bắt buộc hiển thị hộp thoại xác nhận (Delete Confirmation) chi tiết trước khi tiến hành xóa vĩnh viễn khỏi Database.
*   **Cơ chế "Đạt Chuẩn" (Standard Questions):**
    *   **Nút "Đạt Chuẩn 🏆":** Form tạo/sửa câu hỏi hỗ trợ nút "Đạt Chuẩn 🏆". Khi click, hệ thống gán cờ `isStandard: true` vào trường `metadata` của câu hỏi và lưu xuống Database.
    *   **Tick xanh hiển thị:** Trong mọi nơi hiển thị câu hỏi (Vạn Quyển Các, Đấu Trường PlayArea...), các câu hỏi đạt chuẩn sẽ có một **icon tick xanh nhỏ xíu ở góc** (hoặc bên cạnh đề bài) để biểu thị tính chuẩn mực và chính thống.

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
5.  *Ghi chú roadmap:* Giữ nguyên cơ chế chấm AI hiện tại (chưa có giải pháp tốt hơn). Tương lai sẽ bổ sung function **"Nhờ người chấm hộ"** — chuyển các bài cần phúc khảo cho người thật (Khảo Quan) chấm lại.

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
    *   *Khối Định Danh:* 1 khối duy nhất gồm avatar, tên, danh hiệu/cấp độ (hoặc badge Hiệu Trưởng), thanh EXP và Chân Khí — thông tin "về người chơi" gộp chung 1 nơi.
    *   *Khối Tài Nguyên:* 1 khối duy nhất gồm Ngân Lượng (NP) và Chuỗi luyện công (kèm icon Hộ Tâm Phù nếu có) — các chỉ số kinh tế/tiến trình gộp chung 1 nơi, phân cách bằng vạch mảnh, không dùng nhãn chữ 2 dòng (chỉ icon + số + tooltip) để tiết kiệm không gian. *(Tim sinh mệnh và Ví Thưởng VND đã bị xóa bỏ khỏi hệ thống — xem §2.1 và §3.2.)*
    *   *Điều hướng nhanh:* Nút vào Bách Hóa Phường và Hang Luyện Công dùng icon gọn (ẩn chữ ở màn hình hẹp, chỉ hiện icon + tooltip).
    *   *Nút Thân Phận:* Mang theo 1 chấm màu nhỏ theo màu môn phái đang hoạt động (xem §1.3 Global Switch) — đây là nơi duy nhất để đổi môn phái, HUD không có dropdown môn phái riêng.
    *   *Nút Rời Học Viện:* Tên gọi cho hành động Đăng xuất (logout) — thay tên cũ "Thoái Ẩn". Bấm vào sẽ kích hoạt Logout Gate của Heo Maikawaii (§2.5) trước khi hoàn tất đăng xuất.
*   **Bố cục "Chuồng Heo" thay thế cột thú cố định**: Cột trái `aside w-72` chiếm chỗ Heo Maikawaii thường trực trên desktop bị loại bỏ. Thay vào đó:
    *   *Chuồng Heo:* một nút/avatar nhỏ neo cố định ở góc màn hình (không chiếm luồng layout chính, `position: fixed`), luôn hiện diện làm điểm triệu hồi thủ công.
    *   *Overlay Heo:* khi xuất hiện (gác cổng đăng nhập/đăng xuất, idle, đói), heo hiển thị dạng lớp phủ (modal/overlay) đè lên toàn bộ layout hiện tại, nền sau mờ nhẹ — không chiếm không gian cố định, không đẩy lệch bố cục các trang khác.
    *   *Re-layout diện rộng:* Sơn Trang/Bản Đồ (`GameMap`), Bách Hóa Phường, Hang Luyện Công, Lầu Thư Giãn được thiết kế lại bố cục lưới/card để tận dụng phần không gian trước đây dành cho cột thú — nhiều cột hơn, card lớn hơn, hiển thị nhiều thông tin hơn trên cùng một màn hình.

---

## 6. Khung Định Hướng Mở Rộng (Extensibility Roadmap)

Hệ thống được thiết kế dạng mô-đun rời (decoupled) để dễ dàng tích hợp các cải tiến sau này mà không cần đập đi xây lại:

1.  **Mở rộng Môn học mới (Lớp 10 / THPT):** Cấu trúc dữ liệu `subject` hỗ trợ enum mở rộng. Có thể dễ dàng thêm Lý, Hóa, Sinh bằng cách tạo thêm track môn và bảng ánh xạ chủ đề.
2.  **Chế độ Chơi mạng (Multiplayer Arena):** Cơ chế PvP thời gian thực, bảng xếp hạng liên trường hoặc liên nhóm lớp.
3.  **Tích hợp Thư viện vẽ nâng cao:** Chuyển đổi các mật thất Biki từ vẽ SVG sang Canvas 2D/WebGL để tối ưu hóa hiệu năng xoay mô hình 3D phức tạp.
4.  **Cổng kết nối Hiệu Trưởng liên ứng dụng:** Tách riêng cổng Hiệu Trưởng thành một ứng dụng nhỏ hoặc kênh chatbox (Telegram/Zalo) nhận thông báo thời gian thực mỗi khi con hoàn thành bài học hoặc gửi yêu cầu phê duyệt quà.

---

## 7. Hệ Thống Thuật Ngữ & Danh Hiệu Kiếm Hiệp (Wuxia System)

Để đồng bộ hóa trải nghiệm nhập vai võ hiệp nhất quán, toàn bộ thuật ngữ tiếng Việt trong giao diện và tài liệu học tập của ứng dụng phải tuân thủ quy tắc quy đổi sau:

### 7.1 Bảng quy đổi thuật ngữ vai trò (Roles Terminology)

| Vai trò nguyên bản | Thuật ngữ Kiếm hiệp | Code value | Ý nghĩa hiển thị trên hệ thống |
| :--- | :--- | :--- | :--- |
| **Super Admin / Institute Head** | **Hiệu Trưởng** 👑 | `truong_vien` | Chủ nhân tối cao của học viện — toàn quyền tuyệt đối, bổ nhiệm Hiệu Phó, xóa tài khoản, xem audit log. |
| **Moderator / Deputy Admin** | **Hiệu Phó** 🛡️ | `pho_vien` | Được Hiệu Trưởng ủy quyền — quản lý ngân hàng câu hỏi, xem toàn bộ học sinh, promote trong phạm vi cho phép. |
| **Primary Parent** | **Hiệu Trưởng** 👨‍👩‍👧 | `parent` | Chủ nhiệm chính của Lớp Chủ Nhiệm — tạo phần thưởng, giao nhiệm vụ, cấu hình energy, quản lý con. |
| **Secondary Parent** | **Chủ Nhiệm Phụ** 👤 | `secondary_parent` | Được Hiệu Trưởng mời — quyền do Hiệu Trưởng cấu hình bật/tắt từng mục. |
| **Teacher / Content Creator** | **Đạo Sư** 📖 | `teacher` *(future)* | Thầy cô truyền dạy võ học và kiến thức của các môn phái. |
| **Grader / Examiner** | **Khảo Quan** 📝 | `grader` *(future)* | Người phụ trách chấm điểm bài luận và đánh giá học lực. |
| **AI Teacher (Gemini)** | **Linh Sư** 🤖 | `aiCompanion` | Vị thầy thông tuệ ảo đồng hành hướng dẫn môn sinh mọi lúc mọi nơi. |
| **Student / Player** | **Môn Sinh** 🌱 | `student` | Cách gọi chung cho người học tham gia tu luyện. |
| **Discipline Voice (hệ thống)** | **Môn Chủ** ⚖️ | `disciplineVoice` | Giọng nói kỷ luật, nghiêm khắc của học viện — chỉ xuất hiện khi Môn Sinh có hành vi né tránh thử thách. Không phải tài khoản/vai trò thật, chỉ là nhân vật tường thuật trong UI. |

### 7.2 Hệ thống Cấp bậc tu học của Thiếu hiệp (Student Ranks & Level Mapping)

> 🏛️ **Luật Một Bảng (Single Source of Truth):** Bảng dưới đây là **bảng định nghĩa DUY NHẤT** của toàn hệ thống cho quan hệ XP → Level → Danh hiệu. Mọi bảng cấp bậc khác (kể cả bảng "Cấp 1–5: Tân Đệ Tử… Chưởng Môn theo XP" từng có trong SUB_SPEC_XP_NP) đều **bị bãi bỏ**.
> **Công thức lên cấp (theo code hiện hành):** từ Level *n* lên Level *n+1* cần **n × 200 XP**. XP tích lũy để chạm Level *n* = `100 × n × (n−1)`. Khi vượt ngưỡng, hệ thống hiển thị **chúc mừng thăng cấp** (popup + log truyền công); chạm mốc danh hiệu thì tặng thêm badge và thưởng đột biến (§7.3).

| Cấp bậc học tập | Icon hiển thị | Phạm vi Level áp dụng | XP tích lũy tối thiểu | Ý nghĩa tu học |
| :--- | :---: | :---: | :---: | :--- |
| 🌱 **Tân Đệ Tử** | `🌱` | **Level 1 - 4** | 0 | Mới nhập môn võ học học viện, làm quen với các khái niệm căn bản. |
| 🥋 **Đệ Tử** | `🥋` | **Level 5 - 14** | 2.000 | Đã bắt đầu tu học kiến thức chuyên sâu của các môn phái. |
| ⚔️ **Môn Sinh** | `⚔️` | **Level 15 - 29** | 21.000 | Có nền tảng vững vàng, đã tự mình vượt qua nhiều thử thách. |
| ⭐ **Cao Thủ** | `⭐` | **Level 30 - 49** | 87.000 | Đạt được những thành tích nổi bật và độ chính xác cao khi giải bài. |
| 🐉 **Đại Hiệp** | `🐉` | **Level 50 - 79** | 245.000 | Võ công thượng thừa, nằm trong danh sách các môn sinh đứng đầu môn phái. |
| 👑 **Tông Sư** | `👑` | **Level 80+** | 632.000 | Đỉnh phong võ học, danh hiệu cao nhất chỉ dành cho rất ít người xuất chúng. |

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
      { id: 'thieu-hiep', name: 'Môn Sinh', icon: '⚔️', minLevel: 15, description: 'Có nền tảng vững vàng...' },
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
    *   *Bảng Chủ Nhiệm (Hiệu Trưởng):* Hiển thị danh hiệu hiện tại bên cạnh thông tin tiến độ học tập của môn sinh.
    *   *Leaderboard & Profile:* Hiển thị đầy đủ danh hiệu kèm cấp độ (ví dụ: `🐉 Đại Hiệp (Level 54)`).
4.  **Cơ chế Thăng hạng (Rank Up Perks):**
    *   Khi môn sinh đạt cấp độ cột mốc chuyển giao cấp bậc (ví dụ chạm Level 5, 15, 30, 50, 80), hệ thống sẽ ghi nhận một log hoạt động thăng hạng đặc biệt trong Nhật ký truyền công (`HistoryLog`).
    *   Học viện sẽ tự động thêm huy hiệu tương ứng của cấp bậc đó vào danh sách `badges` lưu trong PostgreSQL (`ge10_player_profiles.badges`) và thưởng thêm một lượng Coin/XP đột biến để chúc mừng.

### 7.4 Đẳng cấp tu luyện theo Môn Phái (Sect Mastery Ranks)

Để Môn Sinh đánh giá chính xác mức độ đầu tư tu luyện của mình trên từng môn học cụ thể (biết phái nào luyện ít, cần luyện thêm), hệ thống áp dụng hệ thống Đẳng cấp Môn phái độc lập dựa trên tỉ lệ hoàn thành bài học và câu hỏi:

1.  **Hệ thống Đẳng cấp:**
    *   🌱 **Nhập Môn:** Tỉ lệ hoàn thành < 15%
    *   📜 **Lĩnh Ngộ:** Tỉ lệ hoàn thành từ 15% đến dưới 40%
    *   ⚔️ **Tiểu Thành:** Tỉ lệ hoàn thành từ 40% đến dưới 65%
    *   🔥 **Tinh Thông:** Tỉ lệ hoàn thành từ 65% đến dưới 85%
    *   ⭐ **Đại Thành:** Tỉ lệ hoàn thành từ 85% đến dưới 98%
    *   🏆 **Xuất Chúng:** Tỉ lệ hoàn thành từ 98% trở lên (khi môn sinh học hết lý thuyết và làm hết bài tập của môn phái đó).

2.  **Công thức tính Tỉ lệ Hoàn thành:**
    $$\text{Tỷ lệ Hoàn thành} = \left(\frac{\text{Số bài học đã xong}}{\text{Tổng số bài học}}\right) \times 50\% + \left(\frac{\text{Số câu trả lời đúng}}{\text{Tổng số câu hỏi của môn}}\right) \times 50\%$$

3.  **Quy tắc Trang Thân Phận (Profile Page):**
    *   Thiếu hiệp có thể click vào thẻ môn phái trong profile để chuyển đổi môn phái tu học toàn cục.
    *   Hiển thị **Nội công rèn luyện** (tổng số câu trả lời chính xác của môn phái đó).
    *   Hiển thị **Thời gian rèn luyện** (ước lượng bằng: $\text{Số câu đúng} \times 1.5$ phút).
    *   **Cổng hành động chuyển màn nhanh (Exit Gates):** Sau khi thay đổi thân phận và phong vị vừa ý, môn sinh có 2 cổng hành động trực quan ở chân trang để đi thẳng đến khu vực cần thiết:
        *   *🚪 Bôn Tẩu Giang Hồ:* Đóng hồ sơ và chuyển màn hình về Bản đồ môn phái (Main Map).
        *   *⚔️ Vào Hang Luyện Công:* Đóng hồ sơ và đi thẳng tới Hang Luyện Công để bắt đầu làm bài luyện tập.

4.  **Luật Bất Thoái (One-way Mastery):** Đẳng cấp môn phái **đã đạt sẽ không bao giờ tự tụt** — kể cả khi Hiệu Trưởng import thêm câu hỏi/bài học làm mẫu số của công thức tăng lên. Hệ thống lưu đẳng cấp cao nhất từng đạt (`maxAchievedRank`) theo từng môn phái và luôn hiển thị mức cao nhất đó. Tỉ lệ % chi tiết bên dưới đẳng cấp vẫn phản ánh số thực để môn sinh biết còn bao nhiêu nội dung mới.

### 7.5 Hệ Thống Bảng Xếp Hạng (Leaderboards theo vai trò)

Nguyên tắc chung: (1) mỗi vai trò chỉ thấy leaderboard trong **phạm vi dữ liệu mình được phép truy cập**; (2) mọi bảng đều lọc theo **Tầng Thế Giới** hiện hành (§1.4); (3) chu kỳ mặc định là **Tuần**, có tab Tháng / Mọi lúc; (4) chỉ số xương sống là **Phút Tu Luyện** (§3.3) và **Điểm (NP) kiếm được trong kỳ**.

| Vai trò | Nơi xem | Phạm vi & Chiều xếp hạng |
| :--- | :--- | :--- |
| 🌱 **Môn Sinh** | Trang Thân Phận | Hạng của bản thân trong Lớp Chủ Nhiệm / Lớp — theo Phút Tu Luyện, Điểm kiếm trong kỳ, Chuỗi ngày, Đẳng cấp môn phái. Chỉ thấy tên/avatar các bạn cùng nhóm; không lộ dữ liệu nhóm khác. |
| 👨‍👩‍👧 **Chủ nhiệm Chính** | ParentConsole | Xếp hạng các con trong nhóm mình — theo Phút Tu Luyện, Điểm kiếm/kỳ, tỉ lệ đúng, số chuyên đề đạt Tinh Thông, số lần Skip. |
| 👤 **Chủ nhiệm Phụ** | ParentConsole | Như Chủ nhiệm Chính (nếu có quyền xem báo cáo) — chỉ lớp chủ nhiệm mình. |
| 🛡️ **Hiệu Phó** | Bảng Quản Trị (Thiên Cơ Các) | Như chủ nhiệm nhưng trên toàn bộ phạm vi viện + bảng so sánh giữa các lớp chủ nhiệm. |
| 👑 **Hiệu Trưởng** | Thiên Cơ Các (Toàn Viện) | Toàn viện, mọi chiều: top Phút Tu Luyện, top Điểm, top tiến bộ (delta mastery), heatmap chuyên đề yếu toàn viện, thống kê Skip và lý do lỗi đề. |

*   **An toàn trẻ em:** học sinh được ẩn danh hóa (biệt danh) trên mọi bảng vượt ra ngoài lớp chủ nhiệm của mình; tài khoản chuyển vai trò tự động ẩn khỏi bảng (§1.2).
*   *(Ghi chú: chi tiết quyền của Chủ Viện/Hiệu Phó sẽ đồng bộ lại khi SUB_SPEC_FAMILY_ROLE bản mới được nạp về — xem §1.2.)*

---

## 8. Tự Điển Thuật Ngữ & Khái Niệm (Terminology & Concepts Dictionary)

> [!IMPORTANT]
> **Quy Tắc Biên Soạn:** Mỗi khi có ý tưởng hoặc tính năng mới được cập nhật vào Core Specs, các khái niệm, tên gọi và thuật ngữ mới bắt buộc phải được định nghĩa và cập nhật vào bộ tự điển này để đảm bảo tính đồng bộ từ thiết kế đến triển khai mã nguồn.

| Tên tiếng Việt (UI) | Tên tiếng Anh (UI) | Code value (DB/TS) | Mô tả |
| :--- | :--- | :--- | :--- |
| **Hiệu Trưởng** 👑 | Institute Head / Super Admin | `truong_vien` | Chủ nhân tối cao — toàn quyền, bổ nhiệm Hiệu Phó, xóa tài khoản, xem audit log. Thay thế code cũ `'admin'`. |
| **Hiệu Phó** 🛡️ | Deputy Admin / Moderator | `pho_vien` | Quản trị được ủy quyền — CRUD câu hỏi, xem toàn học sinh, promote student↔parent, cấu hình energy. |
| **Hiệu Trưởng** 👨‍👩‍👧 | Primary Parent | `parent` | Chủ nhiệm chính của Lớp Chủ Nhiệm — tạo rewards, nhiệm vụ, quản lý con, cấu hình energy cho con. |
| **Chủ Nhiệm Phụ** 👤 | Secondary Parent | `secondary_parent` | Được Hiệu Trưởng mời — quyền bật/tắt theo cấu hình Hiệu Trưởng. |
| **Đạo Sư** 📖 | Teacher / Creator | `teacher` *(future)* | Thầy cô phụ trách soạn thảo học liệu, bài học của các môn phái. |
| **Khảo Quan** 📝 | Examiner / Grader | `grader` *(future)* | Người phụ trách chấm điểm bài luận và đánh giá học lực của môn sinh. |
| **Linh Sư** 🤖 | AI Companion | `aiCompanion` / `ai_teacher` / `Gemini` | Người đồng hành ảo thông tuệ hướng dẫn môn sinh mọi lúc mọi nơi. |
| **Môn Sinh** 🌱 | Student / Player | `student` / `player` / `user` | Người học tham gia tu luyện kiến thức trong học viện. |
| **Môn Chủ** ⚖️ | Discipline Voice | `disciplineVoice` / `systemVoice` | Nhân vật ảo của hệ thống đóng vai trò kỷ luật, nghiêm khắc vấn tội khi môn sinh né tránh thử thách. |
| **Đấu Trường** 🏛️ | Arena | `PlayArea` / `Arena` / `arena` | Nơi thử thách làm bài dưới áp lực thời gian hoặc giới hạn sinh lực. |
| **Mixed/Skill Practicing** | Practice Mode | `practice` / `mixed` | Chế độ ôn tập tự do theo mảng kiến thức của môn học. |
| **Sinh tồn** | Survival Mode | `survival` | Chế độ làm bài giới hạn 3 lần sai mỗi lượt (bộ đếm nội bộ — không còn hệ thống Tim). |
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
| **Hộ Tâm Phù** 🛡️ | Protection Charm | `badges` ("Streak Shield") / `buyStreakShield` | Pháp khí bảo vệ chuỗi tu luyện (Streak) khi lỡ quên đăng nhập 24h. |
| **Tầng Thế Giới** 🗼 | Grade Tier | `gradeTier` | Mỗi lớp học là một tầng thế giới cô lập 100%; đổi tầng duy nhất tại Thân Phận (§1.4). |
| **Phần Thưởng Thực Tế** 🎁 | Reward Catalog | `parentReward` / `rewardQuantity` / `markRewardDelivered` | Phần thưởng do chủ nhiệm tự tạo, định giá bằng NP, có số lượng giới hạn, trao ngoài đời qua nút "Đã Trao" (§3.2). |
| **Phút Tu Luyện** ⏱️ | Learning Minutes | `learningMinutes` / `estimatedMinutes` | Tổng phút học quy định/đo được, cộng dồn theo ngày/tuần — thước đo North Star (§3.3). |
| **Chủ Viện / Hiệu Phó** 🏛️ | Admin / Moderator | `admin` / `moderator` | Hệ phân quyền quản trị mới nhiều cấp (spec chi tiết đang cập nhật bên Gemini — §1.2). |
| **Bảng Cáo Thị** 📜 | Parent Quests | `parentQuest` | Nhiệm vụ do chủ nhiệm giao, hiển thị tại Vùng Điều Hướng Trung Tâm của WorldMap. |
| **Phong Vị** 🎭 | Appearance Theme | `uiTheme` / `UiThemeId` / `ProfileThemeModal` | Giao diện hiển thị cá nhân hóa (Đào Hoa, Trúc Lâm, Tinh Không, Tuyết Sơn...). |
| **Phúc Lợi Lớp Học** 🎁 | Parent Reward | `rewards` / `ParentReward` / `claimParentReward` | Phần thưởng thực tế ngoài đời được Hiệu Trưởng thiết lập và phê duyệt. |
| **Sân Nuôi Thú** 🐷 | Pet Sanctuary | `PetSanctuary` / `pet` | Nơi chăm sóc và tương tác tiến hóa với Heo Maikawaii. |
| **Album Kỷ Niệm** | Pet Memory Album | `petAlbum` / `memoryAlbum` | Nơi lưu giữ hình ảnh và nhật ký hành trình lớn lên của thú cưng. |
| **Thân Phận** 👑 | Profile | `ProfileThemeModal` / `isProfileOpen` | Modal quản lý thông tin đệ tử, danh hiệu, badges và chuyển đổi môn phái. |
| **Bảng Quản Trị Hiệu Trưởng** | Admin Console | `ParentConsole` / `parent` | Bảng quản lý tổng quan dành riêng cho vai trò Hiệu Trưởng. |
| **Chính Điện** 🏛️ | Main Hall | `chinh_dien` | Phân hệ quản lý thành viên trong Bảng Quản Trị. |
| **Thiên Cơ Các** 📖 | Secrets Library | `thien_co_cac` | Phân hệ báo cáo thống kê, dashboard số liệu của học viện. |
| **Vạn Quyển Các** 📚 | Question Bank | `van_quyen_cac` / `QuestionBank` | Phân hệ quản lý câu hỏi đề thi và nạp đề bằng AI. |
| **Ngân Các** 💰 | Treasury | `ngan_cac` | Phân hệ quản lý tài nguyên, cấu hình game và phê duyệt Phúc Lợi. |
| **Cẩm Nang Bí Lục** 📖 | Giang Hồ Handbook | `GiangHoCamNang` / `handbookPages` | Cuốn sách cổ dặn dò hiển thị khi đăng nhập/đăng xuất hoặc xem ở Thân Phận. |
| **Chân Khí** ⚡ | Energy | `energy` / `maxEnergy` / `resetHours` | Thể lực tiêu hao khi làm hoạt động sinh điểm; max và thời gian hồi (2/3/5h) do chủ nhiệm cấu hình — luật chi tiết tại [SUB_SPEC_ENERGY.md](./SUB_SPEC_ENERGY.md). |
| **Ngân Lượng** 🪙 | Coins (NP) | `coins` / `coinsChanged` | Tiền tệ tích lũy khi tu luyện đúng câu hỏi, dùng để mua sắm. |
| **Kỳ Ngộ Giang Hồ** | Random Encounter | `randomEvent` | Page Cấp 3 đặc biệt xuất hiện ngẫu nhiên, không bị sương mù — trong Daily / Đấu Trường (chơi nhanh) / Hang (học nhanh). Đang phân tích (§3.4). |
| **Rời Học Viện** 🚪 | Logout | `onLogout` / `logout` | Hành động đăng xuất — kích hoạt Logout Gate của Heo Maikawaii trước khi rời (§2.5; thay tên cũ "Thoái Ẩn"). |
| **Môn Chủ Hỏi Tội** ⚖️ | Skip Punishment Dialog | `skipPunishment` / `MonChuHoiToi` | Hộp thoại phạt và ghi nhận lý do khi Môn Sinh bấm bỏ qua câu hỏi. |

---

## 9. Bộ Nội Công Cốt Lõi (Core Knowledge Bank) — Ngân Hàng Câu Hỏi Chuẩn

> [!IMPORTANT]
> Section này định nghĩa **toàn bộ danh mục chuyên đề (topic taxonomy)** mà hệ thống ngân hàng câu hỏi phải bao phủ cho tất cả các môn phái. Đây là nền tảng để:
> 1. **Khoá (Lock) các Page Cấp 2** trong kiến trúc §2.8 — mỗi Page Cấp 2 cần ít nhất X câu hỏi Core Knowledge tương ứng mới mở được.
> 2. **Gatekeeper Questions** (§2.8.7 Sương mù Chiến tranh) — câu hỏi kiểm soát cổng vào mỗi khu vực phải lấy từ đúng nhóm chuyên đề cốt lõi của khu vực đó.
> 3. **Đấu trường Mixed/Skill Practicing** — hệ thống phân loại câu hỏi và đề xuất AI Sư Phụ đều dựa vào taxonomy này.
> 4. **Báo cáo đẳng cấp môn phái** (§7.4) — tỉ lệ hoàn thành tính trên toàn bộ câu hỏi trong Core Knowledge Taxonomy.
>
> 🗼 **Phạm vi Tầng:** toàn bộ taxonomy dưới đây thuộc **Tầng Lớp 9** (§1.4). Các Tầng 10/11/12 sẽ có taxonomy riêng khi mở tầng — cấu trúc `CoreKnowledgeTopic` bổ sung field `gradeTier`.

### 9.1 Kiến trúc dữ liệu Core Knowledge

```typescript
// Mỗi chuyên đề/nhóm kiến thức cốt lõi trong ngân hàng câu hỏi
interface CoreKnowledgeTopic {
  id: string;                  // kebab-case, unique, e.g. "eng-tenses", "math-quadratic"
  subjectId: SubjectId;        // môn phái
  group: 'chuyen_sau' | 'co_ban';
  label: string;               // tên hiển thị tiếng Việt
  labelEN: string;             // tên kỹ thuật tiếng Anh (dùng trong code/filter)
  hamNguyenTo?: 'hoa' | 'bang' | 'thach'; // gán vào Hầm nào (§2.8.3) — chỉ dành cho Hang Luyện Công
  examRelevance: 'high' | 'medium' | 'low'; // mức độ xuất hiện thực tế trong đề tuyển sinh / đề HK
  minQuestions: number;        // số câu tối thiểu cần có trong DB để mở khu vực tương ứng
  questionTypes: QuestionType[]; // dạng câu hỏi được phép trong chuyên đề này
  description: string;         // mô tả ngắn cho Hiệu Trưởng khi import đề
}
```

---

### 9.2 Nhóm Môn Phái Chuyên Sâu (Tuyển Sinh Lớp 10 TP.HCM)

> Cấu trúc đề tuyển sinh lớp 10 TP.HCM (áp dụng từ 2025 theo GDPT 2018):
> - **Toán**: 7 bài, 10 điểm, 120 phút — trọng tâm Hình học phẳng (3đ), Hàm số bậc hai, Phương trình bậc hai, Thống kê-Xác suất, Toán thực tế.
> - **Ngữ văn**: 10 điểm, 120 phút — Đọc hiểu văn bản văn học (3đ) + Viết đoạn (2đ) + Đọc hiểu nghị luận/thông tin (1đ) + Viết NLXH (4đ).
> - **Tiếng Anh**: 40 câu, 90 phút — Pronunciation, Grammar/Vocabulary MCQ, Communication, Reading (sign/cloze/passage), Word Form, Rewrite.

#### 9.2.1 Môn Phái Tiếng Anh (`english`)

| ID | Nhãn | Hầm | Mức độ đề thi | Dạng câu |
|:---|:---|:---:|:---:|:---|
| `eng-pronunciation` | Phát âm đuôi -ed/-s | 🔥 Hỏa | HIGH | mcq |
| `eng-stress` | Trọng âm từ (Word Stress) | 🔥 Hỏa | HIGH | mcq |
| `eng-tenses` | Các thì động từ (Tenses) | 🪨 Thạch | HIGH | mcq, wordform |
| `eng-passive-voice` | Câu bị động (Passive Voice) | 🪨 Thạch | HIGH | mcq, rewrite |
| `eng-relative-clauses` | Mệnh đề quan hệ (Relative Clauses) | 🪨 Thạch | HIGH | mcq, rewrite |
| `eng-conditional` | Câu điều kiện (Conditional Sentences) | ❄️ Băng | HIGH | mcq, rewrite |
| `eng-reported-speech` | Câu tường thuật (Reported Speech) | ❄️ Băng | HIGH | mcq, rewrite |
| `eng-word-form` | Biến đổi dạng từ (Word Form) | 🪨 Thạch | HIGH | wordform |
| `eng-gerund-infinitive` | Danh động từ / Động từ nguyên mẫu | 🪨 Thạch | MEDIUM | mcq |
| `eng-comparison` | So sánh (Comparison) | 🪨 Thạch | MEDIUM | mcq, rewrite |
| `eng-modal-verbs` | Động từ khiếm khuyết (Modal Verbs) | 🪨 Thạch | MEDIUM | mcq |
| `eng-wish-suggest` | Cấu trúc Wish / Suggest / It's time | ❄️ Băng | MEDIUM | rewrite |
| `eng-have-get-done` | Cấu trúc have/get something done | ❄️ Băng | MEDIUM | rewrite |
| `eng-vocabulary-topic` | Từ vựng theo chủ đề (Gia đình, MT, GD...) | 🔥 Hỏa | HIGH | mcq |
| `eng-communication` | Giao tiếp tình huống thực tế | 🔥 Hỏa | HIGH | mcq |
| `eng-reading-sign` | Đọc hiểu biển báo/thông báo ngắn | ❄️ Băng | HIGH | mcq |
| `eng-reading-cloze` | Điền từ vào văn bản (Cloze Test) | ❄️ Băng | HIGH | mcq |
| `eng-reading-passage` | Đọc hiểu đoạn văn dài | ❄️ Băng | HIGH | mcq, reading |
| `eng-rewrite` | Viết lại câu (Sentence Transformation) | ❄️ Băng | HIGH | rewrite |

**Tổng: 19 nhóm chuyên đề Tiếng Anh.** `minQuestions` khuyến nghị: HIGH = 30 câu, MEDIUM = 15 câu/nhóm.

---

#### 9.2.2 Môn Phái Toán (`math`)

> Cấu trúc 7 bài đề tuyển sinh 2025:
> Bài 1 (1.5đ): Hàm số y=ax² | Bài 2 (1đ): PT bậc 2 + Viète | Bài 3 (1.5đ): Xác suất/Thống kê | Bài 4 (1đ): Toán thực tế (biểu thức/tìm x) | Bài 5 (1đ): Hình học ứng dụng thực tế | Bài 6 (1đ): PT/BPT/Hệ PT | Bài 7 (3đ): Hình học phẳng

| ID | Nhãn | Hầm | Mức độ đề thi | Dạng câu |
|:---|:---|:---:|:---:|:---|
| `math-quadratic-function` | Hàm số bậc hai y=ax²+bx+c (Parabol) | ❄️ Băng | HIGH | mcq, short-answer |
| `math-quadratic-equation` | Phương trình bậc hai (nghiệm, Delta) | ❄️ Băng | HIGH | mcq, short-answer |
| `math-vieta` | Hệ thức Vi-ét và ứng dụng | ❄️ Băng | HIGH | short-answer |
| `math-linear-system` | Hệ phương trình bậc nhất hai ẩn | ❄️ Băng | HIGH | short-answer |
| `math-inequality` | Bất phương trình bậc nhất | 🪨 Thạch | MEDIUM | short-answer |
| `math-statistics` | Thống kê (Tần số, Biểu đồ, Trung bình) | 🔥 Hỏa | HIGH | mcq, short-answer |
| `math-probability` | Xác suất cơ bản | 🔥 Hỏa | HIGH | mcq, short-answer |
| `math-real-world-algebra` | Toán thực tế — lập phương trình | 🪨 Thạch | HIGH | short-answer, multi-part |
| `math-real-world-percent` | Toán thực tế — phần trăm, tăng giảm | 🔥 Hỏa | HIGH | short-answer |
| `math-plane-geometry-circle` | Hình học phẳng — Đường tròn & Tiếp tuyến | ❄️ Băng | HIGH | proof, short-answer |
| `math-plane-geometry-triangle` | Hình học phẳng — Tam giác & Đồng dạng | ❄️ Băng | HIGH | proof, short-answer |
| `math-plane-geometry-cyclic` | Tứ giác nội tiếp | ❄️ Băng | HIGH | proof |
| `math-plane-geometry-coordinates` | Hình học phẳng — Hệ tọa độ & Phương trình đường thẳng | ❄️ Băng | MEDIUM | short-answer |
| `math-solid-geometry-volume` | Hình học không gian — Thể tích & DTXQ | 🔥 Hỏa | HIGH | short-answer |
| `math-solid-geometry-3d` | Hình học không gian — Mặt cắt, đường cao | ❄️ Băng | MEDIUM | short-answer, proof |
| `math-trigonometry` | Hệ thức lượng trong tam giác vuông | 🪨 Thạch | MEDIUM | short-answer |
| `math-radicals` | Biểu thức chứa căn thức (rút gọn) | 🪨 Thạch | MEDIUM | short-answer |
| `math-rational-expression` | Rút gọn biểu thức hữu tỉ | 🪨 Thạch | MEDIUM | short-answer |

**Tổng: 18 nhóm chuyên đề Toán.** Lưu ý: `proof` và `short-answer` là các dạng tự luận — không import dưới dạng MCQ theo quy tắc §4.1.

---

#### 9.2.3 Môn Phái Ngữ Văn (`literature`)

> Cấu trúc đề 2025: Phần 1 (5đ) — Đọc hiểu văn bản văn học (3đ) + Viết đoạn 200 chữ cảm nhận thơ (2đ). Phần 2 (5đ) — Đọc hiểu văn bản nghị luận/thông tin (1đ) + Viết NLXH (4đ). **Ngữ liệu lấy ngoài SGK** — không được import nguyên văn đề cũ mà cần tạo câu hỏi mới dựa trên kỹ năng.

| ID | Nhãn | Hầm | Mức độ đề thi | Dạng câu |
|:---|:---|:---:|:---:|:---|
| `lit-reading-poetry` | Đọc hiểu — Văn bản thơ | ❄️ Băng | HIGH | mcq, short-answer |
| `lit-reading-prose` | Đọc hiểu — Văn bản truyện/kí | ❄️ Băng | HIGH | mcq, short-answer |
| `lit-reading-argument` | Đọc hiểu — Văn bản nghị luận | ❄️ Băng | HIGH | mcq, short-answer |
| `lit-reading-information` | Đọc hiểu — Văn bản thông tin | ❄️ Băng | MEDIUM | mcq, short-answer |
| `lit-rhetoric-device` | Biện pháp tu từ (Nhân hóa, Ẩn dụ, Điệp...) | 🔥 Hỏa | HIGH | mcq |
| `lit-vietnamese-word-class` | Tiếng Việt — Từ loại, Nghĩa của từ | 🪨 Thạch | HIGH | mcq |
| `lit-vietnamese-sentence` | Tiếng Việt — Câu ghép, Thành phần câu | 🪨 Thạch | MEDIUM | mcq |
| `lit-vietnamese-cohesion` | Tiếng Việt — Phép liên kết, Phép nối | 🪨 Thạch | MEDIUM | mcq |
| `lit-poem-analysis` | Cảm nhận/Phân tích đoạn thơ (Viết đoạn 200 chữ) | ❄️ Băng | HIGH | short-answer |
| `lit-social-essay` | Viết bài NLXH (vấn đề đời sống) | ❄️ Băng | HIGH | short-answer |
| `lit-literary-essay` | Viết NLVH (cảm nhận nhân vật/tác phẩm) | ❄️ Băng | HIGH | short-answer, proof |
| `lit-text-genre` | Nhận biết thể loại văn bản | 🔥 Hỏa | MEDIUM | mcq |
| `lit-work-knowledge` | Kiến thức tác giả-tác phẩm lớp 9 | 🔥 Hỏa | LOW | mcq |

> 📌 **Lưu ý quan trọng về chương trình GDPT 2018:**
> Ngữ văn lớp 9 mới **KHÔNG có danh sách tác phẩm bắt buộc cố định**. Chương trình tổ chức theo thể loại (truyện truyền kì, thơ/truyện thơ, kịch, văn nghị luận, văn thông tin) với yêu cầu cần đạt theo thể loại, và **đề tuyển sinh dùng ngữ liệu ngoài SGK**.
>
> **Tác phẩm tiêu biểu theo thể loại (GDPT 2018):**
> - *Truyện truyền kì:* Chuyện người con gái Nam Xương (Nguyễn Dữ), Dế chọi (Bồ Tùng Linh)
> - *Thơ/Truyện thơ:* Kim-Kiều gặp gỡ (Truyện Kiều – Nguyễn Du), Lục Vân Tiên đánh cướp (Nguyễn Đình Chiểu), Tự tình bài 2 (Hồ Xuân Hương), Bếp lửa (Bằng Việt), Quê hương (Tế Hanh)
> - *Kịch bi kịch:* Rô-mê-ô và Giu-li-ét (Shakespeare), Lơ Xít (Corneille)
> - *Văn nghị luận/thông tin:* Đấu tranh cho một thế giới hòa bình (Márquez)
>
> ⚠️ Các tác phẩm Làng, Chiếc lược ngà, Mùa xuân nho nhỏ, Viếng lăng Bác, Sang thu, Nói với con... là chương trình **CŨ** trước 2018 — **không dùng làm ngữ liệu chính** cho câu hỏi GDPT 2018, nhưng vẫn có thể xuất hiện làm nền kiến thức tham khảo.

**Tổng: 13 nhóm chuyên đề Ngữ Văn.** `short-answer` và `proof` là dạng tự luận — chấm bằng AI (§4.2).

---

### 9.3 Nhóm Môn Phái Kiến Thức Cơ Bản (Đề HK1 + HK2 Lớp 9)

> Các môn cơ bản không thi tuyển sinh lớp 10, nhưng xuất hiện trong đề HK1/HK2 lớp 9. Câu hỏi thuần MCQ và short-answer ngắn. Dạng Boss Battle = đề thi HK1/HK2 chuẩn.

#### 9.3.1 Môn Phái Khoa Học Tự Nhiên (`science`)

> Tích hợp 3 phân môn: Vật lý, Hóa học, Sinh học — theo chương trình GDPT 2018, 140 tiết/năm.

**Phân môn Vật lý lớp 9:**

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
| `sci-phy-electricity` | Điện học — Điện trở, Định luật Ôm, Mạch nối tiếp/song song | 🪨 Thạch | mcq, short-answer |
| `sci-phy-electromagnet` | Điện từ học — Nam châm, Cảm ứng điện từ, Máy phát điện | ❄️ Băng | mcq |
| `sci-phy-optics` | Quang học — Thấu kính hội tụ/phân kỳ, Ảnh qua thấu kính | ❄️ Băng | mcq, short-answer |
| `sci-phy-energy` | Năng lượng — Công suất, Hiệu suất, Bảo toàn năng lượng | 🔥 Hỏa | mcq, short-answer |

**Phân môn Hóa học lớp 9:**

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
| `sci-chem-oxacid` | Oxit — Axit — Bazơ — Muối (Tính chất, Phân loại) | 🪨 Thạch | mcq |
| `sci-chem-periodic` | Bảng tuần hoàn & Tính chất hóa học theo nhóm | 🪨 Thạch | mcq |
| `sci-chem-metal` | Kim loại — Tính chất, Dãy hoạt động, Ăn mòn | 🔥 Hỏa | mcq |
| `sci-chem-nonmetal` | Phi kim — Clo, Cacbon, Silic, Lưu huỳnh | 🔥 Hỏa | mcq |
| `sci-chem-organic` | Hóa hữu cơ sơ lược — Hiđrocacbon, Rượu, Axit axetic, Polime | ❄️ Băng | mcq |

**Phân môn Sinh học lớp 9:**

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
| `sci-bio-genetics-mendelian` | Di truyền học — Quy luật Mendel, Lai một cặp/hai cặp tính trạng | ❄️ Băng | mcq, short-answer |
| `sci-bio-dna-gene` | Cấu trúc ADN, Gen, ARN, Protein, Đột biến | ❄️ Băng | mcq |
| `sci-bio-evolution` | Biến dị — Đột biến gen, NST, Biến dị tổ hợp | 🔥 Hỏa | mcq |
| `sci-bio-ecosystem` | Hệ sinh thái — Quần thể, Quần xã, Lưới thức ăn | 🪨 Thạch | mcq |
| `sci-bio-environment` | Môi trường & Bảo vệ môi trường | 🪨 Thạch | mcq |

**Tổng: 14 nhóm chuyên đề KHTN.**

---

#### 9.3.2 Môn Phái Lịch Sử & Địa Lý (`history_geography`)

**Phân môn Lịch sử lớp 9 (GDPT 2018 — bao phủ 1918–1945):**

> Chương trình GDPT 2018 lớp 9 tập trung giai đoạn **1918–1945** (thế giới + Việt Nam), khác chương trình cũ. Gồm: Nước Nga/Liên Xô, CTTG2, Cách mạng tháng Tám 1945.

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
| `his-world-ww2-background` | Thế giới 1918–1939 — Liên Xô, Đại suy thoái, Chủ nghĩa phát xít | 🪨 Thạch | mcq |
| `his-world-ww2` | Chiến tranh thế giới thứ hai 1939–1945 — diễn biến, kết quả | ❄️ Băng | mcq |
| `his-world-asia-1918` | Châu Á 1918–1945 — Nhật, Trung Quốc, Ấn Độ, Đông Nam Á | 🔥 Hỏa | mcq |
| `his-vn-colonial` | Việt Nam 1918–1930 — Khai thác thuộc địa lần 2, phong trào dân tộc | 🪨 Thạch | mcq |
| `his-vn-party` | Thành lập Đảng CSVN (1930) & phong trào cách mạng 1930–1939 | 🔥 Hỏa | mcq |
| `his-vn-aug-revolution` | Cách mạng tháng Tám 1945 — chuẩn bị, diễn biến, thành lập VNDCCH | 🔥 Hỏa | mcq |

**Phân môn Địa lý lớp 9 (GDPT 2018):**

> Gồm 3 chương: Địa lí dân cư, Các ngành kinh tế, và Phân hóa lãnh thổ 7 vùng.

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
| `geo-population` | Dân cư — Dân tộc, Dân số, Phân bố, Chất lượng cuộc sống | 🪨 Thạch | mcq |
| `geo-agri-forestry-fish` | Nông-Lâm-Ngư nghiệp & Nông nghiệp xanh | 🪨 Thạch | mcq |
| `geo-industry` | Công nghiệp — Các ngành chủ yếu & Công nghiệp xanh | 🔥 Hỏa | mcq |
| `geo-service` | Dịch vụ — Thương mại, Du lịch | 🔥 Hỏa | mcq |
| `geo-regions-7` | 7 Vùng kinh tế — đặc điểm tự nhiên, kinh tế nổi bật từng vùng | ❄️ Băng | mcq, short-answer |

**Tổng: 11 nhóm chuyên đề Lịch Sử & Địa Lý** (6 Lịch sử + 5 Địa lý).

---

#### 9.3.3 Môn Phái Giáo Dục Công Dân (`civics`)

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
> GDCD lớp 9 GDPT 2018 có **10 bài học** tập trung vào lí tưởng sống, đạo đức công dân, pháp luật thực tiễn và kỹ năng sống.

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
| `civ-ideal-life` | Sống có lí tưởng | 🔥 Hỏa | mcq |
| `civ-tolerance` | Khoan dung | 🔥 Hỏa | mcq |
| `civ-community` | Tích cực tham gia các hoạt động cộng đồng | 🔥 Hỏa | mcq |
| `civ-fairness` | Khách quan và công bằng | 🪨 Thạch | mcq |
| `civ-peace` | Bảo vệ hoà bình | 🪨 Thạch | mcq |
| `civ-time-management` | Quản lí thời gian hiệu quả | 🔥 Hỏa | mcq |
| `civ-adaptability` | Thích ứng với thay đổi | 🔥 Hỏa | mcq |
| `civ-smart-consumer` | Tiêu dùng thông minh | 🔥 Hỏa | mcq |
| `civ-law-violation` | Vi phạm pháp luật và trách nhiệm pháp lí | ❄️ Băng | mcq |
| `civ-business-tax` | Quyền tự do kinh doanh và nghĩa vụ nộp thuế | ❄️ Băng | mcq |

**Tổng: 10 nhóm chuyên đề GDCD** (1 bài = 1 chuyên đề).

---

#### 9.3.4 Môn Phái Công Nghệ (`technology`)

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
> Công nghệ lớp 9 GDPT 2018 gồm 2 phần: **Định hướng nghề nghiệp** (lí thuyết) + **Trải nghiệm nghề nghiệp** (thực hành lắp đặt mạch điện, STEM).

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
| `tech-career-jobs` | Nghề nghiệp trong lĩnh vực kĩ thuật, công nghệ | 🔥 Hỏa | mcq |
| `tech-career-education` | Giáo dục kĩ thuật, công nghệ trong hệ thống GDQD | 🪨 Thạch | mcq |
| `tech-career-market` | Thị trường lao động kĩ thuật, công nghệ tại Việt Nam | 🔥 Hỏa | mcq |
| `tech-career-choice` | Lựa chọn nghề nghiệp trong lĩnh vực kĩ thuật, công nghệ | 🔥 Hỏa | mcq |
| `tech-circuit-install` | Mô đun lắp đặt mạng điện trong nhà — Thiết bị, Quy trình, An toàn | ❄️ Băng | mcq |

**Tổng: 5 nhóm chuyên đề Công Nghệ.**

---

#### 9.3.5 Môn Phái Tin Học (`informatics`)

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
> Tin học lớp 9 GDPT 2018 tổ chức theo chủ đề A–G (35 tiết/năm). Các bộ sách khác nhau có tên chương khác nhau nhưng cùng khung chủ đề.

| ID | Nhãn (Chủ đề) | Hầm | Dạng câu |
|:---|:---|:---:|:---|
| `inf-digital-world` | Chủ đề A — Máy tính và cộng đồng: bộ xử lí thông tin, ứng dụng thực tế | 🔥 Hỏa | mcq |
| `inf-data-manage` | Chủ đề C — Tổ chức lưu trữ, tìm kiếm, trao đổi thông tin; chất lượng thông tin | 🪨 Thạch | mcq |
| `inf-ethics-law` | Chủ đề D — Đạo đức, pháp luật và văn hoá trong môi trường số | 🪨 Thạch | mcq |
| `inf-digital-tools` | Chủ đề E — Ứng dụng tin học: Bảng tính nâng cao, Trình chiếu, Biên tập video | 🔥 Hỏa | mcq |
| `inf-algorithm` | Chủ đề F — Giải quyết vấn đề với máy tính: Thuật toán, Lập trình | ❄️ Băng | mcq, short-answer |
| `inf-career` | Chủ đề G — Hướng nghiệp với tin học: Nghề phần mềm, Đa phương tiện | 🔥 Hỏa | mcq |

**Tổng: 6 nhóm chuyên đề Tin Học.**

---

#### 9.3.6 Môn Phái Nghệ Thuật (`arts`)

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
> Nghệ thuật lớp 9 GDPT 2018 gồm 2 phân môn: **Âm nhạc** (hát, nhạc cụ, lí thuyết, thường thức) + **Mĩ thuật** (tạo hình, ứng dụng, thường thức). 35 tiết/năm mỗi phân môn.

| ID | Nhãn | Hầm | Dạng câu |
|:---|:---|:---:|:---|
| `art-music-theory` | Âm nhạc — Lí thuyết: Quãng, Hợp âm, Nhịp, Tiết tấu | 🪨 Thạch | mcq |
| `art-music-composers` | Âm nhạc — Thường thức: Nhạc sĩ tiêu biểu VN & Thế giới | 🔥 Hỏa | mcq |
| `art-music-listening` | Âm nhạc — Nghe và nhận biết tác phẩm (nhạc cụ, phong cách) | 🔥 Hỏa | mcq |
| `art-visual-figure` | Mĩ thuật tạo hình — Kí họa dáng người, Nhân vật & Sân khấu | ❄️ Băng | mcq |
| `art-visual-apply` | Mĩ thuật ứng dụng — Thiết kế thời trang, Nhận diện thương hiệu, Bìa sách | 🔥 Hỏa | mcq |
| `art-visual-history` | Mĩ thuật thường thức — Nghệ thuật Đương đại VN & Thế giới | 🪨 Thạch | mcq |

**Tổng: 6 nhóm chuyên đề Nghệ Thuật.**

---

### 9.4 Bảng Tổng Hợp Quy Mô Core Knowledge

> ✅ Đã đính chỉnh dựa trên nghiên cứu chương trình GDPT 2018 thực tế (Lịch Sử tăng 1 chuyên đề, GDCD tăng 4 chuyên đề so với bản nháp đầu).

| Môn Phái | Nhóm | Số Chuyên Đề | Tổng Câu Hỏi Tối Thiểu (ước tính) |
|:---|:---:|:---:|:---:|
| 🇬🇧 Tiếng Anh | Chuyên Sâu | 19 | ~450 câu |
| 📐 Toán Học | Chuyên Sâu | 18 | ~300 câu |
| 📖 Ngữ Văn | Chuyên Sâu | 13 | ~200 câu |
| 🧪 Khoa Học Tự Nhiên | Cơ Bản | 14 | ~280 câu |
| 🗺️ Lịch Sử & Địa Lý | Cơ Bản | 11 | ~220 câu |
| ⚖️ Giáo Dục Công Dân | Cơ Bản | 10 | ~200 câu |
| 🛠️ Công Nghệ | Cơ Bản | 5 | ~100 câu |
| 💻 Tin Học | Cơ Bản | 6 | ~120 câu |
| 🎨 Nghệ Thuật | Cơ Bản | 6 | ~120 câu |
| **Tổng cộng** | — | **102 chuyên đề** | **~1.990 câu** |

---

### 9.5 Quy Tắc Liên Kết Core Knowledge → Page Cấp 2 (Gatekeeper)

Mỗi **Page Cấp 2** (Hầm nguyên tố trong Hang Luyện Công — §2.8.3) được liên kết với một tập con chuyên đề Core Knowledge theo **bản chất kỹ năng**:

| Hầm Nguyên Tố | Bản chất kỹ năng | Ví dụ chuyên đề |
|:---|:---|:---|
| 🔥 **Hỏa Hầm** | Phản xạ nhanh, Ghi nhớ ngắn hạn, Nhận diện | `eng-pronunciation`, `eng-stress`, `eng-vocabulary-topic`, `math-statistics`, `math-real-world-percent`, `sci-chem-metal` |
| ❄️ **Băng Hầm** | Suy luận logic sâu, Điềm tĩnh, Đọc hiểu, Chứng minh | `eng-conditional`, `eng-reading-passage`, `math-quadratic-function`, `math-plane-geometry-circle`, `sci-bio-genetics-mendelian` |
| 🪨 **Thạch Hầm** | Kiến thức nền tảng cứng, Quy tắc, Công thức | `eng-tenses`, `eng-word-form`, `math-radicals`, `lit-vietnamese-word-class`, `sci-phy-electricity` |

**Quy tắc Gatekeeper Question (§2.8.7):**
- Câu hỏi người gác cổng (Gatekeeper) khi Môn Sinh muốn vào khu vực mờ sương **bắt buộc phải thuộc nhóm chuyên đề** được gán cho Hầm đó.
- Độ khó Gatekeeper: chuẩn hóa **2/5** — câu công thức / định nghĩa / định luật cốt lõi của đúng Tầng lớp học + Môn phái (thống nhất với §2.8.7).
- Mỗi câu Gatekeeper chỉ dùng dạng **MCQ (trắc nghiệm)** — không dùng Wordform hay tự luận.
- **Luật giữ nguyên câu hỏi khi sai (Retry-Same-Question):** Trả lời sai **không** đổi sang câu hỏi khác — hệ thống chỉ báo sai, giữ nguyên `Question` hiện tại, để con tự chọn lại đáp án và bấm Giải Mã lại cho tới khi đúng. Việc chọn câu hỏi khác (`pickGatekeeperQuestion`) chỉ chạy **một lần khi mở modal**, không chạy lại sau mỗi lần trả lời sai.
- **Luật xác nhận khi đúng (Explain-Before-Continue):** Trả lời đúng không tự động đóng cổng ngay — hiển thị màn xác nhận có kèm `Question.explanation` (vì sao đáp án đó đúng) và yêu cầu con bấm nút tiếp tục ("Tiến vào ngay") mới thực sự vào khu vực.

**Băng độ khó (Difficulty Band) — dùng chung cho phân loại Gatekeeper:**

| Băng | Khoảng `difficulty` (thang 1-10) | Dùng cho Gatekeeper? |
|:---|:---|:---|
| Dễ | 1-3 | ✅ |
| Vừa | 4-5 | ✅ |
| Khó | 6-10 | ❌ |

**Câu hỏi "đủ điều kiện Gác Cổng" (Gatekeeper-eligible)** — tiêu chí chính thức để một câu hỏi trong ngân hàng được đưa vào vòng random của Người Gác Cổng (implement tại `isGatekeeperEligible()` trong `src/utils/gatekeeper.ts`):
1. Dạng **MCQ** (`type: 'mcq'` hoặc `'multiple_choice'`).
2. Độ khó thuộc băng **Dễ hoặc Vừa** (1-5/10) — không lấy câu Khó.
3. Đã gắn **`topicId`** hợp lệ thuộc Core Knowledge taxonomy (khác `'misc'`) — đảm bảo tính kiến thức cốt lõi.

Môn phái của câu hỏi (`subject`) mặc định là **`english`** nếu không gắn tường minh — quy ước này áp dụng thống nhất ở mọi nơi lọc theo môn phái (Gatekeeper, PlayArea), vì phần lớn ngân hàng câu Tiếng Anh cũ chưa từng gắn `subject`.

**Chọn câu theo 2 tầng (`pickGatekeeperQuestion`):** Tầng 1 ưu tiên câu đủ điều kiện đúng Hầm nguyên tố của khu vực; nếu Hầm đó chưa có đủ câu, Tầng 2 nới ra toàn bộ câu đủ điều kiện của môn phái (không phân biệt Hầm). Chỉ khi môn phái hoàn toàn không có câu nào đủ điều kiện mới dùng câu tạm thời (placeholder) — Hiệu Trưởng/Giáo viên cần bổ sung ngân hàng câu hỏi cho môn/hầm đó khi thấy placeholder xuất hiện thường xuyên.

**Thống kê & CRUD:** Màn Vạn Quyển Các (Kho Ngân Hàng Câu Hỏi, dành cho Giáo viên & Hiệu Trưởng) phải hiển thị: (a) số câu đủ điều kiện Gác Cổng theo từng môn phái + theo từng Hầm nguyên tố, và (b) bộ lọc riêng để xem/quản lý các câu đủ điều kiện Gác Cổng trong CRUD ngân hàng câu hỏi.

---

### 9.6 Quy Tắc Import Đề vào Core Knowledge (Mở Rộng §4.1)

Ngoài các quy tắc AI Ingest (§4.1), khi Hiệu Trưởng import câu hỏi vào ngân hàng, hệ thống bắt buộc phải:

1. **Tag chuyên đề (`topicId`):** Mỗi câu hỏi phải được gán ít nhất một `CoreKnowledgeTopic.id` từ taxonomy §9.2–9.3. Câu hỏi không tag chuyên đề sẽ được xếp vào nhóm `misc` và **không** xuất hiện trong Gatekeeper cũng như AI Sư Phụ gợi ý.

2. **Kiểm tra `examRelevance`:** Khi Hiệu Trưởng import đề từ file Word/PDF, AI phân tích và đề xuất `examRelevance` (HIGH/MEDIUM/LOW) dựa trên tần suất xuất hiện trong các đề tuyển sinh/HK gần nhất.

3. **Phân loại `hamNguyenTo` tự động:** Hệ thống tự động gán `hamNguyenTo` dựa trên `topicId` theo bảng gán §9.5. Hiệu Trưởng có thể override.

4. **Cảnh báo thiếu câu hỏi (Coverage Alert):** Nếu một chuyên đề có `examRelevance = 'high'` nhưng số câu trong DB < `minQuestions`, Bảng Quản Trị (Thiên Cơ Các §2.6) hiển thị cảnh báo đỏ nhắc Hiệu Trưởng bổ sung.


