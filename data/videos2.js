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
/* các dòng code của một tiến trình: hộp ở cột x, dòng k ở y = Y0 + k*52 (tâm dòng = Y0 + 21 + k*52) */
function codeCol(pre, x, lines, w, y0){ return lines.map(function(l, k){ return b(pre+k, x, (y0 || 150)+k*52, w || 360, 42, l, "gray", {fs:14}); }); }
function py(k, y0){ return (y0 || 150) + 21 + k*52; }

V["s2-10"] = function(){ return {title:"Chờ bận và giải pháp mềm 1: biến khóa", scenes:[
 {s:"Bài toán của mục này: P0 và P1 cùng muốn vào <b>đoạn găng</b>. Ta phải viết thêm code <b>vào</b> trước đoạn găng và code <b>ra</b> sau đoạn găng, sao cho mỗi lúc chỉ một tiến trình ở trong. Mỗi giải pháp chỉ khác nhau ở hai phần này.",
  d:[H("Bài toán đoạn găng"), b("sk",250,80,460,250,"","gray"), b("s0",280,95,400,40,"NonCS;   (việc riêng)","none",{fs:16}), b("s1",280,140,400,40,"[ code VÀO ]","warn",{fs:17}),
     b("s2",280,185,400,40,"CS;   (đoạn găng)","ok",{fs:17}), b("s3",280,230,400,40,"[ code RA ]","warn",{fs:17}), b("s4",280,275,400,40,"NonCS;","none",{fs:16}), f("s1","s3")]},
 {s:"Ví von xuyên suốt: đoạn găng là lúc ở trong <b>nhà vệ sinh một buồng</b>. Mỗi giải pháp là một kiểu <b>luật xếp hàng</b> khác nhau.",
  d:[b("v1",60,380,400,90,"Đoạn găng = ở trong buồng","cyan",{fs:17}), b("v2",500,380,400,90,"Giải pháp = luật xếp hàng","warn",{fs:17})]},
 {s:"Cả 5 giải pháp ở mục này đều là <b>chờ bận</b>: chưa được vào thì đứng lặp kiểm tra mãi. Dấu chấm phẩy ngay sau while nghĩa là thân vòng lặp rỗng, cứ kiểm tra lại điều kiện liên tục.",
  d:[clr(), H("Chờ bận (busy waiting) là gì?"), b("wl",200,90,560,80,"while (điều kiện);    // chờ","brand",{fs:20}),
     t("w1",480,220,"dấu ; ngay sau while → thân vòng lặp rỗng → kiểm tra lại liên tục",{fs:17})]},
 {s:"Trong lúc chờ, tiến trình <b>vẫn chiếm CPU</b> mà không làm được gì có ích. Giống như đứng trước cửa, cứ vài giây lại gõ cửa hỏi: xong chưa?",
  d:[t("w2",480,265,"trong lúc chờ vẫn chiếm CPU mà không làm gì có ích",{fs:17,c:"bad"}), b("dr",250,320,460,110,"Đứng trước cửa, cứ gõ cửa hỏi\n“xong chưa?”","warn",{fs:18})]},
 {s:"Nhắc lại 4 điều kiện. Hai điều cần để ý nhất: điều kiện 1, <b>có loại trừ không</b>; và điều kiện 3, <b>có ai bị chặn vô lý không</b>, tức là người ở ngoài đoạn găng mà vẫn chặn người khác.",
  d:[clr(), H("4 điều kiện cần thỏa"), b("c1",60,90,400,110,"1. Có loại trừ không?","brand",{fs:19,s:"không hai người cùng trong CS"}), b("c2",500,90,400,110,"2. Nhanh chậm vẫn đúng?","gray",{fs:19,s:"không giả định tốc độ, số CPU"}),
     b("c3",60,240,400,110,"3. Có ai bị chặn vô lý?","ok",{fs:19,s:"ở ngoài CS không được chặn ai"}), b("c4",500,240,400,110,"4. Có ai chờ mãi?","gray",{fs:19,s:"không chờ vô hạn"}), f("c1","c3")]},
 {s:"Tổng quan 5 giải pháp: biến khóa <b>sai</b>; luân phiên có loại trừ nhưng <b>cứng nhắc</b>; Peterson <b>đúng</b> cho 2 tiến trình; cấm ngắt <b>nguy hiểm</b>; và lệnh TSL <b>đúng</b> cho nhiều tiến trình.",
  d:[clr(), H("Tổng quan 5 giải pháp chờ bận"),
     [["Mềm 1: Biến khóa","✘ sai: hai người cùng vào","bad"],["Mềm 2: Luân phiên","có loại trừ nhưng cứng nhắc","warn"],["Mềm 3: Peterson","✔ đúng (2 tiến trình)","ok"],["Cứng 1: Cấm ngắt","đúng trên 1 CPU nhưng nguy hiểm","warn"],["Cứng 2: Lệnh TSL","✔ đúng (N tiến trình)","ok"]].map(function(r,i){
       return [b("on"+i,60,80+i*80,330,64,r[0],"gray",{fs:17}), b("ov"+i,410,80+i*80,490,64,r[1],r[2],{fs:17})]; })]},
 {s:"Giải pháp mềm 1, <b>biến khóa</b>: lock bằng 0 là cửa trống, bằng 1 là có người. Muốn vào: chờ tới khi lock bằng 0, rồi đặt lock bằng 1. Ra thì đặt lại lock bằng 0.",
  d:[clr(), H("Mềm 1: biến khóa"), b("lk",380,75,200,50,"lock = 0","violet",{fs:18}),
     codeCol("L",150,["while (lock == 1);   // (a) có người thì chờ","lock = 1;            // (b) treo biển “có người”","CS;","lock = 0;            // ra thì lật biển “trống”"],660)]},
 {s:"Trông có vẻ đúng. Nhưng bước a nhìn biển và bước b treo biển là <b>hai lệnh riêng</b>. CPU có thể chuyển sang tiến trình khác <b>ngay giữa hai lệnh đó</b>. Cùng chạy thử để thấy.",
  d:[u("L0",{c:"bad"}), u("L1",{c:"bad"}), t("gp",480,400,"CPU có thể chuyển tiến trình ngay giữa (a) và (b)",{fs:18,c:"bad"}), f("L0","L1")]},
 {s:"Chạy thử. Ban đầu lock bằng 0. Cả P0 và P1 đều muốn vào, con trỏ của cả hai đang ở dòng kiểm tra while.",
  d:[clr(), H("Chạy thử biến khóa"), b("lk",380,70,200,50,"lock = 0","violet",{fs:18}), t("h0",240,135,"P0",{fs:16,c:"brand"}), t("h1",720,135,"P1",{fs:16,c:"ok"}),
     codeCol("a",60,["while (lock == 1);","lock = 1;","CS;","lock = 0;"]), codeCol("b",540,["while (lock == 1);","lock = 1;","CS;","lock = 0;"]),
     d("p0",42,py(0),{t:"▶",c:"brand",r:12}), d("p1",522,py(0),{t:"▶",c:"ok",r:12})]},
 {s:"Bước 1: P0 kiểm tra, thấy lock bằng 0 nên thoát vòng chờ, con trỏ xuống dòng lock bằng 1.",
  d:[u("p0",{y:py(1)}), u("a0",{c:"brand"})]},
 {s:"Bước 2: <b>ngắt đồng hồ</b> xảy ra, CPU chuyển sang P1 trước khi P0 kịp đặt lock bằng 1. Lúc này lock <b>vẫn bằng 0</b>.",
  d:[u("a0",{c:"gray"}), t("in",480,400,"⚡ ngắt: CPU chuyển sang P1, lock vẫn = 0",{fs:18,c:"bad"}), f("lk")]},
 {s:"Bước 3: P1 kiểm tra, cũng thấy lock bằng 0, nên P1 cũng thoát vòng chờ.",
  d:[x("in"), u("p1",{y:py(1)}), u("b0",{c:"ok"})]},
 {s:"Bước 4: P1 đặt lock bằng 1 rồi vào đoạn găng.",
  d:[u("b0",{c:"gray"}), u("lk",{t:"lock = 1"}), u("p1",{y:py(2)}), u("b2",{c:"ok"})]},
 {s:"Bước 5: P0 được chạy lại, tiếp tục <b>đúng chỗ đã dừng</b>: nó không kiểm tra lại nữa mà đặt lock bằng 1 và vào đoạn găng luôn.",
  d:[u("p0",{y:py(2)}), u("a2",{c:"bad"}), u("b2",{c:"bad"}), t("er",480,400,"Cả P0 và P1 cùng trong đoạn găng ✘",{fs:20,c:"bad"})]},
 {s:"Kết luận: biến khóa <b>vi phạm điều kiện 1</b>, vì nhìn biển và treo biển bị tách làm hai bước. Giống hai người cùng thấy biển trống, cùng đẩy cửa bước vào, ai cũng tưởng mình đến trước.",
  d:[x("er"), b("cc",180,380,600,100,"Nhìn biển và treo biển tách rời → hai người cùng vào","bad",{fs:18})]}
]};};

