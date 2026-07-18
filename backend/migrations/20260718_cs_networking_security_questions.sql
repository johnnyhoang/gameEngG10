-- SQL migration to seed 100 question bank for cs_networking_security (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_networking_security (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_networking_security';

-- ======================================================================================
-- BÀI GIẢNG 1: Mô hình mạng phân tầng (cs_net_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_net_q_001', 'mcq', 'network-architecture',
    'Tầng nào trong mô hình OSI chịu trách nhiệm chuyển đổi dòng bit nhị phân thô thành tín hiệu vật lý để truyền qua cáp truyền?',
    ARRAY['Vật lý (Physical Layer)', 'Liên kết dữ liệu (Data Link Layer)', 'Mạng (Network Layer)', 'Giao vận (Transport Layer)']::varchar[],
    ARRAY['Vật lý (Physical Layer)']::varchar[],
    'Tầng vật lý định nghĩa các thông số điện, quang, cơ học để truyền dẫn dòng bit nhị phân thô qua môi trường vật lý.',
    5, 'Network Architecture', 'cs_networking_security', 13, 'cs_net_01'
  ),
  (
    'cs_net_q_002', 'mcq', 'network-architecture',
    'Đơn vị dữ liệu (PDU) của Tầng liên kết dữ liệu (Data Link Layer) trong mô hình OSI được gọi là gì?',
    ARRAY['Khung tin (Frame)', 'Gói tin (Packet)', 'Phân đoạn (Segment)', 'Dòng bit (Bits)']::varchar[],
    ARRAY['Khung tin (Frame)']::varchar[],
    'Tầng liên kết dữ liệu đóng gói các gói tin IP thành các khung tin (Frames) có chứa thông tin MAC nguồn và đích.',
    5, 'Network Architecture', 'cs_networking_security', 13, 'cs_net_01'
  ),
  (
    'cs_net_q_003', 'mcq', 'network-architecture',
    'Thiết bị định tuyến Router hoạt động chủ yếu ở tầng nào của mô hình OSI?',
    ARRAY['Tầng 3 (Network Layer)', 'Tầng 2 (Data Link Layer)', 'Tầng 4 (Transport Layer)', 'Tầng 7 (Application Layer)'],
    ARRAY['Tầng 3 (Network Layer)']::varchar[],
    'Router thực hiện chức năng định tuyến các gói tin (Packets) giữa các mạng khác nhau dựa vào địa chỉ IP logic ở tầng 3 (Network).',
    5, 'Network Architecture', 'cs_networking_security', 13, 'cs_net_01'
  ),
  (
    'cs_net_q_004', 'mcq', 'network-architecture',
    'Tiến trình đóng gói dữ liệu (Encapsulation) diễn ra theo chiều đi nào của thông tin trong mạng phân tầng?',
    ARRAY['Từ tầng 7 (Application) đi xuống tầng 1 (Physical) của máy gửi', 'Từ tầng 1 (Physical) đi lên tầng 7 (Application) của máy nhận', 'Chạy ngang giữa hai máy cùng tầng', 'Diễn ra ngẫu nhiên không có quy luật'],
    ARRAY['Từ tầng 7 (Application) đi xuống tầng 1 (Physical) của máy gửi']::varchar[],
    'Khi máy gửi truyền dữ liệu, thông tin đi từ tầng ứng dụng xuống dưới, mỗi tầng thêm thông tin tiêu đề (Header) của mình, gọi là đóng gói.',
    5, 'Network Architecture', 'cs_networking_security', 13, 'cs_net_01'
  ),
  (
    'cs_net_q_005', 'mcq', 'network-architecture',
    'Tầng nào của mô hình OSI đảm nhận việc nén dữ liệu, mã hóa thông tin và định dạng chuỗi ký tự?',
    ARRAY['Trình diễn (Presentation Layer)', 'Phiên (Session Layer)', 'Ứng dụng (Application Layer)', 'Liên kết dữ liệu (Data Link Layer)'],
    ARRAY['Trình diễn (Presentation Layer)']::varchar[],
    'Presentation Layer (Tầng 6) giải quyết các vấn đề về cú pháp và ngữ nghĩa của thông tin như mã hoá, nén, chuyển đổi định dạng.',
    5, 'Network Architecture', 'cs_networking_security', 13, 'cs_net_01'
  ),
  (
    'cs_net_q_006', 'mcq', 'network-architecture',
    'Sự khác biệt về phân tầng giữa mô hình TCP/IP và mô hình OSI là gì?',
    ARRAY['Mô hình TCP/IP gộp tầng Session, Presentation, Application của OSI thành duy nhất một tầng Application', 'Mô hình OSI có ít tầng hơn TCP/IP', 'TCP/IP tách biệt Physical thành 2 tầng độc lập', 'OSI không có tầng Network như TCP/IP'],
    ARRAY['Mô hình TCP/IP gộp tầng Session, Presentation, Application của OSI thành duy nhất một tầng Application']::varchar[],
    'Mô hình TCP/IP tinh gọn và thực tế hơn, gom 3 tầng ứng dụng của OSI thành 1 tầng Application duy nhất.',
    6, 'Network Architecture', 'cs_networking_security', 13, 'cs_net_01'
  ),
  (
    'cs_net_q_007', 'mcq', 'network-architecture',
    'Địa chỉ cổng Port được sử dụng và quản lý ở tầng nào trong mô hình OSI?',
    ARRAY['Tầng 4 (Transport Layer)', 'Tầng 3 (Network Layer)', 'Tầng 2 (Data Link Layer)', 'Tầng 7 (Application Layer)'],
    ARRAY['Tầng 4 (Transport Layer)']::varchar[],
    'Tầng 4 (Transport) dùng số hiệu cổng (Port Number) để định tuyến dữ liệu đến đúng tiến trình ứng dụng đang chạy trên host.',
    5, 'Network Architecture', 'cs_networking_security', 13, 'cs_net_01'
  ),
  (
    'cs_net_q_008', 'mcq', 'network-architecture',
    'Tại sao việc bóc tách tiêu đề (Decapsulation) lại diễn ra ở máy nhận?',
    ARRAY['Để loại bỏ thông tin Header điều khiển của tầng tương ứng và chuyển dữ liệu gốc lên tầng cao hơn', 'Để mã hóa thông tin bảo mật', 'Để chia nhỏ gói tin ra làm nhiều phần', 'Để tính toán đường đi ngắn nhất'],
    ARRAY['Để loại bỏ thông tin Header điều khiển của tầng tương ứng và chuyển dữ liệu gốc lên tầng cao hơn']::varchar[],
    'Khi nhận dữ liệu, gói tin đi từ dưới lên, mỗi tầng bóc phần Header điều khiển của tầng tương ứng mà máy gửi đã gắn vào.',
    5, 'Network Architecture', 'cs_networking_security', 13, 'cs_net_01'
  ),
  (
    'cs_net_q_009', 'short-answer', 'network-architecture',
    'Điền tên tiếng Anh của đơn vị dữ liệu (PDU) ở Tầng 3 (Network Layer). (Viết thường)',
    NULL,
    ARRAY['packet', 'gói tin']::varchar[],
    'PDU của Tầng mạng là Packet chứa địa chỉ IP nguồn/đích.',
    5, 'Network Architecture', 'cs_networking_security', 13, 'cs_net_01'
  ),
  (
    'cs_net_q_010', 'short-answer', 'network-architecture',
    'Điền số lượng tầng của mô hình quy chuẩn lý thuyết OSI. (Điền chữ số)',
    NULL,
    ARRAY['7']::varchar[],
    'Mô hình OSI có đúng 7 tầng lý thuyết.',
    5, 'Network Architecture', 'cs_networking_security', 13, 'cs_net_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Tầng ứng dụng & Các giao thức (cs_net_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_net_q_011', 'mcq', 'network-architecture',
    'Cải tiến đột phá nào giúp HTTP/2 tối ưu hơn HTTP/1.1 khi tải trang web?',
    ARRAY['Cho phép ghép kênh đa luồng (Multiplexing) truyền song song nhiều file trên duy nhất 1 kết nối TCP', 'Chuyển đổi giao thức từ TCP sang UDP', 'Sử dụng mô hình ngang hàng P2P', 'Bắt buộc mã hóa bằng cặp khóa đối xứng'],
    ARRAY['Cho phép ghép kênh đa luồng (Multiplexing) truyền song song nhiều file trên duy nhất 1 kết nối TCP']::varchar[],
    'HTTP/2 ghép nhiều luồng dữ liệu song song trên một kết nối TCP, khắc phục lỗi nghẽn đầu hàng (Head-of-Line Blocking) của HTTP/1.1.',
    6, 'Application Protocols', 'cs_networking_security', 13, 'cs_net_02'
  ),
  (
    'cs_net_q_012', 'mcq', 'network-architecture',
    'Sự khác biệt cốt lõi về mặt giao vận giữa HTTP/3 và HTTP/2 là gì?',
    ARRAY['HTTP/3 chạy trên giao thức QUIC (xây dựng trên UDP) để loại bỏ lỗi nghẽn đầu hàng của kết nối; HTTP/2 chạy trên TCP', 'HTTP/3 chỉ chạy trên cáp quang', 'HTTP/2 bảo mật hơn HTTP/3', 'HTTP/3 không dùng địa chỉ IP'],
    ARRAY['HTTP/3 chạy trên giao thức QUIC (xây dựng trên UDP) để loại bỏ lỗi nghẽn đầu hàng của kết nối; HTTP/2 chạy trên TCP']::varchar[],
    'HTTP/3 sử dụng QUIC (UDP) giúp các dòng dữ liệu hoàn toàn độc lập, mất 1 gói tin của luồng này không làm ảnh hưởng đến các luồng khác.',
    7, 'Application Protocols', 'cs_networking_security', 13, 'cs_net_02'
  ),
  (
    'cs_net_q_013', 'mcq', 'network-architecture',
    'Hệ thống DNS (Domain Name System) thực hiện nhiệm vụ gì?',
    ARRAY['Ánh xạ chuyển đổi tên miền thân thiện thành địa chỉ IP vật lý tương ứng', 'Cấp phát IP động cho thiết bị trong mạng LAN', 'Mã hóa nội dung của trang web', 'Lọc các gói tin mạng độc hại'],
    ARRAY['Ánh xạ chuyển đổi tên miền thân thiện thành địa chỉ IP vật lý tương ứng']::varchar[],
    'DNS giống như danh bạ internet, giúp người dùng không cần nhớ những con số IP phức tạp.',
    5, 'DNS Mechanics', 'cs_networking_security', 13, 'cs_net_02'
  ),
  (
    'cs_net_q_014', 'mcq', 'network-architecture',
    'DNS chủ yếu sử dụng giao thức giao vận nào ở cổng 53 để thực hiện truy vấn nhanh?',
    ARRAY['UDP', 'TCP', 'SCTP', 'ICMP'],
    ARRAY['UDP']::varchar[],
    'DNS ưu tiên UDP vì các gói tin truy vấn và phản hồi có dung lượng nhỏ, cần tốc độ nhanh và chi phí thiết lập kết nối thấp.',
    5, 'DNS Mechanics', 'cs_networking_security', 13, 'cs_net_02'
  ),
  (
    'cs_net_q_015', 'mcq', 'network-architecture',
    'Authoritative DNS Server có vai trò gì trong hệ thống DNS?',
    ARRAY['Là máy chủ DNS cuối cùng thực sự nắm giữ và trả về bản ghi cấu hình IP của tên miền được truy vấn', 'Là máy chủ lưu tạm thời cache tên miền', 'Là máy chủ gốc Root Server quản lý toàn bộ internet', 'Là máy chủ DNS của nhà mạng ISP cung cấp'],
    ARRAY['Là máy chủ DNS cuối cùng thực sự nắm giữ và trả về bản ghi cấu hình IP của tên miền được truy vấn']::varchar[],
    'Authoritative DNS Server là nơi quản trị viên cấu hình các bản ghi (A, CNAME, MX) của tên miền đó.',
    6, 'DNS Mechanics', 'cs_networking_security', 13, 'cs_net_02'
  ),
  (
    'cs_net_q_016', 'mcq', 'network-architecture',
    'Giao thức SMTP (Simple Mail Transfer Protocol) dùng để làm gì?',
    ARRAY['Gửi thư điện tử (Email) từ client lên mail server hoặc giữa các mail server với nhau', 'Tải file dữ liệu lên host', 'Dịch địa chỉ IP nội bộ', 'Xác thực chứng chỉ bảo mật'],
    ARRAY['Gửi thư điện tử (Email) từ client lên mail server hoặc giữa các mail server với nhau']::varchar[],
    'SMTP (cổng 25) là giao thức đẩy (push protocol) chuyên dụng cho việc truyền tải email đi.',
    5, 'Application Protocols', 'cs_networking_security', 13, 'cs_net_02'
  ),
  (
    'cs_net_q_017', 'mcq', 'network-architecture',
    'Sự khác biệt cơ bản giữa giao thức IMAP và POP3 khi nhận mail là gì?',
    ARRAY['IMAP đồng bộ hóa và lưu trữ mail trực tiếp trên server; POP3 tải mail về máy cục bộ và thường xóa mail trên server', 'POP3 bảo mật hơn IMAP', 'IMAP chạy nhanh hơn POP3 gấp 10 lần', 'POP3 chỉ dùng cho điện thoại di động'],
    ARRAY['IMAP đồng bộ hóa và lưu trữ mail trực tiếp trên server; POP3 tải mail về máy cục bộ và thường xóa mail trên server']::varchar[],
    'IMAP phù hợp khi người dùng đọc mail trên nhiều thiết bị khác nhau vì hộp thư luôn được đồng bộ trực tuyến trên máy chủ.',
    6, 'Application Protocols', 'cs_networking_security', 13, 'cs_net_02'
  ),
  (
    'cs_net_q_018', 'mcq', 'network-architecture',
    'Giao thức DNSSEC được thiết kế nhằm mục đích gì trong hệ thống DNS?',
    ARRAY['Xác thực tính toàn vẹn và nguồn gốc của dữ liệu DNS bằng chữ ký số, ngăn chặn tấn công đầu độc DNS cache (DNS poisoning)', 'Mã hóa nội dung truy vấn DNS để chống nghe lén', 'Tăng tốc độ phân giải tên miền', 'Cho phép truy vấn DNS không cần qua internet'],
    ARRAY['Xác thực tính toàn vẹn và nguồn gốc của dữ liệu DNS bằng chữ ký số, ngăn chặn tấn công đầu độc DNS cache (DNS poisoning)']::varchar[],
    'DNSSEC dùng chữ ký số mật mã công khai để đảm bảo bản ghi IP nhận về là chính xác từ server chuẩn, chống bị lừa hướng truy cập.',
    7, 'DNS Mechanics', 'cs_networking_security', 13, 'cs_net_02'
  ),
  (
    'cs_net_q_019', 'short-answer', 'network-architecture',
    'Điền tên viết tắt của giao thức truyền tải siêu văn bản đóng vai trò là nền tảng của mạng Web toàn cầu. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['HTTP']::varchar[],
    'HTTP là HyperText Transfer Protocol.',
    5, 'Application Protocols', 'cs_networking_security', 13, 'cs_net_02'
  ),
  (
    'cs_net_q_020', 'short-answer', 'network-architecture',
    'Điền số hiệu cổng Port mặc định của dịch vụ truyền file dữ liệu không an toàn FTP điều khiển. (Điền số)',
    NULL,
    ARRAY['21']::varchar[],
    'FTP điều khiển chạy ở cổng 21, truyền dữ liệu chạy ở cổng 20.',
    5, 'Application Protocols', 'cs_networking_security', 13, 'cs_net_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Giao thức Tầng giao vận (cs_net_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_net_q_021', 'mcq', 'data-transmission',
    'Tại sao giao thức UDP lại được ưu tiên sử dụng trong lập trình Game online và Livestream?',
    ARRAY['Vì UDP không tốn chi phí bắt tay thiết lập kết nối, tiêu đề nhẹ và truyền trực tiếp không chờ xác nhận, giúp giảm tối đa độ trễ', 'Vì UDP đảm bảo 100% không mất gói tin', 'Vì UDP có khả năng tự động nén dữ liệu', 'Vì UDP chỉ chạy trên hệ điều hành di động'],
    ARRAY['Vì UDP không tốn chi phí bắt tay thiết lập kết nối, tiêu đề nhẹ và truyền trực tiếp không chờ xác nhận, giúp giảm tối đa độ trễ']::varchar[],
    'Với game hay video, độ trễ quan trọng hơn độ tin cậy tuyệt đối. Mất vài khung hình không sao, nhưng nghẽn lại để đợi truyền lại sẽ làm đứng hình/lag.',
    6, 'Transport Layer Protocols', 'cs_networking_security', 13, 'cs_net_03'
  ),
  (
    'cs_net_q_022', 'mcq', 'data-transmission',
    'Trong bắt tay 3 bước của TCP, gói tin đầu tiên được Client gửi đi chứa cờ (Flag) nào được thiết lập?',
    ARRAY['SYN', 'ACK', 'FIN', 'RST']::varchar[],
    ARRAY['SYN']::varchar[],
    'SYN (Synchronize) là gói tin bắt đầu yêu cầu đồng bộ hóa số thứ tự kết nối từ Client gửi tới Server.',
    5, 'Transport Layer Protocols', 'cs_networking_security', 13, 'cs_net_03'
  ),
  (
    'cs_net_q_023', 'mcq', 'data-transmission',
    'Sau khi nhận gói tin SYN với số thứ tự khởi tạo $Seq = 100$ từ Client, Server phản hồi gói tin SYN-ACK chứa số xác nhận ($Ack$) bằng bao nhiêu?',
    ARRAY['101', '100', '201', '99']::varchar[],
    ARRAY['101']::varchar[],
    'Số xác nhận $Ack$ của TCP chỉ ra số thứ tự tiếp theo mà máy gửi mong đợi nhận được: $Ack = Seq_{nhận} + 1$. Ở đây $100 + 1 = 101$.',
    6, 'Transport Layer Protocols', 'cs_networking_security', 13, 'cs_net_03'
  ),
  (
    'cs_net_q_024', 'mcq', 'data-transmission',
    'Tại sao quá trình đóng kết nối TCP lại tốn 4 bước bắt tay (4-way Handshake) thay vì 3 bước?',
    ARRAY['Vì TCP là kết nối song song hai chiều độc lập; mỗi bên phải chủ động đóng và xác nhận dòng truyền của mình một cách riêng biệt', 'Vì cần xác thực chứng chỉ số của Client', 'Vì để tránh lỗi tràn bộ đệm của máy chủ', 'Do quy định bắt buộc của hệ điều hành'],
    ARRAY['Vì TCP là kết nối song song hai chiều độc lập; mỗi bên phải chủ động đóng và xác nhận dòng truyền của mình một cách riêng biệt']::varchar[],
    'Khi Client gửi FIN và Server trả ACK, kết nối ở trạng thái đóng một nửa (Half-close). Server vẫn có thể truyền nốt dữ liệu dang dở cho Client trước khi gửi FIN của nó.',
    7, 'Transport Layer Protocols', 'cs_networking_security', 13, 'cs_net_03'
  ),
  (
    'cs_net_q_025', 'mcq', 'data-transmission',
    'Trạng thái "TIME_WAIT" ở cuối quá trình đóng kết nối TCP có vai trò gì?',
    ARRAY['Giữ cổng kết nối mở một khoảng thời gian để đảm bảo gói tin ACK cuối cùng đến đích và xử lý các gói tin đi lạc cũ', 'Đợi người dùng đăng nhập lại', 'Đẩy dữ liệu còn sót lại lên cache', 'Tự động kiểm tra virus của cổng mạng'],
    ARRAY['Giữ cổng kết nối mở một khoảng thời gian để đảm bảo gói tin ACK cuối cùng đến đích và xử lý các gói tin đi lạc cũ']::varchar[],
    'TIME_WAIT (thường kéo dài 2 MSL) bảo vệ hệ thống không bị gán nhầm các gói tin đi lạc của kết nối cũ vào kết nối mới sử dụng cùng số hiệu cổng.',
    7, 'Transport Layer Protocols', 'cs_networking_security', 13, 'cs_net_03'
  ),
  (
    'cs_net_q_026', 'mcq', 'data-transmission',
    'Tiêu đề (Header) của gói tin TCP tối thiểu dài bao nhiêu byte?',
    ARRAY['20 bytes', '8 bytes', '40 bytes', '64 bytes'],
    ARRAY['20 bytes']::varchar[],
    'Tiêu đề TCP chuẩn dài 20 bytes chứa các thông tin Seq, Ack, Ports, Flags, Window size... trong khi UDP chỉ dài 8 bytes.',
    5, 'Transport Layer Protocols', 'cs_networking_security', 13, 'cs_net_03'
  ),
  (
    'cs_net_q_027', 'mcq', 'data-transmission',
    'Giao thức giao vận nào có thuộc tính "phi trạng thái" (Stateless), không cần duy trì thông tin kết nối trong bộ nhớ kernel?',
    ARRAY['UDP', 'TCP', 'SCTP', 'TLS'],
    ARRAY['UDP']::varchar[],
    'UDP gửi gói tin độc lập (Datagrams), hệ điều hành không cần lưu trạng thái kết nối, giúp tiết kiệm tối đa RAM máy chủ.',
    5, 'Transport Layer Protocols', 'cs_networking_security', 13, 'cs_net_03'
  ),
  (
    'cs_net_q_028', 'mcq', 'data-transmission',
    'Cờ (Flag) "RST" (Reset) trong tiêu đề TCP được thiết lập khi nào?',
    ARRAY['Khi có sự cố nghiêm trọng xảy ra và một bên muốn chấm dứt kết nối lập tức không qua thủ tục đóng thông thường', 'Khi bắt đầu thiết lập kết nối', 'Khi muốn tăng kích thước cửa sổ nhận', 'Khi gói tin bị mất trên đường truyền'],
    ARRAY['Khi có sự cố nghiêm trọng xảy ra và một bên muốn chấm dứt kết nối lập tức không qua thủ tục đóng thông thường']::varchar[],
    'RST dùng để từ chối một kết nối không hợp lệ hoặc ngắt ngang kết nối bị treo lập tức.',
    6, 'Transport Layer Protocols', 'cs_networking_security', 13, 'cs_net_03'
  ),
  (
    'cs_net_q_029', 'short-answer', 'data-transmission',
    'Điền tên viết tắt của giao thức tầng giao vận tin cậy, hướng kết nối bảo đảm tính toàn vẹn dữ liệu. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['TCP']::varchar[],
    'TCP là Transmission Control Protocol.',
    5, 'Transport Layer Protocols', 'cs_networking_security', 13, 'cs_net_03'
  ),
  (
    'cs_net_q_030', 'short-answer', 'data-transmission',
    'Điền tên cờ (Flag) được dùng trong TCP để báo hiệu ngắt kết nối. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['FIN']::varchar[],
    'Cờ FIN (Finish) khởi đầu quá trình ngắt kết nối TCP.',
    5, 'Transport Layer Protocols', 'cs_networking_security', 13, 'cs_net_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Kiểm soát luồng & Kiểm soát tắc nghẽn của TCP (cs_net_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_net_q_031', 'mcq', 'data-transmission',
    'Cơ chế "Sliding Window" (Cửa sổ trượt) của TCP kiểm soát luồng dữ liệu dựa trên thông số nào gửi từ máy nhận?',
    ARRAY['Receive Window (rwnd) - Dung lượng bộ đệm còn trống của máy nhận', 'Congestion Window (cwnd) - Trạng thái tắc nghẽn của mạng', 'Sequence Number của gói tin cuối cùng', 'Độ trễ truyền tin RTT'],
    ARRAY['Receive Window (rwnd) - Dung lượng bộ đệm còn trống của máy nhận']::varchar[],
    'rwnd được gửi trong TCP Header của gói tin ACK báo cho máy gửi biết dung lượng trống tối đa của buffer nhận.',
    5, 'TCP Flow & Congestion', 'cs_networking_security', 13, 'cs_net_04'
  ),
  (
    'cs_net_q_032', 'mcq', 'data-transmission',
    'Trong kiểm soát tắc nghẽn TCP, đại lượng `cwnd` (Congestion Window) được duy trì bởi ai?',
    ARRAY['Thiết bị gửi (Sender)', 'Thiết bị nhận (Receiver)', 'Các Router trung gian trên đường truyền', 'Nhà mạng ISP cung cấp đường truyền'],
    ARRAY['Thiết bị gửi (Sender)']::varchar[],
    'Khác với rwnd do máy nhận quyết định, cwnd hoàn toàn do máy gửi tự tính toán và duy trì dựa trên phản ứng với đường truyền mạng.',
    6, 'TCP Flow & Congestion', 'cs_networking_security', 13, 'cs_net_04'
  ),
  (
    'cs_net_q_033', 'mcq', 'data-transmission',
    'Thuật toán "Slow Start" (Khởi đầu chậm) của TCP tăng kích thước cửa sổ tắc nghẽn `cwnd` như thế nào qua từng chu kỳ RTT?',
    ARRAY['Tăng gấp đôi theo hàm mũ (Exponentially)', 'Tăng tuyến tính cộng 1 (Linearly)', 'Tăng theo hàm bậc hai', 'Giữ nguyên không thay đổi'],
    ARRAY['Tăng gấp đôi theo hàm mũ (Exponentially)']::varchar[],
    'Slow Start bắt đầu với cwnd nhỏ (1-10 MSS) nhưng tăng rất nhanh gấp đôi sau mỗi chu kỳ nhận đủ ACK để nhanh chóng khai thác băng thông còn trống.',
    6, 'TCP Flow & Congestion', 'cs_networking_security', 13, 'cs_net_04'
  ),
  (
    'cs_net_q_034', 'mcq', 'data-transmission',
    'Khi kích thước cửa sổ tắc nghẽn `cwnd` chạm ngưỡng ssthresh (Slow Start Threshold), TCP chuyển sang chạy thuật toán nào?',
    ARRAY['Congestion Avoidance (Tránh tắc nghẽn)', 'Slow Start tiếp tục', 'Fast Retransmit', 'Fast Recovery'],
    ARRAY['Congestion Avoidance (Tránh tắc nghẽn)']::varchar[],
    'Khi chạm ngưỡng ssthresh, hệ thống chuyển sang Congestion Avoidance để thăm dò băng thông an toàn hơn, tránh gây sập mạng đột ngột.',
    6, 'TCP Flow & Congestion', 'cs_networking_security', 13, 'cs_net_04'
  ),
  (
    'cs_net_q_035', 'mcq', 'data-transmission',
    'Thuật toán "Congestion Avoidance" tăng kích thước `cwnd` như thế nào qua mỗi chu kỳ RTT?',
    ARRAY['Tăng tuyến tính: cwnd = cwnd + 1 MSS', 'Tăng gấp đôi theo hàm mũ', 'Tăng lên bình phương lần', 'Giảm đi một nửa'],
    ARRAY['Tăng tuyến tính: cwnd = cwnd + 1 MSS']::varchar[],
    'Congestion Avoidance tăng tuyến tính cộng 1 MSS sau mỗi RTT (Additive Increase) để hạn chế tối đa việc gây nghẽn mạng.',
    6, 'TCP Flow & Congestion', 'cs_networking_security', 13, 'cs_net_04'
  ),
  (
    'cs_net_q_036', 'mcq', 'data-transmission',
    'Thuật toán "Fast Retransmit" kích hoạt việc truyền lại gói tin bị mất lập tức khi phát hiện sự kiện nào?',
    ARRAY['Nhận liên tiếp 3 gói tin ACK trùng lặp (Triple Duplicate ACKs) từ máy nhận', 'Thời gian chờ RTO (Retransmission Timeout) kết thúc', 'Máy nhận gửi gói tin RST yêu cầu kết nối lại', 'Khi kích thước cửa sổ nhận rwnd về 0'],
    ARRAY['Nhận liên tiếp 3 gói tin ACK trùng lặp (Triple Duplicate ACKs) từ máy nhận']::varchar[],
    'Nhận liên tiếp 3 duplicate ACK báo hiệu gói tin tiếp theo bị mất nhưng mạng vẫn lưu thông tốt (các gói tin sau đó vẫn tới đích làm máy nhận gửi ACK phản hồi liên tục).',
    7, 'TCP Flow & Congestion', 'cs_networking_security', 13, 'cs_net_04'
  ),
  (
    'cs_net_q_037', 'mcq', 'data-transmission',
    'Khi xảy ra sự kiện mất gói tin nghiêm trọng dẫn đến hết thời gian chờ Timeout (RTO), TCP phản ứng thế nào với `cwnd` và `ssthresh`?',
    ARRAY['Đặt cwnd về 1 MSS, giảm ssthresh đi một nửa', 'Giữ nguyên cwnd, tăng ssthresh gấp đôi', 'Đặt cwnd bằng ssthresh, giữ nguyên trạng', 'Đặt cả hai về giá trị mặc định là 0'],
    ARRAY['Đặt cwnd về 1 MSS, giảm ssthresh đi một nửa']::varchar[],
    'Sự kiện Timeout biểu thị mạng bị nghẽn cực kỳ nghiêm trọng, bắt buộc TCP phải reset hoàn toàn cwnd về 1 và bắt đầu lại từ Slow Start.',
    7, 'TCP Flow & Congestion', 'cs_networking_security', 13, 'cs_net_04'
  ),
  (
    'cs_net_q_038', 'mcq', 'data-transmission',
    'Thuật toán "Fast Recovery" giúp TCP khôi phục sau sự kiện mất gói tin (phát hiện qua 3 duplicate ACKs) tối ưu hơn Timeout thế nào?',
    ARRAY['Giảm ssthresh xuống một nửa, đặt cwnd bằng ssthresh + 3 và tiếp tục tăng tuyến tính mà không cần reset cwnd về 1', 'Cho phép gửi dữ liệu trực tiếp qua UDP', 'Tự động bỏ qua gói tin bị mất', 'Tăng kích thước cửa sổ nhận lên tối đa'],
    ARRAY['Giảm ssthresh xuống một nửa, đặt cwnd bằng ssthresh + 3 và tiếp tục tăng tuyến tính mà không cần reset cwnd về 1']::varchar[],
    'Vì mạng vẫn chuyển được các gói tin sau đó đến đích (nên mới có 3 duplicate ACK), ta kết luận mạng chỉ nghẽn nhẹ, không cần reset về 1 gây phí băng thông.',
    7, 'TCP Flow & Congestion', 'cs_networking_security', 13, 'cs_net_04'
  ),
  (
    'cs_net_q_039', 'short-answer', 'data-transmission',
    'Điền tên viết tắt của cửa sổ tắc nghẽn được duy trì và tính toán bởi máy gửi. (Viết thường)',
    NULL,
    ARRAY['cwnd']::varchar[],
    'cwnd là Congestion Window.',
    5, 'TCP Flow & Congestion', 'cs_networking_security', 13, 'cs_net_04'
  ),
  (
    'cs_net_q_040', 'short-answer', 'data-transmission',
    'Điền tên viết tắt của cửa sổ nhận biểu thị dung lượng trống còn lại của bộ đệm máy nhận. (Viết thường)',
    NULL,
    ARRAY['rwnd']::varchar[],
    'rwnd là Receive Window.',
    5, 'TCP Flow & Congestion', 'cs_networking_security', 13, 'cs_net_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Định tuyến & Tầng mạng (cs_net_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_net_q_041', 'mcq', 'data-transmission',
    'Kích thước bit địa chỉ của IPv4 và IPv6 lần lượt là bao nhiêu?',
    ARRAY['32 bit và 128 bit', '32 bit và 64 bit', '64 bit và 128 bit', '16 bit và 32 bit']::varchar[],
    ARRAY['32 bit và 128 bit']::varchar[],
    'IPv4 dài 32 bit cung cấp khoảng 4.3 tỷ IP. IPv6 dài 128 bit giải quyết triệt để cạn kiệt địa chỉ.',
    5, 'IP & Subnetting', 'cs_networking_security', 13, 'cs_net_05'
  ),
  (
    'cs_net_q_042', 'mcq', 'data-transmission',
    'Trong CIDR biểu diễn `192.168.1.0/26`, số bit dành cho phần Host ID là bao nhiêu?',
    ARRAY['6 bit', '26 bit', '8 bit', '32 bit'],
    ARRAY['6 bit']::varchar[],
    'Tổng số bit của IPv4 là 32 bit. Số bit Host = 32 - 26 = 6 bit.',
    6, 'IP & Subnetting', 'cs_networking_security', 13, 'cs_net_05'
  ),
  (
    'cs_net_q_043', 'mcq', 'data-transmission',
    'Số lượng thiết bị (host) tối đa có thể gán IP hợp lệ trong mạng con `10.0.0.0/24` là bao nhiêu?',
    ARRAY['254', '256', '512', '128'],
    ARRAY['254']::varchar[],
    'Số bit host là 32 - 24 = 8. Số IP gán cho host là $2^8 - 2 = 254$ (trừ IP mạng .0 và IP broadcast .255).',
    6, 'IP & Subnetting', 'cs_networking_security', 13, 'cs_net_05'
  ),
  (
    'cs_net_q_044', 'mcq', 'data-transmission',
    'Địa chỉ IP `192.168.1.255` của mạng con `192.168.1.0/24` đóng vai trò là địa chỉ gì?',
    ARRAY['Địa chỉ quảng bá (Broadcast Address) dùng để gửi dữ liệu cho tất cả các thiết bị trong mạng con đó', 'Địa chỉ của Router Gateway mặc định', 'Địa chỉ IP tĩnh của máy chủ đầu tiên', 'Địa chỉ không hợp lệ bị cấm sử dụng'],
    ARRAY['Địa chỉ quảng bá (Broadcast Address) dùng để gửi dữ liệu cho tất cả các thiết bị trong mạng con đó']::varchar[],
    'Địa chỉ có toàn bộ các bit host bằng 1 là địa chỉ Broadcast của mạng con đó.',
    5, 'IP & Subnetting', 'cs_networking_security', 13, 'cs_net_05'
  ),
  (
    'cs_net_q_045', 'mcq', 'data-transmission',
    'Cơ chế NAT (Network Address Translation) hoạt động thế nào để tiết kiệm IPv4?',
    ARRAY['Chuyển đổi các địa chỉ IP nội bộ (Private IP) của mạng LAN thành một địa chỉ IP công cộng (Public IP) duy nhất khi đi ra internet', 'Tự động nhân đôi băng thông mạng', 'Mã hóa địa chỉ IP chống nghe lén', 'Tự động nâng cấp IPv4 lên IPv6'],
    ARRAY['Chuyển đổi các địa chỉ IP nội bộ (Private IP) của mạng LAN thành một địa chỉ IP công cộng (Public IP) duy nhất khi đi ra internet']::varchar[],
    'NAT cho phép hàng ngàn máy trong cơ quan dùng chung 1 IP Public mạng WAN ngoài internet nhờ vào việc thay đổi Port ở header giao vận (NAPT).',
    6, 'IP & Subnetting', 'cs_networking_security', 13, 'cs_net_05'
  ),
  (
    'cs_net_q_046', 'mcq', 'data-transmission',
    'Thuật toán định tuyến dạng "Link-state" (ví dụ OSPF) tìm đường đi ngắn nhất dựa trên nguyên lý nào?',
    ARRAY['Mỗi router xây dựng bản đồ toàn vẹn của đồ thị mạng và dùng giải thuật Dijkstra để tính đường đi ngắn nhất', 'Chỉ trao đổi thông tin với các router kề cận và đếm số bước nhảy hop count', 'Chọn đường đi ngẫu nhiên', 'Chỉ đi theo đường cáp vật lý ngắn nhất'],
    ARRAY['Mỗi router xây dựng bản đồ toàn vẹn của đồ thị mạng và dùng giải thuật Dijkstra để tính đường đi ngắn nhất']::varchar[],
    'Link-state đòi hỏi router trao đổi trạng thái liên kết (LSA) toàn mạng để có cái nhìn toàn cảnh đồ thị rồi chạy Dijkstra cục bộ.',
    7, 'Routing Algorithms', 'cs_networking_security', 13, 'cs_net_05'
  ),
  (
    'cs_net_q_047', 'mcq', 'data-transmission',
    'Giao thức định tuyến dạng "Distance-vector" (ví dụ RIP) sử dụng thuật toán nào để tính khoảng cách?',
    ARRAY['Bellman-Ford', 'Dijkstra', 'Kruskal', 'Floyd-Warshall'],
    ARRAY['Bellman-Ford']::varchar[],
    'Distance-vector chạy thuật toán Bellman-Ford phân tán bằng cách trao đổi định kỳ bảng định tuyến với các hàng xóm kề cạnh.',
    7, 'Routing Algorithms', 'cs_networking_security', 13, 'cs_net_05'
  ),
  (
    'cs_net_q_048', 'mcq', 'data-transmission',
    'Hiện tượng "Count to Infinity" (Đếm đến vô cùng) là nhược điểm của nhóm giao thức định tuyến nào?',
    ARRAY['Distance-vector Routing (RIP)', 'Link-state Routing (OSPF)', 'BGP Routing', 'Static Routing'],
    ARRAY['Distance-vector Routing (RIP)']::varchar[],
    'Count to Infinity xảy ra khi một liên kết bị đứt nhưng thông tin cập nhật chậm trễ làm các router hàng xóm lầm tưởng và tăng dần hop count vô hạn. Khắc phục bằng Split Horizon hoặc Route Poisoning.',
    7, 'Routing Algorithms', 'cs_networking_security', 13, 'cs_net_05'
  ),
  (
    'cs_net_q_049', 'short-answer', 'data-transmission',
    'Điền tên viết tắt của cơ chế dịch chuyển IP nội bộ thành IP công cộng WAN khi ra ngoài internet. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['NAT']::varchar[],
    'NAT là Network Address Translation.',
    5, 'IP & Subnetting', 'cs_networking_security', 13, 'cs_net_05'
  ),
  (
    'cs_net_q_050', 'short-answer', 'data-transmission',
    'Điền mặt nạ mạng (Subnet Mask) tương ứng dưới dạng các số thập phân phân cách bởi dấu chấm của cấu hình CIDR `/24`.',
    NULL,
    ARRAY['255.255.255.0']::varchar[],
    'CIDR /24 có 24 bit 1 liên tiếp, tương đương Subnet Mask 255.255.255.0.',
    5, 'IP & Subnetting', 'cs_networking_security', 13, 'cs_net_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Tầng liên kết dữ liệu & Mạng LAN (cs_net_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_net_q_051', 'mcq', 'network-architecture',
    'Địa chỉ vật lý MAC (Media Access Control) có độ dài bao nhiêu bit?',
    ARRAY['48 bit', '32 bit', '64 bit', '128 bit']::varchar[],
    ARRAY['48 bit']::varchar[],
    'Địa chỉ MAC dài 48 bit (6 bytes) được viết dưới dạng các nhóm thập lục phân phân cách bởi dấu hai chấm.',
    5, 'LAN & ARP', 'cs_networking_security', 13, 'cs_net_06'
  ),
  (
    'cs_net_q_052', 'mcq', 'network-architecture',
    'Giao thức ARP (Address Resolution Protocol) thực hiện nhiệm vụ gì?',
    ARRAY['Tìm địa chỉ MAC vật lý tương ứng khi đã biết địa chỉ IP logic của thiết bị đích trong mạng LAN', 'Tìm địa chỉ IP khi biết địa chỉ MAC', 'Cấp phát IP động cho thiết bị mới', 'Dịch chuyển địa chỉ cổng Port'],
    ARRAY['Tìm địa chỉ MAC vật lý tương ứng khi đã biết địa chỉ IP logic của thiết bị đích trong mạng LAN']::varchar[],
    'ARP tìm kiếm MAC đích trong mạng nội bộ để card mạng đóng gói Frame gửi đi.',
    5, 'LAN & ARP', 'cs_networking_security', 13, 'cs_net_06'
  ),
  (
    'cs_net_q_053', 'mcq', 'network-architecture',
    'Khi máy A gửi ARP Request để hỏi địa chỉ MAC của máy B, gói tin này được truyền đi dưới dạng nào?',
    ARRAY['Quảng bá (Broadcast) gửi tới tất cả các máy trong mạng LAN', 'Đơn gửi (Unicast) gửi riêng cho máy B', 'Nhóm gửi (Multicast) gửi cho một số máy', 'Gửi trực tiếp lên Router'],
    ARRAY['Quảng bá (Broadcast) gửi tới tất cả các máy trong mạng LAN']::varchar[],
    'Vì máy A chưa biết MAC của máy B, nó buộc phải broadcast gói ARP Request lên địa chỉ MAC đích `FF:FF:FF:FF:FF:FF`.',
    6, 'LAN & ARP', 'cs_networking_security', 13, 'cs_net_06'
  ),
  (
    'cs_net_q_054', 'mcq', 'network-architecture',
    'Switch (Thiết bị chuyển mạch) thực hiện chuyển tiếp các khung tin (Frames) dựa vào bảng thông tin nào?',
    ARRAY['Bảng MAC (MAC Table)', 'Bảng định tuyến (Routing Table)', 'Bảng bảng băm DNS', 'Bảng quy tắc tường lửa'],
    ARRAY['Bảng MAC (MAC Table)']::varchar[],
    'Switch hoạt động ở tầng 2, học địa chỉ MAC nguồn và chuyển tiếp Frame dựa trên MAC đích.',
    5, 'LAN & ARP', 'cs_networking_security', 13, 'cs_net_06'
  ),
  (
    'cs_net_q_055', 'mcq', 'network-architecture',
    'Điều gì xảy ra khi Switch nhận được một Frame có địa chỉ MAC đích chưa tồn tại trong bảng MAC của nó?',
    ARRAY['Gửi Frame ra tất cả các cổng khác trừ cổng nhận vào (Flooding)', 'Lập tức huỷ bỏ Frame đó', 'Gửi trả lại thiết bị gửi', 'Yêu cầu Router phân giải địa chỉ'],
    ARRAY['Gửi Frame ra tất cả các cổng khác trừ cổng nhận vào (Flooding)']::varchar[],
    'Khi chưa biết MAC đích nằm ở cổng nào, Switch buộc phải Flooding ra mọi cổng để đảm bảo gói tin đến được đích, sau đó ghi nhận cổng phản hồi để học địa chỉ.',
    6, 'LAN & ARP', 'cs_networking_security', 13, 'cs_net_06'
  ),
  (
    'cs_net_q_056', 'mcq', 'network-architecture',
    'Ưu điểm lớn nhất của Switch so với thiết bị Hub cũ là gì?',
    ARRAY['Switch chia nhỏ mạng thành các miền đụng độ (Collision Domain) riêng biệt cho từng cổng, loại bỏ đụng độ dữ liệu', 'Switch chạy không cần nguồn điện', 'Switch tự động cấp phát IP', 'Switch định tuyến được các gói tin trên internet'],
    ARRAY['Switch chia nhỏ mạng thành các miền đụng độ (Collision Domain) riêng biệt cho từng cổng, loại bỏ đụng độ dữ liệu']::varchar[],
    'Hub chia sẻ chung băng thông vật lý gây đụng độ liên tục. Switch tạo kênh kết nối logic riêng giữa cổng gửi và nhận, tối ưu hiệu năng.',
    6, 'LAN & ARP', 'cs_networking_security', 13, 'cs_net_06'
  ),
  (
    'cs_net_q_057', 'mcq', 'network-architecture',
    'Cơ chế "CSMA/CD" giải quyết bài toán đụng độ dữ liệu trên đường truyền Ethernet dùng chung thế nào?',
    ARRAY['Lắng nghe đường truyền trước khi gửi; phát hiện đụng độ thì dừng lại, gửi tín hiệu jam signal và đợi một khoảng thời gian ngẫu nhiên (Backoff) rồi thử lại', 'Chỉ cho phép duy nhất một máy truyền dữ liệu trong ngày', 'Tự động mã hóa dữ liệu thành các tần số khác nhau', 'Sử dụng cấu trúc Token Ring truyền vòng tròn'],
    ARRAY['Lắng nghe đường truyền trước khi gửi; phát hiện đụng độ thì dừng lại, gửi tín hiệu jam signal và đợi một khoảng thời gian ngẫu nhiên (Backoff) rồi thử lại']::varchar[],
    'CSMA/CD giúp tối ưu việc dùng chung cáp đồng Ethernet chia sẻ, giảm thiểu việc đè tín hiệu chéo làm mất dữ liệu.',
    6, 'LAN & ARP', 'cs_networking_security', 13, 'cs_net_06'
  ),
  (
    'cs_net_q_058', 'mcq', 'network-architecture',
    'Tấn công "ARP Spoofing" thực hiện hành vi độc hại nào trong mạng LAN?',
    ARRAY['Gửi liên tiếp các gói ARP Reply giả mạo để liên kết địa chỉ IP của Gateway với địa chỉ MAC của hacker, biến hacker thành kẻ nghe lén ở giữa (MitM)', 'Đọc trộm mật khẩu lưu trữ trong ROM', 'Làm tràn ngập lưu lượng băng thông card mạng', 'Tấn công làm sập nguồn điện của Switch'],
    ARRAY['Gửi liên tiếp các gói ARP Reply giả mạo để liên kết địa chỉ IP của Gateway với địa chỉ MAC của hacker, biến hacker thành kẻ nghe lén ở giữa (MitM)']::varchar[],
    'Hacker lừa máy nạn nhân gửi toàn bộ dữ liệu đi internet qua máy của nó trước khi tới router gateway.',
    7, 'LAN & ARP', 'cs_networking_security', 13, 'cs_net_06'
  ),
  (
    'cs_net_q_059', 'short-answer', 'network-architecture',
    'Điền tên viết tắt của giao thức phân giải địa chỉ IP sang MAC. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['ARP']::varchar[],
    'ARP là Address Resolution Protocol.',
    5, 'LAN & ARP', 'cs_networking_security', 13, 'cs_net_06'
  ),
  (
    'cs_net_q_060', 'short-answer', 'network-architecture',
    'Điền địa chỉ MAC quảng bá (Broadcast MAC) viết bằng chữ hoa cách nhau bởi dấu hai chấm.',
    NULL,
    ARRAY['FF:FF:FF:FF:FF:FF']::varchar[],
    'Địa chỉ MAC quảng bá chứa toàn bộ các bit 1, viết dạng hex là FF:FF:FF:FF:FF:FF.',
    5, 'LAN & ARP', 'cs_networking_security', 13, 'cs_net_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Mã hóa đối xứng & Không đối xứng (cs_net_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_net_q_061', 'mcq', 'cryptography-protocols',
    'Đặc trưng cốt lõi của Mã hóa đối xứng (Symmetric Encryption) là gì?',
    ARRAY['Sử dụng duy nhất một khóa dùng chung cho cả quá trình mã hóa và giải mã', 'Sử dụng cặp khóa công khai và bí mật độc lập', 'Không thể giải mã được dữ liệu sau khi mã hóa', 'Chỉ chạy được trên môi trường mạng LAN'],
    ARRAY['Sử dụng duy nhất một khóa dùng chung cho cả quá trình mã hóa và giải mã']::varchar[],
    'Mã hóa đối xứng (như AES) đòi hỏi hai bên gửi nhận phải cùng giữ một khoá bí mật duy nhất.',
    5, 'Cryptography', 'cs_networking_security', 13, 'cs_net_07'
  ),
  (
    'cs_net_q_062', 'mcq', 'cryptography-protocols',
    'Thuật toán mã hóa đối xứng nào được coi là chuẩn công nghiệp và an toàn nhất hiện nay?',
    ARRAY['AES', 'DES', 'RSA', 'MD5'],
    ARRAY['AES']::varchar[],
    'AES (Advanced Encryption Standard) thay thế DES cũ lỗi thời và bảo vệ hầu hết dữ liệu nhạy cảm hiện nay.',
    5, 'Cryptography', 'cs_networking_security', 13, 'cs_net_07'
  ),
  (
    'cs_net_q_063', 'mcq', 'cryptography-protocols',
    'Mã hóa không đối xứng (Asymmetric Encryption) giải quyết kẽ hở lớn nào của mã hóa đối xứng?',
    ARRAY['Giải quyết bài toán truyền khóa an toàn qua môi trường mạng không an toàn bằng việc sử dụng Public Key để mã hóa và Private Key để giải mã', 'Tăng tốc độ mã hóa nhanh gấp 100 lần', 'Giảm dung lượng file sau khi mã hóa', 'Tự động kiểm tra tính liên kết của dữ liệu'],
    ARRAY['Giải quyết bài toán truyền khóa an toàn qua môi trường mạng không an toàn bằng việc sử dụng Public Key để mã hóa và Private Key để giải mã']::varchar[],
    'Người nhận gửi Public Key cho bất kỳ ai để mã hoá. Không ai có thể giải mã được trừ phi có Private Key được giữ kín của người nhận.',
    6, 'Cryptography', 'cs_networking_security', 13, 'cs_net_07'
  ),
  (
    'cs_net_q_064', 'mcq', 'cryptography-protocols',
    'Khi bạn muốn gửi một bức thư mật mã hóa không đối xứng cho đối tác B, bạn sử dụng khóa nào để mã hóa thư?',
    ARRAY['Khóa công khai (Public Key) của đối tác B', 'Khóa bí mật (Private Key) của bạn', 'Khóa công khai của bạn', 'Khóa bí mật của đối tác B'],
    ARRAY['Khóa công khai (Public Key) của đối tác B']::varchar[],
    'Muốn B đọc được, ta phải dùng Public Key của B để mã hoá. Chỉ có Private Key của B mới giải mã được.',
    6, 'Cryptography', 'cs_networking_security', 13, 'cs_net_07'
  ),
  (
    'cs_net_q_065', 'mcq', 'cryptography-protocols',
    'Chữ ký số (Digital Signature) được tạo ra bằng cách mã hóa mã băm (Hash) của văn bản bằng khóa nào của người gửi?',
    ARRAY['Khóa bí mật (Private Key) của người gửi', 'Khóa công khai (Public Key) của người gửi', 'Khóa công khai của người nhận', 'Khóa đối xứng dùng chung'],
    ARRAY['Khóa bí mật (Private Key) của người gửi']::varchar[],
    'Mã hóa bằng Private Key của mình chứng thực bản thân chính là người ký, vì người nhận dùng Public Key của mình giải mã thành công.',
    7, 'Cryptography', 'cs_networking_security', 13, 'cs_net_07'
  ),
  (
    'cs_net_q_066', 'mcq', 'cryptography-protocols',
    'Để kiểm tra tính toàn vẹn và xác thực của Chữ ký số nhận được, người nhận sử dụng khóa nào để giải mã chữ ký?',
    ARRAY['Khóa công khai (Public Key) của người gửi', 'Khóa bí mật (Private Key) của người nhận', 'Khóa bí mật của người gửi', 'Khóa công khai của người nhận'],
    ARRAY['Khóa công khai (Public Key) của người gửi']::varchar[],
    'Giải mã chữ ký số bằng Public Key của người gửi giúp lấy ra mã băm gốc để đối chiếu, xác thực danh tính.',
    6, 'Cryptography', 'cs_networking_security', 13, 'cs_net_07'
  ),
  (
    'cs_net_q_067', 'mcq', 'cryptography-protocols',
    'Bài toán toán học làm nền tảng bảo mật cho thuật toán mật mã RSA là gì?',
    ARRAY['Bài toán phân tích một số nguyên cực lớn thành các thừa số nguyên tố', 'Bài toán tính logarit rời rạc', 'Bài toán tìm đường đi ngắn nhất đồ thị', 'Bài toán tính diện tích hình học vi phân'],
    ARRAY['Bài toán phân tích một số nguyên cực lớn thành các thừa số nguyên tố']::varchar[],
    'Phép nhân hai số nguyên tố lớn cực nhanh, nhưng phép phân tích ngược lại (factorization) tốn hàng ngàn năm tính toán của siêu máy tính.',
    7, 'Cryptography', 'cs_networking_security', 13, 'cs_net_07'
  ),
  (
    'cs_net_q_068', 'mcq', 'cryptography-protocols',
    'Thuộc tính "Chống đụng độ" (Collision Resistance) của một hàm băm an toàn (như SHA-256) có nghĩa là gì?',
    ARRAY['Cực kỳ khó tìm được hai văn bản đầu vào khác nhau có cùng một giá trị mã băm đầu ra', 'Hàm băm chạy không tốn bộ nhớ RAM', 'Hàm băm có thể đảo ngược để lấy dữ liệu gốc', 'Hàm băm tự động phát hiện mã độc hại'],
    ARRAY['Cực kỳ khó tìm được hai văn bản đầu vào khác nhau có cùng một giá trị mã băm đầu ra']::varchar[],
    'Chống đụng độ bảo vệ chữ ký số không bị hacker giả mạo bằng cách sửa nội dung văn bản mà vẫn giữ nguyên chữ ký cũ.',
    7, 'Cryptography', 'cs_networking_security', 13, 'cs_net_07'
  ),
  (
    'cs_net_q_069', 'short-answer', 'cryptography-protocols',
    'Điền tên thuật toán mã hóa đối xứng an toàn phổ biến nhất hiện nay. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['AES']::varchar[],
    'AES là Advanced Encryption Standard.',
    5, 'Cryptography', 'cs_networking_security', 13, 'cs_net_07'
  ),
  (
    'cs_net_q_070', 'short-answer', 'cryptography-protocols',
    'Điền tên thuật toán mã hóa không đối xứng kinh điển đặt tên theo Rivest, Shamir và Adleman. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['RSA']::varchar[],
    'RSA là thuật toán mật mã không đối xứng phổ biến nhất.',
    5, 'Cryptography', 'cs_networking_security', 13, 'cs_net_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Bảo mật kênh truyền TLS/SSL & HTTPS (cs_net_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_net_q_071', 'mcq', 'cryptography-protocols',
    'Giao thức HTTPS chạy trên cổng Port mặc định nào?',
    ARRAY['443', '80', '22', '8080'],
    ARRAY['443']::varchar[],
    'HTTPS mặc định chạy ở cổng bảo mật 443, HTTP chạy cổng 80.',
    5, 'TLS/SSL & HTTPS', 'cs_networking_security', 13, 'cs_net_08'
  ),
  (
    'cs_net_q_072', 'mcq', 'cryptography-protocols',
    'Chứng chỉ số X.509 gửi từ Server chứa thông tin cốt lõi nào của Server đó để Client xác thực?',
    ARRAY['Khóa công khai (Public Key) của Server và chữ ký số của tổ chức CA', 'Khóa bí mật (Private Key) của Server', 'Lịch sử truy cập của trang web', 'Mật khẩu cơ sở dữ liệu của admin'],
    ARRAY['Khóa công khai (Public Key) của Server và chữ ký số của tổ chức CA']::varchar[],
    'Chứng chỉ chứa Public Key để mã hoá kênh truyền và chữ ký CA để bảo đảm Public Key này đúng là của trang web đó, tránh giả mạo.',
    6, 'TLS/SSL & HTTPS', 'cs_networking_security', 13, 'cs_net_08'
  ),
  (
    'cs_net_q_073', 'mcq', 'cryptography-protocols',
    'Trong quá trình bắt tay TLS (TLS Handshake), Client gửi mã bí mật Pre-Master Secret cho Server bằng cách nào để chống nghe lén?',
    ARRAY['Mã hóa Pre-Master Secret bằng Public Key của Server nhận từ chứng chỉ số', 'Gửi trực tiếp dạng văn bản thô', 'Mã hóa bằng khóa đối xứng dùng chung', 'Gửi qua kết nối mạng nội bộ riêng'],
    ARRAY['Mã hóa Pre-Master Secret bằng Public Key của Server nhận từ chứng chỉ số']::varchar[],
    'Chỉ có Private Key của Server thật mới giải mã được gói tin này để lấy Pre-Master Secret, bảo đảm tính bảo mật tuyệt đối.',
    7, 'TLS/SSL & HTTPS', 'cs_networking_security', 13, 'cs_net_08'
  ),
  (
    'cs_net_q_074', 'mcq', 'cryptography-protocols',
    'Sau khi hoàn tất quá trình bắt tay TLS, toàn bộ dữ liệu giao tiếp giữa trình duyệt và server được bảo mật bằng phương thức nào?',
    ARRAY['Mã hóa đối xứng bằng khóa phiên (Session Key) được tạo ra từ Pre-Master Secret', 'Tiếp tục mã hóa không đối xứng RSA chậm chạp', 'Không mã hóa nữa vì kênh truyền đã an toàn', 'Gửi dữ liệu dạng băm một chiều'],
    ARRAY['Mã hóa đối xứng bằng khóa phiên (Session Key) được tạo ra từ Pre-Master Secret']::varchar[],
    'Sử dụng mã hóa đối xứng ở bước truyền dữ liệu thực tế giúp hệ thống chạy rất nhanh mà vẫn bảo mật.',
    6, 'TLS/SSL & HTTPS', 'cs_networking_security', 13, 'cs_net_08'
  ),
  (
    'cs_net_q_075', 'mcq', 'cryptography-protocols',
    'Làm thế nào để trình duyệt web có thể tin tưởng và xác minh chữ ký số của tổ chức CA trên chứng chỉ gửi về từ website?',
    ARRAY['Trình duyệt tích hợp sẵn Public Key của các CA lớn uy tín toàn cầu trong bộ mã nguồn để tự động đối chiếu xác thực', 'Trình duyệt gửi truy vấn hỏi ý kiến người dùng', 'Gửi xác thực lên máy chủ DNS', 'Trình duyệt kết nối trực tiếp vào máy chủ của CA mỗi lần tải trang'],
    ARRAY['Trình duyệt tích hợp sẵn Public Key của các CA lớn uy tín toàn cầu trong bộ mã nguồn để tự động đối chiếu xác thực']::varchar[],
    'Các nhà phát triển trình duyệt/OS duy trì một kho chứng chỉ gốc (Root CA Store) chứa sẵn Public Key của các CA uy tín để xác minh chứng chỉ ngoại vi cục bộ cực nhanh.',
    7, 'TLS/SSL & HTTPS', 'cs_networking_security', 13, 'cs_net_08'
  ),
  (
    'cs_net_q_076', 'mcq', 'cryptography-protocols',
    'Cải tiến lớn nhất của chuẩn TLS 1.3 so với TLS 1.2 là gì?',
    ARRAY['Rút ngắn số bước bắt tay TLS từ 2 RTT xuống còn 1 RTT, loại bỏ các thuật toán mật mã cũ yếu bảo mật', 'Bắt buộc chạy trên UDP', 'Không cần dùng chứng chỉ số CA nữa', 'Cho phép truy cập web không cần cổng 443'],
    ARRAY['Rút ngắn số bước bắt tay TLS từ 2 RTT xuống còn 1 RTT, loại bỏ các thuật toán mật mã cũ yếu bảo mật']::varchar[],
    'TLS 1.3 tăng tốc độ kết nối web bảo mật vượt trội nhờ rút ngắn số vòng truyền tin bắt tay và nâng cao bảo mật bằng các bộ cipher suite hiện đại.',
    7, 'TLS/SSL & HTTPS', 'cs_networking_security', 13, 'cs_net_08'
  ),
  (
    'cs_net_q_077', 'mcq', 'cryptography-protocols',
    'Tấn công giả mạo "Man-in-the-Middle" (MitM) bị chặn đứng bởi HTTPS chủ yếu nhờ vào yếu tố nào?',
    ARRAY['Hacker không có Private Key tương ứng với Public Key của server thật trong chứng chỉ số để giải mã khóa đối xứng tạm thời', 'Hacker bị chặn bởi tường lửa của hệ điều hành', 'Hacker không thể đọc được gói tin HTTP', 'Do DNS tự động chặn địa chỉ IP của hacker'],
    ARRAY['Hacker không có Private Key tương ứng với Public Key của server thật trong chứng chỉ số để giải mã khóa đối xứng tạm thời']::varchar[],
    'Nếu hacker gửi chứng chỉ giả, trình duyệt sẽ báo đỏ ngay vì chữ ký số không khớp với bất kỳ CA nào trong máy.',
    7, 'TLS/SSL & HTTPS', 'cs_networking_security', 13, 'cs_net_08'
  ),
  (
    'cs_net_q_078', 'mcq', 'cryptography-protocols',
    'Bảo mật HTTPS bảo vệ người dùng khỏi nguy cơ nào sau đây?',
    ARRAY['Bị kẻ xấu nghe lén hoặc sửa đổi nội dung thông tin gửi nhận trên đường truyền mạng (ví dụ ở quán cafe wifi công cộng)', 'Bị hacker tấn công tràn bộ đệm máy chủ', 'Bị lỗi chèn mã SQL Injection vào database', 'Bị lây nhiễm virus từ file tải về'],
    ARRAY['Bị kẻ xấu nghe lén hoặc sửa đổi nội dung thông tin gửi nhận trên đường truyền mạng (ví dụ ở quán cafe wifi công cộng)']::varchar[],
    'HTTPS mã hoá toàn diện đường truyền giữa trình duyệt và server, chống nghe lén thông tin nhạy cảm.',
    6, 'TLS/SSL & HTTPS', 'cs_networking_security', 13, 'cs_net_08'
  ),
  (
    'cs_net_q_079', 'short-answer', 'cryptography-protocols',
    'Điền tên viết tắt của tổ chức trung gian uy tín ký xác thực chứng chỉ số cho các website. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['CA']::varchar[],
    'CA là Certificate Authority.',
    5, 'TLS/SSL & HTTPS', 'cs_networking_security', 13, 'cs_net_08'
  ),
  (
    'cs_net_q_080', 'short-answer', 'cryptography-protocols',
    'Điền tên viết tắt của giao thức bảo mật lớp giao vận chạy dưới HTTP để tạo nên HTTPS. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['TLS']::varchar[],
    'TLS (Transport Layer Security) thay thế cho SSL cũ.',
    5, 'TLS/SSL & HTTPS', 'cs_networking_security', 13, 'cs_net_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Tường lửa & Hệ thống phát hiện xâm nhập (cs_net_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_net_q_081', 'mcq', 'system-defenses',
    'Tường lửa lọc gói tin tĩnh (Packet Filtering Firewall) lọc dữ liệu ra vào chủ yếu dựa trên thông tin nào?',
    ARRAY['Địa chỉ IP nguồn/đích, cổng Port và giao thức (Tầng 3/4)', 'Nội dung truy vấn SQL', 'Trạng thái phiên kết nối TCP', 'Mã băm chữ ký số của file'],
    ARRAY['Địa chỉ IP nguồn/đích, cổng Port và giao thức (Tầng 3/4)']::varchar[],
    'Packet filtering chỉ kiểm tra header IP và TCP/UDP thô sơ, không lưu trạng thái kết nối nên tốc độ nhanh nhưng dễ bị đánh lừa.',
    5, 'Firewalls & IDS/IPS', 'cs_networking_security', 13, 'cs_net_09'
  ),
  (
    'cs_net_q_082', 'mcq', 'system-defenses',
    'Cơ chế "Stateful Inspection" của tường lửa hiện đại mang lại ưu điểm gì?',
    ARRAY['Theo dõi trạng thái kết nối TCP; chỉ cho phép gói tin đi vào nếu nó thuộc về một kết nối hợp lệ khởi tạo từ trước bên trong hệ thống', 'Tự động sửa lỗi code của ứng dụng', 'Chạy quét virus toàn bộ ổ cứng', 'Chặn tất cả các địa chỉ IP của nước ngoài'],
    ARRAY['Stateful Inspection của tường lửa hiện đại mang lại ưu điểm gì?', 'Theo dõi trạng thái kết nối TCP; chỉ cho phép gói tin đi vào nếu nó thuộc về một kết nối hợp lệ khởi tạo từ trước bên trong hệ thống']::varchar[],
    'Stateful inspection firewall duy trì bảng trạng thái kết nối (connection state table), tăng cường độ bảo mật vượt trội.',
    6, 'Firewalls & IDS/IPS', 'cs_networking_security', 13, 'cs_net_09'
  ),
  (
    'cs_net_q_083', 'mcq', 'system-defenses',
    'Tường lửa ứng dụng web WAF (Web Application Firewall) được dùng để phòng ngừa các nguy cơ nào?',
    ARRAY['Ngăn chặn các cuộc tấn công tầng ứng dụng nhắm vào web như SQL Injection, Cross-Site Scripting (XSS)', 'Chặn đứng virus lây lan qua cổng USB', 'Tối ưu hóa RAM cho máy chủ web', 'Ngăn chặn tràn bộ nhớ stack của CPU'],
    ARRAY['Ngăn chặn các cuộc tấn công tầng ứng dụng nhắm vào web như SQL Injection, Cross-Site Scripting (XSS)']::varchar[],
    'WAF phân tích sâu payload tầng 7 (HTTP content) để phát hiện và chặn các truy vấn chứa ký tự lạ độc hại.',
    6, 'Firewalls & IDS/IPS', 'cs_networking_security', 13, 'cs_net_09'
  ),
  (
    'cs_net_q_084', 'mcq', 'system-defenses',
    'Hệ thống IDS (Intrusion Detection System) hoạt động ở chế độ nào?',
    ARRAY['Thụ động (Passive / Out-of-band) để giám sát và đưa ra cảnh báo cho quản trị viên chứ không trực tiếp chặn gói tin', 'Chủ động (In-line) trực tiếp chặn các gói tin độc hại', 'Tự động cách ly máy tính bị nhiễm virus', 'Chạy quét lỗ hổng ứng dụng định kỳ'],
    ARRAY['Thụ động (Passive / Out-of-band) để giám sát và đưa ra cảnh báo cho quản trị viên chứ không trực tiếp chặn gói tin']::varchar[],
    'IDS hoạt động qua cơ chế SPAN port (nhận bản sao traffic), đảm bảo không gây trễ mạng nhưng không thể tự ngăn chặn sự cố tức thì.',
    6, 'Firewalls & IDS/IPS', 'cs_networking_security', 13, 'cs_net_09'
  ),
  (
    'cs_net_q_085', 'mcq', 'system-defenses',
    'Sự khác biệt cốt lõi giữa IPS (Intrusion Prevention System) và IDS là gì?',
    ARRAY['IPS hoạt động ở chế độ In-line (chủ động) để tự động chặn đứng các gói tin độc hại ngay khi phát hiện; IDS chỉ cảnh báo', 'IDS chạy nhanh hơn IPS gấp nhiều lần', 'IDS có cơ sở dữ liệu signature lớn hơn IPS', 'IPS không sử dụng được trong mạng doanh nghiệp'],
    ARRAY['IPS hoạt động ở chế độ In-line (chủ động) để tự động chặn đứng các gói tin độc hại ngay khi phát hiện; IDS chỉ cảnh báo']::varchar[],
    'IPS nằm trực tiếp trên luồng truyền tin (in-line), có khả năng drop gói tin, reset kết nối TCP bị nghi vấn để bảo vệ lập tức.',
    6, 'Firewalls & IDS/IPS', 'cs_networking_security', 13, 'cs_net_09'
  ),
  (
    'cs_net_q_086', 'mcq', 'system-defenses',
    'Phương pháp phát hiện "Signature-based" của IDS/IPS hoạt động theo nguyên lý nào?',
    ARRAY['So sánh lưu lượng mạng với cơ sở dữ liệu các mẫu hành vi tấn công đã biết trước (chữ ký tấn công)', 'Phát hiện sự sai lệch so với hành vi bình thường của hệ thống', 'Dự đoán hướng tấn công bằng trí tuệ nhân tạo', 'Đọc mã hash của các tệp tin lưu trên ổ cứng'],
    ARRAY['So sánh lưu lượng mạng với cơ sở dữ liệu các mẫu hành vi tấn công đã biết trước (chữ ký tấn công)']::varchar[],
    'Signature-based chính xác cao, ít báo động giả nhưng bất lực trước các cuộc tấn công mới chưa được cập nhật mẫu (Zero-day).',
    6, 'Firewalls & IDS/IPS', 'cs_networking_security', 13, 'cs_net_09'
  ),
  (
    'cs_net_q_087', 'mcq', 'system-defenses',
    'Nhược điểm lớn nhất của phương pháp phát hiện dựa trên bất thường "Anomaly-based" của IDS/IPS là gì?',
    ARRAY['Dễ tạo ra nhiều cảnh báo giả (False Positives) do các hoạt động bình thường nhưng lạ lẫm của người dùng', 'Không phát hiện được các cuộc tấn công Zero-day', 'Tốc độ quét rất chậm', 'Không lưu được log dữ liệu'],
    ARRAY['Dễ tạo ra nhiều cảnh báo giả (False Positives) do các hoạt động bình thường nhưng lạ lẫm của người dùng']::varchar[],
    'Mọi thay đổi hành vi (ví dụ admin backup database ban đêm) có thể bị hệ thống hiểu lầm là bất thường độc hại.',
    7, 'Firewalls & IDS/IPS', 'cs_networking_security', 13, 'cs_net_09'
  ),
  (
    'cs_net_q_088', 'mcq', 'system-defenses',
    'Để chặn đứng một máy tính trong mạng nội bộ liên tục gửi spam, ta cấu hình luật iptables thế nào?',
    ARRAY['Chặn địa chỉ IP của máy đó tại bảng INPUT của tường lửa', 'Tăng kích thước cache L1', 'Đổi địa chỉ MAC của gateway', 'Mã hóa kết nối mạng bằng TLS'],
    ARRAY['Chặn địa chỉ IP của máy đó tại bảng INPUT của tường lửa']::varchar[],
    'Tường lửa lọc gói tin chặn dứt điểm IP nguồn gây hại tiếp cận hệ thống.',
    5, 'Firewalls & IDS/IPS', 'cs_networking_security', 13, 'cs_net_09'
  ),
  (
    'cs_net_q_089', 'short-answer', 'system-defenses',
    'Điền tên viết tắt của hệ thống phát hiện xâm nhập mạng thụ động. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['IDS']::varchar[],
    'IDS là Intrusion Detection System.',
    5, 'Firewalls & IDS/IPS', 'cs_networking_security', 13, 'cs_net_09'
  ),
  (
    'cs_net_q_090', 'short-answer', 'system-defenses',
    'Điền tên viết tắt của tường lửa ứng dụng web chuyên dụng tầng 7. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['WAF']::varchar[],
    'WAF là Web Application Firewall.',
    5, 'Firewalls & IDS/IPS', 'cs_networking_security', 13, 'cs_net_09'
  );

-- ======================================================================================
-- BÀI GIẢNG 10: Các cuộc tấn công mạng phổ biến & Phòng ngừa (cs_net_10) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_net_q_091', 'mcq', 'system-defenses',
    'Cuộc tấn công "SYN Flood" lợi dụng sơ hở nào trong bắt tay 3 bước của TCP?',
    ARRAY['Server phản hồi SYN-ACK và treo tài nguyên đợi ACK bước 3 từ Client, hacker gửi liên tục SYN giả mạo làm cạn kiệt hàng đợi kết nối của server', 'Hacker đè địa chỉ MAC của server', 'Hacker gửi tệp tin virus lên RAM', 'Hacker giải mã khóa đối xứng'],
    ARRAY['Server phản hồi SYN-ACK và treo tài nguyên đợi ACK bước 3 từ Client, hacker gửi liên tục SYN giả mạo làm cạn kiệt hàng đợi kết nối của server']::varchar[],
    'Server phải lưu trạng thái nửa mở (Half-open connection) trong hàng đợi SYN Queue, khiến server quá tải khi nhận dồn dập tin SYN giả.',
    6, 'Network Attacks', 'cs_networking_security', 13, 'cs_net_10'
  ),
  (
    'cs_net_q_092', 'mcq', 'system-defenses',
    'Kỹ thuật "SYN Cookies" giúp chống lại tấn công SYN Flood bằng cách nào?',
    ARRAY['Server không cấp phát bộ nhớ cho kết nối nửa mở mà mã hóa thông tin trạng thái vào Sequence Number của gói SYN-ACK gửi đi', 'Server tự động ngắt kết nối', 'Server chặn địa chỉ IP nguồn', 'Server mã hóa dữ liệu bằng RSA'],
    ARRAY['Server không cấp phát bộ nhớ cho kết nối nửa mở mà mã hóa thông tin trạng thái vào Sequence Number của gói SYN-ACK gửi đi']::varchar[],
    'Nhờ SYN Cookies, server chỉ cấp phát tài nguyên khi nhận lại ACK chứa cookie hợp lệ ở bước 3, loại bỏ hoàn toàn việc treo hàng đợi.',
    7, 'Network Attacks', 'cs_networking_security', 13, 'cs_net_10'
  ),
  (
    'cs_net_q_093', 'mcq', 'system-defenses',
    'Nguyên nhân cốt lõi dẫn đến lỗ hổng bảo mật "SQL Injection" (SQLi) là gì?',
    ARRAY['Ứng dụng chèn trực tiếp chuỗi nhập liệu của người dùng vào câu lệnh truy vấn SQL mà không lọc bỏ các ký tự điều khiển toán học', 'Database bị sụt nguồn điện', 'Hacker biết mật khẩu của database', 'Ứng dụng sử dụng HTTPS cổng 443'],
    ARRAY['Ứng dụng chèn trực tiếp chuỗi nhập liệu của người dùng vào câu lệnh truy vấn SQL mà không lọc bỏ các ký tự điều khiển toán học']::varchar[],
    'Sự thiếu kiểm soát khiến trình biên dịch SQL hiểu lầm dữ liệu người dùng nhập vào là lệnh SQL và thực thi nó.',
    6, 'Web Security', 'cs_networking_security', 13, 'cs_net_10'
  ),
  (
    'cs_net_q_094', 'mcq', 'system-defenses',
    'Biện pháp triệt để nhất để phòng chống lỗ hổng bảo mật SQL Injection là gì?',
    ARRAY['Sử dụng Parameterized Queries (Prepared Statements) để tách biệt hoàn toàn phần câu lệnh truy vấn và dữ liệu đầu vào', 'Cài đặt phần mềm diệt virus', 'Mã hóa database bằng AES', 'Tắt hoàn toàn cổng 80 của website'],
    ARRAY['Sử dụng Parameterized Queries (Prepared Statements) để tách biệt hoàn toàn phần câu lệnh truy vấn và dữ liệu đầu vào']::varchar[],
    'Prepared Statements biên dịch trước cấu trúc SQL, dữ liệu truyền vào sau đó chỉ được xem là tham số thô không có khả năng thực thi.',
    6, 'Web Security', 'cs_networking_security', 13, 'cs_net_10'
  ),
  (
    'cs_net_q_095', 'mcq', 'system-defenses',
    'Lỗ hổng bảo mật "Cross-Site Scripting" (XSS) cho phép hacker thực hiện hành vi nguy hiểm nào?',
    ARRAY['Chèn mã kịch bản độc hại (thường là JavaScript) vào trang web để chạy trên trình duyệt của người dùng khác và cướp Session Cookie', 'Thay đổi cấu trúc bảng của database', 'Làm sập máy chủ web', 'Nghe lén cáp quang vật lý'],
    ARRAY['Chèn mã kịch bản độc hại (thường là JavaScript) vào trang web để chạy trên trình duyệt của người dùng khác và cướp Session Cookie']::varchar[],
    'Mã độc JS chạy dưới danh nghĩa người dùng hợp lệ, giúp hacker dễ dàng lấy cắp token, cookie gửi về server riêng.',
    6, 'Web Security', 'cs_networking_security', 13, 'cs_net_10'
  ),
  (
    'cs_net_q_096', 'mcq', 'system-defenses',
    'Để phòng chống tấn công XSS, ta nên thực hiện các biện pháp nào ở ứng dụng?',
    ARRAY['Lọc dữ liệu đầu vào (Input Sanitization) và mã hóa ký tự đầu ra (Output Encoding/Escaping)', 'Sử dụng Prepared Statements', 'Mã hóa cookie bằng khóa RSA', 'Chỉ cho phép chạy web ở local'],
    ARRAY['Lọc dữ liệu đầu vào (Input Sanitization) và mã hóa ký tự đầu ra (Output Encoding/Escaping)']::varchar[],
    'Mã hóa đầu ra chuyển các ký tự đặc biệt như `<` thành `&lt;` để trình duyệt hiểu là text thông thường chứ không thực thi làm script.',
    6, 'Web Security', 'cs_networking_security', 13, 'cs_net_10'
  ),
  (
    'cs_net_q_097', 'mcq', 'system-defenses',
    'Chính sách bảo mật "CSP" (Content Security Policy) cấu hình ở header HTTP giúp trình duyệt chống lại nguy cơ nào?',
    ARRAY['Hạn chế nguồn tải tài nguyên và thực thi script hợp lệ, giảm thiểu tác hại của cuộc tấn công XSS', 'Chống lại tấn công SQL Injection', 'Ngăn chặn tràn bộ đệm stack overflow', 'Mã hóa mật khẩu người dùng'],
    ARRAY['Hạn chế nguồn tải tài nguyên và thực thi script hợp lệ, giảm thiểu tác hại của cuộc tấn công XSS']::varchar[],
    'CSP ngăn chặn trình duyệt thực thi inline script tự phát hoặc tải script từ các domain không có trong whitelist của admin.',
    7, 'Web Security', 'cs_networking_security', 13, 'cs_net_10'
  ),
  (
    'cs_net_q_098', 'mcq', 'system-defenses',
    'Tấn công "DNS Cache Poisoning" (Đầu độc cache DNS) hoạt động theo nguyên lý nào?',
    ARRAY['Gửi các gói tin phản hồi DNS giả mạo chứa IP độc hại đến máy chủ DNS trung gian để lưu lại cache, hướng người dùng truy cập web giả', 'Tấn công dồn dập làm sập server DNS', 'Đổi tên miền của google.com', 'Mã hóa bảng ghi DNS gốc'],
    ARRAY['Gửi các gói tin phản hồi DNS giả mạo chứa IP độc hại đến máy chủ DNS trung gian để lưu lại cache, hướng người dùng truy cập web giả']::varchar[],
    'Hacker lừa máy chủ DNS lưu bản ghi giả mạo, làm mọi người dùng đi qua DNS đó bị điều hướng đến website lừa đảo.',
    7, 'Network Attacks', 'cs_networking_security', 13, 'cs_net_10'
  ),
  (
    'cs_net_q_099', 'short-answer', 'system-defenses',
    'Điền tên viết tắt của cuộc tấn công chèn mã SQL độc hại vào ô nhập liệu của website. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['SQL Injection', 'SQLi', 'sqli']::varchar[],
    'SQL Injection là lỗ hổng bảo mật database cực kỳ phổ biến.',
    5, 'Web Security', 'cs_networking_security', 13, 'cs_net_10'
  ),
  (
    'cs_net_q_100', 'short-answer', 'system-security-io',
    'Điền tên viết tắt của kỹ thuật phòng ngự chống lại tấn công SYN Flood bằng cách mã hóa trạng thái vào sequence number. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['SYN COOKIES', 'SYN COOKIE']::varchar[],
    'SYN Cookies bảo vệ máy chủ khỏi bị tràn hàng đợi kết nối.',
    5, 'Network Attacks', 'cs_networking_security', 13, 'cs_net_10'
  );

COMMIT;
