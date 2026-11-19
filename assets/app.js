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
var state = { sessions:{}, active:null, view:"home", sumCh:4 };
function load(){ try { var s = JSON.parse(localStorage.getItem(LS)); if (s && s.sessions) state = Object.assign(state, s); } catch(e){}
  // bỏ các câu không còn tồn tại
  Object.keys(state.sessions).forEach(function(k){ var s=state.sessions[k]; s.ids = s.ids.filter(function(id){ return BYID[id]; }); if (!s.ids.length) delete state.sessions[k]; });
  // bổ sung câu hỏi mới vào các bộ theo chương đã lưu từ trước
  ["c4","c5","c6","all"].forEach(function(k){
    var s = state.sessions[k]; if (!s) return;
    var have = {}; s.ids.forEach(function(id){ have[id]=1; });
    idsOfChapter(k==="all" ? "all" : +k.slice(1)).forEach(function(id){
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
function idsOfChapter(ch){ return QS.filter(function(q){ return ch==="all" || q.ch===ch; }).map(function(q){ return q.id; }); }

function isCorrect(q, sel){ return !!sel && sel.length>0 && sameSet(sel, q.ans); }
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
    '<div class="set-head"><div class="set-num '+o.cls+'">'+o.badge+'</div><div><h3>'+esc(o.title)+'</h3><small>'+total+' câu · '+types.single+' một đáp án · '+types.multi+' nhiều đáp án · '+types.order+' sắp xếp</small></div></div>'+
    '<div class="meter"><i class="g" style="width:'+gw+'%"></i><i class="r" style="width:'+rw+'%"></i></div>'+
    '<div class="set-meta"><span>Đã làm <b>'+c.answered+'/'+total+'</b></span><span>Đúng <b class="g">'+c.g+'</b></span><span>Sai <b class="r">'+c.r+'</b></span>'+(s&&s.submitted?'<span>· Đã nộp</span>':'')+'</div>'+
    '<div class="set-actions">'+
      '<button class="btn primary" data-start="'+o.key+'">'+ICON.play+(started?'Làm tiếp (Câu '+(s.cur+1)+')':(s&&s.submitted?'Xem lại bài':'Vào làm bài'))+'</button>'+
      (s?'<button class="btn danger" data-reset="'+o.key+'" title="Làm lại từ đầu">'+ICON.reset+'</button>':'')+
      (o.ch!=="all"?'<button class="btn" data-sum="'+o.ch+'" title="Xem tổng hợp kiến thức">'+ICON.book+'</button>':'')+
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
  '<div class="stats"><div class="stat"><b>'+QS.length+'</b><span>câu hỏi</span></div><div class="stat"><b>3</b><span>chương</span></div><div class="stat"><b>'+(allGraded?Math.round(allG/allGraded*100)+'%':'—')+'</b><span>tỉ lệ đúng</span></div></div></div>'+
  '<div class="section-h">Bộ câu hỏi theo chương</div><div class="sets">'+sets.map(setCard).join("")+'</div>'+
  '<div class="section-h" id="examSetup">Tạo đề thi thử ngẫu nhiên</div>'+
  '<div class="panel"><div class="exam-grid">'+
   '<div><span class="lbl">Chương</span><div class="chk-row">'+CHAPS.map(function(c){ return '<label class="chk"><input type="checkbox" name="exch" value="'+c.ch+'" checked> Chương '+c.ch+'</label>'; }).join("")+'</div></div>'+
   '<div><span class="lbl">Số câu</span><select class="sel" id="exN"><option>20</option><option selected>30</option><option>40</option><option>50</option><option value="0">Tất cả</option></select></div>'+
   '<div><span class="lbl">Thời gian</span><select class="sel" id="exT"><option value="0">Không giới hạn</option><option value="15">15 phút</option><option value="30">30 phút</option><option value="45" selected>45 phút</option><option value="60">60 phút</option><option value="90">90 phút</option></select></div>'+
   '<div><button class="btn primary block" id="mkExam">'+ICON.shuffle+'Tạo đề & bắt đầu</button></div>'+
  '</div><div class="legend"><span>• Câu hỏi và đáp án được xáo trộn ngẫu nhiên</span><span>• Không hiện đúng/sai cho đến khi nộp bài</span><span>• Hết giờ sẽ tự động nộp</span></div></div>';
}
function startSet(key){
  if (key==="exam"){ if (state.sessions.exam){ state.active="exam"; save(); go(state.sessions.exam.submitted?"result":"quiz"); } return; }
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
  var ids = s.mode==="exam" ? shuffle(s.ids) : (key==="wrong" ? s.ids : idsOfChapter(key==="all"?"all":+key.slice(1)));
  var n = newSession(key, s.name, ids, s.mode, {duration:s.duration, chapters:s.chapters});
  n.instant = keepInstant; save();
}
function makeExam(){
  var chs = Array.prototype.map.call(document.querySelectorAll('input[name="exch"]:checked'), function(i){ return +i.value; });
  if (!chs.length){ toast("Hãy chọn ít nhất 1 chương"); return; }
  var pool = QS.filter(function(q){ return chs.indexOf(q.ch)>=0; }).map(function(q){ return q.id; });
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
      fb = '<div class="feedback '+(st==="g"?"ok":st==="r"?"bad":"na")+'"><h4>'+head+'</h4><div class="ansline">Đáp án đúng: '+letters+'</div><p>'+esc(q.exp)+'</p>'+
           '<div class="more"><button class="btn sm ghost" data-sum="'+q.ch+'" data-topic="'+esc(q.topic)+'">'+ICON.book+'Ôn lý thuyết Chương '+q.ch+'</button></div></div>';
    }
    var prevI = pos>0 ? vis[pos-1] : (pos<0 ? vis.filter(function(i){return i<s.cur;}).pop() : undefined);
    var nextI = pos>=0 ? vis[pos+1] : vis.filter(function(i){return i>s.cur;})[0];
    var checkBtn = (!isG && !exam && s.instant && q.type==="multi") ? '<button class="btn ok" id="checkBtn" '+(sel.length?'':'disabled')+'>'+ICON.check+'Kiểm tra</button>' : '';
    var redoBtn = (isG && !s.submitted) ? '<button class="btn" id="redoBtn">'+ICON.reset+'Làm lại câu</button>' : '';
    card = '<div class="qcard"><div class="qhead"><span class="badge no">Câu '+(s.cur+1)+'</span><span class="badge '+q.type+'">'+TYPE_LABEL[q.type]+'</span><span class="badge">Chương '+q.ch+'</span><span class="badge">'+esc(q.topic)+'</span>'+
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
    if (s.instant && s.mode==="practice") a.done = true;
  }
  if (!a.sel.length) delete s.ans[id];
  save(); renderQuiz();
}
function checkMulti(){
  var s = cur(), id = s.ids[s.cur], a = s.ans[id];
  if (!a || !a.sel.length){ toast("Hãy chọn ít nhất một đáp án"); return; }
  a.done = true; save(); renderQuiz();
}
function jump(i){ var s=cur(); if (i===undefined||i===null||isNaN(i)) return; s.cur = +i; save(); renderQuiz(); var qc=$(".qcard"); if (qc && window.innerWidth<1024) qc.scrollIntoView({block:"start"}); }
function doSubmit(force){
  var s = cur(); if (!s || s.submitted) return;
  var c = counts(s), left = s.ids.length - c.answered;
  if (!force && !confirm(left>0 ? "Còn "+left+" câu chưa trả lời. Bạn vẫn muốn nộp bài?" : "Nộp bài và xem kết quả?")) return;
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
    return '<div class="row"><b>Chương '+ch+'</b><div class="meter"><i class="g" style="width:'+p+'%"></i></div><span>'+b.g+'/'+b.t+'</span></div>'; }).join("");
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
  var secs = c.sections.filter(function(sec){ return !qf || fold(sec.title + " " + sec.html.replace(/<[^>]+>/g," ")).indexOf(qf)>=0; });
  var root = $("#view-summary");
  root.innerHTML = '<div class="sum-layout"><div class="sum-nav">'+
    '<div class="chap-tabs">'+data.map(function(d){ return '<button class="chap-tab '+(d.ch===c.ch?'active':'')+'" data-sumch="'+d.ch+'">Chương '+d.ch+'</button>'; }).join("")+'</div>'+
    '<input class="search" id="sumSearch" placeholder="Tìm trong chương… (vd: TLB, RAID)" value="'+esc(sumQuery)+'">'+
    '<nav class="toc">'+secs.map(function(sec){ return '<a href="#'+sec.id+'" data-toc="'+sec.id+'">'+esc(sec.title)+'</a>'; }).join("")+'</nav></div>'+
    '<div><div class="sum-head"><div class="kicker">Chương '+c.ch+' · '+esc(c.en)+'</div><h2>'+esc(c.title)+'</h2><p>'+c.intro+'</p></div>'+
    (secs.length ? secs.map(renderSec).join("") : '<div class="panel empty">Không tìm thấy nội dung phù hợp “'+esc(sumQuery)+'”.</div>')+
    '<div class="sum-cta"><button class="btn primary" data-start="c'+c.ch+'">'+ICON.play+'Luyện câu hỏi Chương '+c.ch+'</button>'+
    (c.ch<6?'<button class="btn" data-sumch="'+(c.ch+1)+'">Chương '+(c.ch+1)+ICON.right+'</button>':'')+'</div></div></div>';
  if (sumQuery.trim()) highlight(root.querySelectorAll(".sum-body"), sumQuery.trim());
  mountDemos(root);
}
function slideSrc(code){ return "assets/slides/"+code+".jpg"; }
function renderSec(sec){
  var figs = (sec.figs||[]).map(function(f){
    return '<figure class="fig"><button class="fig-btn" data-zoom="'+f[0]+'" data-cap="'+esc(f[1])+'"><img loading="lazy" src="'+slideSrc(f[0])+'" alt="'+esc(f[1])+'"></button><figcaption>'+esc(f[1])+'</figcaption></figure>';
  }).join("");
  var yt = sec.yt ? '<a class="btn sm ghost yt" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query='+encodeURIComponent(sec.yt)+'">▶ Tìm video giảng giải trên YouTube</a>' : '';
  return '<article class="sum-sec" id="'+sec.id+'"><div class="sec-head"><h3>'+esc(sec.title)+'</h3>'+yt+'</div>'+
    (figs ? '<div class="figs">'+figs+'</div>' : '')+'<div class="sum-body">'+sec.html+'</div></article>';
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
  pagerep: function(el){
    el.innerHTML = '<div class="demo-h">🧪 Mô phỏng thay thế trang (đếm lỗi trang)</div><div class="demo-row">'+
      '<label class="w">Chuỗi tham chiếu<input data-f="r" value="7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1"></label><label>Số khung<input type="number" min="1" max="8" data-f="n" value="3"></label>'+
      '<label>Thuật toán<select data-f="g"><option value="fifo">FIFO</option><option value="lru">LRU</option><option value="opt">Optimal</option></select></label></div><div class="demo-out"></div>';
    function run(){
      var r=numList(el.querySelector('[data-f=r]').value), n=Math.max(1,Math.min(8,+el.querySelector('[data-f=n]').value||3)), g=el.querySelector('[data-f=g]').value;
      var fr=[], last={}, cols=[], faults=0;
      r.forEach(function(p,i){
        var hit = fr.indexOf(p)>=0, victim=null;
        if (!hit){
          faults++;
          if (fr.length<n) fr.push(p);
          else {
            var vi=0;
            if (g==="fifo") vi=0;
            else if (g==="lru"){ fr.forEach(function(x,j){ if (last[x]<last[fr[vi]]) vi=j; }); }
            else { var best=-1; fr.forEach(function(x,j){ var nx=r.indexOf(x,i+1); nx = nx<0?1e9:nx; if (nx>best){ best=nx; vi=j; } }); }
            victim=fr[vi];
            if (g==="fifo"){ fr.shift(); fr.push(p); } else fr[vi]=p;
          }
        }
        last[p]=i;
        cols.push({p:p, fr:fr.slice(), hit:hit, v:victim});
      });
      var head='<tr><th>Tham chiếu</th>'+cols.map(function(c){ return '<th>'+c.p+'</th>'; }).join("")+'</tr>';
      var rows=''; for (var k=0;k<n;k++) rows+='<tr><th>Khung '+(k+1)+'</th>'+cols.map(function(c){ var v=c.fr[k]; return '<td class="'+(!c.hit && v===c.p?'new':'')+'">'+(v===undefined?'':v)+'</td>'; }).join("")+'</tr>';
      rows+='<tr><th>Lỗi?</th>'+cols.map(function(c){ return '<td>'+(c.hit?'':'<span class="bad-t">F</span>')+'</td>'; }).join("")+'</tr>';
      el.querySelector(".demo-out").innerHTML='<div class="tbl-wrap"><table class="demo-t pr">'+head+rows+'</table></div><div>Tổng số lỗi trang: <b class="bad-t">'+faults+'</b> / '+r.length+' tham chiếu'+(g==="fifo"?' <small class="muted">(FIFO: khung 1 luôn là trang vào sớm nhất)</small>':'')+'</div>';
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
    if (t.closest(".demo")) return;
    if (t.classList.contains("tab")){ var v=d.view; if (v==="quiz" && !cur()){ toast("Hãy chọn một bộ câu hỏi trước"); go("home"); return; } if (v==="quiz" && cur().submitted && state.view!=="result" && state.view!=="quiz"){ go("result"); return; } go(v); return; }
    if (d.viewGo){ go(d.viewGo); return; }
    if (d.start){ startSet(d.start); return; }
    if (d.reset){ resetSet(d.reset); renderHome(); return; }
    if (d.resetCur){ var s0=cur(); if (!s0) return; if (confirm("Làm lại toàn bộ \""+s0.name+"\"?")){ resetSet(s0.key, true); go("quiz"); } return; }
    if (d.sum){ state.sumCh = +d.sum; sumQuery=""; go("summary"); return; }
    if (d.sumch){ state.sumCh = +d.sumch; sumQuery=""; save(); renderSummary(); window.scrollTo({top:0}); return; }
    if (d.toc){ e.preventDefault(); var el=document.getElementById(d.toc); if (el) el.scrollIntoView({behavior:"smooth"}); return; }
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