V["s2-10~turn"] = function(){ return {title:"Giải pháp mềm 2: luân phiên", scenes:[
 {s:"Giải pháp mềm 2, <b>luân phiên</b>: bỏ biển có người, thay bằng biến <b>turn</b> cho biết <b>đến phiên ai</b>. P0 chỉ vào khi turn bằng 0, P1 chỉ vào khi turn bằng 1. Ra thì nhường phiên cho người kia.",
  d:[H("Mềm 2: luân phiên"), b("tn",380,70,200,50,"turn = 1","violet",{fs:18}), t("h0",240,135,"P0",{fs:16,c:"brand"}), t("h1",720,135,"P1",{fs:16,c:"ok"}),
     codeCol("a",60,["NonCS;","while (turn != 0);   // chờ","CS;","turn = 1;   // nhường P1"]), codeCol("b",540,["NonCS;","while (turn != 1);   // chờ","CS;","turn = 0;   // nhường P0"])]},
 {s:"Vì turn chỉ mang <b>một giá trị</b>, không bao giờ cả hai cùng thấy đến phiên mình. Nên luân phiên <b>có loại trừ</b>.",
  d:[t("lt",480,400,"turn chỉ có 1 giá trị → chỉ 1 người thấy “đến phiên mình” → có loại trừ ✔",{fs:17,c:"ok"})]},
 {s:"Chạy thử. Ban đầu turn bằng 1. Cả hai muốn vào. P0 kiểm tra: turn khác 0 nên <b>chờ</b>. P1 kiểm tra: turn bằng 1 nên <b>vào trước</b>.",
  d:[x("lt"), d("p0",42,py(1),{t:"▶",c:"brand",r:12}), d("p1",522,py(2),{t:"▶",c:"ok",r:12}), u("a1",{c:"warn"}), u("b2",{c:"ok"}), t("w0",240,400,"P0 chờ",{fs:18,c:"warn"})]},
 {s:"P1 ra khỏi đoạn găng, đặt turn bằng 0 để nhường P0. Giờ P0 kiểm tra lại thì thấy turn bằng 0, được vào.",
  d:[u("b2",{c:"gray"}), u("p1",{y:py(3)}), u("tn",{t:"turn = 0"}), f("tn"), x("w0"), u("a1",{c:"gray"}), u("p0",{y:py(2)}), u("a2",{c:"ok"})]},
 {s:"Cứ thế hai bên <b>bắt buộc thay phiên</b>: P1, P0, P1, P0… Chỗ này nghe công bằng, nhưng lại sinh ra vấn đề.",
  d:[u("a2",{c:"gray"}), u("p0",{y:py(3)}), u("tn",{t:"turn = 1"}), t("ord",480,400,"P1 → P0 → P1 → P0 → … (bắt buộc thay phiên)",{fs:18,c:"warn"})]},
 {s:"Tình huống: P1 vừa ra, đặt turn bằng 0. P0 lại đang <b>bận việc riêng rất lâu</b>, không hề muốn vào đoạn găng.",
  d:[x("ord"), u("p0",{y:py(0)}), u("a0",{c:"violet",t:"NonCS; (bận việc riêng rất lâu)"}), u("tn",{t:"turn = 0"}), u("p1",{y:py(0)})]},
 {s:"P1 muốn vào <b>lần nữa</b>. Kiểm tra: turn bằng 0, khác 1, nên P1 <b>phải chờ</b>. Đoạn găng đang trống mà P1 vẫn không được vào.",
  d:[u("p1",{y:py(1)}), u("b1",{c:"bad"}), t("cs0",720,400,"CS trống nhưng P1 phải chờ ✘",{fs:18,c:"bad"}), f("b1")]},
 {s:"P0 ở <b>ngoài</b> đoạn găng mà vẫn chặn được P1: luân phiên <b>vi phạm điều kiện 3</b>. Ngoài ra nó chỉ dùng được cho 2 tiến trình.",
  d:[b("v3",120,450,720,60,"Ở ngoài CS mà vẫn chặn người khác → vi phạm điều kiện 3","bad",{fs:17})]},
 {s:"Ví von: hai anh em được quy định thay phiên rửa bát. Hôm nay đến phiên em, nhưng em đi vắng. Anh muốn rửa cũng không được phép, bát cứ để đó.",
  d:[clr(), H("Ví von: thay phiên rửa bát"), b("e1",80,120,360,130,"Hôm nay đến phiên em\n(em đi vắng)","violet",{fs:18}), b("e2",520,120,360,130,"Anh muốn rửa\nnhưng không được phép","bad",{fs:18}),
     t("e3",480,330,"Luân phiên: có loại trừ ✔ · cứng nhắc ✘ · chỉ 2 tiến trình",{fs:19,c:"warn"})]}
]};};

