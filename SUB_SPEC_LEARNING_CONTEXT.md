# Sub-Spec: Ngữ Cảnh Học Tập Tổng Quát

Tài liệu này định nghĩa cách toàn bộ ứng dụng phục vụ mọi Bậc Học và Môn học bằng cùng một implementation. Grade và subject là thuộc tính lọc dữ liệu, không phải lý do tạo page, hook, route, type hoặc gameplay riêng.

## 1. Contract cốt lõi

```ts
interface LearningContext {
  gradeTier: GradeTier;
  subjectId: SubjectId;
}
```

- `gradeTier` và `subjectId` luôn đi cùng nhau tại boundary chọn nội dung, API và persistence.
- Mọi content entity (`Question`, `Lesson`, `CoreKnowledgeTopic`, `Activity`) phải có `gradeTier` và `subjectId`/`subject` bắt buộc.
- Không dùng tên file/type/route chứa grade cụ thể cho implementation mới.
- Không fallback sang grade hoặc subject khác khi context hiện tại thiếu dữ liệu. UI phải hiển thị empty state đúng context.
- Thứ tự cô lập: **Bậc Học → Môn học → Hồ sơ → Quyền truy cập**.

## 2. Frontend

- Store cung cấp một action atomic `setLearningContext({ gradeTier, subjectId })`; `setGradeTier` và `setSubject` chỉ là compatibility adapter trong giai đoạn migration.
- Mọi selector nội dung dùng chung predicate:

```ts
item.gradeTier === context.gradeTier && item.subjectId === context.subjectId
```

- Page/component chỉ nhận `LearningContext` hoặc đọc selector chuẩn; không tự đặt default grade/subject cục bộ.
- Danh sách Bậc Học/Môn học khả dụng được suy ra từ content/capability registry hoặc cấu hình admin, không hardcode `active/coming_soon` trong component.
- Feature chuyên môn phải khai báo capability theo môn và chỉ xuất hiện khi context hiện tại khớp. Tiếng Anh có `Phrase Valley`, `Conversation Town`, `Writing Pavilion`, `Listening Lake`; Toán có `Xưởng Toán Hình 3D`, `Xưởng Toán Hình`, `Xưởng Toán Đồ Thị`. Không tạo app shell riêng cho môn.
- Mọi capability chuyên môn phải được cung cấp qua `SubjectModule` manifest; component lõi không tự kiểm tra `subjectId === ...` để quyết định feature, renderer hoặc bộ chấm.
- Ngữ Văn cung cấp blueprint/metadata đề Văn, renderer ngữ liệu đọc hiểu, gợi ý theo dạng bài và assessment provider chấm bài viết theo rubric.
- Grade/môn không có dữ liệu hoặc capability không xuất hiện trong selector/navigation; không duy trì danh sách `active/coming_soon` hardcode.

## 3. Backend/API

API canonical dùng route tổng quát:

- `GET /api/content/lessons?gradeTier=&subjectId=`
- `GET /api/content/lessons/:lessonId?gradeTier=&subjectId=`
- `GET /api/content/questions?gradeTier=&subjectId=&topicId=&difficulty=`
- `GET /api/quizzes/random?gradeTier=&subjectId=&count=`
- `POST /api/quizzes/submit` với body bắt buộc chứa `gradeTier`, `subjectId`, `lessonId`, `answers`.
- `GET /api/learning-progress?gradeTier=&subjectId=`

Mọi route trên nhận profile đang hoạt động qua header canonical `X-Profile-Id`; không nhận identity của người gọi từ body/query.

Mọi endpoint phải:

- Validate `gradeTier` và `subjectId` theo domain enum.
- Xác minh `X-Profile-Id` thuộc account JWT, đang active và dùng profile context đã xác minh trước khi đọc/ghi.
- Lọc cả grade lẫn subject tại query/data source; không tin metadata do client gửi khi chấm đáp án.
- Không tạo route theo từng lớp; mọi endpoint nhận `gradeTier` như thuộc tính context.

## 4. Database

- Thêm `grade_tier NOT NULL` và `subject NOT NULL` vào bảng content còn thiếu: `ge10_lessons`, `ge10_custom_questions`, `ge10_topics`, `ge10_activities`.
- Backfill content hiện hành đúng nguồn; chỉ dùng default lớp 9 cho record legacy đã xác minh thuộc lớp 9.
- Progress/result/session dùng khóa hoặc index gồm `user/profile + grade_tier + subject + content id`.
- Không tạo bảng theo từng lớp; toàn bộ content và progress dùng bảng canonical.

## 5. Persistence

- Database là nguồn chính thức duy nhất của nội dung ngoài bộ seed mặc định.
- Frontend không chứa registry, hook, type hoặc route dành riêng cho một lớp.
- Không dual-write và không lưu content theo lớp trong source code.

## 6. Acceptance

- Chọn context `(gradeTier, subjectId)` nào thì mọi page, lesson, question, quiz, progress, report và mini-app chỉ dùng dữ liệu của context đó.
- Không có fallback chéo grade/subject hoặc default `9/english` im lặng tại consumer.
- Thêm một grade mới chỉ cần nạp content/config; không tạo component/hook/route/type mới.
- Thêm một subject mới chỉ cần nạp config/content/capability; app shell không đổi.
- Thêm, gỡ hoặc phát triển độc lập một feature chuyên môn chỉ sửa module sở hữu và registry; không thêm nhánh môn mới vào `PlayArea`, navigation hoặc mini-game hub.
- Refresh/login giữ đúng context theo profile; chuyển context không làm rò state/cache/progress.
- Contract tests bao phủ ít nhất hai grade × ba subject và negative test chống truy cập chéo profile/context.
