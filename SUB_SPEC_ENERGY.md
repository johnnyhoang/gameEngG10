# Sub-Spec: Luật Chân Khí (Energy System)

> 📌 Bản đề xuất v1 (do ClaudeCode soạn theo yêu cầu của Hiệu Trưởng ngày 2026-07-10). Các con số đánh dấu *(đề xuất)* cần Hiệu Trưởng xác nhận trước khi implement.

## 1. Vai trò của Chân Khí
Chân Khí là tài nguyên điều tiết **THỜI LƯỢNG chơi/học mỗi phiên** — công cụ để chủ nhiệm điều phối thời gian sử dụng app của con. Chân Khí **không phải hình phạt học lực**: nó không liên quan đúng/sai, chỉ liên quan "đã chơi bao nhiêu".

Nguyên tắc xương sống: **mọi hoạt động SINH ĐIỂM đều tiêu hao Chân Khí; hoạt động không sinh điểm thì miễn phí.** (Con chơi được điểm thì ngược lại năng lượng giảm — đúng chỉ đạo của Hiệu Trưởng.)

## 2. Cấu hình bởi Chủ nhiệm (per từng con, tại Ngân Các / ParentConsole)
| Tham số | Mặc định | Phạm vi | Ý nghĩa |
| :--- | :---: | :---: | :--- |
| `maxEnergy` | 100 | 50 – 300 *(đề xuất)* | Trần Chân Khí — quyết định độ dài một phiên chơi. Tăng max = cho con chơi lâu hơn; giảm max = siết lại. |
| `resetHours` | 3 | **2 / 3 / 5** | Số giờ để hồi ĐẦY lại sau khi cạn về 0 — do chủ nhiệm chọn 1 trong 3 mốc. |

## 3. Biểu tiêu hao (giữ Luật Khấu Trừ Trước — CORE_SPECS §2.1)
Chân Khí bị khấu trừ **một lần duy nhất khi xác nhận vào trận**; đã vào trận thì không bao giờ bị cắt ngang giữa chừng, kể cả cạn về 0 trong lúc làm bài.

| Hoạt động | Chân Khí tiêu hao |
| :--- | :---: |
| Ải luyện tập thường (Hang Luyện Công / Arena practice / Survival / Revenge) | -30 *(đề xuất)* |
| Lượt Quyết Đấu Boss (20 phút) | -100 *(đề xuất; nếu `maxEnergy` < 100 thì chi phí = `maxEnergy` — luôn đánh được 1 lượt Boss khi đầy bình)* |
| Mini-game Sơn Trang (mỗi ván) | -10 *(đề xuất)* |
| Câu hỏi Gatekeeper sương mù | 0 (miễn phí — chỉ vài click) |
| Đọc lý thuyết / Sổ tay / Nguồn tài liệu / Cẩm Nang / Album Pet / chăm heo | **0 (miễn phí)** — khuyến khích đọc và chăm heo trong lúc chờ hồi |

## 4. Khi Chân Khí về 0 (Depleted)
1. Mọi nút vào hoạt động sinh điểm bị **disable** kèm tooltip hiển thị giờ hồi (đếm ngược).
2. **Heo Maikawaii xuất hiện** (trigger `energy-depleted`, tuân thủ luật overlay + anti-spam §2.5) thông báo: hết năng lượng rồi, phải nghỉ ngơi, hẹn con quay lại lúc `HH:mm`, và gợi ý việc miễn phí (đọc lý thuyết, chăm heo, xem album).
3. Nếu đang giữa trận thì trận vẫn chạy đến hết bình thường (đã khấu trừ trước).

## 5. Luật Hồi Chân Khí (2 phương án — khuyến nghị A)
*   **Phương án A — Reset trọn gói (khuyến nghị, bám sát lời Hiệu Trưởng):** Thời điểm Chân Khí chạm 0, hệ thống ghi `depletedAt` và hẹn giờ `resetHours`. Hết giờ → hồi **ĐẦY** về `maxEnergy` một lần. Ưu điểm: trẻ dễ hiểu ("nghỉ 3 tiếng rồi quay lại"), chủ nhiệm dễ hình dung lịch phiên chơi (VD: max 100 + reset 3h ≈ tối đa ~3-4 phiên/ngày).
*   **Phương án B — Hồi nhỏ giọt (không khuyến nghị):** hồi dần `maxEnergy / resetHours` mỗi giờ kể cả khi chưa cạn. Mượt hơn nhưng khó giải thích cho trẻ và vô tình khuyến khích mở app liên tục để "hớt" năng lượng lẻ.
*   Ghi chú: nếu chọn A, Chân Khí **chưa cạn hẳn** thì không tự hồi (phiên chơi liền mạch); chỉ sự kiện cạn 0 mới kích hoạt đồng hồ hồi. Qua ngày mới (00:00) luôn hồi đầy bất kể trạng thái *(đề xuất)*.

## 6. Nguồn cộng Chân Khí ngoài chu kỳ hồi
*   **Chủ nhiệm ban thưởng thủ công:** nút "Ban Chân Khí" trong ParentConsole — hồi đầy tức thì khi chủ nhiệm muốn cho con học thêm ngay (VD: con xin học thêm buổi tối).
*   **Kỳ Ngộ Giang Hồ** (CORE_SPECS §3.4 — đang phân tích): có thể tặng một lượng Chân Khí nhỏ như phần thưởng ngẫu nhiên.

## 7. Telemetry & Báo cáo
*   Log mỗi sự kiện cạn năng lượng (`energy_depleted`) + tổng thời gian bị khóa mỗi ngày.
*   Báo cáo cho chủ nhiệm: "con cạn năng lượng X lần/tuần, thường vào khung giờ nào" — giúp chủ nhiệm cân chỉnh `maxEnergy` / `resetHours` cho hợp nhịp sinh hoạt.
