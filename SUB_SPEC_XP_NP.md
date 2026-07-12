# Sub-Spec: Hệ Thống Kinh Tế & Kinh Nghiệm (XP & NP)

Tài liệu này quy định chi tiết luồng tiền tệ (Ngân lượng - NP) và điểm kinh nghiệm (XP) trong hệ thống GameEngG10, đảm bảo tính nhất quán về động lực tu học của Môn Sinh.

## 1. Nguyên tắc Cốt lõi của Kinh Nghiệm (XP)
- **Luật Bất Cảm:** Điểm Kinh Nghiệm (XP) là thước đo nỗ lực học tập của Môn Sinh. **XP chỉ có thể tăng hoặc đứng im, KHÔNG BAO GIỜ bị trừ** trong bất kỳ tình huống nào (kể cả khi bị phạt, chăm pet, hay bỏ học).
- Cấp độ (Level) được tính toán dựa trên tổng XP tích lũy. XP không bao giờ giảm đồng nghĩa Level không bao giờ tụt.

### 1.1 Các mốc nhận XP (Võ học Tinh tấn)
| Hành động | Lượng XP nhận được | Ghi chú |
| :--- | :--- | :--- |
| Trả lời đúng 1 câu hỏi thường | +15 XP | Áp dụng tại Hang Luyện Công & Đấu Trường |
| Hoàn thành 1 bài học (Ải) | +50 XP | Thưởng thêm khi hoàn thành toàn bộ câu hỏi trong 1 bài |
| Đánh bại Boss | +150 XP | Thưởng hoàn thành bài thi 20 phút |
| Trả lời đúng trong trận Boss | +30 XP/câu | Nhân đôi XP so với câu thường |
| Luyện Thẻ nhớ (Flashcard) | +5 XP/thẻ | Mini-game Sơn Trang (giới hạn để tránh farm) |
| Ghép cặp / Mini-game khác | +20 XP/game | Thưởng khi clear 1 ván mini-game |

### 1.2 Ngưỡng Cấp độ & Danh hiệu — MỘT bảng duy nhất
Bảng định nghĩa **duy nhất** cho quan hệ XP → Level → Danh hiệu nằm tại **CORE_SPECS §7.2** (6 danh hiệu: Tân Đệ Tử → Tông Sư). Không tồn tại bảng thứ hai.
- **Công thức lên cấp (theo code hiện hành):** từ Level *n* lên Level *n+1* cần **n × 200 XP**.
- Khi vượt ngưỡng: hệ thống hiển thị **chúc mừng thăng cấp**, ghi log truyền công; chạm mốc danh hiệu (Level 5/15/30/50/80) thì tặng badge + thưởng đột biến (CORE_SPECS §7.3).
- *(Bảng cũ "Cấp 1–5: Tân Đệ Tử / Đệ Tử / Môn Sinh / Đại Hiệp / Chưởng Môn theo mốc XP thô" đã bị **bãi bỏ** vì trùng lặp và lệch tên gọi với §7.2.)*

---

## 2. Nguyên tắc Cốt lõi của Ngân Lượng (NP - Coins)
- Ngân lượng (NP) là đơn vị tiền tệ trao đổi trong game. Có thể **tăng và giảm** liên tục dựa trên các quyết định và kết quả tương tác của Môn Sinh.
- Có thể dùng NP để mua vật phẩm trong Shop, hoặc gửi yêu cầu đổi thành Ví VND với Viện Chủ.

### 2.1 Các tình huống Tăng NP (Thu Nhập)
| Hành động | Lượng NP nhận được | Ghi chú |
| :--- | :--- | :--- |
| Trả lời đúng 1 câu hỏi thường | +5 NP | |
| Độ chính xác > 90% mỗi Ải | +20 NP | Rương Báu Ải (Bonus) |
| Chuỗi đúng (Combo 3 câu) | x1.2 / x1.5 / x2.0 | Hệ số nhân NP cho câu trả lời đúng tiếp theo |
| Giải mã cổng Sương mù đúng | +10 NP | Giải nhanh câu hỏi Gatekeeper của Pet |
| Làm Pet vui (Thọt lét) | +2 NP/lần | Giới hạn tối đa 5 lần/ngày để tránh spam click |
| Cất heo về chuồng tại Login Gate | +5 NP | Lần đầu tiên trong ngày — kế thừa thưởng của nút "Đã Lĩnh Ngộ" cũ (đã bỏ nút) |
| Hoàn thành Nhiệm vụ Phụ huynh | +100 - 500 NP | Tùy cấu hình của Viện Chủ |
| Hoàn thành lượt Boss | Bonus lớn theo Boss Card | Mức bonus do Chủ Viện / Phó Viện quy định, quảng bá trước ngay trên card (không thưởng tiền) |
| Giữ chuỗi ngày thứ 2 | +10 NP | Luật Chuỗi Tinh Tấn — thưởng leo thang theo ngày |
| Giữ chuỗi ngày thứ 3 | +20 NP | |
| Giữ chuỗi ngày thứ 4 trở đi | +30 NP/ngày | Mất chuỗi: chỉ reset thưởng về mốc ngày 1, **KHÔNG trừ NP** |

### 2.2 Các tình huống Giảm NP (Chi Tiêu & Phạt)
| Hành động | Lượng NP tiêu hao | Ghi chú |
| :--- | :--- | :--- |
| Cho Pet ăn thức ăn cơ bản | -20 NP | Khôi phục độ no của Pet |
| Mua đồ phụ kiện cho Pet | Tùy giá Shop | Mũ, kính, áo... tại Bách Hóa Phường |
| Bỏ qua (Skip) câu hỏi | -10 NP/câu | Phạt khi né tránh thử thách (có cảnh báo trước); không giới hạn số lần |
| Giải mã Sương mù sai | -5 NP/lần | Phạt nhẹ khi chọn sai Gatekeeper, câu mới sẽ hiện ngay |
| Pet đói quá lâu | -10 NP/ngày | Trừ mỗi ngày nếu Pet rơi vào trạng thái "Cực đói" |
| Mua Hộ Tâm Phù | Tùy giá Shop | *(Hồi Nguyên Đan đã bị xóa cùng hệ thống Tim)* |

*Lưu ý: **NP được phép ÂM VÔ HẠN, nhưng chỉ bởi các khoản trừ BẮT BUỘC của hệ thống** (Skip câu hỏi, giải sai cổng Sương mù, Pet đói bị trừ theo ngày). Skip luôn khả dụng kể cả khi NP = 0 hoặc âm — tránh deadlock khi học sinh yếu kẹt trước câu khó. Ngược lại, các hành động **chủ ý** (mua vật phẩm Shop, cho Pet ăn, mua Phong Vị, đổi Phần Thưởng Thực Tế) yêu cầu đủ NP mới thực hiện được — không cho tiêu âm.*
*Lưu ý 2: Mất chuỗi học KHÔNG còn bị trừ NP (bãi bỏ mức phạt -50 NP cũ). Chuỗi chỉ reset và mất phần thưởng leo thang — xem §2.1 và CORE_SPECS §3.1.*
