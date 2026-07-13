# Inventory Chuẩn Hóa Thuật Ngữ

Ngày rà soát: **2026-07-13**
Nguồn chuẩn: [SUB_SPEC_TERMINOLOGY.md](./SUB_SPEC_TERMINOLOGY.md)

## 1. Nguyên tắc migration

- Chỉ đổi display text trước đối với tên không ảnh hưởng contract.
- Giữ nguyên route, DB value, role value và identifier kỹ thuật cho đến khi backlog contract tương ứng được duyệt.
- Ruby là ngoại lệ đã được duyệt đổi domain contract; migration tương thích nằm tại `backend/migrations/20260713_ruby_currency.sql`.
- Không xóa hoặc tự bật feature trong quá trình thay tên.

## 2. Inventory consumer

| Nhóm | Mapping đã duyệt | Consumer chính | Loại impact |
| :--- | :--- | :--- | :--- |
| Role quản trị | Hiệu Trưởng → **Viện Trưởng**; Hiệu Phó → **Phó Viện Trưởng** | `SUB_SPEC_FAMILY_ROLE.md`, `backend/src/helpers/profileAdapter.ts`, `backend/src/routes/admin.ts`, `backend/src/routes/family.ts`, `src/utils/roleHelpers.ts`, `ParentConsole*`, `ProfileSelectionScreen.tsx`, `TopHUD.tsx` | Display + docs; giữ `truong_vien`, `pho_vien` |
| Role chủ nhiệm | Hiệu Trưởng/Primary Parent → **Chủ Nhiệm Chính**; Chủ Nhiệm Phụ giữ nguyên | `SUB_SPEC_FAMILY_ROLE.md`, `ParentConsole.tsx`, `FamilyManager.tsx`, `QuestManager.tsx`, `SettingsManager.tsx`, modal nhiệm vụ | Display + docs; giữ `parent`, `secondary_parent` |
| Học vụ | Đạo Sư → **Giảng Sư**; Khảo Quan giữ nguyên; Linh Sư → **Trợ Giáo MIKA**; Môn Sinh → **Sĩ Tử**; Môn Chủ → **Giám Học** | `CORE_SPECS.md`, `SUB_SPEC_XP_NP.md`, `src/types/game.ts`, `handbookPages.ts`, `GoogleLoginScreen.tsx`, `WorldMap.tsx`, `PlayArea/ExplanationBox.tsx` | Display + AI/message |
| Khảo thí | Đấu Trường → **Trường Thi**; Practice → **Ôn Luyện**; Survival → **Khảo Thí Liên Hoàn**; Boss → **Khoa Thi**; Revenge → **Sửa Bài Sai** | `Arena.tsx`, `PlayArea*`, `WorldMap.tsx`, `DesktopCentralNav.tsx`, `manifest.json`, handbook và mini-app result copy | Display + mode label; giữ enum `practice/survival/boss/revenge` |
| Tự học | Hang Luyện Công → **Học Đường**; Mật thất Biki → **Kho Nền Tảng** | `App.tsx`, `HangLuyenCong.tsx`, `HangMatThatPage.tsx`, `LessonStudyView.tsx`, `WorldMap.tsx`, `gatekeeper.ts`, lecture manager/modals | Display + route label; giữ screen/page IDs |
| Xưởng Biki | Mật thất 3D → **Xưởng Toán Hình 3D**; Hình học phẳng → **Xưởng Toán Hình**; Đồ thị → **Xưởng Toán Đồ Thị** | `HangMatThatPage.tsx`, `HangLuyenCong.tsx`, ba component Biki và route state trong `App.tsx` | Display; giữ component/page IDs |
| Không gian phụ trợ | RelaxationZone → **Công Viên Thư Giãn**; ItemShop → **Shop Học Cụ** | `RelaxationZone.tsx`, `ItemShop.tsx`, `WorldMap.tsx`, `TopHUD.tsx`, docs/UI rules | Display; giữ component/route IDs |
| Học cụ | Khai Ngộ Quyển → **Thẻ Nhắc Bài**; Hộ Tâm Phù → **Thẻ Chuyên Cần** | `ItemShop.tsx`, `PlayArea.tsx`, `createPlayerSlice.ts`, `handbookPages.ts`, `WorldMap.tsx` | Display + log/message; giữ action names ở phase display |
| Bối cảnh | Tầng Thế Giới → **Bậc Học**; Phút Tu Luyện → **Phút Đèn Sách**; Bảng Cáo Thị → **Bảng Bài Tập** | `src/types/game.ts`, `ProfilePage.tsx`, `useGameState.ts`, `WorldMap.tsx`, reports và Core Specs | Display + docs; giữ `gradeTier`, `learningMinutes`, `parentQuest` |
| Cá nhân hóa | Phong Vị → **Phong Cách Học Đường**; Thân Phận → **Hồ Sơ Sĩ Tử** | `uiThemes.ts`, `index.css`, `ProfilePage.tsx`, `ItemShop.tsx`, `TopHUD.tsx`, `ProfileSelectionScreen.tsx` | Display + CSS comments; giữ `uiTheme` và profile routes |
| MIKA | Sân Nuôi Thú → **Nhà Của MIKA**; Album Kỷ Niệm → **Nhật Ký MIKA** | `PetSanctuary.tsx`, `PetStableOverlay.tsx`, `TopHUD.tsx`, handbook/Core Specs | Display |
| Quà | Phần Thưởng Thực Tế → **Danh Mục Quà Khuyến Học**; Phúc Lợi Lớp Học → **Quà Khuyến Học** | `ItemShop.tsx`, `RewardManager.tsx`, reward modals, class reward service/routes, handbook, store types | Display + docs; giữ reward contract ngoài Ruby fields |
| Quản trị | Bảng Quản Trị → **Phòng Điều Hành**; Chính Điện → **Sổ Danh Bộ**; Thiên Cơ Các → **Phòng Học Vụ**; Vạn Quyển Các → **Kho Đề Thi**; Ngân Các → **Phòng Tài Vụ** | `ParentConsole.tsx`, `SettingsManager.tsx`, `QuestionBankManager.tsx`, `RewardManager.tsx`, handbook và sub-spec role/energy | Display/navigation; giữ tab IDs |
| Hướng dẫn | Cẩm Nang Bí Lục → **Cẩm Nang Học Đường** | `App.tsx`, `GiangHoCamNang.tsx`, `PetStableOverlay.tsx`, `handbookPages.ts`, CSS | Display; component rename để backlog implementation quyết định |
| Tài nguyên | Chân Khí → **Năng Lượng** | `SUB_SPEC_ENERGY.md`, `TopHUD.tsx`, student/admin energy controls, store/player types | Display + docs; giữ `energy/maxEnergy/resetHours` |
| Currency | NP/coins → **Ruby** | 55+ file frontend/backend/schema; xem backlog T2A | Domain/API/DB migration đã triển khai trong code |
| Sự kiện/hành động | Kỳ Ngộ Giang Hồ → **Thử Thách Bất Ngờ**; Logout → **Rời Học Viện**; skip punishment → **Miễn Phạt** | `CORE_SPECS.md`, `SUB_SPEC_ENERGY.md`, handbook, `MienPhatDialog.tsx`, `PlayArea.tsx`, admin slice | Display + behavior; Miễn Phạt đã đổi không trừ Ruby, giới hạn 3/ngày |

## 3. Feature/function đang ẩn hoặc chưa enable

### Nội dung theo lớp

- Đã chuyển toàn bộ content sang bảng canonical `ge10_lessons` và `ge10_custom_questions`.
- Availability của lớp/môn được suy ra từ dữ liệu; không còn implementation riêng theo lớp.
- Mọi consumer dùng `LearningContext`; database là nguồn nội dung chính thức.

### Các bậc 6, 7, 10, 11, 12

- Đang `coming_soon` và bị khóa có chủ đích trong `ProfilePage.tsx`.
- Lớp chỉ được mở khi database có nội dung canonical tương ứng.

### Các kết quả scan khác

- `hidden` trong navigation chủ yếu là responsive (`lg:hidden`, `hidden md:flex`), không phải feature bị tắt.
- `disabled` còn lại chủ yếu là guard loading, permission, validation, stock hoặc tiến độ; không có bằng chứng là feature hoàn chỉnh bị ẩn.
- Các `return null` được rà thấy chủ yếu là modal đóng, guard dữ liệu/permission hoặc primitive 3D không hợp lệ; không tự enable.
