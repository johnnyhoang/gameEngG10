import json
import os

lessons = [
  {
    "id": "ict-9-1",
    "subject": "informatics",
    "grade_tier": 9,
    "topic": "networks_and_internet",
    "title": "Từ máy tính đơn lẻ đến mạng máy tính và Internet",
    "theory": "# I. Mạng máy tính là gì?\n- **Khái niệm:** Mạng máy tính là tập hợp các máy tính và thiết bị được kết nối với nhau theo một phương thức nào đó để truyền tải thông tin và chia sẻ dữ liệu, thiết bị.\n- **Thành phần của mạng:**\n  + **Thiết bị đầu cuối:** Máy tính, điện thoại, máy in, camera...\n  + **Môi trường truyền dẫn:** Dây dẫn (cáp đồng trục, cáp xoắn đôi, cáp quang) hoặc sóng điện từ (Wi-Fi, Bluetooth).\n  + **Thiết bị kết nối mạng:** Vỉ mạng (Network Card), Hub, Switch, Router (Bộ định tuyến), Modem.\n  + **Giao thức truyền thông (Protocol):** Tập hợp các quy tắc định dạng và truyền dữ liệu (ví dụ: TCP/IP).\n\n# II. Internet và các dịch vụ cơ bản\n- **Khái niệm Internet:** Là hệ thống thông tin toàn cầu được liên kết từ nhiều mạng máy tính khác nhau trên khắp thế giới sử dụng bộ giao thức TCP/IP.\n- **Các dịch vụ phổ biến:**\n  + **Tổ chức và khai thác thông tin:** Mạng thông tin toàn cầu WWW (World Wide Web) dựa trên các trang web và trình duyệt web.\n  + **Tìm kiếm thông tin:** Các máy tìm kiếm như Google, Bing...\n  + **Thư điện tử (E-mail):** Dịch vụ gửi và nhận thư qua mạng máy tính dưới dạng số hóa.\n  + **Hội thoại trực tuyến & Đám mây:** Chat, gọi video, lưu trữ dữ liệu trực tuyến (Google Drive, OneDrive).",
    "category": "networks",
    "examples": [
      "Văn phòng trường học kết nối các máy tính của giáo viên với một máy in dùng chung thông qua thiết bị Switch để tiết kiệm chi phí mua thiết bị.",
      "Sử dụng công cụ tìm kiếm Google với từ khóa chứa trong dấu ngoặc kép \"tài liệu Tin học 9\" để tìm chính xác cụm từ này trên các trang web."
    ],
    "practice_points": [
      "Phân biệt giữa mạng LAN (mạng cục bộ trong phạm vi nhỏ như phòng học, gia đình) và mạng WAN (mạng diện rộng kết nối quy mô tỉnh, quốc gia).",
      "Thực hành kỹ năng tìm kiếm nâng cao trên Internet bằng cách sử dụng các từ khóa logic (AND, OR, NOT) hoặc các toán tử lọc file (filetype:pdf, site:gov)."
    ],
    "difficulty": 5,
    "is_standard": True
  },
  {
    "id": "ict-9-2",
    "subject": "informatics",
    "grade_tier": 9,
    "topic": "organization_and_storage",
    "title": "Tổ chức và khai thác thông tin trên Internet",
    "theory": "# I. Trang web, Website và Địa chỉ IP/Tên miền\n- **Trang web (Web page):** Là một siêu văn bản (hypertext) được gán một địa chỉ truy cập trên Internet, chứa văn bản, hình ảnh, âm thanh, video và các liên kết (hyperlink) đến các trang khác.\n- **Website:** Là một tập hợp các trang web liên quan được tổ chức dưới một địa chỉ truy cập chung gọi là tên miền (Domain Name).\n- **Trang chủ (Homepage):** Là trang đầu tiên xuất hiện khi ta truy cập vào một website.\n- **Trình duyệt web (Web Browser):** Là phần mềm ứng dụng giúp người dùng giao tiếp với hệ thống WWW để truy cập, hiển thị các trang web (ví dụ: Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).\n\n# II. Thư điện tử (E-mail)\n- **Hệ thống thư điện tử:** Hoạt động tương tự như hệ thống bưu chính truyền thống nhưng việc truyền nhận thư được thực hiện hoàn toàn bằng phương thức điện tử thông qua mạng máy tính.\n- **Địa chỉ thư điện tử:** Có cấu trúc dạng `<Tên_đăng_nhập>@<Tên_miền_dịch_vụ_thư>`. Ví dụ: `hocsinh9@gmail.com`.\n  + *Ưu điểm:* Chi phí thấp, thời gian chuyển gần như tức thời, có thể gửi kèm tệp tin văn bản, hình ảnh, âm thanh.",
    "category": "networks",
    "examples": [
      "Địa chỉ website của Bộ Giáo dục và Đào tạo Việt Nam là `moet.gov.vn`. Khi gõ địa chỉ này vào thanh địa chỉ của trình duyệt Chrome, trang chủ của Bộ sẽ hiện ra.",
      "Đăng ký tài khoản Gmail miễn phí để gửi báo cáo bài tập thực hành Tin học cho giáo viên chủ bộ môn dưới dạng tệp đính kèm (Attachment)."
    ],
    "practice_points": [
      "Thực hành soạn thảo, gửi thư điện tử có đính kèm tệp tin và trả lời thư (Reply/Reply All) đúng quy cách xã giao công nghệ thông tin.",
      "Nhận biết và cảnh giác với các thư rác (Spam), thư lừa đảo (Phishing) chứa liên kết độc hại hoặc yêu cầu cung cấp thông tin cá nhân mật."
    ],
    "difficulty": 5,
    "is_standard": True
  },
  {
    "id": "ict-9-3",
    "subject": "informatics",
    "grade_tier": 9,
    "topic": "ethics_and_society",
    "title": "Đạo đức, pháp luật và văn hóa trong môi trường số",
    "theory": "# I. Bản quyền và Sở hữu trí tuệ trong môi trường số\n- **Sản phẩm số:** Là các thông tin, tài liệu, phần mềm, tác phẩm nghệ thuật... được lưu trữ dưới dạng số hóa.\n- **Tôn trọng bản quyền:** Khi sử dụng thông tin từ Internet hoặc các nguồn số khác, phải trích nguồn rõ ràng, không được tự ý sao chép, phân phối hoặc chỉnh sửa các tác phẩm có bản quyền khi chưa được sự đồng ý của tác giả.\n- **Phần mềm lậu:** Việc bẻ khóa (crack) phần mềm hoặc sử dụng các bản sao không có bản quyền là vi phạm pháp luật nghiêm trọng và dễ rủi ro nhiễm mã độc.\n\n# II. Giao tiếp văn minh trên mạng xã hội\n- **Quy tắc ứng xử:** Sử dụng ngôn từ lịch sự, văn minh; không chia sẻ các thông tin sai sự thật, xúc phạm danh dự của người khác hoặc kích động bạo lực.\n- **Bảo mật thông tin cá nhân:** Không tự ý chia sẻ thông tin cá nhân nhạy cảm (số CCCD, mật khẩu, địa chỉ nhà, lịch trình sinh hoạt) lên mạng xã hội để tránh bị kẻ xấu lợi dụng lừa đảo hoặc tống tiền.",
    "category": "ethics",
    "examples": [
      "Sử dụng một hình ảnh tìm được trên mạng để làm slide thuyết trình lớp học bằng cách ghi nguồn tác giả ở góc dưới bức ảnh.",
      "Báo cáo (Report) các tài khoản giả mạo hoặc đăng tải nội dung bắt nạt, lăng mạ bạn học trên mạng xã hội thay vì tham gia bình luận hay chia sẻ lại."
    ],
    "practice_points": [
      "Phân biệt giữa các loại phần mềm: Phần mềm thương mại (Commercial), phần mềm chia sẻ (Shareware), phần mềm miễn phí (Freeware) và phần mềm nguồn mở (Open Source).",
      "Thảo luận về hậu quả pháp lý và xã hội của việc lan truyền thông tin giả (Fake news) trên mạng xã hội."
    ],
    "difficulty": 6,
    "is_standard": True
  },
  {
    "id": "ict-9-4",
    "subject": "informatics",
    "grade_tier": 9,
    "topic": "presentation_software",
    "title": "Phần mềm trình chiếu cơ bản (PowerPoint)",
    "theory": "# I. Vai trò của phần mềm trình chiếu\n- Phần mềm trình chiếu dùng để tạo ra các bài trình chiếu dưới dạng điện tử phục vụ cho các cuộc họp, bài giảng, thuyết trình dự án...\n- **Trang chiếu (Slide):** Là vùng làm việc chính của bài trình chiếu. Một bài trình chiếu là tập hợp của nhiều trang chiếu được hiển thị nối tiếp nhau.\n\n# II. Các đối tượng trên trang chiếu\n- **Văn bản:** Đối tượng quan trọng nhất, thường được đặt trong các hộp văn bản (Text Box).\n- **Hình ảnh, Đồ họa:** Giúp minh họa trực quan sinh động cho nội dung.\n- **Âm thanh, Video:** Tăng tính tương tác và thu hút người xem.\n\n# III. Các hiệu ứng trong bài trình chiếu\n- **Hiệu ứng chuyển trang (Slide Transition):** Thay đổi cách thức xuất hiện của trang chiếu này thay thế trang chiếu kia.\n- **Hiệu ứng động cho đối tượng (Animation):** Cách thức xuất hiện hoặc chuyển động của từng văn bản, hình ảnh cụ thể trên trang chiếu.\n  + *Các nhóm hiệu ứng chính:* Entrance (Xuất hiện), Emphasis (Nhấn mạnh), Exit (Biến mất), Motion Paths (Di chuyển theo đường vẽ).",
    "category": "presentation",
    "examples": [
      "Thiết kế bài thuyết trình về chủ đề \"Bảo vệ môi trường học đường\" gồm 5 trang chiếu phối hợp hài hòa giữa chữ viết và hình ảnh thực tế.",
      "Áp dụng hiệu ứng \"Fade\" cho các hộp văn bản xuất hiện lần lượt khi người nói bấm chuột để người nghe tập trung vào từng luận điểm."
    ],
    "practice_points": [
      "Thiết kế bố cục slide theo nguyên tắc 6x6 (không quá 6 dòng trên 1 slide, không quá 6 từ trên một dòng) để slide thoáng và dễ đọc.",
      "Thực hành chèn hình ảnh, căn lề và áp dụng hiệu ứng chuyển slide một cách tinh tế, tránh lạm dụng quá nhiều hiệu ứng gây rối mắt."
    ],
    "difficulty": 6,
    "is_standard": True
  },
  {
    "id": "ict-9-5",
    "subject": "informatics",
    "grade_tier": 9,
    "topic": "problem_solving",
    "title": "Giải quyết vấn đề với sự trợ giúp của máy tính và thuật toán",
    "theory": "# I. Bài toán và Thuật toán\n- **Bài toán:** Là một nhiệm vụ cần thực hiện từ những thông tin đầu vào (Input) cho trước để thu được kết quả đầu ra (Output) mong muốn.\n- **Thuật toán (Algorithm):** Là một dãy các chỉ dẫn rõ ràng, hữu hạn, được sắp xếp theo một trình tự xác định nhằm giải quyết một bài toán cụ thể.\n- **Các cách mô tả thuật toán:**\n  + Sử dụng ngôn ngữ tự nhiên.\n  + Sử dụng sơ đồ khối (Flowchart).\n  + Sử dụng mã giả (Pseudocode).\n\n# II. Các cấu trúc điều khiển cơ bản trong thuật toán\n- **Cấu trúc tuần tự:** Các bước được thực hiện lần lượt từ trên xuống dưới.\n- **Cấu trúc rẽ nhánh (Điều kiện):** Kiểm tra một điều kiện, nếu ĐÚNG thì thực hiện việc này, nếu SAI thì thực hiện việc kia (hoặc bỏ qua).\n- **Cấu trúc lặp:** Thực hiện lặp đi lặp lại một nhóm công việc cho đến khi thỏa mãn một điều kiện dừng nào đó.",
    "category": "programming",
    "examples": [
      "Thuật toán tìm số lớn nhất trong hai số a và b: Nhận vào hai số a, b (Input). Nếu a > b thì kết quả là a, ngược lại kết quả là b. Đưa kết quả ra màn hình (Output).",
      "Sơ đồ khối của thuật toán tính điểm trung bình học kỳ sử dụng các hình oval để bắt đầu/kết thúc, hình chữ nhật cho bước tính toán, hình thoi cho bước so sánh xét điều kiện đạt hay không đạt."
    ],
    "practice_points": [
      "Vẽ sơ đồ khối mô tả thuật toán giải phương trình bậc nhất $ax + b = 0$.",
      "Phân tích thuật toán lặp để tính tổng các số tự nhiên liên tiếp từ 1 đến $N$ và xác định điều kiện dừng của vòng lặp."
    ],
    "difficulty": 7,
    "is_standard": True
  },
  {
    "id": "ict-9-6",
    "subject": "informatics",
    "grade_tier": 9,
    "topic": "programming_scratch",
    "title": "Lập trình trực quan cơ bản (Scratch)",
    "theory": "# I. Làm quen với môi trường lập trình trực quan Scratch\n- **Khái niệm:** Scratch là một ngôn ngữ lập trình trực quan, thay vì viết các mã lệnh phức tạp bằng văn bản, người dùng sẽ kéo và ghép các khối lệnh (blocks) giống như trò chơi xếp hình để tạo ra chương trình.\n- **Các thành phần giao diện chính:**\n  + **Sân khấu (Stage):** Nơi hiển thị kết quả hoạt động của chương trình và các nhân vật.\n  + **Nhân vật (Sprite):** Các đối tượng thực hiện hành động trong chương trình.\n  + **Khu vực nhóm lệnh:** Nơi chứa các khối lệnh được phân loại theo màu sắc và chức năng (Motion, Looks, Sound, Control, Sensing...).\n  + **Khu vực viết kịch bản (Script Area):** Nơi kéo thả và lắp ráp các khối lệnh để lập trình cho nhân vật.\n\n# II. Xây dựng kịch bản chương trình đơn giản\n- **Sử dụng khối sự kiện (Events):** Khởi chạy chương trình (ví dụ: \"Khi bấm vào lá cờ xanh\").\n- **Sử dụng cấu trúc lặp (Control):** Khối lệnh `repeat` (lặp số lần cố định) hoặc `forever` (lặp vô hạn).\n- **Sử dụng biến số (Variables):** Để lưu trữ các giá trị dữ liệu có thể thay đổi trong quá trình chạy chương trình (như điểm số, thời gian, số lần đếm).",
    "category": "programming",
    "examples": [
      "Tạo kịch bản cho chú mèo Scratch di chuyển 10 bước, nếu chạm vào cạnh sân khấu thì bật lại và đổi hướng di chuyển.",
      "Thiết kế chương trình trò chơi \"Hứng táo\": Trái táo rơi ngẫu nhiên từ trên xuống, người chơi dùng phím mũi tên điều khiển chiếc bát hứng táo, mỗi lần hứng trúng biến 'Điểm' tăng lên 1 đơn vị."
    ],
    "practice_points": [
      "Sử dụng nhóm lệnh cảm biến (Sensing) kết hợp cấu trúc điều khiển `if... then` để nhân vật phản ứng khi chạm vào một màu sắc hoặc nhân vật khác.",
      "Thực hành tạo một biến số có tên là `Score` và lập trình tăng/giảm điểm tương ứng với các sự kiện trong kịch bản game tự thiết kế."
    ],
    "difficulty": 7,
    "is_standard": True
  }
];

