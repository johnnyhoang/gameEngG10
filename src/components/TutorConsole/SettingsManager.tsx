import React, { useState } from 'react';
import { SlidersHorizontal, BookOpen } from 'lucide-react';
import { isAdmin } from '../../utils/roleHelpers';
import { toast } from '../../utils/toast';
import { SideDrawer } from '../Common/SideDrawer';

/** Một dòng thiết lập dạng chuẩn: nhãn bên trái, ô số + nút −/+ bên phải */
const SettingRow: React.FC<{
  label: string;
  hint?: string;
  unit?: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
}> = ({ label, hint, unit, value, onChange, step = 1, min = 0 }) => (
  <div className="flex items-center justify-between gap-3 py-2.5 border-b border-white/5 last:border-b-0">
    <div className="min-w-0">
      <span className="block text-xs font-semibold text-white">{label}</span>
      {hint && <span className="block text-[10px] text-synth-text-muted mt-0.5">{hint}</span>}
    </div>
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - step))}
        className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer font-bold leading-none"
        aria-label={`Giảm ${label}`}
      >
        −
      </button>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
        className="w-20 p-2 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-center outline-none focus:border-synth-cyan text-xs font-bold"
      />
      <button
        type="button"
        onClick={() => onChange(value + step)}
        className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer font-bold leading-none"
        aria-label={`Tăng ${label}`}
      >
        +
      </button>
      {unit && (
        <span className="text-[10px] text-synth-text-muted font-bold uppercase w-10 text-left">{unit}</span>
      )}
    </div>
  </div>
);

