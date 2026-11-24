(function () {
  "use strict";

  if (window.__TS_HOME_V2__) return;
  window.__TS_HOME_V2__ = true;

  /* =====================================================
     TELESUPAR HOME V2
     Next Generation • Premium Dark • Educational Reels
  ===================================================== */

  const style = document.createElement("style");
  style.id = "ts-home-v2-style";
  style.textContent = `
    :root {
      --ts-bg: #080c16;
      --ts-card: rgba(18,25,43,.88);
      --ts-border: rgba(255,255,255,.09);
      --ts-muted: #94a3b8;
      --ts-text: #f8fafc;
      --ts-purple: #8b5cf6;
      --ts-blue: #3b82f6;
      --ts-pink: #ec4899;
    }

    #main-view {
      background:
        radial-gradient(ellipse at 15% 0%,rgba(91,60,180,.10),transparent 38%),
        var(--ts-bg);
    }

    .stories-bar {
      display:flex;
      gap:15px;
      padding:17px 15px;
      overflow-x:auto;
      scrollbar-width:none;
      border-bottom:1px solid var(--ts-border);
      background:rgba(10,15,28,.72);
    }
    .stories-bar::-webkit-scrollbar { display:none; }

    .story-item {
      display:flex;
      flex-direction:column;
      align-items:center;
      width:66px;
      flex-shrink:0;
      cursor:pointer;
      transition:transform .2s;
    }
    .story-item:active { transform:scale(.93); }

    .story-ring {
      width:64px;
      height:64px;
      padding:2.5px;
      border-radius:50%;
      background:linear-gradient(135deg,#f59e0b,#ec4899,#8b5cf6,#3b82f6);
      position:relative;
      box-shadow:0 0 18px rgba(139,92,246,.14);
    }
    .story-ring.seen { background:#334155; }
    .story-ring img {
      width:100%;
      height:100%;
      border-radius:50%;
      object-fit:cover;
      border:2px solid #090d16;
    }
    .story-add-badge {
      position:absolute;
      bottom:0;
      right:0;
      width:21px;
      height:21px;
      background:linear-gradient(135deg,#6366f1,#a855f7);
      color:white;
      border:2px solid #090d16;
      border-radius:50%;
      display:grid;
      place-items:center;
      font-size:15px;
      font-weight:800;
    }
    .story-name {
      color:#cbd5e1;
      font-size:11px;
      margin-top:7px;
      max-width:66px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    .home-section-heading {
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:17px 16px 5px;
    }
    .home-section-heading strong {
      font-size:15px;
      color:#f8fafc;
      letter-spacing:.2px;
    }
    .home-section-heading span {
      font-size:11px;
      color:#8b8fae;
    }

    .post-card {
      margin:13px 12px 17px;
      overflow:hidden;
      border-radius:21px;
      border:1px solid var(--ts-border);
      background:linear-gradient(145deg,rgba(25,33,54,.96),rgba(13,19,33,.98));
      box-shadow:0 12px 30px rgba(0,0,0,.18);
    }
    .post-header {
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:14px;
      gap:8px;
    }
    .post-user {
      display:flex;
      align-items:center;
      gap:10px;
      min-width:0;
      flex:1;
      cursor:pointer;
    }
    .post-user img {
      width:41px;
      height:41px;
      border-radius:50%;
      object-fit:cover;
      border:1.5px solid rgba(139,92,246,.6);
    }
    .post-user-name {
      font-size:13.5px;
      font-weight:750;
      color:#f8fafc;
    }
    .post-user-handle {
      color:#94a3b8;
      font-size:11px;
      margin-top:3px;
    }
    .post-media {
      display:block;
      width:100%;
      max-height:460px;
      object-fit:cover;
      background:#020617;
      cursor:pointer;
    }
    .post-actions {
      display:flex;
      align-items:center;
      gap:10px;
      padding:12px 14px 4px;
    }
    .action-chip {
      display:flex;
      align-items:center;
      gap:7px;
      padding:8px 13px;
      border-radius:30px;
      color:#e2e8f0;
      background:rgba(255,255,255,.055);
      border:1px solid rgba(255,255,255,.055);
      font-size:13px;
      cursor:pointer;
    }
    .action-chip.liked {
      color:#fb7185;
      background:rgba(236,72,153,.13);
      border-color:rgba(236,72,153,.2);
    }
    .post-caption {
      padding:9px 14px 15px;
      color:#dbe4f0;
      font-size:13.5px;
      line-height:1.55;
      overflow-wrap:anywhere;
      cursor:pointer;
    }
    .edu-badge {
      display:inline-flex;
      padding:5px 9px;
      border-radius:7px;
      margin-bottom:7px;
      color:#a5b4fc;
      background:rgba(99,102,241,.14);
      border:1px solid rgba(99,102,241,.18);
      font-size:10px;
      font-weight:800;
    }
    .btn-follow-post,.btn-msg-post {
      border:0;
      border-radius:10px;
      padding:8px 13px;
      font-size:11px;
      font-weight:750;
      cursor:pointer;
    }
    .btn-follow-post {
      color:white;
      background:linear-gradient(135deg,#6366f1,#9333ea);
    }
    .btn-msg-post {
      color:#e2e8f0;
      background:rgba(255,255,255,.07);
      border:1px solid var(--ts-border);
    }
    .btn-pill {
      border:0;
      color:white;
      border-radius:30px;
      padding:9px 17px;
      background:linear-gradient(120deg,#6366f1,#9333ea,#db2777);
      font-size:12px;
      font-weight:800;
      cursor:pointer;
    }
    .post-options-btn {
      color:#cbd5e1;
      background:none;
      border:0;
      font-size:21px;
      padding:4px 7px;
      cursor:pointer;
    }

    .comments-box {
      padding:13px;
      background:rgba(4,8,18,.55);
      border-top:1px solid var(--ts-border);
    }
    .comment-item {
      margin-bottom:10px;
      color:#dbe4f0;
      font-size:13px;
    }

    .story-viewer {
      position:fixed;
      inset:0;
      z-index:500;
      background:#000;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .story-viewer-media {
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      object-fit:contain;
    }
    .story-viewer-top,.story-viewer-bottom {
      position:relative;
      z-index:2;
      padding:17px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      background:linear-gradient(to bottom,rgba(0,0,0,.8),transparent);
    }
    .story-viewer-bottom {
      background:linear-gradient(to top,rgba(0,0,0,.85),transparent);
    }

    /* PREMIUM REELS VIEWER */
    #fullscreen-reel-viewer {
      position:fixed;
      inset:0;
      z-index:600;
      background:#000;
      color:#fff;
      overflow:hidden;
      font-family:inherit;
    }
    .reel-topbar {
      position:absolute;
      top:0;
      left:0;
      right:0;
      height:62px;
      padding:0 15px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      z-index:20;
      background:linear-gradient(to bottom,rgba(0,0,0,.75),transparent);
          }
    .reel-back-btn {
      border:1px solid rgba(255,255,255,.16);
      color:white;
      background:rgba(255,255,255,.09);
      backdrop-filter:blur(14px);
      border-radius:30px;
      padding:8px 14px;
      font-size:13px;
      font-weight:700;
    }
    .reel-top-title {
      font-size:16px;
      font-weight:850;
      letter-spacing:.4px;
      text-shadow:0 2px 10px #000;
    }
    .reel-create-btn {
      width:36px;
      height:36px;
      border-radius:50%;
      border:1px solid rgba(255,255,255,.2);
      background:rgba(255,255,255,.1);
      color:#fff;
      font-size:23px;
    }
    .reel-slides {
      width:100%;
      height:100%;
      overflow-y:auto;
      scroll-snap-type:y mandatory;
      scrollbar-width:none;
      overscroll-behavior-y:contain;
    }
    .reel-slides::-webkit-scrollbar { display:none; }
    .reel-slide {
      width:100%;
      height:100%;
      height:100dvh;
      position:relative;
      overflow:hidden;
      scroll-snap-align:start;
      scroll-snap-stop:always;
      background:#080b13;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .reel-media {
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      object-fit:contain;
      background:#000;
    }
    .reel-shade {
      position:absolute;
      inset:0;
      pointer-events:none;
      background:linear-gradient(
        to bottom,
        rgba(0,0,0,.42),
        transparent 22%,
        transparent 53%,
        rgba(0,0,0,.78) 100%
      );
    }
    .reel-action-rail {
      position:absolute;
      right:13px;
      bottom:145px;
      z-index:10;
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:20px;
    }
    .reel-action-btn {
      border:0;
      background:rgba(10,10,18,.22);
      color:#fff;
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:5px;
      font-size:27px;
      cursor:pointer;
      text-shadow:0 2px 8px #000;
      padding:5px;
    }
    .reel-action-btn span:last-child {
      font-size:11px;
      font-weight:800;
    }
    .reel-action-btn.liked { color:#fb4c83; }
    .reel-bottom-info {
      position:absolute;
      z-index:10;
      bottom:25px;
      left:15px;
      right:75px;
      display:flex;
      flex-direction:column;
      gap:9px;
    }
    .reel-creator {
      display:flex;
      align-items:center;
      gap:10px;
      cursor:pointer;
    }
    .reel-creator img {
      width:39px;
      height:39px;
      border-radius:50%;
      object-fit:cover;
      border:2px solid rgba(255,255,255,.8);
    }
    .reel-creator-name {
      font-size:14px;
      font-weight:800;
      color:#fff;
    }
    .reel-caption {
      color:#f1f5f9;
      font-size:13px;
      line-height:1.5;
      max-height:100px;
      overflow:auto;
      overflow-wrap:anywhere;
    }
    .reel-category {
      color:#c4b5fd;
      font-size:11px;
      font-weight:800;
    }
    .reel-play-indicator {
      position:absolute;
      z-index:5;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      width:62px;
      height:62px;
      border-radius:50%;
      display:grid;
      place-items:center;
      background:rgba(0,0,0,.48);
      border:1px solid rgba(255,255,255,.3);
      font-size:27px;
      opacity:0;
      pointer-events:none;
      transition:opacity .2s;
    }
    .reel-play-indicator.show { opacity:1; }

    .ts-modal {
      position:fixed;
      inset:0;
      z-index:700;
      background:rgba(0,0,0,.72);
      backdrop-filter:blur(9px);
      display:flex;
      flex-direction:column;
      justify-content:flex-end;
    }
    .ts-modal-panel {
      background:#111827;
      border:1px solid var(--ts-border);
      border-radius:24px 24px 0 0;
      color:#fff;
      max-height:82vh;
      overflow:auto;
      padding:17px;
    }

    @media(min-width:700px) {
      .post-card { max-width:620px; margin:18px auto; }
      .stories-bar { padding-left:max(16px,calc((100% - 620px)/2)); }
    }
  `;
  document.head.appendChild(style);

  const esc = (value) => String(value ?? "").replace(/[&<>"\']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[c]);

  const safeUrl = (url) => {
    const value = String(url || "");
    return /^(https?:\/\/|\/)/i.test(value) ? value : "";
  };

  const timeAgo = (date) => {
    if (!date) return "";
    const seconds = Math.max(0, Math.floor((Date.now() - new Date(date)) / 1000));
    if (seconds < 60) return seconds + "s";
    if (seconds < 3600) return Math.floor(seconds / 60) + "m";
    if (seconds < 86400) return Math.floor(seconds / 3600) + "h";
    return Math.floor(seconds / 86400) + "d";
  };

  window.renderHome = async function (container) {
    container.innerHTML = `
      <div class="stories-bar" id="stories-bar"></div>
      <div class="home-section-heading">
        <strong>Discover & Learn</strong>
        <span>TELESUPAR FEED</span>
      </div>
      <div id="posts-feed">
        <p style="text-align:center;color:#94a3b8;padding:35px">Loading your feed...</p>
      </div>
      <input type="file" id="story-upload-input" accept="image/*,video/*" hidden>
    `;

    setTimeout(() => {
      const header = document.querySelector("header") ||
        document.querySelector(".app-header");

      if (header) {
        header.style.display = "flex";

        const area = header.querySelector("div:last-child") || header;

        if (!document.getElementById("header-reels-btn")) {
          const reels = document.createElement("button");
          reels.id = "header-reels-btn";
          reels.textContent = "▶";
          reels.title = "Educational Reels";
          reels.style.cssText = "background:none;border:0;color:white;font-size:19px;padding:7px;cursor:pointer";
          reels.onclick = () => window.openFullscreenPostViewer();

          const create = document.createElement("button");
          create.id = "header-create-post-btn";
          create.textContent = "＋";
          create.title = "Create Post";
          create.style.cssText = "background:none;border:0;color:white;font-size:25px;padding:5px;cursor:pointer";
          create.onclick = () => window.openCreatePostModal();

          area.prepend(create);
          area.prepend(reels);
        }
      }

      setupNotificationButtonHook();
      updateBottomNavBadges();
    }, 150);

    if (window.switchTab && !window._telesuparTabHooked) {
      window._telesuparTabHooked = true;
      const original = window.switchTab;
      window.switchTab = function (tab) {
        original(tab);
        const header = document.querySelector("header") ||
          document.querySelector(".app-header");
        if (header) header.style.display = tab === "home" ? "flex" : "none";
      };
    }

    const upload = document.getElementById("story-upload-input");
    upload.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      const result = await window.api("/api/stories", {
        method:"POST", body:fd
      });
      if (result.success) loadStories();
      else alert(result.message || "Story upload failed");
      upload.value = "";
    };

    loadStories();
    loadPosts();
  };

  function setupNotificationButtonHook() {
    const btn = document.querySelector('button[onclick*="notification"]') ||
      document.querySelector(".fa-bell")?.closest("button");

    if (!btn || btn._tsNotifHooked) return;
    btn._tsNotifHooked = true;
    const original = btn.onclick;
    btn.onclick = (e) => {
      if (original) original.call(btn, e);
      showCustomNotificationsModal();
    };
  }

  async function showCustomNotificationsModal() {
    document.getElementById("custom-notifications-modal")?.remove();

    const modal = document.createElement("div");
    modal.id = "custom-notifications-modal";
    modal.className = "ts-modal";
    modal.innerHTML = `
      <div class="ts-modal-panel" style="height:85vh;max-height:85vh">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
          <strong style="font-size:18px">Notifications & Activity</strong>')

          
