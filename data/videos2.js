/* Video hoạt hình tự dựng – Chương 2: Tiến trình và Luồng (khung hình 960 × 540) */
(function(){
var VH=window.VH, b=VH.b, t=VH.t, a=VH.a, d=VH.d, u=VH.u, x=VH.x, f=VH.f, clr=VH.clr, H=VH.H;
var V = window.VIDEOS;
window.VLABEL = window.VLABEL || {};

/* ---------- 1. Tiến trình là gì ---------- */
V["s2-1"] = function(){ return {title:"Tiến trình là gì? Mô hình tiến trình", scenes:[
 {s:"Chương trình chỉ là một file nằm im trên đĩa. Khi được nạp vào RAM và chạy, nó trở thành <b>tiến trình</b>: một chương trình đang thực hiện.",
  d:[H("Chương trình và tiến trình"), b("pg",70,110,300,170,"Chương trình\nfile nằm trên đĩa\n(thụ động)","gray",{fs:17}),
     a("ld",375,195,585,195,{t:"nạp vào RAM rồi chạy",c:"brand"}), b("pr",590,110,300,170,"Tiến trình\nđang thực hiện\n(chủ động)","brand",{fs:17})]},
 {s:"Để chạy, tiến trình được cấp tài nguyên: <b>không gian địa chỉ</b> gồm text và data, một <b>CPU ảo</b> gồm bộ đếm chương trình, thanh ghi, ngăn xếp, và các tài nguyên khác như file đang mở.",
  d:[b("r1",50,340,280,120,"Không gian địa chỉ\ntext · data","cyan",{fs:16}), b("r2",340,340,280,120,"CPU ảo\nPC · thanh ghi · stack","violet",{fs:16}),
     b("r3",630,340,280,120,"Tài nguyên khác\nfile mở · tiến trình con","warn",{fs:16}), f("r2")]},
 {s:"Mô hình tiến trình, hình a: thực tế máy chỉ có <b>một CPU</b> và <b>một bộ đếm chương trình</b>, nhảy qua lại giữa 4 chương trình A, B, C, D.",
  d:[clr(), H("Mô hình tiến trình (slide 3)"), b("pc",50,80,250,50,"1 CPU · 1 bộ đếm PC","brand",{fs:15}),
     ["A","B","C","D"].map(function(c,i){ return b("m"+c,110,150+i*68,130,56,c,"gray",{fs:18}); }), d("pcd",80,178,{t:"▶",c:"brand",r:14}),
     t("la",175,455,"(a) đa nhiệm 4 chương trình",{fs:15})]},
 {s:"Hình b là cách ta <b>hình dung</b>: 4 tiến trình độc lập, tuần tự, mỗi tiến trình như có <b>bộ đếm chương trình riêng</b>.",
  d:[u("pcd",{y:246}), ["A","B","C","D"].map(function(c,i){ return b("q"+c,350+(i%2)*130,150+Math.floor(i/2)*120,120,100,c+"\nPC riêng","ok",{fs:16}); }),
     t("lb",475,455,"(b) 4 tiến trình độc lập",{fs:15})]},
 {s:"Hình c theo thời gian: <b>mỗi thời điểm chỉ có một tiến trình chạy</b>, nhưng đổi qua lại rất nhanh nên nhìn lâu thì thấy cả 4 cùng tiến lên.",
  d:[u("pcd",{y:314}), ["A","B","C","D"].map(function(c,i){ return t("tl"+c,660,177+i*68,c,{fs:16}); }),
     [0,1,2,3,4,5,6,7].map(function(k){ return b("tb"+k,684+k*30,160+(k%4)*68,28,34,"",["brand","ok","warn","violet"][k%4]); }),
     t("lc",800,455,"(c) mỗi lúc 1 tiến trình",{fs:15})]},
 {s:"Trong bộ nhớ, tiến trình gồm: <b>text</b> là mã lệnh, <b>data</b> là biến toàn cục, <b>heap</b> lớn dần lên khi cấp phát động, và <b>stack</b> lớn dần xuống khi gọi hàm.",
  d:[clr(), H("Tiến trình trong bộ nhớ (slide 5)"), b("st",330,75,300,62,"stack ↓","violet",{fs:18}), b("gp",330,137,300,140,"khoảng trống\ncho stack và heap lớn lên","none",{dash:1,fs:15}),
     b("hp",330,277,300,62,"heap ↑","warn",{fs:18}), b("dt",330,339,300,62,"data","cyan",{fs:18}), b("tx",330,401,300,62,"text (mã lệnh)","brand",{fs:18}),
     t("mx",650,90,"địa chỉ max",{a:"start",fs:15,c:"gray"}), t("z0",650,450,"địa chỉ 0",{a:"start",fs:15,c:"gray"})]},
 {s:"Ví von: một đầu bếp là CPU, nấu 4 món là 4 tiến trình. Mỗi lúc anh chỉ đảo một chảo, nhưng món nào cũng có tờ ghi <b>đang làm tới bước nào</b>, giống bộ đếm chương trình riêng.",
  d:[clr(), H("Ví von: đầu bếp nấu 4 món"), b("ck",60,180,230,130,"Đầu bếp\n= CPU","brand",{fs:20}),
     ["A · bước 3","B · bước 1","C · bước 5","D · bước 2"].map(function(c,i){ return b("ds"+i,380+(i%2)*280,110+Math.floor(i/2)*170,250,130,"Món "+c,i===0?"ok":"gray",{fs:17}); }),
     a("cka",292,245,377,175,{c:"ok"})]}
]};};

/* ---------- 2. Tạo, kết thúc, phân cấp ---------- */
V["s2-2"] = function(){ return {title:"Tạo, kết thúc và phân cấp tiến trình", scenes:[
 {s:"Có <b>4 sự kiện</b> làm tiến trình được tạo ra: khởi động hệ điều hành, một tiến trình gọi lời gọi hệ thống tạo tiến trình, người dùng yêu cầu, và khởi động một công việc xử lý lô.",
  d:[H("4 sự kiện tạo tiến trình"), b("e1",60,100,400,120,"1. Khởi động hệ điều hành","brand",{fs:18}), b("e2",500,100,400,120,"2. Tiến trình gọi system call","cyan",{fs:18}),
     b("e3",60,260,400,120,"3. Người dùng yêu cầu\n(mở một ứng dụng)","ok",{fs:18}), b("e4",500,260,400,120,"4. Khởi động batch job","violet",{fs:18})]},
 {s:"Trong UNIX, <b>fork()</b> tạo ra tiến trình con là <b>bản sao</b> của tiến trình cha, cùng mã và cùng dữ liệu tại lúc fork.",
  d:[clr(), H("fork() và exec() trong UNIX"), b("pa",60,110,180,80,"Cha","brand",{fs:20}), b("ch",60,330,180,80,"Con\n(bản sao)","cyan",{fs:17}),
     a("fk",150,195,150,325,{t:"fork()",c:"cyan",lx:40})]},
 {s:"Con gọi <b>exec()</b> để thay toàn bộ bộ nhớ của nó bằng một chương trình mới. Cha gọi <b>wait()</b> để chờ; con chạy xong gọi <b>exit()</b>, lúc đó cha chạy tiếp.",
  d:[b("ex",360,330,200,80,"exec()\nnạp chương trình mới","violet",{fs:15}), a("a1",242,370,357,370,{c:"violet"}),
     b("xt",680,330,180,80,"exit()","ok",{fs:20}), a("a2",562,370,677,370,{c:"ok"}),
     b("wt",680,110,180,80,"wait()","warn",{fs:20}), a("a3",242,150,677,150,{c:"warn"}),
     a("a4",770,325,770,195,{t:"cha chạy tiếp",c:"ok",lx:70}), f("xt")]},
 {s:"Mỗi lời gọi fork <b>nhân đôi</b> số tiến trình đang chạy tới dòng đó. Hai lần fork liên tiếp cho 4 tiến trình, tức là <b>3 tiến trình mới</b>. Tổng quát: n lần fork cho 2 mũ n tiến trình.",
  d:[clr(), H("n lần fork() → 2ⁿ tiến trình"), b("p0",420,75,120,55,"P","brand",{fs:18}),
     b("p1",250,200,120,55,"P","brand",{fs:18}), b("p2",590,200,120,55,"C1","cyan",{fs:18}),
     a("f1",450,133,320,197,{c:"gray"}), a("f2",510,133,640,197,{c:"gray"}),
     b("p3",110,330,120,55,"P","brand",{fs:18}), b("p4",290,330,120,55,"C2","ok",{fs:18}), b("p5",550,330,120,55,"C1","cyan",{fs:18}), b("p6",730,330,120,55,"C3","ok",{fs:18}),
     a("f3",285,258,180,327,{c:"gray"}), a("f4",335,258,345,327,{c:"gray"}), a("f5",625,258,610,327,{c:"gray"}), a("f6",675,258,780,327,{c:"gray"}),
     t("l1",880,102,"ban đầu",{fs:14,c:"gray"}), t("l2",880,228,"fork 1: 2",{fs:14,c:"gray"}), t("l3",880,442,"fork 2: 4",{fs:14,c:"gray"}),
     t("rs",480,470,"2 lần fork → 4 tiến trình = 3 tiến trình mới",{fs:19,c:"ok"})]},
 {s:"Tiến trình kết thúc trong 4 trường hợp: hai trường hợp <b>tự nguyện</b> là kết thúc bình thường và kết thúc do lỗi; hai trường hợp <b>không tự nguyện</b> là lỗi định mệnh và bị tiến trình khác kill.",
  d:[clr(), H("4 điều kiện kết thúc tiến trình"), b("k1",60,100,400,120,"1. Kết thúc bình thường","ok",{fs:18,s:"tự nguyện"}), b("k2",500,100,400,120,"2. Kết thúc do lỗi","ok",{fs:18,s:"tự nguyện"}),
     b("k3",60,260,400,120,"3. Lỗi định mệnh","bad",{fs:18,s:"không tự nguyện (chia 0…)"}), b("k4",500,260,400,120,"4. Bị tiến trình khác kill","bad",{fs:18,s:"không tự nguyện"})]},
 {s:"Cha tạo con, con lại tạo con, thành một <b>cây tiến trình</b>; UNIX gọi nhóm này là <b>process group</b>. <b>Windows thì không phân cấp</b>: mọi tiến trình ngang hàng nhau.",
  d:[clr(), H("Phân cấp tiến trình"), t("ux",240,80,"UNIX: cây cha – con",{fs:18,c:"brand"}), b("u0",180,110,120,50,"init","brand",{fs:16}),
     b("u1",70,230,120,50,"shell","cyan",{fs:16}), b("u2",290,230,120,50,"daemon","cyan",{fs:16}), b("u3",70,350,120,50,"ls","ok",{fs:16}),
     a("ua",220,163,145,227,{c:"gray"}), a("ub",260,163,335,227,{c:"gray"}), a("uc",130,283,130,347,{c:"gray"}),
     t("wn",720,80,"Windows: ngang hàng",{fs:18,c:"warn"}), ["A","B","C"].map(function(c,i){ return b("w"+i,560+i*115,230,100,50,c,"warn",{fs:16}); })]}
]};};

/* ---------- 3. Trạng thái, PCB, chuyển ngữ cảnh ---------- */
V["s2-3"] = function(){ return {title:"Trạng thái tiến trình, PCB và chuyển ngữ cảnh", scenes:[
 {s:"Tiến trình luôn ở một trong ba trạng thái: <b>Running</b> đang dùng CPU, <b>Ready</b> sẵn sàng chờ tới lượt, và <b>Blocked</b> đang chờ một sự kiện như nhập liệu.",
  d:[H("3 trạng thái tiến trình"), b("rn",380,80,200,80,"Running","ok",{fs:22}), b("bl",90,330,200,80,"Blocked","bad",{fs:22}), b("rd",670,330,200,80,"Ready","warn",{fs:22})]},
 {s:"Bước 1: đang chạy mà phải <b>chờ nhập liệu</b> thì chuyển Running sang Blocked.",
  d:[a("s1",400,163,250,327,{t:"1 chờ input",c:"bad",lx:-60,ly:-10}), f("bl")]},
 {s:"Bước 2: bộ lập lịch <b>chọn tiến trình khác</b>, nên Running về Ready. Bước 3: bộ lập lịch <b>chọn tiến trình này</b>, Ready lên Running.",
  d:[a("s2",585,130,760,327,{t:"2",c:"warn",cv:-25}), a("s3",700,327,560,163,{t:"3",c:"ok",cv:-25}),
     t("n2",880,180,"2: bộ lập lịch\nchọn người khác",{fs:14,c:"gray"}), t("n3",470,270,"3: được chọn",{fs:14,c:"gray"})]},
 {s:"Bước 4: <b>dữ liệu đã có</b> thì Blocked chuyển sang Ready. Lưu ý không có đường Blocked thẳng lên Running: chờ xong vẫn phải xếp hàng.",
  d:[a("s4",293,370,667,370,{t:"4 input đã có",c:"ok"}), t("wn",480,480,"Không có Blocked → Running!",{fs:20,c:"bad"})]},
 {s:"Mỗi tiến trình có một <b>PCB</b>, khối điều khiển tiến trình, như tờ hồ sơ: trạng thái, số hiệu, bộ đếm chương trình, các thanh ghi, giới hạn bộ nhớ, danh sách file đang mở.",
  d:[clr(), H("PCB – Khối điều khiển tiến trình"), ["process state","process number","program counter","registers","memory limits","list of open files","…"].map(function(r,i){ return b("pc"+i,330,70+i*58,300,52,r,i===2||i===3?"cyan":"gray",{fs:16}); }),
     t("pn",680,250,"một dòng trong\nbảng tiến trình",{fs:16,c:"gray",a:"start"})]},
 {s:"Chuyển ngữ cảnh: P0 đang chạy thì có ngắt hoặc system call. HĐH <b>lưu trạng thái P0 vào PCB 0</b>…",
  d:[clr(), H("Chuyển ngữ cảnh P0 → P1"), t("h0",130,75,"P0",{fs:18,c:"brand"}), t("ho",480,75,"Hệ điều hành",{fs:18,c:"violet"}), t("h1",830,75,"P1",{fs:18,c:"cyan"}),
     b("r0",50,100,160,60,"P0 chạy","ok",{fs:17}), b("s0",350,170,260,60,"lưu trạng thái → PCB₀","violet",{fs:16}), a("i0",212,130,347,195,{c:"bad",t:"ngắt",ly:-12}),
     b("w1",750,100,160,60,"P1 chờ","gray",{fs:17})]},
 {s:"…rồi <b>nạp trạng thái P1 từ PCB 1</b>. P1 chạy, còn P0 nằm chờ. Lần đổi sau thì làm ngược lại.",
  d:[b("l1",350,260,260,60,"nạp trạng thái ← PCB₁","violet",{fs:16}), a("i1",612,290,747,340,{c:"ok"}), b("r1",750,320,160,60,"P1 chạy","ok",{fs:17}),
     u("r0",{t:"P0 chờ",c:"gray"}), u("w1",{o:0.3})]},
 {s:"Thời gian chuyển ngữ cảnh là <b>thời gian chết</b>: CPU không làm việc có ích cho ai. Vì vậy đổi tiến trình quá thường xuyên sẽ làm hệ thống chậm.",
  d:[t("dd",480,450,"Thời gian chuyển = thời gian chết của CPU",{fs:20,c:"bad"})]}
]};};

/* ---------- 4. Luồng ---------- */
V["s2-4"] = function(){ return {title:"Luồng (thread): chia sẻ gì, riêng gì, dùng để làm gì", scenes:[
 {s:"Hình a: ba tiến trình, mỗi tiến trình có một luồng. Hình b: <b>một tiến trình có ba luồng</b> chạy trong cùng một không gian địa chỉ.",
  d:[H("Tiến trình và luồng"), [0,1,2].map(function(i){ return b("pa"+i,40+i*145,110,130,170,"Tiến trình "+(i+1)+"\n~ 1 luồng","gray",{fs:15}); }),
     t("la",250,320,"(a) 3 tiến trình × 1 luồng",{fs:15}), b("pb",560,110,360,170,"1 tiến trình\n~  ~  ~\n3 luồng","brand",{fs:17}), t("lb",740,320,"(b) 1 tiến trình × 3 luồng",{fs:15})]},
 {s:"Các luồng của một tiến trình <b>dùng chung</b>: không gian địa chỉ, biến toàn cục, file đang mở, tiến trình con, tín hiệu.",
  d:[clr(), H("Dùng chung và riêng"), b("sh",60,90,400,330,"DÙNG CHUNG (per process)\n\nKhông gian địa chỉ\nBiến toàn cục\nFile đang mở\nTiến trình con · tín hiệu","ok",{fs:16})]},
 {s:"Còn <b>riêng mỗi luồng</b> chỉ có những thứ để biết đang chạy tới đâu: <b>bộ đếm chương trình, thanh ghi, ngăn xếp và trạng thái</b>.",
  d:[b("pr",500,90,400,330,"RIÊNG MỖI LUỒNG (per thread)\n\nProgram counter\nThanh ghi\nStack\nTrạng thái","violet",{fs:16}), f("pr")]},
 {s:"Đa luồng có 4 ích lợi: <b>hồi đáp tốt</b>, <b>chia sẻ tài nguyên</b>, <b>tiết kiệm</b> vì tạo và chuyển luồng rẻ hơn tiến trình, và <b>tận dụng nhiều CPU</b>.",
  d:[clr(), H("4 ích lợi của đa luồng"), b("b1",60,100,400,120,"Hồi đáp tốt","brand",{fs:19,s:"luồng này chờ, luồng khác vẫn chạy"}), b("b2",500,100,400,120,"Chia sẻ tài nguyên","ok",{fs:19,s:"dùng chung bộ nhớ"}),
     b("b3",60,260,400,120,"Kinh tế","warn",{fs:19,s:"tạo, chuyển luồng rẻ"}), b("b4",500,260,400,120,"Đa bộ xử lý","violet",{fs:19,s:"các luồng chạy song song"})]},
 {s:"Ví dụ trình soạn thảo có 3 luồng: một luồng <b>nhận bàn phím</b>, một luồng <b>định dạng lại trang</b>, một luồng <b>tự động lưu</b>. Đang lưu file vẫn gõ được.",
  d:[clr(), H("Trình soạn thảo với 3 luồng"), b("wp",280,110,400,250,"","brand"), t("wpt",480,135,"Tiến trình Word",{fs:17,c:"brand"}),
     b("t1",300,170,360,48,"Luồng 1: nhận bàn phím","cyan",{fs:16}), b("t2",300,230,360,48,"Luồng 2: định dạng trang","ok",{fs:16}), b("t3",300,290,360,48,"Luồng 3: tự lưu ra đĩa","warn",{fs:16}),
     b("kb",40,180,170,60,"Bàn phím","gray",{fs:16}), a("k1",212,210,297,194,{c:"cyan"}), b("dk",750,280,170,60,"Đĩa","gray",{fs:16}), a("d1",662,314,747,310,{c:"warn"})]},
 {s:"Web server đa luồng: <b>dispatcher</b> nhận yêu cầu từ mạng rồi giao cho một <b>worker</b>. Worker tìm trang trong cache, không có thì đọc đĩa; lúc đó chỉ worker đó phải chờ.",
  d:[clr(), H("Web server đa luồng"), b("net",40,200,150,70,"Mạng","gray",{fs:17}), b("dp",270,200,190,70,"Dispatcher","brand",{fs:17}), a("n1",192,235,267,235,{c:"brand"}),
     [0,1,2].map(function(i){ return b("wk"+i,560,110+i*100,180,70,"Worker "+(i+1),"ok",{fs:17}); }), a("w0",462,225,557,150,{c:"ok"}), a("w1",462,235,557,245,{c:"ok"}), a("w2",462,245,557,340,{c:"ok"}),
     b("ca",800,130,130,70,"Cache","cyan",{fs:16}), a("c1",742,145,797,160,{c:"cyan"}), b("ds",800,310,130,70,"Đĩa","gray",{fs:16}), a("c2",742,345,797,345,{c:"gray"})]}
]};};

/* ---------- 5. Luồng mức user / kernel ---------- */
V["s2-5"] = function(){ return {title:"Luồng mức user, mức kernel và lai", scenes:[
 {s:"Luồng mức user: một <b>thư viện luồng</b> trong không gian user quản lý mọi luồng; bảng luồng nằm ngay trong tiến trình. <b>Kernel không biết</b> có luồng, nó chỉ thấy một tiến trình.",
  d:[H("Luồng mức user"), b("us",160,80,640,230,"","none",{dash:1}), t("ul",230,105,"User space",{fs:15,c:"gray"}),
     b("pp",250,125,460,165,"","brand"), t("ppt",480,148,"Tiến trình",{fs:16,c:"brand"}), [0,1,2].map(function(i){ return b("ut"+i,275+i*110,175,95,50,"luồng "+(i+1),"ok",{fs:14}); }),
     b("rt",600,175,95,95,"thread\ntable","cyan",{fs:14}), b("kn",160,340,640,110,"Kernel: chỉ có process table, không biết luồng","gray",{fs:17})]},
 {s:"Ưu điểm: tạo và chuyển luồng rất nhanh vì không phải vào kernel. Nhược điểm: một luồng gọi I/O bị chặn thì <b>cả tiến trình bị chặn</b>, mọi luồng khác đứng theo.",
  d:[u("ut0",{c:"bad",t:"chờ I/O"}), u("ut1",{c:"bad"}), u("ut2",{c:"bad"}), u("pp",{c:"bad"}), t("bk",480,490,"1 luồng chặn → cả tiến trình chặn",{fs:20,c:"bad"})]},
 {s:"Luồng mức kernel: <b>kernel quản lý</b> cả tiến trình và từng luồng, bảng luồng nằm trong kernel. Một luồng bị chặn thì các luồng khác vẫn chạy, và chạy song song được trên nhiều CPU.",
  d:[clr(), H("Luồng mức kernel"), b("pp",250,90,460,150,"","brand"), t("ppt",480,113,"Tiến trình",{fs:16,c:"brand"}),
     [0,1,2].map(function(i){ return b("kt"+i,290+i*135,145,115,55,"luồng "+(i+1),i===0?"bad":"ok",{fs:14}); }),
     b("kn",160,290,640,150,"","gray"), t("knt",480,315,"Kernel",{fs:16,c:"gray"}), b("ptb",230,345,220,70,"process table","cyan",{fs:15}), b("ttb",510,345,220,70,"thread table","cyan",{fs:15}),
     t("ok",480,490,"luồng 1 chờ I/O, luồng 2 và 3 vẫn chạy",{fs:18,c:"ok"})]},
 {s:"Đổi lại, mỗi thao tác tạo hay quản lý luồng kernel là một lời gọi hệ thống, nên <b>chậm hơn</b> luồng mức user.",
  d:[clr(), H("So sánh"), b("cu",60,90,400,320,"LUỒNG MỨC USER\n\n+ nhanh, không vào kernel\n− 1 luồng chặn → cả tiến trình\n− không tận dụng nhiều CPU","brand",{fs:16}),
     b("ck",500,90,400,320,"LUỒNG MỨC KERNEL\n\n+ luồng chặn không kéo luồng khác\n+ chạy song song nhiều CPU\n− tạo, quản lý chậm hơn","violet",{fs:16})]},
 {s:"Thực hiện lai: <b>ghép nhiều luồng mức user lên một luồng mức kernel</b>. Kernel chỉ lập lịch luồng kernel, thư viện chia lượt cho các luồng user bên trên.",
  d:[clr(), H("Thực hiện lai (hybrid)"), b("pp",260,90,440,170,"","brand"), t("ppt",480,113,"nhiều luồng user",{fs:16,c:"brand"}),
     [0,1,2,3].map(function(i){ return b("hu"+i,285+i*100,150,85,50,"u"+(i+1),"ok",{fs:14}); }), b("kn",160,330,640,110,"","gray"), t("knt",300,385,"Kernel",{fs:16,c:"gray"}),
     b("kt",430,355,200,60,"1 luồng kernel","violet",{fs:16}), a("h1",480,262,500,352,{c:"violet"}), a("h2",560,262,560,352,{c:"violet"})]}
]};};

/* ---------- 6. Lập lịch: giới thiệu ---------- */
V["s2-6"] = function(){ return {title:"Lập lịch: khi nào chọn, độc quyền hay không, tiêu chí", scenes:[
 {s:"Tiến trình chạy xen kẽ giữa <b>dùng CPU</b> và <b>chờ I/O</b>. Tiến trình hướng CPU có các đợt CPU dài; tiến trình hướng I/O có các đợt CPU ngắn và chờ I/O nhiều.",
  d:[H("CPU burst và chờ I/O"), t("la",130,140,"(a) hướng CPU",{fs:16,a:"end"}), [0,1,2].map(function(i){ return b("cb"+i,150+i*260,115,200,40,"",'brand'); }),
     t("lb",130,260,"(b) hướng I/O",{fs:16,a:"end"}), [0,1,2,3,4,5,6,7].map(function(i){ return b("ib"+i,150+i*95,240,30,40,"","ok"); }),
     t("lg",480,350,"khối màu = đang dùng CPU · khoảng trắng = chờ I/O",{fs:16,c:"gray"})]},
 {s:"Có <b>ba mức lập lịch</b>: bộ lập lịch nhận việc chọn job vào hệ thống, bộ lập lịch bộ nhớ chọn tiến trình nào nằm trong RAM, và <b>bộ lập lịch CPU</b> chọn tiến trình nào được chạy.",
  d:[clr(), H("Ba mức lập lịch"), b("q",40,250,150,70,"Hàng đợi job","gray",{fs:15}), b("ad",240,250,180,70,"Admission\nscheduler","cyan",{fs:15}),
     b("mm",470,250,180,70,"Bộ nhớ chính","ok",{fs:16}), b("ms",700,250,220,70,"Memory scheduler\n↔ đĩa","warn",{fs:15}), b("cs",470,90,180,70,"CPU scheduler\n→ CPU","brand",{fs:15}),
     a("q1",192,285,237,285), a("q2",422,285,467,285), a("q3",652,285,697,285), a("q4",560,247,560,163,{c:"brand"})]},
 {s:"Bộ lập lịch CPU phải chọn khi: tiến trình chuyển từ chạy sang bị chặn; từ chạy sang sẵn sàng; từ bị chặn hoặc mới tạo sang sẵn sàng; và khi tiến trình kết thúc.",
  d:[clr(), H("4 lúc phải chọn tiến trình"), b("c1",60,100,400,110,"1. Running → Blocked","bad",{fs:18}), b("c2",500,100,400,110,"2. Running → Ready","warn",{fs:18}),
     b("c3",60,250,400,110,"3. Blocked / mới → Ready","ok",{fs:18}), b("c4",500,250,400,110,"4. Kết thúc","gray",{fs:18})]},
 {s:"<b>Độc quyền</b>: cấp CPU rồi thì cho chạy tới khi bị chặn hoặc tự nhả. <b>Không độc quyền</b>: chỉ cho chạy một khoảng thời gian, hết giờ hoặc có tiến trình ưu tiên hơn thì bị giành CPU.",
  d:[clr(), H("Độc quyền và không độc quyền"), b("np",60,90,400,300,"ĐỘC QUYỀN\n(nonpreemptive)\n\nchạy tới khi bị chặn\nhoặc tự nhả CPU\n\nví dụ: FCFS, SJF","ok",{fs:17}),
     b("pe",500,90,400,300,"KHÔNG ĐỘC QUYỀN\n(preemptive)\n\nchạy có hạn giờ,\ncó thể bị giành CPU\n\nví dụ: RR, SRTF","warn",{fs:17})]},
 {s:"Tiêu chí lập lịch: muốn <b>lớn nhất</b> là mức sử dụng CPU và thông lượng; muốn <b>nhỏ nhất</b> là thời gian xoay vòng, thời gian chờ và thời gian hồi đáp.",
  d:[clr(), H("Tiêu chí lập lịch"), b("mx",60,90,400,250,"MAX\n\nCPU utilization\nThroughput","ok",{fs:19}), b("mn",500,90,400,250,"MIN\n\nTurnaround time\nWaiting time\nResponse time","brand",{fs:19}),
     t("fm",480,400,"Xoay vòng = xong − đến   ·   Chờ = xoay vòng − burst",{fs:18,c:"warn"})]}
]};};

/* ---------- 7. Thuật toán lập lịch ---------- */
function gantt(pre, y, segs, scale, x0, skip0){
  var out = [], cols = {P1:"brand",P2:"ok",P3:"warn",P4:"violet",A:"brand",B:"ok",C:"warn",D:"violet"};
  segs.forEach(function(s, i){ var w = (s[2]-s[1])*scale; out.push(b(pre+i, x0+s[1]*scale, y, w, 50, w >= 30 ? s[0] : "", cols[s[0]] || "gray", {fs:15})); });
  var ticks = [segs[0][1]].concat(segs.map(function(s){ return s[2]; }));
  var px = -99, low = false;
  ticks.forEach(function(v, i){ var xx = x0+v*scale; low = xx - px < 28 ? !low : false; px = xx; if (skip0 && i === 0) return; out.push(t(pre+"t"+i, xx, y+(low ? 88 : 70), String(v), {fs:13,c:"gray"})); });
  return out;
}
V["s2-7"] = function(){ return {title:"FCFS, SJF và lập lịch theo độ ưu tiên", scenes:[
 {s:"<b>FCFS</b>: đến trước phục vụ trước. Ba tiến trình P1 cần 24, P2 cần 3, P3 cần 3, đến theo thứ tự P1, P2, P3.",
  d:[H("FCFS – đến trước phục vụ trước"), gantt("g",120,[["P1",0,24],["P2",24,27],["P3",27,30]],24,120)]},
 {s:"Thời gian chờ: P1 bằng 0, P2 bằng 24, P3 bằng 27, trung bình là <b>17</b>.",
  d:[t("w1",480,240,"Chờ: P1 = 0 · P2 = 24 · P3 = 27  →  TB = 17",{fs:19,c:"bad"})]},
 {s:"Nếu đến theo thứ tự P2, P3, P1 thì thời gian chờ là 6, 0, 3, trung bình chỉ còn <b>3</b>. FCFS phụ thuộc rất nhiều vào tiến trình đứng đầu hàng.",
  d:[gantt("h",310,[["P2",0,3],["P3",3,6],["P1",6,30]],24,120), t("w2",480,430,"Chờ: P1 = 6 · P2 = 0 · P3 = 3  →  TB = 3",{fs:19,c:"ok"})]},
 {s:"<b>SJF</b>: chọn tiến trình có thời gian chạy ngắn nhất trước. Ví dụ slide 44: A cần 8, B, C, D mỗi cái cần 4. Chạy theo thứ tự đến A, B, C, D thì thời gian xoay vòng trung bình là 14.",
  d:[clr(), H("SJF – công việc ngắn nhất trước"), gantt("a",110,[["A",0,8],["B",8,12],["C",12,16],["D",16,20]],34,140), t("ta",480,225,"Xoay vòng: 8 · 12 · 16 · 20  →  TB = 14",{fs:18,c:"bad"})]},
 {s:"Chạy theo SJF là B, C, D rồi mới A: xoay vòng 4, 8, 12, 20, trung bình chỉ còn <b>11</b>. SJF cho thời gian chờ trung bình <b>nhỏ nhất</b>.",
  d:[gantt("s",290,[["B",0,4],["C",4,8],["D",8,12],["A",12,20]],34,140), t("ts",480,405,"Xoay vòng: 4 · 8 · 12 · 20  →  TB = 11",{fs:18,c:"ok"})]},
 {s:"SJF không độc quyền gọi là <b>SRTF</b>: nếu tiến trình mới đến có thời gian chạy ngắn hơn phần còn lại của tiến trình đang chạy, nó được giành CPU.",
  d:[clr(), H("SRTF = SJF không độc quyền"), b("run",120,150,320,90,"đang chạy: còn 6","brand",{fs:18}), b("nw",520,150,320,90,"mới đến: cần 2","ok",{fs:18}),
     a("gr",680,245,300,330,{c:"ok",t:"2 < 6 → giành CPU",cv:40}), b("rs",120,330,320,90,"mới đến chạy trước","ok",{fs:18})]},
 {s:"Lập lịch theo <b>độ ưu tiên</b>: CPU cấp cho tiến trình ưu tiên cao nhất. Tiến trình ưu tiên thấp có thể <b>đói</b>, chờ mãi. Cách chữa là <b>lão hóa</b>: chờ càng lâu thì độ ưu tiên càng tăng.",
  d:[clr(), H("Lập lịch theo độ ưu tiên"), ["Ưu tiên 4 (cao)","Ưu tiên 3","Ưu tiên 2","Ưu tiên 1 (thấp)"].map(function(c,i){ return b("pq"+i,80,90+i*85,240,65,c,["bad","warn","ok","gray"][i],{fs:16}); }),
     b("st",420,345,250,65,"chờ mãi = đói","bad",{fs:17}), a("ag",545,340,545,170,{c:"ok",t:"aging: tăng ưu tiên dần",lx:110}), f("st")]}
]};};
V["s2-7~rr"] = function(){ return {title:"Round Robin với quantum = 20 (slide 47)", scenes:[
 {s:"<b>Round Robin</b>: mỗi tiến trình được chạy tối đa một lát thời gian gọi là <b>quantum</b>. Hết lượt mà chưa xong thì xuống <b>cuối hàng đợi</b>.",
  d:[H("Round Robin – xoay vòng"), ["P1","P2","P3","P4"].map(function(c,i){ return b("q"+i,160+i*120,120,100,60,c,["brand","ok","warn","violet"][i],{fs:18}); }),
     a("cpu",160,250,640,250,{t:"chạy tối đa q rồi xuống cuối hàng",c:"gray",cv:60})]},
 {s:"Ví dụ slide 47: quantum bằng 20, P1 cần 53, P2 cần 17, P3 cần 68, P4 cần 24.",
  d:[t("bt",480,350,"q = 20 · P1 = 53 · P2 = 17 · P3 = 68 · P4 = 24",{fs:20,c:"brand"})]},
 {s:"Lượt đầu: P1 chạy 0 đến 20, P2 chỉ cần 17 nên xong ở 37, P3 chạy 37 đến 57, P4 chạy 57 đến 77.",
  d:[clr(), H("Biểu đồ Gantt (q = 20)"), gantt("r",130,[["P1",0,20],["P2",20,37],["P3",37,57],["P4",57,77]],5,70)]},
 {s:"Lượt hai: P1 chạy 77 đến 97, P3 chạy 97 đến 117, P4 còn 4 nên xong ở 121.",
  d:[gantt("r2",130,[["P1",77,97],["P3",97,117],["P4",117,121]],5,70,1)]},
 {s:"Rồi P1 chạy nốt 13 và xong ở 134; P3 chạy tiếp 134 đến 154 và 154 đến 162 thì xong.",
  d:[gantt("r3",130,[["P1",121,134],["P3",134,154],["P3",154,162]],5,70,1)]},
 {s:"Thời gian chờ: P1 là 81, P2 là 20, P3 là 94, P4 là 97, trung bình 73. So với SJF thì thời gian xoay vòng cao hơn, nhưng <b>thời gian hồi đáp tốt hơn</b>.",
  d:[t("wt",480,300,"Chờ: P1 = 81 · P2 = 20 · P3 = 94 · P4 = 97  →  TB = 73",{fs:19,c:"warn"})]},
 {s:"Chọn quantum: <b>q lớn</b> thì RR thành FIFO; <b>q nhỏ</b> thì tốn nhiều thời gian chuyển ngữ cảnh. Với n tiến trình, không ai chờ quá n trừ 1 nhân q.",
  d:[b("ql",120,370,330,90,"q lớn → giống FIFO","ok",{fs:18}), b("qs",510,370,330,90,"q nhỏ → tốn chuyển ngữ cảnh","bad",{fs:17})]}
]};};

/* ---------- 8. Thời gian thực, chính sách, lập lịch luồng ---------- */
V["s2-8"] = function(){ return {title:"Thời gian thực và lập lịch luồng", scenes:[
 {s:"Hệ thống <b>hard real-time</b>: tác vụ quan trọng bắt buộc xong đúng hạn, như phanh ABS. <b>Soft real-time</b>: tác vụ quan trọng được ưu tiên hơn, trễ chút vẫn chấp nhận, như phát video.",
  d:[H("Hệ thống thời gian thực"), b("hd",60,100,400,160,"Hard real-time\nbắt buộc đúng hạn","bad",{fs:19,s:"phanh ABS, máy thở"}), b("sf",500,100,400,160,"Soft real-time\nđược ưu tiên hơn","warn",{fs:19,s:"phát video"})]},
 {s:"Với m sự kiện định kỳ, sự kiện i có chu kỳ P i và cần C i giây CPU. Hệ thống lập lịch được nếu tổng C i chia P i không vượt quá 1.",
  d:[b("fm",230,320,500,90,"Σ Cᵢ / Pᵢ ≤ 1","violet",{fs:26})]},
 {s:"<b>Lập lịch luồng mức user</b>: kernel chọn tiến trình, thư viện trong tiến trình chọn luồng. Tiến trình A được 50 mili giây, mỗi luồng chạy 5 mili giây: A1, A2, A3, A1… được, còn A1, B1, A2, B2 thì không thể.",
  d:[clr(), H("Lập lịch luồng mức user"), b("ka",60,90,840,60,"Kernel chọn tiến trình A (quantum 50 ms)","gray",{fs:17}),
     ["A1","A2","A3","A1","A2","A3"].map(function(c,i){ return b("ua"+i,60+i*140,190,120,55,c,"ok",{fs:17}); }), t("ok1",480,290,"có thể: A1 A2 A3 A1 A2 A3",{fs:18,c:"ok"}),
     t("no1",480,350,"không thể: A1 B1 A2 B2 (phải hết 50 ms của A mới sang B)",{fs:17,c:"bad"})]},
 {s:"<b>Lập lịch luồng mức kernel</b>: kernel chọn thẳng từng luồng, nên cả A1, A2, A3 lẫn A1, B1, A2, B2 đều có thể xảy ra.",
  d:[clr(), H("Lập lịch luồng mức kernel"), b("kk",60,90,840,60,"Kernel chọn thẳng từng luồng","violet",{fs:17}),
     ["A1","B1","A2","B2","A3","B3"].map(function(c,i){ return b("kb"+i,60+i*140,190,120,55,c,i%2?"cyan":"ok",{fs:17}); }), t("ok2",480,300,"cả hai thứ tự đều có thể",{fs:19,c:"ok"})]},
 {s:"Chính sách và cơ chế: <b>cơ chế</b> lập lịch nằm trong kernel và được tham số hóa, còn <b>chính sách</b> là tham số do tiến trình người dùng điền, ví dụ tiến trình cha đặt ưu tiên cho luồng con quan trọng.",
  d:[clr(), H("Chính sách và cơ chế"), b("mc",60,120,400,180,"CƠ CHẾ\nnằm trong kernel\n(cách làm)","brand",{fs:18}), b("pl",500,120,400,180,"CHÍNH SÁCH\ntham số do tiến trình user điền\n(làm gì, ai quan trọng)","ok",{fs:17})]}
]};};

/* ---------- 9. Tranh đua và miền găng ---------- */
V["s2-9"] = function(){ return {title:"Tranh đua và miền găng", scenes:[
 {s:"Hai tiến trình dùng chung biến x bằng 5. P1 làm x cộng 1, P2 làm x trừ 1. Đúng ra kết quả phải là 5.",
  d:[H("Điều kiện tranh đua"), b("xv",380,90,200,70,"x = 5","violet",{fs:22}), b("p1",90,220,280,70,"P1: x = x + 1","brand",{fs:18}), b("p2",590,220,280,70,"P2: x = x − 1","ok",{fs:18})]},
 {s:"Nhưng mỗi lệnh thật ra gồm 3 bước: đọc, tính, ghi. P1 đọc được 5 thì bị ngắt. P2 đọc 5, ghi 4. P1 chạy tiếp, ghi 6. Kết quả là <b>6</b>, sai!",
  d:[t("s1",230,330,"P1 đọc 5 … bị ngắt",{fs:17,c:"brand"}), t("s2",730,330,"P2 đọc 5 → ghi 4",{fs:17,c:"ok"}), t("s3",230,380,"P1 chạy tiếp → ghi 6",{fs:17,c:"brand"}),
     u("xv",{t:"x = 6 ✘",c:"bad"}), f("xv")]},
 {s:"Đó là <b>điều kiện tranh đua</b>: kết quả phụ thuộc vào tiến trình nào chạy lúc nào. Cách chữa là <b>loại trừ lẫn nhau</b>: không cho hai tiến trình cùng truy cập dữ liệu chung một lúc.",
  d:[t("rc",480,460,"Kết quả phụ thuộc thứ tự chạy = tranh đua",{fs:20,c:"bad"})]},
 {s:"Phần chương trình truy cập bộ nhớ dùng chung gọi là <b>đoạn găng</b> hay <b>miền găng</b>. Một giải pháp tốt phải thỏa <b>4 điều kiện</b>.",
  d:[clr(), H("4 điều kiện của giải pháp đoạn găng"), b("c1",60,90,400,120,"1. Không hai tiến trình\ncùng ở trong đoạn găng","brand",{fs:17}), b("c2",500,90,400,120,"2. Không giả định tốc độ\nhay số CPU","cyan",{fs:17}),
     b("c3",60,240,400,120,"3. Ở ngoài đoạn găng\nkhông được chặn ai","ok",{fs:17,s:"tiến độ"}), b("c4",500,240,400,120,"4. Không ai chờ vô hạn","warn",{fs:17,s:"chờ có hạn"})]},
 {s:"Slide 61: A vào đoạn găng lúc T1. B muốn vào lúc T2 nên <b>bị chặn</b>. A ra lúc T3 thì B mới vào, và B ra lúc T4.",
  d:[clr(), H("Loại trừ nhau bằng đoạn găng"), t("la",90,170,"A",{fs:20}), t("lb",90,320,"B",{fs:20}), b("ab",120,150,840-120,40,"","none",{dash:1}),
     b("acs",200,150,260,40,"A trong đoạn găng","brand",{fs:15}), b("bwt",330,300,130,40,"B bị chặn","bad",{fs:14}), b("bcs",460,300,240,40,"B trong đoạn găng","ok",{fs:15}),
     t("t1",200,240,"T1",{fs:15,c:"gray"}), t("t2",330,240,"T2",{fs:15,c:"gray"}), t("t3",460,240,"T3",{fs:15,c:"gray"}), t("t4",700,240,"T4",{fs:15,c:"gray"})]},
 {s:"Ví von: nhà vệ sinh một buồng. Không hai người cùng vào; người đứng ngoài không được giữ khóa cửa; và không ai phải xếp hàng mãi mãi.",
  d:[t("vv",480,430,"Như nhà vệ sinh một buồng: mỗi lúc chỉ một người",{fs:19,c:"warn"})]}
]};};

/* ---------- 10. Chờ bận ---------- */
V["s2-10"] = function(){ return {title:"Biến khóa và luân phiên (chờ bận)", scenes:[
 {s:"Các giải pháp <b>chờ bận</b>: chưa được vào thì lặp liên tục kiểm tra điều kiện. Có ba giải pháp mềm là biến khóa, luân phiên, Peterson; và hai giải pháp cứng là cấm ngắt và lệnh TSL.",
  d:[H("Loại trừ nhau với chờ bận"), b("sw",60,90,400,260,"GIẢI PHÁP MỀM\n\n1. Biến khóa (lock)\n2. Luân phiên (turn)\n3. Peterson","brand",{fs:18}), b("hw",500,90,400,260,"GIẢI PHÁP CỨNG\n\n1. Cấm ngắt\n2. Lệnh TSL","violet",{fs:18})]},
 {s:"<b>Biến khóa</b>: lock bằng 0 là trống. Tiến trình chờ tới khi lock bằng 0, rồi đặt lock bằng 1 và vào đoạn găng.",
  d:[clr(), H("Giải pháp mềm 1: biến khóa"), b("lk",380,75,200,55,"lock = 0","violet",{fs:20}),
     b("p0",60,160,380,200,"P0\nwhile (lock == 1);\nlock = 1;\nCS;\nlock = 0;","brand",{fs:16}), b("p1",520,160,380,200,"P1\nwhile (lock == 1);\nlock = 1;\nCS;\nlock = 0;","ok",{fs:16})]},
 {s:"Lỗi: kiểm tra và đặt khóa là <b>hai bước rời nhau</b>. P0 thấy lock bằng 0, chưa kịp đặt thì bị ngắt; P1 cũng thấy 0 và vào. P0 chạy tiếp cũng vào: <b>cả hai cùng trong đoạn găng</b>.",
  d:[f("p0","p1"), u("p0",{c:"bad"}), u("p1",{c:"bad"}), t("er",480,430,"Cả hai cùng thấy lock = 0 → cùng vào ✘",{fs:20,c:"bad"})]},
 {s:"<b>Luân phiên</b>: biến turn cho biết đến phiên ai. Ban đầu turn bằng 1, nên P0 phải chờ còn <b>P1 vào trước</b>; P1 ra thì đặt turn bằng 0 cho P0.",
  d:[clr(), H("Giải pháp mềm 2: luân phiên"), b("tn",380,75,200,55,"turn = 1","violet",{fs:20}),
     b("q0",60,160,380,190,"P0\nwhile (turn != 0);\nCS;\nturn = 1;","gray",{fs:16}), b("q1",520,160,380,190,"P1\nwhile (turn != 1);\nCS;\nturn = 0;","ok",{fs:16}), f("q1")]},
 {s:"Luân phiên có loại trừ, nhưng <b>cứng nhắc</b>: P0 muốn vào hai lần liên tiếp phải đợi P1 vào một lần, dù P1 đang bận việc ở ngoài. Vi phạm điều kiện 3.",
  d:[t("er2",480,430,"Ngoài đoạn găng mà vẫn chặn người khác → vi phạm điều kiện 3",{fs:18,c:"bad"})]}
]};};
V["s2-10~pet"] = function(){ return {title:"Peterson, cấm ngắt và lệnh TSL", scenes:[
 {s:"<b>Peterson</b> kết hợp hai ý: mảng interest cho biết ai muốn vào, và biến turn để nhường lượt.",
  d:[H("Giải pháp mềm 3: Peterson"), b("cd",160,80,640,260,"interest[i] = TRUE;   // tôi muốn vào\nturn = j;            // mời bạn trước\nwhile (turn == j && interest[j]);\nCS;\ninterest[i] = FALSE;","brand",{fs:17})]},
 {s:"Ví von: hai người cùng tới cửa. Mỗi người giơ tay nói tôi muốn vào, rồi lịch sự nói <b>mời bạn trước</b>. Người nói câu đó <b>sau cùng</b> sẽ phải chờ.",
  d:[b("v1",120,380,320,90,"P0: “mời P1 trước”","ok",{fs:17}), b("v2",520,380,320,90,"P1: “mời P0 trước” (nói sau)","warn",{fs:16}), a("vv",680,375,300,375,{c:"ok",t:"P0 vào",cv:-40})]},
 {s:"Peterson thỏa đủ ba yêu cầu: <b>loại trừ</b>, <b>tiến độ</b> và <b>chờ có hạn</b>. Nhược điểm: chỉ dùng cho 2 tiến trình và vẫn chờ bận.",
  d:[clr(), H("Nhận xét Peterson"), b("o1",60,100,260,100,"Loại trừ ✔","ok",{fs:19}), b("o2",350,100,260,100,"Tiến độ ✔","ok",{fs:19}), b("o3",640,100,260,100,"Chờ có hạn ✔","ok",{fs:19}),
     b("o4",200,260,560,100,"Chỉ 2 tiến trình · vẫn chờ bận","bad",{fs:19})]},
 {s:"Giải pháp cứng 1, <b>cấm ngắt</b>: vào đoạn găng thì tắt mọi ngắt nên không bị chuyển tiến trình. Nguy hiểm: kẹt trong đoạn găng là treo máy, và trên nhiều CPU thì không bảo đảm loại trừ.",
  d:[clr(), H("Giải pháp cứng 1: cấm ngắt"), b("di",120,100,320,90,"Disable Interrupt\nCS\nEnable Interrupt","violet",{fs:16}),
     b("r1",520,90,380,70,"kẹt trong CS → treo máy","bad",{fs:16}), b("r2",520,180,380,70,"cho user dùng lệnh đặc quyền","bad",{fs:16}), b("r3",520,270,380,70,"N CPU → không chắc loại trừ","bad",{fs:16})]},
 {s:"Giải pháp cứng 2, <b>lệnh TSL</b>: CPU vừa trả về giá trị cũ của lock vừa đặt lock bằng TRUE trong <b>một lệnh không chia cắt được</b>. Nhờ vậy không ai chen vào giữa bước kiểm tra và bước đặt.",
  d:[clr(), H("Giải pháp cứng 2: lệnh TSL"), b("tl",200,90,560,200,"int lock = 0;\nwhile (TSL(lock));   // chờ\nCS;\nlock = 0;","violet",{fs:18}),
     t("tn",480,350,"Kiểm tra + đặt khóa = 1 lệnh nguyên tử",{fs:20,c:"ok"})]},
 {s:"Nhận xét chung: chờ bận <b>lãng phí CPU</b> vì cứ lặp kiểm tra. Cách khắc phục là cho tiến trình chưa đủ điều kiện <b>ngủ</b>, nhường CPU cho người khác: đó là Sleep và Wakeup.",
  d:[t("cm",480,430,"Chờ bận lãng phí CPU → nên cho tiến trình ngủ",{fs:20,c:"bad"})]}
]};};

/* ---------- 11. Sleep & Wakeup, Semaphore, Monitor ---------- */
V["s2-11"] = function(){ return {title:"Sleep & Wakeup, Semaphore, Monitor", scenes:[
 {s:"Thay vì đứng ngoài hỏi liên tục, tiến trình không vào được đoạn găng thì gọi <b>Sleep</b> để ngủ. Tiến trình ra khỏi đoạn găng gọi <b>WakeUp</b> để đánh thức người đang chờ.",
  d:[H("Sleep & Wakeup"), b("pa",80,110,300,100,"P trong đoạn găng","ok",{fs:18}), b("pb",580,110,300,100,"Q: Sleep()\nbị chặn, không tốn CPU","gray",{fs:16}),
     a("wk",380,250,580,250,{t:"ra khỏi CS → WakeUp(Q)",c:"ok",cv:40}), f("wk")]},
 {s:"Lỗi của Sleep và Wakeup: Q kiểm tra thấy bận, <b>chưa kịp ngủ</b> thì bị ngắt. P ra khỏi đoạn găng gọi WakeUp nhưng Q chưa ngủ nên tín hiệu bị mất. Q quay lại ngủ và <b>ngủ mãi</b>.",
  d:[u("pb",{c:"bad",t:"Q ngủ mãi\n(mất tín hiệu)"}), t("ls",480,400,"Mất tín hiệu đánh thức",{fs:20,c:"bad"})]},
 {s:"<b>Semaphore</b> do Dijkstra đề xuất năm 1965: một giá trị nguyên kèm danh sách tiến trình đang chờ, dùng qua hai thao tác không chia cắt là <b>Down</b> và <b>Up</b>.",
  d:[clr(), H("Semaphore"), b("dn",60,90,400,250,"Down(S)\nS.value--\nnếu S.value < 0:\n  đưa vào danh sách, Sleep","brand",{fs:17}),
     b("up",500,90,400,250,"Up(S)\nS.value++\nnếu S.value ≤ 0:\n  lấy ra khỏi danh sách, Wakeup","ok",{fs:17})]},
 {s:"Dùng để <b>loại trừ</b>: đặt s bằng 1. Ai vào trước làm s về 0 rồi vào; người sau làm s âm thì ngủ, cho tới khi người trước gọi Up.",
  d:[clr(), H("s = 1: loại trừ lẫn nhau"), b("sv",380,80,200,60,"s = 1","violet",{fs:20}), b("c1",60,200,380,90,"P1: Down(s) → s = 0 → vào CS","ok",{fs:16}),
     b("c2",520,200,380,90,"P2: Down(s) → s = −1 → ngủ","bad",{fs:16}), a("c3",440,330,520,330,{c:"ok",t:"P1 Up(s) → đánh thức P2"})]},
 {s:"Dùng để <b>định thứ tự</b>: đặt s bằng 0. P2 làm Down trước thì ngủ, cho tới khi P1 làm xong Job1 và gọi Up. Nhờ vậy Job2 luôn chạy sau Job1.",
  d:[clr(), H("s = 0: định thứ tự"), b("sv",380,80,200,60,"s = 0","violet",{fs:20}), b("j1",80,200,340,110,"P1:\nJob1;\nUp(s);","brand",{fs:17}),
     b("j2",540,200,340,110,"P2:\nDown(s);\nJob2;","ok",{fs:17}), a("jj",422,280,537,240,{c:"bad",t:"Up đánh thức"}), t("od",480,380,"Job2 luôn chạy sau Job1",{fs:20,c:"ok"})]},
 {s:"<b>Monitor</b> do Hoare và Brinch Hansen đề xuất, được ngôn ngữ lập trình cung cấp. Mỗi lúc chỉ một tiến trình chạy trong monitor nên <b>loại trừ được làm tự động</b>; đồng bộ thêm bằng biến điều kiện Wait và Signal.",
  d:[clr(), H("Monitor"), b("mo",230,90,500,250,"monitor M {\n  biến dùng chung\n  procedure F1() { …; Signal(c); }\n  procedure F2() { Wait(c); …; }\n}","cyan",{fs:16}),
     t("mn",480,400,"Loại trừ tự động · biến điều kiện Wait / Signal",{fs:18,c:"ok"})]},
 {s:"<b>Message passing</b>: gửi bằng send, nhận bằng receive, phải biết tên bên kia. Cuối cùng là ba bài toán đồng bộ kinh điển: bộ đệm có hạn, người đọc người ghi, và bữa tối của các triết gia.",
  d:[clr(), H("Message passing và bài toán kinh điển"), b("ps",60,90,190,70,"P","brand",{fs:18}), b("qr",710,90,190,70,"Q","ok",{fs:18}),
     a("ms",252,125,707,125,{t:"send(Q, msg) → receive(P, msg)",c:"violet"}),
     b("k1",60,260,260,110,"Bounded-Buffer\n(sản xuất – tiêu dùng)","warn",{fs:15}), b("k2",350,260,260,110,"Readers –\nWriters","warn",{fs:15}), b("k3",640,260,260,110,"Dining-\nPhilosophers","warn",{fs:15})]}
]};};

Object.assign(window.VLABEL, {"s2-7":"FCFS, SJF, ưu tiên","s2-7~rr":"Round Robin","s2-10":"Biến khóa, luân phiên","s2-10~pet":"Peterson, cấm ngắt, TSL"});
})();
