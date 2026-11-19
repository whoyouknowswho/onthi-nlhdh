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

V["s4-10~aging"] = function(){
  var T=[[1,0,1,0,1,1],[1,1,0,0,1,0],[1,1,0,1,0,1],[1,0,0,0,1,0],[0,1,1,0,0,0]], C=[0,0,0,0,0,0], sc=[], base=[H("Thuật toán Aging (lão hóa) · 6 trang, bộ đếm 8 bit")];
  function bin(v){ return ("00000000"+v.toString(2)).slice(-8); }
  for (var p=0;p<6;p++) base.push(t("pn"+p,110,150+p*55,"Trang "+p,{a:"end",fs:16}), b("rr"+p,140,128+p*55,70,44,"R = 0","gray",{fs:14}), b("cc"+p,240,128+p*55,220,44,"00000000","dark",{fs:18}));
  base.push(t("th",175,105,"bit R",{fs:13,c:"gray"}), t("tc",350,105,"bộ đếm (counter)",{fs:13,c:"gray"}), b("rule",520,140,400,170,"Mỗi nhịp đồng hồ (clock tick):\n① dịch phải bộ đếm 1 bit\n② chép bit R vào bit TRÁI nhất\n③ xóa R về 0","violet",{fs:16}));
  sc.push({s:"<b>Aging</b> là cách xấp xỉ LRU bằng phần mềm. Mỗi trang có một <b>bộ đếm 8 bit</b>. Sau mỗi nhịp đồng hồ: dịch phải bộ đếm, rồi đưa bit R (trang có được dùng trong nhịp vừa qua không) vào bit <b>bên trái</b> nhất.", d:[base]});
  T.forEach(function(row,k){
    var ops=[], hot=[];
    row.forEach(function(r,p){ C[p]=(r<<7)|(C[p]>>1); ops.push(u("rr"+p,{t:"R = "+r,c:r?"ok":"gray"}), u("cc"+p,{t:bin(C[p])})); if (r) hot.push("cc"+p); });
    ops.push(f.apply(null,hot));
    sc.push({s:"Nhịp "+k+": bit R của trang 0 đến 5 là "+row.join(" ")+". Trang vừa được dùng có bit <b>1 ở bên trái</b> nên bộ đếm lớn; trang lâu không dùng thì bộ đếm <b>nhỏ dần</b> vì cứ bị dịch phải.", d:ops, t:7000});
  });
  var mn=0; C.forEach(function(v,p){ if (v<C[mn]) mn=p; });
  sc.push({s:"Khi cần bỏ trang, chọn trang có <b>bộ đếm nhỏ nhất</b> – ở đây là <b>trang "+mn+"</b> ("+bin(C[mn])+"). Bit bên trái có “trọng số” lớn nên lần dùng <b>gần đây</b> quan trọng hơn lần dùng xa. Đó là lý do Aging <b>xấp xỉ LRU rất tốt</b> mà vẫn chạy hiệu quả.",
    d:[u("cc"+mn,{c:"bad"}), u("rr"+mn,{c:"bad"}), f("cc"+mn), u("rule",{t:"Bỏ trang có bộ đếm NHỎ NHẤT\n→ trang "+mn+" ("+bin(C[mn])+")\n\nKhác NFU: NFU chỉ cộng dồn,\nkhông “quên” quá khứ",c:"bad"})]});
  sc.push({s:"Tóm tắt nhóm thuật toán xấp xỉ LRU: <b>NRU</b> chia trang thành 4 lớp theo bit R, M (rất thô) · <b>NFU</b> đếm số lần dùng (xấp xỉ LRU khá thô) · <b>Aging</b> = NFU có lão hóa (xấp xỉ LRU tốt) · <b>Working set / WSClock</b> giữ tập trang tiến trình đang dùng.",
    d:[clr(), H("Các thuật toán xấp xỉ LRU"), b("n1",40,110,420,150,"NRU","gray",{s:"4 lớp theo (R, M) · rất thô"}), b("n2",500,110,420,150,"NFU","warn",{s:"đếm số lần dùng · xấp xỉ LRU thô"}), b("n3",40,290,420,150,"Aging","ok",{s:"NFU + dịch phải · xấp xỉ LRU tốt"}), b("n4",500,290,420,150,"Working set / WSClock","violet",{s:"giữ tập trang đang dùng · WSClock tốt"})]});
  return {title:"Thuật toán Aging (xấp xỉ LRU)", scenes:sc};
};
Object.assign(window.VLABEL, {"s4-10":"FIFO","s4-10~lru":"LRU","s4-10~opt":"Optimal","s4-10~clock":"Clock / Second chance","s4-10~aging":"Aging"});
})();
