/* Các đề ôn tập hiển thị trên trang.
   Câu hỏi nằm trong ontap1.js, ontap2.js, ontap3.js, ontap4.js (mã câu giữ nguyên để không mất tiến độ đã làm);
   file này chỉ gom lại thành đề theo chương:
   - Ôn tập chương 2: tiến trình, luồng, lập lịch CPU và đồng bộ tiến trình (đúng nội dung slide Chương 2).
   - Ôn tập chương 4 / 5 / 6: mọi câu của chương đó.
   Đã lược câu trùng (QDROP). Câu không thuộc chương 2, 4, 5, 6 (chương 1 tổng quan / system call, chương 3
   deadlock, bảo mật, thực hành Linux/Windows…) không nằm trong đề nào. */
window.QSETS = [];
(function(){
var Q = window.QUESTIONS || [], DROP = window.QDROP || {}, BY = {};
Q.forEach(function(q){ BY[q.id] = q; });

/* Câu đồng bộ (thuộc Chương 2): mã câu → chủ đề nhỏ (dùng để chia tag) */
var SYNC = {
  "ot1-20":"Sleep & Wakeup",            "ot1-22":"TSL",
  "ot2-24":"Luân phiên (biến turn)",
  "ot3-042":"Semaphore",                "ot3-046":"Peterson",
  "ot3-072":"Miền găng",                "ot3-073":"Semaphore",
  "ot3-074":"Semaphore",                "ot3-075":"Bài toán kinh điển",
  "ot3-084":"Khái niệm",                "ot3-103":"Miền găng",
  "ot3-107":"Giao tiếp tiến trình",     "ot3-108":"Khái niệm",
  "ot3-109":"Miền găng",                "ot3-110":"Miền găng",
  "ot3-111":"Miền găng",                "ot3-112":"Miền găng",
  "ot3-113":"Miền găng",                "ot3-114":"Miền găng",
  "ot3-115":"Miền găng",                "ot3-116":"TSL",
  "ot3-117":"Semaphore",                "ot3-119":"Miền găng",
  "ot3-120":"Chờ bận (busy waiting)",   "ot3-121":"Semaphore",
  "ot3-123":"Peterson",                 "ot3-136":"Giao tiếp tiến trình",
  "ot3-137":"Giao tiếp tiến trình",     "ot3-149":"Khái niệm",
  "ot3-166":"Khái niệm",                "ot3-170":"Cấm ngắt",
  "ot3-176":"Miền găng (loại trừ lẫn nhau)", "ot3-177":"Khái niệm",
  "ot3-180":"Chờ bận (busy waiting)"
};
/* mục trong Tổng hợp Chương 2 để ôn lại */
function syncSec(t){ return /Luân phiên|Peterson|TSL|Cấm ngắt|Chờ bận/.test(t) ? "s2-10" : /Sleep|Semaphore|Bài toán/.test(t) ? "s2-11" : "s2-9"; }
Object.keys(SYNC).forEach(function(id){ var q = BY[id]; if (!q) return; q.ch = 2; q.topic = "Đồng bộ · " + SYNC[id]; q.sec = syncSec(SYNC[id]); });

/* Các câu "Chương 2 · …" (tiến trình, luồng, lập lịch) trong đề cũ: chuyển sang chương 2 */
Q.forEach(function(q){
  if (!q.set || q.ch !== 0 || !/^Chương 2 · /.test(q.topic)) return;
  q.ch = 2; q.topic = q.topic.replace(/^Chương 2 · /, "");
  q.sec = /Lập lịch/.test(q.topic) ? "s2-7" : /Luồng/.test(q.topic) ? "s2-4" : /fork/.test(q.topic) ? "s2-2" : /Giao tiếp/.test(q.topic) ? "s2-9" : "s2-3";
});

var pool = Q.filter(function(q){ return /^ot[1-5]$/.test(q.set) && !DROP[q.id]; });
function chapter(c){ return pool.filter(function(q){ return q.ch === c; }).map(function(q){ return q.id; }); }

var NOTE = "Gộp từ mọi đề và tài liệu ôn tập (đề thi trắc nghiệm, Google Form \"NLHĐH - Cuối kì\", tài liệu tổng hợp, đề K23, DaCoDA…), đã lược câu trùng.";
window.QSETS.push(
  {key:"otc2", name:"Ôn tập chương 2", badge:"Ch2", note:"Tiến trình, luồng, lập lịch CPU và đồng bộ tiến trình. " + NOTE, ids:chapter(2)},
  {key:"otc4", name:"Ôn tập chương 4", badge:"Ch4", note:"Quản lý bộ nhớ. " + NOTE, ids:chapter(4)},
  {key:"otc5", name:"Ôn tập chương 5", badge:"Ch5", note:"Vào/Ra. " + NOTE, ids:chapter(5)},
  {key:"otc6", name:"Ôn tập chương 6", badge:"Ch6", note:"Hệ thống file. " + NOTE, ids:chapter(6)}
);
})();
