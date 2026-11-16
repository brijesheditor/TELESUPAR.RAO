(function() {
  const style = document.createElement("style");
  style.textContent = `
    .stories-bar {
      display: flex;
      gap: 14px;
      padding: 14px 16px;
      overflow-x: auto;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      scrollbar-width: none;
    }
    .stories-bar::-webkit-scrollbar { display: none; }
    .story-item { display: flex; flex-direction: column; align-items: center; width: 68px; flex-shrink: 0; cursor: pointer; }
    .story-ring {
      width: 62px; height: 62px; border-radius: 50%; padding: 2.5px;
      background: linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6);
      position: relative;
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
    .post-media { width: 100%; max-height: 420px; object-fit: cover; display: block; background: #000; }
    .post-caption { padding: 10px 14px; font-size: 14px; line-height: 1.45; color: #e2e8f0; }
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

        // Find notification icon or top-right container to place it right before notification
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

  // Create Post Modal (Triggered from Top Bar + button)
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
        alert(res.Follow || "Could not publish post");
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

  // Story Viewers & Likes Modal
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
          <button class="action-chip" onclick="window.openDirectChat('${post.user.id}')">Message</button>
        </div>

        ${post.mediaUrl ? (
          post.mediaType === "video"
            ? `<video src="${post.mediaUrl}" class="post-media" controls playsinline></video>`
            : `<img src="${post.mediaUrl}" class="post-media" />`
        ) : ""}

        ${post.caption ? `<div class="post-caption">${post.caption}</div>` : ""}

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

  window.togglePostLike = async function(postId, btn) {
    const res = await window.api(`/api/posts/${postId}/like`, { method: "POST" });
    if (res.success) {
      btn.classList.toggle("liked", res.liked);
      btn.querySelector("span").textContent = res.likesCount;
    }
  };

  window.toggleComments = async function(postId) {
    const box = document.getElementById(`comments-${postId}`);
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
    const text = input.value.trim();
    if (!text) return;
    const res = await window.api(`/api/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ text })
    });
    if (res.success) {
      const countEl = document.getElementById(`ccount-${postId}`);
      countEl.textContent = Number(countEl.textContent) + 1;
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
