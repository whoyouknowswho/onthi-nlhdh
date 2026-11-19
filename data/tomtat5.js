/* Tổng hợp kiến thức – Chương 5: Vào/Ra (đầy đủ theo slide 1 → 46) */
window.SUMMARY = window.SUMMARY || [];
window.STEPS = window.STEPS || {};

window.STEPS.interrupt = {title:"Ngắt xảy ra như thế nào (slide 15)", fig:"c5-15", steps:[
 {t:"1. Device is finished", d:"Thiết bị (đĩa, bàn phím, đồng hồ, máy in…) làm xong việc, gửi tín hiệu tới <b>interrupt controller</b> qua <b>đường ngắt trên bus</b>."},
 {t:"2. Controller issues interrupt", d:"Interrupt controller phát tín hiệu ngắt tới CPU (kèm số hiệu thiết bị để CPU biết cần chạy thủ tục nào)."},
 {t:"3. CPU acks interrupt", d:"CPU báo nhận ngắt, dừng công việc hiện tại, lưu trạng thái và chạy <b>thủ tục phục vụ ngắt</b>."}
]};
window.STEPS.dma = {title:"Quá trình vận hành của DMA (slide 17)", fig:"c5-17", steps:[
 {t:"1. CPU lập trình DMA controller", d:"CPU nạp các thanh ghi <b>Address</b> (địa chỉ bộ nhớ), <b>Count</b> (số byte), <b>Control</b> (hướng, thiết bị) rồi đi làm việc khác."},
 {t:"2. DMA requests transfer to memory", d:"DMA controller yêu cầu disk controller chuyển dữ liệu (từ buffer của nó) vào bộ nhớ chính."},
 {t:"3. Data transferred", d:"Disk controller ghi dữ liệu thẳng vào <b>main memory</b> qua bus – CPU không phải chép từng byte."},
 {t:"4. Ack", d:"Disk controller gửi tín hiệu báo nhận cho DMA controller. DMA tăng Address, giảm Count, lặp lại bước 2–4 cho tới khi Count = 0."},
 {t:"5. Interrupt when done", d:"Xong toàn bộ, DMA controller <b>ngắt CPU</b> một lần duy nhất để báo hoàn tất."}
]};
window.STEPS.dmapc = {title:"Ví dụ DMA truyền trên PC (slide 18)", fig:"c5-18", steps:[
 {t:"1. Driver được yêu cầu", d:"Device driver được yêu cầu chuyển dữ liệu đĩa vào <b>buffer tại địa chỉ X</b>."},
 {t:"2. Driver ra lệnh cho disk controller", d:"Driver bảo disk controller chuyển <b>C byte</b> từ đĩa vào buffer tại X."},
 {t:"3. Disk controller khởi động DMA", d:"IDE disk controller bắt đầu truyền DMA."},
 {t:"4. Gửi từng byte", d:"Disk controller gửi từng byte tới DMA controller (qua PCI bus)."},
 {t:"5. DMA chép vào buffer X", d:"DMA controller chuyển byte vào buffer X, <b>tăng địa chỉ bộ nhớ và giảm C</b> cho tới khi C = 0."},
 {t:"6. Ngắt CPU", d:"Khi C = 0, DMA ngắt CPU để báo truyền xong."}
]};
window.STEPS.isr = {title:"Phần mềm xử lý sau khi ngắt (9 bước – slide 29, 30)", steps:[
 {t:"1. Lưu thanh ghi", d:"Lưu các thanh ghi (kể cả PSW) chưa được phần cứng ngắt lưu."},
 {t:"2. Ngữ cảnh cho thủ tục phục vụ ngắt", d:"Thiết lập ngữ cảnh (có thể gồm TLB, MMU, bảng trang)."},
 {t:"3. Ngăn xếp cho thủ tục phục vụ ngắt", d:"Thiết lập stack riêng để thủ tục phục vụ ngắt chạy."},
 {t:"4. Ack ngắt", d:"Báo nhận cho bộ điều khiển ngắt; cho phép (kết nối lại) các ngắt."},
 {t:"5. Copy thanh ghi vào bảng tiến trình", d:"Chép các thanh ghi đã lưu vào bảng tiến trình (process table)."},
 {t:"6. Chạy thủ tục phục vụ ngắt", d:"Lấy thông tin từ thanh ghi của controller thiết bị đã ngắt."},
 {t:"7. Ngữ cảnh MMU cho tiến trình tiếp theo", d:"Chọn tiến trình chạy tiếp và thiết lập MMU cho nó."},
 {t:"8. Tải thanh ghi tiến trình mới", d:"Nạp thanh ghi (và PSW) của tiến trình mới."},
 {t:"9. Chạy tiến trình mới", d:"Bắt đầu chạy tiến trình được chọn."}
]};
window.STEPS.print = {title:"In chuỗi “ABCDEFGH” bằng Programmed I/O (slide 22, 23)", fig:"c5-22", steps:[
 {t:"(a) Chuỗi ở user space", d:"Tiến trình người dùng có chuỗi cần in trong buffer và gọi system call print."},
 {t:"copy_from_user(buffer, p, count)", d:"HĐH chép chuỗi vào buffer <b>p trong kernel</b>."},
 {t:"while (*printer_status_reg != READY) ;", d:"CPU <b>lặp chờ bận</b> cho tới khi máy in sẵn sàng."},
 {t:"(b) *printer_data_register = p[0]", d:"Ghi ký tự ‘A’ ra máy in, con trỏ Next chuyển sang ‘B’."},
 {t:"(c) Lặp lại cho từng ký tự", d:"Chờ READY → ghi ‘B’ → … cho đến hết count ký tự. CPU bị chiếm suốt thời gian in."},
 {t:"return_to_user()", d:"In xong mới trả quyền về cho tiến trình."}
]};

