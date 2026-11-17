(function() {
  const style = document.createElement("style");
  style.textContent = `
    .explore-container {
      background: #090d16;
      min-height: 100vh;
      color: #fff;
      font-family: inherit;
      padding-bottom: 70px;
    }

    /* Top Search Header */
    .explore-top-bar {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(9, 13, 22, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .explore-search-box {
      flex: 1;
      display: flex;
      align-items: center;
      background: #1e293b;
      border-radius: 99px;
      padding: 8px 14px;
      gap: 8px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .explore-search-box input {
      flex: 1;
      background: transparent;
      border: none;
      color: #fff;
      font-size: 14px;
      outline: none;
    }

    .explore-search-box input::placeholder {
      color: #94a3b8;
    }

    .explore-saved-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .explore-saved-btn:active {
      background: rgba(255, 255, 255, 0.1);
    }

    /* Subject Filter Pills */
    .explore-cats {
      display: flex;
      gap: 8px;
      padding: 8px 12px;
      overflow-x: auto;
      scrollbar-width: none;
      background: #090d16;
    }
    .explore-cats::-webkit-scrollbar {
      display: none;
    }
    .explore-cat-pill {
      background: #111827;
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 6px 14px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
    }
    .explore-cat-pill.active {
      background: linear-gradient(135deg, #6366f1, #ec4899);
      color: #fff;
      border-color: transparent;
    }

    /* 3-Column Grid */
    .explore-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
      background: #090d16;
    }

    .explore-tile {
      position: relative;
      aspect-ratio: 3 / 4;
      background: #111827;
      overflow: hidden;
      cursor: pointer;
    }

    .explore-tile img,
    .explore-tile video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .explore-text-tile {
      width: 100%;
      height: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: linear-gradient(135deg, #1e1b4b, #0f172a);
      font-size: 11px;
      color: #e2e8f0;
      font-weight: 600;
    }

    .explore-tile-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%);
      pointer-events: none;
    }

    .explore-tile-stats {
      position: absolute;
      bottom: 6px;
      left: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 700;
      color: #fff;
      text-shadow: 0 1px 4px rgba(0,0,0,0.8);
      z-index: 2;
    }

    .explore-reel-icon {
      position: absolute;
      top: 6px;
      right: 6px;
      font-size: 13px;
      color: #fff;
      filter: drop-shadow(0 1px 3px rgba(0,0,0,0.8));
      z-index: 2;
    }

    /* Search Users Section */
    .explore-users-results {
      padding: 10px 14px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .explore-user-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
      cursor: pointer;
    }
    .explore-user-row img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      object-fit: cover;
    }
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
          <button class="explore-saved-btn" id="explore-saved-btn" title="Saved Lessons">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
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

    // Category click handlers
    container.querySelectorAll(".explore-cat-pill").forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll(".explore-cat-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.cat;
        renderGridFiltered();
      };
    });

    // Search input handlers
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

    // Saved lessons modal
    document.getElementById("explore-saved-btn").onclick = () => openSavedLessonsModal();

    await fetchExplorePosts();
  };

  function formatCount(num) {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(num);
  }

  async function fetchExplorePosts() {
    const grid = document.getElementById("explore-grid");
    try {
      // Try /api/posts/explore first, fallback to /api/posts/feed
      let res = await window.api("/api/posts/explore");
      if (!res || !res.success) {
        res = await window.api("/api/posts/feed");
      }

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
            <span>${post.viewsCount ? "👁" : "♥"}</span>
            <span>${statCount}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  async function searchUsersFromServer(query) {
    const usersBox = document.getElementById("explore-users-box");
    if (!usersBox) return;

    if (!query || query.length < 2) {
      usersBox.style.display = "none";
      return;
    }

    try {
      const res = await window.api(`/api/users/search?q=${encodeURIComponent(query)}`);
      if (res && res.success && res.users && res.users.length) {
        usersBox.style.display = "block";
        usersBox.innerHTML = `
          <div style="font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; text-transform:uppercase;">Educators & Students</div>
          ${res.users.map(u => `
            <div class="explore-user-row" onclick="window.openUserProfile('${u.id}')">
              <img src="${window.avatarUrl(u)}" />
              <div>
                <div style="font-weight:700; font-size:14px; color:#fff;">${u.displayName}</div>
                <div style="font-size:12px; color:#94a3b8;">@${u.username}</div>
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

  async function openSavedLessonsModal() {
    const existing = document.getElementById("saved-lessons-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "saved-lessons-modal";
    modal.style.cssText = `
      position: fixed; inset: 0; background: #090d16; z-index: 320;
      display: flex; flex-direction: column; color: #fff; font-family: inherit;
    `;
    modal.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px; padding:14px 16px; border-bottom:1px solid rgba(255,255,255,0.08);">
        <button id="close-saved-modal" style="background:none; border:none; color:#fff; font-size:22px; cursor:pointer;">←</button>
        <div style="font-weight:800; font-size:17px;">Saved Study Material</div>
      </div>
      <div id="saved-grid-content" class="explore-grid" style="flex:1; overflow-y:auto;">
        <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:#94a3b8;">Loading saved posts...</div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("close-saved-modal").onclick = () => modal.remove();

    const container = document.getElementById("saved-grid-content");
    try {
      const res = await window.api("/api/posts/saved");
      if (res && res.success && res.posts && res.posts.length) {
        container.innerHTML = res.posts.map(post => {
          const isVideo = post.mediaType === "video";
          return `
            <div class="explore-tile" onclick="document.getElementById('saved-lessons-modal').remove(); window.openFullscreenPostViewer('${post.id}');">
              ${post.mediaUrl ? (
                isVideo
                  ? `<video src="${post.mediaUrl}" muted preload="metadata"></video>`
                  : `<img src="${post.mediaUrl}" />`
              ) : `<div class="explore-text-tile">${(post.caption || "").slice(0, 60)}</div>`}
              <div class="explore-tile-overlay"></div>
              <div class="explore-tile-stats">♥ ${formatCount(post.likesCount || 0)}</div>
            </div>
          `;
        }).join("");
      } else {
        container.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:50px; color:#64748b;">No saved study lessons yet.</div>`;
      }
    } catch (_) {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:50px; color:#64748b;">No saved study lessons yet.</div>`;
    }
  }
})();
