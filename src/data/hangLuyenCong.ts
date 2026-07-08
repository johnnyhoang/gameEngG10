import type { SubjectId } from '../types/game';

export type HangSubjectId = SubjectId;

export interface HangTopic {
  title: string;
  summary: string;
  focus: string[];
}

export interface HangFlashcard {
  subject: HangSubjectId;
  front: string;
  back: string;
  note: string;
}

export interface HangTool {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
}

export interface HangSource {
  label: string;
  url: string;
  note: string;
}

export const HANG_TRACKS: Record<HangSubjectId, HangTopic[]> = {
  english: [
    {
      title: 'Ngữ pháp lõi',
      summary: 'Hệ thống hóa các điểm thường ra nhất trong đề lớp 10 và bám sát năng lực giao tiếp thực hành.',
      focus: ['Thì động từ', 'Bị động', 'Mệnh đề quan hệ', 'Câu điều kiện', 'Word form']
    },
    {
      title: 'Phát âm và trọng âm',
      summary: 'Luyện nhận diện đuôi -ed/-s, nguyên âm, phụ âm và quy tắc nhấn âm.',
      focus: ['Pronunciation', 'Stress pattern', 'Minimal pairs', 'Nghe theo nhóm từ']
    },
    {
      title: 'Đọc hiểu và điền khuyết',
      summary: 'Tập trung đọc ý chính, từ nối, đại từ tham chiếu và ngữ cảnh đoạn văn.',
      focus: ['Cloze test', 'Main idea', 'Reference words', 'Transition signals']
    },
    {
      title: 'Viết lại câu',
      summary: 'Rèn chuyển đổi cấu trúc câu nhanh, gọn, đúng chuẩn chấm điểm.',
      focus: ['Rewrite with cues', 'Passive voice', 'Reported speech', 'Sentence transformation']
    }
  ],
  math: [
    {
      title: 'Hàm số và phương trình bậc hai',
      summary: 'Bài trọng tâm của toán vào 10: parabol, hoành độ giao điểm, Vi-ét và tham số.',
      focus: ['Parabol y = ax^2 + bx + c', 'Giao điểm', 'Hệ thức Vi-ét', 'Điều kiện nghiệm']
    },
    {
      title: 'Bài toán thực tế',
      summary: 'Các câu vận dụng số liệu, phần trăm, tăng giảm giá, năng suất và chuyển động.',
      focus: ['Phần trăm', 'Lập phương trình', 'Tỉ lệ', 'Giải bài toán thực tế']
    },
    {
      title: 'Hình học phẳng',
      summary: 'Ôn các hệ thức trong tam giác vuông, đường tròn, tiếp tuyến và tứ giác nội tiếp.',
      focus: ['Tiếp tuyến', 'Đường tròn', 'Tứ giác nội tiếp', 'Chứng minh hình học']
    },
    {
      title: 'Hình học không gian',
      summary: 'Nắm công thức thể tích, diện tích xung quanh và bài toán liên hệ thực tế.',
      focus: ['Hình trụ', 'Hình nón', 'Hình cầu', 'Công thức thể tích']
    }
  ],
  literature: [
    {
      title: 'Đọc hiểu văn bản',
      summary: 'Phân biệt thơ, truyện, kí và văn bản nghị luận; rút ý, tìm biện pháp nghệ thuật và thông điệp.',
      focus: ['Ý nghĩa nhan đề', 'Biện pháp tu từ', 'Hình ảnh biểu tượng', 'Thông điệp tác phẩm']
    },
    {
      title: 'Tiếng Việt',
      summary: 'Ôn các lớp từ, thành phần câu, phép liên kết, từ Hán Việt và lỗi diễn đạt.',
      focus: ['Từ loại', 'Câu ghép', 'Phép nối', 'Biện pháp tu từ']
    },
    {
      title: 'Viết đoạn và bài nghị luận',
      summary: 'Luyện bố cục, luận điểm, luận cứ và cách triển khai đoạn văn 200 chữ.',
      focus: ['Mở đoạn', 'Luận điểm', 'Dẫn chứng', 'Kết đoạn']
    },
    {
      title: 'Nghị luận văn học',
      summary: 'Rèn dàn ý cảm nhận tác phẩm, nhân vật và hình ảnh thơ theo hướng ngắn gọn, rõ ý.',
      focus: ['Dàn ý', 'Dẫn thơ', 'Phân tích chi tiết', 'Giọng điệu nghệ thuật']
    }
  ],
  science: [
    {
      title: 'Vật lý (Lớp 9)',
      summary: 'Hệ thống hóa lý thuyết Điện học, Điện từ học, Quang học và Sự bảo toàn năng lượng.',
      focus: ['Điện trở', 'Định luật Ôm', 'Thấu kính hội tụ', 'Khúc xạ ánh sáng']
    },
    {
      title: 'Hóa học (Lớp 9)',
      summary: 'Các hợp chất vô cơ, Kim loại, Phi kim và Sơ lược hóa học hữu cơ.',
      focus: ['Oxit - Axit - Bazơ', 'Bảng tuần hoàn', 'Hiđrocacbon', 'Polime']
    },
    {
      title: 'Sinh học (Lớp 9)',
      summary: 'Di truyền học, Biến dị, Sinh vật và Môi trường sống.',
      focus: ['Quy luật Men-đen', 'Cấu trúc ADN và Gen', 'Hệ sinh thái', 'Bảo vệ môi trường']
    }
  ],
  history_geography: [
    {
      title: 'Lịch sử lớp 9',
      summary: 'Lịch sử thế giới hiện đại từ 1945 và tiến trình cách mạng Việt Nam từ năm 1919.',
      focus: ['Cách mạng Việt Nam', 'Chiến dịch lịch sử', 'Các kỳ đại hội Đảng']
    },
    {
      title: 'Địa lý lớp 9',
      summary: 'Địa lý dân cư Việt Nam và sự phát triển, phân bố của các ngành kinh tế.',
      focus: ['Phân bố dân cư', 'Nông - Lâm - Ngư nghiệp', 'Các vùng kinh tế trọng điểm']
    }
  ],
  civics: [
    {
      title: 'Đạo đức & Pháp luật',
      summary: 'Nghĩa vụ công dân, quyền tự do dân chủ và trách nhiệm với gia đình, xã hội.',
      focus: ['Quyền tự do ngôn luận', 'Nghĩa vụ học tập', 'Hiến pháp nước CHXHCN Việt Nam']
    }
  ],
  technology: [
    {
      title: 'Công nghệ lắp đặt & Đời sống',
      summary: 'Lý thuyết mạch điện sinh hoạt trong nhà và quy trình lắp đặt an toàn.',
      focus: ['Thiết bị bảo vệ mạng điện', 'Sơ đồ lắp đặt điện', 'An toàn lao động']
    }
  ],
  informatics: [
    {
      title: 'Lập trình & Mạng máy tính',
      summary: 'Tư duy thuật toán căn bản ( Scratch / Python ), Cơ sở dữ liệu và sử dụng Internet an toàn.',
      focus: ['Cấu trúc điều khiển', 'Biến và kiểu dữ liệu', 'Bảo mật thông tin cá nhân']
    }
  ],
  arts: [
    {
      title: 'Âm nhạc & Mỹ thuật',
      summary: 'Nhạc lý cơ bản, các nhạc sĩ tiêu biểu và Mỹ thuật ứng dụng vẽ tranh đề tài.',
      focus: ['Quãng và Hợp xướng', 'Tỉ lệ hình họa', 'Phối màu cơ bản trong trang trí']
    }
  ]
};

