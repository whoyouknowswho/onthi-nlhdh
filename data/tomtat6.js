/* Tổng hợp kiến thức – Chương 6: Hệ thống File (đầy đủ theo slide 1 → 50) */
window.SUMMARY = window.SUMMARY || [];
window.STEPS = window.STEPS || {};

window.STEPS.lookup = {title:"Tìm đường dẫn /usr/ast/mbox trong UNIX V7 (slide 50)", fig:"c6-50", steps:[
 {t:"1. Đọc thư mục gốc", d:"Thư mục gốc có vị trí cố định. Tìm tên <b>usr</b> → i-node <b>6</b>."},
 {t:"2. Đọc i-node 6", d:"i-node 6 (mode, size, times…) cho biết nội dung thư mục <b>/usr</b> nằm ở <b>block 132</b>."},
 {t:"3. Đọc block 132", d:"Trong thư mục /usr (. = 6, .. = 1, dick 19, erik 30, jim 51, <b>ast 26</b>, bal 45) → /usr/ast là i-node <b>26</b>."},
 {t:"4. Đọc i-node 26", d:"i-node 26 cho biết thư mục <b>/usr/ast</b> nằm ở <b>block 406</b>."},
 {t:"5. Đọc block 406", d:"Trong /usr/ast (. = 26, .. = 6, grants 64, books 92, <b>mbox 60</b>, minix 81, src 17) → <b>/usr/ast/mbox là i-node 60</b>."},
 {t:"6. Đọc i-node 60", d:"Từ i-node 60 lấy được các địa chỉ block dữ liệu → đọc nội dung file."}
]};
window.STEPS.fat = {title:"Đọc file bằng bảng FAT (slide 27–29)", fig:"c6-29", steps:[
 {t:"1. Entry thư mục", d:"Entry của File A cho biết <b>block bắt đầu = 4</b>."},
 {t:"2. FAT[4] = 7", d:"Block kế tiếp của File A là 7 – tra trong bảng FAT nằm <b>trong RAM</b> nên rất nhanh."},
 {t:"3. FAT[7] = 2", d:"Tiếp theo là block 2."},
 {t:"4. FAT[2] = 10 → FAT[10] = 12", d:"Tiếp tục lần theo chuỗi."},
 {t:"5. FAT[12] = −1", d:"−1 = hết file. File A gồm các block <b>4 → 7 → 2 → 10 → 12</b>. (File B: 6 → 3 → 11 → 14.)"}
]};
window.STEPS.shared = {title:"File chia sẻ qua i-node (slide 37)", fig:"c6-37", steps:[
 {t:"(a) Trước khi liên kết", d:"Thư mục của C trỏ tới i-node của file: <b>Owner = C, Count = 1</b>."},
 {t:"(b) Sau khi liên kết được tạo", d:"B tạo link: cả thư mục B và C cùng trỏ tới <b>một i-node</b> → <b>Count = 2</b>."},
 {t:"(c) Sau khi chủ sở hữu xóa file", d:"C xóa entry của mình → <b>Count = 1</b>. i-node vẫn còn (B vẫn dùng được) nhưng <b>Owner vẫn ghi là C</b>."}
]};

