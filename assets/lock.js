/* Khóa trang bằng mật khẩu.
   Mật khẩu KHÔNG lưu dạng chữ: chỉ lưu mã băm SHA-256 lặp 20.000 lần có muối (salt).
   Lưu ý: đây là cổng chặn truy cập thông thường trên web tĩnh, không phải mã hóa dữ liệu. */
(function(){
  var SALT = "1b4855874e97cc470d52284aaca4695d";
  var ROUNDS = 20000;
  var HASH = "d7fc5bdad78e9b7353e6ff3290d44efee165b865948da977ca7cc0a5a773d048";
  var KEY = "nlhdh_unlock_v1";

  // SHA-256 thuần JS (đồng bộ, chạy được cả khi mở file trực tiếp)
  var K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  function sha256hex(bytes){
    var l = bytes.length, bitLen = l * 8;
    var withOne = l + 1, padLen = ((withOne + 8 + 63) >> 6) << 6;
    var m = new Uint8Array(padLen); m.set(bytes); m[l] = 0x80;
    var dv = new DataView(m.buffer);
    dv.setUint32(padLen - 4, bitLen >>> 0); dv.setUint32(padLen - 8, Math.floor(bitLen / 4294967296));
    var h0=0x6a09e667,h1=0xbb67ae85,h2=0x3c6ef372,h3=0xa54ff53a,h4=0x510e527f,h5=0x9b05688c,h6=0x1f83d9ab,h7=0x5be0cd19;
    var w = new Uint32Array(64);
    for (var off = 0; off < padLen; off += 64){
      for (var i=0;i<16;i++) w[i] = dv.getUint32(off + i*4);
      for (i=16;i<64;i++){
        var x=w[i-15], y=w[i-2];
        var s0=((x>>>7)|(x<<25))^((x>>>18)|(x<<14))^(x>>>3);
        var s1=((y>>>17)|(y<<15))^((y>>>19)|(y<<13))^(y>>>10);
        w[i]=(w[i-16]+s0+w[i-7]+s1)|0;
      }
      var a=h0,b=h1,c=h2,d=h3,e=h4,f=h5,g=h6,h=h7;
      for (i=0;i<64;i++){
        var S1=((e>>>6)|(e<<26))^((e>>>11)|(e<<21))^((e>>>25)|(e<<7));
        var ch=(e&f)^(~e&g);
        var t1=(h+S1+ch+K[i]+w[i])|0;
        var S0=((a>>>2)|(a<<30))^((a>>>13)|(a<<19))^((a>>>22)|(a<<10));
        var mj=(a&b)^(a&c)^(b&c);
        var t2=(S0+mj)|0;
        h=g;g=f;f=e;e=(d+t1)|0;d=c;c=b;b=a;a=(t1+t2)|0;
      }
      h0=(h0+a)|0;h1=(h1+b)|0;h2=(h2+c)|0;h3=(h3+d)|0;h4=(h4+e)|0;h5=(h5+f)|0;h6=(h6+g)|0;h7=(h7+h)|0;
    }
    return [h0,h1,h2,h3,h4,h5,h6,h7].map(function(v){return (v>>>0).toString(16).padStart(8,"0");}).join("");
  }
  var enc = new TextEncoder();
  function derive(pw){
    var x = SALT + pw;
    for (var i=0;i<ROUNDS;i++) x = sha256hex(enc.encode(x));
    return x;
  }

  function store(kind){ try { return window[kind]; } catch(e){ return null; } }
  function isUnlocked(){
    var s = store("sessionStorage"), l = store("localStorage");
    try { if (s && s.getItem(KEY) === HASH) return true; } catch(e){}
    try { if (l && l.getItem(KEY) === HASH) return true; } catch(e){}
    return false;
  }
  function show(){
    document.getElementById("lock").hidden = true;
    document.getElementById("app").hidden = false;
    if (window.App) window.App.start();
  }

  window.QuizLock = {
    lock: function(){
      try { sessionStorage.removeItem(KEY); } catch(e){}
      try { localStorage.removeItem(KEY); } catch(e){}
      location.reload();
    }
  };

  document.addEventListener("DOMContentLoaded", function(){
    if (isUnlocked()) { show(); return; }
    var form = document.getElementById("lockForm"), pw = document.getElementById("pw"),
        err = document.getElementById("lockErr"), btn = document.getElementById("unlockBtn");
    document.getElementById("eye").addEventListener("click", function(){
      pw.type = pw.type === "password" ? "text" : "password"; pw.focus();
    });
    form.addEventListener("submit", function(ev){
      ev.preventDefault();
      if (!pw.value){ err.textContent = "Vui lòng nhập mật khẩu."; return; }
      btn.disabled = true; btn.textContent = "Đang kiểm tra…"; err.textContent = "";
      setTimeout(function(){
        var ok = derive(pw.value) === HASH;
        btn.disabled = false; btn.textContent = "Mở khóa";
        if (ok){
          try { sessionStorage.setItem(KEY, HASH); } catch(e){}
          if (document.getElementById("remember").checked){ try { localStorage.setItem(KEY, HASH); } catch(e){} }
          show();
        } else {
          err.textContent = "Sai mật khẩu, vui lòng thử lại.";
          form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
          pw.select();
        }
      }, 30);
    });
  });
})();
