/* Đề "Ôn tập 3" – chép từ tài liệu "Tổng hợp" (tong-hop-sfsa.pdf, 93 trang): trộn đề cuối kỳ và giữa kỳ.
   Chỉ lấy câu có đủ phương án; bỏ câu chỉ có đáp án, câu lặp, câu thiếu dữ liệu / hình.
   Đáp án đã được kiểm lại; chỗ nào khác với đáp án ghi trong tài liệu thì giải thích có ghi rõ.
   ch: 4, 5, 6 = chương tương ứng · ch: 0 = ngoài chương 4–6 (giới thiệu, tiến trình, lập lịch, đồng bộ, deadlock, thực hành) */
window.QUESTIONS = window.QUESTIONS || [];
window.QSETS = window.QSETS || [];
(function(){
var CODE = function(s){ return '<pre class="q-pre">' + s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") + '</pre>'; };
var DOC = function(x){ return '<p class="muted"><small>Tài liệu gốc ghi đáp án ' + x + '.</small></p>'; };
var L = [];
function Q(o){ L.push(o); }

/* ===== Phần 1: đề cuối kỳ (trang 2–4) ===== */
Q({ch:4,type:"single",topic:"LRU",sec:"s4-10",
 q:"Một máy tính cung cấp 4 khung trang (0–3) cho mỗi chương trình. Lần lượt các khung trang truy cập theo thứ tự là 0 2 1 3 2 0 1 3 thì lỗi trang xảy ra. Vậy khung trang nào sẽ được thay thế nếu sử dụng thuật toán LRU?",
 opts:["Khung trang 0","Khung trang 1","Khung trang 2","Khung trang 3"], ans:[2],
 expH:"<p>LRU bỏ khung <b>lâu nhất chưa được dùng</b>. Đọc chuỗi từ phải sang trái: 3, 1, 0, 2. Khung 2 được dùng lần cuối sớm nhất (ở vị trí thứ 5), nên <b>khung 2</b> bị thay.</p>"});
Q({ch:4,type:"single",topic:"Phân trang – độ dài địa chỉ",sec:"s4-7",
 q:"Một máy tính cung cấp 65536 khung trang và kích thước mỗi khung trang là 4096 bytes, địa chỉ vật lý sẽ là bao nhiêu bits?",
 opts:["28 bits","26 bits","27 bits","25 bits"], ans:[0],
 expH:"<p>65536 = 2<sup>16</sup> khung → 16 bit số khung. 4096 = 2<sup>12</sup> → 12 bit offset. Tổng <b>28 bit</b>.</p>"});
Q({ch:5,type:"single",topic:"Phân lớp phần mềm Vào/Ra",sec:"s5-9",
 q:"Lớp nào trong 4 lớp của phần mềm vào/ra thực hiện \"Kiểm tra users có được phép sử dụng thiết bị\"?",
 opts:["Phần mềm ở mức người dùng","Driver của thiết bị","Điều khiển ngắt","Phần mềm độc lập với thiết bị"], ans:[3],
 expH:"<p>Kiểm tra quyền là việc <b>bảo vệ (protection)</b>, giống nhau cho mọi thiết bị, nên nằm ở lớp <b>phần mềm độc lập thiết bị</b> (cùng với đặt tên, tạo khối, buffering, cấp phát thiết bị, báo lỗi).</p>"});
Q({ch:4,type:"single",topic:"TLB khi đổi tiến trình",sec:"s4-11",
 q:"Khi chuyển đổi giữa các tiến trình, phần nào sau đây không cần lưu lại?",
 opts:["Bộ đệm TLB","Các thanh ghi","Bộ đếm chương trình","Tất cả các ý kiến trên"], ans:[0],
 expH:"<p>Thanh ghi và PC phải lưu để tiến trình chạy tiếp đúng chỗ. <b>TLB thì bị xóa (flush)</b> chứ không lưu: nó chỉ là bản sao tạm của bảng trang, và nếu giữ lại thì tiến trình mới sẽ tra nhầm dòng của tiến trình cũ.</p>"});
Q({ch:4,type:"single",topic:"Bộ nhớ ảo – hiệu năng",sec:"s4-9",
 q:"Khi sử dụng kĩ thuật bộ nhớ ảo, nếu tăng dung lượng RAM cho máy tính thường cải thiện hiệu suất của chương trình vì ______",
 opts:["ít xảy ra lỗi phân đoạn hơn","Bộ nhớ ảo tăng","RAM có dung lượng lớn hơn sẽ cho tốc độ nhanh hơn","ít xảy ra lỗi trang hơn"], ans:[3],
 expH:"<p>Nhiều RAM → nhiều khung trang → nhiều trang ở lại RAM → <b>ít lỗi trang</b>. Mỗi lỗi trang tốn thời gian đọc đĩa rất lâu, nên bớt lỗi trang thì chương trình nhanh hẳn. Dung lượng RAM không làm mỗi lần truy cập nhanh hơn, và không gian ảo do số bit địa chỉ quyết định.</p>"});
Q({ch:4,type:"single",topic:"Phân trang – số trang ảo",sec:"s4-7",
 q:"Giả sử rằng một máy tính với địa chỉ ảo 48 bits và địa chỉ vật lý 32 bits. Nếu kích thước 1 trang là 8KB thì số trang ảo sẽ là ______",
 opts:["2^35","2^33","2^34","2^32"], ans:[0],
 expH:"<p>8 KB = 2<sup>13</sup> → offset 13 bit. Số trang <b>ảo</b> = 2<sup>48 − 13</sup> = <b>2<sup>35</sup></b>. Con số 32 bit vật lý dùng để tính số khung (2<sup>19</sup>), không dùng ở đây.</p>"});
Q({ch:4,type:"single",topic:"Bảng trang 2 mức",sec:"s4-8",
 q:"Giả sử không gian địa chỉ ảo là 2^32 bytes, kích thước trang là 4KB và sử dụng bảng trang 2 mức (10 bits cho mức 1 và 10 bits cho mức 2). Nếu địa chỉ ảo là 0x00804005 ở hệ 16, thì giá trị của PT1, PT2, offset là bao nhiêu trong hệ 10?",
 opts:["PT1=2, PT2=4, offset=5","PT1=10, PT2=8, offset=5","PT1=2, PT2=8, offset=5","PT1=10, PT2=4, offset=5"], ans:[0],
 expH:"<p>Offset = 3 chữ số hex cuối = 0x005 = 5. Phần còn lại 0x00804 = 2052 = 2 × 1024 + 4 → <b>PT1 = 2, PT2 = 4</b>.</p><p>Nhị phân: <code>0000000010 · 0000000100 · 000000000101</code>.</p>"});
Q({ch:4,type:"single",topic:"TLB – bảo vệ trang",sec:"s4-8",
 q:"Giả sử TLB được cho như bảng sau. Điều gì sẽ xảy ra nếu CPU cố gắng thực hiện lệnh write lên trang ảo thứ 25?",
 figH:'<table class="q-tbl"><tr><th>Valid</th><th>Virtual page</th><th>Modified</th><th>Protection</th><th>Page frame</th></tr><tr><td>1</td><td>144</td><td>1</td><td>RW</td><td>35</td></tr><tr><td>1</td><td>25</td><td>0</td><td>R X</td><td>45</td></tr><tr><td>1</td><td>130</td><td>1</td><td>RW</td><td>52</td></tr><tr><td>1</td><td>129</td><td>1</td><td>RW</td><td>55</td></tr><tr><td>1</td><td>29</td><td>0</td><td>R X</td><td>44</td></tr><tr><td>1</td><td>30</td><td>0</td><td>R X</td><td>33</td></tr><tr><td>1</td><td>890</td><td>1</td><td>RW</td><td>75</td></tr><tr><td>1</td><td>891</td><td>1</td><td>RW</td><td>15</td></tr></table>',
 opts:["Lệnh bảo vệ trang sinh ra (protection fault)","Lỗi trang xảy ra","Khung trang thứ 45 sẽ được tham chiếu","Khung trang thứ 45 sẽ được chỉnh sửa"], ans:[0],
 expH:"<p>Trang 25 có trong TLB, Valid = 1, nên <b>không phải lỗi trang</b>. Nhưng Protection = <b>R X</b>, không có quyền ghi (W). Lệnh write bị MMU chặn và sinh <b>lỗi bảo vệ</b>, khung 45 không bị sửa.</p><p><small>Trong ảnh chụp ở tài liệu, người làm bài chọn \"khung 45 sẽ được tham chiếu\". Đó là đáp án sai.</small></p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Cho 3 tiến trình như bảng. Thứ tự các tiến trình KẾT THÚC theo thuật toán lập lịch FCFS và RR (với CPU quantum = 2) là:",
 figH:'<table class="q-tbl"><tr><th>Process</th><th>Thời gian đến</th><th>Thời gian đốt cháy CPU</th></tr><tr><td>P1</td><td>0</td><td>5</td></tr><tr><td>P2</td><td>1</td><td>7</td></tr><tr><td>P3</td><td>3</td><td>4</td></tr></table>',
 opts:["FCFS: P1, P2, P3; RR: P1, P3, P2","FCFS: P1, P3, P2; RR: P1, P2, P3","FCFS: P1, P2, P3; RR: P1, P2, P3","FCFS: P1, P3, P2; RR: P1, P3, P2"], ans:[0],
 expH:"<p><b>Câu này thuộc phần Lập lịch CPU (ngoài chương 4–6).</b></p><p><b>FCFS</b>: chạy theo thứ tự đến. P1 0–5, P2 5–12, P3 12–16 → kết thúc P1, P2, P3.</p><p><b>RR, q = 2</b> (tiến trình mới đến được xếp vào hàng trước tiến trình vừa hết lượt):</p><table><tr><th>Thời gian</th><th>Chạy</th><th>Còn lại</th></tr><tr><td>0–2</td><td>P1</td><td>3</td></tr><tr><td>2–4</td><td>P2</td><td>5</td></tr><tr><td>4–6</td><td>P1</td><td>1</td></tr><tr><td>6–8</td><td>P3</td><td>2</td></tr><tr><td>8–10</td><td>P2</td><td>3</td></tr><tr><td>10–11</td><td>P1</td><td>xong</td></tr><tr><td>11–13</td><td>P3</td><td>xong</td></tr><tr><td>13–16</td><td>P2</td><td>xong</td></tr></table><p>RR kết thúc theo thứ tự <b>P1, P3, P2</b>.</p>"});
Q({ch:5,type:"single",topic:"Thiết bị block / character",sec:"s5-1",
 q:"Phát biểu nào sau đây về thiết bị Character là đúng?",
 opts:["Tất cả đều đúng","Lưu giữ thông tin theo dãy các kí tự liên tiếp","Các thao tác trên thiết bị character là put, get","Không chia thông tin thành các khối có địa chỉ"], ans:[0],
 expH:"<p>Thiết bị character (bàn phím, chuột, cổng nối tiếp) gửi / nhận một dòng ký tự liên tiếp, không chia khối, không seek được, và dùng lệnh <b>get, put</b>. Các ý đều đúng.</p><p><small>Tài liệu gốc có 2 phương án in trùng chữ; ở đây thay một phương án bằng ý tương đương để không bị trùng.</small></p>"});
Q({ch:5,type:"single",topic:"Lập lịch đĩa – SSF",sec:"s5-10",
 q:"Các yêu cầu truy xuất gửi đến hàng đợi của đĩa theo thứ tự: 71, 147, 30, 4, 124, 23, 200 và 76. Giả sử rằng đầu từ đang xuất phát ở cylinder 60. Thứ tự thực hiện sẽ như thế nào nếu thực hiện thuật toán SSF?",
 opts:["60, 71, 76, 124, 147, 200, 30, 23, 4","60, 30, 23, 4, 71, 76, 124, 147, 200","60, 71, 76, 30, 23, 4, 124, 147, 200","60, 71, 76, 124, 23, 4, 30, 147, 200"], ans:[2],
 expH:"<p>SSF luôn đi tới yêu cầu <b>gần nhất</b>: 60 → 71 (11) → 76 (5) → 30 (46, gần hơn 124 cách 48) → 23 → 4 → 124 → 147 → 200.</p>"});
Q({ch:4,type:"single",topic:"Kích thước trang",sec:"s4-6",
 q:"Khi kích thước trang (page) tăng lên thì vấn đề phân mảnh nội (internal fragmentation) sẽ ______",
 opts:["Không thay đổi","Tăng","Giảm","Không có đáp án phù hợp"], ans:[1],
 expH:"<p>Phân mảnh nội là phần phí ở trang cuối, trung bình khoảng nửa trang. Trang càng lớn thì phần phí càng lớn → <b>tăng</b>.</p>"});

/* ===== Phần 2: đề giữa kỳ (trang 6–10) ===== */
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"Shell là:",
 opts:["Một phần của Hệ Điều Hành","Một phần của hardware cần thiết để cung cấp giao tiếp với các user","Một phần của software cần thiết để cung cấp giao tiếp với các user","Một phần của firmware cần thiết để cung cấp giao tiếp với các user"], ans:[2],
 expH:"<p>Theo Tanenbaum: shell là <b>chương trình thông dịch lệnh</b>. Nó \"tuy không phải là một phần của hệ điều hành\" nhưng dùng rất nhiều dịch vụ của HĐH. Nói cách khác, shell là <b>phần mềm</b> làm giao diện giữa người dùng và HĐH.</p>"+DOC("\"Một phần của Hệ Điều Hành\"")+"<p><small>Nếu thầy cô dạy theo cách hiểu rộng (HĐH gồm cả shell) thì sẽ chấm ý đó; theo giáo trình thì chọn \"phần mềm cung cấp giao tiếp với user\".</small></p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Có 5 batch jobs từ A đến E đến máy tính trung tâm hầu như cùng một lúc. Ước tính thời gian running tương ứng là 8, 6, 2, 10 và 4 phút. Xác định thời gian chờ trung bình nếu sử dụng thuật toán lập lịch SJF. Bỏ qua thời gian chuyển đổi ngữ cảnh.",
 opts:["8 phút","14 phút","18.8 phút","6 phút"], ans:[0],
 expH:"<p>SJF chạy job ngắn trước: 2, 4, 6, 8, 10. Thời gian chờ lần lượt: 0, 2, 6, 12, 20. Trung bình = 40 ÷ 5 = <b>8 phút</b>.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Phần cứng (CMOS)",
 q:"Phát biểu nào sau đây về CMOS là KHÔNG đúng?",
 opts:["Bộ nhớ CMOS có thể lưu giữ các lệnh Assembly","Nhiều máy tính sử dụng bộ nhớ CMOS để lưu giữ ngày và giờ hiện hành","CMOS có thể thay đổi","Bộ nhớ CMOS có thể lưu giữ các tham số cấu hình của máy tính như boot từ đĩa nào"], ans:[0],
 expH:"<p>CMOS là bộ nhớ nhỏ, nuôi bằng pin, dùng để giữ <b>ngày giờ</b> và <b>tham số cấu hình</b> (ví dụ boot từ đĩa nào), và nội dung <b>thay đổi được</b>. CMOS không dùng để chứa chương trình / lệnh Assembly; chương trình khởi động nằm trong BIOS (flash ROM).</p>"});
Q({ch:0,type:"multi",topic:"Chương 2 · Tiến trình",
 q:"Phát biểu nào sau đây về tiến trình là đúng?",
 opts:["Một chương trình trên đĩa.","Một chương trình đang thực thi.","Bảng tiến trình lưu tất cả các thông tin của các tiến trình.","Mỗi tiến trình là một tập các tài nguyên như executable code, data, stack, CPU registers value, và các thông tin cần thiết khác cho việc chạy thực hiện một chương trình."], ans:[1,3],
 expH:"<ul><li>✘ Chương trình nằm trên đĩa chỉ là <b>chương trình</b> (thụ động), chưa phải tiến trình.</li><li>✔ Tiến trình là <b>chương trình đang thực thi</b>.</li><li>✘ Câu về <b>bảng tiến trình</b> nói về một cấu trúc của HĐH, không phải về bản thân tiến trình; đáp án của khoa (lặp lại ở 2 đề) không chọn ý này.</li><li>✔ Tiến trình gồm code, data, stack, giá trị thanh ghi… tức là mọi thứ cần để chạy chương trình.</li></ul>"});
Q({ch:0,type:"multi",topic:"Chương 1 · Tổng quan",
 q:"Phát biểu nào sau đây về hệ điều hành Server là đúng?",
 opts:["Server không thể cung cấp các dịch vụ in, dịch vụ file, hay dịch vụ Web.","Hệ điều hành Server chạy trên các Server là các PC, workstation, hay thậm chí các máy mainframe.","Hệ điều hành Server phục vụ nhiều user cùng một lúc thông qua network và cho phép các user chia sẻ tài nguyên phần cứng và tài nguyên phần mềm.","Các Websites sử dụng server để lưu các trang Web và xử lí các yêu cầu đến."], ans:[1,2,3],
 expH:"<p>Theo Tanenbaum (mục \"Server operating systems\"): HĐH server chạy trên máy server, có thể là PC lớn, workstation hay mainframe. Nó phục vụ nhiều người dùng qua mạng, cho chia sẻ tài nguyên, và cung cấp dịch vụ <b>in, file, Web</b>. Các website dùng server để lưu trang Web và xử lý yêu cầu.</p><p>Chỉ ý đầu sai: server chính là nơi cung cấp các dịch vụ đó.</p>"});
Q({ch:0,type:"multi",topic:"Chương 2 · Luồng (threads)",
 q:"Phát biểu nào sau đây về user threads là đúng?",
 opts:["Một thread gồm: text, data, stack.","Kernel không biết sự hiện diện của user thread.","Một gói các thread được quản lí bởi kernel.","Khối điều khiển luồng (TCB) lưu trữ trạng thái của user thread."], ans:[1,3],
 expH:"<ul><li>✘ Các luồng của một tiến trình <b>dùng chung</b> text và data; mỗi luồng chỉ có riêng stack, thanh ghi và PC.</li><li>✔ Luồng mức user do <b>thư viện</b> trong không gian user quản lý, nên kernel không biết chúng tồn tại.</li><li>✘ \"Gói thread do kernel quản lý\" là luồng mức <b>kernel</b>.</li><li>✔ Thư viện luồng giữ một bảng luồng; mỗi dòng (TCB) lưu trạng thái của một luồng (PC, stack pointer, thanh ghi…).</li></ul><p><small>Tài liệu gốc không ghi đáp án câu này.</small></p>"});
Q({ch:0,type:"single",topic:"Chương 1 · System call",
 q:"Một tiến trình đang chạy ở chế độ user và gọi một system service, nó cần phải thực hiện __________ để chuyển điều khiển sang Hệ Điều Hành.",
 opts:["Một switching","Một lời gọi hàm","Một ngắt","Một lệnh trap"], ans:[3],
 expH:"<p>Chương trình user muốn nhờ HĐH thì thực thi <b>lệnh TRAP</b>: CPU chuyển sang chế độ kernel và nhảy vào đúng chỗ HĐH định sẵn. Lời gọi hàm bình thường không đổi chế độ; ngắt là do phần cứng gây ra.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình (PCB)",
 q:"Process Control Block (PCB) không chứa ________",
 opts:["Bootstrap program","Stack","Code","Data"], ans:[0],
 expH:"<p>PCB là hồ sơ của một tiến trình (trạng thái, PC, thanh ghi, thông tin bộ nhớ chứa code / data / stack…). <b>Bootstrap program</b> là chương trình khởi động máy, chạy một lần lúc bật máy, không thuộc tiến trình nào.</p>"});

/* ===== Phần 3: đề cuối kỳ 1 (trang 10–11) ===== */
Q({ch:5,type:"multi",topic:"Thiết bị block / character",sec:"s5-1",
 q:"Phát biểu nào sau đây về thiết bị block là đúng? (Chọn nhiều hơn một câu trả lời)",
 opts:["Lưu trữ thông tin theo dãy các kí tự","Có thể đọc hoặc ghi trên từng block riêng biệt","Kích thước các block phạm vi từ 512 Bytes đến 32768 Bytes","Tất cả đều sai"], ans:[1,2],
 expH:"<p>Thiết bị block lưu theo <b>khối kích thước cố định</b>, mỗi khối có địa chỉ nên <b>đọc / ghi từng block riêng</b> được. Tanenbaum ghi kích thước block thường từ 512 đến 32768 byte (bản mới ghi tới 65536). \"Dãy các kí tự\" là thiết bị character.</p>"});
Q({ch:6,type:"single",topic:"Khái niệm file",sec:"s6-1",
 q:"________ là nhóm các record có nội dung liên quan, chứa các thông tin được sử dụng bởi các chương trình ứng dụng để tạo ra các record.",
 opts:["Directory","File","Fiel","Record Group"], ans:[1],
 expH:"<p><b>File</b> là tập hợp các record (bản ghi) có liên quan với nhau. Directory là nơi nhóm các <b>file</b> lại. (\"Fiel\" là phương án gõ sai chính tả có sẵn trong đề.)</p>"});
Q({ch:6,type:"single",topic:"Thao tác file",sec:"s6-3",
 q:"Để đọc (read) file, MS-DOS trước tiên cần thực hiện __________ open để chỉ đến đường dẫn cần tìm và đọc file vào bộ nhớ.",
 opts:["System program","System environment","System call","Tất cả đều sai"], ans:[2],
 expH:"<p>OPEN là một <b>lời gọi hệ thống (system call)</b>: HĐH tìm file theo đường dẫn và nạp thuộc tính, địa chỉ đĩa của file vào RAM để các lần READ sau tra nhanh.</p>"});
Q({ch:6,type:"multi",topic:"Khái niệm file",sec:"s6-1",
 q:"Phát biểu nào sau đây về File là đúng? (Chọn nhiều hơn một câu trả lời)",
 opts:["File là tập hợp các thông tin có liên quan mật thiết với nhau.","File bao gồm các file đặc biệt liên quan đến các thiết bị block và các thiết bị character.","File cung cấp một nơi để lưu giữ file hay cách để nhóm các file lại với nhau.","File là sự lưu trữ dữ liệu tuyệt đối trên đĩa cứng."], ans:[0,1],
 expH:"<ul><li>✔ File là tập hợp thông tin có liên quan, được đặt tên.</li><li>✔ Trong UNIX có <b>file đặc biệt</b> (special file) đại diện cho thiết bị block và thiết bị character.</li><li>✘ \"Nơi nhóm các file lại\" là định nghĩa của <b>thư mục (directory)</b>.</li><li>✘ File không nhất thiết nằm trên đĩa cứng (còn có USB, CD…), và \"tuyệt đối\" là nói quá.</li></ul><p><small>Ở một bản khác của đề, tài liệu chỉ đánh dấu ý đầu. Ý về file đặc biệt vẫn đúng theo giáo trình (UNIX có character / block special file).</small></p>"});

/* ===== Phần 4: "Đề 0" (trang 12–17) ===== */
Q({ch:0,type:"single",topic:"Chương 3 · Deadlock",
 q:"Deadlock khi xảy ra sẽ có những hậu quả như thế nào với hệ thống?",
 opts:["Hệ thống gặp phải lỗi khi có sự dừng không đúng lúc","Hệ thống bị treo không hoạt động, gây ức chế cho người sử dụng","Hệ thống bị giảm hiệu suất, lãng phí tài nguyên","Tiến trình không hoàn tất thực thi, chiếm giữ tài nguyên của hệ thống"], ans:[3],
 expH:"<p>Trong deadlock, các tiến trình liên quan chờ nhau mãi: chúng <b>không bao giờ chạy xong</b> nhưng vẫn <b>giữ tài nguyên</b>, khiến tiến trình khác cũng không dùng được. Hệ thống không nhất thiết treo toàn bộ; chỉ nhóm tiến trình đó bị kẹt.</p>"});
Q({ch:4,type:"single",topic:"First / Best / Worst fit",sec:"s4-5",
 q:"Giả sử bộ nhớ chính được phân vùng có kích thước theo thứ tự là 600K, 500K, 200K, 300K. Các tiến trình theo thứ tự yêu cầu cấp phát có kích thước 212K, 417K, 112K, 426K. Nếu sử dụng thuật toán Best-fit, quá trình cấp phát bộ nhớ sẽ như thế nào?",
 opts:["212K→300K, 417K→500K, 112K→200K, 426K→300K","212K→600K, 417K→500K, 112K→300K, 426K→200K","212K→600K, 417K→500K, 112K→200K, 426K→300K","Không câu nào đúng."], ans:[3],
 expH:"<p>Best-fit chọn vùng <b>vừa nhất</b>: 212K → 300K, 417K → 500K, 112K → 200K, 426K → <b>600K</b>. Không phương án nào ghi 426K → 600K (vùng 300K đã dùng và cũng không đủ chỗ cho 426K), nên chọn <b>\"Không câu nào đúng\"</b>.</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Windows",
 q:"Hệ điều hành Windows sử dụng giao diện nào để người dùng giao tiếp với máy tính?",
 opts:["GUIDE","CU","GUI","PCB"], ans:[2],
 expH:"<p>Windows dùng <b>GUI</b> (Graphical User Interface – giao diện đồ họa): cửa sổ, biểu tượng, chuột. PCB là khối điều khiển tiến trình.</p>"});
Q({ch:4,type:"single",topic:"First / Best / Worst fit",sec:"s4-5",
 q:"Giả sử một hệ thống quản lý bộ nhớ đa chương có các vùng nhớ trống như sau: 10, 15, 4, 18, 7, 9, 13 và 20. Một tiến trình cần đoạn bộ nhớ với dung lượng là 12. Nếu theo best fit thì vùng nhớ cấp phát cho tiến trình là:",
 opts:["18","13","20","15"], ans:[1],
 expH:"<p>Các vùng đủ chỗ (≥ 12): 15, 18, 13, 20. Best fit chọn vùng nhỏ nhất trong số đó → <b>13</b> (chỉ thừa 1).</p>"});
Q({ch:4,type:"single",topic:"First / Best / Worst fit",sec:"s4-5",
 q:"Với các vùng nhớ trống 10, 15, 4, 18, 7, 9, 13 và 20. Một tiến trình cần đoạn bộ nhớ với dung lượng là 14. Nếu theo best fit thì vùng nhớ cấp phát cho tiến trình là:",
 opts:["10","13","15","20"], ans:[2],
 expH:"<p>Các vùng ≥ 14: 15, 18, 20. Nhỏ nhất là <b>15</b>. Vùng 13 không đủ.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình",
 q:"Khi nào tiến trình sẽ nhận trạng thái Blocked?",
 opts:["Tiến trình phải đợi sự kiện xảy ra","Khi hệ thống không đáp ứng đủ tài nguyên","Khi hệ thống không đáp ứng những yêu cầu của tiến trình","Khi hệ thống không đáp ứng CPU dành cho nó"], ans:[0],
 expH:"<p>Tiến trình chuyển sang <b>Blocked</b> khi nó không thể chạy tiếp cho tới khi <b>một sự kiện xảy ra</b> (ví dụ đọc đĩa xong, có dữ liệu từ bàn phím). Nếu chỉ vì chưa được cấp CPU thì tiến trình ở trạng thái <b>Ready</b>, không phải Blocked.</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Windows",
 q:"Trong Windows, thành phần nào cho ta biết hiệu suất của CPU?",
 opts:["Control Panel","Task Manager","Event Viewer","System Information"], ans:[1],
 expH:"<p><b>Task Manager</b> (Ctrl + Shift + Esc), tab Performance, hiển thị mức sử dụng CPU, RAM, đĩa, mạng theo thời gian thực.</p>"});
Q({ch:4,type:"single",topic:"Phân trang – số khung",sec:"s4-6",
 q:"Có bộ nhớ có kích thước là 526MB, kích thước 1 frame là 52,6MB; ta có thể phân bộ nhớ thành bao nhiêu frame?",
 opts:["11","10","12","9"], ans:[1],
 expH:"<p>Số khung = 526 ÷ 52,6 = <b>10</b>.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Cho các tiến trình với (thời điểm đến T0, thời gian chạy T1) như sau: P1(0,7); P2(5,6); P3(7,10); P4(2,3). Tiến trình nào được thực thi đầu tiên với FIFO?",
 opts:["P1","P2","P3","P4"], ans:[0],
 expH:"<p>FIFO chạy theo thứ tự đến. P1 đến lúc 0, sớm nhất → chạy đầu tiên. Thứ tự đầy đủ: P1 → P4 → P2 → P3.</p>"});
Q({ch:4,type:"single",topic:"Phân đoạn – kiểm tra địa chỉ",sec:"s4-12",
 q:"Cho bảng phân đoạn với các giá trị (base, limit) như sau: S1(200, 500); S2(834, 540); S3(100, 100); S4(1230, 700); S5(3400, 250); S6(6000, 340). Địa chỉ nào không hợp lệ trong các địa chỉ (1,550); (4,700); (6,400)?",
 opts:["(6,400); (4,700)","Các địa chỉ đều không hợp lệ","(4,700); (1,550)","(1,550); (6,400)"], ans:[1],
 expH:"<p>Địa chỉ (s, d) hợp lệ khi <b>0 ≤ d &lt; limit</b> của đoạn s (offset tính từ 0 nên phải nhỏ hơn hẳn limit).</p><ul><li>(1, 550): limit S1 = 500, 550 ≥ 500 → không hợp lệ.</li><li>(4, 700): limit S4 = 700, offset 700 đã ra ngoài đoạn (đoạn chỉ có offset 0–699) → không hợp lệ.</li><li>(6, 400): limit S6 = 340 → không hợp lệ.</li></ul><p>Cả ba đều không hợp lệ.</p>"+DOC("\"(1,550); (6,400)\" — cách chấm đó coi offset = limit là hợp lệ, trái với quy tắc offset &lt; limit")});
Q({ch:4,type:"single",topic:"Phân đoạn – kiểm tra địa chỉ",sec:"s4-12",
 q:"Cho bảng phân đoạn S1(200, 500); S2(834, 540); S3(100, 100); S4(1230, 700); S5(3400, 250); S6(6000, 340). Kiểm tra tính hợp lệ của địa chỉ ảo (2, 340).",
 opts:["Hợp lệ","Không hợp lệ","Địa chỉ chưa chuyển đổi","Địa chỉ không chính xác"], ans:[0],
 expH:"<p>Đoạn 2 có limit 540. Offset 340 &lt; 540 → <b>hợp lệ</b>. Địa chỉ vật lý = base + offset = 834 + 340 = 1174.</p>"});
Q({ch:4,type:"single",topic:"Phân đoạn – kiểm tra địa chỉ",sec:"s4-12",
 q:"Cho bảng phân đoạn S1(200, 500); S2(834, 540); S3(100, 100); S4(1230, 700); S5(3400, 250); S6(6000, 340). Địa chỉ (5, 300) có hợp lệ không?",
 opts:["Có","Không","Đây không phải là vùng lưu trữ hợp lệ","Chưa xác định"], ans:[1],
 expH:"<p>Đoạn 5 có limit <b>250</b>. Offset 300 ≥ 250 → vượt chiều dài đoạn → <b>không hợp lệ</b> (sinh lỗi, trap về HĐH).</p>"+DOC("\"Có\" — sai, vì 300 > 250")});
Q({ch:4,type:"single",topic:"Phân đoạn – cấp phát",sec:"s4-12",
 q:"Cho bảng phân đoạn S1(200, 500); S2(834, 540); S3(100, 100); S4(1230, 700); S5(3400, 250); S6(6000, 340). Đoạn nào sẽ phù hợp với yêu cầu của tiến trình P1(450)?",
 opts:["S1","S3","S2","S4"], ans:[0],
 expH:"<p>Cần đoạn có kích thước (limit) ≥ 450: S1 (500), S2 (540), S4 (700). Chọn đoạn <b>vừa nhất</b> (ít thừa nhất) là <b>S1</b>, thừa 50. S3 chỉ có 100, không đủ.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình",
 q:"Mô hình đa tiến trình giúp ích gì cho hệ thống?",
 opts:["Giúp các tiến trình đồng bộ hóa","Giúp tăng hiệu suất của CPU","Giúp thực hiện được nhiều tiến trình hơn","Giúp giải quyết Deadlock"], ans:[1],
 expH:"<p>Đa chương / đa tiến trình: khi một tiến trình chờ I/O thì CPU chuyển sang chạy tiến trình khác, không để CPU rảnh. Nhờ vậy <b>tăng hiệu suất sử dụng CPU</b>.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Deadlock (Banker)",
 q:"Cho Need(P2) = (1, 0, 1), Available = (3, 4, 3). Yêu cầu của P2 có hợp lệ (đáp ứng được) không?",
 opts:["Có thể không hợp lệ","Có","Có thể gây Deadlock","Không"], ans:[1],
 expH:"<p>So từng thành phần: Need = (1, 0, 1) ≤ Available = (3, 4, 3) → tài nguyên hiện có <b>đủ</b> để đáp ứng P2.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Định thời theo độ ưu tiên có thể xử lý theo những cách nào?",
 opts:["Độc quyền và phối hợp","Độc quyền và không độc quyền","Độc quyền","Không độc quyền"], ans:[1],
 expH:"<p>Lập lịch theo ưu tiên có 2 dạng:</p><ul><li><b>Độc quyền</b> (non-preemptive): tiến trình chạy tới khi tự nhả CPU.</li><li><b>Không độc quyền</b> (preemptive): tiến trình ưu tiên cao hơn đến thì giành CPU ngay.</li></ul>"});
Q({ch:0,type:"single",topic:"Thực hành · Windows",
 q:"Trong Hệ điều hành Windows, để kết thúc một chương trình ta có thể thực hiện:",
 opts:["Shift + F4","Alt + F4","Ctrl + F4","Fn + F4"], ans:[1],
 expH:"<p><b>Alt + F4</b> đóng cửa sổ / chương trình đang hoạt động. Ctrl + F4 chỉ đóng tab hoặc tài liệu con bên trong chương trình.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (semaphore)",
 q:"Có 2 tiến trình P1, P2. Tiến trình P1 đã ở trong miền găng. Cấu trúc của P2 sẽ nhận hàm nào nếu nó sử dụng giải thuật Semaphore để tiến hành đồng bộ?",
 opts:["Up(s)","Sleep","Wakeup","Down(s)"], ans:[3],
 expH:"<p>Muốn vào miền găng, P2 gọi <b>Down(s)</b> (P / wait). Vì P1 đang giữ nên s = 0, P2 bị khóa trong Down cho tới khi P1 ra khỏi miền găng và gọi Up(s).</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Deadlock (Banker)",
 q:"Max P1(10,7,10); Max P2(4,7,5); Max P3(4,2,4); Allocation P1(1,1,1); Allocation P2(3,7,3); Allocation P3(2,0,0); Available(7,5,6). Hệ thống có an toàn không?",
 opts:["Có khả năng có Deadlock","Có","Cần tính toán lại việc cấp phát","Không"], ans:[1],
 expH:"<p>Need = Max − Allocation: P1 = (9,6,9), P2 = (1,0,2), P3 = (2,2,4).</p><ol><li>Available (7,5,6) ≥ Need P2 → P2 chạy xong, trả (3,7,3) → Available = (10,12,9).</li><li>≥ Need P3 → P3 xong, trả (2,0,0) → (12,12,9).</li><li>≥ Need P1 (9,6,9) → P1 xong.</li></ol><p>Có chuỗi an toàn <b>P2 → P3 → P1</b>, nên hệ thống <b>an toàn</b>.</p><p><small>Tài liệu gốc không ghi đáp án câu này.</small></p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Thời gian chờ đợi của giải thuật định thời dài hay ngắn sẽ do yếu tố nào quyết định?",
 opts:["Giải thuật sử dụng, loại điều phối","Giải thuật sử dụng, thời gian T1 (thời gian chạy) của tiến trình","Thời gian T1 của tiến trình, thứ tự của tiến trình","Thời gian T1 của tiến trình, điều phối độc quyền"], ans:[1],
 expH:"<p>Thời gian chờ phụ thuộc vào <b>thuật toán</b> (FCFS, SJF, RR… sắp thứ tự khác nhau) và <b>thời gian chạy</b> của các tiến trình (tiến trình dài chạy trước thì những tiến trình sau phải chờ lâu).</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Ta có các tiến trình với bộ dữ liệu (T0, T1) như sau: P1(0,10); P2(3,20); P3(10,7); P4(11,1); P5(16,7). Theo SJF, thời gian chờ đợi của P3 là:",
 opts:["0","2","1","3"], ans:[0],
 expH:"<p>SJF độc quyền: P1 chạy 0–10. Lúc 10, hàng đợi có P2 (20) và P3 (7) vừa đến → chọn P3, chạy 10–17. P3 đến lúc 10 và chạy ngay lúc 10 → thời gian chờ = <b>0</b>.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Giải thuật Peterson là giải thuật kết hợp của 2 giải thuật nào?",
 opts:["1 và Semaphore","Không đáp án nào đúng","1 và 2","2 và Semaphore"], ans:[2],
 expH:"<p>Trong bài giảng, <b>giải thuật 1</b> dùng biến <code>turn</code> (luân phiên), <b>giải thuật 2</b> dùng mảng <code>flag[]</code> (báo muốn vào). Peterson kết hợp cả hai: đặt <code>flag[i] = true</code> rồi nhường <code>turn = j</code>, chỉ chờ khi bên kia cũng muốn vào và đang tới lượt bên kia.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Độ ưu tiên của tiến trình sẽ do thành phần nào sau đây cấp phát và thay đổi?",
 opts:["Hệ thống","Giải thuật","Hệ điều hành","CPU"], ans:[2],
 expH:"<p>Độ ưu tiên là một con số lưu trong PCB, do <b>hệ điều hành</b> (bộ lập lịch) gán và điều chỉnh (ví dụ tăng dần theo thời gian chờ – aging). CPU chỉ thực thi lệnh, không quyết định ưu tiên.</p>"+DOC("\"CPU\" — cách hiểu này không đúng với giáo trình")});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Ta có các tiến trình với bộ dữ liệu (T0, T1) như sau: P1(0,10); P2(3,20); P3(10,7); P4(11,1); P5(16,7). Nếu theo RR với q = 5, tiến trình nào có số vòng quay nhiều nhất?",
 opts:["P2","P3","P1","P4"], ans:[0],
 expH:"<p>Số lượt cần ≈ thời gian chạy ÷ q: P2 = 20 ÷ 5 = <b>4 lượt</b>, P1 = 2, P3 = 2, P5 = 2, P4 = 1. P2 có thời gian chạy dài nhất nên quay nhiều vòng nhất.</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Windows",
 q:"Tổ hợp phím tắt nào để chuyển đổi giữa các cửa sổ trong Windows?",
 opts:["Alt + Enter","Ctrl + Enter","Ctrl + Del","Alt + Tab"], ans:[3],
 expH:"<p><b>Alt + Tab</b> chuyển qua lại giữa các cửa sổ đang mở.</p>"});

