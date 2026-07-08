import React, { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { Activity } from 'lucide-react';
import type { HistoryLog } from '../types/game';
import { toast } from '../utils/toast';

export const PetSanctuary: React.FC = () => {
  const pet = useGameState(state => state.pet);
  const feedPet = useGameState(state => state.feedPet);
  const showHelp = useGameState(state => state.showHelp);
  const uiTheme = useGameState(state => state.uiTheme);
  const logs = useGameState(state => state.logs || []);

  const [interacting, setInteracting] = useState(false);
  const [tickled, setTickled] = useState(false);
  const [speech, setSpeech] = useState('Ủn ỉn... chào thiếu hiệp! Hôm nay ta cùng tinh tấn học tập nhé! 🌸');

  const isUnicorn = uiTheme === 'unicorn-dream';

  const handleFeed = () => {
    const success = feedPet();
    if (!success) {
      toast.error('Không đủ 50 NP để cho Pet ăn. Kiếm thêm Ngân Lượng ở Hang Luyện Công nhé!');
      return;
    }
    setInteracting(true);
    setSpeech('Chao ôi... ngon quá! Ngon múp míp luôn á! Cảm ơn thiếu hiệp! 🍖🐷 (-50 NP, -30 XP)');
    setTimeout(() => {
      setInteracting(false);
    }, 2000);
  };

  // Get dynamic study reminder or performance praise
  const getDynamicSpeech = () => {
    const todayStr = new Date().toDateString();
    
    // Calculate correct answers today from activity logs
    const todayCorrect = logs.filter((act: HistoryLog) => 
      new Date(act.timestamp).toDateString() === todayStr &&
      act.activityType === 'exercise' &&
      act.title === 'Câu trả lời ĐÚNG'
    ).length;

    // Calculate coins gained today
    const todayCoins = logs.reduce((sum: number, act: HistoryLog) => {
      if (new Date(act.timestamp).toDateString() === todayStr && act.coinsChanged > 0) {
        return sum + act.coinsChanged;
      }
      return sum;
    }, 0);

    const speechOptions = [
      // Study Reminders
      "Hôm nay thiếu hiệp đã ôn luyện chuyên đề nào ở Hang Luyện Công chưa? Ôn ngay kẻo lười nhé! 📐",
      "Chân khí của thiếu hiệp đang dồi dào, mau vào Hang luyện vài chiêu thức thôi nào! ⚔️",
      "Nhớ duy trì Streak học tập đều đặn nhé! Đứt chuỗi Heo Maikawaii sẽ buồn ngủ lắm đó! 😴",
      "Mỗi ngày một chút tinh tấn, võ học của nàng sẽ đạt cảnh giới Xuất Chúng! 🏆",
      "Đấu trường đang rộn rã trống trận, ta vào tỷ thí một trận xem tài trí ra sao đi! 🏟️",
      "Năng lượng học tập dồi dào sẽ giúp ta tiến hóa múp míp và xinh đẹp hơn nữa! 🍄"
    ];

    // Add praises if student has accomplished tasks today
    if (todayCorrect > 0) {
      speechOptions.push(`Oa! Hôm nay thiếu hiệp đã trả lời đúng ${todayCorrect} câu hỏi rồi! Giỏi quá đi! Ta tặng một nụ hôn heo! 💋`);
      speechOptions.push("Ta thấy hôm nay nàng làm bài xuất sắc cực kỳ, đúng là tài trí phi phàm! 🌟");
    } else {
      speechOptions.push("Hôm nay nàng chưa làm đúng câu nào sao? Vào Hang Luyện Công cày chút Ngân Lượng thôi!");
      speechOptions.push("Ủn ỉn... Heo đói kiến thức rồi, nàng làm vài câu đúng cho heo xem đi! 📖");
    }

    if (todayCoins > 0) {
      speechOptions.push(`Ta thấy hôm nay nàng thu hoạch được tận ${todayCoins} Ngân Lượng, đúng là phú hộ võ lâm tương lai! 💰`);
    }

    return speechOptions[Math.floor(Math.random() * speechOptions.length)];
  };

  const handleTickle = () => {
    if (pet.stage === 'egg') {
      setInteracting(true);
      const eggQuotes = [
        "Mầm nấm Heo Maikawaii đang hấp thụ chân khí để nứt vỏ... 🍄",
        "Có tiếng động nhè nhẹ từ trong mầm nấm xinh đẹp! 🥚",
        "Đám mây bông đang tạo mưa lá khô để nấm mau lớn... ☁️",
        "Ủn ỉn... hình như ta sắp chui ra rồi đấy! 🐽"
      ];
      setSpeech(eggQuotes[Math.floor(Math.random() * eggQuotes.length)]);
      setTimeout(() => setInteracting(false), 2000);
      return;
    }

    setTickled(true);
    setInteracting(true);

    const tickleQuotes = [
      "Ủn ỉn... nhột quá đi! Hahaha! Đừng thọt lét Heo Maikawaii mà! 🐷",
      "Éc éc! Nột nột nột... Ta bị nhột tai trái rồi! 😂",
      "Maikawaii maikawaii... éc! Ta chỉ là một chú heo múp míp đang cười thôi!",
      "Ủn ỉn... thọc lét nhiều sẽ mau lớn đấy, nhưng mà nhột lắm! 🐽",
      "Éc! Cá mây đang bay, heo đang nhột... Đừng thọc nữa nhột quá! 🥰",
      "Gừ gừ... nhột quá đi thôi! Ta sẽ biến thành heo quay nếu nhột quá đó! 🍖"
    ];

    setSpeech(tickleQuotes[Math.floor(Math.random() * tickleQuotes.length)]);

    setTimeout(() => {
      setTickled(false);
      setInteracting(false);
    }, 2000);
  };

  useEffect(() => {
    // Periodically update speech bubble with reminders/praises (every 20 seconds)
    const interval = setInterval(() => {
      if (!interacting && !tickled) {
        setSpeech(getDynamicSpeech());
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [logs, interacting, tickled]);

  // Get evolutionary stage display names
  const getStageTitle = (stage: string) => {
    switch (stage) {
      case 'egg': return 'Đám Mây & Nấm Sơ Sinh 🍄';
      case 'baby': return 'Heo Con Mũm Mĩm 🐷';
      case 'dragon': return 'Heo Hiệp Sĩ Trưởng Thành ⚔️';
      case 'legend': return 'Thần Heo Maikawaii 👑';
      default: return 'Heo Maikawaii';
    }
  };

  // SVG graphic for different Heo Maikawaii stages
  const renderPetAvatar = () => {
    const isHappy = pet.mood === 'happy' || interacting;
    const isSad = pet.mood === 'sad';

    const glowClass = pet.stage === 'legend' 
      ? 'shadow-[0_0_30px_#f59e0b]' 
      : pet.stage === 'dragon' 
        ? 'shadow-[0_0_20px_#ef4444]' 
        : 'shadow-[0_0_10px_rgba(255,0,127,0.2)]';

    if (pet.stage === 'egg') {
      return (
        <div 
          onClick={handleTickle}
          className={`relative w-40 h-44 mx-auto flex flex-col justify-center items-center cursor-pointer transition-transform duration-200 rounded-3xl ${glowClass} ${
            interacting ? 'scale-105' : 'hover:scale-[1.02]'
          }`}
          title="Bấm để truyền chân khí cho mầm nấm!"
        >
          <svg width="180" height="180" viewBox="0 0 200 200" className="w-full h-full">
            {/* Cotton Cloud */}
            <g className="animate-float" style={{ animationDuration: '4s' }}>
              <path d="M 60,40 C 50,40 45,30 55,25 C 50,15 65,10 75,17 C 85,5 115,5 125,17 C 135,10 150,15 145,25 C 155,30 150,40 140,40 Z" fill="#fdf2f8" stroke="#ec4899" strokeWidth="1.5" opacity="0.9" />
              {/* Raindrops */}
              <line x1="70" y1="45" x2="68" y2="60" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="100" y1="48" x2="98" y2="63" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="130" y1="45" x2="128" y2="60" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="3 3" />
            </g>
            
            {/* Soil / Grass Bed */}
            <ellipse cx="100" cy="155" rx="65" ry="15" fill="#7c2d12" stroke="#451a03" strokeWidth="2" />
            <ellipse cx="100" cy="152" rx="55" ry="10" fill="#a16207" opacity="0.6" />
            
            {/* Dry Leaves */}
            <path d="M 50,152 Q 42,148 45,155 Q 52,156 50,152" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            <path d="M 148,153 Q 155,149 152,156 Q 144,158 148,153" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            <path d="M 132,155 Q 128,150 122,154 Q 128,158 132,155" fill="#b45309" stroke="#451a03" strokeWidth="1" />

            {/* Pulsing Chubby Mushroom */}
            <g className="animate-pulse" style={{ animationDuration: '2s' }}>
              {/* Stem */}
              <rect x="92" y="112" width="16" height="34" rx="8" fill="#fff1f2" stroke="#db2777" strokeWidth="2" />
              {/* Cap */}
              <path d="M 65,116 C 65,86 135,86 135,116 Z" fill="#ec4899" stroke="#db2777" strokeWidth="2.5" />
              {/* White dots */}
              <circle cx="80" cy="102" r="4.5" fill="#ffffff" />
              <circle cx="100" cy="95" r="5" fill="#ffffff" />
              <circle cx="120" cy="104" r="4" fill="#ffffff" />
              <circle cx="100" cy="108" r="3" fill="#ffffff" />
            </g>
          </svg>
        </div>
      );
    }

    if (pet.stage === 'baby') {
      return (
        <div 
          onClick={handleTickle}
          className={`relative w-44 h-44 mx-auto flex items-center justify-center cursor-pointer rounded-full transition-all duration-200 ${glowClass} ${
            interacting ? 'scale-105' : 'hover:scale-[1.02]'
          } ${tickled ? 'animate-wiggle' : 'animate-float'}`}
          title="Bấm để thọt lét Heo Maikawaii!"
        >
          <svg width="180" height="180" viewBox="0 0 200 200" className="w-full h-full">
            {/* Cracked mushroom shell at bottom */}
            <path d="M 65,150 L 70,140 L 80,145 L 90,135 L 100,145 L 110,138 L 120,146 L 130,138 L 135,150 Z" fill="#ec4899" stroke="#db2777" strokeWidth="2" opacity="0.7" />
            
            {/* Chubby Pig Avatar */}
            {/* Ears */}
            <path d="M 62,82 Q 38,82 46,104 Q 58,104 64,88" fill="#fbcfe8" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 138,82 Q 162,82 154,104 Q 142,104 136,88" fill="#fbcfe8" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />

            {/* Chubby Face */}
            <ellipse cx="100" cy="105" rx="46" ry="38" fill="#fce7f3" stroke="#b45309" strokeWidth="2.5" />

            {/* Hair Tuft */}
            <path d="M 96,66 Q 100,54 100,66 M 100,66 Q 104,52 106,64 M 100,66 Q 92,57 94,66" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Blushing Cheeks */}
            <circle cx="69" cy="115" r="9" fill="#f472b6" opacity="0.65" />
            <circle cx="131" cy="115" r="9" fill="#f472b6" opacity="0.65" />

            {/* Eyes */}
            {isHappy ? (
              <g>
                <path d="M 74,103 Q 80,98 86,103" stroke="#4c1d95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 114,103 Q 120,98 126,103" stroke="#4c1d95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            ) : isSad ? (
              <g>
                <path d="M 74,105 Q 80,110 86,105" stroke="#4c1d95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 114,105 Q 120,110 126,105" stroke="#4c1d95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                <ellipse cx="80" cy="103" rx="4.5" ry="6" fill="#4c1d95" />
                <ellipse cx="120" cy="103" rx="4.5" ry="6" fill="#4c1d95" />
              </g>
            )}
            
            {/* Eyebrows */}
            <path d="M 75,93 Q 80,90 85,93" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 115,93 Q 120,90 125,93" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Snout/Nose */}
            <ellipse cx="100" cy="113" rx="16" ry="11" fill="#f472b6" stroke="#b45309" strokeWidth="2.5" />
            {/* Nostrils */}
            <circle cx="95" cy="113" r="2.5" fill="#4c1d95" />
            <circle cx="105" cy="113" r="2.5" fill="#4c1d95" />

            {/* Smile / Mouth */}
            {isSad ? (
              <path d="M 96,131 Q 100,127 104,131" stroke="#b45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M 96,128 Q 100,132 104,128" stroke="#b45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}
          </svg>
        </div>
      );
    }

    if (pet.stage === 'dragon') {
      return (
        <div 
          onClick={handleTickle}
          className={`relative w-44 h-44 mx-auto flex items-center justify-center cursor-pointer rounded-full transition-all duration-200 ${glowClass} ${
            interacting ? 'scale-105' : 'hover:scale-[1.02]'
          } ${tickled ? 'animate-wiggle' : 'animate-float'}`}
          title="Bấm để thọt lét Heo Hiệp Sĩ!"
        >
          <svg width="180" height="180" viewBox="0 0 200 200" className="w-full h-full">
            {/* Wooden Sword on back */}
            <g transform="rotate(25, 140, 90)">
              {/* Blade */}
              <rect x="135" y="60" width="10" height="45" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="2" />
              {/* Guard */}
              <rect x="128" y="105" width="24" height="6" rx="1" fill="#b45309" stroke="#78350f" strokeWidth="2" />
              {/* Hilt */}
              <rect x="137" y="111" width="6" height="16" rx="1" fill="#78350f" />
            </g>

            {/* Ears */}
            <path d="M 62,82 Q 38,82 46,104 Q 58,104 64,88" fill="#fbcfe8" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 138,82 Q 162,82 154,104 Q 142,104 136,88" fill="#fbcfe8" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />

            {/* Chubby Face */}
            <ellipse cx="100" cy="105" rx="46" ry="38" fill="#fce7f3" stroke="#b45309" strokeWidth="2.5" />

            {/* Wuxia Bandana / Băng Trán Võ Hiệp */}
            <path d="M 58,84 Q 100,78 142,84 L 140,94 Q 100,88 60,94 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
            {/* Bandana tail on left */}
            <path d="M 58,86 Q 42,90 48,104 Q 52,98 56,92" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />

            {/* Blushing Cheeks */}
            <circle cx="69" cy="115" r="9" fill="#f472b6" opacity="0.65" />
            <circle cx="131" cy="115" r="9" fill="#f472b6" opacity="0.65" />

            {/* Eyes */}
            {isHappy ? (
              <g>
                <path d="M 74,103 Q 80,98 86,103" stroke="#4c1d95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 114,103 Q 120,98 126,103" stroke="#4c1d95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            ) : isSad ? (
              <g>
                <path d="M 74,105 Q 80,110 86,105" stroke="#4c1d95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 114,105 Q 120,110 126,105" stroke="#4c1d95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                <ellipse cx="80" cy="103" rx="4.5" ry="6" fill="#4c1d95" />
                <ellipse cx="120" cy="103" rx="4.5" ry="6" fill="#4c1d95" />
              </g>
            )}
            
            {/* Eyebrows */}
            <path d="M 75,93 Q 80,90 85,93" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 115,93 Q 120,90 125,93" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Snout/Nose */}
            <ellipse cx="100" cy="113" rx="16" ry="11" fill="#f472b6" stroke="#b45309" strokeWidth="2.5" />
            <circle cx="95" cy="113" r="2.5" fill="#4c1d95" />
            <circle cx="105" cy="113" r="2.5" fill="#4c1d95" />

            {/* Smile */}
            {isSad ? (
              <path d="M 96,131 Q 100,127 104,131" stroke="#b45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M 96,128 Q 100,132 104,128" stroke="#b45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}
          </svg>
        </div>
      );
    }

    // Default: Legend stage (Thần Heo Maikawaii)
    return (
      <div 
        onClick={handleTickle}
        className={`relative w-48 h-48 mx-auto flex items-center justify-center cursor-pointer rounded-full transition-all duration-200 ${glowClass} ${
          interacting ? 'scale-105' : 'hover:scale-[1.02]'
        } ${tickled ? 'animate-wiggle' : 'animate-float'}`}
        title="Bấm để thọt lét Thần Heo Maikawaii!"
      >
        <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
          {/* Glowing Aura under pig */}
          <ellipse cx="100" cy="155" rx="55" ry="12" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: '10s' }} />

          {/* Floating Cân Đẩu Vân cloud */}
          <path d="M 60,150 C 50,150 45,140 55,135 C 50,125 65,120 75,127 C 85,115 115,115 125,127 C 135,120 150,125 145,135 C 155,140 150,150 140,150 Z" fill="#fef08a" stroke="#d97706" strokeWidth="2" className="opacity-95" />

          {/* Golden Crown / Vòng Kim Cô floating above head */}
          <g className="animate-pulse" style={{ animationDuration: '1.5s' }}>
            <ellipse cx="100" cy="50" rx="18" ry="5" fill="none" stroke="#fbbf24" strokeWidth="3" />
            <circle cx="100" cy="45" r="2.5" fill="#ef4444" />
          </g>

          {/* Ears */}
          <path d="M 62,82 Q 38,82 46,104 Q 58,104 64,88" fill="#fbcfe8" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 138,82 Q 162,82 154,104 Q 142,104 136,88" fill="#fbcfe8" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />

          {/* Chubby Face */}
          <ellipse cx="100" cy="105" rx="46" ry="38" fill="#fce7f3" stroke="#b45309" strokeWidth="2.5" />

          {/* Blushing Cheeks */}
          <circle cx="69" cy="115" r="9" fill="#f472b6" opacity="0.65" />
          <circle cx="131" cy="115" r="9" fill="#f472b6" opacity="0.65" />

          {/* Eyes (God level: happy crescent eyes!) */}
          {isSad ? (
            <g>
              <path d="M 74,105 Q 80,110 86,105" stroke="#4c1d95" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 114,105 Q 120,110 126,105" stroke="#4c1d95" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              <path d="M 74,103 Q 80,97 86,103" stroke="#4c1d95" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 114,103 Q 120,97 126,103" stroke="#4c1d95" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}
          
          {/* Eyebrows */}
          <path d="M 75,93 Q 80,90 85,93" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 115,93 Q 120,90 125,93" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Snout/Nose */}
          <ellipse cx="100" cy="113" rx="16" ry="11" fill="#f472b6" stroke="#b45309" strokeWidth="2.5" />
          <circle cx="95" cy="113" r="2.5" fill="#4c1d95" />
          <circle cx="105" cy="113" r="2.5" fill="#4c1d95" />

          {/* Smile */}
          {isSad ? (
            <path d="M 94,131 Q 100,125 106,131" stroke="#b45309" strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M 94,128 Q 100,134 106,128" stroke="#b45309" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
        </svg>
      </div>
    );
  };

  const getMoodEmoji = (mood: string) => {
    if (interacting) return '🥰 Cực thích';
    switch (mood) {
      case 'happy': return '😊 Hạnh phúc';
      case 'sad': return '😢 Hụt hẫng';
      case 'sleeping': return '😴 Đang ngủ';
      default: return '😐 Bình thường';
    }
  };

  return (
    <div className={`glass-panel rounded-2xl border p-5 flex flex-col h-full ${
      isUnicorn ? 'border-violet-200/35 bg-gradient-to-b from-white/90 via-fuchsia-50/80 to-cyan-50/70' : 'border-synth-cyan/15'
    }`}>
      {/* CSS Styles for floating/wiggling animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-6deg) scale(1.06); }
          75% { transform: rotate(6deg) scale(1.06); }
        }
        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 0.35s ease-in-out infinite;
        }
      `}} />

      <div className={`flex items-center justify-between mb-4 pb-3 ${isUnicorn ? 'border-b border-violet-200/35' : 'border-b border-synth-gray'}`}>
        <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-1.5 ${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'}`}>
          <Activity className="w-4 h-4" /> {isUnicorn ? 'Linh Thú Các' : 'Sân Nuôi Thú'}
          <button
            onClick={() => showHelp('dragon')}
            className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center cursor-pointer transition-colors ${
              isUnicorn
                ? 'bg-fuchsia-200/50 border border-violet-200/60 text-violet-700 hover:bg-fuchsia-200/80'
                : 'bg-synth-cyan/20 border border-synth-cyan/40 text-synth-cyan hover:bg-synth-cyan/40'
            }`}
            title="Xem hướng dẫn thú nuôi"
          >
            ?
          </button>
        </h3>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded font-orbitron ${
          isUnicorn
            ? 'bg-fuchsia-100/80 text-fuchsia-700 border border-violet-200/40'
            : 'bg-synth-magenta/15 text-synth-magenta border border-synth-magenta/30'
        }`}>
          CẤP.{pet.level}
        </span>
      </div>

      {/* Speech Bubble */}
      <div className="relative mb-2 mt-1 z-10">
        <div className={`glass-panel border rounded-xl p-3 text-xs leading-relaxed relative ${
          isUnicorn 
            ? 'border-violet-200/40 bg-white/95 text-violet-800 shadow-[0_4px_12px_rgba(192,132,252,0.15)]' 
            : 'border-synth-magenta/30 bg-synth-gray/90 text-white shadow-[0_4px_12px_rgba(255,0,127,0.15)]'
        }`}>
          <div className="font-serif italic font-semibold text-center">{speech}</div>
          {/* Arrow */}
          <div className={`absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b ${
            isUnicorn ? 'bg-white border-violet-200/40' : 'bg-synth-gray/90 border-synth-magenta/30'
          }`} />
        </div>
      </div>

      {/* Pet graphic */}
      <div className="flex-1 flex flex-col justify-center py-4 relative">
        {renderPetAvatar()}
        
        <div className="text-center mt-4">
          <h4 className={`font-orbitron font-bold text-base mb-1 ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
            {pet.name}
          </h4>
          <p className={`text-[10px] mb-2 font-semibold uppercase tracking-wider ${isUnicorn ? 'text-violet-600/80' : 'text-synth-text-muted'}`}>
            {getStageTitle(pet.stage)}
          </p>
        </div>
      </div>

      {/* Pet Stats & Actions */}
      <div className="space-y-4 border-t border-synth-gray pt-4">
        {/* EXP Bar */}
        <div>
          <div className="flex justify-between text-[11px] font-semibold mb-1">
            <span className={isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}>Độ Mũm Mĩm (Độ Trưởng Thành)</span>
            <span className={`${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'} font-orbitron`}>{pet.exp}/{pet.level * 150}</span>
          </div>
          <div className="w-full h-1.5 bg-synth-gray rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${isUnicorn ? 'unicorn-rainbow-strip shadow-[0_0_8px_rgba(192,132,252,0.25)]' : 'bg-synth-cyan shadow-[0_0_8px_#00f0ff]'}`}
              style={{ width: `${Math.min(100, (pet.exp / (pet.level * 150)) * 100)}%` }}
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold">
          <div className={`rounded-lg p-2 flex flex-col border ${isUnicorn ? 'bg-white/70 border-violet-200/30' : 'bg-synth-gray/40 border border-white/5'}`}>
            <span className={`text-[9px] uppercase ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>Trạng Thái</span>
            <span className="text-white mt-0.5">{getMoodEmoji(pet.mood)}</span>
          </div>
          <div className={`rounded-lg p-2 flex flex-col border ${isUnicorn ? 'bg-white/70 border-violet-200/30' : 'bg-synth-gray/40 border border-white/5'}`}>
            <span className={`text-[9px] uppercase ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>Chân Khí Pet</span>
            <span className="text-white mt-0.5">{pet.energy}/100</span>
          </div>
        </div>

        {/* Interact Actions */}
        <button
          onClick={handleFeed}
          disabled={interacting}
          className={`w-full py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-50 ${
            isUnicorn
              ? 'bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 text-violet-900 shadow-[0_0_14px_rgba(192,132,252,0.25)] hover:brightness-105'
              : 'bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-border-cyan shadow-[0_0_12px_rgba(0,240,255,0.2)]'
          }`}
        >
          {interacting ? 'Đang Cho Ăn Heo... 🍖' : `Cho ${pet.name} Ăn 🍖 (-50 NP, -30 XP)`}
        </button>
      </div>
    </div>
  );
};
