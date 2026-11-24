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

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, c => ({
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

  function idSafe(value) {
    return String(value || "").replace(/[^a-zA-Z0-9_-]/g, "");
  }

  function resolveUserId(user, post) {
    return String(
      user?.id ||
      user?._id ||
      user?.userId ||
      post?.userId ||
      post?.authorId ||
      post?.author?.id ||
      post?.author?._id ||
      ""
    );
  }

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
          <strong style="font-size:18px">Notifications & Activity</strong>
          <button id="close-notif-modal" style="background:none;border:0;color:white;font-size:22px">✕</button>
        </div>
        <div id="notif-list-container" style="overflow:auto">
          <p style="text-align:center;color:#94a3b8;padding:30px">Loading activities...</p>
        </div>
      </div>`;
    document.body.appendChild(modal);

    modal.querySelector("#close-notif-modal").onclick = () => modal.remove();
    modal.onclick = e => { if (e.target === modal) modal.remove(); };

    const box = modal.querySelector("#notif-list-container");
    const res = await window.api("/api/notifications");

    if (!res.success || !res.notifications?.length) {
      box.innerHTML = `<p style="text-align:center;color:#94a3b8;padding:35px">No recent notifications.</p>`;
      return;
    }

    box.innerHTML = res.notifications.map(n => {
      const actor = n.actor || n.user || {};
      const post = n.post || n.targetPost || {};
      const story = n.story || {};
      const type = String(n.type || "").toLowerCase();

      let action = "interacted with you";
      if (type.includes("post_like") || type.includes("like")) {
        action = (post?.storyId || story?.id || type.includes("story")) ? "liked your story" : "liked your post";
      } else if (type.includes("comment_reply") || type.includes("reply")) {
        action = `replied: ${n.commentText || n.text || ""}`;
      } else if (type.includes("comment")) {
        action = `commented: ${n.commentText || n.text || ""}`;
      } else if (type.includes("follow")) {
        action = "started following you";
      }

      const media = safeUrl(story.mediaUrl || post.mediaUrl);
      const actorId = resolveUserId(actor, null);
      const thumb = media
        ? `<img data-v3-thumb="${esc(post.id || "")}" src="${esc(media)}" style="width:48px;height:48px;object-fit:cover;border-radius:10px;cursor:pointer">`
        : "";

      return `
        <div class="tsv3-notification"
          data-v3-actor="${esc(actorId)}"
          data-v3-post="${esc(post.id || "")}"
          data-v3-type="${esc(type)}"
          style="display:flex;align-items:center;gap:11px;
          padding:13px 0;border-bottom:1px solid rgba(255,255,255,.08)">

          <img data-v3-actor="${esc(actorId)}"
            src="${esc(window.avatarUrl(actor))}"
            style="width:43px;height:43px;border-radius:50%;
            object-fit:cover;cursor:pointer">

          <div style="flex:1;min-width:0;font-size:13px;line-height:1.5">
            <b data-v3-actor="${esc(actorId)}"
              style="cursor:pointer">
              ${esc(actor.displayName || actor.username || "Someone")}
            </b>
            ${esc(action)}

            <div style="font-size:11px;color:#94a3b8;margin-top:4px">
              ${esc(timeAgo(n.createdAt || n.timestamp))}
            </div>

            ${type === "new_follow"
              ? `<button class="tsv3-follow-back"
                  data-userid="${esc(actorId)}"
                  style="margin-top:8px;border:0;border-radius:18px;
                  padding:7px 14px;background:#6366f1;
                  color:white;font-weight:800;font-size:11px">
                  Follow Back
                </button>`
              : ""}
          </div>

          ${thumb}
        </div>`;
    }).join("");

    box.querySelectorAll("[data-v3-actor]").forEach(el => {
      el.addEventListener("click", event => {
        event.stopPropagation();
        const id = el.dataset.v3Actor;
        if (id && window.openUserProfile) window.openUserProfile(id);
      });
    });

    box.querySelectorAll("[data-v3-thumb]").forEach(el => {
      el.onclick = () => {
        const postId = el.dataset.v3Thumb;
        if (!postId) return;
        modal.remove();
        window.openFullscreenPostViewer?.(postId);
      };
    });

    box.querySelectorAll(".tsv3-follow-back").forEach(async button => {
      const userId = button.dataset.userid;
      if (!userId) {
        button.remove();
        return;
      }

      const status = await window.api(`/api/users/${userId}/follow-status`);
      if (!button.isConnected) return;

      if (status.success && status.following) {
        button.textContent = "Following";
        button.disabled = true;
        button.style.background = "#334155";
      }

      button.onclick = async event => {
        event.stopPropagation();
        if (button.disabled) return;

        button.disabled = true;
        button.textContent = "Following...";

        const response = await window.api(`/api/users/${userId}/follow`, { method:"POST" });
        if (response.success) {
          button.textContent = "Following";
          button.style.background = "#334155";
        } else {
          button.disabled = false;
          button.textContent = "Follow Back";
          alert(response.message || "Could not follow user");
        }
      };
    });

    await window.api("/api/notifications/read", { method:"PATCH" });
  }

  async function updateBottomNavBadges() {
    try {
      const chat = await window.api("/api/conversations");
      let unreadChat = 0;
      (chat.conversations || []).forEach(c => unreadChat += Number(c.unreadCount || 0));

      const channel = await window.api("/api/channels");
      let unreadChannel = 0;
      (channel.channels || []).forEach(c => unreadChannel += Number(c.unreadCount || 0));

      const updateBadge = (selector, count) => {
        const btn = document.querySelector(selector);
        if (!btn) return;
        btn.style.position = "relative";
        let badge = btn.querySelector(".nav-badge");

        if (count > 0) {
          if (!badge) {
            badge = document.createElement("span");
            badge.className = "nav-badge";
            badge.style.cssText = "position:absolute;top:3px;right:5px;background:#ef4444;color:white;font-size:10px;font-weight:800;padding:2px 5px;border-radius:20px";
            btn.appendChild(badge);
          }
          badge.textContent = count > 99 ? "99+" : count;
        } else badge?.remove();
      };

      updateBadge('[data-tab="chat"]', unreadChat);
      updateBadge('[data-tab="groups"]', unreadChannel);

      const profile = document.querySelector('[data-tab="profile"]');
      if (profile && window.AppState?.user) {
        const avatar = window.avatarUrl(window.AppState.user);
        profile.innerHTML = `<img src="${esc(avatar)}" style="width:26px;height:26px;border-radius:50%;object-fit:cover;border:1.5px solid white">`;
      }
    } catch (err) {
      console.error("Home nav update:", err);
    }
  }

  window.openCreatePostModal = function () {
    document.getElementById("create-post-modal")?.remove();

    const modal = document.createElement("div");
    modal.id = "create-post-modal";
    modal.className = "ts-modal";
    modal.innerHTML = `
      <div class="ts-modal-panel" style="padding:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <strong style="font-size:18px">Create Educational Post</strong>
          <button id="close-post-modal" style="background:none;border:0;color:white;font-size:22px">✕</button>
        </div>
        <label style="font-size:12px;color:#94a3b8">SUBJECT CATEGORY</label>
        <select id="modal-post-category" style="width:100%;margin:8px 0 16px;padding:13px;background:#1e293b;color:white;border:1px solid var(--ts-border);border-radius:12px">
          <option>Mathematics</option><option>Physics</option>
          <option>Chemistry</option><option>Biology</option>
          <option>Programming</option><option>General Studies</option>
          <option>English</option>
        </select>
        <label style="font-size:12px;color:#94a3b8">LESSON / QUESTION</label>
        <textarea id="modal-post-caption" rows="4" placeholder="Share a concept, formula or study notes..." style="width:100%;box-sizing:border-box;margin:8px 0 15px;padding:13px;background:#1e293b;color:white;border:1px solid var(--ts-border);border-radius:12px;resize:vertical"></textarea>
        <label style="display:block;padding:14px;background:#1e293b;border-radius:12px;margin-bottom:17px;color:#c4b5fd">
          📷 Attach Study Video / Diagram
          <input type="file" id="modal-post-file" accept="image/*,video/*" hidden>
          <span id="modal-file-name" style="display:block;font-size:11px;color:#94a3b8;margin-top:6px"></span>
        </label>
        <button id="modal-publish-btn" class="btn-pill" style="width:100%;padding:13px">Publish Educational Post</button>
      </div>`;
    document.body.appendChild(modal);

    modal.querySelector("#close-post-modal").onclick = () => modal.remove();
    modal.onclick = e => { if (e.target === modal) modal.remove(); };

    modal.querySelector("#modal-post-file").onchange = e => {
      modal.querySelector("#modal-file-name").textContent =
        e.target.files?.[0]?.name || "";
    };

    modal.querySelector("#modal-publish-btn").onclick = async () => {
      const category = modal.querySelector("#modal-post-category").value;
      const caption = modal.querySelector("#modal-post-caption").value.trim();
      const file = modal.querySelector("#modal-post-file").files[0];

      if (!caption && !file) {
        alert("Please add a description or attach media.");
        return;
      }

      const fd = new FormData();
      fd.append("caption", `[${category}] ${caption}`);
      if (file) fd.append("file", file);

      const btn = modal.querySelector("#modal-publish-btn");
      btn.disabled = true;
      btn.textContent = "Publishing...";

      try {
        const result = await window.api("/api/posts", {
          method:"POST", body:fd
        });
        if (result.success) {
          modal.remove();
          loadPosts();
        } else {
          btn.disabled = false;
          btn.textContent = "Publish Educational Post";
          alert(result.message || "Could not publish post");
        }
      } catch (err) {
        btn.disabled = false;
        btn.textContent = "Publish Educational Post";
        alert("Network error. Please try again.");
      }
    };
  };

  async function loadStories() {
    const bar = document.getElementById("stories-bar");
    if (!bar) return;

    const data = await window.api("/api/stories/feed");
    if (!data.success) return;

    const me = window.AppState?.user || {};
    const mine = data.myStories || [];
    const hasMine = mine.length > 0;

    let html = `
      <div class="story-item" id="my-story-btn">
        <div class="story-ring ${hasMine ? "" : "seen"}">
          <img src="${esc(window.avatarUrl(me))}">
          <div class="story-add-badge">+</div>
        </div>
        <span class="story-name">Your Story</span>
      </div>`;

    (data.users || []).forEach((entry, index) => {
      html += `
        <div class="story-item" data-story-user="${index}">
          <div class="story-ring">
            <img src="${esc(window.avatarUrl(entry.user))}">
          </div>
          <span class="story-name">${esc(entry.user.displayName || entry.user.username)}</span>
        </div>`;
    });

    bar.innerHTML = html;

    bar.querySelector("#my-story-btn").onclick = () => {
      if (hasMine) openStoryViewer(me, mine, true);
      else document.getElementById("story-upload-input")?.click();
    };

    bar.querySelectorAll("[data-story-user]").forEach(el => {
      el.onclick = () => {
        const entry = data.users[Number(el.dataset.storyUser)];
        if (entry) openStoryViewer(entry.user, entry.stories, false);
      };
    });
  }

  function openStoryViewer(user, stories, isMine) {
    let index = 0;
    const viewer = document.createElement("div");
    viewer.className = "story-viewer";
    document.body.appendChild(viewer);

    async function renderSlide() {
      const story = stories[index];
      if (!story) {
        viewer.remove();
        return;
      }

      if (!isMine) {
        window.api(`/api/stories/${story.id}/view`, { method:"POST" });
      }

      const media = safeUrl(story.mediaUrl);
      const mediaTag = story.resourceType === "video"
        ? `<video src="${esc(media)}" class="story-viewer-media" autoplay playsinline controls></video>`
        : `<img src="${esc(media)}" class="story-viewer-media">`;

      viewer.innerHTML = `
        ${mediaTag}
        <div class="story-viewer-top">
          <div style="display:flex;align-items:center;gap:10px">
            <img src="${esc(window.avatarUrl(user))}" style="width:38px;height:38px;border-radius:50%;object-fit:cover">
            <div><b>${esc(user.displayName || user.username)}</b>
              <div style="font-size:11px;color:#cbd5e1">${index + 1} / ${stories.length}</div>
            </div>
          </div>
          <div style="display:flex;gap:9px">
            ${isMine ? `<button id="add-more-story" class="btn-pill">＋</button>` : ""}
            <button id="close-story-btn" class="btn-pill">✕</button>
          </div>
        </div>
        <div class="story-viewer-bottom">
          ${isMine
            ? `<span style="font-size:12px">👁 ${Number(story.viewsCount || 0)} views · ♥ ${Number(story.likesCount || 0)} likes</span>`
            : `<input id="story-reply-input" placeholder="Ask a doubt..." style="flex:1;min-width:0;background:#ffffff22;border:1px solid #ffffff55;border-radius:25px;padding:11px;color:white">
               <button id="story-like-btn" class="btn-pill">${story.likedByMe ? "♥" : "♡"}</button>
               <button id="story-send-reply" class="btn-pill">Send</button>`
          }
          <button id="next-story-btn" class="btn-pill">Next ›</button>
        </div>`;

      viewer.querySelector("#close-story-btn").onclick = () => viewer.remove();
      viewer.querySelector("#next-story-btn").onclick = () => {
        index++;
        renderSlide();
      };

      viewer.querySelector("#add-more-story")?.addEventListener("click", () => {
        viewer.remove();
        document.getElementById("story-upload-input")?.click();
      });

      if (!isMine) {
        viewer.querySelector("#story-like-btn").onclick = async () => {
          const result = await window.api(`/api/stories/${story.id}/like`, { method:"POST" });
          if (result.success) {
            story.likedByMe = result.liked;
            viewer.querySelector("#story-like-btn").textContent = result.liked ? "♥" : "♡";
          }
        };

        viewer.querySelector("#story-send-reply").onclick = async () => {
          const text = viewer.querySelector("#story-reply-input").value.trim();
          if (!text) return;
          const conv = await window.api(`/api/conversations/${user.id}`, { method:"POST" });
          if (conv.success) {
            await window.api(`/api/conversations/${conv.conversation.id}/messages`, {
              method:"POST",
              body:JSON.stringify({ text, storyReply:{ storyId:story.id } })
            });
            viewer.remove();
          }
        };
      }
    }

    renderSlide();
  }

  async function loadPosts() {
    const feed = document.getElementById("posts-feed");
    if (!feed) return;

    const data = await window.api("/api/posts/feed");

    if (!data.success || !data.posts?.length) {
      feed.innerHTML = `
        <div style="text-align:center;padding:50px 25px;color:#94a3b8">
          <div style="font-size:38px;margin-bottom:12px">📚</div>
          <b style="color:#e2e8f0">No lessons yet</b>
          <p style="font-size:13px">Be the first to share something useful!</p>
          <button class="btn-pill" onclick="window.openCreatePostModal()">＋ Create Post</button>
        </div>`;
      return;
    }

    feed.innerHTML = data.posts.map(post => {
      let caption = post.caption || "";
      let category = "";

      if (caption.startsWith("[")) {
        const end = caption.indexOf("]");
        if (end !== -1) {
          category = caption.slice(1, end);
          caption = caption.slice(end + 1).trim();
        }
      }

      const media = safeUrl(post.mediaUrl);
      const user = post.user || {};
      const id = esc(post.id);
      const postUserId = resolveUserId(user, post);

      return `
        <article class="post-card" id="post-${id}">
          <div class="post-header">
            <div class="post-user" onclick="window.openUserProfile('${idSafe(postUserId)}')">
              <img src="${esc(window.avatarUrl(user))}">
              <div style="min-width:0">
                <div class="post-user-name">${esc(user.displayName || user.username)}</div>
                <div class="post-user-handle">@${esc(user.username || "user")} · ${esc(timeAgo(post.createdAt))}</div>
              </div>
            </div>
            <div id="post-action-container-${id}" style="display:flex;align-items:center;gap:5px">
              ${post.isMyPost ? "" : post.isFollowing
                ? `<button class="btn-msg-post" onclick="window.openDirectChat('${idSafe(postUserId)}')">Message</button>`
                : `<button class="btn-follow-post" onclick="window.handlePostFollow('${idSafe(postUserId)}','${id}')">Follow</button>`
              }
              <button class="post-options-btn" onclick="window.openPostOptionsMenu('${id}',${!!post.isMyPost})">⋮</button>
            </div>
          </div>

          ${media ? (post.mediaType === "video"
            ? `<video src="${esc(media)}" class="post-media" playsinline muted controls onclick="window.openFullscreenPostViewer('${id}')"></video>`
            : `<img src="${esc(media)}" class="post-media" loading="lazy" onclick="window.openFullscreenPostViewer('${id}')">`)
            : ""}

          <div class="post-actions">
            <button class="action-chip ${post.likedByMe ? "liked" : ""}" onclick="window.togglePostLike('${id}',this)">
              ♥ <span>${Number(post.likesCount || 0)}</span>
            </button>
            <button class="action-chip" onclick="window.toggleComments('${id}')">
              ◯ <span id="ccount-${id}">${Number(post.commentsCount || 0)}</span>
            </button>
            <button class="action-chip" onclick="window.openFullscreenPostViewer('${id}')">▶ Reel</button>
          </div>

          ${(category || caption) ? `
            <div class="post-caption" onclick="window.openFullscreenPostViewer('${id}')">
              ${category ? `<div class="edu-badge">📚 ${esc(category)}</div>` : ""}
              <div>${esc(caption)}</div>
            </div>` : ""}
          <div class="comments-box hidden" id="comments-${id}"></div>
        </article>`;
    }).join("");
  }

  window.handlePostFollow = async function(userId, postId) {
    if (!userId) return;
    const button = document.querySelector(`#post-${CSS.escape(postId)} .btn-follow-post`);
    if (button) {
      button.disabled = true;
      button.textContent = "...";
    }

    try {
      const result = await window.api(`/api/users/${userId}/follow`, {
        method:"POST"
      });

      if (result.success) {
        const container = document.getElementById(`post-action-container-${postId}`);
        if (container) {
          const optsBtn = container.querySelector(".post-options-btn");
          container.innerHTML = `<button class="btn-msg-post" onclick="window.openDirectChat('${idSafe(userId)}')">Message</button>`;
          if (optsBtn) container.appendChild(optsBtn);
        } else {
          loadPosts();
        }
      } else {
        if (button) {
          button.disabled = false;
          button.textContent = "Follow";
        }
        alert(result.message || "Could not follow user");
      }
    } catch (error) {
      if (button) {
        button.disabled = false;
        button.textContent = "Follow";
      }
      console.error(error);
    }
  };

  window.openPostOptionsMenu = function(postId, isMine) {
    document.getElementById("post-options-modal")?.remove();

    const modal = document.createElement("div");
    modal.id = "post-options-modal";
    modal.className = "ts-modal";

    modal.innerHTML = `
      <div class="ts-modal-panel" style="padding:10px 18px 25px">
        <div style="width:42px;height:4px;border-radius:10px;background:#475569;margin:4px auto 17px"></div>
        ${isMine ? `
          <button class="post-menu-item" id="edit-post-option">✏️ Edit Post</button>
          <button class="post-menu-item" id="delete-post-option" style="color:#fb7185">🗑 Delete Post</button>
        ` : ""}
        <button class="post-menu-item" id="report-post-option" style="color:#fb7185">⚑ Report Post</button>
        <button class="post-menu-item" id="cancel-post-option" style="color:#94a3b8">Cancel</button>
      </div>`;

    const menuStyle = document.createElement("style");
    menuStyle.textContent = `
      .post-menu-item {
        display:block;width:100%;text-align:left;padding:16px 8px;
        background:none;border:0;border-bottom:1px solid rgba(255,255,255,.07);
        color:#e2e8f0;font-size:14px;font-weight:700;
      }`;
    modal.appendChild(menuStyle);
    document.body.appendChild(modal);

    modal.onclick = e => { if (e.target === modal) modal.remove(); };
    modal.querySelector("#cancel-post-option").onclick = () => modal.remove();
    modal.querySelector("#edit-post-option")?.addEventListener("click", () => window.handleEditPostModal(postId));
    modal.querySelector("#delete-post-option")?.addEventListener("click", () => window.handleDeletePost(postId));
    modal.querySelector("#report-post-option").onclick = () => window.handleReportPost(postId);
  };

  window.handleReportPost = async function(postId) {
    document.getElementById("post-options-modal")?.remove();

    const reason = prompt(
      "Select report reason:\n1. Non-educational content\n2. Promotion / Spam\n3. Inappropriate material"
    );
    if (!reason) return;

    const result = await window.api(`/api/posts/${postId}/report`, {
      method:"POST",
      body:JSON.stringify({ reason })
    });

    alert(result.success
      ? "Post reported successfully."
      : (result.message || "Could not report post"));
  };

  window.handleDeletePost = async function(postId) {
    document.getElementById("post-options-modal")?.remove();
    if (!confirm("Are you sure you want to delete this post?")) return;

    const result = await window.api(`/api/posts/${postId}`, {
      method:"DELETE"
    });

    if (result.success) loadPosts();
    else alert(result.message || "Could not delete post");
  };

  window.handleEditPostModal = async function(postId) {
    document.getElementById("post-options-modal")?.remove();

    const caption = prompt("Edit your lesson caption:");
    if (caption === null) return;

    const result = await window.api(`/api/posts/${postId}`, {
      method:"PATCH",
      body:JSON.stringify({ caption:caption.trim() })
    });

    if (result.success) loadPosts();
    else alert(result.message || "Could not edit post");
  };

  window.togglePostLike = async function(postId, button) {
    if (!button || button.dataset.loading === "1") return;
    button.dataset.loading = "1";

    try {
      const result = await window.api(`/api/posts/${postId}/like`, {
        method:"POST"
      });

      if (result.success) {
        button.classList.toggle("liked", !!result.liked);
        const count = button.querySelector("span");
        if (count) count.textContent = Number(result.likesCount || 0);
      }
    } finally {
      button.dataset.loading = "0";
    }
  };

  window.openFullscreenPostViewer = async function(initialPostId) {
    document.getElementById("fullscreen-reel-viewer")?.remove();

    const viewer = document.createElement("div");
    viewer.id = "fullscreen-reel-viewer";

    viewer.innerHTML = `
      <div class="reel-topbar">
        <button class="reel-back-btn" id="reel-back-btn">← Back</button>
        <div class="reel-top-title">TELESUPAR Reels</div>
        <button class="reel-create-btn" id="reel-create-btn">＋</button>
      </div>
      <div class="reel-slides" id="reel-slides">
        <div style="height:100%;display:grid;place-items:center;color:#94a3b8">
          Loading Reels...
        </div>
      </div>`;

    document.body.appendChild(viewer);

    const slides = viewer.querySelector("#reel-slides");
    const back = viewer.querySelector("#reel-back-btn");

    back.onclick = () => {
      viewer.querySelectorAll("video").forEach(v => v.pause());
      viewer.remove();
    };

    viewer.querySelector("#reel-create-btn").onclick = () => {
      window.openCreatePostModal();
    };

    const result = await window.api("/api/posts/feed");

    if (!result.success || !result.posts?.length) {
      slides.innerHTML = `
        <div style="height:100%;display:grid;place-items:center;text-align:center;color:#94a3b8;padding:30px">
          <div>
            <div style="font-size:40px">🎬</div>
            <h3 style="color:white">No Reels Yet</h3>
            <p>Share your first educational Reel.</p>
            <button class="btn-pill" id="empty-create-reel">＋ Create Reel</button>
          </div>
        </div>`;
      slides.querySelector("#empty-create-reel").onclick = () => window.openCreatePostModal();
      return;
    }

    const posts = result.posts.slice();

    if (initialPostId) {
      const index = posts.findIndex(p => String(p.id) === String(initialPostId));
      if (index > 0) posts.unshift(posts.splice(index, 1)[0]);
    }

    slides.innerHTML = posts.map(post => {
      let caption = post.caption || "";
      let category = "";

      if (caption.startsWith("[")) {
        const end = caption.indexOf("]");
        if (end !== -1) {
          category = caption.slice(1, end);
          caption = caption.slice(end + 1).trim();
        }
      }

      const media = safeUrl(post.mediaUrl);
      const user = post.user || {};
      const postUserId = resolveUserId(user, post);
      const isVideo = post.mediaType === "video";

      return `
        <section class="reel-slide" data-postid="${esc(post.id)}">
          ${media ? (
            isVideo
              ? `<video class="reel-media" src="${esc(media)}" loop playsinline preload="metadata"></video>`
              : `<img class="reel-media" src="${esc(media)}" draggable="false">`
          ) : `
            <div style="position:absolute;inset:0;display:grid;place-items:center;padding:35px;text-align:center;background:radial-gradient(circle at 50% 40%,#312e81,#080c16)">
              <div>
                <div style="font-size:40px">📚</div>
                <h2>${esc(category || "Study Notes")}</h2>
                <p>${esc(caption)}</p>
              </div>
            </div>
          `}

          <div class="reel-shade"></div>
          <div class="reel-play-indicator">▶</div>

          <div class="reel-action-rail">
            <button class="reel-action-btn reel-like-btn ${post.likedByMe ? "liked" : ""}"
              data-postid="${esc(post.id)}">
              <span>♥</span>
              <span class="reel-like-count">${Number(post.likesCount || 0)}</span>
            </button>

            <button class="reel-action-btn reel-comment-btn" data-postid="${esc(post.id)}">
              <span>💬</span>
              <span>${Number(post.commentsCount || 0)}</span>
            </button>

            <button class="reel-action-btn reel-share-btn" data-postid="${esc(post.id)}">
              <span>↗</span>
              <span>Share</span>
            </button>
          </div>

          <div class="reel-bottom-info">
            <div class="reel-creator" data-userid="${esc(postUserId)}">
              <img src="${esc(window.avatarUrl(user))}">
              <span class="reel-creator-name">${esc(user.displayName || user.username || "TELESUPAR User")}</span>
              ${!post.isMyPost ? (
                post.isFollowing
                  ? `<button class="btn-msg-post reel-message-btn" data-userid="${esc(postUserId)}">Message</button>`
                  : `<button class="btn-follow-post reel-follow-btn" data-userid="${esc(postUserId)}">Follow</button>`
              ) : ""}
            </div>

            ${category ? `<div class="reel-category">📚 ${esc(category)}</div>` : ""}
            ${caption ? `<div class="reel-caption">${esc(caption)}</div>` : ""}
          </div>
        </section>`;
    }).join("");

    const videos = slides.querySelectorAll("video.reel-media");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          videos.forEach(other => {
            if (other !== video) other.pause();
          });
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, {
      root: slides,
      threshold: [0, 0.7, 1]
    });

    videos.forEach(video => observer.observe(video));

    slides.querySelectorAll(".reel-slide").forEach(slide => {
      const media = slide.querySelector(".reel-media");
      const indicator = slide.querySelector(".reel-play-indicator");

      if (media && media.tagName === "VIDEO") {
        media.addEventListener("click", () => {
          if (media.paused) {
            media.play().catch(() => {});
            indicator.textContent = "▶";
          } else {
            media.pause();
            indicator.textContent = "Ⅱ";
          }
          indicator.classList.add("show");
          setTimeout(() => indicator.classList.remove("show"), 650);
        });
      }
    });

    slides.querySelectorAll(".reel-like-btn").forEach(button => {
      button.onclick = async () => {
        if (button.dataset.loading === "1") return;
        button.dataset.loading = "1";

        try {
          const id = button.dataset.postid;
          const response = await window.api(`/api/posts/${id}/like`, {
            method:"POST"
          });

          if (response.success) {
            button.classList.toggle("liked", !!response.liked);
            button.querySelector(".reel-like-count").textContent =
              Number(response.likesCount || 0);
          }
        } finally {
          button.dataset.loading = "0";
        }
      };
    });

    slides.querySelectorAll(".reel-comment-btn").forEach(button => {
      button.onclick = () => {
        window.openReelCommentsModal(button.dataset.postid);
      };
    });

    slides.querySelectorAll(".reel-share-btn").forEach(button => {
      button.onclick = async () => {
        const id = button.dataset.postid;
        const url = `${location.origin}${location.pathname}#post-${encodeURIComponent(id)}`;

        try {
          if (navigator.share) {
            await navigator.share({
              title:"TELESUPAR Educational Reel",
              text:"Watch this educational post on TELESUPAR",
              url
            });
          } else if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(url);
            alert("Link copied!");
          } else {
            prompt("Copy this link:", url);
          }
        } catch (error) {
          if (error.name !== "AbortError") console.error(error);
        }
      };
    });

    slides.querySelectorAll(".reel-creator").forEach(el => {
      el.addEventListener("click", e => {
        if (e.target.closest("button")) return;
        const userId = el.dataset.userid;
        if (userId && window.openUserProfile) {
          window.openUserProfile(userId);
        }
      });
    });

    slides.querySelectorAll(".reel-follow-btn").forEach(button => {
      button.onclick = async () => {
        const userId = button.dataset.userid;
        if (!userId) return;

        button.disabled = true;
        const response = await window.api(`/api/users/${userId}/follow`, {
          method:"POST"
        });

        if (response.success) {
          button.outerHTML = `<button class="btn-msg-post reel-message-btn" data-userid="${idSafe(userId)}">Message</button>`;
        } else {
          button.disabled = false;
          alert(response.message || "Could not follow user");
        }
      };
    });

    if (initialPostId) {
      const target = slides.querySelector(
        `.reel-slide[data-postid="${CSS.escape(String(initialPostId))}"]`
      );
      if (target) target.scrollIntoView({ block:"start" });
    }
  };
})();

