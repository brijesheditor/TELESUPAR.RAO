
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


/* ==========================================
   TELESUPAR GLASSMORPHISM CHAT HEADER
========================================== */

.ts-room-header {
  padding: 12px 14px;
  gap: 10px;
  background: rgba(17, 25, 35, .88);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255,255,255,.07);
}

.ts-back-btn {
  min-width: 76px;
  height: 46px;
  padding: 0 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-radius: 30px;
  color: #fff;
  background: rgba(255,255,255,.09);
  border: 1px solid rgba(255,255,255,.13);
  box-shadow: 0 5px 18px rgba(0,0,0,.15);
  font-size: 14px;
  font-weight: 700;
}

.ts-room-user {
  padding: 6px 12px 6px 7px;
  border-radius: 35px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 5px 18px rgba(0,0,0,.14);
}

.ts-room-user img {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255,255,255,.18);
}

.ts-room-user-name {
  font-size: 13px;
  font-weight: 800;
}

.ts-room-actions {
  gap: 0;
}

.ts-room-action {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(255,255,255,.09);
  border: 1px solid rgba(255,255,255,.13);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 5px 18px rgba(0,0,0,.15);
}

/* PROFILE SCREEN */

.ts-info-screen {
  z-index: 220;
  background: #151f29;
  padding-bottom: 35px;
}

.ts-info-header {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 16px;
  background: rgba(21,31,41,.88);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 0;
}

.ts-info-header .ts-back-btn {
  min-width: 85px;
}

.ts-info-hero {
  padding: 25px 18px 22px;
  background: transparent;
}

.ts-info-hero img {
  width: 145px;
  height: 145px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255,255,255,.14);
  box-shadow: 0 12px 35px rgba(0,0,0,.28);
}

.ts-info-hero h3 {
  margin: 18px 0 5px;
  font-size: 25px;
  font-weight: 850;
}

.ts-info-username {
  color: #aab8c6;
  font-size: 14px;
}

.ts-info-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 27px 0 0;
}

.ts-info-action {
  min-height: 82px;
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 24px;
  background: #263443;
  color: white;
  font-size: 14px;
  font-weight: 750;
}

.ts-info-details {
  margin: 10px 16px;
  padding: 20px;
  border-radius: 25px;
  background: #1d2935;
  border: 1px solid rgba(255,255,255,.035);
}

.ts-info-bio {
  font-size: 17px;
  line-height: 1.5;
  color: #f1f5f9;
  overflow-wrap: anywhere;
}

.ts-info-label {
  margin-top: 8px;
  color: #8493a1;
  font-size: 13px;
  font-weight: 700;
}

.ts-info-username-value {
  margin-top: 24px;
  font-size: 19px;
  font-weight: 850;
  overflow-wrap: anywhere;
}

.ts-info-posts {
  margin: 16px;
  padding: 20px;
  border-radius: 24px;
  background: #1d2935;
  text-align: center;
}

.ts-info-posts button {
  margin-top: 12px;
  padding: 12px 20px;
  border: 1px solid rgba(255,255,255,.13);
  border-radius: 25px;
  background: rgba(255,255,255,.08);
  color: white;
  font-weight: 750;
}

/* GLASS POPUP */

.ts-popup {
  position: fixed;
  top: 75px;
  right: 14px;
  width: 235px;
  z-index: 300;
  padding: 7px;
  border-radius: 22px;
  background: rgba(30,43,57,.91);
  border: 1px solid rgba(255,255,255,.15);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  box-shadow: 0 18px 50px rgba(0,0,0,.45);
}

.ts-popup-item {
  padding: 15px 14px;
  border: 0;
  border-radius: 14px;
  font-size: 14px;
}

