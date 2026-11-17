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
    .post-user { display: flex; align-items: center; gap: 10px; cursor: pointer; flex: 1; }
    .post-user img { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
    .post-media { width: 100%; max-height: 420px; object-fit: cover; display: block; background: #000; cursor: pointer; }
    .post-caption { padding: 8px 14px 12px 14px; font-size: 14px; line-height: 1.45; color: #e2e8f0; word-break: break-word; }
    .post-actions { display: flex; gap: 18px; padding: 12px 14px 4px 14px; align-items: center; }
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
    .edu-badge {
      display: inline-block; background: rgba(59, 130, 246, 0.15); color: #60a5fa;
      font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; margin-bottom: 6px;
    }
    .post-options-btn {
      background: none; border: none; color: #94a3b8; font-size: 18px; font-weight: 800; cursor: pointer; padding: 4px 8px;
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
      <div id="posts-feed"><p style="text-align:center; color:#94a3b8; padding:30px;">Loading educational feed...</p></div>
      <input type="file" id="story-upload-input" accept="image/*,video/*" hidden />
    `;

    setTimeout(() => {
      const topHeader = document.querySelector('header') || document.querySelector('.app-header');
      if (topHeader) {
        topHeader.style.display = "flex";
        
        if (!document.getElementById("header-reels-btn")) {
          const actionArea = topHeader.querySelector('div:last-child') || topHeader;
          
          const reelsBtn = document.createElement("button");
          reelsBtn.id = "header-reels-btn";
          reelsBtn.innerHTML = "🎬";
          reelsBtn.style.cssText = `background:none; border:none; color:#fff; font-size:20px; cursor:pointer; width:36px; height:36px; display:grid; place-items:center;`;
          reelsBtn.title = "Educational Reels";
          reelsBtn.onclick = () => window.openFullscreenPostViewer();

          const plusBtn = document.createElement("button");
          plusBtn.id = "header-create-post-btn";
          plusBtn.innerHTML = "＋";
          plusBtn.style.cssText = `background:none; border:none; color:#fff; font-size:24px; font-weight:800; cursor:pointer; width:36px; height:36px; display:grid; place-items:center;`;
          plusBtn.title = "Create Educational Post";
          plusBtn.onclick = () => window.openCreatePostModal();

          actionArea.prepend(plusBtn);
          actionArea.prepend(reelsBtn);
        }
      }

      updateBottomNavBadges();
    }, 100);

    if (window.switchTab && !window._telesuparTabHooked) {
      window._telesuparTabHooked = true;
      const originalSwitchTab = window.switchTab;
      window.switchTab = function(tabName) {
        originalSwitchTab(tabName);
        const topHeader = document.querySelector('header') || document.querySelector('.app-header');
        if (topHeader) {
          topHeader.style.display = (tabName === 'home') ? 'flex' : 'none';
        }
      };
    }

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

  async function updateBottomNavBadges() {
    try {
      const chatRes = await window.api("/api/conversations");
      let totalUnreadChat = 0;
      if (chatRes.success && chatRes.conversations) {
        chatRes.conversations.forEach(c => { totalUnreadChat += (c.unreadCount || 0); });
      }

      const channelRes = await window.api("/api/channels");
      let totalUnreadChannel = 0;
      if (channelRes.success && channelRes.channels) {
        channelRes.channels.forEach(ch => { totalUnreadChannel += (ch.unreadCount || 0); });
      }

      const chatNavBtn = document.querySelector('button[onclick*="chat"]') || document.querySelector('nav button:nth-child(3)') || document.querySelector('[data-tab="chat"]');
      if (chatNavBtn) {
        chatNavBtn.style.position = 'relative';
        let badge = chatNavBtn.querySelector('.nav-badge');
        if (totalUnreadChat > 0) {
          if (!badge) {
            badge = document.createElement('span');
            badge.className = 'nav-badge';
            badge.style.cssText = `position:absolute; top:4px; right:8px; background:#ef4444; color:#fff; font-size:10px; font-weight:700; padding:1px 5px; border-radius:99px;`;
            chatNavBtn.appendChild(badge);
          }
          badge.textContent = totalUnreadChat;
        } else if (badge) {
          badge.remove();
        }
      }

      const channelNavBtn = document.querySelector('button[onclick*="channel"]') || document.querySelector('nav button:nth-child(4)') || document.querySelector('[data-tab="channel"]');
      if (channelNavBtn) {
        channelNavBtn.style.position = 'relative';
        let badge = channelNavBtn.querySelector('.nav-badge');
        if (totalUnreadChannel > 0) {
          if (!badge) {
            badge = document.createElement('span');
            badge.className = 'nav-badge';
            badge.style.cssText = `position:absolute; top:4px; right:8px; background:#ef4444; color:#fff; font-size:10px; font-weight:700; padding:1px 5px; border-radius:99px;`;
            channelNavBtn.appendChild(badge);
          }
          badge.textContent = totalUnreadChannel;
        } else if (badge) {
          badge.remove();
        }
      }

      const profileNavBtn = document.querySelector('button[onclick*="profile"]') || document.querySelector('nav button:last-child') || document.querySelector('[data-tab="profile"]');
      if (profileNavBtn && window.AppState && window.AppState.user) {
        const me = window.AppState.user;
        const avatarSrc = window.avatarUrl(me);
        profileNavBtn.innerHTML = `<img src="${avatarSrc}" style="width:26px; height:26px; border-radius:50%; object-fit:cover; border:1.5px solid #fff;" />`;
      }
    } catch (err) {
      console.error("Error updating nav badges:", err);
    }
  }

  window.openCreatePostModal = function() {
    const existing = document.getElementById("create-post-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "create-post-modal";
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(9,13,22,0.95); z-index: 300;
      display: flex; flex-direction: column; color: #fff; padding: 20px; font-family: inherit; overflow-y: auto;
    `;
    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div style="font-weight:800; font-size:18px;">Create Educational Post</div>
        <button id="close-post-modal" style="background:none; border:none; color:#fff; font-size:22px; cursor:pointer;">✕</button>
      </div>

      <label style="font-size:13px; color:#94a3b8; margin-bottom:6px; display:block;">Select Subject Category</label>
      <select id="modal-post-category" style="width:100%; background:#1e293b; border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:12px; color:#fff; font-size:14px; outline:none; margin-bottom:14px;">
        <option value="Mathematics">📐 Mathematics</option>
        <option value="Physics">⚡ Physics</option>
        <option value="Chemistry">🧪 Chemistry</option>
        <option value="Biology">🧬 Biology</option>
        <option value="Programming">💻 Programming & Tech</option>
        <option value="General Studies">📚 General Studies / GK</option>
        <option value="English">📖 English & Grammar</option>
      </select>

      <label style="font-size:13px; color:#94a3b8; margin-bottom:6px; display:block;">Lesson Description / Question</label>
      <textarea id="modal-post-caption" rows="4" placeholder="Explain the concept, formula or study notes..." style="width:100%; background:#1e293b; border:none; border-radius:12px; padding:12px; color:#fff; font-size:14px; outline:none; resize:none; margin-bottom:14px;"></textarea>
      
      <div style="display:flex; align-items:center; justify-content:space-between; background:#1e293b; padding:12px 16px; border-radius:12px; margin-bottom:20px;">
        <label style="color:#a855f7; font-size:14px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:8px;">
          📷 Attach Study Video / Diagram
          <input type="file" id="modal-post-file" accept="image/*,video/*" hidden />
        </label>
        <span id="modal-file-name" style="font-size:12px; color:#94a3b8;"></span>
      </div>

      <button class="btn-pill" id="modal-publish-btn" style="width:100%; padding:12px; font-size:14px; font-weight:700;">Publish Educational Post</button>
    `;
    document.body.appendChild(modal);

    document.getElementById("close-post-modal").onclick = () => modal.remove();
    document.getElementById("modal-post-file").onchange = (e) => {
      const f = e.target.files[0];
      document.getElementById("modal-file-name").textContent = f ? f.name.slice(0, 20) : "";
    };

    document.getElementById("modal-publish-btn").onclick = async () => {
      const category = document.getElementById("modal-post-category").value;
      const rawCaption = document.getElementById("modal-post-caption").value.trim();
      const file = document.getElementById("modal-post-file").files[0];
      
      if (!rawCaption && !file) {
        alert("Please add a description or attach media.");
        return;
      }

      const caption = `[${category}] ${rawCaption}`;

      const fd = new FormData();
      fd.append("caption", caption);
      if (file) fd.append("file", file);

      const btn = document.getElementById("modal-publish-btn");
      btn.textContent = "Publishing Lesson...";
      const res = await window.api("/api/posts", { method: "POST", body: fd });
      if (res.success) {
        modal.remove();
        loadPosts();
      } else {
        btn.textContent = "Publish Educational Post";
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
            <input id="story-reply-input" placeholder="Ask a doubt..." style="flex:1; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); border-radius:99px; padding:10px 16px; color:#fff; outline:none;" />
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

  async function loadPosts() {
    const feed = document.getElementById("posts-feed");
    if (!feed) return;
    const data = await window.api("/api/posts/feed");
    if (!data.success || !data.posts.length) {
      feed.innerHTML = `<p style="text-align:center; color:#94a3b8; padding:30px;">No lessons posted yet. Be the first educator to share!</p>`;
      return;
    }

    feed.innerHTML = data.posts.map(post => {
      let displayCaption = post.caption || "";
      let categoryBadge = "";
      if (displayCaption.startsWith("[")) {
        const closingIdx = displayCaption.indexOf("]");
        if (closingIdx !== -1) {
          const catName = displayCaption.substring(1, closingIdx);
          categoryBadge = `<div class="edu-badge">📚 ${catName}</div>`;
          displayCaption = displayCaption.substring(closingIdx + 1).trim();
        }
      }

      return `
        <div class="post-card" id="post-${post.id}">
          <div class="post-header">
            <div class="post-user" onclick="window.openUserProfile('${post.user.id}')">
              <img src="${window.avatarUrl(post.user)}" />
              <div>
                <div style="font-weight:700; font-size:14px;">${post.user.displayName}</div>
                <div style="font-size:11px; color:#94a3b8;">@${post.user.username}</div>
              </div>
            </div>
            
            <div style="display:flex; align-items:center; gap:8px;">
              <div id="post-action-container-${post.id}">
                ${post.isMyPost ? "" : (
                  post.isFollowing
                    ? `<button class="btn-msg-post" onclick="window.openDirectChat('${post.user.id}')">Message</button>`
                    : `<button class="btn-follow-post" id="follow-btn-${post.id}" onclick="window.handlePostFollow('${post.user.id}', '${post.id}')">Follow</button>`
                )}
              </div>
              <button class="post-options-btn" onclick="window.openPostOptionsMenu('${post.id}', ${post.isMyPost})">⋮</button>
            </div>
          </div>

          ${post.mediaUrl ? (
            post.mediaType === "video"
              ? `<video src="${post.mediaUrl}" class="post-media" onclick="window.openFullscreenPostViewer('${post.id}')" playsinline muted></video>`
              : `<img src="${post.mediaUrl}" class="post-media" onclick="window.openFullscreenPostViewer('${post.id}')" />`
          ) : ""}

          <div class="post-actions">
            <button class="action-chip ${post.likedByMe ? "liked" : ""}" onclick="window.togglePostLike('${post.id}', this)">
              ♥ <span>${post.likesCount}</span>
            </button>
            <button class="action-chip" onclick="window.toggleComments('${post.id}')">
              💬 <span id="ccount-${post.id}">${post.commentsCount}</span>
            </button>
          </div>

          ${(categoryBadge || displayCaption) ? `
            <div class="post-caption" onclick="window.openFullscreenPostViewer('${post.id}')">
              ${categoryBadge}
              <div>${displayCaption}</div>
            </div>
          ` : ""}

          <div class="comments-box hidden" id="comments-${post.id}"></div>
        </div>
      `;
    }).join("");
  }

  window.openPostOptionsMenu = function(postId, isMyPost) {
    const existing = document.getElementById("post-options-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "post-options-modal";
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 350;
      display: flex; flex-direction: column; justify-content: flex-end; font-family: inherit;
    `;
    
    let optionsHtml = `
      <div style="padding: 14px 20px; font-weight: 700; color: #ef4444; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.06);" onclick="window.handleReportPost('${postId}')">🚨 Report Non-Educational / Inappropriate Content</div>
    `;

    if (isMyPost) {
      optionsHtml = `
        <div style="padding: 14px 20px; font-weight: 700; color: #38bdf8; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.06);" onclick="window.handleEditPostModal('${postId}')">✏️ Edit Post</div>
        <div style="padding: 14px 20px; font-weight: 700; color: #ef4444; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.06);" onclick="window.handleDeletePost('${postId}')">🗑️ Delete Post</div>
      ` + optionsHtml;
    }

    modal.innerHTML = `
      <div style="background: #111827; border-top-left-radius: 20px; border-top-right-radius: 20px; overflow: hidden; color: #fff; border-top: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px;">
        <div style="width: 40px; height: 4px; background: #334155; border-radius: 99px; margin: 10px auto 16px auto;"></div>
        ${optionsHtml}
        <div style="padding: 14px 20px; text-align: center; font-weight: 600; color: #94a3b8; cursor: pointer; margin-top: 6px;" onclick="document.getElementById('post-options-modal').remove()">Cancel</div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  };

  window.handleReportPost = async function(postId) {
    document.getElementById('post-options-modal')?.remove();
    const reason = prompt("Select report reason:\n1. Non-educational content / Comedy / Prank\n2. Promotion / Spam\n3. Inappropriate material");
    if (!reason) return;
    const res = await window.api(`/api/posts/${postId}/report`, {
      method: "POST",
      body: JSON.stringify({ reason })
    });
    alert(res.success ? "Post reported successfully. Our moderators will review it." : (res.message || "Could not report post"));
  };

  window.handleDeletePost = async function(postId) {
    document.getElementById('post-options-modal')?.remove();
    if (!confirm("Are you sure you want to delete this educational post?")) return;
    const res = await window.api(`/api/posts/${postId}`, { method: "DELETE" });
    if (res.success) {
      loadPosts();
    } else {
      alert(res.message || "Could not delete post");
    }
  };

  window.handleEditPostModal = async function(postId) {
    document.getElementById('post-options-modal')?.remove();
    const newCaption = prompt("Edit your lesson caption:");
    if (newCaption === null) return;
    const res = await window.api(`/api/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify({ caption: newCaption.trim() })
    });
    if (res.success) {
      loadPosts();
    } else {
      alert(res.message || "Could not edit post");
    }
  };

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

    const fixedTopBar = document.createElement("div");
    fixedTopBar.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; z-index: 210;
      background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    `;
    fixedTopBar.innerHTML = `
      <button onclick="document.getElementById('fullscreen-reel-viewer').remove()" style="
        background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; width: 36px; height: 36px; display:grid; place-items:center; font-weight: 700;
      " title="Back">←</button>
      
      <div style="font-weight: 800; font-size: 17px; letter-spacing: 0.5px; color: #fff;">Educational Reels</div>

      <button onclick="window.openCreatePostModal()" style="
        background: none; border: none; color: #fff; width: 36px; height: 36px; border-radius: 50%; font-size: 24px; font-weight: 800; cursor: pointer; display:grid; place-items:center;
      ">＋</button>
    `;
    viewer.appendChild(fixedTopBar);

    const slidesContainer = document.createElement("div");
    slidesContainer.style.cssText = `width: 100%; height: 100%; overflow-y: scroll; scroll-snap-type: y mandatory; scrollbar-width: none;`;
    slidesContainer.innerHTML = `<div style="display:grid; place-items:center; height:100vh; color:#94a3b8;">Loading educational reels...</div>`;
    viewer.appendChild(slidesContainer);

    const res = await window.api("/api/posts/feed");
    if (!res.success || !res.posts.length) {
      slidesContainer.innerHTML = `<div style="display:grid; place-items:center; height:100vh; color:#94a3b8;">No reels found.</div>`;
      return;
    }

    const posts = res.posts;
    if (initialPostId) {
      const targetIdx = posts.findIndex(p => p.id === initialPostId);
      if (targetIdx > 0) {
        const item = posts.splice(targetIdx, 1)[0];
        posts.unshift(item);
      }
    }

    slidesContainer.innerHTML = posts.map((post) => {
      let displayCaption = post.caption || "";
      let categoryBadge = "";
      if (displayCaption.startsWith("[")) {
        const closingIdx = displayCaption.indexOf("]");
        if (closingIdx !== -1) {
          const catName = displayCaption.substring(1, closingIdx);
          categoryBadge = `<div class="edu-badge">📚 ${catName}</div>`;
          displayCaption = displayCaption.substring(closingIdx + 1).trim();
        }
      }

      return `
        <div class="reel-slide" data-postid="${post.id}" style="
          width: 100vw; height: 100vh; scroll-snap-align: start; position: relative;
          display: flex; align-items: center; justify-content: center; background: #0b0f19; overflow: hidden;
        ">
          ${post.mediaUrl ? (
            post.mediaType === "video"
              ? `<video src="${post.mediaUrl}" class="reel-media" autoplay loop playsinline style="width:100%; height:100%; object-fit:contain; background:#000;"></video>`
              : `<img src="${post.mediaUrl}" class="reel-media" style="width:100%; height:100%; object-fit:contain; background:#000;" />`
          ) : `<div style="background:#1e293b; width:100%; height:100%; display:grid; place-items:center; padding:20px; text-align:center;">No Media</div>`}

          <div style="position: absolute; right: 16px; bottom: 95px; display: flex; flex-direction: column; align-items: center; gap: 22px; z-index: 10;">
            <button class="reel-action-btn reel-like-btn ${post.likedByMe ? 'liked' : ''}" data-postid="${post.id}" style="
              background: none; border: none; color: ${post.likedByMe ? '#ec4899' : '#fff'}; display: flex; flex-direction: column; align-items: center; cursor: pointer; font-size: 28px; gap: 4px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
            ">
              <span>♥</span>
              <span style="font-size: 13px; font-weight: 800;" class="reel-like-count">${post.likesCount}</span>
            </button>

            <button onclick="window.openReelCommentsModal('${post.id}')" style="
              background: none; border: none; color: #fff; display: flex; flex-direction: column; align-items: center; cursor: pointer; font-size: 26px; gap: 4px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
            ">
              <span>💬</span>
              <span style="font-size: 13px; font-weight: 800;">${post.commentsCount}</span>
            </button>
          </div>

          <div style="
            position: absolute; bottom: 20px; left: 16px; right: 80px; z-index: 10;
            background: linear-gradient(to top, rgba(0,0,0,0.95) 60%, transparent); padding: 25px 0 10px 0; display: flex; flex-direction: column; gap: 6px;
          ">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="window.openUserProfile('${post.user.id}')">
                <img src="${window.avatarUrl(post.user)}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid rgba(255,255,255,0.4);" />
                <div style="font-weight: 700; font-size: 15px; color: #fff;">${post.user.displayName}</div>
              </div>
            </div>
            ${categoryBadge}
            ${displayCaption ? `<div style="font-size: 13.5px; line-height: 1.45; color: #e2e8f0; max-height: 120px; overflow-y: auto; word-break: break-word;">${displayCaption}</div>` : ""}
          </div>
        </div>
      `;
    }).join("");

    slidesContainer.querySelectorAll(".reel-like-btn").forEach(btn => {
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
          <div style="font-weight: 800; font-size: 16px; width: 100%; text-align: center;">Comments & Doubts</div>
          <button id="close-reel-comments" style="background: none; border: none; color: #fff; font-size: 20px; cursor: pointer; position: absolute; right: 16px;">✕</button>
        </div>
        <div id="reel-comments-list" style="flex: 1; overflow-y: auto; padding: 16px;">
          <p style="text-align: center; color: #94a3b8; padding: 20px;">Loading discussions...</p>
        </div>
        <div style="padding: 12px 16px; background: #0f172a; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 10px; align-items: center;">
          <input id="reel-comment-input" placeholder="Ask a doubt or comment..." style="flex: 1; background: #1e293b; border: none; border-radius: 99px; padding: 10px 16px; color: #fff; font-size: 13px; outline: none;" />
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
      if (!res.success) return;
      const comments = res.comments || [];
      if (!comments.length) {
        listContainer.innerHTML = `<p style="text-align: center; color: #64748b; padding: 40px;">No doubts or comments yet. Ask the first question!</p>`;
        return;
      }
      listContainer.innerHTML = comments.map(c => `
        <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-start;">
          <img src="${window.avatarUrl(c.user)}" style="width: 34px; height: 34px; border-radius: 50%; object-fit: cover;" />
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; font-size: 13px;">${c.user?.displayName || "User"}</span>
            </div>
            <div style="font-size: 13px; color: #e2e8f0; margin-top: 3px;">${c.text}</div>
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
    box.innerHTML = `
      <div>${(res.comments || []).map(c => `<div class="comment-item"><strong>${c.user?.displayName}:</strong> ${c.text}</div>`).join("") || "No comments yet."}</div>
      <div style="display:flex; gap:8px; margin-top:8px;">
        <input id="cinput-${postId}" placeholder="Ask a doubt..." style="flex:1; background:#1e293b; border:none; border-radius:99px; padding:8px 14px; color:#fff; font-size:12px; outline:none;" />
        <button class="btn-pill" onclick="window.submitComment('${postId}')">Send</button>
      </div>
    `;
  };

  window.submitComment = async function(postId) {
    const input = document.getElementById(`cinput-${postId}`);
    if (!input || !input.value.trim()) return;
    const res = await window.api(`/api/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ text: input.value.trim() })
    });
    if (res.success) {
      document.getElementById(`comments-${postId}`).classList.add("hidden");
      window.toggleComments(postId);
    }
  };
})();
