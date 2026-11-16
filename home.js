(function() {
  const style = document.createElement("style");
  style.textContent = `
    .stories-bar {
      display: flex; gap: 14px; padding: 14px 16px; overflow-x: auto;
      border-bottom: 1px solid rgba(255,255,255,0.07); scrollbar-width: none;
    }
    .stories-bar::-webkit-scrollbar { display: none; }
    .story-item { display: flex; flex-direction: column; align-items: center; width: 68px; flex-shrink: 0; cursor: pointer; }
    .story-ring {
      width: 62px; height: 62px; border-radius: 50%; padding: 2.5px;
      background: linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6); position: relative;
    }
    .story-ring.seen { background: #334155; }
    .story-ring img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 2px solid #090d16; }
    .story-add-badge {
      position: absolute; bottom: 0; right: 0; width: 20px; height: 20px;
      background: #3b82f6; color: #fff; border-radius: 50%; display: grid; place-items: center;
      font-weight: 800; font-size: 14px; border: 2px solid #090d16;
    }
    .story-name { font-size: 11px; color: #cbd5e1; margin-top: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 66px; }

    /* Post Card */
    .post-card {
      background: #111827; margin: 12px 14px; border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.07); overflow: hidden;
    }
    .post-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; }
    .post-user { display: flex; align-items: center; gap: 10px; }
    .post-user img { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
    .post-media { width: 100%; max-height: 420px; object-fit: cover; display: block; background: #000; cursor: pointer; }
    .post-caption { padding: 10px 14px; font-size: 14px; line-height: 1.45; color: #e2e8f0; cursor: pointer; }
    .post-actions { display: flex; gap: 18px; padding: 10px 14px 14px; align-items: center; }
    .action-chip {
      background: rgba(255,255,255,0.05); border: none; color: #e2e8f0; padding: 7px 13px;
      border-radius: 99px; display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;
    }
    .action-chip.liked { background: rgba(236, 72, 153, 0.18); color: #f472b6; }
    .btn-pill {
      background: linear-gradient(135deg, #6366f1, #ec4899); border: none; color: #fff;
      padding: 7px 16px; border-radius: 99px; font-size: 12px; font-weight: 700; cursor: pointer;
    }
    .btn-follow-post {
      background: #3b82f6; color: #fff; border: none; padding: 6px 14px;
      border-radius: 9px; font-size: 12px; font-weight: 700; cursor: pointer;
    }
    .btn-msg-post {
      background: #1e293b; color: #fff; border: none; padding: 6px 14px;
      border-radius: 9px; font-size: 12px; font-weight: 700; cursor: pointer;
      border: 1px solid rgba(255,255,255,0.1);
    }

    /* Story Fullscreen Viewer */
    .story-viewer {
      position: fixed; inset: 0; background: #000; z-index: 95; display: flex; flex-direction: column; justify-content: space-between;
    }
    .story-viewer-media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
    .story-viewer-top { position: relative; z-index: 2; padding: 16px; background: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent); display: flex; justify-content: space-between; align-items: center; }
    .story-viewer-bottom { position: relative; z-index: 2; padding: 16px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; gap: 10px; align-items: center; }

    /* Comments Drawer */
    .comments-box { padding: 12px 14px; background: #0f172a; border-top: 1px solid rgba(255,255,255,0.08); }
    .comment-item { margin-bottom: 10px; font-size: 13px; }
    .reply-item { margin-left: 24px; padding-left: 10px; border-left: 2px solid #6366f1; margin-top: 6px; font-size: 12px; color: #cbd5e1; }
  `;
  document.head.appendChild(style);

  window.renderHome = async function(container) {
    container.innerHTML = `
      <div class="stories-bar" id="stories-bar"></div>
      <div id="posts-feed"><p style="text-align:center; color:#94a3b8; padding:30px;">Loading feed...</p></div>
      <input type="file" id="story-upload-input" accept="image/*,video/*" hidden />
    `;

    // Inject Plus (+) button into top bar next to notification icon
    setTimeout(() => {
      if (!document.getElementById("header-create-post-btn")) {
        const plusBtn = document.createElement("button");
        plusBtn.id = "header-create-post-btn";
        plusBtn.innerHTML = "＋";
        plusBtn.style.cssText = `
          background: none; border: none; color: #fff; font-size: 24px; cursor: pointer;
          margin-right: 8px; display: grid; place-items: center; width: 36px; height: 36px; font-weight: 800;
        `;
        plusBtn.title = "Create Post";
        plusBtn.onclick = () => window.openCreatePostModal();

        const notificationIcon = document.querySelector('button[onclick*="notification"]') || document.querySelector('.fa-bell, svg')?.closest('button') || document.querySelector('header button:last-child') || document.querySelector('div[style*="display: flex"] button:last-child');
        
        if (notificationIcon && notificationIcon.parentNode) {
          notificationIcon.parentNode.insertBefore(plusBtn, notificationIcon);
        }
      }
    }, 150);

    // Story Upload handler
    document.getElementById("story-upload-input").onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      const res = await window.api("/api/stories", { method: "POST", body: fd });
      if (res.success) loadStories();
    };

    loadStories();
    loadPosts();
  };

  window.openCreatePostModal = function() {
    const existing = document.getElementById("create-post-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "create-post-modal";
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(9,13,22,0.95); z-index: 150;
      display: flex; flex-direction: column; color: #fff; padding: 20px; font-family: inherit;
    `;
    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div style="font-weight:800; font-size:18px;">Create New Post</div>
        <button id="close-post-modal" style="background:none; border:none; color:#fff; font-size:22px; cursor:pointer;">✕</button>
      </div>
      <textarea id="modal-post-caption" rows="4" placeholder="Share a photo, video or thought on TELESUPAR..." style="width:100%; background:#1e293b; border:none; border-radius:12px; padding:12px; color:#fff; font-size:14px; outline:none; resize:none; margin-bottom:14px;"></textarea>
      <div style="display:flex; align-items:center; justify-content:space-between; background:#1e293b; padding:12px 16px; border-radius:12px; margin-bottom:20px;">
        <label style="color:#a855f7; font-size:14px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:8px;">
          📷 Choose Photo / Video
          <input type="file" id="modal-post-file" accept="image/*,video/*" hidden />
        </label>
        <span id="modal-file-name" style="font-size:12px; color:#94a3b8;"></span>
      </div>
      <button class="btn-pill" id="modal-publish-btn" style="width:100%; padding:12px; font-size:14px; font-weight:700;">Publish Post</button>
    `;
    document.body.appendChild(modal);

    document.getElementById("close-post-modal").onclick = () => modal.remove();

    document.getElementById("modal-post-file").onchange = (e) => {
      const f = e.target.files[0];
      document.getElementById("modal-file-name").textContent = f ? f.name.slice(0, 20) : "";
    };

    document.getElementById("modal-publish-btn").onclick = async () => {
      const caption = document.getElementById("modal-post-caption").value.trim();
      const file = document.getElementById("modal-post-file").files[0];
      if (!caption && !file) return;

      const fd = new FormData();
      fd.append("caption", caption);
      if (file) fd.append("file", file);

      const btn = document.getElementById("modal-publish-btn");
      btn.textContent = "Publishing...";
      const res = await window.api("/api/posts", { method: "POST", body: fd });
      if (res.success) {
        modal.remove();
        loadPosts();
      } else {
        btn.textContent = "Publish Post";
        alert(res.message || "Could not publish post");
      }
    };
  };

  async function loadStories() {
    const bar = document.getElementById("stories-bar");
    if (!bar) return;
    const data = await window.api("/api/stories/feed");
    if (!data.success) return;

    const me = window.AppState.user;
    const hasMyStory = data.myStories && data.myStories.length > 0;

    let html = `
      <div class="story-item" id="my-story-btn">
        <div class="story-ring ${hasMyStory ? "" : "seen"}">
          <img src="${window.avatarUrl(me)}" />
          <div class="story-add-badge">+</div>
        </div>
        <span class="story-name">Your Story</span>
      </div>
    `;

    (data.users || []).forEach((entry, idx) => {
      html += `
        <div class="story-item" data-story-user="${idx}">
          <div class="story-ring">
            <img src="${window.avatarUrl(entry.user)}" />
          </div>
          <span class="story-name">${entry.user.displayName}</span>
        </div>
      `;
    });

    bar.innerHTML = html;

    document.getElementById("my-story-btn").onclick = () => {
      if (hasMyStory) {
        openStoryViewer(me, data.myStories, true);
      } else {
        document.getElementById("story-upload-input").click();
      }
    };

    bar.querySelectorAll("[data-story-user]").forEach(el => {
      el.onclick = () => {
        const entry = data.users[Number(el.dataset.storyUser)];
        openStoryViewer(entry.user, entry.stories, false);
      };
    });
  }

  function openStoryViewer(user, storyList, isMine) {
    let index = 0;
    const viewer = document.createElement("div");
    viewer.className = "story-viewer";

    async function renderSlide() {
      const s = storyList[index];
      if (!s) { viewer.remove(); return; }
      if (!isMine) window.api(`/api/stories/${s.id}/view`, { method: "POST" });

      const mediaTag = s.resourceType === "video"
        ? `<video src="${s.mediaUrl}" class="story-viewer-media" autoplay playsinline controls></video>`
        : `<img src="${s.mediaUrl}" class="story-viewer-media" />`;

      viewer.innerHTML = `
        ${mediaTag}
        <div class="story-viewer-top">
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${window.avatarUrl(user)}" style="width:36px; height:36px; border-radius:50%;" />
            <div>
              <div style="font-weight:700; font-size:14px;">${user.displayName}</div>
              <div style="font-size:11px; color:#cbd5e1;">${index + 1} / ${storyList.length}</div>
            </div>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            ${isMine ? `<button id="add-more-story" style="background:#3b82f6; border:none; color:#fff; width:34px; height:34px; border-radius:50%; font-weight:800; font-size:18px; display:grid; place-items:center; cursor:pointer;" title="Add Story">＋</button>` : ""}
            <button id="close-story-btn" style="background:rgba(0,0,0,0.5); border:none; color:#fff; width:34px; height:34px; border-radius:50%; cursor:pointer;">✕</button>
          </div>
        </div>
        <div class="story-viewer-bottom">
          ${!isMine ? `
            <input id="story-reply-input" placeholder="Reply to story..." style="flex:1; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); border-radius:99px; padding:10px 16px; color:#fff; outline:none;" />
            <button id="story-like-btn" class="icon-btn" style="background:${s.likedByMe ? "#ec4899" : "rgba(255,255,255,0.15)"};">♥</button>
            <button id="story-send-reply" class="btn-pill">Send</button>
          ` : `
            <div style="color:#fff; font-size:13px; cursor:pointer; flex:1;" onclick="window.openStoryStatsModal('${s.id}')">
              👁 ${s.viewsCount} views • ♥ ${s.likesCount} likes (Tap for details)
            </div>
          `}
          <button id="next-story-btn" class="icon-btn" style="background:rgba(255,255,255,0.15); border:none; color:#fff; width:36px; height:36px; border-radius:50%; cursor:pointer;">›</button>
        </div>
      `;

      viewer.querySelector("#close-story-btn").onclick = () => viewer.remove();
      viewer.querySelector("#next-story-btn").onclick = () => { index++; renderSlide(); };
      if (isMine && viewer.querySelector("#add-more-story")) {
        viewer.querySelector("#add-more-story").onclick = () => {
          viewer.remove();
          document.getElementById("story-upload-input").click();
        };
      }
      if (!isMine) {
        viewer.querySelector("#story-like-btn").onclick = async () => {
          const r = await window.api(`/api/stories/${s.id}/like`, { method: "POST" });
          if (r.success) viewer.querySelector("#story-like-btn").style.background = r.liked ? "#ec4899" : "rgba(255,255,255,0.15)";
        };
        viewer.querySelector("#story-send-reply").onclick = async () => {
          const text = viewer.querySelector("#story-reply-input").value.trim();
          if (!text) return;
          const conv = await window.api(`/api/conversations/${user.id}`, { method: "POST" });
          if (conv.success) {
            await window.api(`/api/conversations/${conv.conversation.id}/messages`, {
              method: "POST",
              body: JSON.stringify({ text, storyReply: { storyId: s.id } })
            });
            viewer.remove();
          }
        };
      }
    }

    document.body.appendChild(viewer);
    renderSlide();
  }

  window.openStoryStatsModal = async function(storyId) {
    const existing = document.getElementById("story-stats-screen");
    if (existing) existing.remove();

    const screen = document.createElement("div");
    screen.id = "story-stats-screen";
    screen.style.cssText = `
      position: fixed; inset: 0; background: rgba(9,13,22,0.95); z-index: 150;
      display: flex; flex-direction: column; color: #fff; font-family: inherit;
    `;
    document.body.appendChild(screen);

    screen.innerHTML = `<p style="text-align:center; padding:40px; color:#94a3b8;">Loading activity...</p>`;

    const [viewRes, likeRes] = await Promise.all([
      window.api(`/api/stories/${storyId}/viewers`),
      window.api(`/api/stories/${storyId}/likes`)
    ]);

    const viewers = viewRes.success ? (viewRes.viewers || []) : [];
    const likes = likeRes.success ? (likeRes.likes || []) : [];

    let activeTab = "viewers";

    function renderModalContent() {
      const list = activeTab === "viewers" ? viewers : likes;

      screen.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:16px; border-bottom:1px solid rgba(255,255,255,0.08);">
          <div style="font-weight:800; font-size:16px;">Story Activity</div>
          <button id="close-stats-btn" style="background:none; border:none; color:#fff; font-size:20px; cursor:pointer;">✕</button>
        </div>

        <div style="display:flex; border-bottom:1px solid rgba(255,255,255,0.08);">
          <div class="stat-tab" data-tab="viewers" style="flex:1; text-align:center; padding:12px; font-weight:700; cursor:pointer; color:${activeTab === 'viewers' ? '#fff' : '#94a3b8'}; border-bottom:2px solid ${activeTab === 'viewers' ? '#fff' : 'transparent'}">
            👁️ ${viewers.length} Viewers
          </div>
          <div class="stat-tab" data-tab="likes" style="flex:1; text-align:center; padding:12px; font-weight:700; cursor:pointer; color:${activeTab === 'likes' ? '#fff' : '#94a3b8'}; border-bottom:2px solid ${activeTab === 'likes' ? '#fff' : 'transparent'}">
            ❤️ ${likes.length} Likes
          </div>
        </div>

        <div style="flex:1; overflow-y:auto; padding:12px 16px;">
          ${list.length ? list.map(item => {
            const u = item.user || item;
            return `
              <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 0;">
                <div style="display:flex; align-items:center; gap:12px;">
                  <img src="${window.avatarUrl(u)}" style="width:42px; height:42px; border-radius:50%; object-fit:cover;" />
                  <div>
                    <div style="font-weight:700; font-size:14px;">${u.username}</div>
                    <div style="font-size:12px; color:#94a3b8;">${u.displayName || ''}</div>
                  </div>
                </div>
                <button class="stat-msg-btn" data-userid="${u.id}" style="background:#1e293b; color:#fff; border:none; padding:6px 14px; border-radius:8px; font-weight:700; font-size:12px; cursor:pointer;">Message</button>
              </div>
            `;
          }).join("") : `<p style="text-align:center; color:#64748b; padding:40px;">No ${activeTab} yet.</p>`}
        </div>
      `;

      screen.querySelector("#close-stats-btn").onclick = () => screen.remove();

      screen.querySelectorAll(".stat-tab").forEach(tab => {
        tab.onclick = () => {
          activeTab = tab.dataset.tab;
          renderModalContent();
        };
      });

      screen.querySelectorAll(".stat-msg-btn").forEach(btn => {
        btn.onclick = () => {
          screen.remove();
          window.openDirectChat(btn.dataset.userid);
        };
      });
    }

    renderModalContent();
  };

  async function loadPosts() {
    const feed = document.getElementById("posts-feed");
    if (!feed) return;
    const data = await window.api("/api/posts/feed");
    if (!data.success || !data.posts.length) {
      feed.innerHTML = `<p style="text-align:center; color:#94a3b8; padding:30px;">No posts yet. Be the first to post!</p>`;
      return;
    }

    feed.innerHTML = data.posts.map(post => `
      <div class="post-card" id="post-${post.id}">
        <div class="post-header">
          <div class="post-user">
            <img src="${window.avatarUrl(post.user)}" />
            <div>
              <div style="font-weight:700; font-size:14px;">${post.user.displayName}</div>
              <div style="font-size:11px; color:#94a3b8;">@${post.user.username}</div>
            </div>
          </div>
          <div id="post-action-container-${post.id}">
            ${post.isMyPost ? "" : (
              post.isFollowing
                ? `<button class="btn-msg-post" onclick="window.openDirectChat('${post.user.id}')">Message</button>`
                : `<button class="btn-follow-post" id="follow-btn-${post.id}" onclick="window.handlePostFollow('${post.user.id}', '${post.id}')">Follow</button>`
            )}
          </div>
        </div>

        ${post.mediaUrl ? (
          post.mediaType === "video"
            ? `<video src="${post.mediaUrl}" class="post-media" onclick="window.openFullscreenPostViewer('${post.id}')" controls playsinline></video>`
            : `<img src="${post.mediaUrl}" class="post-media" onclick="window.openFullscreenPostViewer('${post.id}')" />`
        ) : ""}

        ${post.caption ? `<div class="post-caption" onclick="window.openFullscreenPostViewer('${post.id}')">${post.caption}</div>` : ""}

        <div class="post-actions">
          <button class="action-chip ${post.likedByMe ? "liked" : ""}" onclick="window.togglePostLike('${post.id}', this)">
            ♥ <span>${post.likesCount}</span>
          </button>
          <button class="action-chip" onclick="window.toggleComments('${post.id}')">
            💬 <span id="ccount-${post.id}">${post.commentsCount}</span>
          </button>
        </div>

        <div class="comments-box hidden" id="comments-${post.id}"></div>
      </div>
    `).join("");
  }

  // Instagram-style Fullscreen Reel / Post Viewer with Telegram Back Arrow & Full Info Display
  window.openFullscreenPostViewer = async function(initialPostId) {
    const existing = document.getElementById("fullscreen-reel-viewer");
    if (existing) existing.remove();

    const viewer = document.createElement("div");
    viewer.id = "fullscreen-reel-viewer";
    viewer.style.cssText = `
      position: fixed; inset: 0; background: #000; z-index: 200;
      overflow-y: scroll; scroll-snap-type: y mandatory; scrollbar-width: none;
      font-family: inherit; color: #fff;
    `;
    document.body.appendChild(viewer);

    viewer.innerHTML = `<div style="display:grid; place-items:center; height:100vh; color:#94a3b8;">Loading post...</div>`;

    const res = await window.api("/api/posts/feed");
    if (!res.success || !res.posts.length) {
      viewer.innerHTML = `<div style="display:grid; place-items:center; height:100vh; color:#94a3b8;">No posts found. <button onclick="document.getElementById('fullscreen-reel-viewer').remove()" style="margin-top:10px; background:#3b82f6; border:none; color:#fff; padding:8px 16px; border-radius:8px;">Close</button></div>`;
      return;
    }

    const posts = res.posts;
    const targetIdx = posts.findIndex(p => p.id === initialPostId);
    if (targetIdx > 0) {
      const item = posts.splice(targetIdx, 1)[0];
      posts.unshift(item);
    }

    viewer.innerHTML = posts.map((post) => `
      <div class="reel-slide" data-postid="${post.id}" style="
        width: 100vw; height: 100vh; scroll-snap-align: start; position: relative;
        display: flex; align-items: center; justify-content: center; background: #0b0f19; overflow: hidden;
      ">
        ${post.mediaUrl ? (
          post.mediaType === "video"
            ? `<video src="${post.mediaUrl}" class="reel-media" autoplay loop playsinline controls style="width:100%; height:100%; object-fit:contain; background:#000;"></video>`
            : `<img src="${post.mediaUrl}" class="reel-media" style="width:100%; height:100%; object-fit:contain; background:#000;" />`
        ) : `<div style="background:#1e293b; width:100%; height:100%; display:grid; place-items:center; padding:20px; text-align:center;">No Media</div>`}

        <!-- Top Header: Telegram-style Back Arrow on left, 'Post' title in middle, '+' button on right -->
        <div style="
          position: absolute; top: 0; left: 0; right: 0; padding: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 10;
          background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
        ">
          <button onclick="document.getElementById('fullscreen-reel-viewer').remove()" style="
            background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; width: 36px; height: 36px; display:grid; place-items:center; font-weight: 700;
          " title="Back">←</button>
          
          <div style="font-weight: 800; font-size: 17px; letter-spacing: 0.5px; color: #fff;">Post</div>

          <button onclick="window.openCreatePostModal()" style="
            background: none; border: none; color: #fff; width: 36px; height: 36px; border-radius: 50%; font-size: 24px; font-weight: 800; cursor: pointer; display:grid; place-items:center;
          ">＋</button>
        </div>

        <!-- Right Side Instagram-style Large Action Buttons -->
        <div style="
          position: absolute; right: 16px; bottom: 95px; display: flex; flex-direction: column; align-items: center; gap: 22px; z-index: 10;
        ">
          <!-- Like -->
          <button class="reel-action-btn reel-like-btn ${post.likedByMe ? 'liked' : ''}" data-postid="${post.id}" style="
            background: none; border: none; color: ${post.likedByMe ? '#ec4899' : '#fff'}; display: flex; flex-direction: column; align-items: center; cursor: pointer; font-size: 28px; gap: 4px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
          ">
            <span>♥</span>
            <span style="font-size: 13px; font-weight: 800;" class="reel-like-count">${post.likesCount}</span>
          </button>

          <!-- Comment (Opens Instagram-style Popup Drawer) -->
          <button onclick="window.openReelCommentsModal('${post.id}')" style="
            background: none; border: none; color: #fff; display: flex; flex-direction: column; align-items: center; cursor: pointer; font-size: 26px; gap: 4px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
          ">
            <span>💬</span>
            <span style="font-size: 13px; font-weight: 800;">${post.commentsCount}</span>
          </button>

          <!-- Share -->
          <button onclick="if(navigator.share){navigator.share({url: window.location.href})}else{alert('Link copied!')}" style="
            background: none; border: none; color: #fff; display: flex; flex-direction: column; align-items: center; cursor: pointer; font-size: 24px; gap: 4px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
          ">
            <span>↗</span>
            <span style="font-size: 12px; font-weight: 800;">Share</span>
          </button>

          <!-- Save (Opens Instagram-style Save Collection Popup) -->
          <button onclick="window.openSavePostModal('${post.id}')" style="
            background: none; border: none; color: #fff; display: flex; flex-direction: column; align-items: center; cursor: pointer; font-size: 24px; gap: 4px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
          ">
            <span>🔖</span>
            <span style="font-size: 12px; font-weight: 800;">Save</span>
          </button>
        </div>

        <!-- Bottom Details: Profile DP, Name, Follow/Message Button & Caption -->
        <div style="
          position: absolute; bottom: 20px; left: 16px; right: 80px; z-index: 10;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 60%, transparent); padding: 25px 0 10px 0; display: flex; flex-direction: column; gap: 8px;
        ">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${window.avatarUrl(post.user)}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid rgba(255,255,255,0.4);" />
              <div style="font-weight: 700; font-size: 15px; color: #fff;">${post.user.displayName}</div>
            </div>
            <div id="reel-header-action-container-${post.id}">
              ${post.isMyPost ? "" : (
                post.isFollowing
                  ? `<button class="btn-msg-post" onclick="window.openDirectChat('${post.user.id}')">Message</button>`
                  : `<button class="btn-follow-post" id="reel-follow-btn-${post.id}" onclick="window.handlePostFollow('${post.user.id}', '${post.id}')">Follow</button>`
              )}
            </div>
          </div>
          ${post.caption ? `<div style="font-size: 13.5px; line-height: 1.45; color: #e2e8f0; max-height: 120px; overflow-y: auto; word-break: break-word;">${post.caption}</div>` : ""}
        </div>
      </div>
    `).join("");

    viewer.querySelectorAll(".reel-like-btn").forEach(btn => {
      btn.onclick = async () => {
        const postId = btn.dataset.postid;
        const res = await window.api(`/api/posts/${postId}/like`, { method: "POST" });
        if (res.success) {
          btn.classList.toggle("liked", res.liked);
          btn.style.color = res.liked ? "#ec4899" : "#fff";
          btn.querySelector(".reel-like-count").textContent = res.likesCount;
        }
      };
    });
  };

  // Instagram-style Comments Bottom Sheet Modal
  window.openReelCommentsModal = async function(postId) {
    const existing = document.getElementById("reel-comments-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "reel-comments-modal";
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 250;
      display: flex; flex-direction: column; justify-content: flex-end; font-family: inherit;
    `;
    
    modal.innerHTML = `
      <div style="background: #111827; border-top-left-radius: 24px; border-top-right-radius: 24px; max-height: 75vh; height: 75vh; display: flex; flex-direction: column; color: #fff; border-top: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); position: relative;">
          <div style="font-weight: 800; font-size: 16px; width: 100%; text-align: center;">Comments</div>
          <button id="close-reel-comments" style="background: none; border: none; color: #fff; font-size: 20px; cursor: pointer; position: absolute; right: 16px;">✕</button>
        </div>
        <div id="reel-comments-list" style="flex: 1; overflow-y: auto; padding: 16px;">
          <p style="text-align: center; color: #94a3b8; padding: 20px;">Loading comments...</p>
        </div>
        <div style="padding: 12px 16px; background: #0f172a; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 10px; align-items: center;">
          <input id="reel-comment-input" placeholder="Add a comment..." style="flex: 1; background: #1e293b; border: none; border-radius: 99px; padding: 10px 16px; color: #fff; font-size: 13px; outline: none;" />
          <button class="btn-pill" id="reel-send-comment-btn" style="padding: 8px 18px;">Post</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector("#close-reel-comments").onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    const loadCommentsList = async () => {
      const listContainer = modal.querySelector("#reel-comments-list");
      const res = await window.api(`/api/posts/${postId}/comments`);
      if (!res.success) {
        listContainer.innerHTML = `<p style="text-align: center; color: #f87171;">Failed to load comments</p>`;
        return;
      }
      const comments = res.comments || [];
      if (!comments.length) {
        listContainer.innerHTML = `<p style="text-align: center; color: #64748b; padding: 40px;">No comments yet. Be the first to comment!</p>`;
        return;
      }

      listContainer.innerHTML = comments.map(c => `
        <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-start;">
          <img src="${window.avatarUrl(c.user)}" style="width: 34px; height: 34px; border-radius: 50%; object-fit: cover;" />
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; font-size: 13px;">${c.user?.displayName || "User"}</span>
              <span style="font-size: 11px; color: #94a3b8;">@${c.user?.username || ''}</span>
            </div>
            <div style="font-size: 13px; color: #e2e8f0; margin-top: 3px; word-break: break-word;">${c.text}</div>
            <div style="display: flex; gap: 12px; margin-top: 6px; font-size: 11px; color: #94a3b8;">
              <span style="cursor: pointer; color: #8b5cf6;" onclick="window.replyToReelComment('${postId}', '${c.id}', loadCommentsList)">Reply</span>
              ${c.isMine ? `
                <span style="cursor: pointer; color: #38bdf8;" onclick="window.handleEditComment('${postId}', '${c.id}', '${c.text}', loadCommentsList)">Edit</span>
                <span style="cursor: pointer; color: #f87171;" onclick="window.handleDeleteComment('${postId}', '${c.id}', loadCommentsList)">Delete</span>
              ` : ""}
            </div>
            ${(c.replies || []).map(r => `
              <div style="display: flex; gap: 10px; margin-top: 8px; margin-left: 20px; border-left: 2px solid #3b82f6; padding-left: 10px;">
                <img src="${window.avatarUrl(r.user)}" style="width: 26px; height: 26px; border-radius: 50%; object-fit: cover;" />
                <div style="flex: 1;">
                  <span style="font-weight: 700; font-size: 12px;">${r.user?.displayName || "User"}</span>
                  <div style="font-size: 12px; color: #cbd5e1; margin-top: 2px;">${r.text}</div>
                  ${r.isMine ? `<span style="cursor: pointer; color: #f87171; font-size: 10px;" onclick="window.handleDeleteComment('${postId}', '${r.id}', loadCommentsList)">Delete</span>` : ""}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("");
    };

    loadCommentsList();

    modal.querySelector("#reel-send-comment-btn").onclick = async () => {
      const input = modal.querySelector("#reel-comment-input");
      const text = input.value.trim();
      if (!text) return;
      const res = await window.api(`/api/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify({ text })
      });
      if (res.success) {
        input.value = "";
        loadCommentsList();
      }
    };
  };

  window.replyToReelComment = async function(postId, commentId, callback) {
    const text = prompt("Enter your reply:");
    if (!text || !text.trim()) return;
    const res = await window.api(`/api/posts/${postId}/comments/${commentId}/replies`, {
      method: "POST",
      body: JSON.stringify({ text: text.trim() })
    });
    if (res.success && callback) callback();
  };

  // Instagram-style Save / Bookmark Bottom Sheet Modal
  window.openSavePostModal = function(postId) {
    const existing = document.getElementById("save-post-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "save-post-modal";
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 250;
      display: flex; flex-direction: column; justify-content: flex-end; font-family: inherit;
    `;
    modal.innerHTML = `
      <div style="background: #111827; border-top-left-radius: 24px; border-top-right-radius: 24px; padding: 20px; color: #fff; border-top: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div style="font-weight: 800; font-size: 16px;">Save to collection</div>
          <button id="close-save-modal" style="background: none; border: none; color: #fff; font-size: 20px; cursor: pointer;">✕</button>
        </div>
        <div style="display: flex; align-items: center; gap: 14px; padding: 12px; background: #1e293b; border-radius: 12px; cursor: pointer; margin-bottom: 12px;" onclick="alert('Saved to All Posts!'); document.getElementById('save-post-modal').remove();">
          <div style="width: 44px; height: 44px; background: #3b82f6; border-radius: 8px; display: grid; place-items: center; font-size: 20px;">🔖</div>
          <div>
            <div style="font-weight: 700; font-size: 14px;">All Posts</div>
            <div style="font-size: 12px; color: #94a3b8;">Default collection</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 14px; padding: 12px; background: #1e293b; border-radius: 12px; cursor: pointer;" onclick="const name = prompt('New collection name:'); if(name){ alert('Saved to ' + name); document.getElementById('save-post-modal').remove(); }">
          <div style="width: 44px; height: 44px; background: #8b5cf6; border-radius: 8px; display: grid; place-items: center; font-size: 20px;">＋</div>
          <div>
            <div style="font-weight: 700; font-size: 14px;">New collection</div>
            <div style="font-size: 12px; color: #94a3b8;">Create a collection of saved posts</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector("#close-save-modal").onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  };

  // Handle Follow button click on post header or fullscreen viewer
  window.handlePostFollow = async function(userId, postId) {
    const btn = document.getElementById(`follow-btn-${postId}`) || document.getElementById(`reel-follow-btn-${postId}`);
    if (btn) btn.textContent = "...";

    const res = await window.api(`/api/users/${userId}/follow`, { method: "POST" });
    if (res.success) {
      const container = document.getElementById(`post-action-container-${postId}`);
      const reelContainer = document.getElementById(`reel-header-action-container-${postId}`);
      
      const msgHtml = `<button class="btn-msg-post" onclick="window.openDirectChat('${userId}')">Message</button>`;
      if (container) container.innerHTML = msgHtml;
      if (reelContainer) reelContainer.innerHTML = msgHtml;
    } else {
      if (btn) btn.textContent = "Follow";
      alert(res.message || "Could not follow user");
    }
  };

  window.togglePostLike = async function(postId, btn) {
    const res = await window.api(`/api/posts/${postId}/like`, { method: "POST" });
    if (res.success) {
      btn.classList.toggle("liked", res.liked);
      btn.querySelector("span").textContent = res.likesCount;
    }
  };

  window.toggleComments = async function(postId) {
    const box = document.getElementById(`comments-${postId}`);
    if (!box) return;
    box.classList.toggle("hidden");
    if (box.classList.contains("hidden")) return;

    box.innerHTML = `<div style="font-size:12px; color:#94a3b8;">Loading comments...</div>`;
    const res = await window.api(`/api/posts/${postId}/comments`);
    if (!res.success) return;

    const listHtml = res.comments.map(c => `
      <div class="comment-item">
        <strong>${c.user?.displayName || "User"}:</strong> ${c.text}
        <span style="color:#8b5cf6; font-size:11px; margin-left:8px; cursor:pointer;" onclick="window.replyToComment('${postId}', '${c.id}')">Reply</span>
        ${c.isMine ? `
          <span style="color:#38bdf8; font-size:11px; margin-left:8px; cursor:pointer;" onclick="window.handleEditComment('${postId}', '${c.id}', '${c.text}', () => window.toggleComments('${postId}'))">Edit</span>
          <span style="color:#f87171; font-size:11px; margin-left:8px; cursor:pointer;" onclick="window.handleDeleteComment('${postId}', '${c.id}', () => window.toggleComments('${postId}'))">Delete</span>
        ` : ""}
        ${(c.replies || []).map(r => `
          <div class="reply-item">
            <strong>${r.user?.displayName || "User"}:</strong> ${r.text}
            ${r.isMine ? `
              <span style="color:#f87171; font-size:10px; margin-left:6px; cursor:pointer;" onclick="window.handleDeleteComment('${postId}', '${r.id}', () => window.toggleComments('${postId}'))">Delete</span>
            ` : ""}
          </div>
        `).join("")}
      </div>
    `).join("");

    box.innerHTML = `
      <div>${listHtml || "<p style='font-size:12px; color:#64748b; margin-bottom:8px;'>No comments yet.</p>"}</div>
      <div style="display:flex; gap:8px; margin-top:8px;">
        <input id="cinput-${postId}" placeholder="Write a comment..." style="flex:1; background:#1e293b; border:none; border-radius:99px; padding:8px 14px; color:#fff; font-size:12px; outline:none;" />
        <button class="btn-pill" onclick="window.submitComment('${postId}')">Send</button>
      </div>
    `;
  };

  window.submitComment = async function(postId) {
    const input = document.getElementById(`cinput-${postId}`);
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    const res = await window.api(`/api/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ text })
    });
    if (res.success) {
      const countEl = document.getElementById(`ccount-${postId}`);
      if (countEl) countEl.textContent = Number(countEl.textContent) + 1;
      document.getElementById(`comments-${postId}`).classList.add("hidden");
      window.toggleComments(postId);
    }
  };

  window.replyToComment = async function(postId, commentId) {
    const text = prompt("Enter your reply:");
    if (!text || !text.trim()) return;
    const res = await window.api(`/api/posts/${postId}/comments/${commentId}/replies`, {
      method: "POST",
      body: JSON.stringify({ text: text.trim() })
    });
    if (res.success) {
      document.getElementById(`comments-${postId}`).classList.add("hidden");
      window.toggleComments(postId);
    }
  };

  window.handleEditComment = async function(postId, commentId, oldText, onComplete) {
    const newText = prompt("Edit your comment:", oldText);
    if (!newText || newText.trim() === oldText) return;

    const res = await window.api(`/api/posts/${postId}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ text: newText.trim() })
    });

    if (res.success) {
      if (onComplete) onComplete();
    } else {
      alert(res.message || "Could not edit comment");
    }
  };

  window.handleDeleteComment = async function(postId, commentId, onComplete) {
    if (!confirm("Delete this comment?")) return;

    const res = await window.api(`/api/posts/${postId}/comments/${commentId}`, {
      method: "DELETE"
    });

    if (res.success) {
      if (onComplete) onComplete();
    } else {
      alert(res.message || "Could not delete comment");
    }
  };

  window.openDirectChat = async function(userId) {
    const res = await window.api(`/api/conversations/${userId}`, { method: "POST" });
    if (res.success) {
      window.AppState.activeConversation = res.conversation;
      window.switchTab("chat");
    }
  };
})();