/* ===== Phần 5: đề giữa kỳ – thực hành Linux / Windows và lý thuyết (trang 22–40) ===== */
var TREE = '<pre class="q-pre">/\n|-- home\n|   `-- userx\n|       |-- Pictures\n|       |   |-- Dog\n|       |   `-- Cat\n|       `-- Documents\n`-- var</pre>';
Q({ch:6,type:"multi",topic:"Đường dẫn",sec:"s6-4",
 q:"Trong Linux, ta có cây thư mục như hình. Nếu hiện tại đang ở đường dẫn /home/userx/Pictures/Cat, muốn thay đổi đường dẫn sang thư mục Dog thì câu lệnh nào sau đây có thể sử dụng? Chọn tất cả các câu lệnh đúng.",
 figH:TREE, opts:["cd ~/Pictures/Dog","cd ../Dog","cd /home/userx/Pictures/Dog","cd /Pictures/Dog"], ans:[0,1,2],
 expH:"<p>Ba lệnh đầu đúng: <code>~</code> là thư mục nhà /home/userx; <code>..</code> lùi lên Pictures; đường dẫn tuyệt đối đầy đủ. <code>cd /Pictures/Dog</code> sai vì dấu <code>/</code> ở đầu tìm từ gốc, mà dưới gốc không có Pictures.</p>"});
