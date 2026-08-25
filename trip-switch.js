(function () {
  function init() {
    var links = document.querySelectorAll('a.btn-trip-switch[href="nagano/index.html"]');
    if (!links.length) return;

    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        openModal(link.getAttribute("href"));
      });
    });
  }

  function openModal(targetHref) {
    var overlay = document.createElement("div");
    overlay.id = "vella-modal-overlay";
    overlay.innerHTML =
      "<style>" +
      "#vella-modal-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;" +
      "background:rgba(43,38,32,.55);padding:24px;font-family:'Noto Sans JP',sans-serif;}" +
      "#vella-modal-card{width:100%;max-width:300px;background:#F6F1E6;border-radius:16px;padding:22px 20px 20px;" +
      "text-align:center;box-shadow:0 20px 45px -15px rgba(0,0,0,.4);box-sizing:border-box;}" +
      "#vella-modal-card img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:12px;margin:0 0 14px;display:block;" +
      "border:1px solid #C3D0DD;}" +
      "#vella-modal-card p{font-size:13.5px;color:#2B2620;margin:0 0 18px;line-height:1.6;}" +
      "#vella-modal-buttons{display:flex;gap:10px;}" +
      "#vella-modal-buttons button{flex:1;padding:10px;font-size:13.5px;font-weight:700;border-radius:8px;" +
      "cursor:pointer;transition:opacity .15s ease;}" +
      ".vella-btn-take{background:#2C4A6E;color:#fff;border:1px solid #2C4A6E;}" +
      ".vella-btn-leave{background:#fff;color:#6B6355;border:1px solid #C3D0DD;}" +
      "#vella-modal-buttons button:disabled{opacity:.5;cursor:default;}" +
      "</style>" +
      '<div id="vella-modal-card">' +
      '<img id="vella-modal-img" src="images/vella-asking.png" alt="ベラ">' +
      "<p>仲間になりたそうにこちらを見ている。</p>" +
      '<div id="vella-modal-buttons">' +
      '<button type="button" class="vella-btn-take">連れて行く</button>' +
      '<button type="button" class="vella-btn-leave">置いていく</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(overlay);

    var img = overlay.querySelector("#vella-modal-img");
    var takeBtn = overlay.querySelector(".vella-btn-take");
    var leaveBtn = overlay.querySelector(".vella-btn-leave");

    takeBtn.addEventListener("click", function () {
      takeBtn.disabled = true;
      leaveBtn.disabled = true;
      img.src = "images/vella-smailing.png";
      setTimeout(function () {
        window.location.href = targetHref;
      }, 1500);
    });

    leaveBtn.addEventListener("click", function () {
      takeBtn.disabled = true;
      leaveBtn.disabled = true;
      img.src = "images/vella-crying.png";
      setTimeout(function () {
        overlay.remove();
        showToast("クウゥ---ン....<br><span class=\"vella-toast-sub\">(何らかの不具合により画面遷移に失敗しました)</span>");
      }, 1500);
    });
  }

  function showToast(message) {
    var toast = document.createElement("div");
    toast.id = "vella-toast";
    toast.innerHTML =
      "<style>" +
      "@keyframes vella-toast-in{from{transform:translateX(24px);opacity:0}to{transform:translateX(0);opacity:1}}" +
      "@keyframes vella-toast-out{from{transform:translateX(0);opacity:1}to{transform:translateX(24px);opacity:0}}" +
      "#vella-toast{position:fixed;top:16px;right:16px;z-index:10000;" +
      "display:flex;align-items:center;gap:8px;" +
      "background:#F3DFDA;color:#B23A2E;border:1px solid #B23A2E;border-radius:10px;" +
      "padding:10px 14px;font-family:'Noto Sans JP',sans-serif;font-size:13px;font-weight:700;" +
      "box-shadow:0 8px 20px -8px rgba(0,0,0,.3);" +
      "animation:vella-toast-in .3s ease forwards;}" +
      "#vella-toast svg{width:16px;height:16px;flex-shrink:0;}" +
      "#vella-toast .vella-toast-sub{display:inline-block;margin-top:3px;font-size:11px;font-weight:500;opacity:.85;}" +
      "</style>" +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>' +
      "<span>" + message + "</span>";

    document.body.appendChild(toast);

    setTimeout(function () {
      toast.style.animation = "vella-toast-out .3s ease forwards";
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 2500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
