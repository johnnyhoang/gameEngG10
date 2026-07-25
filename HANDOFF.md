# HANDOFF - GameEngG10

## Trạng thái hệ thống hiện tại
1. **Dữ liệu 100% Động từ Database**:
   - Đã tạo bảng `ge10_match_pairs` trong PostgreSQL và migrate 24 cặp thẻ bài cho Minigame Ghép Cặp Bài Trùng.
   - Loại bỏ 100% các mảng tĩnh `ENGLISH_PAIRS`, `MATH_PAIRS`, `LITERATURE_PAIRS`, `GENERAL_PAIRS` hardcode trong code.
2. **Nâng Cấp Kiến Trúc Tương Quan Bài Giảng (Lesson) & Câu Hỏi (Question) Chuẩn SGK & App Activity**:
   - **Migration SQL**: Đã khởi tạo `backend/migrations/20260725_upgrade_lesson_question_correlation.sql` bổ sung các cột `topic_id`, `scope_code` cho `ge10_lessons` và `topic_id`, `related_lesson_ids`, `pedagogical_phase`, `scope_code` cho `ge10_custom_questions`. Đồng thời tạo bảng `ge10_lesson_question_analytics`.
   - **Mã định vị duy nhất SGK (`scopeCode`)**: Công thức `${subject}_g${gradeTier}_${loai}_b${bai}` liên kết tự động Bài Giảng và Câu Hỏi cùng bài học SGK ngay cả khi chưa gán FK `lessonId` thủ công.
   - **Phân đoạn sư phạm (`pedagogicalPhase`)**: Định vị 4 giai đoạn ứng với các minigame/hoạt động trong App:
     - `illustration`: Minh hoạ khái niệm (Xem trong bài giảng `LessonStudyView`)
     - `comprehension`: Kiểm tra củng cố (Tập sau bài giảng `PlayArea`)
     - `mastery`: Luyện tập thành thạo chuyên đề (`PracticeHall`)
     - `challenge`: Vận dụng cao (`Arena` / Đánh Boss)
   - **Thuật toán bốc câu hỏi Backend (`/api/game/session`)**: Ưu tiên lọc câu hỏi củng cố khớp 4 lớp bảo vệ: `lessonId` -> `relatedLessonIds` -> `scopeCode` -> Phân loại SGK (`loai` + `bai`).
3. **Biểu Mẫu Soạn Thảo Fullscreen Modal & Typeable Combobox**:
   - Chuyển `LectureBankManager` và `QuestionFormModal` sang Fullscreen Modal toàn màn hình.
   - Tích hợp `TypeableCombobox` gợi ý distinct và `Topic Lõi` dropdown chuẩn hóa.

## Các file chính đã cập nhật
- [backend/migrations/20260725_upgrade_lesson_question_correlation.sql](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/migrations/20260725_upgrade_lesson_question_correlation.sql): SQL Migration nâng cấp schema tương quan Bài Giảng - Câu Hỏi & Analytics.
- [src/types/game.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/types/game.ts) & [src/data/lessons.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/data/lessons.ts): Bổ sung `pedagogicalPhase`, `scopeCode`, `relatedLessonIds`, `topicId`.
- [backend/src/routes/game.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/routes/game.ts) & [backend/src/helpers/questions.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/helpers/questions.ts): Nâng cấp engine ghép bài tập theo bài giảng và lưu trữ đủ metadata SGK/Pedagogy.
- [src/components/TutorConsole/Modals/QuestionFormModal.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/Modals/QuestionFormModal.tsx): Tích hợp chọn `Phân đoạn sư phạm` (Pedagogical Phase).
- [src/components/TutorConsole/LectureBankManager.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/LectureBankManager.tsx): Tích hợp chọn `Topic Lõi (Core Knowledge)`.

## Bước tiếp theo (Next Steps)
- Tiến hành phân bổ/phân tích AI cho dữ liệu câu hỏi của các môn học khác ngoài môn Toán (như Tiếng Anh, Ngữ Văn, Khoa học...) theo đúng cấu hình chuyên đề và bài học trên DB.

