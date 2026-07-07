# Project Rules - GameEngG10

## Question Bank Ingestion Rules

- **Không được cố gắng chế biến các câu hỏi tự luận tính toán thành câu hỏi trắc nghiệm:** Khi import đề thi vào ngân hàng câu hỏi, chỉ được import các câu hỏi trắc nghiệm nguyên bản. Không được tự ý thêm các đáp án lựa chọn (A, B, C, D) để biến đổi câu hỏi tự luận tính toán thành câu hỏi trắc nghiệm.
- **Câu nào không thể import trọn vẹn thì bỏ:** Bỏ qua các câu vẽ đồ thị, câu chứng minh hình học/đại số, hoặc các câu tự luận không thể biểu diễn trọn vẹn theo định dạng câu hỏi của hệ thống (MCQ, Wordform, Rewrite).
- **Câu nào trùng với câu đã có trong ngân hàng câu hỏi (vd 95% giống) thì bỏ qua:** Bỏ qua các câu hỏi trùng lặp hoặc giống trên 95% so với câu hỏi đã có sẵn trong cơ sở dữ liệu.

## Task Completion Rules

- **Việc gì yêu cầu trước, làm trước — không được bỏ dở:** Nếu có một công việc đang dang dở (todo, artifact chưa tạo, file chưa hoàn chỉnh), phải hoàn thành nó trước khi chuyển sang yêu cầu mới. Không được để người dùng phải nhắc lại việc cũ.
- **Khi kết thúc lượt trả lời, phải tự kiểm tra xem còn việc nào chưa làm xong không.** Nếu còn, phải nêu rõ và tiếp tục làm ngay trong lượt tiếp theo, không chờ người dùng nhắc.
- **Không bao giờ nói "hãy nhắc tôi" hoặc "anh/chị có muốn tôi làm không"** khi đó là phần công việc đã được yêu cầu trước đó hoặc là phần tiếp theo tự nhiên của công việc hiện tại.
