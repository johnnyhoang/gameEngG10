import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const LESSONS_LIST = [
  { id: "math-circle-angle-1", title: "Góc ở tâm và Góc nội tiếp", description: "Góc ở tâm, góc nội tiếp đường tròn, số đo cung." },
  { id: "math-circle-angle-2", title: "Góc tạo bởi tia tiếp tuyến và dây cung", description: "Góc tạo bởi tia tiếp tuyến và dây cung trong đường tròn." },
  { id: "math-circle-concept", title: "Khái niệm và sự xác định đường tròn", description: "Sự xác định đường tròn, đường kính và dây cung." },
  { id: "math-circle-length-area", title: "Chu vi, diện tích hình tròn và hình quạt", description: "Tính chu vi hình tròn, diện tích hình tròn, hình quạt tròn." },
  { id: "math-circle-polygon", title: "Tứ giác nội tiếp đường tròn", description: "Tứ giác nội tiếp, tính chất, chứng minh tứ giác nội tiếp." },
  { id: "math-circle-position", title: "Vị trí tương đối trong đường tròn", description: "Vị trí tương đối của đường thẳng và đường tròn, của hai đường tròn." },
  { id: "math-circle-tangent-1", title: "Tiếp tuyến đường tròn và Hai tiếp tuyến cắt nhau", description: "Tính chất tiếp tuyến, tính chất hai tiếp tuyến cắt nhau." },
  { id: "math-circle-tangent-2", title: "Chứng minh tiếp tuyến đường tròn", description: "Phương pháp và bài toán chứng minh một đường thẳng là tiếp tuyến." },
  { id: "math-cone-detail", title: "Hình nón và hình nón cụt", description: "Diện tích xung quanh, diện tích toàn phần, thể tích hình nón và hình nón cụt." },
  { id: "math-cone-sphere-combined", title: "Hình cầu và bài toán kết hợp", description: "Diện tích, thể tích hình cầu. Các bài toán kết hợp hình nón, hình cầu, hình trụ." },
  { id: "math-cylinder-detail", title: "Hình trụ - Bài toán thực tế", description: "Diện tích xung quanh, diện tích toàn phần, thể tích hình trụ trong thực tế." },
  { id: "math-eq-product", title: "Phương trình tích", description: "Giải phương trình tích dạng A(x).B(x) = 0." },
  { id: "math-eq-rational", title: "Phương trình chứa ẩn ở mẫu", description: "Giải phương trình chứa ẩn ở mẫu thức, điều kiện xác định." },
  { id: "math-finance", title: "Toán thực tế tài chính", description: "Lãi suất ngân hàng, hóa đơn điện nước, cước phí viễn thông, taxi, mua bán giảm giá, lỗ lãi." },
  { id: "math-parabol", title: "Tương giao Parabol & Đường thẳng", description: "Vị trí tương đối của parabol y = ax^2 và đường thẳng y = mx + n, tìm tọa độ giao điểm." },
  { id: "math-plane-geom", title: "Tứ giác nội tiếp đường tròn", description: "Tổng hợp chứng minh hình học phẳng, góc và đường tròn." },
  { id: "math-quadratic-applied", title: "Bài toán thực tế bậc hai", description: "Ứng dụng phương trình bậc hai giải bài toán chuyển động, diện tích thực tế bậc hai." },
  { id: "math-quadratic-discriminant", title: "Biện luận số nghiệm của phương trình", description: "Biện luận số nghiệm phương trình bậc hai chứa tham số m qua biệt thức delta/delta'." },
  { id: "math-quadratic-formula", title: "Công thức nghiệm và nghiệm thu gọn", description: "Giải phương trình bậc hai với hệ số cụ thể bằng công thức nghiệm delta/delta'." },
  { id: "math-right-triangle-ratio", title: "Hệ thức về cạnh và đường cao", description: "Các hệ thức lượng trong tam giác vuông giữa cạnh góc vuông, đường cao, hình chiếu." },
  { id: "math-right-triangle-ratio-2", "title": "Ứng dụng hệ thức lượng nâng cao", description: "Bài tập nâng cao áp dụng hệ thức lượng và chứng minh hình học." },
  { id: "math-space-geom", title: "Hình học không gian thực tế", description: "Hình học không gian thực tế, tính toán thể tích các vật thể phức tạp." },
  { id: "math-system-eq-1", title: "Hệ phương trình - Cộng đại số và Thế", description: "Giải hệ phương trình bậc nhất hai ẩn cụ thể bằng phương pháp thế hoặc cộng đại số." },
  { id: "math-system-eq-2", title: "Hệ phương trình chứa tham số m", description: "Tìm điều kiện của tham số m để hệ phương trình có nghiệm duy nhất, vô số nghiệm, vô nghiệm." },
  { id: "math-trig-applied-1", title: "Giải tam giác vuông", description: "Tìm các cạnh và góc của tam giác vuông." },
  { id: "math-trig-applied-2", title: "Đo đạc thực tế dùng tỉ số lượng giác", description: "Tính chiều cao tháp, cây, khoảng cách bờ sông dựa vào tỉ số lượng giác của góc nhọn." },
  { id: "math-trig-ratio", title: "Tỉ số lượng giác của góc nhọn", description: "Định nghĩa sin, cos, tan, cot của góc nhọn trong tam giác vuông." },
  { id: "math-trig-relations", title: "Các hệ thức lượng giác cơ bản", description: "Các hệ thức lượng giác cơ bản như sin^2(x) + cos^2(x) = 1, tan(x).cot(x) = 1." },
  { id: "math-viet", title: "Hệ thức Vi-ét và Ứng dụng", description: "Hệ thức Vi-ét tính tổng và tích hai nghiệm, tính biểu thức đối xứng x_1^2+x_2^2, lập phương trình bậc hai." },
  { id: "math-viet-advanced", title: "Hệ thức Vi-ét nâng cao và Xét dấu", description: "Xét dấu nghiệm phương trình bậc hai, hệ thức Vi-ét chứa tham số m hoặc không đối xứng." },
  { id: "math-word-problem-1", title: "Giải bài toán bằng cách lập hệ phương trình", description: "Giải bài toán bằng cách lập hệ phương trình bậc nhất hai ẩn (toán chuyển động, làm chung công việc, năng suất)." },
  { id: "math-word-problem-2", title: "Giải bài toán thực tế bằng cách lập phương trình", description: "Giải bài toán thực tế bằng cách lập phương trình bậc nhất hoặc hàm số bậc nhất thực tế." }
];

