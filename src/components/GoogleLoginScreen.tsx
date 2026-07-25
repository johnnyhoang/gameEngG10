import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Sparkles, LogIn } from 'lucide-react';
import { toast } from '../utils/toast';

export const GoogleLoginScreen: React.FC = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSupabaseGoogleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });
      if (error) {
        toast.error('Đăng nhập Google không thành công: ' + error.message);
        setIsLoggingIn(false);
      }
    } catch (err: any) {
      toast.error('Lỗi khi khởi tạo Google Login');
      setIsLoggingIn(false);
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
            Trường Thi học thuật
          </p>
        </div>

        <p className="text-xs text-synth-text-muted leading-relaxed">
          MIKAWAII là hệ sinh thái ôn thi Tuyển sinh lớp 10 toàn diện, tích hợp các Môn học chuyên sâu (Toán, Tiếng Anh, Ngữ Văn) cùng các Môn tu học cơ bản. Tại đây, Sĩ Tử bước vào Trường Thi, ôn luyện tại Học Đường, mở khóa các Xưởng Toán tương tác 3D, tích lũy Ruby để đổi lấy các phần quà thực tế từ Giáo viên và Trưởng bối. Đăng nhập ngay để lưu giữ tiến trình, thăng tiến Học Vị và bứt phá điểm số mỗi ngày!
        </p>

        {/* Active Google Button */}
        <div className="py-4 flex justify-center">
          <button
            onClick={handleSupabaseGoogleLogin}
            disabled={isLoggingIn}
            className="w-full py-3.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 shadow-[0_0_12px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full"></span>
                Đang chuyển hướng...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" /> Đăng nhập bằng tài khoản Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
