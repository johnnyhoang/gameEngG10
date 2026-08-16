# HANDOFF - GameEngG10

## Trạng thái hệ thống hiện tại
1. **Trang Kho Đề Thi & Đáp Án Tham Khảo (PDF Exam Vault)**:
   - **Màn hình & Giao diện (`ReferenceExamsPage.tsx`, `ReferenceExamCard.tsx`, `PdfViewerModal.tsx`)**:
     - Phân nhóm đa dạng: Giữa HK1, Cuối HK1, Giữa HK2, Cuối HK2, Tuyển sinh 10, HSG, Ôn tập tổng hợp.
     - Badge đếm số lượng đề tự động thích ứng theo ngữ cảnh môn học và khối lớp (`useSect()`).
     - Thanh tìm kiếm tức thì theo tên trường, quận/huyện hoặc từ khóa.
     - Trình xem PDF nhúng trực tiếp trên web hoặc tải file về máy.
     - Thẻ đề thi hiển thị chi tiết trường, năm học, badge "Có Lời Giải Chi Tiết".
   - **Thanh điều hướng (`AcademyHub.tsx` & `App.tsx`)**:
     - Bổ sung tab **"Đề Tham Khảo" (icon 📑)** trên Desktop Tab Bar và Mobile Bottom Navigation.
   - **Dữ liệu & Tài nguyên PDF**:
     - Đã import toàn bộ 51 file PDF từ `D:\Minh Anh\Minh Anh 9\Đề Toán\` vào `public/documents/exams/math/grade-9/`.
     - Bao gồm 20 trường THCS TP.HCM (Trần Đại Nghĩa, Nguyễn Văn Tố, Lê Quý Đôn, Colette, Chu Văn An...) và 5 bộ đề ôn tập kèm đáp án.
     - File metadata: `src/data/referenceExamsData.ts`.
   - **Backend & Database**:
     - Bảng `ge10_reference_exams` trong migration `backend/migrations/20260816_reference_exams.sql`.
     - API route `/api/reference-exams` trong `backend/src/routes/referenceExams.ts`.
   - **Kiểm thử**:
     - `npm run build` và `npx tsc` backend đạt **0 lỗi**.

## Các file chính đã thêm/cập nhật
- [src/components/ReferenceExams/ReferenceExamsPage.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/ReferenceExams/ReferenceExamsPage.tsx): Trang Kho Đề Tham Khảo.
- [src/components/ReferenceExams/ReferenceExamCard.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/ReferenceExams/ReferenceExamCard.tsx): Card đề thi.
- [src/components/ReferenceExams/PdfViewerModal.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/ReferenceExams/PdfViewerModal.tsx): Trình xem trước file PDF.
- [src/data/referenceExamsData.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/data/referenceExamsData.ts): Dữ liệu danh mục 25 bộ đề Toán 9.
- [src/types/referenceExam.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/types/referenceExam.ts): Type definitions.
- [src/components/AcademyHub.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/AcademyHub.tsx): Tích hợp tab Đề Tham Khảo.
- [src/App.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/App.tsx): Đồng bộ navigation tab.
- [backend/migrations/20260816_reference_exams.sql](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/migrations/20260816_reference_exams.sql): SQL Migration.
- [backend/src/routes/referenceExams.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/routes/referenceExams.ts): Backend API.
- [backend/src/server.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/server.ts) & [backend/src/migrationRunner.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/migrationRunner.ts): Đăng ký route và migration.

## Bước tiếp theo (Next Steps)
- Tiếp tục bổ sung thêm đề thi PDF cho các môn học khác (Tiếng Anh, Ngữ Văn, KHTN...) và các khối lớp khác (Lớp 6 đến Lớp 12).
