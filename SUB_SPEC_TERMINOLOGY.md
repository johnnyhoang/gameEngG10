# Sub-Spec: Tự Điển Thuật Ngữ & Ngôn Ngữ Sản Phẩm

Tài liệu này là **single source of truth** cho mọi tên gọi, khái niệm, hành động, nội dung hiển thị và message của GameEngG10. `CORE_SPECS.md` và các sub-spec khác chỉ tham chiếu, không tạo định nghĩa cạnh tranh.

## 1. Bản sắc ngôn ngữ

- Thế giới sản phẩm lấy cảm hứng từ **trường học, học phủ và văn hóa giáo dục truyền thống Việt Nam**.
- Ngôn ngữ phải gợi tinh thần hiếu học, tôn sư trọng đạo, rèn đức luyện tài và khoa cử; dễ hiểu với học sinh hiện đại, không cổ hóa đến mức khó sử dụng.
- Không trộn tùy tiện thuật ngữ kiếm hiệp, tiên hiệp hoặc văn hóa nước ngoài. Thuật ngữ cũ được giữ để bảo toàn contract cho đến khi mapping mới được duyệt.
- Một khái niệm chỉ có một tên tiếng Việt chuẩn trong cùng ngữ cảnh. Không dùng cùng một tên cho hai role hoặc chức năng khác nhau.

## 2. Quy tắc biên soạn và thay đổi

Mỗi entry phải có: **tên tiếng Việt chuẩn**, **tên tiếng Anh**, **code/technical term**, **loại**, **định nghĩa/công dụng** và **trạng thái**.

- `APPROVED`: được dùng làm chuẩn trong spec, code và UI.
- `PROVISIONAL`: đang tồn tại nhưng cần rà soát hoặc đổi tên.
- `DEPRECATED`: chỉ giữ để tương thích; không dùng cho nội dung mới.

Quy trình thêm hoặc đổi thuật ngữ:

1. Phân tích ý nghĩa, ngữ cảnh và xung đột với entry hiện có.
2. Thống nhất tên tiếng Việt, tiếng Anh và technical term với người dùng.
3. Cập nhật tự điển và backlog impact trước khi sửa code.
4. Giữ code value/DB value cũ nếu chỉ đổi display name; mọi migration phải có compatibility plan và được xác nhận riêng.
5. Rà đồng bộ UI, message, AI prompt, frontend types/constants, backend responses, seed data, database và tài liệu.

## 3. Tự điển hiện hành

> [!WARNING]
> Tất cả entry dưới đây đã được người dùng duyệt. Code value hiện hành được giữ nguyên, ngoại trừ Ruby có migration tương thích riêng.

