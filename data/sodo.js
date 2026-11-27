/* Sơ đồ cây hệ thống kiến thức từng chương.
   N(tiêu đề, ghi chú, mã mục trong Tổng hợp, [nhánh con]) – ghi chú và mã mục có thể bỏ trống. */
window.TREES = window.TREES || {};
(function(){
function N(t, d, s, c){ return {t:t, d:d || "", s:s || "", c:c || []}; }

/* ======================= CHƯƠNG 2 ======================= */
window.TREES[2] = N("Chương 2 – Tiến trình và Luồng", "HĐH cho nhiều chương trình chạy “cùng lúc”, chọn ai chạy, và giữ cho chúng không giẫm lên dữ liệu của nhau", "", [
 N("2.1 Tiến trình", "Chương trình đang thực hiện", "s2-1", [
  N("Khái niệm", "", "s2-1", [
   N("Tiến trình = chương trình đang thực hiện", "Chương trình nằm trên đĩa là thụ động; chạy lên mới là tiến trình"),
   N("Tài nguyên cần cấp", "Không gian địa chỉ (text, data) · CPU ảo: PC, thanh ghi, stack · file đang mở, tiến trình con"),
   N("Tên gọi theo loại hệ thống", "Batch: job (công việc) · Time-shared: user program / task")]),
  N("Mô hình tiến trình (slide 3)", "", "s2-1", [
   N("(a) Đa nhiệm 4 chương trình", "1 CPU, 1 bộ đếm chương trình nhảy qua lại"),
   N("(b) 4 tiến trình độc lập, tuần tự", "Mỗi tiến trình như có PC riêng"),
   N("(c) Mỗi thời điểm chỉ 1 tiến trình chạy", "Nhìn lâu thấy cả 4 cùng tiến lên")]),
  N("Tiến trình trong bộ nhớ (slide 5)", "Từ địa chỉ 0 lên max", "s2-1", [
   N("text", "Mã lệnh"), N("data", "Biến toàn cục"), N("heap", "Cấp phát động, lớn dần lên"), N("stack", "Biến cục bộ, tham số, địa chỉ trả về, lớn dần xuống")]),
  N("Tạo tiến trình – 4 sự kiện", "", "s2-2", [
   N("1. Khởi động hệ điều hành"), N("2. Tiến trình gọi system call tạo tiến trình"), N("3. Người dùng yêu cầu"), N("4. Khởi động batch job"),
   N("UNIX: fork() và exec()", "fork tạo con là bản sao cha · exec thay bộ nhớ bằng chương trình mới · cha wait, con exit", "s2-2", [
    N("n lần fork() liên tiếp → 2ⁿ tiến trình", "Tức 2ⁿ − 1 tiến trình mới")])]),
  N("Kết thúc tiến trình – 4 điều kiện", "", "s2-2", [
   N("1. Bình thường", "Tự nguyện"), N("2. Do lỗi", "Tự nguyện"), N("3. Lỗi định mệnh", "Không tự nguyện"), N("4. Bị tiến trình khác kill", "Không tự nguyện")]),
  N("Phân cấp tiến trình", "", "s2-2", [
   N("UNIX: cây cha – con, process group"), N("Windows: không phân cấp, mọi tiến trình ngang nhau")]),
  N("Trạng thái tiến trình", "", "s2-3", [
   N("3 trạng thái: Running · Blocked · Ready"),
   N("4 bước chuyển", "1 Running → Blocked (chờ input) · 2 Running → Ready (bộ lập lịch chọn người khác) · 3 Ready → Running · 4 Blocked → Ready (input đã có)"),
   N("Không có Blocked → Running", "Chờ xong I/O chỉ được về Ready"),
   N("Sơ đồ 5 trạng thái (slide 37)", "new → ready → running → terminated; running ⇄ waiting qua I/O")]),
  N("PCB – Khối điều khiển tiến trình", "Một entry của bảng tiến trình", "s2-3", [
   N("Quản lý tiến trình", "Thanh ghi, PC, PSW, stack pointer, trạng thái, ưu tiên, tham số lập lịch, PID, cha, group, tín hiệu, thời gian CPU…"),
   N("Quản lý bộ nhớ", "Con trỏ tới text, data, stack segment"),
   N("Quản lý file", "Thư mục gốc, thư mục làm việc, file descriptor, user ID, group ID")]),
  N("Chuyển ngữ cảnh (context switch)", "Lưu trạng thái P0 vào PCB0 → nạp trạng thái P1 từ PCB1; thời gian này CPU không làm việc có ích", "s2-3")]),
 N("2.2 Luồng (Thread)", "Dòng thực thi trong tiến trình", "s2-4", [
  N("Mô hình luồng", "(a) 3 tiến trình mỗi cái 1 luồng · (b) 1 tiến trình 3 luồng", "s2-4"),
  N("Chia sẻ và riêng", "", "s2-4", [
   N("Dùng chung (per process)", "Không gian địa chỉ, biến toàn cục, file mở, tiến trình con, báo thức, tín hiệu, thông tin kế toán"),
   N("Riêng mỗi luồng (per thread)", "PC, thanh ghi, stack, trạng thái")]),
  N("4 ích lợi", "Hồi đáp tốt · Chia sẻ tài nguyên · Kinh tế (tạo/chuyển rẻ) · Hợp kiến trúc đa bộ xử lý", "s2-4"),
  N("Cách dùng", "", "s2-4", [
   N("Trình soạn thảo 3 luồng", "Nhận bàn phím · định dạng · tự lưu"),
   N("Web server đa luồng", "Dispatcher thread nhận yêu cầu → worker thread tìm trong cache / đọc đĩa")]),
  N("Thực hiện luồng", "", "s2-5", [
   N("Mức user", "Thư viện luồng (run-time system): thread_create/exit/wait/yield; thread table trong tiến trình; kernel không biết; nhanh nhưng 1 luồng chặn → cả tiến trình chặn"),
   N("Mức kernel", "Kernel quản lý và lập lịch từng luồng; luồng chặn không kéo luồng khác; tốt cho đa CPU; tạo/quản lý chậm hơn"),
   N("Lai (hybrid)", "Ghép nhiều luồng user lên một luồng kernel")])]),
 N("2.3 Lập lịch (Scheduling)", "Chọn tiến trình nào được CPU", "s2-6", [
  N("Giới thiệu", "", "s2-6", [
   N("Chu kỳ CPU burst – chờ I/O", "CPU-bound: burst dài · I/O-bound: burst ngắn"),
   N("3 mức lập lịch", "Admission scheduler · Memory scheduler · CPU scheduler"),
   N("4 lúc phải chọn", "Running → Blocked · Running → Ready · Blocked/mới → Ready · Kết thúc"),
   N("Độc quyền (nonpreemptive)", "Chạy tới khi bị chặn hoặc tự nhả CPU"),
   N("Không độc quyền (preemptive)", "Chạy trong khoảng thời gian xác định, có thể bị giành CPU")]),
  N("Tiêu chí", "", "s2-6", [
   N("Max", "CPU utilization · Throughput"),
   N("Min", "Turnaround (xong − đến) · Waiting (xoay vòng − burst) · Response"),
   N("Mục đích theo loại hệ thống", "Mọi hệ thống: công bằng, chính sách, cân bằng · Batch: throughput, turnaround, CPU · Tương tác: response, tỉ lệ · Thời gian thực: kịp hạn, ổn định")]),
  N("Batch systems", "", "s2-7", [
   N("FCFS", "Đến trước phục vụ trước; phụ thuộc tiến trình đầu hàng (P1 24, P2 3, P3 3 → chờ TB 17 hoặc 3)"),
   N("SJF", "Burst ngắn nhất trước; tối ưu thời gian chờ TB; khó đoán burst"),
   N("SRTF", "SJF không độc quyền: tiến trình mới ngắn hơn phần còn lại thì giành CPU")]),
  N("Interactive systems", "", "s2-7", [
   N("Round Robin", "Quantum 10–100 ms; hết lượt xuống cuối hàng; chờ ≤ (n − 1)q; q lớn → FIFO, q nhỏ → tốn chuyển ngữ cảnh"),
   N("Theo độ ưu tiên", "Chọn ưu tiên cao nhất; SJF là trường hợp riêng; gây đói → chữa bằng aging"),
   N("Nhiều lớp ưu tiên", "Chạy hết lớp cao (RR trong lớp) rồi mới xuống lớp thấp")]),
  N("Real-time systems", "", "s2-8", [
   N("Hard real-time", "Bắt buộc đúng hạn"), N("Soft real-time", "Được ưu tiên hơn"),
   N("Điều kiện lập lịch được", "Σ Cᵢ / Pᵢ ≤ 1")]),
  N("Chính sách và cơ chế", "Cơ chế trong kernel, tham số (chính sách) do tiến trình người dùng điền", "s2-8"),
  N("Lập lịch luồng", "", "s2-8", [
   N("Mức user (cục bộ)", "Kernel chọn tiến trình, thư viện chọn luồng: A1 A2 A3… được, A1 B1 A2… không"),
   N("Mức kernel (toàn cục)", "Kernel chọn thẳng luồng: cả hai thứ tự đều được")])]),
 N("2.4 Giao tiếp liên tiến trình (IPC)", "", "s2-9", [
  N("Tiến trình độc lập vs tương tác", "Tương tác: chia sẻ thông tin, tăng tốc tính toán, module hóa, tiện lợi", "s2-9"),
  N("Vấn đề dữ liệu chia sẻ", "Truy cập đồng thời → không nhất quán → cần giao tiếp và đồng bộ", "s2-9", [
   N("Điều kiện tranh đua (race condition)", "Kết quả phụ thuộc thứ tự chạy"),
   N("Loại trừ lẫn nhau (mutual exclusion)", "Cấm truy cập dữ liệu chung cùng lúc"),
   N("Đoạn găng / miền găng (CS)", "Phần chương trình truy cập bộ nhớ dùng chung"),
   N("4 điều kiện", "1 Không hai tiến trình cùng trong CS · 2 Không giả định tốc độ, số CPU · 3 Ngoài CS không chặn ai (tiến độ) · 4 Không chờ vô hạn (chờ có hạn)")]),
  N("Loại trừ nhau với chờ bận (busy waiting)", "", "s2-10", [
   N("Giải pháp mềm", "", "s2-10", [
    N("1. Biến khóa (Lock)", "Sai: kiểm tra và đặt khóa tách rời → cả hai cùng vào"),
    N("2. Luân phiên (biến turn)", "2 tiến trình, có loại trừ, nhưng cứng nhắc (vi phạm điều kiện 3)"),
    N("3. Peterson", "interest[2] + turn; thỏa loại trừ, tiến độ, chờ có hạn; chỉ cho 2 tiến trình")]),
   N("Giải pháp cứng", "", "s2-10", [
    N("1. Cấm ngắt", "Nguy hiểm (treo máy, lệnh đặc quyền); không chắc loại trừ trên N CPU"),
    N("2. Lệnh TSL", "Kiểm tra và đặt khóa nguyên tử; lock khởi tạo 0; dễ mở rộng N tiến trình")]),
   N("Nhận xét", "Lãng phí CPU, khó mở rộng → nên cho tiến trình ngủ (Sleep & Wakeup)")]),
  N("Đồng bộ với Sleep & Wakeup", "", "s2-11", [
   N("Sleep() / WakeUp(P)", "Không vào được CS thì ngủ (blocked); ra khỏi CS thì đánh thức; lỗi: mất tín hiệu đánh thức"),
   N("Semaphore", "Dijkstra 1965; giá trị nguyên + danh sách chờ; Down(s) / Up(s) nguyên tử", "s2-11", [
    N("s = 1: loại trừ", "Down; CS; Up"), N("s = 0: định thứ tự", "P1: Job1; Up · P2: Down; Job2"),
    N("value âm = số tiến trình đang chờ")]),
   N("Monitor", "Hoare 1974, Brinch Hansen 1975; do ngôn ngữ cung cấp; loại trừ tự động; biến điều kiện Wait / Signal"),
   N("Message passing", "send(P, msg) / receive(Q, msg); mỗi liên kết đúng một cặp, thường hai chiều")]),
  N("Bài toán đồng bộ kinh điển", "Bounded-Buffer (Producer–Consumer) · Readers–Writers · Dining-Philosophers", "s2-11")])
]);

/* ======================= CHƯƠNG 4 ======================= */
window.TREES[4] = N("Chương 4 – Quản lý Bộ nhớ", "Chia RAM cho nhiều tiến trình an toàn, tận dụng tối đa và chạy được chương trình lớn hơn RAM", "", [
 N("4.1 Quản lý bộ nhớ cơ bản", "", "s4-1", [
  N("Phân cấp bộ nhớ", "Lý tưởng: lớn – nhanh – ổn định → Cache → RAM → Đĩa; Memory manager điều phối", "s4-1"),
  N("Hai loại địa chỉ", "", "s4-1", [
   N("Logical (= virtual)", "Do CPU sinh ra"), N("Physical", "Bộ nhớ vật lý nhìn thấy"),
   N("Vấn đề trung tâm", "Ràng buộc không gian logic vào không gian vật lý")]),
  N("Đơn nhiệm", "1 HĐH + 1 tiến trình; 3 cách bố trí (a) HĐH RAM dưới (b) HĐH ROM trên (c) HĐH RAM + driver ROM", "s4-2"),
  N("Đa nhiệm phân vùng cố định", "", "s4-2", [
   N("Nhiều hàng đợi vào", "Mỗi phân vùng một hàng"), N("Một hàng đợi chung"), N("Nhược: phân mảnh nội")]),
  N("Tái cấp phát và bảo vệ (Base / Limit)", "", "s4-3", [
   N("Base register", "Địa chỉ vật lý nhỏ nhất; vật lý = base + logic"),
   N("Limit register", "Phạm vi; logic ≥ limit → trap (addressing error)"),
   N("MMU ánh xạ động lúc chạy", "Ví dụ: relocation 14000 + 346 = 14346")])]),
 N("4.2 Swapping", "", "s4-4", [
  N("Swap out / swap in", "Đưa cả tiến trình ra đĩa (backing store) và nạp tiến trình khác vào", "s4-4"),
  N("Phân mảnh", "", "s4-4", [
   N("Phân mảnh ngoài", "Tổng trống đủ nhưng rời rạc (phân vùng động, phân đoạn, file liên tục)"),
   N("Phân mảnh nội", "Cấp nhiều hơn cần (phân vùng cố định, trang cuối của phân trang)"),
   N("Chừa chỗ phát triển", "Cho data và stack lớn dần")]),
  N("Quản lý vùng trống (phân vùng động)", "", "s4-5", [
   N("Bit Map", "Mỗi allocation unit ↔ 1 bit; đơn vị 4 byte → bitmap tốn 1/32 bộ nhớ"),
   N("Linked List", "Phần tử P/H · địa chỉ bắt đầu · độ dài")]),
  N("Thuật toán cấp phát", "", "s4-5", [
   N("First-fit", "Vùng đủ lớn đầu tiên"), N("Next-fit", "Từ con trỏ hiện hành"),
   N("Best-fit", "Vùng nhỏ nhất đủ lớn (duyệt hết)"), N("Worst-fit", "Vùng lớn nhất (duyệt hết)"),
   N("Ví dụ kinh điển", "100, 500, 200, 300, 600 với 212, 417, 112, 426 → chỉ Best-fit đủ cả 4")])]),
 N("4.3 Bộ nhớ ảo – Phân trang", "", "s4-6", [
  N("Ý tưởng", "Cắt chương trình thành trang, RAM thành khung cùng cỡ; chỉ nạp trang đang cần; trang nằm khung bất kỳ", "s4-6", [
   N("Trang (page) – logic"), N("Khung trang (frame) – vật lý"), N("Bảng trang", "Trang nào ở khung nào; X = chưa có"),
   N("Chỉ còn phân mảnh nội", "Trang càng lớn phân mảnh nội càng tăng")]),
  N("Chuyển đổi địa chỉ", "", "s4-7", [
   N("Địa chỉ = p (m − n bit) | d (n bit)", "p = địa chỉ ÷ kích thước trang · d = địa chỉ mod kích thước trang"),
   N("Vật lý = f × kích thước trang + d"),
   N("Entry bảng trang", "Page frame number · Present/absent · Protection · Modified · Referenced · Caching disabled")]),
  N("Bảng trang 2 mức", "Bảng 1 mức 2²⁰ dòng quá to → bảng cấp 1 làm mục lục + bảng cấp 2; tách 10 · 10 · 12", "s4-8"),
  N("PTBR / PRLR", "PTBR trỏ bảng trang, PRLR là kích thước; mỗi truy cập vào RAM 2 lần", "s4-8"),
  N("TLB", "Bộ nhớ kết hợp lưu các dòng bảng trang hay dùng; hit thì khỏi tra bảng trang", "s4-8")]),
 N("Lỗi trang và thay thế trang", "", "s4-9", [
  N("Lỗi trang – 6 bước", "Tham chiếu → trap → tìm trên đĩa / khung trống → nạp → sửa bảng trang (bit v) → chạy lại lệnh", "s4-9"),
  N("Thay thế trang – 5 bước", "Tìm trang trên đĩa → tìm khung trống → chọn nạn nhân (ghi ra nếu bị sửa) → nạp, cập nhật bảng → chạy tiếp", "s4-9"),
  N("Bit M (dirty)", "Trang bị sửa mới phải ghi ra đĩa → giảm thời gian thay trang", "s4-9"),
  N("Thuật toán thay thế trang", "", "s4-10", [
   N("Optimal", "Bỏ trang lâu nhất mới dùng lại; không cài được, làm chuẩn so sánh"),
   N("NRU", "4 lớp theo (R, M); bỏ lớp thấp nhất"),
   N("FIFO", "Bỏ trang vào sớm nhất; có nghịch lý Belady"),
   N("Second chance", "FIFO + bit R: R = 1 thì xóa R, cho xuống cuối"),
   N("Clock", "Second chance trên danh sách vòng"),
   N("LRU", "Bỏ trang lâu nhất chưa dùng; tốt nhưng khó cài"),
   N("NFU", "Đếm số lần dùng"), N("Aging", "Dịch phải bộ đếm, thêm R vào bên trái; xấp xỉ LRU tốt"),
   N("Working set", "Giữ tập trang đang dùng gần đây"), N("WSClock", "Working set + Clock")])]),
 N("4.4 Cách thực hiện phân trang trong HĐH", "", "s4-11", [
  N("4 thời điểm HĐH tham gia", "Tạo tiến trình (tạo bảng trang) · Thực thi (nạp MMU, flush TLB) · Lỗi trang (xác định địa chỉ, thay trang) · Kết thúc (giải phóng)", "s4-11"),
  N("Điều khiển lỗi trang – 10 bước", "Bẫy về kernel, lưu thanh ghi, xác định trang, chọn khung, ghi trang bẩn, nạp trang, sửa bảng, chạy lại lệnh…", "s4-11"),
  N("Khóa trang (pinning)", "Trang làm buffer I/O không được chọn để thay", "s4-11"),
  N("Kho sao lưu (backing store)", "Swap tĩnh: mỗi trang một ô cố định · Động: cấp khi đẩy ra, cần disk map", "s4-11"),
  N("Tách chính sách và cơ chế", "External pager (user space) quyết định · Kernel (fault handler, MMU handler) thực hiện; 6 bước", "s4-11")]),
 N("4.5 Phân đoạn (Segmentation)", "", "s4-12", [
  N("Vấn đề không gian 1 chiều", "Các bảng của trình biên dịch lớn dần đụng nhau", "s4-12"),
  N("Phân đoạn", "Mỗi bảng một segment riêng từ 0; tăng/co độc lập; địa chỉ = (segment, offset)", "s4-12"),
  N("So sánh với phân trang", "Phân đoạn: LTV phải biết, nhiều không gian, bảo vệ/chia sẻ riêng, hợp bảng thay đổi kích thước", "s4-12"),
  N("Checkerboarding → nén (compaction)", "Phân mảnh ngoài kiểu bàn cờ; nén gom các lỗ trống", "s4-12"),
  N("Phân đoạn + phân trang: Pentium", "", "s4-13", [
   N("Chặng 1: phân đoạn", "Selector 16 bit (Index 13 · TI 1 · RPL 2) → GDT/LDT → descriptor (Base 32, Limit 20, G, D, P, DPL, S, Type) → Base + Offset = địa chỉ tuyến tính"),
   N("Chặng 2: phân trang", "Dir 10 · Page 10 · Offset 12 → page directory → page table → khung"),
   N("4 mức bảo vệ", "0 kernel · 1 system calls · 2 shared libraries · 3 user programs")])])
]);

/* ======================= CHƯƠNG 5 ======================= */
window.TREES[5] = N("Chương 5 – Vào/Ra", "CPU nói chuyện với thiết bị thế nào và phần mềm I/O được tổ chức thành các lớp ra sao", "", [
 N("5.1 Nguyên lý phần cứng Vào/Ra", "", "s5-1", [
  N("Phân loại thiết bị", "", "s5-1", [
   N("Block", "Đĩa; read, write, seek; đọc/ghi từng khối riêng; khối 512 B – 64 KB"),
   N("Character", "Bàn phím, chuột, serial; get, put; dòng ký tự, không seek"),
   N("Tốc độ truyền", "Bàn phím 10 B/s … Sun Gigaplane XB 20 GB/s")]),
  N("Bộ điều khiển thiết bị (controller)", "", "s5-2", [
   N("Thiết bị = phần cơ điện tử + phần điện tử (controller)"),
   N("Tác vụ của controller", "Chuyển luồng bit thành khối byte · sửa lỗi · chuyển dữ liệu vào RAM"),
   N("Cổng I/O (port)", "Là thanh ghi; ví dụ địa chỉ port trên PC"),
   N("Bus", "PCI bus chính; bus mở rộng; IDE, SCSI")]),
  N("Địa chỉ Vào/Ra", "", "s5-3", [
   N("Không gian I/O tách riêng", "Lệnh IN/OUT đặc biệt"), N("Memory-mapped I/O", "Thanh ghi thiết bị nằm trong không gian bộ nhớ"), N("Hybrid"),
   N("Kiến trúc bus", "Single-bus · Dual-bus memory")]),
  N("3 phương pháp truyền dữ liệu", "", "s5-4", [
   N("Programmed I/O (polling)", "CPU chờ bận từng ký tự"),
   N("Interrupt-driven I/O", "Mỗi ký tự một ngắt; CPU làm việc khác lúc chờ"),
   N("DMA", "Controller DMA (Address, Count, Control) tự chép, chỉ 1 ngắt cho cả khối → giảm tải CPU")]),
  N("Ngắt", "Device finished → controller issues interrupt → CPU acks; CPU kiểm tra ngắt sau mỗi lệnh; 2 PIC, IRQ0–15", "s5-4")]),
 N("5.2 Nguyên lý phần mềm Vào/Ra", "", "s5-5", [
  N("6 mục đích", "Độc lập thiết bị · Đặt tên chung · Xử lý lỗi gần phần cứng · Đồng bộ / không đồng bộ · Bộ đệm · Chia sẻ / dùng riêng", "s5-5"),
  N("In chuỗi theo 3 cách", "Programmed I/O · Interrupt-driven · DMA (code và thủ tục phục vụ ngắt)", "s5-6"),
  N("Cấu trúc kernel I/O", "Kernel I/O subsystem → device drivers → controllers → devices", "s5-6")]),
 N("5.3 Các lớp phần mềm Vào/Ra", "Trên → dưới: User → Độc lập thiết bị → Driver → Interrupt handler → Hardware", "s5-7", [
  N("Phần mềm mức người dùng", "Gọi I/O, định dạng, spooling", "s5-7"),
  N("Phần mềm độc lập thiết bị", "Đặt tên, bảo vệ (kiểm tra quyền), tạo khối, bộ đệm, cấp phát; giao diện chung với driver; báo lỗi; kích thước khối độc lập", "s5-9", [
   N("Buffering", "Không đệm · đệm ở user · đệm kernel rồi copy · double buffering; mạng: 5 lần copy")]),
  N("Device driver", "Thiết lập thanh ghi, kiểm tra trạng thái và kết quả; nằm trong kernel; mỗi loại thiết bị một driver", "s5-8"),
  N("Interrupt handler", "Đánh thức driver khi I/O xong; 9 bước xử lý ngắt", "s5-8")]),
 N("5.4 Các thiết bị Vào/Ra", "", "s5-10", [
  N("Đĩa cứng", "", "s5-10", [
   N("Cấu tạo", "Head · track · sector (512 B) · cylinder"),
   N("Dung lượng", "Cylinder × head × sector/track × byte/sector"),
   N("Thời gian đọc/ghi", "Seek (dời cánh tay, lớn nhất) + độ trễ quay + truyền"),
   N("Định dạng", "Format cấp thấp → phân vùng → format cấp cao; mất ~20% do preamble, ECC, sector dự phòng"),
   N("Lập lịch đĩa", "FCFS · SSF (gần nhất) · Elevator / SCAN · C-SCAN"),
   N("Xử lý lỗi", "RECALIBRATE: kéo cánh tay về cylinder 0")]),
  N("RAID", "0 striping · 1 mirroring · 2 Hamming bit · 3 parity bit · 4 parity strip riêng · 5 parity phân tán", "s5-10"),
  N("Màn hình", "Memory-mapped display ghi vào video RAM; quét non-interlaced", "s5-11"),
  N("Terminal RS-232", "1 bit mỗi lần, serial, COM1/COM2, chip UART", "s5-11"),
  N("Đồng hồ", "Thạch anh → counter giảm dần → về 0 sinh ngắt → holding register nạp lại", "s5-11")])
]);

/* ======================= CHƯƠNG 6 ======================= */
window.TREES[6] = N("Chương 6 – Hệ thống File", "Lưu thông tin lâu dài trên đĩa: file, thư mục và cách cấp phát block", "", [
 N("6.1 File", "", "s6-1", [
  N("Vì sao cần lưu trữ lâu dài", "Dữ liệu lớn · tồn tại lâu hơn tiến trình · nhiều tiến trình cùng truy cập", "s6-1"),
  N("Hệ thống file = tập file + cấu trúc thư mục", "Người dùng thấy cây thư mục → HĐH dùng i-node → dữ liệu trên block đĩa", "s6-1"),
  N("Đặt tên", "Phần mở rộng: .c, .o, .txt, .zip, .jpg…", "s6-2"),
  N("Cấu trúc file", "Chuỗi byte · chuỗi bản ghi · cây bản ghi theo khóa", "s6-2"),
  N("Kiểu file", "", "s6-2", [
   N("Data", "numeric, character, binary"), N("Program", "source, object, executable"),
   N("Regular / special", "Special: character, block (đại diện thiết bị)"),
   N("File thực thi", "Header (magic number…) + text + data + relocation bits + symbol table"),
   N("Archive", "Nhiều cặp header + object module")]),
  N("Truy cập", "Tuần tự (băng từ) · Ngẫu nhiên (CSDL, seek)", "s6-3"),
  N("Thuộc tính", "Protection, owner, cờ read-only/hidden/system/archive/temporary, thời gian, kích thước…", "s6-3"),
  N("11 thao tác file", "Create · Delete · Open · Close · Read · Write · Append · Seek · Get/Set attributes · Rename", "s6-3", [
   N("Create", "Báo file sắp có, đặt thuộc tính ban đầu"),
   N("Open", "Nạp thuộc tính và danh sách địa chỉ đĩa vào RAM")]),
  N("Bảo vệ UNIX", "3 bộ (owner, group, others) × 3 quyền (r, w, x); ví dụ 641 = rw- r-- --x", "s6-3")]),
 N("6.2 Thư mục", "", "s6-4", [
  N("Hệ thống thư mục", "Một mức → hai mức → phân cấp (cây)", "s6-4"),
  N("Đường dẫn", "Tuyệt đối (từ /) · tương đối (từ thư mục hiện hành; . và ..)", "s6-4"),
  N("8 thao tác thư mục", "Create · Delete · Opendir · Closedir · Readdir · Rename · Link · Unlink", "s6-4")]),
 N("6.3 Thực hiện hệ thống file", "", "s6-5", [
  N("Bố trí trên đĩa", "MBR + partition table → partitions; mỗi partition: boot block → super block → free space → i-nodes → root dir → files", "s6-5", [
   N("Khởi động", "BIOS đọc MBR (sector 0) → tìm partition active trong partition table → chạy boot block")]),
  N("Cấp phát block cho file", "", "s6-6", [
   N("Liên tục", "Cần block đầu + số block; truy cập ngẫu nhiên; phân mảnh ngoài; không tăng kích thước; dùng cho CD-ROM", "s6-6"),
   N("Liên kết", "Cần block đầu; không phân mảnh ngoài; không truy cập ngẫu nhiên", "s6-7"),
   N("FAT", "Gom con trỏ vào bảng trong RAM; FAT-12/16/32", "s6-7"),
   N("Chỉ mục / i-node", "Index block; i-node: thuộc tính + địa chỉ trực tiếp + gián tiếp đơn/đôi/ba", "s6-8")]),
  N("Thực hiện thư mục", "", "s6-9", [
   N("Thuộc tính trong entry", "MS-DOS"), N("Entry trỏ tới i-node", "UNIX"),
   N("Tên file dài", "In-line · In a heap"),
   N("File chia sẻ", "Một file trong nhiều thư mục → đồ thị (DAG)")]),
  N("Quản lý không gian đĩa", "", "s6-10", [
   N("Kích thước block", "Block lớn: đọc nhanh nhưng phí chỗ; phải thỏa hiệp"),
   N("Theo dõi block trống", "Danh sách liên kết · Bitmap")])]),
 N("6.4 Ví dụ hệ thống file", "", "s6-11", [
  N("CD-ROM / ISO 9660", "Rãnh xoắn ốc pit/land, block 2K; cấp phát liên tục", "s6-11"),
  N("MS-DOS", "Entry 32 byte; FAT-12 / FAT-16 / FAT-32 (4 KB → 1 TB theo slide)", "s6-11"),
  N("Windows 98", "Entry mở rộng; tên dài 13 ký tự Unicode/entry, checksum, THEQUI~1", "s6-12"),
  N("UNIX V7", "Entry 16 byte = i-node (2) + tên (14); tìm /usr/ast/mbox qua các i-node", "s6-12")])
]);
})();
