/* Câu bổ sung từ các tài liệu: DaCoDA, DaCoDA2, ChuaCoDa, ChuaCoDA2, đề K23 (Tổng hợp NLHĐH K23),
   tai-lieu-os-adf, NLHĐH - Cuối kì (Google form). Đã bỏ câu trùng với các đề có sẵn.
   Đáp án do tự giải và đối chiếu; chỗ tài liệu ghi khác có ghi chú. set: "ot5" (được gom theo chương trong ontap_sets.js). */
window.QUESTIONS = window.QUESTIONS || [];
(function(){
var L = [];
function Q(o){ L.push(o); }
var DOC = function(x){ return '<p class="muted"><small>Tài liệu gốc ghi đáp án ' + x + '.</small></p>'; };
var TB = function(head, rows){ return '<table class="q-tbl"><tr>' + head.map(function(h){ return '<th>' + h + '</th>'; }).join("") + '</tr>' + rows.map(function(r){ return '<tr>' + r.map(function(c){ return '<td>' + c + '</td>'; }).join("") + '</tr>'; }).join("") + '</table>'; };
var PRIO = TB(["Tiến trình","Thời điểm vào (ms)","Thời gian thực thi (ms)","Độ ưu tiên"], [["P1",1,4,2],["P2",3,8,4],["P3",6,6,3],["P4",4,3,1]]);

/* ================= Chương 2 ================= */
Q({ch:4,type:"multi",topic:"Second chance",sec:"s4-10",
 q:"Thuật toán thay thế trang second-chance ________ (chọn nhiều đáp án)",
 opts:["di chuyển các trang đầu FIFO queue có bit Reference bằng 1 vào cuối hàng đợi để tránh thay thế chúng","tìm qua danh sách liên kết vòng và thay thế khi gặp trang đầu tiên có bit Reference bằng 0","dựa vào bit Modified để xác định trang nào cần thay","dựa vào bit Reference để xác định trang nào cần thay"],
 ans:[0,1,3],
 expH:"<p>Second chance = FIFO có xem <b>bit R</b>: trang đầu hàng có R = 1 thì được <b>xóa R và đưa xuống cuối hàng</b> (ý 1); gặp trang R = 0 thì thay. Cài đặt bằng <b>danh sách vòng</b> với kim đồng hồ chính là Clock (ý 2), kết quả y hệt. Thuật toán chỉ dựa vào bit R (ý 4), không dùng bit M.</p>" + DOC("b và d (bỏ ý 1); theo giáo trình ý 1 cũng đúng")});
Q({ch:2,type:"single",topic:"Luồng",sec:"s2-4",
 q:"Những phần nào sau đây KHÔNG được chia sẻ giữa các thread trong một tiến trình?\nI. PC (Program Counter)\nII. Stack\nIII. Registers\nIV. Không gian địa chỉ",
 opts:["I và II","II và III","I, II và III","IV"], ans:[2],
 expH:"<p>Mỗi luồng có riêng <b>PC, thanh ghi, stack</b> (và trạng thái) vì mỗi luồng chạy tới một chỗ khác nhau. <b>Không gian địa chỉ</b> thì cả tiến trình dùng chung. → <b>I, II và III</b>.</p>"});
Q({ch:2,type:"single",topic:"Luồng",sec:"s2-4",
 q:"Đối với các thread cùng thuộc chung 1 tiến trình thì tài nguyên nào sau đây không được chia sẻ giữa các thread?",
 opts:["Ngăn xếp (Stack)","Code","Dữ liệu (data)","Quản lý file"], ans:[0],
 expH:"<p>Code, data, file đang mở là của tiến trình nên các luồng dùng chung. Mỗi luồng gọi hàm khác nhau nên phải có <b>stack riêng</b>.</p>"});
Q({ch:2,type:"single",topic:"Lập lịch CPU",sec:"s2-7",
 q:"Một hệ thống có 4 tiến trình như bảng. Hệ thống sử dụng phương pháp lập lịch theo độ ưu tiên không độc quyền… (độc quyền). Hãy cho biết thời điểm thực xong tất cả các tiến trình?",
 figH:PRIO, opts:["19","20","21","22"], ans:[3],
 expH:"<p>CPU bắt đầu lúc 1 (P1 đến lúc 1) và từ đó <b>không lúc nào rảnh</b> (luôn có tiến trình chờ). Tổng thời gian chạy = 4 + 8 + 6 + 3 = 21 → xong lúc 1 + 21 = <b>22</b>, dù chọn theo thứ tự ưu tiên nào.</p><p>Chạy cụ thể (số nhỏ = ưu tiên cao): P1 1–5 · P4 5–8 · P3 8–14 · P2 14–22.</p>"});
Q({ch:2,type:"single",topic:"Lập lịch CPU",sec:"s2-7",
 q:"Với 4 tiến trình như bảng, hệ thống lập lịch theo độ ưu tiên độc quyền (số nhỏ = ưu tiên cao). Thời gian chờ trung bình của các tiến trình là?",
 figH:PRIO, opts:["3.5","4","Đáp án khác","3"], ans:[0],
 expH:"<p>Độc quyền nên chỉ chọn lại khi tiến trình đang chạy xong:</p><table><tr><th>Lúc</th><th>Hàng đợi</th><th>Chọn</th><th>Chạy</th><th>Chờ</th></tr><tr><td>1</td><td>P1</td><td>P1</td><td>1–5</td><td>0</td></tr><tr><td>5</td><td>P2 (ưu tiên 4), P4 (1)</td><td>P4</td><td>5–8</td><td>5 − 4 = 1</td></tr><tr><td>8</td><td>P2 (4), P3 (3)</td><td>P3</td><td>8–14</td><td>8 − 6 = 2</td></tr><tr><td>14</td><td>P2</td><td>P2</td><td>14–22</td><td>14 − 3 = 11</td></tr></table><p>TB = (0 + 1 + 2 + 11) / 4 = <b>3,5</b>.</p>"});
Q({ch:2,type:"single",topic:"Lập lịch CPU",sec:"s2-7",
 q:"Xét 5 tiến trình với thời điểm đến, thời gian CPU cần thiết và độ ưu tiên như bảng (số càng nhỏ thì ưu tiên càng cao). Nếu chính sách lập lịch CPU là FCFS thì thời gian chờ trung bình là:",
 figH:TB(["Process","Arrival (ms)","CPU time (ms)","Priority"], [["P1",0,10,5],["P2",0,5,2],["P3",2,3,1],["P4",5,20,4],["P5",10,2,3]]),
 opts:["10ms","6ms","12.8ms","8ms"], ans:[2],
 expH:"<p>FCFS bỏ qua độ ưu tiên, chạy theo thứ tự đến (P1 và P2 cùng đến lúc 0, P1 đứng trước):</p><p>P1 0–10 (chờ 0) · P2 10–15 (chờ 10) · P3 15–18 (chờ 13) · P4 18–38 (chờ 13) · P5 38–40 (chờ 28).</p><p>TB = (0 + 10 + 13 + 13 + 28) / 5 = 64 / 5 = <b>12,8 ms</b>.</p>"});
Q({ch:2,type:"single",topic:"Lập lịch CPU",sec:"s2-7",
 q:"Một tiến trình có thể bị trì hoãn vô thời hạn trong thuật toán lập lịch nào sau đây?",
 opts:["First-Come, First-Served (FCFS)","Multilevel Queue Scheduling","Priority Scheduling","Round Robin (RR)"], ans:[2],
 expH:"<p>Lập lịch theo <b>độ ưu tiên</b>: tiến trình ưu tiên thấp có thể chờ mãi nếu luôn có tiến trình ưu tiên cao hơn đến → <b>đói (starvation)</b>, chữa bằng aging. FCFS và RR thì ai cũng tới lượt.</p>"});
Q({ch:2,type:"single",topic:"Lập lịch CPU",sec:"s2-7",
 q:"Cho bảng số liệu: P1 (đến 0, burst 24), P2 (đến 1, burst 3), P3 (đến 2, burst 3). Tổng thời gian chờ của các tiến trình là bao nhiêu nếu dùng thuật toán RR với q = 4?",
 opts:["24s","25s","14s","30s"], ans:[2],
 expH:"<p>RR q = 4: P1 0–4 → P2 4–7 (xong) → P3 7–10 (xong) → P1 10–30.</p><p>Chờ = xong − đến − burst: P1 = 30 − 0 − 24 = 6; P2 = 7 − 1 − 3 = 3; P3 = 10 − 2 − 3 = 5. Tổng = <b>14</b>.</p>"});
Q({ch:2,type:"single",topic:"Lập lịch CPU",sec:"s2-7",
 q:"Điều nào sau đây nói đúng về giải thuật Round-Robin?",
 opts:["Có thời gian chờ của tiến trình lớn","Không được ưu tiên trước","Theo giải thuật này thì có những tiến trình có mức ưu tiên thấp có thể không bao giờ được thực hiện","Có thời gian chờ của tiến trình lâu hơn so với giải thuật SJF"], ans:[3],
 expH:"<p>Slide 47: RR có thời gian xoay vòng (và chờ) trung bình <b>cao hơn SJF</b>, đổi lại hồi đáp tốt. RR là preemptive (giành quyền khi hết quantum) và không gây đói. Ý \"thời gian chờ lớn\" nói chung chung, không phải đặc điểm định nghĩa.</p>"});
Q({ch:2,type:"single",topic:"Lập lịch CPU",sec:"s2-7",
 q:"Ta có các tiến trình (T0 = thời điểm đến, T1 = thời gian chạy): P1(0,10); P2(3,20); P3(10,7); P4(11,1); P5(16,7). Thời gian đáp ứng của P2 theo SRTF là:",
 opts:["26","24","23","25"], ans:[3],
 expH:"<p>SRTF: 0–10 P1 (P2 đến lúc 3 nhưng 20 &gt; 7 còn lại) · 10–11 P3 · 11–12 P4 (1 &lt; 6) · 12–18 P3 · 18–25 P5 (7 &lt; 20) · <b>25–45 P2</b>.</p><p>P2 được CPU lần đầu lúc <b>25</b>. Đề tính thời gian đáp ứng theo mốc bắt đầu chạy nên chọn 25. <small>(Nếu trừ thời điểm đến thì 25 − 3 = 22, không có phương án.)</small></p>"});
Q({ch:2,type:"single",topic:"Lập lịch CPU",sec:"s2-6",
 q:"Tại sao trong các hệ thống đơn chương xử lý theo lô không cần thực hiện điều phối tiến trình?",
 opts:["Hệ thống chỉ nạp một tiến trình, chỉ chạy tiến trình đó","Hệ thống tự quyết định tiến trình nào được xử lý không cần giải thuật","Các tiến trình chạy theo thứ tự lần lượt","CPU quyết định tiến trình được xử lý"], ans:[0],
 expH:"<p>Đơn chương = trong bộ nhớ <b>chỉ có một tiến trình</b>; nó chạy tới khi xong rồi mới nạp tiến trình kế. Không có ai để chọn nên không cần bộ lập lịch CPU.</p>" + DOC("B")});
Q({ch:2,type:"single",topic:"Tiến trình",sec:"s2-3",
 q:"Trong các chuyển trạng thái của tiến trình sau đây, chuyển trạng thái nào là không hợp lệ?",
 opts:["ready → running","running → ready","blocked → running","blocked → ready"], ans:[2],
 expH:"<p>Chờ I/O xong, tiến trình chỉ được về <b>Ready</b> rồi xếp hàng đợi bộ lập lịch chọn. Không có đường <b>Blocked → Running</b>.</p>"});
Q({ch:2,type:"single",topic:"Tiến trình",sec:"s2-2",
 q:"Trong Linux, lệnh nào hiển thị cây tiến trình?",
 opts:["pstree","more","ps","ls"], ans:[0],
 expH:"<p><code>pstree</code> vẽ các tiến trình theo <b>cây cha – con</b> (phân cấp tiến trình, slide 10). <code>ps</code> chỉ liệt kê dạng bảng; <code>ls</code> liệt kê file; <code>more</code> xem file theo trang.</p>"});
Q({ch:2,type:"single",topic:"Đồng bộ · Miền găng",sec:"s2-9",
 q:"Vùng găng (critical section) là đoạn chương trình ________.",
 opts:["chạy trong khoảng thời gian nhất định","truy cập tài nguyên được chia sẻ","sử dụng semaphore","tránh deadlock"], ans:[1],
 expH:"<p>Slide 60: đoạn găng là <b>phần chương trình truy cập bộ nhớ (tài nguyên) dùng chung</b>. Semaphore là công cụ bảo vệ đoạn găng, không phải định nghĩa của nó.</p>"});
Q({ch:2,type:"single",topic:"Đồng bộ · Semaphore",sec:"s2-11",
 q:"Trong quản lý tiến trình, vai trò của semaphore là gì?",
 opts:["Đồng bộ truy cập của nhiều tiến trình tới tài nguyên dùng chung","Cấp phát bộ nhớ","Quản lý thiết bị I/O","Tạo các tiến trình mới"], ans:[0],
 expH:"<p>Semaphore (Down/Up) dùng để <b>đồng bộ</b>: bảo đảm loại trừ lẫn nhau khi vào đoạn găng (s = 1) hoặc định thứ tự giữa các tiến trình (s = 0).</p>"});
Q({ch:2,type:"single",topic:"Đồng bộ · Semaphore",sec:"s2-11",
 q:"Thế nào là Semaphore?",
 opts:["Kỹ thuật dùng cờ báo hiệu","Kỹ thuật lập trình","Phần cứng đồng bộ hóa","Kỹ thuật không dùng cờ báo hiệu"], ans:[0],
 expH:"<p>Semaphore nghĩa là \"đèn hiệu / cờ báo hiệu\": một biến nguyên cho biết tài nguyên còn dùng được hay không, tiến trình nhìn \"cờ\" đó để vào hoặc ngủ chờ. Nó là cơ chế phần mềm do HĐH cung cấp, không phải phần cứng.</p>"});
Q({ch:2,type:"multi",topic:"Đồng bộ · Khái niệm",sec:"s2-9",
 q:"Tại sao cần thực hiện đồng bộ hóa trong hệ thống? (chọn nhiều đáp án)",
 opts:["Vì cần có sự phối hợp của các tiến trình khi thực hiện","Vì cần có sự tham gia của CPU","Vì yêu cầu từ phía tiến trình","Vì tài nguyên của hệ thống có hạn"], ans:[0,3],
 expH:"<p>Hai lý do đồng bộ: (1) tài nguyên dùng chung <b>có hạn</b> nên phải độc quyền truy xuất (loại trừ lẫn nhau); (2) các tiến trình tương tác cần <b>phối hợp</b> để hoàn tất công việc (định thứ tự).</p>"});

/* ================= Chương 4 ================= */
Q({ch:4,type:"single",topic:"NRU",sec:"s4-10",
 q:"Giả sử một máy tính với 4 page frame (0–3). Thời gian nạp (Loaded), thời gian truy cập sau cùng (Last Ref), giá trị của bit R, M của mỗi trang được cho như hình (thời gian tính bằng clock ticks). Hỏi trang nào sẽ được thay thế khi lỗi trang xảy ra nếu sử dụng thuật toán thay thế trang NRU (Hình QN51)?",
 figH:TB(["Page","Loaded","Last Ref.","R","M"], [[0,230,285,1,0],[1,120,265,0,0],[2,140,270,0,1],[3,110,280,1,1]]),
 opts:["Trang 1","Trang 2","Trang 0","Trang 3"], ans:[0],
 expH:"<p>NRU chia trang theo cặp (R, M), bỏ một trang ở <b>lớp thấp nhất</b>:</p><table><tr><th>Lớp</th><th>(R, M)</th><th>Trang</th></tr><tr><td>0</td><td>(0, 0)</td><td><b>Trang 1</b></td></tr><tr><td>1</td><td>(0, 1)</td><td>Trang 2</td></tr><tr><td>2</td><td>(1, 0)</td><td>Trang 0</td></tr><tr><td>3</td><td>(1, 1)</td><td>Trang 3</td></tr></table><p>→ thay <b>Trang 1</b>. Cột Loaded / Last Ref chỉ để gây nhiễu (dùng cho FIFO / LRU).</p>"});
Q({ch:4,type:"single",topic:"LRU",sec:"s4-10",
 q:"Xác định số lần xảy ra lỗi trang biết thuật toán thay thế trang là LRU và các page tham chiếu theo thứ tự 1, 2, 4, 5, 2, 1, 2, 4. Giả sử bộ nhớ vật lý chỉ có 3 frame (0, 1, 2) và page 1, 2 theo thứ tự đã được nạp vào bộ nhớ vật lý.",
 opts:["3","4","5","6"], ans:[1],
 expH:"<table><tr><th>Tham chiếu</th><th>Khung</th><th>Kết quả</th></tr><tr><td>1</td><td>1, 2, –</td><td>có sẵn</td></tr><tr><td>2</td><td>1, 2, –</td><td>có sẵn</td></tr><tr><td>4</td><td>1, 2, 4</td><td><b>lỗi</b> (khung trống)</td></tr><tr><td>5</td><td>5, 2, 4</td><td><b>lỗi</b>, bỏ 1 (lâu nhất chưa dùng)</td></tr><tr><td>2</td><td>5, 2, 4</td><td>có sẵn</td></tr><tr><td>1</td><td>5, 2, 1</td><td><b>lỗi</b>, bỏ 4</td></tr><tr><td>2</td><td>5, 2, 1</td><td>có sẵn</td></tr><tr><td>4</td><td>4, 2, 1</td><td><b>lỗi</b>, bỏ 5</td></tr></table><p>Tổng <b>4</b> lỗi trang (4, 5, 1, 4).</p>"});
Q({ch:4,type:"single",topic:"LRU",sec:"s4-10",
 q:"Một bộ nhớ có 3 khung trang, hỏi có bao nhiêu lần lỗi trang xảy ra với chiến lược thay thế trang LRU và dãy truy nhập vào các trang nhớ theo thứ tự: 2 5 2 7 3 6 4 6 5 4 2 3 17",
 opts:["10","12","13","11"], ans:[0],
 expH:"<p>LRU, 3 khung (bỏ trang lâu nhất chưa dùng):</p><p>2 <b>F</b> · 5 <b>F</b> · 2 hit · 7 <b>F</b> [2,5,7] · 3 <b>F</b> bỏ 5 · 6 <b>F</b> bỏ 2 · 4 <b>F</b> bỏ 7 · 6 hit · 5 <b>F</b> bỏ 3 · 4 hit · 2 <b>F</b> bỏ 6 · 3 <b>F</b> bỏ 5 · 17 <b>F</b> bỏ 4.</p><p>Tổng <b>10</b> lỗi trang (đề xem \"17\" là một trang). <small>Nếu đọc thành hai trang 1 và 7 thì ra 11.</small></p>"});
Q({ch:4,type:"single",topic:"Optimal",sec:"s4-10",
 q:"Một bộ nhớ có 3 khung trang, hỏi có bao nhiêu lần lỗi trang xảy ra với chiến lược thay thế trang Tối ưu (Optimal) và dãy truy nhập: 2 5 2 7 3 6 4 6 5 4 2 3 1",
 opts:["8","10","9","7"], ans:[2],
 expH:"<p>Optimal bỏ trang <b>lâu nhất mới được dùng lại</b> (hoặc không bao giờ dùng lại):</p><p>2 F · 5 F · 2 hit · 7 F [2,5,7] · 3 F bỏ 7 (không dùng lại) · 6 F bỏ 3 (dùng lại muộn nhất) · 4 F bỏ 2 · 6 hit · 5 hit · 4 hit · 2 F · 3 F · 1 F.</p><p>Tổng <b>9</b> lỗi trang.</p>" + DOC("10")});
Q({ch:4,type:"single",topic:"Optimal",sec:"s4-10",
 q:"Thuật toán thay thế trang nào khó có thể triển khai thực tế, chỉ dùng để so sánh học thuật?",
 opts:["Thuật toán tối ưu Optimal","Thuật toán FIFO","Thuật toán xấp xỉ LRU","Thuật toán LRU"], ans:[0],
 expH:"<p>Optimal cần biết <b>trước tương lai</b> (trang nào lâu nhất mới được dùng lại) nên không cài được thật; chỉ dùng làm <b>mốc so sánh</b> cho các thuật toán khác.</p>"});
Q({ch:4,type:"single",topic:"Phân trang – khái niệm",sec:"s4-6",
 q:"Trong kỹ thuật phân trang, khối dữ liệu có kích thước cố định của bộ nhớ vật lý được gọi là ______",
 opts:["Page","Segment","Page frame","Block"], ans:[2],
 expH:"<p><b>Trang (page)</b> là khối của bộ nhớ <b>ảo / logic</b>; <b>khung trang (page frame)</b> là khối cùng kích thước của bộ nhớ <b>vật lý</b>. Segment là đoạn có kích thước thay đổi.</p>"});
Q({ch:4,type:"single",topic:"Lỗi trang",sec:"s4-9",
 q:"Lỗi trang xảy ra khi trang cần tham chiếu ________",
 opts:["thuộc một yêu cầu Vào/Ra không chính xác","không nằm trên thiết bị lưu trữ","vượt khỏi phạm vi bộ nhớ cấp phát","không nằm trong bộ nhớ chính"], ans:[3],
 expH:"<p>Lỗi trang (page fault) = trang hợp lệ nhưng <b>chưa có trong RAM</b> (bit present = 0), HĐH phải nạp từ đĩa. Truy cập vượt phạm vi cấp phát là lỗi bảo vệ / địa chỉ không hợp lệ, không phải lỗi trang.</p>"});
Q({ch:4,type:"single",topic:"Phân mảnh & nén",sec:"s4-4",
 q:"Sự nén dữ liệu (compaction/defrag) đề cập đến ________",
 opts:["một kỹ thuật khắc phục sự phân mảnh trong (internal fragmentation)","một kỹ thuật phân trang (paging)","một kỹ thuật khắc phục phân mảnh ngoài (external fragmentation)","Không có ý nào đúng"], ans:[2],
 expH:"<p>Nén = dồn các vùng đang dùng lại với nhau để gom các lỗ trống nhỏ thành một vùng liền → chữa <b>phân mảnh ngoài</b>. Phân mảnh trong (phần thừa bên trong vùng đã cấp) không chữa được bằng nén.</p>"});
Q({ch:4,type:"single",topic:"Tổng hợp khái niệm",sec:"s4-9",
 q:"Nối cột A và cột B với nhau:\nCột A: (1) Swapping · (2) Thrashing · (3) Disk scheduling · (4) Buddy system\nCột B: (a) Giảm hiệu suất · (b) C-SCAN / Elevator · (c) Quản lý bộ nhớ · (d) Chuyển dữ liệu đến/đi ổ đĩa",
 opts:["1-d, 2-c, 3-a, 4-b","1-d, 2-a, 3-b, 4-c","1-c, 2-a, 3-b, 4-d","1-d, 2-b, 3-a, 4-c"], ans:[1],
 expH:"<ul><li><b>Swapping</b>: chuyển cả tiến trình ra/vào đĩa → (d).</li><li><b>Thrashing</b>: lỗi trang liên tục, CPU chỉ lo đổi trang → <b>giảm hiệu suất</b> (a).</li><li><b>Disk scheduling</b>: C-SCAN, Elevator → (b).</li><li><b>Buddy system</b>: một cách cấp phát / quản lý bộ nhớ → (c).</li></ul>"});
Q({ch:4,type:"single",topic:"Cấp phát khung trang",sec:"s4-9",
 q:"Một hệ điều hành chạy 3 tiến trình người dùng, mỗi tiến trình yêu cầu 2 page bộ nhớ. Vậy số lượng frame trống tối thiểu là bao nhiêu để không bao giờ xảy ra tình trạng deadlock?",
 opts:["3","5","4","6"], ans:[2],
 expH:"<p>Trường hợp xấu nhất: mỗi tiến trình đã giữ 1 frame và chờ frame thứ 2 → với 3 frame thì cả 3 kẹt (deadlock). Thêm <b>1 frame</b> nữa thì chắc chắn có một tiến trình đủ 2 frame, chạy xong và nhả ra cho người khác.</p><div class=\"formula\">Tối thiểu = n × (k − 1) + 1 = 3 × (2 − 1) + 1 = <b>4</b></div>"});
Q({ch:4,type:"single",topic:"Bảng trang – dịch địa chỉ",sec:"s4-7",
 q:"Giả sử một máy tính với 16 bits địa chỉ ảo dùng bảng trang một mức và 15 bits địa chỉ vật lý. Nội dung bảng trang như hình (trang 1 → khung 011, P/A = 1). Địa chỉ vật lý nào mà MMU sẽ ánh xạ với địa chỉ ảo 0001 0000 0000 0100?",
 figH:TB(["Trang ảo","Khung","P/A"], [[0,"010",1],[1,"011",1],[2,"100",1],[3,"000",0],["…","…","…"],[8,"101",1],[9,"000",0],[11,"110",1],[15,"111",1]]),
 opts:["Lỗi trang","011 0000 0000 0100","100 0000 0000 0100","110 0000 0000 0000"], ans:[1],
 expH:"<p>4 bit đầu <code>0001</code> = trang <b>1</b>; 12 bit sau là offset <code>0000 0000 0100</code>.</p><p>Bảng trang: trang 1 → khung <b>011</b>, P/A = 1 (có trong RAM) → ghép khung với offset: <b>011 0000 0000 0100</b>. Không phải lỗi trang (chỉ trang có P/A = 0 mới lỗi).</p>"});
Q({ch:4,type:"single",topic:"Phân trang – độ dài địa chỉ",sec:"s4-7",
 q:"Một máy tính cung cấp 65536 khung trang và kích thước mỗi khung trang là 4096 bytes. Địa chỉ vật lý sẽ là bao nhiêu bits nếu đánh địa chỉ theo từ (1 từ nhớ = 8 byte)?",
 opts:["25 bits","26 bits","27 bits","28 bits"], ans:[0],
 expH:"<p>Dung lượng = 2<sup>16</sup> × 2<sup>12</sup> = 2<sup>28</sup> byte. Đánh địa chỉ theo <b>từ 8 byte</b> → số từ = 2<sup>28</sup> / 2<sup>3</sup> = 2<sup>25</sup> → cần <b>25 bit</b>. (Nếu đánh theo byte thì 28 bit.)</p>"});
Q({ch:4,type:"single",topic:"Copy-on-write",sec:"s4-11",
 q:"Kỹ thuật Copy-on-write (COW) là gì trong quản lý bộ nhớ?",
 opts:["Một kỹ thuật trì hoãn việc sao chép trang bộ nhớ cho đến khi có thay đổi xảy ra","Một kỹ thuật thay đổi cấu trúc dữ liệu của tiến trình khi chuyển đổi ngữ cảnh","Một kỹ thuật ghi dữ liệu trực tiếp vào bộ nhớ chính mà không cần sao chép","Một kỹ thuật chia sẻ tài nguyên giữa các tiến trình để giảm kích thước bộ nhớ"], ans:[0],
 expH:"<p>Sau <code>fork()</code>, cha và con <b>dùng chung</b> các trang (đánh dấu chỉ đọc). Chỉ khi một bên <b>ghi</b> vào trang thì HĐH mới sao chép trang đó ra bản riêng. Nhờ vậy fork nhanh và tiết kiệm RAM. <span class=\"xs\">ngoài slide</span></p>"});

/* ================= Chương 5 ================= */
Q({ch:5,type:"single",topic:"Đĩa – thời gian truy cập",sec:"s5-10",
 q:"________ là thời gian cần thiết để di chuyển cánh tay đĩa (disk arm) đến rãnh yêu cầu.",
 opts:["Thời gian tìm kiếm (Seek time)","Thời gian trễ (Latency time)","Thời gian truy cập (Access time)","Độ trễ quay (Rotational delay)"], ans:[0],
 expH:"<p>Thời gian đọc một khối = <b>seek</b> (dời cánh tay tới đúng track) + <b>độ trễ quay</b> (chờ sector quay tới dưới đầu đọc) + thời gian truyền. Dời cánh tay chính là <b>seek time</b>.</p>"});
Q({ch:5,type:"single",topic:"Đĩa – cylinder skew",sec:"s5-10",
 q:"Cần bao nhiêu cylinder skew cho một đĩa HDD 10,000 RPM với track-to-track seek time 800 micro giây? Biết rằng đĩa có 300 sectors/1track, một sector mới đi qua dưới head cứ sau 20 micro giây.",
 opts:["20 sectors","36 sectors","24 sectors","40 sectors"], ans:[3],
 expH:"<p>Trong lúc đầu đọc dời sang track kế (800 µs), đĩa vẫn quay qua 800 / 20 = <b>40 sector</b>. Vì vậy sector 0 của track kế phải lệch đi 40 sector để vừa tới là đọc được ngay, khỏi chờ thêm một vòng.</p>"});
Q({ch:5,type:"single",topic:"Đĩa – dung lượng",sec:"s5-10",
 q:"Giả sử rằng một đĩa cứng với 16 head, 32768 sector/1side. Hỏi đĩa này dung lượng bao nhiêu MB? (1 sector = 512 bytes)",
 opts:["256 MB","512 MB","128 MB","64 MB"], ans:[0],
 expH:"<p>16 × 32768 × 512 = 2<sup>4</sup> × 2<sup>15</sup> × 2<sup>9</sup> = 2<sup>28</sup> byte = <b>256 MB</b>.</p>"});
Q({ch:5,type:"single",topic:"Đĩa mềm – địa chỉ sector",sec:"s5-10",
 q:"Cho biết địa chỉ vật lý (Cylinder 15, Head 0, Sector 5) tương ứng với sector vật lý nào trên đĩa mềm IBM 1.44MB chuẩn? Biết đĩa có 18 sectors/1 track và 80 cylinders.",
 opts:["295","294","293","292"], ans:[2],
 expH:"<p><b>Đáp án chính thức của Google Form \"NLHĐH - Cuối kì\" là 293</b>, nhiều tài liệu khác cũng ghi 293.</p><p>Lưu ý: tính theo công thức chuẩn (đĩa 1,44 MB có 2 head) thì sector = (C × 2 + H) × 18 + (S − 1) = (30 + 0) × 18 + 4 = <b>544</b>, không có trong phương án. Đề thi chấm 293, nên nhớ đáp án này nhưng nếu được hỏi tự luận thì nên hỏi lại cách tính của giảng viên.</p>"});
Q({ch:5,type:"single",topic:"Lập lịch đĩa – Elevator",sec:"s5-10",
 q:"Các yêu cầu truy xuất được gửi đến hàng đợi của đĩa theo thứ tự: 200, 171, 47, 126, 4, 124, 23, 500 và 76. Giả sử đầu từ đang xuất phát ở cylinder 50 và Arm đang hướng đi ra xa. Tính tổng cộng đầu từ di chuyển qua bao nhiêu cylinder nếu dùng thuật toán Elevator?",
 opts:["542","946","493","Tất cả đều sai"], ans:[1],
 expH:"<p>Hiểu \"đi ra xa\" là đi về phía số cylinder lớn (như đáp án tài liệu): 50 → 76 → 124 → 126 → 171 → 200 → 500 rồi quay xuống 47 → 23 → 4.</p><p>Tổng = (500 − 50) + (500 − 4) = 450 + 496 = <b>946</b>.</p><p><small>Nếu hiểu ngược (đi xuống trước): (50 − 4) + (500 − 4) = 542.</small></p>"});
Q({ch:5,type:"multi",topic:"Lập lịch đĩa – Elevator",sec:"s5-10",
 q:"Các yêu cầu truy xuất được gửi đến hàng đợi của đĩa theo thứ tự: 200, 171, 47, 126, 4, 124, 23, 500 và 76. Giả sử đầu từ đang xuất phát ở cylinder 50. Tính tổng cộng đầu từ di chuyển qua bao nhiêu cylinder nếu dùng thuật toán Elevator? (đề không cho hướng)",
 opts:["1626","542","493","Tất cả đều sai"], ans:[1,3],
 expH:"<p>Đề không cho hướng nên có 2 khả năng:</p><ul><li>Đi xuống trước: 50 → 47 → 23 → 4, rồi lên tới 500: 46 + 496 = <b>542</b>.</li><li>Đi lên trước: 50 → … → 500, rồi xuống 4: 450 + 496 = 946 → không có phương án → \"Tất cả đều sai\".</li></ul><p>Đi thi đọc kỹ hướng trong đề; nếu không cho hướng thường chọn 542.</p>"});
Q({ch:5,type:"single",topic:"Lập lịch đĩa – SSF",sec:"s5-10",
 q:"Giả sử đầu đọc/ghi hiện tại đang ở vị trí 50 trên đĩa có 200 cylinder (0 đến 199). Các yêu cầu đọc ghi lần lượt là: 82, 170, 43, 140, 24, 16. Thuật toán lập lịch I/O nào sẽ cho tổng khoảng cách di chuyển của đầu đọc/ghi (đang di chuyển từ trái sang phải) ngắn nhất?",
 opts:["C-SCAN","SSTF","SCAN","FCFS"], ans:[1],
 expH:"<table><tr><th>Thuật toán</th><th>Đường đi</th><th>Tổng</th></tr><tr><td><b>SSTF</b></td><td>50 → 43 → 24 → 16 → 82 → 140 → 170</td><td><b>188</b></td></tr><tr><td>SCAN</td><td>50 → … → 199 → … → 16</td><td>149 + 183 = 332</td></tr><tr><td>C-SCAN</td><td>50 → 199 → 0 → 43</td><td>149 + 199 + 43 = 391</td></tr><tr><td>FCFS</td><td>50 → 82 → 170 → 43 → 140 → 24 → 16</td><td>468</td></tr></table>"});
Q({ch:5,type:"single",topic:"Lập lịch đĩa – C-SCAN",sec:"s5-10",
 q:"Giả sử đầu đọc/ghi đang ở vị trí 50 trên đĩa có 200 cylinder (0 đến 199). Các yêu cầu đọc ghi lần lượt là: 82, 170, 43, 140, 24, 16. Sử dụng thuật toán C-SCAN, tính tổng khoảng cách di chuyển của đầu đọc/ghi (đầu đọc di chuyển từ trái sang phải).",
 opts:["188","391","274","468"], ans:[1],
 expH:"<p>C-SCAN đi một chiều tới mép cuối, rồi <b>quay thẳng về mép đầu</b> và tiếp tục cùng chiều:</p><p>50 → 82 → 140 → 170 → <b>199</b> (149) · 199 → <b>0</b> (199) · 0 → 16 → 24 → 43 (43). Tổng = 149 + 199 + 43 = <b>391</b>.</p>"});
Q({ch:5,type:"single",topic:"Lập lịch đĩa – SSF",sec:"s5-10",
 q:"Hàng đợi đĩa với các yêu cầu cho các khối I/O trên các cylinder theo thứ tự: 10, 22, 20, 2, 40, 6, 38. Giả sử đầu đọc đĩa ban đầu ở cylinder 9. Hãy xác định thứ tự xử lý các cylinder sử dụng thuật toán SSF.",
 opts:["9, 6, 2, 10, 20, 22, 38, 40","9, 6, 10, 2, 20, 22, 38, 40","9, 10, 20, 22, 38, 40, 6, 2","9, 10, 6, 2, 20, 22, 38, 40"], ans:[3],
 expH:"<p>Từ 9: 10 (cách 1). Từ 10: 6 (4) gần hơn 20 (10). Từ 6: 2 (4). Từ 2: 20 (18), rồi 22, 38, 40.</p><p>→ <b>9, 10, 6, 2, 20, 22, 38, 40</b>.</p>"});
Q({ch:5,type:"single",topic:"Lập lịch đĩa – SSF",sec:"s5-10",
 q:"Một hàng đợi đĩa có các yêu cầu truy cập I/O vào các cylinder theo thứ tự: 10, 22, 20, 2, 40, 6, 38. Giả sử đầu đọc đĩa ban đầu ở cylinder 18. Tổng số cylinder mà đầu đọc di chuyển theo thuật toán SSF là bao nhiêu?",
 opts:["64","62","80","84"], ans:[1],
 expH:"<p>18 → 20 (2) → 22 (2) → 10 (12, gần hơn 38 cách 16) → 6 (4) → 2 (4) → 38 (36) → 40 (2).</p><p>Tổng = 2 + 2 + 12 + 4 + 4 + 36 + 2 = <b>62</b>.</p>"});
Q({ch:5,type:"single",topic:"Lập lịch đĩa – FCFS",sec:"s5-10",
 q:"Hàng đợi đĩa với các yêu cầu cho các khối I/O trên các cylinder theo thứ tự: 98, 183, 37, 122, 14, 124, 65, 67. Giả sử đầu đọc đĩa ban đầu ở cylinder 53. Hãy xác định thứ tự xử lý các cylinder sử dụng thuật toán FCFS.",
 opts:["53, 65, 67, 98, 122, 124, 183, 37, 14","53, 65, 67, 98, 183, 37, 122, 14, 124","53, 37, 14, 65, 67, 98, 122, 124, 183","53, 98, 183, 37, 122, 14, 124, 65, 67"], ans:[3],
 expH:"<p>FCFS phục vụ <b>đúng thứ tự yêu cầu đến</b>, không sắp xếp gì: 53 → 98 → 183 → 37 → 122 → 14 → 124 → 65 → 67.</p>"});
Q({ch:5,type:"multi",topic:"Lập lịch đĩa – SCAN",sec:"s5-10",
 q:"Hàng đợi đĩa với các yêu cầu cho các khối I/O trên các cylinder theo thứ tự: 98, 183, 37, 122, 14, 124, 65, 67. Giả sử đầu đọc đĩa ban đầu ở cylinder 53. Hãy xác định thứ tự xử lý các cylinder sử dụng thuật toán SCAN.",
 opts:["53, 65, 67, 98, 122, 124, 183, 37, 14","53, 98, 183, 37, 122, 14, 124, 65, 67","53, 65, 67, 98, 183, 37, 122, 14, 124","53, 37, 14, 65, 67, 98, 122, 124, 183"], ans:[0,3],
 expH:"<p>SCAN (thang máy) quét một chiều hết rồi quay đầu. Đề không cho hướng nên có 2 thứ tự hợp lệ:</p><ul><li>Đi xuống trước: <b>53, 37, 14</b>, rồi 65, 67, 98, 122, 124, 183.</li><li>Đi lên trước: <b>53, 65, 67, 98, 122, 124, 183</b>, rồi 37, 14.</li></ul>" + DOC("d (ví dụ giáo trình cho đầu đọc đi về phía 0)")});
Q({ch:5,type:"multi",topic:"Thiết bị block / character",sec:"s5-1",
 q:"Phát biểu nào sau đây về thiết bị character là đúng? (chọn nhiều đáp án)",
 opts:["Có thể tìm kiếm đến ký tự bất kỳ","Các thao tác trên thiết bị character là put, get","Lưu giữ thông tin theo dãy các ký tự liên tiếp","Tất cả đều đúng"], ans:[1,2],
 expH:"<p>Thiết bị character (bàn phím, chuột) truyền <b>dòng ký tự liên tiếp</b>, thao tác <b>get / put</b>, và <b>không seek được</b> tới ký tự bất kỳ (đó là đặc điểm của thiết bị block).</p>"});
Q({ch:5,type:"single",topic:"Phần mềm Vào/Ra",sec:"s5-8",
 q:"Thành phần nào của hệ điều hành quản lý sự giao tiếp của thiết bị I/O và CPU?",
 opts:["Hệ thống file (File system)","Quản lý bộ nhớ (Memory Manager)","Trình điều khiển thiết bị (Device Driver)","Bộ lập lịch CPU (CPU Scheduler)"], ans:[2],
 expH:"<p><b>Device driver</b> là lớp hiểu thiết bị cụ thể: ghi lệnh vào thanh ghi của bộ điều khiển, kiểm tra trạng thái, nhận ngắt khi thiết bị làm xong. Nó là cầu nối giữa CPU/HĐH và thiết bị.</p>"});
Q({ch:5,type:"single",topic:"Phần cứng Vào/Ra",sec:"s5-2",
 q:"Khi thiết bị A có một cáp kết nối vào thiết bị B, thiết bị B có một cáp kết nối vào thiết bị C, và thiết bị C kết nối vào một cổng trên máy tính, cách sắp xếp này được gọi là ________.",
 opts:["chuỗi liên kết (daisy chain)","cáp (cable)","cổng (port)","đường truyền (bus)"], ans:[0],
 expH:"<p>Các thiết bị nối tiếp nhau thành chuỗi, chỉ thiết bị cuối cắm vào máy → <b>daisy chain</b> (như vòng hoa cúc). <span class=\"xs\">ngoài slide</span></p>"});

/* ================= Chương 6 ================= */
Q({ch:6,type:"single",topic:"Ví dụ hệ thống file",sec:"s6-12",
 q:"Hệ điều hành Ubuntu 22.x LTS đang sử dụng hệ thống file ________.",
 opts:["ext2","ext4","NFS","ext3"], ans:[1],
 expH:"<p>Ubuntu (và đa số bản Linux hiện nay) mặc định cài trên <b>ext4</b> (Fourth Extended Filesystem). NFS là hệ thống file qua mạng. <span class=\"xs\">ngoài slide</span></p>"});
Q({ch:6,type:"single",topic:"Bảo vệ file (UNIX)",sec:"s6-3",
 q:"Phát biểu nào sau đây là đúng?\n(1) UNIX cung cấp 3 loại quyền: Đọc, Ghi, Thực thi\n(2) UNIX cung cấp 3 bộ quyền: quyền cho chủ sở hữu, quyền cho nhóm, quyền cho người khác (others)",
 opts:["Cả (1) và (2) đều sai","Chỉ (1) đúng","Cả (1) và (2) đều đúng","Chỉ (2) đúng"], ans:[2],
 expH:"<p>Mỗi file UNIX có <b>3 bộ</b> (owner, group, others) × <b>3 quyền</b> (r, w, x) = 9 bit quyền, ví dụ <code>rwxr-xr--</code>.</p>"});
Q({ch:6,type:"single",topic:"Bảo vệ file (UNIX)",sec:"s6-3",
 q:"Trong UNIX, các file được bảo vệ bằng cách gán cho mỗi file 9 bit quyền. Phát biểu nào sau đây là đúng?\n(1) Chế độ 641 (hệ bát phân) nghĩa là chủ sở hữu có thể đọc và ghi file, các thành viên khác trong nhóm của chủ sở hữu có thể đọc file và chỉ những người dùng khác mới có thể thực thi.\n(2) Chế độ 100 (hệ bát phân) cho phép chủ sở hữu thực thi file nhưng cấm mọi quyền truy cập khác.",
 opts:["Chỉ (1) đúng","Cả (1) và (2) đều đúng","Chỉ (2) đúng","Cả (1) và (2) đều sai"], ans:[1],
 expH:"<p>Mỗi chữ số bát phân = 3 bit r w x (r = 4, w = 2, x = 1):</p><ul><li>641 → 6 = <code>rw-</code> (chủ), 4 = <code>r--</code> (nhóm), 1 = <code>--x</code> (khác) → (1) đúng.</li><li>100 → 1 = <code>--x</code> (chủ), 0, 0 → chỉ chủ được thực thi → (2) đúng.</li></ul>"});
Q({ch:6,type:"single",topic:"Thuộc tính file",sec:"s6-3",
 q:"Những thành phần nào sau đây không phải là thuộc tính của file?",
 opts:["Location, Size, Protection","Relative access","Timestamps và user identification","Name, Identifier, Type"], ans:[1],
 expH:"<p>Thuộc tính file gồm tên, định danh, kiểu, vị trí, kích thước, bảo vệ, thời gian và chủ sở hữu. <b>Truy cập tương đối (relative access)</b> là một <b>cách truy cập</b> file, không phải thuộc tính.</p>"});
Q({ch:6,type:"single",topic:"Cấu trúc hệ thống file",sec:"s6-5",
 q:"Những thành phần nào sau đây không nằm trong cấu trúc (phân lớp) của hệ thống file?",
 opts:["I/O control","Timestamps và user identification","Hệ thống file logic","Module tổ chức file"], ans:[1],
 expH:"<p>Hệ thống file được chia lớp (từ dưới lên): <b>I/O control</b> → basic file system → <b>module tổ chức file</b> → <b>hệ thống file logic</b> → chương trình ứng dụng. \"Timestamps và user identification\" là <b>thuộc tính</b> của file, không phải một lớp. <span class=\"xs\">ngoài slide</span></p>"});

L.forEach(function(q, i){ q.id = "ot5-" + ("0" + (i + 1)).slice(-2); q.set = "ot5"; q.exp = q.exp || ""; });
window.QUESTIONS.push.apply(window.QUESTIONS, L);
})();
