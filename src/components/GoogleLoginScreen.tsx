import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { supabase } from '../utils/supabaseClient';
import type { UserProfile } from '../types/game';
import { Sparkles, LogIn, FlaskConical } from 'lucide-react';
import { toast } from '../utils/toast';

const DEV_AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#0b0c10"/><text x="20" y="27" font-size="18" text-anchor="middle">🐷</text></svg>'
);

const DEV_BACKDOOR_ROLES = [
  { role: 'student', label: 'Môn Sinh (Học sinh)', id: 'mock-dev-student', name: 'Dev Môn Sinh' },
  { role: 'pho_vien', label: 'Phó Viện (Phó hiệu trưởng)', id: 'mock-dev-pho-vien', name: 'Dev Phó Viện' },
  { role: 'truong_vien', label: 'Viện Chủ (Phụ huynh/Admin)', id: 'mock-dev-truong-vien', name: 'Dev Viện Chủ' },
] as const;

export const GoogleLoginScreen: React.FC = () => {
  const login = useGameState(state => state.login);

  // Chỉ hiển thị khi chạy `npm run dev` trên máy local — Vite loại bỏ hoàn toàn
  // nhánh này khỏi bundle production (import.meta.env.DEV là hằng số biên dịch).
  const handleDevBackdoorLogin = (entry: typeof DEV_BACKDOOR_ROLES[number]) => {
    const mockUser: UserProfile = {
      id: entry.id,
      name: entry.name,
      email: `${entry.id}@local.test`,
      avatar: DEV_AVATAR,
      role: entry.role,
    };
    login(mockUser);
  };

  const handleSupabaseGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Không set redirectTo thì Supabase rơi về "Site URL" cấu hình sẵn trên Dashboard —
          // nếu Site URL đó trỏ nhầm sang domain khác (vd project demo cũ), Google login xong
          // sẽ bay lạc sang domain đó thay vì quay lại đúng app đang chạy (localhost hay production).
          // Luôn trỏ về chính origin hiện tại để đúng cả dev lẫn mọi domain deploy.
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Lỗi đăng nhập Google Supabase:', error.message);
      toast.error('Không thể kết nối với Google Auth: ' + error.message);
    }
  };
  return (
    <div className="min-h-screen synth-grid-bg bg-synth-bg flex items-center justify-center p-4">
      <div className="glass-panel rounded-3xl border border-synth-cyan/20 p-8 max-w-md w-full text-center space-y-6 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative overflow-hidden">
        {/* Decorative corner grid light */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-synth-cyan/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-synth-magenta/10 rounded-full blur-2xl"></div>

        {/* Logo Icon */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-synth-purple to-synth-cyan border border-synth-cyan/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)] animate-float">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-orbitron font-black text-3xl text-white uppercase tracking-wider bg-gradient-to-r from-synth-cyan to-synth-magenta bg-clip-text text-transparent">
            MIKAWAII
          </h1>
          <p className="text-xs text-synth-cyan font-bold uppercase tracking-widest font-orbitron">
            Đấu trường học thuật
          </p>
        </div>

        <p className="text-xs text-synth-text-muted leading-relaxed">
          MIKAWAII là hệ sinh thái luyện thi cho Tiếng Anh, Toán và Ngữ văn,
          nơi con bước vào đấu trường, chinh phục hàng loạt thử thách, cày trong
          hang luyện công, mở mật thất luyện bí kíp và mài giũa hàng ngàn tuyệt
          chiêu từ ngân hàng câu hỏi. Đăng nhập để lưu tiến trình, ghi dấu
          thành tích và lên trình mỗi ngày.
        </p>

        {/* Active Google Button */}
        <div className="py-4 flex justify-center">
          <button
            onClick={handleSupabaseGoogleLogin}
            className="w-full py-3.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 shadow-[0_0_12px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Đăng nhập bằng tài khoản Google
          </button>
        </div>

        {import.meta.env.DEV && (
          <div className="space-y-2.5 text-left">
            <div className="flex items-center gap-2 text-[10px] text-synth-text-muted uppercase font-bold">
              <div className="flex-1 h-[1px] bg-synth-gray"></div>
              <span>Dev backdoor — chỉ local</span>
              <div className="flex-1 h-[1px] bg-synth-gray"></div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {DEV_BACKDOOR_ROLES.map(entry => (
                <button
                  key={entry.id}
                  onClick={() => handleDevBackdoorLogin(entry)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-synth-gray/10 hover:border-synth-cyan/40 hover:bg-synth-gray/25 cursor-pointer text-left text-xs font-semibold text-white transition-all duration-200"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-synth-cyan shrink-0" />
                  {entry.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
