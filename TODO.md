# Danh sách tính năng phát triển (TODO List)

Tài liệu này lưu trữ định hướng phát triển các tính năng học tập mới cho **Trường Thi**, **Học Đường** hoặc **Công Viên Thư Giãn** để bổ sung dần vào dự án.

---

## T7 — Tổng quát hóa Bậc Học và Môn học

> Trạng thái: **Đã triển khai ngày 2026-07-13**. Kiến trúc đích tại `SUB_SPEC_LEARNING_CONTEXT.md`; không còn artifact dành riêng cho từng lớp.

### T7.1 — Chuẩn hóa domain contract

- [x] **Tạo `LearningContext` và canonical content types**
  - *Phải sửa:* `src/types/game.ts`, store types/selectors, lesson/question/topic/activity types.
  - *Phải làm:* `gradeTier` + `subjectId` bắt buộc; bỏ trùng nghĩa `grade`/`gradeTier` bằng adapter đọc legacy; action atomic `setLearningContext`.
  - *Impact:* Toàn frontend state, persistence, sync profile và mọi selector nội dung.
  - *Rủi ro:* Context đổi nửa chừng hoặc default im lặng gây trộn dữ liệu.
  - *Acceptance:* Không consumer mới tự default `9/english`; context persist/restore atomically; unit test selector hai chiều.
  - *Kết quả:* Store có action atomic `setLearningContext`; `SectContext` phát toàn bộ context; legacy `grade` chỉ được chuẩn hóa tại adapter nội dung.

### T7.2 — Chuẩn hóa database trước consumer

- [x] **Migration content schema theo `grade_tier + subject`**
  - *Phải sửa:* `ge10_lessons`, `ge10_custom_questions`, `ge10_topics`, `ge10_activities`; index/filter và seed/import.
  - *Phải làm:* Thêm cột nullable → backfill có kiểm chứng → parity report → `NOT NULL`; index `(grade_tier, subject)` và khóa progress phù hợp.
  - *Impact:* Production DB, import AI, Kho Đề Thi, Học Đường, session và báo cáo.
  - *Rủi ro:* Gán nhầm content legacy sang lớp 9; duplicate ID giữa các grade; lock bảng khi migration.
  - *Rollback:* Giữ dữ liệu/cột cũ, migration idempotent; không drop bảng/cột grade-specific trong phase này.
  - *Acceptance:* Không record canonical thiếu grade/subject; counts trước/sau bằng nhau; query plan dùng index context.
  - *Kết quả production:* Chạy lúc `2026-07-13 05:34:53 +07`; 0 null trên lessons/questions/topics/activities, 6 context index. Bổ sung game session lúc `05:38:16 +07`, 0 null.

### T7.3 — Canonical backend API

- [x] **Tạo route/service content, quiz và progress tổng quát**
  - *Phải sửa:* route mới `content.ts`, `quizzes.ts`, progress service; đăng ký server; validation và authorization.
  - *Phải làm:* Một implementation lọc `gradeTier + subjectId`; chấm từ server source; xác minh profile thuộc account.
  - *Impact:* Frontend services, game session và admin report.
  - *Rủi ro:* IDOR nếu chỉ tin `profileId`; lộ đáp án; cache không có context key.
  - *Acceptance:* Contract tests hai grade × ba subject; negative tests chéo account/context; response không lộ đáp án quiz.
  - *Kết quả:* `/content/lessons`, `/content/questions`, `/quizzes/random`, `/quizzes/submit`, `/learning-progress` đều bắt buộc `gradeTier + subjectId`; random quiz không trả đáp án; submit chấm từ DB và ghi progress trong transaction.

### T7.4 — Loại bỏ implementation theo lớp

- [x] **Chỉ giữ canonical LearningContext**
  - *Phải làm:* Xóa hook, route, type và registry dành riêng cho lớp; không còn logic chấm/lưu riêng.
  - *Impact:* Frontend, backend, content persistence và admin report.
  - *Acceptance:* Toàn bộ content đọc từ canonical API/DB; không dual-write hoặc fallback source code.
  - *Kết quả:* Content đã nhập production DB và toàn bộ artifact theo lớp đã được gỡ.

### T7.5 — Frontend context propagation

- [x] **Rà và chuyển mọi page/mini-app/admin sang selector context chung**
  - *Phải sửa:* `App`, `PlayArea`, `Học Đường`, `Trường Thi`, Công Viên Thư Giãn, Shop, handbook, question bank, reports, gatekeeper và AI prompts.
  - *Phải làm:* Lọc cả grade + subject; feature capability theo subject; empty state không fallback; key cache/exploration/progress có context.
  - *Impact:* Toàn bộ hành vi sau khi chọn Bậc Học/Môn học.
  - *Rủi ro:* State cũ của context trước vẫn hiển thị; reward/progress ghi sai context.
  - *Acceptance:* E2E matrix hai grade × ba subject; chuyển context liên tục không rò content/state; English-only feature chỉ hiện ở English của grade đang chọn.
  - *Kết quả:* App, Trường Thi, Học Đường, Bản Đồ, Công Viên, mastery, log, mini-game dùng context; exploration key gồm lớp+môn; admin tạo/lọc bài và câu hỏi theo lớp+môn.

### T7.6 — Availability và deprecation cleanup

- [x] **Suy ra grade/subject khả dụng từ registry/data và lập cleanup proposal**
  - *Phải làm:* Bỏ hardcode `coming_soon` khỏi consumer; availability lấy từ canonical content/config; thống kê caller legacy.
  - *Impact:* Profile selector và khả năng mở grade/môn mới chỉ bằng data/config.
  - *Acceptance:* Nạp grade mới không sửa app shell; danh sách code/table legacy được trình người dùng xác nhận trước khi xóa.
  - *Kết quả:* Bộ chọn lớp/môn suy ra availability từ lessons/questions; cleanup inventory nằm trong `TERMINOLOGY_MIGRATION_INVENTORY.md`; chưa xóa artifact legacy.

## Ưu tiên kiến trúc — Chuẩn hóa ngôn ngữ sản phẩm truyền thống Việt Nam

> Trạng thái: **Backlog đã được xác nhận ngày 2026-07-13**. Thực hiện tuần tự; không đổi/xóa function, feature hoặc code value khi chưa có mapping và xác nhận riêng.

### T1 — Chốt tự điển và giải quyết xung đột role

