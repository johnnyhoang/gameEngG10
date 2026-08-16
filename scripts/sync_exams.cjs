const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\Minh Anh\\Minh Anh 9\\Đề Toán';
const destDir = path.join(__dirname, '..', 'public', 'documents', 'exams', 'math', 'grade-9');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Map trường học
const SCHOOL_MAP = {
  '01_THCS_Tran_Dai_Nghia': { name: 'THCS Chuyên Trần Đại Nghĩa', district: 'Quận 1' },
  '02_THCS_Nguyen_Van_To': { name: 'THCS Nguyễn Văn Tố', district: 'Quận 10' },
  '03_THCS_Tran_Quoc_Toan_1': { name: 'THCS Trần Quốc Toản 1', district: 'TP. Thủ Đức' },
  '04_THCS_Hoa_Lu': { name: 'THCS Hoa Lư', district: 'TP. Thủ Đức' },
  '05_THCS_Nguyen_Du': { name: 'THCS Nguyễn Du', district: 'Quận 1' },
  '06_THCS_Le_Quy_Don': { name: 'THCS Lê Quý Đôn', district: 'Quận 3' },
  '07_THCS_Colette': { name: 'THCS Colette', district: 'Quận 3' },
  '08_THCS_Hong_Bang': { name: 'THCS Hồng Bàng', district: 'Quận 5' },
  '09_THCS_Tran_Van_On': { name: 'THCS Trần Văn Ơn', district: 'Quận 1' },
  '10_THCS_Hai_Ba_Trung': { name: 'THCS Hai Bà Trưng', district: 'Quận 3' },
  '11_THCS_Kim_Dong': { name: 'THCS Kim Đồng', district: 'Quận 5' },
  '12_THCS_Vo_Truong_Toan': { name: 'THCS Võ Trường Toản', district: 'Quận 1' },
  '13_THCS_Bach_Dang': { name: 'THCS Bạch Đằng', district: 'Quận 3' },
  '14_THCS_Nguyen_Gia_Thieu': { name: 'THCS Nguyễn Gia Thiều', district: 'Quận Tân Bình' },
  '15_THCS_Truong_Chinh': { name: 'THCS Trường Chinh', district: 'Quận Tân Bình' },
  '16_THCS_Nguyen_Huu_Tho': { name: 'THCS Nguyễn Hữu Thọ', district: 'Quận 7' },
  '17_THCS_Dong_Khoi': { name: 'THCS Đồng Khởi', district: 'Quận Tân Phú' },
  '18_THCS_Chu_Van_An': { name: 'THCS Chu Văn An', district: 'Quận 11' },
  '19_THCS_Tran_Huy_Lieu': { name: 'THCS Trần Huy Liệu', district: 'Quận Phú Nhuận' },
  '20_THCS_Hau_Giang': { name: 'THCS Hậu Giang', district: 'Quận 6' },
};

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  return Math.round(bytes / 1024) + ' KB';
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.toLowerCase().endsWith('.pdf')) {
      arrayOfFiles.push({
        fullPath,
        fileName: file,
        dirName: path.basename(dirPath),
        sizeBytes: fs.statSync(fullPath).size
      });
    }
  });
  return arrayOfFiles;
}

const allPdfFiles = getAllFiles(srcDir);
console.log(`Found ${allPdfFiles.length} PDF files in source directory.`);

// Copy all files to destDir with safe filenames
allPdfFiles.forEach(item => {
  const safeName = item.fileName.replace(/\s+-\s+/g, '_').replace(/\s+/g, '_');
  const destPath = path.join(destDir, safeName);
  fs.copyFileSync(item.fullPath, destPath);
  item.safeName = safeName;
  item.destUrl = `/documents/exams/math/grade-9/${safeName}`;
});

// Group by exams
const examMap = new Map();

