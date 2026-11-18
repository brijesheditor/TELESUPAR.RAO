
(function () {
  // ==========================================
  // TELESUPAR CHAT - FRONTEND V1
  // Backend will be connected later.
  // ==========================================

  const style = document.createElement("style");

  style.textContent = `
    * { box-sizing: border-box; }

    .ts-chat-app {
      min-height: 100vh;
      background: #090d12;
      color: #f8fafc;
      font-family: inherit;
      padding-bottom: 80px;
    }

    /* INBOX HEADER */

    .ts-inbox-header {
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:20px 18px 14px;
    }

    .ts-inbox-title {
      font-size:26px;
      font-weight:850;
      letter-spacing:-.5px;
    }

    .ts-inbox-subtitle {
      color:#94a3b8;
      font-size:12px;
      margin-top:3px;
    }

    .ts-header-actions {
      display:flex;
      gap:12px;
    }

    .ts-icon-btn {
      width:42px;
      height:42px;
      border-radius:50%;
      background:#1c232c;
      color:white;
      border:1px solid #303945;
      font-size:21px;
      cursor:pointer;
    }

    /* SEARCH */

    .ts-search-box {
      margin:8px 16px 18px;
      display:flex;
      align-items:center;
      gap:10px;
      padding:13px 16px;
      border-radius:30px;
      background:#222830;
      color:#aab4c2;
    }

    .ts-search-box input {
      flex:1;
      min-width:0;
      border:0;
      outline:0;
      background:transparent;
      color:white;
      font-size:14px;
    }

    /* NOTES / STORIES */

    .ts-notes-section {
      display:flex;
      gap:18px;
      overflow-x:auto;
      padding:4px 18px 20px;
      scrollbar-width:none;
    }

    .ts-notes-section::-webkit-scrollbar {
      display:none;
    }

    .ts-note-item {
      min-width:68px;
      text-align:center;
    }

    .ts-note-avatar {
      width:62px;
      height:62px;
      margin:auto;
      border-radius:50%;
      padding:3px;
      border:2px solid #5965ff;
      position:relative;
    }

    .ts-note-avatar img {
      width:100%;
      height:100%;
      object-fit:cover;
      border-radius:50%;
    }

    .ts-note-add {
      position:absolute;
      right:-2px;
      bottom:0;
      background:#5965ff;
      border:2px solid #090d12;
      color:white;
      width:21px;
      height:21px;
      border-radius:50%;
      display:grid;
      place-items:center;
      font-size:15px;
    }

    .ts-note-label {
      font-size:11px;
      color:#cbd5e1;
      margin-top:7px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }

    /* FILTERS */

    .ts-filter-row {
      display:flex;
      gap:9px;
      padding:0 16px 18px;
      overflow-x:auto;
      scrollbar-width:none;
    }

    .ts-filter {
      padding:9px 19px;
      border-radius:25px;
      border:1px solid #303945;
      color:#cbd5e1;
      background:transparent;
      font-size:13px;
      font-weight:700;
      white-space:nowrap;
      cursor:pointer;
    }

    .ts-filter.active {
      background:#252d39;
      border-color:#6571ff;
      color:white;
    }

    /* CHAT LIST */

    .ts-section-heading {
      padding:3px 18px 12px;
      font-size:11px;
      font-weight:800;
      letter-spacing:1px;
      color:#8491a3;
    }

    .ts-conversation-list {
      display:flex;
      flex-direction:column;
    }

    .ts-chat-item {
      display:flex;
      align-items:center;
      gap:13px;
      padding:14px 18px;
      cursor:pointer;
      transition:.2s;
    }

    .ts-chat-item:active {
      background:#171e27;
    }

    .ts-avatar-wrap {
      width:57px;
      height:57px;
      flex-shrink:0;
      position:relative;
    }

    .ts-avatar-wrap img {
      width:100%;
      height:100%;
      border-radius:50%;
      object-fit:cover;
      background:#26313d;
    }

    .ts-online-dot {
      position:absolute;
      right:0;
      bottom:1px;
      width:13px;
      height:13px;
      border-radius:50%;
      background:#22c55e;
      border:2px solid #090d12;
    }

    .ts-chat-details {
      flex:1;
      min-width:0;
    }

    .ts-chat-name {
      display:flex;
      align-items:center;
      gap:5px;
      font-size:15px;
      font-weight:750;
      color:white;
    }

    .ts-last-message {
      margin-top:5px;
      font-size:13px;
      color:#9ca8b8;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }

    .ts-chat-right {
      display:flex;
      flex-direction:column;
      align-items:flex-end;
      gap:7px;
    }

    .ts-chat-time {
      font-size:10px;
      color:#8491a3;
    }

    .ts-unread-count {
      min-width:21px;
      height:21px;
      padding:0 6px;
      border-radius:20px;
      background:#5965ff;
      color:white;
      display:grid;
      place-items:center;
      font-size:11px;
      font-weight:800;
    }

    /* EMPTY STATES */

    .ts-empty-state {
      text-align:center;
      padding:55px 24px;
      color:#94a3b8;
    }

    .ts-empty-icon {
      font-size:43px;
      margin-bottom:12px;
    }

    .ts-empty-state strong {
      display:block;
      color:white;
      font-size:15px;
    }

    .ts-empty-state p {
      font-size:12px;
      line-height:1.6;
    }

    /* CHAT ROOM */

    .ts-chat-room {
      position:fixed;
      inset:0;
      z-index:100;
      display:flex;
      flex-direction:column;
      background:#0c1118;
      color:white;
    }

    .ts-room-header {
      display:flex;
      align-items:center;
      gap:12px;
      padding:12px 14px;
      background:#111923;
      border-bottom:1px solid rgba(255,255,255,.07);
    }

    .ts-back-btn {
      background:none;
      border:none;
      color:white;
      font-size:25px;
      cursor:pointer;
    }

    .ts-room-user {
      display:flex;
      align-items:center;
      gap:10px;
      flex:1;
      min-width:0;
      cursor:pointer;
    }

    .ts-room-user img {
      width:42px;
      height:42px;
      border-radius:50%;
      object-fit:cover;
    }

    .ts-room-user-name {
      font-weight:800;
      font-size:14px;
    }

    .ts-room-status {
      font-size:11px;
      color:#94a3b8;
      margin-top:3px;
    }

    .ts-room-actions {
      display:flex;
      gap:12px;
      font-size:20px;
    }

    .ts-room-action {
      background:none;
      border:none;
      color:white;
      font-size:20px;
      cursor:pointer;
    }

    /* MESSAGES */

    .ts-messages-area {
      flex:1;
      overflow-y:auto;
      padding:18px 14px;
      display:flex;
      flex-direction:column;
      gap:10px;
      background:
        radial-gradient(circle at top right,
        rgba(67,97,238,.08), transparent 45%);
    }

    .ts-message-row {
      display:flex;
      width:100%;
    }

    .ts-message-row.mine {
      justify-content:flex-end;
    }

    .ts-message-bubble {
      max-width:78%;
      padding:11px 14px;
      font-size:14px;
      line-height:1.5;
      border-radius:19px;
      overflow-wrap:anywhere;
    }

    .ts-message-row.mine .ts-message-bubble {
      background:#3478ed;
      color:white;
      border-bottom-right-radius:5px;
    }

    .ts-message-row.theirs .ts-message-bubble {
      background:#252e3a;
      color:#f8fafc;
      border-bottom-left-radius:5px;
    }

    .ts-message-meta {
      text-align:right;
      margin-top:4px;
      font-size:10px;
      opacity:.7;
    }

    .ts-date-divider {
      align-self:center;
      padding:6px 13px;
      background:#202a36;
      color:#aab4c2;
      border-radius:20px;
      font-size:10px;
      margin:8px 0;
    }

    /* MESSAGE INPUT */

    .ts-input-area {
      padding:10px 12px;
      background:#111923;
      border-top:1px solid rgba(255,255,255,.07);
      display:flex;
      align-items:center;
      gap:9px;
    }

    .ts-attach-btn {
      border:0;
      background:transparent;
      color:#b9c5d5;
      font-size:22px;
      cursor:pointer;
    }

    .ts-message-input {
      flex:1;
      min-width:0;
      border:1px solid #303b49;
      background:#202a36;
      color:white;
      outline:none;
      border-radius:25px;
      padding:12px 16px;
      font-size:14px;
    }

    .ts-send-btn {
      width:43px;
      height:43px;
      border:0;
      border-radius:50%;
      background:#3478ed;
      color:white;
      font-size:19px;
      cursor:pointer;
    }

    /* CHAT INFO */

    .ts-info-screen {
      position:fixed;
      inset:0;
      z-index:120;
      overflow-y:auto;
      background:#090d12;
      color:white;
    }

    .ts-info-header {
      display:flex;
      align-items:center;
      gap:14px;
      padding:15px;
      background:#111923;
      border-bottom:1px solid #26313d;
      font-weight:800;
    }

    .ts-info-hero {
      text-align:center;
      padding:28px 16px;
      background:#111923;
    }

    .ts-info-hero img {
      width:95px;
      height:95px;
      border-radius:50%;
      object-fit:cover;
    }

    .ts-info-hero h3 {
      margin:12px 0 5px;
    }

    .ts-info-actions {
      display:flex;
      justify-content:center;
      gap:12px;
      margin-top:20px;
    }

    .ts-info-action {
      background:#202a36;
      border:1px solid #303b49;
      border-radius:14px;
      padding:12px 17px;
      color:white;
      font-size:12px;
      cursor:pointer;
    }

    .ts-info-tabs {
      display:flex;
      background:#111923;
      border-bottom:1px solid #303b49;
    }

    .ts-info-tab {
      flex:1;
      padding:14px 5px;
      text-align:center;
      color:#94a3b8;
      font-size:13px;
      font-weight:700;
      cursor:pointer;
      border-bottom:2px solid transparent;
    }

    .ts-info-tab.active {
      color:#60a5fa;
      border-bottom-color:#60a5fa;
    }

    .ts-info-content {
      padding:16px;
    }

    /* POPUP */

    .ts-popup {
      position:fixed;
      top:65px;
      right:14px;
      width:220px;
      z-index:300;
      background:#202a36;
      border:1px solid #394657;
      border-radius:15px;
      overflow:hidden;
      box-shadow:0 15px 40px rgba(0,0,0,.5);
    }

    .ts-popup-item {
      padding:14px 16px;
      font-size:13px;
      cursor:pointer;
      border-bottom:1px solid rgba(255,255,255,.05);
    }

    .ts-popup-item:active {
      background:#303d4e;
    }

    .ts-popup-item.danger {
      color:#f87171;
    }

    /* MOBILE */

    @media(min-width:700px) {
      .ts-chat-app {
        max-width:650px;
        margin:auto;
        border-left:1px solid #222;
        border-right:1px solid #222;
      }
    }
  `;

  if (!document.getElementById("ts-chat-style")) {
    style.id = "ts-chat-style";
    document.head.appendChild(style);
  }

  // ==========================================
  // FRONTEND STATE
  // ==========================================

  let conversations = [];
  let activeFilter = "all";
  let activeConversation = null;
  let activeInfoTab = "Files";
  let localMessages = {};

  const defaultAvatar =
    "https://ui-avatars.com/api/?name=User&background=26313d&color=fff";

  function avatar(user) {
    if (window.avatarUrl) return window.avatarUrl(user || {});
    return (user && user.avatar) || defaultAvatar;
  }

  function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function showNotice(message) {
    alert(message);
  }

  // ==========================================
  // PUBLIC DATA ADAPTER
  // Backend can fill this later.
  // ==========================================

  window.TSChat = {
    setConversations(data) {
      conversations = Array.isArray(data) ? data : [];
    },

    openConversation(conv) {
      if (!conv) return;
      activeConversation = conv;
      const container = document.getElementById("app");
      if (container) {
        renderRoom(container, conv);
      }
    },

    getConversations() {
      return conversations;
    }
  };

  // ==========================================
  // INBOX
  // ==========================================

  window.renderChat = async function(container) {
    activeConversation = null;

    const header = document.querySelector(".top-header");
    const nav = document.querySelector(".bottom-nav");

    if (header) header.classList.remove("hidden");
    if (nav) nav.classList.remove("hidden");

    container.innerHTML = `
      <div class="ts-chat-app">

        <div class="ts-inbox-header">
          <div>
            <div class="ts-inbox-title">Messages</div>
            <div class="ts-inbox-subtitle">Stay connected</div>
          </div>

          <div class="ts-header-actions">
            <button class="ts-icon-btn" id="ts-search-toggle">⌕</button>
            <button class="ts-icon-btn" id="ts-new-message">✎</button>
          </div>
        </div>

        <div class="ts-search-box" id="ts-search-container">
          <span>⌕</span>
          <input id="ts-chat-search"
            placeholder="Search messages and people..."
            autocomplete="off" />
        </div>

        <div class="ts-notes-section">
          <div class="ts-note-item">
            <div class="ts-note-avatar">
              <img src="${avatar(window.AppState?.user || {})}" />
              <span class="ts-note-add">+</span>
            </div>
            <div class="ts-note-label">Your note</div>
          </div>
        </div>

        <div class="ts-filter-row">
          <button class="ts-filter active" data-filter="all">Primary</button>
          <button class="ts-filter" data-filter="unread">Unread</button>
          <button class="ts-filter" data-filter="general">General</button>
          <button class="ts-filter" data-filter="requests">Requests</button>
        </div>

        <div class="ts-section-heading">MESSAGES</div>

        <div class="ts-conversation-list" id="ts-conversation-list">
          <div class="ts-empty-state">
            <div class="ts-empty-icon">💬</div>
            <strong>No conversations yet</strong>
            <p>Your messages will appear here after the backend is connected.</p>
          </div>
        </div>

      </div>
    `;

    const search = container.querySelector("#ts-chat-search");
    const list = container.querySelector("#ts-conversation-list");

    function renderList() {
      const query = search.value.toLowerCase().trim();

      const filtered = conversations.filter(c => {
        const user = c.otherUser || {};

        const name = (user.displayName || "").toLowerCase();
        const username = (user.username || "").toLowerCase();
        const last = (c.lastMessage || "").toLowerCase();

        const matchesSearch =
          !query ||
          name.includes(query) ||
          username.includes(query) ||
          last.includes(query);

        const matchesFilter =
          activeFilter === "all" ||
          (activeFilter === "unread" && c.unreadCount > 0) ||
          (activeFilter === "general" && c.category === "general") ||
          (activeFilter === "requests" && c.category === "requests");

        return matchesSearch && matchesFilter;
      });

      if (!filtered.length) {
        list.innerHTML = `
          <div class="ts-empty-state">
            <div class="ts-empty-icon">✉️</div>
            <strong>No messages found</strong>
            <p>There are no conversations to display.</p>
          </div>
        `;
        return;
      }

      list.innerHTML = filtered.map(c => {
        const user = c.otherUser || {};

        return `
          <div class="ts-chat-item" data-id="${escapeHTML(c.id)}">
            <div class="ts-avatar-wrap">
              <img src="${avatar(user)}" />
              ${user.isOnline ? '<span class="ts-online-dot"></span>' : ""}
            </div>

            <div class="ts-chat-details">
              <div class="ts-chat-name">
                ${escapeHTML(user.displayName || user.username || "User")}
                ${user.muted ? "🔕" : ""}
              </div>

              <div class="ts-last-message">
                ${escapeHTML(c.lastMessage || "Start a conversation")}
              </div>
            </div>

            <div class="ts-chat-right">
              <span class="ts-chat-time">
                ${escapeHTML(c.time || "")}
              </span>

              ${c.unreadCount > 0
                ? `<span class="ts-unread-count">${c.unreadCount}</span>`
                : ""}
            </div>
          </div>
        `;
      }).join("");

      list.querySelectorAll(".ts-chat-item").forEach(item => {
        item.onclick = () => {
          const conv = conversations.find(
            c => String(c.id) === item.dataset.id
          );
          if (conv) renderRoom(container, conv);
        };
      });
    }

    search.oninput = renderList;

    container.querySelectorAll(".ts-filter").forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll(".ts-filter").forEach(b =>
          b.classList.remove("active")
        );

        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        renderList();
      };
    });

    container.querySelector("#ts-search-toggle").onclick = () => {
      search.focus();
    };

    container.querySelector("#ts-new-message").onclick = () => {
      const explore = document.querySelector(
        'button[data-tab="explore"]'
      );

      if (explore) {
        explore.click();
      } else {
        showNotice("New message screen will be connected with Explore later.");
      }
    };

    renderList();
  };

  // ==========================================
  // CHAT ROOM
  // ==========================================

  function renderRoom(container, conv) {
    activeConversation = conv;

    const user = conv.otherUser || {};
    const header = document.querySelector(".top-header");
    const nav = document.querySelector(".bottom-nav");

    if (header) header.classList.add("hidden");
    if (nav) nav.classList.add("hidden");

    const messages = localMessages[conv.id] || [];

    container.innerHTML = `
      <div class="ts-chat-room">

        <div class="ts-room-header">
          <button class="ts-back-btn" id="ts-back">‹</button>

          <div class="ts-room-user" id="ts-open-info">
            <img src="${avatar(user)}" />

            <div>
              <div class="ts-room-user-name">
                ${escapeHTML(user.displayName || user.username || "User")}
              </div>
              <div class="ts-room-status">
                ${user.isOnline ? "Online" : "TELESUPAR"}
              </div>
            </div>
          </div>

          <div class="ts-room-actions">
            <button class="ts-room-action" id="ts-room-more">⋮</button>
          </div>
        </div>

        <div class="ts-messages-area" id="ts-messages-area">
          ${
            messages.length
              ? messages.map(m => messageHTML(m)).join("")
              : `
                <div class="ts-empty-state">
                  <div class="ts-empty-icon">👋</div>
                  <strong>Start a conversation</strong>
                  <p>Your messages will appear here once messaging backend is connected.</p>
                </div>
              `
          }
        </div>

        <div class="ts-input-area">
          <label class="ts-attach-btn">
            ＋
            <input type="file" id="ts-file-input" hidden />
          </label>

          <input
            class="ts-message-input"
            id="ts-message-input"
            placeholder="Message..."
            autocomplete="off"
          />

          <button class="ts-send-btn" id="ts-send">➤</button>
        </div>

      </div>
    `;

    const area = container.querySelector("#ts-messages-area");

    area.scrollTop = area.scrollHeight;

    container.querySelector("#ts-back").onclick = () => {
      activeConversation = null;

      if (header) header.classList.remove("hidden");
      if (nav) nav.classList.remove("hidden");

      window.renderChat(container);
    };

    container.querySelector("#ts-open-info").onclick = () => {
      renderChatInfo(container, user, conv);
    };

    container.querySelector("#ts-room-more").onclick = () => {
      openRoomMenu(user);
    };

    container.querySelector("#ts-send").onclick = () => {
      showNotice("Message sending will work after backend integration.");
    };

    container.querySelector("#ts-message-input").onkeydown = e => {
      if (e.key === "Enter") {
        showNotice("Message sending will work after backend integration.");
      }
    };

    container.querySelector("#ts-file-input").onchange = e => {
      const file = e.target.files[0];
      if (file) {
        showNotice(
          "Selected file: " + file.name +
          ". Upload will work after backend integration."
        );
      }
    };
  }

  function messageHTML(msg) {
    const mine = !!msg.mine;

    return `
      <div class="ts-message-row ${mine ? "mine" : "theirs"}">
        <div class="ts-message-bubble">
          ${escapeHTML(msg.text)}
          <div class="ts-message-meta">
            ${escapeHTML(msg.time || "")}
            ${mine ? (msg.seen ? " ✓✓" : " ✓") : ""}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // CHAT INFO
  // ==========================================

  function renderChatInfo(container, user, conv) {
    activeInfoTab = "Files";

    const info = document.createElement("div");
    info.className = "ts-info-screen";

    container.appendChild(info);

    function renderInfo() {
      info.innerHTML = `
        <div class="ts-info-header">
          <button class="ts-back-btn" id="ts-info-back">‹</button>
          Chat Info
        </div>

        <div class="ts-info-hero">
          <img src="${avatar(user)}" />
          <h3>${escapeHTML(user.displayName || "User")}</h3>
          <div style="font-size:12px;color:#94a3b8;">
            @${escapeHTML(user.username || "")}
          </div>

          <div class="ts-info-actions">
            <button class="ts-info-action" id="ts-info-mute">
              🔔 Mute
            </button>

            <button class="ts-info-action" id="ts-info-profile">
              👤 Profile
            </button>
          </div>
        </div>

        <div class="ts-info-tabs">
          ${["Files", "Links", "Media", "Groups"].map(tab => `
            <div class="ts-info-tab ${activeInfoTab === tab ? "active" : ""}"
              data-tab="${tab}">
              ${tab}
            </div>
          `).join("")}
        </div>

        <div class="ts-info-content">
          <div class="ts-empty-state">
            <div class="ts-empty-icon">📂</div>
            <strong>No ${activeInfoTab.toLowerCase()} yet</strong>
            <p>Shared content will appear here after backend integration.</p>
          </div>
        </div>
      `;

      info.querySelector("#ts-info-back").onclick = () => {
        info.remove();
      };

      info.querySelectorAll(".ts-info-tab").forEach(tab => {
        tab.onclick = () => {
          activeInfoTab = tab.dataset.tab;
          renderInfo();
        };
      });

      info.querySelector("#ts-info-mute").onclick = () => {
        showNotice("Mute settings will be connected with backend later.");
      };

      info.querySelector("#ts-info-profile").onclick = () => {
        if (window.openUserExploreProfile && user.id) {
          info.remove();
          window.openUserExploreProfile(user.id);
        } else {
          showNotice("Profile navigation will be connected later.");
        }
      };
    }

    renderInfo();
  }

  // ==========================================
  // ROOM MENU
  // ==========================================

  function openRoomMenu(user) {
    const old = document.getElementById("ts-room-popup");
    if (old) {
      old.remove();
      return;
    }

    const popup = document.createElement("div");
    popup.className = "ts-popup";
    popup.id = "ts-room-popup";

    popup.innerHTML = `
      <div class="ts-popup-item" id="ts-menu-search">🔍 Search in chat</div>
      <div class="ts-popup-item" id="ts-menu-mute">🔕 Mute notifications</div>
      <div class="ts-popup-item" id="ts-menu-info">👤 Chat info</div>
      <div class="ts-popup-item danger" id="ts-menu-report">⚠ Report user</div>
    `;

    document.body.appendChild(popup);

    popup.querySelector("#ts-menu-search").onclick = () => {
      popup.remove();
      showNotice("Chat search will be connected later.");
    };

    popup.querySelector("#ts-menu-mute").onclick = () => {
      popup.remove();
      showNotice("Mute will be connected later.");
    };

    popup.querySelector("#ts-menu-info").onclick = () => {
      popup.remove();

      if (activeConversation) {
        const container = document.getElementById("app");
        if (container) {
          renderChatInfo(container, user, activeConversation);
        }
      }
    };

    popup.querySelector("#ts-menu-report").onclick = () => {
      popup.remove();
      showNotice("Report feature will be connected with backend later.");
    };

    setTimeout(() => {
      document.addEventListener("click", function close(e) {
        if (!popup.contains(e.target)) {
          popup.remove();
          document.removeEventListener("click", close);
        }
      });
    }, 0);
  }

  // ==========================================
  // DIRECT CHAT ENTRY POINT
  // ==========================================

  window.openDirectChat = function(userId) {
    const conv = conversations.find(c =>
      String(c.otherUser?.id) === String(userId)
    );

    if (!conv) {
      showNotice("Conversation will open after backend integration.");
      return;
    }

    const container = document.getElementById("app");

    if (container) {
      renderRoom(container, conv);
    }
  };

})();
