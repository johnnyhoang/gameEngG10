import React, { useMemo, useState } from 'react';
import { ArrowLeft, BookOpenText, HelpCircle, Layers3, LineChart, Move3D, Sparkles, X } from 'lucide-react';

type MatThatKind = '3d' | 'plane' | 'graph';

interface HangMatThatPageProps {
  kind: MatThatKind;
  title: string;
  subtitle: string;
  onBack: () => void;
  onSwitchTo3D: () => void;
  onSwitchToPlane: () => void;
  onSwitchToGraph: () => void;
  children: React.ReactNode;
}

interface GuideSection {
  title: string;
  body?: string;
  bullets?: string[];
}

const KIND_META: Record<MatThatKind, {
  label: string;
  icon: React.ReactNode;
  accent: string;
}> = {
  '3d': {
    label: 'Xưởng Toán Hình 3D',
    icon: <Move3D className="w-4 h-4" />,
    accent: 'from-synth-cyan/25 to-synth-purple/10'
  },
  plane: {
    label: 'Xưởng Toán Hình',
    icon: <Layers3 className="w-4 h-4" />,
    accent: 'from-synth-green/25 to-synth-cyan/10'
  },
  graph: {
    label: 'Xưởng Toán Đồ Thị',
    icon: <LineChart className="w-4 h-4" />,
    accent: 'from-synth-magenta/25 to-synth-orange/10'
  }
};