- [x] **Duyệt `SUB_SPEC_TERMINOLOGY.md` và chuyển entry từ `PROVISIONAL` sang `APPROVED`**
  - *Mục tiêu:* Chốt một hệ ngôn ngữ thống nhất theo trường học, học phủ và giáo dục truyền thống Việt Nam.
  - *Phải làm:* Chốt tên Việt/Anh, technical term, định nghĩa, công dụng; xử lý trước xung đột `Hiệu Trưởng` đang dùng cho cả `truong_vien` và `parent`; lập bảng tên cũ → tên mới.
  - *Impact:* Toàn bộ tài liệu, role label, navigation, UI copy, AI prompt và báo cáo.
  - *Rủi ro:* Đổi tên role thiếu kiểm soát có thể làm người dùng hiểu sai quyền; không đổi DB/code value trong task này.
  - *Acceptance:* Không còn hai khái niệm khác nhau dùng cùng một tên Việt; mọi entry có đủ trường và trạng thái `APPROVED`.
  - *Kết quả 2026-07-13:* Đã duyệt toàn bộ tự điển. Nhóm cuối: `energy` → **Năng Lượng**, currency → **Ruby**, `randomEvent` → **Thử Thách Bất Ngờ**, logout → **Rời Học Viện**, `skipPunishment` → **Miễn Phạt**. Ruby là domain term mới cần migration riêng; các code value khác được giữ nguyên.

### T2A — Migration currency `NP/coins` → `Ruby`

- [x] **Chốt contract và hành vi Ruby trước khi sửa code**
  - *Phạm vi đã phát hiện:* Ít nhất 55 file trong `src/` và `backend/`; frontend state/types/services, mini-app rewards, admin/reward UI, API routes, seed/default, activity logs và schema.
  - *Contract hiện tại:* `coins`, `coinsChanged`, `costCoins`, `rewardCoins`, `rewardNP`; DB dùng `coins`, `coins_changed`, `cost_coins`; UI/message dùng lẫn `NP`, `Ngân Lượng`, `Ngọc Phiếu` và `Điểm Thưởng`.
  - *Contract đích:* `ruby`, `rubyChanged`, `costRuby`, `rewardRuby`; UI chỉ hiển thị **Ruby**.
  - *Rủi ro:* Mất hoặc nhân đôi số dư, API cũ không đọc được, hoàn quà sai, ledger lệch, localStorage/profile sync ghi đè dữ liệu mới.
  - *Acceptance:* Có mapping field đầy đủ, chiến lược deploy/rollback, quyết định compatibility và test cases cho cộng/trừ/đổi/hoàn Ruby.

- [x] **Migration DB tương thích, không làm mất số dư**
  - *Dependency:* Contract Ruby được xác nhận.
  - *Phải làm:* Thêm/backfill `ruby`, `ruby_changed`, `cost_ruby`; kiểm tra parity với cột legacy; dual-read/dual-write trong cửa sổ tương thích; index/constraint/default và stored ledger dùng Ruby.
  - *Không được làm:* Drop hoặc rename trực tiếp cột `coins*` trong cùng release đầu tiên.
  - *Rollback:* Cột legacy tiếp tục được cập nhật cho đến khi xác nhận toàn bộ consumer đã chuyển.
  - *Acceptance:* Số dư, lịch sử và giá quà trước/sau migration bằng nhau; giao dịch đồng thời không tạo số âm ngoài luật hiện hành.
  - *Kết quả 2026-07-13:* Đã chạy và commit migration idempotent `backend/migrations/20260713_ruby_currency.sql` trên DB production. Postflight ghi nhận 0 mismatch trên 9 cặp Ruby/legacy; đủ 7 trigger đồng bộ, 2 setting Ruby và function `ge10_process_ruby_transaction`. Kiểm tra dual-write hai chiều đạt trong transaction rollback, không làm thay đổi số dư thử nghiệm.

- [x] **Chuyển backend/API sang Ruby với compatibility alias**
  - *Dependency:* DB migration tương thích.
  - *Phải sửa:* `routes/economy.ts`, `game.ts`, `profiles.ts`, `admin.ts`, `classRewards.ts`, helpers/seed và response mapping.
  - *Compatibility:* Trong giai đoạn chuyển tiếp, nhận field legacy nhưng trả field Ruby chuẩn; log cảnh báo consumer còn gửi `coins*`.
  - *Acceptance:* Award, spend, redeem, cancel/refund, boss bonus, daily cap và sync profile đều dùng Ruby; API contract test đạt.
  - *Tiến độ:* Backend đã dùng field/cột Ruby và trả alias legacy; TypeScript check riêng các route/helper Ruby đạt.

- [x] **Chuyển frontend/domain/UI sang Ruby**
  - *Dependency:* Backend compatibility sẵn sàng.
  - *Phải sửa:* Types, Zustand slices, services, local persistence/sync, reward models, mini-app callbacks và toàn bộ text/icon/label liên quan.
  - *Compatibility:* Hydrate dữ liệu cũ từ `coins*` sang `ruby*` một lần, không reset số dư; không tiếp tục ghi key legacy sau khi migration hoàn tất.
  - *Acceptance:* Không còn `NP`, `Ngân Lượng`, `Ngọc Phiếu`, `Điểm Thưởng` trong UI; mọi luồng hiển thị/cộng/trừ Ruby chính xác.
  - *Tiến độ:* Đã chuyển type/state/service/component/mini-app sang Ruby, thêm hydrate dữ liệu legacy và frontend build đạt.

- [x] **Kiểm chứng và giữ legacy Ruby migration trong cửa sổ tương thích**
  - *Dependency:* Telemetry xác nhận không còn consumer legacy.
  - *Phải làm:* Build/typecheck/test, test migration snapshot, kiểm tra DB parity, tìm toàn repo các alias cũ; chỉ lập đề xuất xóa compatibility code/cột legacy và chờ người dùng xác nhận riêng.
  - *Acceptance:* `npm run build` đạt; test giao dịch và rollback đạt; không tự drop cột hoặc xóa alias.
  - *Kết quả:* Frontend/backend build đạt. Migration production commit thành công lúc `2026-07-13T04:46:29Z`; DB parity và dual-write đều đạt. Legacy alias/cột tiếp tục được giữ; việc xóa cần telemetry và xác nhận riêng.

- [x] **Chốt hành vi `Miễn Phạt`**
  - *Hiện trạng:* Luồng `skipPunishment` đang trừ 10 NP và có giới hạn bỏ qua.
  - *Cần quyết định:* “Miễn Phạt” chỉ là tên mới cho quyền bỏ qua có tốn Ruby, hay miễn hoàn toàn khoản trừ/phạt.
  - *Impact:* `MienPhatDialog`, `createAdminSlice`, log hoạt động, balance và message.
  - *Acceptance:* Spec nêu rõ điều kiện, chi phí Ruby, giới hạn và message trước khi sửa hành vi.
  - *Quyết định 2026-07-13:* Không trừ Ruby khi bỏ qua; vẫn giữ giới hạn lượt bỏ qua theo ngày.

