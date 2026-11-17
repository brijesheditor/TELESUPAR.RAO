(function() {
  const style = document.createElement("style");
  style.textContent = `
    .explore-container {
      background: #090d16; min-height: 100vh; color: #fff; font-family: inherit; padding-bottom: 70px;
    }
    .explore-top-bar {
      position: sticky; top: 0; z-index: 50; background: rgba(9, 13, 22, 0.92);
      backdrop-filter: blur(12px); padding: 10px 12px; display: flex; align-items: center; gap: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .explore-search-box {
      flex: 1; display: flex; align-items: center; background: #1e293b;
      border-radius: 99px; padding: 8px 14px; gap: 8px; border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .explore-search-box input {
      flex: 1; background: transparent; border: none; color: #fff; font-size: 14px; outline: none;
    }
    .explore-search-box input::placeholder { color: #94a3b8; }
    .explore-saved-btn {
      background: none; border: none; color: #fff; font-size: 20px; cursor: pointer;
      width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%;
    }
    .explore-cats {
      display: flex; gap: 8px; padding: 8px 12px; overflow-x: auto; scrollbar-width: none; background: #090d16;
    }
    .explore-cats::-webkit-scrollbar { display: none; }
    .explore-cat-pill {
      background: #111827; color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 6px 14px; border-radius: 99px; font-size: 12px; font-weight: 600; white-space: nowrap; cursor: pointer;
    }
    .explore-cat-pill.active {
      background: linear-gradient(135deg, #6366f1, #ec4899); color: #fff; border-color: transparent;
    }
    .explore-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: #090d16;
    }
    .explore-tile {
      position: relative; aspect-ratio: 3 / 4; background: #111827; overflow: hidden; cursor: pointer;
    }
    .explore-tile img, .explore-tile video {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    .explore-text-tile {
      width: 100%; height: 100%; padding: 10px; display: flex; flex-direction: column;
      justify-content: center; align-items: center; text-align: center;
      background: linear-gradient(135deg, #1e1b4b, #0f172a); font-size: 11px; color: #e2e8f0; font-weight: 600;
    }
    .explore-tile-overlay {
      position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%); pointer-events: none;
    }
    .explore-tile-stats {
      position: absolute; bottom: 6px; left: 6px; display: flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 700; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,0.8); z-index: 2;
    }
    .explore-reel-icon {
      position: absolute; top: 6px; right: 6px; font-size: 13px; color: #fff; z-index: 2;
    }
    .explore-users-results { padding: 8px 12px; background: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .explore-user-row {
      display: flex; align-items: center; gap: 12px; padding: 10px 8px; cursor: pointer;
      border-radius: 8px; transition: background 0.2s;
    }
    .explore-user-row:hover { background: rgba(255, 255, 255, 0.05); }
    .explore-user-row img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
  `;
  document.head.appendChild(style);

  let allPostsCache = [];
  let activeCategory = "All";

  window.renderExplore = async function(container) {
    container.innerHTML = `
      <div class="explore-container">
        <div class="explore-top-bar">
          <div class="explore-search-box">
            <span style="color:#60a5fa; font-size:15px;">🔍</span>
            <input type="text" id="explore-search-input" placeholder="Search notes, educators, topics..." autocomplete="off" />
            <button id="explore-clear-search" style="display:none; background:none; border:none; color:#94a3b8; font-size:14px; cursor:pointer;">✕</button>
          </div>
          <button class="explore-saved-btn" id="explore-saved-btn" title="Saved Lessons">🔖</button>
        </div>

        <div class="explore-cats" id="explore-cats-bar">
          ${["All", "Mathematics", "Physics", "Chemistry", "Biology", "Programming", "General Studies", "English"]
            .map(cat => `<button class="explore-cat-pill ${cat === "All" ? "active" : ""}" data-cat="${cat}">${cat}</button>`)
            .join("")}
        </div>

        <div id="explore-users-box" class="explore-users-results" style="display:none;"></div>

        <div class="explore-grid" id="explore-grid">
          <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:#94a3b8;">Loading trending lessons...</div>
        </div>
      </div>
    `;

    container.querySelectorAll(".explore-cat-pill").forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll(".explore-cat-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.cat;
        renderGridFiltered();
      };
    });

    const searchInput = document.getElementById("explore-search-input");
    const clearBtn = document.getElementById("explore-clear-search");

    searchInput.oninput = async () => {
      const q = searchInput.value.trim();
      clearBtn.style.display = q ? "block" : "none";
      renderGridFiltered();
      searchUsersFromServer(q);
    };

    clearBtn.onclick = () => {
      searchInput.value = "";
      clearBtn.style.display = "none";
      document.getElementById("explore-users-box").style.display = "none";
      renderGridFiltered();
    };

    document.getElementById("explore-saved-btn").onclick = () => openSavedLessonsModal();

    await fetchExplorePosts();
  };

  function formatCount(num) {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return String(num);
  }

  async function fetchExplorePosts() {
    const grid = document.getElementById("explore-grid");
    try {
      const res = await window.api("/api/posts/feed");

      if (res && res.success && Array.isArray(res.posts)) {
        allPostsCache = res.posts;
        renderGridFiltered();
      } else {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:40px; color:#94a3b8;">No lessons found.</div>`;
      }
    } catch (err) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:40px; color:#ef4444;">Failed to load explore feed.</div>`;
    }
  }

  function renderGridFiltered() {
    const grid = document.getElementById("explore-grid");
    if (!grid) return;

    const query = (document.getElementById("explore-search-input")?.value || "").toLowerCase().trim();

    const filtered = allPostsCache.filter(post => {
      const caption = (post.caption || "").toLowerCase();
      const author = (post.user?.displayName || post.user?.username || "").toLowerCase();

      const matchesCat = activeCategory === "All" || caption.includes(`[${activeCategory.toLowerCase()}]`);
      const matchesQuery = !query || caption.includes(query) || author.includes(query);

      return matchesCat && matchesQuery;
    });

    if (!filtered.length) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:40px; color:#64748b;">No matching lessons or reels found.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(post => {
      const isVideo = post.mediaType === "video" || (post.mediaUrl && post.mediaUrl.match(/\.(mp4|webm|mov)$/i));
      const statCount = formatCount(post.viewsCount || post.likesCount || 0);
      let cleanText = (post.caption || "").replace(/^\[.*?\]\s*/, "");

      return `
        <div class="explore-tile" onclick="window.openFullscreenPostViewer('${post.id}')">
          ${post.mediaUrl ? (
            isVideo
              ? `<video src="${post.mediaUrl}" muted preload="metadata" playsinline></video>`
              : `<img src="${post.mediaUrl}" loading="lazy" />`
          ) : `
            <div class="explore-text-tile">${cleanText.slice(0, 75) || "Study Note"}</div>
          `}
          ${isVideo ? `<div class="explore-reel-icon">🎬</div>` : ""}
          <div class="explore-tile-overlay"></div>
          <div class="explore-tile-stats">
            <span>👁</span>
            <span>${statCount}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  async function searchUsersFromServer(query) {
    const usersBox = document.getElementById("explore-users-box");
    if (!usersBox) return;

    if (!query || query.length < 1) {
      usersBox.style.display = "none";
      return;
    }

    try {
      const res = await window.api(`/api/users?search=${encodeURIComponent(query)}`);
      if (res && res.success && res.users && res.users.length) {
        usersBox.style.display = "block";
        usersBox.innerHTML = `
          <div style="font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; text-transform:uppercase;">Educators & Students</div>
          ${res.users.map(u => `
            <div class="explore-user-row" onclick="window.openUserExploreProfile('${u.id}')">
              <img src="${window.avatarUrl ? window.avatarUrl(u) : (u.avatar || '')}" alt="${u.displayName}" />
              <div style="flex:1; min-width:0;">
                <div style="font-weight:700; font-size:14px; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${u.displayName}</div>
                <div style="font-size:12px; color:#94a3b8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">@${u.username}</div>
              </div>
            </div>
          `).join("")}
        `;
      } else {
        usersBox.style.display = "none";
      }
    } catch (_) {
      usersBox.style.display = "none";
    }
  }

  // Instagram-style Profile Page View with Direct Chat Integration
  window.openUserExploreProfile = async function(userId) {
    let existing = document.getElementById("explore-user-profile-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "explore-user-profile-modal";
    modal.style.cssText = `
      position: fixed; inset: 0; background: #090d16; z-index: 400;
      display: flex; flex-direction: column; color: #fff; font-family: inherit; overflow-y: auto;
    `;
    modal.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.08); background:#111827; position:sticky; top:0; z-index:10;">
        <div style="display:flex; align-items:center; gap:12px;">
          <button id="close-user-profile" style="background:none; border:none; color:#fff; font-size:22px; cursor:pointer;">←</button>
          <div style="font-weight:800; font-size:17px;" id="modal-username-title">Profile</div>
        </div>
        <div style="font-size:18px; cursor:pointer;">🔔</div>
      </div>
      <div id="profile-modal-body" style="flex:1; padding-bottom:50px;">
        <div style="text-align:center; padding:40px; color:#94a3b8;">Loading profile details...</div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("close-user-profile").onclick = () => modal.remove();

    try {
      const [profileRes, followStatusRes] = await Promise.all([
        window.api(`/api/users/${userId}/profile`),
        window.api(`/api/users/${userId}/follow-status`).catch(() => ({ success: false }))
      ]);

      const bodyContainer = document.getElementById("profile-modal-body");

      if (profileRes && profileRes.success && profileRes.profile) {
        const p = profileRes.profile;
        document.getElementById("modal-username-title").textContent = p.username || "Profile";

        const isFollowing = followStatusRes.success ? followStatusRes.following : false;
        const followersCount = followStatusRes.success ? (followStatusRes.followersCount || 0) : 0;
        const followingCount = followStatusRes.success ? (followStatusRes.followingCount || 0) : 0;

        const userPosts = allPostsCache.filter(post => post.user && post.user.id === userId);

        bodyContainer.innerHTML = `
          <div style="padding: 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
              <div style="width: 82px; height: 82px; border-radius: 50%; padding: 2px; background: linear-gradient(135deg, #6366f1, #ec4899); flex-shrink: 0;">
                <img src="${window.avatarUrl ? window.avatarUrl(p) : (p.avatar || '')}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; background: #000;" />
              </div>
              <div style="display: flex; flex: 1; justify-content: space-around; text-align: center;">
                <div>
                  <div style="font-weight: 800; font-size: 16px;">${userPosts.length}</div>
                  <div style="font-size: 12px; color: #94a3b8;">posts</div>
                </div>
                <div>
                  <div style="font-weight: 800; font-size: 16px;" id="profile-followers-count">${followersCount}</div>
                  <div style="font-size: 12px; color: #94a3b8;">followers</div>
                </div>
                <div>
                  <div style="font-weight: 800; font-size: 16px;">${followingCount}</div>
                  <div style="font-size: 12px; color: #94a3b8;">following</div>
                </div>
              </div>
            </div>

            <div style="margin-top: 12px;">
              <div style="font-weight: 800; font-size: 15px; color: #fff;">${p.displayName}</div>
              <div style="font-size: 13px; color: #cbd5e1; margin-top: 4px; white-space: pre-wrap; line-height: 1.4;">${p.bio || "Study enthusiast & learner on TELESUPAR."}</div>
              <div style="display: inline-flex; align-items: center; gap: 6px; background: #1e293b; padding: 4px 10px; border-radius: 99px; font-size: 12px; color: #60a5fa; margin-top: 8px;">
                <span>@${p.username}</span>
              </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button id="profile-follow-btn" style="flex: 1; background: ${isFollowing ? '#1e293b' : 'linear-gradient(135deg, #6366f1, #ec4899)'}; border: ${isFollowing ? '1px solid rgba(255,255,255,0.1)' : 'none'}; color: #fff; font-weight: 700; padding: 8px; border-radius: 8px; font-size: 13px; cursor: pointer;">
                ${isFollowing ? 'Following ✓' : 'Follow'}
              </button>
              <button id="profile-msg-btn" style="flex: 1; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #fff; font-weight: 700; padding: 8px; border-radius: 8px; font-size: 13px; cursor: pointer;">
                Message
              </button>
            </div>
          </div>

          <div style="display: flex; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); margin-top: 6px;">
            <div style="flex: 1; text-align: center; padding: 10px; border-bottom: 2px solid #fff; font-size: 16px; cursor: pointer;">⊞</div>
            <div style="flex: 1; text-align: center; padding: 10px; color: #94a3b8; font-size: 16px; cursor: pointer;">🎬</div>
            <div style="flex: 1; text-align: center; padding: 10px; color: #94a3b8; font-size: 16px; cursor: pointer;">👤</div>
          </div>

          <div class="explore-grid" style="margin-top: 2px;">
            ${userPosts.length ? userPosts.map(post => {
              const isVideo = post.mediaType === "video" || (post.mediaUrl && post.mediaUrl.match(/\.(mp4|webm|mov)$/i));
              const statCount = formatCount(post.viewsCount || post.likesCount || 0);
              let cleanText = (post.caption || "").replace(/^\[.*?\]\s*/, "");
              return `
                <div class="explore-tile" onclick="window.openFullscreenPostViewer('${post.id}')">
                  ${post.mediaUrl ? (
                    isVideo
                      ? `<video src="${post.mediaUrl}" muted preload="metadata" playsinline></video>`
                      : `<img src="${post.mediaUrl}" loading="lazy" />`
                  ) : `<div class="explore-text-tile">${cleanText.slice(0, 60) || "Study Note"}</div>`}
                  ${isVideo ? `<div class="explore-reel-icon">🎬</div>` : ""}
                  <div class="explore-tile-overlay"></div>
                  <div class="explore-tile-stats"><span>👁</span><span>${statCount}</span></div>
                </div>
              `;
            }).join('') : `<div style="grid-column: 1 / -1; text-align:center; padding:40px; color:#64748b;">No posts uploaded by this user yet.</div>`}
          </div>
        `;

        // Follow Button Handler
        const followBtn = document.getElementById("profile-follow-btn");
        let currentlyFollowing = isFollowing;
        followBtn.onclick = async () => {
          try {
            const method = currentlyFollowing ? "DELETE" : "POST";
            const res = await window.api(`/api/users/${userId}/follow`, { method });
            if (res && res.success) {
              currentlyFollowing = res.following;
              followBtn.textContent = currentlyFollowing ? "Following ✓" : "Follow";
              followBtn.style.background = currentlyFollowing ? "#1e293b" : "linear-gradient(135deg, #6366f1, #ec4899)";
              document.getElementById("profile-followers-count").textContent = res.followersCount;
            }
          } catch (e) {
            console.error("Follow action failed", e);
          }
        };

        // Message Button Handler (Directly opens chat window)
        document.getElementById("profile-msg-btn").onclick = async () => {
          try {
            const chatRes = await window.api(`/api/conversations/${userId}`, { method: "POST" });
            if (chatRes && chatRes.success && chatRes.conversation) {
              modal.remove(); // Remove profile modal
              
              if (window.openDirectChat) {
                window.openDirectChat(chatRes.conversation.id, p);
              } else {
                const chatTabBtn = document.querySelector('button[data-tab="chat"]') || 
                                   document.querySelector('.bottom-nav button:nth-child(3)');
                if (chatTabBtn) chatTabBtn.click();
              }
            } else {
              alert("Could not open chat with this user.");
            }
          } catch (err) {
            console.error("Open chat error:", err);
            alert("Failed to start conversation.");
          }
        };

      } else {
        bodyContainer.innerHTML = `<p style="text-align:center; color:#ef4444; padding:40px;">Could not load profile details.</p>`;
      }
    } catch (_) {
      document.getElementById("profile-modal-body").innerHTML = `<p style="text-align:center; color:#ef4444; padding:40px;">Failed to connect to server.</p>`;
    }
  };

  async function openSavedLessonsModal() {
    alert("Saved study posts feature coming up next!");
  }
})();
