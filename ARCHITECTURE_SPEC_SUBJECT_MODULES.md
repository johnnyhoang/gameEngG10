# Architecture Spec — Mô-đun Chuyên Môn (Subject Module)

## 1. Mục tiêu và ranh giới

`SubjectModule` là cơ chế build-time để một môn đóng góp hành vi chuyên biệt mà không tạo app shell, store, authentication hoặc database riêng. Core sở hữu navigation, learning context, profile, quyền, reward, energy và lifecycle; module chỉ sở hữu logic chuyên môn.

Không dùng runtime plugin loader, dynamic package installation hoặc dependency injection framework riêng. Registry là code tĩnh, type-safe và dễ trace trong production.

## 2. Contribution contract

```ts
interface SubjectModule {
  subjectId: SubjectId;
  tools?: SubjectToolContribution[];
  activities?: SubjectActivityContribution[];
  miniGames?: MiniGameContribution[];
  utilities?: string[];
  questionPresentation?: QuestionPresentationContribution;
  questionMetadata?: QuestionMetadataContribution;
  hintProvider?: SubjectHintProvider;
  assessmentProviders?: AssessmentProviderContribution[];
}
```

- `tools`: công cụ chuyên sâu gắn vào Học Đường/Kho Nền Tảng.
- `activities`: activity ID nghiệp vụ, category và mode compatibility.
- `miniGames`: mini-game riêng của môn; game dùng chung không được khai báo là riêng.
- `questionPresentation`: tách/biến đổi presentation model, không sửa dữ liệu gốc.
- `questionMetadata`: cung cấp label/blueprint chuyên môn cho UI học sinh và quản trị.
- `utilities`: cho phép dùng tiện ích lõi tại đúng môn, ví dụ Sổ Nháp.
- `hintProvider`: sinh gợi ý theo metadata chuyên môn.
- `assessmentProviders`: nhận diện dạng bài và gọi bộ chấm chuyên môn.

## 3. Ownership và dependency

- `subject-modules/contracts.ts` chỉ phụ thuộc domain type ổn định.
- `subject-modules/<subject>/manifest.ts` sở hữu contribution của môn.
- `subject-modules/registry.ts` là nguồn đăng ký duy nhất và cung cấp query API read-only.
- Core được phép gọi registry; module không import `App`, navigation hoặc Zustand store.
- UI component chuyên môn nhận props thuần; service chuyên môn nhận token/profile/context tường minh.
- Backend vẫn giữ endpoint/service có validation riêng; không gom mọi action vào một endpoint generic thiếu type-safety.
- Logic backend chuyên môn đặt dưới `backend/src/subjectModules/<subject>`; route chỉ validate HTTP và chuyển vào service sở hữu nghiệp vụ.

## 4. Module hiện hành

### Tiếng Anh

- Mini-game riêng: `phrase-valley`, `conversation-town`, `writing-pavilion`, `listening-lake`.

### Toán

- Công cụ riêng: `biki3d`, `bikiplane`, `bikigraph`.

### Ngữ Văn

- Activity: `literature-reading`, `literature-vietnamese`, `literature-social-essay`, `literature-literary-essay`.
- Presentation: tách ngữ liệu và câu hỏi đọc hiểu.
- Hint provider: gợi ý theo `literatureTask`, `textGenre` và rubric.
- Assessment provider: `literature-rubric`, gọi `/api/ai/grade-literature`.
- Metadata/blueprint: `literatureTrack`, `literatureTask`, `textGenre`, `answerMode`, `solutionSteps`.

Các mini-game Đọc Hiểu Sâu, Ghép Cặp, Sơ Đồ Ôn Tập, Trình Tự Giải, Giảng Cho AI, Ghép Sơ Đồ và RPG là game dùng chung có content adapter theo môn, không thuộc riêng module Văn.

## 5. Compatibility

- Activity ID canonical không dùng tên mode của môn khác.
- `legacyMode` chỉ tồn tại ở boundary đọc dữ liệu cũ; code mới dùng activity ID.
- Route và payload hiện hành được giữ để giảm breaking change.
- Registry capability cũ được thay bằng query từ `SubjectModule`; helper cũ chỉ được giữ tạm nếu còn consumer.

## 6. Acceptance

- Core không hardcode feature visibility cho English/Math/Literature.
- Đổi môn khi đang ở tool riêng phải quay về surface an toàn.
- Mỗi contribution chỉ trả về cho đúng `subjectId` sở hữu.
- Văn giữ nguyên renderer ngữ liệu, hint và kết quả chấm rubric sau refactor.
- Không có activity Văn canonical mang tên `grammar`, `reading` hoặc `vocabulary`.
- FE build, BE build và lint không có error.
