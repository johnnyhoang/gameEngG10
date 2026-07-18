import React, { useState, useMemo } from 'react';
import { useGameState } from '../../store';
import { Database, Search, Plus, Trash2, Edit2, AlertCircle, RefreshCw } from 'lucide-react';
import type { TextbookMapping, HamNguyenTo } from '../../types/game';
import { SUBJECTS_CONFIG } from '../../types/game';
import { DUNGEONS_CONFIG } from '../../utils/textbookEnricher';
import { toast } from '../../utils/toast';

export const ControlPanel: React.FC = () => {
  const textbookMappings = useGameState(state => state.textbookMappings || []);
  const fetchTextbookMappings = useGameState(state => state.fetchTextbookMappings);
  const addTextbookMapping = useGameState(state => state.addTextbookMapping);
  const updateTextbookMapping = useGameState(state => state.updateTextbookMapping);
  const deleteTextbookMapping = useGameState(state => state.deleteTextbookMapping);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  // Form states (Add/Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [formCategoryKey, setFormCategoryKey] = useState('');
  const [formSubject, setFormSubject] = useState('math');
  const [formLoai, setFormLoai] = useState('');
  const [formBai, setFormBai] = useState(1);
  const [formHam, setFormHam] = useState<HamNguyenTo>('thach');

  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    await fetchTextbookMappings();
    setIsLoading(false);
  };

  const filteredMappings = useMemo(() => {
    return textbookMappings.filter(m => {
      const matchSearch = m.categoryKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.loai.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSubject = subjectFilter === 'all' || m.subject === subjectFilter;
      return matchSearch && matchSubject;
    });
  }, [textbookMappings, searchQuery, subjectFilter]);

  const openAddForm = () => {
    setEditingKey(null);
    setFormCategoryKey('');
    setFormSubject('math');
    setFormLoai('');
    setFormBai(1);
    setFormHam('thach');
    setIsFormOpen(true);
  };

  const openEditForm = (m: TextbookMapping) => {
    setEditingKey(m.categoryKey);
    setFormCategoryKey(m.categoryKey);
    setFormSubject(m.subject);
    setFormLoai(m.loai);
    setFormBai(m.bai);
    setFormHam(m.ham);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCategoryKey.trim() || !formLoai.trim() || !formHam) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const payload: TextbookMapping = {
      categoryKey: formCategoryKey.trim().toLowerCase(),
      subject: formSubject,
      loai: formLoai.trim(),
      bai: Number(formBai),
      ham: formHam,
    };

    setIsLoading(true);
    let success = false;
    if (editingKey) {
      success = await updateTextbookMapping(editingKey, payload);
    } else {
      success = await addTextbookMapping(payload);
    }
    setIsLoading(false);

    if (success) {
      setIsFormOpen(false);
    }
  };

  const handleDelete = async (key: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa cấu hình ánh xạ SGK cho "${key}" không?`)) {
      return;
    }
    setIsLoading(true);
    await deleteTextbookMapping(key);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-900/60 p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-synth-cyan/15 flex items-center justify-center border border-synth-cyan/35 text-synth-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-black text-white uppercase tracking-wider">
              Phòng IT — Quản lý Cấu hình SGK
            </h2>
            <p className="text-xs text-synth-text-muted mt-1 leading-relaxed">
              Cấu hình ánh xạ các chuyên đề (Category) trong câu hỏi sang Chương trình học SGK chuẩn động 100% từ Database.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
            title="Đồng bộ lại"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={openAddForm}
            className="px-4 py-2.5 rounded-xl bg-synth-magenta hover:bg-synth-magenta/90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(255,0,127,0.3)] hover:shadow-[0_0_20px_rgba(255,0,127,0.5)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Thêm Ánh Xạ SGK
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo Category Key hoặc Loại SGK (ví dụ: math-quadratic, Đại số)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/5 bg-slate-900/40 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-synth-cyan focus:bg-slate-900/60 transition-all"
          />
        </div>

        {/* Filter Subject */}
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-3 rounded-2xl border border-white/5 bg-slate-900/40 text-slate-300 text-xs cursor-pointer focus:outline-none focus:border-synth-cyan transition-all"
        >
          <option value="all">Tất cả môn phái</option>
          {Object.entries(SUBJECTS_CONFIG).map(([subId, cfg]) => (
            <option key={subId} value={subId}>Môn {cfg.name} {cfg.icon}</option>
          ))}
        </select>
      </div>

      {/* Main Form Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[160] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel border-synth-magenta/30 bg-slate-900/90 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-orbitron font-black text-white uppercase tracking-wider border-b border-white/5 pb-3">
              {editingKey ? 'Cập Nhật Cấu Hình Ánh Xạ' : 'Tạo Ánh Xạ SGK Mới'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Category Key */}
              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Category Key (Kebab Case)</span>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: math-quadratic-function"
                  disabled={!!editingKey}
                  value={formCategoryKey}
                  onChange={(e) => setFormCategoryKey(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-black/40 text-slate-200 outline-none focus:border-synth-cyan disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </label>

              {/* Subject */}
              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Môn phái (Subject)</span>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-black/40 text-slate-200 outline-none focus:border-synth-cyan cursor-pointer"
                >
                  {Object.entries(SUBJECTS_CONFIG).map(([subId, cfg]) => (
                    <option key={subId} value={subId}>{cfg.name}</option>
                  ))}
                </select>
              </label>

              {/* Loại */}
              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Loại chương trình (Phân mục SGK)</span>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đại số, Hình học và Đo lường, Ngữ pháp..."
                  value={formLoai}
                  onChange={(e) => setFormLoai(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-black/40 text-slate-200 outline-none focus:border-synth-cyan"
                />
              </label>

              {/* Bài số */}
              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Bài số (Thứ tự chương/bài)</span>
                <input
                  type="number"
                  required
                  min="1"
                  value={formBai}
                  onChange={(e) => setFormBai(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-black/40 text-slate-200 outline-none focus:border-synth-cyan"
                />
              </label>

              {/* Hầm Nguyên Tố */}
              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Hầm Nguyên Tố phân loại</span>
                <select
                  value={formHam}
                  onChange={(e) => setFormHam(e.target.value as HamNguyenTo)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-black/40 text-slate-200 outline-none focus:border-synth-cyan cursor-pointer"
                >
                  {Object.entries(DUNGEONS_CONFIG).map(([hamKey, cfg]) => (
                    <option key={hamKey} value={hamKey}>
                      {cfg.label}
                    </option>
                  ))}
                </select>
              </label>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase tracking-wider transition-colors cursor-pointer border border-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2.5 rounded-xl bg-synth-magenta hover:bg-synth-magenta/90 text-white font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                >
                  {editingKey ? 'Cập Nhật' : 'Tạo Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mappings Table */}
      <div className="bg-slate-900/40 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-synth-text-muted border-b border-white/5 font-orbitron uppercase tracking-wider font-bold">
                <th className="p-4 pl-6">Category Key</th>
                <th className="p-4">Môn Học</th>
                <th className="p-4">Phân Mục SGK</th>
                <th className="p-4 text-center">Bài Số</th>
                <th className="p-4">Hầm Nguyên Tố</th>
                <th className="p-4 pr-6 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredMappings.length > 0 ? (
                filteredMappings.map((m) => {
                  const subCfg = SUBJECTS_CONFIG[m.subject as keyof typeof SUBJECTS_CONFIG];
                  const dCfg = DUNGEONS_CONFIG[m.ham];
                  return (
                    <tr
                      key={m.categoryKey}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-4 pl-6 font-mono font-semibold text-synth-cyan">
                        {m.categoryKey}
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                          {subCfg?.icon || '📚'} {subCfg?.name || m.subject}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-slate-300">{m.loai}</td>
                      <td className="p-4 text-center font-bold text-slate-200">{m.bai}</td>
                      <td className="p-4">
                        {dCfg ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold ${dCfg.bg}`}>
                            {dCfg.label}
                          </span>
                        ) : (
                          <span className="text-slate-400">{m.ham}</span>
                        )}
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditForm(m)}
                            className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:border-synth-cyan/40 hover:bg-synth-cyan/15 text-slate-300 hover:text-synth-cyan cursor-pointer transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(m.categoryKey)}
                            className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:border-red-500/40 hover:bg-red-500/15 text-slate-300 hover:text-red-400 cursor-pointer transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500 font-semibold space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-sm">Không tìm thấy cấu hình ánh xạ SGK nào.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
