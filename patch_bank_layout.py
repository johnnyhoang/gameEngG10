from pathlib import Path
root = Path(r'D:\Hoa Hoang\Apps\gameEngG10')

# Patch help topics in useGameState.ts
p = root / 'src/hooks/useGameState.ts'
t = p.read_text(encoding='utf-8')
old = """  'parent-console': {
    title: 'Hướng dẫn sử dụng Bảng Quản Trị',
    bullets: [
      '• Tab Thành viên: Hiển thị danh sách các con. Nhấp "Xem Hoạt Động" để xem chi tiết tiến trình học, biểu đồ năng lực, trạng thái pet và 50 lịch sử gần nhất.',
      '• Duyệt đổi quà: Phê duyệt nhanh các món quà con gửi yêu cầu ngay trong bảng Xem Hoạt Động.',
      '• AI Ingest: Nơi ba mẹ tự biên soạn hoặc nạp thêm ngân hàng câu hỏi mới cho con làm bài.'
    ]
  },
  streak: {
"""
new = """  'parent-console': {
    title: 'Hướng dẫn sử dụng Bảng Quản Trị',
    bullets: [
      '• Tab Thành viên: Hiển thị danh sách các con. Nhấp "Xem Hoạt Động" để xem chi tiết tiến trình học, biểu đồ năng lực, trạng thái pet và 50 lịch sử gần nhất.',
      '• Tab Ngân hàng: Có bộ đếm theo loại câu, theo part, theo chuyên đề và nút mở help cho từng môn.',
      '• Duyệt đổi quà: Phê duyệt nhanh các món quà con gửi yêu cầu ngay trong bảng Xem Hoạt Động.',
      '• AI Ingest: Nơi ba mẹ tự biên soạn hoặc nạp thêm ngân hàng câu hỏi mới cho con làm bài.'
    ]
  },
  'bank-structure': {
    title: 'Cách đọc ngân hàng câu hỏi',
    bullets: [
      '• Mỗi câu nên có subject, category và metadata để UI lọc đúng dạng.',
      '• examPart dùng để chia đề theo phần / bài; answerMode cho biết cách chấm.',
      '• solutionStyle và solutionSteps là khung chấm điểm nhanh cho CRUD và AI.'
    ]
  },
  'math-bank': {
    title: 'Dạng Toán & cách chấm',
    bullets: [
      '• Giữ đủ 8 bài: đồ thị, Viète, hàm bậc nhất, tăng trưởng %, giảm giá, thể tích dâng nước, mua hàng khuyến mãi, hình học chứng minh.',
      '• Bài nhiều ý nên dùng answerMode = multi-part và subparts = [a, b, c].',
      '• proof / diagram nên có solutionSteps rõ từng ý để chấm rubric không lệch.'
    ]
  },
  'english-bank': {
    title: 'Dạng Tiếng Anh',
    bullets: [
      '• Part I là MCQ: grammar, vocabulary, pronunciation, stress, communication, signs.',
      '• Part II - III nên gắn guided-cloze hoặc reading để lọc đúng bài đọc.',
      '• Part IV - VI nên lưu word-form, rearrangement, transformation và các đáp án chấp nhận được.'
    ]
  },
  'literature-bank': {
    title: 'Dạng Ngữ văn',
    bullets: [
      '• Tách rõ reading, tiếng Việt, nghị luận xã hội và nghị luận văn học.',
      '• Bài đọc hiểu nên lưu textGenre và literatureTask để lọc đúng câu hỏi.',
      '• Bài nghị luận nên dùng solutionSteps + correctAnswer dạng rubric để chấm từng ý.'
    ]
  },
  rubric: {
    title: 'Cách trình bày và chấm điểm',
    bullets: [
      '• Bố cục rõ: mở bài, thân bài, kết luận hoặc từng ý a/b/c.',
      '• Ghi đủ bước biến đổi, công thức, và đơn vị để AI chấm không phải đoán.',
      '• Ưu tiên answerMode phù hợp: short-answer cho đáp số, proof cho chứng minh, multi-part cho bài phân hóa.'
    ]
  },
  streak: {
"""
if old not in t:
    raise SystemExit('parent-console help block not found')
t = t.replace(old, new)
p.write_text(t, encoding='utf-8')

# Patch ParentConsole imports and derived stats/help section
p = root / 'src/components/ParentConsole.tsx'
t = p.read_text(encoding='utf-8')
if "useMemo" not in t.splitlines()[0]:
    t = t.replace("import React, { useEffect, useState } from 'react';", "import React, { useEffect, useMemo, useState } from 'react';")

