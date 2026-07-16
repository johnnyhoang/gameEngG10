# Sub-Spec: Nguyên Tắc UI Bắt Buộc (UI Ground Rules)

Tài liệu này gom các quy tắc **luôn phải tuân theo** khi phát triển hoặc chỉnh sửa bất kỳ giao diện nào trong GameEngG10, để tránh lặp lại các lỗi UI đã từng mắc phải. Mọi PR/đợt code liên quan tới UI nên đối chiếu với danh sách này trước khi merge. Liên kết ngược tới **[CORE_SPECS.md](./CORE_SPECS.md)**.

## 1. Nguyên tắc Theme Token (không hardcode màu phá theme)
- Toàn bộ màu sắc nền/chữ/viền chính phải dùng biến CSS theme sẵn có (`--color-synth-cyan`, `--color-synth-bg`, `--color-synth-card`, v.v. định nghĩa tại `src/index.css`), **không hardcode** mã màu cố định (đặc biệt là đen tuyền `#000`/`black`) cho các lớp phủ, badge, hoặc trạng thái quan trọng.
- Lý do: Shop Học Cụ cho phép đổi Phong Cách Học Đường (Đào Hoa, Trúc Lâm, Tinh Không, Tuyết Sơn...) — các biến này tự đổi giá trị theo theme đang chọn (ví dụ `--color-synth-cyan` là cyan ở theme mặc định nhưng là hồng ở theme sáng/pastel). Hardcode màu sẽ làm giao diện lệch tông ở một số theme.

## 2. Quy tắc Trạng Thái Khóa / Mờ Sương (Fog Card)
Áp dụng cho mọi box đại diện cho khu vực/nội dung **chưa khám phá** (Fog of War — xem CORE_SPECS §2.8.7), triển khai chuẩn tại **[FogCard.tsx](./src/components/FogCard.tsx)**:
- **Không dùng nền đen (`bg-black/*`) cho lớp phủ mờ.** Lớp phủ phải là **mờ sương trắng**, có thể pha thêm màu chủ đạo của theme (biến `--color-synth-cyan`, tự động là hồng ở theme pastel) để tạo cảm giác "sương" thay vì "tối".
- **Ưu tiên hiệu ứng đám mây mờ trôi (animation)** thay vì một lớp phủ tĩnh — dùng các keyframe `fog-drift` / `fog-drift-reverse` (định nghĩa tại `src/index.css`) để tạo cảm giác sương đang chuyển động nhẹ nhàng.
- **Không dùng icon ổ khóa (🔒 / `Lock` từ lucide-react)** cho trạng thái mờ sương. Icon ổ khóa gợi cảm giác trừng phạt/cấm đoán, không phù hợp tông trải nghiệm học tập vui vẻ.
- **Chữ hiển thị phải theo ngữ cảnh trang** (prop `label` của `FogCard`), không dùng chung một câu cứng nhắc cho mọi nơi:
  - Mặc định (không truyền `label`): **"Khu vực chưa khám phá"**.
  - Trường Thi (thử thách/ải luyện): **"Thử thách chưa trải nghiệm"**.
  - Học Đường (bài học): **"Bài học chưa trải nghiệm"**.
  - Công Viên Thư Giãn (mini-game): **"Trò chơi chưa trải nghiệm"**.
  - Shop Học Cụ → Phong Cách Học Đường (theme/trang phục giao diện): **"Trang phục chưa trải nghiệm"**.
  - Khi thêm loại Page mới có Fog Card, đặt tên nhãn theo mẫu **"[Loại nội dung] chưa trải nghiệm"**, không tự bịa câu ngoài mẫu này.
- **Bỏ hoàn toàn dòng phụ kiểu "Cần giải mã để tiến vào"** hay bất kỳ biến thể nào dùng từ "giải mã" — sương mù không chặn quyền mở nội dung.
- **Fog không chặn tương tác:** Bấm card mờ phải mở ngay nội dung. Chỉ completion thật sự mới tăng tiến độ tan sương; không hiển thị modal/câu hỏi trung gian.

## 3. Quy Tắc Thiết Kế UI Popup & Cảnh Báo (Minimalism)
Xem đầy đủ tại **CORE_SPECS.md §2.9** — nhắc lại tóm tắt: mọi popup cảnh báo/thông báo chỉ gồm **1 Icon phân loại** + **1 câu thông báo trọng tâm**, không thêm title/label rườm rà.