Q({ch:0,type:"multi",topic:"Thực hành · Linux",
 q:"Trong Bash, sử dụng câu lệnh nào sau đây để xem danh sách tất cả các tập tin trong thư mục /home? Chọn tất cả các câu trả lời đúng.",
 opts:["ls -la /home","ls -l -a /home","list -a /home","ls -ls ~"], ans:[0,1],
 expH:"<p><code>-a</code> hiện cả file ẩn (bắt đầu bằng dấu chấm), <code>-l</code> hiện chi tiết. <code>-la</code> và <code>-l -a</code> là một. <code>list</code> không phải lệnh Linux; <code>~</code> là thư mục nhà, không phải /home.</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Linux",
 q:"Trong Bash, sử dụng câu lệnh nào sau đây để xóa thư mục tên \"Operating System\"?",
 opts:["rm -r Operating\\ System","rm Operating\\ System","rm -r Operating System","rm Operating System"], ans:[0],
 expH:"<p>Xóa thư mục cần <code>-r</code>, và tên có dấu cách phải thoát bằng <code>\\</code> (hoặc để trong ngoặc kép). Không thoát thì Bash hiểu thành 2 tên \"Operating\" và \"System\".</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Windows",
 q:"Các tiến trình trong Windows có thể hoạt động độc lập với tiến trình cha của nó.",
 opts:["Đúng","Sai"], ans:[0],
 expH:"<p>Windows không có cây tiến trình chặt như UNIX: tiến trình con không bị gắn với cha. Cha kết thúc thì con vẫn chạy bình thường.</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Windows",
 q:"Trong PowerShell, câu lệnh nào trả về tiến trình đang sử dụng nhiều tài nguyên CPU nhất trong hệ thống?",
 opts:["Get-Process | Sort CPU -descending | Select -first 1 -Property ID,ProcessName,CPU","Get-Process | Sort RAM -descending | Select -first 1 -Property ID,ProcessName,CPU","cpu_usage.exe | top -1","Không phải những này"], ans:[0],
 expH:"<p>Lấy danh sách tiến trình (<code>Get-Process</code>), sắp giảm dần theo cột <b>CPU</b>, rồi lấy dòng đầu. Phương án thứ hai sắp theo RAM, không theo CPU.</p>"});
Q({ch:0,type:"multi",topic:"Thực hành · Windows",
 q:"Nguyên nhân nào có thể dẫn đến việc máy tính của bạn chạy chậm?",
 opts:["Mức sử dụng CPU cao","Nhiều hoạt động của I/O","Mức sử dụng RAM cao","Quá nhiều tiến trình đang chạy"], ans:[0,1,2,3],
 expH:"<p>Cả bốn đều làm máy chậm: CPU bận, đĩa / mạng bận (tiến trình phải chờ I/O), RAM đầy (phải swap / nhiều lỗi trang), và quá nhiều tiến trình tranh nhau tài nguyên.</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Linux",
 q:"Trong Linux, câu lệnh nào để hủy một tiến trình AN TOÀN với PID là 1010?",
 opts:["kill 1010","kill -KILL 1010","kill -TSTP 1010","kill -CONT 1010"], ans:[0],
 expH:"<p><code>kill 1010</code> gửi tín hiệu mặc định <b>SIGTERM</b>: yêu cầu tiến trình kết thúc, cho nó cơ hội dọn dẹp (đóng file, lưu dữ liệu). <code>-KILL</code> giết ngay không cho dọn dẹp; <code>-TSTP</code> tạm dừng; <code>-CONT</code> cho chạy tiếp.</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Linux",
 q:"Trong Linux, câu lệnh nào dùng để hủy HOÀN TOÀN một tiến trình với PID là 1010?",
 opts:["kill -KILL 1010","kill 1010","kill -TSTP 1010","kill -CONT 1010"], ans:[0],
 expH:"<p><code>kill -KILL</code> (SIGKILL, số 9) không thể bị bắt hay bỏ qua: kernel kết thúc tiến trình ngay lập tức.</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Linux",
 q:"Trong Linux, câu lệnh nào được dùng để tạm ngừng một tiến trình có PID là 1010?",
 opts:["kill -TSTP 1010","kill 1010","kill -KILL 1010","kill -CONT 1010"], ans:[0],
 expH:"<p><b>SIGTSTP</b> tạm dừng tiến trình (giống bấm Ctrl + Z). Muốn chạy tiếp thì gửi <code>kill -CONT</code>.</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Windows",
 q:"Trong hệ điều hành Windows, công cụ nào sau đây được sử dụng để thu thập thông tin về các tiến trình đang chạy?",
 opts:["Task Manager","Sử dụng câu lệnh tasklist trong cmd (command prompt)","Sử dụng câu lệnh Get-Process trong PowerShell prompt","Tất cả 3 cách"], ans:[3],
 expH:"<p>Cả ba đều liệt kê được tiến trình: Task Manager (giao diện), <code>tasklist</code> (cmd), <code>Get-Process</code> (PowerShell).</p>"});
Q({ch:0,type:"single",topic:"Thực hành · Windows",
 q:"Nếu bạn khởi động lại một tiến trình bằng tiện ích Process Explorer, tiến trình cha của tiến trình bạn vừa khởi động lại là?",
 opts:["Process Explorer","cmd.exe","windows.exe","momanddad.exe"], ans:[0],
 expH:"<p>Khi \"Restart\", chính Process Explorer tạo lại tiến trình đó, nên nó trở thành <b>tiến trình cha</b> của tiến trình mới.</p>"});
Q({ch:0,type:"multi",topic:"Chương 1 · Tổng quan",
 q:"3 mục đích chính của hệ điều hành là gì?",
 opts:["Phân bổ tài nguyên máy tính riêng biệt khi cần thiết để giải quyết vấn đề được đưa ra. Quá trình phân bổ phải công bằng và hiệu quả nhất có thể.","Cung cấp môi trường cho người dùng máy tính thực thi các chương trình trên phần cứng máy tính một cách thuận tiện và hiệu quả.","Hệ điều hành là một chương trình điều khiển phục vụ 2 chức năng chính: (1) giám sát việc thực thi các chương trình của người dùng để ngăn ngừa lỗi và việc sử dụng máy tính không đúng cách; và (2) quản lý hoạt động và điều khiển các thiết bị I/O.","Cung cấp các công cụ, phần mềm giúp hỗ trợ việc người dùng truy cập và thực hiện tìm kiếm thông tin trên mạng Internet.","Làm ẩn đi các chi tiết phần cứng, người dùng được cung cấp một giao diện đơn giản, dễ hiểu, dễ sử dụng và không phụ thuộc vào các thiết bị phần cứng cụ thể.","Cung ứng một hệ thống lệnh cơ bản để điều hành máy tính trong trường hợp không có một hệ thống giao diện, các lệnh này gọi là lệnh hệ thống."], ans:[0,1,2],
 expH:"<p>Theo Silberschatz, 3 mục đích là: <b>cấp phát tài nguyên</b> công bằng, hiệu quả; tạo <b>môi trường thuận tiện</b> để chạy chương trình; và là <b>chương trình điều khiển</b> (giám sát chương trình, điều khiển thiết bị I/O).</p><p>Duyệt web không phải mục đích của HĐH. Ý \"che giấu phần cứng\" là đúng về HĐH nhưng nằm trong ý \"môi trường thuận tiện\", không phải 1 trong 3 mục đích theo đáp án.</p>"});
Q({ch:0,type:"multi",topic:"Chương 1 · Chế độ kernel",
 q:"Chỉ lệnh nào sau đây nên được ưu tiên (privileged – chỉ chạy ở chế độ kernel)?",
 opts:["Đặt giá trị của bộ hẹn giờ","Xóa bộ nhớ","Tắt ngắt","Sửa đổi các mục trong bảng trạng thái thiết bị","Truy cập thiết bị I/O","Đọc thông tin đồng hồ","Thực thi một lệnh bẫy (trap instruction)","Chuyển từ chế độ người dùng (user mode) sang chế độ nhân (kernel mode)"], ans:[0,1,2,3,4],
 expH:"<p>Lệnh nào để chương trình user tự làm sẽ phá hệ thống thì phải là lệnh đặc quyền: đặt timer (chiếm CPU mãi), xóa bộ nhớ, tắt ngắt, sửa bảng thiết bị, truy cập I/O trực tiếp.</p><p>Đọc đồng hồ thì vô hại. Lệnh trap là cách <b>hợp lệ</b> để user nhờ kernel, nên user phải được gọi. Còn \"chuyển sang kernel mode\" chỉ xảy ra <b>thông qua</b> trap, không có lệnh user nào tự đổi chế độ.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"Hệ điều hành nguồn mở được bảo mật hơn vì mọi người đều có thể truy cập mã code của nó: bất kỳ ai cũng có thể sửa lỗi khi tìm thấy, và người dùng không phải đợi bản phát hành tiếp theo. Các phân tích liên tục của một cộng đồng lớn đã tạo ra mã code an toàn và ổn định cho HĐH nguồn mở.",
 opts:["Đúng","Sai"], ans:[0],
 expH:"<p>Đây là lập luận ủng hộ nguồn mở mà tài liệu chấm là <b>Đúng</b>: nhiều người cùng xem mã thì lỗi được phát hiện và sửa nhanh.</p><p><small>Thực tế đây là vấn đề còn tranh luận (kẻ tấn công cũng đọc được mã). Theo đáp án của đề thì chọn Đúng.</small></p>"});
Q({ch:0,type:"single",topic:"Chương 1 · System call",
 q:"Mục đích của lời gọi hệ thống (system calls): System calls cho phép các tiến trình người dùng (user-level processes) yêu cầu các dịch vụ của hệ điều hành.",
 opts:["Đúng","Sai"], ans:[0],
 expH:"<p>Đúng. System call là <b>giao diện</b> giữa chương trình user và HĐH: muốn đọc file, tạo tiến trình, cấp phát bộ nhớ… đều phải gọi qua system call.</p>"});
Q({ch:0,type:"multi",topic:"Chương 2 · Tiến trình",
 q:"5 hoạt động chính của hệ điều hành liên quan đến quản lý tiến trình là gì?",
 opts:["Tạo và xóa cả tiến trình người dùng và tiến trình hệ thống","Tạm dừng và tiếp tục các tiến trình","Cung cấp cơ chế đồng bộ hóa tiến trình","Cung cấp cơ chế giao tiếp giữa các tiến trình","Cung cấp cơ chế xử lý deadlock","Quyết định tiến trình nào sẽ được đưa vào bộ nhớ khi không gian bộ nhớ có chỗ trống","Tạo và quản lý luồng (threads) của tiến trình","Theo dõi tình trạng cha con của các tiến trình để hủy các tiến trình con tương ứng khi tiến trình cha bị hủy"], ans:[0,1,2,3,4],
 expH:"<p>Theo Silberschatz, 5 hoạt động quản lý tiến trình: <b>tạo / xóa</b>, <b>tạm dừng / tiếp tục</b>, cơ chế <b>đồng bộ</b>, cơ chế <b>giao tiếp</b>, cơ chế xử lý <b>deadlock</b>. \"Đưa tiến trình nào vào bộ nhớ\" thuộc quản lý <b>bộ nhớ</b>.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình (fork)",
 q:"Chạy đoạn code sau trong Ubuntu, kết quả xuất ra màn hình ở dòng /* LINE X */ như thế nào?",
 figH:CODE("#include <sys/types.h>\n#include <stdio.h>\n#include <unistd.h>\nint value = 16;\nint main() {\n    pid_t pid;\n    pid = fork();\n    if (pid == 0) {          /* child process */\n        value += 4;\n        return 0;\n    } else if (pid > 0) {    /* parent process */\n        wait(NULL);\n        printf(\"PARENT: value = %d\", value);  /* LINE X */\n        return 0;\n    }\n}"),
 opts:["PARENT: value = 16","PARENT: value = 20","PARENT: value = 4","PARENT: value = 0"], ans:[0],
 expH:"<p><code>fork()</code> tạo tiến trình con với <b>bản sao riêng</b> của bộ nhớ cha. Con cộng 4 vào <b>bản của nó</b> (thành 20), còn biến <code>value</code> của cha vẫn là <b>16</b>. Cha chờ con xong rồi in 16.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình (fork)",
 q:"Chạy đoạn chương trình sau trên Ubuntu, có bao nhiêu tiến trình được tạo ra từ chương trình này, BAO GỒM cả tiến trình cha ban đầu?",
 figH:CODE("#include <stdio.h>\n#include <unistd.h>\nint main() {\n    fork();   /* fork a child process */\n    fork();   /* fork another child process */\n    fork();   /* and fork another */\n    return 0;\n}"),
 opts:["8","3","4","7"], ans:[0],
 expH:"<p>Mỗi <code>fork()</code> nhân đôi số tiến trình: 1 → 2 → 4 → 8. Tính cả cha ban đầu là <b>8</b> (2<sup>3</sup>); số tiến trình mới là 7.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình (fork)",
 q:"Khi một tiến trình tạo một tiến trình mới sử dụng lệnh fork() thì trạng thái nào sau đây được chia sẻ giữa tiến trình cha và tiến trình con?",
 opts:["Stack","Heap","Phân đoạn bộ nhớ chia sẻ (dùng chung)"], ans:[2],
 expH:"<p>Sau fork, con nhận <b>bản sao</b> stack và heap của cha; hai bên sửa không ảnh hưởng nhau. Chỉ vùng <b>bộ nhớ chia sẻ</b> (shared memory segment) là cả hai cùng thấy chung.</p>"});
Q({ch:0,type:"multi",topic:"Chương 2 · Luồng (threads)",
 q:"Thành phần nào sau đây của trạng thái chương trình được chia sẻ trên các luồng của một tiến trình đa luồng?",
 opts:["Bộ nhớ heap (Heap memory)","Biến toàn cục","Bộ nhớ Stack (Stack memory)","Giá trị thanh ghi (Register values)"], ans:[0,1],
 expH:"<p>Các luồng dùng chung không gian địa chỉ của tiến trình: <b>heap</b> và <b>biến toàn cục</b>. Mỗi luồng có riêng <b>stack</b> và <b>thanh ghi</b> (kể cả PC), vì mỗi luồng chạy tới một chỗ khác nhau.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Luồng (threads)",
 q:"Xét đoạn code sau. Bao nhiêu luồng (threads) riêng biệt được tạo ra?",
 figH:CODE("pid_t pid;\npid = fork();\nif (pid == 0) {   /* child process */\n    fork();\n    thread_create(...);\n}\nfork();"),
 opts:["2","1","3","4"], ans:[0],
 expH:"<p><code>thread_create</code> chỉ chạy trong khối <code>if (pid == 0)</code>. Sau <code>fork()</code> đầu tiên có 1 con; con đó gọi <code>fork()</code> nữa → có <b>2 tiến trình</b> chạy vào khối này. Mỗi tiến trình gọi <code>thread_create</code> một lần → <b>2 luồng</b> mới.</p><p>Lệnh <code>fork()</code> cuối nằm sau khối if nên không tạo thêm luồng nào.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Luồng (OpenMP)",
 q:"Cho đoạn code trong OpenMP sau, sau khi thực thi chương trình thì sẽ cho kết quả như thế nào?",
 figH:CODE("#include <omp.h>\n#include <stdio.h>\nint main(int argc, char *argv[]) {\n    /* sequential code */\n    #pragma omp parallel\n    {\n        printf(\"I am a parallel region.\");\n    }\n    /* sequential code */\n    return 0;\n}"),
 opts:["Xuất ra số lượng câu \"I am a parallel region.\" bằng với số lượng core của CPU","Xuất ra số lượng câu \"I am a parallel region.\" bằng với số lượng luồng của CPU","Xuất ra đúng 1 lần \"I am a parallel region.\"","Không hiển thị gì hết."], ans:[0],
 expH:"<p><code>#pragma omp parallel</code> tạo một nhóm luồng; <b>mỗi luồng</b> chạy khối lệnh bên trong một lần. Mặc định số luồng bằng <b>số core (bộ xử lý logic)</b> của máy, nên câu được in bấy nhiêu lần.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Đoạn code mà trong đó tiến trình có thể thay đổi biến dùng chung, ghi vào tập tin thì được gọi là ________",
 opts:["Critical section","Race condition","Chương trình (program)","Đồng bộ (synchronizing)"], ans:[0],
 expH:"<p><b>Critical section (miền găng)</b> là đoạn code truy cập dữ liệu dùng chung. Race condition là <b>hiện tượng</b> kết quả sai khi nhiều tiến trình cùng vào miền găng.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (semaphore)",
 q:"Semaphore là một ________ được sử dụng để giải quyết vấn đề critical section.",
 opts:["phần cứng của hệ thống","chương trình đặc biệt của hệ thống","biến số nguyên","Không ý nào đúng"], ans:[2],
 expH:"<p>Semaphore là một <b>biến nguyên</b>, chỉ được truy cập qua hai thao tác nguyên tử: down (P / wait) và up (V / signal).</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (semaphore)",
 q:"Đâu là 2 loại của semaphore?",
 opts:["binary và counting","mutex và counting","counting và decimal","binary và decimal"], ans:[0],
 expH:"<p><b>Binary semaphore</b> (chỉ 0 / 1, dùng như mutex) và <b>counting semaphore</b> (đếm số tài nguyên còn trống).</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (bài toán kinh điển)",
 q:"Bài toán bữa tối của các triết gia được mô tả gồm:",
 opts:["5 ông triết gia và 5 chiếc đũa","6 ông triết gia và 5 chiếc đũa","5 ông triết gia và 5 đôi đũa","3 ông triết gia và 5 chiếc đũa"], ans:[0],
 expH:"<p>5 triết gia ngồi quanh bàn tròn, giữa mỗi hai người có <b>1 chiếc</b> đũa, tổng 5 chiếc. Muốn ăn phải cầm được cả 2 chiếc hai bên, nên dễ sinh deadlock và starvation.</p>"});
