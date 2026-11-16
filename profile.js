(function() {
  const style = document.createElement("style");
  style.textContent = `
    .profile-hero { padding: 20px 18px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .profile-avatar-box { position: relative; width: 92px; height: 92px; margin: 0 auto 12px; }
    .profile-avatar-box img {
      width: 92px; height: 92px; border-radius: 50%; object-fit: cover;
      border: 3px solid #a855f7;
    }
    .avatar-edit-icon {
      position: absolute; bottom: 0; right: 0; width: 28px; height: 28px; border-radius: 50%;
      background: #6366f1; color: #fff; display: grid; place-items: center; font-size: 13px; cursor: pointer;
    }
    .stats-row {
      display: flex; justify-content: space-around; margin: 16px 0;
      background: #111827; padding: 12px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.07);
    }
    .stat-num { font-size: 17px; font-weight: 800; color: #fff; }
    .stat-lbl { font-size: 11px; color: #94a3b8; }
    .profile-actions { display: flex; gap: 10px; }
    .btn-outline {
      flex: 1; background: #1e293b; border: 1px solid rgba(255,255,255,0.12);
      color: #fff; padding: 10px; border-radius: 12px; font-weight: 600; font-size: 13px; cursor: pointer;
    }
    .profile-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 4px; }
    .profile-grid-cell { aspect-ratio: 1/1; background: #111827; overflow: hidden; }
    .profile-grid-cell img, .profile-grid-cell video { width: 100%; height: 100%; object-fit: cover; }
  `;
  document.head.appendChild(style);

  window.renderProfile = async function(container) {
    const meRes = await window.api("/api/me");
    const user = meRes.success ? meRes.user : window.AppState.user;
    window.AppState.user = user;

    const [followStats, feedRes] = await Promise.all([
      window.api(`/api/users/${user.id}/follow-status`),
      window.api("/api/posts/feed")
    ]);

    const myPosts = (feedRes.posts || []).filter(p => p.user.id === user.id);

    container.innerHTML = `
      <div class="profile-hero">
        <div class="profile-avatar-box">
          <img src="${window.avatarUrl(user)}" id="prof-avatar-img" />
          <label class="avatar-edit-icon" title="Change Photo">
            📷
            <input type="file" id="prof-avatar-input" accept="image/*" hidden />
          </label>
        </div>

        <h2 style="font-size:19px;">${user.displayName}</h2>
        <div style="color:#a855f7; font-size:13px; margin-bottom:6px;">@${user.username}</div>
        <p style="color:#cbd5e1; font-size:13px; max-width:320px; margin:0 auto;">${user.bio || "Hey there! I am using TELESUPAR."}</p>

        <div class="stats-row">
          <div>
            <div class="stat-num">${myPosts.length}</div>
            <div class="stat-lbl">Posts</div>
          </div>
          <div>
            <div class="stat-num">${followStats.followersCount || 0}</div>
            <div class="stat-lbl">Followers</div>
          </div>
          <div>
            <div class="stat-num">${followStats.followingCount || 0}</div>
            <div class="stat-lbl">Following</div>
          </div>
        </div>

        <div class="profile-actions">
          <button class="btn-outline" id="btn-edit-profile">Edit Profile</button>
          <button class="btn-outline" id="btn-logout" style="color:#f87171;">Logout</button>
        </div>
      </div>

      <div style="padding:12px 16px 6px; font-size:12px; font-weight:700; color:#94a3b8; text-transform:uppercase;">My Posts</div>
      <div class="profile-grid">
        ${myPosts.length ? myPosts.map(p => `
          <div class="profile-grid-cell">
            ${p.mediaUrl
              ? (p.mediaType === "video" ? `<video src="${p.mediaUrl}"></video>` : `<img src="${p.mediaUrl}" />`)
              : `<div style="padding:10px; font-size:11px; color:#cbd5e1;">${p.caption}</div>`}
          </div>
        `).join("") : `<p style="grid-column:1/-1; text-align:center; color:#64748b; padding:30px;">No posts shared yet.</p>`}
      </div>
    `;

    // Upload Avatar
    document.getElementById("prof-avatar-input").onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      const res = await window.api("/api/me/avatar", { method: "POST", body: fd });
      if (res.success) window.renderProfile(container);
    };

    // Edit Name & Bio
    document.getElementById("btn-edit-profile").onclick = async () => {
      const displayName = prompt("Display Name (2-40 chars):", user.displayName);
      if (!displayName) return;
      const bio = prompt("Bio (max 160 chars):", user.bio || "");
      const res = await window.api("/api/me", {
        method: "PATCH",
        body: JSON.stringify({ displayName, bio: bio || "" })
      });
      if (res.success) window.renderProfile(container);
    };

    // Logout
    document.getElementById("btn-logout").onclick = () => {
      localStorage.removeItem("ts_token");
      localStorage.removeItem("ts_user");
      location.reload();
    };
  };
})();