interface SettingsManagerProps {
  currentUser: any;
  gameSettings: any;
  updateGameSettings: (settings: any) => Promise<void>;
  addHandbookPage: (page: any) => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  currentUser,
  gameSettings,
  updateGameSettings,
  addHandbookPage
}) => {
  // Cấu hình game settings
  const [bossBonusEasy, setBossBonusEasy] = useState(gameSettings?.bossCompletionBonusRuby?.[0] ?? 100);
  const [bossBonusMedium, setBossBonusMedium] = useState(gameSettings?.bossCompletionBonusRuby?.[1] ?? 150);
  const [bossBonusHard, setBossBonusHard] = useState(gameSettings?.bossCompletionBonusRuby?.[2] ?? 200);
  const [challengeCost1, setChallengeCost1] = useState(gameSettings?.challengeEnergyCosts?.[0] ?? 30);
  const [challengeCost2, setChallengeCost2] = useState(gameSettings?.challengeEnergyCosts?.[1] ?? 30);
  const [challengeCost3, setChallengeCost3] = useState(gameSettings?.challengeEnergyCosts?.[2] ?? 30);
  const [challengeCost4, setChallengeCost4] = useState(gameSettings?.challengeEnergyCosts?.[3] ?? 30);
  const [baseXPVal, setBaseXPVal] = useState(gameSettings?.baseXP ?? 15);
  const [baseRubyVal, setBaseRubyVal] = useState(gameSettings?.baseRuby ?? 5);
  const [themeUnlockCostVal, setThemeUnlockCostVal] = useState(gameSettings?.themeUnlockCost ?? 200);

  // Cẩm Nang Học Đường
  const [hbCategory, setHbCategory] = useState('Dặn Dò của Viện Trưởng');
  const [hbTitle, setHbTitle] = useState('');
  const [hbContent, setHbContent] = useState('');
  const [isHbFormOpen, setIsHbFormOpen] = useState(false);

  const handleSaveSettings = async () => {
    await updateGameSettings({
      bossCompletionBonusRuby: [bossBonusEasy, bossBonusMedium, bossBonusHard],
      challengeEnergyCosts: [challengeCost1, challengeCost2, challengeCost3, challengeCost4],
      baseXP: baseXPVal,
      baseRuby: baseRubyVal,
      themeUnlockCost: themeUnlockCostVal
    });
    toast.success('Đã lưu cấu hình hoạt động của game thành công!');
  };


  const handleCreateHandbookPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hbTitle || !hbContent) {
      toast.error('Vui lòng điền tiêu đề và nội dung trang sách!');
      return;
    }
    addHandbookPage({
      category: hbCategory,
      title: hbTitle,
      content: hbContent
    });
    toast.success('Đã nạp thêm trang dặn dò thành công vào cẩm nang của Sĩ Tử! ✍️');
    setHbTitle('');
    setHbContent('');
    setIsHbFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Cấu hình game settings (Phòng Hiệu Trưởng — CORE_SPECS §2.1) */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-synth-cyan" />
          <h3 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider flex items-center gap-1.5">
            ⚙️ Quy Tắc Hoạt Động — Thiết lập nạp Năng Lượng & Bonus Khoa Thi
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Nhóm 1: Thưởng Hoàn Thành Khoa Thi */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <h4 className="text-[10px] font-orbitron font-bold uppercase tracking-wider text-synth-orange">
              🏆 Thưởng Hoàn Thành Khoa Thi
            </h4>
            <p className="text-[10px] text-synth-text-muted mt-0.5 mb-2">
              Ruby thưởng thêm khi hoàn thành Khoa Thi, theo độ khó đề.
            </p>
            <SettingRow label="Đề Dễ" unit="Ruby" value={bossBonusEasy} onChange={setBossBonusEasy} step={10} />
            <SettingRow label="Đề Trung Bình" unit="Ruby" value={bossBonusMedium} onChange={setBossBonusMedium} step={10} />
            <SettingRow label="Đề Khó" unit="Ruby" value={bossBonusHard} onChange={setBossBonusHard} step={10} />
          </div>

          {/* Nhóm 2: Chi phí năng lượng */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <h4 className="text-[10px] font-orbitron font-bold uppercase tracking-wider text-synth-cyan">
              ⚡ Chi Phí Vào Trường Thi
            </h4>
            <p className="text-[10px] text-synth-text-muted mt-0.5 mb-2">
              Năng Lượng học sinh phải trả cho mỗi lượt vào Trường Thi.
            </p>
            {[
              { label: 'Cấp độ 1', value: challengeCost1, setter: setChallengeCost1 },
              { label: 'Cấp độ 2', value: challengeCost2, setter: setChallengeCost2 },
              { label: 'Cấp độ 3', value: challengeCost3, setter: setChallengeCost3 },
              { label: 'Cấp độ 4', value: challengeCost4, setter: setChallengeCost4 }
            ].map(item => (
              <SettingRow key={item.label} label={item.label} unit="⚡ NL" value={item.value} onChange={item.setter} />
            ))}
          </div>

          {/* Nhóm 3: Thưởng cơ bản mỗi câu đúng */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <h4 className="text-[10px] font-orbitron font-bold uppercase tracking-wider text-synth-green">
              🎯 Thưởng Mỗi Câu Đúng
            </h4>
            <p className="text-[10px] text-synth-text-muted mt-0.5 mb-2">
              Điểm cơ bản cộng cho học sinh với mỗi câu trả lời đúng.
            </p>
            <SettingRow label="XP cơ bản" unit="XP" value={baseXPVal} onChange={setBaseXPVal} min={1} />
            <SettingRow label="Ruby cơ bản" unit="Ruby" value={baseRubyVal} onChange={setBaseRubyVal} min={1} />
          </div>

          {/* Nhóm 4: Giá mở khóa Phong Cách Học Đường */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <h4 className="text-[10px] font-orbitron font-bold uppercase tracking-wider text-synth-cyan">
              🎨 Phong Cách Học Đường
            </h4>
            <p className="text-[10px] text-synth-text-muted mt-0.5 mb-2">
              Giá Ruby để mở khóa một giao diện (theme) mới trong Cửa Hàng.
            </p>
            <SettingRow label="Giá mở khóa" unit="Ruby" value={themeUnlockCostVal} onChange={setThemeUnlockCostVal} step={50} min={1} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between bg-white/5 rounded-xl border border-white/5 p-4">
          <p className="text-[10px] text-synth-text-muted leading-relaxed">
            Các cấu hình này áp dụng chung cho tất cả học sinh (Cấp độ thử thách và lượng điểm nhận được). Riêng Năng Lượng Tối Đa + giờ hồi thì chỉnh RIÊNG cho từng học sinh: vào ⚙️ Phòng Hiệu Trưởng → 👥 Học Sinh & Liên Kết → bấm vào học sinh cần chỉnh.
          </p>
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2.5 rounded-xl bg-synth-cyan text-black font-orbitron font-bold text-[10px] uppercase tracking-wider hover:synth-glow-cyan transition-all shrink-0 cursor-pointer"
          >
            Lưu Quy Tắc ⚙️
          </button>
        </div>
      </div>

      {/* 2. Cẩm nang học viện */}
      {isAdmin(currentUser?.role) && (
        <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-synth-magenta" />
              <h3 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-1.5">
                📜 Cẩm Nang Học Viện (Handbook)
              </h3>
            </div>
            <button
              onClick={() => setIsHbFormOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-synth-magenta text-white font-orbitron font-bold text-[10px] uppercase tracking-wider hover:bg-synth-magenta/80 transition-colors cursor-pointer shrink-0"
            >
              ✍️ Viết thêm trang cẩm nang
            </button>
          </div>

          {/* Drawer: Viết trang cẩm nang mới */}
          <SideDrawer
            isOpen={isHbFormOpen}
            onClose={() => setIsHbFormOpen(false)}
            widthClass="max-w-xl"
            title={<span className="text-synth-magenta">📜 Viết thêm trang cẩm nang</span>}
          >
            <form onSubmit={handleCreateHandbookPage} className="p-5 space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="space-y-1 text-xs block">
                  <span className="text-synth-text-muted font-semibold block">Đề mục trang sách (Category)</span>
                  <input
                    type="text"
                    required
                    value={hbCategory}
                    onChange={(e) => setHbCategory(e.target.value)}
                    placeholder="Ví dụ: Quy định, Cẩm nang"
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-magenta text-xs"
                  />
                </label>
                <label className="space-y-1 text-xs block">
                  <span className="text-synth-text-muted font-semibold block">Tiêu đề (Title)</span>
                  <input
                    type="text"
                    required
                    value={hbTitle}
                    onChange={(e) => setHbTitle(e.target.value)}
                    placeholder="Ví dụ: Quy tắc phân bổ Ruby, Nhắc nhở kỷ luật"
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-magenta text-xs"
                  />
                </label>
              </div>
              <label className="space-y-1 text-xs block">
                <span className="text-synth-text-muted font-semibold block">Nội dung bài viết (Markdown / Text)</span>
                <textarea
                  required
                  value={hbContent}
                  onChange={(e) => setHbContent(e.target.value)}
                  placeholder="Nhập nội dung dặn dò chi tiết tại đây..."
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-magenta text-xs h-40 resize-none"
                />
              </label>
              <button
                type="submit"
                className="px-4 py-2 bg-synth-magenta text-white font-bold rounded-lg hover:bg-synth-magenta/80 transition-colors uppercase text-xs cursor-pointer"
              >
                Nạp trang sách ✍️
              </button>
            </form>
          </SideDrawer>
        </div>
      )}

      {/* Duyệt ứng tuyển Phó Viện + cấp/thu hồi quyền đã chuyển sang tab 🛡️ Nhân Sự & Phân Quyền */}
    </div>
  );
};
