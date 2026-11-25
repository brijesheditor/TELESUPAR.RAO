(function () {
  "use strict";

  const STORAGE_KEY = "telesupar_tg_ui_v3";

  const style = document.createElement("style");
  style.id = "telesupar-tg-ui-style";
  style.textContent = `
    .tg-app {
      min-height: 100vh;
      background: #0e1621;
      color: #f5f9fc;
      padding-bottom: 84px;
      font-family: inherit;
    }
    .tg-topbar {
      position: sticky;
      top: 0;
      z-index: 25;
      background: #17212b;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .tg-topbar-title {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.2px;
    }
    .tg-icon-btn {
      background: #242f3d;
      color: #e8eef5;
      border: none;
      border-radius: 999px;
      height: 34px;
      padding: 0 12px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .tg-search-wrap {
      background: #17212b;
      padding: 4px 14px 10px;
    }
    .tg-search {
      width: 100%;
      box-sizing: border-box;
      background: #242f3d;
      color: #fff;
      border: none;
      border-radius: 20px;
      padding: 9px 15px;
      font-size: 14px;
      outline: none;
    }
    .tg-search::placeholder {
      color: #7f91a4;
    }
    .tg-chips {
      display: flex;
      gap: 8px;
      padding: 8px 14px 10px;
      background: #17212b;
      overflow-x: auto;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .tg-chip {
      background: #242f3d;
      color: #8fa3b8;
      border: none;
      border-radius: 16px;
      padding: 6px 13px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .tg-chip.active {
      background: #2b5278;
      color: #fff;
    }
    .tg-chip-count {
      background: rgba(255, 255, 255, 0.14);
      padding: 1px 6px;
      border-radius: 10px;
      font-size: 11px;
    }
    .tg-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      cursor: pointer;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
    .tg-row:active {
      background: #1d2a38;
    }
    .tg-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2aabee, #229ed9);
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 18px;
      color: #fff;
      flex-shrink: 0;
    }
    .tg-avatar.grp {
      background: linear-gradient(135deg, #00b894, #0984e3);
    }
    .tg-row-main {
      flex: 1;
      min-width: 0;
    }
    .tg-row-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .tg-row-name {
      font-size: 15px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tg-row-time {
      font-size: 11px;
      color: #7f91a4;
      flex-shrink: 0;
    }
    .tg-row-bot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-top: 3px;
    }
    .tg-row-sub {
      font-size: 13px;
      color: #8fa3b8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tg-unread {
      background: #3b4b5c;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 12px;
      flex-shrink: 0;
    }
    .tg-chat-bg {
      min-height: 76vh;
      background-color: #0e1621;
      background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 0);
      background-size: 20px 20px;
      padding-bottom: 76px;
    }
    .tg-room-head {
      position: sticky;
      top: 0;
      z-index: 25;
      background: #17212b;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    }
    .tg-room-meta-click {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
      cursor: pointer;
    }
    .tg-pinned {
      background: #17212b;
      border-left: 3px solid #5288c1;
      padding: 7px 14px;
      font-size: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      cursor: pointer;
    }
    .tg-msg-card {
      background: #182533;
      border-radius: 14px;
      padding: 11px 13px;
      margin: 10px 12px;
      max-width: 92%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    }
    .tg-msg-card.own {
      background: #2b5278;
      margin-left: auto;
    }
    .tg-sender-link {
      font-size: 12px;
      font-weight: 700;
      color: #6ab2f2;
      margin-bottom: 4px;
      cursor: pointer;
      display: inline-block;
    }
    .tg-sender-link:hover {
      text-decoration: underline;
    }
    .tg-msg-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 8px;
      flex-wrap: wrap;
    }
    .tg-reacts {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .tg-react-pill {
      background: rgba(255, 255, 255, 0.08);
      border: none;
      color: #dce8f5;
      border-radius: 12px;
      padding: 3px 8px;
      font-size: 12px;
      cursor: pointer;
    }
    .tg-react-pill.active {
      background: #2b5278;
      color: #7cc4ff;
      font-weight: 700;
    }
    .tg-bottom-bar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 30;
      background: #17212b;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.07);
    }
    .tg-bottom-input {
      flex: 1;
      background: #242f3d;
      border: none;
      border-radius: 20px;
      padding: 9px 14px;
      color: #fff;
      font-size: 14px;
      outline: none;
    }
    .tg-send-circle {
      background: #5288c1;
      color: #fff;
      border: none;
      border-radius: 20px;
      padding: 9px 15px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
    }
    .tg-info-hero {
      background: #17212b;
      padding: 20px 16px 16px;
      text-align: center;
      border-bottom: 8px solid #0e1621;
    }
    .tg-info-avatar {
      width: 82px;
      height: 82px;
      border-radius: 50%;
      margin: 0 auto 10px;
      background: linear-gradient(135deg, #2aabee, #229ed9);
      display: grid;
      place-items: center;
      font-size: 32px;
      font-weight: 800;
      color: #fff;
    }
    .tg-info-actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 14px;
    }
    .tg-info-act-btn {
      background: #242f3d;
      color: #e8eef5;
      border: none;
      border-radius: 10px;
      padding: 9px 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .tg-info-list {
      background: #17212b;
      margin-bottom: 8px;
    }
    .tg-info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 13px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      cursor: pointer;
      font-size: 14px;
    }
    .tg-sub-tabs {
      display: flex;
      background: #17212b;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .tg-sub-tab {
      flex: 1;
      padding: 11px 6px;
      text-align: center;
      font-size: 13px;
      font-weight: 700;
      color: #8fa3b8;
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }
    .tg-sub-tab.active {
      color: #6ab2f2;
      border-bottom-color: #6ab2f2;
    }
    .tg-member-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      background: #17212b;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      cursor: pointer;
    }
    .tg-profile-overlay {
      position: fixed;
      inset: 0;
      z-index: 60;
      background: rgba(0, 0, 0, 0.65);
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .tg-profile-sheet {
      width: 100%;
      max-width: 520px;
      background: #17212b;
      border-radius: 18px 18px 0 0;
      padding: 18px 16px 26px;
      color: #f5f9fc;
    }
  `;

  if (!document.getElementById(style.id)) {
    document.head.appendChild(style);
  }

  function esc(v) {
    return String(v ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }

  function nowTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function compactNum(n) {
    const x = Number(n) || 0;
    if (x >= 1000000) return (x / 1000000).toFixed(1) + "M";
    if (x >= 1000) return (x / 1000).toFixed(1) + "K";
    return String(x);
  }

  function myId() {
    return String(window.AppState?.user?.id || window.AppState?.user?._id || "me");
  }

  function myName() {
    return window.AppState?.user?.displayName || window.AppState?.user?.username || "Admin";
  }

  function loadRooms() {
    try {
      const d = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(d) ? d : [];
    } catch (_) {
      return [];
    }
  }

  function saveRooms(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (_) {}
  }

  async function apiCall(url, opts) {
    if (typeof window.api === "function") {
      try {
        return await window.api(url, opts);
      } catch (_) {
        return null;
      }
    }
    return null;
  }

  async function openUserProfileView(container, userObjOrId, fallbackName) {
    const uid = typeof userObjOrId === "object" ? (userObjOrId?.id || userObjOrId?._id) : userObjOrId;

    if (typeof window.openUserProfile === "function" && uid) {
      window.openUserProfile(uid);
      return;
    }
    if (typeof window.viewUserProfile === "function" && uid) {
      window.viewUserProfile(uid);
      return;
    }

    let profile = typeof userObjOrId === "object" && userObjOrId ? userObjOrId : null;
    if (uid && /^[a-f\d]{24}$/i.test(String(uid))) {
      const res = await apiCall(`/api/users/${encodeURIComponent(uid)}/profile`);
      if (res?.success && res.profile) {
        profile = res.profile;
      }
    }

    const displayName = profile?.displayName || profile?.username || fallbackName || "User";
    const username = profile?.username ? `@${profile.username}` : "";
    const bio = profile?.bio || "TELESUPAR member";

    const existing = document.getElementById("tg-user-profile-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "tg-user-profile-modal";
    modal.className = "tg-profile-overlay";
    modal.innerHTML = `
      <div class="tg-profile-sheet">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-weight:700; font-size:15px;">User Info</span>
          <button type="button" id="tg-close-prof" style="background:none; border:none; color:#8fa3b8; font-size:20px; cursor:pointer;">✕</button>
        </div>
        <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
          <div class="tg-avatar" style="width:62px; height:62px; font-size:24px;">
            ${esc(displayName.charAt(0).toUpperCase())}
          </div>
          <div>
            <div style="font-size:18px; font-weight:800;">${esc(displayName)}</div>
            ${username ? `<div style="font-size:13px; color:#6ab2f2;">${esc(username)}</div>` : ""}
            <div style="font-size:12px; color:#8fa3b8; margin-top:4px;">${esc(bio)}</div>
          </div>
        </div>
      </div>
    `;
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
    modal.querySelector("#tg-close-prof").onclick = () => modal.remove();
    (container || document.body).appendChild(modal);
  }

  window.renderGroups = async function (container) {
    if (!container) return;

    let rooms = loadRooms();
    let filter = "all";
    let query = "";

    const apiData = await apiCall("/api/groups");
    if (apiData?.success && Array.isArray(apiData.groups)) {
      rooms = apiData.groups;
      saveRooms(rooms);
    }

    function syncRoom(room) {
      if (!room?.id) return;
      const idx = rooms.findIndex((r) => String(r.id) === String(room.id));
      if (idx >= 0) rooms[idx] = room;
      else rooms.unshift(room);
      saveRooms(rooms);
    }

    function lastText(room) {
      if (room.type === "channel") {
        const p = room.posts?.[room.posts.length - 1];
        return p?.text || "Broadcast channel";
      }
      const m = room.messages?.[room.messages.length - 1];
      return m ? `${m.sender}: ${m.text}` : "No messages yet";
    }

    function renderHome() {
      const q = query.trim().toLowerCase();
      const chCount = rooms.filter((r) => r.type === "channel").length;
      const grpCount = rooms.filter((r) => r.type === "group").length;

      const list = rooms.filter((r) => {
        const okType = filter === "all" || r.type === filter;
        const okQ = !q || r.name.toLowerCase().includes(q) || lastText(r).toLowerCase().includes(q);
        return okType && okQ;
      });

      container.innerHTML = `
        <div class="tg-app">
          <div class="tg-topbar">
            <div class="tg-topbar-title">Channels & Groups</div>
            <button type="button" class="tg-icon-btn" id="tg-new-btn">＋ Create</button>
          </div>
          <div class="tg-search-wrap">
            <input type="text" class="tg-search" id="tg-search-box" placeholder="Search Chats" value="${esc(query)}" />
          </div>
          <div class="tg-chips">
            <button type="button" class="tg-chip ${filter === "all" ? "active" : ""}" data-f="all">
              All <span class="tg-chip-count">${rooms.length}</span>
            </button>
            <button type="button" class="tg-chip ${filter === "channel" ? "active" : ""}" data-f="channel">
              📢 Channels <span class="tg-chip-count">${chCount}</span>
            </button>
            <button type="button" class="tg-chip ${filter === "group" ? "active" : ""}" data-f="group">
              👥 Groups <span class="tg-chip-count">${grpCount}</span>
            </button>
          </div>
          <div>
            ${
              list.length
                ? list
                    .map(
                      (r) => `
                <div class="tg-row" data-open="${esc(r.id)}">
                  <div class="tg-avatar ${r.type === "group" ? "grp" : ""}">
                    ${esc((r.name || "C").charAt(0).toUpperCase())}
                  </div>
                  <div class="tg-row-main">
                    <div class="tg-row-top">
                      <span class="tg-row-name">${r.type === "channel" ? "📢 " : "👥 "}${esc(r.name)}</span>
                      <span class="tg-row-time">${esc(r.lastTime || "")}</span>
                    </div>
                    <div class="tg-row-bot">
                      <span class="tg-row-sub">${esc(lastText(r))}</span>
                      <span class="tg-unread">${r.type === "channel" ? "Channel" : "Group"}</span>
                    </div>
                  </div>
                </div>
              `
                    )
                    .join("")
                : `<div style="text-align:center; padding:48px 16px; color:#7f91a4; font-size:14px;">No channels or groups yet. Tap "+ Create".</div>`
            }
          </div>
        </div>
      `;

      container.querySelectorAll("[data-f]").forEach((b) => {
        b.onclick = () => {
          filter = b.dataset.f;
          renderHome();
        };
      });

      const sBox = container.querySelector("#tg-search-box");
      if (sBox) {
        sBox.oninput = (e) => {
          query = e.target.value;
          renderHome();
          const el = container.querySelector("#tg-search-box");
          if (el) {
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
          }
        };
      }

      container.querySelector("#tg-new-btn").onclick = async () => {
        const name = (prompt("Enter Channel or Group Name:") || "").trim();
        if (!name) return;
        const isChannel = confirm("OK = Channel (Only Admin/Owner broadcasts)\nCancel = Group (Members chat when allowed)");
        const type = isChannel ? "channel" : "group";
        const allowMemberMessages = !isChannel
          ? confirm("Allow all group members to message?\nOK = Everyone can chat, Cancel = Admins only")
          : false;

        const uid = myId();
        const created = await apiCall("/api/groups", {
          method: "POST",
          body: JSON.stringify({ name, type, allowMemberMessages })
        });

        if (created?.success && created.group) {
          syncRoom(created.group);
          renderHome();
          return;
        }

        const room = {
          id: "room_" + Date.now(),
          type,
          name,
          ownerId: uid,
          admins: [uid],
          members: [{ id: uid, name: myName(), role: "Owner", joinedAt: "Just now" }],
          isOwner: true,
          isAdmin: true,
          isMember: true,
          allowMemberMessages,
          lastTime: nowTime(),
          posts: isChannel
            ? [
                {
                  id: "p_" + Date.now(),
                  text: `Welcome to ${name} channel!`,
                  authorName: myName(),
                  authorId: uid,
                  views: 1,
                  likes: 0,
                  fire: 0,
                  likedByMe: false,
                  firedByMe: false,
                  time: nowTime()
                }
              ]
            : [],
          messages: !isChannel
            ? [
                {
                  id: "m_" + Date.now(),
                  sender: myName(),
                  senderId: uid,
                  isAdminSender: true,
                  text: `Welcome to ${name}!`,
                  own: true,
                  time: nowTime()
                }
              ]
            : []
        };
        syncRoom(room);
        renderHome();
      };

      container.querySelectorAll("[data-open]").forEach((row) => {
        row.onclick = () => {
          const room = rooms.find((x) => String(x.id) === String(row.dataset.open));
          if (room) openRoom(room);
        };
      });
    }

    function openRoom(room) {
      room.posts = Array.isArray(room.posts) ? room.posts : [];
      room.messages = Array.isArray(room.messages) ? room.messages : [];
      room.members = Array.isArray(room.members) ? room.members : [];

      const isAdmin = Boolean(room.isAdmin || room.isOwner || room.ownerId === myId());
      const isMember = Boolean(room.isMember || isAdmin);
      const allowMemberMessages = room.allowMemberMessages !== false;

      if (room.type === "channel") {
        const pinned = room.posts[0];
        container.innerHTML = `
          <div class="tg-app">
            <div class="tg-room-head">
              <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <button type="button" class="tg-icon-btn" id="tg-back-home" style="padding:0 10px;">←</button>
                <div class="tg-room-meta-click" id="tg-open-info">
                  <div class="tg-avatar" style="width:38px; height:38px; font-size:15px;">
                    ${esc((room.name || "C").charAt(0).toUpperCase())}
                  </div>
                  <div style="min-width:0;">
                    <div style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(room.name)}</div>
                    <div style="font-size:11px; color:#8fa3b8;">${esc(room.membersCountText || `${Math.max(room.members.length, 1)} subscribers`)}</div>
                  </div>
                </div>
              </div>
              ${
                !isMember
                  ? `<button type="button" class="tg-icon-btn" id="tg-sub-btn" style="background:#5288c1;">Subscribe</button>`
                  : `<button type="button" class="tg-icon-btn" id="tg-info-dot">⋮</button>`
              }
            </div>

            ${
              pinned
                ? `<div class="tg-pinned" id="tg-pin-jump">
                    <div style="color:#6ab2f2; font-weight:700;">Pinned Broadcast</div>
                    <div style="color:#dce8f5; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(pinned.text)}</div>
                  </div>`
                : ""
            }

            <div class="tg-chat-bg">
              ${
                room.posts.length
                  ? room.posts
                      .map(
                        (p) => `
                  <div class="tg-msg-card">
                    <div class="tg-sender-link" data-uid="${esc(p.authorId || "")}" data-uname="${esc(p.authorName || room.name)}">
                      ${esc(p.authorName || room.name)}
                    </div>
                    <div style="font-size:14px; line-height:1.45; white-space:pre-wrap;">${esc(p.text)}</div>
                    <div class="tg-msg-foot">
                      <div class="tg-reacts">
                        <button type="button" class="tg-react-pill ${p.likedByMe ? "active" : ""}" data-react="like" data-pid="${esc(p.id)}">👍 ${Number(p.likes) || 0}</button>
                        <button type="button" class="tg-react-pill ${p.firedByMe ? "active" : ""}" data-react="fire" data-pid="${esc(p.id)}">🔥 ${Number(p.fire) || 0}</button>
                      </div>
                      <span style="font-size:11px; color:#7f91a4;">👁 ${compactNum((Number(p.views) || 0) + 1)} • ${esc(p.time || "")}</span>
                    </div>
                  </div>
                `
                      )
                      .join("")
                  : `<div style="text-align:center; padding:44px 16px; color:#7f91a4;">No channel posts yet.</div>`
              }
            </div>

            ${
              isAdmin
                ? `<div class="tg-bottom-bar">
                    <input type="text" class="tg-bottom-input" id="tg-ch-input" placeholder="Broadcast" autocomplete="off" />
                    <button type="button" class="tg-send-circle" id="tg-ch-send">Post</button>
                  </div>`
                : `<div class="tg-bottom-bar" style="justify-content:center; color:#8fa3b8; font-size:12px;">
                    Only channel owner & admins can broadcast
                  </div>`
            }
          </div>
        `;

        container.querySelector("#tg-back-home").onclick = renderHome;
        container.querySelector("#tg-open-info").onclick = () => openRoomInfo(room);
        const dotBtn = container.querySelector("#tg-info-dot");
        if (dotBtn) dotBtn.onclick = () => openRoomInfo(room);

        const subBtn = container.querySelector("#tg-sub-btn");
        if (subBtn) {
          subBtn.onclick = async () => {
            const res = await apiCall(`/api/groups/${encodeURIComponent(room.id)}/join`, { method: "POST" });
            if (res?.success && res.group) {
              syncRoom(res.group);
              openRoom(res.group);
            } else {
              room.isMember = true;
              syncRoom(room);
              openRoom(room);
            }
          };
        }

        container.querySelectorAll(".tg-sender-link").forEach((el) => {
          el.onclick = () => openUserProfileView(container, el.dataset.uid, el.dataset.uname);
        });

        container.querySelectorAll(".tg-react-pill").forEach((pill) => {
          pill.onclick = async () => {
            const pid = pill.dataset.pid;
            const kind = pill.dataset.react;
            const target = room.posts.find((x) => String(x.id) === String(pid));
            if (!target) return;
            if (kind === "like") {
              target.likedByMe = !target.likedByMe;
              target.likes = Math.max(0, (Number(target.likes) || 0) + (target.likedByMe ? 1 : -1));
            } else {
              target.firedByMe = !target.firedByMe;
              target.fire = Math.max(0, (Number(target.fire) || 0) + (target.firedByMe ? 1 : -1));
            }
            syncRoom(room);
            const res = await apiCall(`/api/groups/${encodeURIComponent(room.id)}/posts/${encodeURIComponent(pid)}/react`, {
              method: "POST",
              body: JSON.stringify({ reaction: kind })
            });
            if (res?.success && res.group) {
              syncRoom(res.group);
              openRoom(res.group);
              return;
            }
            openRoom(room);
          };
        });

        if (isAdmin) {
          const postNow = async () => {
            const inp = container.querySelector("#tg-ch-input");
            const txt = (inp?.value || "").trim();
            if (!txt) return;
            const res = await apiCall(`/api/groups/${encodeURIComponent(room.id)}/posts`, {
              method: "POST",
              body: JSON.stringify({ text: txt })
            });
            if (res && res.success === false) {
              alert(res.message || "Only admins can broadcast");
              return;
            }
            if (res?.success && res.group) {
              syncRoom(res.group);
              openRoom(res.group);
              return;
            }
            room.posts.push({
              id: "p_" + Date.now(),
              text: txt,
              authorName: myName(),
              authorId: myId(),
              views: 1,
              likes: 0,
              fire: 0,
              likedByMe: false,
              firedByMe: false,
              time: nowTime()
            });
            room.lastTime = nowTime();
            syncRoom(room);
            openRoom(room);
          };
          container.querySelector("#tg-ch-send").onclick = postNow;
          container.querySelector("#tg-ch-input").onkeydown = (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              postNow();
            }
          };
        }
      } else {
        const canChat = isAdmin || (isMember && allowMemberMessages);
        container.innerHTML = `
          <div class="tg-app">
            <div class="tg-room-head">
              <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <button type="button" class="tg-icon-btn" id="tg-back-home" style="padding:0 10px;">←</button>
                <div class="tg-room-meta-click" id="tg-open-info">
                  <div class="tg-avatar grp" style="width:38px; height:38px; font-size:15px;">
                    ${esc((room.name || "G").charAt(0).toUpperCase())}
                  </div>
                  <div style="min-width:0;">
                    <div style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(room.name)}</div>
                    <div style="font-size:11px; color:#8fa3b8;">${allowMemberMessages ? "All members can chat" : "Admins only"}</div>
                  </div>
                </div>
              </div>
              ${
                isAdmin
                  ? `<button type="button" class="tg-icon-btn" id="tg-perm-btn">${allowMemberMessages ? "🔓 Open" : "🔒 Admin Only"}</button>`
                  : (!isMember ? `<button type="button" class="tg-icon-btn" id="tg-join-grp" style="background:#5288c1;">Join</button>` : "")
              }
            </div>

            <div class="tg-chat-bg">
              ${
                room.messages.length
                  ? room.messages
                      .map(
                        (m) => `
                  <div class="tg-msg-card ${m.own ? "own" : ""}">
                    <div class="tg-sender-link" data-uid="${esc(m.senderId || "")}" data-uname="${esc(m.sender || "Member")}">
                      ${esc(m.sender || "Member")}
                    </div>
                    <div style="font-size:14px; line-height:1.45; white-space:pre-wrap;">${esc(m.text)}</div>
                    <div style="font-size:10px; color:#a8bdd1; text-align:right; margin-top:4px;">${esc(m.time || "")}</div>
                  </div>
                `
                      )
                      .join("")
                  : `<div style="text-align:center; padding:44px 16px; color:#7f91a4;">No group messages yet.</div>`
              }
            </div>

            ${
              canChat
                ? `<div class="tg-bottom-bar">
                    <input type="text" class="tg-bottom-input" id="tg-grp-input" placeholder="Message" autocomplete="off" />
                    <button type="button" class="tg-send-circle" id="tg-grp-send">Send</button>
                  </div>`
                : `<div class="tg-bottom-bar" style="justify-content:center; color:#8fa3b8; font-size:12px;">
                    ${!isMember ? "Join group to send messages" : "Messaging is currently restricted to admins"}
                  </div>`
            }
          </div>
        `;

        container.querySelector("#tg-back-home").onclick = renderHome;
        container.querySelector("#tg-open-info").onclick = () => openRoomInfo(room);

        container.querySelectorAll(".tg-sender-link").forEach((el) => {
          el.onclick = () => openUserProfileView(container, el.dataset.uid, el.dataset.uname);
        });

        const permBtn = container.querySelector("#tg-perm-btn");
        if (permBtn) {
          permBtn.onclick = async () => {
            const next = !allowMemberMessages;
            const res = await apiCall(`/api/groups/${encodeURIComponent(room.id)}/settings`, {
              method: "PATCH",
              body: JSON.stringify({ allowMemberMessages: next })
            });
            if (res?.success && res.group) {
              syncRoom(res.group);
              openRoom(res.group);
            } else {
              room.allowMemberMessages = next;
              syncRoom(room);
              openRoom(room);
            }
          };
        }

        const joinGrpBtn = container.querySelector("#tg-join-grp");
        if (joinGrpBtn) {
          joinGrpBtn.onclick = async () => {
            const res = await apiCall(`/api/groups/${encodeURIComponent(room.id)}/join`, { method: "POST" });
            if (res?.success && res.group) {
              syncRoom(res.group);
              openRoom(res.group);
            } else {
              room.isMember = true;
              syncRoom(room);
              openRoom(room);
            }
          };
        }

        if (canChat) {
          const sendGrp = async () => {
            const inp = container.querySelector("#tg-grp-input");
            const txt = (inp?.value || "").trim();
            if (!txt) return;
            const res = await apiCall(`/api/groups/${encodeURIComponent(room.id)}/messages`, {
              method: "POST",
              body: JSON.stringify({ sender: myName(), text: txt })
            });
            if (res && res.success === false) {
              alert(res.message || "Permission denied");
              return;
            }
            if (res?.success && res.group) {
              syncRoom(res.group);
              openRoom(res.group);
              return;
            }
            room.messages.push({
              id: "m_" + Date.now(),
              sender: myName(),
              senderId: myId(),
              isAdminSender: isAdmin,
              text: txt,
              own: true,
              time: nowTime()
            });
            room.lastTime = nowTime();
            syncRoom(room);
            openRoom(room);
          };
          container.querySelector("#tg-grp-send").onclick = sendGrp;
          container.querySelector("#tg-grp-input").onkeydown = (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendGrp();
            }
          };
        }
      }
    }

    function openRoomInfo(room) {
      let tab = "members";
      let muted = false;

      const memberItems = room.members.length
        ? room.members
        : [{ id: room.ownerId || myId(), name: myName(), role: "Owner", joinedAt: "Active" }];

      function paintInfo() {
        container.innerHTML = `
          <div class="tg-app">
            <div class="tg-room-head">
              <button type="button" class="tg-icon-btn" id="tg-back-room" style="padding:0 10px;">←</button>
              <span style="font-weight:700; font-size:15px;">${room.type === "channel" ? "Channel Info" : "Group Info"}</span>
              <span style="width:34px;"></span>
            </div>

            <div class="tg-info-hero">
              <div class="tg-info-avatar ${room.type === "group" ? "grp" : ""}">
                ${esc((room.name || "C").charAt(0).toUpperCase())}
              </div>
              <div style="font-size:20px; font-weight:800;">${esc(room.name)}</div>
              <div style="font-size:12px; color:#8fa3b8; margin-top:3px;">
                ${room.type === "channel" ? "Broadcast channel" : "Discussion group"} • ${memberItems.length} ${room.type === "channel" ? "subscribers" : "members"}
              </div>
              <div class="tg-info-actions">
                <button type="button" class="tg-info-act-btn" id="tg-mute-toggle">${muted ? "🔔 Unmute" : "🔕 Mute"}</button>
                <button type="button" class="tg-info-act-btn" id="tg-go-chat">💬 Open Chat</button>
                <button type="button" class="tg-info-act-btn" id="tg-share-link">🔗 Invite</button>
              </div>
            </div>

            <div class="tg-info-list">
              <div class="tg-info-item" id="tg-jump-members">
                <span>${room.type === "channel" ? "Subscribers" : "Members"}</span>
                <span style="color:#6ab2f2; font-weight:700;">${memberItems.length}</span>
              </div>
              <div class="tg-info-item">
                <span>Administrators</span>
                <span style="color:#6ab2f2; font-weight:700;">${Math.max((room.admins || []).length, 1)}</span>
              </div>
            </div>

            <div class="tg-sub-tabs">
              <div class="tg-sub-tab ${tab === "members" ? "active" : ""}" data-t="members">${room.type === "channel" ? "Subscribers" : "Members"}</div>
              <div class="tg-sub-tab ${tab === "media" ? "active" : ""}" data-t="media">Posts</div>
            </div>

            <div>
              ${
                tab === "members"
                  ? memberItems
                      .map((m, i) => {
                        const mObj = typeof m === "object" ? m : { id: m, name: `Member ${i + 1}`, role: i === 0 ? "Owner" : "Member" };
                        const label = mObj.name || mObj.displayName || mObj.username || `Member ${i + 1}`;
                        return `
                    <div class="tg-member-row" data-puid="${esc(mObj.id || "")}" data-puname="${esc(label)}">
                      <div style="display:flex; align-items:center; gap:12px;">
                        <div class="tg-avatar" style="width:42px; height:42px; font-size:16px;">${esc(label.charAt(0).toUpperCase())}</div>
                        <div>
                          <div style="font-weight:700; font-size:14px;">${esc(label)}</div>
                          <div style="font-size:11px; color:#8fa3b8;">${esc(mObj.joinedAt || "Member")}</div>
                        </div>
                      </div>
                      <span style="font-size:11px; color:#6ab2f2; font-weight:700;">${esc(mObj.role || (i === 0 ? "Owner" : "Member"))}</span>
                    </div>
                  `;
                      })
                      .join("")
                  : (room.posts || [])
                      .map(
                        (p) => `
                    <div class="tg-msg-card">
                      <div style="font-size:13px;">${esc(p.text)}</div>
                      <div style="font-size:11px; color:#7f91a4; margin-top:4px;">${esc(p.time || "")}</div>
                    </div>
                  `
                      )
                      .join("") || `<div style="text-align:center; padding:24px; color:#7f91a4;">No items</div>`
              }
            </div>
          </div>
        `;

        container.querySelector("#tg-back-room").onclick = () => openRoom(room);
        container.querySelector("#tg-go-chat").onclick = () => openRoom(room);
        container.querySelector("#tg-mute-toggle").onclick = () => {
          muted = !muted;
          paintInfo();
        };
        container.querySelector("#tg-share-link").onclick = () => {
          alert(`Invite ID for ${room.name}: ${room.id}`);
        };
        container.querySelectorAll("[data-t]").forEach((st) => {
          st.onclick = () => {
            tab = st.dataset.t;
            paintInfo();
          };
        });
        container.querySelectorAll(".tg-member-row").forEach((mr) => {
          mr.onclick = () => openUserProfileView(container, mr.dataset.puid, mr.dataset.puname);
        });
      }

      paintInfo();
    }

    renderHome();
  };
})();
