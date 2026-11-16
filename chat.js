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

    /* Telegram Glassmorphism Popup Menu */
    .tg-popup-menu {
      position: absolute; top: 60px; right: 14px; width: 220px;
      background: rgba(17, 24, 39, 0.92); backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.12); border-radius: 16px;
      box-shadow: 0 16px 32px rgba(0,0,0,0.6); z-index: 100; padding: 6px 0;
    }
    .tg-popup-item {
      padding: 11px 16px; font-size: 13px; color: #f8fafc; cursor: pointer;
      display: flex; align-items: center; gap: 12px;
    }
    .tg-popup-item:hover { background: rgba(255,255,255,0.06); }

    /* Telegram Profile / Vault Screen */
    .tg-profile-view {
      position: fixed; inset: 0; background: #090d16; z-index: 110;
      display: flex; flex-direction: column; overflow-y: auto;
    }
    .tg-profile-header {
      padding: 14px; display: flex; align-items: center; background: #111827;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .tg-profile-hero { padding: 24px 16px; text-align: center; background: #111827; margin-bottom: 12px; }
    .tg-action-buttons { display: flex; justify-content: center; gap: 14px; margin-top: 16px; }
    .tg-action-btn {
      background: #1e293b; border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px; padding: 10px 18px; color: #fff; font-size: 12px; font-weight: 600;
      display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer;
    }
    .tg-tabs-bar { display: flex; border-bottom: 1px solid rgba(255,255,255,0.08); background: #111827; }
    .tg-profile-tab {
      flex: 1; text-align: center; padding: 12px; font-size: 13px; font-weight: 700; color: #94a3b8; cursor: pointer;
      border-bottom: 2px solid transparent;
    }
    .tg-profile-tab.active { color: #38bdf8; border-bottom-color: #38bdf8; }
  `;
  document.head.appendChild(style);

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

    listEl.innerHTML = data.conversations.map(c => `
      <div class="chat-list-item" data-conv-id="${c.id}">
        <div style="display:flex; gap:12px; align-items:center;">
          <div class="chat-avatar-wrap">
            <img src="${window.avatarUrl(c.otherUser)}" />
            ${c.otherUser.isOnline ? '<span class="status-indicator"></span>' : ""}
          </div>
          <div>
            <div style="font-weight:700; font-size:15px;">${c.otherUser.displayName}</div>
            <div style="font-size:12px; color:#94a3b8; max-width:220px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              ${c.lastMessage || "Tap to start chatting"}
            </div>
          </div>
        </div>
        ${c.unreadCount > 0 ? `<span class="unread-pill">${c.unreadCount}</span>` : ""}
      </div>
    `).join("");

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

    // Hide main header and bottom navigation bar completely during active chat
    const mainHeader = document.querySelector(".top-header");
    const bottomNav = document.querySelector(".bottom-nav");
    if (mainHeader) mainHeader.classList.add("hidden");
    if (bottomNav) bottomNav.classList.add("hidden");

    container.innerHTML = `
      <div class="chat-room" id="active-chat-room">
        <div class="chat-room-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <button id="back-to-chats" style="background:none; border:none; color:#fff; font-size:20px; cursor:pointer;">←</button>
            <div class="chat-room-user-info" id="open-user-vault">
              <img src="${window.avatarUrl(other)}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;" />
              <div>
                <div style="font-weight:700; font-size:15px;">${other.displayName}</div>
                <div id="chat-sub-status" style="font-size:11px; color:#14b8a6;">
                  ${other.isOnline ? "Online" : "last seen recently"}
                </div>
              </div>
            </div>
          </div>
          <div style="position:relative;">
            <button id="btn-chat-menu" class="icon-btn" style="background:transparent; border:none;">⋮</button>
            <div id="tg-menu-dropdown" class="tg-popup-menu hidden">
              <div class="tg-popup-item" id="menu-mute">🔔 Mute</div>
              <div class="tg-popup-item" id="menu-call">📞 Call</div>
              <div class="tg-popup-item" id="menu-video">📹 Video Call</div>
              <div class="tg-popup-item" id="menu-search">🔍 Search</div>
              <div class="tg-popup-item" id="menu-clear">🧹 Clear History</div>
              <div class="tg-popup-item" id="menu-delete" style="color:#ef4444;">🗑 Delete chat</div>
            </div>
          </div>
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

    // Toggle Telegram Three Dots Popup
    const menuBtn = document.getElementById("btn-chat-menu");
    const menuDropdown = document.getElementById("tg-menu-dropdown");
    menuBtn.onclick = (e) => {
      e.stopPropagation();
      menuDropdown.classList.toggle("hidden");
    };
    document.addEventListener("click", () => menuDropdown.classList.add("hidden"));

    document.getElementById("menu-mute").onclick = () => alert("Chat muted successfully");
    document.getElementById("menu-call").onclick = () => alert("Calling " + other.displayName + "...");
    document.getElementById("menu-video").onclick = () => alert("Starting video call...");
    document.getElementById("menu-search").onclick = () => {
      const q = prompt("Search in conversation:");
      if (q) alert("Searching for: " + q);
    };
    document.getElementById("menu-clear").onclick = () => {
      if (confirm("Clear history for this chat?")) {
        document.getElementById("messages-area").innerHTML = "";
      }
    };
    document.getElementById("menu-delete").onclick = () => {
      if (confirm("Delete this chat?")) {
        document.getElementById("back-to-chats").click();
      }
    };

    // Click on DP/Name to open Telegram Profile View
    document.getElementById("open-user-vault").onclick = () => openTelegramProfile(other, container, conv);

    const socket = window.AppState.socket;
    if (socket) {
      socket.emit("joinConversation", conv.id);
      socket.off("newMessage").on("newMessage", (msg) => {
        if (msg.conversationId === conv.id) appendMessage(msg, myId);
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

  // Telegram Style Profile & Shared Vault View (as shown in 27711.png)
  async function openTelegramProfile(user, container, conv) {
    const room = document.getElementById("active-chat-room");
    if (room) room.style.display = "none";

    const profileView = document.createElement("div");
    profileView.className = "tg-profile-view";
    container.appendChild(profileView);

    let activeTab = "Files";

    async function renderProfileContent() {
      const res = await window.api(`/api/users/${user.id}/private-content`);
      const files = res.success ? (res.files || []) : [];
      const links = res.success ? (res.links || []) : [];

      profileView.innerHTML = `
        <div class="tg-profile-header">
          <button id="close-tg-profile" style="background:none; border:none; color:#fff; font-size:20px; cursor:pointer; margin-right:16px;">←</button>
          <div style="font-weight:700; font-size:16px;">Profile</div>
        </div>

        <div class="tg-profile-hero">
          <img src="${window.avatarUrl(user)}" style="width:96px; height:96px; border-radius:50%; object-fit:cover; margin-bottom:12px;" />
          <div style="font-weight:800; font-size:18px;">${user.displayName}</div>
          <div style="font-size:12px; color:#94a3b8; margin-top:2px;">last seen recently</div>

          <div class="tg-action-buttons">
            <div class="tg-action-btn" id="prof-msg-btn">
              <span style="font-size:18px;">💬</span> Message
            </div>
            <div class="tg-action-btn">
              <span style="font-size:18px;">🔔</span> Mute
            </div>
            <div class="tg-action-btn">
              <span style="font-size:18px;">📞</span> Call
            </div>
            <div class="tg-action-btn">
              <span style="font-size:18px;">📹</span> Video
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

        <div style="padding:16px; flex:1;" id="vault-tab-content">
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

      profileView.querySelector("#close-tg-profile").onclick = () => {
        profileView.remove();
        if (room) room.style.display = "flex";
      };

      profileView.querySelector("#prof-msg-btn").onclick = () => {
        profileView.remove();
        if (room) room.style.display = "flex";
      };

      profileView.querySelectorAll(".tg-profile-tab").forEach(tab => {
        tab.onclick = () => {
          activeTab = tab.dataset.tab;
          renderProfileContent();
        };
      });
    }

    renderProfileContent();
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
