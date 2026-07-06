import React, { useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import type { UserProfile } from '../types/game';
import { Sparkles, Shield, User, HelpCircle, LogIn } from 'lucide-react';

interface GoogleLoginScreenProps {
  googleClientId?: string; // Optional: can be configured
}

export const GoogleLoginScreen: React.FC<GoogleLoginScreenProps> = ({ googleClientId }) => {
  const login = useGameState(state => state.login);
  const [loadingGis, setLoadingGis] = useState(false);

  // Default Client ID if none provided, or mock behavior
  const clientId = googleClientId || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

  useEffect(() => {
    // Only load Google GIS if clientId is actually configured and is not placeholder
    if (googleClientId && !googleClientId.includes('YOUR_GOOGLE_CLIENT_ID')) {
      setLoadingGis(true);
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setLoadingGis(false);
        try {
          /* global google */
          // @ts-ignore
          google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse
          });
          // @ts-ignore
          google.accounts.id.renderButton(
            document.getElementById('google-btn-container'),
            { theme: 'dark', size: 'large', width: '320' }
          );
        } catch (e) {
          console.error('Lỗi khởi tạo Google GIS:', e);
        }
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [clientId, googleClientId]);

  // Decode Google JWT token helper
  const handleGoogleCredentialResponse = (response: any) => {
    try {
      const jwt = response.credential;
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);

      const user: UserProfile = {
        id: decoded.email || decoded.sub,
        name: decoded.name || 'Học viên Google',
        email: decoded.email,
        avatar: decoded.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };

      login(user);
    } catch (error) {
      console.error('Lỗi giải mã Google Token:', error);
      alert('Đăng nhập thất bại. Vui lòng thử lại hoặc chọn Đăng nhập nhanh.');
    }
  };

  // Mock login triggers for local/offline testing
  const handleMockLogin = (role: 'minh' | 'linh' | 'johnny') => {
    let mockUser: UserProfile;

    if (role === 'minh') {
      mockUser = {
        id: 'mock-student-minh',
        name: 'Minh (Anh Cả)',
        email: 'minh.hoang@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'
      };
    } else if (role === 'linh') {
      mockUser = {
        id: 'mock-student-linh',
        name: 'Linh (Em Út)',
        email: 'linh.hoang@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
      };
    } else {
      mockUser = {
        id: 'mock-parent-johnny',
        name: 'Bố Johnny',
        email: 'johnny.hoang@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
      };
    }

    login(mockUser);
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
            CYBER_ENGLISH
          </h1>
          <p className="text-xs text-synth-cyan font-bold uppercase tracking-widest font-orbitron">
            Grade 10 Exam Prep HUD
          </p>
        </div>

        <p className="text-xs text-synth-text-muted leading-relaxed">
          Chào mừng con đến với hệ thống game hóa học Tiếng Anh lớp 10 TP.HCM. Đăng nhập để lưu tiến độ và nuôi thú cưng.
        </p>

        {/* Active Google Button */}
        <div className="py-4 flex justify-center">
          {googleClientId && !googleClientId.includes('YOUR_GOOGLE_CLIENT_ID') ? (
            <div id="google-btn-container" className="shadow-[0_0_15px_rgba(0,240,255,0.2)] rounded-lg overflow-hidden">
              {loadingGis && <span className="text-xs text-synth-cyan font-orbitron">Loading Google auth SDK...</span>}
            </div>
          ) : (
            <button
              onClick={() => handleMockLogin('minh')}
              className="w-full py-3.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 shadow-[0_0_12px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Đăng nhập bằng Google
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 text-[10px] text-synth-text-muted uppercase font-bold">
          <div className="flex-1 h-[1px] bg-synth-gray"></div>
          <span>Hoặc chơi nhanh offline</span>
          <div className="flex-1 h-[1px] bg-synth-gray"></div>
        </div>

        {/* Multi-profile Selector for demonstration */}
        <div className="grid grid-cols-1 gap-2.5">
          <button
            onClick={() => handleMockLogin('minh')}
            className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-synth-gray/10 hover:border-synth-cyan/40 hover:bg-synth-gray/25 cursor-pointer text-left text-xs font-semibold text-white transition-all duration-200"
          >
            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" 
                alt="Minh" 
                className="w-7 h-7 rounded-full border border-synth-cyan/30"
              />
              <div className="flex flex-col">
                <span>Con cả: Minh (Luyện thi)</span>
                <span className="text-[10px] text-synth-text-muted">minh.hoang@gmail.com</span>
              </div>
            </div>
            <User className="w-4 h-4 text-synth-cyan" />
          </button>

          <button
            onClick={() => handleMockLogin('linh')}
            className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-synth-gray/10 hover:border-synth-cyan/40 hover:bg-synth-gray/25 cursor-pointer text-left text-xs font-semibold text-white transition-all duration-200"
          >
            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" 
                alt="Linh" 
                className="w-7 h-7 rounded-full border border-synth-cyan/30"
              />
              <div className="flex flex-col">
                <span>Con út: Linh (Chơi & học)</span>
                <span className="text-[10px] text-synth-text-muted">linh.hoang@gmail.com</span>
              </div>
            </div>
            <User className="w-4 h-4 text-synth-cyan" />
          </button>

          <button
            onClick={() => handleMockLogin('johnny')}
            className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-synth-gray/10 hover:border-synth-cyan/40 hover:bg-synth-gray/25 cursor-pointer text-left text-xs font-semibold text-white transition-all duration-200"
          >
            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" 
                alt="Johnny" 
                className="w-7 h-7 rounded-full border border-synth-cyan/30"
              />
              <div className="flex flex-col">
                <span>Phụ huynh: Bố Johnny (Quản trị)</span>
                <span className="text-[10px] text-synth-text-muted">johnny.hoang@gmail.com</span>
              </div>
            </div>
            <Shield className="w-4 h-4 text-synth-cyan" />
          </button>
        </div>

        {/* Tip section */}
        <div className="flex gap-2 text-[10px] text-synth-text-muted text-left border-t border-synth-gray/50 pt-4 items-start leading-relaxed">
          <HelpCircle className="w-4 h-4 shrink-0 text-synth-cyan" />
          <span>
            Đăng nhập offline cho phép chạy thử ngay lập tức. Mọi thông tin, pet và coins được lưu biệt lập theo từng địa chỉ email của mỗi con!
          </span>
        </div>
      </div>
    </div>
  );
};