V["s2-10~pet"] = function(){
 var codeP = ["interest[i] = TRUE;            // (1) giơ tay","turn = j;                      // (2) mời bạn trước","while (turn == j && interest[j]);   // (3) chờ","CS;","interest[i] = FALSE;           // (4) hạ tay"];
 return {title:"Giải pháp mềm 3: Peterson", scenes:[
 {s:"Giải pháp mềm 3, <b>Peterson</b>, ghép hai ý trước: mảng <b>interest</b> cho biết ai đang muốn vào, và biến <b>turn</b> để nhường lượt. Ở đây i là mình, j là người kia.",
  d:[H("Mềm 3: Peterson"), b("vr",230,70,500,50,"int turn;   Boolean interest[2] = {FALSE, FALSE};","violet",{fs:15}), codeCol("c",130,codeP,700,140)]},
 {s:"Bước 1: <b>giơ tay</b>, đặt interest của mình bằng TRUE, báo rằng tôi muốn vào.",
  d:[u("c0",{c:"brand"}), f("c0")]},
 {s:"Bước 2: <b>lịch sự mời người kia trước</b>, đặt turn bằng j.",
  d:[u("c0",{c:"gray"}), u("c1",{c:"brand"}), f("c1")]},
 {s:"Bước 3: chỉ phải chờ khi <b>cả hai</b> điều đúng: người kia <b>đang muốn vào</b>, VÀ <b>đang là lượt người kia</b>. Thiếu một điều là được vào.",
  d:[u("c1",{c:"gray"}), u("c2",{c:"warn"}), t("w3",480,430,"chờ khi: người kia muốn vào  VÀ  turn = người kia",{fs:18,c:"warn"})]},
 {s:"Bước 4: ra khỏi đoạn găng thì <b>hạ tay</b>, đặt interest của mình về FALSE, để người kia vào được.",
  d:[x("w3"), u("c2",{c:"gray"}), u("c4",{c:"ok"}), f("c4")]},
 {s:"Trường hợp 1: <b>chỉ P0 muốn vào</b>, P1 đang làm việc riêng nên interest 1 bằng FALSE. P0 giơ tay, mời P1 trước, rồi kiểm tra: P1 có muốn vào không? Không. Vậy P0 <b>vào ngay</b>, không bị chặn vô lý như luân phiên.",
  d:[clr(), H("Trường hợp 1: chỉ P0 muốn vào"), b("i0",140,70,220,50,"interest[0] = T","brand",{fs:16}), b("i1",370,70,220,50,"interest[1] = F","gray",{fs:16}), b("tn",600,70,220,50,"turn = 1","violet",{fs:16}),
     b("q0",120,170,720,60,"P0: while (turn == 1 && interest[1])  →  interest[1] = F  →  không chờ","ok",{fs:16}), b("q1",120,260,720,60,"P1 đang làm việc riêng (NonCS), không giơ tay","gray",{fs:16}),
     t("ok1",480,380,"P0 vào ngay ✔  (khác luân phiên)",{fs:20,c:"ok"})]},
 {s:"Trường hợp 2, khó nhất: <b>cả hai cùng muốn vào gần như cùng lúc</b>. Ban đầu chưa ai giơ tay.",
  d:[clr(), H("Trường hợp 2: cả hai cùng muốn vào"), b("i0",140,70,220,50,"interest[0] = F","gray",{fs:16}), b("i1",370,70,220,50,"interest[1] = F","gray",{fs:16}), b("tn",600,70,220,50,"turn = 0","violet",{fs:16}),
     t("h0",240,135,"P0",{fs:16,c:"brand"}), t("h1",720,135,"P1",{fs:16,c:"ok"}),
     codeCol("a",60,["interest[0] = TRUE;","turn = 1;","while (turn == 1 && interest[1]);","CS;","interest[0] = FALSE;"]),
     codeCol("b",540,["interest[1] = TRUE;","turn = 0;","while (turn == 0 && interest[0]);","CS;","interest[1] = FALSE;"]),
     d("p0",42,py(0),{t:"▶",c:"brand",r:12}), d("p1",522,py(0),{t:"▶",c:"ok",r:12})]},
 {s:"Bước 1 và 2: P0 giơ tay, rồi P1 giơ tay. Interest 0 và interest 1 đều thành TRUE.",
  d:[u("i0",{t:"interest[0] = T",c:"brand"}), u("i1",{t:"interest[1] = T",c:"ok"}), u("p0",{y:py(1)}), u("p1",{y:py(1)})]},
 {s:"Bước 3: P0 mời P1 trước, đặt turn bằng 1.",
  d:[u("tn",{t:"turn = 1"}), u("p0",{y:py(2)}), f("tn")]},
 {s:"Bước 4: ngay sau đó P1 cũng mời P0 trước, đặt turn bằng 0. Biến turn chỉ giữ được <b>một</b> giá trị, là giá trị của <b>người ghi sau cùng</b>: P1. Giờ turn bằng 0.",
  d:[u("tn",{t:"turn = 0"}), u("p1",{y:py(2)}), f("tn"), t("ls",720,450,"P1 ghi turn sau cùng",{fs:16,c:"warn"})]},
 {s:"Bước 5: P0 kiểm tra: turn có bằng 1 không? Không, turn bằng 0. Vậy P0 <b>vào đoạn găng</b>.",
  d:[x("ls"), u("p0",{y:py(3)}), u("a3",{c:"ok"})]},
 {s:"Bước 6: P1 kiểm tra: turn bằng 0 và P0 đang muốn vào. Cả hai điều đều đúng, nên P1 <b>phải chờ</b>. Người nói mời bạn trước sau cùng chính là người chờ.",
  d:[u("b2",{c:"warn"}), t("wt",720,450,"P1 chờ (chờ bận)",{fs:17,c:"warn"}), f("b2")]},
 {s:"Bước 7: P0 ra khỏi đoạn găng, hạ tay: interest 0 bằng FALSE.",
  d:[x("wt"), u("a3",{c:"gray"}), u("p0",{y:py(4)}), u("a4",{c:"brand"}), u("i0",{t:"interest[0] = F",c:"gray"})]},
 {s:"Bước 8: P1 kiểm tra lại: P0 không còn muốn vào, điều kiện chờ sai, nên P1 <b>vào đoạn găng</b>. Từ đầu tới cuối không lúc nào có hai người cùng ở trong.",
  d:[u("a4",{c:"gray"}), u("b2",{c:"gray"}), u("p1",{y:py(3)}), u("b3",{c:"ok"})]},
 {s:"Peterson thỏa đủ: <b>loại trừ</b>, vì turn chỉ là 0 hoặc 1; <b>không chặn vô lý</b>, vì ai không muốn vào thì interest bằng FALSE; và <b>chờ có hạn</b>. Nhược điểm: chỉ cho 2 tiến trình và vẫn chờ bận.",
  d:[clr(), H("Nhận xét Peterson"), b("o1",60,90,260,110,"Loại trừ ✔","ok",{fs:19,s:"turn chỉ 0 hoặc 1"}), b("o2",350,90,260,110,"Không chặn vô lý ✔","ok",{fs:18,s:"không muốn → interest = F"}), b("o3",640,90,260,110,"Chờ có hạn ✔","ok",{fs:19,s:"ra là hạ tay"}),
     b("o4",200,250,560,90,"Chỉ 2 tiến trình · vẫn chờ bận","bad",{fs:19}),
     t("vv",480,420,"Ví von: cùng tới cửa, ai nói “mời bạn trước” sau cùng thì đứng chờ",{fs:17,c:"warn"})]}
]};};