// Helper to determine category
function getCategoryInfo(str) {
  const s = str.toLowerCase();
  if (s.includes('giua_hk1') || s.includes('giữa_hk1') || s.includes('giua_hoc_ky_1') || s.includes('giữa_học_kỳ_1')) {
    return { category: 'mid_hk1', categoryName: 'Giữa Học Kỳ 1' };
  }
  if (s.includes('giua_hk2') || s.includes('giữa_hk2') || s.includes('giua_hoc_ky_2') || s.includes('giữa_học_kỳ_2')) {
    return { category: 'mid_hk2', categoryName: 'Giữa Học Kỳ 2' };
  }
  if (s.includes('hk2') || s.includes('học_kỳ_2') || s.includes('hoc_ky_2')) {
    return { category: 'final_hk2', categoryName: 'Cuối Học Kỳ 2' };
  }
  if (s.includes('hk1') || s.includes('học_kỳ_1') || s.includes('hoc_ky_1')) {
    return { category: 'final_hk1', categoryName: 'Cuối Học Kỳ 1' };
  }
  if (s.includes('tuyen_sinh') || s.includes('tuyensinh') || s.includes('lop_10')) {
    return { category: 'entrance_10', categoryName: 'Tuyển Sinh Lớp 10' };
  }
  return { category: 'topic_review', categoryName: 'Ôn Tập Tổng Hợp' };
}

