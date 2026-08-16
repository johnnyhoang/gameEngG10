const fs = require('fs');
const path = require('path');

const BASE_SRC = 'D:\\Minh Anh\\Minh Anh 9';
const PUBLIC_EXAMS_DIR = path.join(__dirname, '..', 'public', 'documents', 'exams');

const SUBJECT_CONFIGS = [
  {
    folderName: 'Đề Toán',
    subjectId: 'math',
    subjectName: 'Toán',
    icon: '📐',
    destSubdir: 'math/grade-9',
  },
  {
    folderName: 'Đề Văn',
    subjectId: 'literature',
    subjectName: 'Ngữ Văn',
    icon: '📜',
    destSubdir: 'literature/grade-9',
  },
  {
    folderName: 'Đề Tiếng Anh',
    subjectId: 'english',
    subjectName: 'Tiếng Anh',
    icon: '🌍',
    destSubdir: 'english/grade-9',
  },
  {
    folderName: 'Đề KHTN',
    subjectId: 'science',
    subjectName: 'Khoa Học Tự Nhiên',
    icon: '🧪',
    destSubdir: 'science/grade-9',
  },
];

// Map 20 trường THCS TP.HCM
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

function getAllPdfFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const entries = fs.readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllPdfFiles(fullPath, arrayOfFiles);
    } else if (entry.toLowerCase().endsWith('.pdf')) {
      arrayOfFiles.push({
        fullPath,
        fileName: entry,
        dirName: path.basename(dirPath),
        sizeBytes: stat.size,
      });
    }
  }
  return arrayOfFiles;
}

// Phân loại kỳ thi
function getCategoryInfo(str) {
  const s = str.toLowerCase();
  if (s.includes('giua_hk1') || s.includes('giữa_hk1') || s.includes('giua_hoc_ky_1') || s.includes('giữa_học_kỳ_1') || s.includes('ghk1')) {
    return { category: 'mid_hk1', categoryName: 'Giữa Học Kỳ 1' };
  }
  if (s.includes('giua_hk2') || s.includes('giữa_hk2') || s.includes('giua_hoc_ky_2') || s.includes('giữa_học_kỳ_2') || s.includes('ghk2')) {
    return { category: 'mid_hk2', categoryName: 'Giữa Học Kỳ 2' };
  }
  if (s.includes('hk2') || s.includes('học_kỳ_2') || s.includes('hoc_ky_2')) {
    return { category: 'final_hk2', categoryName: 'Cuối Học Kỳ 2' };
  }
  if (s.includes('hk1') || s.includes('học_kỳ_1') || s.includes('hoc_ky_1')) {
    return { category: 'final_hk1', categoryName: 'Cuối Học Kỳ 1' };
  }
  if (s.includes('ca_nam') || s.includes('cả_năm')) {
    return { category: 'final_hk2', categoryName: 'Cuối Học Kỳ 2' };
  }
  if (s.includes('tuyen_sinh') || s.includes('tuyensinh') || s.includes('lop_10') || s.includes('tuyensinh10')) {
    return { category: 'entrance_10', categoryName: 'Tuyển Sinh Lớp 10' };
  }
  return { category: 'topic_review', categoryName: 'Ôn Tập Tổng Hợp' };
}

const allExamEntries = [];

