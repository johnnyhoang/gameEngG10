import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { 
  Compass, Sword, ShieldAlert, Star, Zap
} from 'lucide-react';

interface GameMapProps {
  onStartPlay: (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'mixed' | 'revenge' | 'boss',
    bossId?: string
  ) => void;
  onOpenMysteryBox: () => void;
  onSpinWheel: () => void;
}

export const GameMap: React.FC<GameMapProps> = ({ onStartPlay, onOpenMysteryBox, onSpinWheel }) => {
  const player = useGameState(state => state.player);
  const dailyMission = useGameState(state => state.dailyMission);
  const useEnergy = useGameState(state => state.useEnergy);
  const currentSubject = useGameState(state => state.currentSubject);

  // Check if weekend for Lucky Wheel
  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  const handleLaunchZone = (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'mixed' | 'revenge' | 'boss',
    energyCost: number,
    bossId?: string
  ) => {
    if (player.energy < energyCost) {
      alert('Không đủ năng lượng! Hãy đợi năng lượng hồi phục hoặc hoàn thành các thử thách khác.');
      return;
    }
    useEnergy(energyCost);
    onStartPlay(mode, bossId);
  };

  const mapZones = currentSubject === 'math' ? [
    {
      id: 'math-algebra',
      title: 'Đảo Đại Số & Vi-ét',
      mode: 'grammar' as const,
      description: 'Luyện tập Hàm số, đồ thị Parabol (d) và Hệ thức Vi-ét chuyên sâu.',
      energyCost: 10,
      rewardText: '+15 XP / +5 NP',
      colorClass: 'border-synth-magenta/30 hover:border-synth-magenta shadow-magenta',
      textColor: 'text-synth-magenta',
      bgGradient: 'from-synth-magenta/5 to-transparent',
      icon: <Compass className="w-8 h-8 text-synth-magenta" />
    },
    {
      id: 'math-wordproblems',
      title: 'Đảo Toán Thực Tế',
      mode: 'vocabulary' as const,
      description: 'Chinh phục Toán thực tế: Lập phương trình, lãi suất, phần trăm kinh tế TP.HCM.',
      energyCost: 10,
      rewardText: '+15 XP / +5 NP',
      colorClass: 'border-synth-purple/30 hover:border-synth-purple shadow-purple',
      textColor: 'text-synth-purple',
      bgGradient: 'from-synth-purple/5 to-transparent',
      icon: <Star className="w-8 h-8 text-synth-purple" />
    },
    {
      id: 'math-geometry',
      title: 'Đảo Hình Học phẳng & Không gian',
      mode: 'reading' as const,
      description: 'Tính thể tích lon nước hình trụ, phễu nón và Tứ giác nội tiếp đường tròn.',
      energyCost: 15,
      rewardText: '+20 XP / +8 NP',
      colorClass: 'border-synth-cyan/30 hover:border-synth-cyan shadow-cyan',
      textColor: 'text-synth-cyan',
      bgGradient: 'from-synth-cyan/5 to-transparent',
      icon: <Compass className="w-8 h-8 text-synth-cyan" />
    },
    {
      id: 'nightmare-dungeon',
      title: 'Hầm Ngục Sửa Sai',
      mode: 'revenge' as const,
      description: 'Vượt qua nỗi sợ! Làm lại toàn bộ các câu hỏi toán con đã làm sai trước đây.',
      energyCost: 10,
      rewardText: 'Xử lý lỗi sai cũ / Hồi phục năng lượng',
      colorClass: 'border-synth-orange/30 hover:border-synth-orange shadow-orange',
      textColor: 'text-synth-orange',
      bgGradient: 'from-synth-orange/5 to-transparent',
      icon: <ShieldAlert className="w-8 h-8 text-synth-orange" />
    }
  ] : [
    {
      id: 'grammar-cave',
      title: 'Grammar Cave',
      mode: 'grammar' as const,
      description: 'Luyện cấu trúc Ngữ pháp chuyên sâu: Thì, Bị động, Mệnh đề quan hệ...',
      energyCost: 10,
      rewardText: '+15 XP / +5 NP',
      colorClass: 'border-synth-cyan/30 hover:border-synth-cyan shadow-cyan',
      textColor: 'text-synth-cyan',
      bgGradient: 'from-synth-cyan/5 to-transparent',
      icon: <Compass className="w-8 h-8 text-synth-cyan" />
    },
    {
      id: 'vocabulary-castle',
      title: 'Vocabulary Castle',
      mode: 'vocabulary' as const,
      description: 'Chinh phục Từ vựng & chuyên đề Word Form (Biến đổi danh/động/tính từ) cốt lõi HCMC.',
      energyCost: 10,
      rewardText: '+15 XP / +5 NP',
      colorClass: 'border-purple-500/30 hover:border-synth-purple shadow-purple',
      textColor: 'text-synth-purple',
      bgGradient: 'from-synth-purple/5 to-transparent',
      icon: <Star className="w-8 h-8 text-synth-purple" />
    },
    {
      id: 'reading-forest',
      title: 'Reading Forest',
      mode: 'reading' as const,
      description: 'Nâng trình Đọc hiểu, điền từ đoạn văn (Cloze Test) & Đọc hiểu liên hoàn.',
      energyCost: 15,
      rewardText: '+20 XP / +8 NP',
      colorClass: 'border-green-500/30 hover:border-synth-green shadow-green',
      textColor: 'text-synth-green',
      bgGradient: 'from-synth-green/5 to-transparent',
      icon: <Compass className="w-8 h-8 text-synth-green" />
    },
    {
      id: 'nightmare-dungeon',
      title: 'Nightmare Dungeon',
      mode: 'revenge' as const,
      description: 'Vượt qua nỗi sợ! Tập hợp toàn bộ các câu hỏi con đã từng làm sai để sửa chữa lỗi lầm.',
      energyCost: 10,
      rewardText: 'Xử lý lỗi sai cũ / Hồi phục năng lượng',
      colorClass: 'border-synth-orange/30 hover:border-synth-orange shadow-orange',
      textColor: 'text-synth-orange',
      bgGradient: 'from-synth-orange/5 to-transparent',
      icon: <ShieldAlert className="w-8 h-8 text-synth-orange" />
    }
  ];

  const bosses = currentSubject === 'math' ? [
    { id: 'b-2024', name: 'Đại Ca Toán HCMC 2024', year: '2024', bounty: '10.000đ', energy: 20 },
    { id: 'b-2025', name: 'Cự Long Toán HCMC 2025', year: '2025', bounty: '15.000đ', energy: 20 },
    { id: 'b-2026', name: 'Cổ Long Toán HCMC 2026 (Mock)', year: '2026', bounty: '20.000đ', energy: 25 }
  ] : [
    { id: 'b-2024', name: 'Đại Ca HCMC 2024', year: '2024', bounty: '10.000đ', energy: 20 },
    { id: 'b-2025', name: 'Cự Long HCMC 2025', year: '2025', bounty: '15.000đ', energy: 20 },
    { id: 'b-2026', name: 'Cổ Long HCMC 2026 (Mock)', year: '2026', bounty: '20.000đ', energy: 25 }
  ];

  return (
    <div className="space-y-6">
      {/* Daily Quest & Rewards Banner */}
      <div className="glass-panel rounded-2xl border border-synth-magenta/30 bg-gradient-to-r from-synth-magenta/10 via-synth-purple/10 to-transparent p-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-synth-magenta animate-ping" />
            <h2 className="font-orbitron text-lg font-black text-white uppercase tracking-wider">
              Nhiệm Vụ Chiến Dịch Ngày
            </h2>
          </div>
          <p className="text-xs text-synth-text-muted">
            {dailyMission?.completed 
              ? 'Tuyệt vời! Con đã hoàn thành tất cả nhiệm vụ hôm nay. Hãy nhận Hòm Bí Mật!' 
              : 'Hoàn thành chỉ tiêu học tập hôm nay để mở khóa Hòm Bí Mật và Ví Thưởng.'}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          {dailyMission?.completed ? (
            <button
              onClick={onOpenMysteryBox}
              className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-magenta text-black hover:synth-glow-magenta cursor-pointer transition-all duration-300 shadow-[0_0_15px_#ff007f] animate-bounce"
            >
              Mở Hòm Bí Mật 🎁
            </button>
          ) : (
            <button
              onClick={() => handleLaunchZone('mixed', 10)}
              className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 shadow-[0_0_15px_#00f0ff]"
            >
              Hành Trình Ngẫu Nhiên ⚡
            </button>
          )}

          {isWeekend() && (
            <button
              onClick={onSpinWheel}
              className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-orange text-black hover:synth-glow-orange cursor-pointer transition-all duration-300 shadow-[0_0_15px_#ff9f1c]"
            >
              Vòng Quay Cuối Tuần 🎡
            </button>
          )}
        </div>
      </div>

      {/* Grid Map Zones */}
      <div>
        <h3 className="font-orbitron font-bold text-white text-base uppercase tracking-wider mb-4 flex items-center gap-2">
          <Compass className="w-5 h-5 text-synth-cyan" /> Bản Đồ Học Tập
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mapZones.map(zone => (
            <div
              key={zone.id}
              onClick={() => handleLaunchZone(zone.mode, zone.energyCost)}
              className={`glass-panel glass-panel-hover rounded-2xl border p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 ${zone.colorClass} bg-gradient-to-br ${zone.bgGradient}`}
            >
              {/* Energy Cost Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded bg-synth-blue border border-synth-cyan/20 text-[10px] font-orbitron font-bold">
                <Zap className="w-3 h-3 text-synth-cyan fill-synth-cyan" /> {zone.energyCost}
              </div>

              {/* Graphic Icon */}
              <div className="w-12 h-12 rounded-xl bg-synth-gray/50 border border-white/5 flex items-center justify-center shrink-0">
                {zone.icon}
              </div>

              {/* Details */}
              <div className="space-y-1 min-w-0">
                <h4 className={`font-orbitron font-bold text-base ${zone.textColor}`}>
                  {zone.title}
                </h4>
                <p className="text-xs text-synth-text-muted leading-relaxed">
                  {zone.description}
                </p>
                <div className="text-[10px] text-synth-text-muted font-bold font-orbitron pt-2">
                  Phần thưởng: <span className="text-white">{zone.rewardText}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boss Arena Section */}
      <div>
        <h3 className="font-orbitron font-bold text-synth-magenta text-base uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sword className="w-5 h-5" /> Boss Arena (Đề thi thử lớp 10 HCMC)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bosses.map(boss => (
            <div
              key={boss.id}
              onClick={() => handleLaunchZone('boss', boss.energy, boss.id)}
              className="glass-panel glass-panel-hover rounded-2xl border border-synth-magenta/20 hover:border-synth-magenta p-5 flex flex-col justify-between cursor-pointer relative bg-gradient-to-t from-synth-magenta/5 to-transparent min-h-[160px] transition-all duration-300"
            >
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded bg-synth-blue border border-synth-magenta/30 text-[10px] font-orbitron font-bold text-synth-magenta">
                <Zap className="w-3 h-3 text-synth-magenta fill-synth-magenta" /> {boss.energy}
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold font-orbitron px-2 py-0.5 rounded bg-synth-magenta/15 text-synth-magenta border border-synth-magenta/30 uppercase">
                  Độ Khó: Boss
                </span>
                <h4 className="font-orbitron font-bold text-base text-white">
                  {boss.name}
                </h4>
                <p className="text-xs text-synth-text-muted">
                  Đề thi chuẩn cấu trúc sở GD HCMC năm {boss.year}. Chỉ 1 mạng duy nhất!
                </p>
              </div>

              <div className="border-t border-synth-gray/50 pt-3 mt-3 flex justify-between items-center text-xs font-semibold">
                <span className="text-synth-text-muted">Vàng săn thưởng:</span>
                <span className="text-synth-green font-orbitron font-bold flex items-center gap-1">
                  +{boss.bounty} VNĐ
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
