import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const PAGE_SIZE = 12;

type LinkFilter = 'all' | 'linked' | 'unlinked';
type SortKey = 'name' | 'level' | 'xp' | 'ruby' | 'streak';

interface StudentDirectoryProps {
  /** Toàn bộ học sinh toàn viện (role === 'student') từ /api/admin/users */
  students: any[];
  /** Toàn bộ link active toàn viện — để tra Chủ Nhiệm Chính của từng em */
  adminLinks: any[];
  inspectLoading: boolean;
  onInspect: (studentId: string) => void;
}

/**
 * Sổ danh bộ học sinh toàn trường cho Viện Trưởng / Phó Viện Trưởng:
 * hiện TẤT CẢ học sinh (kể cả chưa vào lớp nào), có tìm kiếm / lọc / sắp xếp
 * và lazy-load từng trang khi cuộn xuống.
 */
export const StudentDirectory: React.FC<StudentDirectoryProps> = ({
  students,
  adminLinks,
  inspectLoading,
  onInspect
}) => {
  const [search, setSearch] = useState('');
  const [linkFilter, setLinkFilter] = useState<LinkFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Tra Chủ Nhiệm Chính của từng học sinh từ link primary đang active
  const primaryTeacherByStudent = useMemo(() => {
    const map = new Map<string, string>();
    (adminLinks || [])
      .filter((l: any) => l.link_type === 'primary' && l.status === 'active')
      .forEach((l: any) => map.set(l.student_id, l.tutor_name || 'Chủ nhiệm'));
    return map;
  }, [adminLinks]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = students;
    if (q) {
      list = list.filter((s: any) =>
        (s.name || '').toLowerCase().includes(q) || (s.email || '').toLowerCase().includes(q)
      );
    }
    if (linkFilter === 'linked') {
      list = list.filter((s: any) => primaryTeacherByStudent.has(s.id));
    } else if (linkFilter === 'unlinked') {
      list = list.filter((s: any) => !primaryTeacherByStudent.has(s.id));
    }
    const sorted = [...list];
    if (sortKey === 'name') {
      sorted.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'vi'));
    } else {
      sorted.sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0));
    }
    return sorted;
  }, [students, search, linkFilter, sortKey, primaryTeacherByStudent]);

  // Đổi điều kiện lọc/sắp xếp thì quay về trang đầu
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, linkFilter, sortKey]);

  // Lazy-load: cuộn chạm sentinel cuối danh sách thì nạp thêm 1 trang
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) {
        setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filtered.length));
      }
    }, { rootMargin: '200px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [filtered.length]);

  const visible = filtered.slice(0, visibleCount);
  const unlinkedCount = students.filter((s: any) => !primaryTeacherByStudent.has(s.id)).length;

  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider shrink-0">
          👥 Sổ Danh Bộ Sĩ Tử Toàn Học Viện
          <span className="ml-2 px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-slate-300 font-orbitron">
            {filtered.length}/{students.length}
          </span>
        </h4>

        {/* Bộ điều khiển: tìm kiếm + lọc + sắp xếp */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm tên hoặc email..."
              className="w-full sm:w-52 pl-8 pr-2.5 py-2 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
            />
          </div>
          <select
            value={linkFilter}
            onChange={e => setLinkFilter(e.target.value as LinkFilter)}
            className="px-2.5 py-2 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs cursor-pointer"
            title="Lọc theo tình trạng lớp học"
          >
            <option value="all">Tất cả Sĩ Tử</option>
            <option value="linked">Đã có lớp</option>
            <option value="unlinked">Chưa có lớp ({unlinkedCount})</option>
          </select>
          <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value as SortKey)}
            className="px-2.5 py-2 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs cursor-pointer"
            title="Sắp xếp danh sách"
          >
            <option value="name">Tên A → Z</option>
            <option value="level">Cấp độ cao nhất</option>
            <option value="xp">XP cao nhất</option>
            <option value="ruby">Ruby nhiều nhất</option>
            <option value="streak">Chuỗi chuyên cần dài nhất</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {visible.map((s: any) => {
          const teacherName = primaryTeacherByStudent.get(s.id);
          return (
            <button
              key={s.id}
              disabled={inspectLoading}
              onClick={() => onInspect(s.id)}
              title="Bấm để xem hoạt động, tiến độ và báo cáo của Sĩ Tử"
              className="text-left p-3.5 rounded-xl bg-synth-gray/20 border border-white/5 hover:border-synth-cyan/40 hover:bg-white/[0.06] transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Hàng 1: avatar + tên + email + trạng thái lớp */}
              <div className="flex items-center gap-3">
                {s.avatar_url ? (
                  <img src={s.avatar_url} alt="" className="w-10 h-10 rounded-full border border-white/10 object-cover shrink-0" />
                ) : (
                  <span className="w-10 h-10 rounded-full bg-synth-purple/25 border border-white/10 flex items-center justify-center text-sm font-black text-white shrink-0">
                    {(s.name || s.email || '?').trim().charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-sm truncate">{s.name || s.email || 'Sĩ Tử'}</span>
                    {teacherName ? (
                      <span
                        className="px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded shrink-0 bg-synth-cyan/20 border border-synth-cyan/40 text-synth-cyan max-w-[110px] truncate"
                        title={`Chủ Nhiệm Chính: ${teacherName}`}
                      >
                        {teacherName}
                      </span>
                    ) : (
                      <span
                        className="px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded shrink-0 bg-yellow-500/15 border border-yellow-500/40 text-yellow-400"
                        title="Sĩ Tử chưa vào lớp chủ nhiệm nào"
                      >
                        Chưa có lớp
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-synth-text-muted truncate block">{s.email}</span>
                </div>
                <span className="text-lg text-slate-500 group-hover:text-synth-cyan group-hover:translate-x-0.5 transition-all shrink-0 font-bold">
                  {inspectLoading ? '…' : '›'}
                </span>
              </div>

              {/* Hàng 2: chỉ số nhanh */}
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                <span className="px-1.5 py-0.5 rounded bg-synth-purple/15 border border-synth-purple/30 text-[9px] font-bold font-orbitron text-white">
                  👑 LV.{s.level ?? 1}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold font-orbitron text-slate-300">
                  {s.xp ?? 0} XP
                </span>
                <span className="px-1.5 py-0.5 rounded bg-synth-orange/10 border border-synth-orange/30 text-[9px] font-bold font-orbitron text-synth-orange">
                  💎 {s.ruby ?? 0}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-synth-cyan/10 border border-synth-cyan/25 text-[9px] font-bold font-orbitron text-synth-cyan">
                  ⚡ {s.energy ?? 0}/{s.max_energy ?? 100}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/25 text-[9px] font-bold font-orbitron text-red-400">
                  🔥 {s.streak ?? 0} ngày
                </span>
              </div>
            </button>
          );
        })}
        {visible.length === 0 && (
          <p className="text-xs text-synth-text-muted italic py-4 col-span-3 text-center">
            Không tìm thấy Sĩ Tử nào khớp điều kiện lọc.
          </p>
        )}
      </div>

      {/* Sentinel lazy-load + đếm tiến độ */}
      {visibleCount < filtered.length && (
        <div ref={sentinelRef} className="py-3 text-center text-[10px] text-synth-text-muted font-orbitron animate-pulse">
          Đang tải thêm... ({visibleCount}/{filtered.length})
        </div>
      )}
    </div>
  );
};
