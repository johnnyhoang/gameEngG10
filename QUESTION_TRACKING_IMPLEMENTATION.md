# Triển Khai Hệ Thống Theo Dõi Thống Kê Câu Hỏi (Question Tracking System)

**Ngày cập nhật:** 2026-01-13  
**Phạm vi:** Tất cả 9 môn học - Lớp 9 (Grade Tier 9)  
**Trạng thái:** Hoàn thành

---

## 📋 Tóm Tắt Công Việc

Đã thiết kế và triển khai hệ thống theo dõi toàn diện cho ngân hàng câu hỏi lớp 9, với khả năng:
1. **Theo dõi toàn cục** - Đếm số lần mỗi câu hỏi được mở, trả lời đúng, bỏ qua
2. **Theo dõi cá nhân** - Lưu hiệu suất của từng học sinh trên từng câu hỏi
3. **Phân tích dữ liệu** - Xác định các câu hỏi khó khăn, độ chính xác theo chủ đề
4. **Tích hợp API** - Cung cấp các endpoint để truy vấn thống kê

---

## 🗄️ Cơ Sở Dữ Liệu (Database Schema)

### 1. Bảng `ge10_custom_questions` (Cập nhật)
Thêm 5 cột mới cho theo dõi:
```sql
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS times_opened INTEGER DEFAULT 0;
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS times_answered_correctly INTEGER DEFAULT 0;
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS times_skipped INTEGER DEFAULT 0;
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS last_opened_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
```

**Mục đích:**
- `times_opened`: Số lần câu hỏi được đưa vào phiên chơi
- `times_answered_correctly`: Tổng số lần học sinh trả lời đúng
- `times_skipped`: Số lần câu hỏi bị bỏ qua
- `last_opened_at`: Dấu thời gian lần cuối sử dụng
- `updated_at`: Cập nhật tự động khi thống kê thay đổi

### 2. Bảng `ge10_question_stats` (Mới)
Bảng riêng để lưu trữ thống kê chi tiết (normalized):
```sql
CREATE TABLE IF NOT EXISTS ge10_question_stats (
    question_id VARCHAR(255) PRIMARY KEY REFERENCES ge10_custom_questions(id) ON DELETE CASCADE,
    times_opened INTEGER DEFAULT 0,
    times_answered_correctly INTEGER DEFAULT 0,
    times_skipped INTEGER DEFAULT 0,
    last_opened_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Mục đích:** Cáche dữ liệu thống kê, cho phép query nhanh và backup riêng biệt.

### 3. Bảng `ge10_student_question_performance` (Mới)
Theo dõi hiệu suất từng học sinh trên từng câu hỏi:
```sql
CREATE TABLE IF NOT EXISTS ge10_student_question_performance (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    question_id VARCHAR(255) REFERENCES ge10_custom_questions(id) ON DELETE CASCADE,
    times_attempted INTEGER DEFAULT 0,
    times_correct INTEGER DEFAULT 0,
    times_skipped INTEGER DEFAULT 0,
    last_attempted_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, question_id)
);
```

**Mục đích:**
- `times_attempted`: Số lần học sinh làm câu hỏi này
- `times_correct`: Số lần trả lời đúng
- `times_skipped`: Số lần bỏ qua
- Tính toán độ chính xác: `accuracy = times_correct / times_attempted`

---

## 🔧 Thay Đổi Code

### Frontend (`src/types/game.ts`)

Cập nhật interface `Question`:
```typescript
export interface Question {
  // ... fields cũ ...
  
