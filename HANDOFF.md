# HANDOFF - GameEngG10

## Trạng thái hệ thống hiện tại
1. **Trang Kho Đề Thi & Đáp Án Tham Khảo (PDF Exam Vault)**:
   - **Giao diện Danh Sách Tối Giản (Minimalist List View)**:
     - Chuyển đổi từ dạng Card sang dạng Table/List thanh thoát, gọn gàng, hiển thị nhiều hàng/trang, tra cứu cực nhanh.
     - **Tính năng Đánh Dấu Đã Tải**: Khi học sinh tải Đề hoặc Lời giải, hệ thống lưu lại và tự động **in đậm** tên đề thi kèm badge `✓ ĐÃ TẢI` giúp học sinh dễ dàng theo dõi tiến độ ôn luyện.
   - **Phân quyền CRUD cho Viện Trưởng & Viện Phó**:
     - Viện Trưởng (`admin`) và Viện Phó (`tutor`) có thể:
       * Bấm **"+ Thêm Đề Mới"** để thêm tài liệu PDF mới vào hệ thống qua `ExamEditModal.tsx`.
       * Bấm **"✏️ Sửa"** để cập nhật thông tin bất kỳ đề thi nào.
       * Bấm **"🗑️ Xóa"** để gỡ bỏ đề thi.
       * Đã tích hợp API backend đầy đủ: `GET`, `POST`, `PUT`, `DELETE` `/api/reference-exams`.
   - **Đã Import Toàn Bộ Dữ Liệu Mới (191 file PDF / 96 Bộ Đề)**:
     - Nạp toàn bộ dữ liệu từ `D:\Minh Anh\Minh Anh 9\Đề Toán\` vào `public/documents/exams/math/grade-9/`.
     - Bao gồm đầy đủ các kỳ thi: **Giữa Học Kỳ 1, Cuối Học Kỳ 1, Giữa Học Kỳ 2, Cuối Học Kỳ 2** của **20 Trường THCS TP.HCM** (Trần Đại Nghĩa, Nguyễn Văn Tố, Trần Quốc Toản 1, Hoa Lư, Nguyễn Du, Lê Quý Đôn, Colette, Hồng Bàng, Trần Văn Ơn, Hai Bà Trưng, Kim Đồng, Võ Trường Toản, Bạch Đằng, Nguyễn Gia Thiều, Trường Chinh, Nguyễn Hữu Thọ, Đồng Khởi, Chu Văn An, Trần Huy Liệu, Hậu Giang) cùng các bộ đề ôn tập Trí Đức và Đề mẫu 1-4.
   - **Thanh điều hướng (`AcademyHub.tsx` & `App.tsx`)**:
     - Tab **"Đề Tham Khảo" (icon 📑)** trên Desktop Tab Bar và Mobile Bottom Navigation.
   - **Kiểm thử**:
     - `npm run build` và `npx tsc` backend đạt **0 lỗi**.

## Các file chính đã thêm/cập nhật
- [src/components/ReferenceExams/ReferenceExamsPage.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/ReferenceExams/ReferenceExamsPage.tsx): Trang danh sách tối giản, highlight item đã tải và CRUD.
- [src/components/ReferenceExams/ExamEditModal.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/ReferenceExams/ExamEditModal.tsx): Modal thêm/sửa đề thi cho Viện Trưởng & Viện Phó.
- [src/components/ReferenceExams/PdfViewerModal.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/ReferenceExams/PdfViewerModal.tsx): Trình xem trước file PDF.
- [src/data/referenceExamsData.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/data/referenceExamsData.ts): Dữ liệu danh mục 96 bộ đề Toán 9 (Giữa HK1, Cuối HK1, Giữa HK2, Cuối HK2).
- [scripts/sync_exams.cjs](file:///d:/Hoa%20Hoang/Apps/gameEngG10/scripts/sync_exams.cjs): Script đồng bộ file PDF và tự động tạo metadata.
- [backend/src/routes/referenceExams.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/routes/referenceExams.ts): Backend API CRUD.
- [backend/migrations/20260816_reference_exams.sql](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/migrations/20260816_reference_exams.sql): SQL Migration.

## Bước tiếp theo (Next Steps)
- Tiếp tục bổ sung thêm đề thi PDF cho các môn học khác (Tiếng Anh, Ngữ Văn, KHTN...) và các khối lớp khác (Lớp 6 đến Lớp 12).
