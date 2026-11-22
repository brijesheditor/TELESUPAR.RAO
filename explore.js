
/* =========================================================
   TELESUPAR - EXPLORE V3
   Next-Generation User Discovery + Study Feed

   STRUCTURE:
   01. Configuration & State
   02. Styles
   03. Helper Functions
   04. Explore Renderer
   05. Feed API
   06. Post Filtering & Grid
   07. User Search
   08. Public Profile Modal
   09. Followers / Following
   10. Follow / Unfollow
   11. Direct Message
   12. Saved Lessons
========================================================= */

(function () {
  "use strict";

  /* =====================================================
     01. CONFIGURATION & STATE
  ===================================================== */

  if (window.__TS_EXPLORE_V3__) return;
  window.__TS_EXPLORE_V3__ = true;

  const CONFIG = {
    categories: [
      "All",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Programming",
      "General Studies",
      "English"
    ],

    searchMinLength: 1,
    defaultAvatar: ""
  };

  let allPostsCache = [];
  let activeCategory = "All";
  let searchRequestNumber = 0;
  let activeExploreContainer = null;

  /* =====================================================
     02. STYLES
  ===================================================== */

  const style = document.createElement("style");

  style.id = "ts-explore-v3-styles";

  style.textContent = `

    /* =========================================
       MAIN CONTAINER
    ========================================= */

    .explore-container {
      min-height: 100vh;
      padding-bottom: 75px;
      color: #fff;
      background: #090d16;
      font-family: inherit;
    }

    /* =========================================
       TOP BAR
    ========================================= */

    .explore-top-bar {
      position: sticky;
      top: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      background: rgba(9,13,22,.80);
      border-bottom: 1px solid rgba(255,255,255,.08);
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
    }

    .explore-search-box {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
      gap: 9px;
      padding: 11px 14px;
      border: 1px solid rgba(255,255,255,.11);
      border-radius: 16px;
      background: rgba(30,41,59,.55);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
      transition: .2s ease;
    }

    .explore-search-box:focus-within {
      border-color: rgba(99,102,241,.75);
      box-shadow: 0 0 0 3px rgba(99,102,241,.12);
    }

    .explore-search-icon {
      color: #818cf8;
      font-size: 16px;
    }

    .explore-search-box input {
      flex: 1;
      min-width: 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: #fff;
      font-size: 14px;
    }

    .explore-search-box input::placeholder {
      color: #94a3b8;
    }

    .explore-clear-btn {
      display: none;
      width: 25px;
      height: 25px;
      border: 0;
      border-radius: 50%;
      background: rgba(255,255,255,.08);
      color: #cbd5e1;
      cursor: pointer;
    }

    .explore-saved-btn {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 42px;
      height: 42px;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 14px;
      background: rgba(255,255,255,.07);
      color: #fff;
      font-size: 19px;
      cursor: pointer;
      transition: .2s ease;
    }

    .explore-saved-btn:active {
      transform: scale(.93);
      background: rgba(99,102,241,.2);
    }

    /* =========================================
       CATEGORY FILTERS
    ========================================= */

    .explore-cats {
      display: flex;
      gap: 9px;
      padding: 12px;
      overflow-x: auto;
      scrollbar-width: none;
      background: rgba(9,13,22,.95);
    }

    .explore-cats::-webkit-scrollbar {
      display: none;
    }

    .explore-cat-pill {
      flex-shrink: 0;
      padding: 8px 15px;
      border: 1px solid rgba(255,255,255,.09);
      border-radius: 99px;
      background: rgba(30,41,59,.65);
      color: #cbd5e1;
      font-size: 12px;
      font-weight: 650;
      white-space: nowrap;
      cursor: pointer;
      transition: .2s ease;
    }

    .explore-cat-pill.active {
      border-color: transparent;
      background: linear-gradient(120deg,#6366f1,#a855f7,#ec4899);
      color: #fff;
      box-shadow: 0 4px 16px rgba(99,102,241,.25);
    }

    .explore-cat-pill:active {
      transform: scale(.95);
    }

    /* =========================================
       POST GRID
    ========================================= */

    .explore-grid {
      display: grid;
      grid-template-columns: repeat(3,minmax(0,1fr));
      gap: 3px;
      background: #090d16;
    }

    .explore-tile {
      position: relative;
      aspect-ratio: 3/4;
      overflow: hidden;
      background: #111827;
      cursor: pointer;
      border-radius: 5px;
      transition: transform .2s ease;
    }

    .explore-tile:active {
      transform: scale(.97);
    }

    .explore-tile img,
    .explore-tile video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .explore-text-tile {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 10px;
      overflow: hidden;
      background: linear-gradient(145deg,#25205a,#111827,#172554);
      color: #e2e8f0;
      font-size: 11px;
      font-weight: 650;
      text-align: center;
    }

    .explore-tile-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(
        to top,
        rgba(0,0,0,.76),
        transparent 48%
      );
    }

    .explore-tile-stats {
      position: absolute;
      bottom: 7px;
      left: 7px;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 5px;
      color: #fff;
      font-size: 11px;
      font-weight: 750;
      text-shadow: 0 1px 4px #000;
    }

    .explore-reel-icon {
      position: absolute;
      top: 7px;
      right: 7px;
      z-index: 2;
      font-size: 14px;
    }

    /* =========================================
       SEARCH RESULTS
    ========================================= */

    .explore-users-results {
      margin: 9px 10px;
      padding: 12px;
      border: 1px solid rgba(255,255,255,.09);
      border-radius: 17px;
      background: rgba(17,24,39,.88);
      box-shadow: 0 12px 30px rgba(0,0,0,.2);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .explore-results-heading {
      margin-bottom: 9px;
      color: #94a3b8;
      font-size: 11px;
      font-weight: 750;
      letter-spacing: .7px;
      text-transform: uppercase;
    }

    .explore-user-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 5px 0;
      padding: 11px;
      border: 1px solid rgba(255,255,255,.055);
      border-radius: 13px;
      background: rgba(255,255,255,.035);
      cursor: pointer;
      transition: .2s ease;
    }

    .explore-user-row:active {
      transform: scale(.985);
      background: rgba(99,102,241,.13);
    }

    .explore-user-row img {
      width: 45px;
      height: 45px;
      flex-shrink: 0;
      border: 2px solid rgba(255,255,255,.12);
      border-radius: 50%;
      background: #1e293b;
      object-fit: cover;
    }

    .explore-user-info {
      flex: 1;
      min-width: 0;
    }

    .explore-user-name {
      overflow: hidden;
      color: #fff;
      font-size: 14px;
      font-weight: 750;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .explore-user-username {
      margin-top: 3px;
      overflow: hidden;
      color: #94a3b8;
      font-size: 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* =========================================
       EMPTY / LOADING STATES
    ========================================= */

    .explore-state {
      grid-column: 1/-1;
      padding: 45px 20px;
      color: #94a3b8;
      font-size: 13px;
      text-align: center;
    }

    .explore-state.error {
      color: #f87171;
    }

    /* =========================================
       PUBLIC PROFILE MODAL
    ========================================= */

    .explore-profile-modal {
      position: fixed;
      inset: 0;
      z-index: 400;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background: rgba(7,11,20,.98);
      color: #fff;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
    }

    .explore-modal-header {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 15px;
      border-bottom: 1px solid rgba(255,255,255,.09);
      background: rgba(17,24,39,.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .explore-modal-back {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-width: 82px;
      height: 39px;
      padding: 0 11px;
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 12px;
      background: rgba(255,255,255,.07);
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    .explore-modal-title {
      overflow: hidden;
      font-size: 16px;
      font-weight: 800;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .explore-profile-loading {
      padding: 45px 20px;
      color: #94a3b8;
      text-align: center;
    }

    /* =========================================
       PROFILE INFORMATION
    ========================================= */

    #profile-modal-body {
      flex: 1;
      padding-bottom: 45px;
    }

    .explore-profile-info-card {
      margin: 12px;
      padding: 17px;
      border: 1px solid rgba(255,255,255,.09);
      border-radius: 22px;
      background: linear-gradient(
        145deg,
        rgba(30,41,59,.68),
        rgba(15,23,42,.82)
      );
      box-shadow: 0 12px 32px rgba(0,0,0,.2);
    }

    .explore-profile-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 13px;
    }

    .explore-profile-avatar {
      width: 82px;
      height: 82px;
      flex-shrink: 0;
      padding: 2px;
      border-radius: 50%;
      background: linear-gradient(135deg,#6366f1,#ec4899);
    }

    .explore-profile-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #111827;
      object-fit: cover;
    }

    .explore-profile-stats {
      display: flex;
      flex: 1;
      justify-content: space-around;
      gap: 4px;
      text-align: center;
    }

    .explore-profile-stat {
      padding: 5px;
      border: 0;
      background: transparent;
      color: #fff;
      cursor: pointer;
    }

    .explore-profile-stat strong {
      display: block;
      font-size: 16px;
      font-weight: 800;
    }

    .explore-profile-stat span {
      color: #94a3b8;
      font-size: 11px;
    }

    .explore-profile-name {
      margin-top: 13px;
      color: #fff;
      font-size: 15px;
      font-weight: 800;
    }

    .explore-profile-bio {
      margin-top: 5px;
      color: #cbd5e1;
      font-size: 13px;
      line-height: 1.5;
      white-space: pre-wrap;
    }

    .explore-profile-username {
      display: inline-flex;
      margin-top: 9px;
      padding: 5px 11px;
      border-radius: 99px;
      background: rgba(99,102,241,.14);
      color: #a5b4fc;
      font-size: 12px;
    }

    /* =========================================
       PROFILE ACTION BUTTONS
    ========================================= */

    .explore-profile-actions {
      display: flex;
      gap: 9px;
      margin-top: 15px;
    }

    .explore-profile-action {
      flex: 1;
      min-height: 44px;
      padding: 10px 8px;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 13px;
      background: rgba(255,255,255,.07);
      color: #fff;
      font-size: 13px;
      font-weight: 750;
      cursor: pointer;
      transition: .18s ease;
    }

    .explore-profile-action.primary {
      border: 0;
      background: linear-gradient(120deg,#6366f1,#a855f7);
      box-shadow: 0 5px 18px rgba(99,102,241,.22);
    }

    .explore-profile-action:active {
      transform: scale(.96);
    }

    .explore-profile-action:disabled {
      opacity: .55;
      cursor: wait;
    }

    /* =========================================
       RESPONSIVE
    ========================================= */

    @media(max-width:360px) {
      .explore-top-bar {
        padding: 9px;
      }

      .explore-search-box {
        padding: 9px 11px;
      }

      .explore-profile-info-card {
        margin: 8px;
        padding: 13px;
      }

      .explore-profile-avatar {
        width: 70px;
        height: 70px;
      }

      .explore-profile-stat strong {
        font-size: 14px;
      }
    }

  `;

  if (!document.getElementById(style.id)) {
    document.head.appendChild(style);
  }

  /* =====================================================
     03. HELPER FUNCTIONS
  ===================================================== */

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function getUserId(user) {
    return String(
      user?.id ||
      user?._id ||
      ""
    );
  }

  function getPostId(post) {
    return String(
      post?.id ||
      post?._id ||
      ""
    );
  }

  function getPostUserId(post) {
    return String(
      post?.user?.id ||
      post?.user?._id ||
      post?.userId ||
      post?.authorId ||
      post?.author?._id ||
      post?.author?.id ||
      ""
    );
  }

  function getAvatar(user) {
    if (window.TSUser?.avatar) {
      return window.TSUser.avatar(user) || "";
    }

    if (window.avatarUrl) {
      return window.avatarUrl(user) || "";
    }

    return user?.avatar || user?.avatarUrl || CONFIG.defaultAvatar;
  }

  function formatCount(num) {
    const value = Number(num) || 0;

    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    }

    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    }

    return String(value);
  }

  function cacheUser(user) {
    if (!user) return null;

    if (window.TSUser?.save) {
      return window.TSUser.save(user) || user;
    }

    return user;
  }

  function getPostCaption(post) {
    return String(post?.caption || "");
  }

  function isVideoPost(post) {
    return (
      post?.mediaType === "video" ||
      (
        post?.mediaUrl &&
        /\.(mp4|webm|mov)(\?.*)?$/i.test(post.mediaUrl)
      )
    );
  }

  function getCleanCaption(post, maxLength = 75) {
    return getPostCaption(post)
      .replace(/^\[.*?\]\s*/, "")
      .slice(0, maxLength);
  }

  function getPostStat(post) {
    return formatCount(
      post?.viewsCount ||
      post?.likesCount ||
      0
    );
  }

  function getApiErrorMessage(error, fallback) {
    return error?.message || fallback;
  }

  function renderState(message, type = "") {
    return `
      <div class="explore-state ${type}">
        ${escapeHTML(message)}
      </div>
    `;
  }

  /* =====================================================
     04. EXPLORE MAIN RENDERER
  ===================================================== */

  window.renderExplore = async function (container) {
    if (!container) return;

    activeExploreContainer = container;
    activeCategory = "All";
    searchRequestNumber++;

    container.innerHTML = `
      <div class="explore-container">

        <div class="explore-top-bar">

          <div class="explore-search-box">
            <span class="explore-search-icon">⌕</span>

            <input
              type="text"
              id="explore-search-input"
              placeholder="Search people, notes, topics..."
              autocomplete="off"
            />

            <button
              class="explore-clear-btn"
              id="explore-clear-search"
              type="button"
              aria-label="Clear search"
            >✕</button>
          </div>

          <button
            class="explore-saved-btn"
            id="explore-saved-btn"
            type="button"
            title="Saved Lessons"
          >🔖</button>

        </div>

        <div class="explore-cats" id="explore-cats-bar">
          ${CONFIG.categories.map(category => `
            <button
              type="button"
              class="explore-cat-pill ${category === "All" ? "active" : ""}"
              data-cat="${escapeHTML(category)}"
            >
              ${escapeHTML(category)}
            </button>
          `).join("")}
        </div>

        <div
          id="explore-users-box"
          class="explore-users-results"
          style="display:none;"
        ></div>

        <div class="explore-grid" id="explore-grid">
          ${renderState("Loading Explore posts...")}
        </div>

      </div>
    `;

    const searchInput = container.querySelector(
      "#explore-search-input"
    );

    const clearBtn = container.querySelector(
      "#explore-clear-search"
    );

    const usersBox = container.querySelector(
      "#explore-users-box"
    );

    container.querySelectorAll(".explore-cat-pill").forEach(button => {
      button.onclick = () => {
        container.querySelectorAll(".explore-cat-pill")
          .forEach(item => item.classList.remove("active"));

        button.classList.add("active");

        activeCategory = button.dataset.cat || "All";

        renderGridFiltered();
      };
    });

    searchInput.oninput = () => {
      const query = searchInput.value.trim();

      clearBtn.style.display = query ? "block" : "none";

      renderGridFiltered();
      searchUsersFromServer(query, usersBox);
    };

    clearBtn.onclick = () => {
      searchInput.value = "";
      clearBtn.style.display = "none";

      searchRequestNumber++;
      usersBox.style.display = "none";
      usersBox.innerHTML = "";

      renderGridFiltered();
      searchInput.focus();
    };

    container.querySelector("#explore-saved-btn").onclick = () => {
      openSavedLessonsModal();
    };

    await fetchExplorePosts(container);
  };

  /* =====================================================
     05. FEED API
  ===================================================== */

  async function fetchExplorePosts(container) {
    const grid = container?.querySelector("#explore-grid");

    if (!grid) return;

    try {
      const response = window.TSUser?.getFeedPosts
        ? await window.TSUser.getFeedPosts()
        : await window.api("/api/posts/feed");

      if (activeExploreContainer !== container) return;

      if (
        response?.success &&
        Array.isArray(response.posts)
      ) {
        allPostsCache = response.posts.map(post => {
          if (post?.user) {
            return {
              ...post,
              user: cacheUser(post.user)
            };
          }

          return post;
        });

        renderGridFiltered();
        return;
      }

      allPostsCache = [];

      grid.innerHTML = renderState(
        "No posts found yet."
      );

    } catch (error) {
      console.error("Explore feed error:", error);

      if (activeExploreContainer !== container) return;

      grid.innerHTML = renderState(
        "Failed to load Explore posts. Please try again.",
        "error"
      );
    }
  }

  /* =====================================================
     06. POST FILTERING & GRID
  ===================================================== */

  function renderGridFiltered() {
    const container = activeExploreContainer;

    if (!container) return;

    const grid = container.querySelector("#explore-grid");

    if (!grid) return;

    const query = (
      container.querySelector("#explore-search-input")?.value || ""
    ).toLowerCase().trim();

    const filteredPosts = allPostsCache.filter(post => {
      const caption = getPostCaption(post).toLowerCase();

      const author = (
        post?.user?.displayName ||
        post?.user?.username ||
        ""
      ).toLowerCase();

      const matchesCategory =
        activeCategory === "All" ||
        caption.includes(`[${activeCategory.toLowerCase()}]`);

      const matchesSearch =
        !query ||
        caption.includes(query) ||
        author.includes(query);

      return matchesCategory && matchesSearch;
    });

    if (!filteredPosts.length) {
      grid.innerHTML = renderState(
        "No matching posts found."
      );
      return;
    }

    grid.innerHTML = filteredPosts.map(post => {
      const postId = getPostId(post);
      const video = isVideoPost(post);
      const caption = getCleanCaption(post, 75);

      return `
        <div
          class="explore-tile"
          data-open-post="${escapeHTML(postId)}"
        >

          ${
            post.mediaUrl
              ? (
                  video
                    ? `
                      <video
                        src="${escapeHTML(post.mediaUrl)}"
                        muted
                        preload="metadata"
                        playsinline
                      ></video>
                    `
                    : `
                      <img
                        src="${escapeHTML(post.mediaUrl)}"
                        loading="lazy"
                        alt="Explore post"
                      />
                    `
                )
              : `
                <div class="explore-text-tile">
                  ${escapeHTML(caption || "Study Note")}
                </div>
              `
          }

          ${video ? `
            <div class="explore-reel-icon">🎬</div>
          ` : ""}

          <div class="explore-tile-overlay"></div>

          <div class="explore-tile-stats">
            <span>👁</span>
            <span>${getPostStat(post)}</span>
          </div>

        </div>
      `;
    }).join("");

    grid.querySelectorAll("[data-open-post]").forEach(tile => {
      tile.onclick = () => {
        const postId = tile.dataset.openPost;

        if (
          postId &&
          typeof window.openFullscreenPostViewer === "function"
        ) {
          window.openFullscreenPostViewer(postId);
        }
      };
    });
  }

  /* =====================================================
     07. USER SEARCH
  ===================================================== */

  async function searchUsersFromServer(query, usersBox) {
    if (!usersBox) return;

    const requestNumber = ++searchRequestNumber;

    if (query.length < CONFIG.searchMinLength) {
      usersBox.style.display = "none";
      usersBox.innerHTML = "";
      return;
    }

    usersBox.style.display = "block";
    usersBox.innerHTML = `
      <div class="explore-results-heading">
        Searching people...
      </div>
    `;

    try {
      const response = window.TSUser?.searchUsers
        ? await window.TSUser.searchUsers(query)
        : await window.api(
            `/api/users?search=${encodeURIComponent(query)}`
          );

      if (requestNumber !== searchRequestNumber) return;

      if (
        !response?.success ||
        !Array.isArray(response.users) ||
        !response.users.length
      ) {
        usersBox.innerHTML = `
          <div class="explore-results-heading">
            People
          </div>
          <div style="
            padding:14px 5px;
            color:#94a3b8;
            font-size:13px;
            text-align:center;
          ">
            No users found.
          </div>
        `;
        return;
      }

      const users = response.users
        .map(cacheUser)
        .filter(user => getUserId(user));

      if (!users.length) {
        usersBox.style.display = "none";
        return;
      }

      usersBox.innerHTML = `
        <div class="explore-results-heading">
          People
        </div>

        ${users.map(user => `
          <div
            class="explore-user-row"
            data-explore-user="${escapeHTML(getUserId(user))}"
          >

            <img
              src="${escapeHTML(getAvatar(user))}"
              alt="User avatar"
              loading="lazy"
            />

            <div class="explore-user-info">
              <div class="explore-user-name">
                ${escapeHTML(user.displayName || user.username || "User")}
              </div>

              <div class="explore-user-username">
                @${escapeHTML(user.username || "user")}
              </div>
            </div>

            <span style="color:#818cf8;font-size:18px;">›</span>

          </div>
        `).join("")}
      `;

      usersBox.querySelectorAll("[data-explore-user]").forEach(row => {
        row.onclick = () => {
          window.openUserExploreProfile(
            row.dataset.exploreUser
          );
        };
      });

    } catch (error) {
      console.error("Explore user search error:", error);

      if (requestNumber === searchRequestNumber) {
        usersBox.innerHTML = `
          <div style="
            padding:12px;
            color:#f87171;
            font-size:13px;
            text-align:center;
          ">
            Could not search users.
          </div>
        `;
      }
    }
  }

  /* =====================================================
     08. PUBLIC PROFILE MODAL
  ===================================================== */

  window.openUserExploreProfile = async function (userId) {
    if (!userId) return;

    const encodedId = encodeURIComponent(userId);

    document.getElementById(
      "explore-user-profile-modal"
    )?.remove();

    const modal = document.createElement("div");

    modal.id = "explore-user-profile-modal";
    modal.className = "explore-profile-modal";

    modal.innerHTML = `
      <div class="explore-modal-header">

        <button
          type="button"
          id="close-user-profile"
          class="explore-modal-back"
        >
          ← Back
        </button>

        <div
          class="explore-modal-title"
          id="modal-username-title"
        >
          Profile
        </div>

      </div>

      <div id="profile-modal-body">
        <div class="explore-profile-loading">
          Loading profile details...
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#close-user-profile").onclick = () => {
      modal.remove();
    };

    try {
      const [profileResponse, followResponse] = await Promise.all([
        window.TSUser?.getUserProfile
          ? window.TSUser.getUserProfile(userId)
          : window.api(`/api/users/${encodedId}/profile`),

        window.TSUser?.getFollowStatus
          ? window.TSUser.getFollowStatus(userId, true)
          : window.api(`/api/users/${encodedId}/follow-status`)
              .catch(() => ({ success: false }))
      ]);

      if (!modal.isConnected) return;

      const body = modal.querySelector("#profile-modal-body");

      if (
        !profileResponse?.success ||
        !profileResponse.profile
      ) {
        body.innerHTML = `
          <div class="explore-state error">
            Could not load profile details.
          </div>
        `;
        return;
      }

      const profile = cacheUser(profileResponse.profile);

      modal.querySelector("#modal-username-title").textContent =
        profile.username || "Profile";

      const isFollowing = Boolean(
        followResponse?.success &&
        followResponse.following
      );

      const followersCount = Number(
        followResponse?.followersCount || 0
      );

      const followingCount = Number(
        followResponse?.followingCount || 0
      );

      const profilePosts = allPostsCache.filter(post => {
        return getPostUserId(post) === String(userId);
      });

      body.innerHTML = `
        <div class="explore-profile-info-card">

          <div class="explore-profile-top">

            <div class="explore-profile-avatar">
              <img
                src="${escapeHTML(getAvatar(profile))}"
                alt="Profile photo"
              />
            </div>

            <div class="explore-profile-stats">

              <div class="explore-profile-stat">
                <strong>${formatCount(profilePosts.length)}</strong>
                <span>Posts</span>
              </div>

              <button
                type="button"
                class="explore-profile-stat"
                id="profile-followers-btn"
              >
                <strong id="profile-followers-count">
                  ${formatCount(followersCount)}
                </strong>
                <span>Followers</span>
              </button>

              <button
                type="button"
                class="explore-profile-stat"
                id="profile-following-btn"
              >
                <strong>${formatCount(followingCount)}</strong>
                <span>Following</span>
              </button>

            </div>

          </div>

          <div class="explore-profile-name">
            ${escapeHTML(profile.displayName || profile.username || "User")}
          </div>

          <div class="explore-profile-bio">
            ${escapeHTML(profile.bio || "Study enthusiast on TELESUPAR.")}
          </div>

          <div class="explore-profile-username">
            @${escapeHTML(profile.username || "user")}
          </div>

          <div class="explore-profile-actions">

            <button
              type="button"
              id="profile-follow-btn"
              class="explore-profile-action ${isFollowing ? "" : "primary"}"
            >
              ${isFollowing ? "Following ✓" : "Follow"}
            </button>

            <button
              type="button"
              id="profile-msg-btn"
              class="explore-profile-action"
            >
              Message
            </button>

          </div>

        </div>

        <div class="explore-profile-post-tabs">
          <div style="
            padding:13px;
            border-bottom:2px solid #818cf8;
            color:#fff;
            text-align:center;
          ">
            ▦
          </div>
        </div>

        <div class="explore-grid" id="explore-profile-post-grid">

          ${
            profilePosts.length
              ? profilePosts.map(post => {
                  return createProfilePostHTML(post);
                }).join("")
              : `
                <div class="explore-state">
                  No posts uploaded by this user yet.
                </div>
              `
          }

        </div>
      `;

      setupProfileConnections(
        body,
        profile
      );

      setupFollowButton(
        body,
        userId,
        encodedId,
        isFollowing
      );

      setupMessageButton(
        body,
        userId,
        modal
      );

      setupProfilePostClicks(
        body,
        modal
      );

    } catch (error) {
      console.error("Explore profile error:", error);

      if (!modal.isConnected) return;

      const body = modal.querySelector("#profile-modal-body");

      if (body) {
        body.innerHTML = `
          <div class="explore-state error">
            Failed to connect to server.
          </div>
        `;
      }
    }
  };

  /* =====================================================
     PROFILE POST HTML
  ===================================================== */

  function createProfilePostHTML(post) {
    const video = isVideoPost(post);
    const caption = getCleanCaption(post, 60);

    return `
      <div
        class="explore-tile"
        data-profile-post="${escapeHTML(getPostId(post))}"
      >

        ${
          post.mediaUrl
            ? (
                video
                  ? `
                    <video
                      src="${escapeHTML(post.mediaUrl)}"
                      muted
                      preload="metadata"
                      playsinline
                    ></video>
                  `
                  : `
                    <img
                      src="${escapeHTML(post.mediaUrl)}"
                      loading="lazy"
                      alt="Post"
                    />
                  `
              )
            : `
              <div class="explore-text-tile">
                ${escapeHTML(caption || "Study Note")}
              </div>
            `
        }

        ${video ? `
          <div class="explore-reel-icon">🎬</div>
        ` : ""}

        <div class="explore-tile-overlay"></div>

        <div class="explore-tile-stats">
          <span>👁</span>
          <span>${getPostStat(post)}</span>
        </div>

      </div>
    `;
  }

  /* =====================================================
     09. FOLLOWERS / FOLLOWING
  ===================================================== */

  function setupProfileConnections(body, profile) {
    const followersButton = body.querySelector(
      "#profile-followers-btn"
    );

    const followingButton = body.querySelector(
      "#profile-following-btn"
    );

    if (followersButton) {
      followersButton.onclick = () => {
        if (
          typeof window.openFollowersFollowingPage !== "function"
        ) {
          alert("Connections page is not ready.");
          return;
        }

        document.getElementById(
          "explore-user-profile-modal"
        )?.remove();

        window.openFollowersFollowingPage(
          profile,
          "followers"
        );
      };
    }

    if (followingButton) {
      followingButton.onclick = () => {
        if (
          typeof window.openFollowersFollowingPage !== "function"
        ) {
          alert("Connections page is not ready.");
          return;
        }

        document.getElementById(
          "explore-user-profile-modal"
        )?.remove();

        window.openFollowersFollowingPage(
          profile,
          "following"
        );
      };
    }
  }

  /* =====================================================
     10. FOLLOW / UNFOLLOW
  ===================================================== */

  function setupFollowButton(
    body,
    userId,
    encodedId,
    initialFollowing
  ) {
    const button = body.querySelector(
      "#profile-follow-btn"
    );

    if (!button) return;

    let currentlyFollowing = initialFollowing;

    button.onclick = async () => {
      if (button.disabled) return;

      button.disabled = true;
      button.textContent = "Please wait...";

      try {
        const response = window.TSUser
          ? (
              currentlyFollowing
                ? await window.TSUser.unfollow(userId)
                : await window.TSUser.follow(userId)
            )
          : await window.api(
              `/api/users/${encodedId}/follow`,
              {
                method: currentlyFollowing ? "DELETE" : "POST"
              }
            );

        if (!response?.success) {
          throw new Error(
            response?.message || "Follow action failed."
          );
        }

        currentlyFollowing =
          typeof response.following === "boolean"
            ? response.following
            : !currentlyFollowing;

        button.textContent = currentlyFollowing
          ? "Following ✓"
          : "Follow";

        button.classList.toggle(
          "primary",
          !currentlyFollowing
        );

        const countElement = body.querySelector(
          "#profile-followers-count"
        );

        if (
          countElement &&
          typeof response.followersCount !== "undefined"
        ) {
          countElement.textContent = formatCount(
            response.followersCount
          );
        }

      } catch (error) {
        console.error("Follow action failed:", error);

        alert(
          getApiErrorMessage(
            error,
            "Could not update follow status."
          )
        );

        button.textContent = currentlyFollowing
          ? "Following ✓"
          : "Follow";

      } finally {
        button.disabled = false;
      }
    };
  }

  /* =====================================================
     11. DIRECT MESSAGE
  ===================================================== */

  function setupMessageButton(body, userId, modal) {
    const button = body.querySelector(
      "#profile-msg-btn"
    );

    if (!button) return;

    button.onclick = async () => {
      if (button.disabled) return;

      button.disabled = true;
      button.textContent = "Opening...";

      try {
        if (typeof window.openDirectChat !== "function") {
          throw new Error("Chat system is not ready.");
        }

        modal.remove();

        await window.openDirectChat(String(userId));

      } catch (error) {
        console.error("Open chat error:", error);

        button.disabled = false;
        button.textContent = "Message";

        alert(
          getApiErrorMessage(
            error,
            "Could not open chat."
          )
        );
      }
    };
  }

  /* =====================================================
     PROFILE POST CLICK
  ===================================================== */

  function setupProfilePostClicks(body, modal) {
    body.querySelectorAll("[data-profile-post]").forEach(tile => {
      tile.onclick = () => {
        const postId = tile.dataset.profilePost;

        if (
          !postId ||
          typeof window.openFullscreenPostViewer !== "function"
        ) {
          return;
        }

        modal.remove();

        window.openFullscreenPostViewer(postId);
      };
    });
  }

  /* =====================================================
     12. SAVED LESSONS
  ===================================================== */

  function openSavedLessonsModal() {
    alert(
      "Saved study posts feature coming up next!"
    );
  }

  /* =====================================================
     INITIALIZATION
  ===================================================== */

  console.log("TELESUPAR Explore V3 loaded successfully.");

})();
