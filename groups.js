(function() {
  const style = document.createElement("style");
  style.textContent = `
    .tg-tabs {
      display: flex; gap: 10px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .tg-tab-btn {
      flex: 1; padding: 9px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
      background: #111827; color: #94a3b8; font-weight: 700; font-size: 13px; cursor: pointer;
    }
    .tg-tab-btn.active {
      background: linear-gradient(135deg, #2563eb, #7c3aed); color: #fff; border-color: transparent;
    }
    .tg-card {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); cursor: pointer;
    }
    .tg-icon {
      width: 48px; height: 48px; border-radius: 16px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      display: grid; place-items: center; font-weight: 800; font-size: 18px; color: #fff;
    }
    .channel-post {
      background: #111827; border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px; padding: 14px; margin: 12px 14px;
    }
    .reaction-row { display: flex; gap: 8px; margin-top: 10px; }
    .reaction-pill {
      background: #1e293b; border: 1px solid rgba(255,255,255,0.08); color: #fff;
      padding: 4px 10px; border-radius: 99px; font-size: 12px; cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Local state ready to connect with /api/groups once added to server.js
  const channelsData = [
    {
      id: "ch1",
      type: "channel",
      name: "TELESUPAR Official",
      members: "14.2K subscribers",
      posts: [
        { id: "p1", text: "Welcome to TELESUPAR! Real-time stories, chats, and community channels in one place.", views: "4.1K", likes: 128, fire: 64 },
        { id: "p2", text: "Tip: Use the Explore tab to find friends and start encrypted-style instant messaging.", views: "2.9K", likes: 95, fire: 41 }
      ]
    },
    {
      id: "grp1",
      type: "group",
      name: "Developers & Creators Hub",
      members: "842 members • 63 online",
      messages: [
        { sender: "Aarav", text: "Anyone testing the new TELESUPAR build today?" },
        { sender: "Priya", text: "Yes! The circular navigation bar feels super smooth." }
      ]
    }
  ];

  window.renderGroups = function(container) {
    let activeFilter = "all";

    function renderList() {
      const filtered = channelsData.filter(item => activeFilter === "all" || item.type === activeFilter);
      container.innerHTML = `
        <div class="tg-tabs">
          <button class="tg-tab-btn ${activeFilter === "all" ? "active" : ""}" data-f="all">All</button>
          <button class="tg-tab-btn ${activeFilter === "channel" ? "active" : ""}" data-f="channel">📢 Channels</button>
          <button class="tg-tab-btn ${activeFilter === "group" ? "active" : ""}" data-f="group">👥 Groups</button>
          <button class="tg-tab-btn" id="create-tg-btn" style="max-width:44px; background:#14b8a6; color:#042f2e;">+</button>
        </div>
        <div>
          ${filtered.map(item => `
            <div class="tg-card" data-open-id="${item.id}">
              <div style="display:flex; gap:12px; align-items:center;">
                <div class="tg-icon">${item.type === "channel" ? "📢" : "👥"}</div>
                <div>
                  <div style="font-weight:700; font-size:15px;">${item.name}</div>
                  <div style="font-size:12px; color:#94a3b8;">${item.members}</div>
                </div>
              </div>
              <span style="font-size:11px; color:#a855f7; font-weight:700; text-transform:uppercase;">${item.type}</span>
            </div>
          `).join("")}
        </div>
      `;

      container.querySelectorAll("[data-f]").forEach(btn => {
        btn.onclick = () => { activeFilter = btn.dataset.f; renderList(); };
      });

      container.querySelector("#create-tg-btn").onclick = () => {
        const name = prompt("Enter Channel or Group Name:");
        if (!name) return;
        const isChannel = confirm("Click OK for Broadcast Channel, or Cancel for Discussion Group");
        channelsData.unshift({
          id: "tg_" + Date.now(),
          type: isChannel ? "channel" : "group",
          name,
          members: isChannel ? "1 subscriber" : "1 member",
          posts: [{ id: "init", text: `Channel "${name}" created!`, views: "1", likes: 1, fire: 0 }],
          messages: [{ sender: window.AppState.user?.displayName || "Admin", text: `Welcome to ${name}!` }]
        });
        renderList();
      };

      container.querySelectorAll("[data-open-id]").forEach(card => {
        card.onclick = () => {
          const item = channelsData.find(x => x.id === card.dataset.openId);
          openTgRoom(item);
        };
      });
    }

    function openTgRoom(item) {
      if (item.type === "channel") {
        container.innerHTML = `
          <div style="padding:12px 16px; background:#111827; display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.08);">
            <button id="tg-back" style="background:none; border:none; color:#fff; font-size:20px; cursor:pointer;">←</button>
            <div>
              <div style="font-weight:700;">${item.name}</div>
              <div style="font-size:11px; color:#94a3b8;">${item.members}</div>
            </div>
          </div>
          <div id="channel-posts-list">
            ${item.posts.map(p => `
              <div class="channel-post">
                <div style="font-size:14px; line-height:1.5;">${p.text}</div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                  <div class="reaction-row">
                    <button class="reaction-pill" onclick="this.textContent='👍 ' + (${p.likes}+1)">👍 ${p.likes}</button>
                    <button class="reaction-pill" onclick="this.textContent='🔥 ' + (${p.fire}+1)">🔥 ${p.fire}</button>
                  </div>
                  <span style="font-size:11px; color:#64748b;">👁 ${p.views}</span>
                </div>
              </div>
            `).join("")}
          </div>
          <div style="padding:12px; display:flex; gap:8px;">
            <input id="ch-broadcast-input" placeholder="Broadcast message to subscribers..." style="flex:1; background:#1e293b; border:none; border-radius:99px; padding:10px 16px; color:#fff; outline:none;" />
            <button id="ch-broadcast-btn" class="btn-pill">Post</button>
          </div>
        `;
        container.querySelector("#tg-back").onclick = renderList;
        container.querySelector("#ch-broadcast-btn").onclick = () => {
          const val = container.querySelector("#ch-broadcast-input").value.trim();
          if (!val) return;
          item.posts.push({ id: Date.now(), text: val, views: "1", likes: 0, fire: 0 });
          openTgRoom(item);
        };
      } else {
        container.innerHTML = `
          <div style="padding:12px 16px; background:#111827; display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.08);">
            <button id="tg-back" style="background:none; border:none; color:#fff; font-size:20px; cursor:pointer;">←</button>
            <div>
              <div style="font-weight:700;">${item.name}</div>
              <div style="font-size:11px; color:#14b8a6;">${item.members}</div>
            </div>
          </div>
          <div style="padding:14px; display:flex; flex-direction:column; gap:10px; min-height:55vh;">
            ${item.messages.map(m => `
              <div style="background:#1e293b; padding:10px 14px; border-radius:16px; max-width:80%;">
                <div style="font-size:11px; font-weight:700; color:#a855f7; margin-bottom:2px;">${m.sender}</div>
                <div style="font-size:14px;">${m.text}</div>
              </div>
            `).join("")}
          </div>
          <div style="padding:12px; display:flex; gap:8px;">
            <input id="grp-msg-input" placeholder="Message group..." style="flex:1; background:#1e293b; border:none; border-radius:99px; padding:10px 16px; color:#fff; outline:none;" />
            <button id="grp-send-btn" class="btn-pill">Send</button>
          </div>
        `;
        container.querySelector("#tg-back").onclick = renderList;
        container.querySelector("#grp-send-btn").onclick = () => {
          const val = container.querySelector("#grp-msg-input").value.trim();
          if (!val) return;
          item.messages.push({ sender: window.AppState.user?.displayName || "You", text: val });
          openTgRoom(item);
        };
      }
    }

    renderList();
  };
})();