// Hàm quy tắc cứng cho các câu hỏi đại số/hình học cơ bản có ký hiệu toán học đặc thù
function getRuleBasedLessonId(q) {
  const prompt = q.prompt.toLowerCase();
  const cat = (q.category || '').toLowerCase();

  // Bỏ qua các câu toán thực tế/hình học không gian để dành riêng cho AI phân tích
  const isRealOrSpace = cat === 'linear-function' || cat === 'finance' || cat === 'real-finance' || 
                        cat === 'shopping-discount' || cat === 'percentage-discount' || cat === 'real-world-percent' ||
                        cat === 'solid-geometry' || prompt.includes('hinh tru') || prompt.includes('hinh non') || 
                        prompt.includes('hinh cau') || prompt.includes('the tich') || prompt.includes('ly nuoc') || 
                        prompt.includes('lon sua') || prompt.includes('lon nuoc') || prompt.includes('qua bong') || 
                        prompt.includes('ốc quế') || prompt.includes('giảm giá') || prompt.includes('lãi suất') || 
                        prompt.includes('cước') || prompt.includes('taxi') || prompt.includes('hóa đơn');

  if (isRealOrSpace) {
    return 'SKIP_TO_AI'; // Đẩy sang cho AI đọc hiểu
  }

  // Loại trừ thống kê/xác suất
  const isStatsOrProb = cat === 'statistics' || cat === 'probability' || prompt.includes('tan so') || prompt.includes('tan suat') || prompt.includes('trung binh') || prompt.includes('hop chua') || prompt.includes('qua cau') || prompt.includes('xac suat');
  if (isStatsOrProb) {
    return null;
  }

  // 1. Hệ phương trình
  if (cat === 'linear-system' || prompt.includes('he phuong trinh') || prompt.includes('phuong trinh bac nhat hai an')) {
    if (prompt.includes('tham so') || prompt.includes('tim m') || prompt.includes('gia tri cua m') || prompt.includes('he phuong trinh vo so nghiem')) {
      return 'math-system-eq-2';
    }
    return 'math-system-eq-1';
  }

  // 2. Vi-ét
  if (cat === 'vieta' || cat === 'viet-relation' || prompt.includes('vi-et') || prompt.includes('viet') || prompt.includes('vi et')) {
    if (prompt.includes('tim m') || prompt.includes('bien luan') || prompt.includes('de phuong trinh') || prompt.includes('tham so m') || prompt.includes('trai dau') || prompt.includes('khong doi xung') || prompt.includes('x_1^2 + x_2^2 =')) {
      if (prompt.includes('x^2 - 5x + 3 = 0') || prompt.includes('x² - 5x + 3 = 0')) {
        return 'math-viet';
      }
      return 'math-viet-advanced';
    }
    return 'math-viet';
  }

  // 3. Phương trình bậc hai
  const isExpressionSimplify = cat === 'rational-expression' || cat === 'radicals' || prompt.includes('rut gon bieu thuc') || prompt.includes('bieu thuc huu ti') || prompt.includes('rut gon');
  const hasQuadraticEq = (cat === 'quadratic-equation' || prompt.includes('phuong trinh bac hai') || prompt.includes('x^2') || prompt.includes('x²')) && !isExpressionSimplify;
  
  if (hasQuadraticEq) {
    if (prompt.includes('tham so') || prompt.includes('tim m') || prompt.includes('bien luan so nghiem') || prompt.includes('delta') || prompt.includes('biet thuc')) {
      return 'math-quadratic-discriminant';
    }
    return 'math-quadratic-formula';
  }

  if (cat === 'quadratic-function' || prompt.includes('parabol') || prompt.includes('toa do giao diem') || prompt.includes('tuong giao')) {
    return 'math-parabol';
  }

  // 4. Lượng giác phẳng
  const hasTrigWord = /\b(sin|cos|tan|cot)\b/.test(prompt) || prompt.includes('ti so luong giac');
  if (cat === 'trigonometry' || prompt.includes('tam giac vuong') || prompt.includes('sin') || prompt.includes('cos') || hasTrigWord) {
    if (prompt.includes('do chieu cao') || prompt.includes('khoang cach') || prompt.includes('chan thap') || prompt.includes('bong cua')) {
      return 'math-trig-applied-2';
    }
    if (prompt.includes('giai tam giac vuong') || prompt.includes('hinh chieu')) {
      return 'math-trig-applied-1';
    }
    if (prompt.includes('he thuc luong') || prompt.includes('duong cao ah')) {
      return 'math-right-triangle-ratio';
    }
    return 'math-trig-ratio';
  }

  // 5. Đường tròn hình học phẳng
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

  return null;
}

