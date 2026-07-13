-- Tên thú nuôi cũ có thể còn được lưu theo thiết kế Rồng trước đây.
-- Chuẩn hóa dữ liệu đã tồn tại để mọi giao diện và lần đồng bộ sau chỉ nói về Heo.
UPDATE ge10_pet_states
SET name = 'Heo Maikawaii'
WHERE name ~* '(rồng|rong|dragon)';
