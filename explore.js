(function() {
  const style = document.createElement("style");
  style.textContent = `
    .explore-search-wrap { padding: 14px; position: sticky; top: 66px; background: #090d16; z-index: 20; }
    .explore-search-input {
      width: 100%; background: #1e293b; border: 1px solid rgba(255,255,255,0.1);
      padding: 12px 16px; border-radius: 16px; color: #fff; font-size: 14px; outline: none;
    }
    .user-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .user-row-left { display: flex; align-items: center; gap: 12px; }
    .user-row-left img { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; }
    .online-dot {
      width: 10px; height: 10px; background: #10b981; border-radius: 50%;
      display: inline-block; margin-left: 5px;
    }
    .follow-btn {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6); border: none; color: #fff;
      padding: 7px 16px; border-radius: 99px; font-size: 12px; font-weight: 700; cursor: pointer;
    }
    .follow-btn.following { background: #1e293b; border: 1px solid rgba(255,255,255,0.15); color: #cbd5e1; }
    .explore-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; padding: 4px;
    }
    .explore-grid-item { aspect-ratio: 1/1; background: #111827; overflow: hidden; position: relative; }
    .explore-grid-item img, .explore-grid-item video { width: 100%; height: 100%; object-fit: cover; }
  `;
  document.head.appendChild(style);

  window.renderExplore = async function(container) {
    container.innerHTML = `
      <div class="explore-search-wrap">
        <input type="text" id="explore-search" class="explore-search-input" placeholder="Search people by name or @username..." />
      </div>
      <div style="padding:0 16px 8px; font-size:12px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Discover People</div>
      <div id="explore-users-list"></div>

      <div style="padding:18px 16px 8px; font-size:12px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Explore Media</div>
      <div class="explore-grid" id="explore-media-grid"></div>
    `;

    const searchInput = document.getElementById("explore-search");
    let timer;
    searchInput.oninput = () => {
      clearTimeout(timer);
      timer = setTimeout(() => searchUsers(searchInput.value.trim()), 300);
    };

    searchUsers("");
    loadExploreMedia();
  };

  async function searchUsers(query) {
    const listEl = document.getElementById("explore-users-list");
    if (!listEl) return;
    const data = await window.api(`/api/users?search=${encodeURIComponent(query)}`);
    if (!data.success) return;

    listEl.innerHTML = data.users.slice(0, 8).map(u => `
      <div class="user-row">
        <div class="user-row-left">
          <img src="${window.avatarUrl(u)}" />
          <div>
            <div style="font-weight:700; font-size:14px;">
              ${u.displayName} ${u.isOnline ? '<span class="online-dot"></span>' : ""}
            </div>
            <div style="font-size:12px; color:#94a3b8;">@${u.username}</div>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="follow-btn" id="fbtn-${u.id}" onclick="window.toggleFollowUser('${u.id}')">Follow</button>
          <button class="follow-btn following" onclick="window.openDirectChat('${u.id}')">Chat</button>
        </div>
      </div>
    `).join("");

    // Check follow status for listed users
    data.users.slice(0, 8).forEach(async (u) => {
      const st = await window.api(`/api/users/${u.id}/follow-status`);
      const btn = document.getElementById(`fbtn-${u.id}`);
      if (st.success && btn && st.following) {
        btn.textContent = "Following";
        btn.classList.add("following");
      }
    });
  }

  window.toggleFollowUser = async function(userId) {
    const btn = document.getElementById(`fbtn-${userId}`);
    const isFollowing = btn.classList.contains("following");
    const res = await window.api(`/api/users/${userId}/follow`, {
      method: isFollowing ? "DELETE" : "POST"
    });
    if (res.success) {
      btn.classList.toggle("following", res.following);
      btn.textContent = res.following ? "Following" : "Follow";
    }
  };

  async function loadExploreMedia() {
    const grid = document.getElementById("explore-media-grid");
    if (!grid) return;
    const data = await window.api("/api/posts/feed");
    if (!data.success) return;
    const mediaPosts = data.posts.filter(p => p.mediaUrl);
    grid.innerHTML = mediaPosts.map(p => `
      <div class="explore-grid-item">
        ${p.mediaType === "video"
          ? `<video src="${p.mediaUrl}" muted></video>`
          : `<img src="${p.mediaUrl}" />`}
      </div>
    `).join("");
  }
})();