Q({ch:0,type:"multi",topic:"Chương 2 · Lập lịch CPU",
 q:"Thuật toán lập lịch nào mà CPU cấp phát cho những tiến trình yêu cầu CPU đầu tiên?",
 opts:["FCFS","SJF","RR","Không phải những thuật toán này","FIFO"], ans:[0,4],
 expH:"<p><b>FCFS</b> (First Come First Served) phục vụ tiến trình đến trước. <b>FIFO</b> là tên gọi khác của cùng ý tưởng (hàng đợi vào trước ra trước), nên cả hai đều đúng.</p><p><small>Tài liệu gốc chỉ đánh dấu FCFS.</small></p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Trong thuật toán lập lịch ưu tiên thì ________",
 opts:["CPU được cấp phát cho tiến trình có độ ưu tiên cao nhất","CPU được cấp phát cho tiến trình có độ ưu tiên thấp nhất","Những tiến trình có độ ưu tiên bằng nhau thì không thể lập lịch","Không có ý nào đúng"], ans:[0],
 expH:"<p>Bộ lập lịch chọn tiến trình có <b>độ ưu tiên cao nhất</b>. Tiến trình bằng ưu tiên thì xử lý theo FCFS hoặc RR.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Trường hợp nào sau đây lập lịch không ưu tiên (non-preemptive scheduling) xảy ra?",
 opts:["Khi một tiến trình chuyển từ trạng thái running sang trạng thái waiting","Khi một tiến trình chuyển từ trạng thái running sang trạng thái ready","Khi một tiến trình chuyển từ trạng thái waiting sang trạng thái ready","Không có ý nào đúng"], ans:[0],
 expH:"<p>Non-preemptive: CPU chỉ đổi tiến trình khi tiến trình đang chạy <b>tự nhả</b> CPU, tức là chuyển sang waiting (chờ I/O) hoặc kết thúc. Running → ready và waiting → ready là các trường hợp tiến trình <b>bị giành</b> CPU (preemptive).</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Thuật toán lập lịch Round Robin thuộc loại ________",
 opts:["Preemptive scheduling","Non-preemptive scheduling","Cả preemptive scheduling và non-preemptive scheduling","Không thuộc preemptive scheduling lẫn non-preemptive scheduling"], ans:[0],
 expH:"<p>RR <b>giành lại CPU</b> khi hết quantum dù tiến trình chưa xong, nên là <b>preemptive</b>.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Phần cứng (thanh ghi)",
 q:"Một thanh ghi đặc biệt chứa địa chỉ của câu lệnh tiếp theo được nạp là gì?",
 opts:["Bộ đếm chương trình (program counter)","Thanh ghi câu lệnh IR (instruction register)","Thanh ghi trạng thái chương trình (Program Status Word)","Câu trả lời khác, không phải những cái này"], ans:[0],
 expH:"<p><b>PC</b> chứa địa chỉ lệnh sẽ nạp tiếp. IR chứa lệnh <b>đang</b> thực hiện; PSW chứa các bit trạng thái (chế độ user / kernel, cờ điều kiện…).</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"Vị trí của hệ điều hành trong 1 hệ thống máy tính là gì?",
 opts:["Trên phần cứng, dưới chương trình giao diện người dùng","Giữa chương trình giao diện người dùng và các ứng dụng","Ở ngay tại không gian người dùng","Không có ý nào đúng"], ans:[0],
 expH:"<p>HĐH nằm <b>ngay trên phần cứng</b>, chạy ở chế độ kernel. Phía trên nó là phần mềm ở chế độ user: shell / giao diện, rồi đến các ứng dụng.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Phần cứng (thanh ghi)",
 q:"Một thanh ghi đặc biệt trong CPU trỏ đến đỉnh của ngăn xếp hiện tại trong bộ nhớ?",
 opts:["IR","PC","PSW","SP"], ans:[3],
 expH:"<p><b>SP (Stack Pointer)</b> trỏ tới đỉnh stack hiện tại.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Phần cứng (bộ nhớ)",
 q:"Nhận xét nào sau đây đúng về RAM?",
 opts:["Nó nhanh hơn bộ nhớ đệm cache","RAM là bộ nhớ dữ liệu tạm thời và nó không thể lưu trữ dữ liệu sau khi nguồn điện mất","Nó chỉ có thể được đọc một cách tuần tự","Cả 3 ý trên đều đúng"], ans:[1],
 expH:"<p>RAM là bộ nhớ <b>khả biến</b>: mất điện là mất dữ liệu. RAM chậm hơn cache, và truy cập <b>ngẫu nhiên</b> (Random Access) chứ không tuần tự.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ",
 q:"Mục đích của đồng bộ tiến trình là gì?",
 opts:["Chống deadlock","Chống race condition","Cho phép người dùng khác nhau chạy các tiến trình độc lập nhau","Tất cả các ý trên đều đúng"], ans:[1],
 expH:"<p>Đồng bộ nhằm cho các tiến trình truy cập dữ liệu dùng chung một cách có trật tự, tránh <b>race condition</b>. Deadlock lại là vấn đề có thể <b>sinh ra</b> do đồng bộ không khéo.</p>"});
Q({ch:0,type:"multi",topic:"Chương 1 · Tổng quan",
 q:"Chức năng chính nhất của hệ điều hành là gì?",
 opts:["Quản lý tài nguyên trong máy tính","Cung cấp giao diện người dùng","Quản lý các chương trình, ứng dụng trong máy tính","Cung cấp môi trường làm việc cho người dùng"], ans:[0,1],
 expH:"<p>Tanenbaum nêu 2 vai trò của HĐH: <b>quản lý tài nguyên</b> (resource manager) và <b>máy mở rộng</b> (extended machine), tức là cung cấp giao diện / trừu tượng dễ dùng thay cho phần cứng thô. Tài liệu đánh dấu đúng hai ý tương ứng.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Phần cứng",
 q:"Trong mô hình kiến trúc von Neumann, các thành phần kết nối và liên lạc với nhau thông qua gì?",
 opts:["Bus","I/O","Register","Shared address"], ans:[0],
 expH:"<p>CPU, bộ nhớ và các bộ điều khiển thiết bị nối với nhau bằng <b>bus</b> (đường truyền chung).</p>"});
Q({ch:0,type:"multi",topic:"Chương 1 · Phần cứng (CPU)",
 q:"Ba bước căn bản của CPU là Tìm nạp (Fetch), Giải mã (Decode) và Thực thi (Execute). Ở bước thực thi, CPU sẽ làm gì?",
 opts:["Sử dụng ALU, CPU tính toán những hàm số cực kì phức tạp","Di chuyển dữ liệu từ bộ nhớ sang một vị trí khác","Nhảy sang các địa chỉ khác trong chương trình do CPU tự quyết định","Phản hồi các lệnh chương trình","Dịch chương trình sang mã nhị phân","Theo dõi vị trí và trạng thái hiện tại của câu lệnh"], ans:[0,1,2],
 expH:"<p>Bước thực thi làm đúng việc lệnh yêu cầu: <b>tính toán</b> bằng ALU, <b>chuyển dữ liệu</b> giữa bộ nhớ và thanh ghi, hoặc <b>nhảy</b> (thay đổi PC).</p><p>Dịch sang mã nhị phân là việc của trình biên dịch; theo dõi vị trí lệnh là việc của PC trong bước fetch.</p>"});
Q({ch:0,type:"multi",topic:"Chương 1 · Vào/Ra",
 q:"Các kỹ thuật giúp CPU biết được tín hiệu từ I/O?",
 opts:["Quét dò định kỳ","Xử lý ngắt","Xử lý tín hiệu","Xử lý dữ liệu","Truyền tín hiệu","Nạp vào thanh ghi riêng cho I/O"], ans:[0,1],
 expH:"<p>CPU biết thiết bị đã sẵn sàng bằng 2 cách: <b>thăm dò (polling)</b> – liên tục hỏi thanh ghi trạng thái; hoặc <b>ngắt (interrupt)</b> – thiết bị tự báo khi xong.</p>"});
Q({ch:4,type:"single",topic:"Swapping",sec:"s4-4",
 q:"Dung lượng của RAM có giới hạn, làm thế nào hệ điều hành cho phép nhiều chương trình được tải vào bộ nhớ?",
 opts:["Cơ chế hoán đổi","Bằng cách chạy ì ạch, ép người dùng mua thêm RAM","Cơ chế nén","Cơ chế ưu tiên","Để tự nhiên, không sử dụng cơ chế gì"], ans:[0],
 expH:"<p><b>Hoán đổi (swapping)</b>: đưa tiến trình đang không chạy ra đĩa để lấy chỗ cho tiến trình khác, khi cần thì nạp lại. Bộ nhớ ảo (phân trang) là bản tinh vi hơn của ý này.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Luồng (threads)",
 q:"Mỗi luồng đều có không gian địa chỉ của riêng nó, và chúng bắt đầu từ 0 đến maximum kích thước của luồng.",
 opts:["Đúng","Sai"], ans:[1],
 expH:"<p>Sai. Các luồng của một tiến trình <b>dùng chung</b> không gian địa chỉ của tiến trình. Không gian địa chỉ riêng là đặc điểm của <b>tiến trình</b>.</p>"});
Q({ch:4,type:"single",topic:"Không gian địa chỉ",sec:"s4-1",
 q:"Hệ điều hành định nghĩa không gian địa chỉ cho từng tiến trình để các tiến trình khác nhau nghĩ rằng chúng có riêng phần cứng (riêng CPU, riêng RAM) cho riêng mình.",
 opts:["Đúng","Sai"], ans:[0],
 expH:"<p>Đúng. Mỗi tiến trình có <b>không gian địa chỉ riêng</b> bắt đầu từ 0, và MMU ánh xạ sang RAM thật. Mỗi tiến trình \"tưởng\" mình có cả máy, trong khi thực ra đang dùng chung RAM và CPU với tiến trình khác.</p>"});
Q({ch:4,type:"single",topic:"Bảo vệ bộ nhớ",sec:"s4-3",
 q:"Cơ chế bảo vệ trong hệ điều hành như thế nào?",
 opts:["Bảo vệ code của HĐH khỏi tiến trình, tức là các chương trình của người dùng không thể truy xuất không gian địa chỉ của hệ điều hành","Bảo vệ 1 tiến trình khỏi các tiến trình khác, tức là các tiến trình không thể truy xuất không gian địa chỉ lẫn nhau","Cả 2 ý trên đều đúng","Cả 2 ý trên đều sai"], ans:[2],
 expH:"<p>Bảo vệ bộ nhớ có cả hai mặt: chương trình user không được đụng vào vùng nhớ của <b>HĐH</b>, và các <b>tiến trình</b> không được đụng vào vùng nhớ của nhau (ví dụ nhờ thanh ghi base / limit, mục 3 Chương 4).</p>"});
Q({ch:0,type:"multi",topic:"Chương 2 · Lập lịch CPU",
 q:"Điều nào sau đây đúng về lập lịch xổ số (lottery scheduling) của CPU?",
 opts:["Nó không tồn tại","Nó giúp giải quyết các vấn đề khó giải quyết với các phương pháp lập lịch khác","Nó dựa theo độ quan trọng mà phát vé số cho tiến trình","Khi bộ lập lịch đưa ra quyết định, nó sẽ dựa vào danh sách ưu tiên mà chọn tiến trình tiếp theo","Các tiến trình đều công bằng trong việc nhận vé số"], ans:[1,2],
 expH:"<p>Lottery scheduling: mỗi tiến trình được phát một số <b>vé số</b>; tiến trình quan trọng hơn được nhiều vé hơn. Mỗi lần lập lịch thì <b>bốc ngẫu nhiên</b> một vé, ai giữ vé đó được chạy. Cách này giải quyết gọn một số bài toán khó với cách khác (ví dụ chia CPU theo tỉ lệ).</p><p>Không có \"danh sách ưu tiên\", và số vé không chia đều cho mọi tiến trình.</p>"});
Q({ch:0,type:"multi",topic:"Chương 2 · Lập lịch CPU",
 q:"Thuật toán lập lịch CPU RR có quantum = 5, switching overhead = 2, 6 tiến trình (cùng đến lúc 0) với thời gian chạy lần lượt là: P1: 2, P2: 5, P3: 7, P4: 9, P5: 27, P6: 8. Hỏi thời gian đợi trung bình và thời gian turnaround trung bình là bao nhiêu?",
 opts:["Avg waiting time = 29.(6)","Avg turnaround time = 39.(3)","Avg waiting time = 56.(3)","Avg turnaround time = 58.(6)","Không có giá trị trung bình waiting time đúng","Không có giá trị trung bình turnaround time đúng"], ans:[0,1],
 expH:"<p>Mỗi lần đổi sang tiến trình khác tốn 2 đơn vị. Khi chỉ còn một tiến trình thì không cần đổi.</p><table><tr><th>Đoạn</th><th>Chạy</th><th>Xong lúc</th></tr><tr><td>0–2</td><td>P1</td><td>P1 = 2</td></tr><tr><td>4–9</td><td>P2</td><td>P2 = 9</td></tr><tr><td>11–16</td><td>P3 (còn 2)</td><td></td></tr><tr><td>18–23</td><td>P4 (còn 4)</td><td></td></tr><tr><td>25–30</td><td>P5 (còn 22)</td><td></td></tr><tr><td>32–37</td><td>P6 (còn 3)</td><td></td></tr><tr><td>39–41</td><td>P3</td><td>P3 = 41</td></tr><tr><td>43–47</td><td>P4</td><td>P4 = 47</td></tr><tr><td>49–54</td><td>P5 (còn 17)</td><td></td></tr><tr><td>56–59</td><td>P6</td><td>P6 = 59</td></tr><tr><td>61–78</td><td>P5 chạy một mình</td><td>P5 = 78</td></tr></table><p>Turnaround trung bình = (2 + 9 + 41 + 47 + 78 + 59) ÷ 6 = 236 ÷ 6 = <b>39,33</b>.</p><p>Waiting = turnaround − thời gian chạy: (236 − 58) ÷ 6 = <b>29,67</b>.</p>"});

/* ===== Phần 6: đề giữa kỳ (trang 40–42) ===== */
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Có 5 tiến trình đang chờ để được thực hiện, giả sử thời gian chạy của từng tiến trình là (P1: 10ms), (P2: 9ms), (P3: 5ms), (P4: 8ms), (P5: 20ms). Giả sử các tiến trình không bị block trong quá trình thực thi. Thứ tự thực hiện sẽ như thế nào để thời gian chờ trung bình là nhỏ nhất?",
 opts:["P3 → P4 → P2 → P1 → P5","P5 → P1 → P2 → P4 → P3","P1 → P2 → P3 → P4 → P5","P1 → P3 → P4 → P2 → P5","Không có dãy tiến trình nào thỏa mãn"], ans:[0],
 expH:"<p>Thời gian chờ trung bình nhỏ nhất khi chạy <b>tiến trình ngắn trước</b> (SJF): 5 (P3), 8 (P4), 9 (P2), 10 (P1), 20 (P5).</p><p>Chờ: 0, 5, 13, 22, 32 → trung bình 72 ÷ 5 = 14,4 ms.</p>"});
Q({ch:0,type:"order",topic:"Chương 1 · System call",
 q:"Để thực thi một lời gọi hệ thống (system call) ở chế độ user, hãy sắp xếp các bước sau theo thứ tự thực hiện?",
 steps:["System call được xác định từ 1 bảng con trỏ trỏ đến các trình xử lý system và thực hiện","Đặt các tham số của system call vào stack","Ngắt xảy ra để chuyển từ chế độ user sang chế độ kernel","Sau khi hoàn tất, ngắt xảy ra lần nữa để chuyển sang chế độ user","Điều khiển được quay lại hàm / thủ tục sử dụng system call theo cách thông thường như một hàm gọi lệnh return"],
 opts:["2, 3, 1, 4, 5","3, 2, 1, 4, 5","3, 2, 1, 5, 4","2, 3, 1, 5, 4"], ans:[0],
 expH:"<p>Chuẩn bị tham số (2) → trap vào kernel (3) → kernel tra bảng con trỏ, chạy đúng hàm xử lý (1) → trở về user mode (4) → quay lại chương trình như một lệnh return bình thường (5).</p>"});
Q({ch:0,type:"multi",topic:"Chương 2 · Luồng (threads)",
 q:"Giả sử tiến trình A có 4 threads A1, A2, A3, A4 và tiến trình B có 3 threads B1, B2, B3 đang chạy ở chế độ lập lịch cục bộ (triển khai thread ở user space). Cả tiến trình và thread đều được lập lịch theo Round Robin; với tiến trình thì quantum = 50ms, còn với mỗi thread thì 10ms. Thứ tự lập lịch nào cho các thread user space là đúng? (Có thể chọn nhiều đáp án)",
 opts:["B1, B2, B3, B1, B2, A1, A2, A3, A4, A1, B1, B2, …","A1, A2, A3, A4, A1, B1, B2, B3, B1, B2, A1, A2, …","A1, B1, A2, B2, A3, B3, A4, B1, A2, B2, A3, B3, …","B1, A1, B2, A2, B3, A3, B1, A4, B2, A2, B3, A3, …","A1, A2, A3, A4, B1, B2, B3, A1, A2, A3, A4, B1, B2, …"], ans:[0,1],
 expH:"<p>Luồng ở user space: kernel chỉ thấy <b>tiến trình</b>, cho mỗi tiến trình trọn 50 ms. Trong 50 ms đó, thư viện luồng chạy luân phiên các luồng của chính tiến trình ấy, mỗi luồng 10 ms → <b>5 lượt</b>.</p><ul><li>A được chạy trước: A1, A2, A3, A4, A1 | B1, B2, B3, B1, B2 | …</li><li>B được chạy trước: B1, B2, B3, B1, B2 | A1, A2, A3, A4, A1 | …</li></ul><p>Cả hai dãy đều có thể xảy ra. Dãy xen kẽ A1, B1, A2… chỉ có với luồng mức <b>kernel</b>. Dãy cuối đổi tiến trình sau 4 luồng (40 ms) là sai, vì A còn dư 10 ms nên chạy tiếp A1.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · System call",
 q:"Một tiến trình đang chạy thực hiện ở chế độ user và gọi một dịch vụ của hệ điều hành, nó cần phải thực thi __________ để chuyển sang chế độ kernel (chuyển điều khiển sang hệ điều hành).",
 opts:["Chuyển đổi (switching)","Một lệnh trap (trap instruction)","Một lời gọi hệ thống (system call)","Một ngắt (interrupt) hoặc một lệnh trap (trap instruction)"], ans:[1],
 expH:"<p>Chương trình user muốn nhờ HĐH thì thực thi <b>lệnh TRAP</b>: CPU chuyển sang kernel mode và nhảy vào chỗ HĐH định sẵn. “System call” là <b>dịch vụ</b> được yêu cầu, còn cái được thực thi để chuyển quyền là lệnh trap.</p><p><small>Hai bản đáp án trong tài liệu khác nhau: phần đề giữa kỳ chọn “một ngắt hoặc một lệnh trap”, còn bản đáp án đề cuối kỳ (cùng 4 phương án) chọn <b>“một lệnh trap”</b>. Trang theo đáp án đề cuối kỳ; trap cũng chính là một loại ngắt do phần mềm sinh ra, nên ý kia không sai hẳn.</small></p>"});

