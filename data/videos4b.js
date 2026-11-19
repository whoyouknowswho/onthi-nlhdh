/* Video từng bước: LRU, Optimal, Clock (Second chance), Aging – nhóm với video FIFO ở mục s4-10 */
(function(){
var VH=window.VH, b=VH.b, t=VH.t, a=VH.a, d=VH.d, u=VH.u, x=VH.x, f=VH.f, clr=VH.clr, H=VH.H;
var V = window.VIDEOS;
window.VLABEL = window.VLABEL || {};
var R0=[7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1];

/* Mô phỏng chung, trả về số lỗi trang (dùng cho phần so sánh) */
function simulate(alg, R, N){
  var fr=[], last={}, rb=[], hand=0, faults=0;
  R.forEach(function(p,i){
    var idx=fr.indexOf(p);
    if (idx>=0){ if (alg==="clock") rb[idx]=1; }
    else {
      faults++;
      if (fr.length<N){ fr.push(p); rb.push(1); }
      else {
        var vi=0;
        if (alg==="fifo"){ vi=hand; hand=(hand+1)%N; }
        else if (alg==="lru"){ fr.forEach(function(q,j){ if (last[q]<last[fr[vi]]) vi=j; }); }
        else if (alg==="opt"){ var best=-1; fr.forEach(function(q,j){ var nx=R.indexOf(q,i+1); nx=nx<0?1e9:nx; if (nx>best){ best=nx; vi=j; } }); }
        else { while (rb[hand]===1){ rb[hand]=0; hand=(hand+1)%N; } vi=hand; hand=(hand+1)%N; }
        fr[vi]=p; rb[vi]=1;
      }
    }
    last[p]=i;
  });
  return faults;
}
var CMP = "So sánh cùng chuỗi, 3 khung: FIFO "+simulate("fifo",R0,3)+" · LRU "+simulate("lru",R0,3)+" · Clock "+simulate("clock",R0,3)+" · Optimal "+simulate("opt",R0,3);

function repVideo(alg, title, intro, outro){
  var R=R0, N=3, fr=[], last={}, faults=0, sc=[], base=[], rb=[], hand=0;
  base.push(H(title));
  R.forEach(function(p,i){ base.push(b("c"+i,60+i*42,70,38,44,String(p),"gray",{fs:17,r:6}), t("ci"+i,79+i*42,128,String(i+1),{fs:11,c:"gray"})); });
  for (var k=0;k<N;k++) base.push(b("f"+k,180,180+k*90,170,64,"(trống)","none",{dash:1,fs:18}), t("fl"+k,150,212+k*90,"Khung "+(k+1),{a:"end",fs:15,c:"gray"}), t("fi"+k,370,212+k*90,"",{a:"start",fs:15,c:"violet"}));
  if (alg==="clock") base.push(d("hd",60,212,{t:"▶",c:"violet",r:15}), t("hl",60,170,"kim",{fs:13,c:"violet"}));
  base.push(b("cnt",660,170,250,80,"Lỗi trang: 0","bad",{fs:22}), t("note",785,300,"",{fs:16}), t("note2",785,330,"",{fs:14,c:"gray"}));
  sc.push({s:intro, d:[base]});
  function info(i){
    var ops=[];
    for (var k=0;k<N;k++){
      var p=fr[k], s="";
      if (p!==undefined){
        if (alg==="lru") s="dùng lần cuối: bước "+(last[p]+1);
        else if (alg==="opt"){ var nx=R.indexOf(p,i+1); s = nx<0 ? "không dùng lại nữa" : "dùng lại ở bước "+(nx+1); }
        else if (alg==="clock") s="R = "+rb[k];
      }
      ops.push(u("fi"+k,{t:s, c: alg==="clock" ? (rb[k]?"ok":"gray") : "violet"}));
    }
    if (alg==="clock") ops.push(u("hd",{y:212+hand*90}), u("hl",{y:170+hand*90}));
    return ops;
  }
  R.forEach(function(p,i){
    var ops=[u("c"+i,{c:"warn"})]; if (i>0) ops.push(u("c"+(i-1),{c:"gray"}));
    var s, idx=fr.indexOf(p);
    if (idx>=0){
      last[p]=i;
      if (alg==="clock") rb[idx]=1;
      s="Bước "+(i+1)+" – tham chiếu <b>"+p+"</b>: đã có trong RAM → <b>không lỗi</b>."+(alg==="clock"?" Đặt bit R của trang "+p+" = 1.":"");
      ops.push(u("note",{t:"✔ hit",c:"ok"}), u("note2",{t:""}), f("f"+idx));
    } else {
      faults++; ops.push(u("c"+i,{c:"bad"}));
      if (fr.length<N){
        fr.push(p); rb.push(1); last[p]=i; var k0=fr.length-1;
        ops.push(u("f"+k0,{t:"trang "+p,c:"ok",dash:0}), f("f"+k0), u("note",{t:"✘ lỗi (khung trống)",c:"bad"}), u("note2",{t:""}));
        s="Bước "+(i+1)+" – tham chiếu <b>"+p+"</b>: chưa có → <b>lỗi trang</b>, còn khung trống nên nạp vào.";
      } else {
        var vi=0, why="", note2="";
        if (alg==="lru"){ fr.forEach(function(q,j){ if (last[q]<last[fr[vi]]) vi=j; }); why="trang <b>"+fr[vi]+"</b> lâu nhất chưa được dùng (lần cuối ở bước "+(last[fr[vi]]+1)+")"; note2="bỏ trang dùng xa nhất về trước"; }
        else if (alg==="opt"){ var best=-1; fr.forEach(function(q,j){ var nx=R.indexOf(q,i+1); nx=nx<0?1e9:nx; if (nx>best){ best=nx; vi=j; } }); why = best>=1e9 ? "trang <b>"+fr[vi]+"</b> sẽ không bao giờ được dùng lại" : "trang <b>"+fr[vi]+"</b> lâu nhất mới được dùng lại (ở bước "+(best+1)+")"; note2="bỏ trang dùng lại xa nhất về sau"; }
        else {
          var steps=[];
          while (rb[hand]===1){ steps.push("khung "+(hand+1)+" có R = 1 → xóa R, cho cơ hội thứ hai"); rb[hand]=0; hand=(hand+1)%N; }
          vi=hand; steps.push("khung "+(hand+1)+" có R = 0 → chọn làm nạn nhân");
          why="kim quay: "+steps.join("; "); note2="kim dừng ở trang có R = 0";
        }
        var old=fr[vi]; fr[vi]=p; last[p]=i; if (alg==="clock"){ rb[vi]=1; hand=(vi+1)%N; }
        s="Bước "+(i+1)+" – tham chiếu <b>"+p+"</b>: lỗi trang, RAM đầy. Bỏ trang <b>"+old+"</b> vì "+why+".";
        ops.push(u("f"+vi,{t:"trang "+p,c:"ok"}), f("f"+vi), u("note",{t:"✘ lỗi · bỏ trang "+old,c:"bad"}), u("note2",{t:note2}));
      }
    }
    for (var k2=0;k2<fr.length;k2++) if (fr[k2]!==p) ops.push(u("f"+k2,{c:"gray"}));
    ops.push(info(i), u("cnt",{t:"Lỗi trang: "+faults}));
    sc.push({s:s, d:ops, t: idx>=0 ? 2800 : 5200});
  });
  sc.push({s:outro.replace("{F}",faults), d:[clr(), H(title+" – kết quả"), b("res",280,170,400,140,faults+" lỗi trang","bad",{fs:34,s:"chuỗi 20 tham chiếu · 3 khung"}), t("cmp",480,400,CMP,{fs:17,c:"warn"})]});
  return {title:title, scenes:sc};
}

V["s4-10~lru"] = function(){ return repVideo("lru","Thuật toán LRU · 3 khung trang",
  "<b>LRU</b> (Least Recently Used): khi phải bỏ trang, chọn trang <b>lâu nhất chưa được dùng</b> – nhìn về <b>quá khứ</b>. Bên phải mỗi khung ghi lần cuối trang đó được dùng.",
  "LRU gây <b>{F}</b> lỗi trang – ít hơn FIFO. LRU rất tốt vì quá khứ gần thường lặp lại, nhưng <b>khó cài đặt chính xác</b>: phần cứng phải ghi lại thời điểm của <b>mọi</b> lần truy cập. Vì vậy người ta dùng các thuật toán xấp xỉ như NFU và Aging."); };
V["s4-10~opt"] = function(){ return repVideo("opt","Thuật toán Optimal · 3 khung trang",
  "<b>Optimal</b>: bỏ trang mà <b>lâu nhất nữa mới được dùng lại</b> – nhìn về <b>tương lai</b>. Bên phải mỗi khung ghi bước sắp tới trang đó được dùng lại.",
  "Optimal gây <b>{F}</b> lỗi trang – <b>ít nhất có thể</b>. Nhưng HĐH không biết trước tương lai nên <b>không cài đặt được</b>; Optimal chỉ dùng làm <b>chuẩn để so sánh</b> các thuật toán khác."); };
/* Clock / Second chance: dựng riêng để thấy rõ vòng tròn, con kim và từng bước kim quay */
V["s4-10~clock"] = function(){
  var R = R0, N = 3, sc = [];
  var FR = [{x:225,y:165},{x:345,y:365},{x:105,y:365}];          /* khung 1 trên, khung 2 phải dưới, khung 3 trái dưới (theo chiều kim đồng hồ) */
  var HAND = [{x:300,y:250},{x:352,y:362},{x:248,y:362}];         /* đầu kim chỉ vào từng khung */
  var LAB = [{x:300,y:150},{x:420,y:462},{x:180,y:462}];
  var RULE = "Khi cần bỏ trang, nhìn trang kim chỉ:\n• R = 1 → xóa thành 0, tha, quay kim tiếp\n• R = 0 → bỏ trang này, nạp trang mới\nTrang được dùng lại (không lỗi) → R = 1";

  /* --- Phần 1: hiểu ý tưởng bằng hàng đợi --- */
  sc.push({s:"Nhắc lại <b>FIFO</b>: hết chỗ thì bỏ trang <b>vào sớm nhất</b>. Nhưng trang vào sớm nhất có thể vẫn đang được dùng liên tục. Bỏ nó đi thì lát nữa lại lỗi trang để nạp về, rất phí.",
    d:[H("Vấn đề của FIFO"),
       b("qa",110,190,220,90,"Trang A","bad",{fs:20,s:"vào sớm nhất"}), b("qb",370,190,220,90,"Trang B","gray",{fs:20,s:"vào sau"}), b("qc",630,190,220,90,"Trang C","gray",{fs:20,s:"vào sau cùng"}),
       t("qh",480,140,"Hàng đợi FIFO: bên trái là trang cũ nhất",{fs:15,c:"gray"}),
       t("q1",220,320,"nhưng A đang được dùng liên tục!",{fs:15,c:"warn"}),
       t("q2",480,410,"FIFO vẫn bỏ A → lát nữa lại lỗi trang để nạp A về",{fs:18,c:"bad"})]});
  sc.push({s:"<b>Second chance</b> (cơ hội thứ hai) thêm cho mỗi trang một bit <b>R</b>: trang vừa được dùng thì R = 1. Trước khi bỏ trang cũ nhất, xem bit R của nó. R = 1 nghĩa là trang vẫn đang được dùng, nên <b>tha cho một lần</b>.",
    d:[H("Ý tưởng Second chance: tha cho trang vừa được dùng"), x("q1","q2"),
       u("qa",{c:"ok",s:"R = 1 · vừa được dùng"}), u("qb",{s:"R = 0"}), u("qc",{s:"R = 1"}),
       t("q3",480,380,"Trước khi bỏ: xem bit R của trang cũ nhất",{fs:18,c:"warn"})]});
  sc.push({s:"Tha nghĩa là: <b>xóa R của A về 0</b> rồi đưa A xuống cuối hàng như trang mới vào. Xét tiếp trang B: R = 0, tức lâu rồi không ai dùng, nên <b>bỏ B</b>.",
    d:[x("q3"), u("qb",{x:110,c:"bad",s:"R = 0 → BỊ BỎ"}), u("qc",{x:370,c:"gray"}), u("qa",{x:630,c:"gray",s:"R = 0 · được tha, xuống cuối"}),
       t("q4",480,380,"R = 1 → xóa R, tha  ·  R = 0 → bỏ",{fs:20,c:"warn"})]});

  /* --- Phần 2: Clock = Second chance xếp thành vòng tròn --- */
  var base = [clr(), H("Clock: Second chance xếp thành vòng tròn"), b("ring",165,195,270,270,"","gray",{r:135,dash:1})];
  R.forEach(function(p,i){ base.push(b("c"+i,60+i*42,58,38,40,String(p),"gray",{fs:17,r:6}), t("ci"+i,79+i*42,110,String(i+1),{fs:11,c:"gray"})); });
  for (var k=0;k<N;k++) base.push(b("f"+k,FR[k].x,FR[k].y,150,80,"trống","none",{dash:1,fs:20}), t("fl"+k,LAB[k].x,LAB[k].y,"Khung "+(k+1),{fs:14,c:"gray"}));
  base.push(a("hand",300,330,HAND[0].x,HAND[0].y,{c:"violet",sw:5}), d("hub",300,330,{r:9,c:"violet"}),
    b("cnt",600,150,300,60,"Lỗi trang: 0","bad",{fs:22}), t("note",750,262,"",{fs:16}),
    b("rule",560,330,370,140,RULE,"violet",{fs:14}));
  sc.push({s:"Đưa trang xuống cuối hàng thì tốn công. <b>Clock</b> làm y hệt Second chance nhưng xếp các khung thành <b>vòng tròn</b> với một <b>kim</b> chỉ vào trang cũ nhất. Tha một trang chỉ cần <b>quay kim</b> sang khung kế, không phải dời trang nào.",
    d:[base, u("note",{t:"Kim (mũi tên tím) chỉ trang cũ nhất",c:"violet"})]});
  sc.push({s:"Giờ chạy chuỗi 20 tham chiếu ở trên với <b>3 khung</b>. Quy ước của video này: trang <b>vừa nạp có R = 1</b>. Khung xanh là R = 1, khung xám là R = 0.",
    d:[u("note",{t:"Quy ước: trang vừa nạp có R = 1\nxanh = R 1 · xám = R 0",c:"warn"}), f("rule")]});

  /* --- Phần 3: chạy từng bước --- */
  var fr = [], rb = [], hand = 0, faults = 0;
  function frameOps(){ var o=[]; for (var j=0;j<N;j++) if (fr[j]!==undefined) o.push(u("f"+j,{t:"trang "+fr[j], s:"R = "+rb[j], c: rb[j] ? "ok" : "gray", dash:0, fs:20})); return o; }
  function handOps(){ return [u("hand",{x2:HAND[hand].x, y2:HAND[hand].y})]; }
  R.forEach(function(p,i){
    var pre = [u("c"+i,{c:"warn"})], idx = fr.indexOf(p), head = "Bước "+(i+1)+", tham chiếu <b>"+p+"</b>: ";
    if (idx >= 0){
      rb[idx] = 1;
      sc.push({s: head+"trang "+p+" <b>đã có</b> trong RAM, không lỗi. Bật R của nó lên 1. Kim đứng yên.",
        d:[pre, u("c"+i,{c:"ok"}), frameOps(), f("f"+idx), u("note",{t:"✔ Không lỗi (hit)\ntrang "+p+": R = 1",c:"ok"})]});
      return;
    }
    faults++;
    if (fr.length < N){
      fr.push(p); rb.push(1); var k0 = fr.length - 1;
      sc.push({s: head+"chưa có, <b>lỗi trang</b>. Còn khung trống nên nạp trang "+p+" vào khung "+(k0+1)+", R = 1.",
        d:[pre, u("c"+i,{c:"bad"}), frameOps(), f("f"+k0), u("cnt",{t:"Lỗi trang: "+faults}), u("note",{t:"✘ Lỗi trang\nnạp vào khung trống "+(k0+1),c:"bad"})]});
      return;
    }
    /* RAM đầy: kim quay từng khung một */
    var first = true;
    while (rb[hand] === 1){
      var q = fr[hand], from = hand;
      rb[hand] = 0; hand = (hand + 1) % N;
      sc.push({s:(first ? head+"chưa có, <b>lỗi trang</b>, RAM đầy nên phải bỏ một trang. " : "")+
          "Kim chỉ khung "+(from+1)+", đang chứa trang "+q+", có <b>R = 1</b>: xóa thành 0, tha, quay kim sang khung "+(hand+1)+".",
        d:[first ? [pre, u("c"+i,{c:"bad"}), u("cnt",{t:"Lỗi trang: "+faults})] : [], frameOps(), handOps(), f("f"+from),
           u("note",{t:(first ? "✘ Lỗi trang · RAM đầy\n" : "")+"Khung "+(from+1)+": R = 1 → tha\nquay kim tiếp",c:"warn"})]});
      first = false;
    }
    var v = hand, old = fr[v];
    fr[v] = p; rb[v] = 1; hand = (v + 1) % N;
    sc.push({s:(first ? head+"chưa có, <b>lỗi trang</b>, RAM đầy. " : "")+
        "Kim chỉ khung "+(v+1)+", đang chứa trang "+old+", có <b>R = 0</b>: <b>bỏ trang "+old+"</b>, nạp trang "+p+" vào đó với R = 1, rồi kim sang khung "+(hand+1)+".",
      d:[first ? [pre, u("c"+i,{c:"bad"}), u("cnt",{t:"Lỗi trang: "+faults})] : [], frameOps(), handOps(), f("f"+v),
         u("note",{t:(first ? "✘ Lỗi trang · RAM đầy\n" : "")+"Khung "+(v+1)+": R = 0 → bỏ trang "+old+"\nnạp trang "+p,c:"bad"})]});
  });

  sc.push({s:"Clock gây <b>"+faults+" lỗi trang</b> với chuỗi này, ít hơn FIFO (15) vì không vứt trang vừa được dùng. Clock chỉ cần một con kim quay vòng nên rất <b>thực tế</b>. Lưu ý: nếu đề quy ước trang vừa nạp có <b>R = 0</b> thì chỉ còn "+simulateClock0()+" lỗi, hãy dùng công cụ tính thử bên dưới.",
    d:[clr(), H("Clock / Second chance – kết quả"), b("res",280,140,400,140,faults+" lỗi trang","bad",{fs:34,s:"chuỗi 20 tham chiếu · 3 khung · trang vừa nạp R = 1"}),
       t("cmp",480,340,CMP,{fs:17,c:"warn"}), t("cv",480,400,"Nếu quy ước trang vừa nạp có R = 0: "+simulateClock0()+" lỗi trang",{fs:16,c:"gray"})]});
  return {title:"Clock / Second chance · 3 khung trang", scenes:sc};
};
/* Clock với quy ước trang vừa nạp có R = 0 (chỉ để báo con số so sánh) */
function simulateClock0(){
  var fr=[], rb=[], hand=0, faults=0;
  R0.forEach(function(p){
    var idx=fr.indexOf(p);
    if (idx>=0){ rb[idx]=1; return; }
    faults++;
    if (fr.length<3){ fr.push(p); rb.push(0); return; }
    while (rb[hand]===1){ rb[hand]=0; hand=(hand+1)%3; }
    fr[hand]=p; rb[hand]=0; hand=(hand+1)%3;
  });
  return faults;
}

/* Aging dễ hiểu: dùng "điểm" thập phân (chia đôi = dịch phải 1 bit, +128 = bật bit trái nhất), chạy từng bước như FIFO / LRU */
V["s4-10~aging"] = function(){
  var REF = [1,2,3,1,4,2,1,3], N = 3, sc = [];
  function bin(v){ return ("00000000" + v.toString(2)).slice(-8); }

  /* --- Ý tưởng --- */
  sc.push({s:"Aging làm gần giống <b>LRU</b>: bỏ trang lâu nhất chưa được dùng. Nhưng thay vì nhớ thời điểm của mọi lần dùng, mỗi trang chỉ giữ một con số gọi là <b>điểm</b>, giống độ nóng: trang lâu không dùng thì nguội dần, trang vừa dùng thì nóng lên.",
    d:[H("Aging = LRU “phiên bản rẻ”"),
       b("i1",80,110,380,130,"LRU","ok",{fs:24,s:"bỏ trang lâu nhất chưa dùng\ncần nhớ thời điểm MỌI lần dùng → đắt"}),
       b("i2",500,110,380,130,"Aging","brand",{fs:24,s:"mỗi trang chỉ giữ 1 con số: ĐIỂM\nđiểm thấp = lâu không dùng"}),
       t("i3",480,320,"Trang lâu không dùng thì “nguội” dần · trang vừa dùng thì “nóng” lên",{fs:18,c:"warn"})]});
  sc.push({s:"Luật chỉ có 2 việc, làm sau mỗi nhịp đồng hồ. Một: điểm của mọi trang <b>chia đôi</b>. Hai: trang nào được dùng trong nhịp vừa qua thì <b>cộng 128</b>. Khi cần bỏ trang, bỏ trang có <b>điểm thấp nhất</b>, tức nguội nhất.",
    d:[clr(), H("Luật của Aging: 2 việc sau mỗi nhịp đồng hồ"),
       b("r1",80,95,800,85,"① Mọi trang: điểm CHIA ĐÔI   (nguội đi một nửa)","cyan",{fs:22}),
       b("r2",80,200,800,85,"② Trang được dùng trong nhịp vừa qua: + 128   (nóng lên)","ok",{fs:22}),
       b("r3",80,305,800,85,"Cần bỏ trang → bỏ trang có điểm THẤP NHẤT (nguội nhất)","bad",{fs:22}),
       t("r4",480,450,"Ví von: mỗi trang là một cốc trà. Cứ mỗi nhịp trà nguội đi một nửa;\ncốc nào vừa được uống thì rót thêm trà nóng. Cần chỗ thì dọn cốc nguội nhất.",{fs:15,c:"gray"})]});
  sc.push({s:"Trong slide, Aging được tả bằng bit: <b>dịch phải</b> bộ đếm rồi đưa bit R vào <b>bên trái</b>. Dịch phải 1 bit chính là chia đôi, còn bật bit trái nhất chính là cộng 128. Hai cách nói là một. Video này tính bằng số thập phân cho dễ.",
    d:[clr(), H("Liên hệ với cách nói bằng bit trong slide"),
       b("k1",80,110,380,120,"Chia đôi","cyan",{fs:24,s:"= dịch phải 1 bit\n144 (10010000) → 72 (01001000)"}),
       b("k2",500,110,380,120,"+ 128","ok",{fs:24,s:"= bật bit trái nhất (bit R = 1)\n16 (00010000) → 144 (10010000)"}),
       t("k3",480,300,"Đó chính là “dịch phải bộ đếm 8 bit, đưa bit R vào bên trái” trong slide.",{fs:17,c:"warn"}),
       t("k4",480,350,"Video này dùng số thập phân cho dễ tính.",{fs:16,c:"gray"})]});

  /* --- Chạy từng bước --- */
  var base = [clr(), H("Aging từng bước · 3 khung trang")];
  REF.forEach(function(p, i){ base.push(b("tk"+i,60+i*105,60,95,52,"trang "+p,"gray",{fs:16,s:"nhịp "+(i+1),ss:11})); });
  for (var k = 0; k < N; k++) base.push(b("f"+k,180,180+k*90,170,64,"(trống)","none",{dash:1,fs:18}), t("fl"+k,150,212+k*90,"Khung "+(k+1),{a:"end",fs:15,c:"gray"}), t("fi"+k,370,212+k*90,"",{a:"start",fs:15,c:"violet"}));
  base.push(b("rule",560,160,370,150,"Sau mỗi nhịp đồng hồ:\n① điểm mọi trang chia đôi\n② trang vừa dùng + 128\nCần bỏ trang → bỏ điểm THẤP nhất","violet",{fs:15}),
    b("cnt",600,340,300,56,"Lỗi trang: 0","bad",{fs:20}), t("note",750,450,"",{fs:16}));
  sc.push({s:"Chạy thử 8 nhịp đồng hồ. Mỗi nhịp CPU dùng một trang, ghi ở hàng trên cùng. RAM có 3 khung. Trang mới nạp bắt đầu với <b>điểm 0</b>.",
    d:[base, u("note",{t:"Trang mới nạp: điểm = 0",c:"warn"})]});

  var fr = [], pts = {}, last = {}, faults = 0;
  function infoOps(hl){
    var o = [];
    for (var j = 0; j < N; j++){
      if (fr[j] === undefined) continue;
      var v = pts[fr[j]];
      o.push(u("fi"+j,{t:"điểm = "+v+"   ("+bin(v)+")", c: hl === j ? "bad" : "violet"}));
    }
    return o;
  }
  REF.forEach(function(p, i){
    var ops = [u("tk"+i,{c:"warn"})], s = "Nhịp "+(i+1)+": CPU dùng <b>trang "+p+"</b>";
    var idx = fr.indexOf(p);
    for (var j = 0; j < fr.length; j++) ops.push(u("f"+j,{c:"gray"}));
    if (idx >= 0){
      s += ", đã có trong RAM nên <b>không lỗi</b>. Cuối nhịp trang "+p+" sẽ được cộng 128.";
      ops.push(u("tk"+i,{c:"ok"}), u("f"+idx,{c:"ok"}), f("f"+idx), infoOps(-1), u("note",{t:"✔ Không lỗi",c:"ok"}));
    } else {
      faults++;
      if (fr.length < N){
        fr.push(p); pts[p] = 0; var k0 = fr.length - 1;
        s += ", chưa có nên <b>lỗi trang</b>. Còn khung trống: nạp vào khung "+(k0+1)+", điểm bắt đầu bằng 0.";
        ops.push(u("tk"+i,{c:"bad"}), u("f"+k0,{t:"trang "+p,c:"ok",dash:0}), f("f"+k0), infoOps(-1), u("note",{t:"✘ Lỗi trang · nạp vào khung trống",c:"bad"}));
      } else {
        var vi = 0; fr.forEach(function(q, j){ if (pts[q] < pts[fr[vi]]) vi = j; });
        var lru = 0; fr.forEach(function(q, j){ if (last[q] < last[fr[lru]]) lru = j; });
        var old = fr[vi], list = fr.map(function(q){ return "trang "+q+" = "+pts[q]; }).join(", ");
        s += ", chưa có nên <b>lỗi trang</b>, RAM đầy. So điểm: "+list+". <b>Trang "+old+"</b> điểm thấp nhất, tức nguội nhất, nên bị bỏ."+
             (lru === vi ? " LRU cũng bỏ trang "+old+" vì nó lâu nhất chưa được dùng." : " (LRU sẽ bỏ trang "+fr[lru]+".)");
        ops.push(u("tk"+i,{c:"bad"}), infoOps(vi), u("f"+vi,{c:"bad"}), f("fi"+vi),
          u("note",{t:"✘ Lỗi trang · RAM đầy\nbỏ trang "+old+" (điểm thấp nhất)",c:"bad"}));
        sc.push({s:s, d:ops.concat([u("cnt",{t:"Lỗi trang: "+faults})])});
        delete pts[old]; fr[vi] = p; pts[p] = 0;
        ops = [u("f"+vi,{t:"trang "+p,c:"ok"}), f("f"+vi), infoOps(-1), u("note",{t:"Nạp trang "+p+" vào khung "+(vi+1)+"\nđiểm bắt đầu = 0",c:"warn"})];
        s = "Nạp trang "+p+" vào khung "+(vi+1)+" vừa trống, điểm bắt đầu bằng 0.";
      }
    }
    last[p] = i;
    ops.push(u("cnt",{t:"Lỗi trang: "+faults}));
    sc.push({s:s, d:ops});
    /* cuối nhịp: chia đôi, trang vừa dùng + 128 */
    var up = [];
    fr.forEach(function(q, j){
      var v = pts[q], h = Math.floor(v / 2), nv = h + (q === p ? 128 : 0);
      up.push(u("fi"+j,{t: q === p ? v+" → "+h+" + 128 = "+nv : v+" → "+h, c: q === p ? "ok" : "cyan"}));
      pts[q] = nv;
    });
    up.push(u("note",{t:"Cuối nhịp "+(i+1)+": chia đôi\ntrang "+p+" + 128",c:"cyan"}), f("rule"));
    sc.push({s:"Cuối nhịp "+(i+1)+": điểm mọi trang chia đôi, riêng trang "+p+" vừa được dùng thì cộng thêm 128.", d:up});
  });

  /* --- Vì sao chỉ là xấp xỉ --- */
  sc.push({s:"Ở ví dụ này Aging chọn trang bỏ <b>giống hệt LRU</b>, tổng cộng "+faults+" lỗi trang. Nhưng Aging chỉ là <b>xấp xỉ</b>: nếu trang 1 và trang 2 cùng được dùng trong một nhịp, cả hai đều chỉ được cộng 128 nên điểm bằng nhau. LRU biết trang nào dùng trước, Aging thì không. Ngoài ra, trang không dùng quá 8 nhịp thì điểm về 0, như chưa từng được dùng.",
    d:[clr(), H("Vì sao Aging chỉ là “xấp xỉ” LRU?"),
       b("res",280,90,400,90,faults+" lỗi trang · chọn giống LRU","ok",{fs:22}),
       b("a1",120,230,320,90,"Trang 1","ok",{fs:20,s:"dùng ĐẦU nhịp → + 128"}),
       b("a2",520,230,320,90,"Trang 2","ok",{fs:20,s:"dùng CUỐI nhịp → + 128"}),
       t("a3",480,370,"Điểm bằng nhau → Aging không biết trang nào dùng trước (LRU thì biết)",{fs:17,c:"warn"}),
       t("a4",480,425,"Chỉ nhớ 8 nhịp: không dùng quá 8 nhịp thì điểm về 0",{fs:16,c:"gray"})]});
  sc.push({s:"Tóm lại: Aging giữ cho mỗi trang một điểm. Mỗi nhịp điểm chia đôi, trang vừa dùng cộng 128, cần chỗ thì bỏ trang điểm thấp nhất. Muốn xem ví dụ 6 trang trong giáo trình bằng bit, mở tab <b>Aging: ví dụ giáo trình</b>.",
    d:[clr(), H("Aging trong 3 dòng"),
       b("z1",110,110,740,80,"Mỗi trang có 1 điểm (bộ đếm 8 bit)","brand",{fs:20}),
       b("z2",110,220,740,80,"Mỗi nhịp: chia đôi (dịch phải) · trang vừa dùng + 128 (bit R vào trái)","cyan",{fs:18}),
       b("z3",110,330,740,80,"Cần bỏ trang → bỏ trang có điểm thấp nhất","bad",{fs:20})]});
  return {title:"Thuật toán Aging từng bước", scenes:sc};
};

/* Aging bằng bit: lý do, NFU, ví dụ 6 trang × 5 nhịp trong giáo trình */
V["s4-10~agingbit"] = function(){
  var sc = [], W = ["128","64","32","16","8","4","2","1"], AGE = ["vừa xong","trước 1","trước 2","trước 3","trước 4","trước 5","trước 6","trước 7"];
  function bits(v){ return ("00000000" + v.toString(2)).slice(-8).split(""); }
  function cellOps(prefix, v){ return bits(v).map(function(c, j){ return u(prefix + j, {t:c, c: c === "1" ? "ok" : "dark"}); }); }

  /* --- Vì sao cần Aging --- */
  sc.push({s:"LRU cần biết thời điểm của <b>mọi</b> lần truy cập, phần cứng không làm nổi. Phần cứng chỉ cho mỗi trang một bit <b>R</b>: trang được dùng thì R = 1. Sau mỗi nhịp đồng hồ, HĐH xem bit R rồi xóa về 0. Chỉ với bit R, làm sao đoán trang nào lâu nhất chưa dùng?",
    d:[H("Vì sao cần Aging?"),
       b("l1",80,100,380,120,"LRU chính xác","ok",{fs:20,s:"phải ghi thời điểm MỌI lần truy cập → quá tốn"}),
       b("l2",500,100,380,120,"Phần cứng chỉ cho","warn",{fs:20,s:"mỗi trang 1 bit R: = 1 khi trang được dùng"}),
       t("l3",480,290,"HĐH xem bit R ở mỗi nhịp đồng hồ (clock tick), rồi xóa R về 0",{fs:17,c:"gray"}),
       t("l4",480,360,"→ Chỉ với bit R, đoán trang nào lâu nhất chưa dùng?",{fs:20,c:"brand"})]});

  /* --- NFU và lỗi "không bao giờ quên" --- */
  var A = [1,1,1,1,1,0,0,0], B = [0,0,0,0,0,0,1,1], nfu = [clr(), H("Cách thô: NFU – đếm số nhịp được dùng")];
  for (var j = 0; j < 8; j++){
    nfu.push(t("tk"+j,225+60*j,135,"nhịp "+(j+1),{fs:12,c:"gray"}),
      b("na"+j,200+60*j,160,50,44,String(A[j]),A[j]?"ok":"dark",{fs:18,r:6}),
      b("nb"+j,200+60*j,230,50,44,String(B[j]),B[j]?"ok":"dark",{fs:18,r:6}));
  }
  nfu.push(t("la",170,182,"Trang A",{a:"end",fs:16}), t("lb",170,252,"Trang B",{a:"end",fs:16}),
    b("ca",720,160,200,44,"NFU đếm = 5","warn",{fs:17}), b("cb",720,230,200,44,"NFU đếm = 2","warn",{fs:17}),
    t("tm",440,310,"thời gian →   (nhịp 8 là vừa xong)",{fs:14,c:"gray"}));
  sc.push({s:"Cách đơn giản là <b>NFU</b>: mỗi nhịp, cộng bit R vào bộ đếm của trang. Trang A được dùng 5 nhịp đầu rồi bỏ không, nên đếm = 5. Trang B vừa được dùng ở 2 nhịp gần nhất, nên đếm = 2.",
    d:nfu});
  sc.push({s:"NFU sẽ bỏ <b>B</b> vì đếm nhỏ hơn. Nhưng B mới là trang đang được dùng, còn A đã lâu không ai đụng tới. Lỗi của NFU là <b>không bao giờ quên</b>: dùng nhiều từ lâu vẫn được tính như mới.",
    d:[u("cb",{c:"bad",t:"→ NFU bỏ B ✘"}), f("cb"), t("w",480,390,"B đang được dùng mà lại bị bỏ!\nNFU không bao giờ “quên” quá khứ.",{fs:18,c:"bad"})]});

  /* --- Ý tưởng Aging: trọng số theo độ gần --- */
  var idea = [clr(), H("Aging: lần dùng gần đây đáng giá hơn")];
  for (var k = 0; k < 8; k++) idea.push(t("wt"+k,195+80*k,145,W[k],{fs:15,c:"warn"}), b("g"+k,160+80*k,165,70,60,"0","dark",{fs:24,r:8}), t("ag"+k,195+80*k,245,AGE[k],{fs:12,c:"gray"}));
  idea.push(t("wl",120,195,"Bộ đếm",{a:"end",fs:15}), t("wtl",120,145,"giá trị",{a:"end",fs:13,c:"warn"}),
    t("ex",480,310,"Bit 1 càng nằm bên TRÁI → trang được dùng càng GẦN đây → bộ đếm càng LỚN",{fs:17,c:"warn"}),
    t("ex2",480,360,"Cần bỏ trang thì bỏ trang có bộ đếm NHỎ NHẤT",{fs:17,c:"bad"}));
  sc.push({s:"Aging sửa lỗi đó bằng cách cho lần dùng <b>gần đây</b> giá trị lớn hơn. Mỗi trang có bộ đếm 8 bit. Bit trái nhất ứng với nhịp vừa xong, đáng 128. Bit kế ứng với 1 nhịp trước, đáng 64. Cứ thế giảm một nửa. Bit 1 càng nằm bên trái thì bộ đếm càng lớn.",
    d:idea});

  /* --- Cơ chế từng bước trên một bộ đếm --- */
  sc.push({s:"Mỗi nhịp đồng hồ, HĐH làm đúng 2 việc với bộ đếm. Xem ví dụ một trang đang có bộ đếm 1 0 1 0 0 0 0 0: được dùng ở nhịp vừa xong và 2 nhịp trước.",
    d:[x("ex","ex2"), cellOps("g", 160), t("st",480,320,"Bộ đếm hiện tại: 1 0 1 0 0 0 0 0  = 128 + 32 = 160",{fs:17})]});
  sc.push({s:"Việc ①: <b>dịch phải</b> 1 bit. Mọi lần dùng cũ lùi về quá khứ thêm một nhịp nên giá trị giảm một nửa. Bit phải nhất rơi mất, tức lần dùng quá 8 nhịp thì quên luôn.",
    d:[cellOps("g", 80), u("g0",{t:"?",c:"warn"}), f("g1","g2","g3"),
       u("st",{t:"① Dịch phải: 0 1 0 1 0 0 0 0  (bit trái nhất đang chờ)",c:"cyan"})]});
  sc.push({s:"Việc ②: chép bit <b>R</b> của nhịp vừa xong vào bit <b>trái nhất</b>, rồi xóa R về 0. Trang này vừa được dùng nên R = 1, bộ đếm thành 1 1 0 1 0 0 0 0, lớn lên ngay.",
    d:[cellOps("g", 208), f("g0"),
       u("st",{t:"② R = 1 vào bit trái: 1 1 0 1 0 0 0 0  = 208",c:"ok"}),
       t("st2",480,370,"Nếu nhịp này trang KHÔNG được dùng (R = 0): 0 1 0 1 0 0 0 0 = 80, bộ đếm nhỏ đi",{fs:15,c:"gray"})]});

  /* --- Quay lại A và B --- */
  var ab = [clr(), H("Quay lại ví dụ A và B với Aging")];
  var va = 0, vb = 0; for (var q = 0; q < 8; q++){ va = (A[q] << 7) | (va >> 1); vb = (B[q] << 7) | (vb >> 1); }
  for (var m = 0; m < 8; m++) ab.push(t("hw"+m,204+56*m,140,W[m],{fs:12,c:"warn"}), b("xa"+m,180+56*m,160,48,48,"0","dark",{fs:20,r:6}), b("xb"+m,180+56*m,240,48,48,"0","dark",{fs:20,r:6}));
  ab.push(t("ya",160,184,"Trang A",{a:"end",fs:16}), t("yb",160,264,"Trang B",{a:"end",fs:16}), cellOps("xa", va), cellOps("xb", vb),
    b("za",680,160,240,48,"= "+va,"bad",{fs:20}), b("zb",680,240,240,48,"= "+vb,"ok",{fs:20}),
    t("tip",480,340,"Mẹo so sánh: đọc từ trái sang, trang nào gặp bit 1 trước thì lớn hơn",{fs:16,c:"warn"}),
    t("vd",480,400,"Aging bỏ A ("+va+" < "+vb+") ✔  đúng: A đã lâu không dùng",{fs:19,c:"ok"}));
  sc.push({s:"Với Aging, các lần dùng của A đều đã cũ nên bộ đếm của A chỉ là 0 0 0 1 1 1 1 1, bằng "+va+". B vừa được dùng nên bộ đếm là 1 1 0 0 0 0 0 0, bằng "+vb+". Aging bỏ <b>A</b>, đúng như mong muốn.",
    d:ab});

  /* --- Ví dụ giáo trình: 6 trang, 5 nhịp --- */
  var T = [[1,0,1,0,1,1],[1,1,0,0,1,0],[1,1,0,1,0,1],[1,0,0,0,1,0],[0,1,1,0,0,0]], C = [0,0,0,0,0,0];
  var ex = [clr(), H("Ví dụ: 6 trang, 5 nhịp đồng hồ"),
    t("hR",140,115,"bit R",{fs:12,c:"gray"}), t("hc",406,115,"bộ đếm 8 bit (cột trái = nhịp gần nhất)",{fs:12,c:"gray"})];
  for (var p = 0; p < 6; p++){
    ex.push(t("pn"+p,95,162+p*55,"Trang "+p,{a:"end",fs:15}), b("rr"+p,110,140+p*55,62,44,"R = 0","gray",{fs:13}));
    for (var c = 0; c < 8; c++) ex.push(b("e"+p+"_"+c,200+c*52,140+p*55,46,44,"0","dark",{fs:18,r:6}));
  }
  ex.push(b("side",650,140,280,180,"Mỗi nhịp:\n① cột cũ lùi sang phải\n② cột R mới chèn vào\nbên trái","violet",{fs:16}));
  sc.push({s:"Giờ làm ví dụ trong giáo trình: 6 trang, 5 nhịp đồng hồ. Mỗi hàng là bộ đếm của một trang, ban đầu đều bằng 0. Hãy nhìn cột bit R mới được chèn vào bên trái ở mỗi nhịp.", d:ex});
  T.forEach(function(row, k){
    var ops = [], hot = [];
    row.forEach(function(r, p){
      C[p] = (r << 7) | (C[p] >> 1);
      ops.push(u("rr"+p,{t:"R = "+r, c: r ? "ok" : "gray"}));
      bits(C[p]).forEach(function(bt, c){ ops.push(u("e"+p+"_"+c,{t:bt, c: bt === "1" ? "ok" : "dark"})); });
      hot.push("e"+p+"_0");
    });
    ops.push(f.apply(null, hot));
    sc.push({s:"Nhịp "+k+": bit R của trang 0 đến 5 là "+row.join(" ")+". Cột này chèn vào bên trái, các cột cũ lùi sang phải một ô.", d:ops});
  });
  var mn = 0; C.forEach(function(v, p){ if (v < C[mn]) mn = p; });
  var rowsTxt = C.map(function(v, p){ return "trang "+p+": "+bits(v).join(""); }).join("\n");
  sc.push({s:"Cần bỏ trang thì chọn bộ đếm <b>nhỏ nhất</b>. So từ trái sang: trang 3 và trang 5 cùng bắt đầu bằng 0 0 1, nhưng trang 5 còn một bit 1 phía sau. Vậy <b>trang 3</b>, bộ đếm 0 0 1 0 0 0 0 0, nhỏ nhất và bị bỏ.",
    d:[u("side",{t:"Bộ đếm nhỏ nhất:\ntrang "+mn+" = "+bits(C[mn]).join("")+"\n→ bỏ trang "+mn,c:"bad",fs:17}),
       u("rr"+mn,{c:"bad"}), f("e"+mn+"_0","e"+mn+"_1","e"+mn+"_2")].concat(bits(C[mn]).map(function(bt, c){ return u("e"+mn+"_"+c,{c: bt === "1" ? "bad" : "dark"}); }))});

  /* --- Tổng kết --- */
  sc.push({s:"Tóm lại: NFU chỉ cộng dồn nên không bao giờ quên. Aging dịch phải rồi đưa R vào bên trái, nên lần dùng gần đây đáng giá hơn và lần dùng quá 8 nhịp thì bị quên. Vì vậy Aging <b>xấp xỉ LRU tốt</b>. Nhược điểm nhỏ: chỉ nhớ 8 nhịp, và hai trang dùng trong cùng một nhịp thì không phân biệt được trang nào dùng sau.",
    d:[clr(), H("NFU và Aging"),
       b("s1",60,100,400,150,"NFU","warn",{fs:22,s:"bộ đếm += R mỗi nhịp\nkhông bao giờ quên → xấp xỉ LRU thô"}),
       b("s2",500,100,400,150,"Aging","ok",{fs:22,s:"dịch phải, R vào bit trái\ngần đây đáng giá hơn → xấp xỉ LRU tốt"}),
       t("s3",480,320,"Giới hạn của Aging: chỉ nhớ 8 nhịp gần nhất;\n2 trang dùng trong cùng 1 nhịp thì không biết trang nào dùng sau",{fs:16,c:"gray"})]});
  sc.push({s:"Toàn cảnh nhóm thuật toán xấp xỉ LRU: <b>NRU</b> chia trang thành 4 lớp theo bit R, M (rất thô) · <b>NFU</b> đếm số lần dùng (thô) · <b>Aging</b> là NFU có lão hóa (tốt) · <b>Working set / WSClock</b> giữ tập trang tiến trình đang dùng.",
    d:[clr(), H("Các thuật toán xấp xỉ LRU"), b("n1",40,110,420,150,"NRU","gray",{s:"4 lớp theo (R, M) · rất thô"}), b("n2",500,110,420,150,"NFU","warn",{s:"đếm số lần dùng · xấp xỉ LRU thô"}), b("n3",40,290,420,150,"Aging","ok",{s:"NFU + dịch phải · xấp xỉ LRU tốt"}), b("n4",500,290,420,150,"Working set / WSClock","violet",{s:"giữ tập trang đang dùng · WSClock tốt"})]});
  return {title:"Thuật toán Aging (xấp xỉ LRU)", scenes:sc};
};
Object.assign(window.VLABEL, {"s4-10":"FIFO","s4-10~lru":"LRU","s4-10~opt":"Optimal","s4-10~clock":"Clock / Second chance","s4-10~aging":"Aging","s4-10~agingbit":"Aging: ví dụ giáo trình (bit)"});
})();
