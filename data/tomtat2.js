/* Tổng hợp kiến thức – Chương 2: Tiến trình và Luồng (đầy đủ theo slide 1 → 92)
   figs: [mã ảnh slide, chú thích] → ảnh nằm ở assets/slides/<mã>.jpg
   <div class="demo" data-demo="sched"> : mô phỏng lập lịch CPU (app.js) */
window.SUMMARY = window.SUMMARY || [];
window.EASY = window.EASY || {};

window.SUMMARY.push({
ch:2, title:"Tiến trình và Luồng", en:"Processes and Threads",
intro:"Nội dung: <b>2.1 Tiến trình · 2.2 Luồng · 2.3 Lập lịch · 2.4 Giao tiếp liên tiến trình</b> (miền găng, chờ bận, Sleep &amp; Wakeup, Semaphore, Monitor). Câu hỏi xuyên suốt: HĐH cho <b>nhiều chương trình chạy “cùng lúc”</b> trên một CPU thế nào, chọn ai chạy trước, và làm sao để chúng <b>không giẫm lên dữ liệu của nhau</b>.",
sections:[
{id:"s2-1",title:"1. Tiến trình là gì? Mô hình tiến trình",
 figs:[["c2-03","Slide 3 – Mô hình tiến trình: (a) 1 bộ đếm chương trình, (b) 4 bộ đếm, (c) mỗi lúc chỉ 1 tiến trình chạy"],["c2-05","Slide 5 – Tiến trình trong bộ nhớ: text, data, heap, stack"]],
 yt:"process concept operating system program vs process",
 html:`
<p><b>Tiến trình (process)</b> là <b>một chương trình đang thực hiện</b>. Chương trình chỉ là file nằm im trên đĩa; khi được nạp vào RAM và chạy, nó trở thành tiến trình. Một chương trình (ví dụ Chrome) có thể chạy thành nhiều tiến trình.</p>
<p><b>Tiến trình cần được cấp các tài nguyên</b> (slide 4):</p>
<ul><li><b>Không gian địa chỉ</b>: text segment (mã lệnh), data segment (biến).</li>
<li><b>CPU (ảo)</b>: <b>bộ đếm chương trình</b> (program counter, PC), <b>các thanh ghi</b>, <b>ngăn xếp</b> (stack).</li>
<li><b>Tài nguyên khác</b>: file đang mở, tiến trình con…</li></ul>
<p>Tùy loại hệ thống, việc được gọi khác tên: hệ thống xử lý lô (batch) gọi là <b>công việc (job)</b>; hệ thống chia sẻ thời gian gọi là <b>chương trình người dùng</b> hay <b>tác vụ (task)</b>.</p>
<h4 class="sub">Mô hình tiến trình (slide 3)</h4>
<table><tr><th>Hình</th><th>Ý nghĩa</th></tr>
<tr><td>(a)</td><td>Thực tế: <b>1 CPU, 1 bộ đếm chương trình</b> nhảy qua lại giữa 4 chương trình A, B, C, D (đa nhiệm).</td></tr>
<tr><td>(b)</td><td>Cách nhìn của mô hình: <b>4 tiến trình độc lập, tuần tự</b>, mỗi tiến trình như có <b>bộ đếm chương trình riêng</b>.</td></tr>
<tr><td>(c)</td><td>Theo thời gian: <b>mỗi thời điểm chỉ có 1 tiến trình thực thi</b>; nhìn lâu thì thấy cả 4 cùng tiến lên.</td></tr></table>
<div class="tip"><b>Ví von:</b> một đầu bếp (CPU) nấu 4 món (4 tiến trình). Mỗi lúc anh chỉ đảo một chảo, nhưng đổi chảo liên tục nên khách thấy 4 món cùng chín dần. Mỗi món có <b>tờ công thức đánh dấu đang làm tới bước nào</b>, chính là bộ đếm chương trình riêng.</div>
<h4 class="sub">Tiến trình trong bộ nhớ (slide 5)</h4>
<table><tr><th>Vùng (từ địa chỉ 0 lên max)</th><th>Chứa gì</th></tr>
<tr><td><b>text</b></td><td>Mã lệnh của chương trình</td></tr>
<tr><td><b>data</b></td><td>Biến toàn cục</td></tr>
<tr><td><b>heap</b></td><td>Bộ nhớ cấp phát động (malloc, new), <b>lớn dần lên</b></td></tr>
<tr><td>(khoảng trống)</td><td>Chỗ để heap và stack lớn lên về phía nhau</td></tr>
<tr><td><b>stack</b></td><td>Biến cục bộ, tham số, địa chỉ trả về khi gọi hàm, <b>lớn dần xuống</b></td></tr></table>`},
{id:"s2-2",title:"2. Tạo, kết thúc và phân cấp tiến trình",
 figs:[["c2-08","Slide 8 – fork() tạo tiến trình con, con gọi exec(), cha chờ (wait) con kết thúc (exit)"]],
 yt:"fork exec wait exit unix process creation",
 html:`
<p><b>4 sự kiện làm tiến trình được tạo ra</b> (slide 6):</p>
<ol><li><b>Khởi động hệ điều hành</b> (system initialization): tạo các tiến trình nền, dịch vụ.</li>
<li>Một tiến trình đang chạy <b>gọi lời gọi hệ thống</b> tạo tiến trình (ví dụ fork).</li>
<li><b>Người dùng yêu cầu</b> tạo tiến trình mới (bấm mở một ứng dụng).</li>
<li><b>Khởi động một công việc xử lý lô</b> (batch job).</li></ol>
<h4 class="sub">fork và exec trong UNIX (slide 7, 8)</h4>
<ul><li><code>fork()</code> tạo <b>tiến trình con là bản sao của tiến trình cha</b> (cùng mã, cùng dữ liệu tại thời điểm fork).</li>
<li><code>exec()</code> được gọi <b>sau fork</b> để <b>thay không gian bộ nhớ</b> của tiến trình con bằng một chương trình mới.</li>
<li>Cha gọi <code>wait()</code> để chờ; con gọi <code>exit()</code> khi xong, cha <b>chạy tiếp</b> (resumes).</li></ul>
<div class="ex"><b>Bài tập hay gặp</b> <span class="xs">ngoài slide</span>: n lần <code>fork()</code> liên tiếp tạo ra tổng cộng <b>2<sup>n</sup></b> tiến trình (tính cả tiến trình ban đầu), tức là <b>2<sup>n</sup> − 1</b> tiến trình mới. Ví dụ 2 lần fork → 4 tiến trình, 3 tiến trình mới.</div>
<h4 class="sub">4 điều kiện kết thúc tiến trình (slide 9)</h4>
<table><tr><th>Điều kiện</th><th>Tự nguyện?</th><th>Ví dụ</th></tr>
<tr><td>1. Kết thúc bình thường</td><td>Tự nguyện</td><td>Chạy xong, gọi exit</td></tr>
<tr><td>2. Kết thúc do lỗi</td><td>Tự nguyện</td><td>Trình biên dịch thấy file không tồn tại nên tự thoát</td></tr>
<tr><td>3. Lỗi định mệnh (fatal error)</td><td>Không tự nguyện</td><td>Chia cho 0, truy cập sai vùng nhớ</td></tr>
<tr><td>4. Bị tiến trình khác hủy (kill)</td><td>Không tự nguyện</td><td>Lệnh <code>kill</code>, End task</td></tr></table>
<h4 class="sub">Phân cấp tiến trình (slide 10)</h4>
<ul><li>Cha tạo con, con lại tạo con → thành <b>cây tiến trình</b>. UNIX gọi một nhóm như vậy là <b>process group</b>.</li>
<li><b>Windows không có khái niệm phân cấp</b>: mọi tiến trình được tạo ra <b>ngang bằng nhau</b>.</li></ul>`},
{id:"s2-3",title:"3. Trạng thái tiến trình, PCB và chuyển ngữ cảnh",
 figs:[["c2-11","Slide 11 – 3 trạng thái: Running, Blocked, Ready và 4 bước chuyển"],["c2-37","Slide 37 – Sơ đồ 5 trạng thái: new, ready, running, waiting, terminated"],["c2-13","Slide 13 – Khối điều khiển tiến trình (PCB)"],["c2-14","Slide 14 – Chuyển đổi ngữ cảnh giữa P0 và P1"],["c2-15","Slide 15 – Các trường của một entry trong bảng tiến trình"]],
 yt:"process state diagram ready running blocked PCB context switch",
 html:`
<p><b>3 trạng thái chính</b> (slide 11): <b>đang chạy (running)</b>, <b>bị chặn (blocked)</b>, <b>sẵn sàng (ready)</b>.</p>
<table><tr><th>Bước</th><th>Chuyển</th><th>Khi nào</th></tr>
<tr><td>1</td><td>Running → Blocked</td><td>Tiến trình <b>chờ nhập liệu / I/O</b> (process blocks for input)</td></tr>
<tr><td>2</td><td>Running → Ready</td><td>Bộ lập lịch <b>chọn tiến trình khác</b> (hết lượt CPU)</td></tr>
<tr><td>3</td><td>Ready → Running</td><td>Bộ lập lịch <b>chọn tiến trình này</b></td></tr>
<tr><td>4</td><td>Blocked → Ready</td><td><b>Dữ liệu đã có</b> (input becomes available)</td></tr></table>
<div class="tip"><b>Bẫy hay gặp:</b> <b>không có</b> đường Blocked → Running. Chờ xong I/O thì tiến trình chỉ được về <b>Ready</b>, phải xếp hàng đợi bộ lập lịch chọn lại. Cũng không có Ready → Blocked: phải đang chạy thì mới yêu cầu I/O được.</div>
<p><b>Sơ đồ 5 trạng thái</b> (slide 37): thêm <b>new</b> (vừa tạo) và <b>terminated</b> (kết thúc). new →<i>admit</i>→ ready →<i>dispatch</i>→ running →<i>exit</i>→ terminated; running →<i>interrupt</i>→ ready; running →<i>chờ I/O hoặc sự kiện</i>→ waiting →<i>I/O xong</i>→ ready.</p>
<p>Slide 12: tầng thấp nhất của HĐH lo <b>điều khiển ngắt và lập lịch</b>; phía trên là các tiến trình tuần tự.</p>
<h4 class="sub">Khối điều khiển tiến trình – PCB (slide 13, 15)</h4>
<p>Mỗi tiến trình có một <b>PCB</b> (một dòng trong <b>bảng tiến trình</b>), như “hồ sơ” để HĐH dừng tiến trình rồi cho chạy tiếp đúng chỗ cũ. PCB gồm: <b>trạng thái</b>, <b>số hiệu tiến trình</b>, <b>bộ đếm chương trình</b>, <b>các thanh ghi</b>, <b>giới hạn bộ nhớ</b>, <b>danh sách file đang mở</b>…</p>
<table><tr><th>Quản lý tiến trình</th><th>Quản lý bộ nhớ</th><th>Quản lý file</th></tr>
<tr><td>Thanh ghi, PC, program status word, stack pointer, trạng thái, độ ưu tiên, tham số lập lịch, process ID, tiến trình cha, process group, tín hiệu, thời điểm bắt đầu, thời gian CPU đã dùng…</td><td>Con trỏ tới text, data, stack segment</td><td>Thư mục gốc, thư mục làm việc, file descriptor, user ID, group ID</td></tr></table>
<h4 class="sub">Chuyển đổi ngữ cảnh (context switch, slide 14)</h4>
<ol class="steps"><li>P0 đang chạy thì có <b>ngắt hoặc system call</b>, quyền điều khiển về HĐH.</li>
<li>HĐH <b>lưu trạng thái của P0 vào PCB<sub>0</sub></b>.</li>
<li>HĐH <b>nạp trạng thái của P1 từ PCB<sub>1</sub></b>, P1 chạy. Trong lúc đó P0 nằm chờ (idle).</li>
<li>Lần đổi sau làm ngược lại: lưu vào PCB<sub>1</sub>, nạp từ PCB<sub>0</sub>.</li></ol>
<p>Thời gian chuyển ngữ cảnh là <b>thời gian chết</b>: CPU không làm việc có ích cho ai. Vì vậy đổi quá thường xuyên (quantum quá nhỏ) làm hệ thống chậm.</p>`},
{id:"s2-4",title:"4. Luồng (thread): mô hình, chia sẻ, ích lợi, cách dùng",
 figs:[["c2-17","Slide 17 – (a) 3 tiến trình mỗi cái 1 luồng, (b) 1 tiến trình 3 luồng"],["c2-20","Slide 20 – Tiến trình đơn luồng và đa luồng"],["c2-21","Slide 21 – Item dùng chung của tiến trình và item riêng của mỗi luồng"],["c2-23","Slide 23 – Trình soạn thảo với 3 luồng"],["c2-24","Slide 24 – Web server đa luồng"]],
 yt:"threads vs processes multithreading operating system",
 html:`
<p><b>Luồng (thread)</b> là một <b>dòng thực thi</b> bên trong tiến trình. Một tiến trình có thể có <b>nhiều luồng</b> chạy <b>trong cùng một môi trường</b> (cùng không gian địa chỉ, cùng file đang mở).</p>
<table><tr><th>Dùng chung cho cả tiến trình (per process)</th><th>Riêng của mỗi luồng (per thread)</th></tr>
<tr><td>Không gian địa chỉ (code, data), biến toàn cục, file đang mở, tiến trình con, báo thức đang chờ, tín hiệu và hàm xử lý tín hiệu, thông tin kế toán</td><td><b>Bộ đếm chương trình (PC)</b>, <b>thanh ghi</b>, <b>stack</b>, <b>trạng thái</b></td></tr></table>
<div class="tip"><b>Mẹo nhớ:</b> thứ gì cần để <b>“đang chạy tới đâu”</b> (PC, thanh ghi, stack, trạng thái) thì mỗi luồng một bản. Mọi thứ khác dùng chung. Vì dùng chung bộ nhớ nên các luồng <b>đọc ghi được biến của nhau</b>, và cũng vì thế mà cần đồng bộ (mục 9–11).</div>
<p><b>4 ích lợi của đa luồng</b> (slide 22):</p>
<ul><li><b>Khả năng hồi đáp</b>: một luồng bị chặn (chờ đĩa) thì luồng khác vẫn phục vụ người dùng.</li>
<li><b>Chia sẻ tài nguyên</b>: các luồng dùng chung bộ nhớ, không cần cơ chế trao đổi phức tạp.</li>
<li><b>Lợi ích kinh tế</b>: tạo luồng và chuyển giữa các luồng <b>rẻ hơn nhiều</b> so với tiến trình.</li>
<li><b>Phù hợp kiến trúc đa bộ xử lý</b>: các luồng chạy song song trên nhiều CPU.</li></ul>
<h4 class="sub">Cách dùng luồng (slide 23–25)</h4>
<table><tr><th>Ví dụ</th><th>Các luồng</th></tr>
<tr><td><b>Trình soạn thảo văn bản</b></td><td>1 luồng nhận bàn phím, 1 luồng định dạng lại trang, 1 luồng tự động lưu ra đĩa. Đang lưu file thì vẫn gõ được.</td></tr>
<tr><td><b>Web server</b></td><td><b>Dispatcher thread</b> nhận yêu cầu từ mạng rồi giao cho một <b>worker thread</b>. Worker tìm trang trong <b>web page cache</b>; không có thì đọc từ đĩa (lúc đó chỉ worker này bị chặn).</td></tr></table>
<pre class="q-pre">(a) Dispatcher                    (b) Worker
while (TRUE) {                    while (TRUE) {
  get_next_request(&amp;buf);           wait_for_work(&amp;buf);
  handoff_work(&amp;buf);               look_for_page_in_cache(&amp;buf, &amp;page);
}                                   if (page_not_in_cache(&amp;page))
                                        read_page_from_disk(&amp;buf, &amp;page);
                                    return_page(&amp;page);
                                  }</pre>`},
{id:"s2-5",title:"5. Luồng mức user, mức kernel và lai",
 figs:[["c2-26","Slide 26 – Gói luồng mức user: run-time system, thread table trong không gian user"],["c2-29","Slide 29 – Gói luồng do kernel quản lý"],["c2-31","Slide 31 – Thực hiện lai: ghép luồng user vào luồng kernel"]],
 yt:"user level threads vs kernel level threads hybrid",
 html:`
<table><tr><th></th><th>Luồng mức user (slide 26–28)</th><th>Luồng mức kernel (slide 29–30)</th></tr>
<tr><td>Ai quản lý</td><td><b>Thư viện luồng</b> (run-time system) trong không gian user: thread_create, thread_exit, thread_wait, thread_yield (tự nguyện nhường CPU)</td><td><b>Kernel</b> quản lý cả tiến trình và luồng; CPU lập lịch trực tiếp cho từng luồng</td></tr>
<tr><td>Bảng luồng</td><td><b>Thread table</b> (TCB) nằm trong tiến trình, lưu PC, thanh ghi, stack của từng luồng</td><td>Thread table nằm <b>trong kernel</b>, cạnh process table</td></tr>
<tr><td>Kernel có biết luồng?</td><td><b>Không</b>. Kernel chỉ thấy 1 tiến trình (1 PCB)</td><td><b>Có</b></td></tr>
<tr><td>Một luồng bị chặn (gọi I/O)</td><td><b>Cả tiến trình bị chặn</b>, mọi luồng khác đứng theo</td><td>Chỉ luồng đó bị chặn, <b>luồng khác vẫn chạy</b></td></tr>
<tr><td>Tốc độ tạo / quản lý</td><td>Nhanh (không phải vào kernel)</td><td><b>Chậm hơn</b> (mỗi thao tác là một system call)</td></tr>
<tr><td>Đa bộ xử lý</td><td>Không tận dụng được (kernel chỉ cấp 1 CPU cho tiến trình)</td><td><b>Tốt</b>: các luồng chạy song song trên nhiều CPU</td></tr></table>
<p><b>Thực hiện lai (hybrid, slide 31)</b>: <b>ghép nhiều luồng mức user vào một luồng mức kernel</b>. Kernel chỉ biết và lập lịch các luồng kernel; trên mỗi luồng kernel, thư viện tự chia lượt cho các luồng user của nó. Lấy được ưu điểm của cả hai.</p>
<div class="tip"><b>Ví von:</b> luồng mức user như một nhóm bạn đi chung <b>một vé</b> vào rạp: soát vé (kernel) chỉ thấy 1 người, nhanh gọn; nhưng người cầm vé bị giữ lại thì cả nhóm đứng ngoài. Luồng mức kernel thì <b>mỗi người một vé</b>: soát lâu hơn, nhưng ai bị giữ thì người khác vẫn vào được.</div>`},
{id:"s2-6",title:"6. Lập lịch: khi nào, độc quyền hay không, tiêu chí",
 figs:[["c2-34","Slide 34 – (a) tiến trình hướng CPU, (b) tiến trình hướng I/O"],["c2-35","Slide 35 – Ba mức lập lịch"],["c2-40","Slide 40 – Mục đích của thuật toán lập lịch theo từng loại hệ thống"]],
 yt:"cpu scheduling criteria preemptive nonpreemptive",
 html:`
<p>Đa chương trình nhằm <b>tận dụng CPU tối đa</b>. Tiến trình chạy theo chu kỳ <b>CPU burst</b> (dùng CPU) xen với <b>chờ I/O</b> (slide 33, 34):</p>
<ul><li><b>Tiến trình hướng CPU (CPU-bound)</b>: CPU burst <b>dài</b>, ít chờ I/O (tính toán nặng).</li>
<li><b>Tiến trình hướng I/O (I/O-bound)</b>: CPU burst <b>ngắn</b>, chờ I/O nhiều (soạn thảo, đọc file).</li></ul>
<p><b>Ba mức lập lịch</b> (slide 35): <b>admission scheduler</b> chọn job từ hàng đợi vào hệ thống; <b>memory scheduler</b> chọn tiến trình nào nằm trong RAM, tiến trình nào ra đĩa; <b>CPU scheduler</b> chọn tiến trình trong RAM được chạy.</p>
<h4 class="sub">Khi nào bộ lập lịch CPU phải chọn? (slide 36)</h4>
<ol><li>Tiến trình chuyển từ <b>running → blocked</b> (chờ I/O).</li>
<li>Tiến trình chuyển từ <b>running → ready</b> (bị ngắt, hết lượt).</li>
<li>Tiến trình chuyển từ <b>blocked → ready</b>, hoặc có tiến trình mới vào ready.</li>
<li>Tiến trình <b>kết thúc</b>.</li></ol>
<table><tr><th></th><th>Độc quyền (nonpreemptive)</th><th>Không độc quyền (preemptive)</th></tr>
<tr><td>Cách làm</td><td>Chọn tiến trình rồi cho chạy <b>tới khi nó bị chặn hoặc tự nguyện nhả CPU</b></td><td>Cho chạy <b>trong một khoảng thời gian xác định</b>; hết giờ hoặc có tiến trình ưu tiên hơn thì <b>bị giành CPU</b></td></tr>
<tr><td>Xảy ra ở trường hợp <span class="xs">ngoài slide</span></td><td>Chỉ 1 và 4</td><td>Cả 2 và 3</td></tr>
<tr><td>Ví dụ</td><td>FCFS, SJF độc quyền</td><td>RR, SRTF, ưu tiên có giành quyền</td></tr></table>
<h4 class="sub">Tiêu chí lập lịch (slide 38, 39)</h4>
<table><tr><th>Tiêu chí</th><th>Nghĩa</th><th>Tối ưu</th></tr>
<tr><td>CPU utilization</td><td>Giữ CPU bận nhiều nhất có thể</td><td><b>Max</b></td></tr>
<tr><td>Throughput</td><td>Số tiến trình xong trên một đơn vị thời gian</td><td><b>Max</b></td></tr>
<tr><td>Turnaround time</td><td>Thời gian xoay vòng: từ lúc đến tới lúc xong</td><td><b>Min</b></td></tr>
<tr><td>Waiting time</td><td>Tổng thời gian nằm chờ trong <b>hàng đợi ready</b></td><td><b>Min</b></td></tr>
<tr><td>Response time</td><td>Từ lúc gửi yêu cầu tới lúc có <b>phản hồi đầu tiên</b></td><td><b>Min</b></td></tr></table>
<div class="formula">Turnaround = thời điểm xong − thời điểm đến · Waiting = Turnaround − thời gian chạy (burst)</div>
<p><b>Mục đích theo loại hệ thống</b> (slide 40): <b>mọi hệ thống</b>: công bằng, thực thi đúng chính sách, giữ mọi bộ phận bận. <b>Batch</b>: throughput, turnaround, CPU utilization. <b>Tương tác</b>: response time, đáp ứng mong đợi người dùng. <b>Thời gian thực</b>: kịp hạn chót, ổn định (không làm giảm chất lượng đa phương tiện).</p>`},
{id:"s2-7",title:"7. Các thuật toán lập lịch: FCFS, SJF/SRTF, RR, ưu tiên",
 figs:[["c2-44","Slide 44 – SJF: (a) chạy theo thứ tự đến, (b) công việc ngắn trước"],["c2-45","Slide 45 – Round Robin: B hết quantum thì xuống cuối hàng"],["c2-49","Slide 49 – Lập lịch với 4 lớp ưu tiên"]],
 yt:"FCFS SJF SRTF round robin priority scheduling example",
 html:`
<h4 class="sub">FCFS – đến trước phục vụ trước (slide 41, 42)</h4>
<p>Độc quyền. Ví dụ P1 = 24, P2 = 3, P3 = 3 (cùng đến lúc 0):</p>
<table><tr><th>Thứ tự</th><th>Gantt</th><th>Thời gian chờ</th><th>Trung bình</th></tr>
<tr><td>P1, P2, P3</td><td>P1 0–24 · P2 24–27 · P3 27–30</td><td>0, 24, 27</td><td><b>17</b></td></tr>
<tr><td>P2, P3, P1</td><td>P2 0–3 · P3 3–6 · P1 6–30</td><td>6, 0, 3</td><td><b>3</b></td></tr></table>
<p>→ FCFS <b>phụ thuộc vào thời gian của những tiến trình đầu danh sách</b>: một tiến trình dài đứng đầu bắt cả hàng chờ (hiệu ứng đoàn xe, convoy effect <span class="xs">ngoài slide</span>).</p>
<h4 class="sub">SJF – công việc ngắn nhất trước (slide 43, 44)</h4>
<ul><li>Chọn tiến trình có <b>CPU burst kế tiếp ngắn nhất</b>.</li>
<li><b>Độc quyền</b>: đã cấp CPU thì chạy hết burst.</li>
<li><b>Không độc quyền = SRTF</b> (Shortest-Remaining-Time-First): tiến trình mới đến có burst <b>ngắn hơn thời gian còn lại</b> của tiến trình đang chạy thì <b>giành CPU</b>.</li>
<li>SJF là <b>tối ưu</b>: cho <b>thời gian chờ trung bình nhỏ nhất</b>. Khó khăn: phải đoán trước burst.</li></ul>
<div class="ex"><b>Slide 44:</b> A = 8, B = C = D = 4. (a) Chạy A, B, C, D: xoay vòng 8, 12, 16, 20 → TB <b>14</b>. (b) SJF: B, C, D, A: xoay vòng 4, 8, 12, 20 → TB <b>11</b>.</div>
<h4 class="sub">Round Robin – xoay vòng (slide 45–47)</h4>
<ul><li>Mỗi tiến trình được một <b>quantum</b> thời gian (thường 10–100 ms). Hết quantum mà chưa xong thì <b>xuống cuối hàng đợi ready</b>.</li>
<li>n tiến trình, quantum q: <b>không ai chờ quá (n − 1)·q</b>.</li>
<li><b>q lớn</b> → giống FIFO. <b>q nhỏ</b> → tốn nhiều thời gian chuyển ngữ cảnh, hiệu suất thấp.</li>
<li>So với SJF: thời gian xoay vòng trung bình <b>cao hơn</b>, nhưng <b>thời gian hồi đáp tốt hơn</b>.</li></ul>
<div class="ex"><b>Slide 47:</b> q = 20; P1 = 53, P2 = 17, P3 = 68, P4 = 24.<br>Gantt: P1 0–20 · P2 20–37 · P3 37–57 · P4 57–77 · P1 77–97 · P3 97–117 · P4 117–121 · P1 121–134 · P3 134–154 · P3 154–162.<br><small class="muted">Tính thêm: thời gian chờ P1 = 134 − 53 = 81, P2 = 37 − 17 = 20, P3 = 162 − 68 = 94, P4 = 121 − 24 = 97 → TB 73.</small></div>
<h4 class="sub">Lập lịch theo độ ưu tiên (slide 48, 49)</h4>
<ul><li>Mỗi tiến trình có một <b>số ưu tiên</b>; CPU cấp cho tiến trình <b>ưu tiên cao nhất</b>. Có cả kiểu độc quyền và không độc quyền.</li>
<li><b>SJF là trường hợp đặc biệt</b> của lập lịch ưu tiên (ưu tiên = burst càng ngắn càng cao).</li>
<li>Vấn đề: <b>đói CPU (starvation)</b>, tiến trình ưu tiên thấp có thể không bao giờ được chạy.</li>
<li>Giải pháp: <b>lão hóa (aging)</b>, <b>tăng dần độ ưu tiên</b> của tiến trình chờ lâu.</li>
<li><b>Nhiều lớp ưu tiên</b> (slide 49): chạy hết các tiến trình ở lớp cao nhất (trong lớp dùng RR) rồi mới xuống lớp thấp hơn.</li></ul>
<div class="demo" data-demo="sched"></div>`},
{id:"s2-8",title:"8. Thời gian thực, chính sách/cơ chế và lập lịch luồng",
 figs:[["c2-54","Slide 54 – Lập lịch luồng mức user"],["c2-55","Slide 55 – Lập lịch luồng mức kernel"]],
 yt:"real time scheduling hard soft thread scheduling user kernel",
 html:`
<h4 class="sub">Hệ thống thời gian thực (slide 50, 51)</h4>
<ul><li><b>Hard real-time</b>: tác vụ quan trọng <b>bắt buộc xong trong thời hạn đảm bảo</b> (phanh ABS, máy thở).</li>
<li><b>Soft real-time</b>: tiến trình quan trọng <b>được ưu tiên hơn</b>, trễ chút cũng chấp nhận được (phát video).</li></ul>
<div class="formula">m sự kiện định kỳ; sự kiện i có chu kỳ P<sub>i</sub>, cần C<sub>i</sub> giây CPU → lập lịch được nếu <b>Σ C<sub>i</sub> / P<sub>i</sub> ≤ 1</b></div>
<div class="ex"><b>Ví dụ</b> <span class="xs">ngoài slide</span>: 3 sự kiện chu kỳ 100, 200, 500 ms, cần 50, 30, 100 ms CPU → 0,5 + 0,15 + 0,2 = 0,85 ≤ 1 → <b>lập lịch được</b>.</div>
<h4 class="sub">Chính sách và cơ chế (slide 52)</h4>
<p>Tách <b>cái được phép làm</b> (chính sách) khỏi <b>cách làm</b> (cơ chế). Thuật toán lập lịch được <b>tham số hóa</b>: <b>cơ chế nằm trong kernel</b>, còn <b>tham số do tiến trình người dùng điền</b> (chính sách). Ví dụ: tiến trình cha biết luồng con nào quan trọng nên tự đặt ưu tiên cho nó.</p>
<h4 class="sub">Lập lịch luồng (slide 53–55)</h4>
<table><tr><th></th><th>Luồng mức user (lập lịch cục bộ)</th><th>Luồng mức kernel (lập lịch toàn cục)</th></tr>
<tr><td>Ai chọn</td><td>Kernel chọn <b>tiến trình</b>, thư viện luồng trong tiến trình chọn <b>luồng</b></td><td>Kernel chọn thẳng <b>luồng</b></td></tr>
<tr><td>Quantum tiến trình 50 ms, mỗi luồng chạy 5 ms</td><td>A1, A2, A3, A1, A2, A3 <b>có thể</b>; A1, B1, A2, B2… <b>không thể</b> (phải hết 50 ms của A mới sang B)</td><td>Cả A1, A2, A3… và A1, B1, A2, B2… <b>đều có thể</b></td></tr></table>`},
{id:"s2-9",title:"9. Giao tiếp liên tiến trình: tranh đua và miền găng",
 figs:[["c2-61","Slide 61 – Loại trừ nhau bằng đoạn găng: B bị chặn tới khi A ra khỏi"]],
 yt:"race condition critical section mutual exclusion",
 html:`
<ul><li><b>Tiến trình độc lập</b>: không ảnh hưởng và không bị ảnh hưởng bởi tiến trình khác.</li>
<li><b>Tiến trình tương tác (cooperating)</b>: có ảnh hưởng qua lại. Ưu điểm: <b>chia sẻ thông tin, tăng tốc tính toán, module hóa, tiện lợi</b>.</li></ul>
<p><b>Vấn đề dữ liệu chia sẻ</b> (slide 58): truy cập đồng thời có thể làm <b>dữ liệu không nhất quán</b>, nên cần cơ chế <b>giao tiếp và đồng bộ</b> để các tiến trình chạy có trật tự.</p>
<p><b>Điều kiện tranh đua (race condition)</b>: hai tiến trình cùng truy cập bộ nhớ chia sẻ, và <b>kết quả cuối cùng phụ thuộc vào tiến trình nào chạy lúc nào</b>.</p>
<div class="ex"><b>Ví dụ</b> <span class="xs">ngoài slide</span>: biến chung <code>x = 5</code>. P1 làm <code>x = x + 1</code>, P2 làm <code>x = x − 1</code>. Mỗi lệnh thật ra là 3 bước: đọc, tính, ghi. Nếu P1 đọc 5, rồi bị ngắt, P2 đọc 5 ghi 4, rồi P1 ghi 6 → kết quả <b>6</b> thay vì 5. Chạy lại có khi ra 4, có khi ra 5.</div>
<p><b>Loại trừ lẫn nhau (mutual exclusion)</b>: cấm nhiều tiến trình truy cập dữ liệu chia sẻ <b>cùng một lúc</b>.</p>
<p><b>Đoạn găng / miền găng (critical region, critical section – CS)</b>: <b>phần chương trình truy cập bộ nhớ dùng chung</b>.</p>
<h4 class="sub">4 điều kiện của một giải pháp loại trừ tốt (slide 60)</h4>
<table><tr><th>#</th><th>Điều kiện</th><th>Tên hay gặp trong đề</th></tr>
<tr><td>1</td><td><b>Không có hai tiến trình cùng ở trong đoạn găng</b></td><td>Loại trừ lẫn nhau</td></tr>
<tr><td>2</td><td>Không giả định gì về <b>tốc độ</b> hay <b>số CPU</b></td><td></td></tr>
<tr><td>3</td><td>Tiến trình <b>ở ngoài</b> đoạn găng <b>không được chặn</b> tiến trình khác vào</td><td>Tiến độ (progress)</td></tr>
<tr><td>4</td><td>Không tiến trình nào phải <b>chờ vô hạn</b> để vào đoạn găng</td><td>Chờ đợi có hạn (bounded waiting)</td></tr></table>
<p><b>Slide 61</b>: A vào đoạn găng lúc T1. B muốn vào lúc T2 nên <b>bị chặn</b>. A ra lúc T3 thì B mới vào; B ra lúc T4.</p>
<div class="tip"><b>Ví von:</b> nhà vệ sinh một buồng. Đoạn găng là lúc ở trong buồng. Điều kiện 1: không hai người cùng vào. Điều kiện 3: người đứng ngoài không được giữ khóa cửa. Điều kiện 4: không ai phải xếp hàng mãi mãi.</div>`},
{id:"s2-10",title:"10. Loại trừ nhau với chờ bận: Lock, luân phiên, Peterson, cấm ngắt, TSL",
 figs:[["c2-63","Slide 63 – Giải pháp mềm 1: biến khóa (lock)"],["c2-65","Slide 65 – Giải pháp mềm 2: luân phiên với biến turn"],["c2-67","Slide 67 – Giải pháp mềm 3: Peterson"],["c2-75","Slide 75 – Giải pháp cứng 2: áp dụng TSL"]],
 yt:"peterson solution strict alternation test and set lock busy waiting",
 html:`
<p><b>Chờ bận (busy waiting)</b>: chưa được vào đoạn găng thì <b>lặp liên tục kiểm tra điều kiện</b> (<code>while (…); // wait</code>), vẫn chiếm CPU. Có 2 nhóm giải pháp (slide 62):</p>
<table><tr><th>Giải pháp mềm (phần mềm)</th><th>Giải pháp cứng (phần cứng)</th></tr>
<tr><td>1. Biến khóa (Lock variables) · 2. Luân phiên (Strict alternation) · 3. Peterson</td><td>1. Cấm ngắt (Disabling interrupts) · 2. Lệnh TSL</td></tr></table>
<h4 class="sub">Mềm 1: biến khóa (slide 63, 64)</h4>
<pre class="q-pre">int lock = 0;
while (lock == 1);  // wait
lock = 1;
CS;
lock = 0;</pre>
<p><b>Sai ở đâu?</b> Kiểm tra (<code>lock == 1</code>) và đặt (<code>lock = 1</code>) là <b>hai bước rời nhau</b> (slide 64 tô đậm đúng hai dòng này). P0 thấy lock = 0, chưa kịp đặt lock = 1 thì bị ngắt; P1 cũng thấy lock = 0 và vào CS; P0 chạy tiếp cũng vào → <b>cả hai cùng ở trong CS</b>. Vi phạm điều kiện 1.</p>
<h4 class="sub">Mềm 2: luân phiên (slide 65, 66)</h4>
<pre class="q-pre">int turn = 1;
/* P0 */                      /* P1 */
while (turn != 0);  // wait   while (turn != 1);  // wait
CS;                           CS;
turn = 1;                     turn = 0;</pre>
<ul><li>Dành cho <b>2 tiến trình</b>; biến <code>turn</code> cho biết <b>đến phiên ai</b>. <b>Có loại trừ</b> được.</li>
<li>Ban đầu turn = 1 → <b>P1 vào trước</b>.</li>
<li>Nhược điểm: bắt <b>thay phiên cứng nhắc</b>. P0 muốn vào 2 lần liên tiếp phải chờ P1 vào một lần, dù P1 đang bận việc ngoài CS → <b>vi phạm điều kiện 3</b> (tiến trình ngoài CS chặn người khác).</li></ul>
<h4 class="sub">Mềm 3: Peterson (slide 67–69)</h4>
<pre class="q-pre">int turn;
Boolean interest[2] = FALSE;
/* Pi */
j = 1 - i;
interest[i] = TRUE;                        // tôi muốn vào
turn = j;                                  // nhường lượt cho bạn
while (turn == j &amp;&amp; interest[j] == TRUE);   // bạn muốn và đang tới lượt bạn thì chờ
CS;
interest[i] = FALSE;</pre>
<ul><li><b>Kết hợp</b> ý tưởng <b>biến khóa (interest)</b> và <b>luân phiên (turn)</b>.</li>
<li><b>Loại trừ nhau</b>: Pi vào CS khi interest[j] == FALSE <b>hoặc</b> turn == i. Nếu cả hai cùng muốn, turn chỉ mang được 0 hoặc 1 nên chỉ một tiến trình vào.</li>
<li><b>Tiến độ</b>: dùng 2 biến interest riêng, tiến trình không muốn vào thì không chặn ai.</li>
<li><b>Chờ có hạn</b>: interest và turn đều thay đổi giá trị nên không ai chờ mãi.</li>
<li>Nhược: <b>không mở rộng cho N tiến trình</b>, vẫn chờ bận.</li></ul>
<div class="tip"><b>Ví von Peterson:</b> hai người cùng tới cửa. Mỗi người giơ tay “tôi muốn vào” (interest) rồi <b>lịch sự nói “mời bạn trước”</b> (turn = j). Người nói câu đó <b>sau cùng</b> sẽ phải chờ.</div>
<h4 class="sub">Cứng 1: cấm ngắt (slide 72, 73)</h4>
<p>Vào CS thì <b>Disable Interrupt</b> (cấm mọi ngắt, nên không bị chuyển sang tiến trình khác), ra thì <b>Enable Interrupt</b>. Nguy hiểm:</p>
<ul><li>Tiến trình kẹt trong CS (vòng lặp vô hạn) thì <b>cả hệ thống đứng</b>.</li>
<li>Phải cho tiến trình người dùng dùng <b>lệnh đặc quyền</b> → nguy hiểm.</li>
<li>Hệ thống <b>N CPU</b>: cấm ngắt chỉ có tác dụng trên một CPU → <b>không chắc loại trừ</b>.</li></ul>
<h4 class="sub">Cứng 2: lệnh TSL – Test and Set Lock (slide 74, 75)</h4>
<pre class="q-pre">int lock = 0;
while (TSL(lock));  // wait
CS;
lock = 0;</pre>
<p>CPU cung cấp lệnh <b>TSL</b>: <b>trả về giá trị hiện tại</b> của biến và <b>đặt biến thành TRUE</b>, tất cả trong <b>một lệnh không thể chia cắt</b> (nguyên tử). Nhờ vậy sửa được đúng lỗi của biến khóa: không ai chen vào giữa bước kiểm tra và bước đặt. Biến lock khởi tạo bằng <b>0</b>.</p>
<p><b>Nhận xét giải pháp cứng</b> (slide 76): phù hợp khi có hỗ trợ phần cứng, <b>dễ mở rộng cho N tiến trình</b>, nhưng không dễ trên hệ nhiều CPU. TSL còn có thể gây <b>đói (starvation)</b>: các tiến trình tranh nhau, ai nhanh tay thì vào, có tiến trình thua mãi.</p>
<h4 class="sub">Nhận xét chung về chờ bận (slide 70, 77)</h4>
<ul><li><b>Lãng phí thời gian CPU</b>: lặp kiểm tra liên tục. Khó mở rộng.</li>
<li>Khắc phục: tiến trình chưa đủ điều kiện vào CS nên <b>bị chặn lại (ngủ)</b> để nhường CPU → <b>Sleep &amp; Wakeup</b> (mục 11).</li></ul>`},
{id:"s2-11",title:"11. Sleep & Wakeup, Semaphore, Monitor, Message passing",
 figs:[["c2-81","Slide 81 – Áp dụng Sleep() và Wakeup()"],["c2-84","Slide 84 – Cấu trúc Semaphore: giá trị và danh sách tiến trình bị chặn"],["c2-85","Slide 85 – Down(S) và Up(S)"],["c2-86","Slide 86 – Sử dụng Semaphore: s = 1 để loại trừ, s = 0 để định thứ tự"],["c2-90","Slide 90 – Sử dụng Monitor"]],
 yt:"semaphore monitor sleep wakeup message passing operating system",
 html:`
<p>Ba giải pháp đồng bộ theo kiểu Sleep &amp; Wakeup (slide 78): <b>Semaphore, Monitor, Message passing</b>.</p>
<h4 class="sub">Sleep &amp; Wakeup (slide 79–82)</h4>
<ul><li>Không vào được CS thì <b>từ bỏ CPU</b> (ngủ). Ra khỏi CS thì <b>đánh thức</b> tiến trình đang chờ.</li>
<li>Cần <b>HĐH hỗ trợ</b> vì làm thay đổi trạng thái tiến trình. HĐH cung cấp 2 lời gọi hệ thống: <b>Sleep()</b> chuyển tiến trình sang <b>bị chặn</b>; <b>WakeUp(P)</b> chuyển P sang <b>sẵn sàng</b>.</li></ul>
<pre class="q-pre">if (busy) { blocked = blocked + 1; Sleep(); }
else busy = 1;
CS;
busy = 0;
if (blocked) { WakeUp(P); blocked = blocked - 1; }</pre>
<p><b>Vấn đề</b> (slide 82): bước <b>kiểm tra điều kiện</b> và bước <b>từ bỏ CPU</b> có thể bị ngắt chen giữa; <b>biến khóa không được bảo vệ</b>. Ví dụ: P thấy busy = 1, chưa kịp Sleep thì bị ngắt; tiến trình kia ra khỏi CS gọi WakeUp nhưng P chưa ngủ nên tín hiệu bị mất; P quay lại ngủ và <b>ngủ mãi</b> (mất tín hiệu đánh thức).</p>
<h4 class="sub">Semaphore (slide 83–86)</h4>
<ul><li>Do <b>Dijkstra</b> đề xuất năm <b>1965</b>. Semaphore s gồm một <b>giá trị nguyên</b> và một <b>danh sách các tiến trình bị chặn</b>.</li>
<li>Hai lời gọi hệ thống <b>Down(s)</b> và <b>Up(s)</b>, thực hiện <b>không bị chia cắt</b>.</li></ul>
<pre class="q-pre">Down(S) {                    Up(S) {
  S.value--;                   S.value++;
  if (S.value &lt; 0) {           if (S.value &lt;= 0) {
    Add(P, S.L);                 Remove(P, S.L);
    Sleep();                     Wakeup(P);
  }                            }
}                            }</pre>
<table><tr><th>Cách dùng (slide 86)</th><th>Code</th><th>Ý nghĩa</th></tr>
<tr><td><b>s = 1</b>: loại trừ lẫn nhau</td><td>Down(s); CS; Up(s);</td><td>Người đầu tiên làm s = 0 rồi vào; người sau làm s âm thì ngủ</td></tr>
<tr><td><b>s = 0</b>: định thứ tự</td><td>P1: Job1; Up(s); · P2: Down(s); Job2;</td><td><b>Job2 luôn chạy sau Job1</b>: P2 Down trước thì ngủ cho tới khi P1 Up</td></tr></table>
<div class="tip"><b>Đọc giá trị semaphore:</b> value dương = số tài nguyên còn trống; value âm = <b>số tiến trình đang chờ</b> (ví dụ −2 là 2 tiến trình đang ngủ). <span class="xs">ngoài slide</span>: semaphore chỉ nhận 0/1 gọi là <b>nhị phân (binary)</b>, nhận số bất kỳ gọi là <b>đếm (counting)</b>.</div>
<h4 class="sub">Monitor (slide 87–90)</h4>
<ul><li>Đề xuất bởi <b>Hoare (1974)</b> và <b>Brinch Hansen (1975)</b>. Là cơ chế đồng bộ <b>do ngôn ngữ lập trình cung cấp</b>.</li>
<li>Chức năng như semaphore nhưng <b>dễ dùng, ít sai hơn</b>: <b>loại trừ được thực hiện tự động</b> (mỗi lúc chỉ một tiến trình chạy trong monitor).</li>
<li>Dùng <b>biến điều kiện (condition)</b> với <b>Wait(c)</b> và <b>Signal(c)</b> để định thứ tự. Ví dụ slide 90: F1 làm Job1 rồi Signal(c); F2 Wait(c) rồi mới làm Job2.</li></ul>
<pre class="q-pre">monitor monitor-name {
  shared variable declarations
  procedure body P1 (…) { … }
  …
  procedure body Pn (…) { … }
  { initialization code }
}</pre>
<h4 class="sub">Message passing (slide 91)</h4>
<ul><li><code>send(P, message)</code> gửi cho tiến trình P; <code>receive(Q, message)</code> nhận từ Q. Tiến trình phải <b>biết rõ tên</b> bên kia.</li>
<li>Liên kết <b>tự động thiết lập</b>; mỗi liên kết gắn với <b>đúng một cặp</b> tiến trình; giữa mỗi cặp có <b>đúng một</b> liên kết; liên kết có thể một chiều nhưng thường <b>hai chiều</b>.</li></ul>
<h4 class="sub">Các bài toán đồng bộ kinh điển (slide 92)</h4>
<ul><li><b>Bounded-Buffer</b> (Producer–Consumer, người sản xuất – người tiêu dùng): bộ đệm có hạn, đầy thì người sản xuất chờ, rỗng thì người tiêu dùng chờ.</li>
<li><b>Readers and Writers</b>: nhiều người đọc cùng lúc được, nhưng người ghi phải độc quyền.</li>
<li><b>Dining-Philosophers</b> (bữa tối của các triết gia): 5 triết gia ngồi quanh bàn, giữa mỗi hai người có 1 chiếc đũa; muốn ăn phải cầm đủ 2 chiếc. Minh họa deadlock và starvation khi cấp nhiều tài nguyên.</li></ul>`},
{id:"s2-12",title:"✔ Ghi nhớ nhanh Chương 2",
 figs:[], yt:"",
 html:`
<ul class="checklist">
<li>Tiến trình = <b>chương trình đang chạy</b>; cần không gian địa chỉ, PC, thanh ghi, stack, file đang mở.</li>
<li>Tạo tiến trình: khởi động HĐH, system call, người dùng yêu cầu, batch job. <code>fork</code> sao chép cha, <code>exec</code> nạp chương trình mới. n lần fork → 2<sup>n</sup> tiến trình.</li>
<li>3 trạng thái Running / Blocked / Ready, 4 bước chuyển; <b>không có Blocked → Running</b>.</li>
<li>PCB lưu trạng thái để chuyển ngữ cảnh: lưu vào PCB<sub>0</sub>, nạp từ PCB<sub>1</sub>.</li>
<li>Luồng riêng: <b>PC, thanh ghi, stack, trạng thái</b>; còn lại dùng chung. Luồng user: nhanh, nhưng 1 luồng chặn là cả tiến trình chặn. Luồng kernel: ngược lại.</li>
<li>Độc quyền: chạy tới khi bị chặn hoặc tự nhả. Không độc quyền: có hạn giờ, bị giành CPU.</li>
<li>Max: CPU utilization, throughput. Min: turnaround, waiting, response.</li>
<li>SJF tối ưu thời gian chờ TB; SRTF là SJF có giành quyền; RR: q lớn → FIFO, q nhỏ → tốn chuyển ngữ cảnh; ưu tiên → đói → <b>aging</b>.</li>
<li>Thời gian thực lập lịch được khi <b>Σ C<sub>i</sub>/P<sub>i</sub> ≤ 1</b>.</li>
<li>Tranh đua = kết quả phụ thuộc thứ tự chạy. Đoạn găng = đoạn truy cập dữ liệu chung. <b>4 điều kiện</b>: loại trừ, không giả định tốc độ/số CPU, ngoài CS không chặn ai, không chờ vô hạn.</li>
<li>Chờ bận: Lock (sai vì kiểm tra và đặt tách rời), luân phiên (turn, cứng nhắc), Peterson (interest + turn, chỉ 2 tiến trình), cấm ngắt (nguy hiểm, không dùng được cho N CPU), TSL (nguyên tử, lock khởi tạo 0).</li>
<li>Sleep &amp; Wakeup: không tốn CPU khi chờ; lỗi mất tín hiệu đánh thức. Semaphore (Dijkstra 1965): Down/Up; s = 1 để loại trừ, s = 0 để định thứ tự. Monitor (Hoare 1974): loại trừ tự động, biến điều kiện. Message passing: send/receive.</li>
</ul>`}
]});

