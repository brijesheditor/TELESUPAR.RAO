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

  function loadData() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      const list = Array.isArray(raw?.rooms) ? raw.rooms : [];
      const officialJoined = Boolean(raw?.officialJoined);
      return { rooms: list, officialJoined };
    } catch (_) {
      return { rooms: [], officialJoined: false };
    }
  }

  function saveData(rooms, officialJoined) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ rooms, officialJoined: Boolean(officialJoined) }));
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

  function renderAvatar(name, logoUrl, sizePx, extraClass) {
    const sz = sizePx || 48;
    const ch = esc((name || "T").charAt(0).toUpperCase());
    if (logoUrl) {
      return `<div class="ts-logo-img ${extraClass || ""}" style="width:${sz}px; height:${sz}px; font-size:${Math.round(sz * 0.38)}px;"><img src="${esc(logoUrl)}" alt="${esc(name)}" style="width:100%; height:100%; object-fit:cover; display:block;" /></div>`;
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
          <button type="button" id="ts-prof-back" class="ts-back-btn">Back</button>
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
    if (!container || !ensureStandaloneContext()) return;

    const pageType = window.TS_ROOM_PAGE === "channel" ? "channel" : "group";
    const pageLabel = pageType === "channel" ? "Channels" : "Groups";
    let { rooms, officialJoined } = loadData();
    let searchQuery = "";

    const apiList = await apiReq("/api/groups");
    if (apiList?.success && Array.isArray(apiList.groups)) {
      rooms = apiList.groups.map((r) => {
        const localMatch = rooms.find((x) => String(x.id) === String(r.id));
        return { ...r, logo: r.logo || localMatch?.logo || "" };
      });
      saveData(rooms, officialJoined);
    }

    function persist() {
      saveData(rooms, officialJoined);
    }

    function upsertRoom(updated) {
      if (!updated?.id) return;
      const idx = rooms.findIndex((r) => String(r.id) === String(updated.id));
      if (idx >= 0) {
        rooms[idx] = {
          ...rooms[idx],
          ...updated,
          logo: updated.logo !== undefined ? updated.logo : rooms[idx].logo
        };
      } else {
        rooms.unshift(updated);
      }
      persist();
    }

    function getRoomById(id) {
      return rooms.find((r) => String(r.id) === String(id)) || null;
    }

    function removeRoom(id) {
      rooms = rooms.filter((r) => String(r.id) !== String(id));
      persist();
    }

    function isRoomUnlocked(room) {
      if (String(room.id) === OFFICIAL_ID || room.isOfficial) return true;
      const officialExists = rooms.some((r) => String(r.id) === OFFICIAL_ID || r.isOfficial);
      return !officialExists || Boolean(officialJoined);
    }

    function canManageRoom(room) {
      const isOfficial = String(room.id) === OFFICIAL_ID || Boolean(room.isOfficial);
      if (isOfficial) return false;
      const uid = meId();
      const adminsArr = Array.isArray(room.admins) ? room.admins.map(String) : [];
      return Boolean(room.isOwner || room.isAdmin || String(room.ownerId) === uid || adminsArr.includes(uid));
    }

    function canDeleteItem(room, item) {
      if (canManageRoom(room)) return true;
      const uid = meId();
      const itemAuthorId = String(item?.senderId || item?.authorId || "");
      return Boolean(item?.own || (itemAuthorId && itemAuthorId === uid));
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
      const pageRooms = rooms.filter((r) => r.type === pageType);
      const filtered = pageRooms.filter((r) => {
        const name = String(r.name || "").toLowerCase();
        const preview = String(lastPreview(r) || "").toLowerCase();
        return !q || name.includes(q) || preview.includes(q);
      });

      container.innerHTML = `
        <div class="ts-glass-app">
          <div class="ts-glass-top">
            <div><div style="font-size:11px;color:#38bdf8;font-weight:800;letter-spacing:1.4px;">TELESUPAR</div><div style="font-size:19px;font-weight:800;">${pageLabel}</div></div>
            <button type="button" class="ts-btn-primary" id="ts-new-room-btn">＋ Create ${pageType === "channel" ? "Channel" : "Group"}</button>
          </div>

          <div class="ts-search-box">
            <input type="text" class="ts-search-input" id="ts-home-search" placeholder="Search ${pageLabel}" value="${esc(searchQuery)}" />
          </div>

          <div class="ts-chip-row">
            <span class="ts-chip active">${pageLabel} (${pageRooms.length})</span>
          </div>

          ${
            !officialJoined && rooms.some((r) => String(r.id) === OFFICIAL_ID)
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
        joinOffBtn.onclick = async () => {
          const result = await apiReq(`/api/groups/${encodeURIComponent(OFFICIAL_ID)}/join`, { method: "POST" });
          if (!result?.success) {
            alert(result?.message || "Could not join the official channel.");
            return;
          }
          officialJoined = true;
          persist();
          renderHome();
        };
      }

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
        const officialExists = rooms.some((r) => String(r.id) === OFFICIAL_ID || r.isOfficial);
        if (officialExists && !officialJoined) {
          alert("Please join the official TELESUPAR channel first.");
          return;
        }
        const type = pageType;
        const isCh = type === "channel";
        const name = (prompt(`Enter ${isCh ? "Channel" : "Group"} Name:`) || "").trim();
        if (!name) return;
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

        const apiRes = await apiReq("/api/groups", {
          method: "POST",
          body: JSON.stringify({ name, type, allowMemberMessages, logo: logoData })
        });

        if (!apiRes?.success || !apiRes.group) {
          alert(apiRes?.message || "Could not create room. Please try again.");
          return;
        }

        upsertRoom({ ...apiRes.group, logo: apiRes.group.logo || logoData });
        renderHome();
      };

      container.querySelectorAll("[data-open-room]").forEach((card) => {
        card.onclick = () => {
          const room = getRoomById(card.dataset.openRoom);
          if (!room) return;
          if (!isRoomUnlocked(room)) {
            alert("Join the official TELESUPAR channel first to unlock other channels & groups.");
            return;
          }
          openRoomChat(room);
        };
      });
    }

        function openMessagePopup(roomId, itemId, isChannelPost) {
      const room = getRoomById(roomId);
      if (!room) return;

      const collection = isChannelPost ? room.posts : room.messages;
      const item = (collection || []).find((x) => String(x.id) === String(itemId));
      if (!item) return;

      const allowDelete = canDeleteItem(room, item);
      const allowPin = canManageRoom(room);

      const old = document.getElementById("ts-msg-popup");
      if (old) old.remove();

      const pop = document.createElement("div");
      pop.id = "ts-msg-popup";
      pop.className = "ts-overlay";

      pop.innerHTML = `
        <div class="ts-emoji-strip">
          ${EMOJI_CHOICES.map((em) =>
            `<button type="button" class="ts-emoji-pick" data-emoji="${esc(em)}">${esc(em)}</button>`
          ).join("")}
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
          if (!isChannelPost) {
            alert("Message reactions are not available on the current server API.");
            return;
          }

          const emoji = eb.dataset.emoji;
          const result = await apiReq(
            `/api/groups/${encodeURIComponent(room.id)}/posts/${encodeURIComponent(item.id)}/react`,
            {
              method: "POST",
              body: JSON.stringify({ reaction: emoji })
            }
          );

          if (!result?.success) {
            alert(result?.message || "Reaction could not be saved.");
            return;
          }

          if (result.group) upsertRoom(result.group);
          else if (result.post) {
            const index = room.posts.findIndex((p) => String(p.id) === String(item.id));
            if (index >= 0) room.posts[index] = result.post;
            upsertRoom(room);
          } else {
            const refreshed = await apiReq("/api/groups");
            if (refreshed?.success && Array.isArray(refreshed.groups)) {
              const updatedRoom = refreshed.groups.find((g) => String(g.id) === String(room.id));
              if (updatedRoom) upsertRoom(updatedRoom);
            }
          }

          pop.remove();
          openRoomChat(getRoomById(room.id) || room);
        };
      });

      pop.querySelectorAll("[data-act]").forEach((ab) => {
        ab.onclick = async () => {
          const act = ab.dataset.act;
          const textVal = item.text || "";

          if (act === "reply") {
            const inp = container.querySelector("#ts-room-input");
            if (inp) {
              inp.value = `Replying to "${textVal.slice(0, 30)}": `;
              inp.focus();
            }
          } else if (act === "copy") {
            if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(textVal).catch(() => {});
              alert("Copied to clipboard");
            } else {
              alert("Clipboard is not available in this browser.");
            }
          } else if (act === "link") {
            const url = telesuparInviteUrl(room);
            if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(url).catch(() => {});
              alert("TELESUPAR link copied.");
            } else {
              alert(url);
            }
          } else if (act === "save") {
            const blob = new Blob([textVal], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${room.name || "telesupar"}_message.txt`;
            a.click();
            URL.revokeObjectURL(url);
          } else if (act === "share") {
            if (navigator.share) {
              await navigator.share({ title: room.name, text: textVal }).catch(() => {});
            } else if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(textVal).catch(() => {});
              alert("Message copied. You can share it now.");
            } else {
              alert(textVal);
            }
          } else if (act === "pin" && allowPin) {
            const result = await apiReq(
              `/api/groups/${encodeURIComponent(room.id)}/settings`,
              {
                method: "PATCH",
                body: JSON.stringify({ pinnedText: textVal })
              }
            );

            if (!result?.success) {
              alert(result?.message || "Could not pin this message.");
              return;
            }

            if (result.group) upsertRoom(result.group);
          } else if (act === "delete" && allowDelete) {
            if (!confirm("Delete this message?")) return;

            alert("Message deletion is not connected to the server API yet.");
            return;
          }

          pop.remove();

          if (act === "pin") {
            openRoomChat(getRoomById(room.id) || room);
          }
        };
      });

      (container || document.body).appendChild(pop);
    }

    function openRoomChat(roomInput) {
      const room = getRoomById(roomInput.id) || roomInput;

      setNavHidden(true);

      room.posts = Array.isArray(room.posts) ? room.posts : [];
      room.messages = Array.isArray(room.messages) ? room.messages : [];
      room.members = Array.isArray(room.members) ? room.members : [];

      const isOfficial =
        String(room.id) === OFFICIAL_ID || Boolean(room.isOfficial);

      const isAdmin = canManageRoom(room);
      const isMember = isOfficial
        ? officialJoined
        : Boolean(room.isMember || isAdmin);

      const allowMemberMessages = room.allowMemberMessages !== false;

      const memberCount = Number(room.memberCount ?? room.members.length);

      const pinnedText =
        room.pinnedText ||
        (room.type === "channel"
          ? room.posts[0]?.text
          : room.messages[0]?.text) ||
        "";

      if (room.type === "channel") {
        container.innerHTML = `
          <div class="ts-glass-app">
            <div class="ts-glass-top">
              <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <button type="button" class="ts-back-btn" id="ts-chat-back">Back</button>

                <div id="ts-open-ch-info" style="display:flex; align-items:center; gap:10px; min-width:0; cursor:pointer;">
                  ${renderAvatar(room.name, room.logo, 38, "ch")}

                  <div style="min-width:0;">
                    <div style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      ${esc(room.name)} ${isOfficial ? "✓" : ""}
                    </div>

                    <div style="font-size:11px; color:#94a3b8;">
                      ${Number.isFinite(memberCount) ? compact(memberCount) : "—"} subscribers
                    </div>
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
                    <div style="color:#e2e8f0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      ${esc(pinnedText)}
                    </div>
                  </div>`
                : ""
            }

            <div style="padding-bottom:76px;">
              ${
                room.posts.length
                  ? room.posts.map((p) => {
                      const rx = typeof p.reactions === "object" && p.reactions
                        ? p.reactions
                        : {};

                      const entries = Object.entries(rx).filter(
                        ([, count]) => Number(count) > 0
                      );

                      return `
                        <div class="ts-bubble-card" data-post-id="${esc(p.id)}">
                          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                            <span
                              class="ts-author-click"
                              data-uid="${esc(p.authorId || "")}"
                              data-uname="${esc(p.authorName || room.name)}"
                              style="font-size:12px; font-weight:700; color:#38bdf8; cursor:pointer;"
                            >
                              ${esc(p.authorName || room.name)}
                            </span>

                            <span style="font-size:10px; color:#5eead4; font-weight:700;">
                              Admin
                            </span>
                          </div>

                          <div style="font-size:14px; line-height:1.45; white-space:pre-wrap;">
                            ${esc(p.text)}
                          </div>

                          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:8px; flex-wrap:wrap;">
                            <div style="display:flex; gap:6px; flex-wrap:wrap;">
                              ${
                                entries.length
                                  ? entries.map(([emoji, count]) =>
                                      `<span class="ts-react-chip ${p.myReaction === emoji ? "active" : ""}">
                                        ${esc(emoji)} ${Number(count)}
                                      </span>`
                                    ).join("")
                                  : `<span style="font-size:11px; color:#64748b;">Tap post to react</span>`
                              }
                            </div>

                            <span style="font-size:11px; color:#94a3b8;">
                              ${p.views !== undefined && p.views !== null
                                ? `👁 ${compact(p.views)}`
                                : ""}
                              ${p.time ? ` • ${esc(p.time)}` : ""}
                            </span>
                          </div>
                        </div>
                      `;
                    }).join("")
                  : `<div style="text-align:center; padding:44px 16px; color:#94a3b8;">
                      No broadcasts yet.
                    </div>`
              }
            </div>

            ${
              isAdmin
                ? `<div class="ts-composer-bar">
                    <input
                      type="text"
                      class="ts-composer-input"
                      id="ts-room-input"
                      placeholder="Broadcast message..."
                      autocomplete="off"
                    />
                    <button type="button" class="ts-btn-primary" id="ts-room-send">Post</button>
                  </div>`
                : `<div class="ts-composer-bar" style="justify-content:center; color:#94a3b8; font-size:12px;">
                    ${!isMember ? "Join this channel first" : "Only channel owner & admins can broadcast"}
                  </div>`
            }
          </div>
        `;

        container.querySelector("#ts-chat-back").onclick = renderHome;

        container.querySelector("#ts-open-ch-info").onclick = () => {
          openGlassInfo(room);
        };

        const infoBtn = container.querySelector("#ts-ch-info-btn");
        if (infoBtn) {
          infoBtn.onclick = () => openGlassInfo(room);
        }

        const joinBtn = container.querySelector("#ts-join-room-btn");

        if (joinBtn) {
          joinBtn.onclick = async () => {
            const result = await apiReq(
              `/api/groups/${encodeURIComponent(room.id)}/join`,
              { method: "POST" }
            );

            if (!result?.success) {
              alert(result?.message || "Could not join this channel.");
              return;
            }

            if (result.group) upsertRoom(result.group);

            if (isOfficial) officialJoined = true;

            persist();
            openRoomChat(getRoomById(room.id) || room);
          };
        }

        container.querySelectorAll(".ts-author-click").forEach((el) => {
          el.onclick = (e) => {
            e.stopPropagation();
            openUserProfileWithPosts(
              container,
              el.dataset.uid,
              el.dataset.uname
            );
          };
        });

        container.querySelectorAll("[data-post-id]").forEach((card) => {
          card.onclick = () => {
            openMessagePopup(room.id, card.dataset.postId, true);
          };
        });

        if (isAdmin) {
          const publish = async () => {
            const input = container.querySelector("#ts-room-input");
            const textValue = (input?.value || "").trim();

            if (!textValue) return;

            const result = await apiReq(
              `/api/groups/${encodeURIComponent(room.id)}/posts`,
              {
                method: "POST",
                body: JSON.stringify({ text: textValue })
              }
            );

            if (!result?.success || !result.group) {
              alert(result?.message || "Post could not be published.");
              return;
            }

            upsertRoom(result.group);
            openRoomChat(getRoomById(room.id) || result.group);
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
                <button type="button" class="ts-back-btn" id="ts-chat-back">Back</button>

                <div id="ts-open-grp-info" style="display:flex; align-items:center; gap:10px; min-width:0; cursor:pointer;">
                  ${renderAvatar(room.name, room.logo, 38)}

                  <div style="min-width:0;">
                    <div style="font-weight:700; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      ${esc(room.name)}
                    </div>

                    <div style="font-size:11px; color:#94a3b8;">
                      ${Number.isFinite(memberCount) ? compact(memberCount) : "—"} members
                    </div>
                  </div>
                </div>
              </div>

              ${
                isAdmin
                  ? `<button type="button" class="ts-btn-glass" id="ts-perm-btn">
                      ${allowMemberMessages ? "🔓 Open" : "🔒 Admin"}
                    </button>`
                  : (!isMember
                      ? `<button type="button" class="ts-btn-primary" id="ts-join-grp">Join</button>`
                      : "")
              }
            </div>

            ${
              pinnedText
                ? `<div class="ts-pinned-bar">
                    <div style="color:#38bdf8; font-weight:700;">Pinned Message</div>
                    <div style="color:#e2e8f0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      ${esc(pinnedText)}
                    </div>
                  </div>`
                : ""
            }

            <div style="padding-bottom:76px;">
              ${
                room.messages.length
                  ? room.messages.map((m) => {
                      const senderLabel = m.sender || "Member";

                      const rx = typeof m.reactions === "object" && m.reactions
                        ? m.reactions
                        : {};

                      const entries = Object.entries(rx).filter(
                        ([, count]) => Number(count) > 0
                      );

                      return `
                        <div class="ts-bubble-card ${m.own ? "own" : ""}" data-msg-id="${esc(m.id)}">
                          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                            <span
                              class="ts-author-click"
                              data-uid="${esc(m.senderId || "")}"
                              data-uname="${esc(senderLabel)}"
                              style="font-size:12px; font-weight:700; color:#38bdf8; cursor:pointer;"
                            >
                              ${esc(senderLabel)}
                            </span>

                            ${m.isAdminSender
                              ? `<span style="font-size:10px; color:#5eead4; font-weight:700;">Admin</span>`
                              : ""}
                          </div>

                          <div style="font-size:14px; line-height:1.45; white-space:pre-wrap;">
                            ${esc(m.text)}
                          </div>

                          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:7px;">
                            <div style="display:flex; gap:5px; flex-wrap:wrap;">
                              ${entries.map(([emoji, count]) =>
                                `<span class="ts-react-chip ${m.myReaction === emoji ? "active" : ""}">
                                  ${esc(emoji)} ${Number(count)}
                                </span>`
                              ).join("")}
                            </div>

                            <span style="font-size:10px; color:#cbd5e1;">
                              ${esc(m.time || "")}
                            </span>
                          </div>
                        </div>
                      `;
                    }).join("")
                  : `<div style="text-align:center; padding:44px 16px; color:#94a3b8;">
                      No group messages yet.
                    </div>`
              }
            </div>

            ${
              canChat
                ? `<div class="ts-composer-bar">
                    <input
                      type="text"
                      class="ts-composer-input"
                      id="ts-room-input"
                      placeholder="Message"
                      autocomplete="off"
                    />
                    <button type="button" class="ts-btn-primary" id="ts-room-send">Send</button>
                  </div>`
                : `<div class="ts-composer-bar" style="justify-content:center; color:#94a3b8; font-size:12px;">
                    ${!isMember ? "Join group to send messages" : "Admins have restricted messaging"}
                  </div>`
            }
          </div>
        `;

        container.querySelector("#ts-chat-back").onclick = renderHome;

        container.querySelector("#ts-open-grp-info").onclick = () => {
          openGlassInfo(room);
        };

        container.querySelectorAll(".ts-author-click").forEach((el) => {
          el.onclick = (e) => {
            e.stopPropagation();
            openUserProfileWithPosts(
              container,
              el.dataset.uid,
              el.dataset.uname
            );
          };
        });

        container.querySelectorAll("[data-msg-id]").forEach((card) => {
          card.onclick = () => {
            openMessagePopup(room.id, card.dataset.msgId, false);
          };
        });

        const permBtn = container.querySelector("#ts-perm-btn");

        if (permBtn) {
          permBtn.onclick = async () => {
            const next = !allowMemberMessages;

            const result = await apiReq(
              `/api/groups/${encodeURIComponent(room.id)}/settings`,
              {
                method: "PATCH",
                body: JSON.stringify({ allowMemberMessages: next })
              }
            );

            if (!result?.success || !result.group) {
              alert(result?.message || "Could not update group settings.");
              return;
            }

            upsertRoom(result.group);
            openRoomChat(getRoomById(room.id) || result.group);
          };
        }

        const joinBtn = container.querySelector("#ts-join-grp");

        if (joinBtn) {
          joinBtn.onclick = async () => {
            const result = await apiReq(
              `/api/groups/${encodeURIComponent(room.id)}/join`,
              { method: "POST" }
            );

            if (!result?.success) {
              alert(result?.message || "Could not join this group.");
              return;
            }

            if (result.group) upsertRoom(result.group);

            openRoomChat(getRoomById(room.id) || room);
          };
        }

        if (canChat) {
          const send = async () => {
            const input = container.querySelector("#ts-room-input");
            const textValue = (input?.value || "").trim();

            if (!textValue) return;

            const result = await apiReq(
              `/api/groups/${encodeURIComponent(room.id)}/messages`,
              {
                method: "POST",
                body: JSON.stringify({ sender: meName(), text: textValue })
              }
            );

            if (!result?.success || !result.group) {
              alert(result?.message || "Message could not be sent.");
              return;
            }

            upsertRoom(result.group);
            openRoomChat(getRoomById(room.id) || result.group);
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

        function openGlassInfo(roomInput) {
      const room = getRoomById(roomInput.id) || roomInput;
      setNavHidden(true);

      let activeTab = "media";
      let muted = false;

      const isAdmin = canManageRoom(room);

      const members = Array.isArray(room.members) ? room.members : [];
      const adminsCount = Array.isArray(room.admins)
        ? room.admins.length
        : null;

      function drawInfo() {
        const current = getRoomById(room.id) || room;

        const mediaSource = current.type === "channel"
          ? (Array.isArray(current.posts) ? current.posts : [])
          : (Array.isArray(current.messages) ? current.messages : []);

        const memberCount = Number.isFinite(Number(current.memberCount))
          ? compact(current.memberCount)
          : (Array.isArray(current.members) ? current.members.length : "—");

        const adminCount = Array.isArray(current.admins)
          ? current.admins.length
          : "—";

        container.innerHTML = `
          <div class="ts-glass-app">
            <div class="ts-glass-top">
              <button type="button" class="ts-back-btn" id="ts-info-back">Back</button>

              <span style="font-weight:700; font-size:15px;">
                ${current.type === "channel" ? "Channel Info" : "Group Info"}
              </span>

              <div style="display:flex; gap:6px;">
                ${
                  isAdmin
                    ? `<button type="button" class="ts-btn-glass" id="ts-edit-pencil-btn">✎ Edit</button>`
                    : `<span style="width:42px;"></span>`
                }
              </div>
            </div>

            <div class="ts-hero-glass">
              <div style="display:flex; justify-content:center; margin-bottom:10px;">
                ${renderAvatar(
                  current.name,
                  current.logo,
                  82,
                  current.type === "channel" ? "ch" : ""
                )}
              </div>

              <div style="font-size:20px; font-weight:800;">
                ${esc(current.name)}
              </div>

              <div style="font-size:12px; color:#94a3b8; margin-top:3px;">
                ${current.isPrivate ? "Private" : "Public"} ${current.type}
              </div>

              <div class="ts-quick-4">
                <button type="button" class="ts-quick-box" id="ts-info-chat">💬 Chat</button>
                <button type="button" class="ts-quick-box" id="ts-info-mute">
                  ${muted ? "🔔 Unmute" : "🔕 Mute"}
                </button>
                <button type="button" class="ts-quick-box" id="ts-info-link">🔗 Invite</button>
                <button type="button" class="ts-quick-box" id="ts-info-logo">🖼 Logo</button>
              </div>
            </div>

            <div class="ts-group-box">
              <div class="ts-row-btn" id="ts-open-subscribers">
                <span>👥 ${current.type === "channel" ? "Subscribers" : "Members"}</span>
                <span style="color:#38bdf8; font-weight:700;">${memberCount} ›</span>
              </div>

              <div class="ts-row-btn" id="ts-open-admins">
                <span>🛡 Administrators</span>
                <span style="color:#38bdf8; font-weight:700;">${adminCount} ›</span>
              </div>

              <div class="ts-row-btn" id="ts-open-settings-row">
                <span>⚙ ${current.type === "channel" ? "Channel Settings" : "Group Settings"}</span>
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
                        ? mediaSource.map((item) => `
                            <div class="ts-media-tile">
                              ${esc((item.text || "").slice(0, 60))}
                            </div>
                          `).join("")
                        : `<div style="grid-column:1/-1; text-align:center; padding:28px; color:#94a3b8; font-size:13px;">
                            No media yet
                          </div>`
                    }
                  </div>`
                : `<div style="text-align:center; padding:32px 16px; color:#94a3b8; font-size:13px;">
                    No ${esc(activeTab)} yet.
                  </div>`
            }
          </div>
        `;

        container.querySelector("#ts-info-back").onclick = () => {
          openRoomChat(current);
        };

        container.querySelector("#ts-info-chat").onclick = () => {
          openRoomChat(current);
        };

        const editButton = container.querySelector("#ts-edit-pencil-btn");

        if (editButton) {
          editButton.onclick = () => openEditScreen(current);
        }

        const settingsRow = container.querySelector("#ts-open-settings-row");

        if (settingsRow) {
          settingsRow.onclick = () => {
            if (isAdmin) {
              openEditScreen(current);
            } else {
              alert("Only channel/group admins can change settings.");
            }
          };
        }

        container.querySelector("#ts-info-mute").onclick = () => {
          muted = !muted;
          drawInfo();
        };

        container.querySelector("#ts-info-link").onclick = async () => {
          const link = telesuparInviteUrl(current);

          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(link).catch(() => {});
            alert("TELESUPAR Invite Link copied.");
          } else {
            alert(link);
          }
        };

        container.querySelector("#ts-info-logo").onclick = () => {
          if (!isAdmin) {
            alert("Only admin/owner can update logo.");
            return;
          }

          pickImageFile((dataUrl) => {
            current.logo = dataUrl;
            upsertRoom(current);
            drawInfo();
          });
        };

        container.querySelector("#ts-open-subscribers").onclick = () => {
          openSubscribersScreen(current, members);
        };

        container.querySelector("#ts-open-admins").onclick = () => {
          const admins = Array.isArray(current.admins)
            ? current.admins
            : [];

          openSubscribersScreen(current, admins, true);
        };

        container.querySelectorAll("[data-it]").forEach((button) => {
          button.onclick = () => {
            activeTab = button.dataset.it;
            drawInfo();
          };
        });
      }

      drawInfo();
    }

    function openEditScreen(roomInput) {
      const room = getRoomById(roomInput.id) || roomInput;

      setNavHidden(true);

      let nameVal = room.name || "";
      let descVal = room.description || "";
      let logoVal = room.logo || "";
      let isPriv = Boolean(room.isPrivate);
      let allowChat = room.allowMemberMessages !== false;

      container.innerHTML = `
        <div class="ts-glass-app">
          <div class="ts-glass-top">
            <button type="button" class="ts-back-btn" id="ts-edit-back">Back</button>

            <span style="font-weight:700; font-size:15px;">Edit</span>

            <button type="button" class="ts-btn-primary" id="ts-edit-save">Save</button>
          </div>

          <div class="ts-group-box">
            <div style="padding:14px 15px; display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.06);">
              <div id="ts-edit-logo-preview">
                ${renderAvatar(nameVal, logoVal, 56)}
              </div>

              <input
                type="text"
                class="ts-search-input"
                id="ts-edit-name"
                value="${esc(nameVal)}"
                placeholder="Name"
              />
            </div>

            <div class="ts-row-btn" id="ts-set-photo-row">
              <span style="color:#38bdf8; font-weight:700;">📷 Set New Photo</span>
              <span style="font-size:12px; color:#94a3b8;">Logo</span>
            </div>

            <div style="padding:10px 15px;">
              <input
                type="text"
                class="ts-search-input"
                id="ts-edit-desc"
                value="${esc(descVal)}"
                placeholder="Description (optional)"
              />
            </div>
          </div>

          <div class="ts-group-box">
            <div class="ts-row-btn" id="ts-edit-priv">
              <span>${room.type === "channel" ? "Channel Type" : "Group Type"}</span>
              <span style="color:#38bdf8; font-weight:700;">
                ${isPriv ? "Private" : "Public"}
              </span>
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
                    <span style="color:${allowChat ? "#5eead4" : "#fda4af"}; font-weight:700;">
                      ${allowChat ? "Allowed" : "Admins Only"}
                    </span>
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
              <span style="color:#38bdf8; font-weight:700;">
                ${Array.isArray(room.admins) ? room.admins.length : "—"}
              </span>
            </div>

            <div class="ts-row-btn" id="ts-edit-subs-row">
              <span>${room.type === "channel" ? "Subscribers" : "Members"}</span>
              <span style="color:#38bdf8; font-weight:700;">
                ${Array.isArray(room.members) ? room.members.length : "—"}
              </span>
            </div>

            <div class="ts-row-btn">
              <span>Invite Links</span>
              <span style="color:#38bdf8; font-weight:700;">—</span>
            </div>

            <div class="ts-row-btn">
              <span>Recent Actions</span>
              <span style="color:#94a3b8;">—</span>
            </div>
          </div>

          <div class="ts-group-box">
            <div class="ts-row-btn" id="ts-edit-delete" style="color:#f87171; font-weight:700;">
              <span>Delete ${room.type === "channel" ? "Channel" : "Group"}</span>
            </div>
          </div>

          <div style="padding:10px 14px; color:#94a3b8; font-size:11px; line-height:1.5;">
            Note: Name, description, privacy and logo changes are currently saved locally in this browser.
          </div>
        </div>
      `;

      container.querySelector("#ts-edit-back").onclick = () => {
        openGlassInfo(getRoomById(room.id) || room);
      };

      container.querySelector("#ts-set-photo-row").onclick = () => {
        pickImageFile((dataUrl) => {
          logoVal = dataUrl;
          room.logo = dataUrl;
          upsertRoom(room);

          const preview = container.querySelector("#ts-edit-logo-preview");

          if (preview) {
            preview.innerHTML = renderAvatar(nameVal, logoVal, 56);
          }
        });
      };

      container.querySelector("#ts-edit-priv").onclick = () => {
        const nameInput = container.querySelector("#ts-edit-name");
        const descInput = container.querySelector("#ts-edit-desc");

        nameVal = nameInput?.value || nameVal;
        descVal = descInput?.value || descVal;
        isPriv = !isPriv;

        room.name = nameVal;
        room.description = descVal;
        room.logo = logoVal;
        room.isPrivate = isPriv;

        upsertRoom(room);
        openEditScreen(room);
      };

      const chatPerm = container.querySelector("#ts-edit-chat-perm");

      if (chatPerm) {
        chatPerm.onclick = async () => {
          const next = !allowChat;

          const result = await apiReq(
            `/api/groups/${encodeURIComponent(room.id)}/settings`,
            {
              method: "PATCH",
              body: JSON.stringify({ allowMemberMessages: next })
            }
          );

          if (!result?.success || !result.group) {
            alert(result?.message || "Could not update member chat permission.");
            return;
          }

          allowChat = next;
          upsertRoom(result.group);
          openEditScreen(getRoomById(room.id) || room);
        };
      }

      container.querySelector("#ts-edit-subs-row").onclick = () => {
        openSubscribersScreen(room, room.members || []);
      };

      container.querySelector("#ts-edit-save").onclick = () => {
        const nextName = (
          container.querySelector("#ts-edit-name")?.value || ""
        ).trim();

        const nextDesc = (
          container.querySelector("#ts-edit-desc")?.value || ""
        ).trim();

        if (!nextName) {
          alert("Please enter a name.");
          return;
        }

        room.name = nextName;
        room.description = nextDesc;
        room.logo = logoVal;
        room.isPrivate = isPriv;
        room.allowMemberMessages = allowChat;

        upsertRoom(room);
        openGlassInfo(getRoomById(room.id) || room);
      };

      container.querySelector("#ts-edit-delete").onclick = () => {
        alert("Delete is not connected to the server API yet. No data was deleted.");
      };
    }

        function openSubscribersScreen(roomInput, initialMembers, isAdminList = false) {
      const room = getRoomById(roomInput.id) || roomInput;

      setNavHidden(true);

      let subSearch = "";

      let list = Array.isArray(initialMembers)
        ? initialMembers
        : [];

      function paintSubs() {
        const q = subSearch.trim().toLowerCase();

        const visible = list.filter((member) => {
          const obj = typeof member === "object" && member !== null
            ? member
            : { id: member, name: String(member || "") };

          const name = obj.name || obj.displayName || obj.username || "";

          return !q || name.toLowerCase().includes(q);
        });

        const title = isAdminList
          ? "Administrators"
          : room.type === "channel"
            ? "Subscribers"
            : "Members";

        container.innerHTML = `
          <div class="ts-glass-app">

            <div class="ts-glass-top">
              <button type="button" class="ts-back-btn" id="ts-subs-back">
                Back
              </button>

              <span style="font-weight:700; font-size:15px;">
                ${title}
              </span>

              <span style="font-size:12px; color:#38bdf8; font-weight:700;">
                ${list.length}
              </span>
            </div>

            <div class="ts-search-box">
              <input
                type="text"
                class="ts-search-input"
                id="ts-subs-search"
                placeholder="Search ${isAdminList ? "admins" : "members"}..."
                value="${esc(subSearch)}"
              />
            </div>

            ${
              !isAdminList
                ? `<div class="ts-group-box">
                    <div class="ts-row-btn" id="ts-sub-invite-btn">
                      <span style="color:#38bdf8; font-weight:700;">
                        🔗 Invite via Link
                      </span>
                    </div>
                  </div>`
                : ""
            }

            <div class="ts-group-box" id="ts-subs-list">

              ${
                visible.length
                  ? visible.map((member) => {
                      const obj = typeof member === "object" && member !== null
                        ? member
                        : { id: member, name: String(member || "") };

                      const label =
                        obj.name ||
                        obj.displayName ||
                        obj.username ||
                        "Unknown User";

                      const userId = obj.id || obj.userId || obj._id || "";

                      const role = obj.role || (
                        isAdminList ? "Administrator" : "Member"
                      );

                      return `
                        <div
                          class="ts-row-btn"
                          data-sub-uid="${esc(userId)}"
                          data-sub-name="${esc(label)}"
                        >
                          <div style="display:flex; align-items:center; gap:12px;">

                            ${renderAvatar(label, obj.avatar || "", 42)}

                            <div>
                              <div style="font-weight:700; font-size:14px;">
                                ${esc(label)}
                              </div>

                              <div style="font-size:11px; color:#94a3b8;">
                                ${esc(obj.status || "Member")}
                              </div>
                            </div>

                          </div>

                          <span style="font-size:11px; color:#5eead4; font-weight:700;">
                            ${esc(role)}
                          </span>
                        </div>
                      `;
                    }).join("")
                  : `<div style="text-align:center; padding:30px 16px; color:#94a3b8; font-size:13px;">
                      ${
                        q
                          ? "No matching users found."
                          : isAdminList
                            ? "No administrator data available."
                            : "No member data available."
                      }
                    </div>`
              }

            </div>

          </div>
        `;

        container.querySelector("#ts-subs-back").onclick = () => {
          openGlassInfo(getRoomById(room.id) || room);
        };

        const searchInput = container.querySelector("#ts-subs-search");

        if (searchInput) {
          searchInput.oninput = (event) => {
            subSearch = event.target.value;

            const cursorPosition = searchInput.selectionStart;

            paintSubs();

            const nextInput = container.querySelector("#ts-subs-search");

            if (nextInput) {
              nextInput.focus();

              try {
                nextInput.setSelectionRange(cursorPosition, cursorPosition);
              } catch (error) {}
            }
          };
        }

        const inviteButton = container.querySelector("#ts-sub-invite-btn");

        if (inviteButton) {
          inviteButton.onclick = async () => {
            const link = telesuparInviteUrl(room);

            if (navigator.clipboard?.writeText) {
              try {
                await navigator.clipboard.writeText(link);
                alert("Invite link copied.");
              } catch (error) {
                alert(link);
              }
            } else {
              alert(link);
            }
          };
        }

        container.querySelectorAll("[data-sub-uid]").forEach((row) => {
          row.onclick = () => {
            const userId = row.dataset.subUid;
            const userName = row.dataset.subName;

            if (!userId) {
              alert("User profile ID is not available.");
              return;
            }

            openUserProfileWithPosts(
              container,
              userId,
              userName
            );
          };
        });
      }

      paintSubs();
    }

    // Initial page render
    renderHome();

  };

})();
