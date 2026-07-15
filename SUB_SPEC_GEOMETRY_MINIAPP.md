# Sub-Spec: Mini-App Hình Học (Geometry Mini-App Specification)

Mini-App Hình Học (`geometry`) là một ứng dụng con độc lập được tách ra từ các mô-đun vẽ hình học phẳng (2D) và hình học không gian (3D) hiện có. Mục tiêu là đóng gói toàn bộ logic toán học, dựng hình, tương tác canvas và tích hợp AI vào một cấu trúc thống nhất, cho phép nhúng linh hoạt vào các ngữ cảnh khác nhau trong ứng dụng lớn (như Bảng giải câu hỏi, Phòng học tự do, hoặc Thử thách mini-game).

---

## 1. Hiện trạng & Lý do tái cấu trúc

### 1.1 Hiện trạng hệ thống
Hiện tại, tính năng hình học đang được chia làm hai component lớn đặt tại `src/components`:
- **`BikiHinhHocPhang.tsx`**: Quản lý hình học 2D (Tam giác, Tứ giác, Đường tròn) dùng Canvas SVG. Cho phép kéo thả điểm tự do, dựng đường phụ (đường cao, trung tuyến, song song, vuông góc, tiếp tuyến) thông qua nút bấm hoặc dòng lệnh CLI, kết nối API backend để phân tích đề bài qua AI.
- **`Biki3DStudio.tsx`**: Quản lý hình học 3D (Lăng trụ, Hình hộp, Hình chóp, Tứ diện, Hình trụ) phối hợp với `Canvas3D.tsx` và `shapeGenerators.ts`. Cho phép xoay 360°, zoom, dựng đường phụ, tô màu mặt phẳng, đi từng bước giải, gọi AI backend dựng hình 3D.

### 1.2 Lý do tái cấu trúc
1. **Trải nghiệm người dùng (UX) bị quá tải**: Khi nhúng vào khu vực giải câu hỏi (`PlayArea.tsx`), giao diện studio đầy đủ (gồm ô nhập đề bài, nút gọi AI, lịch sử thao tác, bảng công cụ cồng kềnh) chiếm dụng quá nhiều không gian, làm lu mờ câu hỏi chính và các tùy chọn trả lời.
2. **Khó tái sử dụng**: Không thể tái sử dụng một phần giao diện (ví dụ: chỉ hiển thị hình vẽ 3D trực quan cho học sinh xoay nhìn mà không cho chỉnh sửa hay dùng AI).
3. **Phá vỡ kiến trúc Module**: Cả hai component đang import trực tiếp Supabase Client và lưu trạng thái profile cục bộ thay vì nhận qua context/props chuẩn, vi phạm nguyên tắc cô lập của `SubjectModule` (Toán) và `Mini-App`.

---

## 2. Thiết kế Kiến trúc Mini-App mới (`src/miniapps/geometry`)

Mini-app được gom nhóm và cấu trúc lại trong một thư mục chuyên biệt:

```
src/miniapps/geometry/
├── index.ts                     # Entry point export các Component & Type chính
├── GeometryGame.tsx             # Wrapper tuân thủ MiniGameProps để chơi như mini-game
├── GeometryApp.tsx              # Component điều phối chính (nhận mode, dimension, problemText)
├── hooks/
│   └── useGeometryState.ts      # Zustand store cục bộ quản lý scene, history và trạng thái UI
├── components/
│   ├── PlaneCanvas.tsx          # Canvas vẽ hình phẳng 2D (tách từ BikiHinhHocPhang)
│   ├── SolidCanvas.tsx          # Canvas vẽ hình không gian 3D (phát triển từ Canvas3D)
│   ├── StudioControls.tsx       # Bảng công cụ dựng hình thủ công (2D/3D)
│   ├── StepWalkthrough.tsx      # Bộ phát/điều khiển từng bước giải (player)
│   └── CommandConsole.tsx       # Dòng lệnh CLI tương tác vẽ hình bằng chữ
└── utils/
    ├── planeMath.ts             # Các hàm toán học phẳng (distance, project, v.v.)
    └── solidMath.ts             # Các hàm toán học không gian & dựng hình 3D (shapeGenerators)
```

---

## 3. Chuẩn Giao Tiếp & Tham Số Đầu Vào (Props Interface)

Component điều phối chính `GeometryApp` sẽ nhận các tham số đầu vào rõ ràng từ ứng dụng mẹ để tự động cấu hình giao diện phù hợp:

```typescript
export type GeometryMode = 'studio' | 'solve' | 'widget';
export type GeometryDimension = '2d' | '3d' | 'auto';

export interface GeometrySceneData {
  dimension: '2d' | '3d';
  figureKind: string;
  points: any[];
  overlays: any[];
  camera?: { yaw: number; pitch: number; zoom: number };
}

export interface GeometryAppProps {
  /**
   * Chế độ giao diện:
   * - 'studio': Giao diện biên tập đầy đủ (công cụ vẽ, CLI, lịch sử, tùy chỉnh tham số). Dành cho Phòng thực hành.
   * - 'solve': Tập trung hiển thị đề bài, hướng giải từng bước, và bảng vẽ minh họa có tương tác.
   * - 'widget': Chỉ hiển thị Canvas vẽ hình tĩnh/động, ẩn toàn bộ panel phụ. Dành cho nhúng trong Câu hỏi/Quiz.
   */
  mode: GeometryMode;

  /**
   * Loại hình học: '2d' (phẳng), '3d' (không gian), hoặc 'auto' (tự phát hiện dựa trên prompt đầu vào).
   */
  dimension?: GeometryDimension;

  /**
   * Đề bài toán hình học đầu vào để AI hoặc parser tự động dựng hình và giải.
   */
  problemText?: string;

  /**
   * Dữ liệu scene dựng hình được cung cấp sẵn (tránh gọi AI lại khi đã có dữ liệu hình chuẩn).
   */
  initialScene?: GeometrySceneData;

  /**
   * Quyền tương tác: cho phép kéo thả điểm (2D) hoặc xoay/zoom (3D) không. Default: true.
   */
  interactive?: boolean;

  /**
   * Theme màu giao diện học đường (unicorn-dream, dark-cyber, v.v.)
   */
  uiTheme?: string;

  /**
   * Callback khi trạng thái scene hình học thay đổi (dành cho chế độ Studio để lưu bài làm học sinh).
   */
  onSceneChange?: (scene: GeometrySceneData) => void;

  /**
   * Callback khi học sinh hoàn thành tương tác (ví dụ: đã xem hết các bước giải ở chế độ Solve).
   */
  onComplete?: (result: {
    stepsViewed: number;
    timeSpent: number;
    actionsCount: number;
  }) => void;
}
```

---

## 4. Chi tiết các Chế độ Giao diện (Interface Modes)

### 4.1 Chế độ Studio (`mode="studio"`)
- **Mục tiêu**: Cung cấp một phòng thực hành hình học đầy đủ tính năng.
- **Bố cục giao diện**:
  - **Khu vực trung tâm**: Bảng vẽ (Canvas) kích thước lớn, hiển thị lưới tọa độ (grid), hỗ trợ pan/zoom bằng chuột hoặc cử chỉ cảm ứng.
  - **Thanh công cụ (Toolbar)**: Các nút thao tác nhanh (Dựng điểm, Nối đỉnh-đỉnh, Nối đỉnh-cạnh, Đường cao, Trung tuyến, Vuông góc, Song song, Góc, Tiếp tuyến).
  - **Bảng điều khiển CLI (Command Console)**: Cho phép nhập lệnh bằng tiếng Việt tự nhiên (ví dụ: *"vẽ đường cao AH"*) để dựng hình nhanh.
  - **Lịch sử thao tác (History Sidebar)**: Hiển thị danh sách các hành động đã thực hiện, cho phép quay lại (Undo/Reset).
- **Phân loại**:
  - 2D: Kéo thả các điểm tự do để thay đổi hình dạng tam giác/tứ giác/đường tròn theo thời gian thực.
  - 3D: Xoay 360 độ, zoom hình chóp, lăng trụ, hình trụ và đổi các góc nhìn preset (Xiên chuẩn, Chính diện, Từ trên, Từ cạnh).

### 4.2 Chế độ Soi đề & Giải toán (`mode="solve"`)
- **Mục tiêu**: Giúp học sinh phân tích đề bài, xem mô hình trực quan và học cách giải từng bước.
- **Bố cục giao diện**:
  - **Khu vực đề bài**: Hiển thị text đề gốc và nút gọi AI phân tích đề.
  - **Khu vực trung tâm**: Canvas hiển thị hình học sinh động (nét thấy/khuất chuẩn quy ước).
  - **Bảng lời giải từng bước (Step Walkthrough Player)**:
    - Hiển thị tóm tắt giả thiết/kết luận.
    - Đi kèm các nút "Trước", "Sau" hoặc Tự động phát (Play/Pause) để chuyển đổi giữa các bước chứng minh.
    - Mỗi bước giải sẽ **làm nổi bật (focus)** các điểm, đoạn thẳng hoặc mặt phẳng liên quan trên Canvas bằng màu sắc tương phản, đồng thời làm mờ các phần không liên quan.