  // Các trường mới cho tracking
  timesOpened?: number;                    // Số lần được mở
  timesAnsweredCorrectly?: number;        // Số lần trả lời đúng
  timesSkipped?: number;                  // Số lần bỏ qua
  lastOpenedAt?: string;                  // Lần cuối sử dụng
}
```

### Frontend (`src/components/PlayArea.tsx`)

**Thay đổi:** Gửi cờ `isSkipped` khi kết thúc phiên:
```typescript
answers: answersSubmitted.map(ans => ({
  questionId: ans.questionId,
  typedAnswer: ans.typedAnswer,
  selectedAnswer: ans.selectedAnswer,
  scoreRatio: ans.scoreRatio,
  isSkipped: ans.isSkipped || false  // ← Thêm dòng này
}))
```

**Lợi ích:** Cho phép backend phân biệt giữa câu trả lời sai và câu bỏ qua.

### Backend - Helper (`backend/src/helpers/questionStats.ts`)

File mới với 8 hàm utility:

1. **`trackQuestionOpened(questionId)`**
   - Tăng `times_opened` lên 1
   - Cập nhật `last_opened_at`
   - Đồng bộ vào cả bảng `ge10_custom_questions` và `ge10_question_stats`

2. **`trackQuestionAnsweredCorrectly(questionId)`**
   - Tăng `times_answered_correctly` lên 1
   - Cập nhật cả hai bảng

3. **`trackQuestionSkipped(questionId)`**
   - Tăng `times_skipped` lên 1
   - Cập nhật cả hai bảng

4. **`trackStudentQuestionPerformance(studentId, questionId, isCorrect, wasSkipped)`**
   - Upsert bảng `ge10_student_question_performance`
   - Theo dõi hiệu suất cá nhân của học sinh
   - Tính độ chính xác: `accuracy = times_correct / times_attempted`

5. **`getQuestionStats(questionId)`**
   - Lấy thống kê của một câu hỏi
   - Trả về object với `times_opened`, `times_answered_correctly`, `times_skipped`, `last_opened_at`

6. **`getQuestionsByStats(subject?, sortBy, limit)`**
   - Truy vấn danh sách câu hỏi sắp xếp theo thống kê
   - Hỗ trợ sắp xếp: `'opened' | 'correct' | 'skipped'`
   - Optional filter theo môn học

7. **`getStudentQuestionPerformance(studentId, questionId)`**
   - Lấy hiệu suất của một học sinh trên một câu hỏi
   - Dùng cho dashboard cá nhân

8. **`getStudentStruggledQuestions(studentId, limit)`**
   - Lấy danh sách câu hỏi mà học sinh làm sai nhiều lần
   - Sắp xếp theo độ chính xác tăng dần
   - Dùng để đề xuất bài tập ôn tập

### Backend - Routes (`backend/src/routes/game.ts`)

**Cập nhật:** Hàm `POST /api/game/session/end`

Thêm tracking cho mỗi câu hỏi sau khi tính điểm:
```typescript
for (let i = 0; i < answers.length; i++) {
  const originalAnswer = answers[i];
  const computedAnswer = computedAnswers[i];

  // Track question opened
  await trackQuestionOpened(computedAnswer.questionId);

  // Track if skipped
  if (originalAnswer.isSkipped) {
    await trackQuestionSkipped(computedAnswer.questionId);
  }

  // Track if answer is correct
  if (computedAnswer.isCorrect) {
    await trackQuestionAnsweredCorrectly(computedAnswer.questionId);
  }

  // Track per-student performance
  await trackStudentQuestionPerformance(
    profileId,
    computedAnswer.questionId,
    computedAnswer.isCorrect,
    originalAnswer.isSkipped || false
  );
}
```

### Backend - Routes (`backend/src/routes/questions.ts`)

**Cập nhật 1:** Hàm `GET /api/questions/custom`
- Thêm trả về các trường: `timesOpened`, `timesAnsweredCorrectly`, `timesSkipped`, `lastOpenedAt`

**Thêm mới 2:** Hàm `GET /api/questions/stats` (Admin)
```
GET /api/questions/stats?subject=english&sortBy=opened&limit=100
```
- Trả về danh sách câu hỏi với thống kê
- Sắp xếp: `'opened' | 'correct' | 'skipped' | 'last_used'`
- Chỉ admin/chủ nhiệm mới có quyền truy cập

**Thêm mới 3:** Hàm `GET /api/questions/stats/student/:studentId` (Parent/Teacher)
```
GET /api/questions/stats/student/{studentId}
```
- Lấy hiệu suất của học sinh trên tất cả câu hỏi
- Trả về: `times_attempted`, `times_correct`, `times_skipped`, `accuracy`
- Chỉ phụ huynh/giáo viên có quyền xem

---

## 📊 Dòng Chảy Dữ Liệu

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Học sinh bắt đầu phiên (PlayArea.tsx)                   │
│    → Gọi POST /api/game/session/start                       │
│    → Nhận sessionId + danh sách câu hỏi                     │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Học sinh làm bài                                          │
│    → Trả lời/bỏ qua câu hỏi                                │
│    → Ghi lại trong state: answersSubmitted[]                 │
│    → Kèm theo: isSkipped flag                               │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Kết thúc phiên (PlayArea.tsx → game.service)            │
│    → Gọi POST /api/game/session/end                         │
│    → Gửi: answers[] (kèm isSkipped flag)                   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Backend xử lý (game.ts)                                  │
│    → Tính điểm cho mỗi câu trả lời                          │
│    → Gọi trackQuestionOpened() cho mỗi câu                  │
│    → Gọi trackQuestionSkipped() nếu isSkipped=true         │
│    → Gọi trackQuestionAnsweredCorrectly() nếu đúng         │
│    → Gọi trackStudentQuestionPerformance() cập nhật        │
│    → Lưu session result vào database                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Cập nhật bảng thống kê                                   │
│    → ge10_custom_questions.times_* tăng lên 1              │
│    → ge10_question_stats đồng bộ                            │
│    → ge10_student_question_performance cập nhật             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Các Trường Hợp Sử Dụng

### 1. **Admin - Xem Câu Hỏi Khó Nhất**
```
GET /api/questions/stats?subject=math&sortBy=correct&limit=20
```
→ Trả về 20 câu Toán mà học sinh trả lời sai nhiều lần nhất.

### 2. **Giáo Viên - Kiểm tra Câu Hỏi Chưa Dùng**
```
GET /api/questions/stats?subject=english&sortBy=opened&limit=50
```
→ Trả về 50 câu Tiếng Anh sắp xếp theo số lần dùng, tìm những câu chưa dùng lần nào.

### 3. **Phụ Huynh - Xem Câu Hỏi Con Em Làm Sai**
```
GET /api/questions/stats/student/{studentId}
```
→ Danh sách tất cả câu hỏi con em đã làm, sắp xếp theo độ chính xác (thấp nhất trước).

### 4. **Dashboard Lớp - Tìm Chủ Đề Cần Ôn Tập**
```
Query: Danh sách câu hỏi từng chủ đề + số lần sai trung bình
→ Xác định chủ đề nào học sinh làm sai nhiều nhất
→ Đề xuất ôn tập hoặc làm thêm
```

---

## 📈 Chỉ Số Quan Trọng

| Chỉ Số | Tính Toán | Ý Nghĩa |
|--------|-----------|---------|
| **Coverage** | `times_opened > 0` | Câu hỏi đã được sử dụng |
| **Accuracy** | `times_answered_correctly / times_attempted` | Tỷ lệ trả lời đúng (toàn bộ) |
| **Difficulty** | `1 - accuracy` | Độ khó thực tế của câu hỏi |
| **Skip Rate** | `times_skipped / times_opened` | Tỷ lệ học sinh bỏ qua |
| **Student Accuracy** | `student_times_correct / student_times_attempted` | Độ chính xác cá nhân |
| **Struggling Questions** | Sắp xếp theo `accuracy ASC` | Các câu hỏi học sinh cần ôn tập |

---

## 🔗 Tích Hợp Trong Ứng Dụng

### ParentConsole
Thêm tab "Phân Tích Câu Hỏi" để xem:
- Câu hỏi con em làm sai nhiều lần
- Chủ đề cần ôn tập
- Tiến độ cải thiện

### AdminDashboard
Thêm tab "Quản Lý Ngân Hàng" để xem:
- Câu hỏi khó nhất mỗi môn
- Câu hỏi chưa sử dụng
- Đề xuất cải thiện câu hỏi

### StudentProfile
Thêm "Thống Kê Cá Nhân":
- Độ chính xác từng môn
- Chủ đề yếu nhất
- Đề xuất ôn tập

---

## ⚙️ Cài Đặt & Triển Khai

### 1. **Chạy Migration**
```bash
# Chạy schema.sql để tạo các bảng mới
psql -U postgres -d gameeng_g10 -f backend/src/schema.sql
```

### 2. **Khởi Động Backend**
```bash
npm run dev  # Hoặc tùy theo command của bạn
```

### 3. **Verify**
```bash
curl http://localhost:3000/api/questions/stats \
  -H "Authorization: Bearer {admin_token}"
