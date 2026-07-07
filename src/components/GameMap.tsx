import { useGameState } from '../hooks/useGameState';
import {
  Compass, Sword, ShieldAlert, Star, Zap
} from 'lucide-react';
import { toast } from '../utils/toast';

interface GameMapProps {
  onStartPlay: (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'mixed' | 'revenge' | 'boss',
    bossId?: string
  ) => void;
  onOpenMysteryBox: () => void;
  onSpinWheel: () => void;
  onOpenHang: () => void;
}

export function GameMap({ onStartPlay, onOpenMysteryBox, onSpinWheel, onOpenHang }: GameMapProps) {
  const player = useGameState(state => state.player);
  const dailyMission = useGameState(state => state.dailyMission);
  const consumeEnergy = useGameState(state => state.useEnergy);
  const currentSubject = useGameState(state => state.currentSubject);
  const bossBountiesVnd = useGameState(state => state.gameSettings.bossBountiesVnd);
  const challengeEnergyCosts = useGameState(state => state.gameSettings.challengeEnergyCosts);
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = uiTheme === 'unicorn-dream';

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
      toast.error('Không đủ năng lượng! Hãy đợi năng lượng hồi phục hoặc hoàn thành các thử thách khác.');
      return;
    }
    consumeEnergy(energyCost);
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
  ] : currentSubject === 'literature' ? [
    {
      id: 'lit-reading-literary',
      title: 'Đảo Đọc Hiểu Văn Học',
      mode: 'reading' as const,
      description: 'Luyện đọc hiểu tác phẩm thơ, truyện, kí, tản văn. Phân tích chi tiết nghệ thuật và nhân vật.',
      energyCost: 10,
      rewardText: '+15 XP / +5 NP',
      colorClass: 'border-synth-orange/30 hover:border-synth-orange shadow-orange',
      textColor: 'text-synth-orange',
      bgGradient: 'from-synth-orange/5 to-transparent',
      icon: <Compass className="w-8 h-8 text-synth-orange" />
    },
    {
      id: 'lit-vietnamese',
      title: 'Đảo Tiếng Việt Thực Hành',
      mode: 'grammar' as const,
      description: 'Luyện các biện pháp tu từ, nghĩa tường minh/hàm ý, từ Hán Việt, câu đơn/câu ghép.',
      energyCost: 10,
      rewardText: '+15 XP / +5 NP',
      colorClass: 'border-synth-cyan/30 hover:border-synth-cyan shadow-cyan',
      textColor: 'text-synth-cyan',
      bgGradient: 'from-synth-cyan/5 to-transparent',
      icon: <Star className="w-8 h-8 text-synth-cyan" />
    },
    {
      id: 'lit-writing',
      title: 'Đảo Kỹ Năng Nghị Luận',
      mode: 'vocabulary' as const,
      description: 'Rèn luyện kiến thức làm văn nghị luận xã hội, nghị luận văn học và viết đoạn 200 chữ.',
      energyCost: 15,
      rewardText: '+20 XP / +8 NP',
      colorClass: 'border-synth-purple/30 hover:border-synth-purple shadow-purple',
      textColor: 'text-synth-purple',
      bgGradient: 'from-synth-purple/5 to-transparent',
      icon: <Compass className="w-8 h-8 text-synth-purple" />
    },
    {
      id: 'nightmare-dungeon',
      title: 'Hầm Ngục Sửa Sai',
      mode: 'revenge' as const,
      description: 'Vượt qua nỗi sợ! Tập hợp toàn bộ câu hỏi Ngữ văn con đã làm sai để giải lại.',
      energyCost: 10,
      rewardText: 'Xử lý lỗi sai cũ / Hồi phục năng lượng',
      colorClass: 'border-red-500/30 hover:border-red-500 shadow-red',
      textColor: 'text-red-500',
      bgGradient: 'from-red-500/5 to-transparent',
      icon: <ShieldAlert className="w-8 h-8 text-red-500" />
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
    { id: 'b-2024', name: 'Đại Ca Toán HCMC 2024', year: '2024', energy: 20 },
    { id: 'b-2025', name: 'Cự Long Toán HCMC 2025', year: '2025', energy: 20 },
    { id: 'b-2026', name: 'Cổ Long Toán HCMC 2026 (Mock)', year: '2026', energy: 25 }
  ] : currentSubject === 'literature' ? [
    { id: 'b-2024', name: 'Đại Ca Văn HCMC 2024', year: '2024', energy: 20 },
    { id: 'b-2025', name: 'Cự Long Văn HCMC 2025', year: '2025', energy: 20 },
    { id: 'b-2026', name: 'Cổ Long Văn HCMC 2026 (Mock)', year: '2026', energy: 25 }
  ] : [
    { id: 'b-2024', name: 'Đại Ca HCMC 2024', year: '2024', energy: 20 },
    { id: 'b-2025', name: 'Cự Long HCMC 2025', year: '2025', energy: 20 },
    { id: 'b-2026', name: 'Cổ Long HCMC 2026 (Mock)', year: '2026', energy: 25 }
  ];

  const resolvedMapZones = mapZones.map((zone, idx) => ({
    ...zone,
    energyCost: challengeEnergyCosts[idx] ?? zone.energyCost
  }));
  const questBannerClass = isUnicorn
    ? 'glass-panel rounded-2xl border border-violet-200/35 bg-gradient-to-r from-fuchsia-50/90 via-white/90 to-cyan-50/90 p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_10px_28px_rgba(192,132,252,0.12)]'
    : 'glass-panel rounded-2xl border border-synth-magenta/30 bg-gradient-to-r from-synth-magenta/10 via-synth-purple/10 to-transparent p-5 flex flex-col md:flex-row justify-between items-center gap-4';

  return (
    <div className="space-y-6">
      {/* Daily Quest & Rewards Banner */}
      <div className={questBannerClass}>
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isUnicorn ? 'bg-fuchsia-400' : 'bg-synth-magenta'}`} />
            <h2 className={`font-orbitron text-lg font-black uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
              Nhiệm Vụ Chiến Dịch Ngày
            </h2>
          </div>
          <p className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>
            {dailyMission?.completed 
              ? 'Tuyệt vời! Con đã hoàn thành tất cả nhiệm vụ hôm nay. Hãy nhận Hòm Bí Mật!' 
              : 'Hoàn thành chỉ tiêu học tập hôm nay để mở khóa Hòm Bí Mật và Ví Thưởng.'}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          {dailyMission?.completed ? (
            <button
              onClick={onOpenMysteryBox}
              className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 animate-bounce ${
                isUnicorn
                  ? 'bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 text-violet-900 shadow-[0_0_15px_rgba(192,132,252,0.35)]'
                  : 'bg-synth-magenta text-black hover:synth-glow-magenta shadow-[0_0_15px_#ff007f]'
              }`}
            >
              Mở Hòm Bí Mật 🎁
            </button>
          ) : (
            <button
              onClick={() => handleLaunchZone('mixed', 10)}
              className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                isUnicorn
                  ? 'bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 text-violet-900 shadow-[0_0_15px_rgba(125,211,252,0.28)]'
                  : 'bg-synth-cyan text-black hover:synth-glow-cyan shadow-[0_0_15px_#00f0ff]'
              }`}
            >
              Hành Trình Ngẫu Nhiên ⚡
            </button>
          )}

          {isWeekend() && (
            <button
              onClick={onSpinWheel}
              className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                isUnicorn
                  ? 'bg-gradient-to-r from-fuchsia-200 via-amber-100 to-cyan-200 text-violet-900 shadow-[0_0_15px_rgba(249,168,212,0.25)]'
                  : 'bg-synth-orange text-black hover:synth-glow-orange shadow-[0_0_15px_#ff9f1c]'
              }`}
            >
              Vòng Quay Cuối Tuần 🎡
            </button>
          )}
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-synth-cyan/30 bg-gradient-to-r from-synth-cyan/10 via-synth-purple/10 to-transparent p-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-synth-cyan animate-ping" />
            <h2 className="font-orbitron text-lg font-black text-white uppercase tracking-wider">
              Hang Luyện Công
            </h2>
          </div>
          <p className="text-xs text-synth-text-muted">
            Tổng ôn Toán, Văn, Anh bằng bản đồ kiến thức, thẻ nhớ, sổ tay lỗi sai và đường vào phòng luyện nhanh.
          </p>
        </div>

        <button
          onClick={onOpenHang}
          className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 shadow-[0_0_15px_#00f0ff]"
        >
          Vào Hang Luyện Công
        </button>
      </div>

      {/* Grid Map Zones */}
      <div>
        <h3 className={`font-orbitron font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-white'}`}>
          <Compass className={`w-5 h-5 ${isUnicorn ? 'text-fuchsia-500' : 'text-synth-cyan'}`} /> Bản Đồ Học Tập
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resolvedMapZones.map(zone => (
            <div
              key={zone.id}
              onClick={() => handleLaunchZone(zone.mode, zone.energyCost)}
              className={`glass-panel glass-panel-hover rounded-2xl border p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 ${
                isUnicorn
                  ? 'border-violet-200/35 bg-gradient-to-br from-white/90 via-fuchsia-50/70 to-cyan-50/70 shadow-[0_14px_30px_rgba(192,132,252,0.1)]'
                  : `${zone.colorClass} bg-gradient-to-br ${zone.bgGradient}`
              }`}
            >
              {/* Energy Cost Overlay */}
              <div className={`absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold ${
                isUnicorn ? 'bg-white/80 border border-violet-200/40 text-violet-700' : 'bg-synth-blue border border-synth-cyan/20 text-white'
              }`}>
                <Zap className={`w-3 h-3 ${isUnicorn ? 'text-fuchsia-500 fill-fuchsia-500' : 'text-synth-cyan fill-synth-cyan'}`} /> {zone.energyCost}
              </div>

              {/* Graphic Icon */}
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${
                isUnicorn ? 'bg-white/75 border-violet-200/30 shadow-[0_0_12px_rgba(192,132,252,0.12)]' : 'bg-synth-gray/50 border border-white/5'
              }`}>
                {zone.icon}
              </div>

              {/* Details */}
              <div className="space-y-1 min-w-0">
                <h4 className={`font-orbitron font-bold text-base ${isUnicorn ? 'text-violet-700' : zone.textColor}`}>
                  {zone.title}
                </h4>
                <p className={`text-xs leading-relaxed ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>
                  {zone.description}
                </p>
                <div className={`text-[10px] font-bold font-orbitron pt-2 ${isUnicorn ? 'text-violet-600/80' : 'text-synth-text-muted'}`}>
                  Phần thưởng: <span className={isUnicorn ? 'text-violet-800' : 'text-white'}>{zone.rewardText}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boss Arena Section */}
      <div>
        <h3 className={`font-orbitron font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-synth-magenta'}`}>
          <Sword className={`w-5 h-5 ${isUnicorn ? 'text-fuchsia-500' : ''}`} /> Boss Arena (Đề thi thử lớp 10 HCMC)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bosses.map((boss, index) => (
            <div
              key={boss.id}
              onClick={() => handleLaunchZone('boss', boss.energy, boss.id)}
              className={`glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between cursor-pointer relative min-h-[160px] transition-all duration-300 ${
                isUnicorn
                  ? 'border-violet-200/35 hover:border-violet-300 bg-gradient-to-t from-white/80 to-fuchsia-50/60 shadow-[0_14px_30px_rgba(192,132,252,0.1)]'
                  : 'border-synth-magenta/20 hover:border-synth-magenta bg-gradient-to-t from-synth-magenta/5 to-transparent'
              }`}
            >
              <div className={`absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold ${
                isUnicorn ? 'bg-white/80 border border-violet-200/40 text-violet-700' : 'bg-synth-blue border border-synth-magenta/30 text-synth-magenta'
              }`}>
                <Zap className={`w-3 h-3 ${isUnicorn ? 'text-fuchsia-500 fill-fuchsia-500' : 'text-synth-magenta fill-synth-magenta'}`} /> {boss.energy}
              </div>

              <div className="space-y-2">
                <span className={`text-[10px] font-bold font-orbitron px-2 py-0.5 rounded uppercase ${
                  isUnicorn ? 'bg-fuchsia-100/80 text-violet-700 border border-violet-200/40' : 'bg-synth-magenta/15 text-synth-magenta border border-synth-magenta/30'
                }`}>
                  Độ Khó: Boss
                </span>
                <h4 className={`font-orbitron font-bold text-base ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                  {boss.name}
                </h4>
                <p className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>
                  Đề thi chuẩn cấu trúc sở GD HCMC năm {boss.year}. Chỉ 1 mạng duy nhất!
                </p>
              </div>

              <div className="border-t border-synth-gray/50 pt-3 mt-3 flex justify-between items-center text-xs font-semibold">
                <span className={isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}>Vàng săn thưởng:</span>
                <span className={`font-orbitron font-bold flex items-center gap-1 ${isUnicorn ? 'text-violet-700' : 'text-synth-green'}`}>
                  +{(bossBountiesVnd[index] ?? [10000, 15000, 20000][index]).toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



