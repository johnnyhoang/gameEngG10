# Handoff Context — GameEngG10

## 1. Trạng thái hiện tại (Current Status)
- **Vừa hoàn thành:** 
   - **Di dời dữ liệu tĩnh còn lại vào Database (Dynamic Fetching)**:
      - **Migration SQL**: Tạo các bảng và seed dữ liệu cho cẩm nang (`ge10_handbook_pages`), đảo kỹ năng (`ge10_english_island_items`) và ma trận đề thi các môn (`ge10_subject_exam_blueprints`).
      - **Phát triển API mới**: Endpoint `/handbook-pages`, `/english-island/items` và `/exam-blueprints?subject=...` để nạp động.
      - **Tải cẩm nang động**: Fetch động cẩm nang khi đăng nhập/selectProfile và bỏ logic merge tĩnh trong store.
      - **Dọn dẹp file tĩnh**: Xóa bỏ hoàn toàn 5 file tĩnh cũ (`handbookPages.ts`, `englishSkillDistricts.ts`, `mathExamBlueprint.ts`, `englishExamBlueprint.ts`, `literatureExamBlueprint.ts`).
   - **Dynamic Content Fetching (Nạp câu hỏi và bài giảng động - T9.2 & T11.3)**:
      - **Tối ưu hóa API Profile**: Gỡ bỏ các truy vấn database nặng đối với customQuestions và lessons trong endpoint `/api/profile/:id` (giảm 90% dung lượng payload tải về lúc mở app).
      - **Bổ sung API gộp**: Thêm endpoint `/api/learning-content/content/all` hỗ trợ lấy đồng thời câu hỏi và bài học theo `gradeTier` + `subjectId`.
      - **Tải động tại Frontend**: Tích hợp gọi API động khi chuyển đổi môn học/lớp học trong `setLearningContext` và ngay sau khi chọn hồ sơ/đăng nhập. Spinner chuyển đổi ngữ cảnh được đồng bộ chặt chẽ chỉ tắt sau khi dữ liệu tải xong.
   - **Nâng cấp động hóa Công Viên Thư Giãn cho mọi môn học**:
      - **Mở khóa Mini-games cơ bản**: Đăng ký các game cơ bản (`flashcards`, `match`, `mindmap`, `adventure`, `stepbuilder`, `reading`, `story`, `explain`, `dragdiagram`) là game global tại [registry.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/subject-modules/registry.ts), giúp mở khóa chúng trên giao diện cho mọi môn học (kể cả các môn Sử, Địa, Khoa học,...).
      - **Động hóa Ghép Cặp (MatchPairs)**: Trích xuất câu hỏi MCQ thực tế từ môn đang chọn để sinh các cặp thẻ ghép động `[Đề bài, Đáp án]`, kèm fallback rèn luyện tư duy học tập thông minh.
      - **Động hóa Du Khảo (Adventure)**: Lọc chính xác các câu hỏi trắc nghiệm MCQ theo môn đang học và gradeTier cho các ô trivia trên bản đồ.
      - **Động hóa RPG Story (Giải Cứu Heo)**: Cho phép ôn luyện sâu 3 màn liên tục chính môn phụ đang chọn thay vì khóa cứng Toán-Văn-Anh.
      - **Động hóa Sắp Xếp Trình Tự (StepBuilder)**: Bổ sung bộ quy trình học tập khoa học làm fallback khi môn học chưa cấu hình các bước giải.
   - **Chiến dịch Refactor nâng cao toàn app thành công**:
      - **Đồng bộ hóa ranh giới Subject Modules ở Frontend**: Tách logic AI grading của Toán tự luận ra khỏi `PlayArea.tsx` và đóng gói thành `assessMathShortAnswer` trong [assessment.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/subject-modules/math/assessment.ts), sau đó đăng ký vào manifest của Toán. Nhờ đó, luồng chấm điểm AI ở frontend được quy chuẩn hóa và thu gọn tuyệt đối thông qua `AssessmentProvider.assess`.
      - **Thiết lập hệ thống Backend Subject Modules**: Thiết lập giao ước `BackendSubjectModule` tại [contracts.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/subjectModules/contracts.ts), registry quản lý tập trung và di dời toàn bộ prompt AI Ingestion dài hàng trăm dòng ra khỏi router chung [ai.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/routes/ai.ts) vào các file [ingest.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/subjectModules/math/ingest.ts), [ingest.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/subjectModules/literature/ingest.ts), và [ingest.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/subjectModules/english/ingest.ts).
      - **Tối ưu hóa kết nối Database cho Serverless**: Tinh chỉnh [db.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/db.ts) để giới hạn pool tối đa (`max: 3` hoặc cấu hình qua `DB_POOL_MAX`) và đóng nhanh các kết nối nhàn rỗi (`idleTimeoutMillis: 10000`) nhằm thích ứng tốt và phòng chống lỗi cạn kiệt pool/deadlock kết nối trên Vercel Serverless.
   - **Build Verification**: Chạy `npm run build` thành công 100% không phát sinh lỗi biên dịch TypeScript hay Vite đóng gói trên toàn workspace (frontend & backend).
