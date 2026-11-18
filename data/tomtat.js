/* Tổng hợp kiến thức từng chương – nội dung HTML */
window.SUMMARY = [
{
ch:4, title:"Quản lý Bộ nhớ", en:"Memory Management",
intro:"Chương này trả lời câu hỏi: <b>HĐH chia RAM cho nhiều tiến trình thế nào</b> để vừa an toàn (không đè lên nhau), vừa tận dụng tối đa, và cho chạy được chương trình lớn hơn cả RAM (bộ nhớ ảo).",
sections:[
{id:"s4-1",title:"1. Ý tưởng nền tảng",html:`
<p>Người lập trình muốn bộ nhớ <b>lớn – nhanh – ổn định</b>. Không loại nào có đủ cả 3 → phải <b>phân cấp bộ nhớ</b>:</p>
<div class="flow"><span>Cache<small>ít · nhanh · đắt</small></span><i>→</i><span>RAM<small>vừa · vừa · vừa</small></span><i>→</i><span>Đĩa<small>GB · chậm · rẻ</small></span></div>
<p><b>Memory manager</b> là phần HĐH quản lý phân cấp này.</p>
<table><tr><th>Loại địa chỉ</th><th>Do ai sinh ra</th><th>Ghi nhớ</th></tr>
<tr><td>Logic (ảo / virtual)</td><td>CPU sinh ra</td><td>“Chương trình nhìn thấy”</td></tr>
<tr><td>Vật lý (physical)</td><td>Bộ nhớ vật lý nhìn thấy</td><td>“RAM thật nhìn thấy”</td></tr></table>
<div class="tip"><b>Mẹo:</b> Vấn đề trung tâm của cả chương = <b>ánh xạ địa chỉ logic → địa chỉ vật lý</b>. Mọi kỹ thuật (base/limit, phân trang, phân đoạn) chỉ là các cách ánh xạ khác nhau.</div>`},
{id:"s4-2",title:"2. Đơn nhiệm & phân vùng cố định",html:`
<ul><li><b>Đơn nhiệm</b> (không swapping/paging): 1 HĐH + 1 tiến trình user. Có 3 cách bố trí (HĐH ở RAM; HĐH ở ROM; driver ở ROM + HĐH ở RAM).</li>
<li><b>Đa nhiệm với phân vùng cố định (Fixed Partitions)</b>: RAM chia sẵn thành các phân vùng.
 <ul><li>(a) <b>Nhiều hàng đợi vào</b> – mỗi phân vùng 1 hàng đợi → có thể phân vùng lớn trống mà hàng đợi phân vùng nhỏ thì dài.</li>
 <li>(b) <b>Một hàng đợi vào chung</b>.</li></ul></li></ul>`},
{id:"s4-3",title:"3. Tái cấp phát & bảo vệ (Base – Limit)",html:`
<p>Lý do cần: không biết trước chương trình nạp vào đâu; địa chỉ biến/code có thể thay đổi; phải chặn tiến trình xâm phạm vùng của tiến trình khác.</p>
<div class="formula">Nếu <b>địa chỉ logic &lt; Limit</b> → địa chỉ vật lý = <b>Base + địa chỉ logic</b><br>Ngược lại → <b>trap (lỗi bảo vệ)</b></div>
<ul><li><b>Base register</b>: địa chỉ vật lý NHỎ NHẤT của tiến trình.</li>
<li><b>Limit register</b>: PHẠM VI (kích thước) địa chỉ logic.</li>
<li><b>MMU</b> làm việc ánh xạ này <b>động</b> lúc chạy.</li></ul>
<div class="ex"><b>Ví dụ:</b> Base = 30000, Limit = 12000. Logic 5000 → 35000. Logic 13000 → lỗi (≥ Limit).</div>`},
{id:"s4-4",title:"4. Swapping, phân mảnh & thuật toán cấp phát",html:`
<p><b>Swapping</b>: đưa cả tiến trình ra đĩa rồi nạp lại. Phân vùng <b>động</b>: cấp đúng kích thước khi tiến trình đến → sinh ra các <b>hole</b> (vùng trống) rải rác.</p>
<table><tr><th>Phân mảnh</th><th>Bản chất</th><th>Hay gặp ở</th></tr>
<tr><td><b>Ngoài</b> (External)</td><td>Tổng trống đủ nhưng <b>rời rạc, không liên tục</b></td><td>Phân vùng động, phân đoạn, cấp phát file liên tục</td></tr>
<tr><td><b>Nội</b> (Internal)</td><td>Vùng cấp <b>lớn hơn</b> vùng yêu cầu, phần dư bỏ phí</td><td>Phân vùng cố định, phân trang (trang cuối)</td></tr></table>
<p>HĐH theo dõi vùng đã cấp/trống bằng: <b>Bit Map</b> (mỗi allocation unit 1 bit) hoặc <b>Linked List</b>.</p>
<table><tr><th>Thuật toán</th><th>Chọn hole nào?</th><th>Duyệt hết DS?</th></tr>
<tr><td>First-fit</td><td>Hole <b>đầu tiên</b> đủ lớn</td><td>Không</td></tr>
<tr><td>Next-fit</td><td>Như First-fit nhưng bắt đầu từ <b>vị trí con trỏ lần trước</b></td><td>Không</td></tr>
<tr><td>Best-fit</td><td>Hole <b>nhỏ nhất</b> mà đủ lớn</td><td>Có</td></tr>
<tr><td>Worst-fit</td><td>Hole <b>lớn nhất</b></td><td>Có</td></tr></table>
<div class="ex"><b>Ví dụ:</b> Hole: 100K, 500K, 200K, 300K, 600K; yêu cầu 212K → First-fit: 500K · Best-fit: 300K · Worst-fit: 600K.</div>`},
{id:"s4-5",title:"5. Bộ nhớ ảo & phân trang",html:`
<p><b>Bộ nhớ ảo</b>: chỉ nạp <b>một phần</b> chương trình; không gian logic có thể <b>lớn hơn nhiều</b> bộ nhớ vật lý; cho phép chia sẻ RAM và chạy nhiều tiến trình hơn. Thực hiện bằng <b>Paging</b> hoặc <b>Segmentation</b>.</p>
<ul><li>Bộ nhớ <b>logic</b> chia thành <b>trang (pages)</b>; bộ nhớ <b>vật lý</b> chia thành <b>khung trang (page frames)</b>; 1 trang = 1 khung (512 B → 8.192 B).</li>
<li>Chạy chương trình n trang → cần n khung trống <b>bất kỳ</b> (không cần liên tục).</li>
<li><b>Bảng trang</b> ánh xạ trang → khung. Chỉ có <b>phân mảnh nội</b>.</li>
<li><b>MMU</b> nằm trong gói CPU: CPU gửi địa chỉ ảo → MMU → địa chỉ vật lý ra bus tới RAM.</li></ul>
<div class="addr"><div style="flex:2">p – số trang<small>m − n bit</small></div><div style="flex:1.3">d – offset<small>n bit</small></div></div>
<div class="formula">p = địa chỉ ÷ kích thước trang &nbsp;·&nbsp; d = địa chỉ mod kích thước trang<br>Địa chỉ vật lý = <b>f × kích thước trang + d</b> (f = số khung tra trong bảng trang)</div>
<div class="ex"><b>Ví dụ slide:</b> 16 trang × 4 KB. Địa chỉ ảo 8196 = trang 2, offset 4 → khung 6 → 6×4096 + 4 = <b>24580</b>.<br><b>Ví dụ 2:</b> trang 1 KB, địa chỉ 3500 → p = 3, d = 428; nếu trang 3 ở khung 5 → 5×1024+428 = <b>5548</b>.<br><b>Ví dụ 3:</b> địa chỉ 32 bit, trang 4 KB (12 bit) → 20 bit số trang → 2<sup>20</sup> entry.</div>`},
{id:"s4-6",title:"6. Bảng trang, bảng trang 2 mức, TLB",html:`
<p><b>Một entry bảng trang</b> gồm: <span class="chip">Caching disabled</span> <span class="chip">Referenced</span> <span class="chip">Modified (dirty)</span> <span class="chip">Protection</span> <span class="chip">Present/absent</span> <span class="chip">Page frame number</span></p>
<ul><li><b>Present/absent</b> = 0 → trang không có trong RAM → truy cập sẽ gây <b>lỗi trang</b>.</li>
<li><b>Modified</b> = 1 → phải ghi trang ra đĩa trước khi thay thế.</li>
<li><b>Referenced</b> → trang vừa được dùng (giúp thuật toán thay thế).</li></ul>
<p><b>Bảng trang 2 mức</b> (32 bit): <b>PT1 = 10 bit · PT2 = 10 bit · Offset = 12 bit</b>. Mỗi bảng mức 2 quản lý 1024 × 4 KB = 4 MB. Chỉ cần tạo bảng mức 2 cho vùng thật sự dùng → tiết kiệm bộ nhớ.</p>
<div class="ex">0x00403004 → PT1 = 1, PT2 = 3, Offset = 4.</div>
<ul><li>Bảng trang nằm trong RAM; <b>PTBR</b> trỏ tới bảng trang, <b>PRLR</b> cho biết kích thước.</li>
<li>Vấn đề: mỗi truy cập cần <b>2 lần</b> truy cập bộ nhớ (bảng trang + dữ liệu).</li>
<li>Giải pháp: <b>TLB</b> (Translation Look-aside Buffer) = <b>bộ nhớ kết hợp (associative memory)</b> – cache nhanh chứa các ánh xạ gần đây.</li></ul>`},
{id:"s4-7",title:"7. Lỗi trang & thay thế trang",html:`
<p><b>Lỗi trang</b> xảy ra khi tham chiếu trang chưa nạp vào RAM.</p>
<ol class="steps"><li>Tham chiếu trang chưa nạp → lỗi trang</li><li>Bẫy (trap) đến HĐH</li><li>Tạo khung trang trống, sao lưu trang</li><li>Swap trang từ đĩa vào khung vừa tự do</li><li>Sửa bảng trang, đặt bit = v (valid)</li><li>Khởi động lại lệnh gây lỗi</li></ol>
<p><b>Các bước thay thế trang</b> (khi không còn khung trống):</p>
<ol class="steps"><li>Tìm vị trí trang trên đĩa</li><li>Tìm khung free – có thì dùng</li><li>Không có → thuật toán chọn khung <b>nạn nhân (victim)</b></li><li>Mang trang vào khung, cập nhật bảng trang</li><li>Khởi động lại tiến trình</li></ol>
<p>Mục tiêu thuật toán: <b>số lỗi trang càng ít càng tốt</b>.</p>
<table><tr><th>Thuật toán</th><th>Nhận xét (slide)</th></tr>
<tr><td>Optimal</td><td>Không cài đặt được, dùng làm <b>chuẩn so sánh</b></td></tr>
<tr><td>NRU</td><td>Rất thô (very crude)</td></tr>
<tr><td>FIFO</td><td>Có thể loại bỏ trang quan trọng</td></tr>
<tr><td>Second chance</td><td>Cải tiến lớn so với FIFO</td></tr>
<tr><td>Clock</td><td>Thực tế (realistic)</td></tr>
<tr><td>LRU</td><td><b>Rất tốt nhưng khó cài đặt chính xác</b></td></tr>
<tr><td>NFU</td><td>Xấp xỉ LRU khá thô</td></tr>
<tr><td>Aging</td><td><b>Xấp xỉ LRU tốt, hiệu quả</b></td></tr>
<tr><td>Working set</td><td>Hơi tốn kém để cài đặt</td></tr>
<tr><td>WSClock</td><td>Thuật toán hiệu quả tốt</td></tr></table>
<div class="ex"><b>Bài tập kinh điển</b> – chuỗi 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1, 3 khung: <b>FIFO = 15</b>, <b>LRU = 12</b>, <b>Optimal = 9</b> lỗi trang.<br><b>Belady</b>: chuỗi 1 2 3 4 1 2 5 1 2 3 4 5 với FIFO: 3 khung → 9 lỗi, 4 khung → 10 lỗi (thêm khung mà lỗi tăng!).</div>
<div class="tip"><b>Cách làm bài FIFO/LRU/OPT:</b> FIFO bỏ trang <i>vào sớm nhất</i>; LRU bỏ trang <i>lâu nhất chưa dùng</i> (nhìn về quá khứ); OPT bỏ trang <i>lâu nhất mới dùng lại</i> (nhìn về tương lai).</div>`},
{id:"s4-8",title:"8. Cách thực hiện phân trang trong HĐH",html:`
<table><tr><th>4 thời điểm HĐH tham gia</th><th>Việc làm</th></tr>
<tr><td>1. Khởi tạo tiến trình</td><td>Xác định kích thước, khởi tạo bảng trang</td></tr>
<tr><td>2. Tiến trình thực thi</td><td>MMU thiết lập lại cho tiến trình mới, giải phóng (flush) TLB</td></tr>
<tr><td>3. Lỗi trang</td><td>Xác định địa chỉ ảo gây lỗi, thay thế trang</td></tr>
<tr><td>4. Tiến trình kết thúc</td><td>Giải phóng page table, pages</td></tr></table>
<p><b>Điều khiển lỗi trang (10 bước):</b></p>
<ol class="steps"><li>Phần cứng bẫy lỗi đến kernel</li><li>Lưu các thanh ghi</li><li>HĐH xác định trang lỗi</li><li>Kiểm tra khung trang có thể thay thế</li><li>Khung bị sửa (dirty) → ghi ra đĩa</li><li>Nạp trang mới từ đĩa</li><li>Cập nhật bảng trang</li><li>Khởi động lại lệnh gây lỗi</li><li>Tiến trình được lập lịch lại</li><li>Khôi phục thanh ghi, chương trình tiếp tục</li></ol>
<ul><li><b>Khóa trang (pinning)</b>: trang đang làm buffer cho I/O phải được khóa để không bị chọn thay thế.</li>
<li><b>Backing store</b>: (a) phân trang đến vùng swap tĩnh; (b) sao lưu trang động.</li>
<li><b>Tách chính sách – cơ chế</b>: dùng <b>external pager</b> ở user space quyết định chính sách.</li></ul>`},
{id:"s4-9",title:"9. Phân đoạn (Segmentation) & Pentium",html:`
<p>Không gian địa chỉ <b>1 chiều</b> → các bảng tăng trưởng có thể <b>đụng nhau</b>. Phân đoạn cho <b>mỗi bảng một không gian riêng</b>, tự tăng/co <b>độc lập</b>.</p>
<table><tr><th>Tiêu chí</th><th>Phân trang</th><th>Phân đoạn</th></tr>
<tr><td>Lập trình viên phải biết?</td><td>Không</td><td>Có</td></tr>
<tr><td>Số không gian tuyến tính</td><td>1</td><td>Nhiều</td></tr>
<tr><td>Tổng không gian vượt RAM?</td><td>Có</td><td>Có</td></tr>
<tr><td>Tách & bảo vệ riêng code/data?</td><td>Không</td><td>Có</td></tr>
<tr><td>Bảng có kích thước thay đổi?</td><td>Không</td><td>Có</td></tr>
<tr><td>Chia sẻ thủ tục giữa user?</td><td>Không</td><td>Có</td></tr>
<tr><td>Mục đích ra đời</td><td>Không gian tuyến tính lớn mà không cần mua thêm RAM</td><td>Chia chương trình/dữ liệu thành không gian logic độc lập, hỗ trợ chia sẻ & bảo vệ</td></tr></table>
<p><b>Checkerboarding</b>: phân đoạn thuần túy để lại lỗ trống xen kẽ (phân mảnh ngoài) → khắc phục bằng <b>nén (compaction)</b>.</p>
<p><b>Pentium</b> (phân đoạn + phân trang):</p>
<div class="flow"><span>(selector, offset)</span><i>→</i><span>Descriptor<small>GDT / LDT</small></span><i>→</i><span>Địa chỉ tuyến tính</span><i>→</i><span>Phân trang<small>Dir·Page·Offset</small></span><i>→</i><span>Địa chỉ vật lý</span></div>
<ul><li><b>GDT</b> = Global Descriptor Table (chung), <b>LDT</b> = Local Descriptor Table (riêng từng chương trình).</li>
<li><b>Selector 16 bit</b> = Index 13 bit (tối đa 8192 descriptor) + 1 bit (0 = GDT, 1 = LDT) + 2 bit mức đặc quyền.</li>
<li><b>Descriptor</b>: Base 32 bit, Limit 20 bit; G = 0 limit tính theo byte / 1 theo trang; D = 16/32-bit; P = có trong bộ nhớ; DPL = mức đặc quyền.</li>
<li>Địa chỉ tuyến tính 32 bit (không gian 4 GB) = <b>Dir 10 · Page 10 · Offset 12</b>.</li>
<li><b>4 mức bảo vệ 0–3</b>: 0 = kernel, 1 = system call, 2 = thư viện chia sẻ, 3 = chương trình user.</li></ul>`}
]},
{
ch:5, title:"Vào/Ra", en:"Input/Output",
intro:"Chương này nói về <b>cách CPU nói chuyện với thiết bị</b> (phần cứng I/O) và <b>cách tổ chức phần mềm I/O thành các lớp</b> để chương trình dùng thiết bị dễ dàng, độc lập phần cứng.",
sections:[
{id:"s5-1",title:"1. Phân loại thiết bị",html:`
<table><tr><th></th><th>Block device</th><th>Character device</th></tr>
<tr><td>Ví dụ</td><td>Đĩa</td><td>Bàn phím, chuột, cổng serial</td></tr>
<tr><td>Lệnh</td><td><b>read, write, seek</b></td><td><b>get, put</b></td></tr>
<tr><td>Đặc điểm</td><td>Raw I/O hoặc qua hệ thống file; có thể memory-mapped file</td><td>Thư viện lớp trên cho phép soạn sửa dòng (line editing)</td></tr></table>
<p><b>Tốc độ</b> (nhớ 2 đầu mút): chậm nhất <b>Keyboard 10 B/s</b>, Mouse 100 B/s … PCI bus 528 MB/s, nhanh nhất <b>Sun Gigaplane XB 20 GB/s</b>. Một số mốc: Laser printer 100 KB/s, USB 1,5 MB/s, Gigabit Ethernet 125 MB/s.</p>`},
{id:"s5-2",title:"2. Controller, I/O Port, I/O Bus",html:`
<ul><li>Thiết bị = phần <b>cơ điện tử</b> + phần <b>điện tử</b>. Phần điện tử = <b>Device Controller</b> (có thể điều khiển <b>nhiều</b> thiết bị).</li>
<li>Tác vụ controller (vd đĩa): <b>chuyển luồng bit → khối bytes</b>, <b>sửa lỗi</b> khi cần, <b>chuyển dữ liệu vào RAM</b>.</li>
<li><b>I/O Port</b> = một <b>thanh ghi</b> để giao tiếp với thiết bị.</li>
<li>Địa chỉ thiết bị được dùng qua: <b>lệnh I/O trực tiếp</b> hoặc <b>ánh xạ bộ nhớ</b>.</li></ul>
<table><tr><th>Mô hình</th><th>Ý nghĩa</th></tr>
<tr><td>(a) Separate I/O & memory space</td><td>Cổng I/O ở không gian riêng, dùng lệnh IN/OUT</td></tr>
<tr><td>(b) Memory-mapped I/O</td><td>Thanh ghi thiết bị nằm trong không gian địa chỉ bộ nhớ</td></tr>
<tr><td>(c) Hybrid</td><td>Kết hợp cả hai</td></tr></table>
<p>Kiến trúc bus: (a) <b>single-bus</b> – mọi địa chỉ đi chung 1 bus; (b) <b>dual-bus memory</b> – CPU đọc/ghi RAM qua bus băng thông cao riêng.</p>
<p><b>Bus trên PC:</b> <b>PCI bus</b> là bus chính (graphics controller, bridge/memory controller, SCSI controller, IDE controller); <b>expansion bus</b> nối keyboard, parallel port, serial port; <b>SCSI bus</b> nối các đĩa SCSI.</p>
<table><tr><th>Cổng I/O (hex)</th><th>Thiết bị</th><th>Cổng I/O (hex)</th><th>Thiết bị</th></tr>
<tr><td>000–00F</td><td>DMA controller</td><td>320–32F</td><td>Hard-disk controller</td></tr>
<tr><td>020–021</td><td>Interrupt controller</td><td>378–37F</td><td>Parallel port</td></tr>
<tr><td>040–043</td><td>Timer</td><td>3D0–3DF</td><td>Graphics controller</td></tr>
<tr><td>200–20F</td><td>Game controller</td><td>3F0–3F7</td><td>Diskette-drive controller</td></tr>
<tr><td>2F8–2FF</td><td>Serial port (secondary)</td><td>3F8–3FF</td><td>Serial port (primary)</td></tr></table>`},
{id:"s5-3",title:"3. Ba phương pháp truyền dữ liệu",html:`
<table><tr><th>Phương pháp</th><th>Cách làm</th><th>Ưu / nhược</th></tr>
<tr><td><b>Programmed I/O</b> (Polling)</td><td>CPU <b>lặp chờ bận (busy-wait)</b> kiểm tra trạng thái <i>ready / busy / error</i></td><td>Đơn giản; <b>lãng phí CPU</b></td></tr>
<tr><td><b>Interrupt-driven</b></td><td>Thiết bị báo <b>ngắt</b> khi xong (qua interrupt lines trên bus tới interrupt controller); CPU làm việc khác trong lúc chờ</td><td>Không busy-wait; nhưng <b>mỗi ký tự 1 ngắt</b></td></tr>
<tr><td><b>DMA</b></td><td>Bộ điều khiển DMA tự chuyển dữ liệu giữa thiết bị và RAM</td><td><b>Mỗi buffer 1 ngắt</b> – tốt nhất cho khối lớn</td></tr></table>
<p><b>Quá trình ngắt:</b> 1. thiết bị xong việc → 2. interrupt controller phát ngắt tới CPU → 3. CPU báo nhận (ack).</p>
<table><tr><th>IRQ</th><th>Nguồn ngắt (PC)</th><th>IRQ</th><th>Nguồn ngắt (PC)</th></tr>
<tr><td>NMI</td><td>Parity error</td><td>IRQ6</td><td>Floppy disk controller</td></tr>
<tr><td>IRQ0</td><td>Interval Timer (PIT)</td><td>IRQ7</td><td>LPT1</td></tr>
<tr><td>IRQ1</td><td>Keyboard</td><td>IRQ8</td><td>Real-time clock</td></tr>
<tr><td>IRQ2</td><td>Nối tầng PIC #2 (cascade)</td><td>IRQ12</td><td>Chuột PS/2</td></tr>
<tr><td>IRQ3 / IRQ4</td><td>COM2 / COM1</td><td>IRQ14 / IRQ15</td><td>EIDE chính / phụ</td></tr></table>
<p>PIC #1 = kiểu ngắt 8–F (IRQ0–7), PIC #2 = 70–77 (IRQ8–15). DMA controller có 3 thanh ghi: <b>Address, Count, Control</b>.</p>
<p><b>Quá trình DMA:</b></p>
<ol class="steps"><li>CPU lập trình DMA controller</li><li>DMA yêu cầu đĩa truyền dữ liệu vào RAM</li><li>Dữ liệu được truyền vào RAM</li><li>Đĩa gửi ACK cho DMA</li><li>DMA ngắt CPU khi xong</li></ol>
<div class="tip"><b>Mẹo nhớ “in một chuỗi”:</b> Programmed = CPU tự <i>đứng chờ</i> từng ký tự · Interrupt = CPU <i>ngủ</i>, mỗi ký tự đánh thức 1 lần · DMA = <i>thuê người</i> in hộ, xong cả chuỗi mới báo.</div>`},
{id:"s5-4",title:"4. Mục đích của phần mềm I/O",html:`
<table><tr><th>Mục đích</th><th>Hiểu nhanh</th></tr>
<tr><td>Độc lập thiết bị</td><td>Chương trình truy cập mọi thiết bị như nhau (floppy, HDD, CD-ROM)</td></tr>
<tr><td>Đặt tên chung</td><td>Tên file/thiết bị là string hoặc integer, không phụ thuộc phần cứng</td></tr>
<tr><td>Xử lý lỗi</td><td>Xử lý <b>càng gần phần cứng càng tốt</b></td></tr>
<tr><td>Đồng bộ / không đồng bộ</td><td>Blocked transfers vs. interrupt-driven</td></tr>
<tr><td>Định bộ đệm</td><td>Dữ liệu tới thiết bị không thể lưu thẳng ngay lên thiết bị</td></tr>
<tr><td>Chia sẻ / dùng riêng</td><td>Disk chia sẻ được; tape drive thì không</td></tr></table>`},
{id:"s5-5",title:"5. Các lớp phần mềm I/O",html:`
<div class="stack"><div>Phần mềm I/O mức người dùng<small>tạo lời gọi I/O, định dạng, spooling</small></div><div>Phần mềm I/O độc lập thiết bị<small>đặt tên, bảo vệ, chia khối, buffering, cấp phát</small></div><div>Device drivers<small>thiết lập thanh ghi thiết bị, kiểm tra trạng thái</small></div><div>Interrupt handlers<small>đánh thức driver khi I/O xong</small></div><div>Hardware<small>thực hiện thao tác I/O</small></div></div>
<div class="tip"><b>Mẹo nhớ thứ tự (trên → dưới):</b> “<b>U</b>ống <b>Đ</b>ộc <b>D</b>ược <b>I</b>t <b>H</b>ơn” = User · Độc lập · Driver · Interrupt · Hardware.</div>
<p><b>9 bước sau khi ngắt hoàn tất:</b></p>
<ol class="steps"><li>Lưu thanh ghi chưa được phần cứng lưu</li><li>Thiết lập ngữ cảnh cho thủ tục phục vụ ngắt</li><li>Thiết lập ngăn xếp cho thủ tục phục vụ ngắt</li><li>ACK bộ điều khiển ngắt, kết nối lại ngắt</li><li>Copy thanh ghi vào bảng tiến trình</li><li>Chạy thủ tục phục vụ ngắt</li><li>Thiết lập ngữ cảnh MMU cho tiến trình tiếp theo</li><li>Tải thanh ghi của tiến trình mới</li><li>Bắt đầu chạy tiến trình mới</li></ol>
<p><b>Device driver</b>: nằm trong kernel, giao tiếp với controller <b>qua bus</b>. Giao diện <b>chuẩn</b> giữa HĐH và driver giúp dễ thêm driver mới.</p>
<p><b>Phần mềm độc lập thiết bị</b>: giao diện chung với driver · buffering · thông báo lỗi · cấp phát & giải phóng thiết bị dùng riêng · kích thước khối độc lập thiết bị.</p>
<p><b>Buffering</b>: (a) không đệm → (b) đệm ở user space → (c) đệm ở kernel rồi copy sang user → (d) <b>double buffering</b> trong kernel (1 buffer nhận, 1 buffer đang chép). Mạng có thể gây <b>nhiều bản copy</b> của gói tin.</p>`},
{id:"s5-6",title:"6. Thiết bị: Đĩa (RAID), màn hình, terminal, đồng hồ",html:`
<table><tr><th>RAID</th><th>Đơn vị</th><th>Dư thừa</th></tr>
<tr><td>0</td><td>Strip</td><td>Không có (chỉ striping)</td></tr>
<tr><td>1</td><td>Strip</td><td>Nhân bản toàn bộ (mirroring)</td></tr>
<tr><td>2</td><td>Bit</td><td>Mã Hamming (nhiều đĩa ECC)</td></tr>
<tr><td>3</td><td>Bit</td><td>1 đĩa parity</td></tr>
<tr><td>4</td><td>Strip</td><td>1 đĩa parity riêng (dễ nghẽn)</td></tr>
<tr><td>5</td><td>Strip</td><td>Parity <b>phân tán</b> trên mọi đĩa</td></tr></table>
<ul><li><b>Memory-mapped display</b>: driver ghi <b>trực tiếp vào video RAM</b>.</li>
<li><b>RS-232 terminal</b>: truyền <b>1 bit mỗi lần</b> (serial line); Windows dùng <b>COM1, COM2</b>; máy tính và terminal <b>hoàn toàn độc lập</b>.</li>
<li><b>Programmable clock</b>: thạch anh tạo xung → giảm counter → về 0 sinh ngắt; holding register nạp lại counter.</li></ul>`}
]},
{
ch:6, title:"Hệ thống File", en:"File Systems",
intro:"Chương này nói về <b>file</b> (cái người dùng thấy), <b>thư mục</b> (cách tổ chức) và <b>cài đặt</b> (HĐH lưu file lên các block đĩa thế nào), kèm ví dụ CD-ROM, MS-DOS, Windows 98, UNIX V7.",
sections:[
{id:"s6-1",title:"1. File là gì?",html:`
<p>Cần lưu trữ lâu dài vì: dữ liệu <b>lớn</b>; phải <b>tồn tại sau khi tiến trình kết thúc</b>; <b>nhiều tiến trình</b> cùng truy cập.</p>
<p><b>Hệ thống file</b> = phần HĐH liên quan đến files, gồm 2 phần: <b>tập các file</b> và <b>cấu trúc thư mục</b>.</p>
<table><tr><th>User thấy</th><th>Tài nguyên phần cứng</th></tr><tr><td>Process/Thread</td><td>CPU</td></tr><tr><td>Address Space</td><td>Memory</td></tr><tr><td>Files</td><td>Disk</td></tr></table>
<ul><li><b>Cấu trúc file</b>: (a) chuỗi byte (UNIX/Windows) · (b) chuỗi bản ghi · (c) cây.</li>
<li><b>Kiểu</b>: Data (numeric, character, binary) · Program (source, object, executable) · Regular / Special (character, block).</li>
<li>Ví dụ: (a) file thực thi (executable) · (b) file lưu trữ (archive).</li>
<li>Phần mở rộng: .bak (backup), .c (C), .o (object), .zip (nén), .gif/.jpg (ảnh), .txt (văn bản)…</li></ul>`},
{id:"s6-2",title:"2. Truy cập, thuộc tính, thao tác",html:`
<table><tr><th>Truy cập tuần tự</th><th>Truy cập ngẫu nhiên</th></tr>
<tr><td>Đọc lần lượt từ đầu, không nhảy cóc, có thể quay về đầu. <b>Phù hợp băng từ.</b></td><td>Đọc bất kỳ byte/record; <b>seek</b> rồi read. <b>Phù hợp CSDL.</b></td></tr></table>
<p><b>Thuộc tính hay hỏi:</b></p>
<table><tr><th>Thuộc tính</th><th>Ý nghĩa</th></tr>
<tr><td>Protection</td><td>Ai truy cập được, theo cách nào</td></tr>
<tr><td>Creator / Owner</td><td>Người tạo / chủ hiện tại</td></tr>
<tr><td>Read-only flag</td><td>0 đọc/ghi · 1 chỉ đọc</td></tr>
<tr><td>Hidden flag</td><td>1 = không hiển thị trong danh sách</td></tr>
<tr><td>System flag</td><td>1 = file hệ thống</td></tr>
<tr><td>Archive flag</td><td>0 đã sao lưu · <b>1 cần sao lưu</b></td></tr>
<tr><td>ASCII/binary</td><td>0 ASCII · 1 binary</td></tr>
<tr><td>Random access flag</td><td>0 chỉ tuần tự · 1 ngẫu nhiên</td></tr>
<tr><td>Temporary flag</td><td>1 = <b>xóa khi tiến trình kết thúc</b></td></tr>
<tr><td>Lock flags</td><td>0 không khóa · khác 0 bị khóa</td></tr>
<tr><td>Current / Maximum size</td><td>Số byte hiện tại / tối đa có thể tăng tới</td></tr></table>
<p><b>11 thao tác file:</b> Create · Delete · Open · Close · Read · Write · Append · Seek · Get attributes · Set attributes · Rename.</p>
<p><b>Memory-mapped file</b>: ánh xạ file vào không gian địa chỉ tiến trình, đọc/ghi như truy cập bộ nhớ.</p>`},
{id:"s6-3",title:"3. Thư mục",html:`
<div class="flow"><span>Một mức<small>4 file · 3 user A,B,C → trùng tên</small></span><i>→</i><span>Hai mức<small>mỗi user 1 thư mục</small></span><i>→</i><span>Phân cấp<small>cây thư mục</small></span></div>
<ul><li><b>Đường dẫn tuyệt đối</b>: bắt đầu từ gốc “/” (vd /usr/ast/mbox). <b>Tương đối</b>: tính từ thư mục hiện hành.</li>
<li><b>8 thao tác thư mục:</b> Create · Delete · Opendir · Closedir · Readdir · Rename · Link · Unlink.</li></ul>
<div class="tip"><b>Đừng nhầm:</b> Seek/Append/Get attributes là thao tác <b>file</b>; Opendir/Readdir/Link/Unlink là thao tác <b>thư mục</b>.</div>`},
{id:"s6-4",title:"4. Cài đặt: 3 phương pháp cấp phát",html:`
<p>Bố cục đĩa: <b>MBR + bảng phân vùng</b>; mỗi phân vùng: boot block · superblock · quản lý vùng trống · i-nodes · thư mục gốc · files & thư mục.</p>
<table><tr><th></th><th>Liên tục</th><th>Liên kết</th><th>Chỉ mục</th></tr>
<tr><td>Ý tưởng</td><td>Các block liên tiếp</td><td>Danh sách liên kết block rải rác</td><td>Mọi con trỏ gom vào <b>index block</b></td></tr>
<tr><td>Cần lưu</td><td>Block đầu + số block</td><td>Địa chỉ bắt đầu</td><td>Bảng chỉ mục</td></tr>
<tr><td>Truy cập ngẫu nhiên</td><td>✔</td><td>✘</td><td>✔</td></tr>
<tr><td>Phân mảnh ngoài</td><td>Có (lãng phí)</td><td>Không</td><td>Không</td></tr>
<tr><td>File tăng kích thước</td><td>✘ Không được</td><td>✔</td><td>✔</td></tr>
<tr><td>Nhược điểm khác</td><td>—</td><td>Tốn chỗ con trỏ</td><td>Overhead index block</td></tr>
<tr><td>Ví dụ</td><td><b>CD-ROM</b></td><td><b>FAT</b> (bảng trong RAM)</td><td><b>i-node</b> (UNIX)</td></tr></table>
<div class="ex"><b>Ví dụ slide:</b> Liên tục – mail: start 19, length 6 → block 19–24. Liên kết – jeep: 9 → 16 → 1 → 10 → 25 (−1 = hết). FAT – File A: 4 → 7 → 2 → 10 → 12; File B: 6 → 3 → 11 → 14. Chỉ mục – jeep: index block 19 chứa 9, 16, 1, 10, 25.</div>
<ul><li><b>FAT</b> = cấp phát liên kết nhưng đưa con trỏ ra một bảng <b>trong RAM</b> → truy cập ngẫu nhiên nhanh hơn; nhược điểm: bảng lớn khi đĩa lớn.</li>
<li><b>i-node</b>: Attributes + các địa chỉ đĩa trực tiếp + <b>single / double / triple indirect block</b> → hỗ trợ file rất lớn.</li></ul>`},
{id:"s6-5",title:"5. Thư mục, file chia sẻ, quản lý không gian",html:`
<ul><li>Thực hiện thư mục: (a) entry cố định chứa <b>địa chỉ đĩa + thuộc tính</b> (MS-DOS); (b) entry chỉ trỏ tới <b>i-node</b> (UNIX).</li>
<li>Tên file dài: (a) <b>in-line</b>; (b) <b>in a heap</b>.</li>
<li><b>File chia sẻ</b> → cấu trúc thành DAG. Với hard link qua i-node: (a) trước liên kết count = 1 → (b) sau liên kết count = 2 → (c) chủ xóa → count = 1, i-node <b>vẫn tồn tại</b>.</li>
<li><b>Kích thước block</b>: nét liền = <b>tốc độ dữ liệu</b>, nét đứt = <b>hiệu quả không gian</b>. Block lớn → nhanh nhưng phí chỗ; block nhỏ → tiết kiệm nhưng chậm.</li>
<li>Quản lý block trống: <b>danh sách liên kết</b> hoặc <b>bitmap</b>.</li></ul>`},
{id:"s6-6",title:"6. Ví dụ: CD-ROM, MS-DOS, Windows 98, UNIX V7",html:`
<p><b>CD-ROM</b>: entry thư mục theo chuẩn <b>ISO 9660</b>.</p>
<p><b>Entry MS-DOS = 32 byte:</b></p>
<div class="addr small"><div style="flex:8">Tên<small>8</small></div><div style="flex:3">Ext<small>3</small></div><div style="flex:1.4">A<small>1</small></div><div style="flex:10">Reserved<small>10</small></div><div style="flex:2">Time<small>2</small></div><div style="flex:2">Date<small>2</small></div><div style="flex:2.4">Block đầu<small>2</small></div><div style="flex:4">Size<small>4</small></div></div>
<table><tr><th>Block</th><th>FAT-12</th><th>FAT-16</th><th>FAT-32</th></tr>
<tr><td>0,5 KB</td><td>2 MB</td><td>—</td><td>—</td></tr><tr><td>1 KB</td><td>4 MB</td><td>—</td><td>—</td></tr>
<tr><td>2 KB</td><td>8 MB</td><td>128 MB</td><td>—</td></tr><tr><td>4 KB</td><td>16 MB</td><td>256 MB</td><td>1 TB</td></tr>
<tr><td>8 KB</td><td>—</td><td>512 MB</td><td>2 TB</td></tr><tr><td>16 KB</td><td>—</td><td>1024 MB</td><td>2 TB</td></tr>
<tr><td>32 KB</td><td>—</td><td>2048 MB</td><td>2 TB</td></tr></table>
<div class="tip"><b>Mẹo:</b> FAT-12 = 2<sup>12</sup> block × kích thước block (4 KB → 4096 × 4 KB = 16 MB). Ô “—” = tổ hợp không được phép.</div>
<p><b>Windows 98</b>: mở rộng entry MS-DOS (thêm NT, Sec, Creation date/time, Last access, <b>16 bit cao của block bắt đầu</b> → đủ 32 bit cho FAT-32). Tên dài lưu trong nhiều entry phụ, mỗi entry chứa <b>13 ký tự</b> (5 + 6 + 2) cùng Sequence và <b>checksum</b> liên kết với tên ngắn (vd THEQUI~1).</p>
<p><b>CD-ROM</b>: dữ liệu trên một <b>rãnh xoắn ốc</b> (pit/land), chia block 2K. Entry ISO 9660 có Location of file (8 byte), File size (8 byte), Date and time (7 byte), tên dạng Base.Ext;Ver.</p>
<p><b>UNIX V7</b>: entry = <b>2 byte số i-node + 14 byte tên</b> (16 byte); mọi thuộc tính nằm trong i-node.</p>
<p><b>Tìm /usr/ast/mbox:</b></p>
<div class="flow"><span>Root: usr<small>→ i-node 6</small></span><i>→</i><span>i-node 6<small>→ block 132</small></span><i>→</i><span>Block 132: ast<small>→ i-node 26</small></span><i>→</i><span>i-node 26<small>→ block 406</small></span><i>→</i><span>Block 406: mbox<small>→ i-node 60</small></span></div>`}
]}
];