V["s2-10~hw"] = function(){ return {title:"Giải pháp cứng: cấm ngắt và lệnh TSL", scenes:[
 {s:"Giải pháp cứng 1, <b>cấm ngắt</b>. Tiến trình bị chuyển đi là do <b>ngắt</b>, chẳng hạn ngắt đồng hồ báo hết lượt. Vậy vào đoạn găng thì tắt mọi ngắt, ra thì bật lại.",
  d:[H("Cứng 1: cấm ngắt"), b("cd",230,80,500,170,"Disable Interrupt;   // tắt mọi ngắt\nCS;\nEnable Interrupt;    // bật lại","violet",{fs:17})]},
 {s:"Trong lúc ngắt bị tắt, ngắt đồng hồ không lấy được CPU, nên không tiến trình nào chen vào. Trên <b>một CPU</b>, cách này đúng là loại trừ được.",
  d:[b("p0",120,300,300,80,"P0 đang trong CS","ok",{fs:18}), b("ck",560,300,280,80,"Ngắt đồng hồ","gray",{fs:18}), a("ia",557,340,423,340,{c:"bad",t:"bị chặn ✘"})]},
 {s:"Nguy hiểm thứ nhất: nếu tiến trình <b>kẹt trong đoạn găng</b>, ví dụ lặp vô hạn, thì không còn ngắt nào lấy lại CPU được. <b>Cả hệ thống đứng</b>.",
  d:[clr(), H("Vì sao cấm ngắt nguy hiểm?"), b("d1",60,90,840,90,"1. Kẹt trong CS (lặp vô hạn) → không ngắt nào cứu được → cả hệ thống đứng","bad",{fs:17})]},
 {s:"Nguy hiểm thứ hai: phải cho tiến trình người dùng dùng <b>lệnh đặc quyền</b> tắt ngắt. Trao quyền đó cho chương trình người dùng là rất liều.",
  d:[b("d2",60,200,840,90,"2. Phải cho chương trình người dùng dùng lệnh đặc quyền","bad",{fs:17})]},
 {s:"Nguy hiểm thứ ba: máy có <b>nhiều CPU</b>. Tắt ngắt ở CPU 1 không ngăn được CPU 2 chạy tiến trình khác vào đoạn găng. Không chắc loại trừ.",
  d:[b("d3",60,310,840,90,"3. Nhiều CPU: tắt ngắt ở CPU 1 không cản được CPU 2","bad",{fs:17}),
     b("u1",140,420,300,70,"CPU 1: P0 vào CS","ok",{fs:16}), b("u2",520,420,300,70,"CPU 2: P1 cũng vào CS","bad",{fs:16})]},
 {s:"Ví von: để đi vệ sinh, bạn khóa luôn cửa chính cả tòa nhà. Không ai vào được thật, nhưng ngủ quên trong đó thì cả tòa nhà đứng hình; còn tòa nhà có hai cửa chính thì khóa một cửa cũng vô ích.",
  d:[clr(), H("Ví von: khóa cửa chính cả tòa nhà"), b("bv",130,130,700,200,"Đi vệ sinh mà khóa cửa chính cả tòa nhà\n\nngủ quên → cả tòa đứng hình\ntòa có 2 cửa chính (2 CPU) → khóa 1 cửa vô ích","warn",{fs:17})]},
 {s:"Giải pháp cứng 2, <b>lệnh TSL</b>: Test and Set Lock. Đây là <b>một lệnh máy</b> do CPU cung cấp, làm hai việc dính liền, không thể bị chen ngang: <b>trả về</b> giá trị cũ của lock, và <b>đặt</b> lock bằng 1.",
  d:[clr(), H("Cứng 2: lệnh TSL"), b("cd",230,75,500,150,"int lock = 0;\nwhile (TSL(lock));   // chờ\nCS;\nlock = 0;","violet",{fs:17}),
     b("t1",120,270,330,90,"① trả về lock cũ","brand",{fs:18}), b("t2",510,270,330,90,"② đặt lock = 1","brand",{fs:18}), t("tt",480,400,"① + ② trong MỘT lệnh, không ai chen vào được",{fs:18,c:"ok"})]},
 {s:"Đọc kết quả: TSL trả về 0 nghĩa là trước đó cửa trống, và mình đã kịp đặt lock bằng 1, nên thoát vòng chờ và vào. Trả về 1 nghĩa là đang có người, tiếp tục chờ.",
  d:[x("tt"), t("r0",480,400,"trả về 0 → vào CS · trả về 1 → tiếp tục chờ",{fs:18,c:"warn"})]},
 {s:"Chạy thử: ban đầu lock bằng 0. P0 thực hiện TSL: nhận về 0, đồng thời lock thành 1. P0 <b>vào đoạn găng</b>.",
  d:[clr(), H("Chạy thử TSL"), b("lk",380,70,200,50,"lock = 0","violet",{fs:18}), t("h0",240,135,"P0",{fs:16,c:"brand"}), t("h1",720,135,"P1",{fs:16,c:"ok"}),
     codeCol("a",60,["while (TSL(lock));","CS;","lock = 0;"]), codeCol("b",540,["while (TSL(lock));","CS;","lock = 0;"]),
     d("p0",42,py(1),{t:"▶",c:"brand",r:12}), d("p1",522,py(0),{t:"▶",c:"ok",r:12}), u("lk",{t:"lock = 1"}), u("a1",{c:"ok"}), t("r0",240,330,"TSL trả về 0 → vào",{fs:16,c:"ok"})]},
 {s:"Ngay sau đó P1 thực hiện TSL: nhận về 1 vì đã có người, lock vẫn là 1. P1 <b>chờ</b>. Không có khe hở nào để P1 lọt vào như ở biến khóa.",
  d:[u("b0",{c:"warn"}), t("r1",720,330,"TSL trả về 1 → chờ",{fs:16,c:"warn"}), f("b0")]},
 {s:"P0 ra khỏi đoạn găng, đặt lock bằng 0. Lần TSL kế tiếp của P1 nhận về 0, đặt lock bằng 1 và P1 vào.",
  d:[x("r0","r1"), u("a1",{c:"gray"}), u("p0",{y:py(2)}), u("lk",{t:"lock = 0"}), f("lk"), u("b0",{c:"gray"}), u("p1",{y:py(1)}), u("b1",{c:"ok"})]},
 {s:"TSL chính là biến khóa, nhưng bước <b>nhìn biển</b> và <b>treo biển</b> được gộp thành <b>một động tác</b>. Ưu điểm: đúng, và dùng được cho nhiều tiến trình. Nhược điểm: vẫn chờ bận, và có thể gây <b>đói</b> vì ai nhanh tay thì vào.",
  d:[clr(), H("Nhận xét TSL"), b("g1",60,100,400,140,"Biến khóa + gộp\nnhìn biển và treo biển\nthành 1 lệnh","violet",{fs:17}),
     b("g2",500,90,400,70,"✔ đúng, dùng cho N tiến trình","ok",{fs:17}), b("g3",500,175,400,70,"✘ vẫn chờ bận","bad",{fs:17}), b("g4",500,260,400,70,"✘ có thể đói (ai nhanh tay thì vào)","bad",{fs:16})]}
]};};

V["s2-10~sum"] = function(){ return {title:"So sánh 5 giải pháp chờ bận", scenes:[
 {s:"So sánh 5 giải pháp theo hai câu hỏi chính: có loại trừ không, và có chặn người khác vô lý không. Kèm số tiến trình dùng được.",
  d:[H("So sánh 5 giải pháp"), b("hd0",60,75,250,46,"Giải pháp","gray",{fs:15}), b("hd1",320,75,180,46,"Loại trừ","gray",{fs:15}), b("hd2",510,75,220,46,"Không chặn vô lý","gray",{fs:15}), b("hd3",740,75,160,46,"Số tiến trình","gray",{fs:15}),
     [["Biến khóa","✘","✔","N"],["Luân phiên","✔","✘","2"],["Peterson","✔","✔","2"],["Cấm ngắt","✔ (1 CPU)","✔","N"],["TSL","✔","✔","N"]].map(function(r,i){ var y=130+i*62;
       return [b("r"+i+"a",60,y,250,52,r[0],"brand",{fs:16}), b("r"+i+"b",320,y,180,52,r[1],r[1][0]==="✘"?"bad":"ok",{fs:16}), b("r"+i+"c",510,y,220,52,r[2],r[2]==="✘"?"bad":"ok",{fs:16}), b("r"+i+"d",740,y,160,52,r[3],"gray",{fs:16})]; })]},
 {s:"Mẹo nhớ bằng một chữ: khóa thì <b>hở</b>, luân phiên thì <b>cứng</b>, Peterson thì <b>lịch sự</b>, cấm ngắt thì <b>liều</b>, còn TSL thì <b>gộp</b>.",
  d:[clr(), H("Mẹo nhớ"), [["Biến khóa","HỞ","hai bước tách rời","bad"],["Luân phiên","CỨNG","bắt buộc thay phiên","warn"],["Peterson","LỊCH SỰ","mời bạn trước","ok"],["Cấm ngắt","LIỀU","treo máy, nhiều CPU vô ích","warn"],["TSL","GỘP","nhìn + treo biển trong 1 lệnh","ok"]].map(function(r,i){ var y=75+i*80;
       return [b("m"+i+"a",80,y,260,64,r[0],"gray",{fs:17}), b("m"+i+"b",360,y,160,64,r[1],r[3],{fs:19}), b("m"+i+"c",540,y,340,64,r[2],"none",{fs:16})]; })]},
 {s:"Nhận xét chung: mọi giải pháp chờ bận đều <b>lãng phí CPU</b> vì cứ lặp kiểm tra. Cách khắc phục là cho tiến trình chưa được vào <b>ngủ</b>, nhường CPU cho người khác, rồi được đánh thức khi tới lượt. Đó là Sleep và Wakeup, Semaphore, Monitor ở mục 11.",
  d:[clr(), H("Bước tiếp theo"), b("bw",80,110,360,140,"Chờ bận\nđứng gõ cửa liên tục\n→ lãng phí CPU","bad",{fs:18}), a("nx",442,180,517,180,{c:"ok"}),
     b("sl",520,110,360,140,"Sleep & Wakeup\nngồi chờ được gọi\n→ mục 11","ok",{fs:18})]}
]};};

