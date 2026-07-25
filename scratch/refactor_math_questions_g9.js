import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

function getLessonIdForMathG9Question(q) {
  const prompt = q.prompt.toLowerCase();
  const cat = (q.category || '').toLowerCase();
  const id = q.id.toLowerCase();

  // Kiểm tra bài toán thống kê/xác suất để tránh so khớp nhầm
  const isStatsOrProb = cat === 'statistics' || cat === 'probability' || prompt.includes('tan so') || prompt.includes('tan suat') || prompt.includes('trung binh') || prompt.includes('hop chua') || prompt.includes('qua cau') || prompt.includes('xac suat');

  if (isStatsOrProb) {
    return null; // Các bài này hiện chưa có bài học tương ứng lớp 9, trả về null để gộp theo category ở frontend
  }

  // 1. Hệ phương trình & Giải bài toán bằng cách lập hệ phương trình
  if (cat === 'linear-system' || prompt.includes('he phuong trinh') || prompt.includes('phuong trinh bac nhat hai an')) {
    if (prompt.includes('tham so') || prompt.includes('tim m') || prompt.includes('gia tri cua m') || prompt.includes('he phuong trinh vo so nghiem')) {
      return 'math-system-eq-2'; // Hệ chứa tham số m
    }
    return 'math-system-eq-1'; // Giải hệ cụ thể
  }
  
  if (cat === 'real-equations' || cat === 'real-world-algebra') {
    // Thường là giải bài toán lập hệ phương trình (ví dụ hai vòi nước, hai xe, tổng học sinh đỗ)
    if (prompt.includes('hai voi nuoc') || prompt.includes('hai voi') || prompt.includes('hai truong a va b') || prompt.includes('hai xi nghiep') || prompt.includes('tong cong 500 hoc sinh')) {
      return 'math-word-problem-1';
    }
    // Lập phương trình bậc hai / bậc nhất
    if (prompt.includes('chieu dai') && prompt.includes('chieu rong') && prompt.includes('dien tich')) {
      return 'math-word-problem-2';
    }
    return 'math-word-problem-1';
  }

  // 2. Vi-ét (Hệ thức Vi-ét)
  if (cat === 'vieta' || cat === 'viet-relation' || prompt.includes('vi-et') || prompt.includes('viet') || prompt.includes('vi et') || prompt.includes('vieta')) {
    if (prompt.includes('tim m') || prompt.includes('bien luan') || prompt.includes('de phuong trinh') || prompt.includes('tham so m') || prompt.includes('trai dau') || prompt.includes('khong doi xung') || prompt.includes('x_1^2 + x_2^2 =')) {
      // Nếu là các câu cơ bản tính x_1^2+x_2^2 trực tiếp của pt cụ thể:
      if (prompt.includes('x^2 - 5x + 3 = 0') || prompt.includes('x² - 5x + 3 = 0')) {
        return 'math-viet';
      }
      return 'math-viet-advanced'; // Vi-ét nâng cao
    }
    return 'math-viet'; // Vi-ét cơ bản
  }

  // 3. Hàm số & Phương trình bậc hai (loại trừ các bài rút gọn biểu thức)
  const isExpressionSimplify = cat === 'rational-expression' || cat === 'radicals' || prompt.includes('rut gon bieu thuc') || prompt.includes('bieu thuc huu ti') || prompt.includes('rut gon');
  const hasQuadraticEq = (cat === 'quadratic-equation' || prompt.includes('phuong trinh bac hai') || prompt.includes('x^2') || prompt.includes('x²')) && !isExpressionSimplify;
  
  if (hasQuadraticEq) {
    if (prompt.includes('tham so') || prompt.includes('tim m') || prompt.includes('bien luan so nghiem') || prompt.includes('delta') || prompt.includes('biet thuc')) {
      return 'math-quadratic-discriminant'; // Biện luận
    }
    return 'math-quadratic-formula'; // Công thức nghiệm cụ thể
  }

  if (cat === 'quadratic-function' || prompt.includes('parabol') || prompt.includes('toa do giao diem') || prompt.includes('tuong giao')) {
    return 'math-parabol'; // Tương giao parabol
  }

  // 4. Toán thực tế tài chính & Hàm số bậc nhất
  if (cat === 'linear-function' || cat === 'finance' || cat === 'real-finance' || cat === 'shopping-discount' || cat === 'percentage-discount' || cat === 'real-world-percent') {
    return 'math-finance';
  }

  // 5. Hình học không gian (ly nước, lon sữa, quả bóng, kem ốc quế...)
  if (cat === 'solid-geometry' || prompt.includes('hinh tru') || prompt.includes('hinh non') || prompt.includes('hinh cau') || prompt.includes('the tich') || prompt.includes('dien tich xung quanh') || prompt.includes('dien tich toan phan')) {
    if (prompt.includes('hinh cau') && prompt.includes('non')) {
      return 'math-cone-sphere-combined';
    }
    if (prompt.includes('hinh non') || prompt.includes('non cut')) {
      return 'math-cone-detail';
    }
    if (prompt.includes('hinh tru') || prompt.includes('lon sua') || prompt.includes('lon nuoc') || prompt.includes('sua bot')) {
      return 'math-cylinder-detail';
    }
    return 'math-space-geom';
  }

  // 6. Hệ thức lượng & Tỉ số lượng giác (sử dụng regex ranh giới từ để tránh khớp 'tan' trong 'tan so')
  const hasTrigWord = /\b(sin|cos|tan|cot)\b/.test(prompt) || prompt.includes('ti so luong giac');
  if (cat === 'trigonometry' || prompt.includes('tam giac vuong') || prompt.includes('do cao') || prompt.includes('chieu cao thap') || hasTrigWord) {
    if (prompt.includes('do chieu cao') || prompt.includes('khoang cach') || prompt.includes('chan thap') || prompt.includes('bong cua')) {
      return 'math-trig-applied-2'; // Đo đạc thực tế
    }
    if (prompt.includes('giai tam giac vuong') || prompt.includes('hinh chieu')) {
      return 'math-trig-applied-1';
    }
    if (prompt.includes('he thuc luong') || prompt.includes('duong cao ah')) {
      return 'math-right-triangle-ratio';
    }
    return 'math-trig-ratio';
  }

  // 7. Tứ giác nội tiếp & Góc đường tròn
  if (cat === 'plane-geometry' || prompt.includes('duong tron') || prompt.includes('tiep tuyen') || prompt.includes('tu giac noi tiep')) {
    if (prompt.includes('tu giac noi tiep') || prompt.includes('noi tiep duong tron')) {
      return 'math-circle-polygon';
    }
    if (prompt.includes('goc o tam') || prompt.includes('goc noi tiep')) {
      return 'math-circle-angle-1';
    }
    if (prompt.includes('tiep tuyen') && (prompt.includes('day cung') || prompt.includes('tia tiep tuyen'))) {
      return 'math-circle-angle-2';
    }
    if (prompt.includes('tiep tuyen') && (prompt.includes('hai tiep tuyen cat nhau') || prompt.includes('ke tiep tuyen'))) {
      return 'math-circle-tangent-1';
    }
    if (prompt.includes('vi tri tuong doi')) {
      return 'math-circle-position';
    }
    return 'math-circle-concept';
  }

  // Mặc định trả về null nếu không khớp quy tắc đặc trưng
  return null;
}