window.SUMMARY.push({
ch:6, title:"Hệ thống File", en:"File Systems",
intro:"Nội dung: <b>6.1 File · 6.2 Thư mục · 6.3 Thực hiện hệ thống file · 6.4 Ví dụ các hệ thống file</b> (CD-ROM, MS-DOS, Windows 98, UNIX V7). Câu hỏi xuyên suốt: người dùng thấy <b>file & thư mục</b> thế nào và HĐH <b>lưu chúng lên các block đĩa</b> ra sao.",
sections:[
{id:"s6-1",title:"1. Khái niệm File & hệ thống File",
 figs:[["c6-04","Slide 4 – Trừu tượng của HĐH ↔ tài nguyên phần cứng"],["c6-05","Slide 5 – file system → operating system → physical disk"]],
 yt:"what is a file system operating system",
 html:`
<p><b>Cần lưu trữ thông tin lâu dài</b> vì:</p>
<ul><li>Phải lưu được <b>lượng dữ liệu lớn</b>.</li>
<li>Thông tin phải <b>tồn tại</b> ít nhất cho đến khi tiến trình sử dụng nó kết thúc (thực tế lâu hơn nữa).</li>
<li><b>Nhiều tiến trình</b> có thể cùng truy cập.</li></ul>
<ul><li><b>File</b>: dùng lưu thông tin trên đĩa hay phương tiện khác; tiến trình có thể đọc và ghi nếu cần.</li>
<li><b>Hệ thống File</b>: một phần của HĐH liên quan đến files; gồm <b>2 phần độc lập</b>: <b>tập các file</b> và <b>cấu trúc thư mục</b> (tổ chức, cung cấp thông tin về tất cả các file).</li></ul>
<table><tr><th>User nhìn thấy</th><th>HĐH ánh xạ sang tài nguyên phần cứng</th></tr>
<tr><td>Process / Thread</td><td>CPU</td></tr><tr><td>Address Space</td><td>Memory</td></tr><tr><td>Files</td><td>Disk</td></tr></table>
<p>Slide 5: người dùng thấy cây thư mục (file system) → HĐH quản lý bằng i-node (operating system) → dữ liệu nằm trên các block đĩa (physical disk).</p>`},
{id:"s6-2",title:"2. Đặt tên, cấu trúc & kiểu File",
 figs:[["c6-06","Slide 6 – Các loại phần mở rộng file"],["c6-07","Slide 7 – Ba loại cấu trúc file"],["c6-09","Slide 9 – (a) file thực thi, (b) file lưu trữ"]],
 yt:"file structure byte sequence record sequence tree executable file format",
 html:`
<table><tr><th>Phần mở rộng</th><th>Ý nghĩa</th><th>Phần mở rộng</th><th>Ý nghĩa</th></tr>
<tr><td>file.bak</td><td>Backup file</td><td>file.mpg</td><td>Phim MPEG</td></tr>
<tr><td>file.c</td><td>Mã nguồn C</td><td>file.o</td><td>Object file (output trình biên dịch, chưa liên kết)</td></tr>
<tr><td>file.gif</td><td>Ảnh Compuserve GIF</td><td>file.pdf</td><td>Portable Document Format</td></tr>
<tr><td>file.hlp</td><td>Help file</td><td>file.ps</td><td>PostScript</td></tr>
<tr><td>file.html</td><td>Tài liệu Web HTML</td><td>file.tex</td><td>Input cho chương trình định dạng TEX</td></tr>
<tr><td>file.jpg</td><td>Ảnh tĩnh chuẩn JPEG</td><td>file.txt</td><td>File văn bản</td></tr>
<tr><td>file.mp3</td><td>Nhạc MPEG layer 3</td><td>file.zip</td><td>File nén</td></tr></table>
<p><b>Ba loại cấu trúc file:</b> (a) <b>byte sequence</b> – chuỗi byte (UNIX, Windows: HĐH không quan tâm nội dung <span class="xs">ngoài slide</span>); (b) <b>record sequence</b> – chuỗi bản ghi kích thước cố định; (c) <b>tree</b> – cây các bản ghi sắp theo khóa (Ant, Fox, Pig → Cat, Cow, Dog…).</p>
<p><b>Kiểu file:</b> người dùng thấy file là <b>không gian địa chỉ logic liên tục</b>. Các kiểu:</p>
<ul><li><b>Data</b>: numeric, character, binary.</li><li><b>Program</b>: source, object, executable.</li><li><b>Regular</b> và <b>special</b> (character, block – đại diện cho thiết bị).</li></ul>
<table><tr><th>(a) File thực thi (executable)</th><th>(b) File lưu trữ (archive)</th></tr>
<tr><td><b>Header</b>: Magic number · Text size · Data size · BSS size · Symbol table size · Entry point · Flags; sau đó: <b>Text · Data · Relocation bits · Symbol table</b></td><td>Nhiều cặp <b>Header + Object module</b>; mỗi header: Module name · Date · Owner · Protection · Size</td></tr></table>`},
{id:"s6-3",title:"3. Truy cập, thuộc tính & thao tác File",
 figs:[["c6-11","Slide 11 – Bảng thuộc tính file"],["c6-13","Slide 13 – Memory-mapped files"]],
 yt:"file attributes file operations sequential vs random access",
 html:`
<table><tr><th>Truy cập tuần tự (Sequential)</th><th>Truy cập ngẫu nhiên (Random)</th></tr>
<tr><td>Đọc tuần tự bytes/records từ vị trí bắt đầu; <b>không nhảy</b> đến vị trí bất kỳ, có thể quay về đầu hoặc về cuối; <b>phù hợp băng từ</b></td><td>Đọc <b>bất kỳ</b> bytes/records; <b>phù hợp CSDL</b>; seek đến vị trí đánh dấu rồi read, hoặc read rồi chuyển đến vị trí đánh dấu</td></tr></table>
<p><b>Thuộc tính file (file attributes):</b></p>
<table><tr><th>Thuộc tính</th><th>Ý nghĩa</th><th>Thuộc tính</th><th>Ý nghĩa</th></tr>
<tr><td>Protection</td><td>Ai được truy cập, theo cách nào</td><td>Temporary flag</td><td>0 bình thường; <b>1 xóa khi tiến trình kết thúc</b></td></tr>
<tr><td>Password</td><td>Mật khẩu để truy cập file</td><td>Lock flags</td><td>0 không khóa; khác 0 bị khóa</td></tr>
<tr><td>Creator</td><td>ID người tạo file</td><td>Record length</td><td>Số byte một bản ghi</td></tr>
<tr><td>Owner</td><td>Chủ sở hữu hiện tại</td><td>Key position</td><td>Vị trí khóa trong bản ghi</td></tr>
<tr><td>Read-only flag</td><td>0 đọc/ghi; 1 chỉ đọc</td><td>Key length</td><td>Số byte trường khóa</td></tr>
<tr><td>Hidden flag</td><td>1 = không hiện trong danh sách</td><td>Creation time</td><td>Thời điểm tạo</td></tr>
<tr><td>System flag</td><td>1 = file hệ thống</td><td>Time of last access</td><td>Lần truy cập cuối</td></tr>
<tr><td>Archive flag</td><td>0 đã sao lưu; <b>1 cần sao lưu</b></td><td>Time of last change</td><td>Lần thay đổi cuối</td></tr>
<tr><td>ASCII/binary flag</td><td>0 ASCII; 1 binary</td><td>Current size</td><td>Số byte hiện tại</td></tr>
<tr><td>Random access flag</td><td>0 chỉ tuần tự; 1 ngẫu nhiên</td><td>Maximum size</td><td>Số byte tối đa có thể tăng tới</td></tr></table>
<p><b>11 thao tác file:</b> 1. Create · 2. Delete · 3. Open · 4. Close · 5. Read · 6. Write · 7. Append (ghi thêm vào cuối) · 8. Seek (định vị) · 9. Get attributes · 10. Set attributes · 11. Rename.</p>
<p><b>Memory-Mapped Files:</b> (a) tiến trình có các đoạn Program text, Data trước khi ánh xạ; (b) sau khi ánh xạ: file <b>abc</b> trở thành một đoạn trong không gian địa chỉ, và tạo đoạn mới cho file <b>xyz</b> → đọc/ghi file như truy cập bộ nhớ.</p>`},
{id:"s6-4",title:"4. Thư mục & đường dẫn",
 figs:[["c6-14","Slide 14 – Thư mục một mức"],["c6-15","Slide 15 – Thư mục hai mức"],["c6-16","Slide 16 – Hệ thống phân cấp thư mục"],["c6-17","Slide 17 – Cây thư mục UNIX"]],
 yt:"single level two level hierarchical directory structure absolute relative path",
 html:`
<table><tr><th>Hệ thống thư mục</th><th>Đặc điểm</th></tr>
<tr><td><b>Một mức</b></td><td>Root chứa tất cả file. Ví dụ: <b>4 file</b> của <b>3 người dùng A, B, C</b> → dễ trùng tên</td></tr>
<tr><td><b>Hai mức</b></td><td>Mỗi người dùng một thư mục (user directory); chữ cái chỉ <b>chủ sở hữu</b> thư mục và file</td></tr>
<tr><td><b>Phân cấp (cây)</b></td><td>Người dùng tạo <b>thư mục con</b> (user subdirectories) lồng nhau tùy ý → linh hoạt nhất</td></tr></table>
<p><b>Đường dẫn (Path names)</b> – cây thư mục UNIX: root (/) có bin, etc, lib, usr, tmp; /usr có ast, jim, lib; /usr/lib có dict.</p>
<ul><li><b>Tuyệt đối</b>: bắt đầu từ gốc “/”, vd <b>/usr/jim</b>.</li>
<li><b>Tương đối</b> <span class="xs">ngoài slide</span>: tính từ thư mục làm việc hiện hành; “.” là thư mục hiện tại, “..” là thư mục cha (vd đang ở /usr/jim thì ../lib/dict = /usr/lib/dict).</li></ul>
<p><b>8 thao tác thư mục:</b> 1. Create · 2. Delete · 3. Opendir · 4. Closedir · 5. Readdir · 6. Rename · 7. Link · 8. Unlink.</p>
<div class="tip"><b>Đừng nhầm:</b> Seek / Append / Get–Set attributes là thao tác <b>file</b>; Opendir / Closedir / Readdir / Link / Unlink là thao tác <b>thư mục</b>. Create, Delete, Rename có ở cả hai.</div>`},
{id:"s6-5",title:"5. Cấu trúc hệ thống file trên đĩa",
 figs:[["c6-20","Slide 20 – Cấu trúc hệ thống file system"]],
 yt:"file system layout MBR partition table superblock inode",
 html:`
<div class="addr"><div style="flex:1.2">MBR<small>+ partition table</small></div><div style="flex:2">Partition 1</div><div style="flex:2">Partition 2</div><div style="flex:1.5">Partition…</div></div>
<p>Toàn bộ đĩa: <b>MBR</b> (Master Boot Record) ở đầu, cuối MBR là <b>partition table</b>; sau đó là các <b>disk partition</b>. Mỗi partition gồm:</p>
<div class="flow"><span>Boot block</span><i>→</i><span>Super block</span><i>→</i><span>Free space mgmt</span><i>→</i><span>I-nodes</span><i>→</i><span>Root dir</span><i>→</i><span>Files and directories</span></div>`},
{id:"s6-6",title:"6. Cấp phát liên tục (Contiguous)",
 figs:[["c6-22","Slide 22 – (a) 7 file liên tục, (b) sau khi xóa D và E"],["c6-24","Slide 24 – Bảng thư mục: start & length"]],
 yt:"contiguous allocation file system",
 html:`
<p>Phương pháp cấp phát = các block trên đĩa được cấp cho file như thế nào: <b>liên tục · liên kết · chỉ mục</b>.</p>
<ul><li>Mỗi file được cấp một tập các block <b>liên tục nhau</b> trên đĩa.</li>
<li>Quản lý đơn giản – chỉ cần <b>block xuất phát</b> và <b>số block</b>.</li>
<li>Hỗ trợ <b>truy cập ngẫu nhiên</b>.</li>
<li><b>Lãng phí không gian</b> (dynamic storage-allocation problem → phân mảnh ngoài).</li>
<li>Kích thước file <b>không thể tăng lên</b>.</li>
<li>Dùng cho <b>CD-ROM</b> vì chiều dài file xác định trước và không bị xóa.</li></ul>
<div class="ex"><b>Slide 22:</b> 7 file A(4), B(3), C(6), D(5), E(12), F(6), G(3) = 39 block nằm liền nhau; xóa file để lại các vùng trống rời rạc (5 free blocks, 6 free blocks).<br><b>Slide 24:</b> count (start 0, length 2), tr (14, 3), mail (19, 6 → block 19–24), list (28, 4), f (6, 2).</div>`},
{id:"s6-7",title:"7. Cấp phát liên kết (Linked) & FAT",
 figs:[["c6-26","Slide 26 – File jeep: 9 → 16 → 1 → 10 → 25"],["c6-27","Slide 27 – FAT: test 217 → 618 → 339"],["c6-28","Slide 28 – File A, B là danh sách liên kết block"],["c6-29","Slide 29 – Bảng FAT trong RAM"]],
 yt:"linked allocation FAT file allocation table explained",
 html:`
<ul><li>Mỗi file là một <b>danh sách liên kết</b> các block; các block có thể nằm <b>rải rác</b> khắp đĩa (mỗi block dành chỗ cho <b>pointer</b> tới block sau).</li>
<li>Quản lý đơn giản – chỉ cần <b>địa chỉ bắt đầu</b>.</li>
<li>Quản lý không gian trống – <b>không lãng phí</b> (không phân mảnh ngoài), file tăng kích thước được.</li>
<li><b>Không truy cập ngẫu nhiên</b> – muốn tới block k phải đi qua k − 1 block trước.</li></ul>
<div class="ex"><b>Slide 26:</b> thư mục ghi jeep: start <b>9</b>, end <b>25</b>; chuỗi 9 → 16 → 1 → 10 → 25 (block 25 chứa −1).<br><b>Slide 28:</b> File A: block vật lý 4, 7, 2, 10, 12; File B: 6, 3, 11, 14 (block cuối có con trỏ 0).</div>
<p><b>FAT (File Allocation Table)</b> = cấp phát liên kết nhưng gom tất cả con trỏ vào <b>một bảng trong RAM</b>: entry thư mục chỉ lưu <b>start block</b>; FAT[i] = số block tiếp theo; −1 = hết file.</p>
<ul><li>Ưu: block dữ liệu chứa trọn dữ liệu; lần chuỗi diễn ra trong RAM nên truy cập ngẫu nhiên nhanh hơn nhiều.</li>
<li>Nhược: <b>toàn bộ bảng phải nằm trong RAM</b> – đĩa càng lớn bảng càng lớn. <span class="xs">ngoài slide</span></li></ul>
<div class="demo" data-demo="steps" data-key="fat"></div>`},
{id:"s6-8",title:"8. Cấp phát chỉ mục (Indexed) & i-node",
 figs:[["c6-30","Slide 30 – Index table"],["c6-31","Slide 31 – jeep: index block 19"],["c6-32","Slide 32 – Ví dụ i-node"],["c6-33","Slide 33 – Lược đồ kết nối UNIX (4 KB/block)"],["c6-49","Slide 49 – UNIX i-node với block gián tiếp 1, 2, 3 mức"]],
 yt:"indexed allocation inode direct indirect blocks unix",
 html:`
<ul><li>Tất cả con trỏ được gom vào <b>index block</b> – cách nhìn logic.</li>
<li>Cần <b>bảng chỉ mục (index table)</b>.</li>
<li>Hỗ trợ <b>truy cập ngẫu nhiên</b>.</li>
<li>Truy cập động mà <b>không phân mảnh ngoài</b>, nhưng tốn <b>overhead</b> của index block.</li></ul>
<div class="ex"><b>Slide 31:</b> thư mục ghi jeep → index block <b>19</b>; block 19 chứa 9, 16, 1, 10, 25, −1, −1, −1 (block logic thứ 3 = block vật lý 1 – đọc thẳng, không cần lần chuỗi).</div>
<p><b>i-node</b> (index-node): mỗi file có 1 i-node chứa <b>thuộc tính</b> và <b>địa chỉ các block</b>.</p>
<ul><li>Ví dụ slide 32: File attributes + <b>8 địa chỉ trực tiếp</b> (disk block 0–7) + <b>address of block of pointers</b> (block chứa thêm địa chỉ).</li>
<li>UNIX (4 KB/block): <b>mode, owners (2), timestamps (3), size, block count</b>, <b>direct blocks</b>, <b>single indirect</b>, <b>double indirect</b>, <b>triple indirect</b>.</li>
<li>File nhỏ chỉ dùng địa chỉ trực tiếp; file lớn dùng thêm block gián tiếp → hỗ trợ file rất lớn mà i-node vẫn nhỏ, cố định.</li>
<li>Chỉ i-node của file <b>đang mở</b> mới cần nằm trong RAM (khác FAT phải nạp cả bảng). <span class="xs">ngoài slide</span></li></ul>
<table><tr><th></th><th>Liên tục</th><th>Liên kết</th><th>FAT</th><th>Chỉ mục / i-node</th></tr>
<tr><td>Cần lưu</td><td>Block đầu + số block</td><td>Block đầu</td><td>Block đầu + bảng FAT</td><td>Index block / i-node</td></tr>
<tr><td>Truy cập ngẫu nhiên</td><td>✔</td><td>✘</td><td>✔ (lần trong RAM)</td><td>✔</td></tr>
<tr><td>Phân mảnh ngoài</td><td>Có</td><td>Không</td><td>Không</td><td>Không</td></tr>
<tr><td>File tăng kích thước</td><td>✘</td><td>✔</td><td>✔</td><td>✔</td></tr>
<tr><td>Dùng ở</td><td>CD-ROM</td><td>—</td><td>MS-DOS, Windows 98</td><td>UNIX</td></tr></table>`},
{id:"s6-9",title:"9. Thực hiện thư mục & file chia sẻ",
 figs:[["c6-34","Slide 34 – (a) thuộc tính trong entry, (b) entry trỏ tới i-node"],["c6-35","Slide 35 – Tên file dài: (a) in-line, (b) in a heap"],["c6-36","Slide 36 – Hệ thống file chứa file chia sẻ"],["c6-37","Slide 37 – Count trong i-node khi liên kết và xóa"]],
 yt:"directory implementation hard link inode link count shared files",
 html:`
<table><tr><th>Thực hiện thư mục</th><th>Mô tả</th></tr>
<tr><td>(a) <b>Thư mục đơn</b></td><td>Các entry <b>kích thước cố định</b>; <b>địa chỉ đĩa và các thuộc tính nằm trong entry</b> thư mục (games | attributes…) – kiểu MS-DOS</td></tr>
<tr><td>(b) <b>Entry trỏ tới i-node</b></td><td>Entry chỉ có tên; thuộc tính nằm trong cấu trúc dữ liệu riêng (i-node) – kiểu UNIX</td></tr></table>
<p><b>Hai cách quản lý tên file dài:</b> (a) <b>In-line</b> – mỗi entry có độ dài thay đổi (File entry length + attributes + tên, kết thúc bằng ký tự đặc biệt); (b) <b>In a heap</b> – entry kích thước cố định chứa <b>con trỏ</b> tới tên nằm trong vùng heap ở cuối thư mục.</p>
<p><b>File chia sẻ:</b> một file xuất hiện trong nhiều thư mục (của B và C) → cấu trúc thư mục không còn là cây mà thành <b>đồ thị có hướng không chu trình (DAG)</b> <span class="xs">ngoài slide</span>.</p>
<div class="demo" data-demo="steps" data-key="shared"></div>`},
{id:"s6-10",title:"10. Quản lý không gian đĩa",
 figs:[["c6-38","Slide 38 – Tốc độ dữ liệu và hiệu quả không gian theo kích thước block"],["c6-39","Slide 39 – (a) danh sách liên kết free, (b) bit map"]],
 yt:"disk block size free space management bitmap linked list",
 html:`
<p><b>Kích thước block</b> (giả sử mọi file 2 KB):</p>
<ul><li><b>Nét liền</b> = <b>tốc độ dữ liệu</b> của đĩa → tăng khi block lớn hơn (mỗi lần đọc được nhiều).</li>
<li><b>Nét đứt</b> = <b>hiệu quả sử dụng không gian</b> → gần 100% đến 2K, sau đó giảm mạnh (block lớn hơn file thì phần dư bỏ phí).</li>
<li>⇒ Tốc độ và hiệu quả không gian <b>mâu thuẫn</b> → phải chọn kích thước block thỏa hiệp.</li></ul>
<p><b>Theo dõi block trống:</b></p>
<table><tr><th>(a) Danh sách liên kết free</th><th>(b) Bit map</th></tr>
<tr><td>Các block đĩa chứa số hiệu các block trống, nối thành danh sách. <b>1 block 1 KB chứa được 256 số hiệu block 32 bit</b> (1024 / 4).</td><td>Mỗi block đĩa ứng với 1 bit (trống / đã dùng) → kích thước cố định, gọn khi đĩa gần đầy hay trống đều được.</td></tr></table>`},
{id:"s6-11",title:"11. Ví dụ: CD-ROM & MS-DOS",
 figs:[["c6-41","Slide 41 – Rãnh xoắn ốc của CD-ROM"],["c6-42","Slide 42 – Entry thư mục ISO 9660"],["c6-43","Slide 43 – Entry thư mục MS-DOS"],["c6-44","Slide 44 – Kích thước phân vùng tối đa theo block size"]],
 yt:"ISO 9660 CD-ROM file system FAT12 FAT16 FAT32 directory entry",
 html:`
<p><b>CD-ROM:</b> dữ liệu nằm trên <b>một rãnh xoắn ốc (spiral groove)</b> liên tục, gồm các <b>pit</b> và <b>land</b>; dữ liệu người dùng chia thành <b>block 2K</b>.</p>
<p><b>Entry thư mục ISO 9660</b> (byte): Directory entry length (1) · Extended attribute record length (1) · <b>Location of file (8)</b> · <b>File size (8)</b> · <b>Date and time (7)</b> · Flags (1) · Interleave (2) · CD # (4) · L (1) · File name (4–15: Base name . Ext ; Ver) · padding · Sys.</p>
<p><b>Entry thư mục MS-DOS = 32 byte:</b></p>
<div class="addr small"><div style="flex:8">File name<small>8</small></div><div style="flex:3">Ext<small>3</small></div><div style="flex:1.4">Attr<small>1</small></div><div style="flex:10">Reserved<small>10</small></div><div style="flex:2">Time<small>2</small></div><div style="flex:2">Date<small>2</small></div><div style="flex:2.4">First block<small>2</small></div><div style="flex:4">Size<small>4</small></div></div>
<table><tr><th>Block size</th><th>FAT-12</th><th>FAT-16</th><th>FAT-32</th></tr>
<tr><td>0,5 KB</td><td>2 MB</td><td>—</td><td>—</td></tr><tr><td>1 KB</td><td>4 MB</td><td>—</td><td>—</td></tr>
<tr><td>2 KB</td><td>8 MB</td><td>128 MB</td><td>—</td></tr><tr><td>4 KB</td><td>16 MB</td><td>256 MB</td><td>1 TB</td></tr>
<tr><td>8 KB</td><td>—</td><td>512 MB</td><td>2 TB</td></tr><tr><td>16 KB</td><td>—</td><td>1024 MB</td><td>2 TB</td></tr>
<tr><td>32 KB</td><td>—</td><td>2048 MB</td><td>2 TB</td></tr></table>
<div class="tip">Ô trống (—) là <b>tổ hợp không được phép</b>. Mẹo tính FAT-12: 2<sup>12</sup> = 4096 block × kích thước block (4 KB → 16 MB). FAT-16: 2<sup>16</sup> × block (2 KB → 128 MB).</div>`},
{id:"s6-12",title:"12. Ví dụ: Windows 98 & UNIX V7",
 figs:[["c6-45","Slide 45 – Entry MS-DOS mở rộng trong Windows 98"],["c6-46","Slide 46 – Entry tên file dài"],["c6-47","Slide 47 – Ví dụ lưu tên dài THEQUI~1"],["c6-48","Slide 48 – Entry thư mục UNIX V7"],["c6-50","Slide 50 – Tìm /usr/ast/mbox"]],
 yt:"windows 98 long file name VFAT directory entry unix v7 inode lookup",
 html:`
<p><b>Windows 98 – entry MS-DOS mở rộng</b> (32 byte): Base name (8) · Ext (3) · Attributes (1) · <b>NT</b> (1) · <b>Sec</b> (1) · <b>Creation date/time</b> (4) · <b>Last access</b> (2) · <b>Upper 16 bits of starting block</b> (2) · Last write date/time (4) · <b>Lower 16 bits of starting block</b> (2) · File size (4). → Số block bắt đầu đủ <b>32 bit</b> cho FAT-32.</p>
<p><b>Entry tên file dài</b> (32 byte): Sequence (1) · <b>5 ký tự</b> (10) · Attributes (1) · 0 (1) · <b>Checksum</b> (1) · <b>6 ký tự</b> (12) · 0 (2) · <b>2 ký tự</b> (4) ⇒ <b>13 ký tự</b> Unicode mỗi entry.</p>
<div class="ex"><b>Slide 47:</b> “The quick brown fox jumps over the lazy dog” được lưu bằng 4 entry tên dài (đánh số 1, 2, 3 và entry cuối có cờ – số 68) nằm <b>phía trên</b> entry MS-DOS chứa tên ngắn <b>THEQUI~1</b>; checksum (CK) liên kết các entry với tên ngắn.</div>
<p><b>UNIX V7 – entry thư mục = 16 byte:</b> <b>I-node number (2 byte)</b> + <b>File name (14 byte)</b>. Mọi thuộc tính và địa chỉ block nằm trong i-node.</p>
<div class="demo" data-demo="steps" data-key="lookup"></div>`},
{id:"s6-13",title:"✔ Ghi nhớ nhanh Chương 6",
 figs:[], yt:"",
 html:`
<ul class="checklist">
<li>Lưu trữ lâu dài vì: dữ liệu lớn, tồn tại lâu, nhiều tiến trình cùng truy cập. File system = tập file + cấu trúc thư mục.</li>
<li>Cấu trúc: byte sequence / record sequence / tree. Kiểu: Data (numeric, character, binary), Program (source, object, executable), regular/special.</li>
<li>Executable: header (magic number…) + text + data + relocation bits + symbol table. Archive: header + object module.</li>
<li>Tuần tự – băng từ; ngẫu nhiên – CSDL (seek). Archive flag 1 = cần sao lưu; Temporary 1 = xóa khi tiến trình kết thúc.</li>
<li>11 thao tác file; 8 thao tác thư mục (Opendir, Closedir, Readdir, Link, Unlink…).</li>
<li>Thư mục: một mức (4 file, 3 user) → hai mức → phân cấp. Đường dẫn tuyệt đối / tương đối.</li>
<li>Partition: Boot block → Super block → Free space mgmt → I-nodes → Root dir → Files & dirs.</li>
<li>Liên tục (start + length, ngẫu nhiên, phân mảnh, không tăng, CD-ROM) · Liên kết (start, không ngẫu nhiên) · FAT (bảng trong RAM) · Chỉ mục/i-node (index block, overhead).</li>
<li>i-node UNIX: direct + single/double/triple indirect.</li>
<li>Thư mục: thuộc tính trong entry (MS-DOS) vs trỏ i-node (UNIX); tên dài in-line / heap; link count.</li>
<li>Block size: nét liền tốc độ, nét đứt hiệu quả không gian. Free: linked list (1 KB chứa 256 số) / bitmap.</li>
<li>ISO 9660; MS-DOS 32 byte; Windows 98 13 ký tự/entry, checksum, THEQUI~1; UNIX V7 2 + 14 byte; /usr/ast/mbox → i-node 6 → 132 → 26 → 406 → 60.</li>
</ul>`}
]});
