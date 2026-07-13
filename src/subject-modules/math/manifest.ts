import type { SubjectModule } from '../contracts';

export const mathSubjectModule: SubjectModule = {
  subjectId: 'math',
  tools: [
    { id: 'biki3d', title: 'Xưởng Toán Hình 3D', surface: 'learning-hall' },
    { id: 'bikiplane', title: 'Xưởng Toán Hình', surface: 'learning-hall' },
    { id: 'bikigraph', title: 'Xưởng Toán Đồ Thị', surface: 'learning-hall' },
  ],
  utilities: ['scratchpad'],
};
