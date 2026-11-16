(function() {
  const style = document.createElement("style");
  style.textContent = `
    .profile-hero { padding: 20px 18px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .profile-avatar-box { position: relative; width: 92px; height: 92px; margin: 0 auto 12px; }
    .profile-avatar-box img {
      width: 92px; height: 92px; border-radius: 50%; object-fit: cover;
      border: 3px solid #a855f7;
    }
    .avatar-edit-icon {
      position: absolute; bottom: 0; right: 0; width: 28px; height: 28px; border-radius: 50%;
      background: #6366f1; color: #fff; display: grid; place-items: center; font-size: 13px; cursor: pointer;
    }
    .stats-row {
      display: flex; justify-content: space-around; margin: 16px 0;
      background: #111827; padding: 12px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.07);
    }
    .stat-box { cursor: pointer; padding: 4px 12px; border-radius: 10px; transition: 0.2s; }
    .stat-box:hover { background: rgba(255,255,255,0.06); }
    .stat-num { font-size: 17px; font-weight: 800; color: #fff; }
    .stat-lbl { font-size: 11px; color: #94a3b8; }
    .profile-actions { display: flex; gap: 10px; }
    .btn-outline {
      flex: 1; background: #1e293b; border: 1px solid rgba(255,255,255,0.12);
      color: #fff; padding: 10px; border-radius: 12px; font-weight: 600; font-size: 13px; cursor: pointer;
    }
    .profile-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 4px; }
    .profile-grid-cell { aspect-ratio: 1/1; background: #111827; overflow: hidden; }
    .profile-grid-cell img, .profile-grid-cell video { width: 100%; height: 100%; object-fit: cover; }

    /* Instagram-Style Followers / Following Fullscreen Page */
    .ig-ff-screen {
      position: fixed; inset: 0; background: #090d16; z-index: 120;
      display: flex; flex-direction: column; overflow-y: auto;
    }
    .ig-ff-topbar {
      position: sticky; top: 0; background: #090d16; z-index: 15;
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px;
    }
    .ig-ff-tabs {
      display: flex; border-bottom: 1px solid rgba(255,255,255,0.1);
      position: sticky; top: 52px; background: #090d16; z-index: 14;
    }
    .ig-ff-tab {
      flex: 1; text-align: center; padding: 12px 4px; font-size: 14px; font-weight: 700;
      color: #94a3b8; cursor: pointer; border-bottom: 2px solid transparent;
    }
    .ig-ff-tab.active { color: #ffffff; border-bottom-color: #ffffff; }
    .ig-ff-search-box { padding: 12px 16px; }
    .ig-ff-search {
      width: 100%; background: #1e293b; border: none; border-radius: 12px;
      padding: 10px 14px; color: #fff; font-size: 14px; outline: none;
    }
    .ig-category-card {
      display: flex; align-items: center; gap: 12px; padding: 10px 16px; cursor: pointer;
    }
    .ig-category-card:hover { background: rgba(255,255,255,0.03); }
    .ig-cat-icon {
      width: 46px; height: 46px; border-radius: 50%; background: #1e293b;
      display: grid; place-items: center; font-size: 18px; border: 1px solid rgba(255,255,255,0.1);
    }
    .ig-sort-bar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 16px 6px; font-size: 14px; font-weight: 700; color: #f8fafc;
    }
    .ig-user-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 16px;
    }
    .ig-user-left { display: flex; align-items: center; gap: 12px; flex: 1; overflow: hidden; }
    .ig-user-ring {
      width: 50px; height: 50px; border-radius: 50%; padding: 2px;
      background: linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6); flex-shrink: 0;
    }
    .ig-user-ring img {
      width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 2px solid #090d16;
    }
    .ig-user-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
    .ig-btn-msg {
      background: #1e293b; color: #fff; border: none; padding: 7px 16px;
      border-radius: 9px; font-size: 13px; font-weight: 700; cursor: pointer;
    }
    .ig-btn-followback {
      background: #3b82f6; color: #fff; border: none; padding: 7px 14px;
      border-radius: 9px; font-size: 13px; font-weight: 700; cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  window.renderProfile = async function(container) {
    const meRes = await window.api("/api/me");
    const user = meRes.success ? meRes.user : window.AppState.user;
    window.AppState.user = user;

    const [followStats, feedRes] = await Promise.all([
      window.api(`/api/users/${user.id}/follow-status`),
      window.api("/api/posts/feed")
    ]);

    const myPosts = (feedRes.posts || []).filter(p => p.user.id === user.id);
    const followersCount = followStats.followersCount || 0;
    const followingCount = followStats.followingCount || 0;

    container.innerHTML = `
      <div class="profile-hero">
        <div class="profile-avatar-box">
          <img src="${window.avatarUrl(user)}" id="prof-avatar-img" />
          <label class="avatar-edit-icon" title="Change Photo">
            📷
            <input type="file" id="prof-avatar-input" accept="image/*" hidden />
          </label>
        </div>

        <h2 style="font-size:19px;">${user.displayName}</h2>
        <div style="color:#a855f7; font-size:13px; margin-bottom:6px;">@${user.username}</div>
        <p style="color:#cbd5e1; font-size:13px; max-width:320px; margin:0 auto;">${user.bio || "Hey there! I am using TELESUPAR."}</p>

        <div class="stats-row">
          <div class="stat-box">
            <div class="stat-num">${myPosts.length}</div>
            <div class="stat-lbl">Posts</div>
          </div>
          <div class="stat-box" id="open-followers-page">
            <div class="stat-num">${followersCount}</div>
            <div class="stat-lbl">Followers</div>
          </div>
          <div class="stat-box" id="open-following-page">
            <div class="stat-num">${followingCount}</div>
            <div class="stat-lbl">Following</div>
          </div>
        </div>

        <div class="profile-actions">
          <button class="btn-outline" id="btn-edit-profile">Edit Profile</button>
          <button class="btn-outline" id="btn-logout" style="color:#f87171;">Logout</button>
        </div>
      </div>

      <div style="padding:12px 16px 6px; font-size:12px; font-weight:700; color:#94a3b8; text-transform:uppercase;">My Posts</div>
      <div class="profile-grid">
        ${myPosts.length ? myPosts.map(p => `
          <div class="profile-grid-cell">
            ${p.mediaUrl
              ? (p.mediaType === "video" ? `<video src="${p.mediaUrl}"></video>` : `<img src="${p.mediaUrl}" />`)
              : `<div style="padding:10px; font-size:11px; color:#cbd5e1;">${p.caption}</div>`}
          </div>
        `).join("") : `<p style="grid-column:1/-1; text-align:center; color:#64748b; padding:30px;">No posts shared yet.</p>`}
      </div>
    `;

    document.getElementById("open-followers-page").onclick = () => {
      window.openFollowersFollowingPage(user, "followers", () => window.renderProfile(container));
    };
    document.getElementById("open-following-page").onclick = () => {
      window.openFollowersFollowingPage(user, "following", () => window.renderProfile(container));
    };

    document.getElementById("prof-avatar-input").onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      const res = await window.api("/api/me/avatar", { method: "POST", body: fd });
      if (res.success) window.renderProfile(container);
    };

    document.getElementById("btn-edit-profile").onclick = async () => {
      const displayName = prompt("Display Name (2-40 chars):", user.displayName);
      if (!displayName) return;
      const bio = prompt("Bio (max 160 chars):", user.bio || "");
      const res = await window.api("/api/me", {
        method: "PATCH",
        body: JSON.stringify({ displayName, bio: bio || "" })
      });
      if (res.success) window.renderProfile(container);
    };

    document.getElementById("btn-logout").onclick = () => {
      localStorage.removeItem("ts_token");
      localStorage.removeItem("ts_user");
      location.reload();
    };
  };

  // ✅ Sahi syntax assignment
  window.openFollowersFollowingPage = async function(user, initialTab, onClose) {
    const screen = document.createElement("div");
    screen.className = "ig-ff-screen";
    document.body.appendChild(screen);

    screen.innerHTML = `<p style="text-align:center; color:#94a3b8; padding:40px;">Loading connections...</p>`;

    const [followersRes, followingRes] = await Promise.all([
      window.api(`/api/users/${user.id}/followers`),
      window.api(`/api/users/${user.id}/following`)
    ]);

    let followersList = followersRes.success ? (followersRes.users || []) : [];
    let followingList = followingRes.success ? (followingRes.users || []) : [];
    let activeTab = initialTab; 
    let searchQuery = "";
    let filterOnlyNotFollowingBack = false;
    let sortMode = "Default";

    function renderScreen() {
      const followingIds = new Set(followingList.map(u => u.id));
      const followersIds = new Set(followersList.map(u => u.id));

      const notFollowingBack = followersList.filter(u => !followingIds.has(u.id));
      const mutuals = followingList.filter(u => followersIds.has(u.id));

      let displayList = activeTab === "followers" ? [...followersList] : [...followingList];

      if (activeTab === "followers" && filterOnlyNotFollowingBack) {
        displayList = [...notFollowingBack];
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        displayList = displayList.filter(u =>
          (u.username || "").toLowerCase().includes(q) ||
          (u.displayName || "").toLowerCase().includes(q)
        );
      }

      if (sortMode === "A-Z") {
        displayList.sort((a, b) => (a.username || "").localeCompare(b.username || ""));
      }

      screen.innerHTML = `
        <div class="ig-ff-topbar">
          <div style="display:flex; align-items:center; gap:16px;">
            <button id="ff-back-btn" style="background:none; border:none; color:#fff; font-size:22px; cursor:pointer;">←</button>
            <div style="font-weight:800; font-size:18px;">${user.username}</div>
          </div>
          <button id="ff-discover-btn" style="background:none; border:none; color:#fff; font-size:19px; cursor:pointer;" title="Discover People">👤+</button>
        </div>

        <div class="ig-ff-tabs">
          <div class="ig-ff-tab ${activeTab === "followers" ? "active" : ""}" data-tab="followers">
            ${followersList.length} followers
          </div>
          <div class="ig-ff-tab ${activeTab === "following" ? "active" : ""}" data-tab="following">
            ${followingList.length} following
          </div>
        </div>

        <div class="ig-ff-search-box">
          <input type="text" id="ff-search-input" class="ig-ff-search" placeholder="🔍 Search" value="${searchQuery}" />
        </div>

        ${activeTab === "following" ? `
          <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 16px 14px; border-bottom:1px solid rgba(255,255,255,0.06);">
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="ig-cat-icon">📇</div>
              <div>
                <div style="font-size:14px; font-weight:700;">Connect contacts</div>
                <div style="font-size:12px; color:#94a3b8;">Find people you know</div>
              </div>
            </div>
            <button onclick="document.getElementById('ff-discover-btn').click()" style="background:#3b82f6; color:#fff; border:none; padding:7px 16px; border-radius:9px; font-weight:700; font-size:13px; cursor:pointer;">Connect</button>
          </div>

          <div style="padding:12px 16px 4px; font-size:14px; font-weight:700;">Categories</div>
          <div class="ig-category-card" id="cat-mutuals">
            <div class="ig-cat-icon">🤝</div>
            <div>
              <div style="font-size:14px; font-weight:700;">Mutual connections</div>
              <div style="font-size:12px; color:#94a3b8;">${mutuals.length} people follow you back</div>
            </div>
          </div>
        ` : `
          <div style="padding:4px 16px 4px; font-size:14px; font-weight:700;">Categories</div>
          <div class="ig-category-card" id="cat-not-following-back" style="${filterOnlyNotFollowingBack ? 'background:rgba(59,130,246,0.12);' : ''}">
            <div class="ig-cat-icon">👥</div>
            <div>
              <div style="font-size:14px; font-weight:700;">People you don't follow back</div>
              <div style="font-size:12px; color:#94a3b8;">
                ${notFollowingBack.length ? `${notFollowingBack[0].username} and ${Math.max(0, notFollowingBack.length - 1)} others` : "You follow everyone back!"}
              </div>
            </div>
          </div>
        `}

        <div class="ig-sort-bar">
          <span>Sorted by ${sortMode}</span>
          <button id="ff-sort-toggle" style="background:none; border:none; color:#fff; font-size:16px; cursor:pointer;">↓↑</button>
        </div>

        <div style="padding-bottom:30px;">
          ${displayList.length ? displayList.map(u => {
            const iFollowThem = followingIds.has(u.id);
            return `
              <div class="ig-user-item">
                <div class="ig-user-left">
                  <div class="ig-user-ring">
                    <img src="${window.avatarUrl(u)}" />
                  </div>
                  <div style="overflow:hidden;">
                    <div style="font-weight:700; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${u.username}</div>
                    <div style="font-size:13px; color:#94a3b8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${u.displayName}</div>
                    ${u.isOnline ? '<div style="font-size:11px; color:#38bdf8;">Active now •</div>' : ""}
                  </div>
                </div>

                <div class="ig-user-actions">
                  ${activeTab === "followers" ? (
                    iFollowThem
                      ? `<button class="ig-btn-msg" data-msg-id="${u.id}">Message</button>`
                      : `<button class="ig-btn-followback" data-fback-id="${u.id}">Follow back</button>`
                  ) : (
                    `<button class="ig-btn-msg" data-msg-id="${u.id}">Message</button>`
                  )}
                  <button data-unfollow-id="${u.id}" style="background:none; border:none; color:#94a3b8; font-size:16px; cursor:pointer;" title="${activeTab === 'following' ? 'Unfollow' : 'Remove'}">
                    ${activeTab === "following" ? "⋮" : "✕"}
                  </button>
                </div>
              </div>
            `;
          }).join("") : `<p style="text-align:center; color:#64748b; padding:30px;">No users found.</p>`}
        </div>
      `;

      screen.querySelector("#ff-back-btn").onclick = () => {
        screen.remove();
        if (onClose) onClose();
      };

      screen.querySelector("#ff-discover-btn").onclick = () => {
        screen.remove();
        window.switchTab("explore");
      };

      screen.querySelectorAll(".ig-ff-tab").forEach(tab => {
        tab.onclick = () => {
          activeTab = tab.dataset.tab;
          filterOnlyNotFollowingBack = false;
          renderScreen();
        };
      });

      const searchInput = screen.querySelector("#ff-search-input");
      searchInput.oninput = (e) => {
        searchQuery = e.target.value;
        renderScreen();
        const newInput = screen.querySelector("#ff-search-input");
        newInput.focus();
        newInput.setSelectionRange(searchQuery.length, searchQuery.length);
      };

      const catNotBack = screen.querySelector("#cat-not-following-back");
      if (catNotBack) {
        catNotBack.onclick = () => {
          filterOnlyNotFollowingBack = !filterOnlyNotFollowingBack;
          renderScreen();
        };
      }

      screen.querySelector("#ff-sort-toggle").onclick = () => {
        sortMode = sortMode === "Default" ? "A-Z" : "Default";
        renderScreen();
      };

      screen.querySelectorAll("[data-msg-id]").forEach(btn => {
        btn.onclick = () => {
          screen.remove();
          window.openDirectChat(btn.dataset.msgId);
        };
      });

      screen.querySelectorAll("[data-fback-id]").forEach(btn => {
        btn.onclick = async () => {
          const targetId = btn.dataset.fbackId;
          btn.textContent = "...";
          const res = await window.api(`/api/users/${targetId}/follow`, { method: "POST" });
          if (res.success) {
            const addedUser = followersList.find(x => x.id === targetId);
            if (addedUser) followingList.unshift(addedUser);
            renderScreen();
          }
        };
      });

      screen.querySelectorAll("[data-unfollow-id]").forEach(btn => {
        btn.onclick = async () => {
          const targetId = btn.dataset.unfollowId;
          if (activeTab === "following") {
            if (!confirm("Unfollow this user?")) return;
            const res = await window.api(`/api/users/${targetId}/follow`, { method: "DELETE" });
            if (res.success) {
              followingList = followingList.filter(x => x.id !== targetId);
              renderScreen();
            }
          }
        };
      });
    }

    renderScreen();
  };
})();
