-- Migration: Create ge10_curriculum_textbooks table and upgrade lessons & custom questions schema
-- Date: 2026-07-25

-- 1. Create ge10_curriculum_textbooks table
CREATE TABLE IF NOT EXISTS ge10_curriculum_textbooks (
    id VARCHAR(100) PRIMARY KEY,
    subject VARCHAR(50) NOT NULL,
    grade_tier INTEGER NOT NULL,
    chapter_number VARCHAR(50) NOT NULL,
    chapter_title VARCHAR(255) NOT NULL,
    chapter_full_name VARCHAR(300) NOT NULL,
    lesson_number VARCHAR(50) NOT NULL,
    lesson_title VARCHAR(255) NOT NULL,
    lesson_full_name VARCHAR(300) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast lookup by subject & grade_tier
CREATE INDEX IF NOT EXISTS idx_ge10_curriculum_subj_grade ON ge10_curriculum_textbooks(subject, grade_tier);

-- 2. Upgrade ge10_lessons table
ALTER TABLE ge10_lessons ADD COLUMN IF NOT EXISTS chapter_name VARCHAR(300);
ALTER TABLE ge10_lessons ADD COLUMN IF NOT EXISTS lesson_name VARCHAR(300);

-- 3. Upgrade ge10_custom_questions table
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS chapter_name VARCHAR(300);
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS lesson_name VARCHAR(300);

-- 4. Seed Authentic Math Curriculum Data for Grade 9 (Toán 9 GDPT 2018)
INSERT INTO ge10_curriculum_textbooks (id, subject, grade_tier, chapter_number, chapter_title, chapter_full_name, lesson_number, lesson_title, lesson_full_name, display_order)
VALUES
-- Chương I: Phương trình và hệ hai phương trình bậc nhất hai ẩn
('math_g9_c1_l1', 'toan', 9, 'Chương I', 'PHƯƠNG TRÌNH VÀ HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN', 'Chương I. PHƯƠNG TRÌNH VÀ HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN', 'Bài 1', 'Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn', 'Bài 1. Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn', 1),
('math_g9_c1_l2', 'toan', 9, 'Chương I', 'PHƯƠNG TRÌNH VÀ HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN', 'Chương I. PHƯƠNG TRÌNH VÀ HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN', 'Bài 2', 'Giải hệ hai phương trình bậc nhất hai ẩn', 'Bài 2. Giải hệ hai phương trình bậc nhất hai ẩn', 2),
('math_g9_c1_l3', 'toan', 9, 'Chương I', 'PHƯƠNG TRÌNH VÀ HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN', 'Chương I. PHƯƠNG TRÌNH VÀ HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN', 'Bài 3', 'Giải bài toán bằng cách lập hệ phương trình', 'Bài 3. Giải bài toán bằng cách lập hệ phương trình', 3),

-- Chương II: Phương trình và bất phương trình bậc nhất một ẩn
('math_g9_c2_l4', 'toan', 9, 'Chương II', 'PHƯƠNG TRÌNH VÀ BẤT PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN', 'Chương II. PHƯƠNG TRÌNH VÀ BẤT PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN', 'Bài 4', 'Phương trình quy về phương trình bậc nhất một ẩn', 'Bài 4. Phương trình quy về phương trình bậc nhất một ẩn', 4),
('math_g9_c2_l5', 'toan', 9, 'Chương II', 'PHƯƠNG TRÌNH VÀ BẤT PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN', 'Chương II. PHƯƠNG TRÌNH VÀ BẤT PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN', 'Bài 5', 'Bất đẳng thức và tính chất', 'Bài 5. Bất đẳng thức và tính chất', 5),
('math_g9_c2_l6', 'toan', 9, 'Chương II', 'PHƯƠNG TRÌNH VÀ BẤT PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN', 'Chương II. PHƯƠNG TRÌNH VÀ BẤT PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN', 'Bài 6', 'Bất phương trình bậc nhất một ẩn', 'Bài 6. Bất phương trình bậc nhất một ẩn', 6),

-- Chương III: Căn bậc hai và căn bậc ba
('math_g9_c3_l7', 'toan', 9, 'Chương III', 'CĂN BẬC HAI VÀ CĂN BẬC BA', 'Chương III. CĂN BẬC HAI VÀ CĂN BẬC BA', 'Bài 7', 'Căn bậc hai và căn thức bậc hai', 'Bài 7. Căn bậc hai và căn thức bậc hai', 7),
('math_g9_c3_l8', 'toan', 9, 'Chương III', 'CĂN BẬC HAI VÀ CĂN BẬC BA', 'Chương III. CĂN BẬC HAI VÀ CĂN BẬC BA', 'Bài 8', 'Khai căn bậc hai với phép nhân và phép chia', 'Bài 8. Khai căn bậc hai với phép nhân và phép chia', 8),
('math_g9_c3_l9', 'toan', 9, 'Chương III', 'CĂN BẬC HAI VÀ CĂN BẬC BA', 'Chương III. CĂN BẬC HAI VÀ CĂN BẬC BA', 'Bài 9', 'Biến đổi đơn giản căn thức bậc hai', 'Bài 9. Biến đổi đơn giản căn thức bậc hai', 9),
('math_g9_c3_l10', 'toan', 9, 'Chương III', 'CĂN BẬC HAI VÀ CĂN BẬC BA', 'Chương III. CĂN BẬC HAI VÀ CĂN BẬC BA', 'Bài 10', 'Căn bậc ba và căn thức bậc ba', 'Bài 10. Căn bậc ba và căn thức bậc ba', 10),

-- Chương IV: Hệ thức lượng trong tam giác vuông
('math_g9_c4_l11', 'toan', 9, 'Chương IV', 'HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG', 'Chương IV. HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG', 'Bài 11', 'Tỉ số lượng giác của góc nhọn', 'Bài 11. Tỉ số lượng giác của góc nhọn', 11),
('math_g9_c4_l12', 'toan', 9, 'Chương IV', 'HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG', 'Chương IV. HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG', 'Bài 12', 'Một số hệ thức về cạnh và góc trong tam giác vuông', 'Bài 12. Một số hệ thức về cạnh và góc trong tam giác vuông', 12),
('math_g9_c4_l13', 'toan', 9, 'Chương IV', 'HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG', 'Chương IV. HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG', 'Bài 13', 'Ứng dụng hình học và thực tế của hệ thức lượng', 'Bài 13. Ứng dụng hình học và thực tế của hệ thức lượng', 13),

-- Chương V: Đường tròn
('math_g9_c5_l14', 'toan', 9, 'Chương V', 'ĐƯỜNG TRÒN', 'Chương V. ĐƯỜNG TRÒN', 'Bài 14', 'Mở đầu về đường tròn', 'Bài 14. Mở đầu về đường tròn', 14),
('math_g9_c5_l15', 'toan', 9, 'Chương V', 'ĐƯỜNG TRÒN', 'Chương V. ĐƯỜNG TRÒN', 'Bài 15', 'Tính chất đối xứng của đường tròn', 'Bài 15. Tính chất đối xứng của đường tròn', 15),
('math_g9_c5_l16', 'toan', 9, 'Chương V', 'ĐƯỜNG TRÒN', 'Chương V. ĐƯỜNG TRÒN', 'Bài 16', 'Vị trí tương đối của đường thẳng và đường tròn', 'Bài 16. Vị trí tương đối của đường thẳng và đường tròn', 16),
('math_g9_c5_l17', 'toan', 9, 'Chương V', 'ĐƯỜNG TRÒN', 'Chương V. ĐƯỜNG TRÒN', 'Bài 17', 'Vị trí tương đối của hai đường tròn', 'Bài 17. Vị trí tương đối của hai đường tròn', 17),

-- Chương VI: Hàm số y = ax^2 (a ≠ 0) - Phương trình bậc hai một ẩn
('math_g9_c6_l18', 'toan', 9, 'Chương VI', 'HÀM SỐ Y = AX^2 - PHƯƠNG TRÌNH BẬC HAI MỘT ẨN', 'Chương VI. HÀM SỐ Y = AX^2 - PHƯƠNG TRÌNH BẬC HAI MỘT ẨN', 'Bài 18', 'Hàm số y = ax^2 (a ≠ 0)', 'Bài 18. Hàm số y = ax^2 (a ≠ 0)', 18),
('math_g9_c6_l19', 'toan', 9, 'Chương VI', 'HÀM SỐ Y = AX^2 - PHƯƠNG TRÌNH BẬC HAI MỘT ẨN', 'Chương VI. HÀM SỐ Y = AX^2 - PHƯƠNG TRÌNH BẬC HAI MỘT ẨN', 'Bài 19', 'Phương trình bậc hai một ẩn và công thức nghiệm', 'Bài 19. Phương trình bậc hai một ẩn và công thức nghiệm', 19),
('math_g9_c6_l20', 'toan', 9, 'Chương VI', 'HÀM SỐ Y = AX^2 - PHƯƠNG TRÌNH BẬC HAI MỘT ẨN', 'Chương VI. HÀM SỐ Y = AX^2 - PHƯƠNG TRÌNH BẬC HAI MỘT ẨN', 'Bài 20', 'Định lý Vi-ét và ứng dụng', 'Bài 20. Định lý Vi-ét và ứng dụng', 20),
('math_g9_c6_l21', 'toan', 9, 'Chương VI', 'HÀM SỐ Y = AX^2 - PHƯƠNG TRÌNH BẬC HAI MỘT ẨN', 'Chương VI. HÀM SỐ Y = AX^2 - PHƯƠNG TRÌNH BẬC HAI MỘT ẨN', 'Bài 21', 'Giải bài toán bằng cách lập phương trình bậc hai', 'Bài 21. Giải bài toán bằng cách lập phương trình bậc hai', 21)

ON CONFLICT (id) DO UPDATE SET
    subject = EXCLUDED.subject,
    grade_tier = EXCLUDED.grade_tier,
    chapter_number = EXCLUDED.chapter_number,
    chapter_title = EXCLUDED.chapter_title,
    chapter_full_name = EXCLUDED.chapter_full_name,
    lesson_number = EXCLUDED.lesson_number,
    lesson_title = EXCLUDED.lesson_title,
    lesson_full_name = EXCLUDED.lesson_full_name,
    display_order = EXCLUDED.display_order;