### T2 — Audit contract và lập kế hoạch tương thích

- [x] **Lập inventory thuật ngữ trên frontend, backend, database và AI**
  - *Dependency:* T1 hoàn tất.
  - *Phải rà:* Component/page/modal/button/tooltip/message; TypeScript types/constants; backend route/response/error; schema/default/seed; AI prompt; spec/sub-spec.
  - *Output:* Bảng `Current → Approved → Layer/File → Display-only/Contract → Migration required`.
  - *Impact:* Xác định đầy đủ consumer trước khi thay đổi.
  - *Rủi ro:* Bỏ sót dynamic copy, persisted value hoặc client cũ.
  - *Acceptance:* Mỗi entry `APPROVED` có danh sách consumer; mọi đổi contract có compatibility và rollback plan.
  - *Tiến độ:* Đã tạo `TERMINOLOGY_MIGRATION_INVENTORY.md` với mapping, consumer/layer và loại impact cho toàn bộ entry đã duyệt.

- [x] **Kiểm kê feature/function đang hidden hoặc disabled**
  - *Phải rà:* Feature flags, conditional render, route không có entry point, CSS hidden, commented feature và backend capability không có UI.
  - *Output:* Danh sách feature, lý do bị ẩn nếu tìm được, dependency và đề xuất enable; trình người dùng quyết định từng mục.
  - *Ràng buộc:* Không tự enable, xóa hoặc thay thế feature/function.
  - *Acceptance:* Mỗi mục có bằng chứng file/điều kiện và quyết định của người dùng.
  - *Kết quả:* Availability của mọi lớp và môn được suy ra từ content canonical trong database.

### T3 — Đồng bộ tài liệu và contract nền

- [x] **Chuẩn hóa `CORE_SPECS.md` và toàn bộ `SUB_SPEC_*.md` theo tự điển đã duyệt**
  - *Dependency:* T1–T2 hoàn tất.
  - *Phải làm:* Thay thuật ngữ cũ, cập nhật cross-reference, loại bỏ định nghĩa cạnh tranh nhưng không xóa đặc tả feature.
  - *Impact:* Nguồn chuẩn cho mọi implementation tiếp theo.
  - *Acceptance:* Không còn thuật ngữ ngoài tự điển; link và section reference hợp lệ.
  - *Kết quả 2026-07-13:* Đã đồng bộ toàn bộ mapping `APPROVED`; các tên cũ chỉ còn trong bảng migration/lịch sử quyết định hoặc technical identifier được giữ để tương thích.

- [x] **Ổn định technical contract trước khi đổi display**
  - *Dependency:* Inventory T2.
  - *Phải làm:* Giữ code/DB values nếu có thể; nếu bắt buộc đổi thì thêm migration, alias/backward compatibility, seed update và rollback.
  - *Impact:* Auth/role, persisted profile, API, localStorage và analytics.
  - *Acceptance:* Client/data cũ vẫn hoạt động; test contract và migration đạt.

### T4 — Đồng bộ implementation theo consumer

- [x] **Cập nhật frontend display và interaction copy**
  - *Dependency:* T3 hoàn tất.
  - *Phải làm:* Navigation, page, modal, button, tooltip, loading/empty/error/permission message, reward/resource/rank và trợ giúp theo ngữ cảnh.
  - *Impact:* Trải nghiệm toàn ứng dụng và khả năng hiểu của học sinh.
  - *Acceptance:* Không còn mixed terminology; cùng hành động dùng cùng nhãn; responsive/theme không regress.
  - *Kết quả 2026-07-13:* Đã quét lại navigation, modal, toast, tooltip, handbook, gameplay và admin; frontend production build đạt.

- [x] **Cập nhật backend, dữ liệu và AI prompt theo mapping đã duyệt**
  - *Dependency:* T3 và compatibility plan.
  - *Phải làm:* Response/error text, constants, seed/default, report labels, AI system/user prompts; migration chỉ khi đã xác nhận.
  - *Impact:* API consumer, dữ liệu lưu, import và nội dung AI sinh ra.
  - *Acceptance:* FE/BE/schema/prompt đồng bộ; dữ liệu cũ đọc được; không thay quyền hoặc hành vi ngoài backlog.
  - *Kết quả 2026-07-13:* Backend Ruby dùng contract chuẩn và giữ alias legacy tại boundary; targeted TypeScript check cho toàn bộ route/helper bị ảnh hưởng đạt.

### T5 — Kiểm chứng và đóng backlog

- [x] **Kiểm chứng end-to-end và cập nhật tự điển cuối**
  - *Phải làm:* Build/typecheck/test; rà các role chính và luồng học sinh; tìm lại thuật ngữ deprecated; kiểm tra feature hidden theo quyết định đã duyệt.
  - *Acceptance:* `npm run build` đạt; không có contract/message lệch tự điển; todo có bằng chứng và được đóng tuần tự.
  - *Kết quả 2026-07-13:* Frontend/backend build đạt; `npm run lint` đạt với warning không blocking; migration Ruby và hardening Data API production đều đối soát đạt. Bốn file `scratch-*.ts` là data fragment, không phải module source nên được loại khỏi lint thay vì sửa/xóa nội dung.

### T6 — Security backlog cần xác nhận riêng

- [x] **Bật RLS và thu hẹp Data API grants cho các bảng dữ liệu người dùng**
  - *Phát hiện production 2026-07-13:* Toàn bộ 32 bảng `ge10_*` có RLS tắt; role `anon` và `authenticated` đang có `SELECT/INSERT/UPDATE/DELETE/TRUNCATE/REFERENCES/TRIGGER` trực tiếp.
  - *Impact:* Có nguy cơ BOLA/IDOR, đọc hoặc sửa dữ liệu ngoài hồ sơ/lớp nếu Data API public đang expose schema `public`.
  - *Phải làm sau khi xác nhận:* Kiểm kê frontend/backend consumer trực tiếp; thiết kế ownership/class/admin policy cho từng bảng; bật RLS; thu hồi quyền không cần thiết; giữ backend service path hoạt động; test theo `anon`, `authenticated`, Chủ Nhiệm, Phó Viện Trưởng và Viện Trưởng.
  - *Rủi ro:* Bật RLS hoặc revoke hàng loạt khi chưa có policy đúng có thể làm API hiện tại ngừng hoạt động. Không triển khai chung với migration Ruby.
  - *Acceptance:* Không role public nào đọc/sửa dữ liệu ngoài scope; backend và các luồng Ruby/quà/lịch sử/session vẫn hoạt động; security test và rollback script đạt.
  - *Kết quả 2026-07-13:* Frontend chỉ dùng Supabase Auth, toàn bộ data đi qua Express API. Migration hardening đã bật RLS và revoke Data API grants cho toàn bộ bảng `ge10_*`; RPC nội bộ không còn public execute; backend owner smoke test đạt.

