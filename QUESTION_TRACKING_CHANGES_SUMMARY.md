# 📋 Tóm Tắt Chi Tiết Thay Đổi - Hệ Thống Theo Dõi Câu Hỏi

**Ngày:** 2026-01-13  
**Tổng số tệp thay đổi:** 6 tệp + 1 tệp mới  
**Loại thay đổi:** Schema, Type definitions, Backend routes, Helpers, Frontend integration

---

## 🔄 Danh Sách Các Tệp Thay Đổi

### 1️⃣ `backend/src/schema.sql` - DATABASE MIGRATION
**Status:** ✅ Cập nhật  
**Số dòng thay đổi:** +42 dòng

#### Thay Đổi Chi Tiết:
```sql
-- Thêm 5 cột tracking vào ge10_custom_questions
+ times_opened INTEGER DEFAULT 0
+ times_answered_correctly INTEGER DEFAULT 0  
+ times_skipped INTEGER DEFAULT 0
+ last_opened_at TIMESTAMP WITH TIME ZONE
+ updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

-- Tạo bảng mới ge10_question_stats (normalized storage)
+ CREATE TABLE ge10_question_stats
  - question_id (FK)
  - times_opened, times_answered_correctly, times_skipped
  - last_opened_at, updated_at

-- Tạo bảng mới ge10_student_question_performance
+ CREATE TABLE ge10_student_question_performance
  - student_id (FK), question_id (FK)
  - times_attempted, times_correct, times_skipped
  - last_attempted_at, updated_at
  - UNIQUE(student_id, question_id)
```

---

### 2️⃣ `src/types/game.ts` - TYPE DEFINITIONS
**Status:** ✅ Cập nhật  
**Số dòng thay đổi:** +5 dòng

#### Thay Đổi Chi Tiết:
```typescript
export interface Question {
  // ... fields cũ ...
  
  // ← Thêm 4 trường mới
  timesOpened?: number;              // Số lần câu được mở
  timesAnsweredCorrectly?: number;   // Số lần trả lời đúng
  timesSkipped?: number;             // Số lần bỏ qua
  lastOpenedAt?: string;             // Lần cuối sử dụng
}
```

**Lợi ích:**
- Frontend có thể hiển thị thống kê
- Type-safe khi truyền dữ liệu từ backend
- Hỗ trợ hiển thị chỉ số khó/dễ của câu hỏi

---

### 3️⃣ `backend/src/helpers/questionStats.ts` - HELPER FUNCTIONS
**Status:** ✅ TẠO MỚI  
**Tổng dòng:** 230 dòng

#### 8 Hàm Utility:

| Hàm | Mục Đích | Parameters |
|-----|----------|-----------|
| `trackQuestionOpened()` | Tăng counter lần mở | `questionId: string` |
| `trackQuestionAnsweredCorrectly()` | Tăng counter trả lời đúng | `questionId: string` |
| `trackQuestionSkipped()` | Tăng counter bỏ qua | `questionId: string` |
| `trackStudentQuestionPerformance()` | Cập nhật hiệu suất cá nhân | `studentId, questionId, isCorrect, wasSkipped` |
| `getQuestionStats()` | Lấy thống kê 1 câu | `questionId: string` |
| `getQuestionsByStats()` | Danh sách câu sắp xếp | `subject?, sortBy, limit` |
| `getStudentQuestionPerformance()` | Lấy hiệu suất học sinh | `studentId, questionId` |
| `getStudentStruggledQuestions()` | Câu hỏi học sinh làm sai | `studentId, limit` |

**Mô tả chi tiết:**
- Đồng bộ dữ liệu vào cả bảng denormalized (`ge10_custom_questions`) và normalized (`ge10_question_stats`)
- Error handling với try-catch
- Hỗ trợ query nhanh và phân tích dữ liệu

---

### 4️⃣ `backend/src/routes/game.ts` - GAME SESSION TRACKING
**Status:** ✅ Cập nhật  
**Số dòng thay đổi:** +23 dòng

#### Thay Đổi Chi Tiết:

**Import (dòng 5-9):**
```typescript
+ import {
+   trackQuestionOpened,
+   trackQuestionAnsweredCorrectly,
+   trackQuestionSkipped,
+   trackStudentQuestionPerformance
+ } from '../helpers/questionStats.js';
```

**Trong hàm `POST /api/game/session/end` (dòng 361-381):**
```typescript
// ← Thêm tracking loop
for (let i = 0; i < answers.length; i++) {
  const originalAnswer = answers[i];
  const computedAnswer = computedAnswers[i];

  await trackQuestionOpened(computedAnswer.questionId);
  
  if (originalAnswer.isSkipped) {
    await trackQuestionSkipped(computedAnswer.questionId);
  }
  
  if (computedAnswer.isCorrect) {
    await trackQuestionAnsweredCorrectly(computedAnswer.questionId);
  }
  
  await trackStudentQuestionPerformance(
    profileId,
    computedAnswer.questionId,
    computedAnswer.isCorrect,
    originalAnswer.isSkipped || false
  );
}
```