SUBJECT_CONFIGS.forEach(sub => {
  const srcDir = path.join(BASE_SRC, sub.folderName);
  const destDir = path.join(PUBLIC_EXAMS_DIR, sub.destSubdir);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const pdfFiles = getAllPdfFiles(srcDir);
  console.log(`\n[${sub.subjectName}] Found ${pdfFiles.length} PDF files in source: ${srcDir}`);

  // Copy và chuẩn hóa tên file
  pdfFiles.forEach(f => {
    const safeName = f.fileName.replace(/\s+-\s+/g, '_').replace(/\s+/g, '_');
    const destPath = path.join(destDir, safeName);
    fs.copyFileSync(f.fullPath, destPath);
    f.safeName = safeName;
    f.destUrl = `/documents/exams/${sub.destSubdir}/${safeName}`;
    f.formattedSize = formatSize(f.sizeBytes);
  });

  // Group pairs
  const examMap = new Map();

  pdfFiles.forEach(f => {
    const name = f.safeName;
    const isSolution = name.startsWith('Loi_Giai_Chi_Tiet_') || name.startsWith('Dap_An_') || name.startsWith('Loi_Giai_');

    let key = name;
    if (name.startsWith('De_Thi_')) {
      key = name.replace('De_Thi_', '');
    } else if (name.startsWith('Loi_Giai_Chi_Tiet_')) {
      key = name.replace('Loi_Giai_Chi_Tiet_', '');
    } else if (name.startsWith('Loi_Giai_')) {
      key = name.replace('Loi_Giai_', '');
    } else if (name.startsWith('Dap_An_')) {
      key = name.replace('Dap_An_', '');
    }
    key = key.replace(/\.pdf$/i, '');

    if (!examMap.has(key)) {
      const schoolInfo = SCHOOL_MAP[f.dirName] || {};
      const catInfo = getCategoryInfo(name);

      let title = '';
      if (schoolInfo.name) {
        title = `Đề Thi ${catInfo.categoryName} ${sub.subjectName} 9 — ${schoolInfo.name}`;
      } else if (name.includes('TriDuc')) {
        title = `Đề Ôn Tập ${catInfo.categoryName} ${sub.subjectName} 9 — Trường Trí Đức`;
        if (name.includes('002')) title += ' (Đề 02)';
        else title += ' (Đề 01)';
      } else if (name.includes('De_1') || name.includes('Đề_1')) {
        title = `Bộ Đề Ôn Thi ${catInfo.categoryName} ${sub.subjectName} 9 — Đề Mẫu Số 1`;
      } else if (name.includes('De_2') || name.includes('Đề_2')) {
        title = `Bộ Đề Ôn Thi ${catInfo.categoryName} ${sub.subjectName} 9 — Đề Mẫu Số 2`;
      } else if (name.includes('De_3') || name.includes('Đề_3')) {
        title = `Bộ Đề Ôn Thi ${catInfo.categoryName} ${sub.subjectName} 9 — Đề Mẫu Số 3`;
      } else if (name.includes('De_4') || name.includes('Đề_4')) {
        title = `Bộ Đề Ôn Thi ${catInfo.categoryName} ${sub.subjectName} 9 — Đề Mẫu Số 4`;
      } else {
        // Tách tên trường từ key nếu có
        let cleanName = key.replace(/_/g, ' ');
        title = `Đề Thi ${catInfo.categoryName} ${sub.subjectName} 9 — ${cleanName}`;
      }

      examMap.set(key, {
        id: `${sub.subjectId}-9-${key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title,
        subjectId: sub.subjectId,
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
        description: `Tài liệu đề thi & hướng dẫn giải môn ${sub.subjectName} Lớp 9 (${catInfo.categoryName}) ${schoolInfo.name ? 'trường ' + schoolInfo.name : ''} tuyển chọn chất lượng cao.`,
      });
    }

    const exam = examMap.get(key);
    if (isSolution) {
      exam.solutionPdfUrl = f.destUrl;
      exam.fileSizeSolution = f.formattedSize;
      exam.hasSolution = true;
    } else {
      exam.examPdfUrl = f.destUrl;
      exam.fileSizeExam = f.formattedSize;
    }
  });

  const subExams = Array.from(examMap.values()).map(e => {
    if (!e.examPdfUrl && e.solutionPdfUrl) {
      e.examPdfUrl = e.solutionPdfUrl;
      e.fileSizeExam = e.fileSizeSolution;
    }
    return e;
  });

  console.log(`[${sub.subjectName}] Created ${subExams.length} complete exam sets.`);
  allExamEntries.push(...subExams);
});

console.log(`\n======================================================`);
console.log(`==== TOTAL: ${allExamEntries.length} EXAM SETS ACROSS ALL SUBJECTS ====`);
console.log(`======================================================`);

// Ghi file referenceExamsData.ts
const codeContent = `import type { ReferenceExam, ExamCategoryMeta } from '../types/referenceExam';

/**
 * Danh mục nhóm kỳ thi chuẩn cho Đề Tham Khảo
 */
export const EXAM_CATEGORIES: ExamCategoryMeta[] = [
  { id: 'all', label: 'Tất Cả Kỳ Thi', icon: '📚', colorClass: 'text-violet-400' },
  { id: 'mid_hk1', label: 'Giữa Học Kỳ 1', icon: '🍂', colorClass: 'text-amber-400' },
  { id: 'final_hk1', label: 'Cuối Học Kỳ 1', icon: '❄️', colorClass: 'text-cyan-400' },
  { id: 'mid_hk2', label: 'Giữa Học Kỳ 2', icon: '🌱', colorClass: 'text-emerald-400' },
  { id: 'final_hk2', label: 'Cuối Học Kỳ 2', icon: '☀️', colorClass: 'text-rose-400' },
  { id: 'entrance_10', label: 'Tuyển Sinh Lớp 10', icon: '🎯', colorClass: 'text-purple-400' },
  { id: 'topic_review', label: 'Ôn Tập Tổng Hợp', icon: '📖', colorClass: 'text-indigo-400' },
];

/**
 * Ngân hàng Đề Thi Tham Khảo PDF nguyên bản
 * Đồng bộ tự động từ thư mục tài liệu lớp 9 (Toán, Ngữ Văn, Tiếng Anh)
 */
export const REFERENCE_EXAMS: ReferenceExam[] = ${JSON.stringify(allExamEntries, null, 2)};

/**
 * Bộ lọc helper cho ReferenceExams
 */
export function filterReferenceExams(
  exams: ReferenceExam[],
  filters: {
    subjectId?: string;
    gradeTier?: string;
    category?: string;
    searchQuery?: string;
  }
): ReferenceExam[] {
  return exams.filter(exam => {
    if (filters.subjectId && exam.subjectId !== filters.subjectId) {
      return false;
    }
    if (filters.gradeTier && exam.gradeTier !== filters.gradeTier) {
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
      const matchCategory = exam.categoryName.toLowerCase().includes(q);
      if (!matchTitle && !matchSchool && !matchDistrict && !matchCategory) {
        return false;
      }
    }
    return true;
  });
}
`;

const targetDataFile = path.join(__dirname, '..', 'src', 'data', 'referenceExamsData.ts');
fs.writeFileSync(targetDataFile, codeContent, 'utf-8');
console.log(`Successfully updated ${targetDataFile}!`);
