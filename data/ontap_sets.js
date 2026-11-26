/* Các đề ôn tập hiển thị trên trang (thay cho Ôn tập 1–4 cũ).
   Câu hỏi vẫn nằm trong ontap1.js, ontap2.js, ontap3.js (mã câu giữ nguyên để không mất tiến độ đã làm);
   file này chỉ gom lại thành đề:
   - Ôn tập chương 4 / 5 / 6: mọi câu của chương đó trong các đề cũ (đã lược câu trùng theo QDROP).
   - Ôn tập đồng bộ: chỉ các câu thuộc phần đồng bộ tiến trình trong slide Chương 2 (slide 57–92:
     tiến trình tương tác, tranh đua, miền găng, giải pháp chờ bận, Sleep & Wakeup, Semaphore, Monitor,
     Message passing, bài toán kinh điển).
   Câu ngoài chương 4–6 không thuộc phần đồng bộ (system call, lập lịch CPU, luồng, deadlock, bảo mật,
   thực hành Linux/Windows…) không còn nằm trong đề nào. */
window.QSETS = [];
(function(){
var Q = window.QUESTIONS || [], DROP = window.QDROP || {}, BY = {};
Q.forEach(function(q){ BY[q.id] = q; });
var pool = Q.filter(function(q){ return /^ot[1-4]$/.test(q.set) && !DROP[q.id]; });
function chapter(c){ return pool.filter(function(q){ return q.ch === c; }).map(function(q){ return q.id; }); }

/* Câu đồng bộ: mã câu → chủ đề nhỏ (dùng để chia tag) */
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
var sync = Object.keys(SYNC).filter(function(id){ return BY[id] && !DROP[id]; });
/* mục trong Tổng hợp Chương 2 để ôn lại: s2-9 miền găng, s2-10 chờ bận, s2-11 Sleep & Wakeup / Semaphore / Monitor */
function secOf(t){ return /Luân phiên|Peterson|TSL|Cấm ngắt|Chờ bận/.test(t) ? "s2-10" : /Sleep|Semaphore|Bài toán/.test(t) ? "s2-11" : "s2-9"; }
sync.forEach(function(id){ BY[id].topic = "Đồng bộ · " + SYNC[id]; BY[id].sec = secOf(SYNC[id]); });

var NOTE = "Gộp từ các đề ôn tập cũ (đề thi trắc nghiệm, Google Form \"NLHĐH - Cuối kì\", tài liệu tổng hợp), đã lược câu trùng.";
window.QSETS.push(
  {key:"otc4", name:"Ôn tập chương 4", badge:"Ch4", note:"Quản lý bộ nhớ. " + NOTE, ids:chapter(4)},
  {key:"otc5", name:"Ôn tập chương 5", badge:"Ch5", note:"Vào/Ra. " + NOTE, ids:chapter(5)},
  {key:"otc6", name:"Ôn tập chương 6", badge:"Ch6", note:"Hệ thống file. " + NOTE, ids:chapter(6)},
  {key:"otdb", name:"Ôn tập đồng bộ", badge:"ĐB",
   note:"Đồng bộ tiến trình theo slide Chương 2 (slide 57–92): miền găng, giải pháp chờ bận, Sleep & Wakeup, Semaphore, Monitor, IPC.",
   ids:sync}
);
})();
