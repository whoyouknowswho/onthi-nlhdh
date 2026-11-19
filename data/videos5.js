/* Video hoạt hình tự dựng – Chương 5 (khung hình 960 × 540) */
(function(){
var VH=window.VH, b=VH.b, t=VH.t, a=VH.a, d=VH.d, u=VH.u, x=VH.x, f=VH.f, clr=VH.clr, H=VH.H;
var V = window.VIDEOS;

V["s5-1"] = function(){
 var rates=[["Bàn phím","10 B/s",1],["Chuột","100 B/s",2],["Máy in laser","100 KB/s",5],["USB","1,5 MB/s",6.18],["Gigabit Ethernet","125 MB/s",8.1],["PCI bus","528 MB/s",8.72],["Sun Gigaplane XB","20 GB/s",10.3]];
 return {title:"Hai nhóm thiết bị Vào/Ra & tốc độ của chúng", scenes:[
 {s:"Thiết bị Vào/Ra chia thành <b>hai nhóm chính</b>: thiết bị <b>Block</b> và thiết bị <b>Character</b>.",
  d:[H("Thiết bị Block vs thiết bị Character"), b("bk",60,90,400,330,"","brand"), t("bkt",260,120,"THIẾT BỊ BLOCK (đĩa)",{fs:19,c:"brand"}), b("ch",500,90,400,330,"","warn"), t("cht",700,120,"THIẾT BỊ CHARACTER",{fs:19,c:"warn"})]},
 {s:"Thiết bị <b>Block</b> – điển hình là <b>đĩa</b> – lưu dữ liệu thành từng khối có địa chỉ. Lệnh: <b>read, write, seek</b>. Có thể nhảy thẳng tới khối bất kỳ.",
  d:[[0,1,2,3,4,5,6,7].map(function(i){ return b("blk"+i,90+(i%4)*88,160+Math.floor(i/4)*80,80,70,"khối "+i,"gray",{fs:14}); }), t("bc",260,345,"read · write · seek",{fs:20,c:"ok"}), d("sk",130,190,{t:"▲",c:"ok"}), u("sk",{x:394,y:324}), f("blk7")]},
 {s:"Còn thiết bị <b>Character</b> – bàn phím, chuột, cổng nối tiếp – gửi/nhận một <b>dòng ký tự</b> liên tục, không có địa chỉ. Lệnh: <b>get, put</b>.",
  d:[["H","E","L","L","O"].map(function(c,i){ return d("ch"+i,560+i*64,230,{t:c,r:24,c:"warn"}); }), a("str",540,290,880,290,{c:"warn",t:"dòng ký tự →"}), t("cc",700,345,"get · put",{fs:20,c:"ok"})]},
 {s:"Đĩa còn có thể truy cập qua hệ thống file hoặc ánh xạ bộ nhớ (memory-mapped). Thiết bị character có thư viện lớp trên hỗ trợ <b>soạn sửa dòng</b>.",
  d:[t("n1",260,395,"raw I/O · file system · memory-mapped",{fs:15,c:"gray"}), t("n2",700,395,"thư viện cho phép sửa dòng (line editing)",{fs:15,c:"gray"})]},
 {s:"Tốc độ các thiết bị chênh nhau khủng khiếp: từ <b>bàn phím 10 byte/giây</b>…",
  d:[clr(), H("Tốc độ truyền dữ liệu (thang logarit)"), rates.map(function(r,i){ return [t("rn"+i,210,100+i*60,r[0],{a:"end",fs:16}), b("rb"+i,225,82+i*60,r[2]*68,38,r[1],i<2?"ok":i<5?"warn":"bad",{fs:14,r:6,o:i===0?1:0})]; })]},
 {s:"…qua máy in, USB, mạng Gigabit… đến <b>Sun Gigaplane XB 20 GB/giây</b> – nhanh hơn bàn phím khoảng <b>2 tỉ lần</b>. Phần mềm Vào/Ra phải xử lý được mọi tốc độ đó.",
  d:[[1,2,3,4,5,6].map(function(i){ return u("rb"+i,{o:1}); }), f("rb6")]}
]};};

V["s5-2"] = function(){
 var ctl=[["vc","Video\ncontroller","Monitor"],["kc","Keyboard\ncontroller","Keyboard"],["fc","Floppy\ncontroller","Ổ mềm"],["hc","Hard disk\ncontroller","Ổ cứng"]];
 return {title:"Bộ điều khiển thiết bị, cổng Vào/Ra & bus", scenes:[
 {s:"Một PC đơn giản: CPU và bộ nhớ nối vào một <b>bus</b> chung.",
  d:[H("Các thành phần của một PC đơn giản"), b("bus",30,330,900,18,"","gray",{r:9}), t("bl",905,370,"Bus",{fs:15,c:"gray",a:"end"}), b("cpu",40,230,120,80,"CPU","brand"), b("mem",185,230,120,80,"Memory","brand",{fs:16})]},
 {s:"Mỗi thiết bị không nối thẳng vào bus mà qua một <b>bộ điều khiển (controller)</b> riêng: video, bàn phím, ổ mềm, ổ cứng.",
  d:[ctl.map(function(c,i){ return [b(c[0],335+i*150,225,135,90,c[1],"violet",{fs:14}), b(c[0]+"d",335+i*150,80,135,70,c[2],"cyan",{fs:15}), a(c[0]+"l",402+i*150,152,402+i*150,222,{c:"cyan",noHead:1})]; })]},
 {s:"Thiết bị Vào/Ra gồm 2 phần: phần <b>cơ điện tử</b> (đĩa quay, đầu đọc…) và phần <b>điện tử</b> – chính là <b>controller</b>. Một controller có thể điều khiển <b>nhiều</b> thiết bị.",
  d:[f("hc","hcd"), t("ex",640,410,"Ổ cứng = cơ điện tử (đĩa, đầu đọc) + điện tử (controller)",{fs:17,c:"warn"})]},
 {s:"Việc của controller đĩa: ① chuyển <b>luồng bit</b> đọc từ đĩa thành <b>khối byte</b>, ② <b>sửa lỗi</b> nếu cần, ③ chuyển dữ liệu vào <b>bộ nhớ chính</b>.",
  d:[clr(), H("Controller đĩa làm gì?"), b("bits",40,200,220,90,"0110100111010…","gray",{fs:16,s:"luồng bit"}), a("c1",262,245,325,245), b("byt",330,200,200,90,"Khối byte","brand",{s:"① gom thành byte"}), a("c2",532,245,595,245), b("ecc",600,200,150,90,"Sửa lỗi","warn",{s:"② ECC"}), a("c3",752,245,805,245), b("ram",810,200,120,90,"RAM","ok",{s:"③ chuyển vào"})]},
 {s:"CPU nói chuyện với controller qua các <b>cổng Vào/Ra (I/O port)</b> – thực chất là các <b>thanh ghi</b> của controller, mỗi cái có một địa chỉ.",
  d:[clr(), H("Cổng Vào/Ra = thanh ghi của controller"), b("ctl",320,110,320,280,"","violet"), t("ctlt",480,135,"Controller",{fs:18,c:"violet"}), b("r1",350,170,260,50,"Thanh ghi dữ liệu","gray",{fs:15}), b("r2",350,240,260,50,"Thanh ghi trạng thái","gray",{fs:15}), b("r3",350,310,260,50,"Thanh ghi điều khiển","gray",{fs:15}), b("cpu",40,220,160,90,"CPU","brand"), a("cr",202,265,345,265,{t:"đọc / ghi"})]},
 {s:"Ví dụ cổng trên PC: 000–00F là DMA controller, 020–021 là interrupt controller, 040–043 timer, 378–37F cổng song song, 3F8–3FF cổng nối tiếp chính (COM1).",
  d:[b("tb",680,110,260,300,"000–00F  DMA\n020–021  ngắt\n040–043  timer\n320–32F  ổ cứng\n378–37F  song song\n3D0–3DF  đồ họa\n3F8–3FF  COM1","dark",{fs:15})]},
 {s:"Trên PC thật có nhiều bus: <b>PCI bus</b> là bus chính (đồ họa, SCSI, IDE…), <b>expansion bus</b> cho bàn phím, cổng song song, nối tiếp; <b>SCSI bus</b> nối các đĩa SCSI.",
  d:[clr(), H("Cấu trúc bus trên PC"), b("pr",380,60,200,60,"Processor","brand",{fs:16}), b("br",380,140,200,60,"Bridge/memory\ncontroller","violet",{fs:14}), b("me",640,140,140,60,"Memory","brand",{fs:15}), b("pci",40,240,880,20,"","warn",{r:10}), t("pcil",160,232,"PCI bus",{fs:15,c:"warn"}), b("gc",60,300,170,60,"Graphics","cyan",{fs:15}), b("sc",260,300,170,60,"SCSI ctrl","cyan",{fs:15}), b("ide",460,300,170,60,"IDE ctrl","cyan",{fs:15}), b("exi",660,300,240,60,"Expansion bus\ninterface","cyan",{fs:14}), b("exb",600,400,330,18,"","ok",{r:9}), t("exl",765,445,"Expansion bus: keyboard · parallel · serial",{fs:14,c:"ok"}), a("j1",480,202,480,236,{noHead:1}), a("j2",780,362,780,398,{noHead:1,c:"ok"})]}
]};};

V["s5-3"] = function(){ return {title:"Địa chỉ Vào/Ra: tách riêng, ánh xạ bộ nhớ, lai", scenes:[
 {s:"Cách (a) – <b>tách riêng</b>: có 2 không gian địa chỉ. Bộ nhớ một bên, các cổng I/O một bên. CPU phải dùng lệnh đặc biệt <b>IN / OUT</b> để truy cập cổng.",
  d:[H("(a) Không gian I/O và bộ nhớ tách riêng"), b("m",250,90,180,360,"Bộ nhớ\n0 → 0xFFFF…","brand"), b("p",520,330,180,120,"Cổng I/O","warn"), t("in",610,300,"lệnh IN / OUT",{fs:17,c:"warn"})]},
 {s:"Cách (b) – <b>memory-mapped I/O</b>: chỉ có <b>1 không gian</b>. Thanh ghi thiết bị chiếm một vùng địa chỉ bộ nhớ, CPU đọc/ghi nó bằng <b>lệnh truy cập bộ nhớ bình thường</b>.",
  d:[clr(), H("(b) Memory-mapped I/O"), b("m",390,140,180,310,"Bộ nhớ","brand"), b("p",390,90,180,50,"Thanh ghi thiết bị","warn",{fs:14}), t("mv",760,115,"← lệnh MOV bình thường",{fs:17,c:"warn"})]},
 {s:"Cách (c) – <b>lai (hybrid)</b>: vừa có vùng ánh xạ vào bộ nhớ (ví dụ video RAM), vừa có các cổng I/O riêng.",
  d:[clr(), H("(c) Hybrid"), b("m",250,140,180,310,"Bộ nhớ","brand"), b("p",250,90,180,50,"Buffer thiết bị","warn",{fs:14}), b("q",520,330,180,120,"Cổng I/O","warn")]},
 {s:"Kiến trúc <b>một bus</b>: mọi địa chỉ – cả bộ nhớ lẫn I/O – đều đi chung một bus.",
  d:[clr(), H("Single-bus vs Dual-bus"), b("c1",60,120,120,80,"CPU","brand"), b("m1",210,120,120,80,"Memory","gray",{fs:15}), b("i1",360,120,120,80,"I/O","warn"), b("bs",50,240,440,16,"","gray",{r:8}), a("x1",120,202,120,236,{noHead:1}), a("x2",270,202,270,236,{noHead:1}), a("x3",420,202,420,236,{noHead:1}), t("l1",270,300,"(a) mọi địa chỉ đi chung 1 bus",{fs:15}), d("pk",120,248,{t:"addr",r:20,fs:10}), u("pk",{x:420})]},
 {s:"Kiến trúc <b>bus kép</b>: CPU đọc/ghi bộ nhớ qua một <b>bus băng thông cao riêng</b>; bộ nhớ có thêm cổng ra bus chung để thiết bị I/O truy cập.",
  d:[b("c2",540,120,120,80,"CPU","brand"), b("m2",700,120,120,80,"Memory","gray",{fs:15}), b("i2",840,120,90,80,"I/O","warn"), b("hb",660,145,40,30,"","ok",{r:4}), b("bs2",530,240,410,16,"","gray",{r:8}), a("y1",600,202,600,236,{noHead:1}), a("y2",760,202,760,236,{noHead:1}), a("y3",885,202,885,236,{noHead:1}), t("l2",735,300,"(b) bus nhanh riêng CPU ↔ Memory",{fs:15,c:"ok"}), f("hb")]}
]};};

V["s5-4"] = function(){ return {title:"3 cách truyền dữ liệu: Programmed I/O – Ngắt – DMA", scenes:[
 {s:"Cùng một việc: gửi 4 ký tự <b>A B C D</b> ra máy in. Có 3 cách làm, khác nhau ở chỗ CPU phải bận bao nhiêu.",
  d:[H("3 phương pháp truyền dữ liệu"), b("l1",30,90,190,110,"Programmed I/O","brand",{fs:17}), b("l2",30,220,190,110,"Interrupt-driven","warn",{fs:17}), b("l3",30,350,190,110,"DMA","ok",{fs:19})]},
 {s:"<b>Programmed I/O</b>: CPU tự gửi từng ký tự, và giữa các ký tự nó <b>lặp liên tục hỏi</b> “máy in sẵn sàng chưa?” – gọi là <b>chờ bận (busy-wait)</b>. CPU bị chiếm 100%.",
  d:[b("cp1",250,105,420,80,"CPU: sẵn sàng chưa? … chưa … chưa … rồi! → gửi A","bad",{fs:15}), b("n1",700,105,230,80,"CPU bận: 100%","bad",{fs:17,s:"ready / busy / error"})]},
 {s:"<b>Interrupt-driven I/O</b>: gửi 1 ký tự rồi CPU đi chạy tiến trình khác. Máy in in xong thì <b>ngắt</b> CPU để nhận ký tự kế tiếp. Không chờ bận, nhưng <b>mỗi ký tự 1 ngắt</b>.",
  d:[b("cp2",250,235,420,80,"CPU chạy tiến trình khác ✔ … ⚡ngắt … ⚡ngắt …","warn",{fs:15}), b("n2",700,235,230,80,"Số ngắt: 4","warn",{fs:18,s:"1 ngắt / 1 ký tự"})]},
 {s:"<b>DMA</b>: CPU giao việc cho <b>bộ điều khiển DMA</b>, DMA tự chép cả khối dữ liệu. Chỉ có <b>1 ngắt</b> khi xong toàn bộ – tốt nhất cho dữ liệu lớn.",
  d:[b("cp3",250,365,420,80,"CPU làm việc khác ✔ … DMA tự chép ABCD … ⚡","ok",{fs:15}), b("n3",700,365,230,80,"Số ngắt: 1","ok",{fs:18,s:"1 ngắt / cả khối"})]},
 {s:"Ngắt xảy ra thế nào? ① Thiết bị (đĩa, bàn phím, đồng hồ, máy in) làm xong việc, gửi tín hiệu tới <b>bộ điều khiển ngắt</b> qua <b>đường ngắt trên bus</b>.",
  d:[clr(), H("Ngắt xảy ra như thế nào?"), b("cpu",60,170,160,220,"CPU","brand"), b("ic",380,170,170,220,"Interrupt\ncontroller","violet",{fs:16}), b("dv1",720,90,180,60,"Đĩa","gray",{fs:15}), b("dv2",720,170,180,60,"Bàn phím","gray",{fs:15}), b("dv3",720,250,180,60,"Đồng hồ","gray",{fs:15}), b("dv4",720,330,180,60,"Máy in","gray",{fs:15}), a("i1",715,120,555,220,{c:"warn",t:"① xong việc"}), u("dv1",{c:"warn"})]},
 {s:"② Bộ điều khiển ngắt <b>phát tín hiệu ngắt</b> tới CPU, kèm số hiệu cho CPU biết thiết bị nào.",
  d:[a("i2",375,320,225,320,{c:"bad",t:"② phát ngắt"}), f("cpu")]},
 {s:"③ CPU <b>báo nhận (ack)</b>, tạm dừng việc đang làm và chạy thủ tục phục vụ ngắt. Trên PC có 2 chip PIC: IRQ0 timer, IRQ1 bàn phím, IRQ2 nối tầng PIC #2, IRQ4 COM1, IRQ14 ổ cứng…",
  d:[a("i3",225,230,375,230,{c:"ok",t:"③ CPU ack"}), t("irq",480,460,"IRQ0 timer · IRQ1 keyboard · IRQ2 cascade · IRQ3 COM2 · IRQ4 COM1 · IRQ6 floppy · IRQ8 RTC · IRQ14 EIDE",{fs:14,c:"gray"})]},
 {s:"DMA chi tiết. ① CPU <b>lập trình DMA controller</b>: nạp thanh ghi <b>Address</b> (địa chỉ RAM), <b>Count</b> (số byte), <b>Control</b> (hướng truyền), rồi đi làm việc khác.",
  d:[clr(), H("Quá trình vận hành của DMA"), b("cpu",30,110,140,110,"CPU","brand"), b("dma",230,90,190,170,"","violet"), t("dmt",325,110,"DMA controller",{fs:15,c:"violet"}), b("ad",245,130,160,34,"Address = X","gray",{fs:14}), b("ct",245,170,160,34,"Count = 4","gray",{fs:14}), b("co",245,210,160,34,"Control: đọc","gray",{fs:14}), b("dc",490,90,190,170,"Disk controller","cyan",{fs:15}), b("buf",515,170,140,60,"Buffer","gray",{fs:14}), b("mm",760,90,170,170,"Main\nmemory","ok",{fs:16}), b("bus",20,350,920,16,"","gray",{r:8}), a("q1",172,135,240,135,{c:"brand",t:"①"})]},
 {s:"② DMA controller yêu cầu disk controller chuyển dữ liệu vào bộ nhớ, tại địa chỉ X.",
  d:[a("q2",325,262,585,262,{c:"violet",t:"② yêu cầu truyền",cv:60})]},
 {s:"③ Disk controller ghi dữ liệu <b>thẳng vào RAM</b> qua bus – CPU không phải chép từng byte.",
  d:[d("by",585,200,{t:"A",c:"warn"}), u("by",{x:845,y:228}), a("q3",660,200,755,200,{c:"ok",t:"③ dữ liệu"})]},
 {s:"④ Disk controller gửi <b>ack</b> cho DMA. DMA tăng Address, giảm Count, rồi lặp lại cho tới khi <b>Count = 0</b>.",
  d:[a("q4",640,262,330,262,{c:"warn",t:"④ ack",cv:-170}), u("ct",{t:"Count = 3 … 0"}), f("ct")]},
 {s:"⑤ Xong cả khối, DMA <b>ngắt CPU đúng một lần</b> để báo hoàn tất.",
  d:[a("q5",230,205,175,205,{c:"bad",t:"⑤ ngắt",ly:30}), u("ct",{t:"Count = 0",c:"ok"}), f("cpu")]}
]};};

V["s5-5"] = function(){ return {title:"6 mục đích của phần mềm Vào/Ra", scenes:[
 {s:"Phần mềm Vào/Ra được thiết kế để đạt <b>6 mục đích</b>. Thứ nhất: <b>độc lập thiết bị</b> – cùng một chương trình đọc được file trên ổ mềm, ổ cứng hay CD-ROM mà không phải sửa.",
  d:[H("Mục đích của phần mềm Vào/Ra"), b("g1",40,90,280,170,"① Độc lập thiết bị","brand",{s:"đĩa mềm / cứng / CD: dùng như nhau"})]},
 {s:"Thứ hai: <b>đặt tên chung</b> – tên file hay thiết bị chỉ là một chuỗi hoặc số nguyên, không phụ thuộc phần cứng. Thứ ba: <b>xử lý lỗi càng gần phần cứng càng tốt</b> – controller tự sửa được thì không cần báo lên trên.",
  d:[b("g2",340,90,280,170,"② Đặt tên chung","violet",{s:"tên = string / integer"}), b("g3",640,90,280,170,"③ Xử lý lỗi","bad",{s:"càng gần phần cứng càng tốt"})]},
 {s:"Thứ tư: hỗ trợ truyền <b>đồng bộ</b> (chặn chờ – dễ lập trình) và <b>không đồng bộ</b> (theo ngắt – cách phần cứng thật sự làm việc).",
  d:[b("g4",40,290,280,170,"④ Đồng bộ / không","warn",{s:"blocked vs interrupt-driven"})]},
 {s:"Thứ năm: <b>định bộ đệm</b> – dữ liệu tới thiết bị thường không ghi ngay lên thiết bị được, phải giữ tạm. Thứ sáu: phân biệt thiết bị <b>chia sẻ</b> được (đĩa) và <b>dùng riêng</b> (ổ băng từ).",
  d:[b("g5",340,290,280,170,"⑤ Định bộ đệm","cyan",{s:"giữ tạm dữ liệu"}), b("g6",640,290,280,170,"⑥ Chia sẻ / dùng riêng","ok",{s:"đĩa chia sẻ · băng từ dùng riêng"}), t("mn",480,505,"Mẹo nhớ: Độc – Tên – Lỗi – Đồng bộ – Đệm – Chia sẻ",{fs:18,c:"warn"})]}
]};};

V["s5-6"] = function(){
 var L="ABCDEFGH".split("");
 return {title:"In chuỗi “ABCDEFGH”: Programmed I/O, Ngắt, DMA", scenes:[
 {s:"Tiến trình người dùng muốn in chuỗi <b>ABCDEFGH</b>. Chuỗi đang nằm trong <b>user space</b>.",
  d:[H("Programmed I/O: in từng ký tự"), b("us",40,70,560,170,"","none",{dash:1}), t("usl",60,90,"User space",{fs:14,c:"gray",a:"start"}), b("ks",40,250,560,170,"","none",{dash:1}), t("ksl",60,270,"Kernel space",{fs:14,c:"gray",a:"start"}), b("str",200,130,240,60,"ABCDEFGH","brand",{fs:22}), b("pr",720,150,200,220,"","gray"), t("prl",820,395,"Máy in",{fs:15,c:"gray"}), t("pp",820,200,"",{fs:28,c:"ok"})]},
 {s:"<code>copy_from_user(buffer, p, count)</code>: HĐH chép chuỗi vào buffer <b>p</b> trong kernel.",
  d:[u("str",{y:310,c:"violet"}), t("cp",320,240,"copy_from_user",{fs:15,c:"violet"})]},
 {s:"Với mỗi ký tự: <code>while (*printer_status_reg != READY);</code> – CPU <b>đứng chờ</b> tới khi máy in sẵn sàng…",
  d:[b("cpu",660,440,280,60,"CPU: chờ… chờ… chờ…","bad",{fs:15}), f("cpu")]},
 {s:"…rồi <code>*printer_data_register = p[i]</code>: ghi ký tự ra máy in. ‘A’ được in.",
  d:[d("ch",320,340,{t:"A",r:20}), u("ch",{x:820,y:260}), u("pp",{t:"A"})]},
 {s:"Lặp lại cho B, C, D… Suốt thời gian in, CPU <b>không làm được việc gì khác</b>. In xong mới <code>return_to_user()</code>.",
  d:[u("pp",{t:"ABCD…"}), u("ch",{t:"B"}), f("cpu")]},
 {s:"<b>Interrupt-driven</b>: ghi ký tự đầu tiên rồi gọi <code>scheduler()</code> – CPU chạy tiến trình khác. Mỗi khi máy in xong một ký tự, nó gây <b>ngắt</b>; thủ tục phục vụ ngắt gửi ký tự tiếp theo, hết chuỗi thì <code>unblock_user()</code>.",
  d:[clr(), H("Interrupt-driven I/O"), b("c1",40,100,420,200,"Khi gọi print:\ncopy_from_user()\nenable_interrupts()\nghi p[0]\nscheduler()","warn",{fs:16}), b("c2",500,100,420,200,"Thủ tục phục vụ ngắt:\nif (count == 0) unblock_user()\nelse ghi p[i]; count--; i++\nacknowledge_interrupt()","violet",{fs:16}), t("r",480,360,"8 ký tự → 8 lần ngắt, nhưng CPU được rảnh giữa các lần",{fs:18,c:"warn"})]},
 {s:"<b>DMA</b>: chỉ cần <code>set_up_DMA_controller()</code> rồi <code>scheduler()</code>. DMA tự đưa cả 8 ký tự ra máy in; khi xong mới ngắt <b>một lần</b>, thủ tục ngắt chỉ cần <code>unblock_user()</code>.",
  d:[clr(), H("In bằng DMA"), b("c1",40,110,420,180,"Khi gọi print:\ncopy_from_user()\nset_up_DMA_controller()\nscheduler()","ok",{fs:17}), b("c2",500,110,420,180,"Thủ tục phục vụ ngắt:\nacknowledge_interrupt()\nunblock_user()\nreturn_from_interrupt()","ok",{fs:17}), t("r",480,350,"8 ký tự → chỉ 1 lần ngắt",{fs:20,c:"ok"})]},
 {s:"Toàn cảnh <b>kernel I/O</b>: trên cùng là kernel, dưới là <b>kernel I/O subsystem</b>, rồi các <b>device driver</b> (phần mềm). Bên dưới là các <b>device controller</b> và thiết bị (phần cứng).",
  d:[clr(), H("Cấu trúc Kernel I/O"), b("k",60,70,840,60,"Kernel","brand"), b("ks",60,140,840,60,"Kernel I/O subsystem","violet"), ["SCSI","Keyboard","Mouse","PCI bus","Floppy","ATAPI"].map(function(n,i){ return [b("dr"+i,60+i*142,210,130,60,n+"\ndriver","cyan",{fs:13}), b("dc"+i,60+i*142,300,130,60,n+"\ncontroller","gray",{fs:13}), b("dv"+i,60+i*142,390,130,60,n,"dark",{fs:13})]; }), t("sw",30,240,"software",{fs:13,c:"brand",a:"start"}), t("hw",30,420,"hardware",{fs:13,c:"gray",a:"start"})]}
]};};

V["s5-7"] = function(){
 var L=[["User processes","Tạo lời gọi I/O · định dạng · spooling","brand"],["Device-independent software","Đặt tên · bảo vệ · chia khối · đệm · cấp phát","violet"],["Device drivers","Thiết lập thanh ghi thiết bị · kiểm tra trạng thái","cyan"],["Interrupt handlers","Đánh thức driver khi I/O xong","warn"],["Hardware","Thực hiện thao tác I/O","gray"]];
 var sc=[{s:"Phần mềm Vào/Ra được tổ chức thành <b>5 lớp</b>, mỗi lớp chỉ nói chuyện với lớp ngay trên và ngay dưới nó.",
  d:[H("Hệ thống phân lớp của phần mềm Vào/Ra"), L.map(function(l,i){ return [b("L"+i,110,75+i*88,300,76,l[0],l[2],{fs:16}), t("F"+i,430,113+i*88,"",{a:"start",fs:14,c:l[2]})]; })]}];
 L.forEach(function(l,i){ sc.push({s:"Yêu cầu đi xuống lớp <b>"+l[0]+"</b>: "+l[1]+".", d:[d("rq",60,113+i*88,{t:"req",r:24,fs:11,c:"warn"}), u("F"+i,{t:l[1]}), f("L"+i)], t:3600}); });
 sc.push({s:"Phần cứng làm xong, kết quả (<b>I/O reply</b>) đi <b>ngược lên</b>: interrupt handler đánh thức driver, driver báo phần mềm độc lập thiết bị, rồi trả về cho tiến trình.",
  d:[a("up",60,470,60,140,{c:"ok"}), u("rq",{y:113,c:"ok",t:"reply"})]});
 sc.push({s:"Mẹo nhớ thứ tự từ trên xuống: <b>U</b>ser – <b>Đ</b>ộc lập – <b>D</b>river – <b>I</b>nterrupt – <b>H</b>ardware: “<b>Út Đi Dạo Ít Hôm</b>”.",
  d:[t("mn",480,520,"Út Đi Dạo Ít Hôm  =  User · Độc lập · Driver · Interrupt · Hardware",{fs:18,c:"warn"})]});
 return {title:"5 lớp phần mềm Vào/Ra – theo chân một yêu cầu", scenes:sc};
};

V["s5-8"] = function(){
 var S=["Lưu thanh ghi chưa được lưu","Ngữ cảnh cho thủ tục ngắt","Ngăn xếp cho thủ tục ngắt","Ack bộ điều khiển ngắt","Chép thanh ghi → bảng tiến trình","Chạy thủ tục phục vụ ngắt","Ngữ cảnh MMU cho tiến trình kế","Tải thanh ghi tiến trình mới","Chạy tiến trình mới"];
 function box(i){ return b("k"+i,40+(i%3)*300,90+Math.floor(i/3)*120,280,100,(i+1)+". "+S[i],"gray",{fs:14}); }
 return {title:"Interrupt handler (9 bước) & Device driver", scenes:[
 {s:"Interrupt handler nên được <b>giấu sâu bên dưới, sát phần cứng</b>. Driver bắt đầu thao tác I/O rồi <b>tự chặn (block)</b>; khi I/O xong, ngắt sẽ <b>đánh thức</b> driver.",
  d:[H("Sau khi ngắt xảy ra, phần mềm làm 9 bước"), S.map(function(_,i){ return box(i); })]},
 {s:"Bước 1–3: <b>lưu</b> các thanh ghi phần cứng chưa lưu, thiết lập <b>ngữ cảnh</b> và <b>ngăn xếp</b> cho thủ tục phục vụ ngắt.",
  d:[u("k0",{c:"brand"}), u("k1",{c:"brand"}), u("k2",{c:"brand"}), f("k0","k1","k2")]},
 {s:"Bước 4–6: <b>ack</b> bộ điều khiển ngắt (cho phép ngắt lại), <b>copy thanh ghi</b> vào bảng tiến trình, rồi <b>chạy thủ tục phục vụ ngắt</b>.",
  d:[u("k3",{c:"warn"}), u("k4",{c:"warn"}), u("k5",{c:"warn"}), f("k3","k4","k5")]},
 {s:"Bước 7–9: chọn tiến trình chạy tiếp, thiết lập <b>MMU</b> cho nó, <b>tải thanh ghi</b> của nó và <b>bắt đầu chạy</b>.",
  d:[u("k6",{c:"ok"}), u("k7",{c:"ok"}), u("k8",{c:"ok"}), f("k6","k7","k8")]},
 {s:"<b>Device driver</b> nằm trong <b>kernel space</b>, giữa phần còn lại của HĐH và các controller. Driver nói chuyện với controller <b>qua bus</b>. Mỗi loại thiết bị cần một driver riêng.",
  d:[clr(), H("Vị trí logic của device driver"), b("us",40,60,880,110,"","none",{dash:1}), t("usl",60,80,"User space",{fs:14,c:"gray",a:"start"}), b("up",380,85,200,60,"User program","brand",{fs:15}),
   b("ks",40,180,880,190,"","none",{dash:1}), t("ksl",60,200,"Kernel space",{fs:14,c:"gray",a:"start"}), b("rest",240,205,480,55,"Phần còn lại của HĐH","violet",{fs:15}), b("d1",120,290,200,60,"Printer driver","cyan",{fs:14}), b("d2",380,290,200,60,"Camcorder driver","cyan",{fs:14}), b("d3",640,290,200,60,"CD-ROM driver","cyan",{fs:14}),
   b("c1",120,400,200,50,"Printer controller","gray",{fs:13}), b("c2",380,400,200,50,"Camcorder ctrl","gray",{fs:13}), b("c3",640,400,200,50,"CD-ROM ctrl","gray",{fs:13}), a("z0",480,148,480,200), a("z1",220,352,220,396,{t:"bus",lx:25}), a("z2",480,352,480,396), a("z3",740,352,740,396)]}
]};};

V["s5-9"] = function(){
 function lane(k,x0,title){ return [b("u"+k,x0,90,200,110,"","none",{dash:1}), b("k"+k,x0,210,200,110,"","none",{dash:1}), b("m"+k,x0+40,380,120,60,"Modem","gray",{fs:15}), t("tt"+k,x0+100,470,title,{fs:14,c:"warn"})]; }
 return {title:"Định bộ đệm (buffering) & phần mềm độc lập thiết bị", scenes:[
 {s:"Phần mềm độc lập thiết bị lo: <b>giao diện chung với driver</b>, <b>đệm</b>, <b>báo lỗi</b>, <b>cấp phát / giải phóng thiết bị</b> và <b>kích thước khối độc lập thiết bị</b>.",
  d:[H("Giao diện driver: không chuẩn vs chuẩn"), b("os1",60,100,380,110,"Hệ điều hành","gray"), b("dA",60,270,110,80,"Disk","cyan",{fs:15}), b("dB",195,270,110,80,"Printer","warn",{fs:15}), b("dC",330,270,110,80,"Keyboard","violet",{fs:15}), t("na",250,400,"(a) mỗi driver một kiểu → thêm driver phải sửa HĐH",{fs:14,c:"bad"}),
   b("os2",520,100,380,110,"Hệ điều hành","gray"), b("eA",520,250,110,80,"Disk","cyan",{fs:15}), b("eB",655,250,110,80,"Printer","cyan",{fs:15}), b("eC",790,250,110,80,"Keyboard","cyan",{fs:15}), t("nb",710,400,"(b) giao diện chuẩn → cắm driver mới dễ dàng",{fs:14,c:"ok"})]},
 {s:"Nhận dữ liệu từ modem có 4 cách. (a) <b>Không đệm</b>: mỗi ký tự đến là đánh thức tiến trình một lần – rất tốn kém.",
  d:[clr(), H("4 cách định bộ đệm"), lane(0,20,"(a) không đệm"), t("lu",30,108,"user",{fs:12,c:"gray",a:"start"}), t("lk",30,228,"kernel",{fs:12,c:"gray",a:"start"}), b("p0",70,130,100,50,"tiến trình","brand",{fs:13}), a("a0",120,375,120,185,{c:"bad",t:"mỗi ký tự",lx:-45})]},
 {s:"(b) <b>Đệm trong user space</b>: buffer nằm trong tiến trình. Nhưng nếu trang chứa buffer bị đẩy ra đĩa thì sao? Phải khóa trang đó.",
  d:[lane(1,255,"(b) đệm ở user"), b("p1",295,120,120,60,"[buffer]","brand",{fs:13}), a("a1",355,375,355,185,{c:"warn"})]},
 {s:"(c) <b>Đệm trong kernel rồi copy lên user</b>: ① ký tự vào buffer kernel, ② đầy thì copy một lần lên user.",
  d:[lane(2,490,"(c) kernel → copy"), b("p2",530,120,120,60,"[buffer]","brand",{fs:13}), b("q2",550,240,80,40,"buf","violet",{fs:13}), a("a2",590,375,590,284,{c:"ok",t:"1",lx:15}), a("b2",590,236,590,185,{c:"ok",t:"2",lx:15})]},
 {s:"(d) <b>Đệm kép trong kernel</b>: trong lúc buffer 1 đang được copy lên user, ký tự mới vẫn có chỗ chứa ở buffer 2 → không mất dữ liệu.",
  d:[lane(3,725,"(d) đệm kép"), b("p3",765,120,120,60,"[buffer]","brand",{fs:13}), b("q3",745,240,70,40,"buf1","violet",{fs:12}), b("r3",835,240,70,40,"buf2","warn",{fs:12}), a("a3",800,375,785,284,{c:"ok",t:"1",lx:-12}), a("b3",780,236,815,185,{c:"ok",t:"2",lx:-12}), a("c3",840,375,870,284,{c:"warn",t:"3",lx:15})]},
 {s:"Gửi gói tin qua mạng còn tệ hơn: gói tin bị <b>copy nhiều lần</b>. ① user → kernel…",
  d:[clr(), H("Mạng: một gói tin, 5 lần copy"), b("U1",40,80,250,90,"User (gửi)","brand"), b("K1",40,190,250,90,"Kernel","violet"), b("N1",90,300,150,60,"Network ctrl","cyan",{fs:14}), b("U2",670,80,250,90,"User (nhận)","brand"), b("K2",670,190,250,90,"Kernel","violet"), b("N2",720,300,150,60,"Network ctrl","cyan",{fs:14}), b("net",40,420,880,14,"","gray",{r:7}), t("ntl",480,460,"Network",{fs:14,c:"gray"}), d("pk",262,125,{t:"gói",fs:11,r:22}), u("pk",{y:235}), t("c1",320,180,"①",{fs:20,c:"warn"})]},
 {s:"② kernel → network controller, ③ qua mạng, ④ controller nhận → kernel, ⑤ kernel → tiến trình nhận. Mỗi lần copy đều tốn thời gian!",
  d:[u("pk",{x:885,y:125}), a("w2",165,282,165,296,{c:"warn"}), a("w3",240,330,720,330,{c:"warn",t:"② ③ ④",cv:-60}), a("w5",795,186,795,172,{c:"warn"}), t("c5",640,180,"⑤",{fs:20,c:"warn"})]}
]};};

V["s5-10"] = function(){
 function disk(id,x0,cells,c){ return [b(id,x0,140,120,260,"","gray",{r:22})].concat(cells.map(function(s,i){ return b(id+"c"+i,x0+10,160+i*58,100,50,s[0],s[1]||c,{fs:14,r:6}); })); }
 return {title:"Đĩa cứng & RAID", scenes:[
 {s:"Đĩa cứng gồm nhiều <b>mặt đĩa</b> quay. Dữ liệu nằm trên các <b>track</b> – những vòng tròn đồng tâm.",
  d:[H("Cấu tạo đĩa cứng"), b("t1",120,90,380,380,"","gray",{r:190}), b("t2",170,140,280,280,"","gray",{r:140}), b("t3",220,190,180,180,"","gray",{r:90}), b("hub",285,255,50,50,"","dark",{r:25}), t("tl",310,72,"track = vòng tròn đồng tâm",{fs:16,c:"warn"}), u("t1",{c:"warn"})]},
 {s:"Mỗi track chia thành các <b>sector</b> có địa chỉ riêng, mỗi sector <b>512 byte</b>. <b>Đầu đọc (drive head)</b> di chuyển trên mặt đĩa để đọc/ghi.",
  d:[u("t1",{c:"gray"}), b("sec",290,95,70,36,"sector","ok",{fs:13,r:4}), t("sl",560,150,"sector = 512 byte",{fs:17,c:"ok",a:"start"}), b("arm",420,270,320,22,"","violet",{r:11}), t("hl",560,320,"đầu đọc (drive head)",{fs:16,c:"violet",a:"start"})]},
 {s:"<b>Cylinder</b> = tập hợp tất cả các track nằm ở <b>cùng vị trí đầu đọc</b> trên mọi mặt đĩa xếp chồng.",
  d:[clr(), H("Cylinder"), b("p1",230,120,500,90,"","gray",{r:45}), b("p2",230,240,500,90,"","gray",{r:45}), b("p3",230,360,500,90,"","gray",{r:45}), b("cy",380,120,200,330,"cylinder","warn",{dash:1,r:20}), t("cl",480,490,"cùng 1 vị trí đầu đọc trên tất cả mặt đĩa",{fs:17,c:"warn"})]},
 {s:"<b>RAID 0</b>: chia dữ liệu thành các <b>strip</b> rải đều lên nhiều đĩa (striping) → đọc ghi song song, rất nhanh. Nhưng <b>không có dữ liệu dự phòng</b>: hỏng 1 đĩa là mất.",
  d:[clr(), H("RAID 0 – striping"), disk("A",120,[["Strip 0"],["Strip 4"],["Strip 8"]],"brand"), disk("B",300,[["Strip 1"],["Strip 5"],["Strip 9"]],"brand"), disk("C",480,[["Strip 2"],["Strip 6"],["Strip 10"]],"brand"), disk("D",660,[["Strip 3"],["Strip 7"],["Strip 11"]],"brand")]},
 {s:"<b>RAID 1</b>: <b>nhân bản (mirroring)</b> – mỗi đĩa có một đĩa sao lưu giống hệt. Hỏng một đĩa vẫn còn bản kia.",
  d:[clr(), H("RAID 1 – mirroring"), disk("A",80,[["Strip 0"],["Strip 2"],["Strip 4"]],"brand"), disk("B",240,[["Strip 1"],["Strip 3"],["Strip 5"]],"brand"), disk("A2",520,[["Strip 0"],["Strip 2"],["Strip 4"]],"gray"), disk("B2",680,[["Strip 1"],["Strip 3"],["Strip 5"]],"gray"), a("mr",370,270,515,270,{c:"ok",t:"bản sao"})]},
 {s:"<b>RAID 2</b> và <b>RAID 3</b> làm việc theo <b>bit</b>: RAID 2 dùng mã Hamming với nhiều đĩa sửa lỗi; RAID 3 chỉ dùng <b>1 đĩa parity</b>.",
  d:[clr(), H("RAID 2 / RAID 3 – chia theo bit"), disk("A",120,[["Bit 1"]],"brand"), disk("B",280,[["Bit 2"]],"brand"), disk("C",440,[["Bit 3"]],"brand"), disk("D",600,[["Bit 4"]],"brand"), disk("P",760,[["Parity","warn"]],"warn"), t("r3",480,450,"RAID 3: 4 đĩa dữ liệu (bit) + 1 đĩa parity",{fs:17,c:"warn"})]},
 {s:"<b>RAID 4</b>: chia theo strip + <b>1 đĩa parity riêng</b> (P0-3, P4-7…). Mọi lần ghi đều phải cập nhật đĩa parity → đĩa này thành <b>nút cổ chai</b>.",
  d:[clr(), H("RAID 4 – parity tập trung"), disk("A",120,[["Strip 0"],["Strip 4"],["Strip 8"]],"brand"), disk("B",280,[["Strip 1"],["Strip 5"],["Strip 9"]],"brand"), disk("C",440,[["Strip 2"],["Strip 6"],["Strip 10"]],"brand"), disk("D",600,[["Strip 3"],["Strip 7"],["Strip 11"]],"brand"), disk("P",760,[["P0-3","warn"],["P4-7","warn"],["P8-11","warn"]],"warn"), f("P")]},
 {s:"<b>RAID 5</b>: parity được <b>xoay vòng, phân tán</b> trên tất cả các đĩa → không còn nút cổ chai. Đây là mức RAID dùng rất phổ biến.",
  d:[clr(), H("RAID 5 – parity phân tán"), disk("A",120,[["Strip 0"],["Strip 4"],["Strip 8"]],"brand"), disk("B",280,[["Strip 1"],["Strip 5"],["Strip 9"]],"brand"), disk("C",440,[["Strip 2"],["Strip 6"],["P8-11","warn"]],"brand"), disk("D",600,[["Strip 3"],["P4-7","warn"],["Strip 10"]],"brand"), disk("E",760,[["P0-3","warn"],["Strip 7"],["Strip 11"]],"brand"), t("r5",480,450,"Ô vàng = parity, nằm rải ở mọi đĩa",{fs:17,c:"warn"})]}
]};};

V["s5-11"] = function(){
 var bits=["0","1","0","0","0","0","0","1"];
 return {title:"Màn hình, terminal RS-232 & đồng hồ", scenes:[
 {s:"<b>Màn hình ánh xạ bộ nhớ</b>: card đồ họa có <b>video RAM</b>. Driver chỉ việc <b>ghi thẳng</b> vào video RAM…",
  d:[H("Memory-mapped display"), b("cpu",40,180,140,90,"CPU","brand"), b("ga",300,140,240,180,"","violet"), t("gal",420,160,"Graphics adapter",{fs:15,c:"violet"}), b("vr",320,190,100,100,"Video\nRAM","warn",{fs:15}), b("vc",430,190,95,100,"Video\nctrl","gray",{fs:14}), b("mon",680,120,240,200,"","dark"), t("scr",800,220,"",{fs:46,c:"ok"}), d("ch",110,170,{t:"A"}), u("ch",{x:370,y:306})]},
 {s:"…video controller đọc video RAM và phát <b>tín hiệu video analog</b> ra màn hình. Màn hình quét các dòng lần lượt từ trên xuống (<b>non-interlaced</b>: line 1, 2, 3 … 625).",
  d:[a("vs",527,240,675,220,{c:"ok",t:"analog video"}), u("scr",{t:"A"})]},
 {s:"<b>Terminal RS-232</b> nói chuyện với máy tính qua <b>đường nối tiếp</b>: các bit đi ra <b>từng bit một</b>. Chip <b>UART</b> trong giao diện RS-232 lo việc chuyển đổi.",
  d:[clr(), H("Terminal RS-232 – truyền nối tiếp"), b("pc",40,170,260,170,"","gray"), t("pcl",170,190,"Máy tính",{fs:15,c:"gray"}), b("ua",150,230,120,60,"UART","warn"), b("tm",700,150,220,210,"Terminal","dark"), a("tx",275,245,695,245,{c:"warn",t:"Transmit",ly:-14}), a("rx",695,300,275,300,{c:"cyan",t:"Receive"})]},
 {s:"Gửi chữ 'A' = 01000001: từng bit lần lượt chạy trên dây. Windows gọi 2 đường nối tiếp đầu tiên là <b>COM1</b> và <b>COM2</b>. Máy tính và terminal <b>hoàn toàn độc lập</b>.",
  d:[bits.map(function(v,i){ return d("bt"+i,640-i*42,245,{t:v,r:15,c:v==="1"?"ok":"gray"}); })]},
 {s:"<b>Đồng hồ khả trình</b>: bộ dao động <b>thạch anh</b> phát xung đều đặn. Mỗi xung làm <b>bộ đếm (counter) giảm 1</b>.",
  d:[clr(), H("Đồng hồ khả trình (programmable clock)"), b("xo",60,120,200,90,"Thạch anh","cyan",{s:"phát xung"}), b("cn",360,120,260,90,"Counter = 3","warn",{fs:22}), b("hr",360,280,260,90,"Holding register = 3","violet",{fs:18}), a("pz",262,165,355,165,{c:"cyan",t:"xung"})]},
 {s:"Counter: 3 → 2 → 1 → <b>0</b>. Khi về 0, đồng hồ <b>sinh ngắt</b> cho CPU (ví dụ để bộ lập lịch đổi tiến trình).",
  d:[u("cn",{t:"Counter = 0",c:"bad"}), b("it",700,120,220,90,"⚡ Ngắt CPU","bad",{fs:20}), a("iz",622,165,695,165,{c:"bad"}), f("it")]},
 {s:"Sau đó counter được nạp lại từ <b>holding register</b> và bắt đầu đếm lại – nhờ vậy đồng hồ tạo ra ngắt đều đặn theo chu kỳ.",
  d:[a("ld",490,275,490,215,{c:"violet",t:"nạp lại",lx:45}), u("cn",{t:"Counter = 3",c:"warn"}), x("it","iz")]}
]};};
})();
