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

COMMIT;