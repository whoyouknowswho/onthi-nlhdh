/* Video hoạt hình tự dựng – Chương 6 (khung hình 960 × 540) */
(function(){
var VH=window.VH, b=VH.b, t=VH.t, a=VH.a, d=VH.d, u=VH.u, x=VH.x, f=VH.f, clr=VH.clr, H=VH.H;
var V = window.VIDEOS;
function grid(prefix, n, cols, x0, y0, w, h, gap, labels){
  var out=[]; for (var i=0;i<n;i++){ out.push(b(prefix+i, x0+(i%cols)*(w+gap), y0+Math.floor(i/cols)*(h+gap), w, h, labels? String(i):"", "gray", {fs:13,r:5})); } return out;
}
function cell(prefix,i,cols,x0,y0,w,h,gap){ return {x:x0+(i%cols)*(w+gap)+w/2, y:y0+Math.floor(i/cols)*(h+gap)+h/2}; }

V["s6-1"] = function(){ return {title:"File là gì & hệ thống file làm gì?", scenes:[
 {s:"Vì sao cần file? Vì ① dữ liệu cần lưu rất <b>lớn</b>, ② phải <b>tồn tại lâu</b> kể cả khi tiến trình đã kết thúc, ③ <b>nhiều tiến trình</b> cùng truy cập được.",
  d:[H("Vì sao cần lưu trữ lâu dài?"), b("n1",40,170,270,150,"① Dữ liệu lớn","brand",{s:"RAM không đủ chứa"}), b("n2",345,170,270,150,"② Tồn tại lâu","ok",{s:"tắt chương trình vẫn còn"}), b("n3",650,170,270,150,"③ Dùng chung","violet",{s:"nhiều tiến trình cùng đọc"})]},
 {s:"HĐH tạo ra các <b>trừu tượng</b> cho người dùng: tiến trình/luồng là trừu tượng của CPU, không gian địa chỉ là trừu tượng của RAM, còn <b>file là trừu tượng của đĩa</b>.",
  d:[clr(), H("Trừu tượng của hệ điều hành"), b("u1",80,110,280,70,"Process / Thread","brand"), b("h1",600,110,280,70,"CPU","gray"), a("e1",365,145,595,145,{t:"HĐH ánh xạ"}), b("u2",80,220,280,70,"Address space","brand"), b("h2",600,220,280,70,"Memory","gray"), a("e2",365,255,595,255), b("u3",80,330,280,70,"Files","ok"), b("h3",600,330,280,70,"Disk","gray"), a("e3",365,365,595,365,{c:"ok"}), f("u3")]},
 {s:"Người dùng thấy <b>cây thư mục</b> gọn gàng. HĐH quản lý bằng các cấu trúc như <b>i-node</b>. Thực tế dữ liệu nằm rải trên các <b>block đĩa</b>.",
  d:[clr(), H("Hệ thống file: từ cái người dùng thấy tới đĩa"), b("fs",40,110,240,300,"📁 LIBROOT\n  📁 1\n    📄 1.01.pdf\n  📁 2\n    📄 8.09.pdf\n  📁 3\n    📄 7.08.pdf","brand",{fs:15}), t("fsl",160,440,"file system (người dùng thấy)",{fs:14,c:"brand"}), b("os",360,110,240,300,"mode\nowners\ntimestamps\nsize\ndirect blocks\nsingle indirect\ndouble indirect","violet",{fs:15}), t("osl",480,440,"operating system (i-node)",{fs:14,c:"violet"}), grid("dk",16,4,680,130,52,52,8,true), t("dkl",800,440,"physical disk",{fs:14,c:"gray"}), a("x1",285,260,355,260,{c:"warn"}), a("x2",605,260,675,260,{c:"warn"})]},
 {s:"<b>Hệ thống file</b> là phần HĐH lo về file, gồm 2 phần độc lập: <b>tập các file</b> và <b>cấu trúc thư mục</b> tổ chức, cung cấp thông tin về mọi file.",
  d:[[2,3,6,9,13].map(function(i){ return u("dk"+i,{c:"ok"}); }), t("sum",480,500,"File system = tập các file + cấu trúc thư mục",{fs:19,c:"warn"})]}
]};};

V["s6-2"] = function(){ return {title:"Cấu trúc & kiểu file", scenes:[
 {s:"Có 3 kiểu cấu trúc file. (a) <b>Chuỗi byte</b>: HĐH chỉ thấy một dãy byte, ý nghĩa do chương trình tự hiểu – UNIX và Windows dùng cách này, linh hoạt nhất.",
  d:[H("Ba loại cấu trúc file"), [0,1,2,3,4,5,6,7,8].map(function(i){ return b("by"+i,90,90+i*38,90,34,"byte","brand",{fs:12,r:4}); }), t("la",135,460,"(a) byte sequence",{fs:16,c:"brand"})]},
 {s:"(b) <b>Chuỗi bản ghi</b>: file là dãy các bản ghi có kích thước cố định; đọc/ghi theo từng bản ghi.",
  d:[[0,1,2,3].map(function(i){ return b("rc"+i,290,90+i*86,130,80,"record "+i,"warn",{fs:14,r:4}); }), t("lb",355,460,"(b) record sequence",{fs:16,c:"warn"})]},
 {s:"(c) <b>Cây</b>: các bản ghi có <b>khóa</b>, sắp xếp thành cây để tìm nhanh theo khóa (Ant, Fox, Pig → Cat, Cow, Dog…).",
  d:[b("tr",560,90,300,50,"Ant · Fox · Pig","violet",{fs:15}), b("t1",480,210,140,50,"Cat · Cow · Dog","violet",{fs:13}), b("t2",640,210,140,50,"Goat · Lion · Owl","violet",{fs:13}), b("t3",800,210,140,50,"Pony · Rat · Worm","violet",{fs:13}), b("t4",640,320,140,50,"Hen · Ibis · Lamb","violet",{fs:13}), a("q1",640,142,550,205,{c:"violet"}), a("q2",710,142,710,205,{c:"violet"}), a("q3",780,142,870,205,{c:"violet"}), a("q4",710,262,710,315,{c:"violet"}), t("lc",710,460,"(c) tree",{fs:16,c:"violet"})]},
 {s:"Về <b>kiểu</b>: file <b>Data</b> (numeric, character, binary), file <b>Program</b> (source, object, executable), và <b>Regular</b> / <b>Special</b> (special đại diện cho thiết bị character hoặc block).",
  d:[clr(), H("Các kiểu file"), b("k1",40,130,280,230,"DATA\n\nnumeric\ncharacter\nbinary","brand",{fs:18}), b("k2",340,130,280,230,"PROGRAM\n\nsource\nobject\nexecutable","ok",{fs:18}), b("k3",640,130,280,230,"REGULAR / SPECIAL\n\nspecial = thiết bị\n(character, block)","violet",{fs:17})]},
 {s:"File <b>thực thi</b> có <b>header</b> mở đầu bằng <b>magic number</b> (để HĐH nhận ra đây là chương trình), sau đó là kích thước các phần, entry point… rồi tới Text, Data, Relocation bits, Symbol table.",
  d:[clr(), H("(a) File thực thi · (b) File lưu trữ (archive)"), b("e0",120,70,280,40,"Magic number","warn",{fs:15,r:4}), b("e1",120,110,280,120,"Text size · Data size\nBSS size · Symbol table size\nEntry point · Flags","gray",{fs:14,r:4}), b("e2",120,235,280,50,"Text","brand",{r:4}), b("e3",120,290,280,50,"Data","brand",{r:4}), b("e4",120,345,280,50,"Relocation bits","brand",{fs:15,r:4}), b("e5",120,400,280,50,"Symbol table","brand",{fs:15,r:4}), t("eh",100,150,"Header",{fs:14,c:"warn",a:"end"}), f("e0")]},
 {s:"File <b>lưu trữ (archive)</b> gồm nhiều cặp <b>Header + Object module</b>; mỗi header ghi tên module, ngày, chủ sở hữu, quyền bảo vệ, kích thước.",
  d:[b("r0",540,70,300,40,"Header","violet",{fs:15,r:4}), b("r1",540,110,300,90,"Object module","ok",{r:4}), b("r2",540,205,300,40,"Header","violet",{fs:15,r:4}), b("r3",540,245,300,90,"Object module","ok",{r:4}), b("r4",540,340,300,40,"Header","violet",{fs:15,r:4}), b("r5",540,380,300,70,"Object module","ok",{r:4}), t("rh",690,490,"mỗi header: tên module · ngày · owner · protection · size",{fs:14,c:"violet"})]}
]};};

V["s6-3"] = function(){ return {title:"Truy cập, thuộc tính & thao tác file", scenes:[
 {s:"<b>Truy cập tuần tự</b>: đọc lần lượt từ đầu tới cuối, không nhảy cóc được – giống <b>băng từ</b> hay băng cát-xét.",
  d:[H("Tuần tự vs Ngẫu nhiên"), [0,1,2,3,4,5,6,7,8,9].map(function(i){ return b("s"+i,60+i*84,120,78,60,"R"+i,"gray",{fs:15,r:4}); }), d("hd",99,215,{t:"▲",c:"warn"}), u("hd",{x:435}), t("sl",480,280,"Tuần tự: R0 → R1 → R2 → … (băng từ)",{fs:18,c:"warn"})]},
 {s:"<b>Truy cập ngẫu nhiên</b>: nhảy thẳng tới bản ghi bất kỳ bằng <b>seek</b> rồi read – rất hợp với <b>cơ sở dữ liệu</b>.",
  d:[d("rh",99,380,{t:"▲",c:"ok"}), u("rh",{x:771}), a("jm",120,350,760,350,{c:"ok",t:"seek tới R8",cv:-60}), u("s8",{c:"ok"}), t("rl",480,450,"Ngẫu nhiên: seek → read (cơ sở dữ liệu)",{fs:18,c:"ok"})]},
 {s:"Mỗi file có các <b>thuộc tính</b>. Hay hỏi nhất: <b>Archive flag = 1</b> nghĩa là cần sao lưu; <b>Temporary flag = 1</b> nghĩa là xóa file khi tiến trình kết thúc.",
  d:[clr(), H("Thuộc tính file (file attributes)"), b("a1",40,90,280,80,"Protection / Password","brand",{fs:15,s:"ai được dùng, dùng thế nào"}), b("a2",340,90,280,80,"Creator / Owner","brand",{fs:15,s:"người tạo · chủ hiện tại"}), b("a3",640,90,280,80,"Read-only · Hidden · System","brand",{fs:15,s:"1 = chỉ đọc · ẩn · file hệ thống"}),
   b("a4",40,190,280,80,"Archive flag","warn",{fs:16,s:"1 = CẦN sao lưu"}), b("a5",340,190,280,80,"Temporary flag","warn",{fs:16,s:"1 = xóa khi tiến trình kết thúc"}), b("a6",640,190,280,80,"Lock flags","warn",{fs:16,s:"≠ 0 = đang bị khóa"}),
   b("a7",40,290,280,80,"ASCII/binary · Random access","gray",{fs:14,s:"1 = binary · 1 = ngẫu nhiên"}), b("a8",340,290,280,80,"Record length · Key pos · Key len","gray",{fs:13,s:"cho file bản ghi có khóa"}), b("a9",640,290,280,80,"3 mốc thời gian · Size","gray",{fs:14,s:"tạo · truy cập · sửa · size"}), f("a4","a5")]},
 {s:"<b>11 thao tác file</b>: Create, Delete, Open, Close, Read, Write, Append (ghi thêm vào cuối), Seek (định vị), Get attributes, Set attributes, Rename.",
  d:[clr(), H("11 thao tác file"), ["Create","Delete","Open","Close","Read","Write","Append","Seek","Get attr","Set attr","Rename"].map(function(n,i){ return b("o"+i,40+(i%4)*225,100+Math.floor(i/4)*110,205,90,(i+1)+". "+n,i===6||i===7?"warn":"brand",{fs:17}); })]},
 {s:"<b>File ánh xạ bộ nhớ</b>: tiến trình gắn file <b>abc</b> thành một đoạn trong không gian địa chỉ, và tạo đoạn mới cho file <b>xyz</b>. Đọc/ghi file giờ chỉ là đọc/ghi bộ nhớ!",
  d:[clr(), H("Memory-mapped files"), b("pt",80,120,140,260,"Program\ntext","brand"), b("da",260,300,140,80,"Data","brand"), b("abc",480,160,140,220,"abc","ok"), b("xyz",680,330,140,50,"xyz","warn"), t("ml",550,430,"(b) sau khi ánh xạ: file = một đoạn bộ nhớ",{fs:17,c:"ok"}), f("abc","xyz")]}
]};};

V["s6-4"] = function(){ return {title:"Thư mục & đường dẫn", scenes:[
 {s:"<b>Thư mục một mức</b>: tất cả file nằm chung trong thư mục gốc. Ví dụ 4 file của 3 người dùng A, B, C. Nếu A và B cùng đặt tên “bai.txt” → <b>đụng tên</b>!",
  d:[H("Thư mục một mức"), b("rt",420,90,120,60,"Root","gray"), ["A","A","B","C"].map(function(o,i){ return [b("f"+i,240+i*130,250,90,90,o,o==="A"?"brand":o==="B"?"warn":"ok",{r:45}), a("l"+i,480,152,285+i*130,245,{c:"gray",noHead:1})]; }), t("cf",480,420,"4 file · 3 người dùng → dễ trùng tên",{fs:18,c:"bad"})]},
 {s:"<b>Thư mục hai mức</b>: mỗi người dùng có một thư mục riêng (user directory) → hết đụng tên giữa các người dùng.",
  d:[clr(), H("Thư mục hai mức"), b("rt",420,70,120,56,"Root","gray"), b("A",200,190,100,56,"A","brand"), b("B",430,190,100,56,"B","warn"), b("C",660,190,100,56,"C","ok"), a("r1",480,128,250,185,{noHead:1,c:"gray"}), a("r2",480,128,480,185,{noHead:1,c:"gray"}), a("r3",480,128,710,185,{noHead:1,c:"gray"}),
   b("a1",150,330,70,70,"A","brand",{r:35}), b("a2",260,330,70,70,"A","brand",{r:35}), b("b1",445,330,70,70,"B","warn",{r:35}), b("c1",600,330,70,70,"C","ok",{r:35}), b("c2",680,330,70,70,"C","ok",{r:35}), b("c3",760,330,70,70,"C","ok",{r:35})]},
 {s:"<b>Thư mục phân cấp (cây)</b>: người dùng tự tạo <b>thư mục con</b> lồng nhau tùy ý để nhóm file theo ý mình – linh hoạt nhất, dùng trong mọi HĐH hiện đại.",
  d:[b("cs",680,430,80,50,"C/sub","ok",{fs:13}), b("cs2",780,430,80,50,"C/sub","ok",{fs:13}), a("s1",795,402,720,428,{noHead:1,c:"ok"}), a("s2",795,402,820,428,{noHead:1,c:"ok"}), u("c3",{t:"📁",r:10}), H("Thư mục phân cấp (cây)")]},
 {s:"<b>Đường dẫn tuyệt đối</b> đi từ gốc “/”, ví dụ <b>/usr/jim</b>: từ root vào usr, rồi vào jim.",
  d:[clr(), H("Đường dẫn tuyệt đối và tương đối"), b("r",420,60,120,50,"/","gray"), ["bin","etc","lib","usr","tmp"].map(function(n,i){ return [b("d"+i,90+i*165,160,120,50,n,"gray",{fs:16}), a("e"+i,480,112,150+i*165,155,{noHead:1,c:"gray"})]; }), b("ast",400,280,110,50,"ast","gray",{fs:16}), b("jim",540,280,110,50,"jim","gray",{fs:16}), b("ul",680,280,110,50,"lib","gray",{fs:16}), a("f1",645,212,455,275,{noHead:1,c:"gray"}), a("f2",645,212,595,275,{noHead:1,c:"gray"}), a("f3",645,212,735,275,{noHead:1,c:"gray"}), b("dict",680,400,110,50,"dict","gray",{fs:16}), a("f4",735,332,735,395,{noHead:1,c:"gray"}),
   u("r",{c:"warn"}), u("d3",{c:"warn"}), u("jim",{c:"warn"}), t("ab",200,420,"Tuyệt đối: /usr/jim",{fs:19,c:"warn"})]},
 {s:"<b>Đường dẫn tương đối</b> tính từ thư mục hiện hành. Đang ở /usr/jim, muốn tới dict: <b>..</b> (lên /usr) → <b>lib</b> → <b>dict</b> = <b>../lib/dict</b>.",
  d:[u("r",{c:"gray"}), u("d3",{c:"ok"}), u("ul",{c:"ok"}), u("dict",{c:"ok"}), u("jim",{c:"brand"}), u("ab",{t:"Tương đối (từ /usr/jim): ../lib/dict",c:"ok"})]},
 {s:"<b>8 thao tác thư mục</b>: Create, Delete, Opendir, Closedir, Readdir, Rename, <b>Link</b> (cho file xuất hiện thêm ở thư mục khác), <b>Unlink</b> (xóa entry).",
  d:[clr(), H("8 thao tác thư mục"), ["Create","Delete","Opendir","Closedir","Readdir","Rename","Link","Unlink"].map(function(n,i){ return b("o"+i,60+(i%4)*220,130+Math.floor(i/4)*130,200,100,(i+1)+". "+n,i>=6?"warn":"violet",{fs:18}); }), t("nt",480,440,"Seek / Append là thao tác FILE, không phải thư mục!",{fs:17,c:"bad"})]}
]};};

V["s6-5"] = function(){ return {title:"Bố cục hệ thống file trên đĩa", scenes:[
 {s:"Toàn bộ đĩa bắt đầu bằng <b>MBR</b> (Master Boot Record). Cuối MBR là <b>bảng phân vùng</b> (partition table) ghi vị trí từng phân vùng.",
  d:[H("Cấu trúc hệ thống file"), b("mbr",40,110,130,70,"MBR","warn"), b("ptb",170,110,26,70,"","bad",{r:2}), t("ptl",183,95,"partition table",{fs:13,c:"bad"}), b("p1",196,110,250,70,"Partition 1","brand",{fs:16}), b("p2",446,110,250,70,"Partition 2","brand",{fs:16}), b("p3",696,110,220,70,"Partition 3","brand",{fs:16})]},
 {s:"Khi máy khởi động, BIOS đọc MBR, tìm phân vùng <b>active</b> rồi đọc <b>boot block</b> của nó để nạp HĐH.",
  d:[f("mbr","p2"), a("bt",105,185,520,300,{c:"warn",t:"khởi động",cv:-60})]},
 {s:"Bên trong một phân vùng: <b>Boot block</b> → <b>Super block</b> (thông tin chung của file system) → <b>quản lý vùng trống</b> → <b>I-nodes</b> → <b>thư mục gốc</b> → <b>files và thư mục</b>.",
  d:[b("z1",40,320,130,80,"Boot\nblock","warn",{fs:14}), b("z2",170,320,130,80,"Super\nblock","bad",{fs:14}), b("z3",300,320,150,80,"Free space\nmgmt","cyan",{fs:14}), b("z4",450,320,130,80,"I-nodes","violet",{fs:15}), b("z5",580,320,120,80,"Root\ndir","ok",{fs:14}), b("z6",700,320,220,80,"Files and\ndirectories","brand",{fs:15}), a("zl",446,182,40,316,{noHead:1,c:"gray",dash:1}), a("zr",696,182,920,316,{noHead:1,c:"gray",dash:1})]},
 {s:"Mẹo nhớ thứ tự: <b>Boot – Super – Free – I-node – Root – Files</b>: “<b>Bố Sẽ Phát Inh Rồi Phạt</b>”.",
  d:[t("mn",480,460,"Boot · Super · Free · I-node · Root · Files",{fs:20,c:"warn"})]}
]};};

V["s6-6"] = function(){
 var files=[["A",4,"brand"],["B",3,"ok"],["C",6,"warn"],["D",5,"violet"],["E",12,"cyan"],["F",6,"bad"],["G",3,"ok"]], ops=[], pos=0;
 files.forEach(function(fl){ ops.push(b("F"+fl[0],40+pos*21,150,fl[1]*21-3,70,fl[0],fl[2],{fs:16,r:4})); pos+=fl[1]; });
 ops.push(b("free",40+pos*21,150,(42-pos)*21,70,"trống","none",{dash:1,fs:14,r:4}));
 return {title:"Cấp phát liên tục (contiguous allocation)", scenes:[
 {s:"Cấp phát liên tục: mỗi file chiếm một dãy block <b>liền nhau</b> trên đĩa. 7 file A(4) B(3) C(6) D(5) E(12) F(6) G(3) xếp sát nhau.",
  d:[H("Cấp phát liên tục cho 7 file"), ops]},
 {s:"Thư mục chỉ cần ghi <b>block bắt đầu</b> và <b>số block</b>. Ví dụ file mail: start 19, length 6 → chiếm block 19 đến 24. Đọc block thứ k chỉ cần start + k → <b>truy cập ngẫu nhiên</b> rất nhanh.",
  d:[b("dir",200,280,560,170,"Thư mục\nfile  start  length\ncount   0     2\ntr        14    3\nmail     19    6\nlist      28    4","dark",{fs:17})]},
 {s:"Khi xóa file D và F, chỗ của chúng thành các lỗ trống <b>rời rạc</b> (5 block và 6 block).",
  d:[x("dir"), u("FD",{t:"5 trống",c:"none",dash:1,fs:13}), u("FF",{t:"6 trống",c:"none",dash:1,fs:13})]},
 {s:"Giờ cần ghi file mới 8 block: tổng chỗ trống thì đủ, nhưng <b>không có dãy liền nào đủ 8</b> → <b>lãng phí không gian</b> (phân mảnh ngoài). Và file đang có cũng <b>không thể tăng kích thước</b> vì bị kẹp giữa các file khác.",
  d:[b("nf",330,300,300,80,"File mới cần 8 block","bad"), f("FD","FF"), t("ng",480,430,"Không có 8 block liền nhau → phân mảnh ngoài",{fs:18,c:"bad"})]},
 {s:"Vậy cấp phát liên tục hợp với đâu? <b>CD-ROM</b>: kích thước file biết trước khi ghi và không bao giờ bị xóa → không lo phân mảnh, lại đọc rất nhanh.",
  d:[x("nf","ng"), b("cd",330,290,300,110,"💿 CD-ROM","ok",{s:"biết trước kích thước · không xóa"})]}
]};};

V["s6-7"] = function(){
 var cols=8, x0=60, y0=110, w=58, h=46, g=8, chain=[9,16,1,10,25];
 function c(i){ return cell("",i,cols,x0,y0,w,h,g); }
 var fat=[[0,""],[1,""],[2,"10"],[3,"11"],[4,"7"],[5,""],[6,"3"],[7,"2"],[8,""],[9,""],[10,"12"],[11,"14"],[12,"-1"],[13,""],[14,"-1"],[15,""]];
 return {title:"Cấp phát liên kết & bảng FAT", scenes:[
 {s:"Cấp phát liên kết: mỗi file là một <b>danh sách liên kết</b> các block; mỗi block dành vài byte làm <b>con trỏ</b> tới block kế. Các block có thể nằm <b>rải rác</b> khắp đĩa.",
  d:[H("Cấp phát liên kết: file jeep"), grid("k",32,cols,x0,y0,w,h,g,true), b("dir",640,110,280,90,"Thư mục: jeep\nstart = 9 · end = 25","dark",{fs:16})]},
 {s:"Thư mục chỉ cần nhớ block bắt đầu là <b>9</b>. Đọc block 9, lấy con trỏ trong nó…",
  d:[u("k9",{c:"ok"}), d("pp",c(9).x,c(9).y,{t:"1",c:"warn",r:16}), a("dz",640,160,c(9).x+30,c(9).y,{c:"gray",dash:1})]},
 {s:"…→ block <b>16</b> → block <b>1</b> → block <b>10</b> → block <b>25</b>. Block 25 chứa <b>−1</b>: hết file. File jeep có 5 block.",
  d:[[16,1,10,25].map(function(n,i){ var p=c(chain[i]), q=c(n); return [u("k"+n,{c:"ok"}), a("ch"+i,p.x,p.y,q.x,q.y,{c:"warn",cv:20})]; }), u("pp",{x:c(25).x,y:c(25).y,t:"5"}), u("k25",{t:"25: −1"})]},
 {s:"Ưu điểm: chỉ cần địa chỉ bắt đầu, <b>không phân mảnh ngoài</b> (block nào trống cũng dùng được), file <b>tăng kích thước</b> thoải mái. Nhược điểm: <b>không truy cập ngẫu nhiên</b> – muốn tới block thứ 5 phải đọc lần lượt 4 block trước.",
  d:[t("pl",480,420,"✔ không phân mảnh ngoài · ✔ file tăng được · ✘ không truy cập ngẫu nhiên",{fs:17,c:"warn"})]},
 {s:"<b>FAT</b> cải tiến bằng cách gom tất cả con trỏ vào <b>một bảng trong RAM</b>. FAT[i] = số hiệu block tiếp theo, −1 = hết file.",
  d:[clr(), H("FAT – File Allocation Table (nằm trong RAM)"), fat.map(function(r,i){ return [t("fi"+i,330,72+i*28,String(r[0]),{fs:14,c:"gray",a:"end"}), b("fv"+i,345,58+i*28,140,26,r[1],"gray",{fs:14,r:3})]; }), b("da",620,90,300,70,"File A bắt đầu ở block 4","brand",{fs:16}), b("db",620,190,300,70,"File B bắt đầu ở block 6","warn",{fs:16})]},
 {s:"Đọc File A: bắt đầu block 4 → FAT[4] = 7 → FAT[7] = 2 → FAT[2] = 10 → FAT[10] = 12 → FAT[12] = −1. File A = <b>4 → 7 → 2 → 10 → 12</b>.",
  d:[[4,7,2,10,12].map(function(i){ return u("fv"+i,{c:"brand"}); }), t("ra",770,330,"A: 4 → 7 → 2 → 10 → 12",{fs:18,c:"brand"})]},
 {s:"File B: 6 → 3 → 11 → 14. Vì lần theo chuỗi diễn ra <b>trong RAM</b> nên rất nhanh – truy cập ngẫu nhiên khả thi. Nhược điểm: <b>cả bảng FAT phải nằm trong RAM</b>, đĩa càng lớn bảng càng to.",
  d:[[6,3,11,14].map(function(i){ return u("fv"+i,{c:"warn"}); }), t("rb",770,380,"B: 6 → 3 → 11 → 14",{fs:18,c:"warn"}), t("nb",770,450,"Nhược: cả bảng phải ở trong RAM",{fs:15,c:"bad"})]}
]};};

V["s6-8"] = function(){
 var cols=8, x0=60, y0=110, w=58, h=46, g=8, list=[9,16,1,10,25];
 function c(i){ return cell("",i,cols,x0,y0,w,h,g); }
 return {title:"Cấp phát chỉ mục & i-node", scenes:[
 {s:"Cấp phát chỉ mục: gom <b>tất cả con trỏ</b> của file vào một block riêng gọi là <b>index block</b>. Thư mục ghi: jeep → index block <b>19</b>.",
  d:[H("Cấp phát chỉ mục: index block"), grid("k",32,cols,x0,y0,w,h,g,true), u("k19",{c:"warn",t:"19 idx"}), b("ix",640,100,170,260,"Index block 19\n\n9\n16\n1\n10\n25\n−1 −1 −1","warn",{fs:16})]},
 {s:"Index block liệt kê thứ tự các block: 9, 16, 1, 10, 25. Muốn block logic thứ 3? Nhìn ngay ô thứ 3 → block <b>1</b>. <b>Truy cập ngẫu nhiên</b> trực tiếp, không cần lần chuỗi!",
  d:[list.map(function(n,i){ return [u("k"+n,{c:"ok"}), a("p"+i,640,182+i*24,c(n).x+28,c(n).y,{c:"ok",cv:i%2?15:-15})]; }), f("k1")]},
 {s:"Ưu: truy cập động <b>không phân mảnh ngoài</b>. Nhược: tốn thêm <b>overhead</b> cho index block (file nhỏ cũng phải có cả một block chỉ mục).",
  d:[t("pr",480,440,"✔ ngẫu nhiên · ✔ không phân mảnh ngoài · ✘ tốn index block",{fs:17,c:"warn"})]},
 {s:"<b>i-node</b> của UNIX là cấp phát chỉ mục: mỗi file có 1 i-node chứa <b>thuộc tính</b> (mode, owners, timestamps, size…) và các <b>địa chỉ block trực tiếp</b>.",
  d:[clr(), H("i-node của UNIX"), b("in",60,70,220,430,"","violet"), b("at",75,85,190,110,"Attributes\nmode · owners\ntimestamps · size","violet",{fs:13}), [0,1,2,3,4,5].map(function(i){ return b("dr"+i,75,205+i*34,190,30,"direct "+i,"gray",{fs:13,r:3}); }), b("si",75,410,190,26,"single indirect","cyan",{fs:12,r:3}), b("di",75,440,190,26,"double indirect","warn",{fs:12,r:3}), b("ti",75,470,190,26,"triple indirect","bad",{fs:12,r:3}),
   [0,1,2].map(function(i){ return [b("db"+i,400,205+i*50,90,36,"data","ok",{fs:13}), a("dl"+i,267,220+i*34,395,223+i*50,{c:"ok"})]; })]},
 {s:"File nhỏ chỉ cần các con trỏ <b>trực tiếp</b>. File lớn hơn dùng <b>single indirect</b>: con trỏ tới một block chứa toàn con trỏ.",
  d:[b("s1",400,370,90,60,"block\ncon trỏ","cyan",{fs:12}), a("sl",267,423,395,400,{c:"cyan"}), b("sd",560,370,80,36,"data","ok",{fs:13}), a("sl2",492,390,555,388,{c:"ok"})]},
 {s:"File rất lớn dùng <b>double indirect</b> (con trỏ → block con trỏ → block con trỏ → data) và <b>triple indirect</b>. Nhờ vậy i-node nhỏ, cố định nhưng file vẫn có thể cực lớn.",
  d:[b("d1",560,440,80,40,"ptr","warn",{fs:13}), b("d2",690,440,80,40,"ptr","warn",{fs:13}), b("d3",820,440,80,40,"data","ok",{fs:13}), a("dl",267,453,555,460,{c:"warn"}), a("dl2",642,460,685,460,{c:"warn"}), a("dl3",772,460,815,460,{c:"ok"}), t("tr",760,520,"triple: thêm 1 tầng con trỏ nữa",{fs:14,c:"bad"})]},
 {s:"Khác với FAT, chỉ i-node của các file <b>đang mở</b> mới cần nằm trong RAM – nên i-node rất hợp với đĩa lớn.",
  d:[t("cmp",700,110,"FAT: cả bảng trong RAM\ni-node: chỉ file đang mở",{fs:17,c:"warn"})]}
]};};

V["s6-9"] = function(){ return {title:"Thực hiện thư mục & file chia sẻ", scenes:[
 {s:"Cách (a) – kiểu MS-DOS: mỗi entry thư mục có <b>kích thước cố định</b>, chứa luôn <b>tên + thuộc tính + địa chỉ đĩa</b>.",
  d:[H("Hai cách thực hiện thư mục"), ["games","mail","news","work"].map(function(n,i){ return [b("a"+i,60,110+i*60,140,52,n,"brand",{fs:15,r:4}), b("aa"+i,200,110+i*60,200,52,"attributes","gray",{fs:14,r:4})]; }), t("al",230,375,"(a) thuộc tính nằm trong entry",{fs:15,c:"brand"})]},
 {s:"Cách (b) – kiểu UNIX: entry chỉ có <b>tên</b> và <b>trỏ tới i-node</b>; mọi thuộc tính nằm trong i-node.",
  d:[["games","mail","news","work"].map(function(n,i){ return [b("b"+i,520,110+i*60,150,52,n,"ok",{fs:15,r:4}), b("bi"+i,780,110+i*60,120,52,"i-node","violet",{fs:13,r:4}), a("bl"+i,672,136+i*60,775,136+i*60,{c:"violet"})]; }), t("bl",710,375,"(b) entry → i-node",{fs:15,c:"ok"})]},
 {s:"Tên file dài thì sao? (a) <b>In-line</b>: mỗi entry dài ngắn khác nhau, tên nằm ngay trong entry. (b) <b>In a heap</b>: entry cố định, chứa <b>con trỏ</b> tới tên đặt trong vùng heap cuối thư mục.",
  d:[t("ln",480,460,"Tên dài: (a) in-line  ·  (b) in a heap (entry giữ con trỏ tới tên)",{fs:17,c:"warn"})]},
 {s:"<b>File chia sẻ</b>: B muốn dùng chung một file của C. Ban đầu thư mục C trỏ tới i-node: <b>Owner = C, Count = 1</b>.",
  d:[clr(), H("File chia sẻ qua i-node"), b("dc",560,100,220,70,"Thư mục của C","ok"), b("in",380,270,220,100,"i-node\nOwner = C · Count = 1","violet",{fs:16}), a("lc",640,172,560,265,{c:"ok"})]},
 {s:"B tạo <b>liên kết (link)</b>: thư mục B cũng trỏ tới <b>cùng i-node</b> → <b>Count = 2</b>. Cấu trúc thư mục giờ là một đồ thị (DAG), không còn là cây thuần.",
  d:[b("db",180,100,220,70,"Thư mục của B","brand"), a("lb",320,172,420,265,{c:"brand"}), u("in",{t:"i-node\nOwner = C · Count = 2"}), f("in")]},
 {s:"C xóa file: chỉ entry của C bị xóa, <b>Count = 1</b>. i-node <b>vẫn còn</b>, B vẫn dùng được – nhưng i-node vẫn ghi <b>Owner = C</b> (một điểm bất tiện).",
  d:[x("dc","lc"), u("in",{t:"i-node\nOwner = C · Count = 1",c:"warn"}), t("nt",480,450,"Count về 0 thì i-node và dữ liệu mới thật sự bị xóa",{fs:16,c:"gray"})]}
]};};

V["s6-10"] = function(){
 var X=[128,256,512,1024,2048,4096,8192,16384], px=function(i){ return 120+i*100; };
 var rate=[5,15,30,65,125,275,550,990], util=[99,99,99,99,99,50,24,11];
 function ry(v){ return 470-v*0.38; } function uy(v){ return 470-v*3.8; }
 return {title:"Kích thước block & quản lý block trống", scenes:[
 {s:"Chọn kích thước block thế nào? Giả sử mọi file đều 2 KB. Trục ngang là kích thước block từ 128 byte tới 16 KB.",
  d:[H("Kích thước block: tốc độ vs hiệu quả không gian"), a("ax",100,470,900,470,{c:"gray"}), a("ay",100,470,100,70,{c:"gray"}), X.map(function(v,i){ return t("xl"+i,px(i),495,v>=1024?(v/1024)+"K":String(v),{fs:14,c:"gray"}); })]},
 {s:"<b>Nét liền – tốc độ dữ liệu</b>: block càng lớn, mỗi lần đọc lấy được càng nhiều dữ liệu → tốc độ <b>tăng mạnh</b>.",
  d:[X.slice(1).map(function(_,i){ return a("r"+i,px(i),ry(rate[i]),px(i+1),ry(rate[i+1]),{c:"ok",noHead:1,sw:4}); }), t("rl",820,ry(990)-20,"tốc độ dữ liệu",{fs:16,c:"ok"})]},
 {s:"<b>Nét đứt – hiệu quả sử dụng không gian</b>: đến 2K thì file 2 KB vừa khít, gần 100%. Block lớn hơn 2K thì phần dư trong block bị bỏ phí → hiệu quả <b>giảm mạnh</b>.",
  d:[X.slice(1).map(function(_,i){ return a("u"+i,px(i),uy(util[i]),px(i+1),uy(util[i+1]),{c:"warn",noHead:1,sw:4,dash:1}); }), t("ul",300,uy(99)-22,"hiệu quả không gian",{fs:16,c:"warn"})]},
 {s:"Hai đường đi ngược nhau → tốc độ và hiệu quả không gian <b>mâu thuẫn</b>. Phải chọn kích thước block <b>thỏa hiệp</b> (thường vài KB).",
  d:[b("cx",510,250,170,60,"điểm thỏa hiệp","violet",{fs:15}), f("cx")]},
 {s:"Theo dõi block trống – cách (a) <b>danh sách liên kết</b>: dùng các block đĩa để chứa số hiệu block trống. Một block 1 KB chứa được 1024 / 4 = <b>256</b> số hiệu 32 bit.",
  d:[clr(), H("Quản lý block trống"), b("l1",60,100,150,300,"42\n136\n210\n97\n…\n516 →","gray",{fs:16}), b("l2",240,100,150,300,"230\n162\n612\n…\n482 →","gray",{fs:16}), b("l3",420,100,150,300,"86\n234\n897\n…\n141","gray",{fs:16}), t("ll",315,440,"(a) 1 block 1 KB = 256 số hiệu block",{fs:15,c:"warn"})]},
 {s:"Cách (b) <b>bit map</b>: mỗi block đĩa ứng với <b>1 bit</b> (trống / đã dùng). Kích thước cố định và rất gọn.",
  d:[b("bm",640,100,280,300,"1001101101101100\n0110110111110111\n1010110110110110\n0110110110111011\n1110111011101111\n…","cyan",{fs:15}), t("bl",780,440,"(b) bit map – 1 bit / block",{fs:15,c:"cyan"})]}
]};};

V["s6-11"] = function(){
 var F=[["File name",8,"brand"],["Ext",3,"brand"],["Attr",1,"warn"],["Reserved",10,"gray"],["Time",2,"cyan"],["Date",2,"cyan"],["1st block",2,"ok"],["Size",4,"violet"]];
 var ops=[], p=0; F.forEach(function(fl,i){ ops.push(b("m"+i,40+p*27.5,230,fl[1]*27.5,90,fl[0]+"\n"+fl[1]+" B",fl[2],{fs:fl[1]<3?11:15,r:3,o:0})); p+=fl[1]; });
 return {title:"Ví dụ: CD-ROM & MS-DOS", scenes:[
 {s:"Đĩa CD-ROM không có track đồng tâm: dữ liệu nằm trên <b>một rãnh xoắn ốc</b> liên tục, gồm các vết lõm (<b>pit</b>) và mặt phẳng (<b>land</b>). Dữ liệu chia thành block <b>2 KB</b>.",
  d:[H("CD-ROM: một rãnh xoắn ốc"), b("s1",230,70,440,440,"","gray",{r:220}), b("s2",290,130,320,320,"","gray",{r:160}), b("s3",350,190,200,200,"","gray",{r:100}), b("s4",410,250,80,80,"","gray",{r:40}), t("sl",800,200,"pit = lõm\nland = phẳng\nblock 2 KB",{fs:17,c:"warn"}), d("rd",450,90,{c:"warn",r:10}), u("rd",{x:460,y:290})]},
 {s:"Entry thư mục CD-ROM theo chuẩn <b>ISO 9660</b>: có <b>vị trí file</b> (8 byte), <b>kích thước</b> (8 byte), <b>ngày giờ</b> (7 byte), cờ, số đĩa CD, và tên dạng <b>Base.Ext;Ver</b>.",
  d:[clr(), H("Entry thư mục ISO 9660"), b("i1",40,200,60,80,"Len","gray",{fs:12}), b("i2",100,200,170,80,"Location\n8 B","brand",{fs:14}), b("i3",270,200,170,80,"File size\n8 B","brand",{fs:14}), b("i4",440,200,150,80,"Date time\n7 B","cyan",{fs:14}), b("i5",590,200,90,80,"Flags…\nCD #","gray",{fs:12}), b("i6",680,200,240,80,"Base . Ext ; Ver","ok",{fs:15})]},
 {s:"Entry thư mục <b>MS-DOS dài đúng 32 byte</b>. Lần lượt: tên 8 byte, phần mở rộng 3 byte, thuộc tính 1 byte, 10 byte dự trữ, giờ 2, ngày 2, <b>số block đầu tiên</b> 2, kích thước 4.",
  d:[clr(), H("Entry thư mục MS-DOS = 32 byte"), ops, F.map(function(_,i){ return u("m"+i,{o:1}); }), t("sum",480,380,"8 + 3 + 1 + 10 + 2 + 2 + 2 + 4 = 32 byte",{fs:20,c:"warn"})]},
 {s:"Số block đầu tiên trỏ vào <b>bảng FAT</b>, từ đó lần ra các block còn lại của file. FAT-12, FAT-16, FAT-32 khác nhau ở số bit mỗi entry FAT.",
  d:[f("m6"), a("fa",40+24*27.5,325,480,450,{c:"ok",t:"→ bảng FAT"})]},
 {s:"Kích thước phân vùng tối đa = <b>số block đánh địa chỉ được × kích thước block</b>. FAT-12: 2<sup>12</sup> × 4 KB = <b>16 MB</b>. FAT-16: 2<sup>16</sup> × 32 KB = <b>2048 MB</b>. FAT-32 với block 4 KB: <b>1 TB</b>, tối đa 2 TB.",
  d:[clr(), H("Phân vùng tối đa theo kích thước block"), b("h0",130,80,700,44,"Block      FAT-12      FAT-16       FAT-32","dark",{fs:16,r:4}), b("h1",130,128,700,40,"0,5 KB     2 MB          —                —","gray",{fs:15,r:4}), b("h2",130,172,700,40,"1 KB        4 MB          —                —","gray",{fs:15,r:4}), b("h3",130,216,700,40,"2 KB        8 MB          128 MB      —","gray",{fs:15,r:4}), b("h4",130,260,700,40,"4 KB        16 MB        256 MB      1 TB","warn",{fs:15,r:4}), b("h5",130,304,700,40,"8 KB        —              512 MB      2 TB","gray",{fs:15,r:4}), b("h6",130,348,700,40,"16 KB      —              1024 MB    2 TB","gray",{fs:15,r:4}), b("h7",130,392,700,40,"32 KB      —              2048 MB    2 TB","gray",{fs:15,r:4}), t("nt",480,470,"Ô “—” = tổ hợp không được phép",{fs:15,c:"gray"})]}
]};};

V["s6-12"] = function(){
 var steps=[["Root","usr → i-node 6","gray"],["i-node 6","/usr ở block 132","violet"],["Block 132","ast → i-node 26","gray"],["i-node 26","/usr/ast ở block 406","violet"],["Block 406","mbox → i-node 60","gray"]];
 return {title:"Ví dụ: Windows 98 & UNIX V7", scenes:[
 {s:"Windows 98 vẫn dùng entry 32 byte của MS-DOS nhưng tận dụng 10 byte dự trữ để thêm: <b>ngày giờ tạo</b>, <b>lần truy cập cuối</b>, và <b>16 bit cao của số block đầu</b> – đủ 32 bit cho FAT-32.",
  d:[H("Windows 98: entry MS-DOS mở rộng"), b("w1",40,200,180,80,"Base name 8","brand",{fs:14}), b("w2",220,200,70,80,"Ext 3","brand",{fs:12}), b("w3",290,200,90,80,"Attr·NT·Sec","gray",{fs:11}), b("w4",380,200,110,80,"Creation\n4","cyan",{fs:13}), b("w5",490,200,70,80,"Last\nacc 2","cyan",{fs:12}), b("w6",560,200,80,80,"Upper\n16 bit","ok",{fs:12}), b("w7",640,200,110,80,"Last write\n4","cyan",{fs:12}), b("w8",750,200,80,80,"Lower\n16 bit","ok",{fs:12}), b("w9",830,200,90,80,"Size 4","violet",{fs:13}), f("w6","w8")]},
 {s:"Tên dài được cắt thành nhiều <b>entry tên dài</b>, mỗi entry chứa <b>13 ký tự</b> (5 + 6 + 2) cùng số thứ tự và <b>checksum</b> của tên ngắn để kiểm tra khớp.",
  d:[clr(), H("“The quick brown fox jumps over the lazy dog”"), b("e4",100,90,760,56,"68 │ dog                           (entry cuối, có cờ)","cyan",{fs:16,r:4}), b("e3",100,150,760,56,"3 │ ove · the la · zy","cyan",{fs:16,r:4}), b("e2",100,210,760,56,"2 │ wn fo · x jump · s","cyan",{fs:16,r:4}), b("e1",100,270,760,56,"1 │ The q · uick b · ro","cyan",{fs:16,r:4}), b("e0",100,330,760,56,"THEQUI~1      (entry MS-DOS: tên ngắn 8.3)","warn",{fs:17,r:4}), t("ck",480,440,"Mỗi entry tên dài: 13 ký tự + checksum (CK) của THEQUI~1",{fs:16,c:"gray"})]},
 {s:"UNIX V7 thì cực gọn: entry thư mục chỉ <b>16 byte</b> = <b>2 byte số i-node + 14 byte tên file</b>. Mọi thứ khác nằm trong i-node.",
  d:[clr(), H("UNIX V7: entry thư mục 16 byte"), b("un",240,180,100,90,"i-node #\n2 B","violet",{fs:16}), b("nm",340,180,380,90,"File name\n14 B","ok",{fs:18})]},
 {s:"Tìm file <b>/usr/ast/mbox</b>: bắt đầu từ thư mục gốc (vị trí cố định), tìm “usr” → được <b>i-node 6</b>.",
  d:[clr(), H("Tìm /usr/ast/mbox"), steps.map(function(s,i){ return b("st"+i,30+i*185,170,170,130,s[0],s[2],{fs:16,s:s[1],ss:13,o:i===0?1:0.25}); }), f("st0")]},
 {s:"Đọc i-node 6 → biết nội dung thư mục /usr ở <b>block 132</b>. Trong block 132 tìm “ast” → <b>i-node 26</b>.",
  d:[u("st1",{o:1}), u("st2",{o:1}), a("z1",202,235,213,235,{c:"warn"}), a("z2",387,235,398,235,{c:"warn"}), f("st1","st2")]},
 {s:"Đọc i-node 26 → /usr/ast ở <b>block 406</b>. Trong block 406 tìm “mbox” → <b>i-node 60</b>. Đọc i-node 60 là có địa chỉ các block dữ liệu của mbox!",
  d:[u("st3",{o:1}), u("st4",{o:1,c:"ok"}), a("z3",572,235,583,235,{c:"warn"}), a("z4",757,235,768,235,{c:"warn"}), b("end",330,360,300,80,"/usr/ast/mbox = i-node 60","ok",{fs:18}), f("end")]},
 {s:"Chuỗi cần nhớ: <b>root → 6 → 132 → 26 → 406 → 60</b>. Cứ xen kẽ: đọc <b>thư mục</b> để lấy số i-node, đọc <b>i-node</b> để lấy số block.",
  d:[t("mm",480,490,"root → i-node 6 → block 132 → i-node 26 → block 406 → i-node 60",{fs:18,c:"warn"})]}
]};};
})();
