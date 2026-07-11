# CORE_SPECS.md Audit & Refactor Tracker

Đối chiếu từng ý của `CORE_SPECS.md` với code thực tế. Cập nhật trạng thái khi sửa xong.
Trạng thái: `[ ]` chưa làm · `[x]` đã sửa · `[~]` đã sửa một phần · `(TODO-tương lai)` việc lớn, chưa làm ngay, có đề xuất.

Nguyên tắc: KHÔNG xóa tính năng. Ưu tiên nâng cấp/refactor/enable trước, việc quá lớn thì ghi TODO rõ ràng.

---

## Đợt cập nhật: Header HUD + bug "rồng" + TODO Môn Chủ Hỏi Tội

- [x] **Header (TopHUD) rối, box chồng lấn, cao thấp không đều.** Viết lại toàn bộ TopHUD.tsx: gộp Khối Định Danh (avatar+tên+rank+XP+Chân Khí) và Khối Tài Nguyên (Tim/NP/Chuỗi/Ví) thành 2 box cùng chiều cao (h-14), nav Bách Hóa/Hang Luyện Công rút gọn icon, nút Thân Phận mang chấm màu môn phái, Đăng Xuất đổi tên "Thoái Ẩn Giang Hồ". Đã kiểm chứng qua DOM bounding-box: không overlap, không tràn hàng ở cả desktop (1280px) và mobile (390px).
- [x] **Đổi môn phái dồn hẳn về Thân Phận, bỏ dropdown ở HUD** — user xác nhận qua AskUserQuestion. Đã sửa CORE_SPECS §1.3 khớp lại với §7.4 (trước đó 2 mục mâu thuẫn nhau).
- [x] **Bug: còn sót chữ "rồng"/🐉 dù pet đã đổi thành Heo Maikawaii.** Sửa: ParentConsole.tsx (nhãn "Cấp độ rồng:" → "Cấp độ Heo:", `pet.stage.toUpperCase()` lộ "DRAGON" → map qua `PET_STAGE_LABELS` mới thêm ở types/game.ts), RelaxationZone.tsx (minigame "Giải Cứu Rồng" → "Giải Cứu Heo Maikawaii", mọi text "Rồng nhỏ" → "Heo Maikawaii"), App.tsx (icon bottom-nav Pet 🐉→🐷). Icon 🐉 ở rank "Đại Hiệp" (§7.2) KHÔNG đổi vì đó là biểu tượng đẳng cấp wuxia, không liên quan pet.
- [ ] **(TODO-tương lai, đã ghi vào CORE_SPECS §3.A mục D + §7.1) Cơ chế "Môn Chủ Hỏi Tội"** — chặn nút Bỏ qua bằng hộp thoại chọn lý do (Quá khó/Quá dài/Quá khùng) + mức độ 1-5, giới hạn 3 lượt Bỏ qua/ngày toàn app, Viện Chủ xem review ở Vạn Quyển Các. Đã tạo 4 task riêng (Task #16-19) để triển khai đợt sau, CHƯA code.
- [x] **Phát hiện phụ: CORE_SPECS.md §2.5 (Pet Sanctuary Album) bị lỗi nội dung trùng lặp/xáo trộn** (dòng 106-111 của bản commit 6224dcd — một đoạn của §2.7 Cẩm Nang bị chèn lẫn vào giữa mục Album Kỷ Niệm, có vẻ do một lần sửa file trước đó bị lỗi). Đã dùng `sed` xóa khối trùng lặp và khôi phục lại đúng 1 bản sạch của mục Album Kỷ Niệm, đối chiếu §2.7 vẫn nguyên vẹn không mất nội dung.

---

## Đợt cập nhật: Cơ chế "Thú Về Chuồng" (Pet Stable & Overlay) — TODO-tương lai

- [ ] **(TODO-tương lai, đã ghi vào CORE_SPECS §2.5 mục "Cơ Chế 'Thú Về Chuồng'" + §5 mục "Bố cục 'Chuồng Heo'") Heo Maikawaii chiếm diện tích cố định (`aside w-72`), gây xao nhãng.** Ý tưởng cốt lõi (user, phân tích đầy đủ 5 góc theo GLOBAL RULE):
    - *Layout:* bỏ cột `aside` cố định trong App.tsx; thay bằng 1 nút "Chuồng Heo" neo góc màn hình (fixed) + overlay đè lên layout khi heo xuất hiện — không đẩy lệch bố cục các trang khác.
    - *Rule:* 5 trigger xuất hiện — chào sau khi đóng Cẩm Nang lúc đăng nhập (1 lần), triệu hồi thủ công, nhắc học khi idle ~5 phút, nhắc ngủ lặp lại mỗi 5 phút sau 22:00 local, đòi ăn khi đói (dựa `lastFed`). Không có nút đóng — chỉ thoát bằng cho ăn/tương tác/thọt lét. Mọi trigger tự động bị hoãn trong lúc đang thi đấu, dồn lại và bung ra khi về Sơn Trang.
    - *Content:* cần thêm lời thoại mới cho từng loại trigger (chào/nhắc học/nhắc ngủ/đòi ăn), cập nhật các trang Cẩm Nang/help liên quan đến pet để không gây bối rối vì thiếu nút đóng.
    - *Admin:* không phát sinh thay đổi cho ParentConsole (view mood/lastFed hiện tại giữ nguyên).
    - *UI/logic architecture:* cần bộ state mới (idle timer, hàng đợi trigger theo độ ưu tiên, khóa trigger khi đang trong trận), component `PetOverlay` tách khỏi `PetSanctuary` hiện tại (tái sử dụng chứ không xóa), và re-layout GameMap/ItemShop/HangLuyenCong/RelaxationZone để lấp khoảng trống sau khi bỏ `aside`.
    - Đã tạo 7 task riêng (Task #21-27) để triển khai đợt sau, CHƯA code — đúng theo GLOBAL RULE "phân tích trước, viết todo, hỏi khi conflict với core specs" (mục này không conflict, chỉ mở rộng §2.5/§5 nên cập nhật thẳng, không cần hỏi lại).
- [x] Task #21-26 sau đó đã được code và merge (`PetStableOverlay.tsx`) — xem đợt "Bug pet đói lặp liên tục" bên dưới cho các fix runtime phát sinh sau khi triển khai.

---

## Đợt cập nhật: Gộp Cẩm Nang vào Heo (Gatekeeper) + bỏ trigger ngủ + dọn tàn dư "Dragon"

Bối cảnh: sau khi Task #21-26 lên production, phát sinh 2 việc — (1) bug heo đói/idle/ngủ bật lặp gần như liên tục do mỗi trigger có cooldown riêng không liên thông (đã fix runtime bằng `lastAutoTrigger` dùng chung, xem commit `c97f975`), và (2) user yêu cầu phân tích tiếp 3 ý tưởng đơn giản hóa. Đã phân tích đủ 5 góc theo GLOBAL RULE, user xác nhận đồng ý cả 2 điểm mở trước khi cập nhật spec:

- [x] **Dọn tàn dư "Dragon" trong tài liệu.** Code đã dùng đúng key `'adult'` (`types/game.ts`) từ trước, chỉ còn CORE_SPECS.md §2.5 dòng chú thích `(Dragon)` và 2 dòng TODO trong file audit này gọi nhầm "stage Dragon" — đã sửa thành `(Adult)`/"stage Adult". Icon 🐉 ở Boss Battle (Arena.tsx) và rank "Đại Hiệp" (§7.2) KHÔNG đổi — không liên quan tới pet, là biểu tượng riêng của 2 tính năng khác.
- [x] **Gộp Cẩm Nang Bí Lục (§2.7) vào Heo làm "Người Gác Cổng" (§2.5).** User chọn "đồng bộ" (bỏ luôn nút "Đã Lĩnh Ngộ" riêng, áp dụng đúng 1 luật dismiss duy nhất cho mọi trigger kể cả gác cổng) và "gộp cả 2" (cả Login Trigger lẫn Logout Trigger đều chuyển qua Heo, không chỉ Login). Cập nhật CORE_SPECS §2.5 (2 trigger mới "Gác Cổng lúc đăng nhập"/"Gác Cổng lúc đăng xuất" thay cho "Chào khi đăng nhập" đơn lẻ) và §2.7 (bỏ mô tả modal-sách-độc-lập-với-nút-Đã-Lĩnh-Ngộ, chuyển thành "Heo mang trang cẩm nang ra trong overlay"). Thân Phận (chế độ lật xem toàn bộ sách) giữ nguyên không đổi. Admin (Ngân Các nạp trang cẩm nang) không đổi luồng, chỉ cập nhật câu mô tả.
- [x] **Bỏ trigger "nhắc ngủ" (sau 22h).** Xóa khỏi CORE_SPECS §2.5 (mục 4 cũ) và §5 "Bố cục Chuồng Heo" để giảm độ phức tạp — còn lại 5 trigger: gác cổng đăng nhập, gác cổng đăng xuất, triệu hồi thủ công, idle, đói.
- [x] Thêm mục "Chống dồn dập (anti-spam)" vào §2.5 để chính thức hóa cơ chế cooldown chung `lastAutoTrigger` đã fix runtime trước đó (trước giờ chỉ có trong code, spec chưa ghi).
- Đã tạo các task riêng để triển khai code cho đợt này (xóa nhánh sleep trong `PetStableOverlay.tsx`, chuyển login/logout handbook-gate từ `GiangHoCamNang` modal độc lập trong App.tsx sang overlay Heo, xóa/deprecate 2 state `isHandbookOpen`/`isLogoutHandbookOpen` khi không còn dùng nữa) — CHƯA code, chờ lệnh tiếp theo.

---

## §1. Role Model & Sect Isolation

- [x] **1.2b Auto-hide admin khỏi student list/leaderboard.** Đã lọc `role !== 'admin'` trong tab Thiên Cơ Các (ParentConsole.tsx, biến `nonAdminStudents`) cho cả 4 số liệu tổng quan lẫn mini-leaderboard. Chính Điện (quản lý tài khoản) vẫn cố tình hiện đủ mọi role vì đó là nơi thăng/hạ cấp — đúng theo spec 1.2b chỉ yêu cầu ẩn khỏi "danh sách học sinh"/leaderboard, không phải khỏi quản trị tài khoản.
- [x] **1.3a ActivityLog không lọc theo môn phái.** Đã thêm field `subject?: SubjectId` vào `HistoryLog` (types/game.ts), `logActivity()` tự stamp `get().currentSubject` (useGameState.ts), `ActivityLog.tsx` lọc theo `currentSubject` (log cũ chưa có subject vẫn hiện ở mọi môn phái để không mất lịch sử).
- [ ] **1.3b Có 2 bộ chuyển môn phái (không phải 1 Global Switch duy nhất).** TopHUD.tsx:24-134 (đúng spec) + ProfileThemeModal.tsx:100-315 (switcher thứ 2, trùng chức năng). Để nguyên — đây là quyết định UX cần cân nhắc kỹ hơn (không phải bug rõ ràng, Profile switcher tiện cho luồng "đổi môn rồi vào luôn Hang Luyện Công" ở §7.4 exit-gates). Giữ lại, đánh dấu theo dõi UX riêng, không sửa vội.
- [x] **1.3c Banking modal không khóa theo `selectedSect` đang chọn.** Đã khóa `editSubject` theo `selectedSect` (disable dropdown + khóa giá trị khi mở modal sửa câu hỏi trong ngữ cảnh Vạn Quyển Các), đồng thời mở rộng dropdown hiển thị đủ 9 môn phái (dùng `SUBJECTS_CONFIG`) thay vì hardcode 3 môn.
- [ ] **(TODO-tương lai) Ngân hàng câu hỏi cho 6 môn Cơ bản chưa có UI "Thêm câu hỏi mới"** — phát hiện thêm khi sửa: Vạn Quyển Các hiện KHÔNG có nút tạo câu hỏi mới nào cả (chỉ Sửa/Xóa câu đã có), nên CRUD thực chất chỉ có RUD. Đề xuất: thêm nút "+ Thêm câu hỏi" mở modal edit ở trạng thái blank với `subject = selectedSect`, dùng chung form đã có.

## §2.1 + §3 Arena & Gamification Economy

- [x] **Survival hết tim vẫn hiện "CHINH PHỤC THÀNH CÔNG".** Đã sửa `isDefeat` (PlayArea.tsx) để bao gồm cả `mode==='survival'`, tiêu đề/nội dung tách riêng "TẨU HỎA NHẬP MA - SINH TỒN/BOSS THẤT BẠI".
- [x] **Combo mốc sai:** đã đổi ngưỡng từ combo>=10/20/30 sang combo>=3/6/9 (đúng liên tiếp 3 câu là mốc đầu, tăng theo bội số 3) — useGameState.ts.
- [x] **Rương Báu Ải: mất hẳn điều kiện 90% accuracy.** `masterLesson` nay nhận thêm `accuracyRatio`, chỉ cộng +20 NP khi >=90%. PlayArea theo dõi `sessionAnswered`/`sessionCorrect` trong suốt phiên và truyền qua `onFinish({accuracyRatio})` → App.tsx → `masterLesson`.
- [x] **Boss Battle: đã có +150 XP khi thắng + nhân đôi XP mỗi câu đúng trong trận + VND thưởng nóng.** Action mới `completeBossVictory()` (useGameState.ts) cộng +150 XP và random 10.000đ/15.000đ/20.000đ vào walletVND, tự trigger qua `useEffect([runFinished])` trong PlayArea khi Boss thắng (không phải hết tim). `answerQuestion` nhân đôi `expGained` khi `gameMode==='boss'`.
- [x] **Chi phí Chân Khí sai số:** default `challengeEnergyCosts` đổi thành `[30,30,30,30]`, Boss papers (GameMap.tsx) đổi từ 20-25 thành 100 đồng loạt cho cả 3 môn phái. ParentConsole Ngân Các default cũng đồng bộ theo.
- [x] **"Tẩu Hỏa Nhập Ma": đã có logic giảm 50% XP/NP + Pet -5 năng lượng (mood='sad').** Action mới `applyDefeatPenalty(coinsEarnedInRun, xpEarnedInRun)` thu hồi lại 50% những gì vừa cấp trong trận khi hearts=0 (Boss/Survival), reward card ở màn kết quả hiển thị đúng số đã bị giảm một nửa thay vì ẩn hẳn.
- [x] **"Phế Bỏ Võ Công": phạt -50NP trễ hơn spec.** Đã bỏ điều kiện `diffDays>=3`, phạt ngay khi streak reset (diffDays>1) — useGameState.ts `checkDailyReset`.
- [x] **Relaxation rewards sai số:** Flashcard sửa thành 2NP/5XP; Match Pairs sửa thành 10NP/20XP — cả `awardCoinsAndXp(...)` lẫn text hiển thị trong UI (nút, banner chiến thắng) đã đồng bộ theo số mới.
- [x] **"Đàm đạo Linh Sư (AI Chat)" (+30XP/+15NP):** áp dụng số thưởng này cho vòng lặp Giảng-Dạy AI hiện có (`handleCounterAnswerSubmit`, RelaxationZone.tsx) vì đây là tính năng tương tác-AI gần nhất với mô tả spec. Quyết định đặt tên/tách tab riêng để rõ ràng hơn vẫn để ngỏ (xem TODO §2.3).
- [x] **Cho Pet ăn miễn phí — không trừ NP/XP như spec, không có tụt Level.** `feedPet()` nay trừ 50 NP + 30 XP, có thể khiến Level tụt tạm thời (thuật toán de-level ngược với công thức lên cấp `level*200`), trả về `boolean` để UI báo lỗi khi không đủ NP. PetSanctuary hiển thị chi phí trên nút bấm + toast lỗi khi thiếu NP.
- [ ] **(TODO-tương lai, việc lớn) "Kỳ Ngộ Giang Hồ" (5% random event) hoàn toàn chưa cài đặt** — chỉ có text mô tả, không có `Math.random()` trigger nào gắn với login/hoàn thành bài luyện tập Hang Luyện Công. Đề xuất triển khai: (1) thêm action `rollGiangHoEvent()` gọi tại 2 điểm — ngay sau đăng nhập thành công (App.tsx login effect) và sau khi hoàn thành 1 lượt luyện tập ở Hang Luyện Công (`masterLesson`/answerQuestion cuối phiên); (2) roll `Math.random() < 0.05`; (3) 50/50 giữa 2 loại: Linh Dược Kỳ Ngộ (+100 Chân khí hoặc +50 NP ngẫu nhiên) và Khảo Hạch Kỳ Ngộ (hiện modal 1 câu hỏi ngẫu nhiên tốc độ, đúng +100NP / sai -30 Chân khí hoặc -1 Tim); (4) cần 1 component modal mới `GiangHoEventModal` + state `activeGiangHoEvent` trong store.
- [ ] **(TODO-tương lai) VND Wallet: chưa có UI cấu hình "tỷ giá" Coins→VND riêng ở Ngân Các.** Hiện tại mỗi Phúc Lợi Gia Môn tự đặt `costCoins`/`cashValueVND` khi Viện Chủ tạo — đạt được hiệu quả kinh tế tương đương nhưng không phải một "tỷ giá toàn viện" như spec mô tả (vd 100 Coins = 10.000đ áp dụng chung). Đề xuất: thêm field `coinsToVndRate` vào `GameSettings`, dùng làm giá trị gợi ý mặc định khi Viện Chủ tạo Phúc Lợi mới (không bắt buộc đổi kiến trúc per-item hiện tại vì sẽ phá vỡ các phần thưởng đã cấu hình).

## §2.2 Hang Luyện Công & Mật Thất Biki

- [x] Sổ tay (Notes) & Nguồn tài liệu (Sources) — đã có đầy đủ, MATCH, không cần sửa.
- [x] **BikiHinhHocPhang thiếu "Tiếp tuyến" (tangent line).** Đã thêm tool `tangent` mới: click 1 điểm trên đường tròn → dựng đường thẳng qua điểm đó vuông góc với bán kính tại tiếp điểm (đúng định nghĩa hình học), có hướng dẫn lỗi khi hình chưa phải Đường tròn.
- [x] **Biki3DStudio vi phạm khung an toàn 800x560** — đã đổi viewBox từ `1000 640` sang `800 560`, đồng thời scale lại tâm chiếu (500,320→400,280) và hệ số phối cảnh/tỉ lệ (540/160→432/128) theo đúng tỉ lệ để mô hình 3D không bị vỡ bố cục.
- [x] **GeometryTool.tsx là dead code hoàn toàn (413 dòng), không được import ở đâu.** Xác nhận đây là bản phác thảo canvas tự do bị bỏ dở, chức năng đã bị `Scratchpad.tsx` (đang sống, có trong PlayArea) và Biki tools thay thế hoàn toàn — đã xóa file. Đổi tên biến `showGeometryTool` → `showBikiBoard` trong PlayArea.tsx cho đúng ý nghĩa (biến này bật/tắt Biki3DStudio/BikiHinhHocPhang, không liên quan file đã xóa).
- [x] **Mật Thất Biki hiện KHÔNG bị khóa theo môn Toán.** Đã bọc cả section "Mật thất nhanh" trong HangLuyenCong.tsx bằng điều kiện `selectedSubject === 'math'`. Toggle bảng vẽ hình trong PlayArea (`isGeometry`/`is3D`) đã tự gate theo `activeQuestion.subject === 'math'` từ trước — không cần sửa thêm.

## §2.3 Khu Thư Giãn (Relaxation Zone)

- [ ] **Chỉ có 9 tab thay vì 10 minigame** theo định hướng liệt kê trong spec — thực ra "Adventure Journey" đúng nghĩa (bản đồ thế giới mở, mở khóa theo chặng) CHƯA làm; tab "Hành Trình Du Khảo" hiện tại là bàn cờ tuyến tính 9 ô khác khái niệm. Bản thân UI cũng tự nhận "Đang Thiết Kế" cho World Map thật. => **(TODO-tương lai lớn)** Xây dựng Adventure Journey đúng spec (world map, unlock theo chặng/quốc đảo) — đề xuất: module riêng, tái dùng GameMap island-based UI đã có sẵn pattern.
- [ ] **SRS Flashcards không có spaced-repetition thật** — chỉ là flip-deck xáo trộn, "SRS" chỉ là tên gọi. (TODO-tương lai) Cài thuật toán SRS đơn giản (ease factor, next-review) — việc lớn, để sau, ghi rõ đề xuất dùng thuật toán SM-2 rút gọn.
- [x] **"Dạy học cho AI" (Teach the AI) đã code xong (bolted vào tab Explain to AI) nhưng roadmap card trong UI vẫn ghi "Đang Thiết Kế"** — đã sửa card thành "Đã Ra Mắt ✓" kèm ghi chú chỉ dẫn tính năng nằm trong tab "Giảng Cho AI". (TODO-tương lai, ưu tiên thấp: tách thành tab riêng biệt rõ ràng hơn thay vì gộp chung — chưa làm ở đợt này vì cần thiết kế lại UI luồng 2 bước.)
- [ ] **Cơ chế Fallback Học liệu hoàn toàn chưa có** — Match Pairs/Mindmap/Step Builder/Reading/Drag Diagram đều hard-type union `'math'|'english'|'literature'`, 6 môn Cơ bản (science, history_geography, civics, technology, informatics, arts) không tiếp cận được các minigame này, và không có auto-convert MCQ→match/flashcard, cũng không có ẩn-tab logic khi thiếu dữ liệu. Đây là gap kiến trúc rõ ràng nhất trong Relaxation Zone. (TODO-tương lai, việc lớn) Đề xuất: refactor 5 tab trên thành 1 content-loader chung nhận `SubjectId` bất kỳ, nếu subject không có `MATCH_PAIRS_DATA`/`STEP_DATA`/... cấu trúc riêng thì tự sinh từ `questions`/vocab bank hiện có (đúng như đề xuất của agent audit: "unify thành generic loader + fallback tự nhiên").
- [ ] Mindmap Builder hiện chỉ click-to-expand xem cây có sẵn, chưa có "tự kéo nối" (drag-to-connect) như spec mô tả. (TODO-tương lai) nâng cấp thành drag-and-drop connector thật.

## §2.4 + §2.5 Bách Hóa Phường & Sân Nuôi Thú

- [x] **🎭 Phong Vị KHÔNG nằm trong ItemShop, hiện miễn phí ở ProfileThemeModal.** Đã thêm `player.unlockedThemes`, action `buyTheme()` (200 NP/theme, 'current' luôn miễn phí), gate trong `setUiTheme()`. ItemShop.tsx có mục "🎭 Phong Vị" riêng để mở khóa/mặc theme; ProfileThemeModal.tsx hiển thị khóa 🔒 + giá trên thẻ theme chưa mở, bấm vào để mua trực tiếp tại chỗ.
- [ ] **(TODO-tương lai, ưu tiên thấp) Bandana ở stage Adult nhưng thiếu biến thể "nón lá"** (spec liệt kê khăn trán HOẶC nón lá) — có thể bổ sung thêm biến thể ngoại hình ngẫu nhiên/chọn được sau.
- [x] **`changePIN` action đã code xong trong store nhưng không được gọi ở đâu (dead code).** Đã thêm form "🔐 Đổi PIN bảo mật Viện Chủ" trong Chính Điện (ParentConsole.tsx), yêu cầu xác thực PIN cũ + PIN mới 4-6 số + xác nhận trùng khớp trước khi gọi `changePIN`.
- [x] **Cho pet ăn không trừ NP/XP** — đã sửa ở mục §3 phía trên (cùng 1 vấn đề, `feedPet`).

## §2.6 + §2.7 Bảng Quản Trị Viện Chủ & Cẩm Nang Bí Lục

- [x] **Chỉ có 4/5 khu vực Admin Console** — đã tách "👑 Thân Phận" thành tab độc lập thứ 5 (desktop tab bar + mobile bottom nav grid-cols-5). Bấm "Xem Hoạt Động" ở Chính Điện giờ điều hướng thẳng sang tab Thân Phận; nếu vào Thân Phận mà chưa chọn thiếu hiệp sẽ hiện empty-state hướng dẫn quay lại Chính Điện chọn trước.
- [x] **Không có UI đổi PIN** — đã thêm form "🔐 Đổi PIN bảo mật Viện Chủ" (collapsible) trong Chính Điện, dùng `changePIN` đã có sẵn trong store.
- [ ] **(TODO-tương lai, việc lớn) Không có UI "nạp đề thi bằng AI" (AI ingest) trong Vạn Quyển Các** dù help-text và nhãn "câu hỏi AI/import" ám chỉ tính năng này tồn tại — chỉ có Sửa/Xóa thủ công, thậm chí chưa có nút "Thêm câu hỏi mới" (xem thêm TODO tương tự ở §1). Đề xuất: xây form nạp đề dùng chung — textarea dán đề thô + gọi AI tách câu (backend đã có sẵn ingest logic ở server.ts:822-953) + preview trước khi lưu + nút "+ Thêm câu hỏi" thủ công dùng chung modal edit hiện có.
- [x] **VND wallet approval flow tham chiếu tab "Thành viên" không còn tồn tại** — đã sửa help text trỏ đúng "🏛️ Chính Điện".
- [ ] **(TODO-tương lai vừa, không cấp thiết) "Danh mục quà tặng" hiện là instance riêng theo từng học sinh, không phải catalog dùng chung** — cân nhắc refactor thành catalog toàn viện + gán riêng, tránh Viện Chủ phải tạo lại quà giống nhau cho từng thiếu hiệp.
- Handbook (Cẩm Nang): tổng thể MATCH tốt (12 trang, 3 chương, style, 2 trigger, free-browse). Không cần sửa lớn.
- [x] **Cẩm Nang phải đổi màu theo Phong Vị đang chọn (góp ý người dùng).** Đã thêm 15 CSS token `--handbook-*` per theme (index.css, cả 6 Phong Vị) thay cho màu giấy dó cố định; `GiangHoCamNang.tsx` chuyển toàn bộ sang class `bg-handbook-paper`/`text-handbook-ink`/... Theme mặc định (Nguyệt Dạ) giữ nguyên y hệt màu cũ để không phá trải nghiệm hiện có.
- [x] **Hợp nhất toàn bộ hệ thống Help ("?") khắp app vào Cẩm Nang Bí Lục (góp ý người dùng) — "cốt lõi Cẩm Nang là help/guide".** 23 mục `HELP_TOPICS` cũ (modal riêng `{title,bullets}` tách biệt) đã chuyển thành `HandbookPage` thật (`id: help-<topic>`), chia 3 category mới: "Trợ Giúp Nhanh" (8 trang, học sinh), "Trợ Giúp Quản Trị" (7 trang, chỉ Viện Chủ), "Trợ Giúp Dạng Câu Hỏi" (8 trang, chỉ Viện Chủ) — dùng field `audience` mới trên `HandbookPage` để lọc theo vai trò khi duyệt tự do. `showHelp(topic)` giờ mở thẳng `GiangHoCamNang` ở chế độ duyệt (không khóa, vẫn lật trang/đổi mục/đóng X được) thay vì modal `glass-panel` riêng biệt — đã xóa modal cũ trong App.tsx. Thêm `merge()` vào persist config để user cũ (đã có handbookPages 12 trang trong localStorage) tự bù các trang mặc định mới bị thiếu theo id, không mất dữ liệu cẩm nang tự thêm của Viện Chủ. Đã kiểm chứng trực tiếp: đổi Phong Vị → mở Cẩm Nang đổi màu đúng; bấm "?" ở TopHUD (học sinh) → mở đúng trang, chỉ thấy 4 category (không thấy 2 category Viện Chủ); bấm "Help" ở Vạn Quyển Các (Viện Chủ) → mở đúng trang, thấy đủ 6 category.

## §4 AI Engine

- [ ] **Không có endpoint chấm điểm AI cho Toán** (`/api/ai/grade-math` không tồn tại), chỉ có `/api/ai/grade-literature`. Toán tự luận hiện fallback về so khớp chuỗi chính xác — vi phạm spec "AI Chấm điểm Tự luận Văn & Toán". (TODO-tương lai, việc lớn) Xây endpoint grade-math tương tự grade-literature, điều chỉnh rubric cho phù hợp lời giải toán/chứng minh.
- [ ] **Ingest AI: không chặn việc bịa đáp án A/B/C/D cho câu tự luận** — schema JSON luôn có field `options` kể cả cho `short-answer`/`proof`; không có validation sau khi parse. Sửa: thêm hậu kiểm (post-parse validation) loại bỏ `options` khi `type` là short-answer/proof.
- [ ] **Ingest AI: không có logic bỏ qua câu chứng minh hình học phức tạp/tự luận dài không số hóa được** — Gemini trả gì lưu nấy. Cần thêm điều kiện lọc (có thể dựa vào length/keyword "chứng minh" + không có tọa độ số hóa được) trước khi persist.
- [ ] **Dedup chỉ so khớp chính xác (exact id / exact prompt string), không phải ngưỡng 95% similarity như spec.** Cần nâng cấp thuật toán so khớp gần đúng (ví dụ: tính độ tương đồng chuỗi qua Levenshtein/Jaccard trên tokens) trước khi cho phép lưu câu hỏi mới.

## §5 Visual Design

- [x] Biki3DStudio dùng viewBox 1000x640 thay vì 800x560 — đã sửa ở §2.2.
- [ ] **(TODO-tương lai, refactor kỹ thuật thuần túy, không phải bug) Màu neon 3 môn phái bị hardcode lặp lại ở >10 file** (GameMap.tsx, ParentConsole.tsx, TopHUD.tsx, ProfileThemeModal.tsx, PlayArea.tsx, Biki3DStudio.tsx, BikiHinhHocPhang.tsx, Scratchpad.tsx...) thay vì luôn tham chiếu `SUBJECTS_CONFIG[...].color`/CSS var. Giá trị hiện tại vẫn đúng ở mọi nơi (không có lệch màu thực tế) nên đây thuần là rủi ro bảo trì tương lai, không phải lỗi cần sửa gấp. Đề xuất khi có đợt refactor riêng: gom về 1 nguồn duy nhất (CSS custom properties hoặc hook `useSubjectColor()`), các nơi khác import thay vì hardcode lại hex — nên làm thành 1 đợt review riêng vì chạm >10 file cùng lúc, rủi ro hồi quy nếu làm vội trong đợt vá lỗi này.

## §7 Terminology & Ranks

- [x] STUDENT_RANKS / getStudentRankForLevel — khớp chính xác spec, không cần sửa.
- [x] Thuật ngữ vai trò (Viện Chủ/Đạo Sư/Khảo Quan/Linh Sư/Thiếu Hiệp) — nhất quán toàn bộ UI, không rò rỉ tên cũ.
- [x] **ParentConsole tự viết lại thang rank bằng tay (if/else) thay vì gọi `getStudentRankForLevel`** — đã thay bằng gọi hàm chuẩn `getStudentRankForLevel(lv)` trong bảng mini-leaderboard.
- [x] **Thưởng thăng hạng (rank-up) chỉ cộng Coin (100), không cộng XP** — đã bổ sung +100 XP khi thăng hạng (useGameState.ts `checkLevelUp`), có xử lý cascade nếu XP thưởng đẩy tiếp lên level mới.
- Sect Mastery (§7.4): formula, Nội Công, thời gian rèn luyện, 2 nút exit-gate — đều MATCH chính xác, không cần sửa.

---

## Tổng kết đợt refactor này (đã xong, type-check sạch toàn bộ)

- §1 Sect Isolation: ẩn admin khỏi leaderboard, ActivityLog lọc theo môn phái, khóa môn học trong banking modal (+ mở rộng đủ 9 môn).
- §3 Gamification Economy: combo mốc 3/6/9, Chân Khí 30/100, Rương Báu Ải 90%, Boss +150XP/x2XP/VND thưởng nóng, Tẩu Hỏa Nhập Ma giảm 50% + pet mood, Phế Bỏ Võ Công phạt đúng lúc, số liệu Relaxation Zone, feedPet tốn NP+XP có thể tụt Level.
- §2.2 Mật Thất Biki: thêm Tiếp tuyến, sửa khung 800x560 cho Biki3DStudio, khóa Mật Thất chỉ hiện môn Toán, xóa GeometryTool.tsx dead code.
- §2.4/2.5: Phong Vị tốn NP (unlockedThemes + buyTheme + UI khóa/mở ở cả Shop và Profile), enable PIN-change UI.
- §2.6: tách zone Thân Phận độc lập (desktop + mobile nav), sửa label "Thành viên" cũ.
- §2.3/§7: sửa roadmap card sai lệch (Teach the AI), dedupe rank ladder qua `getStudentRankForLevel`, bổ sung XP bonus khi thăng hạng.

## Việc lớn còn lại — đề xuất làm ở đợt sau (đã ghi rõ ở từng mục trên)

Ưu tiên đề xuất cho đợt kế tiếp, theo độ ảnh hưởng:
1. **§4 AI Engine** (việc lớn nhất, cần riêng 1 đợt): endpoint `/api/ai/grade-math`, guard chặn bịa đáp án A/B/C/D cho câu tự luận khi ingest, lọc câu không số hóa được, dedup theo ngưỡng tương đồng 95% (Levenshtein/Jaccard) thay vì exact-match.
2. **§2.3 Relaxation Zone kiến trúc**: cơ chế Fallback Học liệu cho 6 môn Cơ bản (refactor 5 tab hardcode-3-môn thành content-loader chung), Adventure Journey world-map thật, SRS thuật toán thật (SM-2 rút gọn), Mindmap drag-to-connect thật.
3. **§3 Kỳ Ngộ Giang Hồ**: hệ thống random event 5% khi login/hoàn thành bài — chưa tồn tại, cần action + modal mới.
4. **§2.6 Vạn Quyển Các**: UI nạp đề bằng AI (backend đã có sẵn logic, chỉ thiếu UI) + nút "Thêm câu hỏi mới" thủ công (hiện chỉ có Sửa/Xóa).
5. **§5 Color token consolidation**: gom màu neon 3 môn phái hardcode ở >10 file về 1 nguồn — thuần kỹ thuật, không phải bug, nên làm riêng 1 đợt review.

---

## Đợt cập nhật 2026-07-11: §3.2 Reward Catalog — xóa Ví VND toàn hệ thống (Task #35)

Bối cảnh: refactor lớn xóa hoàn toàn Ví VND/tỷ giá tiền mặt khỏi app (CORE_SPECS §3.2, quyết định "App sẽ không quản lý thông tin tiền nữa" — chỉ Phần Thưởng Thực Tế định giá NP, có số lượng giới hạn, trao ngoài đời qua nút "Đã Trao"). Đụng cả frontend lẫn backend.

- [x] **Data model:** `types/game.ts` — `ParentReward` bỏ `cashValueVND`/`status`, thêm `quantity`/`remainingQuantity` (catalog item thuần túy); `RewardRedemption` mới (1 lượt đổi cụ thể: `rewardId`, snapshot `rewardTitle`/`costCoins`, `status: 'pending'|'delivered'`, `deliveredAt`); `PlayerProfile.walletVND` xóa hẳn; `HistoryLog.walletChanged` xóa; `DailyMission.rewardVND` và `ParentQuest.rewardVND` xóa (quest giờ chỉ thưởng NP); `GameSettings.bossBountiesVnd` → `bossCompletionBonusNP` (bonus Điểm quảng bá trên Boss Card, Boss không thưởng tiền nữa).
- [x] **Store (3 slice):** `createPlayerSlice.ts` — `claimParentReward` → `redeemReward` (trừ NP + giảm `remainingQuantity` + tạo `RewardRedemption` pending); `spinWheel`/`openMysteryBox` bỏ nhánh `type: 'wallet'`, quy hết về NP; `completeBossVictory` bỏ `walletVND`, cộng NP theo `bossCompletionBonusNP` ngẫu nhiên. `createAdminSlice.ts` — `approveReward`/`rejectReward` → `markRewardDelivered`/`cancelRedemption` (không đụng tiền, chỉ đổi status + hoàn NP/remainingQuantity khi hủy); `addParentReward` nhận `quantity` thay `cashValueVND`; thêm `deleteParentReward`; `adminApproveReward`/`adminRejectReward`/`adminDeductWallet` (cross-user qua backend) → `adminMarkRewardDelivered`/`adminCancelRedemption`, xóa hẳn `adminDeductWallet`. `createAuthSlice.ts` — vá luôn 1 bug cũ không liên quan (gọi `logActivity(get, set, get, set, ...)` bị lặp đôi `get,set` khiến activityType nhận nhầm 1 function) khi sửa lại toàn bộ call site sau khi đổi chữ ký `logActivity` (bỏ tham số `wallet`).
- [x] **UI:** `ItemShop.tsx` — card Phúc Lợi hiện `Còn X/Y`, disable + "Hết Hàng" khi `remainingQuantity=0`, thêm block "Nhật ký đổi quà" hiển thị `rewardRedemptions` của chính mình. `ParentConsole.tsx` — form tạo quà đổi input "Giá trị VNĐ" → "Số lượng", thêm danh mục quà có nút xóa, 2 ledger đổi quà (tổng quan + trong hồ sơ từng con) chuyển từ status `approved/claimed` sang `pending/delivered` với nút "Đã Trao"/"Hủy hoàn NP"; xóa hẳn card "Ví tích lũy" + nút "Rút Tiền 💸" (grid 5 cột → 4 cột); 3 input Boss Bounty (VNĐ) → 3 input Bonus Boss (NP). `TopHUD.tsx` — xóa khối "Ví Thưởng" (icon Award + `walletVND`), gỡ import `Award`/`Heart` không dùng. `Arena.tsx` — thẻ Boss "Vàng săn thưởng: Xđ" → "Bonus hoàn thành: +X NP" theo `bossCompletionBonusNP[index]`. `WorldMap.tsx`/`ActivityLog.tsx` — bỏ hiển thị `rewardVND` ở Bảng Cáo Thị và Nhiệm vụ ngày.
- [x] **Backend:** `schema.sql` — drop `ge10_player_profiles.wallet_vnd`; `ge10_parent_rewards` drop `cash_value_vnd`/`status`, thêm `quantity`/`remaining_quantity`; bảng mới `ge10_reward_redemptions` (+ index theo `user_id`); `ge10_game_settings` seed key `boss_bounties_vnd` → `boss_completion_bonus_np` (xóa key cũ). `server.ts` — 2 endpoint GET profile (chủ tài khoản + admin xem học sinh khác) đồng bộ mapping reward catalog + redemptions, bỏ `walletVND` khỏi cả 2; POST `/api/profile/:id/sync` bỏ toàn bộ logic `mergedWallet`, thêm sync 2 chiều cho `rewardRedemptions`; 3 endpoint admin cũ (`approve-reward`/`reject-reward`/`deduct-wallet`) → 2 endpoint mới (`deliver-reward`/`cancel-redemption`), `deduct-wallet` xóa hẳn không thay thế; helper `loadBossBounties`/`saveBossBounties` → `loadBossCompletionBonusNP`/`saveBossCompletionBonusNP`; PUT `/api/admin/game-settings` đổi field `bossBountiesVnd` → `bossCompletionBonusNP`.
- [x] **Verify:** `npm run build` (frontend `tsc -b && vite build`) và `cd backend && npm run build` (`tsc`) đều xanh sau đợt sửa — không còn `walletVND`/`cashValueVND`/`rewardVND`/`wallet_vnd`/`cash_value_vnd` nào sót lại ngoài các dòng comment/migration cố ý (đã grep xác nhận toàn repo `src/` và `backend/src/`).
- [x] *(Đã sửa ở Task #36 bên dưới)* ~~`completeBossVictory` chọn bonus NGẪU NHIÊN...~~
6. Các mục nhỏ khác: ~~tỷ giá VND cấu hình toàn viện ở Ngân Các~~ *(đã hủy — Ví VND bị bãi bỏ toàn bộ, xem đợt 2026-07-10 bên dưới)*, danh mục quà tặng dùng chung thay vì per-student *(nay chính thức thành spec §3.2 Reward Catalog)*, biến thể "nón lá" cho pet stage Adult, tách tab riêng cho "Dạy học cho AI".

---

## Đợt cập nhật 2026-07-11 (2): Boss 5 câu/lượt + bonus khớp Boss Card (Task #36)

Bối cảnh: hoàn thiện nốt phần "Boss" của CORE_SPECS §2.1 — Boss đã hết thưởng tiền và có bonus NP quảng bá trên Boss Card từ Task #35, nhưng vẫn thiếu 2 việc cốt lõi: (1) mỗi lượt Boss vẫn rút tới ~30 câu thay vì đúng 5 câu (~1/5 đề) theo spec; (2) bonus NP thực nhận sau trận chọn NGẪU NHIÊN, không khớp số đã quảng bá trước trận trên Boss Card.

- [x] **`PlayArea.tsx` — đúng "5 câu/lượt, trích từ đề ~20 câu":** viết lại logic dựng pool câu hỏi cho `mode==='boss'`. Trước đó filter theo `source.includes(year)` rồi fill bù nếu thiếu, nhưng **không bao giờ cắt xuống `count`** khi pool đủ lớn (bug: có bao nhiêu câu khớp năm là chơi hết bấy nhiêu, có thể >30 câu một lượt). Sửa: `count = 5` cho boss; dựng "đề" bằng cách lấy ngẫu nhiên tối đa 20 câu khớp `source` (hoặc `tag` HK1/HK2 cho môn Cơ bản — trước đó bossId `b-hk1`/`b-hk2` bị rơi vào nhánh mặc định `'2026'`, một bug tồn tại từ trước, nay đã map đúng), rồi rút ngẫu nhiên đúng 5 câu từ "đề" đó để chơi.
- [x] **Boss Card & màn kết quả — bỏ nốt câu chữ tàn dư hệ Tim cũ:** "Chỉ 1 mạng duy nhất!" (nhắc tới hearts đã xóa ở Task #34) → "5 câu trích đề, sai 3 câu là thua!"; mô tả cụm Lôi Đài Thần Thú thêm rõ "5 câu... trong 20 phút".
- [x] **Bonus NP thực nhận khớp đúng số trên Boss Card:** `completeBossVictory` nhận thêm tham số tùy chọn `bonusIndex` (khớp index [dễ,trung bình,khó] trong `gameSettings.bossCompletionBonusNP`, giữ tương thích ngược — bỏ trống vẫn chọn ngẫu nhiên như cũ). `PlayArea.tsx` tính `bossBonusIndex` từ `bossId` (`b-2024`/`b-hk1`→0, `b-2025`/`b-hk2`→1, `b-2026`→2, khớp đúng thứ tự `bosses.map(...)` trong `Arena.tsx`) và truyền vào khi gọi.
- [x] **Verify:** `npm run build` xanh sau toàn bộ đợt sửa.
- [ ] *(Ghi nhận, không thuộc phạm vi Task #36)* Nếu sau này Viện Chủ muốn ngân hàng câu hỏi thực sự có đúng "20 câu/đề" cho từng năm/kỳ, cần rà soát `data/questions.ts` xem mỗi `source` (2024/2025/2026/HK1/HK2) đã đủ 20 câu tương ứng theo môn phái chưa — hiện logic chỉ lấy tối đa những gì có sẵn, không ép buộc đủ 20.

---

## Đợt cập nhật 2026-07-10: PM Review + Pivot "Đa Tầng Giáo Dục Phổ Thông" + Đại tu Kinh Tế

Bối cảnh: ClaudeCode thực hiện một đợt **PM review toàn bộ CORE_SPECS** (đánh giá logic game, tính gắn kết, tính thực dụng) → Viện Chủ ra 26 quyết định lớn. Toàn bộ đã merge vào CORE_SPECS + sub-specs. Song song, một phiên Gemini đã sửa CORE_SPECS (§1.2 trỏ SUB_SPEC_FAMILY_ROLE, Modal chuyển môn phái toàn cục, Sàn Game Hub, Bảng Cáo Thị, Môn Chủ Hỏi Tội bản mới không giới hạn skip, §2.7 revert về bản cũ) — các thay đổi đó được giữ nguyên và build tiếp lên trên.

### Nhóm 1 — Pivot chiến lược
- [x] **§1.1 Mission:** app không còn target riêng kỳ thi lớp 10 — mở rộng cho **toàn bộ giáo dục phổ thông** (focus cấp 2-3), hiện chỉ phát triển Tầng Lớp 9; riêng Toán/Văn/Anh lớp 9 kho kiến thức vẫn bám ôn tuyển sinh 10.
- [x] **§1.4 MỚI — Nguyên lý Tầng Thế Giới:** mỗi lớp = 1 tầng giang hồ; cô lập 100% mọi trang theo tầng (Tầng → Môn Phái → Nội dung); đổi tầng DUY NHẤT tại Thân Phận; Tầng 9 giữ 9 môn (3 cao + 6 cơ bản); tầng 10/11/12 chưa làm.
- [x] **§1.2:** ghi chú hệ Chủ Viện (admin) / Phó Viện (moderator) + nhiều phụ huynh đang được spec bên Gemini — chờ nạp SUB_SPEC_FAMILY_ROLE bản mới.
- [x] **§9:** taxonomy đóng dấu phạm vi Tầng Lớp 9, thêm định hướng field `gradeTier`.

### Nhóm 2 — Đại tu Kinh Tế (xóa tiền thật khỏi hệ thống)
- [x] **Bãi bỏ Ví VND + tỷ giá 100NP=10.000đ** (lạm phát, không người chi trả). §3.1 cũ → **§3.2 Phần Thưởng Thực Tế (Reward Catalog)**: phụ huynh tự tạo phần thưởng định giá NP (trà sữa 500NP, lì xì 10k/20k/50k...), **có số lượng giới hạn** (van ngân sách — ai đổi sớm lấy trước), chỉ con trong nhóm thấy; app KHÔNG quản lý tiền, trao thưởng ngoài đời qua nút **"Đã Trao"**.
- [x] **Boss không thưởng tiền:** điểm/câu + bonus hoàn thành lớn quảng bá trên Boss Card, mức do Chủ Viện/Phó Viện đặt. Boss = 5 câu rút từ ~20 câu trích của đề thật (~1/5 đề), 20 phút.
- [x] **Xóa hệ thống Tim sinh mệnh toàn app:** Survival = 3 lần sai/lượt (bộ đếm), Hồi Nguyên Đan xóa khỏi shop + tự điển, TopHUD bỏ Tim + Ví Thưởng.
- [x] **NP âm vô hạn** — không hành động nào bị chặn vì thiếu NP (giải deadlock skip); SUB_SPEC_XP_NP cập nhật.
- [x] **Streak:** bỏ phạt -50 NP; thưởng leo thang ngày 2 (+10) / ngày 3 (+20) / ngày 4+ (+30/ngày); mất chuỗi chỉ reset. (Luật Chuỗi Tinh Tấn, CORE §3.1 + SUB_SPEC_XP_NP §2.1)
- [x] **Xóa vĩnh viễn mâu thuẫn "cho heo ăn trừ XP"** ở §2.5 (2 chỗ) — feed chỉ tốn NP, khớp Luật Bất Cảm và khớp code (`feedPet` vốn chỉ trừ 20 NP).

### Nhóm 3 — Hợp nhất hệ cấp bậc & thước đo
- [x] **Luật Một Bảng (§7.2):** bảng XP→Level→Danh hiệu duy nhất, thêm cột XP tích lũy theo công thức code hiện hành (Level n→n+1 = n×200 XP); bảng "Cấp 1-5... Chưởng Môn" trong SUB_SPEC_XP_NP bị bãi bỏ.
- [x] **Luật Bất Thoái (§7.4.4):** đẳng cấp môn phái one-way, lưu `maxAchievedRank`, không tụt khi bank câu hỏi phình to.
- [x] **§3.3 MỚI — Phút Tu Luyện (North Star):** bài làm/bài đọc có `estimatedMinutes` quy định, game trả `timeSpent`, cộng dồn ngày/tuần theo học sinh/môn/tầng.
- [x] **§7.5 MỚI — Leaderboards theo vai trò:** Thiếu Hiệp (trong Thân Phận, phạm vi nhóm), Phụ huynh (các con), Phó Viện (phạm vi giao), Viện Trưởng (toàn viện) + quy tắc ẩn danh trẻ em; chờ đồng bộ thêm khi SUB_SPEC_FAMILY_ROLE mới về.

### Nhóm 4 — Heo, Gatekeeper, Chân Khí
- [x] **Heo = linh vật dẫn dắt duy nhất** (§2.5): mọi việc đồng hành đều do heo, không thêm nhân vật khác.
- [x] **§2.7 viết lại (lần 2):** gộp login/logout Cẩm Nang vào overlay Heo (bản Gemini revert về cũ đã được thay); +5 NP chuyển sang "cất heo về chuồng lần đầu/ngày tại Login Gate" *(đề xuất)*.
- [x] **Logout = "Rời Học Viện"** (thay "Thoái Ẩn") + Logout Gate là lời chào 1 chạm, không nhét nội dung dài (đồng ý theo phản biện PM).
- [x] **Gatekeeper question:** MCQ bắt buộc, độ khó chuẩn hóa **2/5**, kiến thức công thức/định nghĩa/định luật của đúng tầng + môn phái — sửa cả §2.8.7 lẫn §9.5 (hết mâu thuẫn "cực dễ" vs "3-5").
- [x] **Fog of War:** giữ nguyên chính kiến spec (trả lời sai vẫn trừ NP nhỏ) — Viện Chủ bác đề xuất "lần đầu miễn phí".
- [x] **SUB_SPEC_ENERGY.md MỚI (đề xuất v1):** maxEnergy do phụ huynh chỉnh (điều phối thời gian chơi), tiêu hao khi sinh điểm (ải -30, Boss -100, minigame -10, đọc/chăm heo miễn phí), về 0 thì nghỉ + heo thông báo (trigger `energy-depleted` — thêm vào danh sách trigger §2.5), reset đầy sau 2/3/5h do phụ huynh chọn (khuyến nghị Phương án A - reset trọn gói). **Các con số cần Viện Chủ duyệt.**
- [x] **§3.4 MỚI — Kỳ Ngộ Giang Hồ (TODO phân tích):** Page Cấp 3 đặc biệt, random, không sương mù; xuất hiện ở Daily / Đấu Trường (chơi nhanh) / Hang (học nhanh).
- [x] **AI Grading:** giữ nguyên + ghi chú roadmap function "Nhờ người chấm hộ" (Khảo Quan) — §4.2.5.

### Dọn cấu trúc tài liệu
- [x] Trả lại heading `##### 4. 🏮 Bách Hóa Phường` (bị mất khi chèn Bảng Cáo Thị).
- [x] Hết trùng số: mục Minimalism đổi thành §2.9 (giữ §2.8 cho Map Hierarchy); §3.1 thứ hai → §3.2.
- [ ] *(Nợ tồn)* Đánh số §2.2–§2.4 vẫn khuyết (module con của §2.1 dùng số 1-5); nhiều tham chiếu chéo kiểu "§2.5"/"§3.D" là quy ước ngầm — sẽ renumber trọn vẹn trong một đợt riêng để tránh diff nhiễu.

### Backlog refactor
Toàn bộ item triển khai code (kèm priority / độ khó / model đề xuất) đã được tạo trong task list phiên làm việc — xem các task mới #33+ (Tier isolation, xóa Tim, Reward Catalog, Boss points, Energy v2, Streak leo thang, NP âm, Rank thống nhất, Mastery one-way, Gatekeeper 2/5, Phút Tu Luyện, Leaderboards, Kỳ Ngộ analysis, terminology sweep). Task #18 cũ (giới hạn 3 skip/ngày) đã lỗi thời theo spec Môn Chủ mới (không giới hạn, trừ NP).