/* ---------- 11. Sleep & Wakeup, Semaphore, Monitor ---------- */
V["s2-11"] = function(){ return {title:"Sleep & Wakeup và lỗi mất tín hiệu", scenes:[
 {s:"Ở mục 10, mọi giải pháp đều <b>chờ bận</b>: đứng lặp kiểm tra, phí CPU. Mục 11 đổi cách chờ: chưa được vào thì <b>đi ngủ</b>, nhường CPU, tới lượt thì <b>được đánh thức</b>.",
  d:[H("Từ chờ bận sang ngủ – đánh thức"), b("bw",60,100,400,200,"Chờ bận (mục 10)\n\nđứng gõ cửa liên tục\n→ tốn CPU","bad",{fs:18}), a("ar",462,200,497,200,{c:"ok"}),
     b("sw",500,100,400,200,"Ngủ – đánh thức (mục 11)\n\nlấy số, ngồi ghế chờ gọi\n→ không tốn CPU","ok",{fs:18})]},
 {s:"Ý tưởng gốc là <b>Sleep và Wakeup</b>. Trên đó xây ra 3 giải pháp: <b>Semaphore</b>, <b>Monitor</b> và <b>Message passing</b>.",
  d:[b("g1",60,360,260,80,"Semaphore","brand",{fs:19}), b("g2",350,360,260,80,"Monitor","cyan",{fs:19}), b("g3",640,360,260,80,"Message passing","violet",{fs:18})]},
 {s:"HĐH cung cấp 2 lời gọi hệ thống. <b>Sleep</b>: tiến trình gọi nó chuyển sang <b>bị chặn</b>, không được cấp CPU. <b>WakeUp P</b>: chuyển tiến trình P sang <b>sẵn sàng</b>. Phải nhờ HĐH vì việc này đổi trạng thái tiến trình.",
  d:[clr(), H("2 lời gọi hệ thống"), b("sl",60,100,400,160,"Sleep()\n\ntiến trình gọi → Blocked","violet",{fs:19}), b("wk",500,100,400,160,"WakeUp(P)\n\nP → Ready","ok",{fs:19}),
     t("nt",480,320,"phải nhờ HĐH vì việc này đổi trạng thái tiến trình",{fs:17,c:"gray"})]},
 {s:"Áp dụng: dùng hai biến chung, <b>busy</b> cho biết có người trong đoạn găng chưa, và <b>blocked</b> là số tiến trình đang ngủ chờ. Vào: có người thì tăng blocked rồi ngủ; trống thì đặt busy bằng 1. Ra: đặt busy bằng 0, nếu có người chờ thì đánh thức một người.",
  d:[clr(), H("Áp dụng Sleep() và WakeUp()"), b("vb",230,70,240,50,"busy = 0","violet",{fs:17}), b("vk",490,70,240,50,"blocked = 0","violet",{fs:17}),
     codeCol("c",160,["if (busy) { blocked = blocked + 1; Sleep(); }","else busy = 1;","CS;","busy = 0;","if (blocked) { WakeUp(P); blocked = blocked - 1; }"],640,140)]},
 {s:"Chạy thử bình thường. P tới trước: busy bằng 0 nên đặt busy bằng 1 và vào đoạn găng. Q tới sau: thấy busy bằng 1, tăng blocked lên 1 rồi <b>ngủ</b>, không tốn CPU.",
  d:[u("vb",{t:"busy = 1"}), u("vk",{t:"blocked = 1"}), b("sP",60,430,400,50,"P: trong đoạn găng","ok",{fs:16}), b("sQ",500,430,400,50,"Q: đang ngủ (không tốn CPU)","gray",{fs:16})]},
 {s:"P ra khỏi đoạn găng: đặt busy bằng 0, thấy blocked bằng 1 nên gọi <b>WakeUp Q</b> và giảm blocked về 0. Q thức dậy và vào đoạn găng.",
  d:[u("vb",{t:"busy = 0"}), u("vk",{t:"blocked = 0"}), u("sP",{t:"P: đã ra",c:"gray"}), u("sQ",{t:"Q: được đánh thức → vào CS",c:"ok"}), f("sQ")]},
 {s:"Nhưng slide 82 chỉ ra vấn đề: kiểm tra điều kiện và từ bỏ CPU có thể bị chặn giữa chừng. Cùng chạy thử một tình huống xấu.",
  d:[clr(), H("Lỗi: mất tín hiệu đánh thức"), b("r1",60,80,840,52,"1. P vào CS: busy = 1","ok",{fs:16})]},
 {s:"Bước 2: Q tới, thấy busy bằng 1, tăng blocked lên 1 và <b>chuẩn bị</b> gọi Sleep.",
  d:[b("r2",60,145,840,52,"2. Q thấy busy = 1 → blocked = 1, chuẩn bị gọi Sleep()","gray",{fs:16})]},
 {s:"Bước 3: đúng lúc đó có ngắt, CPU chuyển sang P <b>trước khi Q kịp ngủ</b>.",
  d:[b("r3",60,210,840,52,"3. ⚡ Ngắt: CPU chuyển sang P trước khi Q kịp ngủ","bad",{fs:16})]},
 {s:"Bước 4: P ra khỏi đoạn găng, đặt busy bằng 0, thấy blocked bằng 1 nên gọi WakeUp Q. Nhưng Q <b>chưa ngủ</b>, nên tín hiệu đánh thức <b>bị mất</b>.",
  d:[b("r4",60,275,840,52,"4. P ra: busy = 0, WakeUp(Q) – nhưng Q chưa ngủ → tín hiệu bị mất","warn",{fs:16})]},
 {s:"Bước 5: Q chạy tiếp đúng chỗ dừng, gọi Sleep và <b>ngủ mãi</b>. Đoạn găng trống mà không còn ai đánh thức Q.",
  d:[b("r5",60,340,840,52,"5. Q chạy tiếp: Sleep() → ngủ mãi, không còn ai gọi","bad",{fs:16}), f("r5")]},
 {s:"Ví von: bạn định ngủ trưa và dặn tới giờ thì gọi. Người kia gọi đúng lúc bạn đang trải chiếu, chưa nằm xuống, nên bạn không nghe. Bạn nằm xuống ngủ và không ai gọi lần hai.",
  d:[b("vv",120,420,720,80,"Gọi đúng lúc đang trải chiếu → không nghe → ngủ quên luôn","warn",{fs:17})]},
 {s:"Cách chữa: cần một biến <b>nhớ lại</b> cả những lần đánh thức chưa ai nhận, và việc kiểm tra cộng đi ngủ phải <b>không bị chen ngang</b>. Đó chính là <b>Semaphore</b>.",
  d:[clr(), H("Cần gì để sửa?"), b("f1",60,110,400,140,"Nhớ lại lần đánh thức\nchưa ai nhận","brand",{fs:18}), b("f2",500,110,400,140,"Kiểm tra + đi ngủ\nkhông bị chen ngang","brand",{fs:18}),
     a("fa",480,265,480,335,{c:"ok"}), b("sm",330,340,300,80,"→ Semaphore","ok",{fs:22})]}
]};};

