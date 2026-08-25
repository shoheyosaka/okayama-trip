(function () {
  // 仮実装のパスワードゲート(サーバーがないので本当のセキュリティにはなりません)
  var PASSWORD = "20260720"; // ここを好きなパスワードに変更してください
  var STORAGE_KEY = "okayama_trip_auth";

  if (localStorage.getItem(STORAGE_KEY) === "ok") return;

  document.write('<style id="trip-lock-style">body{display:none !important}</style>');

  window.addEventListener("DOMContentLoaded", function () {
    var overlay = document.createElement("div");
    overlay.id = "trip-lock-overlay";
    overlay.innerHTML =
      '<style>' +
      '@keyframes trip-lock-pop{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}' +
      '@keyframes trip-lock-plane{0%{transform:translateX(0)}100%{transform:translateX(calc(100% - 16px))}}' +
      '#trip-lock-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;' +
      'background:#F6F1E6;' +
      'background-image:radial-gradient(#DCC9A8 1px,transparent 1px);background-size:22px 22px;background-position:-6px -6px;' +
      'font-family:"Noto Sans JP",sans-serif;padding:24px;overflow:hidden;}' +
      '#trip-lock-deco{position:absolute;inset:0;pointer-events:none;font-size:22px;opacity:.35;}' +
      '#trip-lock-deco span{position:absolute;transform:rotate(-8deg);}' +
      '#trip-lock-card{position:relative;width:100%;max-width:340px;background:#EFE6D3;border-radius:16px;' +
      'padding:30px 28px 26px;text-align:center;box-sizing:border-box;' +
      'border:1.5px solid #C3D0DD;box-shadow:0 18px 40px -18px rgba(43,38,32,.35);' +
      'animation:trip-lock-pop .45s cubic-bezier(.2,.8,.2,1);}' +
      '#trip-lock-stamp{width:56px;height:56px;margin:0 auto 12px;border-radius:50%;' +
      'border:2.5px solid #B23A2E;color:#B23A2E;display:flex;align-items:center;justify-content:center;' +
      'font-size:24px;transform:rotate(-8deg);}' +
      '#trip-lock-card h1{font-family:"Shippori Mincho",serif;font-weight:700;font-size:19px;color:#1B3049;margin:0 0 14px;letter-spacing:.02em;}' +
      '#trip-lock-route{display:flex;align-items:center;justify-content:center;gap:8px;' +
      'font-family:"Shippori Mincho",serif;font-size:13px;font-weight:700;color:#2C4A6E;letter-spacing:.06em;margin-bottom:6px;}' +
      '#trip-lock-route-line{position:relative;flex:1;max-width:56px;height:1px;background:repeating-linear-gradient(' +
      '90deg,#4A6A8C 0,#4A6A8C 4px,transparent 4px,transparent 8px);overflow:visible;}' +
      '#trip-lock-route-line span{position:absolute;top:50%;left:0;transform:translateY(-50%);font-size:12px;' +
      'animation:trip-lock-plane 2.6s ease-in-out infinite alternate;}' +
      '#trip-lock-card>p.trip-lock-sub{font-size:11px;color:#6B6355;letter-spacing:.15em;margin:0 0 18px;}' +
      '#trip-lock-card p.trip-lock-instruction{font-size:12.5px;color:#6B6355;margin:0 0 18px;line-height:1.6;}' +
      '#trip-lock-card input{width:100%;box-sizing:border-box;padding:11px 14px;font-size:15px;letter-spacing:.15em;' +
      'text-align:center;border:1px solid #C3D0DD;border-radius:8px;margin-bottom:14px;background:#fff;' +
      'outline:none;transition:border-color .15s ease,box-shadow .15s ease;}' +
      '#trip-lock-card input:focus{border-color:#4A6A8C;box-shadow:0 0 0 3px rgba(74,106,140,.18);}' +
      '#trip-lock-card button{width:100%;padding:11px;font-size:14px;font-weight:700;color:#fff;letter-spacing:.05em;' +
      'background:#2C4A6E;border:none;border-radius:8px;cursor:pointer;transition:background .15s ease;}' +
      '#trip-lock-card button:hover{background:#1B3049;}' +
      '#trip-lock-error{min-height:16px;font-size:11.5px;color:#B23A2E;margin-top:10px;}' +
      '</style>' +
      '<div id="trip-lock-deco">' +
      '<span style="top:10%;left:8%;">✈️</span>' +
      '<span style="top:16%;right:10%;">🧭</span>' +
      '<span style="bottom:14%;left:12%;">🧳</span>' +
      '<span style="bottom:20%;right:8%;">📍</span>' +
      '</div>' +
      '<div id="trip-lock-card">' +
      '<div id="trip-lock-stamp">✈</div>' +
      '<h1>祝新婚 旅のしおり</h1>' +
      '<div id="trip-lock-route">' +
      '<span>OKAYAMA</span>' +
      '<span id="trip-lock-route-line"><span>✈</span></span>' +
      '<span>NAGANO</span>' +
      '</div>' +
      '<p class="trip-lock-sub">TRAVEL ITINERARY</p>' +
      '<p class="trip-lock-instruction">結婚記念日を8桁の数字で<br>入力してください</p>' +
      '<form id="trip-lock-form">' +
      '<input type="password" id="trip-lock-input" autocomplete="off" autofocus placeholder="••••••••">' +
      '<button type="submit">旅を始める</button>' +
      '<div id="trip-lock-error"></div>' +
      '</form>' +
      '</div>';

    document.documentElement.appendChild(overlay);

    var form = document.getElementById("trip-lock-form");
    var input = document.getElementById("trip-lock-input");
    var error = document.getElementById("trip-lock-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value === PASSWORD) {
        localStorage.setItem(STORAGE_KEY, "ok");
        var lockStyle = document.getElementById("trip-lock-style");
        if (lockStyle) lockStyle.remove();
        overlay.remove();
      } else {
        error.textContent = "パスワードが違います";
        input.value = "";
        input.focus();
      }
    });
  });
})();