export function HangMatThatPage({
  kind,
  title,
  subtitle,
  onBack,
  onSwitchTo3D,
  onSwitchToPlane,
  onSwitchToGraph,
  children
}: HangMatThatPageProps) {
  const meta = KIND_META[kind];
  const [guideOpen, setGuideOpen] = useState(false);

  const guide = useMemo<Record<MatThatKind, { title: string; subtitle: string; sections: GuideSection[] }>>(() => ({
    '3d': {
      title: 'Sách hướng dẫn Xưởng Toán Hình 3D',
      subtitle: 'Cách dùng từng khu vực và ý nghĩa của từng điều khiển trong hình học không gian.',
      sections: [
        {
          title: '1. Xưởng Toán Hình 3D dùng để làm gì',
          body: 'Đây là không gian dựng và phân tích hình học không gian lớp 9. Mục tiêu là biến đề bài thành mô hình 3D rõ ràng để học sinh nhìn ra hình chóp, lăng trụ, tứ diện, hình hộp và các quan hệ vuông góc, song song, đường cao, mặt phẳng.'
        },
        {
          title: '2. Ý nghĩa từng khu vực',
          bullets: [
            'Tiêu đề trên cùng: cho biết đây là Xưởng Toán Hình 3D, đồng thời cho phép chuyển sang xưởng phẳng hoặc đồ thị hàm số.',
            'Nút quay lại: trở về Học Đường mà không mất ngữ cảnh của bài học.',
            'Bảng vẽ lớn: nơi hiển thị mô hình 3D, có thể xoay, zoom và pan để quan sát hình.',
            'Ô đề bài: nơi dán nguyên văn đề bài để AI đọc và dựng hình đúng theo giả thiết.',
            'Ô lệnh: nhập thao tác như vẽ đường cao, nối đỉnh với cạnh, tạo mặt phẳng, đánh dấu song song hoặc vuông góc.',
            'Khung lời giải: hiển thị từng bước lập luận, giúp học sinh chép và hiểu cách trình bày.',
            'Lịch sử thao tác: ghi lại các lệnh đã dùng để học sinh xem lại đường đi của bài giải.'
          ]
        },
        {
          title: '3. Ý nghĩa các nút và công cụ',
          bullets: [
            '3D / Phẳng / Hàm số: chuyển qua lại giữa ba Xưởng Toán mà không phải quay về Học Đường.',
            'Các nút dựng nhanh trên board: tạo thao tác cơ bản như nối đỉnh, nối đỉnh với cạnh, dựng đường cao, đánh dấu vuông góc, đánh dấu song song và đánh dấu trung điểm.',
            'Phân tích AI: gửi nguyên văn đề bài lên AI để lấy về mô hình, giả thiết và hướng giải phù hợp.',
            'Nút trợ giúp `?`: mở sách hướng dẫn hiện tại để xem cách dùng và ý nghĩa từng thành phần.'
          ]
        },
        {
          title: '4. Cách học hiệu quả',
          body: 'Đọc đề, bấm Phân tích AI trước, sau đó dùng ô lệnh để thêm các đường phụ. Khi hình đã rõ, chuyển sang khung lời giải từng bước để luyện cách trình bày theo kiểu Toán 9.'
        }
      ]
    },
    plane: {
      title: 'Sách hướng dẫn Xưởng Toán Hình',
      subtitle: 'Cách dùng board hình học phẳng, ý nghĩa các điểm, đường phụ và thao tác dựng hình.',
      sections: [
        {
          title: '1. Xưởng Toán Hình để làm gì',
          body: 'Xưởng này dành cho tam giác, tứ giác, đường tròn và các yếu tố phụ trong bài hình học phẳng lớp 9. Công cụ giúp Sĩ Tử nhìn ra cấu trúc hình, dựng đường cao, trung tuyến, song song, vuông góc, đánh dấu góc và các yếu tố chứng minh.'
        },
        {
          title: '2. Ý nghĩa từng khu vực',
          bullets: [
            'Bảng vẽ: hiển thị hình mẫu đang xét; học sinh có thể kéo thả các đỉnh không khóa để quan sát biến đổi.',
            'Nút công cụ: chọn cách thao tác trên hình, ví dụ kéo thả, nối đỉnh-đỉnh, nối đỉnh-cạnh, dựng đường cao, trung tuyến, vuông góc, song song hoặc đánh dấu góc.',
            'Đề bài: nơi nhập nguyên văn bài toán để AI nhận biết hình cần dựng và các quan hệ trong đề.',
            'Ô lệnh: nhập yêu cầu ngắn như “vẽ đường cao từ A”, “kẻ trung tuyến BM”, “nối O với C”, “đánh dấu góc bằng nhau”.',
            'Lời giải từng bước: phần AI hoặc công cụ sẽ viết ra các bước dựng và giải theo kiểu trình bày của Bộ GD&ĐT.',
            'Lịch sử thao tác: danh sách các bước vừa thực hiện, giúp học sinh theo dõi quá trình dựng hình.'
          ]
        },
        {
          title: '3. Ý nghĩa các ký hiệu trên hình',
          bullets: [
            'Điểm A, B, C, D, O, M, H: là các đỉnh, tâm hoặc chân đường vuông góc; nhãn được đặt để học sinh đọc nhanh giả thiết.',
            'Đoạn nét liền: cạnh hoặc đường đã thấy rõ trong hình.',
            'Đoạn nét đứt: đường phụ, đường cao hoặc phần nhấn mạnh nhưng không phải cạnh thật.',
            'Vùng tô mờ: mặt hoặc phần diện tích đang xét trong chứng minh.',
            'Góc tô hoặc vòng tròn nhỏ: ký hiệu cho góc cần chứng minh bằng nhau, vuông góc hoặc đặc biệt.'
          ]
        },
        {
          title: '4. Cách học hiệu quả',
          body: 'Hãy dựng hình theo đúng đề, sau đó dùng các công cụ để tạo đường phụ. Mỗi lần tạo một yếu tố mới, xem ngay lời giải để hiểu vì sao yếu tố đó xuất hiện và nó phục vụ bước chứng minh nào.'
        }
      ]
    },
    graph: {
      title: 'Sách hướng dẫn Xưởng Toán Đồ Thị',
      subtitle: 'Cách dùng bảng tọa độ, slider hệ số và các điểm đặc biệt trong đồ thị hàm số.',
      sections: [
        {
          title: '1. Xưởng Toán Đồ Thị để làm gì',
          body: 'Xưởng này dùng để vẽ và quan sát hàm số bậc nhất, bậc hai trong chương trình lớp 9. Mục tiêu là nhìn ra tác động của từng hệ số, xác định giao điểm, đỉnh, trục đối xứng và so sánh hai đồ thị.'
        },
        {
          title: '2. Ý nghĩa từng khu vực',
          bullets: [
            'Bảng tọa độ: hiển thị hệ trục, lưới ô vuông, đồ thị và các điểm đặc biệt.',
            'Slider hệ số: thay đổi m, n đối với bậc nhất hoặc a, b, c đối với bậc hai để thấy đồ thị đổi theo thời gian thực.',
            'Ô đề bài: dán nguyên văn đề để AI nhận dạng dạng hàm và trích hệ số nếu có.',
            'Ô lệnh: nhập yêu cầu như “tăng a lên 2”, “tìm giao điểm với Ox”, “hiển thị đỉnh parabol”, “so sánh hai đồ thị”.',
            'Khung thông số hiện tại: đọc nhanh công thức đang chạy và các dữ kiện quan trọng.',
            'Lời giải từng bước: giúp học sinh hiểu từ nhận dạng hàm đến kết luận về đồ thị.'
          ]
        },
        {
          title: '3. Ý nghĩa các ký hiệu trên đồ thị',
          bullets: [
            'Điểm O: gốc tọa độ, mốc tham chiếu của toàn bộ hệ trục.',
            'Giao điểm với Ox: nơi đồ thị cắt trục hoành, thường là nghiệm của phương trình tương ứng.',
            'Giao điểm với Oy: điểm khi x = 0, cho biết tung độ gốc của hàm số.',
            'Đỉnh parabol: điểm cao nhất hoặc thấp nhất của đồ thị bậc hai.',
            'Trục đối xứng: đường thẳng đi qua đỉnh, chia parabol thành hai phần đối xứng.'
          ]
        },
        {
          title: '4. Cách học hiệu quả',
          body: 'Sau khi nhập đề, hãy thử thay từng hệ số một để quan sát sự thay đổi của đồ thị. Khi đã hiểu tác động của mỗi hệ số, quay sang phần lời giải để luyện chốt ý và trình bày ngắn gọn.'
        }
      ]
    }
  }), []);

  return (
    <div className="space-y-6">
      <section className={`glass-panel rounded-3xl border border-white/10 p-6 md:p-8 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,0,127,0.08),transparent_32%)]`}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-gradient-to-r ${meta.accent} text-[10px] font-orbitron font-bold uppercase tracking-[0.24em] text-white`}>
              <Sparkles className="w-3.5 h-3.5" />
              {meta.label}
            </div>
            <div className="space-y-2">
              <h1 className="font-orbitron font-black text-3xl md:text-5xl uppercase tracking-wider text-white">
                {title}
              </h1>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại Học Đường
              </button>
              <button
                onClick={() => setGuideOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-synth-cyan/15 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                ?
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full lg:w-[420px]">
            {[
              { key: '3d' as const, onClick: onSwitchTo3D, active: kind === '3d', icon: <Move3D className="w-5 h-5" />, label: '3D' },
              { key: 'plane' as const, onClick: onSwitchToPlane, active: kind === 'plane', icon: <Layers3 className="w-5 h-5" />, label: 'Phẳng' },
              { key: 'graph' as const, onClick: onSwitchToGraph, active: kind === 'graph', icon: <LineChart className="w-5 h-5" />, label: 'Hàm số' }
            ].map(item => (
              <button
                key={item.key}
                onClick={item.onClick}
                className={`rounded-2xl border p-4 text-left bg-gradient-to-br ${KIND_META[item.key].accent} transition-all duration-200 cursor-pointer ${
                  item.active ? 'border-white/35 shadow-[0_0_18px_rgba(255,255,255,0.08)] scale-[1.01]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 font-orbitron font-black uppercase text-white">
                  {item.icon}
                  <span className="text-[11px]">{item.label}</span>
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-wider text-slate-200/90">
                  {KIND_META[item.key].label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-[calc(100vh-260px)]">
        {children}
      </section>

      {guideOpen && (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
          <div className="mx-auto max-w-5xl glass-panel rounded-3xl border border-synth-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 md:p-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-synth-cyan/20 bg-synth-cyan/10 text-synth-cyan text-[10px] font-bold uppercase tracking-[0.24em]">
                  <BookOpenText className="w-3.5 h-3.5" />
                  Sách hướng dẫn
                </div>
                <h2 className="font-orbitron font-black text-xl md:text-3xl uppercase tracking-wider text-white">
                  {guide[kind].title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {guide[kind].subtitle}
                </p>
              </div>
              <button
                onClick={() => setGuideOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 cursor-pointer"
                aria-label="Đóng sách hướng dẫn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 md:p-6">
              {guide[kind].sections.map(section => (
                <section key={section.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
                  <h3 className="font-orbitron font-black text-sm md:text-base uppercase tracking-wider text-synth-cyan">
                    {section.title}
                  </h3>
                  {section.body ? (
                    <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                      {section.body}
                    </p>
                  ) : null}
                  {section.bullets ? (
                    <ul className="mt-3 space-y-2">
                      {section.bullets.map(item => (
                        <li key={item} className="text-sm text-slate-200 leading-relaxed flex gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-synth-cyan shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
