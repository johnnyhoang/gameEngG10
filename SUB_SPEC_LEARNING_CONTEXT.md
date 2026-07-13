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
- Feature chuyên môn như `Phrase Valley` khai báo capability `subjects: ['english']`; không tạo app shell riêng cho môn.

## 3. Backend/API

API canonical dùng route tổng quát:

- `GET /api/content/lessons?gradeTier=&subjectId=`
- `GET /api/content/lessons/:lessonId?gradeTier=&subjectId=`
- `GET /api/content/questions?gradeTier=&subjectId=&topicId=&difficulty=`
- `GET /api/quizzes/random?gradeTier=&subjectId=&count=`
- `POST /api/quizzes/submit` với body bắt buộc chứa `profileId`, `gradeTier`, `subjectId`, `lessonId`, `answers`.
- `GET /api/progress?profileId=&gradeTier=&subjectId=`

Mọi endpoint phải:

- Validate `gradeTier` và `subjectId` theo domain enum.
- Xác minh `profileId` thuộc account JWT trước khi đọc/ghi.
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
- Refresh/login giữ đúng context theo profile; chuyển context không làm rò state/cache/progress.
- Contract tests bao phủ ít nhất hai grade × ba subject và negative test chống truy cập chéo profile/context.
