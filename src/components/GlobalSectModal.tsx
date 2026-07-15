import React from 'react';
import { X, Check } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';
import { GRADE_SUBJECTS, SUBJECTS_CONFIG, GRADE_TIERS, getGradeTierConfig } from '../types/game';
import { useSect } from '../contexts/SectContext';
import { isLightTheme } from '../theme/uiThemes';
import type { SubjectId, GradeTier } from '../types/game';

interface GlobalSectModalProps {
  /** Đang giữa hoạt động (làm bài / đọc bài giảng) — cần xác nhận trước khi đổi môn */
  requireConfirm?: boolean;
}

export const GlobalSectModal: React.FC<GlobalSectModalProps> = ({ requireConfirm = false }) => {
  const isSectModalOpen = useGameState(state => state.isSectModalOpen);
  const setSectModalOpen = useGameState(state => state.setSectModalOpen);
  const { activeSectId, activeGradeTier, setLearningContext } = useSect();
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);

  // Lưu trữ cấp lớp tạm thời khi người dùng click duyệt qua các lớp trong modal
  const [tempGradeTier, setTempGradeTier] = React.useState<GradeTier>(activeGradeTier);

  React.useEffect(() => {
    if (isSectModalOpen) {
      setTempGradeTier(activeGradeTier);
    }
  }, [isSectModalOpen, activeGradeTier]);

  if (!isSectModalOpen) return null;

  const allowedSubjects = GRADE_SUBJECTS[tempGradeTier] || [];
  const subjects = Object.values(SUBJECTS_CONFIG).filter(subject => 
    allowedSubjects.includes(subject.id)
  );

  // Phân nhóm môn học
  const isCS = tempGradeTier === 13;
  const chuyenSau = subjects.filter(s => s.group === 'chuyen_sau');
  const coBan = subjects.filter(s => s.group === 'co_ban');

  const handleSelect = (id: SubjectId) => {
    if ((id !== activeSectId || tempGradeTier !== activeGradeTier) && requireConfirm) {
      const subjectName = SUBJECTS_CONFIG[id]?.name || id;
      const gradeName = getGradeTierConfig(tempGradeTier).name;
      const ok = window.confirm(
        `Chuyển sang môn ${subjectName} - ${gradeName}?\n\nBài đang làm / bài giảng đang mở sẽ đóng lại và nội dung nạp lại theo ngữ cảnh mới.`
      );
      if (!ok) return;
    }
    // Cập nhật nguyên tử cả lớp và môn học toàn cục
    setLearningContext({ gradeTier: tempGradeTier, subjectId: id });
    setSectModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className={`w-full max-w-2xl rounded-3xl border p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col gap-6 animate-fade-in ${
         isUnicorn 
          ? 'bg-gradient-to-br from-fuchsia-50 via-white to-cyan-50 border-violet-200 text-violet-900'
          : 'bg-synth-bg border-synth-cyan/20 text-white'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div className="space-y-1">
            <h2 className="font-orbitron font-black text-lg uppercase tracking-wider bg-gradient-to-r from-synth-cyan to-synth-magenta bg-clip-text text-transparent">
              Thiết Lập Ngữ Cảnh Học Tập
            </h2>
            <p className={`text-[10px] uppercase font-bold tracking-widest font-orbitron ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>
              Lựa chọn Cấp lớp & Môn tu học phù hợp để đồng bộ hệ thống
            </p>
          </div>
          <button 
            onClick={() => setSectModalOpen(false)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isUnicorn 
                ? 'border-violet-200/50 hover:bg-violet-100 text-violet-700'
                : 'border-white/10 hover:bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cấp 1: Chọn Cấp Lớp (Grade Tiers Switcher) */}
        <div className="space-y-3">
          <h3 className="text-xs font-black font-orbitron uppercase tracking-widest text-synth-cyan flex items-center gap-1.5">
            🏫 Bước 1: Chọn Cấp Lớp
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {GRADE_TIERS.map(item => {
              const tier = item.tier;
              const label = item.name;
              const isSelected = tempGradeTier === tier;
              const isCurrentActive = activeGradeTier === tier;
              
              return (
                <button
                  key={tier}
                  onClick={() => setTempGradeTier(tier)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-orbitron font-bold uppercase transition-all duration-300 cursor-pointer text-center relative ${
                    isSelected
                      ? 'border-synth-cyan bg-synth-cyan/15 text-white shadow-[0_0_10px_rgba(0,240,255,0.2)] ring-1 ring-synth-cyan'
                      : 'border-white/5 bg-black/25 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {label}
                  {isCurrentActive && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-synth-cyan rounded-full border border-black animate-pulse" title="Đang tu học lớp này" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cấp 2: Chọn Môn Học (Subjects Switcher) */}
        <div className="space-y-4 border-t border-white/5 pt-4">
          <h3 className="text-xs font-black font-orbitron uppercase tracking-widest text-synth-magenta flex items-center gap-1.5">
            ⚔️ Bước 2: Chọn Môn Tu Học
          </h3>

          {isCS ? (
            /* Lớp 13: Đại học CS */
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-yellow-400">
                🎓 Học Phần Chuyên Ngành Computer Science
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {subjects.map(s => {
                  const active = s.id === activeSectId && activeGradeTier === tempGradeTier;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelect(s.id)}
                      style={{ borderColor: active ? s.color : 'rgba(255,255,255,0.1)' }}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                        active
                          ? 'bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.1)]' 
                          : 'bg-black/20 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <span className="text-xl shrink-0">{s.icon}</span>
                        <span className="font-orbitron font-bold text-xs uppercase text-white truncate">{s.name}</span>
                      </div>
                      {active && <Check className="w-4 h-4 shrink-0 text-synth-cyan" style={{ color: s.color }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Phổ thông: Lớp 6 - 12 */
            <div className="space-y-6">
              {chuyenSau.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-synth-orange">
                    🔥 Môn Học Chuyên Sâu
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {chuyenSau.map(s => {
                      const active = s.id === activeSectId && activeGradeTier === tempGradeTier;
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleSelect(s.id)}
                          style={{ borderColor: active ? s.color : 'rgba(255,255,255,0.1)' }}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                            active
                              ? 'bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.1)]' 
                              : 'bg-black/20 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <span className="text-xl shrink-0">{s.icon}</span>
                            <span className="font-orbitron font-bold text-xs uppercase text-white truncate">{s.name}</span>
                          </div>
                          {active && <Check className="w-4 h-4 shrink-0 text-synth-cyan" style={{ color: s.color }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {coBan.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-synth-cyan">
                    ❄️ Môn Học Cơ Bản
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {coBan.map(s => {
                      const active = s.id === activeSectId && activeGradeTier === tempGradeTier;
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleSelect(s.id)}
                          style={{ borderColor: active ? s.color : 'rgba(255,255,255,0.1)' }}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                            active
                              ? 'bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.1)]' 
                              : 'bg-black/20 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <span className="text-xl shrink-0">{s.icon}</span>
                            <span className="font-orbitron font-bold text-xs uppercase text-white truncate">{s.name}</span>
                          </div>
                          {active && <Check className="w-4 h-4 shrink-0 text-synth-cyan" style={{ color: s.color }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
