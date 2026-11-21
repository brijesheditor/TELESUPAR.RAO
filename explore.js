
(function () {
  "use strict";

  if (window.__TS_EXPLORE_V2__) return;
  window.__TS_EXPLORE_V2__ = true;

  /* =====================================================
     TELESUPAR EXPLORE V2
     Shared user data: TSUser
     Existing features preserved
  ===================================================== */

  const style = document.createElement("style");

  style.textContent = `
    .explore-container {
      background:#090d16;
      min-height:100vh;
      color:#fff;
      font-family:inherit;
      padding-bottom:70px;
    }

    .explore-top-bar {
      position:sticky;
      top:0;
      z-index:50;
      background:rgba(9,13,22,.92);
      backdrop-filter:blur(12px);
      padding:10px 12px;
      display:flex;
      align-items:center;
      gap:10px;
      border-bottom:1px solid rgba(255,255,255,.06);
    }

    .explore-search-box {
      flex:1;
      display:flex;
      align-items:center;
      background:#1e293b;
      border-radius:99px;
      padding:8px 14px;
      gap:8px;
      border:1px solid rgba(255,255,255,.08);
    }

    .explore-search-box input {
      flex:1;
      min-width:0;
      background:transparent;
      border:none;
      color:#fff;
      font-size:14px;
      outline:none;
    }

    .explore-search-box input::placeholder {
      color:#94a3b8;
    }

    .explore-saved-btn {
      background:none;
      border:none;
      color:#fff;
      font-size:20px;
      cursor:pointer;
      width:36px;
      height:36px;
      display:grid;
      place-items:center;
      border-radius:50%;
    }

    .explore-cats {
      display:flex;
      gap:8px;
      padding:8px 12px;
      overflow-x:auto;
      scrollbar-width:none;
      background:#090d16;
    }

    .explore-cats::-webkit-scrollbar {
      display:none;
    }

    .explore-cat-pill {
      background:#111827;
      color:#cbd5e1;
      border:1px solid rgba(255,255,255,.08);
      padding:6px 14px;
      border-radius:99px;
      font-size:12px;
      font-weight:600;
      white-space:nowrap;
      cursor:pointer;
    }

    .explore-cat-pill.active {
      background:linear-gradient(135deg,#6366f1,#ec4899);
      color:#fff;
      border-color:transparent;
    }

    .explore-grid {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:2px;
      background:#090d16;
    }

    .explore-tile {
      position:relative;
      aspect-ratio:3/4;
      background:#111827;
      overflow:hidden;
      cursor:pointer;
    }

    .explore-tile img,
    .explore-tile video {
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }

    .explore-text-tile {
      width:100%;
      height:100%;
      padding:10px;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      text-align:center;
      background:linear-gradient(135deg,#1e1b4b,#0f172a);
      font-size:11px;
      color:#e2e8f0;
      font-weight:600;
      overflow:hidden;
    }

    .explore-tile-overlay {
      position:absolute;
      inset:0;
      background:linear-gradient(
        to top,
        rgba(0,0,0,.75) 0%,
        transparent 45%
      );
      pointer-events:none;
    }

    .explore-tile-stats {
      position:absolute;
      bottom:6px;
      left:6px;
      display:flex;
      align-items:center;
      gap:4px;
      font-size:11px;
      font-weight:700;
      color:#fff;
      text-shadow:0 1px 4px rgba(0,0,0,.8);
      z-index:2;
    }

    .explore-reel-icon {
      position:absolute;
      top:6px;
      right:6px;
      font-size:13px;
      color:#fff;
      z-index:2;
    }

    .explore-users-results {
      padding:8px 12px;
      background:#111827;
      border-bottom:1px solid rgba(255,255,255,.08);
    }

    .explore-user-row {
      display:flex;
      align-items:center;
      gap:12px;
      padding:10px 8px;
      cursor:pointer;
      border-radius:8px;
      transition:background .2s;
    }

    .explore-user-row:hover {
      background:rgba(255,255,255,.05);
    }

    .explore-user-row img {
      width:44px;
      height:44px;
      border-radius:50%;
      object-fit:cover;
      flex-shrink:0;
      background:#1e293b;
    }

    .explore-profile-modal {
      position:fixed;
      inset:0;
      background:#090d16;
      z-index:400;
      display:flex;
      flex-direction:column;
      color:#fff;
      font-family:inherit;
      overflow-y:auto;
    }

    .explore-modal-header {
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:12px 16px;
      border-bottom:1px solid rgba(255,255,255,.08);
      background:#111827;
      position:sticky;
      top:0;
      z-index:10;
    }

    .explore-modal-header-left {
      display:flex;
      align-items:center;
      gap:12px;
    }

    .explore-modal-back {
      background:none;
      border:none;
      color:#fff;
      font-size:22px;
      cursor:pointer;
    }

    .explore-profile-action {
      flex:1;
      background:#1e293b;
      border:1px solid rgba(255,255,255,.1);
      color:#fff;
      font-weight:700;
      padding:10px 8px;
      border-radius:10px;
      font-size:13px;
      cursor:pointer;
    }

    .explore-profile-action.primary {
      background:linear-gradient(135deg,#6366f1,#ec4899);
      border:0;
    }

    .explore-profile-action:disabled {
      opacity:.55;
      cursor:wait;
    }

    .explore-profile-post-tabs {
      display:flex;
      border-top:1px solid rgba(255,255,255,.08);
      border-bottom:1px solid rgba(255,255,255,.08);
      margin-top:6px;
    }

    .explore-profile-post-tabs div {
      flex:1;
      text-align:center;
      padding:10px;
      font-size:16px;
    }

    .explore-profile-loading {
      text-align:center;
      padding:40px;
      color:#94a3b8;
    }

    @media(max-width:360px) {
      .explore-grid {
        grid-template-columns:repeat(3,minmax(0,1fr));
      }
    }

/* TELESUPAR Explore Glass UI */
.explore-top-bar {
  background: rgba(9, 13, 22, 0.78) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.10);
}

.explore-search-box {
  background: rgba(30, 41, 59, 0.58) !important;
  border: 1px solid rgba(255,255,255,0.13);
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.explore-saved-btn {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.10);
}

.explore-cat-pill {
  background: rgba(30,41,59,0.65);
  backdrop-filter: blur(10px);
}

.explore-user-row {
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.06);
  margin: 5px 0;
  border-radius: 14px;
}

.explore-users-results {
  background: rgba(17,24,39,0.88);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.explore-tile {
  transition: transform .18s ease, filter .18s ease;
}

.explore-tile:active {
  transform: scale(.97);
  filter: brightness(.85);
}

#explore-user-profile-modal {
  background: rgba(9,13,22,.97) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

#explore-user-profile-modal button {
  transition: transform .18s ease, opacity .18s ease;
}

#explore-user-profile-modal button:active {
  transform: scale(.96);
  opacity: .85;
}

#profile-follow-btn,
#profile-msg-btn {
  min-height: 42px;
  border-radius: 12px !important;
  box-shadow: 0 5px 18px rgba(0,0,0,.20);
}
    
  `;

  document.head.appendChild(style);

  let allPostsCache = [];
  let activeCategory = "All";
  let searchRequestNumber = 0;

  /* =====================================================
     HELPERS
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
    return String(user?.id || user?._id || "");
  }

  function getPostId(post) {
    return String(post?.id || post?._id || "");
  }

  function getPostUserId(post) {
    return String(post?.user?.id || post?.user?._id || post?.userId || "");
  }

  function getAvatar(user) {
    if (window.TSUser?.avatar) {
      return window.TSUser.avatar(user);
    }

    if (window.avatarUrl) {
      return window.avatarUrl(user);
    }

    return user?.avatar || "";
  }

  function formatCount(num) {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return String(num);
  }

  function cacheUser(user) {
    if (!user) return null;

    if (window.TSUser) {
      return window.TSUser.save(user);
    }

    return user;
  }

  /* =====================================================
     MAIN EXPLORE RENDER
  ===================================================== */

  window.renderExplore = async function (container) {
    if (!container) return;

    container.innerHTML = `
      <div class="explore-container">

        <div class="explore-top-bar">

          <div class="explore-search-box">
            <span style="color:#60a5fa;font-size:15px;">🔍</span>

            <input
              type="text"
              id="explore-search-input"
              placeholder="Search notes, educators, topics..."
              autocomplete="off"
            />

            <button
              id="explore-clear-search"
              style="
                display:none;
                background:none;
                border:none;
                color:#94a3b8;
                font-size:14px;
                cursor:pointer;
              "
            >✕</button>
          </div>

          <button
            class="explore-saved-btn"
            id="explore-saved-btn"
            title="Saved Lessons"
          >🔖</button>

        </div>

        <div class="explore-cats" id="explore-cats-bar">
          ${[
            "All",
            "Mathematics",
            "Physics",
            "Chemistry",
            "Biology",
            "Programming",
            "General Studies",
            "English"
          ].map(cat => `
            <button
              class="explore-cat-pill ${cat === "All" ? "active" : ""}"
              data-cat="${escapeHTML(cat)}"
            >${escapeHTML(cat)}</button>
          `).join("")}
        </div>

        <div
          id="explore-users-box"
          class="explore-users-results"
          style="display:none;"
        ></div>

        <div class="explore-grid" id="explore-grid">
          <div style="
            grid-column:1/-1;
            text-align:center;
            padding:40px;
            color:#94a3b8;
          ">
            Loading trending lessons...
          </div>
        </div>

      </div>
    `;

    const searchInput = container.querySelector("#explore-search-input");
    const clearBtn = container.querySelector("#explore-clear-search");

    container.querySelectorAll(".explore-cat-pill").forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll(".explore-cat-pill")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
        activeCategory = btn.dataset.cat;

        renderGridFiltered();
      };
    });

    searchInput.oninput = () => {
      const query = searchInput.value.trim();

      clearBtn.style.display = query ? "block" : "none";

      renderGridFiltered();
      searchUsersFromServer(query);
    };

    clearBtn.onclick = () => {
      searchInput.value = "";
      clearBtn.style.display = "none";

      const usersBox = container.querySelector("#explore-users-box");
      usersBox.style.display = "none";

      renderGridFiltered();
      searchInput.focus();
    };

    container.querySelector("#explore-saved-btn").onclick =
      () => openSavedLessonsModal();

    await fetchExplorePosts();
  };

  /* =====================================================
     FETCH EXPLORE POSTS
  ===================================================== */

  async function fetchExplorePosts() {
    const grid = document.getElementById("explore-grid");
    if (!grid) return;

    try {
      const res = window.TSUser
        ? await window.TSUser.getFeedPosts()
        : await window.api("/api/posts/feed");

      if (res && res.success && Array.isArray(res.posts)) {
        allPostsCache = res.posts;

        // Save post authors in shared user cache
        if (window.TSUser) {
          allPostsCache.forEach(post => {
            if (post.user) {
              post.user = cacheUser(post.user);
            }
          });
        }

        renderGridFiltered();
      } else {
        grid.innerHTML = `
          <div style="
            grid-column:1/-1;
            text-align:center;
            padding:40px;
            color:#94a3b8;
          ">
            No lessons found.
          </div>
        `;
      }

    } catch (err) {
      console.error("Explore feed error:", err);

      grid.innerHTML = `
        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
          color:#ef4444;
        ">
          Failed to load explore feed.
        </div>
      `;
    }
  }

  /* =====================================================
     FILTER AND RENDER POSTS
  ===================================================== */

  function renderGridFiltered() {
    const grid = document.getElementById("explore-grid");
    if (!grid) return;

    const query = (
      document.getElementById("explore-search-input")?.value || ""
    ).toLowerCase().trim();

    const filtered = allPostsCache.filter(post => {
      const caption = (post.caption || "").toLowerCase();

      const author = (
        post.user?.displayName ||
        post.user?.username ||
        ""
      ).toLowerCase();

      const matchesCategory =
        activeCategory === "All" ||
        caption.includes(`[${activeCategory.toLowerCase()}]`);

      const matchesQuery =
        !query ||
        caption.includes(query) ||
        author.includes(query);

      return matchesCategory && matchesQuery;
    });

    if (!filtered.length) {
      grid.innerHTML = `
        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
          color:#64748b;
        ">
          No matching lessons or reels found.
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(post => {
      const postId = getPostId(post);

      const isVideo =
        post.mediaType === "video" ||
        (post.mediaUrl && /\.(mp4|webm|mov)$/i.test(post.mediaUrl));

      const statCount = formatCount(
        post.viewsCount || post.likesCount || 0
      );

      const cleanText = (post.caption || "")
        .replace(/^\[.*?\]\s*/, "");

      return `
        <div
          class="explore-tile"
          data-open-post="${escapeHTML(postId)}"
        >
          ${
            post.mediaUrl
              ? (
                  isVideo
                    ? `<video
                         src="${escapeHTML(post.mediaUrl)}"
                         muted
                         preload="metadata"
                         playsinline
                       ></video>`
                    : `<img
                         src="${escapeHTML(post.mediaUrl)}"
                         loading="lazy"
                         alt="Explore post"
                       />`
                )
              : `
                <div class="explore-text-tile">
                  ${escapeHTML(cleanText.slice(0, 75) || "Study Note")}
                </div>
              `
          }

          ${isVideo ? `<div class="explore-reel-icon">🎬</div>` : ""}

          <div class="explore-tile-overlay"></div>

          <div class="explore-tile-stats">
            <span>👁</span>
            <span>${statCount}</span>
          </div>
        </div>
      `;
    }).join("");

    grid.querySelectorAll("[data-open-post]").forEach(tile => {
      tile.onclick = () => {
        if (typeof window.openFullscreenPostViewer === "function") {
          window.openFullscreenPostViewer(tile.dataset.openPost);
        }
      };
    });
  }

  /* =====================================================
     USER SEARCH
  ===================================================== */

  async function searchUsersFromServer(query) {
    const usersBox = document.getElementById("explore-users-box");
    if (!usersBox) return;

    const requestNumber = ++searchRequestNumber;

    if (!query || query.length < 1) {
      usersBox.style.display = "none";
      return;
    }

    try {
      const res = window.TSUser
        ? await window.TSUser.searchUsers(query)
        : await window.api(
            `/api/users?search=${encodeURIComponent(query)}`
          );

      // Ignore older search results
      if (requestNumber !== searchRequestNumber) return;

      if (res && res.success && res.users && res.users.length) {
        const users = res.users
          .map(cacheUser)
          .filter(Boolean);

        usersBox.style.display = "block";

        usersBox.innerHTML = `
          <div style="
            font-size:11px;
            font-weight:700;
            color:#94a3b8;
            margin-bottom:6px;
            text-transform:uppercase;
          ">
            Educators & Students
          </div>

          ${users.map(user => `
            <div
              class="explore-user-row"
              data-explore-user="${escapeHTML(getUserId(user))}"
            >
              <img
                src="${escapeHTML(getAvatar(user))}"
                alt="${escapeHTML(user.displayName || user.username)}"
              />

              <div style="flex:1;min-width:0;">
                <div style="
                  font-weight:700;
                  font-size:14px;
                  color:#fff;
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow:ellipsis;
                ">
                  ${escapeHTML(user.displayName || user.username)}
                </div>

                <div style="
                  font-size:12px;
                  color:#94a3b8;
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow:ellipsis;
                ">
                  @${escapeHTML(user.username)}
                </div>
              </div>
            </div>
          `).join("")}
        `;

        usersBox.querySelectorAll("[data-explore-user]").forEach(row => {
          row.onclick = () => {
            window.openUserExploreProfile(row.dataset.exploreUser);
          };
        });

      } else {
        usersBox.style.display = "none";
      }

    } catch (error) {
      console.error("Explore user search error:", error);

      if (requestNumber === searchRequestNumber) {
        usersBox.style.display = "none";
      }
    }
  }

  /* =====================================================
     PUBLIC USER PROFILE MODAL
  ===================================================== */

  window.openUserExploreProfile = async function (userId) {
    if (!userId) return;

    const existing = document.getElementById(
      "explore-user-profile-modal"
    );

    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "explore-user-profile-modal";
    modal.className = "explore-profile-modal";

    modal.innerHTML = `
      <div class="explore-modal-header">

        <div class="explore-modal-header-left">
          <button
            id="close-user-profile"
            class="explore-modal-back"
          >←</button>

          <div
            style="font-weight:800;font-size:17px;"
            id="modal-username-title"
          >
            Profile
          </div>
        </div>

        <div style="font-size:18px;">🔔</div>

      </div>

      <div
        id="profile-modal-body"
        style="flex:1;padding-bottom:50px;"
      >
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
      const encodedId = encodeURIComponent(userId);

      const [profileRes, followStatusRes] = await Promise.all([
        window.TSUser
          ? window.TSUser.getUserProfile(userId)
          : window.api(`/api/users/${encodedId}/profile`),

        window.TSUser
          ? window.TSUser.getFollowStatus(userId, true)
          : window.api(`/api/users/${encodedId}/follow-status`)
              .catch(() => ({ success: false }))
      ]);

      if (!modal.isConnected) return;

      const bodyContainer = modal.querySelector("#profile-modal-body");

      if (
        !profileRes ||
        !profileRes.success ||
        !profileRes.profile
      ) {
        bodyContainer.innerHTML = `
          <p style="
            text-align:center;
            color:#ef4444;
            padding:40px;
          ">
            Could not load profile details.
          </p>
        `;
        return;
      }

      const p = cacheUser(profileRes.profile);

      modal.querySelector("#modal-username-title").textContent =
        p.username || "Profile";

      const isFollowing = Boolean(
        followStatusRes?.success && followStatusRes.following
      );

      const followersCount =
        followStatusRes?.success
          ? (followStatusRes.followersCount || 0)
          : 0;

      const followingCount =
        followStatusRes?.success
          ? (followStatusRes.followingCount || 0)
          : 0;

      // Posts currently available in Explore feed cache
      const userPosts = allPostsCache.filter(post =>
  String(post.user?.id || post.userId || "") === String(userId)
);

      bodyContainer.innerHTML = `
        <div style="padding:16px;">

          <div style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:16px;
          ">

            <div style="
              width:82px;
              height:82px;
              border-radius:50%;
              padding:2px;
              background:linear-gradient(135deg,#6366f1,#ec4899);
              flex-shrink:0;
            ">
              <img
                src="${escapeHTML(getAvatar(p))}"
                alt="Profile photo"
                style="
                  width:100%;
                  height:100%;
                  border-radius:50%;
                  object-fit:cover;
                  background:#000;
                "
              />
            </div>

            <div style="
              display:flex;
              flex:1;
              justify-content:space-around;
              text-align:center;
            ">

              <div>
                <div style="font-weight:800;font-size:16px;">
                  ${userPosts.length}
                </div>
                <div style="font-size:12px;color:#94a3b8;">
                  posts
                </div>
              </div>

              <div>
                <div
                  style="font-weight:800;font-size:16px;"
                  id="profile-followers-count"
                >
                  ${followersCount}
                </div>
                <div style="font-size:12px;color:#94a3b8;">
                  followers
                </div>
              </div>

              <div>
                <div style="font-weight:800;font-size:16px;">
                  ${followingCount}
                </div>
                <div style="font-size:12px;color:#94a3b8;">
                  following
                </div>
              </div>

            </div>
          </div>

          <div style="margin-top:12px;">

            <div style="font-weight:800;font-size:15px;color:#fff;">
              ${escapeHTML(p.displayName || p.username)}
            </div>

            <div style="
              font-size:13px;
              color:#cbd5e1;
              margin-top:4px;
              white-space:pre-wrap;
              line-height:1.4;
            ">
              ${escapeHTML(p.bio || "Study enthusiast & learner on TELESUPAR.")}
            </div>

            <div style="
              display:inline-flex;
              align-items:center;
              gap:6px;
              background:#1e293b;
              padding:4px 10px;
              border-radius:99px;
              font-size:12px;
              color:#60a5fa;
              margin-top:8px;
            ">
              @${escapeHTML(p.username)}
            </div>

          </div>

          <div style="display:flex;gap:8px;margin-top:14px;">

            <button
              id="profile-follow-btn"
              class="explore-profile-action ${isFollowing ? "" : "primary"}"
            >
              ${isFollowing ? "Following ✓" : "Follow"}
            </button>

            <button
              id="profile-msg-btn"
              class="explore-profile-action"
            >
              Message
            </button>

          </div>

        </div>

        <div class="explore-profile-post-tabs">
          <div style="border-bottom:2px solid #fff;">⊞</div>
          <div style="color:#94a3b8;">🎬</div>
          <div style="color:#94a3b8;">👤</div>
        </div>

        <div class="explore-grid" style="margin-top:2px;">

          ${
            userPosts.length
              ? userPosts.map(post => {
                  const isVideo =
                    post.mediaType === "video" ||
                    (post.mediaUrl && /\.(mp4|webm|mov)$/i.test(post.mediaUrl));

                  const statCount = formatCount(
                    post.viewsCount || post.likesCount || 0
                  );

                  const cleanText = (post.caption || "")
                    .replace(/^\[.*?\]\s*/, "");

                  return `
                    <div
                      class="explore-tile"
                      data-profile-post="${escapeHTML(getPostId(post))}"
                    >

                      ${
                        post.mediaUrl
                          ? (
                              isVideo
                                ? `<video
                                     src="${escapeHTML(post.mediaUrl)}"
                                     muted
                                     preload="metadata"
                                     playsinline
                                   ></video>`
                                : `<img
                                     src="${escapeHTML(post.mediaUrl)}"
                                     loading="lazy"
                                     alt="Post"
                                   />`
                            )
                          : `
                            <div class="explore-text-tile">
                              ${escapeHTML(cleanText.slice(0,60) || "Study Note")}
                            </div>
                          `
                      }

                      ${isVideo ? `<div class="explore-reel-icon">🎬</div>` : ""}

                      <div class="explore-tile-overlay"></div>

                      <div class="explore-tile-stats">
                        <span>👁</span>
                        <span>${statCount}</span>
                      </div>

                    </div>
                  `;
                }).join("")
              : `
                <div style="
                  grid-column:1/-1;
                  text-align:center;
                  padding:40px;
                  color:#64748b;
                ">
                  No posts uploaded by this user yet.
                </div>
              `
          }

        </div>
      `;

      /* =================================================
         PROFILE POSTS CLICK
      ================================================= */

      bodyContainer.querySelectorAll("[data-profile-post]").forEach(tile => {
        tile.onclick = () => {
          const postId = tile.dataset.profilePost;

          if (typeof window.openFullscreenPostViewer === "function") {
            window.openFullscreenPostViewer(postId);
          }
        };
      });

      /* =================================================
         FOLLOW / UNFOLLOW
      ================================================= */

      const followBtn = bodyContainer.querySelector(
        "#profile-follow-btn"
      );

      let currentlyFollowing = isFollowing;

      followBtn.onclick = async () => {
        if (followBtn.disabled) return;

        followBtn.disabled = true;
        followBtn.textContent = "Please wait...";

        try {
          const result = window.TSUser
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

          if (!result || !result.success) {
            throw new Error(
              result?.message || "Follow action failed."
            );
          }

          currentlyFollowing =
            typeof result.following === "boolean"
              ? result.following
              : !currentlyFollowing;

          followBtn.textContent = currentlyFollowing
            ? "Following ✓"
            : "Follow";

          followBtn.classList.toggle(
            "primary",
            !currentlyFollowing
          );

          if (typeof result.followersCount !== "undefined") {
            const countElement = bodyContainer.querySelector(
              "#profile-followers-count"
            );

            if (countElement) {
              countElement.textContent = result.followersCount;
            }
          }

        } catch (error) {
          console.error("Follow action failed:", error);
          alert(error.message || "Could not update follow status.");

          followBtn.textContent = currentlyFollowing
            ? "Following ✓"
            : "Follow";

        } finally {
          followBtn.disabled = false;
        }
      };

      /* =================================================
         MESSAGE BUTTON
      ================================================= */

      bodyContainer.querySelector("#profile-msg-btn").onclick =
        async () => {
          const msgBtn = bodyContainer.querySelector("#profile-msg-btn");

          try {
            msgBtn.disabled = true;
            msgBtn.textContent = "Opening...";

            const chatRes = await window.api(
              `/api/conversations/${encodedId}`,
              { method: "POST" }
            );

            if (!chatRes || chatRes.success === false) {
              throw new Error(
                chatRes?.message || "Could not open conversation."
              );
            }

            modal.remove();

            const convId =
              chatRes?.conversation?.id ||
              chatRes?.id ||
              userId;

            if (typeof window.openDirectChat === "function") {
              window.openDirectChat(convId, p);

            } else if (typeof window.openChat === "function") {
              window.openChat(convId, p);

            } else if (typeof window.renderChat === "function") {
              window.renderChat(
                document.getElementById("app") || document.body,
                convId
              );

            } else {
              localStorage.setItem(
                "telesupar_active_chat_id",
                convId
              );

              const chatTabBtn =
                document.querySelector('button[data-tab="chat"]') ||
                document.querySelector(".bottom-nav button:nth-child(3)") ||
                Array.from(document.querySelectorAll("button")).find(btn =>
                  btn.textContent.includes("Chat") ||
                  btn.innerHTML.includes("chat")
                );

              if (chatTabBtn) {
                chatTabBtn.click();
              } else {
                window.location.reload();
              }
            }

          } catch (error) {
            console.error("Open chat error:", error);

            msgBtn.disabled = false;
            msgBtn.textContent = "Message";

            alert(error.message || "Could not open chat.");
          }
        };

    } catch (error) {
      console.error("Explore profile error:", error);

      const bodyContainer = modal.querySelector(
        "#profile-modal-body"
      );

      if (bodyContainer) {
        bodyContainer.innerHTML = `
          <p style="
            text-align:center;
            color:#ef4444;
            padding:40px;
          ">
            Failed to connect to server.
          </p>
        `;
      }
    }
  };

  /* =====================================================
     SAVED LESSONS
     Existing placeholder preserved
  ===================================================== */

  function openSavedLessonsModal() {
    alert("Saved study posts feature coming up next!");
  }

  console.log("TELESUPAR Explore V2 loaded");

})();