## 🏛️ Trường Thi (Arena) & 🏫 Học Đường (Training Cave)

Các tính năng tập trung vào luyện tập, củng cố kiến thức và thử thách tư duy sâu:

- [x] **🧠 Active Recall (Nhớ chủ động)**
  - *Mô tả:* Chỉ hiển thị câu hỏi, người học tự suy nghĩ hoặc trả lời trước khi xem đáp án mẫu. Tập trung vào việc nhớ chủ động để kích thích phản xạ não bộ.
  - *Phân bổ phù hợp:* **Học Đường** (luyện tập cá nhân) hoặc **Trường Thi** (flashcard tốc độ).

- [x] **🧩 Step Builder (Sắp xếp các bước)**
  - *Mô tả:* Sắp xếp các bước giải toán, các ý trong bài văn hoặc cấu trúc câu tiếng Anh theo đúng trình tự bằng kéo thả.
  - *Phân bổ phù hợp:* **Học Đường** (giúp rèn luyện tư duy logic mạch lạc và phương pháp làm bài).

- [x] **🏞️ Phrase Valley**
  - *Mô tả:* Luyện collocation, phrasal verbs và nhóm từ đi kèm trong ngữ cảnh thật để tăng độ tự nhiên khi làm bài tiếng Anh.
  - *Phạm vi:* Mini-app + Hub registry; chỉ `activeSectId === 'english'`.
  - *Phải làm:* Định nghĩa content contract, lọc dữ liệu English, 5 lượt theo ngữ cảnh, accuracy/result/reward qua Hub, loading/empty/error.
  - *Impact:* `RelaxationZone`, mini-app registry, Question/content types và dữ liệu Tiếng Anh.
  - *Rủi ro:* Thiếu dữ liệu collocation thật sẽ tạo game đoán từ hời hợt; không dùng placeholder production.
  - *Acceptance:* Không xuất hiện ở môn khác; không fallback dữ liệu; build/lint đạt; kết quả và reward chỉ phát một lần.
  - *Kết quả 2026-07-13:* Đã triển khai 5 lượt collocation/phrasal verb theo ngữ cảnh, English-only registry, explanation, result và reward guard.

- [x] **🏘️ Conversation Town**
  - *Mô tả:* Thực hành mẫu câu giao tiếp, đáp lời và hoàn thành đoạn hội thoại theo tình huống ngắn.
  - *Phạm vi:* Mini-app + Hub registry; chỉ `activeSectId === 'english'`.
  - *Phải làm:* Scenario/response contract, 5 tình huống mỗi lượt, giải thích đáp án, kết quả chuẩn và empty state.
  - *Impact:* English question/content model và Công Viên Thư Giãn.
  - *Rủi ro:* Nhiều câu đáp có thể đúng theo ngữ cảnh; dữ liệu phải có giải thích và tránh chấm tuyệt đối khi mơ hồ.
  - *Acceptance:* Chỉ hiện trong môn Anh; toàn bộ card/message/title của feature giữ tiếng Anh; không thưởng lặp.
  - *Kết quả 2026-07-13:* Đã triển khai 5 tình huống giao tiếp, đáp lời, explanation, English-only registry và reward guard.

- [x] **📝 Writing Pavilion**
  - *Mô tả:* Luyện viết câu, nối câu, viết lại câu và hoàn chỉnh đoạn văn theo tiêu chí chấm điểm.
  - *Phạm vi:* Mini-app + Hub registry; tái sử dụng `rewrite`, `wordform`, `text_input` của môn Anh.
  - *Phải làm:* Validator chuẩn hóa an toàn, accepted answers/rubric, review đáp án và kết quả chuẩn; không AI trong MVP.
  - *Impact:* Question types, dữ liệu đáp án và UI nhập text.
  - *Rủi ro:* Chấm sai câu hợp lệ nếu validator quá cứng; không dùng substring hoặc placeholder rubric.
  - *Acceptance:* Bỏ qua câu thiếu rubric; chấp nhận danh sách đáp án hợp lệ; chỉ hiện trong môn Anh; build/lint đạt.
  - *Kết quả 2026-07-13:* Đã triển khai 5 bài rewrite/word form/passive/linking với accepted answers, chuẩn hóa input an toàn và không phụ thuộc AI.

- [x] **🌊 Listening Lake**
  - *Mô tả:* Nghe câu ngắn, chọn ý chính, nhận diện từ khóa và trả lời theo tín hiệu âm thanh.
  - *Phạm vi:* Mini-app + Hub registry; audio English-only.
  - *Phải làm:* Audio/TTS adapter nhỏ, user-triggered playback, replay, transcript sau trả lời, unsupported/audio-error state và kết quả chuẩn.
  - *Impact:* Browser audio capability, content metadata, accessibility và Hub reward.
  - *Rủi ro:* Autoplay policy, giọng TTS khác nhau giữa thiết bị, thiếu audio asset hoặc transcript.
  - *Acceptance:* Không autoplay; fallback có thông báo; hoạt động khi audio lỗi; chỉ hiện trong môn Anh; không thưởng lặp.
  - *Kết quả 2026-07-13:* Đã triển khai 5 bài nghe bằng user-triggered Web Speech, replay, transcript sau trả lời, transcript fallback khi audio lỗi/không hỗ trợ và cleanup khi unmount.

- [x] **📖 Reading Challenge (Thử thách Đọc hiểu)**
  - *Mô tả:* Đọc một đoạn văn hoặc bài học rồi thực hiện các nhiệm vụ như tìm ý chính, tô sáng từ khóa, xác định luận điểm hoặc chi tiết quan trọng.
  - *Phân bổ phù hợp:* **Học Đường** (luyện kỹ năng đọc hiểu sâu môn Tiếng Anh và Ngữ Văn).