export const HANG_FLASHCARDS: HangFlashcard[] = [
  {
    subject: 'english',
    front: 'Thì hiện tại hoàn thành thường đi với dấu hiệu nào?',
    back: 'for, since, already, yet, just, ever, never.',
    note: 'Ưu tiên nhận diện mốc thời gian để chọn đúng thì.'
  },
  {
    subject: 'english',
    front: 'Mệnh đề quan hệ rút gọn dùng khi nào?',
    back: 'Khi muốn thay mệnh đề đầy đủ bằng V-ing / V3-ed để làm câu gọn hơn.',
    note: 'Nhớ phân biệt chủ động V-ing và bị động V3-ed.'
  },
  {
    subject: 'math',
    front: 'Điều kiện để phương trình bậc hai có hai nghiệm phân biệt?',
    back: 'Delta > 0 hoặc Delta phẩy > 0 tùy cách viết.',
    note: 'Đây là điều kiện lọc nhanh trong bài trắc nghiệm.'
  },
  {
    subject: 'math',
    front: 'Công thức thể tích hình trụ?',
    back: 'V = pi * r^2 * h.',
    note: 'Bài thực tế hay đổi đơn vị trước khi thay số.'
  },
  {
    subject: 'literature',
    front: 'Luận cứ là gì?',
    back: 'Là lí lẽ và dẫn chứng dùng để làm sáng tỏ luận điểm.',
    note: 'Đừng nhầm với cảm xúc hoặc kể lể lan man.'
  },
  {
    subject: 'literature',
    front: 'Khi phân tích thơ, cần chốt điều gì trước?',
    back: 'Hình ảnh, giọng điệu, biện pháp nghệ thuật và cảm xúc trung tâm.',
    note: 'Đi từ nghệ thuật tới ý nghĩa, rồi mới tới thông điệp.'
  }
];