/* ===== Phần 7: "Đề 1" giữa kỳ (trang 43–55) ===== */
Q({ch:0,type:"multi",topic:"Chương 2 · Tiến trình",
 q:"Phát biểu nào sau đây là KHÔNG đúng?",
 opts:["Tiến trình là một chương trình đang được thực hiện, nó là một thực thể chủ động.","Tiến trình là một chương trình đang được thực hiện, nó là một thực thể bị động.","Chương trình là một tiến trình, nó là một thực thể chủ động.","Chương trình không phải là một tiến trình và nó là một thực thể bị động."], ans:[1,2],
 expH:"<p><b>Chương trình</b> là thực thể <b>bị động</b> (file nằm trên đĩa). <b>Tiến trình</b> là chương trình đang chạy, thực thể <b>chủ động</b> (có PC, thanh ghi, tài nguyên).</p><p>Vì vậy có 2 ý sai: \"tiến trình là thực thể bị động\" và \"chương trình là tiến trình, là thực thể chủ động\".</p>"+DOC("chỉ ý \"Chương trình là một tiến trình…\"; nhưng ý \"tiến trình là thực thể bị động\" cũng sai")});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình",
 q:"Trạng thái \"blocked\" của một tiến trình là do?",
 opts:["Đang chờ nhập xuất","Đang chờ một sự kiện nào đó xảy ra","Cả hai đều đúng","Cả hai đều sai"], ans:[2],
 expH:"<p>Blocked = chờ <b>một sự kiện</b>; chờ nhập xuất xong cũng là một loại sự kiện. Cả hai đều đúng.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình",
 q:"Hành động nào HĐH sẽ thực thi với một tiến trình mới sinh ra?",
 opts:["Cấp CPU ngay cho tiến trình","Tạo ngay khối PCB để quản lý tiến trình","Giao ngay các tài nguyên mà tiến trình cần","Không làm gì cả"], ans:[1],
 expH:"<p>Việc đầu tiên khi tạo tiến trình là <b>tạo PCB</b> để HĐH quản lý nó. Sau đó tiến trình vào hàng đợi Ready, chờ tới lượt được cấp CPU; tài nguyên được cấp dần khi nó yêu cầu.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Độ ưu tiên của các tiến trình cho biết?",
 opts:["Tiến trình sử dụng nhiều CPU hay ít","Tiến trình chiếm nhiều hay ít vùng nhớ","Tầm quan trọng của tiến trình","Tất cả đều sai"], ans:[2],
 expH:"<p>Độ ưu tiên thể hiện <b>mức quan trọng</b> của tiến trình: tiến trình quan trọng hơn được cấp CPU trước.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Khi một tiến trình chuẩn bị vào hay ra khỏi một vùng Critical Section thì phải?",
 opts:["Xin phép hệ điều hành","Phát cờ hiệu khi vào và khi ra","Cả hai việc trên","Không làm gì cả"], ans:[2],
 expH:"<p>\"Cả hai việc trên\" = <b>xin phép hệ điều hành</b> + <b>phát cờ hiệu khi vào và khi ra</b>. Quanh miền găng luôn có 2 phần: <b>entry section</b> (xin vào, ví dụ Down(s) – nhờ HĐH / cơ chế đồng bộ cho phép) và <b>exit section</b> (báo đã ra, ví dụ Up(s) để người sau được vào). \"Không làm gì cả\" sai vì như vậy sẽ xảy ra tranh đoạt điều khiển.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình",
 q:"Hàng đợi dành cho các tiến trình xếp hàng chờ nhập xuất được gọi là?",
 opts:["Busy-Waiting buffer","Ready queue","Waiting queue","Running queue"], ans:[2],
 expH:"<p>Tiến trình chờ I/O ở trạng thái <b>waiting / blocked</b>, nằm trong <b>hàng đợi chờ</b> (waiting queue, còn gọi là device queue). Ready queue chứa tiến trình đã sẵn sàng, <b>chỉ chờ CPU</b>.</p>"+DOC("\"Ready queue\" — không đúng: tiến trình chờ I/O chưa sẵn sàng chạy")});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình",
 q:"Tiến trình yêu cầu một tài nguyên nhưng chưa được đáp ứng vì tài nguyên chưa sẵn sàng, hay tiến trình phải đợi một sự kiện hay một thao tác nhập xuất. Đây thuộc dạng chuyển trạng thái nào?",
 opts:["Running → Ready","Ready → Running","Running → Blocked","Blocked → Ready"], ans:[2],
 expH:"<p>Tiến trình <b>đang chạy</b> phải dừng lại chờ → chuyển <b>Running → Blocked</b>. Khi sự kiện xảy ra thì Blocked → Ready.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Chế độ kernel",
 q:"Khi một tiến trình người dùng gọi đến một lời gọi hệ thống, tiến trình của hệ điều hành xử lý lời gọi này hoạt động theo chế độ?",
 opts:["Không đặc quyền","Đặc quyền","Không câu nào đúng","Cả hai đều đúng"], ans:[1],
 expH:"<p>Lời gọi hệ thống được xử lý trong kernel, ở <b>chế độ đặc quyền</b> (kernel mode): được chạy mọi lệnh và truy cập phần cứng.</p>"+DOC("\"Không câu nào đúng\" — không hợp lý vì xử lý system call luôn ở chế độ đặc quyền")});
Q({ch:0,type:"single",topic:"Chương 2 · Giao tiếp tiến trình",
 q:"Phương pháp nhanh nhất để trao đổi thông tin giữa các tiến trình là?",
 opts:["Đường ống","Vùng nhớ chia sẻ","Trao đổi thông điệp","Socket"], ans:[1],
 expH:"<p>Với <b>vùng nhớ chia sẻ</b>, sau khi thiết lập thì các tiến trình đọc / ghi thẳng vào bộ nhớ chung, không phải nhờ kernel chép dữ liệu mỗi lần. Đường ống, thông điệp, socket đều phải qua system call cho từng lần gửi.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ",
 q:"Cơ sở của đồng bộ hóa tiến trình là gì?",
 opts:["Sự truy nhập đồng thời đến dữ liệu chia sẻ có thể gây ra sự mâu thuẫn","Để duy trì tính nhất quán dữ liệu cần có cơ chế đảm bảo thực hiện các chương trình hợp tác theo thứ tự","Cả A và B đúng","Cả A và B sai"], ans:[2],
 expH:"<p>Silberschatz mở đầu phần đồng bộ bằng đúng hai câu này: truy cập đồng thời dữ liệu chung có thể làm dữ liệu <b>mâu thuẫn</b>, và để giữ <b>nhất quán</b> cần cơ chế cho các tiến trình hợp tác chạy có thứ tự. Cả hai cùng là cơ sở của đồng bộ.</p>"+DOC("chỉ ý A")});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Đoạn găng là gì?",
 opts:["Mỗi tiến trình có một đoạn mã, gọi là đoạn găng, mà tại đó tiến trình có thể thay đổi các biến chung, cập nhật bảng, dữ liệu","Các đoạn code trong các chương trình dùng để truy cập đến các vùng nhớ chia sẻ, các tập tin chia sẻ được gọi là các đoạn găng","Cả A và B đều đúng","Cả A và B đều sai"], ans:[2],
 expH:"<p>Hai cách diễn đạt cùng một ý: đoạn găng là đoạn code <b>truy cập dữ liệu dùng chung</b> (biến, bảng, file chia sẻ).</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Một giải pháp cho vấn đề đoạn găng phải thỏa mãn mấy yêu cầu?",
 opts:["1","2","3","4"], ans:[2],
 expH:"<p><b>3 yêu cầu</b>: loại trừ lẫn nhau (mutual exclusion), tiến triển (progress – chọn được tiến trình vào tiếp), chờ đợi có hạn (bounded waiting).</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Những yêu cầu của một giải pháp cho vấn đề đoạn găng?",
 opts:["Loại trừ lẫn nhau","Chọn tiến trình tiếp theo được vào đoạn găng","Chờ đợi có hạn","Cả A, B, C"], ans:[3],
 expH:"<p>Cả ba: loại trừ lẫn nhau, tiến triển (chọn được tiến trình vào tiếp), chờ đợi có hạn.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Thế nào là yêu cầu loại trừ lẫn nhau?",
 opts:["Nếu tiến trình Pi đang thực hiện trong đoạn găng của nó thì các tiến trình khác không được thực hiện trong đoạn găng của chúng.","Nếu tiến trình Pi đang thực hiện trong đoạn găng của nó thì các tiến trình khác cũng được thực hiện trong đoạn găng của chúng.","Tại một thời điểm không thể có hai tiến trình nằm trong đoạn găng.","Tại một thời điểm có thể có hai hoặc nhiều hơn các tiến trình nằm trong đoạn găng.","Cả A và C đúng","Cả B và D đúng"], ans:[4],
 expH:"<p>Loại trừ lẫn nhau: <b>mỗi lúc chỉ một</b> tiến trình ở trong đoạn găng. Ý A và ý C là hai cách nói của cùng điều này.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Thế nào là yêu cầu chờ đợi có hạn?",
 opts:["Tồn tại vô hạn số lần các tiến trình khác được phép vào đoạn găng của chúng sau khi một tiến trình yêu cầu vào đoạn găng đến trước khi yêu cầu đó được đáp ứng","Tồn tại giới hạn số lần các tiến trình khác được phép vào đoạn găng","Tồn tại giới hạn số lần các tiến trình khác được phép vào đoạn găng của chúng sau khi một tiến trình yêu cầu vào đoạn găng đến trước khi yêu cầu đó được đáp ứng","Tồn tại giới hạn số lần các tiến trình khác được phép vào đoạn găng của chúng sau khi một tiến trình yêu cầu vào đoạn găng đến trước khi yêu cầu đó không được đáp ứng"], ans:[2],
 expH:"<p>Bounded waiting: kể từ lúc một tiến trình <b>xin vào</b> đến lúc nó <b>được vào</b>, số lần tiến trình khác chen vào trước phải có <b>giới hạn</b>. Nhờ vậy không tiến trình nào chờ mãi.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Thế nào là yêu cầu chọn tiến trình tiếp theo được vào đoạn găng (progress)?",
 opts:["Nếu không có tiến trình nào đang trong đoạn găng của nó và một số tiến trình muốn vào đoạn găng của chúng thì chỉ những tiến trình đang không trong đoạn còn lại mới là ứng cử viên.","Nếu có tiến trình nào đang trong đoạn găng của nó và một số tiến trình muốn vào đoạn găng của chúng thì chỉ những tiến trình đang không trong đoạn còn lại mới là ứng cử viên.","Nếu không có tiến trình nào đang trong đoạn găng của nó và một số tiến trình muốn vào đoạn găng của chúng thì chỉ những tiến trình đang trong đoạn còn lại mới là ứng cử viên.","Nếu có tiến trình nào đang trong đoạn găng của nó và một số tiến trình muốn vào đoạn găng của chúng thì chỉ những tiến trình đang trong đoạn còn lại mới là ứng cử viên."], ans:[0],
 expH:"<p>Progress (Silberschatz): khi <b>không ai</b> ở trong đoạn găng mà có tiến trình muốn vào, thì chỉ những tiến trình <b>không ở trong phần còn lại (remainder section)</b> mới được tham gia quyết định ai vào, và quyết định không được hoãn mãi.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Có mấy phương pháp xử lý đoạn găng (trong hệ điều hành)? Đó là những phương pháp nào?",
 opts:["Có 1 phương pháp. Phương pháp Kernel không ưu tiên trước","Có 2 phương pháp. Phương pháp Kernel ưu tiên trước và giải pháp Peterson","Có 1 phương pháp. Phương pháp Kernel ưu tiên trước","Có 2 phương pháp. Phương pháp Kernel không ưu tiên trước và Kernel ưu tiên trước"], ans:[3],
 expH:"<p>Silberschatz: có 2 cách xử lý đoạn găng trong HĐH là <b>kernel không ưu tiên trước</b> (non-preemptive kernel) và <b>kernel ưu tiên trước</b> (preemptive kernel).</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (phần cứng)",
 q:"Giải pháp dùng Test and Set, biến khởi tạo ban đầu là:",
 opts:["Biến Char chia sẻ là Lock, được khởi tạo là false","Biến Integer chia sẻ là Lock, được khởi tạo là false","Biến Boolean chia sẻ là Lock, được khởi tạo là true","Biến Boolean chia sẻ là Lock, được khởi tạo là false"], ans:[3],
 expH:"<p>TestAndSet dùng biến <b>boolean lock = false</b> (chưa ai giữ khóa). Tiến trình đầu tiên gọi TestAndSet(&amp;lock) nhận về false nên vào được, đồng thời lock thành true để chặn người sau.</p><p>Nếu khởi tạo true thì không tiến trình nào vào được.</p>"+DOC("\"Boolean … khởi tạo là true\" — không đúng, sẽ làm mọi tiến trình chờ mãi")});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (semaphore)",
 q:"Semaphore là một công cụ đồng bộ hóa:",
 opts:["Dễ dàng hơn với người lập trình ứng dụng","Khó dùng hơn với người lập trình ứng dụng","Không có ý nghĩa với người lập trình ứng dụng"], ans:[0],
 expH:"<p>Các giải pháp phần cứng (TestAndSet, Swap) khó dùng với lập trình viên ứng dụng. Semaphore che đi chi tiết đó, chỉ cần gọi down / up, nên <b>dễ dùng hơn</b>.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ",
 q:"Thế nào là phương pháp Kernel ưu tiên trước (preemptive kernel)?",
 opts:["Cho phép một tiến trình bị ưu tiên trước (bị giành CPU) khi nó đang chạy trong Kernel mode","Không cho phép một tiến trình bị ưu tiên trước khi nó đang chạy trong Kernel mode","Không cho phép một tiến trình bị ưu tiên trước khi nó đang chạy trong Kernel mode; tiến trình đó sẽ chạy đến khi nó thoát khỏi Kernel mode","Cho phép một tiến trình bị ưu tiên trước khi nó đang chạy trong Kernel mode; tiến trình đó sẽ chạy đến khi nó thoát khỏi Kernel mode"], ans:[0],
 expH:"<p><b>Preemptive kernel</b>: tiến trình <b>có thể bị giành CPU</b> ngay cả khi đang chạy trong kernel mode. <b>Non-preemptive kernel</b> thì ngược lại: chạy đến khi rời kernel mode, bị block, hoặc tự nhường CPU.</p>"+DOC("\"Không cho phép…\" — đó là định nghĩa kernel KHÔNG ưu tiên trước")});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Thế nào là vấn đề đoạn găng?",
 opts:["Là thiết kế một giao thức mà các tiến trình sử dụng để loại trừ lẫn nhau","Là thiết kế một giao thức mà các tiến trình sử dụng để hợp tác","Là thiết kế một chương trình mà các tiến trình sử dụng để hợp tác","Là thiết kế một chương trình mà các tiến trình sử dụng để loại trừ lẫn nhau"], ans:[1],
 expH:"<p>Silberschatz: <i>\"The critical-section problem is to design a protocol that the processes can use to cooperate.\"</i> Vấn đề đoạn găng là thiết kế một <b>giao thức</b> để các tiến trình <b>hợp tác</b>. Loại trừ lẫn nhau là một trong các yêu cầu của giao thức đó.</p>"+DOC("\"thiết kế một chương trình … để loại trừ lẫn nhau\"")});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ",
 q:"Thế nào là busy waiting?",
 opts:["Khi một tiến trình trong đoạn găng, các tiến trình khác cố gắng vào đoạn phải lặp lại liên tục trong mã đoạn vào","Khi một tiến trình trong đoạn găng, các tiến trình khác cố gắng vào đoạn không phải lặp lại liên tục trong mã đoạn vào làm lãng phí các chu kỳ CPU","Khi một tiến trình trong đoạn găng, các tiến trình khác cố gắng vào đoạn phải lặp lại liên tục trong mã đoạn vào không làm lãng phí các chu kỳ CPU","Khi một tiến trình trong đoạn găng, các tiến trình khác cố gắng vào đoạn phải lặp lại liên tục trong mã đoạn vào làm lãng phí các chu kỳ CPU"], ans:[3],
 expH:"<p>Busy waiting (chờ bận): tiến trình chờ bằng cách <b>chạy vòng lặp kiểm tra liên tục</b>, vẫn chiếm CPU mà không làm việc gì có ích → <b>lãng phí chu kỳ CPU</b>.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ",
 q:"Thế nào là Starvation?",
 opts:["Starvation – khóa vô hạn. Một tiến trình có thể được đưa ra khỏi waiting queue tương ứng với semaphore","Starvation – khóa hữu hạn. Một tiến trình có thể không bao giờ được đưa ra khỏi waiting queue tương ứng với semaphore","Starvation – khóa hữu hạn. Một tiến trình có thể được đưa ra khỏi waiting queue tương ứng với semaphore","Starvation – khóa vô hạn. Một tiến trình có thể không bao giờ được đưa ra khỏi waiting queue tương ứng với semaphore"], ans:[3],
 expH:"<p>Starvation (chết đói, indefinite blocking – khóa vô hạn): một tiến trình <b>có thể không bao giờ</b> được lấy ra khỏi hàng đợi của semaphore, ví dụ khi hàng đợi phục vụ theo LIFO.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Deadlock",
 q:"Thế nào là Deadlock?",
 opts:["Một tiến trình đang đợi có hạn một sự kiện chỉ có thể được gây ra bởi một trong những tiến trình đó","Hai hoặc nhiều tiến trình đang đợi vô hạn một sự kiện chỉ có thể được gây ra bởi một trong những tiến trình khác.","Hai hoặc nhiều tiến trình đang đợi vô hạn một sự kiện chỉ có thể được gây ra bởi một trong những tiến trình đang đợi đó","Hai hoặc nhiều tiến trình đang đợi có hạn một sự kiện chỉ có thể được gây ra bởi một trong những tiến trình đang đợi đó"], ans:[2],
 expH:"<p>Deadlock: <b>hai hay nhiều</b> tiến trình chờ <b>vô hạn</b> một sự kiện mà chỉ một tiến trình <b>trong chính nhóm đang chờ</b> mới gây ra được. Vì ai cũng đang chờ nên không ai gây ra sự kiện đó.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Khai báo kiểu cho hai biến trong giải pháp Peterson:",
 opts:["Biến turn với kiểu Integer, một mảng Flag có hai phần tử có kiểu Boolean","Biến turn với kiểu char, một mảng Flag có hai phần tử có kiểu Boolean","Biến turn với kiểu Integer, một mảng Flag có hai phần tử có kiểu real","Biến turn với kiểu Integer, một mảng Flag có hai phần tử có kiểu char"], ans:[0],
 expH:"<p>Peterson: <code>int turn;</code> (đến lượt ai: 0 hoặc 1) và <code>boolean flag[2];</code> (ai đang muốn vào).</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Điều nào sau đây nói đúng về Time quantum (trong bảng điều phối của Solaris)?",
 opts:["Số càng lớn mức ưu tiên càng cao","Tỷ lệ nghịch với mức ưu tiên","Thấp hơn mức ưu tiên gốc","Cao hơn mức ưu tiên gốc, giúp giảm thời gian đáp ứng cho các tiến trình tương tác"], ans:[1],
 expH:"<p>Trong bảng điều phối của Solaris: tiến trình <b>ưu tiên càng cao thì quantum càng nhỏ</b>, ưu tiên thấp thì quantum lớn. Tức là quantum <b>tỷ lệ nghịch</b> với mức ưu tiên.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Thứ tự ưu tiên nào sau đây được sắp xếp đúng cho 4 lớp lập lịch (Solaris)?",
 opts:["Real time, Time sharing, Interactive, System","Real time, System, Time sharing, Interactive","Time sharing, System, Interactive, Real time","System, Time sharing, Interactive, Real time"], ans:[1],
 expH:"<p>Solaris xếp ưu tiên từ cao xuống: <b>Real time</b> → <b>System</b> (luồng của kernel) → <b>Time sharing / Interactive</b> (tiến trình người dùng).</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Luồng (threads)",
 q:"Điều nào sau đây nói đúng về lập lịch toàn cục (system-contention scope)?",
 opts:["Sự cạnh tranh CPU diễn ra giữa tất cả các luồng trong hệ thống","Trong các hệ điều hành sử dụng mô hình Many-to-one, Many-to-many","Sự cạnh tranh CPU diễn ra giữa các luồng của cùng một tiến trình","Cả A, B"], ans:[0],
 expH:"<p><b>Lập lịch toàn cục (SCS)</b>: kernel chọn luồng kernel nào chạy, và mọi luồng <b>trong toàn hệ thống</b> cạnh tranh CPU. Còn <b>lập lịch cục bộ (PCS)</b>: các luồng <b>cùng một tiến trình</b> cạnh tranh nhau; đây là cách dùng trong mô hình many-to-one / many-to-many.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Trong các giải thuật sau, giải thuật nào không được ưu tiên trước (non-preemptive)?",
 opts:["Multilevel Queue Scheduling","RR","SJF","FCFS"], ans:[3],
 expH:"<p><b>FCFS</b> luôn là non-preemptive: tiến trình chạy tới khi xong hoặc tự chờ I/O. RR là preemptive. SJF có cả hai dạng (dạng preemptive gọi là SRTF). Multilevel queue thường giành CPU giữa các hàng đợi.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Trong các giải thuật, giải thuật lập lịch nào cho thời gian chờ đợi trung bình của các tiến trình là nhỏ nhất?",
 opts:["FCFS","RR","Lập lịch theo mức ưu tiên","SJF"], ans:[3],
 expH:"<p>SJF được chứng minh là <b>tối ưu</b> về thời gian chờ trung bình: đưa tiến trình ngắn lên trước thì nó bớt chờ nhiều hơn so với mức tiến trình dài phải chờ thêm.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình",
 q:"Process là gì?",
 opts:["Một chương trình lưu trên đĩa.","Một chương trình nạp vào bộ nhớ và đang được CPU thực thi.","Một chương trình được nạp vào bộ nhớ."], ans:[1],
 expH:"<p>Process = chương trình <b>đang thực thi</b>. Chỉ lưu trên đĩa, hay chỉ mới nạp vào RAM mà chưa chạy, thì chưa đủ để gọi là tiến trình theo đáp án này.</p>"});

