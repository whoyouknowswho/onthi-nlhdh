/* Video hoạt hình tự dựng – Chương 4 (khung hình 960 × 540) */
(function(){
var VH=window.VH, b=VH.b, t=VH.t, a=VH.a, d=VH.d, u=VH.u, x=VH.x, f=VH.f, clr=VH.clr, H=VH.H;
var V = window.VIDEOS;

V["s4-1"] = function(){ return {title:"Phân cấp bộ nhớ & hai loại địa chỉ", scenes:[
 {s:"Lập trình viên mong muốn bộ nhớ vừa <b>dung lượng lớn</b>, vừa <b>nhanh</b>, vừa <b>ổn định</b> (không mất dữ liệu).",
  d:[H("Bộ nhớ lý tưởng mà ai cũng muốn"), b("w1",110,200,200,80,"Dung lượng lớn","ok"), b("w2",380,200,200,80,"Nhanh","brand"), b("w3",650,200,200,80,"Ổn định","violet")]},
 {s:"Nhưng thực tế: bộ nhớ nhanh thì <b>đắt và nhỏ</b>, bộ nhớ lớn thì <b>chậm</b>. Không có loại nào đạt đủ cả ba.",
  d:[t("no",480,350,"❌ Không có loại bộ nhớ nào có đủ cả 3",{c:"bad",fs:22}), f("w1","w2","w3")]},
 {s:"Giải pháp là <b>phân cấp bộ nhớ</b>: một ít cache cực nhanh, RAM ở giữa, và đĩa rất lớn nhưng chậm.",
  d:[x("w1","w2","w3","no"), H("Phân cấp bộ nhớ (memory hierarchy)"), b("c",390,100,180,72,"Cache","warn",{s:"ít · cực nhanh · đắt"}), b("r",290,190,380,82,"Bộ nhớ chính (RAM)","brand",{s:"vừa phải · nhanh · giá vừa"}), b("k",180,290,600,92,"Đĩa","gray",{s:"hàng GB · chậm · rẻ"})]},
 {s:"Càng lên cao càng <b>nhanh và đắt</b>; càng xuống thấp càng <b>rẻ và nhiều</b>. <b>Memory manager</b> – bộ quản lý bộ nhớ của HĐH – điều phối các tầng này.",
  d:[a("up",850,380,850,105,{c:"warn",t:"nhanh, đắt",lx:-55}), a("dn",110,105,110,380,{c:"ok",t:"rẻ, nhiều",lx:50}), t("mm",480,430,"Memory manager (HĐH) quản lý phân cấp này",{c:"violet",fs:20})]},
 {s:"Có hai loại địa chỉ. CPU chỉ sinh ra <b>địa chỉ logic</b> – còn gọi là <b>địa chỉ ảo</b>.",
  d:[clr(), H("Địa chỉ logic và địa chỉ vật lý"), b("cpu",50,200,160,100,"CPU","brand"), b("mmu",400,200,160,100,"MMU","violet",{s:"bộ quản lý bộ nhớ"}), b("ram",760,140,150,220,"RAM","gray"), a("l1",215,250,395,250,{t:"địa chỉ logic: 346"})]},
 {s:"MMU đổi nó thành <b>địa chỉ vật lý</b> – địa chỉ thật mà RAM nhìn thấy.",
  d:[a("l2",565,250,755,250,{c:"ok",t:"địa chỉ vật lý: 14346"}), f("mmu")]},
 {s:"Ánh xạ địa chỉ logic → địa chỉ vật lý chính là <b>vấn đề trung tâm</b> của quản lý bộ nhớ. Mọi kỹ thuật phía sau đều là các cách làm việc này.",
  d:[t("k1",480,420,"Ánh xạ  logic → vật lý  =  vấn đề chính của quản lý bộ nhớ",{c:"warn",fs:21})]}
]};};

V["s4-2"] = function(){ return {title:"Đơn nhiệm & phân vùng cố định", scenes:[
 {s:"Đơn nhiệm: trong RAM chỉ có <b>1 hệ điều hành + 1 chương trình người dùng</b>. Cách (a): HĐH nằm trong RAM ở địa chỉ thấp.",
  d:[H("Đơn nhiệm: 3 cách tổ chức bộ nhớ"), b("a1",110,90,170,220,"Chương trình\nuser","ok"), b("a2",110,310,170,90,"HĐH\n(RAM)","brand"), t("la",195,430,"(a)",{fs:20})]},
 {s:"Cách (b): HĐH nằm trong <b>ROM</b> ở địa chỉ cao – kiểu máy cầm tay, hệ nhúng.",
  d:[b("b1",395,90,170,90,"HĐH\n(ROM)","warn"), b("b2",395,180,170,220,"Chương trình\nuser","ok"), t("lb",480,430,"(b)",{fs:20})]},
 {s:"Cách (c): <b>driver thiết bị trong ROM</b> ở trên cùng, chương trình ở giữa, HĐH trong RAM ở dưới – giống PC chạy MS-DOS với BIOS.",
  d:[b("c1",680,90,170,70,"Driver (ROM)","warn",{fs:16}), b("c2",680,160,170,150,"Chương trình\nuser","ok"), b("c3",680,310,170,90,"HĐH\n(RAM)","brand"), t("lc",765,430,"(c)",{fs:20})]},
 {s:"Đa nhiệm với <b>phân vùng cố định</b>: RAM chia sẵn thành các phân vùng kích thước không đổi.",
  d:[clr(), H("Đa nhiệm với phân vùng cố định"), b("os",420,430,200,50,"HĐH (0–100K)","brand",{fs:15}), b("p1",420,380,200,50,"Phân vùng 1 · 100K","gray",{fs:15}), b("p2",420,280,200,100,"Phân vùng 2 · 200K","gray",{fs:15}), b("p3",420,130,200,150,"Phân vùng 3 · 300K","gray",{fs:15}), b("p4",420,80,200,50,"Phân vùng 4 · 100K","gray",{fs:15})]},
 {s:"(a) <b>Mỗi phân vùng một hàng đợi</b>: job nhỏ phải xếp hàng dài chờ phân vùng nhỏ, trong khi phân vùng 3 lớn lại bỏ trống!",
  d:[d("j1",380,405,{t:"J"}), d("j2",345,405,{t:"J"}), d("j3",310,405,{t:"J"}), d("j4",380,105,{t:"J"}), d("j5",345,105,{t:"J"}), t("qa",230,330,"(a) nhiều hàng đợi",{fs:18,c:"warn"}), t("em",780,205,"← trống, phí!",{c:"bad",fs:18}), f("p3")]},
 {s:"(b) <b>Một hàng đợi chung</b>: phân vùng nào trống thì lấy job phù hợp trong hàng đợi chung.",
  d:[x("em"), u("qa",{t:"(b) một hàng đợi chung"}), u("j1",{x:370,y:230}), u("j2",{x:335,y:230}), u("j3",{x:300,y:230}), u("j4",{x:265,y:230}), u("j5",{x:230,y:230})]},
 {s:"Nhược điểm: job 60K vào phân vùng 300K thì 240K còn lại bị bỏ phí. Đó là <b>phân mảnh nội</b>.",
  d:[x("j1"), b("job",430,235,180,38,"Job 60K","ok",{fs:15}), b("waste",430,140,180,90,"240K bỏ phí\n= phân mảnh nội","bad",{fs:15,dash:1})]}
]};};

V["s4-3"] = function(){ return {title:"Tái cấp phát & bảo vệ bộ nhớ (Base – Limit)", scenes:[
 {s:"Chương trình không biết trước mình sẽ được nạp vào chỗ nào trong RAM, nên mọi địa chỉ nó dùng đều tính <b>từ 0</b>.",
  d:[H("Tái cấp phát động bằng thanh ghi relocation"), b("cpu",50,210,150,100,"CPU","brand"), b("mmu",360,170,220,180,"MMU","violet",{s:"relocation = 14000"}), b("ram",760,100,160,320,"RAM","gray"), d("p",125,180,{t:"346",r:26})]},
 {s:"Địa chỉ logic <b>346</b> đi vào MMU. MMU <b>cộng</b> giá trị thanh ghi relocation vào: 346 + 14000.",
  d:[a("l1",205,260,355,260,{t:"logic 346"}), u("p",{x:470,y:300}), f("mmu")]},
 {s:"Ra địa chỉ vật lý <b>14346</b>. Muốn dời chương trình sang chỗ khác, HĐH chỉ cần đổi giá trị thanh ghi relocation.",
  d:[a("l2",585,260,755,260,{c:"ok",t:"vật lý 14346"}), u("p",{x:840,y:260,t:"14346",r:34,c:"ok"})]},
 {s:"Để <b>bảo vệ</b>, mỗi tiến trình có 2 thanh ghi: <b>base</b> – địa chỉ vật lý nhỏ nhất của nó, và <b>limit</b> – kích thước vùng của nó.",
  d:[clr(), H("Bảo vệ bằng base và limit"), b("m0",700,60,200,120,"Tiến trình khác","bad",{o:.7}), b("m1",700,180,200,200,"Tiến trình P","ok",{s:"chỉ được dùng vùng này"}), b("m2",700,380,200,110,"HĐH","brand"), t("bl",690,380,"base = 30000",{a:"end",fs:16,c:"ok"}), t("ll",690,180,"base + limit = 42000",{a:"end",fs:16,c:"warn"})]},
 {s:"Mỗi lần truy cập, phần cứng kiểm tra: địa chỉ <b>≥ base</b> và <b>&lt; base + limit</b>. Địa chỉ 35000 thỏa cả hai → được phép.",
  d:[b("cpu",30,240,110,70,"CPU","brand"), b("k1",190,235,150,80,"≥ base ?","warn"), b("k2",390,235,170,80,"< base+limit ?","warn"), a("e1",140,275,185,275,{noHead:0}), a("e2",340,275,385,275), d("q",85,215,{t:"35000",r:30}), u("q",{x:640,y:275,c:"ok"}), a("e3",560,275,695,275,{c:"ok",t:"OK"})]},
 {s:"Địa chỉ <b>43000</b> vượt quá base + limit → phần cứng <b>bẫy (trap)</b> về HĐH, báo lỗi địa chỉ. Tiến trình không thể phá vùng nhớ của người khác hay của HĐH.",
  d:[d("q2",85,215,{t:"43000",r:30,c:"bad"}), u("q2",{x:475,y:380}), a("e4",475,318,475,350,{c:"bad"}), t("tr",475,435,"TRAP → HĐH: addressing error",{c:"bad",fs:19})]},
 {s:"Tóm lại: <b>vật lý = base + logic</b>, và logic phải <b>nhỏ hơn limit</b>. MMU làm việc này <b>động</b>, ngay lúc chương trình chạy.",
  d:[t("sum",480,500,"vật lý = base + logic   ·   hợp lệ khi logic < limit",{c:"ok",fs:20})]}
]};};

V["s4-4"] = function(){ return {title:"Swapping & hai loại phân mảnh", scenes:[
 {s:"RAM đang chứa HĐH và ba tiến trình A, B, C. Phía trên còn một khoảng trống nhỏ. Muốn chạy thêm tiến trình mà hết chỗ thì sao?",
  d:[H("Swapping: đưa cả tiến trình ra / vào đĩa"), b("h0",120,70,220,50,"trống 50","none",{dash:1,fs:15,tc:"gray"}), b("C",120,120,220,100,"C","violet"), b("B",120,220,220,80,"B","cyan"), b("A",120,300,220,120,"A","ok"), b("OS",120,420,220,70,"HĐH","brand"), b("disk",640,130,260,280,"","gray",{r:40}), t("dl",770,155,"Backing store (đĩa)",{fs:16,c:"gray"})]},
 {s:"<b>Swap out</b>: HĐH chép <b>toàn bộ</b> tiến trình A ra đĩa để giải phóng chỗ.",
  d:[a("so",345,360,650,300,{t:"swap out",c:"warn",cv:-40}), u("A",{x:700,y:200,w:140,h:120})]},
 {s:"<b>Swap in</b>: nạp tiến trình D vào chỗ cũ của A. D nhỏ hơn A nên còn dư một lỗ trống nhỏ (hole).",
  d:[x("so"), b("D",120,340,220,80,"D","warn"), b("h1",120,300,220,40,"trống 40","none",{dash:1,fs:15,tc:"gray"}), a("si",640,380,345,385,{t:"swap in",c:"ok"})]},
 {s:"B chạy xong và rời bộ nhớ → thêm một hole nữa. Các hole kích thước khác nhau nằm rải rác.",
  d:[x("si","B"), b("h2",120,220,220,80,"trống 80","none",{dash:1,fs:15,tc:"gray"})]},
 {s:"Tiến trình E cần 100. Tổng chỗ trống là 50 + 80 + 40 = 170 – thừa đủ! Nhưng không hole nào liền mạch đủ 100. Đây là <b>phân mảnh ngoài</b>.",
  d:[b("E",420,230,170,90,"E cần 100","bad"), f("h0","h1","h2"), t("ex",640,460,"Tổng trống 170 ≥ 100 nhưng bị chia vụn → PHÂN MẢNH NGOÀI",{c:"bad",fs:17})]},
 {s:"<b>Phân mảnh nội</b> thì ngược lại: vùng được cấp <b>lớn hơn</b> nhu cầu. Cấp phân vùng 100K cho tiến trình cần 70K → 30K bên trong bị bỏ phí.",
  d:[clr(), H("Phân mảnh nội"), b("pv",330,120,300,300,"","gray"), b("use",330,210,300,210,"Tiến trình dùng 70K","ok"), b("w",330,120,300,90,"30K bỏ phí","bad",{dash:1}), t("pl",480,450,"Phân vùng được cấp: 100K",{fs:18})]},
 {s:"Mẹo khi swapping: chừa sẵn chỗ trống (<b>room for growth</b>) để đoạn <b>data</b> tăng lên và <b>stack</b> tăng xuống mà không phải di chuyển tiến trình.",
  d:[clr(), H("Chừa chỗ cho tiến trình phát triển"), b("st",360,90,240,60,"Stack ↓","violet"), b("gr",360,150,240,120,"Room for growth","none",{dash:1,tc:"gray"}), b("da",360,270,240,70,"Data ↑","cyan"), b("pr",360,340,240,80,"Program","ok"), b("os2",360,420,240,60,"HĐH","brand")]}
]};};

V["s4-5"] = function(){
 var sizes=[100,500,200,300,600], X=[], x0=40, k=0.42, used=30, items=[];
 var cx=x0;
 for (var i=0;i<5;i++){ items.push(b("u"+i,cx,230,used,80,"","gray",{r:4})); cx+=used; X.push(cx); items.push(b("hh"+i,cx,230,sizes[i]*k,80,sizes[i]+"K","none",{dash:1,fs:16,r:4})); cx+=sizes[i]*k; }
 items.push(b("u5",cx,230,used,80,"","gray",{r:4}));
 function mid(i){ return X[i]+sizes[i]*k/2; }
 return {title:"Phân vùng động: First / Next / Best / Worst-fit", scenes:[
 {s:"Bộ nhớ có 5 lỗ trống (hole): 100K, 500K, 200K, 300K, 600K – xen giữa là các vùng đã dùng (màu xám). Có một yêu cầu cần <b>212K</b>.",
  d:[H("Có yêu cầu 212K – chọn hole nào?"), items, d("req",480,140,{t:"212K",r:34,c:"warn"}), t("lg",480,360,"ô xám = đã cấp · ô nét đứt = hole (trống)",{fs:15,c:"gray"})]},
 {s:"<b>First-fit</b> quét từ đầu danh sách. Hole đầu tiên 100K – <b>không đủ</b>…",
  d:[u("req",{x:mid(0),y:180}), u("hh0",{c:"bad"}), t("al",480,420,"First-fit",{fs:22,c:"brand"})]},
 {s:"…hole thứ hai 500K <b>đủ</b> → chọn ngay, không xét tiếp. First-fit nhanh vì dừng sớm.",
  d:[u("hh0",{c:"none"}), u("hh1",{c:"ok"}), u("req",{x:mid(1),y:180}), u("al",{t:"First-fit → hole 500K (còn dư 288K)"})]},
 {s:"<b>Best-fit</b> duyệt <b>toàn bộ</b> danh sách, chọn hole <b>nhỏ nhất mà vẫn đủ</b>: 300K. Phần dư chỉ 88K – ít lãng phí nhất.",
  d:[u("hh1",{c:"none"}), f("hh0","hh1","hh2","hh3","hh4"), u("hh3",{c:"ok"}), u("req",{x:mid(3),y:180}), u("al",{t:"Best-fit → hole 300K (dư 88K)"})]},
 {s:"<b>Worst-fit</b> cũng duyệt toàn bộ nhưng chọn hole <b>lớn nhất</b> 600K – để phần dư (388K) vẫn đủ lớn cho tiến trình khác dùng.",
  d:[u("hh3",{c:"none"}), u("hh4",{c:"ok"}), u("req",{x:mid(4),y:180}), u("al",{t:"Worst-fit → hole 600K (dư 388K)"})]},
 {s:"<b>Next-fit</b> giống First-fit nhưng bắt đầu tìm từ <b>vị trí con trỏ lần trước dừng</b> (ví dụ hole 200K) chứ không quay lại đầu → chọn 300K.",
  d:[u("hh4",{c:"none"}), d("ptr",mid(2),340,{t:"▲",c:"violet",r:16}), t("pl",mid(2),380,"con trỏ",{fs:14,c:"violet"}), u("hh3",{c:"ok"}), u("req",{x:mid(3),y:180}), u("al",{t:"Next-fit → tìm tiếp từ con trỏ → hole 300K"})]},
 {s:"Nhớ nhanh: First = <b>đầu tiên đủ</b> · Next = <b>từ con trỏ</b> · Best = <b>nhỏ nhất đủ</b> · Worst = <b>lớn nhất</b>. Best và Worst phải duyệt hết danh sách.",
  d:[x("ptr","pl","req","lg"), u("hh3",{c:"none"}), u("al",{t:"First: đầu tiên · Next: từ con trỏ · Best: nhỏ nhất đủ · Worst: lớn nhất",fs:18})]},
 {s:"HĐH ghi nhớ vùng nào trống bằng <b>Bit map</b> – mỗi đơn vị cấp phát 1 bit: 1 = đã dùng, 0 = trống…",
  d:[clr(), H("Theo dõi bộ nhớ: Bit map và Linked list"), [0,1,2,3,4,5,6,7].map(function(i){ return [b("bu"+i,120+i*60,110,56,56,i<5?"A":"",i<5?"ok":"none",{dash:i>=5,fs:16}), t("bt"+i,148+i*60,195,i<5?"1":"0",{fs:24,c:i<5?"ok":"gray"})]; }), t("bm",360,240,"Bit map: 1 1 1 1 1 0 0 0",{fs:18,c:"warn"})]},
 {s:"…hoặc bằng <b>danh sách liên kết</b>: mỗi nút ghi P (tiến trình) hay H (hole), vị trí bắt đầu và độ dài.",
  d:[b("n1",80,330,150,60,"P | 0 | 5","ok"), b("n2",290,330,150,60,"H | 5 | 3","none",{dash:1}), b("n3",500,330,150,60,"P | 8 | 6","ok"), b("n4",710,330,170,60,"H | 18 | 2","none",{dash:1}), a("ln1",230,360,285,360), a("ln2",440,360,495,360), a("ln3",650,360,705,360), t("nl",480,440,"H | 18 | 2  =  hole bắt đầu ở 18, dài 2 đơn vị",{fs:17,c:"gray"})]}
]};};

V["s4-6"] = function(){
 var pg=[], fr=[];
 for (var i=0;i<8;i++) pg.push(b("pg"+i,70,70+i*52,150,48,"Trang "+i,"brand",{fs:16}));
 for (var j=0;j<4;j++) fr.push(b("fr"+j,600,90+j*90,160,80,"Khung "+j,"gray",{fs:16}));
 var map={0:2,1:0,3:3,6:1};
 return {title:"Bộ nhớ ảo & phân trang", scenes:[
 {s:"Chương trình có <b>8 trang</b>, nhưng RAM chỉ có <b>4 khung trang</b>. Không có bộ nhớ ảo thì không chạy được.",
  d:[H("Chương trình lớn hơn RAM vẫn chạy được"), pg, fr, t("vl",145,500,"Bộ nhớ ẢO (logic)",{fs:17,c:"brand"}), t("rl",680,470,"Bộ nhớ VẬT LÝ",{fs:17,c:"gray"}), b("dk",810,150,130,250,"Đĩa","gray",{r:30})]},
 {s:"Với bộ nhớ ảo: chỉ những trang <b>đang cần</b> mới nạp vào RAM, và nằm ở <b>khung bất kỳ</b> – không cần liền nhau.",
  d:Object.keys(map).map(function(p){ return [a("m"+p,225,94+p*52,595,130+map[p]*90,{c:"ok"}), u("fr"+map[p],{t:"Trang "+p,c:"ok"})]; })},
 {s:"Các trang còn lại vẫn nằm trên <b>đĩa</b>. Khi nào chương trình cần tới, HĐH mới nạp vào.",
  d:[2,4,5,7].map(function(p){ return a("dk"+p,225,94+p*52,805,280,{c:"gray",dash:1,cv:30}); })},
 {s:"<b>Bảng trang</b> ghi lại: trang nào đang ở khung nào; X nghĩa là trang chưa có trong RAM.",
  d:[b("pt",320,90,180,340,"Bảng trang\n\n0 → 2\n1 → 0\n2 → X\n3 → 3\n4 → X\n5 → X\n6 → 1\n7 → X","violet",{fs:17})]},
 {s:"Trang (logic) và khung (vật lý) có <b>cùng kích thước</b>: từ 512 byte đến 8 KB. Mọi khung bằng nhau nên <b>không có phân mảnh ngoài</b> – chỉ có phân mảnh nội ở trang cuối.",
  d:[t("r1",480,505,"1 trang = 1 khung (512 B – 8 KB) · chỉ có phân mảnh NỘI",{fs:18,c:"warn"})]},
 {s:"Ai làm việc tra bảng trang? Là <b>MMU</b>, nằm ngay trong chip CPU. CPU gửi <b>địa chỉ ảo</b> cho MMU…",
  d:[clr(), H("Vị trí và chức năng của MMU"), b("pk",80,90,280,300,"","none",{dash:1}), t("pkl",220,115,"Gói CPU (CPU package)",{fs:15,c:"gray"}), b("cp",150,140,140,80,"CPU","brand"), b("mu",150,270,140,90,"MMU","violet"), a("va",220,222,220,265,{t:"địa chỉ ảo",lx:60}), b("bus",60,450,840,16,"","gray",{r:8}), b("me",480,180,160,130,"Memory","gray"), b("dc",700,180,180,130,"Disk\ncontroller","gray")]},
 {s:"…MMU tra bảng trang rồi gửi <b>địa chỉ vật lý</b> ra bus tới bộ nhớ.",
  d:[a("pa",220,362,220,445,{c:"ok",t:"địa chỉ vật lý",lx:70}), a("pm",230,452,560,315,{c:"ok",cv:-40}), f("mu")]}
]};};

V["s4-7"] = function(){ var rows=[], fr=[2,1,6,0,4,3];
 for (var i=0;i<6;i++) rows.push(b("r"+i,80,170+i*50,190,46,"trang "+i+"  →  khung "+fr[i],"gray",{fs:16}));
 return {title:"Dịch địa chỉ ảo → địa chỉ vật lý", scenes:[
 {s:"Ví dụ trong slide: 16 trang, mỗi trang <b>4 KB</b>. CPU phát ra địa chỉ ảo <b>8196</b>. Địa chỉ vật lý là bao nhiêu?",
  d:[H("Dịch địa chỉ ảo 8196 (trang 4 KB)"), b("va",330,70,300,70,"Địa chỉ ảo: 8196","brand",{fs:22})]},
 {s:"4 KB = 2<sup>12</sup>, nên <b>12 bit thấp là offset</b>, các bit còn lại là số trang. 8196 = 2 × 4096 + 4 → <b>p = 2</b>, <b>d = 4</b>.",
  d:[x("va"), b("p",320,70,150,70,"p = 2","warn",{fs:22,s:"số trang"}), b("dd",480,70,170,70,"d = 4","cyan",{fs:22,s:"offset 12 bit"}), t("fm",800,105,"8196 = 2 × 4096 + 4",{fs:18,c:"gray"})]},
 {s:"Dùng p = 2 làm <b>chỉ số tra bảng trang</b>: trang 2 đang nằm ở <b>khung 6</b>, bit present = 1.",
  d:[rows, t("ptl",175,150,"Bảng trang",{fs:16,c:"violet"}), a("ap",395,145,275,290,{c:"warn",cv:30}), u("r2",{c:"ok"}), f("r2")]},
 {s:"Offset d được <b>chép thẳng</b> sang địa chỉ vật lý, không đổi. Chỉ phần số trang được thay bằng số khung.",
  d:[b("ff",380,440,150,70,"f = 6","ok",{fs:22,s:"số khung"}), b("d2",540,440,170,70,"d = 4","cyan",{fs:22}), a("af",272,315,375,470,{c:"ok",cv:-20}), a("ad",565,145,620,435,{c:"cyan",t:"chép thẳng",lx:60})]},
 {s:"Địa chỉ vật lý = f × kích thước trang + d = 6 × 4096 + 4 = <b>24580</b>.",
  d:[b("res",720,300,220,90,"24580","ok",{fs:30,s:"6 × 4096 + 4"}), f("res")]},
 {s:"Nếu bit present của trang = 0 (trang chưa nằm trong RAM) thì không dịch được → xảy ra <b>lỗi trang</b> (page fault).",
  d:[u("r4",{t:"trang 4 → X (P = 0)",c:"bad"}), t("pf",480,520,"present = 0  →  LỖI TRANG",{c:"bad",fs:18})]},
 {s:"Mỗi hàng của bảng trang chứa: <b>số khung</b>, bit <b>present/absent</b>, quyền <b>protection</b>, bit <b>modified</b> (đã bị ghi), bit <b>referenced</b> (vừa dùng) và bit <b>caching disabled</b>.",
  d:[clr(), H("Một hàng (entry) của bảng trang"), b("e1",40,200,110,90,"Caching\ndisabled","gray",{fs:14}), b("e2",150,200,110,90,"Refe-\nrenced","cyan",{fs:14}), b("e3",260,200,110,90,"Modified","warn",{fs:14}), b("e4",370,200,140,90,"Protection","violet",{fs:14}), b("e5",510,200,120,90,"Present/\nabsent","bad",{fs:14}), b("e6",630,200,290,90,"Page frame number","ok",{fs:17}),
   t("x1",205,330,"vừa được dùng?",{fs:14,c:"cyan"}), t("x2",315,360,"đã ghi? → phải lưu ra đĩa",{fs:14,c:"warn"}), t("x3",440,330,"đọc/ghi/thực thi",{fs:14,c:"violet"}), t("x4",570,390,"có trong RAM?",{fs:14,c:"bad"}), t("x5",775,330,"khung chứa trang",{fs:14,c:"ok"})]}
]};};

V["s4-8"] = function(){ return {title:"Bảng trang 2 mức & TLB", scenes:[
 {s:"Địa chỉ 32 bit, trang 4 KB → bảng trang 1 mức có tới 2<sup>20</sup> ≈ <b>1 triệu entry</b> cho mỗi tiến trình. Quá tốn bộ nhớ!",
  d:[H("Vì sao cần bảng trang 2 mức?"), b("big",280,140,400,260,"Bảng trang 1 mức\n2^20 ≈ 1 triệu entry","bad",{fs:24})]},
 {s:"Giải pháp: chia địa chỉ thành <b>PT1 (10 bit) – PT2 (10 bit) – Offset (12 bit)</b>. Ví dụ 0x00403004 → PT1 = 1, PT2 = 3, offset = 4.",
  d:[x("big"), b("a1",240,70,160,60,"PT1 = 1","warn",{fs:20,s:"10 bit"}), b("a2",400,70,160,60,"PT2 = 3","cyan",{fs:20,s:"10 bit"}), b("a3",560,70,160,60,"Offset = 4","ok",{fs:20,s:"12 bit"})]},
 {s:"PT1 chọn một entry trong <b>bảng cấp 1</b> → entry đó trỏ tới một <b>bảng cấp 2</b>.",
  d:[b("t1",100,190,160,300,"Bảng cấp 1\n(1024 entry)","gray",{fs:15}), b("t1e",100,330,160,36,"entry 1","warn",{fs:15}), a("x1",320,135,190,325,{c:"warn"})]},
 {s:"PT2 chọn entry trong bảng cấp 2 → ra số khung trang. Cộng offset là có địa chỉ vật lý.",
  d:[b("t2",400,190,160,300,"Bảng cấp 2\n(1024 entry)","gray",{fs:15}), b("t2e",400,380,160,36,"entry 3","cyan",{fs:15}), a("x2",262,348,395,398,{c:"warn"}), a("x3",480,135,480,375,{c:"cyan"}), b("fr",700,300,190,110,"Khung trang\n+ offset 4","ok",{fs:17}), a("x4",562,398,695,360,{c:"ok"})]},
 {s:"Mỗi bảng cấp 2 quản lý 1024 × 4 KB = <b>4 MB</b>. Vùng nhớ nào không dùng thì <b>không cần tạo</b> bảng cấp 2 → tiết kiệm rất nhiều.",
  d:[t("n1",480,520,"1 bảng cấp 2 = 1024 × 4 KB = 4 MB · vùng không dùng → không cần bảng",{fs:17,c:"warn"})]},
 {s:"Bảng trang nằm trong RAM: <b>PTBR</b> trỏ tới nó, <b>PRLR</b> cho biết kích thước. Mỗi lần truy cập dữ liệu phải vào RAM <b>2 lần</b>: tra bảng trang, rồi lấy dữ liệu.",
  d:[clr(), H("TLB – bộ nhớ đệm cho bảng trang"), b("cpu",40,200,130,90,"CPU","brand"), b("tlb",260,190,170,110,"TLB","warn",{s:"cực nhanh, ít entry"}), b("pt",560,90,200,130,"Bảng trang\n(trong RAM)","violet",{fs:16}), b("dt",560,320,200,130,"Dữ liệu\n(trong RAM)","gray",{fs:16}), t("pb",660,240,"PTBR → bảng trang · PRLR = kích thước",{fs:13,c:"gray"})]},
 {s:"<b>TLB</b> (bộ nhớ kết hợp) lưu các ánh xạ trang → khung vừa dùng. <b>TLB hit</b>: có ngay số khung, chỉ còn <b>1 lần</b> vào RAM để lấy dữ liệu.",
  d:[d("q",105,170,{t:"p"}), u("q",{x:345,y:170}), u("tlb",{c:"ok",t:"TLB hit ✔"}), a("h1",432,260,555,370,{c:"ok",t:"1 lần vào RAM"})]},
 {s:"<b>TLB miss</b>: phải tra bảng trang trong RAM, rồi nạp ánh xạ đó vào TLB cho lần sau. Chương trình hay dùng lại các trang cũ nên tỉ lệ hit rất cao.",
  d:[x("h1"), u("tlb",{c:"bad",t:"TLB miss ✘"}), u("q",{x:660,y:80,c:"bad"}), a("m1",432,220,555,160,{c:"bad",t:"tra bảng trang"}), a("m2",560,200,435,250,{c:"warn",t:"nạp vào TLB",cv:-30}), a("m3",660,222,660,315,{c:"ok"})]}
]};};

V["s4-9"] = function(){ return {title:"Lỗi trang & thay thế trang", scenes:[
 {s:"Chương trình chạy lệnh <b>load M</b>. Tra bảng trang thấy trang M đánh dấu <b>i (invalid)</b> – trang này chưa nằm trong RAM.",
  d:[H("Xử lý lỗi trang (page fault)"), b("ins",30,230,130,70,"load M","brand"), b("pt",230,200,150,130,"","violet"), t("ptl",305,182,"Bảng trang",{fs:15,c:"violet"}), b("pte",240,260,130,34,"M | i","bad",{fs:15}), b("os",420,60,180,80,"Hệ điều hành","warn"), b("pm",530,250,170,260,"","gray"), t("pml",615,530,"Bộ nhớ vật lý",{fs:14,c:"gray"}), b("ff",545,360,140,40,"khung trống","none",{dash:1,fs:14}), b("dk",770,150,160,280,"Đĩa","gray",{r:30}), b("pg",805,330,90,40,"M","cyan",{fs:16}),
   a("s1",162,265,235,277,{t:"① tham chiếu",ly:-10})]},
 {s:"② Phần cứng phát sinh <b>lỗi trang</b> và <b>bẫy (trap)</b> về hệ điều hành.",
  d:[a("s2",320,200,450,145,{c:"bad",t:"② trap"}), f("os")]},
 {s:"③ HĐH tìm vị trí trang M trên đĩa (backing store) và chuẩn bị một <b>khung trống</b> – nếu cần thì đẩy một trang cũ ra.",
  d:[a("s3",605,100,820,320,{c:"warn",t:"③ trang ở trên đĩa",cv:-40})]},
 {s:"④ Nạp trang M từ đĩa vào khung trống trong bộ nhớ vật lý.",
  d:[u("pg",{x:570,y:360,w:90}), a("s4",800,390,690,385,{c:"ok",t:"④ nạp trang"}), u("ff",{t:"",c:"none"})]},
 {s:"⑤ Cập nhật bảng trang: ghi số khung mới cho M, đổi bit thành <b>v (valid)</b>.",
  d:[u("pte",{t:"M | v",c:"ok"}), a("s5",540,380,375,290,{c:"ok",t:"⑤ cập nhật bảng trang",cv:30})]},
 {s:"⑥ <b>Khởi động lại lệnh</b> gây lỗi. Lần này trang M đã có trong RAM nên truy cập thành công.",
  d:[a("s6",235,300,162,290,{c:"ok",t:"⑥ chạy lại lệnh",ly:30}), u("ins",{c:"ok"}), f("ins")]},
 {s:"Nếu <b>không còn khung trống</b> thì phải <b>thay thế trang</b>: chọn một trang 'nạn nhân' (victim) đang ít cần nhất.",
  d:[clr(), H("Thay thế trang khi RAM đã đầy"), b("pm",360,90,220,380,"","gray"), b("v",375,250,190,60,"victim","bad"), b("dk",740,140,180,280,"Đĩa","gray",{r:30}), b("pt",60,170,190,180,"","violet"), t("ptl",155,152,"Bảng trang",{fs:15,c:"violet"}), b("e1",75,230,160,36,"victim | v","gray",{fs:14}), b("e2",75,280,160,36,"mới | i","gray",{fs:14})]},
 {s:"① Ghi victim ra đĩa (nếu nó đã bị sửa) → ② đổi entry của nó thành <b>invalid</b> → ③ nạp trang mới vào khung vừa trống → ④ cập nhật bảng trang cho trang mới.",
  d:[a("r1",570,265,760,220,{c:"warn",t:"① swap out"}), u("e1",{t:"victim | i",c:"bad"}), a("r3",760,330,570,295,{c:"ok",t:"③ swap in"}), u("v",{t:"trang mới",c:"ok"}), u("e2",{t:"mới | v",c:"ok"}), t("r2",155,385,"② invalid · ④ valid",{fs:15,c:"warn"})]},
 {s:"Thuật toán thay thế tốt là thuật toán làm cho <b>số lần lỗi trang càng ít càng tốt</b>, vì cùng một trang có thể bị đưa ra – vào nhiều lần.",
  d:[t("g",480,510,"Mục tiêu: càng ít lỗi trang càng tốt",{c:"warn",fs:20})]}
]};};

V["s4-10"] = function(){
 var R=[7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1], N=3, fr=[], q=[], faults=0, sc=[], base=[];
 base.push(H("Thuật toán FIFO · 3 khung trang"));
 R.forEach(function(p,i){ base.push(b("c"+i,60+i*42,70,38,44,String(p),"gray",{fs:17,r:6})); });
 for (var k=0;k<N;k++) base.push(b("f"+k,180,190+k*80,170,64,"(trống)","none",{dash:1,fs:18}), t("fl"+k,150,222+k*80,"Khung "+(k+1),{a:"end",fs:15,c:"gray"}));
 base.push(b("cnt",620,200,280,90,"Lỗi trang: 0","bad",{fs:24}), t("note",760,340,"",{fs:17}));
 sc.push({s:"Thuật toán <b>FIFO</b>: hết chỗ thì bỏ trang <b>vào sớm nhất</b>. Ta chạy chuỗi tham chiếu 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1 với 3 khung trang.", d:[base]});
 R.forEach(function(p,i){
  var ops=[u("c"+i,{c:"warn"})]; if (i>0) ops.push(u("c"+(i-1),{c:"gray"}));
  var s, hit=fr.indexOf(p)>=0;
  if (hit){ s="Tham chiếu <b>"+p+"</b>: đã có trong RAM → <b>không lỗi</b>."; ops.push(u("note",{t:"✔ hit – không lỗi",c:"ok"}), f("f"+fr.indexOf(p))); }
  else {
   faults++;
   if (fr.length<N){ fr.push(p); q.push(fr.length-1); ops.push(u("f"+(fr.length-1),{t:"trang "+p,c:"ok",dash:0})); s="Tham chiếu <b>"+p+"</b>: chưa có → <b>lỗi trang</b>, còn khung trống nên nạp vào."; ops.push(u("note",{t:"✘ lỗi trang (khung trống)",c:"bad"})); ops.push(f("f"+(fr.length-1))); }
   else { var slot=q.shift(), old=fr[slot]; fr[slot]=p; q.push(slot); ops.push(u("f"+slot,{t:"trang "+p,c:"ok"}), f("f"+slot)); s="Tham chiếu <b>"+p+"</b>: chưa có → <b>lỗi trang</b>. RAM đầy → bỏ trang <b>"+old+"</b> vì nó vào sớm nhất."; ops.push(u("note",{t:"✘ lỗi · bỏ trang "+old+" (vào sớm nhất)",c:"bad"})); }
   ops.push(u("c"+i,{c:"bad"}));
  }
  for (var k2=0;k2<fr.length;k2++) if (fr[k2]!==p) ops.push(u("f"+k2,{c:"gray"}));
  ops.push(u("cnt",{t:"Lỗi trang: "+faults}));
  sc.push({s:s, d:ops, t:i<6?4200:2600});
 });
 sc.push({s:"Kết quả: FIFO gây <b>15</b> lỗi trang. Cùng chuỗi này, <b>LRU</b> (bỏ trang lâu nhất chưa dùng) chỉ 12, còn <b>Optimal</b> (bỏ trang lâu nhất mới dùng lại) chỉ 9 – ít nhất có thể.",
  d:[clr(), H("So sánh với 3 khung trang"), b("bf",120,130,15*44,60,"FIFO · 15","bad",{fs:20}), b("bl",120,220,12*44,60,"LRU · 12","warn",{fs:20}), b("bo",120,310,9*44,60,"Optimal · 9","ok",{fs:20}), t("bt",480,430,"Optimal không cài đặt được (cần biết tương lai) → chỉ dùng làm chuẩn so sánh",{fs:16,c:"gray"})]});
 sc.push({s:"Cách nhớ: <b>FIFO</b> nhìn thứ tự vào · <b>LRU</b> nhìn về <b>quá khứ</b> · <b>Optimal</b> nhìn về <b>tương lai</b>. LRU rất tốt nhưng khó cài chính xác; <b>Aging</b> xấp xỉ LRU tốt; Clock và WSClock là lựa chọn thực tế.",
  d:[clr(), H("Mẹo nhớ các thuật toán"), b("m1",60,120,260,120,"FIFO","bad",{s:"bỏ trang vào sớm nhất"}), b("m2",350,120,260,120,"LRU","warn",{s:"bỏ trang lâu nhất chưa dùng ←"}), b("m3",640,120,260,120,"Optimal","ok",{s:"bỏ trang lâu nhất mới dùng →"}), b("m4",60,300,840,120,"Second chance / Clock: FIFO + bit R cho cơ hội thứ 2 · NFU, Aging: đếm tần suất (Aging ≈ LRU tốt)\nWorking set / WSClock: giữ tập trang đang dùng · NRU: chia 4 lớp theo bit R, M (rất thô)","gray",{fs:15})]});
 sc.push({s:"<b>Nghịch lý Belady</b>: với FIFO, thêm khung trang có thể làm lỗi trang <b>tăng</b>. Chuỗi 1 2 3 4 1 2 5 1 2 3 4 5: 3 khung → 9 lỗi, nhưng 4 khung → 10 lỗi!",
  d:[clr(), H("Nghịch lý Belady (chỉ xảy ra với FIFO)"), b("b3",160,170,280,150,"3 khung","gray",{fs:22,s:"9 lỗi trang"}), b("b4",520,170,280,150,"4 khung","bad",{fs:22,s:"10 lỗi trang ?!"}), a("ba",445,245,515,245,{c:"bad"})]});
 return {title:"Thuật toán thay thế trang – chạy thử FIFO từng bước", scenes:sc};
};

V["s4-11"] = function(){ return {title:"HĐH tham gia phân trang & external pager", scenes:[
 {s:"HĐH can thiệp vào phân trang ở <b>4 thời điểm</b>. Thứ nhất – <b>khởi tạo tiến trình</b>: xác định kích thước, tạo bảng trang.",
  d:[H("4 thời điểm HĐH tham gia phân trang"), b("t1",40,170,200,170,"① Khởi tạo\ntiến trình","ok",{s:"tạo bảng trang"})]},
 {s:"Thứ hai – <b>tiến trình được chạy</b>: MMU được thiết lập lại cho tiến trình mới và <b>TLB bị xóa (flush)</b> vì chứa ánh xạ của tiến trình cũ.",
  d:[b("t2",265,170,200,170,"② Tiến trình\nthực thi","brand",{s:"reset MMU, flush TLB"})]},
 {s:"Thứ ba – <b>khi có lỗi trang</b>: xác định địa chỉ ảo gây lỗi và thay thế trang.",
  d:[b("t3",490,170,200,170,"③ Lỗi trang","bad",{s:"tìm trang, thay thế"})]},
 {s:"Thứ tư – <b>tiến trình kết thúc</b>: giải phóng bảng trang và các trang của nó.",
  d:[b("t4",715,170,200,170,"④ Kết thúc","gray",{s:"giải phóng bảng trang"}), a("tl",40,380,915,380,{c:"gray",t:"thời gian →"})]},
 {s:"<b>Khóa trang</b>: tiến trình A đang chờ đọc dữ liệu từ đĩa vào buffer. Nếu trang buffer bị chọn đưa ra đĩa, dữ liệu đổ về sẽ ghi nhầm chỗ! Vì vậy trang đó phải được <b>khóa (pin)</b>.",
  d:[clr(), H("Khóa trang đang làm buffer I/O"), b("buf",330,170,300,140,"🔒 Trang buffer của A","warn",{s:"đang chờ I/O – cấm thay thế"}), b("io",720,190,180,100,"Thiết bị I/O","gray"), a("ia",715,240,635,240,{c:"warn",t:"dữ liệu đổ về"}), b("pr",40,190,220,100,"Tiến trình B\ngây lỗi trang","bad",{fs:16}), a("pb",262,240,325,240,{c:"bad",t:"✘",lx:0})]},
 {s:"<b>Backing store</b> có 2 cách: (a) mỗi trang có <b>chỗ cố định</b> trong vùng swap tĩnh; (b) trang chỉ được cấp chỗ trên đĩa <b>khi bị đẩy ra</b>, cần thêm <b>disk map</b> để tìm.",
  d:[clr(), H("Kho sao lưu (backing store)"), b("sa",80,140,360,260,"(a) Vùng swap tĩnh","gray",{s:"mỗi trang 1 chỗ cố định trên đĩa"}), b("sb",520,140,360,260,"(b) Sao lưu động","violet",{s:"cấp chỗ khi đẩy ra + disk map"})]},
 {s:"<b>Tách chính sách và cơ chế</b>: cơ chế (fault handler, MMU handler) nằm trong kernel; chính sách (chọn trang nào) đặt ở <b>external pager</b> chạy ở user space. ① Tiến trình gây lỗi trang.",
  d:[clr(), H("Điều khiển lỗi trang với external pager"), b("us",30,70,640,190,"","none",{dash:1}), t("usl",80,90,"User space",{fs:14,c:"gray",a:"start"}), b("ks",30,270,640,200,"","none",{dash:1}), t("ksl",80,290,"Kernel space",{fs:14,c:"gray",a:"start"}),
   b("up",70,130,170,90,"User process","brand",{fs:16}), b("ep",420,120,200,100,"External pager","violet",{fs:16}), b("fh",120,340,180,90,"Fault handler","warn",{fs:16}), b("mh",440,340,180,90,"MMU handler","gray",{fs:16}), b("dk",780,120,150,160,"Đĩa","gray",{r:30}), a("e1",155,222,195,335,{c:"bad",t:"① page fault",lx:-55})]},
 {s:"② Fault handler báo cho external pager biết <b>cần trang nào</b>. ③ Pager yêu cầu trang từ đĩa…",
  d:[a("e2",250,338,440,225,{c:"warn",t:"② needed page",cv:30}), a("e3",622,150,775,170,{c:"cyan",t:"③ request page"})]},
 {s:"④ Trang về tới pager. ⑤ Pager trả trang cho fault handler. ⑥ Fault handler bảo MMU handler <b>ánh xạ trang vào</b>. Xong!",
  d:[a("e4",775,230,622,200,{c:"ok",t:"④ page arrives"}), a("e5",520,222,300,360,{c:"ok",t:"⑤ here is page",cv:-30}), a("e6",302,385,435,385,{c:"ok",t:"⑥ map page in"}), f("mh")]}
]};};

V["s4-12"] = function(){ return {title:"Phân đoạn (Segmentation) & checkerboarding", scenes:[
 {s:"Trình biên dịch có 5 bảng cùng lớn dần trong <b>một không gian địa chỉ một chiều</b>: symbol table, source text, constant table, parse tree, call stack.",
  d:[H("Vấn đề của không gian địa chỉ một chiều"), b("sy",360,400,240,80,"Symbol table","ok",{fs:16}), b("so",360,330,240,60,"Source text","cyan",{fs:16}), b("co",360,250,240,50,"Constant table","warn",{fs:16}), b("pa",360,150,240,80,"Parse tree","violet",{fs:16}), b("cs",360,70,240,50,"Call stack","brand",{fs:16})]},
 {s:"Symbol table lớn dần lên… và <b>đâm vào</b> source text, dù phía trên vẫn còn chỗ trống!",
  d:[u("sy",{y:370,h:110}), f("sy","so"), t("bm",780,390,"💥 đụng nhau!",{c:"bad",fs:22})]},
 {s:"<b>Phân đoạn</b>: mỗi bảng là một <b>segment</b> riêng, có không gian địa chỉ riêng bắt đầu từ 0, nên <b>tăng hoặc co độc lập</b>.",
  d:[x("bm"), H("Mỗi segment một không gian riêng"), u("sy",{x:40,y:160,w:160,h:320,t:"Seg 0\nSymbol table"}), u("so",{x:220,y:280,w:160,h:200,t:"Seg 1\nSource"}), u("co",{x:400,y:420,w:160,h:60,t:"Seg 2\nConstants"}), u("pa",{x:580,y:240,w:160,h:240,t:"Seg 3\nParse tree"}), u("cs",{x:760,y:300,w:160,h:180,t:"Seg 4\nCall stack"})]},
 {s:"Địa chỉ giờ gồm <b>(số segment, offset)</b>. Lập trình viên biết các segment, nên có thể <b>bảo vệ riêng</b> code và data, và dễ <b>chia sẻ</b> thủ tục.",
  d:[t("ad",480,100,"Địa chỉ = (số segment, offset)",{fs:22,c:"warn"})]},
 {s:"So sánh: phân trang có <b>1</b> không gian tuyến tính, lập trình viên không cần biết; phân đoạn có <b>nhiều</b> không gian, hỗ trợ chia sẻ và bảo vệ. Cả hai đều cho tổng không gian vượt RAM.",
  d:[clr(), H("Phân trang vs Phân đoạn"), b("pg",60,110,400,330,"PHÂN TRANG\n\n• 1 không gian tuyến tính\n• LTV không cần biết\n• Mục đích: không gian lớn\n  mà không cần mua thêm RAM","brand",{fs:17}), b("sg",500,110,400,330,"PHÂN ĐOẠN\n\n• Nhiều không gian\n• LTV phải biết\n• Bảng co giãn, chia sẻ,\n  bảo vệ riêng code / data","violet",{fs:17})]},
 {s:"Nhược điểm của phân đoạn thuần: các segment kích thước khác nhau vào ra liên tục, để lại các lỗ trống xen kẽ như <b>bàn cờ</b> – <b>checkerboarding</b> (phân mảnh ngoài).",
  d:[clr(), H("Checkerboarding và nén (compaction)"), b("s0",380,420,200,60,"Seg 0 (4K)","ok",{fs:15}), b("s7",380,340,200,80,"Seg 7 (5K)","cyan",{fs:15}), b("h1",380,300,200,40,"3K trống","none",{dash:1,fs:14}), b("s2",380,220,200,80,"Seg 2 (5K)","warn",{fs:15}), b("s6",380,160,200,60,"Seg 6 (4K)","violet",{fs:15}), b("h2",380,110,200,50,"4K trống","none",{dash:1,fs:14}), b("s5",380,50,200,60,"Seg 5 (4K)","brand",{fs:15}), b("h3",380,20,200,30,"3K trống","none",{dash:1,fs:13})]},
 {s:"Cách chữa: <b>nén (compaction)</b> – dồn các segment lại với nhau, gom 3K + 4K + 3K thành một vùng trống liền <b>10K</b>.",
  d:[x("h1","h2","h3"), u("s2",{y:260}), u("s6",{y:200}), u("s5",{y:140}), b("hb",380,20,200,120,"10K trống","ok",{dash:1}), f("hb")]}
]};};

V["s4-13"] = function(){ return {title:"Phân đoạn kết hợp phân trang trên Pentium", scenes:[
 {s:"Pentium dùng <b>cả hai</b>: (selector, offset) → cơ chế <b>phân đoạn</b> → địa chỉ tuyến tính → cơ chế <b>phân trang</b> → địa chỉ vật lý.",
  d:[H("Pentium: phân đoạn + phân trang"), b("p1",20,220,170,90,"Selector\n+ Offset","brand",{fs:16}), b("p2",250,220,170,90,"Phân đoạn","violet",{fs:17}), b("p3",480,220,170,90,"Địa chỉ\ntuyến tính","warn",{fs:16}), b("p4",710,220,100,90,"Phân\ntrang","cyan",{fs:15}), b("p5",840,220,100,90,"Vật lý","ok",{fs:15}), a("q1",192,265,245,265), a("q2",422,265,475,265), a("q3",652,265,705,265), a("q4",812,265,835,265)]},
 {s:"<b>Selector 16 bit</b> gồm: <b>Index 13 bit</b> (chọn 1 trong 8192 descriptor), <b>1 bit</b> chọn bảng (0 = GDT, 1 = LDT) và <b>2 bit</b> mức đặc quyền 0–3.",
  d:[clr(), H("Bộ chọn (selector) 16 bit"), b("s1",120,120,460,80,"Index (13 bit)","brand",{fs:20}), b("s2",580,120,110,80,"TI\n1 bit","warn",{fs:16}), b("s3",690,120,150,80,"Mức 0–3\n2 bit","violet",{fs:16}), t("n",480,250,"2^13 = 8192 descriptor mỗi bảng",{fs:18,c:"gray"})]},
 {s:"Bit TI = 0 → tra <b>GDT</b> (bảng mô tả toàn cục, dùng chung). TI = 1 → tra <b>LDT</b> (bảng mô tả cục bộ, riêng từng chương trình).",
  d:[b("g",160,310,280,170,"GDT – Global\nDescriptor Table","ok",{fs:17,s:"chung cho hệ thống (GDTR)"}), b("l",520,310,280,170,"LDT – Local\nDescriptor Table","cyan",{fs:17,s:"riêng mỗi chương trình (LDTR)"}), a("tg",620,205,310,305,{c:"ok",t:"TI = 0",cv:20}), a("tl",650,205,660,305,{c:"cyan",t:"TI = 1",lx:35})]},
 {s:"Descriptor chứa <b>Base 32 bit</b>, <b>Limit 20 bit</b> và các cờ: G (limit theo byte hay trang), D (16/32 bit), P (có trong RAM?), DPL (mức đặc quyền), S, Type.",
  d:[clr(), H("Descriptor (bộ mô tả đoạn)"), b("d1",60,140,280,90,"Base (32 bit)","ok",{fs:18}), b("d2",350,140,250,90,"Limit (20 bit)","warn",{fs:18}), b("d3",610,140,290,90,"G · D · P · DPL · S · Type","violet",{fs:16}), t("dg",480,290,"G = 0: limit tính theo byte · G = 1: theo trang",{fs:16}), t("dd",480,325,"D: đoạn 16 / 32 bit · P = 0: đoạn không có trong bộ nhớ",{fs:16}), t("dp",480,360,"DPL: mức đặc quyền 0–3 · S: System / Application",{fs:16})]},
 {s:"Lấy <b>Base + Offset</b> (sau khi kiểm tra không vượt Limit) → được <b>địa chỉ tuyến tính 32 bit</b>, trong không gian 0 → 4 GB.",
  d:[b("o",100,420,200,70,"Offset","brand"), t("pl",420,455,"+",{fs:34}), b("ln",500,410,380,90,"Địa chỉ tuyến tính 32 bit","warn",{fs:18,s:"không gian 4 GB"}), a("bl",200,232,520,405,{c:"ok",cv:-30})]},
 {s:"Địa chỉ tuyến tính chia <b>Dir (10) · Page (10) · Offset (12)</b>. Dir chọn entry trong <b>page directory</b> (1024 entry) → trỏ tới <b>page table</b> → trỏ tới <b>page frame</b>; offset chọn đúng word.",
  d:[clr(), H("Địa chỉ tuyến tính → địa chỉ vật lý"), b("l1",200,70,190,60,"Dir 10","warn",{fs:18}), b("l2",390,70,190,60,"Page 10","cyan",{fs:18}), b("l3",580,70,190,60,"Offset 12","ok",{fs:18}), b("pd",80,220,200,240,"Page\ndirectory","gray",{fs:16}), b("pt",380,220,200,240,"Page\ntable","gray",{fs:16}), b("pf",680,220,200,240,"Page\nframe","gray",{fs:16}), a("c1",295,132,180,215,{c:"warn"}), a("c2",485,132,480,215,{c:"cyan"}), a("c3",675,132,780,215,{c:"ok"}), a("c4",282,340,375,340), a("c5",582,340,675,340)]},
 {s:"Pentium có <b>4 mức bảo vệ</b>: 0 = kernel (quyền cao nhất, trong cùng), 1 = system calls, 2 = thư viện dùng chung, 3 = chương trình người dùng (ngoài cùng).",
  d:[clr(), H("4 mức bảo vệ trên Pentium"), b("r3",230,80,500,420,"","gray",{r:250}), b("r2",290,140,380,300,"","cyan",{r:190}), b("r1",350,200,260,180,"","violet",{r:130}), b("r0",410,250,140,80,"0 · Kernel","bad",{r:40,fs:16}), t("t3",480,110,"3 · User programs",{fs:16}), t("t2",480,170,"2 · Shared libraries",{fs:16}), t("t1",480,228,"1 · System calls",{fs:15})]}
]};};
})();
