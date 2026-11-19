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

/* ---------- Giọng đọc ---------- */
var viVoice = null;
function pickVoice(){
  if (!("speechSynthesis" in window)) return;
  var vs = speechSynthesis.getVoices() || [];
  viVoice = vs.filter(function(v){ return /^vi/i.test(v.lang); })[0] || null;
  document.querySelectorAll(".vplayer").forEach(function(el){ if (el._p) el._p.refreshVoice(); });
}
if ("speechSynthesis" in window){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function plain(h){ var d = document.createElement("div"); d.innerHTML = h; return d.textContent.replace(/\s+/g, " ").trim(); }

/* ---------- Trình phát ---------- */
var players = [], current = null;
function fmt(ms){ var s = Math.round(ms / 1000); return Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); }
function sceneDur(sc, speed){ return (sc.t || Math.max(2600, Math.min(11000, plain(sc.s || "").length * 62))) / speed; }

function Player(el, def){
  var self = this, scenes = def.scenes, n = scenes.length, i = 0, playing = false, timer = null, fallback = null, speed = 1, voiceOn = true, started = false;
  var total = scenes.reduce(function(a, s){ return a + sceneDur(s, 1); }, 0);
  el.innerHTML =
    '<div class="v-stage"><svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid meet"><defs>' +
      Object.keys(C).map(function(k){ return '<marker id="vm-' + k + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="' + C[k][1] + '"/></marker>'; }).join("") +
    '</defs><g class="v-layer"></g></svg>' +
    '<div class="v-cover"><div class="v-badge">🎬 VIDEO HOẠT HÌNH</div><div class="v-ctitle">' + def.title + '</div><button class="v-big" aria-label="Phát">▶</button><div class="v-cmeta">' + n + ' cảnh · khoảng ' + fmt(total) + '</div></div>' +
    '<div class="v-end" hidden><button class="v-big v-replay" aria-label="Xem lại">↻</button><div class="v-cmeta">Xem lại từ đầu</div></div></div>' +
    '<div class="v-sub"></div>' +
    '<div class="v-ctl"><button class="v-btn v-play" title="Phát / Tạm dừng (Space)">▶</button><button class="v-btn v-prev" title="Cảnh trước">⏮</button><button class="v-btn v-next" title="Cảnh sau">⏭</button>' +
    '<div class="v-prog">' + scenes.map(function(_, j){ return '<button class="v-seg" data-j="' + j + '" title="Cảnh ' + (j + 1) + '"><i></i></button>'; }).join("") + '</div>' +
    '<span class="v-count">1/' + n + '</span><button class="v-btn v-speed" title="Tốc độ">1×</button><button class="v-btn v-voice" title="Thuyết minh bằng giọng đọc">🔊</button><button class="v-btn v-full" title="Toàn màn hình">⛶</button></div>';
  var layer = el.querySelector(".v-layer"), sub = el.querySelector(".v-sub"), cover = el.querySelector(".v-cover"), end = el.querySelector(".v-end");
  var bPlay = el.querySelector(".v-play"), bVoice = el.querySelector(".v-voice"), bSpeed = el.querySelector(".v-speed"), cnt = el.querySelector(".v-count"), segs = el.querySelectorAll(".v-seg");
  var live = {};

  function render(k){
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
        var p0 = Object.assign({}, it.p); var o = p0.o; p0.o = 0; update(g, it.type, p0);
        g.getBoundingClientRect();
        (function(g, it){ requestAnimationFrame(function(){ update(g, it.type, it.p); }); })(g, it);
      } else update(L.g, it.type, it.p);
    });
    S.flashes.forEach(function(id){ var L = live[id]; if (!L) return; L.g.classList.remove("vflash"); L.g.getBoundingClientRect(); L.g.classList.add("vflash"); });
    sub.innerHTML = '<span class="v-scn">' + (k + 1) + '/' + n + '</span>' + (scenes[k].s || "");
    cnt.textContent = (k + 1) + "/" + n;
    segs.forEach(function(s, j){ s.classList.toggle("done", j < k); s.classList.toggle("on", j === k); s.querySelector("i").style.animation = "none"; });
  }
  function clearT(){ clearTimeout(timer); clearTimeout(fallback); timer = fallback = null; if (current === self && "speechSynthesis" in window) speechSynthesis.cancel(); }
  function schedule(){
    clearT();
    var d = sceneDur(scenes[i], speed), seg = segs[i].querySelector("i");
    function go(){ clearT(); if (!playing) return; if (i < n - 1){ i++; render(i); schedule(); } else finish(); }
    if (voiceOn && viVoice){
      var u = new SpeechSynthesisUtterance(plain(scenes[i].s || "")); u.voice = viVoice; u.lang = viVoice.lang; u.rate = Math.min(2, 1.05 * speed);
      var done = false; u.onend = function(){ if (done) return; done = true; timer = setTimeout(go, 450); };
      speechSynthesis.cancel(); speechSynthesis.speak(u);
      var fb = plain(scenes[i].s || "").length * 110 / speed + 4000;
      fallback = setTimeout(function(){ if (!done){ done = true; go(); } }, fb);
      seg.style.animation = "vfill " + (fb / 1000 * 0.55) + "s linear forwards";
    } else {
      timer = setTimeout(go, d);
      seg.style.animation = "vfill " + d / 1000 + "s linear forwards";
    }
  }
  function finish(){ playing = false; bPlay.textContent = "▶"; end.hidden = false; segs.forEach(function(s){ s.classList.add("done"); }); }
  function play(){
    if (current && current !== self) current.pause();
    current = self; cover.hidden = true; end.hidden = true;
    if (!started){ started = true; i = 0; render(0); }
    playing = true; bPlay.textContent = "❚❚"; schedule();
  }
  this.pause = function(){ playing = false; clearT(); bPlay.textContent = "▶"; segs.forEach(function(s){ s.querySelector("i").style.animation = "none"; }); };
  this.destroy = function(){ this.pause(); };
  this.show = function(k){ jump(k); };
  this.count = n;
  this.refreshVoice = function(){ bVoice.disabled = !viVoice; bVoice.title = viVoice ? "Thuyết minh: " + viVoice.name : "Máy/trình duyệt này chưa có giọng đọc tiếng Việt – video vẫn chạy kèm phụ đề"; bVoice.textContent = (viVoice && voiceOn) ? "🔊" : "🔇"; };
  function jump(k){ started = true; cover.hidden = true; end.hidden = true; i = Math.max(0, Math.min(n - 1, k)); render(i); if (playing) schedule(); }
  el.onclick = function(e){
    var b = e.target.closest("button"); if (!b) return;
    if (b.classList.contains("v-big") || b.classList.contains("v-play")){
      if (b.classList.contains("v-replay")){ started = false; }
      if (playing) self.pause(); else play();
    }
    else if (b.classList.contains("v-prev")) jump(i - 1);
    else if (b.classList.contains("v-next")) jump(i + 1);
    else if (b.classList.contains("v-seg")) jump(+b.dataset.j);
    else if (b.classList.contains("v-speed")){ var sp = [0.75, 1, 1.25, 1.5]; speed = sp[(sp.indexOf(speed) + 1) % sp.length]; b.textContent = speed + "×"; if (playing) schedule(); }
    else if (b.classList.contains("v-voice")){ voiceOn = !voiceOn; self.refreshVoice(); if (playing) schedule(); }
    else if (b.classList.contains("v-full")){ var fs = document.fullscreenElement; if (fs) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen(); }
  };
  el.onkeydown = function(e){ if (e.key === " "){ e.preventDefault(); if (playing) self.pause(); else play(); } };
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
  has: function(id){ return !!(window.VIDEOS && window.VIDEOS[id]); }
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
