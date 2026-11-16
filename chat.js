(function() {
  const style = document.createElement("style");
  style.textContent = `
    .chat-list-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); cursor: pointer;
    }
    .chat-list-item:hover { background: rgba(255,255,255,0.03); }
    .chat-avatar-wrap { position: relative; }
    .chat-avatar-wrap img { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; }
    .status-indicator {
      position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px;
      border-radius: 50%; background: #10b981; border: 2px solid #090d16;
    }
    .unread-pill {
      background: #14b8a6; color: #042f2e; font-weight: 800; font-size: 11px;
      min-width: 20px; height: 20px; border-radius: 99px; display: grid; place-items: center; padding: 0 6px;
    }

    /* Active Conversation Room */
    .chat-room {
      position: fixed; inset: 0; background: #090d16; z-index: 90;
      display: flex; flex-direction: column;
    }
    .chat-room-header {
      display: flex; align-items: center; justify-content: space-between; padding: 12px 14px;
      background: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); z-index: 10;
    }
    .chat-room-user-info { display: flex; align-items: center; gap: 10px; cursor: pointer; flex: 1; }
    .messages-area {
      flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 8px;
      background: radial-gradient(circle at top right, rgba(99,102,241,0.08), transparent);
    }
    .msg-bubble {
      max-width: 78%; padding: 10px 14px; border-radius: 18px; font-size: 14px; line-height: 1.4; position: relative;
    }
    .msg-mine {
      align-self: flex-end; background: #6366f1; color: #fff;
      border-bottom-right-radius: 4px;
    }
    .msg-theirs {
      align-self: flex-start; background: #1e293b; color: #f8fafc;
      border-bottom-left-radius: 4px;
    }
    .msg-meta { font-size: 10px; opacity: 0.75; margin-top: 4px; text-align: right; }
    .chat-input-bar {
      display: flex; gap: 8px; padding: 10px 12px; background: #111827;
      border-top: 1px solid rgba(255,255,255,0.08); align-items: center; z-index: 10;
    }
    .chat-text-input {
      flex: 1; background: #1e293b; border: none; border-radius: 99px;
      padding: 11px 16px; color: #fff; font-size: 14px; outline: none;
    }

    /* Glassmorphism Popup Menu */
    .tg-popup-menu {
      position: fixed; top: 62px; right: 14px; width: 220px;
      background: rgba(17, 24, 39, 0.94); backdrop-filter: blur(18px);
      border: 1px solid rgba(255,255,255,0.14); border-radius: 18px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.75); z-index: 200; padding: 6px 0;
    }
    .tg-popup-item {
      padding: 12px 16px; font-size: 13px; color: #f8fafc; cursor: pointer;
      display: flex; align-items: center; gap: 12px; transition: 0.15s;
    }
    .tg-popup-item:hover { background: rgba(255,255,255,0.07); }

    /* Chat Info / Vault Screen */
    .tg-profile-view {
      position: fixed; inset: 0; background: #090d16; z-index: 110;
      display: flex; flex-direction: column; overflow-y: auto;
    }
    .tg-profile-header {
      padding: 14px; display: flex; align-items: center; background: #111827;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .tg-profile-hero { padding: 24px 16px; text-align: center; background: #111827; margin-bottom: 12px; }
    .tg-action-buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 18px; }
    .tg-action-btn {
      background: #1e293b; border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px; padding: 12px 6px; color: #fff; font-size: 12px; font-weight: 600;
      display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer;
    }
    .tg-action-btn.muted-active {
      background: rgba(239, 68, 68, 0.16); border-color: rgba(239, 68, 68, 0.4); color: #fca5a5;
    }
    .tg-tabs-bar { display: flex; border-bottom: 1px solid rgba(255,255,255,0.08); background: #111827; }
    .tg-profile-tab {
      flex: 1; text-align: center; padding: 12px; font-size: 13px; font-weight: 700; color: #94a3b8; cursor: pointer;
      border-bottom: 2px solid transparent;
    }
    .tg-profile-tab.active { color: #38bdf8; border-bottom-color: #38bdf8; }

    /* Instagram-Style Public Profile View */
    .ig-profile-modal {
      position: fixed; inset: 0; background: #090d16; z-index: 150;
      display: flex; flex-direction: column; overflow-y: auto;
    }
    .ig-top-bar {
      position: sticky; top: 0; background: #090d16; z-index: 10;
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .ig-header-stats {
      display: flex; align-items: center; gap: 20px; padding: 18px 16px 10px;
    }
    .ig-dp {
      width: 82px; height: 82px; border-radius: 50%; object-fit: cover;
      border: 2px solid #ec4899; padding: 2px;
    }
    .ig-stats-row {
      flex: 1; display: flex; justify-content: space-around; text-align: center;
    }
    .ig-stat-val { font-size: 17px; font-weight: 800; color: #fff; }
    .ig-stat-lbl { font-size: 12px; color: #94a3b8; }
    .ig-bio-section { padding: 4px 16px 14px; }
    .ig-btn-row { display: flex; gap: 8px; padding: 0 16px 16px; }
    .ig-btn {
      flex: 1; padding: 9px; border-radius: 10px; font-size: 13px; font-weight: 700;
      border: none; cursor: pointer; text-align: center;
    }
    .ig-btn-primary { background: #3b82f6; color: #fff; }
    .ig-btn-secondary { background: #1e293b; color: #fff; border: 1px solid rgba(255,255,255,0.1); }
    .ig-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 6px; }
    .ig-grid-item { aspect-ratio: 1/1; background: #111827; overflow: hidden; }
    .ig-grid-item img, .ig-grid-item video { width: 100%; height: 100%; object-fit: cover; }
  `;
  document.head.appendChild(style);

  // Real Mute State Helper (Persisted in localStorage)
  function getMutedUsers() {
    return JSON.parse(localStorage.getItem("ts_muted_users") || "{}");
  }
  function isUserMuted(userId) {
    return !!getMutedUsers()[userId];
  }
  function toggleUserMute(userId) {
    const muted = getMutedUsers();
    if (muted[userId]) {
      delete muted[userId];
    } else {
      muted[userId] = true;
    }
    localStorage.setItem("ts_muted_users", JSON.stringify(muted));
    return !!muted[userId];
  }

  window.renderChat = async function(container) {
    const mainHeader = document.querySelector(".top-header");
    const bottomNav = document.querySelector(".bottom-nav");
    if (mainHeader) mainHeader.classList.remove("hidden");
    if (bottomNav) bottomNav.classList.remove("hidden");

    if (window.AppState.activeConversation) {
      renderConversationRoom(container, window.AppState.activeConversation);
      return;
    }

    container.innerHTML = `
      <div style="padding:14px 16px 6px; font-size:13px; font-weight:700; color:#94a3b8;">RECENT CHATS</div>
      <div id="conversations-list"><p style="text-align:center; color:#94a3b8; padding:30px;">Loading chats...</p></div>
    `;

    const data = await window.api("/api/conversations");
    const listEl = document.getElementById("conversations-list");
    if (!data.success || !data.conversations.length) {
      listEl.innerHTML = `<p style="text-align:center; color:#94a3b8; padding:40px;">No chats yet. Go to Explore to message someone!</p>`;
      return;
    }

    listEl.innerHTML = data.conversations.map(c => {
      const muted = isUserMuted(c.otherUser.id);
      return `
        <div class="chat-list-item" data-conv-id="${c.id}">
          <div style="display:flex; gap:12px; align-items:center;">
            <div class="chat-avatar-wrap">
              <img src="${window.avatarUrl(c.otherUser)}" />
              ${c.otherUser.isOnline ? '<span class="status-indicator"></span>' : ""}
            </div>
            <div>
              <div style="font-weight:700; font-size:15px;">
                ${c.otherUser.displayName} ${muted ? '<span style="font-size:12px; opacity:0.7;">🔕</span>' : ""}
              </div>
              <div style="font-size:12px; color:#94a3b8; max-width:220px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${c.lastMessage || "Tap to start chatting"}
              </div>
            </div>
          </div>
          ${c.unreadCount > 0 ? `<span class="unread-pill" style="${muted ? 'background:#334155; color:#cbd5e1;' : ''}">${c.unreadCount}</span>` : ""}
        </div>
      `;
    }).join("");

    listEl.querySelectorAll(".chat-list-item").forEach((el, idx) => {
      el.onclick = () => {
        window.AppState.activeConversation = data.conversations[idx];
        renderConversationRoom(container, data.conversations[idx]);
      };
    });
  };

  async function renderConversationRoom(container, conv) {
    const myId = window.AppState.user.id;
    const other = conv.otherUser;

    const mainHeader = document.querySelector(".top-header");
    const bottomNav = document.querySelector(".bottom-nav");
    if (mainHeader) mainHeader.classList.add("hidden");
    if (bottomNav) bottomNav.classList.add("hidden");

    const muted = isUserMuted(other.id);

    container.innerHTML = `
      <div class="chat-room" id="active-chat-room">
        <div class="chat-room-header">
          <div style="display:flex; align-items:center; gap:10px; flex:1;">
            <button id="back-to-chats" style="background:none; border:none; color:#fff; font-size:20px; cursor:pointer;">←</button>
            <div class="chat-room-user-info" id="open-user-vault">
              <img src="${window.avatarUrl(other)}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;" />
              <div>
                <div style="font-weight:700; font-size:15px;">
                  ${other.displayName} <span id="header-mute-badge">${muted ? "🔕" : ""}</span>
                </div>
                <div id="chat-sub-status" style="font-size:11px; color:#14b8a6;">
                  ${other.isOnline ? "Online" : "last seen recently"}
                </div>
              </div>
            </div>
          </div>
          <button id="btn-chat-menu" class="icon-btn" style="background:transparent; border:none; font-size:20px;">⋮</button>
        </div>

        <div class="messages-area" id="messages-area"></div>

        <div class="chat-input-bar">
          <label style="cursor:pointer; font-size:20px; padding:0 4px;">
            📎
            <input type="file" id="chat-attach-input" hidden />
          </label>
          <input type="text" id="chat-msg-input" class="chat-text-input" placeholder="Message" />
          <button id="chat-send-btn" class="icon-btn" style="background:#14b8a6; border:none;">➤</button>
        </div>
      </div>
    `;

    // Three Dots Popup in Chat Header
    document.getElementById("btn-chat-menu").onclick = (e) => {
      e.stopPropagation();
      openMorePopup(other, container);
    };

    // Click on DP/Name to open Chat Details View (27714.png)
    document.getElementById("open-user-vault").onclick = () => openChatDetailsView(other, container, conv);

    const socket = window.AppState.socket;
    if (socket) {
      socket.emit("joinConversation", conv.id);
      socket.off("newMessage").on("newMessage", (msg) => {
        if (msg.conversationId === conv.id) {
          appendMessage(msg, myId);
          // Play notification beep only if user is NOT muted
          if (msg.senderId !== myId && !isUserMuted(other.id)) {
            playBeep();
          }
        }
      });
      socket.off("typing").on("typing", (data) => {
        if (data.conversationId === conv.id) {
          document.getElementById("chat-sub-status").textContent = data.isTyping ? "typing..." : (other.isOnline ? "Online" : "last seen recently");
        }
      });
    }

    document.getElementById("back-to-chats").onclick = () => {
      if (socket) socket.emit("leaveConversation", conv.id);
      window.AppState.activeConversation = null;
      if (mainHeader) mainHeader.classList.remove("hidden");
      if (bottomNav) bottomNav.classList.remove("hidden");
      window.renderChat(container);
    };

    await window.api(`/api/conversations/${conv.id}/read`, { method: "POST" });
    const history = await window.api(`/api/conversations/${conv.id}/messages`);
    const area = document.getElementById("messages-area");
    area.innerHTML = "";
    if (history.success) {
      history.messages.forEach(m => appendMessage(m, myId));
    }

    const input = document.getElementById("chat-msg-input");
    input.oninput = () => {
      if (socket) socket.emit("typing", { conversationId: conv.id, isTyping: input.value.length > 0 });
    };

    document.getElementById("chat-send-btn").onclick = async () => {
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      if (socket) socket.emit("typing", { conversationId: conv.id, isTyping: false });
      await window.api(`/api/conversations/${conv.id}/messages`, {
        method: "POST",
        body: JSON.stringify({ text })
      });
    };

    document.getElementById("chat-attach-input").onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      await window.api(`/api/conversations/${conv.id}/attachments`, { method: "POST", body: fd });
    };
  }

  // Subtle notification sound when unmuted
  function playBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(620, ctx.currentTime);
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // Reusable More Options Popup (Call, Video Call, Block, Report, etc.)
  function openMorePopup(user, container) {
    const existing = document.getElementById("active-more-popup");
    if (existing) { existing.remove(); return; }

    const popup = document.createElement("div");
    popup.id = "active-more-popup";
    popup.className = "tg-popup-menu";
    popup.innerHTML = `
      <div class="tg-popup-item" id="pop-call">📞 Call</div>
      <div class="tg-popup-item" id="pop-video">📹 Video Call</div>
      <div class="tg-popup-item" id="pop-search">🔍 Search in Chat</div>
      <div class="tg-popup-item" id="pop-clear">🧹 Clear History</div>
      <div class="tg-popup-item" id="pop-block" style="color:#f87171;">🚫 Block User</div>
      <div class="tg-popup-item" id="pop-report" style="color:#ef4444;">⚠️ Report</div>
    `;
    document.body.appendChild(popup);

    const closePopup = () => popup.remove();
    setTimeout(() => document.addEventListener("click", closePopup, { once: true }), 10);

    popup.querySelector("#pop-call").onclick = () => alert(`Calling ${user.displayName}...`);
    popup.querySelector("#pop-video").onclick = () => alert(`Starting video call with ${user.displayName}...`);
    popup.querySelector("#pop-search").onclick = () => {
      const q = prompt("Search messages:");
      if (q) alert(`Searching "${q}" in conversation...`);
    };
    popup.querySelector("#pop-clear").onclick = () => {
      if (confirm("Clear all messages from view?")) {
        const area = document.getElementById("messages-area");
        if (area) area.innerHTML = "";
      }
    };
    popup.querySelector("#pop-block").onclick = () => {
      if (confirm(`Block ${user.displayName}?`)) {
        alert(`${user.displayName} has been blocked.`);
      }
    };
    popup.querySelector("#pop-report").onclick = () => {
      const reason = prompt("Reason for reporting this user:");
      if (reason) alert("Report submitted to TELESUPAR moderation team.");
    };
  }

  // Chat Details Screen (Message | Profile | Mute | More)
  async function openChatDetailsView(user, container, conv) {
    const room = document.getElementById("active-chat-room");
    if (room) room.style.display = "none";

    const profileView = document.createElement("div");
    profileView.className = "tg-profile-view";
    container.appendChild(profileView);

    let activeTab = "Files";

    async function renderDetailsContent() {
      const muted = isUserMuted(user.id);
      const res = await window.api(`/api/users/${user.id}/private-content`);
      const files = res.success ? (res.files || []) : [];
      const links = res.success ? (res.links || []) : [];

      profileView.innerHTML = `
        <div class="tg-profile-header">
          <button id="close-tg-profile" style="background:none; border:none; color:#fff; font-size:20px; cursor:pointer; margin-right:16px;">←</button>
          <div style="font-weight:700; font-size:16px;">Chat Info</div>
        </div>

        <div class="tg-profile-hero">
          <img src="${window.avatarUrl(user)}" style="width:96px; height:96px; border-radius:50%; object-fit:cover; margin-bottom:12px;" />
          <div style="font-weight:800; font-size:18px;">${user.displayName}</div>
          <div style="font-size:12px; color:#94a3b8; margin-top:2px;">
            ${muted ? "Notifications Muted 🔕" : (user.isOnline ? "Online" : "last seen recently")}
          </div>

          <!-- 4 Requested Buttons: Message | Profile | Mute | More -->
          <div class="tg-action-buttons">
            <div class="tg-action-btn" id="btn-act-message">
              <span style="font-size:18px;">💬</span> Message
            </div>
            <div class="tg-action-btn" id="btn-act-profile">
              <span style="font-size:18px;">👤</span> Profile
            </div>
            <div class="tg-action-btn ${muted ? "muted-active" : ""}" id="btn-act-mute">
              <span style="font-size:18px;">${muted ? "🔕" : "🔔"}</span> ${muted ? "Unmute" : "Mute"}
            </div>
            <div class="tg-action-btn" id="btn-act-more">
              <span style="font-size:18px;">⋮</span> More
            </div>
          </div>
        </div>

        <div style="background:#111827; padding:14px 16px; margin-bottom:12px;">
          <div style="font-weight:700; font-size:14px; color:#38bdf8;">@${user.username}</div>
          <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; margin-top:2px;">Username</div>
        </div>

        <div class="tg-tabs-bar">
          <div class="tg-profile-tab ${activeTab === "Files" ? "active" : ""}" data-tab="Files">Files</div>
          <div class="tg-profile-tab ${activeTab === "Links" ? "active" : ""}" data-tab="Links">Links</div>
          <div class="tg-profile-tab ${activeTab === "Groups" ? "active" : ""}" data-tab="Groups">Groups</div>
        </div>

        <div style="padding:16px; flex:1;">
          ${activeTab === "Files" ? (
            files.length ? files.map(f => `
              <div style="background:#111827; padding:12px; border-radius:12px; display:flex; align-items:center; gap:12px; margin-bottom:8px;">
                <span style="font-size:24px;">📄</span>
                <div style="flex:1; overflow:hidden;">
                  <div style="font-size:13px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${f.fileName}</div>
                  <div style="font-size:11px; color:#94a3b8;">${Math.round((f.size || 1024)/1024)} KB</div>
                </div>
              </div>
            `).join("") : `<p style="text-align:center; color:#64748b; padding:20px;">No shared files yet</p>`
          ) : ""}

          ${activeTab === "Links" ? (
            links.length ? links.map(l => `
              <div style="background:#111827; padding:12px; border-radius:12px; margin-bottom:8px;">
                <a href="${l.url}" target="_blank" style="color:#38bdf8; font-size:13px; text-decoration:none;">${l.url}</a>
              </div>
            `).join("") : `<p style="text-align:center; color:#64748b; padding:20px;">No shared links yet</p>`
          ) : ""}

          ${activeTab === "Groups" ? `<p style="text-align:center; color:#64748b; padding:20px;">No mutual groups in common</p>` : ""}
        </div>
      `;

      // Back to Chat
      profileView.querySelector("#close-tg-profile").onclick = () => {
        profileView.remove();
        if (room) room.style.display = "flex";
      };

      // 1. Message Button
      profileView.querySelector("#btn-act-message").onclick = () => {
        profileView.remove();
        if (room) room.style.display = "flex";
      };

      // 2. Profile Button -> Opens Instagram-Style Full Profile (27716.png)
      profileView.querySelector("#btn-act-profile").onclick = () => {
        openInstagramUserProfile(user, () => {
          profileView.remove();
          if (room) room.style.display = "flex";
        });
      };

      // 3. Real Mute Button
      profileView.querySelector("#btn-act-mute").onclick = () => {
        const nowMuted = toggleUserMute(user.id);
        const headerBadge = document.getElementById("header-mute-badge");
        if (headerBadge) headerBadge.textContent = nowMuted ? "🔕" : "";
        renderDetailsContent();
      };

      // 4. More Button -> Opens Glassmorphism Popup
      profileView.querySelector("#btn-act-more").onclick = (e) => {
        e.stopPropagation();
        openMorePopup(user, container);
      };

      profileView.querySelectorAll(".tg-profile-tab").forEach(tab => {
        tab.onclick = () => {
          activeTab = tab.dataset.tab;
          renderDetailsContent();
        };
      });
    }

    renderDetailsContent();
  }

  // Instagram-Style User Profile Screen (Matching 27716.png)
  async function openInstagramUserProfile(user, onMessageClick) {
    const igModal = document.createElement("div");
    igModal.className = "ig-profile-modal";
    document.body.appendChild(igModal);

    igModal.innerHTML = `<p style="text-align:center; color:#94a3b8; padding:40px;">Loading profile...</p>`;

    const [profileRes, followRes, feedRes] = await Promise.all([
      window.api(`/api/users/${user.id}/profile`),
      window.api(`/api/users/${user.id}/follow-status`),
      window.api("/api/posts/feed")
    ]);

    const fullUser = (profileRes.success && profileRes.profile) ? profileRes.profile : user;
    const userPosts = (feedRes.posts || []).filter(p => p.user.id === user.id);
    let isFollowing = followRes.success ? followRes.following : false;
    let followersCount = followRes.success ? followRes.followersCount : 0;
    const followingCount = followRes.success ? followRes.followingCount : 0;

    function renderIG() {
      igModal.innerHTML = `
        <div class="ig-top-bar">
          <div style="display:flex; align-items:center; gap:14px;">
            <button id="ig-back-btn" style="background:none; border:none; color:#fff; font-size:22px; cursor:pointer;">←</button>
            <div style="font-weight:800; font-size:17px;">${fullUser.username}</div>
          </div>
          <div style="display:flex; gap:14px; align-items:center;">
            <span style="font-size:18px;">🔔</span>
            <span id="ig-more-btn" style="font-size:20px; cursor:pointer;">⋮</span>
          </div>
        </div>

        <div class="ig-header-stats">
          <img src="${window.avatarUrl(fullUser)}" class="ig-dp" />
          <div class="ig-stats-row">
            <div>
              <div class="ig-stat-val">${userPosts.length}</div>
              <div class="ig-stat-lbl">posts</div>
            </div>
            <div>
              <div class="ig-stat-val" id="ig-followers-num">${followersCount}</div>
              <div class="ig-stat-lbl">followers</div>
            </div>
            <div>
              <div class="ig-stat-val">${followingCount}</div>
              <div class="ig-stat-lbl">following</div>
            </div>
          </div>
        </div>

        <div class="ig-bio-section">
          <div style="font-weight:700; font-size:14px; margin-bottom:3px;">${fullUser.displayName}</div>
          <div style="font-size:13px; color:#e2e8f0; line-height:1.4; white-space:pre-line;">
            ${fullUser.bio || "TELESUPAR Creator ✨"}
          </div>
          <div style="display:inline-block; background:#1e293b; padding:4px 10px; border-radius:99px; font-size:12px; color:#cbd5e1; margin-top:8px;">
            @ ${fullUser.username}
          </div>
        </div>

        <div class="ig-btn-row">
          <button id="ig-follow-toggle" class="ig-btn ${isFollowing ? "ig-btn-secondary" : "ig-btn-primary"}">
            ${isFollowing ? "Following ⌄" : "Follow"}
          </button>
          <button id="ig-msg-direct" class="ig-btn ig-btn-secondary">Message</button>
        </div>

        <div style="display:flex; justify-content:space-around; border-top:1px solid rgba(255,255,255,0.08); border-bottom:1px solid rgba(255,255,255,0.08); padding:10px 0;">
          <span style="font-size:18px; border-bottom:2px solid #fff; padding-bottom:4px;">⊞</span>
          <span style="font-size:18px; opacity:0.5;">▶</span>
          <span style="font-size:18px; opacity:0.5;">👤</span>
        </div>

        <div class="ig-grid">
          ${userPosts.length ? userPosts.map(p => `
            <div class="ig-grid-item">
              ${p.mediaUrl
                ? (p.mediaType === "video" ? `<video src="${p.mediaUrl}"></video>` : `<img src="${p.mediaUrl}" />`)
                : `<div style="padding:10px; font-size:11px; color:#cbd5e1;">${p.caption}</div>`}
            </div>
          `).join("") : `<p style="grid-column:1/-1; text-align:center; color:#64748b; padding:40px;">No posts yet</p>`}
        </div>
      `;

      igModal.querySelector("#ig-back-btn").onclick = () => igModal.remove();
      igModal.querySelector("#ig-more-btn").onclick = (e) => {
        e.stopPropagation();
        openMorePopup(fullUser, document.body);
      };

      igModal.querySelector("#ig-msg-direct").onclick = () => {
        igModal.remove();
        if (onMessageClick) onMessageClick();
      };

      igModal.querySelector("#ig-follow-toggle").onclick = async () => {
        const res = await window.api(`/api/users/${user.id}/follow`, {
          method: isFollowing ? "DELETE" : "POST"
        });
        if (res.success) {
          isFollowing = res.following;
          followersCount = res.followersCount;
          renderIG();
        }
      };
    }

    renderIG();
  }

  function appendMessage(msg, myId) {
    const area = document.getElementById("messages-area");
    if (!area) return;
    const isMine = msg.senderId === myId;
    const ticks = isMine ? (msg.seenAt ? "✓✓" : msg.deliveredAt ? "✓✓" : "✓") : "";

    let attachmentHtml = "";
    if (msg.attachment && msg.attachment.url) {
      if ((msg.attachment.mimeType || "").startsWith("image/")) {
        attachmentHtml = `<img src="${msg.attachment.url}" style="max-width:210px; border-radius:12px; display:block; margin-bottom:4px;" />`;
      } else {
        attachmentHtml = `<a href="${msg.attachment.url}" target="_blank" style="color:#93c5fd; font-size:12px;">📄 ${msg.attachment.fileName}</a>`;
      }
    }

    const div = document.createElement("div");
    div.className = `msg-bubble ${isMine ? "msg-mine" : "msg-theirs"}`;
    div.innerHTML = `
      ${attachmentHtml}
      ${msg.text ? `<div>${msg.text}</div>` : ""}
      <div class="msg-meta" style="color:${msg.seenAt ? "#38bdf8" : "inherit"}">${ticks}</div>
    `;
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
  }
})();
