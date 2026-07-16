import React, { useMemo } from 'react';
import { Crown, Shield, Users, User, GraduationCap } from 'lucide-react';

interface OrgChartProps {
  currentUser: any;
  adminStudents: any[]; // danh sách tất cả user trong viện
  adminLinks: any[];    // danh sách tất cả các liên kết ge10_family_links active
}

export const OrgChart: React.FC<OrgChartProps> = ({
  currentUser,
  adminStudents = [],
  adminLinks = []
}) => {
  // 1. Phân loại nhân sự theo role
  const admins = useMemo(() => {
    return adminStudents.filter(u => u.role === 'truong_vien');
  }, [adminStudents]);

  const viceAdmins = useMemo(() => {
    return adminStudents.filter(u => u.role === 'pho_vien');
  }, [adminStudents]);

  const primaryTeachers = useMemo(() => {
    return adminStudents.filter(u => u.role === 'tutor');
  }, [adminStudents]);

  const secondaryTeachers = useMemo(() => {
    return adminStudents.filter(u => u.role === 'secondary_tutor');
  }, [adminStudents]);

  const allStudents = useMemo(() => {
    return adminStudents.filter(u => u.role === 'student');
  }, [adminStudents]);

  // 2. Tìm học sinh thuộc từng giáo viên (chủ nhiệm chính hoặc phụ)
  const studentsByTeacher = useMemo(() => {
    const map = new Map<string, any[]>();
    
    allStudents.forEach(student => {
      // Tìm các link của học sinh này
      const links = adminLinks.filter(l => l.student_id === student.id && l.status === 'active');
      
      links.forEach(link => {
        const teacherId = link.tutor_id;
        if (!map.has(teacherId)) {
          map.set(teacherId, []);
        }
        const list = map.get(teacherId)!;
        if (!list.some(s => s.id === student.id)) {
          list.push(student);
        }
      });
    });

    return map;
  }, [allStudents, adminLinks]);

  // 3. Tìm Phó Chủ Nhiệm (Secondary Parent) gắn với Chủ Nhiệm Chính
  // Theo DB: tutor_id = Primary Tutor, student_id = Secondary Tutor, link_type = 'secondary'
  const secondaryTeachersByPrimary = useMemo(() => {
    const map = new Map<string, any[]>();
    
    adminLinks.forEach(link => {
      if (link.link_type === 'secondary' && link.status === 'active') {
        const primaryId = link.tutor_id;
        const secondaryId = link.student_id;
        
        const secondaryUser = secondaryTeachers.find(u => u.id === secondaryId);
        if (secondaryUser) {
          if (!map.has(primaryId)) {
            map.set(primaryId, []);
          }
          const list = map.get(primaryId)!;
          if (!list.some(u => u.id === secondaryId)) {
            list.push(secondaryUser);
          }
        }
      }
    });

    return map;
  }, [adminLinks, secondaryTeachers]);

  // 4. Tìm các Sĩ Tử Tự Do (chưa có lớp/chưa được gán cho ai)
  const freeStudents = useMemo(() => {
    const linkedStudentIds = new Set(
      adminLinks
        .filter(l => l.status === 'active' && l.student_role === 'student')
        .map(l => l.student_id)
    );
    return allStudents.filter(s => !linkedStudentIds.has(s.id));
  }, [allStudents, adminLinks]);

  // Helper hiển thị tên thân thiện (hoặc email nếu không có tên)
  const displayName = (user: any) => {
    return user.name || user.email || 'Không tên';
  };

  return (
    <div className="space-y-6 py-2 overflow-x-auto min-w-full">
      {/* Tab Header & Instruction */}
      <div className="text-center max-w-xl mx-auto space-y-1 mb-4">
        <h4 className="font-orbitron font-black text-white text-sm uppercase tracking-widest flex items-center justify-center gap-1.5">
          🌳 SƠ ĐỒ NHÂN SỰ & HỌC VIÊN
        </h4>
        <p className="text-[10px] text-slate-400">
          Di chuột vào từng thành viên để xem thông tin chi tiết. Nhãn màu vàng hiển thị tài khoản của bạn.
        </p>
      </div>

      {/* TẤT CẢ BIỂU ĐỒ TRÊN CÂY (Có hỗ trợ cuộn dọc/ngang tối đa) */}
      <div className="flex flex-col items-center justify-start min-w-[700px] max-h-[68vh] overflow-auto p-6 border border-white/5 bg-slate-950/20 rounded-2xl space-y-4">
        
        {/* TẦNG 1: VIỆN CHỦ (VIỆN TRƯỞNG) */}
        <div className="flex flex-col items-center">
          <span className="text-[8px] uppercase font-bold tracking-widest text-synth-magenta font-orbitron mb-1.5 flex items-center gap-1">
            <Crown className="w-3 h-3 text-synth-magenta" /> Ban Viện Chủ (Viện Trưởng)
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {admins.map(admin => {
              const isSelf = admin.id === currentUser?.id;
              return (
                <div key={admin.id} className="relative group">
                  {/* Node Card */}
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/70 border ${isSelf ? 'border-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.2)]' : 'border-synth-magenta/30 shadow-[0_0_8px_rgba(255,0,127,0.1)]'} group-hover:border-synth-magenta group-hover:shadow-[0_0_12px_rgba(255,0,127,0.25)] transition-all duration-300 w-44`}>
                    <div className={`w-8 h-8 rounded-full border ${isSelf ? 'border-yellow-400' : 'border-synth-magenta/40'} overflow-hidden flex-shrink-0`}>
                      <img 
                        src={admin.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                        alt={displayName(admin)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="truncate min-w-0 flex-1">
                      <div className="flex items-center gap-0.5 truncate">
                        <Crown className="w-2 h-2 text-synth-magenta flex-shrink-0" />
                        <span className="text-[8px] text-synth-magenta uppercase font-orbitron font-bold tracking-wider truncate">Viện Trưởng</span>
                        {isSelf && <span className="text-[7px] bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 rounded px-0.5 font-orbitron font-black ml-0.5 flex-shrink-0">Bạn</span>}
                      </div>
                      <span className="block text-[11px] font-bold text-white truncate mt-0.5">{displayName(admin)}</span>
                    </div>
                  </div>

                  {/* CSS Hover Tooltip - Đặt phía dưới (top-full) để không bị che bởi cạnh trên */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2.5 bg-slate-900/95 border border-synth-magenta/30 rounded-lg text-[9px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-2xl backdrop-blur-md space-y-0.5">
                    <p className="font-bold text-white text-[10px]">{displayName(admin)} {isSelf && '(Bạn)'}</p>
                    <p className="opacity-70">Email: {admin.email}</p>
                    <p className="opacity-70">Vai trò: Viện Trưởng tối cao</p>
                    <p className="text-synth-magenta font-orbitron font-bold text-[8px] mt-0.5 flex items-center gap-0.5">
                      <Crown className="w-2 h-2 text-synth-magenta" /> BAN GIÁM HIỆU
                    </p>
                  </div>
                </div>
              );
            })}
            {admins.length === 0 && (
              <div className="text-[10px] text-slate-500 italic">Chưa có Viện Trưởng</div>
            )}
          </div>
        </div>

        {/* ĐƯỜNG NỐI DỌC 1 (SVG MỎNG) */}
        {viceAdmins.length > 0 && (
          <svg className="w-px h-5 block" overflow="visible">
            <line x1="0" y1="0" x2="0" y2="100%" stroke="url(#magentaToPurple)" strokeWidth="1.5" strokeOpacity="0.6" />
            <defs>
              <linearGradient id="magentaToPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff007f" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* TẦNG 2: PHÓ VIỆN CHỦ (PHÓ VIỆN TRƯỞNG) */}
        {viceAdmins.length > 0 && (
          <div className="flex flex-col items-center">
            <span className="text-[8px] uppercase font-bold tracking-widest text-purple-400 font-orbitron mb-1.5 flex items-center gap-1">
              <Shield className="w-3 h-3 text-purple-400" /> Phó Viện Trưởng
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              {viceAdmins.map(vice => {
                const isSelf = vice.id === currentUser?.id;
                return (
                  <div key={vice.id} className="relative group">
                    {/* Node Card */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/70 border ${isSelf ? 'border-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.2)]' : 'border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.1)]'} group-hover:border-purple-400 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.25)] transition-all duration-300 w-44`}>
                      <div className={`w-8 h-8 rounded-full border ${isSelf ? 'border-yellow-400' : 'border-purple-500/40'} overflow-hidden flex-shrink-0`}>
                        <img 
                          src={vice.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                          alt={displayName(vice)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="truncate min-w-0 flex-1">
                        <div className="flex items-center gap-0.5 truncate">
                          <Shield className="w-2 h-2 text-purple-400 flex-shrink-0" />
                          <span className="text-[8px] text-purple-400 uppercase font-orbitron font-bold tracking-wider truncate">Phó Viện Trưởng</span>
                          {isSelf && <span className="text-[7px] bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 rounded px-0.5 font-orbitron font-black ml-0.5 flex-shrink-0">Bạn</span>}
                        </div>
                        <span className="block text-[11px] font-bold text-white truncate mt-0.5">{displayName(vice)}</span>
                      </div>
                    </div>

                    {/* CSS Hover Tooltip - Đặt phía dưới (top-full) */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2.5 bg-slate-900/95 border border-purple-500/30 rounded-lg text-[9px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-2xl backdrop-blur-md space-y-0.5">
                      <p className="font-bold text-white text-[10px]">{displayName(vice)} {isSelf && '(Bạn)'}</p>
                      <p className="opacity-70">Email: {vice.email}</p>
                      <p className="opacity-70">Quyền hạn: Điều phối & Quản trị nội dung</p>
                      <p className="text-purple-400 font-orbitron font-bold text-[8px] mt-0.5 flex items-center gap-0.5">
                        <Shield className="w-2 h-2 text-purple-400" /> BAN GIÁM HIỆU
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ĐƯỜNG NỐI DỌC 2 (SVG MỎNG) */}
        <svg className="w-px h-5 block" overflow="visible">
          <line x1="0" y1="0" x2="0" y2="100%" stroke="url(#purpleToCyan)" strokeWidth="1.5" strokeOpacity="0.6" />
          <defs>
            <linearGradient id="purpleToCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#00f0ff" />
            </linearGradient>
          </defs>
        </svg>

        {/* ĐƯỜNG NỐI RẼ NHÁNH TỪ TRÊN XUỐNG CÁC LỚP CHỦ NHIỆM */}
        {primaryTeachers.length > 1 && (
          <div className="w-full flex justify-center">
            <div className="w-[70%] border-t border-synth-cyan/30 h-3 relative"></div>
          </div>
        )}

        {/* TẦNG 3 & 4: CHỦ NHIỆM CHÍNH & PHÓ CHỦ NHIỆM (THEO LỚP) */}
        <div className="w-full space-y-4">
          <div className="text-center">
            <span className="text-[8px] uppercase font-bold tracking-widest text-synth-cyan font-orbitron flex items-center justify-center gap-1">
              <Users className="w-3.5 h-3.5 text-synth-cyan" /> Các Lớp Chủ Nhiệm Học Đường
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 px-2 items-start">
            {primaryTeachers.map(primary => {
              const secondaries = secondaryTeachersByPrimary.get(primary.id) || [];
              const primaryStudents = studentsByTeacher.get(primary.id) || [];
              
              const allClassStudentsMap = new Map<string, any>();
              primaryStudents.forEach(s => allClassStudentsMap.set(s.id, s));
              
              secondaries.forEach(sec => {
                const secStudents = studentsByTeacher.get(sec.id) || [];
                secStudents.forEach(s => allClassStudentsMap.set(s.id, s));
              });
              
              const classStudents = Array.from(allClassStudentsMap.values());
              const isPrimarySelf = primary.id === currentUser?.id;

              return (
                <div key={primary.id} className="flex flex-col items-center">
                  
                  {/* Đường nối dọc mỏng từ thanh ngang xuống lớp này */}
                  {primaryTeachers.length > 1 && (
                    <svg className="w-px h-3" overflow="visible">
                      <line x1="0" y1="0" x2="0" y2="100%" stroke="#00f0ff" strokeWidth="1.2" strokeOpacity="0.5" />
                    </svg>
                  )}

                  <div className="glass-panel border border-white/5 rounded-2xl p-4 bg-white/2 space-y-4 flex flex-col items-center relative hover:border-synth-cyan/30 transition-colors max-w-sm min-w-[280px]">
                    
                    {/* Giáo Viên Lớp */}
                    <div className="flex flex-col items-center space-y-2 w-full">
                      <span className="text-[7px] uppercase tracking-wider font-bold text-slate-400 font-orbitron">Ban Chủ Nhiệm</span>
                      
                      <div className="flex items-center justify-center gap-4 w-full relative">
                        {/* 1. Chủ Nhiệm Chính */}
                        <div className="relative group">
                          <div className={`flex flex-col items-center p-2 rounded-lg bg-slate-950/50 border ${isPrimarySelf ? 'border-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.15)]' : 'border-synth-cyan/30'} w-28 hover:border-synth-cyan transition-colors`}>
                            <img 
                              src={primary.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                              alt={displayName(primary)}
                              className="w-7 h-7 rounded-full border border-synth-cyan/30 object-cover"
                            />
                            <div className="flex items-center gap-0.5 mt-1.5 truncate max-w-full">
                              <Users className="w-2 h-2 text-synth-cyan flex-shrink-0" />
                              <span className="text-[7px] text-synth-cyan font-bold uppercase font-orbitron tracking-wider truncate">Chủ Nhiệm</span>
                            </div>
                            {isPrimarySelf && <span className="text-[7px] bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 rounded px-0.5 font-orbitron font-black mt-0.5 flex-shrink-0">Bạn</span>}
                            <span className="text-[10px] font-bold text-white truncate max-w-full text-center mt-0.5">{displayName(primary)}</span>
                          </div>

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-44 p-2 bg-slate-900/95 border border-synth-cyan/30 rounded-lg text-[9px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl space-y-0.5">
                            <p className="font-bold text-white">{displayName(primary)} {isPrimarySelf && '(Bạn)'}</p>
                            <p>Email: {primary.email}</p>
                            <p className="text-synth-cyan">Vai trò: Điều hành Lớp học chính</p>
                          </div>
                        </div>

                        {/* Đường nối ngang nét đứt bằng SVG nếu có Phó Chủ Nhiệm */}
                        {secondaries.length > 0 && (
                          <svg className="absolute w-8 h-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" overflow="visible">
                            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#f97316" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.7" />
                            <circle cx="50%" cy="50%" r="3" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
                          </svg>
                        )}

                        {/* 2. Danh sách Phó Chủ Nhiệm của lớp */}
                        {secondaries.map(sec => {
                          const isSecondarySelf = sec.id === currentUser?.id;
                          return (
                            <div key={sec.id} className="relative group">
                              <div className={`flex flex-col items-center p-2 rounded-lg bg-slate-950/50 border ${isSecondarySelf ? 'border-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.15)]' : 'border-orange-500/30'} w-28 hover:border-orange-400 transition-colors`}>
                                <img 
                                  src={sec.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                                  alt={displayName(sec)}
                                  className="w-7 h-7 rounded-full border border-orange-500/30 object-cover"
                                />
                                <div className="flex items-center gap-0.5 mt-1.5 truncate max-w-full">
                                  <User className="w-2 h-2 text-orange-400 flex-shrink-0" />
                                  <span className="text-[7px] text-orange-400 font-bold uppercase font-orbitron tracking-wider truncate">Phó Chủ Nhiệm</span>
                                </div>
                                {isSecondarySelf && <span className="text-[7px] bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 rounded px-0.5 font-orbitron font-black mt-0.5 flex-shrink-0">Bạn</span>}
                                <span className="text-[10px] font-bold text-white truncate max-w-full text-center mt-0.5">{displayName(sec)}</span>
                              </div>

                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-44 p-2 bg-slate-900/95 border border-orange-500/30 rounded-lg text-[9px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl space-y-0.5">
                                <p className="font-bold text-white">{displayName(sec)} {isSecondarySelf && '(Bạn)'}</p>
                                <p>Email: {sec.email}</p>
                                <p className="text-orange-400">Vai trò: Đồng hành hỗ trợ lớp</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Đường nối dọc xuống Sĩ tử bằng SVG mỏng */}
                    <svg className="w-px h-4" overflow="visible">
                      <line x1="0" y1="0" x2="0" y2="100%" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.4" />
                    </svg>

                    {/* Danh sách Sĩ tử của lớp */}
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[7px] text-slate-400 uppercase tracking-widest font-orbitron flex items-center gap-0.5">
                          <GraduationCap className="w-2.5 h-2.5 text-synth-green" /> Sĩ Tử Lớp ({classStudents.length})
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 w-full">
                        {classStudents.map(student => {
                          const isStudentSelf = student.id === currentUser?.id;
                          return (
                            <div key={student.id} className="relative group">
                              {/* Student Card */}
                              <div className={`flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-900/40 border ${isStudentSelf ? 'border-yellow-400' : 'border-green-500/20'} hover:border-synth-green/50 transition-colors`}>
                                <img 
                                  src={student.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                                  alt={displayName(student)}
                                  className="w-6 h-6 rounded-full object-cover border border-green-500/20 flex-shrink-0"
                                />
                                <div className="truncate min-w-0 flex-1">
                                  <div className="truncate flex items-center gap-0.5">
                                    <span className="block text-[10px] font-bold text-slate-100 truncate">{displayName(student)}</span>
                                    {isStudentSelf && <span className="text-[6px] bg-yellow-400/25 text-yellow-300 px-0.5 rounded font-orbitron flex-shrink-0">Bạn</span>}
                                  </div>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <span className="text-[7px] text-synth-magenta font-bold font-orbitron">LV.{student.level || 1}</span>
                                    <span className="text-[7px] text-slate-500 font-orbitron">{student.xp || 0} XP</span>
                                  </div>
                                </div>
                              </div>

                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-44 p-2 bg-slate-900/95 border border-green-500/30 rounded-lg text-[8px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl space-y-0.5">
                                <p className="font-bold text-white">{displayName(student)} {isStudentSelf && '(Bạn)'}</p>
                                <p>Email: {student.email}</p>
                                <p>Đẳng cấp: LV.{student.level || 1}</p>
                                <p>Tích lũy: {student.xp || 0} XP</p>
                                <p>Ngân quỹ: {student.ruby || 0} Ruby 💎</p>
                                <p>Chuỗi streak: {student.streak || 0} ngày 🔥</p>
                              </div>
                            </div>
                          );
                        })}
                        {classStudents.length === 0 && (
                          <p className="text-[9px] text-slate-500 italic text-center py-1.5 col-span-2">Lớp trống</p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

            {primaryTeachers.length === 0 && (
              <div className="text-[10px] text-slate-500 italic py-2">Chưa thành lập lớp chủ nhiệm nào</div>
            )}
          </div>
        </div>

        {/* ĐƯỜNG NỐI DỌC 3 (SVG MỎNG NÉT ĐỨT) */}
        {freeStudents.length > 0 && (
          <svg className="w-px h-6 block" overflow="visible">
            <line x1="0" y1="0" x2="0" y2="100%" stroke="#475569" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.6" />
          </svg>
        )}

        {/* TẦNG CUỐI: SĨ TỬ TỰ DO (CHƯA CÓ LỚP) */}
        {freeStudents.length > 0 && (
          <div className="glass-panel border border-slate-800 rounded-2xl p-4 bg-slate-950/30 max-w-sm min-w-[280px] space-y-3 flex flex-col items-center">
            <div className="text-center space-y-0.5">
              <span className="text-[8px] uppercase tracking-widest font-black text-slate-400 font-orbitron flex items-center justify-center gap-1">
                🌱 SĨ TỬ TỰ DO ({freeStudents.length})
              </span>
              <p className="text-[8px] text-slate-500">Ban Giám Hiệu chịu trách nhiệm quản lý lâm thời</p>
            </div>

            <div className="grid grid-cols-2 gap-1.5 w-full">
              {freeStudents.map(student => {
                const isStudentSelf = student.id === currentUser?.id;
                return (
                  <div key={student.id} className="relative group">
                    {/* Student Card */}
                    <div className={`flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-900/30 border ${isStudentSelf ? 'border-yellow-400' : 'border-white/5'} hover:border-slate-500/50 transition-colors`}>
                      <img 
                        src={student.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                        alt={displayName(student)}
                        className="w-6 h-6 rounded-full object-cover border border-slate-700 flex-shrink-0"
                      />
                      <div className="truncate min-w-0 flex-1">
                        <div className="truncate flex items-center gap-0.5">
                          <span className="block text-[10px] font-bold text-slate-300 truncate">{displayName(student)}</span>
                          {isStudentSelf && <span className="text-[6px] bg-yellow-400/25 text-yellow-300 px-0.5 rounded font-orbitron flex-shrink-0">Bạn</span>}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[7px] text-slate-500 font-orbitron">LV.{student.level || 1}</span>
                          <span className="text-[7px] text-slate-500 font-orbitron">{student.xp || 0} XP</span>
                        </div>
                      </div>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-44 p-2 bg-slate-900/95 border border-slate-700 rounded-lg text-[8px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl space-y-0.5">
                      <p className="font-bold text-white">{displayName(student)} {isStudentSelf && '(Bạn)'}</p>
                      <p>Email: {student.email}</p>
                      <p>Đẳng cấp: LV.{student.level || 1}</p>
                      <p>Tích lũy: {student.xp || 0} XP</p>
                      <p>Ngân quỹ: {student.ruby || 0} Ruby 💎</p>
                      <p>Chuỗi streak: {student.streak || 0} ngày 🔥</p>
                      <p className="text-slate-400 italic">Trạng thái: Chưa nhận lớp chủ nhiệm</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
