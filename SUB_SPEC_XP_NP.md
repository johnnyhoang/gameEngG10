# Sub-Spec: Hệ Thống Kinh Tế & Kinh Nghiệm (XP & Ruby)

Tài liệu này quy định chi tiết Ruby và điểm kinh nghiệm (XP) trong GameEngG10. Ruby là tài nguyên ảo, không phải tiền và không có tỷ giá tiền mặt.

## 1. Nguyên tắc Cốt lõi của Kinh Nghiệm (XP)
- **Luật Bất Cảm:** Điểm Kinh Nghiệm (XP) là thước đo nỗ lực học tập của Sĩ Tử. **XP chỉ có thể tăng hoặc đứng im, KHÔNG BAO GIỜ bị trừ** trong bất kỳ tình huống nào (kể cả khi bị phạt, chăm pet, hay bỏ học).
- Cấp độ (Level) được tính toán dựa trên tổng XP tích lũy. XP không bao giờ giảm đồng nghĩa Level không bao giờ tụt.

### 1.1 Các mốc nhận XP (Võ học Tinh tấn)
| Hành động | Lượng XP nhận được | Ghi chú |
| :--- | :--- | :--- |
| Trả lời đúng 1 câu hỏi thường | +15 XP | Áp dụng tại Học Đường & Trường Thi |
| Hoàn thành 1 bài học (Ải) | +50 XP | Thưởng thêm khi hoàn thành toàn bộ câu hỏi trong 1 bài |
| Đánh bại Boss | +150 XP | Thưởng hoàn thành bài thi 20 phút |
| Trả lời đúng trong trận Boss | +30 XP/câu | Nhân đôi XP so với câu thường |
| Luyện Thẻ nhớ (Flashcard) | +5 XP/thẻ | Mini-game Sơn Trang (giới hạn để tránh farm) |
| Ghép cặp / Mini-game khác | +20 XP/game | Thưởng khi clear 1 ván mini-game |

### 1.2 Ngưỡng Cấp độ & Danh hiệu — MỘT bảng duy nhất
Bảng định nghĩa **duy nhất** cho quan hệ XP → Level → Danh hiệu nằm tại **CORE_SPECS §7.2** (6 danh hiệu: Tân Đệ Tử → Tông Sư). Không tồn tại bảng thứ hai.
- **Công thức lên cấp (theo code hiện hành):** từ Level *n* lên Level *n+1* cần **n × 200 XP**.
- Khi vượt ngưỡng: hệ thống hiển thị **chúc mừng thăng cấp**, ghi log truyền công; chạm mốc danh hiệu (Level 5/15/30/50/80) thì tặng badge + thưởng đột biến (CORE_SPECS §7.3).
- *(Bảng cũ "Cấp 1–5: Tân Đệ Tử / Đệ Tử / Sĩ Tử / Đại Hiệp / Chưởng Môn theo mốc XP thô" đã bị **bãi bỏ** vì trùng lặp và lệch tên gọi với §7.2.)*

---

## 2. Nguyên tắc Cốt lõi của Ruby (Ruby - Coins)
- Ruby là đơn vị tiền tệ trao đổi trong game. Có thể **tăng và giảm** liên tục dựa trên các quyết định và kết quả tương tác của Sĩ Tử.
- Có thể dùng Ruby để mua học cụ, mở phong cách và đổi Quà Khuyến Học; không thể đổi Ruby trực tiếp thành tiền.

### 2.1 Các tình huống Tăng Ruby (Thu Nhập)
| Hành động | Lượng Ruby nhận được | Ghi chú |
| :--- | :--- | :--- |
| Trả lời đúng 1 câu hỏi thường | +5 Ruby | |
| Độ chính xác > 90% mỗi Ải | +20 Ruby | Rương Báu Ải (Bonus) |
| Chuỗi đúng (Combo 3 câu) | x1.2 / x1.5 / x2.0 | Hệ số nhân Ruby cho câu trả lời đúng tiếp theo |
| Giải mã cổng Sương mù đúng | +10 Ruby | Giải nhanh câu hỏi Gatekeeper của Pet |
| Làm Pet vui (Thọt lét) | +2 Ruby/lần | Giới hạn tối đa 5 lần/ngày để tránh spam click |
| Cất heo về chuồng tại Login Gate | +5 Ruby | Lần đầu tiên trong ngày — kế thừa thưởng của nút "Đã Lĩnh Ngộ" cũ (đã bỏ nút) |
| Hoàn thành Nhiệm vụ Phụ huynh | +100 - 500 Ruby | Tùy cấu hình của Viện Chủ |
| Hoàn thành lượt Boss | Bonus lớn theo Boss Card | Mức bonus do Chủ Viện / Phó Viện quy định, quảng bá trước ngay trên card (không thưởng tiền) |
| Giữ chuỗi ngày thứ 2 | +10 Ruby | Luật Chuỗi Tinh Tấn — thưởng leo thang theo ngày |
| Giữ chuỗi ngày thứ 3 | +20 Ruby | |
| Giữ chuỗi ngày thứ 4 trở đi | +30 Ruby/ngày | Mất chuỗi: chỉ reset thưởng về mốc ngày 1, **KHÔNG trừ Ruby** |

### 2.2 Các tình huống Giảm Ruby (Chi Tiêu & Phạt)
| Hành động | Lượng Ruby tiêu hao | Ghi chú |
| :--- | :--- | :--- |
| Cho Pet ăn thức ăn cơ bản | -20 Ruby | Khôi phục độ no của Pet |
| Mua đồ phụ kiện cho Pet | Tùy giá Shop | Mũ, kính, áo... tại Shop Học Cụ |
| Miễn Phạt (bỏ qua câu hỏi) | 0 Ruby | Không trừ Ruby; giới hạn 3 lượt/ngày và bắt buộc ghi lý do |
| Giải mã Sương mù sai | -5 Ruby/lần | Phạt nhẹ khi chọn sai Gatekeeper, câu mới sẽ hiện ngay |
| Pet đói quá lâu | -10 Ruby/ngày | Trừ mỗi ngày nếu Pet rơi vào trạng thái "Cực đói" |
| Mua Thẻ Chuyên Cần | Tùy giá Shop | *(Hồi Nguyên Đan đã bị xóa cùng hệ thống Tim)* |

*Lưu ý: Miễn Phạt luôn khả dụng bất kể số dư Ruby, nhưng tối đa 3 lượt/ngày. Các hành động chủ ý có chi phí yêu cầu đủ Ruby mới thực hiện được — không cho tiêu âm.*
*Lưu ý 2: Mất chuỗi học KHÔNG còn bị trừ Ruby (bãi bỏ mức phạt -50 Ruby cũ). Chuỗi chỉ reset và mất phần thưởng leo thang — xem §2.1 và CORE_SPECS §3.1.*
