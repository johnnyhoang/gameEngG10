import type { SubjectId } from '../types/game';

// Bộ Nội Công Cốt Lõi (Core Knowledge Bank) — CORE_SPECS §9
// Tất cả chuyên đề (Topics) đã được đưa hoàn toàn vào Database (bảng ge10_topics)
// và nạp động thông qua Zustand Store. File này chỉ còn giữ lại helper inferTopicId
// phục vụ cho việc khớp chuyên đề động ở Frontend.

export function inferTopicId(category: string, subjectId?: SubjectId): string {
  const normalizedCategory = category.toLowerCase().trim();
  
  // Ánh xạ nhanh dựa trên từ khóa trong category
  if (normalizedCategory.includes('ngữ pháp') || normalizedCategory.includes('grammar')) return 'eng-grammar';
  if (normalizedCategory.includes('phát âm') || normalizedCategory.includes('pronunciation') || normalizedCategory.includes('trọng âm') || normalizedCategory.includes('stress')) return 'eng-pronunciation';
  if (normalizedCategory.includes('đọc hiểu') || normalizedCategory.includes('reading') || normalizedCategory.includes('điền khuyết') || normalizedCategory.includes('cloze')) return 'eng-reading';
  if (normalizedCategory.includes('viết lại') || normalizedCategory.includes('rewrite') || normalizedCategory.includes('sentence')) return 'eng-rewrite';

  if (normalizedCategory.includes('quadratic') || normalizedCategory.includes('bậc hai') || normalizedCategory.includes('parabol')) return 'math-quadratic';
  if (normalizedCategory.includes('thực tế') || normalizedCategory.includes('modeling') || normalizedCategory.includes('percent')) return 'math-real';
  if (normalizedCategory.includes('hình học phẳng') || normalizedCategory.includes('plane') || normalizedCategory.includes('đường tròn') || normalizedCategory.includes('tam giác')) return 'math-plane';
  if (normalizedCategory.includes('không gian') || normalizedCategory.includes('solid') || normalizedCategory.includes('thể tích')) return 'math-solid';

  if (normalizedCategory.includes('tiếng việt')) return 'lit-vietnamese';
  if (normalizedCategory.includes('đọc hiểu')) return 'lit-reading';
  if (normalizedCategory.includes('nghị luận xã hội') || normalizedCategory.includes('đoạn văn')) return 'lit-essay';
  if (normalizedCategory.includes('nghị luận văn học') || normalizedCategory.includes('tác phẩm')) return 'lit-analysis';

  if (subjectId) {
    if (subjectId === 'science') {
      if (normalizedCategory.includes('vật lý') || normalizedCategory.includes('physics') || normalizedCategory.includes('điện')) return 'sci-physics';
      if (normalizedCategory.includes('hóa học') || normalizedCategory.includes('chemistry')) return 'sci-chemistry';
      return 'sci-biology';
    }
    if (subjectId === 'history_geography') {
      if (normalizedCategory.includes('lịch sử') || normalizedCategory.includes('history')) return 'hist-history';
      return 'hist-geography';
    }
    // Fallback sang chuyên đề mặc định của môn đó
    if (subjectId === 'english') return 'eng-grammar';
    if (subjectId === 'math') return 'math-quadratic';
    if (subjectId === 'literature') return 'lit-reading';
    if (subjectId === 'civics') return 'civ-civics';
    if (subjectId === 'technology') return 'tech-technology';
    if (subjectId === 'informatics') return 'info-informatics';
    if (subjectId === 'arts') return 'arts-arts';
  }
  return 'misc';
}