Object.assign(window.EASY, {
"s2-1":{tl:"Chương trình nằm im trên đĩa; <b>chạy lên thì thành tiến trình</b>. Một CPU chỉ chạy một tiến trình mỗi lúc, nhưng đổi qua lại rất nhanh nên trông như chạy cùng lúc.",
 vi:"Một đầu bếp nấu 4 món: mỗi lúc chỉ đảo một chảo, nhưng mỗi món có tờ ghi “đang tới bước nào”, nên quay lại là nấu tiếp đúng chỗ."},
"s2-2":{tl:"Tiến trình sinh ra khi bật máy, khi có system call, khi người dùng mở app, khi có batch job. UNIX: <b>fork</b> nhân bản, <b>exec</b> thay ruột bằng chương trình mới.",
 vi:"fork như photo một tờ đơn; exec là xóa nội dung bản photo rồi viết đơn mới lên đó."},
"s2-3":{tl:"Tiến trình luôn ở 1 trong 3 trạng thái: <b>đang chạy, chờ I/O, sẵn sàng</b>. Mỗi lần đổi tiến trình, HĐH cất “hồ sơ” vào <b>PCB</b> và lấy hồ sơ của tiến trình kia ra.",
 vi:"Học sinh đang làm bài (running), giơ tay chờ cô phát giấy (blocked), có giấy rồi ngồi chờ tới lượt lên bảng (ready). Không thể đang chờ giấy mà nhảy thẳng lên bảng."},
"s2-4":{tl:"Luồng là <b>nhiều dòng chạy trong cùng một tiến trình</b>, dùng chung bộ nhớ và file; mỗi luồng chỉ riêng PC, thanh ghi, stack.",
 vi:"Một nhà hàng (tiến trình) có nhiều nhân viên (luồng) dùng chung bếp và kho, nhưng mỗi người cầm một tờ order riêng."},
"s2-5":{tl:"Luồng user: thư viện tự quản, kernel không biết → nhanh nhưng một luồng chặn là cả tiến trình chặn. Luồng kernel: kernel quản → chậm hơn nhưng chạy song song, không kéo nhau chết.",
 vi:"Đi chung một vé (user) hay mỗi người một vé (kernel) vào rạp."},
"s2-6":{tl:"Bộ lập lịch quyết định ai được CPU. <b>Độc quyền</b>: cho chạy tới khi tự nhả. <b>Không độc quyền</b>: có hạn giờ, bị giành. Mục tiêu: CPU bận, xong nhiều việc, chờ ít.",
 vi:"Quầy thu ngân: phục vụ một khách tới hết giỏ hàng (độc quyền), hay mỗi khách tối đa 2 phút rồi xếp lại cuối hàng (không độc quyền)."},
"s2-7":{tl:"<b>FCFS</b> ai đến trước làm trước; <b>SJF</b> việc ngắn trước (chờ TB ít nhất); <b>RR</b> chia lượt quantum; <b>ưu tiên</b> chọn người quan trọng nhất, chống đói bằng aging.",
 vi:"Xếp hàng mua cơm: ai mua 1 hộp cho lên trước (SJF) thì cả hàng đỡ chờ; còn ai cũng được lấy 1 hộp rồi xếp lại (RR) thì không ai phải đứng quá lâu."},
"s2-8":{tl:"Thời gian thực: phải kịp hạn; kiểm tra bằng tổng C/P ≤ 1. Lập lịch luồng user: kernel chọn tiến trình, thư viện chọn luồng. Luồng kernel: kernel chọn thẳng luồng.",
 vi:"Hard real-time như phanh xe: trễ là tai nạn. Soft real-time như xem video: trễ chút thì giật hình."},
"s2-9":{tl:"Hai tiến trình cùng sửa một biến chung thì kết quả có thể sai tùy thứ tự chạy (<b>tranh đua</b>). Đoạn code đụng vào dữ liệu chung là <b>miền găng</b>: mỗi lúc chỉ một người được vào.",
 vi:"Hai người cùng chuyển tiền vào một tài khoản, cùng đọc số dư cũ rồi cùng ghi đè: mất một lần chuyển."},
"s2-10":{tl:"Chờ bận = đứng ngoài cửa liên tục hỏi “xong chưa?”. Biến khóa hỏng vì kiểm tra và khóa là 2 bước; <b>Peterson</b> và <b>TSL</b> làm đúng; cấm ngắt thì nguy hiểm.",
 vi:"Peterson: hai người cùng tới cửa, ai nói “mời bạn trước” sau cùng thì người đó đứng chờ."},
"s2-11":{tl:"Thay vì đứng hỏi liên tục thì <b>đi ngủ, xong sẽ được gọi dậy</b>. Semaphore: Down để xin (hết thì ngủ), Up để trả (có người chờ thì đánh thức). Monitor tự lo loại trừ.",
 vi:"Semaphore như số chỗ trống ở bãi xe: vào thì trừ 1, hết chỗ thì đợi; xe ra thì cộng 1 và gọi xe đang đợi vào."}
});
