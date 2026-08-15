-- Migration: sửa nội dung đã seed để khớp SUB_SPEC_TERMINOLOGY.md (đợt chuẩn hóa 2026-08-15)
-- Chỉ đổi display text/nội dung cẩm nang — không đổi id, cột hay cấu trúc bảng nào.
-- Sĩ Tử -> Học Sinh; Chủ Nhiệm Chính -> Chủ Nhiệm.

UPDATE ge10_handbook_pages SET content =
  'Học vấn (XP) đo lường trình độ kiến thức của Học Sinh trên học đường. Khi làm đúng mỗi câu hỏi thường ở Học Đường, con sẽ tích lũy được +15 XP.'
  WHERE id = 'hb-1';

UPDATE ge10_handbook_pages SET content =
  'Năng Lượng (Energy) là tài nguyên cần thiết để làm bài tập ở Trường Thi. Mỗi lượt luyện tập thường tiêu hao 30 Năng Lượng của Học Sinh.'
  WHERE id = 'hb-6';

UPDATE ge10_handbook_pages SET content =
  'Học Sinh có tối đa 3 Trái tim trong mỗi lượt làm bài khảo thí ở Trường Thi. Mỗi câu làm sai sẽ bị khấu trừ 1 Trái tim của con.'
  WHERE id = 'hb-8';

UPDATE ge10_handbook_pages SET bullets =
  '["• Đây là phần thưởng thật do Chủ Nhiệm hoặc Viện Trưởng tạo, có số lượng giới hạn — đổi sớm để không bị hết.","• Đổi xong sẽ trừ Ruby ngay và chờ người quản lý trao quà thật ngoài đời.","• Khi người quản lý bấm \"Đã Trao\" thì yêu cầu hoàn tất."]'::jsonb
  WHERE id = 'help-wallet';

UPDATE ge10_handbook_pages SET bullets =
  '["• Sổ Danh Bộ: quản lý tài khoản Học Sinh và cấp quyền toàn viện.","• Kho Đề Thi: lọc ngân hàng câu hỏi theo môn, dạng và thang chấm.","• Phòng Tài Vụ: duyệt đổi quà, cấu hình Năng Lượng và định mức Ruby/XP.","• Hồ Sơ Học Sinh: xem hồ sơ chi tiết từng Học Sinh."]'::jsonb
  WHERE id = 'help-parent-console';

UPDATE ge10_mission_definitions SET description =
  'Liên kết với một Chủ Nhiệm để không còn là Học Sinh mới.'
  WHERE mission_key = 'onboarding-teacher-link';