- **Task đang làm dở:** Không có.
- **Blockers:** Không có.
 
## 2. Bước tiếp theo (Next Steps)
- Khi có yêu cầu tính năng hoặc thay đổi nghiệp vụ mới:
   1. Thống nhất ý tưởng -> cập nhật các spec tương ứng (`CORE_SPECS.md`, `SUB_SPEC_*.md`).
   2. Ghi backlog kỹ thuật chi tiết vào `TODO.md` (bao gồm cả phân tích impacts, change requests, conflicts) và trình người dùng phê duyệt.
   3. Tiến hành code, tối ưu hóa token và thực hiện kiểm thử `npm run build`.
   4. Cập nhật file `HANDOFF.md` này để bàn giao cho phiên tiếp theo.
 
## 3. Lịch sử thay đổi gần đây (Recent Changes)
- **2026-07-17:**
   - **Di dời dữ liệu tĩnh còn lại vào Database:** Viết file SQL migration và seed dữ liệu tĩnh cẩm nang (`ge10_handbook_pages`), câu đố Đảo kỹ năng (`ge10_english_island_items`), ma trận đề các môn (`ge10_subject_exam_blueprints`) vào database. Bổ sung các API nạp động tương ứng và tháo gỡ hoàn toàn 5 file tĩnh cũ để tối ưu tài nguyên client.
   - **Dynamic Content Fetching (Nạp động câu hỏi/bài giảng):** Loại bỏ việc query tải sẵn hàng ngàn câu hỏi/bài học tĩnh khi chọn profile. Tích hợp tải động song song thông qua endpoint `/api/learning-content/content/all` khi chuyển đổi ngữ cảnh học tập (môn học, khối lớp), tối ưu hóa thời gian mở app gấp 10 lần.
   - **Nâng cấp động hóa Công Viên Thư Giãn:** Mở khóa các game cơ bản cho mọi môn học Sử, Địa, Khoa Học; động hóa Ghép Cặp bằng câu hỏi thực tế, lọc chính xác xúc xắc Du Khảo, ôn luyện sâu RPG Story theo môn phụ, và fallback Trình Tự Giải.
   - **Refactor nâng cao:** Hoàn thành module hóa Ingestion prompts ở backend, đồng nhất AI grading ở frontend qua module và tinh chỉnh DB pooling cho môi trường serverless.
   - Hoàn thiện CRUD Quà Trường, sửa hiển thị Sĩ Tử ở Member Roster, tự động liên kết Ban Giám Hiệu đồng hành và giữ Preview Mode khi di chuyển bài giảng trong Kho bài giảng.
   - Dọn dẹp liên kết nhanh dư thừa trên top nav cho học sinh và tối ưu layout cột đứng cho Sân Thú + Nhật ký MIKA trong Funzone.
   - Tích hợp kết xuất Markdown + KaTeX + Highlight.js cho bài giảng, đề bài, lời giải và phản hồi AI.
   - Khắc phục lỗi trùng lặp profile: Cập nhật API check trùng profile, viết SQL dọn dẹp profile thừa (gộp Ruby/XP) và tạo Unique Index trên `ge10_users(account_id, role)`.
   - Refactor hiển thị Nhật ký quyết nghị (`AuditLogsManager.tsx`): dịch toàn bộ action và payload JSON sang tiếng Việt tự nhiên, ẩn ID kỹ thuật.
   - Giao diện Quà Khuyến Học (`RewardManager.tsx`): chỉ hiển thị Quà Khuyến Học Của Lớp cho Giáo viên chủ nhiệm, ẩn đối với Ban Giám Hiệu và chỉ giữ lại Quà Khuyến Học Của Trường trên trang chính.
   - Thiết lập hệ thống Guidelines mới (`AGENTS.md`) và khởi tạo file `HANDOFF.md`.
