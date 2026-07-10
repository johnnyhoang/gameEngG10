# Sub-Spec: Nguyên Tắc UI Bắt Buộc (UI Ground Rules)

Tài liệu này gom các quy tắc **luôn phải tuân theo** khi phát triển hoặc chỉnh sửa bất kỳ giao diện nào trong GameEngG10, để tránh lặp lại các lỗi UI đã từng mắc phải. Mọi PR/đợt code liên quan tới UI nên đối chiếu với danh sách này trước khi merge. Liên kết ngược tới **[CORE_SPECS.md](./CORE_SPECS.md)**.

## 1. Nguyên tắc Theme Token (không hardcode màu phá theme)
- Toàn bộ màu sắc nền/chữ/viền chính phải dùng biến CSS theme sẵn có (`--color-synth-cyan`, `--color-synth-bg`, `--color-synth-card`, v.v. định nghĩa tại `src/index.css`), **không hardcode** mã màu cố định (đặc biệt là đen tuyền `#000`/`black`) cho các lớp phủ, badge, hoặc trạng thái quan trọng.
- Lý do: Bách Hóa Phường cho phép đổi Phong Vị (Đào Hoa, Trúc Lâm, Tinh Không, Tuyết Sơn...) — các biến này tự đổi giá trị theo theme đang chọn (ví dụ `--color-synth-cyan` là cyan ở theme mặc định nhưng là hồng ở theme sáng/pastel). Hardcode màu sẽ làm giao diện lệch tông ở một số theme.

## 2. Quy tắc Trạng Thái Khóa / Mờ Sương (Fog Card)
Áp dụng cho mọi box đại diện cho khu vực/nội dung **chưa khám phá** (Fog of War — xem CORE_SPECS §2.8.7), triển khai chuẩn tại **[FogCard.tsx](./src/components/FogCard.tsx)**:
- **Không dùng nền đen (`bg-black/*`) cho lớp phủ mờ.** Lớp phủ phải là **mờ sương trắng**, có thể pha thêm màu chủ đạo của theme (biến `--color-synth-cyan`, tự động là hồng ở theme pastel) để tạo cảm giác "sương" thay vì "tối".
- **Ưu tiên hiệu ứng đám mây mờ trôi (animation)** thay vì một lớp phủ tĩnh — dùng các keyframe `fog-drift` / `fog-drift-reverse` (định nghĩa tại `src/index.css`) để tạo cảm giác sương đang chuyển động nhẹ nhàng.
- **Không dùng icon ổ khóa (🔒 / `Lock` từ lucide-react)** cho trạng thái mờ sương. Icon ổ khóa gợi cảm giác trừng phạt/cấm đoán, không phù hợp tông trải nghiệm học tập vui vẻ.
- **Chữ hiển thị phải theo ngữ cảnh trang** (prop `label` của `FogCard`), không dùng chung một câu cứng nhắc cho mọi nơi:
  - Mặc định (không truyền `label`): **"Khu vực chưa khám phá"**.
  - Đấu Trường (thử thách/ải luyện): **"Thử thách chưa trải nghiệm"**.
  - Hang Luyện Công (bài học): **"Bài học chưa trải nghiệm"**.
  - Sơn Trang Thư Giãn (mini-game): **"Trò chơi chưa trải nghiệm"**.
  - Bách Hóa Phường → Phong Vị (theme/trang phục giao diện): **"Trang phục chưa trải nghiệm"**.
  - Khi thêm loại Page mới có Fog Card, đặt tên nhãn theo mẫu **"[Loại nội dung] chưa trải nghiệm"**, không tự bịa câu ngoài mẫu này.
- **Bỏ hoàn toàn dòng phụ kiểu "Cần giải mã để tiến vào"** hay bất kỳ biến thể nào dùng từ "giải mã" — cơ chế mở khóa thật sự (câu hỏi Gác Cổng của Heo Maikawaii) đã tự giải thích qua tương tác, không cần nhắc lại bằng chữ.

## 3. Quy Tắc Thiết Kế UI Popup & Cảnh Báo (Minimalism)
Xem đầy đủ tại **CORE_SPECS.md §2.9** — nhắc lại tóm tắt: mọi popup cảnh báo/thông báo chỉ gồm **1 Icon phân loại** + **1 câu thông báo trọng tâm**, không thêm title/label rườm rà.

## 4. Nguyên tắc Linh Vật Duy Nhất
Xem CORE_SPECS §2.5 — Heo Maikawaii là nhân vật đồng hành/gác cổng **duy nhất** của toàn ứng dụng. Không thêm icon/nhân vật gác cổng nào khác (kể cả icon ổ khóa đóng vai trò "người gác cổng" tượng trưng) để tránh xung đột vai trò với linh vật.

## 5. Việc cần chốt tiếp (chưa làm ngay)
- Rà soát toàn bộ icon `Lock` còn sót lại trong codebase (ví dụ badge chú thích, tab điều hướng giai đoạn Pet) xem có nơi nào thực sự đại diện cho trạng thái Fog Card không để áp cùng quy tắc §2; các icon Lock dùng cho bảo mật PIN admin (`ParentConsole.tsx`) hoặc thẻ "sắp khai mở" (tính năng chưa phát triển) **không thuộc phạm vi** quy tắc này vì khác bản chất (không phải Fog of War).
