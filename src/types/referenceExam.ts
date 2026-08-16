export type ExamCategoryType =
  | 'mid_hk1'        // Kiểm tra Giữa Học kỳ 1
  | 'final_hk1'      // Kiểm tra Cuối Học kỳ 1
  | 'mid_hk2'        // Kiểm tra Giữa Học kỳ 2
  | 'final_hk2'      // Kiểm tra Cuối Học kỳ 2
  | 'entrance_10'    // Tuyển sinh vào Lớp 10
  | 'gifted'         // Học sinh giỏi / Chuyên
  | 'topic_review';  // Ôn tập theo chuyên đề

export interface ReferenceExam {
  id: string;
  title: string;
  subjectId: string;
  gradeTier: string;
  category: ExamCategoryType;
  categoryName: string;
  schoolName?: string;
  district?: string;
  province?: string;
  year?: string;
  examPdfUrl: string;
  solutionPdfUrl?: string;
  fileSizeExam?: string;
  fileSizeSolution?: string;
  hasSolution: boolean;
  totalViews?: number;
  totalDownloads?: number;
  description?: string;
}

export interface ExamCategoryMeta {
  id: ExamCategoryType | 'all';
  label: string;
  icon: string;
  colorClass: string;
}