/* ===== Phần 8: "Đề 1" giữa kỳ, tiếp (trang 56–60) ===== */
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"Ưu điểm chính của hệ thống chia sẻ thời gian (time-sharing system) so với hệ thống đa chương (multiprogrammed system):",
 opts:["Chi phí quản lý các process nhỏ hơn","Tăng hiệu suất của CPU","Thời gian đáp ứng (response time) nhỏ hơn","Giảm burst time của process"], ans:[2],
 expH:"<p>Đa chương đã giúp CPU luôn bận. Chia sẻ thời gian thêm việc <b>luân phiên CPU thật nhanh</b> giữa các người dùng, nên ai gõ lệnh cũng được phản hồi gần như ngay: <b>thời gian đáp ứng nhỏ</b>. Đổi lại, chi phí chuyển đổi tăng.</p>"});
Q({ch:4,type:"single",topic:"Đa chương",sec:"s4-2",
 q:"Với một hệ thống đa chương trình thì bộ nhớ sẽ chứa:",
 opts:["hệ điều hành","hệ điều hành và một process","hệ điều hành và nhiều process"], ans:[2],
 expH:"<p>Đa chương = trong RAM có <b>HĐH và nhiều tiến trình</b> cùng lúc, để khi một tiến trình chờ I/O thì CPU chạy tiến trình khác. \"HĐH và một process\" là hệ đơn chương.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"Hãy chọn đặc điểm đúng với khái niệm hệ điều hành đa nhiệm trong các đặc điểm sau:",
 opts:["Hệ thống xử lý tiến trình theo lô","Hệ thống quản lý làm việc phân tán","Hệ thống quản lý nhiều người dùng (multi user)","Hệ thống điều phối bộ vi xử lý theo kiểu time-sharing"], ans:[3],
 expH:"<p>Đa nhiệm: CPU được <b>chia thời gian</b> (time-sharing) luân phiên cho nhiều công việc, tạo cảm giác chúng chạy cùng lúc. Theo lô, phân tán, nhiều người dùng là những khái niệm khác.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình",
 q:"Một tiến trình gồm những phần nào?",
 opts:["Bộ đếm chương trình, ngăn xếp, tập thanh ghi.","Bộ đệm chương trình, mã, tập thanh ghi.","Bộ đếm chương trình, ngăn xếp, đoạn dữ liệu"], ans:[2],
 expH:"<p>Theo đáp án tài liệu: tiến trình gồm <b>bộ đếm chương trình</b> (đang chạy tới đâu), <b>ngăn xếp</b> (tham số, biến cục bộ, địa chỉ trả về) và <b>đoạn dữ liệu</b> (biến toàn cục). Ngoài ra còn mã lệnh và thanh ghi.</p><p>Ý thứ hai sai ở chữ \"bộ <b>đệm</b> chương trình\".</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình",
 q:"Việc xóa và tạo các tiến trình là do đâu quyết định?",
 opts:["Tiến trình cha","Hệ điều hành","Cả 2 đáp án trên."], ans:[1],
 expH:"<p>Theo đáp án tài liệu: việc tạo và hủy tiến trình do <b>hệ điều hành</b> thực hiện và quản lý (tạo PCB, cấp và thu hồi tài nguyên). Tiến trình cha chỉ <b>yêu cầu</b> qua system call (fork, exit, kill), còn quyết định cuối cùng và việc thực thi là của HĐH.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình (fork)",
 q:"Lệnh fork trong UNIX có ý nghĩa thế nào?",
 opts:["Lệnh tạo hệ thống.","Lệnh lấy ra địa chỉ thanh ghi.","Lệnh hệ thống tạo một tiến trình mới."], ans:[2],
 expH:"<p><code>fork()</code> là lời gọi hệ thống <b>tạo tiến trình con</b>, là bản sao của tiến trình cha.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Giao tiếp tiến trình",
 q:"Giữa tiến trình hợp tác và tiến trình độc lập thì tiến trình nào sử dụng có hiệu quả?",
 opts:["Tiến trình hợp tác.","Tiến trình độc lập.","Cả 2 tiến trình."], ans:[0],
 expH:"<p>Tiến trình <b>hợp tác</b> chia sẻ được thông tin, tăng tốc tính toán (chia việc chạy song song), dễ chia module. Vì thế chúng được xem là dùng hiệu quả hơn.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Giao tiếp tiến trình",
 q:"Giao tiếp liên tiến trình (IPC) là gì?",
 opts:["Là cơ chế để các tiến trình gián tiếp và để đồng bộ các hành động của chúng mà không phải chia sẻ không gian địa chỉ chung","Là cơ chế để các tiến trình giao tiếp và để đồng bộ các hành động của chúng mà không phải chia sẻ không gian địa chỉ chung"], ans:[1],
 expH:"<p>IPC là cơ chế để các tiến trình <b>giao tiếp</b> (trao đổi dữ liệu) và <b>đồng bộ</b> hoạt động mà không cần chung không gian địa chỉ, ví dụ truyền thông điệp. Phương án đầu sai ở chữ \"gián tiếp\".</p>"});
Q({ch:0,type:"single",topic:"Bảo mật · Virus",
 q:"Virus máy tính KHÔNG thể lây lan qua:",
 opts:["Mạng máy tính","Đĩa CD","Thẻ nhớ flash","Lưu trữ USB"], ans:[1],
 expH:"<p>Đĩa CD (đã ghi xong) là phương tiện <b>chỉ đọc</b>: virus không thể ghi thêm vào để lây lan sang đĩa. Mạng, thẻ nhớ, USB đều ghi được nên virus tự chép sang được.</p><p><small>Một đĩa CD ghi sẵn file nhiễm virus vẫn mang virus vào máy được; ý của đề là virus không tự lây vào CD.</small></p>"});
Q({ch:0,type:"single",topic:"Bảo mật · Virus",
 q:"Virus máy tính là gì?",
 opts:["Một loại bệnh có thể lây lan cho con người khi truy cập internet","Một chương trình hay đoạn chương trình có khả năng tự nhân bản hay sao chép chính nó từ đối tượng lây nhiễm này sang đối tượng khác.","Một người truy cập vào máy tính của người khác để sao chép các tập tin một cách không hợp lệ.","Đáp án B và C đúng."], ans:[1],
 expH:"<p>Virus là <b>đoạn chương trình tự nhân bản</b>, gắn vào chương trình hay file khác để lây lan. Người truy cập trái phép là kẻ xâm nhập (intruder), không phải virus.</p>"});
Q({ch:0,type:"single",topic:"Bảo mật · Bảo vệ",
 q:"Phương pháp (cài đặt ma trận quyền truy nhập) mà người sử dụng không thể truy nhập trực tiếp để thay đổi nội dung của nó:",
 opts:["Bảng toàn cục","Danh sách quyền truy nhập","Danh sách khả năng","Cơ chế khóa – chìa","Cả C và D"], ans:[4],
 expH:"<p><b>Danh sách khả năng</b> (capability list) do HĐH giữ: người dùng chỉ được dùng các \"vé\" quyền, không được tự sửa. Trong <b>cơ chế khóa – chìa</b>, các khóa và chìa do HĐH quản lý, người dùng cũng không sửa trực tiếp được.</p>"});
Q({ch:0,type:"single",topic:"Bảo mật · Bảo vệ",
 q:"Phương pháp cài đặt ma trận quyền truy nhập nào là phương pháp đơn giản nhất?",
 opts:["Bảng toàn cục","Danh sách quyền truy nhập","Danh sách khả năng","Cơ chế khóa – chìa"], ans:[0],
 expH:"<p><b>Bảng toàn cục</b> là cách đơn giản nhất: một bảng gồm các bộ ba &lt;miền, đối tượng, tập quyền&gt;. Nhược điểm là bảng rất lớn, khó giữ trong bộ nhớ.</p>"});
Q({ch:0,type:"single",topic:"Bảo mật · Bảo vệ",
 q:"Cấu trúc của một miền bảo vệ (một quyền truy nhập trong miền) là gì?",
 opts:["<đối tượng, {quyền thao tác}>","<quyền thao tác, {đối tượng}>","<miền, quyền thao tác, đối tượng>","<quyền thao tác, đối tượng, miền>"], ans:[0],
 expH:"<p>Miền bảo vệ là tập các cặp <b>&lt;tên đối tượng, tập quyền&gt;</b>, ví dụ &lt;file F, {đọc, ghi}&gt;.</p>"});
Q({ch:0,type:"single",topic:"Bảo mật · Bảo vệ",
 q:"Quyền truy nhập nào sau đây được viết đúng?",
 opts:["<0, {đọc, ghi}>","<đọc, ghi, {2}>","<đọc.in, 0>","<{đọc, ghi}, 0>"], ans:[0],
 expH:"<p>Đúng dạng <b>&lt;đối tượng, {tập quyền}&gt;</b>: đối tượng 0 có quyền {đọc, ghi}. Các phương án khác đảo thứ tự hoặc sai cú pháp.</p>"});
Q({ch:0,type:"single",topic:"Bảo mật · Mạng",
 q:"Tường lửa được đặt ở đâu?",
 opts:["Trong máy chủ tin cậy","Giữa các máy chủ tin cậy và máy chủ không tin cậy","Trong máy chủ không tin cậy","Trong ổ cứng của máy tính"], ans:[1],
 expH:"<p>Tường lửa đứng <b>ở ranh giới</b> giữa mạng tin cậy (nội bộ) và mạng không tin cậy (Internet), lọc các kết nối đi qua.</p>"});
Q({ch:0,type:"single",topic:"Bảo mật · Hiểm họa",
 q:"Khai thác kỹ thuật cho phép chương trình viết bởi người này có thể được thực hiện bởi người khác là hiểm họa nào?",
 opts:["Con ngựa thành Troa (Trojan horse)","Trap door","Stack and Buffer Overflow","Worms"], ans:[0],
 expH:"<p><b>Trojan horse</b>: chương trình do người khác viết, trông vô hại, nhưng khi bạn chạy thì nó chạy <b>với quyền của bạn</b> và làm việc xấu.</p>"});
Q({ch:0,type:"single",topic:"Bảo mật · Hiểm họa",
 q:"Kiểu tấn công lợi dụng một lỗi trong một chương trình là:",
 opts:["Con ngựa thành Troa (Trojan horse)","Trap door","Stack and Buffer Overflow","Worms"], ans:[2],
 expH:"<p><b>Tràn bộ đệm / tràn stack</b>: lợi dụng lỗi chương trình không kiểm tra độ dài dữ liệu, ghi đè địa chỉ trả về trên stack để chạy mã của kẻ tấn công.</p>"});
Q({ch:0,type:"single",topic:"Bảo mật · Virus",
 q:"Loại file nào có thể phát hiện virus?",
 opts:["EXE","COM","BAT","Cả 3 phương án trên"], ans:[3],
 expH:"<p>Cả ba đều là file <b>chạy được</b> (EXE, COM là chương trình, BAT là file lệnh), nên đều có thể bị virus gắn vào.</p>"});

/* ===== Phần 9: "Đề 2" cuối kỳ (trang 61–70) ===== */
Q({ch:5,type:"single",topic:"Lập lịch đĩa – SSF",sec:"s5-10",
 q:"Các yêu cầu truy xuất được gửi đến hàng đợi của đĩa theo thứ tự: 71, 147, 26, 4, 124, 23, 200 và 76. Giả sử rằng đầu từ đang xuất phát ở cylinder 60. Thứ tự thực hiện sẽ như thế nào nếu sử dụng thuật toán SSF?",
 opts:["60, 71, 76, 26, 23, 4, 124, 147, 200","60, 71, 76, 124, 147, 200, 26, 23, 4","60, 71, 23, 26, 124, 76, 147, 200, 4","60, 71, 76, 23, 4, 26, 124, 147, 200"], ans:[1],
 expH:"<p>60 → 71 (11; còn 26 cách 34) → 76 (5). Đứng ở 76: <b>124 cách 48</b>, còn <b>26 cách 50</b> → đi lên 124 → 147 → 200 → rồi mới về 26 → 23 → 4.</p><p>Khác với đề có số 30 (30 chỉ cách 76 là 46 nên quay xuống trước): ở đây là 26, xa hơn 124 đúng 2 cylinder.</p>"+DOC("ở một chỗ là \"60, 71, 76, 26, …\" và ở chỗ khác là \"60, 71, 76, 124, …\"; tính lại thì phương án sau đúng")});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ",
 q:"Vì sao phải đồng bộ hóa giữa các tiến trình?",
 opts:["Hệ điều hành đa nhiệm","Cho phép các tiến trình chia sẻ thời gian của bộ xử lý","Dùng chung tài nguyên phần mềm","Tất cả đều đúng"], ans:[3],
 expH:"<p>Trong HĐH đa nhiệm, các tiến trình chạy xen kẽ (chia sẻ CPU) và dùng chung tài nguyên (biến, file…). Chính sự xen kẽ cộng dùng chung đó gây race condition, nên cần đồng bộ. Tài liệu chấm \"Tất cả đều đúng\".</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Có 5 tiến trình đang chờ để được chạy thực hiện, giả sử thời gian chạy lần lượt là 10, 6, 5, 8 và 15 mili giây. Thứ tự thực hiện sẽ như thế nào để thời gian chờ trung bình là nhỏ nhất?",
 opts:["10, 6, 5, 8, 15","10, 8, 5, 6, 15","15, 8, 5, 6, 10","5, 6, 8, 10, 15"], ans:[3],
 expH:"<p>Chạy tiến trình <b>ngắn trước</b> (SJF): 5, 6, 8, 10, 15. Chờ: 0, 5, 11, 19, 29 → trung bình 12,8 ms.</p>"});
Q({ch:6,type:"single",topic:"Thư mục",sec:"s6-4",
 q:"________ là các file đặc biệt với danh sách các tên file và các thuộc tính của nó.",
 opts:["thư mục","các file dữ liệu","các file cơ sở dữ liệu","các chương trình"], ans:[0],
 expH:"<p>Trong nhiều hệ thống, <b>thư mục</b> cũng là một file, đặc biệt ở chỗ nội dung của nó là danh sách các entry (tên file kèm thuộc tính hoặc số i-node).</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"Hệ điều hành trên các máy tính mainframe cung cấp 3 loại dịch vụ:",
 opts:["Transaction processing, batch, time-sharing","Real-time, batch, time sharing","Real-time, time-sharing, protection","Batch, time-sharing, scheduler"], ans:[0],
 expH:"<p>Tanenbaum (mục \"Mainframe operating systems\"): HĐH mainframe thường cung cấp 3 loại dịch vụ là <b>batch</b>, <b>transaction processing</b> (xử lý giao dịch) và <b>timesharing</b>.</p>"+DOC("\"Real-time, batch, time sharing\" — không khớp giáo trình: mainframe không phải hệ thời gian thực")});
Q({ch:4,type:"single",topic:"Phân trang – độ dài địa chỉ",sec:"s4-7",
 q:"Nếu có 32 khung trang và kích thước của mỗi khung trang là 2048 words, địa chỉ vật lý sẽ là bao nhiêu bits?",
 opts:["16 bits","15 bits","19 bits","14 bits"], ans:[0],
 expH:"<p>32 = 2<sup>5</sup> khung → 5 bit. 2048 = 2<sup>11</sup> word → 11 bit offset. Tổng <b>16 bit</b> (đánh địa chỉ theo word).</p>"});
Q({ch:4,type:"single",topic:"LRU",sec:"s4-10",
 q:"Một máy tính cung cấp 4 khung trang (0–3) cho mỗi chương trình. Lần lượt các khung trang được truy cập theo thứ tự: 0 2 3 1 0 2 1 3 thì lỗi trang xảy ra. Vậy khung trang nào sẽ được thay thế nếu sử dụng thuật toán LRU?",
 opts:["Khung trang 0","Khung trang 1","Khung trang 3","Khung trang 2"], ans:[0],
 expH:"<p>Đọc từ phải sang trái: 3 (lần 8), 1 (lần 7), 2 (lần 6), 0 (lần 5). Khung <b>0</b> được dùng lần cuối sớm nhất → LRU chọn khung 0.</p>"});
Q({ch:6,type:"single",topic:"Quản lý không gian đĩa",sec:"s6-10",
 q:"Phương pháp nào được sử dụng để quản lý block free trên đĩa?",
 opts:["Danh sách liên kết","Bitmap","Danh sách liên kết và bitmap","Tất cả đều sai"], ans:[2],
 expH:"<p>Có 2 cách quản lý block trống: <b>danh sách liên kết</b> các block trống, và <b>bitmap</b> (mỗi block 1 bit).</p>"});
Q({ch:5,type:"single",topic:"Device driver",sec:"s5-8",
 q:"Lớp Driver của phần mềm Vào/Ra thực hiện các chức năng:",
 opts:["Thiết lập các thanh ghi, kiểm tra trạng thái của thiết bị, kiểm tra kết quả","Định khối, định bộ đệm, đặt tên, bảo vệ","Thực hiện các lời gọi Vào/Ra","Tất cả đều sai"], ans:[0],
 expH:"<p>Driver làm việc trực tiếp với thiết bị: ghi <b>thanh ghi</b> của bộ điều khiển, kiểm tra <b>trạng thái</b>, kiểm tra <b>kết quả</b>. Định khối, bộ đệm, đặt tên, bảo vệ là lớp độc lập thiết bị; thực hiện lời gọi I/O là lớp người dùng.</p>"});
Q({ch:5,type:"single",topic:"Phân lớp phần mềm Vào/Ra",sec:"s5-9",
 q:"Lớp nào trong 4 lớp của phần mềm Vào/Ra thực hiện \"Kiểm tra user có được phép sử dụng thiết bị\"?",
 opts:["Điều khiển ngắt","Phần mềm ở mức người dùng","Driver của thiết bị","Phần mềm độc lập với thiết bị"], ans:[3],
 expH:"<p>Theo bảng phân lớp của Tanenbaum, lớp <b>phần mềm độc lập thiết bị</b> lo: đặt tên, <b>bảo vệ</b>, tạo khối, buffering, cấp phát. Kiểm tra quyền dùng thiết bị là việc bảo vệ.</p><p>Lớp mức người dùng chỉ lo gọi I/O, định dạng, spooling.</p>"+DOC("\"Phần mềm ở mức người dùng\" — không khớp bảng phân lớp trong giáo trình")});