- [x] **✍️ Explain to AI (Giải thích cho AI)**
  - *Mô tả:* Học sinh tự giải thích một khái niệm, cách giải hoặc nội dung bài học bằng lời của mình (text/voice); AI nhận xét, góp ý và bổ sung.
  - *Phân bổ phù hợp:* **Học Đường** hoặc nâng cao tại **Trường Thi** (Khoa Thi tự luận).

- [x] **📚 Teach the AI (Dạy học cho AI)**
  - *Mô tả:* Người học đóng vai giáo viên, hướng dẫn AI giải một bài toán, phân tích một tác phẩm hoặc giải thích ngữ pháp. AI sẽ giả lập đóng vai học sinh đặt câu hỏi ngược để kiểm tra mức độ hiểu sâu của người học.
  - *Phân bổ phù hợp:* **Học Đường** (chế độ tự luyện nâng cao theo phương pháp Feynman).

- [x] **🧱 Drag & Drop Diagram (Kéo thả sơ đồ)**
  - *Mô tả:* Kéo thả nhãn, công thức hoặc thành phần vào đúng vị trí trên hình vẽ, sơ đồ khoa học hoặc biểu đồ địa lý/lịch sử.
  - *Phân bổ phù hợp:* **Học Đường** (minh họa trực quan hình học phẳng/3D).

- [x] **⚔️ Boss Battle (Quyết đấu Boss)**
  - *Mô tả:* Mỗi câu trả lời hoặc bước giải đúng sẽ gây sát thương lên "boss". Trả lời sai thì boss phản công gây mất máu/năng lượng của người học. Bản chất vẫn là học nhưng được game hóa mạnh mẽ với đồ họa thanh máu và hiệu ứng chiến đấu.
  - *Phân bổ phù hợp:* **Trường Thi** (Khoa Thi cuối tuần/môn học).

---

## 🦄 Công Viên Thư Giãn (Relaxation Zone) - KHU VỰC MỚI

Các tính năng mang tính chất tương tác nhẹ nhàng, kết hợp học tập trực quan và khám phá cốt truyện giải trí:

- [x] **🔗 Match Pairs (Ghép cặp bài trùng)**
  - *Mô tả:* Ghép các cặp liên quan như từ–nghĩa, công thức–tên gọi, tác giả–tác phẩm, khái niệm–định nghĩa. Chơi tính giờ hoặc so điểm.
  - *Phân bổ phù hợp:* **Công Viên Thư Giãn** (game ghép thẻ nhanh) hoặc **Học Đường** (khởi động bài học).

- [x] **🗺️ Mind Map Builder (Xây dựng Sơ đồ tư duy)**
  - *Mô tả:* Tự xây sơ đồ tư duy bằng cách kéo nối các khái niệm, chương học, nhân vật hoặc công thức để thấy mối liên hệ tổng quan.
  - *Phân bổ phù hợp:* **Công Viên Thư Giãn** (góc sáng tạo) hoặc công cụ tóm tắt bài học trong **Học Đường**.

- [x] **🎭 Story / Scenario Mode (Học qua cốt truyện)**
  - *Mô tả:* Biến bài học thành một câu chuyện hoặc tình huống thực tế, người học phải vận dụng kiến thức đã học để đưa ra quyết định giúp nhân vật vượt qua thử thách cốt truyện.
  - *Phân bổ phù hợp:* **Công Viên Thư Giãn** (đọc truyện tương tác) hoặc mở đầu chiến dịch ở **Trường Thi**.

- [x] **🧭 Adventure Journey (Hành trình phiêu lưu)**
  - *Mô tả:* Hệ thống kiến thức được chia thành các chặng/quốc đảo trên bản đồ; hoàn thành từng nhiệm vụ cốt truyện để mở khóa khu vực mới, tạo cảm giác khám phá thế giới mở thay vì danh sách bài học rời rạc.
  - *Phân bổ phù hợp:* **Công Viên Thư Giãn** / Bản Đồ thế giới mở (hệ thống điều hướng chính thay thế bản đồ tĩnh).

---

## 📚 Bộ Nội Công Cốt Lõi (Core Knowledge Bank) — CORE_SPECS §9

