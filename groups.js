(function () {
  "use strict";

  const STORAGE_KEY = "telesupar_ts_groups_v2";

  const style = document.createElement("style");
  style.id = "telesupar-tg-groups-style";
  style.textContent = `
    .tg-wrap {
      min-height: 100vh;
      background: #090d16;
      color: #f8fafc;
      padding-bottom: 84px;
      font-family: inherit;
    }
    .tg-header {
      position: sticky;
      top: 0;
      z-index: 20;
      background: rgba(9, 13, 22, 0.92);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .tg-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px 6px;
    }
    .tg-title {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.2px;
    }
    .tg-sub {
      font-size: 11px;
      color: #94a3b8;
    }
    .tg-create-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 13px;
      border-radius: 12px;
      border: none;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .tg-tabs {
      display: flex;
      gap: 8px;
      padding: 8px 16px 12px;
    }
    .tg-tab-btn {
      flex: 1;
      padding: 8px 10px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.09);
      background: #111827;
      color: #94a3b8;
      font-weight: 700;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .tg-tab-btn.active {
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: #fff;
      border-color: transparent;
    }
    .tg-search-box {
      padding: 0 16px 12px;
    }
    .tg-search-input {
      width: 100%;
      box-sizing: border-box;
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 9px 14px;
      color: #fff;
      font-size: 13px;
      outline: none;
    }
    .tg-search-input::placeholder {
      color: #64748b;
    }
    .tg-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 13px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .tg-card:hover {
      background: rgba(255, 255, 255, 0.03);
    }
    .tg-card-left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      flex: 1;
    }
    .tg-icon {
      width: 48px;
      height: 48px;
      border-radius: 16px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 18px;
      color: #fff;
      flex-shrink: 0;
    }
    .tg-icon.group {
      background: linear-gradient(135deg, #0ea5e9, #14b8a6);
    }
    .tg-card-name {
      font-weight: 700;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tg-card-preview {
      font-size: 12px;
      color: #94a3b8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }
    .tg-badge {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      padding: 4px 8px;
      border-radius: 99px;
      background: rgba(139, 92, 246, 0.16);
      color: #c4b5fd;
      flex-shrink: 0;
    }
    .tg-badge.group {
      background: rgba(20, 184, 166, 0.16);
      color: #5eead4;
    }
    .tg-room-header {
      position: sticky;
      top: 0;
      z-index: 20;
      padding: 12px 16px;
      background: rgba(17, 24, 39, 0.95);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .tg-back-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 22px;
      cursor: pointer;
      padding: 0 4px;
    }
    .tg-perm-btn {
      padding: 6px 11px;
      border-radius: 99px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(20, 184, 166, 0.18);
      color: #5eead4;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }
    .tg-perm-btn.locked {
      background: rgba(244, 63, 94, 0.18);
      color: #fda4af;
    }
    .channel-post {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 14px;
      margin: 12px 14px;
    }
    .tg-post-author {
      font-size: 11px;
      font-weight: 700;
      color: #818cf8;
      margin-bottom: 6px;
    }
    .tg-post-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      gap: 8px;
    }
    .reaction-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .reaction-pill {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.09);
      color: #e2e8f0;
      padding: 4px 10px;
      border-radius: 99px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .reaction-pill.active {
      background: rgba(59, 130, 246, 0.25);
      border-color: #60a5fa;
      color: #fff;
      font-weight: 700;
    }
    .tg-chat-feed {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 58vh;
      max-height: 68vh;
      overflow-y: auto;
    }
    .tg-msg-bubble {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.06);
      padding: 10px 14px;
      border-radius: 16px;
      max-width: 82%;
      align-self: flex-start;
    }
    .tg-msg-bubble.own {
      align-self: flex-end;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.35), rgba(124, 58, 237, 0.35));
      border-color: rgba(129, 140, 248, 0.35);
    }
    .tg-role-tag {
      font-size: 9px;
      padding: 1px 6px;
      border-radius: 99px;
      background: rgba(129, 140, 248, 0.22);
      color: #c7d2fe;
      margin-left: 6px;
      text-transform: uppercase;
    }
    .tg-composer {
      position: sticky;
      bottom: 0;
      padding: 10px 14px 14px;
      background: rgba(9, 13, 22, 0.95);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .tg-locked-bar {
      position: sticky;
      bottom: 0;
      padding: 13px 16px;
      background: rgba(17, 24, 39, 0.96);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .tg-input {
      flex: 1;
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 99px;
      padding: 10px 16px;
      color: #fff;
      font-size: 13px;
      outline: none;
    }
    .tg-send-btn {
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: #fff;
      border: none;
      border-radius: 99px;
      padding: 10px 18px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
    }
  `;

  if (!document.getElementById(style.id)) {
    document.head.appendChild(style);
  }

  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));
  }

  function formatCompact(n) {
    const num = Number(n) || 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return String(num);
  }

  function formatTimeNow() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function getCurrentUserId() {
    return String(window.AppState?.user?.id || window.AppState?.user?._id || "");
  }

  function getCurrentUserName() {
    return (
      window.AppState?.user?.displayName ||
      window.AppState?.user?.username ||
      "You"
    );
  }

  function loadLocalData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveLocalData(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (_) {}
  }

  async function tryApi(path, options) {
    if (typeof window.api !== "function") return null;
    try {
      const res = await window.api(path, options);
      return res || null;
    } catch (_) {
      return null;
    }
  }

  window.renderGroups = async function (container) {
    if (!container) return;

    let rooms = loadLocalData();
    let activeFilter = "all";
    let searchQuery = "";

    const apiRooms = await tryApi("/api/groups");
    if (apiRooms?.success && Array.isArray(apiRooms.groups)) {
      rooms = apiRooms.groups;
      saveLocalData(rooms);
    }

    function upsertRoom(updatedRoom) {
      if (!updatedRoom?.id) return;
      const idx = rooms.findIndex((r) => String(r.id) === String(updatedRoom.id));
      if (idx >= 0) {
        rooms[idx] = updatedRoom;
      } else {
        rooms.unshift(updatedRoom);
      }
      saveLocalData(rooms);
    }

    function getPreviewText(room) {
      if (room.type === "channel") {
        const lastPost = room.posts?.[room.posts.length - 1];
        return lastPost?.text || "Only admins can post";
      }
      const lastMsg = room.messages?.[room.messages.length - 1];
      return lastMsg ? `${lastMsg.sender}: ${lastMsg.text}` : "No messages yet";
    }

    function renderList() {
      const q = searchQuery.trim().toLowerCase();
      const filtered = rooms.filter((item) => {
        const matchesType = activeFilter === "all" || item.type === activeFilter;
        const matchesQuery =
          !q ||
          item.name.toLowerCase().includes(q) ||
          getPreviewText(item).toLowerCase().includes(q);
        return matchesType && matchesQuery;
      });

      container.innerHTML = `
        <div class="tg-wrap">
          <div class="tg-header">
            <div class="tg-top-row">
              <div>
                <div class="tg-title">Channels & Groups</div>
                <div class="tg-sub">Admin-only channels & permission-controlled groups</div>
              </div>
              <button type="button" class="tg-create-btn" id="create-tg-btn">+ New</button>
            </div>
            <div class="tg-tabs">
              <button type="button" class="tg-tab-btn ${activeFilter === "all" ? "active" : ""}" data-f="all">All (${rooms.length})</button>
              <button type="button" class="tg-tab-btn ${activeFilter === "channel" ? "active" : ""}" data-f="channel">📢 Channels</button>
              <button type="button" class="tg-tab-btn ${activeFilter === "group" ? "active" : ""}" data-f="group">👥 Groups</button>
            </div>
            <div class="tg-search-box">
              <input
                type="text"
                class="tg-search-input"
                id="tg-search-input"
                placeholder="Search channels or groups..."
                value="${escapeHtml(searchQuery)}"
              />
            </div>
          </div>

          <div>
            ${
              filtered.length
                ? filtered
                    .map(
                      (item) => `
                <div class="tg-card" data-open-id="${escapeHtml(item.id)}">
                  <div class="tg-card-left">
                    <div class="tg-icon ${item.type === "group" ? "group" : ""}">
                      ${item.type === "channel" ? "📢" : "👥"}
                    </div>
                    <div style="min-width:0; flex:1;">
                      <div class="tg-card-name">${escapeHtml(item.name)}</div>
                      <div class="tg-card-preview">${escapeHtml(getPreviewText(item))}</div>
                    </div>
                  </div>
                  <span class="tg-badge ${item.type === "group" ? "group" : ""}">
                    ${escapeHtml(item.type)}
                  </span>
                </div>
              `
                    )
                    .join("")
                : `<div style="text-align:center; padding:44px 16px; color:#94a3b8; font-size:13px;">No channels or groups yet. Tap "+ New" to create one.</div>`
            }
          </div>
        </div>
      `;

      container.querySelectorAll("[data-f]").forEach((btn) => {
        btn.onclick = () => {
          activeFilter = btn.dataset.f;
          renderList();
        };
      });

      const searchEl = container.querySelector("#tg-search-input");
      if (searchEl) {
        searchEl.oninput = (e) => {
          searchQuery = e.target.value;
          renderList();
          const updatedInput = container.querySelector("#tg-search-input");
          if (updatedInput) {
            updatedInput.focus();
            updatedInput.setSelectionRange(updatedInput.value.length, updatedInput.value.length);
          }
        };
      }

      container.querySelector("#create-tg-btn").onclick = async () => {
        const rawName = prompt("Enter Channel or Group Name:");
        const name = (rawName || "").trim();
        if (!name) return;

        const isChannel = confirm(
          "Click OK for Broadcast Channel (Only Owner/Admin can post)\nClick Cancel for Discussion Group (Members can chat when allowed)"
        );
        const type = isChannel ? "channel" : "group";
        const allowMemberMessages = !isChannel
          ? confirm("Allow all group members to send messages?\n(OK = Everyone can chat, Cancel = Only Admins can message)")
          : false;

        const myId = getCurrentUserId();
        const created = await tryApi("/api/groups", {
          method: "POST",
          body: JSON.stringify({ name, type, allowMemberMessages })
        });

        if (created?.success && created.group) {
          upsertRoom(created.group);
          renderList();
          return;
        }

        const fallbackRoom = {
          id: "tg_" + Date.now(),
          type,
          name,
          ownerId: myId,
          admins: [myId],
          isOwner: true,
          isAdmin: true,
          isMember: true,
          allowMemberMessages,
          canPost: true,
          members: isChannel ? "1 subscriber" : "1 member",
          posts: isChannel
            ? [
                {
                  id: "p_" + Date.now(),
                  text: `Channel "${name}" is live.`,
                  authorName: getCurrentUserName(),
                  views: 1,
                  likes: 0,
                  fire: 0,
                  likedByMe: false,
                  firedByMe: false,
                  time: formatTimeNow()
                }
              ]
            : [],
          messages: !isChannel
            ? [
                {
                  id: "m_" + Date.now(),
                  sender: getCurrentUserName(),
                  senderId: myId,
                  isAdminSender: true,
                  text: `Welcome to ${name}!`,
                  own: true,
                  time: formatTimeNow()
                }
              ]
            : []
        };

        upsertRoom(fallbackRoom);
        renderList();
      };

      container.querySelectorAll("[data-open-id]").forEach((card) => {
        card.onclick = () => {
          const item = rooms.find((x) => String(x.id) === String(card.dataset.openId));
          if (item) openTgRoom(item);
        };
      });
    }

    function openTgRoom(item) {
      if (!Array.isArray(item.posts)) item.posts = [];
      if (!Array.isArray(item.messages)) item.messages = [];

      const isAdmin = Boolean(item.isAdmin || item.isOwner);
      const isMember = Boolean(item.isMember || isAdmin);
      const allowMemberMessages = item.allowMemberMessages !== false;

      if (item.type === "channel") {
        const canBroadcast = isAdmin;

        container.innerHTML = `
          <div class="tg-wrap">
            <div class="tg-room-header">
              <div style="display:flex; align-items:center; gap:12px; min-width:0;">
                <button type="button" class="tg-back-btn" id="tg-back">←</button>
                <div style="min-width:0;">
                  <div style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(item.name)}</div>
                  <div style="font-size:11px; color:#94a3b8;">${escapeHtml(item.members)} • ${isAdmin ? "Admin" : "Subscriber"}</div>
                </div>
              </div>
              ${
                !isMember
                  ? `<button type="button" id="tg-join-btn" class="tg-perm-btn">Subscribe</button>`
                  : `<span class="tg-badge">${isAdmin ? "Admin" : "Subscribed"}</span>`
              }
            </div>

            <div id="channel-posts-list">
              ${
                item.posts.length
                  ? item.posts
                      .map(
                        (p) => `
                  <div class="channel-post" data-post-id="${escapeHtml(p.id)}">
                    <div class="tg-post-author">📢 ${escapeHtml(p.authorName || item.name)}</div>
                    <div style="font-size:14px; line-height:1.5; white-space:pre-wrap;">${escapeHtml(p.text)}</div>
                    <div class="tg-post-meta">
                      <div class="reaction-row">
                        <button type="button" class="reaction-pill ${p.likedByMe ? "active" : ""}" data-react="like" data-pid="${escapeHtml(p.id)}">
                          👍 ${Number(p.likes) || 0}
                        </button>
                        <button type="button" class="reaction-pill ${p.firedByMe ? "active" : ""}" data-react="fire" data-pid="${escapeHtml(p.id)}">
                          🔥 ${Number(p.fire) || 0}
                        </button>
                      </div>
                      <div style="font-size:11px; color:#64748b; display:flex; gap:8px;">
                        <span>${escapeHtml(p.time || "")}</span>
                        <span>👁 ${formatCompact(p.views)}</span>
                      </div>
                    </div>
                  </div>
                `
                      )
                      .join("")
                  : `<div style="text-align:center; padding:44px 16px; color:#94a3b8; font-size:13px;">No broadcasts yet.</div>`
              }
            </div>

            ${
              canBroadcast
                ? `
              <div class="tg-composer">
                <input
                  id="ch-broadcast-input"
                  class="tg-input"
                  placeholder="Broadcast message as admin..."
                  autocomplete="off"
                />
                <button type="button" id="ch-broadcast-btn" class="tg-send-btn">Post</button>
              </div>
            `
                : `
              <div class="tg-locked-bar">
                <span>🔒 Only channel owner & admins can post broadcasts</span>
                ${!isMember ? `<button type="button" id="tg-join-bottom" class="tg-perm-btn">Subscribe</button>` : ""}
              </div>
            `
            }
          </div>
        `;

        container.querySelector("#tg-back").onclick = renderList;

        const handleJoin = async () => {
          const joined = await tryApi(`/api/groups/${encodeURIComponent(item.id)}/join`, { method: "POST" });
          if (joined?.success && joined.group) {
            upsertRoom(joined.group);
            openTgRoom(joined.group);
          } else {
            item.isMember = true;
            upsertRoom(item);
            openTgRoom(item);
          }
        };
        const topJoin = container.querySelector("#tg-join-btn");
        const botJoin = container.querySelector("#tg-join-bottom");
        if (topJoin) topJoin.onclick = handleJoin;
        if (botJoin) botJoin.onclick = handleJoin;

        container.querySelectorAll(".reaction-pill").forEach((pill) => {
          pill.onclick = async () => {
            const pid = pill.dataset.pid;
            const kind = pill.dataset.react;
            const target = item.posts.find((x) => String(x.id) === String(pid));
            if (!target) return;

            if (kind === "like") {
              target.likedByMe = !target.likedByMe;
              target.likes = Math.max(0, (Number(target.likes) || 0) + (target.likedByMe ? 1 : -1));
            } else if (kind === "fire") {
              target.firedByMe = !target.firedByMe;
              target.fire = Math.max(0, (Number(target.fire) || 0) + (target.firedByMe ? 1 : -1));
            }

            upsertRoom(item);
            const res = await tryApi(`/api/groups/${encodeURIComponent(item.id)}/posts/${encodeURIComponent(pid)}/react`, {
              method: "POST",
              body: JSON.stringify({ reaction: kind })
            });
            if (res?.success && res.group) {
              upsertRoom(res.group);
              openTgRoom(res.group);
              return;
            }
            openTgRoom(item);
          };
        });

        if (canBroadcast) {
          const publishPost = async () => {
            const input = container.querySelector("#ch-broadcast-input");
            const val = (input?.value || "").trim();
            if (!val) return;

            const res = await tryApi(`/api/groups/${encodeURIComponent(item.id)}/posts`, {
              method: "POST",
              body: JSON.stringify({ text: val })
            });

            if (res && res.success === false) {
              alert(res.message || "Only channel owner or admins can post.");
              return;
            }

            if (res?.success && res.group) {
              upsertRoom(res.group);
              openTgRoom(res.group);
              return;
            }

            item.posts.push({
              id: "p_" + Date.now(),
              text: val,
              authorName: getCurrentUserName(),
              views: 1,
              likes: 0,
              fire: 0,
              likedByMe: false,
              firedByMe: false,
              time: formatTimeNow()
            });
            upsertRoom(item);
            openTgRoom(item);
          };

          container.querySelector("#ch-broadcast-btn").onclick = publishPost;
          container.querySelector("#ch-broadcast-input").onkeydown = (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              publishPost();
            }
          };
        }
      } else {
        const canMessage = isAdmin || (isMember && allowMemberMessages);

        container.innerHTML = `
          <div class="tg-wrap">
            <div class="tg-room-header">
              <div style="display:flex; align-items:center; gap:12px; min-width:0;">
                <button type="button" class="tg-back-btn" id="tg-back">←</button>
                <div style="min-width:0;">
                  <div style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(item.name)}</div>
                  <div style="font-size:11px; color:#14b8a6;">${escapeHtml(item.members)} • ${allowMemberMessages ? "All members can chat" : "Admins only"}</div>
                </div>
              </div>
              ${
                isAdmin
                  ? `<button type="button" id="tg-perm-toggle" class="tg-perm-btn ${allowMemberMessages ? "" : "locked"}">
                      ${allowMemberMessages ? "🔓 Chat: Everyone" : "🔒 Chat: Admins Only"}
                    </button>`
                  : (!isMember ? `<button type="button" id="tg-join-btn" class="tg-perm-btn">Join Group</button>` : "")
              }
            </div>

            <div class="tg-chat-feed" id="tg-chat-feed">
              ${
                item.messages.length
                  ? item.messages
                      .map(
                        (m) => `
                  <div class="tg-msg-bubble ${m.own ? "own" : ""}">
                    <div style="font-size:11px; font-weight:700; color:${m.own ? "#93c5fd" : "#c084fc"}; margin-bottom:3px;">
                      ${escapeHtml(m.sender || "Member")}
                      ${m.isAdminSender ? `<span class="tg-role-tag">Admin</span>` : ""}
                    </div>
                    <div style="font-size:14px; line-height:1.45; white-space:pre-wrap;">${escapeHtml(m.text)}</div>
                    <div style="font-size:10px; color:#94a3b8; text-align:right; margin-top:4px;">${escapeHtml(m.time || "")}</div>
                  </div>
                `
                      )
                      .join("")
                  : `<div style="text-align:center; padding:44px 16px; color:#94a3b8; font-size:13px;">No messages in this group yet.</div>`
              }
            </div>

            ${
              canMessage
                ? `
              <div class="tg-composer">
                <input
                  id="grp-msg-input"
                  class="tg-input"
                  placeholder="Message group..."
                  autocomplete="off"
                />
                <button type="button" id="grp-send-btn" class="tg-send-btn">Send</button>
              </div>
            `
                : `
              <div class="tg-locked-bar">
                ${
                  !isMember
                    ? `<span>Join this group to participate in chat</span><button type="button" id="tg-join-bottom" class="tg-perm-btn">Join Group</button>`
                    : `<span>🔒 Group admins have restricted messaging to admins only</span>`
                }
              </div>
            `
            }
          </div>
        `;

        container.querySelector("#tg-back").onclick = renderList;

        const feedEl = container.querySelector("#tg-chat-feed");
        if (feedEl) feedEl.scrollTop = feedEl.scrollHeight;

        const permToggle = container.querySelector("#tg-perm-toggle");
        if (permToggle) {
          permToggle.onclick = async () => {
            const nextState = !allowMemberMessages;
            const res = await tryApi(`/api/groups/${encodeURIComponent(item.id)}/settings`, {
              method: "PATCH",
              body: JSON.stringify({ allowMemberMessages: nextState })
            });
            if (res?.success && res.group) {
              upsertRoom(res.group);
              openTgRoom(res.group);
            } else {
              item.allowMemberMessages = nextState;
              upsertRoom(item);
              openTgRoom(item);
            }
          };
        }

        const handleGroupJoin = async () => {
          const joined = await tryApi(`/api/groups/${encodeURIComponent(item.id)}/join`, { method: "POST" });
          if (joined?.success && joined.group) {
            upsertRoom(joined.group);
            openTgRoom(joined.group);
          } else {
            item.isMember = true;
            upsertRoom(item);
            openTgRoom(item);
          }
        };
        const topJoin = container.querySelector("#tg-join-btn");
        const botJoin = container.querySelector("#tg-join-bottom");
        if (topJoin) topJoin.onclick = handleGroupJoin;
        if (botJoin) botJoin.onclick = handleGroupJoin;

        if (canMessage) {
          const sendGroupMsg = async () => {
            const input = container.querySelector("#grp-msg-input");
            const val = (input?.value || "").trim();
            if (!val) return;

            const senderName = getCurrentUserName();
            const res = await tryApi(`/api/groups/${encodeURIComponent(item.id)}/messages`, {
              method: "POST",
              body: JSON.stringify({ sender: senderName, text: val })
            });

            if (res && res.success === false) {
              alert(res.message || "You do not have permission to send messages here.");
              return;
            }

            if (res?.success && res.group) {
              upsertRoom(res.group);
              openTgRoom(res.group);
              return;
            }

            item.messages.push({
              id: "m_" + Date.now(),
              sender: senderName,
              senderId: getCurrentUserId(),
              isAdminSender: isAdmin,
              text: val,
              own: true,
              time: formatTimeNow()
            });
            upsertRoom(item);
            openTgRoom(item);
          };

          container.querySelector("#grp-send-btn").onclick = sendGroupMsg;
          container.querySelector("#grp-msg-input").onkeydown = (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendGroupMsg();
            }
          };
        }
      }
    }

    renderList();
  };
})();