V["s2-11~sem"] = function(){
 function st(){ return [b("sv",80,75,220,60,"s = 1","violet",{fs:20}), b("sq",330,75,550,60,"Hàng chờ s.L: trống","gray",{fs:17}),
   b("cs",80,165,800,64,"Đoạn găng: trống","gray",{fs:18}), b("p1",80,270,240,90,"P1\nở ngoài","gray",{fs:17}), b("p2",360,270,240,90,"P2\nở ngoài","gray",{fs:17}), b("p3",640,270,240,90,"P3\nở ngoài","gray",{fs:17})]; }
 return {title:"Semaphore: Down, Up và chạy thử", scenes:[
 {s:"<b>Semaphore</b> do Dijkstra đề xuất năm 1965. Một semaphore gồm hai phần: một <b>giá trị nguyên</b>, và một <b>danh sách các tiến trình đang bị chặn</b> chờ nó.",
  d:[H("Semaphore (Dijkstra, 1965)"), b("sc",210,80,540,190,"typedef struct {\n  int value;            // giá trị nguyên\n  struct process *L;    // danh sách chờ\n} Semaphore;","violet",{fs:17}),
     t("nt",480,340,"chỉ được dùng qua Down(s) và Up(s)",{fs:19,c:"brand"}), t("n2",480,385,"hai thao tác này được thực hiện trọn vẹn, không bị chen ngang",{fs:17,c:"gray"})]},
 {s:"<b>Down</b> là xin một vé: trừ value đi 1. Nếu value thành <b>âm</b>, nghĩa là hết vé, tiến trình được đưa vào danh sách chờ và đi ngủ.",
  d:[clr(), H("Down(s): xin vé"), b("dc",120,80,400,220,"Down(S) {\n  S.value--;\n  if (S.value < 0) {\n    Add(P, S.L);\n    Sleep();\n  }\n}","brand",{fs:17}),
     b("d1",570,90,330,80,"value trừ 1","gray",{fs:17}), b("d2",570,190,330,100,"âm → hết vé\n→ vào hàng, ngủ","bad",{fs:17})]},
 {s:"<b>Up</b> là trả một vé: cộng value thêm 1. Nếu value <b>vẫn nhỏ hơn hoặc bằng 0</b>, nghĩa là đang có người ngủ chờ, thì lấy một người ra khỏi danh sách và đánh thức.",
  d:[clr(), H("Up(s): trả vé"), b("uc",120,80,400,220,"Up(S) {\n  S.value++;\n  if (S.value <= 0) {\n    Remove(P, S.L);\n    Wakeup(P);\n  }\n}","ok",{fs:17}),
     b("u1",570,90,330,80,"value cộng 1","gray",{fs:17}), b("u2",570,190,330,100,"vẫn ≤ 0 → có người chờ\n→ đánh thức 1 người","ok",{fs:16})]},
 {s:"Đọc giá trị semaphore: lớn hơn 0 là <b>còn bấy nhiêu vé</b>; bằng 0 là <b>hết vé, không ai chờ</b>; âm là <b>có bấy nhiêu tiến trình đang ngủ chờ</b>.",
  d:[clr(), H("Đọc giá trị s.value"), b("m1",60,110,260,150,"value > 0\n\ncòn value vé","ok",{fs:18}), b("m2",350,110,260,150,"value = 0\n\nhết vé,\nkhông ai chờ","warn",{fs:18}), b("m3",640,110,260,150,"value < 0\n\n|value| người\nđang chờ","bad",{fs:18}),
     t("ex",480,330,"ví dụ: s = −2 → có 2 tiến trình đang ngủ chờ",{fs:18,c:"gray"})]},
 {s:"Chạy thử với s bằng 1 và ba tiến trình P1, P2, P3 cùng muốn vào đoạn găng. Mỗi tiến trình làm: Down, vào đoạn găng, rồi Up.",
  d:[clr(), H("Chạy thử: s = 1, ba tiến trình"), st(), t("cd",480,420,"mỗi tiến trình: Down(s); CS; Up(s);",{fs:17,c:"gray"})]},
 {s:"P1 Down: 1 thành 0, không âm, nên P1 <b>được vào</b> đoạn găng.",
  d:[x("cd"), u("sv",{t:"s = 0"}), u("cs",{t:"Đoạn găng: P1",c:"ok"}), u("p1",{t:"P1\nđang dùng",c:"ok"}), t("lg",480,420,"P1 Down: 1 → 0 → vào",{fs:18,c:"ok"})]},
 {s:"P2 Down: 0 thành âm 1, âm, nên P2 vào hàng chờ và <b>ngủ</b>.",
  d:[u("sv",{t:"s = −1",c:"bad"}), u("sq",{t:"Hàng chờ s.L: P2",c:"warn"}), u("p2",{t:"P2\nđang ngủ",c:"warn"}), u("lg",{t:"P2 Down: 0 → −1 → ngủ",c:"warn"})]},
 {s:"P3 Down: âm 1 thành âm 2, P3 cũng <b>ngủ</b>. Giá trị âm 2 nói đúng là đang có 2 tiến trình chờ.",
  d:[u("sv",{t:"s = −2"}), u("sq",{t:"Hàng chờ s.L: P2 → P3"}), u("p3",{t:"P3\nđang ngủ",c:"warn"}), u("lg",{t:"P3 Down: −1 → −2 → ngủ (2 người chờ)"})]},
 {s:"P1 ra khỏi đoạn găng, gọi Up: âm 2 thành âm 1, vẫn nhỏ hơn hoặc bằng 0, nên <b>đánh thức P2</b>. P2 vào đoạn găng.",
  d:[u("sv",{t:"s = −1"}), u("sq",{t:"Hàng chờ s.L: P3"}), u("cs",{t:"Đoạn găng: P2"}), u("p1",{t:"P1\nđã ra",c:"gray"}), u("p2",{t:"P2\nđang dùng",c:"ok"}), u("lg",{t:"P1 Up: −2 → −1 → đánh thức P2",c:"ok"})]},
 {s:"P2 gọi Up: âm 1 thành 0, vẫn nhỏ hơn hoặc bằng 0, nên <b>đánh thức P3</b>.",
  d:[u("sv",{t:"s = 0",c:"violet"}), u("sq",{t:"Hàng chờ s.L: trống",c:"gray"}), u("cs",{t:"Đoạn găng: P3"}), u("p2",{t:"P2\nđã ra",c:"gray"}), u("p3",{t:"P3\nđang dùng",c:"ok"}), u("lg",{t:"P2 Up: −1 → 0 → đánh thức P3"})]},
 {s:"P3 gọi Up: 0 thành 1, lớn hơn 0, không còn ai chờ. Từ đầu tới cuối, mỗi lúc chỉ một tiến trình trong đoạn găng.",
  d:[u("sv",{t:"s = 1"}), u("cs",{t:"Đoạn găng: trống",c:"gray"}), u("p3",{t:"P3\nđã ra",c:"gray"}), u("lg",{t:"P3 Up: 0 → 1 → không ai chờ",c:"gray"})]},
 {s:"Vì sao semaphore không mất tín hiệu như Sleep và Wakeup? Thứ nhất, Up khi chưa ai chờ thì value được <b>cộng lên và ghi nhớ</b>, lần Down sau thấy không âm nên khỏi ngủ. Thứ hai, Down và Up <b>không bị chen ngang</b>, nên không có khe hở giữa kiểm tra và đi ngủ.",
  d:[clr(), H("Vì sao không mất tín hiệu?"), b("w1",60,110,400,170,"Up khi chưa ai chờ\n→ value tăng và được GHI NHỚ\n→ Down sau khỏi ngủ","ok",{fs:17}), b("w2",500,110,400,170,"Down / Up\nkhông bị chen ngang\n→ không có khe hở","ok",{fs:17})]},
 {s:"Ví von: semaphore như <b>bãi gửi xe có N chỗ</b> với một bảng đếm. Xe vào thì trừ 1; hết chỗ thì xếp hàng ngoài cổng. Xe ra thì cộng 1 và gọi xe đầu hàng vào. Bảng đếm âm 2 nghĩa là có 2 xe đang chờ.",
  d:[b("pk",120,340,720,110,"Bãi xe N chỗ: vào = Down (trừ 1) · ra = Up (cộng 1, gọi xe chờ)\nbảng đếm −2 → có 2 xe đang chờ ngoài cổng","warn",{fs:16})]}
]};};