**Dòng chạy:**
1. Tính điểm câu trả lời (code cũ)
2. **← Mới: Gọi tracking functions** (code mới)
3. Lưu session summary (code cũ)

---

### 5️⃣ `src/components/PlayArea.tsx` - FRONTEND ANSWER SUBMISSION
**Status:** ✅ Cập nhật  
**Số dòng thay đổi:** +1 dòng

#### Thay Đổi Chi Tiết (dòng 377-384):
```typescript
const res = await gameService.endSession({
  sessionId,
  profileId: player.id,
  answers: answersSubmitted.map(ans => ({
    questionId: ans.questionId,
    typedAnswer: ans.typedAnswer,
    selectedAnswer: ans.selectedAnswer,
    scoreRatio: ans.scoreRatio,
    isSkipped: ans.isSkipped || false  // ← THÊM DÒNG NÀY
  })),
  isDefeat,
  bossBonusIndex
});
```

**Lợi ích:**
- Backend biết câu nào bỏ qua vs trả lời sai
- Tăng tracking accuracy
- Cho phép phân tích lý do học sinh bỏ qua

---

### 6️⃣ `backend/src/routes/questions.ts` - API ENDPOINTS
**Status:** ✅ Cập nhật + Thêm 2 endpoint mới  
**Số dòng thay đổi:** +112 dòng

#### A. Cập nhật `GET /api/questions/custom` (dòng 8-28)
**Trước:**
```typescript
res.json(qRes.rows.map((row: any) => ({
  // ... 11 fields ...
})));
```

**Sau:**
```typescript
res.json(qRes.rows.map((row: any) => ({
  // ... 11 fields cũ ...
  timesOpened: row.times_opened || 0,              // ← THÊM
  timesAnsweredCorrectly: row.times_answered_correctly || 0,  // ← THÊM
  timesSkipped: row.times_skipped || 0,             // ← THÊM
  lastOpenedAt: row.last_opened_at                  // ← THÊM
})));
```

#### B. Thêm mới `GET /api/questions/stats` (Admin endpoint)
**Route:** `GET /api/questions/stats?subject=math&sortBy=opened&limit=100`

**Tính năng:**
- Chỉ admin/chủ nhiệm mới truy cập
- Truy vấn câu hỏi sắp xếp theo thống kê
- Support filter theo môn học
- Support sắp xếp: `opened | correct | skipped | last_used`

**Response:**
```json
[
  {
    "id": "math-1",
    "type": "mcq",
    "category": "function-graph",
    "subject": "math",
    "difficulty": 7,
    "times_opened": 45,
    "times_answered_correctly": 28,
    "times_skipped": 12,
    "last_opened_at": "2026-01-13T10:30:00Z"
  }
]
```

#### C. Thêm mới `GET /api/questions/stats/student/:studentId` (Per-student endpoint)
**Route:** `GET /api/questions/stats/student/{studentId}`

**Tính năng:**
- Phụ huynh/giáo viên xem hiệu suất học sinh
- Sinh viên xem stats cá nhân
- Sắp xếp theo `last_attempted_at DESC`

**Response:**
```json
[
  {
    "id": "math-1",
    "prompt": "Tìm x sao cho...",
    "subject": "math",
    "category": "function-graph",
    "difficulty": 7,
    "times_attempted": 3,
    "times_correct": 1,
    "times_skipped": 0,
    "last_attempted_at": "2026-01-13T10:30:00Z",
    "accuracy": 0.333
  }
]
```

---

## 📊 Tác Động Tổng Thể

### Trước Thay Đổi ❌
```
Frontend                Backend              Database
────────────────────────────────────────────────────────
Học sinh               Xử lý điểm           ge10_custom_questions
  |                         |                      |
  └─ Trả lời               │                      │
     & Bỏ qua               │                      │
                   ╲        │                      │
                    → Tính điểm            (chỉ lưu câu)
                    → Lưu session         
                    ╲
                     → Cập nhật XP/coins
                       
❌ Không có tracking thống kê câu hỏi
❌ Không biết câu nào khó, dễ, bỏ qua
❌ Không thể phân tích từng học sinh
```

### Sau Thay Đổi ✅
```
Frontend                Backend                    Database
────────────────────────────────────────────────────────────
Học sinh               Xử lý điểm                ge10_custom_questions
  |                         |                           |
  ├─ Trả lời                │                           ├─ times_opened
  │ & Bỏ qua                │                           ├─ times_answered_correctly
  │ + isSkipped flag        │                           ├─ times_skipped
  │                         │                           └─ last_opened_at
  └─ Gửi answers[]          │
     (kèm flags)    ┌───────┴─────────┐           ge10_question_stats
                    │                 │                   |
              ┌─ Tính điểm     ┌─ Lưu session        ├─ times_opened
              │  ├─ trackQuestion...() ─┤              ├─ times_*
              │  ├─ trackStudent...()   │              └─ updated_at
              │  └─ Cập nhật XP/coins   │
              │                         │
              └─────────────┬───────────┘        ge10_student_question_performance
                            │                           |
                      Lưu session result        ├─ times_attempted
                      + Tracking data           ├─ times_correct
                                               ├─ times_skipped
                                               └─ accuracy
                                               
✅ Track tất cả câu hỏi (opened, correct, skipped)
✅ Phân tích từng học sinh
✅ API để truy vấn thống kê
✅ Dashboard & phân tích dữ liệu
```