export const HANG_TOOLS: HangTool[] = [
  {
    id: 'map',
    title: 'Bản đồ kiến thức',
    description: 'Xem nhanh khung ôn tập theo từng môn và từng mảng trọng tâm.',
    actionLabel: 'Mở bản đồ'
  },
  {
    id: 'drill',
    title: 'Phòng luyện nhanh',
    description: 'Đi thẳng vào chế độ luyện câu hỏi hiện có để kiểm tra mức độ nắm bài.',
    actionLabel: 'Vào luyện'
  },
  {
    id: 'biki3d',
    title: 'Bí kíp 3D',
    description: 'Dựng hình học không gian lớp 9, xoay 360°, tô mặt, đánh dấu vuông góc và phát lời giải từng bước.',
    actionLabel: 'Mở Bí kíp'
  },
  {
    id: 'bikiplane',
    title: 'Bí kíp Hình học phẳng',
    description: 'Dựng tam giác, tứ giác, đường tròn; kéo thả điểm, kẻ đường cao, trung tuyến và kiểm tra quan hệ hình học.',
    actionLabel: 'Mở Bí kíp'
  },
  {
    id: 'bikigraph',
    title: 'Bí kíp Đồ thị hàm số',
    description: 'Vẽ hàm số bậc nhất, bậc hai với slider hệ số, xem giao điểm, đỉnh, trục đối xứng và phân tích từng bước.',
    actionLabel: 'Mở Bí kíp'
  },
  {
    id: 'notes',
    title: 'Sổ tay lỗi sai',
    description: 'Ghi lại phần còn yếu, đánh dấu thứ cần ôn lại ở lần sau.',
    actionLabel: 'Mở sổ'
  }
];

export const HANG_SOURCES: HangSource[] = [
  {
    label: 'MOET - Chương trình giáo dục phổ thông',
    url: 'https://moet.gov.vn/tin-tuc-cot-phai/chuong-trinh-giao-duc-pho-thong',
    note: 'Nguồn khung chương trình và định hướng năng lực.'
  },
  {
    label: 'MOET - Chương trình tổng thể GDPT 2018',
    url: 'https://moet.gov.vn/tintuc/Pages/CT-GDPT-Tong-The.aspx?ItemID=8421',
    note: 'Nền tảng để chọn các mảng kiến thức cốt lõi.'
  },
  {
    label: 'MOET - Tiếng Anh mới: học sinh phải tự học nhiều hơn',
    url: 'https://moet.gov.vn/giaoducquocdan/giao-duc-trung-hoc/Pages/tin-tuc.aspx?ItemID=5853',
    note: 'Nguồn nhấn mạnh kỹ năng ngôn ngữ và tính thực hành.'
  },
  {
    label: 'MOET - Điều chỉnh nội dung dạy học lớp 9',
    url: 'https://moet.gov.vn/tintuc/Pages/CT-GDPT-Tong-The.aspx?ItemID=7032',
    note: 'Gợi ý định hướng chuẩn đầu vào lớp 10.'
  }
];