// Hàm chuẩn hóa chuỗi tiếng Việt không dấu để so khớp chính xác
function normalizeStr(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .trim();
}

async function refactor() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    // 1. Load tất cả câu hỏi toán lớp 9
    const questionsRes = await client.query(
      `SELECT id, prompt, category, topic_id, lesson_id 
       FROM ge10_custom_questions 
       WHERE grade_tier = 9 AND subject = 'math'
       ORDER BY id`
    );
    const questions = questionsRes.rows;
    console.log(`Đã load ${questions.length} câu hỏi Toán lớp 9.`);

    const updates = [];

    questions.forEach(q => {
      // Chuẩn hóa prompt trước khi đưa vào bộ quy tắc
      const qNorm = {
        ...q,
        prompt: normalizeStr(q.prompt)
      };
      
      const newLessonId = getLessonIdForMathG9Question(qNorm);
      if (newLessonId !== q.lesson_id) {
        updates.push({
          id: q.id,
          oldLessonId: q.lesson_id,
          newLessonId: newLessonId,
          prompt: q.prompt
        });
      }
    });

    console.log(`Phát hiện ${updates.length} câu hỏi cần cập nhật lại liên kết bài học (lesson_id).`);
    
    // In ra danh sách cập nhật để đối chiếu
    updates.forEach((item, idx) => {
      console.log(`\n[${idx + 1}] ID: ${item.id}`);
      console.log(`   Cũ: ${item.oldLessonId}`);
      console.log(`   Mới: ${item.newLessonId}`);
      console.log(`   Prompt: "${item.prompt.replace(/\n/g, ' ').substring(0, 120)}..."`);
    });

    // 2. Tiến hành cập nhật thật vào database
    if (updates.length > 0) {
      console.log('\nĐang tiến hành cập nhật database...');
      await client.query('BEGIN');
      for (const item of updates) {
        await client.query(
          `UPDATE ge10_custom_questions SET lesson_id = $1 WHERE id = $2`,
          [item.newLessonId, item.id]
        );
      }
      await client.query('COMMIT');
      console.log('Cập nhật database thành công!');
    } else {
      console.log('Không có câu hỏi nào cần cập nhật.');
    }

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Lỗi khi chạy refactor dữ liệu:', err);
  } finally {
    await client.end();
  }
}

refactor();
