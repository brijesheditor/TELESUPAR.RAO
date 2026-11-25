(function () {
  "use strict";

  const STORAGE_KEY = "telesupar_ig_channels_v2";
  const OFFICIAL_ID = "telesupar_official_channel";
  const EMOJI_CHOICES = ["❤️", "👍", "👎", "🔥", "🥰", "👏", "😁"];

  const style = document.createElement("style");
  style.id = "telesupar-ig-channel-style";
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

    .ts-ig-app {
      min-height: 100vh;
      background:
        radial-gradient(circle at 15% 8%, rgba(236, 72, 153, 0.16), transparent 40%),
        radial-gradient(circle at 85% 18%, rgba(139, 92, 246, 0.18), transparent 44%),
        #090d14;
      color: #f8fafc;
      padding-bottom: 96px;
      font-family: inherit;
    }

    .ts-ig-top {
      position: sticky;
      top: 0;
      z-index: 25;
      background: rgba(15, 21, 34, 0.84);
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

    .ts-ig-btn {
      background: linear-gradient(135deg, #e11d48, #8b5cf6);
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

    .ts-glass-btn {
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

    .ts-search-box {
      padding: 8px 14px 10px;
      background: rgba(15, 21, 34, 0.65);
    }

    .ts-search-input {
      width: 100%;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 9px 14px;
      color: #fff;
      font-size: 14px;
      outline: none;
    }

    .ts-gate-banner {
      margin: 10px 14px;
      padding: 14px;
      border-radius: 18px;
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.24));
      backdrop-filter: blur(18px);
      border: 1px solid rgba(244, 114, 182, 0.35);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .ts-channel-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 8px 14px;
      padding: 12px;
      border-radius: 18px;
      background: rgba(24, 33, 50, 0.72);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      cursor: pointer;
    }

    .ts-channel-row.locked {
      opacity: 0.5;
    }

    .ts-ring-ava {
      border-radius: 50%;
      padding: 2px;
      background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6);
      display: inline-grid;
      place-items: center;
      flex-shrink: 0;
    }

    .ts-logo-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      background: #141d2e;
      display: grid;
      place-items: center;
      font-weight: 800;
      color: #fff;
    }

    .ts-pinned-bar {
      margin: 8px 14px 0;
      padding: 9px 12px;
      border-radius: 14px;
      background: rgba(24, 33, 50, 0.84);
      backdrop-filter: blur(14px);
      border-left: 3px solid #ec4899;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 12px;
      cursor: pointer;
    }

    .ts-broadcast-card {
      margin: 10px 14px;
      padding: 13px 14px;
      border-radius: 18px;
      background: rgba(24, 33, 50, 0.78);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.09);
      cursor: pointer;
      transition: transform 0.18s ease, border-color 0.25s ease;
    }

    .ts-broadcast-card.ts-jump-glow {
      border-color: #f472b6;
      box-shadow: 0 0 0 2px rgba(244, 114, 182, 0.35);
    }

    .ts-bc-img {
      width: 100%;
      max-height: 280px;
      object-fit: cover;
      border-radius: 14px;
      margin-bottom: 8px;
      display: block;
    }

    .ts-poll-box {
      margin-top: 10px;
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(15, 23, 38, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .ts-poll-opt {
      width: 100%;
      margin-top: 6px;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
      color: #f8fafc;
      font-size: 12px;
      text-align: left;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .ts-poll-opt.voted {
      border-color: #f472b6;
      background: rgba(236, 72, 153, 0.22);
      font-weight: 700;
    }

    .ts-react-chip {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.09);
      color: #f8fafc;
      border-radius: 999px;
      padding: 3px 9px;
      font-size: 12px;
      cursor: pointer;
    }

    .ts-react-chip.active {
      background: rgba(236, 72, 153, 0.28);
      border-color: #f472b6;
      color: #fff;
      font-weight: 700;
    }

    .ts-composer-wrap {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 30;
      background: rgba(15, 21, 34, 0.92);
      backdrop-filter: blur(18px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 8px 12px;
    }

    .ts-composer-bar {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .ts-composer-input {
      flex: 1;
      min-width: 0;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      padding: 8px 13px;
      color: #fff;
      font-size: 13px;
      outline: none;
    }

    .ts-attach-preview {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      padding: 6px 10px;
      border-radius: 12px;
      background: rgba(244, 114, 182, 0.14);
      border: 1px solid rgba(244, 114, 182, 0.3);
      font-size: 12px;
    }

    .ts-hero-glass {
      margin: 12px 14px;
      padding: 20px 16px;
      border-radius: 22px;
      background: rgba(24, 33, 50, 0.76);
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
      background: rgba(24, 33, 50, 0.74);
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

    .ts-chip-row {
      display: flex;
      gap: 8px;
      padding: 6px 14px 10px;
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
      background: rgba(236, 72, 153, 0.24);
      border-color: rgba(244, 114, 182, 0.55);
      color: #fff;
    }

    .ts-media-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      padding: 6px 14px 16px;
    }

    .ts-media-tile {
      aspect-ratio: 1 / 1;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 6px;
      font-size: 11px;
      color: #cbd5e1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
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
      background: rgba(25, 35, 54, 0.94);
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
      background: rgba(20, 29, 46, 0.95);
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
      background: rgba(17, 24, 39, 0.96);
      backdrop-filter: blur(22px);
      border-top: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 24px 24px 0 0;
      max-height: 85vh;
      overflow-y: auto;
      padding: 16px;
    }

    .ts-glass-card {
      background: rgba(24, 33, 50, 0.76);
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 16px;
    }
  `;

  if (!document.getElementById(style.id)) {
    document.head.appendChild(style);
  }

  function setNavHidden(hidden) {
    if (hidden) document.body.classList.add("ts-room-immersive");
    else document.body.classList.remove("ts-room-immersive");
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({
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

  function telesuparInviteUrl(channel) {
    const origin = window.location?.origin && window.location.origin !== "null"
      ? window.location.origin
      : "https://telesupar.app";
    return `${origin}/?channel=${encodeURIComponent(channel.id)}`;
  }

  function createOfficialChannel() {
    return {
      id: OFFICIAL_ID,
      type: "channel",
      isOfficial: true,
      isPrivate: false,
      muted: false,
      pinnedPostId: "off_p_1",
      pinnedText: "Welcome to TELESUPAR Broadcast Channels! Join Official TELESUPAR to explore channels.",
      name: "TELESUPAR",
      logo: "",
      description: "Official TELESUPAR broadcast channel. Join to unlock all channels.",
      ownerId: "telesupar_system",
      admins: ["telesupar_system"],
      members: [
        { id: "telesupar_system", name: "TELESUPAR Official", role: "Official", status: "online" }
      ],
      isOwner: false,
      isAdmin: false,
      isMember: false,
      lastTime: "Now",
      posts: [
        {
          id: "off_p_1",
          text: "Welcome to TELESUPAR Broadcast Channels! Join Official TELESUPAR to explore channels.",
          image: "",
          silent: false,
          poll: null,
          authorName: "TELESUPAR Official",
          authorId: "telesupar_system",
          views: 120,
          reactions: { "❤️": 18, "🔥": 12 },
          myReaction: "",
          time: nowStr()
        }
      ]
    };
  }

  function loadData() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      const list = Array.isArray(raw?.channels) ? raw.channels : [];
      const officialJoined = Boolean(raw?.officialJoined);
      const hasOfficial = list.some((c) => String(c.id) === OFFICIAL_ID);
      const merged = hasOfficial ? list : [createOfficialChannel(), ...list];
      return { channels: merged, officialJoined };
    } catch (_) {
      return { channels: [createOfficialChannel()], officialJoined: false };
    }
  }

  function saveData(channels, officialJoined) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ channels, officialJoined: Boolean(officialJoined) }));
    } catch (_) {}
  }

  function ensureStandaloneContext() {
    if (!window.TS_ROOM_PAGE || typeof window.api === "function") return true;
    const token = localStorage.getItem("ts_token");
    if (!token) {
      window.location.replace("index.html");
      return false;
    }
    let savedUser = {};
    try { savedUser = JSON.parse(localStorage.getItem("ts_user") || "{}"); } catch (_) {}
    window.API_BASE = window.API_BASE || "https://telesupar.onrender.com";
    window.AppState = window.AppState || {};
    window.AppState.token = token;
    window.AppState.user = window.AppState.user || savedUser;
    window.api = async function (url, opts = {}) {
      const options = { ...opts };
      options.headers = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      };
      const response = await fetch(window.API_BASE + url, options);
      let data = {};
      try { data = await response.json(); } catch (_) {}
      if (response.status === 401) {
        localStorage.removeItem("ts_token");
        window.location.replace("index.html");
        throw new Error("Session expired. Please login again.");
      }
      if (!response.ok) throw new Error(data.message || "API request failed");
      return data;
    };
    return true;
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

  function renderAvatar(name, logoUrl, sizePx) {
    const sz = sizePx || 50;
    const ch = esc((name || "T").charAt(0).toUpperCase());
    const content = logoUrl
      ? `<img src="${esc(logoUrl)}" alt="${esc(name)}" style="width:100%; height:100%; object-fit:cover; display:block;" />`
      : `<span style="font-size:${Math.round(sz * 0.36)}px;">${ch}</span>`;

    return `
      <div class="ts-ring-ava" style="width:${sz}px; height:${sz}px;">
        <div class="ts-logo-inner">${content}</div>
      </div>
    `;
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
    return collected;
  }

  async function openUserProfileWithPosts(container, uid, fallbackName) {
    let profile = null;
    if (uid && /^[a-f\d]{24}$/i.test(String(uid))) {
      const pRes = await apiReq(`/api/users/${encodeURIComponent(uid)}/profile`);
      if (pRes?.success && pRes.profile) profile = pRes.profile;
    }

    const displayName = profile?.displayName || profile?.username || fallbackName || "Creator";
    const handle = profile?.username ? `@${profile.username}` : "";
    const bio = profile?.bio || "TELESUPAR creator";
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
            ${handle ? `<div style="font-size:13px; color:#f472b6;">${esc(handle)}</div>` : ""}
            <div style="font-size:12px; color:#94a3b8; margin-top:4px;">${esc(bio)}</div>
          </div>
        </div>

        <div style="font-size:13px; font-weight:700; color:#fbcfe8; margin-bottom:8px;">
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
    if (!container || !ensureStandaloneContext()) return;

    let { channels, officialJoined } = loadData();
    let searchQuery = "";

    const apiList = await apiReq("/api/groups");
    if (apiList?.success && Array.isArray(apiList.groups)) {
      const onlyChannels = apiList.groups.filter((r) => r.type === "channel");
      const hasOfficial = onlyChannels.some((c) => String(c.id) === OFFICIAL_ID || c.isOfficial);
      const baseList = hasOfficial ? onlyChannels : [createOfficialChannel(), ...onlyChannels];
      channels = baseList.map((c) => {
        const localMatch = channels.find((x) => String(x.id) === String(c.id));
        const logo = c.logo || localMatch?.logo || "";
        const muted = localMatch?.muted !== undefined ? Boolean(localMatch.muted) : Boolean(c.muted);
        const pinnedPostId = localMatch?.pinnedPostId || c.pinnedPostId || "";
        const pinnedText = localMatch?.pinnedText || c.pinnedText || "";
        return String(c.id) === OFFICIAL_ID
          ? { ...c, type: "channel", logo, muted, pinnedPostId, pinnedText, isMember: officialJoined || c.isMember }
          : { ...c, type: "channel", logo, muted, pinnedPostId, pinnedText };
      });
      saveData(channels, officialJoined);
    }

    function persist() {
      saveData(channels, officialJoined);
    }

    function upsertChannel(updated) {
      if (!updated?.id) return;
      const clean = { ...updated, type: "channel" };
      const idx = channels.findIndex((c) => String(c.id) === String(clean.id));
      if (idx >= 0) {
        channels[idx] = {
          ...channels[idx],
          ...clean,
          logo: clean.logo !== undefined ? clean.logo : channels[idx].logo,
          muted: clean.muted !== undefined ? clean.muted : channels[idx].muted
        };
      } else {
        channels.unshift(clean);
      }
      persist();
    }

    function getChannelById(id) {
      return channels.find((c) => String(c.id) === String(id)) || null;
    }

    function removeChannel(id) {
      if (String(id) === OFFICIAL_ID) return;
      channels = channels.filter((c) => String(c.id) !== String(id));
      persist();
    }

    function isChannelUnlocked(ch) {
      if (String(ch.id) === OFFICIAL_ID || ch.isOfficial) return true;
      return Boolean(officialJoined);
    }

    function canManageChannel(ch) {
      if (String(ch.id) === OFFICIAL_ID || ch.isOfficial) return false;
      const uid = meId();
      const adminsArr = Array.isArray(ch.admins) ? ch.admins.map(String) : [];
      return Boolean(ch.isOwner || ch.isAdmin || String(ch.ownerId) === uid || adminsArr.includes(uid));
    }

    function canDeletePost(ch, post) {
      if (canManageChannel(ch)) return true;
      const uid = meId();
      const authorId = String(post?.authorId || "");
      return Boolean(authorId && authorId === uid);
    }

    function renderChannelList() {
      setNavHidden(false);
      const q = searchQuery.trim().toLowerCase();
      const filtered = channels.filter((c) => {
        const name = String(c.name || "").toLowerCase();
        const lastText = String(c.posts?.[c.posts.length - 1]?.text || "").toLowerCase();
        return !q || name.includes(q) || lastText.includes(q);
      });

      container.innerHTML = `
        <div class="ts-ig-app">
          <div class="ts-ig-top">
            <div>
              <div style="font-size:10px; color:#f472b6; font-weight:800; letter-spacing:1.5px;">TELESUPAR</div>
              <div style="font-size:19px; font-weight:800;">Broadcast Channels</div>
            </div>
            <button type="button" class="ts-ig-btn" id="ts-new-channel-btn">＋ Channel</button>
          </div>

          <div class="ts-search-box">
            <input type="text" class="ts-search-input" id="ts-ch-search" placeholder="Search broadcast channels" value="${esc(searchQuery)}" />
          </div>

          ${
            !officialJoined
              ? `<div class="ts-gate-banner">
                  <div>
                    <div style="font-weight:800; font-size:14px;">Official TELESUPAR Channel</div>
                    <div style="font-size:12px; color:#e2e8f0; margin-top:2px;">Join official TELESUPAR channel first to unlock all channels.</div>
                  </div>
                  <button type="button" class="ts-ig-btn" id="ts-join-official-btn">Join</button>
                </div>`
              : ""
          }

          <div>
            ${filtered
              .map((ch) => {
                const unlocked = isChannelUnlocked(ch);
                const lastObj = ch.posts?.[ch.posts.length - 1];
                const lastPost = lastObj?.text || (lastObj?.image ? "📷 Photo broadcast" : "Broadcast channel");
                return `
                  <div class="ts-channel-row ${unlocked ? "" : "locked"}" data-open-ch="${esc(ch.id)}">
                    ${renderAvatar(ch.name, ch.logo, 52)}
                    <div style="flex:1; min-width:0;">
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                        <span style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                          ${esc(ch.name)} ${ch.isOfficial ? "✓" : ""} ${ch.muted ? "🔕" : ""}
                        </span>
                        <span style="font-size:11px; color:#94a3b8;">${esc(ch.lastTime || "")}</span>
                      </div>
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:3px;">
                        <span style="font-size:13px; color:#94a3b8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                          ${unlocked ? esc(lastPost) : "Join official TELESUPAR channel to unlock"}
                        </span>
                        <span class="ts-chip" style="padding:2px 8px; font-size:10px;">
                          ${unlocked ? "Broadcast" : "Locked"}
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

      const joinOff = container.querySelector("#ts-join-official-btn");
      if (joinOff) {
        joinOff.onclick = async () => {
          await apiReq(`/api/groups/${encodeURIComponent(OFFICIAL_ID)}/join`, { method: "POST" });
          officialJoined = true;
          const off = getChannelById(OFFICIAL_ID);
          if (off) off.isMember = true;
          persist();
          renderChannelList();
        };
      }

      const sInp = container.querySelector("#ts-ch-search");
      if (sInp) {
        sInp.oninput = (e) => {
          searchQuery = e.target.value;
          const pos = sInp.selectionStart;
          renderChannelList();
          const el = container.querySelector("#ts-ch-search");
          if (el) {
            el.focus();
            try { el.setSelectionRange(pos, pos); } catch (_) {}
          }
        };
      }

      container.querySelector("#ts-new-channel-btn").onclick = async () => {
        if (!officialJoined) {
          alert("Please join the official TELESUPAR channel first.");
          return;
        }
        const name = (prompt("Enter Broadcast Channel Name:") || "").trim();
        if (!name) return;

        let logoData = "";
        if (confirm("Set a logo/DP image for this channel?")) {
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
          body: JSON.stringify({ name, type: "channel", allowMemberMessages: false, logo: logoData })
        });

        if (apiRes?.success && apiRes.group) {
          upsertChannel({ ...apiRes.group, type: "channel", logo: apiRes.group.logo || logoData });
          renderChannelList();
          return;
        }

        const firstPostId = "p_" + Date.now();
        const welcomeText = `Welcome to ${name} broadcast channel!`;
        upsertChannel({
          id: "ch_" + Date.now(),
          type: "channel",
          isPrivate: false,
          muted: false,
          pinnedPostId: firstPostId,
          pinnedText: welcomeText,
          name,
          logo: logoData,
          description: `${name} broadcast channel on TELESUPAR.`,
          ownerId: uid,
          admins: [uid],
          members: [{ id: uid, name: uname, role: "Creator", status: "online" }],
          isOwner: true,
          isAdmin: true,
          isMember: true,
          lastTime: nowStr(),
          posts: [
            {
              id: firstPostId,
              text: welcomeText,
              image: "",
              silent: false,
              poll: null,
              authorName: uname,
              authorId: uid,
              views: 1,
              reactions: { "❤️": 1 },
              myReaction: "",
              time: nowStr()
            }
          ]
        });
        renderChannelList();
      };

      container.querySelectorAll("[data-open-ch]").forEach((row) => {
        row.onclick = () => {
          const ch = getChannelById(row.dataset.openCh);
          if (!ch) return;
          if (!isChannelUnlocked(ch)) {
            alert("Join the official TELESUPAR channel first to unlock other channels.");
            return;
          }
          openChannelFeed(ch);
        };
      });
    }

    function openPostPopup(channelId, postId) {
      const ch = getChannelById(channelId);
      if (!ch) return;
      ch.posts = Array.isArray(ch.posts) ? ch.posts : [];
      const post = ch.posts.find((p) => String(p.id) === String(postId));
      if (!post) return;

      post.reactions = typeof post.reactions === "object" && post.reactions ? post.reactions : {};
      const allowDelete = canDeletePost(ch, post);
      const allowPin = canManageChannel(ch);

      const old = document.getElementById("ts-post-popup");
      if (old) old.remove();

      const pop = document.createElement("div");
      pop.id = "ts-post-popup";
      pop.className = "ts-overlay";
      pop.innerHTML = `
        <div class="ts-emoji-strip">
          ${EMOJI_CHOICES.map((em) => `<button type="button" class="ts-emoji-pick" data-emoji="${esc(em)}">${esc(em)}</button>`).join("")}
        </div>
        <div class="ts-action-sheet">
          <button type="button" class="ts-sheet-row" data-act="reply">↩ Reply</button>
          <button type="button" class="ts-sheet-row" data-act="copy">📋 Copy</button>
          <button type="button" class="ts-sheet-row" data-act="link">🔗 Copy Link</button>
          <button type="button" class="ts-sheet-row" data-act="save">⬇ Save to Downloads</button>
          <button type="button" class="ts-sheet-row" data-act="share">📤 Share</button>
          ${allowPin ? `<button type="button" class="ts-sheet-row" data-act="pin">📌 Pin</button>` : ""}
          ${allowDelete ? `<button type="button" class="ts-sheet-row danger" data-act="delete">🗑 Delete</button>` : ""}
        </div>
      `;

      pop.onclick = (e) => {
        if (e.target === pop) pop.remove();
      };

      pop.querySelectorAll("[data-emoji]").forEach((eb) => {
        eb.onclick = async () => {
          const emoji = eb.dataset.emoji;
          if (post.myReaction === emoji) {
            post.reactions[emoji] = Math.max(0, (Number(post.reactions[emoji]) || 1) - 1);
            post.myReaction = "";
          } else {
            if (post.myReaction) {
              post.reactions[post.myReaction] = Math.max(0, (Number(post.reactions[post.myReaction]) || 1) - 1);
            }
            post.reactions[emoji] = (Number(post.reactions[emoji]) || 0) + 1;
            post.myReaction = emoji;
          }
          upsertChannel(ch);
          await apiReq(`/api/groups/${encodeURIComponent(ch.id)}/posts/${encodeURIComponent(post.id)}/react`, {
            method: "POST",
            body: JSON.stringify({ reaction: emoji })
          });
          pop.remove();
          openChannelFeed(getChannelById(ch.id) || ch);
        };
      });

      pop.querySelectorAll("[data-act]").forEach((ab) => {
        ab.onclick = async () => {
          const act = ab.dataset.act;
          const textVal = post.text || post.poll?.question || "";
          if (act === "reply") {
            const inp = container.querySelector("#ts-bc-input");
            if (inp) {
              inp.value = `Replying to "${textVal.slice(0, 30)}": `;
              inp.focus();
            }
          } else if (act === "copy") {
            if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(textVal).catch(() => {});
            alert("Copied");
          } else if (act === "link") {
            const url = telesuparInviteUrl(ch);
            if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url).catch(() => {});
            alert("Copied TELESUPAR link: " + url);
          } else if (act === "save") {
            const blob = new Blob([textVal], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${ch.name || "telesupar"}_broadcast.txt`;
            a.click();
            URL.revokeObjectURL(url);
          } else if (act === "share") {
            if (navigator.share) await navigator.share({ title: ch.name, text: textVal }).catch(() => {});
            else if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(textVal).catch(() => {});
              alert("Copied to share");
            }
          } else if (act === "pin" && allowPin) {
            ch.pinnedPostId = post.id;
            ch.pinnedText = textVal || "Pinned Broadcast";
            upsertChannel(ch);
            alert("Pinned broadcast");
          } else if (act === "delete" && allowDelete) {
            if (!confirm("Delete this broadcast?")) return;
            ch.posts = ch.posts.filter((x) => String(x.id) !== String(post.id));
            if (String(ch.pinnedPostId) === String(post.id)) {
              ch.pinnedPostId = ch.posts[0]?.id || "";
              ch.pinnedText = ch.posts[0]?.text || "";
            }
            upsertChannel(ch);
          }
          pop.remove();
          openChannelFeed(getChannelById(ch.id) || ch);
        };
      });

      (container || document.body).appendChild(pop);
    }

    function openChannelFeed(chInput) {
      const ch = getChannelById(chInput.id) || chInput;
      setNavHidden(true);
      ch.posts = Array.isArray(ch.posts) ? ch.posts : [];
      ch.members = Array.isArray(ch.members) ? ch.members : [];

      let pendingImage = "";
      let silentMode = false;

      const isOfficial = String(ch.id) === OFFICIAL_ID || Boolean(ch.isOfficial);
      const isAdmin = canManageChannel(ch);
      const isMember = isOfficial ? officialJoined : Boolean(ch.isMember || isAdmin);
      const subCount = Math.max(Number(ch.memberCount ?? ch.members.length), 1);

      const pinnedPost = ch.posts.find((p) => String(p.id) === String(ch.pinnedPostId)) || ch.posts[0] || null;
      const pinnedText = ch.pinnedText || pinnedPost?.text || (pinnedPost?.image ? "📷 Photo broadcast" : "");

      function drawFeed() {
        const current = getChannelById(ch.id) || ch;
        const pPost = current.posts.find((p) => String(p.id) === String(current.pinnedPostId)) || current.posts[0] || null;
        const pText = current.pinnedText || pPost?.text || (pPost?.image ? "📷 Photo broadcast" : "");

        container.innerHTML = `
          <div class="ts-ig-app">
            <div class="ts-ig-top">
              <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <button type="button" class="ts-back-btn" id="ts-feed-back">← Back</button>
                <div id="ts-open-info" style="display:flex; align-items:center; gap:10px; min-width:0; cursor:pointer;">
                  ${renderAvatar(current.name, current.logo, 40)}
                  <div style="min-width:0;">
                    <div style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      ${esc(current.name)} ${isOfficial ? "✓" : ""} ${current.muted ? "🔕" : ""}
                    </div>
                    <div style="font-size:11px; color:#94a3b8;">${compact(subCount)} subscribers</div>
                  </div>
                </div>
              </div>
              ${
                !isMember
                  ? `<button type="button" class="ts-ig-btn" id="ts-join-ch-btn">Join</button>`
                  : `<button type="button" class="ts-glass-btn" id="ts-info-ch-btn">Info</button>`
              }
            </div>

            ${
              pText
                ? `<div class="ts-pinned-bar" id="ts-pin-jump-bar" data-jump-id="${esc(pPost?.id || "")}">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="color:#f472b6; font-weight:700;">📌 Pinned Broadcast</span>
                      <span style="font-size:10px; color:#94a3b8;">Tap to jump</span>
                    </div>
                    <div style="color:#e2e8f0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;">${esc(pText)}</div>
                  </div>`
                : ""
            }

            <div style="padding-bottom:96px;">
              ${
                current.posts.length
                  ? current.posts
                      .map((p) => {
                        const rx = typeof p.reactions === "object" && p.reactions ? p.reactions : {};
                        const entries = Object.entries(rx).filter(([, cnt]) => Number(cnt) > 0);
                        let pollHtml = "";
                        if (p.poll && Array.isArray(p.poll.options)) {
                          const totalVotes = p.poll.options.reduce((sum, o) => sum + (Number(o.votes) || 0), 0);
                          pollHtml = `
                            <div class="ts-poll-box" data-stop-pop="1">
                              <div style="font-size:13px; font-weight:700; color:#fbcfe8;">📊 ${esc(p.poll.question)}</div>
                              ${p.poll.options
                                .map((opt, idx) => {
                                  const v = Number(opt.votes) || 0;
                                  const pct = totalVotes > 0 ? Math.round((v / totalVotes) * 100) : 0;
                                  const isVoted = Number(p.poll.myVote) === idx;
                                  return `
                                    <button type="button" class="ts-poll-opt ${isVoted ? "voted" : ""}" data-vote-post="${esc(p.id)}" data-vote-idx="${idx}">
                                      <span>${esc(opt.label)}</span>
                                      <span style="font-size:11px; color:#f472b6;">${pct}% (${v})</span>
                                    </button>
                                  `;
                                })
                                .join("")}
                              <div style="font-size:11px; color:#94a3b8; margin-top:6px;">${totalVotes} votes</div>
                            </div>
                          `;
                        }

                        return `
                          <div class="ts-broadcast-card" id="ts-post-${esc(p.id)}" data-post-id="${esc(p.id)}">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                              <span
                                class="ts-author-click"
                                data-uid="${esc(p.authorId || "")}"
                                data-uname="${esc(p.authorName || current.name)}"
                                style="font-size:12px; font-weight:700; color:#f472b6; cursor:pointer;"
                              >
                                ${esc(p.authorName || current.name)}
                              </span>
                              <span style="font-size:10px; color:#5eead4; font-weight:700;">
                                ${p.silent ? "🔕 Silent • " : ""}Creator
                              </span>
                            </div>
                            ${p.image ? `<img src="${esc(p.image)}" alt="broadcast" class="ts-bc-img" />` : ""}
                            ${p.text ? `<div style="font-size:14px; line-height:1.45; white-space:pre-wrap;">${esc(p.text)}</div>` : ""}
                            ${pollHtml}
                            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:9px; flex-wrap:wrap;">
                              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                                ${
                                  entries.length
                                    ? entries
                                        .map(([em, cnt]) => `<span class="ts-react-chip ${p.myReaction === em ? "active" : ""}">${esc(em)} ${Number(cnt)}</span>`)
                                        .join("")
                                    : `<span style="font-size:11px; color:#64748b;">Tap to react</span>`
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
                ? `<div class="ts-composer-wrap">
                    ${
                      pendingImage
                        ? `<div class="ts-attach-preview">
                            <span>📷 Photo attached</span>
                            <button type="button" id="ts-clear-img" style="background:none;border:none;color:#f87171;font-weight:700;cursor:pointer;">✕ Remove</button>
                          </div>`
                        : ""
                    }
                    <div class="ts-composer-bar">
                      <button type="button" class="ts-glass-btn" id="ts-bc-photo" title="Attach Photo">🖼</button>
                      <button type="button" class="ts-glass-btn" id="ts-bc-poll" title="Create Poll">📊</button>
                      <button type="button" class="ts-glass-btn" id="ts-bc-silent" title="Silent Mode">${silentMode ? "🔕" : "🔔"}</button>
                      <input type="text" class="ts-composer-input" id="ts-bc-input" placeholder="Broadcast update..." autocomplete="off" />
                      <button type="button" class="ts-ig-btn" id="ts-bc-send">Send</button>
                    </div>
                  </div>`
                : `<div class="ts-composer-wrap" style="text-align:center; color:#94a3b8; font-size:12px;">
                    ${!isMember ? "Join this channel to view updates" : "Only channel owner & admins can broadcast"}
                  </div>`
            }
          </div>
        `;

        container.querySelector("#ts-feed-back").onclick = renderChannelList;
        container.querySelector("#ts-open-info").onclick = () => openChannelInfo(current);
        const infoBtn = container.querySelector("#ts-info-ch-btn");
        if (infoBtn) infoBtn.onclick = () => openChannelInfo(current);

        const pinBar = container.querySelector("#ts-pin-jump-bar");
        if (pinBar) {
          pinBar.onclick = () => {
            const jid = pinBar.dataset.jumpId;
            if (!jid) return;
            const target = container.querySelector(`#ts-post-${CSS.escape(jid)}`);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "center" });
              target.classList.add("ts-jump-glow");
              setTimeout(() => target.classList.remove("ts-jump-glow"), 1500);
            }
          };
        }

        const joinBtn = container.querySelector("#ts-join-ch-btn");
        if (joinBtn) {
          joinBtn.onclick = async () => {
            if (isOfficial) officialJoined = true;
            current.isMember = true;
            upsertChannel(current);
            await apiReq(`/api/groups/${encodeURIComponent(current.id)}/join`, { method: "POST" });
            openChannelFeed(getChannelById(current.id) || current);
          };
        }

        container.querySelectorAll("[data-vote-post]").forEach((vb) => {
          vb.onclick = (e) => {
            e.stopPropagation();
            const postObj = current.posts.find((x) => String(x.id) === String(vb.dataset.votePost));
            const idx = Number(vb.dataset.voteIdx);
            if (!postObj?.poll?.options?.[idx]) return;
            const prevIdx = postObj.poll.myVote;
            if (prevIdx !== undefined && prevIdx !== null && prevIdx !== "" && postObj.poll.options[Number(prevIdx)]) {
              postObj.poll.options[Number(prevIdx)].votes = Math.max(0, (Number(postObj.poll.options[Number(prevIdx)].votes) || 1) - 1);
            }
            if (Number(prevIdx) === idx) {
              postObj.poll.myVote = "";
            } else {
              postObj.poll.options[idx].votes = (Number(postObj.poll.options[idx].votes) || 0) + 1;
              postObj.poll.myVote = idx;
            }
            upsertChannel(current);
            drawFeed();
          };
        });

        container.querySelectorAll(".ts-author-click").forEach((el) => {
          el.onclick = (e) => {
            e.stopPropagation();
            openUserProfileWithPosts(container, el.dataset.uid, el.dataset.uname);
          };
        });

        container.querySelectorAll("[data-post-id]").forEach((card) => {
          card.onclick = () => openPostPopup(current.id, card.dataset.postId);
        });

        if (isAdmin) {
          const photoBtn = container.querySelector("#ts-bc-photo");
          if (photoBtn) {
            photoBtn.onclick = () => {
              pickImageFile((dataUrl) => {
                pendingImage = dataUrl;
                drawFeed();
              });
            };
          }

          const clearImgBtn = container.querySelector("#ts-clear-img");
          if (clearImgBtn) {
            clearImgBtn.onclick = () => {
              pendingImage = "";
              drawFeed();
            };
          }

          const silentBtn = container.querySelector("#ts-bc-silent");
          if (silentBtn) {
            silentBtn.onclick = () => {
              silentMode = !silentMode;
              drawFeed();
            };
          }

          const pollBtn = container.querySelector("#ts-bc-poll");
          if (pollBtn) {
            pollBtn.onclick = () => {
              const question = (prompt("Enter Poll Question:") || "").trim();
              if (!question) return;
              const rawOpts = (prompt("Enter options separated by comma (e.g. Yes, No, Maybe):") || "").trim();
              const opts = rawOpts.split(",").map((s) => s.trim()).filter(Boolean);
              if (opts.length < 2) {
                alert("Please enter at least 2 options separated by comma.");
                return;
              }
              current.posts.push({
                id: "p_" + Date.now(),
                text: "",
                image: "",
                silent: silentMode,
                poll: {
                  question,
                  options: opts.map((label) => ({ label, votes: 0 })),
                  myVote: ""
                },
                authorName: meName(),
                authorId: meId(),
                views: 1,
                reactions: {},
                myReaction: "",
                time: nowStr()
              });
              current.lastTime = nowStr();
              upsertChannel(current);
              drawFeed();
            };
          }

          const publish = async () => {
            const inp = container.querySelector("#ts-bc-input");
            const txt = (inp?.value || "").trim();
            if (!txt && !pendingImage) return;

            const res = await apiReq(`/api/groups/${encodeURIComponent(current.id)}/posts`, {
              method: "POST",
              body: JSON.stringify({ text: txt, image: pendingImage, silent: silentMode })
            });
            if (res?.success && res.group) {
              pendingImage = "";
              upsertChannel({ ...res.group, type: "channel" });
              openChannelFeed(getChannelById(current.id) || current);
              return;
            }

            current.posts.push({
              id: "p_" + Date.now(),
              text: txt,
              image: pendingImage,
              silent: silentMode,
              poll: null,
              authorName: meName(),
              authorId: meId(),
              views: 1,
              reactions: {},
              myReaction: "",
              time: nowStr()
            });
            pendingImage = "";
            current.lastTime = nowStr();
            upsertChannel(current);
            drawFeed();
          };

          container.querySelector("#ts-bc-send").onclick = publish;
          container.querySelector("#ts-bc-input").onkeydown = (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              publish();
            }
          };
        }
      }

      drawFeed();
    }

    function openChannelInfo(chInput) {
      const ch = getChannelById(chInput.id) || chInput;
      setNavHidden(true);

      let activeTab = "media";
      const isOfficial = String(ch.id) === OFFICIAL_ID || Boolean(ch.isOfficial);
      const isAdmin = canManageChannel(ch);
      const isMember = isOfficial ? officialJoined : Boolean(ch.isMember || isAdmin);
      const members = ch.members.length
        ? ch.members
        : [{ id: ch.ownerId || meId(), name: meName(), role: "Creator", status: "online" }];
      const adminsCount = Math.max((ch.admins || []).length, 1);

      function drawInfo() {
        const current = getChannelById(ch.id) || ch;
        const posts = Array.isArray(current.posts) ? current.posts : [];

        container.innerHTML = `
          <div class="ts-ig-app">
            <div class="ts-ig-top">
              <button type="button" class="ts-back-btn" id="ts-info-back">← Back</button>
              <span style="font-weight:700; font-size:15px;">Channel Info</span>
              ${
                isAdmin
                  ? `<button type="button" class="ts-glass-btn" id="ts-edit-btn">✎ Edit</button>`
                  : `<span style="width:42px;"></span>`
              }
            </div>

            <div class="ts-hero-glass">
              <div style="display:flex; justify-content:center; margin-bottom:10px;">
                ${renderAvatar(current.name, current.logo, 84)}
              </div>
              <div style="font-size:20px; font-weight:800;">${esc(current.name)}</div>
              <div style="font-size:12px; color:#94a3b8; margin-top:3px;">
                ${current.isPrivate ? "Private broadcast channel" : "Public broadcast channel"}
              </div>
              <div style="font-size:13px; color:#cbd5e1; margin-top:8px; line-height:1.4;">
                ${esc(current.description || "")}
              </div>

              <div class="ts-quick-4">
                <button type="button" class="ts-quick-box" id="ts-info-feed">📢 Channel</button>
                <button type="button" class="ts-quick-box" id="ts-info-mute">${current.muted ? "🔔 Unmute" : "🔕 Mute"}</button>
                <button type="button" class="ts-quick-box" id="ts-info-link">🔗 Invite</button>
                <button type="button" class="ts-quick-box" id="ts-info-logo">🖼 Logo</button>
              </div>
            </div>

            <div class="ts-group-box">
              <div class="ts-row-btn" id="ts-open-subs">
                <span>👥 Subscribers</span>
                <span style="color:#f472b6; font-weight:700;">${members.length} ›</span>
              </div>
              <div class="ts-row-btn" id="ts-open-admins">
                <span>🛡 Administrators</span>
                <span style="color:#f472b6; font-weight:700;">${adminsCount} ›</span>
              </div>
              <div class="ts-row-btn" id="ts-open-edit-row">
                <span>⚙ Channel Settings</span>
                <span style="color:#94a3b8; font-size:12px;">›</span>
              </div>
              ${
                !isOfficial && !isAdmin
                  ? `<div class="ts-row-btn" id="ts-toggle-join-row">
                      <span style="color:${isMember ? "#f87171" : "#5eead4"}; font-weight:700;">
                        ${isMember ? "🚪 Leave Channel" : "＋ Join Channel"}
                      </span>
                    </div>`
                  : ""
              }
            </div>

            <div class="ts-chip-row">
              <button type="button" class="ts-chip ${activeTab === "media" ? "active" : ""}" data-t="media">Media</button>
              <button type="button" class="ts-chip ${activeTab === "links" ? "active" : ""}" data-t="links">Links</button>
              <button type="button" class="ts-chip ${activeTab === "polls" ? "active" : ""}" data-t="polls">Polls</button>
            </div>

            ${
              activeTab === "media"
                ? `<div class="ts-media-grid">
                    ${
                      posts.length
                        ? posts.map((p) => `
                            <div class="ts-media-tile">
                              ${p.image ? `<img src="${esc(p.image)}" alt="media" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />` : esc((p.text || p.poll?.question || "").slice(0, 60))}
                            </div>
                          `).join("")
                        : `<div style="grid-column:1/-1; text-align:center; padding:28px; color:#94a3b8; font-size:13px;">No broadcasts yet</div>`
                    }
                  </div>`
                : `<div style="text-align:center; padding:32px 16px; color:#94a3b8; font-size:13px;">No ${esc(activeTab)} yet.</div>`
            }
          </div>
        `;

        container.querySelector("#ts-info-back").onclick = () => openChannelFeed(current);
        container.querySelector("#ts-info-feed").onclick = () => openChannelFeed(current);

        const editBtn = container.querySelector("#ts-edit-btn");
        if (editBtn) editBtn.onclick = () => openEditChannel(current);

        container.querySelector("#ts-open-edit-row").onclick = () => {
          if (isAdmin) openEditChannel(current);
          else alert("Only channel owner/admins can edit channel settings.");
        };

        container.querySelector("#ts-info-mute").onclick = () => {
          current.muted = !current.muted;
          upsertChannel(current);
          drawInfo();
        };

        const joinToggleRow = container.querySelector("#ts-toggle-join-row");
        if (joinToggleRow) {
          joinToggleRow.onclick = () => {
            current.isMember = !isMember;
            upsertChannel(current);
            drawInfo();
          };
        }

        container.querySelector("#ts-info-link").onclick = async () => {
          const link = telesuparInviteUrl(current);
          if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(link).catch(() => {});
          alert("TELESUPAR Invite Link: " + link);
        };

        container.querySelector("#ts-info-logo").onclick = () => {
          if (!isAdmin) {
            alert("Only channel owner/admin can change logo.");
            return;
          }
          pickImageFile((dataUrl) => {
            current.logo = dataUrl;
            upsertChannel(current);
            drawInfo();
          });
        };

        container.querySelector("#ts-open-subs").onclick = () => openSubscribersScreen(current, members);
        container.querySelector("#ts-open-admins").onclick = () => openSubscribersScreen(current, members);

        container.querySelectorAll("[data-t]").forEach((b) => {
          b.onclick = () => {
            activeTab = b.dataset.t;
            drawInfo();
          };
        });
      }

      drawInfo();
    }

    function openEditChannel(chInput) {
      const ch = getChannelById(chInput.id) || chInput;
      setNavHidden(true);

      let nameVal = ch.name || "";
      let descVal = ch.description || "";
      let logoVal = ch.logo || "";
      let isPriv = Boolean(ch.isPrivate);

      container.innerHTML = `
        <div class="ts-ig-app">
          <div class="ts-ig-top">
            <button type="button" class="ts-back-btn" id="ts-edit-back">← Back</button>
            <span style="font-weight:700; font-size:15px;">Edit Channel</span>
            <button type="button" class="ts-ig-btn" id="ts-edit-save">Save</button>
          </div>

          <div class="ts-group-box">
            <div style="padding:14px 15px; display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.06);">
              <div id="ts-edit-logo-box">${renderAvatar(nameVal, logoVal, 58)}</div>
              <input type="text" class="ts-search-input" id="ts-edit-name" value="${esc(nameVal)}" placeholder="Channel Name" />
            </div>
            <div class="ts-row-btn" id="ts-pick-logo-row">
              <span style="color:#f472b6; font-weight:700;">📷 Set New Logo</span>
              <span style="font-size:12px; color:#94a3b8;">DP</span>
            </div>
            <div style="padding:10px 15px;">
              <input type="text" class="ts-search-input" id="ts-edit-desc" value="${esc(descVal)}" placeholder="Description" />
            </div>
          </div>

          <div class="ts-group-box">
            <div class="ts-row-btn" id="ts-toggle-priv">
              <span>Channel Type</span>
              <span style="color:#f472b6; font-weight:700;">${isPriv ? "Private" : "Public"}</span>
            </div>
            <div class="ts-row-btn" id="ts-edit-subs-link">
              <span>Subscribers</span>
              <span style="color:#f472b6; font-weight:700;">${Math.max((ch.members || []).length, 1)} ›</span>
            </div>
          </div>

          <div class="ts-group-box">
            <div class="ts-row-btn" id="ts-delete-ch-btn" style="color:#f87171; font-weight:700;">
              <span>Delete Channel</span>
            </div>
          </div>
        </div>
      `;

      container.querySelector("#ts-edit-back").onclick = () => openChannelInfo(getChannelById(ch.id) || ch);

      container.querySelector("#ts-pick-logo-row").onclick = () => {
        pickImageFile((dataUrl) => {
          logoVal = dataUrl;
          ch.logo = dataUrl;
          upsertChannel(ch);
          const box = container.querySelector("#ts-edit-logo-box");
          if (box) box.innerHTML = renderAvatar(nameVal, logoVal, 58);
        });
      };

      container.querySelector("#ts-toggle-priv").onclick = () => {
        nameVal = container.querySelector("#ts-edit-name")?.value || nameVal;
        descVal = container.querySelector("#ts-edit-desc")?.value || descVal;
        isPriv = !isPriv;
        ch.name = nameVal;
        ch.description = descVal;
        ch.logo = logoVal;
        ch.isPrivate = isPriv;
        upsertChannel(ch);
        openEditChannel(ch);
      };

      container.querySelector("#ts-edit-subs-link").onclick = () => openSubscribersScreen(ch, ch.members || []);

      container.querySelector("#ts-edit-save").onclick = () => {
        const nextName = (container.querySelector("#ts-edit-name")?.value || "").trim();
        const nextDesc = (container.querySelector("#ts-edit-desc")?.value || "").trim();
        if (!nextName) return;
        ch.name = nextName;
        ch.description = nextDesc;
        ch.logo = logoVal;
        ch.isPrivate = isPriv;
        upsertChannel(ch);
        openChannelInfo(getChannelById(ch.id) || ch);
      };

      container.querySelector("#ts-delete-ch-btn").onclick = () => {
        if (!confirm(`Delete channel "${ch.name}"?`)) return;
        removeChannel(ch.id);
        renderChannelList();
      };
    }

    function openSubscribersScreen(chInput, initialMembers) {
      const ch = getChannelById(chInput.id) || chInput;
      setNavHidden(true);

      let subSearch = "";
      let list = initialMembers.length
        ? initialMembers
        : [{ id: ch.ownerId || meId(), name: meName(), role: "Creator", status: "online" }];

      function paintSubs() {
        const q = subSearch.trim().toLowerCase();
        const visible = list.filter((m, idx) => {
          const obj = typeof m === "object" ? m : { id: m, name: `Subscriber ${idx + 1}`, role: "Member" };
          const label = obj.name || obj.displayName || obj.username || `Subscriber ${idx + 1}`;
          return !q || label.toLowerCase().includes(q);
        });

        container.innerHTML = `
          <div class="ts-ig-app">
            <div class="ts-ig-top">
              <button type="button" class="ts-back-btn" id="ts-subs-back">← Back</button>
              <span style="font-weight:700; font-size:15px;">Subscribers</span>
              <span style="font-size:12px; color:#f472b6; font-weight:700;">${list.length}</span>
            </div>

            <div class="ts-search-box">
              <input type="text" class="ts-search-input" id="ts-subs-search" placeholder="Search subscribers..." value="${esc(subSearch)}" />
            </div>

            <div class="ts-group-box">
              <div class="ts-row-btn" id="ts-add-sub-btn">
                <span style="color:#f472b6; font-weight:700;">＋ Add subscriber</span>
              </div>
              <div class="ts-row-btn" id="ts-copy-sub-link">
                <span style="color:#f472b6; font-weight:700;">🔗 Invite via Link</span>
              </div>
            </div>

            <div class="ts-group-box">
              ${visible
                .map((m, i) => {
                  const obj = typeof m === "object"
                    ? m
                    : { id: m, name: `Subscriber ${i + 1}`, role: i === 0 ? "Creator" : "Member", status: "online" };
                  const label = obj.name || obj.displayName || obj.username || `Subscriber ${i + 1}`;
                  return `
                    <div class="ts-row-btn" data-sub-uid="${esc(obj.id || "")}" data-sub-name="${esc(label)}">
                      <div style="display:flex; align-items:center; gap:12px;">
                        ${renderAvatar(label, obj.avatar || "", 44)}
                        <div>
                          <div style="font-weight:700; font-size:14px;">${esc(label)}</div>
                          <div style="font-size:11px; color:#94a3b8;">${esc(obj.status || "subscriber")}</div>
                        </div>
                      </div>
                      <span style="font-size:11px; color:#5eead4; font-weight:700;">${esc(obj.role || (i === 0 ? "Creator" : "Member"))}</span>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        `;

        container.querySelector("#ts-subs-back").onclick = () => openChannelInfo(getChannelById(ch.id) || ch);

        const sEl = container.querySelector("#ts-subs-search");
        if (sEl) {
          sEl.oninput = (e) => {
            subSearch = e.target.value;
            const pos = sEl.selectionStart;
            paintSubs();
            const again = container.querySelector("#ts-subs-search");
            if (again) {
              again.focus();
              try { again.setSelectionRange(pos, pos); } catch (_) {}
            }
          };
        }

        container.querySelector("#ts-add-sub-btn").onclick = () => {
          const val = (prompt("Enter subscriber name or user ID:") || "").trim();
          if (!val) return;
          list.push({
            id: /^[a-f\d]{24}$/i.test(val) ? val : "u_" + Date.now(),
            name: val,
            role: "Member",
            status: "online"
          });
          ch.members = list;
          upsertChannel(ch);
          paintSubs();
        };

        container.querySelector("#ts-copy-sub-link").onclick = async () => {
          const link = telesuparInviteUrl(ch);
          if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(link).catch(() => {});
          alert("Invite Link copied: " + link);
        };

        container.querySelectorAll("[data-sub-uid]").forEach((row) => {
          row.onclick = () => openUserProfileWithPosts(container, row.dataset.subUid, row.dataset.subName);
        });
      }

      paintSubs();
    }

    renderChannelList();

    const params = new URLSearchParams(window.location.search || "");
    const targetChId = params.get("channel");
    if (targetChId) {
      const targetCh = getChannelById(targetChId);
      if (targetCh) {
        if (isChannelUnlocked(targetCh)) openChannelFeed(targetCh);
        else alert("Join the official TELESUPAR channel first to open this channel.");
      }
    }
  };
})();
