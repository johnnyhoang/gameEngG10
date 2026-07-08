import React from 'react';
import { supabase } from '../utils/supabaseClient';
import { Sparkles, LogIn, FlaskConical } from 'lucide-react';
import { toast } from '../utils/toast';
import { useGameState } from '../hooks/useGameState';

export const GoogleLoginScreen: React.FC = () => {
  const login = useGameState(state => state.login);

  const handleSupabaseGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Lỗi đăng nhập Google Supabase:', error.message);
      toast.error('Không thể kết nối với Google Auth: ' + error.message);
    }
  };

  // ⚠️ DEV-ONLY BACKDOOR — TODO: xóa toàn bộ khối này trước khi phát hành thật (nguy cơ bảo mật).
  // Bỏ qua Supabase/PIN hoàn toàn để AI/QA test UI & tính năng nhanh. `import.meta.env.DEV` là false
  // trong bản build production (`npm run build`) nên khối này tự động không render/không lọt vào bundle thật.
  const handleDevBackdoorLogin = (role: 'student' | 'admin') => {
    login({
      id: role === 'admin' ? 'mock-dev-admin' : 'mock-dev-student',
      name: role === 'admin' ? 'Dev Viện Chủ' : 'Dev Thiếu Hiệp',
      email: role === 'admin' ? 'dev-admin@local.test' : 'dev-student@local.test',
      avatar: '',
      role
    });
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

        {/* ⚠️ DEV-ONLY BACKDOOR — TODO: xóa trước khi lên production thật */}
        {import.meta.env.DEV && (
          <div className="pt-4 border-t border-dashed border-red-500/40 space-y-2.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-red-400 flex items-center justify-center gap-1.5">
              <FlaskConical className="w-3 h-3" /> Chế độ Dev — chỉ hiện khi chạy dev server, tự ẩn ở bản build thật
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDevBackdoorLogin('student')}
                className="py-2.5 rounded-xl font-orbitron font-bold text-[10px] uppercase tracking-wider border border-synth-cyan/40 text-synth-cyan hover:bg-synth-cyan/10 cursor-pointer transition-all duration-300"
              >
                🌱 Vào thẳng Thiếu Hiệp
              </button>
              <button
                onClick={() => handleDevBackdoorLogin('admin')}
                className="py-2.5 rounded-xl font-orbitron font-bold text-[10px] uppercase tracking-wider border border-synth-magenta/40 text-synth-magenta hover:bg-synth-magenta/10 cursor-pointer transition-all duration-300"
              >
                👑 Vào thẳng Viện Chủ
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


