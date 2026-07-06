import React from 'react';
import { supabase } from '../utils/supabaseClient';
import { Sparkles, LogIn } from 'lucide-react';

export const GoogleLoginScreen: React.FC = () => {

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
      alert('Không thể kết nối với Supabase Google Auth: ' + error.message);
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
            MICA
          </h1>
          <p className="text-xs text-synth-cyan font-bold uppercase tracking-widest font-orbitron">
            Luyện thi Tiếng Anh vào lớp 10
          </p>
        </div>

        <p className="text-xs text-synth-text-muted leading-relaxed">
          Chào mừng con đến với hệ thống học Tiếng Anh luyện thi vào lớp 10 TP.HCM. Đăng nhập để lưu trữ tiến trình học tập và đồng hành cùng thú cưng.
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

      </div>
    </div>
  );
};