| Tên tiếng Việt (UI) | Tên tiếng Anh | Code/technical term | Loại | Định nghĩa và công dụng | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Viện Trưởng** 👑 | Institute Head / Super Admin | `truong_vien` | Role | Người quản trị cao nhất của toàn học viện. | APPROVED |
| **Phó Viện Trưởng** 🛡️ | Deputy Institute Head / Moderator | `pho_vien` | Role | Người được Viện Trưởng ủy quyền quản trị trong phạm vi cho phép. | APPROVED |
| **Chủ Nhiệm Chính** 👨‍👩‍👧 | Primary Teacher / Primary Parent | `parent` | Role | Người chịu trách nhiệm chính cho lớp hoặc nhóm học sinh. | APPROVED |
| **Chủ Nhiệm Phụ** 👤 | Supporting Teacher / Secondary Parent | `secondary_parent` | Role | Người hỗ trợ lớp với quyền do Chủ Nhiệm Chính ủy quyền. | APPROVED |
| **Giảng Sư** 📖 | Teacher / Content Creator | `teacher` | Role (future) | Người giảng dạy, biên soạn và hướng dẫn học liệu. | APPROVED |
| **Khảo Quan** 📝 | Examiner / Grader | `grader` | Role (future) | Người chấm và đánh giá bài làm. | APPROVED |
| **Trợ Giáo MIKA** 🤖 | MIKA AI Teaching Assistant | `aiCompanion`, `ai_teacher`, `Gemini` | Character/service | Trợ giáo AI hướng dẫn Sĩ Tử; không thay thế vai trò quyết định của Giảng Sư. | APPROVED |
| **Sĩ Tử** 🌱 | Student / Learner | `student`, `player`, `user` | Role | Người học tham gia rèn luyện và chuẩn bị cho các kỳ khảo thí. | APPROVED |
| **Giám Học** ⚖️ | Discipline Supervisor | `disciplineVoice`, `systemVoice` | System character | Giọng hệ thống nhắc quy củ và xử lý hành vi bỏ qua thử thách; không phải tài khoản thật. | APPROVED |
| **Trường Thi** 🏛️ | Examination Hall | `PlayArea`, `Arena`, `arena` | Module | Khu luyện tập và khảo thí có áp lực thời gian hoặc giới hạn lỗi. | APPROVED |
| **Ôn Luyện** | Practice Mode | `practice`, `mixed` | Mode | Luyện tự do hoặc tổng hợp theo mảng kiến thức. | APPROVED |
| **Khảo Thí Liên Hoàn** | Endurance Examination | `survival` | Mode | Lượt khảo thí liên tục kết thúc khi đủ ba lần sai. | APPROVED |
| **Khoa Thi** | Formal Examination | `boss`, `bossBattle` | Mode | Thi thử theo đề chuẩn và giới hạn thời gian. | APPROVED |
| **Sửa Bài Sai** | Mistake Review | `revenge` | Mode | Học và làm lại các câu từng trả lời sai. | APPROVED |
| **Học Đường** 🏫 | Learning Hall | `TrainingCave`, `hang`, `hang-plane`, `hang-3d` | Module | Không gian tự học, hệ thống hóa lý thuyết và đi vào các công cụ thực hành. | APPROVED |
| **Kho Nền Tảng** 🔮 | Foundation Hub | `BikiStudios`, `biki` | Module | Nơi tập hợp các công cụ nền tảng và xưởng Toán học tương tác của Biki. | APPROVED |
| **Xưởng Toán Hình 3D** | 3D Geometry Workshop | `Biki3DStudio`, `hang-3d` | Tool | Mô phỏng và thao tác hình học không gian ba chiều. | APPROVED |
| **Xưởng Toán Hình** | Geometry Workshop | `BikiHinhHocPhang`, `hang-graph` | Tool | Dựng và thao tác hình học phẳng. | APPROVED |
| **Xưởng Toán Đồ Thị** | Function Graph Workshop | `BikiDoThiHamSo`, `hang-plane` | Tool | Vẽ và khảo sát đồ thị hàm số. | APPROVED |
| **Phrase Valley** | Phrase Valley | `phrase-valley` | English-only mini-app | Không gian luyện collocation, phrasal verbs và cụm từ theo ngữ cảnh; chỉ hiển thị khi môn đang chọn là Tiếng Anh. Tên UI luôn giữ nguyên tiếng Anh. | APPROVED |
| **Conversation Town** | Conversation Town | `conversation-town` | English-only mini-app | Không gian luyện phản xạ hội thoại và đáp lời theo tình huống; chỉ hiển thị khi môn đang chọn là Tiếng Anh. Tên UI luôn giữ nguyên tiếng Anh. | APPROVED |
| **Writing Pavilion** | Writing Pavilion | `writing-pavilion` | English-only mini-app | Không gian luyện viết câu, nối câu, viết lại câu và đoạn văn theo rubric; chỉ hiển thị khi môn đang chọn là Tiếng Anh. Tên UI luôn giữ nguyên tiếng Anh. | APPROVED |
| **Listening Lake** | Listening Lake | `listening-lake` | English-only mini-app | Không gian luyện nghe, nhận diện từ khóa và ý chính; chỉ hiển thị khi môn đang chọn là Tiếng Anh. Tên UI luôn giữ nguyên tiếng Anh. | APPROVED |
| **Công Viên Thư Giãn** 🦄 | Relaxation Park | `RelaxationZone`, `relax` | Module | Khu mini-game học tập nhẹ nhàng. | APPROVED |
| **Shop Học Cụ** 🏮 | Learning Item Shop | `ItemShop`, `shop` | Module | Cửa hàng đổi học cụ, vật phẩm hỗ trợ và đặc quyền. | APPROVED |
| **Thẻ Nhắc Bài** 📜 | Study Hint Card | `hints`, `hint`, `buyHint` | Item/action | Nhắc hướng giải hoặc loại đáp án nhiễu mà không làm thay bài. | APPROVED |
| **Thẻ Chuyên Cần** 🛡️ | Attendance Protection Card | `badges`, `buyStreakShield` | Item/action | Bảo vệ chuỗi học tập khi bỏ lỡ một ngày. | APPROVED |
| **Bậc Học** 🗼 | Grade Tier | `gradeTier` | Context | Lớp học hiện hành và ranh giới cô lập dữ liệu cao nhất. | APPROVED |
| **Ngữ Cảnh Học Tập** | Learning Context | `LearningContext`, `gradeTier`, `subjectId` | Technical/product concept | Cặp Bậc Học và Môn học đang được chọn; toàn bộ app dùng cặp này để lọc nội dung, tiến trình và capability bằng implementation chung. | PROVISIONAL |
| **Mô-đun Chuyên Môn** | Subject Module | `SubjectModule` | Architecture/module | Gói build-time thuộc một môn, đóng góp feature chuyên môn vào các điểm gắn chuẩn của app mà không sở hữu app shell. | APPROVED |
| **Công Cụ Chuyên Môn** | Subject Tool | `SubjectToolContribution`, `subject-tool` | Tool contribution | Công cụ tương tác chuyên sâu của một môn, ví dụ các Xưởng Toán. | APPROVED |
| **Hoạt Động Chuyên Môn** | Subject Activity | `SubjectActivityContribution`, `subject-activity` | Activity contribution | Luồng luyện tập có nghiệp vụ riêng của môn, ví dụ Đọc hiểu hoặc Viết nghị luận Văn. | APPROVED |
| **Bộ Đánh Giá Chuyên Môn** | Assessment Provider | `AssessmentProviderContribution`, `assessment-provider` | Service contribution | Bộ nhận diện và chấm một dạng bài đặc thù, ví dụ chấm bài Văn theo rubric. | APPROVED |
| **Bộ Hiển Thị Câu Hỏi Chuyên Môn** | Question Renderer | `QuestionRendererContribution`, `question-renderer` | UI contribution | Quy tắc trình bày câu hỏi đặc thù như tách ngữ liệu đọc hiểu khỏi yêu cầu trả lời. | APPROVED |
| **Danh Mục Quà Khuyến Học** 🎁 | Learning Reward Catalog | `parentReward`, `rewardQuantity`, `markRewardDelivered` | Feature | Danh mục quà ngoài đời do người quản lý tạo, định lượng và xác nhận trao. | APPROVED |
| **Phút Đèn Sách** ⏱️ | Learning Minutes | `learningMinutes`, `estimatedMinutes` | Metric | Tổng thời gian học, chỉ số North Star. | APPROVED |
| **Bảng Bài Tập** 📜 | Assigned Learning Tasks | `parentQuest` | Feature | Nhiệm vụ học tập do người quản lý giao cho Sĩ Tử. | APPROVED |
| **Sổ Tu Học** 📖 | Learning Journey Ledger | `LearningLedger`, `mission-ledger` | Global module | Module chung dưới TopHUD, hiển thị Nhập Môn, Nhiệm Vụ Hôm Nay và Tiến Độ Tu Học trên mọi trang Sĩ Tử. | APPROVED |
| **Nhập Môn** 🌱 | Onboarding Journey | `onboarding` | Mission group | Chuỗi cột mốc chỉ hoàn thành một lần trong đời profile để khám phá và làm quen với học viện. | APPROVED |
| **Nhiệm Vụ Hôm Nay** 📋 | Daily Missions | `daily` | Mission group | Mục tiêu học tập theo ngày, sinh từ capability và nội dung thật của profile; reset theo timezone học viện. | APPROVED |
| **Tiến Độ Tu Học** 📈 | Learning Progress | `learning-progress` | Progress summary | Tóm tắt Level, XP, chuỗi học, bài hoàn thành và cột mốc kế tiếp của profile. | APPROVED |
| **Phong Cách Học Đường** 🎭 | School Style / Appearance Theme | `uiTheme`, `UiThemeId`, `ProfileThemeModal` | Feature | Giao diện cá nhân hóa theo hồ sơ. | APPROVED |
| **Quà Khuyến Học** 🎁 | Learning Reward | `rewards`, `ParentReward`, `claimParentReward` | Feature | Món quà thực tế mà Sĩ Tử có thể xem, đổi và chờ xác nhận trao. | APPROVED |
| **Nhà Của MIKA** 🐷 | MIKA's Home / Pet Sanctuary | `PetSanctuary`, `pet` | Module | Nơi chăm sóc và tương tác với Heo Maikawaii. | APPROVED |
| **Nhật Ký MIKA** | MIKA Memory Journal | `petAlbum`, `memoryAlbum` | Feature | Lưu hình ảnh và nhật ký hành trình của MIKA. | APPROVED |
| **Hồ Sơ Sĩ Tử** 👑 | Student Profile | `ProfileThemeModal`, `isProfileOpen` | Module | Quản lý hồ sơ, danh hiệu, phong cách và môn học của Sĩ Tử. | APPROVED |
| **Phòng Điều Hành** | Administration Console | `ParentConsole`, `parent` | Module | Không gian quản lý dành cho Viện Trưởng, Phó Viện Trưởng, Chủ Nhiệm Chính và Chủ Nhiệm Phụ theo quyền. | APPROVED |
| **Sổ Danh Bộ** 🏛️ | Member Register | `chinh_dien` | Module | Quản lý danh sách, hồ sơ và vai trò thành viên. | APPROVED |
| **Phòng Học Vụ** 📖 | Academic Affairs & Analytics | `thien_co_cac` | Module | Báo cáo, thống kê và dashboard học tập. | APPROVED |
| **Kho Đề Thi** 📚 | Question Bank | `van_quyen_cac`, `QuestionBank` | Module | Quản lý câu hỏi, đề thi và quy trình import đề. | APPROVED |
| **Phòng Tài Vụ** 💰 | Resources & Rewards Administration | `ngan_cac` | Module | Quản lý tài nguyên, cấu hình gameplay và quà khuyến học. | APPROVED |
| **Cẩm Nang Học Đường** 📖 | School Handbook | `GiangHoCamNang`, `handbookPages` | Feature | Hướng dẫn sử dụng và giải thích quy tắc trong ứng dụng. | APPROVED |
| **Năng Lượng** ⚡ | Energy | `energy`, `maxEnergy`, `resetHours` | Resource | Tài nguyên tiêu hao khi học/chơi; xem `SUB_SPEC_ENERGY.md`. | APPROVED |
| **Ruby** 💎 | Ruby | `ruby`, `rubyChanged`, `costRuby`; legacy: `coins`, `coinsChanged`, `costCoins`, `NP` | Resource | Đơn vị tích lũy dùng để đổi học cụ, phong cách và quà khuyến học. Ruby là tên hiển thị và domain term chuẩn; các tên legacy chỉ tồn tại trong giai đoạn migration tương thích. | APPROVED |
| **Thử Thách Bất Ngờ** | Random Challenge | `randomEvent` | Feature | Thử thách xuất hiện ngẫu nhiên trong các luồng học tập. | APPROVED |
| **Đố Vui Nhận Ruby** | Ruby Riddle | `ruby-riddle`, `RubyRiddleGame` | Mini-game | Trò một câu MCQ thường trực tại Trường Thi; đúng nhận Ruby, sai không bị phạt. | APPROVED |
| **Tốc Chiến Kỳ Ngộ** | Encounter Sprint | `encounter-sprint`, `EncounterSprintGame` | Mini-game | Lượt nhanh 3 câu MCQ trong tổng 60 giây tại Trường Thi. | APPROVED |
| **Rời Học Viện** 🚪 | Logout | `onLogout`, `logout` | Action | Đăng xuất khỏi ứng dụng. | APPROVED |
| **Miễn Phạt** ⚖️ | Penalty Exemption | `skipPunishment`, `MonChuHoiToi` | Action/flow | Cho phép bỏ qua câu hỏi mà không bị trừ Ruby; vẫn áp dụng giới hạn lượt bỏ qua theo ngày. | APPROVED |

## 4. Message và hành động

- Button dùng động từ rõ ràng; cùng một hành động phải dùng cùng một nhãn trên mọi màn hình.
- Message phải nói rõ điều đã xảy ra, tác động và bước tiếp theo; không dùng lời cổ quá khó hiểu cho lỗi, quyền truy cập hoặc dữ liệu.
- Technical identifier không hiển thị trực tiếp cho học sinh nếu đã có tên tiếng Việt chuẩn.
- Ngoại lệ đã duyệt: feature chuyên biệt cho môn Tiếng Anh có thể dùng tên UI hoàn toàn bằng tiếng Anh khi entry tự điển ghi rõ `English-only`; không dịch một phần hoặc trộn tên Việt–Anh.
- Nội dung mới chỉ được dùng entry `APPROVED`; thuật ngữ chưa có trong tự điển phải đi qua quy trình duyệt trước khi sử dụng.
