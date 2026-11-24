(function () {
  "use strict";

  const STORAGE_KEY = "telesupar_tg_groups_v1";

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
    .channel-post {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 14px;
      margin: 12px 14px;
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
    .tg-composer {
      position: sticky;
      bottom: 0;
      padding: 10px 14px 14px;
      background: rgba(9, 13, 22, 0.95);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      display: flex;
      gap: 8px;
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
      padding: 0 18px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
    }
  `;

  if (!document.getElementById(style.id)) {
    document.head.appendChild(style);
  }

  const defaultData = [
    {
      id: "ch1",
      type: "channel",
      name: "TELESUPAR Official",
      members: "14.2K subscribers",
      posts: [
        {
          id: "p1",
          text: "Welcome to TELESUPAR! Real-time stories, chats, and community channels in one place.",
          views: 4120,
          likes: 128,
          fire: 64,
          likedByMe: false,
          firedByMe: false,
          time: "Today"
        },
        {
          id: "p2",
          text: "Tip: Use the Explore tab to find friends and start instant messaging.",
          views: 2940,
          likes: 95,
          fire: 41,
          likedByMe: false,
          firedByMe: false,
          time: "Yesterday"
        }
      ],
      messages: []
    },
    {
      id: "grp1",
      type: "group",
      name: "Developers & Creators Hub",
      members: "842 members • 63 online",
      posts: [],
      messages: [
        { id: "m1", sender: "Aarav", text: "Anyone testing the new TELESUPAR build today?", own: false, time: "10:15 AM" },
        { id: "m2", sender: "Priya", text: "Yes! Navigation and community views feel super clean.", own: false, time: "10:18 AM" }
      ]
    }
  ];

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
      if (!raw) return structuredClone(defaultData);
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length ? parsed : structuredClone(defaultData);
    } catch (_) {
      return structuredClone(defaultData);
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
      if (res && res.success !== false) return res;
      return null;
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
    if (Array.isArray(apiRooms?.groups) && apiRooms.groups.length) {
      rooms = apiRooms.groups.map((g) => ({
        id: String(g.id || g._id),
        type: g.type === "channel" ? "channel" : "group",
        name: g.name || "Untitled",
        members: g.membersText || g.members || (g.type === "channel" ? "1 subscriber" : "1 member"),
        posts: Array.isArray(g.posts) ? g.posts : [],
        messages: Array.isArray(g.messages) ? g.messages : []
      }));
      saveLocalData(rooms);
    }

    function getPreviewText(room) {
      if (room.type === "channel") {
        const lastPost = room.posts?.[room.posts.length - 1];
        return lastPost?.text || "No broadcasts yet";
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
                <div class="tg-sub">Broadcast channels & community chats</div>
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
                : `<div style="text-align:center; padding:44px 16px; color:#94a3b8; font-size:13px;">No channels or groups found.</div>`
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
          "Click OK to create a Broadcast Channel (one-way posts), or Cancel for a Discussion Group (members can chat)."
        );
        const type = isChannel ? "channel" : "group";
        const newRoom = {
          id: "tg_" + Date.now(),
          type,
          name,
          members: isChannel ? "1 subscriber" : "1 member",
          posts: isChannel
            ? [
                {
                  id: "init_" + Date.now(),
                  text: `Channel "${name}" is live.`,
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
                  text: `Welcome to ${name}!`,
                  own: true,
                  time: formatTimeNow()
                }
              ]
            : []
        };

        const created = await tryApi("/api/groups", {
          method: "POST",
          body: JSON.stringify({ name, type })
        });
        if (created?.group?.id || created?.group?._id) {
          newRoom.id = String(created.group.id || created.group._id);
        }

        rooms.unshift(newRoom);
        saveLocalData(rooms);
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

      if (item.type === "channel") {
        item.posts.forEach((p) => {
          p.views = (Number(p.views) || 0) + 1;
        });
        saveLocalData(rooms);

        container.innerHTML = `
          <div class="tg-wrap">
            <div class="tg-room-header">
              <div style="display:flex; align-items:center; gap:12px;">
                <button type="button" class="tg-back-btn" id="tg-back">←</button>
                <div>
                  <div style="font-weight:700; font-size:15px;">${escapeHtml(item.name)}</div>
                  <div style="font-size:11px; color:#94a3b8;">${escapeHtml(item.members)} • Broadcast Channel</div>
                </div>
              </div>
            </div>

            <div id="channel-posts-list">
              ${
                item.posts.length
                  ? item.posts
                      .map(
                        (p) => `
                  <div class="channel-post" data-post-id="${escapeHtml(p.id)}">
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
                  : `<div style="text-align:center; padding:44px 16px; color:#94a3b8; font-size:13px;">No broadcasts yet. Post the first update below.</div>`
              }
            </div>

            <div class="tg-composer">
              <input
                id="ch-broadcast-input"
                class="tg-input"
                placeholder="Broadcast message to subscribers..."
                autocomplete="off"
              />
              <button type="button" id="ch-broadcast-btn" class="tg-send-btn">Post</button>
            </div>
          </div>
        `;

        container.querySelector("#tg-back").onclick = renderList;

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

            saveLocalData(rooms);
            await tryApi(`/api/groups/${encodeURIComponent(item.id)}/posts/${encodeURIComponent(pid)}/react`, {
              method: "POST",
              body: JSON.stringify({ reaction: kind })
            });
            openTgRoom(item);
          };
        });

        const publishPost = async () => {
          const input = container.querySelector("#ch-broadcast-input");
          const val = (input?.value || "").trim();
          if (!val) return;

          const newPost = {
            id: "p_" + Date.now(),
            text: val,
            views: 1,
            likes: 0,
            fire: 0,
            likedByMe: false,
            firedByMe: false,
            time: formatTimeNow()
          };

          item.posts.push(newPost);
          saveLocalData(rooms);
          await tryApi(`/api/groups/${encodeURIComponent(item.id)}/posts`, {
            method: "POST",
            body: JSON.stringify({ text: val })
          });
          openTgRoom(item);
        };

        container.querySelector("#ch-broadcast-btn").onclick = publishPost;
        container.querySelector("#ch-broadcast-input").onkeydown = (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            publishPost();
          }
        };
      } else {
        container.innerHTML = `
          <div class="tg-wrap">
            <div class="tg-room-header">
              <div style="display:flex; align-items:center; gap:12px;">
                <button type="button" class="tg-back-btn" id="tg-back">←</button>
                <div>
                  <div style="font-weight:700; font-size:15px;">${escapeHtml(item.name)}</div>
                  <div style="font-size:11px; color:#14b8a6;">${escapeHtml(item.members)}</div>
                </div>
              </div>
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

            <div class="tg-composer">
              <input
                id="grp-msg-input"
                class="tg-input"
                placeholder="Message group..."
                autocomplete="off"
              />
              <button type="button" id="grp-send-btn" class="tg-send-btn">Send</button>
            </div>
          </div>
        `;

        container.querySelector("#tg-back").onclick = renderList;

        const feedEl = container.querySelector("#tg-chat-feed");
        if (feedEl) feedEl.scrollTop = feedEl.scrollHeight;

        const sendGroupMsg = async () => {
          const input = container.querySelector("#grp-msg-input");
          const val = (input?.value || "").trim();
          if (!val) return;

          const senderName = getCurrentUserName();
          item.messages.push({
            id: "m_" + Date.now(),
            sender: senderName,
            text: val,
            own: true,
            time: formatTimeNow()
          });
          saveLocalData(rooms);

          await tryApi(`/api/groups/${encodeURIComponent(item.id)}/messages`, {
            method: "POST",
            body: JSON.stringify({ sender: senderName, text: val })
          });

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

    renderList();
  };
})();