### 4.3 Chế độ Widget nhúng (`mode="widget"`)
- **Mục tiêu**: Hiển thị hình minh họa tối giản đi kèm câu hỏi kiểm tra trong `PlayArea.tsx`.
- **Bố cục giao diện**:
  - **Tối giản hóa tối đa**: Ẩn hoàn toàn bảng nhập đề bài, ô CLI, lịch sử, các nút công cụ thủ công.
  - **Chỉ hiển thị Canvas** vẽ hình phẳng hoặc không gian.
  - Đối với hình 2D: Điểm có thể bị khóa (locked) hoặc cho phép kéo nhẹ để quan sát tính chất bất biến.
  - Đối với hình 3D: Giữ nguyên khả năng xoay 360° để học sinh dễ dàng quan sát góc khuất, đường chéo chéo nhau hoặc hình chiếu.
  - Nếu câu hỏi có gợi ý từng bước vẽ, có thể nhúng một widget điều khiển bước siêu gọn (chỉ gồm số bước `Bước 1/3` và nút Next/Prev ở góc dưới Canvas).

---

## 5. Quy tắc Thiết kế Visual & Trải nghiệm Người dùng (UX/UI Rules)

Tuân thủ nghiêm ngặt các chỉ thị thẩm mỹ của hệ thống:
1. **Không hiển thị thông tin kỹ thuật nội bộ**: Tuyệt đối không hiển thị ID điểm sinh tự động dạng UUID (`P1783747340279`), mã raw JSON, hay log debug của Three.js trên UI. Nhãn của điểm phải là các chữ cái in hoa thân thiện (`A`, `B`, `C`, `S`, `H`, `M`).
2. **Ngôn ngữ truyền thống Việt Nam**: Thuật ngữ toán học sử dụng tiếng Việt chuẩn giáo khoa trung học cơ sở/phổ thông (*"đường cao"*, *"trung tuyến"*, *"tiếp tuyến"*, *"hình chóp"*, *"nét thấy"*, *"nét khuất"*).
3. **Thẩm mỹ cao cấp (Premium Visuals)**:
   - Nền canvas tối (`#07111f`) kết hợp hiệu ứng neon phát sáng (Glow/Retro Synthwave) cho các đường dựng.
   - Nét thấy vẽ bằng nét liền sáng rõ, nét khuất vẽ bằng nét đứt mờ ảo đúng quy tắc vẽ hình học không gian.
   - Các điểm tự do có màu Neon Cyan (`#00f0ff`), điểm khóa/trọng tâm có màu Hổ phách/Vàng cam (`#f59e0b`).
   - Sử dụng theme token từ `src/index.css` để đồng bộ màu sắc với toàn bộ app shell.

---

## 6. Luồng Tích hợp Backend & Bảo mật Dữ liệu

1. **API Phân tích**: Mini-App gọi các endpoint:
   - `/api/ai/geometry-plane` (2D)
   - `/api/ai/geometry-3d` (3D)
2. **Quyền truy cập & Cô lập**:
   - Việc gọi AI yêu cầu truyền Token Supabase Session và profile ID hiện hành thông qua Header:
     - `Authorization: Bearer <token>`
     - `X-Profile-Id: <profile_id>`
   - Đảm bảo dữ liệu vẽ hình tự do của học sinh được lưu trữ cô lập theo profile ID và học phần đang kích hoạt.

---

## 7. Tiêu chí Nghiệm thu (Acceptance Criteria)
1. **Tách biệt hoàn toàn**: Module `src/miniapps/geometry` không phụ thuộc vào `src/App.tsx` hay router mẹ. Mọi giao tiếp dữ liệu đi qua props và callbacks.
2. **Chạy thử nghiệm độc lập**: Tích hợp thành công thành 1 card Mini-app trong Công Viên Thư Giãn, khi click sẽ mở modal/chơi độc lập (chế độ Studio/Solve).
3. **Hiển thị gọn gàng trong Quiz**: Trong `PlayArea.tsx`, khi load app với `mode="widget"`, giao diện hiển thị gọn gàng, không trạng thái bị tràn màn hình, không hiện ô nhập đề bài.
4. **Không lỗi build/lint**: Chạy lệnh `npm run build` và `npm run lint` đạt kết quả 100% không lỗi.