---

## 🎯 Impact Map

| Thành Phần | Thay Đổi | Tác Động |
|-----------|---------|----------|
| Database | +3 bảng mới, +5 cột | ✅ Lưu đủ dữ liệu |
| Backend API | +2 endpoint | ✅ Truy vấn thống kê |
| Helpers | +1 file (230 LOC) | ✅ Tracking automation |
| Game Routes | +1 tracking loop | ✅ Capture statistics |
| Frontend Types | +4 fields | ✅ Type-safe |
| Frontend Form | +1 flag | ✅ Distinguish skip/wrong |

---

## 🔍 Trace: Một Phiên Học Tập

### Ví dụ: Học sinh Hoàn Thành 3 Câu Toán

**Câu 1:** Trả lời đúng
- `answers[0] = { questionId: "math-1", selectedAnswer: "A", isSkipped: false }`
- Backend: `trackQuestionOpened("math-1")` → `times_opened: 46`
- Backend: `trackQuestionAnsweredCorrectly("math-1")` → `times_answered_correctly: 29`
- Backend: `trackStudentQuestionPerformance(student123, "math-1", true, false)` → học sinh có 2/3 trả lời đúng

**Câu 2:** Trả lời sai
- `answers[1] = { questionId: "math-2", selectedAnswer: "B", isSkipped: false }`
- Backend: `trackQuestionOpened("math-2")` → `times_opened: 23`
- Backend: không gọi `trackQuestionAnsweredCorrectly` (vì sai)
- Backend: `trackStudentQuestionPerformance(student123, "math-2", false, false)` → học sinh có 0/1

**Câu 3:** Bỏ qua
- `answers[2] = { questionId: "math-3", selectedAnswer: null, isSkipped: true }`
- Backend: `trackQuestionOpened("math-3")` → `times_opened: 15`
- Backend: `trackQuestionSkipped("math-3")` → `times_skipped: 5`
- Backend: `trackStudentQuestionPerformance(student123, "math-3", false, true)` → học sinh có 0/1 skip

**Kết Quả Query:**

```sql
-- Sau session, bảng ge10_custom_questions:
SELECT id, times_opened, times_answered_correctly, times_skipped 
FROM ge10_custom_questions 
WHERE id IN ('math-1', 'math-2', 'math-3');

-- math-1: 46, 29, X
-- math-2: 23, X, X
-- math-3: 15, X, 5
```

```sql
-- Hiệu suất học sinh:
SELECT * FROM ge10_student_question_performance 
WHERE student_id = 'student123';

-- math-1: 1 attempted, 1 correct, 0 skipped → 100% accuracy
-- math-2: 1 attempted, 0 correct, 0 skipped → 0% accuracy
-- math-3: 1 attempted, 0 correct, 1 skipped → (N/A)
```

---

## 🚀 Deployment Checklist

- [ ] Schema migration đã chạy
- [ ] 3 bảng mới tồn tại trong DB
- [ ] 5 cột mới tồn tại trong `ge10_custom_questions`
- [ ] File `backend/src/helpers/questionStats.ts` tồn tại
- [ ] Import statements trong `game.ts` chính xác
- [ ] Tracking loop trong `game.ts` chạy không lỗi
- [ ] Frontend gửi `isSkipped` flag
- [ ] 3 API endpoints respond đúng
- [ ] Admin role filter hoạt động
- [ ] Data denormalization (2 bảng) đồng bộ
- [ ] Không có lỗi trong logs
- [ ] Query performance acceptable (add indexes nếu cần)

---

## 📞 Quick Reference

### API URLs
```
GET    /api/questions/custom              # Load câu hỏi (+ stats)
GET    /api/questions/stats               # Admin stats queries
GET    /api/questions/stats/student/{id}  # Student/parent performance
POST   /api/game/session/start            # Begin game (unchanged)
POST   /api/game/session/end              # End game + track (modified)
```

### SQL Queries
```sql
-- Top 10 hardest questions (lowest correct rate)
SELECT id, times_answered_correctly / NULLIF(times_opened, 0) as accuracy
FROM ge10_custom_questions WHERE times_opened > 10 
ORDER BY accuracy ASC LIMIT 10;

-- Student's worst categories
SELECT category, COUNT(*) as attempts, 
       SUM(CASE WHEN times_correct > 0 THEN 1 ELSE 0 END) as correct
FROM ge10_student_question_performance p
JOIN ge10_custom_questions q ON p.question_id = q.id
WHERE p.student_id = $1
GROUP BY category ORDER BY correct/attempts ASC;
```

---

**🎉 Hoàn thành!** Hệ thống tracking câu hỏi đã được triển khai đầy đủ cho tất cả 9 môn học lớp 9.
