/**
 * Xáo trộn mảng một cách ngẫu nhiên nhưng ổn định dựa trên seed string (deterministic shuffle).
 * Giúp đồng bộ thứ tự đáp án MCQ khi hiển thị ở nhiều nơi khác nhau (màn hình làm bài, review).
 */
export const shuffleWithSeed = <T>(array: T[], seedStr: string): T[] => {
  if (!array || array.length === 0) return [];
  const copy = [...array];
  
  // Tạo hash code đơn giản từ seedStr làm seed khởi tạo
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0; // Chuyển đổi thành số nguyên 32-bit
  }
  
  // Sử dụng hàm sinh số ngẫu nhiên giả (PRNG) ổn định dựa trên seed
  let seed = hash;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  
  return copy;
};