```

---

## 🚀 Hiệu Suất & Tối Ưu

### Denormalization
- Lưu `times_*` vào cả `ge10_custom_questions` (nhanh) và `ge10_question_stats` (backup)
- Cho phép query nhanh mà vẫn có backup riêng

### Indexes (Đề xuất)
```sql
CREATE INDEX idx_question_stats_opened ON ge10_custom_questions(times_opened DESC);
CREATE INDEX idx_question_stats_correct ON ge10_custom_questions(times_answered_correctly DESC);
CREATE INDEX idx_student_perf_student ON ge10_student_question_performance(student_id);
CREATE INDEX idx_student_perf_accuracy ON ge10_student_question_performance(student_id, times_correct, times_attempted);
```

---

## 📝 Danh Sách Kiểm Tra

Sau triển khai, kiểm tra:

- [ ] Database migration chạy thành công
- [ ] Tất cả bảng mới được tạo
- [ ] API endpoints đáp ứng đúng
- [ ] Tracking bắt đầu sau khi kết thúc phiên
- [ ] Thống kê cập nhật chính xác
- [ ] Frontend hiển thị thống kê nếu có
- [ ] Admin có thể truy vấn `/api/questions/stats`
- [ ] Phụ huynh có thể xem `/api/questions/stats/student/{id}`
- [ ] Không có lỗi trong console/logs

---

## 📞 Hỗ Trợ

Nếu gặp sự cố:
1. Kiểm tra logs backend: `npm run dev`
2. Kiểm tra database: `psql -U postgres -d gameeng_g10 -c "SELECT COUNT(*) FROM ge10_custom_questions;"`
3. Verify schema: `\d ge10_custom_questions` (trong psql)
4. Test API: Dùng Postman/curl để test endpoints