window.SUMMARY.push({
ch:5, title:"Vào/Ra", en:"Input/Output",
intro:"Nội dung: <b>5.1 Nguyên lý phần cứng Vào/Ra · 5.2 Nguyên lý phần mềm Vào/Ra · 5.3 Các lớp phần mềm Vào/Ra · 5.4 Các thiết bị Vào/Ra</b> (đĩa, terminal hướng ký tự, đồng hồ). Câu hỏi xuyên suốt: CPU <b>nói chuyện với thiết bị</b> thế nào và phần mềm I/O được <b>tổ chức thành các lớp</b> ra sao.",
sections:[
{id:"s5-1",title:"1. Phân loại thiết bị Vào/Ra",
 figs:[["c5-04","Slide 4 – Tốc độ truyền dữ liệu của một số thiết bị"]],
 yt:"block device vs character device operating system",
 html:`
<p>Có <b>hai nhóm chính</b>: thiết bị <b>Block</b> và thiết bị <b>Character</b>.</p>
<table><tr><th></th><th>Thiết bị Block</th><th>Thiết bị Character</th></tr>
<tr><td>Gồm</td><td>Các <b>đĩa</b></td><td><b>Bàn phím, chuột, cổng nối tiếp</b> (serial ports)</td></tr>
<tr><td>Lệnh</td><td><b>read, write, seek</b></td><td><b>get, put</b></td></tr>
<tr><td>Đặc điểm</td><td>Vào/Ra thô (raw I/O) hoặc truy cập qua hệ thống file; có thể truy cập file <b>memory-mapped</b></td><td>Các thư viện lớp trên cho phép soạn sửa dòng (line editing)</td></tr></table>
<p><b>Tốc độ truyền</b> (nhớ các mốc):</p>
<table><tr><th>Thiết bị</th><th>Tốc độ</th><th>Thiết bị</th><th>Tốc độ</th></tr>
<tr><td>Keyboard</td><td>10 bytes/sec</td><td>IDE disk</td><td>5 MB/sec</td></tr>
<tr><td>Mouse</td><td>100 bytes/sec</td><td>40x CD-ROM</td><td>6 MB/sec</td></tr>
<tr><td>56K modem</td><td>7 KB/sec</td><td>Fast Ethernet</td><td>12,5 MB/sec</td></tr>
<tr><td>Telephone channel</td><td>8 KB/sec</td><td>ISA bus · EIDE (ATA-2) disk</td><td>16,7 MB/sec</td></tr>
<tr><td>Dual ISDN lines</td><td>16 KB/sec</td><td>FireWire (IEEE 1394)</td><td>50 MB/sec</td></tr>
<tr><td>Laser printer</td><td>100 KB/sec</td><td>XGA Monitor</td><td>60 MB/sec</td></tr>
<tr><td>Scanner</td><td>400 KB/sec</td><td>SONET OC-12 · SCSI Ultra 2</td><td>78 · 80 MB/sec</td></tr>
<tr><td>Classic Ethernet</td><td>1,25 MB/sec</td><td>Gigabit Ethernet</td><td>125 MB/sec</td></tr>
<tr><td>USB</td><td>1,5 MB/sec</td><td>Ultrium tape · PCI bus</td><td>320 · 528 MB/sec</td></tr>
<tr><td>Digital camcorder</td><td>4 MB/sec</td><td>Sun Gigaplane XB backplane</td><td><b>20 GB/sec</b></td></tr></table>
<div class="tip">Chậm nhất: <b>bàn phím 10 B/s</b>; nhanh nhất: <b>Sun Gigaplane XB 20 GB/s</b> – chênh nhau hàng tỉ lần → phần mềm I/O phải xử lý được mọi tốc độ.</div>`},
{id:"s5-2",title:"2. Bộ điều khiển thiết bị, cổng & bus",
 figs:[["c5-06","Slide 6 – Các thành phần của một PC đơn giản"],["c5-08","Slide 8 – Bảng cổng Vào/Ra trên PC"],["c5-09","Slide 9 – Cấu trúc Bus trên PC"]],
 yt:"device controller I/O port PCI bus computer architecture",
 html:`
<p><b>Khái niệm chung:</b> Bộ điều khiển thiết bị (I/O Device Controller) · Cổng Vào/Ra (I/O Port) · Bus Vào/Ra (I/O Bus).</p>
<p>PC đơn giản: CPU, Memory, Video controller (→ Monitor), Keyboard controller (→ Keyboard), Floppy disk controller, Hard disk controller – tất cả nối vào <b>một Bus</b>.</p>
<ul><li>Thiết bị Vào/Ra gồm: phần <b>cơ điện tử</b> (electromechanical) và phần <b>điện tử</b> (electronic).</li>
<li>Phần điện tử là <b>bộ điều khiển thiết bị (device controller)</b> – có thể điều khiển <b>nhiều</b> thiết bị.</li>
<li>Tác vụ của controller (vd đĩa): <b>chuyển luồng bit thành khối bytes</b> · <b>điều khiển (sửa) lỗi</b> khi cần · <b>chuyển dữ liệu vào bộ nhớ chính</b>.</li></ul>
<p><b>Cổng Vào/Ra là một thanh ghi</b> giao tiếp với thiết bị. Ví dụ trên PC:</p>
<table><tr><th>Dải địa chỉ (hex)</th><th>Thiết bị</th><th>Dải địa chỉ (hex)</th><th>Thiết bị</th></tr>
<tr><td>000–00F</td><td>DMA controller</td><td>320–32F</td><td>Hard-disk controller</td></tr>
<tr><td>020–021</td><td>Interrupt controller</td><td>378–37F</td><td>Parallel port</td></tr>
<tr><td>040–043</td><td>Timer</td><td>3D0–3DF</td><td>Graphics controller</td></tr>
<tr><td>200–20F</td><td>Game controller</td><td>3F0–3F7</td><td>Diskette-drive controller</td></tr>
<tr><td>2F8–2FF</td><td>Serial port (secondary)</td><td>3F8–3FF</td><td>Serial port (primary)</td></tr></table>
<p><b>Cấu trúc Bus trên PC:</b> processor – cache – <b>bridge/memory controller</b> – memory; <b>PCI bus</b> là bus chính nối graphics controller (→ monitor), SCSI controller (→ <b>SCSI bus</b> với các đĩa), IDE disk controller (→ đĩa), expansion bus interface (→ <b>expansion bus</b> với keyboard, parallel port, serial port).</p>`},
{id:"s5-3",title:"3. Địa chỉ Vào/Ra & ánh xạ bộ nhớ",
 figs:[["c5-11","Slide 11 – (a) tách riêng, (b) memory-mapped, (c) hybrid"],["c5-12","Slide 12 – (a) single-bus, (b) dual-bus memory"]],
 yt:"memory mapped I/O vs port mapped I/O",
 html:`
<p>Lệnh Vào/Ra thực hiện trên bộ điều khiển thiết bị. Các thiết bị có địa chỉ, được dùng bởi: <b>các lệnh Vào/Ra trực tiếp</b> hoặc <b>ánh xạ bộ nhớ</b>.</p>
<table><tr><th>Mô hình</th><th>Mô tả</th></tr>
<tr><td>(a) <b>Separate I/O and memory space</b></td><td>Hai không gian: bộ nhớ (0 → 0xFFFF…) và các I/O port riêng; truy cập port bằng lệnh I/O đặc biệt (IN/OUT)</td></tr>
<tr><td>(b) <b>Memory-mapped I/O</b></td><td>Một không gian duy nhất: thanh ghi thiết bị chiếm một vùng địa chỉ bộ nhớ → dùng lệnh truy cập bộ nhớ thông thường</td></tr>
<tr><td>(c) <b>Hybrid</b></td><td>Hai không gian: có vùng ánh xạ bộ nhớ (vd buffer dữ liệu/video RAM) <b>và</b> các I/O port riêng</td></tr></table>
<table><tr><th>Kiến trúc bus</th><th>Đặc điểm</th></tr>
<tr><td>(a) <b>Single-bus</b></td><td>Mọi địa chỉ (bộ nhớ và I/O) đều đi trên <b>một bus</b></td></tr>
<tr><td>(b) <b>Dual-bus memory</b></td><td>CPU đọc/ghi bộ nhớ qua <b>bus băng thông cao</b> riêng; bộ nhớ có thêm cổng nối bus chung để thiết bị I/O truy cập bộ nhớ</td></tr></table>`},
{id:"s5-4",title:"4. Ba phương pháp truyền dữ liệu CPU ↔ thiết bị",
 figs:[["c5-15","Slide 15 – Ngắt xảy ra thế nào"],["c5-16","Slide 16 – Hệ thống ngắt của PC (2 chip PIC)"],["c5-17","Slide 17 – Quá trình vận hành của DMA"],["c5-18","Slide 18 – Ví dụ DMA truyền trên PC"]],
 yt:"programmed I/O vs interrupt driven I/O vs DMA",
 html:`
<table><tr><th>Phương pháp</th><th>Cách làm</th><th>Ưu / nhược</th></tr>
<tr><td><b>Programmed I/O</b> (Polling)</td><td>CPU đọc trạng thái thiết bị: <b>ready / busy / error</b>, dùng <b>vòng lặp chờ bận (busy-wait cycle)</b></td><td>Đơn giản; <b>lãng phí CPU</b></td></tr>
<tr><td><b>Interrupt-driven I/O</b></td><td>Thiết bị báo <b>ngắt</b> khi xong; CPU làm việc khác trong lúc chờ</td><td>Không busy-wait; nhưng mỗi ký tự 1 ngắt</td></tr>
<tr><td><b>DMA</b> – Direct Memory Access</td><td>DMA controller tự chuyển dữ liệu giữa thiết bị và RAM</td><td>Chỉ <b>1 ngắt cho cả khối</b> – tốt nhất cho dữ liệu lớn</td></tr></table>
<p><b>Ngắt:</b> kết nối giữa thiết bị và interrupt controller thực tế dùng <b>các đường ngắt trên bus</b> chứ không phải dây riêng.</p>
<div class="demo" data-demo="steps" data-key="interrupt"></div>
<p><b>Hệ thống ngắt của PC:</b> 2 chip <b>PIC</b> – PIC #1 kiểu ngắt <b>8–F</b> (IRQ0–7), PIC #2 kiểu <b>70–77</b> (IRQ8–15) nối tầng vào IRQ2.</p>
<table><tr><th>Nguồn</th><th>Ngắt</th><th>Nguồn</th><th>Ngắt</th></tr>
<tr><td>NMI</td><td>Parity Error Detected</td><td>IRQ8</td><td>Real-time Clock</td></tr>
<tr><td>IRQ0</td><td>Interval Timer (PIT)</td><td>IRQ9</td><td>S/W redirected to IRQ2</td></tr>
<tr><td>IRQ1</td><td>Keyboard Output Buffer</td><td>IRQ10, 11</td><td>Free</td></tr>
<tr><td>IRQ2</td><td>PIC 2 (Cascade)</td><td>IRQ12</td><td>Free (PS/2 Mouse)</td></tr>
<tr><td>IRQ3</td><td>COM2</td><td>IRQ13</td><td>Math coprocessor</td></tr>
<tr><td>IRQ4</td><td>COM1 (Primary)</td><td>IRQ14</td><td>Primary EIDE Fixed Disk</td></tr>
<tr><td>IRQ5</td><td>Free (Sound card, LPT2)</td><td>IRQ15</td><td>Secondary EIDE Fixed Disk</td></tr>
<tr><td>IRQ6</td><td>Floppy Disk Controller</td><td>IRQ7</td><td>LPT1 (Primary) or Free</td></tr></table>
<p><b>DMA controller</b> có các thanh ghi <b>Address · Count · Control</b>.</p>
<div class="demo" data-demo="steps" data-key="dma"></div>
<div class="demo" data-demo="steps" data-key="dmapc"></div>`},
{id:"s5-5",title:"5. Mục đích của phần mềm Vào/Ra",
 figs:[], yt:"goals of I/O software device independence uniform naming buffering",
 html:`
<table><tr><th>Mục đích</th><th>Giải thích (slide)</th></tr>
<tr><td><b>Độc lập thiết bị</b></td><td>Chương trình truy cập được bất kỳ thiết bị nào, không phân biệt khác biệt vật lý cũng như tính hiện đại (floppy, hard drive hay CD-ROM)</td></tr>
<tr><td><b>Đặt tên chung</b> (uniform naming)</td><td>Tên của file hay thiết bị là <b>string hoặc integer</b>, không phụ thuộc phần cứng</td></tr>
<tr><td><b>Xử lý lỗi</b></td><td>Xử lý <b>càng gần phần cứng càng tốt</b></td></tr>
<tr><td><b>Truyền đồng bộ / không đồng bộ</b></td><td><b>Blocked transfers</b> vs <b>interrupt-driven</b></td></tr>
<tr><td><b>Định bộ đệm</b> (buffering)</td><td>Dữ liệu sắp tới thiết bị không thể lưu ngay lên thiết bị</td></tr>
<tr><td><b>Chia sẻ / dùng riêng</b></td><td><b>Disk</b> có thể chia sẻ; <b>tape drives</b> không thể chia sẻ</td></tr></table>
<div class="tip"><b>Mẹo nhớ 6 mục đích:</b> “<b>Độc</b> – <b>Tên</b> – <b>Lỗi</b> – <b>Đồng bộ</b> – <b>Đệm</b> – <b>Chia sẻ</b>”.</div>`},
{id:"s5-6",title:"6. In chuỗi: Programmed I/O, Interrupt, DMA",
 figs:[["c5-22","Slide 22 – Các bước in một chuỗi"],["c5-23","Slide 23 – Code Programmed I/O"],["c5-24","Slide 24 – Code Interrupt-driven I/O"],["c5-25","Slide 25 – Code in bằng DMA"],["c5-26","Slide 26 – Cấu trúc Kernel I/O: phần cứng và phần mềm"]],
 yt:"printing a string programmed I/O interrupt driven DMA tanenbaum",
 html:`
<div class="demo" data-demo="steps" data-key="print"></div>
<table><tr><th></th><th>(a) Code khi gọi print</th><th>(b) Thủ tục phục vụ ngắt</th></tr>
<tr><td><b>Programmed I/O</b></td><td><code>copy_from_user(buffer, p, count);<br>for (i = 0; i &lt; count; i++) {<br>&nbsp;&nbsp;while (*printer_status_reg != READY) ;<br>&nbsp;&nbsp;*printer_data_register = p[i];<br>}<br>return_to_user();</code></td><td>Không có (không dùng ngắt)</td></tr>
<tr><td><b>Interrupt-driven</b></td><td><code>copy_from_user(buffer, p, count);<br>enable_interrupts();<br>while (*printer_status_reg != READY) ;<br>*printer_data_register = p[0];<br>scheduler();</code></td><td><code>if (count == 0) unblock_user();<br>else { *printer_data_register = p[i];<br>&nbsp;&nbsp;count = count − 1; i = i + 1; }<br>acknowledge_interrupt();<br>return_from_interrupt();</code></td></tr>
<tr><td><b>DMA</b></td><td><code>copy_from_user(buffer, p, count);<br>set_up_DMA_controller();<br>scheduler();</code></td><td><code>acknowledge_interrupt();<br>unblock_user();<br>return_from_interrupt();</code></td></tr></table>
<div class="tip"><b>So sánh:</b> Programmed I/O = CPU tự <i>đứng chờ</i> từng ký tự · Interrupt = CPU chạy tiến trình khác, <i>mỗi ký tự 1 ngắt</i> · DMA = DMA controller in hộ, <i>xong cả buffer mới ngắt 1 lần</i>.</div>
<p><b>Cấu trúc Kernel I/O:</b> <b>Software</b> = kernel → kernel I/O subsystem → các device driver (SCSI, keyboard, mouse, PCI bus, floppy, ATAPI). <b>Hardware</b> = các device controller tương ứng → thiết bị (SCSI devices, keyboard, mouse, PCI bus, floppy-disk drives, ATAPI devices: disks, tapes, drives).</p>`},
{id:"s5-7",title:"7. Hệ thống phân lớp phần mềm Vào/Ra",
 figs:[["c5-28","Slide 28 – Hệ thống phân lớp của phần mềm Vào/Ra"],["c5-36","Slide 36 – Các lớp và chức năng chính của mỗi lớp"]],
 yt:"I/O software layers interrupt handlers device drivers device independent",
 html:`
<div class="stack"><div>User-level I/O software (User processes)<small>Make I/O call; format I/O; spooling</small></div><div>Device-independent operating system software<small>Naming, protection, blocking, buffering, allocation</small></div><div>Device drivers<small>Set up device registers; check status</small></div><div>Interrupt handlers<small>Wake up driver when I/O completed</small></div><div>Hardware<small>Perform I/O operation</small></div></div>
<p><b>I/O request</b> đi từ trên xuống phần cứng; <b>I/O reply</b> đi ngược từ phần cứng lên tiến trình.</p>
<div class="tip"><b>Mẹo nhớ (trên → dưới):</b> <b>U</b>ser → <b>Đ</b>ộc lập → <b>D</b>river → <b>I</b>nterrupt → <b>H</b>ardware: “<b>Út Đi Dạo Ít Hôm</b>”.</div>`},
{id:"s5-8",title:"8. Interrupt handlers & Device drivers",
 figs:[["c5-29","Slide 29 – Interrupt Handlers (1)"],["c5-31","Slide 31 – Vị trí logic của device driver"]],
 yt:"interrupt handler steps device driver kernel",
 html:`
<p><b>Bộ điều khiển ngắt (Interrupt Handlers):</b></p>
<ul><li>Nên được <b>ẩn sâu bên dưới, gần phần cứng</b> thiết bị.</li>
<li>Driver bắt đầu thao tác I/O rồi <b>chặn (block)</b> cho đến khi ngắt thông báo hoàn thành.</li>
<li>Thủ tục ngắt thực hiện tác vụ của nó, sau đó <b>khôi phục (unblock) driver</b>.</li></ul>
<ol class="steps"><li>Lưu các thanh ghi chưa được lưu bởi phần cứng ngắt</li><li>Thiết lập ngữ cảnh cho thủ tục phục vụ ngắt</li><li>Thiết lập ngăn xếp cho thủ tục phục vụ ngắt</li><li>Ack ngắt bộ điều khiển, kết nối lại các ngắt</li><li>Copy các thanh ghi đã lưu vào bảng tiến trình</li><li>Chạy thủ tục phục vụ ngắt</li><li>Thiết lập ngữ cảnh MMU để chạy tiến trình tiếp theo</li><li>Tải các thanh ghi của tiến trình mới</li><li>Bắt đầu chạy tiến trình mới</li></ol>
<div class="demo" data-demo="steps" data-key="isr"></div>
<p><b>Device Drivers:</b></p>
<ul><li>Vị trí logic: user program (user space) → rest of the OS → các driver (printer, camcorder, CD-ROM driver) đều trong <b>kernel space</b> → controller (hardware) → thiết bị.</li>
<li>Giao tiếp giữa các driver và các bộ điều khiển thiết bị <b>qua bus</b>.</li>
<li>Mỗi loại thiết bị cần driver riêng, thường do hãng sản xuất thiết bị viết.</li></ul>`},
{id:"s5-9",title:"9. Phần mềm Vào/Ra độc lập thiết bị & buffering",
 figs:[["c5-33","Slide 33 – (a) giao diện không chuẩn, (b) giao diện chuẩn"],["c5-34","Slide 34 – 4 cách buffering"],["c5-35","Slide 35 – Kết nối mạng gồm nhiều bản sao"]],
 yt:"device independent I/O software buffering double buffering",
 html:`
<p><b>Chức năng của phần mềm Vào/Ra độc lập thiết bị:</b></p>
<ul class="checklist"><li>Giao diện chung (thống nhất) với device drivers</li><li>Định bộ đệm (buffering)</li><li>Thông báo lỗi</li><li>Cấp phát và giải phóng thiết bị (dùng riêng)</li><li>Cung cấp kích thước khối độc lập thiết bị</li></ul>
<p><b>Giao diện driver:</b> (a) <b>không chuẩn</b> – mỗi driver (disk, printer, keyboard) giao tiếp với HĐH một kiểu → thêm driver mới phải sửa HĐH; (b) <b>chuẩn</b> – mọi driver “khớp” cùng một giao diện → dễ thêm driver.</p>
<table><tr><th>Buffering (vd nhận dữ liệu từ modem)</th><th>Cách hoạt động</th></tr>
<tr><td>(a) <b>Unbuffered input</b></td><td>Mỗi ký tự đến đánh thức tiến trình user → rất kém hiệu quả</td></tr>
<tr><td>(b) <b>Buffering in user space</b></td><td>Buffer nằm trong tiến trình user; trang buffer phải bị khóa trong RAM</td></tr>
<tr><td>(c) <b>Buffering in the kernel followed by copying to user space</b></td><td>(1) modem → buffer kernel; (2) copy sang user khi đầy</td></tr>
<tr><td>(d) <b>Double buffering in the kernel</b></td><td>2 buffer luân phiên: một buffer đang copy (2) thì ký tự mới vào buffer kia (3)</td></tr></table>
<p><b>Kết nối mạng có thể gồm nhiều bản sao:</b> gói tin được copy (1) user → kernel, (2) kernel → network controller, (3) qua mạng, (4) controller nhận → kernel, (5) kernel → user ⇒ <b>5 lần copy</b> làm chậm truyền.</p>`},
{id:"s5-10",title:"10. Thiết bị: Đĩa & RAID",
 figs:[["c5-39","Slide 39 – Drive head, track, sector, cylinder"],["c5-40","Slide 40 – RAID 0, 1, 2"],["c5-41","Slide 41 – RAID 3, 4, 5"]],
 yt:"RAID 0 1 2 3 4 5 explained",
 html:`
<p>Thiết bị I/O ở mục 5.4: <b>thiết bị lưu trữ</b> (Hard Disks, CD-ROM, CD-R, DVD…), <b>thiết bị hiển thị</b> (character-oriented terminals, GUI), <b>đồng hồ</b> (clocks).</p>
<ul><li>Dữ liệu lưu trên các <b>track</b> (vòng tròn đồng tâm).</li>
<li>Mỗi track chia thành các <b>sector</b> có địa chỉ riêng (<b>512 bytes/sector</b>).</li>
<li><b>Cylinder</b> = nhóm tất cả các track tại cùng một vị trí đầu đọc trên mọi mặt đĩa.</li>
<li>Thành phần: 1. Drive head · 2. Track · 3. Sector · 4. Cylinder. Đĩa cứng là dạng lưu trữ khối lớn phổ biến nhất.</li></ul>
<table><tr><th>RAID</th><th>Đơn vị chia</th><th>Dư thừa (ổ tô xám)</th><th>Ghi nhớ</th></tr>
<tr><td>0</td><td>Strip</td><td>Không có</td><td>Striping thuần – nhanh, hỏng 1 đĩa là mất</td></tr>
<tr><td>1</td><td>Strip</td><td>Mỗi đĩa có 1 đĩa sao lưu</td><td>Mirroring – nhân đôi</td></tr>
<tr><td>2</td><td>Bit</td><td>Nhiều đĩa mã sửa lỗi (Hamming)</td><td>Hình: Bit 1 → Bit 7</td></tr>
<tr><td>3</td><td>Bit</td><td>1 đĩa Parity</td><td>Bit 1–4 + Parity</td></tr>
<tr><td>4</td><td>Strip</td><td>1 đĩa parity riêng (P0-3, P4-7…)</td><td>Đĩa parity dễ nghẽn</td></tr>
<tr><td>5</td><td>Strip</td><td>Parity <b>phân tán</b> xoay vòng trên mọi đĩa</td><td>Khắc phục nghẽn của RAID 4</td></tr></table>`},
{id:"s5-11",title:"11. Màn hình, terminal RS-232 & đồng hồ",
 figs:[["c5-42","Slide 42 – Memory-mapped display"],["c5-43","Slide 43 – Quét non-interlaced"],["c5-45","Slide 45 – Phần cứng RS-232 terminal"],["c5-46","Slide 46 – Đồng hồ khả trình"]],
 yt:"memory mapped display video RAM programmable interval timer",
 html:`
<p><b>Phần cứng màn hình:</b></p>
<ul><li><b>Memory-mapped displays</b>: driver <b>ghi trực tiếp vào video RAM</b> của màn hình.</li>
<li>Graphics adapter gồm <b>Video RAM</b> + <b>Video controller</b>; video controller phát <b>tín hiệu video analog</b> tới monitor. Kết nối song song (parallel port).</li>
<li><b>Non-interlaced</b>: các dòng được quét lần lượt theo thứ tự (line 1 → line 625).</li>
<li>Màn hình ký tự: vùng hiển thị (display period) + khoảng quét ngược ngang/dọc (horizontal/vertical retrace period).</li></ul>
<p><b>Character Oriented Terminals – RS-232:</b></p>
<ul><li>Giao tiếp với máy tính <b>1 bit mỗi lần</b>.</li>
<li>Gọi là <b>serial line</b> – các bit đi ra nối tiếp.</li>
<li>Windows dùng <b>COM1, COM2</b> cho 2 đường serial đầu tiên.</li>
<li>Máy tính và terminal <b>hoàn toàn độc lập</b>. RS-232 interface có chip <b>UART</b>, nối Transmit/Receive.</li></ul>
<p><b>Đồng hồ khả trình (programmable clock):</b> <b>Crystal oscillator</b> tạo xung → <b>counter giảm 1 sau mỗi xung</b> → về 0 thì sinh ngắt → <b>holding register</b> dùng để nạp lại counter.</p>`},
{id:"s5-12",title:"✔ Ghi nhớ nhanh Chương 5",
 figs:[], yt:"",
 html:`
<ul class="checklist">
<li>Block (đĩa: read, write, seek) vs Character (bàn phím, chuột, serial: get, put).</li>
<li>Thiết bị = cơ điện tử + điện tử (controller). Controller: bit → byte, sửa lỗi, đưa vào RAM; điều khiển được nhiều thiết bị.</li>
<li>I/O port = thanh ghi. Địa chỉ dùng qua lệnh I/O trực tiếp hoặc ánh xạ bộ nhớ: tách riêng / memory-mapped / hybrid.</li>
<li>3 phương pháp: Programmed I/O (busy-wait), Interrupt, DMA (Address, Count, Control).</li>
<li>Ngắt: device finished → controller issues interrupt → CPU acks.</li>
<li>6 mục đích phần mềm I/O: độc lập thiết bị, tên chung, lỗi gần phần cứng, đồng bộ/không, đệm, chia sẻ/dùng riêng.</li>
<li>5 lớp: User – Độc lập thiết bị – Driver – Interrupt handler – Hardware.</li>
<li>9 bước xử lý ngắt; driver ở kernel, nói chuyện với controller qua bus.</li>
<li>Độc lập thiết bị: giao diện chung, đệm, báo lỗi, cấp phát/giải phóng, kích thước khối.</li>
<li>Buffering: không đệm → user → kernel + copy → double buffering; mạng: 5 lần copy.</li>
<li>Đĩa: track, sector 512 B, cylinder. RAID 0 striping, 1 mirror, 2 Hamming bit, 3 parity bit, 4 parity strip riêng, 5 parity phân tán.</li>
<li>Memory-mapped display ghi vào video RAM; RS-232 1 bit/lần, COM1/COM2; clock: thạch anh + counter + holding register.</li>
</ul>`}
]});