## 4. Nguyên tắc Linh Vật Duy Nhất
Xem CORE_SPECS §2.5 — Heo Maikawaii là nhân vật đồng hành/gác cổng **duy nhất** của toàn ứng dụng. Không thêm icon/nhân vật gác cổng nào khác (kể cả icon ổ khóa đóng vai trò "người gác cổng" tượng trưng) để tránh xung đột vai trò với linh vật.

## 5. Việc cần chốt tiếp (chưa làm ngay)
- Rà soát toàn bộ icon `Lock` còn sót lại trong codebase (ví dụ badge chú thích, tab điều hướng giai đoạn Pet) xem có nơi nào thực sự đại diện cho trạng thái Fog Card không để áp cùng quy tắc §2; các icon Lock dùng cho bảo mật PIN admin (`ParentConsole.tsx`) hoặc thẻ "sắp khai mở" (tính năng chưa phát triển) **không thuộc phạm vi** quy tắc này vì khác bản chất (không phải Fog of War).

## 6. Quy Tắc Giao Diện Toast (Thông báo nhanh)
- **Không hardcode màu sắc cố định** (như `text-white/95 bg-slate-950/90`) cho Toast.
- **Sử dụng các biến CSS Toast** (`--theme-toast-bg`, `--theme-toast-text`, `--theme-toast-text-muted`, v.v.) định nghĩa riêng theo từng Phong Cách Học Đường để đảm bảo trên các theme có nền sáng (như Đào Hoa, Trúc Lâm, Tuyết Sơn), chữ thông báo Toast tự động đổi sang màu tối dễ đọc, và trên các theme tối chữ tự động chuyển sang màu sáng tương phản tốt.

## 7. Cấu trúc Giao diện chính và Điều hướng Hub (Tái cấu trúc mới)
Hệ thống giao diện được tinh giản tối đa thành mô hình Tab Hub thống nhất, loại bỏ hoàn toàn các trang con phụ và điều hướng đa tầng phức tạp:

### 7.1 Cấu trúc 5-Tab Học sinh (AcademyHub)
Môi trường học sinh (`AcademyHub.tsx`) quản lý 5 tab chính liên kết đồng bộ:
1. **Học Viện (Academy)**: Hub trung tâm chứa Sổ Tu Học (`LearningLedger`) hiển thị mở rộng ngay đầu trang, Lời chào Sĩ tử, Trợ giảng AI gợi ý điểm yếu, Quests hàng ngày (cột trái) và hồ sơ cá nhân rút gọn + nhật ký hoạt động (`ActivityLog`) (cột phải).
2. **Hang Luyện (Knowledge Hall)**: PracticeHall tự học theo chuyên đề, sai sót và bài giảng.
3. **Trường Thi (Challenge Hall)**: Arena luyện thi chính với 4 phòng chiến đấu.
4. **Khu Thám Hiểm (Adventure Zone)**: RelaxationZone chứa các minigame thư giãn.
5. **Funzone**: Vùng giải trí tích hợp. Vùng chính là Cửa hàng (`ItemShop`) để mua đồ, cột bên phải là Sân Thú Nuôi (`PetSanctuary`) để chăm sóc thú cưng và Album ngay dưới thú.

### 7.2 Cấu trúc 3-Tab Giáo viên / Viện Trưởng (TutorConsole)
Môi trường quản trị (`TutorConsole.tsx`) tinh giản còn 3 tab chính:
1. **Phòng Hiệu Trưởng / Phòng Giáo Viên (`phong_hieu_truong`)**: Chứa thống kê, danh sách học sinh liên kết/toàn trường, danh sách cán bộ nhân sự (Giáo viên, duyệt phó viện trưởng, phân quyền) và Cài đặt hệ thống (SettingsManager) thông qua hệ thống sub-tab con.
2. **Bài Giảng (`tang_kinh_cac`)**: Phòng quản lý Knowledge (LectureBankManager).
3. **Đề Thi (`van_quyen_cac`)**: Ngân hàng câu hỏi trắc nghiệm (QuestionBankManager).

### 7.3 Nguyên tắc Modal / Overlay cho cấp sâu hơn
- **Không sử dụng trang phụ hoặc trang con mới**: Khi bấm vào các tác vụ cấp sâu hơn (như Xưởng hình học 3D/Plane/Graph, chi tiết học bài của học sinh, hoặc Xem hồ sơ chi tiết học sinh `StudentProfileView` từ danh sách của giáo viên), bắt buộc phải render dưới dạng **Modal Overlay toàn màn hình** hoặc **Right/Left Panel overlay**.
- Khi đóng Modal/Overlay, người dùng phải được trả về chính xác vị trí Tab hiện tại trước đó mà không làm reset trạng thái của Hub.