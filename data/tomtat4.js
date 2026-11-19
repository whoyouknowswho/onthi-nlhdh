/* Tổng hợp kiến thức – Chương 4: Quản lý Bộ nhớ (đầy đủ theo slide 1 → 56)
   figs: [mã ảnh slide, chú thích]  → ảnh nằm ở assets/slides/<mã>.jpg
   yt: từ khóa tìm video trên YouTube
   <div class="demo" data-demo="..."> : mô phỏng tương tác do app.js dựng */
window.SUMMARY = window.SUMMARY || [];
window.STEPS = window.STEPS || {};

window.STEPS.pagefault = {title:"Xử lý lỗi trang (6 bước – slide 31, 32)", fig:"c4-32", steps:[
 {t:"① Tham chiếu (reference)", d:"Lệnh <b>load M</b> tham chiếu trang M. Tra bảng trang thấy bit <b>i (invalid)</b> → trang chưa có trong RAM."},
 {t:"② Bẫy (trap) về HĐH", d:"Phần cứng phát sinh <b>lỗi trang</b> (page fault) và chuyển quyền điều khiển cho hệ điều hành."},
 {t:"③ Trang nằm trên backing store", d:"HĐH xác định vị trí trang trên đĩa và tìm (hoặc tạo) một <b>khung trang trống</b> – nếu cần thì sao lưu trang cũ ra đĩa."},
 {t:"④ Nạp trang thiếu (bring in missing page)", d:"Swap trang từ đĩa vào <b>free frame</b> vừa được giải phóng trong bộ nhớ vật lý."},
 {t:"⑤ Cập nhật bảng trang (reset page table)", d:"Ghi số khung mới vào bảng trang, đặt bit = <b>v (valid)</b>."},
 {t:"⑥ Khởi động lại lệnh (restart instruction)", d:"Lệnh gây lỗi được chạy lại – lần này trang đã có trong RAM nên truy cập thành công."}
]};
window.STEPS.replace = {title:"Thay thế trang khi không còn khung trống (slide 34, 35)", fig:"c4-35", steps:[
 {t:"1. Tìm vị trí trang trên đĩa", d:"Xác định trang cần nạp đang nằm ở đâu trên đĩa."},
 {t:"2. Tìm khung trang free", d:"Có khung free → dùng luôn. Không có → phải thay thế một trang."},
 {t:"3. Chọn khung nạn nhân (victim)", d:"Thuật toán thay thế trang chọn victim. <b>①</b> swap out victim ra đĩa (nếu bị sửa) và <b>②</b> đổi entry của nó thành <b>invalid</b>."},
 {t:"4. Nạp trang mới & cập nhật bảng trang", d:"<b>③</b> swap trang cần dùng vào khung vừa trống, <b>④</b> reset bảng trang cho trang mới (bit v)."},
 {t:"5. Khởi động lại tiến trình", d:"Tiến trình tiếp tục chạy từ lệnh bị lỗi."}
]};
window.STEPS.fault10 = {title:"Điều khiển lỗi trang – 10 bước chi tiết (slide 38, 39)", steps:[
 {t:"1. Phần cứng bẫy lỗi đến kernel", d:"Lưu PC (program counter) lên stack."},
 {t:"2. Các thanh ghi được lưu lại", d:"Lưu trạng thái tiến trình để sau còn khôi phục."},
 {t:"3. HĐH xác định trang lỗi", d:"Tìm xem địa chỉ ảo nào gây lỗi."},
 {t:"4. HĐH kiểm tra các khung trang có thể thay thế", d:"Kiểm tra địa chỉ hợp lệ, chọn khung (free hoặc victim)."},
 {t:"5. Khung bị sửa → ghi ra đĩa", d:"Nếu khung có chỉnh sửa (dirty) thì phải ghi trang đó ra đĩa để cập nhật dữ liệu."},
 {t:"6. HĐH nạp trang mới từ đĩa vào", d:"Đọc trang cần dùng vào khung."},
 {t:"7. Cập nhật lại bảng trang", d:"Đánh dấu trang đã có mặt (present)."},
 {t:"8. Khởi động lại lệnh gây ra lỗi", d:"Đưa PC về lệnh gây lỗi."},
 {t:"9. Tiến trình lỗi được lên lịch", d:"Bộ lập lịch cho tiến trình chạy lại."},
 {t:"10. Phục hồi các thanh ghi, chương trình tiếp tục", d:"Tiến trình chạy tiếp như chưa có gì xảy ra."}
]};
window.STEPS.pentium = {title:"Dịch địa chỉ trên Pentium (slide 48 → 55)", fig:"c4-53", steps:[
 {t:"1. Cặp (selector, offset)", d:"Chương trình phát ra địa chỉ gồm <b>selector 16 bit</b> và <b>offset</b>."},
 {t:"2. Chọn bảng mô tả", d:"Bit TI của selector: <b>0 → GDT</b> (Global), <b>1 → LDT</b> (Local). Index 13 bit chọn descriptor."},
 {t:"3. Lấy descriptor", d:"Descriptor chứa <b>Base</b> (32 bit), <b>Limit</b> (20 bit) và các cờ G, D, P, DPL, S, Type."},
 {t:"4. Base + Offset = địa chỉ tuyến tính", d:"Kiểm tra offset ≤ Limit rồi cộng → <b>32-bit linear address</b> (không gian 4 GB)."},
 {t:"5. Phân trang 2 mức", d:"Linear address = <b>Dir (10) | Page (10) | Offset (12)</b>. Dir chọn entry trong page directory (1024 entry) → trỏ tới page table."},
 {t:"6. Địa chỉ vật lý", d:"Entry trong page table trỏ tới page frame; Offset chọn đúng word trong frame."}
]};