V["s2-11~use"] = function(){ return {title:"Hai cách dùng Semaphore", scenes:[
 {s:"Cách dùng thứ nhất: <b>loại trừ lẫn nhau</b>. Đặt s bằng 1, mọi tiến trình đều làm Down, vào đoạn găng, rồi Up. Chỉ có một vé nên mỗi lúc chỉ một người trong đoạn găng.",
  d:[H("Cách 1: loại trừ (s = 1)"), b("sv",380,75,200,55,"s = 1","violet",{fs:20}), b("cd",230,170,500,150,"mọi Pi:\nDown(s);\nCS;\nUp(s);","brand",{fs:18}), t("nt",480,380,"1 vé → mỗi lúc 1 người trong đoạn găng",{fs:18,c:"ok"})]},
 {s:"Cách dùng thứ hai: <b>định thứ tự</b>. Đặt s bằng 0. P1 làm Job1 rồi Up. P2 làm Down rồi mới làm Job2. Mục tiêu: Job2 luôn chạy sau Job1.",
  d:[clr(), H("Cách 2: định thứ tự (s = 0)"), b("sv",380,75,200,55,"s = 0","violet",{fs:20}), b("j1",80,170,340,130,"P1:\nJob1;\nUp(s);","brand",{fs:18}), b("j2",540,170,340,130,"P2:\nDown(s);\nJob2;","ok",{fs:18})]},
 {s:"Trường hợp P2 tới trước: P2 Down, 0 thành âm 1, nên P2 <b>ngủ</b>, chưa làm được Job2.",
  d:[u("sv",{t:"s = −1"}), u("j2",{c:"warn"}), t("c1",710,350,"P2 ngủ ở Down",{fs:17,c:"warn"})]},
 {s:"P1 làm xong Job1 rồi Up: âm 1 thành 0, nên <b>đánh thức P2</b>. Lúc này P2 mới làm Job2. Job2 đúng là sau Job1.",
  d:[u("sv",{t:"s = 0"}), u("j2",{c:"ok"}), a("wk",422,235,537,235,{c:"ok",t:"Up đánh thức"}), u("c1",{t:"P2 làm Job2 sau Job1",c:"ok"})]},
 {s:"Trường hợp P1 tới trước: P1 làm Job1, Up: 0 thành 1, value được <b>ghi nhớ</b>. Sau đó P2 Down: 1 thành 0, không âm, nên <b>không phải ngủ</b> mà làm Job2 luôn. Vẫn là Job2 sau Job1.",
  d:[x("wk","c1"), u("sv",{t:"s = 0 → 1 → 0"}), t("c2",480,370,"P1 Up trước: s = 1 (ghi nhớ) → P2 Down: 1 → 0, không ngủ",{fs:17,c:"ok"})]},
 {s:"Kết luận: dù ai tới trước, <b>Job2 luôn chạy sau Job1</b>.",
  d:[b("rs",230,420,500,70,"Job2 luôn chạy sau Job1 ✔","ok",{fs:20})]},
 {s:"Ngoài slide: semaphore chỉ nhận 0 và 1 gọi là <b>nhị phân</b>, dùng cho loại trừ. Semaphore nhận số bất kỳ gọi là <b>đếm</b>, dùng khi có N tài nguyên giống nhau, ví dụ bãi xe 3 chỗ thì đặt s bằng 3.",
  d:[clr(), H("Semaphore nhị phân và đếm"), b("bn",60,100,400,160,"Nhị phân (binary)\nchỉ 0 hoặc 1\n→ loại trừ","brand",{fs:18}), b("ct",500,100,400,160,"Đếm (counting)\nsố bất kỳ\n→ N tài nguyên giống nhau","cyan",{fs:18}),
     [0,1,2].map(function(i){ return b("slot"+i,250+i*160,330,140,70,"chỗ "+(i+1),"ok",{fs:16}); }), t("pk",480,440,"bãi xe 3 chỗ → s = 3",{fs:17,c:"gray"})]},
 {s:"Lỗi hay gặp khi dùng semaphore: <b>quên Up</b> thì người sau chờ mãi; <b>viết ngược</b>, Up trước Down, thì hỏng loại trừ; và <b>Down hai lần</b> trên cùng semaphore bằng 1 thì tự chặn chính mình.",
  d:[clr(), H("Lỗi hay gặp"), b("e1",60,90,840,80,"Quên Up(s) → người sau chờ mãi","bad",{fs:18}), b("e2",60,190,840,80,"Viết ngược: Up(s) trước, Down(s) sau → hỏng loại trừ","bad",{fs:18}),
     b("e3",60,290,840,80,"Down(s) hai lần khi s = 1 → tự chặn chính mình","bad",{fs:18})]}
]};};

V["s2-11~mon"] = function(){ return {title:"Monitor và Message passing", scenes:[
 {s:"<b>Monitor</b> do Hoare năm 1974 và Brinch Hansen năm 1975 đề xuất. Khác semaphore do HĐH cung cấp, monitor là cơ chế <b>do ngôn ngữ lập trình cung cấp</b>: gói biến dùng chung và các thủ tục thao tác trên chúng vào một khối.",
  d:[H("Monitor (Hoare 1974, Brinch Hansen 1975)"), b("mc",180,80,600,230,"monitor monitor-name {\n  shared variable declarations\n  procedure body P1 (…) { … }\n  …\n  procedure body Pn (…) { … }\n  { initialization code }\n}","cyan",{fs:17}),
     t("nt",480,370,"do ngôn ngữ lập trình cung cấp",{fs:18,c:"brand"})]},
 {s:"Điểm mạnh nhất: <b>loại trừ được làm tự động</b>. Mỗi lúc chỉ một tiến trình được chạy bên trong monitor; tiến trình khác gọi vào phải chờ ở cửa. Lập trình viên không phải tự viết Down và Up.",
  d:[clr(), H("Loại trừ tự động"), b("mo",330,90,400,260,"","cyan"), t("mt",530,115,"Monitor",{fs:17,c:"cyan"}), b("in",430,180,200,80,"P1 bên trong","ok",{fs:17}),
     b("w2",60,150,200,60,"P2 chờ ở cửa","warn",{fs:16}), b("w3",60,240,200,60,"P3 chờ ở cửa","warn",{fs:16}), t("nt",480,410,"mỗi lúc chỉ 1 tiến trình bên trong monitor",{fs:18,c:"ok"})]},
 {s:"Để định thứ tự, monitor có <b>biến điều kiện</b>. <b>Wait c</b>: ngủ chờ điều kiện c và tạm <b>nhả monitor</b> cho người khác vào. <b>Signal c</b>: đánh thức một tiến trình đang chờ c.",
  d:[clr(), H("Biến điều kiện"), b("wt",60,100,400,150,"Wait(c)\nngủ chờ c, tạm nhả monitor","warn",{fs:18}), b("sg",500,100,400,150,"Signal(c)\nđánh thức 1 người đang chờ c","ok",{fs:18})]},
 {s:"Ví dụ slide 90, loại trừ: monitor M có hàm AccessMutual chứa đoạn găng truy cập tài nguyên. Tiến trình chỉ cần gọi M chấm AccessMutual, monitor tự bảo đảm mỗi lúc một người.",
  d:[clr(), H("Ví dụ: loại trừ bằng monitor"), b("m1",80,100,420,170,"Monitor M\n  <resource type> RC;\n  Function AccessMutual\n    CS;  // truy cập RC","cyan",{fs:16}), b("pi",560,140,320,90,"Pi:\nM.AccessMutual();","brand",{fs:17})]},
 {s:"Ví dụ định thứ tự: F1 làm Job1 rồi Signal c; F2 Wait c rồi mới làm Job2. Nếu P2 gọi F2 trước, nó Wait và ngủ, nhả monitor cho P1 vào. P1 gọi F1: làm Job1, Signal c, đánh thức P2, P2 làm Job2.",
  d:[clr(), H("Ví dụ: định thứ tự bằng monitor"), b("m2",60,90,380,190,"Monitor M\n  Condition c;\n  F1: Job1; Signal(c);\n  F2: Wait(c); Job2;","cyan",{fs:16}),
     b("q2",520,90,380,80,"P2: M.F2() → Wait(c), ngủ","warn",{fs:16}), b("q1",520,200,380,80,"P1: M.F1() → Job1, Signal(c)","brand",{fs:16}),
     a("sg",710,285,710,345,{c:"ok"}), b("q3",520,350,380,70,"P2 thức dậy → Job2","ok",{fs:16})]},
 {s:"Ví von: monitor như <b>phòng khám có lễ tân</b>. Bệnh nhân chỉ cần vào phòng chờ; lễ tân tự bảo đảm mỗi lúc một người gặp bác sĩ. Ai chờ kết quả xét nghiệm thì ra ghế ngồi, có kết quả thì được gọi lại.",
  d:[clr(), H("Ví von: phòng khám có lễ tân"), b("v1",60,110,260,130,"Lễ tân\n= loại trừ tự động","cyan",{fs:17}), b("v2",350,110,260,130,"Ra ghế chờ\n= Wait(c)","warn",{fs:17}), b("v3",640,110,260,130,"Được gọi lại\n= Signal(c)","ok",{fs:17})]},
 {s:"<b>Message passing</b>: gửi bằng send P message, nhận bằng receive Q message. Tiến trình phải biết rõ tên tiến trình bên kia. Bên nhận phải chờ tới khi có message, nên tự động chạy sau bên gửi.",
  d:[clr(), H("Message passing"), b("pp",60,110,220,80,"P","brand",{fs:20}), b("qq",680,110,220,80,"Q","ok",{fs:20}), a("ms",282,150,677,150,{c:"violet",t:"send(Q, msg) → receive(P, msg)"}),
     t("rc",480,250,"receive phải chờ tới khi có message → bên nhận chạy sau bên gửi",{fs:17,c:"gray"})]},
 {s:"Đặc tính liên kết: được thiết lập <b>tự động</b>; mỗi liên kết gắn <b>đúng một cặp</b> tiến trình; giữa mỗi cặp có <b>đúng một</b> liên kết; liên kết có thể một chiều nhưng thường là <b>hai chiều</b>. Không cần bộ nhớ chung nên dùng được cả qua mạng.",
  d:[b("k1",60,300,190,90,"tự động","violet",{fs:17}), b("k2",270,300,190,90,"đúng 1 cặp","violet",{fs:17}), b("k3",480,300,190,90,"1 liên kết / cặp","violet",{fs:16}), b("k4",690,300,210,90,"thường 2 chiều","violet",{fs:17}),
     t("vv",480,450,"Ví von: nhắn tin – chưa nhận được tin thì cứ chờ",{fs:17,c:"warn"})]}
]};};