.ts-popup-item:active {
  background: rgba(255,255,255,.12);
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
            
  
  // ==========================================
  // TELESUPAR CHAT - BACKEND CONNECTED V2
  // ==========================================

  let conversations = [];
  let activeFilter = "all";
  let activeConversation = null;
  let activeInfoTab = "Files";
  let currentMessages = [];
  let users = [];
  let userSearchTimer = null;
  let socketHandlersReady = false;

  const API = window.api;
  const appState = window.AppState || {};

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

  function getMyId() {
    return String(
      appState.user?.id ||
      appState.user?._id ||
      ""
    );
  }

  function getContainer() {
    return document.getElementById("main-view") ||
      document.getElementById("app");
  }

  function notice(message) {
    alert(message);
  }

  function getConvId(conv) {
    return String(conv?.id || conv?._id || "");
  }

  function getOtherUser(conv) {
    return conv?.otherUser || conv?.user || {};
  }

  function normalizeUser(user) {
    if (!user) return {};
    return {
      ...user,
      id: String(user.id || user._id || ""),
      displayName: user.displayName || user.username || "User",
      username: user.username || "",
      avatar: user.avatar || ""
    };
  }

  function normalizeConversation(conv) {
    const user = normalizeUser(getOtherUser(conv));

    return {
      ...conv,
      id: getConvId(conv),
      otherUser: user,
      user,
      lastMessage: conv.lastMessage || "",
      unreadCount: Number(conv.unreadCount || 0)
    };
  }

  function formatTime(date) {
    if (!date) return "";

    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";

    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function messageTime(message) {
    return formatTime(message.createdAt);
  }

  async function apiRequest(path, options = {}) {
    if (typeof API !== "function") {
      throw new Error("API connection is not available.");
    }

    const result = await API(path, options);

    if (!result || result.success === false) {
      throw new Error(result?.message || "Request failed");
    }

    return result;
  }

  // ==========================================
  // LOAD CONVERSATIONS
  // ==========================================

  async function loadConversations() {
    const data = await apiRequest("/api/conversations");

    conversations = (data.conversations || [])
      .map(normalizeConversation);

    return conversations;
  }

  // ==========================================
  // SOCKET EVENTS
  // ==========================================

  function setupChatSocket() {
    const socket = window.AppState?.socket;

    if (!socket || socketHandlersReady) return;

    socketHandlersReady = true;

    socket.on("newMessage", message => {
      if (!message) return;

      const conversationId = String(message.conversationId || "");

      if (
        activeConversation &&
        getConvId(activeConversation) === conversationId
      ) {
        const exists = currentMessages.some(
          item => String(item.id) === String(message.id)
        );

        if (!exists) {
          currentMessages.push(message);
          renderMessages();
        }
      }

      loadConversations().then(() => {
        const container = getContainer();

        if (
          container &&
          !activeConversation &&
          document.getElementById("ts-conversation-list")
        ) {
          renderConversationList(container);
        }
      }).catch(() => {});
    });

    socket.on("conversationUpdated", () => {
      loadConversations().then(() => {
        const container = getContainer();

        if (
          container &&
          !activeConversation &&
          document.getElementById("ts-conversation-list")
        ) {
          renderConversationList(container);
        }
      }).catch(() => {});
    });

    socket.on("messageDelivered", data => {
      if (!data || !activeConversation) return;

      currentMessages = currentMessages.map(message => {
        if (String(message.id) === String(data.messageId)) {
          return {
            ...message,
            deliveredAt: data.deliveredAt
          };
        }
        return message;
      });

      renderMessages();
    });

    socket.on("messagesSeen", data => {
      if (!data || !activeConversation) return;

      if (
        String(data.conversationId) !==
        getConvId(activeConversation)
      ) return;

      currentMessages = currentMessages.map(message => {
        if (String(message.senderId) === getMyId()) {
          return {
            ...message,
            seenAt: data.seenAt
          };
        }
        return message;
      });

      renderMessages();
    });

    socket.on("typing", data => {
      if (!data || !activeConversation) return;

      if (
        String(data.conversationId) !==
        getConvId(activeConversation)
      ) return;

      const status = document.querySelector(".ts-room-status");

      if (status) {
        status.textContent = data.isTyping
          ? "Typing..."
          : "TELESUPAR";
      }
    });
  }

  function joinConversation(id) {
    const socket = window.AppState?.socket;

    if (!socket || !id) return;

    socket.emit("joinConversation", String(id));
  }

  function leaveConversation(id) {
    const socket = window.AppState?.socket;

    if (!socket || !id) return;

    socket.emit("leaveConversation", String(id));
  }

  // ==========================================
  // PUBLIC DATA ADAPTER
  // ==========================================

  window.TSChat = {
    setConversations(data) {
      conversations = Array.isArray(data)
        ? data.map(normalizeConversation)
        : [];
    },

    setUsers(data) {
      users = Array.isArray(data)
        ? data.map(normalizeUser)
        : [];
    },

    openConversation(conv) {
      if (!conv) return;

      const container = getContainer();
      if (container) {
        openRoom(normalizeConversation(conv), container);
      }
    },

    getConversations() {
      return conversations;
    },

    getUsers() {
      return users;
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

    setupChatSocket();

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
            placeholder="Search messages..."
            autocomplete="off" />
        </div>

        <div class="ts-notes-section">
          <div class="ts-note-item">
            <div class="ts-note-avatar">
              <img src="${escapeHTML(avatar(appState.user || {}))}" />
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
            <div class="ts-empty-icon">⌛</div>
            <strong>Loading messages...</strong>
          </div>
        </div>

      </div>
    `;

    const search = container.querySelector("#ts-chat-search");

    search.oninput = () => {
      renderConversationList(container);
    };

    container.querySelector("#ts-search-toggle").onclick = () => {
      search.focus();
    };

    container.querySelector("#ts-new-message").onclick = () => {
      renderNewMessageScreen(container);
    };

    container.querySelectorAll(".ts-filter").forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll(".ts-filter").forEach(item => {
          item.classList.remove("active");
        });

        btn.classList.add("active");
        activeFilter = btn.dataset.filter;

        renderConversationList(container);
      };
    });

    try {
      await loadConversations();
      renderConversationList(container);
    } catch (error) {
      container.querySelector("#ts-conversation-list").innerHTML = `
        <div class="ts-empty-state">
          <div class="ts-empty-icon">⚠️</div>
          <strong>Could not load messages</strong>
          <p>${escapeHTML(error.message)}</p>
        </div>
      `;
    }
  };

  // ==========================================
  // RENDER CONVERSATION LIST
  // ==========================================

  function renderConversationList(container) {
    const list = container.querySelector("#ts-conversation-list");
    const search = container.querySelector("#ts-chat-search");

    if (!list) return;

    const query = (search?.value || "").toLowerCase().trim();

    const filtered = conversations.filter(conv => {
      const user = getOtherUser(conv);

      const name = String(user.displayName || "").toLowerCase();
      const username = String(user.username || "").toLowerCase();
      const last = String(conv.lastMessage || "").toLowerCase();

      const matchesSearch =
        !query ||
        name.includes(query) ||
        username.includes(query) ||
        last.includes(query);

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "unread" && conv.unreadCount > 0) ||
        (activeFilter === "general" && conv.category === "general") ||
        (activeFilter === "requests" && conv.category === "requests");

      return matchesSearch && matchesFilter;
    });

    if (!filtered.length) {
      list.innerHTML = `
        <div class="ts-empty-state">
          <div class="ts-empty-icon">💬</div>
          <strong>No conversations yet</strong>
          <p>Tap the ✎ button to find a TELESUPAR user and start chatting.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(conv => {
      const user = getOtherUser(conv);

      return `
        <div class="ts-chat-item" data-id="${escapeHTML(getConvId(conv))}">
          <div class="ts-avatar-wrap">
            <img src="${escapeHTML(avatar(user))}" />
            ${user.isOnline ? '<span class="ts-online-dot"></span>' : ""}
          </div>

          <div class="ts-chat-details">
            <div class="ts-chat-name">
              ${escapeHTML(user.displayName || user.username)}
            </div>

            <div class="ts-last-message">
              ${escapeHTML(conv.lastMessage || "Start a conversation")}
            </div>
          </div>

          <div class="ts-chat-right">
            <span class="ts-chat-time">
              ${escapeHTML(formatTime(conv.lastMessageAt || conv.updatedAt))}
            </span>

            ${conv.unreadCount > 0
              ? `<span class="ts-unread-count">${conv.unreadCount}</span>`
              : ""}
          </div>
        </div>
      `;
    }).join("");

    list.querySelectorAll(".ts-chat-item").forEach(item => {
      item.onclick = () => {
        const conv = conversations.find(
          c => getConvId(c) === item.dataset.id
        );

        if (conv) openRoom(conv, container);
      };
    });
  }

  // ==========================================
  // NEW MESSAGE / SEARCH USERS
  // ==========================================

  function renderNewMessageScreen(container) {
    activeConversation = null;

    container.innerHTML = `
      <div class="ts-chat-app">

        <div class="ts-inbox-header">
          <div style="display:flex;align-items:center;gap:12px;">
            <button class="ts-back-btn" id="ts-users-back">‹</button>
            <div>
              <div class="ts-inbox-title">New Message</div>
              <div class="ts-inbox-subtitle">Find people on TELESUPAR</div>
            </div>
          </div>
        </div>

        <div class="ts-search-box">
          <span>⌕</span>
          <input id="ts-user-search"
            placeholder="Search username or name..."
            autocomplete="off" />
        </div>

        <div class="ts-section-heading">PEOPLE</div>

        <div class="ts-conversation-list" id="ts-user-results">
          <div class="ts-empty-state">
            <div class="ts-empty-icon">🔎</div>
            <strong>Search for people</strong>
            <p>Enter a username or display name to find users.</p>
          </div>
        </div>

      </div>
    `;

    const input = container.querySelector("#ts-user-search");
    const results = container.querySelector("#ts-user-results");

    container.querySelector("#ts-users-back").onclick = () => {
      window.renderChat(container);
    };

    input.oninput = () => {
      clearTimeout(userSearchTimer);

      const query = input.value.trim();

      if (!query) {
        results.innerHTML = `
          <div class="ts-empty-state">
            <div class="ts-empty-icon">🔎</div>
            <strong>Search for people</strong>
            <p>Enter a username or display name.</p>
          </div>
        `;
        return;
      }

      results.innerHTML = `
        <div class="ts-empty-state">
          <strong>Searching...</strong>
        </div>
      `;

      userSearchTimer = setTimeout(() => {
        searchUsers(query, results, container);
      }, 350);
    };

    input.focus();
  }

  async function searchUsers(query, results, container) {
    try {
      const data = await apiRequest(
        "/api/users?search=" + encodeURIComponent(query)
      );

      users = (data.users || []).map(normalizeUser);

      if (!users.length) {
        results.innerHTML = `
          <div class="ts-empty-state">
            <div class="ts-empty-icon">👤</div>
            <strong>No users found</strong>
            <p>Try another username or name.</p>
          </div>
        `;
        return;
      }

      results.innerHTML = users.map(user => `
        <div class="ts-chat-item" data-user-id="${escapeHTML(user.id)}">
          <div class="ts-avatar-wrap">
            <img src="${escapeHTML(avatar(user))}" />
            ${user.isOnline ? '<span class="ts-online-dot"></span>' : ""}
          </div>

          <div class="ts-chat-details">
            <div class="ts-chat-name">
              ${escapeHTML(user.displayName)}
            </div>
            <div class="ts-last-message">
              @${escapeHTML(user.username)}
            </div>
          </div>

          <div style="color:#60a5fa;font-size:13px;font-weight:700;">
            Message
          </div>
        </div>
      `).join("");

      results.querySelectorAll(".ts-chat-item").forEach(item => {
        item.onclick = async () => {
          const user = users.find(
            u => u.id === item.dataset.userId
          );

          if (user) {
            await createAndOpenConversation(user, container);
          }
        };
      });

    } catch (error) {
      results.innerHTML = `
        <div class="ts-empty-state">
          <div class="ts-empty-icon">⚠️</div>
          <strong>Search failed</strong>
          <p>${escapeHTML(error.message)}</p>
        </div>
      `;
    }
  }

  // ==========================================
  // CREATE / OPEN REAL CONVERSATION
  // ==========================================

  async function createAndOpenConversation(user, container) {
    try {
      const data = await apiRequest(
        "/api/conversations/" + encodeURIComponent(user.id),
        { method: "POST" }
      );

      if (!data.conversation) {
        throw new Error("Conversation data not received.");
      }

      const conv = normalizeConversation(data.conversation);

      if (!conv.otherUser?.id) {
        conv.otherUser = normalizeUser(user);
        conv.user = conv.otherUser;
      }

      const existingIndex = conversations.findIndex(
        item => getConvId(item) === getConvId(conv)
      );

      if (existingIndex >= 0) {
        conversations[existingIndex] = conv;
      } else {
        conversations.unshift(conv);
      }

      openRoom(conv, container);

    } catch (error) {
      notice(error.message || "Could not open conversation.");
    }
  }

  // ==========================================
  // DIRECT CHAT ENTRY POINT
  // ==========================================

  window.openDirectChat = async function(userId) {
    if (!userId) {
      notice("User ID is missing.");
      return;
    }

    const container = getContainer();

    if (!container) {
      notice("Chat screen is not available.");
      return;
    }

    try {
      const data = await apiRequest(
        "/api/conversations/" + encodeURIComponent(userId),
        { method: "POST" }
      );

      if (!data.conversation) {
        throw new Error("Conversation not received.");
      }

      const conv = normalizeConversation(data.conversation);

      const index = conversations.findIndex(
        item => getConvId(item) === getConvId(conv)
      );

      if (index >= 0) {
        conversations[index] = conv;
      } else {
        conversations.unshift(conv);
      }

      openRoom(conv, container);

    } catch (error) {
      notice(error.message || "Could not open chat.");
    }
  };

  // ==========================================
  // OPEN CHAT ROOM
  // ==========================================

  async function openRoom(conv, container) {
    const oldId = activeConversation
      ? getConvId(activeConversation)
      : "";

    if (oldId && oldId !== getConvId(conv)) {
      leaveConversation(oldId);
    }

    activeConversation = normalizeConversation(conv);
    currentMessages = [];

    const user = getOtherUser(activeConversation);
    const conversationId = getConvId(activeConversation);

    const header = document.querySelector(".top-header");
    const nav = document.querySelector(".bottom-nav");

    if (header) header.classList.add("hidden");
    if (nav) nav.classList.add("hidden");

    container.innerHTML = `
      <div class="ts-chat-room">

        <div class="ts-room-header">
          <button class="ts-back-btn" id="ts-back">← Back</button>

          <div class="ts-room-user" id="ts-open-info">
            <img src="${escapeHTML(avatar(user))}" />

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
          <div class="ts-empty-state">
            <strong>Loading messages...</strong>
          </div>
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

    container.querySelector("#ts-back").onclick = () => {
      leaveConversation(conversationId);

      activeConversation = null;

      if (header) header.classList.remove("hidden");
      if (nav) nav.classList.remove("hidden");

      window.renderChat(container);
    };

    container.querySelector("#ts-open-info").onclick = () => {
      renderChatInfo(container, user, activeConversation);
    };

    container.querySelector("#ts-room-more").onclick = () => {
      openRoomMenu(user);
    };

    const input = container.querySelector("#ts-message-input");

    container.querySelector("#ts-send").onclick = sendCurrentMessage;

    input.onkeydown = event => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendCurrentMessage();
      }
    };

    container.querySelector("#ts-file-input").onchange = uploadAttachment;

    joinConversation(conversationId);

    try {
      const data = await apiRequest(
        "/api/conversations/" +
        encodeURIComponent(conversationId) +
        "/messages"
      );

      if (
        !activeConversation ||
        getConvId(activeConversation) !== conversationId
      ) return;

      currentMessages = data.messages || [];
      renderMessages();

      await apiRequest(
        "/api/conversations/" +
        encodeURIComponent(conversationId) +
        "/read",
        { method: "POST" }
      );

      await loadConversations();

    } catch (error) {
      const area = container.querySelector("#ts-messages-area");

      if (area) {
        area.innerHTML = `
          <div class="ts-empty-state">
            <strong>Could not load messages</strong>
            <p>${escapeHTML(error.message)}</p>
          </div>
        `;
      }
    }
  }

  // ==========================================
  // RENDER MESSAGES
  // ==========================================

  function renderMessages() {
    const area = document.getElementById("ts-messages-area");

    if (!area) return;

    if (!currentMessages.length) {
      area.innerHTML = `
        <div class="ts-empty-state">
          <div class="ts-empty-icon">👋</div>
          <strong>Start a conversation</strong>
          <p>Send your first message.</p>
        </div>
      `;
      return;
    }

    area.innerHTML = currentMessages
      .map(messageHTML)
      .join("");

    area.scrollTop = area.scrollHeight;
  }

  function messageHTML(message) {
    const mine =
      String(message.senderId) === getMyId();

    const seen = !!message.seenAt;
    const delivered = !!message.deliveredAt;

    let attachmentHTML = "";

    if (message.attachment?.url) {
      const attachment = message.attachment;
      const isImage = String(attachment.mimeType || "")
        .startsWith("image/");

      attachmentHTML = isImage
        ? `<img src="${escapeHTML(attachment.url)}"
             style="max-width:190px;border-radius:12px;display:block;margin-bottom:6px;" />`
        : `<a href="${escapeHTML(attachment.url)}"
             target="_blank"
             rel="noopener"
             style="color:#93c5fd;display:block;margin-bottom:6px;">
             📎 ${escapeHTML(attachment.fileName || "Open file")}
           </a>`;
    }

    return `
      <div class="ts-message-row ${mine ? "mine" : "theirs"}">
        <div class="ts-message-bubble">
          ${attachmentHTML}
          ${escapeHTML(message.text || "")}

          <div class="ts-message-meta">
            ${escapeHTML(messageTime(message))}
            ${mine ? (seen ? " ✓✓" : delivered ? " ✓✓" : " ✓") : ""}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  async function sendCurrentMessage() {
    if (!activeConversation) return;

    const input = document.getElementById("ts-message-input");
    const button = document.getElementById("ts-send");

    if (!input) return;

    const text = input.value.trim();

    if (!text) return;

    const conversationId = getConvId(activeConversation);

    if (!conversationId) {
      notice("Conversation ID missing.");
      return;
    }

    input.disabled = true;
    if (button) button.disabled = true;

    try {
      const data = await apiRequest(
        "/api/conversations/" +
        encodeURIComponent(conversationId) +
        "/messages",
        {
          method: "POST",
          body: JSON.stringify({ text })
        }
      );

      if (data.message) {
        const exists = currentMessages.some(
          item => String(item.id) === String(data.message.id)
        );

        if (!exists) {
          currentMessages.push(data.message);
        }
      }

      input.value = "";
      renderMessages();

      await loadConversations();

    } catch (error) {
      notice(error.message || "Message could not be sent.");
    } finally {
      input.disabled = false;
      if (button) button.disabled = false;
      input.focus();
    }
  }

  // ==========================================
  // FILE / PHOTO UPLOAD
  // ==========================================

  async function uploadAttachment(event) {
    const file = event.target.files?.[0];

    if (!file || !activeConversation) return;

    if (file.size > 25 * 1024 * 1024) {
      notice("File size must be 25 MB or less.");
      event.target.value = "";
      return;
    }

    const conversationId = getConvId(activeConversation);
    const formData = new FormData();

    formData.append("file", file);

    try {
      const data = await apiRequest(
        "/api/conversations/" +
        encodeURIComponent(conversationId) +
        "/attachments",
        {
          method: "POST",
          body: formData
        }
      );

      if (data.message) {
        currentMessages.push(data.message);
        renderMessages();
      }

      await loadConversations();

    } catch (error) {
      notice(error.message || "File upload failed.");
    }

    event.target.value = "";
  }

  // ==========================================
  // CHAT INFO
  // ==========================================

  
// ==========================================
// CHAT INFO - TELEGRAM STYLE PROFILE
// ==========================================

function renderChatInfo(container, user, conv) {
  activeInfoTab = "Files";

  const info = document.createElement("div");
  info.className = "ts-info-screen";

  const username = String(user.username || "").replace(/^@/, "");
  const bio = user.bio || user.about || "No bio available";

  info.innerHTML = `
    <div class="ts-info-header">
      <button class="ts-back-btn" id="ts-info-back">
        ← Back
      </button>
      <span>Profile</span>
    </div>

    <div class="ts-info-hero">
      <img
        src="${escapeHTML(avatar(user))}"
        alt="Profile picture"
      />

      <h3>${escapeHTML(user.displayName || "TELESUPAR User")}</h3>

      <div class="ts-info-username">
        ${username ? "@" + escapeHTML(username) : "TELESUPAR User"}
      </div>

      <div class="ts-info-actions">
        <button class="ts-info-action" id="ts-profile-message">
          <div style="font-size:23px;margin-bottom:5px;">●</div>
          Message
        </button>

        <button class="ts-info-action" id="ts-info-mute">
          <div style="font-size:23px;margin-bottom:5px;">🔔</div>
          Mute
        </button>
      </div>
    </div>

    <div class="ts-info-details">
      <div class="ts-info-bio">
        ${escapeHTML(bio)}
      </div>
      <div class="ts-info-label">Bio</div>

      <div class="ts-info-username-value">
        ${username ? "@" + escapeHTML(username) : "Not available"}
      </div>
      <div class="ts-info-label">Username</div>
    </div>

    <div class="ts-info-posts">
      <div style="font-size:18px;font-weight:850;">
        User Posts
      </div>

      <p style="font-size:13px;color:#94a3b8;">
        View this user's posts and profile.
      </p>

      <button id="ts-view-user-profile">
        View Full Profile →
      </button>
    </div>

    <div class="ts-info-details">
      <div style="font-size:13px;color:#94a3b8;">
        TELESUPAR Member
      </div>
    </div>
  `;

  container.appendChild(info);

  info.querySelector("#ts-info-back").onclick = () => {
    info.remove();
  };

  info.querySelector("#ts-profile-message").onclick = () => {
    info.remove();
  };

  info.querySelector("#ts-info-mute").onclick = () => {
    notice("Mute settings are not available yet.");
  };

  info.querySelector("#ts-view-user-profile").onclick = () => {
    if (window.openUserExploreProfile && user.id) {
      info.remove();
      window.openUserExploreProfile(user.id);
    } else {
      notice("Profile navigation is not available.");
    }
  };
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
      notice("Chat search is not available yet.");
    };

    popup.querySelector("#ts-menu-mute").onclick = () => {
      popup.remove();
      notice("Mute settings are not available yet.");
    };

    popup.querySelector("#ts-menu-info").onclick = () => {
      popup.remove();

      const container = getContainer();

      if (container && activeConversation) {
        renderChatInfo(container, user, activeConversation);
      }
    };

    popup.querySelector("#ts-menu-report").onclick = () => {
      popup.remove();
      notice("Report feature is not available yet.");
    };

    setTimeout(() => {
      document.addEventListener("click", function close(event) {
        if (!popup.contains(event.target)) {
          popup.remove();
          document.removeEventListener("click", close);
        }
      });
    }, 0);
  }

})();
