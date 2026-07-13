# Sub-Spec: Đặc Tả Thông Báo Toast (Toast Notifications Ground Rules)

Tài liệu này đặc tả quy chuẩn hiển thị thông báo Toast cho mọi hành vi làm thay đổi tài nguyên (Ruby, XP, Năng Lượng), thăng cấp (Level), hoặc các sự kiện thành công/lỗi trong GameEngG10. Liên kết ngược tới **[CORE_SPECS.md](./CORE_SPECS.md)** và **[SUB_SPEC_UI_RULES.md](./SUB_SPEC_UI_RULES.md)**.

## 1. Nguyên Tắc Thiết Kế Toast
- **Tính nhất quán màu sắc**: Mọi Toast phải sử dụng các class helper động định nghĩa theo theme (`gameeng-toast`, `gameeng-toast-title`, v.v.) để tự động đổi màu chữ sang tối trên các theme sáng (Đào Hoa, Trúc Lâm, Tuyết Sơn) và màu chữ sáng trên các theme tối (Mặc định, Tinh Không, Thu Phong).
- **Hành vi rõ ràng**: Nội dung thông báo phải ghi nhận chính xác lượng tài nguyên thay đổi (ví dụ: `+10 Ruby 💎`, `-5 XP ✨`).
- **Linh vật Heo Maikawaii**: Sử dụng biểu tượng heo 🐷 cho các thông báo nhắc nhở hoặc báo lỗi thân thiện liên quan đến học tập.

---

## 2. Danh Sách Sự Kiện Kích Hoạt Toast

### A. Thay đổi Tài nguyên (Ruby, XP)
| Sự kiện | Loại | Nội dung Toast chuẩn | Vị trí xử lý |
| :--- | :---: | :--- | :--- |
| Nhận thưởng Ruby & XP | Success | `🎉 Lĩnh ngộ thành công: +{ruby} Ruby 💎 và +{xp} XP ✨` | `awardRubyAndXp` (store) |
| Lĩnh hội bài học | Success | `📖 Lĩnh hội bài học "{title}" thành công: +50 XP ✨` (nếu accuracy >=90% cộng thêm `và +20 Ruby 💎 (Rương Báu Ải)`) | `masterLesson` (store) |
| Bại trận Trường Thi | Error | `💀 Thất bại giữa trận! Con bị tước đi 50% chiến lợi phẩm: -{ruby} Ruby 💎 và -{xp} XP ✨. Thú cưng buồn bã 🐷.` | `applyDefeatPenalty` (store) |
| Hạ Boss thành công | Success | `🔥 Đại Thắng Boss! Nhận ngay +{ruby} Ruby 💎 và +{xp} XP ✨! 🎉` | `completeBossVictory` (store) |
| Trả lời đúng Riddle | Success | *(Tự động kích hoạt qua `awardRubyAndXp`)* | `RiddleGames.tsx` |
| Trả lời sai Riddle | Error | `Nhầm rồi Sĩ Tử! Hãy thử sức ở câu sau nhé! 🐷` | `RiddleGames.tsx` |

### B. Năng Lượng (Energy)
| Sự kiện | Loại | Nội dung Toast chuẩn | Vị trí xử lý |
| :--- | :---: | :--- | :--- |
| Tiêu hao năng lượng | Info | `⚡ Tiêu hao -{amount} Năng lượng!` | `useEnergy` (store) |
| Hồi phục năng lượng | Success | `⚡ Hồi phục +{amount} Năng lượng!` | `addEnergy` (store) |
| Tự động hồi đầy | Success | `⚡ Năng Lượng đã được hồi đầy! Sẵn sàng học tập! 🌟` | `tickEnergyRegen` (store) |

### C. Cấp Độ (Level)
| Sự kiện | Loại | Nội dung Toast chuẩn | Vị trí xử lý |
| :--- | :---: | :--- | :--- |
| Thăng Cấp Sĩ Tử | Success | `🎉 Chúc mừng Sĩ Tử thăng cấp lên Cấp {level}! ✨` | `checkLevelUp` (helpers) |
| Thăng Cấp Danh Hiệu | Success | `🏆 Tuyệt vời! Sĩ Tử thăng cấp danh hiệu lên: {icon} {name}! 🎉 (+100 Ruby 💎)` | `checkLevelUp` (helpers) |

### D. Thú Nuôi (Pet Sanctuary)
| Sự kiện | Loại | Nội dung Toast chuẩn | Vị trí xử lý |
| :--- | :---: | :--- | :--- |
| Cho Heo ăn no | Success | `🐷 Heo Maikawaii đã ăn no! Con tiêu hao 10 Ruby 💎 và 5 XP ✨.` (nếu bị tụt cấp: `và bị phạt tụt xuống Level {level} ⚠️`) | `feedPet` (store) |

### E. Vòng Quay & Hòm Bí Mật (Mini-games)
| Sự kiện | Loại | Nội dung Toast chuẩn | Vị trí xử lý |
| :--- | :---: | :--- | :--- |
| Quay số trúng Ruby | Success | `🎡 Vòng Quay May Mắn: Nhận +{amount} Ruby! 💎` | `spinWheel` (store) |
| Quay số trúng Năng lượng | Success | `🎡 Vòng Quay May Mắn: Hồi phục +{amount} Năng lượng! ⚡` | `spinWheel` (store) |
| Quay số trượt | Info | `🎡 Vòng Quay May Mắn: Trượt tay lần này, gỡ ở lần sau.` | `spinWheel` (store) |
| Mở hòm trúng Ruby | Success | `🎁 Hòm Bí Mật: Nhận +{amount} Ruby! 💎` | `openMysteryBox` (store) |
| Mở hòm trúng Khiên | Success | `🎁 Hòm Bí Mật: Nhận được 1 Khiên Chuyên Cần bảo vệ Streak! 🛡️` | `openMysteryBox` (store) |
| Mở hòm trống | Info | `🎁 Hòm Bí Mật: Rương trống rỗng, chúc con may mắn lần sau!` | `openMysteryBox` (store) |