Q({ch:5,type:"single",topic:"Đĩa – bộ điều khiển",sec:"s5-10",
 q:"Bộ điều khiển của đĩa mềm sử dụng lệnh RECALIBRATE để:",
 opts:["Kiểm tra lỗi","Di chuyển cánh tay trỏ ra xa và thiết lập lại cylinder về 0","Thực thi thuật toán Elevator","Tất cả đều sai"], ans:[1],
 expH:"<p>Khi có lỗi seek, driver gửi RECALIBRATE: kéo cánh tay đầu từ <b>ra mép ngoài cùng</b> và đặt lại vị trí cylinder bên trong bộ điều khiển về <b>0</b>.</p>"});
Q({ch:5,type:"single",topic:"Đĩa – thời gian truy cập",sec:"s5-10",
 q:"Yếu tố thời gian nào ảnh hưởng lớn nhất đến thời gian đọc/ghi một khối trên đĩa?",
 opts:["Thời gian cánh tay tìm kiếm đến cylinder tiếp (seek time)","Thời gian trễ quay (rotational delay)","Thời gian truyền dữ liệu","Cả 3 phương án trên"], ans:[0],
 expH:"<p>Thời gian đọc một khối = seek + trễ quay + truyền. Tanenbaum: <i>\"với hầu hết các đĩa, thời gian seek chiếm phần lớn\"</i>. Vì thế các thuật toán lập lịch đĩa (SSF, Elevator) đều nhắm vào việc giảm seek.</p>"+DOC("ở một chỗ là \"Cả 3 phương án\" và ở chỗ khác là \"seek time\"")});
Q({ch:6,type:"single",topic:"Cấu trúc hệ thống file",sec:"s6-5",
 q:"Sector 0 của đĩa được gọi là ____. Nó dùng để boot máy tính.",
 opts:["Boot block","Super block","Free block","Master Boot Record"], ans:[3],
 expH:"<p>Sector 0 của cả đĩa là <b>MBR</b>: chứa chương trình khởi động và bảng phân vùng. Boot block là block đầu của <b>từng partition</b>.</p>"});
Q({ch:5,type:"single",topic:"Đĩa cứng – dung lượng",sec:"s5-10",
 q:"Giả sử rằng một đĩa cứng với 16 head, 16384 sector/toàn bộ đĩa. Hỏi đĩa này có dung lượng bao nhiêu MB?",
 opts:["32MB","128MB","64MB","8MB"], ans:[3],
 expH:"<p>Đề cho số sector của <b>toàn bộ đĩa</b>, nên số head không cần dùng. 16384 × 512 byte = 2<sup>14</sup> × 2<sup>9</sup> = 2<sup>23</sup> byte = <b>8 MB</b>.</p><p>Bẫy: nhân thêm 16 head sẽ ra 128 MB.</p>"});

/* ===== Phần 10: đề cuối kỳ, tiếp (trang 71–76) ===== */
Q({ch:4,type:"single",topic:"Bit Modified",sec:"s4-9",
 q:"Bit Modified (M) được sử dụng nhằm mục đích:",
 opts:["Cấp phát bộ nhớ.","Làm giảm thời gian thay thế trang khi lỗi trang xảy ra.","Thực thi thuật toán thay thế trang FIFO.","Tất cả đều sai."], ans:[1],
 expH:"<p>M = 1 nghĩa là trang đã bị sửa, khi đuổi ra phải ghi về đĩa. M = 0 thì bỏ luôn, không cần ghi. Nhờ bit M mà tránh được những lần ghi đĩa thừa, nên <b>thay trang nhanh hơn</b>.</p>"});
Q({ch:4,type:"single",topic:"Phân trang – độ dài địa chỉ",sec:"s4-7",
 q:"Nếu có 64 trang và kích thước trang là 2048 words. Cho biết độ dài của địa chỉ logic?",
 opts:["16 bits","15 bits","17 bits","14 bits"], ans:[2],
 expH:"<p>64 = 2<sup>6</sup> trang → 6 bit số trang. 2048 = 2<sup>11</sup> → 11 bit offset. Địa chỉ logic = 6 + 11 = <b>17 bit</b>.</p>"});
Q({ch:4,type:"single",topic:"Thay thế trang – bit R",sec:"s4-10",
 q:"Bit Reference (R) được sử dụng đến trong thuật toán:",
 opts:["FIFO.","Second chance","Optimal","LRU"], ans:[1],
 expH:"<p><b>Second chance</b> chính là FIFO có xét bit R: trang có R = 1 được xóa R và cho thêm một cơ hội.</p><p>LRU \"chuẩn\" dùng bộ đếm thời gian hoặc ngăn xếp để biết trang nào lâu chưa dùng, không dựa vào bit R; chỉ các bản <b>xấp xỉ</b> LRU (NFU, Aging) mới dùng R. FIFO và Optimal không dùng R.</p>"+DOC("\"LRU\" — cách hiểu đó chỉ đúng với các thuật toán xấp xỉ LRU")});
Q({ch:0,type:"multi",topic:"Chương 2 · Tiến trình",
 q:"Khi nào một tiến trình được tạo lập? (Chọn nhiều hơn 1 đáp án đúng)",
 opts:["Shutdown hệ thống.","Một user yêu cầu tạo ra tiến trình mới.","Hoàn thành công việc xử lý lô.","Thực hiện một lời gọi hệ thống để tạo lập tiến trình bằng cách chạy thực hiện tiến trình."], ans:[1,3],
 expH:"<p>Tanenbaum nêu 4 sự kiện tạo tiến trình: <b>khởi động hệ thống</b>, một tiến trình đang chạy <b>gọi system call</b> tạo tiến trình, <b>người dùng yêu cầu</b> tạo tiến trình, và <b>bắt đầu</b> một công việc xử lý lô.</p><p>Tắt máy (shutdown) và \"<b>hoàn thành</b>\" công việc lô không tạo tiến trình mới.</p>"});
Q({ch:0,type:"multi",topic:"Chương 3 · Đồng bộ",
 q:"Đồng bộ hóa giữa các tiến trình nhằm mục đích? (Chọn nhiều hơn 1 đáp án)",
 opts:["Yêu cầu độc quyền truy xuất đến đoạn chương trình dùng chung hoặc vùng bộ nhớ dùng chung.","Yêu cầu cùng phối hợp để hoàn tất một tác vụ.","Chia sẻ tài nguyên phần cứng.","Tất cả đều sai."], ans:[0,1],
 expH:"<p>Hai nhu cầu đồng bộ: <b>độc quyền truy xuất</b> (mỗi lúc chỉ một tiến trình dùng tài nguyên chung) và <b>phối hợp</b> (các tiến trình làm theo đúng thứ tự để cùng xong một việc, ví dụ producer – consumer).</p>"});
Q({ch:4,type:"multi",topic:"Bộ nhớ ảo",sec:"s4-6",
 q:"Phát biểu nào sau đây về bộ nhớ ảo là đúng? (Chọn nhiều hơn một câu trả lời)",
 opts:["Bộ nhớ ảo là vùng bộ nhớ mở rộng.","Phần lớn đó là ổ băng.","Có thể có một chương trình liên kết động đến thư viện ở thời điểm chạy thực hiện thay vì có chương trình dịch.","Có thể chạy thực hiện chương trình có kích thước lớn hơn nhiều so với kích thước bộ nhớ vật lý."], ans:[0,3],
 expH:"<p>Bộ nhớ ảo <b>mở rộng</b> bộ nhớ mà chương trình thấy, dùng đĩa (không phải băng từ) làm chỗ chứa phần chưa nạp. Nhờ đó chương trình <b>lớn hơn RAM</b> vẫn chạy được.</p><p>Liên kết thư viện lúc chạy là <b>liên kết động (dynamic linking)</b>, một kỹ thuật khác.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Thuật toán nào là thuật toán lập lịch preemptive?",
 opts:["Round Robin","Khác","Shortest Job First","FCFS"], ans:[0],
 expH:"<p><b>Round Robin</b> giành CPU khi hết quantum nên là preemptive. FCFS là non-preemptive; SJF ở dạng thường (không phải SRTF) cũng là non-preemptive.</p>"});
Q({ch:5,type:"multi",topic:"Thiết bị block / character",sec:"s5-1",
 q:"Phát biểu nào sau đây về thiết bị character là đúng? (Chọn nhiều hơn 1 đáp án)",
 opts:["Lưu giữ thông tin theo dãy các ký tự liên tiếp.","Không có bất cứ thao tác tìm kiếm (seek) nào.","Các thao tác trên thiết bị character là put, write.","Tất cả đều sai."], ans:[0,1],
 expH:"<p>Thiết bị character gửi / nhận dòng ký tự liên tiếp, không có địa chỉ khối nên <b>không seek được</b>. Thao tác của nó là <b>get, put</b>, không phải put, write.</p>"});

/* ===== Phần 11: đề cuối kỳ K19 (trang 77–80) ===== */
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (phần cứng)",
 q:"Trong hệ thống đơn bộ xử lý, loại trừ nhau có thể được đảm bảo bởi:",
 opts:["Phủ lấp các tiến trình","Xen kẽ các tiến trình","Vô hiệu hóa các ngắt","Tất cả"], ans:[2],
 expH:"<p>Với <b>một CPU</b>, tiến trình chỉ mất CPU khi có ngắt (ví dụ ngắt đồng hồ). <b>Tắt ngắt</b> ngay trước miền găng thì không ai chen vào được; ra khỏi miền găng thì bật lại. Cách này không dùng được trên máy nhiều CPU.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"____ chạy trên hệ thống có nhiều CPUs (multi-processors, multi-cores, multi-chips).",
 opts:["HĐH Embedded","HĐH PC","HĐH Multiprocessor","HĐH Server"], ans:[2],
 expH:"<p>Tanenbaum (mục \"Multiprocessor operating systems\"): HĐH đa xử lý chạy trên máy có nhiều CPU, kể cả nhiều nhân trên một chip.</p>"+DOC("\"HĐH PC\" — giáo trình chỉ nói HĐH PC ngày nay cũng bắt đầu phải xử lý nhiều nhân, còn tên đúng của loại này là HĐH Multiprocessor")});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"Hệ điều hành ____ được sử dụng cho nền tảng mạng.",
 opts:["Linux, NetWare, UNIX, Windows","Linux, Macintosh, MS-DOS, Windows 2000/XP","IRIX, UNICOS","IBM OS/390, Unix"], ans:[0],
 expH:"<p>Các HĐH dùng cho máy chủ / mạng: <b>Linux, NetWare, UNIX, Windows (Server)</b>. MS-DOS không có chức năng mạng; IRIX, UNICOS, OS/390 là HĐH cho siêu máy tính / mainframe.</p>"});
Q({ch:0,type:"multi",topic:"Chương 2 · Luồng (threads)",
 q:"Ích lợi của multithread trong kernel (luồng mức kernel) là: (Chọn nhiều đáp án)",
 opts:["Tạo và quản lý các thread ở mức thấp","Nếu một thread bị chặn không ảnh hưởng đến các thread khác","Phù hợp với kiến trúc nhiều bộ xử lý","Multithread quản lý trực tiếp bởi HĐH"], ans:[1,2],
 expH:"<p>Luồng mức kernel được kernel biết và lập lịch riêng từng luồng, nên:</p><ul><li>Một luồng bị chặn (chờ I/O) thì kernel vẫn chạy luồng khác của cùng tiến trình.</li><li>Các luồng có thể chạy <b>song song trên nhiều CPU</b>.</li></ul><p>\"Do HĐH quản lý trực tiếp\" là <b>đặc điểm</b>, không phải ích lợi. Hệ quả của đặc điểm đó còn là tạo luồng và đổi luồng <b>tốn kém hơn</b> (phải gọi kernel).</p>"+DOC("chỉ ý \"một thread bị chặn không ảnh hưởng thread khác\"")});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"Tên để chỉ cho phần lõi của hệ điều hành được gọi là ____",
 opts:["core","center","manager","kernel"], ans:[3],
 expH:"<p><b>Kernel</b> (nhân) là phần lõi của HĐH, chạy ở chế độ đặc quyền.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"____ phục vụ nhiều users ở cùng một thời điểm trên mạng và cho phép các user chia sẻ các tài nguyên phần cứng và các tài nguyên phần mềm.",
 opts:["HĐH Mainframe","HĐH PC","HĐH Multiprocessor","HĐH Server"], ans:[3],
 expH:"<p>Đúng định nghĩa <b>HĐH Server</b> trong Tanenbaum: phục vụ nhiều người dùng cùng lúc qua mạng, cho chia sẻ tài nguyên phần cứng và phần mềm.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Deadlock",
 q:"____ là hoạt động cho phép chỉ một tiến trình có thể truy cập đến một tài nguyên được chỉ ra.",
 opts:["Circular wait","Mutual exclusion","Resource holding","No preemption"], ans:[1],
 expH:"<p><b>Mutual exclusion</b> (loại trừ tương hỗ): mỗi lúc tài nguyên chỉ được cấp cho một tiến trình. Đây cũng là điều kiện đầu tiên trong 4 điều kiện gây deadlock.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ",
 q:"Để giải quyết tranh chấp giữa các bộ xử lý gọi là ____ tiến trình.",
 opts:["xử lý","giao tiếp","tính toán","đồng bộ"], ans:[3],
 expH:"<p>Giải quyết tranh chấp tài nguyên chung giữa các tiến trình / bộ xử lý gọi là <b>đồng bộ</b> tiến trình.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình",
 q:"Tiến trình bao gồm ____",
 opts:["Giá trị hiện tại của PC","Các biến","Các thanh ghi","Tất cả"], ans:[3],
 expH:"<p>Tiến trình là chương trình đang chạy cùng toàn bộ trạng thái của nó: <b>PC</b>, <b>thanh ghi</b>, <b>biến</b> (dữ liệu), stack…</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"Xử lý song song được gọi là ____",
 opts:["multiprocessing","divided processing","shared processing","uniprocessing"], ans:[0],
 expH:"<p>Nhiều CPU cùng xử lý song song: <b>multiprocessing</b> (đa xử lý). Uniprocessing là một CPU.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ",
 q:"Cơ chế đồng bộ nào sau đây dựa vào busy-waiting?",
 opts:["Peterson's algorithm","Message passing","Monitors","Khác"], ans:[0],
 expH:"<p>Peterson chờ bằng vòng lặp <code>while (flag[j] &amp;&amp; turn == j);</code>, tức là <b>busy waiting</b>. Message passing và monitor cho tiến trình <b>ngủ</b> (block) khi phải chờ.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"HĐH nhúng được định vị trên ____",
 opts:["ROM","RAM","DISK","BIOS"], ans:[0],
 expH:"<p>Thiết bị nhúng (TV, lò vi sóng, xe hơi…) thường không có đĩa: HĐH và phần mềm được nạp sẵn vào <b>ROM</b> và không đổi.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Luồng (threads)",
 q:"Giả sử hiện tại có 3 tiến trình A, B, C đang chờ lập lịch. A có 3 thread (A1, A2, A3); B có 2 thread (B1, B2); C có 4 thread (C1, C2, C3, C4). Quantum = 20ms, mỗi thread = 5ms. Hỏi thứ tự lập lịch trong user thread có thể là:",
 opts:["A1, A2, B1, B2, C1, C2, A3, A1, B1, B2, C3, C4, …","A1, A2, A3, A1, B1, B2, B1, B2, C1, C2, C3, C4, …","A1, B1, A2, B2, C1, C2, C3, C4, A3, A1, B1, B2, …","B1, B2, A1, A2, C1, C2, A3, A1, B1, B2, C3, C4, …"], ans:[1],
 expH:"<p>Mỗi tiến trình được 20 ms, mỗi luồng 5 ms → <b>4 lượt luồng</b> cho mỗi tiến trình, xoay vòng trong chính tiến trình đó:</p><ul><li>A: A1, A2, A3, A1</li><li>B: B1, B2, B1, B2</li><li>C: C1, C2, C3, C4</li></ul><p>Các dãy đổi tiến trình sau 2 luồng (10 ms) là sai.</p>"});

/* ===== Phần 12: đề K18 (trang 82) ===== */
Q({ch:0,type:"multi",topic:"Chương 2 · Luồng (threads)",
 q:"Ích lợi của đa luồng là gì? (Chọn nhiều hơn 1 đáp án đúng)",
 opts:["Khả năng hồi đáp và chia sẻ tài nguyên tốt hơn","Khởi tạo luồng có thể nhanh hơn 1000 lần","Hữu ích cho hệ thống đơn CPU","Số lần chuyển đổi giữa 2 luồng trong một tiến trình nhỏ nhất (chi phí chuyển đổi thấp)"], ans:[0,3],
 expH:"<ul><li>✔ Ứng dụng <b>phản hồi tốt hơn</b> (một luồng chờ, luồng khác vẫn phục vụ người dùng), và các luồng <b>dùng chung tài nguyên</b> của tiến trình.</li><li>✘ Tạo luồng nhanh hơn tạo tiến trình khoảng <b>10–100 lần</b> (Tanenbaum), không phải 1000 lần.</li><li>✔ Chuyển đổi giữa hai luồng cùng tiến trình rẻ hơn nhiều so với chuyển giữa hai tiến trình.</li></ul><p><small>Ý \"hữu ích cho hệ đơn CPU\" không được đánh dấu trong đáp án tài liệu.</small></p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Giả sử 4 job A–D có thời điểm đến và CPU burst time như bảng. Sử dụng thuật toán Round Robin với quantum = 4, thời gian xoay vòng (turnaround) trung bình là bao nhiêu?",
 figH:'<table class="q-tbl"><tr><th>Job</th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><th>Thời điểm đến</th><td>4</td><td>1</td><td>0</td><td>2</td></tr><tr><th>CPU burst time</th><td>5</td><td>2</td><td>6</td><td>4</td></tr></table>',
 opts:["42","10.5","6.25","25"], ans:[1],
 expH:"<table><tr><th>Thời gian</th><th>Chạy</th><th>Ghi chú</th></tr><tr><td>0–4</td><td>C</td><td>còn 2; B, D, A lần lượt đến</td></tr><tr><td>4–6</td><td>B</td><td>xong, turnaround 6 − 1 = 5</td></tr><tr><td>6–10</td><td>D</td><td>xong, 10 − 2 = 8</td></tr><tr><td>10–14</td><td>A</td><td>còn 1</td></tr><tr><td>14–16</td><td>C</td><td>xong, 16 − 0 = 16</td></tr><tr><td>16–17</td><td>A</td><td>xong, 17 − 4 = 13</td></tr></table><p>Turnaround trung bình = (5 + 8 + 16 + 13) ÷ 4 = 42 ÷ 4 = <b>10,5</b>.</p><p>Bẫy: 42 là <b>tổng</b>, chưa chia cho 4.</p>"});
Q({ch:0,type:"single",topic:"Chương 1 · Tổng quan",
 q:"Symbian, Palm, Windows Mobile, Windows CE là ____",
 opts:["HĐH PC","HĐH Handheld","HĐH Mainframe","HĐH Multiprocessor"], ans:[1],
 expH:"<p>Đây là các HĐH cho <b>thiết bị cầm tay</b> (handheld: PDA, điện thoại đời cũ).</p>"});

