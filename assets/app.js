/* Ôn thi Nguyên lý HĐH – logic ứng dụng */
(function(){
"use strict";
var QS = window.QUESTIONS || [];
var BYID = {}; QS.forEach(function(q){ BYID[q.id] = q; });
var CHAPS = [
  {ch:4, key:"c4", name:"Chương 4 – Quản lý Bộ nhớ", short:"Quản lý Bộ nhớ", cls:""},
  {ch:5, key:"c5", name:"Chương 5 – Vào/Ra", short:"Vào/Ra (Input/Output)", cls:"c5"},
  {ch:6, key:"c6", name:"Chương 6 – Hệ thống File", short:"Hệ thống File", cls:"c6"}
];
var QSETS = window.QSETS || [];
function setOf(key){ return QSETS.filter(function(x){ return x.key===key; })[0]; }
function chName(ch){ return ch ? "Chương "+ch : "Ngoài chương 4–6"; }
var TYPE_LABEL = {single:"Một đáp án", multi:"Nhiều đáp án", order:"Sắp xếp"};
var LETTERS = "ABCDEFGHIJ";
var LS = "nlhdh_state_v1";

/* ---------- tiện ích ---------- */
function $(s, r){ return (r||document).querySelector(s); }
function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
function shuffle(a){ a = a.slice(); for (var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function range(n){ var a=[]; for (var i=0;i<n;i++) a.push(i); return a; }
function sameSet(a, b){ if (a.length!==b.length) return false; var x=a.slice().sort(), y=b.slice().sort(); return x.every(function(v,i){ return v===y[i]; }); }
function fold(s){ return String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase(); }
var toastT;
function toast(msg){ var t=$("#toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(toastT); toastT=setTimeout(function(){ t.classList.remove("show"); }, 2200); }
function fmtTime(sec){ sec=Math.max(0,Math.round(sec)); var m=Math.floor(sec/60), s=sec%60; return (m<10?"0":"")+m+":"+(s<10?"0":"")+s; }
var ICON = {
  check:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  x:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  left:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  right:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  flag:'<svg class="icon" style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 22V4m0 0h13l-2 4 2 4H4"/></svg>',
  shuffle:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
  clock:'<svg class="icon" style="width:15px;height:15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  book:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/></svg>',
  trophy:'<svg style="width:36px;height:36px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>',
  play:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>',
  reset:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>'
};

/* ---------- trạng thái ---------- */
var state = { sessions:{}, active:null, view:"home", sumCh:4, stats:{} };
var XS = window.XS || {};
function load(){ try { var s = JSON.parse(localStorage.getItem(LS)); if (s && s.sessions) state = Object.assign(state, s); } catch(e){}
  // bỏ các câu không còn tồn tại
  Object.keys(state.sessions).forEach(function(k){ var s=state.sessions[k]; s.ids = s.ids.filter(function(id){ return BYID[id]; }); if (!s.ids.length) delete state.sessions[k]; });
  // bổ sung câu hỏi mới vào các bộ theo chương đã lưu từ trước
  ["c4","c5","c6","all"].concat(QSETS.map(function(x){ return x.key; })).forEach(function(k){
    var s = state.sessions[k]; if (!s) return;
    var have = {}; s.ids.forEach(function(id){ have[id]=1; });
    (setOf(k) ? setOf(k).ids : idsOfChapter(k==="all" ? "all" : +k.slice(1))).forEach(function(id){
      if (!have[id]){ s.ids.push(id); s.opt[id] = shuffle(range(BYID[id].opts.length)); if (s.submitted) s.submitted = false; }
    });
  });
  if (state.active && !state.sessions[state.active]) state.active = null;
}
function save(){ try { localStorage.setItem(LS, JSON.stringify(state)); } catch(e){} }
function cur(){ return state.active ? state.sessions[state.active] : null; }

function makeOptOrder(ids){ var o={}; ids.forEach(function(id){ o[id] = shuffle(range(BYID[id].opts.length)); }); return o; }
function newSession(key, name, ids, mode, extra){
  var s = Object.assign({ key:key, name:name, mode:mode, ids:ids.slice(), opt:makeOptOrder(ids), ans:{}, flags:{},
    cur:0, submitted:false, instant: mode==="practice", filter:"all", created:Date.now(), duration:0, start:Date.now() }, extra||{});
  state.sessions[key] = s; state.active = key; save(); return s;
}
function idsOfChapter(ch){ return QS.filter(function(q){ return !q.set && (ch==="all" || q.ch===ch); }).map(function(q){ return q.id; }); }

function isCorrect(q, sel){ return !!sel && sel.length>0 && sameSet(sel, q.ans); }
function recordGrade(id, ok){ state.stats = state.stats || {}; var r = state.stats[id] || (state.stats[id] = {w:0, r:0}); if (ok) r.r++; else r.w++; r.t = Date.now(); }
function weakIds(){ var st = state.stats || {}; return Object.keys(st).filter(function(id){ var r = st[id]; return BYID[id] && r.w > 0 && r.w * 2 - r.r > 0; }).sort(function(a, b){ var A = st[a], B = st[b]; return (B.w * 2 - B.r) - (A.w * 2 - A.r) || B.t - A.t; }); }
function graded(s, id){ var a=s.ans[id]; return s.submitted || (a && a.done); }
function status(s, id){
  var a = s.ans[id], q = BYID[id];
  if (graded(s,id)){ if (!a || !a.sel || !a.sel.length) return s.submitted ? "skip" : "none"; return isCorrect(q, a.sel) ? "g" : "r"; }
  return (a && a.sel && a.sel.length) ? "ans" : "none";
}
function counts(s){
  var c = {g:0, r:0, ans:0, none:0, skip:0, total:s.ids.length};
  s.ids.forEach(function(id){ c[status(s,id)]++; });
  c.answered = c.g + c.r + c.ans;
  return c;
}

/* ---------- điều hướng ---------- */
var timerH = null;
function go(view){
  state.view = view; save();
  ["home","quiz","result","summary"].forEach(function(v){ $("#view-"+v).hidden = v!==view; });
  document.querySelectorAll("#tabs .tab").forEach(function(t){ t.classList.toggle("active", t.dataset.view===view || (view==="result" && t.dataset.view==="quiz")); });
  clearInterval(timerH); timerH = null;
  if (window.VideoPlayer && view!=="summary") VideoPlayer.destroyAll();
  if (view==="home") renderHome();
  else if (view==="quiz") renderQuiz();
  else if (view==="result") renderResult();
  else if (view==="summary") renderSummary();
  window.scrollTo({top:0});
}

/* ================= TRANG CHỦ ================= */
function setCard(o){
  var s = state.sessions[o.key];
  var total = o.ids.length, c = s ? counts(s) : {g:0,r:0,answered:0};
  var gw = total? c.g/total*100:0, rw = total? c.r/total*100:0;
  var types = {single:0,multi:0,order:0}; o.ids.forEach(function(id){ types[BYID[id].type]++; });
  var started = s && c.answered>0 && !s.submitted;
  return '<div class="set">'+
    '<div class="set-head"><div class="set-num '+o.cls+'">'+o.badge+'</div><div><h3>'+esc(o.title)+'</h3><small>'+total+' câu · '+types.single+' một đáp án · '+types.multi+' nhiều đáp án · '+types.order+' sắp xếp</small>'+(o.sub?'<small class="set-sub">'+o.sub+'</small>':'')+'</div></div>'+
    '<div class="meter"><i class="g" style="width:'+gw+'%"></i><i class="r" style="width:'+rw+'%"></i></div>'+
    '<div class="set-meta"><span>Đã làm <b>'+c.answered+'/'+total+'</b></span><span>Đúng <b class="g">'+c.g+'</b></span><span>Sai <b class="r">'+c.r+'</b></span>'+(s&&s.submitted?'<span>· Đã nộp</span>':'')+'</div>'+
    '<div class="set-actions">'+
      '<button class="btn primary" data-start="'+o.key+'">'+ICON.play+(started?'Làm tiếp (Câu '+(s.cur+1)+')':(s&&s.submitted?'Xem lại bài':'Vào làm bài'))+'</button>'+
      (s?'<button class="btn danger" data-reset="'+o.key+'" title="Làm lại từ đầu">'+ICON.reset+'</button>':'')+
      (typeof o.ch==="number"?'<button class="btn" data-sum="'+o.ch+'" title="Xem tổng hợp kiến thức">'+ICON.book+'</button>':'')+
    '</div></div>';
}
function renderHome(){
  var allG=0, allGraded=0;
  ["c4","c5","c6","all"].forEach(function(k){ var s=state.sessions[k]; if (!s) return; var c=counts(s); allG+=c.g; allGraded+=c.g+c.r; });
  var ex = state.sessions.exam, exBtn = "";
  if (ex && !ex.submitted) exBtn = '<button class="btn" data-start="exam">'+ICON.play+'Tiếp tục đề đang làm</button>';
  var sets = CHAPS.map(function(c){ return {key:c.key, ch:c.ch, ids:idsOfChapter(c.ch), title:c.name, badge:c.ch, cls:c.cls}; });
  sets.push({key:"all", ch:"all", ids:idsOfChapter("all"), title:"Tất cả 3 chương", badge:"∑", cls:"all"});
  $("#view-home").innerHTML =
  '<div class="hero"><div class="hero-main"><h2>Ôn thi Nguyên lý Hệ điều hành</h2><p>Ngân hàng câu hỏi trắc nghiệm soạn từ slide bài giảng Chương 4, 5, 6 – có giải thích từng câu, chấm điểm ngay, thi thử có giờ và phần tổng hợp kiến thức dễ hiểu.</p>'+
  '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" id="goExam">'+ICON.shuffle+'Tạo đề thi thử</button><button class="btn" data-view-go="summary">'+ICON.book+'Đọc tổng hợp kiến thức</button>'+exBtn+'</div></div>'+
  '<div class="stats"><div class="stat"><b>'+idsOfChapter("all").length+'</b><span>câu hỏi</span></div><div class="stat"><b>3</b><span>chương</span></div><div class="stat"><b>'+(allGraded?Math.round(allG/allGraded*100)+'%':'—')+'</b><span>tỉ lệ đúng</span></div></div></div>'+
  '<div class="section-h">Bộ câu hỏi theo chương</div><div class="sets">'+sets.map(setCard).join("")+'</div>'+
  (QSETS.length ? '<div class="section-h">📝 Đề ôn tập</div><div class="sets">'+QSETS.map(function(x){
    var by = {}; x.ids.forEach(function(id){ var c = BYID[id].ch; by[c] = (by[c]||0) + 1; });
    var sub = [4,5,6,0].filter(function(c){ return by[c]; }).map(function(c){ return '<span class="chip">'+(c ? 'Ch'+c : 'Ngoài 4–6')+': <b>'+by[c]+'</b></span>'; }).join(" ");
    return setCard({key:x.key, ch:"set", ids:x.ids, title:x.name, badge:x.badge, cls:"ot", sub:sub+(x.note?'<br><span class="muted">'+esc(x.note)+'</span>':'')});
  }).join("")+'</div>' : '')+weakPanel()+
  '<div class="section-h" id="examSetup">Tạo đề thi thử ngẫu nhiên</div>'+
  '<div class="panel"><div class="exam-grid">'+
   '<div><span class="lbl">Chương</span><div class="chk-row">'+CHAPS.map(function(c){ return '<label class="chk"><input type="checkbox" name="exch" value="'+c.ch+'" checked> Chương '+c.ch+'</label>'; }).join("")+'</div></div>'+
   '<div><span class="lbl">Số câu</span><select class="sel" id="exN"><option>20</option><option selected>30</option><option>40</option><option>50</option><option value="0">Tất cả</option></select></div>'+
   '<div><span class="lbl">Thời gian</span><select class="sel" id="exT"><option value="0">Không giới hạn</option><option value="15">15 phút</option><option value="30">30 phút</option><option value="45" selected>45 phút</option><option value="60">60 phút</option><option value="90">90 phút</option></select></div>'+
   '<div><label class="chk" style="margin-bottom:8px"><input type="checkbox" id="exXS"> Chỉ câu có trong slide</label><button class="btn primary block" id="mkExam">'+ICON.shuffle+'Tạo đề & bắt đầu</button></div>'+
  '</div><div class="legend"><span>• Câu hỏi và đáp án được xáo trộn ngẫu nhiên</span><span>• Không hiện đúng/sai cho đến khi nộp bài</span><span>• Hết giờ sẽ tự động nộp</span></div></div>';
}
function weakPanel(){
  var w = weakIds(), st = state.stats || {}, topics = {};
  w.forEach(function(id){ var q = BYID[id], k = (q.ch?"Ch"+q.ch:"Ngoài 4–6")+" · "+q.topic; topics[k] = (topics[k]||0) + st[id].w; });
  var top = Object.keys(topics).sort(function(a,b){ return topics[b]-topics[a]; }).slice(0,6);
  var done = Object.keys(st).length;
  return '<div class="section-h">🎯 Ôn câu hay sai</div><div class="panel weak">'+
    (w.length ? '<div class="weak-top"><div><b class="weak-n">'+w.length+'</b> câu bạn hay sai <span class="muted">(đã làm '+done+' câu khác nhau)</span></div><div class="weak-act"><button class="btn primary" data-start="weak">▶ Ôn ngay các câu này</button><button class="btn danger" data-clearstats="1" title="Xóa thống kê đúng/sai">Xóa thống kê</button></div></div>'+
      '<div class="weak-tp"><span class="muted">Chủ đề yếu nhất:</span> '+top.map(function(k){ return '<span class="chip">'+esc(k)+' · '+topics[k]+' lần sai</span>'; }).join(" ")+'</div>'
    : '<div class="muted">Chưa có dữ liệu. Mỗi lần bạn trả lời sai, câu đó sẽ được ghi lại; câu sai nhiều hơn đúng sẽ xuất hiện ở đây để ôn lại (trả lời đúng nhiều lần thì câu tự rời danh sách).</div>')+'</div>';
}
function startSet(key){
  if (key==="weak"){ var w = weakIds(); if (!w.length){ toast("Chưa có câu nào hay sai – cứ làm bài trước đã!"); return; } newSession("weak", "Ôn câu hay sai ("+w.length+" câu)", w, "practice"); go("quiz"); return; }
  if (key==="exam"){ if (state.sessions.exam){ state.active="exam"; save(); go(state.sessions.exam.submitted?"result":"quiz"); } return; }
  if (!state.sessions[key] && setOf(key)){ newSession(key, setOf(key).name, setOf(key).ids, "practice"); }
  if (!state.sessions[key]){
    var o = key==="all" ? {ch:"all", name:"Tất cả 3 chương"} : CHAPS.filter(function(c){ return c.key===key; })[0];
    if (key==="wrong") return;
    newSession(key, o.name, idsOfChapter(o.ch), "practice");
  }
  state.active = key; save(); go("quiz");
}
function resetSet(key, silent){
  var s = state.sessions[key]; if (!s) return;
  if (!silent && !confirm("Làm lại từ đầu bộ \""+s.name+"\"? Toàn bộ đáp án đã chọn sẽ bị xóa.")) return;
  var keepInstant = s.instant;
  var ids = s.mode==="exam" ? shuffle(s.ids) : setOf(key) ? setOf(key).ids : ((key==="wrong"||key==="weak") ? s.ids : idsOfChapter(key==="all"?"all":+key.slice(1)));
  var n = newSession(key, s.name, ids, s.mode, {duration:s.duration, chapters:s.chapters});
  n.instant = keepInstant; save();
}
function makeExam(){
  var chs = Array.prototype.map.call(document.querySelectorAll('input[name="exch"]:checked'), function(i){ return +i.value; });
  if (!chs.length){ toast("Hãy chọn ít nhất 1 chương"); return; }
  var onlySlide = $("#exXS") && $("#exXS").checked;
  var pool = QS.filter(function(q){ return !q.set && chs.indexOf(q.ch)>=0 && !(onlySlide && XS[q.id]); }).map(function(q){ return q.id; });
  var n = +$("#exN").value || pool.length; n = Math.min(n, pool.length);
  var mins = +$("#exT").value;
  if (state.sessions.exam && !state.sessions.exam.submitted && !confirm("Bạn đang có một đề thi thử chưa nộp. Tạo đề mới sẽ xóa đề cũ?")) return;
  var ids = shuffle(pool).slice(0, n);
  newSession("exam", "Đề thi thử ("+n+" câu · Chương "+chs.join(", ")+")", ids, "exam", {duration: mins*60, start: Date.now(), chapters:chs});
  go("quiz");
}

/* ================= LÀM BÀI ================= */
function visibleIdx(s){
  var out = [];
  s.ids.forEach(function(id, i){
    var st = status(s, id);
    if (s.filter==="all" || (s.filter==="wrong" && (st==="r"||st==="skip")) || (s.filter==="todo" && (st==="none")) || (s.filter==="flag" && s.flags[id])) out.push(i);
  });
  return out;
}
function remaining(s){ if (!s.duration) return null; return s.duration - (Date.now() - s.start)/1000; }

function renderQuiz(){
  var s = cur(), root = $("#view-quiz");
  if (!s){
    root.innerHTML = '<div class="panel empty"><h3 style="margin:0 0 6px;color:var(--text)">Chưa chọn bộ câu hỏi</h3><p>Hãy chọn một chương hoặc tạo đề thi thử ở Trang chủ.</p><button class="btn primary" data-view-go="home">Về Trang chủ</button></div>';
    return;
  }
  if (s.cur >= s.ids.length) s.cur = 0;
  var c = counts(s), exam = s.mode==="exam", hideScore = exam && !s.submitted;
  var vis = visibleIdx(s);
  var id = s.ids[s.cur], q = BYID[id];
  var pos = vis.indexOf(s.cur);
  var rem = remaining(s);

  var bar = '<div class="qbar"><span class="title">'+esc(s.name)+'</span>'+
    '<span class="pill">Câu '+(s.cur+1)+' / '+s.ids.length+'</span>'+
    '<span class="pill g">'+ICON.check+(hideScore?'—':c.g)+'</span><span class="pill r">'+ICON.x+(hideScore?'—':c.r)+'</span>'+
    (rem!==null && !s.submitted ? '<span class="pill t" id="timer">'+ICON.clock+fmtTime(rem)+'</span>' : '')+
    '<span class="spacer"></span>'+
    (!s.submitted ? '<button class="btn sm" id="shufQ" title="Xáo trộn thứ tự câu hỏi">'+ICON.shuffle+'Đảo câu</button><button class="btn sm" id="shufO" title="Xáo trộn thứ tự đáp án">'+ICON.shuffle+'Đảo A-B-C-D</button>' : '')+
    (!exam && !s.submitted ? '<button class="btn sm '+(s.instant?'on':'')+'" id="instBtn" title="Hiện đúng/sai ngay sau khi chọn">Chấm ngay: '+(s.instant?'BẬT':'TẮT')+'</button>' : '')+
    (s.submitted ? '<button class="btn sm primary" id="toResult">Xem kết quả</button><button class="btn sm" data-reset-cur="1">'+ICON.reset+'Làm lại</button>' : '<button class="btn sm primary" id="submitBtn">Nộp bài</button>')+
    '</div><div class="progress"><i style="width:'+(c.answered/s.ids.length*100)+'%"></i></div>';

  var card;
  if (!q || pos<0 && vis.length===0){
    card = '<div class="qcard empty">Không có câu nào phù hợp bộ lọc này.<br><br><button class="btn" data-filter="all">Hiện tất cả</button></div>';
  } else {
    var a = s.ans[id] || {sel:[]}, sel = a.sel||[], isG = graded(s,id);
    var perm = s.opt[id] || range(q.opts.length);
    var opts = perm.map(function(oi, di){
      var cls = "opt" + (q.type==="multi"?" multi":"");
      var inAns = q.ans.indexOf(oi)>=0, picked = sel.indexOf(oi)>=0;
      if (isG){ if (inAns && picked) cls+=" right"; else if (inAns) cls += (q.type==="multi"?" missed":" right"); else if (picked) cls+=" wrong"; }
      else if (picked) cls+=" sel";
      return '<button class="'+cls+'" data-opt="'+oi+'" '+(isG?'disabled':'')+'><span class="key">'+LETTERS[di]+'</span><span class="txt">'+esc(q.opts[oi])+'</span></button>';
    }).join("");
    var steps = q.steps ? '<div class="steps-box"><b>Các bước cần sắp xếp:</b><ol>'+q.steps.map(function(t,i){ return '<li><span>'+(i+1)+'</span><div>'+esc(t)+'</div></li>'; }).join("")+'</ol></div>' : '';
    var hint = q.type==="multi" ? "Có thể có NHIỀU đáp án đúng – chọn tất cả đáp án đúng"+(s.instant&&!exam?" rồi bấm “Kiểm tra”.":".")
             : q.type==="order" ? "Chọn phương án có thứ tự đúng (1 đáp án)." : "Chọn 1 đáp án đúng.";
    var fb = "";
    if (isG){
      var st = status(s,id);
      var letters = perm.map(function(oi,di){ return q.ans.indexOf(oi)>=0 ? LETTERS[di] : null; }).filter(Boolean).join(", ");
      var head = st==="g" ? ICON.check+"Chính xác!" : st==="r" ? ICON.x+"Chưa chính xác!" : "Bạn chưa trả lời câu này";
      fb = '<div class="feedback '+(st==="g"?"ok":st==="r"?"bad":"na")+'"><h4>'+head+'</h4><div class="ansline">Đáp án đúng: '+letters+'</div>'+(q.expH ? '<div class="exp-h">'+q.expH+'</div>' : '<p>'+esc(q.exp)+'</p>')+
           (q.ch>=4 && q.ch<=6 ? '<div class="more"><button class="btn sm ghost" data-sum="'+q.ch+'" data-topic="'+esc(q.topic)+'"'+(q.sec?' data-sec="'+q.sec+'"':'')+'>'+ICON.book+'Ôn lý thuyết '+chName(q.ch)+(q.sec?' (mục '+q.sec.split("-")[1]+')':'')+'</button></div>' : '')+'</div>';
    }
    var prevI = pos>0 ? vis[pos-1] : (pos<0 ? vis.filter(function(i){return i<s.cur;}).pop() : undefined);
    var nextI = pos>=0 ? vis[pos+1] : vis.filter(function(i){return i>s.cur;})[0];
    var checkBtn = (!isG && !exam && s.instant && q.type==="multi") ? '<button class="btn ok" id="checkBtn" '+(sel.length?'':'disabled')+'>'+ICON.check+'Kiểm tra</button>' : '';
    var redoBtn = (isG && !s.submitted) ? '<button class="btn" id="redoBtn">'+ICON.reset+'Làm lại câu</button>' : '';
    card = '<div class="qcard"><div class="qhead"><span class="badge no">Câu '+(s.cur+1)+'</span><span class="badge '+q.type+'">'+TYPE_LABEL[q.type]+'</span><span class="badge'+(q.set?' chb':'')+'">'+chName(q.ch)+'</span><span class="badge">'+esc(q.topic)+'</span>'+((state.stats||{})[id]&&state.stats[id].w?'<span class="badge wr">Đã sai '+state.stats[id].w+' lần</span>':'')+(XS[id]?'<span class="badge xsb" title="'+esc(XS[id])+'">Mở rộng ngoài slide</span>':'')+
      '<button class="flagbtn '+(s.flags[id]?'on':'')+'" id="flagBtn" title="Đánh dấu để xem lại (phím F)">'+ICON.flag+(s.flags[id]?'Đã đánh dấu':'Đánh dấu')+'</button></div>'+
      '<p class="qtext">'+esc(q.q)+'</p><p class="qhint">'+hint+'</p>'+steps+'<div class="opts">'+opts+'</div>'+fb+
      '<div class="qactions sticky"><button class="btn" id="prevBtn" '+(prevI===undefined?'disabled':'')+' data-i="'+prevI+'">'+ICON.left+'Câu trước</button>'+
      '<span class="grow"></span>'+redoBtn+checkBtn+
      '<button class="btn primary" id="nextBtn" '+(nextI===undefined?'disabled':'')+' data-i="'+nextI+'">Câu tiếp'+ICON.right+'</button></div></div>';
  }

  var filters = [["all","Tất cả"],["todo","Chưa làm"],["wrong","Câu sai"],["flag","Đánh dấu"]];
  if (hideScore) filters = filters.filter(function(f){ return f[0]!=="wrong"; });
  var pal = s.ids.map(function(pid, i){
    if (vis.indexOf(i)<0) return "";
    var st = status(s,pid), cls = "pbtn";
    if (hideScore){ if (st!=="none") cls+=" ans"; } else if (st==="g") cls+=" g"; else if (st==="r"||st==="skip") cls+=" r"; else if (st==="ans") cls+=" ans";
    if (i===s.cur) cls+=" cur"; if (s.flags[pid]) cls+=" flag";
    return '<button class="'+cls+'" data-jump="'+i+'">'+(i+1)+'</button>';
  }).join("");
  var side = '<aside class="side"><div class="panel"><h5>Danh sách câu</h5><div class="filters">'+filters.map(function(f){ return '<button class="fbtn '+(s.filter===f[0]?'active':'')+'" data-filter="'+f[0]+'">'+f[1]+'</button>'; }).join("")+'</div>'+
    '<div class="palette">'+(pal||'<div class="kbd">Trống</div>')+'</div>'+
    '<div class="legend" style="margin-top:12px"><span style="color:var(--ok-text)">■ đúng</span><span style="color:var(--bad-text)">■ sai</span><span style="color:var(--brand-text)">■ đã chọn</span><span style="color:var(--warn)">● đánh dấu</span></div></div>'+
    '<div class="panel kbd"><h5>Phím tắt</h5><kbd>A</kbd>–<kbd>E</kbd> / <kbd>1</kbd>–<kbd>6</kbd> chọn đáp án · <kbd>Enter</kbd> kiểm tra / câu tiếp · <kbd>←</kbd> <kbd>→</kbd> chuyển câu · <kbd>F</kbd> đánh dấu</div></aside>';

  root.innerHTML = bar + '<div class="qgrid"><div>'+card+'</div>'+side+'</div>';
  if (rem!==null && !s.submitted) startTimer();
}
function startTimer(){
  clearInterval(timerH);
  timerH = setInterval(function(){
    var s = cur(); if (!s || s.submitted || state.view!=="quiz"){ clearInterval(timerH); return; }
    var r = remaining(s), el = $("#timer");
    if (el) el.innerHTML = ICON.clock + fmtTime(r);
    if (r <= 0){ clearInterval(timerH); toast("Hết giờ! Bài đã được nộp tự động."); doSubmit(true); }
  }, 1000);
}
function selectOpt(oi){
  var s = cur(), id = s.ids[s.cur], q = BYID[id];
  if (graded(s,id)) return;
  var a = s.ans[id] || (s.ans[id] = {sel:[], done:false});
  if (q.type==="multi"){
    var k = a.sel.indexOf(oi); if (k>=0) a.sel.splice(k,1); else a.sel.push(oi);
  } else {
    a.sel = [oi];
    if (s.instant && s.mode==="practice"){ a.done = true; recordGrade(id, isCorrect(q, a.sel)); }
  }
  if (!a.sel.length) delete s.ans[id];
  save(); renderQuiz();
}
function checkMulti(){
  var s = cur(), id = s.ids[s.cur], a = s.ans[id];
  if (!a || !a.sel.length){ toast("Hãy chọn ít nhất một đáp án"); return; }
  a.done = true; recordGrade(id, isCorrect(BYID[id], a.sel)); save(); renderQuiz();
}
function jump(i){ var s=cur(); if (i===undefined||i===null||isNaN(i)) return; s.cur = +i; save(); renderQuiz(); var qc=$(".qcard"); if (qc && window.innerWidth<1024) qc.scrollIntoView({block:"start"}); }
function doSubmit(force){
  var s = cur(); if (!s || s.submitted) return;
  var c = counts(s), left = s.ids.length - c.answered;
  if (!force && !confirm(left>0 ? "Còn "+left+" câu chưa trả lời. Bạn vẫn muốn nộp bài?" : "Nộp bài và xem kết quả?")) return;
  s.ids.forEach(function(id){ var a = s.ans[id]; if (a && a.sel && a.sel.length && !a.done) recordGrade(id, isCorrect(BYID[id], a.sel)); });
  s.submitted = true; s.finished = Date.now(); s.filter = "all"; save(); go("result");
}

/* ================= KẾT QUẢ ================= */
function renderResult(){
  var s = cur(), root = $("#view-result");
  if (!s || !s.submitted){ go("quiz"); return; }
  var c = counts(s), total = s.ids.length, score = total ? c.g/total*10 : 0;
  var grade = score>=9?"Xuất sắc! Bạn nắm rất chắc kiến thức.":score>=8?"Giỏi! Chỉ còn vài chỗ cần ôn lại.":score>=6.5?"Khá – xem lại các câu sai để chắc hơn.":score>=5?"Trung bình – nên đọc lại phần tổng hợp kiến thức.":"Cần ôn thêm – hãy đọc phần tổng hợp rồi làm lại nhé.";
  var by = {};
  s.ids.forEach(function(id){ var ch=BYID[id].ch; by[ch]=by[ch]||{g:0,t:0}; by[ch].t++; if (status(s,id)==="g") by[ch].g++; });
  var rows = Object.keys(by).sort().map(function(ch){ var b=by[ch], p=Math.round(b.g/b.t*100);
    return '<div class="row"><b>'+chName(+ch)+'</b><div class="meter"><i class="g" style="width:'+p+'%"></i></div><span>'+b.g+'/'+b.t+'</span></div>'; }).join("");
  var used = s.finished && s.start ? Math.round((s.finished - s.start)/1000) : null;
  root.innerHTML = '<div class="result"><div class="panel"><div class="trophy">'+ICON.trophy+'</div><h2 style="margin:0">Kết quả bài làm</h2><div style="color:var(--muted);font-size:14px;margin-top:2px">'+esc(s.name)+(used&&s.mode==="exam"?' · thời gian làm '+fmtTime(used):'')+'</div>'+
    '<div class="score">'+score.toFixed(1).replace(".",",")+'<small> / 10 điểm</small></div><p class="grade">'+grade+'</p>'+
    '<div class="rstats"><div><b>'+total+'</b><span>Tổng số câu</span></div><div class="g"><b>'+c.g+'</b><span>Đúng</span></div><div class="r"><b>'+c.r+'</b><span>Sai</span></div><div class="n"><b>'+c.skip+'</b><span>Bỏ trống</span></div></div>'+
    (Object.keys(by).length>1?'<div class="bychap">'+rows+'</div>':'')+
    '<div class="ractions"><button class="btn primary" id="reviewBtn">Xem đáp án & giải thích</button>'+
    '<button class="btn" id="wrongBtn" '+((c.r+c.skip)?'':'disabled')+'>Ôn lại các câu sai ('+(c.r+c.skip)+')</button>'+
    '<button class="btn" data-reset-cur="1">'+ICON.reset+'Làm lại toàn bộ đề</button>'+
    '<button class="btn" data-view-go="home">Chọn bộ đề khác</button></div></div></div>';
  if (score >= 8) confetti();
}
function practiceWrong(){
  var s = cur(); var ids = s.ids.filter(function(id){ var st=status(s,id); return st==="r"||st==="skip"; });
  if (!ids.length) return;
  newSession("wrong", "Ôn lại câu sai ("+ids.length+" câu)", ids, "practice");
  go("quiz");
}
function confetti(){
  var cv = document.createElement("canvas"); cv.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:150";
  document.body.appendChild(cv); var ctx = cv.getContext("2d"); cv.width=innerWidth; cv.height=innerHeight;
  var cols=["#6366f1","#10b981","#f59e0b","#f43f5e","#a855f7"], ps=[];
  for (var i=0;i<140;i++) ps.push({x:Math.random()*cv.width,y:-20-Math.random()*cv.height*.5,vx:(Math.random()-.5)*3,vy:2+Math.random()*3,r:Math.random()*6.28,c:cols[i%5],s:5+Math.random()*5});
  var t0=performance.now();
  (function f(t){ ctx.clearRect(0,0,cv.width,cv.height); ps.forEach(function(p){ p.x+=p.vx; p.y+=p.vy; p.r+=.1; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.fillStyle=p.c; ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2); ctx.restore(); });
    if (t-t0<2600) requestAnimationFrame(f); else cv.remove(); })(t0);
}

/* ================= TỔNG HỢP KIẾN THỨC ================= */
var sumQuery = "";
function renderSummary(){
  var data = window.SUMMARY || [], ch = state.sumCh || 4;
  var c = data.filter(function(d){ return d.ch===ch; })[0] || data[0];
  var qf = fold(sumQuery.trim());
  var gl = (window.GLOSSARY || {})[c.ch];
  var secs = c.sections.filter(function(sec){ return !qf || fold(sec.title + " " + sec.html.replace(/<[^>]+>/g," ")).indexOf(qf)>=0; });
  var root = $("#view-summary");
  root.innerHTML = '<div class="sum-layout'+(gl?' has-gl':'')+'"><div class="sum-nav">'+
    '<div class="chap-tabs">'+data.map(function(d){ return '<button class="chap-tab '+(d.ch===c.ch?'active':'')+'" data-sumch="'+d.ch+'">Chương '+d.ch+'</button>'; }).join("")+'</div>'+
    '<input class="search" id="sumSearch" placeholder="Tìm trong chương… (vd: TLB, RAID)" value="'+esc(sumQuery)+'">'+
    '<nav class="toc">'+secs.map(function(sec){ return '<a href="#'+sec.id+'" data-toc="'+sec.id+'">'+esc(sec.title)+'</a>'; }).join("")+'</nav></div>'+
    '<div><div class="sum-head"><div class="kicker">Chương '+c.ch+' · '+esc(c.en)+'</div><h2>'+esc(c.title)+'</h2><p>'+c.intro+'</p><p class="muted" style="margin-top:8px;font-size:13.5px">Nhãn <span class="xs">ngoài slide</span> = kiến thức bổ sung từ giáo trình gốc (Tanenbaum), không có trong slide – nên ôn sau phần chính.</p></div>'+
    (secs.length ? secs.map(renderSec).join("") : '<div class="panel empty">Không tìm thấy nội dung phù hợp “'+esc(sumQuery)+'”.</div>')+
    '<div class="sum-cta"><button class="btn primary" data-start="c'+c.ch+'">'+ICON.play+'Luyện câu hỏi Chương '+c.ch+'</button>'+
    (c.ch<6?'<button class="btn" data-sumch="'+(c.ch+1)+'">Chương '+(c.ch+1)+ICON.right+'</button>':'')+'</div></div>'+
    (gl ? glossaryPanel(c.ch, gl) : '')+'</div>'+
    (gl ? '<button class="gl-fab" data-glopen aria-label="Mở bảng thuật ngữ">📖 Thuật ngữ</button>' : '');
  if (gl) linkTerms(root, gl);
  if (sumQuery.trim()) highlight(root.querySelectorAll(".sum-body"), sumQuery.trim());
  mountDemos(root);
  tocLock = 0; spyToc();
}
/* ---------- Thuật ngữ: cột bên phải (ngăn kéo trên màn hình hẹp) + gạch chân giải nghĩa tại chỗ ---------- */
var glMode = "sec";
try { glMode = localStorage.getItem("nlhdh_glmode") || "sec"; } catch (e){}
function secTitles(ch){ var o = {}; ((window.SUMMARY || []).filter(function(d){ return d.ch === ch; })[0] || {sections:[]}).sections.forEach(function(s){ o[s.id] = s.title; }); return o; }
function glossaryPanel(ch, gl){
  var groups = [], by = {}, st = secTitles(ch);
  gl.forEach(function(it, i){ if (!by[it.g]){ by[it.g] = []; groups.push(it.g); } by[it.g].push([it, i]); });
  return '<aside class="gl-panel" id="glPanel" aria-label="Thuật ngữ Chương ' + ch + '">' +
    '<div class="gl-ph"><b>📖 Thuật ngữ Chương ' + ch + '</b><button class="gl-x" data-glclose aria-label="Đóng">✕</button></div>' +
    '<div class="gl-mode"><button data-glmode="sec" class="' + (glMode === "sec" ? "on" : "") + '">Mục đang đọc</button><button data-glmode="all" class="' + (glMode === "all" ? "on" : "") + '">Tất cả (' + gl.length + ')</button></div>' +
    '<input class="search gl-filter" placeholder="Lọc… (vd: offset, TLB)">' +
    '<div class="gl-cur"></div>' +
    '<div class="gl-list">' + groups.map(function(g){
      return '<h5 class="gl-gh">' + esc(g) + '</h5><div class="gl-grid">' + by[g].map(function(p){
        var it = p[0], sn = it.sec && st[it.sec] ? st[it.sec].replace(/^(\d+)\..*$/, "mục $1").replace(/^✔.*$/, "ghi nhớ nhanh") : "";
        return '<div class="gl-item" data-i="' + p[1] + '"><div class="gl-t"><b>' + esc(it.t) + '</b>' + (it.en ? '<span>' + esc(it.en) + '</span>' : '') + '</div>' +
          '<div class="gl-d">' + esc(it.d) + '</div>' + (it.ex ? '<div class="gl-ex">' + esc(it.ex) + '</div>' : '') +
          (it.sec ? '<a href="#' + it.sec + '" data-toc="' + it.sec + '" class="gl-go">Xem ' + esc(sn || "mục liên quan") + ' →</a>' : '') + '</div>';
      }).join("") + '</div>';
    }).join("") + '<p class="muted gl-none" hidden>Không có thuật ngữ khớp.</p></div></aside>';
}
/* Lọc danh sách: theo ô lọc, hoặc chỉ thuật ngữ của mục đang đọc */
function applyGl(){
  var p = document.getElementById("glPanel"); if (!p) return;
  var gl = (window.GLOSSARY || {})[state.sumCh || 4] || [], q = fold(p.querySelector(".gl-filter").value.trim()), cur = p.dataset.sec || "", set = null;
  if (!q && glMode === "sec" && cur){
    set = {};
    Array.prototype.forEach.call(document.querySelectorAll("#" + cur + " .term"), function(t){ set[t.dataset.g] = 1; });
    gl.forEach(function(it, i){ if (it.sec === cur) set[i] = 1; });
    if (!Object.keys(set).length) set = null;
  }
  var any = false;
  Array.prototype.forEach.call(p.querySelectorAll(".gl-item"), function(it){
    var ok = q ? fold(it.textContent).indexOf(q) >= 0 : (!set || set[it.dataset.i]);
    it.hidden = !ok; if (ok) any = true;
  });
  Array.prototype.forEach.call(p.querySelectorAll(".gl-grid"), function(g){ var vis = Array.prototype.some.call(g.children, function(c){ return !c.hidden; }); g.hidden = !vis; g.previousElementSibling.hidden = !vis; });
  p.querySelector(".gl-none").hidden = any;
  var lab = p.querySelector(".gl-cur"), st = secTitles(state.sumCh || 4);
  lab.textContent = q ? "Kết quả lọc" : (set ? "Trong: " + (st[cur] || "") : (glMode === "sec" ? "Mục này không có thuật ngữ riêng, đang hiện tất cả" : "Tất cả thuật ngữ, theo thứ tự bài học"));
}
function glSetSec(id){
  var p = document.getElementById("glPanel"); if (!p || p.dataset.sec === id) return;
  p.dataset.sec = id; applyGl();
  if (glMode === "sec") p.querySelector(".gl-list").scrollTop = 0;
}
function glHighlight(i){
  var p = document.getElementById("glPanel"); if (!p) return;
  Array.prototype.forEach.call(p.querySelectorAll(".gl-item.hl"), function(x){ x.classList.remove("hl"); });
  var it = p.querySelector('.gl-item[data-i="' + i + '"]'); if (!it || it.hidden) return;
  it.classList.add("hl");
  var list = p.querySelector(".gl-list"), top = it.offsetTop - list.offsetTop;
  if (top < list.scrollTop || top + it.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = Math.max(0, top - 40);
}
document.addEventListener("click", function(e){
  var b = e.target.closest && e.target.closest("[data-glmode], [data-glopen], [data-glclose], #glPanel .gl-go");
  var p = document.getElementById("glPanel"); if (!p) return;
  if (!b){ if (p.classList.contains("open") && !(e.target.closest && e.target.closest("#glPanel, #termPop"))) p.classList.remove("open"); return; }
  if (b.dataset.glmode){
    glMode = b.dataset.glmode; try { localStorage.setItem("nlhdh_glmode", glMode); } catch (err){}
    Array.prototype.forEach.call(p.querySelectorAll("[data-glmode]"), function(x){ x.classList.toggle("on", x === b); });
    applyGl();
  } else if (b.hasAttribute("data-glopen")){ p.classList.add("open"); }
  else if (b.hasAttribute("data-glclose") || b.classList.contains("gl-go")){ p.classList.remove("open"); }
});
function linkTerms(root, gl){
  var pats = [];
  gl.forEach(function(it, i){ (it.a || []).forEach(function(a){
    pats.push({i:i, len:a.length, re:new RegExp("(?<![\\p{L}\\d])" + a.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&") + "(?![\\p{L}\\d])", it.cs ? "u" : "iu")});
  }); });
  pats.sort(function(x, y){ return y.len - x.len; });
  var SKIP = "a, button, code, mark, .term, .demo, .vplayer, h3, h4, th, .addr, .flow, .bits, .xs, .gl-filter, summary";
  Array.prototype.forEach.call(root.querySelectorAll(".sum-sec:not([id^='g']) .sum-body"), function(body){
    var used = {};
    pats.forEach(function(p){
      if (used[p.i]) return;
      var w = document.createTreeWalker(body, NodeFilter.SHOW_TEXT), n, m;
      while ((n = w.nextNode())){
        if (!n.nodeValue.trim() || (n.parentElement && n.parentElement.closest(SKIP))) continue;
        m = p.re.exec(n.nodeValue); if (!m) continue;
        var after = n.splitText(m.index); after.splitText(m[0].length);
        var sp = document.createElement("span"); sp.className = "term"; sp.tabIndex = 0; sp.dataset.g = p.i; sp.textContent = after.nodeValue;
        after.parentNode.replaceChild(sp, after);
        used[p.i] = 1; break;
      }
    });
  });
}
var termPop = null, termHide = 0;
function showTerm(el){
  var gl = (window.GLOSSARY || {})[state.sumCh || 4], it = gl && gl[+el.dataset.g]; if (!it) return;
  glHighlight(+el.dataset.g);
  if (!termPop){ termPop = document.createElement("div"); termPop.id = "termPop"; termPop.setAttribute("role", "tooltip"); document.body.appendChild(termPop);
    termPop.onmouseenter = function(){ clearTimeout(termHide); }; termPop.onmouseleave = hideTerm; }
  clearTimeout(termHide);
  termPop.innerHTML = '<div class="tp-t"><b>' + esc(it.t) + '</b>' + (it.en ? '<span>' + esc(it.en) + '</span>' : '') + '</div><div class="tp-d">' + esc(it.d) + '</div>' + (it.ex ? '<div class="tp-ex">' + esc(it.ex) + '</div>' : '');
  termPop.style.display = "block";
  var r = el.getBoundingClientRect(), pw = Math.min(340, window.innerWidth - 24);
  termPop.style.width = pw + "px";
  var left = Math.max(12, Math.min(window.innerWidth - pw - 12, r.left + r.width / 2 - pw / 2));
  var top = r.bottom + 8; termPop.style.left = left + "px"; termPop.style.top = top + "px";
  var ph = termPop.offsetHeight; if (top + ph > window.innerHeight - 8) termPop.style.top = Math.max(8, r.top - ph - 8) + "px";
}
function hideTerm(){ clearTimeout(termHide); termHide = setTimeout(function(){ if (termPop) termPop.style.display = "none"; }, 120); }
document.addEventListener("mouseover", function(e){ var t = e.target.closest && e.target.closest(".term"); if (t) showTerm(t); });
document.addEventListener("mouseout", function(e){ var t = e.target.closest && e.target.closest(".term"); if (t) hideTerm(); });
document.addEventListener("focusin", function(e){ if (e.target.classList && e.target.classList.contains("term")) showTerm(e.target); });
document.addEventListener("focusout", function(e){ if (e.target.classList && e.target.classList.contains("term")) hideTerm(); });
document.addEventListener("click", function(e){
  var t = e.target.closest && e.target.closest(".term");
  if (t){ showTerm(t); return; }
  if (termPop && !(e.target.closest && e.target.closest("#termPop"))) termPop.style.display = "none";
});
window.addEventListener("scroll", function(){ if (termPop && termPop.style.display === "block") termPop.style.display = "none"; }, {passive:true});
document.addEventListener("input", function(e){
  if (!e.target.classList || !e.target.classList.contains("gl-filter")) return;
  applyGl();
});
/* Mục lục bên cạnh: tô nổi mục đang chọn / đang đọc */
var tocLock = 0, spyRaf = 0;
function setTocOn(id){
  glSetSec(id);
  var toc = document.querySelector("#view-summary .toc"); if (!toc) return;
  var on = null;
  Array.prototype.forEach.call(toc.querySelectorAll("a[data-toc]"), function(a){ var m = a.dataset.toc === id; a.classList.toggle("on", m); if (m){ on = a; a.setAttribute("aria-current", "true"); } else a.removeAttribute("aria-current"); });
  /* giữ mục đang tô luôn nhìn thấy trong khung mục lục (chỉ cuộn khung mục lục, không cuộn trang) */
  if (on && toc.scrollHeight > toc.clientHeight){
    var top = on.offsetTop - toc.offsetTop, bot = top + on.offsetHeight;
    if (top < toc.scrollTop + 8) toc.scrollTop = Math.max(0, top - 40);
    else if (bot > toc.scrollTop + toc.clientHeight - 8) toc.scrollTop = bot - toc.clientHeight + 40;
  }
}
function spyToc(){
  if (state.view !== "summary") return;
  /* vừa bấm mục lục: giữ nguyên mục đã chọn cho tới khi trang cuộn xong */
  if (Date.now() < tocLock){ tocLock = Date.now() + 200; return; }
  var secs = document.querySelectorAll("#view-summary .sum-sec[id]"); if (!secs.length) return;
  var id = secs[0].id, line = 140;
  for (var k = 0; k < secs.length; k++){ if (secs[k].getBoundingClientRect().top <= line) id = secs[k].id; else break; }
  /* cuộn tới cuối trang thì tô mục cuối */
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) id = secs[secs.length - 1].id;
  setTocOn(id);
}
window.addEventListener("scroll", function(){ if (spyRaf) return; spyRaf = requestAnimationFrame(function(){ spyRaf = 0; spyToc(); }); }, {passive: true});
function slideSrc(code){ return "assets/slides/"+code+".jpg"; }
function renderSec(sec){
  var figs = (sec.figs||[]).map(function(f){
    return '<figure class="fig"><button class="fig-btn" data-zoom="'+f[0]+'" data-cap="'+esc(f[1])+'"><img loading="lazy" src="'+slideSrc(f[0])+'" alt="'+esc(f[1])+'"></button><figcaption>'+esc(f[1])+'</figcaption></figure>';
  }).join("");
  var ez = (window.EASY||{})[sec.id], easy = ez ? '<div class="easy"><div class="easy-tl"><span>💡 Hiểu nhanh</span>'+ez.tl+'</div>'+(ez.vi?'<div class="easy-vi"><span>🧠 Ví von đời thường</span>'+ez.vi+'</div>':'')+'</div>' : '';
  var vkeys = Object.keys(window.VIDEOS||{}).filter(function(k){ return k===sec.id || k.indexOf(sec.id+"~")===0; });
  var vid = '';
  if (vkeys.length){
    var lab = window.VLABEL||{};
    vid = (vkeys.length>1 ? '<div class="vtabs"><span>🎬 Chọn video:</span>'+vkeys.map(function(k,i){ return '<button class="vtab'+(i?'':' on')+'" data-vtab="'+k+'">'+esc(lab[k]||("Video "+(i+1)))+'</button>'; }).join("")+'</div>' : '')+
      '<div class="vplayer" data-video="'+vkeys[0]+'"></div>';
  }
  return '<article class="sum-sec" id="'+sec.id+'"><div class="sec-head"><h3>'+esc(sec.title)+'</h3></div>'+easy+vid+
    (figs ? '<details class="figs-wrap" open><summary>🖼 Hình slide gốc ('+sec.figs.length+')</summary><div class="figs">'+figs+'</div></details>' : '')+'<div class="sum-body">'+sec.html+'</div></article>';
}

/* ---------- Lightbox ---------- */
function openLightbox(list, idx){
  var lb = $("#lightbox");
  if (!lb){ lb = document.createElement("div"); lb.id = "lightbox"; document.body.appendChild(lb); }
  function show(){
    var it = list[idx];
    lb.innerHTML = '<div class="lb-in"><img src="'+slideSrc(it[0])+'" alt=""><div class="lb-cap">'+esc(it[1])+' <span>('+(idx+1)+'/'+list.length+')</span></div>'+
      '<button class="lb-x" aria-label="Đóng">✕</button>'+(list.length>1?'<button class="lb-p" aria-label="Ảnh trước">‹</button><button class="lb-n" aria-label="Ảnh sau">›</button>':'')+'</div>';
  }
  lb.onclick = function(e){
    if (e.target.closest(".lb-p")){ idx = (idx-1+list.length)%list.length; show(); return; }
    if (e.target.closest(".lb-n")){ idx = (idx+1)%list.length; show(); return; }
    if (e.target.closest(".lb-x") || e.target===lb || e.target.classList.contains("lb-in")) closeLb();
  };
  function key(e){ if (e.key==="Escape") closeLb(); else if (e.key==="ArrowRight" && list.length>1){ idx=(idx+1)%list.length; show(); } else if (e.key==="ArrowLeft" && list.length>1){ idx=(idx-1+list.length)%list.length; show(); } }
  function closeLb(){ lb.classList.remove("show"); document.removeEventListener("keydown", key, true); }
  document.addEventListener("keydown", key, true);
  show(); lb.classList.add("show");
}

/* ---------- Mô phỏng tương tác ---------- */
var stepTimers = [];
function mountDemos(root){
  stepTimers.forEach(clearInterval); stepTimers = [];
  if (window.VideoPlayer){ VideoPlayer.destroyAll(); VideoPlayer.mountAll(root); }
  Array.prototype.forEach.call(root.querySelectorAll(".demo"), function(el){
    var k = el.dataset.demo;
    if (k==="steps") demoSteps(el, window.STEPS && window.STEPS[el.dataset.key]);
    else if (DEMOS[k]) DEMOS[k](el);
  });
}
function demoSteps(el, S){
  if (!S) return;
  var i = 0, playing = false, t = null;
  el.classList.add("stepper");
  function draw(){
    var s = S.steps[i];
    el.innerHTML = '<div class="demo-h">🎬 '+esc(S.title)+'</div><div class="st-grid">'+
      (S.fig ? '<button class="fig-btn st-fig" data-zoom="'+S.fig+'" data-cap="'+esc(S.title)+'"><img loading="lazy" src="'+slideSrc(S.fig)+'" alt=""></button>' : '')+
      '<div class="st-body"><div class="st-dots">'+S.steps.map(function(_,j){ return '<button class="st-dot '+(j<i?'done':j===i?'on':'')+'" data-go="'+j+'">'+(j+1)+'</button>'; }).join("")+'</div>'+
      '<div class="st-card"><b>'+s.t+'</b><p>'+s.d+'</p></div>'+
      '<div class="st-ctl"><button class="btn sm" data-a="prev" '+(i===0?'disabled':'')+'>‹ Trước</button><button class="btn sm primary" data-a="play">'+(playing?'❚❚ Tạm dừng':'▶ Tự chạy')+'</button><button class="btn sm" data-a="next" '+(i===S.steps.length-1?'disabled':'')+'>Sau ›</button></div></div></div>'+
      '<div class="st-bar"><i style="width:'+((i+1)/S.steps.length*100)+'%"></i></div>';
  }
  function stop(){ playing=false; clearInterval(t); }
  el.onclick = function(e){
    var b = e.target.closest("button"); if (!b || b.dataset.zoom) return;
    if (b.dataset.go){ stop(); i = +b.dataset.go; }
    else if (b.dataset.a==="prev"){ stop(); i = Math.max(0,i-1); }
    else if (b.dataset.a==="next"){ stop(); i = Math.min(S.steps.length-1,i+1); }
    else if (b.dataset.a==="play"){
      if (playing) stop();
      else { playing = true; if (i===S.steps.length-1) i = 0;
        t = setInterval(function(){ if (i < S.steps.length-1){ i++; draw(); } else { stop(); draw(); } }, 3200); stepTimers.push(t); }
    }
    draw();
  };
  draw();
}
function numList(s){ return String(s).split(/[\s,;]+/).filter(Boolean).map(Number).filter(function(x){ return !isNaN(x); }); }
var DEMOS = {
  reloc: function(el){
    el.innerHTML = '<div class="demo-h">🧪 Thử tính: thanh ghi Base – Limit</div><div class="demo-row">'+
      '<label>Base<input type="number" data-f="b" value="30000"></label><label>Limit<input type="number" data-f="l" value="12000"></label><label>Địa chỉ logic<input type="number" data-f="a" value="5000"></label></div><div class="demo-out"></div>';
    function run(){
      var b=+el.querySelector('[data-f=b]').value, l=+el.querySelector('[data-f=l]').value, a=+el.querySelector('[data-f=a]').value, o=el.querySelector(".demo-out");
      o.innerHTML = (a>=0 && a<l) ? '<span class="ok-t">✔ Hợp lệ</span> vì '+a+' &lt; Limit '+l+' → địa chỉ vật lý = '+b+' + '+a+' = <b>'+(b+a)+'</b>'
        : '<span class="bad-t">✘ Lỗi bảo vệ (trap)</span> vì địa chỉ logic '+a+(a<0?' &lt; 0':' ≥ Limit '+l)+' → HĐH báo addressing error';
    }
    el.oninput = run; run();
  },
  fit: function(el){
    el.innerHTML = '<div class="demo-h">🧪 Mô phỏng First / Next / Best / Worst-fit</div><div class="demo-row">'+
      '<label class="w">Các hole (K)<input data-f="h" value="100, 500, 200, 300, 600"></label><label class="w">Các yêu cầu (K)<input data-f="r" value="212, 417, 112, 426"></label></div><div class="demo-out"></div>';
    function alloc(holes, reqs, alg){
      holes = holes.slice(); var ptr = 0;
      return reqs.map(function(r){
        var idx = -1;
        if (alg==="first"){ for (var i=0;i<holes.length;i++) if (holes[i]>=r){ idx=i; break; } }
        else if (alg==="next"){ for (var k=0;k<holes.length;k++){ var j=(ptr+k)%holes.length; if (holes[j]>=r){ idx=j; break; } } }
        else { holes.forEach(function(h,i){ if (h>=r && (idx<0 || (alg==="best" ? h<holes[idx] : h>holes[idx]))) idx=i; }); }
        if (idx<0) return '<td class="bad-t">chờ</td>';
        var before = holes[idx]; holes[idx] -= r; ptr = idx;
        return '<td>hole '+(idx+1)+' ('+before+'K → còn '+holes[idx]+'K)</td>';
      });
    }
    function run(){
      var h=numList(el.querySelector('[data-f=h]').value), r=numList(el.querySelector('[data-f=r]').value);
      var rows=[["first","First-fit"],["next","Next-fit"],["best","Best-fit"],["worst","Worst-fit"]].map(function(a){ return '<tr><th>'+a[1]+'</th>'+alloc(h,r,a[0]).join("")+'</tr>'; }).join("");
      el.querySelector(".demo-out").innerHTML = '<div class="tbl-wrap"><table class="demo-t"><tr><th>Thuật toán</th>'+r.map(function(x){ return '<th>'+x+'K</th>'; }).join("")+'</tr>'+rows+'</table></div><small class="muted">Hole đánh số theo thứ tự nhập (1, 2, 3…). Phần dư của hole vẫn giữ tại chỗ.</small>';
    }
    el.oninput = run; run();
  },
  paging: function(el){
    el.innerHTML = '<div class="demo-h">🧪 Dịch địa chỉ ảo → vật lý (phân trang)</div><div class="demo-row">'+
      '<label>Kích thước trang<select data-f="s"><option value="1024">1 KB</option><option value="2048">2 KB</option><option value="4096" selected>4 KB</option><option value="8192">8 KB</option></select></label>'+
      '<label>Địa chỉ ảo<input data-f="a" value="8196"></label><label class="w">Bảng trang: khung của trang 0, 1, 2… (x = không có)<input data-f="t" value="2, 1, 6, 0, 4, 3, x, x, x, 5, x, 7"></label></div><div class="demo-out"></div>';
    function run(){
      var s=+el.querySelector('[data-f=s]').value, raw=el.querySelector('[data-f=a]').value.trim(), a=/^0x/i.test(raw)?parseInt(raw,16):parseInt(raw,10);
      var tbl=el.querySelector('[data-f=t]').value.split(/[\s,;]+/).filter(Boolean), o=el.querySelector(".demo-out");
      if (isNaN(a) || a<0){ o.innerHTML='Nhập địa chỉ hợp lệ (thập phân hoặc 0x…).'; return; }
      var p=Math.floor(a/s), d=a%s, nb=Math.log2(s), f=tbl[p];
      var line='p = '+a+' ÷ '+s+' = <b>'+p+'</b>, d = '+a+' mod '+s+' = <b>'+d+'</b> (offset '+nb+' bit)<br>';
      if (f===undefined || /^x$/i.test(f) || isNaN(+f)) o.innerHTML = line+'<span class="bad-t">Trang '+p+' không có trong RAM (present = 0) → LỖI TRANG</span>';
      else o.innerHTML = line+'Bảng trang: trang '+p+' → khung <b>'+f+'</b><br>Địa chỉ vật lý = '+f+' × '+s+' + '+d+' = <b class="ok-t">'+(f*s+d)+'</b>';
    }
    el.oninput = run; run();
  },
  /* Bộ nhớ ảo bằng tay: chương trình 8 trang, RAM 4 khung. Bấm trang để "dùng" → thấy bảng trang / RAM / đĩa đổi theo. */
  vmem: function(el){
    var NP = 8, FREE = [2, 0, 3, 1], SEQ = [0, 1, 2, 0, 3, 4, 0, 5];
    var pt, frames, order, uses, faults, last, msg, cls, auto = null;
    function reset(){
      pt = []; for (var p = 0; p < NP; p++) pt.push(null);
      frames = [null, null, null, null]; order = []; uses = 0; faults = 0; last = {}; cls = "";
      msg = 'Bấm vào một trang để chương trình <b>dùng</b> trang đó. Lúc đầu RAM trống, cả 8 trang đều nằm trên đĩa, bảng trang toàn <b>X</b>.';
    }
    function use(p){
      uses++;
      if (pt[p] !== null){
        last = {hit: pt[p]}; cls = "hit";
        msg = '✔ Trang ' + p + ' <b>đã có</b> trong RAM: bảng trang ghi ' + p + ' → khung ' + pt[p] + '. MMU đổi địa chỉ ngay, <b>không lỗi trang</b>.';
        return;
      }
      faults++; cls = "fault";
      var f = FREE.filter(function(k){ return frames[k] === null; })[0], out = null;
      if (f === undefined){ out = order.shift(); f = pt[out]; pt[out] = null; }
      frames[f] = p; pt[p] = f; order.push(p); last = {nw: f, out: out};
      msg = '✘ Bảng trang ghi trang ' + p + ' là <b>X</b> → <b>lỗi trang</b>. ' +
        (out === null ? 'Còn khung ' + f + ' trống, HĐH chép trang ' + p + ' từ đĩa vào <b>khung ' + f + '</b>.'
                      : 'RAM đã đầy, HĐH trả trang ' + out + ' (vào sớm nhất) về đĩa rồi nạp trang ' + p + ' vào <b>khung ' + f + '</b> vừa trống. <small class="muted">(Chọn trang nào để bỏ: mục 9–10.)</small>') +
        ' Bảng trang cập nhật: ' + p + ' → ' + f + '.';
    }
    function draw(){
      var pages = '', ptRows = '', fr = '', disk = '';
      for (var p = 0; p < NP; p++){
        pages += '<button data-p="' + p + '" class="' + (pt[p] !== null ? 'in' : '') + '">Trang ' + p + '</button>';
        var hl = pt[p] !== null && (pt[p] === last.hit || pt[p] === last.nw) ? (pt[p] === last.hit ? ' hit' : ' new') : '';
        ptRows += '<div class="vmd-cell' + (pt[p] !== null ? ' ok' : '') + hl + '"><span>trang ' + p + '</span><b>' + (pt[p] !== null ? '→ khung ' + pt[p] : 'X') + '</b></div>';
        if (pt[p] === null) disk += '<span class="chip' + (p === last.out ? ' out' : '') + '">trang ' + p + '</span>';
      }
      for (var f = 0; f < 4; f++){
        var h2 = f === last.hit ? ' hit' : f === last.nw ? ' new' : '';
        fr += '<div class="vmd-cell' + (frames[f] !== null ? ' ok' : '') + h2 + '"><span>khung ' + f + '</span><b>' + (frames[f] !== null ? 'trang ' + frames[f] : 'trống') + '</b></div>';
      }
      el.innerHTML = '<div class="demo-h">🧪 Tự tay chạy bộ nhớ ảo: chương trình 8 trang, RAM chỉ 4 khung</div>' +
        '<div class="muted" style="font-size:13.5px">Chương trình dùng trang:</div><div class="vmd-pages">' + pages + '</div>' +
        '<div class="vmd-grid"><div class="vmd-box"><h5>Bảng trang</h5>' + ptRows + '</div>' +
        '<div class="vmd-box"><h5>RAM (4 khung)</h5>' + fr + '</div>' +
        '<div class="vmd-box vmd-disk"><h5>Đĩa (trang chưa nạp)</h5><div class="vmd-chips">' + (disk || '<span class="muted">—</span>') + '</div></div></div>' +
        '<div class="vmd-msg ' + cls + '">' + msg + '</div>' +
        '<div class="vmd-stat"><span>Đã dùng <b>' + uses + '</b> lần · Lỗi trang <b>' + faults + '</b></span>' +
        '<button class="btn sm primary" data-a="seq">' + (auto ? '❚❚ Dừng' : '▶ Chạy thử chuỗi 0 1 2 0 3 4 0 5') + '</button><button class="btn sm" data-a="reset">↺ Làm lại</button></div>';
    }
    function stopAuto(){ if (auto){ clearInterval(auto); auto = null; } }
    el.onclick = function(e){
      var b = e.target.closest("button"); if (!b) return;
      if (b.dataset.p != null){ stopAuto(); use(+b.dataset.p); }
      else if (b.dataset.a === "reset"){ stopAuto(); reset(); }
      else if (b.dataset.a === "seq"){
        if (auto) stopAuto();
        else { reset(); var k = 0; use(SEQ[k++]);
          auto = setInterval(function(){ if (k < SEQ.length){ use(SEQ[k++]); draw(); } if (k >= SEQ.length){ stopAuto(); draw(); } }, 1800); stepTimers.push(auto); }
      }
      draw();
    };
    reset(); draw();
  },
  /* Tách địa chỉ 32 bit theo bảng trang 2 mức (10 – 10 – 12) */
  pt2: function(el){
    var ex = ["0x00403004", "0x00000000", "0xFFFFFFFF", "12345678", "0x12345678"];
    el.innerHTML = '<div class="demo-h">🧪 Tự tách địa chỉ 32 bit thành PT1 – PT2 – Offset (10 – 10 – 12)</div>' +
      '<div class="demo-row"><label class="w">Địa chỉ ảo (thập phân hoặc 0x…)<input data-f="a" value="0x00403004"></label></div>' +
      '<div class="demo-row">' + ex.map(function(v){ return '<button class="btn sm" data-v="' + v + '">' + v + '</button>'; }).join("") + '</div><div class="demo-out"></div>';
    var inp = el.querySelector('[data-f=a]'), o = el.querySelector(".demo-out");
    function n(x){ return x.toLocaleString("vi-VN"); }
    function run(){
      var raw = inp.value.trim(), a = /^0x/i.test(raw) ? parseInt(raw, 16) : parseInt(raw.replace(/[.\s]/g, ""), 10);
      if (isNaN(a) || a < 0 || a > 4294967295){ o.innerHTML = 'Nhập số từ 0 đến 4.294.967.295 (hoặc từ 0x00000000 đến 0xFFFFFFFF).'; return; }
      var bin = ("0".repeat(32) + a.toString(2)).slice(-32), r = a % 4194304, p1 = Math.floor(a / 4194304), p2 = Math.floor(r / 4096), off = a % 4096;
      o.innerHTML = '<div class="bits"><span class="b1">' + bin.slice(0, 10) + '</span><span class="b2">' + bin.slice(10, 20) + '</span><span class="b3">' + bin.slice(20) + '</span></div>' +
        '<b>PT1 = ' + p1 + '</b> · <b>PT2 = ' + p2 + '</b> · <b>Offset = ' + off + '</b><br>' +
        '<small class="muted">Tính bằng số thập phân: địa chỉ = ' + n(a) + ' → PT1 = ' + n(a) + ' ÷ 4.194.304 = ' + p1 + ' (dư ' + n(r) + ') → PT2 = ' + n(r) + ' ÷ 4096 = ' + p2 + ' → Offset = ' + n(a) + ' mod 4096 = ' + off + '</small><br>' +
        'Cách tra: dòng <b>' + p1 + '</b> của bảng cấp 1 → bảng cấp 2 phủ vùng ' + (p1 * 4) + ' MB – ' + (p1 * 4 + 4) + ' MB → dòng <b>' + p2 + '</b> của bảng đó cho số khung f → địa chỉ vật lý = f × 4096 + ' + off + '.';
    }
    el.oninput = run;
    el.onclick = function(e){ var b = e.target.closest("button[data-v]"); if (b){ inp.value = b.dataset.v; run(); } };
    run();
  },
  /* Pentium: (selector, offset) → descriptor → tuyến tính → 10/10/12 → vật lý */
  pent: function(el){
    var HS = function(v){ return "0x" + v.toString(16).toUpperCase(); };
    var H = function(v, w){ return "0x" + ("00000000" + v.toString(16).toUpperCase()).slice(-(w || 8)); };
    var DT = {
      G: [null, {nm:"Code của kernel", base:0xC0000000, lim:0xFFFFF, g:1, dpl:0, p:1}],
      L: [{nm:"Code của chương trình", base:0x00100000, lim:0xFFFF, g:0, dpl:3, p:1},
          {nm:"Data của chương trình", base:0x00400000, lim:0xFFFF, g:0, dpl:3, p:1},
          {nm:"Stack của chương trình", base:0x00800000, lim:0x1FFF, g:0, dpl:3, p:0}]
    };
    var MAP = {"0,256":5, "0,257":9, "1,3":7, "1,4":2, "768,0":1};
    var EX = [["Đi trọn (data)","0x000F","0x3004"],["Code","0x0007","0x1A20"],["Kernel tự dùng","0x0008","0x0"],
              ["Vượt Limit","0x000F","0x12000"],["Đoạn chưa có (P = 0)","0x0017","0x10"],["User đụng kernel","0x000B","0x0"],["Lỗi trang","0x000F","0x5000"]];
    function rows(k){ return DT[k].map(function(d, i){ return '<tr><td>' + i + '</td><td>' + (d ? d.nm : '<span class="muted">(trống)</span>') + '</td><td>' + (d ? H(d.base) : '') + '</td><td>' + (d ? HS(d.lim) + (d.g ? ' trang' : ' byte') : '') + '</td><td>' + (d ? d.dpl : '') + '</td><td>' + (d ? d.p : '') + '</td></tr>'; }).join(""); }
    el.innerHTML = '<div class="demo-h">🧪 Tự dịch địa chỉ Pentium: (selector, offset) → địa chỉ vật lý</div>' +
      '<div class="demo-row"><label>Selector (16 bit)<input data-f="s" value="0x000F"></label><label>Offset<input data-f="o" value="0x3004"></label></div>' +
      '<div class="demo-row">' + EX.map(function(e){ return '<button class="btn sm" data-s="' + e[1] + '" data-o="' + e[2] + '">' + e[0] + '</button>'; }).join("") + '</div>' +
      '<details class="slide-note"><summary>Bảng mẫu dùng trong công cụ</summary><div class="tbl-wrap"><table class="demo-t"><tr><th colspan="6">GDT (chung)</th></tr><tr><th>Dòng</th><th>Đoạn</th><th>Base</th><th>Limit</th><th>DPL</th><th>P</th></tr>' + rows("G") +
      '<tr><th colspan="6">LDT (của chương trình)</th></tr>' + rows("L") + '</table></div>' +
      '<small class="muted">Trang đã nạp (Dir, Page → khung): (0, 256) → 5 · (0, 257) → 9 · (1, 3) → 7 · (1, 4) → 2 · (768, 0) → 1. Trang khác coi như chưa có trong RAM.</small></details>' +
      '<div class="demo-out"></div>';
    var o = el.querySelector(".demo-out");
    function num(x){ x = String(x).trim(); return /^0x[0-9a-f]+$/i.test(x) ? parseInt(x, 16) : /^\d+$/.test(x) ? parseInt(x, 10) : NaN; }
    function run(){
      var s = num(el.querySelector('[data-f=s]').value), off = num(el.querySelector('[data-f=o]').value), out = [], stop = null;
      if (isNaN(s) || s < 0 || s > 0xFFFF){ o.innerHTML = 'Selector là số 16 bit: từ 0x0000 đến 0xFFFF.'; return; }
      if (isNaN(off) || off < 0 || off > 0xFFFFFFFF){ o.innerHTML = 'Offset là số từ 0 đến 0xFFFFFFFF (thập phân hoặc 0x…).'; return; }
      var idx = s >> 3, ti = (s >> 2) & 1, rpl = s & 3, bin = ("0000000000000000" + s.toString(2)).slice(-16), tb = ti ? "L" : "G", nm = ti ? "LDT" : "GDT";
      out.push('<b>① Tách selector</b> ' + H(s, 4) + ' = <span class="bits" style="display:inline-flex"><span class="b1">' + bin.slice(0, 13) + '</span><span class="b2">' + bin[13] + '</span><span class="b3">' + bin.slice(14) + '</span></span> → Index = <b>' + idx + '</b>, TI = <b>' + ti + '</b> (tra ' + nm + '), RPL = <b>' + rpl + '</b>');
      var d = DT[tb][idx];
      if (!d){ stop = 'Dòng ' + idx + ' của ' + nm + ' không có đoạn nào' + (idx === 0 && !ti ? ' (dòng 0 của GDT luôn để trống <span class="xs">ngoài slide</span>)' : '') + ' → <b>lỗi bảo vệ</b>, dừng.'; }
      else {
        out.push('<b>② Đọc descriptor</b> ' + nm + ' dòng ' + idx + ' (' + d.nm + '): Base = <b>' + H(d.base) + '</b>, Limit = ' + HS(d.lim) + ' (G = ' + d.g + ' → tính theo ' + (d.g ? 'trang' : 'byte') + '), DPL = ' + d.dpl + ', P = ' + d.p);
        var lim = d.g ? d.lim * 4096 + 4095 : d.lim;
        if (rpl > d.dpl) stop = 'Bên yêu cầu ở mức <b>' + rpl + '</b> nhưng đoạn có DPL = <b>' + d.dpl + '</b> (quyền cao hơn) → <b>bị chặn, lỗi bảo vệ</b>. Muốn nhờ kernel phải đi qua system call. <small class="muted">(Mô phỏng đơn giản hóa luật kiểm tra quyền.)</small>';
        else if (!d.p) stop = 'P = 0: đoạn <b>không có trong bộ nhớ</b> → báo lỗi cho HĐH nạp đoạn vào rồi chạy lại.';
        else if (off > lim) stop = 'Offset ' + HS(off) + ' &gt; Limit ' + HS(lim) + ' → <b>vượt quá chiều dài đoạn, lỗi</b>, dừng.';
        else {
          var lin = (d.base + off) % 4294967296;
          out.push('<b>③ Base + Offset</b>: ' + HS(off) + ' ≤ ' + HS(lim) + ' ✔ → ' + H(d.base) + ' + ' + HS(off) + ' = <b>' + H(lin) + '</b> (địa chỉ tuyến tính)');
          var dir = Math.floor(lin / 4194304), pg = Math.floor(lin / 4096) % 1024, po = lin % 4096, lb = ("0".repeat(32) + lin.toString(2)).slice(-32);
          out.push('<b>④ Tách 10 · 10 · 12</b>: <span class="bits" style="display:inline-flex"><span class="b1">' + lb.slice(0, 10) + '</span><span class="b2">' + lb.slice(10, 20) + '</span><span class="b3">' + lb.slice(20) + '</span></span> → Dir = <b>' + dir + '</b>, Page = <b>' + pg + '</b>, Offset = <b>' + po + '</b>');
          var fr = MAP[dir + "," + pg];
          if (fr === undefined) stop = 'Page directory dòng ' + dir + ' → page table → dòng ' + pg + ' ghi <b>X</b>: trang chưa có trong RAM → <b>lỗi trang</b> (xử lý như mục 9, 11).';
          else {
            out.push('<b>⑤ Tra 2 bảng</b>: page directory dòng ' + dir + ' → page table → dòng ' + pg + ' ghi <b>khung ' + fr + '</b>');
            out.push('<b>⑥ Địa chỉ vật lý</b> = ' + fr + ' × 4096 + ' + po + ' = <b>' + (fr * 4096 + po).toLocaleString("vi-VN") + '</b> (' + H(fr * 4096 + po) + ') ✔');
          }
        }
      }
      o.innerHTML = '<ol class="pent-steps">' + out.map(function(x){ return '<li>' + x + '</li>'; }).join("") + (stop ? '<li class="bad">✘ ' + stop + '</li>' : '') + '</ol>';
    }
    el.oninput = run;
    el.onclick = function(e){ var b = e.target.closest("button[data-s]"); if (b){ el.querySelector('[data-f=s]').value = b.dataset.s; el.querySelector('[data-f=o]').value = b.dataset.o; run(); } };
    run();
  },
  /* Mô phỏng TLB: đếm hit / miss, số lần vào RAM và thời gian truy cập trung bình */
  tlb: function(el){
    el.innerHTML = '<div class="demo-h">🧪 Mô phỏng TLB: hit, miss và thời gian truy cập</div><div class="demo-row">' +
      '<label class="w">Chuỗi trang được dùng<input data-f="r" value="1 2 1 3 1 2 4 1 5 1 2 3"></label>' +
      '<label>Số dòng TLB<input type="number" min="1" max="16" data-f="n" value="3"></label>' +
      '<label>Tra TLB (ns)<input type="number" min="0" data-f="t" value="20"></label>' +
      '<label>Vào RAM (ns)<input type="number" min="1" data-f="m" value="100"></label></div><div class="demo-out"></div>';
    function run(){
      var refs = numList(el.querySelector('[data-f=r]').value), N = Math.max(1, Math.min(16, +el.querySelector('[data-f=n]').value || 1));
      var T = Math.max(0, +el.querySelector('[data-f=t]').value || 0), M = Math.max(1, +el.querySelector('[data-f=m]').value || 1), o = el.querySelector(".demo-out");
      if (!refs.length){ o.innerHTML = 'Nhập chuỗi các số trang, cách nhau bằng dấu cách.'; return; }
      var tlb = [], hits = 0, ram = 0, rows = "";
      refs.forEach(function(p, i){
        var k = tlb.indexOf(p), hit = k >= 0, note;
        if (hit){ hits++; tlb.splice(k, 1); tlb.push(p); note = 'có sẵn trong TLB'; }
        else {
          note = 'tra bảng trang trong RAM';
          if (tlb.length >= N){ note += ', bỏ trang ' + tlb[0] + ' khỏi TLB'; tlb.shift(); }
          tlb.push(p);
        }
        ram += hit ? 1 : 2;
        rows += '<tr><td>' + (i + 1) + '</td><td><b>' + p + '</b></td><td class="' + (hit ? 'ok-t' : 'bad-t') + '">' + (hit ? '✔ hit' : '✘ miss') + '</td><td>' + note + '</td><td>' + tlb.join(", ") + '</td><td>' + (hit ? 1 : 2) + '</td></tr>';
      });
      function vn(x){ return String(x).replace(".", ","); }
      var n = refs.length, h = hits / n, avg = h * (T + M) + (1 - h) * (T + 2 * M);
      o.innerHTML = '<div class="tbl-wrap"><table class="demo-t"><tr><th>Bước</th><th>Trang</th><th>Kết quả</th><th>Việc phải làm</th><th>TLB sau bước</th><th>Số lần vào RAM</th></tr>' + rows + '</table></div>' +
        '<p style="margin:8px 0 4px">Hit <b>' + hits + '/' + n + '</b> = <b>' + Math.round(h * 100) + '%</b> · Vào RAM <b>' + ram + '</b> lần (không có TLB: ' + (2 * n) + ' lần).</p>' +
        '<div class="formula">Thời gian trung bình = h × (TLB + RAM) + (1 − h) × (TLB + 2 × RAM) = ' + vn(h.toFixed(2)) + ' × ' + (T + M) + ' + ' + vn((1 - h).toFixed(2)) + ' × ' + (T + 2 * M) + ' ≈ <b>' + vn(Math.round(avg * 10) / 10) + ' ns</b> (không có TLB: ' + (2 * M) + ' ns)</div>' +
        '<small class="muted">Khi TLB đầy, mô phỏng bỏ dòng lâu nhất chưa dùng (giả định thường gặp, slide không nêu cách chọn).</small>';
    }
    el.oninput = run; run();
  },
  pagerep: function(el){
    el.innerHTML = '<div class="demo-h">🧪 Mô phỏng thay thế trang (đếm lỗi trang)</div><div class="demo-row">'+
      '<label class="w">Chuỗi tham chiếu<input data-f="r" value="7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1"></label><label>Số khung<input type="number" min="1" max="8" data-f="n" value="3"></label>'+
      '<label>Thuật toán<select data-f="g"><option value="fifo">FIFO</option><option value="lru">LRU</option><option value="opt">Optimal</option><option value="clock">Clock / Second chance</option></select></label>'+
      '<label>Clock: trang mới nạp có<select data-f="rl"><option value="1">R = 1</option><option value="0">R = 0</option></select></label></div><div class="demo-out"></div>';
    function run(){
      var r=numList(el.querySelector('[data-f=r]').value), n=Math.max(1,Math.min(8,+el.querySelector('[data-f=n]').value||3)), g=el.querySelector('[data-f=g]').value;
      var fr=[], last={}, cols=[], faults=0, rb=[], hand=0, r1=el.querySelector('[data-f=rl]').value==="1";
      el.querySelector('[data-f=rl]').parentNode.style.display = g==="clock" ? "" : "none";
      r.forEach(function(p,i){
        var at = fr.indexOf(p), hit = at>=0, victim=null;
        if (hit){ if (g==="clock") rb[at]=1; }
        else {
          faults++;
          if (fr.length<n){ fr.push(p); rb.push(r1?1:0); }
          else {
            var vi=0;
            if (g==="fifo") vi=0;
            else if (g==="lru"){ fr.forEach(function(x,j){ if (last[x]<last[fr[vi]]) vi=j; }); }
            else if (g==="opt"){ var best=-1; fr.forEach(function(x,j){ var nx=r.indexOf(x,i+1); nx = nx<0?1e9:nx; if (nx>best){ best=nx; vi=j; } }); }
            else { while (rb[hand]===1){ rb[hand]=0; hand=(hand+1)%n; } vi=hand; hand=(hand+1)%n; }
            victim=fr[vi];
            if (g==="fifo"){ fr.shift(); fr.push(p); } else { fr[vi]=p; rb[vi]=r1?1:0; }
          }
        }
        last[p]=i;
        cols.push({p:p, fr:fr.slice(), rb:rb.slice(), hand:hand, hit:hit, v:victim});
      });
      var head='<tr><th>Tham chiếu</th>'+cols.map(function(c){ return '<th>'+c.p+'</th>'; }).join("")+'</tr>';
      var rows=''; for (var k=0;k<n;k++) rows+='<tr><th>Khung '+(k+1)+'</th>'+cols.map(function(c){ var v=c.fr[k]; return '<td class="'+(!c.hit && v===c.p?'new':'')+'">'+(v===undefined?'':v+(g==="clock"?'<sup class="muted">'+c.rb[k]+'</sup>':''))+'</td>'; }).join("")+'</tr>';
      if (g==="clock") rows+='<tr><th>Kim ở</th>'+cols.map(function(c){ return '<td class="muted">K'+(c.hand+1)+'</td>'; }).join("")+'</tr>';
      rows+='<tr><th>Lỗi?</th>'+cols.map(function(c){ return '<td>'+(c.hit?'':'<span class="bad-t">F</span>')+'</td>'; }).join("")+'</tr>';
      el.querySelector(".demo-out").innerHTML='<div class="tbl-wrap"><table class="demo-t pr">'+head+rows+'</table></div><div>Tổng số lỗi trang: <b class="bad-t">'+faults+'</b> / '+r.length+' tham chiếu'+(g==="fifo"?' <small class="muted">(FIFO: khung 1 luôn là trang vào sớm nhất)</small>':g==="clock"?' <small class="muted">(số nhỏ cạnh trang = bit R; “Kim ở” = khung kim sẽ xét tiếp)</small>':'')+'</div>';
    }
    el.oninput = run; run();
  }
};
function highlight(nodes, term){
  var re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"), "gi");
  Array.prototype.forEach.call(nodes, function(n){
    var walker = document.createTreeWalker(n, NodeFilter.SHOW_TEXT), list = [];
    while (walker.nextNode()) list.push(walker.currentNode);
    list.forEach(function(t){
      if (!re.test(t.nodeValue)) return; re.lastIndex = 0;
      var span = document.createElement("span"); span.innerHTML = esc(t.nodeValue).replace(new RegExp(esc(term).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"), function(m){ return "<mark>"+m+"</mark>"; });
      t.parentNode.replaceChild(span, t);
    });
  });
}

/* ================= SỰ KIỆN ================= */
function bind(){
  document.addEventListener("click", function(e){
    var t = e.target.closest("button, a"); if (!t) return;
    var d = t.dataset;
    if (d.zoom){
      var sec = t.closest(".sum-sec"), list = [];
      if (sec && !t.classList.contains("st-fig")) Array.prototype.forEach.call(sec.querySelectorAll(".figs .fig-btn"), function(b){ list.push([b.dataset.zoom, b.dataset.cap]); });
      if (!list.length) list = [[d.zoom, d.cap]];
      var idx = 0; list.forEach(function(x,i){ if (x[0]===d.zoom) idx=i; });
      openLightbox(list, idx); return;
    }
    if (d.vtab){
      var art = t.closest(".sum-sec"), pl = art && art.querySelector(".vplayer");
      if (pl && window.VideoPlayer){ art.querySelectorAll(".vtab").forEach(function(x){ x.classList.toggle("on", x===t); }); pl.dataset.video = d.vtab; VideoPlayer.mountOne(pl); }
      return;
    }
    if (t.closest(".demo")) return;
    if (t.classList.contains("tab")){ var v=d.view; if (v==="quiz" && !cur()){ toast("Hãy chọn một bộ câu hỏi trước"); go("home"); return; } if (v==="quiz" && cur().submitted && state.view!=="result" && state.view!=="quiz"){ go("result"); return; } go(v); return; }
    if (d.viewGo){ go(d.viewGo); return; }
    if (d.start){ startSet(d.start); return; }
    if (d.reset){ resetSet(d.reset); renderHome(); return; }
    if (d.clearstats){ if (confirm("Xóa toàn bộ thống kê đúng/sai?")){ state.stats = {}; save(); renderHome(); } return; }
    if (d.resetCur){ var s0=cur(); if (!s0) return; if (confirm("Làm lại toàn bộ \""+s0.name+"\"?")){ resetSet(s0.key, true); go("quiz"); } return; }
    if (d.sum){ state.sumCh = +d.sum; sumQuery=""; go("summary"); if (d.sec){ var se = document.getElementById(d.sec); if (se) setTimeout(function(){ se.scrollIntoView({block:"start"}); }, 60); } return; }
    if (d.sumch){ state.sumCh = +d.sumch; sumQuery=""; save(); renderSummary(); window.scrollTo({top:0}); return; }
    if (d.toc){ e.preventDefault(); var el=document.getElementById(d.toc); if (el){
      setTocOn(d.toc); tocLock = Date.now() + 900;
      el.scrollIntoView({behavior:"smooth"});
      el.classList.remove("sec-flash"); void el.offsetWidth; el.classList.add("sec-flash");
      setTimeout(function(){ el.classList.remove("sec-flash"); }, 1600);
    } return; }
    if (t.id==="goExam"){ $("#examSetup").scrollIntoView({behavior:"smooth"}); return; }
    if (t.id==="mkExam"){ makeExam(); return; }
    var s = cur(); if (!s) return;
    if (d.opt!==undefined){ selectOpt(+d.opt); return; }
    if (d.jump!==undefined){ jump(+d.jump); return; }
    if (d.filter){ s.filter = d.filter; var v2 = visibleIdx(s); if (v2.length && v2.indexOf(s.cur)<0) s.cur = v2[0]; save(); renderQuiz(); return; }
    switch (t.id){
      case "prevBtn": case "nextBtn": jump(d.i==="undefined"?undefined:+d.i); return;
      case "checkBtn": checkMulti(); return;
      case "redoBtn": delete s.ans[s.ids[s.cur]]; save(); renderQuiz(); return;
      case "flagBtn": var fid=s.ids[s.cur]; if (s.flags[fid]) delete s.flags[fid]; else s.flags[fid]=true; save(); renderQuiz(); return;
      case "instBtn": s.instant = !s.instant; if (!s.instant) Object.keys(s.ans).forEach(function(k){ s.ans[k].done=false; }); else Object.keys(s.ans).forEach(function(k){ if (BYID[k].type!=="multi") s.ans[k].done=true; }); save(); renderQuiz(); toast("Chấm ngay: "+(s.instant?"BẬT":"TẮT")); return;
      case "shufQ": var curId=s.ids[s.cur]; s.ids = shuffle(s.ids); s.cur = 0; save(); renderQuiz(); toast("Đã đảo thứ tự câu hỏi"); return;
      case "shufO": s.opt = makeOptOrder(s.ids); save(); renderQuiz(); toast("Đã đảo thứ tự đáp án"); return;
      case "submitBtn": doSubmit(false); return;
      case "toResult": go("result"); return;
      case "reviewBtn": s.filter="all"; s.cur=0; save(); go("quiz"); return;
      case "wrongBtn": practiceWrong(); return;
    }
  });
  document.addEventListener("input", function(e){
    if (e.target.id==="sumSearch"){ sumQuery = e.target.value; var pos = e.target.selectionStart; renderSummary(); var i=$("#sumSearch"); i.focus(); i.setSelectionRange(pos,pos); }
  });
  document.addEventListener("keydown", function(e){
    if (state.view!=="quiz" || e.ctrlKey || e.metaKey || e.altKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
    var s = cur(); if (!s) return; var id = s.ids[s.cur], q = BYID[id]; if (!q) return;
    var k = e.key.toLowerCase(), perm = s.opt[id] || range(q.opts.length), idx = -1;
    if (/^[1-9]$/.test(k)) idx = +k - 1; else if (/^[a-e]$/.test(k)) idx = LETTERS.toLowerCase().indexOf(k);
    if (idx>=0 && idx<perm.length){ e.preventDefault(); selectOpt(perm[idx]); return; }
    if (k==="f"){ e.preventDefault(); $("#flagBtn") && $("#flagBtn").click(); return; }
    if (k==="arrowright"){ e.preventDefault(); var n=$("#nextBtn"); if (n && !n.disabled) n.click(); return; }
    if (k==="arrowleft"){ e.preventDefault(); var p=$("#prevBtn"); if (p && !p.disabled) p.click(); return; }
    if (k==="enter"){ e.preventDefault(); var cb=$("#checkBtn"); if (cb && !cb.disabled) cb.click(); else { var nb=$("#nextBtn"); if (nb && !nb.disabled) nb.click(); } }
  });
  $("#themeBtn").addEventListener("click", function(){
    var r = document.documentElement, next = r.dataset.theme==="light" ? "dark" : "light";
    r.dataset.theme = next; try { localStorage.setItem("nlhdh_theme", next); } catch(e){}
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = next==="light" ? "#ffffff" : "#0f1523";
  });
  $("#logoutBtn").addEventListener("click", function(){ if (confirm("Khóa trang? Lần sau cần nhập lại mật khẩu.")) window.QuizLock.lock(); });
}

var started = false;
window.App = { start: function(){
  if (started) return; started = true;
  load(); bind();
  var v = state.view || "home";
  if ((v==="quiz"||v==="result") && !cur()) v = "home";
  if (v==="result" && !cur().submitted) v = "quiz";
  go(v);
}};
})();