async function callGroq(questionsBatch) {
  const systemPrompt = `Bạn là một giáo viên Toán lớp 9 xuất sắc. Nhiệm vụ của bạn là đọc hiểu ý nghĩa và nội dung các câu hỏi Toán thực tế hoặc Hình học không gian và phân loại chúng vào đúng bài học trong danh sách bài học sau đây:
${JSON.stringify(LESSONS_LIST, null, 2)}

Hãy phân loại chính xác các câu hỏi dựa trên bản chất toán học và ngữ cảnh thực tế của chúng:
- Các bài toán liên quan đến hóa đơn nước, cước phí taxi, cước internet, giảm giá, lãi suất... phải thuộc "math-finance" (Toán thực tế tài chính).
- Các bài toán lập phương trình tính diện tích đất đai, giải chạy bộ... phải thuộc "math-word-problem-2" hoặc "math-quadratic-applied" (nếu là bài toán lập phương trình bậc hai).
- Các bài toán hình học không gian thực tế (ly nước, lon sữa, quả bóng, kem ốc quế, bồn chứa dầu) phải thuộc hình nón/trụ/cầu.
- Bất kỳ câu hỏi nào không thuộc danh sách bài học này, hãy gán "lesson_id": null.

Định dạng đầu ra JSON bắt buộc:
{
  "mappings": [
    { "id": "m-20", "lesson_id": "math-finance" }
  ]
}`;

  const userPrompt = `Hãy phân loại danh sách các câu hỏi sau:
${JSON.stringify(questionsBatch.map(q => ({ id: q.id, prompt: q.prompt, category: q.category })), null, 2)}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.0
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${response.statusText} - ${errorText}`);
  }

  const resJson = await response.json();
  const content = JSON.parse(resJson.choices[0].message.content);
  return content.mappings;
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  if (!GROQ_API_KEY) {
    console.error('Không tìm thấy GROQ_API_KEY trong file .env');
    return;
  }

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
    console.log(`Đã load ${questions.length} câu hỏi Toán lớp 9 từ DB.`);

    const ruleMappings = [];
    const aiCandidates = [];

    // 2. Chạy so khớp theo quy tắc trước
    questions.forEach(q => {
      const res = getRuleBasedLessonId(q);
      if (res === 'SKIP_TO_AI') {
        aiCandidates.push(q);
      } else {
        ruleMappings.push({ id: q.id, lesson_id: res });
      }
    });

    console.log(`- Có ${ruleMappings.length} câu hỏi khớp theo quy tắc toán học.`);
    console.log(`- Có ${aiCandidates.length} câu hỏi thực tế/hình học không gian cần gửi AI phân tích.`);

    // 3. Gửi các câu hỏi thực tế sang AI phân tích (batch 5 câu để an toàn TPM)
    const batchSize = 5;
    const aiMappings = [];

    for (let i = 0; i < aiCandidates.length; i += batchSize) {
      const batch = aiCandidates.slice(i, i + batchSize);
      console.log(`Đang gửi batch AI ${i + 1} đến ${Math.min(i + batchSize, aiCandidates.length)} (Delay 16s)...`);
      try {
        const mappings = await callGroq(batch);
        aiMappings.push(...mappings);
      } catch (err) {
        console.error(`Lỗi khi gọi AI batch từ câu thứ ${i + 1}:`, err);
      }
      if (i + batchSize < aiCandidates.length) {
        await delay(16000); // Trì hoãn 16 giây để reset hoàn toàn TPM limit 6,000 của Groq
      }
    }

    const finalMappings = [...ruleMappings, ...aiMappings];
    console.log(`Thu thập thành công ${finalMappings.length}/${questions.length} mappings.`);

    // 4. Tiến hành so sánh và cập nhật database
    const updates = [];
    finalMappings.forEach(mapping => {
      const originalQ = questions.find(q => q.id === mapping.id);
      if (originalQ && originalQ.lesson_id !== mapping.lesson_id) {
        updates.push(mapping);
        console.log(`- Cập nhật [${mapping.id}]: "${originalQ.prompt.substring(0, 80)}..."`);
        console.log(`  Cũ: ${originalQ.lesson_id} => Mới: ${mapping.lesson_id}\n`);
      }
    });

    if (updates.length > 0) {
      console.log(`Đang chạy cập nhật ${updates.length} câu hỏi lên database...`);
      await client.query('BEGIN');
      for (const item of updates) {
        await client.query(
          `UPDATE ge10_custom_questions SET lesson_id = $1 WHERE id = $2`,
          [item.lesson_id, item.id]
        );
      }
      await client.query('COMMIT');
      console.log('Phân bổ dữ liệu câu hỏi môn Toán lớp 9 bằng Gemini/Groq AI kết hợp quy tắc thành công 100%!');
    } else {
      console.log('Không có câu hỏi nào cần thay đổi (dữ liệu đã hoàn toàn tối ưu).');
    }

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Lỗi trong quá trình chạy phân loại:', err);
  } finally {
    await client.end();
  }
}

run();