# Path to the SQL seed file
seed_file_path = r"d:\Hoa Hoang\Apps\gameEngG10\backend\migrations\20260713_seed_canonical_learning_content.sql"

def main():
    if not os.path.exists(seed_file_path):
        print(f"Error: {seed_file_path} not found.")
        return

    with open(seed_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the last COMMIT; and replace it
    if "COMMIT;" not in content:
        print("Error: 'COMMIT;' not found in seed file.")
        return

    sql_inserts = []
    for l in lessons:
        escaped_title = l["title"].replace("'", "''")
        escaped_theory = l["theory"].replace("'", "''")
        examples_str = json.dumps(l["examples"], ensure_ascii=False).replace("'", "''")
        practice_points_str = json.dumps(l["practice_points"], ensure_ascii=False).replace("'", "''")
        
        sql_inserts.append(
            f"  ('{l['id']}', '{l['subject']}', {l['grade_tier']}, '{l['topic']}', '{escaped_title}', "
            f"'{escaped_theory}', '{l['category']}', '{examples_str}'::jsonb, '{practice_points_str}'::jsonb, "
            f"{l['difficulty']}, {str(l['is_standard']).lower()})"
        )

    insert_block = f"""
-- Seed Informatics grade 9 lessons
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard)
VALUES 
{",\\n".join(sql_inserts)}
ON CONFLICT (id) DO UPDATE SET
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  topic = EXCLUDED.topic,
  title = EXCLUDED.title,
  theory = EXCLUDED.theory,
  category = EXCLUDED.category,
  examples = EXCLUDED.examples,
  practice_points = EXCLUDED.practice_points,
  difficulty = EXCLUDED.difficulty,
  is_standard = EXCLUDED.is_standard;

COMMIT;"""

    new_content = content.replace("COMMIT;", insert_block)
    
    with open(seed_file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print("Successfully appended informatics lessons seed into the SQL migration script!")

if __name__ == "__main__":
    main()
