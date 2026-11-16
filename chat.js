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
    .chat-room { display: flex; flex-direction: column; height: calc(100vh - 66px); position: relative; }
    .chat-room-header {
      display: flex; align-items: center; justify-content: space-between; padding: 10px 14px;
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
      align-self: flex-end; background: linear-gradient(135deg, #0d9488, #0f766e); color: #fff;
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

    /* Profile / Chat Vault Drawer */
    .chat-vault-modal {
      position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 100;
      display: flex; justify-content: center; align-items: flex-end;
    }
    .chat-vault-content {
      width: 100%; max-width: 480px; max-height: 80vh; background: #111827;
      border-top-left-radius: 24px; border-top-right-radius: 24px; padding: 20px; overflow-y: auto;
    }
  `;
  document.head.appendChild(style);

  window.renderChat = async function(container) {
    const bottomNav = document.querySelector(".bottom-nav");
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

    // Hide bottom navigation bar during active chat
    const bottomNav = document.querySelector(".bottom-nav");
    if (bottomNav) bottomNav.classList.add("hidden");

    container.innerHTML = `
      <div class="chat-room">
        <div class="chat-room-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <button id="back-to-chats" style="background:none; border:none; color:#fff; font-size:20px; cursor:pointer;">←</button>
            <div class="chat-room-user-info" id="open-user-vault">
              <img src="${window.avatarUrl(other)}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;" />
              <div>
                <div style="font-weight:700; font-size:15px;">${other.displayName}</div>
                <div id="chat-sub-status" style="font-size:11px; color:#14b8a6;">
                  ${other.isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </div>
          </div>
          <button id="btn-chat-settings" class="icon-btn" title="Chat Settings & Media">⚙️</button>
        </div>

        <div class="messages-area" id="messages-area"></div>

        <div class="chat-input-bar">
          <label style="cursor:pointer; font-size:20px; padding:0 4px;">
            📎
            <input type="file" id="chat-attach-input" hidden />
          </label>
          <input type="text" id="chat-msg-input" class="chat-text-input" placeholder="Message..." />
          <button id="chat-send-btn" class="icon-btn" style="background:#14b8a6; border:none;">➤</button>
        </div>
      </div>
    `;

    // Click on DP/Name to open user profile & media vault
    document.getElementById("open-user-vault").onclick = () => openChatVault(other);
    document.getElementById("btn-chat-settings").onclick = () => openChatVault(other);

    const socket = window.AppState.socket;
    if (socket) {
      socket.emit("joinConversation", conv.id);
      socket.off("newMessage").on("newMessage", (msg) => {
        if (msg.conversationId === conv.id) appendMessage(msg, myId);
      });
      socket.off("typing").on("typing", (data) => {
        if (data.conversationId === conv.id) {
          document.getElementById("chat-sub-status").textContent = data.isTyping ? "typing..." : (other.isOnline ? "Online" : "Offline");
        }
      });
    }

    document.getElementById("back-to-chats").onclick = () => {
      if (socket) socket.emit("leaveConversation", conv.id);
      window.AppState.activeConversation = null;
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

  // Chat Vault Modal (Profile + Shared Media, Files & Links)
  async function openChatVault(user) {
    const modal = document.createElement("div");
    modal.className = "chat-vault-modal";

    modal.innerHTML = `
      <div class="chat-vault-content">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3>Chat Details</h3>
          <button id="close-vault" style="background:none; border:none; color:#94a3b8; font-size:20px; cursor:pointer;">✕</button>
        </div>
        <div style="text-align:center; margin-bottom:16px;">
          <img src="${window.avatarUrl(user)}" style="width:72px; height:72px; border-radius:50%; object-fit:cover; margin-bottom:8px;" />
          <div style="font-weight:700; font-size:16px;">${user.displayName}</div>
          <div style="color:#a855f7; font-size:13px;">@${user.username}</div>
          <p style="color:#cbd5e1; font-size:13px; margin-top:6px;">${user.bio || "No bio available."}</p>
        </div>
        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top:14px;">
          <h4 style="font-size:13px; color:#94a3b8; margin-bottom:10px;">Shared Media & Files</h4>
          <div id="vault-media-list" style="font-size:12px; color:#94a3b8;">Loading shared items...</div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector("#close-vault").onclick = () => modal.remove();

    // Fetch shared media/files using backend API
    const res = await window.api(`/api/users/${user.id}/private-content`);
    const mediaListContainer = modal.querySelector("#vault-media-list");
    if (res.success) {
      const totalItems = [...(res.media || []), ...(res.files || [])];
      if (!totalItems.length) {
        mediaListContainer.innerHTML = `<p>No shared media or files in this chat yet.</p>`;
        return;
      }
      mediaListContainer.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px;">
          ${res.media.map(m => `<img src="${m.url}" style="width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:8px;" />`).join("")}
        </div>
      `;
    }
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
