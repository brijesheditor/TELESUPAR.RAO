
(function () {
  const style = document.createElement("style");

  style.textContent = `
    .explore-page {
      background: #0b0f12;
      min-height: 100vh;
      color: #fff;
      padding-bottom: 15px;
    }

    .explore-top {
      position: sticky;
      top: 0;
      z-index: 30;
      background: #0b0f12;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
    }

    .explore-search-box {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      background: #252a30;
      border-radius: 35px;
      padding: 0 15px;
      height: 50px;
    }

    .explore-search-box input {
      width: 100%;
      border: 0;
      outline: 0;
      background: transparent;
      color: white;
      font-size: 15px;
      min-width: 0;
    }

    .explore-search-box input::placeholder {
      color: #a5acb7;
    }

    .explore-search-icon {
      font-size: 21px;
      color: white;
    }

    .explore-bookmark {
      font-size: 26px;
      color: white;
      padding: 5px;
      flex-shrink: 0;
    }

    .explore-tabs {
      display: flex;
      gap: 9px;
      padding: 0 14px 12px;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .explore-tabs button {
      border: 0;
      border-radius: 22px;
      padding: 9px 19px;
      background: #20252c;
      color: #cbd5e1;
      font-weight: 700;
      white-space: nowrap;
    }

    .explore-tabs button.active {
      background: #fff;
      color: #111;
    }

    .explore-section-title {
      padding: 12px 15px 8px;
      font-size: 13px;
      font-weight: 700;
      color: #cbd5e1;
    }

    .explore-users {
      padding-bottom: 8px;
    }

    .explore-user {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 10px 15px;
      border-bottom: 1px solid rgba(255,255,255,.05);
    }

    .explore-user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      background: #252a30;
    }

    .explore-user-info {
      flex: 1;
      min-width: 0;
    }

    .explore-user-name {
      font-size: 14px;
      font-weight: 700;
    }

    .explore-user-handle {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 3px;
    }

    .explore-online {
      color: #22c55e;
      font-size: 11px;
    }

    .explore-user-actions {
      display: flex;
      gap: 7px;
    }

    .explore-action-btn {
      border: 0;
      border-radius: 9px;
      padding: 8px 11px;
      color: white;
      background: #303640;
      font-size: 12px;
      font-weight: 700;
    }

    .explore-action-btn.follow {
      background: #2878ed;
    }

    .explore-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 3px;
      padding: 2px;
    }

    .explore-grid-item {
      position: relative;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      background: #20252c;
      border: 0;
      padding: 0;
      cursor: pointer;
    }

    .explore-grid-item img,
    .explore-grid-item video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .explore-play {
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 17px;
      text-shadow: 0 1px 5px #000;
    }

    .explore-empty {
      grid-column: 1 / -1;
      padding: 40px 15px;
      text-align: center;
      color: #929aa6;
      font-size: 13px;
    }

    .explore-loading {
      text-align: center;
      padding: 35px;
      color: #9ca3af;
    }
  `;

  document.head.appendChild(style);

  let allPosts = [];
  let allUsers = [];
  let activeFilter = "all";
  let searchTimer = null;
  let currentQuery = "";

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[ch]);
  }

  function safeMediaURL(value) {
    try {
      const url = new URL(value, window.location.origin);
      return ["https:", "http:"].includes(url.protocol)
        ? escapeHTML(url.href)
        : "";
    } catch {
      return "";
    }
  }

  function getAvatar(user) {
    return safeMediaURL(window.avatarUrl(user));
  }

  window.renderExplore = async function (container) {
    container.innerHTML = `
      <div class="explore-page">

        <div class="explore-top">
          <div class="explore-search-box">
            <span class="explore-search-icon">⌕</span>
            <input
              id="explore-search"
              type="search"
              autocomplete="off"
              placeholder="Search videos, people or ID"
            />
            <button id="explore-clear"
              style="display:none;background:none;border:0;color:#fff;font-size:20px">
              ×
            </button>
          </div>
          <span class="explore-bookmark" title="Saved posts feature not yet available">
            ♧
          </span>
        </div>

        <div class="explore-tabs">
          <button class="active" data-filter="all">All</button>
          <button data-filter="videos">Videos</button>
          <button data-filter="people">People</button>
        </div>

        <div id="explore-results">
          <div class="explore-loading">Loading Explore...</div>
        </div>

      </div>
    `;

    const input = container.querySelector("#explore-search");
    const clearBtn = container.querySelector("#explore-clear");
    const results = container.querySelector("#explore-results");

    container.querySelectorAll("[data-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        activeFilter = btn.dataset.filter;

        container.querySelectorAll("[data-filter]").forEach(tab => {
          tab.classList.toggle("active", tab === btn);
        });

        renderResults();
      });
    });

    input.addEventListener("input", () => {
      currentQuery = input.value.trim();
      clearBtn.style.display = currentQuery ? "block" : "none";

      clearTimeout(searchTimer);

      searchTimer = setTimeout(async () => {
        await searchPeople(currentQuery);
        renderResults();
      }, 350);

      renderResults();
    });

    clearBtn.onclick = () => {
      input.value = "";
      currentQuery = "";
      clearBtn.style.display = "none";
      searchPeople("").then(renderResults);
    };

    results.addEventListener("click", async event => {
      const followBtn = event.target.closest("[data-follow]");
      const chatBtn = event.target.closest("[data-chat]");
      const postBtn = event.target.closest("[data-post]");

      if (followBtn) {
        const userId = followBtn.dataset.follow;
        followBtn.disabled = true;

        try {
          const following = followBtn.dataset.following === "true";

          const response = await window.api(
            `/api/users/${encodeURIComponent(userId)}/follow`,
            { method: following ? "DELETE" : "POST" }
          );

          if (!response.success) {
            alert(response.message || "Follow action failed");
            return;
          }

          followBtn.dataset.following = String(response.following);
          followBtn.textContent = response.following ? "Following" : "Follow";
          followBtn.classList.toggle("follow", !response.following);

        } catch (error) {
          alert("Network error. Please try again.");
        } finally {
          followBtn.disabled = false;
        }
      }

      if (chatBtn) {
        window.openDirectChat(chatBtn.dataset.chat);
      }

      if (postBtn) {
        const postId = postBtn.dataset.post;
        if (typeof window.openFullscreenPostViewer === "function") {
          window.openFullscreenPostViewer(postId);
        }
      }
    });

    try {
      const [postResponse] = await Promise.all([
        window.api("/api/posts/feed")
      ]);

      allPosts = postResponse.success
        ? (postResponse.posts || []).filter(post => post.mediaUrl)
        : [];

      await searchPeople("");

      renderResults();

    } catch (error) {
      results.innerHTML =
        `<div class="explore-empty">Could not load Explore. Please try again.</div>`;
    }
  };

  async function searchPeople(query) {
    try {
      const response = await window.api(
        `/api/users?search=${encodeURIComponent(query)}`
      );

      allUsers = response.success
        ? (response.users || [])
        : [];

    } catch (error) {
      allUsers = [];
    }
  }

  function matchingPosts() {
    let posts = [...allPosts];

    if (activeFilter === "videos") {
      posts = posts.filter(p => p.mediaType === "video");
    }

    if (currentQuery) {
      const q = currentQuery.toLowerCase();

      posts = posts.filter(post => {
        const author = post.user || {};

        return [
          post.caption,
          post.id,
          author.username,
          author.displayName,
          author.id
        ].some(value =>
          String(value || "").toLowerCase().includes(q)
        );
      });
    }

    return posts;
  }

  function renderUsers() {
    if (!allUsers.length) {
      return `<div class="explore-empty">No accounts found.</div>`;
    }

    return `
      <div class="explore-users">
        ${allUsers.slice(0, 12).map(user => {
          const id = escapeHTML(user.id);
          const name = escapeHTML(user.displayName || user.username);
          const username = escapeHTML(user.username);
          const avatar = getAvatar(user);

          return `
            <div class="explore-user">
              <img class="explore-user-avatar"
                src="${avatar}" alt=""
                onerror="this.style.opacity='.3'">

              <div class="explore-user-info">
                <div class="explore-user-name">${name}</div>
                <div class="explore-user-handle">@${username}</div>
                ${user.isOnline
                  ? `<div class="explore-online">● Active now</div>`
                  : ""}
              </div>

              <div class="explore-user-actions">
                <button class="explore-action-btn follow"
                  data-follow="${id}" data-following="false">
                  Follow
                </button>
                <button class="explore-action-btn" data-chat="${id}">
                  Chat
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderGrid(posts) {
    if (!posts.length) {
      return `<div class="explore-empty">No matching media found.</div>`;
    }

    return `
      <div class="explore-grid">
        ${posts.map(post => {
          const url = safeMediaURL(post.mediaUrl);
          if (!url) return "";

          const video = post.mediaType === "video";

          return `
            <button class="explore-grid-item"
              data-post="${escapeHTML(post.id)}"
              aria-label="Open post">

              ${video
                ? `<video src="${url}" muted playsinline preload="metadata"></video>
                   <span class="explore-play">▶</span>`
                : `<img src="${url}" loading="lazy" alt="">`
              }
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderResults() {
    const results = document.getElementById("explore-results");
    if (!results) return;

    const posts = matchingPosts();

    if (activeFilter === "people") {
      results.innerHTML = `
        <div class="explore-section-title">People</div>
        ${renderUsers()}
      `;
      return;
    }

    if (activeFilter === "videos") {
      results.innerHTML = `
        <div class="explore-section-title">Videos</div>
        ${renderGrid(posts)}
      `;
      return;
    }

    if (!currentQuery) {
      results.innerHTML = `
        ${renderGrid(posts)}
      `;
      return;
    }

    results.innerHTML = `
      <div class="explore-section-title">People</div>
      ${renderUsers()}

      <div class="explore-section-title">Videos and posts</div>
      ${renderGrid(posts)}
    `;
  }
})();
