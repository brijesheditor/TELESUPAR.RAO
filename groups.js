(function () {
  "use strict";

  const STORAGE_KEY = "telesupar_glass_v6";
  const OFFICIAL_ID = "telesupar_official_channel";

  const style = document.createElement("style");
  style.id = "telesupar-glass-style";
  style.textContent = `
    body.ts-room-immersive nav,
    body.ts-room-immersive footer,
    body.ts-room-immersive .bottom-nav,
    body.ts-room-immersive .navbar,
    body.ts-room-immersive .nav-bar,
    body.ts-room-immersive [data-bottom-nav],
    body.ts-room-immersive [data-navbar] {
      display: none !important;
    }

    .ts-glass-app {
      min-height: 100vh;
      background:
        radial-gradient(circle at 15% 10%, rgba(56, 189, 248, 0.16), transparent 42%),
        radial-gradient(circle at 85% 20%, rgba(139, 92, 246, 0.16), transparent 45%),
        #090e16;
      color: #f8fafc;
      padding-bottom: 88px;
      font-family: inherit;
    }

    .ts-glass-top {
      position: sticky;
      top: 0;
      z-index: 25;
      background: rgba(17, 25, 39, 0.78);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .ts-back-btn {
      background: rgba(255, 255, 255, 0.09);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #f8fafc;
      border-radius: 12px;
      height: 34px;
      padding: 0 12px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .ts-btn-primary {
      background: linear-gradient(135deg, #2563eb, #0ea5e9);
      border: none;
      color: #fff;
      border-radius: 999px;
      height: 34px;
      padding: 0 14px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .ts-btn-glass {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #e2e8f0;
      border-radius: 999px;
      height: 34px;
      padding: 0 12px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .ts-glass-card {
      background: rgba(23, 34, 52, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 16px;
    }

    .ts-search-box {
      padding: 8px 14px 10px;
      background: rgba(15, 23, 36, 0.65);
      backdrop-filter: blur(12px);
    }

    .ts-search-input {
      width: 100%;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      padding: 9px 14px;
      color: #fff;
      font-size: 14px;
      outline: none;
    }

    .ts-chip-row {
      display: flex;
      gap: 8px;
      padding: 4px 14px 12px;
      overflow-x: auto;
    }

    .ts-chip {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.09);
      color: #94a3b8;
      border-radius: 999px;
      padding: 6px 13px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }

    .ts-chip.active {
      background: rgba(56, 189, 248, 0.22);
      border-color: rgba(56, 189, 248, 0.5);
      color: #fff;
    }

    .ts-gate-banner {
      margin: 10px 14px;
      padding: 14px;
      border-radius: 18px;
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(139, 92, 246, 0.22));
      backdrop-filter: blur(18px);
      border: 1px solid rgba(125, 211, 252, 0.35);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .ts-chat-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 8px 14px;
      padding: 11px 12px;
      border-radius: 16px;
      background: rgba(23, 34, 52, 0.65);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.07);
      cursor: pointer;
    }

    .ts-chat-item.locked {
      opacity: 0.52;
    }

    .ts-logo-img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      background: linear-gradient(135deg, #2563eb, #06b6d4);
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 18px;
      color: #fff;
      flex-shrink: 0;
      overflow: hidden;
    }

    .ts-pinned-bar {
      margin: 8px 14px 0;
      padding: 9px 12px;
      border-radius: 12px;
      background: rgba(23, 34, 52, 0.78);
      backdrop-filter: blur(14px);
      border-left: 3px solid #38bdf8;
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      border-right: 1px solid rgba(255, 255, 255, 0.07);
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      font-size: 12px;
    }

    .ts-bubble-card {
      margin: 10px 14px;
      padding: 12px 14px;
      border-radius: 16px;
      background: rgba(24, 37, 58, 0.78);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.09);
      cursor: pointer;
    }

    .ts-bubble-card.own {
      background: rgba(37, 99, 235, 0.34);
      border-color: rgba(96, 165, 250, 0.35);
      margin-left: 44px;
    }

    .ts-react-chip {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #f1f5f9;
      border-radius: 999px;
      padding: 3px 9px;
      font-size: 12px;
      cursor: pointer;
    }

    .ts-react-chip.active {
      background: rgba(56, 189, 248, 0.25);
      border-color: #38bdf8;
      color: #fff;
      font-weight: 700;
    }

    .ts-composer-bar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 30;
      background: rgba(15, 23, 36, 0.88);
      backdrop-filter: blur(18px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 8px 12px;
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .ts-composer-input {
      flex: 1;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      padding: 9px 14px;
      color: #fff;
      font-size: 14px;
      outline: none;
    }

    .ts-hero-glass {
      margin: 12px 14px;
      padding: 20px 16px;
      border-radius: 22px;
      background: rgba(23, 34, 52, 0.74);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.11);
      text-align: center;
    }

    .ts-quick-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-top: 14px;
    }

    .ts-quick-box {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 14px;
      padding: 10px 4px;
      color: #e2e8f0;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }

    .ts-group-box {
      margin: 10px 14px;
      border-radius: 18px;
      overflow: hidden;
      background: rgba(23, 34, 52, 0.72);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.09);
    }

    .ts-row-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 13px 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      cursor: pointer;
      font-size: 14px;
    }

    .ts-row-btn:last-child {
      border-bottom: none;
    }

    .ts-media-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      padding: 10px 14px;
    }

    .ts-media-tile {
      aspect-ratio: 1 / 1;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 8px;
      font-size: 11px;
      color: #cbd5e1;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .ts-overlay {
      position: fixed;
      inset: 0;
      z-index: 65;
      background: rgba(4, 8, 15, 0.72);
      backdrop-filter: blur(8px);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .ts-emoji-strip {
      margin: 0 12px 10px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(25, 39, 61, 0.92);
      backdrop-filter: blur(18px);
      border: 1px solid rgba(255, 255, 255, 0.14);
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 6px;
    }

    .ts-emoji-pick {
      background: none;
      border: none;
      font-size: 22px;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
    }

    .ts-action-sheet {
      margin: 0 12px 14px;
      border-radius: 20px;
      background: rgba(20, 31, 49, 0.94);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      overflow: hidden;
    }

    .ts-sheet-row {
      width: 100%;
      background: none;
      border: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      color: #f8fafc;
      padding: 13px 16px;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ts-sheet-row:last-child {
      border-bottom: none;
    }

    .ts-sheet-row.danger {
      color: #f87171;
    }

    .ts-profile-modal {
      background: rgba(17, 26, 42, 0.96);
      backdrop-filter: blur(22px);
      border-top: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 24px 24px 0 0;
      max-height: 85vh;
      overflow-y: auto;
      padding: 16px;
    }
  `;

  if (!document.getElementById(style.id)) {
    document.head.appendChild(style);
  }

  const EMOJI_CHOICES = ["❤️", "👍", "👎", "🔥", "🥰", "👏", "😁"];

  function setNavHidden(hidden) {
    if (hidden) {
      document.body.classList.add("ts-room-immersive");
    } else {
      document.body.classList.remove("ts-room-immersive");
    }
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

  function nowStr() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function compact(n) {
    const x = Number(n) || 0;
    if (x >= 1000000) return (x / 1000000).toFixed(1) + "M";
    if (x >= 1000) return (x / 1000).toFixed(1) + "K";
    return String(x);
  }

  function meId() {
    return String(window.AppState?.user?.id || window.AppState?.user?._id || "me");
  }

  function meName() {
    return window.AppState?.user?.displayName || window.AppState?.user?.username || "User";
  }

  function telesuparInviteUrl(room) {
    const origin = window.location?.origin && window.location.origin !== "null"
      ? window.location.origin
      : "https://telesupar.app";
    return `${origin}/?room=${encodeURIComponent(room.id)}`;
  }

  function createOfficialChannel() {
    return {
      id: OFFICIAL_ID,
      type: "channel",
      isOfficial: true,
      isPrivate: false,
      name: "TELESUPAR",
      logo: "",
      description: "Official TELESUPAR broadcast channel. Join to unlock all channels & groups.",
      ownerId: "telesupar_system",
      admins: ["telesupar_system"],
      members: [
        { id: "telesupar_system", name: "TELESUPAR Official", role: "Official", status: "online" }
      ],
      isOwner: false,
      isAdmin: false,
      isMember: false,
      allowMemberMessages: false,
      lastTime: "Now",
      posts: [
        {
          id: "off_p_1",
          text: "Welcome to TELESUPAR! Tap Join below to enter all Channels & Groups.",
          authorName: "TELESUPAR Official",
          authorId: "telesupar_system",
          views: 120,
          reactions: { "❤️": 18, "🔥": 12 },
          myReaction: "",
          time: nowStr()
        }
      ],
      messages: []
    };
  }

  function loadData() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      const list = Array.isArray(raw?.rooms) ? raw.rooms : [];
      const officialJoined = Boolean(raw?.officialJoined);
      const hasOfficial = list.some((r) => String(r.id) === OFFICIAL_ID);
      const merged = hasOfficial ? list : [createOfficialChannel(), ...list];
      return { rooms: merged, officialJoined };
    } catch (_) {
      return { rooms: [createOfficialChannel()], officialJoined: false };
    }
  }

  function saveData(rooms, officialJoined) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ rooms, officialJoined: Boolean(officialJoined) }));
    } catch (_) {}
  }

  async function apiReq(url, opts) {
    if (typeof window.api === "function") {
      try {
        return await window.api(url, opts);
      } catch (_) {
        return null;
      }
    }
    return null;
  }

  function renderAvatar(name, logoUrl, sizePx, extraClass) {
    const sz = sizePx || 48;
    const ch = esc((name || "T").charAt(0).toUpperCase());
    if (logoUrl) {
      return `<div class="ts-logo-img ${extraClass || ""}" style="width:${sz}px; height:${sz}px; font-size:${Math.round(sz * 0.38)}px;"><img src="${esc(logoUrl)}" alt="${esc(name)}" style="width:100%; height:100%; object-fit:cover;" /></div>`;
    }
    return `<div class="ts-logo-img ${extraClass || ""}" style="width:${sz}px; height:${sz}px; font-size:${Math.round(sz * 0.38)}px;">${ch}</div>`;
  }

  function pickImageFile(onPicked) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") onPicked(reader.result);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  async function fetchMemberPosts(uid, uname) {
    const collected = [];
    if (uid && /^[a-f\d]{24}$/i.test(String(uid))) {
      const uRes = await apiReq(`/api/users/${encodeURIComponent(uid)}/posts`);
      if (Array.isArray(uRes?.posts)) collected.push(...uRes.posts);
    }
    if (!collected.length) {
      const feedRes = await apiReq("/api/posts/feed");
      const items = Array.isArray(feedRes?.posts) ? feedRes.posts : (Array.isArray(feedRes) ? feedRes : []);
      for (const p of items) {
        const pid = String(p.userId || p.authorId || "");
        const pname = String(p.authorName || p.username || "");
        if ((uid && pid === String(uid)) || (uname && pname.toLowerCase() === String(uname).toLowerCase())) {
          collected.push(p);
        }
      }
    }
    if (!collected.length && Array.isArray(window.AppState?.posts)) {
      for (const p of window.AppState.posts) {
        if (uid && String(p.userId || p.authorId || "") === String(uid)) collected.push(p);
      }
    }
    return collected;
  }

  async function openUserProfileWithPosts(container, uid, fallbackName) {
    let profile = null;
    if (uid && /^[a-f\d]{24}$/i.test(String(uid))) {
      const pRes = await apiReq(`/api/users/${encodeURIComponent(uid)}/profile`);
      if (pRes?.success && pRes.profile) profile = pRes.profile;
    }

    const displayName = profile?.displayName || profile?.username || fallbackName || "User";
    const handle = profile?.username ? `@${profile.username}` : "";
    const bio = profile?.bio || "TELESUPAR member";
    const avatar = profile?.avatar || profile?.photoUrl || "";
    const posts = await fetchMemberPosts(uid, displayName);

    const old = document.getElementById("ts-user-profile-sheet");
    if (old) old.remove();

    const wrap = document.createElement("div");
    wrap.id = "ts-user-profile-sheet";
    wrap.className = "ts-overlay";
    wrap.innerHTML = `
      <div class="ts-profile-modal">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <span style="font-weight:700; font-size:15px;">Profile & Posts</span>
          <button type="button" id="ts-prof-back" class="ts-back-btn">← Back</button>
        </div>

        <div style="display:flex; align-items:center; gap:14px; margin-bottom:16px;">
          ${renderAvatar(displayName, avatar, 64)}
          <div>
            <div style="font-size:18px; font-weight:800;">${esc(displayName)}</div>
            ${handle ? `<div style="font-size:13px; color:#38bdf8;">${esc(handle)}</div>` : ""}
            <div style="font-size:12px; color:#94a3b8; margin-top:4px;">${esc(bio)}</div>
          </div>
        </div>

        <div style="font-size:13px; font-weight:700; color:#bae6fd; margin-bottom:8px;">
          Posts (${posts.length})
        </div>

        ${
          posts.length
            ? posts
                .map(
                  (post) => `
              <div class="ts-glass-card" style="padding:12px; margin-bottom:10px;">
                ${post.imageUrl || post.image ? `<img src="${esc(post.imageUrl || post.image)}" alt="post" style="width:100%; max-height:220px; object-fit:cover; border-radius:12px; margin-bottom:8px;" />` : ""}
                <div style="font-size:13px; line-height:1.45; white-space:pre-wrap;">${esc(post.text || post.caption || post.title || "Post")}</div>
              </div>
            `
                )
                .join("")
            : `<div class="ts-glass-card" style="padding:18px; text-align:center; color:#94a3b8; font-size:13px;">No posts found for this user.</div>`
        }
      </div>
    `;

    wrap.onclick = (e) => {
      if (e.target === wrap) wrap.remove();
    };
    wrap.querySelector("#ts-prof-back").onclick = () => wrap.remove();
    (container || document.body).appendChild(wrap);
  }

  window.renderGroups = async function (container) {
    if (!container) return;

    let { rooms, officialJoined } = loadData();
    let activeFilter = "all";
    let searchQuery = "";

    const apiList = await apiReq("/api/groups");
    if (apiList?.success && Array.isArray(apiList.groups)) {
      const merged = apiList.groups.some((r) => String(r.id) === OFFICIAL_ID)
        ? apiList.groups
        : [createOfficialChannel(), ...apiList.groups];
      rooms = merged.map((r) =>
        String(r.id) === OFFICIAL_ID ? { ...r, isMember: officialJoined || r.isMember } : r
      );
      saveData(rooms, officialJoined);
    }

    function persist() {
      saveData(rooms, officialJoined);
    }

    function upsertRoom(updated) {
      if (!updated?.id) return;
      const idx = rooms.findIndex((r) => String(r.id) === String(updated.id));
      if (idx >= 0) rooms[idx] = { ...rooms[idx], ...updated };
      else rooms.unshift(updated);
      persist();
    }

    function removeRoom(id) {
      rooms = rooms.filter((r) => String(r.id) !== String(id));
      persist();
    }

    function isRoomUnlocked(room) {
      if (String(room.id) === OFFICIAL_ID || room.isOfficial) return true;
      return Boolean(officialJoined);
    }

    function lastPreview(room) {
      if (room.type === "channel") {
        const last = room.posts?.[room.posts.length - 1];
        return last?.text || "Broadcast channel";
      }
      const last = room.messages?.[room.messages.length - 1];
      return last ? `${last.sender}: ${last.text}` : "No messages yet";
    }

    function renderHome() {
      setNavHidden(false);
      const q = searchQuery.trim().toLowerCase();
      const chCount = rooms.filter((r) => r.type === "channel").length;
      const grpCount = rooms.filter((r) => r.type === "group").length;

      const filtered = rooms.filter((r) => {
        const okType = activeFilter === "all" || r.type === activeFilter;
        const okQ = !q || r.name.toLowerCase().includes(q) || lastPreview(r).toLowerCase().includes(q);
        return okType && okQ;
      });

      container.innerHTML = `
        <div class="ts-glass-app">
          <div class="ts-glass-top">
            <div style="font-size:18px; font-weight:800;">TELESUPAR</div>
            <button type="button" class="ts-btn-primary" id="ts-new-room-btn">＋ New</button>
          </div>

          <div class="ts-search-box">
            <input type="text" class="ts-search-input" id="ts-home-search" placeholder="Search Channels & Groups" value="${esc(searchQuery)}" />
          </div>

          <div class="ts-chip-row">
            <button type="button" class="ts-chip ${activeFilter === "all" ? "active" : ""}" data-f="all">All (${rooms.length})</button>
            <button type="button" class="ts-chip ${activeFilter === "channel" ? "active" : ""}" data-f="channel">Channels (${chCount})</button>
            <button type="button" class="ts-chip ${activeFilter === "group" ? "active" : ""}" data-f="group">Groups (${grpCount})</button>
          </div>

          ${
            !officialJoined
              ? `<div class="ts-gate-banner">
                  <div>
                    <div style="font-weight:800; font-size:14px;">Official TELESUPAR Channel</div>
                    <div style="font-size:12px; color:#cbd5e1; margin-top:2px;">Join TELESUPAR official channel first to unlock other channels & groups.</div>
                  </div>
                  <button type="button" class="ts-btn-primary" id="ts-join-official-btn">Join Official</button>
                </div>`
              : ""
          }

          <div>
            ${filtered
              .map((r) => {
                const unlocked = isRoomUnlocked(r);
                return `
                  <div class="ts-chat-item ${unlocked ? "" : "locked"}" data-open-room="${esc(r.id)}">
                    ${renderAvatar(r.name, r.logo, 48, r.type === "channel" ? "ch" : "")}
                    <div style="flex:1; min-width:0;">
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                        <span style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                          ${esc(r.name)} ${r.isOfficial ? "✓" : ""}
                        </span>
                        <span style="font-size:11px; color:#94a3b8;">${esc(r.lastTime || "")}</span>
                      </div>
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:3px;">
                        <span style="font-size:13px; color:#94a3b8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                          ${unlocked ? esc(lastPreview(r)) : "Join official TELESUPAR channel to unlock"}
                        </span>
                        <span class="ts-chip" style="padding:2px 8px; font-size:10px;">
                          ${unlocked ? (r.type === "channel" ? "Channel" : "Group") : "Locked"}
                        </span>
                      </div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      `;

      const joinOffBtn = container.querySelector("#ts-join-official-btn");
      if (joinOffBtn) {
        joinOffBtn.onclick = () => {
          officialJoined = true;
          const off = rooms.find((x) => String(x.id) === OFFICIAL_ID);
          if (off) off.isMember = true;
          persist();
          renderHome();
        };
      }

      container.querySelectorAll("[data-f]").forEach((b) => {
        b.onclick = () => {
          activeFilter = b.dataset.f;
          renderHome();
        };
      });

      const sInp = container.querySelector("#ts-home-search");
      if (sInp) {
        sInp.oninput = (e) => {
          searchQuery = e.target.value;
          renderHome();
          const el = container.querySelector("#ts-home-search");
          if (el) {
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
          }
        };
      }

      container.querySelector("#ts-new-room-btn").onclick = async () => {
        if (!officialJoined) {
          alert("Please join the official TELESUPAR channel first.");
          return;
        }
        const name = (prompt("Enter Channel or Group Name:") || "").trim();
        if (!name) return;
        const isCh = confirm("OK = Channel (Only Admin/Owner broadcasts)\nCancel = Group (Members chat when allowed)");
        const type = isCh ? "channel" : "group";
        const allowMemberMessages = !isCh
          ? confirm("Allow all group members to message?\nOK = Everyone can chat, Cancel = Admins only")
          : false;

        let logoData = "";
        if (confirm("Set a logo/DP image for this " + type + "?")) {
          await new Promise((resolve) => {
            pickImageFile((dataUrl) => {
              logoData = dataUrl;
              resolve();
            });
          });
        }

        const uid = meId();
        const uname = meName();
        const apiRes = await apiReq("/api/groups", {
          method: "POST",
          body: JSON.stringify({ name, type, allowMemberMessages, logo: logoData })
        });

        if (apiRes?.success && apiRes.group) {
          upsertRoom({ ...apiRes.group, logo: apiRes.group.logo || logoData });
          renderHome();
          return;
        }

        const newRoom = {
          id: "room_" + Date.now(),
          type,
          isPrivate: false,
          name,
          logo: logoData,
          description: isCh
            ? `Official ${name} broadcast channel on TELESUPAR.`
            : `${name} group on TELESUPAR.`,
          ownerId: uid,
          admins: [uid],
          members: [{ id: uid, name: uname, role: "Owner", status: "online" }],
          isOwner: true,
          isAdmin: true,
          isMember: true,
          allowMemberMessages,
          lastTime: nowStr(),
          posts: isCh
            ? [
                {
                  id: "p_" + Date.now(),
                  text: `${name} channel is live on TELESUPAR.`,
                  authorName: uname,
                  authorId: uid,
                  views: 1,
                  reactions: { "👍": 1 },
                  myReaction: "",
                  time: nowStr()
                }
              ]
            : [],
          messages: !isCh
            ? [
                {
                  id: "m_" + Date.now(),
                  sender: uname,
                  senderId: uid,
                  isAdminSender: true,
                  text: `Welcome to ${name}!`,
                  own: true,
                  time: nowStr()
                }
              ]
            : []
        };
        upsertRoom(newRoom);
        renderHome();
      };

      container.querySelectorAll("[data-open-room]").forEach((card) => {
        card.onclick = () => {
          const room = rooms.find((x) => String(x.id) === String(card.dataset.openRoom));
          if (!room) return;
          if (!isRoomUnlocked(room)) {
            alert("Join the official TELESUPAR channel first to unlock other channels & groups.");
            return;
          }
          openRoomChat(room);
        };
      });
    }

    function openMessagePopup(room, item, isChannelPost) {
      item.reactions = typeof item.reactions === "object" && item.reactions ? item.reactions : {};

      const old = document.getElementById("ts-msg-popup");
      if (old) old.remove();

      const pop = document.createElement("div");
      pop.id = "ts-msg-popup";
      pop.className = "ts-overlay";
      pop.innerHTML = `
        <div class="ts-emoji-strip">
          ${EMOJI_CHOICES
            .map(
              (em) => `
            <button type="button" class="ts-emoji-pick" data-emoji="${esc(em)}">${esc(em)}</button>
          `
            )
            .join("")}
        </div>

        <div class="ts-action-sheet">
          <button type="button" class="ts-sheet-row" data-act="reply">↩ Reply</button>
          <button type="button" class="ts-sheet-row" data-act="copy">📋 Copy</button>
          <button type="button" class="ts-sheet-row" data-act="link">🔗 Copy Link</button>
          <button type="button" class="ts-sheet-row" data-act="save">⬇ Save to Downloads</button>
          <button type="button" class="ts-sheet-row" data-act="share">📤 Share</button>
          <button type="button" class="ts-sheet-row" data-act="pin">📌 Pin</button>
          <button type="button" class="ts-sheet-row danger" data-act="delete">🗑 Delete</button>
        </div>
      `;

      pop.onclick = (e) => {
        if (e.target === pop) pop.remove();
      };

      pop.querySelectorAll("[data-emoji]").forEach((eb) => {
        eb.onclick = async () => {
          const emoji = eb.dataset.emoji;
          if (item.myReaction === emoji) {
            item.reactions[emoji] = Math.max(0, (Number(item.reactions[emoji]) || 1) - 1);
            item.myReaction = "";
          } else {
            if (item.myReaction) {
              item.reactions[item.myReaction] = Math.max(0, (Number(item.reactions[item.myReaction]) || 1) - 1);
            }
            item.reactions[emoji] = (Number(item.reactions[emoji]) || 0) + 1;
            item.myReaction = emoji;
          }
          upsertRoom(room);
          if (isChannelPost) {
            await apiReq(`/api/groups/${encodeURIComponent(room.id)}/posts/${encodeURIComponent(item.id)}/react`, {
              method: "POST",
              body: JSON.stringify({ reaction: emoji })
            });
          }
          pop.remove();
          openRoomChat(room);
        };
      });

      pop.querySelectorAll("[data-act]").forEach((ab) => {
        ab.onclick = () => {
          const act = ab.dataset.act;
          const textVal = item.text || "";
          if (act === "reply") {
            const inp = container.querySelector("#ts-room-input");
            if (inp) {
              inp.value = `Replying to "${textVal.slice(0, 30)}": `;
              inp.focus();
            }
          } else if (act === "copy") {
            if (navigator.clipboard?.writeText) navigator.clipboard.writeText(textVal).catch(() => {});
            alert("Copied to clipboard");
          } else if (act === "link") {
            const url = telesuparInviteUrl(room);
            if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).catch(() => {});
            alert("Copied TELESUPAR link: " + url);
          } else if (act === "save") {
            const blob = new Blob([textVal], { type: "text/plain;charset=utf-8" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `${room.name || "telesupar"}_message.txt`;
            a.click();
          } else if (act === "share") {
            if (navigator.share) {
              navigator.share({ title: room.name, text: textVal }).catch(() => {});
            } else {
              alert(textVal);
            }
          } else if (act === "pin") {
            room.pinnedText = textVal;
            upsertRoom(room);
            alert("Pinned message");
          } else if (act === "delete") {
            if (isChannelPost) {
              room.posts = (room.posts || []).filter((x) => String(x.id) !== String(item.id));
            } else {
              room.messages = (room.messages || []).filter((x) => String(x.id) !== String(item.id));
            }
            upsertRoom(room);
          }
          pop.remove();
          openRoomChat(room);
        };
      });

      (container || document.body).appendChild(pop);
    }

    function openRoomChat(room) {
      setNavHidden(true);
      room.posts = Array.isArray(room.posts) ? room.posts : [];
      room.messages = Array.isArray(room.messages) ? room.messages : [];
      room.members = Array.isArray(room.members) ? room.members : [];

      const isOfficial = String(room.id) === OFFICIAL_ID || Boolean(room.isOfficial);
      const isAdmin = !isOfficial && Boolean(room.isAdmin || room.isOwner || room.ownerId === meId());
      const isMember = isOfficial ? officialJoined : Boolean(room.isMember || isAdmin);
      const allowMemberMessages = room.allowMemberMessages !== false;
      const memberCount = Math.max(room.members.length, 1);

      const pinnedText =
        room.pinnedText ||
        (room.type === "channel" ? room.posts[0]?.text : room.messages[0]?.text) ||
        "";

      if (room.type === "channel") {
        container.innerHTML = `
          <div class="ts-glass-app">
            <div class="ts-glass-top">
              <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <button type="button" class="ts-back-btn" id="ts-chat-back">← Back</button>
                <div id="ts-open-ch-info" style="display:flex; align-items:center; gap:10px; min-width:0; cursor:pointer;">
                  ${renderAvatar(room.name, room.logo, 38, "ch")}
                  <div style="min-width:0;">
                    <div style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(room.name)} ${isOfficial ? "✓" : ""}</div>
                    <div style="font-size:11px; color:#94a3b8;">${memberCount} subscribers</div>
                  </div>
                </div>
              </div>
              ${
                !isMember
                  ? `<button type="button" class="ts-btn-primary" id="ts-join-room-btn">Join</button>`
                  : `<button type="button" class="ts-btn-glass" id="ts-ch-info-btn">Info</button>`
              }
            </div>

            ${
              pinnedText
                ? `<div class="ts-pinned-bar">
                    <div style="color:#38bdf8; font-weight:700;">Pinned Message</div>
                    <div style="color:#e2e8f0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(pinnedText)}</div>
                  </div>`
                : ""
            }

            <div style="padding-bottom:76px;">
              ${
                room.posts.length
                  ? room.posts
                      .map((p) => {
                        const rx = typeof p.reactions === "object" && p.reactions ? p.reactions : {};
                        const entries = Object.entries(rx).filter(([, cnt]) => Number(cnt) > 0);
                        return `
                    <div class="ts-bubble-card" data-post-id="${esc(p.id)}">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                        <span class="ts-author-click" data-uid="${esc(p.authorId || "")}" data-uname="${esc(p.authorName || room.name)}" style="font-size:12px; font-weight:700; color:#38bdf8; cursor:pointer;">
                          ${esc(p.authorName || room.name)}
                        </span>
                        <span style="font-size:10px; color:#5eead4; font-weight:700;">Admin</span>
                      </div>
                      <div style="font-size:14px; line-height:1.45; white-space:pre-wrap;">${esc(p.text)}</div>
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:8px; flex-wrap:wrap;">
                        <div style="display:flex; gap:6px; flex-wrap:wrap;">
                          ${
                            entries.length
                              ? entries
                                  .map(
                                    ([em, cnt]) => `
                              <span class="ts-react-chip ${p.myReaction === em ? "active" : ""}">${esc(em)} ${Number(cnt)}</span>
                            `
                                  )
                                  .join("")
                              : `<span style="font-size:11px; color:#64748b;">Tap post to react</span>`
                          }
                        </div>
                        <span style="font-size:11px; color:#94a3b8;">👁 ${compact((Number(p.views) || 0) + 1)} • ${esc(p.time || "")}</span>
                      </div>
                    </div>
                  `;
                      })
                      .join("")
                  : `<div style="text-align:center; padding:44px 16px; color:#94a3b8;">No broadcasts yet.</div>`
              }
            </div>

            ${
              isAdmin
                ? `<div class="ts-composer-bar">
                    <input type="text" class="ts-composer-input" id="ts-room-input" placeholder="Broadcast message..." autocomplete="off" />
                    <button type="button" class="ts-btn-primary" id="ts-room-send">Post</button>
                  </div>`
                : `<div class="ts-composer-bar" style="justify-content:center; color:#94a3b8; font-size:12px;">
                    ${!isMember ? "Join this channel first" : "Only channel owner & admins can broadcast"}
                  </div>`
            }
          </div>
        `;

        container.querySelector("#ts-chat-back").onclick = renderHome;
        container.querySelector("#ts-open-ch-info").onclick = () => openGlassInfo(room);
        const iBtn = container.querySelector("#ts-ch-info-btn");
        if (iBtn) iBtn.onclick = () => openGlassInfo(room);

        const jBtn = container.querySelector("#ts-join-room-btn");
        if (jBtn) {
          jBtn.onclick = async () => {
            if (isOfficial) officialJoined = true;
            room.isMember = true;
            upsertRoom(room);
            await apiReq(`/api/groups/${encodeURIComponent(room.id)}/join`, { method: "POST" });
            openRoomChat(room);
          };
        }

        container.querySelectorAll(".ts-author-click").forEach((el) => {
          el.onclick = (e) => {
            e.stopPropagation();
            openUserProfileWithPosts(container, el.dataset.uid, el.dataset.uname);
          };
        });

        container.querySelectorAll("[data-post-id]").forEach((card) => {
          card.onclick = () => {
            const postObj = room.posts.find((x) => String(x.id) === String(card.dataset.postId));
            if (postObj) openMessagePopup(room, postObj, true);
          };
        });

        if (isAdmin) {
          const publish = async () => {
            const inp = container.querySelector("#ts-room-input");
            const txt = (inp?.value || "").trim();
            if (!txt) return;
            const res = await apiReq(`/api/groups/${encodeURIComponent(room.id)}/posts`, {
              method: "POST",
              body: JSON.stringify({ text: txt })
            });
            if (res && res.success === false) {
              alert(res.message || "Only admins can broadcast");
              return;
            }
            if (res?.success && res.group) {
              upsertRoom(res.group);
              openRoomChat(res.group);
              return;
            }
            room.posts.push({
              id: "p_" + Date.now(),
              text: txt,
              authorName: meName(),
              authorId: meId(),
              views: 1,
              reactions: {},
              myReaction: "",
              time: nowStr()
            });
            room.lastTime = nowStr();
            upsertRoom(room);
            openRoomChat(room);
          };
          container.querySelector("#ts-room-send").onclick = publish;
          container.querySelector("#ts-room-input").onkeydown = (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              publish();
            }
          };
        }
      } else {
        const canChat = isAdmin || (isMember && allowMemberMessages);
        container.innerHTML = `
          <div class="ts-glass-app">
            <div class="ts-glass-top">
              <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <button type="button" class="ts-back-btn" id="ts-chat-back">← Back</button>
                <div id="ts-open-grp-info" style="display:flex; align-items:center; gap:10px; min-width:0; cursor:pointer;">
                  ${renderAvatar(room.name, room.logo, 38)}
                  <div style="min-width:0;">
                    <div style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(room.name)}</div>
                    <div style="font-size:11px; color:#94a3b8;">${memberCount} members</div>
                  </div>
                </div>
              </div>
              ${
                isAdmin
                  ? `<button type="button" class="ts-btn-glass" id="ts-perm-btn">${allowMemberMessages ? "🔓 Open" : "🔒 Admin"}</button>`
                  : (!isMember ? `<button type="button" class="ts-btn-primary" id="ts-join-grp">Join</button>` : "")
              }
            </div>

            ${
              pinnedText
                ? `<div class="ts-pinned-bar">
                    <div style="color:#38bdf8; font-weight:700;">Pinned Message</div>
                    <div style="color:#e2e8f0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(pinnedText)}</div>
                  </div>`
                : ""
            }

            <div style="padding-bottom:76px;">
              ${
                room.messages.length
                  ? room.messages
                      .map((m) => {
                        const senderLabel = m.sender || "Member";
                        const rx = typeof m.reactions === "object" && m.reactions ? m.reactions : {};
                        const entries = Object.entries(rx).filter(([, cnt]) => Number(cnt) > 0);
                        return `
                    <div class="ts-bubble-card ${m.own ? "own" : ""}" data-msg-id="${esc(m.id)}">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <span class="ts-author-click" data-uid="${esc(m.senderId || "")}" data-uname="${esc(senderLabel)}" style="font-size:12px; font-weight:700; color:#38bdf8; cursor:pointer;">
                          ${esc(senderLabel)}
                        </span>
                        ${m.isAdminSender ? `<span style="font-size:10px; color:#5eead4; font-weight:700;">Admin</span>` : ""}
                      </div>
                      <div style="font-size:14px; line-height:1.45; white-space:pre-wrap;">${esc(m.text)}</div>
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:7px;">
                        <div style="display:flex; gap:5px; flex-wrap:wrap;">
                          ${entries.map(([em, cnt]) => `<span class="ts-react-chip ${m.myReaction === em ? "active" : ""}">${esc(em)} ${Number(cnt)}</span>`).join("")}
                        </div>
                        <span style="font-size:10px; color:#cbd5e1;">${esc(m.time || "")}</span>
                      </div>
                    </div>
                  `;
                      })
                      .join("")
                  : `<div style="text-align:center; padding:44px 16px; color:#94a3b8;">No group messages yet.</div>`
              }
            </div>

            ${
              canChat
                ? `<div class="ts-composer-bar">
                    <input type="text" class="ts-composer-input" id="ts-room-input" placeholder="Message" autocomplete="off" />
                    <button type="button" class="ts-btn-primary" id="ts-room-send">Send</button>
                  </div>`
                : `<div class="ts-composer-bar" style="justify-content:center; color:#94a3b8; font-size:12px;">
                    ${!isMember ? "Join group to send messages" : "Admins have restricted messaging"}
                  </div>`
            }
          </div>
        `;

        container.querySelector("#ts-chat-back").onclick = renderHome;
        container.querySelector("#ts-open-grp-info").onclick = () => openGlassInfo(room);

        container.querySelectorAll(".ts-author-click").forEach((el) => {
          el.onclick = (e) => {
            e.stopPropagation();
            openUserProfileWithPosts(container, el.dataset.uid, el.dataset.uname);
          };
        });

        container.querySelectorAll("[data-msg-id]").forEach((card) => {
          card.onclick = () => {
            const msgObj = room.messages.find((x) => String(x.id) === String(card.dataset.msgId));
            if (msgObj) openMessagePopup(room, msgObj, false);
          };
        });

        const permBtn = container.querySelector("#ts-perm-btn");
        if (permBtn) {
          permBtn.onclick = async () => {
            const next = !allowMemberMessages;
            const res = await apiReq(`/api/groups/${encodeURIComponent(room.id)}/settings`, {
              method: "PATCH",
              body: JSON.stringify({ allowMemberMessages: next })
            });
            if (res?.success && res.group) upsertRoom(res.group);
            else {
              room.allowMemberMessages = next;
              upsertRoom(room);
            }
            openRoomChat(room);
          };
        }

        const joinBtn = container.querySelector("#ts-join-grp");
        if (joinBtn) {
          joinBtn.onclick = async () => {
            room.isMember = true;
            upsertRoom(room);
            await apiReq(`/api/groups/${encodeURIComponent(room.id)}/join`, { method: "POST" });
            openRoomChat(room);
          };
        }

        if (canChat) {
          const send = async () => {
            const inp = container.querySelector("#ts-room-input");
            const txt = (inp?.value || "").trim();
            if (!txt) return;
            const uname = meName();
            const res = await apiReq(`/api/groups/${encodeURIComponent(room.id)}/messages`, {
              method: "POST",
              body: JSON.stringify({ sender: uname, text: txt })
            });
            if (res && res.success === false) {
              alert(res.message || "Permission denied");
              return;
            }
            if (res?.success && res.group) {
              upsertRoom(res.group);
              openRoomChat(res.group);
              return;
            }
            room.messages.push({
              id: "m_" + Date.now(),
              sender: uname,
              senderId: meId(),
              isAdminSender: isAdmin,
              text: txt,
              own: true,
              reactions: {},
              myReaction: "",
              time: nowStr()
            });
            room.lastTime = nowStr();
            upsertRoom(room);
            openRoomChat(room);
          };
          container.querySelector("#ts-room-send").onclick = send;
          container.querySelector("#ts-room-input").onkeydown = (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              send();
            }
          };
        }
      }
    }

    function openGlassInfo(room) {
      setNavHidden(true);
      let activeTab = "media";
      let muted = false;

      const isOfficial = String(room.id) === OFFICIAL_ID || Boolean(room.isOfficial);
      const isAdmin = !isOfficial && Boolean(room.isAdmin || room.isOwner || room.ownerId === meId());
      const members = room.members.length
        ? room.members
        : [{ id: room.ownerId || meId(), name: meName(), role: "Owner", status: "online" }];
      const adminsCount = Math.max((room.admins || []).length, 1);

      function drawInfo() {
        const mediaSource = room.type === "channel" ? room.posts : room.messages;

        container.innerHTML = `
          <div class="ts-glass-app">
            <div class="ts-glass-top">
              <button type="button" class="ts-back-btn" id="ts-info-back">← Back</button>
              <span style="font-weight:700; font-size:15px;">${room.type === "channel" ? "Channel Info" : "Group Info"}</span>
              <div style="display:flex; gap:6px;">
                ${isAdmin ? `<button type="button" class="ts-btn-glass" id="ts-edit-pencil-btn">✎ Edit</button>` : ""}
              </div>
            </div>

            <div class="ts-hero-glass">
              <div style="display:flex; justify-content:center; margin-bottom:10px;">
                ${renderAvatar(room.name, room.logo, 82, room.type === "channel" ? "ch" : "")}
              </div>
              <div style="font-size:20px; font-weight:800;">${esc(room.name)}</div>
              <div style="font-size:12px; color:#94a3b8; margin-top:3px;">
                ${room.isPrivate ? "private" : "public"} ${room.type}
              </div>

              <div class="ts-quick-4">
                <button type="button" class="ts-quick-box" id="ts-info-chat">💬 Chat</button>
                <button type="button" class="ts-quick-box" id="ts-info-mute">${muted ? "🔔 Unmute" : "🔕 Mute"}</button>
                <button type="button" class="ts-quick-box" id="ts-info-link">🔗 Invite</button>
                <button type="button" class="ts-quick-box" id="ts-info-logo">🖼 Logo</button>
              </div>
            </div>

            <div class="ts-group-box">
              <div class="ts-row-btn" id="ts-open-subscribers">
                <span>👥 ${room.type === "channel" ? "Subscribers" : "Members"}</span>
                <span style="color:#38bdf8; font-weight:700;">${members.length} ›</span>
              </div>
              <div class="ts-row-btn" id="ts-open-admins">
                <span>🛡 Administrators</span>
                <span style="color:#38bdf8; font-weight:700;">${adminsCount} ›</span>
              </div>
              <div class="ts-row-btn" id="ts-open-settings-row">
                <span>⚙ ${room.type === "channel" ? "Channel Settings" : "Group Settings"}</span>
                <span style="color:#94a3b8; font-size:12px;">›</span>
              </div>
            </div>

            <div class="ts-chip-row" style="padding-top:6px;">
              <button type="button" class="ts-chip ${activeTab === "media" ? "active" : ""}" data-it="media">Media</button>
              <button type="button" class="ts-chip ${activeTab === "files" ? "active" : ""}" data-it="files">Files</button>
              <button type="button" class="ts-chip ${activeTab === "links" ? "active" : ""}" data-it="links">Links</button>
              <button type="button" class="ts-chip ${activeTab === "polls" ? "active" : ""}" data-it="polls">Polls</button>
            </div>

            ${
              activeTab === "media"
                ? `<div class="ts-media-grid">
                    ${
                      mediaSource.length
                        ? mediaSource
                            .map(
                              (item) => `
                        <div class="ts-media-tile">${esc((item.text || "").slice(0, 60))}</div>
                      `
                            )
                            .join("")
                        : `<div style="grid-column:1/-1; text-align:center; padding:28px; color:#94a3b8; font-size:13px;">No media yet</div>`
                    }
                  </div>`
                : `<div style="text-align:center; padding:32px 16px; color:#94a3b8; font-size:13px;">No ${esc(activeTab)} yet.</div>`
            }
          </div>
        `;

        container.querySelector("#ts-info-back").onclick = () => openRoomChat(room);
        container.querySelector("#ts-info-chat").onclick = () => openRoomChat(room);

        const editP = container.querySelector("#ts-edit-pencil-btn");
        if (editP) editP.onclick = () => openEditScreen(room);

        const setRow = container.querySelector("#ts-open-settings-row");
        if (setRow) {
          setRow.onclick = () => {
            if (isAdmin) openEditScreen(room);
            else alert("Only channel/group admins can change settings.");
          };
        }

        container.querySelector("#ts-info-mute").onclick = () => {
          muted = !muted;
          drawInfo();
        };

        container.querySelector("#ts-info-link").onclick = () => {
          const link = telesuparInviteUrl(room);
          if (navigator.clipboard?.writeText) navigator.clipboard.writeText(link).catch(() => {});
          alert("TELESUPAR Invite Link: " + link);
        };

        container.querySelector("#ts-info-logo").onclick = () => {
          if (!isAdmin) {
            alert("Only admin/owner can update logo.");
            return;
          }
          pickImageFile((dataUrl) => {
            room.logo = dataUrl;
            upsertRoom(room);
            drawInfo();
          });
        };

        container.querySelector("#ts-open-subscribers").onclick = () => openSubscribersScreen(room, members);
        container.querySelector("#ts-open-admins").onclick = () => openSubscribersScreen(room, members);

        container.querySelectorAll("[data-it]").forEach((btn) => {
          btn.onclick = () => {
            activeTab = btn.dataset.it;
            drawInfo();
          };
        });
      }

      drawInfo();
    }

    function openEditScreen(room) {
      setNavHidden(true);
      let nameVal = room.name || "";
      let descVal = room.description || "";
      let logoVal = room.logo || "";
      let isPriv = Boolean(room.isPrivate);
      let allowChat = room.allowMemberMessages !== false;

      container.innerHTML = `
        <div class="ts-glass-app">
          <div class="ts-glass-top">
            <button type="button" class="ts-back-btn" id="ts-edit-back">← Back</button>
            <span style="font-weight:700; font-size:15px;">Edit</span>
            <button type="button" class="ts-btn-primary" id="ts-edit-save">Save</button>
          </div>

          <div class="ts-group-box">
            <div style="padding:14px 15px; display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.06);">
              <div id="ts-edit-logo-preview">${renderAvatar(nameVal, logoVal, 56)}</div>
              <input type="text" class="ts-search-input" id="ts-edit-name" value="${esc(nameVal)}" placeholder="Name" />
            </div>
            <div class="ts-row-btn" id="ts-set-photo-row">
              <span style="color:#38bdf8; font-weight:700;">📷 Set New Photo</span>
              <span style="font-size:12px; color:#94a3b8;">Logo</span>
            </div>
            <div style="padding:10px 15px;">
              <input type="text" class="ts-search-input" id="ts-edit-desc" value="${esc(descVal)}" placeholder="Description (optional)" />
            </div>
          </div>

          <div class="ts-group-box">
            <div class="ts-row-btn" id="ts-edit-priv">
              <span>${room.type === "channel" ? "Channel Type" : "Group Type"}</span>
              <span style="color:#38bdf8; font-weight:700;">${isPriv ? "Private" : "Public"}</span>
            </div>
            <div class="ts-row-btn">
              <span>Discussion</span>
              <span style="color:#38bdf8; font-weight:700;">TELESUPAR</span>
            </div>
            <div class="ts-row-btn">
              <span>Direct Messages</span>
              <span style="color:#fbbf24; font-weight:700;">★ On</span>
            </div>
            ${
              room.type === "group"
                ? `<div class="ts-row-btn" id="ts-edit-chat-perm">
                    <span>Member Chat Permission</span>
                    <span style="color:${allowChat ? "#5eead4" : "#fda4af"}; font-weight:700;">${allowChat ? "Allowed" : "Admins Only"}</span>
                  </div>`
                : ""
            }
          </div>

          <div class="ts-group-box">
            <div class="ts-row-btn">
              <span>Reactions</span>
              <span style="color:#38bdf8; font-weight:700;">All</span>
            </div>
            <div class="ts-row-btn">
              <span>Welcome Message</span>
              <span style="color:#94a3b8;">Off</span>
            </div>
            <div class="ts-row-btn">
              <span>Administrators</span>
              <span style="color:#38bdf8; font-weight:700;">${Math.max((room.admins || []).length, 1)}</span>
            </div>
            <div class="ts-row-btn" id="ts-edit-subs-row">
              <span>${room.type === "channel" ? "Subscribers" : "Members"}</span>
              <span style="color:#38bdf8; font-weight:700;">${Math.max((room.members || []).length, 1)}</span>
            </div>
            <div class="ts-row-btn">
              <span>Invite Links</span>
              <span style="color:#38bdf8; font-weight:700;">1</span>
            </div>
            <div class="ts-row-btn">
              <span>Recent Actions</span>
              <span style="color:#94a3b8;">›</span>
            </div>
          </div>

          <div class="ts-group-box">
            <div class="ts-row-btn" id="ts-edit-delete" style="color:#f87171; font-weight:700;">
              <span>Delete ${room.type === "channel" ? "Channel" : "Group"}</span>
            </div>
          </div>
        </div>
      `;

      container.querySelector("#ts-edit-back").onclick = () => openGlassInfo(room);

      container.querySelector("#ts-set-photo-row").onclick = () => {
        pickImageFile((dataUrl) => {
          logoVal = dataUrl;
          const prev = container.querySelector("#ts-edit-logo-preview");
          if (prev) prev.innerHTML = renderAvatar(nameVal, logoVal, 56);
        });
      };

      container.querySelector("#ts-edit-priv").onclick = () => {
        isPriv = !isPriv;
        openEditScreen({ ...room, name: container.querySelector("#ts-edit-name")?.value || nameVal, description: container.querySelector("#ts-edit-desc")?.value || descVal, logo: logoVal, isPrivate: isPriv, allowMemberMessages: allowChat });
      };

      const chatPerm = container.querySelector("#ts-edit-chat-perm");
      if (chatPerm) {
        chatPerm.onclick = async () => {
          allowChat = !allowChat;
          await apiReq(`/api/groups/${encodeURIComponent(room.id)}/settings`, {
            method: "PATCH",
            body: JSON.stringify({ allowMemberMessages: allowChat })
          });
          room.allowMemberMessages = allowChat;
          upsertRoom(room);
          openEditScreen(room);
        };
      }

      container.querySelector("#ts-edit-subs-row").onclick = () => openSubscribersScreen(room, room.members || []);

      container.querySelector("#ts-edit-save").onclick = () => {
        const nextName = (container.querySelector("#ts-edit-name")?.value || "").trim();
        const nextDesc = (container.querySelector("#ts-edit-desc")?.value || "").trim();
        if (!nextName) return;
        room.name = nextName;
        room.description = nextDesc;
        room.logo = logoVal;
        room.isPrivate = isPriv;
        room.allowMemberMessages = allowChat;
        upsertRoom(room);
        openGlassInfo(room);
      };

      container.querySelector("#ts-edit-delete").onclick = () => {
        if (!confirm(`Delete "${room.name}"?`)) return;
        removeRoom(room.id);
        renderHome();
      };
    }

    function openSubscribersScreen(room, initialMembers) {
      setNavHidden(true);
      let subSearch = "";
      let list = initialMembers.length
        ? initialMembers
        : [{ id: room.ownerId || meId(), name: meName(), role: "Owner", status: "online" }];

      function paintSubs() {
        const q = subSearch.trim().toLowerCase();
        const visible = list.filter((m, idx) => {
          const obj = typeof m === "object" ? m : { id: m, name: `Member ${idx + 1}`, role: "Member" };
          const n = obj.name || obj.displayName || obj.username || `Member ${idx + 1}`;
          return !q || n.toLowerCase().includes(q);
        });

        container.innerHTML = `
          <div class="ts-glass-app">
            <div class="ts-glass-top">
              <button type="button" class="ts-back-btn" id="ts-subs-back">← Back</button>
              <span style="font-weight:700; font-size:15px;">${room.type === "channel" ? "Subscribers" : "Members"}</span>
              <span style="font-size:12px; color:#38bdf8; font-weight:700;">${list.length}</span>
            </div>

            <div class="ts-search-box">
              <input type="text" class="ts-search-input" id="ts-subs-search" placeholder="Search subscribers..." value="${esc(subSearch)}" />
            </div>

            <div class="ts-group-box">
              <div class="ts-row-btn" id="ts-sub-add-btn">
                <span style="color:#38bdf8; font-weight:700;">👤+ Add ${room.type === "channel" ? "subscribers" : "members"}</span>
              </div>
              <div class="ts-row-btn" id="ts-sub-invite-btn">
                <span style="color:#38bdf8; font-weight:700;">🔗 Invite via Link</span>
              </div>
            </div>

            <div class="ts-group-box">
              ${visible
                .map((m, i) => {
                  const obj = typeof m === "object"
                    ? m
                    : { id: m, name: `Member ${i + 1}`, role: i === 0 ? "Owner" : "Member", status: "online" };
                  const label = obj.name || obj.displayName || obj.username || `Member ${i + 1}`;
                  return `
                    <div class="ts-row-btn" data-sub-uid="${esc(obj.id || "")}" data-sub-name="${esc(label)}">
                      <div style="display:flex; align-items:center; gap:12px;">
                        ${renderAvatar(label, obj.avatar || "", 42)}
                        <div>
                          <div style="font-weight:700; font-size:14px;">${esc(label)}</div>
                          <div style="font-size:11px; color:#94a3b8;">${esc(obj.status || "member")}</div>
                        </div>
                      </div>
                      <span style="font-size:11px; color:#5eead4; font-weight:700;">${esc(obj.role || (i === 0 ? "Owner" : "Member"))}</span>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        `;

        container.querySelector("#ts-subs-back").onclick = () => openGlassInfo(room);

        const sEl = container.querySelector("#ts-subs-search");
        if (sEl) {
          sEl.oninput = (e) => {
            subSearch = e.target.value;
            paintSubs();
            const again = container.querySelector("#ts-subs-search");
            if (again) {
              again.focus();
              again.setSelectionRange(again.value.length, again.value.length);
            }
          };
        }

        container.querySelector("#ts-sub-add-btn").onclick = () => {
          const val = (prompt("Enter subscriber name or user ID:") || "").trim();
          if (!val) return;
          const added = {
            id: /^[a-f\d]{24}$/i.test(val) ? val : "u_" + Date.now(),
            name: val,
            role: "Member",
            status: "online"
          };
          list.push(added);
          room.members = list;
          upsertRoom(room);
          paintSubs();
        };

        container.querySelector("#ts-sub-invite-btn").onclick = () => {
          const link = telesuparInviteUrl(room);
          if (navigator.clipboard?.writeText) navigator.clipboard.writeText(link).catch(() => {});
          alert("Invite Link copied: " + link);
        };

        container.querySelectorAll("[data-sub-uid]").forEach((row) => {
          row.onclick = () => openUserProfileWithPosts(container, row.dataset.subUid, row.dataset.subName);
        });
      }

      paintSubs();
    }

    renderHome();
  };
})();