> Toàn bộ các hạng mục dưới đây chỉ được **phân tích, thiết kế, add specs** — chưa triển khai code. Xem đặc tả chi tiết tại [CORE_SPECS.md §9](file:///d:/Hoa%20Hoang/Apps/gameEngG10/CORE_SPECS.md).

### 9.A — Kiến Trúc Dữ Liệu Core Knowledge Taxonomy

- [x] **📐 Định nghĩa type `CoreKnowledgeTopic` trong `src/types/game.ts`**
  - Thêm interface `CoreKnowledgeTopic` với các trường: `id`, `subjectId`, `group`, `label`, `labelEN`, `hamNguyenTo`, `examRelevance`, `minQuestions`, `questionTypes`, `description`.
  - Thêm trường `topicId?: string` vào interface `Question` hiện có để liên kết câu hỏi với chuyên đề.
  - *Phạm vi:* `src/types/game.ts`

- [x] **📦 Tạo file `src/data/coreKnowledge.ts` — Bảng danh mục chuyên đề**
  - Export hằng số `CORE_KNOWLEDGE_TOPICS: CoreKnowledgeTopic[]` chứa đầy đủ 102 chuyên đề cho 9 môn phái.
  - Nhóm Chuyên Sâu: 19 chuyên đề Tiếng Anh + 18 chuyên đề Toán + 13 chuyên đề Ngữ Văn.
  - Nhóm Cơ Bản: 14 KHTN + 11 Lịch Sử-Địa Lý + 10 GDCD + 5 Công Nghệ + 6 Tin Học + 6 Nghệ Thuật.
  - Export hàm `getTopicsBySubject(subjectId)`, `getTopicsByHam(ham)`, `getTopicById(id)`.
  - *Phạm vi:* `src/data/coreKnowledge.ts` (file mới)

- [x] **🔗 Retrofit field `topicId` vào `questions.ts` hiện có**
  - Duyệt toàn bộ câu hỏi hiện có trong `src/data/questions.ts` và gán `topicId` phù hợp dựa trên `category` + `subject`.
  - Câu hỏi không xác định được topicId rõ ràng gán `topicId: 'misc'`.
  - *Phạm vi:* `src/data/questions.ts` (batch update)
  - *Kết quả rà soát 2026-07-13:* 415/415 câu hỏi hiện có đã có `topicId`; taxonomy code và CORE_SPECS cùng thống nhất 102 chuyên đề.

### 9.B — Coverage Dashboard (Phòng Học Vụ — Phòng Điều Hành)

- [x] **📊 Coverage Alert Component — Cảnh báo chuyên đề thiếu câu hỏi**
  - Tạo component trong Phòng Học Vụ (Admin Console) hiển thị danh sách chuyên đề `examRelevance = 'high'` đang thiếu câu hỏi (< `minQuestions`).
  - Màu đỏ/vàng/xanh theo mức độ: <50% minQuestions = đỏ, 50–99% = vàng, ≥100% = xanh.
  - Nút shortcut "Import thêm câu" dẫn thẳng vào Kho Đề Thi filter theo chuyên đề đó.
  - *Phạm vi:* Admin console UI (Phòng Học Vụ panel)

- [x] **📈 Progress Bar theo môn phái trong Phòng Học Vụ**
  - Mỗi môn phái hiển thị thanh tiến trình tổng số câu hỏi hiện có / tổng `minQuestions` cần thiết.
  - Breakdown theo nhóm Hầm (🔥/❄️/🪨) để Viện Chủ biết hầm nào đang thiếu.
  - *Phạm vi:* Admin console UI

### 9.C — Kho Đề Thi — Cải Tiến Import & Tag Câu Hỏi

- [x] **🏷️ Giao diện Tag Chuyên Đề khi Import/Edit câu hỏi**
  - Trong form thêm/sửa câu hỏi tại Kho Đề Thi: thêm dropdown chọn `topicId` từ danh sách `CORE_KNOWLEDGE_TOPICS` lọc theo môn phái đang chọn.
  - Hiển thị badge Hầm nguyên tố (🔥/❄️/🪨) auto-fill theo `topicId` được chọn.
  - Hiển thị `examRelevance` gợi ý để Viện Chủ biết độ ưu tiên.
  - *Phạm vi:* Kho Đề Thi — Question form UI

- [x] **🤖 AI Auto-Tag khi Import đề từ File (mở rộng AI Ingest §4.1)**
  - Khi Viện Chủ paste text/upload PDF đề thi, Gemini phân tích từng câu và **đề xuất `topicId`** phù hợp.
  - Gemini cũng đề xuất `examRelevance` (HIGH/MEDIUM/LOW) dựa trên pattern đề thi TP.HCM gần nhất.
  - Viện Chủ review và confirm trước khi lưu.
  - *Phạm vi:* AI Ingest pipeline (backend + admin UI)
  - *Kết quả 2026-07-13:* Frontend gửi taxonomy đúng Môn phái; backend yêu cầu và validate `topicId`, đề xuất `suggestedExamRelevance`, đồng thời tuân thủ quy tắc không biến tự luận thành MCQ. Endpoint không còn tự lưu; Kho Đề Thi hiển thị hàng chờ để Viện Trưởng sửa chuyên đề, xác nhận hoặc hủy trước khi import.

- [x] **🔍 Filter câu hỏi theo Chuyên Đề trong Kho Đề Thi**
  - Thêm bộ lọc multi-select theo `topicId` trong danh sách câu hỏi.
  - Thêm cột "Chuyên Đề" và "Hầm" trong bảng danh sách câu hỏi.
  - *Phạm vi:* Kho Đề Thi — Question list UI

### 9.D — Gatekeeper Integration (§2.8.7 Sương Mù Chiến Tranh)

- [x] **Gatekeeper Question Picker — Logic chọn câu hỏi kiểm soát cổng**
  - Implement hàm `pickGatekeeperQuestion(pageId, subjectId)`:
    1. Xác định `hamNguyenTo` của Page Cấp 2 đó.
    2. Lọc câu hỏi theo `topicId` thuộc hầm đó + `difficulty` từ 3–5 + `type` là `mcq` hoặc `wordform`.
    3. Random 1 câu chưa được dùng làm Gatekeeper gần nhất (tránh lặp).
  - *Phạm vi:* `src/utils/gatekeeper.ts` (file mới) + tích hợp vào Page Cấp 2 component

- [x] **Lưu lịch sử Gatekeeper per-student vào DB**
  - Mỗi câu Gatekeeper đã dùng cho student X ở page Y cần được lưu để tránh lặp lại cùng câu trong vòng 30 ngày.
  - Thêm bảng/collection `gatekeeper_history` trong DB: `{ studentId, pageId, questionId, usedAt }`.
  - *Phạm vi:* Backend (Supabase) + `src/utils/gatekeeper.ts`

### 9.E — Đẳng Cấp Môn Phái — Tích Hợp Core Knowledge vào Tỉ Lệ Hoàn Thành (§7.4)

- [x] **Cập nhật công thức tính Tỉ Lệ Hoàn Thành dựa trên Core Knowledge**
  - Hiện tại: (số bài học đã xong / tổng bài học) × 50% + (số câu đúng / tổng câu) × 50%.
  - Cải tiến: Thành phần "tổng câu" được tính trên **tổng `minQuestions` của tất cả chuyên đề** của môn phái đó (§9.4), thay vì chỉ đếm câu hiện có trong DB. Điều này đảm bảo tỉ lệ có ý nghĩa chuẩn khi DB còn thiếu.
  - *Phạm vi:* `src/utils/` + Profile Page hiển thị Đẳng Cấp

### 9.F — AI Sư Phụ Gợi Ý dựa trên Core Knowledge Gap

- [x] **AI Sư Phụ phân tích điểm yếu theo chuyên đề Core Knowledge**
  - Hệ thống tính accuracy theo từng `topicId` (không chỉ theo `category` như hiện tại).
  - Trợ Giáo MIKA (WorldMap banner — §2.8, Bảng Bài Tập) gợi ý ôn lại các chuyên đề có `examRelevance = 'high'` + accuracy thấp nhất.
  - Ưu tiên chuyên đề thuộc `hamNguyenTo` của khu vực có `lastExploredAt` lâu nhất (§2.8.5).
  - *Phạm vi:* AI recommendation engine + WorldMap UI banner
# Backlog đang thực hiện — AuthN/AuthZ và cô lập đa hồ sơ (đã duyệt 2026-07-13)

- [x] **A1 — Active-profile security context (kiến trúc, ưu tiên cao nhất)**
  - *Mục tiêu:* Tách JWT account identity khỏi application profile identity.
  - *Phải sửa:* auth middleware/helper, route registration và API contract `X-Profile-Id`.
  - *Impact:* Toàn bộ backend route nghiệp vụ; thay đổi contract request sau khi chọn profile.
  - *Rủi ro:* Route hệ thống chọn/tạo profile bị chặn nhầm; client cũ thiếu header.
  - *Acceptance:* Active/inactive/foreign profile được phân biệt đúng; `req.user.sub` không còn được dùng làm profile ID.

- [x] **A2 — Authorization theo active profile và quan hệ target**
  - *Dependency:* A1.
  - *Phải sửa:* admin, family, class reward, questions, AI, game, economy, learning context, gatekeeper.
  - *Impact:* Role admin/parent không còn kế thừa qua các profile cùng Google account.
  - *Rủi ro:* Sai permission có thể khóa nhầm luồng Chủ Nhiệm hoặc mở IDOR.
  - *Acceptance:* Negative tests chéo profile/account; mutation target kiểm tra ownership/relationship trong transaction.

- [x] **A3 — Cô lập frontend state và cache**
  - *Dependency:* A1.
  - *Phải sửa:* services/API headers, auth/profile switch, Zustand persistence, localStorage profile-scoped.
  - *Impact:* Refresh, đổi profile, notes, pet cooldown và gameplay state.
  - *Rủi ro:* Mất cache cục bộ legacy; flash dữ liệu profile trước.
  - *Acceptance:* Đổi qua lại hai profile không rò state; request luôn mang active profile ID.

- [x] **A4 — Audit/migration dữ liệu sai identity**
  - *Dependency:* A1-A2.
  - *Phải sửa:* migration/index SQL và báo cáo các record thiếu profile identity tường minh.
  - *Impact:* Progress, quiz, custom questions và dữ liệu profile-scoped production.
  - *Rủi ro:* Mọi suy luận từ account — kể cả account đang có một profile — đều tạo ownership không bền vững.
  - *Acceptance:* Không migrate theo `account_id` hoặc số lượng profile; chỉ dùng profile identity/quan hệ nghiệp vụ tường minh; kiểm tra FK đạt.
  - *Kết quả:* FK audit 25 cột; không có phép chuyển account→profile. Các UUID trùng account hiện là ID profile học sinh hợp lệ nên record tiếp tục thuộc chính profile đó. Đã thêm partial index phân giải active profile trên production.

- [x] **A5 — Verification và đồng bộ tài liệu**
  - *Dependency:* A1-A4.
  - *Phải làm:* backend/frontend build, lint, integration security tests, DB postflight/RLS, cập nhật trạng thái backlog.
  - *Acceptance:* Không còn đường dùng account ID làm profile ID; toàn bộ test/build đạt; docs và code đồng bộ.
  - *Kết quả:* Frontend/backend build đạt; lint không lỗi; DB postflight 30/30 bảng RLS, 0 grant anon/authenticated; kiểm tra chéo account trả 0 profile.

- [x] **A6 — Loại bỏ runtime migration suy luận theo account**
  - *Mục tiêu:* Không để startup tự tạo profile hoặc chuyển dữ liệu chỉ vì account hiện có một profile.
  - *Phải sửa:* Gỡ `adaptLegacyProfiles()` khỏi `initDB`; source adapter chỉ được xóa sau khi có phê duyệt riêng; đăng ký migration index active-profile vào startup migration chain.
  - *Impact:* Backend startup không còn âm thầm đổi ownership hoặc sinh profile theo heuristic.
  - *Acceptance:* Không có runtime call tới adapter; mọi migration ownership sau này cần profile identity tường minh và migration được duyệt riêng.
  - *Kết quả bổ sung 2026-07-13:* Người dùng đã duyệt cleanup; source adapter legacy đã được xóa hoàn toàn tại H2.

- [x] **A7 — Loại account khỏi business authorization/query**
  - *Mục tiêu:* Sau active-profile middleware, roster và family workflow chỉ dùng profile/relationship.
  - *Phải sửa:* Bỏ fallback chọn profile theo account, bỏ ownership query lặp lại bằng account, không loại toàn bộ sibling profile khỏi tìm kiếm.
  - *Impact:* Profile cùng account có thể tương tác như các profile độc lập; quyền không đổi khi tạo thêm profile.
  - *Acceptance:* `account_id` trong route nghiệp vụ chỉ còn ở thao tác quản lý/provision danh sách profile của account hoặc boundary xác thực.

# Backlog cleanup feature ẩn và capability theo môn (đã duyệt 2026-07-13)

- [x] **H1 — Chuẩn hóa capability theo môn và sửa contract route (ưu tiên kiến trúc)**
  - *Mục tiêu:* Tính năng chuyên môn chỉ hiện trong đúng môn; route FE–BE có đúng một tiền tố `/api`.
  - *Phải sửa:* Registry/navigation Công viên Thư Giãn và Kho Nền Tảng; route AI Toán và route admin đang khai báo `/api` lặp.
  - *Impact:* Xưởng Toán Hình 3D/Hình/Đồ Thị chỉ hiện ở Toán; các mini-app tiếng Anh chỉ hiện ở Tiếng Anh; quản lý role và duyệt Phó Viện Trưởng hoạt động lại.
  - *Rủi ro:* Ẩn nhầm feature dùng chung hoặc làm đổi URL consumer; cần kiểm tra toàn bộ registry và fetch caller.
  - *Acceptance:* Matrix subject × feature đúng; bốn endpoint không còn `/api/api`; build và route tests đạt.
  - *Kết quả:* Có registry capability theo môn; English Skill Districts chỉ thuộc Tiếng Anh, ba Xưởng Toán chỉ thuộc Toán và screen tự thoát khi đổi môn; bốn route FE–BE đã bỏ prefix lặp.

- [x] **H2 — Loại bỏ cơ chế PIN và profile adapter legacy**
  - *Dependency:* H1.
  - *Phải sửa:* Route/utility/schema/migration PIN; xóa adapter suy luận account→profile và mọi reference.
  - *Impact:* Auth/profile chỉ dựa trên active profile; không còn security state trùng lặp theo account/profile.
  - *Rủi ro:* Database production còn bảng/dữ liệu PIN; migration phải idempotent và không ảnh hưởng profile.
  - *Acceptance:* Không còn endpoint, type, table hoặc UI PIN; không còn runtime/source adapter legacy; backend build/test đạt.
  - *Kết quả:* Đã xóa route/utility/UI mapping/schema PIN và profile adapter; startup chạy migration `DROP TABLE IF EXISTS`. Postflight DB production xác nhận bảng PIN không tồn tại trước và sau migration.

- [x] **H3 — Availability hoàn toàn data-driven và Gatekeeper không placeholder**
  - *Dependency:* H1.
  - *Phải sửa:* Xóa `coming_soon` hardcode; selector grade/subject suy ra từ content/capability; Gatekeeper trả empty state và log context thiếu coverage.
  - *Impact:* Thêm grade/môn bằng dữ liệu; thiếu câu hỏi không bị che bởi dữ liệu giả.
  - *Rủi ro:* Context không có content biến mất khỏi selector; modal Gatekeeper phải xử lý không có câu an toàn.
  - *Acceptance:* Không còn `coming_soon`/fallback `1 + 1`; log chứa grade/subject/page; UI có empty state rõ ràng.
  - *Kết quả:* Selector chỉ render grade/môn có content; bỏ status hardcode; Gatekeeper lọc đủ grade + subject, trả `null`, log context và hiển thị empty state học vụ.

- [x] **H4 — Hợp nhất UI cũ trước khi xóa**
  - *Dependency:* H1-H3.
  - *Phải sửa:* So sánh và chuyển phần còn giá trị từ `RunFinishedScreen` sang `PostQuizReview`/`FinalResultScreen`; hợp nhất Lecture/Quest/Reward modal vào manager/modal hiện hành; xóa `SonTrangThuGian` sau khi xác nhận `RelaxationZone` bao phủ đầy đủ.
  - *Impact:* Một implementation cho mỗi flow, không mất hành vi/reward/validation.
  - *Rủi ro:* Bỏ sót UX hoặc field chỉ có ở modal cũ; cần lập parity trước khi xóa.
  - *Acceptance:* Không còn consumer hoặc file duplicate; flow tạo/sửa và kết quả quiz giữ đủ hành vi hữu ích; build đạt.
  - *Kết quả:* Parity cho thấy `PostQuizReview`/`FinalResultScreen` và ba manager hiện hành đã bao phủ đầy đủ hoặc tốt hơn; đã xóa năm component duplicate, không cần chuyển thêm hành vi legacy.

- [x] **H5 — Chuẩn hóa script vận hành và dọn artifact**
  - *Dependency:* H2-H4.
  - *Phải sửa:* Phân loại script import/sync/migration/patch; chuyển script còn dùng vào `scripts/maintenance` có README/npm command; xóa script/artifact một lần đã hết giá trị.
  - *Impact:* Repo gọn và quy trình vận hành có thể truy vết.
  - *Rủi ro:* Xóa nhầm công cụ production; phải kiểm tra package scripts, import/reference và lịch sử migration trước khi xóa.
  - *Acceptance:* Không còn script mồ côi không tài liệu; mọi script được giữ có owner, mục đích, cách chạy và safety note.
  - *Kết quả:* Đã xóa script import/sync/migration/patch một lần, scratch và text extraction không có consumer/npm command; bỏ các dependency chỉ phục vụ mã đã chết.

- [x] **H6 — Verification toàn diện và đồng bộ tài liệu**
  - *Dependency:* H1-H5.
  - *Phải làm:* Frontend/backend build, lint/test, static unused scan, migration pre/postflight và cập nhật backlog/spec.
  - *Acceptance:* Không còn feature ẩn ngoài gating đã định nghĩa; code/docs đồng bộ; không có lỗi do thay đổi.
  - *Kết quả:* FE build, BE build đạt; lint không có error. Static scan chỉ còn serverless entrypoint `backend/api/index.ts` và các exported helper/type không phải feature; entrypoint được giữ vì có thể là deployment contract.

# Backlog kiến trúc Mô-đun Chuyên Môn (đã duyệt 2026-07-13)

- [x] **SM1 — Contract và registry build-time**
  - *Mục tiêu:* Một nguồn đăng ký type-safe cho tool/activity/mini-game/renderer/hint/assessment theo môn.
  - *Impact:* App shell và feature visibility; thay `subjectCapabilities` ad-hoc.
  - *Rủi ro:* Circular dependency hoặc manifest import UI lõi.
  - *Acceptance:* Registry read-only; module không sở hữu shell/store/auth; query sai môn trả rỗng.
  - *Kết quả:* Registry type-safe kiểm tra duplicate subject/contribution khi khởi tạo; query tool/activity/mini-game/presentation/metadata/hint/assessment/utility đều read-only.

- [x] **SM2 — Manifest Tiếng Anh và Toán**
  - *Dependency:* SM1.
  - *Phải làm:* Đăng ký bốn English-only mini-game và ba Xưởng Toán; consumer lấy visibility từ registry.
  - *Acceptance:* Matrix môn × contribution đúng; đổi khỏi môn Toán không giữ screen Xưởng.
  - *Kết quả:* Công viên Thư Giãn và Học Đường lọc contribution theo manifest; App guard screen Xưởng dùng registry.

- [x] **SM3 — Module Ngữ Văn**
  - *Dependency:* SM1.
  - *Phải làm:* Tách presentation ngữ liệu, hint, blueprint metadata và assessment API client khỏi `PlayArea`; đăng ký qua manifest Văn.
  - *Impact:* Trường Thi, review/giải thích và AI grading.
  - *Rủi ro:* Sai điều kiện nhận diện bài viết hoặc làm mất fallback chấm cục bộ.
  - *Acceptance:* Đọc hiểu giữ layout tách; bài viết giữ rubric/feedback/fallback; core không chứa nhánh feature Văn tương ứng.
  - *Kết quả:* Presentation, metadata labels, hint, assessment matcher/client và backend grader đã chuyển vào module Văn; PlayArea/Review/Explanation gọi contribution chung.

- [x] **SM4 — Activity ID Văn canonical**
  - *Dependency:* SM3.
  - *Phải làm:* Dùng ID nghiệp vụ cho bốn activity Văn; giữ `legacyMode` chỉ để compatibility data cũ.
  - *Acceptance:* Không dùng `grammar/reading/vocabulary` làm danh tính activity Văn mới; seed và frontend mapping thống nhất.
  - *Kết quả:* Bốn ID canonical đã đồng bộ source và DB thật; `legacyMode` chỉ phân giải caller cũ. Postflight xác nhận đủ bốn config.

- [x] **SM5 — Verification và đồng bộ docs**
  - *Dependency:* SM1-SM4.
  - *Phải làm:* FE/BE build, lint, static scan, diff audit và cập nhật trạng thái backlog.
  - *Acceptance:* Không đổi hành vi người dùng ngoài tên/ID kỹ thuật đã chuẩn hóa; docs/code đồng bộ.
  - *Kết quả:* FE build và BE build đạt; lint không có error; contract matrix 7/7 đạt; DB postflight đủ bốn activity canonical. Static scan chỉ còn entrypoint serverless và exported helper/type đã biết, không phát sinh feature ẩn mới.
