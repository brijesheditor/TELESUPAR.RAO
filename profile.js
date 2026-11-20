
/* =====================================================
   TELESUPAR - PROFILE V2
   Modern Profile + Shared TSUser Module
===================================================== */

(function () {
  "use strict";

  if (window.__TS_PROFILE_V2__) return;
  window.__TS_PROFILE_V2__ = true;

  const style = document.createElement("style");

  style.textContent = `
    .tsp-wrap {
      width: 100%;
      min-height: 100%;
      padding-bottom: 24px;
      color: #f8fafc;
      animation: tspFade .25s ease;
    }

    @keyframes tspFade {
      from { opacity: 0; transform: translateY(7px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .tsp-top {
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:18px 18px 12px;
    }

    .tsp-top h2 {
      font-size:21px;
      font-weight:850;
      letter-spacing:-.5px;
    }

    .tsp-top small {
      color:#94a3b8;
      font-size:11px;
      display:block;
      margin-top:3px;
    }

    .tsp-icon-btn {
      width:40px;
      height:40px;
      border:1px solid rgba(255,255,255,.1);
      background:rgba(30,41,59,.8);
      color:#fff;
      border-radius:14px;
      font-size:19px;
      cursor:pointer;
    }

    .tsp-card {
      margin:10px 14px;
      padding:20px 16px;
      border-radius:25px;
      border:1px solid rgba(255,255,255,.09);
      background:
        radial-gradient(circle at 90% 0%,rgba(139,92,246,.19),transparent 42%),
        linear-gradient(145deg,#151d30,#101827);
      box-shadow:0 12px 30px rgba(0,0,0,.18);
    }

    .tsp-profile-head {
      display:flex;
      align-items:center;
      gap:17px;
    }

    .tsp-avatar-wrap {
      position:relative;
      width:94px;
      height:94px;
      flex-shrink:0;
      padding:3px;
      border-radius:50%;
      background:linear-gradient(140deg,#38bdf8,#8b5cf6,#ec4899);
    }

    .tsp-avatar {
      width:100%;
      height:100%;
      object-fit:cover;
      border-radius:50%;
      border:3px solid #111827;
      display:block;
    }

    .tsp-camera {
      position:absolute;
      right:-2px;
      bottom:0;
      width:31px;
      height:31px;
      border-radius:50%;
      background:#6366f1;
      color:white;
      border:3px solid #111827;
      display:grid;
      place-items:center;
      cursor:pointer;
      font-size:13px;
    }

    .tsp-identity {
      min-width:0;
      flex:1;
    }

    .tsp-name {
      font-size:19px;
      font-weight:850;
      overflow-wrap:anywhere;
    }

    .tsp-username {
      color:#a78bfa;
      font-size:13px;
      margin-top:4px;
    }

    .tsp-online {
      display:inline-flex;
      align-items:center;
      gap:5px;
      color:#4ade80;
      font-size:11px;
      margin-top:8px;
    }

    .tsp-online-dot {
      width:7px;
      height:7px;
      background:#4ade80;
      border-radius:50%;
    }

    .tsp-bio {
      color:#cbd5e1;
      font-size:13px;
      line-height:1.6;
      margin-top:17px;
      overflow-wrap:anywhere;
    }

    .tsp-stats {
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:9px;
      margin-top:20px;
    }

    .tsp-stat {
      background:rgba(255,255,255,.045);
      border:1px solid rgba(255,255,255,.07);
      padding:13px 5px;
      border-radius:16px;
      text-align:center;
      cursor:pointer;
      color:white;
      transition:.2s;
    }

    .tsp-stat:active { transform:scale(.96); }

    .tsp-stat strong {
      display:block;
      font-size:19px;
      font-weight:850;
    }

    .tsp-stat span {
      color:#94a3b8;
      font-size:11px;
      margin-top:4px;
      display:block;
    }

    .tsp-actions {
      display:flex;
      gap:9px;
      margin-top:17px;
    }

    .tsp-btn {
      flex:1;
      min-height:43px;
      border:1px solid rgba(255,255,255,.1);
      border-radius:13px;
      background:#202b40;
      color:white;
      font-size:13px;
      font-weight:750;
      cursor:pointer;
    }

    .tsp-btn.primary {
      background:linear-gradient(110deg,#6366f1,#a855f7);
      border:0;
    }

    .tsp-btn.danger {
      color:#fca5a5;
      background:rgba(239,68,68,.08);
    }

    .tsp-section-head {
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:20px 17px 12px;
    }

    .tsp-section-head h3 {
      font-size:15px;
      font-weight:800;
    }

    .tsp-section-head span {
      font-size:11px;
      color:#94a3b8;
    }

    .tsp-post-tabs {
      display:flex;
      border-bottom:1px solid rgba(255,255,255,.08);
      margin:0 14px;
    }

    .tsp-post-tab {
      flex:1;
      padding:13px;
      text-align:center;
      color:#94a3b8;
      font-size:12px;
      font-weight:800;
      border-bottom:2px solid transparent;
    }

    .tsp-post-tab.active {
      color:white;
      border-color:#a78bfa;
    }

    .tsp-grid {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:3px;
      padding:3px;
    }

    .tsp-post {
      aspect-ratio:1;
      position:relative;
      overflow:hidden;
      background:#172033;
    }

    .tsp-post img,
    .tsp-post video {
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }

    .tsp-post-text {
      padding:9px;
      font-size:11px;
      color:#cbd5e1;
      line-height:1.5;
      overflow:hidden;
    }

    .tsp-video-mark {
      position:absolute;
      right:7px;
      top:7px;
      background:rgba(0,0,0,.55);
      padding:4px 6px;
      border-radius:7px;
      font-size:10px;
    }

    .tsp-empty {
      grid-column:1/-1;
      padding:40px 20px;
      text-align:center;
      color:#94a3b8;
    }

    .tsp-empty-icon {
      font-size:32px;
      margin-bottom:10px;
    }

    .tsp-empty strong {
      color:#e2e8f0;
      display:block;
      font-size:14px;
      margin-bottom:5px;
    }

    .tsp-loading {
      text-align:center;
      padding:50px 20px;
      color:#94a3b8;
      font-size:13px;
    }

    /* EDIT PROFILE MODAL */

    .tsp-overlay {
      position:fixed;
      inset:0;
      z-index:150;
      background:rgba(0,0,0,.76);
      backdrop-filter:blur(9px);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:18px;
    }

    .tsp-modal {
      width:100%;
      max-width:420px;
      background:#111827;
      border:1px solid rgba(255,255,255,.1);
      border-radius:23px;
      padding:21px;
      box-shadow:0 25px 70px rgba(0,0,0,.5);
      animation:tspFade .2s ease;
    }

    .tsp-modal-head {
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:20px;
    }

    .tsp-modal-head h3 {
      font-size:18px;
      font-weight:850;
    }

    .tsp-close {
      border:0;
      background:#263248;
      color:white;
      width:32px;
      height:32px;
      border-radius:10px;
      font-size:18px;
    }

    .tsp-field {
      margin-bottom:16px;
    }

    .tsp-field label {
      display:block;
      color:#94a3b8;
      font-size:12px;
      margin-bottom:8px;
    }

    .tsp-field input,
    .tsp-field textarea {
      width:100%;
      padding:13px;
      border-radius:12px;
      background:#1e293b;
      border:1px solid rgba(255,255,255,.08);
      color:white;
      outline:none;
      font-size:14px;
      resize:vertical;
    }

    .tsp-field textarea { min-height:95px; }

    .tsp-field input:focus,
    .tsp-field textarea:focus {
      border-color:#8b5cf6;
    }

    .tsp-char-count {
      text-align:right;
      color:#64748b;
      font-size:10px;
      margin-top:5px;
    }

    /* FOLLOWERS / FOLLOWING */

    .tsp-ff-screen {
      position:fixed;
      inset:0;
      z-index:140;
      background:#090d16;
      overflow-y:auto;
      color:white;
      animation:tspFade .2s ease;
    }

    .tsp-ff-header {
      position:sticky;
      top:0;
      z-index:5;
      display:flex;
      align-items:center;
      gap:14px;
      padding:15px 17px;
      background:rgba(9,13,22,.96);
      border-bottom:1px solid rgba(255,255,255,.08);
      backdrop-filter:blur(15px);
    }

    .tsp-ff-back {
      width:37px;
      height:37px;
      border-radius:12px;
      background:#1e293b;
      color:white;
      border:1px solid rgba(255,255,255,.08);
      font-size:20px;
    }

    .tsp-ff-title {
      font-size:16px;
      font-weight:850;
    }

    .tsp-ff-tabs {
      display:flex;
      border-bottom:1px solid rgba(255,255,255,.08);
    }

    .tsp-ff-tab {
      flex:1;
      text-align:center;
      padding:14px 5px;
      color:#94a3b8;
      font-size:13px;
      font-weight:750;
      border-bottom:2px solid transparent;
      cursor:pointer;
    }

    .tsp-ff-tab.active {
      color:white;
      border-color:#a78bfa;
    }

    .tsp-ff-search {
      padding:13px 15px;
    }

    .tsp-ff-search input {
      width:100%;
      background:#1e293b;
      border:1px solid rgba(255,255,255,.07);
      border-radius:12px;
      padding:12px 14px;
      color:white;
      outline:none;
      font-size:13px;
    }

    .tsp-ff-category {
      margin:5px 14px;
      padding:13px;
      display:flex;
      align-items:center;
      gap:12px;
      background:#141e30;
      border:1px solid rgba(255,255,255,.07);
      border-radius:15px;
      cursor:pointer;
    }

    .tsp-ff-category-icon {
      width:42px;
      height:42px;
      border-radius:13px;
      background:#26334b;
      display:grid;
      place-items:center;
      font-size:18px;
    }

    .tsp-ff-category strong {
      display:block;
      font-size:13px;
    }

    .tsp-ff-category small {
      color:#94a3b8;
      font-size:11px;
      display:block;
      margin-top:4px;
    }

    .tsp-ff-sort {
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:17px;
      font-size:12px;
      color:#cbd5e1;
      font-weight:750;
    }

    .tsp-ff-user {
      display:flex;
      align-items:center;
      gap:11px;
      padding:11px 15px;
    }

    .tsp-ff-avatar {
      width:47px;
      height:47px;
      object-fit:cover;
      border-radius:50%;
      border:2px solid #8b5cf6;
      flex-shrink:0;
    }

    .tsp-ff-info {
      flex:1;
      min-width:0;
    }

    .tsp-ff-info strong {
      display:block;
      font-size:13px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    .tsp-ff-info small {
      display:block;
      color:#94a3b8;
      font-size:11px;
      margin-top:3px;
    }

    .tsp-ff-actions {
      display:flex;
      gap:7px;
    }

    .tsp-ff-action {
      border:0;
      border-radius:9px;
      padding:8px 11px;
      background:#263248;
      color:white;
      font-size:11px;
      font-weight:750;
      cursor:pointer;
    }

    .tsp-ff-action.follow {
      background:#4f46e5;
    }

    .tsp-ff-action:disabled {
      opacity:.5;
    }

    @media(max-width:360px) {
      .tsp-card { margin:8px; padding:16px 12px; }
      .tsp-avatar-wrap { width:78px; height:78px; }
      .tsp-name { font-size:16px; }
      .tsp-ff-action { padding:7px 8px; }
    }
  `;

  document.head.appendChild(style);

  /* =====================================================
     HELPERS
  ===================================================== */

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function getAvatar(user) {
    if (window.TSUser?.avatar) {
      return window.TSUser.avatar(user);
    }

    return window.avatarUrl(user);
  }

  function getUserId(user) {
    return String(user?.id || user?._id || "");
  }

  function getPostUserId(post) {
    return String(post?.user?.id || post?.userId || "");
  }

  function showMessage(message) {
    alert(message);
  }

  /* =====================================================
     PROFILE RENDER
  ===================================================== */

  window.renderProfile = async function (container) {
    if (!container) return;

    container.innerHTML = `
      <div class="tsp-loading">Loading your profile...</div>
    `;

    try {
      let meRes;

      if (window.TSUser) {
        meRes = await window.TSUser.getMe();
      } else {
        meRes = await window.api("/api/me");
      }

      const user =
        meRes?.success && meRes.user
          ? meRes.user
          : window.AppState?.user;

      if (!user) {
        container.innerHTML = `
          <div class="tsp-loading">Unable to load profile. Please login again.</div>
        `;
        return;
      }

      const sharedUser = window.TSUser
        ? window.TSUser.seed(user)
        : user;

      if (window.AppState) {
        window.AppState.user = sharedUser;
      }

      const userId = getUserId(sharedUser);

      const [followStats, feedRes] = await Promise.all([
        window.TSUser
          ? window.TSUser.getFollowStatus(userId, true)
          : window.api(`/api/users/${userId}/follow-status`),

        window.TSUser
          ? window.TSUser.getFeedPosts()
          : window.api("/api/posts/feed")
      ]);

      const allPosts = feedRes?.posts || [];

      const myPosts = allPosts.filter(post =>
        getPostUserId(post) === userId
      );

      const followersCount =
        followStats?.followersCount || 0;

      const followingCount =
        followStats?.followingCount || 0;

      container.innerHTML = `
        <div class="tsp-wrap">

          <div class="tsp-top">
            <div>
              <h2>My Profile</h2>
              <small>Your TELESUPAR space</small>
            </div>
            <button class="tsp-icon-btn" id="tsp-refresh" title="Refresh">
              ↻
            </button>
          </div>

          <section class="tsp-card">

            <div class="tsp-profile-head">

              <div class="tsp-avatar-wrap">
                <img
                  class="tsp-avatar"
                  id="tsp-avatar"
                  src="${esc(getAvatar(sharedUser))}"
                  alt="Profile photo"
                />

                <label class="tsp-camera" title="Change profile photo">
                  ✎
                  <input
                    type="file"
                    id="tsp-avatar-input"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    hidden
                  />
                </label>
              </div>

              <div class="tsp-identity">
                <div class="tsp-name">
                  ${esc(sharedUser.displayName)}
                </div>

                <div class="tsp-username">
                  @${esc(sharedUser.username)}
                </div>

                ${
                  sharedUser.isOnline
                    ? `<div class="tsp-online">
                         <span class="tsp-online-dot"></span>
                         Active now
                       </div>`
                    : ""
                }
              </div>

            </div>

            <div class="tsp-bio">
              ${esc(
                sharedUser.bio ||
                "Hey there! I am using TELESUPAR."
              )}
            </div>

            <div class="tsp-stats">

              <button class="tsp-stat" type="button">
                <strong>${myPosts.length}</strong>
                <span>Posts</span>
              </button>

              <button
                class="tsp-stat"
                type="button"
                id="tsp-followers"
              >
                <strong>${followersCount}</strong>
                <span>Followers</span>
              </button>

              <button
                class="tsp-stat"
                type="button"
                id="tsp-following"
              >
                <strong>${followingCount}</strong>
                <span>Following</span>
              </button>

            </div>

            <div class="tsp-actions">
              <button class="tsp-btn primary" id="tsp-edit">
                ✎ Edit Profile
              </button>

              <button class="tsp-btn danger" id="tsp-logout">
                Logout
              </button>
            </div>

          </section>

          <div class="tsp-section-head">
            <h3>My Posts</h3>
            <span>${myPosts.length} posts loaded</span>
          </div>

          <div class="tsp-post-tabs">
            <div class="tsp-post-tab active">▦ &nbsp; POSTS</div>
            <div class="tsp-post-tab">▤ &nbsp; MEDIA</div>
          </div>

          <div class="tsp-grid" id="tsp-post-grid">

            ${
              myPosts.length
                ? myPosts.map(post => {
                    const mediaUrl = post.mediaUrl || "";
                    const isVideo = post.mediaType === "video";

                    if (mediaUrl) {
                      return `
                        <div class="tsp-post">
                          ${
                            isVideo
                              ? `<video
                                   src="${esc(mediaUrl)}"
                                   muted
                                   playsinline
                                   preload="metadata"
                                 ></video>
                                 <span class="tsp-video-mark">▶</span>`
                              : `<img
                                   src="${esc(mediaUrl)}"
                                   loading="lazy"
                                   alt="Post"
                                 />`
                          }
                        </div>
                      `;
                    }

                    return `
                      <div class="tsp-post">
                        <div class="tsp-post-text">
                          ${esc(post.caption || "Text post")}
                        </div>
                      </div>
                    `;
                  }).join("")
                : `
                  <div class="tsp-empty">
                    <div class="tsp-empty-icon">▧</div>
                    <strong>No posts yet</strong>
                    <span>Your shared posts will appear here.</span>
                  </div>
                `
            }

          </div>
        </div>
      `;

      /* Refresh */
      container.querySelector("#tsp-refresh").onclick = () => {
        window.renderProfile(container);
      };

      /* Followers */
      container.querySelector("#tsp-followers").onclick = () => {
        window.openFollowersFollowingPage(
          sharedUser,
          "followers",
          () => window.renderProfile(container)
        );
      };

      /* Following */
      container.querySelector("#tsp-following").onclick = () => {
        window.openFollowersFollowingPage(
          sharedUser,
          "following",
          () => window.renderProfile(container)
        );
      };

      /* Edit profile */
      container.querySelector("#tsp-edit").onclick = () => {
        openEditProfile(sharedUser, container);
      };

      /* Avatar upload */
      container.querySelector("#tsp-avatar-input").onchange =
        async event => {
          const file = event.target.files?.[0];
          if (!file) return;

          if (!file.type.startsWith("image/")) {
            showMessage("Please select an image.");
            return;
          }

          const button = container.querySelector(".tsp-camera");
          button.textContent = "…";

          try {
            const result = window.TSUser
              ? await window.TSUser.uploadAvatar(file)
              : await uploadAvatarFallback(file);

            if (!result?.success) {
              throw new Error(result?.message || "Photo upload failed");
            }

            showMessage("Profile photo updated successfully!");
            await window.renderProfile(container);

          } catch (error) {
            showMessage(error.message || "Photo upload failed.");
            button.textContent = "✎";
          }
        };

      /* Logout */
      container.querySelector("#tsp-logout").onclick = () => {
        if (!confirm("Are you sure you want to logout?")) return;

        localStorage.removeItem("ts_token");
        localStorage.removeItem("ts_user");
        location.reload();
      };

    } catch (error) {
      console.error("PROFILE LOAD ERROR:", error);

      container.innerHTML = `
        <div class="tsp-loading">
          <div style="font-size:30px;margin-bottom:12px;">⚠️</div>
          Unable to load profile.
          <br><br>
          <button class="tsp-btn primary" id="tsp-retry">
            Try Again
          </button>
        </div>
      `;

      container.querySelector("#tsp-retry").onclick = () => {
        window.renderProfile(container);
      };
    }
  };

  /* =====================================================
     AVATAR FALLBACK
  ===================================================== */

  async function uploadAvatarFallback(file) {
    const fd = new FormData();
    fd.append("file", file);

    return window.api("/api/me/avatar", {
      method: "POST",
      body: fd
    });
  }

  /* =====================================================
     EDIT PROFILE MODAL
  ===================================================== */

  function openEditProfile(user, container) {
    const overlay = document.createElement("div");
    overlay.className = "tsp-overlay";

    overlay.innerHTML = `
      <div class="tsp-modal">

        <div class="tsp-modal-head">
          <h3>Edit Profile</h3>
          <button class="tsp-close" id="tsp-edit-close">×</button>
        </div>

        <form id="tsp-edit-form">

          <div class="tsp-field">
            <label>Display Name</label>
            <input
              id="tsp-edit-name"
              type="text"
              maxlength="40"
              minlength="2"
              required
              value="${esc(user.displayName)}"
              placeholder="Your name"
            />
          </div>

          <div class="tsp-field">
            <label>Username</label>
            <input
              type="text"
              value="@${esc(user.username)}"
              disabled
            />
          </div>

          <div class="tsp-field">
            <label>Bio</label>
            <textarea
              id="tsp-edit-bio"
              maxlength="160"
              placeholder="Write something about yourself..."
            >${esc(user.bio || "")}</textarea>

            <div class="tsp-char-count">
              <span id="tsp-bio-count">${(user.bio || "").length}</span>/160
            </div>
          </div>

          <button class="tsp-btn primary" id="tsp-save-profile" type="submit">
            Save Changes
          </button>

        </form>

      </div>
    `;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();

    overlay.querySelector("#tsp-edit-close").onclick = close;

    overlay.onclick = event => {
      if (event.target === overlay) close();
    };

    const bioInput = overlay.querySelector("#tsp-edit-bio");

    bioInput.oninput = () => {
      overlay.querySelector("#tsp-bio-count").textContent =
        bioInput.value.length;
    };

    overlay.querySelector("#tsp-edit-form").onsubmit =
      async event => {
        event.preventDefault();

        const name = overlay.querySelector("#tsp-edit-name").value.trim();
        const bio = bioInput.value.trim();
        const saveButton = overlay.querySelector("#tsp-save-profile");

        if (name.length < 2 || name.length > 40) {
          showMessage("Name must be between 2 and 40 characters.");
          return;
        }

        if (bio.length > 160) {
          showMessage("Bio must be under 160 characters.");
          return;
        }

        saveButton.disabled = true;
        saveButton.textContent = "Saving...";

        try {
          const result = window.TSUser
            ? await window.TSUser.updateProfile(name, bio)
            : await window.api("/api/me", {
                method: "PATCH",
                body: JSON.stringify({
                  displayName: name,
                  bio
                })
              });

          if (!result?.success) {
            throw new Error(result?.message || "Could not update profile");
          }

          if (result.user && window.TSUser) {
            window.TSUser.seed(result.user);
          }

          close();
          await window.renderProfile(container);

        } catch (error) {
          showMessage(error.message || "Profile update failed.");
          saveButton.disabled = false;
          saveButton.textContent = "Save Changes";
        }
      };
  }

  /* =====================================================
     FOLLOWERS / FOLLOWING SCREEN
  ===================================================== */

  window.openFollowersFollowingPage = async function (
    user,
    initialTab,
    onClose
  ) {
    const screen = document.createElement("div");
    screen.className = "tsp-ff-screen";

    document.body.appendChild(screen);

    screen.innerHTML = `
      <div class="tsp-loading">Loading connections...</div>
    `;

    let followersList = [];
    let followingList = [];

    let activeTab =
      initialTab === "following" ? "following" : "followers";

    let searchQuery = "";
    let filterNotBack = false;
    let filterMutual = false;
    let sortMode = "Default";

    const userId = getUserId(user);

    try {
      const [followersRes, followingRes] = await Promise.all([
        window.TSUser
          ? window.TSUser.getFollowers(userId)
          : window.api(`/api/users/${userId}/followers`),

        window.TSUser
          ? window.TSUser.getFollowing(userId)
          : window.api(`/api/users/${userId}/following`)
      ]);

      followersList = followersRes?.success
        ? followersRes.users || []
        : [];

      followingList = followingRes?.success
        ? followingRes.users || []
        : [];

    } catch (error) {
      console.error("CONNECTIONS ERROR:", error);

      screen.innerHTML = `
        <div class="tsp-loading">
          Could not load connections.
          <br><br>
          <button class="tsp-ff-action" id="tsp-ff-close">
            Go Back
          </button>
        </div>
      `;

      screen.querySelector("#tsp-ff-close").onclick = () => {
        screen.remove();
        if (onClose) onClose();
      };

      return;
    }

    function closeScreen() {
      screen.remove();
      if (onClose) onClose();
    }

    function renderScreen() {
      const followingIds = new Set(
        followingList.map(getUserId)
      );

      const followersIds = new Set(
        followersList.map(getUserId)
      );

      const notFollowingBack = followersList.filter(
        person => !followingIds.has(getUserId(person))
      );

      const mutuals = followingList.filter(
        person => followersIds.has(getUserId(person))
      );

      let displayList =
        activeTab === "followers"
          ? [...followersList]
          : [...followingList];

      if (activeTab === "followers" && filterNotBack) {
        displayList = [...notFollowingBack];
      }

      if (activeTab === "following" && filterMutual) {
        displayList = [...mutuals];
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();

        displayList = displayList.filter(person =>
          (person.username || "").toLowerCase().includes(query) ||
          (person.displayName || "").toLowerCase().includes(query)
        );
      }

      if (sortMode === "A-Z") {
        displayList.sort((a, b) =>
          (a.username || "").localeCompare(b.username || "")
        );
      }

      screen.innerHTML = `
        <div class="tsp-ff-header">
          <button class="tsp-ff-back" id="tsp-ff-back">‹</button>
          <div class="tsp-ff-title">@${esc(user.username)} connections</div>
        </div>

        <div class="tsp-ff-tabs">

          <div
            class="tsp-ff-tab ${activeTab === "followers" ? "active" : ""}"
            data-tab="followers"
          >
            ${followersList.length} Followers
          </div>

          <div
            class="tsp-ff-tab ${activeTab === "following" ? "active" : ""}"
            data-tab="following"
          >
            ${followingList.length} Following
          </div>

        </div>

        <div class="tsp-ff-search">
          <input
            id="tsp-ff-search"
            placeholder="Search connections..."
            value="${esc(searchQuery)}"
          />
        </div>

        ${
          activeTab === "followers"
            ? `
              <div class="tsp-ff-category" id="tsp-not-back">
                <div class="tsp-ff-category-icon">👥</div>
                <div>
                  <strong>People you don't follow back</strong>
                  <small>${notFollowingBack.length} people</small>
                </div>
              </div>
            `
            : `
              <div class="tsp-ff-category" id="tsp-mutual">
                <div class="tsp-ff-category-icon">🤝</div>
                <div>
                  <strong>Mutual connections</strong>
                  <small>${mutuals.length} people follow you back</small>
                </div>
              </div>
            `
        }

        <div class="tsp-ff-sort">
          <span>
            ${filterNotBack ? "People you don't follow back" :
              filterMutual ? "Mutual connections" :
              "All connections"}
          </span>

          <button class="tsp-ff-action" id="tsp-ff-sort">
            ${sortMode === "Default" ? "Sort A–Z" : "Default"}
          </button>
        </div>

        <div id="tsp-ff-list">

          ${
            displayList.length
              ? displayList.map(person => {
                  const personId = getUserId(person);
                  const iFollow = followingIds.has(personId);

                  return `
                    <div class="tsp-ff-user">

                      <img
                        class="tsp-ff-avatar"
                        src="${esc(getAvatar(person))}"
                        alt=""
                      />

                      <div class="tsp-ff-info">
                        <strong>${esc(person.displayName || person.username)}</strong>
                        <small>@${esc(person.username)}</small>
                      </div>

                      <div class="tsp-ff-actions">

                        ${
                          activeTab === "followers" && !iFollow
                            ? `<button
                                 class="tsp-ff-action follow"
                                 data-follow="${esc(personId)}"
                               >Follow back</button>`
                            : `<button
                                 class="tsp-ff-action"
                                 data-message="${esc(personId)}"
                               >Message</button>`
                        }

                        ${
                          activeTab === "following"
                            ? `<button
                                 class="tsp-ff-action"
                                 data-unfollow="${esc(personId)}"
                               >Unfollow</button>`
                            : ""
                        }

                      </div>
                    </div>
                  `;
                }).join("")
              : `
                <div class="tsp-empty">
                  <div class="tsp-empty-icon">👤</div>
                  <strong>No users found</strong>
                  <span>Try another search.</span>
                </div>
              `
          }

        </div>
      `;

      screen.querySelector("#tsp-ff-back").onclick = closeScreen;

      screen.querySelectorAll(".tsp-ff-tab").forEach(tab => {
        tab.onclick = () => {
          activeTab = tab.dataset.tab;
          filterNotBack = false;
          filterMutual = false;
          renderScreen();
        };
      });

      const search = screen.querySelector("#tsp-ff-search");

      search.oninput = () => {
        searchQuery = search.value;
        const position = search.selectionStart;
        renderScreen();

        const newSearch = screen.querySelector("#tsp-ff-search");
        newSearch.focus();
        newSearch.setSelectionRange(position, position);
      };

      const notBackButton = screen.querySelector("#tsp-not-back");

      if (notBackButton) {
        notBackButton.onclick = () => {
          filterNotBack = !filterNotBack;
          filterMutual = false;
          renderScreen();
        };
      }

      const mutualButton = screen.querySelector("#tsp-mutual");

      if (mutualButton) {
        mutualButton.onclick = () => {
          filterMutual = !filterMutual;
          filterNotBack = false;
          renderScreen();
        };
      }

      screen.querySelector("#tsp-ff-sort").onclick = () => {
        sortMode = sortMode === "Default" ? "A-Z" : "Default";
        renderScreen();
      };

      screen.querySelectorAll("[data-message]").forEach(button => {
        button.onclick = () => {
          const targetId = button.dataset.message;
          closeScreen();

          if (typeof window.openDirectChat === "function") {
            window.openDirectChat(targetId);
          } else {
            showMessage("Chat is not available right now.");
          }
        };
      });

      screen.querySelectorAll("[data-follow]").forEach(button => {
        button.onclick = async () => {
          const targetId = button.dataset.follow;

          button.disabled = true;
          button.textContent = "...";

          try {
            const result = window.TSUser
              ? await window.TSUser.follow(targetId)
              : await window.api(`/api/users/${targetId}/follow`, {
                  method: "POST"
                });

            if (!result?.success) {
              throw new Error(result?.message || "Follow failed");
            }

            const addedUser = followersList.find(
              person => getUserId(person) === targetId
            );

            if (addedUser) {
              followingList.unshift(addedUser);
            }

            renderScreen();

          } catch (error) {
            showMessage(error.message || "Follow failed.");
            button.disabled = false;
            button.textContent = "Follow back";
          }
        };
      });

      screen.querySelectorAll("[data-unfollow]").forEach(button => {
        button.onclick = async () => {
          const targetId = button.dataset.unfollow;

          if (!confirm("Unfollow this user?")) return;

          button.disabled = true;

          try {
            const result = window.TSUser
              ? await window.TSUser.unfollow(targetId)
              : await window.api(`/api/users/${targetId}/follow`, {
                  method: "DELETE"
                });

            if (!result?.success) {
              throw new Error(result?.message || "Unfollow failed");
            }

            followingList = followingList.filter(
              person => getUserId(person) !== targetId
            );

            renderScreen();

          } catch (error) {
            showMessage(error.message || "Unfollow failed.");
            button.disabled = false;
          }
        };
      });
    }

    renderScreen();
  };

  console.log("TELESUPAR Profile V2 loaded");
})();