V["s2-11~cls"] = function(){
 var PH = [[480,130],[642,234],[580,401],[380,401],[318,234]], CH = [[536,211],[570,306],[480,365],[390,306],[424,211]];
 return {title:"Bài toán đồng bộ kinh điển và tổng kết", scenes:[
 {s:"Slide 92 nêu ba bài toán đồng bộ kinh điển: <b>bộ đệm có hạn</b>, tức người sản xuất và người tiêu dùng; <b>người đọc và người ghi</b>; và <b>bữa tối của các triết gia</b>.",
  d:[H("3 bài toán đồng bộ kinh điển"), b("p1",60,110,260,150,"Bounded-Buffer\n(Producer–Consumer)","brand",{fs:17}), b("p2",350,110,260,150,"Readers and\nWriters","cyan",{fs:17}), b("p3",640,110,260,150,"Dining-\nPhilosophers","warn",{fs:17})]},
 {s:"Bộ đệm có hạn: người sản xuất bỏ hàng vào kho N ô, người tiêu dùng lấy ra. Kho <b>đầy</b> thì người sản xuất phải chờ; kho <b>rỗng</b> thì người tiêu dùng phải chờ; và không được hai người cùng sửa kho một lúc.",
  d:[clr(), H("Bounded-Buffer (Producer–Consumer)"), b("pr",40,150,180,70,"Producer","brand",{fs:17}), [0,1,2,3,4].map(function(i){ return b("bf"+i,250+i*95,150,85,70,i<2?"hàng":"","gray",{fs:14}); }),
     b("cs",745,150,180,70,"Consumer","ok",{fs:17}), t("r1",480,290,"kho đầy → Producer chờ · kho rỗng → Consumer chờ",{fs:17,c:"warn"}), t("r2",480,330,"không hai người cùng sửa kho",{fs:17,c:"warn"})]},
 {s:"Lời giải bằng semaphore, ngoài slide: mutex bằng 1 để bảo vệ kho, empty bằng N là số ô trống, full bằng 0 là số ô có hàng. Producer: Down empty, Down mutex, bỏ hàng, Up mutex, Up full. Consumer làm ngược lại.",
  d:[x("r1","r2"), b("s1",60,260,260,50,"mutex = 1","violet",{fs:16}), b("s2",350,260,260,50,"empty = N (ô trống)","violet",{fs:15}), b("s3",640,260,260,50,"full = 0 (ô có hàng)","violet",{fs:15}),
     b("cp",60,330,400,170,"Producer:\nDown(empty); Down(mutex);\n  bỏ hàng vào kho;\nUp(mutex); Up(full);","brand",{fs:15}), b("cc",500,330,400,170,"Consumer:\nDown(full); Down(mutex);\n  lấy hàng ra;\nUp(mutex); Up(empty);","ok",{fs:15})]},
 {s:"Người đọc và người ghi: nhiều người <b>đọc cùng lúc</b> được vì đọc không làm hỏng dữ liệu; nhưng người <b>ghi</b> phải <b>độc quyền</b>, không ai khác được đọc hay ghi lúc đó.",
  d:[clr(), H("Readers and Writers"), b("db",380,90,200,90,"Dữ liệu","violet",{fs:18}), [0,1,2].map(function(i){ return b("rd"+i,80+i*140,240,120,60,"Reader "+(i+1),"ok",{fs:15}); }),
     t("ro",270,340,"nhiều người đọc cùng lúc ✔",{fs:17,c:"ok"}), b("wr",640,240,200,60,"Writer","bad",{fs:16}), t("wo",740,340,"người ghi phải độc quyền",{fs:17,c:"bad"})]},
 {s:"Bữa tối của các triết gia: 5 triết gia ngồi quanh bàn, giữa mỗi hai người có <b>một chiếc đũa</b>, muốn ăn phải cầm <b>đủ hai chiếc</b>.",
  d:[clr(), H("Dining-Philosophers"), t("tb",480,282,"bàn ăn",{fs:16,c:"gray"}), PH.map(function(p,i){ return b("ph"+i,p[0]-60,p[1]-22,120,44,"Triết gia "+(i+1),"cyan",{fs:13}); }),
     CH.map(function(c,i){ return d("ch"+i,c[0],c[1],{c:"warn",r:9}); }), t("nd",480,480,"5 triết gia · 5 chiếc đũa · cần 2 chiếc mới ăn",{fs:16,c:"gray"})]},
 {s:"Nếu cả 5 cùng lúc cầm chiếc đũa bên trái rồi chờ chiếc bên phải, thì ai cũng giữ một chiếc và chờ người bên cạnh: <b>tất cả kẹt mãi</b>. Đó là bế tắc, deadlock. Lời giải phải tránh cả bế tắc lẫn đói.",
  d:[PH.map(function(p,i){ return u("ph"+i,{c:"bad"}); }), u("nd",{t:"cả 5 cầm đũa trái rồi chờ đũa phải → kẹt mãi (deadlock)",c:"bad"})]},
 {s:"Tổng kết mục 11. Sleep và Wakeup không tốn CPU nhưng <b>mất tín hiệu</b>. Semaphore <b>đếm vé</b> bằng Down và Up. Monitor <b>tự lo loại trừ</b>, dùng Wait và Signal. Message passing thì <b>nhắn tin</b> bằng send và receive.",
  d:[clr(), H("Tổng kết mục 11"), [["Sleep & Wakeup","HĐH · mất tín hiệu","bad"],["Semaphore","HĐH · Down / Up · đếm vé","brand"],["Monitor","ngôn ngữ · loại trừ tự động · Wait / Signal","cyan"],["Message passing","HĐH · send / receive · nhắn tin","violet"]].map(function(r,i){ var y=85+i*95;
       return [b("t"+i+"a",60,y,300,78,r[0],r[2],{fs:18}), b("t"+i+"b",380,y,520,78,r[1],"gray",{fs:16})]; })]}
]};};

Object.assign(window.VLABEL, {"s2-7":"FCFS, SJF, ưu tiên","s2-7~rr":"Round Robin","s2-10":"Chờ bận & biến khóa","s2-10~turn":"Luân phiên","s2-10~pet":"Peterson","s2-10~hw":"Cấm ngắt & TSL","s2-10~sum":"So sánh","s2-11":"Sleep & Wakeup","s2-11~sem":"Semaphore","s2-11~use":"Dùng Semaphore","s2-11~mon":"Monitor & Message","s2-11~cls":"Bài toán kinh điển"});
})();
