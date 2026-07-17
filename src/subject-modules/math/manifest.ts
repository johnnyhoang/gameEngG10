import type { GeometryVisualization, SubjectModule } from '../contracts';
import type { Question } from '../../types/game';

// topicId chuẩn (khớp CORE_KNOWLEDGE_TOPICS) là tín hiệu chính xác nhất — ưu tiên trước khi
// rơi về suy đoán theo category/prompt bên dưới (chỉ dùng cho câu hỏi cũ/nhập tay chưa gắn
// topicId chuẩn).
const SOLID_GEOMETRY_TOPIC_IDS = new Set(['math-solid-geometry-volume', 'math-solid-geometry-3d']);
const PLANE_GEOMETRY_TOPIC_IDS = new Set([
  'math-plane-geometry-circle',
  'math-plane-geometry-triangle',
  'math-plane-geometry-cyclic',
  'math-plane-geometry-coordinates'
]);

function detectGeometryVisualization(question: Question): GeometryVisualization | null {
  if (question.topicId && SOLID_GEOMETRY_TOPIC_IDS.has(question.topicId)) return { is3D: true };
  if (question.topicId && PLANE_GEOMETRY_TOPIC_IDS.has(question.topicId)) return { is3D: false };

  // Fallback suy đoán cho câu hỏi chưa có topicId chuẩn — giữ nguyên logic cũ từng nằm trực
  // tiếp trong PlayArea.tsx, chỉ chuyển vào module Toán để core component không còn chứa
  // nhánh nhận diện riêng của môn Toán.
  const isGeometry = (
    question.topicId?.includes('geometry') ||
    question.topicId?.includes('circle') ||
    question.topicId?.includes('trigonometry') ||
    (question.category || '').toLowerCase().includes('geometry') ||
    (question.prompt || '').toLowerCase().includes('hình học') ||
    (question.prompt || '').toLowerCase().includes('đường tròn')
  );
  if (!isGeometry) return null;

  const is3D = (
    (question.category || '').toLowerCase().includes('real-geometry') ||
    (question.category || '').toLowerCase().includes('space') ||
    (question.metadata?.mathTopic || '').toLowerCase().includes('space') ||
    (question.prompt || '').toLowerCase().includes('hình trụ') ||
    (question.prompt || '').toLowerCase().includes('hình nón') ||
    (question.prompt || '').toLowerCase().includes('hình cầu') ||
    (question.prompt || '').toLowerCase().includes('hình hộp') ||
    (question.prompt || '').toLowerCase().includes('lăng trụ') ||
    (question.prompt || '').toLowerCase().includes('tứ diện') ||
    (question.prompt || '').toLowerCase().includes('hình chóp')
  );
  return { is3D };
}

export const mathSubjectModule: SubjectModule = {
  subjectId: 'math',
  lang: 'vi-VN',
  supportsShortAnswer: true,
  tools: [
    { id: 'handbook3d', title: 'Xưởng Toán Hình 3D', surface: 'learning-hall' },
    { id: 'handbookplane', title: 'Xưởng Toán Hình', surface: 'learning-hall' },
    { id: 'handbookgraph', title: 'Xưởng Toán Đồ Thị', surface: 'learning-hall' },
  ],
  utilities: ['scratchpad'],
  activities: [
    {
      id: 'math-grammar',
      title: 'Phòng Đại Số',
      categories: [],
      modeKey: 'grammar',
      label: 'Phòng Đại Số',
      icon: 'BookOpen',
      topicIds: [
        'math-quadratic-function',
        'math-quadratic-equation',
        'math-vieta',
        'math-linear-system',
        'math-inequality',
        'math-radicals',
        'math-rational-expression'
      ]
    },
    {
      id: 'math-reading',
      title: 'Phòng Hình Học',
      categories: [],
      modeKey: 'reading',
      label: 'Phòng Hình Học',
      icon: 'Compass',
      topicIds: [
        'math-plane-geometry-circle',
        'math-plane-geometry-triangle',
        'math-plane-geometry-cyclic',
        'math-solid-geometry-volume',
        'math-solid-geometry-3d',
        'math-plane-geometry-coordinates'
      ]
    },
    {
      id: 'math-vocabulary',
      title: 'Phòng Toán Thực Tế',
      categories: [],
      modeKey: 'vocabulary',
      label: 'Phòng Toán Thực Tế',
      icon: 'BookMarked',
      topicIds: [
        'math-real-world-algebra',
        'math-real-world-percent',
        'math-statistics',
        'math-probability'
      ]
    }
  ],
  getGeometryVisualization: detectGeometryVisualization
};
