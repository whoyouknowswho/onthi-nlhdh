/* Trình phát "video" hoạt hình tự dựng bằng SVG.
   Mỗi video = danh sách cảnh {s: lời thuyết minh (HTML), d: [thao tác], t?: thời lượng ms}
   Thao tác: ["+", id, "box"|"txt"|"arr"|"dot", props] thêm · ["~", id, props] đổi · ["-", id] xóa · ["!", id] nhấp nháy · ["clear"]
   Trạng thái mỗi cảnh = cộng dồn thao tác từ cảnh 0 → cảnh hiện tại (tua tới/lui chính xác). */
(function(){
"use strict";
var NS = "http://www.w3.org/2000/svg";
var C = {
  brand:["rgba(99,102,241,.22)","#818cf8"], ok:["rgba(16,185,129,.22)","#34d399"], bad:["rgba(244,63,94,.22)","#fb7185"],
  warn:["rgba(245,158,11,.24)","#fbbf24"], violet:["rgba(168,85,247,.22)","#c084fc"], cyan:["rgba(6,182,212,.22)","#22d3ee"],
  gray:["rgba(148,160,184,.14)","#7c8aa5"], dark:["rgba(15,21,35,.85)","#3b4a6b"], solid:["#6366f1","#a5b4fc"], none:["transparent","transparent"]
};
function col(k, i){ return (C[k] || C.gray)[i]; }
function tcol(k){ return k ? (C[k] ? C[k][1] : k) : "var(--vtext)"; }

/* ---------- Trạng thái ---------- */
function flat(a, out){
  out = out || [];
  (a || []).forEach(function(x){ if (!x || !x.length) return; if (typeof x[0] === "string") out.push(x); else flat(x, out); });
  return out;
}
function stateAt(scenes, k){
  var st = {}, order = [], flashes = [];
  for (var i = 0; i <= k; i++){
    flat(scenes[i].d).forEach(function(op){
      var o = op[0];
      if (o === "clear"){ st = {}; order = []; }
      else if (o === "+"){ if (!st[op[1]]) order.push(op[1]); st[op[1]] = {type: op[2], p: Object.assign({}, op[3])}; }
      else if (o === "~"){ if (st[op[1]]) st[op[1]].p = Object.assign({}, st[op[1]].p, op[2]); }
      else if (o === "-"){ delete st[op[1]]; }
      else if (o === "!" && i === k){ flashes.push(op[1]); }
    });
  }
  return {st: st, order: order.filter(function(id){ return st[id]; }), flashes: flashes};
}

/* ---------- Vẽ ---------- */
function mk(tag, attrs){ var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
function lines(textEl, t, fs, cx, cy, color, fw){
  while (textEl.firstChild) textEl.removeChild(textEl.firstChild);
  var arr = String(t == null ? "" : t).split("\n"), lh = fs * 1.22, y0 = cy - (arr.length - 1) * lh / 2;
  textEl.setAttribute("font-size", fs); textEl.setAttribute("fill", color); textEl.setAttribute("font-weight", fw || 700);
  arr.forEach(function(s, i){ var ts = mk("tspan", {x: cx, y: y0 + i * lh}); ts.textContent = s; textEl.appendChild(ts); });
}
function build(type){
  var g = mk("g", {"class": "vel v-" + type});
  if (type === "box"){ g.appendChild(mk("rect", {})); g.appendChild(mk("text", {"text-anchor": "middle", "dominant-baseline": "central"})); g.appendChild(mk("text", {"text-anchor": "middle", "dominant-baseline": "central", "class": "vsub"})); }
  else if (type === "txt"){ g.appendChild(mk("text", {"dominant-baseline": "central"})); }
  else if (type === "arr"){ g.appendChild(mk("path", {pathLength: 1, "class": "vdraw", fill: "none"})); g.appendChild(mk("text", {"text-anchor": "middle", "dominant-baseline": "central", "class": "vlab"})); }
  else if (type === "dot"){ g.appendChild(mk("circle", {})); g.appendChild(mk("text", {"text-anchor": "middle", "dominant-baseline": "central"})); }
  return g;
}
function update(g, type, p){
  var op = p.o == null ? 1 : p.o;
  g.style.opacity = op;
  if (type === "box"){
    var w = p.w || 100, h = p.h || 50, r = g.childNodes[0], tx = g.childNodes[1], sb = g.childNodes[2];
    g.style.transform = "translate(" + (p.x || 0) + "px," + (p.y || 0) + "px)";
    r.setAttribute("width", w); r.setAttribute("height", h); r.setAttribute("rx", p.r == null ? 10 : p.r);
    r.setAttribute("fill", col(p.c, 0)); r.setAttribute("stroke", col(p.c, 1)); r.setAttribute("stroke-width", p.sw || 2);
    r.setAttribute("stroke-dasharray", p.dash ? "7 6" : "none");
    var fs = p.fs || 18, hasSub = p.s != null && p.s !== "";
    lines(tx, p.t, fs, w / 2, hasSub ? h / 2 - fs * 0.45 : h / 2, tcol(p.tc), p.fw);
    lines(sb, hasSub ? p.s : "", p.ss || 13, w / 2, h / 2 + fs * 0.75, "var(--vmuted)", 600);
  } else if (type === "txt"){
    var t = g.childNodes[0];
    g.style.transform = "translate(" + (p.x || 0) + "px," + (p.y || 0) + "px)";
    t.setAttribute("text-anchor", p.a || "middle");
    lines(t, p.t, p.fs || 18, 0, 0, tcol(p.c), p.fw || 700);
  } else if (type === "arr"){
    var pa = g.childNodes[0], lb = g.childNodes[1], x1 = p.x1, y1 = p.y1, x2 = p.x2, y2 = p.y2, d;
    if (p.cv){ var mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx*dx + dy*dy) || 1;
      var cx = mx - dy / L * p.cv, cy = my + dx / L * p.cv; d = "M" + x1 + " " + y1 + " Q" + cx + " " + cy + " " + x2 + " " + y2; mx = (mx + cx) / 2; my = (my + cy) / 2;
      lines(lb, p.t || "", p.fs || 14, mx, my - 12, tcol(p.c || "brand"), 700);
    } else { d = "M" + x1 + " " + y1 + " L" + x2 + " " + y2; lines(lb, p.t || "", p.fs || 14, (x1 + x2) / 2 + (p.lx || 0), (y1 + y2) / 2 - 13 + (p.ly || 0), tcol(p.c || "brand"), 700); }
    if (pa.getAttribute("d") !== d){ pa.setAttribute("d", d); pa.classList.remove("vdraw"); void pa.getBBox; pa.getBoundingClientRect(); pa.classList.add("vdraw"); }
    pa.setAttribute("stroke", col(p.c || "brand", 1)); pa.setAttribute("stroke-width", p.sw || 3);
    pa.setAttribute("stroke-dasharray", p.dash ? "0.02 0.015" : "1");
    pa.setAttribute("marker-end", p.noHead ? "" : "url(#vm-" + (p.c || "brand") + ")");
  } else if (type === "dot"){
    var ci = g.childNodes[0], dt = g.childNodes[1];
    g.style.transform = "translate(" + (p.x || 0) + "px," + (p.y || 0) + "px)";
    ci.setAttribute("r", p.r || 14); ci.setAttribute("fill", col(p.c || "warn", 1)); ci.setAttribute("stroke", "rgba(0,0,0,.25)"); ci.setAttribute("stroke-width", 2);
    lines(dt, p.t || "", p.fs || 13, 0, 0, "#0b0f19", 800);
  }
}

/* ---------- Giọng đọc ----------
   Ưu tiên giọng tiếng Việt tốt nhất có trên máy: giọng Natural/Online của Microsoft (Edge: HoaiMy, NamMinh)
   → giọng Microsoft An (Windows) → Google Tiếng Việt (Chrome) → giọng khác. Người xem có thể tự chọn, lựa chọn được nhớ lại. */
var viVoices = [], viVoice = null, VKEY = "nlhdh_voice";
function voiceScore(v){
  var n = v.name || "";
  return (/Natural|Online|Neural/i.test(n) ? 40 : 0) + (/Microsoft/i.test(n) ? 20 : 0) + (/Google/i.test(n) ? 10 : 0) + (/HoaiMy/i.test(n) ? 2 : 0);
}
function pickVoice(){
  if (!("speechSynthesis" in window)) return;
  var vs = speechSynthesis.getVoices() || [];
  viVoices = vs.filter(function(v){ return /^vi/i.test(v.lang); }).sort(function(a, b){ return voiceScore(b) - voiceScore(a); });
  var saved = null; try { saved = localStorage.getItem(VKEY); } catch (e){}
  viVoice = viVoices.filter(function(v){ return v.name === saved; })[0] || viVoices[0] || null;
  document.querySelectorAll(".vplayer").forEach(function(el){ if (el._p) el._p.refreshVoice(); });
}
function setVoice(name){
  var v = viVoices.filter(function(x){ return x.name === name; })[0]; if (!v) return;
  viVoice = v; try { localStorage.setItem(VKEY, name); } catch (e){}
  document.querySelectorAll(".vplayer").forEach(function(el){ if (el._p) el._p.refreshVoice(true); });
}
if ("speechSynthesis" in window){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function plain(h){ var d = document.createElement("div"); d.innerHTML = h; return d.textContent.replace(/\s+/g, " ").trim(); }

/* ---------- Chuẩn hóa lời đọc: viết tắt, ký hiệu, tiếng Anh → cách đọc tiếng Việt ----------
   Chỉ ảnh hưởng giọng đọc; phụ đề trên màn hình giữ nguyên.
   Mọi từ tiếng Anh trong lời thuyết minh được phiên âm thành âm tiết tiếng Việt hợp lệ
   (theo cách sinh viên CNTT Việt Nam vẫn đọc), để giọng tiếng Việt không đọc lơ lớ từng chữ cái. */
var LETTER = {A:"a",B:"bê",C:"xê",D:"đê",E:"e",F:"ép",G:"gờ",H:"hát",I:"i",J:"gi",K:"ca",L:"eo",M:"em",N:"en",O:"ô",P:"pê",Q:"qui",R:"e rờ",S:"ét",T:"tê",U:"u",V:"vê",W:"vê kép",X:"ích",Y:"i dài",Z:"dét"};
/* Viết tắt viết hoa (phân biệt hoa thường) */
var ABBR = [
  ["MS-DOS","em ét đốt"],["CD-ROM","xê đê rom"],["RS-232","e rờ ét hai ba hai"],["WSClock","vê kép ét cờ lốc"],
  ["HĐH","hệ điều hành"],["CPU","xê pê u"],["RAM","ram"],["ROM","rom"],["MMU","em em u"],["TLB","tê eo bê"],
  ["DMA","đê em a"],["FAT","phát"],["LRU","eo e rờ u"],["FIFO","phi phô"],["NFU","en ép u"],["NRU","en e rờ u"],["OPT","óp"],
  ["RAID","rết"],["MBR","em bê e rờ"],["BIOS","bai ốt"],["DOS","đốt"],["UNIX","iu níc"],["PC","pê xê"],["CD","xê đê"],
  ["SCSI","ét xê ét i"],["USB","u ét bê"],["PCI","pê xê i"],["IDE","i đê e"],["UART","u a rờ tê"],["IRQ","i e rờ qui"],
  ["ISO","i ét ô"],["READY","rét đi"],["IN","in"],["OUT","ao"],["COM","com"],["GDT","gờ đê tê"],["LDT","eo đê tê"],
  ["PTBR","pê tê bê e rờ"],["PRLR","pê e rờ eo e rờ"],["DPL","đê pê eo"],["DAG","đê a gờ"],["PIC","pê i xê"]
];
/* Từ và cụm từ tiếng Anh (không phân biệt hoa thường). Cụm dài được thay trước. */
var EN = {
  "hđh":"hệ điều hành","i-nodes":"ai nốt","i-node":"ai nốt",
  "least recently used":"lít ri xần li diu","second chance":"se cần chen","working set":"uốc kinh xét",
  "page fault":"pết phôn","room for growth":"rum pho gờ râu","return to user":"ri tơn tu diu dơ","copy from user":"cóp pi phờ rom diu dơ",
  "set up":"xét ắp","swap in":"xoáp in","swap out":"xoáp ao","in-line":"in lai","in a heap":"in a híp","busy-wait":"bi di quét",
  "absent":"áp xần","ack":"ắc","active":"ác típ","address":"a đờ rét","aging":"ây dinh","analog":"a na lốc","append":"ơ pen",
  "archive":"a cai","ast":"a ét tê","attributes":"ơ tri biu","backing":"béc kinh","base":"bết","belady":"bê la đi","best":"bét",
  "binary":"bai na ri","bit":"bít","bits":"bít","block":"bờ lốc","blocks":"bờ lốc","boot":"bút","buffer":"bắp phơ","bus":"bớt","busy":"bi di",
  "byte":"bai","bytes":"bai","cache":"cát","caching":"ca sinh","call":"côn","calls":"côn","card":"các",
  "character":"ca rắc tơ","checkerboarding":"chéc cơ bo đinh","checksum":"chéc sầm","chip":"chíp","clock":"cờ lốc","close":"cờ lâu",
  "closedir":"cờ lâu đia","code":"cốt","compaction":"com béc sần","constant":"con xờ tần","control":"con trôn","controller":"con trô lơ",
  "copy":"cóp pi","count":"cao nờ","counter":"cao tơ","create":"cờ ri ết","cylinder":"xi lanh","data":"đa ta","delete":"đi lít",
  "descriptor":"đi xờ cờ ríp tơ","device":"đi vai","dict":"đích","dir":"đia","directory":"đai réc tơ ri","disabled":"đi xây bồ",
  "disk":"đĩa","double":"đắp bồ","drive":"đờ rai","driven":"đờ ri vần","driver":"đờ rai vơ","drivers":"đờ rai vơ",
  "entry":"en tri","entries":"en tri","executable":"ích xê kiu ta bồ","expansion":"ích xờ pen sần","ext":"ích tê","external":"ích tơ nồ",
  "fault":"phôn","file":"phai","files":"phai","first":"phớt","fit":"phít","flag":"phờ lác","flush":"phờ lớt","frame":"phờ rêm","free":"phờ ri",
  "gigabit":"ghi ga bít","gigaplane":"ghi ga pờ lên","growth":"gờ râu","hamming":"ham minh","handler":"hen đờ lơ","handlers":"hen đờ lơ",
  "hardware":"hát que","head":"hét","header":"hét đơ","heap":"híp","hit":"hít","holding":"hâu đinh","hole":"hâu","holes":"hâu","hybrid":"hai bờ rít",
  "independent":"in đi pen đần","index":"in đéc","indirect":"in đai réc","interlaced":"in tơ lết","interrupt":"in tơ rắp","invalid":"in va lít",
  "jeep":"gíp","jim":"dim","job":"gióp","jobs":"gióp","kernel":"cơ nồ","land":"len","least":"lít","length":"leng","lib":"líp","limit":"li mít",
  "line":"lai","link":"linh","load":"lốt","logic":"lô gích","magic":"ma gích","mail":"meo","manager":"ma na giơ","map":"máp","mapped":"máp",
  "master":"mát tơ","mbox":"em bốc","memory":"me mô ri","mirroring":"mia rơ rinh","miss":"mít","mode":"mốt","modem":"mô đem",
  "modified":"mo đi phai","module":"mô đun","network":"nét guốc","next":"nếch","node":"nốt","nodes":"nốt","non":"non","number":"năm bơ",
  "numeric":"niu me ríc","object":"óp dếch","offset":"óp sét","open":"âu pần","opendir":"âu pần đia","optimal":"óp ti mồ","out":"ao",
  "overhead":"âu vơ hét","owner":"âu nơ","owners":"âu nơ","page":"pết","pages":"pết","pager":"pết giơ","parity":"pa ri ti","parse":"pát",
  "partition":"pa ti sần","pentium":"pen ti um","pit":"pít","point":"poi","port":"pót","present":"pờ re dần","printer":"pờ rin tơ",
  "processes":"pờ rô xét xít","program":"pờ rô gờ ram","programmed":"pờ rô gờ ram","protection":"pờ rô téc sần","put":"pút","get":"ghét",
  "read":"rít","readdir":"rít đia","recently":"ri xần li","record":"re cót","referenced":"re phờ ren","reg":"rét","register":"re gít tơ",
  "regular":"re gu la","relocation":"ri lô kê sần","rename":"ri nêm","reply":"ri pờ lai","return":"ri tơn","room":"rum","root":"rút",
  "scheduler":"sờ ke giu lơ","second":"se cần","sector":"séc tơ","seek":"xíc","segment":"xéc mần","segments":"xéc mần","selector":"xi léc tơ",
  "set":"xét","single":"xinh gồ","size":"sai","slide":"xờ lai","software":"xóp que","source":"xót","space":"xờ pết","special":"xờ pe sồ",
  "spooling":"xờ pun linh","stack":"xờ tắc","start":"xờ tát","status":"xờ ta tút","store":"xờ to","strip":"xờ tríp","striping":"xờ trai pinh",
  "subsystem":"xáp xít tầm","sun":"xăn","super":"xu pơ","swap":"xoáp","swapping":"xoáp pinh","symbol":"xim bồ","system":"xít tầm",
  "table":"tê bồ","temporary":"tem po ra ri","terminal":"tơ mi nồ","text":"tếch","timer":"tai mơ","timestamps":"tai xờ tem",
  "track":"trắc","tracks":"trắc","trap":"tráp","tree":"tri","triple":"tri pồ","txt":"tê ích tê","type":"tai","unblock":"ăn bờ lốc","unlink":"ăn linh",
  "up":"ắp","used":"diu","user":"diu dơ","users":"diu dơ","usr":"diu dơ","valid":"va lít","victim":"víc tim","video":"vi đê ô","wait":"quét",
  "while":"oai","windows":"uyn đâu","word":"uốt","working":"uốc kinh","worst":"uốt","write":"rai","xyz":"ích i dét","abc":"a bê xê",
  "cat":"két","ant":"en","chrome":"crôm","dog":"đóc","pig":"pích","cow":"cao","fox":"phốc","from":"phờ rom","for":"pho","fork":"phóc","exec":"ếch xéc",
  "memory manager":"me mô ri ma na giơ","bit map":"bít máp","bitmap":"bít máp","device driver":"đi vai đờ rai vơ"
};
var CIRC = "①②③④⑤⑥⑦⑧⑨";
function esc(s){ return s.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&"); }
var ABBR_RE = ABBR.map(function(p){ return [new RegExp("(?<![\\p{L}\\d])" + esc(p[0]) + "(?![\\p{L}])", "gu"), p[1]]; })
  .concat(Object.keys(EN).sort(function(a, b){ return b.length - a.length; }).map(function(k){
    return [new RegExp("(?<![\\p{L}\\d])" + esc(k).replace(/[ -]/g, "[\\s_-]+") + "(?![\\p{L}\\d])", "giu"), EN[k]];
  }));
function spellCaps(w){ return w.split("").map(function(c){ return LETTER[c] || c; }).join(" "); }
/* Mũi tên "→": trong một vế câu chỉ có 1 mũi tên thì là quan hệ nhân quả → đọc "nên";
   có từ 2 mũi tên trở lên (chuỗi A → B → C) thì đọc "rồi". */
function arrows(clause){
  var k = (clause.match(/→/g) || []).length;
  return k >= 2 ? clause.replace(/\s*→\s*/g, ", rồi ") : clause.replace(/[,\s]*→\s*/, " nên ");
}
function speakable(html){
  var h = String(html || "")
    .replace(/<sup>([^<]*)<\/sup>/g, " mũ $1 ")
    .replace(/<code>([^<]*)<\/code>/g, function(_, c){
      return " " + c.replace(/(\w)\([^)]*\)/g, "$1").replace(/!=/g, " khác ").replace(/=/g, " gán ").replace(/\[([^\]]*)\]/g, " $1 ").replace(/[_*();,]/g, " ") + " ";
    });
  var t = plain(h);
  t = t.replace(/logic → địa chỉ vật lý/g, "logic sang địa chỉ vật lý").replace(/trang → khung/g, "trang sang khung")
    .replace(/jeep → index block/g, "jeep, index block").replace(/0 → 4 GB/g, "0 đến 4 GB")
    .replace(/(user|kernel|controller nhận) → (kernel|network|tiến trình)/g, "$1 sang $2").replace(/Pig → /g, "Pig, rồi ")
    .replace(/ô thứ 3 → /g, "ô thứ 3 là ").replace(/→ (i-node \d)/g, "được $1").replace(/(i-node \d+) → /g, "$1 thì ")
    .replace(/(trong bảng cấp 1) → /g, "$1, rồi ")
    .replace(/(?<!\d)([01]{8,})(?!\d)/g, function(_, b){ return " " + b.split("").join(" ") + " "; })
    .replace(/(Vào\/Ra|vào\/ra)\s*\(I\/O port\)/g, "vào ra").replace(/\bI\/O\b|Vào\/Ra|vào\/ra/g, "vào ra")
    .replace(/(\d)\s*[–→]\s*(\d)/g, function(m, a, b){ return /→/.test(m) && /\s/.test(m) ? m : a + " đến " + b; })
    .replace(/0x([0-9A-Fa-f]+)/g, function(_, h){ return " hếch " + h.split("").join(" ") + " "; })
    .replace(/\.txt\b/g, " chấm tê ích tê")
    .replace(/Base\.Ext;Ver/g, "bết chấm ích tê chấm phẩy vơ")
    .replace(/(?<![\p{L}\d])(\d[0-9A-F]*[A-F][0-9A-F]*)(?![\p{L}\d])/gu, function(_, h){ return " " + h.split("").map(function(c){ return LETTER[c] || c; }).join(" ") + " "; })
    .replace(/(?<![\p{L}\d.])(\.\.)?(\/[A-Za-z]+)+\/?|“\/”/gu, function(m){ return " " + m.replace(/[“”]/g, "").replace(/\.\./g, " chấm chấm ").replace(/\//g, " gạch chéo ") + " "; })
    .replace(/(\d)\s*\/\s*giây/g, "$1 trên giây").replace(/\/giây/g, " trên giây")
    .replace(/(\d)\s+\/\s+(\d)/g, "$1 chia $2").replace(/\s\/\s/g, " hoặc ").replace(/(\d)\/(\d)/g, "$1 hoặc $2").replace(/\//g, " ")
    .replace(/([A-Za-z]+)\[([^\]]+)\]/g, "$1 của $2")
    .replace(/[−-](\d)/g, function(m, d, i, s){ return /[\dA-Za-z]$/.test(s.slice(0, i)) ? m : " trừ " + d; })
    .replace(/(\d)-(\d)/g, "$1 đến $2");
  ABBR_RE.forEach(function(p){ t = t.replace(p[0], " " + p[1] + " "); });
  t = t.replace(/(\d)\s*KB\b/g, "$1 ki lô bai").replace(/(\d)\s*MB\b/g, "$1 mê ga bai").replace(/(\d)\s*GB\b/g, "$1 gi ga bai").replace(/(\d)\s*TB\b/g, "$1 tê ra bai")
    .replace(/\bKB\b/g, "ki lô bai").replace(/\bMB\b/g, "mê ga bai").replace(/\bGB\b/g, "gi ga bai").replace(/\bTB\b/g, "tê ra bai")
    .replace(/(\d)\s*K\b/g, "$1 ki lô bai")
    .replace(/(?<![\p{L}\d])([A-Z]{1,8})(\d*)(?![\p{L}])/gu, function(_, w, d){ return " " + spellCaps(w) + (d ? " " + d : "") + " "; })
    .replace(/(?<![\p{L}\d])([pdfkcbvx])(?![\p{L}\d])/gu, function(_, c){ return LETTER[c.toUpperCase()]; })
    .replace(/[①-⑨]/g, function(c){ return " " + (CIRC.indexOf(c) + 1) + " "; })
    .replace(/×/g, " nhân ").replace(/≈/g, " xấp xỉ ").replace(/≥/g, " lớn hơn hoặc bằng ").replace(/≤/g, " nhỏ hơn hoặc bằng ")
    .replace(/!=/g, " khác ").replace(/</g, " nhỏ hơn ").replace(/>/g, " lớn hơn ").replace(/=/g, " bằng ").replace(/\+/g, " cộng ")
    .replace(/%/g, " phần trăm ").replace(/#/g, " số ").replace(/[^.;:!?]*→[^.;:!?]*/g, arrows).replace(/[–—…·]/g, ", ")
    .replace(/[“”"‘’*_()\[\]]/g, " ").replace(/-/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1").replace(/([,.;:])(\s*[,.;:])+/g, "$1").replace(/\s+/g, " ").replace(/^[,\s]+/, "").trim();
  return t;
}

/* ---------- Trình phát ----------
   Dòng thời gian liền mạch: mỗi cảnh chiếm một khoảng [T0, T0 + D) trên trục thời gian.
   Có thể tua tới bất kỳ thời điểm nào; giọng đọc nói tiếp từ đúng chữ tương ứng với chỗ tua tới. */
var players = [], current = null;
function fmt(ms){ var s = Math.floor(Math.max(0, ms) / 1000); return Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); }
var MS_PER_CHAR = 66;   /* ước lượng tốc độ giọng đọc ở 1× (ms cho mỗi ký tự lời đọc) */
function sceneDur(sc){ var L = speakable(sc.s || "").length; return Math.max(sc.t || 0, 2600, L * MS_PER_CHAR + 700); }

function Player(el, def){
  var self = this, scenes = def.scenes, n = scenes.length;
  var texts = scenes.map(function(s){ return speakable(s.s || ""); });
  var D = scenes.map(sceneDur), T0 = [], total = 0;
  D.forEach(function(d, j){ T0[j] = total; total += d; });
  var i = 0, shown = -1, pos = 0, playing = false, started = false, speed = 1, voiceOn = true, dragging = false;
  var ticker = null, last = 0, uttId = 0, spoken = false, hasBnd = false, bTarget = 0, rush = 0, stall = 0, utt = null;
  var ticks = T0.slice(1).map(function(t){ return '<i class="v-tick" style="left:' + (t / total * 100).toFixed(3) + '%"></i>'; }).join("");
  el.innerHTML =
    '<div class="v-stage"><svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid meet"><defs>' +
      Object.keys(C).map(function(k){ return '<marker id="vm-' + k + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="' + C[k][1] + '"/></marker>'; }).join("") +
    '</defs><g class="v-layer"></g></svg>' +
    '<div class="v-cover"><div class="v-badge">🎬 VIDEO HOẠT HÌNH</div><div class="v-ctitle">' + def.title + '</div><button class="v-big" aria-label="Phát">▶</button><div class="v-cmeta">' + n + ' cảnh · khoảng ' + fmt(total) + '</div></div>' +
    '<div class="v-end" hidden><button class="v-big v-replay" aria-label="Xem lại">↻</button><div class="v-cmeta">Xem lại từ đầu</div></div></div>' +
    '<div class="v-sub"></div>' +
    '<div class="v-ctl"><button class="v-btn v-play" title="Phát / Tạm dừng (Space)">▶</button><button class="v-btn v-prev" title="Về đầu cảnh / cảnh trước">⏮</button><button class="v-btn v-next" title="Cảnh sau">⏭</button>' +
    '<div class="v-tl" role="slider" aria-label="Thanh thời gian (← → tua 5 giây)" aria-valuemin="0" aria-valuemax="' + Math.round(total / 1000) + '" aria-valuenow="0"><div class="v-track"><div class="v-fill"></div>' + ticks + '<div class="v-knob"></div></div><div class="v-tip" hidden></div></div>' +
    '<span class="v-time">0:00 / ' + fmt(total) + '</span><button class="v-btn v-speed" title="Tốc độ">1×</button><select class="v-vsel" title="Chọn giọng đọc" aria-label="Chọn giọng đọc" hidden></select><button class="v-btn v-voice" title="Thuyết minh bằng giọng đọc">🔊</button><button class="v-btn v-full" title="Toàn màn hình">⛶</button></div>';
  var layer = el.querySelector(".v-layer"), sub = el.querySelector(".v-sub"), cover = el.querySelector(".v-cover"), end = el.querySelector(".v-end");
  var bPlay = el.querySelector(".v-play"), bVoice = el.querySelector(".v-voice"), tl = el.querySelector(".v-tl"), track = el.querySelector(".v-track");
  var fill = el.querySelector(".v-fill"), knob = el.querySelector(".v-knob"), tip = el.querySelector(".v-tip"), tm = el.querySelector(".v-time");
  var live = {};

  function render(k){
    shown = k;
    var S = stateAt(scenes, k);
    Object.keys(live).forEach(function(id){
      if (!S.st[id] || S.st[id].type !== live[id].type){ var g = live[id].g; delete live[id]; g.style.opacity = 0; g.setAttribute("data-dead", "1"); setTimeout(function(){ if (g.parentNode) g.parentNode.removeChild(g); }, 450); }
    });
    S.order.forEach(function(id){
      var it = S.st[id], L = live[id];
      if (!L){
        var g = build(it.type); g.dataset.id = id; g.style.opacity = 0;
        if (it.p.back) layer.insertBefore(g, layer.firstChild); else layer.appendChild(g);
        live[id] = L = {g: g, type: it.type};
        var p0 = Object.assign({}, it.p); p0.o = 0; update(g, it.type, p0);
        g.getBoundingClientRect();
        (function(g, it){ requestAnimationFrame(function(){ update(g, it.type, it.p); }); })(g, it);
      } else update(L.g, it.type, it.p);
    });
    S.flashes.forEach(function(id){ var L = live[id]; if (!L) return; L.g.classList.remove("vflash"); L.g.getBoundingClientRect(); L.g.classList.add("vflash"); });
    sub.innerHTML = '<span class="v-scn">' + (k + 1) + '/' + n + '</span>' + (scenes[k].s || "");
  }
  function sceneAt(p){ var k = 0; while (k < n - 1 && T0[k + 1] <= p) k++; return k; }
  function paint(){
    var f = total ? Math.min(1, pos / total) * 100 : 0;
    fill.style.width = f + "%"; knob.style.left = f + "%";
    tm.textContent = fmt(pos) + " / " + fmt(total); tl.setAttribute("aria-valuenow", Math.round(pos / 1000));
  }
  function voiceReady(){ return voiceOn && viVoice && ("speechSynthesis" in window); }
  function stopSpeech(){ uttId++; if (current === self && "speechSynthesis" in window) speechSynthesis.cancel(); }
  /* Bắt đầu (lại) cảnh i tại vị trí pos: đọc từ chữ tương ứng */
  function startScene(){
    stopSpeech(); spoken = false; hasBnd = false; rush = 0; stall = 0; bTarget = pos;
    if (!playing || !voiceReady()) return;
    var txt = texts[i], f = (pos - T0[i]) / D[i], c0 = 0;
    if (f > 0.03){ c0 = Math.floor(f * txt.length); var sp = txt.lastIndexOf(" ", c0); c0 = sp < 0 ? 0 : sp + 1; }
    var part = txt.slice(c0);
    if (!part.trim()){ spoken = true; return; }
    var my = uttId, u = new SpeechSynthesisUtterance(part);
    u.voice = viVoice; u.lang = viVoice.lang; u.rate = Math.min(2, 1.05 * speed);
    u.onboundary = function(e){ if (my !== uttId) return; hasBnd = true; stall = 0; var t = T0[i] + D[i] * Math.min(1, (c0 + e.charIndex) / txt.length); if (t > bTarget) bTarget = t; };
    u.onend = u.onerror = function(){ if (my === uttId) spoken = true; };
    speechSynthesis.cancel(); speechSynthesis.speak(u); utt = u;
  }
  function advance(){
    if (i < n - 1){ i++; pos = T0[i]; render(i); startScene(); }
    else { pos = total; paint(); finish(); }
  }
  function tick(){
    var now = performance.now(), dt = Math.min(250, now - last); last = now;
    if (!playing || dragging) return;
    var endT = T0[i] + D[i];
    if (voiceReady() && !spoken){
      /* đang đọc: đồng hồ chạy theo giọng, không vượt quá cuối cảnh khi giọng chưa đọc xong */
      var lim = endT - 1; if (hasBnd) lim = Math.min(lim, bTarget + 1200);
      var np = Math.min(pos + dt * speed, lim);
      if (hasBnd && bTarget > np) np = Math.min(bTarget, endT - 1);
      if (np <= pos + 0.01){ stall += dt; if (stall > 6000 + D[i] * 0.5) spoken = true; } else if (!hasBnd) stall = 0;
      pos = Math.max(pos, np);
    } else if (voiceReady()){
      /* đọc xong: chạy nốt phần còn lại của cảnh trong khoảng 0,4 giây */
      if (!rush) rush = Math.max(speed, (endT - pos) / 400);
      pos += dt * rush; if (pos >= endT) advance();
    } else {
      pos += dt * speed; if (pos >= endT) advance();
    }
    paint();
  }
  function seekTo(p){
    pos = Math.max(0, Math.min(total - 1, p)); started = true; cover.hidden = true; end.hidden = true;
    var k = sceneAt(pos); i = k; if (shown !== k) render(k);
    paint();
  }
  function finish(){ playing = false; clearInterval(ticker); bPlay.textContent = "▶"; end.hidden = false; }
  function play(){
    if (current && current !== self) current.pause();
    current = self; cover.hidden = true; end.hidden = true;
    if (!started || pos >= total - 1){ started = true; pos = 0; i = 0; }
    if (shown !== i) render(i);
    playing = true; bPlay.textContent = "❚❚";
    last = performance.now(); clearInterval(ticker); ticker = setInterval(tick, 50);
    startScene(); paint();
  }
  this.pause = function(){ playing = false; clearInterval(ticker); stopSpeech(); bPlay.textContent = "▶"; };
  this.destroy = function(){ this.pause(); };
  this.show = function(k){ jump(k); };
  this.count = n;
  this.total = total;
  this.seek = function(ms){ seekTo(ms); if (playing) startScene(); };
  this.state = function(){ return {pos: pos, scene: i, playing: playing, total: total}; };
  var vsel = el.querySelector(".v-vsel");
  vsel.onchange = function(){ setVoice(vsel.value); };
  function shortName(v){ return (v.name || "").replace(/^Microsoft\s+/i, "").replace(/\s*-\s*Vietnamese.*$/i, "").replace(/\s*\(Vietnam\)/i, "").replace(/Online \(Natural\)/i, "(tự nhiên)"); }
  this.refreshVoice = function(restart){
    vsel.hidden = viVoices.length < 2;
    vsel.innerHTML = viVoices.map(function(v){ return '<option value="' + v.name.replace(/"/g, "&quot;") + '"' + (v === viVoice ? " selected" : "") + ">" + shortName(v).replace(/</g, "&lt;") + "</option>"; }).join("");
    if (restart && playing) startScene();
    bVoice.disabled = !viVoice; bVoice.title = viVoice ? "Thuyết minh: " + viVoice.name : "Máy/trình duyệt này chưa có giọng đọc tiếng Việt – video vẫn chạy kèm phụ đề"; bVoice.textContent = (viVoice && voiceOn) ? "🔊" : "🔇"; };
  function jump(k){ k = Math.max(0, Math.min(n - 1, k)); seekTo(T0[k]); if (playing) startScene(); }

  /* Thanh thời gian: nhấp hoặc kéo để tua tới bất kỳ đâu */
  function posFromX(x){ var r = track.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / (r.width || 1))) * total; }
  function showTip(x){
    var r = track.getBoundingClientRect(), p = posFromX(x);
    tip.hidden = false; tip.textContent = "Cảnh " + (sceneAt(p) + 1) + " · " + fmt(p);
    tip.style.left = Math.max(34, Math.min(r.width - 34, x - r.left)) + "px";
  }
  tl.onpointerdown = function(e){
    if (e.button) return; e.preventDefault();
    dragging = true; el.classList.add("v-drag");
    try { tl.setPointerCapture(e.pointerId); } catch (err){}
    stopSpeech(); seekTo(posFromX(e.clientX)); showTip(e.clientX);
  };
  tl.onpointermove = function(e){ if (e.pointerType === "mouse" || dragging) showTip(e.clientX); if (dragging) seekTo(posFromX(e.clientX)); };
  tl.onpointerup = tl.onpointercancel = function(){
    if (!dragging) return; dragging = false; el.classList.remove("v-drag");
    if (playing){ last = performance.now(); startScene(); }
    if (!tl.matches(":hover")) tip.hidden = true;
  };
  tl.onpointerleave = function(){ if (!dragging) tip.hidden = true; };

  el.onclick = function(e){
    var b = e.target.closest("button"); if (!b) return;
    if (b.classList.contains("v-big") || b.classList.contains("v-play")){
      if (b.classList.contains("v-replay")){ started = false; }
      if (playing) self.pause(); else play();
    }
    else if (b.classList.contains("v-prev")) jump(pos - T0[i] > 1500 ? i : i - 1);
    else if (b.classList.contains("v-next")) jump(i + 1);
    else if (b.classList.contains("v-speed")){ var sp = [0.75, 1, 1.25, 1.5]; speed = sp[(sp.indexOf(speed) + 1) % sp.length]; b.textContent = speed + "×"; if (playing) startScene(); }
    else if (b.classList.contains("v-voice")){ voiceOn = !voiceOn; self.refreshVoice(); if (playing) startScene(); }
    else if (b.classList.contains("v-full")){ var fs = document.fullscreenElement; if (fs) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen(); }
  };
  el.onkeydown = function(e){
    if (e.target.closest && e.target.closest("button") && (e.key === " " || e.key === "Enter")) return;
    if (e.key === " " || e.key === "k"){ e.preventDefault(); if (playing) self.pause(); else play(); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowRight"){ e.preventDefault(); self.seek(pos + (e.key === "ArrowLeft" ? -5000 : 5000)); }
    else if (e.key === "Home"){ e.preventDefault(); self.seek(0); }
    else if (e.key === "End"){ e.preventDefault(); jump(n - 1); }
  };
  el.tabIndex = 0;
  this.refreshVoice();
}

var cache = {};
window.VideoPlayer = {
  destroyAll: function(){ players.forEach(function(p){ p.destroy(); }); players = []; current = null; },
  mountAll: function(root){
    Array.prototype.forEach.call(root.querySelectorAll(".vplayer[data-video]"), function(el){
      var id = el.dataset.video, f = window.VIDEOS && window.VIDEOS[id]; if (!f) { el.remove(); return; }
      if (!cache[id]) cache[id] = typeof f === "function" ? f() : f;
      var p = new Player(el, cache[id]); el._p = p; players.push(p);
    });
  },
  mountOne: function(el){
    if (el._p){ el._p.destroy(); players = players.filter(function(p){ return p !== el._p; }); }
    var id = el.dataset.video, f = window.VIDEOS && window.VIDEOS[id]; if (!f) return;
    if (!cache[id]) cache[id] = typeof f === "function" ? f() : f;
    var p = new Player(el, cache[id]); el._p = p; players.push(p);
  },
  has: function(id){ return !!(window.VIDEOS && window.VIDEOS[id]); },
  speakable: speakable
};

/* Bộ hàm viết tắt để soạn video */
window.VH = {
  b: function(id, x, y, w, h, t, c, o){ return ["+", id, "box", Object.assign({x:x, y:y, w:w, h:h, t:t, c:c}, o || {})]; },
  t: function(id, x, y, s, o){ return ["+", id, "txt", Object.assign({x:x, y:y, t:s}, o || {})]; },
  a: function(id, x1, y1, x2, y2, o){ return ["+", id, "arr", Object.assign({x1:x1, y1:y1, x2:x2, y2:y2}, o || {})]; },
  d: function(id, x, y, o){ return ["+", id, "dot", Object.assign({x:x, y:y}, o || {})]; },
  u: function(id, o){ return ["~", id, o]; },
  x: function(){ return Array.prototype.map.call(arguments, function(i){ return ["-", i]; }); },
  f: function(){ return Array.prototype.map.call(arguments, function(i){ return ["!", i]; }); },
  clr: function(){ return ["clear"]; },
  H: function(s, c){ return ["+", "_h", "txt", {x:480, y:32, t:s, fs:24, c:c || "brand"}]; }
};
window.VIDEOS = window.VIDEOS || {};
window.EASY = window.EASY || {};
})();