/* =====================================================
   TELESUPAR HOME FIX - COMMENTS, STORY STATS & UI
===================================================== */

(() => {
  "use strict";

  if (window.__TS_HOME_FIX_PART1__) return;
  window.__TS_HOME_FIX_PART1__ = true;

  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));

  const avatarV3 = user => window.avatarUrl ? window.avatarUrl(user || {}) : "";

  window.TSOpenHomeProfile = function(userId) {
    if (!userId) return;
    if (typeof window.openUserExploreProfile === "function") {
      window.openUserExploreProfile(String(userId));
    } else {
      console.error("Explore profile function is not available yet.");
    }
  };

  window.openUserProfile = function(userId) {
    const id = String(userId || "").trim();
    if (!id) {
      console.error("TELESUPAR: User ID is empty.");
      return;
    }
    if (typeof window.openUserExploreProfile === "function") {
      return window.openUserExploreProfile(id);
    }
    console.error("TELESUPAR: Explore profile function not loaded.");
  };

  if (!document.getElementById("ts-home-fix-comments-css")) {
    const style = document.createElement("style");
    style.id = "ts-home-fix-comments-css";
    style.textContent = `
      .tsfix-comment {
        display:flex;
        gap:10px;
        padding:12px 0;
        border-bottom:1px solid rgba(255,255,255,.07);
      }
      .tsfix-comment-avatar {
        width:36px;
        height:36px;
        flex-shrink:0;
        border-radius:50%;
        object-fit:cover;
        cursor:pointer;
      }
      .tsfix-comment-content {
        flex:1;
        min-width:0;
      }
      .tsfix-comment-user {
        color:#f8fafc;
        background:none;
        border:0;
        padding:0;
        font-size:12px;
        font-weight:800;
        cursor:pointer;
      }
      .tsfix-comment-text {
        color:#dbe4f0;
        font-size:13px;
        line-height:1.5;
        margin-top:5px;
        overflow-wrap:anywhere;
      }
      .tsfix-comment-actions {
        display:flex;
        gap:15px;
        margin-top:7px;
        flex-wrap:wrap;
      }
      .tsfix-comment-actions button {
        background:none;
        border:0;
        color:#a5b4fc;
        font-size:11px;
        font-weight:700;
        padding:2px 0;
        cursor:pointer;
      }
      .tsfix-replies {
        margin:8px 0 5px 13px;
        padding-left:12px;
        border-left:2px solid rgba(139,92,246,.4);
      }
      .tsfix-reel-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        overflow: hidden;
      }
      .tsfix-list {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
      }
      .tsfix-composer {
        display:flex;
        gap:8px;
        position: sticky;
        bottom: 0;
        flex-shrink: 0;
        margin-top: auto;
        background: #111827;
        padding: 12px 0 calc(12px + env(safe-area-inset-bottom));
        z-index: 5;
      }
      .tsfix-composer input {
        flex:1;
        min-width:0;
        padding:11px 14px;
        color:white;
        background:#1e293b;
        border:1px solid rgba(255,255,255,.12);
        border-radius:25px;
        outline:none;
      }
      .tsfix-composer button {
        padding:0 17px;
        color:white;
        font-weight:800;
        border:0;
        border-radius:22px;
        background:linear-gradient(135deg,#6366f1,#9333ea);
      }
      .tsfix-empty {
        color:#94a3b8;
        text-align:center;
        padding:22px 8px;
        font-size:13px;
      }
    `;
    document.head.appendChild(style);
  }

  async function loadComments(postId, list) {
    list.innerHTML = `<p class="tsfix-empty">Loading comments...</p>`;

    const result = await window.api(
      `/api/posts/${encodeURIComponent(postId)}/comments`
    );

    if (!result.success) {
      list.innerHTML = `<p class="tsfix-empty">Could not load comments.</p>`;
      return;
    }

    const comments = result.comments || [];

    function renderComment(comment, isReply = false) {
      const user = comment.user || {};
      const userId = String(
        user.id ||
        user._id ||
        user.userId ||
        comment.userId ||
        comment.authorId ||
        ""
      );
      const avatar = window.avatarUrl(user);

      let actions = "";

      if (!isReply) {
        actions += `
          <button data-action="reply"
            data-id="${esc(comment.id)}">Reply</button>`;
      }

      if (comment.isMine && !isReply) {
        actions += `
          <button data-action="edit"
            data-id="${esc(comment.id)}">Edit</button>
          <button data-action="delete"
            data-id="${esc(comment.id)}">Delete</button>`;
      }

      return `
        <div class="tsfix-comment">
          <img class="tsfix-comment-avatar"
            data-profile="${esc(userId)}"
            src="${esc(avatar)}">

          <div class="tsfix-comment-content">
            <button class="tsfix-comment-user"
              data-profile="${esc(userId)}">
              ${esc(user.displayName || user.username || "User")}
            </button>

            <div class="tsfix-comment-text">${esc(comment.text)}</div>

            <div class="tsfix-comment-actions">
              ${actions}
            </div>
          </div>
        </div>`;
    }

    list.innerHTML = comments.length
      ? comments.map(comment => `
          <div class="tsfix-parent">
            ${renderComment(comment)}
            <div class="tsfix-replies">
              ${(comment.replies || [])
                .map(reply => renderComment(reply, true))
                .join("")}
            </div>
          </div>
        `).join("")
      : `<p class="tsfix-empty">No comments yet. Start the discussion!</p>`;
  }

  function setupComments(postId, container) {
    container.innerHTML = `
      <div class="tsfix-list"></div>
      <div class="tsfix-composer">
        <input class="tsfix-input"
          maxlength="500"
          placeholder="Write a comment...">
        <button class="tsfix-send">Send</button>
      </div>
    `;

    const list = container.querySelector(".tsfix-list");
    const input = container.querySelector(".tsfix-input");
    const send = container.querySelector(".tsfix-send");

    const refresh = () => loadComments(postId, list);

    send.onclick = async () => {
      const text = input.value.trim();
      if (!text) return;

      send.disabled = true;

      try {
        const result = await window.api(
          `/api/posts/${encodeURIComponent(postId)}/comments`,
          {
            method: "POST",
            body: JSON.stringify({ text })
          }
        );

        if (result.success) {
          input.value = "";
          await refresh();
        } else {
          alert(result.message || "Comment could not be sent.");
        }
      } finally {
        send.disabled = false;
      }
    };

    input.onkeydown = event => {
      if (event.key === "Enter") {
        event.preventDefault();
        send.click();
      }
    };

    list.onclick = async event => {
      const profile = event.target.closest("[data-profile]");

      if (profile) {
        window.TSOpenHomeProfile(profile.dataset.profile);
        return;
      }

      const button = event.target.closest("[data-action]");
      if (!button) return;

      const action = button.dataset.action;
      const commentId = button.dataset.id;

      if (!commentId) return;

      if (action === "reply") {
        const text = prompt("Write your reply:");
        if (!text || !text.trim()) return;

        const result = await window.api(
          `/api/posts/${encodeURIComponent(postId)}/comments/${encodeURIComponent(commentId)}/replies`,
          {
            method: "POST",
            body: JSON.stringify({ text: text.trim() })
          }
        );

        if (result.success) await refresh();
        else alert(result.message || "Reply failed.");
        return;
      }

      if (action === "edit") {
        const current = button
          .closest(".tsfix-comment")
          ?.querySelector(".tsfix-comment-text")
          ?.textContent || "";

        const text = prompt("Edit your comment:", current);
        if (text === null || !text.trim()) return;

        const result = await window.api(
          `/api/posts/${encodeURIComponent(postId)}/comments/${encodeURIComponent(commentId)}`,
          {
            method: "PATCH",
            body: JSON.stringify({ text: text.trim() })
          }
        );

        if (result.success) await refresh();
        else alert(result.message || "Edit failed.");
        return;
      }

      if (action === "delete") {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        const result = await window.api(
          `/api/posts/${encodeURIComponent(postId)}/comments/${encodeURIComponent(commentId)}`,
          { method: "DELETE" }
        );

        if (result.success) await refresh();
        else alert(result.message || "Delete failed.");
      }
    };

    refresh();
  }

  window.toggleComments = function(postId) {
    const box = document.getElementById(`comments-${postId}`);
    if (!box) return;

    box.classList.toggle("hidden");

    if (!box.classList.contains("hidden")) {
      setupComments(postId, box);
    }
  };

  window.openReelCommentsModal = function(postId) {
    document.getElementById("reel-comments-modal")?.remove();

    const modal = document.createElement("div");
    modal.id = "reel-comments-modal";
    modal.className = "ts-modal";

    modal.innerHTML = `
      <div class="ts-modal-panel"
        style="height:78vh;display:flex;flex-direction:column">
        <div style="display:flex;justify-content:space-between;
          align-items:center;padding-bottom:14px">
          <b>Comments & Replies</b>
          <button class="tsfix-close"
            style="background:none;border:0;color:white;font-size:22px">
            ✕
          </button>
        </div>
        <div class="tsfix-reel-content"
          style="flex:1;overflow:auto"></div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".tsfix-close").onclick = () => modal.remove();
    modal.onclick = event => {
      if (event.target === modal) modal.remove();
    };

    setupComments(
      postId,
      modal.querySelector(".tsfix-reel-content")
    );
  };

  function openStoryPeopleModalV3(title, people, count, emptyText) {
    document.getElementById("tsv3-story-people")?.remove();

    const modal = document.createElement("div");
    modal.id = "tsv3-story-people";
    modal.style.cssText = `
      position:fixed;inset:0;z-index:99999;
      background:rgba(0,0,0,.75);
      display:flex;align-items:flex-end;justify-content:center;
      padding:12px;
    `;

    const list = (people || []).map(item => {
      const user = item.user || item;
      const id = user.id || "";
      const name = user.displayName || user.username || "User";

      return `
        <button data-v3-person="${esc(id)}"
          style="width:100%;display:flex;align-items:center;
          gap:12px;padding:12px;background:transparent;
          border:0;border-bottom:1px solid rgba(255,255,255,.07);
          color:white;text-align:left">

          <img src="${esc(avatarV3(user))}"
            style="width:42px;height:42px;border-radius:50%;
            object-fit:cover">

          <span style="flex:1;min-width:0">
            <b style="font-size:13px">${esc(name)}</b>
            <small style="display:block;color:#94a3b8;margin-top:3px">
              ${esc(user.username ? "@" + user.username : "")}
            </small>
          </span>

          <span style="color:#a5b4fc">›</span>
        </button>`;
    }).join("");

    modal.innerHTML = `
      <div style="width:100%;max-width:480px;max-height:70vh;
        overflow:hidden;background:#111827;
        border:1px solid rgba(255,255,255,.12);
        border-radius:22px;padding:17px">

        <div style="display:flex;align-items:center;
          justify-content:space-between;margin-bottom:12px">
          <b style="font-size:16px">${esc(title)} (${Number(count || 0)})</b>
          <button id="v3-close-people"
            style="background:none;border:0;color:white;font-size:22px">
            ✕
          </button>
        </div>

        <div style="overflow:auto;max-height:55vh">
          ${list || `<p class="tsfix-empty">${esc(emptyText)}</p>`}
        </div>
      </div>`;

    document.body.appendChild(modal);

    modal.querySelector("#v3-close-people").onclick = () => modal.remove();
    modal.onclick = event => {
      if (event.target === modal) modal.remove();
    };

    modal.querySelectorAll("[data-v3-person]").forEach(button => {
      button.onclick = () => {
        const id = button.dataset.v3Person;
        modal.remove();
        window.TSOpenHomeProfile(id);
      };
    });
  }

  async function showStoryPeopleV3(storyId, type) {
    if (!storyId) return;

    const endpoint = type === "views"
      ? `/api/stories/${storyId}/viewers`
      : `/api/stories/${storyId}/likes`;

    const result = await window.api(endpoint);

    if (!result.success) {
      alert(result.message || "Could not load story activity");
      return;
    }

    if (type === "views") {
      openStoryPeopleModalV3(
        "Story Viewers",
        result.viewers || [],
        result.viewsCount,
        "No viewers yet."
      );
    } else {
      openStoryPeopleModalV3(
        "Story Likes",
        result.likes || [],
        result.likesCount,
        "No likes yet."
      );
    }
  }

  async function attachStoryStatsV3(viewer) {
    const bottom = viewer.querySelector(".story-viewer-bottom");
    const media = viewer.querySelector(".story-viewer-media");

    if (!bottom || !media || bottom.dataset.v3Stats === "1") return;

    const feed = await window.api("/api/stories/feed");
    if (!feed.success) return;

    const mediaUrl = media.getAttribute("src") || media.src || "";
    const mine = feed.myStories || [];
    const story = mine.find(item => String(item.mediaUrl || "") === String(mediaUrl));

    if (!story) return;

    bottom.dataset.v3Stats = "1";

    const buttons = document.createElement("div");
    buttons.style.cssText = `
      display:flex;gap:7px;align-items:center;
      flex-wrap:wrap;margin-right:auto;
    `;

    buttons.innerHTML = `
      <button class="btn-pill" data-v3-story-views>
        👁 ${Number(story.viewsCount || 0)} Views
      </button>
      <button class="btn-pill" data-v3-story-likes>
        ♥ ${Number(story.likesCount || 0)} Likes
      </button>
    `;

    bottom.insertBefore(buttons, bottom.firstChild);

    buttons.querySelector("[data-v3-story-views]").onclick =
      () => showStoryPeopleV3(story.id, "views");

    buttons.querySelector("[data-v3-story-likes]").onclick =
      () => showStoryPeopleV3(story.id, "likes");
  }

  const storyObserverV3 = new MutationObserver(() => {
    document.querySelectorAll(".story-viewer").forEach(viewer => {
      attachStoryStatsV3(viewer).catch(error =>
        console.error("Story stats:", error)
      );
    });
  });

  storyObserverV3.observe(document.body, {
    childList:true,
    subtree:true
  });

  function sharePostV3(postId) {
    const url =
      `${location.origin}${location.pathname}#post-${encodeURIComponent(postId)}`;

    if (navigator.share) {
      navigator.share({
        title:"TELESUPAR",
        text:"Check out this post on TELESUPAR",
        url
      }).catch(error => {
        if (error.name !== "AbortError") console.error(error);
      });
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => alert("Post link copied!"))
        .catch(() => prompt("Copy post link:", url));
    } else {
      prompt("Copy post link:", url);
    }
  }

  document.addEventListener("click", event => {
    const button = event.target.closest(".reel-message-btn");
    if (!button) return;

    const userId = button.dataset.userid;
    if (!userId) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const viewer = document.getElementById("fullscreen-reel-viewer");
    if (viewer) {
      viewer.querySelectorAll("video").forEach(video => {
        video.pause();
      });
      viewer.remove();
    }

    setTimeout(() => {
      if (typeof window.openDirectChat === "function") {
        window.openDirectChat(userId);
      }
    }, 80);
  }, true);

  function updatePostActionsV3() {
    document.querySelectorAll(".post-card .post-actions button")
      .forEach(button => {
        const code = button.getAttribute("onclick") || "";

        if (code.includes("toggleComments")) {
          if (button.dataset.v3Icon === "1") return;

          const count = button.querySelector("span")?.textContent || "0";

          button.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5
              8.5 8.5 0 0 1-4-.99L3 21l1.99-5.5
              A8.5 8.5 0 1 1 21 11.5Z"/>
            </svg>
            <span>${esc(count)}</span>`;

          button.dataset.v3Icon = "1";
        }

        if (code.includes("openFullscreenPostViewer")) {
          if (button.dataset.v3Share === "1") return;

          const match = code.match(/openFullscreenPostViewer\(['"]([^'"]+)/);
          const postId = match?.[1];

          if (!postId) return;

          button.removeAttribute("onclick");
          button.dataset.v3Share = "1";
          button.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4"/>
            </svg>
            <span>Share</span>`;

          button.onclick = () => sharePostV3(postId);
        }
      });
  }

  function updateReelIconV3() {
    const header = document.querySelector(".top-header") ||
      document.querySelector(".top-header, header");

    if (!header) return;

    header.querySelectorAll("button").forEach(button => {
      const label = button.textContent.trim();

      if (
        button.dataset.v3ReelIcon === "1" ||
        !["▶", "🎬", "Reels", "Reel"].includes(label)
      ) return;

      button.innerHTML = `
        <svg width="23" height="23" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5"/>
          <path d="M8 3l4 5M15 3l4 5M3 10h18"/>
          <path d="M10 14l5 3-5 3z"
            fill="currentColor" stroke="none"/>
        </svg>`;

      button.style.borderRadius = "14px";
      button.style.background = "rgba(139,92,246,.14)";
      button.style.border = "1px solid rgba(139,92,246,.3)";
      button.style.color = "#c4b5fd";
      button.dataset.v3ReelIcon = "1";
    });
  }

  const homeObserverV3 = new MutationObserver(() => {
    updatePostActionsV3();
    updateReelIconV3();
  });

  const mainView = document.getElementById("main-view");
  if (mainView) {
    homeObserverV3.observe(mainView, {
      childList:true,
      subtree:true
    });
  }

  updatePostActionsV3();
  updateReelIconV3();
})();