anchor = """
  // Active Data bindings: if viewing a student, use their loaded data. Otherwise fall back to parent.
  const activeRewards = selectedStudentProfile?.rewards || [];

  if (!isUnlocked) {
"""
insert = """
  // Active Data bindings: if viewing a student, use their loaded data. Otherwise fall back to parent.
  const activeRewards = selectedStudentProfile?.rewards || [];

  const typeCounts = useMemo(() => {
    return questions.reduce((acc: Record<string, number>, q) => {
      acc[q.type] = (acc[q.type] || 0) + 1;
      return acc;
    }, {});
  }, [questions]);

  const examPartCounts = useMemo(() => {
    return questions.reduce((acc: Record<string, number>, q) => {
      const key = q.metadata?.examPart || 'Chưa gắn part';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [questions]);

  const mathTopicCounts = useMemo(() => {
    return questions
      .filter(q => q.subject === 'math')
      .reduce((acc: Record<string, number>, q) => {
        const key = q.metadata?.mathTopic || q.category || 'mixed';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
  }, [questions]);

  const englishTaskCounts = useMemo(() => {
    return questions
      .filter(q => q.subject === 'english' || !q.subject)
      .reduce((acc: Record<string, number>, q) => {
        const key = q.metadata?.englishTask || q.category || 'grammar';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
  }, [questions]);

  const literatureTaskCounts = useMemo(() => {
    return questions
      .filter(q => q.subject === 'literature')
      .reduce((acc: Record<string, number>, q) => {
        const key = q.metadata?.literatureTask || q.category || 'reading';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
  }, [questions]);

  const topTypeEntries = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const topExamParts = Object.entries(examPartCounts).sort((a, b) => b[1] - a[1]);
  const topMathTopics = Object.entries(mathTopicCounts).sort((a, b) => b[1] - a[1]);
  const topEnglishTasks = Object.entries(englishTaskCounts).sort((a, b) => b[1] - a[1]);
  const topLiteratureTasks = Object.entries(literatureTaskCounts).sort((a, b) => b[1] - a[1]);

  if (!isUnlocked) {
"""
if anchor not in t:
    raise SystemExit('parent-console anchor not found')
t = t.replace(anchor, insert)

