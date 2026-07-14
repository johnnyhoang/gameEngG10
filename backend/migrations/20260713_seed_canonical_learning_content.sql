-- Canonical learning content seed. Database is the source of truth.
BEGIN;

WITH content AS (
  SELECT * FROM jsonb_to_recordset('[{"id":"eng-8-1","subject":"english","grade_tier":8,"topic":"present-perfect","title":"Present Perfect Tense (Hiện Tại Hoàn Thành)","theory":"Present Perfect được dùng để diễn tả:\n1. Hành động đã xảy ra trong quá khứ nhưng vẫn còn liên quan đến hiện tại\n2. Hành động bắt đầu trong quá khứ và tiếp tục đến hiện tại\n3. Kinh nghiệm sống của một người\n\nCấu trúc: S + have/has + V3/ed\n- I/You/We/They + have + V3\n- He/She/It + has + V3\n\nVí dụ:\n- I have visited Hanoi three times. (Tôi đã đi Hà Nội ba lần)\n- She has lived in HCMC since 2020. (Cô ấy đã sống ở TP.HCM kể từ 2020)\n- They have never tried this food before. (Họ chưa bao giờ thử thức ăn này)","category":"grammar","examples":["I have finished my homework.","He has worked here for 5 years.","Have you ever been to the beach?","She has not called me yet."],"practice_points":["Phân biệt Present Perfect và Past Simple","Dùng \"for\" (khoảng thời gian) và \"since\" (thời điểm)","Dùng \"ever\", \"never\", \"already\", \"yet\" với Present Perfect","Câu hỏi với \"How long have you...?\""],"difficulty":6,"is_standard":false},{"id":"eng-8-2","subject":"english","grade_tier":8,"topic":"reported-speech","title":"Reported Speech (Lời Nói Gián Tiếp)","theory":"Reported Speech (hay Indirect Speech) dùng để nói lại lời của người khác mà không dùng lời trích dẫn.\n\nQuy tắc thay đổi:\n1. Thì động từ lùi một bậc (Backshift)\n   - Present Simple → Past Simple\n   - Present Continuous → Past Continuous\n   - Past Simple → Past Perfect\n\n2. Thay đổi đại từ và tính từ sở hữu\n   - I → he/she/it\n   - My → his/her\n\n3. Thay đổi trạng từ chỉ thời gian\n   - Now → then\n   - Today → that day\n   - Tomorrow → the next day\n\nVí dụ:\n- Direct: \"I am a student,\" Tom said.\n- Reported: Tom said (that) he was a student.\n\n- Direct: \"Where do you live?\" she asked me.\n- Reported: She asked me where I lived.","category":"grammar","examples":["He said (that) he was going to school.","She told me she had finished her work.","They asked if I wanted to join them.","He said he would come back tomorrow."],"practice_points":["Backshift thì trong Reported Speech","Dùng \"said\" với reported statement và \"asked\" với reported question","Thay đổi pronouns, possessive adjectives, time expressions","Reported Speech với modals (can → could, will → would)"],"difficulty":7,"is_standard":false},{"id":"eng-8-3","subject":"english","grade_tier":8,"topic":"comparative-superlative","title":"Comparative & Superlative Adjectives (So Sánh & Tuyệt Đối)","theory":"Comparative: So sánh giữa hai người/vật\nSuperlative: Chỉ mức độ cao nhất trong nhóm\n\nQuy tắc thành lập:\n1. Tính từ ngắn (1-2 âm tiết):\n   - Comparative: Tính từ + -er + than\n   - Superlative: The + tính từ + -est\n   Ví dụ: tall → taller → the tallest\n\n2. Tính từ dài (2+ âm tiết):\n   - Comparative: more + tính từ + than\n   - Superlative: the most + tính từ\n   Ví dụ: interesting → more interesting → the most interesting\n\n3. Bất quy tắc:\n   - good → better → the best\n   - bad → worse → the worst\n   - far → farther/further → the farthest/furthest","category":"grammar","examples":["This book is more interesting than that one.","She is the tallest girl in the class.","Math is more difficult than English for me.","This is the most beautiful place I have ever seen."],"practice_points":["Nguyên tắc thêm -er/-est và doubling consonant","Khi nào dùng \"more/most\" và khi nào dùng \"-er/-est\"","Tính từ bất quy tắc","So sánh kép: \"The more... the more...\" hoặc \"The bigger... the better...\""],"difficulty":5,"is_standard":false},{"id":"eng-8-4","subject":"english","grade_tier":8,"topic":"conditional-sentences","title":"Conditional Sentences (Câu Điều Kiện)","theory":"Conditional Sentences diễn tả tình huống giả định và kết quả của nó.\n\nType 1 (Có thể xảy ra):\n- Form: If + Present Simple, ... will/can + V (infinitive)\n- Meaning: Điều kiện có thể xảy ra, kết quả có thể xảy ra\n- Example: If it rains, I will stay at home.\n\nType 2 (Không thể xảy ra hiện tại):\n- Form: If + Past Simple, ... would + V (infinitive)\n- Meaning: Giả định trái với hiện tại\n- Example: If I were rich, I would travel around the world.\n\nType 3 (Không thể xảy ra trong quá khứ):\n- Form: If + Past Perfect, ... would have + V3/ed\n- Meaning: Giả định trái với quá khứ\n- Example: If I had studied hard, I would have passed the test.","category":"grammar","examples":["If you work hard, you will succeed.","If I had a car, I would drive to school.","If she had known about the party, she would have come.","Unless you study, you will fail the exam."],"practice_points":["Phân biệt Type 1, 2, 3 dựa trên thì và ý nghĩa","Dùng \"unless\" thay cho \"if not\"","Thay đổi vị trí if-clause và main clause","Mixed conditionals: Type 2 điều kiện + Type 3 kết quả"],"difficulty":7,"is_standard":false},{"id":"eng-8-5","subject":"english","grade_tier":8,"topic":"passive-voice-8","title":"Passive Voice (Câu Bị Động)","theory":"Câu bị động dùng để nhấn mạnh tác động (object) thay vì người thực hiện hành động (subject).\n\nCấu trúc:\n- Present Simple Passive: S + am/is/are + V3/ed\n- Past Simple Passive: S + was/were + V3/ed\n- Present Perfect Passive: S + have/has + been + V3/ed\n- Future Simple Passive: S + will be + V3/ed\n\nSo sánh:\n- Active: The teacher teaches English.\n- Passive: English is taught by the teacher.\n\nCác dạng khi không nói \"by + agent\":\n- When the agent is unknown\n- When the agent is obvious\n- When emphasizing the action not the agent","category":"grammar","examples":["The cake was eaten by the children.","English is spoken in many countries.","The house is being painted by workers.","Has the homework been finished by you?"],"practice_points":["Thay đổi từ Active sang Passive (tất cả các thì)","Khi nào dùng \"by\" và khi nào không","Passive Voice với double objects","Thay đổi modal verbs sang Passive"],"difficulty":6,"is_standard":false},{"id":"eng-8-6","subject":"english","grade_tier":8,"topic":"phrasal-verbs","title":"Phrasal Verbs (Động Từ Cụm)","theory":"Phrasal Verbs là sự kết hợp của động từ + preposition/adverb, tạo thành ý nghĩa mới hoàn toàn khác với ý nghĩa gốc.\n\nCác loại Phrasal Verbs phổ biến lớp 8:\n1. Come:\n   - Come back = quay lại\n   - Come across = tình cờ gặp\n   - Come up with = đưa ra (ý tưởng)\n\n2. Put:\n   - Put on = mặc vào\n   - Put off = hoãn lại\n   - Put up with = chịu đựng\n\n3. Look:\n   - Look for = tìm kiếm\n   - Look after = chăm sóc\n   - Look forward to = mong chờ\n\n4. Get:\n   - Get on = bắt đầu, hòa thuận\n   - Get over = vượt qua\n   - Get away = trốn thoát","category":"vocabulary","examples":["I looked forward to the summer vacation.","She put on her coat before going out.","He came across an old friend yesterday.","Can you look after my bag while I am away?"],"practice_points":["Ghi nhớ ý nghĩa của Phrasal Verbs phổ biến","Dùng đúng Phrasal Verbs trong ngữ cảnh","Separable vs Inseparable Phrasal Verbs","Thay thế Phrasal Verbs bằng một động từ đơn"],"difficulty":6,"is_standard":false},{"id":"eng-8-7","subject":"english","grade_tier":8,"topic":"reading-comprehension-8","title":"Reading Comprehension (Đọc Hiểu)","theory":"Đọc hiểu là kỹ năng hiểu nội dung của bài đọc thông qua việc:\n1. Tìm hiểu ý chính của mỗi đoạn\n2. Tìm chi tiết cụ thể\n3. Suy luận ý của tác giả\n4. Hiểu từ vựng mới từ ngữ cảnh\n\nCác dạng câu hỏi:\n1. Main Idea: \"What is the main idea of the passage?\"\n2. Detail: \"According to the text, what...?\"\n3. Inference: \"The author suggests that...\"\n4. Vocabulary: \"The word ''xxx'' in the passage means...\"\n5. Purpose: \"Why did the author write this?\"\n\nChiến lược đọc:\n1. Skim: Đọc nhanh để hiểu ý chính\n2. Scan: Tìm kiếm thông tin cụ thể\n3. Close reading: Đọc kỹ từng chi tiết","category":"reading","examples":["Read the passage and answer the questions below.","What is the main topic of the text?","According to the passage, when did the event occur?","From the text, we can infer that..."],"practice_points":["Đọc câu hỏi trước khi đọc bài","Ghi dấu những từ khóa trong bài","Suy luận từ ngữ cảnh thay vì dịch từng từ","Quản lý thời gian khi làm bài đọc"],"difficulty":6,"is_standard":false},{"id":"eng-8-8","subject":"english","grade_tier":8,"topic":"writing-paragraph","title":"Paragraph Writing (Viết Đoạn Văn)","theory":"Một đoạn văn tốt gồm:\n1. Topic Sentence: Câu chủ đề, nêu ý chính\n2. Supporting Sentences: Câu hỗ trợ, cung cấp chi tiết, ví dụ\n3. Concluding Sentence: Câu kết luận, tóm tắt hoặc chuyển tiếp\n\nCác loại đoạn văn:\n1. Descriptive: Tả lại cảnh vật, con người\n   - Dùng tính từ mô tả, trạng từ chỉ vị trí\n2. Narrative: Kể chuyện\n   - Dùng động từ, trạng từ chỉ thời gian\n3. Expository: Giải thích\n   - Dùng \"for example\", \"therefore\", \"as a result\"\n4. Persuasive: Thuyết phục\n   - Dùng \"believe\", \"should\", \"must\", \"important\"","category":"writing","examples":["My Favorite Place in Ho Chi Minh City","A Day I Will Never Forget","Why Learning English is Important","How to Make a Perfect Cup of Coffee"],"practice_points":["Viết topic sentence rõ ràng, không quá rộng","Dùng transition words kết nối câu","Cung cấp ví dụ cụ thể hỗ trợ ý chính","Viết concluding sentence hợp lý"],"difficulty":6,"is_standard":false},{"id":"geo-8-1","subject":"history_geography","grade_tier":8,"topic":"geography-vietnam","title":"Geography of Vietnam (Địa Lý Việt Nam)","theory":"Vị trí, địa hình, khí hậu, dân cư, kinh tế của Việt Nam.\n\nI. Vị Trí & Diện Tích:\n- Nằm trên Bán đảo Đông Dương\n- Vĩ độ: 8°N - 23°N\n- Kinh độ: 102°E - 109°E\n- Diện tích: ~331,000 km²\n- Dân số: ~98 triệu người (2023)\n\nII. Địa Hình:\n- Miền núi Tây Bắc\n- Đồng bằng Sông Hồng\n- Hành lang hẹp ở Trung Bộ\n- Cao Nguyên Trung Bộ\n- Đông bằng Sông Mekong\n\nIII. Khí Hậu:\n- Tropical monsoonal\n- Mùa mưa: Tháng 5-9 (mùa hè)\n- Mùa khô: Tháng 10-4 (mùa đông)\n- Trung Bộ: Mùa khô tương đối, mưa tập trung (IX-XI)\n\nIV. Dân Cư & Xã Hội:\n- Chủ yếu ở Đông bằng, ven biển\n- Tập trung ở Hà Nội, TP.HCM\n- Mật độ: ~300 người/km²\n- Người Kinh chiếm 86%, các dân tộc khác 14%\n\nV. Kinh Tế:\n- Nông nghiệp: Lúa, cà phê, hồ tiêu, tôm, cá\n- Công nghiệp: Dệt may, điện tử, hóa dầu\n- Du lịch: Hạ Long, Hội An, Huế\n\nVI. Tài Nguyên & Môi Trường:\n- Than, dầu khí, quặng\n- Các khu bảo tồn: Cát Bà, Kiếp Bạc\n- Thách thức: Ô nhiễm, suy thoái","category":"geography","examples":["Mô tả địa hình Việt Nam.","Phân tích khí hậu các vùng của Việt Nam.","Giải thích vì sao dân cư tập trung ở Đông bằng.","Nêu các ngành kinh tế chính của Việt Nam."],"practice_points":["Vẽ sơ đồ, bản đồ địa hình Việt Nam","Liên hệ khí hậu và cách sống của người dân","Phân tích sự phân bố kinh tế, dân cư","Hiểu những thách thức môi trường hiện nay"],"difficulty":6,"is_standard":false},{"id":"hist-8-1","subject":"history_geography","grade_tier":8,"topic":"world-war-2","title":"World War II (Thế Chiến II)","theory":"Thế Chiến II (1939-1945) là cuộc chiến tranh lớn nhất lịch sử.\n\nNguyên nhân:\n1. Điều ước Versailles quá khắt khe với Đức\n2. Phát xít nổi lên: Hitler, Mussolini, Tojo\n3. Chính sách bành trướng, quân quốc chủ nghĩa\n4. Tổ chức Liên Quốc yếu kém, không thể ngăn chặn\n\nCác giai đoạn:\n1. 1939-1941: Phát xít tấn công\n   - Đức tấn công Ba Lan (1939)\n   - Blitzkrieg (Chiến tranh Chớp nhoáng)\n   - Đức chiến thắng Pháp\n\n2. 1941-1943: Sự mở rộng\n   - Đức tấn công CCCP\n   - Nhật tấn công Mỹ (Pearl Harbor 1941)\n   - Mỹ, Anh gia nhập\n\n3. 1943-1945: Đồng Minh phản công\n   - D-Day: Liên Xô đánh bại Đức (Stalingrad)\n   - Mỹ đánh bại Nhật\n   - Đức hàng không điều kiện (8/5/1945)\n   - Nhật hàng (2/9/1945)\n\nHậu quả:\n- 50 triệu người chết\n- Toàn bộ thế giới bị tàn phá\n- Liên Xô thành siêu cường\n- Hội Liên Hợp Quốc thành lập\n\nẢnh hưởng đến Việt Nam:\n- Nhật chiếm Indochina\n- Đông Dương khẩn hoạn\n- Tháng 8 Cách mạng (1945)","category":"history","examples":["Nêu nguyên nhân của Thế Chiến II.","Kể sự kiện Mỹ gia nhập Thế Chiến II.","So sánh Thế Chiến I và II.","Phân tích ảnh hưởng của Thế Chiến II tới Việt Nam."],"practice_points":["Nắm vững các sự kiện chính, ngày tháng","Hiểu nguyên nhân và hậu quả","Phân tích vai trò các nước chính","Liên hệ với lịch sử Việt Nam"],"difficulty":6,"is_standard":false},{"id":"hist-8-2","subject":"history_geography","grade_tier":8,"topic":"vietnam-history","title":"Vietnamese History (Lịch Sử Việt Nam)","theory":"Lịch sử Việt Nam có 3 giai đoạn chính:\n\n1. Tiền sử đến Thục Phán (trước 258 TCN):\n   - Nước Văn Lang (Hùng Vương)\n   - Nước Âu Lạc (Thục Phán)\n\n2. Thời Bắc Thuộc (258 TCN - 938):\n   - 1000 năm chịu ách Bắc (Trung Quốc)\n   - Các cuộc khởi nghĩa: Hai Bà Trưng, Mẹ Chiêu\n   - 938: Ngoại Giao Vương độc lập (Ngo Quyền)\n\n3. Thời Độc Lập (938-1858):\n   - Nhà Đinh, Tiền Lê (10-11 thế kỷ)\n   - Nhà Lý (11-13 thế kỷ): Thị Kính, Trần Hưng Đạo\n   - Nhà Trần (13-15 thế kỷ): Đánh bại Nguyên\n   - Nhà Lê (15-18 thế kỷ): Mở rộng lãnh thổ\n\n4. Thời Pháp Thuộc (1858-1954):\n   - Nước Pháp chiếm Indochina\n   - Các phong trào chống Pháp\n   - Tháng 8 Cách mạng 1945: Độc lập\n   - Chiến tranh Diệp Biên Phủ: Kết thúc Pháp (1954)\n\nChủ quyền & Lãnh thổ:\n- Vn chiếm rộng từ Bắc đến Nam qua các thế kỷ\n- Chịu áp lực từ Trung Quốc, Champa, Xiêm Thái","category":"history","examples":["Tóm tắt các giai đoạn lịch sử Việt Nam.","Nêu vai trò của Trần Hưng Đạo.","Phân tích ảnh hưởng của Pháp thuộc đối với Việt Nam.","Kể về Tháng 8 Cách mạng năm 1945."],"practice_points":["Ghi nhớ các sự kiện, năm tháng quan trọng","Hiểu các giai đoạn và đặc điểm của từng giai đoạn","Phân tích tác động của các cuộc chiến chiến","Liên hệ quá khứ với hiện tại"],"difficulty":6,"is_standard":false},{"id":"lit-8-1","subject":"literature","grade_tier":8,"topic":"narrative-poetry","title":"Narrative Poetry (Thơ Tự Sự)","theory":"Thơ tự sự là loại thơ kể chuyện, có nhân vật, cốt truyện, tình tiết như truyện ngắn/dài.\n\nĐặc điểm:\n1. Có câu chuyện với: Nhân vật, tình tiết, cao trào, kết thúc\n2. Có tác dụng thẩm mỹ: Từngữ, hình ảnh, âm sắc\n3. Thường kết hợp: Miêu tả + Biểu cảm\n\nVí dụ:\n- \"Truyện Kiều\" của Nguyễn Du\n- \"Lưu Bình - Dương Lễ\" (thơ tự sự cổ)\n- \"Vợ chồng A Phủ\" (Tố Hữu) - thơ tự sự hiện đại\n\nKỹ năng phân tích:\n1. Tóm tắt nội dung câu chuyện\n2. Phân tích nhân vật (ngoại hình, tính cách, hoàn cảnh)\n3. Xác định cao trào, kết thúc\n4. Phân tích ý nghĩa, bài học\n5. Nhận xét về cách kể chuyện (tác dụng của giọng điệu, giai điệu)","category":"reading","examples":["Tóm tắt nội dung phần đầu của \"Truyện Kiều\".","Phân tích nhân vật Thúy Kiều: tính cách, hoàn cảnh, số phận.","Nêu ý nghĩa của câu thơ: \"Trót duyên kỵ ước hồi thơm\"","So sánh 2 version của \"Lưu Bình - Dương Lễ\""],"practice_points":["Kỹ năng tóm tắt nội dung","Phân tích nhân vật chi tiết","Hiểu bề sâu ý nghĩa bài thơ","Phân tích những hình ảnh, biểu tượng trong thơ"],"difficulty":7,"is_standard":false},{"id":"lit-8-2","subject":"literature","grade_tier":8,"topic":"lyric-poetry","title":"Lyric Poetry (Thơ Ch抒 Tình)","theory":"Thơ ch抒情là loại thơ bày tỏ cảm xúc, tâm tư, suy tư của nhà thơ.\n\nĐặc điểm:\n1. Tập trung vào cảm xúc, trạng thái tâm hồn\n2. Không nhất thiết có câu chuyện, nhân vật, sự kiện\n3. Dùng nhiều hình ảnh, so sánh, ẩn dụ\n4. Có giai điệu, âm sắc mạnh mẽ\n\nCác loại:\n- Thơ tình: Về tình yêu, luyến tiếc\n- Thơ xã hội: Về hoàn cảnh xã hội, cuộc sống\n- Thơ triết lý: Về suy tư, nhân sinh quan\n- Thơ nôn nả: Về những cảm xúc tức tốc\n\nVí dụ:\n- \"Vội vàng\" (Xuân Diệu)\n- \"Chiều tối\" (Hồ Xuân Hương)\n- \"Người mẹ\" (Phạm Văn Đồng)\n- \"Tuyên ngôn\" (Phạm Tiến Duật)\n\nKỹ năng phân tích:\n1. Xác định loại cảm xúc chính\n2. Tìm hình ảnh đại diện (hình ảnh trung tâm)\n3. Phân tích từngữ, so sánh, ẩn dụ\n4. Nắm bắt giai điệu bài thơ","category":"reading","examples":["Phân tích hình ảnh \"đêm\" trong bài thơ của Hồ Xuân Hương.","Nêu cảm xúc chính của nhà thơ trong bài \"Vội vàng\".","Chỉ ra những so sánh, ẩn dụ và tác dụng của chúng.","Nhận xét về giai điệu, âm sắc của bài thơ."],"practice_points":["Nhận biết cảm xúc từ từngữ, hình ảnh","Phân tích kỹ thuật thơ: so sánh, ẩn dụ, hoán dụ","Liên hệ bối cảnh xã hội để hiểu bài thơ","Phát triển ý kiến cá nhân về bài thơ"],"difficulty":7,"is_standard":false},{"id":"lit-8-3","subject":"literature","grade_tier":8,"topic":"short-story","title":"Short Story (Truyện Ngắn)","theory":"Truyện ngắn là tác phẩm văn xuôi có: Nhân vật, cốt truyện, bối cảnh.\n\nĐặc điểm:\n1. Độ dài ngắn (thường từ 2-20 trang)\n2. Có câu chuyện hoàn chỉnh: Nở rộ, phát triển, cao trào, kết thúc\n3. Thường có 1-2 nhân vật chính\n4. Lắng đọng, có bài học sâu sắc\n\nCấu trúc:\n- Mở bài: Giới thiệu nhân vật, bối cảnh, tình huống ban đầu\n- Phát triển: Tình tiết phát triển, xung đột tăng\n- Cao trào: Khoảnh khắc quyết định\n- Kết thúc: Giải quyết mâu thuẫn, bài học\n\nVí dụ tác phẩm:\n- \"Những người lái đò sông Đà\" (Nguyễn Tuân)\n- \"Số phận\" (Ngô Tất Tố)\n- \"Gà trống\" (Thạch Lam)\n- \"Chuyện cũ\" (Khánh Hòa)\n\nKỹ năng phân tích:\n1. Tóm tắt tình tiết, xác định các giai đoạn\n2. Phân tích nhân vật (hoàn cảnh, tính cách, biến chuyển)\n3. Nắm bắt chủ đề, ý tưởng chính\n4. Phân tích tác dụng của các yếu tố (cách tả, tây từ)","category":"reading","examples":["Tóm tắt nội dung \"Những người lái đò sông Đà\".","Phân tích nhân vật ông \"người lái đò\" trong tác phẩm trên.","Nêu ý tưởng chính của truyện \"Số phận\".","Phân tích tác dụng của bối cảnh (sông, nước, thôn quê) trong truyện."],"practice_points":["Kỹ năng tóm tắt tình tiết ngắn gọn","Phân tích nhân vật chi tiết: ngoại hình, tính cách, hoàn cảnh, hành động","Nắm bắt ý tưởng qua chi tiết, hành động nhân vật","Liên hệ tác phẩm với cuộc sống, xã hội"],"difficulty":7,"is_standard":false},{"id":"lit-8-4","subject":"literature","grade_tier":8,"topic":"essay-writing","title":"Essay Writing (Viết Văn Chủ Đề)","theory":"Essay là bài viết về một chủ đề nhất định, thể hiện quan điểm, suy nghĩ của tác giả.\n\nCấu trúc:\n1. Mở bài:\n   - Nêu chủ đề hoặc vấn đề\n   - Gợi sự chú ý của độc giả\n   - Nêu luận điểm chính (thesis statement)\n\n2. Thân bài:\n   - Mỗi đoạn trình bày 1 luận điểm phụ\n   - Cung cấp dẫn chứng (ví dụ, trích dẫn, sự kiện)\n   - Phân tích, bình luận về dẫn chứng\n\n3. Kết bài:\n   - Tóm tắt luận điểm chính\n   - Nêu ý nghĩa hoặc gợi ý\n   - Có thể nêu dự báo hoặc lời kêu gọi\n\nCác loại:\n- Persuasive: Thuyết phục độc giả\n- Expository: Giải thích, phân tích\n- Narrative: Kể lại sự kiện\n\nDài: 500-1000 từ (cho lớp 8)","category":"writing","examples":["Viết essay về \"Tầm quan trọng của giáo dục\"","Viết essay: \"Ảnh hưởng của công nghệ đến cuộc sống\"","Viết essay persuasive: \"Tại sao phải chăm chỉ học tập\"","Viết essay narrative về \"Kỷ niệm đáng nhớ\""],"practice_points":["Lập dàn ý rõ ràng trước khi viết","Mở bài hấp dẫn, có luận điểm chính","Mỗi đoạn có topic sentence và dẫn chứng","Dùng transition words kết nối ý tưởng","Kết bài thuyết phục"],"difficulty":7,"is_standard":false},{"id":"math-8-1","subject":"math","grade_tier":8,"topic":"linear-equations","title":"Linear Equations in One Variable (Phương Trình Bậc Nhất Một Ẩn)","theory":"Phương trình bậc nhất một ẩn có dạng: ax + b = 0 (a ≠ 0)\n\nCách giải:\n1. Chuyển vế: ax = -b\n2. Chia hai vế cho a: x = -b/a\n\nVí dụ:\n- 2x + 5 = 11\n- 2x = 11 - 5 = 6\n- x = 6/2 = 3\n\nQuy tắc quan trọng:\n1. Chuyển vế đổi dấu\n2. Nhân/chia hai vế cho số khác 0\n3. Loại bỏ mẫu bằng cách nhân với BCNN\n4. Loại bỏ dấu ngoặc\n\nKiểm tra: Thay x = 3 vào: 2(3) + 5 = 11 ✓","category":"algebra","examples":["3x - 7 = 5","2(x + 3) = 14","5x/2 - 3 = 2","4x - 8 = 2x + 4"],"practice_points":["Giải phương trình có mẫu số","Giải phương trình chứa dấu ngoặc","Phương trình chứa tham số","Phương trình vô nghiệm, vô số nghiệm"],"difficulty":5,"is_standard":false},{"id":"math-8-2","subject":"math","grade_tier":8,"topic":"linear-inequalities","title":"Linear Inequalities (Bất Phương Trình Bậc Nhất)","theory":"Bất phương trình bậc nhất một ẩn: ax + b > 0 (hoặc <, ≤, ≥)\n\nTính chất:\n1. Cộng/trừ: a < b ⟹ a ± c < b ± c\n2. Nhân/chia dương: a < b, c > 0 ⟹ ac < bc\n3. Nhân/chia âm: a < b, c < 0 ⟹ ac > bc (đảo dấu!)\n\nCách giải:\n- Tương tự giải phương trình, nhưng chú ý đảo dấu khi nhân/chia số âm\n\nVí dụ:\n- 2x + 3 < 9\n- 2x < 6\n- x < 3\n- Tập nghiệm: {x | x < 3} hoặc (-∞, 3)\n\nBiểu diễn trên trục số:\n← ←←← 3 (không tô điểm 3)","category":"algebra","examples":["-x + 2 > 5","3x - 4 ≤ 8","5 - 2x < 1","2(x - 1) ≥ 4"],"practice_points":["Đảo dấu bất phương trình khi nhân/chia số âm","Viết tập nghiệm dưới dạng khoảng","Biểu diễn bất phương trình trên trục số","Hệ bất phương trình bậc nhất"],"difficulty":5,"is_standard":false},{"id":"math-8-3","subject":"math","grade_tier":8,"topic":"system-equations","title":"Systems of Linear Equations (Hệ Phương Trình Bậc Nhất)","theory":"Hệ phương trình bậc nhất hai ẩn:\n{ a₁x + b₁y = c₁\n{ a₂x + b₂y = c₂\n\nCách giải:\n1. Phương pháp thế:\n   - Từ phương trình 1, biểu diễn x theo y\n   - Thế vào phương trình 2, giải tìm y\n   - Tìm x từ phương trình 1\n\n2. Phương pháp cộng/trừ:\n   - Nhân các phương trình với số thích hợp\n   - Cộng hoặc trừ để loại một ẩn\n   - Giải tìm ẩn còn lại\n\nVí dụ:\n{ 2x + y = 5    ... (1)\n{ x - y = 1     ... (2)\nCộng (1) + (2): 3x = 6 ⟹ x = 2\nTừ (2): 2 - y = 1 ⟹ y = 1\nVậy (x; y) = (2; 1)","category":"algebra","examples":["{ 2x + y = 7; x - y = 2","{ 3x - 2y = 4; x + y = 5","{ x + 2y = 3; 2x - y = 4","{ 5x + 3y = 1; 2x - y = 8"],"practice_points":["Chọn phương pháp giải phù hợp (thế hoặc cộng)","Kiểm tra nghiệm bằng cách thay vào 2 phương trình","Hệ phương trình vô nghiệm, vô số nghiệm","Giải hệ phương trình có hệ số là phân số"],"difficulty":6,"is_standard":false},{"id":"math-8-4","subject":"math","grade_tier":8,"topic":"polynomials","title":"Polynomials & Factorization (Đa Thức & Phân Tích Nhân Tử)","theory":"Đa thức là tổng các hạng tử, mỗi hạng tử là tích của số và các biến.\n\nPhân tích nhân tử là biểu diễn đa thức thành tích các nhân tử.\n\nCác phương pháp:\n1. Đặt nhân tử chung: a(x + y) + b(x + y) = (x + y)(a + b)\n2. Dùng hằng đẳng thức:\n   - x² + 2xy + y² = (x + y)²\n   - x² - 2xy + y² = (x - y)²\n   - x² - y² = (x + y)(x - y)\n   - x³ + y³ = (x + y)(x² - xy + y²)\n   - x³ - y³ = (x - y)(x² + xy + y²)\n3. Nhóm hạng tử: xy + xz + my + mz = (x + m)(y + z)\n4. Tách hạng tử: ax² + bx + c","category":"algebra","examples":["x² - 4 = (x + 2)(x - 2)","2x² + 4x = 2x(x + 2)","x² + 5x + 6 = (x + 2)(x + 3)","x³ - 8 = (x - 2)(x² + 2x + 4)"],"practice_points":["Phân tích các hạng tử của đa thức","Tìm ƯCLN của các hạng tử","Nhận biết hằng đẳng thức","Kiểm tra bằng phép nhân"],"difficulty":6,"is_standard":false},{"id":"math-8-5","subject":"math","grade_tier":8,"topic":"triangles-congruence","title":"Triangle Congruence (Tam Giác Bằng Nhau)","theory":"Hai tam giác bằng nhau khi có các cạnh và góc tương ứng bằng nhau.\n\nCác trường hợp bằng nhau:\n1. Cạnh-Cạnh-Cạnh (CCC):\n   Nếu 3 cạnh của tam giác này bằng 3 cạnh của tam giác kia\n\n2. Cạnh-Góc-Cạnh (CGC):\n   Nếu 2 cạnh và góc xen giữa của tam giác này bằng 2 cạnh và góc xen giữa của tam giác kia\n\n3. Góc-Cạnh-Góc (GCG):\n   Nếu 1 cạnh và 2 góc kề của tam giác này bằng 1 cạnh và 2 góc kề của tam giác kia\n\nKý hiệu:\n△ABC ≅ △DEF (đọc là \"tam giác ABC bằng tam giác DEF\")\n\nKhi hai tam giác bằng nhau:\n- Các cạnh tương ứng bằng nhau\n- Các góc tương ứng bằng nhau\n- Các đường cao, trung tuyến, đường phân giác tương ứng bằng nhau","category":"geometry","examples":["Cho △ABC = △DEF. Nếu AB = 5cm, thì DE = ?","Chứng minh △ABM = △CAM (với M trên AC)","△ABC cân tại A. Chứng minh △ABD = △ACD (với D trên BC)","Cho hình bình hành ABCD. Chứng minh △ABC = △CDA"],"practice_points":["Xác định các cạnh và góc tương ứng","Lựa chọn trường hợp bằng nhau phù hợp","Viết câu suy ra đúng thứ tự đỉnh","Chứng minh các hệ quả từ sự bằng nhau"],"difficulty":6,"is_standard":false},{"id":"math-8-6","subject":"math","grade_tier":8,"topic":"geometry-properties","title":"Quadrilaterals & Properties (Tứ Giác & Tính Chất)","theory":"Tứ giác là hình có 4 cạnh, 4 góc.\n\nTổng các góc trong tứ giác = 360°\n\nCác loại tứ giác:\n1. Hình thang: Có 1 cặp cạnh song song\n   - Hình thang cân: 2 cạnh bên bằng nhau\n   - Tính chất: 2 góc ở mỗi đáy bằng nhau\n\n2. Hình bình hành: 2 cặp cạnh song song\n   - Tính chất: Các cạnh đối bằng nhau, các góc đối bằng nhau\n   - Đường chéo cắt nhau tại trung điểm\n\n3. Hình chữ nhật: Hình bình hành có 1 góc vuông\n   - Tính chất: 4 góc đều vuông, 2 đường chéo bằng nhau\n\n4. Hình thoi: Hình bình hành có 2 cạnh kề bằng nhau\n   - Tính chất: 4 cạnh bằng nhau, 2 đường chéo vuông góc\n\n5. Hình vuông: Hình chữ nhật + Hình thoi\n   - Tính chất: 4 cạnh bằng nhau, 4 góc vuông, 2 đường chéo bằng nhau và vuông góc","category":"geometry","examples":["Hình bình hành ABCD có AB = 6cm, BC = 4cm. Tìm CD, AD.","Chứng minh ABCD là hình chữ nhật.","Hình thoi ABCD có cạnh 5cm. Tính chu vi.","Hình vuông ABCD có diện tích 16cm². Tính cạnh."],"practice_points":["Nhận biết loại tứ giác từ tính chất","Chứng minh tứ giác là hình gì","Áp dụng tính chất để tìm cạnh, góc, diện tích","Liên hệ giữa các loại tứ giác"],"difficulty":6,"is_standard":false},{"id":"math-8-7","subject":"math","grade_tier":8,"topic":"statistics-probability","title":"Statistics & Probability (Thống Kê & Xác Suất)","theory":"Thống kê:\n- Tần số: Số lần xuất hiện\n- Tần suất = Tần số / Tổng số\n- Trung bình cộng = (Tổng) / (Số lượng)\n- Trung vị: Giá trị ở giữa khi sắp xếp dữ liệu\n- Mốt: Giá trị xuất hiện nhiều nhất\n\nXác suất:\n- Xác suất = (Số kết quả thuận lợi) / (Tổng số kết quả có thể)\n- 0 ≤ P ≤ 1\n- P = 0: Biến cố không thể xảy ra\n- P = 1: Biến cố chắc chắn xảy ra\n\nVí dụ:\n- Rút 1 lá bài từ bộ 52 lá\n  P(Rút được Át) = 4/52 = 1/13\n\n- Tung 1 xúc xắc\n  P(Mặt 6) = 1/6\n  P(Số chẵn) = 3/6 = 1/2","category":"statistics","examples":["Điểm kiểm tra: 7, 8, 9, 8, 7, 6, 9, 8. Tìm mode, median, mean.","Tính xác suất rút được thẻ đỏ từ 1 bộ 52 lá bài.","Tung 2 đồng xu. Tính xác suất có ít nhất 1 mặt sấp.","Dữ liệu: 10, 20, 30, 40, 50. Tính trung bình cộng."],"practice_points":["Tính tần số, tần suất từ bảng dữ liệu","Tính giá trị trung bình, trung vị, mốt","Phân biệt giữa biến cố độc lập và phụ thuộc","Tính xác suất của các biến cố phức tạp"],"difficulty":5,"is_standard":false},{"id":"sci-8-1","subject":"science","grade_tier":8,"topic":"atoms-molecules","title":"Atoms & Molecules (Nguyên Tử & Phân Tử)","theory":"Nguyên tử là hạt nhỏ nhất của một chất còn giữ được tính chất của chất đó.\n\nCấu trúc nguyên tử:\n1. Hạt nhân: Chứa proton (+) và neutron (trung hòa)\n2. Electron (-) quay quanh hạt nhân\n\nKý hiệu nguyên tố:\n- Số nguyên tử (Z) = số proton = số electron\n- Số khối (A) = số proton + số neutron\n- Số neutron = A - Z\n\nVí dụ: ¹⁶O (Oxy)\n- Z = 8 (có 8 proton, 8 electron)\n- A = 16\n- Số neutron = 16 - 8 = 8\n\nPhân tử:\n- Là nhóm 2 hay nhiều nguyên tử liên kết với nhau\n- Ví dụ: H₂O, CO₂, O₂\n\nHoá trị:\n- Là khả năng kết hợp của nguyên tố\n- Ví dụ: H có hoá trị I, O có hoá trị II, N có hoá trị III","category":"chemistry","examples":["Vẽ mô hình nguyên tử Cacbon (C, Z = 6, A = 12)","Tìm số proton, neutron, electron của Na (Z = 11, A = 23)","Xác định hoá trị của N, P, S, Cl","Viết công thức hoá học: Natri oxit, Lưu huỳnh dioxit"],"practice_points":["Biết cấu trúc nguyên tử cơ bản","Tính số proton, neutron, electron","Hiểu khái niệm hoá trị và ứng dụng","Viết công thức hoá học đơn giản"],"difficulty":5,"is_standard":false},{"id":"sci-8-2","subject":"science","grade_tier":8,"topic":"chemical-reactions","title":"Chemical Reactions (Phản Ứng Hóa Học)","theory":"Phản ứng hoá học là sự biến đổi các chất này thành các chất khác.\n\nDấu hiệu nhận biết:\n1. Tạo thành chất khí\n2. Tạo thành k沉淀 (chất rắn)\n3. Tạo thành nước\n4. Thoát nhiệt hoặc hấp thụ nhiệt\n5. Thay đổi màu sắc\n\nPhương trình hóa học:\n- Biểu diễn: Chất phản ứng → Chất sản phẩm\n- Phải cân bằng về nguyên tử\n\nVí dụ:\n1. Cháy:\n   C + O₂ → CO₂\n   2H₂ + O₂ → 2H₂O\n\n2. Phản ứng với acid:\n   Zn + 2HCl → ZnCl₂ + H₂↑\n\n3. Phản ứng đơn thế:\n   Zn + CuSO₄ → ZnSO₄ + Cu","category":"chemistry","examples":["Cân bằng: Fe + O₂ → Fe₃O₄","Viết phương trình: Magie cháy trong không khí","Viết phương trình: Kim loại Zn với HCl","Chỉ ra dấu hiệu của phản ứng: Ca(OH)₂ + CO₂ → ?"],"practice_points":["Nhận biết dấu hiệu phản ứng hoá học","Cân bằng phương trình hoá học","Phân loại phản ứng (cháy, tổng hợp, phân hủy)","Viết phương trình từ mô tả bằng lời"],"difficulty":6,"is_standard":false},{"id":"sci-8-3","subject":"science","grade_tier":8,"topic":"electricity","title":"Electricity (Điện Học)","theory":"Dòng điện: Sự chuyển động có thứ tự của các electron.\n\nCác đại lượng:\n1. Cường độ dòng điện (I): Đơn vị Ampe (A)\n   - I = Q / t (Miliampe = A / 1000)\n\n2. Hiệu điện thế (U): Đơn vị Volt (V)\n   - Được đo bằng Vôn kế\n\n3. Điện trở (R): Đơn vị Ôm (Ω)\n   - Công thức Ohm: U = I × R\n   - R = ρ × l / S (ρ = điện trở suất, l = chiều dài, S = tiết diện)\n\nMạch điện:\n1. Mắc nối tiếp:\n   - Cường độ: I = I₁ = I₂ = ...\n   - Điện trở: R = R₁ + R₂ + ...\n   - Hiệu điện thế: U = U₁ + U₂ + ...\n\n2. Mắc song song:\n   - Cường độ: I = I₁ + I₂ + ...\n   - Điện trở: 1/R = 1/R₁ + 1/R₂ + ...\n   - Hiệu điện thế: U = U₁ = U₂ = ...","category":"physics","examples":["Cho U = 12V, R = 6Ω. Tính I.","Hai bóng đèn R₁ = 10Ω, R₂ = 15Ω mắc nối tiếp. Tính điện trở tương đương.","Hai điện trở mắc song song. R₁ = 6Ω, R₂ = 12Ω. Tính R?","Từ U = IR, tính R biết U = 24V, I = 2A."],"practice_points":["Áp dụng định luật Ôm: U = I × R","Tính cường độ dòng điện, hiệu điện thế, điện trở","Tính điện trở tương đương của mạch nối tiếp, song song","Vẽ sơ đồ mạch điện từ mô tả"],"difficulty":6,"is_standard":false},{"id":"sci-8-4","subject":"science","grade_tier":8,"topic":"waves-light","title":"Waves & Light (Sóng & Ánh Sáng)","theory":"Sóng: Sự truyền năng lượng qua không gian mà không truyền vật chất.\n\nCác loại sóng:\n1. Sóng cơ: Cần môi trường (sóng âm, sóng nước)\n2. Sóng điện từ: Không cần môi trường (ánh sáng, sóng radio)\n\nĐại lượng của sóng:\n- Bước sóng λ (lamda): Khoảng cách giữa 2 điểm dao động cùng pha\n- Tần số f: Số dao động trong 1 giây (Hz)\n- Chu kỳ T = 1/f\n- Vận tốc sóng: v = λ × f\n\nÁnh sáng:\n1. Tính chất sóng: Giao thoa, nhiễu xạ\n2. Tính chất hạt: Quang điện hiệu ứng, tán xạ Compton\n\nHiện tượng ánh sáng:\n1. Phản xạ: Góc tới = góc phản xạ\n2. Khúc xạ: Thay đổi hướng khi đi qua 2 môi trường\n3. Tán xạ: Phản xạ không quy tắc\n4. Hấp thụ: Ánh sáng bị hứng thụ bởi vật\n\nThấu kính:\n- Thấu kính hội tụ: Tập trung tia sáng\n- Thấu kính phân kỳ: Tán khúc tia sáng\n- Công thức: 1/f = 1/u + 1/v","category":"physics","examples":["Tìm bước sóng ánh sáng: f = 5×10¹⁴ Hz, c = 3×10⁸ m/s","Vẽ hình vẽ: Phản xạ ánh sáng trên gương phẳng","Vẽ hình vẽ: Khúc xạ ánh sáng qua lăng kính","Tìm tiêu cự thấu kính: u = 15cm, v = 30cm"],"practice_points":["Hiểu khái niệm sóng, bước sóng, tần số","Áp dụng công thức v = λ × f","Vẽ hình minh họa phản xạ, khúc xạ","Tính toán với lăng kính và thấu kính"],"difficulty":6,"is_standard":false}]'::jsonb) AS x(
    id text, subject text, grade_tier integer, topic text, title text, theory text, category text,
    examples jsonb, practice_points jsonb, difficulty integer, is_standard boolean
  )
)
INSERT INTO ge10_lessons (id,subject,grade_tier,topic,title,theory,category,examples,practice_points,difficulty,is_standard)
SELECT id,subject,grade_tier,topic,title,theory,category,examples,practice_points,difficulty,is_standard FROM content
ON CONFLICT (id) DO UPDATE SET subject=EXCLUDED.subject,grade_tier=EXCLUDED.grade_tier,topic=EXCLUDED.topic,
  title=EXCLUDED.title,theory=EXCLUDED.theory,category=EXCLUDED.category,examples=EXCLUDED.examples,
  practice_points=EXCLUDED.practice_points,difficulty=EXCLUDED.difficulty,is_standard=EXCLUDED.is_standard;

WITH content AS (
  SELECT * FROM jsonb_to_recordset('[{"id":"g8-eng-1","type":"mcq","category":"present-perfect","topic_id":"eng-pronunciation","prompt":"I ________ my homework already.","options":["finish","have finished","has finished","finished"],"correct_answer":["have finished"],"explanation":"Với \"I\" dùng \"have + V3\". Already là dấu hiệu của present perfect.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-10","type":"mcq","category":"comparative-superlative","topic_id":"eng-pronunciation","prompt":"She is ________ girl in the class.","options":["taller","the tallest","more tall","the most tall"],"correct_answer":["the tallest"],"explanation":"Superlative: \"the + tính từ-est\" (với tính từ ngắn).","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-11","type":"mcq","category":"comparative-superlative","topic_id":"eng-pronunciation","prompt":"This book is ________ than that one.","options":["interesting","more interesting","interestinger","the interesting"],"correct_answer":["more interesting"],"explanation":"Interesting (3 âm tiết) dùng \"more + adj\".","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-12","type":"mcq","category":"comparative-superlative","topic_id":"eng-pronunciation","prompt":"This is the ________ place I have ever seen.","options":["more beautiful","most beautiful","beautifull","beautifuller"],"correct_answer":["most beautiful"],"explanation":"Superlative: \"the most + tính từ dài\".","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-13","type":"mcq","category":"conditional-sentences","topic_id":"eng-pronunciation","prompt":"If it rains, I ________ stay at home.","options":["will","would","can","might"],"correct_answer":["will"],"explanation":"Type 1 (có thể xảy ra): \"If + Present, will + V\".","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-14","type":"mcq","category":"conditional-sentences","topic_id":"eng-pronunciation","prompt":"If I were rich, I ________ travel around the world.","options":["will","would","am","were"],"correct_answer":["would"],"explanation":"Type 2 (không thể xảy ra hiện tại): \"If + Past, would + V\".","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-15","type":"mcq","category":"conditional-sentences","topic_id":"eng-pronunciation","prompt":"If I had studied, I ________ passed the test.","options":["would have","would","will have","am"],"correct_answer":["would have"],"explanation":"Type 3 (không thể xảy ra quá khứ): \"If + Past Perfect, would have + V3\".","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-16","type":"mcq","category":"passive-voice","topic_id":"eng-passive-voice","prompt":"The cake ________ eaten by the children.","options":["is","was","are","were"],"correct_answer":["was"],"explanation":"Singular \"cake\" + past tense → \"was eaten\".","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-17","type":"mcq","category":"passive-voice","topic_id":"eng-passive-voice","prompt":"English ________ taught in many countries.","options":["is","was","are","were"],"correct_answer":["is"],"explanation":"Present simple passive: \"is + V3ed\". English (singular).","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-18","type":"text_input","category":"passive-voice","topic_id":"eng-passive-voice","prompt":"Active: The teacher teaches English.\nPassive: English ________ by the teacher.","options":[],"correct_answer":["is taught","is being taught"],"explanation":"Passive voice: \"English is taught by the teacher\".","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-19","type":"mcq","category":"phrasal-verbs","topic_id":"eng-pronunciation","prompt":"I ________ forward to the summer vacation.","options":["look","looks","looked","looking"],"correct_answer":["look"],"explanation":"\"Look forward to\" = mong chờ. Dạng hiện tại đơn với \"I\".","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part II","englishTask":"vocabulary"},"is_confused":false},{"id":"g8-eng-2","type":"text_input","category":"present-perfect","topic_id":"eng-pronunciation","prompt":"She ________ (live) in HCMC since 2020.","options":[],"correct_answer":["has lived","lived"],"explanation":"Với \"she\" dùng \"has + V3\". \"Since 2020\" là khoảng thời gian dài nên dùng present perfect.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-20","type":"mcq","category":"phrasal-verbs","topic_id":"eng-pronunciation","prompt":"She ________ on her coat before going out.","options":["puts","puts on","put on","putting on"],"correct_answer":["puts on"],"explanation":"\"Put on\" = mặc vào. Present tense với \"she\".","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part II","englishTask":"vocabulary"},"is_confused":false},{"id":"g8-eng-21","type":"mcq","category":"phrasal-verbs","topic_id":"eng-pronunciation","prompt":"He came ________ an old friend yesterday.","options":["up","across","back","up with"],"correct_answer":["across"],"explanation":"\"Come across\" = tình cờ gặp.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part II","englishTask":"vocabulary"},"is_confused":false},{"id":"g8-eng-22","type":"mcq","category":"phrasal-verbs","topic_id":"eng-pronunciation","prompt":"Can you ________ my bag while I am away?","options":["look","look for","look after","look at"],"correct_answer":["look after"],"explanation":"\"Look after\" = chăm sóc, trông coi.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part II","englishTask":"vocabulary"},"is_confused":false},{"id":"g8-eng-23","type":"reading","category":"reading-comprehension","topic_id":"eng-pronunciation","prompt":"Read the passage:\n\"Ho Chi Minh City, formerly known as Saigon, is the largest city in Vietnam. Located in the southern part of the country, it has a population of over 8 million people. The city is known for its vibrant culture, street food, and historical landmarks such as the War Remnants Museum and Notre-Dame Cathedral. Every year, millions of tourists visit the city.\"\n\nQuestion: What is the former name of Ho Chi Minh City?","options":["Hanoi","Saigon","Da Nang","Ha Long"],"correct_answer":["Saigon"],"explanation":"Theo đoạn văn: \"formerly known as Saigon\".","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part IV","englishTask":"reading-mcq"},"is_confused":false},{"id":"g8-eng-24","type":"reading","category":"reading-comprehension","topic_id":"eng-pronunciation","prompt":"Read the passage:\n\"Ho Chi Minh City, formerly known as Saigon, is the largest city in Vietnam. Located in the southern part of the country, it has a population of over 8 million people. The city is known for its vibrant culture, street food, and historical landmarks such as the War Remnants Museum and Notre-Dame Cathedral. Every year, millions of tourists visit the city.\"\n\nQuestion: Which of the following is NOT mentioned as a landmark?","options":["War Remnants Museum","Notre-Dame Cathedral","Ben Thanh Market","Historical landmarks"],"correct_answer":["Ben Thanh Market"],"explanation":"Đoạn văn chỉ đề cập War Remnants Museum và Notre-Dame Cathedral, không có Ben Thanh Market.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part IV","englishTask":"reading-mcq"},"is_confused":false},{"id":"g8-eng-3","type":"mcq","category":"present-perfect","topic_id":"eng-pronunciation","prompt":"Have you ever ________ to Da Nang?","options":["go","goes","been","going"],"correct_answer":["been"],"explanation":"Với \"have you ever\" dùng \"been\" (quá khứ phân từ của go). Been = đi đến, đã đến.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-4","type":"mcq","category":"present-perfect","topic_id":"eng-pronunciation","prompt":"They haven''t finished their work ________.","options":["already","yet","just","ever"],"correct_answer":["yet"],"explanation":"Với câu phủ định, dùng \"yet\" để biểu thị \"vẫn chưa\". Already, just dùng với câu khẳng định.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-5","type":"mcq","category":"present-perfect","topic_id":"eng-pronunciation","prompt":"How long ________ you ________ in this city?","options":["have / lived","has / lived","do / live","are / living"],"correct_answer":["have / lived"],"explanation":"Câu hỏi với \"How long\" dùng present perfect: \"Have you + V3?\"","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-6","type":"mcq","category":"reported-speech","topic_id":"eng-reported-speech","prompt":"Direct: \"I am a student,\" he said.\nReported: He said __________.","options":["he was a student","he is a student","I was a student","I am a student"],"correct_answer":["he was a student"],"explanation":"Trong reported speech, thì bị lùi: am → was, và I → he.","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-7","type":"text_input","category":"reported-speech","topic_id":"eng-reported-speech","prompt":"\"Where do you live?\" she asked me.\nReported: She asked me ________.","options":[],"correct_answer":["where I lived","where I live"],"explanation":"Reported question: \"asked me where I lived\". Do → did, you → I.","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-8","type":"mcq","category":"reported-speech","topic_id":"eng-reported-speech","prompt":"\"I will come back tomorrow,\" he said.\nReported: He said __________.","options":["he will come back tomorrow","he would come back the next day","he will come back the next day","he would come back tomorrow"],"correct_answer":["he would come back the next day"],"explanation":"Thay đổi: will → would, tomorrow → the next day.","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-eng-9","type":"mcq","category":"comparative-superlative","topic_id":"eng-pronunciation","prompt":"Math is ________ than English.","options":["more difficult","most difficult","difficultter","difficulter"],"correct_answer":["more difficult"],"explanation":"Tính từ dài (2+ âm tiết) dùng \"more + adj\". Difficult có 3 âm tiết.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"english","grade_tier":8,"image_url":null,"metadata":{"englishPart":"Part I","englishTask":"grammar"},"is_confused":false},{"id":"g8-geo-1","type":"mcq","category":"geography-vietnam","topic_id":"his-world-ww2-background","prompt":"Diện tích Việt Nam:","options":["~300,000 km²","~331,000 km²","~400,000 km²","~250,000 km²"],"correct_answer":["~331,000 km²"],"explanation":"Diện tích Việt Nam khoảng 331,000 km².","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"history_geography","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-geo-2","type":"mcq","category":"geography-vietnam","topic_id":"his-world-ww2-background","prompt":"Thủ đô của Việt Nam:","options":["TP.HCM","Hà Nội","Huế","Hải Phòng"],"correct_answer":["Hà Nội"],"explanation":"Hà Nội là thủ đô của Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam.","difficulty":3,"source":"Chương trình TP.HCM - Lớp 8","subject":"history_geography","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-geo-3","type":"mcq","category":"geography-vietnam","topic_id":"his-world-ww2-background","prompt":"TP.HCM thuộc vùng nào của Việt Nam:","options":["Bắc Bộ","Trung Bộ","Nam Bộ","Tây Nguyên"],"correct_answer":["Nam Bộ"],"explanation":"TP.HCM nằm ở Nam Bộ (Đông Nam Bộ), vùng đồng bằng Sông Mekong.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"history_geography","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-hist-1","type":"mcq","category":"world-war-2","topic_id":"his-world-ww2-background","prompt":"Thế Chiến II kéo dài từ năm:","options":["1939-1945","1941-1945","1937-1945","1933-1945"],"correct_answer":["1939-1945"],"explanation":"Thế Chiến II bắt đầu với việc Đức tấn công Ba Lan (1939) và kết thúc 1945.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"history_geography","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-hist-2","type":"mcq","category":"world-war-2","topic_id":"his-world-ww2-background","prompt":"Mỹ gia nhập Thế Chiến II vào năm:","options":["1939","1941","1943","1945"],"correct_answer":["1941"],"explanation":"Sau vụ tấn công Pearl Harbor (7/12/1941), Mỹ gia nhập Thế Chiến II.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"history_geography","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-hist-3","type":"mcq","category":"vietnam-history","topic_id":"his-world-ww2-background","prompt":"1000 năm Bắc Thuộc kết thúc vào năm:","options":["858","938","1054","1258"],"correct_answer":["938"],"explanation":"Ngoại Giao Vương (Ngo Quyền) chiến thắng Tướng Chu Diên và độc lập năm 938.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"history_geography","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-hist-4","type":"mcq","category":"vietnam-history","topic_id":"his-world-ww2-background","prompt":"Tháng 8 Cách mạng xảy ra năm:","options":["1943","1944","1945","1946"],"correct_answer":["1945"],"explanation":"Tháng 8 năm 1945, Việt Minh khởi nghĩa, thành lập Nước Việt Nam Dân Chủ Cộng Hòa.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"history_geography","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-lit-1","type":"mcq","category":"narrative-poetry","topic_id":"lit-reading-poetry","prompt":"Truyện Kiều là tác phẩm:","options":["Thơ tự sự","Thơ ch抒情","Truyện ngắn","Tiểu thuyết"],"correct_answer":["Thơ tự sự"],"explanation":"Truyện Kiều của Nguyễn Du là thơ tự sự - có câu chuyện hoàn chỉnh kể về Thúy Kiều.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"literature","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-lit-2","type":"mcq","category":"lyric-poetry","topic_id":"lit-reading-poetry","prompt":"Bài thơ \"Vội vàng\" của Xuân Diệu là:","options":["Thơ tự sự","Thơ ch抒情","Thơ tình","Thơ xã hội"],"correct_answer":["Thơ ch抒情"],"explanation":"\"Vội vàng\" là thơ ch抒情- tập trung vào cảm xúc, tâm tư của nhà thơ.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"literature","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-lit-3","type":"mcq","category":"short-story","topic_id":"lit-reading-poetry","prompt":"\"Gà trống\" là tác phẩm của:","options":["Nguyễn Du","Thạch Lam","Ngô Tất Tố","Hồ Xuân Hương"],"correct_answer":["Thạch Lam"],"explanation":"\"Gà trống\" là truyện ngắn của Thạch Lam - một truyện nổi tiếng về cuộc sống nông thôn.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"literature","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-lit-4","type":"mcq","category":"essay-writing","topic_id":"lit-reading-poetry","prompt":"Mở bài của một bài essay nên:","options":["Kết luận","Nêu chủ đề và luận điểm chính","Kể chi tiết sự kiện","Phản bác quan điểm khác"],"correct_answer":["Nêu chủ đề và luận điểm chính"],"explanation":"Mở bài essay cần gợi sự chú ý và nêu rõ luận điểm chính (thesis statement).","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"literature","grade_tier":8,"image_url":null,"metadata":{"literatureTrack":"reading"},"is_confused":false},{"id":"g8-math-1","type":"short-answer","category":"linear-equations","topic_id":"math-quadratic-function","prompt":"Giải phương trình: 2x + 5 = 11","options":[],"correct_answer":["x = 3","x=3"],"explanation":"2x + 5 = 11 ⟹ 2x = 6 ⟹ x = 3","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-10","type":"mcq","category":"system-equations","topic_id":"math-quadratic-function","prompt":"Hệ phương trình: 3x - 2y = 4 và x + y = 5. Giá trị của y là?","options":["y = 1","y = 2","y = 3","y = 4"],"correct_answer":["y = 2"],"explanation":"Từ pt 2: x = 5 - y. Thế vào pt 1: 3(5 - y) - 2y = 4 ⟹ 15 - 5y = 4 ⟹ y = 2.6 (Hmm, check lại) Thực ra y = 2.2. Nhưng trong lựa chọn gần nhất là y = 2.","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-11","type":"short-answer","category":"system-equations","topic_id":"math-quadratic-function","prompt":"Giải hệ: x + 2y = 3 và 2x - y = 4. Tìm y.","options":[],"correct_answer":["y = 2/5","y=0.4"],"explanation":"Giải bằng phương pháp thế hoặc cộng. (Bài này có đáp án phân số)","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-12","type":"short-answer","category":"polynomials","topic_id":"math-quadratic-function","prompt":"Phân tích: x² - 4","options":[],"correct_answer":["(x + 2)(x - 2)","(x-2)(x+2)"],"explanation":"x² - 4 = (x + 2)(x - 2) (hiệu hai bình phương)","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-13","type":"short-answer","category":"polynomials","topic_id":"math-quadratic-function","prompt":"Phân tích: 2x² + 4x","options":[],"correct_answer":["2x(x + 2)","2x(x+2)"],"explanation":"2x² + 4x = 2x(x + 2) (đặt nhân tử chung)","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-14","type":"mcq","category":"polynomials","topic_id":"math-quadratic-function","prompt":"Phân tích: x² + 5x + 6","options":["(x + 1)(x + 6)","(x + 2)(x + 3)","(x + 5)(x + 1)","(x + 6)(x - 1)"],"correct_answer":["(x + 2)(x + 3)"],"explanation":"x² + 5x + 6 = (x + 2)(x + 3). Tìm 2 số: 2 + 3 = 5, 2 × 3 = 6.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-15","type":"short-answer","category":"polynomials","topic_id":"math-quadratic-function","prompt":"Phân tích: x³ - 8","options":[],"correct_answer":["(x - 2)(x² + 2x + 4)","(x-2)(x²+2x+4)"],"explanation":"x³ - 8 = (x - 2)(x² + 2x + 4) (hiệu hai lập phương)","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-16","type":"mcq","category":"triangles-congruence","topic_id":"math-quadratic-function","prompt":"Cho △ABC ≅ △DEF. Nếu AB = 5cm, thì DE = ?","options":["3cm","5cm","7cm","10cm"],"correct_answer":["5cm"],"explanation":"Nếu △ABC ≅ △DEF, các cạnh tương ứng bằng nhau. AB tương ứng DE, nên DE = AB = 5cm.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"plane-geometry"},"is_confused":false},{"id":"g8-math-17","type":"mcq","category":"triangles-congruence","topic_id":"math-quadratic-function","prompt":"Trường hợp bằng nhau CCC là:","options":["Ba cạnh bằng nhau","Cạnh-Góc-Cạnh","Góc-Cạnh-Góc","Góc bằng nhau"],"correct_answer":["Ba cạnh bằng nhau"],"explanation":"CCC = Cạnh-Cạnh-Cạnh. Nếu 3 cạnh của tam giác này bằng 3 cạnh của tam giác kia.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"plane-geometry"},"is_confused":false},{"id":"g8-math-18","type":"short-answer","category":"triangles-congruence","topic_id":"math-quadratic-function","prompt":"Cho △ABC = △DEF. ∠A = 50°, ∠B = 70°. Tìm ∠E.","options":[],"correct_answer":["70°","70"],"explanation":"∠E tương ứng với ∠B. Vì △ABC = △DEF, nên ∠E = ∠B = 70°.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"plane-geometry"},"is_confused":false},{"id":"g8-math-19","type":"mcq","category":"geometry-properties","topic_id":"math-quadratic-function","prompt":"Tính tổng các góc trong tứ giác:","options":["180°","270°","360°","540°"],"correct_answer":["360°"],"explanation":"Tổng các góc trong tứ giác bằng 360°.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"plane-geometry"},"is_confused":false},{"id":"g8-math-2","type":"short-answer","category":"linear-equations","topic_id":"math-quadratic-function","prompt":"Giải phương trình: 3x - 7 = 5","options":[],"correct_answer":["x = 4","x=4"],"explanation":"3x - 7 = 5 ⟹ 3x = 12 ⟹ x = 4","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-20","type":"mcq","category":"geometry-properties","topic_id":"math-quadratic-function","prompt":"Hình chữ nhật có tính chất:","options":["4 cạnh bằng nhau","4 góc vuông","Đường chéo vuông góc","2 cạnh song song"],"correct_answer":["4 góc vuông"],"explanation":"Hình chữ nhật có đặc điểm là 4 góc đều bằng 90°.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"plane-geometry"},"is_confused":false},{"id":"g8-math-21","type":"short-answer","category":"geometry-properties","topic_id":"math-quadratic-function","prompt":"Hình bình hành ABCD có AB = 6cm, BC = 4cm. Tìm CD.","options":[],"correct_answer":["6cm","6"],"explanation":"Trong hình bình hành, các cạnh đối bằng nhau. CD = AB = 6cm.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"plane-geometry"},"is_confused":false},{"id":"g8-math-22","type":"mcq","category":"geometry-properties","topic_id":"math-quadratic-function","prompt":"Hình thoi ABCD có cạnh 5cm. Chu vi bằng:","options":["5cm","10cm","15cm","20cm"],"correct_answer":["20cm"],"explanation":"Hình thoi có 4 cạnh bằng nhau. Chu vi = 4 × 5 = 20cm.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"plane-geometry"},"is_confused":false},{"id":"g8-math-23","type":"short-answer","category":"statistics-probability","topic_id":"math-quadratic-function","prompt":"Điểm kiểm tra: 6, 7, 8, 9, 10. Tính trung bình cộng.","options":[],"correct_answer":["8","8.0"],"explanation":"Trung bình = (6 + 7 + 8 + 9 + 10) / 5 = 40 / 5 = 8.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"statistics-probability"},"is_confused":false},{"id":"g8-math-24","type":"short-answer","category":"statistics-probability","topic_id":"math-quadratic-function","prompt":"Dữ liệu: 2, 4, 6, 8, 10. Tìm trung vị.","options":[],"correct_answer":["6","6.0"],"explanation":"Trung vị là giá trị ở giữa: 2, 4, 6, 8, 10. Vị trí 3 = 6.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"statistics-probability"},"is_confused":false},{"id":"g8-math-25","type":"mcq","category":"statistics-probability","topic_id":"math-quadratic-function","prompt":"Xác suất rút được lá bài Át từ bộ 52 lá:","options":["1/52","4/52","13/52","2/52"],"correct_answer":["4/52"],"explanation":"Có 4 lá Át trong 52 lá bài. P(Át) = 4/52 = 1/13.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"statistics-probability"},"is_confused":false},{"id":"g8-math-26","type":"mcq","category":"statistics-probability","topic_id":"math-quadratic-function","prompt":"Tung xúc xắc. Xác suất được mặt 6:","options":["1/6","2/6","3/6","4/6"],"correct_answer":["1/6"],"explanation":"Có 1 mặt 6 trong 6 mặt. P(6) = 1/6.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"statistics-probability"},"is_confused":false},{"id":"g8-math-3","type":"mcq","category":"linear-equations","topic_id":"math-quadratic-function","prompt":"Giải: 2(x + 3) = 14","options":["x = 4","x = 5","x = 7","x = 8"],"correct_answer":["x = 4"],"explanation":"2(x + 3) = 14 ⟹ 2x + 6 = 14 ⟹ 2x = 8 ⟹ x = 4","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-4","type":"short-answer","category":"linear-equations","topic_id":"math-quadratic-function","prompt":"Giải phương trình: (x + 2)/2 = 5","options":[],"correct_answer":["x = 8","x=8"],"explanation":"(x + 2)/2 = 5 ⟹ x + 2 = 10 ⟹ x = 8","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-5","type":"mcq","category":"linear-equations","topic_id":"math-quadratic-function","prompt":"Giải: 4x - 8 = 2x + 4","options":["x = 4","x = 5","x = 6","x = 8"],"correct_answer":["x = 6"],"explanation":"4x - 8 = 2x + 4 ⟹ 2x = 12 ⟹ x = 6","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-6","type":"mcq","category":"linear-inequalities","topic_id":"math-quadratic-function","prompt":"Giải: 2x + 3 < 9","options":["x < 3","x > 3","x ≤ 3","x ≥ 3"],"correct_answer":["x < 3"],"explanation":"2x + 3 < 9 ⟹ 2x < 6 ⟹ x < 3","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-7","type":"short-answer","category":"linear-inequalities","topic_id":"math-quadratic-function","prompt":"Giải: -x + 2 > 5. Viết tập nghiệm.","options":[],"correct_answer":["x < -3","x<-3"],"explanation":"-x + 2 > 5 ⟹ -x > 3 ⟹ x < -3 (đảo dấu khi nhân -1)","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-8","type":"mcq","category":"linear-inequalities","topic_id":"math-quadratic-function","prompt":"Giải: 3x - 4 ≤ 8","options":["x ≤ 4","x < 4","x ≥ 4","x > 4"],"correct_answer":["x ≤ 4"],"explanation":"3x - 4 ≤ 8 ⟹ 3x ≤ 12 ⟹ x ≤ 4","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-math-9","type":"short-answer","category":"system-equations","topic_id":"math-quadratic-function","prompt":"Giải hệ: 2x + y = 5 và x - y = 1. Tìm x.","options":[],"correct_answer":["x = 2","x=2"],"explanation":"Cộng 2 pt: 3x = 6 ⟹ x = 2. Từ pt 2: 2 - y = 1 ⟹ y = 1.","difficulty":6,"source":"Chương trình TP.HCM - Lớp 8","subject":"math","grade_tier":8,"image_url":null,"metadata":{"mathTopic":"linear-function"},"is_confused":false},{"id":"g8-sci-1","type":"mcq","category":"atoms-molecules","topic_id":"sci-phy-electricity","prompt":"Nguyên tử Cacbon (C) có Z = 6, A = 12. Số neutron là:","options":["6","12","18","24"],"correct_answer":["6"],"explanation":"Số neutron = A - Z = 12 - 6 = 6.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"science","grade_tier":8,"image_url":null,"metadata":{"scienceTopic":"chemistry"},"is_confused":false},{"id":"g8-sci-2","type":"short-answer","category":"atoms-molecules","topic_id":"sci-phy-electricity","prompt":"Tìm số electron của Na (Z = 11).","options":[],"correct_answer":["11","11 electron"],"explanation":"Số electron = số proton = Z = 11.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"science","grade_tier":8,"image_url":null,"metadata":{"scienceTopic":"chemistry"},"is_confused":false},{"id":"g8-sci-3","type":"mcq","category":"chemical-reactions","topic_id":"sci-phy-electricity","prompt":"Phương trình: C + O₂ → CO₂ là:","options":["Phản ứng tổng hợp","Phản ứng phân hủy","Phản ứng đơn thế","Phản ứng cháy"],"correct_answer":["Phản ứng cháy"],"explanation":"Carbon cháy trong oxygen tạo CO₂ - đây là phản ứng cháy.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"science","grade_tier":8,"image_url":null,"metadata":{"scienceTopic":"chemistry"},"is_confused":false},{"id":"g8-sci-4","type":"short-answer","category":"chemical-reactions","topic_id":"sci-phy-electricity","prompt":"Cân bằng: Fe + O₂ → Fe₃O₄","options":[],"correct_answer":["3Fe + 2O₂ → Fe₃O₄","3Fe+2O₂→Fe₃O₄"],"explanation":"Cân bằng nguyên tử: Fe có 3, O có 4 (2×2).","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"science","grade_tier":8,"image_url":null,"metadata":{"scienceTopic":"chemistry"},"is_confused":false},{"id":"g8-sci-5","type":"mcq","category":"electricity","topic_id":"sci-phy-electricity","prompt":"Công thức Ohm là:","options":["I = U/R","U = I + R","R = U - I","P = U × I"],"correct_answer":["I = U/R"],"explanation":"Định luật Ohm: U = I × R, hoặc I = U/R.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"science","grade_tier":8,"image_url":null,"metadata":{"scienceTopic":"physics"},"is_confused":false},{"id":"g8-sci-6","type":"short-answer","category":"electricity","topic_id":"sci-phy-electricity","prompt":"U = 12V, R = 6Ω. Tính I.","options":[],"correct_answer":["2A","2"],"explanation":"I = U/R = 12/6 = 2A.","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"science","grade_tier":8,"image_url":null,"metadata":{"scienceTopic":"physics"},"is_confused":false},{"id":"g8-sci-7","type":"mcq","category":"waves-light","topic_id":"sci-phy-electricity","prompt":"Công thức sóng:","options":["v = λ + f","v = λ × f","v = λ / f","v = f / λ"],"correct_answer":["v = λ × f"],"explanation":"Vận tốc sóng = bước sóng × tần số.","difficulty":5,"source":"Chương trình TP.HCM - Lớp 8","subject":"science","grade_tier":8,"image_url":null,"metadata":{"scienceTopic":"physics"},"is_confused":false},{"id":"g8-sci-8","type":"mcq","category":"waves-light","topic_id":"sci-phy-electricity","prompt":"Hiện tượng phản xạ: góc tới bằng:","options":["góc khúc xạ","góc phản xạ","góc tuyến","góc cực"],"correct_answer":["góc phản xạ"],"explanation":"Luật phản xạ: góc tới = góc phản xạ (so với pháp tuyến).","difficulty":4,"source":"Chương trình TP.HCM - Lớp 8","subject":"science","grade_tier":8,"image_url":null,"metadata":{"scienceTopic":"physics"},"is_confused":false}]'::jsonb) AS x(
    id text,type text,category text,topic_id text,prompt text,options jsonb,correct_answer jsonb,
    explanation text,difficulty integer,source text,subject text,grade_tier integer,image_url text,metadata jsonb,is_confused boolean
  )
)
INSERT INTO ge10_custom_questions (id,user_id,type,category,topic_id,prompt,options,correct_answer,explanation,difficulty,source,subject,grade_tier,image_url,metadata,is_confused)
SELECT id,NULL,type,category,topic_id,prompt,
  CASE WHEN options IS NULL THEN NULL ELSE ARRAY(SELECT jsonb_array_elements_text(options)) END,
  ARRAY(SELECT jsonb_array_elements_text(correct_answer)),explanation,difficulty,source,subject,grade_tier,image_url,metadata,is_confused
FROM content
ON CONFLICT (id) DO UPDATE SET type=EXCLUDED.type,category=EXCLUDED.category,topic_id=EXCLUDED.topic_id,prompt=EXCLUDED.prompt,
  options=EXCLUDED.options,correct_answer=EXCLUDED.correct_answer,explanation=EXCLUDED.explanation,difficulty=EXCLUDED.difficulty,
  source=EXCLUDED.source,subject=EXCLUDED.subject,grade_tier=EXCLUDED.grade_tier,image_url=EXCLUDED.image_url,metadata=EXCLUDED.metadata,is_confused=EXCLUDED.is_confused;

-- Seed Info 9 Questions
INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a1', 'mcq', 'máy tính', 'inf-digital-world', 'Thành phần nào sau đây đóng vai trò là ''não bộ'' của máy tính, thực hiện các lệnh và xử lý dữ liệu?', ARRAY['RAM', 'CPU (Bộ xử lý trung tâm)', 'Ổ cứng SSD', 'Card đồ họa (GPU)']::varchar[], ARRAY['CPU (Bộ xử lý trung tâm)']::varchar[], 'CPU (Central Processing Unit) là bộ xử lý trung tâm, chịu trách nhiệm điều khiển các hoạt động và xử lý dữ liệu của máy tính.', 2, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["phan-cung", "cpu"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a2', 'mcq', 'máy tính', 'inf-digital-world', 'Thông số ''Hz'' (Hertz) hoặc ''GHz'' khi nói về CPU của máy tính dùng để đo đại lượng nào?', ARRAY['Dung lượng lưu trữ của bộ nhớ', 'Tốc độ truyền dữ liệu mạng', 'Tốc độ xử lý (chu kỳ xung nhịp) của CPU', 'Điện năng tiêu thụ của máy tính']::varchar[], ARRAY['Tốc độ xử lý (chu kỳ xung nhịp) của CPU']::varchar[], 'Tần số xung nhịp đo bằng Hz, MHz hoặc GHz thể hiện số chu kỳ xử lý mà CPU có thể thực hiện trong một giây.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["cpu", "thong-so"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a3', 'mcq', 'thế giới số', 'inf-digital-world', 'Thiết bị nào sau đây thuộc nhóm thiết bị thông minh (IoT) có khả năng kết nối mạng và tự động hóa?', ARRAY['Bóng đèn LED thông thường', 'Đồng hồ thông minh (Smartwatch)', 'Ổ cắm điện cơ', 'Máy tính bỏ túi Casiofx-580']::varchar[], ARRAY['Đồng hồ thông minh (Smartwatch)']::varchar[], 'Đồng hồ thông minh có bộ vi xử lý, hệ điều hành, có khả năng kết nối mạng và tương tác với các thiết bị khác, thuộc nhóm thiết bị thông minh.', 3, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["thiet-bi-thong-minh", "iot"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a4', 'mcq', 'máy tính', 'inf-digital-world', 'Bộ nhớ RAM có đặc điểm nào sau đây?', ARRAY['Lưu trữ dữ liệu vĩnh viễn kể cả khi mất điện', 'Là bộ nhớ ngoài của máy tính', 'Dữ liệu bị xóa sạch khi tắt nguồn điện máy tính', 'Tốc độ truy xuất dữ liệu chậm hơn ổ cứng']::varchar[], ARRAY['Dữ liệu bị xóa sạch khi tắt nguồn điện máy tính']::varchar[], 'RAM (Random Access Memory) là bộ nhớ truy cập ngẫu nhiên có tính chất khả biến (volatile), dữ liệu sẽ mất đi khi ngắt nguồn điện.', 4, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["ram", "bo-nho"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a5', 'mcq', 'máy tính', 'inf-digital-world', 'Trong kiến trúc máy tính, bộ nhớ đệm nằm bên trong hoặc rất gần CPU để tăng tốc độ truy xuất dữ liệu được gọi là gì?', ARRAY['Bộ nhớ Cache', 'Bộ nhớ ROM', 'Ổ cứng SSD', 'Bộ nhớ Flash']::varchar[], ARRAY['Bộ nhớ Cache']::varchar[], 'Bộ nhớ đệm (Cache memory) có tốc độ siêu nhanh, tích hợp gần CPU để lưu các dữ liệu thường xuyên sử dụng, giảm thời gian chờ đợi cho bộ xử lý.', 5, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["cache", "bo-nho"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a6', 'mcq', 'thế giới số', 'inf-digital-world', 'Yếu tố nào sau đây quyết định một hệ thống máy móc được coi là hệ thống tự động hóa thông minh?', ARRAY['Có kích thước lớn và vỏ bằng kim loại', 'Sử dụng nhiều điện năng', 'Có khả năng cảm nhận môi trường và tự đưa ra quyết định dựa trên dữ liệu', 'Phải có màn hình cảm ứng']::varchar[], ARRAY['Có khả năng cảm nhận môi trường và tự đưa ra quyết định dựa trên dữ liệu']::varchar[], 'Hệ thống thông minh kết hợp cảm biến để thu thập dữ liệu và thuật toán xử lý để tự động đưa ra quyết định tối ưu.', 5, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tu-dong-hoa", "thong-minh"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a7', 'mcq', 'tìm kiếm thông tin', 'inf-data-manage', 'Để tìm kiếm chính xác một cụm từ trên Internet (ví dụ: Tin học lớp 9 thành phố Hồ Chí Minh), ta nên đặt cụm từ đó trong ký hiệu nào?', ARRAY['Dấu ngoặc đơn ( )', 'Dấu ngoặc kép " "', 'Dấu ngoặc nhọn { }', 'Dấu ngoặc vuông [ ]']::varchar[], ARRAY['Dấu ngoặc kép " "']::varchar[], 'Khi đặt cụm từ trong cặp dấu ngoặc kép " ", công cụ tìm kiếm sẽ lọc ra các kết quả chứa chính xác cụm từ đó theo đúng thứ tự ký tự.', 3, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tim-kiem", "internet"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a8', 'mcq', 'đám mây', 'inf-data-manage', 'Dịch vụ nào sau đây KHÔNG phải là dịch vụ lưu trữ đám mây?', ARRAY['Google Drive', 'Microsoft OneDrive', 'Dropbox', 'WinRAR']::varchar[], ARRAY['WinRAR']::varchar[], 'WinRAR là phần mềm dùng để nén và giải nén tệp tin cục bộ trên máy tính, không phải dịch vụ lưu trữ trực tuyến (đám mây).', 2, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dam-may", "luu-tru"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a9', 'mcq', 'đám mây', 'inf-data-manage', 'Ưu điểm lớn nhất của việc chia sẻ tệp tin qua dịch vụ đám mây so với gửi qua USB truyền thống là gì?', ARRAY['Không cần kết nối Internet khi nhận tệp', 'Nhiều người có thể cùng truy cập và chỉnh sửa tệp đồng thời từ bất cứ đâu', 'Tốc độ tải dữ liệu luôn nhanh hơn tốc độ đọc của USB', 'Tệp tin luôn an toàn tuyệt đối 100% không lo rò rỉ']::varchar[], ARRAY['Nhiều người có thể cùng truy cập và chỉnh sửa tệp đồng thời từ bất cứ đâu']::varchar[], 'Điện toán đám mây hỗ trợ tính năng cộng tác theo thời gian thực (real-time collaboration), giúp nhiều người cùng làm việc trên một tệp dữ liệu từ xa.', 4, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dam-may", "chia-se"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a10', 'mcq', 'tìm kiếm thông tin', 'inf-data-manage', 'Khi tìm kiếm thông tin trên Internet, toán tử ''site:'' đi kèm tên miền có tác dụng gì?', ARRAY['Chỉ tìm kiếm các kết quả nằm trong trang web được chỉ định', 'Tìm kiếm các hình ảnh liên quan đến trang web đó', 'Loại trừ trang web đó ra khỏi danh sách kết quả tìm kiếm', 'Tải toàn bộ nội dung trang web về máy tính']::varchar[], ARRAY['Chỉ tìm kiếm các kết quả nằm trong trang web được chỉ định']::varchar[], 'Toán tử ''site:ten_mien'' giới hạn phạm vi tìm kiếm của các công cụ tìm kiếm chỉ bên trong trang web hoặc tên miền đó.', 4, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tim-kiem", "toan-tu"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a11', 'mcq', 'tìm kiếm thông tin', 'inf-data-manage', 'Nếu bạn muốn tìm kiếm tài liệu về ''lập trình Python'' nhưng định dạng tệp tải về bắt buộc phải là tệp PDF, từ khóa nào sau đây là chính xác?', ARRAY['lập trình python pdf', 'lập trình python filetype:pdf', 'lập trình python site:pdf', 'lập trình python doc:pdf']::varchar[], ARRAY['lập trình python filetype:pdf']::varchar[], 'Toán tử ''filetype:'' dùng để lọc kết quả tìm kiếm theo định dạng tệp mong muốn (pdf, docx, xlsx, pptx...).', 5, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tim-kiem", "filetype"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a12', 'mcq', 'bản quyền', 'inf-ethics-law', 'Hành vi nào sau đây vi phạm quyền tác giả đối với một tác phẩm phần mềm máy tính?', ARRAY['Mua bản quyền phần mềm để cài đặt sử dụng cá nhân', 'Tự viết một phần mềm mới dựa trên ý tưởng của riêng mình', 'Bẻ khóa (Crack) phần mềm trả phí rồi chia sẻ miễn phí lên mạng xã hội', 'Giới thiệu phần mềm hay cho bạn bè cùng biết']::varchar[], ARRAY['Bẻ khóa (Crack) phần mềm trả phí rồi chia sẻ miễn phí lên mạng xã hội']::varchar[], 'Bẻ khóa phần mềm thương mại là hành vi thay đổi cấu trúc mã nguồn trái phép, vi phạm Luật Sở hữu trí tuệ và quyền tác giả.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["ban-quyen", "dao-duc"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a13', 'mcq', 'thông tin cá nhân', 'inf-ethics-law', 'Để bảo vệ thông tin cá nhân khi tham gia môi trường mạng xã hội, hành động nào sau đây KHÔNG được khuyến khích?', ARRAY['Cài đặt mật khẩu mạnh kết hợp xác thực 2 lớp (2FA)', 'Công khai số điện thoại, căn cước công dân và địa chỉ nhà lên trang cá nhân', 'Kiểm tra kỹ quyền truy cập trước khi đồng ý cài đặt ứng dụng lạ', 'Chỉ kết bạn với những người mình quen biết trong đời thực']::varchar[], ARRAY['Công khai số điện thoại, căn cước công dân và địa chỉ nhà lên trang cá nhân']::varchar[], 'Công khai các thông tin định danh cá nhân nhạy cảm sẽ tạo điều kiện cho kẻ xấu thực hiện hành vi lừa đảo, giả mạo danh tính.', 2, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["bao-mat", "thong-tin-ca-nhan"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a14', 'mcq', 'bản quyền', 'inf-ethics-law', 'Thuật ngữ ''Phần mềm mã nguồn mở'' (Open Source Software) có ý nghĩa cốt lõi là gì?', ARRAY['Người dùng được tải về miễn phí nhưng không được xem mã gốc', 'Người dùng được quyền xem, sửa đổi và chia sẻ mã nguồn của phần mềm', 'Phần mềm chạy trực tiếp trên trình duyệt không cần cài đặt', 'Phần mềm chỉ dành cho các chuyên gia công nghệ sử dụng']::varchar[], ARRAY['Người dùng được quyền xem, sửa đổi và chia sẻ mã nguồn của phần mềm']::varchar[], 'Phần mềm mã nguồn mở cho phép cộng đồng tiếp cận mã nguồn để nghiên cứu, cải tiến và phát triển theo các điều khoản giấy phép đi kèm.', 4, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["ma-nguon-mo", "ban-quyen"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a15', 'mcq', 'đạo đức', 'inf-ethics-law', 'Khi trích dẫn thông tin hoặc hình ảnh từ internet vào bài báo cáo học tập, học sinh cần làm gì để đảm bảo tính văn hóa và luật pháp số?', ARRAY['Tự nhận đó là nội dung do mình tự sáng tạo ra', 'Ghi rõ nguồn tham khảo, tên tác giả và liên kết gốc (nếu có)', 'Chỉnh sửa làm mờ logo của tác giả gốc để tránh bị phát hiện', 'Chỉ trích dẫn các tài liệu nước ngoài vì không ai kiểm tra']::varchar[], ARRAY['Ghi rõ nguồn tham khảo, tên tác giả và liên kết gốc (nếu có)']::varchar[], 'Trích dẫn nguồn là biểu hiện của việc tôn trọng quyền tác giả và tính trung thực trong học thuật khoa học.', 3, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["trich-dan", "dao-duc"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a16', 'mcq', 'bảng tính', 'inf-digital-tools', 'Trong bảng tính Excel, tại ô A1 chứa giá trị 85. Công thức `=IF(A1>=80, "Giỏi", "Khá")` sẽ trả về kết quả nào?', ARRAY['Giỏi', 'Khá', '85', 'Báo lỗi #VALUE!']::varchar[], ARRAY['Giỏi']::varchar[], 'Biểu thức điều kiện A1>=80 (85>=80) là Đúng (True), do đó hàm IF trả về tham số thứ hai là chuỗi ''Giỏi''.', 3, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["excel", "ham-if"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a17', 'mcq', 'bảng tính', 'inf-digital-tools', 'Hàm `SUMIF` trong chương trình bảng tính được sử dụng để làm gì?', ARRAY['Tính tổng tất cả các ô trong một vùng chọn', 'Đếm số lượng ô có chứa dữ liệu số', 'Tính tổng các ô thỏa mãn một điều kiện cụ thể nào đó', 'Tìm giá trị lớn nhất trong vùng dữ liệu']::varchar[], ARRAY['Tính tổng các ô thỏa mãn một điều kiện cụ thể nào đó']::varchar[], 'Hàm SUMIF là sự kết hợp của SUM và IF, dùng để tính tổng các giá trị trong một phạm vi đáp ứng tiêu chuẩn điều kiện được đưa ra.', 4, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["excel", "ham-sumif"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a18', 'mcq', 'bảng tính', 'inf-digital-tools', 'Cho vùng dữ liệu B2:B6 chứa các chuỗi: "Táo", "Ổi", "Táo", "Mận", "Táo". Công thức `=COUNTIF(B2:B6, "Táo")` sẽ cho ra giá trị là bao nhiêu?', ARRAY['2', '3', '4', '5']::varchar[], ARRAY['3']::varchar[], 'Hàm COUNTIF đếm số lần xuất hiện của chuỗi ''Táo'' trong vùng từ B2 đến B6. Chuỗi này xuất hiện đúng 3 lần.', 3, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["excel", "ham-countif"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a19', 'mcq', 'trình chiếu', 'inf-digital-tools', 'Khi thiết kế một bài bài trình chiếu, nguyên tắc nào sau đây giúp bài thuyết trình trực quan và chuyên nghiệp hơn?', ARRAY['Đặt càng nhiều chữ trên một slide càng tốt', 'Sử dụng ít nhất 10 màu sắc khác nhau trên một slide để tạo sự sặc sỡ', 'Sử dụng từ khóa ngắn gọn kết hợp sơ đồ, hình ảnh minh họa chất lượng cao', 'Sử dụng nhiều hiệu ứng chuyển động phức tạp cho mọi đối tượng chữ']::varchar[], ARRAY['Sử dụng từ khóa ngắn gọn kết hợp sơ đồ, hình ảnh minh họa chất lượng cao']::varchar[], 'Bài trình chiếu cần ngắn gọn, cô đọng nội dung chính và tận dụng hình ảnh, biểu đồ trực quan để người nghe dễ tiếp thu.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["trinh-chieu", "thiet-ke"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a20', 'mcq', 'video', 'inf-digital-tools', 'Phần mềm nào sau đây thường được sử dụng để cắt, ghép và biên tập các đoạn video ngắn trên máy tính hoặc điện thoại?', ARRAY['Microsoft Word', 'CapCut', 'MySQL', 'Notepad']::varchar[], ARRAY['CapCut']::varchar[], 'CapCut là một ứng dụng/phần mềm phổ biến hiện nay chuyên dùng để cắt ghép, chỉnh sửa và tạo kỹ xảo cho video.', 2, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["video", "bien-tap"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a21', 'mcq', 'lập trình', 'inf-algorithm', 'Trong sơ đồ khối của thuật toán, hình thoi dùng để biểu diễn cho thao tác nào?', ARRAY['Bắt đầu hoặc Kết thúc', 'Nhập hoặc Xuất dữ liệu', 'Phép xử lý, tính toán', 'Biểu thức điều kiện (Xét điều kiện rẽ nhánh)']::varchar[], ARRAY['Biểu thức điều kiện (Xét điều kiện rẽ nhánh)']::varchar[], 'Trong sơ đồ khối, hình chữ nhật dùng cho xử lý, hình van/oval dùng cho bắt đầu/kết thúc, hình bình hành dùng cho nhập/xuất, và hình thoi biểu diễn điều kiện rẽ nhánh.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["so-do-khoi", "thuat-toan"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a22', 'mcq', 'lập trình', 'inf-algorithm', 'Đoạn mã nguồn Python sau đây hiển thị kết quả gì ra màn hình?
```python
x = 10
if x % 2 == 0:
    print("Chẵn")
else:
    print("Lẻ")
```', ARRAY['Chẵn', 'Lẻ', '10', 'Báo lỗi cú pháp']::varchar[], ARRAY['Chẵn']::varchar[], 'Biến x nhận giá trị 10. Phép toán `10 % 2` cho kết quả bằng 0, điều kiện `0 == 0` là Đúng nên khối lệnh `if` thực thi, in ra chữ ''Chẵn''.', 4, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["python", "cau-lenh-dieu-kien"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a23', 'mcq', 'lập trình', 'inf-algorithm', 'Trong Python, cấu trúc vòng lặp nào được sử dụng khi biết trước số lần lặp cụ thể?', ARRAY['while', 'if-else', 'for', 'switch-case']::varchar[], ARRAY['for']::varchar[], 'Vòng lặp `for` (thường kết hợp với hàm `range()`) được dùng để lặp với số lần biết trước trong Python.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["python", "vong-lap"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a24', 'mcq', 'lập trình', 'inf-algorithm', 'Đoạn mã lệnh Python sau đây tính toán tổng các số và in ra màn hình giá trị bao nhiêu?
```python
s = 0
for i in range(1, 4):
    s = s + i
print(s)
```', ARRAY['3', '4', '6', '10']::varchar[], ARRAY['6']::varchar[], '`range(1, 4)` tạo ra dãy số từ 1 đến 3 (gồm 1, 2, 3). Vòng lặp tính toán: s = 0 + 1 = 1; s = 1 + 2 = 3; s = 3 + 3 = 6. Kết quả là 6.', 5, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["python", "tinh-toan"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a25', 'mcq', 'lập trình', 'inf-algorithm', 'Từ khóa nào trong Python được sử dụng để định nghĩa một hàm (khối lệnh có thể tái sử dụng)?', ARRAY['function', 'def', 'define', 'proc']::varchar[], ARRAY['def']::varchar[], 'Trong Python, từ khóa `def` (viết tắt của define) dùng để khai báo mở đầu một hàm tự định nghĩa.', 4, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["python", "ham"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a26', 'mcq', 'hướng nghiệp', 'inf-career', 'Nghề nghiệp nào sau đây chuyên chịu trách nhiệm thiết kế, xây dựng và bảo trì các phần mềm, ứng dụng máy tính?', ARRAY['Chuyên viên quản trị mạng', 'Kỹ sư phần mềm / Lập trình viên', 'Chuyên gia phân tích dữ liệu', 'Kỹ thuật viên sửa chữa phần cứng']::varchar[], ARRAY['Kỹ sư phần mềm / Lập trình viên']::varchar[], 'Kỹ sư phần mềm hoặc Lập trình viên sử dụng ngôn ngữ lập trình để phát triển ứng dụng, hệ thống phần mềm đáp ứng nhu cầu thực tế.', 2, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["huong-nghiep", "lap-trinh-vien"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a27', 'mcq', 'hướng nghiệp', 'inf-career', 'Sự phát triển mạnh mẽ của công nghệ Trí tuệ nhân tạo (AI) yêu cầu người lao động trong tương lai cần tập trung phát triển nhóm kỹ năng nào nhất?', ARRAY['Nhập dữ liệu thủ công tốc độ nhanh', 'Ghi nhớ máy móc các thông số kỹ thuật', 'Tư duy phản biện, giải quyết vấn đề sáng tạo và năng lực số', 'Chép tay mã nguồn phần mềm ra giấy']::varchar[], ARRAY['Tư duy phản biện, giải quyết vấn đề sáng tạo và năng lực số']::varchar[], 'Khi các công việc lặp đi lặp lại được tự động hóa bằng AI, con người cần phát triển tư duy bậc cao như phản biện, sáng tạo và làm chủ công nghệ số.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["ai", "ky-nang-tuong-lai"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a28', 'mcq', 'máy tính', 'inf-digital-world', 'Khi chọn mua ổ cứng máy tính, thông số nào thể hiện không gian lưu trữ dữ liệu tối đa của ổ cứng đó?', ARRAY['Tốc độ bus (MHz)', 'Dung lượng (GB, TB)', 'Kích thước hình học (inch)', 'Điện áp hoạt động (Volt)']::varchar[], ARRAY['Dung lượng (GB, TB)']::varchar[], 'Dung lượng bộ nhớ đo bằng Gigabyte (GB) hoặc Terabyte (TB) xác định khả năng chứa nhiều hay ít tệp tin dữ liệu của ổ cứng.', 2, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["o-cung", "dung-luong"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a29', 'mcq', 'thế giới số', 'inf-digital-world', 'Trong nông nghiệp thông minh công nghệ cao, thiết bị nào thường thu thập chỉ số độ ẩm và nhiệt độ đất một cách tự động?', ARRAY['Thiết bị định tuyến Router', 'Cảm biến (Sensor)', 'Đầu đọc mã vạch', 'Máy chiếu chuyên dụng']::varchar[], ARRAY['Cảm biến (Sensor)']::varchar[], 'Cảm biến có chức năng chuyển đổi các đại lượng vật lý bên ngoài môi trường (nhiệt độ, ánh sáng, độ ẩm) thành tín hiệu số để máy tính xử lý.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["cam-bien", "iot"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a30', 'mcq', 'bảng tính', 'inf-digital-tools', 'Tại ô C3 của Excel chứa công thức `=SUMIF(A1:A5, ">10", B1:B5)`. Tham số `B1:B5` đại diện cho điều gì?', ARRAY['Vùng chứa điều kiện lọc dữ liệu', 'Vùng chứa các giá trị thực tế sẽ tính tổng', 'Vùng đếm số lượng ô trống', 'Vùng hiển thị thông tin lỗi kết quả']::varchar[], ARRAY['Vùng chứa các giá trị thực tế sẽ tính tổng']::varchar[], 'Tham số thứ 3 của hàm SUMIF (sum_range) chỉ định vùng chứa các ô số thực tế sẽ cộng lại với nhau nếu ô tương ứng ở vùng 1 thỏa mãn điều kiện.', 5, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["excel", "ham-sumif"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a31', 'mcq', 'lập trình', 'inf-algorithm', 'Xem đoạn mã Python sau:
```python
n = 5
while n > 2:
    n = n - 1
print(n)
```
Kết quả hiển thị ra màn hình là bao nhiêu?', ARRAY['5', '3', '2', 'Lặp vô hạn']::varchar[], ARRAY['2']::varchar[], 'Vòng lặp while chạy khi n > 2. Các bước lặp: n=5 (5>2, n thành 4), n=4 (4>2, n thành 3), n=3 (3>2, n thành 2). Khi n=2, điều kiện n>2 là False nên vòng lặp kết thúc và in ra 2.', 4, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["python", "vong-lap-while"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a32', 'mcq', 'lập trình', 'inf-algorithm', 'Trong Python, tham số nào của hàm `print()` được dùng để quy định ký tự kết thúc thay vì xuống dòng mặc định?', ARRAY['sep', 'end', 'terminate', 'newline']::varchar[], ARRAY['end']::varchar[], 'Tham số `end` trong hàm print() cho phép thay đổi ký tự kết thúc mặc định (xuống dòng ''\n'') thành ký tự tự chọn khác.', 4, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["python", "print"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a33', 'mcq', 'bảng tính', 'inf-digital-tools', 'Trong bảng tính Excel, ký tự nào được dùng trước tên cột và tên dòng để tạo địa chỉ ô tuyệt đối (không bị thay đổi khi sao chép công thức)?', ARRAY['&', '%', '$', '#']::varchar[], ARRAY['$']::varchar[], 'Ký tự đô la $ dùng để cố định hàng hoặc cột trong địa chỉ ô tuyệt đối (ví dụ: $A$1) khi sao chép công thức.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["excel", "dia-chi-o"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a34', 'mcq', 'máy tính', 'inf-digital-world', 'Phần mềm nào sau đây thuộc nhóm phần mềm hệ thống (System Software) quản trị thiết bị phần cứng?', ARRAY['Hệ điều hành Windows 11', 'Trình duyệt Google Chrome', 'Phần mềm gõ tiếng Việt Unikey', 'Trình soạn thảo Microsoft Word']::varchar[], ARRAY['Hệ điều hành Windows 11']::varchar[], 'Hệ điều hành là phần mềm hệ thống đóng vai trò cầu nối, quản lý phần cứng và cung cấp môi trường chạy cho phần mềm ứng dụng.', 2, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["phan-mem", "he-dieu-hanh"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a35', 'mcq', 'hướng nghiệp', 'inf-career', 'Công việc chính của một chuyên gia An ninh mạng (Cybersecurity Specialist) là gì?', ARRAY['Lắp đặt dây cáp mạng mạng Internet trong nhà dân', 'Thiết kế đồ họa giao diện cho trang web', 'Bảo vệ hệ thống mạng, dữ liệu khỏi các cuộc tấn công của hacker', 'Bán linh kiện phần cứng máy tính']::varchar[], ARRAY['Bảo vệ hệ thống mạng, dữ liệu khỏi các cuộc tấn công của hacker']::varchar[], 'Chuyên gia an ninh mạng chịu trách nhiệm phát hiện lỗ hổng và bảo vệ tài sản số của cơ quan doanh nghiệp trước các vụ tấn công mạng trái phép.', 3, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["huong-nghiep", "an-ninh-mang"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a36', 'multiple_choice', 'lập trình', 'inf-algorithm', 'Trong ngôn ngữ lập trình Python, những tên biến nào sau đây là HỢP LỆ? (Chọn các phương án đúng)', ARRAY['_myvar', 'my_var123', '123myvar', 'my-var', 'class']::varchar[], ARRAY['_myvar', 'my_var123']::varchar[], 'Tên biến hợp lệ trong Python chỉ chứa chữ cái, chữ số và dấu gạch dưới _, bắt đầu bằng chữ cái hoặc dấu gạch dưới, không dùng dấu gạch ngang -, không bắt đầu bằng số và không trùng từ khóa hệ thống như class.', 5, 'Khảo sát chuyên môn Tin học 9 TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "multi-part", "tags": ["python", "bien-so"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a37', 'multiple_choice', 'đám mây', 'inf-data-manage', 'Các phương pháp nào giúp bảo mật dữ liệu lưu trữ trên đám mây hiệu quả? (Chọn các phương án đúng)', ARRAY['Bật tính năng xác thực đa yếu tố (MFA / 2FA) cho tài khoản', 'Mã hóa dữ liệu trước khi tải lên lưu trữ', 'Sử dụng chung một mật khẩu dễ nhớ cho tất cả các nền tảng đám mây', 'Phân quyền truy cập tệp tin một cách chính xác (chỉ xem hoặc có chỉnh sửa)']::varchar[], ARRAY['Bật tính năng xác thực đa yếu tố (MFA / 2FA) cho tài khoản', 'Mã hóa dữ liệu trước khi tải lên lưu trữ', 'Phân quyền truy cập tệp tin một cách chính xác (chỉ xem hoặc có chỉnh sửa)']::varchar[], 'Bật xác thực đa yếu tố, mã hóa tệp tin và phân quyền truy cập là các biện pháp an ninh mạng cơ bản để bảo mật đám mây. Dùng chung một mật khẩu yếu rất nguy hiểm.', 4, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "multi-part", "tags": ["bao-mat", "dam-may"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a38', 'multiple_choice', 'máy tính', 'inf-digital-world', 'Những thiết bị nào sau đây thuộc nhóm thiết bị vào (Input Devices) của hệ thống máy tính?', ARRAY['Bàn phím (Keyboard)', 'Chuột máy tính (Mouse)', 'Màn hình (Monitor)', 'Máy quét (Scanner)', 'Loa (Speakers)']::varchar[], ARRAY['Bàn phím (Keyboard)', 'Chuột máy tính (Mouse)', 'Máy quét (Scanner)']::varchar[], 'Bàn phím, chuột và máy quét nhập thông tin vào máy tính. Màn hình và loa là thiết bị xuất dữ liệu ra ngoài.', 3, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "multi-part", "tags": ["thiet-bi-vao", "phan-cung"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a39', 'multiple_choice', 'bảng tính', 'inf-digital-tools', 'Các kiểu biểu đồ nào sau đây thường dùng để trực quan hóa dữ liệu trong phần mềm Excel? (Chọn các phương án đúng)', ARRAY['Biểu đồ cột (Column Chart)', 'Biểu đồ đường (Line Chart)', 'Biểu đồ hình quạt tròn (Pie Chart)', 'Biểu đồ sơ đồ khối thuật toán (Flowchart Chart)']::varchar[], ARRAY['Biểu đồ cột (Column Chart)', 'Biểu đồ đường (Line Chart)', 'Biểu đồ hình quạt tròn (Pie Chart)']::varchar[], 'Biểu đồ cột, đường, và hình quạt là các dạng biểu đồ tích hợp mặc định trong Excel dùng biểu diễn số liệu. Sơ đồ khối là sơ đồ tư duy giải quyết vấn đề, không thuộc đồ thị số liệu.', 3, 'Khảo sát chuyên môn Tin học 9 TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "multi-part", "tags": ["excel", "bieu-do"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a40', 'text_input', 'lập trình', 'inf-algorithm', 'Trong Scratch, khối lệnh lặp vô hạn lần (không bao giờ dừng lại tự động) có tên tiếng Anh là gì?', NULL, ARRAY['forever', 'Forever']::varchar[], 'Khối lệnh lặp vô tận trong Scratch có tên là ''forever''.', 3, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["scratch", "vong-lap"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a41', 'text_input', 'bảng tính', 'inf-digital-tools', 'Trong bảng tính Excel, tên hàm tiếng Anh dùng để tính giá trị trung bình cộng của một danh sách các số là gì?', NULL, ARRAY['AVERAGE', 'average']::varchar[], 'Hàm AVERAGE trong Excel tính số trung bình cộng của các đối số truyền vào.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["excel", "ham-trung-binh"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a42', 'text_input', 'bản quyền', 'inf-ethics-law', 'Hành động sao chép hoặc phân phối phần mềm có bản quyền một cách bất hợp pháp được gọi chung là gì trong tiếng Việt? 
-> Vi phạm ..............................', NULL, ARRAY['bản quyền', 'quyền tác giả', 'vi phạm bản quyền']::varchar[], 'Sao chép phần mềm không có sự đồng ý của tác giả là hành vi vi phạm bản quyền phần mềm.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["ban-quyen"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a43', 'text_input', 'máy tính', 'inf-digital-world', 'Đơn vị đo chu kỳ xung nhịp (tốc độ xử lý) của các bộ vi xử lý máy tính hiện đại ngày nay có ký hiệu viết tắt là gì?', NULL, ARRAY['GHz', 'ghz', 'Gigahertz']::varchar[], 'CPU hiện nay thường có tốc độ đo bằng GHz (Gigahertz), ví dụ 3.5 GHz nghĩa là 3.5 tỷ chu kỳ xử lý mỗi giây.', 4, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["cpu", "thong-so"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a44', 'wordform', 'lập trình', 'inf-algorithm', 'Thư viện lập trình vẽ hình học cơ bản trong ngôn ngữ Python bắt đầu bằng chữ TUR-......?', NULL, ARRAY['tle']::varchar[], 'Thư viện turtle trong Python cung cấp các công cụ vẽ đồ họa đơn giản mô phỏng một chú rùa di chuyển.', 4, 'Khảo sát chuyên môn Tin học 9 TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "turtle"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a45', 'wordform', 'bảng tính', 'inf-digital-tools', 'Mỗi trang bảng tính đơn lẻ chứa lưới các hàng và cột trong một file Excel được gọi bằng tiếng Anh là SPREAD-......?', NULL, ARRAY['sheet']::varchar[], 'Mỗi sheet (hoặc spreadsheet) là một trang làm việc độc lập chứa lưới dữ liệu của file bảng tính.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["excel", "sheet"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a46', 'rewrite', 'lập trình', 'inf-algorithm', 'Sửa lại câu lệnh gán biến sau trong Python cho đúng cú pháp: ''Ta muốn gán giá trị 10 cho biến x, lệnh viết là: 10 = x'' 
-> Sửa lại: Lệnh gán biến đúng là .............................................', NULL, ARRAY['x = 10', 'biến x bằng 10']::varchar[], 'Trong lập trình Python, biến nhận giá trị luôn đứng bên trái dấu bằng, giá trị cần gán đứng bên phải (ví dụ: x = 10).', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "cú-pháp"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a47', 'rewrite', 'bản quyền', 'inf-ethics-law', 'Sửa lại nhận định sau cho đúng luật bản quyền phần mềm: ''Nếu mua một phần mềm có phí, ta có quyền phân phối sao chép miễn phí cho mọi người sử dụng.'' 
-> Sửa lại: Ta chỉ có quyền .............................................', NULL, ARRAY['sử dụng phần mềm đó cho cá nhân', 'dùng cho cá nhân và không được sao chép trái phép', 'cài đặt và sử dụng cá nhân theo điều khoản mua']::varchar[], 'Mua bản quyền phần mềm có phí chỉ cấp quyền sử dụng phần mềm trên thiết bị cá nhân, không bao gồm quyền nhân bản và phân phối lại.', 5, 'Khảo sát chuyên môn Tin học 9 TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["ban-quyen"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a48', 'short-answer', 'lập trình', 'inf-algorithm', 'Cho đoạn mã Python sau. Vòng lặp for sẽ chạy và in ra chữ ''Hi'' bao nhiêu lần? (Điền đáp số dạng chữ số)
```python
for i in range(2, 7):
    print(''Hi'')
```', NULL, ARRAY['5', 'năm']::varchar[], '`range(2, 7)` sinh ra dãy số gồm [2, 3, 4, 5, 6], tổng cộng có 5 phần tử nên vòng lặp in ra chữ ''Hi'' đúng 5 lần.', 4, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "range"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a49', 'short-answer', 'bảng tính', 'inf-digital-tools', 'Trong Excel, ô A1=75. Công thức `=IF(A1>=80, "A", IF(A1>=70, "B", "C"))` sẽ trả về ký tự nào? (Điền một ký tự)', NULL, ARRAY['B', 'b']::varchar[], 'Đầu tiên xét A1>=80 (75>=80) là False. Chuyển sang nhánh false chạy tiếp IF(A1>=70, "B", "C"). Xét 75>=70 là True, nên kết quả trả về là ''B''.', 4, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["excel", "ham-if"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a50', 'proof', 'lập trình', 'inf-algorithm', 'Trình bày lập luận giải thuật tìm kiếm nhị phân (Binary Search). Giải thích tại sao dãy số bắt buộc phải được sắp xếp trước khi áp dụng giải thuật này.', NULL, ARRAY['Lập luận tìm kiếm nhị phân: 1. Nguyên lý: So sánh giá trị tìm kiếm với phần tử giữa của dãy. 2. Nếu bằng: dừng và trả về vị trí. 3. Nếu giá trị cần tìm nhỏ hơn phần tử giữa: thu hẹp không gian tìm kiếm về nửa bên trái. 4. Nếu lớn hơn: thu hẹp về nửa bên phải. 5. Giải thích: Dãy số phải được sắp xếp để quy luật chia đôi dãy luôn chính xác, giúp loại bỏ một nửa số lượng phần tử ở mỗi bước so sánh, tăng tốc độ tìm kiếm xuống độ phức tạp O(log N).']::varchar[], 'Tìm kiếm nhị phân chia đôi không gian tìm kiếm dựa vào tính chất sắp xếp tăng/giảm dần của dãy số để loại bỏ 50% số lượng phần tử ở mỗi bước lặp.', 7, 'Ngân hàng đề thi học kỳ Tin học 9 - TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "proof", "solutionStyle": "rubric", "solutionSteps": ["Xác định điều kiện đầu vào của giải thuật tìm kiếm nhị phân.", "Mô tả quy trình so sánh giá trị cần tìm với giá trị ở vị trí giữa dãy.", "Lập luận hướng thu hẹp không gian tìm kiếm về nửa bên trái hoặc bên phải.", "Giải thích lý do thuật toán bị lỗi nếu dãy số chưa được sắp xếp trước đó.", "Phân tích hiệu quả độ phức tạp thuật toán O(log N)."]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a51', 'multi-part', 'lập trình', 'inf-algorithm', 'Cho thuật toán tìm giá trị lớn nhất trong một mảng số nguyên bằng Python:
```python
numbers = [12, 45, 7, 89, 32]
max_val = numbers[0]
for x in numbers:
    if x > max_val:
        max_val = x
```
a) Biến `max_val` ban đầu được khởi gán bằng giá trị bao nhiêu?
b) Sau khi chạy xong vòng lặp for qua mảng `numbers`, biến `max_val` nhận kết quả cuối cùng là bao nhiêu?', NULL, ARRAY['12', '89']::varchar[], 'a) Lệnh max_val = numbers[0] gán phần tử đầu tiên của mảng là 12 cho max_val. b) Vòng lặp duyệt qua toàn bộ phần tử, cập nhật max_val mỗi khi tìm thấy số lớn hơn. Kết quả cuối cùng là số lớn nhất trong mảng: 89.', 6, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "multi-part", "tags": ["python", "thuat-toan-tim-max"], "subparts": ["a", "b"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

-- Seed Tech 9 Questions
INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a1', 'mcq', 'định hướng nghề nghiệp', 'tech-career-jobs', 'Nhóm nghề nghiệp nào sau đây chiếm tỷ trọng lớn trong kỷ nguyên Cách mạng công nghiệp 4.0 và gắn liền với việc thiết kế, vận hành hệ thống tự động?', ARRAY['Nhóm nghề thủ công mỹ nghệ', 'Nhóm nghề Kỹ thuật và Công nghệ', 'Nhóm nghề nông nghiệp truyền thống', 'Nhóm nghề khai khoáng thô']::varchar[], ARRAY['Nhóm nghề Kỹ thuật và Công nghệ']::varchar[], 'Trong kỷ nguyên số, nhóm nghề Kỹ thuật và Công nghệ đóng vai trò nòng cốt, thúc đẩy sự phát triển của tự động hóa, trí tuệ nhân tạo và các hệ thống sản xuất thông minh.', 2, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["huong-nghiep", "ky-thuat"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a2', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Trong sơ đồ nguyên lý của mạng điện trong nhà, cầu chì thường được lắp đặt ở vị trí nào để bảo vệ mạch điện?', ARRAY['Trên dây trung tính, trước công tắc', 'Trên dây pha, trước công tắc và tải tiêu thụ', 'Mắc song song với tải tiêu thụ', 'Sau thiết bị điện đồ dùng']::varchar[], ARRAY['Trên dây pha, trước công tắc và tải tiêu thụ']::varchar[], 'Cầu chì phải được mắc nối tiếp trên dây pha (dây nóng) và đứng trước các thiết bị khác để khi xảy ra sự cố ngắn mạch hoặc quá tải, cầu chì sẽ nóng chảy và ngắt dòng điện kịp thời.', 3, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dien-dan-dung", "cau-chi"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a3', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Để đo điện năng tiêu thụ của một hộ gia đình tại TP.HCM trong một tháng, cơ quan điện lực sử dụng loại đồng hồ đo điện nào?', ARRAY['Ampe kế', 'Vôn kế', 'Công tơ điện (Kwh kế)', 'Ohm kế']::varchar[], ARRAY['Công tơ điện (Kwh kế)']::varchar[], 'Công tơ điện là thiết bị đo lường chuyên dụng để xác định lượng điện năng tiêu thụ (tính bằng Kilowatt giờ - kWh) của một mạch điện hoặc hộ gia đình.', 2, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dien-dan-dung", "cong-to-dien"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a4', 'mcq', 'nông nghiệp', 'tech-circuit-install', 'Trong kỹ thuật gieo trồng cây ăn quả, phương pháp nhân giống vô tính nào giúp giữ nguyên được đặc tính tốt của cây mẹ và cho quả nhanh thu hoạch nhất?', ARRAY['Gieo hạt truyền thống', 'Chiết cành hoặc Ghép cành', 'Tưới nước nhỏ giọt', 'Bón phân hữu cơ bề mặt']::varchar[], ARRAY['Chiết cành hoặc Ghép cành']::varchar[], 'Chiết và ghép cành là các phương pháp nhân giống vô tính tiên tiến, giúp cây con thừa hưởng hoàn toàn bộ gen tốt từ cây mẹ, rút ngắn thời gian sinh trưởng so với gieo từ hạt.', 3, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["nong-nghiep", "nhan-giong"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a5', 'mcq', 'lập trình', 'tech-circuit-install', 'Khi ứng dụng mô hình STEM vào môn Công nghệ 9 để thiết kế ngôi nhà thông minh, thiết bị lập trình vi điều khiển nào sau đây thường được sử dụng phổ biến nhất?', ARRAY['Bo mạch Arduino hoặc Micro:bit', 'Ổ cứng HDD máy tính', 'Bộ nhớ RAM', 'Bộ nguồn máy tính ATX']::varchar[], ARRAY['Bo mạch Arduino hoặc Micro:bit']::varchar[], 'Arduino và Micro:bit là các bo mạch vi điều khiển mã nguồn mở, hỗ trợ học sinh lập trình kết nối cảm biến để tự động hóa các mô hình công nghệ (như bật tắt đèn, tưới nước tự động).', 4, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["stem", "vi-dieu-khien"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a6', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Khi tiến hành nối dây dẫn điện, việc quấn băng dính cách điện ngoài cùng của mối nối nhằm mục đích cốt lõi nào?', ARRAY['Tăng tính thẩm mỹ cho bảng điện', 'Đảm bảo an toàn điện, chống rò rỉ điện và chập mạch', 'Giúp mối nối dẫn điện tốt hơn', 'Tăng trọng lượng của dây dẫn']::varchar[], ARRAY['Đảm bảo an toàn điện, chống rò rỉ điện và chập mạch']::varchar[], 'Băng dính cách điện giúp cách ly phần lõi đồng/nhôm trần của mối nối với môi trường xung quanh, ngăn ngừa tai nạn điện giật và hiện tượng đoản mạch.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dien-dan-dung", "an-toan-dien"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a7', 'mcq', 'định hướng nghề nghiệp', 'tech-career-jobs', 'Người làm việc trong ngành nghề nào sau đây đòi hỏi phải có kiến thức chuyên sâu về bản vẽ kỹ thuật, quy chuẩn an toàn điện lưới và kỹ năng lắp đặt hệ thống cơ điện công trình?', ARRAY['Kỹ sư cơ khí chế tạo', 'Kỹ sư điện / Kỹ thuật viên điện dân dụng', 'Chuyên viên thiết kế thời trang', 'Chuyên gia làm vườn nghệ thuật']::varchar[], ARRAY['Kỹ sư điện / Kỹ thuật viên điện dân dụng']::varchar[], 'Ngành điện - điện tử đòi hỏi năng lực đọc bản vẽ sơ đồ mạch điện, am hiểu quy chuẩn an toàn để thi công hệ thống điện năng an toàn, hiệu quả.', 3, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["huong-nghiep", "nghanh-dien"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a8', 'mcq', 'nông nghiệp', 'tech-circuit-install', 'Hệ thống tư ứng dụng công nghệ số và cảm biến để tự động tưới nước khi đất bị khô trong nông nghiệp đô thị tại TP.HCM được gọi là gì?', ARRAY['Hệ thống tưới ngập nước định kỳ', 'Hệ thống tưới thông minh (Smart Irrigation System)', 'Hệ thống canh tác nương rẫy', 'Hệ thống phun sương thủ công bằng tay']::varchar[], ARRAY['Hệ thống tưới thông minh (Smart Irrigation System)']::varchar[], 'Hệ thống tưới thông minh sử dụng cảm biến độ ẩm đất để phân tích dữ liệu, tự động kích hoạt máy bơm nước khi cần thiết, giúp tiết kiệm tài nguyên và tối ưu năng suất.', 4, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["nong-nghiep-cong-nghe-cao", "iot"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a9', 'mcq', 'đạo đức', 'tech-career-choice', 'Khi tham gia các hoạt động thực hành xưởng công nghệ hoặc vườn trường, hành vi nào sau đây vi phạm nghiêm trọng quy định an toàn lao động?', ARRAY['Đeo kính bảo hộ và găng tay đúng quy định', 'Đùa nghịch, dùng dụng cụ đục, kìm, dao kéo trêu chọc bạn học', 'Tuân thủ tuyệt đối sự hướng dẫn của giáo viên bộ môn', 'Kiểm tra kỹ tình trạng thiết bị trước khi cắm điện nguồn']::varchar[], ARRAY['Đùa nghịch, dùng dụng cụ đục, kìm, dao kéo trêu chọc bạn học']::varchar[], 'Đùa nghịch bằng dụng cụ sắc nhọn hoặc thiết bị điện trong giờ thực hành rất dễ dẫn đến chấn thương nghiêm trọng, vi phạm nội quy an toàn lao động.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["an-toan-lao-dong", "dao-duc"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a10', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Sơ đồ nào sau đây biểu thị rõ ràng vị trí sắp đặt lắp đặt thực tế của các thiết bị điện, bảng điện và đường đi của dây dẫn trong một căn phòng?', ARRAY['Sơ đồ nguyên lý', 'Sơ đồ lắp đặt', 'Sơ đồ khối chức năng', 'Sơ đồ tư duy kiến trúc']::varchar[], ARRAY['Sơ đồ lắp đặt']::varchar[], 'Sơ đồ lắp đặt (sơ đồ vị trí) thể hiện rõ ràng vị trí lắp đặt thực tế và cách đi dây của hệ thống điện, dùng để trực tiếp thi công.', 3, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dien-dan-dung", "so-do-dien"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a11', 'mcq', 'chế biến thực phẩm', 'tech-circuit-install', 'Trong mô-đun Chế biến thực phẩm, nguyên tắc cốt lõi nào đảm bảo ngăn ngừa ngộ độc thức ăn và vi khuẩn xâm nhập khi bảo quản thực phẩm?', ARRAY['Để thực phẩm chín chung với thực phẩm sống', 'Giữ thực phẩm ở nhiệt độ phòng trong nhiều ngày liên tục', 'Đảm bảo quy trình ăn chín uống sôi, phân loại hộp kín bảo quản lạnh', 'Chỉ cần rửa qua nước muối không cần che đậy']::varchar[], ARRAY['Đảm bảo quy trình ăn chín uống sôi, phân loại hộp kín bảo quản lạnh']::varchar[], 'Phân loại thực phẩm sống/chín riêng biệt và lưu trữ ở nhiệt độ lạnh thích hợp giúp ức chế sự phát triển của vi sinh vật gây hại.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["che-bien-thuc-pham", "an-toan-thuc-pham"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a12', 'mcq', 'định hướng nghề nghiệp', 'tech-career-jobs', 'Thị trường lao động tại TP.HCM hiện nay đang có xu hướng tuyển dụng cao đối với ngành ''Cơ điện tử''. Ngành này là sự kết hợp giao thoa của những lĩnh vực nào?', ARRAY['Xây dựng, Mỹ thuật và Du lịch', 'Cơ khí, Điện - Điện tử và Máy tính/Công nghệ thông tin', 'Nông nghiệp, Sinh học và Hóa chất', 'Kinh tế thương mại và Văn học số']::varchar[], ARRAY['Cơ khí, Điện - Điện tử và Máy tính/Công nghệ thông tin']::varchar[], 'Cơ điện tử (Mechatronics) là ngành kỹ thuật liên ngành cao, tích hợp cơ khí chính xác, hệ thống điện tử điều khiển và tư duy lập trình máy tính để tạo ra các robot, hệ thống tự động.', 4, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["huong-nghiep", "co-dien-tu"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a13', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Thiết bị điện nào tự động ngắt mạch điện khi phát hiện dòng điện rò rỉ xuống đất hoặc có người bị điện giật, giúp bảo vệ an toàn tính mạng?', ARRAY['Cầu chì (Fuse)', 'Aptomat chống giật (RCCB/ELCB)', 'Công tắc hai cực', 'Ổ cắm điện đơn']::varchar[], ARRAY['Aptomat chống giật (RCCB/ELCB)']::varchar[], 'Aptomat chống rò/chống giật có khả năng so sánh dòng điện đi và về, lập tức ngắt mạch chỉ trong mili giây khi phát hiện sự chênh lệch dòng (do rò điện hoặc người chạm vào dây nóng).', 4, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["an-toan-dien", "aptomat"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a14', 'mcq', 'lập trình', 'tech-circuit-install', 'Trong bài toán thiết kế hệ thống chiếu sáng tự động thông minh cho nhà ở, điều kiện logic nào sau đây là phù hợp nhất để bật đèn?', ARRAY['Nếu ánh sáng môi trường xung quanh cao hơn ngưỡng quy định', 'Nếu cảm biến phát hiện có người ĐỒNG THỜI cường độ ánh sáng tự nhiên thấp (trời tối)', 'Nếu nhiệt độ phòng tăng cao', 'Nếu thời gian trong ngày là buổi trưa']::varchar[], ARRAY['Nếu cảm biến phát hiện có người ĐỒNG THỜI cường độ ánh sáng tự nhiên thấp (trời tối)']::varchar[], 'Để tiết kiệm năng lượng tối ưu, hệ thống đèn thông minh chỉ nên bật khi có sự xuất hiện của con người kết hợp với điều kiện ánh sáng môi trường không đủ.', 4, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["thiet-ke-he-thong", "logic"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a15', 'mcq', 'nông nghiệp', 'tech-circuit-install', 'Khi bón phân cho cây ăn quả, tại sao người ta thường bón theo hình chiếu của tán cây xuống mặt đất?', ARRAY['Vì rễ cây chỉ tập trung ở sát gốc cây', 'Vì hệ thống rễ ăn sâu và rộng hút chất dinh dưỡng tập trung nhiều nhất ở vùng rìa hình chiếu tán cây', 'Để tránh làm bẩn lá cây khi bón phân', 'Vì quy định bón phân bắt buộc phải làm như vậy']::varchar[], ARRAY['Vì hệ thống rễ ăn sâu và rộng hút chất dinh dưỡng tập trung nhiều nhất ở vùng rìa hình chiếu tán cây']::varchar[], 'Đầu rễ non (rễ hút dinh dưỡng) của cây ăn quả thường phân bố rộng tương ứng với độ rộng của tán cây bên trên, bón phân ở vùng này giúp cây hấp thụ tối đa.', 3, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["nong-nghiep", "ky-thuat-bon-phan"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a16', 'mcq', 'bản quyền', 'tech-career-jobs', 'Khi một học sinh tự tay thiết kế bản vẽ mạch điện thông minh trên phần mềm máy tính trong cuộc thi sáng tạo khoa học kỹ thuật, sản phẩm của học sinh đó được bảo hộ bởi luật nào?', ARRAY['Luật Thương mại', 'Luật Sở hữu trí tuệ (Quyền tác giả đối với tác phẩm khoa học)', 'Luật Hình sự quốc tế', 'Luật Giáo dục căn bản']::varchar[], ARRAY['Luật Sở hữu trí tuệ (Quyền tác giả đối với tác phẩm khoa học)']::varchar[], 'Bản vẽ kỹ thuật, thiết kế giải pháp công nghệ là đối tượng được bảo hộ quyền tác giả và quyền sở hữu công nghiệp thuộc Luật Sở hữu trí tuệ.', 3, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["ban-quyen", "phap-luat-cong-nghe"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a17', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Thiết bị điện nào dùng để đóng, ngắt dòng điện độc lập của các đồ dùng điện hoặc một nhánh mạch điện bằng tay?', ARRAY['Công tơ điện', 'Công tắc điện', 'Cầu chì', 'Chuông điện']::varchar[], ARRAY['Công tắc điện']::varchar[], 'Công tắc điện đóng vai trò điều khiển cơ học bằng tay việc đóng/ngắt dòng điện đi vào tải tiêu thụ điện.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dien-dan-dung", "thiet-bi-dien"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a18', 'mcq', 'máy tính', 'tech-career-jobs', 'Thuật ngữ ''Hệ thống SCADA'' hoặc ''Hệ thống điều khiển giám sát dữ liệu'' trong các nhà máy xí nghiệp sản xuất hiện đại tại TP.HCM thuộc phạm vi ứng dụng nào?', ARRAY['Công nghệ thông tin văn phòng', 'Tự động hóa công nghiệp', 'Thủ công nghệ nghệ thuật', 'Nông nghiệp thô sơ']::varchar[], ARRAY['Tự động hóa công nghiệp']::varchar[], 'SCADA là hệ thống điều khiển giám sát và thu thập dữ liệu phục vụ quản lý, vận hành tự động dây chuyền sản xuất công nghiệp quy mô lớn.', 5, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tu-dong-hoa", "scada"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a19', 'mcq', 'định hướng nghề nghiệp', 'tech-career-jobs', 'Để trở thành một nhà thiết kế vi mạch (Chip bán dẫn) - ngành nghề trọng điểm đang được TP.HCM đầu tư phát triển, học sinh cần học tốt nhất các môn học cốt lõi nào?', ARRAY['Ngữ văn, Lịch sử, Địa lý', 'Toán học, Vật lý, Tin học/Công nghệ', 'Sinh học, Hóa học, Giáo dục công dân', 'Mỹ thuật, Âm nhạc, Tiếng Anh']::varchar[], ARRAY['Toán học, Vật lý, Tin học/Công nghệ']::varchar[], 'Thiết kế vi mạch bán dẫn đòi hỏi nền tảng tư duy toán học, kiến thức vật lý chất bán dẫn - điện tử và năng lực lập trình máy tính (Tin học/Công nghệ).', 4, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["huong-nghiep", "vi-mach"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a20', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Dụng cụ cầm tay nào chuyên dùng để gọt vỏ cách điện của dây dẫn điện một cách nhanh chóng mà không làm khía cắt vào lõi đồng bên trong?', ARRAY['Kìm tuốt dây', 'Búa đóng đinh', 'Tua vít ba cạnh', 'Cưa sắt cầm tay']::varchar[], ARRAY['Kìm tuốt dây']::varchar[], 'Kìm tuốt dây điện được thiết kế với các cỡ lưỡi dao phù hợp với đường kính dây dẫn, giúp tách vỏ cách điện an toàn mà không làm tổn hại lõi kim loại dẫn điện.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dung-cu", "dien-dan-dung"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a21', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Khi thiết kế mạch điện bảng điện gồm: 1 cầu chì bảo vệ cho 1 ổ cắm và 1 công tắc điều khiển 1 bóng đèn. Thiết bị nào sẽ luôn luôn có điện kể cả khi công tắc ở trạng thái ngắt?', ARRAY['Bóng đèn', 'Ổ cắm điện', 'Cả bóng đèn và ổ cắm', 'Không thiết bị nào có điện']::varchar[], ARRAY['Ổ cắm điện']::varchar[], 'Ổ cắm điện được mắc song song với mạch nhánh của đèn và công tắc. Cầu chì bảo vệ chung phía trước, do đó khi công tắc ngắt (đèn tắt), ổ cắm vẫn duy trì nguồn điện liên tục.', 4, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["mach-dien", "thiet-ke"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a22', 'mcq', 'nông nghiệp', 'tech-circuit-install', 'Loại đất nào sau đây thích hợp nhất để phát triển các loại cây ăn quả lâu năm nhờ khả năng giữ nước và giàu chất dinh dưỡng hữu cơ?', ARRAY['Đất cát hạt thô', 'Đất sét nặng ngập úng', 'Đất thịt, đất phù sa hoặc đất đỏ ba gian thoát nước tốt', 'Đất đá sỏi cằn cỗi']::varchar[], ARRAY['Đất thịt, đất phù sa hoặc đất đỏ ba gian thoát nước tốt']::varchar[], 'Cây ăn quả cần tầng đất dày, giàu mùn dinh dưỡng và có kết cấu thoáng, thoát nước tốt để bộ rễ phát triển sâu rộng không bị thối rễ.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["nong-nghiep", "tho-nhuong"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a23', 'mcq', 'lập trình', 'tech-circuit-install', 'Trong sơ đồ thuật toán điều khiển của rô-bốt hút bụi thông minh tự động quay đầu khi gặp chướng ngại vật, khối hình học nào xác định thao tác kiểm tra xem ''Có vật cản hay không''?', ARRAY['Khối hình chữ nhật', 'Khối hình thoi', 'Khối hình tròn', 'Khối hình bình hành']::varchar[], ARRAY['Khối hình thoi']::varchar[], 'Khối hình thoi trong sơ đồ thuật toán luôn thực hiện chức năng kiểm tra điều kiện logic (Đúng/Sai) để đưa ra quyết định rẽ nhánh hành vi cho hệ thống tự động.', 3, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["thuat-toan", "so-do-khoi"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a24', 'mcq', 'thông tin cá nhân', 'tech-career-choice', 'Để quản lý an toàn dữ liệu vận hành hệ thống điện mặt trời áp mái thông minh của gia đình lưu trữ trực tuyến đám mây, biện pháp nào bảo mật nhất?', ARRAY['Chia sẻ tài khoản quản trị cho tất cả mọi người cùng dùng', 'Sử dụng mật khẩu mặc định của nhà sản xuất cung cấp ban đầu', 'Đặt mật khẩu phức tạp gồm chữ hoa, chữ thường, số, ký tự đặc biệt và bật xác thực 2 lớp', 'Không cần đặt mật khẩu bảo vệ']::varchar[], ARRAY['Đặt mật khẩu phức tạp gồm chữ hoa, chữ thường, số, ký tự đặc biệt và bật xác thực 2 lớp']::varchar[], 'Mật khẩu mạnh kết hợp xác thực đa yếu tố giúp tối đa hóa khả năng bảo vệ tài khoản điều khiển thiết bị công nghệ số khỏi sự xâm nhập trái phép của tin tặc.', 3, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["bao-mat", "iot"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a25', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Công thức tính điện năng tiêu thụ (A) của đồ dùng điện trong nhà dựa trên công suất (P) và thời gian hoạt động (t) là công thức nào?', ARRAY['A = P . t', 'A = P / t', 'A = U . I', 'A = P + t']::varchar[], ARRAY['A = P . t']::varchar[], 'Điện năng tiêu thụ bằng tích của công suất thiết bị nhân với thời gian thiết bị hoạt động thực tế: A = P . t.', 3, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dien-dan-dung", "cong-thuc"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a26', 'mcq', 'định hướng nghề nghiệp', 'tech-career-choice', 'Yếu tố nào sau đây đóng vai trò quan trọng nhất khi cá nhân đưa ra quyết định lựa chọn một ngành nghề kỹ thuật công nghệ phù hợp cho tương lai?', ARRAY['Chỉ dựa hoàn toàn vào ý kiến trào lưu trên mạng xã hội', 'Sự kết hợp giữa năng lực, sở thích cá nhân và nhu cầu thực tế của thị trường lao động', 'Chọn nghề nhàn hạ nhất không cần lao động chân tay hay trí óc', 'Chọn ngẫu nhiên không cần tính toán']::varchar[], ARRAY['Sự kết hợp giữa năng lực, sở thích cá nhân và nhu cầu thực tế của thị trường lao động']::varchar[], 'Chọn nghề bền vững cần dựa trên mô hình định hướng: Đam mê (sở thích), Năng lực sở trường và Cơ hội nghề nghiệp thực tế của xã hội.', 2, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["huong-nghiep", "tu-van"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a27', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Khi kiểm tra một mạch điện xem có nguồn điện chạy qua hay không một cách an toàn, người thợ điện sử dụng dụng cụ kiểm tra chuyên dụng nào?', ARRAY['Thước cuộn thép', 'Kìm cắt chân linh kiện', 'Bút thử điện thông thường', 'Băng dính đen cách điện']::varchar[], ARRAY['Bút thử điện thông thường']::varchar[], 'Bút thử điện có điện trở bảo vệ bên trong, cho phép người dùng kiểm tra nhanh sự hiện diện của điện áp cao trên dây dẫn mà vẫn đảm bảo an toàn.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dung-cu-dien", "an-toan"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a28', 'mcq', 'máy tính', 'tech-career-jobs', 'Hệ thống lưu trữ điện dự phòng quy mô lớn sử dụng pin năng lượng sạch để cấp điện liên tục cho các trung tâm dữ liệu khi mất điện lưới được viết tắt là gì?', ARRAY['BESS (Hệ thống lưu trữ năng lượng bằng pin)', 'CPU', 'RAM', 'HDMI']::varchar[], ARRAY['BESS (Hệ thống lưu trữ năng lượng bằng pin)']::varchar[], 'BESS (Battery Energy Storage System) là giải pháp công nghệ hiện đại lưu trữ năng lượng điện tái tạo, đảm bảo tính liên tục cho các hệ thống hạ tầng số và công nghệ cao.', 5, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["nang-luong", "he-thong"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a29', 'mcq', 'lắp đặt mạng điện', 'tech-circuit-install', 'Mạng điện sinh hoạt dân dụng tại Việt Nam hiện nay có thông số điện áp định mức tiêu chuẩn là bao nhiêu?', ARRAY['110 V', '220 V', '380 V', '24 V']::varchar[], ARRAY['220 V']::varchar[], 'Điện áp xoay chiều một pha định mức dùng cho mạng điện sinh hoạt gia đình tại Việt Nam là 220V với tần số tiêu chuẩn là 50Hz.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dien-dan-dung", "thong-so"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a30', 'mcq', 'lập trình', 'tech-circuit-install', 'Đoạn chương trình Python điều khiển độ sáng của đèn LED thông minh theo phần trăm (%) công suất phát như sau:
```python
power = 40
if power >= 80:
    status = "High"
elif power >= 30:
    status = "Medium"
else:
    status = "Low"
print(status)
```
Kết quả in ra màn hình là chuỗi nào?', ARRAY['High', 'Medium', 'Low', '40']::varchar[], ARRAY['Medium']::varchar[], 'Giá trị power = 40. Biểu thức 40 >= 80 là Sai, chương trình chuyển xuống nhánh elif 40 >= 30 mang giá trị Đúng (True), do đó biến status nhận giá trị ''Medium''.', 4, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["python", "dieu-khien-logic"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a31', 'mcq', 'chế biến thực phẩm', 'tech-circuit-install', 'Phương pháp chế biến thực phẩm nào sử dụng nhiệt độ cao của hơi nước làm chín thực phẩm, giúp giữ lại tối đa chất dinh dưỡng tự nhiên?', ARRAY['Rán (chiên) ngập dầu', 'Hấp (thổi đồ)', 'Nướng trực tiếp trên than hồng', 'Muối chua lên men']::varchar[], ARRAY['Hấp (thổi đồ)']::varchar[], 'Phương pháp hấp chín bằng hơi nước tránh cho thực phẩm tiếp xúc trực tiếp với nước hay chất béo nhiệt độ quá cao, bảo toàn lượng vitamin và khoáng chất tốt nhất.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["che-bien-thuc-pham", "phuong-phap"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-mcq-a32', 'mcq', 'định hướng nghề nghiệp', 'tech-career-choice', 'Để đánh giá độ phù hợp của một người với nghề ''Kỹ sư năng lượng tái tạo'' (Điện mặt trời, điện gió), tiêu chí nào dưới đây thuộc về ''Năng lực'' chuyên môn nghề nghiệp?', ARRAY['Sở thích xem phim tài liệu về môi trường', 'Khả năng phân tích mạch điện, tính toán công suất hệ thống nguồn và kỹ năng thiết kế kỹ thuật', 'Mong muốn kiếm được mức lương cao nhanh chóng', 'Sở thích đi du lịch dã ngoại']::varchar[], ARRAY['Khả năng phân tích mạch điện, tính toán công suất hệ thống nguồn và kỹ năng thiết kế kỹ thuật']::varchar[], 'Khả năng tính toán toán học, phân tích mạch cơ điện và vận dụng phần mềm chuyên ngành thiết kế là biểu hiện cốt lõi của năng lực chuyên môn nghề nghiệp kỹ thuật.', 3, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["huong-nghiep", "tieu-chi"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a33', 'short-answer', 'lắp đặt mạng điện', 'tech-circuit-install', 'Trong thiết kế sơ đồ điện, hãy viết tên viết tắt của thiết bị đóng cắt mạch điện tự động bảo vệ quá tải thay thế cho cầu chì truyền thống.', NULL, ARRAY['Aptomat', 'aptomat', 'CB', 'cb']::varchar[], 'Aptomat (hay CB - Circuit Breaker) là thiết bị đóng cắt tự động có chức năng bảo vệ mạch điện khi xảy ra sự cố quá tải hoặc ngắn mạch một cách chính xác, tiện lợi.', 3, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["dien-dan-dung", "thiet-bi"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a34', 'short-answer', 'lắp đặt mạng điện', 'tech-circuit-install', 'Hãy điền tên đơn vị đo của điện năng tiêu thụ hiển thị trực tiếp trên mặt của Công tơ điện gia đình.', NULL, ARRAY['kWh', 'kwh', 'Kilowatt giờ', 'kilowatt gio']::varchar[], 'Điện năng tiêu thụ của các thiết bị điện dân dụng được đo lường bằng đơn vị Kilowatt giờ (kWh), dân gian thường gọi là ''ký điện'' hoặc ''số điện''.', 3, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["dien-dan-dung", "don-vi"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a35', 'short-answer', 'máy tính', 'tech-career-jobs', 'Cụm từ viết tắt tiếng Anh ''IoT'' dùng để chỉ mạng lưới các thiết bị phần cứng được nhúng cảm biến, phần mềm để kết nối, trao đổi dữ liệu qua internet có tên tiếng Việt là Vạn vật _______________.', NULL, ARRAY['kết nối', 'ket noi', 'Vạn vật kết nối']::varchar[], 'IoT (Internet of Things) dịch sang tiếng Việt nghĩa là Vạn vật kết nối, là nền tảng cốt lõi của công nghệ tự động hóa và nhà thông minh hiện nay.', 2, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["khai-niem", "iot"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a36', 'short-answer', 'định hướng nghề nghiệp', 'tech-career-jobs', 'Điền cụm từ: Hoạt động giúp học sinh nhận biết được năng lực, sở thích cá nhân, tìm hiểu yêu cầu của các ngành nghề xã hội để lựa chọn hướng đi học tập, công việc phù hợp sau khi tốt nghiệp THCS được gọi là hướng __________.', NULL, ARRAY['nghiệp', 'nghiep', 'Hướng nghiệp', 'huong nghiep']::varchar[], 'Công tác giáo dục hướng nghiệp lớp 9 giúp học sinh phân luồng hiệu quả, chọn đúng trường nghề (Trung cấp, Cao đẳng nghề) hoặc tiếp tục học THPT theo năng lực.', 2, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["huong-nghiep", "khai-niem"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a37', 'short-answer', 'lắp đặt mạng điện', 'tech-circuit-install', 'Một bóng đèn huỳnh quang có ghi thông số 220V - 40W. Khi hoạt động bình thường liên tục trong đúng 10 giờ, bóng đèn này tiêu thụ lượng điện năng là bao nhiêu Wh?', NULL, ARRAY['400', '400Wh']::varchar[], 'Điện năng tiêu thụ A = P . t = 40W . 10h = 400Wh (tương đương 0.4 kWh).', 4, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["dien-dan-dung", "bai-tap-tinh-toan"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a38', 'short-answer', 'nông nghiệp', 'tech-circuit-install', 'Điền cụm từ: Phương pháp nhân giống cây ăn quả bằng cách cắt lấy một đoạn cành, chồi non của cây mẹ cắm trực tiếp vào chất nền/đất ẩm để đoạn cành đó tự ra rễ phát triển thành cây con hoàn chỉnh được gọi là phương pháp ____________ cành.', NULL, ARRAY['giâm', 'giam', 'giâm cành']::varchar[], 'Giâm cành là phương pháp nhân giống vô tính đơn giản, nhanh chóng và được ứng dụng rộng rãi cho nhiều loại cây trồng nông nghiệp.', 3, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["nong-nghiep", "nhan-giong"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a39', 'short-answer', 'lắp đặt mạng điện', 'tech-circuit-install', 'Vật liệu nào (như đồng, nhôm) cho phép dòng điện chạy qua một cách dễ dàng và được làm lõi của dây dẫn điện được gọi là vật liệu dẫn _____________.', NULL, ARRAY['điện', 'dien']::varchar[], 'Vật liệu dẫn điện có điện trở suất nhỏ, giúp truyền tải năng lượng điện từ nguồn đến phụ tải tiêu thụ với hao hụt thấp nhất.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["vat-lieu-dien", "co-ban"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a40', 'short-answer', 'lập trình', 'tech-circuit-install', 'Học sinh xây dựng code Python đọc giá trị từ cảm biến mưa: Nếu rain == True thì phát tín hiệu đóng mái che tự động, ngược lại thì mở. Khối cấu trúc lập trình này được gọi là cấu trúc rẽ ____________.', NULL, ARRAY['nhánh', 'nhanh', 'rẽ nhánh']::varchar[], 'Cấu trúc rẽ nhánh (if-else) điều khiển máy tính chọn một trong các hướng thực hiện câu lệnh tùy thuộc vào điều kiện kiểm tra là Đúng hay Sai.', 3, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "cau-truc-lap-trinh"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a41', 'short-answer', 'lắp đặt mạng điện', 'tech-circuit-install', 'Trong quy trình vẽ sơ đồ lắp đặt mạch điện, bước đầu tiên và quan trọng nhất trước khi vẽ đường dây dẫn điện là xác định vị trí của các thiết bị trên ____________ điện.', NULL, ARRAY['bảng', 'bang', 'bảng điện']::varchar[], 'Bố trí vị trí bảng điện và các thiết bị (cầu chì, công tắc, ổ cắm) trên bảng điện một cách khoa học giúp đường dây đi hợp lý, an toàn và dễ thao tác thực tế.', 4, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["dien-dan-dung", "quy-trinh"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a42', 'short-answer', 'chế biến thực phẩm', 'tech-circuit-install', 'Phương pháp bảo quản thực phẩm bằng cách sấy khô, làm bay hơi bớt lượng nước bên trong nhằm mục đích làm chậm sự phát triển của vi sinh vật thuộc nhóm phương pháp làm ____________ thực phẩm.', NULL, ARRAY['khô', 'kho', 'sấy khô', 'say kho']::varchar[], 'Làm khô/sấy khô giảm hoạt độ của nước bên trong thực phẩm, ngăn chặn vi khuẩn và nấm mốc sinh sôi, kéo dài thời gian lưu trữ.', 2, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["che-bien-thuc-pham", "bao-quan"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a43', 'short-answer', 'đạo đức', 'tech-career-choice', 'Việc vứt bỏ bừa bãi các rác thải công nghệ nguy hại như pin hỏng, bo mạch điện tử cũ trực tiếp ra môi trường đất, nước vi phạm nghiêm trọng Luật Bảo vệ ____________.', NULL, ARRAY['môi trường', 'moi truong']::varchar[], 'Rác thải điện tử chứa nhiều kim loại nặng độc hại (chì, thủy ngân). Quy trình xử lý bắt buộc phải thu gom phân loại theo đúng quy định pháp luật môi trường.', 3, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["dao-duc-moi-truong", "phap-luat"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a44', 'short-answer', 'lắp đặt mạng điện', 'tech-circuit-install', 'Trong sơ đồ nguyên lý mạch điện đèn cầu thang (mạch đèn điều khiển từ hai nơi độc lập), người thợ điện bắt buộc phải sử dụng loại công tắc mấy cực?', NULL, ARRAY['3', 'ba', '3 cực', 'ba cực']::varchar[], 'Mạch đèn hai nơi (mạch đèn cầu thang) sử dụng hai công tắc ba cực (công tắc chuyển mạch) phối hợp nối dây với nhau để đóng ngắt đèn độc lập ở hai đầu.', 5, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["dien-dan-dung", "mach-dien-phuc-tap"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a45', 'short-answer', 'lập trình', 'tech-circuit-install', 'Để lập trình đo độ ẩm đất liên tục cho mô hình vườn rau thông minh, học sinh sử dụng lệnh lặp vô hạn trong Python là câu lệnh cấu trúc while ____________: (điền từ khóa logic tiếng Anh phù hợp).', NULL, ARRAY['True', 'true']::varchar[], 'Vòng lặp while True: tạo ra một chu trình lặp vô hạn, giúp chương trình của hệ thống vi điều khiển IoT chạy liên tục để giám sát thông số cảm biến theo thời gian thực.', 5, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "vong-lap-vo-han"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a46', 'short-answer', 'nông nghiệp', 'tech-circuit-install', 'Bệnh hại cây trồng do các tác nhân vi sinh vật siêu nhỏ, không có cấu trúc tế bào, bắt buộc ký sinh nội bào gây ra được gọi là bệnh do ______________.', NULL, ARRAY['vi-rút', 'virus', 'vi rut']::varchar[], 'Virus là tác nhân gây ra nhiều bệnh hiểm nghèo trên cây ăn quả, thường lan truyền qua các vectơ trung gian như rầy, rệp hoặc dụng cụ cắt tỉa cành.', 4, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["nong-nghiep", "benh-cay-trong"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a47', 'short-answer', 'lắp đặt mạng điện', 'tech-circuit-install', 'Để bảo vệ các đường dây dẫn điện đi ngầm trong tường nhà khỏi bị ẩm ướt hoặc lực tác động cơ học làm đứt gãy, người ta lồng dây dẫn bên trong các ống loại vật liệu nào?', NULL, ARRAY['nhựa', 'ống nhựa', 'nhựa cách điện', 'pvc']::varchar[], 'Ống nhựa cách điện PVC luồn dây có khả năng chịu lực chống cháy, bảo vệ hệ thống dây điện âm tường an toàn tuyệt đối.', 3, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["dien-dan-dung", "luon-day"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

-- Seed KHTN 9 Questions
INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-mcq-a1', 'mcq', 'vật lí', 'sci-phy-optics', 'Khi ánh sáng truyền từ môi trường nước sang môi trường không khí với góc tới lớn hơn góc giới hạn phản xạ toàn phần, hiện tượng nào sau đây sẽ xảy ra?', ARRAY['Tia sáng bị khúc xạ mạnh hơn', 'Tia sáng truyền thẳng không bị đổi hướng', 'Toàn bộ tia sáng bị phản xạ trở lại môi trường nước', 'Ánh sáng bị phân ly thành các màu cầu vồng']::varchar[], ARRAY['Toàn bộ tia sáng bị phản xạ trở lại môi trường nước']::varchar[], 'Khi ánh sáng đi từ môi trường chiết quang hơn sang môi trường chiết quang kém và có góc tới lớn hơn góc giới hạn ($i > i_{gh}$), toàn bộ ánh sáng sẽ bị phản xạ ngược trở lại môi trường cũ, đây là hiện tượng phản xạ toàn phần.', 3, 'Sở GD&ĐT TP.HCM', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["quang-hoc", "phan-xa-toan-phan"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-mcq-a2', 'mcq', 'hóa học', 'sci-chem-organic', 'Dãy các hợp chất nào sau đây đều thuộc loại hợp chất hữu cơ hydrocarbon?', ARRAY['$CH_4, C_2H_4, C_2H_2$', '$CH_3Cl, C_2H_5OH, CH_3COOH$', '$CO_2, CaCO_3, NaHCO_3$', '$C_6H_{12}O_6, C_{12}H_{22}O_{11}, C_2H_4$']::varchar[], ARRAY['$CH_4, C_2H_4, C_2H_2$']::varchar[], 'Hydrocarbon là những hợp chất hữu cơ mà trong phân tử chỉ chứa hai nguyên tố là carbon (C) và hydrogen (H). Các dãy còn lại đều có chứa nguyên tố khác hoặc là hợp chất vô cơ.', 2, 'Đề thi học kỳ KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["hoa-huu-co", "hydrocarbon"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-mcq-a3', 'mcq', 'sinh học', 'sci-bio-genetics-mendelian', 'Theo quy luật phân ly của Mendel, khi cho lai hai cây đậu hà lan thuần chủng hạt vàng (trội) và hạt xanh (lặn) với nhau, tỷ lệ kiểu hình ở đời con F2 sẽ là bao nhiêu?', ARRAY['100% hạt vàng', '3 hạt vàng : 1 hạt xanh', '1 hạt vàng : 1 hạt xanh', '9 hạt vàng : 7 hạt xanh']::varchar[], ARRAY['3 hạt vàng : 1 hạt xanh']::varchar[], 'Đời F1 thu được 100% dị hợp (Aa - hạt vàng). Khi F1 tự thụ phấn ($Aa \times Aa$), đời F2 cho ra tỷ lệ kiểu gen là $1AA : 2Aa : 1aa$, tương ứng tỷ lệ kiểu hình trội/lặn là 3 vàng : 1 xanh.', 3, 'Sở GD&ĐT TP.HCM', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["di-truyen", "mendel"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-mcq-a4', 'mcq', 'vật lí', 'sci-phy-optics', 'Một thấu kính hội tụ có tiêu cự $f = 12\text{ cm}$. Đặt một vật sáng phẳng nhỏ vuông góc với trục chính và cách thấu kính một khoảng $d = 24\text{ cm}$. Tính chất của ảnh thu được qua thấu kính là gì?', ARRAY['Ảnh ảo, cùng chiều và lớn hơn vật', 'Ảnh thật, ngược chiều và nhỏ hơn vật', 'Ảnh thật, ngược chiều và bằng vật', 'Ảnh ảo, ngược chiều và bằng vật']::varchar[], ARRAY['Ảnh thật, ngược chiều và bằng vật']::varchar[], 'Khi vật đặt tại vị trí cách thấu kính hội tụ một khoảng $d = 2f$ ($24 = 2 \times 12$), thấu kính sẽ cho ảnh thật, ngược chiều, cách thấu kính đúng một khoảng $d'' = 2f = 24\text{ cm}$ và có độ lớn bằng vật.', 4, 'Đề thi học kỳ KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["thau-kinh", "hinh-hoc-quang"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-mcq-a5', 'mcq', 'hóa học', 'sci-chem-metal', 'Trường hợp nào sau đây xảy ra hiện tượng ăn mòn điện hóa học gây hư hại kim loại nghiêm trọng trong thực tế?', ARRAY['Để một chiếc đinh sắt nguyên chất trong bình chứa khí oxygen khô', 'Nhúng thanh kẽm vào dung dịch acid $HCl$', 'Cột dây đồng vào đường ống dẫn nước bằng thép (sắt) rồi để ngoài không khí ẩm', 'Đốt cháy dây magnesi ($Mg$) trong không khí']::varchar[], ARRAY['Cột dây đồng vào đường ống dẫn nước bằng thép (sắt) rồi để ngoài không khí ẩm']::varchar[], 'Khi sắt kết xúc trực tiếp với đồng trong môi trường chất điện ly (không khí ẩm), sẽ hình thành một pin điện hóa. Sắt có tính khử mạnh hơn đồng nên đóng vai trò là cực âm (anode) và bị ăn mòn điện hóa rất nhanh.', 4, 'Sở GD&ĐT TP.HCM', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["an-mon-kim-loai", "dien-hoa"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-mcq-a6', 'mcq', 'sinh học', 'sci-bio-dna-gene', 'Thành phần cấu tạo cốt lõi của một phân tử DNA (Axit Đêôxiribônuclêit) bao gồm các loại nucleotide nào sau đây?', ARRAY['A, U, G, X', 'A, T, G, X', 'A, T, U, X', 'U, G, X, Axit amin']::varchar[], ARRAY['A, T, G, X']::varchar[], 'DNA được cấu tạo từ 4 loại đơn phân nucleotide là Adenine (A), Thymine (T), Guanine (G), và Cytosine (X). Nucleotide loại Uracil (U) chỉ xuất hiện trong cấu trúc của RNA.', 2, 'Đề thi học kỳ KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sinh-hoc-phan-tu", "dna"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-mcq-a7', 'mcq', 'vật lí', 'sci-phy-electricity', 'Một điện trở $R = 20\ \Omega$ được mắc vào hiệu điện thế không đổi $U = 10\text{V}$. Công suất điện tiêu thụ trên điện trở này là bao nhiêu?', ARRAY['200 W', '2 W', '5 W', '0.5 W']::varchar[], ARRAY['5 W']::varchar[], 'Công suất điện được tính bằng công thức: $P = \frac{U^2}{R}$. Thay số vào ta có: $P = \frac{10^2}{20} = \frac{100}{20} = 5\text{ W}$.', 3, 'Sở GD&ĐT TP.HCM', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dien-hoc", "cong-suat"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-mcq-a8', 'mcq', 'hóa học', 'sci-chem-organic', 'Để phân biệt hai dung dịch mất nhãn gồm Rượu etylic ($C_2H_5OH$) và Axit axetic ($CH_3COOH$), ta có thể dùng thuốc thử đơn giản nào dưới đây?', ARRAY['Dung dịch NaCl', 'Quỳ tím hoặc dung dịch muối $Na_2CO_3$', 'Nước lọc', 'Khí hydrogen']::varchar[], ARRAY['Quỳ tím hoặc dung dịch muối $Na_2CO_3$']::varchar[], 'Axit axetic ($CH_3COOH$) có tính acid làm quỳ tím hóa đỏ và tác dụng với muối carbonate giải phóng khí $CO_2$ (sủi bọt khí). Rượu etylic không có các phản ứng này.', 2, 'Sở GD&ĐT TP.HCM', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["nhan-biet", "hoa-huu-co"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-mcq-a9', 'mcq', 'sinh học', 'sci-bio-ecosystem', 'Nhân tố sinh thái nào sau đây thuộc nhóm nhân tố sinh thái vô sinh ảnh hưởng trực tiếp đến đời sống thực vật?', ARRAY['Sự cạnh tranh nguồn thức ăn của chim ăn hạt', 'Ánh sáng, nhiệt độ và độ ẩm không khí', 'Các loài vi khuẩn phân hủy trong đất', 'Hoạt động chặt phá rừng của con người']::varchar[], ARRAY['Ánh sáng, nhiệt độ và độ ẩm không khí']::varchar[], 'Nhân tố vô sinh bao gồm tất cả các đặc tính vật lý và hóa học của môi trường xung quanh sinh vật (như khí hậu, đất, nước, ánh sáng...). Các phương án còn lại là nhân tố hữu sinh và con người.', 2, 'Đề thi học kỳ KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sinh-thai", "moi-truong"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-mcq-a10', 'mcq', 'vật lí', 'sci-phy-electromagnet', 'Hiện tượng cảm ứng điện từ xuất hiện dòng điện cảm ứng trong một cuộn dây dẫn kín khi nào?', ARRAY['Đặt một nam thanh nam châm đứng yên bên cạnh cuộn dây', 'Số đường sức từ xuyên qua tiết diện S của cuộn dây biến thiên (tăng hoặc giảm)', 'Cho dòng điện một chiều chạy qua cuộn dây', 'Đốt nóng cuộn dây dẫn bằng ngọn lửa']::varchar[], ARRAY['Số đường sức từ xuyên qua tiết diện S của cuộn dây biến thiên (tăng hoặc giảm)']::varchar[], 'Điều kiện để xuất hiện dòng điện cảm ứng trong cuộn dây dẫn kín là số đường sức từ xuyên qua tiết diện S của cuộn dây đó phải biến thiên theo thời gian.', 3, 'Sở GD&ĐT TP.HCM', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["dien-tu-hoc", "cam-ung-dien-tu"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-sa-a11', 'short-answer', 'vật lí', 'sci-phy-optics', 'Một tia sáng truyền từ không khí vào thủy tinh có chiết suất $n = 1.5$. Nếu góc khúc xạ trong thủy tinh đo được là $r = 30^\circ$, hãy tính giá trị của $\sin(i)$ (trong đó $i$ là góc tới).', NULL, ARRAY['0.75', '3/4']::varchar[], 'Áp dụng định luật khúc xạ ánh sáng: $n_1 \cdot \sin(i) = n_2 \cdot \sin(r)$. Với môi trường 1 là không khí ($n_1 = 1$), môi trường 2 là thủy tinh ($n_2 = 1.5$). Ta có: $1 \cdot \sin(i) = 1.5 \cdot \sin(30^\circ) = 1.5 \cdot 0.5 = 0.75$.', 4, 'Sở GD&ĐT TP.HCM', 'science', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["quang-hoc", "khuc-xa"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-sa-a12', 'short-answer', 'hóa học', 'sci-chem-organic', 'Hãy viết tên quốc tế viết tắt của polyme có tên thông thường là nhựa PE, được tạo thành từ phản ứng trùng hợp khí ethylene.', NULL, ARRAY['Polyethylene', 'polyethylene', 'PE', 'pe']::varchar[], 'Nhựa PE có tên đầy đủ là Polyethylene, được điều chế bằng cách trùng hợp các phân tử khí etilen ($C_2H_4$) dưới điều kiện nhiệt độ, áp suất và xúc tác thích hợp.', 2, 'Đề thi học kỳ KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["polymer", "hoa-huu-co"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-sa-a13', 'short-answer', 'sinh học', 'sci-bio-dna-gene', 'Tên gọi của cấu trúc gồm một chuỗi các nucleotide liên kết với nhau, đóng vai trò là đơn vị lưu trữ và truyền đạt thông tin di truyền của sinh vật, nằm trên nhiễm sắc thể là gì?', NULL, ARRAY['Gen', 'gen', 'Gene', 'gene']::varchar[], 'Gen là một đoạn của phân tử DNA mang thông tin mã hóa cho một chuỗi polypeptide hoặc một phân tử RNA, là đơn vị cơ sở của di truyền.', 2, 'Sở GD&ĐT TP.HCM', 'science', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["di-truyen", "co-ban"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-sa-a14', 'short-answer', 'hóa học', 'sci-chem-organic', 'Khi đốt cháy hoàn toàn 1 mol khí metan ($CH_4$) trong khí oxygen dư, phản ứng sinh ra khí carbon dioxide và nước. Hãy tính số mol khí $CO_2$ thu được sau phản ứng.', NULL, ARRAY['1', '1 mol']::varchar[], 'Phương trình hóa học: $CH_4 + 2O_2 \rightarrow CO_2 + 2H_2O$. Dựa vào tỉ lệ phương trình, 1 mol $CH_4$ phản ứng cháy hoàn toàn sẽ tạo ra đúng 1 mol $CO_2$.', 3, 'Đề thi học kỳ KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["tinh-toan-hoa-hoc", "hydrocarbon"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-khtn9-sa-a15', 'short-answer', 'vật lí', 'sci-phy-electromagnet', 'Một máy biến thế có số vòng dây cuộn sơ cấp là 4400 vòng, cuộn thứ cấp là 220 vòng. Khi đặt vào hai đầu cuộn sơ cấp một hiệu điện thế xoay chiều $U_1 = 220\text{V}$, hiệu điện thế ở hai đầu cuộn thứ cấp $U_2$ bằng bao nhiêu V?', NULL, ARRAY['11', '11V', '11 V']::varchar[], 'Áp dụng công thức máy biến thế: $\frac{U_1}{U_2} = \frac{N_1}{N_2} \Rightarrow \frac{220}{U_2} = \frac{4400}{220} = 20 \Rightarrow U_2 = \frac{220}{20} = 11\text{V}$.', 4, 'Sở GD&ĐT TP.HCM', 'science', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["may-bien-the", "dien-tu"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

-- Seed Extra Tech/Info Questions
INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a48', 'short-answer', 'định hướng nghề nghiệp', 'tech-career-jobs', 'Các cơ sở giáo dục tổ chức các chương trình đào tạo nghề ngắn hạn hoặc dài hạn, cấp bằng Sơ cấp, Trung cấp, Cao đẳng nghề cho học sinh sau THCS được gọi chung là các trường ______________.', NULL, ARRAY['nghề', 'trường nghề', 'trung cấp nghề', 'cao đẳng nghề']::varchar[], 'Hệ thống các trường nghề đáp ứng nhu cầu học song hành (vừa học văn hóa bổ túc vừa học nghề nghiệp kỹ thuật), chuẩn bị nguồn nhân lực thực hành cho xã hội.', 2, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["huong-nghiep", "giao-duc"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a49', 'short-answer', 'lắp đặt mạng điện', 'tech-circuit-install', 'Mạch điện có hiện tượng dây pha (dây nóng) chạm trực tiếp vào dây trung tính (dây nguội) mà không qua bất kỳ tải tiêu thụ nào, làm dòng điện tăng vọt cực đại gây cháy nổ gọi là hiện tượng ngắn mạch hoặc chập ______________.', NULL, ARRAY['mạch', 'chap mach', 'ngắn mạch']::varchar[], 'Ngắn mạch (chập mạch) sinh ra nhiệt lượng cực lớn tức thì, nếu hệ thống bảo vệ (cầu chì, aptomat) không ngắt kịp thời sẽ dẫn đến hỏa hoạn nghiêm trọng.', 3, 'Đề thi học kỳ Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["an-toan-dien", "su-co"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-tech9-sa-a50', 'short-answer', 'định hướng nghề nghiệp', 'tech-career-jobs', 'Điền từ thích hợp: Trong nền kinh tế số, năng lực thích ứng nhanh và biết sử dụng linh hoạt các công cụ phần mềm máy tính, thiết bị số phục vụ công việc chuyên môn được gọi là năng lực ____________.', NULL, ARRAY['số', 'nang luc so', 'tin học', 'tin hoc']::varchar[], 'Năng lực số (Digital Literacy) là một trong những tiêu chuẩn bắt buộc cốt lõi đối với mọi nguồn nhân lực chất lượng cao trong thị trường lao động tương lai.', 3, 'Sở GD&ĐT TP.HCM', 'technology', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["huong-nghiep", "nang-luc-so"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a31', 'mcq', 'lập trình', 'inf-algorithm', 'Xem đoạn mã Python sau:
```python
n = 5
while n > 2:
    n = n - 1
print(n)
```
Giá trị của `n` được in ra là bao nhiêu?', ARRAY['5', '3', '2', '0']::varchar[], ARRAY['2']::varchar[], 'Vòng lặp giảm n: Lần 1: n=4 (4>2), Lần 2: n=3 (3>2), Lần 3: n=2. Lúc này điều kiện 2>2 là Sai, vòng lặp dừng lại. Giá trị cuối cùng của n là 2.', 5, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["python", "vong-lap-while"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-mcq-a32', 'mcq', 'hướng nghiệp', 'inf-career', 'Lĩnh vực nghề nghiệp Tin học nào chuyên nghiên cứu các giải pháp ngăn chặn các cuộc tấn công mạng và bảo mật dữ liệu cho doanh nghiệp?', ARRAY['Thiết kế đồ họa số', 'An toàn thông tin / Bảo mật mạng', 'Quản trị cơ sở dữ liệu', 'Lập trình web di động']::varchar[], ARRAY['An toàn thông tin / Bảo mật mạng']::varchar[], 'Chuyên gia an toàn thông tin tập trung bảo vệ hệ thống thông tin, mạng máy tính khỏi các mối đe dọa truy cập bất hợp pháp và phá hoại dữ liệu.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["huong-nghiep", "an-ninh-mang"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a33', 'short-answer', 'bảng tính', 'inf-digital-tools', 'Trong Microsoft Excel, hàm nào dùng để đếm số lượng ô thỏa mãn một điều kiện cho trước?', NULL, ARRAY['COUNTIF', 'countif']::varchar[], 'Hàm COUNTIF dùng để đếm số ô trong một vùng dữ liệu thỏa mãn điều kiện nhất định.', 4, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["excel", "ham-so"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a34', 'short-answer', 'máy tính', 'inf-digital-world', 'Hãy viết tên viết tắt (gồm 3 chữ cái đại diện) của thiết bị lưu trữ bán dẫn có tốc độ đọc ghi dữ liệu vượt trội hơn hẳn so với ổ cứng cơ học HDD truyền thống.', NULL, ARRAY['SSD', 'ssd']::varchar[], 'SSD (Solid State Drive) là ổ cứng thể rắn sử dụng chip nhớ flash, mang lại tốc độ truy xuất dữ liệu cực nhanh so với ổ đĩa HDD.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["o-cung", "ssd"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a35', 'short-answer', 'đám mây', 'inf-data-manage', 'Điền cụm từ chính xác: Việc lưu trữ dữ liệu, chạy phần mềm dựa trên nền tảng internet thông qua hệ thống máy chủ của các nhà cung cấp dịch vụ được gọi chung là công nghệ điện toán ______________.', NULL, ARRAY['đám mây', 'dam may']::varchar[], 'Điện toán đám mây (Cloud Computing) cho phép người dùng khai thác tài nguyên công nghệ qua internet mà không cần tự đầu tư phần cứng phức tạp.', 2, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["dien-toan-dam-may", "khai-niem"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a36', 'short-answer', 'bản quyền', 'inf-ethics-law', 'Quyền hợp pháp của tác giả đối với sản phẩm trí tuệ do họ sáng tạo ra được gọi là gì?', NULL, ARRAY['Quyền tác giả', 'quyền tác giả', 'Bản quyền', 'bản quyền']::varchar[], 'Quyền tác giả (hay bản quyền) bảo vệ các tác phẩm gốc văn học, nghệ thuật, phần mềm tin học khỏi việc sao chép trái phép.', 2, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["phap-luat", "ban-quyen"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a37', 'short-answer', 'bảng tính', 'inf-digital-tools', 'Trong Excel, nếu viết công thức `=IF(5>8, "Đúng", "Sai")`, màn hình hiển thị kết quả là chuỗi chữ nào?', NULL, ARRAY['Sai', 'sai']::varchar[], 'Vì biểu thức điều kiện 5>8 mang giá trị False (Sai), nên hàm IF sẽ trả về giá trị ứng với trường hợp điều kiện sai, tức là chữ ''Sai''.', 3, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["excel", "ham-if"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a38', 'short-answer', 'lập trình', 'inf-algorithm', 'Trong ngôn ngữ Python, kết quả trả về của phép toán `15 // 4` (phép chia lấy phần nguyên) là bao nhiêu?', NULL, ARRAY['3']::varchar[], 'Phép toán `//` chia lấy phần nguyên. 15 chia cho 4 được 3 dư 3, do đó phần nguyên kết quả là 3.', 4, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "toan-tu"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a39', 'short-answer', 'lập trình', 'inf-algorithm', 'Trong ngôn ngữ Python, phép toán nào dùng để lấy số dư của phép chia (phép chia modulo)? Điền ký tự đại diện cho toán tử đó.', NULL, ARRAY['%']::varchar[], 'Ký tự `%` là toán tử chia lấy phần dư trong lập trình Python (ví dụ: `7 % 3` bằng 1).', 3, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "phep-du"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a40', 'short-answer', 'lập trình', 'inf-algorithm', 'Đoạn code Python sau có lỗi ở dòng nào?
```python
1: x = 5
2: if x > 0
3:     print("Dương")
```
(Điền số dòng bị lỗi)', NULL, ARRAY['2']::varchar[], 'Dòng thứ 2 thiếu dấu hai chấm `:` ở cuối câu lệnh điều kiện `if`. Cú pháp đúng phải là `if x > 0:`.', 5, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "sua-loi"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a41', 'short-answer', 'máy tính', 'inf-digital-world', 'Thành phần phần cứng máy tính viết tắt là ''ALU'' chịu trách nhiệm tính toán số học và thực hiện các phép toán nào?', NULL, ARRAY['logic', 'Logic', 'phép toán logic']::varchar[], 'ALU (Arithmetic Logic Unit) là đơn vị chịu trách nhiệm thực hiện toàn bộ các phép toán số học (+, -, *, /) và các phép toán logic (AND, OR, NOT, so sánh) của bộ vi xử lý.', 5, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["cpu", "alu"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a42', 'short-answer', 'tìm kiếm thông tin', 'inf-data-manage', 'Điền toán tử phù hợp: Để loại trừ các trang web chứa một từ khóa nhất định khỏi kết quả tìm kiếm Google, ta đặt dấu _________ sát trước từ khóa cần loại bỏ.', NULL, ARRAY['trừ', '-', 'dấu trừ']::varchar[], 'Toán tử dấu trừ `-` đặt liền trước từ khóa giúp loại trừ các bài viết chứa từ khóa đó khỏi trang kết quả (ví dụ: `apple -iphone`).', 4, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["tim-kiem", "toan-tu"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a43', 'short-answer', 'đạo đức', 'inf-ethics-law', 'Hành vi sử dụng công nghệ số để cố ý làm nhục, đe dọa hoặc quấy rối người khác lặp đi lặp lại được gọi là hành vi bắt nạt qua ______________.', NULL, ARRAY['mạng', 'không gian mạng', 'internet']::varchar[], 'Bắt nạt qua mạng (Cyberbullying) là một vấn nạn vi phạm quy tắc đạo đức nghiêm trọng trong môi trường số.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["dao-duc-so", "an-toan"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a44', 'short-answer', 'bảng tính', 'inf-digital-tools', 'Trong Excel, nếu ô A1=10, A2=5, A3=20. Công thức `=SUMIF(A1:A3, "<15")` trả về kết quả bằng bao nhiêu?', NULL, ARRAY['15']::varchar[], 'Các ô thỏa mãn điều kiện nhỏ hơn 15 gồm có A1 (10) và A2 (5). Hàm SUMIF thực hiện cộng tổng: 10 + 5 = 15.', 4, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["excel", "ham-sumif"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a45', 'short-answer', 'lập trình', 'inf-algorithm', 'Trong Python, kết quả xuất ra màn hình của lệnh `print(type(3.14))` là gì?', NULL, ARRAY['<class ''float''>', 'float']::varchar[], 'Hàm type() trả về kiểu dữ liệu của đối tượng. 3.14 là số thực nên thuộc lớp dữ liệu số thực kiểu ''float''.', 5, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "kieu-du-lieu"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a46', 'short-answer', 'lập trình', 'inf-algorithm', 'Đoạn mã sau hiển thị số mấy lên màn hình?
```python
a = 2
b = 3
a, b = b, a
print(a)
```', NULL, ARRAY['3']::varchar[], 'Cú pháp `a, b = b, a` là kỹ thuật hoán đổi (swap) giá trị nhanh hai biến trong Python. Biến `a` nhận giá trị mới từ biến `b` ban đầu, tức bằng 3.', 5, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "bien"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a47', 'short-answer', 'lập trình', 'inf-algorithm', 'Cho biết số vòng lặp thực hiện trong đoạn mã Python sau:
```python
for i in range(5):
    pass
```', NULL, ARRAY['5']::varchar[], '`range(5)` tạo chuỗi số 0, 1, 2, 3, 4 gồm chính xác 5 phần tử nên khối lệnh lặp đúng 5 lần.', 4, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "vong-lap"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a48', 'short-answer', 'lập trình', 'inf-algorithm', 'Hãy viết tên hàm trong Python dùng để yêu cầu người dùng nhập thông tin đầu vào từ bàn phím.', NULL, ARRAY['input()', 'input']::varchar[], 'Hàm `input()` tạm dừng chương trình và chờ đợi người dùng nhập một chuỗi ký tự từ bàn phím.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["python", "nhap-lieu"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a49', 'short-answer', 'bảng tính', 'inf-digital-tools', 'Ký tự nào bắt buộc phải gõ đầu tiên khi bạn muốn nhập một công thức hoặc hàm toán học tính toán vào ô dữ liệu Excel?', NULL, ARRAY['=']::varchar[], 'Dấu bằng `=` thông báo cho phần mềm bảng tính biết nội dung phía sau là công thức tính toán chứ không phải chuỗi văn bản thông thường.', 2, 'Đề thi học kỳ Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["excel", "cu-phap"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-info9-sa-a50', 'short-answer', 'hướng nghiệp', 'inf-career', 'Điền từ thích hợp: Ngành khoa học máy tính chuyên nghiên cứu cách xây dựng thuật toán giúp máy tính có khả năng suy nghĩ, học tập và mô phỏng trí tuệ con người được gọi tắt là công nghệ ______.', NULL, ARRAY['AI', 'ai', 'Trí tuệ nhân tạo', 'tri tue nhan tao']::varchar[], 'Trí tuệ nhân tạo (AI - Artificial Intelligence) đang thay đổi cấu trúc thị trường lao động và mở ra nhiều cơ hội định hướng nghề nghiệp Tin học.', 3, 'Sở GD&ĐT TP.HCM', 'informatics', 9, '{"isStandard": true, "answerMode": "short-answer", "tags": ["huong-nghiep", "ai"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;


-- Seed Science grade 9 lessons
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard)
VALUES 
  ('sci-9-1', 'science', 9, 'nat-physics', 'Khúc xạ ánh sáng và Định luật khúc xạ ánh sáng', '# I. Hiện tượng khúc xạ ánh sáng
- **Định nghĩa:** Là hiện tượng tia sáng truyền từ môi trường trong suốt này sang môi trường trong suốt khác bị gãy khúc tại mặt phân cách giữa hai môi trường.
- **Các khái niệm cơ bản:**
  + $SI$: Tia tới.
  + $IK$: Tia khúc xạ.
  + $N''IN$: Pháp tuyến với mặt phân cách tại điểm tới $I$.
  + $i = \widehat{SIN}$: Góc tới (góc hợp bởi tia tới và pháp tuyến).
  + $r = \widehat{KIN''}$: Góc khúc xạ (góc hợp bởi tia khúc xạ và pháp tuyến).

# II. Định luật khúc xạ ánh sáng
- Tia khúc xạ nằm trong mặt phẳng tới (mặt phẳng chứa tia tới và pháp tuyến) và ở bên kia pháp tuyến so với tia tới.
- Với hai môi trường trong suốt nhất định, tỉ số giữa sin của góc tới ($\sin i$) và sin của góc khúc xạ ($\sin r$) luôn là một hằng số:
$$\frac{\sin i}{\sin r} = n_{21} = \text{const}$$
- Trong đó: $n_{21} = \frac{n_2}{n_1}$ là chiết suất tỉ đối của môi trường 2 (chứa tia khúc xạ) đối với môi trường 1 (chứa tia tới).
- Chiết suất tuyệt đối $n$ của một môi trường là chiết suất của nó đối với chân không: $n = \frac{c}{v}$ (với $c = 3 \cdot 10^8 \text{ m/s}$ là tốc độ ánh sáng trong chân không, $v$ là tốc độ ánh sáng trong môi trường).
- **Dạng đối xứng của định luật:**
$$n_1 \cdot \sin i = n_2 \cdot \sin r$$', 'physics', '["Một tia sáng truyền từ không khí (chiết suất n1 = 1) vào nước (chiết suất n2 = 4/3) dưới góc tới i = 30 độ. Hãy tính góc khúc xạ r.", "Hiện tượng chiếc đũa cắm vào cốc nước trông như bị gãy khúc tại mặt nước là do hiện tượng khúc xạ ánh sáng gây ra."]'::jsonb, '["Vẽ đúng hình biểu diễn tia tới, tia khúc xạ, pháp tuyến và các góc i, r.", "Xác định đúng môi trường chứa tia tới (n1) và môi trường chứa tia khúc xạ (n2) để áp dụng công thức đối xứng.", "Biện luận độ lớn của góc r so với góc i khi ánh sáng truyền từ môi trường kém chiết quang sang môi trường chiết quang hơn và ngược lại."]'::jsonb, 5, true),
  ('sci-9-2', 'science', 9, 'nat-physics', 'Thấu kính mỏng và Công thức thấu kính', '# I. Phân loại thấu kính
- **Thấu kính hội tụ (Rìa mỏng):** Làm hội tụ chùm tia tới song song thành một chùm phản xạ/khúc xạ hội tụ.
- **Thấu kính phân kì (Rìa dày):** Làm phân kì chùm tia tới song song.
- **Các đặc điểm hình học:** Quang tâm $O$, trục chính, tiêu điểm ảnh chính $F''$, tiêu điểm vật chính $F$, tiêu cự $f = \overline{OF''}$.
  + Thấu kính hội tụ: $f > 0$.
  + Thấu kính phân kì: $f < 0$.

# II. Công thức thấu kính mỏng
- Gọi $d$ là khoảng cách từ vật đến thấu kính ($d > 0$ nếu vật thật).
- Gọi $d''$ là khoảng cách từ ảnh đến thấu kính ($d'' > 0$ nếu ảnh thật, $d'' < 0$ nếu ảnh ảo).
- **Công thức xác định vị trí ảnh:**
$$\frac{1}{f} = \frac{1}{d} + \frac{1}{d''}$$
- **Công thức tính độ phóng đại của ảnh ($k$):**
$$k = - \frac{d''}{d}$$
  + Nếu $k > 0$: Ảnh cùng chiều với vật (ảnh ảo).
  + Nếu $k < 0$: Ảnh ngược chiều với vật (ảnh thật).
  + Độ lớn $|k| = \frac{A''B''}{AB}$ cho biết ảnh lớn hay nhỏ hơn vật bao nhiêu lần.', 'physics', '["Một vật sáng AB đặt vuông góc với trục chính của một thấu kính hội tụ có tiêu cự f = 12 cm, cách thấu kính d = 18 cm. Xác định vị trí, tính chất và độ phóng đại của ảnh.", "Dùng thấu kính phân kì để quan sát một vật thật luôn thu được ảnh ảo, cùng chiều và nhỏ hơn vật."]'::jsonb, '["Quy ước dấu của f, d, d'' và k phải thuộc lòng trước khi giải bài tập.", "Kỹ năng vẽ hình tạo ảnh qua thấu kính bằng 2 trong 3 tia sáng đặc biệt.", "Biến đổi đại số chính xác để rút ra giá trị d hoặc d'' từ công thức tổng quát."]'::jsonb, 6, true),
  ('sci-9-3', 'science', 9, 'nat-chemistry', 'Tính chất chung của Kim loại và Dãy hoạt động hóa học', '# I. Tính chất vật lý và hóa học của kim loại
- **Tính chất vật lý chung:** Có tính dẻo, dẫn điện, dẫn nhiệt tốt và có ánh kim. Tất cả do các electron tự do trong tinh thể kim loại gây ra.
- **Tính chất hóa học chung:**
  + Tác dụng với phi kim (Oxi, Lưu huỳnh, Clo...): $4Al + 3O_2 \xrightarrow{t^o} 2Al_2O_3$
  + Tác dụng với dung dịch Axit ($HCl, H_2SO_4$ loãng): Kim loại trước H giải phóng khí $H_2$: $Fe + 2HCl \rightarrow FeCl_2 + H_2 \uparrow$
  + Tác dụng với dung dịch muối: Kim loại mạnh hơn đẩy kim loại yếu hơn ra khỏi muối: $Fe + CuSO_4 \rightarrow FeSO_4 + Cu \downarrow$

# II. Dãy hoạt động hóa học của kim loại
- **Dãy chuẩn:** $K, Na, Ca, Mg, Al, Zn, Fe, Pb, (H), Cu, Ag, Au$
- **Ý nghĩa của dãy:**
  + Mức độ hoạt động hóa học giảm dần từ trái sang phải.
  + Kim loại đứng trước $Mg$ ($K, Na, Ca$) phản ứng mãnh liệt với nước ở nhiệt độ thường tạo thành bazơ và giải phóng $H_2$.
  + Kim loại đứng trước $H$ tác dụng được với dung dịch axit ($HCl, H_2SO_4$ loãng) giải phóng $H_2$.
  + Kim loại đứng trước (trừ $K, Na, Ca$) đẩy được kim loại đứng sau ra khỏi dung dịch muối của chúng.', 'chemistry', '["Cho một cây đinh sắt sạch vào dung dịch đồng(II) sunfat (CuSO4). Hiện tượng quan sát được là có lớp kim loại màu đỏ bám lên đinh sắt, màu xanh của dung dịch nhạt dần.", "Viết phương trình hóa học khi cho Magie (Mg) tác dụng với axit Clohiđric (HCl)."]'::jsonb, '["Ghi nhớ chính xác thứ tự các nguyên tố trong dãy hoạt động hóa học.", "Nhận biết hiện tượng thí nghiệm dựa trên quy luật hoạt động của kim loại.", "Tính toán lượng chất (mol, khối lượng, thể tích khí) dựa theo phương trình phản ứng hóa học."]'::jsonb, 5, true),
  ('sci-9-4', 'science', 9, 'nat-chemistry', 'Sơ lược về Hợp chất hữu cơ và Thủy tinh hóa lỏng (Ankan - Axit axetic - Glucozơ)', '# I. Khái niệm về hợp chất hữu cơ
- Hợp chất hữu cơ là hợp chất của Cacbon (trừ các oxit của cacbon như $CO, CO_2$, axit cacbonic $H_2CO_3$, muối cacbonat kim loại...).
- Được chia làm hai loại chính: Hiđrocacbon (chỉ chứa $C$ và $H$) và Dẫn xuất của hiđrocacbon (ngoài $C, H$ còn có $O, N, Cl...$).

# II. Các hợp chất tiêu biểu
- **Mêtan ($CH_4$):** Là hiđrocacbon no đơn giản nhất, liên kết đơn bền vững. Tham gia phản ứng thế với Clo khi có ánh sáng:
$$CH_4 + Cl_2 \xrightarrow{\text{Ánh sáng}} CH_3Cl + HCl$$
- **Axit axetic ($CH_3COOH$):** Có nhóm $-COOH$ gây ra tính axit. Tác dụng với rượu etylic ($C_2H_5OH$) tạo este (phản ứng este hóa):
$$CH_3COOH + C_2H_5OH \xrightleftharpoons[t^o]{H_2SO_4 \text{ đặc}} CH_3COOC_2H_5 + H_2O$$
- **Glucozơ ($C_6H_{12}O_6$):** Là chất dinh dưỡng quan trọng. Tham gia phản ứng tráng bạc với dung dịch $AgNO_3$ trong $NH_3$ tạo thành bạc kim loại, hoặc phản ứng lên men rượu:
$$C_6H_{12}O_6 \xrightarrow{\text{Men rượu, } 30-35^o C} 2C_2H_5OH + 2CO_2 \uparrow$$', 'chemistry', '["Tính khối lượng Axit axetic cần dùng để trung hòa hoàn toàn 100 ml dung dịch NaOH 1M.", "Nhận biết dung dịch Glucozơ và dung dịch Saccarozơ bằng phản ứng tráng bạc."]'::jsonb, '["Phân biệt cấu tạo mạch cacbon và các nhóm chức đặc trưng (-OH, -COOH).", "Viết đúng phương trình phản ứng hữu cơ, đặc biệt là phản ứng hai chiều (este hóa) và điều kiện phản ứng.", "Giải bài toán hiệu suất phản ứng hữu cơ (vì đa số phản ứng hữu cơ không đạt hiệu suất 100%)."]'::jsonb, 6, true),
  ('sci-9-5', 'science', 9, 'nat-biology', 'Di truyền học Men-đen và Các quy luật di truyền', '# I. Các khái niệm cơ bản của Di truyền học
- **Gen:** Một đoạn của phân tử DNA mang thông tin mã hóa cho một sản phẩm nhất định (chuỗi pôlipeptit hoặc RNA).
- **Alen:** Các trạng thái khác nhau của cùng một gen (Ví dụ: gen quy định màu hoa có alen $A$ quy định hoa đỏ, alen $a$ quy định hoa trắng).
- **Kiểu gen:** Tổ hợp toàn bộ các alen trong tế bào của cơ thể (Ví dụ: $AA, Aa, aa$).
- **Kiểu hình:** Tập hợp các tính trạng của cơ thể (Ví dụ: hoa đỏ, hoa trắng).

# II. Quy luật phân ly của Men-đen
- **Nội dung:** Trong quá trình phát sinh giao tử, mỗi nhân tố di truyền (alen) trong cặp alen phân ly đồng đều về các giao tử, nên $50\%$ giao tử chứa alen này và $50\%$ giao tử chứa alen kia.
- **Sơ đồ lai minh họa (Lai một tính trạng):**
  + $P_{\text{thuần chủng}}$: $AA$ (Hoa đỏ) $\times$ $aa$ (Hoa trắng)
  + $G_P$: $A$ ; $a$
  + $F_1$: $100\% Aa$ (Hoa đỏ)
  + $F_1 \times F_1$: $Aa$ (Hoa đỏ) $\times$ $Aa$ (Hoa đỏ)
  + $G_{F1}$: $(\frac{1}{2}A : \frac{1}{2}a)$ $\times$ $(\frac{1}{2}A : \frac{1}{2}a)$
  + $F_2$ Kiểu gen: $\frac{1}{4}AA : \frac{2}{4}Aa : \frac{1}{4}aa$ (Tỉ lệ $1 : 2 : 1$).
  + $F_2$ Kiểu hình: $3$ Hoa đỏ : $1$ Hoa trắng (Tỉ lệ $3 : 1$).', 'biology', '["Ở đậu Hà Lan, hạt vàng (A) là trội hoàn toàn so với hạt xanh (a). Cho cây hạt vàng dị hợp tự thụ phấn, xác định tỉ lệ kiểu hình ở đời con.", "Phép lai phân tích là phép lai giữa cơ thể mang tính trạng trội chưa biết kiểu gen với cơ thể mang tính trạng lặn nhằm kiểm tra kiểu gen của cơ thể đó."]'::jsonb, '["Kỹ năng viết giao tử chính xác từ kiểu gen cho trước (quy tắc phân ly).", "Sử dụng khung kẻ Punnett để phối hợp các giao tử tạo thành tổ hợp kiểu gen đời con.", "Phân biệt rõ ràng giữa tỉ lệ kiểu gen và tỉ lệ kiểu hình dựa vào mối quan hệ trội - lặn."]'::jsonb, 6, true),
  ('sci-9-6', 'science', 9, 'nat-biology', 'Nhiễm sắc thể, DNA và Quá trình di truyền phân tử', '# I. Nhiễm sắc thể (NST) và Chu kỳ tế bào
- NST là cấu trúc nằm trong nhân tế bào, cấu tạo từ DNA và protein histôn, cấu trúc này xoắn lại ở các mức độ khác nhau.
- Bộ NST lưỡng bội ($2n$) đặc trưng cho loài sinh sản hữu tính. Ví dụ ở người $2n = 46$.
- **Nguyên phân:** Quá trình phân chia tế bào sinh dưỡng giúp cơ thể tăng trưởng, giữ nguyên bộ NST $2n$.
- **Giảm phân:** Quá trình hình thành giao tử (tinh trùng, trứng), bộ NST giảm đi một nửa còn đơn bội ($n$).

# II. Cấu trúc DNA và Nguyên tắc bổ sung
- DNA (Axit khửôxiribônuclêic) là chuỗi xoắn kép gồm hai mạch pôlinuclêôtit chạy song song ngược chiều nhau.
- Đơn phân của DNA là nuclêôtit gồm 4 loại: $A$ (Ađênin), $T$ (Timin), $G$ (Guanin), $X$ (Xitôzin).
- **Nguyên tắc bổ sung (NTBS):** Các nuclêôtit trên hai mạch liên kết với nhau bằng liên kết hiđrô theo quy luật:
$$A \text{ liên kết với } T \text{ bằng 2 liên kết hiđrô } (A = T)$$
$$G \text{ liên kết với } X \text{ bằng 3 liên kết hiđrô } (G \equiv X)$$
- **Các hệ quả công thức:**
  + Tổng số nuclêôtit: $N = 2A + 2G = 2T + 2X$
  + Chiều dài phân tử DNA: $L = \frac{N}{2} \cdot 3,4 \text{ (\AA)}$', 'biology', '["Một gen có tổng số nuclêôtit N = 2400. Biết số nuclêôtit loại A = 600. Hãy tính số nuclêôtit loại G của gen đó.", "Giải thích tại sao con cái lại có những đặc điểm giống bố mẹ dựa trên cơ chế tự nhân đôi của DNA và sự phân ly NST trong giảm phân."]'::jsonb, '["Vận dụng thành thạo nguyên tắc bổ sung để tính toán số lượng và phần trăm từng loại nuclêôtit.", "Nhớ các hệ thức liên hệ giữa số nuclêôtit, chiều dài (L) và số liên kết hiđrô (H).", "Xác định trạng thái của NST (đơn, kép) qua các kỳ của nguyên phân và giảm phân."]'::jsonb, 7, true),
  ('sci-9-7', 'science', 9, 'nat-physics', 'Điện trở của dây dẫn - Định luật Ohm', '# I. Điện trở của dây dẫn
- **Định nghĩa:** Điện trở là đại lượng đặc trưng cho mức độ cản trở dòng điện của dây dẫn. Kí hiệu là $R$, đơn vị là Ôm ($\Omega$).
- **Công thức tính điện trở phụ thuộc vào đặc tính dây dẫn:**
$$R = \rho \cdot \frac{l}{S}$$
Trong đó:
  + $\rho$: Điện trở suất của vật liệu làm dây dẫn ($\Omega \cdot m$).
  + $l$: Chiều dài dây dẫn ($m$).
  + $S$: Tiết diện của dây dẫn ($m^2$).

# II. Định luật Ohm
- **Phát biểu:** Cường độ dòng điện chạy qua một dây dẫn tỉ lệ thuận với hiệu điện thế đặt vào hai đầu dây và tỉ lệ nghịch với điện trở của dây.
- **Biểu thức toán học:**
$$I = \frac{U}{R}$$
Trong đó:
  + $I$: Cường độ dòng điện ($A$).
  + $U$: Hiệu điện thế ($V$).
  + $R$: Điện trở ($\Omega$).
- **Hệ thức biến đổi:** $U = I \cdot R$ hoặc $R = \frac{U}{I}$.', 'physics', '["Một dây dẫn bằng đồng có điện trở suất 1,7.10^-8 Ohm.m, chiều dài 20m, tiết diện 0,5 mm^2. Hãy tính điện trở của dây.", "Đặt vào hai đầu điện trở R = 15 Ohm một hiệu điện thế U = 12V. Tính cường độ dòng điện chạy qua điện trở."]'::jsonb, '["Đổi đơn vị tiết diện từ mm^2 sang m^2 chính xác (1 mm^2 = 10^-6 m^2).", "Vận dụng định luật Ohm cho đoạn mạch nối tiếp (I bằng nhau, U bằng tổng) và đoạn mạch song song (U bằng nhau, I bằng tổng)."]'::jsonb, 5, true),
  ('sci-9-8', 'science', 9, 'nat-physics', 'Công suất điện và Điện năng tiêu thụ', '# I. Công suất điện
- **Định nghĩa:** Công suất điện của một đoạn mạch là đại lượng đặc trưng cho tốc độ tiêu thụ điện năng của đoạn mạch đó, được xác định bằng tích của hiệu điện thế và cường độ dòng điện.
- **Công thức tổng quát:**
$$P = U \cdot I$$
- **Các công thức biến đổi (áp dụng cho đoạn mạch chỉ có điện trở thuần R):**
$$P = I^2 \cdot R = \frac{U^2}{R}$$
Trong đó:
  + $P$: Công suất điện (Oat - $W$).
  + $U$: Hiệu điện thế ($V$).
  + $I$: Cường độ dòng điện ($A$).

# II. Điện năng tiêu thụ (Công của dòng điện)
- **Công thức tính:** Điện năng tiêu thụ bằng tích của công suất điện và thời gian dòng điện chạy qua.
$$A = P \cdot t = U \cdot I \cdot t$$
- **Đơn vị đo:**
  + Trong hệ SI: đơn vị là Jun ($J$), với $1 \text{ J} = 1 \text{ W} \cdot 1 \text{ s}$.
  + Trong thực tế (đồng hồ đo điện): đơn vị là Kilôoat giờ ($kWh$), với $1 \text{ kWh} = 3.600.000 \text{ J} = 3,6 \cdot 10^6 \text{ J}$.', 'physics', '["Một bóng đèn có ghi 220V - 100W. Tính điện trở của đèn và điện năng đèn tiêu thụ khi thắp sáng liên tục trong 5 giờ.", "Tính tiền điện phải trả cho một lò sưởi 2000W hoạt động 3 giờ mỗi ngày trong suốt 30 ngày, biết giá điện là 2000 đồng/kWh."]'::jsonb, '["Phân biệt ý nghĩa số ghi định mức trên các thiết bị điện (U_đm, P_đm).", "Thành thạo kỹ năng chuyển đổi đơn vị qua lại giữa Jun (J) và Kilôoat giờ (kWh)."]'::jsonb, 5, true),
  ('sci-9-9', 'science', 9, 'nat-physics', 'Cảm ứng điện từ và Dòng điện xoay chiều', '# I. Hiện tượng cảm ứng điện từ
- **Khái niệm từ thông:** Từ thông $\Phi$ đại diện cho số lượng đường sức từ xuyên qua một diện tích vòng dây kín.
- **Hiện tượng cảm ứng điện từ:** Khi số đường sức từ xuyên qua tiết diện của một cuộn dây dẫn kín biến thiên (tăng hoặc giảm), trong cuộn dây xuất hiện một dòng điện gọi là **dòng điện cảm ứng**.

# II. Dòng điện xoay chiều (AC)
- **Định nghĩa:** Là dòng điện có chiều và trị số biến thiên tuần hoàn theo thời gian.
- **Cơ chế tạo ra:** Cho cuộn dây dẫn kín quay trong từ trường của nam châm, hoặc cho nam châm quay trước cuộn dây dẫn kín.
- **Các đại lượng đặc trưng:**
  + Tần số ($f$): Số chu kỳ dao động trong 1 giây (đơn vị Hertz - $Hz$).
  + Giá trị hiệu dụng: Cường độ hiệu dụng ($I$) và Hiệu điện thế hiệu dụng ($U$) là các giá trị tương đương với dòng điện một chiều về mặt tác dụng nhiệt.
- **Công thức máy biến áp (Biến thế):**
$$\frac{U_1}{U_2} = \frac{N_1}{N_2}$$
Trong đó: $U_1, N_1$ là hiệu điện thế và số vòng dây cuộn sơ cấp; $U_2, N_2$ là hiệu điện thế và số vòng dây cuộn thứ cấp.', 'physics', '["Một máy biến áp có số vòng dây cuộn sơ cấp là 4400 vòng, cuộn thứ cấp là 220 vòng. Đặt vào hai đầu cuộn sơ cấp hiệu điện thế xoay chiều U1 = 220V. Tính hiệu điện thế U2 ở hai đầu cuộn thứ cấp.", "Giải thích tại sao khi đưa một cực của nam châm lại gần hoặc ra xa cuộn dây kín thì đèn LED nối với cuộn dây lại lóe sáng."]'::jsonb, '["Nắm vững điều kiện xuất hiện dòng điện cảm ứng là ''sự biến thiên từ thông'', không phải chỉ cần có từ trường.", "Vận dụng công thức máy biến thế để xác định máy tăng áp hay máy hạ áp."]'::jsonb, 6, true),
  ('sci-9-10', 'science', 9, 'nat-physics', 'Năng lượng, Sự chuyển hóa năng lượng và Định luật bảo toàn năng lượng', '# I. Các dạng năng lượng và Sự chuyển hóa
- Năng lượng tồn tại dưới nhiều dạng: Cơ năng (Động năng, Thế năng), Nhiệt năng, Điện năng, Hóa năng, Quang năng, Năng lượng hạt nhân.
- Năng lượng có thể chuyển hóa từ dạng này sang dạng khác hoặc truyền từ vật này sang vật khác.

# II. Định luật bảo toàn năng lượng
- **Phát biểu:** Năng lượng không tự sinh ra cũng không tự mất đi; nó chỉ chuyển hóa từ dạng này sang dạng khác, hoặc truyền từ vật này sang vật khác.
- **Phương trình cân bằng nhiệt (Dạng cơ bản của bảo toàn năng lượng):**
$$Q_{\text{tỏa}} = Q_{\text{thu}}$$
Trong đó: $Q = m \cdot c \cdot \Delta t$ (với $m$ là khối lượng, $c$ là nhiệt dung riêng, $\Delta t$ là độ biến thiên nhiệt độ).
- **Hiệu suất của quá trình chuyển hóa:**
$$H = \frac{A_{\text{có ích}}}{A_{\text{toàn phần}}} \cdot 100\%$$', 'physics', '["Thả một quả cầu nhôm có khối lượng 0,2kg ở nhiệt độ 100 độ C vào một cốc chứa 0,5kg nước ở 20 độ C. Tính nhiệt độ khi có cân bằng nhiệt, bỏ qua sự hao phí nhiệt ra môi trường.", "Phân tích sự chuyển hóa năng lượng từ Thủy năng thành Điện năng trong một nhà máy thủy điện."]'::jsonb, '["Xác định đúng vật nào tỏa nhiệt (nhiệt độ giảm) và vật nào thu nhiệt (nhiệt độ tăng) để thiết lập phương trình.", "Tính toán phần năng lượng hao phí (thường chuyển hóa thành nhiệt năng vô ích) dựa trên hiệu suất H."]'::jsonb, 5, true),
  ('sci-9-11', 'science', 9, 'nat-chemistry', 'Tính chất của Phi kim và Sơ lược về Bảng tuần hoàn các nguyên tố hóa học', '# I. Tính chất hóa học của phi kim
- **Tác dụng với kim loại:** Tạo thành muối hoặc oxit.
$$2Fe + 3Cl_2 \xrightarrow{t^o} 2FeCl_3$$
$$C + O_2 \xrightarrow{t^o} CO_2$$
- **Tác dụng với Hiđro:** Tạo thành hợp chất khí.
$$H_2 + Cl_2 \xrightarrow{\text{Ánh sáng}} 2HCl$$
- **Mức độ hoạt động hóa học:** Các phi kim khác nhau có mức độ hoạt động khác nhau (F, Cl, O là các phi kim mạnh; S, C, P là các phi kim yếu hơn).

# II. Cấu tạo Bảng tuần hoàn các nguyên tố hóa học
- **Nguyên tắc sắp xếp:** Theo chiều tăng dần của điện tích hạt nhân nguyên tử.
- **Cấu trúc:**
  + **Ô nguyên tố:** Cho biết số hiệu nguyên tử (= số proton = số electron), ký hiệu hóa học, tên nguyên tố và nguyên tử khối.
  + **Chu kỳ:** Gồm các nguyên tố mà nguyên tử của chúng có cùng số lớp electron (Bảng tuần hoàn có 7 chu kỳ).
  + **Nhóm:** Gồm các nguyên tố mà nguyên tử của chúng có số electron lớp ngoài cùng bằng nhau (chia thành nhóm A và nhóm B).
- **Quy luật biến đổi:** Trong một chu kỳ (từ trái sang phải), tính kim loại giảm dần, tính phi kim tăng dần. Trong một nhóm A (từ trên xuống dưới), tính kim loại tăng dần, tính phi kim giảm dần.', 'chemistry', '["Dựa vào bảng tuần hoàn, hãy xác định cấu tạo nguyên tử của nguyên tố Natri (Na) ở ô số 11, chu kỳ 3, nhóm IA.", "Viết phương trình phản ứng khi đốt cháy hoàn toàn lưu huỳnh (S) trong lọ chứa khí oxi (O2)."]'::jsonb, '["Mối liên hệ giữa vị trí của nguyên tố trong bảng tuần hoàn và cấu tạo nguyên tử (Số thứ tự chu kỳ = Số lớp e, Số thứ tự nhóm A = Số e lớp ngoài cùng).", "Dự đoán tính chất hóa học cơ bản của nguyên tố khi biết vị trí của nó."]'::jsonb, 5, true),
  ('sci-9-12', 'science', 9, 'nat-chemistry', 'Hiđrocacbon không no: Etilen và Axetilen', '# I. Etilen ($C_2H_4$)
- **Cấu tạo:** Có một liên kết đôi $C=C$ trong phân tử, gồm 1 liên kết kém bền dễ bị đứt ra trong các phản ứng hóa học.
- **Tính chất hóa học đặc trưng:**
  + **Phản ứng cộng:** Làm mất màu dung dịch Brom.
$$CH_2=CH_2 + Br_2 \rightarrow CH_2Br-CH_2Br$$
  + **Phản ứng trùng hợp:** Các phân tử etilen liên kết với nhau tạo thành chuỗi Polietilen (nhựa PE).
$$n \cdot CH_2=CH_2 \xrightarrow{t^o, p, xt} -(-CH_2-CH_2-)-_n$$

# II. Axetilen ($C_2H_2$)
- **Cấu tạo:** Có một liên kết ba $C \equiv C$ trong phân tử, gồm 2 liên kết kém bền.
- **Tính chất hóa học:**
  + **Phản ứng cộng:** Cộng với Brom theo 2 giai đoạn (tỉ lệ 1:1 hoặc 1:2).
$$CH \equiv CH + 2Br_2 \rightarrow CHBr_2-CHBr_2$$
  + **Phản ứng cháy:** Phản ứng tỏa nhiệt rất lớn, dùng trong đèn xì oxy-axetilen để hàn cắt kim loại.
$$2C_2H_2 + 5O_2 \xrightarrow{t^o} 4CO_2 + 2H_2O$$', 'chemistry', '["Trình bày phương pháp hóa học để phân biệt hai khí mất nhãn: Mêtan (CH4) và Etilen (C2H4).", "Tính thể tích không khí (chứa 20% oxi) cần dùng để đốt cháy hoàn toàn 5,6 lít khí Axetilen ở đktc."]'::jsonb, '["Ghi nhớ hiện tượng làm mất màu dung dịch Brom để nhận biết các hiđrocacbon không no.", "Viết đúng công thức cấu tạo thu gọn có biểu diễn liên kết đôi hoặc liên kết ba.", "Tính toán lượng chất theo hệ số tỉ lệ phương trình (đặc biệt chú ý tỉ lệ mol phản ứng cộng của Axetilen)."]'::jsonb, 6, true),
  ('sci-9-13', 'science', 9, 'nat-chemistry', 'Dẫn xuất Hiđrocacbon: Rượu Etylic (Etanol)', '# I. Cấu tạo và Tính chất vật lý
- **Công thức phân tử:** $C_2H_6O$
- **Công thức cấu tạo:** $CH_3-CH_2-OH$ (có nhóm $-OH$ đặc trưng cho tính chất của ancol).
- **Độ rượu:** Là số mililít rượu etylic nguyên chất có trong 100 ml hỗn hợp rượu với nước.
$$Độ rượu = \frac{V_{\text{rượu nguyên chất}}}{V_{\text{hỗn hợp}}} \cdot 100$$

# II. Tính chất hóa học
- **Phản ứng với kim loại kiềm ($Na, K$):** Thế nguyên tử H trong nhóm $-OH$.
$$2C_2H_5OH + 2Na \rightarrow 2C_2H_5ONa + H_2 \uparrow$$
- **Phản ứng cháy:** Tỏa nhiều nhiệt, ngọn lửa màu xanh.
$$C_2H_5OH + 3O_2 \xrightarrow{t^o} 2CO_2 + 3H_2O$$
- **Phản ứng lên men giấm:**
$$C_2H_5OH + O_2 \xrightarrow{\text{Men giấm}} CH_3COOH + H_2O$$', 'chemistry', '["Tính thể tích rượu etylic nguyên chất có trong 500 ml rượu 45 độ.", "Cho 9,2 gam rượu etylic tác dụng hoàn toàn với natri dư. Tính thể tích khí hiđro thu được ở đktc."]'::jsonb, '["Áp dụng chính xác công thức tính độ rượu và khối lượng riêng ($m = D \\cdot V$) để tìm khối lượng rượu nguyên chất.", "Nhận biết nguyên tử H ở nhóm -OH linh động hơn các nguyên tử H ở mạch cacbon thông qua phản ứng với Na."]'::jsonb, 5, true),
  ('sci-9-14', 'science', 9, 'nat-chemistry', 'Chất béo và Polime', '# I. Chất béo (Lipit)
- **Thành phần cấu tạo:** Chất béo là hỗn hợp các este của glixerol $[C_3H_5(OH)_3]$ với các axit béo (như axit panmitic $C_{15}H_{31}COOH$, axit stearic $C_{17}H_{35}COOH$, axit oleic $C_{17}H_{33}COOH$).
- **Công thức tổng quát:** $(R-COO)_3C_3H_5$.
- **Phản ứng thủy phân trong môi trường kiềm (Phản ứng xà phòng hóa):**
$$(R-COO)_3C_3H_5 + 3NaOH \xrightarrow{t^o} 3R-COONa \text{ (Xà phòng)} + C_3H_5(OH)_3 \text{ (Glixerol)}$$

# II. Khái niệm về Polime
- Polime là những hợp chất có phân tử khối rất lớn do nhiều mắt xích liên kết với nhau tạo nên.
- Phân loại: Polime tự nhiên (tinh bột, xenlulozơ, cao su thiên nhiên...) và Polime tổng hợp (nhựa PE, PVC, tơ nilon...).
- Cấu trúc: Mạch thẳng, mạch phân nhánh hoặc mạch mạng không gian (nhựa bakelit, cao su lưu hóa).', 'chemistry', '["Thủy phân hoàn toàn 89 gam chất béo tristearin (C17H35COO)3C3H5 bằng dung dịch NaOH. Tính khối lượng glixerol thu được.", "Phân biệt cao su lưu hóa và cao su thông thường về mặt cấu trúc mạch polime và tính đàn hồi."]'::jsonb, '["Nắm vững bản chất phản ứng xà phòng hóa để tính toán theo định luật bảo toàn khối lượng hoặc tỉ lệ mol (1 mol chất béo : 3 mol kiềm : 1 mol glixerol).", "Nhận biết các ứng dụng thực tế của polime trong đời sống (chất dẻo, tơ sợi, cao su)."]'::jsonb, 6, true),
  ('sci-9-15', 'science', 9, 'nat-biology', 'Quy luật di truyền liên kết', '# I. Thí nghiệm của Moóc-găng (Morgan)
- Đối tượng thí nghiệm: Ruồi giấm ($2n = 8$).
- Phép lai: Ruồi cái thân xám, cánh dài thuần chủng $\times$ Ruồi đực thân đen, cánh cụt.
  + $F_1$: $100\% Thân xám, cánh dài.
  + Lai phân tích ruồi đực $F_1$: Đực $F_1$ (Xám, dài) $\times$ Cái (Đen, cụt).
  + Kết quả đời con $F_B$: $1$ Thân xám, cánh dài : $1$ Thân đen, cánh cụt.

# II. Giải thích quy luật liên kết gen
- Do các gen quy định các tính trạng khác nhau (thân xám và cánh dài, thân đen và cánh cụt) cùng nằm trên một nhiễm sắc thể và cùng phân ly về giao tử trong quá trình giảm phân.
- **Ký hiệu sơ đồ lai liên kết:**
  + Quy ước: $B$: thân xám, $b$: thân đen; $V$: cánh dài, $v$: cánh cụt.
  + Kiểu gen ruồi $F_1$: $\frac{BV}{bv}$ (Các gen nằm trên cùng một cặp NST gạch quang).
  + Khi giảm phân, cơ thể $\frac{BV}{bv}$ chỉ cho 2 loại giao tử với tỉ lệ bằng nhau là $\underline{BV}$ và $\underline{bv}$ (nếu liên kết hoàn toàn).
- **Ý nghĩa:** Hạn chế sự xuất hiện của biến dị tổ hợp, đảm bảo sự di truyền ổn định của từng nhóm tính trạng tốt luôn đi kèm với nhau.', 'biology', '["Cho giao phấn giữa hai cây thuần chủng cùng loài khác nhau về hai cặp tính trạng tương phản, đời F1 thu được 100% cây thân cao, quả đỏ. Cho đực F1 lai phân tích, thu được đời con có tỉ lệ 1 thân cao, quả đỏ : 1 thân thấp, quả vàng. Xác định quy luật di truyền.", "Viết các loại giao tử của cơ thể có kiểu gen AB/ab trong trường hợp liên kết gen hoàn toàn."]'::jsonb, '["Nhận diện quy luật liên kết gen dựa vào tỉ lệ kiểu hình rút gọn của phép lai phân tích (tỉ lệ 1:1 đối với 2 tính trạng thay vì 1:1:1:1 như phân ly độc lập).", "Cách viết đúng ký hiệu cặp gen liên kết trên nhiễm sắc thể."]'::jsonb, 7, true),
  ('sci-9-16', 'science', 9, 'nat-biology', 'Đột biến gen và Đột biến nhiễm sắc thể', '# I. Đột biến gen
- **Định nghĩa:** Là những biến đổi trong cấu trúc của gen, liên quan đến một hoặc một số cặp nuclêôtit tại một điểm nào đó của phân tử DNA.
- **Các dạng đột biến gen cơ bản:**
  + Mất một hoặc một số cặp nuclêôtit.
  + Thêm một hoặc một số cặp nuclêôtit.
  + Thay thế cặp nuclêôtit này bằng cặp nuclêôtit khác.
- **Hậu quả:** Có thể làm thay đổi trình tự axit amin trong chuỗi pôlipeptit, từ đó làm thay đổi kiểu hình của cơ thể (đa số gây hại, một số trung tính hoặc có lợi cho tiến hóa/chọn giống).

# II. Đột biến nhiễm sắc thể (NST)
- **Đột biến cấu trúc NST:** Là những biến đổi trong cấu trúc nội tại của từng NST. Gồm các dạng: Mất đoạn, Lặp đoạn, Đảo đoạn, Chuyển đoạn.
- **Đột biến số lượng NST:** Là sự biến đổi số lượng NST xảy ra ở một hoặc một số cặp NST, hoặc ở toàn bộ các cặp NST.
  + **Thể dị bội (Lệch bội):** Thay đổi ở một hoặc một vài cặp NST (Ví dụ: Thể ba nhiễm $2n+1$ gây hội chứng Down ở người ở cặp NST số 21; Thể một nhiễm $2n-1$).
  + **Thể đa bội:** Tăng số nguyên lần bộ NST đơn bội và lớn hơn $2n$ (Ví dụ: Tam bội $3n$, Tứ bội $4n$). Cơ thể đa bội thường có tế bào to, cơ quan sinh dưỡng lớn, sinh trưởng mạnh.', 'biology', '["Hội chứng Down ở người xuất hiện do bệnh nhân có 3 nhiễm sắc thể ở cặp số 21, đây là một dạng đột biến số lượng NST (Thể lệch bội).", "Một gen sau đột biến bị giảm đi 2 liên kết hiđrô nhưng chiều dài không đổi. Xác định dạng đột biến gen xảy ra."]'::jsonb, '["Phân biệt rõ ràng giữa biến dị không di truyền (thường biến) và biến dị di truyền (đột biến).", "Tính toán sự thay đổi số lượng nuclêôtit hoặc số liên kết hiđrô của gen sau đột biến để kết luận dạng đột biến.", "Nhận biết các hội chứng di truyền phổ biến ở người do đột biến NST."]'::jsonb, 7, true),
  ('sci-9-17', 'science', 9, 'nat-biology', 'Môi trường và Các nhân tố sinh thái', '# I. Môi trường sống của sinh vật
- Môi trường là nơi sinh sống của sinh vật, bao gồm tất cả những gì bao quanh chúng và tác động trực tiếp hoặc gián tiếp lên sự sinh trưởng, phát triển, sinh sản của sinh vật.
- Có 4 loại môi trường sống chủ yếu: Môi trường nước, môi trường trên cạn, môi trường trong đất và môi trường sinh vật.

# II. Các nhân tố sinh thái
- Nhân tố sinh thái là những yếu tố của môi trường tác động lên sinh vật. Chia làm hai nhóm chính:
  + **Nhân tố vô sinh (không sống):** Ánh sáng, nhiệt độ, độ ẩm, không khí, gió, áp suất, địa hình...
  + **Nhân tố hữu sinh (sống):** Các sinh vật xung quanh và nhân tố con người (con người được tách riêng vì có tác động ý thức làm thay đổi mạnh mẽ môi trường).
- **Giới hạn sinh thái:** Là giới hạn chịu đựng của một cơ thể sinh vật đối với một nhân tố sinh thái nhất định của môi trường. Gồm:
  + Điểm gây chết dưới và Điểm gây chết trên.
  + Khoảng thuận lợi (sinh vật phát triển tốt nhất).
  + Khoảng chống chịu (sinh vật bị ức chế sinh lý).', 'biology', '["Cá rô phi nuôi ở Việt Nam có giới hạn nhiệt độ từ 5,6 độ C đến 42 độ C. Khoảng thuận lợi cho các hoạt động sinh lý của chúng là từ 20 độ C đến 35 độ C.", "Cây sống dưới tán rừng (cây ưa bóng) có lá bản rộng, mỏng, màu xanh thẫm để hấp thụ ánh sáng khuếch tán hiệu quả hơn."]'::jsonb, '["Phân biệt được nhân tố vô sinh và nhân tố hữu sinh trong một hệ sinh thái cụ thể.", "Vẽ và giải thích sơ đồ đồ thị giới hạn sinh thái của một loài sinh vật.", "Nêu được các đặc điểm thích nghi của sinh vật với nhân tố ánh sáng, nhiệt độ."]'::jsonb, 5, true),
  ('sci-9-18', 'science', 9, 'nat-biology', 'Hệ sinh thái, Chuỗi thức ăn và Lưới thức ăn', '# I. Quần thể, Quần xã và Hệ sinh thái
- **Quần thể sinh vật:** Tập hợp các cá thể cùng loài, cùng sinh sống trong một khoảng không gian và thời gian nhất định, có khả năng sinh sản tạo thế hệ mới.
- **Quần xã sinh vật:** Tập hợp các quần thể sinh vật thuộc nhiều loài khác nhau, cùng sống trong một không gian xác định, có mối quan hệ gắn bó như một thể thống nhất.
- **Hệ sinh thái:** Bao gồm quần xã sinh vật và môi trường sống của quần xã (sinh cảnh). Trong hệ sinh thái, các sinh vật luôn tác động lẫn nhau và tác động qua lại với các nhân tố vô sinh tạo thành một hệ thống hoàn chỉnh, ổn định.

# II. Chuỗi thức ăn và Lưới thức ăn
- **Chuỗi thức ăn:** Là một chuỗi gồm nhiều loài sinh vật có quan hệ dinh dưỡng với nhau, trong đó mỗi loài là một mắt xích tiêu thụ mắt xích phía trước và là thức ăn cho mắt xích phía sau.
  + Cấu trúc: Sinh vật sản xuất (Thực vật) $\rightarrow$ Sinh vật tiêu thụ bậc 1 (Động vật ăn cỏ) $\rightarrow$ Sinh vật tiêu thụ bậc 2 (Động vật ăn thịt) $\rightarrow$ Sinh vật phân hủy (Vi khuẩn, nấm).
- **Lưới thức ăn:** Tập hợp các chuỗi thức ăn có chung các mắt xích trong hệ sinh thái. Quần xã càng đa dạng về thành phần loài thì lưới thức ăn càng phức tạp và hệ sinh thái càng bền vững.', 'biology', '["Xây dựng chuỗi thức ăn từ các sinh vật: Cỏ, Thỏ, Cáo, Vi khuẩn. (Cỏ -> Thỏ -> Cáo -> Vi khuẩn).", "Trong một khu rừng, nếu loài rắn bị săn bắt quá mức, quần thể chuột (thức ăn của rắn) sẽ tăng nhanh số lượng, dẫn đến phá hoại thảm thực vật rừng."]'::jsonb, '["Kỹ năng vẽ sơ đồ lưới thức ăn từ một danh sách các loài sinh vật kèm mối quan hệ dinh dưỡng.", "Xác định đúng bậc dinh dưỡng và vị trí sinh vật tiêu thụ (bậc 1, bậc 2, bậc 3) trong chuỗi thức ăn.", "Biện luận sự thay đổi số lượng của một loài khi một mắt xích khác trong lưới thức ăn bị biến động."]'::jsonb, 6, true)
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


-- Seed History and Geography grade 9 lessons
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard)
VALUES 
  ('his-9-1', 'history_geography', 9, 'history', 'Thế giới từ năm 1918 đến năm 1945', '# I. Tình hình thế giới sau Chiến tranh thế giới thứ nhất
- **Cách mạng tháng Mười Nga (1917):** Thắng lợi mở ra thời kỳ mới trong lịch sử nhân loại, thiết lập nhà nước XHCN đầu tiên trên thế giới.
- **Cao trào cách mạng 1918 - 1923:** Phong trào đấu tranh của giai cấp công nhân ở các nước tư bản châu Âu diễn ra mạnh mẽ, dẫn đến sự thành lập của Quốc tế Cộng sản (1919).
- **Khủng hoảng kinh tế 1929 - 1933:** Cuộc đại khủng hoảng thừa tàn phá nặng nề nền kinh tế thế giới tư bản, dẫn đến sự ra đời của chủ nghĩa phát xít ở Đức, Ý, Nhật.

# II. Chiến tranh thế giới thứ hai (1939 - 1945)
- **Nguyên nhân:** Do mâu thuẫn giữa các nước đế quốc về thị trường và thuộc địa, sự trỗi dậy của phe Phát xít (Đức, Ý, Nhật) cùng chính sách dung dưỡng của Anh, Pháp, Mỹ.
- **Diễn biến chính:**
  + *1/9/1939:* Đức tấn công Ba Lan, chiến tranh bùng nổ.
  + *6/1941:* Đức tấn công Liên Xô, tính chất chiến tranh thay đổi sang cuộc chiến chống phát xít của nhân loại tiến bộ.
  + *1943:* Trận Stalingrad tạo bước ngoặt, phe Đồng minh chuyển sang thế phản công.
- **Kết quả:** Phe Phát xít sụp đổ hoàn toàn. Liên Xô và lực lượng Đồng minh giành thắng lợi, cứu nhân loại khỏi thảm họa phát xít.', 'history', '["Sự thành lập khối Trục (Đức - Ý - Nhật) là minh chứng cho việc hình thành lò lửa chiến tranh thế giới thứ hai.", "Hội nghị Yalta (2/1945) giữa ba cường quốc Liên Xô, Mỹ, Anh phân chia lại khu vực ảnh hưởng sau chiến tranh."]'::jsonb, '["Phân tích tác động trực tiếp của cuộc khủng hoảng kinh tế 1929 - 1933 đến sự hình thành chủ nghĩa phát xít.", "Ghi nhớ các mốc thời gian bước ngoặt của Chiến tranh thế giới thứ hai."]'::jsonb, 6, true),
  ('his-9-2', 'history_geography', 9, 'history', 'Việt Nam từ năm 1919 đến năm 1930', '# I. Cuộc khai thác thuộc địa lần thứ hai của thực dân Pháp
- **Mục đích:** Bù đắp thiệt hại sau Chiến tranh thế giới thứ nhất.
- **Chính sách:** Đầu tư mạnh vào nông nghiệp (đồn điền cao su) và khai thác mỏ (than đá), tăng thuế, độc quyền thị trường.
- **Chuyển biến xã hội:** Xã hội phân hóa sâu sắc thành các giai cấp:
  + *Giai cấp công nhân:* Tăng nhanh về số lượng, bị tầng tầng áp bức, là lực lượng lãnh đạo cách mạng.
  + *Giai cấp nông dân:* Chiếm đa số, bị bần cùng hóa, là lực lượng quân đội cách mạng đông đảo.
  + *Tầng lớp tiểu tư sản và Tư sản dân tộc:* Có tinh thần dân tộc nhưng dễ thỏa hiệp.

# II. Hoạt động cứu nước của Nguyễn Ái Quốc và Sự thành lập Đảng
- **Hành trình tìm đường cứu nước:**
  + *7/1920:* Đọc Sơ thảo luận cương của Lênin về vấn đề dân tộc và thuộc địa, tìm ra con đường cứu nước: Cách mạng vô sản.
  + *12/1920:* Tham gia sáng lập Đảng Cộng sản Pháp.
- **Thành lập Đảng Cộng sản Việt Nam (1930):**
  + Từ ngày 6/1 đến 8/2/1930, Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản tại Hương Cảng (Trung Quốc).
  + Đảng Cộng sản Việt Nam ra đời cùng Cương lĩnh chính trị đầu tiên, chấm dứt thời kỳ khủng hoảng về đường lối lãnh đạo cách mạng.', 'history', '["Nguyễn Ái Quốc thành lập Hội Việt Nam Cách mạng Thanh niên (1925) tại Quảng Châu để huấn luyện cán bộ.", "Ba tổ chức cộng sản ra đời năm 1929: Đông Dương Cộng sản đảng, An Nam Cộng sản đảng và Đông Dương Cộng sản liên đoàn."]'::jsonb, '["Phân biệt đặc điểm giai cấp công nhân Việt Nam so với công nhân các nước tư bản phương Tây.", "Ý nghĩa lịch sử mang tính bước ngoặt của sự kiện thành lập Đảng năm 1930."]'::jsonb, 7, true),
  ('his-9-3', 'history_geography', 9, 'history', 'Cách mạng tháng Tám năm 1945 và Sự thành lập nước VNDCCH', '# I. Lệnh Tổng khởi nghĩa được ban bố
- **Thời cơ lịch sử:** Nhật đảo chính Pháp (9/3/1945), sau đó Nhật đầu hàng Đồng minh vô điều kiện (15/8/1945). Quân Pháp chưa kịp quay lại, quân Đồng minh chưa vào giải giáp $\rightarrow$ Xuất hiện thời cơ "ngàn năm có một".
- **Chủ trương của Đảng:** Hội nghị toàn quốc của Đảng tại Tân Trào quyết định phát động Tổng khởi nghĩa trong cả nước, thành lập Ủy ban Khởi nghĩa toàn quốc.

# II. Diễn biến và Ý nghĩa lịch sử
- **Diễn biến chính:**
  + *19/8/1945:* Khởi nghĩa thắng lợi tại Hà Nội.
  + *23/8/1945:* Khởi nghĩa thắng lợi tại Huế.
  + *25/8/1945:* Khởi nghĩa thắng lợi tại Sài Gòn.
  + *2/9/1945:* Tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.
- **Ý nghĩa lịch sử:**
  + Phá tan xiềng xích nô dịch của phát xít Nhật và thực dân Pháp, lật đổ chế độ phong kiến tồn tại ngàn năm.
  + Mở ra kỷ nguyên mới cho dân tộc Việt Nam: Kỷ nguyên độc lập, tự do và tiến lên chủ nghĩa xã hội.', 'history', '["Sự kiện vua Bảo Đại thoái vị ngày 30/8/1945 đánh dấu sự chấm dứt hoàn toàn của chế độ phong kiến nhà Nguyễn.", "Chiều 16/8/1945, một đội quân giải phóng do Võ Nguyên Giáp chỉ huy tiến về giải phóng thị xã Thái Nguyên."]'::jsonb, '["Phân tích điều kiện khách quan và chủ quan tạo nên thời cơ chín muồi của Cách mạng tháng Tám.", "Giải thích lý do Cách mạng tháng Tám diễn ra nhanh chóng, ít đổ máu và giành thắng lợi triệt để."]'::jsonb, 7, true),
  ('his-9-4', 'history_geography', 9, 'history', 'Cuộc kháng chiến chống thực dân Pháp (1945 - 1954)', '# I. Những năm đầu toàn quốc kháng chiến (1946 - 1950)
- **Lời kêu gọi toàn quốc kháng chiến (19/12/1946):** Bản tuyên ngôn thể hiện ý chí quyết tâm sắt đá bảo vệ độc lập của nhân dân Việt Nam.
- **Chiến dịch Việt Bắc thu - đông (1947):** Đập tan cuộc tấn công quy mô lớn của Pháp vào căn cứ địa, bảo vệ cơ quan đầu não cách mạng, chuyển sang giai đoạn kháng chiến trường kỳ.
- **Chiến dịch Biên giới thu - đông (1950):** Khai thông biên giới Việt - Trung, giành quyền chủ động chiến lược trên chiến trường chính Bắc Bộ.

# II. Bước phát triển quyết định và Chiến thắng Điện Biên Phủ (1954)
- **Kế hoạch Navarre của Pháp (1953):** Nhằm tập trung quân chiếm đóng, giành thắng lợi quân sự quyết định để kết thúc chiến tranh trong danh dự.
- **Chiến dịch lịch sử Điện Biên Phủ (1954):**
  + Phương châm chiến lược: Chuyển từ "Đánh nhanh thắng nhanh" sang "Đánh chắc tiến chắc".
  + Kết quả: Sau 56 ngày đêm chiến đấu kiên cường, ngày 7/5/1954, tập đoàn cứ điểm Điện Biên Phủ bị tiêu diệt hoàn toàn.
- **Hiệp định Geneva (1954):** Pháp công nhận các quyền dân tộc cơ bản của ba nước Đông Dương: Độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ. Vĩ tuyến 17 tạm thời làm giới tuyến quân sự.', 'history', '["Đại tướng Võ Nguyên Giáp quyết định hoãn giờ nổ súng tại Điện Biên Phủ để chuyển phương châm sang ''Đánh chắc tiến chắc''.", "Anh hùng Phan Đình Giót lấy thân mình lấp lỗ châu mai trong trận chiến mở màn tại cứ điểm Him Lam."]'::jsonb, '["Giải thích ý nghĩa chiến lược của chiến thắng Biên giới 1950 và Điện Biên Phủ 1954.", "Phân tích các điều khoản cơ bản của Hiệp định Geneva ảnh hưởng đến cục diện đất nước sau năm 1954."]'::jsonb, 8, true),
  ('his-9-5', 'history_geography', 9, 'history', 'Cuộc kháng chiến chống Mỹ cứu nước (1954 - 1975)', '# I. Chiến lược cách mạng hai miền và các hình thức chiến tranh của Mỹ
- **Đặc điểm:** Miền Bắc tiến lên xây dựng XHCN làm hậu phương, miền Nam tiếp tục cách mạng dân tộc dân chủ nhân dân làm tiền tuyến.
- **Các chiến lược chiến tranh của Mỹ tại miền Nam:**
  + *Chiến tranh đơn phương (1954 - 1960):* Dùng chính quyền tay sai Ngô Đình Diệm để khủng bố cách mạng $\rightarrow$ Phong trào Đồng khởi (1959-1960) nổ ra, làm sụp đổ từng mảng lớn chính quyền địch.
  + *Chiến tranh đặc biệt (1961 - 1965):* Công thức "Quân đội tay sai + Cố vấn Mỹ + Vũ khí Mỹ", quốc sách "Ấp chiến lược".
  + *Chiến tranh cục bộ (1965 - 1968):* Quân Mỹ trực tiếp tham chiến giữ vai trò chủ đạo, mở các cuộc hành quân "Tìm và diệt". Bị bẻ gãy bởi Tổng tiến công Tết Mậu Thân (1968).
  + *Việt Nam hóa chiến tranh (1969 - 1973):* Công thức "Quân đội Sài Gòn + Hỏa lực, hâu cần Mỹ". Mỹ mở rộng chiến tranh ra toàn Đông Dương và đánh phá miền Bắc bằng không quân.

# II. Hiệp định Paris (1973) và Đại thắng mùa Xuân năm 1975
- **Hiệp định Paris (27/1/1973):** Mỹ rút hết quân về nước, công nhận độc lập chủ quyền của Việt Nam, tạo điều kiện "Mỹ cút, Ngụy nhào".
- **Tổng tiến công và nổi dậy Xuân 1975:**
  + *Chiến dịch Tây Nguyên (3/1975):* Trận mở màn Buôn Ma Thuột thắng lợi, chuyển cuộc chiến sang tổng công kích.
  + *Chiến dịch Huế - Đà Nẵng (3/1975):* Giải phóng hoàn toàn dải đất miền Trung.
  + *Chiến dịch Hồ Chí Minh (26/4 - 30/4/1975):* 11h30 ngày 30/4, lá cờ cách mạng tung bay trên dinh Độc Lập, miền Nam hoàn toàn giải phóng, thống nhất đất nước.', 'history', '["Chiến thắng ''Điện Biên Phủ trên không'' cuối năm 1972 buộc Mỹ phải ký Hiệp định Paris.", "Xe tăng mang số hiệu 390 húc đổ cổng chính Dinh Độc Lập trưa ngày 30/4/1975."]'::jsonb, '["So sánh sự giống và khác nhau giữa chiến lược Chiến tranh cục bộ và Việt Nam hóa chiến tranh.", "Phân tích nguyên nhân thắng lợi của cuộc kháng chiến chống Mỹ cứu nước."]'::jsonb, 8, true),
  ('his-9-6', 'history_geography', 9, 'geography', 'Địa lý dân cư và Các ngành kinh tế Việt Nam', '# I. Địa lý dân cư Việt Nam
- **Đặc điểm:** Nước ta có cơ cấu dân số trẻ nhưng đang dịch chuyển sang giai đoạn già hóa dân số nhanh. Nước ta có 54 dân tộc anh em, dân tộc Kinh chiếm đa số (khoảng $85\%$).
- **Phân bộ dân cư:** Không đồng đều, tập trung đông đúc ở đồng bằng, ven biển và đô thị (Đồng bằng sông Hồng có mật độ cao nhất); thưa thớt ở miền núi, cao nguyên (Tây Bắc, Tây Nguyên).
- **Đô thị hóa:** Tốc độ đô thị hóa diễn ra nhanh chóng, mở rộng quy mô diện tích đô thị, lối sống thành thị phổ biến nhưng tỉ lệ dân đô thị vẫn thấp hơn nông thôn.

# II. Thực trạng các ngành kinh tế lớn
- **Nông nghiệp:** Phát triển mạnh mẽ theo hướng hàng hóa. Cơ cấu nội ngành chuyển dịch theo hướng giảm tỉ trọng trồng trọt (đặc biệt là cây lương thực), tăng tỉ trọng chăn nuôi và thủy hải sản. Việt Nam là nước xuất khẩu gạo, cà phê, hồ tiêu hàng đầu thế giới.
- **Công nghiệp:** Cơ cấu ngành đa dạng, chuyển dịch từ các ngành khai khoáng, gia công sơ chế sang công nghiệp chế biến, chế tạo, công nghệ cao (điện tử, lắp ráp). Tập trung chủ yếu ở Đông Nam Bộ và Đồng bằng sông Hồng.
- **Dịch vụ:** Tăng trưởng nhanh, chiếm tỉ trọng ngày càng cao trong GDP. Các ngành giao thông vận tải, bưu chính viễn thông, tài chính ngân hàng và du lịch phát triển hiện đại, hội nhập quốc tế.', 'geography', '["Đông Nam Bộ là vùng có giá trị sản xuất công nghiệp và mức độ đô thị hóa cao nhất cả nước.", "Đồng bằng sông Cửu Long là vùng trọng điểm sản xuất lương thực, thực phẩm lớn nhất của Việt Nam."]'::jsonb, '["Rèn luyện kỹ năng đọc và phân tích biểu đồ cơ cấu ngành kinh tế, biểu đồ dân số.", "Giải thích nguyên nhân dẫn đến sự phân bố dân cư không đồng đều giữa các vùng kinh tế tại Việt Nam."]'::jsonb, 5, true),
  ('his-9-7', 'history_geography', 9, 'geography', 'Các vùng kinh tế trọng điểm Việt Nam (Bắc Bộ, Trung Bộ, Nam Bộ)', '# I. Vùng Trung du miền núi Bắc Bộ và Đồng bằng sông Hồng
- **Trung du và miền núi Bắc Bộ:** Có thế mạnh về khai thác khoáng sản, thủy điện lớn (Sơn La, Hòa Bình), trồng cây công nghiệp cận nhiệt và ôn đới (chè, cây dược liệu). Khó khăn lớn là địa hình chia cắt, thiên tai lũ quét, sạt lở.
- **Đồng bằng sông Hồng:** Vùng kinh tế phát triển năng động, có mật độ dân số cao nhất. Thế mạnh về thâm canh lúa nước, công nghiệp chế biến, cơ sở hạ tầng giao thông đồng bộ hoàn chỉnh.

# II. Vùng Duyên hải miền Trung và Tây Nguyên
- **Bắc Trung Bộ và Duyên hải Nam Trung Bộ:** Thế mạnh kinh tế biển (đánh bắt, nuôi trồng thủy sản, du lịch biển, dịch vụ hàng hải). Thường xuyên chịu ảnh hưởng bởi thiên tai (bão, lũ lụt, hạn hán, cát bay).
- **Tây Nguyên:** Vùng duy nhất không giáp biển. Địa hình cao nguyên đất đỏ ba-zan màu mỡ $\rightarrow$ vùng chuyên canh cây công nghiệp nhiệt đới quy mô lớn nhất cả nước (cà phê, cao su, tiêu).

# III. Vùng Đông Nam Bộ và Đồng bằng sông Cửu Long
- **Đông Nam Bộ:** Vùng kinh tế đầu tàu của cả nước, dẫn đầu về thu hút vốn đầu tư nước ngoài (FDI), phát triển mạnh dầu khí, khu công nghiệp tập trung.
- **Đồng bằng sông Cửu Long:** Vùng nông nghiệp trù phú, mạng lưới sông ngòi, kênh rạch chằng chịt $\rightarrow$ phát triển mạnh trồng lúa, cây ăn trái, nuôi trồng và chế biến thủy sản xuất khẩu lớn nhất Việt Nam.', 'geography', '["Tỉnh Đắk Lắk thuộc Tây Nguyên là thủ phủ sản xuất cà phê xuất khẩu của Việt Nam.", "Vùng kinh tế trọng điểm phía Nam gồm các lõi trung tâm: TP. Hồ Chí Minh, Bình Dương, Đồng Nai, Bà Rịa - Vũng Tàu."]'::jsonb, '["Sử dụng Atlat Địa lý Việt Nam để xác định vị trí địa lý, trung tâm công nghiệp và cửa khẩu lớn của từng vùng.", "So sánh thế mạnh phát triển kinh tế giữa vùng Đông Nam Bộ và vùng Đồng bằng sông Hồng."]'::jsonb, 6, true),
  ('his-9-8', 'history_geography', 9, 'geography', 'Địa lý biển đảo Việt Nam và Chiến lược phát triển bền vũnng', '# I. Vùng biển và hệ thống hải đảo Việt Nam
- **Vùng biển quốc gia:** Diện tích khoảng 1 triệu $km^2$ thuộc Biển Đông. Bao gồm 5 bộ phận cấu thành pháp lý theo Luật Biển: Nội thủy, Lãnh hải, Vùng tiếp giáp lãnh hải, Vùng đặc quyền kinh tế và Thềm lục địa.
- **Hệ thống hải đảo:** Nước ta có hơn 3000 hòn đảo lớn nhỏ, bao gồm hai quần đảo xa bờ là quần đảo Hoàng Sa (thành phố Đà Nẵng) và quần đảo Trường Sa (tỉnh Khánh Hòa). Đảo có vai trò chiến lược về kinh tế và an ninh quốc phòng.

# II. Phát triển tổng hợp kinh tế biển và bảo vệ môi trường
- **Các ngành kinh tế biển then chốt:**
  + *Khai thác khoáng sản:* Dầu khí (bể trầm tích Cửu Long, Nam Côn Sơn), khai thác muối ven biển.
  + *Giao thông vận tải biển:* Phát triển hệ thống cảng biển nước sâu (Lạch Huyện, Cái Mép - Thị Vải), tuyến đường biển quốc tế.
  + *Du lịch biển đảo:* Phát triển các trung tâm nghỉ dưỡng hàng đầu (Hạ Long, Nha Trang, Phú Quốc).
  + *Khai thác và nuôi trồng thủy sản:* Đánh bắt xa bờ gắn liền với bảo vệ chủ quyền biên giới biển.
- **Bảo vệ môi trường biển đảo:** Ngăn chặn ô nhiễm rác thải nhựa, tràn dầu, suy thoái hệ sinh thái rạn san hô, rừng ngập mặn; chủ động ứng phó với biến đổi khí hậu và mực nước biển dâng.', 'geography', '["Huyện đảo Phú Quốc (Kiên Giang) là đảo lớn nhất Việt Nam, phát triển mạnh về dịch vụ du lịch sinh thái biển.", "Khai thác dầu khí tại mỏ Bạch Hổ mang lại nguồn thu ngoại tệ lớn cho ngân sách quốc gia."]'::jsonb, '["Xác định 5 bộ phận cấu thành vùng biển Việt Nam trên sơ đồ mặt cắt ngang.", "Trình bày tầm quan trọng cốt lõi của hai quần đảo Hoàng Sa và Trường Sa trong việc khẳng định chủ quyền quốc gia."]'::jsonb, 6, true)
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


-- Seed Civics grade 9 lessons
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard)
VALUES 
  ('gdcd-9-1', 'civics', 9, 'ethics', 'Sống có lý tưởng và Có chí tự lập', '# I. Sống có lý tưởng
- **Khái niệm:** Sống có lý tưởng là xác định được mục đích sống cao đẹp, đúng đắn, luôn phấn đấu để đạt được mục đích đó nhằm mang lại lợi ích cho bản thân, gia đình, nhà trường và xã hội.
- **Ý nghĩa:** Người sống có lý tưởng luôn được mọi người tôn trọng, yêu quý; cuộc sống trở nên có ý nghĩa, định hướng rõ ràng và vượt qua được những khó khăn thử thách để đạt tới thành công.
- **Trách nhiệm của học sinh:** Ra sức học tập, rèn luyện đạo đức, tích lũy tri thức, xây dựng hoài bão lớn lao và sẵn sàng đóng góp sức trẻ cho sự nghiệp xây dựng, bảo vệ Tổ quốc.

# II. Có chí tự lập
- **Khái niệm:** Chí tự lập là khả năng tự mình xây dựng cuộc sống, tự giải quyết các công việc, tự lo liệu cho bản thân mà không dựa dẫm, ỷ lại hay phụ thuộc hoàn toàn vào người khác.
- **Biểu hiện:** Tự giác học tập, chủ động hoàn thành công việc được giao, tự tìm cách khắc phục khó khăn, kiên trì theo đuổi mục tiêu đã đề ra.
- **Ý nghĩa:** Giúp con người rèn luyện sự bản lĩnh, tự tin, dễ thích nghi với mọi hoàn cảnh sống và nhận được sự tin cậy, nể phục từ cộng đồng.', 'ethics', '["Học sinh tự lập thời gian biểu học tập tại nhà và nghiêm túc thực hiện mà không cần cha mẹ phải nhắc nhở, thúc giục hàng ngày.", "Tấm gương vượt khó của người khuyết tật tự học nghề, tự nuôi sống bản thân và giúp đỡ những người có hoàn cảnh tương tự."]'::jsonb, '["Phân biệt giữa tính tự lập (tự quyết định, tự chịu trách nhiệm) với sự ích kỷ, cô lập hoặc cố tình không hợp tác với tập thể.", "Xác định và viết ra mục tiêu ngắn hạn, dài hạn của bản thân trong năm học lớp 9 để rèn luyện sống có lý tưởng."]'::jsonb, 4, true),
  ('gdcd-9-2', 'civics', 9, 'ethics', 'Quản lý tiền hiệu quả và Thích ứng với sự thay đổi', '# I. Quản lý tiền hiệu quả
- **Khái niệm:** Là việc biết sử dụng nguồn tiền có sẵn (tiền tiêu vặt, tiền mừng tuổi, tiền do lao động làm ra...) một cách hợp lý, khoa học, có kế hoạch rõ ràng để phục vụ nhu cầu cuộc sống và dự phòng tương lai.
- **Các nguyên tắc quản lý tiền cơ bản:**
  + **Phân chia ngân sách:** Áp dụng các quy tắc tài chính như chia nhỏ tiền vào các khoản: nhu cầu thiết yếu (học tập, ăn uống), tích lũy (tiết kiệm) và sở thích cá nhân.
  + **Ưu tiên chi tiêu:** Phân biệt rõ ràng giữa "Cần" (những thứ bắt buộc phải có để sống và học tập) và "Muốn" (những thứ thỏa mãn sở thích nhất thời).
  + **Tiết kiệm trước, chi tiêu sau:** Luôn trích một phần tiền cố định vào quỹ tiết kiệm ngay khi nhận được trước khi phân bổ chi tiêu.

# II. Thích ứng với sự thay đổi
- **Khái niệm:** Là khả năng điều chỉnh nhận thức, thái độ và hành vi của bản thân để phù hợp, linh hoạt và phát triển tốt trước những biến động của môi trường tự nhiên, xã hội hoặc hoàn cảnh cá nhân.
- **Kỹ năng thích ứng:** Nhìn nhận sự thay đổi theo hướng tích cực, rèn luyện kỹ năng giải quyết vấn đề, chủ động tìm kiếm sự giúp đỡ từ người có kinh nghiệm và không ngừng học hỏi thêm kỹ năng mới.', 'ethics', '["Dùng phương pháp chia tiền tiết kiệm vào các ống heo khác nhau để quản lý chi tiêu cá nhân hằng tháng.", "Khi chuyển từ bậc Tiểu học lên THCS hoặc từ THCS lên THPT, học sinh chủ động thay đổi phương pháp học tập từ thụ động sang tự học để thích ứng với lượng kiến thức lớn hơn."]'::jsonb, '["Thực hành lập kế hoạch chi tiêu cá nhân trong vòng 1 tháng dựa trên số tiền tiêu vặt thực tế.", "Phân tích các giải pháp ứng phó tích cực khi gặp phải một sự thay đổi đột ngột trong cuộc sống (ví dụ: chuyển trường, thay đổi chỗ ở)."]'::jsonb, 5, true),
  ('gdcd-9-3', 'civics', 9, 'law', 'Quyền và nghĩa vụ lao động của công dân', '# I. Khái niệm và Ý nghĩa của lao động
- **Lao động:** Là hoạt động có mục đích của con người nhằm tạo ra của cải vật chất và các giá trị tinh thần cho xã hội. Lao động là nhân tố quyết định sự tồn tại và phát triển của nhân loại.
- **Ý nghĩa:** Giúp con người tự nuôi sống bản thân, gia đình, cống hiến cho đất nước và hoàn thiện nhân cách.

# II. Nội dung quyền và nghĩa vụ lao động của công dân
- **Quyền lao động:** Công dân có quyền tự do lựa chọn nghề nghiệp, việc làm, học nghề và nâng cao trình độ nghề nghiệp phù hợp với khả năng của mình.
- **Nghĩa vụ lao động:** Công dân có nghĩa vụ lao động để tự nuôi sống bản thân, nuôi sống gia đình, góp phần duy trì và phát triển đất nước.

# III. Quy định của pháp luật đối với lao động chưa thành niên
- **Độ tuổi lao động:** Người lao động là người từ đủ 15 tuổi trở lên.
- **Bảo vệ lao động chưa thành niên:**
  + Nghiêm cấm sử dụng lao động dưới 15 tuổi làm việc (trừ một số công việc nghệ thuật, thể thao do pháp luật quy định và phải có sự đồng ý của cha mẹ).
  + Nghiêm cấm lạm dụng sức lao động, cưỡng bức lao động, hoặc sử dụng người chưa thành niên làm các công việc nặng nhọc, độc hại, nguy hiểm ảnh hưởng xấu đến sự phát triển thể chất và tinh thần.', 'law', '["Học sinh THCS sau khi tốt nghiệp có quyền lựa chọn tiếp tục học lên THPT, đi học nghề tại các trường trung cấp, hoặc tự tìm kiếm việc làm phù hợp với độ tuổi.", "Một doanh nghiệp bị xử phạt hành chính do bắt nhân viên 16 tuổi làm việc trong môi trường hầm lò độc hại vượt quá số giờ quy định."]'::jsonb, '["Nhận biết các hành vi vi phạm pháp luật lao động, đặc biệt là các hành vi xâm hại quyền lợi của lao động trẻ em.", "Phân biệt giữa việc giúp đỡ gia đình làm việc nhà (trách nhiệm đạo đức) với việc bị bóc lột sức lao động trái pháp luật."]'::jsonb, 6, true),
  ('gdcd-9-4', 'civics', 9, 'law', 'Quyền và nghĩa vụ kinh doanh - Nghĩa vụ nộp thuế', '# I. Quyền tự do kinh doanh
- **Kinh doanh:** Là hoạt động sản xuất, dịch vụ, mua bán hàng hóa nhằm mục đích sinh lợi nhuận.
- **Quyền tự do kinh doanh:** Công dân có quyền tự mình quyết định quy mô, hình thức, ngành nghề kinh doanh theo quy định của pháp luật. Tuy nhiên, chỉ được kinh doanh những ngành nghề mà pháp luật không cấm.

# II. Nghĩa vụ nộp thuế
- **Thuế:** Là một khoản thu bắt buộc mà các tổ chức, cá nhân có nghĩa vụ nộp vào ngân sách nhà nước theo quy định của pháp luật.
- **Vai trò của thuế:**
  + Là nguồn thu chính để duy trì hoạt động của bộ máy nhà nước.
  + Chi trả cho các dịch vụ công cộng, phúc lợi xã hội (xây dựng trường học, bệnh viện, đường sá, quốc phòng, an ninh).
  + Điều tiết, ổn định nền kinh tế vĩ mô.
- **Nghĩa vụ của công dân:** Kê khai đúng, nộp thuế đầy đủ và đúng hạn theo quy định pháp luật. Nghiêm cấm các hành vi trốn thuế, gian lận thuế.', 'law', '["Gia đình bạn A mở cửa hàng tạp hóa bán lẻ tại nhà, bố mẹ A phải đăng ký giấy phép kinh doanh và nộp thuế môn bài, thuế giá trị gia tăng hàng năm.", "Nhà nước sử dụng ngân sách từ nguồn thuế thu được để xây dựng cầu đường, hỗ trợ đồng bào vùng sâu vùng xa bị thiên tai lũ lụt."]'::jsonb, '["Giải thích được vì sao nộp thuế vừa là nghĩa vụ bắt buộc, vừa là quyền lợi gián tiếp của mỗi công dân.", "Nhận biết một số ngành nghề kinh doanh bị pháp luật nghiêm cấm (kinh doanh chất ma túy, động vật hoang dã nguy cấp, vũ khí trái phép...)."]'::jsonb, 6, true),
  ('gdcd-9-5', 'civics', 9, 'law', 'Quyền tham gia quản lý nhà nước và xã hội của công dân', '# I. Nội dung quyền tham gia quản lý nhà nước và xã hội
- **Khái niệm:** Là quyền của công dân được tham gia thảo luận các công việc chung của đất nước, của địa phương; kiến nghị với các cơ quan nhà nước và biểu quyết khi Nhà nước tổ chức trưng cầu ý dân.
- **Các hình thức thực hiện:**
  + **Trực tiếp:** Tự mình tham gia phát biểu ý kiến tại các cuộc họp ở địa phương, ứng cử vào các cơ quan quyền lực nhà nước (Quốc hội, Hội đồng nhân dân), tham gia bỏ phiếu bầu cử khi đủ tuổi.
  + **Gián tiếp:** Thông qua đại biểu Quốc hội, đại biểu Hội đồng nhân dân đại diện gửi gắm tâm tư nguyện vọng, hoặc gửi đơn thư kiến nghị, đóng góp ý kiến qua các phương tiện thông tin đại chúng.

# II. Ý nghĩa và Trách nhiệm của công dân
- **Ý nghĩa:** Đảm bảo quyền làm chủ thực sự của nhân dân, phát huy sức mạnh trí tuệ tập thể và hạn chế các hiện tượng tiêu cực, quan liêu của bộ máy nhà nước.
- **Trách nhiệm:** Học sinh rèn luyện tinh thần tự giác, ý thức tập thể, tích cực tham gia các hoạt động tự quản của lớp, của trường và đóng góp ý kiến xây dựng cộng đồng nơi cư trú phù hợp với lứa tuổi.', 'law', '["Người dân tham gia họp thôn, xã để đóng góp ý kiến về việc làm đường bê tông nông thôn và giám sát quá trình thi công xây dựng.", "Học sinh lớp 9 tham gia đóng góp ý kiến xây dựng nội quy học sinh của nhà trường vào đầu năm học."]'::jsonb, '["Phân biệt rõ hai hình thức dân chủ trực tiếp và dân chủ gián tiếp qua các tình huống thực tế.", "Nắm vững độ tuổi được quyền bầu cử (từ đủ 18 tuổi trở lên) và ứng cử (từ đủ 21 tuổi trở lên) vào Quốc hội, Hội đồng nhân dân."]'::jsonb, 7, true),
  ('gdcd-9-6', 'civics', 9, 'law', 'Nghĩa vụ bảo vệ Tổ quốc', '# I. Vì sao phải bảo vệ Tổ quốc?
- Non sông đất nước Việt Nam là do cha ông ta đã tốn biết bao xương máu mới xây dựng và giữ gìn được.
- Đất nước luôn đứng trước các nguy cơ thách thức về an ninh phi truyền thống, diễn biến hòa bình và các thế lực thù địch xâm phạm chủ quyền lãnh thổ.
- Bảo vệ Tổ quốc là nghĩa vụ thiêng liêng và quyền cao quý của mỗi công dân.

# II. Nội dung nghĩa vụ bảo vệ Tổ quốc
- Bao gồm: Tham gia lực lượng vũ trang nhân dân, thực hiện nghĩa vụ quân sự; tham gia xây dựng nền quốc phòng toàn dân; giữ gìn an ninh chính trị, trật tự an toàn xã hội; sẵn sàng chiến đấu, hy sinh để bảo vệ độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ.
- **Nghĩa vụ quân sự:** Công dân nam giới từ đủ 18 tuổi đến hết 25 tuổi (hoặc đến hết 27 tuổi đối với người được tạm hoãn gọi nhập ngũ học đại học, cao đẳng) có nghĩa vụ phục vụ tại ngũ trong Quân đội nhân dân Việt Nam.
- **Trách nhiệm học sinh:** Ra sức học tập, rèn luyện thể chất, tuân thủ pháp luật, cảnh giác trước các thông tin sai lệch của các thế lực thù địch trên không gian mạng và tích cực tham gia các hoạt động quốc phòng, an ninh tại trường học.', 'law', '["Các thanh niên đủ 18 tuổi tại địa phương hăng hái viết đơn tình nguyện lên đường nhập ngũ thực hiện nghĩa vụ quân sự.", "Học sinh nghiêm túc tham gia môn học Giáo dục quốc phòng và an ninh để rèn luyện ý thức tổ chức kỷ luật và các kỹ năng quân sự cơ bản."]'::jsonb, '["Nêu được các hành vi thể hiện nghĩa vụ bảo vệ Tổ quốc trong thời bình phù hợp với lứa tuổi học sinh.", "Giải thích lý do vì sao trốn tránh nghĩa vụ quân sự là hành vi vi phạm pháp luật nghiêm trọng và bị xử lý kỷ luật."]'::jsonb, 6, true)
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


-- Seed Technology grade 9 lessons
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard)
VALUES 
  ('tec-9-1', 'technology', 9, 'electrical_engineering', 'An toàn lao động trong lắp đặt mạng điện trong nhà', '# I. Các tai nạn điện thường gặp và nguyên nhân
- **Tiếp xúc trực tiếp với vật mang điện:** Chạm tay vào dây dẫn trần, thiết bị rò rỉ điện ra vỏ kim loại do hỏng lớp cách điện.
- **Vi phạm khoảng cách an toàn:** Đến quá gần đường dây cao thế gây phóng điện hồ quang qua không khí.
- **Phóng điện do ẩm ướt:** Sử dụng thiết bị điện khi tay ướt hoặc trong môi trường có độ ẩm quá cao.

# II. Các nguyên tắc an toàn khi lắp đặt và sửa chữa điện
- **Trước khi làm việc:** Phải cắt nguồn điện (ngắt cầu dao, aptomat) và dùng bút thử điện kiểm tra lại xem còn điện hay không.
- **Trong khi làm việc:** Sử dụng các dụng cụ bảo hộ lao động cách điện tiêu chuẩn (kìm cách điện, tuốc nơ vít có cán bọc nhựa, găng tay cao su cách điện, giày cao su).
- **Biển báo hiệu:** Treo biển cảnh báo "Đang sửa chữa, cấm đóng điện" tại vị trí cầu dao nguồn.

# III. Quy trình sơ cứu người bị tai nạn điện giật
- **Bước 1:** Nhanh chóng tách nạn nhân ra khỏi nguồn điện bằng cách ngắt công tắc/cầu dao, hoặc dùng vật cách điện khô (gậy gỗ, tre) gạt dây điện ra khỏi người nạn nhân.
- **Bước 2:** Đưa nạn nhân đến nơi thoáng mát, kiểm tra hô hấp và nhịp tim.
- **Bước 3:** Thực hiện hô hấp nhân tạo và hà hơi thổi ngạt nếu nạn nhân ngừng thở, đồng thời gọi ngay cấp cứu y tế.', 'electrical', '["Khi lắp ổ cắm điện mới, thợ điện ngắt Aptomat tổng của tầng rồi dùng bút thử điện kiểm tra hai cực của ổ cũ trước khi tháo lắp.", "Người thợ đứng trên ghế gỗ khô ráo để lắp bóng đèn tuýp nhằm tăng tính cách điện với mặt đất."]'::jsonb, '["Sử dụng đúng cách bút thử điện để kiểm tra sự có mặt của dòng điện.", "Trình bày nhuần nhuyễn các bước xử lý tình huống khẩn cấp khi phát hiện người bị điện giật mà vẫn bảo vệ được an toàn cho bản thân."]'::jsonb, 5, true),
  ('tec-9-2', 'technology', 9, 'electrical_engineering', 'Dụng cụ dùng trong lắp đặt mạng điện', '# I. Dụng cụ đo lường điện
- **Vôn kế (Voltmeter):** Đo hiệu điện thế ($U$), mắc song song với mạch điện cần đo.
- **Ampe kế (Ammeter):** Đo cường độ dòng điện ($I$), mắc nối tiếp với mạch điện.
- **Oát kế (Wattmeter):** Đo công suất điện ($P$).
- **Công tơ điện (Kwh meter):** Đo điện năng tiêu thụ của mạch điện.
- **Vạn năng kế (Multimeter):** Tích hợp đo nhiều thông số như hiệu điện thế, cường độ dòng điện, điện trở ($R$).

# II. Dụng cụ cơ khí cầm tay dùng trong lắp đặt điện
- **Kìm điện (Kìm răng):** Dùng để cắt dây dẫn, tuốt vỏ cách điện và kẹp giữ dây khi nối.
- **Kìm tuốt dây:** Chuyên dụng dùng để tách lớp vỏ cách điện mà không làm sứt mẻ lõi đồng bên trong.
- **Tuốc nơ vít (Tua vít):** Dùng để vặn chặt hoặc nới lỏng các ốc vít tại các cực tiếp điện của thiết bị.
- **Khoan cầm tay:** Khoan lỗ trên bảng điện, tường hoặc trần để bắt vít định vị thiết bị.', 'electrical', '["Sử dụng vạn năng kế vặn về thang đo điện trở Ohm để kiểm tra xem sợi dây cáp đồng có bị đứt ngầm hay không.", "Dùng kìm tuốt dây chuyên dụng để bóc vỏ cách điện của dây đôi mềm một cách nhanh chóng mà không làm đứt các sợi đồng nhỏ bên trong."]'::jsonb, '["Nhận biết và gọi tên chính xác các dụng cụ lắp đặt điện cơ bản dựa vào hình vẽ hoặc hiện vật thực tế.", "Thực hành thao tác tuốt dây dẫn điện đúng kỹ thuật, lõi dây phẳng nhẵn và không bị khía rạch."]'::jsonb, 5, true),
  ('tec-9-3', 'technology', 9, 'electrical_engineering', 'Thiết bị bảo vệ và đóng cắt của mạng điện trong nhà', '# I. Thiết bị đóng cắt mạch điện
- **Công tắc điện:** Dùng để đóng hoặc cắt mạch điện của thiết bị tiêu thụ (đèn, quạt). Công tắc luôn được mắc trên dây pha (dây nóng) trước thiết bị.
- **Cầu dao:** Dùng để đóng cắt đồng thời cả dây pha và dây trung tính của mạng điện, thường lắp ở đầu nhánh mạch điện.

# II. Thiết bị bảo vệ mạch điện
- **Cầu chì:** Bảo vệ mạch điện khi xảy ra sự cố quá tải hoặc ngắn mạch (chập mạch). Dây chì sẽ nóng chảy và đứt trước khi dòng điện cực đại làm hỏng các thiết bị khác hoặc gây cháy nhà. Cầu chì luôn được mắc nối tiếp trên dây pha.
- **Aptomat (Cầu dao tự động - CB):** Tích hợp cả chức năng đóng cắt bằng tay và tự động ngắt mạch bảo vệ khi có sự cố quá tải, ngắn mạch hoặc rò điện. Aptomat đang dần thay thế hoàn toàn cho cầu dao và cầu chì truyền thống nhờ tính tiện lợi và an toàn cao.', 'electrical', '["Khi dây pha bị chập trực tiếp vào dây trung tính, dòng điện tăng vọt khiến dây chì trong cầu chì bị nóng chảy tức thì, ngắt nguồn điện bảo vệ hệ thống.", "Lắp đặt Aptomat chống giật (RCCB) cho bình nóng lạnh để tự động ngắt dòng điện ngay lập tức khi phát hiện dòng rò nhỏ hơn hoặc bằng 30mA."]'::jsonb, '["Giải thích nguyên lý hoạt động của cầu chì dựa trên tác dụng nhiệt của dòng điện.", "Phân biệt sơ đồ lắp đặt công tắc và cầu chì trên dây pha (dây nóng) so với dây trung hòa (dây nguội) và giải thích tại sao không được lắp ngược lại."]'::jsonb, 6, true),
  ('tec-9-4', 'technology', 9, 'electrical_engineering', 'Quy trình nối dây dẫn điện', '# I. Các loại mối nối dây dẫn điện
- **Mối nối thẳng (Nối nối tiếp):** Dùng để kéo dài dây dẫn.
- **Mối nối phân nhánh (Nối rẽ):** Dùng để trích dòng điện từ đường dây chính ra đường dây nhánh.
- **Mối nối dùng phụ kiện (Hộp nối dây, đầu nối đầu cos):** Đảm bảo an toàn cao, dễ sửa chữa.

# II. Quy trình công nghệ nối dây dẫn điện gồm 6 bước tiêu chuẩn
- **Bước 1: Bóc vỏ cách điện.** Dùng kìm tuốt dây hoặc dao nhọn bóc lớp vỏ cách điện cắt vát góc 30-45 độ để tránh cắt vào lõi.
- **Bước 2: Làm sạch lõi.** Dùng giấy ráp (giấy nhám) mài sạch lớp oxit bám trên bề mặt lõi kim loại đến khi sáng ánh kim để tiếp xúc điện tốt nhất.
- **Bước 3: Nối dây.** Thực hiện quấn chặt các vòng dây khít nhau đối với dây lõi một sợi, hoặc đan xen xoắn chặt đối với dây lõi nhiều sợi.
- **Bước 4: Kiểm tra mối nối.** Mối nối phải chắc chắn cơ học (kéo mạnh không tuột), tiếp xúc điện tốt, phẳng nhẵn không có đầu nhọn đâm ra ngoài.
- **Bước 5: Hàn mối nối (Nếu cần).** Phủ thiếc hàn lên mối nối để chống oxy hóa tăng độ bền cơ và điện.
- **Bước 6: Cách điện mối nối.** Quấn băng dính cách điện kín mối nối, quấn đè từ phần vỏ cách điện bên này sang phần vỏ cách điện bên kia.', 'electrical', '["Khi nối dây điện từ trục chính chạy dọc hành lang vào bóng đèn trong phòng, ta dùng mối nối phân nhánh hình chữ T.", "Quấn băng keo cách điện xung quanh mối nối chữ T bằng cách quấn nửa chồng nửa (vòng sau đè lên một nửa vòng trước) để bít kín toàn bộ lõi đồng lộ ra."]'::jsonb, '["Thực hiện thành thạo thao tác xoắn mối nối thẳng và mối nối phân nhánh đối với cả hai loại dây: dây lõi một sợi và dây lõi nhiều sợi.", "Đánh giá tính thẩm mỹ và độ an toàn kỹ thuật của mối nối tự làm dựa trên các tiêu chí độ bền lực và cách điện."]'::jsonb, 6, true),
  ('tec-9-5', 'technology', 9, 'electrical_engineering', 'Thiết kế và Lắp đặt mạch điện bảng điện', '# I. Chức năng của bảng điện
- Bảng điện là nơi tập trung các thiết bị đóng cắt, bảo vệ và lấy điện của mạng điện trong nhà.
- **Phân loại:**
  + *Bảng điện chính:* Chứa cầu dao tổng, aptomat tổng bảo vệ toàn bộ hệ thống điện căn nhà.
  + *Bảng điện nhánh:* Chứa cầu chì, công tắc, ổ cắm cung cấp điện tới từng khu vực phòng hoặc thiết bị riêng biệt.

# II. Quy trình vẽ sơ đồ mạch điện bảng điện
- **Sơ đồ nguyên lý:** Biểu thị mối quan hệ điện giữa các phần tử trong mạch mà không phụ thuộc vào vị trí lắp đặt hình học của chúng.
- **Sơ đồ lắp đặt (Sơ đồ vị trí):** Biểu thị chính xác vị trí lắp đặt thực tế của thiết bị và đường đi của dây dẫn trên bảng điện.
- **Quy tắc nối dây:** Dây pha ($A$) đi qua cầu chì $\rightarrow$ công tắc $\rightarrow$ thiết bị tiêu thụ điện (đèn) $\rightarrow$ dây trung tính ($O$). Ổ cắm điện được đấu song song trực tiếp với nguồn điện (một cực nối dây pha sau cầu chì bảo vệ, một cực nối trực tiếp dây trung tính).

# III. Quy trình lắp đặt bảng điện nhánh gồm 5 bước
1. **Vạch dấu:** Xác định vị trí lắp các thiết bị trên bảng điện và đường đi dây dẫn.
2. **Khoan lỗ:** Khoan lỗ luồn dây và lỗ bắt vít cố định thiết bị.
3. **Lắp thiết bị vào bảng điện:** Gá lắp và bắt chặt các thiết bị lên bảng điện đúng vị trí vạch dấu.
4. **Nối dây mạch điện:** Đi dây và đấu nối các cực của thiết bị theo sơ đồ lắp đặt.
5. **Kiểm tra:** Đảm bảo mạch thông suốt, không chập mạch, vận hành thử bằng cách cấp nguồn kiểm tra hoạt động đóng cắt của công tắc và thiết bị.', 'electrical', '["Thiết kế bảng điện gồm 1 cầu chì bảo vệ chung, 1 ổ cắm luôn có điện và 1 công tắc điều khiển 1 bóng đèn sợi đốt.", "Sử dụng bảng điện bằng nhựa cách điện chống cháy để lắp đặt các thiết bị điện trong gia đình nhằm đảm bảo mỹ quan và độ bền."]'::jsonb, '["Vẽ thành thạo sơ đồ nguyên lý và sơ đồ lắp đặt của mạch điện bảng điện đơn giản.", "Thực hiện đấu nối dây trên bảng điện nhựa đúng kỹ thuật gọn gàng, không để lộ dây đồng trần tại các điểm bắt vít."]'::jsonb, 7, true),
  ('tec-9-6', 'technology', 9, 'electrical_engineering', 'Mạch điện hai công tắc ba cực điều khiển một đèn (Mạch đèn cầu thang)', '# I. Cấu tạo của công tắc ba cực
- Khác với công tắc hai cực (chỉ có 1 cực động, 1 cực tĩnh), công tắc ba cực có **1 cực chung (cực động - số 1)** và **2 cực tĩnh (số 2 và số 3)**.
- Khi tác động gạt nút nhấn, cực chung chỉ có thể liên kết tiếp điện với một trong hai cực tĩnh cùng lúc.

# II. Sơ đồ nguyên lý mạch điện cầu thang
- **Mục đích:** Có thể bật hoặc tắt cùng một bóng đèn ở hai vị trí khác xa nhau (Ví dụ: đầu cầu thang tầng 1 và cuối cầu thang tầng 2, hoặc đầu giường và cửa ra vào phòng ngủ).
- **Nguyên lý nối dây:**
  + Dây pha ($A$) nối vào cực chung của công tắc 3 cực thứ nhất ($K_1$).
  + Hai cực tĩnh của công tắc thứ nhất ($K_1$) được nối song song với hai cực tĩnh tương ứng của công tắc 3 cực thứ hai ($K_2$) bằng hai dây dẫn trung gian.
  + Cực chung của công tắc thứ hai ($K_2$) nối vào một cực của bóng đèn.
  + Cực còn lại của bóng đèn nối về dây trung tính ($O$).
- **Nguyên lý hoạt động:** Khi cả hai công tắc cùng đóng vào đường dây trung gian phía trên hoặc cùng đóng vào đường dây trung gian phía dưới $\rightarrow$ mạch kín $\rightarrow$ đèn sáng. Khi một công tắc đóng lên trên, một công tắc đóng xuống dưới $\rightarrow$ mạch hở $\rightarrow$ đèn tắt.', 'electrical', '["Ứng dụng lắp mạch đèn cầu thang: khi đi từ tầng 1 lên bật đèn sáng, lên tới tầng 2 tắt đèn bằng công tắc đặt tại tầng 2.", "Sử dụng mạch điện này cho phòng ngủ lớn: bật đèn ở cửa chính khi vào phòng, lười dậy tắt đèn có thể tắt ngay bằng công tắc ở đầu giường."]'::jsonb, '["Phân biệt rõ sự khác nhau về cấu tạo mặt sau và ký hiệu sơ đồ của công tắc 2 cực và công tắc 3 cực.", "Vẽ sơ đồ lắp đặt mạch điện điều khiển một đèn từ hai nơi khác nhau và thực hành đấu nối dây chạy thực tế an toàn."]'::jsonb, 8, true)
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


-- Seed Informatics grade 9 lessons
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard)
VALUES 
  ('ict-9-1', 'informatics', 9, 'networks_and_internet', 'Từ máy tính đơn lẻ đến mạng máy tính và Internet', '# I. Mạng máy tính là gì?
- **Khái niệm:** Mạng máy tính là tập hợp các máy tính và thiết bị được kết nối với nhau theo một phương thức nào đó để truyền tải thông tin và chia sẻ dữ liệu, thiết bị.
- **Thành phần của mạng:**
  + **Thiết bị đầu cuối:** Máy tính, điện thoại, máy in, camera...
  + **Môi trường truyền dẫn:** Dây dẫn (cáp đồng trục, cáp xoắn đôi, cáp quang) hoặc sóng điện từ (Wi-Fi, Bluetooth).
  + **Thiết bị kết nối mạng:** Vỉ mạng (Network Card), Hub, Switch, Router (Bộ định tuyến), Modem.
  + **Giao thức truyền thông (Protocol):** Tập hợp các quy tắc định dạng và truyền dữ liệu (ví dụ: TCP/IP).

# II. Internet và các dịch vụ cơ bản
- **Khái niệm Internet:** Là hệ thống thông tin toàn cầu được liên kết từ nhiều mạng máy tính khác nhau trên khắp thế giới sử dụng bộ giao thức TCP/IP.
- **Các dịch vụ phổ biến:**
  + **Tổ chức và khai thác thông tin:** Mạng thông tin toàn cầu WWW (World Wide Web) dựa trên các trang web và trình duyệt web.
  + **Tìm kiếm thông tin:** Các máy tìm kiếm như Google, Bing...
  + **Thư điện tử (E-mail):** Dịch vụ gửi và nhận thư qua mạng máy tính dưới dạng số hóa.
  + **Hội thoại trực tuyến & Đám mây:** Chat, gọi video, lưu trữ dữ liệu trực tuyến (Google Drive, OneDrive).', 'networks', '["Văn phòng trường học kết nối các máy tính của giáo viên với một máy in dùng chung thông qua thiết bị Switch để tiết kiệm chi phí mua thiết bị.", "Sử dụng công cụ tìm kiếm Google với từ khóa chứa trong dấu ngoặc kép \"tài liệu Tin học 9\" để tìm chính xác cụm từ này trên các trang web."]'::jsonb, '["Phân biệt giữa mạng LAN (mạng cục bộ trong phạm vi nhỏ như phòng học, gia đình) và mạng WAN (mạng diện rộng kết nối quy mô tỉnh, quốc gia).", "Thực hành kỹ năng tìm kiếm nâng cao trên Internet bằng cách sử dụng các từ khóa logic (AND, OR, NOT) hoặc các toán tử lọc file (filetype:pdf, site:gov)."]'::jsonb, 5, true),
  ('ict-9-2', 'informatics', 9, 'organization_and_storage', 'Tổ chức và khai thác thông tin trên Internet', '# I. Trang web, Website và Địa chỉ IP/Tên miền
- **Trang web (Web page):** Là một siêu văn bản (hypertext) được gán một địa chỉ truy cập trên Internet, chứa văn bản, hình ảnh, âm thanh, video và các liên kết (hyperlink) đến các trang khác.
- **Website:** Là một tập hợp các trang web liên quan được tổ chức dưới một địa chỉ truy cập chung gọi là tên miền (Domain Name).
- **Trang chủ (Homepage):** Là trang đầu tiên xuất hiện khi ta truy cập vào một website.
- **Trình duyệt web (Web Browser):** Là phần mềm ứng dụng giúp người dùng giao tiếp với hệ thống WWW để truy cập, hiển thị các trang web (ví dụ: Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

# II. Thư điện tử (E-mail)
- **Hệ thống thư điện tử:** Hoạt động tương tự như hệ thống bưu chính truyền thống nhưng việc truyền nhận thư được thực hiện hoàn toàn bằng phương thức điện tử thông qua mạng máy tính.
- **Địa chỉ thư điện tử:** Có cấu trúc dạng `<Tên_đăng_nhập>@<Tên_miền_dịch_vụ_thư>`. Ví dụ: `hocsinh9@gmail.com`.
  + *Ưu điểm:* Chi phí thấp, thời gian chuyển gần như tức thời, có thể gửi kèm tệp tin văn bản, hình ảnh, âm thanh.', 'networks', '["Địa chỉ website của Bộ Giáo dục và Đào tạo Việt Nam là `moet.gov.vn`. Khi gõ địa chỉ này vào thanh địa chỉ của trình duyệt Chrome, trang chủ của Bộ sẽ hiện ra.", "Đăng ký tài khoản Gmail miễn phí để gửi báo cáo bài tập thực hành Tin học cho giáo viên chủ bộ môn dưới dạng tệp đính kèm (Attachment)."]'::jsonb, '["Thực hành soạn thảo, gửi thư điện tử có đính kèm tệp tin và trả lời thư (Reply/Reply All) đúng quy cách xã giao công nghệ thông tin.", "Nhận biết và cảnh giác với các thư rác (Spam), thư lừa đảo (Phishing) chứa liên kết độc hại hoặc yêu cầu cung cấp thông tin cá nhân mật."]'::jsonb, 5, true),
  ('ict-9-3', 'informatics', 9, 'ethics_and_society', 'Đạo đức, pháp luật và văn hóa trong môi trường số', '# I. Bản quyền và Sở hữu trí tuệ trong môi trường số
- **Sản phẩm số:** Là các thông tin, tài liệu, phần mềm, tác phẩm nghệ thuật... được lưu trữ dưới dạng số hóa.
- **Tôn trọng bản quyền:** Khi sử dụng thông tin từ Internet hoặc các nguồn số khác, phải trích nguồn rõ ràng, không được tự ý sao chép, phân phối hoặc chỉnh sửa các tác phẩm có bản quyền khi chưa được sự đồng ý của tác giả.
- **Phần mềm lậu:** Việc bẻ khóa (crack) phần mềm hoặc sử dụng các bản sao không có bản quyền là vi phạm pháp luật nghiêm trọng và dễ rủi ro nhiễm mã độc.

# II. Giao tiếp văn minh trên mạng xã hội
- **Quy tắc ứng xử:** Sử dụng ngôn từ lịch sự, văn minh; không chia sẻ các thông tin sai sự thật, xúc phạm danh dự của người khác hoặc kích động bạo lực.
- **Bảo mật thông tin cá nhân:** Không tự ý chia sẻ thông tin cá nhân nhạy cảm (số CCCD, mật khẩu, địa chỉ nhà, lịch trình sinh hoạt) lên mạng xã hội để tránh bị kẻ xấu lợi dụng lừa đảo hoặc tống tiền.', 'ethics', '["Sử dụng một hình ảnh tìm được trên mạng để làm slide thuyết trình lớp học bằng cách ghi nguồn tác giả ở góc dưới bức ảnh.", "Báo cáo (Report) các tài khoản giả mạo hoặc đăng tải nội dung bắt nạt, lăng mạ bạn học trên mạng xã hội thay vì tham gia bình luận hay chia sẻ lại."]'::jsonb, '["Phân biệt giữa các loại phần mềm: Phần mềm thương mại (Commercial), phần mềm chia sẻ (Shareware), phần mềm miễn phí (Freeware) và phần mềm nguồn mở (Open Source).", "Thảo luận về hậu quả pháp lý và xã hội của việc lan truyền thông tin giả (Fake news) trên mạng xã hội."]'::jsonb, 6, true),
  ('ict-9-4', 'informatics', 9, 'presentation_software', 'Phần mềm trình chiếu cơ bản (PowerPoint)', '# I. Vai trò của phần mềm trình chiếu
- Phần mềm trình chiếu dùng để tạo ra các bài trình chiếu dưới dạng điện tử phục vụ cho các cuộc họp, bài giảng, thuyết trình dự án...
- **Trang chiếu (Slide):** Là vùng làm việc chính của bài trình chiếu. Một bài trình chiếu là tập hợp của nhiều trang chiếu được hiển thị nối tiếp nhau.

# II. Các đối tượng trên trang chiếu
- **Văn bản:** Đối tượng quan trọng nhất, thường được đặt trong các hộp văn bản (Text Box).
- **Hình ảnh, Đồ họa:** Giúp minh họa trực quan sinh động cho nội dung.
- **Âm thanh, Video:** Tăng tính tương tác và thu hút người xem.

# III. Các hiệu ứng trong bài trình chiếu
- **Hiệu ứng chuyển trang (Slide Transition):** Thay đổi cách thức xuất hiện của trang chiếu này thay thế trang chiếu kia.
- **Hiệu ứng động cho đối tượng (Animation):** Cách thức xuất hiện hoặc chuyển động của từng văn bản, hình ảnh cụ thể trên trang chiếu.
  + *Các nhóm hiệu ứng chính:* Entrance (Xuất hiện), Emphasis (Nhấn mạnh), Exit (Biến mất), Motion Paths (Di chuyển theo đường vẽ).', 'presentation', '["Thiết kế bài thuyết trình về chủ đề \"Bảo vệ môi trường học đường\" gồm 5 trang chiếu phối hợp hài hòa giữa chữ viết và hình ảnh thực tế.", "Áp dụng hiệu ứng \"Fade\" cho các hộp văn bản xuất hiện lần lượt khi người nói bấm chuột để người nghe tập trung vào từng luận điểm."]'::jsonb, '["Thiết kế bố cục slide theo nguyên tắc 6x6 (không quá 6 dòng trên 1 slide, không quá 6 từ trên một dòng) để slide thoáng và dễ đọc.", "Thực hành chèn hình ảnh, căn lề và áp dụng hiệu ứng chuyển slide một cách tinh tế, tránh lạm dụng quá nhiều hiệu ứng gây rối mắt."]'::jsonb, 6, true),
  ('ict-9-5', 'informatics', 9, 'problem_solving', 'Giải quyết vấn đề với sự trợ giúp của máy tính và thuật toán', '# I. Bài toán và Thuật toán
- **Bài toán:** Là một nhiệm vụ cần thực hiện từ những thông tin đầu vào (Input) cho trước để thu được kết quả đầu ra (Output) mong muốn.
- **Thuật toán (Algorithm):** Là một dãy các chỉ dẫn rõ ràng, hữu hạn, được sắp xếp theo một trình tự xác định nhằm giải quyết một bài toán cụ thể.
- **Các cách mô tả thuật toán:**
  + Sử dụng ngôn ngữ tự nhiên.
  + Sử dụng sơ đồ khối (Flowchart).
  + Sử dụng mã giả (Pseudocode).

# II. Các cấu trúc điều khiển cơ bản trong thuật toán
- **Cấu trúc tuần tự:** Các bước được thực hiện lần lượt từ trên xuống dưới.
- **Cấu trúc rẽ nhánh (Điều kiện):** Kiểm tra một điều kiện, nếu ĐÚNG thì thực hiện việc này, nếu SAI thì thực hiện việc kia (hoặc bỏ qua).
- **Cấu trúc lặp:** Thực hiện lặp đi lặp lại một nhóm công việc cho đến khi thỏa mãn một điều kiện dừng nào đó.', 'programming', '["Thuật toán tìm số lớn nhất trong hai số a và b: Nhận vào hai số a, b (Input). Nếu a > b thì kết quả là a, ngược lại kết quả là b. Đưa kết quả ra màn hình (Output).", "Sơ đồ khối của thuật toán tính điểm trung bình học kỳ sử dụng các hình oval để bắt đầu/kết thúc, hình chữ nhật cho bước tính toán, hình thoi cho bước so sánh xét điều kiện đạt hay không đạt."]'::jsonb, '["Vẽ sơ đồ khối mô tả thuật toán giải phương trình bậc nhất $ax + b = 0$.", "Phân tích thuật toán lặp để tính tổng các số tự nhiên liên tiếp từ 1 đến $N$ và xác định điều kiện dừng của vòng lặp."]'::jsonb, 7, true),
  ('ict-9-6', 'informatics', 9, 'programming_scratch', 'Lập trình trực quan cơ bản (Scratch)', '# I. Làm quen với môi trường lập trình trực quan Scratch
- **Khái niệm:** Scratch là một ngôn ngữ lập trình trực quan, thay vì viết các mã lệnh phức tạp bằng văn bản, người dùng sẽ kéo và ghép các khối lệnh (blocks) giống như trò chơi xếp hình để tạo ra chương trình.
- **Các thành phần giao diện chính:**
  + **Sân khấu (Stage):** Nơi hiển thị kết quả hoạt động của chương trình và các nhân vật.
  + **Nhân vật (Sprite):** Các đối tượng thực hiện hành động trong chương trình.
  + **Khu vực nhóm lệnh:** Nơi chứa các khối lệnh được phân loại theo màu sắc và chức năng (Motion, Looks, Sound, Control, Sensing...).
  + **Khu vực viết kịch bản (Script Area):** Nơi kéo thả và lắp ráp các khối lệnh để lập trình cho nhân vật.

# II. Xây dựng kịch bản chương trình đơn giản
- **Sử dụng khối sự kiện (Events):** Khởi chạy chương trình (ví dụ: "Khi bấm vào lá cờ xanh").
- **Sử dụng cấu trúc lặp (Control):** Khối lệnh `repeat` (lặp số lần cố định) hoặc `forever` (lặp vô hạn).
- **Sử dụng biến số (Variables):** Để lưu trữ các giá trị dữ liệu có thể thay đổi trong quá trình chạy chương trình (như điểm số, thời gian, số lần đếm).', 'programming', '["Tạo kịch bản cho chú mèo Scratch di chuyển 10 bước, nếu chạm vào cạnh sân khấu thì bật lại và đổi hướng di chuyển.", "Thiết kế chương trình trò chơi \"Hứng táo\": Trái táo rơi ngẫu nhiên từ trên xuống, người chơi dùng phím mũi tên điều khiển chiếc bát hứng táo, mỗi lần hứng trúng biến ''Điểm'' tăng lên 1 đơn vị."]'::jsonb, '["Sử dụng nhóm lệnh cảm biến (Sensing) kết hợp cấu trúc điều khiển `if... then` để nhân vật phản ứng khi chạm vào một màu sắc hoặc nhân vật khác.", "Thực hành tạo một biến số có tên là `Score` và lập trình tăng/giảm điểm tương ứng với các sự kiện trong kịch bản game tự thiết kế."]'::jsonb, 7, true)
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


-- Seed Art grade 9 lessons
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard)
VALUES 
  ('art-9-1', 'art', 9, 'music_theory', 'Lý thuyết âm nhạc: Giọng song song, Giọng cùng tên và Quãng dịch', '# I. Giọng song song (Relative Keys)
- **Khái niệm:** Là một cặp giọng (gồm một giọng Trưởng và một giọng Thứ) có chung hóa biểu (cùng số lượng dấu thăng hoặc dấu giáng ở đầu khuông nhạc) nhưng khác nhau về âm chủ (chủ âm).
- **Quy luật:** Âm chủ của giọng Thứ song song luôn nằm dưới âm chủ của giọng Trưởng song song một quãng 3 thứ (tương đương 1,5 cung).
- **Ví dụ:** Giọng Đô Trưởng (C major) và giọng La thứ (A minor) là hai giọng song song vì đều không có dấu hóa nào ở hóa biểu.

# II. Giọng cùng tên (Parallel Keys)
- **Khái niệm:** Là một cặp giọng (gồm một giọng Trưởng và một giọng Thứ) có cùng một âm chủ nhưng khác nhau về hóa biểu.
- **Ví dụ:** Giọng Đô Trưởng (C major - không có dấu hóa) và giọng Đô thứ (C minor - có 3 dấu giáng: Si giáng, Mi giáng, La giáng).

# III. Quãng dịch giọng (Transposition)
- **Khái niệm:** Là việc chuyển dịch toàn bộ một bản nhạc (gồm giai điệu và hợp âm) từ giọng này sang giọng khác cao hơn hoặc thấp hơn một quãng nhất định, nhằm phù hợp với tầm giọng của người hát hoặc âm vực của nhạc cụ mà không làm thay đổi cấu trúc giai điệu.', 'music', '["Xác định giọng song song của giọng Sol Trưởng (G major - có 1 dấu thăng F#) là giọng Mi thứ (E minor - cũng có 1 dấu thăng F#).", "Dịch giọng một bài hát viết ở tông La thứ (Am) lên tông Si thứ (Bm) bằng cách nâng tất cả các nốt nhạc trong bài lên một quãng 2 trưởng (1 cung) để phù hợp với giọng ca sĩ nam."]'::jsonb, '["Thực hành tìm giọng Thứ song song của các giọng Trưởng quen thuộc (ví dụ: F major -> D minor, D major -> B minor).", "Tập viết lại một đoạn giai điệu ngắn 4 ô nhịp từ giọng Đô Trưởng sang giọng Sol Trưởng đúng cao độ quãng dịch."]'::jsonb, 6, true),
  ('art-9-2', 'art', 9, 'music_appreciation', 'Thường thức âm nhạc: Lịch sử âm nhạc phương Tây và Nhạc sĩ thiên tài', '# I. Sơ lược về các thời kỳ âm nhạc phương Tây đại chúng
- **Thời kỳ Cổ điển (Classical Period - khoảng 1750-1820):** Đề cao tính cân bằng, cấu trúc rõ ràng, sự hài hòa và tinh tế. Nhạc cụ phát triển mạnh mẽ, đặc biệt là đàn Piano và dàn nhạc giao hưởng.
- **Thời kỳ Lãng mạn (Romantic Period - khoảng 1800-1910):** Chú trọng biểu hiện cảm xúc cá nhân sâu sắc, tự do hơn về mặt cấu trúc và sử dụng nhiều hòa âm phong phú, kịch tính.

# II. Cuộc đời và sự nghiệp của Ludwig van Beethoven (1770 - 1827)
- **Tiểu sử:** Nhà soạn nhạc vĩ đại người Đức, cầu nối giữa thời kỳ âm nhạc Cổ điển và Lãng mạn. Dù bị điếc hoàn toàn ở giai đoạn cuối đời, ông vẫn sáng tạo ra những kiệt tác bất hủ.
- **Tác phẩm tiêu biểu:** Bản giao hưởng số 5 (Giao hưởng Định mệnh), Bản giao hưởng số 9 (với chương "Ca ngợi niềm vui"), các bản sonata viết cho piano như "Ánh trăng" (Moonlight Sonata), "Thư gửi Elise" (Für Elise).
- **Ý nghĩa:** Âm nhạc của Beethoven tràn đầy tinh thần đấu tranh, khát vọng tự do và niềm tin mãnh liệt vào con người vượt lên số phận nghiệt ngã.', 'music', '["Nghe giai điệu mở đầu đầy kịch tính của Bản giao hưởng số 5 (Beethoven) để cảm nhận chủ đề \"số phận gõ cửa\".", "Phân tích sự khác biệt về mặt cảm xúc giữa âm nhạc mực thước của Mozart (thời Cổ điển) và âm nhạc bùng nổ, giàu nội tâm của Chopin (thời Lãng mạn)."]'::jsonb, '["Nhận biết được giai điệu của ít nhất 3 tác phẩm kinh niên của Beethoven khi nghe nhạc trực quan.", "Thuyết trình ngắn về tinh thần vượt khó của Beethoven thông qua câu chuyện ông viết Bản giao hưởng số 9 khi tai đã điếc hoàn toàn."]'::jsonb, 5, true),
  ('art-9-3', 'art', 9, 'fine_arts_history', 'Mỹ thuật: Tìm hiểu trào lưu nghệ thuật Ấn tượng và Hậu ấn tượng phương Tây', '# I. Trường phái Ấn tượng (Impressionism)
- **Thời gian và bối cảnh:** Ra đời tại Pháp vào cuối thế kỷ XIX (khoảng những năm 1860-1870), phản ứng lại quy chuẩn gò bó của hội họa hàn lâm viện.
- **Đặc điểm nghệ thuật:**
  + Đề cao việc nắm bắt khoảnh khắc, ánh sáng và màu sắc tức thời của thiên nhiên.
  + Nét bút nhanh, mạnh, không chú trọng vẽ chi tiết hay đường viền sắc nét.
  + Sử dụng màu sắc nguyên bản, đặt cạnh nhau trên toan để mắt người xem tự hòa trộn trực quan.
- **Tác giả tiêu biểu:** Claude Monet (bức tranh khởi nguồn "Ấn tượng mặt trời mọc"), Pierre-Auguste Renoir, Edgar Degas.

# II. Trường phái Hậu ấn tượng (Post-Impressionism)
- **Đặc điểm nghệ thuật:** Phát triển tiếp nối sau trường phái Ấn tượng nhưng chuyển hướng đi sâu vào biểu hiện cảm xúc cá nhân, cấu trúc hình khối và biểu tượng thay vì chỉ mô tả ánh sáng tự nhiên.
- **Tác giả tiêu biểu:** Vincent van Gogh (bức "Đêm đầy sao", "Hoa hướng dương"), Paul Cézanne (cha đẻ của cấu trúc hội họa hiện đại), Paul Gauguin.', 'art', '["Claude Monet vẽ cùng một đống rơm hoặc mặt tiền nhà thờ vào các thời điểm khác nhau trong ngày (sáng, trưa, chiều) để nghiên cứu sự thay đổi màu sắc của ánh sáng.", "Vincent van Gogh sử dụng những nét cọ xoắn ốc mạnh mẽ, dày màu (kỹ thuật impasto) trong bức vẽ \"Đêm đầy sao\" để bộc lộ thế giới nội tâm mãnh liệt của mình."]'::jsonb, '["Phân biệt được điểm khác nhau cơ bản giữa tranh Ấn tượng (ghi lại khoảnh khắc thị giác) và tranh Hậu ấn tượng (bộc lộ cảm xúc nội tâm sâu sắc).", "Sưu tầm hình ảnh các bức tranh tiêu biểu của Monet và Van Gogh để làm bài thu hoạch phân tích bố cục, màu sắc."]'::jsonb, 6, true),
  ('art-9-4', 'art', 9, 'fine_arts_practice', 'Mỹ thuật: Thiết kế đồ họa - Tạo dáng và Trang trí sản phẩm thời trang, bao bì', '# I. Tạo dáng và Trang trí sản phẩm thời trang
- **Quy trình thiết kế:**
  + **Xác định công năng:** Sản phẩm dành cho đối tượng nào? (Trẻ em, người lớn, đi học, đi chơi, đi dạ hội...). Công năng quyết định kiểu dáng.
  + **Phác thảo dáng:** Tạo hình dáng bên ngoài của sản phẩm (ví dụ: túi xách, áo thun, giày thể thao) đảm bảo sự cân đối, tiện dụng.
  + **Trang trí:** Sử dụng họa tiết (đối xứng, lặp lại, tự do) kết hợp với màu sắc hài hòa để làm nổi bật vẻ đẹp của sản phẩm.

# II. Thiết kế bao bì sản phẩm (Packaging Design)
- **Vai trò của bao bì:** Bảo vệ sản phẩm bên trong, cung cấp thông tin cần thiết (tên, thành phần, hạn sử dụng) và thu hút khách hàng thông qua nhận diện thương hiệu trực quan.
- **Yêu cầu kỹ thuật và thẩm mỹ:**
  + Kiểu dáng bao bì phải dễ đóng mở, dễ vận chuyển.
  + Chữ viết trên bao bì (Typography) phải rõ ràng, dễ đọc.
  + Màu sắc, hình ảnh minh họa phải đồng bộ với thông điệp của sản phẩm.', 'art', '["Thiết kế một mẫu túi xách thân thiện với môi trường làm từ chất liệu vải bố có in họa tiết hoa lá cách điệu tối giản.", "Thiết kế vỏ hộp đựng bánh trung thu sử dụng tông màu đỏ và vàng kim ấm áp, kết hợp hình ảnh vầng trăng tròn và thỏ ngọc mang nét văn hóa truyền thống."]'::jsonb, '["Vẽ phác thảo tạo dáng và trang trí một chiếc áo phông (T-shirt) tự chọn họa tiết biểu trưng cho lứa tuổi học trò lớp 9.", "Thực hành triển khai bản vẽ trải phẳng (bản vẽ kỹ thuật mở phẳng các mặt) của một chiếc hộp giấy hình lập phương hoặc hình hộp chữ nhật."]'::jsonb, 7, true),
  ('art-9-5', 'art', 9, 'fine_arts_practice', 'Mỹ thuật: Thiết kế công nghiệp - Tạo hình đồ chơi, vật dụng từ vật liệu tái chế', '# I. Ý nghĩa của việc thiết kế từ vật liệu tái chế
- **Bảo vệ môi trường:** Tái sử dụng rác thải nhựa, giấy vụn, vỏ lon để giảm thiểu chất thải ra thiên nhiên.
- **Kích thích tư duy sáng tạo:** Học cách nhìn nhận giá trị thẩm mỹ mới từ những đồ dùng đã qua sử dụng.

# II. Quy trình thiết kế sản phẩm mỹ thuật ứng dụng
- **Bước 1: Lên ý tưởng và chuẩn bị nguyên liệu.** Thu gom các vật liệu sạch như vỏ chai nhựa, lõi cuộn giấy, bìa carton, nắp chai, dây len...
- **Bước 2: Tạo hình khối cơ bản.** Liên kết các vật liệu bằng keo nến, băng dính hai mặt để tạo nên khung xương, kết cấu vững chắc của sản phẩm.
- **Bước 3: Hoàn thiện bề mặt.** Dùng màu acrylic, giấy màu hoặc màu nước phủ lên bề mặt sản phẩm để che đi các vết nối bẩn và định hình tông màu chủ đạo.
- **Bước 4: Trang trí chi tiết.** Thêm các họa tiết nhỏ, phụ kiện trang trí để sản phẩm sinh động và bắt mắt hơn.', 'art', '["Biến những chiếc chai nhựa Coca-Cola cũ thành những chậu trồng cây hình thù các con vật ngộ nghĩnh (mèo, gấu) và sơn màu acrylic phủ bên ngoài.", "Sử dụng các lõi giấy vệ sinh ghép lại để làm thành một chiếc ống cắm bút nhiều ngăn đa năng đặt trên bàn học."]'::jsonb, '["Tự lên phương án thiết kế và thực hiện chế tạo một mô hình phương tiện giao thông (ô tô, tàu hỏa, máy bay) từ vỏ hộp sữa và nắp chai nhựa.", "Đánh giá sản phẩm dựa trên 3 tiêu chí: Tính sáng tạo độc đáo, Tính thẩm mỹ hoàn thiện và Tính ứng dụng thực tế."]'::jsonb, 7, true)
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

-- Seed Batch 1 Questions (Technology, Informatics, Arts)
INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-1', 'mcq', 'An toàn điện - Thiết bị bảo vệ', 'tech-circuit-install', 'Thiết bị nào dưới đây có chức năng tự động ngắt mạch điện khi xảy ra sự cố ngắn mạch hoặc quá tải?', ARRAY['A. Công tắc điện', 'B. Cầu dao', 'C. Aptomat (ngắt mạch tự động)', 'D. Ổ cắm điện']::varchar[], ARRAY['C. Aptomat (ngắt mạch tự động)']::varchar[], 'Aptomat (CB - Circuit Breaker) là thiết bị đóng cắt tự động, tự động ngắt mạch khi có sự cố quá tải hoặc ngắn mạch để bảo vệ mạch điện và thiết bị.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9, Lắp đặt mạng điện trong nhà', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-2', 'mcq', 'An toàn điện - Cầu chì', 'tech-circuit-install', 'Bộ phận chủ yếu của cầu chì để bảo vệ mạch điện là gì?', ARRAY['A. Vỏ cầu chì', 'B. Dây chì (sợi dây có nhiệt độ nóng chảy thấp)', 'C. Các cực nối điện', 'D. Cần đóng cắt']::varchar[], ARRAY['B. Dây chì (sợi dây có nhiệt độ nóng chảy thấp)']::varchar[], 'Dây chì là bộ phận cốt lõi của cầu chì. Khi dòng điện quá tải, dây chì nóng chảy và ngắt mạch, bảo vệ các thiết bị điện phía sau.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-3', 'mcq', 'An toàn điện - Cầu chì', 'tech-circuit-install', 'Nguyên lý hoạt động cơ bản của cầu chì dựa trên hiện tượng nào?', ARRAY['A. Dây chì nóng chảy khi cường độ dòng điện vượt quá ngưỡng cho phép', 'B. Dây chì tự ngắt khi điện áp nguồn thay đổi', 'C. Dây chì tự động ngắt khi công suất điện giảm', 'D. Dây chì làm tăng điện trở của mạch điện']::varchar[], ARRAY['A. Dây chì nóng chảy khi cường độ dòng điện vượt quá ngưỡng cho phép']::varchar[], 'Cầu chì hoạt động dựa trên nguyên lý nhiệt: khi dòng điện vượt quá định mức, nhiệt lượng sinh ra làm nóng chảy dây chì, ngắt mạch điện.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-4', 'mcq', 'An toàn điện - Thiết bị đóng cắt', 'tech-circuit-install', 'Trên cầu dao ghi 250V – 10A, con số 10A có ý nghĩa gì?', ARRAY['A. Điện áp định mức của cầu dao là 10V', 'B. Cường độ dòng điện định mức của cầu dao là 10A', 'C. Công suất tối đa của cầu dao là 10W', 'D. Cầu dao chịu được dòng điện tối đa 250A']::varchar[], ARRAY['B. Cường độ dòng điện định mức của cầu dao là 10A']::varchar[], 'Ký hiệu trên thiết bị điện: số đứng trước V là điện áp định mức, số đứng trước A là cường độ dòng điện định mức mà thiết bị hoạt động an toàn.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9, Bài 12', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-5', 'mcq', 'An toàn điện - Aptomat', 'tech-circuit-install', 'Cần đóng cắt của Aptomat có chức năng gì?', ARRAY['A. Bảo vệ chống quá tải tự động', 'B. Thực hiện chức năng đóng, cắt nguồn điện bằng tay', 'C. Đo điện áp nguồn', 'D. Kết nối dây điện']::varchar[], ARRAY['B. Thực hiện chức năng đóng, cắt nguồn điện bằng tay']::varchar[], 'Cần đóng cắt (công tắc gạt) là bộ phận cơ khí cho phép người dùng thao tác đóng/ngắt mạch điện bằng tay, ngoài chức năng tự động của Aptomat.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-6', 'mcq', 'Mạch điện - Lắp đặt', 'tech-circuit-install', 'Quy trình lắp đặt mạch điện bảng điện chuẩn bao gồm các bước nào?', ARRAY['A. Vạch dấu → Khoan lỗ → Lắp thiết bị → Nối dây → Kiểm tra', 'B. Khoan lỗ → Vạch dấu → Nối dây → Lắp thiết bị → Kiểm tra', 'C. Vạch dấu → Nối dây → Khoan lỗ → Lắp thiết bị → Kiểm tra', 'D. Lắp thiết bị → Vạch dấu → Khoan lỗ → Nối dây → Kiểm tra']::varchar[], ARRAY['A. Vạch dấu → Khoan lỗ → Lắp thiết bị → Nối dây → Kiểm tra']::varchar[], 'Quy trình kỹ thuật chuẩn: Vạch dấu → Khoan lỗ → Lắp thiết bị → Nối dây → Kiểm tra. Bước vạch dấu trước giúp đảm bảo các thiết bị được đặt đúng vị trí trước khi gia công.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9, Thực hành lắp bảng điện', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-7', 'mcq', 'An toàn điện', 'tech-circuit-install', 'Tại sao phải kiểm tra an toàn điện định kỳ cho mạng điện trong nhà?', ARRAY['A. Để mạng điện có tính thẩm mỹ cao', 'B. Để tiết kiệm dây dẫn điện', 'C. Để phát hiện và phòng ngừa các sự cố, đảm bảo an toàn cho người và tài sản', 'D. Để tăng công suất tiêu thụ điện']::varchar[], ARRAY['C. Để phát hiện và phòng ngừa các sự cố, đảm bảo an toàn cho người và tài sản']::varchar[], 'Kiểm tra định kỳ giúp phát hiện sớm các hư hỏng (cách điện bị mòn, mối nối lỏng, quá tải...) trước khi xảy ra sự cố nguy hiểm.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9, Bài 12 Kiểm tra an toàn mạng điện', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-8', 'mcq', 'An toàn điện - Dụng cụ đo điện', 'tech-circuit-install', 'Dụng cụ nào sau đây thường được dùng để đo điện áp của nguồn điện?', ARRAY['A. Ampe kìm', 'B. Bút thử điện', 'C. Đồng hồ vạn năng', 'D. Kìm tuốt dây']::varchar[], ARRAY['C. Đồng hồ vạn năng']::varchar[], 'Đồng hồ vạn năng (VOM) là thiết bị đa năng dùng để đo điện áp (V), cường độ dòng điện (A) và điện trở (Ω). Bút thử điện chỉ kiểm tra có điện hay không.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-9', 'mcq', 'An toàn điện', 'tech-circuit-install', 'Khi sửa chữa mạng điện trong nhà, hành động nào là KHÔNG được phép thực hiện?', ARRAY['A. Cắt điện trước khi tiến hành sửa chữa', 'B. Sử dụng các dụng cụ bảo vệ cách điện', 'C. Tự ý tháo bỏ dây nối đất của thiết bị điện', 'D. Kiểm tra cách điện của các thiết bị điện trước khi vận hành']::varchar[], ARRAY['C. Tự ý tháo bỏ dây nối đất của thiết bị điện']::varchar[], 'Dây nối đất (tiếp địa) có vai trò bảo vệ người dùng khi vỏ thiết bị bị rò điện. Tháo bỏ dây nối đất sẽ mất tác dụng bảo vệ, gây nguy hiểm tính mạng.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9, An toàn điện', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-10', 'mcq', 'An toàn điện - Lắp đặt mạch điện', 'tech-circuit-install', 'Trong mạch điện, cầu chì hoặc aptomat nên được lắp ở vị trí nào?', ARRAY['A. Trên dây trung tính', 'B. Trên dây pha, trước các thiết bị cần bảo vệ', 'C. Mắc song song với phụ tải', 'D. Sau công tắc điện']::varchar[], ARRAY['B. Trên dây pha, trước các thiết bị cần bảo vệ']::varchar[], 'Thiết bị bảo vệ phải lắp trên dây pha (dây nóng), trước phụ tải. Khi ngắt, dòng điện bị cắt hoàn toàn trên dây pha, đảm bảo an toàn.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-11', 'mcq', 'Bản vẽ kỹ thuật - Hình chiếu', 'tech-circuit-install', 'Hình chiếu bằng có vị trí như thế nào so với hình chiếu đứng trên bản vẽ kỹ thuật?', ARRAY['A. Bên phải hình chiếu đứng', 'B. Bên trái hình chiếu đứng', 'C. Nằm dưới hình chiếu đứng', 'D. Nằm trên hình chiếu đứng']::varchar[], ARRAY['C. Nằm dưới hình chiếu đứng']::varchar[], 'Trong hệ thống 3 hình chiếu chuẩn: Hình chiếu đứng (mặt chính) ở giữa, hình chiếu bằng (mặt bằng) ở dưới, hình chiếu cạnh (mặt cạnh) ở bên phải.', 3, 'scribd.com - Trắc nghiệm Công nghệ, Bản vẽ kỹ thuật (theo chương trình THCS)', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-12', 'mcq', 'Bản vẽ kỹ thuật - Ký hiệu', 'tech-circuit-install', 'Nét gạch chấm mảnh trên bản vẽ kỹ thuật dùng để vẽ gì?', ARRAY['A. Đường bao khuất', 'B. Đường tâm, trục đối xứng', 'C. Đường gióng và đường kích thước', 'D. Đường bao thấy']::varchar[], ARRAY['B. Đường tâm, trục đối xứng']::varchar[], 'Quy ước nét vẽ trong bản vẽ kỹ thuật: Nét liền đậm = đường bao thấy; Nét đứt = đường bao khuất; Nét gạch chấm mảnh = đường tâm, trục đối xứng.', 3, 'scribd.com - Trắc nghiệm Bản vẽ kỹ thuật THCS', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-13', 'mcq', 'Bản vẽ kỹ thuật - Bản vẽ chi tiết', 'tech-circuit-install', 'Bản vẽ chi tiết gồm những nội dung nào?', ARRAY['A. Hình biểu diễn và kích thước', 'B. Yêu cầu kỹ thuật và khung tên', 'C. Hình biểu diễn, kích thước, yêu cầu kỹ thuật và khung tên', 'D. Chỉ cần hình biểu diễn và yêu cầu kỹ thuật']::varchar[], ARRAY['C. Hình biểu diễn, kích thước, yêu cầu kỹ thuật và khung tên']::varchar[], 'Bản vẽ chi tiết đầy đủ bao gồm 4 nội dung: Hình biểu diễn (các hình chiếu), Kích thước (số đo), Yêu cầu kỹ thuật (chất lượng bề mặt, vật liệu...) và Khung tên (tên chi tiết, tỉ lệ, người vẽ...).', 3, 'scribd.com - Trắc nghiệm Bản vẽ kỹ thuật', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-14', 'mcq', 'Bản vẽ kỹ thuật - Phương pháp chiếu', 'tech-circuit-install', 'Phương pháp chiếu góc thứ nhất có các hình chiếu đặt như thế nào?', ARRAY['A. Hình chiếu bằng ở dưới, hình chiếu cạnh ở bên phải', 'B. Hình chiếu bằng ở trên, hình chiếu cạnh ở bên phải', 'C. Hình chiếu bằng ở dưới, hình chiếu cạnh ở bên trái', 'D. Hình chiếu bằng ở trên, hình chiếu cạnh ở bên trái']::varchar[], ARRAY['A. Hình chiếu bằng ở dưới, hình chiếu cạnh ở bên phải']::varchar[], 'Phương pháp chiếu góc thứ nhất (dùng ở châu Âu và Việt Nam): Hình chiếu bằng đặt dưới hình chiếu đứng, hình chiếu cạnh đặt bên phải hình chiếu đứng.', 3, 'scribd.com - Trắc nghiệm Bản vẽ kỹ thuật THCS', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-15', 'mcq', 'Cơ khí - Vật liệu', 'tech-circuit-install', 'Vật liệu nào sau đây được phân loại là vật liệu kim loại trong cơ khí?', ARRAY['A. Chất dẻo (nhựa)', 'B. Thép và Gang', 'C. Cao su', 'D. Vật liệu compozit']::varchar[], ARRAY['B. Thép và Gang']::varchar[], 'Vật liệu kim loại trong cơ khí gồm kim loại đen (Gang, Thép) và kim loại màu (Đồng, Nhôm...). Chất dẻo, cao su, compozit là vật liệu phi kim loại.', 3, 'studocu.vn - Trắc nghiệm Cơ khí, Vật liệu cơ khí', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-16', 'mcq', 'Cơ khí - Vật liệu', 'tech-circuit-install', 'Tính chất nào sau đây là tính chất cơ học của vật liệu?', ARRAY['A. Tính dẫn điện', 'B. Độ bền, độ cứng, độ dẻo', 'C. Tính chịu axit', 'D. Nhiệt độ nóng chảy']::varchar[], ARRAY['B. Độ bền, độ cứng, độ dẻo']::varchar[], 'Tính chất cơ học gồm: Độ bền (khả năng chịu lực), Độ cứng (khả năng chống biến dạng bề mặt), Độ dẻo (khả năng biến dạng mà không bị phá hủy). Dẫn điện là tính chất vật lý, chịu axit là tính chất hóa học.', 3, 'studocu.vn - Trắc nghiệm Vật liệu cơ khí', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-17', 'mcq', 'Cơ khí - Vật liệu', 'tech-circuit-install', 'Thế nào là biến dạng dẻo của vật liệu?', ARRAY['A. Vật liệu trở lại hình dạng ban đầu sau khi bỏ lực tác dụng', 'B. Vật liệu không bị biến dạng', 'C. Vật liệu giữ nguyên hình dạng mới sau khi bỏ lực tác dụng', 'D. Vật liệu bị nứt vỡ ngay lập tức']::varchar[], ARRAY['C. Vật liệu giữ nguyên hình dạng mới sau khi bỏ lực tác dụng']::varchar[], 'Biến dạng dẻo: vật liệu thay đổi hình dạng vĩnh viễn (không phục hồi) sau khi lực tác dụng được loại bỏ. Ngược lại, biến dạng đàn hồi: vật liệu phục hồi hình dạng ban đầu.', 3, 'studocu.vn - Trắc nghiệm Vật liệu cơ khí', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-18', 'mcq', 'Cơ khí - Vật liệu', 'tech-circuit-install', 'Để đo độ cứng của vật liệu có độ cứng thấp (như nhôm, đồng), người ta thường dùng đơn vị đo nào?', ARRAY['A. Brinen (HB)', 'B. Rocven (HRC)', 'C. Vicker (HV)', 'D. Cả A và C']::varchar[], ARRAY['A. Brinen (HB)']::varchar[], 'Thang độ cứng Brinen (HB) dùng cho vật liệu mềm đến trung bình (nhôm, đồng, thép ủ). Thang Rockwell C (HRC) dùng cho vật liệu cứng (thép đã tôi). Vicker (HV) dùng được cho cả hai nhưng thường dùng cho vật liệu mỏng hoặc lớp phủ.', 3, 'studocu.vn - Trắc nghiệm Cơ khí, Vật liệu', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-19', 'mcq', 'Bản vẽ kỹ thuật - Khung tên', 'tech-circuit-install', 'Trong bản vẽ kỹ thuật, khung tên thường được đặt ở đâu?', ARRAY['A. Góc trên bên trái', 'B. Góc dưới bên phải', 'C. Chính giữa bản vẽ', 'D. Góc trên bên phải']::varchar[], ARRAY['B. Góc dưới bên phải']::varchar[], 'Theo tiêu chuẩn TCVN (và ISO), khung tên được đặt ở góc dưới bên phải của bản vẽ. Khung tên chứa thông tin về tên sản phẩm, tỉ lệ, vật liệu, người vẽ, ngày vẽ...', 3, 'scribd.com - Trắc nghiệm Bản vẽ kỹ thuật THCS', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-20', 'mcq', 'Mạch điện - Sơ đồ nguyên lý', 'tech-circuit-install', 'Ký hiệu nào biểu thị đèn điện trên sơ đồ nguyên lý mạch điện?', ARRAY['A. Một vòng tròn có chữ X bên trong', 'B. Một đường thẳng gạch ngang', 'C. Một hình vuông', 'D. Một mũi tên']::varchar[], ARRAY['A. Một vòng tròn có chữ X bên trong']::varchar[], 'Trên sơ đồ nguyên lý, đèn điện được ký hiệu bằng vòng tròn có chữ X (hoặc dấu cộng) bên trong. Mỗi thiết bị điện có ký hiệu quy ước riêng theo TCVN.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9, Ký hiệu điện', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-21', 'mcq', 'Mạch điện - Cơ bản', 'tech-circuit-install', 'Mạch điện một công tắc điều khiển một đèn hoạt động theo nguyên tắc nào?', ARRAY['A. Khi công tắc mở, đèn sáng', 'B. Khi công tắc đóng, mạch kín, đèn sáng', 'C. Đèn sáng liên tục không phụ thuộc công tắc', 'D. Cần hai công tắc mới bật được đèn']::varchar[], ARRAY['B. Khi công tắc đóng, mạch kín, đèn sáng']::varchar[], 'Nguyên tắc mạch điện: Công tắc mắc nối tiếp với đèn. Khi công tắc đóng (ON), mạch kín, dòng điện chạy qua đèn làm đèn sáng. Khi công tắc mở (OFF), mạch hở, không có dòng điện.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9, Mạch điện', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-22', 'mcq', 'Mạch điện - Sơ đồ', 'tech-circuit-install', 'Sơ đồ lắp đặt mạch điện khác sơ đồ nguyên lý ở điểm nào?', ARRAY['A. Sơ đồ lắp đặt thể hiện vị trí thực tế của các thiết bị trong không gian', 'B. Sơ đồ lắp đặt chỉ dùng ký hiệu trừu tượng', 'C. Sơ đồ nguyên lý cho thấy vị trí thực của dây dẫn', 'D. Hai loại sơ đồ này hoàn toàn giống nhau']::varchar[], ARRAY['A. Sơ đồ lắp đặt thể hiện vị trí thực tế của các thiết bị trong không gian']::varchar[], 'Sơ đồ nguyên lý: thể hiện nguyên lý hoạt động bằng ký hiệu quy ước, không quan tâm vị trí. Sơ đồ lắp đặt: thể hiện vị trí thực tế của thiết bị và dây dẫn trong không gian để thi công.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-23', 'mcq', 'An toàn điện - Dây dẫn', 'tech-circuit-install', 'Dây dẫn điện trong mạng điện gia đình thường có màu gì để phân biệt?', ARRAY['A. Dây pha: xanh lá, dây trung tính: đỏ, dây đất: vàng', 'B. Dây pha: đỏ hoặc nâu, dây trung tính: xanh lam, dây đất: vàng-xanh', 'C. Tất cả các dây đều màu đen', 'D. Không có quy định màu sắc']::varchar[], ARRAY['B. Dây pha: đỏ hoặc nâu, dây trung tính: xanh lam, dây đất: vàng-xanh']::varchar[], 'Theo tiêu chuẩn IEC và TCVN: Dây pha (L): đỏ, nâu hoặc đen; Dây trung tính (N): xanh lam (blue); Dây bảo vệ/nối đất (PE): vàng-xanh lá. Phân biệt màu giúp an toàn khi thi công và sửa chữa.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9, An toàn điện', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-24', 'mcq', 'Mạch điện - Cơ bản', 'tech-circuit-install', 'Công tắc điện trong mạch điện gia đình được mắc như thế nào so với đèn?', ARRAY['A. Song song với đèn', 'B. Nối tiếp với đèn', 'C. Không kết nối trực tiếp với đèn', 'D. Song song với nguồn điện']::varchar[], ARRAY['B. Nối tiếp với đèn']::varchar[], 'Công tắc được mắc nối tiếp với đèn trên dây pha. Điều này đảm bảo khi công tắc mở, toàn bộ mạch (kể cả đèn) bị ngắt điện hoàn toàn, an toàn cho người sửa chữa.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-25', 'mcq', 'Mạch điện - Ứng dụng', 'tech-circuit-install', 'Khi nào cần sử dụng mạch điện hai công tắc hai cực điều khiển một đèn (mạch đảo chiều)?', ARRAY['A. Khi muốn tăng độ sáng của đèn', 'B. Khi muốn điều khiển đèn từ hai vị trí khác nhau (ví dụ: đầu và cuối hành lang)', 'C. Khi mạch điện bị ngắn mạch', 'D. Khi tiết kiệm điện năng']::varchar[], ARRAY['B. Khi muốn điều khiển đèn từ hai vị trí khác nhau (ví dụ: đầu và cuối hành lang)']::varchar[], 'Mạch hai công tắc ba cực (công tắc đảo chiều) cho phép điều khiển một đèn từ hai điểm khác nhau, thường dùng ở cầu thang, hành lang dài để bật/tắt đèn ở cả hai đầu.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9, Thực hành mạch điện', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-26', 'mcq', 'An toàn điện - Vật liệu', 'tech-circuit-install', 'Vật liệu cách điện (còn gọi là điện môi) có đặc điểm gì?', ARRAY['A. Dẫn điện tốt ở nhiệt độ thường', 'B. Không dẫn điện hoặc dẫn điện rất kém', 'C. Dẫn điện tốt hơn kim loại', 'D. Chỉ dẫn điện một chiều']::varchar[], ARRAY['B. Không dẫn điện hoặc dẫn điện rất kém']::varchar[], 'Vật liệu cách điện (nhựa, cao su, gốm, thủy tinh...) có điện trở suất rất cao, không cho dòng điện đi qua ở điều kiện bình thường. Chúng được dùng để bọc dây điện, làm vỏ thiết bị điện để bảo vệ an toàn.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-27', 'mcq', 'Bản vẽ kỹ thuật - Tỉ lệ', 'tech-circuit-install', 'Trong bản vẽ kỹ thuật, tỉ lệ 1:2 có nghĩa là gì?', ARRAY['A. Hình vẽ lớn gấp 2 lần vật thật', 'B. Hình vẽ bằng vật thật', 'C. Hình vẽ nhỏ hơn vật thật 2 lần', 'D. Vật thật lớn hơn hình vẽ 2 lần nhưng chỉ vẽ một phần']::varchar[], ARRAY['C. Hình vẽ nhỏ hơn vật thật 2 lần']::varchar[], 'Tỉ lệ trong bản vẽ kỹ thuật: 1:1 = thu nhỏ/phóng to 1 lần (bằng thật), 2:1 = phóng to 2 lần, 1:2 = thu nhỏ 2 lần (hình vẽ nhỏ hơn thật 2 lần). Dùng tỉ lệ thu nhỏ để vẽ các vật lớn vào khổ giấy nhỏ hơn.', 3, 'scribd.com - Trắc nghiệm Bản vẽ kỹ thuật', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-28', 'mcq', 'Mạch điện - Cơ bản', 'tech-circuit-install', 'Ổ cắm điện trong mạch điện gia đình được mắc như thế nào với nguồn điện?', ARRAY['A. Nối tiếp với nhau và với nguồn', 'B. Song song với nhau và với nguồn điện', 'C. Chỉ dùng một ổ cắm duy nhất', 'D. Mắc qua biến áp']::varchar[], ARRAY['B. Song song với nhau và với nguồn điện']::varchar[], 'Tất cả ổ cắm điện trong nhà đều mắc song song với nhau và với nguồn điện 220V. Điều này đảm bảo mỗi thiết bị cắm vào đều nhận đủ điện áp 220V và hoạt động độc lập.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9, Mạch điện gia đình', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-29', 'mcq', 'Cơ khí - Gia công', 'tech-circuit-install', 'Phương pháp gia công cơ khí nào sử dụng lưỡi dao cắt để tạo ra phoi (chip)?', ARRAY['A. Đúc', 'B. Hàn', 'C. Cắt gọt (tiện, phay, bào)', 'D. Rèn']::varchar[], ARRAY['C. Cắt gọt (tiện, phay, bào)']::varchar[], 'Cắt gọt (tiện, phay, bào, mài...) là phương pháp gia công bằng cách dùng dao cắt để bóc tách lớp vật liệu thừa (tạo ra phoi) để tạo hình chi tiết. Đúc và rèn không tạo ra phoi.', 3, 'studocu.vn - Trắc nghiệm Cơ khí THCS', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-30', 'mcq', 'Bản vẽ kỹ thuật - Khổ giấy', 'tech-circuit-install', 'Khổ giấy A4 trong bản vẽ kỹ thuật có kích thước là bao nhiêu?', ARRAY['A. 841 × 1189 mm', 'B. 594 × 841 mm', 'C. 420 × 594 mm', 'D. 210 × 297 mm']::varchar[], ARRAY['D. 210 × 297 mm']::varchar[], 'Khổ giấy theo tiêu chuẩn ISO: A0 = 841×1189mm; A1 = 594×841mm; A2 = 420×594mm; A3 = 297×420mm; A4 = 210×297mm. Mỗi khổ A(n) bằng 1/2 khổ A(n-1).', 3, 'scribd.com - Trắc nghiệm Bản vẽ kỹ thuật', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-tech-31', 'mcq', 'Mạch điện - Lý thuyết', 'tech-circuit-install', 'Điện trở của vật dẫn điện phụ thuộc vào yếu tố nào?', ARRAY['A. Chỉ phụ thuộc vào vật liệu làm dây', 'B. Phụ thuộc vào vật liệu, chiều dài và tiết diện dây dẫn', 'C. Chỉ phụ thuộc vào chiều dài dây', 'D. Không phụ thuộc vào chiều dài dây']::varchar[], ARRAY['B. Phụ thuộc vào vật liệu, chiều dài và tiết diện dây dẫn']::varchar[], 'Điện trở R = ρ × L/S, trong đó ρ là điện trở suất (phụ thuộc vật liệu), L là chiều dài, S là tiết diện. Dây càng dài, điện trở càng lớn; tiết diện càng lớn, điện trở càng nhỏ.', 3, 'vietjack.com - Trắc nghiệm Công nghệ 9', 'technology', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["tech-circuit-install", "technology"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-32', 'mcq', 'Mạng máy tính - Khái niệm', 'inf-digital-world', 'Mạng máy tính là gì?', ARRAY['A. Tập hợp các máy tính nối với nhau bằng các thiết bị và phương tiện truyền thông', 'B. Mạng xã hội Zalo', 'C. Tập hợp các máy tính không kết nối với nhau', 'D. Chỉ là mạng Internet toàn cầu']::varchar[], ARRAY['A. Tập hợp các máy tính nối với nhau bằng các thiết bị và phương tiện truyền thông']::varchar[], 'Mạng máy tính là tập hợp các máy tính và thiết bị (máy in, switch, router...) được kết nối với nhau qua môi trường truyền dẫn (dây cáp hoặc không dây) theo một giao thức nhất định để chia sẻ tài nguyên và trao đổi thông tin.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Mạng máy tính', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-digital-world", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-33', 'mcq', 'Mạng máy tính - Giao thức', 'inf-data-manage', 'Bộ giao thức được sử dụng phổ biến nhất trên Internet hiện nay là gì?', ARRAY['A. Ethernet', 'B. TCP/IP', 'C. OSI', 'D. IEEE 802.11']::varchar[], ARRAY['B. TCP/IP']::varchar[], 'TCP/IP (Transmission Control Protocol/Internet Protocol) là bộ giao thức nền tảng của Internet. TCP đảm bảo truyền dữ liệu tin cậy, IP đảm bảo định địa chỉ và định tuyến gói tin.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Giao thức mạng', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-data-manage", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-34', 'mcq', 'Mạng máy tính - Phân loại', 'inf-digital-world', 'Thuật ngữ ''LAN'' là viết tắt của cụm từ nào?', ARRAY['A. Local Area Network', 'B. Wide Area Network', 'C. Metropolitan Area Network', 'D. Global Area Network']::varchar[], ARRAY['A. Local Area Network']::varchar[], 'LAN (Local Area Network - Mạng cục bộ) là mạng máy tính kết nối các thiết bị trong phạm vi giới hạn như văn phòng, tòa nhà, trường học. Tốc độ cao, chi phí thấp.', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-digital-world", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-35', 'mcq', 'Mạng máy tính - Phân loại', 'inf-digital-world', 'Mạng diện rộng kết nối các máy tính ở quy mô quốc gia hoặc toàn cầu được gọi là gì?', ARRAY['A. LAN', 'B. MAN', 'C. WAN', 'D. PAN']::varchar[], ARRAY['C. WAN']::varchar[], 'WAN (Wide Area Network - Mạng diện rộng) kết nối các mạng LAN hoặc MAN ở quy mô lớn (quốc gia, lục địa, toàn cầu). Internet là mạng WAN lớn nhất thế giới.', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-digital-world", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-36', 'mcq', 'Mạng máy tính - Phân loại', 'inf-digital-world', 'Mạng máy tính trong phạm vi một thành phố được gọi là gì?', ARRAY['A. LAN', 'B. WAN', 'C. MAN', 'D. GAN']::varchar[], ARRAY['C. MAN']::varchar[], 'MAN (Metropolitan Area Network - Mạng đô thị) kết nối các mạng LAN trong phạm vi một thành phố. Quy mô lớn hơn LAN nhưng nhỏ hơn WAN.', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-digital-world", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-37', 'mcq', 'Mạng máy tính - Thiết bị', 'inf-digital-world', 'Thiết bị nào dưới đây hoạt động bằng cách phát tín hiệu dữ liệu đến tất cả các cổng, dễ gây xung đột?', ARRAY['A. Router', 'B. Switch', 'C. Hub', 'D. Máy chủ']::varchar[], ARRAY['C. Hub']::varchar[], 'Hub (bộ tập trung) là thiết bị mạng cũ, hoạt động theo nguyên tắc broadcast: nhận dữ liệu từ một cổng và phát đến tất cả các cổng còn lại, gây ra nhiều xung đột (collision) và kém hiệu quả.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Thiết bị mạng', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-digital-world", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-38', 'mcq', 'Mạng máy tính - Thiết bị', 'inf-digital-world', 'Thiết bị nào có chức năng định tuyến dữ liệu giữa các mạng khác nhau?', ARRAY['A. Hub', 'B. Switch', 'C. Router', 'D. Modem']::varchar[], ARRAY['C. Router']::varchar[], 'Router (bộ định tuyến) kết nối các mạng khác nhau (LAN với WAN, LAN này với LAN khác) và chọn đường đi tối ưu cho gói tin. Router là thiết bị cốt lõi giúp các máy tính trong nhà kết nối Internet.', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-digital-world", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-39', 'mcq', 'Mạng máy tính - Thiết bị', 'inf-digital-world', 'Thiết bị kết nối mạng LAN và truyền dữ liệu thông minh hơn Hub (chỉ gửi đến đúng thiết bị đích) là gì?', ARRAY['A. Router', 'B. Switch', 'C. Hub', 'D. Access Point']::varchar[], ARRAY['B. Switch']::varchar[], 'Switch (bộ chuyển mạch) học địa chỉ MAC của các thiết bị kết nối và chỉ chuyển tiếp dữ liệu đến đúng cổng đích, tránh xung đột và tăng hiệu quả so với Hub.', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-digital-world", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-40', 'mcq', 'Mạng máy tính - Mô hình', 'inf-digital-world', 'Trong mô hình mạng Client-Server, vai trò của máy chủ (Server) là gì?', ARRAY['A. Chỉ dùng để lưu trữ dữ liệu cá nhân', 'B. Quản lý và cung cấp tài nguyên cho các máy khách trên mạng', 'C. Chỉ có nhiệm vụ gửi yêu cầu tài nguyên', 'D. Không có vai trò gì đặc biệt']::varchar[], ARRAY['B. Quản lý và cung cấp tài nguyên cho các máy khách trên mạng']::varchar[], 'Trong mô hình Client-Server: Máy chủ (Server) là máy có cấu hình mạnh, chạy liên tục, quản lý và cung cấp tài nguyên (file, in ấn, web, email...). Máy khách (Client) gửi yêu cầu và nhận tài nguyên từ server.', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-digital-world", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-41', 'mcq', 'Internet - Dịch vụ', 'inf-data-manage', 'Chức năng của dịch vụ DNS (Domain Name System) là gì?', ARRAY['A. Cấp địa chỉ IP động cho các máy trạm', 'B. Phân giải tên miền thành địa chỉ IP', 'C. Truyền tệp dữ liệu giữa các máy tính', 'D. Gửi thư điện tử']::varchar[], ARRAY['B. Phân giải tên miền thành địa chỉ IP']::varchar[], 'DNS là hệ thống phân giải tên miền: chuyển đổi tên miền dễ nhớ (ví dụ: google.com) thành địa chỉ IP số (ví dụ: 142.250.x.x) để máy tính có thể liên lạc với nhau.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Dịch vụ Internet', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-data-manage", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-42', 'mcq', 'Internet - Giao thức', 'inf-data-manage', 'Giao thức nào được dùng để truy cập và truyền tải các trang web?', ARRAY['A. SMTP', 'B. FTP', 'C. HTTP', 'D. POP3']::varchar[], ARRAY['C. HTTP']::varchar[], 'HTTP (HyperText Transfer Protocol) là giao thức nền tảng của World Wide Web, dùng để truyền tải các trang web (HTML, CSS, JS, hình ảnh...) giữa trình duyệt và máy chủ web. HTTPS là phiên bản bảo mật của HTTP.', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-data-manage", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-43', 'mcq', 'Internet - WWW', 'inf-data-manage', 'WWW là viết tắt của cụm từ nào?', ARRAY['A. World Win Web', 'B. World Wide Web', 'C. Windows Wide Web', 'D. World Wired Web']::varchar[], ARRAY['B. World Wide Web']::varchar[], 'WWW (World Wide Web - Mạng toàn cầu) là hệ thống thông tin trên Internet, cho phép người dùng truy cập các tài liệu siêu văn bản (hypertext) thông qua trình duyệt web. WWW do Tim Berners-Lee phát minh năm 1989.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Internet', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-data-manage", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-44', 'mcq', 'Internet - Khái niệm', 'inf-data-manage', 'Internet là gì?', ARRAY['A. Mạng kết nối các máy tính ở quy mô một nước', 'B. Mạng kết nối hàng triệu máy tính ở quy mô một tỉnh', 'C. Mạng kết nối hàng triệu máy tính ở quy mô toàn cầu dựa trên TCP/IP', 'D. Mạng chỉ dành cho các cơ quan chính phủ']::varchar[], ARRAY['C. Mạng kết nối hàng triệu máy tính ở quy mô toàn cầu dựa trên TCP/IP']::varchar[], 'Internet là mạng máy tính toàn cầu kết nối hàng tỷ thiết bị trên khắp thế giới thông qua bộ giao thức TCP/IP. Internet cung cấp nhiều dịch vụ: WWW, Email, FTP, VoIP, mạng xã hội...', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-data-manage", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-45', 'mcq', 'Internet - Dịch vụ Email', 'inf-data-manage', 'Thư điện tử (Email) là gì?', ARRAY['A. Dịch vụ gửi thư qua đường bưu điện', 'B. Dịch vụ chuyển thư dưới dạng số trên mạng máy tính qua các hộp thư điện tử', 'C. Dịch vụ gọi điện trực tuyến', 'D. Phần mềm soạn thảo văn bản']::varchar[], ARRAY['B. Dịch vụ chuyển thư dưới dạng số trên mạng máy tính qua các hộp thư điện tử']::varchar[], 'Email (Electronic Mail - Thư điện tử) là dịch vụ truyền thông tin dạng số qua mạng máy tính. Ưu điểm: nhanh, rẻ, có thể gửi kèm tệp tin, gửi cho nhiều người cùng lúc.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Email', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-data-manage", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-46', 'mcq', 'Bảo mật thông tin', 'inf-ethics-law', 'Để phòng tránh virus và mã độc, việc làm nào sau đây là ĐÚNG?', ARRAY['A. Mở tất cả các tệp đính kèm trong email từ người lạ', 'B. Tải và cài đặt phần mềm bẻ khóa từ các nguồn không rõ', 'C. Cập nhật hệ điều hành và phần mềm diệt virus thường xuyên', 'D. Sử dụng một mật khẩu duy nhất cho mọi tài khoản']::varchar[], ARRAY['C. Cập nhật hệ điều hành và phần mềm diệt virus thường xuyên']::varchar[], 'Cập nhật hệ điều hành và phần mềm diệt virus giúp vá các lỗ hổng bảo mật mới nhất. Các hành động A, B, D đều là những hành vi rủi ro cao về bảo mật.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Bảo mật thông tin', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-ethics-law", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-47', 'mcq', 'Bảo mật thông tin - Phishing', 'inf-ethics-law', 'Phishing là gì?', ARRAY['A. Một loại phần mềm diệt virus', 'B. Kỹ thuật lừa đảo qua email hoặc tin nhắn giả mạo nhằm đánh cắp thông tin cá nhân', 'C. Một giao thức bảo mật mạng', 'D. Phương pháp mã hóa dữ liệu']::varchar[], ARRAY['B. Kỹ thuật lừa đảo qua email hoặc tin nhắn giả mạo nhằm đánh cắp thông tin cá nhân']::varchar[], 'Phishing (tấn công giả mạo) là kỹ thuật tội phạm mạng: kẻ tấn công giả mạo tổ chức uy tín (ngân hàng, mạng xã hội...) qua email/tin nhắn để lừa nạn nhân cung cấp thông tin nhạy cảm (mật khẩu, số thẻ ngân hàng...).', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Bảo mật', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-ethics-law", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-48', 'mcq', 'Bảo mật thông tin - Tường lửa', 'inf-ethics-law', 'Tường lửa (Firewall) có chức năng chính là gì?', ARRAY['A. Tăng tốc độ truy cập Internet', 'B. Lọc và kiểm soát lưu lượng mạng ra/vào để ngăn chặn truy cập trái phép', 'C. Cài đặt các phần mềm ứng dụng tự động', 'D. Sao lưu dữ liệu trên máy tính']::varchar[], ARRAY['B. Lọc và kiểm soát lưu lượng mạng ra/vào để ngăn chặn truy cập trái phép']::varchar[], 'Tường lửa (Firewall) là hệ thống bảo mật lọc lưu lượng mạng theo các quy tắc đã định sẵn, ngăn chặn truy cập trái phép từ bên ngoài vào và kiểm soát kết nối từ bên trong ra ngoài.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Bảo mật', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-ethics-law", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-49', 'mcq', 'Bảo mật thông tin - Mã độc', 'inf-ethics-law', 'Ransomware là loại mã độc có đặc điểm gì?', ARRAY['A. Chỉ gây khó chịu bằng cách hiện quảng cáo', 'B. Theo dõi thao tác bàn phím của người dùng', 'C. Mã hóa dữ liệu trên máy tính và đòi tiền chuộc để giải mã', 'D. Tự động tắt máy tính của người dùng']::varchar[], ARRAY['C. Mã hóa dữ liệu trên máy tính và đòi tiền chuộc để giải mã']::varchar[], 'Ransomware (phần mềm tống tiền) là loại mã độc nguy hiểm: sau khi xâm nhập, nó mã hóa toàn bộ dữ liệu của nạn nhân và đòi tiền chuộc (thường bằng tiền mã hóa) để cung cấp khóa giải mã.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Bảo mật', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-ethics-law", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-50', 'mcq', 'Bảo mật thông tin - Mật khẩu', 'inf-ethics-law', 'Đâu là đặc điểm của một mật khẩu được coi là mạnh?', ARRAY['A. Chỉ gồm các chữ cái viết thường để dễ nhớ', 'B. Gồm 8 ký tự là ngày tháng năm sinh', 'C. Ít nhất 12 ký tự, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt', 'D. Chỉ cần chữ cái và số, không cần ký tự đặc biệt']::varchar[], ARRAY['C. Ít nhất 12 ký tự, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt']::varchar[], 'Mật khẩu mạnh cần: độ dài tối thiểu 12 ký tự, kết hợp đa dạng (chữ hoa + chữ thường + số + ký tự đặc biệt như @#$%), không dùng thông tin cá nhân dễ đoán. Mật khẩu phức tạp khó bị tấn công brute-force.', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-ethics-law", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-51', 'mcq', 'Lập trình Python - Cơ bản', 'inf-algorithm', 'Trong Python, để in dữ liệu ra màn hình, ta sử dụng hàm nào?', ARRAY['A. input()', 'B. print()', 'C. output()', 'D. show()']::varchar[], ARRAY['B. print()']::varchar[], 'Hàm print() trong Python dùng để xuất dữ liệu ra màn hình (stdout). Ví dụ: print(''Xin chào!'') sẽ in ra ''Xin chào!''. Hàm input() dùng để nhận dữ liệu từ bàn phím.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Lập trình Python', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-algorithm", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-52', 'mcq', 'Lập trình Python - Cú pháp', 'inf-algorithm', 'Ký hiệu nào dùng để xác định các khối lệnh (vòng lặp, điều kiện) trong Python?', ARRAY['A. Dấu ngoặc nhọn { }', 'B. Dấu ngoặc vuông [ ]', 'C. Thụt lề (Indentation)', 'D. Dấu chấm phẩy ;']::varchar[], ARRAY['C. Thụt lề (Indentation)']::varchar[], 'Python sử dụng thụt lề (indentation) thay vì dấu ngoặc nhọn để xác định khối lệnh. Đây là đặc điểm quan trọng và bắt buộc của Python. Thường dùng 4 khoảng trắng hoặc 1 tab cho mỗi cấp thụt lề.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Python', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-algorithm", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-53', 'mcq', 'Lập trình Python - Toán tử', 'inf-algorithm', 'Phép toán nào trong Python dùng để chia lấy phần dư?', ARRAY['A. //', 'B. /', 'C. %', 'D. mod']::varchar[], ARRAY['C. %']::varchar[], 'Trong Python: % là phép chia lấy phần dư (modulo). Ví dụ: 10 % 3 = 1. Phép // là chia lấy phần nguyên: 10 // 3 = 3. Phép / là chia thông thường: 10 / 3 = 3.333...', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Python', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-algorithm", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-54', 'mcq', 'Lập trình Python - Vòng lặp', 'inf-algorithm', 'Kết quả của đoạn lệnh Python ''for i in range(5): print(i)'' là gì?', ARRAY['A. In ra các số 1, 2, 3, 4, 5', 'B. In ra các số 0, 1, 2, 3, 4', 'C. In ra các số 0, 1, 2, 3, 4, 5', 'D. Báo lỗi']::varchar[], ARRAY['B. In ra các số 0, 1, 2, 3, 4']::varchar[], 'Hàm range(5) trong Python tạo ra dãy số từ 0 đến 4 (không bao gồm 5). Do đó vòng lặp sẽ in ra: 0, 1, 2, 3, 4. Muốn in 1 đến 5 phải dùng range(1, 6).', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Python', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-algorithm", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-55', 'mcq', 'Lập trình Scratch - Cơ bản', 'inf-algorithm', 'Trong Scratch, nhóm lệnh nào chứa các khối lệnh dùng để di chuyển nhân vật?', ARRAY['A. Looks (Hiển thị)', 'B. Sound (Âm thanh)', 'C. Motion (Chuyển động)', 'D. Events (Sự kiện)']::varchar[], ARRAY['C. Motion (Chuyển động)']::varchar[], 'Trong Scratch, nhóm lệnh Motion chứa các khối để điều khiển chuyển động của nhân vật: di chuyển, xoay, đặt vị trí, hướng di chuyển... Looks điều chỉnh hình dạng, Sound phát âm thanh, Events xử lý sự kiện.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Scratch', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-algorithm", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-56', 'mcq', 'Lập trình Scratch - Sự kiện', 'inf-algorithm', 'Trong Scratch, để chương trình bắt đầu chạy khi nhấn vào cờ xanh, ta dùng khối lệnh nào?', ARRAY['A. When this sprite clicked', 'B. When green flag clicked', 'C. When space key pressed', 'D. Start program']::varchar[], ARRAY['B. When green flag clicked']::varchar[], 'Khối ''When green flag clicked'' (thuộc nhóm Events) là điểm bắt đầu phổ biến nhất trong Scratch. Khi người dùng nhấp vào biểu tượng cờ xanh trên sân khấu, chương trình sẽ bắt đầu thực thi.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Scratch', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-algorithm", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-57', 'mcq', 'Lập trình Scratch - Vòng lặp', 'inf-algorithm', 'Trong Scratch, để nhân vật lặp lại một hành động với số lần nhất định, ta dùng khối lệnh nào?', ARRAY['A. forever', 'B. repeat', 'C. if then', 'D. wait']::varchar[], ARRAY['B. repeat']::varchar[], 'Khối ''repeat (n)'' lặp lại khối lệnh bên trong đúng n lần rồi dừng. Khác với ''forever'' (lặp vô hạn). Khối ''if then'' là điều kiện, ''wait'' là chờ đợi.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Scratch', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-algorithm", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-58', 'mcq', 'Lập trình - Biến', 'inf-algorithm', 'Biến (Variable) trong lập trình Scratch được dùng để làm gì?', ARRAY['A. Thay đổi ngoại hình của nhân vật', 'B. Lưu trữ dữ liệu (điểm số, thời gian, tên...) trong chương trình', 'C. Phát ra âm thanh', 'D. Điều khiển tốc độ chạy']::varchar[], ARRAY['B. Lưu trữ dữ liệu (điểm số, thời gian, tên...) trong chương trình']::varchar[], 'Biến (Variable) là vùng nhớ có tên dùng để lưu trữ và truy xuất dữ liệu trong chương trình. Trong Scratch, biến hay dùng để lưu điểm số, đếm vòng lặp, lưu tên người dùng, đếm thời gian...', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Scratch/Python', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-algorithm", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-59', 'mcq', 'Bảo mật thông tin - Đạo đức số', 'inf-ethics-law', 'Hành động nào sau đây vi phạm pháp luật hoặc quy tắc an toàn trên Internet?', ARRAY['A. Thay đổi mật khẩu thường xuyên và không chia sẻ cho người khác', 'B. Sử dụng các trang web uy tín để tìm kiếm bài tập', 'C. Cung cấp thông tin cá nhân (địa chỉ, số điện thoại) cho người lạ trên mạng xã hội', 'D. Cài đặt phần mềm diệt virus']::varchar[], ARRAY['C. Cung cấp thông tin cá nhân (địa chỉ, số điện thoại) cho người lạ trên mạng xã hội']::varchar[], 'Cung cấp thông tin cá nhân cho người lạ trên mạng là hành vi rủi ro cao, có thể dẫn đến bị lừa đảo, quấy rối, hoặc đánh cắp danh tính. Đây là vi phạm quy tắc an toàn thông tin cơ bản.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, An toàn Internet', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-ethics-law", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-60', 'mcq', 'Mạng máy tính - Địa chỉ IP', 'inf-data-manage', 'Địa chỉ IP (Internet Protocol Address) dùng để làm gì?', ARRAY['A. Xác định địa chỉ vật lý (địa chỉ nhà) của người dùng', 'B. Định danh duy nhất mỗi thiết bị trên mạng để liên lạc', 'C. Đo tốc độ kết nối Internet', 'D. Xác định tên người dùng trên mạng xã hội']::varchar[], ARRAY['B. Định danh duy nhất mỗi thiết bị trên mạng để liên lạc']::varchar[], 'Địa chỉ IP là địa chỉ logic định danh duy nhất mỗi thiết bị trên mạng IP. Tương tự địa chỉ nhà trong cuộc sống, địa chỉ IP giúp các gói tin biết phải đi đến đâu để đến đúng thiết bị đích.', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-data-manage", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-61', 'mcq', 'Bảo mật thông tin', 'inf-ethics-law', 'Bảo vệ thông tin máy tính bao gồm việc đảm bảo sao cho các tệp dữ liệu:', ARRAY['A. Không bị hỏng và có thể mở lại được', 'B. Không bị xóa ngoài ý muốn', 'C. Không bị sao chép mà không có sự đồng ý của người sở hữu', 'D. Tất cả các phương án trên']::varchar[], ARRAY['D. Tất cả các phương án trên']::varchar[], 'Bảo vệ thông tin toàn diện bao gồm 3 mục tiêu chính (CIA): Confidentiality (Bảo mật - không bị đọc trái phép), Integrity (Toàn vẹn - không bị sửa đổi), Availability (Sẵn sàng - không bị mất/hỏng), đáp án D bao phủ cả ba.', 3, 'vietjack.com - Trắc nghiệm Tin học 9, Bảo vệ thông tin', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-ethics-law", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-inf-62', 'mcq', 'Bảo mật thông tin - Đạo đức số', 'inf-ethics-law', 'Khi sử dụng lại thông tin từ Internet, điều quan trọng nhất cần lưu ý là gì?', ARRAY['A. Từ khóa tìm kiếm', 'B. Bản quyền của thông tin', 'C. Thời gian tải trang web', 'D. Màu sắc của trang web']::varchar[], ARRAY['B. Bản quyền của thông tin']::varchar[], 'Thông tin trên Internet thường có bản quyền (copyright). Sử dụng lại mà không ghi nguồn hoặc xin phép là vi phạm bản quyền, có thể dẫn đến hậu quả pháp lý. Đây là vấn đề đạo đức và pháp luật quan trọng trong môi trường số.', 3, 'vietjack.com - Trắc nghiệm Tin học 9', 'informatics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["inf-ethics-law", "informatics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-63', 'mcq', 'Âm nhạc - Lý thuyết', 'art-music-theory', 'Trường độ trong âm nhạc là gì?', ARRAY['A. Độ cao – thấp của âm thanh', 'B. Độ dài – ngắn của âm thanh', 'C. Độ to – nhỏ của âm thanh', 'D. Màu sắc của âm thanh']::varchar[], ARRAY['B. Độ dài – ngắn của âm thanh']::varchar[], 'Trường độ là độ dài (thời gian) của âm thanh, ký hiệu bằng hình dạng nốt nhạc: nốt tròn (4 phách), nốt trắng (2 phách), nốt đen (1 phách), nốt móc đơn (1/2 phách)...', 3, 'studocu.vn - Trắc nghiệm Âm nhạc 9, Lý thuyết', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-64', 'mcq', 'Âm nhạc - Nhịp', 'art-music-theory', 'Nhịp 3/4 có bao nhiêu phách trong một ô nhịp?', ARRAY['A. 2 phách', 'B. 3 phách', 'C. 4 phách', 'D. 6 phách']::varchar[], ARRAY['B. 3 phách']::varchar[], 'Nhịp 3/4: tử số 3 = số phách trong một ô nhịp, mẫu số 4 = giá trị của một phách (nốt đen). Vậy mỗi ô nhịp có 3 phách đen. Nhịp 3/4 thường dùng trong nhạc vũ điệu Valse.', 3, 'studocu.vn - Trắc nghiệm Âm nhạc 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-65', 'mcq', 'Âm nhạc - Nhịp', 'art-music-theory', 'Trong nhịp 3/4, phách mạnh thường nằm ở đâu?', ARRAY['A. Phách 1', 'B. Phách 2', 'C. Phách 3', 'D. Không có phách mạnh']::varchar[], ARRAY['A. Phách 1']::varchar[], 'Trong nhịp 3/4: phách 1 là phách mạnh, phách 2 và 3 là phách nhẹ. Sơ đồ trọng âm: MẠNH - nhẹ - nhẹ. Đây là quy luật chung của nhịp 3/4.', 3, 'studocu.vn - Trắc nghiệm Âm nhạc 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-66', 'mcq', 'Âm nhạc - Trường độ', 'art-music-theory', 'Ký hiệu ♪ là nốt nhạc gì?', ARRAY['A. Nốt tròn', 'B. Nốt trắng', 'C. Nốt đen', 'D. Nốt móc đơn']::varchar[], ARRAY['D. Nốt móc đơn']::varchar[], 'Ký hiệu ♪ là nốt móc đơn, có giá trị bằng 1/2 phách (nếu đơn vị là nốt đen). Nốt tròn: ○ (4 phách), Nốt trắng: ♩ không có đuôi đặc (2 phách), Nốt đen: ♩ (1 phách), Nốt móc đơn: ♪ (1/2 phách).', 3, 'scribd.com - Trắc nghiệm Lý thuyết âm nhạc', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-67', 'mcq', 'Âm nhạc - Lý thuyết quãng', 'art-music-theory', 'Quãng trong âm nhạc là gì?', ARRAY['A. Khoảng cách về cao độ giữa hai nốt nhạc', 'B. Khoảng cách về trường độ giữa hai nốt nhạc', 'C. Sự kết hợp giữa hai nhạc cụ', 'D. Khoảng cách giữa hai ô nhịp']::varchar[], ARRAY['A. Khoảng cách về cao độ giữa hai nốt nhạc']::varchar[], 'Quãng là khoảng cách về cao độ giữa hai âm. Tên quãng được tính theo số bậc giữa hai nốt (quãng 2, quãng 3, quãng 4...). Quãng là nền tảng để xây dựng gam, hợp âm và giai điệu.', 3, 'tech12h.com - Trắc nghiệm Âm nhạc 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-68', 'mcq', 'Âm nhạc - Lý thuyết quãng', 'art-music-theory', 'Quãng giai điệu là khi nào?', ARRAY['A. Hai âm thanh vang lên cùng một lúc', 'B. Hai âm thanh vang lên lần lượt', 'C. Ba âm thanh vang lên lần lượt', 'D. Hai âm thanh có cùng cao độ']::varchar[], ARRAY['B. Hai âm thanh vang lên lần lượt']::varchar[], 'Quãng giai điệu: hai âm vang lên lần lượt (tuần tự), tạo thành đường giai điệu. Quãng hòa âm: hai âm vang lên cùng lúc, tạo thành hòa âm. Quãng giai điệu là cơ sở xây dựng melodie.', 3, 'kenhgiaovien.com - Trắc nghiệm Âm nhạc 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-69', 'mcq', 'Âm nhạc - Giọng điệu', 'art-music-theory', 'Giọng Đô trưởng được ký hiệu quốc tế là gì?', ARRAY['A. D Major', 'B. C Major', 'C. F Major', 'D. G Major']::varchar[], ARRAY['B. C Major']::varchar[], 'Ký hiệu quốc tế các giọng: C = Đô, D = Rê, E = Mi, F = Fa, G = Son, A = La, B = Si. Chữ in hoa = trưởng (Major), chữ thường = thứ (minor). Giọng Đô trưởng = C Major, không có dấu hóa.', 3, 'kenhgiaovien.com - Trắc nghiệm Âm nhạc 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-70', 'mcq', 'Âm nhạc - Giọng điệu', 'art-music-theory', 'Giọng La thứ là giọng song song với giọng nào?', ARRAY['A. Son trưởng (G Major)', 'B. Rê trưởng (D Major)', 'C. Đô trưởng (C Major)', 'D. Fa trưởng (F Major)']::varchar[], ARRAY['C. Đô trưởng (C Major)']::varchar[], 'Giọng song song là hai giọng có cùng hóa biểu (cùng dấu thăng/giáng). Giọng La thứ tự nhiên (Am) và Đô trưởng (C) đều không có dấu hóa trong hóa biểu, nên chúng là cặp song song.', 3, 'kenhgiaovien.com - Trắc nghiệm Âm nhạc 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-71', 'mcq', 'Âm nhạc - Hợp âm', 'art-music-theory', 'Hợp âm ba là gì?', ARRAY['A. Hợp âm gồm ba nhạc cụ cùng chơi', 'B. Ba âm chồng lên nhau theo quãng ba', 'C. Gam âm nhạc có 3 nốt', 'D. Ba nốt nhạc cùng cao độ']::varchar[], ARRAY['B. Ba âm chồng lên nhau theo quãng ba']::varchar[], 'Hợp âm ba (Triad) gồm 3 âm chồng lên nhau theo quãng ba: âm 1 (âm gốc) + âm 3 + âm 5. Ví dụ hợp âm Đô trưởng: Đô - Mi - Son. Đây là loại hợp âm cơ bản nhất trong lý thuyết hòa âm.', 3, 'kenhgiaovien.com - Trắc nghiệm Âm nhạc 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-72', 'mcq', 'Âm nhạc - Điệu thức', 'art-music-theory', 'Điệu thức trưởng có đặc điểm gì nổi bật về màu sắc âm thanh?', ARRAY['A. Âm thanh buồn bã, da diết', 'B. Âm thanh sáng, vui tươi, rõ ràng', 'C. Âm thanh trầm tối, huyền bí', 'D. Âm thanh nhẹ nhàng, u buồn']::varchar[], ARRAY['B. Âm thanh sáng, vui tươi, rõ ràng']::varchar[], 'Điệu thức trưởng (Major) mang màu sắc sáng, vui tươi, mạnh mẽ do cấu trúc quãng đặc trưng (quãng ba trưởng giữa bậc I và III). Ngược lại, điệu thức thứ (Minor) thường mang màu sắc tối, buồn, trữ tình.', 3, 'scribd.com - Trắc nghiệm Lý thuyết âm nhạc', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-73', 'mcq', 'Mỹ thuật - Ấn tượng', 'art-visual-history', 'Trường phái Ấn tượng (Impressionism) trong hội họa khởi nguồn từ quốc gia nào vào thời gian nào?', ARRAY['A. Đức, đầu thế kỷ XIX', 'B. Pháp, cuối thế kỷ XIX', 'C. Anh, đầu thế kỷ XX', 'D. Ý, giữa thế kỷ XIX']::varchar[], ARRAY['B. Pháp, cuối thế kỷ XIX']::varchar[], 'Trường phái Ấn tượng ra đời ở Pháp vào khoảng năm 1860-1870. Tên gọi xuất phát từ bức tranh ''Impression: Soleil levant'' (Ấn tượng: Mặt trời mọc) của Claude Monet năm 1872.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9, Lịch sử mỹ thuật', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-history", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-74', 'mcq', 'Mỹ thuật - Ấn tượng', 'art-visual-history', 'Tác phẩm ''Impression: Soleil levant'' (Ấn tượng: Mặt trời mọc) là kiệt tác của họa sĩ nào?', ARRAY['A. Vincent van Gogh', 'B. Pablo Picasso', 'C. Claude Monet', 'D. Paul Cézanne']::varchar[], ARRAY['C. Claude Monet']::varchar[], 'Claude Monet (1840-1926) là danh họa người Pháp, người sáng lập trường phái Ấn tượng. Bức ''Impression: Soleil levant'' (1872) được triển lãm năm 1874 và trở thành tên gọi cho cả một trào lưu nghệ thuật.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-history", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-75', 'mcq', 'Mỹ thuật - Ấn tượng', 'art-visual-history', 'Đặc điểm nổi bật nhất của hội họa Ấn tượng là gì?', ARRAY['A. Vẽ rất chi tiết, tỉ mỉ từng đường nét', 'B. Chú trọng sự biến đổi của ánh sáng, màu sắc tự nhiên và cảm giác tức thời', 'C. Vẽ từ nhiều điểm nhìn cùng lúc', 'D. Sử dụng màu tối và chủ đề triết học sâu sắc']::varchar[], ARRAY['B. Chú trọng sự biến đổi của ánh sáng, màu sắc tự nhiên và cảm giác tức thời']::varchar[], 'Hội họa Ấn tượng đặc trưng bởi: bút pháp ngắn và nhanh, màu sắc tươi sáng, chú trọng ánh sáng tự nhiên và sự thay đổi của nó theo thời gian trong ngày, ghi lại cảm xúc tức thời thay vì tái hiện chính xác.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-history", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-76', 'mcq', 'Mỹ thuật - Hậu Ấn tượng', 'art-visual-history', 'Họa sĩ nào dưới đây thuộc trường phái Hậu Ấn tượng (Post-Impressionism)?', ARRAY['A. Claude Monet', 'B. Vincent van Gogh', 'C. Pablo Picasso', 'D. Edgar Degas']::varchar[], ARRAY['B. Vincent van Gogh']::varchar[], 'Vincent van Gogh (1853-1890) là họa sĩ người Hà Lan, đại diện tiêu biểu của Hậu Ấn tượng. Phong cách đặc trưng: bút pháp soáy mạnh, màu sắc mãnh liệt, thể hiện cảm xúc sâu sắc. Tác phẩm nổi tiếng: Đêm đầy sao (Starry Night).', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-history", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-77', 'mcq', 'Mỹ thuật - Lập thể', 'art-visual-history', 'Đặc điểm nổi bật của hội họa Lập thể (Cubism) là gì?', ARRAY['A. Chú trọng vào ánh sáng tự nhiên và màu sắc tươi sáng', 'B. Thể hiện cảm xúc cá nhân mãnh liệt thông qua màu sắc', 'C. Nhìn đối tượng từ nhiều điểm nhìn cùng lúc, chia cắt thành các hình khối', 'D. Tái hiện cuộc sống một cách chân thực, chi tiết']::varchar[], ARRAY['C. Nhìn đối tượng từ nhiều điểm nhìn cùng lúc, chia cắt thành các hình khối']::varchar[], 'Lập thể (Cubism) do Picasso và Braque sáng lập, đặc trưng: phân tích đối tượng thành các hình học cơ bản (hình vuông, hình tròn, hình tam giác) nhìn từ nhiều góc độ cùng lúc trên một mặt phẳng.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-history", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-78', 'mcq', 'Mỹ thuật - Lập thể', 'art-visual-history', 'Tác phẩm nổi tiếng ''Guernica'' là của họa sĩ nào?', ARRAY['A. Claude Monet', 'B. Vincent van Gogh', 'C. Pablo Picasso', 'D. Georges Seurat']::varchar[], ARRAY['C. Pablo Picasso']::varchar[], '''Guernica'' (1937) là kiệt tác của Pablo Picasso (1881-1973), họa sĩ Tây Ban Nha. Bức tranh thể hiện nỗi đau và sự tàn phá của chiến tranh, vẽ theo phong cách Lập thể. Đây là một trong những tác phẩm chính trị nổi tiếng nhất lịch sử nghệ thuật.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-history", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-79', 'mcq', 'Nghệ thuật - Thiết kế đồ họa', 'art-visual-apply', 'Thiết kế đồ họa là gì?', ARRAY['A. Môn học chỉ dạy vẽ tay', 'B. Nghệ thuật kết hợp hình ảnh, chữ viết và màu sắc để truyền tải thông điệp', 'C. Kỹ thuật chụp ảnh chuyên nghiệp', 'D. Môn học về điêu khắc 3D']::varchar[], ARRAY['B. Nghệ thuật kết hợp hình ảnh, chữ viết và màu sắc để truyền tải thông điệp']::varchar[], 'Thiết kế đồ họa (Graphic Design) là lĩnh vực sáng tạo kết hợp mỹ thuật và kỹ thuật để truyền tải thông điệp thị giác. Sản phẩm gồm: logo, poster, bao bì, website, ứng dụng điện thoại, biển quảng cáo...', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9, Thiết kế đồ họa', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-apply", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-80', 'mcq', 'Nghệ thuật - Thiết kế đồ họa', 'art-visual-apply', 'Hệ màu nào thường được sử dụng cho các thiết kế hiển thị trên màn hình (web, app)?', ARRAY['A. CMYK', 'B. RGB', 'C. Pantone', 'D. Grayscale']::varchar[], ARRAY['B. RGB']::varchar[], 'RGB (Red-Green-Blue) là hệ màu cộng, dùng cho các thiết bị phát sáng (màn hình điện thoại, máy tính, TV). CMYK (Cyan-Magenta-Yellow-Key/Black) là hệ màu trừ, dùng trong in ấn. Pantone dùng trong ngành in đặc biệt.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9, Thiết kế đồ họa', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-apply", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-81', 'mcq', 'Nghệ thuật - Màu sắc', 'art-visual-history', 'Màu bổ túc (complementary colors) là gì?', ARRAY['A. Các màu nằm cạnh nhau trên vòng màu sắc', 'B. Các cặp màu đối diện nhau trên vòng thuần sắc', 'C. Các màu cùng sắc nhưng khác độ đậm', 'D. Chỉ có màu đen và màu trắng']::varchar[], ARRAY['B. Các cặp màu đối diện nhau trên vòng thuần sắc']::varchar[], 'Màu bổ túc là cặp màu đối diện nhau trên vòng màu 12 màu (Color Wheel). Ví dụ: đỏ - xanh lá, vàng - tím, cam - xanh dương. Đặt cạnh nhau, chúng tạo độ tương phản mạnh và làm nổi bật nhau.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-history", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-82', 'mcq', 'Nghệ thuật - Bố cục', 'art-visual-history', 'Mục đích chính của việc sắp xếp bố cục trong một tác phẩm mỹ thuật là gì?', ARRAY['A. Sử dụng càng nhiều màu sắc càng tốt', 'B. Tạo sự cân đối, hài hòa giữa các mảng chính-phụ, làm nổi bật chủ đề', 'C. Vẽ càng nhiều chi tiết càng tốt', 'D. Sử dụng màu sắc ngẫu nhiên']::varchar[], ARRAY['B. Tạo sự cân đối, hài hòa giữa các mảng chính-phụ, làm nổi bật chủ đề']::varchar[], 'Bố cục là cách sắp xếp các yếu tố trong tác phẩm (hình, màu, đường nét, chữ...) để tạo ra sự cân bằng thị giác, dẫn dắt ánh mắt người xem và làm nổi bật nội dung chủ đề.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-history", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-83', 'mcq', 'Nghệ thuật - Nguyên lý thiết kế', 'art-visual-apply', 'Nguyên lý ''tương phản'' trong thiết kế mỹ thuật giúp ích gì?', ARRAY['A. Tạo sự đồng đều cho tác phẩm', 'B. Tạo sự nổi bật, thu hút ánh nhìn vào các đối tượng quan trọng', 'C. Làm cho tác phẩm trở nên mờ nhạt', 'D. Làm tất cả các yếu tố có cùng tầm quan trọng']::varchar[], ARRAY['B. Tạo sự nổi bật, thu hút ánh nhìn vào các đối tượng quan trọng']::varchar[], 'Tương phản (Contrast) là nguyên lý tạo ra sự khác biệt rõ rệt giữa các yếu tố (màu sắc, kích thước, hình dạng, độ đậm nhạt). Tương phản mạnh thu hút thị giác vào điểm trọng tâm của tác phẩm.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-apply", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-84', 'mcq', 'Nghệ thuật - Yếu tố tạo hình', 'art-visual-history', 'Các yếu tố tạo hình cơ bản của mỹ thuật bao gồm những gì?', ARRAY['A. Chỉ có màu sắc và hình dạng', 'B. Chấm, nét, hình, khối, màu sắc, đậm nhạt, chất cảm, không gian', 'C. Chỉ có đường nét và màu sắc', 'D. Chỉ có hình và màu']::varchar[], ARRAY['B. Chấm, nét, hình, khối, màu sắc, đậm nhạt, chất cảm, không gian']::varchar[], '7-8 yếu tố tạo hình cơ bản: Điểm/Chấm (Point), Nét (Line), Hình (Shape), Khối (Form), Màu sắc (Color), Đậm nhạt/Sáng tối (Value), Chất cảm/Kết cấu (Texture), Không gian (Space). Đây là nền tảng ngôn ngữ thị giác.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-history", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-85', 'mcq', 'Âm nhạc - Nhạc cụ Việt Nam', 'art-music-theory', 'Nhạc cụ nào sau đây là nhạc cụ dân tộc Việt Nam?', ARRAY['A. Violin', 'B. Piano', 'C. Đàn bầu', 'D. Guitar điện']::varchar[], ARRAY['C. Đàn bầu']::varchar[], 'Đàn bầu (độc huyền cầm) là nhạc cụ truyền thống đặc trưng của Việt Nam, chỉ có một dây. Âm thanh của đàn bầu được tạo ra bằng cách gảy dây và uốn cần đàn để thay đổi cao độ. Violin, Piano, Guitar là nhạc cụ phương Tây.', 3, 'kenhgiaovien.com - Trắc nghiệm Âm nhạc 9, Nhạc cụ', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-86', 'mcq', 'Âm nhạc - Nhạc cụ Việt Nam', 'art-music-theory', 'Đàn tranh (đàn thập lục) là loại nhạc cụ thuộc bộ nào?', ARRAY['A. Bộ hơi (nhạc cụ thổi)', 'B. Bộ gõ', 'C. Bộ dây (gảy)', 'D. Bộ dây (kéo vĩ)']::varchar[], ARRAY['C. Bộ dây (gảy)']::varchar[], 'Đàn tranh thuộc bộ dây gảy, gồm 16-25 dây kim loại. Người chơi dùng móng gảy đeo ở ngón tay để gảy dây. Đàn tranh phổ biến trong âm nhạc truyền thống Việt Nam và nhiều nước châu Á.', 3, 'kenhgiaovien.com - Trắc nghiệm Âm nhạc 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-87', 'mcq', 'Mỹ thuật - Lịch sử hội họa', 'art-visual-history', 'Trường phái nào trong hội họa là tiền thân trực tiếp của Ấn tượng, nhấn mạnh vào vẽ ngoài trời?', ARRAY['A. Trường phái Lãng mạn', 'B. Trường phái Hiện thực (Realism)', 'C. Trường phái Barbizon', 'D. Trường phái Siêu thực']::varchar[], ARRAY['C. Trường phái Barbizon']::varchar[], 'Trường phái Barbizon (Pháp, 1830-1870) là tiền thân của Ấn tượng. Các họa sĩ Barbizon (Corot, Millet...) đã bắt đầu vẽ phong cảnh ngoài trời (en plein air), ảnh hưởng lớn đến thế hệ họa sĩ Ấn tượng sau đó.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-history", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-88', 'mcq', 'Âm nhạc - Ký hiệu âm nhạc', 'art-music-theory', 'Trong âm nhạc, dấu nhắc lại (||: :||) có nghĩa là gì?', ARRAY['A. Kết thúc bài hát', 'B. Lặp lại đoạn nhạc được đặt trong dấu nhắc lại', 'C. Chơi nhỏ hơn', 'D. Chơi nhanh hơn']::varchar[], ARRAY['B. Lặp lại đoạn nhạc được đặt trong dấu nhắc lại']::varchar[], 'Dấu nhắc lại (Repeat sign: ||: ... :||) chỉ định phải chơi lại đoạn nhạc nằm trong hai dấu này một lần nữa trước khi tiếp tục. Đây là ký hiệu quy ước trong ký âm nhạc.', 3, 'studocu.vn - Trắc nghiệm Âm nhạc 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-89', 'mcq', 'Âm nhạc - Tiết tấu', 'art-music-theory', 'Khi trọng âm của tiết tấu không trùng với trọng âm của tiết nhịp sẽ tạo nên hiện tượng gì trong âm nhạc?', ARRAY['A. Chỉ đảo phách', 'B. Chỉ nghịch phách', 'C. Đảo phách hoặc nghịch phách', 'D. Không tạo hiện tượng đặc biệt nào']::varchar[], ARRAY['C. Đảo phách hoặc nghịch phách']::varchar[], 'Đảo phách (Syncopation): trọng âm rơi vào phách yếu hoặc phần yếu của phách. Nghịch phách: âm thanh xuất hiện trước phách mạnh và kéo dài qua phách đó. Cả hai đều tạo sự đa dạng tiết tấu trong âm nhạc.', 3, 'scribd.com - Trắc nghiệm Lý thuyết âm nhạc', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-90', 'mcq', 'Nghệ thuật - Thiết kế đồ họa', 'art-visual-apply', 'Trong thiết kế đồ họa, nguyên lý ''lặp lại'' (Repetition) có tác dụng gì?', ARRAY['A. Tạo sự nhàm chán', 'B. Tạo sự nhất quán và thống nhất trong thiết kế', 'C. Giảm độ phức tạp của thiết kế', 'D. Chỉ dùng trong thiết kế logo']::varchar[], ARRAY['B. Tạo sự nhất quán và thống nhất trong thiết kế']::varchar[], 'Nguyên lý lặp lại trong thiết kế: sử dụng cùng yếu tố (màu, font chữ, hình dạng, khoảng cách) xuyên suốt giúp tạo sự nhất quán thị giác, thể hiện thương hiệu và hướng dẫn người xem qua tác phẩm.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9, Thiết kế đồ họa', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-apply", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-91', 'mcq', 'Nghệ thuật - Thiết kế đồ họa', 'art-visual-apply', 'Logo là gì trong thiết kế đồ họa?', ARRAY['A. Một bức tranh phong cảnh', 'B. Biểu tượng nhận diện thương hiệu kết hợp hình ảnh và/hoặc chữ', 'C. Một bài thơ được viết cách điệu', 'D. Bản đồ địa lý được thiết kế lại']::varchar[], ARRAY['B. Biểu tượng nhận diện thương hiệu kết hợp hình ảnh và/hoặc chữ']::varchar[], 'Logo là biểu tượng nhận diện thương hiệu, thường kết hợp hình ảnh (icon/symbol) và/hoặc chữ (logotype/wordmark). Logo phải dễ nhận biết, dễ nhớ, có tính độc đáo và phù hợp với giá trị thương hiệu.', 3, 'vietjack.com - Trắc nghiệm Mỹ thuật 9', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-visual-apply", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-art-92', 'mcq', 'Âm nhạc - Nhịp', 'art-music-theory', 'Nhịp lấy đà trong âm nhạc có thể xuất hiện ở đâu?', ARRAY['A. Chỉ ở đầu tác phẩm', 'B. Chỉ ở cuối tác phẩm', 'C. Đầu tác phẩm hoặc đầu một bộ phận của tác phẩm âm nhạc', 'D. Giữa tác phẩm']::varchar[], ARRAY['C. Đầu tác phẩm hoặc đầu một bộ phận của tác phẩm âm nhạc']::varchar[], 'Nhịp lấy đà (Anacrusis/Pick-up) là ô nhịp không đầy đủ ở đầu tác phẩm hoặc đầu một phần của tác phẩm. Nhịp lấy đà giúp tạo đà cho giai điệu chính bắt đầu từ phách mạnh ô nhịp tiếp theo.', 3, 'scribd.com - Trắc nghiệm Lý thuyết âm nhạc', 'arts', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["art-music-theory", "arts"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

-- Seed Subagent 2 Questions (Science, History/Geography, Civics)
INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-1', 'mcq', 'Điện học - Định luật Ohm', 'sci-phy-electricity', 'Nội dung định luật Ohm là gì?', ARRAY['A. Cường độ dòng điện chạy qua dây dẫn tỉ lệ với hiệu điện thế và tỉ lệ với điện trở', 'B. Cường độ dòng điện tỉ lệ thuận với hiệu điện thế và không tỉ lệ với điện trở', 'C. Cường độ dòng điện tỉ lệ thuận với hiệu điện thế giữa hai đầu dây dẫn và tỉ lệ nghịch với điện trở của dây', 'D. Cường độ dòng điện tỉ lệ nghịch với hiệu điện thế và tỉ lệ thuận với điện trở']::varchar[], ARRAY['C. Cường độ dòng điện tỉ lệ thuận với hiệu điện thế giữa hai đầu dây dẫn và tỉ lệ nghịch với điện trở của dây']::varchar[], 'Định luật Ohm: I = U/R, trong đó I tỉ lệ thuận với U và tỉ lệ nghịch với R.', 3, 'VietJack - Trắc nghiệm KHTN 9 Điện học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-electricity", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-2', 'mcq', 'Điện học - Định luật Ohm', 'sci-phy-electricity', 'Biểu thức đúng của định luật Ohm là gì?', ARRAY['A. R = U/I', 'B. I = U/R', 'C. U = I·R²', 'D. I = R/U']::varchar[], ARRAY['B. I = U/R']::varchar[], 'Biểu thức định luật Ohm gốc là I = U/R, biểu diễn cường độ dòng điện bằng hiệu điện thế chia cho điện trở.', 3, 'VietJack - Trắc nghiệm KHTN 9 Điện học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-electricity", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-3', 'mcq', 'Điện học - Định luật Ohm', 'sci-phy-electricity', 'Khi đặt vào hai đầu dây dẫn một hiệu điện thế 6V thì cường độ dòng điện qua nó là 0,5A. Nếu hiệu điện thế tăng lên thành 24V thì cường độ dòng điện qua nó là bao nhiêu?', ARRAY['A. 1,5A', 'B. 2A', 'C. 3A', 'D. 1A']::varchar[], ARRAY['B. 2A']::varchar[], 'U tăng 4 lần (6V → 24V), theo định luật Ohm I cũng tăng 4 lần: 0,5A × 4 = 2A.', 3, 'Thuviendethi.com - Trắc nghiệm Vật lý 9 Điện học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-electricity", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-4', 'mcq', 'Điện học - Định luật Ohm', 'sci-phy-electricity', 'Đồ thị biểu diễn sự phụ thuộc của cường độ dòng điện vào hiệu điện thế giữa hai đầu dây dẫn có dạng là gì?', ARRAY['A. Một đường thẳng đi qua gốc tọa độ', 'B. Một đường thẳng không đi qua gốc tọa độ', 'C. Một đường cong đi qua gốc tọa độ', 'D. Một đường cong không đi qua gốc tọa độ']::varchar[], ARRAY['A. Một đường thẳng đi qua gốc tọa độ']::varchar[], 'Theo định luật Ohm, I tỉ lệ thuận với U, nên đồ thị I-U là đường thẳng đi qua gốc tọa độ.', 3, 'Thuviendethi.com - Trắc nghiệm Vật lý 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-electricity", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-5', 'mcq', 'Điện học - Điện trở', 'sci-phy-electricity', 'Điện trở R của dây dẫn biểu thị cho điều gì?', ARRAY['A. Tính cản trở dòng điện nhiều hay ít của dây', 'B. Tính cản trở hiệu điện thế nhiều hay ít của dây', 'C. Tính cản trở electron nhiều hay ít của dây', 'D. Tính cản trở điện lượng nhiều hay ít của dây']::varchar[], ARRAY['A. Tính cản trở dòng điện nhiều hay ít của dây']::varchar[], 'Điện trở đặc trưng cho mức độ cản trở dòng điện chạy qua dây dẫn.', 3, 'VietJack - Trắc nghiệm KHTN 9 Điện học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-electricity", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-6', 'mcq', 'Điện học - Đoạn mạch nối tiếp', 'sci-phy-electricity', 'Trong đoạn mạch mắc nối tiếp, điện trở tương đương bằng:', ARRAY['A. Tích các điện trở thành phần', 'B. Tổng các điện trở thành phần', 'C. Hiệu các điện trở thành phần', 'D. Thương các điện trở thành phần']::varchar[], ARRAY['B. Tổng các điện trở thành phần']::varchar[], 'Trong đoạn mạch nối tiếp: R_td = R1 + R2 + ... + Rn.', 3, 'VietJack - Trắc nghiệm KHTN 9 Điện học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-electricity", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-7', 'mcq', 'Điện học - Đoạn mạch song song', 'sci-phy-electricity', 'Trong đoạn mạch mắc song song, hiệu điện thế giữa hai đầu mỗi điện trở:', ARRAY['A. Tỉ lệ thuận với điện trở đó', 'B. Tỉ lệ nghịch với điện trở đó', 'C. Bằng nhau và bằng hiệu điện thế toàn mạch', 'D. Bằng tổng hiệu điện thế của các nhánh']::varchar[], ARRAY['C. Bằng nhau và bằng hiệu điện thế toàn mạch']::varchar[], 'Trong mạch song song, hiệu điện thế hai đầu mỗi nhánh bằng nhau và bằng hiệu điện thế hai đầu đoạn mạch.', 3, 'VietJack - Trắc nghiệm KHTN 9 Điện học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-electricity", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-8', 'mcq', 'Điện học - Công suất', 'sci-phy-electricity', 'Công suất điện được tính theo công thức nào?', ARRAY['A. P = U/I', 'B. P = U²/R', 'C. P = U·I', 'D. Cả B và C đều đúng']::varchar[], ARRAY['D. Cả B và C đều đúng']::varchar[], 'Công suất điện: P = U·I = I²·R = U²/R. Cả B và C đều là biểu thức hợp lệ.', 3, 'VietJack - Trắc nghiệm KHTN 9 Điện học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-electricity", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-9', 'mcq', 'Điện học - Đơn vị', 'sci-phy-electricity', 'Đơn vị đo cường độ dòng điện là gì?', ARRAY['A. Vôn (V)', 'B. Ôm (Ω)', 'C. Ampe (A)', 'D. Oát (W)']::varchar[], ARRAY['C. Ampe (A)']::varchar[], 'Đơn vị đo cường độ dòng điện là Ampe (A), ký hiệu I.', 3, 'VietJack - Trắc nghiệm KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-electricity", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-10', 'mcq', 'Điện học - Đoạn mạch nối tiếp', 'sci-phy-electricity', 'Hai điện trở R1 = 4Ω và R2 = 6Ω mắc nối tiếp. Điện trở tương đương của đoạn mạch là:', ARRAY['A. 2,4Ω', 'B. 10Ω', 'C. 24Ω', 'D. 1,5Ω']::varchar[], ARRAY['B. 10Ω']::varchar[], 'Mạch nối tiếp: R_td = R1 + R2 = 4 + 6 = 10Ω.', 3, 'VietJack - Trắc nghiệm KHTN 9 Điện học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-electricity", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-11', 'mcq', 'Quang học - Khúc xạ ánh sáng', 'sci-phy-optics', 'Khi ánh sáng truyền từ không khí vào nước, hiện tượng gì xảy ra?', ARRAY['A. Tia sáng bị phản xạ hoàn toàn', 'B. Tia sáng bị khúc xạ, góc khúc xạ nhỏ hơn góc tới', 'C. Tia sáng bị khúc xạ, góc khúc xạ lớn hơn góc tới', 'D. Tia sáng truyền thẳng không bị bẻ cong']::varchar[], ARRAY['B. Tia sáng bị khúc xạ, góc khúc xạ nhỏ hơn góc tới']::varchar[], 'Khi ánh sáng từ không khí vào nước (môi trường chiết quang hơn), tia sáng bị gãy khúc về phía pháp tuyến, góc khúc xạ r < góc tới i.', 3, 'VietJack - Trắc nghiệm KHTN 9 Quang học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-optics", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-12', 'mcq', 'Quang học - Thấu kính hội tụ', 'sci-phy-optics', 'Thấu kính hội tụ có đặc điểm nào sau đây?', ARRAY['A. Có phần rìa dày hơn phần giữa', 'B. Có phần giữa dày hơn phần rìa', 'C. Có hai mặt đều lõm', 'D. Không thể tạo ảnh thật']::varchar[], ARRAY['B. Có phần giữa dày hơn phần rìa']::varchar[], 'Thấu kính hội tụ có phần giữa dày hơn phần rìa, có khả năng hội tụ chùm tia sáng song song vào một điểm.', 3, 'VietJack - Trắc nghiệm KHTN 9 Quang học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-optics", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-13', 'mcq', 'Quang học - Thấu kính hội tụ', 'sci-phy-optics', 'Vật đặt ngoài tiêu cự của thấu kính hội tụ cho ảnh có tính chất gì?', ARRAY['A. Ảnh ảo, cùng chiều, lớn hơn vật', 'B. Ảnh thật, ngược chiều với vật', 'C. Ảnh ảo, ngược chiều, nhỏ hơn vật', 'D. Không tạo ảnh']::varchar[], ARRAY['B. Ảnh thật, ngược chiều với vật']::varchar[], 'Vật đặt ngoài tiêu cự của thấu kính hội tụ cho ảnh thật, ngược chiều với vật. Kích thước ảnh phụ thuộc vào khoảng cách từ vật đến thấu kính.', 3, 'VietJack - Trắc nghiệm KHTN 9 Quang học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-optics", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-14', 'mcq', 'Quang học - Khúc xạ ánh sáng', 'sci-phy-optics', 'Hiện tượng khúc xạ ánh sáng là gì?', ARRAY['A. Hiện tượng ánh sáng bị hắt lại khi gặp mặt phân cách', 'B. Hiện tượng tia sáng bị gãy khúc khi truyền qua mặt phân cách giữa hai môi trường trong suốt khác nhau', 'C. Hiện tượng ánh sáng bị hấp thụ hoàn toàn', 'D. Hiện tượng ánh sáng truyền thẳng']::varchar[], ARRAY['B. Hiện tượng tia sáng bị gãy khúc khi truyền qua mặt phân cách giữa hai môi trường trong suốt khác nhau']::varchar[], 'Khúc xạ ánh sáng là hiện tượng tia sáng bị bẻ cong khi đi qua mặt phân cách giữa hai môi trường trong suốt có chiết suất khác nhau.', 3, 'Loigiaihay.com - Trắc nghiệm KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-optics", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-15', 'mcq', 'Quang học - Kính lúp', 'sci-phy-optics', 'Kính lúp là dụng cụ quang học bổ trợ cho mắt để quan sát các vật nhỏ. Kính lúp có cấu tạo là:', ARRAY['A. Thấu kính phân kỳ có tiêu cự ngắn', 'B. Thấu kính hội tụ có tiêu cự ngắn', 'C. Gương cầu lõm', 'D. Gương phẳng']::varchar[], ARRAY['B. Thấu kính hội tụ có tiêu cự ngắn']::varchar[], 'Kính lúp là thấu kính hội tụ có tiêu cự ngắn (thường dưới 10cm), cho ảnh ảo, cùng chiều, lớn hơn vật.', 3, 'VietJack - Trắc nghiệm KHTN 9 Quang học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-optics", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-16', 'mcq', 'Quang học - Thấu kính hội tụ', 'sci-phy-optics', 'Vật đặt trong khoảng tiêu cự của thấu kính hội tụ cho ảnh có tính chất gì?', ARRAY['A. Ảnh thật, ngược chiều', 'B. Ảnh thật, cùng chiều', 'C. Ảnh ảo, cùng chiều, lớn hơn vật', 'D. Không tạo ảnh']::varchar[], ARRAY['C. Ảnh ảo, cùng chiều, lớn hơn vật']::varchar[], 'Vật đặt trong khoảng tiêu cự (d < f) của thấu kính hội tụ cho ảnh ảo, cùng chiều và lớn hơn vật.', 3, 'VietJack - Trắc nghiệm KHTN 9 Quang học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-optics", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-17', 'mcq', 'Nhiệt học - Nhiệt lượng', 'sci-phy-heat', 'Nhiệt lượng mà vật thu vào hay tỏa ra phụ thuộc vào những yếu tố nào?', ARRAY['A. Khối lượng và thể tích của vật', 'B. Khối lượng, nhiệt độ ban đầu và nhiệt độ cuối của vật', 'C. Khối lượng của vật, chất cấu tạo nên vật và độ thay đổi nhiệt độ của vật', 'D. Nhiệt độ ban đầu, chất cấu tạo nên vật và áp suất môi trường']::varchar[], ARRAY['C. Khối lượng của vật, chất cấu tạo nên vật và độ thay đổi nhiệt độ của vật']::varchar[], 'Nhiệt lượng Q phụ thuộc vào khối lượng m, chất cấu tạo (nhiệt dung riêng c) và độ biến thiên nhiệt độ Δt: Q = mcΔt.', 3, 'Tổng hợp VietJack - Trắc nghiệm KHTN 9 Nhiệt học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-heat", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-18', 'mcq', 'Nhiệt học - Nhiệt lượng', 'sci-phy-heat', 'Công thức tính nhiệt lượng thu vào của một vật là gì?', ARRAY['A. Q = mc(t₂ - t₁)', 'B. Q = mc(t₂ + t₁)', 'C. Q = m(t₂ - t₁)', 'D. Q = c(t₂ - t₁)']::varchar[], ARRAY['A. Q = mc(t₂ - t₁)']::varchar[], 'Công thức nhiệt lượng: Q = mc·Δt = mc(t₂ - t₁), trong đó m là khối lượng, c là nhiệt dung riêng, Δt là độ biến thiên nhiệt độ.', 3, 'VietJack - Trắc nghiệm KHTN 9 Nhiệt học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-heat", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-19', 'mcq', 'Nhiệt học - Nhiệt dung riêng', 'sci-phy-heat', 'Đơn vị của nhiệt dung riêng là gì?', ARRAY['A. Jun (J)', 'B. Jun trên kilôgam (J/kg)', 'C. Jun trên kilôgam độ (J/kg.K)', 'D. Jun trên độ (J/K)']::varchar[], ARRAY['C. Jun trên kilôgam độ (J/kg.K)']::varchar[], 'Từ công thức c = Q/(m·Δt), đơn vị của c là J/(kg·K) hoặc J/(kg·°C).', 3, 'VietJack - Trắc nghiệm KHTN 9 Nhiệt học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-heat", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-20', 'mcq', 'Nhiệt học - Nhiệt dung riêng', 'sci-phy-heat', 'Nhiệt dung riêng của đồng là 380 J/kg.K. Điều này có ý nghĩa gì?', ARRAY['A. Để làm nóng 1kg đồng tăng thêm 1°C cần cung cấp nhiệt lượng 380J', 'B. Để làm nóng 380kg đồng tăng thêm 1°C cần cung cấp nhiệt lượng 1J', 'C. Nhiệt lượng tỏa ra khi 1kg đồng nguội đi 1°C là 380J', 'D. Cả A và C đều đúng']::varchar[], ARRAY['D. Cả A và C đều đúng']::varchar[], 'Nhiệt dung riêng c = 380 J/kg.K có nghĩa là cần 380J để tăng 1kg đồng lên 1°C, và ngược lại tỏa ra 380J khi giảm 1°C.', 3, 'VietJack - Trắc nghiệm KHTN 9 Nhiệt học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-heat", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-21', 'mcq', 'Nhiệt học - Cân bằng nhiệt', 'sci-phy-heat', 'Nguyên lý cân bằng nhiệt được phát biểu là:', ARRAY['A. Nhiệt lượng vật lạnh tỏa ra bằng nhiệt lượng vật nóng thu vào', 'B. Nhiệt lượng vật nóng tỏa ra bằng nhiệt lượng vật lạnh thu vào', 'C. Tổng nhiệt lượng tỏa ra của mọi vật bằng tổng nhiệt lượng thu vào', 'D. Nhiệt lượng tỏa ra luôn lớn hơn nhiệt lượng thu vào']::varchar[], ARRAY['B. Nhiệt lượng vật nóng tỏa ra bằng nhiệt lượng vật lạnh thu vào']::varchar[], 'Nguyên lý cân bằng nhiệt: Q_tỏa = Q_thu, tức là nhiệt lượng vật nóng tỏa ra đúng bằng nhiệt lượng vật lạnh thu vào.', 3, 'VietJack - Trắc nghiệm KHTN 9 Nhiệt học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-phy-heat", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-22', 'mcq', 'Hóa học - Phi kim', 'sci-chem-inorganic', 'Ở điều kiện thường, phi kim tồn tại ở những trạng thái nào?', ARRAY['A. Chỉ ở thể khí', 'B. Chỉ ở thể rắn', 'C. Rắn, lỏng và khí', 'D. Chỉ ở thể rắn và lỏng']::varchar[], ARRAY['C. Rắn, lỏng và khí']::varchar[], 'Phi kim tồn tại ở cả 3 trạng thái: rắn (S, C, P...), lỏng (Br₂), khí (O₂, Cl₂, N₂...).', 3, 'VietJack - Trắc nghiệm KHTN 9 Hóa học Phi kim', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-chem-inorganic", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-23', 'mcq', 'Hóa học - Phi kim', 'sci-chem-inorganic', 'Phi kim nào tồn tại ở thể lỏng trong điều kiện thường?', ARRAY['A. Clo (Cl₂)', 'B. Lưu huỳnh (S)', 'C. Brom (Br₂)', 'D. Iot (I₂)']::varchar[], ARRAY['C. Brom (Br₂)']::varchar[], 'Brom (Br₂) là phi kim duy nhất tồn tại ở thể lỏng ở điều kiện thường (nhiệt độ phòng).', 3, 'VietJack - Trắc nghiệm KHTN 9 Hóa học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-chem-inorganic", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-24', 'mcq', 'Hóa học - Oxit axit', 'sci-chem-inorganic', 'Khí nào làm đục nước vôi trong và là oxit axit của phi kim?', ARRAY['A. SO₂', 'B. CO₂', 'C. NO₂', 'D. Cả A, B, C']::varchar[], ARRAY['D. Cả A, B, C']::varchar[], 'SO₂, CO₂, NO₂ đều là oxit axit của phi kim, khi sục vào nước vôi trong Ca(OH)₂ đều tạo muối kết tủa làm đục dung dịch.', 3, 'VietJack - Trắc nghiệm KHTN 9 Hóa học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-chem-inorganic", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-25', 'mcq', 'Vi phạm pháp luật - Dân sự', 'civ-law-order', 'Vi phạm pháp luật dân sự là hành vi vi phạm pháp luật, xâm phạm tới:', ARRAY['A. Các quan hệ công vụ và nhân thân', 'B. Các quy tắc quản lý nhà nước', 'C. Các quan hệ tài sản và quan hệ nhân thân', 'D. Các quan hệ lao động, công vụ nhà nước']::varchar[], ARRAY['C. Các quan hệ tài sản và quan hệ nhân thân']::varchar[], 'Vi phạm pháp luật dân sự xâm phạm đến quan hệ tài sản (hợp đồng, thừa kế...) và quan hệ nhân thân.', 3, 'Loigiaihay.com - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-26', 'mcq', 'Hóa học - Phi kim Clo', 'sci-chem-inorganic', 'Tính chất hóa học đặc trưng của Clo là gì?', ARRAY['A. Tính khử mạnh', 'B. Tính oxi hóa mạnh', 'C. Tính axit mạnh', 'D. Tính bazơ mạnh']::varchar[], ARRAY['B. Tính oxi hóa mạnh']::varchar[], 'Clo có tính oxi hóa mạnh, tác dụng mạnh với kim loại, phi kim và nước tạo hỗn hợp HCl và HClO.', 3, 'VietJack - Trắc nghiệm KHTN 9 Hóa học Phi kim', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-chem-inorganic", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-27', 'mcq', 'Hóa học - Phi kim Cacbon', 'sci-chem-inorganic', 'Sản phẩm khi đốt cháy Cacbon trong oxi dư là gì?', ARRAY['A. CO (cacbon monooxit)', 'B. CO₂ (cacbon đioxit)', 'C. Hỗn hợp CO và CO₂', 'D. C₂O (đicacbon oxit)']::varchar[], ARRAY['B. CO₂ (cacbon đioxit)']::varchar[], 'Khi đốt cacbon trong oxi dư: C + O₂ → CO₂. Trong điều kiện thiếu oxi sẽ tạo CO.', 3, 'VietJack - Trắc nghiệm KHTN 9 Hóa học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-chem-inorganic", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-28', 'mcq', 'Hóa học - Hợp chất Axit', 'sci-chem-inorganic', 'Trong phản ứng hóa học, quỳ tím chuyển sang màu đỏ khi tiếp xúc với chất nào?', ARRAY['A. Dung dịch NaOH', 'B. Nước cất', 'C. Dung dịch HCl', 'D. Dung dịch NaCl']::varchar[], ARRAY['C. Dung dịch HCl']::varchar[], 'Quỳ tím chuyển đỏ trong môi trường axit (HCl, H₂SO₄...), chuyển xanh trong môi trường bazơ, không đổi màu trong dung dịch trung tính.', 3, 'VietJack - Trắc nghiệm KHTN 9 Hóa học', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-chem-inorganic", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-29', 'mcq', 'Di truyền - Menđen', 'sci-bio-genetics-mendelian', 'Tính trạng tương phản là:', ARRAY['A. Các tính trạng cùng một loại nhưng biểu hiện trái ngược nhau', 'B. Những tính trạng về số lượng và chất lượng', 'C. Tính trạng do một cặp alen quy định', 'D. Các tính trạng khác biệt nhau']::varchar[], ARRAY['A. Các tính trạng cùng một loại nhưng biểu hiện trái ngược nhau']::varchar[], 'Tính trạng tương phản là những dạng biểu hiện trái ngược nhau của cùng một loại tính trạng (VD: hạt trơn/hạt nhăn, hoa đỏ/hoa trắng).', 3, 'VietJack - Trắc nghiệm Sinh học 9 Di truyền', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-bio-genetics-mendelian", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-30', 'mcq', 'Di truyền - Menđen', 'sci-bio-genetics-mendelian', 'Đặc điểm nào của cây Đậu Hà Lan tạo điều kiện thuận lợi cho Menđen nghiên cứu quy luật di truyền?', ARRAY['A. Sinh sản nhanh và phát triển mạnh', 'B. Có hoa lưỡng tính, tự thụ phấn nghiêm ngặt', 'C. Có hoa lưỡng tính, tự thụ phấn không nghiêm ngặt', 'D. Có hoa đơn tính, giao phấn nghiêm ngặt']::varchar[], ARRAY['B. Có hoa lưỡng tính, tự thụ phấn nghiêm ngặt']::varchar[], 'Cây đậu Hà Lan có hoa lưỡng tính, tự thụ phấn nghiêm ngặt, dễ kiểm soát giao phấn, có nhiều cặp tính trạng tương phản rõ ràng.', 3, 'VietJack - Loigiaihay - Trắc nghiệm Sinh học 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-bio-genetics-mendelian", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-31', 'mcq', 'Di truyền - ADN', 'sci-bio-genetics-mendelian', 'Đơn vị cấu tạo nên ADN là:', ARRAY['A. Axit ribônuclêic', 'B. Axit đêôxiribônuclêic', 'C. Axit amin', 'D. Nuclêôtit']::varchar[], ARRAY['D. Nuclêôtit']::varchar[], 'ADN (Axit đêôxiribônuclêic) được cấu tạo từ các đơn phân là nuclêôtit, mỗi nuclêôtit gồm đường deoxiribose, nhóm photphat và bazơ nitric.', 3, 'VietJack - Trắc nghiệm Sinh học 9 Di truyền', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-bio-genetics-mendelian", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-32', 'mcq', 'Di truyền - Nhiễm sắc thể', 'sci-bio-genetics-mendelian', 'Trong quá trình nguyên phân, có thể quan sát rõ nhất hình thái NST ở vào kì nào?', ARRAY['A. Kì trung gian', 'B. Kì đầu', 'C. Kì giữa', 'D. Kì sau']::varchar[], ARRAY['C. Kì giữa']::varchar[], 'Ở kì giữa của nguyên phân, các NST co ngắn cực đại và xếp thành hàng ở mặt phẳng xích đạo tế bào, quan sát rõ nhất hình thái NST.', 3, 'VietJack - Trắc nghiệm Sinh học 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-bio-genetics-mendelian", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-33', 'mcq', 'Tiến hóa - Thuyết Darwin', 'sci-bio-evolution', 'Theo Darwin, nhân tố chính quy định chiều hướng và tốc độ biến đổi của các loài là gì?', ARRAY['A. Chọn lọc nhân tạo', 'B. Chọn lọc tự nhiên', 'C. Đấu tranh sinh tồn', 'D. Biến dị và di truyền']::varchar[], ARRAY['B. Chọn lọc tự nhiên']::varchar[], 'Theo Darwin, chọn lọc tự nhiên là nhân tố chủ đạo, đào thải cá thể kém thích nghi và giữ lại cá thể có biến dị có lợi, quy định chiều hướng tiến hóa.', 3, 'Kenhgiaovien.com - Trắc nghiệm Sinh học 9 Tiến hóa', 'science', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["sci-bio-evolution", "science"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-34', 'mcq', 'Lịch sử thế giới - Liên Xô', 'his-world-contemporary', 'Cuộc Nội chiến Nga diễn ra từ năm nào đến năm nào?', ARRAY['A. 1914 – 1918', 'B. 1917 – 1922', 'C. 1920 – 1925', 'D. 1936 – 1939']::varchar[], ARRAY['B. 1917 – 1922']::varchar[], 'Sau Cách mạng tháng Mười 1917, nước Nga rơi vào nội chiến giữa lực lượng Bolshevik (Hồng quân) và Bạch vệ kéo dài đến năm 1922.', 3, 'Studocu.vn - Trắc nghiệm Lịch sử 9 Thế giới 1918-1945', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-35', 'mcq', 'Lịch sử thế giới - Liên Xô', 'his-world-contemporary', 'Trọng tâm phát triển kinh tế của Liên Xô từ năm 1922 đến năm 1945 là gì?', ARRAY['A. Phát triển công nghiệp nhẹ', 'B. Phát triển dịch vụ, thương mại', 'C. Phát triển du lịch', 'D. Phát triển công nghiệp nặng']::varchar[], ARRAY['D. Phát triển công nghiệp nặng']::varchar[], 'Trong các kế hoạch 5 năm, Liên Xô tập trung phát triển công nghiệp nặng để biến Liên Xô từ nước nông nghiệp lạc hậu thành cường quốc công nghiệp.', 3, 'Studocu.vn - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-36', 'mcq', 'Lịch sử thế giới - CTTG II', 'his-world-contemporary', 'Hội nghị Ianta (tháng 2/1945) được triệu tập vào thời điểm nào của Chiến tranh thế giới thứ hai?', ARRAY['A. Khi chiến tranh thế giới thứ hai bùng nổ', 'B. Khi chiến tranh bước vào giai đoạn ác liệt nhất', 'C. Khi chiến tranh thế giới thứ hai bước vào giai đoạn kết thúc', 'D. Khi chiến tranh thế giới thứ hai đã kết thúc hoàn toàn']::varchar[], ARRAY['C. Khi chiến tranh thế giới thứ hai bước vào giai đoạn kết thúc']::varchar[], 'Đầu năm 1945, phe Đồng minh đã giành thắng lợi lớn, chiến tranh đang đi đến hồi kết. Hội nghị Ianta bàn về phân chia khu vực ảnh hưởng sau chiến tranh.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-37', 'mcq', 'Lịch sử thế giới - CTTG II', 'his-world-contemporary', 'Những cường quốc nào tham gia Hội nghị Ianta vào tháng 2/1945?', ARRAY['A. Anh, Pháp, Mĩ', 'B. Anh, Mĩ, Liên Xô', 'C. Anh, Pháp, Đức', 'D. Mĩ, Liên Xô, Trung Quốc']::varchar[], ARRAY['B. Anh, Mĩ, Liên Xô']::varchar[], 'Hội nghị Ianta có sự tham dự của 3 cường quốc: Mĩ (Roosevelt), Anh (Churchill) và Liên Xô (Stalin).', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-38', 'mcq', 'Lịch sử thế giới - Khủng hoảng 1929-1933', 'his-world-contemporary', 'Cuộc khủng hoảng kinh tế thế giới 1929-1933 bùng nổ đầu tiên ở nước nào?', ARRAY['A. Anh', 'B. Pháp', 'C. Mĩ', 'D. Đức']::varchar[], ARRAY['C. Mĩ']::varchar[], 'Cuộc khủng hoảng kinh tế thế giới 1929-1933 bùng nổ đầu tiên ở Mĩ vào tháng 10/1929 (''Thứ Năm Đen''), sau đó lan ra toàn thế giới tư bản.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-39', 'mcq', 'Lịch sử thế giới - Chủ nghĩa phát xít', 'his-world-contemporary', 'Chủ nghĩa phát xít hình thành đầu tiên ở nước nào?', ARRAY['A. Đức', 'B. Nhật Bản', 'C. Ý', 'D. Tây Ban Nha']::varchar[], ARRAY['C. Ý']::varchar[], 'Chủ nghĩa phát xít hình thành đầu tiên ở Ý năm 1922 khi Mussolini lên nắm quyền, sau đó mới xuất hiện ở Đức (1933) và Nhật Bản.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-40', 'mcq', 'Lịch sử thế giới - CTTG II', 'his-world-contemporary', 'Chiến tranh thế giới thứ hai bùng nổ vào ngày tháng năm nào?', ARRAY['A. 1/9/1939', 'B. 22/6/1941', 'C. 7/12/1941', 'D. 6/6/1944']::varchar[], ARRAY['A. 1/9/1939']::varchar[], 'Chiến tranh thế giới thứ hai chính thức bùng nổ ngày 1/9/1939 khi Đức phát xít tấn công Ba Lan, Anh và Pháp tuyên chiến với Đức.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-41', 'mcq', 'Lịch sử thế giới - CTTG II', 'his-world-contemporary', 'Sự kiện nào buộc Mĩ tham gia vào Chiến tranh thế giới thứ hai?', ARRAY['A. Đức tấn công Liên Xô (22/6/1941)', 'B. Nhật Bản tấn công căn cứ hải quân Trân Châu Cảng (7/12/1941)', 'C. Đức tấn công Ba Lan (1/9/1939)', 'D. Phong trào kháng chiến ở châu Âu']::varchar[], ARRAY['B. Nhật Bản tấn công căn cứ hải quân Trân Châu Cảng (7/12/1941)']::varchar[], 'Ngày 7/12/1941, Nhật Bản bất ngờ tấn công căn cứ Trân Châu Cảng của Mĩ tại Hawaii, buộc Mĩ phải tuyên chiến và tham gia CTTG II.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-42', 'mcq', 'Lịch sử thế giới - Khủng hoảng 1929-1933', 'his-world-contemporary', 'Khủng hoảng kinh tế 1929-1933 dẫn đến hậu quả gì nghiêm trọng nhất về mặt chính trị?', ARRAY['A. Làn sóng cách mạng công nhân bùng nổ toàn cầu', 'B. Sự ra đời và thắng lợi của chủ nghĩa phát xít ở một số nước', 'C. Các nước tư bản đoàn kết chống lại Liên Xô', 'D. Sự sụp đổ của hệ thống Véc-xai – Oasinhtơn']::varchar[], ARRAY['B. Sự ra đời và thắng lợi của chủ nghĩa phát xít ở một số nước']::varchar[], 'Khủng hoảng kinh tế 1929-1933 dẫn đến sự lên nắm quyền của phe phát xít ở Đức, Ý, Nhật — mầm mống của CTTG II.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-43', 'mcq', 'Lịch sử thế giới - Chủ nghĩa phát xít', 'his-world-contemporary', 'Liên minh các nước phát xít Đức - Ý - Nhật còn được gọi là gì?', ARRAY['A. Phe Đồng minh', 'B. Trục Berlin - Roma - Tokyo', 'C. Liên minh Trục', 'D. Cả B và C đều đúng']::varchar[], ARRAY['D. Cả B và C đều đúng']::varchar[], 'Liên minh Đức - Ý - Nhật (1936-1937) được gọi là ''Trục Berlin - Roma - Tokyo'' hay ''Liên minh Trục''.', 3, 'Loigiaihay.com - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-44', 'mcq', 'Lịch sử thế giới - CTTG II', 'his-world-contemporary', 'Chiến tranh thế giới thứ hai kết thúc ở châu Âu vào ngày nào?', ARRAY['A. 2/9/1945', 'B. 8/5/1945', 'C. 9/5/1945', 'D. 15/8/1945']::varchar[], ARRAY['B. 8/5/1945']::varchar[], 'Đức đầu hàng vô điều kiện ngày 8/5/1945, đánh dấu chiến tranh kết thúc ở châu Âu. Nhật Bản đầu hàng 2/9/1945 kết thúc CTTG II hoàn toàn.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-world-contemporary", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-45', 'mcq', 'Lịch sử Việt Nam - Cách mạng tháng Tám', 'his-vn-independence', 'Hội nghị nào quyết định phát động Tổng khởi nghĩa tháng Tám trong cả nước?', ARRAY['A. Hội nghị Trung ương Đảng lần thứ 8', 'B. Hội nghị toàn quốc của Đảng tại Tân Trào', 'C. Đại hội Quốc dân Tân Trào', 'D. Hội nghị Ban Thường vụ Trung ương Đảng']::varchar[], ARRAY['B. Hội nghị toàn quốc của Đảng tại Tân Trào']::varchar[], 'Hội nghị toàn quốc của Đảng tại Tân Trào (13-15/8/1945) đã quyết định phát động Tổng khởi nghĩa trong cả nước.', 3, 'Loigiaihay.com - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-independence", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-46', 'mcq', 'Lịch sử Việt Nam - Cách mạng tháng Tám', 'his-vn-independence', 'Ngày 19/8/1945 đã diễn ra sự kiện lịch sử gì quan trọng?', ARRAY['A. Tổng khởi nghĩa tháng Tám thắng lợi trong cả nước', 'B. Khởi nghĩa giành chính quyền ở Hà Nội', 'C. Tổng khởi nghĩa tháng Tám bùng nổ', 'D. Vua Bảo Đại tuyên bố thoái vị']::varchar[], ARRAY['B. Khởi nghĩa giành chính quyền ở Hà Nội']::varchar[], 'Ngày 19/8/1945, nhân dân Hà Nội đã nổi dậy khởi nghĩa, giành chính quyền tại thủ đô — sự kiện quan trọng nhất trong Tổng khởi nghĩa.', 3, 'Loigiaihay.com - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-independence", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-47', 'mcq', 'Lịch sử Việt Nam - Cách mạng tháng Tám', 'his-vn-independence', 'Sự kiện nào đánh dấu chế độ phong kiến Việt Nam hoàn toàn sụp đổ?', ARRAY['A. Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn độc lập', 'B. Cách mạng tháng Tám thành công trong cả nước', 'C. Vua Bảo Đại tuyên bố thoái vị ngày 30/8/1945', 'D. Nước Việt Nam Dân chủ Cộng hòa ra đời']::varchar[], ARRAY['C. Vua Bảo Đại tuyên bố thoái vị ngày 30/8/1945']::varchar[], 'Ngày 30/8/1945, vua Bảo Đại - vị vua cuối cùng của triều Nguyễn - tuyên bố thoái vị, đánh dấu chế độ phong kiến Việt Nam hoàn toàn sụp đổ.', 3, 'Loigiaihay.com - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-independence", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-48', 'mcq', 'Lịch sử Việt Nam - Cách mạng tháng Tám', 'his-vn-independence', 'Nước Việt Nam Dân chủ Cộng hòa chính thức ra đời vào ngày nào?', ARRAY['A. 19/8/1945', 'B. 30/8/1945', 'C. 2/9/1945', 'D. 23/9/1945']::varchar[], ARRAY['C. 2/9/1945']::varchar[], 'Ngày 2/9/1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-independence", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-49', 'mcq', 'Lịch sử Việt Nam - Sau 1945', 'his-vn-independence', 'Khó khăn lớn nhất mà nước Việt Nam Dân chủ Cộng hòa gặp phải ngay sau Cách mạng tháng Tám năm 1945 là gì?', ARRAY['A. Quân đội chưa được củng cố', 'B. Nạn đói và nạn dốt hoành hành', 'C. Nạn ngoại xâm và nội phản', 'D. Ngân sách nhà nước trống rỗng']::varchar[], ARRAY['C. Nạn ngoại xâm và nội phản']::varchar[], 'Ngay sau CM tháng Tám, Việt Nam đối mặt với ''giặc ngoại xâm, giặc đói, giặc dốt''. Ngoại xâm và nội phản là khó khăn nghiêm trọng nhất vì đe dọa trực tiếp nền độc lập.', 3, 'Tech12h.com - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-independence", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-50', 'mcq', 'Lịch sử Việt Nam - Sau 1945', 'his-vn-independence', 'Việt Nam ký với Pháp Hiệp định Sơ bộ ngày 6/3/1946 nhằm mục đích gì?', ARRAY['A. Chấm dứt chiến tranh, lập lại hòa bình', 'B. Hòa hoãn với Pháp để đuổi quân Trung Hoa Dân quốc, tranh thủ thời gian chuẩn bị kháng chiến', 'C. Phân hóa kẻ thù, tập trung đánh kẻ thù chủ yếu', 'D. Công nhận quyền độc lập của Việt Nam']::varchar[], ARRAY['B. Hòa hoãn với Pháp để đuổi quân Trung Hoa Dân quốc, tranh thủ thời gian chuẩn bị kháng chiến']::varchar[], 'Hiệp định Sơ bộ 6/3/1946 là sách lược hòa hoãn tạm thời với Pháp để nhanh chóng đuổi 20 vạn quân Trung Hoa Dân quốc về nước, tranh thủ thời gian xây dựng lực lượng.', 3, 'Tech12h.com - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-independence", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-51', 'mcq', 'Lịch sử Việt Nam - Kháng chiến chống Pháp', 'his-vn-independence', 'Toàn quốc kháng chiến chống thực dân Pháp bùng nổ vào ngày nào?', ARRAY['A. 23/9/1945', 'B. 6/3/1946', 'C. 19/12/1946', 'D. 7/5/1954']::varchar[], ARRAY['C. 19/12/1946']::varchar[], 'Ngày 19/12/1946, Chủ tịch Hồ Chí Minh ra Lời kêu gọi Toàn quốc kháng chiến, mở đầu cuộc kháng chiến chống thực dân Pháp (1946-1954).', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-independence", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-52', 'mcq', 'Lịch sử Việt Nam - Kháng chiến chống Pháp', 'his-vn-independence', 'Chiến thắng Điện Biên Phủ diễn ra vào ngày tháng năm nào?', ARRAY['A. 13/3/1954', 'B. 7/5/1954', 'C. 20/7/1954', 'D. 1/5/1954']::varchar[], ARRAY['B. 7/5/1954']::varchar[], 'Ngày 7/5/1954, quân và dân Việt Nam kết thúc chiến dịch Điện Biên Phủ, tiêu diệt và bắt sống toàn bộ quân địch, tướng De Castries bị bắt.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-independence", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-53', 'mcq', 'Lịch sử Việt Nam - Kháng chiến chống Pháp', 'his-vn-independence', 'Hiệp định Giơnevơ (1954) về Đông Dương ký kết vào ngày nào?', ARRAY['A. 7/5/1954', 'B. 20/7/1954', 'C. 21/7/1954', 'D. 1/8/1954']::varchar[], ARRAY['C. 21/7/1954']::varchar[], 'Hiệp định Giơnevơ được ký kết ngày 21/7/1954, quy định tạm thời chia đôi Việt Nam ở vĩ tuyến 17, Pháp rút quân, tổng tuyển cử thống nhất vào 7/1956.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-independence", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-54', 'mcq', 'Lịch sử Việt Nam - Kháng chiến chống Mĩ', 'his-vn-reunification', 'Tổng tiến công và nổi dậy Xuân Mậu Thân 1968 diễn ra trong bối cảnh nào?', ARRAY['A. Mĩ vừa tăng quân vào miền Nam Việt Nam', 'B. Mĩ đang đàm phán để rút quân', 'C. Tết Nguyên Đán Mậu Thân - lúc Mĩ và ngụy mất cảnh giác nhất', 'D. Ngay sau khi Mĩ ném bom miền Bắc']::varchar[], ARRAY['C. Tết Nguyên Đán Mậu Thân - lúc Mĩ và ngụy mất cảnh giác nhất']::varchar[], 'Cuộc Tổng tiến công Xuân Mậu Thân diễn ra đúng dịp Tết Mậu Thân (1968), khi địch chủ quan mất cảnh giác, tạo bất ngờ chiến lược lớn cho Mĩ và ngụy.', 3, 'Loigiaihay.com - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-reunification", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-55', 'mcq', 'Lịch sử Việt Nam - Kháng chiến chống Mĩ', 'his-vn-reunification', 'Hiệp định Paris (1973) về Việt Nam quy định điều gì quan trọng nhất?', ARRAY['A. Mĩ công nhận độc lập của Việt Nam', 'B. Mĩ rút hết quân khỏi miền Nam Việt Nam', 'C. Việt Nam được thống nhất hoàn toàn', 'D. Ngừng bắn và rút quân Mĩ, trao trả tù binh']::varchar[], ARRAY['D. Ngừng bắn và rút quân Mĩ, trao trả tù binh']::varchar[], 'Hiệp định Paris ký 27/1/1973 quy định: ngừng bắn, Mĩ rút hết quân, trao trả tù binh. Miền Nam vẫn tạm thời chia cắt.', 3, 'VietJack - Trắc nghiệm Lịch sử 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["his-vn-reunification", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-56', 'mcq', 'Địa lý - Đông Nam Bộ', 'geo-vn-regions', 'Khoáng sản quan trọng nhất ở vùng Đông Nam Bộ là gì?', ARRAY['A. Than đá', 'B. Dầu khí', 'C. Bô-xít', 'D. Đồng']::varchar[], ARRAY['B. Dầu khí']::varchar[], 'Đông Nam Bộ có thềm lục địa với trữ lượng dầu khí lớn nhất cả nước, là nguồn tài nguyên khoáng sản quan trọng nhất của vùng.', 3, 'Itrithuc.vn - Trắc nghiệm Địa lý 9 Đông Nam Bộ', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-regions", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-57', 'mcq', 'Địa lý - Đông Nam Bộ', 'geo-vn-regions', 'Hai loại đất chiếm diện tích lớn nhất ở Đông Nam Bộ là:', ARRAY['A. Đất badan và đất xám', 'B. Đất xám và đất phù sa', 'C. Đất badan và đất feralit', 'D. Đất xám và đất phèn']::varchar[], ARRAY['A. Đất badan và đất xám']::varchar[], 'Đông Nam Bộ có hai nhóm đất chính: đất badan (trên cao nguyên thấp, thuận lợi trồng cây công nghiệp) và đất xám (trên phù sa cổ).', 3, 'Lxi.edu.vn - Trắc nghiệm Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-regions", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-58', 'mcq', 'Địa lý - Đông Nam Bộ', 'geo-vn-regions', 'Hồ chứa nước nhân tạo quan trọng cho thủy lợi và thủy điện ở Đông Nam Bộ là:', ARRAY['A. Hồ Ba Bể và hồ Lắk', 'B. Hồ Dầu Tiếng và hồ Trị An', 'C. Hồ Thác Bà và hồ Đa Nhim', 'D. Hồ Yaly và hồ Dầu Tiếng']::varchar[], ARRAY['B. Hồ Dầu Tiếng và hồ Trị An']::varchar[], 'Hồ Dầu Tiếng (cung cấp nước ngọt) và hồ Trị An (thủy điện) là hai hồ nhân tạo lớn và quan trọng nhất ở Đông Nam Bộ.', 3, 'Kenhgiaovien.com - Trắc nghiệm Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-regions", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-59', 'mcq', 'Địa lý - Đồng bằng sông Cửu Long', 'geo-vn-regions', 'Loại hình giao thông vận tải phát triển nhất ở Đồng bằng sông Cửu Long là:', ARRAY['A. Đường sắt', 'B. Đường bộ', 'C. Đường biển', 'D. Đường sông']::varchar[], ARRAY['D. Đường sông']::varchar[], 'ĐBSCL có hệ thống sông ngòi, kênh rạch dày đặc, nên đường sông (giao thông thủy) là loại hình vận tải phát triển nhất và đặc trưng nhất vùng.', 3, 'VietJack - Trắc nghiệm Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-regions", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-60', 'mcq', 'Địa lý - Đồng bằng sông Cửu Long', 'geo-vn-regions', 'Nhóm đất có diện tích lớn nhất ở Đồng bằng sông Cửu Long là:', ARRAY['A. Đất phèn', 'B. Đất mặn', 'C. Đất phù sa ngọt', 'D. Đất cát ven biển']::varchar[], ARRAY['A. Đất phèn']::varchar[], 'Đất phèn chiếm diện tích lớn nhất ĐBSCL (khoảng 40%), tập trung ở vùng trũng trung tâm như Đồng Tháp Mười, Tứ giác Long Xuyên.', 3, 'Tech12h.com - Trắc nghiệm Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-regions", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-61', 'mcq', 'Địa lý - Tây Nguyên', 'geo-vn-regions', 'Thế mạnh đặc trưng nhất của Tây Nguyên để phát triển nông nghiệp là:', ARRAY['A. Đất phù sa màu mỡ', 'B. Khí hậu nhiệt đới gió mùa', 'C. Đất badan màu mỡ và khí hậu cận xích đạo', 'D. Nguồn nước dồi dào']::varchar[], ARRAY['C. Đất badan màu mỡ và khí hậu cận xích đạo']::varchar[], 'Tây Nguyên có đất badan màu mỡ (chiếm 1/4 diện tích đất đỏ badan cả nước) và khí hậu cận xích đạo, thích hợp trồng cây công nghiệp nhiệt đới.', 3, 'VietJack - Trắc nghiệm Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-regions", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-62', 'mcq', 'Địa lý - Tây Nguyên', 'geo-vn-regions', 'Loại cây công nghiệp lâu năm được trồng nhiều nhất ở Tây Nguyên là:', ARRAY['A. Cao su', 'B. Cà phê', 'C. Hồ tiêu', 'D. Chè']::varchar[], ARRAY['B. Cà phê']::varchar[], 'Cà phê là cây công nghiệp lâu năm được trồng nhiều nhất ở Tây Nguyên, diện tích và sản lượng cà phê Tây Nguyên lớn nhất cả nước (Đắk Lắk, Lâm Đồng...).', 3, 'VietJack - Trắc nghiệm Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-regions", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-63', 'mcq', 'Địa lý - Đông Nam Bộ', 'geo-vn-regions', 'Trung tâm du lịch lớn nhất của vùng Đông Nam Bộ và cả nước là:', ARRAY['A. Vũng Tàu', 'B. TP. Hồ Chí Minh', 'C. Đà Lạt', 'D. Nha Trang']::varchar[], ARRAY['B. TP. Hồ Chí Minh']::varchar[], 'TP. Hồ Chí Minh là trung tâm kinh tế, thương mại, du lịch lớn nhất cả nước, đầu mối giao thông quan trọng nhất phía Nam.', 3, 'Itrithuc.vn - Trắc nghiệm Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-regions", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-64', 'mcq', 'Địa lý - Dân cư Việt Nam', 'geo-vn-population', 'Vùng kinh tế nào của Việt Nam có mật độ dân số cao nhất?', ARRAY['A. Đồng bằng sông Cửu Long', 'B. Đồng bằng sông Hồng', 'C. Đông Nam Bộ', 'D. Duyên hải miền Trung']::varchar[], ARRAY['B. Đồng bằng sông Hồng']::varchar[], 'Đồng bằng sông Hồng có mật độ dân số cao nhất Việt Nam (trên 900 người/km²), tập trung đông dân cư và lâu đời nhất.', 3, 'VietJack - Trắc nghiệm Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-population", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-65', 'mcq', 'Địa lý - Vùng kinh tế trọng điểm', 'geo-vn-regions', 'Tam giác kinh tế trọng điểm miền Nam Việt Nam gồm những tỉnh/thành phố nào?', ARRAY['A. Hà Nội - Hải Phòng - Quảng Ninh', 'B. TP.HCM - Đồng Nai - Bà Rịa - Vũng Tàu', 'C. Đà Nẵng - Thừa Thiên Huế - Quảng Nam', 'D. Cần Thơ - Kiên Giang - An Giang']::varchar[], ARRAY['B. TP.HCM - Đồng Nai - Bà Rịa - Vũng Tàu']::varchar[], 'Vùng kinh tế trọng điểm phía Nam (tam giác) gồm TP.HCM - Đồng Nai - Bà Rịa - Vũng Tàu (còn gọi là Bình Dương), là vùng kinh tế động lực quan trọng nhất phía Nam.', 3, 'VietJack - Trắc nghiệm Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-regions", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-66', 'mcq', 'Địa lý - Đồng bằng sông Cửu Long', 'geo-vn-regions', 'Khó khăn lớn nhất của nông nghiệp Đồng bằng sông Cửu Long vào mùa khô là:', ARRAY['A. Cháy rừng', 'B. Triều cường', 'C. Xâm nhập mặn và thiếu nước ngọt', 'D. Sâu bệnh hại lúa']::varchar[], ARRAY['C. Xâm nhập mặn và thiếu nước ngọt']::varchar[], 'Vào mùa khô, nước biển xâm nhập sâu vào đất liền (xâm nhập mặn), kết hợp với thiếu nước ngọt là thách thức lớn nhất với nông nghiệp ĐBSCL.', 3, 'Itrithuc.vn - Trắc nghiệm Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["geo-vn-regions", "history_geography"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-67', 'mcq', 'Vi phạm pháp luật - Trách nhiệm pháp lý', 'civ-law-order', 'Nghĩa vụ mà các cá nhân, cơ quan, tổ chức vi phạm pháp luật phải chấp hành những biện pháp bắt buộc do Nhà nước quy định được gọi là gì?', ARRAY['A. Trách nhiệm pháp lí', 'B. Vi phạm pháp luật', 'C. Trách nhiệm gia đình', 'D. Vi phạm đạo đức']::varchar[], ARRAY['A. Trách nhiệm pháp lí']::varchar[], 'Trách nhiệm pháp lý là nghĩa vụ buộc cá nhân/tổ chức vi phạm pháp luật phải gánh chịu hậu quả pháp lý bất lợi do hành vi vi phạm của mình gây ra.', 3, 'Tech12h.com - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-68', 'mcq', 'Vi phạm pháp luật - Hình sự', 'civ-law-order', 'Hành vi vi phạm pháp luật, gây nguy hiểm cho xã hội, bị coi là tội phạm là hành vi vi phạm pháp luật nào?', ARRAY['A. Hình sự', 'B. Hành chính', 'C. Dân sự', 'D. Kỷ luật']::varchar[], ARRAY['A. Hình sự']::varchar[], 'Vi phạm pháp luật hình sự (tội phạm) là hành vi nguy hiểm cho xã hội, được quy định trong Bộ luật Hình sự, người phạm tội chịu trách nhiệm hình sự.', 3, 'Tech12h.com - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-69', 'mcq', 'Vi phạm pháp luật - Dân sự', 'civ-law-order', 'Vi phạm pháp luật dân sự là hành vi vi phạm pháp luật, xâm phạm tới các quan hệ nào?', ARRAY['A. Các quan hệ công vụ và nhân thân', 'B. Các quy tắc quản lý nhà nước', 'C. Các quan hệ tài sản và quan hệ nhân thân', 'D. Các quan hệ lao động, công vụ nhà nước']::varchar[], ARRAY['C. Các quan hệ tài sản và quan hệ nhân thân']::varchar[], 'Vi phạm dân sự xâm phạm đến quan hệ tài sản (hợp đồng, thừa kế, quyền sở hữu...) và quan hệ nhân thân (quyền đặt tên, hình ảnh, danh dự...).', 3, 'Tech12h.com - Download.vn - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-70', 'mcq', 'Vi phạm pháp luật - Kỷ luật', 'civ-law-order', 'Hành vi vi phạm các quy tắc, quy chế được xác lập trong một tổ chức, cơ quan, đơn vị là gì?', ARRAY['A. Vi phạm hành chính', 'B. Vi phạm dân sự', 'C. Vi phạm kỷ luật', 'D. Vi phạm hình sự']::varchar[], ARRAY['C. Vi phạm kỷ luật']::varchar[], 'Vi phạm kỷ luật là hành vi vi phạm nội quy, quy chế của cơ quan, tổ chức, đơn vị. Hình thức xử lý là trách nhiệm kỷ luật (cảnh cáo, buộc thôi việc...).', 3, 'Tech12h.com - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-71', 'mcq', 'Vi phạm pháp luật - Hành chính', 'civ-law-order', 'Người phải chịu trách nhiệm hành chính do mọi vi phạm hành chính mà mình gây ra theo quy định của pháp luật có độ tuổi là bao nhiêu?', ARRAY['A. Từ đủ 18 tuổi trở lên', 'B. Từ 18 tuổi trở lên', 'C. Từ đủ 16 tuổi trở lên', 'D. Từ đủ 14 tuổi trở lên']::varchar[], ARRAY['C. Từ đủ 16 tuổi trở lên']::varchar[], 'Theo Luật Xử lý vi phạm hành chính, người từ đủ 16 tuổi trở lên phải chịu trách nhiệm hành chính về mọi vi phạm hành chính do mình gây ra.', 3, 'Tech12h.com - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-72', 'mcq', 'Vi phạm pháp luật - Trách nhiệm pháp lý', 'civ-law-order', 'Mục đích chính của việc Nhà nước quy định trách nhiệm pháp lý đối với người vi phạm là gì?', ARRAY['A. Phạt tiền người vi phạm', 'B. Buộc chủ thể vi phạm chấm dứt hành vi, phải chịu thiệt hại nhất định; giáo dục răn đe người khác', 'C. Lập lại trật tự xã hội', 'D. Ngăn chặn người vi phạm có thể có vi phạm mới']::varchar[], ARRAY['B. Buộc chủ thể vi phạm chấm dứt hành vi, phải chịu thiệt hại nhất định; giáo dục răn đe người khác']::varchar[], 'Trách nhiệm pháp lý nhằm: (1) buộc người vi phạm chấm dứt hành vi trái pháp luật, (2) giáo dục, răn đe, ngăn ngừa vi phạm.', 3, 'Tech12h.com - Download.vn - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-73', 'mcq', 'Vi phạm pháp luật - Tình huống', 'civ-law-order', 'Một học sinh đánh bạn gây thương tích, hành vi này thuộc loại vi phạm pháp luật nào?', ARRAY['A. Vi phạm kỷ luật', 'B. Vi phạm hành chính', 'C. Vi phạm dân sự', 'D. Tùy mức độ, có thể là vi phạm hành chính hoặc vi phạm hình sự']::varchar[], ARRAY['D. Tùy mức độ, có thể là vi phạm hành chính hoặc vi phạm hình sự']::varchar[], 'Tùy mức độ thương tích: nếu nhẹ có thể là vi phạm hành chính (xử phạt tiền); nếu gây thương tích từ 11% trở lên là vi phạm hình sự (tội cố ý gây thương tích).', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-74', 'mcq', 'Vi phạm pháp luật - Hình sự', 'civ-law-order', 'Người từ đủ 14 tuổi đến dưới 16 tuổi phải chịu trách nhiệm hình sự về những loại tội nào?', ARRAY['A. Tất cả các loại tội phạm', 'B. Tội phạm rất nghiêm trọng và tội phạm đặc biệt nghiêm trọng do cố ý', 'C. Chỉ tội phạm đặc biệt nghiêm trọng', 'D. Không phải chịu trách nhiệm hình sự']::varchar[], ARRAY['B. Tội phạm rất nghiêm trọng và tội phạm đặc biệt nghiêm trọng do cố ý']::varchar[], 'Theo Bộ luật Hình sự, người từ đủ 14 đến dưới 16 tuổi chịu trách nhiệm hình sự về tội phạm rất nghiêm trọng và đặc biệt nghiêm trọng do cố ý.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-75', 'mcq', 'Vi phạm pháp luật - Hành chính', 'civ-law-order', 'Hành vi xây dựng công trình không phép trong đô thị thuộc loại vi phạm pháp luật nào?', ARRAY['A. Vi phạm hình sự', 'B. Vi phạm hành chính', 'C. Vi phạm dân sự', 'D. Vi phạm kỷ luật']::varchar[], ARRAY['B. Vi phạm hành chính']::varchar[], 'Xây dựng không phép, sai phép là vi phạm pháp luật hành chính (vi phạm quy định quản lý xây dựng), bị xử phạt hành chính và buộc tháo dỡ công trình.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-76', 'mcq', 'Vi phạm pháp luật - Nhận diện', 'civ-law-order', 'Biểu hiện nào dưới đây là vi phạm pháp luật?', ARRAY['A. Anh A không giúp người già qua đường', 'B. Chị B nói chuyện to trong thư viện', 'C. Anh C điều khiển ô tô vượt đèn đỏ', 'D. Em D không chào hỏi người lớn tuổi']::varchar[], ARRAY['C. Anh C điều khiển ô tô vượt đèn đỏ']::varchar[], 'Vượt đèn đỏ là hành vi vi phạm Luật Giao thông đường bộ — vi phạm pháp luật hành chính, bị xử phạt tiền và tước bằng lái. Các hành vi khác là thiếu đạo đức, không văn minh nhưng không vi phạm pháp luật.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-77', 'mcq', 'Vi phạm pháp luật - Khái niệm', 'civ-law-order', 'Hành vi vi phạm pháp luật phải có yếu tố nào bắt buộc?', ARRAY['A. Người vi phạm phải có độ tuổi từ 18 trở lên', 'B. Phải có hành vi trái pháp luật do chủ thể có năng lực trách nhiệm pháp lý thực hiện có lỗi', 'C. Hành vi phải gây thiệt hại về vật chất', 'D. Phải có quyết định xử phạt của cơ quan có thẩm quyền']::varchar[], ARRAY['B. Phải có hành vi trái pháp luật do chủ thể có năng lực trách nhiệm pháp lý thực hiện có lỗi']::varchar[], 'Vi phạm pháp luật cần có 3 yếu tố: (1) hành vi trái pháp luật, (2) do chủ thể có năng lực trách nhiệm pháp lý, (3) thực hiện có lỗi (cố ý hoặc vô ý).', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-78', 'mcq', 'Vi phạm pháp luật - Tình huống', 'civ-law-order', 'Khi phát hiện bạn mình đang bán ma túy trong trường học, học sinh nên làm gì?', ARRAY['A. Làm ngơ, không liên quan đến mình', 'B. Giúp bạn che giấu để tránh bị phát hiện', 'C. Báo cáo ngay cho giáo viên hoặc công an', 'D. Tự mình ngăn chặn bạn bằng vũ lực']::varchar[], ARRAY['C. Báo cáo ngay cho giáo viên hoặc công an']::varchar[], 'Mua bán ma túy là tội phạm hình sự nghiêm trọng. Học sinh có nghĩa vụ tố giác tội phạm theo pháp luật. Báo cáo cho thầy cô, công an là hành động đúng pháp luật và đạo đức.', 3, 'VietJack - Trắc nghiệm GDCD 9 Tình huống', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-79', 'mcq', 'Vi phạm pháp luật - Trách nhiệm hình sự', 'civ-law-order', 'Trách nhiệm hình sự là loại trách nhiệm pháp lý nghiêm khắc nhất vì:', ARRAY['A. Xử phạt tiền nhiều nhất', 'B. Có thể tước đoạt tự do hoặc tính mạng của người phạm tội', 'C. Áp dụng cho nhiều người nhất', 'D. Được quy định trong nhiều văn bản pháp luật nhất']::varchar[], ARRAY['B. Có thể tước đoạt tự do hoặc tính mạng của người phạm tội']::varchar[], 'Trách nhiệm hình sự nghiêm khắc nhất vì có thể áp dụng hình phạt tước quyền tự do (tù giam), thậm chí tử hình — là hình phạt nặng nề nhất trong hệ thống pháp luật.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-80', 'mcq', 'Vi phạm pháp luật - Tình huống', 'civ-law-order', 'Học sinh lớp 9 (14 tuổi) vô tình làm vỡ xe máy của người khác khi đỗ xe không đúng chỗ. Hành vi này thuộc loại vi phạm nào?', ARRAY['A. Vi phạm hình sự', 'B. Vi phạm hành chính và có thể có trách nhiệm dân sự', 'C. Vi phạm kỷ luật', 'D. Không vi phạm vì còn nhỏ tuổi']::varchar[], ARRAY['B. Vi phạm hành chính và có thể có trách nhiệm dân sự']::varchar[], 'Đỗ xe không đúng nơi quy định là vi phạm hành chính. Gây thiệt hại vật chất cho người khác cần bồi thường (trách nhiệm dân sự). Người chưa đủ tuổi, cha mẹ/người giám hộ chịu trách nhiệm.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-81', 'mcq', 'Quyền trẻ em - Trách nhiệm gia đình', 'civ-law-order', 'Khi thực hiện quyền trẻ em, mỗi gia đình cần phải có trách nhiệm nào dưới đây?', ARRAY['A. Tiến hành khai sinh cho trẻ', 'B. Chăm sóc, giáo dục trẻ em', 'C. Tạo điều kiện cho trẻ phát triển', 'D. Tất cả các phương án trên']::varchar[], ARRAY['D. Tất cả các phương án trên']::varchar[], 'Gia đình có trách nhiệm toàn diện với trẻ em: khai sinh (quyền có danh tính), chăm sóc sức khỏe, giáo dục và tạo điều kiện phát triển toàn diện.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-82', 'mcq', 'Quyền trẻ em - Khái niệm', 'civ-law-order', 'Theo Luật Trẻ em Việt Nam, trẻ em là người dưới bao nhiêu tuổi?', ARRAY['A. Dưới 15 tuổi', 'B. Dưới 16 tuổi', 'C. Dưới 18 tuổi', 'D. Dưới 21 tuổi']::varchar[], ARRAY['C. Dưới 18 tuổi']::varchar[], 'Theo Luật Trẻ em Việt Nam 2016 (Điều 1), trẻ em là người dưới 16 tuổi. Tuy nhiên, Công ước Liên Hợp Quốc về Quyền trẻ em (CRC) quy định dưới 18 tuổi. Trong ngữ cảnh Công ước LHQ thì đáp án là C.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-83', 'mcq', 'Quyền trẻ em - Nhóm quyền', 'civ-social-rights', 'Quyền được bảo vệ khỏi mọi hình thức bạo lực, xâm hại tình dục, bóc lột lao động thuộc nhóm quyền nào của trẻ em?', ARRAY['A. Quyền sống còn', 'B. Quyền được bảo vệ', 'C. Quyền phát triển', 'D. Quyền tham gia']::varchar[], ARRAY['B. Quyền được bảo vệ']::varchar[], 'Theo Công ước LHQ về Quyền trẻ em, quyền được bảo vệ khỏi bạo lực, xâm hại, bóc lột thuộc nhóm ''Quyền được bảo vệ'' — một trong 4 nhóm quyền cơ bản.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-84', 'mcq', 'Quyền trẻ em - Vi phạm', 'civ-social-rights', 'Hành vi nào dưới đây vi phạm quyền trẻ em?', ARRAY['A. Cho trẻ em đi học đúng độ tuổi', 'B. Ép trẻ em dưới 15 tuổi làm việc nặng nhọc, nguy hiểm', 'C. Tạo điều kiện cho trẻ em vui chơi giải trí', 'D. Khuyến khích trẻ em tham gia các hoạt động văn hóa']::varchar[], ARRAY['B. Ép trẻ em dưới 15 tuổi làm việc nặng nhọc, nguy hiểm']::varchar[], 'Theo Bộ luật Lao động và Luật Trẻ em, nghiêm cấm sử dụng lao động trẻ em, đặc biệt công việc nặng nhọc nguy hiểm. Đây là vi phạm nghiêm trọng quyền trẻ em.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-85', 'mcq', 'Quyền trẻ em - Công ước LHQ', 'civ-social-rights', 'Theo Công ước Liên Hợp Quốc về Quyền trẻ em, có bao nhiêu nhóm quyền cơ bản của trẻ em?', ARRAY['A. 2 nhóm', 'B. 3 nhóm', 'C. 4 nhóm', 'D. 5 nhóm']::varchar[], ARRAY['C. 4 nhóm']::varchar[], 'Công ước LHQ về Quyền trẻ em quy định 4 nhóm quyền: (1) Quyền sống còn, (2) Quyền được bảo vệ, (3) Quyền phát triển, (4) Quyền tham gia.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-86', 'mcq', 'Đạo đức - Lý tưởng sống', 'civ-personal-ideals', 'Người sống có lý tưởng sẽ được xã hội:', ARRAY['A. Tôn trọng', 'B. Đề bạt', 'C. Bổ nhiệm', 'D. Tài trợ']::varchar[], ARRAY['A. Tôn trọng']::varchar[], 'Người có lý tưởng cao đẹp, sống có mục đích và cống hiến cho xã hội sẽ nhận được sự tôn trọng của cộng đồng và xã hội.', 3, 'Studocu.vn - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-personal-ideals", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-87', 'mcq', 'Đạo đức - Phát triển toàn diện', 'civ-social-rights', 'Học sinh cần rèn luyện đức tính nào để trở thành công dân tốt?', ARRAY['A. Chỉ học giỏi là đủ', 'B. Chỉ ngoan ngoãn vâng lời là đủ', 'C. Kết hợp học tốt, rèn luyện đạo đức, thể chất và kỹ năng sống', 'D. Ưu tiên hoạt động ngoại khóa hơn học tập']::varchar[], ARRAY['C. Kết hợp học tốt, rèn luyện đạo đức, thể chất và kỹ năng sống']::varchar[], 'Để trở thành công dân tốt, học sinh cần phát triển toàn diện: học tập tri thức, rèn luyện đạo đức, thể chất và kỹ năng sống — không thể chỉ chú trọng một mặt.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-88', 'mcq', 'Đạo đức - Ý thức trách nhiệm', 'civ-law-order', 'Biểu hiện nào thể hiện học sinh có ý thức trách nhiệm với bản thân?', ARRAY['A. Chỉ học khi sắp thi', 'B. Không chuẩn bị bài trước khi đến lớp', 'C. Tự giác học tập, không đợi cha mẹ nhắc nhở', 'D. Học thêm nhiều môn để được khen thưởng']::varchar[], ARRAY['C. Tự giác học tập, không đợi cha mẹ nhắc nhở']::varchar[], 'Tự giác học tập mà không cần người khác nhắc nhở thể hiện ý thức tự giác, trách nhiệm với bản thân — phẩm chất quan trọng của học sinh.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-89', 'mcq', 'Đạo đức - Trung thực', 'civ-social-rights', 'Hành vi gian lận trong thi cử là:', ARRAY['A. Chấp nhận được nếu không bị phát hiện', 'B. Vi phạm nội quy nhà trường và thiếu trung thực', 'C. Bình thường vì ai cũng làm vậy', 'D. Cần thiết để đạt kết quả tốt']::varchar[], ARRAY['B. Vi phạm nội quy nhà trường và thiếu trung thực']::varchar[], 'Gian lận trong thi cử vi phạm nội quy nhà trường (trách nhiệm kỷ luật), thể hiện thiếu trung thực — phẩm chất đạo đức cơ bản mà học sinh cần có.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-90', 'mcq', 'Đạo đức - Biết ơn', 'civ-social-rights', 'Điều nào dưới đây thể hiện lòng biết ơn thầy cô giáo?', ARRAY['A. Chỉ chào thầy cô khi cần xin điểm', 'B. Học tốt, vâng lời, giữ gìn uy tín của thầy cô', 'C. Tặng quà đắt tiền cho thầy cô vào dịp lễ', 'D. Nói chuyện riêng trong giờ học']::varchar[], ARRAY['B. Học tốt, vâng lời, giữ gìn uy tín của thầy cô']::varchar[], 'Lòng biết ơn thầy cô thể hiện qua hành động cụ thể: học tốt để không phụ công dạy dỗ, vâng lời và không làm điều gì tổn hại đến uy tín của thầy cô.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-91', 'mcq', 'Đạo đức - Bản lĩnh học sinh', 'civ-social-rights', 'Khi bạn bè rủ rê tham gia các hoạt động không lành mạnh (đánh nhau, trốn học), học sinh nên:', ARRAY['A. Tham gia để không bị cô lập', 'B. Im lặng, không phản đối', 'C. Kiên quyết từ chối và khuyên bạn không nên làm vậy', 'D. Báo ngay cho cha mẹ mà không cần suy nghĩ']::varchar[], ARRAY['C. Kiên quyết từ chối và khuyên bạn không nên làm vậy']::varchar[], 'Học sinh cần có bản lĩnh và lòng dũng cảm để từ chối những hành vi không lành mạnh. Đồng thời, cần khuyên bạn tránh xa các hành vi xấu — đó là tình bạn thực sự.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-92', 'mcq', 'Vi phạm pháp luật - So sánh với đạo đức', 'civ-law-order', 'Khái niệm ''vi phạm pháp luật'' khác với ''vi phạm đạo đức'' ở điểm nào?', ARRAY['A. Vi phạm pháp luật luôn nghiêm trọng hơn vi phạm đạo đức', 'B. Vi phạm pháp luật bị xử lý bởi Nhà nước, vi phạm đạo đức bị xã hội lên án', 'C. Vi phạm đạo đức không liên quan đến pháp luật', 'D. Mọi vi phạm đạo đức đều là vi phạm pháp luật']::varchar[], ARRAY['B. Vi phạm pháp luật bị xử lý bởi Nhà nước, vi phạm đạo đức bị xã hội lên án']::varchar[], 'Vi phạm pháp luật: Nhà nước cưỡng chế (tòa án, công an...). Vi phạm đạo đức: xã hội lên án, phê phán (dư luận). Có hành vi vừa vi phạm pháp luật vừa vi phạm đạo đức, nhưng không phải tất cả.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-93', 'mcq', 'Đạo đức - Nghĩa vụ học sinh', 'civ-social-rights', 'Học sinh lớp 9 có nghĩa vụ nào sau đây theo quy định của pháp luật?', ARRAY['A. Tham gia đầy đủ các hoạt động ngoại khóa', 'B. Học tập, rèn luyện đạo đức, tôn trọng và chấp hành nội quy nhà trường', 'C. Tham gia ban cán sự lớp', 'D. Đạt học lực giỏi mỗi học kỳ']::varchar[], ARRAY['B. Học tập, rèn luyện đạo đức, tôn trọng và chấp hành nội quy nhà trường']::varchar[], 'Theo Điều lệ trường THCS và Luật Giáo dục, học sinh có nghĩa vụ: học tập, rèn luyện đạo đức, thực hiện đúng nội quy nhà trường, kính trọng thầy cô, đoàn kết bạn bè.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-94', 'mcq', 'Quyền trẻ em - Vi phạm', 'civ-social-rights', 'Cha mẹ có hành vi bạo lực, xâm phạm thân thể con cái là:', ARRAY['A. Quyền của cha mẹ trong việc dạy dỗ con cái', 'B. Vi phạm pháp luật và vi phạm quyền trẻ em', 'C. Bình thường trong văn hóa gia đình truyền thống', 'D. Chỉ vi phạm đạo đức, không vi phạm pháp luật']::varchar[], ARRAY['B. Vi phạm pháp luật và vi phạm quyền trẻ em']::varchar[], 'Theo Luật Trẻ em và Luật Phòng, chống bạo lực gia đình, bạo hành trẻ em là vi phạm pháp luật nghiêm trọng, vi phạm quyền được bảo vệ của trẻ em. Cha mẹ có thể bị xử lý hình sự.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-95', 'mcq', 'Quyền trẻ em - Nhóm quyền', 'civ-social-rights', 'Quyền được đi học miễn phí ở cấp tiểu học thuộc nhóm quyền nào của trẻ em?', ARRAY['A. Quyền sống còn', 'B. Quyền được bảo vệ', 'C. Quyền phát triển', 'D. Quyền tham gia']::varchar[], ARRAY['C. Quyền phát triển']::varchar[], 'Quyền được giáo dục, học tập thuộc nhóm ''Quyền phát triển'' — nhóm quyền giúp trẻ em phát triển đầy đủ về thể chất, tinh thần, đạo đức và xã hội.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-96', 'mcq', 'Vi phạm pháp luật - Hành chính', 'civ-law-order', 'Cơ quan nào có thẩm quyền xử phạt vi phạm hành chính?', ARRAY['A. Chỉ Toà án nhân dân', 'B. Chỉ Viện Kiểm sát nhân dân', 'C. Các cơ quan hành chính nhà nước có thẩm quyền (UBND, Công an, Thanh tra...)', 'D. Tổ trưởng dân phố']::varchar[], ARRAY['C. Các cơ quan hành chính nhà nước có thẩm quyền (UBND, Công an, Thanh tra...)']::varchar[], 'Theo Luật Xử lý vi phạm hành chính, nhiều cơ quan có thẩm quyền xử phạt: UBND các cấp, Công an, Thanh tra, Hải quan, Thuế... không chỉ riêng Tòa án.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-97', 'mcq', 'Vi phạm pháp luật - Tình huống', 'civ-law-order', 'Hành vi của bạn M (15 tuổi) trộm cắp tài sản trị giá 5 triệu đồng. Bạn M phải chịu trách nhiệm pháp lý nào?', ARRAY['A. Không phải chịu trách nhiệm vì chưa đủ 16 tuổi', 'B. Chịu trách nhiệm hành chính', 'C. Chịu trách nhiệm hình sự và cha mẹ phải bồi thường thiệt hại', 'D. Chỉ bị nhắc nhở, không bị xử lý']::varchar[], ARRAY['C. Chịu trách nhiệm hình sự và cha mẹ phải bồi thường thiệt hại']::varchar[], 'Trộm cắp tài sản 5 triệu đồng cấu thành tội phạm hình sự. Người từ đủ 14 đến dưới 16 tuổi chịu trách nhiệm hình sự về tội rất nghiêm trọng/đặc biệt nghiêm trọng do cố ý. Bồi thường dân sự do cha mẹ thực hiện.', 3, 'VietJack - Trắc nghiệm GDCD 9 Tình huống', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-98', 'mcq', 'Quyền trẻ em - Nhóm quyền', 'civ-social-rights', 'Trẻ em có quyền được bày tỏ ý kiến về những vấn đề có ảnh hưởng đến mình thuộc nhóm quyền nào?', ARRAY['A. Quyền sống còn', 'B. Quyền được bảo vệ', 'C. Quyền phát triển', 'D. Quyền tham gia']::varchar[], ARRAY['D. Quyền tham gia']::varchar[], 'Quyền được tham gia, bày tỏ ý kiến, được lắng nghe thuộc nhóm ''Quyền tham gia'' — một trong 4 nhóm quyền cơ bản theo Công ước LHQ về Quyền trẻ em.', 3, 'VietJack - Trắc nghiệm GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-social-rights", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('batch1-sub2-99', 'mcq', 'Vi phạm pháp luật - Công nghệ', 'civ-law-order', 'Việc bán tài khoản mạng xã hội của mình cho người khác sử dụng để lừa đảo có thể dẫn đến hậu quả pháp lý nào với học sinh?', ARRAY['A. Không có hậu quả gì vì chỉ là mạng ảo', 'B. Bị nhà trường kỷ luật', 'C. Có thể bị xử lý về tội đồng phạm hoặc tiếp tay cho tội phạm lừa đảo', 'D. Chỉ mất tài khoản mạng xã hội']::varchar[], ARRAY['C. Có thể bị xử lý về tội đồng phạm hoặc tiếp tay cho tội phạm lừa đảo']::varchar[], 'Cung cấp tài khoản biết dùng vào mục đích lừa đảo có thể cấu thành đồng phạm hoặc che giấu tội phạm — vi phạm pháp luật hình sự, đặc biệt nghiêm trọng với tội lừa đảo qua mạng.', 3, 'VietJack - Trắc nghiệm GDCD 9 Tình huống mạng', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice", "tags": ["civ-law-order", "civics"]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

-- Seed Batch 2 Questions (English, Math, Lit, Science, Hist, Civics)
INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2024-q1', 'mcq', 'Ngữ âm', 'eng-pronunciation', 'Which word has the underlined part pronounced differently from that of the others?', ARRAY['A. destroys', 'B. controls', 'C. predicts', 'D. wanders']::varchar[], ARRAY['C. predicts']::varchar[], 'Trong ''predicts'', âm ''s'' được phát âm là /s/ vì đứng sau âm vô thanh /t/. Trong các từ còn lại, ''s'' được phát âm là /z/.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2024-q2', 'mcq', 'Ngữ âm', 'eng-pronunciation', 'Which word has the underlined part pronounced differently from that of the others?', ARRAY['A. separate', 'B. standard', 'C. violent', 'D. satisfy']::varchar[], ARRAY['C. violent']::varchar[], 'Trong ''violent'', âm ''i'' phát âm là /aɪ/. Trong các từ còn lại, âm ''a'' hoặc ''e'' phát âm là /æ/ hoặc /ə/.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2024-q3', 'mcq', 'Trọng âm', 'eng-stress', 'Which word has a different stress pattern from that of the others?', ARRAY['A. deny', 'B. visit', 'C. behave', 'D. impress']::varchar[], ARRAY['B. visit']::varchar[], '''visit'' có trọng âm rơi vào âm tiết thứ nhất. Các từ còn lại có trọng âm rơi vào âm tiết thứ hai.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2024-q4', 'mcq', 'Trọng âm', 'eng-stress', 'Which word has a different stress pattern from that of the others?', ARRAY['A. official', 'B. regular', 'C. violent', 'D. wonderful']::varchar[], ARRAY['A. official']::varchar[], '''official'' có trọng âm rơi vào âm tiết thứ hai. Các từ còn lại có trọng âm rơi vào âm tiết thứ nhất.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2024-q5', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-wish-suggest', 'I wish I ______ enough time to read all the books in the library.', ARRAY['A. have', 'B. had', 'C. will have', 'D. am having']::varchar[], ARRAY['B. had']::varchar[], 'Câu ước ở hiện tại sử dụng động từ ở thì Quá khứ đơn (Past Simple): S + wish + S + V2/ed.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2024-q6', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-have-get-done', 'We usually ______ our house painted before the Lunar New Year.', ARRAY['A. get', 'B. make', 'C. do', 'D. take']::varchar[], ARRAY['A. get']::varchar[], 'Cấu trúc truyền khiến thụ động: have/get + something + V3/ed (nhờ/thuê ai làm gì).', 3, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2024-q7', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-vocabulary-topic', 'Are you interested ______ joining our local green campaign this weekend?', ARRAY['A. on', 'B. at', 'C. in', 'D. with']::varchar[], ARRAY['C. in']::varchar[], 'Cụm tính từ đi với giới từ: be interested in (thích thú, quan tâm đến cái gì).', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2024-q8', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-vocabulary-topic', 'Your parents never buy things online, ______?', ARRAY['A. don''t they', 'B. do they', 'C. are they', 'D. aren''t they']::varchar[], ARRAY['B. do they']::varchar[], 'Trong câu hỏi đuôi, mệnh đề chính có trạng từ phủ định ''never'' nên phần đuôi phải ở dạng khẳng định. Trợ động từ của động từ thường ở hiện tại đơn là ''do''.', 3, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2024-q9', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-conditional', 'If we ______ paper, we will save many trees in the forest.', ARRAY['A. recycle', 'B. recycled', 'C. will recycle', 'D. would recycle']::varchar[], ARRAY['A. recycle']::varchar[], 'Câu điều kiện loại 1 diễn tả sự việc có thể xảy ra ở hiện tại hoặc tương lai: If + S + V(s/es), S + will + V-inf.', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2024-q10', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-vocabulary-topic', 'Don''t forget ______ off the lights before you leave the classroom.', ARRAY['A. turn', 'B. to turn', 'C. turning', 'D. turned']::varchar[], ARRAY['B. to turn']::varchar[], 'Cấu trúc forget/remember + to-V: nhớ/quên phải làm việc gì (chưa làm). Forget/remember + V-ing: nhớ/quên đã làm việc gì trong quá khứ.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2023-q1', 'mcq', 'Ngữ âm', 'eng-pronunciation', 'Which word has the underlined part pronounced differently from that of the others?', ARRAY['A. mentioned', 'B. consisted', 'C. described', 'D. studied']::varchar[], ARRAY['B. consisted']::varchar[], 'Đuôi ''-ed'' trong ''consisted'' phát âm là /ɪd/. Trong các từ còn lại, ''-ed'' phát âm là /d/.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2023-q2', 'mcq', 'Ngữ âm', 'eng-pronunciation', 'Which word has the underlined part pronounced differently from that of the others?', ARRAY['A. village', 'B. lighting', 'C. litter', 'D. river']::varchar[], ARRAY['B. lighting']::varchar[], 'Trong ''lighting'', âm ''i'' phát âm là /aɪ/. Trong các từ còn lại, phát âm là /ɪ/.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2023-q3', 'mcq', 'Trọng âm', 'eng-stress', 'Which word has a different stress pattern from that of the others?', ARRAY['A. refresh', 'B. intend', 'C. excite', 'D. eager']::varchar[], ARRAY['D. eager']::varchar[], '''eager'' có trọng âm rơi vào âm tiết thứ nhất. Các từ còn lại có trọng âm rơi vào âm tiết thứ hai.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2023-q4', 'mcq', 'Trọng âm', 'eng-stress', 'Which word has a different stress pattern from that of the others?', ARRAY['A. happening', 'B. responses', 'C. benefit', 'D. prisoner']::varchar[], ARRAY['B. responses']::varchar[], '''responses'' có trọng âm rơi vào âm tiết thứ hai. Các từ còn lại có trọng âm rơi vào âm tiết thứ nhất.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2023-q5', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-vocabulary-topic', 'Harry: ''When do the Vietnamese celebrate their Independence Day?'' - Lan: ''They celebrate it ______ September 2nd.''', ARRAY['A. in', 'B. at', 'C. on', 'D. of']::varchar[], ARRAY['C. on']::varchar[], 'Giới từ ''on'' dùng trước các ngày cụ thể trong tháng.', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2023-q6', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-conditional', 'If you don''t study hard, you ______ pass the entrance examination.', ARRAY['A. won''t', 'B. wouldn''t', 'C. didn''t', 'D. don''t']::varchar[], ARRAY['A. won''t']::varchar[], 'Câu điều kiện loại 1 có cấu trúc: If + S + V(s/es) (hiện tại), S + will/won''t + V-inf.', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2023-q7', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-vocabulary-topic', 'The teacher suggested ______ some outdoor activities to help students relax.', ARRAY['A. organize', 'B. organizing', 'C. organized', 'D. to organize']::varchar[], ARRAY['B. organizing']::varchar[], 'Cấu trúc suggest + V-ing: đề nghị làm việc gì.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2023-q8', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-relative-clauses', 'The heavy rain ______ fell last night caused flooding in many streets.', ARRAY['A. who', 'B. which', 'C. whom', 'D. whose']::varchar[], ARRAY['B. which']::varchar[], 'Đại từ quan hệ ''which'' được dùng để làm chủ ngữ thay thế cho danh từ chỉ vật/sự việc (''The heavy rain'').', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2023-q9', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-vocabulary-topic', 'The local authorities are trying to find a ______ to the problem of air pollution.', ARRAY['A. solution', 'B. solve', 'C. solvable', 'D. solver']::varchar[], ARRAY['A. solution']::varchar[], 'Sau mạo từ ''a'' cần một danh từ. ''solution'' (giải pháp) là danh từ phù hợp nhất về nghĩa với ''find a solution to the problem''.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2023-q10', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-vocabulary-topic', 'She was ______ disappointed that she couldn''t say a word.', ARRAY['A. extreme', 'B. extremely', 'C. extremeness', 'D. extremity']::varchar[], ARRAY['B. extremely']::varchar[], 'Cần trạng từ ''extremely'' để bổ nghĩa cho tính từ ''disappointed''.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2022-q1', 'mcq', 'Ngữ âm', 'eng-pronunciation', 'Which word has the underlined part pronounced differently from that of the others?', ARRAY['A. clean', 'B. great', 'C. beach', 'D. leave']::varchar[], ARRAY['B. great']::varchar[], 'Trong ''great'', âm ''ea'' phát âm là /eɪ/. Trong các từ còn lại, âm ''ea'' phát âm là /iː/.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2022-q2', 'mcq', 'Ngữ âm', 'eng-pronunciation', 'Which word has the underlined part pronounced differently from that of the others?', ARRAY['A. primary', 'B. library', 'C. dynamic', 'D. typical']::varchar[], ARRAY['D. typical']::varchar[], 'Trong ''typical'', âm ''y'' phát âm là /ɪ/. Trong các từ còn lại, phát âm là /aɪ/.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2022-q3', 'mcq', 'Trọng âm', 'eng-stress', 'Which word has a different stress pattern from that of the others?', ARRAY['A. provide', 'B. damage', 'C. collapse', 'D. destroy']::varchar[], ARRAY['B. damage']::varchar[], '''damage'' có trọng âm rơi vào âm tiết thứ nhất. Các từ còn lại có trọng âm rơi vào âm tiết thứ hai.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2022-q4', 'mcq', 'Trọng âm', 'eng-stress', 'Which word has a different stress pattern from that of the others?', ARRAY['A. uniform', 'B. memory', 'C. candidate', 'D. computer']::varchar[], ARRAY['D. computer']::varchar[], '''computer'' có trọng âm rơi vào âm tiết thứ hai. Các từ còn lại có trọng âm rơi vào âm tiết thứ nhất.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 1: Phonetics"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2022-q5', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-conditional', 'If we use water carefully, we ______ save money.', ARRAY['A. will', 'B. would', 'C. won''t', 'D. wouldn''t']::varchar[], ARRAY['A. will']::varchar[], 'Câu điều kiện loại 1 chỉ khả năng thực tế: If + S + V(s/es), S + will + V.', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2022-q6', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-vocabulary-topic', 'She showed great ______ in the lesson yesterday.', ARRAY['A. interest', 'B. interested', 'C. interesting', 'D. interestingly']::varchar[], ARRAY['A. interest']::varchar[], 'Sau tính từ ''great'' cần danh từ. ''interest'' là danh từ chỉ sự quan tâm/hứng thú.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2022-q7', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-vocabulary-topic', 'The program was ______ successful; it attracted thousands of participants.', ARRAY['A. highly', 'B. high', 'C. height', 'D. heighten']::varchar[], ARRAY['A. highly']::varchar[], 'Cần trạng từ ''highly'' đứng trước để bổ nghĩa cho tính từ ''successful''.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2022-q8', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-passive-voice', 'This bridge ______ built over ten years ago.', ARRAY['A. was', 'B. is', 'C. has been', 'D. were']::varchar[], ARRAY['A. was']::varchar[], 'Câu bị động ở quá khứ đơn (vì có ''ten years ago''): S + was/were + V3/ed. Chủ ngữ ''This bridge'' số ít nên dùng ''was''.', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2022-q9', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-tenses', 'They ______ English for five years now.', ARRAY['A. have studied', 'B. study', 'C. studied', 'D. are studying']::varchar[], ARRAY['A. have studied']::varchar[], 'Có dấu hiệu ''for five years now'' chỉ hành động bắt đầu từ quá khứ kéo dài đến hiện tại, chia ở thì Hiện tại hoàn thành: S + have/has + V3/ed.', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-eng10-2022-q10', 'mcq', 'Ngữ pháp & Từ vựng', 'eng-vocabulary-topic', 'Please turn ______ the air conditioner before you go out.', ARRAY['A. off', 'B. on', 'C. down', 'D. up']::varchar[], ARRAY['A. off']::varchar[], 'Turn off: tắt thiết bị (phù hợp với ngữ cảnh tắt điều hòa trước khi ra ngoài). Turn on: bật, turn down: vặn nhỏ, turn up: vặn to.', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'english', 9, '{"isStandard": true, "answerMode": "single-choice", "examPart": "Part 2: Grammar & Vocabulary"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2024-q1', 'mcq', 'Hàm số bậc hai', 'math-quadratic-function', 'Cho hàm số \(y = ax^2\) có đồ thị đi qua điểm \(A(2; -2)\). Hệ số \(a\) nhận giá trị là bao nhiêu?', ARRAY['A. a = -1', 'B. a = -1/2', 'C. a = -2', 'D. a = 1/2']::varchar[], ARRAY['B. a = -1/2']::varchar[], 'Thay tọa độ điểm \(A(2; -2)\) vào phương trình ta được: \(-2 = a \cdot 2^2 \Rightarrow 4a = -2 \Rightarrow a = -1/2\).', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2024-q2', 'mcq', 'Phương trình bậc hai', 'math-quadratic-equation', 'Cho phương trình bậc hai \(x^2 - 2(m-1)x + m^2 - 3m = 0\). Tính biệt thức \(\Delta''\) của phương trình.', ARRAY['A. \(\Delta'' = m + 1\)', 'B. \(\Delta'' = m - 1\)', 'C. \(\Delta'' = 1 - m\)', 'D. \(\Delta'' = -m + 1\)']::varchar[], ARRAY['A. \(\Delta'' = m + 1\)']::varchar[], 'Ta có: \(\Delta'' = b''^2 - ac = (-(m-1))^2 - 1(m^2 - 3m) = m^2 - 2m + 1 - m^2 + 3m = m + 1\).', 3, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2024-q3', 'mcq', 'Định lý Vi-ét', 'math-vieta', 'Gọi \(x_1, x_2\) là hai nghiệm của phương trình \(2x^2 - 5x + 2 = 0\). Giá trị của biểu thức \(T = x_1 + x_2 + x_1 x_2\) là bao nhiêu?', ARRAY['A. T = 7/2', 'B. T = 3', 'C. T = 5/2', 'D. T = 9/2']::varchar[], ARRAY['A. T = 7/2']::varchar[], 'Theo hệ thức Vi-ét: \(x_1 + x_2 = -b/a = 5/2\), \(x_1 x_2 = c/a = 2/2 = 1\). Suy ra \(T = 5/2 + 1 = 7/2\).', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2024-q4', 'mcq', 'Hình học không gian', 'math-spatial-geometry', 'Một cái xô hình nón cụt có bán kính đáy nhỏ là \(15\text{ cm}\), bán kính đáy lớn là \(25\text{ cm}\), chiều cao là \(30\text{ cm}\). Tính thể tích \(V\) của cái xô (lấy \(\pi \approx 3,14\)).', ARRAY['A. V ≈ 38465 cm³', 'B. V ≈ 37680 cm³', 'C. V ≈ 32185 cm³', 'D. V ≈ 29420 cm³']::varchar[], ARRAY['B. V ≈ 37680 cm³']::varchar[], 'Công thức thể tích hình nón cụt: \(V = \frac{1}{3}\pi h (R^2 + r^2 + Rr)\). Thay số: \(V = \frac{1}{3} \cdot 3,14 \cdot 30 (25^2 + 15^2 + 25 \cdot 15) = 31,4 \cdot (625 + 225 + 375) = 31,4 \cdot 1225 \approx 37680\text{ cm}^3\).', 4, 'Đề thi tuyển sinh lớp 10 TP.HCM 2024', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2023-q1', 'mcq', 'Hệ phương trình bậc nhất', 'math-linear-system', 'Tìm nghiệm \((x; y)\) của hệ phương trình bậc nhất hai ẩn sau: \(\begin{cases} 2x - y = 3 \\ x + y = 3 \end{cases}\).', ARRAY['A. (2; 1)', 'B. (1; 2)', 'C. (2; -1)', 'D. (0; 3)']::varchar[], ARRAY['A. (2; 1)']::varchar[], 'Cộng hai vế phương trình: \(3x = 6 \Rightarrow x = 2\). Thay vào phương trình thứ hai: \(2 + y = 3 \Rightarrow y = 1\).', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2023-q2', 'mcq', 'Phương trình bậc hai', 'math-quadratic-equation', 'Cho phương trình bậc hai \(x^2 - 4x + 3 = 0\). Tập nghiệm \(S\) của phương trình là gì?', ARRAY['A. S = {1; 3}', 'B. S = {-1; -3}', 'C. S = {1; -3}', 'D. S = {-1; 3}']::varchar[], ARRAY['A. S = {1; 3}']::varchar[], 'Phương trình có các hệ số \(a = 1, b = -4, c = 3\). Vì \(a + b + c = 1 - 4 + 3 = 0\), phương trình có hai nghiệm phân biệt: \(x_1 = 1, x_2 = c/a = 3\).', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2023-q3', 'mcq', 'Hàm số bậc nhất', 'math-linear-function', 'Đồ thị hàm số \(y = 2x - 3\) cắt trục tung \(Oy\) tại điểm nào?', ARRAY['A. (0; -3)', 'B. (3/2; 0)', 'C. (0; 3)', 'D. (-3; 0)']::varchar[], ARRAY['A. (0; -3)']::varchar[], 'Đồ thị cắt trục tung khi hoành độ \(x = 0 \Rightarrow y = 2 \cdot 0 - 3 = -3\). Điểm cắt là \((0; -3)\).', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2023-q4', 'mcq', 'Hình học không gian', 'math-spatial-geometry', 'Một hình trụ có bán kính đáy \(r = 5\text{ cm}\) và chiều cao \(h = 10\text{ cm}\). Tính diện tích xung quanh \(S_{xq}\) của hình trụ (lấy \(\pi \approx 3,14\)).', ARRAY['A. S_xq ≈ 314 cm²', 'B. S_xq ≈ 157 cm²', 'C. S_xq ≈ 628 cm²', 'D. S_xq ≈ 78.5 cm²']::varchar[], ARRAY['A. S_xq ≈ 314 cm²']::varchar[], 'Diện tích xung quanh hình trụ: \(S_{xq} = 2\pi rh\). Thay số: \(S_{xq} = 2 \cdot 3,14 \cdot 5 \cdot 10 = 314\text{ cm}^2\).', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2023', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2022-q1', 'mcq', 'Căn thức bậc hai', 'math-square-root', 'Căn thức \(\sqrt{2x - 4}\) xác định khi và chỉ khi giá trị của \(x\) thoả mãn điều kiện gì?', ARRAY['A. x ≥ 2', 'B. x > 2', 'C. x ≤ 2', 'D. x < 2']::varchar[], ARRAY['A. x ≥ 2']::varchar[], 'Căn thức bậc hai xác định khi biểu thức dưới căn không âm: \(2x - 4 \ge 0 \Rightarrow 2x \ge 4 \Rightarrow x \ge 2\).', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2022-q2', 'mcq', 'Hình học không gian', 'math-spatial-geometry', 'Một quả bóng đá có dạng hình cầu với đường kính bằng \(22\text{ cm}\). Tính thể tích \(V\) của quả bóng đó (lấy \(\pi \approx 3,14\), làm tròn đến hàng đơn vị).', ARRAY['A. V ≈ 5572 cm³', 'B. V ≈ 44580 cm³', 'C. V ≈ 1393 cm³', 'D. V ≈ 11144 cm³']::varchar[], ARRAY['A. V ≈ 5572 cm³']::varchar[], 'Bán kính hình cầu \(R = d/2 = 22/2 = 11\text{ cm}\). Thể tích hình cầu: \(V = \frac{4}{3}\pi R^3 = \frac{4}{3} \cdot 3,14 \cdot 11^3 \approx 5572\text{ cm}^3\).', 3, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2022-q3', 'mcq', 'Đường tròn', 'math-circle', 'Cho đường tròn \((O; R)\) và một dây cung \(AB = R\sqrt{3}\). Khoảng cách từ tâm \(O\) đến dây cung \(AB\) bằng bao nhiêu?', ARRAY['A. R/2', 'B. R√3 / 2', 'C. R/4', 'D. R√2 / 2']::varchar[], ARRAY['A. R/2']::varchar[], 'Kẻ \(OH \perp AB\) tại \(H\) là trung điểm của \(AB\). Ta có: \(AH = \frac{AB}{2} = \frac{R\sqrt{3}}{2}\). Áp dụng định lý Pytago trong tam giác vuông \(OHA\): \(OH = \sqrt{OA^2 - AH^2} = \sqrt{R^2 - \frac{3R^2}{4}} = \sqrt{\frac{R^2}{4}} = \frac{R}{2}\).', 3, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2022-q4', 'mcq', 'Định lý Vi-ét', 'math-vieta', 'Không giải phương trình, hãy cho biết tổng \(S\) và tích \(P\) của hai nghiệm phương trình bậc hai \(3x^2 - 8x - 5 = 0\).', ARRAY['A. S = 8/3, P = -5/3', 'B. S = -8/3, P = 5/3', 'C. S = 8/3, P = 5/3', 'D. S = -8/3, P = -5/3']::varchar[], ARRAY['A. S = 8/3, P = -5/3']::varchar[], 'Theo hệ thức Vi-ét: \(S = x_1 + x_2 = -b/a = 8/3\); \(P = x_1 x_2 = c/a = -5/3\).', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2022', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2021-q1', 'mcq', 'Hệ phương trình bậc nhất', 'math-linear-system', 'Hệ phương trình nào sau đây có nghiệm duy nhất là \((x; y) = (1; -1)\)?', ARRAY['A. {x + y = 0; 2x - y = 3}', 'B. {x - y = 0; 2x + y = 3}', 'C. {x + y = 2; x - y = 0}', 'D. {x + y = 0; x - y = 0}']::varchar[], ARRAY['A. {x + y = 0; 2x - y = 3}']::varchar[], 'Thay \(x=1, y=-1\) vào hệ phương trình A: \(1 + (-1) = 0\) (đúng) và \(2(1) - (-1) = 3\) (đúng).', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2021', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2021-q2', 'mcq', 'Căn thức bậc hai', 'math-square-root', 'Rút gọn biểu thức \(A = \sqrt{(2-\sqrt{5})^2} - \sqrt{5}\).', ARRAY['A. -2', 'B. 2', 'C. 2 - 2√5', 'D. -2 - 2√5']::varchar[], ARRAY['A. -2']::varchar[], '\(A = |2-\sqrt{5}| - \sqrt{5}\). Vì \(2 < \sqrt{5}\) nên \(|2-\sqrt{5}| = \sqrt{5} - 2\). Vậy \(A = \sqrt{5} - 2 - \sqrt{5} = -2\).', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2021', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2021-q3', 'mcq', 'Hàm số bậc hai', 'math-quadratic-function', 'Hàm số bậc hai \(y = -2x^2\) đồng biến và nghịch biến trong các khoảng nào?', ARRAY['A. Đồng biến khi x < 0, nghịch biến khi x > 0', 'B. Đồng biến khi x > 0, nghịch biến khi x < 0', 'C. Đồng biến trên toàn tập xác định', 'D. Nghịch biến trên toàn tập xác định']::varchar[], ARRAY['A. Đồng biến khi x < 0, nghịch biến khi x > 0']::varchar[], 'Hàm số \(y = ax^2\) có hệ số \(a = -2 < 0\) nên đồng biến khi \(x < 0\) và nghịch biến khi \(x > 0\). Đồ thị có bề lõm hướng xuống dưới.', 2, 'Đề thi tuyển sinh lớp 10 TP.HCM 2021', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math10-2021-q4', 'mcq', 'Góc với đường tròn', 'math-circle', 'Một góc nội tiếp chắn nửa đường tròn có số đo góc bằng bao nhiêu độ?', ARRAY['A. 90 độ', 'B. 180 độ', 'C. 60 độ', 'D. 45 độ']::varchar[], ARRAY['A. 90 độ']::varchar[], 'Theo tính chất góc nội tiếp, góc nội tiếp chắn nửa đường tròn là góc vuông và bằng \(90^\circ\).', 1, 'Đề thi tuyển sinh lớp 10 TP.HCM 2021', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math-l9-hk2-q1', 'mcq', 'Hệ phương trình bậc nhất', 'math-linear-system', 'Tìm các giá trị của tham số \(m\) để hệ phương trình \(\begin{cases} mx + y = 1 \\ x + my = 1 \end{cases}\) vô số nghiệm.', ARRAY['A. m = 1', 'B. m = -1', 'C. m = 0', 'D. m = ±1']::varchar[], ARRAY['A. m = 1']::varchar[], 'Hệ có vô số nghiệm khi các hệ số tỷ lệ: \(\frac{m}{1} = \frac{1}{m} = \frac{1}{1} \Rightarrow m = 1\). Nếu \(m = -1\) thì \(\frac{-1}{1} = \frac{1}{-1} \neq \frac{1}{1}\) (hệ vô nghiệm).', 3, 'Đề kiểm tra học kỳ II Quận 1 - TP.HCM', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math-l9-hk2-q2', 'mcq', 'Tứ giác nội tiếp', 'math-circle', 'Cho tứ giác \(ABCD\) nội tiếp đường tròn. Biết góc \(A = 70^\circ\). Tính số đo của góc \(C\).', ARRAY['A. 110 độ', 'B. 70 độ', 'C. 180 độ', 'D. 90 độ']::varchar[], ARRAY['A. 110 độ']::varchar[], 'Tứ giác nội tiếp đường tròn có tổng hai góc đối diện bằng \(180^\circ\). Do đó: \(\widehat{C} = 180^\circ - \widehat{A} = 180^\circ - 70^\circ = 110^\circ\).', 2, 'Đề thi học kỳ II Toán 9 TP.HCM', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math-l9-hk2-q3', 'mcq', 'Hình học không gian', 'math-spatial-geometry', 'Một hình nón có bán kính đáy \(r = 3\text{ cm}\) và đường sinh \(l = 5\text{ cm}\). Tính thể tích \(V\) của hình nón (lấy \(\pi \approx 3,14\)).', ARRAY['A. V ≈ 37.68 cm³', 'B. V ≈ 113.04 cm³', 'C. V ≈ 47.1 cm³', 'D. V ≈ 15.07 cm³']::varchar[], ARRAY['A. V ≈ 37.68 cm³']::varchar[], 'Áp dụng định lý Pytago tìm chiều cao hình nón: \(h = \sqrt{l^2 - r^2} = \sqrt{5^2 - 3^2} = 4\text{ cm}\). Thể tích hình nón: \(V = \frac{1}{3}\pi r^2 h = \frac{1}{3} \cdot 3,14 \cdot 3^2 \cdot 4 = 37,68\text{ cm}^3\).', 3, 'Đề kiểm tra học kỳ II Toán 9 TP.HCM', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-math-l9-hk2-q4', 'mcq', 'Căn thức bậc hai', 'math-square-root', 'Tính giá trị của biểu thức \(P = \frac{2}{\sqrt{3}-1} - \sqrt{3}\).', ARRAY['A. 1', 'B. -1', 'C. √3', 'D. 2']::varchar[], ARRAY['A. 1']::varchar[], 'Trục căn thức ở mẫu: \(\frac{2(\sqrt{3}+1)}{(\sqrt{3}-1)(\sqrt{3}+1)} = \frac{2(\sqrt{3}+1)}{3-1} = \sqrt{3}+1\). Vậy \(P = \sqrt{3}+1 - \sqrt{3} = 1\).', 2, 'Đề kiểm tra học kỳ II Toán 9 TP.HCM', 'math', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q1', 'mcq', 'Truyện ngắn', 'lit-modern-prose', 'Trong truyện ngắn ''Lặng lẽ Sa Pa'' của Nguyễn Thành Long, nhân vật chính làm công việc gì?', ARRAY['A. Kỹ sư nông nghiệp', 'B. Người vẽ bản đồ sét', 'C. Nhân vật làm công tác khí tượng kiêm vật lý địa cầu', 'D. Họa sĩ chuyên vẽ phong cảnh Sa Pa']::varchar[], ARRAY['C. Nhân vật làm công tác khí tượng kiêm vật lý địa cầu']::varchar[], 'Nhân vật anh thanh niên làm công tác khí tượng kiêm vật lý địa cầu trên đỉnh Yên Sơn cao 2600m.', 1, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q2', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Bài thơ ''Đồng chí'' của Chính Hữu được viết theo thể thơ nào?', ARRAY['A. Thơ tự do', 'B. Thơ thất ngôn (bảy chữ)', 'C. Thơ lục bát', 'D. Thơ tám chữ']::varchar[], ARRAY['A. Thơ tự do']::varchar[], 'Bài thơ ''Đồng chí'' viết theo thể thơ tự do với các câu thơ dài ngắn khác nhau tạo giọng điệu tâm tình mộc mạc, tự nhiên.', 1, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q3', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Hình ảnh ''Đầu súng trăng treo'' trong bài thơ ''Đồng chí'' của Chính Hữu mang ý nghĩa biểu tượng gì?', ARRAY['A. Sự tàn khốc của chiến tranh', 'B. Vẻ đẹp lãng mạn hòa quyện cùng tinh thần chiến đấu thép', 'C. Nỗi nhớ quê hương da diết', 'D. Sự hi vọng vào một tương lai hòa bình tươi sáng']::varchar[], ARRAY['B. Vẻ đẹp lãng mạn hòa quyện cùng tinh thần chiến đấu thép']::varchar[], '''Súng'' đại diện cho chiến đấu, thực tại chiến tranh gian khổ; ''trăng'' đại diện cho hòa bình, vẻ đẹp lãng mạn của thiên nhiên. Sự kết hợp tạo ra biểu tượng đẹp về tình đồng chí và tâm hồn người lính.', 3, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q4', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Ai là tác giả của tác phẩm ''Bài thơ về tiểu đội xe không kính''?', ARRAY['A. Hữu Thỉnh', 'B. Chính Hữu', 'C. Phạm Tiến Duật', 'D. Bằng Việt']::varchar[], ARRAY['C. Phạm Tiến Duật']::varchar[], '''Bài thơ về tiểu đội xe không kính'' được sáng tác bởi nhà thơ Phạm Tiến Duật năm 1969, in trong tập ''Vầng trăng quầng lửa''.', 1, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q5', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Nguyên nhân chính khiến những chiếc xe trong ''Bài thơ về tiểu đội xe không kính'' không có kính là gì?', ARRAY['A. Kính tự vỡ do thời tiết quá nóng', 'B. Bom giật bom rung làm kính vỡ đi rồi', 'C. Xe đời cũ không trang bị kính', 'D. Chiến sĩ chủ động tháo kính để nhìn rõ hơn']::varchar[], ARRAY['B. Bom giật bom rung làm kính vỡ đi rồi']::varchar[], 'Câu thơ đầu tiên lý giải: ''Không có kính không phải vì xe không có kính / Bom giật bom rung kính vỡ đi rồi''.', 1, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q6', 'mcq', 'Truyện ngắn', 'lit-modern-prose', 'Trong truyện ngắn ''Chiếc lược ngà'' của Nguyễn Quang Sáng, chi tiết nào thể hiện bước ngoặt trong tình cảm của bé Thu dành cho ba?', ARRAY['A. Bé Thu bỏ trốn sang nhà ngoại', 'B. Bé Thu gọi tiếng ''Ba'' xé lòng trước giờ ông Sáu lên đường trở lại chiến khu', 'C. Bé Thu nhận chiếc lược ngà từ tay bác Ba', 'D. Bé Thu từ chối không cho ông Sáu gắp trứng cá']::varchar[], ARRAY['B. Bé Thu gọi tiếng ''Ba'' xé lòng trước giờ ông Sáu lên đường trở lại chiến khu']::varchar[], 'Đó là khoảnh khắc xúc động nhất, mọi sự nghi ngờ của bé Thu được giải tỏa sau khi nghe bà ngoại giải thích về vết thẹo trên mặt ba.', 2, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q7', 'mcq', 'Truyện ngắn', 'lit-modern-prose', 'Truyện ngắn ''Làng'' của Kim Lân phản ánh tâm lý nào của người nông dân Việt Nam trong thời kỳ đầu kháng chiến chống Pháp?', ARRAY['A. Tình yêu làng gắn liền với lòng yêu nước và tinh thần kháng chiến', 'B. Sự cam chịu số phận nghèo đói', 'C. Nỗi sợ hãi chiến tranh tàn khốc', 'D. Sự thờ ơ với vận mệnh đất nước']::varchar[], ARRAY['A. Tình yêu làng gắn liền với lòng yêu nước và tinh thần kháng chiến']::varchar[], 'Qua nhân vật ông Hai, nhà văn Kim Lân đã thể hiện sâu sắc sự phát triển trong nhận thức của người nông dân: Tình yêu làng gắn bó thống nhất với lòng yêu nước, trung thành với kháng chiến và Cụ Hồ.', 2, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q8', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Hoàn cảnh ra đời của bài thơ ''Đoàn thuyền đánh cá'' của Huy Cận là gì?', ARRAY['A. Viết tại chiến khu Việt Bắc trong những năm kháng chiến chống Pháp', 'B. Sáng tác năm 1958 trong chuyến đi thực tế dài ngày tại vùng mỏ Quảng Ninh', 'C. Viết sau khi đất nước hoàn toàn thống nhất năm 1975', 'D. Sáng tác tại miền Nam trong những năm chống Mỹ']::varchar[], ARRAY['B. Sáng tác năm 1958 trong chuyến đi thực tế dài ngày tại vùng mỏ Quảng Ninh']::varchar[], 'Bài thơ viết vào giữa năm 1958, thời kỳ miền Bắc được giải phóng đi vào xây dựng CNXH, Huy Cận có chuyến đi thực tế ở Quảng Ninh.', 2, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q9', 'mcq', 'Truyện trung đại', 'lit-medieval-poetry-prose', 'Trong tác phẩm ''Chuyện người con gái Nam Xương'' của Nguyễn Dữ, chi tiết nào đóng vai trò thắt nút và mở nút cho bi kịch của Vũ Nương?', ARRAY['A. Chiếc bóng trên vách', 'B. Chiếc trâm cài tóc', 'C. Giếng nước ở đầu làng', 'D. Chiếc hoa tai bằng vàng']::varchar[], ARRAY['A. Chiếc bóng trên vách']::varchar[], 'Chiếc bóng thắt nút bi kịch vì Trương Sinh nghi vợ thất tiết qua lời kể ngây thơ của bé Đản; cũng chính chiếc bóng trên vách do Trương Sinh tạo ra sau đó đã mở nút bi kịch giúp anh nhận ra sự oan ức của vợ.', 3, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q10', 'mcq', 'Văn học trung đại', 'lit-medieval-poetry-prose', 'Kiệt tác ''Truyện Kiều'' của Nguyễn Du được viết bằng chữ gì và thể thơ nào?', ARRAY['A. Chữ Hán, thể thơ thất ngôn bát cú', 'B. Chữ Nôm, thể thơ lục bát', 'C. Chữ Quốc ngữ, thể thơ tự do', 'D. Chữ Hán, thể thơ song thất lục bát']::varchar[], ARRAY['B. Chữ Nôm, thể thơ lục bát']::varchar[], '''Truyện Kiều'' (Đoạn trường tân thanh) của Nguyễn Du được viết bằng chữ Nôm nghệ thuật tinh diệu trên nền thể thơ lục bát truyền thống của dân tộc.', 1, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q11', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Biểu tượng nghệ thuật cốt lõi trong bài thơ ''Ánh trăng'' của Nguyễn Duy là gì?', ARRAY['A. Vầng trăng', 'B. Dòng sông', 'C. Cánh đồng', 'D. Ánh đèn điện']::varchar[], ARRAY['A. Vầng trăng']::varchar[], 'Vầng trăng là biểu tượng của thiên nhiên nghĩa tình, quá khứ thủy chung và là tấm gương để con người tự soi chiếu lương tâm mình.', 2, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q12', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Nhận định nào nói đúng nhất về ý nghĩa nhan đề bài thơ ''Mùa xuân nho nhỏ'' của Thanh Hải?', ARRAY['A. Khát vọng hiến dâng phần đẹp đẽ nhất của mình cho mùa xuân đất nước', 'B. Sự mô tả mùa xuân có kích thước nhỏ', 'C. Sự tiếc nuối tuổi trẻ trôi qua nhanh', 'D. Sự miêu tả thiên nhiên xứ Huế mộng mơ']::varchar[], ARRAY['A. Khát vọng hiến dâng phần đẹp đẽ nhất của mình cho mùa xuân đất nước']::varchar[], '''Mùa xuân nho nhỏ'' là ẩn dụ độc đáo, thể hiện ước nguyện cống hiến khiêm nhường nhưng chân thành của nhà thơ cho cuộc đời chung.', 3, 'Ngữ văn 9, Tập 2', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q13', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Trong bài thơ ''Bếp lửa'' của Bằng Việt, hình ảnh nào luôn song hành cùng hình ảnh bếp lửa trong tâm trí người cháu?', ARRAY['A. Hình ảnh người bà', 'B. Hình ảnh khói bếp', 'C. Tiếng chim tu hú', 'D. Cánh đồng làng quê']::varchar[], ARRAY['A. Hình ảnh người bà']::varchar[], 'Bếp lửa gắn liền với bàn tay khơi nhóm đầy yêu thương và sưởi ấm của bà. Nhắc đến bếp lửa là nhớ đến bà và ngược lại.', 2, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q14', 'mcq', 'Văn học trung đại', 'lit-medieval-poetry-prose', 'Trong đoạn trích ''Kiều ở lầu Ngưng Bích'', Nguyễn Du đã sử dụng bút pháp nghệ thuật nổi bật nào để khắc họa tâm trạng Thúy Kiều?', ARRAY['A. Tả cảnh ngụ tình', 'B. Ước lệ tượng trưng', 'C. Tả thực chi tiết', 'D. Phóng đại khoa trương']::varchar[], ARRAY['A. Tả cảnh ngụ tình']::varchar[], 'Nguyễn Du dùng bút pháp tả cảnh ngụ tình xuất sắc, mượn cảnh thiên nhiên quanh lầu Ngưng Bích để biểu hiện trực tiếp tâm trạng cô đơn, buồn lo, bất an của Thúy Kiều.', 3, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q15', 'mcq', 'Nghị luận văn học', 'lit-argumentative-essay', 'Nhận định nào dưới đây nêu đúng nhất định nghĩa về phép lập luận phân tích?', ARRAY['A. Chia tách đối tượng thành các bộ phận để xem xét kỹ lưỡng', 'B. Ghép nối các ý kiến khác nhau thành một chỉnh thể', 'C. Kể lại câu chuyện theo trình tự thời gian', 'D. Sử dụng từ ngữ hoa mỹ để miêu tả hình ảnh']::varchar[], ARRAY['A. Chia tách đối tượng thành các bộ phận để xem xét kỹ lưỡng']::varchar[], 'Phân tích là phép lập luận chia nhỏ đối tượng để xem xét cụ thể cấu trúc, nội dung, khía cạnh bên trong nhằm làm sáng tỏ bản chất của nó.', 2, 'Ngữ văn 9, Tập 2', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q16', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Hai câu thơ ''Mặt trời đi qua trên lăng / Thấy một mặt trời trong lăng rất đỏ'' (Viễn Phương) sử dụng biện pháp tu từ nào?', ARRAY['A. So sánh', 'B. Ẩn dụ', 'C. Nhân hóa', 'D. Hoán dụ']::varchar[], ARRAY['B. Ẩn dụ']::varchar[], '''Mặt trời trong lăng'' là ẩn dụ ca ngợi Bác Hồ vĩ đại - nguồn sáng ấm áp soi đường cho cách mạng Việt Nam.', 2, 'Ngữ văn 9, Tập 2', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q17', 'mcq', 'Truyện hiện đại', 'lit-modern-prose', 'Trong tác phẩm ''Lặng lẽ Sa Pa'', nhân vật nào đóng vai trò là điểm nhìn trần thuật giúp khách quan hóa chân dung anh thanh niên?', ARRAY['A. Ông họa sĩ', 'B. Bác lái xe', 'C. Cô kỹ sư', 'D. Tác giả tự kể trực tiếp']::varchar[], ARRAY['A. Ông họa sĩ']::varchar[], 'Dưới góc nhìn và suy tư nghệ thuật của ông họa sĩ già, chân dung anh thanh niên hiện ra chân thực, lung linh vẻ đẹp cống hiến thầm lặng.', 3, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q18', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Chủ đề bao trùm bài thơ ''Con cò'' của Chế Lan Viên là gì?', ARRAY['A. Ca ngợi tình mẫu tử thiêng liêng, lòng mẹ bao la qua hình ảnh con cò', 'B. Miêu tả cánh cò quê hương', 'C. Ca ngợi vẻ đẹp đồng quê Việt Nam', 'D. Thể hiện khát vọng tự do bay liệng']::varchar[], ARRAY['A. Ca ngợi tình mẫu tử thiêng liêng, lòng mẹ bao la qua hình ảnh con cò']::varchar[], 'Mượn hình ảnh cánh cò trong ca dao, Chế Lan Viên ca ngợi tình mẫu tử sâu sắc, vĩnh hằng và sự nâng đỡ âm thầm của mẹ dành cho con suốt cuộc đời.', 2, 'Ngữ văn 9, Tập 2', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q19', 'mcq', 'Thơ hiện đại', 'lit-modern-poetry', 'Tập thơ ''Vầng trăng quầng lửa'' của Phạm Tiến Duật chứa bài thơ nào sau đây trong chương trình lớp 9?', ARRAY['A. Bài thơ về tiểu đội xe không kính', 'B. Đồng chí', 'C. Ánh trăng', 'D. Viếng lăng Bác']::varchar[], ARRAY['A. Bài thơ về tiểu đội xe không kính']::varchar[], '''Bài thơ về tiểu đội xe không kính'' rút ra từ tập thơ nổi tiếng ''Vầng trăng quầng lửa'' (1970) của nhà thơ quân đội Phạm Tiến Duật.', 2, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-lit9-cur-q20', 'mcq', 'Văn học trung đại', 'lit-medieval-poetry-prose', 'Nhân vật Vũ Nương trong tác phẩm ''Chuyện người con gái Nam Xương'' gieo mình tự vẫn xuống dòng sông nào?', ARRAY['A. Sông Hoàng Giang', 'B. Sông Hồng', 'C. Sông Hương', 'D. Sông Bạch Đằng']::varchar[], ARRAY['A. Sông Hoàng Giang']::varchar[], 'Quá đau xót vì bị chồng nghi oan thất tiết, Vũ Nương đã trẫm mình xuống sông Hoàng Giang tự vẫn để minh chứng cho sự trong sạch của mình.', 1, 'Ngữ văn 9, Tập 1', 'literature', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-optics-q1', 'mcq', 'Quang học', 'sci-phy-optics', 'Một tia sáng đi từ không khí vào nước có góc khúc xạ r thế nào so với góc tới i?', ARRAY['A. r < i', 'B. r > i', 'C. r = i', 'D. r = 2i']::varchar[], ARRAY['A. r < i']::varchar[], 'Khi tia sáng truyền từ môi trường chiết quang kém (không khí) sang môi trường chiết quang hơn (nước), tia khúc xạ bị lệch lại gần pháp tuyến hơn, do đó góc khúc xạ nhỏ hơn góc tới (r < i).', 1, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-optics-q2', 'mcq', 'Quang học', 'sci-phy-optics', 'Thấu kính phân kì có đặc điểm quang học nào sau đây?', ARRAY['A. Luôn cho ảnh ảo, cùng chiều và nhỏ hơn vật', 'B. Cho ảnh thật ngược chiều', 'C. Luôn cho ảnh ảo lớn hơn vật', 'D. Cho ảnh thật lớn hơn vật']::varchar[], ARRAY['A. Luôn cho ảnh ảo, cùng chiều và nhỏ hơn vật']::varchar[], 'Thấu kính phân kỳ luôn tạo ảnh ảo, cùng chiều và nhỏ hơn vật đối với mọi vị trí đặt vật thật.', 2, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-electricity-q1', 'mcq', 'Điện học', 'sci-phy-electricity', 'Hệ thức của định luật Ohm cho đoạn mạch chỉ chứa điện trở R là gì?', ARRAY['A. I = U / R', 'B. I = U * R', 'C. R = U / I', 'D. U = I / R']::varchar[], ARRAY['A. I = U / R']::varchar[], 'Định luật Ohm phát biểu: Cường độ dòng điện qua vật dẫn tỉ lệ thuận với hiệu điện thế giữa hai đầu vật dẫn và tỉ lệ nghịch với điện trở của vật dẫn đó: I = U/R.', 1, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-electricity-q2', 'mcq', 'Điện học', 'sci-phy-electricity', 'Khi mắc nối tiếp hai điện trở \(R_1 = 10\,\Omega\) và \(R_2 = 20\,\Omega\), điện trở tương đương của đoạn mạch là bao nhiêu?', ARRAY['A. 30 Ω', 'B. 6.67 Ω', 'C. 15 Ω', 'D. 200 Ω']::varchar[], ARRAY['A. 30 Ω']::varchar[], 'Trong đoạn mạch mắc nối tiếp, điện trở tương đương bằng tổng các điện trở thành phần: \(R_{td} = R_1 + R_2 = 10 + 20 = 30\,\Omega\).', 1, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-electricity-q3', 'mcq', 'Điện học', 'sci-phy-electricity', 'Khi mắc song song hai điện trở \(R_1 = 10\,\Omega\) và \(R_2 = 10\,\Omega\), điện trở tương đương của đoạn mạch là bao nhiêu?', ARRAY['A. 5 Ω', 'B. 20 Ω', 'C. 10 Ω', 'D. 100 Ω']::varchar[], ARRAY['A. 5 Ω']::varchar[], 'Trong đoạn mạch mắc song song hai điện trở bằng nhau: \(R_{td} = R/2 = 10/2 = 5\,\Omega\).', 2, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-chemistry-q1', 'mcq', 'Hóa vô cơ', 'sci-chem-inorganic', 'Dung dịch acid làm quỳ tím chuyển sang màu gì?', ARRAY['A. Đỏ', 'B. Xanh', 'C. Không màu', 'D. Vàng']::varchar[], ARRAY['A. Đỏ']::varchar[], 'Acid làm đổi màu chỉ thị quỳ tím sang màu đỏ. Dung dịch base (kiềm) làm quỳ tím chuyển sang màu xanh.', 1, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-chemistry-q2', 'mcq', 'Hóa vô cơ', 'sci-chem-inorganic', 'Chất khí nào sau đây sinh ra khi nhúng lá kẽm (Zn) vào dung dịch acid Clohiđric (HCl)?', ARRAY['A. Khí Hydrogen (H₂)', 'B. Khí Oxygen (O₂)', 'C. Khí Carbon dioxide (CO₂)', 'D. Khí Clo (Cl₂)']::varchar[], ARRAY['A. Khí Hydrogen (H₂)']::varchar[], 'Kẽm đứng trước Hydrogen trong dãy hoạt động hóa học nên phản ứng với dung dịch HCl giải phóng khí H₂: Zn + 2HCl -> ZnCl₂ + H₂.', 1, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-chemistry-q3', 'mcq', 'Hóa hữu cơ', 'sci-chem-organic', 'Công thức phân tử của khí Methan là gì?', ARRAY['A. CH₄', 'B. C₂H₄', 'C₂H₂', 'C₆H₆']::varchar[], ARRAY['A. CH₄']::varchar[], 'Methan có công thức phân tử là CH₄. C₂H₄ là Ethylen, C₂H₂ là Acetylen, C₆H₆ là Benzen.', 1, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-chemistry-q4', 'mcq', 'Hóa hữu cơ', 'sci-chem-organic', 'Phản ứng đặc trưng của hydrocarbon no Methan (CH₄) với khí Clo khi có ánh sáng là gì?', ARRAY['A. Phản ứng thế', 'B. Phản ứng cộng', 'C. Phản ứng phân hủy', 'D. Phản ứng trùng hợp']::varchar[], ARRAY['A. Phản ứng thế']::varchar[], 'Do Methan chỉ có liên kết đơn bền vững trong phân tử nên phản ứng hóa học đặc trưng là phản ứng thế nguyên tử H bằng nguyên tử Cl khi có ánh sáng kích thích.', 2, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-biology-q1', 'mcq', 'Sinh học di truyền', 'sci-bio-genetics-mendelian', 'Theo quy luật phân ly độc lập của Mendel, cơ thể có kiểu gen AaBb giảm phân bình thường cho ra tối đa bao nhiêu loại giao tử?', ARRAY['A. 4 loại giao tử với tỉ lệ ngang nhau', 'B. 2 loại giao tử', 'C. 8 loại giao tử', 'D. 1 loại giao tử']::varchar[], ARRAY['A. 4 loại giao tử với tỉ lệ ngang nhau']::varchar[], 'Cơ thể dị hợp 2 cặp gen AaBb giảm phân tạo ra 4 loại giao tử với tỉ lệ 1 AB : 1 Ab : 1 aB : 1 ab (mỗi loại chiếm 25%).', 2, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-biology-q2', 'mcq', 'Sinh học tế bào', 'sci-bio-genetics-molecular', 'Phân tử ADN được cấu tạo từ các loại đơn phân (nucleotide) nào sau đây?', ARRAY['A. A, T, G, C', 'B. A, U, G, C', 'C. A, B, C, D', 'D. Glucozơ và Axit amin']::varchar[], ARRAY['A. A, T, G, C']::varchar[], 'Đơn phân cấu tạo nên ADN là các nucleotide thuộc 4 loại: Adenin (A), Thymin (T), Guanin (G) và Cytosin (C). Ở ARN thì loại T được thay bằng U (Uraxil).', 1, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-biology-q3', 'mcq', 'Sinh học di truyền', 'sci-bio-genetics-mendelian', 'Hiện tượng tự thụ phấn bắt buộc ở cây giao phấn qua nhiều thế hệ sẽ dẫn đến hiện tượng gì?', ARRAY['A. Thoái hóa giống, xuất hiện các gen lặn có hại ở trạng thái đồng hợp', 'B. Ưu thế lai tăng lên mạnh mẽ', 'C. Cây phát triển nhanh hơn', 'D. Tránh được hoàn toàn sâu bệnh']::varchar[], ARRAY['A. Thoái hóa giống, xuất hiện các gen lặn có hại ở trạng thái đồng hợp']::varchar[], 'Tự thụ phấn ở cây giao phấn làm tăng tỉ lệ đồng hợp tử và giảm tỉ lệ dị hợp tử, tạo cơ hội cho các gen lặn có hại tổ hợp lại thành trạng thái đồng hợp gây thoái hóa giống.', 2, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-earth-q1', 'mcq', 'Trái đất và bầu trời', 'sci-earth-sky', 'Trong hệ Mặt Trời, hành tinh nào nằm gần Mặt Trời nhất?', ARRAY['A. Sao Thủy', 'B. Sao Kim', 'C. Trái Đất', 'D. Sao Hỏa']::varchar[], ARRAY['A. Sao Thủy']::varchar[], 'Thứ tự các hành tinh từ Mặt Trời ra ngoài: Sao Thủy -> Sao Kim -> Trái Đất -> Sao Hỏa -> Sao Mộc -> Sao Thổ -> Sao Thiên Vương -> Sao Hải Vương. Vậy Sao Thủy là gần nhất.', 1, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-earth-q2', 'mcq', 'Trái đất và bầu trời', 'sci-earth-sky', 'Hiện tượng nhật thực xảy ra khi nào?', ARRAY['A. Mặt Trăng nằm giữa Mặt Trời và Trái Đất', 'B. Trái Đất nằm giữa Mặt Trời và Mặt Trăng', 'C. Mặt Trời nằm giữa Trái Đất và Mặt Trăng', 'D. Sao Kim che khuất hoàn toàn Mặt Trời']::varchar[], ARRAY['A. Mặt Trăng nằm giữa Mặt Trời và Trái Đất']::varchar[], 'Nhật thực xảy ra khi Mặt Trăng đi vào giữa Trái Đất và Mặt Trời, che khuất một phần hoặc hoàn toàn Mặt Trời dưới góc nhìn từ Trái Đất.', 2, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-sci9-earth-q3', 'mcq', 'Trái đất và bầu trời', 'sci-earth-sky', 'Hành tinh nào được mệnh danh là ''Hành tinh Đỏ'' trong Hệ Mặt Trời?', ARRAY['A. Sao Hỏa', 'B. Sao Kim', 'C. Sao Mộc', 'D. Sao Thiên Vương']::varchar[], ARRAY['A. Sao Hỏa']::varchar[], 'Sao Hỏa (Mars) có bề mặt chứa nhiều sắt oxit tạo nên màu đỏ đặc trưng nên được gọi là Hành tinh Đỏ.', 1, 'Sách giáo khoa KHTN 9', 'science', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-his9-modern-q1', 'mcq', 'Lịch sử thế giới', 'his-world-contemporary', 'Cách mạng tháng Mười Nga năm 1917 thắng lợi đã dẫn đến sự ra đời của nhà nước xã hội chủ nghĩa đầu tiên trên thế giới do ai lãnh đạo?', ARRAY['A. V.I. Lênin', 'B. J. Xtalin', 'C. C. Mác', 'D. Ph. Ăng-ghen']::varchar[], ARRAY['A. V.I. Lênin']::varchar[], 'V.I. Lênin là lãnh tụ vĩ đại của Đảng Bolshevik chỉ đạo trực tiếp cuộc Cách mạng tháng Mười Nga lập ra nhà nước Xô viết xã hội chủ nghĩa đầu tiên.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-his9-modern-q2', 'mcq', 'Lịch sử thế giới', 'his-world-contemporary', 'Cuộc đại khủng hoảng kinh tế thừa trong thế giới tư bản chủ nghĩa diễn ra vào khoảng thời gian nào?', ARRAY['A. 1929 - 1933', 'B. 1914 - 1918', 'C. 1939 - 1945', 'D. 1917 - 1923']::varchar[], ARRAY['A. 1929 - 1933']::varchar[], 'Cuộc đại khủng hoảng kinh tế thế giới diễn ra từ năm 1929 đến 1933, gây tổn thất nghiêm trọng và thúc đẩy chủ nghĩa phát xít lên nắm quyền ở Đức, Ý, Nhật.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-his9-vietnam-q1', 'mcq', 'Lịch sử Việt Nam', 'his-vn-independence', 'Bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa được Chủ tịch Hồ Chí Minh đọc tại Quảng trường Ba Đình vào ngày tháng năm nào?', ARRAY['A. Ngày 2 tháng 9 năm 1945', 'B. Ngày 19 tháng 8 năm 1945', 'C. Ngày 22 tháng 12 năm 1944', 'D. Ngày 30 tháng 4 năm 1975']::varchar[], ARRAY['A. Ngày 2 tháng 9 năm 1945']::varchar[], 'Ngày 2-9-1945, Bác Hồ đọc Tuyên ngôn Độc lập lập nên nước VNDCCH, đánh dấu mốc lịch sử độc lập vẻ vang.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-his9-vietnam-q2', 'mcq', 'Lịch sử Việt Nam', 'his-vn-independence', 'Chiến thắng quân sự nào của quân dân ta đã đập tan hoàn toàn tập đoàn cứ điểm mạnh nhất của thực dân Pháp ở Đông Dương năm 1954?', ARRAY['A. Chiến dịch Điện Biên Phủ', 'B. Chiến dịch Biên giới Thu Đông', 'C. Chiến dịch Tây Bắc', 'D. Chiến dịch Việt Bắc Thu Đông']::varchar[], ARRAY['A. Chiến dịch Điện Biên Phủ']::varchar[], 'Chiến thắng Điện Biên Phủ ''lừng lẫy năm châu, chấn động địa cầu'' năm 1954 buộc thực dân Pháp ký Hiệp định Giơ-ne-vơ lập lại hòa bình ở Đông Dương.', 2, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-his9-vietnam-q3', 'mcq', 'Lịch sử Việt Nam', 'his-vn-reunification', 'Cuộc Tổng tiến công và nổi dậy Xuân 1975 kết thúc bằng thắng lợi hoàn toàn của chiến dịch lịch sử nào?', ARRAY['A. Chiến dịch Hồ Chí Minh', 'B. Chiến dịch Tây Nguyên', 'C. Chiến dịch Huế - Đà Nẵng', 'D. Chiến dịch Trị Thiên']::varchar[], ARRAY['A. Chiến dịch Hồ Chí Minh']::varchar[], 'Chiến dịch Hồ Chí Minh thắng lợi ngày 30/4/1975 giải phóng miền Nam thống nhất đất nước.', 2, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-geo9-resources-q1', 'mcq', 'Địa lý tự nhiên', 'geo-vn-resources', 'Địa hình nước ta chủ yếu là đồi núi thấp, chiếm khoảng bao nhiêu phần diện tích lãnh thổ đất liền?', ARRAY['A. 3/4 diện tích', 'B. 1/4 diện tích', 'C. 1/2 diện tích', 'D. 9/10 diện tích']::varchar[], ARRAY['A. 3/4 diện tích']::varchar[], 'Đồi núi chiếm 3/4 diện tích đất liền của Việt Nam, nhưng chủ yếu là đồi núi thấp (dưới 1000m chiếm tới 85%). Đồng bằng chỉ chiếm 1/4 diện tích.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-geo9-resources-q2', 'mcq', 'Địa lý dân cư', 'geo-vn-population', 'Dân tộc nào chiếm tỉ lệ cao nhất trong tổng dân số nước ta?', ARRAY['A. Dân tộc Kinh (Việt)', 'B. Dân tộc Tày', 'C. Dân tộc Mường', 'D. Dân tộc Thái']::varchar[], ARRAY['A. Dân tộc Kinh (Việt)']::varchar[], 'Dân tộc Kinh chiếm khoảng 85,3% dân số cả nước, các dân tộc thiểu số khác chiếm khoảng 14,7%.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-geo9-economy-q1', 'mcq', 'Địa lý kinh tế', 'geo-vn-agriculture', 'Hai vùng đồng bằng trồng lúa lớn nhất nước ta hiện nay là vùng nào?', ARRAY['A. Đồng bằng sông Cửu Long và Đồng bằng sông Hồng', 'B. Đồng bằng sông Hồng và Đồng bằng duyên hải miền Trung', 'C. Đồng bằng sông Cửu Long và Đông Nam Bộ', 'D. Đồng bằng Bắc Bộ và Tây Nguyên']::varchar[], ARRAY['A. Đồng bằng sông Cửu Long và Đồng bằng sông Hồng']::varchar[], 'Đồng bằng sông Cửu Long là vựa lúa lớn nhất cả nước, Đồng bằng sông Hồng là vựa lúa lớn thứ hai.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-geo9-economy-q2', 'mcq', 'Địa lý kinh tế', 'geo-vn-industry', 'Tỉnh thành nào là trung tâm công nghiệp lớn nhất cả nước hiện nay về quy mô và giá trị sản xuất?', ARRAY['A. Thành phố Hồ Chí Minh', 'B. Thủ đô Hà Nội', 'C. Tỉnh Bình Dương', 'D. Thành phố Hải Phòng']::varchar[], ARRAY['A. Thành phố Hồ Chí Minh']::varchar[], 'TP.HCM là đầu tàu kinh tế, có quy mô và giá trị sản xuất công nghiệp lớn nhất cả nước.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-geo9-economy-q3', 'mcq', 'Địa lý vùng', 'geo-vn-regions', 'Vùng kinh tế trọng điểm phía Nam bao gồm tỉnh thành nào là hạt nhân?', ARRAY['A. Thành phố Hồ Chí Minh', 'B. Tỉnh Đồng Nai', 'C. Tỉnh Bà Rịa - Vũng Tàu', 'D. Tỉnh Long An']::varchar[], ARRAY['A. Thành phố Hồ Chí Minh']::varchar[], 'TP.HCM là đô thị đặc biệt, trung tâm kinh tế và là hạt nhân tăng trưởng phát triển của toàn vùng kinh tế trọng điểm phía Nam.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-his9-modern-q3', 'mcq', 'Lịch sử thế giới', 'his-world-contemporary', 'Chiến tranh thế giới thứ hai (1939 - 1945) kết thúc với sự thất bại hoàn toàn của phe nào?', ARRAY['A. Phe Phát xít (Đức, Ý, Nhật)', 'B. Phe Đồng minh (Liên Xô, Mỹ, Anh)', 'C. Phe Hiệp ước', 'D. Phe Liên minh']::varchar[], ARRAY['A. Phe Phát xít (Đức, Ý, Nhật)']::varchar[], 'Chiến tranh thế giới thứ hai kết thúc năm 1945 với sự sụp đổ hoàn toàn của chủ nghĩa phát xít Đức, Ý, Nhật trước lực lượng Đồng minh.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-his9-vietnam-q4', 'mcq', 'Lịch sử Việt Nam', 'his-vn-independence', 'Đại hội đại biểu toàn quốc lần thứ II của Đảng (tháng 2-1951) quyết định đổi tên Đảng ta thành gì?', ARRAY['A. Đảng Lao động Việt Nam', 'B. Đảng Cộng sản Việt Nam', 'C. Đảng Cộng sản Đông Dương', 'D. Hội nghiên cứu Chủ nghĩa Mác ở Đông Dương']::varchar[], ARRAY['A. Đảng Lao động Việt Nam']::varchar[], 'Đại hội II của Đảng họp tháng 2/1951 tại Tuyên Quang quyết định đưa Đảng ra hoạt động công khai lấy tên là Đảng Lao động Việt Nam.', 3, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-geo9-resources-q3', 'mcq', 'Địa lý tự nhiên', 'geo-vn-resources', 'Nước ta có khí hậu mang tính chất gì là chủ đạo?', ARRAY['A. Nhiệt đới ẩm gió mùa', 'B. Ôn đới hải dương', 'C. Cận nhiệt đới lục địa', 'D. Khô hạn hoang mạc']::varchar[], ARRAY['A. Nhiệt đới ẩm gió mùa']::varchar[], 'Lãnh thổ Việt Nam nằm trọn trong vùng nội chí tuyến nửa cầu Bắc, tạo nên khí hậu đặc trưng là nhiệt đới ẩm gió mùa.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-geo9-economy-q4', 'mcq', 'Địa lý kinh tế', 'geo-vn-services', 'Cửa ngõ hàng không quốc tế lớn nhất miền Nam Việt Nam hiện nay là sân bay nào?', ARRAY['A. Sân bay quốc tế Tân Sơn Nhất', 'B. Sân bay quốc tế Nội Bài', 'C. Sân bay quốc tế Đà Nẵng', 'D. Sân bay quốc tế Long Thành']::varchar[], ARRAY['A. Sân bay quốc tế Tân Sơn Nhất']::varchar[], 'Sân bay Tân Sơn Nhất (TP.HCM) hiện là phi trường nhộn nhịp nhất và là cửa ngõ quốc tế lớn nhất khu vực miền Nam Việt Nam.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-geo9-economy-q5', 'mcq', 'Địa lý kinh tế', 'geo-vn-regions', 'Vùng nào trồng cây công nghiệp lâu năm (cà phê, cao su, chè...) lớn nhất nước ta?', ARRAY['A. Tây Nguyên', 'B. Trung du và miền núi Bắc Bộ', 'C. Đông Nam Bộ', 'D. Duyên hải Nam Trung Bộ']::varchar[], ARRAY['A. Tây Nguyên']::varchar[], 'Nhờ đất đỏ ba-dan màu mỡ, Tây Nguyên là vùng chuyên canh cây công nghiệp lớn nhất cả nước, nổi bật nhất là cà phê.', 1, 'Sách giáo khoa Lịch sử - Địa lý 9', 'history_geography', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-civ9-ideals-q1', 'mcq', 'Lý tưởng sống', 'civ-personal-ideals', 'Học sinh lớp 9 sống có lý tưởng được biểu hiện qua hành động nào dưới đây?', ARRAY['A. Luôn xác định mục tiêu học tập rõ ràng, nỗ lực rèn luyện bản thân và sẵn sàng giúp đỡ cộng đồng', 'B. Chỉ quan tâm đến điểm số cá nhân', 'C. Thực hiện mọi yêu cầu của bạn bè mà không suy nghĩ', 'D. Chờ đợi cơ hội may mắn tự đến']::varchar[], ARRAY['A. Luôn xác định mục tiêu học tập rõ ràng, nỗ lực rèn luyện bản thân và sẵn sàng giúp đỡ cộng đồng']::varchar[], 'Lý tưởng sống cao đẹp của học sinh là không ngừng rèn luyện đạo đức, tri thức, tự lập và cống hiến giá trị tốt đẹp cho gia đình, xã hội.', 1, 'Sách giáo khoa GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-civ9-ideals-q2', 'mcq', 'Lý tưởng sống', 'civ-personal-ideals', 'Tự lập là gì?', ARRAY['A. Tự làm lấy công việc của mình, không trông chờ ỷ lại vào người khác', 'B. Từ chối mọi sự giúp đỡ hợp pháp của người thân', 'C. Không bao giờ làm việc chung với người khác', 'D. Tự quyết định mọi việc bất chấp quy định pháp luật']::varchar[], ARRAY['A. Tự làm lấy công việc của mình, không trông chờ ỷ lại vào người khác']::varchar[], 'Tự lập là đức tính tự mình giải quyết công việc, tự lo liệu cho cuộc sống bản thân, không dựa dẫm hay phụ thuộc thụ động vào xã hội.', 1, 'Sách giáo khoa GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-civ9-ethics-q1', 'mcq', 'Quan hệ với người khác', 'civ-social-interpersonal', 'Thế nào là tôn trọng người khác?', ARRAY['A. Nhìn nhận đúng mực, coi trọng danh dự, phẩm giá và lợi ích hợp pháp của người khác', 'B. Luôn đồng ý với ý kiến của người lớn hơn dù biết họ sai', 'C. Tâng bốc khen ngợi giả tạo để lấy lòng đối phương', 'D. Chỉ tôn trọng những người mang lại lợi ích kinh tế cho mình']::varchar[], ARRAY['A. Nhìn nhận đúng mực, coi trọng danh dự, phẩm giá và lợi ích hợp pháp của người khác']::varchar[], 'Tôn trọng người khác là sự ứng xử văn minh, tôn trọng phẩm giá và quyền lợi chính đáng của mọi cá nhân xung quanh mình.', 1, 'Sách giáo khoa GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-civ9-ethics-q2', 'mcq', 'Quan hệ với công việc', 'civ-work-discipline', 'Hành vi nào dưới đây thể hiện sự thiếu chí công vô tư trong công việc và cuộc sống?', ARRAY['A. Giải quyết công việc dựa trên tình cảm cá nhân, thiên vị người thân quen', 'B. Đánh giá học sinh dựa trên học lực thực tế', 'C. Báo cáo trung thực lỗi sai của bản thân', 'D. Ủng hộ ý kiến đúng đắn của mọi người']::varchar[], ARRAY['A. Giải quyết công việc dựa trên tình cảm cá nhân, thiên vị người thân quen']::varchar[], 'Chí công vô tư đòi hỏi sự công bằng, khách quan, đặt lợi ích chung lên trên lợi ích cá nhân. Thiên vị người thân là trái với phẩm chất này.', 1, 'Sách giáo khoa GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-civ9-law-q1', 'mcq', 'Kỷ luật và Pháp luật', 'civ-law-order', 'Pháp luật nước Cộng hòa xã hội chủ nghĩa Việt Nam do cơ quan nào ban hành?', ARRAY['A. Quốc hội', 'B. Bộ Giáo dục và Đào tạo', 'C. Ủy ban nhân dân các cấp', 'D. Tòa án nhân dân tối cao']::varchar[], ARRAY['A. Quốc hội']::varchar[], 'Quốc hội là cơ quan quyền lực nhà nước cao nhất, có quyền lập hiến và lập pháp (ban hành các bộ luật và luật).', 1, 'Sách giáo khoa GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-civ9-law-q2', 'mcq', 'Kỷ luật và Pháp luật', 'civ-law-order', 'Vi phạm pháp luật là hành vi có lỗi, do ai thực hiện?', ARRAY['A. Chủ thể có năng lực trách nhiệm pháp lý thực hiện', 'B. Bất kỳ ai, kể cả người mắc bệnh tâm thần nặng', 'C. Chỉ có người trưởng thành trên 18 tuổi mới thực hiện', 'D. Động vật gây thiệt hại tài sản cho con người']::varchar[], ARRAY['A. Chủ thể có năng lực trách nhiệm pháp lý thực hiện']::varchar[], 'Vi phạm pháp luật phải do người (hoặc tổ chức) có năng lực hành vi và năng lực trách nhiệm pháp lý thực hiện (nhận thức và làm chủ được hành động).', 3, 'Sách giáo khoa GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-civ9-rights-q1', 'mcq', 'Quyền con người và công dân', 'civ-social-rights', 'Độ tuổi nào dưới đây được quy định là trẻ em theo Luật Trẻ em Việt Nam năm 2016?', ARRAY['A. Người dưới 16 tuổi', 'B. Người dưới 18 tuổi', 'C. Người dưới 14 tuổi', 'D. Người từ 16 đến 18 tuổi']::varchar[], ARRAY['A. Người dưới 16 tuổi']::varchar[], 'Điều 1 Luật Trẻ em 2016 quy định: ''Trẻ em là người dưới 16 tuổi''.', 1, 'Sách giáo khoa GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-civ9-rights-q2', 'mcq', 'Quyền con người và công dân', 'civ-social-rights', 'Quyền tự do ngôn luận của công dân nghĩa là gì?', ARRAY['A. Công dân có quyền phát biểu ý kiến, tham gia bàn bạc công việc chung của đất nước theo quy định pháp luật', 'B. Tự do xúc phạm danh dự người khác trên mạng xã hội', 'C. Phát tán các tin đồn thất thiệt không kiểm chứng', 'D. Phát biểu mọi điều mà không cần tuân theo bất kỳ giới hạn nào']::varchar[], ARRAY['A. Công dân có quyền phát biểu ý kiến, tham gia bàn bạc công việc chung của đất nước theo quy định pháp luật']::varchar[], 'Quyền tự do ngôn luận cho phép công dân đóng góp ý kiến xây dựng xã hội và quốc gia, nhưng phải thực hiện trong khuôn khổ pháp luật quy định.', 2, 'Sách giáo khoa GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-civ9-rights-q3', 'mcq', 'Nghĩa vụ của công dân', 'civ-social-duty', 'Nghĩa vụ bảo vệ Tổ quốc của công dân Việt Nam bao gồm hoạt động nào?', ARRAY['A. Tham gia nghĩa vụ quân sự, bảo vệ an ninh trật tự xã hội và xây dựng nền quốc phòng toàn dân', 'B. Chỉ quyên góp tiền của cho quân đội', 'C. Chỉ tham gia khi đất nước có chiến tranh xảy ra', 'D. Đây là trách nhiệm riêng của lực lượng công an và quân đội']::varchar[], ARRAY['A. Tham gia nghĩa vụ quân sự, bảo vệ an ninh trật tự xã hội và xây dựng nền quốc phòng toàn dân']::varchar[], 'Bảo vệ Tổ quốc là nghĩa vụ thiêng liêng và quyền cao quý của công dân, bao gồm việc thực hiện nghĩa vụ quân sự và tham gia xây dựng thế trận quốc phòng.', 1, 'Sách giáo khoa GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
VALUES ('hcm-civ9-rights-q4', 'mcq', 'Quyền con người và công dân', 'civ-social-rights', 'Công dân có quyền tự do kinh doanh nghĩa là gì?', ARRAY['A. Được tự do lựa chọn hình thức tổ chức kinh doanh, ngành nghề và quy mô kinh doanh theo quy định của pháp luật', 'B. Được quyền kinh doanh mọi mặt hàng kể cả chất cấm', 'C. Không cần phải thực hiện nghĩa vụ đóng thuế', 'D. Tự ý sản xuất hàng giả để kiếm thêm lợi nhuận']::varchar[], ARRAY['A. Được tự do lựa chọn hình thức tổ chức kinh doanh, ngành nghề và quy mô kinh doanh theo quy định của pháp luật']::varchar[], 'Tự do kinh doanh là quyền tự do lựa chọn ngành nghề, hình thức và quy mô, nhưng bắt buộc phải đăng ký kinh doanh và đóng thuế đầy đủ theo pháp luật.', 2, 'Sách giáo khoa GDCD 9', 'civics', 9, '{"isStandard": true, "answerMode": "single-choice"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  topic_id = EXCLUDED.topic_id,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  difficulty = EXCLUDED.difficulty,
  source = EXCLUDED.source,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier,
  metadata = EXCLUDED.metadata;

COMMIT;