/* ===== Phần 13: đề cuối kỳ có đáp án (trang 83–93) – chỉ lấy câu chưa có ở trên ===== */
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Giả sử có các job A–D cùng mức ưu tiên đến Ready List với thời điểm đến và thời gian đốt cháy CPU như bảng. Sử dụng thuật toán Shortest Remaining Time (SRTF), thời gian chờ trung bình sẽ là ____.",
 figH:'<table class="q-tbl"><tr><th>Job</th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><th>Thời điểm đến</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>CPU burst</th><td>6</td><td>3</td><td>1</td><td>4</td></tr></table>',
 opts:["2,75","7,75","6,25","9,0"], ans:[0],
 expH:"<table><tr><th>Thời gian</th><th>Chạy</th><th>Lý do</th></tr><tr><td>0–1</td><td>A</td><td>chỉ có A</td></tr><tr><td>1–2</td><td>B</td><td>B (3) &lt; A còn 5</td></tr><tr><td>2–3</td><td>C</td><td>C (1) &lt; B còn 2 → C xong</td></tr><tr><td>3–5</td><td>B</td><td>B còn 2 &lt; D (4) → B xong</td></tr><tr><td>5–9</td><td>D</td><td>D (4) &lt; A còn 5</td></tr><tr><td>9–14</td><td>A</td><td>A xong</td></tr></table><p>Chờ = kết thúc − đến − burst: A = 14 − 0 − 6 = 8; B = 5 − 1 − 3 = 1; C = 3 − 2 − 1 = 0; D = 9 − 3 − 4 = 2. Trung bình = 11 ÷ 4 = <b>2,75</b>.</p><p>Bẫy: 6,25 là turnaround trung bình, không phải thời gian chờ.</p><p><small>Tài liệu gốc in phương án này là \"2,27\" (gõ nhầm), kèm ghi chú \"2.75\".</small></p>"});
Q({ch:5,type:"single",topic:"DMA",sec:"s5-4",
 q:"Kỹ thuật DMA (Direct Memory Access) được phát minh và áp dụng trong bộ điều khiển Đĩa, nhằm:",
 opts:["Giảm tải cho CPU khi gặp yêu cầu Vào/Ra","Tăng tốc độ truy cập bộ nhớ","Tăng tốc độ tính toán cho CPU khi gặp yêu cầu Vào/Ra","Tất cả đều đúng"], ans:[0],
 expH:"<p>DMA tự chép dữ liệu giữa thiết bị và RAM, xong mới ngắt CPU một lần. Mục đích chính là <b>giảm tải cho CPU</b>: CPU khỏi phải chép từng byte.</p><p>DMA không làm RAM nhanh hơn, cũng không làm CPU tính nhanh hơn. CPU chỉ <b>rảnh hơn</b> để làm việc khác trong lúc chờ I/O.</p>"+DOC("\"Tất cả đều đúng\" ở bản đáp án cuối tài liệu — hiểu theo nghĩa CPU rảnh tay nên tổng thể chạy nhanh hơn. Nếu đề thi của bạn dùng đáp án này thì chọn theo đề")});
Q({ch:5,type:"single",topic:"Đĩa cứng – dung lượng",sec:"s5-10",
 q:"Giả sử rằng một đĩa cứng với 32 head, 65536 sector/side. Hỏi đĩa này có dung lượng bao nhiêu?",
 opts:["2GB","512MB","1GB","4GB"], ans:[2],
 expH:"<p>32 head = 32 mặt. Mỗi mặt 65536 sector, mỗi sector 512 byte: 32 × 65536 × 512 = 2<sup>5</sup> × 2<sup>16</sup> × 2<sup>9</sup> = 2<sup>30</sup> byte = <b>1 GB</b>.</p>"});
Q({ch:6,type:"single",topic:"Phân mảnh đĩa",sec:"s6-6",
 q:"Chống phân mảnh (defragmentation) là gì?",
 opts:["Tăng tốc độ xử lý.","Sắp xếp lại các tiến trình trong hàng đợi để được xử lý","Sắp xếp lại dữ liệu trong bộ nhớ RAM","Sắp xếp các tập tin trong ổ đĩa lại để chúng chiếm không gian lưu trữ liền kề"], ans:[3],
 expH:"<p>Chống phân mảnh là dời các block để mỗi file nằm <b>liền một dải</b> trên đĩa, giúp đọc nhanh hơn. \"Tăng tốc\" là kết quả, không phải định nghĩa.</p>"});
Q({ch:0,type:"single",topic:"Chương 3 · Đồng bộ (miền găng)",
 q:"Giả sử giải pháp để giải quyết vấn đề mutual-exclusion cho 2 tiến trình P0 và P1 có mức ưu tiên như nhau được mô tả như hình. Tiến trình P0 vào CS khi turn = 0 và tiến trình P1 vào CS khi turn = 1. Tiến trình nào sẽ vào CS trước?",
 figH:CODE("int turn = 1;\n\n/* P0 */                         /* P1 */\nNonCS;                           NonCS;\nwhile (turn != 0); // wait       while (turn != 1); // wait\nCS;                              CS;\nturn = 1;                        turn = 0;\nNonCS;                           NonCS;"),
 opts:["P0 và P1 chờ mãi mãi bên ngoài CS","P0","Cả P0 và P1 đều vào CS","P1"], ans:[3],
 expH:"<p>Ban đầu <code>turn = 1</code>: P0 kẹt ở <code>while (turn != 0)</code>, còn P1 thấy <code>turn != 1</code> sai nên vào CS ngay. Ra khỏi CS, P1 đặt <code>turn = 0</code> nhường lượt cho P0 (luân phiên nghiêm ngặt).</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Lập lịch CPU",
 q:"Nhận xét nào sau đây là đúng?\nI. Lập lịch theo thuật toán SRTF có thể dẫn tới starvation CPU – tiến trình ở trong hàng đợi quá lâu, nhưng không được cung cấp CPU để sử dụng.\nII. Lập lịch theo thuật toán preemptive có thể dẫn tới starvation CPU.\nIII. Lập lịch theo thuật toán RR cho thời gian phản hồi tốt hơn so với thuật toán FCFS.",
 opts:["I, II và III","II và III","I","I và III"], ans:[0],
 expH:"<p>I đúng (tiến trình dài có thể bị chen mãi). II đúng vì chữ \"<b>có thể</b>\": SRTF, ưu tiên có preemptive đều là preemptive và đều có thể gây đói. III đúng: RR luân phiên nên mọi tiến trình sớm được chạy. Đáp án cuối tài liệu cũng chọn <b>I, II và III</b>.</p>"});
Q({ch:5,type:"single",topic:"Ngắt (interrupt)",sec:"s5-8",
 q:"ISR – Interrupt Service Routine là một tiến trình dịch vụ ngắt được khởi tạo bởi ngắt phần cứng, lệnh ngắt phần mềm hoặc ngoại lệ, được dùng để triển khai trình điều khiển thiết bị hoặc chuyển đổi giữa các chế độ hoạt động được bảo vệ như lời gọi hệ thống. CPU thường thực thi tiến trình dịch vụ ngắt ____",
 opts:["bằng cách kiểm tra thanh ghi ngắt tại các khoảng thời gian cố định","bằng cách kiểm tra thanh ghi ngắt sau khi kết thúc việc thực hiện câu lệnh hiện tại","bằng cách kiểm tra thanh ghi ở cuối chu kỳ tìm nạp","ngay khi một ngắt được đưa ra (raise)"], ans:[1],
 expH:"<p>CPU không bỏ dở lệnh đang chạy. <b>Làm xong lệnh hiện tại</b> rồi mới kiểm tra có ngắt chờ không; nếu có thì lưu PC và nhảy vào ISR.</p>"});
Q({ch:0,type:"single",topic:"Chương 2 · Tiến trình (fork)",
 q:"Thực thi đoạn code sau, hệ điều hành sẽ tạo ra bao nhiêu tiến trình (mới)?",
 figH:CODE("#include <sys/types.h>\n#include <unistd.h>\nint main() {\n    fork();\n    fork();\n    return 0;\n}"),
 opts:["7","8","6","3"], ans:[3],
 expH:"<p>Hai lần <code>fork()</code>: 1 → 2 → 4 tiến trình. Trừ tiến trình ban đầu thì có <b>3 tiến trình mới</b> được tạo ra (công thức 2<sup>n</sup> − 1).</p>"});
Q({ch:0,type:"multi",topic:"Chương 1 · Khởi động máy (BIOS)",
 q:"Phát biểu nào sau đây về BIOS là đúng? (chọn nhiều đáp án)",
 opts:["BIOS không được lưu giữ trong flash RAM","BIOS xác định các thiết bị boot bằng cách cố gắng tìm danh sách các thiết bị được lưu trong bộ nhớ CMOS","BIOS chứa các phần mềm I/O mức thấp, bao gồm các procedure để read bàn phím, write màn hình và thực hiện I/O disk","BIOS không thể được update bởi hệ điều hành khi bugs được tìm thấy trên nó"], ans:[1,2],
 expH:"<p>BIOS nằm trong <b>flash RAM</b> nên HĐH <b>cập nhật được</b> khi có lỗi. BIOS chứa phần mềm I/O mức thấp, và chọn thiết bị boot theo danh sách lưu trong <b>CMOS</b>.</p>"});
Q({ch:6,type:"single",topic:"FAT-32",sec:"s6-11",
 q:"Hệ điều hành sử dụng FAT32 để quản lý các file trên đĩa. Nếu kích thước block là 4KB, hỏi dung lượng của đĩa có thể lên đến bao nhiêu?",
 opts:["16TB","32TB","8TB","4TB"], ans:[0],
 expH:"<p>Theo cách tính của đề: 2<sup>32</sup> block × 4 KB = 2<sup>44</sup> byte = <b>16 TB</b>. Đáp án cuối tài liệu cũng là 16 TB.</p><p><small>Slide (Tanenbaum) ghi FAT-32 + block 4 KB = 1 TB, vì thực tế FAT-32 chỉ dùng 28 bit.</small></p>"});
Q({ch:4,type:"multi",topic:"Thay thế trang – bit R",sec:"s4-10",
 q:"Trong kỹ thuật bộ nhớ ảo. Để thay thế trang, bit Reference (R) được sử dụng trong thuật toán: (chọn nhiều đáp án)",
 opts:["Optimal","NRU","FIFO","Second chance"], ans:[1,3],
 expH:"<p><b>NRU</b> xếp lớp trang theo (R, M). <b>Second chance</b> là FIFO có xét R. FIFO và Optimal không dùng bit R.</p>"});
Q({ch:4,type:"single",topic:"Bộ nhớ của tiến trình (Linux)",
 q:"Phát biểu nào về data segment là đúng?",
 opts:["Data segment đơn thuần chỉ là read-only","Data segment không thể swap ra đĩa","Data segment không thể tăng kích thước","Data segment là nơi chứa tất cả các biến, string, array và các dữ liệu khác của chương trình"], ans:[3],
 expH:"<p>Data segment chứa <b>biến, chuỗi, mảng</b>… của chương trình. Nó ghi được, tăng được (heap) và swap được. Đoạn chỉ đọc là <b>text</b>.</p>"});
Q({ch:6,type:"multi",topic:"File thực thi",sec:"s6-2",
 q:"Magic number trên header của file thực thi nhằm để ____ và ____ (chọn nhiều đáp án)",
 opts:["Xác định file có thể thực thi","Kiểm tra các thuộc tính của file","Ngăn chặn việc thực thi ngẫu nhiên tệp không ở định dạng này","Cung cấp phương thức truy cập file"], ans:[0,2],
 expH:"<p>Magic number giúp HĐH <b>nhận ra file thực thi</b> và <b>không vô tình chạy</b> file sai định dạng.</p>"});
Q({ch:6,type:"single",topic:"Bitmap & cấp phát liên tục",sec:"s6-10",
 q:"Sau khi phân vùng đĩa được định dạng lần đầu tiên, bitmap sẽ như sau: 1000 0000 0000 0000 0000 (block đầu tiên dùng cho root directory). Hệ thống file sử dụng kỹ thuật cấp phát liên tục và luôn luôn tìm block xuất phát free có số nhỏ nhất, sau đó lần lượt: Ghi file A – 6 block; ghi file B – 5 block; Xóa file A; Ghi file C – 8 block; Xóa file B. Hỏi bitmap bây giờ có nội dung?",
 opts:["1111 1110 0000 1111 1111","1111 1110 0000 1100 0000","1111 1100 0000 1111 1111","1000 0000 0000 1111 1111"], ans:[3],
 expH:"<table><tr><th>Bước</th><th>Block</th><th>Bitmap</th></tr><tr><td>Ghi A</td><td>1–6</td><td>1111 1110 0000 0000 0000</td></tr><tr><td>Ghi B</td><td>7–11</td><td>1111 1111 1111 0000 0000</td></tr><tr><td>Xóa A</td><td>trả 1–6</td><td>1000 0001 1111 0000 0000</td></tr><tr><td>Ghi C (8 liền nhau)</td><td>12–19</td><td>1000 0001 1111 1111 1111</td></tr><tr><td>Xóa B</td><td>trả 7–11</td><td><b>1000 0000 0000 1111 1111</b></td></tr></table><p>C cần 8 block <b>liền nhau</b>; khoảng 1–6 chỉ có 6 nên C phải nằm ở 12–19.</p>"+DOC("\"1111 1110 0000 1100 0000\" ở bản đáp án cuối — tính lại thì không đúng: dãy đó vẫn còn file A, mà A đã bị xóa")});
Q({ch:4,type:"single",topic:"Quản lý bộ nhớ bằng bitmap",sec:"s4-5",
 q:"Kích thước của một đơn vị cấp phát (allocation unit) được thiết kế cực kỳ quan trọng trong quản lý bộ nhớ. Nếu một đơn vị cấp phát là 4 bytes, bộ nhớ 32n bits thì sẽ sử dụng n bits của Bitmap. Vì thế Bitmap sẽ cần ____ bộ nhớ.",
 opts:["n","1/32","8","1/8"], ans:[1],
 expH:"<p>Mỗi đơn vị 4 byte = 32 bit chỉ tốn 1 bit trong bitmap → bitmap chiếm <b>1/32</b> bộ nhớ.</p>"});
Q({ch:5,type:"single",topic:"Đĩa – định dạng",sec:"s5-10",
 q:"Lệnh format mức cao trên mỗi partition của đĩa nhằm mục đích ____",
 opts:["Đặt boot block, phần quản trị không gian free, root directory, và hệ thống file lên partition đó","Định dạng các dãy track, số sector trên mỗi track","Định dạng số cylinder và số sector","Đọc boot sector từ partition này và chạy nó"], ans:[0],
 expH:"<p>Format cấp cao tạo <b>hệ thống file</b>: boot block, cấu trúc quản lý chỗ trống, thư mục gốc. Track, sector, cylinder là việc của format cấp thấp.</p>"});
Q({ch:4,type:"single",topic:"Bảng trang – dịch địa chỉ",sec:"s4-7",
 q:"Giả sử một máy tính với 16 bits địa chỉ ảo sử dụng bảng trang một mức và 15 bits địa chỉ vật lý. Nội dung bảng trang được cho như hình. Địa chỉ vật lý ra sẽ được MMU ánh xạ là bao nhiêu với địa chỉ ảo vào là 1001 0000 0000 0100?",
 figH:'<table class="q-tbl"><tr><th>Trang ảo</th><th>Khung</th><th>Valid</th></tr><tr><td>0</td><td>010</td><td>1</td></tr><tr><td>1</td><td>011</td><td>1</td></tr><tr><td>2</td><td>100</td><td>1</td></tr><tr><td>3</td><td>000</td><td>0</td></tr><tr><td>4</td><td>000</td><td>0</td></tr><tr><td>5</td><td>000</td><td>0</td></tr><tr><td>6</td><td>001</td><td>1</td></tr><tr><td>7</td><td>000</td><td>1</td></tr><tr><td>8</td><td>101</td><td>1</td></tr><tr><td>9</td><td>000</td><td>0</td></tr><tr><td>10</td><td>000</td><td>0</td></tr><tr><td>11</td><td>110</td><td>1</td></tr><tr><td>12</td><td>000</td><td>0</td></tr><tr><td>13</td><td>000</td><td>0</td></tr><tr><td>14</td><td>000</td><td>0</td></tr><tr><td>15</td><td>111</td><td>1</td></tr></table>',
 opts:["110 0000 0000 0100","011 0000 0000 0100","001 0000 0000 0100","Lỗi trang"], ans:[3],
 expH:"<p>16 dòng → số trang 4 bit, offset 12 bit. Địa chỉ <code>1001 | 0000 0000 0100</code> → trang <b>9</b>. Dòng 9 có Valid = <b>0</b> → trang chưa có trong RAM → <b>lỗi trang</b>.</p>"});
Q({ch:4,type:"single",topic:"Second chance",sec:"s4-10",
 q:"Giả sử rằng có các trang lần lượt nạp vào bộ nhớ theo thứ tự ABCDEFGH, bit R của các trang từ A đến H theo thứ tự như sau: 11011011. Nếu lỗi trang xảy ra thì trang nào sẽ được thay thế nếu sử dụng thuật toán Second chance?",
 opts:["Trang D","Trang B","Trang C","Trang A"], ans:[2],
 expH:"<p>A (R = 1) → xóa R, đưa xuống cuối. B (R = 1) → xóa R, đưa xuống cuối. <b>C (R = 0)</b> → bị thay.</p>"});
Q({ch:5,type:"multi",topic:"Lập lịch đĩa – Elevator",sec:"s5-10",
 q:"Các yêu cầu truy xuất được gửi đến hàng đợi của đĩa theo thứ tự 171, 47, 126, 4, 124, 23, 500 và 76. Giả sử rằng đầu từ xuất phát ở cylinder 50 (đề không nói hướng). Thứ tự thực hiện sẽ như thế nào nếu sử dụng thuật toán Elevator?",
 opts:["50, 76, 124, 126, 171, 500, 47, 23, 4","50, 47, 23, 4, 76, 124, 126, 171, 500","50, 47, 23, 76, 124, 126, 171, 4, 500","50, 47, 76, 23, 4, 124, 126, 171, 500"], ans:[0,1],
 expH:"<p>Elevator đi hết một chiều rồi mới quay đầu. Đề không nói hướng nên có 2 khả năng:</p><ul><li>Đi lên trước: 50 → 76, 124, 126, 171, 500 → quay xuống 47, 23, 4.</li><li>Đi xuống trước: 50 → 47, 23, 4 → quay lên 76, 124, 126, 171, 500.</li></ul><p>Đáp án cuối tài liệu cũng đánh dấu cả hai. Hai phương án còn lại đổi chiều giữa chừng nên sai.</p>"});
Q({ch:5,type:"single",topic:"Device driver",sec:"s5-8",
 q:"____ yêu cầu trình điều khiển thiết bị (device driver) như một bộ dịch chuyển (translator) giữa thiết bị phần cứng và các ứng dụng hoặc hệ điều hành sử dụng nó.",
 opts:["Register","Cache","RAM","Disk"], ans:[3],
 expH:"<p>Chỉ <b>thiết bị Vào/Ra</b> như đĩa mới cần driver để \"dịch\" yêu cầu chung của HĐH thành lệnh riêng của thiết bị. Thanh ghi, cache, RAM được CPU truy cập trực tiếp.</p>"});

L.forEach(function(q, i){ q.id = "ot3-" + ("00" + (i + 1)).slice(-3); q.set = "ot3"; q.exp = q.exp || ""; });
window.QUESTIONS.push.apply(window.QUESTIONS, L);
/* Chia đôi theo số câu còn lại sau khi lược trùng (QDROP nạp trước file này): nửa đầu đánh dấu ot3, nửa sau ot4 (dùng để gom đề trong ontap_sets.js).
   Mã câu giữ nguyên dạng ot3-xxx để không mất tiến độ đã làm. */
var DROP = window.QDROP || {}, kept = L.filter(function(q){ return !DROP[q.id]; });
var cut = L.indexOf(kept[Math.ceil(kept.length / 2)]);
L.slice(cut).forEach(function(q){ q.set = "ot4"; });
})();