allPdfFiles.forEach(f => {
  const name = f.safeName;
  const isSolution = name.startsWith('Loi_Giai_Chi_Tiet_') || name.startsWith('Dap_An_');
  
  // Extract key to pair exam and solution
  let key = name;
  if (name.startsWith('De_Thi_')) {
    key = name.replace('De_Thi_', '');
  } else if (name.startsWith('Loi_Giai_Chi_Tiet_')) {
    key = name.replace('Loi_Giai_Chi_Tiet_', '');
  } else if (name.startsWith('Dap_An_')) {
    key = name.replace('Dap_An_', '');
  }

  // Base key normalization
  key = key.replace(/\.pdf$/i, '');

  if (!examMap.has(key)) {
    const schoolInfo = SCHOOL_MAP[f.dirName] || {};
    const catInfo = getCategoryInfo(name);

    let title = '';
    if (schoolInfo.name) {
      title = `Đề Thi ${catInfo.categoryName} Toán 9 — ${schoolInfo.name}`;
    } else if (name.includes('TriDuc')) {
      title = `Đề Ôn Tập ${catInfo.categoryName} Toán 9 — Trường Trí Đức`;
      if (name.includes('002')) title += ' (Đề 02)';
      else title += ' (Đề 01)';
    } else if (name.includes('De_1')) {
      title = `Bộ Đề Ôn Thi ${catInfo.categoryName} Toán 9 — Đề Mẫu Số 1`;
    } else if (name.includes('De_2')) {
      title = `Bộ Đề Ôn Thi ${catInfo.categoryName} Toán 9 — Đề Mẫu Số 2`;
    } else if (name.includes('De_3')) {
      title = `Bộ Đề Ôn Thi ${catInfo.categoryName} Toán 9 — Đề Mẫu Số 3`;
    } else if (name.includes('De_4')) {
      title = `Bộ Đề Ôn Thi ${catInfo.categoryName} Toán 9 — Đề Mẫu Số 4`;
    } else {
      title = `Đề Thi ${catInfo.categoryName} Toán 9 — ${key.replace(/_/g, ' ')}`;
    }

    examMap.set(key, {
      id: `math-9-${key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      title,
      subjectId: 'math',
      gradeTier: '9',
      category: catInfo.category,
      categoryName: catInfo.categoryName,
      schoolName: schoolInfo.name || (name.includes('TriDuc') ? 'Trường Trí Đức' : undefined),
      district: schoolInfo.district,
      province: 'TP. Hồ Chí Minh',
      year: '2024 - 2025',
      examPdfUrl: '',
      solutionPdfUrl: undefined,
      fileSizeExam: undefined,
      fileSizeSolution: undefined,
      hasSolution: false,
      description: `Tài liệu ôn thi môn Toán Lớp 9 (${catInfo.categoryName}) ${schoolInfo.name ? 'trường ' + schoolInfo.name : ''} bám sát cấu trúc chương trình.`,
    });
  }

  const exam = examMap.get(key);
  if (isSolution) {
    exam.solutionPdfUrl = f.destUrl;
    exam.fileSizeSolution = formatSize(f.sizeBytes);
    exam.hasSolution = true;
  } else {
    exam.examPdfUrl = f.destUrl;
    exam.fileSizeExam = formatSize(f.sizeBytes);
  }
});

// Convert map to array
const examList = Array.from(examMap.values()).filter(e => e.examPdfUrl);
console.log(`Generated ${examList.length} complete exam records.`);

// Sort exam list: final_hk1, mid_hk1, final_hk2, mid_hk2, entrance_10, topic_review
const order = { mid_hk1: 1, final_hk1: 2, mid_hk2: 3, final_hk2: 4, entrance_10: 5, gifted: 6, topic_review: 7 };
examList.sort((a, b) => (order[a.category] || 99) - (order[b.category] || 99));

const content = `import type { ReferenceExam, ExamCategoryMeta, ExamCategoryType } from '../types/referenceExam';

export const EXAM_CATEGORIES: ExamCategoryMeta[] = [
  { id: 'all', label: 'Tất Cả', icon: '📂', colorClass: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  { id: 'mid_hk1', label: 'Giữa Học Kỳ 1', icon: '📝', colorClass: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30' },
  { id: 'final_hk1', label: 'Cuối Học Kỳ 1', icon: '🎯', colorClass: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30' },
  { id: 'mid_hk2', label: 'Giữa Học Kỳ 2', icon: '📑', colorClass: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30' },
  { id: 'final_hk2', label: 'Cuối Học Kỳ 2', icon: '🏆', colorClass: 'from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30' },
  { id: 'entrance_10', label: 'Tuyển Sinh Lớp 10', icon: '🚀', colorClass: 'from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/30' },
  { id: 'gifted', label: 'Học Sinh Giỏi / Chuyên', icon: '⭐', colorClass: 'from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30' },
  { id: 'topic_review', label: 'Ôn Tập Tổng Hợp', icon: '💡', colorClass: 'from-cyan-500/20 to-sky-500/20 text-sky-400 border-sky-500/30' },
];

export const REFERENCE_EXAMS: ReferenceExam[] = ${JSON.stringify(examList, null, 2)};

/**
 * Lọc danh sách đề tham khảo theo ngữ cảnh môn học, khối lớp, nhóm kỳ thi và từ khóa
 */
export function filterReferenceExams(
  exams: ReferenceExam[],
  filters: {
    subjectId?: string;
    gradeTier?: string;
    category?: ExamCategoryType | 'all';
    searchQuery?: string;
  }
): ReferenceExam[] {
  return exams.filter(exam => {
    if (filters.subjectId && exam.subjectId !== filters.subjectId) {
      return false;
    }
    if (filters.gradeTier && exam.gradeTier !== String(filters.gradeTier)) {
      return false;
    }
    if (filters.category && filters.category !== 'all' && exam.category !== filters.category) {
      return false;
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchTitle = exam.title.toLowerCase().includes(q);
      const matchSchool = exam.schoolName?.toLowerCase().includes(q);
      const matchDistrict = exam.district?.toLowerCase().includes(q);
      const matchDesc = exam.description?.toLowerCase().includes(q);
      if (!matchTitle && !matchSchool && !matchDistrict && !matchDesc) {
        return false;
      }
    }
    return true;
  });
}
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'referenceExamsData.ts');
fs.writeFileSync(outputPath, content, 'utf8');
console.log(`Saved updated referenceExamsData.ts to ${outputPath}`);