# Replace stats block with richer stats + help cards
old_stats = """            {/* Thống kê ngân hàng câu hỏi */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-synth-gray/10 p-4 rounded-xl border border-white/5">
              <div className="space-y-1">
                <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Tổng số câu hỏi</span>
                <span className="text-xl font-black text-synth-cyan font-orbitron">{questions.length}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Theo môn học</span>
                <div className="text-[11px] text-white space-y-0.5">
                  <div>🇬🇧 Tiếng Anh: <span className="font-bold text-synth-cyan">{questions.filter(q => !q.subject || q.subject === 'english').length}</span></div>
                  <div>📐 Toán học: <span className="font-bold text-synth-magenta">{questions.filter(q => q.subject === 'math').length}</span></div>
                  <div>✍️ Ngữ văn: <span className="font-bold text-synth-orange">{questions.filter(q => q.subject === 'literature').length}</span></div>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Độ khó trung bình</span>
                <span className="text-xl font-black text-synth-orange font-orbitron">
                  {(questions.reduce((sum, q) => sum + q.difficulty, 0) / questions.length || 0).toFixed(1)}/10
                </span>
                <span className="text-[9px] text-synth-text-muted block">
                  Dễ: {questions.filter(q => q.difficulty <= 4).length} | T.Bình: {questions.filter(q => q.difficulty >= 5 && q.difficulty <= 7).length} | Khó: {questions.filter(q => q.difficulty >= 8).length}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Dạng câu hỏi</span>
                <div className="text-[11px] text-white space-y-0.5">
                  <div>Trắc nghiệm: <span className="font-bold text-synth-cyan">{questions.filter(q => q.type === 'mcq').length}</span></div>
                  <div>Tự luận ngắn: <span className="font-bold text-synth-magenta">{questions.filter(q => q.type === 'short-answer').length}</span></div>
                  <div>Chứng minh: <span className="font-bold text-synth-orange">{questions.filter(q => q.type === 'proof').length}</span></div>
                  <div>Nhiều ý: <span className="font-bold text-synth-green">{questions.filter(q => q.type === 'multi-part').length}</span></div>
                </div>
              </div>
            </div>
"""
new_stats = """            {/* Thống kê ngân hàng câu hỏi */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-synth-gray/10 p-4 rounded-xl border border-white/5">
                <div className="space-y-1">
                  <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Tổng số câu hỏi</span>
                  <span className="text-xl font-black text-synth-cyan font-orbitron">{questions.length}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Theo môn học</span>
                  <div className="text-[11px] text-white space-y-0.5">
                    <div>🇬🇧 Tiếng Anh: <span className="font-bold text-synth-cyan">{questions.filter(q => !q.subject || q.subject === 'english').length}</span></div>
                    <div>📐 Toán học: <span className="font-bold text-synth-magenta">{questions.filter(q => q.subject === 'math').length}</span></div>
                    <div>✍️ Ngữ văn: <span className="font-bold text-synth-orange">{questions.filter(q => q.subject === 'literature').length}</span></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Độ khó trung bình</span>
                  <span className="text-xl font-black text-synth-orange font-orbitron">
                    {(questions.reduce((sum, q) => sum + q.difficulty, 0) / questions.length || 0).toFixed(1)}/10
                  </span>
                  <span className="text-[9px] text-synth-text-muted block">
                    Dễ: {questions.filter(q => q.difficulty <= 4).length} | T.Bình: {questions.filter(q => q.difficulty >= 5 && q.difficulty <= 7).length} | Khó: {questions.filter(q => q.difficulty >= 8).length}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Dạng câu hỏi</span>
                  <div className="text-[11px] text-white space-y-0.5">
                    <div>Trắc nghiệm: <span className="font-bold text-synth-cyan">{questions.filter(q => q.type === 'mcq').length}</span></div>
                    <div>Tự luận ngắn: <span className="font-bold text-synth-magenta">{questions.filter(q => q.type === 'short-answer').length}</span></div>
                    <div>Chứng minh: <span className="font-bold text-synth-orange">{questions.filter(q => q.type === 'proof').length}</span></div>
                    <div>Nhiều ý: <span className="font-bold text-synth-green">{questions.filter(q => q.type === 'multi-part').length}</span></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-cyan">Đếm theo dạng</span>
                    <button onClick={() => showHelp('bank-structure')} className="text-[10px] px-2 py-1 rounded bg-white/5 text-white hover:bg-white/10">Help</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topTypeEntries.map(([type, count]) => (
                      <span key={type} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase text-white border border-white/5">
                        {type}: <span className="text-synth-cyan">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-green">Đếm theo part</span>
                    <button onClick={() => showHelp('rubric')} className="text-[10px] px-2 py-1 rounded bg-white/5 text-white hover:bg-white/10">Rubric</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topExamParts.map(([part, count]) => (
                      <span key={part} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase text-white border border-white/5">
                        {part}: <span className="text-synth-green">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-orange">Hướng dẫn nhanh</span>
                    <button onClick={() => showHelp('parent-console')} className="text-[10px] px-2 py-1 rounded bg-white/5 text-white hover:bg-white/10">Console</button>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <button onClick={() => showHelp('math-bank')} className="px-2.5 py-1 rounded-full bg-synth-magenta/15 text-synth-magenta font-bold uppercase">Toán</button>
                    <button onClick={() => showHelp('english-bank')} className="px-2.5 py-1 rounded-full bg-synth-cyan/15 text-synth-cyan font-bold uppercase">Anh</button>
                    <button onClick={() => showHelp('literature-bank')} className="px-2.5 py-1 rounded-full bg-synth-orange/15 text-synth-orange font-bold uppercase">Văn</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-magenta">Toán theo topic</span>
                    <span className="text-[10px] text-synth-text-muted">{questions.filter(q => q.subject === 'math').length} câu</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topMathTopics.map(([topic, count]) => (
                      <span key={topic} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase text-white border border-white/5">
                        {MATH_TOPIC_LABELS[topic] || topic}: <span className="text-synth-magenta">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-cyan">Anh theo task</span>
                    <span className="text-[10px] text-synth-text-muted">{questions.filter(q => !q.subject || q.subject === 'english').length} câu</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topEnglishTasks.map(([task, count]) => (
                      <span key={task} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase text-white border border-white/5">
                        {ENGLISH_TASK_LABELS[task] || task}: <span className="text-synth-cyan">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-orange">Văn theo task</span>
                    <span className="text-[10px] text-synth-text-muted">{questions.filter(q => q.subject === 'literature').length} câu</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topLiteratureTasks.map(([task, count]) => (
                      <span key={task} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase text-white border border-white/5">
                        {LITERATURE_TASK_LABELS[task] || task}: <span className="text-synth-orange">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
"""
if old_stats not in t:
    raise SystemExit('stats block not found')
t = t.replace(old_stats, new_stats)

# Add solution style badge next to answer mode in question cards
old_badge = """                          {q.metadata?.answerMode && (
                            <span className=\"text-[10px] px-2 py-0.5 rounded bg-white/5 text-white font-bold uppercase font-orbitron\">
                              {(q.subject === 'literature' ? LITERATURE_ANSWER_MODE_LABELS : q.subject === 'english' ? ENGLISH_ANSWER_MODE_LABELS : MATH_ANSWER_MODE_LABELS)[q.metadata.answerMode] || q.metadata.answerMode}
                            </span>
                          )}
"""
new_badge = """                          {q.metadata?.answerMode && (
                            <span className=\"text-[10px] px-2 py-0.5 rounded bg-white/5 text-white font-bold uppercase font-orbitron\">
                              {(q.subject === 'literature' ? LITERATURE_ANSWER_MODE_LABELS : q.subject === 'english' ? ENGLISH_ANSWER_MODE_LABELS : MATH_ANSWER_MODE_LABELS)[q.metadata.answerMode] || q.metadata.answerMode}
                            </span>
                          )}
                          {q.metadata?.solutionStyle && (
                            <span className=\"text-[10px] px-2 py-0.5 rounded bg-synth-green/15 text-synth-green font-bold uppercase font-orbitron\">
                              {q.metadata.solutionStyle}
                            </span>
                          )}
"""
if old_badge not in t:
    raise SystemExit('answerMode badge block not found')
t = t.replace(old_badge, new_badge)

p.write_text(t, encoding='utf-8')