window.SUMMARY.push({
ch:4, title:"Quản lý Bộ nhớ", en:"Memory Management",
intro:"Nội dung: <b>4.1 Quản lý bộ nhớ cơ bản · 4.2 Swapping · 4.3 Bộ nhớ ảo · 4.4 Cách thực hiện · 4.5 Phân đoạn</b>. Câu hỏi xuyên suốt: HĐH chia RAM cho nhiều tiến trình thế nào để <b>an toàn</b> (không đè nhau), <b>tận dụng tối đa</b> và chạy được chương trình <b>lớn hơn cả RAM</b>.",
sections:[
{id:"s4-1",title:"1. Phân cấp bộ nhớ & hai loại địa chỉ",
 figs:[],
 yt:"memory hierarchy operating system logical vs physical address",
 html:`
<p>Người lập trình mong muốn bộ nhớ lý tưởng: <b>dung lượng lớn – nhanh – ổn định</b>. Không loại bộ nhớ nào đáp ứng đủ cả 3 → phải <b>phân cấp bộ nhớ</b>:</p>
<div class="flow"><span>Cache<small>ít · nhanh · đắt</small></span><i>→</i><span>Bộ nhớ chính (RAM)<small>tốc độ & giá trung bình</small></span><i>→</i><span>Đĩa<small>hàng GB · chậm · rẻ</small></span></div>
<p><b>Memory manager</b> (bộ quản lý bộ nhớ) là phần HĐH điều khiển phân cấp này.</p>
<table><tr><th>Loại địa chỉ</th><th>Ai sinh ra / ai thấy</th><th>Ghi nhớ</th></tr>
<tr><td><b>Logical address</b> (địa chỉ logic)</td><td>Do <b>CPU sinh ra</b>; cũng gọi là <b>địa chỉ ảo (virtual address)</b></td><td>“Địa chỉ chương trình nhìn thấy”</td></tr>
<tr><td><b>Physical address</b> (địa chỉ vật lý)</td><td>Địa chỉ mà <b>bộ nhớ vật lý</b> nhìn thấy</td><td>“Địa chỉ thật trên RAM”</td></tr></table>
<div class="tip"><b>Ý chính cả chương:</b> khái niệm không gian địa chỉ logic bị ràng buộc vào không gian địa chỉ vật lý là <b>vấn đề chính của quản lý bộ nhớ</b>. Base/limit, phân trang, phân đoạn… đều là các cách <b>ánh xạ logic → vật lý</b>.</div>`},
{id:"s4-2",title:"2. Đơn nhiệm & đa nhiệm với phân vùng cố định",
 figs:[["c4-05","Slide 5 – 3 cách tổ chức bộ nhớ đơn nhiệm"],["c4-06","Slide 6 – Phân vùng cố định: (a) nhiều hàng đợi, (b) một hàng đợi"]],
 yt:"fixed partition memory management multiple input queues",
 html:`
<p><b>Đơn nhiệm (không Swapping/Paging)</b>: chỉ có <b>1 HĐH + 1 tiến trình user</b>. Ba cách bố trí:</p>
<table><tr><th>Cách</th><th>Bố trí (từ địa chỉ 0 lên 0xFFF…)</th><th>Ví dụ thực tế <span class="xs">ngoài slide</span></th></tr>
<tr><td>(a)</td><td>HĐH ở RAM (dưới) – User program (trên)</td><td>Máy mainframe/mini đời đầu</td></tr>
<tr><td>(b)</td><td>User program (dưới) – HĐH ở ROM (trên)</td><td>Máy cầm tay, hệ nhúng</td></tr>
<tr><td>(c)</td><td>HĐH ở RAM (dưới) – User program – Device drivers ở ROM (trên)</td><td>PC thời MS-DOS (BIOS trong ROM)</td></tr></table>
<p><b>Đa nhiệm với phân vùng cố định (Fixed Partitions)</b>: RAM chia sẵn thành các phân vùng kích thước cố định. Ví dụ slide: OS 0–100K · P1 100–200K · P2 200–400K · P3 400–700K · P4 700–800K.</p>
<ul><li><b>(a) Nhiều hàng đợi vào</b>: mỗi phân vùng một hàng đợi → có lúc phân vùng lớn bỏ trống trong khi hàng đợi phân vùng nhỏ rất dài. <span class="xs">ngoài slide</span></li>
<li><b>(b) Một hàng đợi vào chung</b>: phân vùng nào trống thì lấy job phù hợp trong hàng đợi chung.</li>
<li>Nhược điểm chung: <b>phân mảnh nội</b> (job nhỏ chiếm phân vùng lớn, phần dư bỏ phí).</li></ul>`},
{id:"s4-3",title:"3. Tái cấp phát & bảo vệ (Relocation – Base/Limit)",
 figs:[["c4-07","Slide 7 – Tái cấp phát động bằng thanh ghi relocation: 14000 + 346 = 14346"],["c4-10","Slide 10 – Bảo vệ địa chỉ bằng phần cứng base & limit"]],
 yt:"base and limit registers relocation register MMU",
 html:`
<p><b>Vì sao cần?</b> Không chắc chắn chương trình được tải vào chỗ nào trong bộ nhớ:</p>
<ul><li>Địa chỉ cấp phát cho các biến, cho đoạn code <b>có thể thay đổi</b> → cần <b>tái cấp phát (relocation)</b>.</li>
<li>Cần giữ cho chương trình <b>nằm ngoài các phân vùng của tiến trình khác</b> → cần <b>bảo vệ (protection)</b>.</li></ul>
<p><b>Giải pháp: dùng giá trị base và limit</b></p>
<ul><li>Địa chỉ được <b>cộng với base</b> để ra địa chỉ vật lý.</li>
<li>Địa chỉ <b>lớn hơn limit</b> là <b>lỗi</b>.</li>
<li><b>Base register</b> chứa địa chỉ vật lý <b>nhỏ nhất</b>; <b>Limit register</b> chứa <b>phạm vi</b> địa chỉ logic – mỗi địa chỉ logic phải <b>nhỏ hơn limit</b>.</li>
<li>Thanh ghi relocation bảo vệ các tiến trình user <b>khỏi nhau</b> và <b>khỏi việc sửa code/data của HĐH</b>.</li>
<li><b>MMU</b> ánh xạ địa chỉ logic <b>một cách động</b> (lúc chạy).</li></ul>
<div class="formula">Kiểm tra (slide 10): <b>base ≤ address &lt; base + limit</b> → cho truy cập bộ nhớ<br>Sai một trong hai điều kiện → <b>trap to operating system – addressing error</b></div>
<div class="ex"><b>Ví dụ slide 7:</b> relocation register = 14000, CPU phát địa chỉ logic 346 → MMU cộng → địa chỉ vật lý <b>14346</b>.<br><b>Ví dụ tự luyện:</b> Base = 30000, Limit = 12000: logic 5000 → 35000 ✔; logic 13000 → lỗi vì 13000 ≥ 12000.</div>
<div class="demo" data-demo="reloc"></div>`},
{id:"s4-4",title:"4. Swapping & phân mảnh",
 figs:[["c4-11","Slide 11 – Lược đồ swapping: ① swap out P1, ② swap in P2"],["c4-12","Slide 12 – Bộ nhớ thay đổi theo thời gian khi tiến trình đến/đi"],["c4-13","Slide 13 – Chừa chỗ cho data (a) và stack & data (b) phát triển"]],
 yt:"swapping operating system external internal fragmentation",
 html:`
<p><b>Swapping</b>: đưa <b>toàn bộ</b> tiến trình từ bộ nhớ chính ra <b>backing store</b> (đĩa) – <b>swap out</b> – và nạp tiến trình khác vào – <b>swap in</b>.</p>
<ul><li>Cấp phát bộ nhớ <b>thay đổi</b> khi tiến trình đến bộ nhớ và khi rời khỏi bộ nhớ (hình (a)→(g): A, B, C vào; A ra; D vào; B ra; A vào lại ở chỗ khác).</li>
<li>Các vùng <b>gạch chéo</b> là chưa sử dụng.</li></ul>
<table><tr><th>Loại phân mảnh</th><th>Định nghĩa (slide)</th><th>Hay gặp ở</th></tr>
<tr><td><b>External Fragmentation</b> – phân mảnh ngoài</td><td>Tổng không gian trống <b>đủ</b> cấp cho một tiến trình nhưng lại nằm <b>rải rác, không liên tục</b></td><td>Phân vùng động, phân đoạn, cấp phát file liên tục</td></tr>
<tr><td><b>Internal Fragmentation</b> – phân mảnh nội</td><td>Vùng nhớ cấp phát <b>lớn hơn</b> vùng nhớ yêu cầu (do kích thước phân vùng ≠ kích thước yêu cầu); free nhưng không được dùng</td><td>Phân vùng cố định, phân trang (trang cuối)</td></tr></table>
<p><b>Chừa chỗ để phát triển</b> (slide 13): (a) cấp thêm vùng cho <b>đoạn data</b> tăng lên; (b) cấp vùng ở giữa để <b>stack</b> (tăng xuống) và <b>data</b> (tăng lên) cùng phát triển.</p>`},
{id:"s4-5",title:"5. Phân vùng động: Bit Map, Linked List & thuật toán cấp phát",
 figs:[["c4-15","Slide 15 – (a) bộ nhớ 5 tiến trình 3 hole, (b) bit map, (c) danh sách liên kết"]],
 yt:"first fit best fit worst fit next fit memory allocation",
 html:`
<ul><li><b>Hole</b> – block trống của bộ nhớ; các hole có kích thước khác nhau, nằm rải rác khắp bộ nhớ.</li>
<li>Khi tiến trình đến, nó được cấp phát từ một hole <b>đủ lớn</b> phù hợp.</li>
<li>HĐH quản lý: (a) các phân vùng <b>đã cấp</b> (allocated partitions); (b) các phân vùng <b>free</b> (holes).</li>
<li>Hai cách quản lý: <b>Bit Maps</b> và <b>Linked Lists</b>.</li></ul>
<table><tr><th></th><th>Bit Map</th><th>Linked List</th></tr>
<tr><td>Cách làm</td><td>Bộ nhớ chia thành các <b>allocation unit</b> (vạch chia trong hình); mỗi unit ↔ 1 bit (1 = đã dùng, 0 = trống)</td><td>Mỗi phần tử: <b>P</b> (process) hoặc <b>H</b> (hole) · địa chỉ bắt đầu · độ dài</td></tr>
<tr><td>Ví dụ slide</td><td>Byte đầu <b>11111000</b>: unit 0–4 của A đã dùng, 5–7 trống</td><td>P0 5 → H5 3 → P8 6 → P14 4 → <b>H18 2</b> → P20 6 → P26 3 → H29 3</td></tr></table>
<p><b>Làm thế nào thỏa mãn yêu cầu kích thước n từ danh sách vùng trống?</b></p>
<table><tr><th>Thuật toán</th><th>Chọn hole nào?</th><th>Duyệt toàn bộ DS?</th></tr>
<tr><td><b>First-fit</b></td><td>Vùng free <b>đầu tiên</b> đủ lớn</td><td>Không</td></tr>
<tr><td><b>Next-fit</b></td><td>Bắt đầu tìm từ <b>vị trí con trỏ hiện hành</b>, lấy vùng đầu tiên đủ lớn</td><td>Không</td></tr>
<tr><td><b>Best-fit</b></td><td>Vùng free <b>nhỏ nhất</b> nhưng đủ lớn</td><td><b>Có</b></td></tr>
<tr><td><b>Worst-fit</b></td><td>Vùng free <b>lớn nhất</b></td><td><b>Có</b></td></tr></table>
<div class="ex"><b>Ví dụ kinh điển</b> <span class="xs">ngoài slide</span>: hole 100K, 500K, 200K, 300K, 600K; yêu cầu lần lượt 212K, 417K, 112K, 426K.<br>First-fit: 212→500, 417→600, 112→288(còn lại), <b>426 phải chờ</b>. Best-fit: 212→300, 417→500, 112→200, 426→600 (<b>đủ cả 4</b>). Worst-fit: 212→600, 417→500, 112→388, <b>426 phải chờ</b>.</div>
<div class="demo" data-demo="fit"></div>`},
{id:"s4-6",title:"6. Bộ nhớ ảo & phân trang (Paging)",
 figs:[["c4-20","Slide 20 – Bộ nhớ ảo lớn hơn bộ nhớ vật lý: memory map + đĩa"],["c4-21","Slide 21 – Ví dụ: không gian ảo 64K, bộ nhớ vật lý 32K, trang 4K"],["c4-22","Slide 22 – Vị trí và chức năng của MMU"]],
 yt:"virtual memory paging explained pages frames",
 html:`
<h4 class="sub">① Vấn đề: chương trình lớn hơn RAM thì sao?</h4>
<p>Ở các mục 2–5, muốn chạy chương trình thì phải nạp <b>toàn bộ</b> nó vào <b>một vùng liền nhau</b> trong RAM. Cách này vướng hai chuyện:</p>
<ul><li>Chương trình <b>64 KB</b> mà RAM chỉ <b>32 KB</b> → <b>không chạy được</b>.</li>
<li>Phải tìm được một lỗ trống <b>liền mạch</b> đủ lớn → sinh ra <b>phân mảnh ngoài</b> (mục 4). Tổng chỗ trống thì đủ, nhưng chỗ nào cũng vụn.</li></ul>

<h4 class="sub">② Ý tưởng: cắt nhỏ ra, cần mảnh nào nạp mảnh đó</h4>
<ol class="steps">
<li>Cắt <b>chương trình</b> thành các mảnh bằng nhau, gọi là <b>trang (page)</b>.</li>
<li>Cắt <b>RAM</b> thành các ô <b>cùng cỡ</b> với trang, gọi là <b>khung trang (frame)</b>.</li>
<li>Chỉ nạp những trang <b>đang cần</b> vào RAM. Trang nào cũng nhét được vào <b>khung trống bất kỳ</b>, không cần liền nhau. Các trang chưa cần thì nằm trên <b>đĩa</b>.</li>
<li>Ghi lại trang nào đang ở khung nào vào <b>bảng trang (page table)</b>. Trang chưa có trong RAM thì đánh dấu <b>X</b>.</li>
</ol>
<div class="tip"><b>Ví von:</b> chương trình là <b>cuốn sách dày</b>, RAM là <b>cái bàn</b> chỉ đặt vừa vài tờ, đĩa là <b>kệ sách</b>. Bạn chỉ để trên bàn những tờ đang đọc, đặt chỗ nào trên bàn cũng được. Một tờ <b>mục lục</b> ghi "trang mấy đang nằm ở ô nào trên bàn" chính là bảng trang.</div>

<table>
<tr><th>Thuật ngữ</th><th>Nói đơn giản</th><th>Trong ví von</th></tr>
<tr><td><b>Bộ nhớ ảo</b> (virtual memory)</td><td>Bộ nhớ mà chương trình <i>tưởng</i> mình có: rất lớn, liền một dải từ 0</td><td>Cả cuốn sách</td></tr>
<tr><td><b>Trang</b> (page)</td><td>Một mảnh của chương trình (bộ nhớ <b>logic</b>)</td><td>Một tờ sách</td></tr>
<tr><td><b>Khung trang</b> (page frame)</td><td>Một ô trong RAM (bộ nhớ <b>vật lý</b>), cùng cỡ với trang</td><td>Một ô trên bàn</td></tr>
<tr><td><b>Bảng trang</b> (page table)</td><td>Ghi trang nào ở khung nào; X = chưa có trong RAM</td><td>Tờ mục lục</td></tr>
<tr><td><b>MMU</b></td><td>Mạch phần cứng trong CPU, tra bảng trang để đổi địa chỉ ảo ra địa chỉ thật</td><td>Người tra mục lục giùm bạn</td></tr>
</table>

<h4 class="sub">③ Ví dụ slide 21: chương trình 64K, RAM chỉ 32K</h4>
<p>Trang = 4K. Chương trình 64K có <b>16 trang</b> (0–15), RAM 32K chỉ có <b>8 khung</b> (0–7). Cột trái là bảng trang, cột phải là RAM thật:</p>
<div class="vm-ex">
 <div class="vm-col"><div class="vm-h">Bảng trang (bộ nhớ ảo)</div><div class="vm-row on"><span class="vm-rng">0K–4K</span><span class="vm-pg">trang 0</span><span class="vm-to">→ khung 2</span></div><div class="vm-row on"><span class="vm-rng">4K–8K</span><span class="vm-pg">trang 1</span><span class="vm-to">→ khung 1</span></div><div class="vm-row on"><span class="vm-rng">8K–12K</span><span class="vm-pg">trang 2</span><span class="vm-to">→ khung 6</span></div><div class="vm-row on"><span class="vm-rng">12K–16K</span><span class="vm-pg">trang 3</span><span class="vm-to">→ khung 0</span></div><div class="vm-row on"><span class="vm-rng">16K–20K</span><span class="vm-pg">trang 4</span><span class="vm-to">→ khung 4</span></div><div class="vm-row on"><span class="vm-rng">20K–24K</span><span class="vm-pg">trang 5</span><span class="vm-to">→ khung 3</span></div><div class="vm-row off"><span class="vm-rng">24K–28K</span><span class="vm-pg">trang 6</span><span class="vm-to">X · trên đĩa</span></div><div class="vm-row off"><span class="vm-rng">28K–32K</span><span class="vm-pg">trang 7</span><span class="vm-to">X · trên đĩa</span></div><div class="vm-row off"><span class="vm-rng">32K–36K</span><span class="vm-pg">trang 8</span><span class="vm-to">X · trên đĩa</span></div><div class="vm-row on"><span class="vm-rng">36K–40K</span><span class="vm-pg">trang 9</span><span class="vm-to">→ khung 5</span></div><div class="vm-row off"><span class="vm-rng">40K–44K</span><span class="vm-pg">trang 10</span><span class="vm-to">X · trên đĩa</span></div><div class="vm-row on"><span class="vm-rng">44K–48K</span><span class="vm-pg">trang 11</span><span class="vm-to">→ khung 7</span></div><div class="vm-row off"><span class="vm-rng">48K–52K</span><span class="vm-pg">trang 12</span><span class="vm-to">X · trên đĩa</span></div><div class="vm-row off"><span class="vm-rng">52K–56K</span><span class="vm-pg">trang 13</span><span class="vm-to">X · trên đĩa</span></div><div class="vm-row off"><span class="vm-rng">56K–60K</span><span class="vm-pg">trang 14</span><span class="vm-to">X · trên đĩa</span></div><div class="vm-row off"><span class="vm-rng">60K–64K</span><span class="vm-pg">trang 15</span><span class="vm-to">X · trên đĩa</span></div></div>
 <div class="vm-col"><div class="vm-h">RAM thật (8 khung)</div><div class="vm-row on"><span class="vm-rng">0K–4K</span><span class="vm-pg">khung 0</span><span class="vm-to">chứa trang 3</span></div><div class="vm-row on"><span class="vm-rng">4K–8K</span><span class="vm-pg">khung 1</span><span class="vm-to">chứa trang 1</span></div><div class="vm-row on"><span class="vm-rng">8K–12K</span><span class="vm-pg">khung 2</span><span class="vm-to">chứa trang 0</span></div><div class="vm-row on"><span class="vm-rng">12K–16K</span><span class="vm-pg">khung 3</span><span class="vm-to">chứa trang 5</span></div><div class="vm-row on"><span class="vm-rng">16K–20K</span><span class="vm-pg">khung 4</span><span class="vm-to">chứa trang 4</span></div><div class="vm-row on"><span class="vm-rng">20K–24K</span><span class="vm-pg">khung 5</span><span class="vm-to">chứa trang 9</span></div><div class="vm-row on"><span class="vm-rng">24K–28K</span><span class="vm-pg">khung 6</span><span class="vm-to">chứa trang 2</span></div><div class="vm-row on"><span class="vm-rng">28K–32K</span><span class="vm-pg">khung 7</span><span class="vm-to">chứa trang 11</span></div></div>
</div>
<p>Hai điều cần thấy trong hình:</p>
<ul><li>Các trang nằm <b>lộn xộn</b> trong RAM: trang 0 ở khung 2, trang 3 ở khung 0. Chương trình không hề biết, vì nó vẫn thấy mình liền một dải từ 0K đến 64K.</li>
<li>8 trang có <b>X</b> đang ở đĩa. Chương trình 64K vẫn chạy được trên RAM 32K. Khi đụng tới trang X thì xảy ra <b>lỗi trang</b> và HĐH nạp trang đó vào (mục 9).</li></ul>

<h4 class="sub">④ Được gì, mất gì?</h4>
<ul class="checklist">
<li><b>Chương trình lớn hơn RAM vẫn chạy</b>, vì không gian logic có thể lớn hơn nhiều so với không gian vật lý.</li>
<li><b>Chạy được nhiều tiến trình hơn</b>, vì RAM được chia sẻ, mỗi tiến trình chỉ giữ những trang đang cần.</li>
<li><b>Không có phân mảnh ngoài</b>: mọi khung bằng nhau, khung trống nào cũng dùng được.</li>
<li>Chỉ còn <b>phân mảnh nội ở trang cuối</b>. Ví dụ chương trình 10K, trang 4K thì cần 3 trang (12K), trang cuối bỏ phí 2K.</li></ul>

<h4 class="sub">⑤ Ai làm việc tra bảng trang? MMU</h4>
<div class="flow"><span>CPU<small>phát địa chỉ ẢO</small></span><i>→</i><span>MMU<small>tra bảng trang</small></span><i>→</i><span>Bus → RAM<small>địa chỉ VẬT LÝ</small></span></div>
<p>MMU nằm ngay trong gói CPU. Mọi lần truy cập bộ nhớ đều đi qua nó, nên việc đổi địa chỉ diễn ra tự động và rất nhanh. Cách MMU tính ra địa chỉ cụ thể nằm ở mục 7.</p>

<div class="demo" data-demo="vmem"></div>

<details class="slide-note"><summary>Nguyên văn các ý trong slide 19–22</summary>
<ul><li>Bộ nhớ ảo tách bộ nhớ logic của user khỏi bộ nhớ vật lý: chỉ <b>một phần</b> chương trình được nạp khi thực thi; không gian logic có thể <b>lớn hơn nhiều</b> không gian vật lý; không gian vật lý được <b>chia sẻ</b> cho nhiều tiến trình, cho phép tạo <b>nhiều tiến trình hơn</b>.</li>
<li>Bộ nhớ ảo được thực hiện qua <b>phân trang (paging)</b> và <b>phân đoạn (segmentation)</b>.</li>
<li>Phân trang: không gian địa chỉ ảo của tiến trình có thể <b>không liên tục</b> trong bộ nhớ; tiến trình được cấp RAM ở bất kỳ đâu có vùng free.</li>
<li>Bộ nhớ logic chia thành các <b>trang (pages)</b>, bộ nhớ vật lý chia thành <b>khung trang (page frames)</b>; <b>1 trang = 1 khung</b>, kích thước từ <b>512 bytes đến 8.192 bytes</b>. HĐH theo dõi mọi khung free.</li>
<li>Chạy chương trình <b>n trang</b> thì tìm <b>n khung free</b> và tải chương trình vào; thiết lập <b>bảng trang</b> để chuyển địa chỉ logic sang địa chỉ vật lý; chỉ có <b>phân mảnh nội</b>.</li>
<li>MMU (Memory Management Unit) nằm trong gói CPU: CPU gửi địa chỉ ảo cho MMU, MMU gửi địa chỉ vật lý ra bus tới bộ nhớ.</li></ul>
</details>`},
{id:"s4-7",title:"7. Chuyển đổi địa chỉ & bảng trang",
 figs:[["c4-23","Slide 23 – Lược đồ chuyển đổi địa chỉ (p, d)"],["c4-24","Slide 24 – Một entry (hàng) của bảng trang"],["c4-25","Slide 25 – Paging hardware"],["c4-26","Slide 26 – Ví dụ 16 trang × 4KB: địa chỉ ảo 8196 → 24580"]],
 yt:"paging address translation page number offset page table entry",
 html:`
<p>Địa chỉ do CPU sinh ra được chia thành:</p>
<div class="addr"><div style="flex:2">p – page number<small>m − n bit</small></div><div style="flex:1.3">d – page offset<small>n bit</small></div></div>
<ul><li><b>Số trang ảo (p)</b> – dùng làm chỉ số trong <b>bảng trang</b>, nơi chứa địa chỉ cơ sở (số khung f) của mỗi trang trong bộ nhớ vật lý.</li>
<li><b>Page offset (d)</b> – địa chỉ tương đối tính từ đầu trang, ghép với địa chỉ cơ sở thành địa chỉ vật lý do MMU gửi đi.</li>
<li>Không gian logic <b>2<sup>m</sup></b>, kích thước trang <b>2<sup>n</sup></b>.</li></ul>
<div class="formula">p = địa chỉ ÷ kích thước trang · d = địa chỉ mod kích thước trang<br><b>Địa chỉ vật lý = f × kích thước trang + d</b> &nbsp;(trong hệ nhị phân: ghép f và d)</div>
<p><b>Một entry bảng trang</b>: <span class="chip">Caching disabled</span> <span class="chip">Referenced</span> <span class="chip">Modified</span> <span class="chip">Protection</span> <span class="chip">Present/absent</span> <span class="chip">Page frame number</span></p>
<table><tr><th>Trường</th><th>Ý nghĩa</th></tr>
<tr><td>Page frame number</td><td>Số khung chứa trang – mục đích chính của entry</td></tr>
<tr><td>Present/absent</td><td>1 = trang đang ở RAM; 0 = không có → truy cập gây <b>lỗi trang</b></td></tr>
<tr><td>Protection</td><td>Quyền truy cập (đọc / ghi / thực thi)</td></tr>
<tr><td>Modified (dirty)</td><td>Trang đã bị ghi → khi thay thế phải ghi ra đĩa</td></tr>
<tr><td>Referenced</td><td>Trang vừa được truy cập → hỗ trợ thuật toán thay thế trang</td></tr>
<tr><td>Caching disabled</td><td>Không cache trang này (dùng cho thanh ghi thiết bị ánh xạ bộ nhớ)</td></tr></table>
<div class="ex"><b>Ví dụ slide 26</b> (16 trang × 4 KB, địa chỉ 16 bit = 4 bit trang + 12 bit offset): địa chỉ ảo <b>8196</b> = 0010 000000000100 → trang <b>2</b>, offset 4 → bảng trang: trang 2 → khung <b>110</b> (= 6), present = 1 → địa chỉ vật lý 110 000000000100 = <b>24580</b>. 12 bit offset được chép thẳng.</div>
<div class="demo" data-demo="paging"></div>`},
{id:"s4-8",title:"8. Bảng trang 2 mức, PTBR/PRLR & TLB",
 figs:[["c4-27","Slide 27 – Bảng trang 2 mức: PT1 10 bit, PT2 10 bit, Offset 12 bit"],["c4-29","Slide 29 – Phân trang với TLB (TLB hit / TLB miss)"],["c4-30","Slide 30 – Ví dụ nội dung TLB"]],
 yt:"two level page table TLB translation lookaside buffer",
 html:`
<p>Mục này có <b>2 ý</b>, giải quyết <b>2 vấn đề khác nhau</b> của bảng trang ở mục 7:</p>
<table>
<tr><th></th><th>Vấn đề</th><th>Cách giải</th></tr>
<tr><td><b>Phần A</b></td><td>Bảng trang <b>quá to</b>, tốn RAM</td><td>Bảng trang <b>2 mức</b></td></tr>
<tr><td><b>Phần B</b></td><td>Tra bảng trang <b>quá chậm</b>: mỗi truy cập phải vào RAM 2 lần</td><td><b>TLB</b>, một bộ nhớ đệm cho bảng trang</td></tr>
</table>

<h4 class="sub">A① Vấn đề: bảng trang 1 mức quá to</h4>
<p>Địa chỉ <b>32 bit</b>, trang <b>4 KB = 2<sup>12</sup></b> → 12 bit thấp là offset, còn <b>20 bit</b> là số trang.</p>
<div class="addr"><div style="flex:20">Số trang<small>20 bit → 2<sup>20</sup> ≈ 1 triệu trang</small></div><div style="flex:12">Offset<small>12 bit</small></div></div>
<p>Vậy bảng trang 1 mức phải có <b>2<sup>20</sup> ≈ 1 triệu dòng</b>. Nếu mỗi dòng 4 byte thì mất <b>4 MB cho mỗi tiến trình</b> <span class="xs">ngoài slide</span>, chạy 100 tiến trình là mất 400 MB chỉ để chứa bảng trang.</p>
<p>Điều phí nhất là chương trình thật chỉ dùng <b>hai đầu</b> không gian địa chỉ: code và dữ liệu ở dưới, stack ở trên. Phần giữa trống gần hết, nhưng bảng 1 mức vẫn phải có đủ 1 triệu dòng.</p>

<h4 class="sub">A② Ý tưởng: cắt bảng dài thành nhiều bảng nhỏ, phần nào không dùng thì khỏi tạo</h4>
<ol class="steps">
<li>Cắt bảng 1 triệu dòng thành <b>1024 bảng nhỏ</b>, mỗi bảng <b>1024 dòng</b>, gọi là <b>bảng cấp 2</b> (second-level page table).</li>
<li>Thêm một <b>bảng cấp 1</b> (top-level page table) cũng 1024 dòng, làm <b>mục lục</b>. Dòng thứ i cho biết bảng cấp 2 thứ i nằm ở đâu, hoặc ghi "không có".</li>
<li>Bảng cấp 2 nào ứng với vùng nhớ <b>không dùng</b> thì <b>không cần tạo</b>. Đây chính là chỗ tiết kiệm.</li>
</ol>
<div class="tip"><b>Ví von:</b> một tòa nhà 1024 tầng, mỗi tầng 1024 phòng. Ở sảnh có <b>bảng chỉ dẫn</b> (bảng cấp 1) ghi sơ đồ phòng của từng tầng để ở đâu. Mỗi tầng có <b>sơ đồ phòng</b> riêng (bảng cấp 2). Tầng nào bỏ trống thì khỏi làm sơ đồ. Muốn tìm một chỗ: xem bảng chỉ dẫn để biết tầng (PT1), xem sơ đồ tầng để biết phòng (PT2), rồi tới đúng vị trí trong phòng (offset).</div>

<h4 class="sub">A③ Tách địa chỉ thành 10 – 10 – 12</h4>
<div class="addr"><div style="flex:10">PT1<small>10 bit · chọn dòng trong bảng cấp 1</small></div><div style="flex:10">PT2<small>10 bit · chọn dòng trong bảng cấp 2</small></div><div style="flex:12">Offset<small>12 bit · vị trí trong trang</small></div></div>
<div class="ex"><b>Ví dụ</b> <span class="xs">ngoài slide</span>: địa chỉ <b>0x00403004</b>. Viết ra 32 bit rồi cắt:
<div class="bits"><span class="b1">0000000001</span><span class="b2">0000000011</span><span class="b3">000000000100</span></div>
→ <b>PT1 = 1</b>, <b>PT2 = 3</b>, <b>Offset = 4</b>.<br>
Cách tra: vào <b>dòng 1</b> của bảng cấp 1 để tìm bảng cấp 2 cần dùng. Vào <b>dòng 3</b> của bảng cấp 2 đó để lấy số khung f. Địa chỉ vật lý = f × 4096 + 4.</div>
<div class="formula"><b>Tính nhanh với số thập phân:</b> PT1 = địa chỉ ÷ 4 MB (4.194.304) · PT2 = (phần dư) ÷ 4 KB (4096) · Offset = địa chỉ mod 4096</div>

<h4 class="sub">A④ Vì sao gọi là "mỗi bảng cấp 2 quản lý 4 MB"?</h4>
<ul><li>Một bảng cấp 2 có 1024 dòng, mỗi dòng ứng với 1 trang 4 KB → phủ <b>1024 × 4 KB = 4 MB</b> bộ nhớ ảo. Hình slide 27 ghi "page table for the top 4M of memory".</li>
<li>Bảng cấp 1 có 1024 dòng, mỗi dòng ứng với 1 bảng cấp 2 (4 MB) → phủ <b>1024 × 4 MB = 4 GB</b>, đúng bằng toàn bộ không gian 32 bit.</li>
<li><b>Tiết kiệm</b> <span class="xs">ví dụ ngoài slide</span>: chương trình chỉ dùng 4 MB code ở dưới và 4 MB stack ở trên thì chỉ cần <b>1 bảng cấp 1 + 2 bảng cấp 2 = 3 × 1024 dòng</b>, thay vì 1.048.576 dòng.</li></ul>

<h4 class="sub">B① Vấn đề: bảng trang nằm trong RAM nên tra rất chậm</h4>
<p>Bảng trang lớn nên phải <b>giữ trong bộ nhớ (RAM)</b>. CPU dùng 2 thanh ghi để biết bảng trang ở đâu:</p>
<table>
<tr><th>Thanh ghi</th><th>Tên đầy đủ</th><th>Giữ gì</th></tr>
<tr><td><b>PTBR</b></td><td>Page-Table Base Register</td><td><b>Địa chỉ đầu</b> của bảng trang (trỏ đến bảng trang)</td></tr>
<tr><td><b>PRLR</b></td><td>Page-Table Length Register</td><td><b>Kích thước</b> bảng trang</td></tr>
</table>
<p>Hệ quả: mỗi lần cần 1 dữ liệu hay 1 lệnh, máy phải vào RAM <b>2 lần</b>:</p>
<div class="flow"><span>① Vào RAM<small>đọc bảng trang → số khung</small></span><i>→</i><span>② Vào RAM<small>đọc dữ liệu / lệnh thật</small></span></div>
<p>Tức là mọi truy cập bộ nhớ đều <b>chậm gấp đôi</b>.</p>

<h4 class="sub">B② Ý tưởng: TLB, cuốn sổ tay nhỏ ngay trong MMU</h4>
<p><b>TLB (Translation Look-aside Buffer)</b>, còn gọi là <b>bộ nhớ kết hợp (associative memory)</b>, là một bộ nhớ đệm phần cứng <b>rất nhỏ và rất nhanh</b>. Nó ghi sẵn một số cặp <b>trang → khung</b> vừa dùng, và so sánh số trang với <b>tất cả các dòng cùng một lúc</b> (song song), nên tra gần như tức thì.</p>
<div class="tip"><b>Ví von:</b> danh bạ cả nước (bảng trang) để trong tủ, mở ra rất lâu. Bạn dán cạnh điện thoại một <b>tờ giấy ghi vài số hay gọi</b> (TLB). Số cần gọi có trên tờ giấy thì gọi ngay. Không có thì mới mở danh bạ, và chép thêm số đó lên tờ giấy cho lần sau.</div>
<p><b>Cách tra (slide 29):</b> CPU phát địa chỉ logic (p, d), rồi:</p>
<table>
<tr><th></th><th>TLB hit ✔ (có p trong TLB)</th><th>TLB miss ✘ (không có p)</th></tr>
<tr><td>Lấy số khung f</td><td>Lấy ngay từ TLB</td><td>Vào RAM tra <b>bảng trang</b>, rồi <b>nạp</b> cặp p → f vào TLB</td></tr>
<tr><td>Ghép f với d</td><td colspan="2">Địa chỉ vật lý = (f, d), rồi vào RAM lấy dữ liệu</td></tr>
<tr><td>Số lần vào RAM</td><td><b class="ok-t">1 lần</b></td><td><b class="bad-t">2 lần</b></td></tr>
</table>
<p>Chương trình hay dùng đi dùng lại một ít trang (vòng lặp, mảng, stack), nên phần lớn lần tra là <b>hit</b>. Vì thế dù bảng trang nằm trong RAM, máy gần như chỉ mất 1 lần vào RAM.</p>

<h4 class="sub">B③ Một dòng TLB chứa gì? (slide 30)</h4>
<table>
<tr><th>Valid</th><th>Virtual page</th><th>Modified</th><th>Protection</th><th>Page frame</th></tr>
<tr><td>1</td><td>140</td><td>1</td><td>RW</td><td>31</td></tr>
<tr><td>1</td><td>20</td><td>0</td><td>R X</td><td>38</td></tr>
<tr><td>1</td><td>130</td><td>1</td><td>RW</td><td>29</td></tr>
<tr><td>1</td><td>129</td><td>1</td><td>RW</td><td>62</td></tr>
<tr><td>1</td><td>19</td><td>0</td><td>R X</td><td>50</td></tr>
<tr><td>1</td><td>21</td><td>0</td><td>R X</td><td>45</td></tr>
<tr><td>1</td><td>860</td><td>1</td><td>RW</td><td>14</td></tr>
<tr><td>1</td><td>861</td><td>1</td><td>RW</td><td>75</td></tr>
</table>
<ul><li><b>Valid</b>: dòng này có dùng được không. <b>Virtual page → Page frame</b>: cặp trang → khung. <b>Modified</b>: trang đã bị ghi chưa. <b>Protection</b>: quyền R (đọc), W (ghi), X (thực thi).</li>
<li>Đọc bảng: trang 19, 20, 21 có quyền <b>R X</b> và Modified = 0, nên là các trang <b>code</b> (chỉ đọc và chạy, không ghi). Trang 129–130 và 860–861 có quyền <b>RW</b> và đã bị ghi, nên là <b>dữ liệu / stack</b>.</li></ul>
<div class="ex"><b>Dạng bài hay gặp</b> <span class="xs">ngoài slide</span>: TLB tra mất 20 ns, mỗi lần vào RAM 100 ns, tỉ lệ hit 80%. Thời gian truy cập trung bình = 0,8 × (20 + 100) + 0,2 × (20 + 100 + 100) = 96 + 44 = <b>140 ns</b>. Nếu không có TLB thì mất 200 ns.</div>

<div class="demo" data-demo="pt2"></div>
<div class="demo" data-demo="tlb"></div>`},
{id:"s4-9",title:"9. Lỗi trang & thay thế trang",
 figs:[["c4-32","Slide 32 – Các bước điều khiển lỗi trang"],["c4-35","Slide 35 – Thay thế trang: swap out victim, swap in trang mới"]],
 yt:"page fault handling steps operating system",
 html:`
<p><b>Lỗi trang (page fault)</b>: tham chiếu đến một trang chưa được nạp vào bộ nhớ.</p>
<ol class="steps"><li>Tham chiếu trang chưa nạp → <b>lỗi trang</b></li><li><b>Bẫy (trap)</b> đến hệ điều hành</li><li>Tạo một khung trang trống, sao lưu trang</li><li>Swap trang từ đĩa vào khung vừa được tự do</li><li>Chỉnh sửa bảng trang, thiết lập bit = <b>v</b></li><li>Khởi động lại lệnh gây ra lỗi trang</li></ol>
<div class="demo" data-demo="steps" data-key="pagefault"></div>
<p><b>Thay thế trang</b> – điều gì xảy ra nếu không có khung trang free? Tìm trang trong bộ nhớ <b>thực sự chưa cần dùng</b>, swap nó ra đĩa.</p>
<ul><li>Cần một <b>thuật toán</b>; thuật toán hiệu quả là thuật toán làm cho <b>số lần lỗi trang càng ít càng tốt</b>.</li>
<li>Cùng một trang có thể bị mang vào bộ nhớ <b>nhiều lần</b>.</li></ul>
<p><b>Các bước thay thế trang:</b> 1. Tìm vị trí trang trên đĩa → 2. Tìm khung free (có thì dùng, không có thì thay thế) → 3. Thuật toán chọn <b>khung nạn nhân (victim)</b> → 4. Mang trang vào khung free, cập nhật bảng trang → 5. Khởi động lại tiến trình.</p>
<div class="demo" data-demo="steps" data-key="replace"></div>`},
{id:"s4-10",title:"10. Các thuật toán thay thế trang",
 figs:[["c4-36","Slide 36 – Bảng tổng kết các thuật toán thay thế trang"]],
 yt:"page replacement algorithms FIFO LRU optimal example",
 html:`
<table><tr><th>Thuật toán</th><th>Ý tưởng <span class="xs">ngoài slide</span></th><th>Nhận xét (slide)</th></tr>
<tr><td><b>Optimal</b></td><td>Thay trang sẽ <b>lâu nhất mới được dùng lại</b> (nhìn tương lai)</td><td>Không cài đặt được, dùng làm <b>chuẩn so sánh</b></td></tr>
<tr><td><b>NRU</b> (Not Recently Used)</td><td>Chia trang theo bit R, M thành 4 lớp; bỏ trang ở lớp thấp nhất</td><td>Rất thô (very crude)</td></tr>
<tr><td><b>FIFO</b></td><td>Bỏ trang <b>vào sớm nhất</b></td><td>Có thể loại bỏ trang quan trọng</td></tr>
<tr><td><b>Second chance</b></td><td>FIFO nhưng trang có R = 1 được “cơ hội thứ hai” (xóa R, đưa xuống cuối)</td><td>Cải tiến lớn so với FIFO</td></tr>
<tr><td><b>Clock</b></td><td>Second chance cài bằng danh sách vòng + kim đồng hồ</td><td>Thực tế (realistic)</td></tr>
<tr><td><b>LRU</b> (Least Recently Used)</td><td>Bỏ trang <b>lâu nhất chưa được dùng</b> (nhìn quá khứ)</td><td>Rất tốt nhưng <b>khó cài đặt chính xác</b></td></tr>
<tr><td><b>NFU</b> (Not Frequently Used)</td><td>Đếm số lần được tham chiếu, bỏ trang đếm ít nhất</td><td>Xấp xỉ LRU khá thô</td></tr>
<tr><td><b>Aging</b></td><td>NFU có “lão hóa”: dịch phải bộ đếm rồi thêm bit R vào bên trái</td><td><b>Xấp xỉ LRU tốt</b>, hiệu quả</td></tr>
<tr><td><b>Working set</b></td><td>Giữ tập trang tiến trình đang dùng gần đây</td><td>Hơi tốn kém để cài đặt</td></tr>
<tr><td><b>WSClock</b></td><td>Working set + Clock</td><td>Thuật toán hiệu quả tốt</td></tr></table>
<div class="tip"><b>Hiểu nhanh Aging (và NFU)</b> <span class="xs">ngoài slide</span>: phần cứng chỉ cho mỗi trang 1 bit R (= 1 khi trang được dùng); mỗi nhịp đồng hồ HĐH đọc R rồi xóa về 0.<br>
• <b>Aging</b> = LRU “phiên bản rẻ”. Mỗi trang giữ một <b>điểm</b> (bộ đếm 8 bit). Sau mỗi nhịp đồng hồ: <b>① điểm mọi trang chia đôi</b> (nguội đi), <b>② trang vừa được dùng + 128</b> (nóng lên). Cần bỏ trang thì bỏ trang có <b>điểm thấp nhất</b> (nguội nhất = lâu không dùng nhất).<br>
• Chia đôi chính là <b>dịch phải 1 bit</b>, cộng 128 chính là <b>đưa bit R vào bit trái nhất</b>, đúng như slide mô tả. Ví dụ điểm 32 (00100000), nhịp này được dùng: 32 → 16 + 128 = <b>144</b> (10010000); không được dùng: 32 → <b>16</b>.<br>
• Vì sao chỉ là <i>xấp xỉ</i> LRU: hai trang dùng trong cùng một nhịp đều chỉ được + 128 nên không biết trang nào dùng trước; và trang không dùng quá 8 nhịp thì điểm về 0.<br>
• <b>NFU</b>: mỗi nhịp chỉ cộng R vào bộ đếm, không chia đôi, nên <b>không bao giờ quên</b>: trang dùng nhiều từ lâu vẫn có điểm cao. Aging sửa đúng chỗ này.</div>
<div class="ex"><b>Bài tập kinh điển</b> <span class="xs">ngoài slide</span> – chuỗi 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1:<br>3 khung: FIFO <b>15</b> · LRU <b>12</b> · Clock <b>14</b> (trang mới nạp có R = 1; nếu quy ước R = 0 thì 11) · Optimal <b>9</b> lỗi trang. Xem từng bước trong các video FIFO / LRU / Optimal / Clock / Aging ở trên. &nbsp;4 khung: FIFO 10 · LRU 8 · Optimal 8.<br><b>Nghịch lý Belady</b> (chỉ ở FIFO): chuỗi 1 2 3 4 1 2 5 1 2 3 4 5 → 3 khung 9 lỗi, 4 khung lại <b>10</b> lỗi.</div>
<div class="tip"><b>Mẹo làm bài:</b> FIFO bỏ trang <i>vào sớm nhất</i> · LRU bỏ trang <i>lâu nhất chưa dùng</i> (nhìn sang trái) · OPT bỏ trang <i>lâu nhất mới dùng lại</i> (nhìn sang phải, trang không bao giờ dùng lại thì bỏ trước).</div>
<div class="demo" data-demo="pagerep"></div>`},
{id:"s4-11",title:"11. Cách thực hiện phân trang trong HĐH",
 figs:[["c4-41","Slide 41 – Backing store: (a) vùng swap tĩnh, (b) sao lưu trang động"],["c4-42","Slide 42 – Tách biệt chính sách và cơ chế: external pager"]],
 yt:"operating system involvement with paging page fault handling",
 html:`
<p>Các mục 6–10 nói về <b>phần cứng</b> (MMU, TLB) và <b>thuật toán</b> chọn trang. Mục này trả lời câu hỏi còn lại: <b>hệ điều hành (phần mềm) phải tự làm những việc gì để phân trang chạy được?</b> Có 4 ý:</p>
<table>
<tr><th></th><th>Câu hỏi</th><th>Trả lời ngắn</th></tr>
<tr><td><b>A</b></td><td>HĐH ra tay vào những lúc nào?</td><td>4 thời điểm trong vòng đời tiến trình: tạo – chạy – lỗi trang – kết thúc</td></tr>
<tr><td><b>B</b></td><td>Trang nào không được phép đẩy ra?</td><td>Trang đang làm buffer cho I/O phải <b>khóa</b> lại</td></tr>
<tr><td><b>C</b></td><td>Trang bị đẩy ra đĩa thì cất ở đâu?</td><td><b>Kho sao lưu</b>: chỗ cố định (tĩnh) hoặc cấp khi cần (động)</td></tr>
<tr><td><b>D</b></td><td>Ai quyết định, ai làm?</td><td><b>Chính sách</b> đặt ngoài kernel (external pager), <b>cơ chế</b> ở trong kernel</td></tr>
</table>

<h4 class="sub">A. 4 thời điểm HĐH tham gia phân trang (slide 37)</h4>
<p>Hãy theo dõi một chương trình, ví dụ Word, từ lúc bạn mở đến lúc bạn đóng:</p>
<table>
<tr><th>Thời điểm</th><th>HĐH làm gì (slide)</th><th>Nói dễ hiểu</th></tr>
<tr><td><b>1. Khởi tạo tiến trình</b><br><small class="muted">bạn vừa mở Word</small></td><td>Xác định kích thước trang; khởi tạo bảng trang</td><td>Tính xem chương trình cần bao nhiêu trang và tạo bảng trang cho nó. Lúc đầu hầu hết các dòng là <b>X</b> vì chưa trang nào nằm trong RAM.</td></tr>
<tr><td><b>2. Tiến trình thực thi</b><br><small class="muted">mỗi lần Word được CPU cho chạy</small></td><td>MMU thiết lập lại cho tiến trình mới; <b>TLB giải phóng (flush)</b></td><td>Đặt bảng trang của Word vào MMU (PTBR trỏ sang bảng trang của Word) và <b>xóa sạch TLB</b>.</td></tr>
<tr><td><b>3. Thời điểm lỗi trang</b><br><small class="muted">Word đụng vào trang chưa có</small></td><td>Xác định địa chỉ ảo gây lỗi; thay thế trang</td><td>Tìm xem địa chỉ nào gây lỗi, chọn trang để bỏ (thuật toán mục 10), nạp trang cần vào. Chi tiết 10 bước ở bên dưới.</td></tr>
<tr><td><b>4. Tiến trình kết thúc</b><br><small class="muted">bạn đóng Word</small></td><td>Giải phóng page table, pages</td><td>Trả lại mọi khung trang Word đang giữ và xóa bảng trang của nó.</td></tr>
</table>
<div class="tip"><b>Vì sao đổi tiến trình phải xóa TLB?</b> Mỗi tiến trình có bảng trang riêng: <b>trang 5 của Chrome</b> và <b>trang 5 của Word</b> là hai trang khác nhau, nằm ở hai khung khác nhau. Nếu TLB còn giữ dòng "trang 5 → khung 12" của Chrome thì khi Word tra trang 5 sẽ trúng (hit) nhầm và <b>đọc phải dữ liệu của Chrome</b>. Vì vậy cứ đổi tiến trình là xóa sạch TLB.</div>
<div class="demo" data-demo="steps" data-key="fault10"></div>

<h4 class="sub">B. Khóa trang trong bộ nhớ (pinning)</h4>
<p>Slide: <i>đôi khi có tương tác giữa bộ nhớ ảo và I/O</i>. Tình huống cụ thể:</p>
<ol class="steps">
<li>Tiến trình <b>A</b> nhờ HĐH đọc một file vào mảng <b>buffer</b> của nó. Buffer nằm ở <b>khung 7</b>. Bộ điều khiển đĩa được dặn: đọc xong thì chép thẳng vào khung 7. A đi ngủ chờ.</li>
<li>Trong lúc chờ, tiến trình <b>B</b> chạy và gây lỗi trang. Thuật toán thay trang lại chọn đúng <b>khung 7</b> để nạp trang của B.</li>
<li>Đĩa đọc xong, dữ liệu vẫn đổ vào khung 7, <b>ghi đè lên trang của B</b>. A thì không nhận được dữ liệu ✘.</li>
</ol>
<p>Cách chữa: <b>khóa (pin)</b> trang đang làm buffer. Trang bị khóa được <b>miễn khỏi việc chọn làm trang thay thế</b> cho tới khi I/O xong.</p>
<div class="tip"><b>Ví von:</b> bạn đặt chỗ trên bàn cho cuốn sách đang được người khác mang tới. Ai dọn bàn cũng không được dọn chỗ đã đặt, kẻo sách tới không có chỗ để.</div>

<h4 class="sub">C. Kho sao lưu (backing store, slide 41)</h4>
<p>Trang bị đẩy khỏi RAM phải được cất trên đĩa, ở <b>vùng swap (swap area)</b>. Trong hình slide, trang 0, 3, 4, 6 đang ở RAM, còn trang 1, 2, 5, 7 ở đĩa. Có 2 cách tổ chức:</p>
<table>
<tr><th></th><th>(a) Phân trang đến vùng swap <b>tĩnh</b></th><th>(b) Sao lưu các trang <b>động</b></th></tr>
<tr><td>Cách làm</td><td>Mỗi trang có sẵn <b>một ô riêng, cố định</b> trên đĩa, đúng thứ tự trang (trang 0 ↔ ô 0, trang 1 ↔ ô 1…)</td><td>Trang chỉ được cấp ô trên đĩa <b>khi bị đẩy ra</b>, ô trống nào cũng được</td></tr>
<tr><td>Tìm trang trên đĩa</td><td>Dễ: ô của trang p = đầu vùng swap + p × kích thước trang</td><td>Phải tra thêm <b>disk map</b> (bản đồ: trang nào đang ở ô nào)</td></tr>
<tr><td>Ưu / nhược <span class="xs">ngoài slide</span></td><td>Đơn giản, nhưng <b>tốn chỗ đĩa</b>: giữ ô cả cho trang đang ở RAM</td><td><b>Tiết kiệm</b> chỗ đĩa, nhưng tốn công quản lý disk map</td></tr>
<tr><td>Ví von</td><td>Mỗi học sinh có <b>tủ đồ riêng</b> đánh số sẵn</td><td><b>Gửi đồ ở quầy</b>, nhận vé ghi số kệ</td></tr>
</table>

<h4 class="sub">D. Tách biệt chính sách và cơ chế (slide 42)</h4>
<table>
<tr><th></th><th>Là gì</th><th>Ví dụ trong phân trang</th><th>Đặt ở đâu</th></tr>
<tr><td><b>Chính sách</b> (policy)</td><td><b>Quyết định</b> cái gì</td><td>Chọn trang nào để bỏ, nạp trang nào</td><td><b>External pager</b>, chạy ở <b>user space</b></td></tr>
<tr><td><b>Cơ chế</b> (mechanism)</td><td><b>Làm</b> thế nào</td><td>Bắt lỗi trang, sửa bảng trang, ánh xạ trang vào MMU</td><td><b>Kernel</b>: fault handler, MMU handler</td></tr>
</table>
<div class="tip"><b>Ví von:</b> ban quản lý chung cư (external pager) quyết định cho ai vào. Bảo vệ (kernel) chỉ mở hay khóa cửa đúng theo lệnh. Đổi quy định thì chỉ cần đổi ban quản lý, không phải thay bảo vệ. Ở đây cũng vậy: muốn đổi thuật toán chọn trang thì sửa external pager, không phải sửa kernel.</div>
<p><b>6 bước điều khiển lỗi trang với external pager:</b></p>
<ol class="steps">
<li><b>Page fault</b>: tiến trình người dùng đụng vào trang chưa có, nhảy vào kernel.</li>
<li><b>Needed page</b>: fault handler (trong kernel) không tự quyết, mà báo cho external pager biết đang cần trang nào.</li>
<li><b>Request page</b>: external pager yêu cầu đọc trang đó từ đĩa.</li>
<li><b>Page arrives</b>: trang về tới external pager.</li>
<li><b>Here is page</b>: external pager đưa trang cho fault handler.</li>
<li><b>Map page in</b>: fault handler bảo MMU handler ánh xạ trang vào bảng trang. Tiến trình chạy tiếp.</li>
</ol>
<p>→ Người <b>quyết định</b> là external pager (ngoài kernel), người <b>làm</b> là kernel. Cái giá <span class="xs">ngoài slide</span>: mỗi lỗi trang phải qua lại giữa user space và kernel nhiều lần hơn, nên chậm hơn một chút.</p>`},
{id:"s4-12",title:"12. Phân đoạn (Segmentation)",
 figs:[["c4-44","Slide 44 – Không gian 1 chiều: symbol table đụng vào source text"],["c4-45","Slide 45 – Mỗi segment tăng/co độc lập"],["c4-46","Slide 46 – So sánh phân trang và phân đoạn"],["c4-47","Slide 47 – Checkerboarding và nén (compaction)"]],
 yt:"segmentation vs paging operating system checkerboarding",
 html:`
<p><b>Vấn đề:</b> trong không gian địa chỉ <b>một chiều</b>, các bảng của trình biên dịch (symbol table, source text, constant table, parse tree, call stack) cùng phát triển → <b>một bảng có thể chạm đến bảng khác</b> (symbol table đụng source text) dù chỗ khác còn trống.</p>
<p><b>Phân đoạn</b>: mỗi bảng là một <b>segment</b> – một không gian địa chỉ độc lập (0 → kích thước riêng), <b>tăng lên hoặc co lại độc lập</b>. Địa chỉ = (số segment, offset).</p>
<table><tr><th>Tiêu chí</th><th>Phân trang</th><th>Phân đoạn</th></tr>
<tr><td>Lập trình viên cần biết kỹ thuật này?</td><td>Không</td><td>Có</td></tr>
<tr><td>Số không gian địa chỉ tuyến tính</td><td>1</td><td>Nhiều</td></tr>
<tr><td>Tổng không gian vượt bộ nhớ vật lý?</td><td>Có</td><td>Có</td></tr>
<tr><td>Thủ tục & dữ liệu tách và bảo vệ riêng?</td><td>Không</td><td>Có</td></tr>
<tr><td>Dễ chứa bảng có kích thước thay đổi?</td><td>Không</td><td>Có</td></tr>
<tr><td>Dễ chia sẻ thủ tục giữa người dùng?</td><td>Không</td><td>Có</td></tr>
<tr><td>Mục đích ra đời</td><td>Có không gian tuyến tính lớn mà <b>không phải mua thêm RAM</b></td><td>Chia chương trình & dữ liệu thành các không gian <b>logic độc lập</b>, hỗ trợ <b>chia sẻ và bảo vệ</b></td></tr></table>
<p><b>Thực hiện phân đoạn thuần túy:</b> (a)–(d) các segment kích thước khác nhau vào/ra để lại các lỗ trống xen kẽ → <b>checkerboarding</b> (thực chất là phân mảnh ngoài). (e) Loại bỏ bằng cách <b>nén (compaction)</b>: hole 3K + 4K + 3K gom thành một vùng trống <b>10K</b>.</p>`},
{id:"s4-13",title:"13. Phân đoạn kết hợp phân trang: Pentium",
 figs:[["c4-48","Slide 48 – Selector + Offset → Segmentation → Linear → Paging → Physical"],["c4-49","Slide 49 – Pentium selector"],["c4-50","Slide 50 – Chọn LDT hoặc GDT theo bit selector"],["c4-51","Slide 51 – Bộ mô tả đoạn code (descriptor)"],["c4-54","Slide 54 – Ánh xạ địa chỉ tuyến tính thành địa chỉ vật lý"],["c4-56","Slide 56 – 4 mức bảo vệ trên Pentium"]],
 yt:"intel pentium segmentation paging GDT LDT selector descriptor",
 html:`
<p><b>Mục này không có gì quá mới:</b> Pentium chỉ ghép <b>phân đoạn (mục 12)</b> và <b>bảng trang 2 mức (mục 8)</b> nối tiếp nhau. Địa chỉ đi qua <b>2 chặng</b>:</p>
<div class="flow"><span>(Selector, Offset)</span><i>→</i><span>Chặng 1: phân đoạn</span><i>→</i><span>Địa chỉ tuyến tính 32 bit</span><i>→</i><span>Chặng 2: phân trang</span><i>→</i><span>Địa chỉ vật lý</span></div>
<table>
<tr><th></th><th>Đầu vào</th><th>Tra bảng nào</th><th>Đầu ra</th></tr>
<tr><td><b>Chặng 1</b><br><small class="muted">phân đoạn</small></td><td>(selector, offset)</td><td>GDT hoặc LDT → lấy <b>descriptor</b> của đoạn</td><td><b>Base + Offset</b> = địa chỉ tuyến tính</td></tr>
<tr><td><b>Chặng 2</b><br><small class="muted">phân trang = mục 8</small></td><td>Địa chỉ tuyến tính</td><td>Page directory → page table (tách 10 · 10 · 12)</td><td>Khung × 4096 + offset = địa chỉ vật lý</td></tr>
</table>
<div class="tip"><b>Ví von – tìm phòng trong khu ký túc xá:</b> bạn được hẹn ở <b>"Tòa B, phòng 305"</b>.<br>
<b>Chặng 1:</b> mở sổ danh bạ khu (GDT/LDT), dòng "Tòa B" ghi: <i>tòa này bắt đầu từ ô số 4000 của khu, có 500 phòng</i>. 305 &lt; 500 nên hợp lệ → vị trí trong khu là 4000 + 305 = <b>4305</b> (đây là địa chỉ tuyến tính).<br>
<b>Chặng 2:</b> số 4305 chỉ là số trên bản vẽ. Muốn biết <b>thật sự</b> nó nằm ở đâu, tra tiếp 2 cuốn sổ như bảng trang 2 mức ở mục 8 → ra vị trí thật trong RAM.</div>

<h4 class="sub">Vì sao phải ghép cả hai? <span class="xs">giải thích thêm</span></h4>
<table>
<tr><th></th><th>Được gì</th><th>Mất gì</th></tr>
<tr><td>Chỉ phân đoạn (mục 12)</td><td>Chia code / data / stack riêng, bảo vệ và chia sẻ theo từng đoạn</td><td>Mỗi đoạn phải nằm <b>liền một khối</b> trong RAM → <b>checkerboarding</b>, phải nén</td></tr>
<tr><td>Chỉ phân trang</td><td>Không phân mảnh ngoài, chương trình lớn hơn RAM vẫn chạy</td><td>Chỉ có 1 không gian, không phân biệt code hay data</td></tr>
<tr><td><b>Ghép (Pentium)</b></td><td colspan="2">Giữ được cái lợi của phân đoạn, rồi <b>cắt mỗi đoạn thành trang</b> → đoạn không cần nằm liền trong RAM nữa → <b>hết checkerboarding</b>.</td></tr>
</table>

<h4 class="sub">Chặng 1a. Selector: "tấm thẻ" chỉ ra đoạn nào (slide 49)</h4>
<p>Chương trình không ghi thẳng "đoạn data bắt đầu ở đâu". Nó chỉ đưa một con số 16 bit gọi là <b>selector</b>, gồm 3 phần:</p>
<div class="addr"><div style="flex:6">Index<small>13 bit</small></div><div style="flex:2">TI<small>1 bit: 0 = GDT / 1 = LDT</small></div><div style="flex:2.5">RPL<small>2 bit: mức 0–3</small></div></div>
<table>
<tr><th>Phần</th><th>Nghĩa là</th><th>Ví von</th></tr>
<tr><td><b>Index</b> (13 bit)</td><td>Số thứ tự dòng trong bảng mô tả. 13 bit → mỗi bảng tối đa 2<sup>13</sup> = <b>8192</b> dòng</td><td>Số dòng trong sổ danh bạ</td></tr>
<tr><td><b>TI</b> (1 bit)</td><td>Tra bảng nào: <b>0 → GDT</b>, <b>1 → LDT</b></td><td>Sổ chung của cả khu hay sổ riêng của phòng bạn</td></tr>
<tr><td><b>RPL</b> (2 bit)</td><td>Mức đặc quyền của bên yêu cầu (0–3)</td><td>Thẻ ra vào: bạn là khách hay ban quản lý</td></tr>
</table>
<p><b>2 bảng mô tả (slide 50):</b></p>
<ul><li><b>GDT</b> (Global Descriptor Table): <b>một bảng chung</b> cho cả hệ thống, mô tả các đoạn của HĐH. Vị trí bảng lưu ở thanh ghi <b>GDTR</b>.</li>
<li><b>LDT</b> (Local Descriptor Table): <b>mỗi chương trình một bảng riêng</b>, mô tả code, data, stack của chương trình đó. Vị trí bảng lưu ở thanh ghi <b>LDTR</b>.</li></ul>
<div class="ex"><b>Ví dụ:</b> selector = <b>0x000F</b> = <code>0000000000001 · 1 · 11</code> → Index = <b>1</b>, TI = <b>1</b> (tra LDT), RPL = <b>3</b> (chương trình người dùng).<br>
→ "Lấy dòng số 1 trong LDT của chương trình này".<br>
<small class="muted">Mẹo tính nhanh: Index = selector ÷ 8, TI = (selector ÷ 4) mod 2, RPL = selector mod 4.</small></div>

<h4 class="sub">Chặng 1b. Descriptor: dòng trong bảng, cho biết đoạn nằm đâu (slide 51)</h4>
<p>Mỗi dòng của GDT/LDT là một <b>descriptor 8 byte</b> mô tả một đoạn. Hai thứ quan trọng nhất: <b>Base</b> (đoạn bắt đầu ở đâu) và <b>Limit</b> (đoạn dài bao nhiêu).</p>
<table><tr><th>Trường</th><th>Ý nghĩa (slide)</th><th>Nói dễ hiểu</th></tr>
<tr><td><b>Base</b> 0–15, 16–23, 24–31</td><td>Địa chỉ cơ sở <b>32 bit</b> của segment</td><td>Đoạn bắt đầu từ đâu. Bị chia 3 mảnh trong 8 byte, ghép lại được 32 bit</td></tr>
<tr><td><b>Limit</b> 0–15, 16–19</td><td>Giới hạn <b>20 bit</b></td><td>Đoạn dài bao nhiêu. Offset vượt quá là lỗi</td></tr>
<tr><td>G</td><td>0: Limit tính theo <b>byte</b>; 1: tính theo <b>trang</b></td><td>20 bit chỉ đếm tới 1 MB; tính theo trang 4 KB thì đoạn dài tới 4 GB</td></tr>
<tr><td>D</td><td>0: segment <b>16 bit</b>; 1: segment <b>32 bit</b></td><td>Code kiểu cũ hay kiểu mới</td></tr>
<tr><td>P</td><td>0: segment <b>không có</b> trong bộ nhớ; 1: có</td><td>Giống bit present của bảng trang, nhưng cho cả đoạn</td></tr>
<tr><td>DPL</td><td>Privilege level (0–3)</td><td>Muốn vào đoạn này phải có quyền tới mức nào</td></tr>
<tr><td>S</td><td>0: System; 1: Application</td><td>Đoạn của hệ thống hay của ứng dụng</td></tr>
<tr><td>Type</td><td>Loại segment và bảo vệ</td><td>Code hay data, chỉ đọc hay được ghi…</td></tr></table>

<h4 class="sub">Chặng 1c. Base + Offset = địa chỉ tuyến tính (slide 53)</h4>
<div class="formula">Kiểm tra: <b>Offset ≤ Limit</b> (sai → lỗi, dừng)<br><b>Địa chỉ tuyến tính = Base + Offset</b> &nbsp;(32 bit, không gian 0 → 4 GB)</div>
<div class="ex"><b>Ví dụ (tiếp):</b> dòng 1 của LDT ghi Base = <b>0x00400000</b>, Limit = 0xFFFF (G = 0 → 64 KB), P = 1. Chương trình đưa offset = <b>0x3004</b>.<br>
0x3004 ≤ 0xFFFF ✔ → địa chỉ tuyến tính = 0x00400000 + 0x3004 = <b>0x00403004</b>.</div>
<div class="tip">Đến đây <b>đã xong phần phân đoạn</b>. Chặng 1 giống hệt thanh ghi base/limit ở mục 3, chỉ khác là mỗi đoạn có base/limit riêng, lấy từ bảng.</div>

<h4 class="sub">Chặng 2. Địa chỉ tuyến tính → địa chỉ vật lý (slide 54)</h4>
<p>Đây <b>chính là bảng trang 2 mức của mục 8</b>, chia 10 · 10 · 12. Slide chỉ đổi tên: PT1 gọi là <b>Dir</b>, PT2 gọi là <b>Page</b>.</p>
<div class="addr"><div style="flex:10">Dir<small>10 bit → dòng trong page directory</small></div><div style="flex:10">Page<small>10 bit → dòng trong page table</small></div><div style="flex:12">Offset<small>12 bit → vị trí trong trang 4 KB</small></div></div>
<ol class="steps">
<li><b>Dir</b> chọn 1 trong <b>1024</b> dòng của <b>page directory</b>. Dòng đó trỏ tới một <b>page table</b>.</li>
<li><b>Page</b> chọn 1 dòng trong page table đó. Dòng đó cho số <b>khung trang (page frame)</b>.</li>
<li><b>Offset</b> chọn đúng byte (word) trong khung: địa chỉ vật lý = khung × 4096 + offset.</li>
</ol>
<div class="ex"><b>Ví dụ (tiếp):</b> 0x00403004 = <code>0000000001 · 0000000011 · 000000000100</code> → Dir = <b>1</b>, Page = <b>3</b>, Offset = <b>4</b> (đúng ví dụ ở mục 8).<br>
Dòng 1 của page directory → page table A. Dòng 3 của page table A ghi <b>khung 7</b> → địa chỉ vật lý = 7 × 4096 + 4 = <b>28676</b> (0x7004).</div>

<p><b>Cả ví dụ đi một mạch:</b></p>
<table>
<tr><th>Bước</th><th>Có</th><th>Làm</th><th>Được</th></tr>
<tr><td>1</td><td>selector 0x000F</td><td>Tách 13 · 1 · 2</td><td>Index 1, TI 1 (LDT), RPL 3</td></tr>
<tr><td>2</td><td>LDT dòng 1</td><td>Đọc descriptor</td><td>Base 0x00400000, Limit 0xFFFF</td></tr>
<tr><td>3</td><td>offset 0x3004</td><td>Kiểm tra ≤ Limit, cộng Base</td><td>Tuyến tính 0x00403004</td></tr>
<tr><td>4</td><td>0x00403004</td><td>Tách 10 · 10 · 12</td><td>Dir 1, Page 3, Offset 4</td></tr>
<tr><td>5</td><td>Dir 1 → page table, dòng 3</td><td>Tra 2 bảng</td><td>Khung 7</td></tr>
<tr><td>6</td><td>khung 7, offset 4</td><td>7 × 4096 + 4</td><td><b>Vật lý 28676</b></td></tr>
</table>
<div class="demo" data-demo="pent"></div>
<div class="demo" data-demo="steps" data-key="pentium"></div>

<h4 class="sub">4 mức bảo vệ trên Pentium (slide 56)</h4>
<p>Các mức xếp thành <b>vòng tròn lồng nhau</b>. <b>Số càng nhỏ càng ở trong, quyền càng cao.</b></p>
<table><tr><th>Mức</th><th>Dùng cho</th><th>Ví von: ngân hàng</th></tr>
<tr><td><b>0</b> (trong cùng, quyền cao nhất)</td><td>Kernel</td><td>Két sắt</td></tr>
<tr><td><b>1</b></td><td>System calls</td><td>Quầy giao dịch</td></tr>
<tr><td><b>2</b></td><td>Shared libraries</td><td>Phòng dịch vụ chung</td></tr>
<tr><td><b>3</b> (ngoài cùng)</td><td>User programs</td><td>Sảnh khách</td></tr></table>
<p>Cách dùng <span class="xs">giải thích thêm</span>: chương trình người dùng chạy ở mức 3. Nó <b>không được</b> đụng thẳng vào đoạn có DPL thấp hơn (ví dụ dữ liệu kernel, DPL = 0); làm vậy sẽ bị chặn và báo lỗi bảo vệ. Muốn nhờ kernel thì phải đi qua <b>system call</b>, giống khách phải ra quầy chứ không được tự vào két.</p>
<div class="tip"><b>Mẹo nhớ các con số:</b> selector 16 = <b>13 + 1 + 2</b> · 2<sup>13</sup> = <b>8192</b> dòng mỗi bảng · descriptor <b>8 byte</b>, Base <b>32</b> bit, Limit <b>20</b> bit · tuyến tính <b>32</b> bit = <b>10 + 10 + 12</b> · <b>4</b> mức bảo vệ, <b>0 = kernel</b>.</div>
`},
{id:"s4-14",title:"✔ Ghi nhớ nhanh Chương 4",
 figs:[], yt:"",
 html:`
<ul class="checklist">
<li>Logical (CPU sinh ra, = virtual) vs Physical (RAM thấy). MMU ánh xạ động.</li>
<li>Base = địa chỉ vật lý nhỏ nhất; Limit = phạm vi; hợp lệ khi logic &lt; limit; vật lý = base + logic.</li>
<li>Phân mảnh ngoài: trống đủ nhưng rời rạc. Phân mảnh nội: cấp nhiều hơn cần. Paging chỉ có phân mảnh nội.</li>
<li>First-fit (đầu tiên) · Next-fit (từ con trỏ) · Best-fit (nhỏ nhất đủ) · Worst-fit (lớn nhất) – Best & Worst duyệt hết danh sách.</li>
<li>Trang (logic) = khung (vật lý), 512 B – 8 KB. Địa chỉ = p (m−n bit) | d (n bit).</li>
<li>PTE: Caching disabled, Referenced, Modified, Protection, Present/absent, Page frame number.</li>
<li>PTBR trỏ bảng trang, PRLR = kích thước; 2 lần truy cập bộ nhớ → TLB (associative memory).</li>
<li>Bảng trang 2 mức 10/10/12; mỗi bảng mức 2 quản lý 4 MB.</li>
<li>Lỗi trang 6 bước; thay thế trang 5 bước; điều khiển lỗi trang 10 bước.</li>
<li>Optimal = benchmark; LRU tốt nhưng khó cài; Aging xấp xỉ LRU tốt; FIFO có nghịch lý Belady.</li>
<li>4 thời điểm HĐH tham gia phân trang: khởi tạo – thực thi (flush TLB) – lỗi trang – kết thúc.</li>
<li>Khóa trang buffer I/O; backing store tĩnh/động; external pager tách chính sách–cơ chế.</li>
<li>Segmentation: nhiều không gian, tăng/co độc lập, checkerboarding → nén.</li>
<li>Pentium: selector 13+1+2 bit, GDT/LDT, descriptor Base 32 / Limit 20, linear 10/10/12, 4 mức bảo vệ (0 = kernel).</li>
</ul>`}
]});
