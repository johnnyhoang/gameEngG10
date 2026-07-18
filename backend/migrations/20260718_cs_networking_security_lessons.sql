-- SQL migration to seed topics and 10 core lessons for cs_networking_security (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_networking_security (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('network-architecture', 'cs_networking_security', 13, 'Kiến trúc & Phân tầng Mạng', 'Mô hình OSI và TCP/IP, các giao thức tầng ứng dụng, tầng liên kết dữ liệu ARP và hoạt động của Switch.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('data-transmission', 'cs_networking_security', 13, 'Truyền tải & Định tuyến dữ liệu', 'Giao thức giao vận TCP vs UDP, thuật toán kiểm soát tắc nghẽn, giao thức định tuyến IPv4/IPv6 và chia mạng con.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('cryptography-protocols', 'cs_networking_security', 13, 'Mật mã & Bảo mật Kênh truyền', 'Mã hóa đối xứng AES, không đối xứng RSA, chữ ký số bảo mật, bắt tay bảo mật TLS/SSL và chứng chỉ số CA.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('system-defenses', 'cs_networking_security', 13, 'Phòng ngự & Tấn công Hệ thống', 'Nguyên lý hoạt động của Tường lửa WAF, IDS/IPS, phòng ngừa tấn công DDoS, SQL Injection, XSS và ARP Spoofing.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_networking_security (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_net_01', 
    'cs_networking_security', 
    13, 
    'Kiến trúc & Phân tầng Mạng', 
    'Mô hình mạng phân tầng (OSI vs TCP/IP)', 
    '### 1. 7 Tầng mô hình OSI (Open Systems Interconnection)
Mô hình quy chuẩn lý thuyết gồm 7 tầng:
1. **Physical:** Truyền tải dòng bit nhị phân thô qua môi trường vật lý (cáp đồng, cáp quang, sóng vô tuyến).
2. **Data Link:** Truyền tải các khung tin (Frames) tin cậy giữa hai node kề nhau; kiểm soát lỗi, dòng chảy và địa chỉ vật lý MAC.
3. **Network:** Định tuyến gói tin (Packets) giữa các mạng khác nhau; quản lý địa chỉ logic IP.
4. **Transport:** Truyền dữ liệu end-to-end tin cậy giữa hai tiến trình; quản lý cổng Port và phân đoạn dữ liệu (Segments).
5. **Session:** Thiết lập, duy trì và đồng bộ hóa các phiên kết nối giữa hai ứng dụng.
6. **Presentation:** Chuyển đổi định dạng dữ liệu (mã hóa, nén, format chuỗi).
7. **Application:** Cung cấp giao diện trực tiếp cho các ứng dụng phần mềm giao tiếp mạng (HTTP, DNS).

### 2. 4 Tầng mô hình thực tế TCP/IP
- **Link Layer:** Gộp Physical và Data Link của OSI.
- **Internet Layer:** Tương đương Network của OSI (IP).
- **Transport Layer:** Tương đương Transport của OSI (TCP, UDP).
- **Application Layer:** Gộp Session, Presentation và Application của OSI.

### 3. Đóng gói (Encapsulation) & Mở gói (Decapsulation)
- **Đóng gói:** Dữ liệu đi từ tầng ứng dụng xuống sẽ được thêm tiêu đề (Header) của từng tầng tương ứng để tạo ra đơn vị dữ liệu chuẩn (Data -> Segment -> Packet -> Frame -> Bits).
- **Mở gói:** Thiết bị nhận bóc tách từng Header tương ứng khi dữ liệu đi ngược lên các tầng.', 
    'core-theory', 
    '["Khi bạn gửi email, dữ liệu chữ được mã hóa (Presentation), đóng gói port TCP (Transport), gán IP người nhận (Network), đóng gói địa chỉ MAC (Data Link) rồi chuyển thành tín hiệu điện (Physical).", "Router hoạt động chủ yếu ở Tầng 3 (Network Layer) để định tuyến IP, trong khi Switch hoạt động ở Tầng 2 (Data Link) để chuyển mạch MAC."]'::jsonb, 
    '["Mô hình OSI là mô hình tham chiếu lý thuyết, trong khi TCP/IP là kiến trúc giao thức thực tế đang vận hành internet.", "Mỗi tầng chỉ giao tiếp trực tiếp với tầng ngay trên và dưới nó, giúp thiết kế mạng mô-đun hóa dễ dàng.", "Quá trình encapsulation thêm Header chứa thông tin điều khiển, decapsulation bóc Header để lấy dữ liệu gốc."]'::jsonb, 
    5, 
    TRUE,
    'network-architecture'
  ),
  (
    'cs_net_02', 
    'cs_networking_security', 
    13, 
    'Kiến trúc & Phân tầng Mạng', 
    'Tầng Ứng dụng & Các giao thức cốt lõi (HTTP, DNS)', 
    '### 1. Giao thức HTTP (HyperText Transfer Protocol)
HTTP hoạt động theo mô hình Client-Server để truyền tải tài liệu web.
- **HTTP/1.1:** Hỗ trợ kết nối bền vững (Persistent Connection) nhưng gặp lỗi nghẽn đầu hàng (Head-of-Line Blocking) trên một kết nối TCP.
- **HTTP/2:** Hỗ trợ ghép kênh đa luồng (Multiplexing) trên cùng một kết nối TCP, nén tiêu đề (HPACK) và server push.
- **HTTP/3:** Thay đổi lớn, loại bỏ hoàn toàn TCP và chạy trên giao thức **QUIC** (xây dựng trên UDP), loại bỏ hoàn toàn lỗi nghẽn đầu hàng của kết nối và hỗ trợ kết nối di động không bị đứt quãng.

### 2. DNS (Domain Name System)
DNS đóng vai trò là danh bạ điện thoại của internet, chuyển đổi các tên miền thân thiện (ví dụ: `google.com`) thành địa chỉ IP vật lý của máy chủ ($142.250.74.46$).
- Sử dụng chủ yếu giao thức UDP cổng 53 để truy vấn nhanh chóng.
- Hệ thống phân cấp: Root Server -> TLD Server (như `.com`, `.net`) -> Authoritative Server (máy chủ giữ record thực tế).

### 3. Các giao thức ứng dụng khác
- **FTP:** Truyền file dữ liệu (cổng 20, 21).
- **SMTP:** Gửi thư điện tử (cổng 25).
- **IMAP / POP3:** Nhận thư điện tử.', 
    'core-theory', 
    '["Truy vấn địa chỉ IP của một website thông qua công cụ dòng lệnh: `nslookup google.com`", "Mô tả cơ chế DNS Caching giúp máy tính lưu trữ địa chỉ IP vừa truy vấn để giảm tải cho máy chủ DNS toàn cầu."]'::jsonb, 
    '["HTTP/3 khắc phục nhược điểm mất gói tin làm nghẽn toàn bộ kết nối của HTTP/2 nhờ cơ chế truyền dữ liệu đa luồng độc lập của QUIC.", " DNS sử dụng giao thức UDP để truy vấn nhanh, nhưng dùng TCP khi cần truyền tải lượng thông tin lớn (Zone Transfer).", "Bảo mật DNSSEC giúp xác thực chữ ký số của các bản ghi DNS, chống tấn công đầu độc DNS cache."]'::jsonb, 
    6, 
    TRUE,
    'network-architecture'
  ),
  (
    'cs_net_03', 
    'cs_networking_security', 
    13, 
    'Truyền tải & Định tuyến dữ liệu', 
    'Tầng Giao vận: Giao thức TCP vs UDP (3-way Handshake)', 
    '### 1. Phân biệt TCP và UDP
- **TCP (Transmission Control Protocol):**
  - Hướng kết nối (Connection-oriented): Bắt buộc phải thiết lập kết nối trước khi truyền dữ liệu.
  - Tin cậy: Đảm bảo dữ liệu đến đúng thứ tự, không bị mất mát (truyền lại nếu mất) và không bị trùng lặp.
  - Có cơ chế kiểm soát luồng và tắc nghẽn.
- **UDP (User Datagram Protocol):**
  - Không kết nối (Connectionless): Gửi trực tiếp gói tin (Datagram) đi mà không cần biết người nhận sẵn sàng chưa.
  - Không tin cậy: Không đảm bảo dữ liệu đến đích, không truyền lại nếu mất.
  - Tốc độ truyền cực nhanh, tiêu đề nhẹ (8 bytes so với 20 bytes của TCP). Phù hợp cho Livestream, Game online.

### 2. Bắt tay 3 bước của TCP (Three-way Handshake)
Để thiết lập kết nối và đồng bộ hóa số thứ tự gói tin (Sequence Number):
1. **Client $\rightarrow$ Server (SYN):** Gửi gói tin SYN kèm số thứ tự khởi tạo của Client ($Seq = x$).
2. **Server $\rightarrow$ Client (SYN-ACK):** Gửi gói tin phản hồi SYN-ACK, đồng bộ số thứ tự Server ($Seq = y$) và xác nhận số thứ tự Client ($Ack = x + 1$).
3. **Client $\rightarrow$ Server (ACK):** Gửi gói tin ACK xác nhận số thứ tự Server ($Ack = y + 1$). Kết nối chính thức được thiết lập (ESTABLISHED).

### 3. Ngắt kết nối TCP (4-way Handshake)
Mỗi bên phải gửi gói tin FIN và nhận lại ACK độc lập để ngắt dòng truyền một chiều, tổng cộng tốn 4 bước.', 
    'core-theory', 
    '["Quy trình bắt tay 3 bước TCP được thực thi hoàn toàn trong nhân Hệ điều hành trước khi ứng dụng thực hiện hàm accept() đọc socket.", "Dùng Wireshark để phân tích các cờ SYN, ACK, FIN trong gói tin TCP của một kết nối web thực tế."]'::jsonb, 
    '["Sequence Number giúp TCP sắp xếp lại các gói tin bị đến lệch thứ tự do định tuyến đường đi khác nhau trên internet.", "Thời gian TIME_WAIT ở cuối quá trình ngắt kết nối TCP giúp đảm bảo gói tin cuối cùng được gửi đi an toàn và không gây trùng lặp với kết nối mới.", "Tấn công SYN Flood lợi dụng việc gửi liên tiếp gói tin SYN nhưng không gửi ACK bước 3 để làm cạn kiệt tài nguyên hàng đợi của máy chủ."]'::jsonb, 
    6, 
    TRUE,
    'data-transmission'
  ),
  (
    'cs_net_04', 
    'cs_networking_security', 
    13, 
    'Truyền tải & Định tuyến dữ liệu', 
    'Kiểm soát luồng & Kiểm soát tắc nghẽn của TCP', 
    '### 1. Cơ chế kiểm soát luồng (Flow Control)
Flow Control bảo vệ máy nhận không bị quá tải bởi tốc độ gửi quá nhanh của máy gửi.
- Sử dụng cơ chế **Cửa sổ trượt (Sliding Window)**.
- Máy nhận gửi cờ báo kích thước cửa sổ nhận (`Receive Window - rwnd`) biểu thị dung lượng trống còn lại của bộ đệm (buffer) của nó.
- Máy gửi chỉ được phép gửi lượng dữ liệu tối đa nằm trong giới hạn `rwnd` đó.

### 2. Cơ chế kiểm soát tắc nghẽn (Congestion Control)
Congestion Control bảo vệ hạ tầng mạng trung gian không bị sập nghẽn do quá nhiều thiết bị cùng truyền tin.
- Máy gửi duy trì một giá trị **Cửa sổ tắc nghẽn (Congestion Window - cwnd)**.
- Lượng dữ liệu được gửi tối đa thực tế là: $\min(rwnd, cwnd)$.
- **4 Thuật toán kiểm soát tắc nghẽn chính:**
  1. **Slow Start (Khởi đầu chậm):** Bắt đầu $cwnd = 1$ MSS. Sau mỗi chu kỳ nhận đủ ACK, $cwnd$ tăng gấp đôi theo hàm mũ cho đến khi chạm ngưỡng ssthresh.
  2. **Congestion Avoidance (Tránh tắc nghẽn):** Khi $cwnd \ge ssthresh$, $cwnd$ tăng tuyến tính cộng 1 sau mỗi chu kỳ để thăm dò mạng cẩn thận.
  3. **Fast Retransmit (Truyền lại nhanh):** Nếu nhận liên tiếp 3 ACK trùng lặp (Triple Duplicate ACKs), kết luận gói tin tiếp theo bị mất, lập tức truyền lại ngay mà không đợi timeout.
  4. **Fast Recovery (Khôi phục nhanh):** Giảm ngưỡng ssthresh xuống một nửa và tiếp tục tăng tuyến tính cwnd mà không cần reset về 1.', 
    'core-theory', 
    '["Vẽ biểu đồ biểu diễn sự thay đổi của giá trị cwnd theo thời gian qua các chu kỳ RTT để giải thích hoạt động của Slow Start và Congestion Avoidance.", "Khi xảy ra sự kiện Timeout (mất gói tin nghiêm trọng), cwnd lập tức bị reset về 1 và ssthresh giảm đi một nửa."]'::jsonb, 
    '["Kiểm soát luồng là thỏa thuận trực tiếp 1-1 giữa hai thiết bị; kiểm soát tắc nghẽn là phản ứng của thiết bị với tình trạng nghẽn của đường truyền vật lý chung.", "Thuật toán TCP Reno là phiên bản kinh điển triển khai cơ chế Fast Recovery.", "Các thuật toán TCP hiện đại (như BBR của Google) sử dụng băng thông thực tế và độ trễ RTT để ước lượng tắc nghẽn thay vì dựa vào sự kiện mất gói tin."]'::jsonb, 
    7, 
    TRUE,
    'data-transmission'
  ),
  (
    'cs_net_05', 
    'cs_networking_security', 
    13, 
    'Truyền tải & Định tuyến dữ liệu', 
    'Định tuyến IP & Chia mạng con (Subnetting & CIDR)', 
    '### 1. Địa chỉ IPv4 và IPv6
- **IPv4:** Địa chỉ logic 32-bit (gồm 4 nhóm byte viết dạng thập phân, ví dụ `192.168.1.1`). Cung cấp khoảng 4 tỷ địa chỉ, hiện đã cạn kiệt.
- **IPv6:** Địa chỉ logic 128-bit viết dưới dạng hệ thập lục phân, giải quyết triệt để vấn đề cạn kiệt địa chỉ và tích hợp sẵn bảo mật IPSec.

### 2. Chia mạng con (Subnetting) với CIDR
CIDR (Classless Inter-Domain Routing) biểu diễn địa chỉ kèm số lượng bit mạng cố định bằng ký hiệu `/`:
- Ví dụ: `192.168.1.0/24`.
- `/24` nghĩa là 24 bit đầu tiên là phần mạng (Network ID), 8 bit còn lại dành cho máy chủ (Host ID).
- **Subnet Mask:** Mặt nạ mạng tương ứng là `255.255.255.0` (24 bit 1 liên tiếp).
- Số lượng IP cấp phát cho host trong một mạng con là $2^{\text{HostBits}} - 2$ (phải trừ đi IP mạng và IP quảng bá Broadcast).

### 3. Thuật toán định tuyến
- **Link-state Routing (ví dụ OSPF):** Mỗi router xây dựng bản đồ đồ thị mạng đầy đủ và dùng thuật toán **Dijkstra** để tìm đường ngắn nhất.
- **Distance-vector Routing (ví dụ RIP):** Router chỉ trao đổi bảng định tuyến với các router kề cận và dùng thuật toán **Bellman-Ford** để tính khoảng cách bước nhảy (hop count).', 
    'core-theory', 
    '["Phân tích mạng con `10.0.0.0/26`: số bit host là 32 - 26 = 6. Số host tối đa kết nối là 2^6 - 2 = 62 hosts. Subnet Mask tương ứng là 255.255.255.192.", "Sử dụng bảng định tuyến (Routing Table) trong máy tính: gõ lệnh `route print` trên Windows."]'::jsonb, 
    '["Địa chỉ IP mạng con đầu tiên (ví dụ 192.168.1.0) đại diện cho tên mạng, địa chỉ cuối cùng (192.168.1.255) dùng để gửi broadcast cho mọi thiết bị trong mạng đó, nên không được gán cho thiết bị cụ thể.", "NAT (Network Address Translation) giúp chuyển đổi nhiều IP riêng tư (Private IP) trong nhà thành 1 Public IP duy nhất khi ra ngoài internet, làm chậm quá trình cạn kiệt IPv4.", "IPv6 loại bỏ hoàn toàn cơ chế gửi quảng bá Broadcast và thay thế bằng Multicast."]'::jsonb, 
    7, 
    TRUE,
    'data-transmission'
  ),
  (
    'cs_net_06', 
    'cs_networking_security', 
    13, 
    'Kiến trúc & Phân tầng Mạng', 
    'Tầng Liên kết dữ liệu & Mạng LAN (ARP, Switch)', 
    '### 1. Địa chỉ MAC và ARP (Address Resolution Protocol)
- **Địa chỉ MAC:** Địa chỉ vật lý 48-bit ghi sẵn vào ROM của Card mạng (NIC) khi sản xuất, độc nhất toàn cầu (ví dụ: `00:0a:95:9d:68:16`).
- **Giao thức ARP:** Khi cần gửi gói tin cho IP đích trong cùng mạng LAN, máy gửi phải tìm địa chỉ MAC tương ứng của IP đó.
  - Gửi **ARP Request** dạng quảng bá (Broadcast MAC `FF:FF:FF:FF:FF:FF`) hỏi: "Ai có IP này hãy báo cho tôi".
  - Máy có IP đó phản hồi **ARP Reply** dạng đơn gửi (Unicast) chứa MAC của nó.

### 2. Switch (Thiết bị chuyển mạch) hoạt động ở tầng 2
Switch kết nối các thiết bị trong mạng LAN và chuyển mạch khung tin Frame dựa vào bảng MAC (MAC Table):
- Khi nhận Frame, Switch ghi nhận địa chỉ MAC nguồn và cổng vào bảng MAC (quá trình học địa chỉ - MAC learning).
- Tra cứu bảng MAC cho địa chỉ MAC đích:
  - Nếu thấy: chuyển Frame trực tiếp tới cổng tương ứng (Unicast).
  - Nếu không thấy: gửi Frame ra tất cả các cổng khác (Flooding).

### 3. Cơ chế tránh đụng độ CSMA/CD
CSMA/CD (Carrier Sense Multiple Access with Collision Detection) được dùng trong Ethernet để giám sát cáp truyền: lắng nghe trước khi truyền, phát hiện đụng độ thì lập tức dừng lại, gửi tín hiệu gây nghẽn (jam signal) và đợi một khoảng thời gian ngẫu nhiên (Backoff time) trước khi thử lại.', 
    'core-theory', 
    '["Mô tả bảng MAC trong Switch lưu cặp [MAC Address | Port]. Khác với Router tra cứu dựa vào IP, Switch chuyển tiếp dữ liệu dựa vào MAC.", "Gõ lệnh `arp -a` trong CMD để xem bảng ánh xạ IP-MAC đang lưu trữ trong cache của máy tính."]'::jsonb, 
    '["Switch chia nhỏ mạng thành các miền đụng độ (Collision Domain) độc lập cho từng cổng, loại bỏ hoàn toàn đụng độ dữ liệu của các máy khác nhau.", "Tấn công ARP Spoofing (ARP Poisoning) gửi tin ARP giả mạo để lừa máy nạn nhân gửi dữ liệu qua MAC của hacker, thực hiện nghe lén MitM.", "VLAN (Virtual LAN) cho phép chia nhỏ một Switch vật lý thành nhiều mạng con độc lập logic để tăng tính bảo mật."]'::jsonb, 
    6, 
    TRUE,
    'network-architecture'
  ),
  (
    'cs_net_07', 
    'cs_networking_security', 
    13, 
    'Mật mã & Bảo mật Kênh truyền', 
    'Mật mã học: Mã hóa Đối xứng & Không đối xứng', 
    '### 1. Mã hóa đối xứng (Symmetric Encryption)
- **Cơ chế:** Sử dụng duy nhất một khóa dùng chung cho cả quá trình mã hóa và giải mã.
- **Đại diện:** AES (Advanced Encryption Standard).
- **Đặc trưng:** Tốc độ mã hóa cực nhanh, phù hợp cho lượng dữ liệu lớn. Khó khăn lớn nhất là việc truyền khóa an toàn (Key Exchange Problem).

### 2. Mã hóa không đối xứng (Asymmetric Encryption)
- **Cơ chế:** Sử dụng một cặp khóa liên kết toán học:
  - **Khóa công khai (Public Key):** Công khai cho tất cả mọi người dùng để mã hóa dữ liệu.
  - **Khóa bí mật (Private Key):** Giữ kín tuyệt đối bởi chủ sở hữu dùng để giải mã.
- **Đại diện:** RSA, Cryptography đường cong Elliptic (ECC).
- **Đặc trưng:** Tốc độ tính toán chậm hơn nhiều so với mã hóa đối xứng, thường dùng để thiết lập khóa ban đầu.

### 3. Chữ ký số (Digital Signature)
Để xác thực danh tính người gửi và đảm bảo dữ liệu không bị sửa đổi (Integrity):
1. Người gửi tính mã băm (Hash - ví dụ SHA-256) của văn bản gốc.
2. Mã hóa mã băm này bằng **Private Key** của người gửi $\rightarrow$ Tạo ra chữ ký số.
3. Người nhận giải mã chữ ký bằng **Public Key** của người gửi để lấy mã băm gốc, sau đó đối chiếu với mã băm tự tính toán từ văn bản nhận được.', 
    'core-theory', 
    '["Toán học RSA: chọn hai số nguyên tố lớn p và q, tính n = p*q. Khóa công khai e và khóa bí mật d thỏa mãn e*d = 1 mod ((p-1)*(q-1)). Mã hóa: c = m^e mod n. Giải mã: m = c^d mod n.", "Tạo cặp khóa Public/Private Key bằng thư viện OpenSSL: `openssl genrsa -out private.pem 2048`"]'::jsonb, 
    '["Không thể dùng Public Key để giải mã dữ liệu được mã hóa bởi chính Public Key đó, chỉ duy nhất Private Key tương ứng giải mã được.", "Mật mã đường cong Elliptic (ECC) cung cấp độ bảo mật tương đương RSA với kích thước khóa nhỏ hơn nhiều, giúp tối ưu băng thông truyền tải.", "Hàm băm cryptographic (như SHA-256) bắt buộc phải có thuộc tính chống đụng độ (collision resistance) - cực kỳ khó tìm được hai văn bản khác nhau có cùng mã băm."]'::jsonb, 
    7, 
    TRUE,
    'cryptography-protocols'
  ),
  (
    'cs_net_08', 
    'cs_networking_security', 
    13, 
    'Mật mã & Bảo mật Kênh truyền', 
    'Bảo mật kênh truyền: TLS/SSL & HTTPS', 
    '### 1. Giao thức HTTPS là gì?
HTTPS (Hypertext Transfer Protocol Secure) là sự kết hợp của giao thức HTTP chạy đè lên lớp bảo mật mã hóa **TLS/SSL** (Transport Layer Security), chạy trên cổng 443.

### 2. Quy trình bắt tay TLS (TLS Handshake)
Quy trình thiết lập kênh truyền mã hóa kết hợp cả mã hóa đối xứng và không đối xứng:
1. **Client Hello:** Gửi phiên bản TLS hỗ trợ và danh sách thuật toán mã hóa (Cipher Suites).
2. **Server Hello & Certificate:** Server gửi thuật toán lựa chọn và gửi **Chứng chỉ số X.509** của nó chứa Public Key của Server.
3. **Key Exchange:** Client xác thực chứng chỉ số (qua CA), sau đó tạo ra một mã khóa tạm thời (Pre-Master Secret), mã hóa nó bằng Public Key của Server rồi gửi đi.
4. **Session Key Generation:** Server dùng Private Key của nó để giải mã Pre-Master Secret. Cả hai bên cùng tính toán ra khóa đối xứng dùng chung (Session Key) từ mã tạm thời này.
5. **Encrypted Session:** Toàn bộ dữ liệu sau đó được mã hóa bằng thuật toán đối xứng sử dụng Session Key đó.

### 3. Chứng chỉ số và Tổ chức CA (Certificate Authority)
CA là bên thứ ba độc lập uy tín ký xác thực chứng chỉ số của website. Trình duyệt cài sẵn Public Key của các CA lớn để xác minh chữ ký số trên chứng chỉ gửi từ server.', 
    'core-theory', 
    '["Sử dụng lệnh `curl -v https://google.com` để xem các dòng debug của quá trình bắt tay TLS Handshake và đối chiếu thông tin chứng chỉ số gửi về.", "Mô tả cấu trúc chứng chỉ X.509 chứa thông tin tên miền, Public Key của server, thời gian hiệu lực và Chữ ký số của CA."]'::jsonb, 
    '["HTTPS bảo vệ dữ liệu không bị nghe lén (Eavesdropping) và giả mạo (Tampering) trên đường truyền, nhưng không bảo vệ máy chủ khỏi bị hack ứng dụng (như SQL Injection).", "Tấn công Man-in-the-Middle (MitM) thất bại trước TLS vì hacker không có Private Key của server thật để giải mã Pre-Master Secret.", "Chuẩn TLS 1.3 rút gọn số bước bắt tay từ 2 RTT xuống còn 1 RTT, tăng tốc độ kết nối bảo mật đáng kể."]'::jsonb, 
    7, 
    TRUE,
    'cryptography-protocols'
  ),
  (
    'cs_net_09', 
    'cs_networking_security', 
    13, 
    'Phòng ngự & Tấn công Hệ thống', 
    'Thiết bị bảo mật: Tường lửa, IDS & IPS', 
    '### 1. Phân loại Tường lửa (Firewalls)
Tường lửa kiểm soát luồng giao thông mạng ra vào hệ thống dựa trên các luật quy định:
- **Packet Filtering Firewall:** Lọc gói tin tĩnh dựa trên địa chỉ IP nguồn/đích, cổng Port và giao thức ở tầng 3/4. Đơn giản, nhanh nhưng dễ bị qua mặt.
- **Stateful Inspection Firewall:** Theo dõi trạng thái của các kết nối (TCP state). Chỉ cho phép gói tin đi vào nếu nó thuộc về một kết nối hợp lệ đã được thiết lập từ bên trong.
- **Application Firewall (WAF):** Hoạt động ở tầng 7, phân tích sâu nội dung dữ liệu của ứng dụng để phát hiện mã độc, ngăn chặn SQLi hoặc XSS.

### 2. IDS (Intrusion Detection System)
Hệ thống phát hiện xâm nhập mạng. Giám sát lưu lượng mạng, so sánh với cơ sở dữ liệu mẫu hành vi tấn công (Signature-based) hoặc phát hiện bất thường (Anomaly-based).
- Hoạt động ở chế độ thụ động (Passive/Out-of-band), gửi cảnh báo (Alert) cho quản trị viên khi phát hiện tấn công chứ không tự chặn gói tin.

### 3. IPS (Intrusion Prevention System)
Hệ thống ngăn chặn xâm nhập mạng.
- Hoạt động ở chế độ chủ động chặn dòng truyền (In-line), tự động thực hiện hành vi chặn gói tin (Drop packet), chặn địa chỉ IP tấn công ngay khi phát hiện dấu hiệu xâm nhập.', 
    'core-theory', 
    '["Luật tường lửa iptables trong Linux chặn cổng 22 (SSH): `iptables -A INPUT -p tcp --dport 22 -j DROP`", "Mô tả cơ chế hoạt động của IDS Snort sử dụng các rule signature để quét lưu lượng mạng."]'::jsonb, 
    '["WAF (Web Application Firewall) là lá chắn bắt buộc cho các ứng dụng web để ngăn chặn các cuộc tấn công nhắm vào tầng ứng dụng.", "Phương pháp phát hiện anomaly-based của IDS dễ sinh ra nhiều cảnh báo giả (False Positives) do các hoạt động bình thường nhưng lạ của người dùng.", "Tường lửa không thể chống lại các cuộc tấn công đi qua các cổng dịch vụ hợp lệ (ví dụ SQLi đi qua cổng 80/443 của website) trừ khi là WAF."]'::jsonb, 
    6, 
    TRUE,
    'system-defenses'
  ),
  (
    'cs_net_10', 
    'cs_networking_security', 
    13, 
    'Phòng ngự & Tấn công Hệ thống', 
    'Các cuộc tấn công mạng phổ biến & Phòng ngừa', 
    '### 1. Tấn công từ chối dịch vụ (DoS/DDoS)
- **SYN Flood:** Gửi hàng loạt gói tin SYN giả mạo IP nguồn đến server. Server phản hồi SYN-ACK và treo tài nguyên đợi ACK bước 3. Hàng đợi kết nối (Connection Backlog) bị đầy làm server từ chối các người dùng hợp lệ. Phòng chống bằng **SYN Cookies**.

### 2. Tấn công SQL Injection (SQLi)
Hacker chèn mã SQL độc hại vào các ô nhập liệu của ứng dụng để làm thay đổi logic câu lệnh SQL gửi xuống Database.
- *Ví dụ:* Nhập '' OR ''1''=''1'' vào ô mật khẩu để bypass đăng nhập.
- *Phòng ngừa:* Sử dụng **Parameterized Queries (Prepared Statements)** để tách biệt phần dữ liệu và câu lệnh SQL, bắt buộc dùng ORM.

### 3. Cross-Site Scripting (XSS)
Hacker chèn mã kịch bản độc hại (thường là JavaScript) chạy trên trình duyệt của người dùng khác để đánh cắp Cookie Session.
- *Phòng ngừa:* Thực hiện lọc dữ liệu đầu vào (Input Sanitization) và mã hóa ký tự đầu ra (Output Encoding/Escaping - ví dụ chuyển `<` thành `&lt;`).

### 4. ARP Spoofing (ARP Poisoning)
Gửi các gói tin phản hồi ARP Reply giả mạo trong mạng LAN để liên kết địa chỉ IP của Gateway với địa chỉ MAC của hacker, biến hacker thành kẻ nghe lén ở giữa (MitM).
- *Phòng ngừa:* Sử dụng bảng ARP tĩnh (Static ARP) hoặc cấu hình Dynamic ARP Inspection (DAI) trên Switch.', 
    'core-theory', 
    '["Câu truy vấn SQLi bypass đăng nhập: `SELECT * FROM users WHERE username = ''admin'' AND password = ''x'' OR ''1''=''1''`", "Prepared Statement an toàn trong Java: `PreparedStatement pstmt = conn.prepareStatement(\"SELECT * FROM users WHERE username = ?\"); pstmt.setString(1, input);`"]'::jsonb, 
    '[" Prepared Statements ngăn chặn hoàn toàn SQLi vì trình biên dịch SQL đã biên dịch trước cấu trúc câu lệnh, tham số truyền vào chỉ được coi là chuỗi literal thô chứ không thể thực thi.", "Chính sách CSP (Content Security Policy) là một cơ chế phòng vệ mạnh mẽ ở trình duyệt giúp chống lại XSS bằng cách giới hạn nguồn tải script hợp lệ.", "Tấn công DDoS phản xạ (Amplification DDoS) lợi dụng máy chủ DNS hoặc NTP mở để gửi gói tin truy vấn nhỏ nhưng nhận về gói tin phản hồi khổng lồ trỏ thẳng vào IP nạn nhân."]'::jsonb, 
    7, 
    TRUE,
    'system-defenses'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_net_01', 'network-architecture', 'lesson', 'Mô hình mạng phân tầng (OSI vs TCP/IP)', '{"lesson_id": "cs_net_01"}'::jsonb, 10, 10, 20, 'cs_networking_security', 13),
  ('act-lesson-cs_net_02', 'network-architecture', 'lesson', 'Tầng Ứng dụng & Các giao thức cốt lõi (HTTP, DNS)', '{"lesson_id": "cs_net_02"}'::jsonb, 20, 10, 20, 'cs_networking_security', 13),
  ('act-lesson-cs_net_03', 'data-transmission', 'lesson', 'Tầng Giao vận: Giao thức TCP vs UDP (3-way Handshake)', '{"lesson_id": "cs_net_03"}'::jsonb, 10, 10, 20, 'cs_networking_security', 13),
  ('act-lesson-cs_net_04', 'data-transmission', 'lesson', 'Cơ chế kiểm soát luồng & tắc nghẽn trong TCP', '{"lesson_id": "cs_net_04"}'::jsonb, 20, 10, 20, 'cs_networking_security', 13),
  ('act-lesson-cs_net_05', 'data-transmission', 'lesson', 'Định tuyến IP & Chia mạng con (Subnetting & CIDR)', '{"lesson_id": "cs_net_05"}'::jsonb, 30, 10, 20, 'cs_networking_security', 13),
  ('act-lesson-cs_net_06', 'network-architecture', 'lesson', 'Tầng Liên kết dữ liệu & Mạng LAN (ARP, Switch)', '{"lesson_id": "cs_net_06"}'::jsonb, 30, 10, 20, 'cs_networking_security', 13),
  ('act-lesson-cs_net_07', 'cryptography-protocols', 'lesson', 'Mật mã học: Mã hóa Đối xứng & Không đối xứng', '{"lesson_id": "cs_net_07"}'::jsonb, 10, 10, 20, 'cs_networking_security', 13),
  ('act-lesson-cs_net_08', 'cryptography-protocols', 'lesson', 'Bảo mật kênh truyền: TLS/SSL & HTTPS', '{"lesson_id": "cs_net_08"}'::jsonb, 20, 10, 20, 'cs_networking_security', 13),
  ('act-lesson-cs_net_09', 'system-defenses', 'lesson', 'Thiết bị bảo mật: Tường lửa, IDS & IPS', '{"lesson_id": "cs_net_09"}'::jsonb, 10, 10, 20, 'cs_networking_security', 13),
  ('act-lesson-cs_net_10', 'system-defenses', 'lesson', 'Các cuộc tấn công mạng phổ biến & Phòng ngừa', '{"lesson_id": "cs_net_10"}'::jsonb, 20, 10, 20, 'cs_networking_security', 13)
ON CONFLICT (id) DO UPDATE SET
  topic_id = EXCLUDED.topic_id,
  activity_type = EXCLUDED.activity_type,
  title = EXCLUDED.title,
  config = EXCLUDED.config,
  sort_order = EXCLUDED.sort_order,
  reward_np = EXCLUDED.reward_np,
  reward_xp = EXCLUDED.reward_xp,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier;

COMMIT;
